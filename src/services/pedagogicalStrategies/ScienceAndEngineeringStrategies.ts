/**
 * MOOS ACADEMY — SCIENCE, ENGINEERING, COMPUTING & APPLIED STRATEGIES
 *
 * Implements strict subject fidelity for:
 * - Physics: Physical situation -> Knowns/Unknowns -> Vector/Free-body diagram -> Equation -> Units -> Interpretation
 * - Chemistry: Chemical situation -> Particles/Substances -> Reaction equation -> Stoichiometric reasoning -> Observations
 * - Biology: Biological question -> Cellular structure -> Process/Mechanism -> Sequence -> Evidence
 * - Computer Science: Problem -> Algorithm -> Representation -> Trace ladder -> Invariant -> Complexity
 * - Engineering: Problem -> System -> Schematic -> Statics/Circuit principle -> Governing model -> Verification
 * - Economics & Financial Literacy: Market scenario -> Actors -> Equilibrium curve shift -> Policy interpretation
 */

import { Unit, Skill } from "../../types/curriculum";
import { SmartBoardLessonContext, SubjectCategory } from "../../types/smartBoardTopicLock";
import { SmartBoardAction } from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene, SubjectVisualEngineType } from "../../types/videoLearning";
import { SubjectPedagogicalStrategy, MasterclassSynchronizedOutput } from "./SubjectPedagogicalStrategy";

// 1. PHYSICS STRATEGY
export class PhysicsStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "physics";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("phys") || t.includes("kinematic") || t.includes("vector") || t.includes("projectile") || t.includes("mechanic");
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

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-phys-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "PHYSICS & MECHANICS MASTERCLASS",
        content: `${topicTitle} (Segment ${segNum} of ${totalSegments})`,
        detail: "Standard: Cambridge A-Level / WAEC Physics • Orthogonal Vector Kinematics",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-phys-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.10),
        actionType: "callout_alert",
        title: "GOVERNING PHYSICAL PRINCIPLE: INDEPENDENCE OF PERPENDICULAR MOTIONS",
        content: "Orthogonal Independence: Motion along the horizontal axis (ax = 0) is entirely independent of accelerated motion along the vertical axis (ay = -g).",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-phys-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.20),
        actionType: "write_heading",
        title: "PHYSICAL PROBLEM SPECIFICATION",
        content: "A projectile is launched from ground level with initial speed u = 20 m/s at an angle θ = 30° to the horizontal. Take g = 9.8 m/s².",
        givenInfo: {
          "Launch Speed (u)": "20 m/s",
          "Elevation Angle (θ)": "30°",
          "Gravitational Field (g)": "9.8 m/s² (downward)"
        },
        targetQuantity: "Flight Time (T), Maximum Height (H), and Range (R)",
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "problem_statement"
      },
      {
        id: `sb-phys-${segNum}-4`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "draw_diagram",
        title: "VECTOR RESOLUTION & TRAJECTORY SCHEMATIC",
        content: "Velocity Components: vx = u cos(30°) = 17.32 m/s (constant) • vy = u sin(30°) = 10.0 m/s (diminishing at g = 9.8 m/s²).",
        diagramType: "projectile_kinematic_parabola",
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "diagram_focus"
      },
      {
        id: `sb-phys-${segNum}-5`,
        timeSeconds: Math.floor(durationSeconds * 0.55),
        actionType: "step_by_step_working",
        title: "ANALYTICAL KINEMATIC EVALUATION",
        content: "Evaluating Kinematic Equations with Dimensional Units:",
        subSteps: [
          "1. Resolve initial velocities: vx = 20 cos(30°) = 17.32 m/s; vy0 = 20 sin(30°) = 10.0 m/s.",
          "2. Determine apex time: vy = vy0 - gt = 0 ⟹ t_apex = 10.0 / 9.8 = 1.02 s.",
          "3. Total flight time: T = 2 × t_apex = 2.04 s.",
          "4. Maximum elevation: H = (vy0)² / (2g) = 100 / 19.6 = 5.10 m.",
          "5. Horizontal displacement: R = vx × T = 17.32 × 2.04 = 35.34 m.",
          "Physical Verification: All units match meters and seconds; vertical velocity at apex is exactly 0 m/s."
        ],
        transformationRationale: "Evaluates physical kinematics with rigorous vector decoupling and SI unit consistency.",
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      },
      {
        id: `sb-phys-${segNum}-6`,
        timeSeconds: Math.floor(durationSeconds * 0.85),
        actionType: "write_heading",
        title: "PHYSICAL APPLICATION & CHALLENGE",
        content: "Derive the launch angle θ that maximizes range on a terrain sloping upward at angle α.",
        zone: "main_canvas",
        highlightColor: "violet",
        pedagogicalPhase: "mastery_challenge"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-phys-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "At the exact apex of a projectile's parabolic trajectory, what are its velocity and acceleration vectors?",
        options: [
          "Velocity is entirely horizontal (vx = u cos θ, vy = 0); acceleration is vertical (ay = -9.8 m/s² downward)",
          "Both velocity and acceleration are completely zero",
          "Velocity is zero; acceleration is horizontal",
          "Velocity is directed upwards; acceleration is zero"
        ],
        correctOptionIndex: 0,
        explanation: "Gravity acts continuously downward (ay = -g) throughout the flight. At apex, vertical velocity vy momentarily crosses zero, but horizontal velocity vx remains non-zero and constant.",
        socraticHint: "Remember: Does gravity ever turn off mid-air? No! What happens to the horizontal motion when air resistance is negligible?"
      }
    ];

    const tutorScript = `Welcome to this physics masterclass on ${topicTitle}. Today we unpack 2D projectile kinematics through the fundamental principle of perpendicular motion independence. Horizontal velocity remains constant because no horizontal force acts, while gravity uniformly decelerates the vertical component until the apex. Observe the digital board as we resolve vectors, compute flight time, and verify dimensional units.`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: `00:00 - 05:00`,
        startSeconds: 0,
        durationSeconds: Math.floor(durationSeconds / 2),
        pedagogicalPhase: "topic_hook_intuition",
        title: "Vector Resolution & Kinematic Laws",
        narrationScript: tutorScript,
        visualDescription: "Interactive vector resolution diagram with trajectory curve and velocity arrows.",
        visualCanvasType: "physics_kinematic_vectors",
        keyTakeaway: "Perpendicular motions operate completely independently of one another."
      },
      {
        sceneNumber: 2,
        timeRange: `05:00 - 10:00`,
        startSeconds: Math.floor(durationSeconds / 2),
        durationSeconds: Math.floor(durationSeconds / 2),
        pedagogicalPhase: "worked_example_breakdown",
        title: "Flight Time, Apex Height & Range Calculation",
        narrationScript: "Evaluating parametric equations and validating unit consistency.",
        visualDescription: "Step-by-step substitution into kinematic formulas with real-time vector graphs.",
        visualCanvasType: "physics_kinematic_vectors",
        keyTakeaway: "Apex occurs when vertical velocity equals zero."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "physics_kinematic_vectors"
    };
  }
}

