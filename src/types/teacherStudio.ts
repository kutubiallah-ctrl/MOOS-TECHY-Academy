/**
 * MOOS TECHY TEACHER STUDIO — CANONICAL DATA MODEL
 * 
 * Formal data models for educators and curriculum planners, enabling
 * syllabus planning, lesson scaffolding, diagnostic intervention,
 * formative/summative assessment creation, and QR companion linking.
 */

import { CurriculumStandard, EducationalLevel, Subject, Unit, Skill, PracticeQuestion } from "./curriculum";
import { ContentLifecycleStatus } from "./agentOrchestrator";

export interface TeacherLessonPlan {
  id: string;
  teacherId: string;
  title: string;
  subjectId: string;
  unitId: string;
  skillId: string;
  targetLevel: EducationalLevel;
  durationMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  materialsAndTools: string[];
  phases: Array<{
    phaseName: "Hook & Warmup" | "Direct Instruction" | "Guided Socratic Practice" | "Collaborative Task" | "Formative Exit Check";
    durationMinutes: number;
    teacherGuidance: string;
    studentActivity: string;
    keyQuestionsToAsk: string[];
    commonStumblingBlocks: string[];
  }>;
  suggestedPracticeQuestions: PracticeQuestion[];
  homeworkOrExtension: string;
  linkedQRCompanionCode?: string;
  lifecycleStatus: ContentLifecycleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherAssessmentBlueprint {
  id: string;
  teacherId: string;
  title: string;
  assessmentType: "diagnostic_quiz" | "unit_test" | "term_examination" | "mock_utme_cbt" | "wassce_prep";
  subjectId: string;
  targetLevel: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  durationMinutes: number;
  totalMarks: number;
  sections: Array<{
    sectionName: string;
    instructions: string;
    questionIds: string[];
    weightagePercentage: number;
  }>;
  rubricCriteria: Array<{
    criterion: string;
    maxScore: number;
    descriptors: {
      excellent: string;
      competent: string;
      developing: string;
    };
  }>;
  lifecycleStatus: ContentLifecycleStatus;
}

export interface LearnerInterventionPlan {
  id: string;
  learnerId: string;
  learnerName: string;
  identifiedStruggleSkillId: string;
  identifiedStruggleSkillName: string;
  diagnosticObservation: string;
  recommendedAction: "remedial_scaffolding" | "formula_codex_review" | "tutor_moos_session" | "peer_collaboration";
  suggestedQRResources: string[];
  followUpDueDate: string;
  status: "open" | "in_progress" | "resolved";
}

export interface ClassAnalyticsSnapshot {
  classId: string;
  className: string;
  gradeLevel: EducationalLevel;
  totalEnrolled: number;
  averageMasteryScore: number; // 0-100
  topStrengths: string[];
  priorityInterventionsCount: number;
  activeLearnersCount: number;
  recentExamAverage: number;
}
