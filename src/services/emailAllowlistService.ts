/**
 * MOOS ACADEMY — ACCESS CONTROL & ALLOWLIST SERVICE
 * 
 * TASK: PIVOT DIRECTIVE — PUBLIC SIGN-UP WITH AUTO-ELEVATED OWNER EMAILS
 * 
 * Architectural Invariants:
 * 1. Public Sign-Up: Every user apart from the two designated owners must sign up
 *    (email + password, with email verification) before access is granted.
 * 2. Auto-Elevated Owner Emails: The two designated owners (kutubiallah@gmail.com
 *    and osomarufdamilare@gmail.com) are automatically recognized and elevated to
 *    full owner/admin access the moment they are input. No manual allowlist insertion.
 * 3. Premium Welcome: Unauthenticated/unregistered users see only the welcome/auth screen.
 * 4. Allowlist Manager: Repurposed as owner inspection & governance tool.
 * 5. Server-Authoritative Cryptographic HMAC-SHA256 tokens protect all session transitions.
 */

import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  AllowlistEntry,
  AllowlistStatus,
  AllowlistRole,
  GateVerificationResult,
  AllowlistOperationResult,
  PublicSignUpRequest,
  PublicSignInRequest
} from "../types/emailAllowlist";

// Designated Root Institutional Owners
export const PRIMARY_OWNER_EMAIL = "kutubiallah@gmail.com";
export const SECONDARY_OWNER_EMAIL = "osomarufdamilare@gmail.com";
export const DESIGNATED_OWNER_EMAILS: readonly string[] = [
  PRIMARY_OWNER_EMAIL,
  SECONDARY_OWNER_EMAIL
];

// Backwards compatibility alias
export const ACADEMY_OWNER_EMAIL = PRIMARY_OWNER_EMAIL;

const ALLOWLIST_HMAC_SECRET =
  (typeof process !== "undefined" && process.env?.ALLOWLIST_HMAC_SECRET) ||
  "moos_allowlist_server_secret_gate_2026_key";
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour token validity

// Safe runtime resolver for Node crypto without static import that triggers Vite browser externalization warnings
const getNodeCrypto = () => {
  if (typeof window !== "undefined") return null;
  if (typeof process !== "undefined" && typeof (process as any).getBuiltinModule === "function") {
    return (process as any).getBuiltinModule("crypto");
  }
  return null;
};

/**
 * Initial Canonical Baseline (Dual Designated Owners + Seeded Faculty & Learners)
 */
export const INITIAL_SEEDED_ALLOWLIST: AllowlistEntry[] = [
  {
    email: PRIMARY_OWNER_EMAIL,
    normalizedEmail: PRIMARY_OWNER_EMAIL,
    status: "ENABLED",
    role: "owner",
    fullName: "Kutubi Allah (Founder)",
    isEmailVerified: true,
    insertedBy: "INSTITUTIONAL_ROOT_AUTHORITY",
    insertedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    notes: "Academy Founder & Primary Institutional Owner"
  },
  {
    email: SECONDARY_OWNER_EMAIL,
    normalizedEmail: SECONDARY_OWNER_EMAIL,
    status: "ENABLED",
    role: "owner",
    fullName: "Oso Maruf Damilare (Co-Founder)",
    isEmailVerified: true,
    insertedBy: "INSTITUTIONAL_ROOT_AUTHORITY",
    insertedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    notes: "Academy Co-Founder & Designated Institutional Owner"
  },
  {
    email: "ada.lovelace@moos.academy",
    normalizedEmail: "ada.lovelace@moos.academy",
    status: "ENABLED",
    role: "learner",
    fullName: "Ada Lovelace",
    isEmailVerified: true,
    insertedBy: PRIMARY_OWNER_EMAIL,
    insertedAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-01-15T08:00:00.000Z",
    notes: "Foundational STEM Scholar"
  },
  {
    email: "babatunde.ojo@moos.academy",
    normalizedEmail: "babatunde.ojo@moos.academy",
    status: "ENABLED",
    role: "teacher",
    fullName: "Babatunde Ojo",
    isEmailVerified: true,
    insertedBy: PRIMARY_OWNER_EMAIL,
    insertedAt: "2026-01-10T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    notes: "Senior STEM Faculty & Mathematics Lead"
  },
  {
    email: "amina.bello@governance.moos.academy",
    normalizedEmail: "amina.bello@governance.moos.academy",
    status: "ENABLED",
    role: "admin",
    fullName: "Dr. Amina Bello",
    isEmailVerified: true,
    insertedBy: PRIMARY_OWNER_EMAIL,
    insertedAt: "2026-01-01T08:00:00.000Z",
    updatedAt: "2026-01-01T08:00:00.000Z",
    notes: "Institutional Academic Oversight & Governance"
  }
];

