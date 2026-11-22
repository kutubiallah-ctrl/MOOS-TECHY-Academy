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
import { InstitutionalArchitectureMap } from "./components/InstitutionalArchitectureMap";
import { LessonViewer } from "./components/LessonViewer";
import { ContentSaturationExplorer } from "./components/ContentSaturationExplorer";
import { VideoGeneratorStudio } from "./components/VideoGeneratorStudio";
import { LiveVoiceConversation } from "./components/LiveVoiceConversation";
import { AudioTranscriber } from "./components/AudioTranscriber";
import { DevelopmentGuardianDashboard } from "./components/DevelopmentGuardianDashboard";
import { GlobalOnboardingModal } from "./components/GlobalOnboardingModal";
import { ClubsModal } from "./components/ClubsModal";
import { ALL_CURRICULUM_UNITS } from "./data/extendedCurriculumUnits";
import { Skill, Unit, PracticeQuestion, EducationalLevel, DiagnosticResult } from "./types/curriculum";
import { EmailEntryGate } from "./components/gate/EmailEntryGate";
import { emailAllowlistService } from "./services/emailAllowlistService";
import { WhatsAppAdminChatButton } from "./components/WhatsAppAdminChatButton";

function MainAppContent() {
  const { profile, activeUnit, activeSkill, setActiveSkillAndUnit, recordDiagnosticResult, switchAcademicContext, updateProfileInfo } = useLearner();

  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [currentLevel, setCurrentLevel] = useState<EducationalLevel | "all">(profile.targetLevel || "senior_secondary");
  const [stakeholderTab, setStakeholderTab] = useState<"teacher" | "parent">("teacher");
  const [selectedPlayActivityId, setSelectedPlayActivityId] = useState<string | undefined>(undefined);
  const [selectedQRResourceCode, setSelectedQRResourceCode] = useState<string | undefined>(undefined);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | undefined>(undefined);

  // Global Onboarding and Clubs modal states
  const [isGlobalOnboardingOpen, setIsGlobalOnboardingOpen] = useState(false);
  const [isClubsModalOpen, setIsClubsModalOpen] = useState(false);

  // Socratic AI Tutor Drawer state
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [tutorContextQuestion, setTutorContextQuestion] = useState<PracticeQuestion | null>(null);
  const [tutorLearnerAttempt, setTutorLearnerAttempt] = useState<string>("");

  const handleSelectSkillToPractice = (skill: Skill, unit: Unit, assignmentId?: string) => {
    setActiveSkillAndUnit(skill, unit);
    setActiveAssignmentId(assignmentId);
    setActiveView("practice");
  };

  const handleSelectSkillToStudy = (skill: Skill, unit: Unit) => {
    setActiveSkillAndUnit(skill, unit);
    setActiveView("lesson");
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

  const handleLaunchSkillById = (skillId: string) => {
    for (const unit of ALL_CURRICULUM_UNITS) {
      const found = unit.skills.find((s) => s.id === skillId || s.code === skillId);
      if (found) {
        handleSelectSkillToPractice(found, unit);
        return;
      }
    }
    // Fallback if direct match not found: use activeUnit / activeSkill or first unit skill
    if (activeSkill && activeUnit) {
      handleSelectSkillToPractice(activeSkill, activeUnit);
    } else if (ALL_CURRICULUM_UNITS[0]?.skills[0]) {
      handleSelectSkillToPractice(ALL_CURRICULUM_UNITS[0].skills[0], ALL_CURRICULUM_UNITS[0]);
    }
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
      skillId: activeSkill?.id || "general-inquiry",
      difficulty: "medium"
    });
    setTutorLearnerAttempt(contextPrompt);
    setIsAITutorOpen(true);
  };

  return (
    <div id="moos-academy-app" className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased">
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
        onOpenGlobalSettings={() => setIsGlobalOnboardingOpen(true)}
        onOpenClubs={() => setIsClubsModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeView === "dashboard" && (
          <LearnerDashboard
            onLaunchSkill={handleSelectSkillToPractice}
            onStudyLesson={handleSelectSkillToStudy}
            onRetakeDiagnostic={() => setActiveView("diagnostic")}
            onOpenExamHall={() => setActiveView("exam_hall")}
            onOpenAITutor={() => {
              setTutorContextQuestion(null);
              setIsAITutorOpen(true);
            }}
            onOpenPlayArena={() => setActiveView("play")}
            onOpenQRHub={() => setActiveView("qr_companion")}
            onOpenParentPortal={() => {
              setStakeholderTab("parent");
              setActiveView("stakeholders");
            }}
            onOpenSaturationStudio={() => setActiveView("saturation_studio")}
            onOpenVideoStudio={() => setActiveView("video_studio")}
            onOpenLiveVoice={() => setActiveView("live_voice")}
            onOpenTranscribe={() => setActiveView("transcribe")}
          />
        )}

        {activeView === "curriculum" && (
          <CurriculumNavigator
            onSelectSkill={handleSelectSkillToPractice}
            onStudyLesson={handleSelectSkillToStudy}
            masteryRecords={profile?.masteryRecords || {}}
            currentLevel={currentLevel}
            onLevelChange={setCurrentLevel}
            countryCode={profile?.academicContext?.country || "NG"}
          />
        )}

        {activeView === "lesson" && (
          <LessonViewer
            skill={activeSkill}
            unit={activeUnit}
            onStartPractice={(skill, unit) => handleSelectSkillToPractice(skill, unit)}
            onOpenAITutor={(skill, unit) => {
              handleOpenAITutorWithCustomContext(
                `Lesson Guidance: ${skill.title}`,
                `I am studying the lesson on "${skill.title}" in "${unit.title}". Could you guide me through the foundational concepts and explain any tricky parts?`
              );
            }}
            onBack={() => setActiveView("curriculum")}
            onNavigateNextSkill={(nextSkill, unit) => {
              setActiveSkillAndUnit(nextSkill, unit);
            }}
          />
        )}

        {activeView === "practice" && (
          <PracticeArena
            skill={activeSkill}
            assignmentId={activeAssignmentId}
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
          <BookpreneurStudio
            onNavigateToPractice={handleLaunchSkillById}
            onNavigateToQRHub={(code) => {
              setSelectedQRResourceCode(code);
              setActiveView("qr_companion");
            }}
          />
        )}

        {activeView === "agent_hub" && (
          <AgentIntelligenceHub onNavigate={setActiveView} />
        )}

        {activeView === "architecture" && (
          <InstitutionalArchitectureMap onNavigate={setActiveView} />
        )}

        {activeView === "saturation_studio" && (
          <ContentSaturationExplorer onSelectSkillId={handleLaunchSkillById} />
        )}

        {activeView === "stakeholders" && (
          <StakeholderPortals
            activeTab={stakeholderTab}
            onSwitchTab={setStakeholderTab}
          />
        )}

        {activeView === "library" && <DigitalLibrary />}

        {activeView === "video_studio" && (
          <VideoGeneratorStudio onClose={() => setActiveView("dashboard")} />
        )}

        {activeView === "live_voice" && (
          <LiveVoiceConversation onClose={() => setActiveView("dashboard")} />
        )}

        {activeView === "transcribe" && (
          <AudioTranscriber
            onClose={() => setActiveView("dashboard")}
            onInsertTranscript={(text) => {
              handleOpenAITutorWithCustomContext(
                "Voice Input Analysis",
                `Here is a transcript of my thoughts/notes: "${text}". Could you review this and provide Socratic guidance?`
              );
            }}
          />
        )}

        {activeView === "development_guardian" && (
          <DevelopmentGuardianDashboard />
        )}
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

      {/* Global Regional & Language Standards Onboarding */}
      <GlobalOnboardingModal
        isOpen={isGlobalOnboardingOpen}
        onClose={() => setIsGlobalOnboardingOpen(false)}
        profile={profile}
        onSaveProfile={async (updatedProfile) => {
          await updateProfileInfo(updatedProfile);
          setIsGlobalOnboardingOpen(false);
        }}
      />

      {/* 9-Stage Active Co-Curricular & Skills Life Cycle */}
      <ClubsModal
        isOpen={isClubsModalOpen}
        onClose={() => setIsClubsModalOpen(false)}
        learnerId={profile.id}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">MOOS Academy</span>
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
  const [hasGateAccess, setHasGateAccess] = useState<boolean>(() => emailAllowlistService.hasGateAccess());

  const handleAccessGranted = (email: string, token: string) => {
    setHasGateAccess(true);
  };

  return (
    <>
      {!hasGateAccess ? (
        <EmailEntryGate onAccessGranted={handleAccessGranted} />
      ) : (
        <LearnerProvider>
          <MainAppContent />
        </LearnerProvider>
      )}

      {/* Floating Official WhatsApp Business Support Button — Always visible across public landing & main academy */}
      <WhatsAppAdminChatButton />
    </>
  );
}
