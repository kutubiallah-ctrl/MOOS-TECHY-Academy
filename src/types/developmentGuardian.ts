/**
 * MOOS TECHY ACADEMY — DEVELOPMENT GUARDIAN DATA TYPES
 * 
 * Formal data models for internal development operations, requirement memory,
 * agent registry, quality gates, drift detection, and human approval governance.
 */

export type VerificationStatus =
  | "IMPLEMENTED"
  | "TESTED"
  | "RUNTIME_VERIFIED"
  | "PEDAGOGICALLY_VERIFIED"
  | "CONTENT_SATURATION_VERIFIED"
  | "SECURITY_VERIFIED"
  | "PARTIALLY_VERIFIED"
  | "UNVERIFIED"
  | "BROKEN"
  | "UNKNOWN";

export type TaskLifecycleStatus =
  | "DISCOVERED"
  | "QUEUED"
  | "ANALYSING"
  | "IMPLEMENTING"
  | "BUILDING"
  | "TESTING"
  | "RUNTIME_VERIFYING"
  | "AUDITING"
  | "AWAITING_APPROVAL"
  | "COMPLETED"
  | "BLOCKED"
  | "FAILED"
  | "REQUIRES_REVIEW";

export type TaskPriority = "low" | "medium" | "high" | "critical";

export type TaskRiskLevel = "low" | "medium" | "high" | "critical";

export type TaskCategory =
  | "architecture"
  | "implementation"
  | "regression"
  | "pedagogical"
  | "content_saturation"
  | "security"
  | "firebase"
  | "smartboard"
  | "mathematical_speech"
  | "esl"
  | "multimodal"
  | "ai_governance"
  | "devops"
  | "autonomous_bridge"
  | "interactive_engine"
  | "curriculum_expansion"
  | "external_integration";

export type GuardianAgentRole =
  | "development_guardian_agent"
  | "architecture_agent"
  | "implementation_agent"
  | "test_agent"
  | "runtime_reality_agent"
  | "learner_experience_agent"
  | "pedagogical_audit_agent"
  | "content_saturation_agent"
  | "regression_agent"
  | "security_agent"
  | "firebase_data_integrity_agent"
  | "ai_governance_agent"
  | "multimodal_agent"
  | "reporting_agent"
  | "autonomous_development_bridge_agent"
  | "antigravity_integration_agent"
  | "external_integration_security_agent"
  | "interactive_subject_engine_agent"
  | "curriculum_architecture_agent"
  | "runtime_evidence_agent";

export interface SpecialistAgentDefinition {
  agentId: string;
  role: GuardianAgentRole;
  displayName: string;
  domain: string;
  allowedTools: string[];
  allowedDataScopes: string[];
  allowedActions: string[];
  forbiddenActions: string[];
  verificationResponsibilities: string[];
  escalationRules: string[];
}

export type EvidenceType =
  | "test_result"
  | "runtime_result"
  | "file_reference"
  | "service_result"
  | "audit_record"
  | "build_result"
  | "quality_gate_result"
  | "regression_result"
  | "security_result"
  | "learner_scenario_result"
  | "pedagogical_audit"
  | "content_saturation_audit";

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  timestamp: string;
  agentId: GuardianAgentRole;
  summary: string;
  details?: any;
  verified: boolean;
}

export interface DevelopmentTask {
  taskId: string;
  title: string;
  description: string;
  sourceRequirement: string;
  priority: TaskPriority;
  category: TaskCategory;
  affectedSystems: string[];
  dependencies: string[];
  riskLevel: TaskRiskLevel;
  status: TaskLifecycleStatus;
  createdAt: string;
  updatedAt: string;
  assignedAgent: GuardianAgentRole;
  requiredVerification: VerificationStatus[];
  acceptanceCriteria: string[];
  regressionRisks: string[];
  evidence: EvidenceItem[];
  humanApprovalRequired: boolean;
  humanApprovalStatus: "not_required" | "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  result?: any;
  remainingIssues?: string[];
  retryCount: number;
  maxRetries: number;
}

export interface ProjectRequirement {
  requirementId: string;
  title: string;
  description: string;
  systemArea: string;
  priority: TaskPriority;
  status: VerificationStatus;
  verificationCriteria: string[];
  lastVerified: string;
  evidence: EvidenceItem[];
  relatedTasks: string[];
  regressionRisk: TaskRiskLevel;
}

export interface RequirementDriftFinding {
  id: string;
  timestamp: string;
  requirementId: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  conflictingChange: string;
  mitigation: string;
  resolved: boolean;
}

export interface QualityGateFinding {
  code:
    | "SUBJECT_MISMATCH"
    | "TOPIC_MISMATCH"
    | "COURSE_MISMATCH"
    | "UNIT_MISMATCH"
    | "CURRICULUM_MISMATCH"
    | "STALE_SESSION_STATE"
    | "STALE_SCRIPT_STATE"
    | "STALE_BOARD_STATE"
    | "INSTRUCTIONAL_PHASE_MISMATCH"
    | "BOARD_NARRATION_DESYNCHRONIZATION"
    | "INAPPROPRIATE_TEMPLATE"
    | "GENERIC_CHECKPOINT"
    | "GENERIC_EXAMPLE"
    | "INSUFFICIENT_CONTENT_DEPTH"
    | "REPETITIVE_SCRIPT"
    | "ARTIFICIAL_DURATION_PADDING"
    | "MISSING_BEGINNER_FOUNDATION"
    | "MISSING_GUIDED_PRACTICE"
    | "MISSING_APPLICATION"
    | "MISSING_ADVANCED_CHALLENGE"
    | "MISSING_MASTERY"
    | "SUBJECT_INAPPROPRIATE_INTERACTION"
    | "OWNERSHIP_BOUNDARY_BYPASS"
    | "AI_GOVERNANCE_BYPASS"
    | "AUDIO_DATA_HOARDING"
    | "UNAUTHORIZED_PRODUCTION_DEPLOYMENT"
    | "DESTRUCTIVE_DATABASE_MUTATION"
    | "UNAUTHORIZED_CURRICULUM_DELETION";
  message: string;
  severity: "warning" | "error" | "critical";
  context?: any;
}

export interface GuardianStateReport {
  currentObjective: string;
  currentPhase: string;
  activeTaskId: string | null;
  tasksCount: {
    total: number;
    completed: number;
    inProgress: number;
    awaitingApproval: number;
    blocked: number;
    failed: number;
  };
  knownDefects: string[];
  knownRisks: string[];
  failedTests: string[];
  securityFindings: string[];
  regressionFindings: string[];
  contentGaps: string[];
  pendingApprovals: DevelopmentTask[];
  requirementsSummary: {
    total: number;
    verified: number;
    partiallyVerified: number;
    unverified: number;
    atRisk: number;
  };
  canonicalSuitesVerified: number;
  agentReadinessLevel: number;
  nextRecommendedTask: DevelopmentTask | null;
}
