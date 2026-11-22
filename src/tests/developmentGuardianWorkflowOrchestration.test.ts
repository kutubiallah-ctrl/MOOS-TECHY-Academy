/**
 * MOOS TECHY ACADEMY — DEVELOPMENT GUARDIAN WORKFLOW ORCHESTRATION TEST SUITE
 * 
 * Comprehensive forensic verification of:
 * - Development Guardian central awareness and task lifecycle
 * - Specialist Agent Registry (14 agents) and permission boundary enforcement
 * - Dynamic task routing to domain-specific specialist agents
 * - Persistent Requirement Memory Registry and requirement drift detection
 * - Quality Gate evaluations and multi-dimensional finding codes
 * - Human Approval Gates for high-risk operations
 * - Bounded retry and failure recovery loops
 * - Forensic evidence collection and verification invariants
 * - Domain protection: Smart Board, Mathematical Speech, ESL, Multimodal, AI Governance, Firebase
 * - Canonical 19-suite test baseline protection and Agent Readiness Level (Level 6)
 */

import assert from "assert";
import {
  developmentGuardianService
} from "../services/developmentGuardianService";
import {
  guardianAgentRegistry,
  GUARDIAN_SPECIALIST_AGENTS
} from "../services/guardianAgentRegistry";
import {
  requirementRegistryService
} from "../services/requirementRegistryService";
import {
  GuardianAgentRole,
  DevelopmentTask,
  TaskLifecycleStatus
} from "../types/developmentGuardian";
import { mfaService } from "../services/mfaService";
import { CANONICAL_TEST_SUITES } from "./runAllSuites";