// 2. CHEMISTRY STRATEGY
export class ChemistryStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "chemistry";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("chem") || t.includes("titration") || t.includes("stoichiometry") || t.includes("acid") || t.includes("reaction");
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-chem-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "CHEMISTRY & STOICHIOMETRIC REACTION MASTERCLASS",
        content: `${context.topic} (Segment ${segNum} of ${totalSegments})`,
        detail: "Curriculum Standard: Cambridge / WAEC Quantitative Chemistry",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-chem-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.15),
        actionType: "callout_alert",
        title: "GOVERNING CHEMICAL LAW: MOLE RATIO CONSERVATION",
        content: "Stoichiometric Principle: Chemical species react in exact mole ratios governed by the balanced stoichiometric coefficients: n = C × V.",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-chem-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "step_by_step_working",
        title: "VOLUMETRIC TITRATION STOICHIOMETRIC DERIVATION",
        content: "Neutralization: 25.0 cm³ of 0.100 M NaOH titrated against unknown HCl. Concordant titre = 20.0 cm³.",
        subSteps: [
          "1. Balanced Equation: HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l) (1:1 mole ratio).",
          "2. Calculate moles of base: n(NaOH) = C × V = 0.100 mol/dm³ × (25.0 / 1000 dm³) = 0.00250 mol.",
          "3. Apply stoichiometric ratio: n(HCl) = n(NaOH) = 0.00250 mol.",
          "4. Determine acid concentration: C(HCl) = n / V = 0.00250 mol / (20.0 / 1000 dm³) = 0.125 mol/dm³.",
          "Chemical Verification: 0.125 M acid neutralizes exactly with basic titrant."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-chem-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "If 25.0 cm³ of 0.100 M NaOH requires 20.0 cm³ of monoprotic acid HCl for complete neutralization, what is the concentration of the acid?",
        options: [
          "0.125 mol/dm³ (M)",
          "0.080 mol/dm³ (M)",
          "0.250 mol/dm³ (M)",
          "0.050 mol/dm³ (M)"
        ],
        correctOptionIndex: 0,
        explanation: "n(NaOH) = 0.100 × 0.025 = 0.0025 mol. In a 1:1 reaction, n(HCl) = 0.0025 mol. Concentration C = 0.0025 mol / 0.020 dm³ = 0.125 M.",
        socraticHint: "Calculate the moles of NaOH, relate via the 1:1 mole ratio, and divide by the volume of acid in cubic decimeters (dm³)."
      }
    ];

    const tutorScript = `Welcome to this chemistry masterclass on ${context.topic}. Stoichiometric analysis connects microscopic molecular reactions to macroscopic laboratory measurements. Observe as we establish the balanced chemical equation, determine molar quantities, and calculate exact acid concentration.`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 08:00",
        startSeconds: 0,
        durationSeconds: durationSeconds,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Stoichiometry & Titration Mechanics",
        narrationScript: tutorScript,
        visualDescription: "Burette and conical flask volumetric setup with molecular reaction simulation.",
        visualCanvasType: "chemistry_molecular_reaction",
        keyTakeaway: "Chemical neutralization follows exact molar equivalence."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "chemistry_molecular_reaction"
    };
  }
}

