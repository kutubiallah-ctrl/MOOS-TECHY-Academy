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
  | "TEACHER_MATERIAL_DISPATCHED";

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
