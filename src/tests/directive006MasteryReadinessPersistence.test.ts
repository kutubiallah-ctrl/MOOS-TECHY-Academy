/**
 * MOOS ACADEMY — DIRECTIVE 006 ACCEPTANCE & ARCHITECTURE VERIFICATION SUITE
 *
 * Verifies all 10+ mandatory Directive 006 acceptance criteria:
 *  1. Completion without accuracy does not grant proficiency or mastery
 *  2. 4-state reversible progression (introduced -> practising -> proficient -> mastered) on independent accuracy
 *  3. Assisted accuracy (with hints) weighted below independent accuracy & cannot earn full mastery
 *  4. Reversibility: subsequent failures downgrade mastery score and state
 *  5. Zero double-counting of masteryPoints across recordActivity / practice / play / diagnostics
 *  6. Genuine Exam Readiness returns insufficient_data when evidence is sparse (zero synthetic fallbacks)
 *  7. Multi-subject Exam Readiness reflects active selected subjects across ALL_CURRICULUM_UNITS
 *  8. Question attempts persist across reload & re-authentication via /api/learner/progress
 *  9. Exam submissions persist without duplication or destructive overwrite on concurrent/stale syncs
 * 10. Cross-account and unauthenticated progress access strictly rejected (401 / 403)
 * 11. Offline progress updates queued in localStorage and flushed cleanly upon reconnect
 */

import { strict as assert } from "assert";
import crypto from "crypto";
import type { Server } from "http";
import { serverAuthGovernance } from "../../server/authGovernance";
import { ALL_CURRICULUM_UNITS } from "../data/extendedCurriculumUnits";
import { DEFAULT_EXTENDED_LEARNER_PROFILE } from "../data/curriculumData";
import { ExtendedLearnerProfile, QuestionAttempt } from "../types/learner";
import {
  computeHintCredit,
  computeTotalMasteryPoints,
  evaluateSkillMastery
} from "../services/masteryEngine";
import { AnalyticsService } from "../services/analyticsService";
import { LocalLearnerRepository } from "../services/repositories/localRepositories";
import { emailAllowlistService } from "../services/emailAllowlistService";
import { progressSyncCoordinator } from "../services/progressSyncCoordinator";
import { mergeLearnerProfiles } from "../services/progressMerge";

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

function installMockBrowserEnvironment() {
  const store = new Map<string, string>();
  const onlineState = { value: true };
  const listeners = new Map<string, Array<() => void>>();

  const mockLocalStorage = {
    getItem(k: string) {
      return store.has(k) ? store.get(k)! : null;
    },
    setItem(k: string, v: string) {
      store.set(k, String(v));
    },
    removeItem(k: string) {
      store.delete(k);
    },
    clear() {
      store.clear();
    }
  };

  (globalThis as any).localStorage = mockLocalStorage;
  (globalThis as any).window = {
    localStorage: mockLocalStorage,
    addEventListener(evt: string, fn: () => void) {
      const list = listeners.get(evt) || [];
      list.push(fn);
      listeners.set(evt, list);
    },
    removeEventListener(evt: string, fn: () => void) {
      const list = listeners.get(evt) || [];
      listeners.set(evt, list.filter((f) => f !== fn));
    },
    dispatchEvent(evt: { type: string }) {
      const list = listeners.get(evt.type) || [];
      list.forEach((fn) => fn());
    }
  };

  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: {
      get onLine() {
        return onlineState.value;
      }
    }
  });

  return {
    store,
    setOnline(v: boolean) {
      onlineState.value = v;
    }
  };
}

function makeAttempt(
  skillId: string,
  index: number,
  isCorrect: boolean,
  hintsUsedCount: number,
  questionId?: string,
  minutesAgo: number = 0
): QuestionAttempt {
  return {
    id: `att-${skillId}-${index}-${Math.random().toString(36).slice(2, 6)}`,
    questionId: questionId || `q-${skillId}-${(index % 4) + 1}`,
    skillId,
    selectedOption: isCorrect ? "correct" : "wrong",
    isCorrect,
    hintsUsedCount,
    timeSpentSeconds: 35,
    timestamp: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
    provenance: "OFFICIAL_SYLLABUS",
    isAiGenerated: false
  };
}

