/**
 * MOOS TECHY ACADEMY — MULTI-FACTOR AUTHENTICATION (MFA) TYPES
 * 
 * TASK ID: MOOS-SECURITY-002
 * 
 * Defines formal data contracts for:
 * 1. Default TOTP second-factor (RFC 6238 / Firebase Identity Platform)
 * 2. Full 8-Step Verification Journey
 * 3. Cryptographically hashed single-use Backup Recovery Codes
 * 4. Multi-Factor Assurance Levels (AAL1 vs AAL2)
 * 5. Privileged operation assurance gates & rate-limiting policies
 */

import { MultiFactorResolver, TotpSecret } from "firebase/auth";

export type MfaFactorType = "totp";

export type MfaAssuranceLevel = "AAL1" | "AAL2";

export type MfaJourneyStep =
  | "STEP_1_INITIATION"
  | "STEP_2_ACCOUNT_VALIDATION"
  | "STEP_3_SECRET_PROVISIONING"
  | "STEP_4_CODE_SUBMISSION"
  | "STEP_5_ENROLLMENT_SUCCESS"
  | "STEP_6_SIGNIN_CHALLENGE"
  | "STEP_7_RATE_LIMIT_ERROR"
  | "STEP_8_RECOVERY_MANAGEMENT";

export type MfaPrivilegedAction =
  | "ADMIN_ROLE_SWITCH"
  | "MANAGE_USERS"
  | "MANAGE_SYSTEM_SETTINGS"
  | "EXPORT_CLASSROOM_DATA"
  | "RESTORE_CLASSROOM_DATA"
  | "CURRICULUM_LIFECYCLE_MUTATION"
  | "BOOKPRENEUR_PUBLISH_RESOURCE"
  | "BOOKPRENEUR_APPROVE_RESOURCE"
  | "BOOKPRENEUR_SUSPEND_RESOURCE"
  | "MANAGE_MARKETPLACE_CATALOG"
  | "VIEW_AUDIT_LOG"
  | "HIGH_RISK_GUARDIAN_ACTION";

export interface TotpSecretProvision {
  secretKey: string;
  qrCodeUrl: string;
  otpauthUri: string;
  issuer: string;
  accountName: string;
  periodSeconds: number;
  digits: number;
  firebaseTotpSecret?: TotpSecret;
  issuedAt: string;
  expiresAt: string;
}

export interface MfaRecoveryCodeRecord {
  userId: string;
  hashedCodes: string[]; // SHA-256 hashed single-use recovery codes
  salt: string;
  totalGenerated: number;
  remainingCount: number;
  consumedCodes: string[]; // SHA-256 hashes of already consumed codes
  createdAt: string;
  updatedAt: string;
}

export interface MfaProfile {
  userId: string;
  email: string;
  isEnrolled: boolean;
  factorType: MfaFactorType;
  enrolledAt?: string;
  lastVerifiedAt?: string;
  factorDisplayName: string;
  assuranceLevel: MfaAssuranceLevel;
  recoveryCodesConfigured: boolean;
  remainingRecoveryCodes: number;
}

export interface MfaAssuranceTicket {
  ticketId: string;
  userId: string;
  assuranceLevel: "AAL2";
  factorType: "totp" | "recovery_code";
  verifiedAt: string;
  expiresAt: string;
  issuedForSessionId?: string;
  signature: string; // HMAC SHA-256 proof bound to user & session
}

export interface MfaRateLimitStatus {
  isLocked: boolean;
  failedAttempts: number;
  maxAttempts: number;
  lockoutExpiryTime?: string;
  remainingAttempts: number;
  cooldownSeconds: number;
}

export interface MfaVerificationResult {
  success: boolean;
  assuranceTicket?: MfaAssuranceTicket;
  errorCode?:
    | "MFA_INVALID_CODE"
    | "MFA_CODE_EXPIRED"
    | "MFA_RATE_LIMITED"
    | "MFA_USER_NOT_ENROLLED"
    | "MFA_RECOVERY_CODE_INVALID"
    | "MFA_RECOVERY_CODE_ALREADY_USED"
    | "MFA_ACCOUNT_MISMATCH"
    | "MFA_SESSION_EXPIRED";
  errorMessage?: string;
  remainingAttempts?: number;
}

export interface MfaSignInChallengeContext {
  resolver: MultiFactorResolver;
  hints: any[];
  challengeInitiatedAt: string;
}
