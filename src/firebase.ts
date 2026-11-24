import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore, getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import firebaseConfig from "../firebase-applet-config.json";

// Strict Production Cloud Database Constants
export const PRODUCTION_FIREBASE_PROJECT_ID = "genial-bucksaw-wxctm";
export const PRODUCTION_FIRESTORE_DATABASE_ID = "ai-studio-moostechyacademy-08157dac-f115-4378-87dc-fed1e0ada623";
export const PRODUCTION_FIRESTORE_REGION = "europe-west1";

// Ensure production configuration is strictly locked to live cloud project and database with zero demo/local fallback
const effectiveConfig = {
  ...firebaseConfig,
  projectId: PRODUCTION_FIREBASE_PROJECT_ID,
  firestoreDatabaseId: PRODUCTION_FIRESTORE_DATABASE_ID,
  storageBucket: firebaseConfig.storageBucket || `${PRODUCTION_FIREBASE_PROJECT_ID}.firebasestorage.app`,
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(effectiveConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Initialize Firestore strictly targeting the production database ID with ZERO fallback to (default) or demo databases
let dbInstance;
if (typeof window !== "undefined") {
  try {
    dbInstance = initializeFirestore(
      app,
      {
        experimentalForceLongPolling: true,
        ignoreUndefinedProperties: true,
      },
      PRODUCTION_FIRESTORE_DATABASE_ID
    );
  } catch {
    dbInstance = getFirestore(app, PRODUCTION_FIRESTORE_DATABASE_ID);
  }
} else {
  dbInstance = getFirestore(app, PRODUCTION_FIRESTORE_DATABASE_ID);
}
export const db = dbInstance;

// Test Firestore connection as required by Firebase integration skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
if (typeof window !== "undefined") {
  testConnection();
}

// Initialize Firebase Storage
let storageInstance: FirebaseStorage;
try {
  storageInstance = getStorage(app, firebaseConfig.storageBucket ? `gs://${firebaseConfig.storageBucket}` : undefined);
} catch {
  storageInstance = getStorage(app);
}
export const storage = storageInstance;

// Operation types for standard error handling
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email || null,
      })) || [],
    },
    operationType,
    path,
  };
  console.warn("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default app;