function makeBlankProfile(overrides: Partial<ExtendedLearnerProfile> = {}): ExtendedLearnerProfile {
  const now = new Date().toISOString();
  return {
    ...DEFAULT_EXTENDED_LEARNER_PROFILE,
    id: "learner-clean-test",
    name: "Clean Learner",
    email: "clean.learner@moos.edu",
    role: "learner",
    masteryPoints: 0,
    xp: 0,
    level: 1,
    totalStudyMinutes: 0,
    diagnosticsCompleted: false,
    lastDiagnosticResult: undefined,
    diagnosticHistory: [],
    masteryRecords: {},
    questionAttempts: [],
    activityHistory: [],
    examHistory: [],
    unlockedBadges: [],
    selectedSubjectIds: ["math_core"],
    activeSubjectId: "math_core",
    syncRevision: 0,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

async function startEphemeralAppServer(): Promise<{ server: Server; baseUrl: string }> {
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

export async function runDirective006AcceptanceSuite(): Promise<{ passed: boolean }> {
  console.log("==========================================================================");
  console.log("🎯 MOOS ACADEMY — DIRECTIVE 006 ACCEPTANCE & ARCHITECTURE VERIFICATION");
  console.log("==========================================================================\n");

  const browser = installMockBrowserEnvironment();
  let checksPassed = 0;
  function pass(msg: string) {
    checksPassed++;
    console.log(`  ✅ [PASS] ${msg}`);
  }

  // -------------------------------------------------------------------------
  // Scenario 1: Completion without accuracy never awards proficiency/mastery
  // -------------------------------------------------------------------------
  {
    const skillId = "skill-d006-zero-acc";
    const attempts: QuestionAttempt[] = [];
    for (let i = 0; i < 10; i++) {
      attempts.push(makeAttempt(skillId, i, false, 0, `q-zero-${i}`, 10 - i));
    }
    const rec = evaluateSkillMastery({ skillId, attempts });
    assert.strictEqual(rec.points, 0, "10 incorrect attempts must yield 0 mastery points");
    assert.strictEqual(rec.status, "introduced", "0% accuracy across 10 attempts stays 'introduced'");
    assert.notStrictEqual(rec.status, "proficient");
    assert.notStrictEqual(rec.status, "mastered");
    pass("Scenario 1: 10 incorrect completions yield points=0 and status='introduced' (no inflation).");
  }

  // -------------------------------------------------------------------------
  // Scenario 2: 4-state progression with independent accuracy across distinct Qs
  // -------------------------------------------------------------------------
  {
    const skillId = "skill-d006-indep";
    const attempts: QuestionAttempt[] = [makeAttempt(skillId, 1, true, 0, "q-1", 60)];
    let rec = evaluateSkillMastery({ skillId, attempts });
    assert.strictEqual(rec.status, "introduced", "1st independent attempt must be 'introduced'");
    assert.ok(rec.points <= 35, `Single attempt points (${rec.points}) capped at <= 35`);

    attempts.unshift(makeAttempt(skillId, 2, true, 0, "q-2", 50));
    rec = evaluateSkillMastery({ skillId, attempts });
    assert.strictEqual(rec.status, "practising", "2 independent attempts across 2 Qs -> 'practising'");

    attempts.unshift(makeAttempt(skillId, 3, true, 0, "q-2", 40));
    attempts.unshift(makeAttempt(skillId, 4, true, 0, "q-3", 30));
    rec = evaluateSkillMastery({ skillId, attempts });
    assert.strictEqual(rec.status, "proficient", "4 independent attempts across >=2 distinct Qs -> 'proficient'");
    assert.ok(rec.points >= 72, `Proficient score (${rec.points}) >= 72`);

    attempts.unshift(makeAttempt(skillId, 5, true, 0, "q-3", 20));
    attempts.unshift(makeAttempt(skillId, 6, true, 0, "q-4", 10));
    rec = evaluateSkillMastery({ skillId, attempts });
    assert.strictEqual(rec.status, "mastered", "6 independent attempts across >=3 distinct Qs -> 'mastered'");
    assert.strictEqual(rec.points, 100, "100% independent accuracy over >=6 attempts yields 100");
    pass("Scenario 2: Independent accuracy progresses cleanly through introduced -> practising -> proficient -> mastered.");
  }

  // -------------------------------------------------------------------------
  // Scenario 3: Assisted accuracy (hints used) weighted lower & capped below mastered
  // -------------------------------------------------------------------------
  {
    assert.ok(computeHintCredit(true, 0) === 1.0);
    assert.ok(computeHintCredit(true, 1) < computeHintCredit(true, 0));
    assert.ok(computeHintCredit(true, 2) < computeHintCredit(true, 1));
    assert.ok(computeHintCredit(false, 0) === 0);

    const skillInd = "skill-d006-cmp-ind";
    const skillHeavyHint = "skill-d006-cmp-hint2";
    const skillSingleHint = "skill-d006-cmp-hint1";

    const indAttempts = Array.from({ length: 8 }, (_, i) =>
      makeAttempt(skillInd, i, true, 0, `q-${i}`, 8 - i)
    );
    const heavyHintAttempts = Array.from({ length: 8 }, (_, i) =>
      makeAttempt(skillHeavyHint, i, true, 2, `q-${i}`, 8 - i)
    );
    const oneHintAttempts = Array.from({ length: 8 }, (_, i) =>
      makeAttempt(skillSingleHint, i, true, 1, `q-${i}`, 8 - i)
    );

    const rInd = evaluateSkillMastery({ skillId: skillInd, attempts: indAttempts });
    const rHeavy = evaluateSkillMastery({ skillId: skillHeavyHint, attempts: heavyHintAttempts });
    const rOne = evaluateSkillMastery({ skillId: skillSingleHint, attempts: oneHintAttempts });

    assert.strictEqual(rInd.status, "mastered");
    assert.ok(rOne.points < rInd.points, `1-hint score (${rOne.points}) < independent (${rInd.points})`);
    assert.ok(rHeavy.points < rOne.points, `2-hint score (${rHeavy.points}) < 1-hint (${rOne.points})`);
    assert.strictEqual(
      rHeavy.status,
      "practising",
      "Assisted-only 2-hint solutions cannot become proficient/mastered"
    );
    assert.notStrictEqual(rOne.status, "mastered", "Assisted-only solutions cannot achieve mastered");
    pass("Scenario 3: Hint-assisted accuracy scores strictly below independent accuracy and blocks unearned mastery.");
  }

  // -------------------------------------------------------------------------
  // Scenario 4: Reversibility — mastered skill downgrades on subsequent errors
  // -------------------------------------------------------------------------
  {
    const skillId = "skill-d006-reversible";
    const timeline: QuestionAttempt[] = [
      makeAttempt(skillId, 1, true, 0, "q-r-1", 100),
      makeAttempt(skillId, 2, true, 0, "q-r-2", 90),
      makeAttempt(skillId, 3, true, 0, "q-r-3", 80),
      makeAttempt(skillId, 4, true, 0, "q-r-1", 70),
      makeAttempt(skillId, 5, true, 0, "q-r-2", 60),
      makeAttempt(skillId, 6, true, 0, "q-r-3", 50)
    ];

    const masteredState = evaluateSkillMastery({ skillId, attempts: timeline });
    assert.strictEqual(masteredState.status, "mastered");
    assert.strictEqual(masteredState.points, 100);

    // Inject 2 consecutive failures -> must lose mastered status (reversible downgrade)
    timeline.unshift(makeAttempt(skillId, 7, false, 0, "q-r-4", 10));
    timeline.unshift(makeAttempt(skillId, 8, false, 0, "q-r-5", 5));
    const downgraded1 = evaluateSkillMastery({ skillId, attempts: timeline });
    assert.ok(downgraded1.points < 88, `Subsequent errors dropped points to ${downgraded1.points}`);
    assert.notStrictEqual(downgraded1.status, "mastered", "Must downgrade from mastered after consecutive failures");

    // Inject 3 more consecutive failures -> drops further to practising / introduced
    timeline.unshift(makeAttempt(skillId, 9, false, 0, "q-r-6", 3));
    timeline.unshift(makeAttempt(skillId, 10, false, 0, "q-r-7", 2));
    timeline.unshift(makeAttempt(skillId, 11, false, 0, "q-r-8", 1));
    const downgraded2 = evaluateSkillMastery({ skillId, attempts: timeline });
    assert.ok(
      downgraded2.status === "introduced" || downgraded2.status === "practising",
      `Repeated recent errors downgraded state to '${downgraded2.status}' (${downgraded2.points} pts)`
    );
    pass(`Scenario 4: Reversible progression verified (mastered 100 -> ${downgraded1.status} ${downgraded1.points} -> ${downgraded2.status} ${downgraded2.points}).`);
  }

  // -------------------------------------------------------------------------
  // Scenario 5: Zero double-counting of masteryPoints in LocalLearnerRepository
  // -------------------------------------------------------------------------
  {
    browser.store.clear();
    emailAllowlistService.revokeCurrentSession();
    const repo = new LocalLearnerRepository();
    await repo.resetProfile();

    // Clear seeded mastery records so we test clean accumulation from scratch
    let p = await repo.getProfile();
    p.masteryRecords = {};
    p.questionAttempts = [];
    p.masteryPoints = 0;
    await repo.saveProfile(p);

    const skillId = "skill-quad-factor";
    for (let i = 0; i < 6; i++) {
      p = await repo.recordQuestionAttempt(p.id, {
        questionId: `dc-q-${i}`,
        skillId,
        selectedOption: "correct",
        isCorrect: true,
        hintsUsedCount: 0,
        timeSpentSeconds: 30,
        provenance: "OFFICIAL_SYLLABUS",
        isAiGenerated: false
      });
    }
    const authoritativeBeforeActivity = computeTotalMasteryPoints(p.masteryRecords);
    assert.strictEqual(p.masteryPoints, authoritativeBeforeActivity);

    // Repeatedly record practice/play/diagnostic activities even passing non-zero legacy pointsEarned
    p = await repo.recordActivity(p.id, {
      type: "practice",
      title: "Practice Replay 1",
      description: "Test replay",
      pointsEarned: 50,
      xpEarned: 50,
      metadata: { skillId }
    });
    p = await repo.recordActivity(p.id, {
      type: "practice",
      title: "Practice Replay 2",
      description: "Test replay",
      pointsEarned: 75,
      xpEarned: 50,
      metadata: { skillId }
    });
    p = await repo.recordDiagnostic(p.id, {
      score: 4,
      total: 5,
      percentage: 80,
      tier: "Proficient",
      summary: "Strong baseline algebraic reasoning.",
      strengths: ["Algebra"],
      gapAreas: [],
      recommendedStartingUnit: "unit-mth-ss1-01",
      pathwaySteps: [],
      completedAt: new Date().toISOString()
    });
    p = await repo.recalculateSkillMastery(p.id, skillId);

    assert.strictEqual(
      p.masteryPoints,
      computeTotalMasteryPoints(p.masteryRecords),
      "masteryPoints must strictly equal canonical sum of masteryRecords (zero double-counting)"
    );
    assert.strictEqual(p.masteryPoints, authoritativeBeforeActivity);
    pass("Scenario 5: Zero masteryPoints double-counting across repeated recordActivity/diagnostic/recalculate calls.");
  }

  // -------------------------------------------------------------------------
  // Scenario 6 & 7: Genuine Exam Readiness (insufficient_data vs multi-subject)
  // -------------------------------------------------------------------------
  {
    const sparseProfile = makeBlankProfile({
      questionAttempts: [makeAttempt("skill-quad-factor", 1, true, 0, "q1", 5)]
    });
    const sparseReadiness = AnalyticsService.calculateExamReadiness(sparseProfile);
    assert.strictEqual(
      sparseReadiness.readinessCategory,
      "insufficient_data",
      "Sparse profile must explicitly report 'insufficient_data'"
    );
    assert.strictEqual(sparseReadiness.hasSufficientEvidence, false);
    assert.strictEqual(sparseReadiness.readinessScore, 0);

    const sparseMetrics = AnalyticsService.calculateDashboardMetrics(sparseProfile);
    assert.strictEqual(sparseMetrics.weeklyMinutes, 0, "No synthetic 195-minute fallback allowed");
    assert.strictEqual(sparseMetrics.accuracyRate, 100, "Real single correct attempt accuracy=100, not fake 84%");
    const zeroAttemptMetrics = AnalyticsService.calculateDashboardMetrics(makeBlankProfile());
    assert.strictEqual(zeroAttemptMetrics.accuracyRate, 0, "Zero attempts yields accuracyRate=0, not fake 84%");
    assert.strictEqual(zeroAttemptMetrics.strengths.length, 0, "No fake default strengths when unassessed");
    assert.strictEqual(zeroAttemptMetrics.weaknesses.length, 0, "No fake default weaknesses when unassessed");
    pass("Scenario 6: Sparse learner returns readinessCategory='insufficient_data' with zero synthetic fallbacks.");

    // Multi-subject learner picking Physics + English
    const physicsUnit = ALL_CURRICULUM_UNITS.find((u) => u.subjectId === "sci_physics");
    const englishUnit = ALL_CURRICULUM_UNITS.find((u) => u.subjectId === "lang_english");
    const mathUnit = ALL_CURRICULUM_UNITS.find((u) => u.subjectId === "math_core");
    assert.ok(physicsUnit && englishUnit && mathUnit, "Physics, English, Math units must exist in ALL_CURRICULUM_UNITS");

    const physicsSkill = physicsUnit.skills[0];
    const englishSkill = englishUnit.skills[0];
    const mathSkill = mathUnit.skills[0];

    const multiAttempts: QuestionAttempt[] = [];
    for (const sId of [physicsSkill.id, englishSkill.id, mathSkill.id]) {
      for (let i = 0; i < 6; i++) {
        multiAttempts.push(makeAttempt(sId, i, true, 0, `${sId}-q-${i}`, 6 - i));
      }
    }

    const multiProfile = makeBlankProfile({
      selectedSubjectIds: ["math_core", "sci_physics", "lang_english"],
      activeSubjectId: "sci_physics",
      targetLevel: physicsUnit.level,
      questionAttempts: multiAttempts,
      masteryRecords: {
        [physicsSkill.id]: evaluateSkillMastery({ skillId: physicsSkill.id, attempts: multiAttempts }),
        [englishSkill.id]: evaluateSkillMastery({ skillId: englishSkill.id, attempts: multiAttempts }),
        [mathSkill.id]: evaluateSkillMastery({ skillId: mathSkill.id, attempts: multiAttempts })
      },
      examHistory: [
        {
          id: "exam-multi-1",
          examId: "mock-exam-1",
          examTitle: "Multi-Subject CBT Check",
          examType: "mock_exam",
          totalQuestions: 20,
          correctCount: 16,
          scorePercentage: 80,
          passingScore: 50,
          passed: true,
          timeSpentSeconds: 900,
          answers: {},
          submittedAt: new Date().toISOString()
        }
      ]
    });

    const multiReadiness = AnalyticsService.calculateExamReadiness(multiProfile);
    assert.strictEqual(multiReadiness.hasSufficientEvidence, true);
    assert.notStrictEqual(multiReadiness.readinessCategory, "insufficient_data");
    assert.ok(
      multiReadiness.evaluatedSubjects.includes("sci_physics") &&
        multiReadiness.evaluatedSubjects.includes("lang_english"),
      `Evaluated subjects must reflect non-math selections: ${JSON.stringify(multiReadiness.evaluatedSubjects)}`
    );
    assert.ok(multiReadiness.readinessScore > 0, "Multi-subject evidence must produce non-zero readiness score");
    pass("Scenario 7: Multi-subject Exam Readiness pulls live coverage from ALL_CURRICULUM_UNITS across selected subjects.");
  }

  // -------------------------------------------------------------------------
  // Scenarios 8, 9, 10, 11: Real Server API Persistence, Reload/Re-Auth,
  // Conflict/Idempotency, Cross-Account Isolation & Offline Queue Flush
  // -------------------------------------------------------------------------
  serverAuthGovernance.resetForTesting();
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  });
  const testKid = "d006-rsa-kid";
  const { server, baseUrl } = await startEphemeralAppServer();

  try {
    serverAuthGovernance.setTestFirebaseCerts({ [testKid]: publicKey });
    progressSyncCoordinator.setApiBaseUrlForTesting(baseUrl);
    progressSyncCoordinator.clearPendingQueueForTesting();

    const nowSec = Math.floor(Date.now() / 1000);
    const learnerAEmail = "adaobi.eze@moos.edu";
    const learnerBEmail = "tunde.bakare@moos.edu";

    const issueLearnerSession = async (email: string, sub: string, name: string) => {
      const fbJwt = signRs256Jwt(
        { alg: "RS256", kid: testKid },
        {
          aud: PROJECT_ID,
          iss: ISSUER,
          sub,
          email,
          name,
          email_verified: true,
          iat: nowSec - 10,
          exp: nowSec + 3600
        },
        privateKey
      );
      const res = await fetch(`${baseUrl}/api/auth/firebase-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: fbJwt })
      });
      assert.strictEqual(res.status, 200);
      return (await res.json()) as any;
    };

    const sessionA = await issueLearnerSession(learnerAEmail, "uid-adaobi", "Adaobi Eze");
    const sessionB = await issueLearnerSession(learnerBEmail, "uid-tunde", "Tunde Bakare");

    // Set Learner A active client session cleanly
    (emailAllowlistService as any).setVerifiedSession(sessionA.serverVerificationToken, sessionA.session);

    browser.store.clear();
    browser.setOnline(true);
    let repo = new LocalLearnerRepository();
    let profileA = await repo.getProfile();
    assert.strictEqual(profileA.email, learnerAEmail);
    assert.strictEqual(profileA.masteryPoints, 0, "Newly authenticated account starts clean (0 points)");

    // Scenario 8: Question attempts synced to backend & surviving reload + re-authentication
    for (let i = 0; i < 4; i++) {
      profileA = await repo.recordQuestionAttempt(profileA.id, {
        questionId: `persist-q-${i}`,
        skillId: "skill-quad-factor",
        selectedOption: "x = 2 or x = 3",
        isCorrect: true,
        hintsUsedCount: 0,
        timeSpentSeconds: 40,
        provenance: "OFFICIAL_SYLLABUS",
        isAiGenerated: false
      });
    }
    assert.strictEqual(profileA.masteryRecords["skill-quad-factor"]?.status, "proficient");
    const savedPointsBeforeReload = profileA.masteryPoints;

    // Scenario 9: Exam submission saved to backend
    profileA = await repo.recordExamSubmission(profileA.id, {
      examId: "waec-sim-2026",
      examTitle: "WAEC Quantitative Simulation",
      examType: "waec",
      totalQuestions: 25,
      correctCount: 21,
      scorePercentage: 84,
      passingScore: 50,
      passed: true,
      timeSpentSeconds: 1200,
      answers: { q1: "A", q2: "C" }
    });
    const savedExamId = profileA.examHistory![0].id;
    const savedAttemptIds = new Set(profileA.questionAttempts!.map((a) => a.id));

    // Simulate complete browser wipe + reload + re-authentication as Learner A
    browser.store.clear();
    emailAllowlistService.revokeCurrentSession();
    const reauthA = await issueLearnerSession(learnerAEmail, "uid-adaobi", "Adaobi Eze");
    (emailAllowlistService as any).setVerifiedSession(reauthA.serverVerificationToken, reauthA.session);

    const freshRepoAfterReload = new LocalLearnerRepository();
    const hydratedA = await freshRepoAfterReload.hydrateFromRemote();

    assert.strictEqual(hydratedA.masteryPoints, savedPointsBeforeReload, "Mastery points restored after reload & re-auth");
    assert.strictEqual(hydratedA.masteryRecords["skill-quad-factor"]?.status, "proficient");
    assert.strictEqual(hydratedA.questionAttempts?.length, 4, "All 4 question attempts restored after reload");
    for (const id of savedAttemptIds) {
      assert.ok(hydratedA.questionAttempts?.some((a) => a.id === id), `Attempt ${id} restored`);
    }
    assert.strictEqual(hydratedA.examHistory?.length, 1, "Exam submission restored after reload");
    assert.strictEqual(hydratedA.examHistory?.[0].id, savedExamId);

    // Re-syncing same payload again must NOT duplicate examHistory or questionAttempts (idempotency)
    const afterResync = await freshRepoAfterReload.hydrateFromRemote();
    assert.strictEqual(afterResync.questionAttempts?.length, 4, "Idempotent re-hydration preserves attempt count=4");
    assert.strictEqual(afterResync.examHistory?.length, 1, "Idempotent re-hydration preserves examHistory count=1");

    // Stale concurrent write conflict protection check (strictConflictCheck: true -> 409; non-strict merge -> protects newer state)
    const staleResStrict = await fetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerAEmail)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reauthA.serverVerificationToken}`
      },
      body: JSON.stringify({
        xp: 10,
        baseRevision: 0,
        strictConflictCheck: true
      })
    });
    assert.strictEqual(staleResStrict.status, 409, "Strict stale baseRevision write must return HTTP 409 Conflict");

    // Non-strict older timestamp write must NOT wipe existing newer examHistory or masteryRecords
    const mergedOlderCheck = mergeLearnerProfiles(afterResync, {
      xp: 0,
      masteryPoints: 0,
      masteryRecords: {},
      questionAttempts: [],
      examHistory: [],
      syncRevision: 0,
      updatedAt: "2020-01-01T00:00:00.000Z"
    });
    assert.strictEqual(mergedOlderCheck.questionAttempts?.length, 4, "Older snapshot cannot overwrite newer questionAttempts");
    assert.strictEqual(mergedOlderCheck.examHistory?.length, 1, "Older snapshot cannot overwrite newer examHistory");
    assert.strictEqual(mergedOlderCheck.masteryPoints, savedPointsBeforeReload, "Older snapshot cannot zero masteryPoints");
    pass("Scenarios 8 & 9: Question attempts + exam submissions survive reload & re-auth with idempotency and stale-write protection.");

    // Scenario 10: Unauthorized & Cross-Account Access Rejection (401 / 403)
    const unauthGet = await fetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerAEmail)}`);
    assert.strictEqual(unauthGet.status, 401, "Unauthenticated GET progress must reject with 401");

    const unauthPut = await fetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerAEmail)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xp: 999 })
    });
    assert.strictEqual(unauthPut.status, 401, "Unauthenticated PUT progress must reject with 401");

    const crossGet = await fetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerAEmail)}`, {
      headers: { Authorization: `Bearer ${sessionB.serverVerificationToken}` }
    });
    assert.strictEqual(crossGet.status, 403, "Cross-account GET progress must reject with 403 Forbidden");

    const crossPut = await fetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerAEmail)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionB.serverVerificationToken}`
      },
      body: JSON.stringify({ xp: 9999 })
    });
    assert.strictEqual(crossPut.status, 403, "Cross-account PUT progress must reject with 403 Forbidden");
    pass("Scenario 10: Unauthenticated (401) & cross-account (403) progress access strictly blocked.");

    // Scenario 11: Offline queue & reconnect reconciliation
    browser.setOnline(false);
    let offlineProfile = await freshRepoAfterReload.recordQuestionAttempt(hydratedA.id, {
      questionId: "persist-q-offline-5",
      skillId: "skill-quad-factor",
      selectedOption: "x = 5",
      isCorrect: true,
      hintsUsedCount: 0,
      timeSpentSeconds: 30,
      provenance: "OFFICIAL_SYLLABUS",
      isAiGenerated: false
    });
    offlineProfile = await freshRepoAfterReload.recordQuestionAttempt(offlineProfile.id, {
      questionId: "persist-q-offline-6",
      skillId: "skill-quad-factor",
      selectedOption: "x = 7",
      isCorrect: true,
      hintsUsedCount: 0,
      timeSpentSeconds: 30,
      provenance: "OFFICIAL_SYLLABUS",
      isAiGenerated: false
    });

    assert.strictEqual(offlineProfile.questionAttempts?.length, 6, "Local offline state captures 6th attempt immediately");
    assert.strictEqual(
      offlineProfile.masteryRecords["skill-quad-factor"]?.status,
      "mastered",
      "6 independent attempts across distinct Qs offline promotes to mastered locally"
    );
    const pendingQueue = progressSyncCoordinator.getPendingSyncQueue();
    assert.strictEqual(pendingQueue.length, 1, "Offline mutation queued reliably in localStorage pending queue");

    // Reconnect online -> flush queue cleanly -> confirm server receives offline updates & queue empties
    browser.setOnline(true);
    const flushRes = await progressSyncCoordinator.flushPendingSync();
    assert.strictEqual(flushRes.flushedCount, 1, "Pending offline snapshot flushed upon reconnect");
    assert.strictEqual(progressSyncCoordinator.getPendingSyncQueue().length, 0, "Pending queue cleared after sync");

    // Verify server persisted offline attempts directly via GET
    const serverCheckRes = await fetch(`${baseUrl}/api/learner/progress/${encodeURIComponent(learnerAEmail)}`, {
      headers: { Authorization: `Bearer ${reauthA.serverVerificationToken}` }
    });
    assert.strictEqual(serverCheckRes.status, 200);
    const serverCheckJson = (await serverCheckRes.json()) as any;
    assert.strictEqual(serverCheckJson.progress.questionAttempts.length, 6, "Server now holds all 6 attempts including offline ones");
    assert.strictEqual(serverCheckJson.progress.masteryRecords["skill-quad-factor"]?.status, "mastered");
    pass("Scenario 11: Offline mutations queued locally and reconciled cleanly to server upon reconnect.");

    console.log("\n==========================================================================");
    console.log(`🎉 DIRECTIVE 006 ACCEPTANCE SUITE PASSED (${checksPassed} check blocks green)`);
    console.log("==========================================================================\n");
    return { passed: true };
  } finally {
    progressSyncCoordinator.setApiBaseUrlForTesting(null);
    progressSyncCoordinator.clearPendingQueueForTesting();
    emailAllowlistService.revokeCurrentSession();
    serverAuthGovernance.resetForTesting();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

if (process.argv[1]?.includes("directive006MasteryReadinessPersistence")) {
  runDirective006AcceptanceSuite()
    .then((r) => {
      if (!r.passed) process.exit(1);
    })
    .catch((err) => {
      console.error("❌ Directive 006 Acceptance Suite failed:", err);
      process.exit(1);
    });
}
