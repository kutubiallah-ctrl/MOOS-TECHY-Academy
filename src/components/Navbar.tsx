import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Flame,
  Trophy,
  BookOpen,
  Compass,
  Award,
  Users,
  Layers,
  GraduationCap,
  Calculator,
  Brain,
  Shield,
  Gamepad2,
  QrCode,
  PenTool,
  BrainCircuit,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  User,
  Network,
  Globe,
  Video,
  Radio,
  Mic,
  LogIn,
  LogOut,
  AlertTriangle
} from "lucide-react";
import { LearnerProfile } from "../types/curriculum";
import { identityService, ALL_SEEDED_IDENTITIES } from "../services/identityService";
import { InstitutionalUser, UserSession } from "../types/identity";
import { firebaseSyncService } from "../services/firebaseSyncService";
import { User as FirebaseUser } from "firebase/auth";
import { mfaService } from "../services/mfaService";
import { MfaModal } from "./mfa/MfaModal";

export type ActiveView =
  | "dashboard"
  | "curriculum"
  | "lesson"
  | "practice"
  | "play"
  | "qr_companion"
  | "diagnostic"
  | "exam_hall"
  | "stakeholders"
  | "library"
  | "teacher_studio"
  | "textbook_studio"
  | "bookpreneur_studio"
  | "agent_hub"
  | "architecture"
  | "saturation_studio"
  | "video_studio"
  | "live_voice"
  | "transcribe"
  | "development_guardian";

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  profile: LearnerProfile;
  onOpenAITutor: () => void;
  onQuickDiagnostic: () => void;
  onOpenGlobalSettings?: () => void;
  onOpenClubs?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  profile,
  onOpenAITutor,
  onQuickDiagnostic,
  onOpenGlobalSettings,
  onOpenClubs
}) => {
  const [showStudioDropdown, setShowStudioDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentSession, setCurrentSession] = useState<UserSession>(() => identityService.getActiveSession());
  const [allUsers] = useState<InstitutionalUser[]>(() => identityService.getIdentities());
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(() => firebaseSyncService.getCurrentUser());
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authErrorNotice, setAuthErrorNotice] = useState<string | null>(null);

  // MFA Modal state
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);
  const [mfaModalMode, setMfaModalMode] = useState<"ENROLL" | "CHALLENGE" | "RECOVERY" | "SETTINGS">("CHALLENGE");
  const [pendingMfaUserId, setPendingMfaUserId] = useState<string | null>(null);
  const [pendingMfaUserEmail, setPendingMfaUserEmail] = useState<string>("");

  useEffect(() => {
    const unsub = firebaseSyncService.onAuthChange((user) => {
      setFirebaseUser(user);
    });
    const unsubChallenge = firebaseSyncService.onMfaChallenge((resolver) => {
      setPendingMfaUserId(firebaseSyncService.getCurrentUser()?.uid || "firebase_user");
      setPendingMfaUserEmail(firebaseSyncService.getCurrentUser()?.email || "user@moos.academy");
      setMfaModalMode("CHALLENGE");
      setIsMfaModalOpen(true);
    });
    return () => {
      unsub();
      unsubChallenge();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;
    setAuthErrorNotice(null);
    try {
      setIsSigningIn(true);
      const user = await firebaseSyncService.signInWithGoogle();
      if (!user) {
        // User closed or dismissed popup, or triggered MFA challenge
      }
    } catch (err: any) {
      const code = err?.code || "";
      const msg = err?.message || "";
      if (code === "auth/popup-blocked" || msg.includes("popup-blocked")) {
        setAuthErrorNotice("Browser blocked the sign-in pop-up window. Please enable pop-ups for this site, or continue with your local institutional profile.");
      } else if (code === "auth/popup-closed-by-user" || msg.includes("popup-closed")) {
        // Intentionally closed by user
      } else {
        setAuthErrorNotice("Sign-in could not be completed at this moment. You can continue using your local institutional account.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSyncService.signOutUser();
    } catch (err) {
      console.error("Sign out failure:", err);
    }
  };

  const isStudioActive = [
    "teacher_studio",
    "textbook_studio",
    "bookpreneur_studio",
    "agent_hub",
    "architecture",
    "stakeholders",
    "saturation_studio",
    "video_studio",
    "live_voice",
    "transcribe",
    "development_guardian"
  ].includes(activeView);

  const handleSwitchUser = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target?.role === "ADMIN") {
      const hasMfa = mfaService.hasActiveAssurance(userId, "ADMIN_ROLE_SWITCH");
      if (!hasMfa) {
        setPendingMfaUserId(userId);
        setPendingMfaUserEmail(target.email || `${userId}@moos.academy`);
        const prof = mfaService.getMfaProfile(userId);
        setMfaModalMode(prof?.isEnrolled ? "CHALLENGE" : "ENROLL");
        setIsMfaModalOpen(true);
        setShowUserMenu(false);
        return;
      }
    }

    try {
      const newSession = identityService.switchUser(userId);
      setCurrentSession(newSession);
      setShowUserMenu(false);
    } catch (e: any) {
      console.error("Failed to switch user:", e);
      if (e?.message?.includes("MFA_VERIFICATION_REQUIRED")) {
        setPendingMfaUserId(userId);
        setPendingMfaUserEmail(target?.email || `${userId}@moos.academy`);
        const prof = mfaService.getMfaProfile(userId);
        setMfaModalMode(prof?.isEnrolled ? "CHALLENGE" : "ENROLL");
        setIsMfaModalOpen(true);
        setShowUserMenu(false);
      }
    }
  };

  const handleMfaModalSuccess = (ticket?: any) => {
    if (pendingMfaUserId) {
      try {
        const newSession = identityService.switchUser(pendingMfaUserId, { skipMfaCheck: false });
        setCurrentSession(newSession);
      } catch (err) {
        console.error("Post-MFA switch error:", err);
      }
    }
    setIsMfaModalOpen(false);
    setPendingMfaUserId(null);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Banner: Global Vision & Flagship Domain */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs text-slate-300 flex items-center justify-between sm:justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-300">MOOS Academy</span>
          <span className="hidden sm:inline">— Global Multidisciplinary Learning Ecosystem</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">LEARN • TEACH • CREATE • INTELLIGENCE</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            type="button"
            onClick={() => onNavigate("development_guardian")}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold transition px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80"
          >
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span>Development Guardian</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">Phase 3</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("agent_hub")}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold transition"
          >
            <BrainCircuit className="h-3 w-3" />
            <span>Agentic AI Gov</span>
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-extrabold text-lg shadow-md shadow-indigo-600/20 group-hover:scale-105 transition">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 text-base tracking-tight group-hover:text-indigo-600 transition">
                MOOS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60">
                ACADEMY
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Foundational to Advanced Mastery</p>
          </div>
        </div>

        {/* Center Nav Views Navigation */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
          <button
            id="nav-btn-dashboard"
            type="button"
            onClick={() => onNavigate("dashboard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeView === "dashboard"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Learner Hub</span>
          </button>

          <button
            id="nav-btn-curriculum"
            type="button"
            onClick={() => onNavigate("curriculum")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeView === "curriculum"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Curriculum</span>
          </button>

          <button
            id="nav-btn-practice"
            type="button"
            onClick={() => onNavigate("practice")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeView === "practice"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Practice</span>
          </button>

          <button
            id="nav-btn-play"
            type="button"
            onClick={() => onNavigate("play")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeView === "play"
                ? "bg-amber-50 text-amber-800 border border-amber-200/70"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5 text-amber-500" />
            <span>Learn & Play</span>
          </button>

          <button
            id="nav-btn-qr-companion"
            type="button"
            onClick={() => onNavigate("qr_companion")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeView === "qr_companion"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200/70"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <QrCode className="h-3.5 w-3.5 text-indigo-600" />
            <span>QR Companion</span>
          </button>

          <button
            id="nav-btn-exam"
            type="button"
            onClick={() => onNavigate("exam_hall")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeView === "exam_hall"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Exam Hall</span>
          </button>

          <button
            id="nav-btn-clubs"
            type="button"
            onClick={onOpenClubs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer"
          >
            <Users className="h-3.5 w-3.5 text-amber-500" />
            <span>Clubs</span>
          </button>

          {/* Studios Dropdown Menu */}
          <div className="relative">
            <button
              id="nav-btn-studios-menu"
              type="button"
              onClick={() => setShowStudioDropdown(!showStudioDropdown)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                isStudioActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Studios & Intelligence</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>

            {showStudioDropdown && (
              <div
                className="absolute left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 space-y-1"
                onMouseLeave={() => setShowStudioDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("teacher_studio");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "teacher_studio" ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <GraduationCap className="h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Teacher Studio</span>
                    <span className="text-[10px] text-slate-500">Lesson scaffolding & interventions</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("stakeholders");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "stakeholders" ? "bg-rose-50 text-rose-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Users className="h-4 w-4 text-rose-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Parent & Teacher Portals</span>
                    <span className="text-[10px] text-slate-500">Learner oversight & encouraging notes</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("textbook_studio");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "textbook_studio" ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <BookOpen className="h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Textbook Studio</span>
                    <span className="text-[10px] text-slate-500">STEM codex & QR generation</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("bookpreneur_studio");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "bookpreneur_studio" ? "bg-purple-50 text-purple-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <PenTool className="h-4 w-4 text-purple-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Bookpreneur Studio</span>
                    <span className="text-[10px] text-slate-500">Nonfiction authoring & claim rigor</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("architecture");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "architecture" ? "bg-indigo-50 text-indigo-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Network className="h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">System Blueprint</span>
                    <span className="text-[10px] text-slate-500">Institutional architecture & flow</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("agent_hub");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "agent_hub" ? "bg-cyan-50 text-cyan-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <BrainCircuit className="h-4 w-4 text-cyan-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Agent Intelligence Hub</span>
                    <span className="text-[10px] text-slate-500">Multi-agent orchestrator & approvals</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("saturation_studio");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "saturation_studio" ? "bg-indigo-50 text-indigo-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Content Saturation & Depth</span>
                    <span className="text-[10px] text-slate-500">32-dim index, flashcards & vernacular</span>
                  </div>
                </button>

                <div className="pt-1.5 pb-1 px-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Advanced Media & Multimodal
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("video_studio");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "video_studio" ? "bg-indigo-50 text-indigo-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Video className="h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold block text-slate-900">Veo 3 Video Studio</span>
                      <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 rounded font-extrabold">Veo 3</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Fast video generation (16:9 / 9:16)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("live_voice");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "live_voice" ? "bg-indigo-50 text-indigo-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Radio className="h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold block text-slate-900">Live Voice Call</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 rounded font-extrabold">Live API</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Real-time speech dialogue (gemini-3.8-live)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("transcribe");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "transcribe" ? "bg-indigo-50 text-indigo-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Mic className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold block text-slate-900">Speech Transcriber</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-extrabold">3.5</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Audio speech-to-text transcription</span>
                  </div>
                </button>

                <div className="pt-1.5 pb-1 px-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    DevOps & Continuous Governance
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("development_guardian");
                    setShowStudioDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeView === "development_guardian" ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold block text-slate-900">Development Guardian</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-extrabold">Ops Level 6</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Requirements memory & multi-agent workflow</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Stats & Socratic AI Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Global Location & Curriculum Trigger */}
          <button
            id="nav-btn-global-settings"
            type="button"
            onClick={onOpenGlobalSettings}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
            title="Learning Location & Language Standards"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-600" />
            <span>{(profile as any).academicContext?.country || "Global"}</span>
          </button>

          {/* Streak Indicator */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-700 bg-amber-50/80 border border-amber-200/80 px-2.5 py-1.5 rounded-xl">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{profile.streakDays}d</span>
          </div>

          {/* Mastery Points */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-100 px-2.5 py-1.5 rounded-xl">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>{profile.masteryPoints} pts</span>
          </div>

          {/* Firebase Auth & Firestore Sync Gateway */}
          {firebaseUser ? (
            <div className="hidden md:flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs shadow-2xs">
              {firebaseUser.photoURL ? (
                <img src={firebaseUser.photoURL} alt="" className="h-6 w-6 rounded-full border border-emerald-300" />
              ) : (
                <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {firebaseUser.displayName?.charAt(0) || "G"}
                </div>
              )}
              <div className="text-left hidden lg:block leading-tight">
                <span className="block text-[11px] font-bold text-slate-800 truncate max-w-[100px]">
                  {firebaseUser.displayName?.split(" ")[0] || "Scholar"}
                </span>
                <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Firestore Synced
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                title="Sign out of Firebase"
                className="p-1 hover:bg-emerald-100 rounded-lg text-slate-500 hover:text-slate-800 transition ml-0.5"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="nav-firebase-auth-btn"
              type="button"
              disabled={isSigningIn}
              onClick={handleGoogleSignIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-bold transition shadow-2xs"
              title="Sign in with Google to sync with Firebase Firestore"
            >
              <LogIn className="h-3.5 w-3.5 text-indigo-600" />
              <span className="hidden md:inline">{isSigningIn ? "Connecting..." : "Sign in with Google"}</span>
              <span className="md:hidden">Google</span>
            </button>
          )}

          {/* Institutional Role Switcher */}
          <div className="relative">
            <button
              id="nav-role-switcher-btn"
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-2xs ${
                currentSession.role === "ADMIN"
                  ? "bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100"
                  : currentSession.role === "TEACHER"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                  : "bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100"
              }`}
              title="Switch Institutional User Role"
            >
              <div className="h-5 w-5 rounded-lg flex items-center justify-center font-bold text-[10px] text-white bg-slate-900">
                {currentSession.role === "ADMIN" ? "AD" : currentSession.role === "TEACHER" ? "TC" : "LN"}
              </div>
              <div className="text-left hidden md:block">
                <span className="block text-[11px] font-extrabold leading-tight truncate max-w-[100px]">
                  {currentSession.displayName.split(" ")[0]}
                </span>
                <span className="block text-[9px] uppercase tracking-wider font-semibold opacity-75 leading-tight">
                  {currentSession.role}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2.5 z-50 space-y-1.5"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Institutional Role Switcher
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Local shared-device profile context
                  </p>
                </div>

                {allUsers.map((user) => {
                  const isSelected = user.id === currentSession.userId;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSwitchUser(user.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition border ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "hover:bg-slate-50 border-transparent text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-8 w-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                            isSelected
                              ? "bg-indigo-500 text-white"
                              : user.role === "ADMIN"
                              ? "bg-rose-100 text-rose-700"
                              : user.role === "TEACHER"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {user.role === "ADMIN" ? "AD" : user.role === "TEACHER" ? "TC" : "LN"}
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            <span>{user.displayName}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : user.role === "ADMIN"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : user.role === "TEACHER"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                              }`}
                            >
                              {user.role}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] block truncate max-w-[160px] ${
                              isSelected ? "text-slate-300" : "text-slate-400"
                            }`}
                          >
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-slate-100">
                  <div className="px-2 py-1 flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Cloud Persistence (Firebase)
                    </span>
                  </div>

                  {firebaseUser ? (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center gap-2">
                        {firebaseUser.photoURL ? (
                          <img
                            src={firebaseUser.photoURL}
                            alt=""
                            className="h-6 w-6 rounded-full border border-slate-200"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                            {firebaseUser.displayName?.charAt(0) || "U"}
                          </div>
                        )}
                        <div className="truncate">
                          <span className="block font-bold text-slate-800 text-[11px] truncate">
                            {firebaseUser.displayName || "Google Scholar"}
                          </span>
                          <span className="block text-[9px] text-slate-400 truncate">
                            {firebaseUser.email}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full py-1 px-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <LogOut className="h-3 w-3" />
                        <span>Sign Out of Google / Firebase</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        disabled={isSigningIn}
                        onClick={handleGoogleSignIn}
                        className="w-full py-2 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-[11px] font-bold flex items-center justify-center gap-2 shadow-xs transition"
                      >
                        <LogIn className="h-3.5 w-3.5" />
                        <span>{isSigningIn ? "Connecting Google..." : "Sign in with Google"}</span>
                      </button>
                      {authErrorNotice && (
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-[10px] leading-relaxed flex items-start gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span>{authErrorNotice}</span>
                            <button
                              type="button"
                              onClick={() => setAuthErrorNotice(null)}
                              className="block mt-1 font-bold text-amber-900 underline hover:text-amber-950"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-1.5 border-t border-slate-100 px-1 text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>Deterministic Local Session</span>
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">
                    {currentSession.sessionId.substring(0, 10)}...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Socratic AI Launcher */}
          <button
            id="nav-tutor-moos-btn"
            type="button"
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:from-indigo-700 hover:to-indigo-800 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="hidden sm:inline">Tutor Moos AI</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="lg:hidden flex items-center justify-between overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/70 text-xs gap-3">
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className={`whitespace-nowrap font-bold ${activeView === "dashboard" ? "text-indigo-600" : "text-slate-600"}`}
        >
          Learner Hub
        </button>
        <button
          type="button"
          onClick={() => onNavigate("curriculum")}
          className={`whitespace-nowrap font-bold ${activeView === "curriculum" ? "text-indigo-600" : "text-slate-600"}`}
        >
          Curriculum
        </button>
        <button
          type="button"
          onClick={() => onNavigate("practice")}
          className={`whitespace-nowrap font-bold ${activeView === "practice" ? "text-indigo-600" : "text-slate-600"}`}
        >
          Practice
        </button>
        <button
          type="button"
          onClick={() => onNavigate("teacher_studio")}
          className={`whitespace-nowrap font-bold ${activeView === "teacher_studio" ? "text-indigo-600" : "text-slate-600"}`}
        >
          Teacher Studio
        </button>
        <button
          type="button"
          onClick={() => onNavigate("stakeholders")}
          className={`whitespace-nowrap font-bold ${activeView === "stakeholders" ? "text-rose-600" : "text-slate-600"}`}
        >
          Portals
        </button>
        <button
          type="button"
          onClick={() => onNavigate("textbook_studio")}
          className={`whitespace-nowrap font-bold ${activeView === "textbook_studio" ? "text-indigo-600" : "text-slate-600"}`}
        >
          Textbook Studio
        </button>
        <button
          type="button"
          onClick={() => onNavigate("bookpreneur_studio")}
          className={`whitespace-nowrap font-bold ${activeView === "bookpreneur_studio" ? "text-purple-600" : "text-slate-600"}`}
        >
          Bookpreneur
        </button>
        <button
          type="button"
          onClick={() => onNavigate("agent_hub")}
          className={`whitespace-nowrap font-bold ${activeView === "agent_hub" ? "text-cyan-600" : "text-slate-600"}`}
        >
          Agent AI
        </button>
        <button
          type="button"
          onClick={() => onNavigate("play")}
          className={`whitespace-nowrap font-bold ${activeView === "play" ? "text-amber-600" : "text-slate-600"}`}
        >
          Learn & Play
        </button>
        <button
          type="button"
          onClick={() => onNavigate("qr_companion")}
          className={`whitespace-nowrap font-bold ${activeView === "qr_companion" ? "text-indigo-600" : "text-slate-600"}`}
        >
          QR Hub
        </button>
        <button
          type="button"
          onClick={() => onNavigate("exam_hall")}
          className={`whitespace-nowrap font-bold ${activeView === "exam_hall" ? "text-indigo-600" : "text-slate-600"}`}
        >
          Exam Hall
        </button>
        <button
          type="button"
          onClick={() => onNavigate("saturation_studio")}
          className={`whitespace-nowrap font-bold ${activeView === "saturation_studio" ? "text-emerald-600" : "text-slate-600"}`}
        >
          Saturation
        </button>
      </div>

      {/* Interactive Multi-Factor Authentication Modal */}
      {isMfaModalOpen && (
        <MfaModal
          isOpen={isMfaModalOpen}
          onClose={() => {
            setIsMfaModalOpen(false);
            setPendingMfaUserId(null);
          }}
          targetUserId={pendingMfaUserId || currentSession.userId}
          targetUserEmail={pendingMfaUserEmail || (currentSession as any).email || `${currentSession.userId}@moos.academy`}
          mode={mfaModalMode}
          onSuccess={handleMfaModalSuccess}
          title={mfaModalMode === "ENROLL" ? "Institutional Admin MFA Setup" : "Administrator Second-Factor Verification"}
          description="Verification of authentic RFC 6238 TOTP code is required for elevated governance privileges."
        />
      )}
    </header>
  );
};

