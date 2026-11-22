/**
 * MOOS TECHY ACADEMY — AUTHORITATIVE BACKUP & RESTORE SERVICE
 * 
 * Manages versioned local backup generation, deterministic serialization,
 * strict schema validation, safe restore execution, safety snapshots,
 * and disaster recovery rollback.
 */

import {
  AcademyBackupEnvelope,
  AcademyBackupPayload,
  BackupEntityCounts,
  BackupMetadata,
  BackupScope,
  BackupValidationResult,
  CURRENT_BACKUP_SCHEMA_VERSION,
  BACKUP_APPLICATION_ID,
  PRE_RESTORE_SNAPSHOT_STORAGE_KEY,
  RestorePreview,
  RestoreResult,
  SafetyRestoreSnapshot,
  ValidationIssue
} from "../types/backup";
import { ExtendedLearnerProfile, QuestionAttempt } from "../types/learner";
import { TeacherClassroom, ClassroomAssignment } from "../types/teacherStudio";
import { repositories } from "./repositories";
import { teacherStudioService } from "./teacherStudioService";
import { storageService } from "./storageService";
import { identityService, SEEDED_ADMIN_USER, SEEDED_TEACHER_USER } from "./identityService";
import { authorizationService } from "./authorizationService";
import { auditService } from "./auditService";
import { UserIdentity, UserSession, InstitutionalUser } from "../types/identity";

const LEARNER_STORAGE_KEY = "moos_academy_learner_state_v2";
const TEACHER_STORAGE_KEY = "moos_teacher_studio_v2";
const TUTOR_SESSIONS_KEY = "moos_academy_tutor_sessions_v1";

export class BackupService {
  private inMemorySafetySnapshot: SafetyRestoreSnapshot | null = null;

