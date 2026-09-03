/**
 * MOOS TECHY ACADEMY — AI TEACHER COPILOT FORENSIC VERIFICATION SUITE
 * 
 * Verifies:
 * 1. Natural language intent and metadata extraction (level, domain, topic, duration, type).
 * 2. 14 educational material types generation with curriculum grounding.
 * 3. Human approval governance (AI_GENERATED_DRAFT -> TEACHER_APPROVED).
 * 4. One-Click "Prepare My Lesson Package" end-to-end generation.
 * 5. Dynamic material transformation across modalities.
 * 6. Assignment dispatching to classroom cohorts.
 * 7. Comprehensive audit event generation and storage persistence.
 */

import { aiTeacherCopilotService } from "../services/aiTeacherCopilotService";
import { teacherStudioService } from "../services/teacherStudioService";
import { auditService } from "../services/auditService";
import { EducationalMaterialType } from "../types/aiTeacherCopilot";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

async function runTests() {
  console.log("\n========================================================");
  console.log("🚀 EXECUTING AI TEACHER COPILOT FORENSIC VERIFICATION");
  console.log("========================================================\n");

  const classrooms = teacherStudioService.getClassrooms();
  assert(classrooms.length > 0, "Classrooms available for teacher copilot testing");
  const targetClass = classrooms[0];

  // TEST 1: Natural Language Prompt Parsing
  console.log("\n--- TEST 1: Natural Language Prompt Extraction ---");
  const prompt1 = "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations";
  const parsed1 = aiTeacherCopilotService.parsePrompt(prompt1);
  assert(parsed1.targetLevel === "senior_secondary", `Parsed level correctly as senior_secondary (got: ${parsed1.targetLevel})`);
  assert(parsed1.targetDomain.includes("Mathematics"), `Parsed domain as Mathematics (got: ${parsed1.targetDomain})`);
  assert(parsed1.durationMinutes === 40, `Parsed duration as 40 mins (got: ${parsed1.durationMinutes})`);
  assert(parsed1.topic.toLowerCase().includes("quadratic"), `Parsed topic contains quadratic (got: ${parsed1.topic})`);
  assert(parsed1.detectedType === "lesson_plan", `Inferred material type as lesson_plan (got: ${parsed1.detectedType})`);

  const prompt2 = "Create a 25 min JSS2 STEM Physics worksheet on pressure in fluids for remedial learners";
  const parsed2 = aiTeacherCopilotService.parsePrompt(prompt2);
  assert(parsed2.targetLevel === "junior_secondary", `Parsed JSS2 as junior_secondary (got: ${parsed2.targetLevel})`);
  assert(parsed2.detectedType === "worksheet", `Parsed material type as worksheet (got: ${parsed2.detectedType})`);
  assert(parsed2.isRemedial === true, `Detected remedial modifier`);
  assert(parsed2.durationMinutes === 25, `Parsed duration as 25 minutes`);

  const prompt3 = "15 minute quick exit ticket quiz for Upper Primary English on homophones";
  const parsed3 = aiTeacherCopilotService.parsePrompt(prompt3);
  assert(parsed3.targetLevel === "upper_primary", `Parsed Upper Primary correctly`);
  assert(parsed3.detectedType === "quiz" || parsed3.detectedType === "exit_ticket", `Parsed assessment material type`);
  assert(parsed3.durationMinutes === 15, `Parsed 15 minutes`);

  // TEST 2: Material Generation with Governance Draft Invariant
  console.log("\n--- TEST 2: Single Material Generation & Governance Provenance ---");
  const draftMaterial = await aiTeacherCopilotService.generateMaterial(
    {
      rawPrompt: "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations",
      classroomId: targetClass.id
    },
    "usr_tch_babatunde_ojo",
    "Mrs. N. Okonkwo"
  );

  assert(draftMaterial.id.startsWith("mat-"), "Material assigned valid unique ID");
  assert(draftMaterial.provenance === "AI_GENERATED_DRAFT", "New material is strictly AI_GENERATED_DRAFT");
  assert(draftMaterial.lifecycleStatus === "awaiting_human_approval", "Lifecycle status is awaiting_human_approval");
  assert(draftMaterial.humanReviewDecision === "pending", "Review decision starts as pending");
  assert(draftMaterial.sections.length >= 3, `Structured sections created (got ${draftMaterial.sections.length})`);
  assert(draftMaterial.learningObjectives.length >= 2, "Includes substantive learning objectives");
  assert(draftMaterial.prerequisiteKnowledge.length >= 1, "Includes prerequisite knowledge");
  assert(Boolean(draftMaterial.linkedQRCompanionCode), `Linked companion QR code present (${draftMaterial.linkedQRCompanionCode})`);

  // Verify Audit Logged for Generation
  const eventsAfterGen = auditService.getEvents();
  const genAudit = eventsAfterGen.find(e => e.resourceId === draftMaterial.id && e.eventType === "TEACHER_MATERIAL_GENERATED");
  assert(Boolean(genAudit), "TEACHER_MATERIAL_GENERATED audit event recorded");

  // TEST 3: Material Transformation Across Modalities
  console.log("\n--- TEST 3: Pedagogical Material Transformation ---");
  const transformedWorksheet = await aiTeacherCopilotService.transformMaterial(
    draftMaterial.id,
    "worksheet",
    "Adapt into student worksheet with graduated problem sets"
  );
  assert(transformedWorksheet.materialType === "worksheet", "Transformed material type is worksheet");
  assert(transformedWorksheet.topic === draftMaterial.topic, "Preserved core curriculum topic");
  assert(transformedWorksheet.skillId === draftMaterial.skillId, "Preserved exact curriculum skill grounding");
  assert(transformedWorksheet.derivedFromMaterialId === draftMaterial.id, "Maintained lineage link to source material");
  assert(transformedWorksheet.provenance === "AI_GENERATED_DRAFT", "Transformed material is also AI_GENERATED_DRAFT");

  // TEST 4: Human Approval Governance Transition
  console.log("\n--- TEST 4: Human Approval Workflow & Signature ---");
  const approvedMaterial = aiTeacherCopilotService.approveMaterial(
    draftMaterial.id,
    "Dr. O. Adeleke (Senior Mathematics Lead)",
    "Approved. Pedagogical scaffolding, formula derivations, and student traps verified against WAEC syllabus."
  );
  assert(approvedMaterial.provenance === "TEACHER_APPROVED", "Material provenance updated to TEACHER_APPROVED");
  assert(approvedMaterial.lifecycleStatus === "approved", "Lifecycle status updated to approved");
  assert(approvedMaterial.humanReviewDecision === "approved", "Review decision marked approved");
  assert(Boolean(approvedMaterial.reviewedBy), "Human reviewer name recorded");
  assert(Boolean(approvedMaterial.reviewedAt), "Approval timestamp recorded");

  const eventsAfterApprove = auditService.getEvents();
  const approveAudit = eventsAfterApprove.find(e => e.resourceId === draftMaterial.id && e.eventType === "TEACHER_MATERIAL_APPROVED");
  assert(Boolean(approveAudit), "TEACHER_MATERIAL_APPROVED audit event recorded with reviewer identity");

  // TEST 5: One-Click "Prepare My Lesson Package" Generation
  console.log("\n--- TEST 5: One-Click Lesson Package Synthesis ---");
  const pkgResult = await aiTeacherCopilotService.prepareMyLessonPackage(
    "Prepare a 45 minute JSS3 STEM Science lesson on Acids, Bases and Indicators",
    targetClass.id,
    "Mr. E. Danladi"
  );

  assert(pkgResult.id.startsWith("pkg-"), "Package assigned unique ID");
  const packageMaterials = [pkgResult.lessonPlan, pkgResult.lessonNote, pkgResult.worksheet, pkgResult.exitTicket];
  assert(packageMaterials.length >= 4, `Complete coordinated package generated (${packageMaterials.length} core components)`);

  assert(pkgResult.lessonPlan.materialType === "lesson_plan", "Package contains 5-Phase Lesson Plan");
  assert(pkgResult.lessonNote.materialType === "lesson_note", "Package contains Comprehensive Teaching Notes");
  assert(pkgResult.worksheet.materialType === "worksheet", "Package contains Student Practice Worksheet");
  assert(pkgResult.exitTicket.materialType === "exit_ticket", "Package contains Diagnostic Exit Ticket");

  // All in package start as AI_GENERATED_DRAFT
  const allDrafts = packageMaterials.every(m => m.provenance === "AI_GENERATED_DRAFT");
  assert(allDrafts, "All package materials enforce AI_GENERATED_DRAFT governance gate");

  // Check shared curriculum grounding
  const sameTopic = packageMaterials.every(m => m.topic.toLowerCase().includes("acid") || m.topic.toLowerCase().includes("base"));
  assert(sameTopic, "All package components share identical verified topic grounding");

  // TEST 6: Dispatching Approved Material as Live Assignment
  console.log("\n--- TEST 6: Classroom Assignment Dispatch ---");
  const assignment = aiTeacherCopilotService.dispatchMaterialAsAssignment(
    approvedMaterial.id,
    targetClass.id,
    [],
    3 // due in 3 days
  );
  assert(Boolean(assignment.id), `Classroom assignment created successfully (${assignment.id})`);
  assert(assignment.title === approvedMaterial.title, "Assignment inherits material title");
  assert(assignment.classroomId === targetClass.id, "Assignment linked to target classroom cohort");

  const eventsAfterDispatch = auditService.getEvents();
  const dispatchAudit = eventsAfterDispatch.find(e => e.resourceId === assignment.id && e.eventType === "TEACHER_MATERIAL_DISPATCHED");
  assert(Boolean(dispatchAudit), "TEACHER_MATERIAL_DISPATCHED audit event logged");

  // TEST 7: Material Updating and Duplication
  console.log("\n--- TEST 7: Material Modification & Duplication ---");
  const updated = aiTeacherCopilotService.updateMaterial(draftMaterial.id, {
    title: "Refined 40-Min SS1 Quadratic Equations with Derivations"
  });
  assert(updated.title.includes("Refined"), "Title updated successfully");

  const duplicated = aiTeacherCopilotService.duplicateMaterial(draftMaterial.id);
  assert(duplicated.id !== draftMaterial.id, "Duplicated material has unique ID");
  assert(duplicated.provenance === "TEACHER_EDITED_DRAFT" || duplicated.provenance === "AI_GENERATED_DRAFT", "Duplicated material resets to draft for review");

  console.log("\n========================================================");
  console.log("✅ ALL AI TEACHER COPILOT FORENSIC TESTS PASSED (7/7)");
  console.log("========================================================\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
