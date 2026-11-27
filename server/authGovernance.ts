/**
 * MOOS ACADEMY — SERVER-AUTHORITATIVE AUTHENTICATION & ACCESS GOVERNANCE
 *
 * Strictly server-side module (NEVER imported into browser React/Vite bundles).
 *
 * Security Guarantees:
 * 1. Designated owner addresses live ONLY on the server (or ACADEMY_OWNER_EMAILS env).
 * 2. Ephemeral or env-injected 256-bit HMAC signing key (zero hardcoded fallback secret).
 * 3. Per-user scrypt password hashing + timing-safe comparison.
 * 4. Owner elevation occurs ONLY after valid password verification or verified Firebase ID token.
 * 5. Public sign-up strictly forbids self-assignment of 'admin' or 'owner' roles.
 * 6. Bearer token authentication replaces spoofable headers/body callerEmail claims.
 */

import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";
import type {
  AllowlistEntry,
  AllowlistOperationResult,
  AllowlistRole,
  AllowlistStatus,
  GateVerificationResult,
  PublicSignInRequest,
  PublicSignUpRequest,
  VerifiedAuthSession
} from "../src/types/emailAllowlist";
import { mergeLearnerProgressPayloads } from "../src/services/progressMerge";

const FIREBASE_PROJECT_ID = "genial-bucksaw-wxctm";
const FIREBASE_TOKEN_ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const GOOGLE_X509_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

const DEFAULT_SERVER_OWNER_EMAILS = [
  "kutubiallah@gmail.com",
  "osomarufdamilare@gmail.com"
] as const;

function resolveServerOwnerEmails(): string[] {
  const fromEnv = process.env.ACADEMY_OWNER_EMAILS;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
  return [...DEFAULT_SERVER_OWNER_EMAILS];
}

// Ephemeral cryptographically random key generated once per server process when env not supplied
const SERVER_HMAC_SECRET =
  process.env.ALLOWLIST_HMAC_SECRET && process.env.ALLOWLIST_HMAC_SECRET.length >= 32
    ? process.env.ALLOWLIST_HMAC_SECRET
    : crypto.randomBytes(32).toString("hex");

interface InternalUserRecord extends AllowlistEntry {
  passwordHash?: string;
}

interface CertCache {
  certs: Record<string, string>;
  expiresAtMs: number;
}

export interface AuthenticatedRequest extends Request {
  authSession?: VerifiedAuthSession;
}

export class ServerAuthGovernance {
  private static instance: ServerAuthGovernance;
  private directory: Map<string, InternalUserRecord> = new Map();
  private revokedTokens: Map<string, number> = new Map();
  private learnerProgressStore: Map<string, Record<string, any>> = new Map();
  private googleCertCache: CertCache | null = null;
  private testFirebaseCerts: Record<string, string> | null = null;

  private constructor() {
    this.seedBaseline();
  }

  public static getInstance(): ServerAuthGovernance {
    if (!ServerAuthGovernance.instance) {
      ServerAuthGovernance.instance = new ServerAuthGovernance();
    }
    return ServerAuthGovernance.instance;
  }

  public normalizeEmail(email: string): string {
    return (email || "").trim().toLowerCase();
  }

  public getOwnerEmails(): readonly string[] {
    return resolveServerOwnerEmails();
  }

  public isOwner(email: string | undefined | null): boolean {
    if (!email) return false;
    const norm = this.normalizeEmail(email);
    return resolveServerOwnerEmails().includes(norm);
  }

