// server/applications.ts
import { Readable } from "node:stream";
import Busboy from "busboy";
import { FieldValue } from "firebase-admin/firestore";

// server/firebaseAdmin.ts
import { readFileSync } from "node:fs";
import path from "node:path";
import "@google-cloud/firestore";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, initializeFirestore } from "firebase-admin/firestore";
var PROJECT_ID = "tokenbricklabs-7b9ec";
function unwrap(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') || trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
function normalizeAccount(account) {
  const privateKey = (account.privateKey ?? account.private_key ?? "").replace(/\\n/g, "\n");
  return {
    projectId: account.projectId ?? account.project_id ?? PROJECT_ID,
    clientEmail: account.clientEmail ?? account.client_email,
    privateKey
  };
}
function parseServiceAccount(raw) {
  const trimmed = unwrap(raw).trim();
  const json = trimmed.startsWith("{") ? trimmed : Buffer.from(trimmed.replace(/\s/g, ""), "base64").toString("utf8");
  return normalizeAccount(JSON.parse(json));
}
function loadServiceAccount() {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (fromEnv) return parseServiceAccount(fromEnv);
  if (process.env.VERCEL) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not set in the Vercel project.");
  }
  const filePath = path.resolve(process.cwd(), "secrets", "firebase-admin.json");
  return normalizeAccount(JSON.parse(readFileSync(filePath, "utf8")));
}
function getAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;
  const app = initializeApp({
    credential: cert(loadServiceAccount()),
    projectId: PROJECT_ID
  });
  initializeFirestore(app, { preferRest: true });
  return app;
}
function adminDb() {
  return getFirestore(getAdminApp());
}

// server/applications.ts
var MAX_RESUME_BYTES = 10 * 1024 * 1024;
var RESUME_CHUNK_BYTES = 4e5;
var GITHUB_USERNAME = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;
function sendJson(res, status, body) {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}
function readRawBody(req) {
  const preset = req.body;
  if (Buffer.isBuffer(preset)) return Promise.resolve(preset);
  if (typeof preset === "string") return Promise.resolve(Buffer.from(preset));
  if (req.readableEnded) return Promise.resolve(Buffer.alloc(0));
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
function readMultipart(req) {
  return readRawBody(req).then(
    (raw) => new Promise((resolve, reject) => {
      const fields = {};
      let file = null;
      const busboy = Busboy({
        headers: req.headers,
        limits: { fileSize: MAX_RESUME_BYTES, files: 1, fields: 12 }
      });
      busboy.on("field", (name, value) => {
        fields[name] = value;
      });
      busboy.on("file", (_name, stream, info) => {
        const chunks = [];
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
      Readable.from(raw).pipe(busboy);
    })
  );
}
function normalizeGithubUsername(value) {
  const trimmed = value.trim().replace(/^@/, "");
  const fromUrl = trimmed.match(/github\.com\/([A-Za-z0-9-]+)/i);
  return fromUrl?.[1] ?? trimmed;
}
async function createApplication(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }
  const { fields, file } = await readMultipart(req);
  const fullName = (fields.fullName ?? "").trim();
  const githubUsername = normalizeGithubUsername(fields.githubUsername ?? "");
  const role = (fields.role ?? "").trim();
  const platform = (fields.platform ?? "Unknown").trim().slice(0, 80);
  const city = (fields.city ?? "").trim().slice(0, 80);
  const region = (fields.region ?? "").trim().slice(0, 80);
  const country = (fields.country ?? "Unknown").trim().slice(0, 80);
  let cryptoWallets = [];
  try {
    const parsed = JSON.parse(fields.cryptoWallets || "[]");
    if (Array.isArray(parsed)) {
      cryptoWallets = parsed.filter((item) => typeof item === "string").slice(0, 12);
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
      data: slice.toString("base64")
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
    city,
    region,
    country,
    reviewed: false,
    remarks: "",
    createdAt: FieldValue.serverTimestamp()
  });
  await batch.commit();
  sendJson(res, 201, { id });
}

// server/entries/applications.ts
function sendError(res, error) {
  if (res.headersSent) return;
  const message = error instanceof Error ? error.message : "Server error";
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}
async function handler(req, res) {
  try {
    await createApplication(req, res);
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
}
export {
  handler as default
};
