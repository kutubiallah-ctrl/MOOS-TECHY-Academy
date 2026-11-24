/**
 * MOOS ACADEMY — CLIENT AUTHENTICATION & ACCESS GATEWAY SERVICE
 *
 * Security Hardening Invariants (Strategic Development Directive 002):
 * 1. ZERO hardcoded owner emails, admin credentials, or signing secrets in browser bundles.
 * 2. Passwordless/email-only login bypass is permanently disabled.
 * 3. Owner privilege recognition & auto-elevation happen strictly server-side after
 *    password verification or cryptographically verified Firebase Authentication.
 * 4. All privileged directory API calls transmit Bearer session tokens in Authorization headers.
 */

import {
  AllowlistEntry,
  AllowlistOperationResult,
  AllowlistRole,
  AllowlistStatus,
  GateVerificationResult,
  PublicSignInRequest,
  PublicSignUpRequest,
  VerifiedAuthSession
} from "../types/emailAllowlist";

export class EmailAllowlistService {
  private static instance: EmailAllowlistService;

  private activeSession: VerifiedAuthSession | null = null;
  private activeVerificationToken: string | null = null;

  private constructor() {}

  public static getInstance(): EmailAllowlistService {
    if (!EmailAllowlistService.instance) {
      EmailAllowlistService.instance = new EmailAllowlistService();
    }
    return EmailAllowlistService.instance;
  }

  public normalizeEmail(email: string): string {
    return (email || "").trim().toLowerCase();
  }

