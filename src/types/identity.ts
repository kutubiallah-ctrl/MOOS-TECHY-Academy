/**
 * MOOS TECHY ACADEMY — INSTITUTIONAL IDENTITY & ROLE GOVERNANCE TYPES
 * 
 * Formal local identity model, strongly typed role boundaries,
 * granular permissions, active session contexts, and data classification schemas.
 * 
 * Architecture Principle:
 * Local-First, zero-cryptographic-pretence, deterministic identity management
 * prepared for future authenticated multi-device synchronization.
 */

export type UserRole = "LEARNER" | "TEACHER" | "ADMIN";

export type DataClassification =
  | "CANONICAL_PUBLIC"
  | "LEARNER_PRIVATE"
  | "TEACHER_PRIVATE"
  | "CLASSROOM_INSTITUTIONAL"
  | "AUDIT_SECURITY"
  | "AI_GENERATED_DRAFT";

export type ContentProvenance =
  | "OFFICIAL_SYLLABUS"
  | "AI_GENERATED_DRAFT"
  | "TEACHER_AUTHORED"
  | "SYSTEM_GENERATED";

export type UserPermission =
  // Learner Self-Sovereign Data & Learning
  | "VIEW_OWN_PROFILE"
  | "EDIT_OWN_PROFILE"
  | "VIEW_OWN_PROGRESS"
  | "EXPORT_OWN_DATA"
  | "RESTORE_OWN_DATA"
  
  // Teacher Classroom & Curriculum Management
  | "VIEW_CLASSROOM"
  | "VIEW_CLASSROOM_ROSTER"
  | "CREATE_ASSIGNMENT"
  | "EDIT_ASSIGNMENT"
  | "DISPATCH_ASSIGNMENT"
  | "VIEW_LEARNER_PROGRESS"
  | "VIEW_INTERVENTIONS"
  | "REVIEW_INTERVENTIONS"
  | "ASSIGN_INTERVENTION"
  | "CREATE_LESSON_PLAN"
  | "EDIT_LESSON_PLAN"
  | "EXPORT_CLASSROOM_DATA"
  | "RESTORE_CLASSROOM_DATA"
  
  // Institutional / Administrative Oversight
  | "MANAGE_INSTITUTION"
  | "VIEW_AUDIT_LOG"
  | "MANAGE_USERS"
  | "MANAGE_CLASSROOMS"
  | "MANAGE_SYSTEM_SETTINGS"
  
  // AI Copilot & Sandboxed Authoring
  | "AI_GENERATE_PRACTICE"
  | "AI_GENERATE_DIAGNOSTIC"
  | "AI_REVIEW_TEACHER_ACTION"

  // Bookpreneur & Marketplace Creator / Publisher Governance
  | "CREATE_BOOK_PROJECT"
  | "EDIT_BOOK_PROJECT"
  | "SUBMIT_BOOK_RESOURCE"
  | "APPROVE_BOOK_RESOURCE"
  | "PUBLISH_MARKETPLACE_RESOURCE"
  | "SUSPEND_MARKETPLACE_RESOURCE"
  | "MANAGE_MARKETPLACE_CATALOG";

export interface UserIdentity {
  id: string;
  role: UserRole;
  displayName: string;
  email?: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  status: "ACTIVE" | "SUSPENDED" | "ARCHIVED";
  metadata?: Record<string, any>;
}

export interface LearnerUserIdentity extends UserIdentity {
  role: "LEARNER";
  targetLevel?: string;
  curriculumStandard?: string;
  assignedClassroomIds: string[];
  assignedTeacherIds: string[];
}

export interface TeacherUserIdentity extends UserIdentity {
  role: "TEACHER";
  schoolOrOrgName: string;
  department: string;
  assignedClassroomIds: string[];
  assignedStudentIds?: string[];
}

export interface AdminUserIdentity extends UserIdentity {
  role: "ADMIN";
  institutionName: string;
  administrativeDomain: string;
  isSuperAdmin?: boolean;
}

export type InstitutionalUser =
  | LearnerUserIdentity
  | TeacherUserIdentity
  | AdminUserIdentity;

export interface UserSession {
  sessionId: string;
  userId: string;
  role: UserRole;
  displayName: string;
  activeClassroomId?: string;
  createdAt: string;
  lastActivityAt: string;
  deviceContext: {
    isLocalDevice: true;
    clientVersion: string;
    environment: "browser_local_storage";
  };
}

export interface ResourceAuthorizationContext {
  resourceType: "profile" | "classroom" | "assignment" | "intervention" | "lesson_plan" | "backup" | "audit_log" | "curriculum" | "ai_task" | "book_project" | "marketplace_resource";
  resourceId?: string;
  ownerId?: string;
  creatorId?: string;
  classroomId?: string;
  teacherId?: string;
  targetLearnerIds?: string[];
  scope?: string;
  provenance?: ContentProvenance | "CREATOR_AUTHORED" | "PUBLISHED_RESOURCE";
  publicationStatus?: string;
}

export interface AuthorizationDecision {
  granted: boolean;
  permission: UserPermission;
  reason?: string;
  denialCode?:
    | "PERMISSION_NOT_ASSIGNED_TO_ROLE"
    | "RESOURCE_NOT_OWNED"
    | "CROSS_CLASSROOM_VIOLATION"
    | "CANONICAL_CURRICULUM_IMMUTABLE"
    | "UNAUTHORIZED_BACKUP_SCOPE"
    | "UNAUTHORIZED_RESTORE_TARGET"
    | "AI_AUTONOMOUS_MUTATION_FORBIDDEN"
    | "MARKETPLACE_APPROVAL_REQUIRED"
    | "CREATOR_ACCESS_VIOLATION"
    | "SESSION_INVALID_OR_EXPIRED";
}
