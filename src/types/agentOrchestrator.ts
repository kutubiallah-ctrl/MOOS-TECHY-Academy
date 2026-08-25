/**
 * MOOS TECHY ACADEMY — AGENTIC AI & ORCHESTRATION ARCHITECTURE
 * 
 * Defines explicit boundaries for Agent Identity, Purpose, Permitted Tools,
 * Context Constraints, Permission Levels, Human Approval Gates, and Audit Trails.
 * 
 * Strict Principle:
 * The system rigorously distinguishes between AI suggestions, AI generated drafts,
 * AI reviewed content, Author review, Human approved content, and Published status.
 * Content is NEVER represented as human-approved without explicit human validation.
 */

export type AgentRole =
  | "tutor_agent"
  | "diagnostic_agent"
  | "curriculum_agent"
  | "assessment_agent"
  | "practice_agent"
  | "recommendation_agent"
  | "teacher_assistant_agent"
  | "textbook_authoring_agent"
  | "bookpreneur_agent"
  | "research_assistant_agent"
  | "content_quality_agent"
  | "publishing_assistant_agent";

export type AgentPermissionLevel =
  | "read_only"
  | "suggest_draft"
  | "generate_sandboxed"
  | "review_and_audit"
  | "human_supervised_write"
  | "admin_orchestrated";

export type ContentLifecycleStatus =
  | "draft"
  | "ai_generated"
  | "ai_reviewed"
  | "author_review"
  | "human_approved"
  | "published";

export type ClaimClassification =
  | "fact"
  | "source_based_claim"
  | "author_interpretation"
  | "hypothesis"
  | "example"
  | "case_study"
  | "opinion"
  | "ai_suggestion";

export type SourceVerificationStatus =
  | "verified_source"
  | "preliminary"
  | "needs_citation"
  | "unverified_claim"
  | "peer_reviewed";

export interface AgentToolParameter {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object";
  description: string;
  required: boolean;
  enum?: string[];
}

export interface AgentToolDefinition {
  id: string;
  name: string;
  description: string;
  category: "retrieval" | "pedagogy" | "curriculum" | "evaluation" | "authoring" | "verification";
  requiredPermission: AgentPermissionLevel;
  parameters: AgentToolParameter[];
  isDeterministic: boolean;
  requiresHumanConfirmation: boolean;
}

export interface AgentDefinition {
  id: AgentRole;
  displayName: string;
  role: AgentRole;
  domainFocus: string;
  pedagogicalPurpose: string;
  systemPromptGuidelines: string[];
  allowedToolIds: string[];
  allowedDataScope: string[];
  permissionLevel: AgentPermissionLevel;
  requiresHumanApprovalForPublish: boolean;
  maxContextTokens: number;
  outputFormatSchema: string;
}

export interface AgentContextPayload {
  userId: string;
  userRole: "learner" | "teacher" | "author" | "bookpreneur" | "content_manager" | "admin";
  targetSubject?: string;
  targetLevel?: string;
  targetSkillId?: string;
  currentMasteryState?: string;
  recentAttemptsSummary?: string;
  misconceptionsDetected?: string[];
  curriculumStandard?: string;
  documentId?: string;
  bookId?: string;
  chapterId?: string;
  additionalParameters?: Record<string, any>;
}

export type TaskExecutionStatus =
  | "queued"
  | "planning"
  | "executing_tools"
  | "validating_quality"
  | "awaiting_human_approval"
  | "completed"
  | "rejected"
  | "failed";

export interface AgentTaskStep {
  stepNumber: number;
  description: string;
  toolId?: string;
  toolInput?: Record<string, any>;
  toolOutput?: Record<string, any>;
  status: "pending" | "running" | "success" | "warning" | "error";
  executionNotes?: string;
  timestamp: string;
}

export interface AgentTask {
  id: string;
  agentId: AgentRole;
  userObjective: string;
  status: TaskExecutionStatus;
  lifecycleStatus: ContentLifecycleStatus;
  createdAt: string;
  updatedAt: string;
  context: AgentContextPayload;
  plannedSteps: AgentTaskStep[];
  outputContent?: string;
  structuredOutput?: Record<string, any>;
  qualityScore?: number;
  qualityReport?: ContentQualityReport;
  humanApprovalRequired: boolean;
  humanApprovalRecord?: HumanApprovalRecord;
  executionError?: string;
}

export interface ContentQualityReport {
  id: string;
  checkedAt: string;
  evaluatorAgentId: AgentRole;
  structuralConsistencyScore: number; // 0-100
  curriculumAlignmentScore: number; // 0-100
  pedagogicalQualityScore: number; // 0-100
  factualIntegrityScore: number; // 0-100
  mathematicalCorrectnessScore: number; // 0-100
  overallQualityScore: number; // 0-100
  findings: Array<{
    category: "structure" | "curriculum" | "math_scientific" | "terminology" | "pedagogy" | "claims";
    severity: "info" | "warning" | "critical";
    issue: string;
    suggestedRemedy: string;
    resolved: boolean;
  }>;
  passesAutomatedThreshold: boolean;
}

export interface HumanApprovalRecord {
  id: string;
  taskId: string;
  resourceType: "textbook_section" | "assessment_item" | "lesson_plan" | "manuscript_chapter" | "curriculum_node" | "qr_companion";
  resourceId: string;
  resourceTitle: string;
  status: ContentLifecycleStatus;
  submittedByAgentId: AgentRole;
  submittedAt: string;
  reviewedByUserId?: string;
  reviewedByUserName?: string;
  reviewedAt?: string;
  reviewDecision?: "approved" | "rejected" | "revision_requested";
  reviewerComments?: string;
  authorSignature?: string;
}

export interface AgentAuditRecord {
  id: string;
  timestamp: string;
  agentId: AgentRole;
  taskId: string;
  actionTaken: string;
  toolsInvoked: string[];
  inputDigest: string;
  outputDigest: string;
  lifecycleStateTransition: {
    from: ContentLifecycleStatus;
    to: ContentLifecycleStatus;
  };
  humanSupervisorId?: string;
  securityVerdict: "permitted" | "flagged" | "blocked";
}
