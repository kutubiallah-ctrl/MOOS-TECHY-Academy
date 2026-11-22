/**
 * MOOS TECHY ACADEMY — ACCESS CONTROL & ALLOWLIST TYPES
 * 
 * TASK: PIVOT DIRECTIVE — PUBLIC SIGN-UP WITH AUTO-ELEVATED OWNER EMAILS
 * 
 * Access Model:
 * 1. Public Sign-Up: Every user apart from the two designated owners must sign up
 *    (email + password, with email verification) before access is granted.
 * 2. Auto-Elevated Owner Emails: The two designated owner emails (kutubiallah@gmail.com
 *    and osomarufdamilare@gmail.com) are automatically recognized and elevated to full
 *    owner/admin access upon entry without requiring manual allowlist insertion.
 * 3. Premium Welcome: Unauthenticated/unregistered users see only the welcome/auth screen.
 * 4. Allowlist Manager: Repurposed as owner inspection & management tool.
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
  insertedBy: string; // Owner email or "SELF_PUBLIC_REGISTRATION"
  insertedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  notes?: string;
  passwordHash?: string;
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
    | "VERIFICATION_REQUIRED";
  email: string;
  message: string;
  verifiedAt: string;
  entry?: AllowlistEntry;
  serverVerificationToken?: string; // Cryptographic HMAC proof from server
  isOwnerAutoElevated?: boolean;
}

export interface AllowlistOperationResult {
  success: boolean;
  message: string;
  entry?: AllowlistEntry;
  entries?: AllowlistEntry[];
  serverVerificationToken?: string;
}

export interface PublicSignUpRequest {
  fullName: string;
  email: string;
  password?: string;
  role?: AllowlistRole;
  targetLevel?: string;
  notes?: string;
}

export interface PublicSignInRequest {
  email: string;
  password?: string;
}