// 3. BIOLOGY STRATEGY
export class BiologyStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "biology";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("bio") || t.includes("cell") || t.includes("mitosis") || t.includes("genetics") || t.includes("enzyme");
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-bio-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "BIOLOGY & CELLULAR SYSTEMS MASTERCLASS",
        content: `${context.topic} (Segment ${segNum} of ${totalSegments})`,
        detail: "Standard: Cambridge / WAEC Biology • Cytology & Chromosomal Mechanics",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-bio-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.15),
        actionType: "callout_alert",
        title: "BIOLOGICAL LAW: CONSERVATION OF CHROMOSOMAL PLOIDY",
        content: "Equational Division Invariant: Mitosis preserves genetic continuity by producing two daughter cells genetically identical to the parent cell (2n -> 2n).",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-bio-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "step_by_step_working",
        title: "CHROMOSOMAL TRAJECTORY THROUGH MITOTIC PHASES",
        content: "Sequential Cellular Mechanics:",
        subSteps: [
          "1. Prophase: Chromatin condenses into visible sister chromatids; nuclear envelope disintegrates.",
          "2. Metaphase: Chromosomes align along the equatorial spindle plane (metaphase plate).",
          "3. Anaphase: Spindle microtubules contract, cleaving centromeres and drawing sister chromatids to opposite poles.",
          "4. Telophase & Cytokinesis: Nuclear membranes reform, cleavage furrow divides cytoplasm into 2 identical diploid (2n) daughter cells."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-bio-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "A human somatic cell containing 46 chromosomes (2n) completes mitotic cell division. What is the chromosome count in each resulting daughter cell?",
        options: [
          "46 chromosomes (2n, genetically identical diploid cells)",
          "23 chromosomes (n, haploid gametes)",
          "92 chromosomes (4n, tetraploid)",
          "46 pairs, yielding 92 total"
        ],
        correctOptionIndex: 0,
        explanation: "Mitosis is equational division: DNA is duplicated in S-phase, and sister chromatids separate equally, ensuring both daughter cells maintain 46 chromosomes (2n).",
        socraticHint: "Distinguish between somatic equational division (mitosis) and gametic reduction division (meiosis)."
      }
    ];

    const tutorScript = `Welcome to this cellular biology masterclass on ${context.topic}. Mitosis ensures absolute genetic fidelity across generations of somatic cells. Notice how during anaphase, centromeres split so that each newly formed cell receives a complete, identical diploid set of genetic instructions.`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 08:00",
        startSeconds: 0,
        durationSeconds: durationSeconds,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Mitotic Cellular Progression",
        narrationScript: tutorScript,
        visualDescription: "Cellular diagram illustrating chromosomes aligning at equatorial plate and separating toward centrioles.",
        visualCanvasType: "biology_cellular_system",
        keyTakeaway: "Mitosis maintains chromosomal ploidy."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "biology_cellular_system"
    };
  }
}

