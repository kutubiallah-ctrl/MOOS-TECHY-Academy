/**
 * MOOS ACADEMY — ACCESS CONTROL & ALLOWLIST TYPES
 *
 * Strictly role-typed authentication contracts for client and server boundaries.
 * Zero owner emails or cryptographic secrets are stored in client-side source files.
 */

export type AllowlistStatus = "ENABLED" | "DISABLED" | "REVOKED";

export type AllowlistRole = "owner" | "admin" | "teacher" | "learner";

export interface AllowlistEntry {
  email: string;
  normalizedEmail: string; // Lowercase, trimmed
  status: AllowlistStatus;
  role: AllowlistRole;
  fullName?: string;
  isEmailVerified?: boolean;
  insertedBy: string;
  insertedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  notes?: string;
}

export interface VerifiedAuthSession {
  email: string;
  role: AllowlistRole;
  fullName: string;
  isOwner: boolean;
  isAdminOrOwner: boolean;
  authProvider: "password" | "firebase";
  issuedAt: number;
  expiresAt: number;
}

export interface GateVerificationResult {
  isAllowed: boolean;
  status:
    | "GRANTED"
    | "BLOCKED_NOT_INSERTED"
    | "BLOCKED_NOT_REGISTERED"
    | "BLOCKED_DISABLED"
    | "BLOCKED_REVOKED"
    | "INVALID_EMAIL"
    | "INVALID_CREDENTIALS"
    | "VERIFICATION_REQUIRED";
  email: string;
  message: string;
  verifiedAt: string;
  entry?: AllowlistEntry;
  serverVerificationToken?: string;
  isOwnerAutoElevated?: boolean;
  session?: VerifiedAuthSession;
}

export interface AllowlistOperationResult {
  success: boolean;
  message: string;
  entry?: AllowlistEntry;
  entries?: AllowlistEntry[];
  serverVerificationToken?: string;
  session?: VerifiedAuthSession;
}

export interface PublicSignUpRequest {
  fullName: string;
  email: string;
  password: string;
  role?: "learner" | "teacher" | AllowlistRole;
  targetLevel?: string;
  notes?: string;
}

export interface PublicSignInRequest {
  email: string;
  password: string;
}
