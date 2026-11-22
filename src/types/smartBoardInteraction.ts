/**
 * MOOS ACADEMY — INTERACTIVE SMART BOARD MASTERCLASS ENGINE
 * 
 * Defines the comprehensive interactive pedagogical model:
 * Modes: WATCH (Teacher-led) | INTERACT (Manipulative exploration) | DO (Step-by-step problem solver)
 * Structured progression: Problem -> Givens/Target -> Strategy -> Formula -> Substitution -> Calculation -> Verification -> Interpretation
 * 5-level Socratic hint ladder, pedagogical misconception engine, and contextual adaptive state.
 */

export type InteractiveSmartBoardMode = "watch" | "interact" | "do";

export type ProblemSolvingPhase =
  | "problem"
  | "strategy"
  | "formula"
  | "substitution"
  | "calculation"
  | "verification"
  | "interpretation";

export type SmartBoardInteractionType =
  | "STEP_COMPLETION"
  | "MULTIPLE_CHOICE"
  | "FORMULA_SELECTION"
  | "DRAG_AND_DROP"
  | "GRAPH_MANIPULATION"
  | "PARAMETER_CONTROL"
  | "ERROR_IDENTIFICATION"
  | "ORDERING"
  | "LABELING"
  | "PREDICTION"
  | "NUMERIC_INPUT"
  | "ALGEBRAIC_INPUT"
  | "MATCHING"
  | "TRACE_EXECUTION"
  | "DIAGRAM_INTERACTION"
  | "HINT_REVEAL"
  | "CHECKPOINT_RESPONSE";

export type SmartBoardMisconceptionType =
  | "sign_error"
  | "wrong_operation_order"
  | "formula_selection_error"
  | "unit_inconsistency"
  | "concept_confusion"
  | "variable_substitution_error"
  | "grammar_proximity_error"
  | "algorithmic_reasoning_error"
  | "invalid_strategy_choice"
  | "formula_misapplication"
  | "substitution_sign_error"
  | "verification_tolerance_failure"
  | "fallacy_misidentification"
  | "unhedged_assertion_error"
  | "false_synthesis_dichotomy";

export type EvaluationOutcome =
  | "CORRECT"
  | "PARTIALLY_CORRECT"
  | "INCORRECT"
  | "MISCONCEPTION_DETECTED"
  | "NEEDS_PREREQUISITE"
  | "MASTERED";

export type AdaptiveNextAction =
  | "continue"
  | "retry"
  | "hint"
  | "remediate"
  | "explain"
  | "challenge"
  | "advance"
  | "review";

export interface SocraticHintLevel {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  description: string;
  revealedContent: string;
}

export interface InteractiveProblemStep {
  id: string;
  phase: ProblemSolvingPhase;
  title: string;
  instruction: string;
  availableOptions?: Array<{
    id: string;
    label: string;
    latex?: string;
    isCorrect: boolean;
    misconception?: SmartBoardMisconceptionType;
    explanation: string;
  }>;
  expectedAnswer?: string;
  acceptableAnswers?: string[];
  parameterTarget?: string;
  hints: SocraticHintLevel[];
  workedSolution: string;
  verificationRule?: string;
}

export interface InteractiveLessonState {
  currentPhase: ProblemSolvingPhase;
  currentStep: number;
  totalSteps: number;
  currentProblem: string;
  givenInformation: Record<string, string>;
  target: string;
  selectedStrategy?: string;
  selectedFormula?: string;
  learnerResponse?: string;
  expectedResponse?: string;
  attemptCount: number;
  hintLevel: number; // 0 (none) to 5 (fully worked)
  misconceptionDetected?: SmartBoardMisconceptionType | null;
  confidenceSignal?: "low" | "medium" | "high";
  masterySignal?: "needs_prerequisite" | "developing" | "proficient" | "mastered";
  teacherExplanationState?: string;
  boardObjectState: Record<string, any>;
  interactionMode: InteractiveSmartBoardMode;
  previousStep?: number;
  nextRecommendedAction: AdaptiveNextAction;
  evaluationResult?: EvaluationOutcome;
  feedbackMessage?: string;
  completedPhases: ProblemSolvingPhase[];
  history: Array<{
    step: number;
    phase: ProblemSolvingPhase;
    response: string;
    isCorrect: boolean;
    misconception?: SmartBoardMisconceptionType | null;
    timestamp: number;
  }>;
}

export interface SubjectManipulativeState {
  subject: "mathematics" | "physics" | "chemistry" | "biology" | "computer_science" | "english" | "engineering";
  title: string;
  conceptName: string;
  parameters: Record<string, number | string | boolean>;
  computedOutputs: Record<string, number | string | boolean>;
  activeObservations: string[];
  pedagogicalTakeaway: string;
  predictionPrompt?: string;
  predictionOptions?: Array<{ id: string; label: string; isCorrect: boolean; explanation: string }>;
  predictionSubmitted?: boolean;
  selectedPrediction?: string;
}
