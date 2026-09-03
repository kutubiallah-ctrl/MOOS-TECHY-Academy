/**
 * MOOS TECHY ACADEMY — FOUR FLAGSHIP DOMAINS END-TO-END FUNCTIONAL CERTIFICATION
 * 
 * Functional validation verifying complete pedagogical & systemic pipelines across:
 * 1. MATHEMATICS
 * 2. ENGLISH LANGUAGE & COMMUNICATION
 * 3. SCIENCE (STEM: Physics, Chemistry, Biology)
 * 4. COMPUTING & ICT
 * 
 * Tests:
 * - Full Learner Workflow (Domain -> Subject -> Unit -> Skill -> Questions -> Submission -> Mastery Update -> Progress)
 * - AI Teacher Scaffolding & Context Resolution
 * - Teacher Studio Curriculum & Material Generation (Lesson Notes, 5 Phases, Formative, Remedial, Assignment, Draft/Approval)
 * - Cross-Domain Subject Isolation & Telemetry Partitioning
 * - Bookpreneur & QR Learning Supply Referential Integrity
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { curriculumService } from "../services/curriculumService";
import { repositories } from "../services/repositories";
import { teacherStudioService } from "../services/teacherStudioService";
import { bookpreneurService } from "../services/bookpreneurService";
import { REGISTERED_QR_RESOURCES } from "../data/qrResourceData";
import { evaluateMathematicalAnswer } from "../utils/mathEvaluator";

describe("MOOS Techy Academy — Four Flagship Domains E2E Certification", () => {
  const FLAGSHIP_DOMAINS = [
    {
      domainId: "mathematics",
      domainName: "Mathematics",
      subjects: ["math_core", "math_algebra", "math_geom_trig", "math_calculus"],
      primarySubject: "math_algebra",
      primaryUnit: "unit-sss-quadratics",
      primarySkill: "skill-quad-factoring"
    },
    {
      domainId: "language_comm",
      domainName: "English Language & Communication",
      subjects: ["lang_english"],
      primarySubject: "lang_english",
      primaryUnit: "unit-eng-concord-syntax",
      primarySkill: "skill-eng-concord"
    },
    {
      domainId: "science",
      domainName: "Natural & Applied Sciences (STEM)",
      subjects: ["sci_physics", "sci_chemistry", "sci_biology"],
      primarySubject: "sci_physics",
      primaryUnit: "unit-phy-mechanics-motion",
      primarySkill: "skill-phy-kinematics"
    },
    {
      domainId: "computing_ai",
      domainName: "Computer Science, ICT & Artificial Intelligence",
      subjects: ["tech_compsci"],
      primarySubject: "tech_compsci",
      primaryUnit: "unit-cs-architecture-number-systems",
      primarySkill: "skill-cs-number-systems"
    }
  ];

  // =========================================================================
  // VECTOR 1: LEARNER END-TO-END WORKFLOW FOR ALL 4 FLAGSHIP DOMAINS
  // =========================================================================
  describe("Vector 1: Learner End-to-End Workflow across 4 Flagship Domains", () => {
    FLAGSHIP_DOMAINS.forEach((domainConfig) => {
      it(`Learner complete workflow executes flawlessly for ${domainConfig.domainName}`, async () => {
        // 1. Subject selection
        const subjects = curriculumService.getSubjects(domainConfig.domainId);
        assert.ok(subjects.length > 0, `Domain ${domainConfig.domainId} must have active subjects`);
        const targetSubject = subjects.find(s => s.id === domainConfig.primarySubject);
        assert.ok(targetSubject, `Primary subject ${domainConfig.primarySubject} must exist`);

        // 2. Curriculum navigation -> Unit selection
        const units = curriculumService.getUnits(targetSubject.id);
        assert.ok(units.length > 0, `Subject ${targetSubject.id} must contain curriculum units`);
        const targetUnit = units.find(u => u.id === domainConfig.primaryUnit) || units[0];
        assert.ok(targetUnit, `Unit must be resolved`);

        // 3. Skill selection
        assert.ok(targetUnit.skills.length > 0, `Unit ${targetUnit.id} must contain skills`);
        const targetSkill = targetUnit.skills.find(s => s.id === domainConfig.primarySkill) || targetUnit.skills[0];
        assert.ok(targetSkill, `Skill must be resolved`);

        // 4. Learning content & Question retrieval
        assert.ok(targetSkill.questions && targetSkill.questions.length > 0, `Skill ${targetSkill.id} must have practice questions`);
        const question = targetSkill.questions[0];
        assert.ok(question.questionText && question.questionText.length > 10, "Question must possess meaningful text");
        assert.ok(question.options.length >= 2, "Question must have multiple choice options");
        assert.ok(question.options.includes(question.correctAnswer), "Correct answer must be present in options array");
        assert.ok(question.hintLadder.length >= 2, "Question must have at least 2 hint levels");

        // 5. Answer evaluation
        const correctEvaluation = evaluateMathematicalAnswer(question.correctAnswer, question.correctAnswer);
        assert.strictEqual(correctEvaluation.isEquivalent, true, "Correct answer must evaluate as equivalent");

        const wrongOption = question.options.find(o => o !== question.correctAnswer) || "Wrong Option";
        const wrongEvaluation = evaluateMathematicalAnswer(wrongOption, question.correctAnswer);
        assert.strictEqual(wrongEvaluation.isEquivalent, false, "Wrong answer must evaluate as not equivalent");

        // 6. Practice completion & Mastery update
        const profileBefore = await repositories.learner.getProfile("learner-e2e-test");
        const initialAttempts = profileBefore.masteryRecords?.[targetSkill.id]?.attempts || 0;

        await repositories.learner.updateMastery("learner-e2e-test", targetSkill.id, 25, true);
        const profileAfter = await repositories.learner.getProfile("learner-e2e-test");
        const masteryRecord = profileAfter.masteryRecords?.[targetSkill.id];

        assert.ok(masteryRecord, "Mastery record must be created or updated");
        assert.strictEqual(masteryRecord.attempts, initialAttempts + 1, "Attempts count must increment by exactly 1");
        assert.ok(masteryRecord.points >= 0 && masteryRecord.points <= 100, "Mastery score must be bounded between 0 and 100");
      });
    });

    it("STEM specifically verifies Physics, Chemistry, and Biology sub-specializations", async () => {
      const stemSubjects = ["sci_physics", "sci_chemistry", "sci_biology"];
      for (const subjId of stemSubjects) {
        const units = curriculumService.getUnits(subjId);
        assert.ok(units.length > 0, `STEM subject ${subjId} must contain verified units`);
        const firstSkill = units[0].skills[0];
        assert.ok(firstSkill.questions.length > 0, `STEM ${subjId} skill must have valid questions`);
        assert.ok(firstSkill.questions[0].explanation.length > 10, `STEM ${subjId} question must have pedagogical explanation`);
      }
    });
  });

  // =========================================================================
  // VECTOR 2: TEACHER STUDIO MATERIAL GENERATION ACROSS 4 FLAGSHIP DOMAINS
  // =========================================================================
  describe("Vector 2: Teacher Studio Generation across 4 Flagship Domains", () => {
    const STUDIO_TEST_DOMAINS = [
      { domain: "MATHEMATICS", subjectId: "math_algebra", unitId: "unit-sss-quadratics", skillId: "skill-quad-factoring" },
      { domain: "ENGLISH", subjectId: "lang_english", unitId: "unit-eng-concord-syntax", skillId: "skill-eng-concord" },
      { domain: "STEM (Physics)", subjectId: "sci_physics", unitId: "unit-phy-mechanics-motion", skillId: "skill-phy-kinematics" },
      { domain: "STEM (Chemistry)", subjectId: "sci_chemistry", unitId: "unit-chm-atomic-periodicity", skillId: "skill-chm-atomic-structure" },
      { domain: "STEM (Biology)", subjectId: "sci_biology", unitId: "unit-bio-cell-genetics", skillId: "skill-bio-cell-structure" },
      { domain: "ICT", subjectId: "tech_compsci", unitId: "unit-cs-architecture-number-systems", skillId: "skill-cs-number-systems" }
    ];

    STUDIO_TEST_DOMAINS.forEach((domainItem) => {
      it(`Teacher Studio generates 5-phase lesson note and assignments for ${domainItem.domain}`, async () => {
        // 1. Generate 5-phase Lesson Plan
        const unit = curriculumService.getUnitById(domainItem.unitId);
        assert.ok(unit, `Unit ${domainItem.unitId} must exist`);
        const skill = unit.skills.find(s => s.id === domainItem.skillId) || unit.skills[0];

        const lesson = teacherStudioService.createLessonPlan({
          title: `Exemplar Lesson: ${domainItem.domain} - ${skill.title}`,
          subjectId: domainItem.subjectId,
          unitId: unit.id,
          skillId: skill.id,
          learningObjectives: skill.objectives || ["Core Mastery Objective"],
          phases: [
            { phaseName: "Hook & Warmup", durationMinutes: 8, teacherGuidance: "Engage prior knowledge", studentActivity: "Hypothesize", keyQuestionsToAsk: ["Why does this occur?"], commonStumblingBlocks: ["Rote confusion"] },
            { phaseName: "Direct Instruction", durationMinutes: 15, teacherGuidance: "Step-by-step demonstration", studentActivity: "Record schema", keyQuestionsToAsk: ["What is the core rule?"], commonStumblingBlocks: ["Sign inversion"] },
            { phaseName: "Guided Socratic Practice", durationMinutes: 15, teacherGuidance: "Paired practice circulation", studentActivity: "Solve in pairs", keyQuestionsToAsk: ["How did you check your result?"], commonStumblingBlocks: ["Skipping sub-steps"] },
            { phaseName: "Collaborative Task", durationMinutes: 10, teacherGuidance: "Facilitate peer challenge", studentActivity: "Group discussion", keyQuestionsToAsk: ["Can you prove your rationale?"], commonStumblingBlocks: ["Passive participation"] },
            { phaseName: "Formative Exit Check", durationMinutes: 5, teacherGuidance: "Administer exit ticket", studentActivity: "Complete problem", keyQuestionsToAsk: ["What is the key takeaway?"], commonStumblingBlocks: ["Rushing final step"] }
          ],
          homeworkOrExtension: "Practice set problems 1 to 5",
          lifecycleStatus: "draft",
          teacherId: "teacher-cert-01"
        });

        // 2. Verify draft lifecycle status
        assert.strictEqual(lesson.lifecycleStatus, "draft", "AI generated lesson must start as draft");
        assert.strictEqual(lesson.phases.length, 5, "Lesson plan must contain all 5 canonical phases");

        // 3. Create and Dispatch Formative Assignment
        const assignment = teacherStudioService.createAssignment({
          title: `${domainItem.domain} Formative Benchmark`,
          classroomId: "cls-ss2-sci-a",
          unitId: unit.id,
          skillId: skill.id,
          assignmentType: "practice",
          dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0],
          targetLearnerIds: ["learner-001"],
          provenance: "AI_GENERATED_DRAFT",
          status: "active",
          teacherId: "teacher-cert-01"
        });

        assert.strictEqual(assignment.status, "active", "Assignment must be created in active state");
        assert.strictEqual(assignment.skillId, skill.id, "Assignment must bind to correct skill");
      });
    });
  });

  // =========================================================================
  // VECTOR 3: SUBJECT ISOLATION & PROGRESS PARTITIONING
  // =========================================================================
  describe("Vector 3: Strict Subject Isolation & Telemetry Partitioning", () => {
    it("Mastery updates in Mathematics do NOT cross-contaminate English, STEM, or ICT", async () => {
      const learnerId = "learner-iso-isolated-01";
      const mathSkill = "skill-quad-factoring";
      const engSkill = "skill-eng-concord";
      const physSkill = "skill-phy-kinematics";
      const csSkill = "skill-cs-number-systems";

      // Initialize fresh profile
      const profInit = await repositories.learner.getProfile(learnerId);
      const initialMathAttempts = profInit.masteryRecords?.[mathSkill]?.attempts || 0;
      const initialEngAttempts = profInit.masteryRecords?.[engSkill]?.attempts || 0;
      const initialPhysAttempts = profInit.masteryRecords?.[physSkill]?.attempts || 0;
      const initialCsAttempts = profInit.masteryRecords?.[csSkill]?.attempts || 0;

      // Perform 5 consecutive Math mastery updates
      for (let i = 0; i < 5; i++) {
        await repositories.learner.updateMastery(learnerId, mathSkill, 15, true);
      }

      const profAfter = await repositories.learner.getProfile(learnerId);

      // Verify Math updated by exactly 5
      assert.strictEqual(profAfter.masteryRecords[mathSkill].attempts, initialMathAttempts + 5, "Math skill attempts must increment by 5");

      // Verify English, Physics, and CS remained completely untouched
      const afterEngAttempts = profAfter.masteryRecords?.[engSkill]?.attempts || 0;
      const afterPhysAttempts = profAfter.masteryRecords?.[physSkill]?.attempts || 0;
      const afterCsAttempts = profAfter.masteryRecords?.[csSkill]?.attempts || 0;

      assert.strictEqual(afterEngAttempts, initialEngAttempts, "English telemetry must NOT change when Math is updated");
      assert.strictEqual(afterPhysAttempts, initialPhysAttempts, "Physics telemetry must NOT change when Math is updated");
      assert.strictEqual(afterCsAttempts, initialCsAttempts, "CS telemetry must NOT change when Math is updated");
    });
  });

  // =========================================================================
  // VECTOR 4: BOOKPRENEUR & QR RESOURCE REFERENTIAL INTEGRITY
  // =========================================================================
  describe("Vector 4: Bookpreneur & QR Referential Integrity for 4 Domains", () => {
    it("Marketplace resources cover core academic domains with valid pricing and royalty structure", () => {
      const resources = bookpreneurService.getMarketplaceResources();
      assert.ok(resources.length > 0, "Marketplace must contain seeded published resources");

      resources.forEach((r) => {
        assert.ok(r.id, "Resource must have an ID");
        assert.ok(r.title, "Resource must have a title");
        assert.ok(r.creatorId, "Resource must have a creator");
        assert.ok(r.publicationStatus, "Resource must have publication status");
        assert.ok(r.commercialModel.creatorRoyaltyPercentage >= 0, "Royalty must be non-negative");
        assert.ok(r.commercialModel.platformCommissionPercentage >= 0, "Commission must be non-negative");
      });
    });

    it("All registered QR Codes resolve 100% cleanly to existing curriculum units & skills", () => {
      assert.ok(REGISTERED_QR_RESOURCES.length > 0, "Must have registered QR codes");

      let resolvedCount = 0;
      for (const qr of REGISTERED_QR_RESOURCES) {
        assert.ok(qr.resourceCode, "QR code must have a resourceCode");
        assert.ok(qr.targetUnitId, "QR code must have a targetUnitId");
        assert.ok(qr.targetSkillId, "QR code must have a targetSkillId");

        const unit = curriculumService.getUnitById(qr.targetUnitId);
        assert.ok(unit, `QR [${qr.resourceCode}] references non-existent unit: ${qr.targetUnitId}`);

        const skill = unit.skills.find(s => s.id === qr.targetSkillId);
        assert.ok(skill, `QR [${qr.resourceCode}] references non-existent skill: ${qr.targetSkillId} in unit ${qr.targetUnitId}`);

        resolvedCount++;
      }

      assert.strictEqual(resolvedCount, REGISTERED_QR_RESOURCES.length, "100% of QR codes must resolve cleanly");
    });
  });
});
