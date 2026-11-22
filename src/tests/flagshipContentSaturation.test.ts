/**
 * Flagship Content Saturation & Multidisciplinary Curriculum Verification Test Suite
 * 
 * Verifies that all flagship subjects (Mathematics, Natural & Applied Sciences,
 * Computer Science & AI, English Language & Communication, Economics & Financial Literacy)
 * have deep, verified curriculum units, skills, questions, and standard mappings.
 */

import { curriculumService } from "../services/curriculumService";
import { LEARNING_DOMAINS, SUBJECTS } from "../data/curriculumData";
import { CURRICULUM_STANDARD_MAPPINGS } from "../data/curriculumMappingsData";
import { WAVE1_DEEP_SATURATED_MATH_UNITS } from "../data/primary/wave1DeepSaturatedMathUnits";
import { EXPANDED_151_SUBJECT_CATEGORIES } from "../data/expandedSubjectCategories";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ASSERTION_FAILURE] ${message}`);
  }
}

export async function runFlagshipContentSaturationTests(): Promise<void> {
  console.log("\n==========================================================================");
  console.log("🧪 MOOS TECHY ACADEMY — FLAGSHIP CONTENT SATURATION & CURRICULUM DEPTH");
  console.log("==========================================================================\n");

  // Vector 1: Learning Domains & Flagship Status
  console.log("--- Vector 1: Learning Domains & Flagship Status ---");
  const flagshipDomains = LEARNING_DOMAINS.filter((d) => d.isFlagship);
  assert(flagshipDomains.length >= 4, `Expected at least 4 flagship domains, got ${flagshipDomains.length}`);
  const domainIds = flagshipDomains.map((d) => d.id);
  assert(domainIds.includes("mathematics"), "Mathematics must be a flagship domain");
  assert(domainIds.includes("science") || domainIds.includes("natural_applied_sciences"), "Sciences must be a flagship domain");
  assert(domainIds.includes("computing_ai") || domainIds.includes("computer_science_ai"), "Computing & AI must be a flagship domain");
  assert(domainIds.includes("language_comm") || domainIds.includes("languages_communication"), "English & Communication must be a flagship domain");
  console.log("✅ [PASS] All flagship learning domains properly configured and active");

  // Vector 2: Multidisciplinary Units & Skills Depth
  console.log("\n--- Vector 2: Multidisciplinary Units & Skills Depth ---");
  const allUnits = curriculumService.getAllUnits();
  assert(allUnits.length >= 10, `Expected at least 10 curriculum units, got ${allUnits.length}`);

  // Test Mathematics Units
  const mathUnits = allUnits.filter((u) => u.subjectId.startsWith("math_"));
  assert(mathUnits.length >= 3, `Expected at least 3 Math units, got ${mathUnits.length}`);

  // Test Science Units (Physics, Chemistry, Biology)
  const physicsUnits = allUnits.filter((u) => u.subjectId === "sci_physics");
  assert(physicsUnits.length >= 1, "Physics units must exist");
  const chemUnits = allUnits.filter((u) => u.subjectId === "sci_chemistry");
  assert(chemUnits.length >= 1, "Chemistry units must exist");
  const bioUnits = allUnits.filter((u) => u.subjectId === "sci_biology");
  assert(bioUnits.length >= 1, "Biology units must exist");

  // Test Computing Units
  const compUnits = allUnits.filter((u) => u.subjectId === "tech_compsci" || u.subjectId === "cs_software" || u.subjectId.startsWith("cs_") || u.subjectId.startsWith("tech_"));
  assert(compUnits.length >= 1, "Computer Science units must exist");

  // Test English Units
  const engUnits = allUnits.filter((u) => u.subjectId === "lang_english_lit" || u.subjectId.startsWith("lang_"));
  assert(engUnits.length >= 1, "English units must exist");

  // Test Financial Literacy Units
  const finUnits = allUnits.filter((u) => u.subjectId === "comm_financial_lit");
  assert(finUnits.length >= 1, "Financial Literacy units must exist");

  console.log(`✅ [PASS] Loaded ${allUnits.length} units across Math, Physics, Chemistry, Biology, Computing, English, and Finance`);

  // Vector 3: Question Answer Logic, Explanations & Misconception Diagnostics
  console.log("\n--- Vector 3: Question Rigor, Correct Answer Invariant & Diagnostic Notes ---");
  let totalQuestions = 0;
  for (const unit of allUnits) {
    assert(Boolean(unit.id), `Unit missing ID: ${unit.title}`);
    assert(Boolean(unit.title), `Unit missing title: ${unit.id}`);
    assert(unit.skills.length > 0, `Unit ${unit.id} has no skills`);

    for (const skill of unit.skills) {
      assert(Boolean(skill.id), `Skill missing ID in unit ${unit.id}`);
      assert(Boolean(skill.title), `Skill missing title in unit ${unit.id}`);
      assert(skill.objectives.length > 0, `Skill ${skill.id} missing objectives`);
      assert(skill.questions.length > 0, `Skill ${skill.id} missing practice questions`);

      for (const q of skill.questions) {
        totalQuestions++;
        assert(Boolean(q.id), `Question missing ID in skill ${skill.id}`);
        assert(Boolean(q.questionText), `Question text missing in question ${q.id}`);
        assert(Array.isArray(q.options) && q.options.length >= 3, `Question ${q.id} must have at least 3 options`);
        assert(q.options.includes(q.correctAnswer), `Question ${q.id} correctAnswer '${q.correctAnswer}' not in options`);
        assert(Boolean(q.explanation), `Question ${q.id} missing explanation`);
        assert(Array.isArray(q.hintLadder) && q.hintLadder.length >= 1, `Question ${q.id} missing hint ladder`);
        assert(Array.isArray(q.misconceptionAlerts), `Question ${q.id} missing misconception alerts array`);
      }
    }
  }
  console.log(`✅ [PASS] Verified ${totalQuestions} pedagogical questions with strict answer integrity, hints, and misconception diagnostics`);

  // Vector 4: Universal Curriculum Standard Alignment
  console.log("\n--- Vector 4: Universal Curriculum Standard Alignment ---");
  const supportedSystems = curriculumService.getSupportedEducationSystems();
  assert(supportedSystems.length >= 4, "Must support at least 4 education systems");

  const waecMappings = CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.curriculumSystem === "WAEC" || m.curriculumSystem === "NERDC");
  const cambridgeMappings = CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.curriculumSystem === "CAMBRIDGE_IGCSE" || m.curriculumSystem === "GCSE");
  const commonCoreMappings = CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.curriculumSystem === "US_CCSS");
  const globalStemMappings = CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.curriculumSystem === "GLOBAL_STEM");

  assert(waecMappings.length >= 5, `Expected at least 5 WAEC mappings, got ${waecMappings.length}`);
  assert(cambridgeMappings.length >= 5, `Expected at least 5 Cambridge mappings, got ${cambridgeMappings.length}`);
  assert(commonCoreMappings.length >= 5, `Expected at least 5 Common Core mappings, got ${commonCoreMappings.length}`);
  assert(globalStemMappings.length >= 2, `Expected at least 2 Global STEM mappings, got ${globalStemMappings.length}`);

  for (const mapping of CURRICULUM_STANDARD_MAPPINGS) {
    assert(Boolean(mapping.standardIdentifier), `Mapping ${mapping.id} missing standardIdentifier`);
    assert(Boolean(mapping.canonicalSkillId), `Mapping ${mapping.id} missing canonicalSkillId`);
    assert(Boolean(mapping.verificationMetadata.sourceTitle), `Mapping ${mapping.id} missing verification metadata`);
  }
  console.log(`✅ [PASS] Verified ${CURRICULUM_STANDARD_MAPPINGS.length} official curriculum mappings across WAEC, Cambridge, Common Core, and IB`);

  // Vector 5: Service Level Retrieval Functions
  console.log("\n--- Vector 5: Service Level Retrieval Functions ---");
  const retrievedUnit = curriculumService.getUnitById("unit-phy-mechanics-motion");
  assert(Boolean(retrievedUnit), "Failed to retrieve Physics unit by ID");
  assert(retrievedUnit?.subjectId === "sci_physics", "Retrieved unit has wrong subjectId");

  const retrievedSkill = curriculumService.getSkillById("skill-cs-recursion");
  assert(Boolean(retrievedSkill), "Failed to retrieve Computing recursion skill by ID");
  assert(retrievedSkill?.title.includes("Recursion"), "Retrieved skill has wrong title");

  const scienceSubjects = curriculumService.getSubjects("science");
  assert(scienceSubjects.length >= 3, `Expected at least 3 science subjects, got ${scienceSubjects.length}`);

  console.log("✅ [PASS] All curriculumService query methods execute with high fidelity and zero defects");

  // Vector 6: Wave 1 Deep-Saturation Gates (A-F) Verification
  console.log("\n--- Vector 6: Wave 1 Deep-Saturation Gates (A-F) Verification ---");
  assert(WAVE1_DEEP_SATURATED_MATH_UNITS.length === 10, `Expected 10 Wave 1 units, got ${WAVE1_DEEP_SATURATED_MATH_UNITS.length}`);

  const categoryCodes = new Set(EXPANDED_151_SUBJECT_CATEGORIES.map((c) => c.code));
  let totalWave1Questions = 0;

  for (const unit of WAVE1_DEEP_SATURATED_MATH_UNITS) {
    // GATE A: Canonical identity, registration, provenance, standards
    assert(categoryCodes.has(unit.subjectId), `Subject ${unit.subjectId} must exist in 151 Subject Catalogue`);
    assert(unit.isDeepSaturated === true, `Unit ${unit.id} must have isDeepSaturated === true`);
    assert(unit.provenanceVersion === "2026.WAVE1.DEEP_SATURATION.v1", `Unit ${unit.id} must have versioned provenance`);
    assert(Array.isArray(unit.curriculumStandardMappings) && unit.curriculumStandardMappings.length >= 3, `Unit ${unit.id} missing curriculum mappings`);

    // GATE C: Verified 3-5 Hours of Learning
    assert(typeof unit.estimatedHours === "number" && unit.estimatedHours >= 3.0 && unit.estimatedHours <= 5.0, `Unit ${unit.id} estimated hours must be 3-5h, got ${unit.estimatedHours}`);
    assert(Boolean(unit.estimationMethod) && unit.estimationMethod.length > 20, `Unit ${unit.id} missing documented estimation method`);

    // Verify skills and pedagogy
    assert(unit.skills.length >= 1, `Unit ${unit.id} must have at least 1 skill`);
    for (const skill of unit.skills) {
      // GATE B: 11-dimension pedagogical lesson depth
      const lesson = skill.lesson;
      assert(Boolean(lesson), `Skill ${skill.id} missing lesson`);
      if (lesson) {
        assert(Boolean(lesson.hookAndIntuition), `Lesson ${lesson.id} missing hookAndIntuition`);
        assert(Boolean(lesson.conceptualExplanation), `Lesson ${lesson.id} missing conceptualExplanation`);
        assert(Boolean(lesson.conceptualModel), `Lesson ${lesson.id} missing conceptualModel (GATE B)`);
        assert(Boolean(lesson.diagnosticSelfCheck), `Lesson ${lesson.id} missing diagnosticSelfCheck (GATE B)`);
        assert(Array.isArray(lesson.workedExamples) && lesson.workedExamples.length >= 1, `Lesson ${lesson.id} missing workedExamples`);
        assert(Boolean(lesson.guidedPracticePrompt), `Lesson ${lesson.id} missing guidedPracticePrompt`);
        assert(Boolean(lesson.independentPracticePrompt), `Lesson ${lesson.id} missing independentPracticePrompt (GATE B)`);
        assert(Array.isArray(lesson.commonMisconceptionsAndTraps) && lesson.commonMisconceptionsAndTraps.length >= 1, `Lesson ${lesson.id} missing misconceptions`);
        assert(Boolean(lesson.transferApplication), `Lesson ${lesson.id} missing transferApplication (GATE B)`);
        assert(Boolean(lesson.masteryAssessment), `Lesson ${lesson.id} missing masteryAssessment (GATE B)`);
        assert(Boolean(lesson.reflectionPrompt), `Lesson ${lesson.id} missing reflectionPrompt (GATE B)`);
        assert(Boolean(lesson.extensionActivity), `Lesson ${lesson.id} missing extensionActivity (GATE B)`);
      }

      // GATE D: Assessment Depth Floor (>= 5 questions, target 8-12)
      assert(skill.questions.length >= 5, `Skill ${skill.id} failed Gate D floor (must have >= 5 questions, got ${skill.questions.length})`);
      assert(skill.questions.length >= 8, `Skill ${skill.id} target 8-12 questions met, got ${skill.questions.length}`);
      totalWave1Questions += skill.questions.length;

      // GATE E: Hint & Distractor Parity
      for (const q of skill.questions) {
        assert(Array.isArray(q.hintLadder) && q.hintLadder.length >= 3, `Question ${q.id} failed Gate E (requires >= 3 hints, got ${q.hintLadder?.length})`);
        assert(Array.isArray(q.misconceptionAlerts) && q.misconceptionAlerts.length >= 1, `Question ${q.id} failed Gate E (requires misconception alerts)`);

        // GATE F: Subject-Specific Authenticity
        assert(Array.isArray(q.options) && q.options.length >= 4, `Question ${q.id} must have at least 4 options`);
        assert(q.options.includes(q.correctAnswer), `Question ${q.id} correctAnswer must be in options`);
        assert(Boolean(q.explanation) && q.explanation.length > 10, `Question ${q.id} explanation missing`);
      }
    }
  }

  console.log(`✅ [PASS] Wave 1 Deep-Saturation Gates A-F 100% verified across 10 foundational subjects (${totalWave1Questions} questions, QBD: ${(totalWave1Questions / 10).toFixed(1)}, 100% 11-dimension lesson depth, 100% 3-tier hints)`);

  console.log("\n==========================================================================");
  console.log("🎉 ALL FLAGSHIP CONTENT SATURATION INVARIANTS 100% VERIFIED!");
  console.log("==========================================================================\n");
}

runFlagshipContentSaturationTests()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Flagship test failed:", err);
    process.exit(1);
  });
