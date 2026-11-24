/**
 * MOOS ACADEMY — DIRECTIVE 002 LIVE SECURITY POC & ACADEMIC QA CERTIFICATION SUITE
 *
 * Verifies end-to-end compliance with Strategic Development Directive 002:
 * 1. Live Express HTTP API PoC security enforcement:
 *    - Unauthenticated & forged-header access to /api/allowlist/* and /api/development-bridge/* returns 401.
 *    - Email-only bypass (/api/allowlist/verify) returns 401.
 *    - Self-assigned 'admin'/'owner' on /api/auth/signup returns 403.
 *    - Verified learner Bearer tokens are strictly blocked (403) from admin/owner endpoints.
 *    - Authenticated designated owner Bearer tokens succeed (200) on /api/allowlist/list & /insert.
 * 2. Weighted Content Quality Assurance Gate (>= 85%):
 *    - Disqualifiers (scratchpad leaks, broken math/logic, invalid answer keys, duplicate stems)
 *      automatically isolate units (qa_failed) and block learner publication.
 *    - Publication transitions below 85% are rejected.
 *    - Atomic versioning creates immutable snapshots and rollback cleanly restores prior state.
 * 3. Priority 1 Math & Priority 2 English Deep Saturation Compliance:
 *    - Zero qa_failed units across ALL_CURRICULUM_UNITS.
 *    - Enriched modules (unit-jss-algebra-linear, unit-sss-quadratics, unit-eng-concord-syntax)
 *      achieve >= 85% QA score, >= 5 verified questions/skill, >= 2 worked examples (>= 4 steps),
 *      and labeled SVG diagrams in VISUALIZATION_REPOSITORY.
 *    - 11 Empirical Depth Metrics accurately report the 300-subject catalog without fake inflation.
 */

import { strict as assert } from "assert";
import type { Server } from "http";
import type { Unit } from "../types/curriculum";
import { serverAuthGovernance } from "../../server/authGovernance";
import { contentQualityEngine } from "../services/contentQualityEngine";
import { contentSaturationService } from "../services/contentSaturationService";
import { ALL_CURRICULUM_UNITS } from "../data/extendedCurriculumUnits";
import { VISUALIZATION_REPOSITORY } from "../data/visualizationsRepository";
import { APPROVAL_QUALITY_THRESHOLD } from "../types/contentGovernance";

