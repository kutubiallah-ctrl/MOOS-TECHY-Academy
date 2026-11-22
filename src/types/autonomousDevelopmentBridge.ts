/**
 * MOOS TECHY ACADEMY — AUTONOMOUS DEVELOPMENT BRIDGE DATA TYPES
 * 
 * Defines formal data contracts for:
 * 1. AI Studio Feedback Return Envelopes
 * 2. Owner Escalation & Approval Protocols
 * 3. Antigravity Audit & Runtime Capabilities
 * 4. External Reasoning Service Bridges (ChatGPT / OpenAI Architect)
 * 5. Autonomous Live Fire Scenarios
 */

import { TaskRiskLevel, GuardianAgentRole, TaskLifecycleStatus } from "./developmentGuardian";

export type EvidenceOrigin =
  | "AI_STUDIO_CLAIM"
  | "AUTOMATED_EVIDENCE"
  | "RUNTIME_EVIDENCE"
  | "HUMAN_VERIFICATION"
  | "SIMULATED_MODEL_RESPONSE";

export interface ArchitecturalImplementationTask {
  title: string;
  agentRole: GuardianAgentRole;
  description: string;
  targetFiles?: string[];
}

export interface ArchitecturalResponseContract {
  taskId: string;
  assessment: string;
  architecturalFindings: string[];
  recommendedAction: string;
  implementationTasks: ArchitecturalImplementationTask[];
  riskLevel: TaskRiskLevel;
  approvalRequired: boolean;
  verificationRequirements: string[];
  unknowns: string[];
  limitations: string[];
  confidence: number;
  affectedSystems?: string[];
  proposedFiles?: string[];
  regressionRisks?: string[];
  rollbackRequirements?: string[];
  evidenceRequirements?: string[];
  specialistAgentsRequired?: GuardianAgentRole[];
  origin: "LIVE_OPENAI_RESPONSE" | "SIMULATED_MODEL_RESPONSE";
}

export interface OpenAiAdapterExecutionResult {
  success: boolean;
  status:
    | "SUCCESS"
    | "NOT_PROVISIONED"
    | "AUTHENTICATION_FAILED"
    | "TIMEOUT"
    | "RATE_LIMITED"
    | "MALFORMED_RESPONSE"
    | "PROMPT_INJECTION_BLOCKED"
    | "FALSE_EVIDENCE_REJECTED"
    | "PROVIDER_ERROR";
  response?: ArchitecturalResponseContract;
  redactedError?: string;
  retryCount: number;
  latencyMs: number;
  evidenceOrigin: EvidenceOrigin;
}

export interface DevelopmentFeedbackEnvelope {
  taskId: string;
  phase: string;
  timestamp: string;
  projectState: {
    branchOrCommit?: string;
    nodeVersion: string;
    framework: string;
    database: string;
  };
  changedFiles: string[];
  buildStatus: "SUCCESS" | "FAILED" | "SKIPPED";
  typecheckStatus: "SUCCESS" | "FAILED" | "SKIPPED";
  lintStatus: "SUCCESS" | "FAILED" | "SKIPPED";
  testStatus: {
    totalSuites: number;
    passedSuites: number;
    failedSuites: number;
    durationSeconds: number;
  };
  runtimeStatus: "OPERATIONAL" | "DEGRADED" | "DOWN";
  screenshots: string[];
  logs: string[];
  qualityFindings: Array<{
    ruleId: string;
    severity: "INFO" | "WARNING" | "CRITICAL";
    description: string;
    remediation?: string;
  }>;
  unknowns: string[];
  limitations: string[];
  recommendations: string[];
  approvalRequired: boolean;
  confidence: number; // 0.0 to 1.0
  evidenceReferences: string[];
  evidenceOrigin: EvidenceOrigin;
}

export interface OwnerEscalationRequest {
  id: string;
  taskId: string;
  reason: string;
  riskLevel: TaskRiskLevel;
  affectedSystems: string[];
  proposedAction: string;
  evidence: Array<{
    title: string;
    origin: EvidenceOrigin;
    summary: string;
  }>;
  rollbackPlan: string;
  expiration: string; // ISO Date
  requiredAuthorization: "OWNER_SIGNATURE_REQUIRED" | "ADMIN_CONFIRMATION" | "TWO_MAN_RULE";
  status: "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";
  authorizedBy?: string;
  authorizedAt?: string;
  authorizationToken?: string;
}

export type ChatGPTBridgeStatus = "NOT_CONNECTED" | "CONNECTED" | "CONFIGURATION_PENDING";

export interface ChatGPTBridgeAudit {
  status: ChatGPTBridgeStatus;
  currentCapability: string;
  requiredInfrastructure: string[];
  securityRequirements: string[];
  implementationPath: string;
  verificationMethod: string;
  forbiddenApproaches: string[];
}

export type CapabilityMaturityLevel =
  | "CAPABILITY"
  | "CONFIGURATION"
  | "IMPLEMENTATION"
  | "RUNTIME_VERIFIED_CAPABILITY";

export interface AntigravityAuditItem {
  id: number;
  question: string;
  maturity: CapabilityMaturityLevel;
  status: "SUPPORTED" | "PARTIALLY_SUPPORTED" | "REQUIRES_EXTERNAL_INFRASTRUCTURE" | "RESTRICTED";
  finding: string;
  technicalBoundary: string;
  evidenceReference: string;
}

export interface AntigravityAuditReport {
  timestamp: string;
  modelIdentifier: string;
  environmentType: "sandboxed_linux_remote" | "local_container";
  items: AntigravityAuditItem[];
  overallAssessment: string;
}

export interface NotificationChannelStatus {
  channel: "WHATSAPP" | "EMAIL" | "INTERNAL_LEDGER";
  status: "ACTIVE" | "SPECIFICATION_ONLY" | "UNAVAILABLE";
  supportedProviderArchitecture?: string;
  securityRequirements: string[];
  notes: string;
}

export interface AutonomousLiveFireScenario {
  scenarioId: string;
  code: "SCENARIO_A" | "SCENARIO_B" | "SCENARIO_C" | "SCENARIO_D" | "SCENARIO_E" | "SCENARIO_F" | "SCENARIO_G" | "SCENARIO_H" | "SCENARIO_I" | "SCENARIO_J";
  name: string;
  targetDomain: string;
  simulatedFault: string;
  detectedFault: boolean;
  classification: string;
  automaticRoutingAgent: GuardianAgentRole;
  routingReason: string;
  investigationOutcome: string;
  proposedAction: string;
  permissionCheckPassed: boolean;
  humanApprovalRequired: boolean;
  verificationStatus: "VERIFIED" | "ESCALATED" | "BLOCKED" | "REJECTED";
  evidenceOrigin: EvidenceOrigin;
  confidenceScore: number;
  finalDisposition: string;
}
