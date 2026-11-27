/**
 * MOOS ACADEMY — WORKSTREAM 2 & 3 CURRICULUM QUALITY, VISUALIZATION & PROGRESSION SUITE
 *
 * Audits compliance with Strategic Development Directive 003 (Workstreams 2 & 3):
 * 1. Workstream 2 (Zero Isolated Units):
 *    - 100% of ALL_CURRICULUM_UNITS achieve >= 85% QA score, approvedForLearnerProduction === true,
 *      and 0 disqualifiers (0 isolated units across the entire repository).
 *    - Every SVG visualization in VISUALIZATION_REPOSITORY compiles cleanly with valid <svg> roots
 *      and resolves any marker-end="url(#id)" references inside <defs>.
 * 2. Workstream 3 (P1 Math & P3 Science Deep Expansion — 16 New Subjects):
 *    - Every expansion unit achieves qualityScore >= 90, approvedForLearnerProduction === true,
 *      >= 5 questions spanning easy/medium/hard, >= 2 hints per question, >= 2 worked examples
 *      with >= 4 steps, valid prerequisiteSkillIds, and >= 1 labeled SVG diagram.
 *    - Empirical depth metrics verify 300 catalog subjects, 67 published subjects (+16 expansion),
 *      147 authored/published units, and 0 isolated units.
 *    - Curriculum domain routing places P1 Math & Pre-Engineering under mathematics and P3 Agric/Science under science.
 *    - Mathematical answer evaluator and visualization lookup work end-to-end.
 */

import { strict as assert } from "assert";
import {
  ALL_CURRICULUM_UNITS,
  P1_MATH_BATCH1_UNITS,
  P1_MATH_BATCH2_JSS_UNITS,
  P1_MATH_BATCH2_SSS_UNITS_A,
  P1_MATH_BATCH2_SSS_UNITS_B,
  P3_SCIENCE_BATCH3_UNITS_A,
  P3_SCIENCE_BATCH3_UNITS_B,
  P3_SCIENCE_BATCH4_UNITS_A,
  P3_SCIENCE_BATCH4_UNITS_B
} from "../data/extendedCurriculumUnits";
import { P1_MATH_EXPANSION_UNITS } from "../data/p1MathExpansionUnits";
import { P3_SCIENCE_EXPANSION_UNITS } from "../data/p3ScienceExpansionUnits";
import { VISUALIZATION_REPOSITORY } from "../data/visualizationsRepository";
import { SUBJECTS, getDomainIdForCategory } from "../data/curriculumData";
import { contentQualityEngine } from "../services/contentQualityEngine";
import { contentSaturationService } from "../services/contentSaturationService";
import { evaluateMathematicalAnswer } from "../utils/mathEvaluator";
import { APPROVAL_QUALITY_THRESHOLD } from "../types/contentGovernance";

