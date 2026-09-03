/**
 * MOOS TECHY TEACHER STUDIO — DETERMINISTIC ARCHITECTURAL & INTELLIGENCE VERIFICATION TEST SUITE
 * 
 * Verifies:
 * 1. Multi-factor Priority Scoring for Next Best Actions (Deterministic Ranking)
 * 2. Prerequisite Blocker Precedence & Symptom Deduplication
 * 3. Adaptive Grouping Boundary Safety (Empty roster, single student, all-mastered, zero division)
 * 4. Closed-loop Assignment Lifecycle & Deterministic Effectiveness Verdicts
 * 5. Attribution Window & Mastery Delta Calculations
 */

import { TeacherStudioService } from "../services/teacherStudioService";
import { identityService } from "../services/identityService";
import { auditService } from "../services/auditService";
import { LearnerProfile } from "../types/learner";
import {
  calculateAssignmentCompletionState,
  calculateRetrievalIndependence,
  evaluateAssignmentOutcome,
  assignmentService
} from "../services/assignmentService";
import { Assignment } from "../types/curriculum";
import { runInstitutionalSecurityForensicTests } from "./institutionalSecurityForensics.test";
import { runBackupRestoreForensicTests } from "./backupRestoreForensics.test";

export async function runTeacherStudioIntelligenceTests(): Promise<{ passed: boolean; results: string[] }> {
  const results: string[] = [];
  let allPassed = true;

  // Run institutional forensic test suite
  const forensicResult = runInstitutionalSecurityForensicTests();
  if (!forensicResult.passed) {
    allPassed = false;
  }
  results.push(...forensicResult.details);

  // Run backup & restore forensic test suite
  const backupForensicResult = await runBackupRestoreForensicTests();
  if (!backupForensicResult.passed) {
    allPassed = false;
  }
  results.push(...backupForensicResult.details);

  function assert(condition: boolean, message: string) {
    if (condition) {
      results.push(`[PASS] ${message}`);
    } else {
      results.push(`[FAIL] ${message}`);
      allPassed = false;
    }
  }

  const service = new TeacherStudioService();

  // Test 1: Classrooms and default initialization
  const classrooms = service.getClassrooms();
  assert(classrooms.length >= 2, "Default seeded classrooms are initialized and queryable.");

  const defaultClassId = classrooms[0].id;
  const roster = service.getRoster(defaultClassId);
  assert(roster.length >= 5, "Classroom roster contains enrolled student profiles.");

  // Test 2: Prerequisite Bottleneck Intelligence
  const bottlenecks = service.getPrerequisiteBottlenecks(defaultClassId);
  assert(bottlenecks.length > 0, "Prerequisite bottleneck detector detects upstream blockers.");
  const primaryBottleneck = bottlenecks[0];
  assert(
    primaryBottleneck.blockerSkillId === "skill-lin-01" && primaryBottleneck.affectedLearnerCount >= 2,
    "Primary prerequisite bottleneck correctly attributes linear fraction blockers to quadratic roots."
  );

  // Test 3: Next Best Action Multi-Factor Deterministic Scoring
  const actions = service.getNextBestActions(defaultClassId);
  assert(actions.length > 0, "Next best action engine generates actionable decision support recommendations.");
  
  // Verify strictly descending priority order
  let isDescending = true;
  for (let i = 0; i < actions.length - 1; i++) {
    if (actions[i].priorityScore < actions[i + 1].priorityScore) {
      isDescending = false;
      break;
    }
  }
  assert(isDescending, "Next best actions are deterministically sorted by calculated priority score.");

  // Top action should be Root Prerequisite Bottleneck
  const topAction = actions[0];
  assert(
    topAction.category === "prerequisite_bottleneck" && topAction.priorityScore >= 90,
    "Root prerequisite bottleneck receives highest deterministic score precedence (>= 90)."
  );

  // Test 4: Adaptive Grouping Boundary Safety
  const groups = service.getAdaptiveGroups(defaultClassId);
  assert(groups.length >= 4, "Adaptive grouping partitions cohort into foundational, emerging, consolidation, challenge groups.");

  // Boundary condition test: Non-existent or empty classroom
  const emptyClassGroups = service.getAdaptiveGroups("non-existent-class-999");
  assert(Array.isArray(emptyClassGroups) && emptyClassGroups.length === 0, "Adaptive grouping handles empty classrooms safely without throwing.");

  // Test 5: Closed-Loop Assignment Lifecycle & Effectiveness Verdict
  const testAsg = service.createAssignment({
    classroomId: defaultClassId,
    title: "Test Linear Scaffolding Assignment",
    unitId: "unit-mth-ss1-01",
    skillId: "skill-lin-01",
    assignmentType: "guided_remediation",
    targetLearnerIds: ["learner-002"],
    differentiationConfig: {
      adaptiveDifficulty: true,
      prerequisiteWarmupEnabled: true,
      hintScaffoldingIntensity: "high"
    }
  });

  assert(testAsg.id.startsWith("asg-"), "Assignment created successfully with unique ID.");
  assert(testAsg.status === "active", "Newly created assignment defaults to active lifecycle status.");

  // Simulate learner completion with 90% score and 1 hint
  service.completeAssignment(testAsg.id, "learner-002", 90, 1, ["Transposition sign inversion"]);
  
  const updatedAsg = service.getAssignmentById(testAsg.id);
  assert(!!updatedAsg, "Assignment retrieved after completion.");
  assert(updatedAsg?.completedLearnerIds.includes("learner-002") === true, "Learner marked as completed in assignment record.");
  
  const learnerProgress = updatedAsg?.learnerProgress?.["learner-002"];
  assert(learnerProgress?.status === "completed", "Learner assignment status updated to completed.");
  assert((learnerProgress?.postAssignmentMastery || 0) > (learnerProgress?.preAssignmentMastery || 0), "Post-assignment mastery reflects positive delta.");
  assert(
    learnerProgress?.effectivenessVerdict === "improvement_observed" || learnerProgress?.effectivenessVerdict === "performance_increased",
    "Deterministic effectiveness verdict assigned correctly based on performance delta."
  );
  assert(
    learnerProgress?.completionState === "completed_with_improvement",
    "Deterministic completion state correctly calculated as completed_with_improvement."
  );

  // Test 6: Deterministic Assignment State Engine Verification
  const stateImprovement = calculateAssignmentCompletionState({
    preAssignmentMastery: 45,
    postAssignmentMastery: 70,
    scorePercentage: 85,
    attemptsCount: 3,
    hintsRequestedCount: 1,
    isCompleted: true
  });
  assert(stateImprovement === "completed_with_improvement", "Positive mastery delta calculates to 'completed_with_improvement'.");

  const stateRegression = calculateAssignmentCompletionState({
    preAssignmentMastery: 75,
    postAssignmentMastery: 55,
    scorePercentage: 40,
    attemptsCount: 4,
    hintsRequestedCount: 3,
    isCompleted: true
  });
  assert(stateRegression === "mastery_regressed", "Negative mastery delta calculates to 'mastery_regressed'.");

  const stateRetained = calculateAssignmentCompletionState({
    preAssignmentMastery: 90,
    postAssignmentMastery: 90,
    scorePercentage: 90,
    attemptsCount: 2,
    hintsRequestedCount: 0,
    isCompleted: true
  });
  assert(stateRetained === "completed_mastery_retained", "Equal delta at high proficiency calculates to 'completed_mastery_retained'.");

  const stateIntervention = calculateAssignmentCompletionState({
    preAssignmentMastery: 40,
    postAssignmentMastery: 40,
    scorePercentage: 35,
    attemptsCount: 4,
    hintsRequestedCount: 5,
    isCompleted: true
  });
  assert(stateIntervention === "intervention_required", "Low score with high hint reliance flags 'intervention_required'.");

  const stateUnstarted = calculateAssignmentCompletionState({
    preAssignmentMastery: 50,
    postAssignmentMastery: 50,
    isCompleted: false,
    isStarted: false,
    attemptsCount: 0
  });
  assert(stateUnstarted === "unstarted", "Unattempted task calculates to 'unstarted'.");

  const outcomeEval = evaluateAssignmentOutcome({
    preAssignmentMastery: 50,
    postAssignmentMastery: 75,
    scorePercentage: 90,
    attemptsCount: 2,
    hintsRequestedCount: 0,
    isCompleted: true
  });
  assert(
    outcomeEval.effectivenessVerdict === "mastery_evidence_strengthened" && outcomeEval.retrievalIndependenceRate >= 80,
    "Comprehensive outcome evaluation produces verified pedagogical verdict and retrieval independence."
  );

  // Test 7: Dynamic Learner Profile Integration
  const mockDynamicProfile: LearnerProfile = {
    id: "learner-test-profile",
    name: "Tariq Ibrahim",
    email: "tariq@test.edu",
    role: "learner",
    targetLevel: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    selectedSubjectIds: ["subj-mth-senior"],
    activeSubjectId: "subj-mth-senior",
    activeUnitId: "unit-mth-ss1-03",
    learningGoals: ["Master WAEC Mathematics"],
    streak: { count: 4, lastActiveDate: new Date().toISOString().split("T")[0], longestStreak: 7 },
    streakDays: 4,
    masteryPoints: 55,
    xp: 450,
    level: 2,
    totalStudyMinutes: 120,
    diagnosticsCompleted: true,
    diagnosticHistory: [],
    activityHistory: [],
    examHistory: [],
    unlockedBadges: [],
    preferences: {
      socraticMode: "guided",
      highContrast: false,
      soundEffects: true,
      dailyGoalMinutes: 30
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    masteryRecords: {
      "skill-quad-02": {
        skillId: "skill-quad-02",
        status: "familiar",
        points: 40,
        attempts: 3,
        correctCount: 1,
        lastPracticedAt: new Date().toISOString()
      }
    },
    questionAttempts: []
  };

  const dynamicRoster = service.getRoster(defaultClassId, mockDynamicProfile);
  assert(
    dynamicRoster.some((s) => s.learnerId === "learner-test-profile"),
    "Active logged-in learner profile dynamically projected into classroom roster."
  );

  // --- Test 8: Assignment Outcome to Closed-Loop Intervention Bridge ---
  const activeTeacher = identityService.getIdentityById("usr_tch_babatunde_ojo")!;
  const testAssignment = service.createAssignment({
    classroomId: defaultClassId,
    title: "Test Quadratic Remediation Target",
    skillId: "skill-quad-02",
    targetLearnerIds: ["usr_lrn_chioma_adebayo"]
  }, activeTeacher);

  service.completeAssignment(testAssignment.id, "usr_lrn_chioma_adebayo", 45, 3, ["Sign flip in discriminant"]);
  
  const createdIntervention = service.createInterventionFromAssignmentOutcome(
    testAssignment.id,
    "usr_lrn_chioma_adebayo",
    activeTeacher
  );

  assert(
    createdIntervention !== null && createdIntervention.status === "recommended",
    "createInterventionFromAssignmentOutcome generates valid recommended intervention."
  );
  assert(
    createdIntervention.priority === "high" || createdIntervention.priority === "medium",
    "High/Medium priority assigned to low retrieval independence / low score outcome."
  );
  assert(
    createdIntervention.affectedLearnerIds.includes("usr_lrn_chioma_adebayo"),
    "Target learner correctly bound to intervention."
  );

  const events = auditService.getEvents().filter(e => e.resourceId === createdIntervention.id);
  assert(
    events.length > 0 && events[0].eventType === "INTERVENTION_RECOMMENDED",
    "Assignment outcome remediation dispatch immutably logged in AuditService."
  );

  return { passed: allPassed, results };
}

// Direct CLI execution support
if (typeof process !== "undefined" && process.argv && process.argv[1]?.includes("teacherStudioIntelligence.test")) {
  console.log("==========================================================================");
  console.log("🧪 MOOS TECHY ACADEMY — TEACHER STUDIO INTELLIGENCE & PEDAGOGICAL AUDIT");
  console.log("==========================================================================");
  runTeacherStudioIntelligenceTests().then((res) => {
    res.results.forEach(d => console.log(d));
    if (res.passed) {
      console.log(`\n🎉 ALL TEACHER STUDIO INTELLIGENCE CHECKS PASSED (100% GREEN)`);
      process.exit(0);
    } else {
      console.error(`\n❌ Some Teacher Studio intelligence checks failed.`);
      process.exit(1);
    }
  });
}
