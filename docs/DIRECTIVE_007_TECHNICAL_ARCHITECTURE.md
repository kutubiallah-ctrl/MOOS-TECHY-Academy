# MOOS Academy — Learner Intelligence, Persistence & Security Architecture

> **Source of Truth:** This document describes the **actual implemented code** across MOOS Academy as audited and hardened under **Directive 007** (28 November 2026). Every formula, constant, endpoint, and storage boundary below corresponds directly to runtime modules in this repository.

---

## 1. Authentic Mastery Calculation Methodology (`src/services/masteryEngine.ts`)

Authoritative skill mastery is computed by `evaluateSkillMastery({ skillId, attempts, existingRecord, nowMs })` and shared across `PracticeArena`, `LocalLearnerRepository` (`storageService`), and `AnalyticsService`. Legacy direct updates without attempt rows fall back to `evaluateDirectMasteryUpdate(...)`, while `computeTotalMasteryPoints(masteryRecords)` computes `profile.masteryPoints` exclusively as the bounded sum (`0..100` per skill) of `masteryRecords` values—eliminating activity/play double-counting.

### 1.1 Attempt Ordering & Recency Decay
1. Matching attempts (`attempt.skillId === skillId`) are sorted **newest first** by `timestamp` (breaking equal timestamps by array index, since new attempts are prepended at index `0`).
2. Each attempt at rank `rank` (0 = newest) receives:
   - **Index decay:** `0.82 ^ rank` (`MASTERY_THRESHOLDS.INDEX_DECAY_FACTOR = 0.82`)
   - **Time half-life decay:** `0.5 ^ (ageDays / 45)` (`MASTERY_THRESHOLDS.HALF_LIFE_DAYS = 45`)
3. **Anti-repeat-farming dampening (chronological pass, oldest → newest):**
   - Repeated **incorrect** attempts retain factor `1.0` (diagnostic failures are never discounted).
   - For repeated **correct** attempts on the same `questionId`, marginal weight decays exponentially using `REPEAT_CORRECT_DAMPENING = 0.35`:
     `repeatFactor = priorCorrect === 0 ? 1.0 : 0.35 ^ priorCorrect`.
   - Combined weight per attempt: `max(minFloor, indexDecay * timeDecay * repeatFactor)`, where `minFloor` is `0.02` for repeat-dampened solves and `0.05` otherwise.
   - `weightedScore = (sum(credit * weight) / sum(weight)) * 100`.

### 1.2 Rolling Recent Assessment Window (`RECENT_WINDOW_SIZE = 5`)
- Constructed newest-first from `matching` up to 5 entries.
- **Anti-eviction guard:** Within the 5-item window, all incorrect attempts are included, while **at most one correct attempt per `questionId`** (its newest solve) is admitted. Replaying a previously solved question repeatedly cannot push recent errors out of the rolling 5-item window.
- Within `recentSlice`, entry `idx` (`0..4`) receives decay `0.88 ^ idx`:
  - `recentWeightedScore = (sum(credit * 0.88^idx) / sum(0.88^idx)) * 100`
  - `recentRawAccuracy = recentCorrect / recentSlice.length`

### 1.3 Distinct-Question Variety & Determinism
- `distinctQuestionsCount`: count of unique `questionId`s attempted for the skill.
- `distinctIndependentQuestionsCount`: count of unique `questionId`s solved correctly with `hintsUsedCount === 0`.
- Given identical `attempts`, `skillId`, and `nowMs`, `evaluateSkillMastery` is deterministic.

---

## 2. Hint-Weighting Rules (`computeHintCredit`)

Hints never apply negative penalties; instead, scaffolded correctness yields scaled fractional credit and is **excluded** from `independentCorrectCount` and `distinctIndependentQuestionsCount`:

| Attempt Outcome | `hintsUsedCount` | Credit (`computeHintCredit`) | Counts as Independent Correct? |
| :--- | :--- | :--- | :--- |
| Incorrect (`isCorrect === false`) | Any | `0.00` | No |
| Correct | `0` | `1.00` (`HINT_CREDIT_0`) | Yes |
| Correct | `1` | `0.72` (`HINT_CREDIT_1`) | No |
| Correct | `2` | `0.50` (`HINT_CREDIT_2`) | No |
| Correct | `3+` | `0.35` (`HINT_CREDIT_3_PLUS`) | No |

Additionally, in the `>= 4` attempts branch, if `independentCorrectCount < 2` (`MIN_INDEPENDENT_CORRECT_FOR_PROFICIENT`), `points` are capped at **`59`** (`assistedCap`) and status cannot advance past `practising`.

