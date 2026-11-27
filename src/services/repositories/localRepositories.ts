/**
 * MOOS TECHY ACADEMY — LOCAL REPOSITORY IMPLEMENTATIONS
 * 
 * Implements IRepositoryContainer against client-side LocalStorage and bundled datasets.
 * Acts as the default offline-resilient implementation during development and standalone modes.
 */

import {
  ILearnerRepository,
  ICurriculumRepository,
  IQRResourceRepository,
  IPlayActivityRepository,
  ITutorSessionRepository,
  ITextbookStudioRepository,
  IBookpreneurRepository,
  ITeacherStudioRepository,
  IAgentOrchestratorRepository,
  IRepositoryContainer
} from "./types";
import { ExtendedLearnerProfile, LearnerActivity, QuestionAttempt, ExamSubmissionRecord } from "../../types/learner";
import {
  DiagnosticResult,
  MasteryRecord,
  Unit,
  Skill,
  LearningDomain,
  Subject,
  PracticeQuestion,
  CurriculumStandardMapping,
  CountryCode,
  EducationSystemCode
} from "../../types/curriculum";
import { QRResourceRecord, QRResolutionResult } from "../../types/qrResource";
import { PlayActivity } from "../../types/learnAndPlay";
import { CanonicalTutorSession } from "../../types/entities";
import { TextbookProject } from "../../types/textbookStudio";
import { BookpreneurProject } from "../../types/bookpreneur";
import {
  TeacherLessonPlan,
  LearnerInterventionPlan,
  ClassAnalyticsSnapshot,
  TeacherClassroom,
  ClassroomRosterStudent,
  ClassroomAssignment,
  TeacherInterventionRecommendation,
  AssignmentLifecycleStatus,
  LearnerAssignmentProgress,
  TeacherInterventionStatus,
  ClassroomAdaptiveGroup,
  PrerequisiteBottleneckCluster,
  MisconceptionCluster,
  ClassroomNextBestAction
} from "../../types/teacherStudio";
import { AgentTask, AgentAuditRecord, HumanApprovalRecord, AgentRole, AgentContextPayload } from "../../types/agentOrchestrator";
import { DEFAULT_EXTENDED_LEARNER_PROFILE, LEARNING_DOMAINS, SUBJECTS, MATHEMATICS_UNITS } from "../../data/curriculumData";
import { ALL_CURRICULUM_UNITS } from "../../data/extendedCurriculumUnits";
import { CURRICULUM_STANDARD_MAPPINGS } from "../../data/curriculumMappingsData";
import { REGISTERED_QR_RESOURCES } from "../../data/qrResourceData";
import { ALL_PLAY_ACTIVITIES } from "../../data/learnAndPlayData";
import { textbookStudioService } from "../textbookStudioService";
import { bookpreneurService } from "../bookpreneurService";
import { SEEDED_ADMIN_USER } from "../identityService";
import { teacherStudioService } from "../teacherStudioService";
import { agentOrchestrationService } from "../agentOrchestrationService";
import {
  computeTotalMasteryPoints,
  evaluateDirectMasteryUpdate,
  evaluateSkillMastery
} from "../masteryEngine";
import { emailAllowlistService } from "../emailAllowlistService";
import { achievementService } from "../achievementService";
import { progressSyncCoordinator } from "../progressSyncCoordinator";

const STORAGE_KEY = "moos_academy_learner_state_v2";
const TUTOR_SESSIONS_KEY = "moos_academy_tutor_sessions_v1";

export class LocalLearnerRepository implements ILearnerRepository {
  private inMemoryCache: ExtendedLearnerProfile | null = null;
  private inMemoryCacheKey: string | null = null;

