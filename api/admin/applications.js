// server/applications.ts
import { timingSafeEqual } from "node:crypto";
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
function adminKeyMatches(provided) {
  const expected = (process.env.ADMIN_DASHBOARD_KEY ?? "").trim().replace(/^["']|["']$/g, "");
  if (!expected || !provided) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
function requestAdminKey(req) {
  const header = req.headers["x-admin-key"];
  return Array.isArray(header) ? header[0] : header;
}
async function adminApplications(req, res) {
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
        createdAt
      };
    });
    sendJson(res, 200, { applications });
    return;
  }
  if (req.method === "PATCH") {
    const raw = await readRawBody(req);
    const body = JSON.parse(raw.toString("utf8") || "{}");
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

// server/entries/adminApplications.ts
function sendError(res, error) {
  if (res.headersSent) return;
  const message = error instanceof Error ? error.message : "Server error";
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}
async function handler(req, res) {
  try {
    await adminApplications(req, res);
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
}
export {
  handler as default
};