---

## 3. Canonical Learner Proficiency States & Thresholds

Legacy statuses such as `"familiar"` are mapped via `normalizeMasteryStatus(status, points)` into the canonical 4 active states (`introduced`, `practising`, `proficient`, `mastered`) plus `unstarted`. UI legends and badges (`MasteryHeatmap`, `CurriculumNavigator`, `PracticeArena`, `LearnerContext`) read from these helpers.

| State | Exact Entry Criteria (`evaluateSkillMastery`) | Point Range (`0..100`) |
| :--- | :--- | :--- |
| **Unstarted** | `attempts === 0` | `0` |
| **Introduced** | `correctCount === 0` (`points = 0`), **OR** `totalAttempts === 1` (`<= 35`), **OR** `distinctQuestionsCount === 1` (`<= 37`), **OR** `combinedScore < 38` and `recentWeightedScore < 45` | `0 – 37` |
| **Practising** | `distinctQuestionsCount >= 2` and (`combinedScore >= 38` or `recentWeightedScore >= 45`), without meeting Proficient/Mastered gates | `38 – 69` (`<= 59` if `< 2` independent correct; `<= 68` for 2–3 attempts) |
| **Proficient** | `totalAttempts >= 4`, `independentCorrectCount >= 2`, `distinctQuestionsCount >= 2`, `distinctIndependentQuestionsCount >= 2`, `weightedScore >= 72`, `recentWeightedScore >= 68`, `recentRawAccuracy >= 0.70` | `72 – 89` |
| **Mastered** | `totalAttempts >= 6`, `independentCorrectCount >= 4`, `distinctQuestionsCount >= 3`, `distinctIndependentQuestionsCount >= 3`, `weightedScore >= 88`, `recentWeightedScore >= 85`, `recentRawAccuracy >= 0.80`, `independentShareOfCorrect >= 0.70` | `90 – 100` |

**Reversibility:** Every new attempt triggers full recalculation over the skill's attempt history. Subsequent failures lower `weightedScore`, `recentWeightedScore`, and `recentRawAccuracy`, downgrading `mastered` → `proficient` → `practising` → `introduced` whenever conditions cease to hold.

---

## 4. Genuine Examination Readiness Methodology (`src/services/analyticsService.ts`)

`AnalyticsService.calculateExamReadiness(profile)` evaluates active selected subjects (`selectedSubjectIds` + `activeSubjectId`) mapped onto `ALL_CURRICULUM_UNITS` (at `targetLevel`, supplemented across levels for selected subjects without units at `targetLevel`).

### 4.1 Insufficient Evidence Guard
If **none** of the following hold, readiness explicitly returns `readinessCategory = "insufficient_data"`, `hasSufficientEvidence = false`, and `readinessScore = 0` (zero synthetic fallbacks):
- `assessedSkillsCount >= 3`
- `attemptsInScope.length >= 3`
- `allAttemptsCount >= 5`
- `examHistory.length >= 1`
- `diagnosticsCompleted && assessedSkillsCount >= 1`

### 4.2 Readiness Score Formula (`0..100`)
- **Coverage Component (55%):** Each active syllabus skill contributes `1.0` (`proficient`/`mastered`), `0.35` (`practising`), or `0.10` (`introduced` with `points > 0`):
  `coverageComponent = min(100, round(partialCreditPoints / totalSkillsCount * 100)) * 0.55`.
- **Performance Component (40%):** Weighted blend of `recentExamAverageScore` (65% when paired with `weightedAttemptAccuracy`), hint-weighted attempt accuracy (35%, or 75%/25% with diagnostic score when no exams exist), or diagnostic percentage:
  `performanceComponent = performanceMetric * 0.40`.
- **Consistency Bonus (up to 5 points):** `assessedSkillsCount >= 3 && streakCount >= 2 ? min(streakCount, 5) : 0`.
- **Categories:**
  - `strong_readiness`: `score >= 85 && syllabusCoveragePercentage >= 75`
  - `ready`: `score >= 70 && syllabusCoveragePercentage >= 50`
  - `approaching_readiness`: `score >= 50`
  - `developing_readiness`: `score >= 25`
  - `not_ready`: `score < 25`

---

## 5. Progress Synchronisation & Conflict-Resolution Architecture

