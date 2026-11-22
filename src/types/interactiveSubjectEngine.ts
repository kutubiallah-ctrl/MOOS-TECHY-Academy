/**
 * MOOS TECHY ACADEMY — INTERACTIVE SUBJECT ENGINE DATA TYPES
 * 
 * Defines formal data models for:
 * 1. Domain-specific pedagogical models
 * 2. Interactive Scene Graphs with mathematical/physical constraints
 * 3. Manipulables & derived state calculators
 * 4. Invariants, misconception triggers & assessment opportunities
 * 5. Structured Tutor Moos Context
 */

export type SubjectEngineDomain =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer_science"
  | "english_esl"
  | "literature_humanities";

export type SceneGraphObjectType =
  | "math_function"
  | "math_point"
  | "math_vector"
  | "math_polygon"
  | "physics_projectile"
  | "physics_circuit_element"
  | "physics_force_vector"
  | "chem_atom_nucleus"
  | "chem_electron_orbital"
  | "chem_chemical_bond"
  | "bio_cell_membrane"
  | "bio_chromosome"
  | "bio_punnett_square"
  | "cs_array_cell"
  | "cs_pointer"
  | "cs_call_stack_frame"
  | "lang_clause_node"
  | "lang_phoneme_waveform"
  | "lit_text_passage"
  | "lit_rhetorical_callout";

export interface SceneGraphObject {
  id: string;
  type: SceneGraphObjectType;
  label: string;
  position: { x: number; y: number; z?: number };
  properties: Record<string, any>;
  style?: {
    color?: string;
    strokeWidth?: number;
    opacity?: number;
    highlighted?: boolean;
  };
}

export interface SceneConstraint {
  id: string;
  sourceObjectId: string;
  targetObjectId?: string;
  constraintType: "equality" | "bounded_range" | "conservation_law" | "grammatical_agreement" | "algorithm_boundary";
  formulaOrRule: string;
  tolerance?: number;
}

export interface SceneAction {
  id: string;
  name: string;
  targetParameter: string;
  allowedRange?: [number, number];
  stepSize?: number;
  discreteOptions?: string[];
  description: string;
}

export interface InvariantDefinition {
  id: string;
  name: string;
  rule: string;
  evaluationExpression: string; // Evaluated dynamically or via typed handler
  pedagogicalMeaning: string;
}

export interface MisconceptionTrigger {
  id: string;
  misconceptionCode: string;
  title: string;
  conditionDescription: string;
  tutorSocraticPrompt: string;
  remedialSceneAdjustment?: Record<string, any>;
}

export interface InteractiveSceneGraph {
  sceneId: string;
  domain: SubjectEngineDomain;
  title: string;
  pedagogicalObjective: string;
  objects: SceneGraphObject[];
  constraints: SceneConstraint[];
  activeParameters: Record<string, number | string | boolean>;
  derivedQuantities: Record<string, number | string | boolean>;
  invariants: InvariantDefinition[];
  misconceptionTriggers: MisconceptionTrigger[];
  availableActions: SceneAction[];
  checkpointQuestion?: {
    id: string;
    prompt: string;
    targetDerivedProperty: string;
    expectedValue: any;
    tolerance?: number;
    socraticHint: string;
  };
}

export interface TutorMoosContext {
  activeSubject: SubjectEngineDomain;
  curriculum: string;
  country: string;
  educationalSystem: string;
  course: string;
  unit: string;
  topic: string;
  pedagogicalPhase: "WATCH" | "INTERACT" | "DO";
  sceneId: string;
  sceneObjectsCount: number;
  activeParameters: Record<string, any>;
  derivedState: Record<string, any>;
  lastLearnerAction?: {
    parameter: string;
    oldValue: any;
    newValue: any;
    timestamp: string;
  };
  expectedInvariantsPassed: boolean;
  triggeredMisconceptions: string[];
  learnerAttemptsCount: number;
  masteryPointsAwarded: number;
  suggestedSocraticFollowup: string;
}

// --------------------------------------------------------------------------
// DOMAIN-SPECIFIC STATE MODELS
// --------------------------------------------------------------------------

