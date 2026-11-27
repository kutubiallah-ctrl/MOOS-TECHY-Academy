import { ExtendedLearnerProfile } from "../types/learner";
import { emailAllowlistService } from "./emailAllowlistService";
import { firebaseSyncService } from "./firebaseSyncService";
import { mergeLearnerProfiles } from "./progressMerge";

const PENDING_SYNC_QUEUE_KEY = "moos_academy_pending_sync_v1";

export interface PendingSyncEntry {
  accountKey: string;
  profile: ExtendedLearnerProfile;
  queuedAt: string;
  mutationReason: string;
  retryCount: number;
  lastError?: string;
}

export interface SyncDispatchResult {
  syncedServer: boolean;
  syncedFirestore: boolean;
  queuedOffline: boolean;
  mergedFromServer?: ExtendedLearnerProfile;
  error?: string;
}

class ProgressSyncCoordinator {
  private static instance: ProgressSyncCoordinator;
  private apiBaseUrlOverride: string | null = null;
  private isFlushing = false;
  private listenerAttached = false;

  private constructor() {
    this.attachOnlineListener();
  }

  public static getInstance(): ProgressSyncCoordinator {
    if (!ProgressSyncCoordinator.instance) {
      ProgressSyncCoordinator.instance = new ProgressSyncCoordinator();
    }
    return ProgressSyncCoordinator.instance;
  }

  public attachOnlineListener(): void {
    if (
      this.listenerAttached ||
      typeof window === "undefined" ||
      typeof window.addEventListener !== "function"
    ) {
      return;
    }
    this.listenerAttached = true;
    window.addEventListener("online", () => {
      this.flushPendingSync().catch((e) => {
        console.warn("Deferred online sync flush warning:", e);
      });
    });
  }

  public setApiBaseUrlForTesting(baseUrl: string | null): void {
    this.apiBaseUrlOverride = baseUrl;
  }

  private resolveApiUrl(path: string): string | null {
    if (this.apiBaseUrlOverride) {
      return `${this.apiBaseUrlOverride.replace(/\/$/, "")}${path}`;
    }
    if (typeof window !== "undefined" && typeof window.location !== "undefined") {
      return path;
    }
    return null;
  }

