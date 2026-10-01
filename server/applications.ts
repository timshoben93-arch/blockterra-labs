import { timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import Busboy from "busboy";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebaseAdmin";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const RESUME_CHUNK_BYTES = 400_000;
const GITHUB_USERNAME = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

type UploadedFile = {
  filename: string;
  mime: string;
  buffer: Buffer;
};

export function sendJson(res: ServerResponse, status: number, body: unknown) {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readRawBody(req: IncomingMessage) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function readMultipart(req: IncomingMessage) {
  return new Promise<{ fields: Record<string, string>; file: UploadedFile | null }>((resolve, reject) => {
    const fields: Record<string, string> = {};
    let file: UploadedFile | null = null;
    const busboy = Busboy({
      headers: req.headers,
      limits: { fileSize: MAX_RESUME_BYTES, files: 1, fields: 12 },
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });
    busboy.on("file", (_name, stream, info) => {
      const chunks: Buffer[] = [];
      let tooLarge = false;
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on("limit", () => {
        tooLarge = true;
      });
      stream.on("end", () => {
        if (tooLarge) return;
        file = { filename: info.filename, mime: info.mimeType, buffer: Buffer.concat(chunks) };
      });
    });
    busboy.on("error", reject);
    busboy.on("finish", () => resolve({ fields, file }));
    req.pipe(busboy);
  });
}

function normalizeGithubUsername(value: string) {
  const trimmed = value.trim().replace(/^@/, "");
  const fromUrl = trimmed.match(/github\.com\/([A-Za-z0-9-]+)/i);
  return fromUrl?.[1] ?? trimmed;
}

function adminKeyMatches(provided: string | undefined) {
  const expected = process.env.ADMIN_DASHBOARD_KEY ?? "";
  if (!expected || !provided) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function requestAdminKey(req: IncomingMessage) {
  const header = req.headers["x-admin-key"];
  return Array.isArray(header) ? header[0] : header;
}

export async function createApplication(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const { fields, file } = await readMultipart(req);
  const fullName = (fields.fullName ?? "").trim();
  const githubUsername = normalizeGithubUsername(fields.githubUsername ?? "");
  const role = (fields.role ?? "").trim();
  const platform = (fields.platform ?? "Unknown").trim().slice(0, 80);
  const country = (fields.country ?? "Unknown").trim().slice(0, 80);
  let cryptoWallets: string[] = [];
  try {
    const parsed = JSON.parse(fields.cryptoWallets || "[]") as unknown;
    if (Array.isArray(parsed)) {
      cryptoWallets = parsed.filter((item): item is string => typeof item === "string").slice(0, 12);
    }
  } catch {
    cryptoWallets = [];
  }

  if (!fullName || fullName.length > 120) {
    sendJson(res, 400, { error: "Full name is required." });
    return;
  }
  if (!GITHUB_USERNAME.test(githubUsername)) {
    sendJson(res, 400, { error: "Enter a valid GitHub username." });
    return;
  }
  if (!role || role.length > 160) {
    sendJson(res, 400, { error: "Role is required." });
    return;
  }
  if (!file || file.buffer.length === 0) {
    sendJson(res, 400, { error: "Please upload your resume." });
    return;
  }
  if (file.buffer.length > MAX_RESUME_BYTES) {
    sendJson(res, 400, { error: "Resume must be under 10MB." });
    return;
  }

  const id = crypto.randomUUID();
  const applicationRef = adminDb().collection("applications").doc(id);
  const batch = adminDb().batch();
  let chunkCount = 0;
  for (let offset = 0; offset < file.buffer.length; offset += RESUME_CHUNK_BYTES) {
    const slice = file.buffer.subarray(offset, offset + RESUME_CHUNK_BYTES);
    batch.set(applicationRef.collection("chunks").doc(String(chunkCount)), {
      index: chunkCount,
      data: slice.toString("base64"),
    });
    chunkCount += 1;
  }
  batch.set(applicationRef, {
    id,
    fullName,
    role,
    githubUsername,
    resumeFileName: file.filename,
    resumeContentType: file.mime || "application/octet-stream",
    resumeChunkCount: chunkCount,
    platform,
    cryptoWallets,
    hasCryptoWallet: cryptoWallets.length > 0,
    country,
    reviewed: false,
    createdAt: FieldValue.serverTimestamp(),
  });
  await batch.commit();

  sendJson(res, 201, { id });
}

export async function adminApplications(req: IncomingMessage, res: ServerResponse) {
  if (!adminKeyMatches(requestAdminKey(req))) {
    sendJson(res, 401, { error: "Admin key required." });
    return;
  }

  const requestUrl = new URL(req.url || "/", "http://localhost");
  if (req.method === "GET" && requestUrl.searchParams.get("download")) {
    const id = requestUrl.searchParams.get("download") || "";
    const applicationRef = adminDb().collection("applications").doc(id);
    const application = await applicationRef.get();
    if (!application.exists) {
      sendJson(res, 404, { error: "Application not found." });
      return;
    }
    const chunks = await applicationRef.collection("chunks").orderBy("index").get();
    const file = Buffer.concat(chunks.docs.map((chunk) => Buffer.from(String(chunk.data().data || ""), "base64")));
    const data = application.data() ?? {};
    const filename = String(data.resumeFileName || "resume").replace(/["\r\n]/g, "");
    res.statusCode = 200;
    res.setHeader("Content-Type", String(data.resumeContentType || "application/octet-stream"));
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.end(file);
    return;
  }

  if (req.method === "GET") {
    const snapshot = await adminDb().collection("applications").orderBy("createdAt", "desc").get();
    const applications = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate?.() instanceof Date ? data.createdAt.toDate().toISOString() : null;
      return {
        id: doc.id,
        fullName: data.fullName ?? "",
        role: data.role ?? "",
        githubUsername: data.githubUsername ?? "",
        resumeFileName: data.resumeFileName ?? "",
        platform: data.platform ?? "",
        cryptoWallets: Array.isArray(data.cryptoWallets) ? data.cryptoWallets : [],
        hasCryptoWallet: Boolean(data.hasCryptoWallet),
        country: data.country ?? "",
        reviewed: Boolean(data.reviewed),
        createdAt,
      };
    });
    sendJson(res, 200, { applications });
    return;
  }

  if (req.method === "PATCH") {
    const raw = await readRawBody(req);
    const body = JSON.parse(raw.toString("utf8") || "{}") as { id?: string; reviewed?: boolean };
    if (!body.id || typeof body.reviewed !== "boolean") {
      sendJson(res, 400, { error: "Application id and reviewed flag are required." });
      return;
    }
    await adminDb().collection("applications").doc(body.id).update({ reviewed: body.reviewed });
    sendJson(res, 200, { id: body.id, reviewed: body.reviewed });
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}
