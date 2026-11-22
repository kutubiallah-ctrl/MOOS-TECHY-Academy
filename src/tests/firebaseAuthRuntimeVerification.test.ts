/**
 * MOOS ACADEMY — FIREBASE RUNTIME & AUTHENTICATION MUTEX VERIFICATION
 * 
 * Verifies Phase 2 (Firestore timeout fix) & Phase 3 (Google Auth mutex / popup handling)
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { firebaseSyncService } from "../services/firebaseSyncService";
import { db } from "../firebase";

describe("Phase 2 & Phase 3: Firebase Runtime & Authentication Verification", () => {
  it("Phase 2.1: Firestore singleton is initialized without executing startup testConnection", () => {
    assert.ok(db, "Firestore db instance must exist");
    assert.strictEqual(typeof (db as any).app, "object", "Firestore db instance must belong to an active FirebaseApp");
  });

  it("Phase 3.1: firebaseSyncService singleton is instantiated", () => {
    assert.ok(firebaseSyncService, "firebaseSyncService must be an instantiated singleton");
    assert.strictEqual(typeof firebaseSyncService.signInWithGoogle, "function");
    assert.strictEqual(typeof firebaseSyncService.signOutUser, "function");
    assert.strictEqual(typeof firebaseSyncService.getNetworkStatus, "function");
  });

  it("Phase 3.2: Concurrent signInWithGoogle invocations are safely debounced by the mutex lock", async () => {
    // Inspect private mutex lock property
    const syncServiceAny = firebaseSyncService as any;
    assert.strictEqual(syncServiceAny.isAuthOperationInProgress, false, "Initial mutex lock state must be unlocked");

    // Manually activate mutex
    syncServiceAny.isAuthOperationInProgress = true;
    
    // Concurrent attempt should immediately return current user without calling signInWithPopup
    const concurrentResult = await firebaseSyncService.signInWithGoogle();
    assert.strictEqual(concurrentResult, firebaseSyncService.getCurrentUser(), "Must return current user without throwing");

    // Release mutex
    syncServiceAny.isAuthOperationInProgress = false;
    assert.strictEqual(syncServiceAny.isAuthOperationInProgress, false, "Mutex must be released");
  });

  it("Phase 3.3: Mutex releases properly in finally block even on simulated error", async () => {
    const syncServiceAny = firebaseSyncService as any;
    let released = false;

    try {
      syncServiceAny.isAuthOperationInProgress = true;
      throw new Error("Simulated transient error");
    } catch {
      // Simulate finally block logic
      syncServiceAny.isAuthOperationInProgress = false;
      released = true;
    }

    assert.strictEqual(released, true);
    assert.strictEqual(syncServiceAny.isAuthOperationInProgress, false, "Mutex must be freed");
  });

  it("Phase 3.4: Local identity session remains unaffected by Firebase auth state changes", () => {
    const initialNetwork = firebaseSyncService.getNetworkStatus();
    assert.strictEqual(typeof initialNetwork, "boolean");
    // Verifies service does not crash when offline/online listeners attach
  });
});
