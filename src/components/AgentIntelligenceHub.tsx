import React, { useState } from "react";
import {
  BrainCircuit,
  Bot,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Send,
  Terminal,
  Activity,
  FileCheck2,
  UserCheck,
  Cpu,
  ArrowRight,
  Database
} from "lucide-react";
import { agentOrchestrationService, AGENT_REGISTRY } from "../services/agentOrchestrationService";
import { AgentRole, AgentTask, HumanApprovalRecord, AgentAuditRecord } from "../types/agentOrchestrator";

export const AgentIntelligenceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"registry" | "orchestrator" | "approvals" | "audit">("registry");
  const [selectedAgentRole, setSelectedAgentRole] = useState<AgentRole>("tutor_agent");
  const [taskObjective, setTaskObjective] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastExecutedTask, setLastExecutedTask] = useState<AgentTask | null>(null);

  const [approvalQueue, setApprovalQueue] = useState<HumanApprovalRecord[]>(
    agentOrchestrationService.getApprovalQueue()
  );
  const [auditLog, setAuditLog] = useState<AgentAuditRecord[]>(
    agentOrchestrationService.getAuditTrail()
  );

  const [selectedApproval, setSelectedApproval] = useState<HumanApprovalRecord | null>(
    approvalQueue[0] || null
  );
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [reviewerSignature, setReviewerSignature] = useState("");

  const handleRunTask = async () => {
    if (!taskObjective.trim()) return;
    setIsExecuting(true);
    try {
      const task = await agentOrchestrationService.orchestrateTask(
        selectedAgentRole,
        taskObjective,
        {
          userId: "user-admin-001",
          userRole: "admin"
        }
      );
      setLastExecutedTask(task);
      setApprovalQueue(agentOrchestrationService.getApprovalQueue());
      setAuditLog(agentOrchestrationService.getAuditTrail());
    } finally {
      setIsExecuting(false);
    }
  };

  const handleProcessApproval = (verdict: "approved" | "rejected") => {
    if (!selectedApproval || !reviewerSignature.trim()) return;
    agentOrchestrationService.submitHumanApproval(
      selectedApproval.id,
      verdict,
      reviewerSignature,
      "user-admin-001",
      reviewerNotes || "Approved in Agent Intelligence Hub verification console.",
      reviewerSignature
    );
    setApprovalQueue(agentOrchestrationService.getApprovalQueue());
    setAuditLog(agentOrchestrationService.getAuditTrail());
    setSelectedApproval(null);
    setReviewerNotes("");
    setReviewerSignature("");
  };

  const selectedAgentDefinition = AGENT_REGISTRY[selectedAgentRole];

  return (
    <div id="agent-intelligence-hub-container" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="h-3.5 w-3.5" />
              MOOS TECHY INTELLIGENCE ARCHITECTURE • GOVERNED AGENT REGISTRY
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Agent Orchestrator, Quality Audits & Human Approval
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Transparent, bounded multi-agent system coordinating 12 specialized role agents across LEARN, TEACH, and CREATE ecosystems with deterministic tool boundaries, quality verification, and human-in-the-loop sign-off.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>12 Specialized Agents Active</span>
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("registry")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "registry"
                ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>Agent Directory ({Object.keys(AGENT_REGISTRY).length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orchestrator")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "orchestrator"
                ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Task Dispatcher</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("approvals")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "approvals"
                ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Human Approval Gate ({approvalQueue.filter((a) => !a.reviewDecision || a.reviewDecision === "revision_requested").length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "audit"
                ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Audit Trail ({auditLog.length})</span>
          </button>
        </div>
      </div>

      {/* Tab: Registry */}
      {activeTab === "registry" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Agent List */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Registered Role Agents</h3>
            <div className="space-y-2">
              {Object.values(AGENT_REGISTRY).map((agent) => (
                <div
                  key={agent.role}
                  onClick={() => setSelectedAgentRole(agent.role)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    selectedAgentRole === agent.role
                      ? "bg-white border-cyan-600 shadow-md shadow-cyan-600/10 ring-1 ring-cyan-600"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{agent.displayName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                      {agent.permissionLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{agent.pedagogicalPurpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Selected Agent Specification */}
          <div className="lg:col-span-8">
            {selectedAgentDefinition && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
                      Role Specification
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {selectedAgentDefinition.displayName}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200 uppercase">
                    Level: {selectedAgentDefinition.permissionLevel}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Domain Focus & Pedagogical Purpose</h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {selectedAgentDefinition.pedagogicalPurpose}
                  </p>
                </div>

                {/* Permitted Tools */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Permitted Deterministic Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgentDefinition.allowedToolIds.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* System Prompt Guidelines */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Governance Rules</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {selectedAgentDefinition.systemPromptGuidelines.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span>✓</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Task Orchestrator Sandbox */}
      {activeTab === "orchestrator" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Execution Sandbox</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Dispatch Governed Agent Objective</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Target Agent</label>
              <select
                value={selectedAgentRole}
                onChange={(e) => setSelectedAgentRole(e.target.value as AgentRole)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
              >
                {Object.values(AGENT_REGISTRY).map((a) => (
                  <option key={a.role} value={a.role}>
                    {a.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Objective / Directive</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={taskObjective}
                  onChange={(e) => setTaskObjective(e.target.value)}
                  placeholder="e.g. Analyze quadratic formula misconceptions and prepare 5-step Socratic hints"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
                <button
                  type="button"
                  disabled={isExecuting || !taskObjective.trim()}
                  onClick={handleRunTask}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs sm:text-sm hover:bg-cyan-500 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isExecuting ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>Execute</span>
                </button>
              </div>
            </div>
          </div>

          {/* Last Executed Task Results */}
          {lastExecutedTask && (
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-cyan-400 pb-2 border-b border-slate-800">
                <span>Task Execution Result: {lastExecutedTask.id}</span>
                <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {lastExecutedTask.status}
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs sm:text-sm">{lastExecutedTask.outputContent || "Task executed successfully."}</p>
              
              {lastExecutedTask.qualityReport && (
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-sans text-xs space-y-1">
                  <span className="font-bold text-emerald-400 block">Quality Audit Score: {lastExecutedTask.qualityReport.overallQualityScore}%</span>
                  <p className="text-slate-300">Passes Automated Threshold: {lastExecutedTask.qualityReport.passesAutomatedThreshold ? "Yes" : "No"}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Human Approvals */}
      {activeTab === "approvals" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Approval Queue</h3>
            <div className="space-y-2">
              {approvalQueue.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedApproval(item)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    selectedApproval?.id === item.id
                      ? "bg-white border-cyan-600 shadow-md shadow-cyan-600/10 ring-1 ring-cyan-600"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                      {item.resourceType.replace("_", " ")}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      item.reviewDecision === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {item.reviewDecision || "PENDING"}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-2">{item.resourceTitle}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">Agent: {item.submittedByAgentId}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            {selectedApproval && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Reviewing Submission</span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">{selectedApproval.resourceTitle}</h2>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Reviewer Comments</label>
                  <textarea
                    value={reviewerNotes}
                    onChange={(e) => setReviewerNotes(e.target.value)}
                    placeholder="Enter pedagogical or mathematical audit notes..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Reviewer Signature</label>
                  <input
                    type="text"
                    value={reviewerSignature}
                    onChange={(e) => setReviewerSignature(e.target.value)}
                    placeholder="e.g. Dr. O. Adeleke (Chief Reviewer)"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleProcessApproval("rejected")}
                    className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-50 transition"
                  >
                    Reject & Request Revision
                  </button>
                  <button
                    type="button"
                    disabled={!reviewerSignature.trim()}
                    onClick={() => handleProcessApproval("approved")}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-500 transition disabled:opacity-50"
                  >
                    Approve for Publication
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Audit Log */}
      {activeTab === "audit" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Audit Trail</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Immutable Agent Activity & Governance Ledger</h3>
          </div>

          <div className="space-y-2">
            {auditLog.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span className="font-bold text-slate-900">{log.actionTaken}</span>
                  <span className="text-slate-600 font-medium">Tools: {log.toolsInvoked.join(", ")}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  {log.securityVerdict}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

