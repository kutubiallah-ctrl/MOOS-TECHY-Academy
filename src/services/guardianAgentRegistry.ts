/**
 * MOOS TECHY ACADEMY — SPECIALIST AGENT REGISTRY & BOUNDARY ENFORCER
 * 
 * Formal definitions for all 14 development operations specialist agents.
 * Enforces execution boundaries, permission scopes, and escalation rules.
 */

import { GuardianAgentRole, SpecialistAgentDefinition } from "../types/developmentGuardian";

export const GUARDIAN_SPECIALIST_AGENTS: Record<GuardianAgentRole, SpecialistAgentDefinition> = {
  development_guardian_agent: {
    agentId: "agent-guardian-core",
    role: "development_guardian_agent",
    displayName: "Central Development Guardian Agent",
    domain: "Orchestration, Quality Control, Requirement Memory, Human Approval Gatekeeper",
    allowedTools: [
      "query_requirements",
      "inspect_task_queue",
      "dispatch_agent_task",
      "evaluate_quality_gate",
      "collect_evidence",
      "audit_lifecycle_transition",
      "calculate_readiness_level"
    ],
    allowedDataScopes: ["all_system_state", "audit_records", "task_queue", "requirement_registry"],
    allowedActions: [
      "route_tasks",
      "halt_unverified_transitions",
      "block_unauthorized_deployments",
      "request_human_approval",
      "record_evidence"
    ],
    forbiddenActions: [
      "autonomous_production_deploy",
      "bypass_human_approval",
      "destructive_curriculum_drop",
      "delete_learner_progress"
    ],
    verificationResponsibilities: [
      "Ensure evidence exists for all claims",
      "Verify quality gates pass before task completion",
      "Enforce human approval gates for high-risk changes"
    ],
    escalationRules: [
      "Escalate to Human Admin when riskLevel is 'high' or 'critical'",
      "Escalate when 3 consecutive verification retries fail",
      "Escalate when requirement drift is detected"
    ]
  },

  architecture_agent: {
    agentId: "agent-arch-spec",
    role: "architecture_agent",
    displayName: "Systems Architecture Agent",
    domain: "Subsystem boundaries, schema contracts, repository design, dependency graphs",
    allowedTools: ["inspect_schemas", "validate_contracts", "analyze_dependencies", "verify_immutability"],
    allowedDataScopes: ["type_definitions", "repository_interfaces", "curriculum_schemas", "data_contracts"],
    allowedActions: ["validate_module_boundaries", "verify_storage_strategy", "enforce_stable_ids"],
    forbiddenActions: ["direct_ui_mutation", "bypass_repository_abstraction", "arbitrary_schema_breakage"],
    verificationResponsibilities: [
      "Verify stable IDs across storage boundaries",
      "Validate repository contract adherence",
      "Ensure curriculum immutability during state migrations"
    ],
    escalationRules: [
      "Escalate to Guardian if breaking schema change is proposed",
      "Escalate if multi-tenant boundary violation is detected"
    ]
  },

  implementation_agent: {
    agentId: "agent-impl-spec",
    role: "implementation_agent",
    displayName: "Targeted Implementation Agent",
    domain: "Precise code modification, bug fixing, service implementation",
    allowedTools: ["draft_code_diff", "apply_file_edit", "verify_syntax", "format_source"],
    allowedDataScopes: ["source_code", "component_trees", "service_modules"],
    allowedActions: ["implement_permitted_task", "patch_verified_defect", "apply_safe_refactoring"],
    forbiddenActions: [
      "modify_security_rules_without_security_review",
      "delete_unrelated_code",
      "publish_ai_content_directly",
      "hardcode_api_secrets"
    ],
    verificationResponsibilities: [
      "Ensure implementation adheres strictly to acceptance criteria",
      "Maintain TypeScript type cleanliness",
      "Ensure zero syntax or build errors"
    ],
    escalationRules: [
      "Escalate to Architecture Agent if contract changes are required",
      "Escalate to Guardian if task scope expands beyond requirement"
    ]
  },

  test_agent: {
    agentId: "agent-test-spec",
    role: "test_agent",
    displayName: "Automated Test Harness Agent",
    domain: "Canonical test execution, regression verification, test runner protection",
    allowedTools: ["run_canonical_suites", "run_targeted_suite", "parse_test_metrics", "verify_test_runner"],
    allowedDataScopes: ["test_files", "test_runner_scripts", "test_results", "assertion_logs"],
    allowedActions: ["execute_test_harness", "report_suite_metrics", "detect_unlinked_suites"],
    forbiddenActions: [
      "remove_canonical_test_suite",
      "weaken_assertions_to_pass",
      "skip_failing_suites_silently"
    ],
    verificationResponsibilities: [
      "Protect all 19+ canonical test suites from removal",
      "Report explicit PASS, FAIL, SKIPPED, ERROR counts",
      "Ensure 100% green canonical verification before release"
    ],
    escalationRules: [
      "Escalate to Guardian immediately on any test regression",
      "Escalate if test suite execution exceeds timeout threshold"
    ]
  },

  runtime_reality_agent: {
    agentId: "agent-runtime-spec",
    role: "runtime_reality_agent",
    displayName: "Runtime Reality Verification Agent",
    domain: "Live runtime behavior, WebSocket connections, audio pipelines, DOM state, memory",
    allowedTools: ["inspect_dom_state", "inspect_audio_context", "inspect_local_storage", "simulate_user_interaction"],
    allowedDataScopes: ["browser_runtime_state", "storage_quotas", "audio_buffers", "network_events"],
    allowedActions: ["verify_actual_runtime_behavior", "test_offline_fallback", "audit_local_storage_quotas"],
    forbiddenActions: ["mock_failing_runtime_to_claim_success", "retain_transient_audio_data"],
    verificationResponsibilities: [
      "Ensure UI states reflect genuine underlying model data",
      "Verify 16kHz PCM input / 24kHz output audio pipelines",
      "Verify graceful recovery upon network or quota failure"
    ],
    escalationRules: [
      "Escalate to Guardian if runtime behavior diverges from test claims",
      "Escalate if storage quota exhaustion crashes application"
    ]
  },

  learner_experience_agent: {
    agentId: "agent-lx-spec",
    role: "learner_experience_agent",
    displayName: "Learner Journey & Level Alignment Agent",
    domain: "Learner onboarding, educational level scoping, diagnostic routing, practice flow",
    allowedTools: ["verify_level_scoping", "simulate_learner_journey", "check_diagnostic_pathway"],
    allowedDataScopes: ["learner_profiles", "diagnostic_history", "mastery_records", "activity_history"],
    allowedActions: ["audit_level_alignment", "verify_recommended_starting_units", "verify_prerequisite_safety"],
    forbiddenActions: ["reset_learner_progress_unauthorized", "cross_tenant_profile_leak"],
    verificationResponsibilities: [
      "Verify learners only receive content aligned to their educational level",
      "Ensure diagnostic gaps map to valid prerequisite curriculum nodes",
      "Verify study streaks and XP accumulate authentically without spoofing"
    ],
    escalationRules: [
      "Escalate if diagnostic routing recommends missing or out-of-scope curriculum unit"
    ]
  },

  pedagogical_audit_agent: {
    agentId: "agent-pedagogy-spec",
    role: "pedagogical_audit_agent",
    displayName: "Pedagogical Depth & Socratic Strategy Agent",
    domain: "Socratic inquiry, Bloom's taxonomy, 5-phase lesson structures, anti-rote learning",
    allowedTools: ["audit_lesson_phases", "evaluate_bloom_distribution", "detect_rote_drilling", "verify_socratic_hints"],
    allowedDataScopes: ["curriculum_skills", "lesson_plans", "hint_ladders", "masterclass_scripts"],
    allowedActions: ["evaluate_pedagogical_rigor", "audit_misconception_distractors", "verify_concept_derivations"],
    forbiddenActions: ["approve_generic_filler_content", "allow_rote_memorization_shortcuts"],
    verificationResponsibilities: [
      "Ensure lessons follow Orientation -> Core -> Guided -> Practice -> Application -> Mastery",
      "Verify Smart Board masterclasses contain 20-30 substantive states with zero fluff",
      "Verify distractor rationales reflect cognitive traps, not random noise"
    ],
    escalationRules: [
      "Escalate to Guardian if content is flagged as INSUFFICIENT_CONTENT_DEPTH or ARTIFICIAL_DURATION_PADDING"
    ]
  },

  content_saturation_agent: {
    agentId: "agent-saturation-spec",
    role: "content_saturation_agent",
    displayName: "Curriculum Content Saturation Agent",
    domain: "Cross-subject depth, regional syllabus alignment (NERDC/WAEC/JAMB), gap analysis",
    allowedTools: ["scan_curriculum_coverage", "calculate_saturation_metrics", "identify_thin_nodes"],
    allowedDataScopes: ["all_curriculum_units", "national_standards", "skill_question_banks"],
    allowedActions: ["flag_thin_curriculum_areas", "audit_question_counts", "verify_worked_example_saturation"],
    forbiddenActions: ["inflate_skill_counts_via_duplicate_questions", "fabricate_syllabus_standards"],
    verificationResponsibilities: [
      "Detect THIN, MISSING, GENERIC, or TEMPLATE_HEAVY topics across all 86+ units",
      "Ensure every skill has at least 3 practice questions with tiered hints",
      "Validate curriculum alignment across Primary, JSS, SSS, and Exam Prep"
    ],
    escalationRules: [
      "Escalate if core national examination topics lack practice or diagnostic coverage"
    ]
  },

  regression_agent: {
    agentId: "agent-regression-spec",
    role: "regression_agent",
    displayName: "Continuous Regression & Invariant Guard Agent",
    domain: "Math speech notation, Smart Board topic locking, ESL domain boundaries, data preservation",
    allowedTools: ["verify_math_speech_pronunciation", "verify_topic_locking", "verify_esl_separation"],
    allowedDataScopes: ["speech_synthesis_rules", "smartboard_strategies", "topic_registry"],
    allowedActions: ["test_mathematical_speech_invariants", "test_argument_inversion_safety", "guard_protected_features"],
    forbiddenActions: ["override_topic_lock_safeguards", "allow_generic_math_template_in_humanities"],
    verificationResponsibilities: [
      "Ensure x² is spoken as 'x squared' and never subscript",
      "Ensure x₁ is spoken as 'x subscript 1' and never power",
      "Ensure English and Literature never receive mathematical quadratic derivation steps",
      "Ensure Smart Board getProblemStepsForTopic remains argument-order invariant"
    ],
    escalationRules: [
      "Escalate immediately on any regression in speech, topic locking, or ESL taxonomy"
    ]
  },

  security_agent: {
    agentId: "agent-security-spec",
    role: "security_agent",
    displayName: "Institutional Security & RBAC Guard Agent",
    domain: "Multi-role tenancy, session isolation, cross-tenant protection, credentials, audit",
    allowedTools: ["audit_rbac_matrix", "test_session_switching", "verify_data_isolation", "inspect_credentials"],
    allowedDataScopes: ["user_identities", "authorization_rules", "audit_event_ledger", "security_rules"],
    allowedActions: ["enforce_tenant_boundaries", "block_unauthorized_access", "audit_authorization_failures"],
    forbiddenActions: ["expose_service_account_keys", "grant_unrestricted_admin_permissions", "clear_audit_logs"],
    verificationResponsibilities: [
      "Verify learners cannot view or modify teacher or classroom records",
      "Verify teachers cannot cross classroom or school boundaries",
      "Ensure audit event ledger is strictly append-only and tamper-evident",
      "Ensure Firebase client config does not expose privileged server keys"
    ],
    escalationRules: [
      "Escalate to Guardian and Human Admin immediately upon any cross-tenant data leak"
    ]
  },

  firebase_data_integrity_agent: {
    agentId: "agent-firebase-spec",
    role: "firebase_data_integrity_agent",
    displayName: "Firebase & Data Persistence Integrity Agent",
    domain: "Firestore persistence, offline fallback, deduplication, conflict resolution, sync reconciliation",
    allowedTools: ["audit_firestore_sync", "test_offline_reconciliation", "verify_document_ids"],
    allowedDataScopes: ["firestore_collections", "local_storage_snapshots", "sync_event_logs"],
    allowedActions: ["reconcile_local_cloud_state", "verify_stable_document_keys", "guard_offline_resilience"],
    forbiddenActions: [
      "silently_delete_unsynced_local_data",
      "silently_overwrite_newer_records",
      "introduce_infinite_sync_retry_loops"
    ],
    verificationResponsibilities: [
      "Ensure empty cloud databases do not wipe initialized local state",
      "Verify bidirectional profile sync between LocalStorage and Firestore",
      "Prevent duplicate achievement records or duplicate classroom records"
    ],
    escalationRules: [
      "Escalate if Firestore security rules reject legitimate authenticated sync operations"
    ]
  },

  ai_governance_agent: {
    agentId: "agent-aigov-spec",
    role: "ai_governance_agent",
    displayName: "AI Content Provenance & Approval Agent",
    domain: "Provenance tagging, draft lifecycles, human-in-the-loop review, anti-hallucination",
    allowedTools: ["audit_ai_provenance", "check_approval_queue", "verify_review_signatures"],
    allowedDataScopes: ["ai_generated_materials", "approval_records", "material_audit_logs"],
    allowedActions: ["enforce_draft_lifecycle", "verify_teacher_approval_signatures", "tag_ai_provenance"],
    forbiddenActions: [
      "auto_approve_ai_materials",
      "publish_drafts_without_human_review",
      "erase_ai_generation_provenance_tags"
    ],
    verificationResponsibilities: [
      "Verify all new AI materials start with AI_GENERATED_DRAFT and awaiting_human_approval",
      "Verify approved materials record authorized teacher reviewer ID and timestamp",
      "Ensure zero unvetted AI materials appear in public student practice banks"
    ],
    escalationRules: [
      "Escalate if any AI workflow attempts to dispatch materials directly to learners"
    ]
  },

  multimodal_agent: {
    agentId: "agent-multimodal-spec",
    role: "multimodal_agent",
    displayName: "Multimodal Audio & Video Guard Agent",
    domain: "Veo 3.1 video workflows, Gemini Live voice, audio transcription, media contracts",
    allowedTools: ["verify_video_aspect_ratios", "verify_pcm_sample_rates", "audit_audio_retention"],
    allowedDataScopes: ["video_generation_jobs", "transcription_records", "live_session_configs"],
    allowedActions: ["enforce_aspect_ratio_constraints", "audit_audio_cleanup", "verify_sample_rates"],
    forbiddenActions: ["store_raw_learner_audio_permanently", "allow_invalid_video_aspect_ratios"],
    verificationResponsibilities: [
      "Verify Veo video aspect ratios are strictly 16:9 or 9:16",
      "Verify Live Voice input is 16kHz PCM and output is 24kHz PCM",
      "Ensure transcription workflows discard raw audio buffers after processing"
    ],
    escalationRules: [
      "Escalate if raw audio data retention policy is violated"
    ]
  },

  reporting_agent: {
    agentId: "agent-reporting-spec",
    role: "reporting_agent",
    displayName: "Forensic Reporting & Readiness Calculation Agent",
    domain: "Forensic summaries, evidence auditing, readiness level calculation, roadmap planning",
    allowedTools: ["generate_forensic_report", "compute_readiness_metrics", "rank_next_tasks"],
    allowedDataScopes: ["all_system_evidence", "task_history", "quality_reports", "requirement_matrix"],
    allowedActions: ["compile_status_reports", "highlight_unverified_claims", "recommend_next_priority_task"],
    forbiddenActions: ["falsify_verification_status", "suppress_known_defects"],
    verificationResponsibilities: [
      "Calculate genuine Agent Readiness Level (0 to 6) based on verified capabilities",
      "Distinguish rigorously between IMPLEMENTED, TESTED, RUNTIME_VERIFIED, and UNVERIFIED",
      "Produce comprehensive, evidence-linked development summaries"
    ],
    escalationRules: [
      "Escalate to Guardian if unverified claims are detected in reporting documentation"
    ]
  },

  autonomous_development_bridge_agent: {
    agentId: "agent-dev-bridge",
    role: "autonomous_development_bridge_agent",
    displayName: "Autonomous Development Bridge Agent",
    domain: "External reasoning service bridges, AI Studio feedback envelopes, cross-environment coordination",
    allowedTools: [
      "create_feedback_envelope",
      "validate_envelope_schema",
      "dispatch_bridge_task",
      "inspect_bridge_status",
      "record_envelope_evidence"
    ],
    allowedDataScopes: ["feedback_envelopes", "bridge_status", "task_queue", "evidence_ledger"],
    allowedActions: [
      "generate_machine_readable_envelopes",
      "verify_envelope_integrity",
      "coordinate_external_reasoning",
      "report_bridge_connection_state"
    ],
    forbiddenActions: [
      "bypass_bridge_authentication",
      "scrape_browser_session_tokens",
      "embed_secrets_in_transports",
      "execute_unverified_external_code"
    ],
    verificationResponsibilities: [
      "Verify all feedback envelopes contain valid test status, hashes, and quality findings",
      "Ensure external reasoning connections strictly enforce TLS and token authorization",
      "Report CHATGPT_BRIDGE_STATUS accurately without false claims"
    ],
    escalationRules: [
      "Escalate to Guardian if external bridge returns malformed or unverifiable response",
      "Escalate if unauthenticated bridge access attempt is detected"
    ]
  },

  antigravity_integration_agent: {
    agentId: "agent-antigravity-spec",
    role: "antigravity_integration_agent",
    displayName: "Antigravity Integration Agent",
    domain: "Antigravity managed agent (@google/genai Interactions API), sandboxed Linux execution, environment snapshots",
    allowedTools: [
      "query_interactions_api",
      "inspect_sandbox_environment",
      "download_environment_snapshot",
      "audit_antigravity_capabilities",
      "validate_agent_credentials"
    ],
    allowedDataScopes: ["interactions_api_metadata", "sandbox_logs", "antigravity_audit_matrix", "credentials_config"],
    allowedActions: [
      "execute_bounded_sandbox_tasks",
      "download_snapshot_artifacts",
      "validate_agent_tool_restrictions",
      "audit_antigravity_maturity_levels"
    ],
    forbiddenActions: [
      "run_unbounded_root_operations",
      "leak_gemini_api_key_to_client",
      "claim_autonomy_without_runtime_evidence",
      "bypass_paid_model_flow_requirement"
    ],
    verificationResponsibilities: [
      "Audit all 20 Antigravity capabilities across CAPABILITY, CONFIGURATION, IMPLEMENTATION, RUNTIME_VERIFIED",
      "Ensure Interactions API agent calls remain strictly server-side",
      "Verify environment ID snapshot integrity via Files API"
    ],
    escalationRules: [
      "Escalate to Guardian if sandbox execution exceeds 300s timeout",
      "Escalate if paid model quota or billing gate is encountered"
    ]
  },

  external_integration_security_agent: {
    agentId: "agent-ext-sec",
    role: "external_integration_security_agent",
    displayName: "External Integration Security Agent",
    domain: "Zero-trust API boundaries, secret isolation, owner cryptographic authorization, token verification",
    allowedTools: [
      "verify_authorization_signature",
      "audit_secret_leakage",
      "inspect_network_allowlist",
      "enforce_least_privilege",
      "audit_notification_channels"
    ],
    allowedDataScopes: ["security_rules", "credential_metadata", "escalation_tokens", "audit_ledger"],
    allowedActions: [
      "verify_owner_signatures",
      "block_unauthorized_destructive_actions",
      "audit_notification_specs",
      "enforce_zero_credential_exposure"
    ],
    forbiddenActions: [
      "treat_notification_as_authorization",
      "allow_insecure_transport",
      "store_credentials_in_source_code",
      "bypass_owner_signature_checks"
    ],
    verificationResponsibilities: [
      "Verify that notifications (WhatsApp, Email) NEVER equal authorization",
      "Enforce HMAC/cryptographic token verification for all owner escalations",
      "Ensure zero secrets in git, bundles, or client logs"
    ],
    escalationRules: [
      "Escalate immediately to Owner if high-risk destructive action lacks valid signature",
      "Escalate if credential scraping or MFA bypass is attempted"
    ]
  },

  interactive_subject_engine_agent: {
    agentId: "agent-interactive-engine",
    role: "interactive_subject_engine_agent",
    displayName: "Interactive Subject Engine Agent",
    domain: "Subject-specific interactive engines, scene graphs, mathematical/physical invariants, manipulatives",
    allowedTools: [
      "calculate_domain_state",
      "verify_scene_invariants",
      "clamp_domain_parameters",
      "generate_tutor_moos_context",
      "audit_subject_contamination"
    ],
    allowedDataScopes: ["scene_graphs", "domain_models", "learner_manipulations", "tutor_moos_contexts"],
    allowedActions: [
      "recalculate_derived_state",
      "enforce_domain_conservation_laws",
      "trigger_socratic_misconceptions",
      "preserve_zero_cross_subject_contamination"
    ],
    forbiddenActions: [
      "inject_mathematical_syntax_into_humanities",
      "use_fake_decorative_animations_without_state",
      "corrupt_scene_graph_coordinates",
      "bypass_physical_invariants"
    ],
    verificationResponsibilities: [
      "Verify deterministic recalculation of derived physical, mathematical, and grammatical states",
      "Ensure Tutor Moos receives accurate, synchronized scene context",
      "Prevent mathematical contamination in English, ESL, Biology, and Literature"
    ],
    escalationRules: [
      "Escalate to Guardian if cross-subject contamination is detected in Smart Board scenes",
      "Escalate if interactive scene graph state crashes or produces unphysical values"
    ]
  },

  curriculum_architecture_agent: {
    agentId: "agent-curriculum-arch",
    role: "curriculum_architecture_agent",
    displayName: "Curriculum Architecture Agent",
    domain: "Global & advanced curriculum pathways, IGCSE, IB, IJMB, JUPEB, AS/A Level, University Prep, versioning",
    allowedTools: [
      "verify_curriculum_version",
      "audit_pathway_isolation",
      "validate_syllabus_hash",
      "enforce_progression_rules",
      "inspect_curriculum_registry"
    ],
    allowedDataScopes: ["curriculum_registry", "version_records", "syllabus_standards", "learner_progress"],
    allowedActions: [
      "register_advanced_pathways",
      "enforce_immutable_version_bumps",
      "protect_historical_learner_progress",
      "validate_pathway_separation"
    ],
    forbiddenActions: [
      "merge_distinct_syllabi_into_generic_category",
      "silently_overwrite_active_curriculum",
      "corrupt_historical_learner_mastery",
      "register_empty_unsubstantiated_pathways"
    ],
    verificationResponsibilities: [
      "Ensure Cambridge IGCSE, IB, IJMB, JUPEB, AS/A Level, and University Prep remain distinct",
      "Enforce strict curriculum versioning (CurriculumVersionRecord) on every syllabus revision",
      "Verify substantive unit and skill mappings across all advanced pathways"
    ],
    escalationRules: [
      "Escalate to Guardian if curriculum version collision is detected",
      "Escalate if pathway merging attempts to blur distinct international/Nigerian requirements"
    ]
  },

  runtime_evidence_agent: {
    agentId: "agent-runtime-evidence",
    role: "runtime_evidence_agent",
    displayName: "Runtime Evidence Agent",
    domain: "Automated test execution, runtime reality verification, false confidence detection, forensic evidence ledger",
    allowedTools: [
      "execute_canonical_suites",
      "collect_runtime_evidence",
      "detect_false_confidence",
      "generate_evidence_bundle",
      "verify_telemetry_isolation"
    ],
    allowedDataScopes: ["test_results", "runtime_telemetry", "evidence_ledger", "quality_reports"],
    allowedActions: [
      "distinguish_claim_from_runtime_reality",
      "expose_superficial_pass_scenarios",
      "bundle_cryptographic_evidence",
      "verify_19_canonical_suites"
    ],
    forbiddenActions: [
      "accept_claims_without_independent_test",
      "mask_runtime_failures",
      "prune_canonical_test_suites",
      "fabricate_evidence_records"
    ],
    verificationResponsibilities: [
      "Ensure evidence strictly distinguishes CLAIM, AUTOMATED TEST, RUNTIME OBSERVATION, HUMAN CONFIRMATION",
      "Subject all subsystems to false confidence testing to catch superficial implementations",
      "Maintain 100% green status across all 19 canonical test suites"
    ],
    escalationRules: [
      "Escalate to Guardian if false confidence scenario succeeds falsely",
      "Escalate immediately if any of the 19 canonical test suites regresses"
    ]
  }
};

