/**
 * MOOS ACADEMY — EXPANDED SUBJECT CATALOGUE & GLOBAL SEARCH REALITY TEST SUITE
 *
 * Directive 007/008 Catalog Integrity Audit Note:
 * - Originally authored for the 151-subject baseline (41 Primary, 90 Secondary, 14 Advanced, 6 Clubs).
 * - Directives 004 and 005 expanded src/data/expandedSubjectCategories.ts to 300 offerings
 *   (79 Primary, 183 Secondary [incl. 5 secondary clubs], 30 Advanced, 8 Cross-stage 'all'
 *   [6 clubs + sub_268 Data Science/AI + sub_298 Nigerian Academic Decathlon]; 11 total club_* entries).
 * - SUBJECTS in src/data/curriculumData.ts is [...CANONICAL_CORE_SUBJECTS (10), ...EXPANDED_151_SUBJECTS (300)] = 310.
 *   All 310 entries have unique identifiers and titles; all 196 ALL_CURRICULUM_UNITS and 10 MATHEMATICS_UNITS
 *   reference valid SUBJECTS identifiers (0 missing dependencies).
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { courseDiscoveryService } from "../services/courseDiscoveryService";
import { EXPANDED_151_SUBJECT_CATEGORIES, TOTAL_EXPANDED_SUBJECT_COUNT } from "../data/expandedSubjectCategories";
import {
  CANONICAL_CORE_SUBJECTS,
  COMPLETE_151_SUBJECT_DEFINITIONS,
  MATHEMATICS_UNITS,
  SUBJECTS,
  getSubjectByCode,
  getSubjectsByStage,
  searchCurriculumSubjects
} from "../data/curriculumData";
import { ALL_CURRICULUM_UNITS } from "../data/extendedCurriculumUnits";

describe("Expanded 300-Subject Global Search & Catalogue Verification", () => {
  // 1. Invariant Preservation: Core 19 Subject Categories
  it("Core Discovery Service preserves exactly 19 canonical subject categories for existing baselines", () => {
    const canonical = courseDiscoveryService.getSubjectCategories();
    assert.strictEqual(canonical.length, 19, "Canonical discovery service must preserve 19 categories");
    assert.ok(canonical.some((c) => c.code === "mathematics"));
    assert.ok(canonical.some((c) => c.code === "english_language"));
    assert.ok(canonical.some((c) => c.code === "physics"));
    assert.ok(canonical.some((c) => c.code === "chemistry"));
  });

  // 2. Expanded 300 Subjects Catalog Count & Stage Distribution (evolved from 151 baseline)
  it("Expanded subject catalog contains all 300 comprehensive subjects across 4 stages", () => {
    const expanded = courseDiscoveryService.getExpandedSubjectCategories();
    assert.strictEqual(EXPANDED_151_SUBJECT_CATEGORIES.length, 300);
    assert.strictEqual(expanded.length, 300, "Expanded catalog must contain exactly 300 subjects");
    assert.strictEqual(courseDiscoveryService.getExpandedSubjectCount(), 300);
    assert.strictEqual(TOTAL_EXPANDED_SUBJECT_COUNT, 300);

    const primaryCount = expanded.filter((s) => s.stage === "primary").length;
    const secondaryCount = expanded.filter((s) => s.stage === "secondary").length;
    const advancedCount = expanded.filter((s) => s.stage === "advanced").length;
    const crossStageAllCount = expanded.filter((s) => s.stage === "all").length;
    const clubPrefixedCount = expanded.filter((s) => s.code.startsWith("club_")).length;

    assert.strictEqual(primaryCount, 79, "Must contain exactly 79 primary foundations subjects");
    assert.strictEqual(secondaryCount, 183, "Must contain exactly 183 junior & senior secondary entries (incl. 5 secondary clubs)");
    assert.strictEqual(advancedCount, 30, "Must contain exactly 30 advanced tertiary & exam hall subjects");
    assert.strictEqual(crossStageAllCount, 8, "Must contain exactly 8 stage='all' entries (6 clubs + 2 cross-stage academic offerings)");
    assert.strictEqual(clubPrefixedCount, 11, "Must contain exactly 11 co-curricular club_* offerings inside the 300 expanded catalog");
    assert.strictEqual(primaryCount + secondaryCount + advancedCount + crossStageAllCount, 300);
  });

  // 3. Field Integrity Across All 300 Subjects
  it("Every subject in the 300 catalogue meets strict schema and metadata requirements", () => {
    const expanded = courseDiscoveryService.getExpandedSubjectCategories();
    const codesSet = new Set<string>();

    for (const subj of expanded) {
      assert.ok(subj.code && subj.code.trim().length > 0, `Subject must have non-empty code: ${JSON.stringify(subj)}`);
      assert.ok(!codesSet.has(subj.code), `Duplicate subject code detected: ${subj.code}`);
      codesSet.add(subj.code);

      assert.ok(subj.name && subj.name.trim().length > 0, `Subject ${subj.code} must have non-empty name`);
      assert.ok(subj.shortTitle && subj.shortTitle.trim().length > 0, `Subject ${subj.code} must have shortTitle`);
      assert.ok(subj.tagline && subj.tagline.trim().length > 0, `Subject ${subj.code} must have tagline`);
      assert.ok(subj.description && subj.description.trim().length > 0, `Subject ${subj.code} must have description`);
      assert.ok(subj.iconName && subj.iconName.trim().length > 0, `Subject ${subj.code} must have iconName`);
      assert.ok(subj.accentColor && subj.accentColor.trim().length > 0, `Subject ${subj.code} must have accentColor`);
      assert.ok(Array.isArray(subj.activeLevels) && subj.activeLevels.length > 0, `Subject ${subj.code} must have activeLevels`);
      assert.ok(["primary", "secondary", "advanced", "all"].includes(subj.stage || ""), `Subject ${subj.code} must have valid stage`);
      assert.ok(Array.isArray(subj.keywords) && subj.keywords.length > 0, `Subject ${subj.code} must have keywords`);
    }
  });

  // 4. Global Search Filtering by Name
  it("Filters expanded subject list accurately by subject name (case-insensitive & partial matches)", () => {
    const mathResults = courseDiscoveryService.searchExpandedSubjects("arithmetic");
    assert.ok(mathResults.length >= 1, "Must find subjects with 'arithmetic' in name");
    assert.ok(mathResults.some((s) => s.code === "pri_math_arithmetic"));

    const bioResults = courseDiscoveryService.searchExpandedSubjects("genetics");
    assert.ok(bioResults.length >= 1, "Must find subjects with 'genetics' in name or description");
    assert.ok(bioResults.some((s) => s.code === "sss_biology_genetics_ecology"));

    const chemResults = courseDiscoveryService.searchExpandedSubjects("organic chemistry");
    assert.ok(chemResults.length >= 1, "Must find organic chemistry");
    assert.ok(chemResults.some((s) => s.code === "sss_chemistry_organic_industrial"));
  });

  // 5. Global Search Filtering by Code
  it("Filters expanded subject list accurately by unique subject code prefixes and substrings", () => {
    const priMathResults = courseDiscoveryService.searchExpandedSubjects("pri_math");
    assert.ok(priMathResults.length >= 5, "Must find all primary math subjects via 'pri_math' code prefix");
    for (const r of priMathResults) {
      assert.ok(r.code.includes("pri_math") || r.keywords?.some((k) => k.includes("pri_math")));
    }

    const jssResults = courseDiscoveryService.searchExpandedSubjects("jss_");
    assert.ok(jssResults.length >= 10, "Must find junior secondary subjects via 'jss_'");

    const sssResults = courseDiscoveryService.searchExpandedSubjects("sss_");
    assert.ok(sssResults.length >= 20, "Must find senior secondary subjects via 'sss_'");

    const singleCode = courseDiscoveryService.searchExpandedSubjects("pri_math_fractions_decimals");
    assert.strictEqual(singleCode.length, 1);
    assert.strictEqual(singleCode[0].code, "pri_math_fractions_decimals");
    assert.strictEqual(singleCode[0].shortTitle, "Fractions & Decimals");
  });

  // 6. Global Search Filtering by Keyword
  it("Filters expanded subject list accurately by keyword tags", () => {
    const waecResults = courseDiscoveryService.searchExpandedSubjects("waec");
    assert.ok(waecResults.length >= 5, "Must find WAEC past paper and exam hall subjects");

    const commonEntranceResults = courseDiscoveryService.searchExpandedSubjects("common entrance");
    assert.ok(commonEntranceResults.length >= 1, "Must find Common Entrance subjects");
    assert.ok(commonEntranceResults.some((s) => s.stage === "primary"));

    const fractionsResults = courseDiscoveryService.searchExpandedSubjects("fractions");
    assert.ok(fractionsResults.length >= 1, "Must find fractions keyword match");
    assert.ok(fractionsResults.some((s) => s.code === "pri_math_fractions_decimals"));

    const roboticsResults = courseDiscoveryService.searchExpandedSubjects("robotics");
    assert.ok(roboticsResults.length >= 1, "Must find robotics keyword match");
    assert.ok(roboticsResults.some((s) => s.code === "club_robotics_automation"));
  });

  // 7. Combined Stage and Level Filtering
  it("Applies multi-criteria stage and level filtering together with query search", () => {
    const primaryMath = courseDiscoveryService.searchExpandedSubjects("math", { stage: "primary" });
    assert.ok(primaryMath.length >= 5, "Must find primary math subjects");
    for (const s of primaryMath) {
      assert.strictEqual(s.stage, "primary");
    }

    const seniorSecPhysics = courseDiscoveryService.searchExpandedSubjects("physics", {
      stage: "secondary",
      level: "senior_secondary"
    });
    assert.ok(seniorSecPhysics.length >= 1, "Must find senior secondary physics");
    for (const s of seniorSecPhysics) {
      assert.ok(s.activeLevels.includes("senior_secondary"));
    }

    const allPrimary = courseDiscoveryService.searchExpandedSubjects("", { stage: "primary" });
    assert.strictEqual(allPrimary.length, 79, "Empty query with stage=primary must return all 79 primary subjects");

    const allSecondary = courseDiscoveryService.searchExpandedSubjects("", { stage: "secondary" });
    assert.strictEqual(allSecondary.length, 183, "Empty query with stage=secondary must return all 183 secondary subjects");
  });

  // 8. Backward Compatibility & Code Resolution
  it("getCategoryByCode resolves both legacy canonical codes and expanded baseline/300 codes", () => {
    const math = courseDiscoveryService.getCategoryByCode("mathematics");
    assert.ok(math, "Must resolve legacy 'mathematics'");
    assert.strictEqual(math?.code, "mathematics");

    const fractions = courseDiscoveryService.getCategoryByCode("pri_math_fractions_decimals");
    assert.ok(fractions, "Must resolve expanded 'pri_math_fractions_decimals'");
    assert.strictEqual(fractions?.code, "pri_math_fractions_decimals");

    const robotics = courseDiscoveryService.getCategoryByCode("club_robotics_automation");
    assert.ok(robotics, "Must resolve expanded 'club_robotics_automation'");
    assert.strictEqual(robotics?.code, "club_robotics_automation");
  });

  // 9. COMPLETE_151_SUBJECT_DEFINITIONS in curriculumData.ts & Stage Helpers
  it("COMPLETE_151_SUBJECT_DEFINITIONS in curriculumData.ts reflects 300-subject definitions with intact stage helpers", () => {
    assert.strictEqual(COMPLETE_151_SUBJECT_DEFINITIONS.length, 300, "Must contain all 300 subject definitions");
    assert.strictEqual(SUBJECTS.length, 310, `SUBJECTS must contain canonical + expanded definitions (310), got ${SUBJECTS.length}`);

    const primarySubjects = getSubjectsByStage("primary");
    assert.strictEqual(primarySubjects.length, 79, "Must have 79 primary subjects");

    const secondarySubjects = getSubjectsByStage("secondary");
    assert.strictEqual(secondarySubjects.length, 183, "Must have 183 secondary subjects");

    const advancedSubjects = getSubjectsByStage("advanced");
    assert.strictEqual(advancedSubjects.length, 30, "Must have 30 advanced subjects");

    const foundMath = getSubjectByCode("pri_math_arithmetic");
    assert.ok(foundMath, "Must find pri_math_arithmetic by code");
    assert.strictEqual(foundMath?.title, "Primary Arithmetic & Four Operations");
    assert.strictEqual(foundMath?.stage, "primary");

    const searchRes = searchCurriculumSubjects("calculus", { stage: "secondary" });
    assert.ok(searchRes.length >= 1, "Must find calculus subject in secondary stage");
  });

  // 10. Directive 008 Workstream 3: Uniqueness & Referential Integrity Reconciliation (310 vs 300)
  it("Reconciles 310 registered SUBJECTS (10 canonical core + 300 expanded) with zero duplicates or broken unit references", () => {
    assert.strictEqual(CANONICAL_CORE_SUBJECTS.length, 10);
    assert.strictEqual(COMPLETE_151_SUBJECT_DEFINITIONS.length, 300);
    assert.strictEqual(SUBJECTS.length, 310);

    const uniqueIds = new Set(SUBJECTS.map((s) => s.id));
    const uniqueTitles = new Set(SUBJECTS.map((s) => s.title.toLowerCase().trim()));
    assert.strictEqual(uniqueIds.size, 310, "All 310 registered subjects must have unique IDs");
    assert.strictEqual(uniqueTitles.size, 310, "All 310 registered subjects must have unique titles");

    const unitSubjectIds = new Set(ALL_CURRICULUM_UNITS.map((u) => u.subjectId));
    const missingUnitSubjects = [...unitSubjectIds].filter((id) => !uniqueIds.has(id));
    assert.deepStrictEqual(missingUnitSubjects, [], "Every unit in ALL_CURRICULUM_UNITS must reference a valid registered subjectId");

    const missingMathUnitSubjects = MATHEMATICS_UNITS.map((u) => u.subjectId).filter((id) => !uniqueIds.has(id));
    assert.deepStrictEqual(missingMathUnitSubjects, [], "Every unit in MATHEMATICS_UNITS must reference a valid registered subjectId");

    // Verify canonical + expanded coverage totals 116 subjects with curriculum units
    assert.strictEqual(unitSubjectIds.size, 116);
  });
});
