/**
 * Flagship Scenario Verification Test Suite
 * Programmatically executes the 4 flagship real-teacher scenarios through the full lifecycle:
 * Draft -> Edit -> Approve -> Dispatch
 * 
 * Scenarios:
 * 1. Mathematics: "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations."
 * 2. English: "Create a 35 minute JSS2 English lesson on parts of speech for learners who are struggling."
 * 3. STEM: "Prepare a 40 minute Primary 6 STEM lesson on pressure with simple activities and differentiated practice."
 * 4. ICT: "Prepare a 45 minute SS2 ICT lesson on database normalization with examples, practice questions and an exit ticket."
 */

import { aiTeacherCopilotService } from "../services/aiTeacherCopilotService";
import { auditService } from "../services/auditService";

interface ScenarioTestCase {
  domain: "Mathematics" | "English" | "STEM" | "ICT";
  prompt: string;
  expectedLevel: string;
  expectedDomain: string;
  expectedType: string;
  expectedDuration: number;
  expectedTopicSnippet: string;
  teacherEditPatch: {
    teacherNotes: string;
    targetClass?: string;
  };
}

const FLAGSHIP_SCENARIOS: ScenarioTestCase[] = [
  {
    domain: "Mathematics",
    prompt: "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations.",
    expectedLevel: "senior_secondary",
    expectedDomain: "Mathematics",
    expectedType: "lesson_plan",
    expectedDuration: 40,
    expectedTopicSnippet: "quadratic",
    teacherEditPatch: {
      teacherNotes: "Teacher customization: Emphasize completing the square before quadratic formula in SS1-A.",
      targetClass: "SS1-A"
    }
  },
  {
    domain: "English",
    prompt: "Create a 35 minute JSS2 English lesson on parts of speech for learners who are struggling.",
    expectedLevel: "junior_secondary",
    expectedDomain: "English",
    expectedType: "lesson_plan",
    expectedDuration: 35,
    expectedTopicSnippet: "parts of speech",
    teacherEditPatch: {
      teacherNotes: "Teacher customization: Add extra sentence strip sorting practice for struggling students.",
      targetClass: "JSS2-B"
    }
  },
  {
    domain: "STEM",
    prompt: "Prepare a 40 minute Primary 6 STEM lesson on pressure with simple activities and differentiated practice.",
    expectedLevel: "upper_primary",
    expectedDomain: "STEM",
    expectedType: "lesson_plan",
    expectedDuration: 40,
    expectedTopicSnippet: "pressure",
    teacherEditPatch: {
      teacherNotes: "Teacher customization: Have students press flat eraser vs sharpened pencil into clay blocks.",
      targetClass: "Primary 6-Gold"
    }
  },
  {
    domain: "ICT",
    prompt: "Prepare a 45 minute SS2 ICT lesson on database normalization with examples, practice questions and an exit ticket.",
    expectedLevel: "senior_secondary",
    expectedDomain: "ICT",
    expectedType: "lesson_plan",
    expectedDuration: 45,
    expectedTopicSnippet: "database normalization",
    teacherEditPatch: {
      teacherNotes: "Teacher customization: Ensure students write out the composite keys explicitly before applying 2NF.",
      targetClass: "SS2-Science"
    }
  }
];

