/**
 * MOOS ACADEMY — MATHEMATICS & ALGEBRAIC PEDAGOGICAL STRATEGY
 *
 * Implements rigorous mathematics instruction:
 * Problem -> Given -> Formula -> Derivation -> Substitution -> Calculation -> Verification -> Interpretation
 */

import { Unit, Skill } from "../../types/curriculum";
import { SmartBoardLessonContext, SubjectCategory } from "../../types/smartBoardTopicLock";
import { SmartBoardAction } from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene } from "../../types/videoLearning";
import { SubjectPedagogicalStrategy, MasterclassSynchronizedOutput } from "./SubjectPedagogicalStrategy";

export class MathematicsStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "mathematics";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();

    return s.includes("math") || t.includes("algebra") || t.includes("geometry") || t.includes("calculus") || t.includes("quadratic") || t.includes("factor");
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
    const tPrinciple = Math.min(60, Math.floor(durationSeconds * 0.10));
    const tProblem = Math.min(130, Math.floor(durationSeconds * 0.20));
    const tFormula = Math.min(220, Math.floor(durationSeconds * 0.35));
    const tDerivation = Math.min(340, Math.floor(durationSeconds * 0.55));
    const tTrap = Math.min(460, Math.floor(durationSeconds * 0.72));
    const tChallenge = Math.min(580, Math.floor(durationSeconds * 0.88));

    smartBoardActions.push({
      id: `sb-math-${segNum}-1`,
      timeSeconds: tIntro,
      actionType: "write_heading",
      title: "MATHEMATICAL MASTERCLASS & RIGOROUS DERIVATION",
      content: `${topicTitle} (Segment ${segNum} of ${totalSegments})`,
      detail: "Curriculum Standard: Cambridge / WAEC Further Mathematics • Exact Analytical Methods",
      zone: "main_canvas",
      highlightColor: "amber",
      pedagogicalPhase: "teacher_intro",
      narrationSyncCue: "Welcome to this mathematics masterclass. Today we establish exact analytical derivations and algebraic methods."
    });

    smartBoardActions.push({
      id: `sb-math-${segNum}-2`,
      timeSeconds: tPrinciple,
      actionType: "callout_alert",
      title: "GOVERNING THEOREM & ALGEBRAIC AXIOM",
      content: "Axiom: For any quadratic equation ax² + bx + c = 0 where a ≠ 0, the roots are given by x = (-b ± √(b² - 4ac)) / (2a), with nature dictated by discriminant Δ = b² - 4ac.",
      zone: "right_sidebar",
      highlightColor: "cyan",
      pedagogicalPhase: "prior_knowledge",
      narrationSyncCue: "Recall the fundamental quadratic theorem and the role of the discriminant."
    });

    smartBoardActions.push({
      id: `sb-math-${segNum}-3`,
      timeSeconds: tProblem,
      actionType: "write_heading",
      title: "WORKED MATHEMATICAL PROBLEM",
      content: "Solve analytically for x: 2x² + 7x + 3 = 0",
      givenInfo: {
        "Leading Coefficient (a)": "2",
        "Linear Coefficient (b)": "7",
        "Constant Term (c)": "3"
      },
      targetQuantity: "Exact Real Roots {x₁, x₂}",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "problem_statement",
      narrationSyncCue: "Examine our quadratic problem statement on the digital board."
    });

    smartBoardActions.push({
      id: `sb-math-${segNum}-4`,
      timeSeconds: tFormula,
      actionType: "draw_diagram",
      title: "GEOMETRIC PARABOLIC REPRESENTATION",
      content: "Parabola y = 2x² + 7x + 3: Vertex at (-1.75, -3.125), opening upwards, x-intercepts at -3 and -0.5.",
      diagramType: "parabola_vertex_roots",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "diagram_focus",
      narrationSyncCue: "Observe the geometric parabola crossing the horizontal x-axis at two distinct points."
    });

    smartBoardActions.push({
      id: `sb-math-${segNum}-5`,
      timeSeconds: tDerivation,
      actionType: "step_by_step_working",
      title: "EXACT STEP-BY-STEP CALCULATION",
      content: "Factorization & Formula Evaluation:",
      subSteps: [
        "1. Compute discriminant: Δ = b² - 4ac = 7² - 4(2)(3) = 49 - 24 = 25.",
        "2. Recognize perfect square: √25 = 5, indicating rational real roots.",
        "3. Substitute into formula: x = (-7 ± 5) / (2 × 2) = (-7 ± 5) / 4.",
        "4. First root: x₁ = (-7 + 5) / 4 = -2 / 4 = -0.5 (or -1/2).",
        "5. Second root: x₂ = (-7 - 5) / 4 = -12 / 4 = -3.",
        "Verified Solution Set: x ∈ {-3, -1/2}."
      ],
      transformationRationale: "Evaluates exact arithmetic operations without skipping algebraic transformations.",
      zone: "main_canvas",
      highlightColor: "emerald",
      pedagogicalPhase: "summary_synthesis",
      activeFocusTarget: "Calculation and Root Extraction",
      narrationSyncCue: "Watch the board as we write out each step of calculation."
    });

    smartBoardActions.push({
      id: `sb-math-${segNum}-6`,
      timeSeconds: tTrap,
      actionType: "callout_alert",
      title: "CRITICAL SIGN & DENOMINATOR TRAP",
      content: "Denominator Pitfall: Forgetting to multiply 2 by 'a' in the denominator yields x = (-b ± √Δ) / 2 instead of 2a, producing false roots -1 and -6.",
      zone: "right_sidebar",
      highlightColor: "rose",
      pedagogicalPhase: "exam_trap",
      narrationSyncCue: "Beware the classic denominator trap when applying the quadratic formula."
    });

    smartBoardActions.push({
      id: `sb-math-${segNum}-7`,
      timeSeconds: tChallenge,
      actionType: "write_heading",
      title: "ANALYTICAL MASTERY CHALLENGE",
      content: "Given that the roots of 2x² + kx + 8 = 0 are equal, find the exact non-zero values of parameter k.",
      detail: "Set discriminant Δ = 0 and solve k² - 64 = 0.",
      zone: "main_canvas",
      highlightColor: "violet",
      pedagogicalPhase: "mastery_challenge",
      narrationSyncCue: "Now tackle our analytical parameter challenge."
    });

    checkpoints.push({
      id: `chk-math-${segNum}-1`,
      triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
      questionText: "What is the value of the discriminant Δ for the quadratic equation 2x² + 7x + 3 = 0, and what does it indicate about the roots?",
      options: [
        "Δ = 25 (> 0), indicating two distinct real, rational roots",
        "Δ = -25 (< 0), indicating two complex conjugate roots",
        "Δ = 0, indicating a single repeated real root",
        "Δ = 49, indicating irrational roots"
      ],
      correctOptionIndex: 0,
      explanation: "Δ = b² - 4ac = 7² - 4(2)(3) = 49 - 24 = 25. Since 25 > 0 and is a perfect square (5²), the roots are distinct, real, and rational.",
      socraticHint: "Substitute a=2, b=7, c=3 into Δ = b² - 4ac."
    });

    const tutorScript = [
      `Welcome to this mathematics masterclass on ${topicTitle}. Today we establish exact analytical derivations and algebraic problem solving.`,
      "Every mathematical proof begins from fundamental axioms. In quadratic analysis, the discriminant Δ = b² - 4ac determines the geometric nature of the roots.",
      "Observe the digital board. We have set up the equation 2x² + 7x + 3 = 0 with leading coefficient a = 2, linear coefficient b = 7, and constant term c = 3.",
      "Watch the board as we write out each line of calculation, computing the discriminant Δ = 25, taking the square root, and dividing by 2a.",
      "Notice how our parabola intersects the x-axis precisely at x = -3 and x = -0.5.",
      "Now verify your calculation at our interactive checkpoint before advancing to parametric discriminant problems!"
    ].join(" ");

    scenes.push(
      {
        sceneNumber: 1,
        timeRange: `00:00 - 0${Math.floor(tDerivation / 60)}:00`,
        startSeconds: 0,
        durationSeconds: tDerivation,
        pedagogicalPhase: "topic_hook_intuition",
        title: "Quadratic Principles & Discriminant Setup",
        narrationScript: tutorScript.slice(0, 300),
        visualDescription: "Parabola coordinate grid with vertex, axis of symmetry, and root markings.",
        visualCanvasType: "math_geometric_algebraic",
        keyTakeaway: "The discriminant determines whether a quadratic intersects the x-axis at 2, 1, or 0 points."
      },
      {
        sceneNumber: 2,
        timeRange: `0${Math.floor(tDerivation / 60)}:00 - 0${Math.floor(durationSeconds / 60)}:00`,
        startSeconds: tDerivation,
        durationSeconds: durationSeconds - tDerivation,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Exact Formula Calculation & Verification",
        narrationScript: tutorScript.slice(300),
        visualDescription: "Step-by-step arithmetic operations with denominator verification.",
        visualCanvasType: "math_geometric_algebraic",
        keyTakeaway: "Exact root determination requires rigorous algebraic substitution without skipping steps."
      }
    );

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "math_geometric_algebraic"
    };
  }
}

export const mathematicsStrategy = new MathematicsStrategy();
