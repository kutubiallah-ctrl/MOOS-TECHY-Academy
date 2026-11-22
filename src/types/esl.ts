/**
 * MOOS TECHY ACADEMY — ENGLISH AS A SECOND LANGUAGE (ESL) ARCHITECTURE
 * 
 * Phase 19: ESL Domain, CEFR Progression, Diagnostics & Core Skills
 */

export type CEFRLevel = "Pre-A1" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type ESLDomain =
  | "listening"
  | "speaking"
  | "pronunciation"
  | "vocabulary"
  | "grammar"
  | "reading"
  | "writing"
  | "functional"
  | "academic"
  | "workplace"
  | "exam_prep";

export type ESLRecommendation =
  | "FOUNDATION"
  | "PRACTICE"
  | "REMEDIATION"
  | "PROGRESSION"
  | "CHALLENGE";

export interface PhonemeMinimalPair {
  id: string;
  targetPhonemeA: string;
  targetPhonemeB: string;
  wordA: string;
  wordB: string;
  ipaA: string;
  ipaB: string;
  sentenceA: string;
  sentenceB: string;
  audioHint: string;
  distinctionTips: string;
}

export interface ContextualVocabularyItem {
  id: string;
  word: string;
  cefrLevel: CEFRLevel;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "preposition" | "phrasal_verb" | "idiom";
  definition: string;
  exampleSentence: string;
  collocations: string[];
  falseFriendsAlert?: string;
  commonL1Mistake?: string;
  frequencyBand: "Top 500" | "Top 1000" | "Top 3000" | "Academic Word List (AWL)";
}

export interface ESLListeningModule {
  id: string;
  title: string;
  cefrLevel: CEFRLevel;
  context: string;
  audioScript: string;
  speakers: { name: string; role: string; accent: string }[];
  questions: {
    id: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    listeningSkillTested: "main_idea" | "detail" | "inference" | "speaker_attitude";
  }[];
}

export interface ESLSpeakingModule {
  id: string;
  title: string;
  cefrLevel: CEFRLevel;
  scenario: string;
  prompt: string;
  usefulPhrases: string[];
  modelResponse: string;
  rubric: {
    fluencyAndCoherence: string;
    lexicalResource: string;
    grammaticalRange: string;
    pronunciationAccuracy: string;
  };
}

export interface ESLReadingPassage {
  id: string;
  title: string;
  cefrLevel: CEFRLevel;
  theme: "everyday" | "cultural" | "academic" | "science_discovery" | "workplace";
  text: string;
  wordCount: number;
  glossary: { word: string; meaning: string; partOfSpeech: string }[];
  comprehensionQuestions: {
    id: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    targetSkill: "skimming" | "scanning" | "inference" | "vocabulary_in_context";
  }[];
}

export interface ESLWritingTask {
  id: string;
  title: string;
  cefrLevel: CEFRLevel;
  taskType: "sentence_building" | "informal_email" | "formal_request" | "opinion_paragraph" | "academic_essay";
  instructions: string;
  modelAnswer: string;
  scaffoldingSteps: string[];
  grammarFocus: string[];
  rubricCriteria: {
    taskAchievement: string;
    cohesionAndCoherence: string;
    vocabularyRange: string;
    grammaticalAccuracy: string;
  };
}

export interface ESLDiagnosticQuestion {
  id: string;
  domain: ESLDomain;
  targetCefr: CEFRLevel;
  prompt: string;
  audioScript?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  diagnosticFocus: string;
}

export interface ESLDiagnosticAssessmentResult {
  learnerId: string;
  evaluatedAt: string;
  overallScorePercentage: number;
  assignedCefrLevel: CEFRLevel;
  recommendation: ESLRecommendation;
  domainProficiencies: Record<ESLDomain, { scorePercentage: number; cefrLevel: CEFRLevel }>;
  recommendedStartingUnitId: string;
  prioritySkillsToStrengthen: string[];
  remediationPathways: string[];
  pedagogicalRationale: string;
}
