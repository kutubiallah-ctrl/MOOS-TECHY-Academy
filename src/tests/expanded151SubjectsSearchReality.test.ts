/**
 * MOOS TECHY ACADEMY — EXPANDED 151-SUBJECT CATALOGUE & GLOBAL SEARCH REALITY TEST SUITE
 * 
 * Verifies:
 * 1. Preservation of Canonical 19 Subject Categories in Core Discovery Service
 * 2. Complete Availability of the Proposed 151 Subject Categories (41 Primary, 90 Secondary, 14 Advanced, 6 Clubs)
 * 3. Global Search Filtering by Name (Exact & Partial Case-Insensitive)
 * 4. Global Search Filtering by Code (e.g., pri_math_*, sec_bio_*, sec_tech_*)
 * 5. Global Search Filtering by Keyword (e.g., "fractions", "waec", "jamb", "accounting", "robotics")
 * 6. Multi-Criteria Stage & Level Combinatorial Filtering
 * 7. Integrity and Validation of All 151 Subject Metadata Records
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { courseDiscoveryService } from "../services/courseDiscoveryService";
import { EXPANDED_151_SUBJECT_CATEGORIES, TOTAL_EXPANDED_SUBJECT_COUNT } from "../data/expandedSubjectCategories";
import {
  COMPLETE_151_SUBJECT_DEFINITIONS,
  SUBJECTS,
  getSubjectByCode,
  getSubjectsByStage,
  searchCurriculumSubjects
} from "../data/curriculumData";

describe("Expanded 151-Subject Global Search & Catalogue Verification", () => {
  // 1. Invariant Preservation: Core 19 Subject Categories
  it("Core Discovery Service preserves exactly 19 canonical subject categories for existing baselines", () => {
    const canonical = courseDiscoveryService.getSubjectCategories();
    assert.strictEqual(canonical.length, 19, "Canonical discovery service must preserve 19 categories");
    assert.ok(canonical.some((c) => c.code === "mathematics"));
    assert.ok(canonical.some((c) => c.code === "english_language"));
    assert.ok(canonical.some((c) => c.code === "physics"));
    assert.ok(canonical.some((c) => c.code === "chemistry"));
  });

  // 2. Expanded 151 Subjects Catalog Count & Stage Distribution
  it("Expanded subject catalog contains exactly 151 comprehensive subjects", () => {
    const expanded = courseDiscoveryService.getExpandedSubjectCategories();
    assert.strictEqual(expanded.length, 151, "Expanded catalog must contain exactly 151 subjects");
    assert.strictEqual(courseDiscoveryService.getExpandedSubjectCount(), 151);
    assert.strictEqual(TOTAL_EXPANDED_SUBJECT_COUNT, 151);

    const primaryCount = expanded.filter((s) => s.stage === "primary").length;
    const secondaryCount = expanded.filter((s) => s.stage === "secondary").length;
    const advancedCount = expanded.filter((s) => s.stage === "advanced").length;
    const clubsCount = expanded.filter((s) => s.stage === "all").length;

    assert.strictEqual(primaryCount, 41, "Must contain exactly 41 primary foundations subjects");
    assert.strictEqual(secondaryCount, 90, "Must contain exactly 90 junior & senior secondary subjects");
    assert.strictEqual(advancedCount, 14, "Must contain exactly 14 advanced tertiary & exam hall subjects");
    assert.strictEqual(clubsCount, 6, "Must contain exactly 6 co-curricular innovation club subjects");
  });

  // 3. Field Integrity Across All 151 Subjects
  it("Every subject in the 151 catalogue meets strict schema and metadata requirements", () => {
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
  it("Filters 151-subject list accurately by subject name (case-insensitive & partial matches)", () => {
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
  it("Filters 151-subject list accurately by unique subject code prefixes and substrings", () => {
    // Primary Math codes
    const priMathResults = courseDiscoveryService.searchExpandedSubjects("pri_math");
    assert.ok(priMathResults.length >= 5, "Must find all primary math subjects via 'pri_math' code prefix");
    for (const r of priMathResults) {
      assert.ok(r.code.includes("pri_math") || r.keywords?.some((k) => k.includes("pri_math")));
    }

    // Secondary codes: jss_ and sss_
    const jssResults = courseDiscoveryService.searchExpandedSubjects("jss_");
    assert.ok(jssResults.length >= 10, "Must find junior secondary subjects via 'jss_'");

    const sssResults = courseDiscoveryService.searchExpandedSubjects("sss_");
    assert.ok(sssResults.length >= 20, "Must find senior secondary subjects via 'sss_'");

    // Specific single subject code
    const singleCode = courseDiscoveryService.searchExpandedSubjects("pri_math_fractions_decimals");
    assert.strictEqual(singleCode.length, 1);
    assert.strictEqual(singleCode[0].code, "pri_math_fractions_decimals");
    assert.strictEqual(singleCode[0].shortTitle, "Fractions & Decimals");
  });

  // 6. Global Search Filtering by Keyword
  it("Filters 151-subject list accurately by keyword tags", () => {
    // Standardized Exam keywords: WAEC
    const waecResults = courseDiscoveryService.searchExpandedSubjects("waec");
    assert.ok(waecResults.length >= 5, "Must find WAEC past paper and exam hall subjects");

    // Common Entrance keyword for primary
    const commonEntranceResults = courseDiscoveryService.searchExpandedSubjects("common entrance");
    assert.ok(commonEntranceResults.length >= 1, "Must find Common Entrance subjects");
    assert.ok(commonEntranceResults.some((s) => s.stage === "primary"));

    // Fractions keyword
    const fractionsResults = courseDiscoveryService.searchExpandedSubjects("fractions");
    assert.ok(fractionsResults.length >= 1, "Must find fractions keyword match");
    assert.ok(fractionsResults.some((s) => s.code === "pri_math_fractions_decimals"));

    // Robotics keyword
    const roboticsResults = courseDiscoveryService.searchExpandedSubjects("robotics");
    assert.ok(roboticsResults.length >= 1, "Must find robotics keyword match");
    assert.ok(roboticsResults.some((s) => s.code === "club_robotics_automation"));
  });

  // 7. Combined Stage and Level Filtering
  it("Applies multi-criteria stage and level filtering together with query search", () => {
    // Primary stage + "math" query
    const primaryMath = courseDiscoveryService.searchExpandedSubjects("math", { stage: "primary" });
    assert.ok(primaryMath.length >= 5, "Must find primary math subjects");
    for (const s of primaryMath) {
      assert.strictEqual(s.stage, "primary");
    }

    // Secondary stage + level filter
    const seniorSecPhysics = courseDiscoveryService.searchExpandedSubjects("physics", {
      stage: "secondary",
      level: "senior_secondary"
    });
    assert.ok(seniorSecPhysics.length >= 1, "Must find senior secondary physics");
    for (const s of seniorSecPhysics) {
      assert.ok(s.activeLevels.includes("senior_secondary"));
    }

    // Empty search query returns all filtered by stage
    const allPrimary = courseDiscoveryService.searchExpandedSubjects("", { stage: "primary" });
    assert.strictEqual(allPrimary.length, 41, "Empty query with stage=primary must return all 41 primary subjects");

    const allSecondary = courseDiscoveryService.searchExpandedSubjects("", { stage: "secondary" });
    assert.strictEqual(allSecondary.length, 90, "Empty query with stage=secondary must return all 90 secondary subjects");
  });

  // 8. Backward Compatibility & Code Resolution
  it("getCategoryByCode resolves both legacy canonical codes and all 151 expanded codes", () => {
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
  it("COMPLETE_151_SUBJECT_DEFINITIONS in curriculumData.ts is fully populated with rich metadata", () => {
    assert.strictEqual(COMPLETE_151_SUBJECT_DEFINITIONS.length, 151, "Must contain exactly 151 subject definitions");
    assert.ok(SUBJECTS.length >= 160, `SUBJECTS must contain canonical + 151 subjects, got ${SUBJECTS.length}`);

    // Verify stage helper functions
    const primarySubjects = getSubjectsByStage("primary");
    assert.strictEqual(primarySubjects.length, 41, "Must have 41 primary subjects");

    const secondarySubjects = getSubjectsByStage("secondary");
    assert.strictEqual(secondarySubjects.length, 90, "Must have 90 secondary subjects");

    const advancedSubjects = getSubjectsByStage("advanced");
    assert.strictEqual(advancedSubjects.length, 14, "Must have 14 advanced subjects");

    // Verify getSubjectByCode
    const foundMath = getSubjectByCode("pri_math_arithmetic");
    assert.ok(foundMath, "Must find pri_math_arithmetic by code");
    assert.strictEqual(foundMath?.title, "Primary Arithmetic & Four Operations");
    assert.strictEqual(foundMath?.stage, "primary");

    // Verify searchCurriculumSubjects
    const searchRes = searchCurriculumSubjects("calculus", { stage: "secondary" });
    assert.ok(searchRes.length >= 1, "Must find calculus subject in secondary stage");
  });
});
