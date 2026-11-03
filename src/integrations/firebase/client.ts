import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export class FirebaseConfigError extends Error {
  constructor() {
    super("Firebase is not configured. Add the web app keys from the Firebase console.");
  }
}

type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

function readConfig(): FirebaseWebConfig | null {
  const config: FirebaseWebConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  };
  if (Object.values(config).some((value) => value.trim().length === 0)) return null;
  return config;
}

function getFirebaseApp(): FirebaseApp {
  const existing = getApps()[0];
  if (existing) return existing;
  const config = readConfig();
  if (!config) throw new FirebaseConfigError();
  return initializeApp(config);
}

export type JobApplicationRecord = {
  id: string;
  fullName: string;
  role: string;
  githubUsername: string;
  resume: File;
  platform: string;
  cryptoWallets: string[];
  country: string;
};

export async function saveJobApplication(application: JobApplicationRecord) {
  const app = getFirebaseApp();
  const safeName = application.resume.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const resumePath = `resumes/${application.id}/${safeName}`;

  await uploadBytes(ref(getStorage(app), resumePath), application.resume, {
    contentType: application.resume.type || "application/octet-stream",
  });

  await setDoc(doc(getFirestore(app), "applications", application.id), {
    id: application.id,
    fullName: application.fullName,
    role: application.role,
    githubUsername: application.githubUsername,
    resumePath,
    resumeFileName: application.resume.name,
    platform: application.platform,
    cryptoWallets: application.cryptoWallets,
    hasCryptoWallet: application.cryptoWallets.length > 0,
    country: application.country,
    reviewed: false,
    createdAt: serverTimestamp(),
  });
}
