/**
 * MOOS TECHY ACADEMY — ROLE-BASED ACCESS CONTROL & AUTHORIZATION SERVICE
 * 
 * Central deterministic authorization engine. Evaluates role capability matrices,
 * granular resource ownership boundaries, classroom tenancy, and backup governance.
 * Automatically publishes authorization denial telemetry.
 */

import {
  UserRole,
  UserPermission,
  UserIdentity,
  UserSession,
  ResourceAuthorizationContext,
  AuthorizationDecision,
  InstitutionalUser,
  TeacherUserIdentity,
  LearnerUserIdentity
} from "../types/identity";
import { auditService } from "./auditService";

/**
 * Role Permission Baseline Matrix
 */
const ROLE_PERMISSIONS: Record<UserRole, ReadonlySet<UserPermission>> = {
  LEARNER: new Set<UserPermission>([
    "VIEW_OWN_PROFILE",
    "EDIT_OWN_PROFILE",
    "VIEW_OWN_PROGRESS",
    "EXPORT_OWN_DATA",
    "RESTORE_OWN_DATA",
    "AI_GENERATE_PRACTICE",
    "AI_GENERATE_DIAGNOSTIC"
  ]),

  TEACHER: new Set<UserPermission>([
    "VIEW_OWN_PROFILE",
    "EDIT_OWN_PROFILE",
    "VIEW_OWN_PROGRESS",
    "EXPORT_OWN_DATA",
    "RESTORE_OWN_DATA",
    "VIEW_CLASSROOM",
    "VIEW_CLASSROOM_ROSTER",
    "CREATE_ASSIGNMENT",
    "EDIT_ASSIGNMENT",
    "DISPATCH_ASSIGNMENT",
    "VIEW_LEARNER_PROGRESS",
    "VIEW_INTERVENTIONS",
    "REVIEW_INTERVENTIONS",
    "ASSIGN_INTERVENTION",
    "CREATE_LESSON_PLAN",
    "EDIT_LESSON_PLAN",
    "EXPORT_CLASSROOM_DATA",
    "RESTORE_CLASSROOM_DATA",
    "VIEW_AUDIT_LOG",
    "AI_GENERATE_PRACTICE",
    "AI_GENERATE_DIAGNOSTIC",
    "AI_REVIEW_TEACHER_ACTION",
    "CREATE_BOOK_PROJECT",
    "EDIT_BOOK_PROJECT",
    "SUBMIT_BOOK_RESOURCE",
    "APPROVE_BOOK_RESOURCE",
    "PUBLISH_MARKETPLACE_RESOURCE",
    "SUSPEND_MARKETPLACE_RESOURCE"
  ]),

  ADMIN: new Set<UserPermission>([
    "VIEW_OWN_PROFILE",
    "EDIT_OWN_PROFILE",
    "VIEW_OWN_PROGRESS",
    "EXPORT_OWN_DATA",
    "RESTORE_OWN_DATA",
    "VIEW_CLASSROOM",
    "VIEW_CLASSROOM_ROSTER",
    "CREATE_ASSIGNMENT",
    "EDIT_ASSIGNMENT",
    "DISPATCH_ASSIGNMENT",
    "VIEW_LEARNER_PROGRESS",
    "VIEW_INTERVENTIONS",
    "REVIEW_INTERVENTIONS",
    "ASSIGN_INTERVENTION",
    "CREATE_LESSON_PLAN",
    "EDIT_LESSON_PLAN",
    "EXPORT_CLASSROOM_DATA",
    "RESTORE_CLASSROOM_DATA",
    "MANAGE_INSTITUTION",
    "VIEW_AUDIT_LOG",
    "MANAGE_USERS",
    "MANAGE_CLASSROOMS",
    "MANAGE_SYSTEM_SETTINGS",
    "AI_GENERATE_PRACTICE",
    "AI_GENERATE_DIAGNOSTIC",
    "AI_REVIEW_TEACHER_ACTION",
    "CREATE_BOOK_PROJECT",
    "EDIT_BOOK_PROJECT",
    "SUBMIT_BOOK_RESOURCE",
    "APPROVE_BOOK_RESOURCE",
    "PUBLISH_MARKETPLACE_RESOURCE",
    "SUSPEND_MARKETPLACE_RESOURCE",
    "MANAGE_MARKETPLACE_CATALOG"
  ])
};