  public hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const derived = crypto.scryptSync(password, salt, 64).toString("hex");
    return `scrypt:${salt}:${derived}`;
  }

  public verifyPassword(password: string, storedHash?: string): boolean {
    if (!password || !storedHash) return false;
    const parts = storedHash.split(":");
    if (parts.length !== 3 || parts[0] !== "scrypt") return false;
    const [, salt, hexHash] = parts;
    try {
      const candidate = crypto.scryptSync(password, salt, 64);
      const expected = Buffer.from(hexHash, "hex");
      if (candidate.length !== expected.length) return false;
      return crypto.timingSafeEqual(candidate, expected);
    } catch {
      return false;
    }
  }

  private sanitizeEntry(record: InternalUserRecord): AllowlistEntry {
    const { passwordHash: _omitted, ...publicEntry } = record;
    return { ...publicEntry };
  }

  private seedBaseline(): void {
    const owners = resolveServerOwnerEmails();
    const bootstrapOwnerPassword = process.env.ACADEMY_OWNER_BOOTSTRAP_PASSWORD;
    const ownerPasswordHash =
      bootstrapOwnerPassword && bootstrapOwnerPassword.length >= 8
        ? this.hashPassword(bootstrapOwnerPassword)
        : undefined;

    owners.forEach((ownerEmail, idx) => {
      this.directory.set(ownerEmail, {
        email: ownerEmail,
        normalizedEmail: ownerEmail,
        status: "ENABLED",
        role: "owner",
        fullName: idx === 0 ? "Kutubi Allah (Founder)" : "Oso Maruf Damilare (Co-Founder)",
        isEmailVerified: true,
        insertedBy: "INSTITUTIONAL_ROOT_AUTHORITY",
        insertedAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        notes: "Designated Institutional Co-Owner (Verified Auth Only)",
        passwordHash: ownerPasswordHash
      });
    });

    const seededDemoAccounts: Array<Omit<InternalUserRecord, "normalizedEmail" | "insertedAt" | "updatedAt">> = [
      {
        email: "ada.lovelace@moos.academy",
        status: "ENABLED",
        role: "learner",
        fullName: "Ada Lovelace",
        isEmailVerified: true,
        insertedBy: "INSTITUTIONAL_SEED",
        notes: "Foundational STEM Scholar"
      },
      {
        email: "babatunde.ojo@moos.academy",
        status: "ENABLED",
        role: "teacher",
        fullName: "Babatunde Ojo",
        isEmailVerified: true,
        insertedBy: "INSTITUTIONAL_SEED",
        notes: "Senior STEM Faculty & Mathematics Lead"
      },
      {
        email: "amina.bello@governance.moos.academy",
        status: "ENABLED",
        role: "admin",
        fullName: "Dr. Amina Bello",
        isEmailVerified: true,
        insertedBy: "INSTITUTIONAL_SEED",
        notes: "Institutional Academic Oversight & Governance"
      }
    ];

    for (const item of seededDemoAccounts) {
      const norm = this.normalizeEmail(item.email);
      this.directory.set(norm, {
        ...item,
        normalizedEmail: norm,
        insertedAt: "2026-01-10T08:00:00.000Z",
        updatedAt: "2026-01-10T08:00:00.000Z"
      });
    }
  }

  // =========================================================================
  // SERVER CRYPTOGRAPHIC SESSION TOKEN ISSUANCE & VERIFICATION
  // =========================================================================
  private tokenFingerprint(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  private pruneRevokedTokens(nowMs: number = Date.now()): void {
    for (const [key, exp] of this.revokedTokens.entries()) {
      if (exp <= nowMs) {
        this.revokedTokens.delete(key);
      }
    }
  }

  public issueSessionToken(session: {
    email: string;
    role: AllowlistRole;
    fullName?: string;
    authProvider?: "password" | "firebase";
    ttlMs?: number;
  }): { token: string; expiresAt: number; session: VerifiedAuthSession } {
    const norm = this.normalizeEmail(session.email);
    const issuedAt = Date.now();
    const ttl = typeof session.ttlMs === "number" ? session.ttlMs : TOKEN_TTL_MS;
    const expiresAt = issuedAt + ttl;
    const isOwner = session.role === "owner" && this.isOwner(norm);
    const jti = crypto.randomBytes(16).toString("hex");

    const claims: VerifiedAuthSession = {
      jti,
      email: norm,
      role: session.role,
      fullName: session.fullName || norm,
      isOwner,
      isAdminOrOwner: isOwner || session.role === "admin",
      authProvider: session.authProvider || "password",
      issuedAt,
      expiresAt
    };

    const payloadB64 = Buffer.from(JSON.stringify(claims), "utf8").toString("base64url");
    const sig = crypto.createHmac("sha256", SERVER_HMAC_SECRET).update(payloadB64).digest("hex");

    return {
      token: `${payloadB64}.${sig}`,
      expiresAt,
      session: claims
    };
  }

  public revokeSessionToken(token: string | undefined | null): boolean {
    if (!token || typeof token !== "string") return false;
    const session = this.verifySessionToken(token);
    if (!session) return false;
    this.pruneRevokedTokens();
    const exp = session.expiresAt || Date.now() + TOKEN_TTL_MS;
    if (session.jti) {
      this.revokedTokens.set(`jti:${session.jti}`, exp);
    }
    this.revokedTokens.set(`tok:${this.tokenFingerprint(token)}`, exp);
    return true;
  }

  public verifySessionToken(token: string | undefined | null, expectedEmail?: string): VerifiedAuthSession | null {
    try {
      if (!token || typeof token !== "string" || !token.includes(".")) return null;
      const parts = token.split(".");
      if (parts.length !== 2) return null;
      const [payloadB64, signature] = parts;
      if (!payloadB64 || !signature || !/^[0-9a-f]{64}$/i.test(signature)) return null;

      const expectedSig = crypto
        .createHmac("sha256", SERVER_HMAC_SECRET)
        .update(payloadB64)
        .digest("hex");

      const sigBuf = Buffer.from(signature, "hex");
      const expectedBuf = Buffer.from(expectedSig, "hex");
      if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
        return null;
      }

      const rawJson = Buffer.from(payloadB64, "base64url").toString("utf8");
      const parsed = JSON.parse(rawJson) as VerifiedAuthSession;

      if (!parsed || !parsed.email || !parsed.role || typeof parsed.expiresAt !== "number") {
        return null;
      }
      if (Date.now() > parsed.expiresAt) {
        return null;
      }

      this.pruneRevokedTokens();
      if (
        (parsed.jti && this.revokedTokens.has(`jti:${parsed.jti}`)) ||
        this.revokedTokens.has(`tok:${this.tokenFingerprint(token)}`)
      ) {
        return null;
      }

      const normEmail = this.normalizeEmail(parsed.email);
      if (expectedEmail && this.normalizeEmail(expectedEmail) !== normEmail) {
        return null;
      }

      // Check account directory state (disabled/revoked users lose live session validity immediately)
      const entry = this.directory.get(normEmail);
      if (entry && entry.status !== "ENABLED") {
        return null;
      }

      // Ensure owner flag strictly agrees with server owner authority list
      const verifiedIsOwner = parsed.role === "owner" && this.isOwner(normEmail);
      return {
        ...parsed,
        email: normEmail,
        isOwner: verifiedIsOwner,
        isAdminOrOwner: verifiedIsOwner || parsed.role === "admin"
      };
    } catch {
      return null;
    }
  }

  // =========================================================================
  // AUTHENTICATED SIGN-UP & SIGN-IN (ZERO EMAIL-ONLY BYPASS, ZERO ROLE SPOOFING)
  // =========================================================================
  public signUpUser(request: PublicSignUpRequest): AllowlistOperationResult & { statusCode?: number; session?: VerifiedAuthSession } {
    const norm = this.normalizeEmail(request.email);
    const now = new Date().toISOString();

    if (!norm || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(norm)) {
      return { success: false, statusCode: 400, message: "Please enter a valid institutional or personal email address." };
    }
    if (!request.fullName || request.fullName.trim().length < 2) {
      return { success: false, statusCode: 400, message: "Full name is required (at least 2 characters)." };
    }
    if (!request.password || request.password.length < 8) {
      return { success: false, statusCode: 400, message: "Password must be at least 8 characters long." };
    }

    // Designated owner accounts cannot be claimed through unauthenticated public sign-up
    if (this.isOwner(norm)) {
      return {
        success: false,
        statusCode: 403,
        message: "This account is pre-provisioned. Please sign in with verified credentials or Firebase Auth."
      };
    }

    // Strict privilege boundary: reject self-assigned admin or owner roles
    if (request.role === "admin" || request.role === "owner") {
      return {
        success: false,
        statusCode: 403,
        message: "Forbidden: Public registration cannot assign 'admin' or 'owner' privileges."
      };
    }

    const existing = this.directory.get(norm);
    if (existing && existing.status !== "REVOKED") {
      return {
        success: false,
        statusCode: 409,
        message: `An account for '${norm}' already exists. Please sign in instead.`
      };
    }

    const assignedRole: AllowlistRole = request.role === "teacher" ? "teacher" : "learner";
    const record: InternalUserRecord = {
      email: request.email.trim(),
      normalizedEmail: norm,
      fullName: request.fullName.trim(),
      status: "ENABLED",
      role: assignedRole,
      isEmailVerified: true,
      insertedBy: "SELF_PUBLIC_REGISTRATION",
      insertedAt: now,
      updatedAt: now,
      notes: request.notes || `Public Enrollment (${request.targetLevel || "Standard Curriculum"})`,
      passwordHash: this.hashPassword(request.password)
    };

    this.directory.set(norm, record);
    const { token, session } = this.issueSessionToken({
      email: norm,
      role: assignedRole,
      fullName: record.fullName,
      authProvider: "password"
    });

    return {
      success: true,
      statusCode: 201,
      message: `Account registered and verified for ${record.fullName} (${norm}).`,
      entry: this.sanitizeEntry(record),
      serverVerificationToken: token,
      session
    };
  }

  public signInUser(request: PublicSignInRequest): GateVerificationResult & { statusCode?: number; session?: VerifiedAuthSession } {
    const norm = this.normalizeEmail(request.email);
    const now = new Date().toISOString();

    if (!norm || !norm.includes("@")) {
      return {
        isAllowed: false,
        status: "INVALID_EMAIL",
        statusCode: 400,
        email: request.email || "",
        message: "Please enter a valid email address.",
        verifiedAt: now
      };
    }

    if (!request.password || request.password.length < 8) {
      return {
        isAllowed: false,
        status: "INVALID_CREDENTIALS",
        statusCode: 401,
        email: norm,
        message: "Valid password (or verified Firebase authentication) is required to sign in.",
        verifiedAt: now
      };
    }

    const entry = this.directory.get(norm);
    if (!entry) {
      return {
        isAllowed: false,
        status: "BLOCKED_NOT_REGISTERED",
        statusCode: 401,
        email: norm,
        message: "Invalid email or password.",
        verifiedAt: now
      };
    }

    if (entry.status === "DISABLED") {
      return {
        isAllowed: false,
        status: "BLOCKED_DISABLED",
        statusCode: 403,
        email: norm,
        message: "This account has been disabled by an administrator.",
        verifiedAt: now
      };
    }

    if (entry.status === "REVOKED") {
      return {
        isAllowed: false,
        status: "BLOCKED_REVOKED",
        statusCode: 403,
        email: norm,
        message: "This account has been permanently revoked.",
        verifiedAt: now
      };
    }

    if (!entry.passwordHash || !this.verifyPassword(request.password, entry.passwordHash)) {
      return {
        isAllowed: false,
        status: "INVALID_CREDENTIALS",
        statusCode: 401,
        email: norm,
        message: "Invalid email or password.",
        verifiedAt: now
      };
    }

    const effectiveRole: AllowlistRole = this.isOwner(norm) ? "owner" : entry.role;
    const isOwnerElevated = effectiveRole === "owner";
    const { token, session } = this.issueSessionToken({
      email: norm,
      role: effectiveRole,
      fullName: entry.fullName,
      authProvider: "password"
    });

    return {
      isAllowed: true,
      status: "GRANTED",
      statusCode: 200,
      email: norm,
      message: isOwnerElevated
        ? `Authenticated institutional owner session verified for ${norm}.`
        : `Access granted for ${entry.fullName || norm}.`,
      verifiedAt: now,
      entry: this.sanitizeEntry({ ...entry, role: effectiveRole }),
      serverVerificationToken: token,
      isOwnerAutoElevated: isOwnerElevated,
      session
    };
  }

  // =========================================================================
  // CRYPTOGRAPHIC FIREBASE ID TOKEN VERIFICATION & SERVER OWNER ELEVATION
  // =========================================================================
  private async fetchGooglePublicCerts(): Promise<Record<string, string>> {
    if (
      this.testFirebaseCerts &&
      (process.env.MOOS_SKIP_AUTO_LISTEN === "true" || process.env.NODE_ENV === "test")
    ) {
      return this.testFirebaseCerts;
    }
    if (this.googleCertCache && Date.now() < this.googleCertCache.expiresAtMs) {
      return this.googleCertCache.certs;
    }

    const res = await fetch(GOOGLE_X509_CERTS_URL);
    if (!res.ok) {
      throw new Error(`Unable to fetch Firebase public signing certificates (HTTP ${res.status}).`);
    }
    const certs = (await res.json()) as Record<string, string>;
    const cc = res.headers.get("cache-control") || "";
    const maxAgeMatch = cc.match(/max-age=(\d+)/i);
    const maxAgeSec = maxAgeMatch ? Math.min(Number(maxAgeMatch[1]), 3600) : 300;
    this.googleCertCache = {
      certs,
      expiresAtMs: Date.now() + maxAgeSec * 1000
    };
    return certs;
  }

  public async verifyFirebaseIdToken(idToken: string): Promise<{
    valid: boolean;
    email?: string;
    emailVerified?: boolean;
    uid?: string;
    name?: string;
    error?: string;
  }> {
    try {
      if (!idToken || typeof idToken !== "string") {
        return { valid: false, error: "Firebase ID token is required." };
      }
      const segments = idToken.split(".");
      if (segments.length !== 3) {
        return { valid: false, error: "Malformed JWT structure." };
      }
      const [headerB64, payloadB64, sigB64] = segments;
      const header = JSON.parse(Buffer.from(headerB64, "base64url").toString("utf8"));
      const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));

      if (header.alg !== "RS256" || !header.kid) {
        return { valid: false, error: "Unsupported JWT algorithm or missing key ID." };
      }

      const nowSec = Math.floor(Date.now() / 1000);
      if (typeof payload.exp !== "number" || payload.exp <= nowSec) {
        return { valid: false, error: "Firebase token has expired." };
      }
      if (typeof payload.iat === "number" && payload.iat > nowSec + 300) {
        return { valid: false, error: "Firebase token issued-at timestamp is invalid." };
      }
      if (payload.aud !== FIREBASE_PROJECT_ID || payload.iss !== FIREBASE_TOKEN_ISSUER) {
        return { valid: false, error: "Firebase token audience or issuer mismatch." };
      }
      if (!payload.sub || typeof payload.sub !== "string") {
        return { valid: false, error: "Missing Firebase UID subject." };
      }

      const certs = await this.fetchGooglePublicCerts();
      const certPem = certs[header.kid];
      if (!certPem) {
        return { valid: false, error: "Unknown Firebase signing key identifier." };
      }

      const verifier = crypto.createVerify("RSA-SHA256");
      verifier.update(`${headerB64}.${payloadB64}`);
      verifier.end();
      const signatureValid = verifier.verify(certPem, Buffer.from(sigB64, "base64url"));
      if (!signatureValid) {
        return { valid: false, error: "Firebase ID token cryptographic signature failed." };
      }

      return {
        valid: true,
        email: typeof payload.email === "string" ? this.normalizeEmail(payload.email) : undefined,
        emailVerified: payload.email_verified === true,
        uid: payload.sub,
        name: typeof payload.name === "string" ? payload.name : undefined
      };
    } catch (err: any) {
      return { valid: false, error: err?.message || "Token verification failed." };
    }
  }

  public async exchangeFirebaseTokenForSession(
    idToken: string
  ): Promise<GateVerificationResult & { statusCode: number; session?: VerifiedAuthSession }> {
    const now = new Date().toISOString();
    const verified = await this.verifyFirebaseIdToken(idToken);
    if (!verified.valid || !verified.email) {
      return {
        isAllowed: false,
        status: "INVALID_CREDENTIALS",
        statusCode: 401,
        email: "",
        message: verified.error || "Firebase authentication verification failed.",
        verifiedAt: now
      };
    }

    if (!verified.emailVerified) {
      return {
        isAllowed: false,
        status: "VERIFICATION_REQUIRED",
        statusCode: 403,
        email: verified.email,
        message: "Please verify your email address with Firebase Authentication before accessing MOOS Academy.",
        verifiedAt: now
      };
    }

    const norm = verified.email;
    let existing = this.directory.get(norm);
    if (existing && existing.status !== "ENABLED" && !this.isOwner(norm)) {
      return {
        isAllowed: false,
        status: existing.status === "REVOKED" ? "BLOCKED_REVOKED" : "BLOCKED_DISABLED",
        statusCode: 403,
        email: norm,
        message: `Account '${norm}' is currently ${existing.status}.`,
        verifiedAt: now
      };
    }

    const isOwnerAccount = this.isOwner(norm);
    const assignedRole: AllowlistRole = isOwnerAccount
      ? "owner"
      : existing?.role || "learner";

    if (!existing) {
      existing = {
        email: norm,
        normalizedEmail: norm,
        fullName: verified.name || (isOwnerAccount ? "Academy Owner" : "MOOS Scholar"),
        status: "ENABLED",
        role: assignedRole,
        isEmailVerified: true,
        insertedBy: isOwnerAccount ? "INSTITUTIONAL_ROOT_AUTHORITY" : "FIREBASE_VERIFIED_AUTH",
        insertedAt: now,
        updatedAt: now,
        notes: isOwnerAccount ? "Designated Owner (Verified via Firebase Auth)" : "Verified Firebase Auth Scholar"
      };
      this.directory.set(norm, existing);
    } else if (isOwnerAccount) {
      existing.role = "owner";
      existing.status = "ENABLED";
      existing.isEmailVerified = true;
      existing.updatedAt = now;
    }

    const { token, session } = this.issueSessionToken({
      email: norm,
      role: assignedRole,
      fullName: existing.fullName,
      authProvider: "firebase"
    });

    return {
      isAllowed: true,
      status: "GRANTED",
      statusCode: 200,
      email: norm,
      message: isOwnerAccount
        ? `Verified Firebase owner identity '${norm}' elevated to root administration.`
        : `Firebase session verified for '${norm}'.`,
      verifiedAt: now,
      entry: this.sanitizeEntry(existing),
      serverVerificationToken: token,
      isOwnerAutoElevated: isOwnerAccount,
      session
    };
  }

  // =========================================================================
  // OWNER-ONLY DIRECTORY GOVERNANCE (REQUIRES VERIFIED SESSION)
  // =========================================================================
  public listEntries(session: VerifiedAuthSession): AllowlistEntry[] {
    if (!session.isOwner) return [];
    return Array.from(this.directory.values()).map((r) => this.sanitizeEntry(r));
  }

  public insertEmail(
    session: VerifiedAuthSession,
    targetEmail: string,
    role: AllowlistRole = "learner",
    notes?: string
  ): AllowlistOperationResult & { statusCode: number } {
    if (!session.isOwner) {
      return {
        success: false,
        statusCode: 403,
        message: "PERMISSION DENIED: Only authenticated designated academy owners can manage the directory."
      };
    }

    const norm = this.normalizeEmail(targetEmail);
    if (!norm || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(norm)) {
      return { success: false, statusCode: 400, message: "Invalid email address format." };
    }

    const now = new Date().toISOString();
    const existing = this.directory.get(norm);
    const effectiveRole: AllowlistRole = this.isOwner(norm)
      ? "owner"
      : role === "teacher" || role === "admin" || role === "learner"
      ? role
      : "learner";

    const updated: InternalUserRecord = {
      email: targetEmail.trim(),
      normalizedEmail: norm,
      fullName: existing?.fullName || targetEmail.split("@")[0],
      status: "ENABLED",
      role: effectiveRole,
      isEmailVerified: true,
      insertedBy: session.email,
      insertedAt: existing?.insertedAt || now,
      updatedAt: now,
      notes: notes || existing?.notes,
      passwordHash: existing?.passwordHash
    };

    this.directory.set(norm, updated);
    return {
      success: true,
      statusCode: 200,
      message: `Email '${norm}' authorized with role '${effectiveRole}'.`,
      entry: this.sanitizeEntry(updated)
    };
  }

  public setStatus(
    session: VerifiedAuthSession,
    targetEmail: string,
    status: AllowlistStatus
  ): AllowlistOperationResult & { statusCode: number } {
    if (!session.isOwner) {
      return {
        success: false,
        statusCode: 403,
        message: "PERMISSION DENIED: Only authenticated academy owners can modify user status."
      };
    }

    const norm = this.normalizeEmail(targetEmail);
    const entry = this.directory.get(norm);
    if (!entry) {
      return { success: false, statusCode: 404, message: `Email '${targetEmail}' not found.` };
    }

    if (this.isOwner(norm) && status !== "ENABLED") {
      return {
        success: false,
        statusCode: 403,
        message: "CANNOT DISABLE OWNER: Designated institutional owner accounts must remain permanently ENABLED."
      };
    }

    entry.status = status;
    entry.updatedAt = new Date().toISOString();
    this.directory.set(norm, entry);

    return {
      success: true,
      statusCode: 200,
      message: `Account status for '${norm}' updated to ${status}.`,
      entry: this.sanitizeEntry(entry)
    };
  }

  public removeEmail(
    session: VerifiedAuthSession,
    targetEmail: string
  ): AllowlistOperationResult & { statusCode: number } {
    if (!session.isOwner) {
      return {
        success: false,
        statusCode: 403,
        message: "PERMISSION DENIED: Only authenticated academy owners can remove users."
      };
    }

    const norm = this.normalizeEmail(targetEmail);
    if (this.isOwner(norm)) {
      return {
        success: false,
        statusCode: 403,
        message: "CANNOT REMOVE OWNER: Designated institutional owner accounts cannot be deleted."
      };
    }

    const deleted = this.directory.delete(norm);
    if (!deleted) {
      return { success: false, statusCode: 404, message: `Email '${targetEmail}' was not in directory.` };
    }

    return {
      success: true,
      statusCode: 200,
      message: `Account '${norm}' removed from directory.`
    };
  }

  // =========================================================================
  // EXPRESS MIDDLEWARE HELPERS
  // =========================================================================
  public extractBearerToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")) {
      return authHeader.slice(7).trim();
    }
    return null;
  }

  public authenticateRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = this.extractBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Authentication required. Missing Bearer session token." });
      return;
    }
    const session = this.verifySessionToken(token);
    if (!session) {
      res.status(401).json({ error: "Invalid or expired session token." });
      return;
    }
    req.authSession = session;
    next();
  };

  public requireOwner = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    this.authenticateRequest(req, res, () => {
      if (!req.authSession?.isOwner) {
        res.status(403).json({ error: "Forbidden: Verified Academy Owner privileges required." });
        return;
      }
      next();
    });
  };

  public requireAdminOrOwner = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    this.authenticateRequest(req, res, () => {
      if (!req.authSession?.isAdminOrOwner) {
        res.status(403).json({ error: "Forbidden: Administrator or Owner privileges required." });
        return;
      }
      next();
    });
  };

  // =========================================================================
  // AUTHENTICATED LEARNER PROGRESS ISOLATION STORE (PER-ACCOUNT SCOPED)
  // =========================================================================
  public getLearnerProgress(
    session: VerifiedAuthSession,
    targetAccountEmail: string
  ): { statusCode: number; allowed: boolean; progress?: Record<string, any>; message?: string } {
    const normTarget = this.normalizeEmail(targetAccountEmail);
    if (!normTarget) {
      return { statusCode: 400, allowed: false, message: "Target account identifier is required." };
    }
    if (session.email !== normTarget && !session.isOwner) {
      return {
        statusCode: 403,
        allowed: false,
        message: "Forbidden: Cross-account learner data access is strictly prohibited."
      };
    }
    return {
      statusCode: 200,
      allowed: true,
      progress: this.learnerProgressStore.get(normTarget) || {
        accountEmail: normTarget,
        masteryRecords: {},
        questionAttempts: [],
        activityHistory: [],
        examHistory: [],
        diagnosticHistory: [],
        unlockedBadges: [],
        xp: 0,
        masteryPoints: 0,
        syncRevision: 0,
        updatedAt: null
      }
    };
  }

  public saveLearnerProgress(
    session: VerifiedAuthSession,
    targetAccountEmail: string,
    payload: Record<string, any>
  ): {
    statusCode: number;
    allowed: boolean;
    conflict?: boolean;
    conflictResolved?: boolean;
    staleWriteProtected?: boolean;
    progress?: Record<string, any>;
    message?: string;
  } {
    const normTarget = this.normalizeEmail(targetAccountEmail);
    if (!normTarget) {
      return { statusCode: 400, allowed: false, message: "Target account identifier is required." };
    }
    if (session.email !== normTarget) {
      return {
        statusCode: 403,
        allowed: false,
        message: "Forbidden: Cannot modify another learner's progress record."
      };
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return { statusCode: 400, allowed: false, message: "Invalid progress payload." };
    }

    const existing = this.learnerProgressStore.get(normTarget) || null;
    if (
      payload.strictConflictCheck === true &&
      typeof payload.baseRevision === "number" &&
      existing &&
      typeof existing.syncRevision === "number" &&
      payload.baseRevision < existing.syncRevision
    ) {
      return {
        statusCode: 409,
        allowed: false,
        conflict: true,
        progress: existing,
        message: `Conflict: Older write (baseRevision ${payload.baseRevision}) cannot overwrite newer server revision (${existing.syncRevision}).`
      };
    }

    const { merged, conflictResolved, staleWriteProtected } = mergeLearnerProgressPayloads(
      existing,
      payload
    );

    const saved = {
      ...merged,
      accountEmail: normTarget,
      serverSyncedAt: new Date().toISOString()
    };
    this.learnerProgressStore.set(normTarget, saved);
    return {
      statusCode: 200,
      allowed: true,
      conflictResolved,
      staleWriteProtected,
      progress: saved
    };
  }

  // Test isolation helpers
  public setTestFirebaseCerts(certs: Record<string, string> | null): void {
    if (process.env.MOOS_SKIP_AUTO_LISTEN === "true" || process.env.NODE_ENV === "test") {
      this.testFirebaseCerts = certs;
    }
  }

  public provisionOwnerPasswordForTest(ownerEmail: string, password: string): void {
    const norm = this.normalizeEmail(ownerEmail);
    const existing = this.directory.get(norm);
    if (existing && this.isOwner(norm)) {
      existing.passwordHash = this.hashPassword(password);
      this.directory.set(norm, existing);
    }
  }

  public resetForTesting(): void {
    this.directory.clear();
    this.revokedTokens.clear();
    this.learnerProgressStore.clear();
    this.testFirebaseCerts = null;
    this.seedBaseline();
  }
}

export const serverAuthGovernance = ServerAuthGovernance.getInstance();
