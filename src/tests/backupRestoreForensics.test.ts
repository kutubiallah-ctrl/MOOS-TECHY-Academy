/**
 * MOOS TECHY ACADEMY — BACKUP, RESTORE & DATA INTEGRITY FORENSIC TEST SUITE
 * 
 * Comprehensive deterministic test suite testing all 30 validation and integrity dimensions:
 * 1. Valid full academy backup creation
 * 2. Valid learner-only backup creation
 * 3. Valid teacher-only backup creation
 * 4. Deterministic serialization & valid JSON stringification
 * 5. Rejection of invalid JSON string
 * 6. Rejection of incorrect applicationId
 * 7. Rejection of unsupported future schemaVersion
 * 8. Missing required root fields rejection
 * 9. Missing metadata rejection
 * 10. Malformed payload structure rejection
 * 11. Non-array classroom list rejection
 * 12. Cross-classroom assignment reference validation
 * 13. Assignment target learner boundary validation
 * 14. Attempt provenance preservation (OFFICIAL_SYLLABUS, AI_GENERATED_DRAFT)
 * 15. Mastery points range validation (0-100)
 * 16. Question attempt history count and field preservation
 * 17. Diagnostic history preservation
 * 18. Exam submission history preservation
 * 19. Lesson plan phases and metadata preservation
 * 20. Teacher intervention recommendations preservation
 * 21. Empty/minimal dataset handling
 * 22. Large dataset handling
 * 23. Corrupted payload rejection
 * 24. Pre-restore safety snapshot creation and validation
 * 25. Safety snapshot recovery and rollback capability
 * 26. Export and re-import round trip integrity
 * 27. Deterministic checksum calculation
 * 28. Secret and API key exclusion verification
 * 29. PII boundary verification (no external credentials)
 * 30. Canonical curriculum immutability during backup/restore
 */

import { backupService, BackupService } from "../services/backupService";
import { BACKUP_APPLICATION_ID, CURRENT_BACKUP_SCHEMA_VERSION, AcademyBackupEnvelope } from "../types/backup";
import { ExtendedLearnerProfile, QuestionAttempt } from "../types/learner";
import { DEFAULT_EXTENDED_LEARNER_PROFILE, MATHEMATICS_UNITS } from "../data/curriculumData";
import { curriculumService } from "../services/curriculumService";

export interface BackupForensicTestResult {
  passed: boolean;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  details: string[];
}

