/**
 * MOOS ACADEMY — LOCAL IDENTITY & SESSION SERVICE
 * 
 * Manages deterministic local user identities, pre-seeded institutional accounts,
 * active local session contexts, and safe role-isolated user switching.
 */

import {
  UserRole,
  UserIdentity,
  LearnerUserIdentity,
  TeacherUserIdentity,
  AdminUserIdentity,
  InstitutionalUser,
  UserSession
} from "../types/identity";
import { auditService } from "./auditService";
import { mfaService } from "./mfaService";

const IDENTITIES_STORAGE_KEY = "moos_academy_local_identities_v1";
const SESSION_STORAGE_KEY = "moos_academy_active_session_v1";

/**
 * Canonical Seeded Institutional Identities
 */
export const SEEDED_LEARNER_USER: LearnerUserIdentity = {
  id: "usr_lrn_ada_lovelace",
  role: "LEARNER",
  displayName: "Ada Lovelace",
  email: "ada.lovelace@moos.academy",
  createdAt: "2026-01-15T08:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
  status: "ACTIVE",
  targetLevel: "senior_secondary",
  curriculumStandard: "WAEC_WASSCE",
  assignedClassroomIds: ["cls-ss2-sci-a", "cls-ss2-sci-b", "class-sss3-math-a", "class-jamb-cbt-prep"],
  assignedTeacherIds: ["usr_tch_babatunde_ojo"],
  metadata: {
    bio: "Foundational to Advanced Mathematics & STEM Explorer"
  }
};

export const SEEDED_TEACHER_USER: TeacherUserIdentity = {
  id: "usr_tch_babatunde_ojo",
  role: "TEACHER",
  displayName: "Mr. Babatunde Ojo",
  email: "babatunde.ojo@moos.academy",
  createdAt: "2026-01-10T08:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
  status: "ACTIVE",
  schoolOrOrgName: "MOOS Academy — Senior STEM Faculty",
  department: "Department of Pure & Applied Mathematics",
  assignedClassroomIds: ["cls-ss2-sci-a", "cls-ss2-sci-b", "cls-ss1-gen-c", "class-sss3-math-a", "class-sss3-math-b", "class-jamb-cbt-prep"],
  assignedStudentIds: ["usr_lrn_ada_lovelace", "student_001", "student_002", "student_003"]
};

export const SEEDED_ADMIN_USER: AdminUserIdentity = {
  id: "usr_adm_amina_bello",
  role: "ADMIN",
  displayName: "Dr. Amina Bello",
  email: "amina.bello@governance.moos.academy",
  createdAt: "2026-01-01T08:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
  status: "ACTIVE",
  institutionName: "MOOS Academy Governing Board",
  administrativeDomain: "Institutional Academic Oversight & Governance",
  isSuperAdmin: true
};

export const ALL_SEEDED_IDENTITIES: InstitutionalUser[] = [
  SEEDED_LEARNER_USER,
  SEEDED_TEACHER_USER,
  SEEDED_ADMIN_USER
];

export class IdentityService {
  private activeSession: UserSession | null = null;
  private identitiesCache: Map<string, InstitutionalUser> | null = null;

