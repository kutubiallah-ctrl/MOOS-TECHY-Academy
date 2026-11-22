/**
 * MOOS TECHY ACADEMY — BACKEND FOUNDATION & PERSISTENCE TYPES
 * 
 * TASK ID: MOOS-BACKEND-001
 * 
 * Unifies the four primary backend foundations:
 * 1. User Authentication & Multi-Role RBAC
 * 2. Firestore Cloud Database Architecture
 * 3. Cloud File Storage Service
 * 4. Zero-Trust Security Rules & Immutability
 * 
 * And provides Antigravity autonomous engineering governance contracts.
 */

export type UserRole = "learner" | "teacher" | "admin" | "system";

export interface BackendAuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  emailVerified: boolean;
  tenantId?: string | null;
  claims: {
    role: UserRole;
    isAdmin: boolean;
    isTeacher: boolean;
    isLearner: boolean;
    mfaVerified?: boolean;
    mfaAssuranceLevel?: "AAL1" | "AAL2";
    institutionalDomain?: string;
  };
  createdAt: string;
  lastActiveAt: string;
}

export type StorageCategory = 
  | "avatar" 
  | "teacher_material" 
  | "manuscript" 
  | "audio" 
  | "backup" 
  | "student_submission";

export interface StorageArtifactRecord {
  id: string;
  userId: string;
  role: UserRole;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  downloadUrl: string;
  sha256Hash: string;
  category: StorageCategory;
  isOfflineCached?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StorageUploadParams {
  userId: string;
  role: UserRole;
  filename: string;
  mimeType: string;
  data: Blob | Uint8Array | string;
  category: StorageCategory;
  customPath?: string;
}

export interface SecurityAuditRecord {
  id: string;
  actorUid: string;
  actorRole: UserRole;
  action: string;
  resourceType: string;
  resourceId: string;
  status: "SUCCESS" | "DENIED" | "FAILED";
  clientIp?: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface DatabaseHealthStatus {
  databaseId: string;
  projectId: string;
  status: "CONNECTED" | "DEGRADED" | "OFFLINE";
  latencyMs: number;
  collectionsVerified: string[];
  schemaSynced: boolean;
  lastCheckedAt: string;
}

export interface BackendPillarAudit {
  pillar: "AUTHENTICATION" | "DATABASE" | "FILE_STORAGE" | "SECURITY_RULES";
  status: "HEALTHY" | "DEGRADED" | "ANOMALY_DETECTED" | "NOT_INITIALIZED";
  details: string;
  evidence: Record<string, any>;
}

export interface AntigravityAnomaly {
  anomalyId: string;
  pillar: "AUTHENTICATION" | "DATABASE" | "FILE_STORAGE" | "SECURITY_RULES";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  description: string;
  remediationAction: string;
  detectedAt: string;
}

export interface BackendRemediationPlan {
  planId: string;
  anomalyId: string;
  targetPillar: "AUTHENTICATION" | "DATABASE" | "FILE_STORAGE" | "SECURITY_RULES";
  proposedAction: string;
  changedFiles: string[];
  requiresOwnerApproval: boolean;
  status: "PROPOSED" | "APPROVED" | "EXECUTED" | "VERIFIED" | "REVERTED";
}

export interface Backend001ForensicLedger {
  taskId: "MOOS-BACKEND-001";
  timestamp: string;
  databaseId: string;
  storageBucket: string;
  firebaseProjectId: string;
  pillars: {
    authentication: {
      status: "AUTHENTICATED_AND_MAPPED";
      rbacRolesSupported: UserRole[];
      totalIdentitiesBridged: number;
    };
    database: {
      status: "PERSISTENT_FIRESTORE_VERIFIED";
      databaseId: string;
      entitiesCount: number;
      collectionsCount: number;
    };
    fileStorage: {
      status: "CLOUD_STORAGE_PROVISIONED_AND_VERIFIED";
      bucket: string;
      supportedCategories: StorageCategory[];
      sha256IntegrityEnforced: boolean;
    };
    securityRules: {
      status: "ZERO_TRUST_ABAC_DEPLOYED";
      defaultDenyEnforced: boolean;
      immutableAuditLogsEnforced: boolean;
      rulesVersion: number;
    };
  };
  antigravityExecution: {
    autonomousInspectionsCompleted: number;
    anomaliesDetectedAndResolved: number;
    governedMutationsVerified: number;
    realityStatus: "CONTROLLED_ENGINEERING_VERIFIED";
  };
}
