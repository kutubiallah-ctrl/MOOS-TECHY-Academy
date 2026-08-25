import { EducationalLevel, CurriculumStandard } from "./curriculum";

export type PlayActivityType =
  | "equation_balancer"
  | "concept_matcher"
  | "speed_grid"
  | "pattern_solver"
  | "classification_challenge"
  | "sequencing_challenge"
  | "formula_match"
  | "graph_interpretation"
  | "vocabulary_challenge";

export interface ClassificationCategory {
  id: string;
  name: string;
  description?: string;
  accentColor?: string;
}

export interface ClassificationItem {
  id: string;
  text: string;
  correctCategoryId: string;
  hint?: string;
  explanation?: string;
}

export interface SequencingStep {
  id: string;
  text: string;
  correctOrder: number;
  hint?: string;
  explanation?: string;
}

export interface PlayActivity {
  id: string;
  type: PlayActivityType;
  subjectId: string;
  domainId: string;
  level: EducationalLevel;
  curriculum: CurriculumStandard;
  unitId: string;
  topicId?: string;
  skillId: string;
  title: string;
  subtitle: string;
  description: string;
  learningObjective: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  timeLimitSeconds: number;
  maxScore: number;
  masteryPointsReward: number;
  xpReward: number;
  badgeUnlockId?: string;
  
  // Specific activity configurations
  equationConfig?: {
    targetEquation: string;
    targetVariable: string;
    leftInitialValue: number;
    rightInitialValue: number;
    targetValue: number;
    availableOperations: Array<{
      id: string;
      label: string;
      op: "add" | "subtract" | "multiply" | "divide";
      value: number;
    }>;
    targetSolutionSteps: number;
  };

  matcherConfig?: {
    pairs: Array<{
      id: string;
      concept: string;
      match: string;
      hint?: string;
      category: string;
    }>;
  };

  classificationConfig?: {
    categories: ClassificationCategory[];
    items: ClassificationItem[];
  };

  sequencingConfig?: {
    prompt: string;
    steps: SequencingStep[];
  };


  vocabularyConfig?: {
    terms: Array<{
      id: string;
      term: string;
      definition: string;
      category: string;
      example?: string;
    }>;
  };

  patternConfig?: {
    sequence: string[];
    missingIndex: number;
    options: string[];
    correctOption: string;
    ruleExplanation: string;
  };
}

export interface PlayAttemptRecord {
  id: string;
  activityId: string;
  activityTitle: string;
  skillId: string;
  unitId: string;
  score: number;
  maxScore: number;
  accuracyPercentage: number;
  timeSpentSeconds: number;
  completedAt: string;
  masteryPointsAwarded: number;
  xpAwarded: number;
}