  /**
   * Deterministic Safe Identifier Generator.
   * Uses role prefix + base36 timestamp + pseudo-random entropy string.
   */
  public generateUserId(role: UserRole): string {
    const prefix = role === "LEARNER" ? "usr_lrn" : role === "TEACHER" ? "usr_tch" : "usr_adm";
    const ts = Date.now().toString(36);
    const entropy = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${ts}_${entropy}`;
  }

  /**
   * Initialize and retrieve all known local identities.
   */
  public getIdentities(): InstitutionalUser[] {
    if (this.identitiesCache !== null) {
      return Array.from(this.identitiesCache.values());
    }

    const identityMap = new Map<string, InstitutionalUser>();
    // Pre-populate with default canonical accounts
    for (const user of ALL_SEEDED_IDENTITIES) {
      identityMap.set(user.id, user);
    }

    try {
      if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(IDENTITIES_STORAGE_KEY);
        if (raw) {
          const storedUsers: InstitutionalUser[] = JSON.parse(raw);
          if (Array.isArray(storedUsers)) {
            for (const u of storedUsers) {
              if (u && u.id && u.role) {
                identityMap.set(u.id, u);
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn("Could not read identities from localStorage", e);
    }

    this.identitiesCache = identityMap;
    return Array.from(identityMap.values());
  }

  public getIdentityById(userId: string): InstitutionalUser | undefined {
    this.getIdentities(); // Ensure cache loaded
    const user = this.identitiesCache?.get(userId);
    if (user) return user;

    const LEGACY_USER_ALIASES: Record<string, string> = {
      "user-teacher-001": SEEDED_TEACHER_USER.id,
      "user-admin-001": SEEDED_ADMIN_USER.id,
      "demo-learner-01": SEEDED_LEARNER_USER.id,
      "learner-001": SEEDED_LEARNER_USER.id
    };
    const targetAliasId = LEGACY_USER_ALIASES[userId];
    if (targetAliasId) {
      return this.identitiesCache?.get(targetAliasId);
    }

    return undefined;
  }

  public saveIdentity(user: InstitutionalUser): InstitutionalUser {
    this.getIdentities();
    const updated = {
      ...user,
      updatedAt: new Date().toISOString()
    };
    this.identitiesCache?.set(updated.id, updated);

    try {
      if (typeof localStorage !== "undefined") {
        const all = Array.from(this.identitiesCache?.values() || []);
        localStorage.setItem(IDENTITIES_STORAGE_KEY, JSON.stringify(all));
      }
    } catch (e) {
      console.error("Failed to save identity to localStorage", e);
    }

    return updated;
  }

  /**
   * Get active user session context.
   * If none exists in localStorage, defaults to canonical Learner session.
   */
  public getActiveSession(): UserSession {
    if (this.activeSession !== null) {
      return this.activeSession;
    }

    try {
      if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (raw) {
          const session: UserSession = JSON.parse(raw);
          if (session && session.sessionId && session.userId && session.role) {
            this.activeSession = {
              ...session,
              lastActivityAt: new Date().toISOString()
            };
            return this.activeSession;
          }
        }
      }
    } catch (e) {
      console.warn("Could not parse active session, falling back to default learner session", e);
    }

    // Default session: Learner
    return this.createSession(SEEDED_LEARNER_USER);
  }

  /**
   * Create a new local user session.
   */
  public createSession(user: InstitutionalUser, activeClassroomId?: string): UserSession {
    const sessionId = `sess_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    // Check independent AAL2 MFA assurance status (never trust client-set flags)
    const hasMfa = mfaService.hasActiveAssurance(user.id);
    const mfaAssuranceLevel = hasMfa ? "AAL2" : "AAL1";

    const session: UserSession = {
      sessionId,
      userId: user.id,
      role: user.role,
      displayName: user.displayName,
      activeClassroomId: activeClassroomId || (user.role === "TEACHER" ? (user as TeacherUserIdentity).assignedClassroomIds[0] : undefined),
      createdAt: now,
      lastActivityAt: now,
      mfaAssuranceLevel,
      deviceContext: {
        isLocalDevice: true,
        clientVersion: "1.0.0-institutional",
        environment: "browser_local_storage"
      }
    };

    this.activeSession = session;
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      }
    } catch (e) {
      console.error("Failed to store active session in localStorage", e);
    }

    // Log session creation audit event
    auditService.recordEvent({
      eventType: "LOGIN_CONTEXT_CREATED",
      actorId: user.id,
      actorRole: user.role,
      actorDisplayName: user.displayName,
      resourceType: "session",
      resourceId: sessionId,
      classroomId: session.activeClassroomId,
      result: "SUCCESS",
      reason: `Local session context established for ${user.displayName} (${user.role}), MFA assurance: ${mfaAssuranceLevel}`
    });

    return session;
  }

  /**
   * Switch active user context on the shared local device.
   * Privileged roles (ADMIN) require verified second-factor MFA assurance (AAL2).
   */
  public switchUser(
    targetUserId: string,
    options: { skipMfaCheck?: boolean; verificationCode?: string } = {}
  ): UserSession {
    const targetUser = this.getIdentityById(targetUserId);
    if (!targetUser) {
      throw new Error(`Cannot switch user: Identity '${targetUserId}' does not exist.`);
    }

    const previousSession = this.activeSession;

    // Zero-Trust Privileged Operation Gate: ADMIN role elevation requires verified MFA assurance
    const isAdminTarget = targetUser.role === "ADMIN" || ("isSuperAdmin" in targetUser && Boolean((targetUser as any).isSuperAdmin));
    if (!options.skipMfaCheck && isAdminTarget) {
      const hasMfaAssurance = mfaService.hasActiveAssurance(targetUser.id, "ADMIN_ROLE_SWITCH");
      if (!hasMfaAssurance) {
        auditService.recordDenial({
          actorId: previousSession?.userId || targetUser.id,
          actorRole: previousSession?.role || "LEARNER",
          actorDisplayName: previousSession?.displayName,
          resourceType: "identity_session",
          resourceId: targetUser.id,
          denialCode: "MFA_VERIFICATION_REQUIRED",
          reason: `Privileged role switch to '${targetUser.role}' (${targetUser.displayName}) blocked: Second-factor MFA assurance (AAL2) required.`
        });
        throw new Error(
          `[MFA_VERIFICATION_REQUIRED] Role elevation to '${targetUser.role}' requires verified second-factor MFA assurance. Please complete TOTP verification.`
        );
      }
    }

    const newSession = this.createSession(targetUser);

    // Record user switch audit event
    auditService.recordEvent({
      eventType: "USER_SWITCHED",
      actorId: targetUser.id,
      actorRole: targetUser.role,
      actorDisplayName: targetUser.displayName,
      resourceType: "session",
      resourceId: newSession.sessionId,
      classroomId: newSession.activeClassroomId,
      result: "SUCCESS",
      reason: `Context switched from [${previousSession?.userId || "none"}] to [${targetUser.id}] (${targetUser.role})`,
      metadata: {
        previousUserId: previousSession?.userId,
        previousRole: previousSession?.role,
        mfaAssuranceLevel: newSession.mfaAssuranceLevel
      }
    });

    return newSession;
  }

  /**
   * Elevates session to Admin role with verified MFA assurance.
   */
  public elevateSessionToAdminWithMfa(
    targetUserId: string,
    verificationCode: string,
    useRecoveryCode: boolean = false
  ): UserSession {
    const targetUser = this.getIdentityById(targetUserId);
    if (!targetUser) {
      throw new Error(`Target user '${targetUserId}' not found.`);
    }

    if (useRecoveryCode) {
      // Synchronously check recovery code verification
      throw new Error("Recovery code verification must be performed through async mfaService.verifyAndConsumeRecoveryCode");
    }

    // Mathematical verification of TOTP candidate code
    const verification = mfaService.verifyCandidateCode(targetUserId, verificationCode);
    if (!verification.isValid) {
      throw new Error(`[MFA_VERIFICATION_FAILED] ${verification.reason || "Invalid TOTP verification code."}`);
    }

    // Issue AAL2 assurance ticket
    mfaService.issueAssuranceTicket(targetUserId, "totp");

    // Perform the safe switch
    return this.switchUser(targetUserId);
  }

  /**
   * Set active classroom for current session.
   */
  public setActiveClassroom(classroomId: string): UserSession {
    const session = this.getActiveSession();
    session.activeClassroomId = classroomId;
    session.lastActivityAt = new Date().toISOString();
    this.activeSession = session;

    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      }
    } catch (e) {
      console.error("Failed to update active classroom in session", e);
    }

    return session;
  }

  /**
   * Terminate active session and restore default learner baseline.
   */
  public terminateSession(): UserSession {
    const current = this.activeSession;
    if (current) {
      mfaService.revokeAssurance(current.userId);
      auditService.recordEvent({
        eventType: "SESSION_TERMINATED",
        actorId: current.userId,
        actorRole: current.role,
        actorDisplayName: current.displayName,
        resourceType: "session",
        resourceId: current.sessionId,
        classroomId: current.activeClassroomId,
        result: "SUCCESS",
        reason: "User session explicitly terminated."
      });
    }

    this.activeSession = null;
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }

    return this.createSession(SEEDED_LEARNER_USER);
  }

  /**
   * Test helper to reset internal cache.
   */
  public resetForTesting(): void {
    this.activeSession = null;
    this.identitiesCache = null;
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem(IDENTITIES_STORAGE_KEY);
      }
    } catch {
      // Ignore in mock testing
    }
  }
}

export const identityService = new IdentityService();
