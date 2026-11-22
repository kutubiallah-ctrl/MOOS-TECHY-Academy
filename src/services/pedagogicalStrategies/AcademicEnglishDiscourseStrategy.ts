/**
 * MOOS ACADEMY — ACADEMIC ENGLISH & CRITICAL DISCOURSE STRATEGY
 *
 * Implements strict subject fidelity for:
 * Academic Discourse, Rhetoric, Critical Synthesis, Literature Reviews, and Formal Thesis Defense.
 *
 * Fully replaces generic mathematical structures with a genuine 24-to-30 stage
 * scholarly rhetoric and language progression:
 * Foundation -> Understanding -> Guided Practice -> Application -> Analysis -> Synthesis -> Independent Performance -> Mastery
 */

import { Unit, Skill } from "../../types/curriculum";
import { SmartBoardLessonContext, SubjectCategory, MasterclassInstructionalState } from "../../types/smartBoardTopicLock";
import { SmartBoardAction } from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene } from "../../types/videoLearning";
import { SubjectPedagogicalStrategy, MasterclassSynchronizedOutput } from "./SubjectPedagogicalStrategy";

export class AcademicEnglishDiscourseStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "academic_english_discourse";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();

    return (
      t.includes("academic discourse") ||
      t.includes("rhetoric") ||
      t.includes("critical synthesis") ||
      t.includes("thesis defense") ||
      t.includes("scholarly") ||
      t.includes("literature review") ||
      t.includes("fallacy") ||
      (s.includes("lang") && (t.includes("discourse") || t.includes("synthesis") || t.includes("essay architecture")))
    );
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
    skill?: Skill;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;
    const topicTitle = context.topic;

    const smartBoardActions: SmartBoardAction[] = [];
    const checkpoints: VideoCheckpointQuestion[] = [];
    const scenes: VideoStoryboardScene[] = [];
    const instructionalStates: MasterclassInstructionalState[] = [];

    // Pedagogical timeline anchors
    const tIntro = 0;
    const tRegister = Math.min(60, Math.floor(durationSeconds * 0.10));
    const tAudience = Math.min(130, Math.floor(durationSeconds * 0.20));
    const tClaimEvidence = Math.min(220, Math.floor(durationSeconds * 0.35));
    const tRhetoricDiagram = Math.min(320, Math.floor(durationSeconds * 0.50));
    const tSynthesisWorking = Math.min(440, Math.floor(durationSeconds * 0.68));
    const tFallacyAlert = Math.min(560, Math.floor(durationSeconds * 0.82));
    const tMasterySynthesis = Math.min(660, Math.floor(durationSeconds * 0.92));

    // 1. TEACHER WELCOME & ORIENTATION
    smartBoardActions.push({
      id: `sb-acad-${segNum}-1`,
      timeSeconds: tIntro,
      actionType: "write_heading",
      title: "ACADEMIC DISCOURSE & CRITICAL SYNTHESIS MASTERCLASS",
      content: `Scholarly Seminar: ${topicTitle} (Segment ${segNum} of ${totalSegments})`,
      detail: "Curriculum Standard: WAEC / Cambridge Advanced Academic English • Unit Code: ENG-UP-01",
      zone: "main_canvas",
      highlightColor: "amber",
      pedagogicalPhase: "teacher_intro",
      narrationSyncCue: "Academic discourse is the language used to communicate ideas clearly, logically and appropriately in academic contexts."
    });

    // 2. DISCOURSE DEFINITION & REGISTER INVARIANTS
    smartBoardActions.push({
      id: `sb-acad-${segNum}-2`,
      timeSeconds: tRegister,
      actionType: "callout_alert",
      title: "SCHOLARLY REGISTER & EPISTEMIC HEDGING",
      content: "Register Invariant: Academic prose replaces personal emotionalism with objective evidence, nominalization, and calibrated hedging (e.g., 'The data indicates' rather than 'I definitely think').",
      zone: "right_sidebar",
      highlightColor: "cyan",
      pedagogicalPhase: "prior_knowledge",
      narrationSyncCue: "How does academic discourse differ from everyday conversation?"
    });

    // 3. THESIS & CLAIM FORMULATION
    smartBoardActions.push({
      id: `sb-acad-${segNum}-3`,
      timeSeconds: tAudience,
      actionType: "write_heading",
      title: "CLAIMS, WARRANTS & AUDIENCE EXPECTATIONS",
      content: "Core Argument Architecture: Claim ↔ Grounding Evidence ↔ Underlying Warrant ↔ Concessive Counter-argument.",
      detail: "An assertion unsupported by empirical citation or logical warrant is invalid in scholarly discourse.",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "problem_statement",
      givenInfo: {
        "Audience": "Scholarly Peer Review / Academic Examiner",
        "Modality": "Formal Written Dialectic",
        "Discourse Goal": "Multi-Source Critical Synthesis"
      },
      targetQuantity: "Dialectically Synthesized Academic Thesis",
      narrationSyncCue: "Notice the difference between a simple assertion and a defensible academic claim."
    });

    // 4. RHETORICAL STRATEGIES & SOURCE COMPARISON MATRIX
    smartBoardActions.push({
      id: `sb-acad-${segNum}-4`,
      timeSeconds: tClaimEvidence,
      actionType: "summary_table",
      title: "DIALECTICAL SOURCE SYNTHESIS MATRIX",
      content: "Source A (Adeyemi 2023) [Technological Accelerationism] vs Source B (Kowalski 2024) [Social Determinism] -> Synthesized Dialectic Position.",
      detail: "Synthesizing is not listing summaries; it is evaluating the points of tension and agreement between competing research perspectives.",
      zone: "main_canvas",
      highlightColor: "violet",
      pedagogicalPhase: "strategy_identification",
      narrationSyncCue: "Observe our multi-source comparison matrix on the digital board."
    });

    // 5. ARGUMENT MAP & VISUAL RHETORIC
    smartBoardActions.push({
      id: `sb-acad-${segNum}-5`,
      timeSeconds: tRhetoricDiagram,
      actionType: "draw_diagram",
      title: "TOULMIN ARGUMENTATION & RHETORICAL MAPPING",
      content: "Visual mapping: Data [Poverty Indicators] ⟹ Claim [Targeted Interventions] backed by Warrant [Economic Mobility Principle] with Rebuttal Qualifier [Resource Constraints].",
      diagramType: "toulmin_argument_map",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "diagram_focus",
      narrationSyncCue: "Look at the visual argument map unfolding on screen."
    });

    // 6. PROGRESSIVE SYNTHESIS PARAGRAPH WEAVING
    smartBoardActions.push({
      id: `sb-acad-${segNum}-6`,
      timeSeconds: tSynthesisWorking,
      actionType: "step_by_step_working",
      title: "METHODICAL ESSAY SYNTHESIS WEAVING",
      content: "Progressive Synthesis Paragraph Construction:",
      subSteps: [
        "1. Conceptual Topic Framing: Establish the scholarly debate regarding technological impact on labor markets.",
        "2. Source Attribution with Signal Verbs: Whereas Adeyemi (2023) contends that automation enhances aggregate productivity...",
        "3. Concessive Counter-Evidence Integration: ...Kowalski (2024) demonstrates significant short-term structural dislocation in low-wage sectors.",
        "4. Critical Student Voice & Dialectical Synthesis: Consequently, policy frameworks cannot assume frictionless transition; rather, productivity gains must be coupled with targeted retraining.",
        "Scholarly Conclusion: Verified dialectical synthesis integrating competing empirical findings with rigorous cohesion."
      ],
      transformationRationale: "Progresses from disconnected source summaries to a tightly cohesive dialectical synthesis paragraph.",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "summary_synthesis",
      activeFocusTarget: "Dialectical Synthesis",
      narrationSyncCue: "Watch the board as we construct our synthesis paragraph sentence by sentence."
    });

    // 7. LOGICAL FALLACY ALERT
    smartBoardActions.push({
      id: `sb-acad-${segNum}-7`,
      timeSeconds: tFallacyAlert,
      actionType: "callout_alert",
      title: "RHETORICAL FALLACY ALERT: POST HOC ERGO PROPTER HOC",
      content: "Fallacy Deconstruction: 'Because industrialization preceded temperature rise, it is the sole cause.' Error: Correlation is not causation; confounding variables must be accounted for.",
      zone: "right_sidebar",
      highlightColor: "rose",
      pedagogicalPhase: "exam_trap",
      narrationSyncCue: "Beware of classical logical fallacies like Post Hoc Ergo Propter Hoc and Straw Man."
    });

    // 8. MASTERY CHALLENGE
    smartBoardActions.push({
      id: `sb-acad-${segNum}-8`,
      timeSeconds: tMasterySynthesis,
      actionType: "write_heading",
      title: "INDEPENDENT SYNTHESIS & DEFENSE CHALLENGE",
      content: "Synthesize two conflicting peer-reviewed abstracts into a 250-word literature review paragraph using calibrated hedging, concessive discourse markers, and APA citation.",
      detail: "Submit your synthesized thesis in the workbench and review with Tutor Moos.",
      zone: "main_canvas",
      highlightColor: "violet",
      pedagogicalPhase: "mastery_challenge",
      narrationSyncCue: "Now prepare for your independent synthesis and formal thesis defense."
    });

    // Checkpoint 1: Academic Claim Distinction
    checkpoints.push({
      id: `chk-acad-${segNum}-1`,
      triggerTimeSeconds: Math.floor(durationSeconds * 0.35),
      questionText: "Which of the following statements represents the strongest, most defensible academic claim?",
      options: [
        "While digital learning tools expand access to educational resources, empirical gains in learner retention depend significantly on structured teacher scaffolding.",
        "Digital learning tools are obviously the best innovation in history and every school should immediately replace all textbooks.",
        "I think computers in schools might be good or bad depending on what learners feel like doing.",
        "Nobody can deny that technology solves all academic problems without any drawbacks."
      ],
      correctOptionIndex: 0,
      explanation: "Option A exemplifies academic register: it uses a concessive clause ('While digital learning tools expand...'), grounds the claim in empirical retention metrics, and introduces nuanced conditionality ('depend significantly on structured teacher scaffolding').",
      socraticHint: "Look for objective register, nuanced hedging, and balanced acknowledgment of counter-conditions rather than absolute emotional claims."
    });

    // Checkpoint 2: Fallacy Identification
    checkpoints.push({
      id: `chk-acad-${segNum}-2`,
      triggerTimeSeconds: Math.floor(durationSeconds * 0.75),
      questionText: "A researcher states: 'Because national literacy rates rose immediately following the adoption of tablet devices, tablet technology is the sole driver of student achievement.' Which logical fallacy is committed?",
      options: [
        "Post hoc ergo propter hoc (assuming chronological sequence proves sole causation without isolating confounding interventions)",
        "Argumentum ad hominem (attacking the personal integrity of educators)",
        "Straw man fallacy (misrepresenting an opponent's argument to make it easier to refute)",
        "Appeal to tradition (arguing that traditional chalkboards must be preserved because they are historic)"
      ],
      correctOptionIndex: 0,
      explanation: "'Post hoc ergo propter hoc' ('after this, therefore because of this') falsely equates temporal sequence with exclusive causation, omitting confounding factors such as updated teacher training, revised curriculum materials, or improved nutrition.",
      socraticHint: "Notice the temporal structure: event A happened before event B, and the speaker uncritically concludes A caused B without empirical proof."
    });

    // Synchronized Tutor Script
    const tutorScript = [
      "Academic discourse is the language used to communicate ideas clearly, logically and appropriately in academic contexts.",
      segNum > 1
        ? `In Segment ${segNum}, we advance into multi-source literature synthesis, fallacy deconstruction, and formal academic thesis defense.`
        : "How does academic discourse differ from everyday conversation? In informal conversation, speakers often rely on personal anecdotes, unhedged assertions, and shared emotional assumptions. In academic discourse, by contrast, assertions must be transformed into defensible claims grounded in empirical evidence, logical warrants, and calibrated hedging.",
      "Audience and purpose govern every rhetorical choice. When presenting research to scholarly examiners or peer reviewers, we maintain an objective, formal register.",
      "Observe the digital board. We have mapped out the architecture of scholarly claims: establishing clear definitions, citing corroborating studies, and directly confronting opposing perspectives.",
      "Notice our dialectical source synthesis matrix. When reviewing literature, we do not merely summarize study A and study B in isolation. We synthesize: evaluating points of consensus, identifying tensions, and highlighting unexamined assumptions.",
      "Watch the board as we construct our synthesis paragraph sentence by sentence. Notice our transitional signposts: 'Whereas Adeyemi contends...', '...Kowalski demonstrates...', leading to our critical synthesis: 'Consequently, policy frameworks must couple productivity gains with targeted retraining.'",
      "Pay close attention to the red callout box on the right. Avoid logical fallacies such as Post Hoc Ergo Propter Hoc and Straw Man arguments. Sound academic reasoning isolates confounding variables and articulates explicit warrants.",
      "Now, test your critical judgment at our interactive checkpoint before advancing to your independent thesis defense!"
    ].join(" ");

    // Storyboard Scenes
    scenes.push(
      {
        sceneNumber: 1,
        timeRange: `00:00 - 0${Math.floor(tClaimEvidence / 60)}:00`,
        startSeconds: 0,
        durationSeconds: tClaimEvidence,
        pedagogicalPhase: "topic_hook_intuition",
        title: "Foundations of Scholarly Rhetoric & Academic Register",
        narrationScript: "Academic discourse is the language used to communicate ideas clearly, logically and appropriately in academic contexts. We establish objective register, epistemic hedging, and claim architecture.",
        visualDescription: "Interactive digital board displays academic register contrasts, Toulmin argument layout, and formal discourse markers.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "Academic claims require empirical evidence, logical warrants, and calibrated hedging."
      },
      {
        sceneNumber: 2,
        timeRange: `0${Math.floor(tClaimEvidence / 60)}:00 - 0${Math.floor(tFallacyAlert / 60)}:00`,
        startSeconds: tClaimEvidence,
        durationSeconds: tFallacyAlert - tClaimEvidence,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Dialectical Synthesis & Multi-Source Argumentation",
        narrationScript: "Watch the board as we construct our synthesis paragraph sentence by sentence, weaving competing research findings into a cohesive, defensible academic argument.",
        visualDescription: "Multi-source synthesis matrix comparing empirical studies with color-coded claim, warrant, and concession annotations.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "Synthesis combines multiple sources to create a new, nuanced analytical perspective."
      },
      {
        sceneNumber: 3,
        timeRange: `0${Math.floor(tFallacyAlert / 60)}:00 - 0${Math.floor(durationSeconds / 60)}:00`,
        startSeconds: tFallacyAlert,
        durationSeconds: durationSeconds - tFallacyAlert,
        pedagogicalPhase: "misconception_alert",
        title: "Logical Fallacy Deconstruction & Formal Thesis Defense",
        narrationScript: "Deconstructing classical fallacies like Post Hoc Ergo Propter Hoc and Straw Man. Learners complete independent synthesis and defend their academic conclusions.",
        visualDescription: "Fallacy deconstruction cards, Toulmin warrant verification, and independent thesis challenge workbench.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "Rigorous scholarly prose isolates confounding variables and defends against fallacious reasoning."
      }
    );

    // Build the 24-to-30 instructional states spanning Foundation to Mastery
    const statesData: Array<{
      stageNumber: number;
      phase: MasterclassInstructionalState["phase"];
      purpose: string;
      narration: string;
      action: MasterclassInstructionalState["boardAction"];
      title: string;
      content: string;
      subSteps?: string[];
      detail?: string;
      zone: MasterclassInstructionalState["zone"];
      highlightColor?: MasterclassInstructionalState["highlightColor"];
      focus: string;
    }> = [
      {
        stageNumber: 1,
        phase: "FOUNDATION",
        purpose: "Teacher welcome and academic discourse orientation",
        narration: "Academic discourse is the language used to communicate ideas clearly, logically and appropriately in academic contexts.",
        action: "write_heading",
        title: "01. NATURE OF ACADEMIC DISCOURSE",
        content: "Academic Discourse: System of reasoned inquiry, empirical accountability, and scholarly communication.",
        detail: "Communicative purpose: advancing collective knowledge through verifiable claims.",
        zone: "main_canvas",
        highlightColor: "amber",
        focus: "Core definition of academic discourse"
      },
      {
        stageNumber: 2,
        phase: "FOUNDATION",
        purpose: "Contrast academic discourse with conversational language",
        narration: "Unlike spontaneous conversation, academic language emphasizes explicit precision, nominalization, and objective stance.",
        action: "summary_table",
        title: "02. CONVERSATION VS ACADEMIC REGISTER",
        content: "Informal: 'I think tech is great' ↔ Academic: 'Empirical analyses suggest technological integration correlates with efficiency gains.'",
        detail: "Eliminating subjective bias and establishing scholarly accountability.",
        zone: "main_canvas",
        highlightColor: "cyan",
        focus: "Epistemic stance and register"
      },
      {
        stageNumber: 3,
        phase: "FOUNDATION",
        purpose: "Define scholarly audience and communicative purpose",
        narration: "Academic writing is addressed to critical peers who evaluate arguments based on evidence rather than authority.",
        action: "callout_alert",
        title: "03. AUDIENCE & RHETORICAL PURPOSE",
        content: "Scholarly Audience: Skeptical, analytical evaluators demanding methodological transparency and logical rigor.",
        zone: "right_sidebar",
        highlightColor: "emerald",
        focus: "Audience awareness"
      },
      {
        stageNumber: 4,
        phase: "UNDERSTANDING",
        purpose: "Differentiate unsubstantiated assertions from empirical claims",
        narration: "An assertion is a mere statement of belief. An academic claim is an articulated position anchored in empirical data.",
        action: "step_by_step_working",
        title: "04. CLAIMS VS ASSERTIONS",
        content: "Deconstructing Claim Architecture:",
        subSteps: [
          "Assertion (Weak): Online education is completely ineffective.",
          "Academic Claim (Strong): While asynchronous modalities offer flexibility, retention rates decline without active peer dialogue."
        ],
        zone: "main_canvas",
        highlightColor: "cyan",
        focus: "Transforming assertions into claims"
      },
      {
        stageNumber: 5,
        phase: "UNDERSTANDING",
        purpose: "Analyze types of scholarly evidence",
        narration: "Scholarly evidence includes empirical datasets, peer-reviewed findings, and rigorous qualitative observations.",
        action: "draw_diagram",
        title: "05. TAXONOMY OF ACADEMIC EVIDENCE",
        content: "Primary Empirical Data ↔ Secondary Literature Review ↔ Replicated Experimental Findings.",
        detail: "Hierarchy of empirical authority and reliability in research.",
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Evaluating evidence validity"
      },
      {
        stageNumber: 6,
        phase: "UNDERSTANDING",
        purpose: "Unpack Toulmin reasoning and unstated warrants",
        narration: "A warrant is the underlying logical principle that connects your evidence directly to your claim.",
        action: "draw_diagram",
        title: "06. TOULMIN WARRANTS & REASONING",
        content: "Evidence [Dataset X] + Warrant [Causal Axiom Y] ⟹ Defensible Claim [Thesis Z].",
        zone: "main_canvas",
        highlightColor: "violet",
        focus: "Identifying reasoning warrants"
      },
      {
        stageNumber: 7,
        phase: "GUIDED_PRACTICE",
        purpose: "Rhetorical appeals in scholarly contexts",
        narration: "In academic prose, logos and ethos predominate: structured logic and scholarly credibility outweigh emotional pathos.",
        action: "callout_alert",
        title: "07. RHETORICAL STRATEGIES: LOGOS & ETHOS",
        content: "Logos: Deductive/inductive reasoning • Ethos: Meticulous citation and impartial tone • Pathos: Strictly subordinated.",
        zone: "right_sidebar",
        highlightColor: "cyan",
        focus: "Calibrating rhetorical appeals"
      },
      {
        stageNumber: 8,
        phase: "GUIDED_PRACTICE",
        purpose: "Mastering nominalization and formal tone",
        narration: "Nominalization transforms verbs into concept nouns, condensing information into dense academic prose.",
        action: "summary_table",
        title: "08. NOMINALIZATION & GRAMMATICAL DENSITY",
        content: "Active clause: 'When governments invest in broadband...' ↔ Nominalized: 'Governmental infrastructure investment facilitates...'",
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Grammatical density"
      },
      {
        stageNumber: 9,
        phase: "GUIDED_PRACTICE",
        purpose: "Macro-level essay structure and coherence",
        narration: "Coherence ensures that your macro-argument develops logically from thesis statement to concluding implications.",
        action: "write_heading",
        title: "09. MACRO-STRUCTURE & THESIS COHERENCE",
        content: "Thesis Statement ⟹ Thematic Body Sections ⟹ Concessive Counter-Analyses ⟹ Dialectical Synthesis.",
        zone: "main_canvas",
        highlightColor: "amber",
        focus: "Macro essay architecture"
      },
      {
        stageNumber: 10,
        phase: "APPLICATION",
        purpose: "Micro-level cohesion and transitional markers",
        narration: "Cohesion links adjacent sentences through discourse markers such as 'consequently', 'furthermore', and 'notwithstanding'.",
        action: "summary_table",
        title: "10. DISCOURSE MARKERS & COHESION",
        content: "Addition: 'Furthermore' • Concession: 'Notwithstanding' • Causation: 'Consequently' • Contrast: 'Conversely'.",
        zone: "bottom_bar",
        highlightColor: "violet",
        focus: "Transitional cohesion"
      },
      {
        stageNumber: 11,
        phase: "APPLICATION",
        purpose: "Disciplinary academic vocabulary",
        narration: "Deploying precise Tier 2 and Tier 3 scholarly vocabulary communicates exact nuances without ambiguity.",
        action: "callout_alert",
        title: "11. PRECISION VOCABULARY & DISCIPLINARY REGISTER",
        content: "Replace vague descriptors with disciplinary terms: 'Corroborate', 'Substantiate', 'Delineate', 'Juxtapose', 'Synthesize'.",
        zone: "right_sidebar",
        highlightColor: "emerald",
        focus: "Vocabulary precision"
      },
      {
        stageNumber: 12,
        phase: "APPLICATION",
        purpose: "Paraphrasing with concept fidelity",
        narration: "Legitimate scholarly paraphrasing restructures sentence syntax while faithfully preserving the author's conceptual essence.",
        action: "step_by_step_working",
        title: "12. RIGOROUS SCHOLARLY PARAPHRASING",
        content: "Restructuring Original Source:",
        subSteps: [
          "Original: 'Automated algorithms displace manual accounting jobs rapidly.'",
          "Patchwriting (Poor): Algorithms automate and displace manual accounting tasks quickly.",
          "Synthesized Paraphrase: Cognitive automation significantly accelerates labor market contraction in routine analytical fields."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Paraphrasing techniques"
      },
      {
        stageNumber: 13,
        phase: "ANALYSIS",
        purpose: "Integrating evidence via quotation sandwiching",
        narration: "Always frame quotations with an introductory signal phrase and follow with analytical commentary.",
        action: "step_by_step_working",
        title: "13. THE QUOTATION SANDWICH",
        content: "Signal Phrase + Embedded Citation + Critical Commentary:",
        subSteps: [
          "Top slice: As Adeyemi (2023) observes...",
          "Filling: '...labor dislocation is concentrated among entry-level analysts...'",
          "Bottom slice: This underscores the urgent necessity of recalibrating vocational curricula."
        ],
        zone: "main_canvas",
        highlightColor: "cyan",
        focus: "Evidence integration"
      },
      {
        stageNumber: 14,
        phase: "ANALYSIS",
        purpose: "Comparative source analysis",
        narration: "Examine where two researchers converge and where their methodologies produce conflicting findings.",
        action: "summary_table",
        title: "14. MULTI-SOURCE COMPARATIVE ANALYSIS",
        content: "Adeyemi (2023): Productivity expansion via automation ↔ Kowalski (2024): Wage polarization and displacement.",
        zone: "main_canvas",
        highlightColor: "amber",
        focus: "Comparing research paradigms"
      },
      {
        stageNumber: 15,
        phase: "ANALYSIS",
        purpose: "Concessive phrasing for agreement and disagreement",
        narration: "Scholarly consensus is rarely absolute; concessive phrasing captures nuanced intellectual balance.",
        action: "callout_alert",
        title: "15. CONCESSIVE ARGUMENTATIVE FORMULAS",
        content: "'While Author X convincingly demonstrates A, Author Y's longitudinal dataset reveals critical boundary limitations in B.'",
        zone: "right_sidebar",
        highlightColor: "cyan",
        focus: "Nuanced concession"
      },
      {
        stageNumber: 16,
        phase: "ANALYSIS",
        purpose: "Logical fallacy detection in academic literature",
        narration: "A rigorous scholar identifies unstated assumptions and fallacies such as Post Hoc Ergo Propter Hoc and Straw Man arguments.",
        action: "callout_alert",
        title: "16. LOGICAL FALLACY AUDIT",
        content: "Post Hoc Ergo Propter Hoc: Temporal sequence ≠ Causal proof • Straw Man: Refuting an exaggerated distortion.",
        zone: "right_sidebar",
        highlightColor: "rose",
        focus: "Fallacy deconstruction"
      },
      {
        stageNumber: 17,
        phase: "SYNTHESIS",
        purpose: "Distinguishing evidence from assertion in complex texts",
        narration: "In scholarly evaluation, unevidenced rhetoric must be filtered out to isolate verified empirical findings.",
        action: "summary_table",
        title: "17. EVIDENCE VS ASSERTION DECOUPLING",
        content: "Verified Evidence: Randomized controlled trial data (p < 0.01) ↔ Unsubstantiated Assertion: Sweeping popular claims.",
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Critical empirical evaluation"
      },
      {
        stageNumber: 18,
        phase: "SYNTHESIS",
        purpose: "Principles of multi-source dialectical synthesis",
        narration: "Dialectical synthesis integrates thesis and antithesis to create a higher-order, unified scholarly conclusion.",
        action: "draw_diagram",
        title: "18. DIALECTICAL SYNTHESIS MODEL",
        content: "Thesis [Tech Gains] + Antithesis [Labor Dislocation] ⟹ Synthesis [Productivity-Driven Retraining Paradigm].",
        zone: "main_canvas",
        highlightColor: "violet",
        focus: "Dialectic synthesis method"
      },
      {
        stageNumber: 19,
        phase: "SYNTHESIS",
        purpose: "Constructing a synthesis paragraph step by step",
        narration: "Watch the board as we combine topic framing, multiple source attributions, and student commentary.",
        action: "step_by_step_working",
        title: "19. SYNTHESIS PARAGRAPH ARCHITECTURE",
        content: "Constructing a Dialectical Synthesis Paragraph:",
        subSteps: [
          "Topic Sentence: Scholarly perspectives diverge regarding artificial intelligence's impact on employment.",
          "Attribution 1: While techno-optimists emphasize aggregate output gains (Adeyemi 2023)...",
          "Attribution 2: ...labor economists highlight localized wage stagnation (Kowalski 2024).",
          "Synthesis Commentary: Reconciling these views requires acknowledging that macro-growth does not preclude localized disruption."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Synthesis paragraph construction"
      },
      {
        stageNumber: 20,
        phase: "SYNTHESIS",
        purpose: "Evaluating a high-scoring model response",
        narration: "Notice how this model literature review excerpt achieves seamless cohesion, attribution, and formal hedging.",
        action: "summary_table",
        title: "20. MODEL RESPONSE BENCHMARK",
        content: "Benchmark Excerpt: Demonstrates APA signal phrases, concessive clauses, and explicit warrant articulation.",
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Model evaluation"
      },
      {
        stageNumber: 21,
        phase: "INDEPENDENT_PERFORMANCE",
        purpose: "Diagnosing weaknesses in unrefined academic drafts",
        narration: "Identify the weaknesses in this unrefined draft: colloquial tone, missing signal phrases, and unhedged overgeneralization.",
        action: "callout_alert",
        title: "21. DIAGNOSING WEAK DRAFTS",
        content: "Draft Weaknesses: 'Everyone knows tech is bad for jobs' -> Lacks citation, uses colloquialism, asserts without evidence.",
        zone: "right_sidebar",
        highlightColor: "rose",
        focus: "Revision diagnostics"
      },
      {
        stageNumber: 22,
        phase: "INDEPENDENT_PERFORMANCE",
        purpose: "Applying sentence-combining and revision strategies",
        narration: "We revise the draft by embedding subordinate concessive clauses and authoritative empirical references.",
        action: "step_by_step_working",
        title: "22. SYSTEMATIC DRAFT REVISION",
        content: "Transforming Draft to Scholarly Rigor:",
        subSteps: [
          "Initial: 'Tech takes jobs. It's really fast.'",
          "Revised: 'Technological acceleration displaces routine cognitive labor at unprecedented velocities (Kowalski 2024).'"
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        focus: "Scholarly revision"
      },
      {
        stageNumber: 23,
        phase: "INDEPENDENT_PERFORMANCE",
        purpose: "Independent synthesis task execution",
        narration: "Now synthesize these two conflicting abstracts into a single coherent thesis statement in your notes.",
        action: "write_heading",
        title: "23. INDEPENDENT SYNTHESIS TASK",
        content: "Task: Weave Empirical Study A and Theoretical Model B into a 3-sentence dialectical thesis defense.",
        zone: "main_canvas",
        highlightColor: "violet",
        focus: "Independent student synthesis"
      },
      {
        stageNumber: 24,
        phase: "MASTERY",
        purpose: "Mastery challenge and formal thesis defense",
        narration: "Complete your advanced mastery challenge: defending a formal academic position against peer-reviewed counter-arguments.",
        action: "write_heading",
        title: "24. ADVANCED MASTERY THESIS DEFENSE",
        content: "Final Challenge: Formulate an APA-compliant scholarly abstract defending your critical synthesis.",
        detail: "Submit for Socratic review in the Tutor Moos Academic Workbench.",
        zone: "main_canvas",
        highlightColor: "violet",
        focus: "Summative academic mastery"
      }
    ];

    for (const s of statesData) {
      instructionalStates.push({
        scriptId: `state-acad-${segNum}-${s.stageNumber}`,
        stageNumber: s.stageNumber,
        phase: s.phase,
        instructionalPurpose: s.purpose,
        teacherNarration: s.narration,
        boardAction: s.action,
        boardTitle: s.title,
        boardContent: s.content,
        boardSubSteps: s.subSteps,
        boardDetail: s.detail,
        zone: s.zone,
        highlightColor: s.highlightColor,
        visualType: "english_syntax_tree",
        learnerFocus: s.focus,
        estimatedDurationSeconds: 45
      });
    }

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      instructionalStates,
      visualEngine: "english_syntax_tree"
    };
  }
}

export const academicEnglishDiscourseStrategy = new AcademicEnglishDiscourseStrategy();
