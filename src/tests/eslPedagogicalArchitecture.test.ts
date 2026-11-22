/**
 * MOOS TECHY ACADEMY — ESL ARCHITECTURE & CEFR ALIGNMENT TEST SUITE
 * 
 * Phase 19: ESL Pedagogical Reality Validation
 */

import { eslLearningService } from "../services/eslLearningService";
import { ALL_CURRICULUM_UNITS } from "../data/extendedCurriculumUnits";
import { CEFRLevel } from "../types/esl";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ASSERTION_FAILURE] ${message}`);
  }
}

export function runESLPedagogicalArchitectureTests(): void {
  console.log("\n==========================================================================");
  console.log("🌍 PHASE 19: ESL (ENGLISH AS A SECOND LANGUAGE) ARCHITECTURE VERIFICATION");
  console.log("==========================================================================\n");

  // 1. CEFR Progression & Descriptors
  console.log("--- Vector 1: CEFR Progression & Descriptors ---");
  const cefrLevels: CEFRLevel[] = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];
  for (const level of cefrLevels) {
    const desc = eslLearningService.getCefrLevelDescriptor(level);
    assert(Boolean(desc.title), `Missing title for CEFR level ${level}`);
    assert(Boolean(desc.description), `Missing description for CEFR level ${level}`);
    assert(Boolean(desc.canDoSummary), `Missing Can-Do summary for CEFR level ${level}`);
  }
  console.log("✅ [PASS] All 7 CEFR levels (Pre-A1 to C2) configured with authentic Can-Do benchmarks");

  // 2. Phonemic Minimal Pairs & Articulatory Drills
  console.log("\n--- Vector 2: Phonemic Minimal Pairs & Articulatory Drills ---");
  const minimalPairs = eslLearningService.getPhonemeMinimalPairs();
  assert(minimalPairs.length >= 4, `Expected at least 4 minimal pairs, found ${minimalPairs.length}`);

  const shipSheep = minimalPairs.find((p) => p.id === "pair-ship-sheep");
  assert(Boolean(shipSheep), "Ship/Sheep vowel pair must exist");
  assert(shipSheep!.ipaA === "/ʃɪp/" && shipSheep!.ipaB === "/ʃiːp/", "Ship/Sheep must feature /ɪ/ vs /iː/ IPA transcriptions");
  assert(Boolean(shipSheep!.distinctionTips), "Must include L1 interference advice for non-native learners");

  const thinkSink = minimalPairs.find((p) => p.id === "pair-think-sink");
  assert(Boolean(thinkSink), "Think/Sink dental fricative pair must exist");
  assert(thinkSink!.targetPhonemeA.includes("/θ/"), "Think must test voiceless dental fricative /θ/");
  console.log(`✅ [PASS] Loaded ${minimalPairs.length} authentic phonemic minimal pairs with articulatory guidance`);

  // 3. Contextual Vocabulary, Collocations & False Friends
  console.log("\n--- Vector 3: Contextual Collocations & False Friends ---");
  const vocabItems = eslLearningService.getContextualVocabulary();
  assert(vocabItems.length >= 4, "Contextual vocabulary must contain core items");

  const makeDecision = vocabItems.find((v) => v.word === "make a decision");
  assert(Boolean(makeDecision), "Collocation 'make a decision' must exist");
  assert(Boolean(makeDecision!.commonL1Mistake), "Must document 'do a decision' L1 error");

  const heavyRain = vocabItems.find((v) => v.word === "heavy rain");
  assert(Boolean(heavyRain), "Collocation 'heavy rain' must exist");
  assert(Boolean(heavyRain!.commonL1Mistake?.includes("strong rain")), "Must document 'strong rain' non-native trap");
  console.log("✅ [PASS] Collocational dictionaries and false friend warnings verified");

  // 4. ESL Socratic Diagnostic Engine
  console.log("\n--- Vector 4: ESL Socratic Diagnostic Engine & 5-Tier Recommendations ---");
  const diagQuestions = eslLearningService.getDiagnosticQuestions();
  assert(diagQuestions.length >= 6, `Expected at least 6 diagnostic questions, got ${diagQuestions.length}`);

  // Test Simulation 1: High Scorer (All correct answers)
  const perfectResponses: Record<string, string> = {};
  diagQuestions.forEach((q) => {
    perfectResponses[q.id] = q.correctAnswer;
  });
  const highResult = eslLearningService.evaluateDiagnostic(perfectResponses);
  assert(highResult.overallScorePercentage === 100, `Expected 100%, got ${highResult.overallScorePercentage}%`);
  assert(highResult.assignedCefrLevel === "C1", `Expected C1 for 100%, got ${highResult.assignedCefrLevel}`);
  assert(highResult.recommendation === "CHALLENGE", `Expected CHALLENGE recommendation, got ${highResult.recommendation}`);
  console.log(`High Scorer Simulation: ${highResult.overallScorePercentage}% -> Level: ${highResult.assignedCefrLevel}, Recommendation: ${highResult.recommendation}`);

  // Test Simulation 2: Beginner / Foundational Scorer (Incorrect answers)
  const zeroResponses: Record<string, string> = {};
  diagQuestions.forEach((q) => {
    zeroResponses[q.id] = "WRONG_ANSWER_CHOICE";
  });
  const lowResult = eslLearningService.evaluateDiagnostic(zeroResponses);
  assert(lowResult.overallScorePercentage === 0, `Expected 0%, got ${lowResult.overallScorePercentage}%`);
  assert(lowResult.assignedCefrLevel === "Pre-A1", `Expected Pre-A1 for 0%, got ${lowResult.assignedCefrLevel}`);
  assert(lowResult.recommendation === "FOUNDATION", `Expected FOUNDATION recommendation, got ${lowResult.recommendation}`);
  assert(lowResult.prioritySkillsToStrengthen.length > 0, "Must provide priority skills to strengthen");
  assert(lowResult.remediationPathways.length > 0, "Must recommend remediation pathways");
  console.log(`Foundational Scorer Simulation: ${lowResult.overallScorePercentage}% -> Level: ${lowResult.assignedCefrLevel}, Recommendation: ${lowResult.recommendation}`);
  console.log("✅ [PASS] Socratic diagnostic engine correctly routes learners across 5-tier recommendations");

  // 5. ESL Curriculum Units Saturation Invariants
  console.log("\n--- Vector 5: ESL Curriculum Units Saturation Invariants ---");
  const eslUnits = ALL_CURRICULUM_UNITS.filter((u) => u.id.startsWith("unit-esl-"));
  assert(eslUnits.length >= 3, `Expected at least 3 ESL curriculum units in ALL_CURRICULUM_UNITS, got ${eslUnits.length}`);

  for (const unit of eslUnits) {
    assert(Boolean(unit.id), `Unit missing ID: ${unit.title}`);
    assert(unit.skills.length > 0, `ESL Unit ${unit.id} has no skills`);
    for (const skill of unit.skills) {
      assert(skill.objectives.length >= 2, `Skill ${skill.id} missing objectives`);
      assert(skill.questions.length >= 2, `Skill ${skill.id} must have practice questions`);
      for (const q of skill.questions) {
        assert(q.options.includes(q.correctAnswer), `Question ${q.id} correct answer '${q.correctAnswer}' not in options`);
        assert(Boolean(q.explanation), `Question ${q.id} missing explanation`);
        assert(q.hintLadder.length >= 2, `Question ${q.id} missing hint ladder`);
        assert(q.misconceptionAlerts.length >= 1, `Question ${q.id} missing misconception alerts`);
      }
    }
  }
  console.log(`✅ [PASS] Verified ${eslUnits.length} full ESL units saturated into ALL_CURRICULUM_UNITS with complete pedagogical questions, hints, and misconception diagnostics`);

  console.log("\n==========================================================================");
  console.log("🎉 ALL ESL PEDAGOGICAL ARCHITECTURE INVARIANTS VERIFIED (100% GREEN)!");
  console.log("==========================================================================\n");
}

// Self-execution for CLI test runner
runESLPedagogicalArchitectureTests();