  private decodeSessionPayload(token: string): VerifiedAuthSession | null {
    try {
      if (!token || !token.includes(".")) return null;
      const [payloadB64, signature] = token.split(".");
      if (!payloadB64 || !signature || !/^[0-9a-f]{64}$/i.test(signature)) return null;

      let jsonStr = "";
      if (typeof Buffer !== "undefined") {
        jsonStr = Buffer.from(payloadB64, "base64url").toString("utf8");
      } else if (typeof atob !== "undefined") {
        jsonStr = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
      } else {
        return null;
      }

      const parsed = JSON.parse(jsonStr) as VerifiedAuthSession;
      if (!parsed || !parsed.email || !parsed.role || typeof parsed.expiresAt !== "number") {
        return null;
      }
      if (Date.now() > parsed.expiresAt) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  private setVerifiedSession(token: string, session?: VerifiedAuthSession): VerifiedAuthSession | null {
    const resolved = session || this.decodeSessionPayload(token);
    if (!resolved || Date.now() > resolved.expiresAt) {
      this.revokeCurrentSession();
      return null;
    }
    this.activeVerificationToken = token;
    this.activeSession = resolved;
    return resolved;
  }

  /**
   * Email-only unauthenticated verification is intentionally retired for security.
   * Callers must authenticate via signInUser (with password) or exchangeFirebaseToken.
   */
  public async verifyEmail(candidateEmail: string): Promise<GateVerificationResult> {
    const norm = this.normalizeEmail(candidateEmail);
    const now = new Date().toISOString();

    if (!norm || !norm.includes("@") || norm.length < 5) {
      return {
        isAllowed: false,
        status: "INVALID_EMAIL",
        email: candidateEmail,
        message: "Please enter a valid email address.",
        verifiedAt: now
      };
    }

    return {
      isAllowed: false,
      status: "INVALID_CREDENTIALS",
      email: norm,
      message: "ACCESS DENIED: Valid password or verified Firebase authentication is required.",
      verifiedAt: now
    };
  }

  /**
   * Authenticates an existing account through server-verified email + password.
   */
  public async signInUser(request: PublicSignInRequest): Promise<GateVerificationResult> {
    const norm = this.normalizeEmail(request.email);
    const now = new Date().toISOString();

    if (!norm || !norm.includes("@")) {
      return {
        isAllowed: false,
        status: "INVALID_EMAIL",
        email: request.email,
        message: "Please enter a valid email address.",
        verifiedAt: now
      };
    }

    if (!request.password || request.password.length < 8) {
      return {
        isAllowed: false,
        status: "INVALID_CREDENTIALS",
        email: norm,
        message: "ACCESS DENIED: Password (minimum 8 characters) or verified Firebase Sign-In is required.",
        verifiedAt: now
      };
    }

    if (typeof fetch !== "undefined") {
      try {
        const resp = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: norm, password: request.password })
        });
        const data = (await resp.json().catch(() => ({}))) as GateVerificationResult;
        if (resp.ok && data.isAllowed && data.serverVerificationToken) {
          this.setVerifiedSession(data.serverVerificationToken, data.session);
          return data;
        }
        return {
          isAllowed: false,
          status: data.status || "INVALID_CREDENTIALS",
          email: norm,
          message: data.message || "Invalid email or password.",
          verifiedAt: now
        };
      } catch {
        return {
          isAllowed: false,
          status: "INVALID_CREDENTIALS",
          email: norm,
          message: "Authentication server unavailable. Unable to verify credentials.",
          verifiedAt: now
        };
      }
    }

    return {
      isAllowed: false,
      status: "INVALID_CREDENTIALS",
      email: norm,
      message: "Authentication server required for credential verification.",
      verifiedAt: now
    };
  }

  /**
   * Public user registration (restricted exclusively to learner or teacher roles).
   */
  public async signUpUser(request: PublicSignUpRequest): Promise<AllowlistOperationResult> {
    const norm = this.normalizeEmail(request.email);

    if (!norm || !norm.includes("@") || norm.length < 5) {
      return { success: false, message: "Please provide a valid email address." };
    }
    if (!request.fullName || request.fullName.trim().length < 2) {
      return { success: false, message: "Full name is required (minimum 2 characters)." };
    }
    if (!request.password || request.password.length < 8) {
      return { success: false, message: "Password must be at least 8 characters long." };
    }
    if (request.role === "admin" || request.role === "owner") {
      return {
        success: false,
        message: "Self-registration cannot assign 'admin' or 'owner' roles."
      };
    }

    if (typeof fetch !== "undefined") {
      try {
        const resp = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: request.fullName.trim(),
            email: norm,
            password: request.password,
            role: request.role === "teacher" ? "teacher" : "learner",
            targetLevel: request.targetLevel,
            notes: request.notes
          })
        });
        const data = (await resp.json().catch(() => ({}))) as AllowlistOperationResult;
        if (resp.ok && data.success && data.serverVerificationToken) {
          this.setVerifiedSession(data.serverVerificationToken, data.session);
          return data;
        }
        return {
          success: false,
          message: data.message || "Registration could not be completed."
        };
      } catch {
        return {
          success: false,
          message: "Authentication server unreachable during sign-up."
        };
      }
    }

    return {
      success: false,
      message: "Authentication server required for registration."
    };
  }

  /**
   * Exchanges a verified Firebase Auth ID token for a server-verified Academy session.
   * Owner role elevation occurs purely on the server after cryptographic JWT + email_verified verification.
   */
  public async exchangeFirebaseIdToken(idToken: string): Promise<GateVerificationResult> {
    const now = new Date().toISOString();
    try {
      const resp = await fetch("/api/auth/firebase-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      const data = (await resp.json().catch(() => ({}))) as GateVerificationResult;
      if (resp.ok && data.isAllowed && data.serverVerificationToken) {
        this.setVerifiedSession(data.serverVerificationToken, data.session);
        return data;
      }
      return {
        isAllowed: false,
        status: data.status || "INVALID_CREDENTIALS",
        email: data.email || "",
        message: data.message || "Firebase session verification failed.",
        verifiedAt: now
      };
    } catch {
      return {
        isAllowed: false,
        status: "INVALID_CREDENTIALS",
        email: "",
        message: "Unable to contact authentication server for Firebase verification.",
        verifiedAt: now
      };
    }
  }

  public hasGateAccess(): boolean {
    if (!this.activeVerificationToken || !this.activeSession) {
      return false;
    }
    if (Date.now() > this.activeSession.expiresAt) {
      this.revokeCurrentSession();
      return false;
    }
    return true;
  }

  public getActiveVerifiedEmail(): string | null {
    return this.hasGateAccess() ? this.activeSession!.email : null;
  }

  public getActiveToken(): string | null {
    return this.hasGateAccess() ? this.activeVerificationToken : null;
  }

  public getActiveSession(): VerifiedAuthSession | null {
    return this.hasGateAccess() ? { ...this.activeSession! } : null;
  }

  public getActiveRole(): AllowlistRole | null {
    return this.hasGateAccess() ? this.activeSession!.role : null;
  }

  public isActiveSessionOwner(): boolean {
    return this.hasGateAccess() && this.activeSession!.isOwner === true;
  }

  public isActiveSessionAdminOrOwner(): boolean {
    return this.hasGateAccess() && this.activeSession!.isAdminOrOwner === true;
  }

  public getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = this.getActiveToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  public revokeCurrentSession(): void {
    this.activeSession = null;
    this.activeVerificationToken = null;
  }

  // =========================================================================
  // SERVER-AUTHORITATIVE OWNER DIRECTORY MANAGEMENT (BEARER TOKEN ONLY)
  // =========================================================================
  public async fetchDirectoryEntries(): Promise<AllowlistOperationResult> {
    if (!this.isActiveSessionOwner()) {
      return { success: false, message: "PERMISSION DENIED: Authenticated Academy Owner session required." };
    }
    try {
      const resp = await fetch("/api/allowlist/list", {
        method: "GET",
        headers: this.getAuthHeaders()
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        return { success: false, message: data.error || "Access denied." };
      }
      return { success: true, message: "Directory loaded.", entries: data.entries || [] };
    } catch {
      return { success: false, message: "Failed to contact directory server." };
    }
  }

  public async insertEmailRemote(
    targetEmail: string,
    role: AllowlistRole = "learner",
    notes?: string
  ): Promise<AllowlistOperationResult> {
    if (!this.isActiveSessionOwner()) {
      return { success: false, message: "PERMISSION DENIED: Owner session required." };
    }
    try {
      const resp = await fetch("/api/allowlist/insert", {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ targetEmail, role, notes })
      });
      return (await resp.json()) as AllowlistOperationResult;
    } catch {
      return { success: false, message: "Network error while inserting allowlist entry." };
    }
  }

  public async setStatusRemote(targetEmail: string, status: AllowlistStatus): Promise<AllowlistOperationResult> {
    if (!this.isActiveSessionOwner()) {
      return { success: false, message: "PERMISSION DENIED: Owner session required." };
    }
    try {
      const resp = await fetch("/api/allowlist/status", {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ targetEmail, status })
      });
      return (await resp.json()) as AllowlistOperationResult;
    } catch {
      return { success: false, message: "Network error while updating account status." };
    }
  }

  public async removeEmailRemote(targetEmail: string): Promise<AllowlistOperationResult> {
    if (!this.isActiveSessionOwner()) {
      return { success: false, message: "PERMISSION DENIED: Owner session required." };
    }
    try {
      const resp = await fetch("/api/allowlist/remove", {
        method: "DELETE",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ targetEmail })
      });
      return (await resp.json()) as AllowlistOperationResult;
    } catch {
      return { success: false, message: "Network error while removing allowlist entry." };
    }
  }

  public listEntries(): AllowlistEntry[] {
    return [];
  }

  public resetForTesting(): void {
    this.activeSession = null;
    this.activeVerificationToken = null;
  }
}

export const emailAllowlistService = EmailAllowlistService.getInstance();