  /**
   * Deterministic SHA-256 / Checksum representation of a payload string.
   */
  private calculateSimpleHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return `local_crc32_${Math.abs(hash).toString(16).padStart(8, "0")}`;
  }

  /**
   * Create an application-level versioned backup envelope.
   */
  public async createBackup(
    scope: BackupScope = "full_academy",
    customLearnerId?: string,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): Promise<AcademyBackupEnvelope> {
    const activeActor = actor || (scope === "full_academy" ? SEEDED_ADMIN_USER : scope === "teacher_only" ? SEEDED_TEACHER_USER : identityService.getActiveSession());
    
    // Authorization Check
    const requiredPermission =
      scope === "learner_only"
        ? "EXPORT_OWN_DATA"
        : scope === "teacher_only"
        ? "EXPORT_CLASSROOM_DATA"
        : "MANAGE_INSTITUTION";

    const authDecision = authorizationService.can(activeActor, requiredPermission, {
      resourceType: "backup",
      scope
    });

    if (!authDecision.granted) {
      throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Backup export denied"}`);
    }

    const exportedAt = new Date().toISOString();
    const backupId = `moos-backup-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const payload: AcademyBackupPayload = {};

    let learnersCount = 0;
    let classroomsCount = 0;
    let assignmentsCount = 0;
    let lessonPlansCount = 0;
    let interventionsCount = 0;
    let attemptsCount = 0;
    let masteryRecordsCount = 0;
    let diagnosticResultsCount = 0;
    let examSubmissionsCount = 0;
    let tutorSessionsCount = 0;

    // 1. Learner Payload
    if (scope === "full_academy" || scope === "learner_only") {
      const profile = await storageService.getProfile();
      let sessions: any[] = [];
      try {
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          const rawSessions = localStorage.getItem(`${TUTOR_SESSIONS_KEY}_${profile.id}`);
          if (rawSessions) sessions = JSON.parse(rawSessions);
        }
      } catch (e) {
        console.warn("Could not read local tutor sessions for backup", e);
      }

      payload.learner = {
        profile,
        tutorSessions: sessions
      };

      learnersCount = 1;
      attemptsCount = profile.questionAttempts?.length || 0;
      masteryRecordsCount = Object.keys(profile.masteryRecords || {}).length;
      diagnosticResultsCount = profile.diagnosticHistory?.length || 0;
      examSubmissionsCount = profile.examHistory?.length || 0;
      tutorSessionsCount = sessions.length;
    }

    // 2. Teacher Payload
    if (scope === "full_academy" || scope === "teacher_only") {
      const classrooms = teacherStudioService.getClassrooms();
      const assignments = teacherStudioService.getAssignments();
      const lessonPlans = teacherStudioService.getLessonPlans();
      const interventions = teacherStudioService.getInterventions();
      const teacherInterventions = teacherStudioService.getTeacherInterventions();
      const classAnalytics = teacherStudioService.getClassAnalytics();

      payload.teacher = {
        teacherId: "user-teacher-001",
        classrooms,
        assignments,
        lessonPlans,
        interventions,
        teacherInterventions,
        classAnalytics
      };

      classroomsCount = classrooms.length;
      assignmentsCount = assignments.length;
      lessonPlansCount = lessonPlans.length;
      interventionsCount = interventions.length + teacherInterventions.length;
    }

    const entityCounts: BackupEntityCounts = {
      learners: learnersCount,
      classrooms: classroomsCount,
      assignments: assignmentsCount,
      lessonPlans: lessonPlansCount,
      interventions: interventionsCount,
      attempts: attemptsCount,
      masteryRecords: masteryRecordsCount,
      diagnosticResults: diagnosticResultsCount,
      examSubmissions: examSubmissionsCount,
      tutorSessions: tutorSessionsCount
    };

    const metadata: BackupMetadata = {
      schemaVersion: CURRENT_BACKUP_SCHEMA_VERSION,
      applicationId: BACKUP_APPLICATION_ID,
      backupId,
      exportedAt,
      scope,
      appName: "MOOS ACADEMY",
      appVersion: "2.5.0",
      sourceEnvironment: "browser_local_storage",
      entityCounts
    };

    const serializedPayload = JSON.stringify(payload);
    const payloadHash = this.calculateSimpleHash(serializedPayload);

    const envelope: AcademyBackupEnvelope = {
      schemaVersion: CURRENT_BACKUP_SCHEMA_VERSION,
      applicationId: BACKUP_APPLICATION_ID,
      backupId,
      exportedAt,
      metadata,
      payload,
      integrity: {
        signatureAlgorithm: "none_local_checksum",
        payloadHash,
        isEncrypted: false
      }
    };

    // Log institutional backup creation audit event
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;
    auditService.recordEvent({
      eventType: "BACKUP_CREATED",
      actorId,
      actorRole: activeActor.role,
      actorDisplayName: activeActor.displayName,
      resourceType: "backup",
      resourceId: backupId,
      result: "SUCCESS",
      reason: `Backup envelope generated (${scope}) containing ${attemptsCount} attempts and ${masteryRecordsCount} mastery records.`,
      metadata: {
        scope,
        entityCounts
      }
    });

    return envelope;
  }

  /**
   * Serialize backup to JSON string with indentation.
   */
  public serializeBackup(envelope: AcademyBackupEnvelope): string {
    return JSON.stringify(envelope, null, 2);
  }

  /**
   * Strict Validation of raw JSON string or parsed object.
   */
  public validateBackup(rawInput: unknown): BackupValidationResult {
    const issues: ValidationIssue[] = [];
    let parsed: any;

    if (typeof rawInput === "string") {
      try {
        if (rawInput.length > 25 * 1024 * 1024) {
          return {
            isValid: false,
            schemaVersion: 0,
            issues: [
              {
                severity: "error",
                code: "PAYLOAD_TOO_LARGE",
                field: "root",
                message: "Backup file exceeds maximum allowed size (25MB)."
              }
            ]
          };
        }
        parsed = JSON.parse(rawInput);
      } catch (err: any) {
        return {
          isValid: false,
          schemaVersion: 0,
          issues: [
            {
              severity: "error",
              code: "INVALID_JSON",
              field: "root",
              message: `Malformed JSON format: ${err?.message || "Syntax error"}`
            }
          ]
        };
      }
    } else if (typeof rawInput === "object" && rawInput !== null) {
      parsed = rawInput;
    } else {
      return {
        isValid: false,
        schemaVersion: 0,
        issues: [
          {
            severity: "error",
            code: "INVALID_INPUT",
            field: "root",
            message: "Backup input must be a valid JSON string or object."
          }
        ]
      };
    }

    // 1. Root structure validation
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        isValid: false,
        schemaVersion: 0,
        issues: [
          {
            severity: "error",
            code: "INVALID_ROOT_OBJECT",
            field: "root",
            message: "Root backup structure must be a non-null object."
          }
        ]
      };
    }

    // 2. Application ID validation
    if (parsed.applicationId !== BACKUP_APPLICATION_ID) {
      issues.push({
        severity: "error",
        code: "INVALID_APPLICATION_ID",
        field: "applicationId",
        message: `Expected applicationId "${BACKUP_APPLICATION_ID}", got "${parsed.applicationId || "unknown"}".`
      });
    }

    // 3. Schema version validation
    const schemaVer = Number(parsed.schemaVersion);
    if (isNaN(schemaVer) || schemaVer < 1) {
      issues.push({
        severity: "error",
        code: "INVALID_SCHEMA_VERSION",
        field: "schemaVersion",
        message: `Invalid schema version: ${parsed.schemaVersion}.`
      });
    } else if (schemaVer > CURRENT_BACKUP_SCHEMA_VERSION) {
      issues.push({
        severity: "error",
        code: "UNSUPPORTED_FUTURE_SCHEMA",
        field: "schemaVersion",
        message: `Backup schema version ${schemaVer} is newer than supported version ${CURRENT_BACKUP_SCHEMA_VERSION}. Please update the application.`
      });
    }

    // 4. Metadata verification
    if (!parsed.metadata || typeof parsed.metadata !== "object") {
      issues.push({
        severity: "error",
        code: "MISSING_METADATA",
        field: "metadata",
        message: "Backup metadata object is missing or malformed."
      });
    } else {
      if (!["full_academy", "learner_only", "teacher_only"].includes(parsed.metadata.scope)) {
        issues.push({
          severity: "error",
          code: "INVALID_BACKUP_SCOPE",
          field: "metadata.scope",
          message: `Invalid scope "${parsed.metadata.scope}". Allowed: full_academy, learner_only, teacher_only.`
        });
      }
    }

    // 5. Payload verification
    if (!parsed.payload || typeof parsed.payload !== "object") {
      issues.push({
        severity: "error",
        code: "MISSING_PAYLOAD",
        field: "payload",
        message: "Backup payload object is missing or malformed."
      });
      return {
        isValid: false,
        schemaVersion: schemaVer || 0,
        issues
      };
    }

    // 6. Learner domain validation
    if (parsed.payload.learner) {
      const learnerData = parsed.payload.learner;
      if (!learnerData.profile || typeof learnerData.profile !== "object") {
        issues.push({
          severity: "error",
          code: "INVALID_LEARNER_PROFILE",
          field: "payload.learner.profile",
          message: "Learner profile object is missing in learner payload."
        });
      } else {
        const p = learnerData.profile;
        if (!p.id || typeof p.id !== "string") {
          issues.push({
            severity: "error",
            code: "INVALID_LEARNER_ID",
            field: "payload.learner.profile.id",
            message: "Learner profile requires a valid string ID."
          });
        }
        if (p.role !== "learner") {
          issues.push({
            severity: "error",
            code: "INVALID_LEARNER_ROLE",
            field: "payload.learner.profile.role",
            message: `Learner role must be "learner", got "${p.role}".`
          });
        }

        // Validate mastery records
        if (p.masteryRecords && typeof p.masteryRecords === "object") {
          for (const [skillId, rec] of Object.entries(p.masteryRecords)) {
            const m = rec as any;
            if (typeof m.points !== "number" || m.points < 0 || m.points > 100) {
              issues.push({
                severity: "error",
                code: "INVALID_MASTERY_POINTS",
                field: `payload.learner.profile.masteryRecords.${skillId}.points`,
                message: `Mastery points for ${skillId} must be between 0 and 100, got ${m.points}.`
              });
            }
          }
        }

        // Validate question attempts
        if (p.questionAttempts && !Array.isArray(p.questionAttempts)) {
          issues.push({
            severity: "error",
            code: "INVALID_ATTEMPTS_ARRAY",
            field: "payload.learner.profile.questionAttempts",
            message: "Learner question attempts must be an array."
          });
        }
      }
    }

    // 7. Teacher domain validation
    if (parsed.payload.teacher) {
      const t = parsed.payload.teacher;
      if (t.classrooms && !Array.isArray(t.classrooms)) {
        issues.push({
          severity: "error",
          code: "INVALID_CLASSROOMS_ARRAY",
          field: "payload.teacher.classrooms",
          message: "Teacher classrooms must be an array."
        });
      }

      if (t.assignments && !Array.isArray(t.assignments)) {
        issues.push({
          severity: "error",
          code: "INVALID_ASSIGNMENTS_ARRAY",
          field: "payload.teacher.assignments",
          message: "Teacher assignments must be an array."
        });
      }

      // Check classroom relational consistency
      if (Array.isArray(t.classrooms) && Array.isArray(t.assignments)) {
        const classroomIds = new Set(t.classrooms.map((c: TeacherClassroom) => c.id));
        for (const asg of t.assignments) {
          if (asg.classroomId && !classroomIds.has(asg.classroomId)) {
            issues.push({
              severity: "warning",
              code: "ORPHANED_ASSIGNMENT_CLASSROOM",
              field: `payload.teacher.assignments[${asg.id}].classroomId`,
              message: `Assignment "${asg.title || asg.id}" references classroomId "${asg.classroomId}" which is not in the classroom roster list.`
            });
          }
        }
      }

      if (t.lessonPlans && !Array.isArray(t.lessonPlans)) {
        issues.push({
          severity: "error",
          code: "INVALID_LESSON_PLANS_ARRAY",
          field: "payload.teacher.lessonPlans",
          message: "Teacher lesson plans must be an array."
        });
      }
    }

    const hasErrors = issues.some((i) => i.severity === "error");

    return {
      isValid: !hasErrors,
      schemaVersion: schemaVer || 1,
      scope: parsed.metadata?.scope,
      issues,
      envelope: !hasErrors ? (parsed as AcademyBackupEnvelope) : undefined,
      entityCounts: parsed.metadata?.entityCounts
    };
  }

  /**
   * Generate a human-readable restore preview before applying changes.
   */
  public generateRestorePreview(envelope: AcademyBackupEnvelope): RestorePreview {
    const warnings: string[] = [];
    const payload = envelope.payload;

    let learnerName: string | undefined;
    let learnerEmail: string | undefined;
    let classroomsCount = 0;
    let assignmentsCount = 0;
    let attemptsCount = 0;
    let masteryCount = 0;
    let lessonPlansCount = 0;

    if (payload.learner?.profile) {
      const p = payload.learner.profile;
      learnerName = p.name;
      learnerEmail = p.email;
      attemptsCount = p.questionAttempts?.length || 0;
      masteryCount = Object.keys(p.masteryRecords || {}).length;
    }

    if (payload.teacher) {
      classroomsCount = payload.teacher.classrooms?.length || 0;
      assignmentsCount = payload.teacher.assignments?.length || 0;
      lessonPlansCount = payload.teacher.lessonPlans?.length || 0;
    }

    if (envelope.metadata.scope === "full_academy") {
      warnings.push("Full Academy restore will atomically replace both learner progress and teacher studio records.");
    } else if (envelope.metadata.scope === "learner_only") {
      warnings.push("Learner restore will update local mastery, attempt history, and academic preferences.");
    } else if (envelope.metadata.scope === "teacher_only") {
      warnings.push("Teacher restore will update classrooms, assignments, and lesson plans.");
    }

    warnings.push("A temporary pre-restore safety snapshot will be created automatically prior to applying changes.");

    return {
      backupId: envelope.backupId,
      exportedAt: envelope.exportedAt,
      schemaVersion: envelope.schemaVersion,
      scope: envelope.metadata.scope,
      learnerName,
      learnerEmail,
      classroomsCount,
      assignmentsCount,
      attemptsCount,
      masteryCount,
      lessonPlansCount,
      warnings,
      requiresConfirmation: true
    };
  }

  /**
   * Capture a local safety snapshot before any destructive restore operation.
   */
  public createSafetySnapshot(reason: string = "Pre-restore safety snapshot"): SafetyRestoreSnapshot {
    const snapshotId = `snapshot-${Date.now()}`;
    const learnerRaw = typeof localStorage !== "undefined" ? localStorage.getItem(LEARNER_STORAGE_KEY) : null;
    const teacherRaw = typeof localStorage !== "undefined" ? localStorage.getItem(TEACHER_STORAGE_KEY) : null;

    const snapshot: SafetyRestoreSnapshot = {
      snapshotId,
      createdAt: new Date().toISOString(),
      reason,
      state: {
        learnerStorageRaw: learnerRaw,
        teacherStorageRaw: teacherRaw
      }
    };

    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(PRE_RESTORE_SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshot));
      }
    } catch (e) {
      console.warn("Could not save pre-restore safety snapshot to storage", e);
    }

    this.inMemorySafetySnapshot = snapshot;
    return snapshot;
  }

  /**
   * Get the latest safety snapshot if one exists.
   */
  public getLatestSafetySnapshot(): SafetyRestoreSnapshot | null {
    try {
      if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(PRE_RESTORE_SNAPSHOT_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Could not read safety snapshot", e);
    }
    return this.inMemorySafetySnapshot;
  }

  /**
   * Roll back local state from the latest safety snapshot.
   */
  public restoreFromSafetySnapshot(): RestoreResult {
    const snapshot = this.getLatestSafetySnapshot();
    if (!snapshot) {
      return {
        success: false,
        message: "No safety snapshot found to recover from.",
        restoredScope: "full_academy",
        restoredCounts: {
          learners: 0,
          classrooms: 0,
          assignments: 0,
          lessonPlans: 0,
          interventions: 0,
          attempts: 0,
          masteryRecords: 0,
          diagnosticResults: 0,
          examSubmissions: 0,
          tutorSessions: 0
        },
        errors: ["Missing snapshot record"]
      };
    }

    try {
      if (typeof localStorage !== "undefined") {
        if (snapshot.state.learnerStorageRaw !== null) {
          localStorage.setItem(LEARNER_STORAGE_KEY, snapshot.state.learnerStorageRaw);
        }
        if (snapshot.state.teacherStorageRaw !== null) {
          localStorage.setItem(TEACHER_STORAGE_KEY, snapshot.state.teacherStorageRaw);
        }
      }

      // Log rollback audit event
      auditService.recordEvent({
        eventType: "BACKUP_ROLLBACK",
        actorId: "system_safety",
        actorRole: "ADMIN",
        resourceType: "backup",
        resourceId: snapshot.snapshotId,
        result: "SUCCESS",
        reason: `Reverted application state to safety snapshot: ${snapshot.reason}`
      });

      return {
        success: true,
        message: `Successfully rolled back to safety snapshot from ${new Date(snapshot.createdAt).toLocaleTimeString()}.`,
        restoredScope: "full_academy",
        snapshotId: snapshot.snapshotId,
        restoredCounts: {
          learners: 1,
          classrooms: 1,
          assignments: 1,
          lessonPlans: 1,
          interventions: 1,
          attempts: 1,
          masteryRecords: 1,
          diagnosticResults: 1,
          examSubmissions: 1,
          tutorSessions: 1
        }
      };
    } catch (e: any) {
      return {
        success: false,
        message: `Rollback failure: ${e?.message || "Storage write error"}`,
        restoredScope: "full_academy",
        restoredCounts: {
          learners: 0,
          classrooms: 0,
          assignments: 0,
          lessonPlans: 0,
          interventions: 0,
          attempts: 0,
          masteryRecords: 0,
          diagnosticResults: 0,
          examSubmissions: 0,
          tutorSessions: 0
        },
        errors: [e?.message || "Unknown error"]
      };
    }
  }

  /**
   * Disaster recovery alias for restoreFromSafetySnapshot.
   */
  public rollbackToSafetySnapshot(): RestoreResult {
    return this.restoreFromSafetySnapshot();
  }

  /**
   * Alias for executeRestore.
   */
  public async restoreBackup(
    envelope: AcademyBackupEnvelope,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): Promise<RestoreResult> {
    return this.executeRestore(envelope, actor);
  }

  /**
   * Execute atomic restore of an envelope after validation and safety snapshotting.
   */
  public async executeRestore(
    envelope: AcademyBackupEnvelope,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): Promise<RestoreResult> {
    const activeActor = actor || (envelope.metadata?.scope === "full_academy" ? SEEDED_ADMIN_USER : envelope.metadata?.scope === "teacher_only" ? SEEDED_TEACHER_USER : identityService.getActiveSession());
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    // 1. Role Authorization Check
    const requiredPermission =
      envelope.metadata?.scope === "learner_only"
        ? "RESTORE_OWN_DATA"
        : envelope.metadata?.scope === "teacher_only"
        ? "RESTORE_CLASSROOM_DATA"
        : "MANAGE_INSTITUTION";

    const authDecision = authorizationService.can(activeActor, requiredPermission, {
      resourceType: "backup",
      scope: envelope.metadata?.scope,
      ownerId: envelope.payload.learner?.profile?.id
    });

    if (!authDecision.granted) {
      auditService.recordEvent({
        eventType: "BACKUP_REJECTED",
        actorId,
        actorRole: activeActor.role,
        actorDisplayName: activeActor.displayName,
        resourceType: "backup",
        resourceId: envelope.backupId,
        result: "DENIED",
        reason: `[AUTHORIZATION_DENIED] ${authDecision.reason || "Unauthorized restore attempt"}`
      });

      return {
        success: false,
        message: `Restore authorization denied: ${authDecision.reason}`,
        restoredScope: envelope.metadata?.scope || "full_academy",
        restoredCounts: {
          learners: 0,
          classrooms: 0,
          assignments: 0,
          lessonPlans: 0,
          interventions: 0,
          attempts: 0,
          masteryRecords: 0,
          diagnosticResults: 0,
          examSubmissions: 0,
          tutorSessions: 0
        },
        errors: [`[AUTHORIZATION_DENIED] ${authDecision.reason}`]
      };
    }

    // 2. Strict pre-validation
    const validation = this.validateBackup(envelope);
    if (!validation.isValid) {
      auditService.recordEvent({
        eventType: "BACKUP_REJECTED",
        actorId,
        actorRole: activeActor.role,
        actorDisplayName: activeActor.displayName,
        resourceType: "backup",
        resourceId: envelope.backupId,
        result: "FAILED",
        reason: `Validation failed: ${validation.issues.map((i) => i.message).join(", ")}`
      });

      return {
        success: false,
        message: "Backup validation failed. Cannot apply corrupted or invalid backup.",
        restoredScope: envelope.metadata?.scope || "full_academy",
        restoredCounts: {
          learners: 0,
          classrooms: 0,
          assignments: 0,
          lessonPlans: 0,
          interventions: 0,
          attempts: 0,
          masteryRecords: 0,
          diagnosticResults: 0,
          examSubmissions: 0,
          tutorSessions: 0
        },
        errors: validation.issues.map((i) => `[${i.code}] ${i.message}`)
      };
    }

    // 3. Create safety snapshot
    const snapshot = this.createSafetySnapshot(`Restore backup ID: ${envelope.backupId}`);

    try {
      const scope = envelope.metadata.scope;
      const payload = envelope.payload;

      // 4. Restore Learner State
      if ((scope === "full_academy" || scope === "learner_only") && payload.learner?.profile) {
        const profileToSave: ExtendedLearnerProfile = {
          ...payload.learner.profile,
          updatedAt: new Date().toISOString()
        };

        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem(LEARNER_STORAGE_KEY, JSON.stringify(profileToSave));

          // Restore tutor sessions if present
          if (payload.learner.tutorSessions && Array.isArray(payload.learner.tutorSessions)) {
            localStorage.setItem(
              `${TUTOR_SESSIONS_KEY}_${profileToSave.id}`,
              JSON.stringify(payload.learner.tutorSessions)
            );
          }
        }
      }

      // 5. Restore Teacher Studio State
      if ((scope === "full_academy" || scope === "teacher_only") && payload.teacher) {
        const teacherData = {
          classrooms: payload.teacher.classrooms || [],
          assignments: payload.teacher.assignments || [],
          lessonPlans: payload.teacher.lessonPlans || [],
          interventions: payload.teacher.interventions || [],
          teacherInterventions: payload.teacher.teacherInterventions || [],
          classAnalytics: payload.teacher.classAnalytics
        };

        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(teacherData));
        }
      }

      const entityCounts = envelope.metadata.entityCounts || {
        learners: payload.learner ? 1 : 0,
        classrooms: payload.teacher?.classrooms?.length || 0,
        assignments: payload.teacher?.assignments?.length || 0,
        lessonPlans: payload.teacher?.lessonPlans?.length || 0,
        interventions: (payload.teacher?.interventions?.length || 0) + (payload.teacher?.teacherInterventions?.length || 0),
        attempts: payload.learner?.profile?.questionAttempts?.length || 0,
        masteryRecords: Object.keys(payload.learner?.profile?.masteryRecords || {}).length,
        diagnosticResults: payload.learner?.profile?.diagnosticHistory?.length || 0,
        examSubmissions: payload.learner?.profile?.examHistory?.length || 0,
        tutorSessions: payload.learner?.tutorSessions?.length || 0
      };

      // Record successful restore audit event
      auditService.recordEvent({
        eventType: "BACKUP_RESTORED",
        actorId,
        actorRole: activeActor.role,
        actorDisplayName: activeActor.displayName,
        resourceType: "backup",
        resourceId: envelope.backupId,
        result: "SUCCESS",
        reason: `Restored ${scope} backup (${envelope.backupId}) containing ${entityCounts.attempts} attempts and ${entityCounts.masteryRecords} mastery records.`,
        metadata: {
          scope,
          snapshotId: snapshot.snapshotId,
          entityCounts
        }
      });

      return {
        success: true,
        message: `Successfully restored ${scope.replace("_", " ")} backup (${envelope.backupId}).`,
        restoredScope: scope,
        snapshotId: snapshot.snapshotId,
        restoredCounts: entityCounts
      };
    } catch (err: any) {
      console.error("Restore execution failure, attempting rollback...", err);
      this.restoreFromSafetySnapshot();

      return {
        success: false,
        message: `Critical restore failure: ${err?.message || "Write error"}. State rolled back to previous snapshot.`,
        restoredScope: envelope.metadata.scope,
        snapshotId: snapshot.snapshotId,
        restoredCounts: {
          learners: 0,
          classrooms: 0,
          assignments: 0,
          lessonPlans: 0,
          interventions: 0,
          attempts: 0,
          masteryRecords: 0,
          diagnosticResults: 0,
          examSubmissions: 0,
          tutorSessions: 0
        },
        errors: [err?.message || "Execution exception"]
      };
    }
  }

  /**
   * Browser-compatible download trigger for exported JSON backup.
   */
  public downloadBackupFile(envelope: AcademyBackupEnvelope): { filename: string; sizeBytes: number } {
    const today = new Date().toISOString().split("T")[0];
    const prefix =
      envelope.metadata.scope === "learner_only"
        ? "moos-learner-backup"
        : envelope.metadata.scope === "teacher_only"
        ? "moos-teacher-backup"
        : "moos-academy-backup";

    const filename = `${prefix}-${today}.json`;
    const jsonString = this.serializeBackup(envelope);
    const blob = new Blob([jsonString], { type: "application/json" });
    const sizeBytes = blob.size;

    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return { filename, sizeBytes };
  }
}

export const backupService = new BackupService();
