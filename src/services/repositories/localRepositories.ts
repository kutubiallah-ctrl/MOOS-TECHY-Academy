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
import { TeacherLessonPlan, LearnerInterventionPlan, ClassAnalyticsSnapshot } from "../../types/teacherStudio";
import { AgentTask, AgentAuditRecord, HumanApprovalRecord, AgentRole, AgentContextPayload } from "../../types/agentOrchestrator";
import { DEFAULT_EXTENDED_LEARNER_PROFILE, LEARNING_DOMAINS, SUBJECTS, MATHEMATICS_UNITS } from "../../data/curriculumData";
import { CURRICULUM_STANDARD_MAPPINGS } from "../../data/curriculumMappingsData";
import { REGISTERED_QR_RESOURCES } from "../../data/qrResourceData";
import { ALL_PLAY_ACTIVITIES } from "../../data/learnAndPlayData";
import { textbookStudioService } from "../textbookStudioService";
import { bookpreneurService } from "../bookpreneurService";
import { teacherStudioService } from "../teacherStudioService";
import { agentOrchestrationService } from "../agentOrchestrationService";

const STORAGE_KEY = "moos_academy_learner_state_v2";
const TUTOR_SESSIONS_KEY = "moos_academy_tutor_sessions_v1";

export class LocalLearnerRepository implements ILearnerRepository {
  private inMemoryCache: ExtendedLearnerProfile | null = null;

  private getTodayString(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  public async getProfile(_learnerId?: string): Promise<ExtendedLearnerProfile> {
    if (this.inMemoryCache) {
      return this.inMemoryCache;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const sanitized: ExtendedLearnerProfile = {
          ...DEFAULT_EXTENDED_LEARNER_PROFILE,
          ...parsed,
          masteryRecords: {
            ...DEFAULT_EXTENDED_LEARNER_PROFILE.masteryRecords,
            ...(parsed.masteryRecords || {})
          },
          streak: {
            ...DEFAULT_EXTENDED_LEARNER_PROFILE.streak,
            ...(parsed.streak || {})
          },
          preferences: {
            ...DEFAULT_EXTENDED_LEARNER_PROFILE.preferences,
            ...(parsed.preferences || {})
          },
          streakDays: parsed.streakDays ?? parsed.streak?.count ?? DEFAULT_EXTENDED_LEARNER_PROFILE.streakDays,
          questionAttempts: Array.isArray(parsed.questionAttempts) ? parsed.questionAttempts : DEFAULT_EXTENDED_LEARNER_PROFILE.questionAttempts || [],
          activityHistory: Array.isArray(parsed.activityHistory) ? parsed.activityHistory : DEFAULT_EXTENDED_LEARNER_PROFILE.activityHistory || [],
          examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : DEFAULT_EXTENDED_LEARNER_PROFILE.examHistory || [],
          diagnosticHistory: Array.isArray(parsed.diagnosticHistory) ? parsed.diagnosticHistory : DEFAULT_EXTENDED_LEARNER_PROFILE.diagnosticHistory || [],
          unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : DEFAULT_EXTENDED_LEARNER_PROFILE.unlockedBadges || []
        };

        const updated = this.checkStreakHealth(sanitized);
        this.inMemoryCache = updated;
        return updated;
      }
    } catch (e) {
      console.warn("Storage retrieval warning, using default profile", e);
    }

    const defaultProfile = { ...DEFAULT_EXTENDED_LEARNER_PROFILE };
    this.inMemoryCache = defaultProfile;
    this.persist(defaultProfile);
    return defaultProfile;
  }

  public async saveProfile(profile: ExtendedLearnerProfile): Promise<ExtendedLearnerProfile> {
    profile.updatedAt = new Date().toISOString();
    this.inMemoryCache = profile;
    this.persist(profile);
    return profile;
  }

  public async updateMastery(
    learnerId: string,
    skillId: string,
    deltaPoints: number,
    isCorrect: boolean
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    if (!profile.masteryRecords) {
      profile.masteryRecords = { ...DEFAULT_EXTENDED_LEARNER_PROFILE.masteryRecords };
    }

    const existingRecord: MasteryRecord = profile.masteryRecords[skillId] || {
      skillId,
      status: "unstarted",
      points: 0,
      attempts: 0,
      correctCount: 0,
      lastPracticedAt: new Date().toISOString()
    };

    const newAttempts = existingRecord.attempts + 1;
    const newCorrect = isCorrect ? existingRecord.correctCount + 1 : existingRecord.correctCount;
    const newPoints = Math.min(100, Math.max(0, existingRecord.points + deltaPoints));

    let newStatus: "unstarted" | "familiar" | "proficient" | "mastered" = "familiar";
    if (newPoints >= 90) newStatus = "mastered";
    else if (newPoints >= 65) newStatus = "proficient";
    else if (newPoints >= 25) newStatus = "familiar";

    profile.masteryRecords[skillId] = {
      ...existingRecord,
      points: newPoints,
      status: newStatus,
      attempts: newAttempts,
      correctCount: newCorrect,
      lastPracticedAt: new Date().toISOString()
    };

    profile.masteryPoints = Object.values(profile.masteryRecords).reduce((acc, r) => acc + r.points, 0);
    return this.saveProfile(profile);
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

    profile.activityHistory = [newActivity, ...profile.activityHistory].slice(0, 100);
    profile.xp += activityData.xpEarned || 0;
    profile.masteryPoints += activityData.pointsEarned || 0;
    profile.level = Math.floor(profile.xp / 250) + 1;

    return this.saveProfile(profile);
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

    profile.questionAttempts = [newAttempt, ...profile.questionAttempts].slice(0, 300);
    const addedMinutes = Math.max(1, Math.round((attemptData.timeSpentSeconds || 60) / 60));
    profile.totalStudyMinutes += addedMinutes;

    return this.saveProfile(profile);
  }