  private isBrowserOnline(): boolean {
    if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
      return navigator.onLine;
    }
    return firebaseSyncService.getNetworkStatus();
  }

  private readPendingQueue(): Record<string, PendingSyncEntry> {
    try {
      if (typeof localStorage === "undefined") return {};
      const raw = localStorage.getItem(PENDING_SYNC_QUEUE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  private writePendingQueue(queue: Record<string, PendingSyncEntry>): void {
    try {
      if (typeof localStorage === "undefined") return;
      if (Object.keys(queue).length === 0) {
        localStorage.removeItem(PENDING_SYNC_QUEUE_KEY);
      } else {
        localStorage.setItem(PENDING_SYNC_QUEUE_KEY, JSON.stringify(queue));
      }
    } catch {
      // Storage quota errors do not break runtime
    }
  }

  public getPendingSyncQueue(): PendingSyncEntry[] {
    return Object.values(this.readPendingQueue());
  }

  public clearPendingQueueForTesting(): void {
    this.writePendingQueue({});
  }

  private getAccountKey(profile: ExtendedLearnerProfile): string {
    const activeEmail = emailAllowlistService.getActiveVerifiedEmail();
    return (activeEmail || profile.email || profile.id || "anonymous").trim().toLowerCase();
  }

  public queueOfflineSnapshot(
    profile: ExtendedLearnerProfile,
    mutationReason: string = "mutation",
    lastError?: string
  ): void {
    const accountKey = this.getAccountKey(profile);
    const queue = this.readPendingQueue();
    const existing = queue[accountKey];
    queue[accountKey] = {
      accountKey,
      profile,
      queuedAt: new Date().toISOString(),
      mutationReason,
      retryCount: existing ? existing.retryCount + (lastError ? 1 : 0) : 0,
      lastError
    };
    this.writePendingQueue(queue);
  }

  public clearPendingSnapshot(accountKey: string, syncedRevision?: number): void {
    const queue = this.readPendingQueue();
    const entry = queue[accountKey];
    if (!entry) return;
    if (
      typeof syncedRevision === "number" &&
      typeof entry.profile.syncRevision === "number" &&
      entry.profile.syncRevision > syncedRevision
    ) {
      // A newer mutation arrived while this sync was in-flight; keep it queued.
      return;
    }
    delete queue[accountKey];
    this.writePendingQueue(queue);
  }

  private async pushToServerApi(
    accountEmail: string,
    profile: ExtendedLearnerProfile
  ): Promise<{ ok: boolean; canonicalProgress?: Record<string, any>; error?: string }> {
    const url = this.resolveApiUrl(`/api/learner/progress/${encodeURIComponent(accountEmail)}`);
    const token = emailAllowlistService.getActiveToken();
    if (!url || !token || typeof fetch !== "function") {
      return { ok: false, error: "NO_SERVER_SESSION_OR_TRANSPORT" };
    }

    try {
      const resp = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.allowed) {
        return {
          ok: false,
          error: data?.message || `HTTP_${resp.status}`
        };
      }
      return {
        ok: true,
        canonicalProgress: data.progress
      };
    } catch (err: any) {
      return {
        ok: false,
        error: err?.message || "NETWORK_ERROR"
      };
    }
  }

  private async fetchFromServerApi(accountEmail: string): Promise<Record<string, any> | null> {
    const url = this.resolveApiUrl(`/api/learner/progress/${encodeURIComponent(accountEmail)}`);
    const token = emailAllowlistService.getActiveToken();
    if (!url || !token || typeof fetch !== "function") {
      return null;
    }

    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!resp.ok) return null;
      const data = await resp.json().catch(() => null);
      if (data?.allowed && data?.progress) {
        return data.progress;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Unified mutation sync pipeline: pushes every learner state mutation to both
   * server /api/learner/progress/:accountEmail and Firestore learnerProfiles/{uid},
   * queuing cleanly in localStorage whenever offline or transiently unreachable.
   */
  public async syncProfileMutation(
    profile: ExtendedLearnerProfile,
    mutationReason: string = "mutation"
  ): Promise<SyncDispatchResult> {
    const accountEmail = emailAllowlistService.getActiveVerifiedEmail();
    const hasFirebaseUser = Boolean(firebaseSyncService.getCurrentUser());
    const accountKey = this.getAccountKey(profile);

    // Queue immediately when offline so reconnect can always recover
    if (!this.isBrowserOnline()) {
      if (accountEmail || hasFirebaseUser) {
        this.queueOfflineSnapshot(profile, mutationReason, "OFFLINE");
      }
      return {
        syncedServer: false,
        syncedFirestore: false,
        queuedOffline: Boolean(accountEmail || hasFirebaseUser),
        error: "OFFLINE"
      };
    }

    if (!accountEmail && !hasFirebaseUser) {
      return {
        syncedServer: false,
        syncedFirestore: false,
        queuedOffline: false
      };
    }

    let syncedServer = !accountEmail;
    let syncedFirestore = !hasFirebaseUser;
    let serverError: string | undefined;
    let firestoreError: string | undefined;
    let mergedFromServer: ExtendedLearnerProfile | undefined;

    if (accountEmail) {
      const scopedProfile =
        profile.email?.toLowerCase() === accountEmail.toLowerCase()
          ? profile
          : { ...profile, email: accountEmail };
      const apiRes = await this.pushToServerApi(accountEmail, scopedProfile);
      syncedServer = apiRes.ok;
      if (!apiRes.ok) {
        serverError = apiRes.error;
      } else if (apiRes.canonicalProgress) {
        mergedFromServer = mergeLearnerProfiles(scopedProfile, apiRes.canonicalProgress);
      }
    }

    if (hasFirebaseUser) {
      const fbRes = await firebaseSyncService.syncLearnerProfileToCloud(mergedFromServer || profile);
      syncedFirestore = fbRes.synced;
      if (!fbRes.synced) {
        firestoreError = fbRes.error;
      }
    }

    const requiresQueue =
      (Boolean(accountEmail) && !syncedServer && serverError !== "NO_SERVER_SESSION_OR_TRANSPORT") ||
      (hasFirebaseUser && !syncedFirestore);

    if (requiresQueue) {
      const errMsg = [serverError, firestoreError].filter(Boolean).join("; ");
      this.queueOfflineSnapshot(profile, mutationReason, errMsg || "SYNC_FAILED");
      return {
        syncedServer,
        syncedFirestore,
        queuedOffline: true,
        mergedFromServer,
        error: errMsg
      };
    }

    this.clearPendingSnapshot(accountKey, profile.syncRevision);
    return {
      syncedServer,
      syncedFirestore,
      queuedOffline: false,
      mergedFromServer
    };
  }

  /**
   * Drains any queued offline progress updates safely after connectivity restores or re-auth.
   */
  public async flushPendingSync(): Promise<{
    flushedCount: number;
    remainingCount: number;
    syncedProfiles: ExtendedLearnerProfile[];
  }> {
    if (this.isFlushing || !this.isBrowserOnline()) {
      const remaining = this.getPendingSyncQueue().length;
      return { flushedCount: 0, remainingCount: remaining, syncedProfiles: [] };
    }

    this.isFlushing = true;
    const syncedProfiles: ExtendedLearnerProfile[] = [];
    let flushedCount = 0;

    try {
      const entries = this.getPendingSyncQueue();
      const activeEmail = emailAllowlistService.getActiveVerifiedEmail();
      const hasFirebase = Boolean(firebaseSyncService.getCurrentUser());

      for (const entry of entries) {
        if (!activeEmail && !hasFirebase) continue;
        if (activeEmail && entry.accountKey !== activeEmail.toLowerCase()) continue;

        const res = await this.syncProfileMutation(entry.profile, `flush:${entry.mutationReason}`);
        if (!res.queuedOffline && (res.syncedServer || res.syncedFirestore)) {
          flushedCount++;
          syncedProfiles.push(res.mergedFromServer || entry.profile);
        }
      }

      return {
        flushedCount,
        remainingCount: this.getPendingSyncQueue().length,
        syncedProfiles
      };
    } finally {
      this.isFlushing = false;
    }
  }

  /**
   * Full hydration + bidirectional reconciliation executed on reload or sign-in:
   * 1. Flushes any queued offline work so local unsynced attempts are never lost.
   * 2. Pulls remote server + Firestore progress for the authenticated account.
   * 3. Deterministically merges local + remote without overwriting newer items.
   * 4. Pushes merged state back if local held unsynced data.
   */
  public async hydrateAndReconcileForSession(
    localProfile: ExtendedLearnerProfile
  ): Promise<ExtendedLearnerProfile> {
    await this.flushPendingSync().catch(() => {});

    let reconciled = localProfile;
    const activeEmail = emailAllowlistService.getActiveVerifiedEmail();
    let fetchedRemote = false;

    if (activeEmail && this.isBrowserOnline()) {
      const serverProgress = await this.fetchFromServerApi(activeEmail);
      if (serverProgress && (serverProgress.updatedAt || serverProgress.syncRevision || Object.keys(serverProgress.masteryRecords || {}).length > 0 || (serverProgress.questionAttempts || []).length > 0 || (serverProgress.examHistory || []).length > 0)) {
        reconciled = mergeLearnerProfiles(reconciled, serverProgress);
        fetchedRemote = true;
      }
    }

    if (firebaseSyncService.getCurrentUser() && this.isBrowserOnline()) {
      const cloudData = await firebaseSyncService.fetchLearnerProfileFromCloud();
      if (cloudData) {
        reconciled = mergeLearnerProfiles(reconciled, cloudData);
        fetchedRemote = true;
      }
    }

    // Ensure reconciled state (including any local offline entries) is pushed back to remotes
    if (fetchedRemote || (reconciled.questionAttempts?.length || 0) > 0 || (reconciled.examHistory?.length || 0) > 0) {
      await this.syncProfileMutation(reconciled, "reconcile_hydration");
    }

    return reconciled;
  }
}

export const progressSyncCoordinator = ProgressSyncCoordinator.getInstance();
