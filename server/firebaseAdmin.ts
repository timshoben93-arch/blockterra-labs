import { readFileSync } from "node:fs";
import path from "node:path";
import "@google-cloud/firestore";
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, initializeFirestore } from "firebase-admin/firestore";

const PROJECT_ID = "tokenbricklabs-7b9ec";

type AccountJson = ServiceAccount & {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

function unwrap(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function normalizeAccount(account: AccountJson): ServiceAccount {
  const privateKey = (account.privateKey ?? account.private_key ?? "").replace(/\\n/g, "\n");
  return {
    projectId: account.projectId ?? account.project_id ?? PROJECT_ID,
    clientEmail: account.clientEmail ?? account.client_email,
    privateKey,
  };
}

function parseServiceAccount(raw: string): ServiceAccount {
  const trimmed = unwrap(raw).trim();
  const json = trimmed.startsWith("{")
    ? trimmed
    : Buffer.from(trimmed.replace(/\s/g, ""), "base64").toString("utf8");
  return normalizeAccount(JSON.parse(json) as AccountJson);
}

function loadServiceAccount(): ServiceAccount {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (fromEnv) return parseServiceAccount(fromEnv);
  if (process.env.VERCEL) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not set in the Vercel project.");
  }
  const filePath = path.resolve(process.cwd(), "secrets", "firebase-admin.json");
  return normalizeAccount(JSON.parse(readFileSync(filePath, "utf8")) as AccountJson);
}

export function getAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;
  const app = initializeApp({
    credential: cert(loadServiceAccount()),
    projectId: PROJECT_ID,
  });
  initializeFirestore(app, { preferRest: true });
  return app;
}

export function adminDb() {
  return getFirestore(getAdminApp());
}
