import { bookpreneurService } from "../services/bookpreneurService";
import { authorizationService } from "../services/authorizationService";
import { auditService } from "../services/auditService";
import { SEEDED_ADMIN_USER, SEEDED_TEACHER_USER, SEEDED_LEARNER_USER } from "../services/identityService";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ Passed: ${message}`);
  }
}

async function runBookpreneurMarketplaceWorkflowTests() {
  console.log("\n=======================================================");
  console.log("🧪 RUNNING BOOKPRENEUR MARKETPLACE WORKFLOW & RBAC TESTS");
  console.log("=======================================================\n");

  const adminSession = SEEDED_ADMIN_USER;
  const teacherSession = SEEDED_TEACHER_USER;
  const learnerSession = SEEDED_LEARNER_USER;

  // TEST 1: Initial catalog retrieval and filtering
  console.log("--- Test 1: Marketplace Catalog Filtering ---");
  const publishedResources = bookpreneurService.getMarketplaceResources({
    publicationStatus: "PUBLISHED"
  });
  assert(publishedResources.length > 0, "Default published marketplace resources exist");
  assert(
    publishedResources.every((r) => r.publicationStatus === "PUBLISHED"),
    "All returned resources in published catalog have PUBLISHED status"
  );

  const waecResources = bookpreneurService.getMarketplaceResources({
    educationLevel: "WAEC_WASSCE",
    publicationStatus: "PUBLISHED"
  });
  assert(
    waecResources.every((r) => r.educationLevel === "WAEC_WASSCE"),
    "Education level filter correctly constrains results"
  );

  // TEST 2: Creation of a new draft resource by teacher
  console.log("\n--- Test 2: Resource Creation & Draft State ---");
  const created = bookpreneurService.createMarketplaceResource(teacherSession, {
    title: "SS3 Organic Chemistry & Reaction Pathways Codex",
    subtitle: "Complete reaction mechanisms with IUPAC nomenclature drills",
    description: "In-depth guide for WAEC and JAMB chemistry candidates.",
    subject: "Chemistry",
    educationLevel: "SSS_1_3",
    format: "stem_codex",
    price: 4000,
    curriculumAlignment: ["skill-chem-organic-01"],
    learningSupplyIntegration: {
      linkedSkillIds: ["skill-chem-organic-01"],
      linkedUnitIds: ["unit-chem-organic-sss3"],
      practiceArenaDirectSkillId: "skill-chem-organic-01",
      qrResourceCode: "QR-CHEM-SS3-ORG"
    }
  });

  assert(created.id.startsWith("mkt-res-"), "Generated resource has valid ID prefix");
  assert(created.publicationStatus === "DRAFT", "New resource starts in DRAFT status");
  assert(created.creatorId === teacherSession.id, "Creator ID matches active session");

  // TEST 3: Learner RBAC Denial on editorial actions
  console.log("\n--- Test 3: RBAC Security Enforcement ---");
  let learnerFailedToApprove = false;
  try {
    bookpreneurService.approveResource(learnerSession, created.id, "Learner approval attempt");
  } catch (err: any) {
    learnerFailedToApprove = true;
    assert(
      err.message.includes("AUTHORIZATION_DENIED") || err.message.includes("permission"),
      "Learner denied from approving resource"
    );
  }
  assert(learnerFailedToApprove, "Learner approval correctly threw security error");

  // TEST 4: Editorial Lifecycle (Submit -> Approve -> Publish -> Suspend)
  console.log("\n--- Test 4: Full Editorial Approval Pipeline ---");
  const submitted = bookpreneurService.submitResourceForReview(teacherSession, created.id);
  assert(submitted.publicationStatus === "UNDER_REVIEW", "Resource status transitioned to UNDER_REVIEW");

  const approved = bookpreneurService.approveResource(adminSession, created.id, "Passed syllabus verification");
  assert(approved.publicationStatus === "APPROVED", "Resource status transitioned to APPROVED");

  const published = bookpreneurService.publishResource(adminSession, created.id);
  assert(published.publicationStatus === "PUBLISHED", "Resource status transitioned to PUBLISHED");

  // Verify it appears in public catalog
  const catalogAfterPublish = bookpreneurService.getMarketplaceResources({ searchQuery: "Reaction Pathways" });
  assert(catalogAfterPublish.some((r) => r.id === created.id), "Newly published resource discoverable in search");

  // Suspend
  const suspended = bookpreneurService.suspendResource(adminSession, created.id, "Routine quality audit suspension");
  assert(suspended.publicationStatus === "SUSPENDED", "Resource status transitioned to SUSPENDED");

  // Verify hidden from standard public catalog
  const catalogAfterSuspend = bookpreneurService.getMarketplaceResources({ searchQuery: "Reaction Pathways" });
  assert(!catalogAfterSuspend.some((r) => r.id === created.id), "Suspended resource is hidden from public catalog");

  // TEST 5: Audit Trail Verification
  console.log("\n--- Test 5: Audit Trail Governance Ledger ---");
  const auditLogs = auditService.queryLogs();
  const bookpreneurLogs = auditLogs.filter((log) =>
    log.resourceType.toLowerCase().includes("book") ||
    log.resourceType.toLowerCase().includes("marketplace") ||
    log.eventType.includes("MARKETPLACE") ||
    log.eventType.includes("RESOURCE")
  );
  assert(bookpreneurLogs.length >= 4, "Audit logs recorded all marketplace lifecycle transitions");

  console.log("\n🎉 ALL BOOKPRENEUR MARKETPLACE WORKFLOW & GOVERNANCE TESTS PASSED (100%)\n");
}

runBookpreneurMarketplaceWorkflowTests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
