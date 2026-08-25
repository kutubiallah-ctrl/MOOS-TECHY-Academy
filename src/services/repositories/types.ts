/**
 * MOOS TECHY ACADEMY — REPOSITORY INTERFACES
 * 
 * Clean abstraction layer separating React UI / Application Services
 * from persistence engines (LocalStorage in prototype mode, Firestore / Cloud SQL in production).
 */

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
import { TextbookProject, TextbookSection } from "../../types/textbookStudio";
import { BookpreneurProject } from "../../types/bookpreneur";
import { TeacherLessonPlan, LearnerInterventionPlan, ClassAnalyticsSnapshot } from "../../types/teacherStudio";
import { AgentTask, AgentAuditRecord, HumanApprovalRecord, AgentRole, AgentContextPayload } from "../../types/agentOrchestrator";

export interface ILearnerRepository {
  getProfile(learnerId?: string): Promise<ExtendedLearnerProfile>;
  saveProfile(profile: ExtendedLearnerProfile): Promise<ExtendedLearnerProfile>;
  updateMastery(learnerId: string, skillId: string, deltaPoints: number, isCorrect: boolean): Promise<ExtendedLearnerProfile>;
  recordActivity(learnerId: string, activity: Omit<LearnerActivity, "id" | "timestamp">): Promise<ExtendedLearnerProfile>;
  recordQuestionAttempt(learnerId: string, attempt: Omit<QuestionAttempt, "id" | "timestamp">): Promise<ExtendedLearnerProfile>;
  recordDiagnostic(learnerId: string, result: DiagnosticResult): Promise<ExtendedLearnerProfile>;
  recordExamSubmission(learnerId: string, submission: Omit<ExamSubmissionRecord, "id" | "submittedAt">): Promise<ExtendedLearnerProfile>;
  recordPlayCompletion(
    learnerId: string,
    activityTitle: string,
    skillId: string,
    score: number,
    maxScore: number,
    pointsDelta: number,
    xpDelta: number,
    timeSpentSeconds: number
  ): Promise<ExtendedLearnerProfile>;
  resetProfile(learnerId?: string): Promise<ExtendedLearnerProfile>;
}

export interface ICurriculumRepository {
  getDomains(): Promise<LearningDomain[]>;
  getSubjects(domainId?: string): Promise<Subject[]>;
  getUnits(subjectId?: string): Promise<Unit[]>;
  getUnitById(unitId: string): Promise<Unit | undefined>;
  getSkillById(skillId: string): Promise<Skill | undefined>;
  getPracticeQuestions(skillId: string): Promise<PracticeQuestion[]>;
  getCompetencyMappings(skillId: string): Promise<CurriculumStandardMapping[]>;
  getMappingsByStandard(standard: EducationSystemCode | string, gradeOrYear?: string): Promise<CurriculumStandardMapping[]>;
  getCurriculaByCountry(country: CountryCode): Promise<CurriculumStandardMapping[]>;
  getAllMappings(): Promise<CurriculumStandardMapping[]>;
}

export interface IQRResourceRepository {
  resolveResource(resourceCode: string): Promise<QRResolutionResult>;
  getAllResources(): Promise<QRResourceRecord[]>;
  getResourcesByBook(bookCode: string): Promise<QRResourceRecord[]>;
  recordResourceAccess(resourceCode: string, learnerId?: string): Promise<void>;
}

export interface IPlayActivityRepository {
  getAllActivities(): Promise<PlayActivity[]>;
  getActivityById(activityId: string): Promise<PlayActivity | undefined>;
  getActivitiesBySkill(skillId: string): Promise<PlayActivity[]>;
}

export interface ITutorSessionRepository {
  saveSession(session: CanonicalTutorSession): Promise<void>;
  getSessionHistory(learnerId: string): Promise<CanonicalTutorSession[]>;
}

export interface ITextbookStudioRepository {
  getAllTextbooks(): Promise<TextbookProject[]>;
  getTextbookById(id: string): Promise<TextbookProject | undefined>;
  saveTextbook(project: TextbookProject): Promise<TextbookProject>;
}

export interface IBookpreneurRepository {
  getAllProjects(): Promise<BookpreneurProject[]>;
  getProjectById(id: string): Promise<BookpreneurProject | undefined>;
  saveProject(project: BookpreneurProject): Promise<BookpreneurProject>;
}

export interface ITeacherStudioRepository {
  getLessonPlans(): Promise<TeacherLessonPlan[]>;
  getInterventions(): Promise<LearnerInterventionPlan[]>;
  getClassAnalytics(): Promise<ClassAnalyticsSnapshot>;
  saveLessonPlan(plan: TeacherLessonPlan): Promise<TeacherLessonPlan>;
}

export interface IAgentOrchestratorRepository {
  getAuditLog(): Promise<AgentAuditRecord[]>;
  getApprovalQueue(): Promise<HumanApprovalRecord[]>;
  orchestrate(agentRole: AgentRole, objective: string, context: AgentContextPayload): Promise<AgentTask>;
}

export interface IRepositoryContainer {
  learner: ILearnerRepository;
  curriculum: ICurriculumRepository;
  qrResource: IQRResourceRepository;
  playActivity: IPlayActivityRepository;
  tutorSession: ITutorSessionRepository;
  textbookStudio: ITextbookStudioRepository;
  bookpreneur: IBookpreneurRepository;
  teacherStudio: ITeacherStudioRepository;
  agentOrchestrator: IAgentOrchestratorRepository;
}