async function runGuardianWorkflowTests() {
  console.log("==========================================================================");
  console.log("🛡️  MOOS TECHY ACADEMY — DEVELOPMENT GUARDIAN ORCHESTRATION VERIFICATION");
  console.log("==========================================================================");

  // --------------------------------------------------------------------------
  // Vector 1: Development Guardian Central Awareness & State Models
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 1: Development Guardian Central Awareness & State Models ---");
  const report = developmentGuardianService.generateStateReport();

  assert.ok(report.currentObjective.length > 0, "Guardian must maintain current objective");
  assert.ok(report.currentPhase.includes("Phase 3"), "Guardian must track active phase");
  assert.ok(report.knownRisks.length >= 3, "Guardian must maintain awareness of known institutional risks");
  assert.ok(report.requirementsSummary.total >= 10, "Guardian must track at least 10 core requirements");
  assert.strictEqual(report.canonicalSuitesVerified, 19, "Guardian must protect the 19-suite canonical baseline");

  console.log("✅ [PASS] Development Guardian maintains operational awareness across objectives, risks, and suites");

  // --------------------------------------------------------------------------
  // Vector 2: Specialist Agent Registry & Execution Boundary Enforcement
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 2: Specialist Agent Registry & Execution Boundary Enforcement ---");
  const expectedAgents: GuardianAgentRole[] = [
    "development_guardian_agent",
    "architecture_agent",
    "implementation_agent",
    "test_agent",
    "runtime_reality_agent",
    "learner_experience_agent",
    "pedagogical_audit_agent",
    "content_saturation_agent",
    "regression_agent",
    "security_agent",
    "firebase_data_integrity_agent",
    "ai_governance_agent",
    "multimodal_agent",
    "reporting_agent"
  ];

  const registeredAgents = guardianAgentRegistry.getAllAgents();
  assert.ok(registeredAgents.length >= 14, `Must register at least 14 specialist agents, found ${registeredAgents.length}`);

  for (const role of expectedAgents) {
    const agent = guardianAgentRegistry.getAgent(role);
    assert.ok(agent, `Agent ${role} must be registered`);
    assert.ok(agent.allowedTools.length > 0, `Agent ${role} must have allowed tools defined`);
    assert.ok(agent.allowedDataScopes.length > 0, `Agent ${role} must have allowed data scopes`);
    assert.ok(agent.forbiddenActions.length > 0, `Agent ${role} must have explicit forbidden actions`);
    assert.ok(agent.verificationResponsibilities.length > 0, `Agent ${role} must have verification responsibilities`);
    assert.ok(agent.escalationRules.length > 0, `Agent ${role} must have escalation rules`);
  }

  // Verify boundary enforcement: Guardian cannot perform autonomous production deploy
  const canDeployAutonomously = guardianAgentRegistry.canPerformAction("development_guardian_agent", "autonomous_production_deploy");
  assert.strictEqual(canDeployAutonomously, false, "Development Guardian must be forbidden from autonomous production deployment");

  // Implementation agent cannot modify security rules without security agent review
  const canImplModSecurity = guardianAgentRegistry.canPerformAction("implementation_agent", "modify_security_rules_without_security_review");
  assert.strictEqual(canImplModSecurity, false, "Implementation Agent must be forbidden from modifying security rules directly");

  // Test agent cannot silently remove canonical suites
  const canRemoveSuite = guardianAgentRegistry.canPerformAction("test_agent", "remove_canonical_test_suite");
  assert.strictEqual(canRemoveSuite, false, "Test Agent must be forbidden from removing canonical suites");

  console.log("✅ [PASS] All 14 specialist agents formalized with strict permissions, data scopes, and forbidden boundaries");

  // --------------------------------------------------------------------------
  // Vector 3: Intelligent Specialist Agent Routing
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 3: Intelligent Specialist Agent Routing ---");

  // 1. Firebase persistence issue
  const firebaseAgents = developmentGuardianService.determineSpecialistAgentsForTask({
    category: "firebase",
    title: "Firestore multi-device profile sync conflict",
    description: "Reconcile offline local profile with remote Firestore snapshot"
  });
  assert.ok(firebaseAgents.includes("firebase_data_integrity_agent"), "Must route to Firebase Data Integrity Agent");
  assert.ok(firebaseAgents.includes("security_agent"), "Must route to Security Agent for ownership");
  assert.ok(firebaseAgents.includes("test_agent"), "Must route to Test Agent");
  assert.ok(firebaseAgents.includes("runtime_reality_agent"), "Must route to Runtime Reality Agent");

  // 2. Smart Board issue
  const smartBoardAgents = developmentGuardianService.determineSpecialistAgentsForTask({
    category: "smartboard",
    title: "Smart Board Masterclass Quadratic Step Inversion",
    description: "Verify topic locking and 20-30 pedagogical states"
  });
  assert.ok(smartBoardAgents.includes("architecture_agent"), "Must route to Architecture Agent");
  assert.ok(smartBoardAgents.includes("implementation_agent"), "Must route to Implementation Agent");
  assert.ok(smartBoardAgents.includes("pedagogical_audit_agent"), "Must route to Pedagogical Audit Agent");
  assert.ok(smartBoardAgents.includes("regression_agent"), "Must route to Regression Agent");

  // 3. Content saturation issue
  const contentAgents = developmentGuardianService.determineSpecialistAgentsForTask({
    category: "content_saturation",
    title: "Curriculum gap in Senior Secondary Physics",
    description: "Add worked derivations and misconception hints for electromagnetic induction"
  });
  assert.ok(contentAgents.includes("content_saturation_agent"), "Must route to Content Saturation Agent");
  assert.ok(contentAgents.includes("pedagogical_audit_agent"), "Must route to Pedagogical Audit Agent");

  // 4. Mathematical speech issue
  const mathSpeechAgents = developmentGuardianService.determineSpecialistAgentsForTask({
    category: "mathematical_speech",
    title: "Pronunciation of superscripts vs subscripts",
    description: "Ensure x^2 spoken as x squared and x_1 spoken as x subscript 1"
  });
  assert.ok(mathSpeechAgents.includes("regression_agent"), "Must route to Regression Agent");
  assert.ok(mathSpeechAgents.includes("runtime_reality_agent"), "Must route to Runtime Reality Agent");

  // 5. Multimodal issue
  const multimodalAgents = developmentGuardianService.determineSpecialistAgentsForTask({
    category: "multimodal",
    title: "Veo 3.1 video aspect ratio and live audio streaming",
    description: "Enforce 16:9 and 9:16 constraints and 16kHz PCM capture"
  });
  assert.ok(multimodalAgents.includes("multimodal_agent"), "Must route to Multimodal Agent");

  console.log("✅ [PASS] Dynamic specialist agent routing maps domain tasks to precise agent clusters");

  // --------------------------------------------------------------------------
  // Vector 4: Persistent Requirement Memory & Staleness Auditing
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 4: Persistent Requirement Memory & Staleness Auditing ---");
  const allReqs = requirementRegistryService.getAllRequirements();
  assert.ok(allReqs.length >= 10, "Requirement registry must maintain core architectural invariants");

  const mathReq = requirementRegistryService.getRequirementById("REQ-MATH-001");
  assert.ok(mathReq, "Mathematical speech requirement REQ-MATH-001 must exist");
  assert.strictEqual(mathReq.priority, "critical", "Mathematical speech invariant must be critical priority");

  const fireReq = requirementRegistryService.getRequirementById("REQ-FIRE-001");
  assert.ok(fireReq, "Firebase persistence requirement REQ-FIRE-001 must exist");

  const aiGovReq = requirementRegistryService.getRequirementById("REQ-AIGOV-001");
  assert.ok(aiGovReq, "AI governance requirement REQ-AIGOV-001 must exist");

  // Record evidence on requirement
  const updated = requirementRegistryService.updateRequirementStatus("REQ-MATH-001", "RUNTIME_VERIFIED", {
    id: "ev-test-math-01",
    type: "test_result",
    timestamp: new Date().toISOString(),
    agentId: "regression_agent",
    summary: "Verified speech synthesis distinguishing powers from subscripts",
    verified: true
  });
  assert.strictEqual(updated, true, "Must successfully update requirement status with evidence");

  const verifiedMathReq = requirementRegistryService.getRequirementById("REQ-MATH-001");
  assert.strictEqual(verifiedMathReq?.status, "RUNTIME_VERIFIED", "Status must reflect verified state");
  assert.ok(verifiedMathReq?.evidence.length! > 0, "Evidence item must be attached");

  console.log("✅ [PASS] Requirement Memory Registry preserves requirements and attaches verifiable evidence");

  // --------------------------------------------------------------------------
  // Vector 5: Requirement Drift Detection Engine
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 5: Requirement Drift Detection Engine ---");

  // 1. Math formulas in Literature
  const mathInLitDrift = developmentGuardianService.detectRequirementDrift({
    targetSystem: "SmartBoard",
    description: "Introduce quadratic discriminant formula step into English Literature analysis"
  });
  assert.ok(mathInLitDrift.length > 0, "Must detect math formula contamination in literature");
  assert.strictEqual(mathInLitDrift[0].type, "SUBJECT_MISMATCH", "Drift type must be SUBJECT_MISMATCH");

  // 2. AI Governance Bypass
  const aiBypassDrift = developmentGuardianService.detectRequirementDrift({
    targetSystem: "AiTeacherCopilot",
    description: "Auto-approve and dispatch AI generated test questions directly to learners to bypass human approval"
  });
  assert.ok(aiBypassDrift.length > 0, "Must detect AI governance bypass");
  assert.strictEqual(aiBypassDrift[0].type, "AI_GOVERNANCE_BYPASS", "Drift type must be AI_GOVERNANCE_BYPASS");

  // 3. Audio Data Hoarding
  const audioDrift = developmentGuardianService.detectRequirementDrift({
    targetSystem: "Multimodal",
    description: "Save raw audio stream buffer to permanent local storage disk"
  });
  assert.ok(audioDrift.length > 0, "Must detect audio data hoarding");
  assert.strictEqual(audioDrift[0].type, "AUDIO_DATA_HOARDING", "Drift type must be AUDIO_DATA_HOARDING");

  // 4. Firestore Ownership Bypass
  const fireDrift = developmentGuardianService.detectRequirementDrift({
    targetSystem: "FirebaseSync",
    description: "Allow public write or bypass_auth in Firestore user profile migration"
  });
  assert.ok(fireDrift.length > 0, "Must detect Firestore ownership boundary bypass");
  assert.strictEqual(fireDrift[0].type, "OWNERSHIP_BOUNDARY_BYPASS", "Drift type must be OWNERSHIP_BOUNDARY_BYPASS");

  console.log("✅ [PASS] Requirement Drift Engine detects cross-domain contamination and architectural violations");

  // --------------------------------------------------------------------------
  // Vector 6: Quality Gates & Substantive Finding Invariants
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 6: Quality Gates & Substantive Finding Invariants ---");

  const gateFindings = developmentGuardianService.evaluateQualityGates({
    domain: "Mathematics",
    statesCount: 8, // Too short! Expected 20-30
    hasBeginnerFoundation: false,
    hasGuidedPractice: false,
    isGenericTemplate: true
  });

  const codes = gateFindings.map((f) => f.code);
  assert.ok(codes.includes("INAPPROPRIATE_TEMPLATE"), "Quality gate must catch generic templates");
  assert.ok(codes.includes("INSUFFICIENT_CONTENT_DEPTH"), "Quality gate must catch insufficient depth (<15 states)");
  assert.ok(codes.includes("MISSING_BEGINNER_FOUNDATION"), "Quality gate must catch missing beginner intuition");
  assert.ok(codes.includes("MISSING_GUIDED_PRACTICE"), "Quality gate must catch missing guided practice");

  console.log("✅ [PASS] Quality Gate evaluates depth, pedagogical sequencing, and template legitimacy");

  // --------------------------------------------------------------------------
  // Vector 7: Human Approval Gates & High-Risk Quarantine
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 7: Human Approval Gates & High-Risk Quarantine ---");

  // Create a high-risk task
  const highRiskTask = developmentGuardianService.createTask({
    title: "Production Deploy and purge_database of legacy learner schema",
    description: "Execute destructive migration across all institutional learner records",
    sourceRequirement: "REQ-AUDIT-001",
    priority: "critical",
    category: "devops",
    affectedSystems: ["Database", "LearnerRepository"],
    dependencies: [],
    riskLevel: "critical",
    status: "QUEUED",
    assignedAgent: "development_guardian_agent",
    requiredVerification: ["SECURITY_VERIFIED"],
    acceptanceCriteria: ["Audit trail preserved"],
    regressionRisks: ["Irreversible data loss"],
    humanApprovalRequired: true,
    humanApprovalStatus: "pending",
    maxRetries: 3
  });

  assert.strictEqual(highRiskTask.humanApprovalRequired, true, "High risk task must mandate human approval");
  assert.strictEqual(highRiskTask.humanApprovalStatus, "pending", "Initial status must be pending approval");

  // Attempt to autonomously execute without approval -> MUST HALT
  const executionAttempt = await developmentGuardianService.executeVerificationLoop(highRiskTask.taskId);
  assert.strictEqual(executionAttempt.status, "AWAITING_APPROVAL", "Autonomous execution must be blocked at approval gate");

  // Issue verified second-factor MFA assurance (AAL2) for SuperAdmin
  mfaService.issueAssuranceTicket("SuperAdmin_Dr_Moos", "totp");

  // Admin approves the task with verified MFA assurance
  const approvalRes = developmentGuardianService.approveTaskByHuman(highRiskTask.taskId, "SuperAdmin_Dr_Moos");
  assert.strictEqual(approvalRes.success, true, "Approval must succeed with admin signature and MFA assurance");

  const approvedTask = developmentGuardianService.getTask(highRiskTask.taskId);
  assert.strictEqual(approvedTask?.humanApprovalStatus, "approved", "Task must record approved status");
  assert.strictEqual(approvedTask?.approvedBy, "SuperAdmin_Dr_Moos", "Task must preserve approver provenance");

  console.log("✅ [PASS] Human approval gate strictly quarantines high-risk actions until signed off by admin");

  // --------------------------------------------------------------------------
  // Vector 8: Bounded Autonomous Verification Loop & Failure Cap
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 8: Bounded Autonomous Verification Loop & Failure Cap ---");

  const retryTestTask = developmentGuardianService.createTask({
    title: "Automated Resilient Retry Verification Task",
    description: "Verify retry bounds prevent infinite loops on failing tasks",
    sourceRequirement: "REQ-TEST-001",
    priority: "low",
    category: "devops",
    affectedSystems: ["Harness"],
    dependencies: [],
    riskLevel: "low",
    status: "QUEUED",
    assignedAgent: "test_agent",
    requiredVerification: ["TESTED"],
    acceptanceCriteria: ["Bounded retries enforce maximum attempt limits"],
    regressionRisks: [],
    humanApprovalRequired: false,
    humanApprovalStatus: "not_required",
    maxRetries: 3
  });

  // Simulate 3 consecutive verification failures
  const failingRunner = async () => ({
    passed: false,
    evidence: {
      id: "ev-fail",
      type: "test_result" as const,
      timestamp: new Date().toISOString(),
      agentId: "test_agent" as const,
      summary: "Simulated assertion mismatch",
      verified: false
    },
    remainingIssues: ["Simulated syntax error"]
  });

  // Attempt 1 -> REQUIRES_REVIEW (retryCount = 1)
  const run1 = await developmentGuardianService.executeVerificationLoop(retryTestTask.taskId, failingRunner);
  assert.strictEqual(run1.status, "REQUIRES_REVIEW");

  // Attempt 2 -> REQUIRES_REVIEW (retryCount = 2)
  const run2 = await developmentGuardianService.executeVerificationLoop(retryTestTask.taskId, failingRunner);
  assert.strictEqual(run2.status, "REQUIRES_REVIEW");

  // Attempt 3 -> FAILED (retryCount = 3, reaches maxRetries)
  const run3 = await developmentGuardianService.executeVerificationLoop(retryTestTask.taskId, failingRunner);
  assert.strictEqual(run3.status, "FAILED", "Task must transition to FAILED after reaching maxRetries (no infinite loop)");

  console.log("✅ [PASS] Bounded verification loop strictly halts and caps retries at maxRetries (3)");

  // --------------------------------------------------------------------------
  // Vector 9: Canonical Test Baseline Protection
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 9: Canonical Test Baseline Protection ---");

  // Verify CANONICAL_TEST_SUITES list contains at least 19 suites (currently expanded to 21)
  assert.ok(CANONICAL_TEST_SUITES.length >= 19, `Canonical test runner must protect at least 19 suites, found ${CANONICAL_TEST_SUITES.length}`);
  const suiteNames = CANONICAL_TEST_SUITES.map((s) => s.name);

  const mandatorySuites = [
    "institutionalSecurityForensics",
    "backupRestoreForensics",
    "teacherStudioIntelligence",
    "educationalInvariantsAndResilience",
    "bookpreneurMarketplaceWorkflow",
    "bookpreneurRoyaltyIngestionTextbookRepair",
    "crossPillarIntegrationVerification",
    "runtimeStabilityAndDataContractForensics",
    "auditAndBackupVerification",
    "flagshipContentSaturation",
    "flagshipDomainEndToEndFunctionalCertification",
    "flagshipScenarioVerification",
    "realUserAcceptanceJourneys",
    "aiTeacherCopilotForensics",
    "independentVerificationEngine",
    "interactiveSmartBoardRealityStressTest",
    "mathematicalPronunciationEngine",
    "eslPedagogicalArchitecture",
    "postFirebaseHardeningAndMultimodalRegression"
  ];

  for (const ms of mandatorySuites) {
    assert.ok(suiteNames.includes(ms), `Mandatory canonical suite '${ms}' must be registered in CANONICAL_TEST_SUITES`);
  }

  console.log("✅ [PASS] All 19 canonical test suites protected from removal or pruning");

  // --------------------------------------------------------------------------
  // Vector 10: Agent Readiness Level Calculation
  // --------------------------------------------------------------------------
  console.log("\n--- Vector 10: Agent Readiness Level Calculation ---");
  const readiness = developmentGuardianService.calculateAgentReadinessLevel();
  assert.strictEqual(readiness, 6, "Development operations readiness must calculate to Level 6");

  console.log(`✅ [PASS] Agent Readiness Level calculated accurately: LEVEL ${readiness} (Bounded Autonomous Operations & Governance)`);

  console.log("\n==========================================================================");
  console.log("🎉 ALL DEVELOPMENT GUARDIAN WORKFLOW ORCHESTRATION INVARIANTS VERIFIED (100% GREEN)!");
  console.log("==========================================================================\n");
}

runGuardianWorkflowTests()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Guardian test suite failed:", err);
    process.exit(1);
  });