// 4. COMPUTER SCIENCE STRATEGY
export class ComputerScienceStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "computer_science";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("comp") || s.includes("ict") || t.includes("algorithm") || t.includes("search") || t.includes("data structure");
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-cs-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "COMPUTER SCIENCE & ALGORITHMIC EFFICIENCY MASTERCLASS",
        content: `${context.topic} (Segment ${segNum} of ${totalSegments})`,
        detail: "Curriculum Standard: Cambridge CS / WAEC Informatics • Algorithmic Complexity O(log n)",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-cs-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.15),
        actionType: "callout_alert",
        title: "ALGORITHMIC INVARIANT: MONOTONIC SORTED PREREQUISITE",
        content: "Prerequisite Invariant: Binary search requires an array to be strictly ordered. At each step, comparing target with array[mid] halves the active search space.",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-cs-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "step_by_step_working",
        title: "POINTER TRACE & SEARCH SPACE HALVING",
        content: "Searching target 23 in sorted array [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]:",
        subSteps: [
          "1. Initial pointers: low = 0, high = 9. Mid = ⌊(0 + 9) / 2⌋ = 4 (value 16).",
          "2. Compare target with mid: 23 > 16 -> discard left half [0..4]. Update low = mid + 1 = 5.",
          "3. Second iteration: low = 5, high = 9. Mid = ⌊(5 + 9) / 2⌋ = 7 (value 45).",
          "4. Compare target with mid: 23 < 45 -> discard right half [7..9]. Update high = mid - 1 = 6.",
          "5. Third iteration: low = 5, high = 6. Mid = ⌊(5 + 6) / 2⌋ = 5 (value 23). Match found!",
          "Algorithmic Conclusion: Located target at index 5 in exactly 3 comparisons. Time complexity: O(log n)."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-cs-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "What is the maximum number of comparisons Binary Search requires to locate an element in a sorted array of 1,024 elements?",
        options: [
          "10 comparisons (since 2¹⁰ = 1024)",
          "512 comparisons",
          "1,024 comparisons",
          "1 comparison"
        ],
        correctOptionIndex: 0,
        explanation: "Binary search cuts the search domain in half at each step: log₂(1024) = 10 comparisons in the worst-case scenario.",
        socraticHint: "Compute the base-2 logarithm of 1024."
      }
    ];

    const tutorScript = `Welcome to this computer science masterclass on ${context.topic}. Binary search is the archetypal divide-and-conquer algorithm. By maintaining the invariant of a sorted collection, we discard half of the remaining elements with every single comparison, achieving logarithmic time complexity O(log n).`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 08:00",
        startSeconds: 0,
        durationSeconds: durationSeconds,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Logarithmic Search Space Halving",
        narrationScript: tutorScript,
        visualDescription: "Array pointer visualizer showing low, mid, and high pointers updating dynamically.",
        visualCanvasType: "compsci_algorithm_visualizer",
        keyTakeaway: "Binary search achieves O(log n) efficiency."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "compsci_algorithm_visualizer"
    };
  }
}

