/**
 * MOOS ACADEMY — ENGLISH LANGUAGE, SYNTAX & CONCORD STRATEGY
 *
 * Implements subject fidelity for:
 * Subject-Verb Concord, Syntax Trees, Morphology, Phonetics, ESL Register, Clause Hierarchy.
 */

import { Unit, Skill } from "../../types/curriculum";
import { SmartBoardLessonContext, SubjectCategory } from "../../types/smartBoardTopicLock";
import { SmartBoardAction } from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene } from "../../types/videoLearning";
import { SubjectPedagogicalStrategy, MasterclassSynchronizedOutput } from "./SubjectPedagogicalStrategy";

export class EnglishLanguageStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "english_language_esl";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();

    // Ensure it doesn't accidentally claim Academic Discourse
    if (t.includes("academic discourse") || t.includes("rhetoric") || t.includes("critical synthesis") || t.includes("thesis defense")) {
      return false;
    }

    return (
      s.includes("english") ||
      s.includes("lang") ||
      s === "eng" ||
      t.includes("grammar") ||
      t.includes("concord") ||
      t.includes("phonics") ||
      t.includes("esl") ||
      t.includes("clause") ||
      t.includes("syntax")
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

    const tIntro = 0;
    const tRule = Math.min(60, Math.floor(durationSeconds * 0.10));
    const tSentence = Math.min(130, Math.floor(durationSeconds * 0.20));
    const tParseTree = Math.min(220, Math.floor(durationSeconds * 0.35));
    const tWorking = Math.min(340, Math.floor(durationSeconds * 0.55));
    const tTrapAlert = Math.min(460, Math.floor(durationSeconds * 0.72));
    const tChallenge = Math.min(580, Math.floor(durationSeconds * 0.88));

    smartBoardActions.push({
      id: `sb-eng-${segNum}-1`,
      timeSeconds: tIntro,
      actionType: "write_heading",
      title: "ENGLISH LANGUAGE & SYNTACTIC ARCHITECTURE MASTERCLASS",
      content: `Grammatical Seminar: ${topicTitle} (Segment ${segNum} of ${totalSegments})`,
      detail: "Curriculum Standard: WAEC / Cambridge GCE O/A-Level English Language • Structural Linguistics",
      zone: "main_canvas",
      highlightColor: "amber",
      pedagogicalPhase: "teacher_intro",
      narrationSyncCue: "Welcome to this linguistic masterclass. Today we examine grammatical concord and syntactic structure."
    });

    smartBoardActions.push({
      id: `sb-eng-${segNum}-2`,
      timeSeconds: tRule,
      actionType: "callout_alert",
      title: "CORE GOVERNING LINGUISTIC PRINCIPLE",
      content: "Principle of Grammatical Concord: A finite verb must agree in number and person with its grammatical head noun, regardless of intervening prepositional post-modifiers or subordinate clauses.",
      zone: "right_sidebar",
      highlightColor: "cyan",
      pedagogicalPhase: "prior_knowledge",
      narrationSyncCue: "What is the foundational law governing subject-verb agreement in standard English?"
    });

    smartBoardActions.push({
      id: `sb-eng-${segNum}-3`,
      timeSeconds: tSentence,
      actionType: "write_heading",
      title: "FOCAL SENTENCE STRUCTURE",
      content: "Sentence under linguistic dissection: 'The quality of these educational textbooks [is / are] outstanding.'",
      givenInfo: {
        "Head Noun Phrase": "'The quality' (Singular, 3rd Person)",
        "Intervening Modifier": "'of these educational textbooks' (Prepositional Phrase)",
        "Verb Slot": "Auxiliary selection [is vs are]"
      },
      targetQuantity: "Correct Syntactic Concord",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "problem_statement",
      narrationSyncCue: "Look at the sentence displayed on the digital board."
    });

    smartBoardActions.push({
      id: `sb-eng-${segNum}-4`,
      timeSeconds: tParseTree,
      actionType: "draw_diagram",
      title: "CONSTITUENT SYNTAX HIERARCHY TREE",
      content: "Syntax Tree: Sentence (S) ⟹ NP [Spec: The, N: quality, PP: of these textbooks] + VP [V: is, AP: outstanding].",
      diagramType: "syntax_tree",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "diagram_focus",
      narrationSyncCue: "Observe the constituent parse tree breaking down the hierarchical sentence tiers."
    });

    smartBoardActions.push({
      id: `sb-eng-${segNum}-5`,
      timeSeconds: tWorking,
      actionType: "step_by_step_working",
      title: "STRUCTURAL PARSING & ISOLATION",
      content: "Methodical Grammatical Isolation:",
      subSteps: [
        "1. Isolate the Complete Subject Noun Phrase: 'The quality of these educational textbooks'.",
        "2. Identify the Head Noun: 'Quality' is singular (uncountable/abstract).",
        "3. Filter Post-Modifiers: Mental bracketing: 'The quality [of these educational textbooks]...'",
        "4. Apply Concord Rule: Singular head noun 'quality' requires singular 3rd person singular verb 'is'.",
        "Grammatical Result: 'The quality of these educational textbooks IS outstanding.' (Verified Standard English)"
      ],
      transformationRationale: "Eliminates proximity confusion by systematically stripping away non-essential prepositional modifiers.",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "summary_synthesis",
      activeFocusTarget: "Concord Rule Application",
      narrationSyncCue: "Watch the board as we isolate the true grammatical subject step by step."
    });

    smartBoardActions.push({
      id: `sb-eng-${segNum}-6`,
      timeSeconds: tTrapAlert,
      actionType: "callout_alert",
      title: "COMMON EXAMINATION TRAP: PROXIMITY CONCORD ERROR",
      content: "Proximity Trap: Inexperienced writers incorrectly match the verb to 'textbooks' because it sits right next to the verb slot. Cambridge and WAEC examiners deliberately test this trap!",
      zone: "right_sidebar",
      highlightColor: "rose",
      pedagogicalPhase: "exam_trap",
      narrationSyncCue: "Pay close attention to the proximity concord trap highlighted on the right."
    });

    smartBoardActions.push({
      id: `sb-eng-${segNum}-7`,
      timeSeconds: tChallenge,
      actionType: "write_heading",
      title: "LINGUISTIC MASTERY CHALLENGE",
      content: "Analyze: 'Neither the principal nor the committee members [was / were] present when the decision regarding new laboratory protocols [was / were] ratified.'",
      detail: "Identify both verb slots and justify using the principle of proximity for correlative conjunctions.",
      zone: "main_canvas",
      highlightColor: "violet",
      pedagogicalPhase: "mastery_challenge",
      narrationSyncCue: "Now tackle our advanced linguistic mastery challenge."
    });

    checkpoints.push({
      id: `chk-eng-${segNum}-1`,
      triggerTimeSeconds: Math.floor(durationSeconds * 0.45),
      questionText: "In the sentence: 'A bouquet of yellow roses [was / were] presented to the speaker', which verb form is grammatically correct and why?",
      options: [
        "'was', because the true grammatical head noun is the singular collective noun 'bouquet'",
        "'were', because the noun immediately adjacent to the verb slot is the plural 'roses'",
        "'were', because a bouquet contains multiple flowers so it must always be plural",
        "Either 'was' or 'were' is equally acceptable in formal academic English"
      ],
      correctOptionIndex: 0,
      explanation: "Concord rule: The grammatical subject is 'A bouquet' (singular). The prepositional phrase 'of yellow roses' acts as a post-modifier and does not alter the singular agreement.",
      socraticHint: "Identify what was presented: was it the roses in isolation, or the single bouquet? Ignore the prepositional phrase."
    });

    const tutorScript = [
      `Welcome to this English Language masterclass on ${topicTitle}. Today we establish complete mastery over grammatical concord, syntactic tree structures, and sentence mechanics.`,
      "One of the most frequent errors encountered in national and international examinations is the proximity concord trap.",
      "Observe the digital board. In the sentence 'The quality of these educational textbooks is outstanding', the plural noun 'textbooks' is merely part of a modifying prepositional phrase.",
      "Watch as we mentally bracket out the modifier. The head noun is singular 'quality', which dictates the singular verb 'is'.",
      "Notice our constituent syntax hierarchy on screen, illustrating how the sentence branches into noun phrase and verb phrase components.",
      "Now verify your grammatical judgment at our interactive checkpoint before advancing to complex correlative conjunctions!"
    ].join(" ");

    scenes.push(
      {
        sceneNumber: 1,
        timeRange: `00:00 - 0${Math.floor(tWorking / 60)}:00`,
        startSeconds: 0,
        durationSeconds: tWorking,
        pedagogicalPhase: "topic_hook_intuition",
        title: "Subject Isolation & Syntactic Concord",
        narrationScript: tutorScript.slice(0, 300),
        visualDescription: "Interactive syntax diagram highlighting head noun, modifier, and verb agreement.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "A finite verb agrees with the head noun of the subject phrase, not intervening nouns."
      },
      {
        sceneNumber: 2,
        timeRange: `0${Math.floor(tWorking / 60)}:00 - 0${Math.floor(durationSeconds / 60)}:00`,
        startSeconds: tWorking,
        durationSeconds: durationSeconds - tWorking,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Proximity Traps & Advanced Correlatives",
        narrationScript: tutorScript.slice(300),
        visualDescription: "Correlative conjunction concord rules and advanced sentence parsing.",
        visualCanvasType: "english_syntax_tree",
        keyTakeaway: "Correlative pairs ('neither... nor') agree with the nearest subject; standard post-modifiers do not."
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

export const englishLanguageStrategy = new EnglishLanguageStrategy();