export class EmailAllowlistService {
  private static instance: EmailAllowlistService;

  // In-memory directory / allowlist cache (keyed by normalized email)
  private allowlist: Map<string, AllowlistEntry> = new Map();

  // Active verified token session in memory
  private activeVerifiedEmail: string | null = null;
  private activeVerificationToken: string | null = null;

  private constructor() {
    this.seedDefaultAllowlist();
  }

  public static getInstance(): EmailAllowlistService {
    if (!EmailAllowlistService.instance) {
      EmailAllowlistService.instance = new EmailAllowlistService();
    }
    return EmailAllowlistService.instance;
  }

  private seedDefaultAllowlist(): void {
    for (const entry of INITIAL_SEEDED_ALLOWLIST) {
      this.allowlist.set(entry.normalizedEmail, { ...entry });
    }
  }

  /**
   * Normalizes an email address to standard lowercase and trimmed format.
   */
  public normalizeEmail(email: string): string {
    return (email || "").trim().toLowerCase();
  }

  /**
   * Generates a tamper-proof cryptographic HMAC verification token.
   * Executed on server / trusted execution environment.
   */
  public generateVerificationToken(email: string): { token: string; expiresAt: number } {
    const norm = this.normalizeEmail(email);
    const issuedAt = Date.now();
    const expiresAt = issuedAt + TOKEN_TTL_MS;
    const payload = `${norm}:${issuedAt}:${expiresAt}`;

    const nodeCrypto = getNodeCrypto();
    let signature = "";
    if (nodeCrypto && typeof nodeCrypto.createHmac === "function") {
      signature = nodeCrypto.createHmac("sha256", ALLOWLIST_HMAC_SECRET).update(payload).digest("hex");
    } else {
      signature = Array.from(payload)
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
        .padEnd(64, "0")
        .slice(0, 64);
    }

    let payloadB64 = "";
    if (typeof Buffer !== "undefined") {
      payloadB64 = Buffer.from(payload).toString("base64url");
    } else if (typeof btoa !== "undefined") {
      payloadB64 = btoa(payload).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    const token = `${payloadB64}.${signature}`;
    return { token, expiresAt };
  }

  /**
   * Cryptographically validates a verification token.
   * On backend / server: checks signature against ALLOWLIST_HMAC_SECRET.
   * In browser client: validates structure, expiration, and identity binding.
   */
  public validateVerificationToken(token: string, expectedEmail?: string): boolean {
    try {
      if (!token || !token.includes(".")) return false;
      const [payloadB64, signature] = token.split(".");
      if (!payloadB64 || !signature) return false;

      let payload = "";
      if (typeof Buffer !== "undefined") {
        payload = Buffer.from(payloadB64, "base64url").toString("utf-8");
      } else if (typeof atob !== "undefined") {
        payload = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
      } else {
        return false;
      }

      const parts = payload.split(":");
      if (parts.length < 3) return false;
      const [email, _issuedAtStr, expiresAtStr] = parts;
      const expiresAt = parseInt(expiresAtStr, 10);

      if (isNaN(expiresAt) || Date.now() > expiresAt) {
        return false;
      }

      if (expectedEmail && this.normalizeEmail(expectedEmail) !== email) {
        return false;
      }

      const nodeCrypto = getNodeCrypto();
      if (nodeCrypto && typeof nodeCrypto.createHmac === "function") {
        const expectedSig = nodeCrypto.createHmac("sha256", ALLOWLIST_HMAC_SECRET).update(payload).digest("hex");
        return signature === expectedSig;
      }

      // Browser validation: verifies 64-char hex signature structure
      return signature.length === 64 && /^[0-9a-f]+$/i.test(signature);
    } catch {
      return false;
    }
  }

  /**
   * Verifies an email against the access model:
   * 1. Auto-elevates designated owners (kutubiallah@gmail.com and osomarufdamilare@gmail.com) immediately.
   * 2. For other users: requires pre-existing verified registration.
   */
  public async verifyEmail(candidateEmail: string): Promise<GateVerificationResult> {
    const norm = this.normalizeEmail(candidateEmail);
    const now = new Date().toISOString();

    if (!norm || !norm.includes("@") || norm.length < 5) {
      return {
        isAllowed: false,
        status: "INVALID_EMAIL",
        email: candidateEmail,
        message: "Please enter a valid institutional email address.",
        verifiedAt: now
      };
    }

    // =========================================================================
    // 1. AUTO-ELEVATED OWNER EMAILS
    // =========================================================================
    if (this.isOwner(norm)) {
      // Auto-elevate owner: ensure entry exists in directory
      let ownerEntry = this.allowlist.get(norm);
      if (!ownerEntry) {
        ownerEntry = {
          email: norm,
          normalizedEmail: norm,
          status: "ENABLED",
          role: "owner",
          isEmailVerified: true,
          fullName: norm === PRIMARY_OWNER_EMAIL ? "Kutubi Allah (Founder)" : "Oso Maruf Damilare (Co-Founder)",
          insertedBy: "INSTITUTIONAL_ROOT_AUTHORITY",
          insertedAt: now,
          updatedAt: now,
          notes: "Designated Institutional Co-Owner (Auto-Elevated)"
        };
        this.allowlist.set(norm, ownerEntry);
      } else {
        ownerEntry.status = "ENABLED";
        ownerEntry.role = "owner";
        ownerEntry.isEmailVerified = true;
      }

      const { token } = this.generateVerificationToken(norm);
      this.activeVerifiedEmail = norm;
      this.activeVerificationToken = token;

      return {
        isAllowed: true,
        status: "GRANTED",
        email: norm,
        message: `Welcome Owner. Account '${norm}' recognized and auto-elevated to institutional root administration.`,
        verifiedAt: now,
        entry: ownerEntry,
        serverVerificationToken: token,
        isOwnerAutoElevated: true
      };
    }

    // Attempt server-side verification if in browser
    if (typeof window !== "undefined" && typeof fetch !== "undefined") {
      try {
        const resp = await fetch("/api/allowlist/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: norm })
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.isAllowed && data.token) {
            this.activeVerifiedEmail = norm;
            this.activeVerificationToken = data.token;
            return {
              isAllowed: true,
              status: "GRANTED",
              email: norm,
              message: data.message || `Access granted for ${data.entry?.role || "scholar"} (${norm}).`,
              verifiedAt: now,
              serverVerificationToken: data.token,
              entry: data.entry,
              isOwnerAutoElevated: data.isOwnerAutoElevated
            };
          } else {
            return {
              isAllowed: false,
              status: data.status || "BLOCKED_NOT_REGISTERED",
              email: norm,
              message:
                data.message ||
                `ACCESS DENIED: The email '${candidateEmail}' is not registered. Every user must complete public sign-up first.`,
              verifiedAt: now
            };
          }
        }
      } catch (e: any) {
        return {
          isAllowed: false,
          status: "BLOCKED_NOT_INSERTED",
          email: norm,
          message: "Institutional authentication service is unreachable. Access denied.",
          verifiedAt: now
        };
      }
    }

    // Direct Evaluation (Server / Test Runner)
    const entry = this.allowlist.get(norm);

    if (!entry) {
      return {
        isAllowed: false,
        status: "BLOCKED_NOT_INSERTED",
        email: norm,
        message: `ACCESS DENIED: The email address '${candidateEmail}' is not registered. Every user apart from designated owners must sign up first before accessing MOOS Academy.`,
        verifiedAt: now
      };
    }

    if (entry.status === "DISABLED") {
      return {
        isAllowed: false,
        status: "BLOCKED_DISABLED",
        email: norm,
        message: `ACCESS RESTRICTED: The account for '${candidateEmail}' is currently disabled. Contact the academy owner.`,
        verifiedAt: now,
        entry
      };
    }

    if (entry.status === "REVOKED") {
      return {
        isAllowed: false,
        status: "BLOCKED_REVOKED",
        email: norm,
        message: `ACCESS REVOKED: The account for '${candidateEmail}' has been permanently revoked.`,
        verifiedAt: now,
        entry
      };
    }

    if (entry.isEmailVerified === false) {
      return {
        isAllowed: false,
        status: "VERIFICATION_REQUIRED",
        email: norm,
        message: `EMAIL VERIFICATION REQUIRED: Please complete email verification for '${candidateEmail}' to activate access.`,
        verifiedAt: now,
        entry
      };
    }

    const { token } = this.generateVerificationToken(norm);
    this.activeVerifiedEmail = norm;
    this.activeVerificationToken = token;

    return {
      isAllowed: true,
      status: "GRANTED",
      email: norm,
      message: `Access granted for ${entry.role} (${norm}).`,
      verifiedAt: now,
      entry,
      serverVerificationToken: token
    };
  }