### 5.1 Multi-Layer Storage Topology
1. **Browser Working Cache (`localStorage`):** `LocalLearnerRepository` caches per-account profiles keyed by verified email (`moos_academy_profile_v1_<email>`).
2. **Express Backend State API (`/api/learner/progress/:accountEmail`):** Managed by `ServerAuthGovernance` (`server/authGovernance.ts`) with atomic JSON file snapshots persisted to `.data/moos-governance-state.json` (configurable via `MOOS_GOVERNANCE_STATE_PATH`) on directory and progress mutations.
   - *Operational caveat:* On ephemeral serverless containers (e.g., Cloud Run without attached persistent volumes), container-local `.data/` state resets across scale-to-zero recycles; durable multi-instance cloud persistence relies on Firestore `learnerProfiles/{uid}` when authenticated with Firebase.
3. **Firebase Cloud Firestore (`learnerProfiles/{uid}`):** Synced via `firebaseSyncService.syncLearnerProfileToCloud` targeting database `ai-studio-moostechyacademy-08157dac-f115-4378-87dc-fed1e0ada623` (`europe-west1`).

### 5.2 Conflict Resolution (`src/services/progressMerge.ts`)
`mergeLearnerProgressPayloads(existing, incoming)` enforces deterministic, idempotent merging:
- **Strict Revision Rejection:** When `strictConflictCheck: true` and `baseRevision < existing.syncRevision`, `saveLearnerProgress` rejects with HTTP `409 Conflict`.
- **Stale-Write Protection:** When `incoming.updatedAt < existing.updatedAt` or `baseRevision < existingRevision`, `staleWriteProtected = true`; scalar settings (`name`, `targetLevel`, `curriculum`, `activeUnitId`, `preferences`) retain the newer snapshot while collections are still union-merged safely.
- **Collection Deduplication:** `questionAttempts` (cap 300), `activityHistory` (cap 100), `examHistory` (cap 50), and `diagnosticHistory` (cap 30) deduplicate by record `id` (or timestamp/fingerprint) sorted newest-first.
- **Per-Skill Mastery Merge (`mergeMasteryRecords`):** Newer `lastPracticedAt` wins per `skillId`; equal timestamps prefer higher `attempts` count.
- **Monotonic Totals:** `masteryPoints` recomputes strictly via `computeTotalMasteryPoints(mergedMasteryRecords)`, and `totalStudyMinutes` takes `max(existing, incoming)`.

### 5.3 Offline Recovery (`src/services/progressSyncCoordinator.ts`)
- Mutations triggered while `!navigator.onLine`, or when server/Firestore writes fail transiently, are stored in `localStorage` under `moos_academy_pending_sync_v1` keyed by normalized `accountKey`.
- Window `"online"` events and `hydrateAndReconcileForSession` invoke `flushPendingSync()`, guarded by an `isFlushing` mutex and revision check (`clearPendingSnapshot` preserves entries if a newer `syncRevision` arrived while in flight).

---

## 6. Authentication & Account-Isolation Boundaries

1. **Public Entry (`EmailEntryGate.tsx`, `server/authGovernance.ts`):**
   - Passwordless email-only bypass is disabled (`verifyEmail` returns `INVALID_CREDENTIALS`).
   - `/api/auth/signup` verifies scrypt-hashed passwords and strictly rejects `role: "admin"` or `"owner"` (`403`).
   - `/api/auth/firebase-session` verifies Firebase RS256 ID tokens cryptographically against live Google X509 certificates (`securetoken@system.gserviceaccount.com`), enforcing `aud === "genial-bucksaw-wxctm"`, `iss === "https://securetoken.google.com/genial-bucksaw-wxctm"`, non-expired `exp`, and `email_verified === true`.
2. **Server Session Tokens & Reload Persistence (`App.tsx`, `Navbar.tsx`, `emailAllowlistService.ts`):**
   - Server sessions are HMAC-SHA256 signed (`payloadB64.sig`, 1-hour TTL, per-token `jti`), checked against an in-memory revocation list (`/api/auth/logout` invalidates immediately) and account `status === "ENABLED"`.
   - Bearer tokens stay in JS memory (never stored in `localStorage`). On page reload, `App.tsx` awaits `firebaseSyncService.waitForAuthReady()` and re-exchanges the persisted Firebase user's ID token via `emailAllowlistService.ensureFirebaseSessionSynced(user)`.
3. **API & Firestore Isolation:**
   - `GET /api/learner/progress/:accountEmail` permits access only if `session.email === normTarget || session.isOwner`; `PUT` restricts writes strictly to `session.email === normTarget`. Missing/invalid/revoked/expired tokens return `401`; cross-account attempts return `403`.
   - `firestore.rules` enforces `request.auth != null`, `request.auth.uid == userId` on `/users/{userId}` and `/learnerProfiles/{userId}`, role-escalation prevention, and verified owner-only governance on `/admins`, `/auditLogs`, and `/emailAllowlist`.