export class AuthorizationService {
  /**
   * Helper to extract standardized actor properties from UserIdentity or UserSession.
   */
  private extractActor(actor: UserIdentity | UserSession | InstitutionalUser): {
    id: string;
    role: UserRole;
    displayName?: string;
    assignedClassrooms?: string[];
  } {
    const id = "userId" in actor ? actor.userId : actor.id;
    const role = actor.role;
    const displayName = actor.displayName;
    let assignedClassrooms: string[] | undefined;

    if ("assignedClassroomIds" in actor && Array.isArray((actor as any).assignedClassroomIds)) {
      assignedClassrooms = (actor as any).assignedClassroomIds;
    }

    return { id, role, displayName, assignedClassrooms };
  }

  /**
   * Primary Authorization Verification Engine: can(actor, permission, resourceContext?)
   */
  public can(
    actor: UserIdentity | UserSession | InstitutionalUser,
    permission: UserPermission,
    resource?: ResourceAuthorizationContext,
    options: { suppressTelemetry?: boolean } = {}
  ): AuthorizationDecision {
    const { id: actorId, role: actorRole, displayName, assignedClassrooms } = this.extractActor(actor);

    // 1. Role Permission Matrix Check
    const permittedRoleActions = ROLE_PERMISSIONS[actorRole];
    if (!permittedRoleActions || !permittedRoleActions.has(permission)) {
      const decision: AuthorizationDecision = {
        granted: false,
        permission,
        reason: `Role '${actorRole}' is not authorized to execute '${permission}'.`,
        denialCode: "PERMISSION_NOT_ASSIGNED_TO_ROLE"
      };

      if (!options.suppressTelemetry) {
        auditService.recordDenial({
          actorId,
          actorRole,
          actorDisplayName: displayName,
          resourceType: resource?.resourceType || "system",
          resourceId: resource?.resourceId,
          classroomId: resource?.classroomId,
          denialCode: decision.denialCode!,
          reason: decision.reason!
        });
      }
      return decision;
    }

    // 2. Canonical Curriculum Immutability Check
    if (resource?.resourceType === "curriculum") {
      const isMutation = [
        "EDIT_LESSON_PLAN",
        "CREATE_LESSON_PLAN",
        "MANAGE_SYSTEM_SETTINGS",
        "RESTORE_CLASSROOM_DATA"
      ].includes(permission);

      if (isMutation && resource.provenance === "OFFICIAL_SYLLABUS") {
        const decision: AuthorizationDecision = {
          granted: false,
          permission,
          reason: "Canonical curriculum and official syllabi datasets are strictly read-only and immutable.",
          denialCode: "CANONICAL_CURRICULUM_IMMUTABLE"
        };
        if (!options.suppressTelemetry) {
          auditService.recordDenial({
            actorId,
            actorRole,
            actorDisplayName: displayName,
            resourceType: "curriculum",
            resourceId: resource.resourceId,
            denialCode: decision.denialCode!,
            reason: decision.reason!
          });
        }
        return decision;
      }
    }

    // 3. Learner Self-Sovereignty & Private Data Ownership
    if (actorRole === "LEARNER") {
      // Learner accessing profile or personal learning history
      if (
        resource?.resourceType === "profile" ||
        resource?.resourceType === "assignment" ||
        resource?.resourceType === "backup"
      ) {
        if (resource.ownerId && resource.ownerId !== actorId) {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: `Learner '${actorId}' cannot access private resource belonging to user '${resource.ownerId}'.`,
            denialCode: "RESOURCE_NOT_OWNED"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: resource.resourceType,
              resourceId: resource.resourceId,
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }
      }

      // Learner Backup/Restore Scope Boundary
      if (permission === "RESTORE_OWN_DATA" || permission === "EXPORT_OWN_DATA") {
        if (resource?.scope && resource.scope !== "learner_only") {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: `Learners can only perform backup operations on 'learner_only' scope. Requested: '${resource.scope}'.`,
            denialCode: "UNAUTHORIZED_BACKUP_SCOPE"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: "backup",
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }
      }
    }

    // 4. Teacher Classroom Tenancy & Ownership
    if (actorRole === "TEACHER") {
      // If resource specifies classroomId, verify teacher's assigned classroom access
      if (resource?.classroomId && assignedClassrooms && assignedClassrooms.length > 0) {
        if (!assignedClassrooms.includes(resource.classroomId)) {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: `Teacher '${actorId}' is not authorized for classroom '${resource.classroomId}'.`,
            denialCode: "CROSS_CLASSROOM_VIOLATION"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: resource.resourceType,
              resourceId: resource.resourceId,
              classroomId: resource.classroomId,
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }
      }

      // Teacher Backup scope check (teacher can export teacher_only or learner_only, not full_academy without admin)
      if (permission === "EXPORT_CLASSROOM_DATA" || permission === "RESTORE_CLASSROOM_DATA") {
        if (resource?.scope === "full_academy") {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: "Full institutional academy backups require ADMIN authorization.",
            denialCode: "UNAUTHORIZED_BACKUP_SCOPE"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: "backup",
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }
      }
    }

    // 5. Bookpreneur Author/Creator Ownership Boundaries
    if (resource?.resourceType === "book_project") {
      const isMutation = ["EDIT_BOOK_PROJECT", "SUBMIT_BOOK_RESOURCE"].includes(permission);
      if (isMutation && actorRole !== "ADMIN") {
        const ownerId = resource.ownerId || resource.creatorId;
        if (ownerId && ownerId !== actorId) {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: `User '${actorId}' cannot modify Bookpreneur project belonging to creator '${ownerId}'.`,
            denialCode: "CREATOR_ACCESS_VIOLATION"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: "book_project",
              resourceId: resource.resourceId,
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }
      }
    }

    // 6. Marketplace Publishing & Governance Boundaries
    if (resource?.resourceType === "marketplace_resource") {
      if (permission === "PUBLISH_MARKETPLACE_RESOURCE") {
        // AI generated resource cannot be published without human review/approval
        if (resource.provenance === "AI_GENERATED_DRAFT" && resource.publicationStatus !== "APPROVED") {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: "AI-generated educational resources require human editorial approval before publishing.",
            denialCode: "MARKETPLACE_APPROVAL_REQUIRED"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: "marketplace_resource",
              resourceId: resource.resourceId,
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }

        // Creator cross-resource publication prevention
        const creatorId = resource.creatorId || resource.ownerId;
        if (creatorId && creatorId !== actorId && actorRole !== "ADMIN") {
          const decision: AuthorizationDecision = {
            granted: false,
            permission,
            reason: `User '${actorId}' cannot publish marketplace resource owned by '${creatorId}'.`,
            denialCode: "CREATOR_ACCESS_VIOLATION"
          };
          if (!options.suppressTelemetry) {
            auditService.recordDenial({
              actorId,
              actorRole,
              actorDisplayName: displayName,
              resourceType: "marketplace_resource",
              resourceId: resource.resourceId,
              denialCode: decision.denialCode!,
              reason: decision.reason!
            });
          }
          return decision;
        }
      }
    }

    // Passed all institutional boundary checks
    return {
      granted: true,
      permission
    };
  }

  /**
   * Quick assertion helper that throws on denial.
   */
  public assertAuthorized(
    actor: UserIdentity | UserSession | InstitutionalUser,
    permission: UserPermission,
    resource?: ResourceAuthorizationContext
  ): void {
    const decision = this.can(actor, permission, resource);
    if (!decision.granted) {
      throw new Error(`[AUTHORIZATION_DENIED] ${decision.reason || "Unauthorized action"}`);
    }
  }
}

export const authorizationService = new AuthorizationService();
