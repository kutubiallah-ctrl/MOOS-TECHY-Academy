import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  getMultiFactorResolver,
  MultiFactorResolver
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { auth, googleProvider, db, handleFirestoreError, OperationType } from "../firebase";
import { mfaService } from "./mfaService";
import { ExtendedLearnerProfile } from "../types/learner";

export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  error: string | null;
}

export class FirebaseSyncService {
  private static instance: FirebaseSyncService;
  private currentUser: FirebaseUser | null = null;
  private syncListeners: ((user: FirebaseUser | null) => void)[] = [];
  private isOnline: boolean = typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
  private isAuthOperationInProgress: boolean = false;
  private authInitialized: boolean = false;
  private authReadyResolvers: Array<(user: FirebaseUser | null) => void> = [];

  private constructor() {
    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
      window.addEventListener("online", () => {
        this.isOnline = true;
      });
      window.addEventListener("offline", () => {
        this.isOnline = false;
      });
    }

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      if (!this.authInitialized) {
        this.authInitialized = true;
        const resolvers = this.authReadyResolvers.splice(0);
        resolvers.forEach((resolve) => resolve(user));
      }
      this.syncListeners.forEach((listener) => {
        try {
          listener(user);
        } catch (e) {
          console.warn("Auth listener notification error:", e);
        }
      });
      if (user) {
        this.syncUserProfileOnAuth(user).catch((e) => {
          console.warn("User profile sync deferred (offline or permission):", e);
        });
      }
    });
  }

  public static getInstance(): FirebaseSyncService {
    if (!FirebaseSyncService.instance) {
      FirebaseSyncService.instance = new FirebaseSyncService();
    }
    return FirebaseSyncService.instance;
  }

  public waitForAuthReady(): Promise<FirebaseUser | null> {
    if (this.authInitialized) {
      return Promise.resolve(this.currentUser);
    }
    if (typeof (auth as any)?.authStateReady === "function") {
      return (auth as any)
        .authStateReady()
        .then(() => {
          this.currentUser = auth.currentUser;
          this.authInitialized = true;
          return this.currentUser;
        })
        .catch(() => this.currentUser);
    }
    return new Promise((resolve) => {
      this.authReadyResolvers.push(resolve);
      setTimeout(() => {
        if (!this.authInitialized) {
          this.authInitialized = true;
          resolve(this.currentUser);
        }
      }, 2500);
    });
  }

  public onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
    this.syncListeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.syncListeners = this.syncListeners.filter((cb) => cb !== callback);
    };
  }

  public getCurrentUser(): FirebaseUser | null {
    return this.currentUser;
  }

  public getNetworkStatus(): boolean {
    return this.isOnline;
  }

  private mfaChallengeListeners: Array<(resolver: MultiFactorResolver) => void> = [];

  public onMfaChallenge(callback: (resolver: MultiFactorResolver) => void): () => void {
    this.mfaChallengeListeners.push(callback);
    return () => {
      this.mfaChallengeListeners = this.mfaChallengeListeners.filter((cb) => cb !== callback);
    };
  }

  public async signInWithGoogle(): Promise<FirebaseUser | null> {
    if (this.isAuthOperationInProgress) {
      console.warn("Google sign-in is already in progress. Ignoring duplicate invocation.");
      return this.currentUser;
    }

    this.isAuthOperationInProgress = true;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.currentUser = result.user;
      return result.user;
    } catch (error: any) {
      const errorCode = error?.code || "";
      const errorMessage = error?.message || "";

      // Handle Firebase Identity Platform Multi-Factor Authentication Challenge
      if (
        errorCode === "auth/multi-factor-auth-required" ||
        errorMessage.includes("multi-factor-auth-required")
      ) {
        try {
          const resolver = getMultiFactorResolver(auth, error);
          mfaService.setActiveSignInResolver(resolver);
          this.mfaChallengeListeners.forEach((listener) => {
            try {
              listener(resolver);
            } catch (e) {
              console.warn("MFA challenge listener error:", e);
            }
          });
          return null;
        } catch (resolverErr) {
          console.error("Failed to extract multi-factor resolver:", resolverErr);
          throw error;
        }
      }

      // 1. User intentionally closed or cancelled popup window
      if (
        errorCode === "auth/popup-closed-by-user" ||
        errorCode === "auth/cancelled-popup-request" ||
        errorMessage.includes("popup-closed-by-user")
      ) {
        console.info("Google sign-in popup was dismissed or closed by the user.");
        return null;
      }

      // 2. Browser blocked popup window (e.g. inside sandboxed iframe)
      if (
        errorCode === "auth/popup-blocked" ||
        errorMessage.includes("popup-blocked")
      ) {
        console.warn("Google sign-in popup was blocked by the browser. Prompting user to allow popups.");
        throw error;
      }

      // 3. Transient Firebase Auth internal assertion during concurrent / fast popup interaction
      if (errorMessage.includes("Pending promise was never set")) {
        console.warn("Handled transient Firebase Auth pending promise assertion gracefully.");
        return null;
      }

      console.warn("Google sign-in notice:", errorMessage || error);
      throw error;
    } finally {
      // Small debounce delay before resetting the lock so browser popup cleanup finishes
      setTimeout(() => {
        this.isAuthOperationInProgress = false;
      }, 350);
    }
  }

  public async signOutUser(): Promise<void> {
    try {
      await signOut(auth);
      this.currentUser = null;
    } catch (error: any) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  private async syncUserProfileOnAuth(user: FirebaseUser): Promise<void> {
    if (!user || !user.uid) return;
    const path = `users/${user.uid}`;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          id: user.uid,
          email: user.email || "",
          displayName: user.displayName || "Academy Scholar",
          photoURL: user.photoURL || "",
          role: "learner",
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString()
        });
      } else {
        await setDoc(userDocRef, {
          lastActiveAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (err: any) {
      // Graceful error logging for offline/network issues
      console.warn("Could not sync user profile document to Firestore:", err?.message || err);
    }
  }

  public async syncLearnerProfileToCloud(
    profile: ExtendedLearnerProfile
  ): Promise<{ synced: boolean; error?: string }> {
    if (!this.currentUser) {
      return { synced: false, error: "NOT_AUTHENTICATED" };
    }
    try {
      const profileDocRef = doc(db, "learnerProfiles", this.currentUser.uid);
      const boundedAttempts = (profile.questionAttempts || []).slice(0, 300);
      const boundedActivities = (
        profile.activityHistory ||
        (profile as any).recentActivities ||
        []
      ).slice(0, 100);
      const boundedExams = (profile.examHistory || []).slice(0, 50);
      const boundedDiagnostics = (profile.diagnosticHistory || []).slice(0, 30);

      await setDoc(
        profileDocRef,
        {
          userId: this.currentUser.uid,
          email: profile.email || this.currentUser.email || "",
          name: profile.name || this.currentUser.displayName || "Academy Scholar",
          role: profile.role || "learner",
          targetLevel: profile.targetLevel || "senior_secondary",
          curriculum: profile.curriculum || "WAEC_WASSCE",
          selectedSubjectIds: profile.selectedSubjectIds || [],
          activeSubjectId: profile.activeSubjectId || "math_core",
          activeUnitId: profile.activeUnitId || "",
          academicContext: profile.academicContext || null,
          streak: profile.streak || { count: profile.streakDays || 1, lastActiveDate: new Date().toISOString().slice(0, 10), longestStreak: profile.streakDays || 1 },
          streakDays: profile.streakDays || profile.streak?.count || 0,
          totalStudyMinutes: profile.totalStudyMinutes || (profile as any).totalMinutesStudied || 0,
          totalMinutesStudied: profile.totalStudyMinutes || (profile as any).totalMinutesStudied || 0,
          xp: profile.xp || 0,
          level: profile.level || 1,
          masteryPoints: profile.masteryPoints || 0,
          masteryRecords: profile.masteryRecords || {},
          completedSkills: Object.keys(profile.masteryRecords || {}),
          questionAttempts: boundedAttempts,
          activityHistory: boundedActivities,
          recentActivities: boundedActivities.slice(0, 30),
          examHistory: boundedExams,
          diagnosticsCompleted: Boolean(profile.diagnosticsCompleted),
          lastDiagnosticResult: profile.lastDiagnosticResult || null,
          diagnosticHistory: boundedDiagnostics,
          unlockedBadges: profile.unlockedBadges || [],
          preferences: profile.preferences || null,
          syncRevision: profile.syncRevision || 1,
          lastActiveDate: profile.streak?.lastActiveDate || profile.updatedAt || new Date().toISOString(),
          updatedAt: profile.updatedAt || new Date().toISOString()
        },
        { merge: true }
      );
      return { synced: true };
    } catch (err: any) {
      const msg = err?.message || String(err);
      console.warn("Firestore profile sync error (retained in offline queue):", msg);
      return { synced: false, error: msg };
    }
  }

  public async fetchLearnerProfileFromCloud(): Promise<Partial<ExtendedLearnerProfile> | null> {
    if (!this.currentUser) return null;
    try {
      const profileDocRef = doc(db, "learnerProfiles", this.currentUser.uid);
      const snap = await getDoc(profileDocRef);
      if (snap.exists()) {
        return snap.data() as Partial<ExtendedLearnerProfile>;
      }
      return null;
    } catch (err: any) {
      console.warn("Firestore profile fetch error (falling back to local state):", err?.message || err);
      return null;
    }
  }

  /**
   * Reconciles local and cloud profile state deterministically using conflict-safe union merge.
   * Preserves questionAttempts, examHistory, activityHistory, diagnosticHistory, masteryRecords, and badges.
   */
  public async reconcileLearnerProfile(localProfile: ExtendedLearnerProfile): Promise<ExtendedLearnerProfile> {
    if (!this.currentUser) {
      return localProfile;
    }

    try {
      const cloudData = await this.fetchLearnerProfileFromCloud();
      if (!cloudData) {
        await this.syncLearnerProfileToCloud(localProfile);
        return localProfile;
      }

      const { mergeLearnerProfiles } = await import("./progressMerge");
      const merged = mergeLearnerProfiles(localProfile, cloudData);

      const localTime = Date.parse(localProfile.updatedAt || "") || 0;
      const cloudTime = Date.parse(cloudData.updatedAt || "") || 0;
      if (localTime >= cloudTime) {
        await this.syncLearnerProfileToCloud(merged);
      }

      return merged;
    } catch (err) {
      console.warn("Reconciliation deferred; continuing with local profile:", err);
      return localProfile;
    }
  }

  public async saveGeneratedVideoMetadata(videoRecord: {
    id: string;
    prompt: string;
    aspectRatio: string;
    model: string;
    status: string;
    operationName?: string;
    videoUrl?: string;
  }): Promise<void> {
    if (!this.currentUser) return;
    const path = `generatedVideos/${videoRecord.id}`;
    try {
      const docRef = doc(db, "generatedVideos", videoRecord.id);
      await setDoc(docRef, {
        ...videoRecord,
        userId: this.currentUser.uid,
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn("Firestore save video metadata error:", err?.message || err);
    }
  }

  public async saveAudioTranscription(transcription: {
    id: string;
    transcript: string;
    model: string;
    durationSeconds: number;
  }): Promise<void> {
    if (!this.currentUser) return;
    const path = `audioTranscriptions/${transcription.id}`;
    try {
      const docRef = doc(db, "audioTranscriptions", transcription.id);
      await setDoc(docRef, {
        ...transcription,
        userId: this.currentUser.uid,
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn("Firestore save audio transcription error:", err?.message || err);
    }
  }
}

export const firebaseSyncService = FirebaseSyncService.getInstance();
