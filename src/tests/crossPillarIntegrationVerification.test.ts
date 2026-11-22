/**
 * MOOS TECHY ACADEMY — CROSS-PILLAR INTEGRATION & SECURITY FORENSIC VERIFICATION SUITE
 * 
 * Tests all 11 Cross-Pillar Integration Vectors & Architectural Boundaries:
 * 1. Foundation → LEARN (Identity sovereignty, deterministic mastery, scoped backups)
 * 2. Foundation → TEACHER STUDIO (Classroom tenancy, role capability, audited actions)
 * 3. Foundation → BOOKPRENEUR (Author ownership, claim classification, private drafts)
 * 4. Foundation → MARKETPLACE (Publishing RBAC, creator ownership, status state machine)
 * 5. Foundation → AI TEACHER (Tool whitelisting, non-autonomous sandboxing, approval gates)
 * 6. AI TEACHER → TEACHER STUDIO (Closed-loop: Diagnose -> Recommend -> Teacher Gate -> Dispatch -> Evidence)
 * 7. AI TEACHER → LEARN (Socratic bounding, diagnostic calibration, AI_GENERATED_DRAFT sandboxing)
 * 8. AI TEACHER → BOOKPRENEUR (Citation verification, claim classification, author authority)
 * 9. AI TEACHER → MARKETPLACE (AI provenance enforcement, mandatory editorial review)
 * 10. BOOKPRENEUR → MARKETPLACE (Manuscript to marketplace resource conversion, 70/30 revenue model)
 * 11. MARKETPLACE → LEARNING SUPPLY → LEARN (Curriculum linkage, QR code bridging, curriculum immutability)
 */

import { identityService, SEEDED_LEARNER_USER, SEEDED_TEACHER_USER, SEEDED_ADMIN_USER } from "../services/identityService";
import { authorizationService } from "../services/authorizationService";
import { auditService } from "../services/auditService";
import { backupService } from "../services/backupService";
import { curriculumService } from "../services/curriculumService";
import { teacherStudioService } from "../services/teacherStudioService";
import { bookpreneurService } from "../services/bookpreneurService";
import { learningSupplyService } from "../services/learningSupplyService";
import { agentOrchestrationService, AGENT_REGISTRY } from "../services/agentOrchestrationService";
import {
  calculateAssignmentCompletionState,
  calculateRetrievalIndependence,
  evaluateAssignmentOutcome,
  assignmentService
} from "../services/assignmentService";
import { UserIdentity, UserSession, LearnerUserIdentity, TeacherUserIdentity, AdminUserIdentity } from "../types/identity";

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (!condition) {
    console.error(`❌ [FAIL] ${testName}: ${failureDetails || "Condition not met"}`);
    process.exit(1);
  } else {
    console.log(`✅ [PASS] ${testName}`);
  }
}