// 5. ENGINEERING STRATEGY
export class EngineeringStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "engineering";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("engineer") || s.includes("tech_mech") || t.includes("beam") || t.includes("statics") || t.includes("schematic");
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-engr-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "STRUCTURAL ENGINEERING & STATICS MASTERCLASS",
        content: `${context.topic} (Segment ${segNum} of ${totalSegments})`,
        detail: "Standard: Cambridge / WAEC Technical Engineering • Shear Force & Bending Moment",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-engr-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.15),
        actionType: "callout_alert",
        title: "STRUCTURAL MECHANICS INVARIANT: EQUILIBRIUM COUPLING",
        content: "Statics Principle: In any loaded beam, the maximum bending moment occurs where the shear force diagram crosses the zero line (dM/dx = V = 0).",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-engr-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "step_by_step_working",
        title: "SIMPLY SUPPORTED BEAM STATICS ANALYSIS",
        content: "Span L = 6.0 m with central point load P = 10 kN at midspan (x = 3.0 m):",
        subSteps: [
          "1. Vertical Equilibrium: ΣFy = 0 ⟹ Ra + Rb = 10 kN.",
          "2. Support Symmetry: Ra = Rb = 5.0 kN.",
          "3. Shear Force Diagram: V(x) = +5.0 kN for 0 ≤ x < 3 m; V(x) = -5.0 kN for 3 m < x ≤ 6 m.",
          "4. Maximum Bending Moment: M_max = (P × L) / 4 = (10 kN × 6.0 m) / 4 = 15.0 kN·m at x = 3.0 m.",
          "Structural Verification: Support reactions equilibrate applied load; maximum moment is internal tensile/compressive limit."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-engr-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "In structural beam mechanics, at which point along the span does the maximum bending moment occur?",
        options: [
          "Directly where the shear force diagram passes through zero (V = 0)",
          "At the extreme left support where shear is maximum",
          "At the right support roller",
          "At any arbitrary point regardless of loading"
        ],
        correctOptionIndex: 0,
        explanation: "Differential relation of beam mechanics: dM/dx = V(x). The bending moment reaches a mathematical extremum (peak) where its first derivative (shear force) equals zero.",
        socraticHint: "Think calculus: where does a continuous function reach its maximum? Where its derivative equals zero!"
      }
    ];

    const tutorScript = `Welcome to this engineering masterclass on ${context.topic}. Structural design requires predicting internal stress distributions to prevent catastrophic failure. Observe how support reactions maintain global equilibrium and how the shear force crossing zero pinpoints maximum bending moment.`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 08:00",
        startSeconds: 0,
        durationSeconds: durationSeconds,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Beam Equilibrium & Moment Diagrams",
        narrationScript: tutorScript,
        visualDescription: "Simply supported beam schematic with shear force and bending moment diagrams.",
        visualCanvasType: "engineering_technical_schematic",
        keyTakeaway: "Maximum moment coincides with zero shear force."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "engineering_technical_schematic"
    };
  }
}

// 6. ECONOMICS STRATEGY
export class EconomicsStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "economics";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("econ") || t.includes("equilibrium") || t.includes("elasticity");
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-econ-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "ECONOMICS & MARKET EQUILIBRIUM MASTERCLASS",
        content: `${context.topic} (Segment ${segNum} of ${totalSegments})`,
        detail: "Standard: Cambridge / WAEC Economics • Microeconomic Price Mechanics",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-econ-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.15),
        actionType: "callout_alert",
        title: "MARKET CLEARING PRINCIPLE",
        content: "Equilibrium Condition: At clearing price P*, quantity demanded equals quantity supplied (Qd = Qs). Excess demand causes upward price pressure.",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-econ-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "step_by_step_working",
        title: "EQUILIBRIUM DETERMINATION & SUPPLY SHOCK",
        content: "Demand: Qd = 100 - 2P; Supply: Qs = 20 + 2P:",
        subSteps: [
          "1. Set market clearing condition: 100 - 2P = 20 + 2P.",
          "2. Solve for equilibrium price: 4P = 80 ⟹ P* = $20.",
          "3. Determine equilibrium quantity: Q* = 100 - 2(20) = 60 units.",
          "4. Inward supply shock (Qs' = 2P): 100 - 2P = 2P ⟹ 4P = 100 ⟹ P*' = $25, Q*' = 50 units.",
          "Economic Interpretation: Supply contraction raises clearing price and reduces market volume."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-econ-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "If Qd = 100 - 2P and Qs = 20 + 2P, what are the market clearing price (P*) and quantity (Q*)?",
        options: [
          "P* = $20, Q* = 60 units",
          "P* = $30, Q* = 40 units",
          "P* = $10, Q* = 80 units",
          "P* = $25, Q* = 50 units"
        ],
        correctOptionIndex: 0,
        explanation: "100 - 2P = 20 + 2P -> 4P = 80 -> P = 20. Q = 100 - 2(20) = 60.",
        socraticHint: "Set Qd equal to Qs and solve for P."
      }
    ];

    const tutorScript = `Welcome to this economics masterclass on ${context.topic}. Market prices coordinate economic activity without central administration. Watch as supply and demand curves intersect to determine optimal price and output.`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 08:00",
        startSeconds: 0,
        durationSeconds: durationSeconds,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Supply, Demand & Price Equilibrium",
        narrationScript: tutorScript,
        visualDescription: "Interactive supply and demand curve graph with shifting equilibrium points.",
        visualCanvasType: "economics_market_equilibrium",
        keyTakeaway: "Equilibrium balances quantity demanded and supplied."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "economics_market_equilibrium"
    };
  }
}

