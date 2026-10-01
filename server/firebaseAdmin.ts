import { readFileSync } from "node:fs";
import path from "node:path";
import { Storage } from "@google-cloud/storage";
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const PROJECT_ID = "tokenbricklabs-7b9ec";
const STORAGE_BUCKETS = [`${PROJECT_ID}.appspot.com`, `${PROJECT_ID}.firebasestorage.app`, `${PROJECT_ID}-resumes`];

function loadServiceAccount(): ServiceAccount {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (fromEnv) return JSON.parse(fromEnv) as ServiceAccount;
  const filePath = path.resolve(process.cwd(), "secrets", "firebase-admin.json");
  return JSON.parse(readFileSync(filePath, "utf8")) as ServiceAccount;
}

export function getAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;
  const serviceAccount = loadServiceAccount();
  return initializeApp({
    credential: cert(serviceAccount),
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKETS[0],
  });
}

export function adminDb() {
  getAdminApp();
  return getFirestore();
}

export function adminBucket(name?: string) {
  getAdminApp();
  return getStorage().bucket(name ?? STORAGE_BUCKETS[0]);
}

async function ensureBucket(name: string) {
  const serviceAccount = loadServiceAccount() as ServiceAccount & { client_email?: string; private_key?: string };
  const storage = new Storage({
    projectId: PROJECT_ID,
    credentials: {
      client_email: serviceAccount.clientEmail ?? serviceAccount.client_email ?? "",
      private_key: serviceAccount.privateKey ?? serviceAccount.private_key ?? "",
    },
  });
  const bucket = storage.bucket(name);
  const [exists] = await bucket.exists();
  if (!exists) {
    await storage.createBucket(name, { location: "US", uniformBucketLevelAccess: true });
  }
}

export async function saveResume(resumePath: string, buffer: Buffer, contentType: string) {
  let lastError: unknown;
  for (const name of STORAGE_BUCKETS) {
    try {
      if (name.endsWith("-resumes")) await ensureBucket(name);
      await adminBucket(name).file(resumePath).save(buffer, { contentType, resumable: false });
      return name;
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : "";
      if (!/does not exist|not found|permission|denied/i.test(message)) throw error;
    }
  }
  throw lastError;
}
