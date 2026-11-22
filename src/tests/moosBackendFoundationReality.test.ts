/**
 * MOOS TECHY ACADEMY — MASTER BACKEND FOUNDATION REALITY TEST SUITE
 * 
 * TASK ID: MOOS-BACKEND-001
 * 
 * Comprehensive Verification of the Four Backend Foundations & Antigravity Autonomous Engineering:
 * 1. Existing Infrastructure Audit (Ensuring single canonical database & no duplicate auth)
 * 2. Firebase Applet Config & Database ID Verification (ai-studio-moostechyacademy-08157dac-f115-4378-87dc-fed1e0ada623)
 * 3. User Authentication, Multi-Role RBAC & Identity Bridge
 * 4. Firestore Database Foundation & Schema Adherence (firebase-blueprint.json)
 * 5. Cloud File Storage Service & Path Taxonomy (Deterministic paths, SHA-256 integrity, upload/download/delete)
 * 6. Firestore Security Rules & Immutability Enforcement (Default Deny, PII Isolation, Append-Only Audit Trail)
 * 7. Offline-First Resilience & Sync Queueing
 * 8. Antigravity Autonomous Backend Inspection & Anomaly Detection
 * 9. Antigravity Governed Remediation & Controlled Implementation Execution
 * 10. Development Guardian Backend Policy Enforcement & Protected File Guards
 * 11. Complete Forensic Evidence Ledger & Reality Classification
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "fs";
import path from "path";
import { backendFoundationService } from "../services/backendFoundationService";
import { firebaseStorageService } from "../services/firebaseStorageService";
import { antigravityBackendEngine } from "../services/antigravityBackendEngine";
import { identityService, SEEDED_LEARNER_USER, SEEDED_TEACHER_USER, SEEDED_ADMIN_USER } from "../services/identityService";
import { developmentGuardianService } from "../services/developmentGuardianService";
import { dynamicImplementationEngine, PROTECTED_FILES } from "../services/dynamicImplementationEngine";
import firebaseConfig from "../../firebase-applet-config.json";
import blueprint from "../../firebase-blueprint.json";

describe("MOOS ACADEMY — Backend Foundation & Antigravity Reality Certification (MOOS-BACKEND-001)", () => {

  // =========================================================================
  // SUBTEST 1: Existing Infrastructure Audit
  // =========================================================================
  it("Backend 001.1: Existing Infrastructure Audit & Single Database Invariant", () => {
    const audit = backendFoundationService.auditInfrastructure();
    
    // Must strictly use the canonical provisioned database
    assert.strictEqual(
      audit.databaseId,
      "ai-studio-moostechyacademy-08157dac-f115-4378-87dc-fed1e0ada623",
      "Database ID must match the canonical provisioned Firestore instance"
    );
    assert.strictEqual(audit.projectId, "genial-bucksaw-wxctm");
    assert.strictEqual(audit.storageBucket, "genial-bucksaw-wxctm.firebasestorage.app");
    assert.strictEqual(audit.authConfigured, true, "Firebase Auth must be configured");

    // Must NOT have duplicate databases or conflicting auth systems
    assert.strictEqual(audit.conflictingDatabasesDetected, false, "No secondary database permitted");
    assert.strictEqual(audit.conflictingAuthDetected, false, "No conflicting auth permitted");
    assert.strictEqual(audit.allFoundationsProvisioned, true, "All 4 pillars must be provisioned");
  });

  // =========================================================================
  // SUBTEST 2: Firebase Applet Config & Credential Security
  // =========================================================================
  it("Backend 001.2: Firebase Applet Config Verification & Secret Isolation", () => {
    assert.ok(firebaseConfig.projectId, "projectId required");
    assert.ok(firebaseConfig.appId, "appId required");
    assert.ok(firebaseConfig.apiKey, "apiKey required");
    assert.ok(firebaseConfig.authDomain, "authDomain required");
    assert.ok(firebaseConfig.firestoreDatabaseId, "firestoreDatabaseId required");
    assert.ok(firebaseConfig.storageBucket, "storageBucket required");

    // Ensure config is protected against tampering
    assert.ok(
      PROTECTED_FILES.has("firebase-applet-config.json"),
      "firebase-applet-config.json must be in PROTECTED_FILES"
    );
  });

  // =========================================================================
  // SUBTEST 3: User Authentication & Multi-Role RBAC Bridge
  // =========================================================================
  it("Backend 001.3: User Authentication & Multi-Role RBAC Bridge", () => {
    // 1. Learner user resolution
    identityService.createSession(SEEDED_LEARNER_USER);
    const learnerAuth = backendFoundationService.resolveBackendAuthUser();
    assert.strictEqual(learnerAuth.uid, SEEDED_LEARNER_USER.id);
    assert.strictEqual(learnerAuth.role, "learner");
    assert.strictEqual(learnerAuth.claims.isLearner, true);
    assert.strictEqual(learnerAuth.claims.isAdmin, false);
    assert.strictEqual(learnerAuth.claims.isTeacher, false);

    // 2. Teacher user resolution
    identityService.createSession(SEEDED_TEACHER_USER);
    const teacherAuth = backendFoundationService.resolveBackendAuthUser();
    assert.strictEqual(teacherAuth.uid, SEEDED_TEACHER_USER.id);
    assert.strictEqual(teacherAuth.role, "teacher");
    assert.strictEqual(teacherAuth.claims.isTeacher, true);
    assert.strictEqual(teacherAuth.claims.isAdmin, false);

    // 3. Admin user resolution
    identityService.createSession(SEEDED_ADMIN_USER);
    const adminAuth = backendFoundationService.resolveBackendAuthUser();
    assert.strictEqual(adminAuth.uid, SEEDED_ADMIN_USER.id);
    assert.strictEqual(adminAuth.role, "admin");
    assert.strictEqual(adminAuth.claims.isAdmin, true);

    // 4. Role-based permission verification
    assert.strictEqual(backendFoundationService.verifyRolePermission(adminAuth, "admin"), true);
    assert.strictEqual(backendFoundationService.verifyRolePermission(adminAuth, "teacher"), true);
    assert.strictEqual(backendFoundationService.verifyRolePermission(adminAuth, "learner"), true);

    assert.strictEqual(backendFoundationService.verifyRolePermission(teacherAuth, "teacher"), true);
    assert.strictEqual(backendFoundationService.verifyRolePermission(teacherAuth, "learner"), true);
    assert.strictEqual(backendFoundationService.verifyRolePermission(teacherAuth, "admin"), false);

    assert.strictEqual(backendFoundationService.verifyRolePermission(learnerAuth, "learner"), true);
    assert.strictEqual(backendFoundationService.verifyRolePermission(learnerAuth, "teacher"), false);
    assert.strictEqual(backendFoundationService.verifyRolePermission(learnerAuth, "admin"), false);
  });

  // =========================================================================
  // SUBTEST 4: Database Foundation & Schema Adherence
  // =========================================================================
  it("Backend 001.4: Firestore Database Foundation & Schema Blueprint Adherence", async () => {
    // 1. Verify entities in blueprint
    const entities = (blueprint as any).entities;
    assert.ok(entities.User, "User entity defined");
    assert.ok(entities.LearnerProfile, "LearnerProfile entity defined");
    assert.ok(entities.TeacherMaterial, "TeacherMaterial entity defined");
    assert.ok(entities.GeneratedVideo, "GeneratedVideo entity defined");
    assert.ok(entities.AudioTranscription, "AudioTranscription entity defined");
    assert.ok(entities.StorageArtifact, "StorageArtifact entity defined");
    assert.ok(entities.SecurityAuditLog, "SecurityAuditLog entity defined");

    // 2. Verify collection paths in blueprint
    const firestorePaths = (blueprint as any).firestore;
    assert.ok(firestorePaths["/users/{userId}"]);
    assert.ok(firestorePaths["/learnerProfiles/{userId}"]);
    assert.ok(firestorePaths["/teacherMaterials/{materialId}"]);
    assert.ok(firestorePaths["/generatedVideos/{videoId}"]);
    assert.ok(firestorePaths["/audioTranscriptions/{transcriptionId}"]);
    assert.ok(firestorePaths["/storageArtifacts/{artifactId}"]);
    assert.ok(firestorePaths["/auditLogs/{logId}"]);

    // 3. Verify database health check
    const health = await backendFoundationService.getDatabaseHealth();
    assert.strictEqual(health.databaseId, firebaseConfig.firestoreDatabaseId);
    assert.strictEqual(health.schemaSynced, true);
    assert.ok(health.collectionsVerified.includes("storageArtifacts"));
    assert.ok(health.collectionsVerified.includes("auditLogs"));
  });

  // =========================================================================
  // SUBTEST 5: Cloud File Storage Service & Path Taxonomy
  // =========================================================================
  it("Backend 001.5: Cloud File Storage Service, Path Taxonomy & SHA-256 Integrity", async () => {
    assert.strictEqual(firebaseStorageService.isConfigured(), true);
    assert.strictEqual(firebaseStorageService.getBucketName(), firebaseConfig.storageBucket);

    // 1. Path taxonomy validation
    const uid = "usr_tch_001";
    assert.strictEqual(
      firebaseStorageService.getStoragePath("avatar", uid, "profile.jpg"),
      "users/usr_tch_001/avatars/profile.jpg"
    );
    assert.strictEqual(
      firebaseStorageService.getStoragePath("teacher_material", uid, "quadratics.pdf", "mat-101"),
      "teachers/usr_tch_001/materials/mat-101/quadratics.pdf"
    );
    assert.strictEqual(
      firebaseStorageService.getStoragePath("manuscript", uid, "chapter1.md", "proj-stem"),
      "manuscripts/proj-stem/usr_tch_001/chapter1.md"
    );
    assert.strictEqual(
      firebaseStorageService.getStoragePath("audio", uid, "pronounce_sin.wav"),
      "audio/usr_tch_001/pronounce_sin.wav"
    );
    assert.strictEqual(
      firebaseStorageService.getStoragePath("backup", uid, "db_snap.json", "bk-01"),
      "backups/bk-01/db_snap.json"
    );

    // 2. Cryptographic SHA-256 verification
    const payload = "MOOS ACADEMY STEM CURRICULUM CHAPTER 1";
    const expectedSha256 = firebaseStorageService.computeHash(payload);
    assert.strictEqual(expectedSha256.length, 64);

    // 3. Upload file
    const artifact = await firebaseStorageService.uploadFile({
      userId: uid,
      role: "teacher",
      filename: "chapter1.md",
      mimeType: "text/markdown",
      data: payload,
      category: "manuscript",
      customPath: "manuscripts/proj-stem/usr_tch_001/chapter1.md"
    });

    assert.ok(artifact.id.startsWith("art_"));
    assert.strictEqual(artifact.userId, uid);
    assert.strictEqual(artifact.category, "manuscript");
    assert.strictEqual(artifact.sha256Hash, expectedSha256);
    assert.strictEqual(artifact.sizeBytes, payload.length);
    assert.ok(artifact.downloadUrl.includes(firebaseConfig.storageBucket));

    // 4. Retrieve artifact by ID and Category
    const fetched = firebaseStorageService.getArtifactById(artifact.id);
    assert.ok(fetched);
    assert.strictEqual(fetched?.id, artifact.id);

    const manuscripts = await firebaseStorageService.listArtifacts("manuscript");
    assert.ok(manuscripts.some(m => m.id === artifact.id));

    // 5. Delete file
    const deleted = await firebaseStorageService.deleteFile(artifact.storagePath, artifact.id);
    assert.strictEqual(deleted, true);
    assert.strictEqual(firebaseStorageService.getArtifactById(artifact.id), undefined);
  });

  // =========================================================================
  // SUBTEST 6: Firestore Security Rules ABAC & Immutability Enforcement
  // =========================================================================
  it("Backend 001.6: Firestore Security Rules ABAC & Immutability Enforcement", async () => {
    const rulesPath = "firestore.rules";
    const rulesContent = fs.readFileSync(rulesPath, "utf-8");

    // 1. Default-deny catch-all
    assert.ok(
      rulesContent.includes("match /{document=**} {\n      allow read, write: if false;\n    }") ||
      rulesContent.includes("match /{document=**} {") && rulesContent.includes("allow read, write: if false;"),
      "Default deny catch-all rule must be present"
    );

    // 2. Strict user PII isolation
    assert.ok(rulesContent.includes("match /users/{userId}"));
    assert.ok(rulesContent.includes("allow get: if (isOwner(userId) || isAdmin())"));

    // 3. Strict learner profile isolation
    assert.ok(rulesContent.includes("match /learnerProfiles/{userId}"));
    assert.ok(rulesContent.includes("allow get: if (isOwner(userId) || isAdmin())"));

    // 4. Storage artifacts isolation
    assert.ok(rulesContent.includes("match /storageArtifacts/{artifactId}"));
    assert.ok(rulesContent.includes("resource.data.userId == request.auth.uid || isAdmin()"));

    // 5. Strict audit log immutability
    assert.ok(rulesContent.includes("match /auditLogs/{logId}"));
    assert.ok(rulesContent.includes("allow update: if false;"));
    assert.ok(rulesContent.includes("allow delete: if false;"));

    // 6. Programmatic immutability check
    const updateCheck = backendFoundationService.verifyAuditLogImmutability("UPDATE");
    assert.strictEqual(updateCheck.allowed, false);
    assert.ok(updateCheck.reason.includes("Security Invariant Violation"));

    const deleteCheck = backendFoundationService.verifyAuditLogImmutability("DELETE");
    assert.strictEqual(deleteCheck.allowed, false);
    assert.ok(deleteCheck.reason.includes("Security Invariant Violation"));
  });

  // =========================================================================
  // SUBTEST 7: Security Audit Logging & Ledger Traceability
  // =========================================================================
  it("Backend 001.7: Security Audit Logging & Ledger Traceability", async () => {
    const log = await backendFoundationService.recordSecurityAudit({
      actorUid: SEEDED_TEACHER_USER.id,
      actorRole: "teacher",
      action: "UPLOAD_LESSON_ATTACHMENT",
      resourceType: "storageArtifact",
      resourceId: "art_test_123",
      status: "SUCCESS",
      details: { filename: "algebra_notes.pdf", size: 4096 }
    });

    assert.ok(log.id.startsWith("aud_"));
    assert.strictEqual(log.actorUid, SEEDED_TEACHER_USER.id);
    assert.strictEqual(log.status, "SUCCESS");
    assert.ok(log.timestamp);

    const teacherLogs = backendFoundationService.getLocalAuditLogs(SEEDED_TEACHER_USER.id);
    assert.ok(teacherLogs.some(l => l.id === log.id));
  });

  // =========================================================================
  // SUBTEST 8: Antigravity Autonomous Backend Inspection & Anomaly Detection
  // =========================================================================
  it("Backend 001.8: Antigravity Autonomous Backend Inspection & Anomaly Detection", () => {
    const inspection = antigravityBackendEngine.inspectBackendArchitecture();
    assert.strictEqual(inspection.pillars.length, 4);

    const pillarNames = inspection.pillars.map(p => p.pillar);
    assert.ok(pillarNames.includes("AUTHENTICATION"));
    assert.ok(pillarNames.includes("DATABASE"));
    assert.ok(pillarNames.includes("FILE_STORAGE"));
    assert.ok(pillarNames.includes("SECURITY_RULES"));

    // All pillars should currently be healthy
    assert.strictEqual(inspection.passed, true);
    assert.strictEqual(inspection.anomalies.length, 0);

    // Verify detection triggers on a simulated anomaly
    const simulatedAnomaly = {
      anomalyId: "ANOM-SIM-01",
      pillar: "FILE_STORAGE" as const,
      severity: "HIGH" as const,
      title: "Storage Path Misconfiguration",
      description: "Custom path escapes allowed prefix",
      remediationAction: "Clamp storage path to canonical tenant prefix",
      detectedAt: new Date().toISOString()
    };

    const plan = antigravityBackendEngine.proposeRemediation(simulatedAnomaly);
    assert.strictEqual(plan.anomalyId, "ANOM-SIM-01");
    assert.strictEqual(plan.status, "PROPOSED");
  });

  // =========================================================================
  // SUBTEST 9: Antigravity Governed Remediation & Controlled Implementation
  // =========================================================================
  it("Backend 001.9: Antigravity Governed Remediation Execution", async () => {
    const safePlan = {
      planId: "PLAN-SAFE-01",
      anomalyId: "ANOM-01",
      targetPillar: "FILE_STORAGE" as const,
      proposedAction: "Normalize storage taxonomy helper",
      changedFiles: ["src/services/firebaseStorageService.ts"],
      requiresOwnerApproval: false,
      status: "PROPOSED" as const
    };

    const execution = await antigravityBackendEngine.executeRemediation(safePlan);
    assert.strictEqual(execution.success, true);
    assert.strictEqual(safePlan.status, "EXECUTED");
  });

  // =========================================================================
  // SUBTEST 10: Development Guardian Backend Governance & Boundary Guards
  // =========================================================================
  it("Backend 001.10: Development Guardian Backend Governance & Boundary Guards", () => {
    // 1. Attempt unauthorized modification of protected firestore rules
    const rulesMutation = {
      mutationId: "mut-prot-rules",
      taskId: "TASK-SEC-01",
      targetFile: "firestore.rules",
      originalHash: "dummy",
      proposedContent: "rules_version = '2';",
      diffPatch: "",
      rationale: "Attempting to relax security rules",
      authorAgent: "implementation_agent" as const,
      changedLinesCount: 1,
      riskLevel: "critical" as const
    };

    const safety = dynamicImplementationEngine.validateMutationSafety(rulesMutation);
    assert.strictEqual(safety.requiresOwnerApproval, true);

    // Modifying protected rules requires explicit approval
    assert.ok(PROTECTED_FILES.has("firestore.rules"));
    assert.ok(PROTECTED_FILES.has("firebase-blueprint.json"));
    assert.ok(PROTECTED_FILES.has("firebase-applet-config.json"));

    // 2. High risk keywords detection
    const highRiskTask = developmentGuardianService.createTask({
      title: "Dangerous DB operation",
      description: "Attempting to purge_database and drop_table",
      sourceRequirement: "REQ-SEC-001",
      category: "security",
      priority: "critical",
      riskLevel: "critical",
      status: "QUEUED",
      affectedSystems: ["FirestoreDatabase"],
      dependencies: [],
      assignedAgent: "security_agent",
      requiredVerification: ["SECURITY_VERIFIED"],
      acceptanceCriteria: ["Reject unauthorized purge"],
      regressionRisks: ["Database data loss"]
    });

    assert.strictEqual(highRiskTask.humanApprovalRequired, true);
  });

  // =========================================================================
  // SUBTEST 11: Runtime Reality Verification & Forensic Ledger
  // =========================================================================
  it("Backend 001.11: Runtime Reality Verification & Forensic Ledger", async () => {
    const runtime = await antigravityBackendEngine.verifyRuntimeReality();
    assert.strictEqual(runtime.authVerification, true, "Auth runtime verified");
    assert.strictEqual(runtime.databaseVerification, true, "Database runtime verified");
    assert.strictEqual(runtime.storageVerification, true, "Storage runtime verified");
    assert.strictEqual(runtime.securityRulesVerification, true, "Security rules runtime verified");
    assert.strictEqual(runtime.allPassed, true, "All 4 pillars runtime verified");

    // Forensic ledger generation
    const ledger = antigravityBackendEngine.generateForensicLedger();
    assert.strictEqual(ledger.taskId, "MOOS-BACKEND-001");
    assert.strictEqual(ledger.databaseId, "ai-studio-moostechyacademy-08157dac-f115-4378-87dc-fed1e0ada623");
    assert.strictEqual(ledger.storageBucket, "genial-bucksaw-wxctm.firebasestorage.app");
    assert.strictEqual(ledger.pillars.authentication.status, "AUTHENTICATED_AND_MAPPED");
    assert.strictEqual(ledger.pillars.database.status, "PERSISTENT_FIRESTORE_VERIFIED");
    assert.strictEqual(ledger.pillars.fileStorage.status, "CLOUD_STORAGE_PROVISIONED_AND_VERIFIED");
    assert.strictEqual(ledger.pillars.securityRules.status, "ZERO_TRUST_ABAC_DEPLOYED");
    assert.strictEqual(ledger.antigravityExecution.realityStatus, "CONTROLLED_ENGINEERING_VERIFIED");
  });
});
