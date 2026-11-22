/**
 * MOOS TECHY ACADEMY — READINESS PATHWAYS ("GET READY") DATA MODEL
 * 
 * Reusable pedagogical readiness architecture:
 * TARGET COURSE -> PREREQUISITE DIAGNOSTIC -> KNOWLEDGE GAPS -> FOUNDATIONAL LESSONS -> GUIDED PRACTICE -> REMEDIATION -> READINESS CHECK -> TARGET COURSE
 * 
 * Invariants:
 * 1. If a learner already demonstrates mastery (points >= 80% on prerequisite competencies),
 *    readiness is immediately certified without forcing redundant remediation.
 * 2. Prerequisite gaps pinpoint exact misconception triggers and link to foundational skills.
 */

import { EducationalLevel, PracticeQuestion, Skill, Unit } from "./curriculum";

export type ReadinessStatus =
  | "not_started"
  | "evaluating"
  | "gaps_identified"
  | "in_remediation"
  | "readiness_certified"
  | "exempt_mastered";

export interface ReadinessPrerequisiteSkill {
  skillId: string;
  unitId: string;
  skillTitle: string;
  unitTitle: string;
  level: EducationalLevel;
  focusArea: string;
  importanceWeight: "essential" | "recommended" | "extension";
  currentMasteryPoints: number; // 0-100
  isMastered: boolean;
}

export interface ReadinessKnowledgeGap {
  skillId: string;
  skillTitle: string;
  unitTitle: string;
  missedConcepts: string[];
  observedMisconceptions: string[];
  recommendedAction: string;
  priority: "high" | "medium" | "low";
}

export interface ReadinessPathway {
  id: string;
  code: string;
  title: string;
  targetCourseOrLevel: string;
  targetSubject: string;
  targetLevel: EducationalLevel;
  description: string;
  iconName: string;
  estimatedHours: number;
  prerequisiteDiagnosticQuestions: PracticeQuestion[];
  prerequisiteSkills: ReadinessPrerequisiteSkill[];
  passingScorePercentage: number; // e.g. 75%
  status: ReadinessStatus;
  lastEvaluatedAt?: string;
  diagnosticScore?: {
    totalQuestions: number;
    correctCount: number;
    percentage: number;
  };
  identifiedGaps: ReadinessKnowledgeGap[];
  completionCertificateEligible: boolean;
}

export interface ReadinessEvaluationResult {
  pathwayId: string;
  status: ReadinessStatus;
  scorePercentage: number;
  isReadyForTargetCourse: boolean;
  exemptMastered: boolean;
  gaps: ReadinessKnowledgeGap[];
  prescribedSkillsToRemediate: string[];
  summaryNote: string;
}
