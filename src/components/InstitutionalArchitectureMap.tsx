import React, { useState } from "react";
import {
  ShieldCheck,
  BrainCircuit,
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Sparkles,
  Database,
  Lock,
  Layers,
  Activity,
  Award,
  Gamepad2,
  QrCode,
  FileCheck2,
  RefreshCw,
  Eye,
  Settings,
  ChevronRight,
  TrendingUp,
  Cpu,
  UserCheck,
  Clock
} from "lucide-react";
import { ActiveView } from "./Navbar";
import { identityService } from "../services/identityService";
import { auditService } from "../services/auditService";
import { backupService } from "../services/backupService";
import { teacherStudioService } from "../services/teacherStudioService";
import { bookpreneurService } from "../services/bookpreneurService";
import { agentOrchestrationService } from "../services/agentOrchestrationService";

interface InstitutionalArchitectureMapProps {
  onNavigate: (view: ActiveView) => void;
}

type NodeSelection =
  | "apex"
  | "foundation"
  | "foundation_identity"
  | "foundation_rbac"
  | "foundation_audit"
  | "foundation_backup"
  | "foundation_governance"
  | "pillar_learn"
  | "pillar_teach"
  | "pillar_bookpreneur"
  | "ai_layer"
  | "ai_diagnose"
  | "ai_recommend"
  | "ai_generate"
  | "ai_explain"
  | "human_authority"
  | "human_approval"
  | "human_classroom"
  | "human_outcomes"
  | "human_evidence";