export class GuardianAgentRegistry {
  private static instance: GuardianAgentRegistry;

  public static getInstance(): GuardianAgentRegistry {
    if (!GuardianAgentRegistry.instance) {
      GuardianAgentRegistry.instance = new GuardianAgentRegistry();
    }
    return GuardianAgentRegistry.instance;
  }

  public getAgent(role: GuardianAgentRole): SpecialistAgentDefinition {
    const agent = GUARDIAN_SPECIALIST_AGENTS[role];
    if (!agent) {
      throw new Error(`[GUARDIAN_AGENT_NOT_FOUND] Specialist agent '${role}' is not registered.`);
    }
    return agent;
  }

  public getAllAgents(): SpecialistAgentDefinition[] {
    return Object.values(GUARDIAN_SPECIALIST_AGENTS);
  }

  public canPerformAction(role: GuardianAgentRole, action: string): boolean {
    const agent = this.getAgent(role);
    if (agent.forbiddenActions.includes(action)) {
      return false;
    }
    return agent.allowedActions.includes(action);
  }

  public isToolAllowed(role: GuardianAgentRole, toolId: string): boolean {
    const agent = this.getAgent(role);
    return agent.allowedTools.includes(toolId);
  }
}

export const guardianAgentRegistry = GuardianAgentRegistry.getInstance();