// 1. MATHEMATICS: Quadratic Function Engine
export interface QuadraticMathState {
  a: number; // Coefficient of x^2 (a != 0)
  b: number; // Coefficient of x
  c: number; // Constant term
  // Derived state
  discriminant: number; // b^2 - 4ac
  vertex: { x: number; y: number }; // (-b / 2a, f(-b/2a))
  roots: { count: number; x1?: number; x2?: number; isComplex: boolean };
  axisOfSymmetry: number; // x = -b / (2a)
  yIntercept: number; // (0, c)
  concavity: "UPWARD" | "DOWNWARD";
}

// 2. PHYSICS: Projectile Motion Engine
export interface ProjectilePhysicsState {
  initialVelocity: number; // m/s
  launchAngleDegrees: number; // degrees
  gravity: number; // m/s^2 (default 9.8 or 9.81)
  initialHeight: number; // m (default 0)
  // Derived state
  initialVx: number; // v0 * cos(theta)
  initialVy: number; // v0 * sin(theta)
  timeOfFlight: number; // seconds
  maximumHeight: number; // meters
  horizontalRange: number; // meters
  impactVelocity: { vx: number; vy: number; magnitude: number; angleDegrees: number };
}

// 3. CHEMISTRY: Atomic Structure & Orbitals
export interface AtomChemistryState {
  atomicNumber: number; // Z (Protons)
  massNumber: number; // A (Protons + Neutrons)
  netCharge: number; // Charge (+1, -1, 0)
  // Derived state
  elementSymbol: string;
  elementName: string;
  protons: number;
  neutrons: number;
  electrons: number;
  electronConfiguration: string; // e.g. "1s2 2s2 2p6 3s1"
  valenceElectrons: number;
  period: number;
  group: number;
  isStableOctet: boolean;
}

// 4. BIOLOGY: Mendelian Monohybrid Cross
export interface GeneticsBiologyState {
  parent1Genotype: [string, string]; // e.g. ["B", "b"]
  parent2Genotype: [string, string]; // e.g. ["B", "b"]
  dominantTraitName: string; // e.g. "Brown Eyes"
  recessiveTraitName: string; // e.g. "Blue Eyes"
  // Derived state
  punnettSquare: Array<{ rowAllele: string; colAllele: string; offspringGenotype: string }>;
  genotypicRatio: { homozygousDominant: number; heterozygous: number; homozygousRecessive: number };
  phenotypicRatio: { dominant: number; recessive: number };
  dominantPercentage: number;
  recessivePercentage: number;
}

// 5. COMPUTER SCIENCE: Binary Search Algorithm
export interface BinarySearchCSState {
  array: number[]; // Sorted array of integers
  target: number;
  lowIndex: number;
  highIndex: number;
  midIndex: number;
  stepCount: number;
  // Derived state
  remainingSearchSpaceSize: number;
  currentMidValue: number | null;
  comparisonOutcome: "LESS_THAN" | "GREATER_THAN" | "MATCH_FOUND" | "NOT_FOUND";
  isTerminated: boolean;
  theoreticalMaxSteps: number; // ceil(log2(N))
}

// 6. ENGLISH / ESL: Concord & Syntax Engine
export interface SyntaxEnglishState {
  subjectPhrase: { text: string; number: "SINGULAR" | "PLURAL"; person: "1ST" | "2ND" | "3RD" };
  verbPhrase: { text: string; formNumber: "SINGULAR" | "PLURAL"; tense: "PRESENT" | "PAST" | "FUTURE" };
  objectPhrase?: { text: string };
  modifierPhrase?: { text: string; position: "PRE_SUBJECT" | "POST_VERB" };
  // Derived state
  fullSentence: string;
  isConcordValid: boolean;
  concordRuleViolationReason?: string;
  cefrLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  ipaTranscription: string;
}

// 7. LITERATURE / HUMANITIES: Rhetorical Analysis Engine
export interface LiteratureAnalysisState {
  passageText: string;
  author: string;
  historicalContext: string;
  highlightedDevices: Array<{
    term: string; // e.g. "Metaphor", "Irony", "Polysyndeton"
    excerpt: string;
    rhetoricalFunction: string;
  }>;
  // Derived state
  thematicPremise: string;
  criticalArguments: Array<{ claim: string; evidenceQuote: string; reasoning: string }>;
  evidenceIntegrityScore: number; // 0 to 100
}