export async function runWorkstream2And3CurriculumSuite(): Promise<{ passed: boolean }> {
  let checksPassed = 0;
  function pass(msg: string) {
    checksPassed++;
    console.log(`  ✅ [PASS] ${msg}`);
  }

  console.log("==========================================================================");
  console.log("🏛️  MOOS ACADEMY — WORKSTREAM 2 & 3 CURRICULUM QA & PROGRESSION SUITE");
  console.log("==========================================================================\n");

  contentQualityEngine.resetForTesting();
  try {
    // -------------------------------------------------------------------------
    // 1. Workstream 2: Full Catalog Audit (Zero Isolated / Zero Disqualified)
    // -------------------------------------------------------------------------
    const records = contentQualityEngine.evaluateAllUnits(ALL_CURRICULUM_UNITS);
    assert.strictEqual(records.length, ALL_CURRICULUM_UNITS.length, "Every unit must be evaluated by QA gate");

    const isolated = records.filter(
      (r) => !r.approvedForLearnerProduction || r.qualityScore < APPROVAL_QUALITY_THRESHOLD
    );
    assert.strictEqual(
      isolated.length,
      0,
      `Expected 0 isolated units below ${APPROVAL_QUALITY_THRESHOLD}%, found: ${isolated
        .map((r) => `${r.unitId}(${r.qualityScore}%)`)
        .join(", ")}`
    );

    const disqualified = records.filter((r) => r.disqualifiers.length > 0);
    assert.strictEqual(
      disqualified.length,
      0,
      `Expected 0 disqualified units, found: ${disqualified
        .map((r) => `${r.unitId}:${r.disqualifiers.map((d) => d.code).join(",")}`)
        .join("; ")}`
    );
    pass(`All ${ALL_CURRICULUM_UNITS.length} units pass QA gate (>= ${APPROVAL_QUALITY_THRESHOLD}%, 0 isolated, 0 disqualified).`);

    // -------------------------------------------------------------------------
    // 2. SVG Integrity Check across VISUALIZATION_REPOSITORY
    // -------------------------------------------------------------------------
    const visEntries = Object.values(VISUALIZATION_REPOSITORY);
    assert.ok(visEntries.length >= 97, `Expected >= 97 visualizations in repository, found ${visEntries.length}`);
    for (const vis of visEntries) {
      assert.ok(vis.caption && vis.caption.trim().length > 10, `Visualization '${vis.id}' requires descriptive caption`);
      if (vis.diagramSvgSnippet) {
        assert.ok(
          vis.diagramSvgSnippet.includes("<svg") && vis.diagramSvgSnippet.includes("</svg>"),
          `Visualization '${vis.id}' must contain well-formed <svg>...</svg> markup`
        );
        const markerMatches = [...vis.diagramSvgSnippet.matchAll(/marker-(?:end|start)="url\(#([^)]+)\)"/g)];
        for (const m of markerMatches) {
          const markerId = m[1];
          assert.ok(
            vis.diagramSvgSnippet.includes(`id="${markerId}"`) || vis.diagramSvgSnippet.includes(`id='${markerId}'`),
            `SVG '${vis.id}' references marker '#${markerId}' without a corresponding <marker id="${markerId}"> definition`
          );
        }
      }
    }
    pass(`Verified ${visEntries.length} visualizations with captions, valid <svg> wrappers, and resolved marker <defs>.`);

    // -------------------------------------------------------------------------
    // 3. Workstream 3 + Directives 004–005 Batches 1–4: Deep Verification & 100% P1
    // -------------------------------------------------------------------------
    const expansionUnits = [
      ...P1_MATH_EXPANSION_UNITS,
      ...P3_SCIENCE_EXPANSION_UNITS,
      ...P1_MATH_BATCH1_UNITS,
      ...P1_MATH_BATCH2_JSS_UNITS,
      ...P1_MATH_BATCH2_SSS_UNITS_A,
      ...P1_MATH_BATCH2_SSS_UNITS_B,
      ...P3_SCIENCE_BATCH3_UNITS_A,
      ...P3_SCIENCE_BATCH3_UNITS_B,
      ...P3_SCIENCE_BATCH4_UNITS_A,
      ...P3_SCIENCE_BATCH4_UNITS_B
    ];
    assert.strictEqual(expansionUnits.length, 65, "Expected 65 expansion/batch units (16 WS3 + 10 Batch 1 + 19 Batch 2 + 10 Batch 3 + 10 Batch 4)");

    const allSkillIds = new Set(ALL_CURRICULUM_UNITS.flatMap((u) => u.skills.map((s) => s.id)));
    const recordMap = new Map(records.map((r) => [r.unitId, r]));

    for (const unit of expansionUnits) {
      const rec = recordMap.get(unit.id);
      assert.ok(rec, `QA record missing for expansion unit '${unit.id}'`);
      assert.ok(rec.qualityScore >= 90, `Expansion unit '${unit.id}' qualityScore (${rec.qualityScore}) must be >= 90`);
      assert.strictEqual(rec.approvedForLearnerProduction, true, `'${unit.id}' must be approved for production`);
      assert.strictEqual(rec.disqualifiers.length, 0, `'${unit.id}' must have 0 disqualifiers`);

      assert.ok(unit.skills.length >= 1, `Expansion unit '${unit.id}' must contain skills`);
      for (const skill of unit.skills) {
        assert.ok(skill.questions.length >= 5, `Skill '${skill.id}' must have >= 5 questions`);
        const difficulties = new Set(skill.questions.map((q) => q.difficulty));
        assert.ok(
          difficulties.has("easy") && difficulties.has("medium") && difficulties.has("hard"),
          `Skill '${skill.id}' must include easy, medium, and hard questions`
        );
        for (const q of skill.questions) {
          assert.ok(q.hintLadder && q.hintLadder.length >= 2, `Question '${q.id}' must include >= 2 hints`);
        }

        const examples = skill.lesson?.workedExamples || [];
        assert.ok(examples.length >= 2, `Skill '${skill.id}' must include >= 2 worked examples`);
        for (const ex of examples) {
          assert.ok(ex.steps.length >= 4, `Worked example '${ex.title}' in '${skill.id}' must have >= 4 steps`);
        }

        for (const prereq of skill.prerequisiteSkillIds || []) {
          assert.ok(allSkillIds.has(prereq), `Skill '${skill.id}' references unknown prerequisiteSkillId '${prereq}'`);
        }

        const vis = contentSaturationService.getVisualizationBySkillId(skill.id);
        assert.ok(vis, `Skill '${skill.id}' must map to a visualization in VISUALIZATION_REPOSITORY`);
        assert.ok(vis.diagramSvgSnippet?.includes("<svg"), `Visualization for '${skill.id}' must contain vector <svg>`);
      }
    }
    const coveredSubjectSet = new Set(ALL_CURRICULUM_UNITS.map((u) => u.subjectId));
    const openPriority1Subjects = SUBJECTS.filter(
      (s) => !coveredSubjectSet.has(s.id) && getDomainIdForCategory(s.id) === "mathematics"
    );
    assert.strictEqual(
      openPriority1Subjects.length,
      0,
      `Expected 0 uncovered Priority 1 mathematics subjects remaining, found: ${openPriority1Subjects.map((s) => s.id).join(", ")}`
    );
    pass("Verified all 65 expansion/batch units (QA >= 90, 5+ Qs across difficulties, 2+ 4-step worked examples, valid prerequisites, SVG diagrams) and 100% Priority 1 completion.");

    // -------------------------------------------------------------------------
    // 4. Domain Routing, Answer Evaluation & Empirical Depth Metrics
    // -------------------------------------------------------------------------
    assert.strictEqual(getDomainIdForCategory("pri_152_number_patterns_sequences_mathematic"), "mathematics");
    assert.strictEqual(getDomainIdForCategory("pri_153_fractions_decimals_percentages_oper"), "mathematics");
    assert.strictEqual(getDomainIdForCategory("sss_250_mathematics_calculus_vectors_differe"), "mathematics");
    assert.strictEqual(getDomainIdForCategory("hall_engineering_gate_prep"), "mathematics");
    assert.strictEqual(getDomainIdForCategory("jss_math_algebra"), "mathematics");
    assert.strictEqual(getDomainIdForCategory("pri_171_plants_animals_ecosystem_relationshi"), "science");
    assert.strictEqual(getDomainIdForCategory("pri_177_water_sanitation_community_health"), "science");
    assert.strictEqual(getDomainIdForCategory("sss_256_physics_fields_electromagnetic_induc"), "science");
    assert.strictEqual(getDomainIdForCategory("sss_258_physics_practical_measurement_graphs"), "science");
    assert.strictEqual(getDomainIdForCategory("sss_264_biology_molecular_genetics_biotechno"), "science");
    assert.strictEqual(getDomainIdForCategory("sss_agricultural_engineering"), "science");
    assert.strictEqual(getDomainIdForCategory("jss_basic_science"), "science");

    assert.strictEqual(evaluateMathematicalAnswer("2(3a - 4)", "2(3a - 4)").isEquivalent, true);
    assert.strictEqual(evaluateMathematicalAnswer("13", "13 cm").isEquivalent, true);
    assert.strictEqual(evaluateMathematicalAnswer("0.75", "3/4").isEquivalent, true);

    const depth = contentQualityEngine.getElevenDepthMetrics(ALL_CURRICULUM_UNITS);
    assert.strictEqual(depth.catalogSubjectsCount, 300, "Catalog must contain 300 subjects");
    assert.strictEqual(depth.subjectsWithPublishedUnitsCount, 116, "Expected 116 covered subjects across 300-subject catalog");
    assert.strictEqual(depth.authoredUnitsCount, 196, "Expected 196 total authored units");
    assert.strictEqual(depth.approvedPublishedUnitsCount, 196, "Expected 196 approved published units");
    assert.strictEqual(depth.isolatedUnitsCount, 0, "Expected 0 isolated units");
    assert.ok(depth.subjectsWithPublishedUnitsCount < depth.catalogSubjectsCount, "Uncovered subjects must stay honestly tracked as queued");
    pass("Verified domain taxonomy routing, answer evaluator equivalence, and 11 empirical depth metrics (116/300 subjects, 196/196 units).");

    console.log("\n==========================================================================");
    console.log(`🎉 WORKSTREAM 2 & 3 CURRICULUM SUITE PASSED (${checksPassed} check blocks green)`);
    console.log("==========================================================================\n");
    return { passed: true };
  } finally {
    contentQualityEngine.resetForTesting();
  }
}

if (process.argv[1]?.includes("workstream2And3CurriculumQualityAndProgression")) {
  runWorkstream2And3CurriculumSuite()
    .then((r) => {
      if (!r.passed) process.exit(1);
    })
    .catch((err) => {
      console.error("❌ Workstream 2 & 3 Curriculum Suite failed:", err);
      process.exit(1);
    });
}
