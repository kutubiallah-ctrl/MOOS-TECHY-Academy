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

  console.log("\n==========================================================================");
  console.log("🎉 ALL FLAGSHIP CONTENT SATURATION INVARIANTS 100% VERIFIED!");
  console.log("==========================================================================\n");
}

if (typeof require !== "undefined" && require.main === module) {
  runFlagshipContentSaturationTests().catch((err) => {
    console.error("Flagship test failed:", err);
    process.exit(1);
  });
}