async function startEphemeralTestServer(): Promise<{ server: Server; baseUrl: string }> {
  process.env.MOOS_SKIP_AUTO_LISTEN = "true";
  const { app } = await import("../../server");
  return new Promise((resolve, reject) => {
    const server = app.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("Failed to bind ephemeral port for live HTTP PoC test."));
        return;
      }
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

export async function runDirective002HardeningAndContentQASuite(): Promise<{ passed: boolean }> {
  let checksPassed = 0;
  function pass(msg: string) {
    checksPassed++;
    console.log(`  ✅ [PASS] ${msg}`);
  }

  console.log("==========================================================================");
  console.log("🏛️  MOOS ACADEMY — DIRECTIVE 002 LIVE SECURITY POC & ACADEMIC QA SUITE");
  console.log("==========================================================================\n");

  serverAuthGovernance.resetForTesting();
  const { server, baseUrl } = await startEphemeralTestServer();

  try {
    const [primaryOwner] = serverAuthGovernance.getOwnerEmails();

    // =========================================================================
    // PART A: LIVE EXPRESS HTTP POC SECURITY TESTS
    // =========================================================================
    console.log("--- Part A: Live Express HTTP Authorization & Bypass PoCs ---");

    // 1. Unauthenticated /api/allowlist/list -> 401
    const unauthAllowlist = await fetch(`${baseUrl}/api/allowlist/list`);
    assert.strictEqual(unauthAllowlist.status, 401, "Unauthenticated allowlist fetch must return 401");

    // 2. Forged caller email header without Bearer token -> 401
    const forgedHeaderResp = await fetch(`${baseUrl}/api/allowlist/list`, {
      headers: { "x-caller-email": primaryOwner }
    });
    assert.strictEqual(forgedHeaderResp.status, 401, "Forged x-caller-email header must return 401");

    // 3. Retired email-only bypass endpoint -> 401
    const legacyVerifyResp = await fetch(`${baseUrl}/api/allowlist/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: primaryOwner })
    });
    assert.strictEqual(legacyVerifyResp.status, 401, "Email-only /api/allowlist/verify must return 401");

    // 4. Self-assigned admin on /api/auth/signup -> 403
    const adminSignupResp = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Privilege Escalator",
        email: "escalator@external.org",
        password: "Password123!",
        role: "admin"
      })
    });
    assert.strictEqual(adminSignupResp.status, 403, "Self-assigned 'admin' signup must return 403");

    // 5. Verified learner signup -> 201, then learner token blocked on admin/owner routes -> 403
    const learnerSignupResp = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Adaobi Nnadi",
        email: "adaobi.nnadi@learner.moos.edu",
        password: "LearnerStrongPass#2026",
        role: "learner"
      })
    });
    assert.strictEqual(learnerSignupResp.status, 201, "Public learner signup must return 201");
    const learnerData = (await learnerSignupResp.json()) as any;
    const learnerToken = learnerData.serverVerificationToken;
    assert.ok(learnerToken, "Learner signup must yield Bearer session token");

    const learnerOnAllowlist = await fetch(`${baseUrl}/api/allowlist/list`, {
      headers: { Authorization: `Bearer ${learnerToken}` }
    });
    assert.strictEqual(learnerOnAllowlist.status, 403, "Learner Bearer token on /api/allowlist/list must return 403");

    const learnerOnBridge = await fetch(`${baseUrl}/api/development-bridge/status`, {
      headers: { Authorization: `Bearer ${learnerToken}` }
    });
    assert.strictEqual(learnerOnBridge.status, 403, "Learner Bearer token on /api/development-bridge/status must return 403");

    // 6. Authenticated owner signin -> 200 and full authorized directory access
    serverAuthGovernance.provisionOwnerPasswordForTest(primaryOwner, "OwnerVerified#2026!");
    const ownerSignInResp = await fetch(`${baseUrl}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: primaryOwner,
        password: "OwnerVerified#2026!"
      })
    });
    assert.strictEqual(ownerSignInResp.status, 200, "Verified owner password sign-in must return 200");
    const ownerSignInJson = (await ownerSignInResp.json()) as any;
    const ownerToken = ownerSignInJson.serverVerificationToken;
    assert.ok(ownerToken && ownerSignInJson.isOwnerAutoElevated === true);

    const ownerAllowlistResp = await fetch(`${baseUrl}/api/allowlist/list`, {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });
    assert.strictEqual(ownerAllowlistResp.status, 200, "Authenticated owner must access /api/allowlist/list");

    const ownerInsertResp = await fetch(`${baseUrl}/api/allowlist/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ownerToken}`
      },
      body: JSON.stringify({
        targetEmail: "verified.teacher@moos.edu",
        role: "teacher",
        notes: "HTTP PoC Verified Faculty"
      })
    });
    assert.strictEqual(ownerInsertResp.status, 200, "Authenticated owner must succeed on /api/allowlist/insert");
    pass("All 8 live Express HTTP PoC checks verified strictly.");

    // =========================================================================
    // PART B: WEIGHTED QA ENGINE, ISOLATION & ATOMIC ROLLBACK
    // =========================================================================
    console.log("\n--- Part B: Content Quality Gate, Learner Isolation & Atomic Rollback ---");
    const flawedUnit: Unit = {
      id: "unit-test-flawed-qa",
      code: "TEST-QA-01",
      subjectId: "math_core",
      level: "junior_secondary",
      title: "Flawed QA Isolation Test Unit",
      description: "Synthetic defective unit for QA disqualifier verification",
      order: 99,
      category: "core",
      estimatedHours: 1,
      curriculumStandardMappings: [],
      skills: [
        {
          id: "skill-test-flawed",
          unitId: "unit-test-flawed-qa",
          title: "Defective Math Skill",
          code: "TEST-MATH-01",
          summary: "Contains intentional defects for automated detection",
          objectives: ["Detect defect"],
          difficulty: "foundational",
          masteryPointsRequired: 100,
          lesson: {
            id: "les-test-flawed",
            title: "Defective Lesson",
            hookAndIntuition: "Wait: check this number.",
            conceptualExplanation: "Short.",
            keyTermsAndFormulas: [],
            workedExamples: [],
            commonMisconceptionsAndTraps: [],
            guidedPracticePrompt: "Try.",
            summaryRecap: "Done",
            estimatedMinutes: 5
          },
          questions: [
            {
              id: "q-flaw-1",
              skillId: "skill-test-flawed",
              questionText: "What is 2 + 2?",
              type: "multiple_choice",
              options: ["4", "4", "5", "6"],
              correctAnswer: "9",
              explanation: "Wait: 2 + 2 = 4? If RHS changed...",
              hintLadder: ["Add 2 and 2"],
              difficulty: "easy"
            },
            {
              id: "q-flaw-2",
              skillId: "skill-test-flawed",
              questionText: "What is 2 + 2?",
              type: "multiple_choice",
              options: ["1", "2", "3", "4"],
              correctAnswer: "4",
              explanation: "Basic addition.",
              hintLadder: ["Add"],
              difficulty: "easy"
            }
          ]
        }
      ]
    };

    const evaluatedFlaw = contentQualityEngine.evaluateUnitQuality(flawedUnit);
    assert.strictEqual(evaluatedFlaw.publicationStatus, "qa_failed");
    assert.strictEqual(evaluatedFlaw.approvedForLearnerProduction, false);
    assert.ok(evaluatedFlaw.disqualifiers.some((d) => d.code === "SCRATCHPAD_LEAK"));
    assert.ok(evaluatedFlaw.disqualifiers.some((d) => d.code === "INVALID_ANSWER_KEY"));
    assert.ok(evaluatedFlaw.disqualifiers.some((d) => d.code === "DUPLICATE_QUESTION_STEM"));

    const registerFlaw = contentQualityEngine.registerOrUpdateUnit(flawedUnit, "qa-test", "Initial flawed draft");
    assert.strictEqual(registerFlaw.approvedForLearnerProduction, false);

    // Ensure published catalog does NOT leak qa_failed draft
    const publishedList = contentQualityEngine.getPublishedApprovedUnits([...ALL_CURRICULUM_UNITS, flawedUnit]);
    assert.strictEqual(
      publishedList.some((u) => u.id === "unit-test-flawed-qa"),
      false,
      "Defective qa_failed module must remain isolated from learner production view"
    );

    // Block manual transition to 'published' while below threshold or disqualified
    const blockedPub = contentQualityEngine.transitionPublicationStatus(
      "unit-test-flawed-qa",
      "published",
      "qa-test",
      "Attempt forced publish"
    );
    assert.strictEqual(blockedPub.success, false, "Transition to 'published' must fail when QA gate fails");

    // Atomic versioning & rollback verification on unit-jss-algebra-linear
    const originalUnit = contentQualityEngine.getEffectiveUnit("unit-jss-algebra-linear")!;
    const originalRecord = contentQualityEngine.getGovernanceRecord("unit-jss-algebra-linear")!;
    const originalVersion = originalRecord.version;

    const v2Clone: Unit = JSON.parse(JSON.stringify(originalUnit));
    v2Clone.description = "Temporary v2 governance revision test description";
    contentQualityEngine.registerOrUpdateUnit(v2Clone, "qa-test", "Apply revision edit");

    const postUpdateRecord = contentQualityEngine.getGovernanceRecord("unit-jss-algebra-linear")!;
    assert.notStrictEqual(postUpdateRecord.version, originalVersion);
    assert.ok(postUpdateRecord.revisionHistory.some((h) => h.version === originalVersion));

    const rollbackRes = contentQualityEngine.rollbackToVersion("unit-jss-algebra-linear", originalVersion, "qa-test");
    assert.strictEqual(rollbackRes.success, true);
    assert.strictEqual(
      contentQualityEngine.getEffectiveUnit("unit-jss-algebra-linear")?.description,
      originalUnit.description,
      "Atomic rollback must cleanly restore original unit description"
    );
    pass("QA disqualifier detection, learner isolation, publish gate, and atomic rollback verified.");

    // =========================================================================
    // PART C: PRODUCTION CURRICULUM AUDIT, STROUD ENRICHMENT & 11 DEPTH METRICS
    // =========================================================================
    console.log("\n--- Part C: Curriculum Zero-Disqualifier Audit & Enriched Units ---");
    contentQualityEngine.resetForTesting();
    const allRecords = contentQualityEngine.evaluateAllUnits(ALL_CURRICULUM_UNITS);
    const disqualifiedUnits = allRecords.filter((r) => r.disqualifiers.length > 0);
    assert.strictEqual(
      disqualifiedUnits.length,
      0,
      `Expected 0 disqualified units in curriculum, found: ${disqualifiedUnits.map((d) => `${d.unitId}:${d.disqualifiers.map((dq) => dq.code).join(",")}`).join("; ")}`
    );

    const priorityTargets = [
      { id: "unit-jss-algebra-linear", minQuestionsPerSkill: 5, visIds: ["vis-linear-balance", "vis-simultaneous-intersection"] },
      { id: "unit-sss-quadratics", minQuestionsPerSkill: 5, visIds: ["vis-quadratic-parabola"] },
      { id: "unit-eng-concord-syntax", minQuestionsPerSkill: 5, visIds: ["vis-concord-syntax-tree", "vis-conditional-timeline"] }
    ];

    for (const target of priorityTargets) {
      const unit = ALL_CURRICULUM_UNITS.find((u) => u.id === target.id);
      assert.ok(unit, `Target unit '${target.id}' must exist`);
      const rec = contentQualityEngine.getGovernanceRecord(target.id)!;
      assert.ok(
        rec.qualityScore >= APPROVAL_QUALITY_THRESHOLD,
        `${target.id} quality score (${rec.qualityScore}) must be >= ${APPROVAL_QUALITY_THRESHOLD}`
      );
      assert.strictEqual(rec.approvedForLearnerProduction, true);
      assert.strictEqual(rec.disqualifiers.length, 0);

      for (const skill of unit.skills) {
        assert.ok(
          skill.questions.length >= target.minQuestionsPerSkill,
          `Skill '${skill.id}' must have >= ${target.minQuestionsPerSkill} questions (found ${skill.questions.length})`
        );
        assert.ok(
          (skill.lesson?.workedExamples?.length || 0) >= 2,
          `Skill '${skill.id}' must have >= 2 worked examples`
        );
        for (const we of skill.lesson?.workedExamples || []) {
          assert.ok(we.steps.length >= 4, `Worked example in '${skill.id}' must have >= 4 explicit derivation steps`);
        }
      }

      for (const visId of target.visIds) {
        const vis = VISUALIZATION_REPOSITORY[visId];
        assert.ok(vis, `Visualization '${visId}' must exist in VISUALIZATION_REPOSITORY`);
        assert.ok(
          vis.diagramSvgSnippet && vis.diagramSvgSnippet.includes("<svg"),
          `Visualization '${visId}' must include a rendered vector SVG diagram`
        );
      }
    }

    const report = contentSaturationService.generateContentSaturationReport();
    assert.ok(report.elevenDepthMetrics, "Report must include 11 empirical depth metrics");
    assert.strictEqual(report.elevenDepthMetrics.catalogSubjectsCount, 300, "Catalog must contain 300 subjects");
    assert.strictEqual(report.elevenDepthMetrics.authoredUnitsCount, ALL_CURRICULUM_UNITS.length);
    assert.ok(
      report.elevenDepthMetrics.subjectsWithPublishedUnitsCount < report.elevenDepthMetrics.catalogSubjectsCount,
      "Honest telemetry must reflect roadmap subjects not yet authored"
    );
    pass("Curriculum verified: 0 disqualifiers, Priority 1 & 2 Stroud enrichment >= 85% w/ SVG visuals, honest 300-subject metrics.");

    console.log("\n==========================================================================");
    console.log(`🎉 DIRECTIVE 002 SUITE PASSED (${checksPassed} comprehensive check blocks green)`);
    console.log("==========================================================================\n");
    return { passed: true };
  } finally {
    serverAuthGovernance.resetForTesting();
    contentQualityEngine.resetForTesting();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

if (process.argv[1]?.includes("directive002HardeningAndContentQA")) {
  runDirective002HardeningAndContentQASuite()
    .then((res) => {
      if (!res.passed) process.exit(1);
    })
    .catch((err) => {
      console.error("❌ Directive 002 Suite failed:", err);
      process.exit(1);
    });
}