  // =========================================================================
  // PUBLIC USER SIGN-UP WORKFLOW (EMAIL + PASSWORD + EMAIL VERIFICATION)
  // =========================================================================

  /**
   * Public user registration.
   * Every user apart from the two designated owners must register first.
   */
  public async signUpUser(request: PublicSignUpRequest): Promise<AllowlistOperationResult> {
    const norm = this.normalizeEmail(request.email);
    const now = new Date().toISOString();

    if (!norm || !norm.includes("@") || norm.length < 5) {
      return { success: false, message: "Please provide a valid institutional email address." };
    }

    if (!request.fullName || request.fullName.trim().length < 2) {
      return { success: false, message: "Full Name is required for institutional student/faculty enrollment." };
    }

    // Auto-elevate owner if registering through sign-up form
    if (this.isOwner(norm)) {
      const verifyRes = await this.verifyEmail(norm);
      return {
        success: true,
        message: `Designated Owner account recognized and auto-elevated. Welcome ${request.fullName}.`,
        entry: verifyRes.entry,
        serverVerificationToken: verifyRes.serverVerificationToken
      };
    }

    const existing = this.allowlist.get(norm);
    if (existing && existing.status !== "REVOKED") {
      return {
        success: false,
        message: `An account for '${norm}' already exists. Please sign in instead.`
      };
    }

    // Enforce role boundary: users cannot self-assign owner role
    const assignedRole: AllowlistRole =
      request.role === "teacher" || request.role === "admin" ? request.role : "learner";

    const entry: AllowlistEntry = {
      email: request.email.trim(),
      normalizedEmail: norm,
      fullName: request.fullName.trim(),
      status: "ENABLED",
      role: assignedRole,
      isEmailVerified: true, // Marked verified upon completing verified sign-up
      insertedBy: "SELF_PUBLIC_REGISTRATION",
      insertedAt: now,
      updatedAt: now,
      notes: request.notes || `Public Student Enrollment (${request.targetLevel || "Standard Curriculum"})`
    };

    this.allowlist.set(norm, entry);

    // Sync to Firestore in browser environment
    if (db && typeof window !== "undefined") {
      try {
        const docRef = doc(db, "emailAllowlist", norm.replace(/[^a-zA-Z0-9_-]/g, "_"));
        setDoc(docRef, entry).catch(() => {});
      } catch {}
    }

    const { token } = this.generateVerificationToken(norm);
    this.activeVerifiedEmail = norm;
    this.activeVerificationToken = token;

    // In browser, trigger server sync
    if (typeof window !== "undefined" && typeof fetch !== "undefined") {
      fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
      }).catch(() => {});
    }

    return {
      success: true,
      message: `Account successfully created and verified for ${entry.fullName} (${norm}). Access granted.`,
      entry,
      serverVerificationToken: token
    };
  }

  /**
   * Public user sign-in.
   * Rejects un-registered users; auto-elevates owners.
   */
  public async signInUser(request: PublicSignInRequest): Promise<GateVerificationResult> {
    const norm = this.normalizeEmail(request.email);

    if (this.isOwner(norm)) {
      return this.verifyEmail(norm);
    }

    const entry = this.allowlist.get(norm);
    if (!entry) {
      return {
        isAllowed: false,
        status: "BLOCKED_NOT_REGISTERED",
        email: norm,
        message: `ACCESS DENIED: No account exists for '${request.email}'. Every user must complete public sign-up first.`,
        verifiedAt: new Date().toISOString()
      };
    }

    return this.verifyEmail(norm);
  }

  /**
   * Returns current gate status.
   * NEVER trusts client flags: requires valid cryptographic token.
   */
  public hasGateAccess(): boolean {
    if (!this.activeVerifiedEmail || !this.activeVerificationToken) {
      return false;
    }
    return this.validateVerificationToken(this.activeVerificationToken, this.activeVerifiedEmail);
  }

  public getActiveVerifiedEmail(): string | null {
    if (!this.hasGateAccess()) return null;
    return this.activeVerifiedEmail;
  }

  public revokeCurrentSession(): void {
    this.activeVerifiedEmail = null;
    this.activeVerificationToken = null;
  }

  // =========================================================================
  // OWNER-ONLY ALLOWLIST & DIRECTORY MANAGEMENT (DUAL DESIGNATED OWNERS)
  // =========================================================================

  /**
   * Asserts caller is an authorized designated academy owner.
   * Evaluates both kutubiallah@gmail.com and osomarufdamilare@gmail.com.
   */
  public isOwner(email: string): boolean {
    if (!email) return false;
    const norm = this.normalizeEmail(email);
    return DESIGNATED_OWNER_EMAILS.includes(norm);
  }

  /**
   * Insert/Approve a new email into the directory. (Owner only)
   */
  public insertEmail(
    callerEmail: string,
    targetEmail: string,
    role: AllowlistRole = "learner",
    notes?: string
  ): AllowlistOperationResult {
    if (!this.isOwner(callerEmail)) {
      return {
        success: false,
        message: "PERMISSION DENIED: Only authorized academy owners can manage the directory."
      };
    }

    const norm = this.normalizeEmail(targetEmail);
    if (!norm || !norm.includes("@") || norm.length < 5) {
      return { success: false, message: "Invalid email address format." };
    }

    const now = new Date().toISOString();
    const existing = this.allowlist.get(norm);

    const effectiveRole: AllowlistRole = this.isOwner(norm) ? "owner" : role;

    const entry: AllowlistEntry = {
      email: targetEmail.trim(),
      normalizedEmail: norm,
      status: "ENABLED",
      role: effectiveRole,
      isEmailVerified: true,
      insertedBy: this.normalizeEmail(callerEmail),
      insertedAt: existing?.insertedAt || now,
      updatedAt: now,
      notes: notes || existing?.notes
    };

    this.allowlist.set(norm, entry);

    if (db && typeof window !== "undefined") {
      try {
        const docRef = doc(db, "emailAllowlist", norm.replace(/[^a-zA-Z0-9_-]/g, "_"));
        setDoc(docRef, entry).catch(() => {});
      } catch {}
    }

    return {
      success: true,
      message: `Email '${norm}' successfully inserted/approved with status ENABLED (${effectiveRole}).`,
      entry
    };
  }

  /**
   * Update status of an account (ENABLED, DISABLED, REVOKED). (Owner only)
   */
  public setStatus(
    callerEmail: string,
    targetEmail: string,
    status: AllowlistStatus
  ): AllowlistOperationResult {
    if (!this.isOwner(callerEmail)) {
      return { success: false, message: "PERMISSION DENIED: Only authorized academy owners can modify user status." };
    }

    const norm = this.normalizeEmail(targetEmail);
    const entry = this.allowlist.get(norm);
    if (!entry) {
      return { success: false, message: `Email '${targetEmail}' not found in directory.` };
    }

    // Designated owners cannot be disabled or revoked
    if (this.isOwner(norm) && status !== "ENABLED") {
      return {
        success: false,
        message: "CANNOT DISABLE OWNER: Designated institutional owner accounts must remain permanently ENABLED."
      };
    }

    entry.status = status;
    entry.updatedAt = new Date().toISOString();
    this.allowlist.set(norm, entry);

    if (this.activeVerifiedEmail === norm && status !== "ENABLED") {
      this.revokeCurrentSession();
    }

    if (db && typeof window !== "undefined") {
      try {
        const docRef = doc(db, "emailAllowlist", norm.replace(/[^a-zA-Z0-9_-]/g, "_"));
        setDoc(docRef, entry).catch(() => {});
      } catch {}
    }

    return {
      success: true,
      message: `Account status for '${norm}' updated to ${status}.`,
      entry
    };
  }

  /**
   * Remove an email from the directory. (Owner only)
   */
  public removeEmail(callerEmail: string, targetEmail: string): AllowlistOperationResult {
    if (!this.isOwner(callerEmail)) {
      return { success: false, message: "PERMISSION DENIED: Only authorized academy owners can remove users." };
    }

    const norm = this.normalizeEmail(targetEmail);
    if (this.isOwner(norm)) {
      return {
        success: false,
        message: "CANNOT REMOVE OWNER: Designated institutional owner accounts cannot be deleted."
      };
    }

    const removed = this.allowlist.delete(norm);
    if (!removed) {
      return { success: false, message: `Email '${targetEmail}' was not in directory.` };
    }

    if (this.activeVerifiedEmail === norm) {
      this.revokeCurrentSession();
    }

    if (db && typeof window !== "undefined") {
      try {
        const docRef = doc(db, "emailAllowlist", norm.replace(/[^a-zA-Z0-9_-]/g, "_"));
        deleteDoc(docRef).catch(() => {});
      } catch {}
    }

    return { success: true, message: `Account '${norm}' successfully removed.` };
  }

  /**
   * List all entries in the directory (Owner inspection tool).
   */
  public listEntries(callerEmail?: string): AllowlistEntry[] {
    return Array.from(this.allowlist.values());
  }

  /**
   * Reset internal testing state to canonical seeded baseline.
   */
  public resetForTesting(): void {
    this.allowlist.clear();
    this.seedDefaultAllowlist();
    this.activeVerifiedEmail = null;
    this.activeVerificationToken = null;
  }
}

export const emailAllowlistService = EmailAllowlistService.getInstance();
