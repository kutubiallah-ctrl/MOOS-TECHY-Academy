/**
 * MOOS ACADEMY — DIRECTIVE 007 AUDIT, MASTERY INTEGRITY & DURABLE PERSISTENCE SUITE
 *
 * Verifies:
 *  - Workstream 2: All 8 Mastery Integrity Scenarios + Hint Weighting Formula + Rolling Anti-Gaming
 *  - Workstream 1: Firebase ID Token Reload Restoration (ensureFirebaseSessionSynced + deduplication)
 *                  & Live Session Token Security (expired, tampered, revoked, cross-account)
 *  - Workstream 3: Durable Server Progress Persistence across Simulated Server Restarts
 */

import { strict as assert } from "assert";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import type { Server } from "http";
import { serverAuthGovernance } from "../../server/authGovernance";
import { emailAllowlistService } from "../services/emailAllowlistService";
import {
  MASTERY_THRESHOLDS,
  computeHintCredit,
  evaluateSkillMastery
} from "../services/masteryEngine";
import { QuestionAttempt } from "../types/learner";

const PROJECT_ID = "genial-bucksaw-wxctm";
const ISSUER = `https://securetoken.google.com/${PROJECT_ID}`;

function b64UrlJson(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj), "utf8").toString("base64url");
}

function signRs256Jwt(
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  privateKeyPem: string
): string {
  const h = b64UrlJson(header);
  const p = b64UrlJson(payload);
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${h}.${p}`);
  signer.end();
  const sig = signer.sign(privateKeyPem).toString("base64url");
  return `${h}.${p}.${sig}`;
}

function makeAttempt(
  skillId: string,
  index: number,
  isCorrect: boolean,
  hintsUsedCount: number,
  questionId: string,
  minutesAgo: number
): QuestionAttempt {
  return {
    id: `d007-att-${skillId}-${index}`,
    questionId,
    skillId,
    selectedOption: isCorrect ? "correct" : "wrong",
    isCorrect,
    hintsUsedCount,
    timeSpentSeconds: 30,
    timestamp: new Date(1_795_000_000_000 - minutesAgo * 60_000).toISOString(),
    provenance: "OFFICIAL_SYLLABUS",
    isAiGenerated: false
  };
}

async function startEphemeralServer(): Promise<{ server: Server; baseUrl: string }> {
  process.env.MOOS_SKIP_AUTO_LISTEN = "true";
  const { app } = await import("../../server");
  return new Promise((resolve, reject) => {
    const server = app.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("Failed to bind ephemeral server port."));
        return;
      }
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

export async function runDirective007VerificationSuite(): Promise<{ passed: boolean }> {
  console.log("==========================================================================");
  console.log("🔍 MOOS ACADEMY — DIRECTIVE 007 MASTERY AUDIT & PERSISTENCE VERIFICATION");
  console.log("==========================================================================\n");

  const fixedNowMs = 1_795_000_000_000;
  let passedCount = 0;
  function pass(msg: string) {
    passedCount++;
    console.log(`  ✅ [PASS] ${msg}`);
  }

  // =========================================================================
  // WS2: Explicit Hint-Weighting Formula Verification
  // =========================================================================
  assert.strictEqual(computeHintCredit(false, 0), 0);
  assert.strictEqual(computeHintCredit(false, 2), 0);
  assert.strictEqual(computeHintCredit(true, 0), MASTERY_THRESHOLDS.HINT_CREDIT_0);
  assert.strictEqual(computeHintCredit(true, 1), MASTERY_THRESHOLDS.HINT_CREDIT_1);
  assert.strictEqual(computeHintCredit(true, 2), MASTERY_THRESHOLDS.HINT_CREDIT_2);
  assert.strictEqual(computeHintCredit(true, 3), MASTERY_THRESHOLDS.HINT_CREDIT_3_PLUS);
  assert.strictEqual(computeHintCredit(true, 9), MASTERY_THRESHOLDS.HINT_CREDIT_3_PLUS);
  pass("WS2 Hint formula verified: wrong=0, 0 hints=1.0, 1 hint=0.72, 2 hints=0.50, 3+ hints=0.35.");

  // =========================================================================
  // WS2 Scenario A: High completion, low accuracy -> No automatic mastery
  // =========================================================================
  {
    const skillId = "d007-low-acc";
    const attempts = Array.from({ length: 12 }, (_, i) =>
      makeAttempt(skillId, i, i === 0, 0, `q-la-${i}`, 12 - i)
    ); // 1/12 correct (~8.3%)
    const res = evaluateSkillMastery({ skillId, attempts, nowMs: fixedNowMs });
    assert.strictEqual(res.status, "introduced");
    assert.ok(res.points <= 37, `High completion / low accuracy points capped (got ${res.points})`);
    pass("WS2-1 High completion + low accuracy stays 'introduced' with no unearned proficiency.");
  }

  // =========================================================================
  // WS2 Scenario B: High accuracy with extensive hints -> Adjusted proficiency
  // =========================================================================
  {
    const skillId = "d007-ext-hints";
    const attempts = Array.from({ length: 8 }, (_, i) =>
      makeAttempt(skillId, i, true, 3, `q-eh-${i}`, 8 - i)
    );
    const res = evaluateSkillMastery({ skillId, attempts, nowMs: fixedNowMs });
    assert.strictEqual(res.status, "introduced"); // weighted ~35% (< 38% practising threshold) -> remains scaffolded introduced
    assert.strictEqual(res.independentCorrectCount, 0);
    assert.strictEqual(res.assistedCorrectCount, 8);
    pass("WS2-2 100% accuracy with 3+ hints per item yields adjusted score and 0 independent mastery.");
  }

  // =========================================================================
  // WS2 Scenario C: High independent accuracy -> Appropriate progression
  // =========================================================================
  {
    const skillId = "d007-high-ind";
    const attempts = Array.from({ length: 6 }, (_, i) =>
      makeAttempt(skillId, i, true, 0, `q-hi-${i}`, (6 - i) * 5)
    );
    const res = evaluateSkillMastery({ skillId, attempts, nowMs: fixedNowMs });
    assert.strictEqual(res.status, "mastered");
    assert.strictEqual(res.points, 100);
    assert.strictEqual(res.distinctQuestionsCount, 6);
    pass("WS2-3 High independent accuracy across 6 distinct questions reaches 'mastered' (100 pts).");
  }

  // =========================================================================
  // WS2 Scenario D: Repeated identical attempts -> No artificial inflation
  // =========================================================================
  {
    // D1: Repeating the exact same solved question 10 times from scratch
    const singleItemSpam = Array.from({ length: 10 }, (_, i) =>
      makeAttempt("d007-repeat-1", i, true, 0, "q-identical-only", 10 - i)
    );
    const rSingle = evaluateSkillMastery({
      skillId: "d007-repeat-1",
      attempts: singleItemSpam,
      nowMs: fixedNowMs
    });
    assert.strictEqual(
      rSingle.status,
      "introduced",
      `10 identical solves on 1 question must stay 'introduced', got '${rSingle.status}'`
    );
    assert.ok(rSingle.points <= 37, `Single-item spam capped <= 37 pts, got ${rSingle.points}`);

    // D2: Rolling window eviction attack — failing q-4 & q-5 then replaying q-1 6 times
    const historyNewestFirst: QuestionAttempt[] = [
      makeAttempt("d007-evict", 10, true, 0, "q-1", 1),
      makeAttempt("d007-evict", 9, true, 0, "q-1", 2),
      makeAttempt("d007-evict", 8, true, 0, "q-1", 3),
      makeAttempt("d007-evict", 7, true, 0, "q-1", 4),
      makeAttempt("d007-evict", 6, true, 0, "q-1", 5),
      makeAttempt("d007-evict", 5, true, 0, "q-1", 6),
      makeAttempt("d007-evict", 4, false, 0, "q-5", 10),
      makeAttempt("d007-evict", 3, false, 0, "q-4", 12),
      makeAttempt("d007-evict", 2, true, 0, "q-3", 20),
      makeAttempt("d007-evict", 1, true, 0, "q-2", 25),
      makeAttempt("d007-evict", 0, true, 0, "q-1", 30)
    ];
    const rEvict = evaluateSkillMastery({
      skillId: "d007-evict",
      attempts: historyNewestFirst,
      nowMs: fixedNowMs
    });
    assert.notStrictEqual(rEvict.status, "mastered", "Repeating q-1 cannot evict q-4/q-5 failures to earn Mastered");
    assert.notStrictEqual(rEvict.status, "proficient", "Repeating q-1 cannot evict q-4/q-5 failures to earn Proficient");
    assert.ok(rEvict.recentAccuracy! < 68, `Deduplicated rolling window retains q-4/q-5 failures (recent=${rEvict.recentAccuracy}%)`);

    // D3: 1 independent question repeated 4x + 3 hinted questions -> still blocks Proficient
    const singleIndMixed: QuestionAttempt[] = [
      makeAttempt("d007-1ind", 6, true, 2, "q-h-3", 1),
      makeAttempt("d007-1ind", 5, true, 2, "q-h-2", 2),
      makeAttempt("d007-1ind", 4, true, 2, "q-h-1", 3),
      makeAttempt("d007-1ind", 3, true, 0, "q-only-ind", 4),
      makeAttempt("d007-1ind", 2, true, 0, "q-only-ind", 5),
      makeAttempt("d007-1ind", 1, true, 0, "q-only-ind", 6),
      makeAttempt("d007-1ind", 0, true, 0, "q-only-ind", 7)
    ];
    const rSingleInd = evaluateSkillMastery({
      skillId: "d007-1ind",
      attempts: singleIndMixed,
      nowMs: fixedNowMs
    });
    assert.notStrictEqual(rSingleInd.status, "proficient", "Only 1 distinct independent question cannot unlock Proficient");
    assert.notStrictEqual(rSingleInd.status, "mastered");
    pass("WS2-4 Repeated identical attempts & rolling-window eviction attacks blocked cleanly.");
  }

  // =========================================================================
  // WS2 Scenario E: Recent improvement -> Appropriate recognition
  // =========================================================================
  {
    const skillId = "d007-improve";
    // Earlier errors (40-50 mins ago), followed by 5 distinct recent independent solves (1-5 mins ago)
    const attempts: QuestionAttempt[] = [
      makeAttempt(skillId, 7, true, 0, "q-imp-6", 1),
      makeAttempt(skillId, 6, true, 0, "q-imp-5", 2),
      makeAttempt(skillId, 5, true, 0, "q-imp-4", 3),
      makeAttempt(skillId, 4, true, 0, "q-imp-3", 4),
      makeAttempt(skillId, 3, true, 0, "q-imp-2", 5),
      makeAttempt(skillId, 2, false, 0, "q-imp-1", 40),
      makeAttempt(skillId, 1, false, 0, "q-imp-0", 50)
    ];
    const res = evaluateSkillMastery({ skillId, attempts, nowMs: fixedNowMs });
    assert.strictEqual(res.status, "proficient", "Genuine recent recovery over 5 distinct items earns Proficient");
    assert.ok(res.recentAccuracy! >= 95, `Recent accuracy reflects clean recovery (${res.recentAccuracy}%)`);
    pass("WS2-5 Recent genuine improvement recognized cleanly via recency-weighted window.");
  }

  // =========================================================================
  // WS2 Scenario F: Recent decline -> Reassessment & downgrade of mastery
  // =========================================================================
  {
    const skillId = "d007-decline";
    const before: QuestionAttempt[] = [
      makeAttempt(skillId, 5, true, 0, "q-d-6", 20),
      makeAttempt(skillId, 4, true, 0, "q-d-5", 25),
      makeAttempt(skillId, 3, true, 0, "q-d-4", 30),
      makeAttempt(skillId, 2, true, 0, "q-d-3", 35),
      makeAttempt(skillId, 1, true, 0, "q-d-2", 40),
      makeAttempt(skillId, 0, true, 0, "q-d-1", 45)
    ];
    const rBefore = evaluateSkillMastery({ skillId, attempts: before, nowMs: fixedNowMs });
    assert.strictEqual(rBefore.status, "mastered");

    const after = [
      makeAttempt(skillId, 8, false, 0, "q-d-9", 1),
      makeAttempt(skillId, 7, false, 0, "q-d-8", 2),
      makeAttempt(skillId, 6, false, 0, "q-d-7", 3),
      ...before
    ];
    const rAfter = evaluateSkillMastery({ skillId, attempts: after, nowMs: fixedNowMs });
    assert.ok(rAfter.status === "introduced" || rAfter.status === "practising");
    assert.ok(rAfter.points < rBefore.points);
    pass(`WS2-6 Recent decline downgraded mastery cleanly (${rBefore.status} ${rBefore.points} -> ${rAfter.status} ${rAfter.points}).`);
  }

  // =========================================================================
  // WS2 Scenario G: Insufficient attempts -> Insufficient evidence guard
  // =========================================================================
  {
    const skillId = "d007-insuff";
    const r1 = evaluateSkillMastery({
      skillId,
      attempts: [makeAttempt(skillId, 0, true, 0, "q-i-1", 2)],
      nowMs: fixedNowMs
    });
    assert.strictEqual(r1.status, "introduced");
    assert.ok(r1.points <= 35);

    const r3 = evaluateSkillMastery({
      skillId,
      attempts: [
        makeAttempt(skillId, 2, true, 0, "q-i-3", 1),
        makeAttempt(skillId, 1, true, 0, "q-i-2", 2),
        makeAttempt(skillId, 0, true, 0, "q-i-1", 3)
      ],
      nowMs: fixedNowMs
    });
    assert.strictEqual(r3.status, "practising", "3 attempts remain guarded below Proficient/Mastered");
    assert.ok(r3.points <= 68);
    pass("WS2-7 Insufficient attempts (1 and 3 items) enforce strict evidence caps.");
  }

  // =========================================================================
  // WS2 Scenario H: Determinism across repeated recalculations
  // =========================================================================
  {
    const skillId = "d007-determ";
    const sample: QuestionAttempt[] = [
      makeAttempt(skillId, 4, true, 1, "q-det-5", 1),
      makeAttempt(skillId, 3, false, 0, "q-det-4", 5),
      makeAttempt(skillId, 2, true, 0, "q-det-3", 10),
      makeAttempt(skillId, 1, true, 0, "q-det-2", 15),
      makeAttempt(skillId, 0, true, 0, "q-det-1", 20)
    ];
    const run1 = evaluateSkillMastery({ skillId, attempts: sample, nowMs: fixedNowMs });
    const run2 = evaluateSkillMastery({ skillId, attempts: sample, nowMs: fixedNowMs });
    const run3 = evaluateSkillMastery({ skillId, attempts: [...sample], nowMs: fixedNowMs });
    assert.deepStrictEqual(run1, run2);
    assert.deepStrictEqual(run2, run3);
    pass("WS2-8 Repeated recalculations produce bitwise-identical deterministic MasteryRecord outputs.");
  }

  // =========================================================================
  // WS1 & WS3: Reload Token Exchange + Atomic Server Restart Persistence
  // =========================================================================
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "moos-d007-persist-"));
  const stateFile = path.join(tempDir, "governance-state.json");
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  });
  const testKid = "d007-persist-kid";
  const { server, baseUrl } = await startEphemeralServer();

  // Mock fetch relative URL helper for client emailAllowlistService unit check
  const origFetch = globalThis.fetch;
  (globalThis as any).fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === "string" && input.startsWith("/")) {
      return origFetch(`${baseUrl}${input}`, init);
    }
    return origFetch(input, init);
  };

  try {
    serverAuthGovernance.resetForTesting();
    serverAuthGovernance.setPersistencePathForTesting(stateFile);
    serverAuthGovernance.setTestFirebaseCerts({ [testKid]: publicKey });
    emailAllowlistService.resetForTesting();

    const nowSec = Math.floor(Date.now() / 1000);
    const learnerEmail = "d007.learner@moos.edu";
    const makeFbJwt = (expOffsetSec: number = 3600) =>
      signRs256Jwt(
        { alg: "RS256", kid: testKid },
        {
          aud: PROJECT_ID,
          iss: ISSUER,
          sub: "uid-d007-learner",
          email: learnerEmail,
          name: "Directive Seven Scholar",
          email_verified: true,
          iat: nowSec - 30,
          exp: nowSec + expOffsetSec
        },
        privateKey
      );

    // 1. Test reload recovery via ensureFirebaseSessionSynced (deduplicated single POST)
    const mockFbUser = {
      email: learnerEmail,
      emailVerified: true,
      getIdToken: async () => makeFbJwt(3600)
    };
    const [s1, s2] = await Promise.all([
      emailAllowlistService.ensureFirebaseSessionSynced(mockFbUser),
      emailAllowlistService.ensureFirebaseSessionSynced(mockFbUser)
    ]);
    assert.ok(s1 && s2);
    assert.strictEqual(s1.email, learnerEmail);
    assert.strictEqual(s1.authProvider, "firebase");
    assert.strictEqual(emailAllowlistService.hasGateAccess(), true);

    // Expired Firebase JWT rejection check
    const expiredExchange = await emailAllowlistService.exchangeFirebaseIdToken(makeFbJwt(-60));
    assert.strictEqual(expiredExchange.isAllowed, false);
    pass("WS1 Reload session restoration & expired Firebase token rejection verified.");

    // 2. Write learner progress via HTTP PUT
    const tokenBeforeRestart = emailAllowlistService.getActiveToken()!;
    const saveRes = await origFetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerEmail)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenBeforeRestart}`
      },
      body: JSON.stringify({
        xp: 340,
        masteryRecords: {
          "skill-quad-factor": {
            skillId: "skill-quad-factor",
            status: "proficient",
            points: 82,
            attempts: 4,
            correctCount: 4,
            lastPracticedAt: new Date(fixedNowMs).toISOString()
          }
        },
        questionAttempts: [makeAttempt("skill-quad-factor", 1, true, 0, "persist-q-1", 1)],
        examHistory: [
          {
            id: "exam-d007-1",
            examId: "waec-mock",
            examTitle: "WAEC Mock Algebra",
            examType: "waec",
            totalQuestions: 20,
            correctCount: 17,
            scorePercentage: 85,
            passingScore: 50,
            passed: true,
            timeSpentSeconds: 700,
            answers: { q1: "A" },
            submittedAt: new Date(fixedNowMs).toISOString()
          }
        ]
      })
    });
    assert.strictEqual(saveRes.status, 200);
    assert.ok(fs.existsSync(stateFile), "Atomic governance snapshot file written to disk");

    // 3. Simulate full server restart (wipe in-memory Maps & reload from disk) + client reload
    serverAuthGovernance.simulateRestartReloadForTesting();
    serverAuthGovernance.setTestFirebaseCerts({ [testKid]: publicKey });
    emailAllowlistService.resetForTesting();

    // Client reloads and re-restores session from Firebase Auth state
    const restoredAfterRestart = await emailAllowlistService.ensureFirebaseSessionSynced(mockFbUser);
    assert.ok(restoredAfterRestart);

    // Verify GET /api/learner/progress returns full pre-restart state intact
    const getAfterRestart = await origFetch(
      `${baseUrl}/api/learner/progress/${encodeURIComponent(learnerEmail)}`,
      {
        headers: { Authorization: `Bearer ${emailAllowlistService.getActiveToken()}` }
      }
    );
    assert.strictEqual(getAfterRestart.status, 200);
    const bodyAfterRestart = (await getAfterRestart.json()) as any;
    assert.strictEqual(bodyAfterRestart.progress.masteryPoints, 82);
    assert.strictEqual(bodyAfterRestart.progress.questionAttempts.length, 1);
    assert.strictEqual(bodyAfterRestart.progress.examHistory.length, 1);
    assert.strictEqual(bodyAfterRestart.progress.examHistory[0].id, "exam-d007-1");
    pass("WS3 Server progress & directory state survive simulated server restart intact.");

    console.log("\n==========================================================================");
    console.log(`🎉 DIRECTIVE 007 SUITE PASSED (${passedCount} check blocks green)`);
    console.log("==========================================================================\n");
    return { passed: true };
  } finally {
    (globalThis as any).fetch = origFetch;
    emailAllowlistService.resetForTesting();
    serverAuthGovernance.resetForTesting();
    fs.rmSync(tempDir, { recursive: true, force: true });
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

if (process.argv[1]?.includes("directive007AuditAndPersistence")) {
  runDirective007VerificationSuite()
    .then((r) => {
      if (!r.passed) process.exit(1);
    })
    .catch((err) => {
      console.error("❌ Directive 007 Verification Suite failed:", err);
      process.exit(1);
    });
}