export const InstitutionalArchitectureMap: React.FC<InstitutionalArchitectureMapProps> = ({
  onNavigate
}) => {
  const [selectedNode, setSelectedNode] = useState<NodeSelection>("apex");
  const [activeSimulation, setActiveSimulation] = useState<"diagnose" | "recommend" | "generate" | "explain" | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const activeSession = identityService.getActiveSession();
  const allAudits = auditService.queryLogs();
  const safetySnapshot = backupService.getLatestSafetySnapshot();
  const approvalQueue = agentOrchestrationService.getApprovalQueue();
  const activeAssignments = teacherStudioService.getAssignments();
  const allResources = bookpreneurService.getMarketplaceResources({ publicationStatus: "PUBLISHED" });

  const handleSimulateAIEngine = (engine: "diagnose" | "recommend" | "generate" | "explain") => {
    setActiveSimulation(engine);
    const timestamp = new Date().toLocaleTimeString();
    
    if (engine === "diagnose") {
      setSimulationLog([
        `[${timestamp}] DIAGNOSTIC ENGINE INGESTION: Querying learner item response matrix for Class SSS-3 Physics...`,
        `[${timestamp}] COGNITIVE BOTTLENECK DETECTED: 68% of cohort exhibiting sign error in Projectile Motion vertical component (u_y = u sin θ).`,
        `[${timestamp}] PREREQUISITE DEPTH SCAN: Found root misconception in Trigonometric Resolution (Skill MTH-GEO-04).`,
        `[${timestamp}] DIAGNOSIS PACKAGED: Forwarding cognitive gap profile to Human Teacher Review & Recommendation Layer.`
      ]);
    } else if (engine === "recommend") {
      setSimulationLog([
        `[${timestamp}] ADAPTIVE RECOMMENDATION ENGINE: Evaluating curricular constraints for WAEC 2026 syllabus...`,
        `[${timestamp}] SCAFFOLDING FORMULATION: Recommending 3-tier sequence: (1) Visual Vector Decomposition -> (2) Step-by-Step Trajectory Drills -> (3) JAMB Time-of-Flight Problem Sets.`,
        `[${timestamp}] LEARNING SUPPLY MAPPING: Recommending Companion Codex Resource: "STEM Advanced Mechanics Vol 2" (QR Codices verified).`,
        `[${timestamp}] RECOMMENDATION PACKAGED: Awaiting Teacher Approval for automated assignment distribution.`
      ]);
    } else if (engine === "generate") {
      setSimulationLog([
        `[${timestamp}] CONTEXTUAL GENERATION ENGINE: Prompting Gemini 2.5 with NERDC / WAEC curricular alignment constraints...`,
        `[${timestamp}] GENERATING ITEM BANK: Creating 5 multi-step Socratic practice problems with culturally grounded Nigerian context (e.g., Lekki-Ikoyi Link Bridge projectile mechanics).`,
        `[${timestamp}] HINT LADDER SYNTHESIS: 4-tier graduated hints compiled without revealing the final answer on step 1.`,
        `[${timestamp}] HUMAN APPROVAL GATE: Item flagged with status PENDING_TEACHER_APPROVAL in Governed Queue.`
      ]);
    } else if (engine === "explain") {
      setSimulationLog([
        `[${timestamp}] SOCRATIC EXPLANATION ENGINE: Analyzing learner partial attempt: "I squared initial velocity before multiplying by gravity."`,
        `[${timestamp}] MISCONCEPTION PROBE: Generating targeted guiding question: "What are the physical dimensions of v^2 versus 2gh in kinematic energy balance?"`,
        `[${timestamp}] MULTI-MODAL REPRESENTATION: Generating interactive ASCII trajectory diagram with peak height markers.`,
        `[${timestamp}] PEDAGOGICAL DELIVERY: Pushed to active learner chat stream with zero ungrounded hallucination.`
      ]);
    }
  };

  return (
    <div id="institutional-architecture-view" className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-cyan-600/15 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" />
              SYSTEM ARCHITECTURE & GOVERNANCE BLUEPRINT
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              MOOS TECHY ACADEMY
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Unified institutional blueprint establishing the foundation of multi-role governance, tri-pillar educational ecosystems (Learn, Teach, Bookpreneur), governed AI teacher layers, and sovereign human authority.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("agent_hub")}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <BrainCircuit className="h-4 w-4" />
              <span>Agent Intelligence Hub</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("dashboard")}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 border border-slate-700"
            >
              <Layers className="h-4 w-4" />
              <span>Learner Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Architectural Flowchart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Interactive Flow Canvas</span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">Architectural Hierarchy & Data Flow</h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Click any node to inspect
            </span>
          </div>

          {/* 1. TOP APEX NODE */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => setSelectedNode("apex")}
              className={`w-full max-w-md p-4 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                selectedNode === "apex"
                  ? "bg-indigo-900 border-indigo-500 text-white shadow-lg ring-4 ring-indigo-500/20 scale-[1.02]"
                  : "bg-slate-900 border-slate-700 text-white hover:border-slate-500"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Apex System Anchor</div>
              <h3 className="text-base font-black tracking-wide">MOOS TECHY ACADEMY</h3>
              <p className="text-xs text-slate-300 mt-1">Global Multidisciplinary Learning Ecosystem</p>
            </div>

            {/* Downward Connector */}
            <div className="h-6 w-0.5 bg-slate-300 my-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            </div>
          </div>

          {/* 2. SHARED INSTITUTIONAL FOUNDATION */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => setSelectedNode("foundation")}
              className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedNode.startsWith("foundation")
                  ? "bg-slate-900 border-cyan-500 text-white shadow-lg ring-4 ring-cyan-500/20"
                  : "bg-slate-800 border-slate-700 text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                    Shared Institutional Foundation
                  </span>
                </div>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                  Zero Trust Core
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-700/80">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedNode("foundation_identity"); }}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                    selectedNode === "foundation_identity" ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <Users className="h-3.5 w-3.5 mx-auto mb-1 opacity-80" />
                  <span>Identity</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedNode("foundation_rbac"); }}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                    selectedNode === "foundation_rbac" ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <Lock className="h-3.5 w-3.5 mx-auto mb-1 opacity-80" />
                  <span>RBAC</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedNode("foundation_audit"); }}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                    selectedNode === "foundation_audit" ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <FileCheck2 className="h-3.5 w-3.5 mx-auto mb-1 opacity-80" />
                  <span>Audit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedNode("foundation_backup"); }}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                    selectedNode === "foundation_backup" ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <Database className="h-3.5 w-3.5 mx-auto mb-1 opacity-80" />
                  <span>Backup</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedNode("foundation_governance"); }}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                    selectedNode === "foundation_governance" ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 mx-auto mb-1 opacity-80" />
                  <span>Gov</span>
                </button>
              </div>
            </div>

            {/* Split Fork Connectors */}
            <div className="w-full flex justify-around items-center my-1 relative h-6">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 -translate-x-1/2" />
              <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-slate-300" />
              <div className="absolute top-1/2 left-[15%] h-3 w-0.5 bg-slate-300" />
              <div className="absolute top-1/2 right-[15%] h-3 w-0.5 bg-slate-300" />
            </div>
          </div>

          {/* 3. TRI-PILLAR DOMAINS (LEARN • TEACH • BOOKPRENEUR) */}
          <div className="grid grid-cols-3 gap-3">
            {/* LEARN */}
            <div
              onClick={() => setSelectedNode("pillar_learn")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedNode === "pillar_learn"
                  ? "bg-indigo-50 border-indigo-600 text-indigo-950 shadow-md ring-2 ring-indigo-600"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 text-indigo-700 font-extrabold text-xs uppercase">
                  <BrainCircuit className="h-3.5 w-3.5" />
                  <span>LEARN</span>
                </div>
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">Personalized Mastery</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Practice Arena, Socratic Tutor, CBT Exams, Play & Learn, QR Codices.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate("dashboard"); }}
                className="mt-3 w-full py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-bold hover:bg-indigo-700 transition"
              >
                Launch Learn Hub
              </button>
            </div>

            {/* TEACH */}
            <div
              onClick={() => setSelectedNode("pillar_teach")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedNode === "pillar_teach"
                  ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-600"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 text-emerald-700 font-extrabold text-xs uppercase">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>TEACH</span>
                </div>
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">Pedagogical Command</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Teacher Studio, Cohort Analytics, Scaffolding, Live Interventions.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate("teacher_studio"); }}
                className="mt-3 w-full py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition"
              >
                Launch Teacher Studio
              </button>
            </div>

            {/* BOOKPRENEUR */}
            <div
              onClick={() => setSelectedNode("pillar_bookpreneur")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedNode === "pillar_bookpreneur"
                  ? "bg-amber-50 border-amber-600 text-amber-950 shadow-md ring-2 ring-amber-600"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 text-amber-700 font-extrabold text-xs uppercase">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>BOOKPRENEUR</span>
                </div>
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">Knowledge Economy</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Nonfiction Authoring, Claim Rigor, Codex Marketplace, 70/30 Royalties.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate("bookpreneur_studio"); }}
                className="mt-3 w-full py-1.5 rounded-lg bg-amber-600 text-white text-[11px] font-bold hover:bg-amber-700 transition"
              >
                Launch Bookpreneur
              </button>
            </div>
          </div>

          {/* Connectors to AI Teacher Layer */}
          <div className="w-full flex justify-around items-center my-1 relative h-6">
            <div className="absolute top-0 left-[15%] right-[15%] h-0.5 bg-slate-300" />
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 -translate-x-1/2" />
          </div>

          {/* 4. AI TEACHER LAYER (Diagnose • Recommend • Generate • Explain) */}
          <div
            onClick={() => setSelectedNode("ai_layer")}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedNode.startsWith("ai_")
                ? "bg-slate-900 border-indigo-500 text-white shadow-lg ring-4 ring-indigo-500/20"
                : "bg-slate-800 border-slate-700 text-white hover:border-slate-600"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                  AI Teacher Layer (Cognitive Engines)
                </span>
              </div>
              <span className="text-[10px] bg-indigo-950 border border-indigo-700 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                Bounded Agents
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-700/80">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("ai_diagnose"); handleSimulateAIEngine("diagnose"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "ai_diagnose" ? "bg-indigo-500 text-white font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                }`}
              >
                <span>Diagnose</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("ai_recommend"); handleSimulateAIEngine("recommend"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "ai_recommend" ? "bg-indigo-500 text-white font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                }`}
              >
                <span>Recommend</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("ai_generate"); handleSimulateAIEngine("generate"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "ai_generate" ? "bg-indigo-500 text-white font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                }`}
              >
                <span>Generate</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("ai_explain"); handleSimulateAIEngine("explain"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "ai_explain" ? "bg-indigo-500 text-white font-black" : "bg-slate-700/60 text-slate-200 hover:bg-slate-700"
                }`}
              >
                <span>Explain</span>
              </button>
            </div>
          </div>

          {/* Downward Connector to Human Authority */}
          <div className="flex flex-col items-center my-1">
            <div className="h-6 w-0.5 bg-slate-300 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>

          {/* 5. HUMAN TEACHER AUTHORITY (Approve / Reject / Edit • Classroom Execution • Outcomes • Evidence) */}
          <div
            onClick={() => setSelectedNode("human_authority")}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedNode.startsWith("human_")
                ? "bg-emerald-950 border-emerald-500 text-white shadow-lg ring-4 ring-emerald-500/20"
                : "bg-slate-900 border-slate-700 text-white hover:border-slate-600"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  Human Teacher Authority & Closed Loop
                </span>
              </div>
              <span className="text-[10px] bg-emerald-900/60 border border-emerald-700 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Sovereign Gatekeeper
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("human_approval"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "human_approval" ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Approve / Edit</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("human_classroom"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "human_classroom" ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Classroom Exec</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("human_outcomes"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "human_outcomes" ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Learner Outcomes</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedNode("human_evidence"); }}
                className={`p-2 rounded-xl text-center text-xs font-bold transition ${
                  selectedNode === "human_evidence" ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Continuous Evidence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Deep Inspector & Telemetry Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Node Detail Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Layer Specification & Telemetry
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                NODE::{selectedNode.toUpperCase()}
              </span>
            </div>

            {/* APEX */}
            {selectedNode === "apex" && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">MOOS TECHY ACADEMY</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The overarching multidisciplinary learning enterprise serving primary through university STEM scholars across Nigeria and international curricula (WAEC, JAMB UTME, NERDC, Cambridge IGCSE).
                </p>
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 block uppercase">Ecosystem Summary</span>
                  <ul className="text-xs text-indigo-800 space-y-1">
                    <li>• <strong>Active Session:</strong> {activeSession.displayName} ({activeSession.role})</li>
                    <li>• <strong>Immutable Audited Events:</strong> {allAudits.length} recorded</li>
                    <li>• <strong>Published Knowledge Codices:</strong> {allResources.length} active</li>
                    <li>• <strong>Classroom Cohorts Managed:</strong> {activeAssignments.length} assignments active</li>
                  </ul>
                </div>
              </div>
            )}

            {/* FOUNDATION & SUB-NODES */}
            {selectedNode.startsWith("foundation") && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-600" />
                  <h3 className="text-xl font-black text-slate-900">
                    {selectedNode === "foundation_identity" ? "Identity & Session Architecture" :
                     selectedNode === "foundation_rbac" ? "Role-Based Access Control (RBAC)" :
                     selectedNode === "foundation_audit" ? "Cryptographic Audit Ledger" :
                     selectedNode === "foundation_backup" ? "Disaster Recovery & Forensic Backup" :
                     selectedNode === "foundation_governance" ? "Institutional Governance & Rate Limiting" :
                     "Shared Institutional Foundation"}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedNode === "foundation_identity" && "Multi-identity switching between Learner, Teacher, Content Manager, Author, and Admin with deterministic session tokens."}
                  {selectedNode === "foundation_rbac" && "Granular permission verification preventing unauthorized access across student exams, teacher grading, and editorial publication."}
                  {selectedNode === "foundation_audit" && "Tamper-evident log tracking all security events, approval decisions, and data access records."}
                  {selectedNode === "foundation_backup" && "Automated snapshots with SHA-256 integrity verification, point-in-time restore, and emergency reset gates."}
                  {selectedNode === "foundation_governance" && "Deterministic guardrails, pedagogical boundaries, and ethical AI policy enforcement."}
                  {selectedNode === "foundation" && "The bedrock zero-trust architecture powering all identity, permissioning, forensic auditability, and persistence."}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Security Invariants:</span>
                    <span className="font-bold text-emerald-600">ENFORCED (100%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Identity ID:</span>
                    <span className="text-slate-900">{activeSession.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Audit Stream:</span>
                    <span className="text-slate-900">{allAudits.length} events</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Safety Snapshot:</span>
                    <span className="text-slate-900">{safetySnapshot ? "Active in vault" : "Available"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* PILLARS */}
            {selectedNode === "pillar_learn" && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-indigo-900">LEARN Ecosystem</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Khan-style interactive mastery platform featuring the Practice Arena, Diagnostic Engine, Socratic AI Tutor, CBT Exam Hall, Play & Learn gamified arena, and QR Companion Hub.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate("practice")}
                    className="w-full p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold hover:bg-indigo-100 transition flex items-center justify-between"
                  >
                    <span>Launch Practice Arena</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate("exam_hall")}
                    className="w-full p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold hover:bg-indigo-100 transition flex items-center justify-between"
                  >
                    <span>Launch CBT Exam Hall</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {selectedNode === "pillar_teach" && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-emerald-900">TEACH Ecosystem</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Comprehensive instructor command suite supporting classroom cohort creation, assignment staging, Socratic pedagogical scaffolding, and formative analytics.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate("teacher_studio")}
                  className="w-full p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition flex items-center justify-between"
                >
                  <span>Open Teacher Studio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {selectedNode === "pillar_bookpreneur" && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-amber-900">BOOKPRENEUR Ecosystem</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Nonfiction knowledge creation studio with empirical citation rigor, reader transformation mapping, 70/30 creator revenue modeling, and public educational marketplace.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate("bookpreneur_studio")}
                  className="w-full p-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-500 transition flex items-center justify-between"
                >
                  <span>Open Bookpreneur Studio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* AI TEACHER LAYER */}
            {selectedNode.startsWith("ai_") && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">
                  {selectedNode === "ai_diagnose" ? "Diagnose Cognitive Engine" :
                   selectedNode === "ai_recommend" ? "Recommend Adaptive Engine" :
                   selectedNode === "ai_generate" ? "Generate Contextual Engine" :
                   selectedNode === "ai_explain" ? "Explain Socratic Engine" :
                   "AI Teacher Layer (4 Cognitive Engines)"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bounded intelligence layer running 12 specialized role agents with deterministic tool boundaries, rate limiting, and zero direct unverified injection into learner syllabi.
                </p>

                {/* Simulation Trigger */}
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 block">Interactive Engine Dispatcher</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSimulateAIEngine("diagnose")}
                      className="p-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
                    >
                      Run Diagnose Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAIEngine("recommend")}
                      className="p-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
                    >
                      Run Recommend Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAIEngine("generate")}
                      className="p-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
                    >
                      Run Generate Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAIEngine("explain")}
                      className="p-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
                    >
                      Run Explain Sim
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* HUMAN AUTHORITY */}
            {selectedNode.startsWith("human_") && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-emerald-950">
                  {selectedNode === "human_approval" ? "Human Approval Gate (Approve / Reject / Edit)" :
                   selectedNode === "human_classroom" ? "Classroom Execution & Deployment" :
                   selectedNode === "human_outcomes" ? "Learner Outcomes & Telemetry" :
                   selectedNode === "human_evidence" ? "Continuous Evidence & Learning Gains" :
                   "Human Teacher Authority"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sovereign human oversight ensuring teachers remain the final arbiters of instructional content, classroom delivery, and learner assessment.
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-950">
                  <div className="flex justify-between font-bold">
                    <span>Pending In Approval Queue:</span>
                    <span>{approvalQueue.filter((a) => !a.reviewDecision || a.reviewDecision === "revision_requested").length} items</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Active Classroom Cohorts:</span>
                    <span>{activeAssignments.length} active assignments</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Simulation Trace Box */}
          {simulationLog.length > 0 && (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 text-slate-100 shadow-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-cyan-400">
                <span className="font-bold uppercase tracking-wider">
                  Live Engine Trace: {activeSimulation?.toUpperCase()}
                </span>
                <span className="text-[10px] bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded text-cyan-300">
                  GOVERNED_EXEC
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300 max-h-48 overflow-y-auto">
                {simulationLog.map((log, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
