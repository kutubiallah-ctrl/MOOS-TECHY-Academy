/**
 * MOOS ACADEMY — LITERATURE & CRITICAL CLOSE READING STRATEGY
 *
 * Implements subject fidelity for:
 * Prose, Poetry, Drama, Literary Devices, Soliloquies, Thematic Synthesis & Authorial Intent.
 */

import { Unit, Skill } from "../../types/curriculum";
import { SmartBoardLessonContext, SubjectCategory, MasterclassInstructionalState } from "../../types/smartBoardTopicLock";
import { SmartBoardAction } from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene } from "../../types/videoLearning";
import { SubjectPedagogicalStrategy, MasterclassSynchronizedOutput } from "./SubjectPedagogicalStrategy";

export class LiteratureStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "literature";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();

    return (
      s.includes("lit") ||
      t.includes("literature") ||
      t.includes("poetry") ||
      t.includes("drama") ||
      t.includes("prose") ||
      t.includes("novel") ||
      t.includes("literary") ||
      t.includes("soliloquy")
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

    const tIntro = 0;
    const tContext = Math.min(60, Math.floor(durationSeconds * 0.10));
    const tTextExemplar = Math.min(130, Math.floor(durationSeconds * 0.20));
    const tDeviceAnalysis = Math.min(220, Math.floor(durationSeconds * 0.35));
    const tCloseReadingWorking = Math.min(340, Math.floor(durationSeconds * 0.55));
    const tThematicMatrix = Math.min(460, Math.floor(durationSeconds * 0.72));
    const tCriticalInterpretation = Math.min(580, Math.floor(durationSeconds * 0.88));

    // Board actions tailored to Literature
    smartBoardActions.push({
      id: `sb-lit-${segNum}-1`,
      timeSeconds: tIntro,
      actionType: "write_heading",
      title: "LITERATURE & CLOSE READING MASTERCLASS",
      content: `Textual Inquiry: ${topicTitle} (Segment ${segNum} of ${totalSegments})`,
      detail: "Curriculum Standard: Cambridge Literature in English / WAEC Literature • Analytical Exegesis",
      zone: "main_canvas",
      highlightColor: "amber",
      pedagogicalPhase: "teacher_intro",
      narrationSyncCue: "Welcome to this literature masterclass. Today we engage in close reading and authorial technique analysis."
    });

    smartBoardActions.push({
      id: `sb-lit-${segNum}-2`,
      timeSeconds: tContext,
      actionType: "callout_alert",
      title: "SOCIO-HISTORICAL CONTEXT & AUTHORIAL INTENT",
      content: "Contextual Anchor: Literature does not exist in a vacuum; historical conditions, cultural currents, and philosophical worldviews shape narrative voice and character arcs.",
      zone: "right_sidebar",
      highlightColor: "cyan",
      pedagogicalPhase: "prior_knowledge",
      narrationSyncCue: "How does the historical milieu shape the author's figurative language?"
    });

    smartBoardActions.push({
      id: `sb-lit-${segNum}-3`,
      timeSeconds: tTextExemplar,
      actionType: "write_heading",
      title: "TEXTUAL EXCERPT & LITERARY PASSAGE",
      content: "Passage for Close Analysis: Examining diction, rhythm, figurative devices, and dramatic tension.",
      givenInfo: {
        "Genre": "Dramatic Monologue / Tragic Soliloquy",
        "Protagonist": "Tragic Figure Under Moral Crisis",
        "Core Theme": "Ambition vs Existential Despair"
      },
      targetQuantity: "Critical Thematic Interpretation",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "problem_statement",
      narrationSyncCue: "Observe our focal passage on the digital board."
    });

    smartBoardActions.push({
      id: `sb-lit-${segNum}-4`,
      timeSeconds: tDeviceAnalysis,
      actionType: "summary_table",
      title: "LITERARY DEVICE & FIGURATIVE TECHNIQUES",
      content: "Metaphor ↔ Objective Correlative ↔ Dramatic Irony ↔ Juxtaposition ↔ Auditory Imagery.",
      detail: "Always link the poetic or narrative device to the emotional and cognitive effect produced in the reader.",
      zone: "main_canvas",
      highlightColor: "violet",
      pedagogicalPhase: "strategy_identification",
      narrationSyncCue: "Notice our literary technique inventory on screen."
    });

    smartBoardActions.push({
      id: `sb-lit-${segNum}-5`,
      timeSeconds: tCloseReadingWorking,
      actionType: "step_by_step_working",
      title: "METHODICAL CLOSE READING EXEGESIS",
      content: "Deconstructing Textual Evidence Step by Step:",
      subSteps: [
        "1. Identify Key Diction: Isolate loaded verbs, evocative adjectives, and symbolic nouns.",
        "2. Analyze Connotation: Unpack layered figurative implications and emotional resonance.",
        "3. Evaluate Syntax & Rhythm: Examine meter, enjambment, caesura, or sentence fragmentation.",
        "4. Synthesize Thematic Significance: Connect micro-textual details to the overarching authorial commentary."
      ],
      transformationRationale: "Transitions from surface-level plot summary to deep, analytical close reading.",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "summary_synthesis",
      activeFocusTarget: "Close Reading Analysis",
      narrationSyncCue: "Watch the board as we unpack the passage line by line."
    });

    smartBoardActions.push({
      id: `sb-lit-${segNum}-6`,
      timeSeconds: tThematicMatrix,
      actionType: "draw_diagram",
      title: "THEMATIC DIALECTIC & CHARACTER TRAJECTORY",
      content: "Visual thematic trajectory: Hubris ⟹ Fatal Flaw (Hamartia) ⟹ Anagnorisis (Tragic Recognition) ⟹ Catharsis.",
      diagramType: "thematic_trajectory_map",
      zone: "main_canvas",
      highlightColor: "amber",
      pedagogicalPhase: "diagram_focus",
      narrationSyncCue: "Look at the visual arc tracing the character's psychological unraveling."
    });

    smartBoardActions.push({
      id: `sb-lit-${segNum}-7`,
      timeSeconds: tCriticalInterpretation,
      actionType: "write_heading",
      title: "CRITICAL ESSAY DEFENSE & COMPARATIVE ANALYSIS",
      content: "Formulate a thesis evaluating whether the protagonist's downfall is driven by external fate or internal psychological frailty.",
      detail: "Synthesize at least three direct quotations with critical commentary.",
      zone: "main_canvas",
      highlightColor: "violet",
      pedagogicalPhase: "mastery_challenge",
      narrationSyncCue: "Now prepare for your independent critical response."
    });

    checkpoints.push({
      id: `chk-lit-${segNum}-1`,
      triggerTimeSeconds: Math.floor(durationSeconds * 0.40),
      questionText: "When conducting a literary close reading, which analytical move provides the deepest critical insight?",
      options: [
        "Explaining how specific figurative diction and rhythm create subconscious thematic layers for the reader",
        "Retelling the chronological events of the plot from beginning to end",
        "Listing the names of all the characters who appear in the scene",
        "Stating whether you personally liked the character's behavior"
      ],
      correctOptionIndex: 0,
      explanation: "Rigorous literary exegesis moves beyond plot summary to analyze how authorial craft (diction, syntax, imagery) constructs thematic meaning.",
      socraticHint: "Distinguish between what happens (plot) and how the author creates meaning (craft and technique)."
    });

    const tutorScript = [
      `Welcome to this masterclass on ${topicTitle}. In this lesson, we master the art of literary close reading, figurative device analysis, and critical essay composition.`,
      "Literature is never mere storytelling; it is an orchestrated aesthetic medium wherein every word, caesura, and metaphor carries intentional weight.",
      "Observe the digital board. We have isolated a pivotal textual passage to examine its socio-historical resonance and dramatic architecture.",
      "Watch as we move from surface plot summary into deep textual exegesis: analyzing connotation, tracking symbolic motifs, and uncovering the protagonist's internal conflict.",
      "Notice our thematic trajectory on screen, charting the progression from fatal ambition to tragic recognition.",
      "Now, analyze the textual evidence with us at our interactive checkpoint before advancing to your critical essay defense!"
    ].join(" ");

    scenes.push(
      {
        sceneNumber: 1,
        timeRange: `00:00 - 0${Math.floor(tCloseReadingWorking / 60)}:00`,
        startSeconds: 0,
        durationSeconds: tCloseReadingWorking,
        pedagogicalPhase: "topic_hook_intuition",
        title: "Textual Context & Diction Analysis",
        narrationScript: tutorScript.slice(0, 300),
        visualDescription: "Highlighted literary passage with annotated figurative devices and vocabulary glosses.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "Close reading examines how authorial diction generates psychological tension and symbolic depth."
      },
      {
        sceneNumber: 2,
        timeRange: `0${Math.floor(tCloseReadingWorking / 60)}:00 - 0${Math.floor(durationSeconds / 60)}:00`,
        startSeconds: tCloseReadingWorking,
        durationSeconds: durationSeconds - tCloseReadingWorking,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Thematic Exegesis & Critical Essay Synthesis",
        narrationScript: tutorScript.slice(300),
        visualDescription: "Thematic dialectic diagram and quotation integration model response.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "Superior literary essays ground thematic arguments directly in textual evidence and authorial technique."
      }
    );

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "english_syntax_tree"
    };
  }
}

export const literatureStrategy = new LiteratureStrategy();
