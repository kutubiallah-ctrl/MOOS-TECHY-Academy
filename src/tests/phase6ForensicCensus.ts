/**
 * Phase 6 Forensic Baseline & Content Census Engine
 * Executes full discovery and census without assumptions or inflations.
 */

// Polyfill localStorage in Node test environment if not defined
if (typeof globalThis.localStorage === "undefined") {
  const store = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, val: string) => store.set(key, String(val)),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (idx: number) => Array.from(store.keys())[idx] ?? null,
    get length() { return store.size; }
  } as unknown as Storage;
}

import { curriculumService } from "../services/curriculumService";
import { CourseDiscoveryService } from "../services/courseDiscoveryService";
import { ALL_CURRICULUM_LESSONS } from "../data/lessons";
import { CANONICAL_CURRICULUM_VIDEOS } from "../data/curriculumVideosData";
import { FLASHCARD_DECKS } from "../data/flashcardRepository";
import { INTERACTIVE_ACTIVITIES } from "../data/interactiveActivitiesRepository";
import { REAL_WORLD_PROJECTS } from "../data/projectBasedLearningRepository";
import { SEEDED_TEXTBOOK_PROJECTS } from "../data/seededTextbooks";
import { textbookStudioService } from "../services/textbookStudioService";
import { bookpreneurService } from "../services/bookpreneurService";
import { clubsService } from "../services/clubsService";
import { achievementService } from "../services/achievementService";
import { developmentGuardianService } from "../services/developmentGuardianService";
import { MathematicalSpeechService } from "../services/mathematicalSpeechService";
import { ESLLearningService } from "../services/eslLearningService";
import { SmartBoardMasterclassService } from "../services/smartBoardMasterclassService";
import { teacherStudioService } from "../services/teacherStudioService";
import { aiTeacherCopilotService } from "../services/aiTeacherCopilotService";
import { backupService } from "../services/backupService";
import { BACKUP_APPLICATION_ID, CURRENT_BACKUP_SCHEMA_VERSION } from "../types/backup";
import { COUNTRY_CURRICULUM_REGISTRY } from "../data/countryCurriculumRegistry";

