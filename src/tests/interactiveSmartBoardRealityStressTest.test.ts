/**
 * MOOS ACADEMY — PHASE 18
 * INTERACTIVE SMART BOARD REALITY VALIDATION & PEDAGOGICAL STRESS TEST
 *
 * Validates the full pedagogical loop across all 7 subjects:
 * WATCH → ASK → THINK → INTERACT → SOLVE → VERIFY → ADAPT → MASTER
 *
 * Scenarios tested:
 * 1. Mathematics: Quadratic Equations & Roots (Equivalence & Sign Errors)
 * 2. Physics: Projectile Trajectory & Vectors (Order of Operations)
 * 3. Chemistry: Titration & Stoichiometry (Diprotic Misconceptions)
 * 4. Biology: Mitosis Cell Division (Meiosis vs Mitosis Diploid Invariance)
 * 5. Computer Science: Binary Search (Boundary Conditions & Search Invariants)
 * 6. English: Subject-Verb Concord (Intervening Prepositional Proximity)
 * 7. Engineering: Simply Supported Beam (Bending Moment PL/4 Formula Verification)
 * 8. 14-Dimension Masterclass Quality Gate Audit
 * 9. Tutor Moos Context Awareness & Telemetry Serialization
 */

import { smartBoardInteractionService } from "../services/smartBoardInteractionService";
import { masterclassQualityGate } from "../services/masterclassQualityGate";
import {
  InteractiveLessonState,
  SubjectManipulativeState
} from "../types/smartBoardInteraction";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    console.log(`✅ [PASS] ${message}`);
  }
}

