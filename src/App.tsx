import React, { useState } from "react";
import { LearnerProvider, useLearner } from "./context/LearnerContext";
import { Navbar, ActiveView } from "./components/Navbar";
import { LearnerDashboard } from "./components/LearnerDashboard";
import { CurriculumNavigator } from "./components/CurriculumNavigator";
import { PracticeArena } from "./components/PracticeArena";
import { DiagnosticEngine } from "./components/DiagnosticEngine";
import { ExamHall } from "./components/ExamHall";
import { StakeholderPortals } from "./components/StakeholderPortals";
import { DigitalLibrary } from "./components/DigitalLibrary";
import { SocraticAITutor } from "./components/SocraticAITutor";
import { LearnAndPlayArena } from "./components/LearnAndPlayArena";
import { QRCompanionHub } from "./components/QRCompanionHub";
import { TeacherStudio } from "./components/TeacherStudio";
import { TextbookStudio } from "./components/TextbookStudio";
import { BookpreneurStudio } from "./components/BookpreneurStudio";
import { AgentIntelligenceHub } from "./components/AgentIntelligenceHub";
import { Skill, Unit, PracticeQuestion, EducationalLevel, DiagnosticResult } from "./types/curriculum";

function MainAppContent() {
  const { profile, activeUnit, activeSkill, setActiveSkillAndUnit, recordDiagnosticResult } = useLearner();

  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [currentLevel, setCurrentLevel] = useState<EducationalLevel>(profile.targetLevel || "senior_secondary");
  const [stakeholderTab, setStakeholderTab] = useState<"teacher" | "parent">("teacher");
  const [selectedPlayActivityId, setSelectedPlayActivityId] = useState<string | undefined>(undefined);
  const [selectedQRResourceCode, setSelectedQRResourceCode] = useState<string | undefined>(undefined);

  // Socratic AI Tutor Drawer state
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [tutorContextQuestion, setTutorContextQuestion] = useState<PracticeQuestion | null>(null);
  const [tutorLearnerAttempt, setTutorLearnerAttempt] = useState<string>("");

  const handleSelectSkillToPractice = (skill: Skill, unit: Unit) => {
    setActiveSkillAndUnit(skill, unit);
    setActiveView("practice");
  };

  const handleCompleteDiagnostic = (result: DiagnosticResult) => {
    recordDiagnosticResult(result);
    setActiveView("dashboard");
  };

  const handleOpenAITutorWithContext = (question: PracticeQuestion, attempt: string) => {
    setTutorContextQuestion(question);
    setTutorLearnerAttempt(attempt);
    setIsAITutorOpen(true);
  };

  const handleLaunchPlayActivity = (activityId: string) => {
    setSelectedPlayActivityId(activityId);
    setActiveView("play");
  };

  const handleOpenAITutorWithCustomContext = (questionTitle: string, contextPrompt: string) => {
    setTutorContextQuestion({
      id: "custom-context",
      type: "step_by_step",
      questionText: questionTitle,
      options: [],
      correctAnswer: "",
      explanation: contextPrompt,
      hintLadder: ["Review the foundational concepts and apply Socratic inquiry."],
      skillId: "general-inquiry",
      difficulty: "medium"
    });
    setTutorLearnerAttempt(contextPrompt);
    setIsAITutorOpen(true);
  };

  return (
    <div id="moos-techy-academy-app" className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={setActiveView}
        profile={profile}
        onOpenAITutor={() => {
          setTutorContextQuestion(null);
          setIsAITutorOpen(true);
        }}
        onQuickDiagnostic={() => setActiveView("diagnostic")}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeView === "dashboard" && (
          <LearnerDashboard
            onLaunchSkill={handleSelectSkillToPractice}
            onRetakeDiagnostic={() => setActiveView("diagnostic")}
            onOpenExamHall={() => setActiveView("exam_hall")}
            onOpenAITutor={() => {
              setTutorContextQuestion(null);
              setIsAITutorOpen(true);
            }}
            onOpenPlayArena={() => setActiveView("play")}
            onOpenQRHub={() => setActiveView("qr_companion")}
          />
        )}

        {activeView === "curriculum" && (
          <CurriculumNavigator
            onSelectSkill={handleSelectSkillToPractice}
            masteryRecords={profile?.masteryRecords || {}}
            currentLevel={currentLevel}
            onLevelChange={setCurrentLevel}
          />
        )}

        {activeView === "practice" && (
          <PracticeArena
            skill={activeSkill}
            onSkillComplete={() => {}}
            onOpenAITutorWithContext={handleOpenAITutorWithContext}
            onBackToNavigator={() => setActiveView("curriculum")}
            currentMasteryRecord={profile?.masteryRecords?.[activeSkill?.id]}
          />
        )}

        {activeView === "play" && (
          <LearnAndPlayArena
            initialActivityId={selectedPlayActivityId}
            onOpenAITutorWithContext={handleOpenAITutorWithCustomContext}
            onBackToDashboard={() => setActiveView("dashboard")}
          />
        )}

        {activeView === "qr_companion" && (
          <QRCompanionHub
            initialResourceCode={selectedQRResourceCode}
            onLaunchPractice={handleSelectSkillToPractice}
            onLaunchPlayActivity={handleLaunchPlayActivity}
            onOpenAITutorWithContext={handleOpenAITutorWithCustomContext}
            onBackToDashboard={() => setActiveView("dashboard")}
          />
        )}

        {activeView === "diagnostic" && (
          <DiagnosticEngine
            onCompleteDiagnostic={handleCompleteDiagnostic}
            targetLevel={profile.targetLevel}
            onCancel={() => setActiveView("dashboard")}
          />
        )}

        {activeView === "exam_hall" && (
          <ExamHall onBackToDashboard={() => setActiveView("dashboard")} />
        )}

        {activeView === "teacher_studio" && (
          <TeacherStudio
            onNavigateToTextbookStudio={() => setActiveView("textbook_studio")}
            onNavigateToQRHub={(code) => {
              setSelectedQRResourceCode(code);
              setActiveView("qr_companion");
            }}
          />
        )}

        {activeView === "textbook_studio" && (
          <TextbookStudio
            onNavigateToQRHub={(code) => {
              setSelectedQRResourceCode(code);
              setActiveView("qr_companion");
            }}
            onNavigateToTutorMoos={handleOpenAITutorWithCustomContext}
            onNavigateToPlayArena={handleLaunchPlayActivity}
          />
        )}

        {activeView === "bookpreneur_studio" && (
          <BookpreneurStudio />
        )}

        {activeView === "agent_hub" && (
          <AgentIntelligenceHub />
        )}

        {activeView === "stakeholders" && (
          <StakeholderPortals
            activeTab={stakeholderTab}
            onSwitchTab={setStakeholderTab}
          />
        )}

        {activeView === "library" && <DigitalLibrary />}
      </main>

      {/* Persistent Socratic AI Tutor Modal / Drawer */}
      <SocraticAITutor
        currentQuestion={tutorContextQuestion}
        activeUnitTitle={activeUnit.title}
        learnerAttempt={tutorLearnerAttempt}
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        isFloating={true}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">MOOS TECHY ACADEMY</span>
            <span>— Mastery-based Multidisciplinary Learning Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>WAEC / WASSCE Standard</span>
            <span>•</span>
            <span>JAMB UTME CBT Engine</span>
            <span>•</span>
            <span>Socratic AI Pedagogy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LearnerProvider>
      <MainAppContent />
    </LearnerProvider>
  );
}
