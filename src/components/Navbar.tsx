import React, { useState } from "react";
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
  ChevronDown
} from "lucide-react";
import { LearnerProfile } from "../types/curriculum";

export type ActiveView =
  | "dashboard"
  | "curriculum"
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
  | "agent_hub";

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  profile: LearnerProfile;
  onOpenAITutor: () => void;
  onQuickDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  profile,
  onOpenAITutor,
  onQuickDiagnostic
}) => {
  const [showStudioDropdown, setShowStudioDropdown] = useState(false);

  const isStudioActive = ["teacher_studio", "textbook_studio", "bookpreneur_studio", "agent_hub"].includes(activeView);

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Banner: Global Vision & Flagship Domain */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs text-slate-300 flex items-center justify-between sm:justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-300">MOOS TECHY ACADEMY</span>
          <span className="hidden sm:inline">— Global Multidisciplinary Learning Ecosystem</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">LEARN • TEACH • CREATE • INTELLIGENCE</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
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
                MOOS TECHY
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
              </div>
            )}
          </div>
        </nav>

        {/* Right Stats & Socratic AI Trigger */}
        <div className="flex items-center gap-2.5">
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
      </div>
    </header>
  );
};