// 7. FINANCIAL LITERACY STRATEGY
export class FinancialLiteracyStrategy implements SubjectPedagogicalStrategy {
  public category: SubjectCategory = "financial_literacy";

  public canHandle(subjectId: string, topicTitle: string): boolean {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();
    return s.includes("fin") || t.includes("compound interest") || t.includes("budget") || t.includes("saving");
  }

  public generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
  }): MasterclassSynchronizedOutput {
    const { context, segNum, totalSegments, durationSeconds } = params;

    const smartBoardActions: SmartBoardAction[] = [
      {
        id: `sb-fin-${segNum}-1`,
        timeSeconds: 0,
        actionType: "write_heading",
        title: "FINANCIAL LITERACY & COMPOUND WEALTH MASTERCLASS",
        content: `${context.topic} (Segment ${segNum} of ${totalSegments})`,
        detail: "Practical Wealth Mechanics • Compounding Horizons",
        zone: "main_canvas",
        highlightColor: "amber",
        pedagogicalPhase: "teacher_intro"
      },
      {
        id: `sb-fin-${segNum}-2`,
        timeSeconds: Math.floor(durationSeconds * 0.15),
        actionType: "callout_alert",
        title: "FINANCIAL PRINCIPLE: TIME VALUE OF MONEY",
        content: "Exponential Compounding: A = P(1 + r/n)^(nt). Reinvested returns generate compounding yield over extended time horizons.",
        zone: "right_sidebar",
        highlightColor: "cyan",
        pedagogicalPhase: "prior_knowledge"
      },
      {
        id: `sb-fin-${segNum}-3`,
        timeSeconds: Math.floor(durationSeconds * 0.35),
        actionType: "step_by_step_working",
        title: "COMPOUND WEALTH ACCUMULATION EVALUATION",
        content: "Principal P = $1,000 invested at annual rate r = 8% compounded annually over 10 years:",
        subSteps: [
          "1. Growth Factor: (1 + 0.08) = 1.08.",
          "2. 10-Year Multiplier: 1.08¹⁰ ≈ 2.1589.",
          "3. Accumulated Balance: A = $1,000 × 2.1589 = $2,158.92.",
          "4. Total Interest Earned: $1,158.92 (interest exceeds initial principal).",
          "Financial Takeaway: Disciplined early accumulation leverages the exponential power of compounding."
        ],
        zone: "main_canvas",
        highlightColor: "emerald",
        pedagogicalPhase: "summary_synthesis"
      }
    ];

    const checkpoints: VideoCheckpointQuestion[] = [
      {
        id: `chk-fin-${segNum}-1`,
        triggerTimeSeconds: Math.floor(durationSeconds * 0.50),
        questionText: "Using the Rule of 72, approximately how many years will it take for an investment to double in value at an annual compound interest rate of 8%?",
        options: [
          "9 years (72 / 8 = 9)",
          "12 years",
          "6 years",
          "15 years"
        ],
        correctOptionIndex: 0,
        explanation: "The Rule of 72 provides a quick mental estimation: 72 / 8 = 9 years to double.",
        socraticHint: "Divide 72 by the annual percentage rate (8)."
      }
    ];

    const tutorScript = `Welcome to this financial literacy masterclass on ${context.topic}. Compound interest is the engine of long-term financial security. Observe how reinvesting returns creates accelerating geometric growth.`;

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 08:00",
        startSeconds: 0,
        durationSeconds: durationSeconds,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Compound Growth Mechanics",
        narrationScript: tutorScript,
        visualDescription: "Exponential wealth accumulation chart comparing simple vs compound growth.",
        visualCanvasType: "general_pedagogical_canvas",
        keyTakeaway: "Compounding rewards early and consistent investment."
      }
    ];

    return {
      tutorScript,
      smartBoardActions,
      storyboard: scenes,
      checkpoints,
      visualEngine: "general_pedagogical_canvas"
    };
  }
}
