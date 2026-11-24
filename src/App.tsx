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
import { OwnerAllowlistManager } from "./components/gate/OwnerAllowlistManager";
import { emailAllowlistService } from "./services/emailAllowlistService";
import { VerifiedAuthSession } from "./types/emailAllowlist";
import { WhatsAppAdminChatButton } from "./components/WhatsAppAdminChatButton";
import { ShieldAlert } from "lucide-react";

const PRIVILEGED_ADMIN_VIEWS: ReadonlySet<ActiveView> = new Set([
  "development_guardian",
  "agent_hub",
  "architecture",
  "saturation_studio",
  "owner_directory"
]);

function resolveInitialView(): ActiveView {
  if (typeof window === "undefined") return "dashboard";
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("view") as ActiveView | null;
  if (requested) return requested;
  const pathLower = window.location.pathname.toLowerCase();
  if (pathLower.includes("owner")) return "owner_directory";
  if (pathLower.includes("guardian") || pathLower.includes("admin")) return "development_guardian";
  return "dashboard";
}

function MainAppContent({
  authSession,
  onSignOut
}: {
  authSession: VerifiedAuthSession | null;
  onSignOut: () => void;
}) {
  const { profile, activeUnit, activeSkill, setActiveSkillAndUnit, recordDiagnosticResult, updateProfileInfo } = useLearner();

  const [activeView, setActiveView] = useState<ActiveView>(() => {
    const initial = resolveInitialView();
    if (PRIVILEGED_ADMIN_VIEWS.has(initial) && !authSession?.isAdminOrOwner) {
      return initial; // Will render explicit 403 Unauthorized screen inside <main>
    }
    return initial;
  });
  const [currentLevel, setCurrentLevel] = useState<EducationalLevel | "all">(profile.targetLevel || "senior_secondary");
  const [stakeholderTab, setStakeholderTab] = useState<"teacher" | "parent">("teacher");
  const [selectedPlayActivityId, setSelectedPlayActivityId] = useState<string | undefined>(undefined);
  const [selectedQRResourceCode, setSelectedQRResourceCode] = useState<string | undefined>(undefined);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | undefined>(undefined);

  const isAdminOrOwner = Boolean(authSession?.isAdminOrOwner);
  const isOwner = Boolean(authSession?.isOwner);

  const navigateWithGuard = (target: ActiveView) => {
    setActiveView(target);
  };

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
        onNavigate={navigateWithGuard}
        profile={profile}
        authSession={authSession}
        onSignOutAcademy={onSignOut}
        onOpenAITutor={() => {
          setTutorContextQuestion(null);
          setIsAITutorOpen(true);
        }}
        onQuickDiagnostic={() => navigateWithGuard("diagnostic")}
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
            onOpenSaturationStudio={isAdminOrOwner ? () => navigateWithGuard("saturation_studio") : undefined}
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
          isAdminOrOwner ? (
            <AgentIntelligenceHub onNavigate={navigateWithGuard} />
          ) : (
            <UnauthorizedViewCard title="403 — Administrator Access Required" onBack={() => navigateWithGuard("dashboard")} />
          )
        )}

        {activeView === "architecture" && (
          isAdminOrOwner ? (
            <InstitutionalArchitectureMap onNavigate={navigateWithGuard} />
          ) : (
            <UnauthorizedViewCard title="403 — Administrator Access Required" onBack={() => navigateWithGuard("dashboard")} />
          )
        )}

        {activeView === "saturation_studio" && (
          isAdminOrOwner ? (
            <ContentSaturationExplorer onSelectSkillId={handleLaunchSkillById} />
          ) : (
            <UnauthorizedViewCard title="403 — Internal Academic Oversight Required" onBack={() => navigateWithGuard("dashboard")} />
          )
        )}

        {activeView === "owner_directory" && (
          isOwner && authSession ? (
            <OwnerAllowlistManager currentOwnerEmail={authSession.email} onClose={() => navigateWithGuard("dashboard")} />
          ) : (
            <UnauthorizedViewCard title="403 — Verified Owner Access Required" onBack={() => navigateWithGuard("dashboard")} />
          )
        )}

        {activeView === "stakeholders" && (
          <StakeholderPortals
            activeTab={stakeholderTab}
            onSwitchTab={setStakeholderTab}
          />
        )}

        {activeView === "library" && <DigitalLibrary />}

        {activeView === "video_studio" && (
          <VideoGeneratorStudio onClose={() => navigateWithGuard("dashboard")} />
        )}

        {activeView === "live_voice" && (
          <LiveVoiceConversation onClose={() => navigateWithGuard("dashboard")} />
        )}

        {activeView === "transcribe" && (
          <AudioTranscriber
            onClose={() => navigateWithGuard("dashboard")}
            onInsertTranscript={(text) => {
              handleOpenAITutorWithCustomContext(
                "Voice Input Analysis",
                `Here is a transcript of my thoughts/notes: "${text}". Could you review this and provide Socratic guidance?`
              );
            }}
          />
        )}

        {activeView === "development_guardian" && (
          isAdminOrOwner ? (
            <DevelopmentGuardianDashboard />
          ) : (
            <UnauthorizedViewCard title="403 — Administrator Governance Access Required" onBack={() => navigateWithGuard("dashboard")} />
          )
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

function UnauthorizedViewCard({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="max-w-lg mx-auto my-12 rounded-2xl border border-red-200 bg-white p-8 text-center space-y-4 shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-200">
        <ShieldAlert className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="text-xs text-slate-600 leading-relaxed">
        You do not hold the verified role required to access this governance workspace. All administrative access attempts are audited.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
      >
        Return to Learner Hub
      </button>
    </div>
  );
}

export default function App() {
  const [authSession, setAuthSession] = useState<VerifiedAuthSession | null>(() =>
    emailAllowlistService.getActiveSession()
  );

  const handleAccessGranted = (_email: string, _token: string, session?: VerifiedAuthSession | null) => {
    setAuthSession(session || emailAllowlistService.getActiveSession());
  };

  const handleSignOut = () => {
    emailAllowlistService.revokeCurrentSession();
    setAuthSession(null);
  };

  return (
    <>
      {!authSession || !emailAllowlistService.hasGateAccess() ? (
        <EmailEntryGate onAccessGranted={handleAccessGranted} />
      ) : (
        <LearnerProvider>
          <MainAppContent authSession={authSession} onSignOut={handleSignOut} />
        </LearnerProvider>
      )}

      {/* Floating Official WhatsApp Business Support Button — Always visible across public landing & main academy */}
      <WhatsAppAdminChatButton />
    </>
  );
}