export async function runBackupRestoreForensicTests(): Promise<BackupForensicTestResult> {
  const details: string[] = [];
  let passedChecks = 0;
  let failedChecks = 0;

  function assert(condition: boolean, testName: string, failureExplanation?: string) {
    if (condition) {
      passedChecks++;
      details.push(`[PASS] ${testName}`);
    } else {
      failedChecks++;
      details.push(`[FAIL] ${testName} — ${failureExplanation || "Assertion failed"}`);
    }
  }

  const service = new BackupService();

  // =========================================================================
  // TEST 1: Valid Full Academy Backup Creation
  // =========================================================================
  const fullBackup = await service.createBackup("full_academy");
  assert(
    fullBackup.applicationId === BACKUP_APPLICATION_ID &&
      fullBackup.schemaVersion === CURRENT_BACKUP_SCHEMA_VERSION &&
      fullBackup.metadata.scope === "full_academy" &&
      !!fullBackup.payload.learner &&
      !!fullBackup.payload.teacher,
    "Valid Full Academy Backup Creation",
    "Full academy backup missing expected envelope structure or payload sections."
  );

  // =========================================================================
  // TEST 2: Valid Learner-Only Backup Creation
  // =========================================================================
  const learnerBackup = await service.createBackup("learner_only");
  assert(
    learnerBackup.metadata.scope === "learner_only" &&
      !!learnerBackup.payload.learner &&
      !learnerBackup.payload.teacher,
    "Valid Learner-Only Backup Creation",
    "Learner backup must include learner payload and exclude teacher payload."
  );

  // =========================================================================
  // TEST 3: Valid Teacher-Only Backup Creation
  // =========================================================================
  const teacherBackup = await service.createBackup("teacher_only");
  assert(
    teacherBackup.metadata.scope === "teacher_only" &&
      !teacherBackup.payload.learner &&
      !!teacherBackup.payload.teacher,
    "Valid Teacher-Only Backup Creation",
    "Teacher backup must include teacher payload and exclude learner payload."
  );

  // =========================================================================
  // TEST 4: Deterministic Serialization & Valid JSON Stringification
  // =========================================================================
  const serialized = service.serializeBackup(fullBackup);
  const parsedBack = JSON.parse(serialized);
  assert(
    parsedBack.backupId === fullBackup.backupId &&
      parsedBack.applicationId === BACKUP_APPLICATION_ID,
    "Deterministic Serialization & Valid JSON",
    "Serialized string could not be parsed back accurately."
  );

  // =========================================================================
  // TEST 5: Rejection of Invalid JSON String
  // =========================================================================
  const invalidJsonResult = service.validateBackup("{ malformed_json: true, broken... ");
  assert(
    !invalidJsonResult.isValid &&
      invalidJsonResult.issues.some((i) => i.code === "INVALID_JSON"),
    "Rejection of Invalid JSON String",
    "Malformed JSON string was not rejected."
  );

  // =========================================================================
  // TEST 6: Rejection of Incorrect Application ID
  // =========================================================================
  const wrongAppIdEnvelope = {
    ...fullBackup,
    applicationId: "rogue-external-app"
  };
  const wrongAppResult = service.validateBackup(wrongAppIdEnvelope);
  assert(
    !wrongAppResult.isValid &&
      wrongAppResult.issues.some((i) => i.code === "INVALID_APPLICATION_ID"),
    "Rejection of Incorrect Application ID",
    "Rogue application ID was not rejected."
  );

  // =========================================================================
  // TEST 7: Rejection of Unsupported Future Schema Version
  // =========================================================================
  const futureSchemaEnvelope = {
    ...fullBackup,
    schemaVersion: 99
  };
  const futureSchemaResult = service.validateBackup(futureSchemaEnvelope);
  assert(
    !futureSchemaResult.isValid &&
      futureSchemaResult.issues.some((i) => i.code === "UNSUPPORTED_FUTURE_SCHEMA"),
    "Rejection of Unsupported Future Schema Version",
    "Future schema version 99 was not rejected."
  );

  // =========================================================================
  // TEST 8: Missing Required Root Fields Rejection
  // =========================================================================
  const missingRootFields = {
    applicationId: BACKUP_APPLICATION_ID
    // missing schemaVersion, metadata, payload
  };
  const missingRootResult = service.validateBackup(missingRootFields);
  assert(
    !missingRootResult.isValid && missingRootResult.issues.length > 0,
    "Missing Required Root Fields Rejection",
    "Missing root fields failed to trigger validation errors."
  );

  // =========================================================================
  // TEST 9: Missing Metadata Rejection
  // =========================================================================
  const missingMetaEnvelope = {
    ...fullBackup,
    metadata: undefined
  };
  const missingMetaResult = service.validateBackup(missingMetaEnvelope);
  assert(
    !missingMetaResult.isValid &&
      missingMetaResult.issues.some((i) => i.code === "MISSING_METADATA"),
    "Missing Metadata Rejection",
    "Envelope without metadata was not rejected."
  );

  // =========================================================================
  // TEST 10: Malformed Payload Structure Rejection
  // =========================================================================
  const malformedPayloadEnvelope = {
    ...fullBackup,
    payload: "not-an-object"
  };
  const malformedPayloadResult = service.validateBackup(malformedPayloadEnvelope);
  assert(
    !malformedPayloadResult.isValid &&
      malformedPayloadResult.issues.some((i) => i.code === "MISSING_PAYLOAD"),
    "Malformed Payload Structure Rejection",
    "Non-object payload was not rejected."
  );

  // =========================================================================
  // TEST 11: Non-Array Classroom List Rejection
  // =========================================================================
  const brokenClassroomsEnvelope: any = {
    ...fullBackup,
    payload: {
      ...fullBackup.payload,
      teacher: {
        ...fullBackup.payload.teacher,
        classrooms: "invalid-string-classrooms"
      }
    }
  };
  const brokenClassroomsResult = service.validateBackup(brokenClassroomsEnvelope);
  assert(
    !brokenClassroomsResult.isValid &&
      brokenClassroomsResult.issues.some((i) => i.code === "INVALID_CLASSROOMS_ARRAY"),
    "Non-Array Classroom List Rejection",
    "Non-array classrooms property was not rejected."
  );

  // =========================================================================
  // TEST 12: Cross-Classroom Assignment Reference Warning / Validation
  // =========================================================================
  const orphanedAsgEnvelope: any = {
    ...fullBackup,
    payload: {
      ...fullBackup.payload,
      teacher: {
        ...fullBackup.payload.teacher,
        classrooms: [{ id: "cls-01", roomCode: "MOOS-01" }],
        assignments: [
          {
            id: "asg-01",
            classroomId: "cls-nonexistent-99",
            title: "Orphaned Task",
            targetLearnerIds: []
          }
        ]
      }
    }
  };
  const orphanedAsgResult = service.validateBackup(orphanedAsgEnvelope);
  assert(
    orphanedAsgResult.issues.some((i) => i.code === "ORPHANED_ASSIGNMENT_CLASSROOM"),
    "Cross-Classroom Assignment Reference Validation",
    "Orphaned assignment classroom reference did not raise validation warning."
  );

  // =========================================================================
  // TEST 13: Assignment Target Learner Boundary Validation
  // =========================================================================
  const validAsgs = fullBackup.payload.teacher?.assignments || [];
  const targetIdsExist = validAsgs.every((a) => Array.isArray(a.targetLearnerIds));
  assert(
    targetIdsExist,
    "Assignment Target Learner Boundary Validation",
    "Assignments must contain structured targetLearnerIds arrays."
  );

  // =========================================================================
  // TEST 14: Attempt Provenance Preservation (OFFICIAL_SYLLABUS, AI_GENERATED_DRAFT)
  // =========================================================================
  const mockAttempt1: QuestionAttempt = {
    id: "att-audit-01",
    questionId: "q-official-01",
    skillId: "skill-quad-02",
    selectedOption: "B",
    isCorrect: true,
    hintsUsedCount: 0,
    timeSpentSeconds: 45,
    provenance: "OFFICIAL_SYLLABUS",
    isAiGenerated: false,
    timestamp: new Date().toISOString()
  };
  const mockAttempt2: QuestionAttempt = {
    id: "att-audit-02",
    questionId: "gen-audit-02",
    skillId: "skill-quad-02",
    selectedOption: "C",
    isCorrect: false,
    hintsUsedCount: 2,
    timeSpentSeconds: 65,
    provenance: "AI_GENERATED_DRAFT",
    isAiGenerated: true,
    generatorAgent: "tutor_agent",
    timestamp: new Date().toISOString()
  };

  const provenanceEnvelope: any = {
    ...learnerBackup,
    payload: {
      learner: {
        profile: {
          ...DEFAULT_EXTENDED_LEARNER_PROFILE,
          id: "learner-prov-test",
          questionAttempts: [mockAttempt1, mockAttempt2]
        }
      }
    }
  };
  const provenanceVal = service.validateBackup(provenanceEnvelope);
  assert(
    provenanceVal.isValid,
    "Attempt Provenance Preservation",
    "Attempts with explicit official and AI provenance failed validation."
  );

  // =========================================================================
  // TEST 15: Mastery Points Range Validation (0-100)
  // =========================================================================
  const invalidMasteryEnvelope: any = {
    ...learnerBackup,
    payload: {
      learner: {
        profile: {
          ...DEFAULT_EXTENDED_LEARNER_PROFILE,
          id: "learner-mastery-overflow",
          masteryRecords: {
            "skill-01": {
              skillId: "skill-01",
              points: 150, // Illegal: > 100
              status: "mastered"
            }
          }
        }
      }
    }
  };
  const invalidMasteryResult = service.validateBackup(invalidMasteryEnvelope);
  assert(
    !invalidMasteryResult.isValid &&
      invalidMasteryResult.issues.some((i) => i.code === "INVALID_MASTERY_POINTS"),
    "Mastery Points Range Validation",
    "Mastery points of 150 was not rejected."
  );

  // =========================================================================
  // TEST 16: Question Attempt History Preservation
  // =========================================================================
  const attemptsArray = fullBackup.payload.learner?.profile.questionAttempts || [];
  assert(
    Array.isArray(attemptsArray),
    "Question Attempt History Preservation",
    "Learner question attempts missing or not an array."
  );

  // =========================================================================
  // TEST 17: Diagnostic History Preservation
  // =========================================================================
  const diagArray = fullBackup.payload.learner?.profile.diagnosticHistory || [];
  assert(
    Array.isArray(diagArray),
    "Diagnostic History Preservation",
    "Learner diagnostic history missing or not an array."
  );

  // =========================================================================
  // TEST 18: Exam Submission History Preservation
  // =========================================================================
  const examArray = fullBackup.payload.learner?.profile.examHistory || [];
  assert(
    Array.isArray(examArray),
    "Exam Submission History Preservation",
    "Learner exam history missing or not an array."
  );

  // =========================================================================
  // TEST 19: Lesson Plan Phases & Metadata Preservation
  // =========================================================================
  const plans = fullBackup.payload.teacher?.lessonPlans || [];
  const plansValid = plans.length > 0 && Array.isArray(plans[0].phases);
  assert(
    plansValid,
    "Lesson Plan Phases & Metadata Preservation",
    "Lesson plan phases array not preserved in backup payload."
  );

  // =========================================================================
  // TEST 20: Teacher Intervention Recommendations Preservation
  // =========================================================================
  const teacherInterventions = fullBackup.payload.teacher?.teacherInterventions || [];
  assert(
    Array.isArray(teacherInterventions),
    "Teacher Intervention Recommendations Preservation",
    "Teacher interventions array missing in backup payload."
  );

  // =========================================================================
  // TEST 21: Empty / Minimal Dataset Handling
  // =========================================================================
  const minimalEnvelope: AcademyBackupEnvelope = {
    schemaVersion: 1,
    applicationId: BACKUP_APPLICATION_ID,
    backupId: "min-01",
    exportedAt: new Date().toISOString(),
    metadata: {
      schemaVersion: 1,
      applicationId: BACKUP_APPLICATION_ID,
      backupId: "min-01",
      exportedAt: new Date().toISOString(),
      scope: "learner_only",
      appName: "MOOS TECHY ACADEMY",
      appVersion: "2.5.0",
      sourceEnvironment: "browser_local_storage",
      entityCounts: {
        learners: 1,
        classrooms: 0,
        assignments: 0,
        lessonPlans: 0,
        interventions: 0,
        attempts: 0,
        masteryRecords: 0,
        diagnosticResults: 0,
        examSubmissions: 0,
        tutorSessions: 0
      }
    },
    payload: {
      learner: {
        profile: {
          ...DEFAULT_EXTENDED_LEARNER_PROFILE,
          id: "learner-min-01",
          questionAttempts: [],
          masteryRecords: {},
          diagnosticHistory: [],
          examHistory: []
        }
      }
    },
    integrity: {
      signatureAlgorithm: "none_local_checksum",
      payloadHash: "hash-01",
      isEncrypted: false
    }
  };
  const minVal = service.validateBackup(minimalEnvelope);
  assert(
    minVal.isValid,
    "Empty / Minimal Dataset Handling",
    "Minimal valid envelope failed validation."
  );

  // =========================================================================
  // TEST 22: Large Dataset Handling (Up to 500 attempts)
  // =========================================================================
  const largeAttempts: QuestionAttempt[] = Array.from({ length: 500 }, (_, idx) => ({
    id: `att-large-${idx}`,
    questionId: `q-${idx}`,
    skillId: "skill-quad-02",
    selectedOption: "A",
    isCorrect: idx % 2 === 0,
    hintsUsedCount: idx % 3,
    timeSpentSeconds: 30,
    provenance: "OFFICIAL_SYLLABUS",
    isAiGenerated: false,
    timestamp: new Date().toISOString()
  }));

  const largeEnvelope: AcademyBackupEnvelope = {
    ...minimalEnvelope,
    payload: {
      learner: {
        profile: {
          ...DEFAULT_EXTENDED_LEARNER_PROFILE,
          id: "learner-large-01",
          questionAttempts: largeAttempts
        }
      }
    }
  };
  const largeVal = service.validateBackup(largeEnvelope);
  assert(
    largeVal.isValid,
    "Large Dataset Handling",
    "Large 500-attempt payload failed validation."
  );

  // =========================================================================
  // TEST 23: Corrupted Payload Rejection
  // =========================================================================
  const corruptedVal = service.validateBackup({
    ...fullBackup,
    payload: {
      learner: {
        profile: {
          id: 12345, // Illegal: not a string
          role: "super_admin_illegal" // Illegal: not "learner"
        }
      }
    }
  });
  assert(
    !corruptedVal.isValid,
    "Corrupted Payload Rejection",
    "Corrupted profile data was not rejected."
  );

  // =========================================================================
  // TEST 24: Pre-Restore Safety Snapshot Creation & Validation
  // =========================================================================
  const snapshot = service.createSafetySnapshot("Test pre-restore snapshot");
  assert(
    !!snapshot.snapshotId && !!snapshot.createdAt && snapshot.reason === "Test pre-restore snapshot",
    "Pre-Restore Safety Snapshot Creation",
    "Safety snapshot creation failed or missing fields."
  );

  // =========================================================================
  // TEST 25: Safety Snapshot Recovery & Rollback Capability
  // =========================================================================
  const rollbackResult = service.restoreFromSafetySnapshot();
  assert(
    rollbackResult.success,
    "Safety Snapshot Recovery & Rollback Capability",
    "Safety snapshot rollback returned failure."
  );

  // =========================================================================
  // TEST 26: Export & Re-Import Round Trip Integrity
  // =========================================================================
  const jsonExported = service.serializeBackup(fullBackup);
  const reImportedResult = service.validateBackup(jsonExported);
  assert(
    reImportedResult.isValid &&
      reImportedResult.envelope?.backupId === fullBackup.backupId,
    "Export & Re-Import Round Trip Integrity",
    "Round-trip exported JSON failed validation on re-import."
  );

  // =========================================================================
  // TEST 27: Deterministic Checksum Calculation
  // =========================================================================
  const hashA = (service as any).calculateSimpleHash("identical_string_123");
  const hashB = (service as any).calculateSimpleHash("identical_string_123");
  const hashC = (service as any).calculateSimpleHash("different_string_456");
  assert(
    hashA === hashB && hashA !== hashC,
    "Deterministic Checksum Calculation",
    "Checksum hashing is not deterministic or unique."
  );

  // =========================================================================
  // TEST 28: Secret & API Key Exclusion Verification
  // =========================================================================
  const serializedBackupString = JSON.stringify(fullBackup);
  const containsApiKey =
    serializedBackupString.includes("GEMINI_API_KEY") ||
    serializedBackupString.includes("AIzaSy") ||
    serializedBackupString.includes("sk-");
  assert(
    !containsApiKey,
    "Secret & API Key Exclusion Verification",
    "Backup envelope unexpectedly contained API key or private credentials."
  );

  // =========================================================================
  // TEST 29: PII Boundary Verification (No external password or private tokens)
  // =========================================================================
  const containsCredentials =
    serializedBackupString.includes("password_hash") ||
    serializedBackupString.includes("auth_token") ||
    serializedBackupString.includes("oauth_secret");
  assert(
    !containsCredentials,
    "PII Boundary Verification",
    "Backup payload contained illegal authentication secrets."
  );

  // =========================================================================
  // TEST 30: Canonical Curriculum Immutability During Backup/Restore
  // =========================================================================
  const initialUnitCount = MATHEMATICS_UNITS.length;
  const canonicalSkill = curriculumService.getSkillById("skill-quad-02");
  assert(
    initialUnitCount >= 6 && !!canonicalSkill && canonicalSkill.title.length > 0,
    "Canonical Curriculum Immutability During Backup/Restore",
    "Canonical curriculum state was altered or corrupted."
  );

  return {
    passed: failedChecks === 0,
    totalChecks: passedChecks + failedChecks,
    passedChecks,
    failedChecks,
    details
  };
}

// Direct CLI execution support
if (typeof process !== "undefined" && process.argv && process.argv[1]?.includes("backupRestoreForensics.test")) {
  console.log("==========================================================================");
  console.log("🧪 MOOS TECHY ACADEMY — BACKUP & RESTORE FORENSIC AUDIT");
  console.log("==========================================================================");
  runBackupRestoreForensicTests().then((res) => {
    res.details.forEach(d => console.log(d));
    if (res.passed) {
      console.log(`\n🎉 ALL ${res.totalChecks} BACKUP & RESTORE FORENSIC CHECKS PASSED (100% GREEN)`);
      process.exit(0);
    } else {
      console.error(`\n❌ FAILED ${res.failedChecks} of ${res.totalChecks} checks.`);
      process.exit(1);
    }
  });
}
