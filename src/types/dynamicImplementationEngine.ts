/**
 * MOOS TECHY ACADEMY — DYNAMIC REPOSITORY IMPLEMENTATION ENGINE TYPES
 * 
 * TASK ID: MOOS-6.5H-DETERMINISTIC-GOVERNANCE-CONSOLIDATION-AND-IMPLEMENTATION-REALITY
 * 
 * Formally defines:
 * 1. Controlled repository inspection and search contracts
 * 2. Unified diff generation and atomic file mutation contracts
 * 3. Mutation safety boundaries (workspace isolation, line caps, protected file rules)
 * 4. Machine evidence contracts for real file modifications and rollbacks
 * 5. Multi-attempt self-correction traces with independent invariant verification
 */

import { GuardianAgentRole, TaskRiskLevel } from "./developmentGuardian";
import { EvidenceOrigin } from "./autonomousDevelopmentBridge";

export interface FileInspectionResult {
  filePath: string;
  absolutePath: string;
  exists: boolean;
  sizeBytes: number;
  lineCount: number;
  sha256Hash: string;
  content: string;
  isProtected: boolean;
}

export interface ProposedFileMutation {
  mutationId: string;
  taskId: string;
  targetFile: string;
  originalHash: string;
  proposedContent: string;
  diffPatch: string;
  rationale: string;
  authorAgent: GuardianAgentRole;
  changedLinesCount: number;
  riskLevel: TaskRiskLevel;
}

export interface MutationSafetyResult {
  allowed: boolean;
  isProtectedFile: boolean;
  requiresOwnerApproval: boolean;
  violations: string[];
  reasons: string[];
}

export interface MutationExecutionRecord {
  mutationId: string;
  taskId: string;
  targetFile: string;
  preChangeHash: string;
  postChangeHash: string;
  diffSummary: {
    linesAdded: number;
    linesRemoved: number;
    totalChangedLines: number;
  };
  appliedAt: string;
  authorAgent: GuardianAgentRole;
  buildResult: "PASS" | "FAIL" | "SKIPPED";
  testResult: "PASS" | "FAIL" | "SKIPPED";
  runtimeResult: "PASS" | "FAIL" | "SKIPPED";
  finalDisposition:
    | "APPLIED_AND_RUNTIME_VERIFIED"
    | "ROLLED_BACK_DUE_TO_VERIFICATION_FAILURE"
    | "REJECTED_BY_SAFETY_GUARD"
    | "HELD_FOR_OWNER_APPROVAL";
  rollbackHash?: string;
  evidenceOrigin: EvidenceOrigin;
}

export interface RollbackExecutionRecord {
  rollbackId: string;
  mutationId: string;
  targetFile: string;
  preChangeHash: string;
  failedChangeHash: string;
  postRollbackHash: string;
  restored: boolean;
  restoredAt: string;
  reason: string;
}

export interface DynamicSelfCorrectionAttempt {
  attemptNumber: number;
  proposedHash: string;
  diffSummary: string;
  testPassed: boolean;
  testOutput: string;
  failureReason?: string;
  actionTaken: string;
}

export interface DynamicSelfCorrectionTrace {
  taskId: string;
  targetFile: string;
  originalHash: string;
  attempts: DynamicSelfCorrectionAttempt[];
  finalHash: string;
  totalAttempts: number;
  maxRetries: number;
  finalStatus: "SELF_CORRECTED" | "ESCALATED" | "FAILED";
  evidenceTrail: string[];
}

export interface RepositorySearchMatch {
  filePath: string;
  lineNumber: number;
  lineContent: string;
  contextBefore?: string[];
  contextAfter?: string[];
}