  private getTodayString(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  private getActiveStorageKey(): string {
    const activeEmail = emailAllowlistService.getActiveVerifiedEmail();
    return activeEmail ? `${STORAGE_KEY}:${activeEmail.toLowerCase()}` : STORAGE_KEY;
  }

  private buildInitialProfileForContext(): ExtendedLearnerProfile {
    const session = emailAllowlistService.getActiveSession();
    if (!session) {
      return {
        ...DEFAULT_EXTENDED_LEARNER_PROFILE,
        masteryPoints: computeTotalMasteryPoints(DEFAULT_EXTENDED_LEARNER_PROFILE.masteryRecords)
      };
    }

    const nowIso = new Date().toISOString();
    const today = this.getTodayString();
    return {
      ...DEFAULT_EXTENDED_LEARNER_PROFILE,
      id: `usr-${session.email.replace(/[^a-z0-9]/gi, "_")}`,
      name: session.fullName || session.email.split("@")[0] || "Academy Scholar",
      email: session.email,
      role: session.role === "teacher" ? "teacher" : session.role === "admin" || session.role === "owner" ? "admin" : "learner",
      masteryPoints: 0,
      xp: 0,
      level: 1,
      totalStudyMinutes: 0,
      streak: { count: 1, lastActiveDate: today, longestStreak: 1 },
      streakDays: 1,
      diagnosticsCompleted: false,
      lastDiagnosticResult: undefined,
      diagnosticHistory: [],
      masteryRecords: {},
      questionAttempts: [],
      activityHistory: [],
      examHistory: [],
      unlockedBadges: [],
      syncRevision: 0,
      createdAt: nowIso,
      updatedAt: nowIso
    };
  }

  public async getProfile(_learnerId?: string): Promise<ExtendedLearnerProfile> {
    const activeKey = this.getActiveStorageKey();
    if (this.inMemoryCache && this.inMemoryCacheKey === activeKey) {
      return this.inMemoryCache;
    }

    const fallbackTemplate = this.buildInitialProfileForContext();

    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        const stored = localStorage.getItem(activeKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          const sanitized: ExtendedLearnerProfile = {
            ...fallbackTemplate,
            ...parsed,
            masteryRecords: parsed.masteryRecords && typeof parsed.masteryRecords === "object"
              ? parsed.masteryRecords
              : fallbackTemplate.masteryRecords,
            streak: {
              ...fallbackTemplate.streak,
              ...(parsed.streak || {})
            },
            preferences: {
              ...fallbackTemplate.preferences,
              ...(parsed.preferences || {})
            },
            streakDays: parsed.streakDays ?? parsed.streak?.count ?? fallbackTemplate.streakDays,
            questionAttempts: Array.isArray(parsed.questionAttempts) ? parsed.questionAttempts : fallbackTemplate.questionAttempts || [],
            activityHistory: Array.isArray(parsed.activityHistory) ? parsed.activityHistory : fallbackTemplate.activityHistory || [],
            examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : fallbackTemplate.examHistory || [],
            diagnosticHistory: Array.isArray(parsed.diagnosticHistory) ? parsed.diagnosticHistory : fallbackTemplate.diagnosticHistory || [],
            unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : fallbackTemplate.unlockedBadges || []
          };

          if (Object.keys(sanitized.masteryRecords || {}).length > 0) {
            sanitized.masteryPoints = computeTotalMasteryPoints(sanitized.masteryRecords);
          }

          const updated = this.checkStreakHealth(sanitized);
          this.inMemoryCache = updated;
          this.inMemoryCacheKey = activeKey;
          return updated;
        }
      }
    } catch (e) {
      console.warn("Storage retrieval warning, using clean profile", e);
    }

