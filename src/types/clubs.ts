/**
 * MOOS TECHY ACADEMY — CLUBS & CO-CURRICULAR LIFECYCLE DATA MODEL
 * 
 * Formal architecture defining co-curricular clubs (JET, Press & Literary, Young Farmers, Coding & Robotics)
 * and the mandatory 9-stage active learner progression cycle:
 * JOIN -> LEARN -> PRACTISE -> BUILD -> PARTICIPATE -> SHARE -> COMPETE -> REFLECT -> ADVANCE
 */

export type ClubCycleStage =
  | "JOIN"
  | "LEARN"
  | "PRACTISE"
  | "BUILD"
  | "PARTICIPATE"
  | "SHARE"
  | "COMPETE"
  | "REFLECT"
  | "ADVANCE";

export const CLUB_CYCLE_STAGES: ClubCycleStage[] = [
  "JOIN",
  "LEARN",
  "PRACTISE",
  "BUILD",
  "PARTICIPATE",
  "SHARE",
  "COMPETE",
  "REFLECT",
  "ADVANCE"
];

export type ClubId =
  | "club_jet"
  | "club_press_literary"
  | "club_young_farmers"
  | "club_coding_robotics";

export interface ClubProject {
  id: string;
  clubId: ClubId;
  title: string;
  description: string;
  deliverableType: "prototype" | "article" | "harvest_log" | "code_repository" | "presentation";
  difficulty: "beginner" | "intermediate" | "advanced";
  milestones: string[];
}

export interface ClubCompetition {
  id: string;
  clubId: ClubId;
  title: string;
  description: string;
  scheduledDate: string;
  status: "upcoming" | "active" | "concluded";
  awardTier: string;
}

export interface ClubProjectSubmission {
  projectId: string;
  learnerId: string;
  submissionTitle: string;
  submissionContent: string;
  submittedAt: string;
  reviewStatus: "draft" | "submitted" | "patron_approved" | "exhibited";
  patronFeedback?: string;
}

export interface LearnerClubProgress {
  clubId: ClubId;
  learnerId: string;
  currentStage: ClubCycleStage;
  joinedAt: string;
  completedStages: ClubCycleStage[];
  projectsSubmitted: ClubProjectSubmission[];
  competitionsEntered: string[];
  reflectionNotes: Array<{ stage: ClubCycleStage; note: string; timestamp: string }>;
  badgesEarned: string[];
  lastActiveDate: string;
}

export interface ClubDefinition {
  id: ClubId;
  name: string;
  motto: string;
  category: "STEM" | "Literacy & Humanities" | "Agriculture & Bio-economy" | "Computing & Robotics";
  patronTeacherName: string;
  curriculumDomains: string[];
  description: string;
  stageGuidance: Record<ClubCycleStage, { title: string; prompt: string; actionLabel: string }>;
  activeProjects: ClubProject[];
  activeCompetitions: ClubCompetition[];
  membersCount: number;
}
