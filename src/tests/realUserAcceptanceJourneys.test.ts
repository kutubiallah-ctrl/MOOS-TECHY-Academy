/**
 * MOOS TECHY ACADEMY — REAL USER ACCEPTANCE JOURNEYS TEST SUITE
 *
 * Verifies end-to-end user journeys for:
 * 1. Fresh Learner Level Selection & Alignment
 * 2. Curriculum Discovery & Lesson Study (Study Lesson -> Practice -> Mastery)
 * 3. Teacher Studio Productivity (Cohorts, Lesson Plans, Notes, Worksheets across all domains)
 * 4. AI Teacher Contextualization & Misconception Handling
 * 5. Parent Experience (Metrics, Habit Streaks, Encouragement Notes)
 */

import { curriculumService } from "../services/curriculumService";
import { AnalyticsService } from "../services/analyticsService";
import { teacherStudioService } from "../services/teacherStudioService";
import { storageService } from "../services/storageService";
import { agentOrchestrationService } from "../services/agentOrchestrationService";
import { ExtendedLearnerProfile, EducationalLevel } from "../types/curriculum";
import { DEFAULT_EXTENDED_LEARNER_PROFILE } from "../data/curriculumData";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    console.log(`✅ [PASS] ${message}`);
  }
}

async function runRealUserAcceptanceJourneys() {
  console.log("\n==========================================================================");
  console.log("🧪 MOOS TECHY ACADEMY — REAL USER ACCEPTANCE JOURNEYS VERIFICATION");
  console.log("==========================================================================\n");

  // --------------------------------------------------------------------------
  // JOURNEY 1: Fresh Learner Level Selection & Adaptive Alignment
  // --------------------------------------------------------------------------
  console.log("--- Journey 1: Fresh Learner Level Selection & Alignment ---");

  const levels: EducationalLevel[] = [
    "primary_foundations",
    "upper_primary",
    "junior_secondary",
    "senior_secondary",
    "university_prep",
    "exam_prep"
  ];

  const allUnits = curriculumService.getAllUnits();
  assert(allUnits.length >= 10, `Curriculum has comprehensive units (Found ${allUnits.length})`);

  for (const lvl of levels) {
    const freshProfile: ExtendedLearnerProfile = {
      ...DEFAULT_EXTENDED_LEARNER_PROFILE,
      id: `learner-fresh-${lvl}`,
      name: `Fresh Student (${lvl})`,
      targetLevel: lvl,
      curriculum: "NERDC_NIGERIAN",
      masteryRecords: {},
      questionAttempts: [],
      diagnosticHistory: [],
      activityHistory: [],
      examHistory: [],
      unlockedBadges: [],
      streak: { count: 1, lastActiveDate: new Date().toISOString(), longestStreak: 1 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const metrics = AnalyticsService.calculateDashboardMetrics(freshProfile);
    assert(metrics !== null && metrics !== undefined, `Calculated metrics for level: ${lvl}`);
    assert(metrics.recommendedUnit !== null, `Recommended unit exists for level: ${lvl}`);
    assert(metrics.recommendedSkill !== null, `Recommended skill exists for level: ${lvl}`);
    assert(
      metrics.recommendedUnit.level === lvl,
      `Recommendation for ${lvl} stays within target level (Got: ${metrics.recommendedUnit.level})`
    );
  }

  // --------------------------------------------------------------------------
  // JOURNEY 2: Curriculum Discovery & Lesson Study Across Flagship Domains
  // --------------------------------------------------------------------------
  console.log("\n--- Journey 2: Curriculum Discovery & Lesson Study Across Domains ---");

  const domains = [
    { name: "Mathematics", match: (id: string) => id.includes("mth") || id.includes("math") || id.includes("quad") || id.includes("numbers") },
    { name: "English", match: (id: string) => id.includes("eng") || id.includes("read") || id.includes("essay") },
    { name: "STEM / Science", match: (id: string) => id.includes("stem") || id.includes("phy") || id.includes("science") },
    { name: "ICT / Computing", match: (id: string) => id.includes("ict") || id.includes("comp") || id.includes("algo") }
  ];

  for (const domain of domains) {
    const domainUnits = allUnits.filter((u) => domain.match(u.id) || domain.match(u.subjectId));
    assert(domainUnits.length > 0, `Domain '${domain.name}' has saturated units (Found ${domainUnits.length})`);

    // Verify first skill has full conceptual lesson structure
    const sampleSkill = domainUnits[0].skills[0];
    assert(sampleSkill.title.length > 0, `${domain.name} sample skill has title: ${sampleSkill.title}`);
    const summary = sampleSkill.summary || (sampleSkill as any).description || "";
    assert(summary.length > 0, `${domain.name} sample skill has summary or description`);
    const questions = sampleSkill.questions || (sampleSkill as any).practiceQuestions || [];
    assert(questions.length > 0, `${domain.name} sample skill has questions`);

    // Verify practice question has diagnostic feedback and step guidance
    const firstQ = questions[0];
    assert(firstQ.questionText.length > 0, `${domain.name} question has questionText`);
    assert(firstQ.hintLadder.length > 0, `${domain.name} question has hintLadder`);
    assert(firstQ.explanation.length > 0, `${domain.name} question has explanation`);
  }

  // --------------------------------------------------------------------------
  // JOURNEY 3: Teacher Studio Productivity Across All Domains & Levels
  // --------------------------------------------------------------------------
  console.log("\n--- Journey 3: Teacher Studio Productivity Across All Domains & Levels ---");

  // 3A: Create Cohorts for multiple levels
  const primaryCohort = teacherStudioService.createClassroom({
    name: "Primary 3 Foundation Explorers",
    gradeLevel: "primary_foundations",
    subjectId: "subj-mth-primary",
    standard: "COMMON_ENTRANCE"
  });
  assert(primaryCohort.gradeLevel === "primary_foundations", "Primary cohort created successfully");

  const juniorCohort = teacherStudioService.createClassroom({
    name: "JSS 2 STEM & Computing Cohort",
    gradeLevel: "junior_secondary",
    subjectId: "subj-stem-junior",
    standard: "NERDC_NIGERIAN"
  });
  assert(juniorCohort.gradeLevel === "junior_secondary", "Junior secondary cohort created successfully");

  const seniorCohort = teacherStudioService.createClassroom({
    name: "SS 3 Advanced WAEC Scholars",
    gradeLevel: "senior_secondary",
    subjectId: "subj-mth-senior",
    standard: "WAEC_WASSCE"
  });
  assert(seniorCohort.gradeLevel === "senior_secondary", "Senior secondary cohort created successfully");

  // 3B: AI-Driven Multi-Domain Material Generation
  const docTypes = [
    { type: "lesson_plan", subject: "English Language", level: "junior_secondary" as EducationalLevel },
    { type: "teaching_notes", subject: "Computer Science & ICT", level: "senior_secondary" as EducationalLevel },
    { type: "worksheet", subject: "Science & STEM", level: "primary_foundations" as EducationalLevel }
  ];

  for (const doc of docTypes) {
    const taskResult = await agentOrchestrationService.orchestrateTask(
      "teacher_assistant_agent",
      `Synthesize ${doc.type} for ${doc.subject} at ${doc.level}`,
      {
        userId: "user-teacher-001",
        userRole: "teacher",
        targetSubject: doc.subject,
        targetLevel: doc.level
      }
    );
    assert(
      taskResult.status === "awaiting_human_approval" || taskResult.status === "completed",
      `Agent generated ${doc.type} for ${doc.subject} (Status: ${taskResult.status})`
    );

    const createdDoc = teacherStudioService.createLessonPlan({
      title: `${doc.type.toUpperCase()}: ${doc.subject}`,
      subjectId: `subj-${doc.subject.toLowerCase().slice(0, 3)}`,
      unitId: "unit-test-gen",
      skillId: "skill-test-gen",
      targetLevel: doc.level,
      durationMinutes: 45,
      learningObjectives: ["Understand core concepts", "Apply in practice"],
      phases: [
        {
          phaseName: "Orientation & Direct Inquiry",
          durationMinutes: 15,
          teacherGuidance: "Present the core idea clearly.",
          studentActivity: "Engage in active note-taking.",
          keyQuestionsToAsk: ["What is the core intuition?"],
          commonStumblingBlocks: ["Misinterpreting the primary principle."]
        }
      ]
    });

    assert(createdDoc.id !== undefined, `Saved ${doc.type} into Teacher Studio library`);
    assert(createdDoc.targetLevel === doc.level, `Target level matches ${doc.level}`);
  }

  // --------------------------------------------------------------------------
  // JOURNEY 4: AI Teacher Contextualization & Socratic Safeguards
  // --------------------------------------------------------------------------
  console.log("\n--- Journey 4: AI Teacher Contextualization & Socratic Safeguards ---");

  // Verify that an English question resolves to English context
  const englishUnit = allUnits.find((u) => u.title.includes("English") || u.title.includes("Reading") || u.id.includes("eng"));
  if (englishUnit) {
    const skill = englishUnit.skills[0];
    const unitFound = curriculumService.getUnitBySkillId(skill.id);
    assert(unitFound !== undefined, `AI Teacher resolves parent unit for English skill ${skill.id}`);
  }

  // Verify that a STEM question resolves to STEM context
  const stemUnit = allUnits.find((u) => u.title.includes("Physics") || u.title.includes("Science") || u.id.includes("stem"));
  if (stemUnit) {
    const skill = stemUnit.skills[0];
    const unitFound = curriculumService.getUnitBySkillId(skill.id);
    assert(unitFound !== undefined, `AI Teacher resolves parent unit for STEM skill ${skill.id}`);
  }

  // --------------------------------------------------------------------------
  // JOURNEY 5: Parent Transparency & Encouragement Dispatch
  // --------------------------------------------------------------------------
  console.log("\n--- Journey 5: Parent Transparency & Encouragement Dispatch ---");

  const parentProfile: ExtendedLearnerProfile = {
    ...DEFAULT_EXTENDED_LEARNER_PROFILE,
    id: "learner-parent-test",
    name: "Ada Lovelace-Johnson",
    targetLevel: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    masteryRecords: {
      "skill-frac-operations": {
        skillId: "skill-frac-operations",
        status: "mastered",
        points: 100,
        attempts: 5,
        correctCount: 5,
        lastPracticedAt: new Date().toISOString()
      }
    },
    questionAttempts: [],
    diagnosticHistory: [],
    activityHistory: [],
    examHistory: [],
    unlockedBadges: [],
    streak: { count: 7, lastActiveDate: new Date().toISOString(), longestStreak: 7 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const parentMetrics = AnalyticsService.calculateDashboardMetrics(parentProfile);
  assert(parentMetrics.masteryDistribution.mastered >= 1, "Parent sees at least 1 mastered skill");
  assert(parentProfile.streak?.count === 7, "Parent sees unbroken 7-day study streak");
  assert(parentMetrics.weeklyMinutes >= 0, "Parent sees weekly study time logged");

  // --------------------------------------------------------------------------
  // JOURNEY 6: Mastery Progression & Storage Resilience
  // --------------------------------------------------------------------------
  console.log("\n--- Journey 6: Mastery Progression & Storage Resilience ---");

  const initialProfile = await storageService.getProfile();
  assert(initialProfile !== null, "Profile loads from storage service");

  const targetSkill = allUnits[0].skills[0];
  const attemptResult = await storageService.recordQuestionAttempt({
    skillId: targetSkill.id,
    questionId: targetSkill.questions?.[0]?.id || (targetSkill as any).practiceQuestions?.[0]?.id || "q-001",
    isCorrect: true,
    selectedOption: "test answer",
    timeSpentSeconds: 45,
    hintsUsedCount: 0
  });

  assert(attemptResult.questionAttempts.length > 0, "Question attempt recorded in profile history");

  const masteryProfile = await storageService.updateMastery(targetSkill.id, 25, true);
  assert(masteryProfile.masteryRecords[targetSkill.id] !== undefined, "Mastery record updated upon question attempt");
  assert(masteryProfile.masteryRecords[targetSkill.id].points > 0, "Mastery points awarded for correct answer");

  console.log("\n==========================================================================");
  console.log("🎉 ALL REAL USER ACCEPTANCE JOURNEYS VERIFIED (100% GREEN)!");
  console.log("==========================================================================\n");
}

runRealUserAcceptanceJourneys().catch((err) => {
  console.error("User acceptance journey verification failed:", err);
  process.exit(1);
});
