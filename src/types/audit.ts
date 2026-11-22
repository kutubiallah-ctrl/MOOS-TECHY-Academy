/**
 * MOOS TECHY ACADEMY — INSTITUTIONAL AUDIT TRAIL SCHEMA
 * 
 * Append-only deterministic audit event model capturing institutional lifecycle,
 * assignment workflows, intervention reviews, backup operations, AI actions,
 * and security denial telemetry.
 */

import { UserRole, DataClassification } from "./identity";

export type AuditEventType =
  // Session & Identity
  | "LOGIN_CONTEXT_CREATED"
  | "USER_SWITCHED"
  | "SESSION_TERMINATED"
  
  // Classroom & Curriculum
  | "CLASSROOM_CREATED"
  | "LESSON_PLAN_CREATED"
  
  // Assignment Lifecycle
  | "ASSIGNMENT_CREATED"
  | "ASSIGNMENT_PUBLISHED"
  | "ASSIGNMENT_DISPATCHED"
  | "ASSIGNMENT_COMPLETED"
  
  // Teacher Interventions
  | "INTERVENTION_RECOMMENDED"
  | "INTERVENTION_REVIEWED"
  | "INTERVENTION_ACCEPTED"
  | "INTERVENTION_ASSIGNED"
  | "INTERVENTION_RESOLVED"
  
  // Backup & Recovery
  | "BACKUP_CREATED"
  | "BACKUP_RESTORED"
  | "BACKUP_ROLLBACK"
  | "BACKUP_REJECTED"
  
  // Security & Authorization
  | "AUTHORIZATION_DENIED"
  
  // Student Assessment & Controlled Credentialing
  | "STUDENT_ASSESSMENT_COMPLETED"
  | "CERTIFICATE_ISSUED"
  
  // AI Copilot & Sandboxing
  | "AI_ACTION_REQUESTED"
  | "AI_ACTION_COMPLETED"
  | "AI_ACTION_REJECTED"
  
  // Profile Data Sovereignty
  | "PROFILE_EXPORTED"
  | "PROFILE_IMPORTED"
  
  // Bookpreneur & Marketplace Publishing Governance
  | "BOOK_CREATED"
  | "BOOK_UPDATED"
  | "CLAIM_CLASSIFIED"
  | "RESEARCH_ITEM_ADDED"
  | "RESOURCE_SUBMITTED"
  | "RESOURCE_APPROVED"
  | "RESOURCE_REJECTED"
  | "RESOURCE_PUBLISHED"
  | "RESOURCE_SUSPENDED"
  | "RESOURCE_ARCHIVED"
  | "MARKETPLACE_RESOURCE_CREATED"
  | "MARKETPLACE_RESOURCE_UPDATED"
  | "MARKETPLACE_RESOURCE_PUBLISHED"
  | "MARKETPLACE_RESOURCE_SUSPENDED"
  | "ROYALTY_ACCOUNT_UPDATED"
  | "ROYALTY_DISBURSEMENT_INITIATED"
  | "MANUSCRIPT_INGESTED"
  | "MANUSCRIPT_CONVERTED"
  | "CREATOR_AUTHORIZATION_DENIED"
  | "RESOURCE_ACCESS_DENIED"
  
  // Teacher AI Copilot & Materials
  | "TEACHER_MATERIAL_GENERATED"
  | "TEACHER_MATERIAL_TRANSFORMED"
  | "TEACHER_LESSON_PACKAGE_PREPARED"
  | "TEACHER_MATERIAL_APPROVED"
  | "TEACHER_MATERIAL_EDITED"
  | "TEACHER_MATERIAL_DUPLICATED"
  | "TEACHER_MATERIAL_DELETED"
  | "TEACHER_MATERIAL_DISPATCHED"
  
  // Co-Curricular & Clubs Lifecycle
  | "CLUB_JOINED"
  | "CLUB_STAGE_ADVANCED"
  | "CLUB_PROJECT_SUBMITTED"
  | "CLUB_COMPETITION_ENTERED"

  // Interactive Smart Board Masterclass Lifecycle & Interaction Telemetry
  | "SMARTBOARD_SESSION_STARTED"
  | "SMARTBOARD_INTERACTION_STARTED"
  | "SMARTBOARD_STEP_ATTEMPTED"
  | "SMARTBOARD_STEP_CORRECT"
  | "SMARTBOARD_STEP_INCORRECT"
  | "SMARTBOARD_HINT_REQUESTED"
  | "SMARTBOARD_MISCONCEPTION_DETECTED"
  | "SMARTBOARD_REMEDIATION_TRIGGERED"
  | "SMARTBOARD_MASTERCLASS_RESUMED"

  // Development Guardian & Multi-Agent Operations
  | "TASK_CREATED"
  | "TASK_HUMAN_APPROVED"
  | "TASK_HUMAN_REJECTED"

  // Multi-Factor Authentication (MFA) & Second-Factor Assurance
  | "MFA_ENROLLMENT_INITIATED"
  | "MFA_SECRET_PROVISIONED"
  | "MFA_VERIFICATION_FAILED"
  | "MFA_ENROLLED_SUCCESS"
  | "MFA_CHALLENGE_RESOLVED"
  | "MFA_CHALLENGE_FAILED"
  | "MFA_RATE_LIMIT_LOCKOUT"
  | "MFA_RECOVERY_CODE_CONSUMED"
  | "MFA_RECOVERY_CODE_REUSED_ATTEMPT"
  | "MFA_RECOVERY_CODE_INVALID_ATTEMPT";

export type AuditEventResult = "SUCCESS" | "DENIED" | "FAILED" | "WARNING";

export interface AuditEvent {
  eventId: string;
  eventType: AuditEventType;
  actorId: string;
  actorRole: UserRole;
  actorDisplayName?: string;
  timestamp: string; // ISO 8601
  resourceType: string;
  resourceId?: string;
  classroomId?: string;
  result: AuditEventResult;
  reason?: string;
  dataClassification: DataClassification;
  metadata?: Record<string, any>;
}

export interface AuditLogFilter {
  eventType?: AuditEventType;
  actorId?: string;
  actorRole?: UserRole;
  classroomId?: string;
  resourceType?: string;
  resourceId?: string;
  result?: AuditEventResult;
  startDate?: string;
  endDate?: string;
  limit?: number;
}