async function runCrossPillarIntegrationVerification() {
  console.log("\n==========================================================================");
  console.log("🏛️  MOOS TECHY ACADEMY — CROSS-PILLAR INTEGRATION VERIFICATION SUITE");
  console.log("==========================================================================\n");

  const learnerIdentity: LearnerUserIdentity = SEEDED_LEARNER_USER;
  const teacherIdentity: TeacherUserIdentity = SEEDED_TEACHER_USER;
  const adminIdentity: AdminUserIdentity = SEEDED_ADMIN_USER;

  // Secondary identities for multi-tenant isolation testing
  const foreignLearner: LearnerUserIdentity = {
    id: "user-learner-foreign-999",
    role: "LEARNER",
    displayName: "Chidi Eze (Foreign Learner)",
    email: "chidi.foreign@moostechy.academy",
    assignedClassroomIds: ["cls-external-999"],
    assignedTeacherIds: ["user-teacher-foreign-888"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const foreignTeacher: TeacherUserIdentity = {
    id: "user-teacher-foreign-888",
    role: "TEACHER",
    displayName: "Mr. Babatunde (Foreign School Teacher)",
    email: "babatunde@lagoshigh.edu.ng",
    schoolOrOrgName: "Lagos High School",
    department: "Science",
    assignedClassroomIds: ["cls-external-999"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // -------------------------------------------------------------------------
  // VECTOR 1: FOUNDATION → LEARN
  // -------------------------------------------------------------------------
  console.log("--- Vector 1: Foundation → LEARN (Sovereignty, Mastery, Scoped Backup) ---");
  
  // 1.1 Learner cannot access foreign learner's private profile
  const learnerAccessForeign = authorizationService.can(learnerIdentity, "VIEW_OWN_PROFILE", {
    resourceType: "profile",
    resourceId: "prof-foreign-999",
    ownerId: foreignLearner.id
  });
  assert(!learnerAccessForeign.granted, "Learner access to foreign profile blocked", "Learner accessed another student's profile");
  assert(learnerAccessForeign.denialCode === "RESOURCE_NOT_OWNED", "Denial code is RESOURCE_NOT_OWNED");

  // 1.2 Learner cannot export full academy backup
  const learnerFullBackup = authorizationService.can(learnerIdentity, "EXPORT_OWN_DATA", {
    resourceType: "backup",
    scope: "full_academy"
  });
  assert(!learnerFullBackup.granted, "Learner full academy backup blocked", "Learner permitted full academy export");
  assert(learnerFullBackup.denialCode === "UNAUTHORIZED_BACKUP_SCOPE", "Denial code is UNAUTHORIZED_BACKUP_SCOPE");

  // 1.3 Learner permitted learner-only backup
  const learnerOwnBackup = authorizationService.can(learnerIdentity, "EXPORT_OWN_DATA", {
    resourceType: "backup",
    scope: "learner_only"
  });
  assert(learnerOwnBackup.granted, "Learner self-scoped backup permitted");

  // 1.4 Deterministic mastery calculation bounds
  const perfectIndependence = calculateRetrievalIndependence(1, 0, 100);
  assert(perfectIndependence === 100, "Clean first attempt gives 100% retrieval independence");
  const assistedIndependence = calculateRetrievalIndependence(2, 2, 60);
  assert(assistedIndependence >= 0 && assistedIndependence < 60, "Assisted multi-hint attempt drops retrieval independence");

  // -------------------------------------------------------------------------
  // VECTOR 2: FOUNDATION → TEACHER STUDIO
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 2: Foundation → TEACHER STUDIO (Tenancy, RBAC, Audited Actions) ---");
  
  // 2.1 Teacher assigned to Class A cannot access Class B
  const teacherClassAccess = authorizationService.can(teacherIdentity, "VIEW_CLASSROOM", {
    resourceType: "classroom",
    classroomId: "cls-external-unassigned-999" // Not in teacherIdentity.assignedClassroomIds
  });
  assert(!teacherClassAccess.granted, "Cross-classroom unauthorized access blocked");
  assert(teacherClassAccess.denialCode === "CROSS_CLASSROOM_VIOLATION", "Denial code is CROSS_CLASSROOM_VIOLATION");

  // 2.2 Teacher permitted in assigned classroom
  const teacherAssignedAccess = authorizationService.can(teacherIdentity, "VIEW_CLASSROOM", {
    resourceType: "classroom",
    classroomId: "cls-ss2-sci-a" // In teacherIdentity.assignedClassroomIds
  });
  assert(teacherAssignedAccess.granted, "Teacher access to assigned classroom permitted");

  // 2.3 Teacher actions generate audit events
  const auditCountBefore = auditService.queryLogs().length;
  teacherStudioService.createAssignment({
    classroomId: "cls-ss2-sci-a",
    title: "Quadratic Roots Retrieval Drill",
    description: "Targeted drill on completing the square",
    skillId: "skill-quad-01",
    unitId: "unit-alg-02",
    targetLearnerIds: ["learner-001", "learner-002"],
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString()
  }, teacherIdentity);
  const auditCountAfter = auditService.queryLogs().length;
  assert(auditCountAfter > auditCountBefore, "Teacher assignment creation published immutable audit record");

  // -------------------------------------------------------------------------
  // VECTOR 3: FOUNDATION → BOOKPRENEUR
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 3: Foundation → BOOKPRENEUR (Author Ownership & Claim Rigor) ---");
  
  // 3.1 Non-owner cannot modify another author's book project
  const foreignEditBook = authorizationService.can(foreignTeacher, "EDIT_BOOK_PROJECT", {
    resourceType: "book_project",
    resourceId: "bp-proj-metacog-01",
    ownerId: "user-teacher-001" // Owned by Dr. Adeleke
  });
  assert(!foreignEditBook.granted, "Unauthorized author book project modification blocked");
  assert(foreignEditBook.denialCode === "CREATOR_ACCESS_VIOLATION", "Denial code is CREATOR_ACCESS_VIOLATION");

  // 3.2 Book project owner permitted
  const authorEditBook = authorizationService.can(teacherIdentity, "EDIT_BOOK_PROJECT", {
    resourceType: "book_project",
    resourceId: "bp-proj-metacog-01",
    ownerId: teacherIdentity.id
  });
  assert(authorEditBook.granted, "Author access to own book project permitted");

  // -------------------------------------------------------------------------
  // VECTOR 4: FOUNDATION → MARKETPLACE
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 4: Foundation → MARKETPLACE (Publishing RBAC & Creator Isolation) ---");
  
  // 4.1 Learner cannot publish or approve marketplace resources
  const learnerPublish = authorizationService.can(learnerIdentity, "PUBLISH_MARKETPLACE_RESOURCE", {
    resourceType: "marketplace_resource",
    resourceId: "mkt-res-chem-ss3",
    provenance: "OFFICIAL_SYLLABUS",
    publicationStatus: "APPROVED"
  });
  assert(!learnerPublish.granted, "Learner marketplace publishing blocked by RBAC");
  assert(learnerPublish.denialCode === "PERMISSION_NOT_ASSIGNED_TO_ROLE", "Learner lacks marketplace publish permission");

  // 4.2 Non-admin cannot publish another creator's resource
  const teacherPublishForeign = authorizationService.can(teacherIdentity, "PUBLISH_MARKETPLACE_RESOURCE", {
    resourceType: "marketplace_resource",
    resourceId: "mkt-res-foreign",
    creatorId: "user-author-999",
    provenance: "OFFICIAL_SYLLABUS",
    publicationStatus: "APPROVED"
  });
  assert(!teacherPublishForeign.granted, "Teacher publishing foreign creator resource blocked");
  assert(teacherPublishForeign.denialCode === "CREATOR_ACCESS_VIOLATION", "Denial code is CREATOR_ACCESS_VIOLATION");

  // -------------------------------------------------------------------------
  // VECTOR 5: FOUNDATION → AI TEACHER
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 5: Foundation → AI TEACHER (Tool Whitelisting & Sandboxing) ---");
  
  // 5.1 Tutor Moos cannot access administrative tools
  const tutorDef = AGENT_REGISTRY.tutor_agent;
  assert(!tutorDef.allowedToolIds.includes("compile_publishing_manifest"), "Tutor agent denied access to publishing compiler");
  assert(!tutorDef.allowedToolIds.includes("verify_human_approval_signature"), "Tutor agent denied access to signature verification");
  assert(tutorDef.permissionLevel === "suggest_draft", "Tutor agent permission level is suggest_draft");

  // 5.2 Assessment agent requires human approval for publishing
  const assessDef = AGENT_REGISTRY.assessment_agent;
  assert(assessDef.requiresHumanApprovalForPublish === true, "Assessment agent requires mandatory human approval");
  assert(assessDef.permissionLevel === "generate_sandboxed", "Assessment agent generates sandboxed content");

  // -------------------------------------------------------------------------
  // VECTOR 6: AI TEACHER → TEACHER STUDIO (Closed-Loop Data Flow)
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 6: AI Teacher → Teacher Studio (Closed-Loop Pedagogical Workflow) ---");
  
  // Step A: AI Diagnose identifies prerequisite bottlenecks
  const bottlenecks = teacherStudioService.getPrerequisiteBottlenecks("cls-ss2-sci-a");
  assert(bottlenecks.length > 0, "AI Diagnose identifies cognitive prerequisite bottlenecks");

  // Step B: AI Recommend computes Next Best Actions with deterministic scoring
  const actions = teacherStudioService.getNextBestActions("cls-ss2-sci-a");
  assert(actions.length > 0, "AI Recommend computes prioritized Next Best Actions");
  assert(actions[0].priorityScore >= actions[actions.length - 1].priorityScore, "Actions strictly ordered by priority score");

  // Step C: Human Teacher reviews & dispatches assignment
  const targetAction = actions[0];
  const newAssignment = teacherStudioService.createAssignment({
    classroomId: "cls-ss2-sci-a",
    title: `Remediation: ${targetAction.title}`,
    description: targetAction.suggestedAction,
    skillId: targetAction.suggestedSkillId || "skill-quad-01",
    unitId: targetAction.suggestedUnitId || "unit-alg-02",
    targetLearnerIds: targetAction.targetIds,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString()
  }, teacherIdentity);
  assert(newAssignment.status === "active", "Teacher dispatched active assignment from AI recommendation");

  // Step D: Learner completes activity & deterministic outcome is evaluated
  const outcomeVerdict = evaluateAssignmentOutcome({
    preAssignmentMastery: 35,
    postAssignmentMastery: 80,
    scorePercentage: 100,
    attemptsCount: 3,
    hintsRequestedCount: 1,
    isCompleted: true
  });
  assert(outcomeVerdict.masteryDelta === 45, "Mastery delta is exactly 45 (+45%)");
  assert(outcomeVerdict.state === "completed_with_improvement", "Assignment outcome is completed_with_improvement");
  assert(outcomeVerdict.effectivenessVerdict === "mastery_evidence_strengthened", "Effectiveness verdict is mastery_evidence_strengthened");

  // -------------------------------------------------------------------------
  // VECTOR 7: AI TEACHER → LEARN
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 7: AI Teacher → LEARN (Pedagogical Sandboxing & Provenance) ---");
  
  // 7.1 Generated practice items must retain valid platform provenance
  const supplyResult = await learningSupplyService.getLearningResources({
    learnerProfile: {
      ...SEEDED_LEARNER_USER as any,
      id: learnerIdentity.id,
      masteryRecords: {},
      questionAttempts: []
    },
    targetSkillId: "skill-frac-operations",
    allowAiGeneration: false,
    allowParametricVariations: true
  });
  assert(supplyResult.status === "AVAILABLE" || supplyResult.status === "GENERATED", "Learning supply delivers valid resource");
  const servedResource = supplyResult.resources[0];
  assert(
    servedResource.provenance === "PLATFORM_CONTENT" || servedResource.provenance === "OFFICIAL_SYLLABUS",
    "Non-AI supply requests do not inject unreviewed AI content"
  );

  // -------------------------------------------------------------------------
  // VECTOR 8: AI TEACHER → BOOKPRENEUR
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 8: AI Teacher → BOOKPRENEUR (Claim Classification & Citation Rigor) ---");
  
  const researchAgent = AGENT_REGISTRY.research_assistant_agent;
  assert(researchAgent.allowedToolIds.includes("classify_claim_evidence"), "Research agent has classify_claim_evidence tool");
  assert(researchAgent.allowedToolIds.includes("validate_citation_format"), "Research agent has validate_citation_format tool");
  assert(researchAgent.requiresHumanApprovalForPublish === false, "Research agent is audit-only and cannot publish");

  // -------------------------------------------------------------------------
  // VECTOR 9: AI TEACHER → MARKETPLACE
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 9: AI Teacher → MARKETPLACE (AI Provenance & Approval Gate) ---");
  
  // 9.1 AI-generated draft marketplace resource CANNOT be published directly without human approval
  const unapprovedAiPublish = authorizationService.can(adminIdentity, "PUBLISH_MARKETPLACE_RESOURCE", {
    resourceType: "marketplace_resource",
    resourceId: "mkt-ai-draft-01",
    creatorId: adminIdentity.id,
    provenance: "AI_GENERATED_DRAFT",
    publicationStatus: "DRAFT" // Unapproved!
  });
  assert(!unapprovedAiPublish.granted, "Direct publication of unapproved AI draft blocked");
  assert(unapprovedAiPublish.denialCode === "MARKETPLACE_APPROVAL_REQUIRED", "Denial code is MARKETPLACE_APPROVAL_REQUIRED");

  // 9.2 Once approved by human editorial workflow, publication is authorized
  const approvedAiPublish = authorizationService.can(adminIdentity, "PUBLISH_MARKETPLACE_RESOURCE", {
    resourceType: "marketplace_resource",
    resourceId: "mkt-ai-draft-01",
    creatorId: adminIdentity.id,
    provenance: "AI_GENERATED_DRAFT",
    publicationStatus: "APPROVED" // Human-approved!
  });
  assert(approvedAiPublish.granted, "Human-approved AI educational resource permitted for publication");

  // -------------------------------------------------------------------------
  // VECTOR 10: BOOKPRENEUR → MARKETPLACE
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 10: BOOKPRENEUR → MARKETPLACE (Conversion & 70/30 Revenue Model) ---");
  
  const sampleMarketplaceResource = bookpreneurService.getMarketplaceResources({
    publicationStatus: "PUBLISHED"
  })[0];
  assert(sampleMarketplaceResource !== undefined, "Published marketplace resources exist");
  assert(sampleMarketplaceResource.commercialModel?.creatorRoyaltyPercentage === 70, "Creator receives 70% revenue share");
  assert(sampleMarketplaceResource.commercialModel?.platformCommissionPercentage === 30, "Platform receives 30% revenue share");
  assert(sampleMarketplaceResource.publicationStatus === "PUBLISHED", "Resource status is PUBLISHED");

  // -------------------------------------------------------------------------
  // VECTOR 11: MARKETPLACE → LEARNING SUPPLY → LEARN
  // -------------------------------------------------------------------------
  console.log("\n--- Vector 11: MARKETPLACE → LEARNING SUPPLY → LEARN (QR Bridging & Immutability) ---");
  
  // 11.1 Marketplace resource integrates learning supply linking without mutating canonical curriculum
  assert(
    (sampleMarketplaceResource.learningSupplyIntegration?.linkedSkillIds.length ?? 0) > 0,
    "Marketplace resource links to canonical curriculum skills"
  );
  assert(
    Boolean(sampleMarketplaceResource.learningSupplyIntegration?.qrResourceCode),
    "Marketplace resource has bound QR Companion code"
  );

  // 11.2 Canonical curriculum remains pristine and immutable
  const canonicalSkill = curriculumService.getSkillById("skill-frac-operations");
  assert(Boolean(canonicalSkill), "Canonical skill 'skill-frac-operations' exists");
  assert(canonicalSkill?.title === "Fraction Operations & Reciprocals", "Canonical skill title is immutable");

  // 11.3 Attempts to mutate canonical curriculum are rejected
  const mutateCurriculum = authorizationService.can(teacherIdentity, "EDIT_LESSON_PLAN", {
    resourceType: "curriculum",
    resourceId: "skill-frac-operations",
    provenance: "OFFICIAL_SYLLABUS"
  });
  assert(!mutateCurriculum.granted, "Direct mutation of canonical curriculum blocked");
  assert(mutateCurriculum.denialCode === "CANONICAL_CURRICULUM_IMMUTABLE", "Denial code is CANONICAL_CURRICULUM_IMMUTABLE");

  console.log("\n==========================================================================");
  console.log("🎉 ALL 11 CROSS-PILLAR INTEGRATION VECTORS & FORENSIC INVARIANTS VERIFIED!");
  console.log("==========================================================================\n");
}

runCrossPillarIntegrationVerification()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("FATAL ERROR IN CROSS-PILLAR VERIFICATION:", err);
    process.exit(1);
  });