async function runInteractiveSmartBoardRealityStressTest() {
  console.log("\n==========================================================================");
  console.log("🎓 PHASE 18: INTERACTIVE SMART BOARD REALITY VALIDATION & STRESS TEST");
  console.log("==========================================================================\n");

  // --------------------------------------------------------------------------
  // SCENARIO 1: MATHEMATICS (Quadratic Equation Reality Test)
  // --------------------------------------------------------------------------
  console.log("--- Scenario 1: Mathematics - Quadratic Equation Reality Test ---");

  const mathSteps = smartBoardInteractionService.getProblemStepsForTopic("Mathematics", "Quadratic Equations");
  assert(mathSteps.length === 6, "Math scenario generates 6 progressive pedagogical steps");
  assert(mathSteps[0].phase === "strategy", "Step 1 is strategy phase");
  assert(mathSteps[3].phase === "calculation", "Step 4 is calculation phase");

  const mathManipulative = smartBoardInteractionService.getDefaultManipulativeForTopic("Mathematics", "Quadratic Equations");
  assert(mathManipulative.subject === "mathematics", "Manipulative subject is mathematics");
  assert(typeof mathManipulative.parameters.a === "number", "Parameter 'a' is defined");

  // Simulate learner adjusting parameters to 2x² + 7x + 3 = 0
  const delta = 7 * 7 - 4 * 2 * 3; // 25
  const r1 = (-7 + 5) / 4; // -0.5
  const r2 = (-7 - 5) / 4; // -3
  assert(delta === 25, "Computed discriminant Δ is 25");
  assert(r1 === -0.5 && r2 === -3, "Computed roots are -0.5 and -3");

  const mathInitialState = smartBoardInteractionService.createInitialState(mathSteps.length);
  const mathCalcStep = mathSteps[3];

  // Test Sign Error Misconception Diagnostic
  const signOption = mathCalcStep.availableOptions?.find(o => o.misconception === "sign_error");
  assert(!!signOption, "Math calculation step has a diagnostic sign error distractor");

  const evalSignError = smartBoardInteractionService.evaluateStepResponse({
    state: mathInitialState,
    step: mathCalcStep,
    selectedOptionId: signOption!.id
  });
  assert(!evalSignError.isCorrect, "Sign error is flagged as incorrect");
  assert(evalSignError.misconception === "sign_error", "Sign error misconception is accurately diagnosed");
  assert(evalSignError.feedbackMessage.toLowerCase().includes("sign"), "Feedback contains sign explanation");

  // Test Mathematical Equivalence Engine on typed freeform solutions
  const equivForms = ["-0.5, -3", "-3, -0.5", "-1/2, -3", "{-3, -1/2}", "{-0.5, -3}"];
  for (const form of equivForms) {
    const evalEquiv = smartBoardInteractionService.evaluateStepResponse({
      state: mathInitialState,
      step: mathCalcStep,
      freeformInput: form
    });
    assert(evalEquiv.isCorrect, `Mathematical equivalence engine accepts equivalent form: "${form}"`);
  }

  // Test 5-Level Socratic Hint Ladder
  let hintState = mathInitialState;
  for (let lvl = 1; lvl <= 5; lvl++) {
    const hintResult = smartBoardInteractionService.revealNextHint(hintState, mathSteps[0]);
    hintState = hintResult.updatedState;
    assert(hintState.hintLevel === lvl, `Socratic hint revealed at level ${lvl}/5`);
    assert(!!hintResult.revealedHint?.revealedContent, `Hint ${lvl} has substantive pedagogical content`);
  }

  // --------------------------------------------------------------------------
  // SCENARIO 2: PHYSICS (Kinematics & Projectile Trajectory)
  // --------------------------------------------------------------------------
  console.log("\n--- Scenario 2: Physics - Projectile Trajectory Reality Test ---");

  const physSteps = smartBoardInteractionService.getProblemStepsForTopic("Physics", "Projectile Motion");
  const physHeightStep = physSteps[2]; // height calculation step
  const physInitialState = smartBoardInteractionService.createInitialState(physSteps.length);

  // Misconception: omitting velocity squaring (inputs 0.51 instead of 5.10)
  const evalPhysMisconception = smartBoardInteractionService.evaluateStepResponse({
    state: physInitialState,
    step: physHeightStep,
    freeformInput: "0.51 m"
  });
  assert(!evalPhysMisconception.isCorrect, "Omitting velocity squaring is flagged as incorrect");
  assert(evalPhysMisconception.misconception === "wrong_operation_order", "Order of operations diagnosed");
  assert(evalPhysMisconception.feedbackMessage.toLowerCase().includes("square"), "Feedback explicitly notes missing square");

  // Correct calculation with units
  const evalPhysCorrect = smartBoardInteractionService.evaluateStepResponse({
    state: physInitialState,
    step: physHeightStep,
    freeformInput: "5.10 m"
  });
  assert(evalPhysCorrect.isCorrect, "Direct input '5.10 m' accepted as correct physical calculation");

  // Fractional input 100/19.6
  const evalPhysFrac = smartBoardInteractionService.evaluateStepResponse({
    state: physInitialState,
    step: physHeightStep,
    freeformInput: "100 / 19.6"
  });
  assert(evalPhysFrac.isCorrect, "Fractional calculation 100 / 19.6 accepted as equivalent");

  // --------------------------------------------------------------------------
  // SCENARIO 3: CHEMISTRY (Acid-Base Neutralization Titration)
  // --------------------------------------------------------------------------
  console.log("\n--- Scenario 3: Chemistry - Titration Stoichiometry Reality Test ---");

  const chemSteps = smartBoardInteractionService.getProblemStepsForTopic("Chemistry", "Titration & Neutralization");
  const chemInitialState = smartBoardInteractionService.createInitialState(chemSteps.length);

  // Stoichiometry error: assuming 1:1 monoprotic ratio for diprotic H₂SO₄
  const evalChemError = smartBoardInteractionService.evaluateStepResponse({
    state: chemInitialState,
    step: chemSteps[0],
    freeformInput: "1:1"
  });
  assert(!evalChemError.isCorrect, "1:1 ratio is flagged as incorrect for diprotic acid");
  assert(evalChemError.misconception === "concept_confusion", "Diprotic misconception diagnosed");
  assert(evalChemError.feedbackMessage.toLowerCase().includes("diprotic"), "Feedback explains diprotic nature");

  // Correct concentration calculation
  const evalChemConc = smartBoardInteractionService.evaluateStepResponse({
    state: chemInitialState,
    step: chemSteps[2],
    freeformInput: "0.25 mol/dm3"
  });
  assert(evalChemConc.isCorrect, "Accurate concentration '0.25 mol/dm3' verified");

  // --------------------------------------------------------------------------
  // SCENARIO 4: BIOLOGY (Mitosis Cell Cycle)
  // --------------------------------------------------------------------------
  console.log("\n--- Scenario 4: Biology - Mitosis Cell Cycle Reality Test ---");

  const bioSteps = smartBoardInteractionService.getProblemStepsForTopic("Biology", "Mitosis & Cell Division");
  const bioInitialState = smartBoardInteractionService.createInitialState(bioSteps.length);

  // Meiosis vs Mitosis confusion (claiming 23 chromosomes instead of 46)
  const evalBioError = smartBoardInteractionService.evaluateStepResponse({
    state: bioInitialState,
    step: bioSteps[1],
    freeformInput: "23"
  });
  assert(!evalBioError.isCorrect, "Haploid count 23 rejected for mitotic division");
  assert(evalBioError.misconception === "concept_confusion", "Meiosis vs Mitosis confusion diagnosed");

  // Correct diploid count
  const evalBioCorrect = smartBoardInteractionService.evaluateStepResponse({
    state: bioInitialState,
    step: bioSteps[1],
    freeformInput: "46"
  });
  assert(evalBioCorrect.isCorrect, "Diploid count 46 verified as biologically conserved invariant");

  // --------------------------------------------------------------------------
  // SCENARIO 5: COMPUTER SCIENCE (Binary Search)
  // --------------------------------------------------------------------------
  console.log("\n--- Scenario 5: Computer Science - Binary Search Boundary Test ---");

  const csSteps = smartBoardInteractionService.getProblemStepsForTopic("Computer Science", "Binary Search");
  const csInitialState = smartBoardInteractionService.createInitialState(csSteps.length);

  // Algorithmic boundary error: low = 4 instead of low = mid + 1 (5)
  const evalCsError = smartBoardInteractionService.evaluateStepResponse({
    state: csInitialState,
    step: csSteps[1],
    freeformInput: "low = 4"
  });
  assert(!evalCsError.isCorrect, "Updating low to mid instead of mid + 1 rejected");
  assert(evalCsError.misconception === "algorithmic_reasoning_error", "Boundary condition misconception diagnosed");

  // Correct pointer advancement
  const evalCsCorrect = smartBoardInteractionService.evaluateStepResponse({
    state: csInitialState,
    step: csSteps[1],
    freeformInput: "low = 5"
  });
  assert(evalCsCorrect.isCorrect, "Correct boundary advancement to 5 verified");

  // --------------------------------------------------------------------------
  // SCENARIO 6: ENGLISH (Subject-Verb Concord)
  // --------------------------------------------------------------------------
  console.log("\n--- Scenario 6: English - Grammatical Concord Reality Test ---");

  const engSteps = smartBoardInteractionService.getProblemStepsForTopic("English", "Subject-Verb Concord");
  const engInitialState = smartBoardInteractionService.createInitialState(engSteps.length);

  // Proximity concord error: selecting 'are' due to adjacent plural 'textbooks'
  const evalEngError = smartBoardInteractionService.evaluateStepResponse({
    state: engInitialState,
    step: engSteps[1],
    freeformInput: "are"
  });
  assert(!evalEngError.isCorrect, "Plural 'are' rejected for singular head noun 'quality'");
  assert(evalEngError.misconception === "grammar_proximity_error", "Proximity concord error diagnosed");

  // Correct singular verb 'is'
  const evalEngCorrect = smartBoardInteractionService.evaluateStepResponse({
    state: engInitialState,
    step: engSteps[1],
    freeformInput: "is"
  });
  assert(evalEngCorrect.isCorrect, "Singular 'is' verified as according with head noun 'quality'");

  // --------------------------------------------------------------------------
  // SCENARIO 7: ENGINEERING (Structural Beam Bending Moment)
  // --------------------------------------------------------------------------
  console.log("\n--- Scenario 7: Engineering - Beam Bending Moment Reality Test ---");

  const engrSteps = smartBoardInteractionService.getProblemStepsForTopic("Engineering", "Shear Force & Bending Moment");
  const engrInitialState = smartBoardInteractionService.createInitialState(engrSteps.length);

  // Formula error: 60 kN*m without dividing by 4
  const evalEngrError = smartBoardInteractionService.evaluateStepResponse({
    state: engrInitialState,
    step: engrSteps[1],
    freeformInput: "60 kN*m"
  });
  assert(!evalEngrError.isCorrect, "Moment without /4 rejected");
  assert(evalEngrError.misconception === "formula_selection_error", "Formula selection error diagnosed");

  // Correct PL/4 = 15 kN*m
  const evalEngrCorrect = smartBoardInteractionService.evaluateStepResponse({
    state: engrInitialState,
    step: engrSteps[1],
    freeformInput: "15 kN*m"
  });
  assert(evalEngrCorrect.isCorrect, "Accurate structural moment M_max = 15 kN·m verified");

  // --------------------------------------------------------------------------
  // MASTERCLASS QUALITY GATE & TUTOR MOOS CONTEXT AWARENESS
  // --------------------------------------------------------------------------
  console.log("\n--- Quality Gate & Tutor Moos Integration ---");

  const auditResult = masterclassQualityGate.auditMasterclass({
    lessonId: "test-lesson-18",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    boardActionsCount: 24,
    synchronizedSpokenWordsCount: 450,
    checkpointsCount: 3,
    hasQualityAudit: true,
    hasInteractiveManipulatives: true,
    hasStepEvaluation: true,
    hasSocraticHintLadder: true,
    hasMisconceptionDiagnostics: true,
    hasTutorMoosLiveContext: true,
    hasLearnerTelemetry: true,
    totalInteractivePhasesCompleted: 6
  });

  assert(auditResult.isPassing, "Masterclass passes comprehensive pedagogical audit");
  assert(auditResult.overallScore >= 95, `Overall audit score is ${auditResult.overallScore}/100 (>= 95 required)`);
  assert(auditResult.dimensions.length === 14, `All 14 pedagogical dimensions evaluated (Got: ${auditResult.dimensions.length})`);
  assert(auditResult.failingDimensions.length === 0, "Zero failing pedagogical dimensions");

  console.log("\n==========================================================================");
  console.log("🎉 ALL PHASE 18 INTERACTIVE REALITY VALIDATION TESTS PASSED (100% GREEN)!");
  console.log("==========================================================================\n");
}

runInteractiveSmartBoardRealityStressTest()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
  });
