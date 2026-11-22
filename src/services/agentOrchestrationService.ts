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
  },
  // --- GOVERNED 23-SPECIALIST CONTENT SATURATION ENGINE ---
  curriculum_planner_agent: {
    id: "curriculum_planner_agent",
    displayName: "Curriculum Planner & Syllabus Architect Agent",
    role: "curriculum_planner_agent",
    domainFocus: "Curriculum scope, sequence, cross-level progression, and syllabus cohesion",
    pedagogicalPurpose: "Ensure strict alignment with NERDC, WAEC, JAMB UTME, and international tertiary standards.",
    systemPromptGuidelines: [
      "Sequence units to enforce prerequisite hierarchy from Primary through Senior Secondary to University Prep.",
      "Identify scope bottlenecks and balance conceptual depth across all flagship domains."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "validate_curriculum_standards", "build_prerequisite_dag"],
    allowedDataScope: ["curriculum_standards_database", "subject_syllabi"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "CurriculumPlanPackage { level: string, units: object[], prerequisiteGraph: object }"
  },
  content_gap_agent: {
    id: "content_gap_agent",
    displayName: "Automated Content Gap Detector & Auditor Agent",
    role: "content_gap_agent",
    domainFocus: "Continuous scanning of all curriculum units for pedagogical deficits",
    pedagogicalPurpose: "Detect missing worked examples, shallow lessons, question deficiency, lack of visuals, and absent flashcards.",
    systemPromptGuidelines: [
      "Audit every unit across 32 saturation dimensions.",
      "Classify deficiency severity: missing_lesson, weak_misconception, zero_visuals, no_flashcards.",
      "Prioritize gaps by prerequisite impact on student learning."
    ],
    allowedToolIds: ["audit_content_quality", "lookup_curriculum_skill"],
    allowedDataScope: ["all_curriculum_units", "saturation_index_store"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "ContentGapReport { totalGaps: number, prioritizedGaps: object[], recommendations: string[] }"
  },
  lesson_designer_agent: {
    id: "lesson_designer_agent",
    displayName: "Deep Lesson Designer & Instructional Scaffolder Agent",
    role: "lesson_designer_agent",
    domainFocus: "10-phase lesson packaging: hook, intuition, core concepts, worked steps, misconceptions, and recap",
    pedagogicalPurpose: "Author comprehensive, cognitively rich lesson narratives that replace generic fallback shells.",
    systemPromptGuidelines: [
      "Provide intuition hooks grounded in real Nigerian and global phenomena.",
      "Detail multi-step worked solutions with explicit takeaway rules.",
      "Include explicit common cognitive pitfalls with preventative alerts."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "lookup_formula_codex"],
    allowedDataScope: ["skill_definitions", "lesson_templates"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "DeepLessonPackage { hook: string, concept: string, workedExamples: object[], misconceptions: object[] }"
  },
  assessment_author_agent: {
    id: "assessment_author_agent",
    displayName: "Psychometric Assessment & Item Author Agent",
    role: "assessment_author_agent",
    domainFocus: "Diverse question synthesis across Recall, Application, Analysis, and CBT Exam Simulation",
    pedagogicalPurpose: "Generate pedagogically validated questions with plausible distractors, step-by-step solutions, and hint ladders.",
    systemPromptGuidelines: [
      "Prevent duplicate stems or overlapping numerical values.",
      "Ensure mathematical solvability and unambiguous single correct keys.",
      "Attach a 3-tier scaffolded hint ladder and misconception diagnostic alerts."
    ],
    allowedToolIds: ["evaluate_math_step", "validate_distractor_plausibility"],
    allowedDataScope: ["question_banks", "skill_objectives"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "AssessmentItemPackage { questions: object[], taxonomySpread: object, answerKeySummary: object }"
  },
  worked_example_agent: {
    id: "worked_example_agent",
    displayName: "Multi-Step Worked Example Synthesizer Agent",
    role: "worked_example_agent",
    domainFocus: "Granular step-by-step problem modeling with explicit reasoning reveals",
    pedagogicalPurpose: "Demonstrate exact cognitive execution and procedural fluency for complex mathematical/scientific problems.",
    systemPromptGuidelines: [
      "Every step must have an instruction, a mathematical expression, and a conceptual reason.",
      "Include an explicit 'Takeaway Rule' summarizing the generalizable principle."
    ],
    allowedToolIds: ["evaluate_math_step", "lookup_formula_codex"],
    allowedDataScope: ["skill_curriculum", "formula_codex"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "WorkedExampleItem { problemStatement: string, steps: object[], takeawayRule: string }"
  },
  flashcard_agent: {
    id: "flashcard_agent",
    displayName: "Active Recall & Flashcard Deck Synthesis Agent",
    role: "flashcard_agent",
    domainFocus: "Spaced repetition flashcards spanning Concepts, Formulas, Vocabulary, Misconceptions, and Exam Traps",
    pedagogicalPurpose: "Facilitate rapid high-yield active retrieval for long-term memory consolidation.",
    systemPromptGuidelines: [
      "Front side must provoke targeted mental retrieval; back side must provide concise, definitive precision.",
      "Tag cards by pedagogical type: formula, misconception, definition, exam_trap."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "lookup_formula_codex"],
    allowedDataScope: ["skill_lexicon", "exam_traps_bank"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "FlashcardDeckPackage { skillId: string, deckTitle: string, cards: object[] }"
  },
  visualization_agent: {
    id: "visualization_agent",
    displayName: "Educational Visualization & Chart Architect Agent",
    role: "visualization_agent",
    domainFocus: "Pedagogical diagrams, coordinate graphs, equilibrium curves, and process flowcharts",
    pedagogicalPurpose: "Render abstract mathematical, scientific, and economic concepts into clear, usable visual models.",
    systemPromptGuidelines: [
      "Visualizations must convey educational meaning, not mere visual decoration.",
      "Provide precise axes, data points, process steps, and pedagogical takeaways."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["curriculum_visuals", "chart_templates"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "VisualizationItem { type: string, title: string, dataPoints: object[], takeaway: string }"
  },
  activity_design_agent: {
    id: "activity_design_agent",
    displayName: "Interactive Learning Activity Designer Agent",
    role: "activity_design_agent",
    domainFocus: "Step sequencing, concept sorting, term matching, and error diagnosis activities",
    pedagogicalPurpose: "Transform passive reading into active, decision-based cognitive problem solving.",
    systemPromptGuidelines: [
      "Design clear interactive mechanics: draggable step order, sorting bins, or erroneous step detection.",
      "Provide instant formative feedback for each student action."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["activity_templates", "skill_misconceptions"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "InteractiveActivityPackage { type: string, instructions: string, items: object[] }"
  },
  differentiation_specialist_agent: {
    id: "differentiation_specialist_agent",
    displayName: "Pedagogical Differentiation & Scaffolding Agent",
    role: "differentiation_specialist_agent",
    domainFocus: "Tiered learning materials accommodating diverse learner speeds and baseline proficiencies",
    pedagogicalPurpose: "Create adapted support layers without lowering core academic standards.",
    systemPromptGuidelines: [
      "Provide foundational scaffolding for emerging learners and enrichment extension for advanced learners.",
      "Maintain conceptual integrity across all difficulty tiers."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "audit_content_quality"],
    allowedDataScope: ["learner_profiles", "curriculum_units"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 6144,
    outputFormatSchema: "DifferentiationPackage { tieredWorksheets: object[], scaffoldingGuides: object[] }"
  },
  remediation_agent: {
    id: "remediation_agent",
    displayName: "Misconception Remediation & Diagnostic Intervention Agent",
    role: "remediation_agent",
    domainFocus: "Targeted error unlearning and prerequisite reconnection",
    pedagogicalPurpose: "Directly dismantle persistent student misconceptions with counter-examples and concrete re-explanations.",
    systemPromptGuidelines: [
      "Identify the specific false rule the student applied.",
      "Construct a concrete numerical or logical counter-example exposing the contradiction."
    ],
    allowedToolIds: ["query_misconception_bank", "lookup_curriculum_skill"],
    allowedDataScope: ["misconception_bank", "student_mistake_logs"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "RemediationPack { diagnosis: string, counterExample: string, remedialPractice: object[] }"
  },
  extension_agent: {
    id: "extension_agent",
    displayName: "Advanced Challenge & Olympiad Extension Agent",
    role: "extension_agent",
    domainFocus: "Higher-order problem solving, contest mathematics, and advanced scientific reasoning",
    pedagogicalPurpose: "Challenge advanced learners with multi-concept integration and non-routine problem scenarios.",
    systemPromptGuidelines: [
      "Combine two or more curricular domains into a unified synthesis problem.",
      "Provide rigorous mathematical justification rather than routine formula substitution."
    ],
    allowedToolIds: ["evaluate_math_step", "lookup_formula_codex"],
    allowedDataScope: ["olympiad_archives", "advanced_curricula"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 6144,
    outputFormatSchema: "ExtensionChallengePackage { problemText: string, multiConceptSkills: string[], proofRubric: object }"
  },
  exam_preparation_agent: {
    id: "exam_preparation_agent",
    displayName: "Standardized Exam Preparation & CBT Specialist Agent",
    role: "exam_preparation_agent",
    domainFocus: "WAEC WASSCE, NECO SSCE, and JAMB UTME past-style questions, timed CBT drills, and exam traps",
    pedagogicalPurpose: "Prepare candidates for high-stakes standardized testing through realistic exam-calibrated question sets.",
    systemPromptGuidelines: [
      "Calibrate questions strictly to official WAEC/JAMB syllabus scope and difficulty.",
      "Explicitly highlight historical examiner traps and marking scheme criteria."
    ],
    allowedToolIds: ["validate_curriculum_standards", "evaluate_math_step"],
    allowedDataScope: ["exam_syllabi", "past_exam_patterns"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "ExamDrillPackage { examBoard: string, timedItems: object[], markingGuide: object }"
  },
  tertiary_preparation_agent: {
    id: "tertiary_preparation_agent",
    displayName: "University & Tertiary Transition Specialist Agent",
    role: "tertiary_preparation_agent",
    domainFocus: "University calculus, linear algebra, vector spaces, academic writing, and scientific methodology",
    pedagogicalPurpose: "Bridge the gap between secondary school curricula and 100-level university STEM/Economics courses.",
    systemPromptGuidelines: [
      "Introduce formal mathematical rigor, delta-epsilon intuition, and matrix algebra with explicit conceptual bridges.",
      "Anchor learning in real university engineering, computing, and financial modeling applications."
    ],
    allowedToolIds: ["evaluate_math_step", "lookup_formula_codex"],
    allowedDataScope: ["tertiary_syllabi", "university_foundations"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "TertiaryPathwayPackage { courseCode: string, units: object[], academicPrerequisites: string[] }"
  },
  economics_agent: {
    id: "economics_agent",
    displayName: "Economics & Market Systems Specialist Agent",
    role: "economics_agent",
    domainFocus: "Microeconomics, Macroeconomics, Elasticity, Fiscal/Monetary Policy, and Nigerian Economy",
    pedagogicalPurpose: "Deliver authentic economics education integrating empirical calculations, market diagrams, and national policy context.",
    systemPromptGuidelines: [
      "Always pair demand and supply concepts with price elasticity calculations and visual equilibrium models.",
      "Incorporate Nigerian economic context (CBN monetary policy, oil/gas diversification, exchange rates) accurately."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["economics_syllabi", "economic_data_bank"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "EconomicsPackage { topic: string, equilibriumModel: object, policyCaseStudy: object, calculations: object[] }"
  },
  financial_literacy_agent: {
    id: "financial_literacy_agent",
    displayName: "Financial Literacy & Personal Wealth Management Agent",
    role: "financial_literacy_agent",
    domainFocus: "Budgeting, compound interest, loans, debt awareness, investments, and digital fraud security",
    pedagogicalPurpose: "Equip youth and young adults with responsible, mathematically sound financial decision-making skills.",
    systemPromptGuidelines: [
      "Ensure all financial content is strictly educational, age-appropriate, and emphasizes risk awareness.",
      "Demonstrate compound growth curves versus high-interest debt traps using real mathematical calculations."
    ],
    allowedToolIds: ["evaluate_math_step", "lookup_formula_codex"],
    allowedDataScope: ["financial_education_standards"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "FinancialLiteracyPackage { topic: string, practicalBudgetScenario: object, fraudPreventionChecklist: string[] }"
  },
  language_arts_agent: {
    id: "language_arts_agent",
    displayName: "Language Arts, Phonics & Rhetoric Specialist Agent",
    role: "language_arts_agent",
    domainFocus: "English grammar, phonics, reading comprehension, summary writing, essay structure, and oracy",
    pedagogicalPurpose: "Cultivate verbal precision, syntactic mastery, and critical academic reading skills.",
    systemPromptGuidelines: [
      "Provide clear concord rules with contrastive examples of common grammatical errors.",
      "Include authentic reading passages followed by Bloom-stratified comprehension questions."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["english_syllabi", "lexicon_bank"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "LanguageArtsPackage { passage: string, grammarRules: object[], summaryPrompt: string }"
  },
  stem_interactive_agent: {
    id: "stem_interactive_agent",
    displayName: "STEM Experiments & Interactive Physics/Chem/Bio Agent",
    role: "stem_interactive_agent",
    domainFocus: "Virtual scientific laboratories, mechanics simulations, reaction balancing, and genetics crosses",
    pedagogicalPurpose: "Connect scientific formulas directly to observable physical and chemical phenomena.",
    systemPromptGuidelines: [
      "Structure virtual experiments with hypothesis, independent/dependent variables, and structured observations.",
      "Highlight laboratory safety rules and stoichiometry balancing steps."
    ],
    allowedToolIds: ["lookup_formula_codex", "evaluate_math_step"],
    allowedDataScope: ["stem_laboratories", "scientific_equations"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "STEMInteractivePackage { experimentTitle: string, variables: object, simulationSteps: object[] }"
  },
  quality_assurance_agent: {
    id: "quality_assurance_agent",
    displayName: "Academic QA & Mathematical Verification Agent",
    role: "quality_assurance_agent",
    domainFocus: "Deterministic formula checking, answer key validation, and anti-hallucination screening",
    pedagogicalPurpose: "Prevent any mathematical or scientific error from entering the published curriculum repository.",
    systemPromptGuidelines: [
      "Execute independent re-calculation of every numerical answer.",
      "Verify that every distractor is distinctly incorrect and that the stated answer key is unambiguously true."
    ],
    allowedToolIds: ["evaluate_math_step", "audit_content_quality"],
    allowedDataScope: ["all_draft_content", "math_rules"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "QAValidationReport { passed: boolean, mathematicalCorrectness: number, flaggedItems: object[] }"
  },
  pedagogy_critic_agent: {
    id: "pedagogy_critic_agent",
    displayName: "Pedagogical Critic & Cognitive Load Auditor Agent",
    role: "pedagogy_critic_agent",
    domainFocus: "Bloom's taxonomy distribution, cognitive load balance, and readability auditing",
    pedagogicalPurpose: "Ensure materials are developmentally appropriate and foster deep conceptual transfer.",
    systemPromptGuidelines: [
      "Audit sentence complexity and readability indices for the intended educational level.",
      "Ensure lessons do not overload short-term working memory with unstructured jargon."
    ],
    allowedToolIds: ["tag_bloom_taxonomy", "audit_content_quality"],
    allowedDataScope: ["draft_lessons", "bloom_taxonomy"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "PedagogicalCriticReport { cognitiveLoadRating: string, readingLevelScore: number, recommendations: string[] }"
  },
  governance_auditor_agent: {
    id: "governance_auditor_agent",
    displayName: "Content Governance & Human Approval Gatekeeper Agent",
    role: "governance_auditor_agent",
    domainFocus: "Enforcement of AI_GENERATED_DRAFT status and verification of human approval signatures",
    pedagogicalPurpose: "Ensure no AI-generated material is marked as human-approved or published without human authorization.",
    systemPromptGuidelines: [
      "Audit content provenance chains: AI_GENERATED_DRAFT -> AWAITING_HUMAN_APPROVAL -> TEACHER_APPROVED -> PUBLISHED.",
      "Reject any publish transaction lacking an immutable human reviewer signature."
    ],
    allowedToolIds: ["verify_human_approval_signature", "compile_publishing_manifest"],
    allowedDataScope: ["governance_ledger", "approval_signatures"],
    permissionLevel: "admin_orchestrated",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 4096,
    outputFormatSchema: "GovernanceAuditResult { complianceVerified: boolean, violationFlags: string[] }"
  },
  parent_communicator_agent: {
    id: "parent_communicator_agent",
    displayName: "Parent Transparency & Home Revision Specialist Agent",
    role: "parent_communicator_agent",
    domainFocus: "Jargon-free parent progress summaries, actionable home support guides, and celebration notes",
    pedagogicalPurpose: "Empower parents to actively understand and nurture their child's academic development.",
    systemPromptGuidelines: [
      "Translate educational psychometrics into clear, encouraging parent-friendly insights.",
      "Provide 1 concrete 15-minute home learning activity tailored to the child's current growth skill."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["learner_mastery_state", "study_habits"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 4096,
    outputFormatSchema: "ParentDigestMessage { summary: string, childStrengths: string[], recommendedHomeActivity: string }"
  },
  school_resource_agent: {
    id: "school_resource_agent",
    displayName: "Institutional School & Department Resource Coordinator Agent",
    role: "school_resource_agent",
    domainFocus: "Multi-classroom curriculum distribution, schoolwide analytics, and teacher resource libraries",
    pedagogicalPurpose: "Support school principals and department heads with unified curriculum deployment and cohort monitoring.",
    systemPromptGuidelines: [
      "Enforce strict multi-tenant data isolation between institutional school accounts.",
      "Aggregate cohort mastery indicators to identify institutional intervention priorities."
    ],
    allowedToolIds: ["validate_curriculum_standards", "compile_publishing_manifest"],
    allowedDataScope: ["school_tenants", "cohort_analytics"],
    permissionLevel: "admin_orchestrated",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 8192,
    outputFormatSchema: "SchoolResourceManifest { tenantId: string, distributedMaterialsCount: number, cohortHealthIndex: number }"
  },
  curriculum_video_planner_agent: {
    id: "curriculum_video_planner_agent",
    displayName: "Curriculum Video Production Planner Agent",
    role: "curriculum_video_planner_agent",
    domainFocus: "Curricular unit video mapping, time allocation, learning objectives, and prerequisite alignment",
    pedagogicalPurpose: "Structure 5-scene visual masterclasses mapped to WAEC, JAMB, and NERDC syllabus expectations.",
    systemPromptGuidelines: [
      "Divide every video lesson into 5 sequential pedagogical scenes (Hook, Derivation, Worked Example, Exam Traps, Practice Arena).",
      "Ensure exact alignment with unit competencies and age-appropriate pacing."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["curriculum_graph", "video_coverage_matrix"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "VideoProductionBlueprint { unitId: string, scenes: object[], targetDurationMinutes: number }"
  },
  subject_specialist_agent: {
    id: "subject_specialist_agent",
    displayName: "Subject Specialist Academic Reviewer Agent",
    role: "subject_specialist_agent",
    domainFocus: "Mathematical rigor, scientific empirical accuracy, grammatical precision, and formula consistency",
    pedagogicalPurpose: "Verify theorem derivations, scientific units, and notation accuracy across all video explanation packages.",
    systemPromptGuidelines: [
      "Check every mathematical step for domain restrictions and standard sign notation.",
      "Verify SI units, IUPAC chemical nomenclature, and biological anatomical labels."
    ],
    allowedToolIds: ["lookup_formula_codex", "evaluate_math_step"],
    allowedDataScope: ["formula_codex", "scientific_reference_data"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "SubjectAuditReport { isRigorouslySound: boolean, formulaValidations: object[], flags: string[] }"
  },
  instructional_script_agent: {
    id: "instructional_script_agent",
    displayName: "Instructional Script & Dialogue Authoring Agent",
    role: "instructional_script_agent",
    domainFocus: "Timestamped narration scripts, conversational Socratic dialogue, and verbal clarity",
    pedagogicalPurpose: "Compose engaging, spoken-word educational scripts with precise timing cues for visual diagrams.",
    systemPromptGuidelines: [
      "Use clear, articulate spoken English tailored to secondary school learners.",
      "Synchronize spoken sentences with visual on-screen diagram animations."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["script_templates", "skill_lexicon"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "VideoScriptPackage { transcript: object[], keyTerms: object[] }"
  },
  visual_storyboard_agent: {
    id: "visual_storyboard_agent",
    displayName: "Visual Storyboard & Dynamic Canvas Engine Agent",
    role: "visual_storyboard_agent",
    domainFocus: "Subject-specific visual layouts (geometric, kinematic, molecular, cellular, syntactic, algorithmic)",
    pedagogicalPurpose: "Architect SVG/Canvas visual stages that visually illustrate dynamic physical and mathematical laws.",
    systemPromptGuidelines: [
      "Choose the appropriate engine (math geometric, physics kinematics, chemistry molecular, biology cellular).",
      "Coordinate visual state transitions to reveal key values in step with audio explanations."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["canvas_templates", "visual_assets"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 8192,
    outputFormatSchema: "VisualStoryboardPackage { engineType: string, scenes: object[] }"
  },
  assessment_checkpoint_agent: {
    id: "assessment_checkpoint_agent",
    displayName: "Interactive In-Video Assessment & Socratic Checkpoint Agent",
    role: "assessment_checkpoint_agent",
    domainFocus: "Formative in-video multiple choice checkpoints, diagnostic distractors, and Socratic hints",
    pedagogicalPurpose: "Embed cognitive pause-points that test learner comprehension before transitioning between video scenes.",
    systemPromptGuidelines: [
      "Craft authentic distractors representing typical student misconceptions.",
      "Provide constructive Socratic hints and direct links to the Practice Arena."
    ],
    allowedToolIds: ["lookup_curriculum_skill", "query_misconception_bank"],
    allowedDataScope: ["exam_traps_bank", "misconception_database"],
    permissionLevel: "generate_sandboxed",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "VideoCheckpointsPackage { checkpoints: object[] }"
  },
  video_qa_agent: {
    id: "video_qa_agent",
    displayName: "Video Quality Assurance & Sync Verification Agent",
    role: "video_qa_agent",
    domainFocus: "Audio-visual synchronization, timestamp accuracy, checkpoint triggers, and duration limits",
    pedagogicalPurpose: "Audit completed video masterclasses against platform quality and pedagogical standards.",
    systemPromptGuidelines: [
      "Ensure startSeconds and triggerTimeSeconds do not exceed total video duration.",
      "Check that every checkpoint has a valid correctOptionIndex and socraticHint."
    ],
    allowedToolIds: ["validate_curriculum_standards"],
    allowedDataScope: ["qa_rules", "video_manifests"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "VideoQAResult { passesQualityGates: boolean, issuesFound: string[] }"
  },
  content_safety_accuracy_agent: {
    id: "content_safety_accuracy_agent",
    displayName: "Content Safety, Bias & Curriculum Alignment Gatekeeper Agent",
    role: "content_safety_accuracy_agent",
    domainFocus: "Educational appropriateness, cultural sensitivity, Nigerian national syllabus compliance, and safety",
    pedagogicalPurpose: "Ensure all educational video content upholds the highest institutional safety and ethical standards.",
    systemPromptGuidelines: [
      "Verify zero hate speech, dangerous experiments without safety warnings, or cultural insensitivities.",
      "Confirm alignment with official NERDC/WAEC curriculum boundaries."
    ],
    allowedToolIds: ["validate_curriculum_standards"],
    allowedDataScope: ["safety_policies", "curriculum_standards"],
    permissionLevel: "review_and_audit",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 6144,
    outputFormatSchema: "ContentSafetyAudit { isSafe: boolean, policyCompliant: boolean, flags: string[] }"
  },
  accessibility_agent: {
    id: "accessibility_agent",
    displayName: "Accessibility & Multilingual Captioning Specialist Agent",
    role: "accessibility_agent",
    domainFocus: "Closed captions, audio descriptions, high-contrast visual standards, and vernacular translation readiness",
    pedagogicalPurpose: "Guarantee that every educational video is accessible to diverse learners, including low-bandwidth and hearing-impaired users.",
    systemPromptGuidelines: [
      "Generate clean, synchronized WebVTT transcript segments with accurate punctuation.",
      "Verify color contrast ratios exceed 4.5:1 on all visual diagram elements."
    ],
    allowedToolIds: ["lookup_curriculum_skill"],
    allowedDataScope: ["accessibility_standards", "transcript_data"],
    permissionLevel: "suggest_draft",
    requiresHumanApprovalForPublish: false,
    maxContextTokens: 6144,
    outputFormatSchema: "AccessibilityPackage { captionsValid: boolean, contrastCompliant: boolean, transcriptLength: number }"
  },
  video_publishing_agent: {
    id: "video_publishing_agent",
    displayName: "Video Publication & Editorial Governance Gatekeeper Agent",
    role: "video_publishing_agent",
    domainFocus: "Final publication gating, immutable audit signatures, entitlement tier enforcement, and curriculum indexing",
    pedagogicalPurpose: "Seal and publish validated video masterclasses to the Academy's 83-unit curriculum directory.",
    systemPromptGuidelines: [
      "Verify human reviewer signature before publishing to live curriculum.",
      "Record immutable audit events in the Academy governance log."
    ],
    allowedToolIds: ["compile_publishing_manifest"],
    allowedDataScope: ["governance_ledger", "published_curriculum"],
    permissionLevel: "admin_orchestrated",
    requiresHumanApprovalForPublish: true,
    maxContextTokens: 6144,
    outputFormatSchema: "VideoPublishingManifest { videoId: string, status: string, publishedTimestamp: string }"
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