    this.inMemoryCache = fallbackTemplate;
    this.inMemoryCacheKey = activeKey;
    this.persist(fallbackTemplate, activeKey);
    return fallbackTemplate;
  }

  private async commitMutation(
    profile: ExtendedLearnerProfile,
    reason: string,
    evaluateAchievements: boolean = true
  ): Promise<ExtendedLearnerProfile> {
    if (Object.keys(profile.masteryRecords || {}).length > 0) {
      profile.masteryPoints = computeTotalMasteryPoints(profile.masteryRecords);
    }

    if (evaluateAchievements) {
      try {
        const achRes = achievementService.evaluateAndSyncLearnerAchievements(profile);
        if (achRes.newlyUnlockedBadges.length > 0) {
          profile.unlockedBadges = Array.from(
            new Set([...(profile.unlockedBadges || []), ...achRes.newlyUnlockedBadges])
          );
        }
      } catch {
        // Achievement evaluation should never block progress mutation
      }
    }

    profile.syncRevision = (profile.syncRevision || 0) + 1;
    profile.updatedAt = new Date().toISOString();

    const activeKey = this.getActiveStorageKey();
    this.inMemoryCache = profile;
    this.inMemoryCacheKey = activeKey;
    this.persist(profile, activeKey);

    try {
      await progressSyncCoordinator.syncProfileMutation(profile, reason);
    } catch (err) {
      console.warn("Unified cloud sync deferred to offline queue:", err);
    }

    return profile;
  }

  public async saveProfile(profile: ExtendedLearnerProfile): Promise<ExtendedLearnerProfile> {
    return this.commitMutation({ ...profile }, "save_profile", false);
  }

  public async recalculateSkillMastery(
    learnerId: string,
    skillId: string
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    if (!profile.masteryRecords) {
      profile.masteryRecords = {};
    }

    const attemptsForSkill = (profile.questionAttempts || []).filter((a) => a.skillId === skillId);
    const existingRecord = profile.masteryRecords[skillId];
    if (attemptsForSkill.length > 0) {
      profile.masteryRecords[skillId] = evaluateSkillMastery({
        skillId,
        attempts: profile.questionAttempts || [],
        existingRecord
      });
    }

    profile.masteryPoints = computeTotalMasteryPoints(profile.masteryRecords);
    return this.commitMutation(profile, `recalculate_mastery:${skillId}`, true);
  }

  public async updateMastery(
    learnerId: string,
    skillId: string,
    deltaPoints: number,
    isCorrect: boolean
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    if (!profile.masteryRecords) {
      profile.masteryRecords = {};
    }

    const existingRecord = profile.masteryRecords[skillId];
    const attemptsForSkill = (profile.questionAttempts || []).filter((a) => a.skillId === skillId);

    if (attemptsForSkill.length > (existingRecord?.attempts || 0)) {
      // Evidence-backed attempt exceeds stored count: derive strictly from questionAttempts
      profile.masteryRecords[skillId] = evaluateSkillMastery({
        skillId,
        attempts: profile.questionAttempts || [],
        existingRecord
      });
    } else {
      // Direct updateMastery call fallback — enforces minimum-evidence & accuracy guards while tracking attempt count
      profile.masteryRecords[skillId] = evaluateDirectMasteryUpdate(
        existingRecord,
        skillId,
        deltaPoints,
        isCorrect
      );
    }

    profile.masteryPoints = computeTotalMasteryPoints(profile.masteryRecords);
    return this.commitMutation(profile, `update_mastery:${skillId}`, true);
  }

  public async recordActivity(
    learnerId: string,
    activityData: Omit<LearnerActivity, "id" | "timestamp">
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    const newActivity: LearnerActivity = {
      ...activityData,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    };

    profile.activityHistory = [newActivity, ...(profile.activityHistory || [])].slice(0, 100);
    profile.xp = (profile.xp || 0) + (activityData.xpEarned || 0);
    // CRITICAL INVARIANT (Directive 006 WS1): masteryPoints MUST ONLY derive from masteryRecords, never double-counted in recordActivity!
    profile.masteryPoints = computeTotalMasteryPoints(profile.masteryRecords);
    profile.level = Math.floor(profile.xp / 250) + 1;

    return this.commitMutation(profile, `record_activity:${activityData.type}`, true);
  }

  public async recordQuestionAttempt(
    learnerId: string,
    attemptData: Omit<QuestionAttempt, "id" | "timestamp">
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    const newAttempt: QuestionAttempt = {
      ...attemptData,
      id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    };

    profile.questionAttempts = [newAttempt, ...(profile.questionAttempts || [])].slice(0, 300);
    const addedMinutes = Math.max(1, Math.round((attemptData.timeSpentSeconds || 60) / 60));
    profile.totalStudyMinutes = (profile.totalStudyMinutes || 0) + addedMinutes;

    // Continuously synchronize skill mastery directly from attempt evidence
    if (!profile.masteryRecords) {
      profile.masteryRecords = {};
    }
    profile.masteryRecords[attemptData.skillId] = evaluateSkillMastery({
      skillId: attemptData.skillId,
      attempts: profile.questionAttempts,
      existingRecord: profile.masteryRecords[attemptData.skillId]
    });
    profile.masteryPoints = computeTotalMasteryPoints(profile.masteryRecords);

    return this.commitMutation(profile, `question_attempt:${attemptData.skillId}`, true);
  }

  public async recordDiagnostic(
    learnerId: string,
    result: DiagnosticResult
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    profile.diagnosticsCompleted = true;
    profile.lastDiagnosticResult = result;
    profile.diagnosticHistory = [result, ...(profile.diagnosticHistory || [])].slice(0, 30);

    profile.xp = (profile.xp || 0) + 150;
    profile.level = Math.floor(profile.xp / 250) + 1;

    const activity: LearnerActivity = {
      id: `act-diag-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: "diagnostic",
      title: "Diagnostic Baseline Assessment Completed",
      description: `Scored ${result.percentage}% (${result.score}/${result.total} skills). Tier: ${result.tier}`,
      timestamp: new Date().toISOString(),
      pointsEarned: 0,
      xpEarned: 150,
      metadata: {
        scorePercentage: result.percentage
      }
    };
    profile.activityHistory = [activity, ...(profile.activityHistory || [])].slice(0, 100);

    return this.commitMutation(profile, "diagnostic_completed", true);
  }

  public async recordExamSubmission(
    learnerId: string,
    submissionData: Omit<ExamSubmissionRecord, "id" | "submittedAt">
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    const newExamRecord: ExamSubmissionRecord = {
      ...submissionData,
      id: `exam-sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString()
    };

    profile.examHistory = [newExamRecord, ...(profile.examHistory || [])].slice(0, 50);
    const earnedXP = submissionData.passed ? 200 : 80;
    profile.xp = (profile.xp || 0) + earnedXP;
    profile.level = Math.floor(profile.xp / 250) + 1;
    profile.totalStudyMinutes =
      (profile.totalStudyMinutes || 0) + Math.max(1, Math.round((submissionData.timeSpentSeconds || 60) / 60));

    const activity: LearnerActivity = {
      id: `act-exam-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: "exam",
      title: `Exam Completed: ${submissionData.examTitle}`,
      description: `Result: ${submissionData.scorePercentage}% (${submissionData.passed ? "Passed Benchmark" : "Practice Completed"})`,
      timestamp: new Date().toISOString(),
      pointsEarned: 0,
      xpEarned: earnedXP,
      metadata: {
        scorePercentage: submissionData.scorePercentage,
        durationSeconds: submissionData.timeSpentSeconds
      }
    };
    profile.activityHistory = [activity, ...(profile.activityHistory || [])].slice(0, 100);

    return this.commitMutation(profile, `exam_submission:${submissionData.examId}`, true);
  }

  public async recordPlayCompletion(
    learnerId: string,
    activityTitle: string,
    skillId: string,
    score: number,
    maxScore: number,
    _pointsDelta: number,
    xpDelta: number,
    timeSpentSeconds: number
  ): Promise<ExtendedLearnerProfile> {
    const safeMax = Math.max(1, maxScore);
    const pct = Math.round((score / safeMax) * 100);
    const isPassing = pct >= 70;

    // Record authentic evidence-backed attempt for the skill instead of arbitrary bonus delta
    const afterAttempt = await this.recordQuestionAttempt(learnerId, {
      questionId: `play-${skillId}-${Date.now()}`,
      skillId,
      selectedOption: `${score}/${safeMax} (${pct}%)`,
      isCorrect: isPassing,
      hintsUsedCount: isPassing ? 0 : 1,
      timeSpentSeconds: Math.max(15, timeSpentSeconds),
      provenance: "PLATFORM_CONTENT",
      isAiGenerated: false
    });

    const earnedPoints = afterAttempt.masteryRecords?.[skillId]?.points || 0;
    const activity: LearnerActivity = {
      id: `act-play-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: "practice",
      title: `Learn & Play: ${activityTitle}`,
      description: `Scored ${score}/${maxScore} pts (${pct}% accuracy). Skill mastery now ${earnedPoints} pts.`,
      timestamp: new Date().toISOString(),
      pointsEarned: 0,
      xpEarned: xpDelta,
      metadata: {
        skillId,
        scorePercentage: pct,
        durationSeconds: timeSpentSeconds
      }
    };

    afterAttempt.activityHistory = [activity, ...(afterAttempt.activityHistory || [])].slice(0, 100);
    afterAttempt.xp = (afterAttempt.xp || 0) + xpDelta;
    afterAttempt.level = Math.floor(afterAttempt.xp / 250) + 1;
    afterAttempt.masteryPoints = computeTotalMasteryPoints(afterAttempt.masteryRecords);

    return this.commitMutation(afterAttempt, `play_completion:${skillId}`, true);
  }

  public async hydrateFromRemote(learnerId?: string): Promise<ExtendedLearnerProfile> {
    const localProfile = await this.getProfile(learnerId);
    const reconciled = await progressSyncCoordinator.hydrateAndReconcileForSession(localProfile);
    if (Object.keys(reconciled.masteryRecords || {}).length > 0) {
      reconciled.masteryPoints = computeTotalMasteryPoints(reconciled.masteryRecords);
    }
    const activeKey = this.getActiveStorageKey();
    this.inMemoryCache = reconciled;
    this.inMemoryCacheKey = activeKey;
    this.persist(reconciled, activeKey);
    return reconciled;
  }

  public async resetProfile(_learnerId?: string): Promise<ExtendedLearnerProfile> {
    const freshProfile = this.buildInitialProfileForContext();
    freshProfile.updatedAt = new Date().toISOString();
    const activeKey = this.getActiveStorageKey();
    this.inMemoryCache = freshProfile;
    this.inMemoryCacheKey = activeKey;
    this.persist(freshProfile, activeKey);
    return freshProfile;
  }

  private checkStreakHealth(profile: ExtendedLearnerProfile): ExtendedLearnerProfile {
    const today = this.getTodayString();
    const lastDate = profile.streak?.lastActiveDate;

    if (!lastDate) {
      profile.streak = { count: 1, lastActiveDate: today, longestStreak: 1 };
      return profile;
    }

    if (lastDate === today) {
      return profile;
    }

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, "0")}-${String(yesterdayDate.getDate()).padStart(2, "0")}`;

    if (lastDate === yesterday) {
      profile.streak.count += 1;
      profile.streak.lastActiveDate = today;
      profile.streak.longestStreak = Math.max(profile.streak.longestStreak, profile.streak.count);
    } else {
      profile.streak.count = 1;
      profile.streak.lastActiveDate = today;
    }

    return profile;
  }

  private persist(profile: ExtendedLearnerProfile, storageKey: string = this.getActiveStorageKey()) {
    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(profile));
      }
    } catch (e) {
      console.warn("Storage persist error", e);
    }
  }
}

export class LocalCurriculumRepository implements ICurriculumRepository {
  public async getDomains(): Promise<LearningDomain[]> {
    return LEARNING_DOMAINS;
  }

  public async getSubjects(domainId?: string): Promise<Subject[]> {
    if (domainId) {
      return SUBJECTS.filter((s) => s.domainId === domainId);
    }
    return SUBJECTS;
  }

  public async getUnits(subjectId?: string): Promise<Unit[]> {
    if (subjectId) {
      return ALL_CURRICULUM_UNITS.filter((u) => u.subjectId === subjectId);
    }
    return ALL_CURRICULUM_UNITS;
  }

  public async getUnitById(unitId: string): Promise<Unit | undefined> {
    return ALL_CURRICULUM_UNITS.find((u) => u.id === unitId);
  }

  public async getSkillById(skillId: string): Promise<Skill | undefined> {
    for (const unit of ALL_CURRICULUM_UNITS) {
      const match = unit.skills.find((s) => s.id === skillId);
      if (match) return match;
    }
    return undefined;
  }

  public async getPracticeQuestions(skillId: string): Promise<PracticeQuestion[]> {
    const skill = await this.getSkillById(skillId);
    return skill?.questions || [];
  }

  public async getCompetencyMappings(skillId: string): Promise<CurriculumStandardMapping[]> {
    return CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.canonicalSkillId === skillId);
  }

  public async getMappingsByStandard(standard: EducationSystemCode | string, gradeOrYear?: string): Promise<CurriculumStandardMapping[]> {
    return CURRICULUM_STANDARD_MAPPINGS.filter((m) => {
      const standardMatches = m.curriculumSystem.toLowerCase() === standard.toLowerCase() ||
                              m.country.toLowerCase() === standard.toLowerCase();
      if (!standardMatches) return false;
      if (gradeOrYear) {
        return m.gradeOrYear.toLowerCase().includes(gradeOrYear.toLowerCase());
      }
      return true;
    });
  }

  public async getCurriculaByCountry(country: CountryCode): Promise<CurriculumStandardMapping[]> {
    return CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.country.toLowerCase() === country.toLowerCase());
  }

  public async getAllMappings(): Promise<CurriculumStandardMapping[]> {
    return CURRICULUM_STANDARD_MAPPINGS;
  }
}

export class LocalQRResourceRepository implements IQRResourceRepository {
  public async resolveResource(resourceCode: string): Promise<QRResolutionResult> {
    if (!resourceCode || typeof resourceCode !== "string") {
      return {
        isValid: false,
        resolvedAt: new Date().toISOString(),
        error: "Missing or invalid QR resource identifier."
      };
    }

    const cleanCode = resourceCode.trim().toUpperCase().replace(/\s+/g, "");
    const match = REGISTERED_QR_RESOURCES.find((item) => item.resourceCode.toUpperCase() === cleanCode);

    if (match) {
      return {
        isValid: true,
        resource: match,
        resolvedAt: new Date().toISOString()
      };
    }

    return {
      isValid: false,
      resolvedAt: new Date().toISOString(),
      error: `Resource code "${cleanCode}" was not found in the textbook registry.`
    };
  }

  public async getAllResources(): Promise<QRResourceRecord[]> {
    return REGISTERED_QR_RESOURCES;
  }

  public async getResourcesByBook(bookCode: string): Promise<QRResourceRecord[]> {
    return REGISTERED_QR_RESOURCES.filter((r) => r.bookCode.toUpperCase() === bookCode.toUpperCase());
  }

  public async recordResourceAccess(_resourceCode: string, _learnerId?: string): Promise<void> {
    // Local no-op / local analytics log
  }
}

export class LocalPlayActivityRepository implements IPlayActivityRepository {
  public async getAllActivities(): Promise<PlayActivity[]> {
    return ALL_PLAY_ACTIVITIES;
  }

  public async getActivityById(activityId: string): Promise<PlayActivity | undefined> {
    return ALL_PLAY_ACTIVITIES.find((a) => a.id === activityId);
  }

  public async getActivitiesBySkill(skillId: string): Promise<PlayActivity[]> {
    return ALL_PLAY_ACTIVITIES.filter((a) => a.skillId === skillId);
  }
}


export class LocalTutorSessionRepository implements ITutorSessionRepository {
  public async saveSession(session: CanonicalTutorSession): Promise<void> {
    try {
      const history = await this.getSessionHistory(session.learnerId);
      const updated = [session, ...history.filter((s) => s.id !== session.id)].slice(0, 30);
      localStorage.setItem(`${TUTOR_SESSIONS_KEY}_${session.learnerId}`, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not persist tutor session locally", e);
    }
  }

  public async getSessionHistory(learnerId: string): Promise<CanonicalTutorSession[]> {
    try {
      const raw = localStorage.getItem(`${TUTOR_SESSIONS_KEY}_${learnerId}`);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Could not read local tutor sessions", e);
    }
    return [];
  }
}

export class LocalTextbookStudioRepository implements ITextbookStudioRepository {
  public async getAllTextbooks(): Promise<TextbookProject[]> {
    return textbookStudioService.getAllTextbooks();
  }

  public async getTextbookById(id: string): Promise<TextbookProject | undefined> {
    return textbookStudioService.getTextbookById(id);
  }

  public async saveTextbook(project: TextbookProject): Promise<TextbookProject> {
    return textbookStudioService.createTextbookProject(project);
  }
}

export class LocalBookpreneurRepository implements IBookpreneurRepository {
  public async getAllProjects(): Promise<BookpreneurProject[]> {
    return bookpreneurService.getAllProjects();
  }

  public async getProjectById(id: string): Promise<BookpreneurProject | undefined> {
    return bookpreneurService.getProjectById(id);
  }

  public async saveProject(project: BookpreneurProject): Promise<BookpreneurProject> {
    const existing = bookpreneurService.getProjectById(project.id);
    if (existing) {
      const updated = bookpreneurService.updateProject(SEEDED_ADMIN_USER, project.id, project);
      return updated || project;
    }
    return bookpreneurService.createProject(SEEDED_ADMIN_USER, project);
  }
}

export class LocalTeacherStudioRepository implements ITeacherStudioRepository {
  public async getClassrooms(): Promise<TeacherClassroom[]> {
    return teacherStudioService.getClassrooms();
  }

  public async getClassroomById(id: string): Promise<TeacherClassroom | undefined> {
    return teacherStudioService.getClassroomById(id);
  }

  public async createClassroom(data: Partial<TeacherClassroom>): Promise<TeacherClassroom> {
    return teacherStudioService.createClassroom(data);
  }

  public async getRoster(classroomId: string): Promise<ClassroomRosterStudent[]> {
    return teacherStudioService.getRoster(classroomId);
  }

  public async getAssignments(classroomId?: string): Promise<ClassroomAssignment[]> {
    return teacherStudioService.getAssignments(classroomId);
  }

  public async getAssignmentById(id: string): Promise<ClassroomAssignment | undefined> {
    return teacherStudioService.getAssignmentById(id);
  }

  public async createAssignment(data: Partial<ClassroomAssignment>): Promise<ClassroomAssignment> {
    return teacherStudioService.createAssignment(data);
  }

  public async updateAssignmentStatus(assignmentId: string, status: AssignmentLifecycleStatus): Promise<void> {
    teacherStudioService.updateAssignmentStatus(assignmentId, status);
  }

  public async updateLearnerProgress(assignmentId: string, learnerId: string, progress: Partial<LearnerAssignmentProgress>): Promise<void> {
    teacherStudioService.updateLearnerProgress(assignmentId, learnerId, progress);
  }

  public async completeAssignment(assignmentId: string, learnerId: string): Promise<void> {
    teacherStudioService.completeAssignment(assignmentId, learnerId);
  }

  public async getTeacherInterventions(classroomId: string): Promise<TeacherInterventionRecommendation[]> {
    return teacherStudioService.getTeacherInterventions(classroomId);
  }

  public async updateInterventionStatus(interventionId: string, status: TeacherInterventionStatus): Promise<void> {
    teacherStudioService.updateInterventionStatus(interventionId, status);
  }

  public async getAdaptiveGroups(classroomId: string): Promise<ClassroomAdaptiveGroup[]> {
    return teacherStudioService.getAdaptiveGroups(classroomId);
  }

  public async getPrerequisiteBottlenecks(classroomId: string): Promise<PrerequisiteBottleneckCluster[]> {
    return teacherStudioService.getPrerequisiteBottlenecks(classroomId);
  }

  public async getMisconceptionClusters(classroomId: string): Promise<MisconceptionCluster[]> {
    return teacherStudioService.getMisconceptionClusters(classroomId);
  }

  public async getNextBestActions(classroomId: string): Promise<ClassroomNextBestAction[]> {
    return teacherStudioService.getNextBestActions(classroomId);
  }

  public async getLessonPlans(): Promise<TeacherLessonPlan[]> {
    return teacherStudioService.getLessonPlans();
  }

  public async getInterventions(): Promise<LearnerInterventionPlan[]> {
    return teacherStudioService.getInterventions();
  }

  public async getClassAnalytics(classroomId?: string): Promise<ClassAnalyticsSnapshot> {
    return teacherStudioService.getClassAnalytics(classroomId);
  }

  public async saveLessonPlan(plan: TeacherLessonPlan): Promise<TeacherLessonPlan> {
    return teacherStudioService.createLessonPlan(plan);
  }
}

export class LocalAgentOrchestratorRepository implements IAgentOrchestratorRepository {
  public async getAuditLog(): Promise<AgentAuditRecord[]> {
    return agentOrchestrationService.getAuditTrail();
  }

  public async getApprovalQueue(): Promise<HumanApprovalRecord[]> {
    return agentOrchestrationService.getApprovalQueue();
  }

  public async orchestrate(agentRole: AgentRole, objective: string, context: AgentContextPayload): Promise<AgentTask> {
    return agentOrchestrationService.orchestrateTask(agentRole, objective, context);
  }
}