export async function runFlagshipScenarioVerification() {
  console.log("================================================================================");
  console.log("AI TEACHER COPILOT: REAL TEACHER USABILITY CERTIFICATION TEST SUITE");
  console.log("Executing 4 Flagship Scenarios through Complete Lifecycle (Draft -> Edit -> Approve -> Dispatch)");
  console.log("================================================================================\n");

  const results: {
    domain: string;
    prompt: string;
    draftSuccess: boolean;
    editSuccess: boolean;
    approveSuccess: boolean;
    dispatchSuccess: boolean;
    curriculumUnit: string;
    skillTitle: string;
    questionsCount: number;
    hasExitTicket: boolean;
    hasDifferentiationOrRemedial: boolean;
    auditEventsCount: number;
  }[] = [];

  const initialAuditCount = auditService.getEvents().length;
  const mockTeacherId = "teacher-cert-user-01";

  for (const scenario of FLAGSHIP_SCENARIOS) {
    console.log(`\n--------------------------------------------------------------------------------`);
    console.log(`▶ TESTING SCENARIO: ${scenario.domain.toUpperCase()}`);
    console.log(`Prompt: "${scenario.prompt}"`);
    console.log(`--------------------------------------------------------------------------------`);

    // STAGE 1: DRAFT (Generation from Teacher Natural Language Prompt)
    console.log(`[Stage 1: DRAFT] Parsing prompt and generating curriculum-grounded draft...`);
    const parsed = aiTeacherCopilotService.parsePrompt(scenario.prompt);
    
    // Assert parsing accuracy
    if (parsed.targetLevel !== scenario.expectedLevel) {
      throw new Error(`[${scenario.domain}] Expected level ${scenario.expectedLevel}, got ${parsed.targetLevel}`);
    }
    if (!parsed.targetDomain.toLowerCase().includes(scenario.expectedDomain.toLowerCase())) {
      throw new Error(`[${scenario.domain}] Expected domain ${scenario.expectedDomain}, got ${parsed.targetDomain}`);
    }
    if (parsed.durationMinutes !== scenario.expectedDuration) {
      throw new Error(`[${scenario.domain}] Expected duration ${scenario.expectedDuration}, got ${parsed.durationMinutes}`);
    }
    if (!parsed.topic.toLowerCase().includes(scenario.expectedTopicSnippet.toLowerCase())) {
      throw new Error(`[${scenario.domain}] Expected topic to include '${scenario.expectedTopicSnippet}', got '${parsed.topic}'`);
    }
    console.log(`  ✓ Prompt Parsed Accurately: Level=${parsed.targetLevel}, Domain=${parsed.targetDomain}, Duration=${parsed.durationMinutes}m, Type=${parsed.detectedType}`);

    const draftMaterial = await aiTeacherCopilotService.generateMaterial({
      rawPrompt: scenario.prompt,
      level: parsed.targetLevel,
      domain: parsed.targetDomain,
      topic: parsed.topic,
      materialType: parsed.detectedType,
      durationMinutes: parsed.durationMinutes,
      isDifferentiated: parsed.isDifferentiated || scenario.domain === "STEM" || scenario.domain === "English",
      isRemedial: parsed.isRemedial
    }, mockTeacherId);

    const isDraftValid = draftMaterial.provenance === "AI_GENERATED_DRAFT" && 
      (draftMaterial.lifecycleStatus === "awaiting_human_approval" || draftMaterial.lifecycleStatus === "draft");

    if (!isDraftValid) {
      throw new Error(`[${scenario.domain}] Initial lifecycleStatus should be 'awaiting_human_approval' or 'draft', got ${draftMaterial.lifecycleStatus}`);
    }
    if (!draftMaterial.unitId || !draftMaterial.skillId) {
      throw new Error(`[${scenario.domain}] Material missing curriculum unit or skill alignment`);
    }
    if (draftMaterial.questions.length === 0) {
      throw new Error(`[${scenario.domain}] Material must contain pedagogical questions`);
    }
    console.log(`  ✓ Draft Generated Successfully: ID=${draftMaterial.id}, Title="${draftMaterial.title}"`);
    console.log(`  ✓ Curriculum Aligned: Unit="${draftMaterial.unitTitle}", Skill="${draftMaterial.skillTitle}"`);
    console.log(`  ✓ Pedagogical Structure: Sections=${draftMaterial.sections.length}, Questions=${draftMaterial.questions.length}, Has Exit Ticket=${!!draftMaterial.exitTicket}`);

    // STAGE 2: EDIT (Teacher Refinement & Modification)
    console.log(`[Stage 2: EDIT] Applying teacher refinement and pedagogic notes...`);
    const updatedMaterial = aiTeacherCopilotService.updateMaterial(draftMaterial.id, {
      teacherNotes: scenario.teacherEditPatch.teacherNotes,
      classroomName: scenario.teacherEditPatch.targetClass
    });

    if (updatedMaterial.teacherNotes !== scenario.teacherEditPatch.teacherNotes) {
      throw new Error(`[${scenario.domain}] Teacher notes were not properly updated`);
    }
    if (updatedMaterial.provenance !== "TEACHER_EDITED_DRAFT") {
      throw new Error(`[${scenario.domain}] Expected provenance 'TEACHER_EDITED_DRAFT', got ${updatedMaterial.provenance}`);
    }
    const isEditValid = updatedMaterial.teacherNotes === scenario.teacherEditPatch.teacherNotes &&
      updatedMaterial.provenance === "TEACHER_EDITED_DRAFT";
    console.log(`  ✓ Teacher Edits Applied: Provenance=${updatedMaterial.provenance}, Notes="${updatedMaterial.teacherNotes.slice(0, 45)}..."`);

    // STAGE 3: APPROVE (Teacher Review & Regulatory / Pedagogical Approval)
    console.log(`[Stage 3: APPROVE] Teacher verifying and approving material for classroom use...`);
    const approvedMaterial = aiTeacherCopilotService.approveMaterial(draftMaterial.id, mockTeacherId);

    if (approvedMaterial.lifecycleStatus !== "approved" || approvedMaterial.provenance !== "TEACHER_APPROVED") {
      throw new Error(`[${scenario.domain}] Expected lifecycleStatus 'approved' and provenance 'TEACHER_APPROVED', got status=${approvedMaterial.lifecycleStatus}, provenance=${approvedMaterial.provenance}`);
    }
    const isApproveValid = approvedMaterial.lifecycleStatus === "approved" &&
      approvedMaterial.provenance === "TEACHER_APPROVED";
    console.log(`  ✓ Material Approved: Status=${approvedMaterial.lifecycleStatus}, Provenance=${approvedMaterial.provenance}, Reviewer="${approvedMaterial.reviewedBy}"`);

    // STAGE 4: DISPATCH (Classroom Assignment / Dispatch)
    console.log(`[Stage 4: DISPATCH] Dispatching approved material to student cohort...`);
    const targetClassId = draftMaterial.classroomId || "cls-ss2-sci-a";
    const assignment = aiTeacherCopilotService.dispatchMaterialAsAssignment(
      draftMaterial.id,
      targetClassId
    );

    if (!assignment || !assignment.id) {
      throw new Error(`[${scenario.domain}] Dispatch failed to return a valid assignment`);
    }

    const dispatchedMaterial = aiTeacherCopilotService.getMaterialById(draftMaterial.id);
    if (!dispatchedMaterial || dispatchedMaterial.lifecycleStatus !== "published") {
      throw new Error(`[${scenario.domain}] Material lifecycleStatus after dispatch should be 'published', got ${dispatchedMaterial?.lifecycleStatus}`);
    }
    const isDispatchValid = !!assignment.id && dispatchedMaterial.lifecycleStatus === "published";
    console.log(`  ✓ Material Dispatched: Assignment ID=${assignment.id}, Assignment Title="${assignment.title}", Material Status=${dispatchedMaterial.lifecycleStatus}`);

    results.push({
      domain: scenario.domain,
      prompt: scenario.prompt,
      draftSuccess: isDraftValid,
      editSuccess: isEditValid,
      approveSuccess: isApproveValid,
      dispatchSuccess: isDispatchValid,
      curriculumUnit: draftMaterial.unitTitle,
      skillTitle: draftMaterial.skillTitle,
      questionsCount: draftMaterial.questions.length,
      hasExitTicket: !!draftMaterial.exitTicket,
      hasDifferentiationOrRemedial: !!draftMaterial.differentiationTiers || !!draftMaterial.remedialSupport,
      auditEventsCount: auditService.getEvents().length - initialAuditCount
    });
  }

  console.log("\n================================================================================");
  console.log("CERTIFICATION RESULTS SUMMARY");
  console.log("================================================================================");
  console.table(results.map(r => ({
    Domain: r.domain,
    Draft: r.draftSuccess ? "PASS" : "FAIL",
    Edit: r.editSuccess ? "PASS" : "FAIL",
    Approve: r.approveSuccess ? "PASS" : "FAIL",
    Dispatch: r.dispatchSuccess ? "PASS" : "FAIL",
    Unit: r.curriculumUnit.slice(0, 30),
    Questions: r.questionsCount,
    ExitTicket: r.hasExitTicket ? "YES" : "NO",
    DiffRemedial: r.hasDifferentiationOrRemedial ? "YES" : "NO"
  })));

  const allPassed = results.every(r => r.draftSuccess && r.editSuccess && r.approveSuccess && r.dispatchSuccess);
  if (allPassed) {
    console.log("\n>>> CERTIFICATION RESULT: ALL 4 FLAGSHIP SCENARIOS PASSED 100% <<<");
    console.log("Real Teacher usability requirements verified across all four stages of the lifecycle.");
  } else {
    throw new Error("One or more scenarios failed certification.");
  }

  return results;
}

// If executed directly via CLI
if (typeof process !== "undefined" && process.argv[1]?.includes("flagshipScenarioVerification")) {
  runFlagshipScenarioVerification()
    .then(() => {
      console.log("\nProcess completed with exit code 0");
      process.exit(0);
    })
    .catch((err) => {
      console.error("\nCertification test execution error:", err);
      process.exit(1);
    });
}
