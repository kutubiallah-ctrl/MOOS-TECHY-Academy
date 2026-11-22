/**
 * MOOS TECHY ACADEMY — PROJECT REQUIREMENT MEMORY REGISTRY
 * 
 * Preserves the comprehensive architectural and educational requirements
 * across all pillars of MOOS ACADEMY, ensuring no requirement is silently
 * forgotten during continuous development and multi-agent operations.
 */

import { ProjectRequirement, VerificationStatus, TaskPriority, TaskRiskLevel, EvidenceItem } from "../types/developmentGuardian";

const REQUIREMENT_STORAGE_KEY = "moos_guardian_requirements_v1";

export const CANONICAL_PROJECT_REQUIREMENTS: ProjectRequirement[] = [
  {
    requirementId: "REQ-CURR-001",
    title: "National & Global Curriculum Dual Alignment",
    description: "Align curriculum with Nigerian standards (NERDC, WAEC, JAMB UTME) while preserving dual mapping to international standards (Cambridge IGCSE, UK Key Stages, US Common Core).",
    systemArea: "Curriculum",
    priority: "critical",
    status: "TESTED",
    verificationCriteria: [
      "Curriculum units map to valid NERDC and WAEC examination syllabi",
      "Prerequisite chains are strictly directed acyclic graphs (DAG)",
      "Educational levels span Primary Foundations, Upper Primary, Junior Secondary, Senior Secondary, and Exam Prep"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-curriculum-verification"],
    regressionRisk: "high"
  },
  {
    requirementId: "REQ-CURR-002",
    title: "Complete Curriculum Content Saturation",
    description: "Maintain saturation across all registered subjects (Math, English/ESL, Physics, Chemistry, Biology, Computer Science, Engineering, Financial Literacy) with at least 80+ comprehensive units and multi-step practice questions.",
    systemArea: "Content Saturation",
    priority: "high",
    status: "CONTENT_SATURATION_VERIFIED",
    verificationCriteria: [
      "No registered curriculum unit is empty or missing learning skills",
      "Every learning skill includes at least 3 practice questions with tiered hint ladders and explanations",
      "Zero dummy or repetitive question padding"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-saturation-audit"],
    regressionRisk: "medium"
  },
  {
    requirementId: "REQ-SB-001",
    title: "Smart Board Topic Locking & Inversion Invariance",
    description: "Smart Board pedagogical engine must lock topics deterministically, prevent topic/subject argument inversion errors in getProblemStepsForTopic, and isolate subject strategies.",
    systemArea: "Smart Board",
    priority: "critical",
    status: "RUNTIME_VERIFIED",
    verificationCriteria: [
      "getProblemStepsForTopic(topic, subject) produces identical steps to getProblemStepsForTopic(subject, topic)",
      "Topic locking categorizes subjects accurately across all 8 major domains",
      "Humanities topics never receive quadratic equation or formula derivations"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-smartboard-inversion-guard"],
    regressionRisk: "critical"
  },
  {
    requirementId: "REQ-SB-002",
    title: "Smart Board 15-20 Minute Masterclass Depth",
    description: "Smart Board masterclasses must provide substantive instructional progression with 20 to 30 pedagogical states: Orientation, Core, Guided Example, Prediction, Checkpoint, Application, Remediation, and Mastery.",
    systemArea: "Smart Board",
    priority: "high",
    status: "PEDAGOGICALLY_VERIFIED",
    verificationCriteria: [
      "Substantive topics expand into 20-30 discrete instructional states",
      "Narration script synchronizes with board visual elements without desynchronization",
      "Zero filler states used merely to artificially inflate duration"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-masterclass-depth-audit"],
    regressionRisk: "high"
  },
  {
    requirementId: "REQ-MATH-001",
    title: "Mathematical Speech Superscript vs Subscript Invariants",
    description: "Speech synthesizer must rigorously distinguish exponents and powers from subscripts, variables, and coefficients (e.g. x² -> 'x squared', x₁ -> 'x subscript 1', 2x² + 7x - 6).",
    systemArea: "Mathematical Speech",
    priority: "critical",
    status: "TESTED",
    verificationCriteria: [
      "x² spoken as 'x squared' and never as subscript",
      "x₁ spoken as 'x subscript 1' and never as squared",
      "Fractions, square roots, and negative discriminants spoken naturally"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-math-speech-invariants"],
    regressionRisk: "high"
  },
  {
    requirementId: "REQ-ESL-001",
    title: "CEFR-Aligned ESL Learning Progression",
    description: "English language instruction must adhere to genuine CEFR levels (Pre A1 to C2) covering Listening, Speaking, Pronunciation, Vocabulary, Grammar, Reading, Writing, and Academic Discourse.",
    systemArea: "ESL / English",
    priority: "high",
    status: "PEDAGOGICALLY_VERIFIED",
    verificationCriteria: [
      "Grammar topics isolate head nouns and subject-verb concord without generic math templates",
      "Academic English and Literature are separated into distinct domain strategies",
      "Phonics, minimal pairs, and collocations are provided for early language learners"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-esl-pedagogical-architecture"],
    regressionRisk: "medium"
  },
  {
    requirementId: "REQ-ACH-001",
    title: "Event-Driven Achievement Unlocks & Anti-Spoofing",
    description: "Achievement Center badges and certificates must be awarded dynamically based on authentic learner milestones (streaks, verified mastery, diagnostic completion) rather than hardcoded timestamps.",
    systemArea: "Achievement Center",
    priority: "medium",
    status: "RUNTIME_VERIFIED",
    verificationCriteria: [
      "Badge catalog definitions contain no static mock unlock timestamps",
      "Unlocking logic prevents duplicate entries during re-evaluation",
      "Certificates are controlled and digitally signable"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-achievement-event-driven"],
    regressionRisk: "medium"
  },
  {
    requirementId: "REQ-FIRE-001",
    title: "Firebase Firestore Persistence & Offline Safety",
    description: "Multi-device synchronization via Firestore with robust offline fallbacks, deterministic document IDs, and protection against accidental data loss when cloud database is empty.",
    systemArea: "Firebase / Persistence",
    priority: "critical",
    status: "RUNTIME_VERIFIED",
    verificationCriteria: [
      "Auth state changes trigger bidirectional local/cloud profile reconciliation",
      "Empty cloud documents never overwrite or delete initialized local learner data",
      "Network write timeouts fall back gracefully to local persistence without throwing unhandled rejections"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-firebase-sync-hardening"],
    regressionRisk: "critical"
  },
  {
    requirementId: "REQ-SEC-001",
    title: "Multi-Role Institutional RBAC & Multi-Tenant Isolation",
    description: "Enforce strict tenant boundaries between Learners, Teachers, and Admins. Prevent cross-tenant data access, classroom breaches, and unauthorized administrative actions.",
    systemArea: "Security / RBAC",
    priority: "critical",
    status: "SECURITY_VERIFIED",
    verificationCriteria: [
      "Learner cannot view or modify teacher classrooms or schoolwide settings",
      "Teacher cannot view or edit classrooms belonging to another teacher",
      "Privileged admin credentials are never bundled in client distribution"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-institutional-security-forensics"],
    regressionRisk: "critical"
  },
  {
    requirementId: "REQ-AIGOV-001",
    title: "AI Teacher Content Provenance & Human Approval Gate",
    description: "All AI-generated pedagogical materials (lesson plans, questions, worksheets) must be tagged AI_GENERATED_DRAFT and held in awaiting_human_approval until reviewed by an authorized teacher.",
    systemArea: "AI Governance",
    priority: "critical",
    status: "SECURITY_VERIFIED",
    verificationCriteria: [
      "AI outputs default strictly to AI_GENERATED_DRAFT",
      "Review transitions require valid teacher session ID and record audit provenance",
      "Unapproved AI materials are barred from learner assignments"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-ai-copilot-forensics"],
    regressionRisk: "critical"
  },
  {
    requirementId: "REQ-MULTI-001",
    title: "Multimodal Media Contracts & Ephemeral Audio Safety",
    description: "Enforce 16:9 and 9:16 aspect ratio constraints on Veo video generation, 16kHz PCM input / 24kHz output for Gemini Live voice, and prevent permanent retention of raw audio buffers.",
    systemArea: "Multimodal AI",
    priority: "high",
    status: "RUNTIME_VERIFIED",
    verificationCriteria: [
      "Veo studio permits only 16:9 and 9:16 aspect ratios",
      "Live Voice configures 16kHz audio capture and 24kHz playback",
      "Audio transcription jobs discard raw audio memory buffers post-transcription"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-multimodal-hardening"],
    regressionRisk: "medium"
  },
  {
    requirementId: "REQ-AUDIT-001",
    title: "Immutable Unified Audit Logging & Scoped Backups",
    description: "Maintain a tamper-evident, append-only audit trail for all security, identity, AI generation, and marketplace events. Support scoped learner/teacher backups with safety rollback snapshots.",
    systemArea: "Audit & Disaster Recovery",
    priority: "critical",
    status: "TESTED",
    verificationCriteria: [
      "All identity switches, denials, classroom actions, and approvals append to AuditService",
      "Safety restore snapshot taken automatically prior to applying backup restoration",
      "Backup serialization validated against 30-point integrity schema"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-audit-backup-verification"],
    regressionRisk: "high"
  },
  {
    requirementId: "REQ-TEST-001",
    title: "19-Suite Canonical Verification Baseline Protection",
    description: "Guard the canonical 19-suite test harness from accidental pruning, unlinked test files, or brittle test execution chaining.",
    systemArea: "DevOps & Quality",
    priority: "critical",
    status: "TESTED",
    verificationCriteria: [
      "npm test runs the unified runAllSuites runner containing all canonical suites",
      "Zero failed, zero error, zero skipped tests across the entire suite",
      "Non-brittle runner executes every suite and reports explicit metrics"
    ],
    lastVerified: new Date().toISOString(),
    evidence: [],
    relatedTasks: ["task-canonical-harness-protection"],
    regressionRisk: "critical"
  }
];

export class RequirementRegistryService {
  private static instance: RequirementRegistryService;
  private requirements: Map<string, ProjectRequirement> = new Map();

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): RequirementRegistryService {
    if (!RequirementRegistryService.instance) {
      RequirementRegistryService.instance = new RequirementRegistryService();
    }
    return RequirementRegistryService.instance;
  }

  private loadFromStorage(): void {
    // Seed initial canonical requirements
    CANONICAL_PROJECT_REQUIREMENTS.forEach((req) => {
      this.requirements.set(req.requirementId, { ...req });
    });

    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(REQUIREMENT_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ProjectRequirement[];
          parsed.forEach((req) => {
            this.requirements.set(req.requirementId, req);
          });
        }
      }
    } catch (e) {
      console.warn("Storage load deferred for requirement registry:", e);
    }
  }

  private persist(): void {
    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.setItem(
          REQUIREMENT_STORAGE_KEY,
          JSON.stringify(Array.from(this.requirements.values()))
        );
      }
    } catch (e) {
      console.warn("Storage persist deferred for requirement registry:", e);
    }
  }

  public getAllRequirements(): ProjectRequirement[] {
    return Array.from(this.requirements.values());
  }

  public getRequirementById(requirementId: string): ProjectRequirement | undefined {
    return this.requirements.get(requirementId);
  }

  public getRequirementsByArea(systemArea: string): ProjectRequirement[] {
    return this.getAllRequirements().filter(
      (r) => r.systemArea.toLowerCase() === systemArea.toLowerCase()
    );
  }

  public getUnverifiedRequirements(): ProjectRequirement[] {
    return this.getAllRequirements().filter(
      (r) => r.status === "UNVERIFIED" || r.status === "UNKNOWN" || r.status === "BROKEN"
    );
  }

  public getStaleRequirements(maxAgeHours: number = 72): ProjectRequirement[] {
    const cutoff = Date.now() - maxAgeHours * 60 * 60 * 1000;
    return this.getAllRequirements().filter((r) => {
      const lastCheck = new Date(r.lastVerified).getTime();
      return isNaN(lastCheck) || lastCheck < cutoff;
    });
  }

  public updateRequirementStatus(
    requirementId: string,
    status: VerificationStatus,
    evidence?: EvidenceItem
  ): boolean {
    const req = this.requirements.get(requirementId);
    if (!req) return false;

    req.status = status;
    req.lastVerified = new Date().toISOString();
    if (evidence) {
      req.evidence = [evidence, ...req.evidence.slice(0, 19)]; // Keep last 20 evidence items
    }
    this.persist();
    return true;
  }

  public recordEvidence(requirementId: string, evidence: EvidenceItem): boolean {
    const req = this.requirements.get(requirementId);
    if (!req) return false;

    req.evidence = [evidence, ...req.evidence.slice(0, 19)];
    req.lastVerified = new Date().toISOString();
    this.persist();
    return true;
  }

  public registerRequirement(requirement: ProjectRequirement): void {
    this.requirements.set(requirement.requirementId, requirement);
    this.persist();
  }
}

export const requirementRegistryService = RequirementRegistryService.getInstance();
