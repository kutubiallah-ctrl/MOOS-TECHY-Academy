/**
 * MOOS TECHY ACADEMY — RUNTIME STABILITY & DATA CONTRACT FORENSICS
 * 
 * Target Forensic Suite verifying:
 * 1. Assignment data contract normalization (missing/null arrays, malformed JSON, legacy schemas).
 * 2. Repository hydration resilience against storage corruption, partial keys, and empty storage.
 * 3. Session switching & multi-tenant identity stability under stress.
 * 4. Error boundary resilience and recovery paths.
 */

import { TeacherStudioService } from "../services/teacherStudioService";
import { LocalLearnerRepository } from "../services/repositories/localRepositories";
import { IdentityService, SEEDED_LEARNER_USER, SEEDED_TEACHER_USER, SEEDED_ADMIN_USER } from "../services/identityService";
import { AuthorizationService } from "../services/authorizationService";
import { DEFAULT_EXTENDED_LEARNER_PROFILE } from "../data/curriculumData";
import { ClassroomAssignment } from "../types/teacherStudio";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    throw new Error(`Assertion Failed: ${message}`);
  }
  console.log(`✅ [PASS] ${message}`);
}

async function runRuntimeStabilityForensics() {
  console.log("==========================================================================");
  console.log("🧪 MOOS TECHY ACADEMY — RUNTIME STABILITY & DATA CONTRACT FORENSICS");
  console.log("==========================================================================");

  // --------------------------------------------------------------------------
  // Vector 1: Assignment Data Contract & Ingestion Normalization
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 1: Assignment Data Contract & Ingestion Normalization ---");

  // 1.1 Ingestion of completely null/empty object
  const normalizedNull = TeacherStudioService.normalizeAssignment(null);
  assert(Boolean(normalizedNull), "Null assignment input produces valid object");
  assert(Array.isArray(normalizedNull.targetLearnerIds), "targetLearnerIds is guaranteed array on null input");
  assert(Array.isArray(normalizedNull.completedLearnerIds), "completedLearnerIds is guaranteed array on null input");
  assert(typeof normalizedNull.learnerProgress === "object", "learnerProgress is guaranteed object on null input");

  // 1.2 Ingestion of legacy assignment missing targetLearnerIds & completedLearnerIds
  const legacyRaw = {
    id: "asg-legacy-001",
    title: "Legacy Assignment with no array fields",
    unitId: "unit-mth-ss1-03",
    skillId: "skill-quad-02",
    status: "active"
  };
  const normalizedLegacy = TeacherStudioService.normalizeAssignment(legacyRaw);
  assert(normalizedLegacy.id === "asg-legacy-001", "Preserves legacy assignment ID");
  assert(Array.isArray(normalizedLegacy.targetLearnerIds), "targetLearnerIds initialized to empty array");
  assert(Array.isArray(normalizedLegacy.completedLearnerIds), "completedLearnerIds initialized to empty array");
  assert(normalizedLegacy.targetLearnerIds.length === 0, "Empty targetLearnerIds signifies whole classroom");

  // 1.3 Safe filtering across unpopulated assignments
  const unpopulatedAsgs = [
    normalizedNull,
    normalizedLegacy,
    {
      id: "asg-corrupt",
      title: "Corrupt item",
      unitId: "unit-mth-ss1-03",
      skillId: "skill-quad-02",
      assignmentType: "practice",
      targetLearnerIds: null as any,
      completedLearnerIds: undefined as any,
      status: "active",
      provenance: "OFFICIAL_SYLLABUS",
      dueDate: "2026-09-08",
      createdAt: new Date().toISOString()
    } as unknown as ClassroomAssignment
  ];

  // 1.4 AI Authority & Sandboxed Provenance Preservation
  const aiDraftRaw = {
    id: "asg-ai-draft-001",
    title: "AI Generated Diagnostic Drill",
    unitId: "unit-mth-ss1-03",
    skillId: "skill-quad-02",
    status: "draft",
    provenance: "AI_GENERATED_DRAFT",
    isAiGenerated: true,
    generatorAgent: "assessment_agent"
  };
  const normalizedAiDraft = TeacherStudioService.normalizeAssignment(aiDraftRaw);
  assert(
    normalizedAiDraft.provenance === "AI_GENERATED_DRAFT",
    "AI generated assignment provenance is strictly preserved as sandboxed draft"
  );

  // Test filter that previously threw TypeError when targetLearnerIds or completedLearnerIds was undefined
  let filterSuccess = true;
  try {
    const activeForLearner = unpopulatedAsgs.map((a) => TeacherStudioService.normalizeAssignment(a)).filter(
      (a) =>
        a.status === "active" &&
        (!a.targetLearnerIds.length ||
          a.targetLearnerIds.includes("learner-001") ||
          a.targetLearnerIds.includes("demo-learner-01"))
    );
    assert(activeForLearner.length >= 2, "Defensive normalization allows safe filtering across all assignments");
  } catch (err) {
    filterSuccess = false;
  }
  assert(filterSuccess, "Assignment filter execution never throws TypeError");

  // --------------------------------------------------------------------------
  // Vector 2: LocalLearnerRepository Storage Resilience & Hydration
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 2: LocalLearnerRepository Storage Resilience & Hydration ---");

  const learnerRepo = new LocalLearnerRepository();

  // 2.1 Clean fallback when storage is empty
  const defaultProfile = await learnerRepo.getProfile("non-existent-user");
  assert(Boolean(defaultProfile), "getProfile returns valid profile object");
  assert(typeof defaultProfile.masteryRecords === "object", "masteryRecords is guaranteed object");
  assert(Array.isArray(defaultProfile.questionAttempts), "questionAttempts is guaranteed array");
  assert(Array.isArray(defaultProfile.activityHistory), "activityHistory is guaranteed array");
  assert(Array.isArray(defaultProfile.examHistory), "examHistory is guaranteed array");
  assert(Array.isArray(defaultProfile.diagnosticHistory), "diagnosticHistory is guaranteed array");
  assert(Array.isArray(defaultProfile.unlockedBadges), "unlockedBadges is guaranteed array");

  // 2.2 Updating mastery on newly initialized profile
  const updatedProfile = await learnerRepo.updateMastery(defaultProfile.id, "skill-quad-02", 20, true);
  assert(updatedProfile.masteryRecords["skill-quad-02"].points === 20, "Mastery updated safely on initialized profile");
  assert(updatedProfile.masteryRecords["skill-quad-02"].attempts === 1, "Attempt count recorded correctly");

  // 2.3 Storage Corrupted Data / SyntaxError recovery
  const storageMap: Record<string, string> = {
    "moos_academy_learner_state_v2": "{ unparseable_garbage_json }}"
  };
  const mockStorage = {
    getItem: (k: string) => storageMap[k] || null,
    setItem: (k: string, v: string) => { storageMap[k] = v; },
    removeItem: (k: string) => { delete storageMap[k]; },
    clear: () => { Object.keys(storageMap).forEach(k => delete storageMap[k]); },
    key: (i: number) => Object.keys(storageMap)[i] || null,
    length: Object.keys(storageMap).length
  };
  (global as any).localStorage = mockStorage;
  (global as any).window = { localStorage: mockStorage };

  const corruptedRepo = new LocalLearnerRepository();
  const recoveredProfile = await corruptedRepo.getProfile("recovery-test-user");
  assert(
    Boolean(recoveredProfile && recoveredProfile.id && Array.isArray(recoveredProfile.questionAttempts)),
    "Corrupted JSON in localStorage safely handled with fallback to valid schema"
  );

  // 2.4 Storage Write Failure / QuotaExceeded resilience
  const throwingRepo = new LocalLearnerRepository();
  (global as any).localStorage.setItem = () => {
    throw new Error("QuotaExceededError: Storage quota exceeded");
  };

  const safeResult = await throwingRepo.updateMastery("learner-write-fail", "skill-storage-fail-resilience", 15, true);
  assert(
    safeResult.masteryRecords["skill-storage-fail-resilience"].points === 15,
    "Storage write failure (e.g. QuotaExceededError) caught gracefully without crashing runtime"
  );

  // Restore working storage
  (global as any).localStorage = mockStorage;
  mockStorage.setItem = (k: string, v: string) => { storageMap[k] = v; };

  // --------------------------------------------------------------------------
  // Vector 3: Multi-Role Session Switching & Tenancy Isolation
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 3: Multi-Role Session Switching & Tenancy Isolation ---");

  const identityService = new IdentityService();
  const authService = new AuthorizationService();

  // 3.1 Initial Learner Session
  identityService.createSession(SEEDED_LEARNER_USER);
  const learnerSession = identityService.getActiveSession();
  assert(learnerSession.role === "LEARNER", "Learner session established");

  const learnerClassManage = authService.can(learnerSession, "MANAGE_CLASSROOMS");
  assert(!learnerClassManage.granted, "Learner cannot manage classrooms");

  // 3.2 Switch to Teacher
  identityService.createSession(SEEDED_TEACHER_USER);
  const teacherSession = identityService.getActiveSession();
  assert(teacherSession.role === "TEACHER", "Switched cleanly to Teacher session");

  const teacherAssignmentCreate = authService.can(teacherSession, "CREATE_ASSIGNMENT", {
    resourceType: "assignment",
    classroomId: "cls-ss2-sci-a"
  });
  assert(teacherAssignmentCreate.granted, "Teacher can create assignments in assigned classrooms");

  const teacherClassView = authService.can(teacherSession, "VIEW_CLASSROOM", {
    resourceType: "classroom",
    classroomId: "cls-ss2-sci-a"
  });
  assert(teacherClassView.granted, "Teacher can view assigned classroom");

  // 3.3 Switch to Admin
  identityService.createSession(SEEDED_ADMIN_USER);
  const adminSession = identityService.getActiveSession();
  assert(adminSession.role === "ADMIN", "Switched cleanly to Admin session");

  const adminFullBackup = authService.can(adminSession, "MANAGE_INSTITUTION");
  assert(adminFullBackup.granted, "Admin has institution-level management permission");

  // 3.4 Switch back to Learner
  identityService.createSession(SEEDED_LEARNER_USER);
  const revertedSession = identityService.getActiveSession();
  assert(revertedSession.role === "LEARNER", "Reverted cleanly to Learner session without state corruption");

  // --------------------------------------------------------------------------
  // Vector 4: Storage Quota & Bounded Telemetry Retentions
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 4: Storage Quota & Bounded Telemetry Retentions ---");

  // 4.1 Check bounded question attempts retention (max 300)
  for (let i = 0; i < 350; i++) {
    await learnerRepo.recordQuestionAttempt(defaultProfile.id, {
      questionId: `q-${i}`,
      skillId: "skill-quad-02",
      selectedOption: "0",
      isCorrect: true,
      timeSpentSeconds: 30,
      hintsUsedCount: 0
    });
  }
  const boundedProfile = await learnerRepo.getProfile(defaultProfile.id);
  assert(boundedProfile.questionAttempts.length <= 300, "Question attempts history is strictly capped at 300 items to prevent storage exhaustion");

  // 4.2 Check bounded activity history retention (max 100)
  for (let i = 0; i < 120; i++) {
    await learnerRepo.recordActivity(defaultProfile.id, {
      type: "practice",
      title: `Practice Session ${i}`,
      description: "Completed math questions",
      pointsEarned: 10,
      xpEarned: 25
    });
  }
  const boundedActivityProfile = await learnerRepo.getProfile(defaultProfile.id);
  assert(boundedActivityProfile.activityHistory.length <= 100, "Activity history is strictly capped at 100 items to prevent storage exhaustion");

  // --------------------------------------------------------------------------
  // Vector 5: Backup Validation & Recovery Invariants
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 5: Backup Validation & Recovery Invariants ---");

  const { BackupService } = await import("../services/backupService");
  const backupService = new BackupService();

  // 5.1 Invalid payload rejection
  const invalidJsonValidation = backupService.validateBackup("{ malformed json }");
  assert(!invalidJsonValidation.isValid, "Malformed JSON rejected with structured error");

  // 5.2 Large payload protection (> 25MB)
  const oversizedValidation = backupService.validateBackup("x".repeat(26 * 1024 * 1024));
  assert(!oversizedValidation.isValid, "Oversized payload rejected cleanly");

  console.log("\n==========================================================================");
  console.log("🎉 ALL RUNTIME STABILITY & DATA CONTRACT FORENSIC ASSERTIONS PASSED!");
  console.log("==========================================================================\n");
}

runRuntimeStabilityForensics()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Forensic Suite Failed with Exception:", err);
    process.exit(1);
  });