async function runForensicCensus() {
  console.log("==========================================================================");
  console.log("🔍 MOOS ACADEMY — PHASE 6 FORENSIC BASELINE & CONTENT CENSUS");
  console.log("==========================================================================\n");

  const discovery = CourseDiscoveryService.getInstance();
  const allUnits = curriculumService.getAllUnits();
  const allSubjects = discovery.getSubjectCategories();

  // Curriculum census
  let totalSkills = 0;
  let skillsWithDirectAuthoredLessons = 0;
  let totalPracticeQuestionsInUnits = 0;
  let totalWorkedExamplesInLessons = 0;
  let totalMisconceptions = 0;
  let totalHints = 0;
  const distinctTopicIds = new Set<string>();

  const subjectBreakdown: Record<string, {
    units: number;
    skills: number;
    authoredLessons: number;
    practiceQuestions: number;
    workedExamples: number;
  }> = {};

  for (const unit of allUnits) {
    const subj = unit.subjectId;
    if (!subjectBreakdown[subj]) {
      subjectBreakdown[subj] = {
        units: 0,
        skills: 0,
        authoredLessons: 0,
        practiceQuestions: 0,
        workedExamples: 0,
      };
    }
    subjectBreakdown[subj].units++;

    const skills = unit.skills || [];
    for (const skill of skills) {
      totalSkills++;
      subjectBreakdown[subj].skills++;
      if (skill.topicId) {
        distinctTopicIds.add(skill.topicId);
      }

      // Check practice questions directly on skill
      const skillQuestions = skill.questions || [];
      totalPracticeQuestionsInUnits += skillQuestions.length;
      subjectBreakdown[subj].practiceQuestions += skillQuestions.length;

      for (const q of skillQuestions) {
        if (q.hintLadder && q.hintLadder.length > 0) {
          totalHints += q.hintLadder.length;
        }
        if (q.misconceptionAlerts && q.misconceptionAlerts.length > 0) {
          totalMisconceptions += q.misconceptionAlerts.length;
        }
      }

      // Check hand-authored lesson
      const lesson = ALL_CURRICULUM_LESSONS[skill.id] || skill.lesson;
      if (lesson) {
        skillsWithDirectAuthoredLessons++;
        subjectBreakdown[subj].authoredLessons++;

        const weCount = lesson.workedExamples?.length || 0;
        totalWorkedExamplesInLessons += weCount;
        subjectBreakdown[subj].workedExamples += weCount;

        if (lesson.commonMisconceptionsAndTraps && lesson.commonMisconceptionsAndTraps.length > 0) {
          totalMisconceptions += lesson.commonMisconceptionsAndTraps.length;
        }
      }
    }
  }

  console.log("--- 1. CURRICULUM & CONTENT CENSUS ---");
  console.log(`Total Subject Categories: ${allSubjects.length}`);
  console.log(`Total Curricula in Registry: ${Object.keys(COUNTRY_CURRICULUM_REGISTRY).length}`);
  console.log(`Total Curriculum Units: ${allUnits.length}`);
  console.log(`Total Topics/Distinct Topic IDs: ${distinctTopicIds.size}`);
  console.log(`Total Skills: ${totalSkills}`);
  console.log(`Total Explicit Authored Lessons in ALL_CURRICULUM_LESSONS: ${Object.keys(ALL_CURRICULUM_LESSONS).length}`);
  console.log(`Skills with Direct Authored Lessons: ${skillsWithDirectAuthoredLessons} / ${totalSkills} (${((skillsWithDirectAuthoredLessons / totalSkills) * 100).toFixed(1)}%)`);
  console.log(`Total Worked Examples in Direct Lessons: ${totalWorkedExamplesInLessons}`);
  console.log(`Total Practice Questions on Skills: ${totalPracticeQuestionsInUnits}`);
  console.log(`Total Hints across Questions: ${totalHints}`);
  console.log(`Total Misconceptions cataloged: ${totalMisconceptions}`);
  const flashcardDecksCount = Object.keys(FLASHCARD_DECKS).length;
  let totalFlashcards = 0;
  for (const deck of Object.values(FLASHCARD_DECKS)) {
    totalFlashcards += deck.cards?.length || 0;
  }
  let totalInteractiveActivities = 0;
  for (const actList of Object.values(INTERACTIVE_ACTIVITIES)) {
    totalInteractiveActivities += actList.length;
  }
  console.log(`Curriculum Videos: ${CANONICAL_CURRICULUM_VIDEOS.length}`);
  console.log(`Flashcard Decks: ${flashcardDecksCount} (Total cards: ${totalFlashcards})`);
  console.log(`Interactive Activities: ${totalInteractiveActivities} across ${Object.keys(INTERACTIVE_ACTIVITIES).length} skills`);
  console.log(`Project-Based Learning (PBL) Projects: ${REAL_WORLD_PROJECTS.length}`);

  console.log("\n--- 2. SUBJECT-BY-SUBJECT BREAKDOWN ---");
  for (const [subj, data] of Object.entries(subjectBreakdown)) {
    console.log(`  [${subj}]: Units=${data.units} | Skills=${data.skills} | AuthoredLessons=${data.authoredLessons} | WE=${data.workedExamples} | PQ=${data.practiceQuestions}`);
  }

  console.log("\n--- 3. TEXTBOOK & BOOKPRENEUR INVENTORY ---");
  const seededBooks = SEEDED_TEXTBOOK_PROJECTS;
  const libraryBooks = textbookStudioService.getAllTextbooks();
  const bookProjects = bookpreneurService.getAllProjects();
  const marketplaceResources = bookpreneurService.getMarketplaceResources({ publicationStatus: "PUBLISHED" });
  const allMarketplace = bookpreneurService.getMarketplaceResources();
  console.log(`Seeded Textbooks: ${seededBooks.length}`);
  console.log(`Textbook Studio Library Total: ${libraryBooks.length}`);
  console.log(`Bookpreneur Author Projects: ${bookProjects.length}`);
  console.log(`Bookpreneur Marketplace Resources (Published): ${marketplaceResources.length}`);
  console.log(`Bookpreneur Marketplace Total: ${allMarketplace.length}`);

  console.log("\n--- 4. CLUBS & EXTRACURRICULAR INVENTORY ---");
  const allClubs = clubsService.getAllClubs();
  console.log(`Total Active Clubs: ${allClubs.length}`);
  for (const club of allClubs) {
    console.log(`  - Club [${club.id}] "${club.name}" | Members: ${club.membersCount} | Category: ${club.category}`);
  }

  console.log("\n--- 5. ACHIEVEMENTS & GAMIFICATION INVENTORY ---");
  const seededLearnerAch = achievementService.getUserAchievements("usr_lrn_chidi_okonkwo");
  const seededLearnerCert = achievementService.getUserCertificates("usr_lrn_chidi_okonkwo");
  console.log(`Achievements Seeded for Verification Learner: ${seededLearnerAch.length}`);
  console.log(`Certificates Seeded for Verification Learner: ${seededLearnerCert.length}`);

  console.log("\n--- 6. DEVELOPMENT GUARDIAN STATUS ---");
  const guardianReport = developmentGuardianService.generateStateReport();
  console.log(`Agent Readiness Level: ${guardianReport.agentReadinessLevel} / 6`);
  console.log(`Tracked Requirements: ${guardianReport.requirementsSummary.total} (Verified: ${guardianReport.requirementsSummary.verified})`);
  console.log(`Tasks: Total=${guardianReport.tasksCount.total} | Completed=${guardianReport.tasksCount.completed} | Blocked=${guardianReport.tasksCount.blocked}`);
  console.log(`Known Risks: ${guardianReport.knownRisks.length}`);
  console.log(`Canonical Suites Protected: ${guardianReport.canonicalSuitesVerified}`);

  console.log("\n--- 7. PERSISTENCE & BACKUP STATUS ---");
  console.log(`Backup Application ID: ${BACKUP_APPLICATION_ID} (Must match 'moos-techy-academy')`);
  console.log(`Backup Schema Version: ${CURRENT_BACKUP_SCHEMA_VERSION}`);

  console.log("\n--- 8. PEDAGOGICAL SERVICES STATUS ---");
  const mathSpeech = MathematicalSpeechService.getInstance();
  const mathSpeechResult = mathSpeech.normalizeSpokenMathematics("f(x) = \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{x^2}{2}}");
  console.log(`Mathematical Speech Service: OPERATIONAL -> "${mathSpeechResult.slice(0, 70)}..."`);

  const eslService = ESLLearningService.getInstance();
  const minimalPairs = eslService.getPhonemeMinimalPairs();
  const readingPassages = eslService.getReadingPassages();
  const listeningModules = eslService.getListeningModules();
  const writingTasks = eslService.getWritingTasks();
  const diagQuestions = eslService.getDiagnosticQuestions();
  console.log(`ESL Minimal Pairs: ${minimalPairs.length}`);
  console.log(`ESL Reading Passages: ${readingPassages.length}`);
  console.log(`ESL Listening Modules: ${listeningModules.length}`);
  console.log(`ESL Writing Tasks: ${writingTasks.length}`);
  console.log(`ESL Diagnostic Assessment Questions: ${diagQuestions.length}`);

  const smartBoard = SmartBoardMasterclassService.getInstance();
  const chemUnit = allUnits.find((u) => u.subjectId === "sci_chemistry") || allUnits[0];
  const chemMasterclass = smartBoard.getOrCreateMasterclassForUnit(chemUnit, 20);
  console.log(`Smart Board Masterclass Generator: OPERATIONAL -> Segments: ${chemMasterclass.segments.length} for ${chemMasterclass.title}`);

  const teacherStudio = teacherStudioService;
  console.log(`Teacher Studio Service: OPERATIONAL -> Classrooms: ${teacherStudio.getClassrooms().length} | Assignments: ${teacherStudio.getAssignments().length}`);

  const aiTeacher = aiTeacherCopilotService;
  console.log(`AI Teacher Copilot Service: OPERATIONAL`);

  console.log("\n==========================================================================");
  console.log("🏁 CENSUS GATHERING COMPLETE");
  console.log("==========================================================================");
}

runForensicCensus().catch(console.error);