  public async recordDiagnostic(
    learnerId: string,
    result: DiagnosticResult
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    profile.diagnosticsCompleted = true;
    profile.lastDiagnosticResult = result;
    profile.diagnosticHistory = [result, ...(profile.diagnosticHistory || [])];
    
    profile.xp += 150;
    profile.level = Math.floor(profile.xp / 250) + 1;

    const activity: LearnerActivity = {
      id: `act-diag-${Date.now()}`,
      type: "diagnostic",
      title: "Diagnostic Baseline Assessment Completed",
      description: `Scored ${result.percentage}% (${result.score}/${result.total} skills). Tier: ${result.tier}`,
      timestamp: new Date().toISOString(),
      pointsEarned: result.percentage,
      xpEarned: 150,
      metadata: {
        scorePercentage: result.percentage
      }
    };
    profile.activityHistory = [activity, ...profile.activityHistory];

    return this.saveProfile(profile);
  }

  public async recordExamSubmission(
    learnerId: string,
    submissionData: Omit<ExamSubmissionRecord, "id" | "submittedAt">
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile(learnerId);
    const newExamRecord: ExamSubmissionRecord = {
      ...submissionData,
      id: `exam-sub-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };

    profile.examHistory = [newExamRecord, ...(profile.examHistory || [])];
    const earnedXP = submissionData.passed ? 200 : 80;
    profile.xp += earnedXP;
    profile.level = Math.floor(profile.xp / 250) + 1;

    const activity: LearnerActivity = {
      id: `act-exam-${Date.now()}`,
      type: "exam",
      title: `Exam Completed: ${submissionData.examTitle}`,
      description: `Result: ${submissionData.scorePercentage}% (${submissionData.passed ? "Passed Benchmark" : "Practice Completed"})`,
      timestamp: new Date().toISOString(),
      pointsEarned: submissionData.scorePercentage,
      xpEarned: earnedXP,
      metadata: {
        scorePercentage: submissionData.scorePercentage,
        durationSeconds: submissionData.timeSpentSeconds
      }
    };
    profile.activityHistory = [activity, ...profile.activityHistory];

    return this.saveProfile(profile);
  }

  public async recordPlayCompletion(
    learnerId: string,
    activityTitle: string,
    skillId: string,
    score: number,
    maxScore: number,
    pointsDelta: number,
    xpDelta: number,
    timeSpentSeconds: number
  ): Promise<ExtendedLearnerProfile> {
    const pct = Math.round((score / maxScore) * 100);
    const isPassing = pct >= 70;

    const profile = await this.updateMastery(learnerId, skillId, pointsDelta, isPassing);
    profile.totalStudyMinutes += Math.max(1, Math.round(timeSpentSeconds / 60));

    const activity: LearnerActivity = {
      id: `act-play-${Date.now()}`,
      type: "practice",
      title: `Learn & Play: ${activityTitle}`,
      description: `Scored ${score}/${maxScore} pts (${pct}% accuracy). Gained +${pointsDelta} Mastery Points.`,
      timestamp: new Date().toISOString(),
      pointsEarned: pointsDelta,
      xpEarned: xpDelta,
      metadata: {
        skillId,
        scorePercentage: pct,
        durationSeconds: timeSpentSeconds
      }
    };

    profile.activityHistory = [activity, ...profile.activityHistory];
    profile.xp += xpDelta;
    profile.level = Math.floor(profile.xp / 250) + 1;

    return this.saveProfile(profile);
  }

  public async resetProfile(_learnerId?: string): Promise<ExtendedLearnerProfile> {
    const defaultProfile = { ...DEFAULT_EXTENDED_LEARNER_PROFILE };
    defaultProfile.updatedAt = new Date().toISOString();
    this.inMemoryCache = defaultProfile;
    this.persist(defaultProfile);
    return defaultProfile;
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

  private persist(profile: ExtendedLearnerProfile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
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
      return MATHEMATICS_UNITS.filter((u) => u.subjectId === subjectId);
    }
    return MATHEMATICS_UNITS;
  }

  public async getUnitById(unitId: string): Promise<Unit | undefined> {
    return MATHEMATICS_UNITS.find((u) => u.id === unitId);
  }

  public async getSkillById(skillId: string): Promise<Skill | undefined> {
    for (const unit of MATHEMATICS_UNITS) {
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
    return bookpreneurService.createProject(project);
  }
}

export class LocalTeacherStudioRepository implements ITeacherStudioRepository {
  public async getLessonPlans(): Promise<TeacherLessonPlan[]> {
    return teacherStudioService.getLessonPlans();
  }

  public async getInterventions(): Promise<LearnerInterventionPlan[]> {
    return teacherStudioService.getInterventions();
  }

  public async getClassAnalytics(): Promise<ClassAnalyticsSnapshot> {
    return teacherStudioService.getClassAnalytics();
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

