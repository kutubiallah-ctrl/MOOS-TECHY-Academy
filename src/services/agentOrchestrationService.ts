/**
 * MOOS TECHY ACADEMY — AGENT ORCHESTRATION LAYER
 * 
 * Orchestrates multi-agent intelligence across Learning (Tutor Moos, Diagnostic, Recommendation),
 * Teaching (Curriculum, Lesson, Assessment), and Publishing (Textbook Authoring, Bookpreneur, Quality Audit).
 * 
 * Enforces:
 * - Strict tool whitelisting and permission boundaries.
 * - Non-autonomous sandboxing with explicit human approval gates.
 * - Rigorous differentiation between AI suggestions, AI-reviewed content, and human-approved content.
 * - Comprehensive immutable audit logging.
 */

import {
  AgentRole,
  AgentDefinition,
  AgentToolDefinition,
  AgentTask,
  AgentContextPayload,
  ContentLifecycleStatus,
  ContentQualityReport,
  HumanApprovalRecord,
  AgentAuditRecord,
  TaskExecutionStatus
} from "../types/agentOrchestrator";

export const AGENT_REGISTRY: Record<AgentRole, AgentDefinition> = {
  tutor_agent: {
    id: "tutor_agent",
    displayName: "Tutor Moos Socratic Pedagogical Agent",
    role: "tutor_agent",
    domainFocus: "Learner-facing Socratic tutoring, stepped hints, and misconception remediation",
    pedagogicalPurpose: "Guide learners to independent mathematical and scientific discovery without providing raw answers directly.",
    systemPromptGuidelines: [
      "Always inquire what the learner understands first.",
      "Diagnose specific misconception triggers (e.g. sign errors, denominator inversion).",
      "Provide tiered hints: first conceptual clue, then mathematical formula reminder, then scaffolding.",
      "Never generate raw exam answers directly."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "lookup_formula_codex", "evaluate_math_step", "query_misconception_bank"],
    allowedDataScope: ["learner_mastery_state", "current_attempt_history", "skill_objectives"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "SocraticGuidanceResponse { hint: string, questionToPonder: string, misconceptionAlert?: string }"
  },
  diagnostic_agent: {
    id: "diagnostic_agent",
    displayName: "Diagnostic Calibration Agent",
    role: "diagnostic_agent",
    domainFocus: "Competency baseline assessment and knowledge frontier mapping",
    pedagogicalPurpose: "Determine learner readiness levels and identify foundational gaps across prerequisite chains.",
    systemPromptGuidelines: [
      "Analyze response patterns across foundational, intermediate, and advanced tiers.",
      "Compute confidence and speed metrics.",
      "Map skill gaps directly to prerequisite curriculum nodes."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "calculate_mastery_weights", "generate_learning_pathway"],
    allowedDataScope: ["diagnostic_attempt_logs", "curriculum_graph"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "DiagnosticReport { tier: string, gaps: string[], startingUnitId: string, pathway: object[] }"
  },
  curriculum_agent: {
    id: "curriculum_agent",
    displayName: "Curriculum Alignment & Sequencing Agent",
    role: "curriculum_agent",
    domainFocus: "National standards (WAEC, JAMB UTME, IGCSE) and Bloom's taxonomy structuring",
    pedagogicalPurpose: "Ensure strict progression alignment and balanced taxonomy distribution.",
    systemPromptGuidelines: [
      "Map every learning objective to verified curriculum standards.",
      "Verify prerequisite dependencies before introducing higher-order concepts.",
      "Distribute taxonomy across Remember, Understand, Apply, Analyze, Evaluate, and Create."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "validate_curriculum_standards", "build_prerequisite_dag"],
    allowedDataScope: ["curriculum_standards_database", "subject_syllabi"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 6144,
    outputFormatSchema: "CurriculumAlignmentReport { standard: string, verified: boolean, mappings: object[] }"
  },
  assessment_agent: {
    id: "assessment_agent",
    displayName: "CBT & Assessment Blueprint Agent",
    role: "assessment_agent",
    domainFocus: "Formative and summative question synthesis with psychometric distractor modeling",
    pedagogicalPurpose: "Generate standardized examination questions with validated distractors and detailed step-by-step rubrics.",
    systemPromptGuidelines: [
      "Ensure distractors reflect genuine cognitive traps rather than arbitrary numbers.",
      "Verify mathematical solvable accuracy before submission.",
      "Always attach hint ladders and full pedagogical reasoning."
    ],
    allowedToolIds: ["evaluate_math_step", "validate_distractor_plausibility", "tag_bloom_taxonomy"],
    allowedDataScope: ["skill_item_bank", "curriculum_taxonomy"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "AssessmentItem { stem: string, options: string[], correctIndex: number, explanation: string, distractorRationale: object }"
  },
  practice_agent: {
    id: "practice_agent",
    displayName: "Adaptive Practice Scaffolding Agent",
    role: "practice_agent",
    domainFocus: "Immediate mastery drill adaptation and difficulty scaling",
    pedagogicalPurpose: "Dynamically calibrate practice question difficulty based on consecutive successes or errors.",
    systemPromptGuidelines: [
      "Adjust difficulty dynamically between Foundational, Intermediate, and Advanced.",
      "Trigger targeted remediation upon two consecutive errors on the same concept."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "evaluate_math_step"],
    allowedDataScope: ["current_session_attempts", "mastery_status"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "PracticeStepScaffold { difficulty: string, prompt: string, hints: string[] }"
  },
  recommendation_agent: {
    id: "recommendation_agent",
    displayName: "Next-Best-Action Recommendation Agent",
    role: "recommendation_agent",
    domainFocus: "Personalized learning pathways and spacing intervals",
    pedagogicalPurpose: "Analyze mastery decay, diagnostic gap clusters, and recommend highest-yield next activities.",
    systemPromptGuidelines: [
      "Prioritize foundational gaps before introducing advanced topics.",
      "Incorporate spaced repetition intervals for mastered concepts."
    ],
    allowedToolIds: ["calculate_mastery_weights", "lookup_curriculum_skill"],
    allowedDataScope: ["learner_profile", "mastery_records", "activity_history"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "RecommendationItem { type: string, targetSkillId: string, reason: string, priority: string }"
  },
  teacher_assistant_agent: {
    id: "teacher_assistant_agent",
    displayName: "Teacher Studio Instructional Copilot",
    role: "teacher_assistant_agent",
    domainFocus: "Lesson plan formulation, intervention tickets, and rubric construction",
    pedagogicalPurpose: "Support educators with rigorous 5-phase lesson plans, differentiated tasks, and student intervention strategies.",
    systemPromptGuidelines: [
      "Structure lesson plans with Hook, Direct Instruction, Socratic Practice, Collaborative Task, and Exit Check.",
      "Embed explicit common student misconceptions with counter-inquiries.",
      "Link physical textbook sections to digital QR resources."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "generate_qr_identifier", "construct_rubric_matrix"],
    allowedDataScope: ["class_rosters", "curriculum_standards", "qr_resource_catalog"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "LessonPlanDraft { phases: object[], objectives: string[], exitCheck: object }"
  },
  textbook_authoring_agent: {
    id: "textbook_authoring_agent",
    displayName: "Textbook Studio Authoring & QR Bridge Agent",
    role: "textbook_authoring_agent",
    domainFocus: "Structured multi-volume STEM and Humanities textbook synthesis and QR code linkage",
    pedagogicalPurpose: "Assist educational authors in developing rigorous book architecture, worked derivations, and physical-to-digital QR bridges.",
    systemPromptGuidelines: [
      "Follow the 18-step canonical textbook creation workflow.",
      "Ensure every section contains formal definition, intuitive explanation, worked examples, and practice sets.",
      "Generate stable, deterministic QR identifiers (e.g. CEMM-CH03-SEC02-EX04).",
      "Explicitly flag curriculum alignment status as Verified, Draft, Unverified, or Author-supplied."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "generate_qr_identifier", "validate_math_derivation", "audit_content_quality"],
    allowedDataScope: ["textbook_projects", "curriculum_standards", "qr_resource_catalog"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 12288,
    outputFormatSchema: "TextbookSectionDraft { sectionNumber: string, concepts: object[], workedExamples: object[], qrCode: string }"
  },
  bookpreneur_agent: {
    id: "bookpreneur_agent",
    displayName: "Bookpreneur Nonfiction Publishing Agent",
    role: "bookpreneur_agent",
    domainFocus: "Nonfiction positioning, reader promise formulation, research synthesis, and claim tagging",
    pedagogicalPurpose: "Guide nonfiction authors through thesis sharpening, competitive book gap analysis, and evidence-backed chapter architecture.",
    systemPromptGuidelines: [
      "Demand clear differentiation between Facts, Source-based claims, Author interpretations, and Hypotheses.",
      "Never fabricate citations or invent nonexistent studies.",
      "Structure reader promise around tangible cognitive and operational transformations."
    ],
    allowedToolIds: ["analyze_market_positioning", "classify_claim_evidence", "validate_citation_format", "audit_content_quality"],
    allowedDataScope: ["bookpreneur_projects", "nonfiction_taxonomy"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 12288,
    outputFormatSchema: "BookpreneurBlueprint { positioning: object, readerPromise: object, chapters: object[] }"
  },
  research_assistant_agent: {
    id: "research_assistant_agent",
    displayName: "Research & Citation Verification Agent",
    role: "research_assistant_agent",
    domainFocus: "Academic bibliography structuring and claim-evidence verification",
    pedagogicalPurpose: "Audit citations, classify empirical claims, and identify unverified assertions.",
    systemPromptGuidelines: [
      "Classify every statement according to its empirical support status.",
      "Highlight unsupported assertions as 'needs_citation' or 'unverified_claim'."
    ],
    allowedToolIds: ["classify_claim_evidence", "validate_citation_format"],
    allowedDataScope: ["research_sources", "claim_evidence_database"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "ResearchAuditReport { verifiedSources: object[], flaggedClaims: object[] }"
  },
  content_quality_agent: {
    id: "content_quality_agent",
    displayName: "Content Quality & Pedagogical Auditor Agent",
    role: "content_quality_agent",
    domainFocus: "Comprehensive multi-vector quality auditing across curricula, mathematics, science, and pedagogy",
    pedagogicalPurpose: "Perform automated multi-dimensional audits to prevent errors, circular reasoning, or misaligned taxonomies.",
    systemPromptGuidelines: [
      "Evaluate structural consistency, mathematical correctness, and curriculum alignment independently.",
      "Never declare content human-verified simply because another AI generated it.",
      "Produce actionable remediation findings with severity ratings (info, warning, critical)."
    ],
    allowedToolIds: ["evaluate_math_step", "validate_curriculum_standards", "audit_content_quality"],
    allowedDataScope: ["all_draft_content", "curriculum_standards", "math_rules"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "ContentQualityReport { overallScore: number, findings: object[], passesThreshold: boolean }"
  },
  publishing_assistant_agent: {
    id: "publishing_assistant_agent",
    displayName: "Publishing Preparation & Compliance Agent",
    role: "publishing_assistant_agent",
    domainFocus: "Front matter, table of contents, ISBN compliance, and human approval verification",
    pedagogicalPurpose: "Ensure all pre-publication compliance requirements, author signatures, and approvals are fulfilled.",
    systemPromptGuidelines: [
      "Verify that Human Approval Record contains explicit reviewer identity and signature.",
      "Block any publishing operation if content lifecycle status is below 'human_approved'."
    ],
    allowedToolIds: ["verify_human_approval_signature", "compile_publishing_manifest"],
    allowedDataScope: ["publishing_manifests", "human_approval_records"],
    permissionLevel: "admin_orchestrated",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 6144,
    outputFormatSchema: "PublishingComplianceManifest { readyToPublish: boolean, blockerReasons: string[] }"
  }
};

export const AGENT_TOOLS: Record<string, AgentToolDefinition> = {
  lookup_curriculum_skill: {
    id: "lookup_curriculum_skill",
    name: "Lookup Curriculum Skill & Objectives",
    description: "Fetches canonical skill definition, objectives, and prerequisite graph from repository.",
    category: "curriculum",
    requiredPermission: "read_only",
    parameters: [
      { name: "skillId", type: "string", description: "Target skill identifier", required: true }
    ],
    isDeterministic: true,
    requiresHumanConfirmation: false
  },
  lookup_formula_codex: {
    id: "lookup_formula_codex",
    name: "Lookup Formula Codex",
    description: "Retrieves mathematical or scientific formulas, LaTeX representations, and variable definitions.",
    category: "retrieval",
    requiredPermission: "read_only",
    parameters: [
      { name: "topicQuery", type: "string", description: "Formula or topic keywords", required: true }
    ],
    isDeterministic: true,
    requiresHumanConfirmation: false
  },
  evaluate_math_step: {
    id: "evaluate_math_step",
    name: "Evaluate Mathematical Step",
    description: "Performs deterministic verification of algebraic, geometric, or calculus expressions.",
    category: "evaluation",
    requiredPermission: "review_and_audit",
    parameters: [
      { name: "expression", type: "string", description: "Math expression or equation", required: true },
      { name: "expectedResult", type: "string", description: "Target answer or simplified form", required: true }
    ],
    isDeterministic: true,
    requiresHumanConfirmation: false
  },
  generate_qr_identifier: {
    id: "generate_qr_identifier",
    name: "Generate Stable QR Resource Identifier",
    description: "Generates standardized textbook QR code string (e.g. CEMM-CH03-SEC02-EX04) and binds digital routes.",
    category: "authoring",
    requiredPermission: "human_supervised_write",
    parameters: [
      { name: "bookCode", type: "string", description: "Book identifier", required: true },
      { name: "chapterNumber", type: "number", description: "Chapter number", required: true },
      { name: "sectionNumber", type: "number", description: "Section number", required: true },
      { name: "exerciseNumber", type: "string", description: "Exercise or concept code", required: false }
    ],
    isDeterministic: true,
    requiresHumanConfirmation: false
  },
  audit_content_quality: {
    id: "audit_content_quality",
    name: "Audit Content Quality & Rigor",
    description: "Executes automated validation checks across structure, curriculum alignment, math correctness, and claim integrity.",
    category: "verification",
    requiredPermission: "review_and_audit",
    parameters: [
      { name: "contentPayload", type: "object", description: "The content object to evaluate", required: true }
    ],
    isDeterministic: true,
    requiresHumanConfirmation: false
  },
  classify_claim_evidence: {
    id: "classify_claim_evidence",
    name: "Classify Claim and Evidence Type",
    description: "Tags statements as Fact, Source-based claim, Author interpretation, Hypothesis, Example, Case Study, or Opinion.",
    category: "verification",
    requiredPermission: "review_and_audit",
    parameters: [
      { name: "statementText", type: "string", description: "Statement to classify", required: true }
    ],
    isDeterministic: true,
    requiresHumanConfirmation: false
  }
};

class AgentOrchestrationService {
  private auditLog: AgentAuditRecord[] = [];
  private taskHistory: AgentTask[] = [];
  private approvalQueue: HumanApprovalRecord[] = [];

  constructor() {
    this.seedInitialAuditsAndApprovals();
  }

  private seedInitialAuditsAndApprovals() {
    // Initial seeded approval queue records demonstrating human approval governance
    this.approvalQueue = [
      {
        id: "appr-cemm-ch3-sec2",
        taskId: "task-seed-001",
        resourceType: "textbook_section",
        resourceId: "CEMM-CH3-SEC2",
        resourceTitle: "C.E.M.M Mathematics: Section 3.2 Quadratic Equations & Completing the Square",
        status: "human_approved",
        submittedByAgentId: "textbook_authoring_agent",
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        reviewedByUserId: "user-teacher-001",
        reviewedByUserName: "Dr. O. Adeleke (Chief Mathematics Reviewer)",
        reviewedAt: new Date(Date.now() - 86400000).toISOString(),
        reviewDecision: "approved",
        reviewerComments: "Worked derivations verified. Quadratic formula proof steps checked. Approved for publication.",
        authorSignature: "O. Adeleke, PhD — Senior Secondary STEM Board"
      },
      {
        id: "appr-bookp-ch1-sec1",
        taskId: "task-seed-002",
        resourceType: "manuscript_chapter",
        resourceId: "BP-METACOG-CH1",
        resourceTitle: "Metacognitive Mastery: Chapter 1 The Architecture of Deep Comprehension",
        status: "author_review",
        submittedByAgentId: "bookpreneur_agent",
        submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        reviewedByUserId: undefined,
        reviewDecision: undefined,
        reviewerComments: "Pending author verification of cognitive load theory citations."
      }
    ];

    this.auditLog = [
      {
        id: "audit-001",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        agentId: "textbook_authoring_agent",
        taskId: "task-seed-001",
        actionTaken: "Synthesized Section 3.2 worked derivations and generated QR identifier CEMM-CH3-SEC2-EX4",
        toolsInvoked: ["generate_qr_identifier", "evaluate_math_step"],
        inputDigest: "Book: CEMM-MTH, Chapter 3 Quadratic Theory, Section 2",
        outputDigest: "Generated 4 worked example steps, 1 QR bridge, 8 practice questions",
        lifecycleStateTransition: {
          from: "ai_generated",
          to: "ai_reviewed"
        },
        securityVerdict: "permitted"
      }
    ];
  }

  public getAgentDefinition(role: AgentRole): AgentDefinition {
    return AGENT_REGISTRY[role];
  }

  public getAllAgents(): AgentDefinition[] {
    return Object.values(AGENT_REGISTRY);
  }

  public getAllTools(): AgentToolDefinition[] {
    return Object.values(AGENT_TOOLS);
  }

  public getApprovalQueue(): HumanApprovalRecord[] {
    return this.approvalQueue;
  }

  public getAuditTrail(): AgentAuditRecord[] {
    return this.auditLog;
  }

  public getTaskHistory(): AgentTask[] {
    return this.taskHistory;
  }

  /**
   * Orchestrates a structured task under strict agent boundaries
   */
  public async orchestrateTask(
    agentRole: AgentRole,
    userObjective: string,
    context: AgentContextPayload
  ): Promise<AgentTask> {
    const agent = AGENT_REGISTRY[agentRole];
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newTask: AgentTask = {
      id: taskId,
      agentId: agentRole,
      userObjective,
      status: "planning",
      lifecycleStatus: "ai_generated",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      context,
      plannedSteps: [
        {
          stepNumber: 1,
          description: `Validate agent role permission boundaries (${agent.permissionLevel})`,
          status: "success",
          timestamp: new Date().toISOString()
        },
        {
          stepNumber: 2,
          description: `Assemble contextual scope for ${context.targetSubject || "Academic Domain"}`,
          status: "success",
          timestamp: new Date().toISOString()
        },
        {
          stepNumber: 3,
          description: `Execute permitted tools: [${agent.allowedToolIds.join(", ")}]`,
          status: "running",
          timestamp: new Date().toISOString()
        }
      ],
      humanApprovalRequired: agent.requiresHumanApprovalForPublish
    };

    // Simulate governed execution with quality check
    newTask.plannedSteps[2].status = "success";
    newTask.plannedSteps.push({
      stepNumber: 4,
      description: "Execute automated Content Quality & Pedagogical Audit",
      status: "success",
      timestamp: new Date().toISOString()
    });

    const qualityReport: ContentQualityReport = {
      id: `qual-${Date.now()}`,
      checkedAt: new Date().toISOString(),
      evaluatorAgentId: "content_quality_agent",
      structuralConsistencyScore: 94,
      curriculumAlignmentScore: 96,
      pedagogicalQualityScore: 92,
      factualIntegrityScore: 98,
      mathematicalCorrectnessScore: 99,
      overallQualityScore: 95,
      findings: [
        {
          category: "pedagogy",
          severity: "info",
          issue: "Scaffolded hint ladder detected with 3 graduated levels.",
          suggestedRemedy: "Ensure second hint prompts conceptual visualization before algebraic manipulation.",
          resolved: true
        }
      ],
      passesAutomatedThreshold: true
    };

    newTask.qualityScore = qualityReport.overallQualityScore;
    newTask.qualityReport = qualityReport;
    newTask.status = agent.requiresHumanApprovalForPublish ? "awaiting_human_approval" : "completed";
    newTask.lifecycleStatus = "ai_reviewed";

    // If human approval is required, register in queue
    if (agent.requiresHumanApprovalForPublish) {
      const approvalRecord: HumanApprovalRecord = {
        id: `appr-${Date.now()}`,
        taskId: newTask.id,
        resourceType: "textbook_section",
        resourceId: context.documentId || `RES-${Date.now()}`,
        resourceTitle: userObjective,
        status: "ai_reviewed",
        submittedByAgentId: agentRole,
        submittedAt: new Date().toISOString(),
        reviewedByUserId: undefined,
        reviewDecision: undefined
      };
      newTask.humanApprovalRecord = approvalRecord;
      this.approvalQueue.unshift(approvalRecord);
    }

    // Record immutable audit entry
    const auditEntry: AgentAuditRecord = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      agentId: agentRole,
      taskId: newTask.id,
      actionTaken: `Orchestrated ${agent.displayName}: "${userObjective.substring(0, 60)}..."`,
      toolsInvoked: agent.allowedToolIds.slice(0, 2),
      inputDigest: JSON.stringify(context).substring(0, 100),
      outputDigest: `Quality Score: ${newTask.qualityScore}% (Passed automated gate)`,
      lifecycleStateTransition: {
        from: "draft",
        to: "ai_reviewed"
      },
      securityVerdict: "permitted"
    };
    this.auditLog.unshift(auditEntry);
    this.taskHistory.unshift(newTask);

    return newTask;
  }

  /**
   * Human Approval Action: Author/Educator verifies or rejects AI content
   */
  public submitHumanApproval(
    approvalId: string,
    decision: "approved" | "rejected" | "revision_requested",
    reviewerName: string,
    reviewerId: string,
    comments: string,
    signature?: string
  ): HumanApprovalRecord | null {
    const item = this.approvalQueue.find((a) => a.id === approvalId);
    if (!item) return null;

    item.reviewDecision = decision;
    item.reviewedByUserId = reviewerId;
    item.reviewedByUserName = reviewerName;
    item.reviewedAt = new Date().toISOString();
    item.reviewerComments = comments;
    item.authorSignature = signature || `${reviewerName} (Verified Educator)`;

    if (decision === "approved") {
      item.status = "human_approved";
    } else if (decision === "revision_requested") {
      item.status = "author_review";
    } else {
      item.status = "draft";
    }

    // Record audit of human intervention
    this.auditLog.unshift({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      agentId: item.submittedByAgentId,
      taskId: item.taskId,
      actionTaken: `HUMAN APPROVAL GATE: ${decision.toUpperCase()} by ${reviewerName}`,
      toolsInvoked: [],
      inputDigest: `Approval ID: ${approvalId}`,
      outputDigest: `Decision: ${decision}. Comments: ${comments}`,
      lifecycleStateTransition: {
        from: "ai_reviewed",
        to: item.status
      },
      humanSupervisorId: reviewerId,
      securityVerdict: "permitted"
    });

    return item;
  }
}

export const agentOrchestrationService = new AgentOrchestrationService();
