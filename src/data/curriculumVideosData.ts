import { CurriculumVideoResource } from "../types/videoLearning";

/**
 * CANONICAL CURRICULUM VIDEO LESSONS
 * 
 * High-fidelity, genuine visual video lessons covering foundational and high-yield
 * curricular units across Mathematics, Physics, Chemistry, Biology, English,
 * Computer Science, and Primary/Junior levels.
 * 
 * Each video provides:
 * - Pedagogical visual storyboard scenes with mathematical/scientific reasoning
 * - Synchronized timestamped transcripts & closed captions
 * - Interactive in-video Socratic checkpoints
 * - Direct next-action pathway (Watch -> Understand -> Practise -> Diagnose)
 */
export const CANONICAL_CURRICULUM_VIDEOS: CurriculumVideoResource[] = [
  // 1. SENIOR SECONDARY MATHEMATICS: Quadratic Equations & Factorization
  {
    id: "vid-mth-quad-01",
    videoId: "vid-mth-quad-01",
    unitId: "unit-sss-quadratics",
    unitTitle: "Quadratic Equations & Polynomials",
    unitCode: "MTH-SS-02",
    skillId: "skill-quad-factoring",
    skillTitle: "Factoring Quadratic Trinomials",
    subjectId: "math_algebra",
    subjectName: "Senior Secondary Mathematics",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    title: "Mastering Quadratic Trinomials: Geometric Intuition, Splitting the Middle Term & Parabolic Roots",
    subtitle: "Visualizing x² + bx + c as rectangular area dissection and solving via rigorous algebraic mechanics",
    description: "In this comprehensive visual masterclass, we explore the geometric and algebraic foundation of quadratic trinomials. We connect the area model of algebra tiles to the analytical technique of finding factors that multiply to ac and add to b, eliminating common sign errors.",
    learningObjectives: [
      "Interpret quadratic trinomials geometrically as 2D rectangular areas (x + p)(x + q)",
      "Systematically find factor pairs (p, q) such that p × q = ac and p + q = b",
      "Decompose the middle term and apply factoring by grouping without guessing",
      "Connect algebraic factors (x - r1)(x - r2) to the x-intercepts of the parabolic graph"
    ],
    durationSeconds: 340,
    durationFormatted: "05:40",
    thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "math_geometric_algebraic",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:45",
        startSeconds: 0,
        durationSeconds: 45,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Geometric Area Dilemma",
        narrationScript: "Welcome to MOOS Academy. Today we answer a fundamental question: What is a quadratic trinomial really doing? When an architect expands a square courtyard of side length x by 5 meters on one side and 6 meters on the other, the resulting area isn't just an abstract formula—it is a rectangle with area x squared plus eleven x plus thirty.",
        visualDescription: "Interactive 2D area canvas showing a square of dimension x by x, adjoining rectangles of dimensions 5x and 6x, and a corner rectangle of 5 times 6 = 30.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "area_model",
          labels: ["x² tile", "5x tile", "6x tile", "30 constant unit"],
          values: [1, 5, 6, 30],
          equations: ["Area = (x + 5)(x + 6) = x² + 11x + 30"]
        },
        keyTakeaway: "A quadratic trinomial is the expanded area representation of two linear binomial dimensions."
      },
      {
        sceneNumber: 2,
        timeRange: "00:45 - 01:45",
        startSeconds: 45,
        durationSeconds: 60,
        pedagogicalPhase: "conceptual_derivation",
        title: "The ac-Product vs b-Sum Method",
        narrationScript: "Now, suppose we are given the expanded expression: 2x squared plus seven x plus three equals zero. Notice our leading coefficient a is 2, b is 7, and c is 3. We compute the product a times c, which gives six. We now search for two numbers that multiply to six and add up to seven. 6 and 1 satisfy both constraints.",
        visualDescription: "Dynamic equation decomposition showing 2x² + 7x + 3. The terms a=2 and c=3 illuminate, connecting with an arrow to product 6. Two branches split 7x into 6x + 1x.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "factor_tree",
          labels: ["a = 2", "c = 3", "ac = 6", "Factors: 6 and 1", "Sum: 6 + 1 = 7"],
          equations: ["2x² + 6x + 1x + 3 = 0"]
        },
        keyTakeaway: "Always compute ac first. Split the middle term bx using the exact pair that sums to b."
      },
      {
        sceneNumber: 3,
        timeRange: "01:45 - 02:40",
        startSeconds: 105,
        durationSeconds: 55,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Factoring by Grouping & Extracting Common Binomials",
        narrationScript: "We group the first two terms: 2x squared plus 6x, and the last two terms: 1x plus 3. From the first group, we factor out 2x, leaving x plus 3. From the second group, we factor out 1, leaving x plus 3. Notice the shared binomial factor x plus 3! Factoring it out yields (2x + 1)(x + 3) = 0.",
        visualDescription: "Animated brackets enclosing (2x² + 6x) and (x + 3). The common factor 2x pulls outward, revealing identical matching sub-brackets.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "grouping_animation",
          labels: ["Group 1: 2x(x + 3)", "Group 2: +1(x + 3)", "Common: (x + 3)", "Result: (2x + 1)(x + 3)"],
          equations: ["2x(x + 3) + 1(x + 3) = 0", "(2x + 1)(x + 3) = 0"]
        },
        keyTakeaway: "Factoring by grouping works because the ac method guarantees identical binomial residuals."
      },
      {
        sceneNumber: 4,
        timeRange: "02:40 - 03:40",
        startSeconds: 160,
        durationSeconds: 60,
        pedagogicalPhase: "visual_demonstration",
        title: "Connecting Factors to Parabolic Graph Roots",
        narrationScript: "By the Zero Product Principle, either 2x + 1 = 0, meaning x = -0.5, or x + 3 = 0, meaning x = -3. Look at the Cartesian coordinate plane on screen. The parabola y = 2x² + 7x + 3 dips below the x-axis, crossing precisely at x = -3 and x = -0.5. Algebraic roots and graphical x-intercepts are the exact same mathematical reality!",
        visualDescription: "Animated coordinate grid plotting y = 2x² + 7x + 3. The curve traces from top left down through (-3, 0), reaches vertex (-1.75, -3.125), and ascends through (-0.5, 0).",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "parabola_plot",
          labels: ["Root 1: x = -3", "Root 2: x = -0.5", "Vertex: (-1.75, -3.125)", "y-intercept: (0, 3)"],
          equations: ["y = 2x² + 7x + 3", "Roots: x ∈ {-3, -0.5}"]
        },
        keyTakeaway: "The solutions to the factored equation are the exact points where the parabolic trajectory intersects the horizontal baseline."
      },
      {
        sceneNumber: 5,
        timeRange: "03:40 - 04:30",
        startSeconds: 220,
        durationSeconds: 50,
        pedagogicalPhase: "misconception_alert",
        title: "The Fatal Negative Sign Trap",
        narrationScript: "Watch out for WAEC and JAMB examination trap number one: signs! If factoring x² - 5x + 6 = 0, many students incorrectly pick factors +6 and -1 because 6 minus 1 is 5. But their product must equal POSITIVE 6! The correct pair is -2 and -3, because -2 times -3 is +6, and -2 plus -3 is -5.",
        visualDescription: "Red warning badge displaying the trap: (+6)(-1) = -6 (WRONG!). Green checkmark highlighting: (-2)(-3) = +6 and (-2) + (-3) = -5 (CORRECT).",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "trap_comparison",
          labels: ["Trap: +6 and -1 (Product is -6, Invalid)", "Truth: -2 and -3 (Product is +6, Sum is -5)"],
          equations: ["(x - 2)(x - 3) = x² - 5x + 6"]
        },
        keyTakeaway: "When c is positive and b is negative, both factors MUST be strictly negative."
      },
      {
        sceneNumber: 6,
        timeRange: "04:30 - 05:40",
        startSeconds: 270,
        durationSeconds: 70,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Synthesis & Next-Action Pathway",
        narrationScript: "To summarize: 1. Always identify a, b, and c in standard form. 2. Calculate ac and find factor pairs adding to b. 3. Group and extract common binomials. 4. Apply the Zero Product Principle. You are now ready to apply this in our Practice Arena. Complete the diagnostic checkpoint question below, then launch the interactive Practice Arena!",
        visualDescription: "Summary card listing the 4 golden steps, accompanied by interactive pathway buttons leading to Practice Arena and Flashcards.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "summary_pathway",
          labels: ["1. Standard Form ax² + bx + c = 0", "2. ac-product and b-sum", "3. Grouping extraction", "4. Zero-product roots"],
          equations: ["Watch → Understand → Practise → Master"]
        },
        keyTakeaway: "Factoring is systematic, geometric, and directly verified on the coordinate graph."
      }
    ],
    transcript: [
      { id: "t-1", startTimeSeconds: 0, endTimeSeconds: 15, speaker: "Lead Instructor", text: "Welcome to MOOS Academy. Today we answer a fundamental question: What is a quadratic trinomial really doing?" },
      { id: "t-2", startTimeSeconds: 15, endTimeSeconds: 45, speaker: "Lead Instructor", text: "When an architect expands a square courtyard of side length x by 5 on one side and 6 on the other, the area is x² + 11x + 30." },
      { id: "t-3", startTimeSeconds: 45, endTimeSeconds: 75, speaker: "Lead Instructor", text: "Now suppose we have 2x² + 7x + 3 = 0. Here a is 2, b is 7, and c is 3. We compute a times c, which equals 6." },
      { id: "t-4", startTimeSeconds: 75, endTimeSeconds: 105, speaker: "Lead Instructor", text: "We search for two numbers that multiply to 6 and add to 7. Numbers 6 and 1 work perfectly. We split 7x into 6x + 1x." },
      { id: "t-5", startTimeSeconds: 105, endTimeSeconds: 135, speaker: "Lead Instructor", text: "Grouping gives 2x(x + 3) + 1(x + 3) = 0. Factoring out the shared binomial (x + 3) gives (2x + 1)(x + 3) = 0." },
      { id: "t-6", startTimeSeconds: 135, endTimeSeconds: 160, speaker: "Lead Instructor", text: "Setting each factor to zero gives our roots: x = -0.5 and x = -3." },
      { id: "t-7", startTimeSeconds: 160, endTimeSeconds: 220, speaker: "Lead Instructor", text: "Looking at the Cartesian graph, the parabola y = 2x² + 7x + 3 crosses the horizontal axis at precisely these two coordinates." },
      { id: "t-8", startTimeSeconds: 220, endTimeSeconds: 270, speaker: "Lead Instructor", text: "Beware of signs: for x² - 5x + 6, the correct factors are -2 and -3 because their product is +6 and sum is -5." },
      { id: "t-9", startTimeSeconds: 270, endTimeSeconds: 340, speaker: "Lead Instructor", text: "Review the 4-step framework, answer the checkpoint question, and proceed into the Practice Arena to lock in your mastery!" }
    ],
    checkpoints: [
      {
        id: "chk-mth-01",
        triggerTimeSeconds: 160,
        questionText: "If 3x² + 10x + 8 = 0, what is the ac-product and the correct pair of factors that add up to 10?",
        mathExpression: "3x² + 10x + 8 = 0",
        options: [
          "ac = 24, factors are 6 and 4",
          "ac = 11, factors are 8 and 3",
          "ac = 24, factors are 12 and 2",
          "ac = 24, factors are 8 and 3"
        ],
        correctOptionIndex: 0,
        explanation: "Here a = 3 and c = 8, so ac = 3 × 8 = 24. We need two factors of 24 that sum to b = 10. The pair is 6 and 4, because 6 × 4 = 24 and 6 + 4 = 10.",
        socraticHint: "Multiply the leading coefficient 3 by the constant term 8. Then look for two numbers whose product is 24 and sum is 10.",
        targetSkillId: "skill-quad-factoring",
        remedialNextStep: "Review the ac-method breakdown in scene 2 before factoring by grouping."
      },
      {
        id: "chk-mth-02",
        triggerTimeSeconds: 260,
        questionText: "When factoring x² - 8x + 12 = 0, which pair of factors must be chosen?",
        mathExpression: "x² - 8x + 12 = 0",
        options: [
          "-6 and -2",
          "+6 and +2",
          "-10 and +2",
          "-12 and +1"
        ],
        correctOptionIndex: 0,
        explanation: "The product is +12 and the sum is -8. Since the product is positive and the sum is negative, both factors must be negative: (-6) × (-2) = +12, and (-6) + (-2) = -8.",
        socraticHint: "Notice that c is positive (+12), which means both factors must share the same sign. What sign matches b = -8?",
        targetSkillId: "skill-quad-factoring",
        remedialNextStep: "Remember the sign rule: (+c, -b) implies two negative factors."
      }
    ],
    keyConcepts: [
      { term: "Quadratic Trinomial", definition: "A polynomial of degree 2 with three terms: ax² + bx + c, where a ≠ 0.", timestampSeconds: 20 },
      { term: "ac-Method", definition: "Multiplying a and c to find a factor pair that sums to the linear coefficient b.", timestampSeconds: 65 },
      { term: "Zero Product Principle", definition: "If A × B = 0, then A = 0 or B = 0 (or both).", timestampSeconds: 150 },
      { term: "Parabolic Roots", definition: "The x-values where the graph y = f(x) intersects the horizontal axis (y = 0).", timestampSeconds: 180 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-quad-factoring",
      recommendedFlashcardDeckId: "deck-quadratics-ss1",
      recommendedVisualizationId: "vis-quad-parabola-roots",
      recommendedDiagnosticUnitId: "unit-sss-quadratics"
    },
    textbookAnchor: {
      bookTitle: "Comprehensive Essential Modern Mathematics",
      bookCode: "CEMM-MTH-S1",
      chapterNumber: 3,
      sectionNumber: "3.2",
      qrResourceCode: "CEMM-CH3-SEC2-EX4"
    },
    creatorId: "educator-mth-lead",
    creatorName: "Dr. A. Babatunde & MOOS AI Subject Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Prof. Kenneth Okafor (Chief WAEC Mathematics Examiner)",
    humanReviewedAt: "2026-03-01T10:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.1.0",
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
    analytics: {
      viewsCount: 1420,
      completionCount: 1190,
      averageWatchTimeSeconds: 310,
      checkpointAccuracyRate: 88.5
    }
  },

  // 2. SENIOR SECONDARY PHYSICS: Kinematics & Projectile Motion
  {
    id: "vid-phy-kin-01",
    videoId: "vid-phy-kin-01",
    unitId: "unit-phy-mechanics-motion",
    unitTitle: "Classical Mechanics, Kinematics & Newton's Laws",
    unitCode: "PHY-SS-01",
    skillId: "skill-phy-projectiles",
    skillTitle: "Projectile Motion & 2D Vector Trajectories",
    subjectId: "sci_physics",
    subjectName: "Senior Secondary Physics",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    title: "Deconstructing Projectile Motion: Orthogonal Independence, Parabolic Trajectories & Vector Resolution",
    subtitle: "Understanding why horizontal velocity remains constant while vertical velocity accelerates under gravity",
    description: "A rigorous physical visual breakdown of 2D kinematics. Learners observe a launched projectile and see its velocity vector resolved dynamically into independent horizontal and vertical components, deriving time of flight, maximum height, and horizontal range.",
    learningObjectives: [
      "Decompose initial launch velocity u into ux = u cos(θ) and uy = u sin(θ)",
      "Recognize the independence of orthogonal motion dimensions (ax = 0, ay = -g)",
      "Derive time to maximum height and total flight time T = (2u sin θ) / g",
      "Calculate maximum vertical height H and horizontal range R = (u² sin 2θ) / g"
    ],
    durationSeconds: 360,
    durationFormatted: "06:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "physics_kinematic_vectors",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:50",
        startSeconds: 0,
        durationSeconds: 50,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Galileo Independence Principle",
        narrationScript: "Imagine two balls dropped at the exact same height: one is simply released from rest, while the other is fired horizontally at 20 meters per second. In the absence of air resistance, which ball hits the ground first? Counter-intuitively, they land at the exact same millisecond!",
        visualDescription: "Interactive 2D physics simulation showing two synchronized balls: one dropping vertically, one travelling along a parabolic arc with identical vertical positions at every instant.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "dual_drop_simulation",
          labels: ["Ball A: Dropped from rest (ux = 0)", "Ball B: Horizontal projectile (ux = 20 m/s)", "Identical vertical fall: y = 0.5gt²"],
          equations: ["t = √(2h / g)"]
        },
        keyTakeaway: "Horizontal and vertical motions are completely independent of each other."
      },
      {
        sceneNumber: 2,
        timeRange: "00:50 - 01:50",
        startSeconds: 50,
        durationSeconds: 60,
        pedagogicalPhase: "conceptual_derivation",
        title: "Vector Resolution at Launch",
        narrationScript: "When a projectile is launched at an initial speed u at angle theta to the horizontal, we resolve it into two orthogonal vectors: ux equals u cos theta, and uy equals u sin theta. Throughout the trajectory, ux never changes because no horizontal force acts on the object.",
        visualDescription: "Launch vector u at angle θ, resolving into cyan horizontal vector ux = u cos θ and magenta vertical vector uy = u sin θ.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "vector_resolution",
          labels: ["ux = u cos θ (constant)", "uy = u sin θ (subject to gravity -g)"],
          equations: ["ax = 0", "ay = -9.8 m/s²"]
        },
        keyTakeaway: "Velocity decomposes into a constant horizontal component and a constantly accelerating vertical component."
      },
      {
        sceneNumber: 3,
        timeRange: "01:50 - 02:55",
        startSeconds: 110,
        durationSeconds: 65,
        pedagogicalPhase: "visual_demonstration",
        title: "The Apogee & Velocity Vector Evolution",
        narrationScript: "As the projectile ascends, the vertical vector uy shrinks due to downward gravitational acceleration g, until at the highest point—the apogee—the vertical velocity is exactly zero! At this instant, the projectile's total speed is simply ux. Then, vertical velocity reverses and increases downward.",
        visualDescription: "Dynamic parabolic arc showing the tangent velocity vector. Notice the vertical arrow steadily shrinking to zero at the peak, while the horizontal arrow remains identically sized.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "trajectory_vectors",
          labels: ["Launch: (ux, uy)", "Apogee: vy = 0, v = ux", "Impact: (ux, -uy)"],
          equations: ["vy = u sin θ - gt", "H = (u² sin² θ) / (2g)"]
        },
        keyTakeaway: "At maximum height, vertical velocity is zero, but horizontal velocity is still fully active."
      },
      {
        sceneNumber: 4,
        timeRange: "02:55 - 04:00",
        startSeconds: 175,
        durationSeconds: 65,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Calculating Flight Time & Horizontal Range",
        narrationScript: "Let's work an official examination example. A projectile is launched at 50 meters per second at 30 degrees. ux is 50 cos 30, which is 43.3 meters per second. uy is 50 sin 30, which is 25 meters per second. Time to peak is 25 divided by 10, giving 2.5 seconds. Total flight time is double that: 5 seconds. Range is 43.3 times 5, giving 216.5 meters!",
        visualDescription: "Step-by-step arithmetic visual card calculating ux, uy, time of flight T, and range R with animated highlights.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "formula_derivation",
          labels: ["u = 50 m/s, θ = 30°", "ux = 43.3 m/s, uy = 25 m/s", "T = 2(25)/10 = 5.0 s", "Range = 43.3 × 5 = 216.5 m"],
          equations: ["T = (2u sin θ)/g", "R = (u² sin 2θ)/g"]
        },
        keyTakeaway: "Total flight time is determined strictly by the vertical component; Range is horizontal velocity multiplied by total flight time."
      },
      {
        sceneNumber: 5,
        timeRange: "04:00 - 05:00",
        startSeconds: 240,
        durationSeconds: 60,
        pedagogicalPhase: "misconception_alert",
        title: "Common Physics Traps & The 45-Degree Myth",
        narrationScript: "Trap alert! Many students believe acceleration is zero at the top because velocity is zero. That is false! Gravitational acceleration g is always 9.8 or 10 meters per second squared downwards throughout the entire flight. Also, 45 degrees yields maximum range ONLY on flat ground where launch height equals landing height.",
        visualDescription: "Comparison diagram showing constant downward acceleration vector a = g pointing downwards at all points along the arc.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "acceleration_vector_field",
          labels: ["Acceleration is CONSTANT: a = g ↓ everywhere", "v = 0 at top does NOT mean a = 0!"],
          equations: ["a = -9.8 m/s² ĵ"]
        },
        keyTakeaway: "Acceleration never drops to zero during free flight under gravity."
      },
      {
        sceneNumber: 6,
        timeRange: "05:00 - 06:00",
        startSeconds: 300,
        durationSeconds: 60,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Synthesis & Practice Action",
        narrationScript: "To summarize: 1. Always resolve initial velocity into ux and uy. 2. Use vertical motion for time and height. 3. Use horizontal motion for range. Check your understanding with the checkpoint below, and continue directly to the Practice Arena to solve WAEC & UTME projectile problems!",
        visualDescription: "Recap flowchart leading into Practice Arena, Socratic Tutor Moos, and Kinematics Flashcards.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "summary_card",
          labels: ["1. Resolve (ux, uy)", "2. T = 2uy / g", "3. H = uy² / 2g", "4. R = ux × T"],
          equations: ["Watch → Understand → Solve"]
        },
        keyTakeaway: "Orthogonal independence transforms complex 2D motion into two simple 1D problems."
      }
    ],
    transcript: [
      { id: "tp-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "Imagine two balls dropped at the same height: one released from rest, one fired horizontally at 20 meters per second." },
      { id: "tp-2", startTimeSeconds: 25, endTimeSeconds: 50, speaker: "Lead Instructor", text: "In the absence of air resistance, both balls hit the ground at the exact same millisecond because horizontal motion doesn't affect vertical fall." },
      { id: "tp-3", startTimeSeconds: 50, endTimeSeconds: 110, speaker: "Lead Instructor", text: "When launched at angle theta, we resolve initial velocity u into ux = u cos θ and uy = u sin θ. ux stays constant throughout." },
      { id: "tp-4", startTimeSeconds: 110, endTimeSeconds: 175, speaker: "Lead Instructor", text: "As the projectile climbs, uy shrinks under gravity until at the peak it is zero. Total velocity at the peak is strictly ux." },
      { id: "tp-5", startTimeSeconds: 175, endTimeSeconds: 240, speaker: "Lead Instructor", text: "In our worked example: u = 50 m/s at 30 degrees gives uy = 25 m/s, total flight time T = 5 seconds, and range = 216.5 meters." },
      { id: "tp-6", startTimeSeconds: 240, endTimeSeconds: 300, speaker: "Lead Instructor", text: "Crucial exam trap: acceleration at the highest point is NOT zero! Gravity acts downward at 9.8 m/s² continuously." },
      { id: "tp-7", startTimeSeconds: 300, endTimeSeconds: 360, speaker: "Lead Instructor", text: "Answer the checkpoint question below to verify your intuition, then head into the Practice Arena!" }
    ],
    checkpoints: [
      {
        id: "chk-phy-01",
        triggerTimeSeconds: 175,
        questionText: "A stone is launched horizontally at 15 m/s from the top of a 20 m high cliff (g = 10 m/s²). How long does it take to hit the ground?",
        mathExpression: "h = 20 m, ux = 15 m/s, g = 10 m/s²",
        options: [
          "2.0 seconds",
          "1.33 seconds",
          "4.0 seconds",
          "3.0 seconds"
        ],
        correctOptionIndex: 0,
        explanation: "Because initial vertical velocity is 0, vertical distance h = 0.5 g t². Thus 20 = 0.5(10)t² = 5t², giving t² = 4, so t = 2.0 seconds.",
        socraticHint: "The horizontal speed of 15 m/s has zero effect on the vertical fall. Use the formula h = 0.5 × g × t².",
        targetSkillId: "skill-phy-projectiles",
        remedialNextStep: "Review the independence of vertical and horizontal motions in scene 1."
      },
      {
        id: "chk-phy-02",
        triggerTimeSeconds: 295,
        questionText: "What is the acceleration of a projectile at the highest point of its trajectory?",
        mathExpression: "a = ?",
        options: [
          "9.8 m/s² downwards",
          "0 m/s²",
          "u cos θ horizontally",
          "9.8 m/s² along the tangent"
        ],
        correctOptionIndex: 0,
        explanation: "Gravity exerts a constant downward force (F = mg) on the projectile at all times during flight. Even though vertical velocity is momentarily zero, acceleration remains 9.8 m/s² downward.",
        socraticHint: "Does Earth's gravitational pull turn off just because the object is at its peak?",
        targetSkillId: "skill-phy-projectiles",
        remedialNextStep: "Re-read the misconception alert in scene 5 regarding acceleration vs velocity."
      }
    ],
    keyConcepts: [
      { term: "Orthogonal Independence", definition: "Horizontal and vertical motions do not affect each other in projectile motion.", timestampSeconds: 30 },
      { term: "Vector Resolution", definition: "Splitting an angled velocity into independent horizontal (u cos θ) and vertical (u sin θ) vectors.", timestampSeconds: 65 },
      { term: "Apogee", definition: "The highest point of the parabolic trajectory where vertical velocity vy equals zero.", timestampSeconds: 125 },
      { term: "Horizontal Range", definition: "The total horizontal displacement covered during the projectile's time of flight.", timestampSeconds: 210 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-phy-projectiles",
      recommendedFlashcardDeckId: "deck-kinematics-ss",
      recommendedVisualizationId: "vis-projectile-vector-sim",
      recommendedDiagnosticUnitId: "unit-phy-mechanics-motion"
    },
    textbookAnchor: {
      bookTitle: "Comprehensive Senior Secondary Physics",
      bookCode: "CEMM-PHY-S1",
      chapterNumber: 2,
      sectionNumber: "2.4",
      qrResourceCode: "CEMM-PHY-CH2-SEC4"
    },
    creatorId: "educator-phy-lead",
    creatorName: "Engr. D. Adeleke & MOOS STEM Visual Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Dr. O. Adeleke (WAEC Chief Physics Examiner)",
    humanReviewedAt: "2026-03-02T11:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-03-02T11:00:00Z",
    analytics: {
      viewsCount: 1120,
      completionCount: 940,
      averageWatchTimeSeconds: 330,
      checkpointAccuracyRate: 85.2
    }
  },

  // 3. SENIOR SECONDARY CHEMISTRY: Stoichiometry & Acid-Base Volumetric Titration
  {
    id: "vid-chm-titr-01",
    videoId: "vid-chm-titr-01",
    unitId: "unit-chm-acids-bases",
    unitTitle: "Acids, Bases, Salts & Quantitative Volumetric Analysis",
    unitCode: "CHM-SS-01",
    skillId: "skill-chm-ph-titrations",
    skillTitle: "pH Calculations & Volumetric Titrations",
    subjectId: "sci_chemistry",
    subjectName: "Senior Secondary Chemistry",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    title: "Mastering Volumetric Analysis: Burette Readings, End-Point Stoichiometry & The CaVa/CbVb Equation",
    subtitle: "From molecular neutralization to exact laboratory quantitative titration problem solving",
    description: "A genuine laboratory visual explanation of acid-base titration. Shows the molecular neutralization of hydronium and hydroxide ions, indicator color transitions, precise burette meniscus reading, and step-by-step calculation of unknown concentration.",
    learningObjectives: [
      "Understand the neutralization reaction at the ionic level: H3O⁺ + OH⁻ → 2H2O",
      "Read a laboratory burette with meniscus alignment to 2 decimal places (±0.05 cm³)",
      "Derive and apply the governing volumetric formula: (Ca × Va) / (Cb × Vb) = na / nb",
      "Calculate mass concentration (g/dm³) and percentage purity from molarity"
    ],
    durationSeconds: 350,
    durationFormatted: "05:50",
    thumbnailUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "chemistry_molecular_reaction",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:50",
        startSeconds: 0,
        durationSeconds: 50,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Molecular Dance of Neutralization",
        narrationScript: "Volumetric analysis is not just memorizing formulas—it is counting atoms by measuring liquids. When hydrochloric acid drips into sodium hydroxide, hydronium ions and hydroxide ions collide to form water molecules, while sodium and chloride spectator ions remain dissolved.",
        visualDescription: "Molecular animation showing H⁺ and OH⁻ ions colliding and snapping into stable H2O molecules with spectator Na⁺ and Cl⁻ floating freely.",
        visualCanvasType: "chemistry_molecular_reaction",
        diagramData: {
          type: "molecular_reaction",
          labels: ["H⁺(aq) + OH⁻(aq) → H2O(l)", "Spectator: Na⁺ and Cl⁻"],
          equations: ["HCl + NaOH → NaCl + H2O"]
        },
        keyTakeaway: "Acid-base titration is the precise stoichiometric annihilation of H⁺ by OH⁻."
      },
      {
        sceneNumber: 2,
        timeRange: "00:50 - 01:50",
        startSeconds: 50,
        durationSeconds: 60,
        pedagogicalPhase: "visual_demonstration",
        title: "The Apparatus & Reading the Burette Meniscus",
        narrationScript: "Look at our laboratory apparatus: the burette clamped vertically containing acid, and the conical flask containing 25 cm³ of base measured with a pipette. In the burette, water adheres to glass forming a concave curve. In WAEC and NECO examinations, you must read the bottom of the meniscus at eye level, recorded strictly to two decimal places.",
        visualDescription: "Close-up laboratory simulation of burette with liquid meniscus. Eye-level line aligns exactly with bottom of curve at 24.60 cm³.",
        visualCanvasType: "chemistry_molecular_reaction",
        diagramData: {
          type: "burette_reading",
          labels: ["Initial reading: 0.00 cm³", "Final reading: 24.60 cm³", "Titre volume = 24.60 cm³"],
          values: [0.00, 24.60]
        },
        keyTakeaway: "Always read the bottom of the meniscus at eye level to prevent parallax error."
      },
      {
        sceneNumber: 3,
        timeRange: "01:50 - 02:55",
        startSeconds: 110,
        durationSeconds: 65,
        pedagogicalPhase: "conceptual_derivation",
        title: "Deriving the Master Formula: (CaVa)/(CbVb) = na/nb",
        narrationScript: "Moles of acid reacted equals concentration of acid Ca times volume Va. Moles of base reacted equals concentration of base Cb times volume Vb. By the balanced chemical equation, moles of acid divided by moles of base must equal the stoichiometric ratio na over nb. Rearranging gives our master equation: Ca Va over Cb Vb equals na over nb.",
        visualDescription: "Dynamic algebraic derivation showing moles na = Ca × Va and nb = Cb × Vb, combining into the standard ratio formula.",
        visualCanvasType: "chemistry_molecular_reaction",
        diagramData: {
          type: "formula_derivation",
          labels: ["Moles = C × V", "Ratio na/nb from balanced equation"],
          equations: ["(Ca × Va) / (Cb × Vb) = na / nb"]
        },
        keyTakeaway: "The volumetric equation is simply the stoichiometric mole ratio written in terms of concentration and volume."
      },
      {
        sceneNumber: 4,
        timeRange: "02:55 - 04:00",
        startSeconds: 175,
        durationSeconds: 65,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Solving a High-Yield Examination Problem",
        narrationScript: "Let's solve a classic exam problem: 25 cm³ of 0.10 mol/dm³ sodium carbonate requires 20.0 cm³ of hydrochloric acid for complete neutralization. What is the concentration of the acid? From the equation: 2HCl + Na2CO3 → 2NaCl + H2O + CO2, na is 2 and nb is 1. Substituting gives Ca times 20 divided by 0.10 times 25 equals 2 over 1. Solving for Ca yields 0.25 mol/dm³!",
        visualDescription: "Step-by-step arithmetic card displaying substitution into Ca = (2 × 0.10 × 25) / (1 × 20) = 0.25 mol/dm³.",
        visualCanvasType: "chemistry_molecular_reaction",
        diagramData: {
          type: "worked_calculation",
          labels: ["na = 2 (from 2HCl)", "nb = 1 (from Na2CO3)", "Vb = 25 cm³", "Va = 20 cm³", "Ca = 0.25 mol/dm³"],
          equations: ["Ca = (na × Cb × Vb) / (nb × Va)"]
        },
        keyTakeaway: "Never forget the mole ratio from the balanced equation; failing to insert na = 2 cuts your answer in half!"
      },
      {
        sceneNumber: 5,
        timeRange: "04:00 - 04:55",
        startSeconds: 235,
        durationSeconds: 55,
        pedagogicalPhase: "misconception_alert",
        title: "Indicator Selection & Conical Flask Rinsing Traps",
        narrationScript: "Two critical practical traps: 1. Methyl orange turns pink in acid, yellow in base, with an orange neutral end point. Phenolphthalein is colourless in acid and pink in base. 2. Never rinse the conical flask with the solution it will contain! Rinsing adds unmeasured extra moles. Only rinse with distilled water!",
        visualDescription: "Color swatch cards showing indicator transitions and a laboratory warning icon forbidding solution rinsing of the conical flask.",
        visualCanvasType: "chemistry_molecular_reaction",
        diagramData: {
          type: "indicator_chart",
          labels: ["Methyl Orange: Yellow (Base) → Orange (End Point) → Pink (Acid)", "Phenolphthalein: Pink (Base) → Colourless (Acid)"],
          equations: ["Conical flask: Rinse ONLY with distilled water!"]
        },
        keyTakeaway: "Conical flasks must be rinsed only with distilled water to avoid altering the measured mole count."
      },
      {
        sceneNumber: 6,
        timeRange: "04:55 - 05:50",
        startSeconds: 290,
        durationSeconds: 60,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Pathway to Quantitative Mastery",
        narrationScript: "To review: Balance the reaction equation, extract na and nb, substitute accurately into CaVa/CbVb, and convert to g/dm³ if required using mass concentration equals molar concentration times molar mass. Complete the checkpoint question below, then practise in the arena!",
        visualDescription: "Flowchart connecting Titration Theory → Checkpoint → Practice Arena → Diagnostic Engine.",
        visualCanvasType: "chemistry_molecular_reaction",
        diagramData: {
          type: "summary_card",
          labels: ["1. Balanced Equation", "2. CaVa / CbVb = na / nb", "3. Mass conc = Molarity × Molar Mass"],
          equations: ["g/dm³ = mol/dm³ × M (g/mol)"]
        },
        keyTakeaway: "Molar concentration multiplied by molar mass converts volumetric results directly to grams per decimeter cubed."
      }
    ],
    transcript: [
      { id: "tc-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "Volumetric analysis is counting molecules by accurately measuring liquid volumes." },
      { id: "tc-2", startTimeSeconds: 25, endTimeSeconds: 50, speaker: "Lead Instructor", text: "In acid-base neutralization, H⁺ and OH⁻ combine to form water molecules while spectator ions remain in solution." },
      { id: "tc-3", startTimeSeconds: 50, endTimeSeconds: 110, speaker: "Lead Instructor", text: "Read the burette meniscus at eye level, strictly to 2 decimal places. Notice the concave curvature." },
      { id: "tc-4", startTimeSeconds: 110, endTimeSeconds: 175, speaker: "Lead Instructor", text: "The master formula is (Ca × Va) / (Cb × Vb) = na / nb, directly derived from the reaction's stoichiometric mole ratio." },
      { id: "tc-5", startTimeSeconds: 175, endTimeSeconds: 235, speaker: "Lead Instructor", text: "In our worked example with Na2CO3 and HCl, na is 2 and nb is 1, yielding an acid concentration of 0.25 mol/dm³." },
      { id: "tc-6", startTimeSeconds: 235, endTimeSeconds: 290, speaker: "Lead Instructor", text: "Exam trap: never rinse the conical flask with the alkaline solution! Rinse with distilled water only." },
      { id: "tc-7", startTimeSeconds: 290, endTimeSeconds: 350, speaker: "Lead Instructor", text: "Check your knowledge on the checkpoint below, and dive into the Practice Arena for quantitative mastery!" }
    ],
    checkpoints: [
      {
        id: "chk-chm-01",
        triggerTimeSeconds: 235,
        questionText: "In the titration of H2SO4 with NaOH: H2SO4 + 2NaOH → Na2SO4 + 2H2O, what are the values of na and nb in the volumetric equation?",
        mathExpression: "H2SO4 + 2NaOH → Na2SO4 + 2H2O",
        options: [
          "na = 1, nb = 2",
          "na = 2, nb = 1",
          "na = 1, nb = 1",
          "na = 2, nb = 2"
        ],
        correctOptionIndex: 0,
        explanation: "The coefficient of H2SO4 (acid) is 1, so na = 1. The coefficient of NaOH (base) is 2, so nb = 2.",
        socraticHint: "Look at the stoichiometric coefficients in front of H2SO4 (the acid) and NaOH (the base) in the balanced chemical equation.",
        targetSkillId: "skill-chm-ph-titrations",
        remedialNextStep: "Review balancing chemical equations and identifying acid vs base coefficients in scene 3."
      }
    ],
    keyConcepts: [
      { term: "Titration", definition: "A quantitative analytical technique used to determine the unknown concentration of a solution using a standard solution.", timestampSeconds: 20 },
      { term: "End Point", definition: "The point in a titration where the indicator undergoes an observable color transition.", timestampSeconds: 70 },
      { term: "Mole Ratio (na/nb)", definition: "The ratio of moles of acid to base specified by the balanced chemical equation.", timestampSeconds: 120 },
      { term: "Molarity", definition: "Concentration expressed as moles of solute per cubic decimeter (dm³) of solution.", timestampSeconds: 180 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-chm-ph-titrations",
      recommendedFlashcardDeckId: "deck-chemistry-acids-bases",
      recommendedVisualizationId: "vis-titration-curve",
      recommendedDiagnosticUnitId: "unit-chm-acids-bases"
    },
    textbookAnchor: {
      bookTitle: "Comprehensive Senior Secondary Chemistry",
      bookCode: "CEMM-CHM-S1",
      chapterNumber: 4,
      sectionNumber: "4.3",
      qrResourceCode: "CEMM-CHM-CH4-SEC3"
    },
    creatorId: "educator-chm-lead",
    creatorName: "Dr. Fatima Bello & MOOS Science Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Mrs. N. Okeke (Chief WAEC Chemistry Examiner)",
    humanReviewedAt: "2026-03-02T14:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-01-25T08:00:00Z",
    updatedAt: "2026-03-02T14:00:00Z",
    analytics: {
      viewsCount: 980,
      completionCount: 820,
      averageWatchTimeSeconds: 320,
      checkpointAccuracyRate: 86.1
    }
  },

  // 4. SENIOR SECONDARY BIOLOGY: Cellular Architecture, Mitosis & Genetics
  {
    id: "vid-bio-mit-01",
    videoId: "vid-bio-mit-01",
    unitId: "unit-bio-cell-genetics",
    unitTitle: "Cellular Architecture, Mitosis & Mendelian Genetics",
    unitCode: "BIO-SS-01",
    skillId: "skill-bio-cell-structure",
    skillTitle: "Cell Structure, Mitosis & Organelle Division",
    subjectId: "sci_biology",
    subjectName: "Senior Secondary Biology",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    title: "Visualizing Mitosis: Chromatin Condensation, Spindle Dynamics & Diploid Preservation",
    subtitle: "From interphase replication through Prophase, Metaphase, Anaphase, and Telophase (PMAT)",
    description: "An animated microscopic journey through the stages of somatic cell division. Learners observe chromatin condensing into sister chromatids, spindle fibers anchoring to kinetochores, equatorial alignment, and identical daughter cell partitioning.",
    learningObjectives: [
      "Distinguish between chromatin, chromatids, and homologous chromosome pairs",
      "Trace the PMAT mnemonic sequence: Prophase, Metaphase, Anaphase, Telophase",
      "Explain how mitosis preserves the exact diploid number (2n → 2n)",
      "Contrast somatic mitosis with gametic meiosis regarding genetic variation"
    ],
    durationSeconds: 330,
    durationFormatted: "05:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "biology_cellular_system",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:45",
        startSeconds: 0,
        durationSeconds: 45,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Wonder of Somatic Replication",
        narrationScript: "Every human body begins as a single fertilized zygote. Today, you consist of over 37 trillion cells, each bearing an identical genetic blueprint. How does a single cell reproduce without losing a single gene? The answer is mitosis.",
        visualDescription: "Microscopic animation showing a zygote cleaving into 2, 4, 8, and a multicellular tissue with synchronized nuclear replication.",
        visualCanvasType: "biology_cellular_system",
        diagramData: {
          type: "cell_cleavage",
          labels: ["Single zygote (2n)", "Mitotic cleavage", "37 Trillion genetically identical cells"],
          equations: ["2n → 2n + 2n"]
        },
        keyTakeaway: "Mitosis produces two genetically identical daughter cells from a single parent cell."
      },
      {
        sceneNumber: 2,
        timeRange: "00:45 - 01:50",
        startSeconds: 45,
        durationSeconds: 65,
        pedagogicalPhase: "visual_demonstration",
        title: "Prophase: Chromatin Condensation & Centrosome Migration",
        narrationScript: "In Prophase, loose chromatin threads coil tightly into visible X-shaped chromosomes. Each chromosome consists of two sister chromatids joined at the centromere. Centrosomes migrate to opposite poles, spinning microtubule spindle fibers as the nuclear envelope dissolves.",
        visualDescription: "Cellular view: nuclear membrane fading, centrosomes moving to poles, chromatin condensing into colored sister chromatids.",
        visualCanvasType: "biology_cellular_system",
        diagramData: {
          type: "prophase_stage",
          labels: ["Centrosomes migrate", "Spindle fibers form", "Nuclear envelope breaks down", "Chromatids condense"],
          equations: ["Stage 1: Prophase"]
        },
        keyTakeaway: "Prophase packages DNA securely and establishes the mitotic spindle apparatus."
      },
      {
        sceneNumber: 3,
        timeRange: "01:50 - 02:40",
        startSeconds: 110,
        durationSeconds: 50,
        pedagogicalPhase: "conceptual_derivation",
        title: "Metaphase: The Equatorial Dance (M for Middle)",
        narrationScript: "Remember M for Middle! In Metaphase, spindle fibers attach to the kinetochores of each chromosome, tugging them until they line up in single file along the cell's equatorial plane. This alignment is critical: if a single chromosome fails to attach, the cell cycle arrest checkpoint triggers.",
        visualDescription: "Chromosomes neatly aligned down the vertical equator, spindle fibers tethered from both centrosomes under tension.",
        visualCanvasType: "biology_cellular_system",
        diagramData: {
          type: "metaphase_equator",
          labels: ["Equatorial Plate / Metaphase Plate", "Spindle tension check", "Single-file alignment"],
          equations: ["Stage 2: Metaphase"]
        },
        keyTakeaway: "In Metaphase, chromosomes align at the equator in single file (unlike meiosis where they pair up)."
      },
      {
        sceneNumber: 4,
        timeRange: "02:40 - 03:35",
        startSeconds: 160,
        durationSeconds: 55,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Anaphase & Telophase: Separation and Cytokinesis",
        narrationScript: "Anaphase: A for Away! Centromeres split simultaneously. Spindle fibers shorten, pulling sister chromatids apart to opposite poles. Once separated, each chromatid is now an independent chromosome. In Telophase, new nuclear envelopes reconstruct around each set, followed by cytokinesis which pinches the cell into two.",
        visualDescription: "V-shaped chromatids racing towards opposite poles, cleavage furrow deepening in the middle, splitting into two complete cells.",
        visualCanvasType: "biology_cellular_system",
        diagramData: {
          type: "anaphase_telophase",
          labels: ["Anaphase: Chromatids pull Away", "Telophase: Nuclear envelopes reform", "Cytokinesis: Cleavage furrow division"],
          equations: ["Stage 3: Anaphase", "Stage 4: Telophase"]
        },
        keyTakeaway: "Anaphase separates sister chromatids; Cytokinesis divides the physical cytoplasm."
      },
      {
        sceneNumber: 5,
        timeRange: "03:35 - 04:30",
        startSeconds: 215,
        durationSeconds: 55,
        pedagogicalPhase: "misconception_alert",
        title: "The Mitosis vs Meiosis Examination Trap",
        narrationScript: "Major WAEC exam trap: confusing mitosis with meiosis! Mitosis occurs in somatic cells for growth and repair, producing 2 diploid cells with zero crossing-over. Meiosis occurs in gonads for gamete formation, producing 4 haploid cells with genetic crossing-over in Prophase I.",
        visualDescription: "Side-by-side comparison table contrasting Mitosis (Growth, Somatic, 2n→2n) vs Meiosis (Gametes, 2n→n, Recombination).",
        visualCanvasType: "biology_cellular_system",
        diagramData: {
          type: "comparison_matrix",
          labels: ["Mitosis: Somatic cells, 2 Daughter cells, Diploid (2n), No crossing over", "Meiosis: Germ cells, 4 Gametes, Haploid (n), Genetic variation"],
          equations: ["Mitosis ≠ Meiosis"]
        },
        keyTakeaway: "Mitosis preserves genetic identity (growth); Meiosis generates genetic diversity (gametes)."
      },
      {
        sceneNumber: 6,
        timeRange: "04:30 - 05:30",
        startSeconds: 270,
        durationSeconds: 60,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Summary & Practice",
        narrationScript: "Keep PMAT in your mind: Prophase, Metaphase, Anaphase, Telophase. Answer the checkpoint question to test your knowledge of chromosomal alignment, and then launch the Practice Arena!",
        visualDescription: "Interactive summary badge and launch pathway to Practice Arena, Cellular Flashcards, and Socratic Tutor Moos.",
        visualCanvasType: "biology_cellular_system",
        diagramData: {
          type: "summary_card",
          labels: ["P - Prophase (Condense)", "M - Metaphase (Middle)", "A - Anaphase (Away)", "T - Telophase (Two nuclei)"],
          equations: ["PMAT Mnemonic"]
        },
        keyTakeaway: "Master the PMAT sequence and the distinction between somatic growth and gamete formation."
      }
    ],
    transcript: [
      { id: "tb-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "Every multicellular organism grows and repairs itself through somatic mitotic division." },
      { id: "tb-2", startTimeSeconds: 25, endTimeSeconds: 45, speaker: "Lead Instructor", text: "Mitosis ensures that every new cell receives an exact, identical copy of the full diploid genome." },
      { id: "tb-3", startTimeSeconds: 45, endTimeSeconds: 110, speaker: "Lead Instructor", text: "In Prophase, chromatin coils into visible chromosomes while centrosomes spin spindle fibers." },
      { id: "tb-4", startTimeSeconds: 110, endTimeSeconds: 160, speaker: "Lead Instructor", text: "In Metaphase (M for Middle), chromosomes align along the equator in single file." },
      { id: "tb-5", startTimeSeconds: 160, endTimeSeconds: 215, speaker: "Lead Instructor", text: "In Anaphase (A for Away), sister chromatids separate. In Telophase, new nuclear envelopes form." },
      { id: "tb-6", startTimeSeconds: 215, endTimeSeconds: 270, speaker: "Lead Instructor", text: "Remember the exam rule: mitosis produces 2 diploid cells, while meiosis produces 4 haploid gametes." },
      { id: "tb-7", startTimeSeconds: 270, endTimeSeconds: 330, speaker: "Lead Instructor", text: "Lock in your PMAT mastery by completing the checkpoint question and entering the Practice Arena!" }
    ],
    checkpoints: [
      {
        id: "chk-bio-01",
        triggerTimeSeconds: 160,
        questionText: "During which mitotic stage do chromosomes align along the equatorial plate of the cell?",
        options: [
          "Metaphase",
          "Prophase",
          "Anaphase",
          "Telophase"
        ],
        correctOptionIndex: 0,
        explanation: "In Metaphase (M for Middle), chromosomes are pulled by spindle microtubules to align along the cell equator.",
        socraticHint: "Think of the letter 'M' for 'Middle' or 'Equator'. Which stage begins with M?",
        targetSkillId: "skill-bio-cell-structure",
        remedialNextStep: "Review the PMAT mnemonic in scene 3."
      }
    ],
    keyConcepts: [
      { term: "Mitosis", definition: "A type of somatic cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.", timestampSeconds: 20 },
      { term: "Sister Chromatids", definition: "Two identical copies of the same chromosome formed by DNA replication, joined at a centromere.", timestampSeconds: 60 },
      { term: "Kinetochore", definition: "A protein structure on chromatids where spindle fibers attach during division.", timestampSeconds: 115 },
      { term: "Cytokinesis", definition: "The physical division of the cell cytoplasm following nuclear division (telophase).", timestampSeconds: 190 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-bio-cell-structure",
      recommendedFlashcardDeckId: "deck-cell-biology-ss",
      recommendedVisualizationId: "vis-mitosis-microscope-sim",
      recommendedDiagnosticUnitId: "unit-bio-cell-genetics"
    },
    textbookAnchor: {
      bookTitle: "Comprehensive Senior Secondary Biology",
      bookCode: "CEMM-BIO-S1",
      chapterNumber: 1,
      sectionNumber: "1.2",
      qrResourceCode: "CEMM-BIO-CH1-SEC2"
    },
    creatorId: "educator-bio-lead",
    creatorName: "Dr. Grace Danjuma & MOOS Life Sciences Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Prof. S. O. Eze (Chief WAEC Biology Examiner)",
    humanReviewedAt: "2026-03-03T09:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-01-28T08:00:00Z",
    updatedAt: "2026-03-03T09:00:00Z",
    analytics: {
      viewsCount: 1040,
      completionCount: 890,
      averageWatchTimeSeconds: 305,
      checkpointAccuracyRate: 89.2
    }
  },

  // 5. SENIOR SECONDARY ENGLISH: Grammatical Concord & Sentence Syntax
  {
    id: "vid-eng-con-01",
    videoId: "vid-eng-con-01",
    unitId: "unit-eng-concord-syntax",
    unitTitle: "Grammatical Concord, Verb Tenses & Structural Syntax",
    unitCode: "ENG-SS-01",
    skillId: "skill-eng-concord",
    skillTitle: "Subject-Verb Concord & Proximity Rules",
    subjectId: "lang_english",
    subjectName: "Senior Secondary English Language",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    title: "Cracking Subject-Verb Concord: Proximity Traps, Correlative Conjunctions & Collective Nouns",
    subtitle: "Eliminating grammatical errors in WAEC, JAMB and academic essay writing with structural syntax trees",
    description: "An analytical visual explanation of grammatical concord. Deconstructs sentences using animated syntax trees, showing how parenthetical phrases ('as well as', 'together with') and correlative pairs ('neither... nor', 'not only... but also') govern singular vs plural verb inflection.",
    learningObjectives: [
      "Master the fundamental concord rule: Singular subject takes singular verb, plural takes plural",
      "Identify and ignore parenthetical interrupters (e.g., 'accompanied by', 'as well as')",
      "Apply the Rule of Proximity for 'either... or' and 'neither... nor'",
      "Correctly inflect verbs for indefinite pronouns ('each', 'everyone', 'none')"
    ],
    durationSeconds: 320,
    durationFormatted: "05:20",
    thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "english_syntax_tree",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:45",
        startSeconds: 0,
        durationSeconds: 45,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Anatomy of Agreement",
        narrationScript: "In English syntax, the subject and its finite verb must agree in person and number. When a sentence is short—'The student reads' or 'The students read'—agreement is simple. But examination boards like WAEC and JAMB deliberately insert intervening phrases to mislead your ear.",
        visualDescription: "Animated sentence diagram: 'The student reads' vs 'The students read', highlighting the inverse 's' marker (plural nouns add s, singular verbs add s).",
        visualCanvasType: "english_syntax_tree",
        diagramData: {
          type: "syntax_tree",
          labels: ["Singular Subject: The student [reads]", "Plural Subject: The students [read]"],
          equations: ["Noun(-s) + Verb(+s) = Singular Agreement"]
        },
        keyTakeaway: "Singular third-person present verbs take an 's' suffix, whereas plural nouns take an 's' suffix."
      },
      {
        sceneNumber: 2,
        timeRange: "00:45 - 01:45",
        startSeconds: 45,
        durationSeconds: 60,
        pedagogicalPhase: "conceptual_derivation",
        title: "Trap 1: The Parenthetical Interrupter",
        narrationScript: "Consider this classic question: 'The Principal, as well as the teachers, (is / are) attending the seminar.' Most students choose 'are' because 'teachers' sits immediately beside the verb. But phrases introduced by 'as well as', 'together with', or 'in addition to' are parenthetical! The true grammatical subject is singular: 'The Principal'. Therefore, the correct verb is 'is'!",
        visualDescription: "Sentence parsing animation: The phrase ', as well as the teachers,' grays out and drops into brackets. A bold connection line links 'The Principal' directly to 'is'.",
        visualCanvasType: "english_syntax_tree",
        diagramData: {
          type: "parenthetical_filtering",
          labels: ["Subject: The Principal (Singular)", "Interrupter: [as well as the teachers] (Ignore)", "Verb: is (Singular)"],
          equations: ["Principal ... IS attending"]
        },
        keyTakeaway: "Parenthetical additions ('as well as', 'along with') do not compound the grammatical subject."
      },
      {
        sceneNumber: 3,
        timeRange: "01:45 - 02:40",
        startSeconds: 105,
        durationSeconds: 55,
        pedagogicalPhase: "visual_demonstration",
        title: "Trap 2: The Rule of Proximity with Correlatives",
        narrationScript: "When subjects are joined by 'neither... nor', 'either... or', or 'not only... but also', the verb agrees strictly with the subject closest to it. For example: 'Neither the captain nor the players WERE ready' because 'players' is closest. But: 'Neither the players nor the captain WAS ready' because 'captain' is closest!",
        visualDescription: "Side-by-side comparison diagram showing proximity arrows pointing from the closest noun directly into the verb slot.",
        visualCanvasType: "english_syntax_tree",
        diagramData: {
          type: "proximity_arrow",
          labels: ["Neither the captain nor the players [were] (players = plural closest)", "Neither the players nor the captain [was] (captain = singular closest)"],
          equations: ["Rule of Proximity: Nearest Subject Governs"]
        },
        keyTakeaway: "In correlative conjunctions (neither/nor, either/or), the closest subject determines verb number."
      },
      {
        sceneNumber: 4,
        timeRange: "02:40 - 03:35",
        startSeconds: 160,
        durationSeconds: 55,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Trap 3: Indefinite Pronoun Concord",
        narrationScript: "What about 'each', 'every', 'everyone', and 'somebody'? In standard English, these indefinite pronouns are grammatically singular: 'Each of the participants was awarded a certificate'—not were! Even though 'participants' is plural, 'Each' is the true head noun.",
        visualDescription: "Syntax tree showing 'Each' as the noun phrase head, dominating the prepositional phrase 'of the participants', commanding singular verb 'was'.",
        visualCanvasType: "english_syntax_tree",
        diagramData: {
          type: "head_noun_analysis",
          labels: ["Head Noun: Each (Singular)", "Modifier: of the participants", "Verb: was (Singular)"],
          equations: ["Each / Everyone / Somebody = Singular"]
        },
        keyTakeaway: "'Each' and 'Everyone' are grammatically singular regardless of plural prepositional objects."
      },
      {
        sceneNumber: 5,
        timeRange: "03:35 - 04:30",
        startSeconds: 215,
        durationSeconds: 55,
        pedagogicalPhase: "misconception_alert",
        title: "Collective Nouns: British vs American WAEC Standard",
        narrationScript: "In WAEC and Cambridge examinations adhering to British English, collective nouns like 'committee', 'jury', and 'family' take a singular verb when acting as a unified unit ('The committee has reached its decision'), but take a plural verb when members act individually ('The committee are divided in their opinions').",
        visualDescription: "Split diagram showing Unified Unit (Single icon = Singular verb) vs Dispersed Members (Individual icons = Plural verb).",
        visualCanvasType: "english_syntax_tree",
        diagramData: {
          type: "collective_noun_split",
          labels: ["Unified entity: The committee HAS decided", "Individual conflict: The committee ARE divided"],
          equations: ["Unit = Singular; Individuals = Plural"]
        },
        keyTakeaway: "Collective nouns take singular verbs for unified actions, and plural verbs for individual actions."
      },
      {
        sceneNumber: 6,
        timeRange: "04:30 - 05:20",
        startSeconds: 270,
        durationSeconds: 50,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Summary & Practice",
        narrationScript: "Remember: 1. Strip away parenthetical interrupters. 2. Apply proximity for neither/nor. 3. Treat 'each' and 'everyone' as singular. Test your mastery on the checkpoint question and launch the Practice Arena!",
        visualDescription: "Golden rules review card with direct links to Practice Arena, English Flashcards, and Socratic Tutor Moos.",
        visualCanvasType: "english_syntax_tree",
        diagramData: {
          type: "summary_card",
          labels: ["1. Filter interrupters", "2. Proximity for nor/or", "3. Indefinites are singular"],
          equations: ["Concord Mastery"]
        },
        keyTakeaway: "Mastering concord requires identifying the true syntactic head noun."
      }
    ],
    transcript: [
      { id: "te-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "In English grammar, subject-verb concord requires the finite verb to agree with the subject in number and person." },
      { id: "te-2", startTimeSeconds: 25, endTimeSeconds: 45, speaker: "Lead Instructor", text: "Exam boards frequently insert intervening phrases to distract the learner from the true head noun." },
      { id: "te-3", startTimeSeconds: 45, endTimeSeconds: 105, speaker: "Lead Instructor", text: "Phrases like 'as well as' and 'together with' are parenthetical. In 'The Principal, as well as the teachers...', the verb is 'is'." },
      { id: "te-4", startTimeSeconds: 105, endTimeSeconds: 160, speaker: "Lead Instructor", text: "With 'neither... nor' and 'either... or', follow the Rule of Proximity: the verb agrees with the subject closest to it." },
      { id: "te-5", startTimeSeconds: 160, endTimeSeconds: 215, speaker: "Lead Instructor", text: "Indefinite pronouns like 'each', 'every', and 'someone' are strictly singular: 'Each of the boys has arrived'." },
      { id: "te-6", startTimeSeconds: 215, endTimeSeconds: 270, speaker: "Lead Instructor", text: "For collective nouns, use singular when acting as a unit, and plural when members act with differing opinions." },
      { id: "te-7", startTimeSeconds: 270, endTimeSeconds: 320, speaker: "Lead Instructor", text: "Solve the checkpoint below to verify your structural insight, then continue into the Practice Arena!" }
    ],
    checkpoints: [
      {
        id: "chk-eng-01",
        triggerTimeSeconds: 105,
        questionText: "Choose the grammatically correct verb: 'The Governor, accompanied by his commissioners, ______ arriving today.'",
        options: [
          "is",
          "are",
          "were",
          "have been"
        ],
        correctOptionIndex: 0,
        explanation: "'accompanied by his commissioners' is a parenthetical prepositional phrase. The grammatical subject is the singular noun 'The Governor', which requires the singular verb 'is'.",
        socraticHint: "What is the true subject of the sentence? Does 'accompanied by' make the subject compound like 'and' does?",
        targetSkillId: "skill-eng-concord",
        remedialNextStep: "Review the parenthetical filtering technique in scene 2."
      },
      {
        id: "chk-eng-02",
        triggerTimeSeconds: 160,
        questionText: "Choose the correct verb: 'Neither the manager nor the employees ______ satisfied with the new terms.'",
        options: [
          "were",
          "was",
          "is",
          "has been"
        ],
        correctOptionIndex: 0,
        explanation: "By the Rule of Proximity for 'neither... nor', the verb agrees with the closest subject, which is the plural noun 'employees', taking 'were'.",
        socraticHint: "Which subject is positioned directly adjacent to the verb blank?",
        targetSkillId: "skill-eng-concord",
        remedialNextStep: "Review the Rule of Proximity in scene 3."
      }
    ],
    keyConcepts: [
      { term: "Subject-Verb Concord", definition: "The grammatical requirement that a subject and its verb must agree in number (singular or plural).", timestampSeconds: 15 },
      { term: "Parenthetical Phrase", definition: "A qualifying word or phrase inserted into a passage which does not alter the syntactic number of the subject.", timestampSeconds: 55 },
      { term: "Rule of Proximity", definition: "The rule stating that when subjects are joined by correlatives, the verb agrees with the subject closest to it.", timestampSeconds: 110 },
      { term: "Indefinite Pronoun", definition: "A pronoun (such as each, someone, everyone) that does not refer to any specific person, typically singular in formal English.", timestampSeconds: 170 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-eng-concord",
      recommendedFlashcardDeckId: "deck-english-concord-ss",
      recommendedVisualizationId: "vis-syntax-tree-builder",
      recommendedDiagnosticUnitId: "unit-eng-concord-syntax"
    },
    textbookAnchor: {
      bookTitle: "Comprehensive Senior Secondary English",
      bookCode: "CEMM-ENG-S1",
      chapterNumber: 2,
      sectionNumber: "2.1",
      qrResourceCode: "CEMM-ENG-CH2-SEC1"
    },
    creatorId: "educator-eng-lead",
    creatorName: "Mrs. C. Obi & MOOS Humanities Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Dr. A. Taiwo (Chief WAEC English Examiner)",
    humanReviewedAt: "2026-03-03T16:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-03-03T16:00:00Z",
    analytics: {
      viewsCount: 1350,
      completionCount: 1150,
      averageWatchTimeSeconds: 295,
      checkpointAccuracyRate: 91.4
    }
  },

  // 6. SENIOR SECONDARY COMPUTER SCIENCE: Algorithms & Binary Search Complexity
  {
    id: "vid-cs-alg-01",
    videoId: "vid-cs-alg-01",
    unitId: "unit-cs-algorithms-flowcharts",
    unitTitle: "Algorithms, Flowcharts & Computational Problem Solving",
    unitCode: "CSC-SS-02",
    skillId: "skill-cs-search-sort-complexity",
    skillTitle: "Search & Sort Algorithms and Time Complexity",
    subjectId: "tech_compsci",
    subjectName: "Computer Science & Informatics",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    title: "Deconstructing Binary Search: Divide-and-Conquer, Pointer Mechanics & O(log n) Efficiency",
    subtitle: "Why sorted data allows searching 1,000,000 items in just 20 comparisons",
    description: "An animated algorithmic masterclass on Binary Search. Demonstrates low, mid, and high pointer navigation across contiguous arrays, compares linear search O(n) against logarithmic search O(log n), and derives the recurrence relation step by step.",
    learningObjectives: [
      "Understand the strict prerequisite for binary search: the collection MUST be sorted",
      "Trace the 3-pointer state machine: low, mid = (low + high) // 2, high",
      "Explain the divide-and-conquer principle of halving the search space in each step",
      "Contrast O(n) linear scanning against O(log2 n) logarithmic performance"
    ],
    durationSeconds: 310,
    durationFormatted: "05:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "compsci_algorithm_visualizer",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:45",
        startSeconds: 0,
        durationSeconds: 45,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Dictionary Guessing Game",
        narrationScript: "If you are searching for a word in a 1,000-page dictionary, do you start on page 1 and read every single word sequentially? Of course not! You open directly to the middle. If the target word comes before, you discard the entire second half. That intuitive human strategy is the binary search algorithm.",
        visualDescription: "Animation showing a 1,000-page dictionary splitting in half repeatedly, narrowing down to the exact word in 10 flips.",
        visualCanvasType: "compsci_algorithm_visualizer",
        diagramData: {
          type: "dictionary_split",
          labels: ["1,000 pages → 500 pages → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1 page", "Only 10 steps!"],
          equations: ["log₂(1000) ≈ 10"]
        },
        keyTakeaway: "Repeatedly halving the search space reduces thousands of items to a handful of steps."
      },
      {
        sceneNumber: 2,
        timeRange: "00:45 - 01:45",
        startSeconds: 45,
        durationSeconds: 60,
        pedagogicalPhase: "conceptual_derivation",
        title: "Pointer Mechanics: Low, Mid, High",
        narrationScript: "In code, we maintain two boundary pointers: low starting at index 0, and high at index n minus 1. In every iteration, we calculate mid equals low plus high divided by 2. If array at mid equals our target, we found it! If array at mid is greater than the target, we discard the right half by setting high equals mid minus 1.",
        visualDescription: "Array visualizer showing indices [0..7]. Low pointer is at index 0, high at index 7. Mid calculated at index 3. Targeted value 19 is compared with array[3]=14.",
        visualCanvasType: "compsci_algorithm_visualizer",
        diagramData: {
          type: "array_pointers",
          labels: ["low = 0", "high = 7", "mid = (0 + 7)//2 = 3", "Target = 19 > 14 → low = mid + 1 = 4"],
          values: [2, 5, 8, 14, 19, 23, 31, 42]
        },
        keyTakeaway: "The mid pointer partitions the array, allowing one half to be discarded in O(1) time."
      },
      {
        sceneNumber: 3,
        timeRange: "01:45 - 02:40",
        startSeconds: 105,
        durationSeconds: 55,
        pedagogicalPhase: "visual_demonstration",
        title: "Step-by-Step Execution Trace",
        narrationScript: "Watch the step-by-step trace on screen searching for value 23 in an 8-element array: Step 1 compares with mid value 14. 23 is greater, so low becomes 4. Step 2 calculates mid equals 5, which is 23. Match found in exactly two comparisons! A linear search would have required 6 comparisons.",
        visualDescription: "Animated stepping through the array: elements 0, 1, 2, 3 gray out. Active window is [4..7]. Mid lands on index 5, turning glowing green.",
        visualCanvasType: "compsci_algorithm_visualizer",
        diagramData: {
          type: "trace_animation",
          labels: ["Step 1: Compare with 14 (Go right)", "Step 2: Compare with 23 (Match!)", "Completed in 2 comparisons"],
          values: [2, 5, 8, 14, 19, 23, 31, 42]
        },
        keyTakeaway: "Binary search eliminates half of the remaining elements with every single comparison."
      },
      {
        sceneNumber: 4,
        timeRange: "02:40 - 03:30",
        startSeconds: 160,
        durationSeconds: 50,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Mathematical Complexity: Log2(n)",
        narrationScript: "Why is binary search so celebrated in computer science? For 1,024 elements, linear search takes up to 1,024 comparisons, while binary search takes at most 10. For 1,000,000 elements, linear search takes a million operations, while binary search takes only 20! That is the astonishing power of logarithmic O(log n) time complexity.",
        visualDescription: "Graph comparing linear curve O(n) shooting upward vs logarithmic curve O(log n) staying nearly flat even as n reaches one million.",
        visualCanvasType: "compsci_algorithm_visualizer",
        diagramData: {
          type: "complexity_curve",
          labels: ["n = 16 → 4 steps", "n = 1,024 → 10 steps", "n = 1,048,576 → 20 steps", "n = 1,000,000,000 → 30 steps!"],
          equations: ["Time Complexity = O(log₂ n)"]
        },
        keyTakeaway: "Binary search scales logarithmically, making it capable of searching billions of records in milliseconds."
      },
      {
        sceneNumber: 5,
        timeRange: "03:30 - 04:20",
        startSeconds: 210,
        durationSeconds: 50,
        pedagogicalPhase: "misconception_alert",
        title: "The Unsorted Array Trap & Mid Overflow Bug",
        narrationScript: "Two classic traps: 1. If the array is unsorted, binary search completely breaks and produces false negatives! 2. In programming languages like C and Java, writing (low + high) / 2 can cause 32-bit integer overflow when numbers are large. The professional formulation is low plus (high minus low) divided by 2.",
        visualDescription: "Warning cards: Unsorted array producing wrong path (Red X); Integer overflow formula vs safe formula low + (high - low) / 2 (Green check).",
        visualCanvasType: "compsci_algorithm_visualizer",
        diagramData: {
          type: "overflow_bug",
          labels: ["Unsorted array = Binary Search Invalid!", "Bug: (low + high) / 2 may overflow", "Safe: low + (high - low) / 2"],
          equations: ["Prerequisite: Array MUST be sorted!"]
        },
        keyTakeaway: "Binary search strictly requires a sorted dataset and safe mid-point calculation."
      },
      {
        sceneNumber: 6,
        timeRange: "04:20 - 05:10",
        startSeconds: 260,
        durationSeconds: 50,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Summary & Code Practice",
        narrationScript: "To review: Ensure the array is sorted, manage low and high pointers, halve the search space at mid, and enjoy O(log n) speed. Answer the checkpoint question below and then code your own binary search in the Practice Arena!",
        visualDescription: "Summary card with interactive pathway to Algorithm Practice, Code Playground, and Socratic Tutor Moos.",
        visualCanvasType: "compsci_algorithm_visualizer",
        diagramData: {
          type: "summary_card",
          labels: ["1. Array must be sorted", "2. mid = low + (high - low)//2", "3. Halves search space", "4. O(log n) efficiency"],
          equations: ["Algorithms & Problem Solving"]
        },
        keyTakeaway: "Binary search embodies the elegance of divide-and-conquer algorithm design."
      }
    ],
    transcript: [
      { id: "tcs-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "Binary search is the quintessential divide-and-conquer searching algorithm." },
      { id: "tcs-2", startTimeSeconds: 25, endTimeSeconds: 45, speaker: "Lead Instructor", text: "Just like opening a dictionary in the middle, it discards half of the items in a single step." },
      { id: "tcs-3", startTimeSeconds: 45, endTimeSeconds: 105, speaker: "Lead Instructor", text: "We maintain low, high, and mid pointers. In each iteration, comparing with mid eliminates an entire half." },
      { id: "tcs-4", startTimeSeconds: 105, endTimeSeconds: 160, speaker: "Lead Instructor", text: "In our 8-element trace, finding 23 took only 2 comparisons compared to 6 in a linear scan." },
      { id: "tcs-5", startTimeSeconds: 160, endTimeSeconds: 210, speaker: "Lead Instructor", text: "Binary search runs in O(log n) time, searching 1,000,000 items in just 20 operations." },
      { id: "tcs-6", startTimeSeconds: 210, endTimeSeconds: 260, speaker: "Lead Instructor", text: "Crucial rule: the array must be sorted! Unsorted data renders binary search completely invalid." },
      { id: "tcs-7", startTimeSeconds: 260, endTimeSeconds: 310, speaker: "Lead Instructor", text: "Test your algorithmic thinking on the checkpoint below, then enter the Practice Arena!" }
    ],
    checkpoints: [
      {
        id: "chk-cs-01",
        triggerTimeSeconds: 160,
        questionText: "What is the maximum number of comparisons required to search for an item in a sorted array of 1,024 elements using binary search?",
        options: [
          "10",
          "512",
          "1,024",
          "32"
        ],
        correctOptionIndex: 0,
        explanation: "Binary search runs in O(log₂ n) time. Since 2¹⁰ = 1,024, log₂(1024) = 10 comparisons maximum.",
        socraticHint: "How many times can you divide 1,024 by 2 before reaching 1? 2 raised to what power equals 1,024?",
        targetSkillId: "skill-cs-search-sort-complexity",
        remedialNextStep: "Review the logarithmic complexity explanation in scene 4."
      }
    ],
    keyConcepts: [
      { term: "Divide and Conquer", definition: "An algorithmic paradigm that breaks a problem into sub-problems until they become simple enough to solve directly.", timestampSeconds: 20 },
      { term: "Time Complexity O(log n)", definition: "An execution time that increases logarithmically in proportion to the input size n.", timestampSeconds: 70 },
      { term: "Low/Mid/High Pointers", definition: "The index markers used to bound and bisect the active search subarray.", timestampSeconds: 110 },
      { term: "Linear Search", definition: "A sequential search algorithm that inspects each element one by one, with O(n) worst-case time.", timestampSeconds: 165 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-cs-search-sort-complexity",
      recommendedFlashcardDeckId: "deck-cs-algorithms-ss",
      recommendedVisualizationId: "vis-binary-search-interactive",
      recommendedDiagnosticUnitId: "unit-cs-algorithms-flowcharts"
    },
    textbookAnchor: {
      bookTitle: "Comprehensive Senior Secondary Computer Science",
      bookCode: "CEMM-ICT-S1",
      chapterNumber: 3,
      sectionNumber: "3.2",
      qrResourceCode: "CEMM-ICT-CH3-SEC2"
    },
    creatorId: "educator-cs-lead",
    creatorName: "T. Adebayo & MOOS Computational Systems Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Engr. K. Alabi (Senior Software Architect & Computer Studies Examiner)",
    humanReviewedAt: "2026-03-04T10:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-02-05T08:00:00Z",
    updatedAt: "2026-03-04T10:00:00Z",
    analytics: {
      viewsCount: 890,
      completionCount: 780,
      averageWatchTimeSeconds: 285,
      checkpointAccuracyRate: 92.8
    }
  },

  // 7. PRIMARY FOUNDATIONS: Counting, Number Sense & Place Value
  {
    id: "vid-pri-num-01",
    videoId: "vid-pri-num-01",
    unitId: "unit-pri-found-math-1",
    unitTitle: "Counting, Number Sense & Place Value",
    unitCode: "MTH-PF-01",
    skillId: "skill-pf-counting",
    skillTitle: "Counting Objects & Place Value of Tens and Units",
    subjectId: "math_core",
    subjectName: "Primary Mathematics",
    level: "primary_foundations",
    curriculumStandard: "NERDC_NIGERIAN",
    title: "Understanding Place Value: Tens & Units with Fun Colorful Blocks",
    subtitle: "How bundling ten ones creates one rod of ten, and how 2-digit numbers are built",
    description: "A delightful, crystal-clear visual explanation of base-10 place value designed for young learners. Shows unit cubes grouping into a 10-rod, demonstrating numbers like 24 as 2 tens and 4 units.",
    learningObjectives: [
      "Count individual units from 1 to 10 and observe bundling into a ten-rod",
      "Decompose 2-digit numbers into Tens (T) and Units (U)",
      "Read and write numbers on a simple 2-column abacus"
    ],
    durationSeconds: 240,
    durationFormatted: "04:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "math_geometric_algebraic",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:50",
        startSeconds: 0,
        durationSeconds: 50,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The 10-Cube Magic Bundling",
        narrationScript: "Hello young math explorer! Look at these colorful cubes on screen. Let's count them together: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10! Look what happens when we reach 10: snap! The 10 loose cubes snap together into a single rod called ONE TEN!",
        visualDescription: "Bright colorful 3D blocks counting up to 10, snapping together with a glowing animation into a solid 10-block rod.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "blocks_bundling",
          labels: ["10 Single Cubes (Units)", "Snap!", "1 Rod of Ten (Ten)"],
          values: [10, 1]
        },
        keyTakeaway: "Ten individual units combine to make one ten."
      },
      {
        sceneNumber: 2,
        timeRange: "00:50 - 01:50",
        startSeconds: 50,
        durationSeconds: 60,
        pedagogicalPhase: "visual_demonstration",
        title: "Building the Number 24",
        narrationScript: "Now, let's build the number 24. We take two 10-rods: that is 20! And we add 4 single loose unit cubes. 2 tens plus 4 units gives 24! In our place value house, the 2 goes under Tens, and the 4 goes under Units.",
        visualDescription: "A playful place value house with two columns: 'T' for Tens and 'U' for Units. Two 10-rods slide into 'T', four loose cubes slide into 'U'.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "place_value_house",
          labels: ["Tens Column: 2 rods (= 20)", "Units Column: 4 cubes (= 4)", "Number = 24"],
          values: [2, 4]
        },
        keyTakeaway: "The tens digit tells you how many groups of ten; the units digit tells you how many extra ones."
      },
      {
        sceneNumber: 3,
        timeRange: "01:50 - 02:50",
        startSeconds: 110,
        durationSeconds: 60,
        pedagogicalPhase: "worked_example_breakdown",
        title: "What about 30 and 45?",
        narrationScript: "What about 30? It has 3 tens and 0 loose units. What about 45? 4 rods of ten and 5 loose cubes. 40 plus 5 equals 45!",
        visualDescription: "Animation showing 30 (3 rods, 0 units) and 45 (4 rods, 5 units).",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "place_value_house",
          labels: ["30 = 3 Tens, 0 Units", "45 = 4 Tens, 5 Units"],
          values: [30, 45]
        },
        keyTakeaway: "Zero in the units column means all cubes are packed into complete rods of ten."
      },
      {
        sceneNumber: 4,
        timeRange: "02:50 - 04:00",
        startSeconds: 170,
        durationSeconds: 70,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Checkpoint & Play Time",
        narrationScript: "You did it! Now try the question on your screen to see if you can find how many tens and units are in the mystery number, then play in our Learn & Play arena!",
        visualDescription: "Celebration confetti, checkpoint prompt, and button to Learn & Play Arena.",
        visualCanvasType: "math_geometric_algebraic",
        diagramData: {
          type: "summary_card",
          labels: ["Tens = Groups of 10", "Units = Loose ones", "Ready to practise!"],
          equations: ["Primary Foundations Math"]
        },
        keyTakeaway: "You can build any number with tens and units."
      }
    ],
    transcript: [
      { id: "tp-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "Hello math explorer! Let's discover how numbers are built using tens and units." },
      { id: "tp-2", startTimeSeconds: 25, endTimeSeconds: 50, speaker: "Lead Instructor", text: "When you count ten loose cubes, they snap together into one single rod called a TEN." },
      { id: "tp-3", startTimeSeconds: 50, endTimeSeconds: 110, speaker: "Lead Instructor", text: "To make 24, we put 2 rods in the Tens column, and 4 loose cubes in the Units column." },
      { id: "tp-4", startTimeSeconds: 110, endTimeSeconds: 170, speaker: "Lead Instructor", text: "30 is 3 tens and 0 units. 45 is 4 tens and 5 units." },
      { id: "tp-5", startTimeSeconds: 170, endTimeSeconds: 240, speaker: "Lead Instructor", text: "Answer the friendly question below and play with our counting blocks in the arena!" }
    ],
    checkpoints: [
      {
        id: "chk-pri-01",
        triggerTimeSeconds: 110,
        questionText: "How many Tens and Units are in the number 37?",
        options: [
          "3 Tens and 7 Units",
          "7 Tens and 3 Units",
          "30 Tens and 7 Units",
          "10 Tens and 27 Units"
        ],
        correctOptionIndex: 0,
        explanation: "In the number 37, the digit 3 is in the Tens place (worth 30), and the digit 7 is in the Units place (worth 7).",
        socraticHint: "Look at the first digit on the left (Tens) and the second digit on the right (Units).",
        targetSkillId: "skill-pf-counting",
        remedialNextStep: "Review the place value house in scene 2."
      }
    ],
    keyConcepts: [
      { term: "Unit", definition: "A single item or block representing the number 1.", timestampSeconds: 20 },
      { term: "Ten", definition: "A group of 10 units bundled into a single rod.", timestampSeconds: 40 },
      { term: "Place Value", definition: "The value of a digit depending on its position in the number (Tens or Units).", timestampSeconds: 80 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-pf-counting",
      recommendedFlashcardDeckId: "deck-primary-numbers",
      recommendedVisualizationId: "vis-blocks-counting",
      recommendedDiagnosticUnitId: "unit-pri-found-math-1"
    },
    creatorId: "educator-pri-lead",
    creatorName: "Auntie Mary & MOOS Early Years Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Mrs. E. Akpan (Primary Education Specialist)",
    humanReviewedAt: "2026-03-01T08:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-02-10T08:00:00Z",
    updatedAt: "2026-03-01T08:00:00Z",
    analytics: {
      viewsCount: 1650,
      completionCount: 1520,
      averageWatchTimeSeconds: 230,
      checkpointAccuracyRate: 95.2
    }
  },

  // 8. JUNIOR SECONDARY: Forms of Energy & Energy Conservation
  {
    id: "vid-jss-eng-01",
    videoId: "vid-jss-eng-01",
    unitId: "unit-jss-stem-energy",
    unitTitle: "Forms of Energy, Energy Conversion & Conservation",
    unitCode: "SCI-JS-01",
    skillId: "skill-js-energy-conversion",
    skillTitle: "Kinetic-Potential Transformations and Conservation of Energy",
    subjectId: "sci_physics",
    subjectName: "Junior Secondary Basic Science",
    level: "junior_secondary",
    curriculumStandard: "NERDC_NIGERIAN",
    title: "Energy Transformations: Potential to Kinetic Energy, Dissipation & The Roller Coaster Physics",
    subtitle: "Why energy can never be created or destroyed, only transformed between states",
    description: "A dynamic physics visual lesson exploring the Law of Conservation of Energy. Tracks a roller coaster and pendulum exchanging gravitational potential energy and kinetic energy, accounting for thermal friction losses.",
    learningObjectives: [
      "State and explain the Law of Conservation of Energy",
      "Calculate Gravitational Potential Energy Ep = mgh and Kinetic Energy Ek = 0.5mv²",
      "Trace energy conversion pathways (Chemical → Electrical → Light/Heat)"
    ],
    durationSeconds: 290,
    durationFormatted: "04:50",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    visualEngineType: "physics_kinematic_vectors",
    storyboard: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:50",
        startSeconds: 0,
        durationSeconds: 50,
        pedagogicalPhase: "topic_hook_intuition",
        title: "The Unbreakable Law of the Universe",
        narrationScript: "Energy is the capacity to do work. In the entire universe, no machine can create energy out of nothing, and no collision can destroy it. Energy can only change from one form into another.",
        visualDescription: "Visual energy wheel cycling between Chemical, Mechanical, Thermal, Electrical, and Radiant energy forms.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "energy_wheel",
          labels: ["Chemical", "Mechanical (PE + KE)", "Thermal", "Electrical", "Radiant"],
          equations: ["Total Energy = Constant"]
        },
        keyTakeaway: "Energy cannot be created or destroyed, only transformed."
      },
      {
        sceneNumber: 2,
        timeRange: "00:50 - 01:50",
        startSeconds: 50,
        durationSeconds: 60,
        pedagogicalPhase: "visual_demonstration",
        title: "The Roller Coaster Conservation Cycle",
        narrationScript: "Watch our roller coaster car at the very top of the hill. At height h, it possesses maximum Gravitational Potential Energy, mgh, while kinetic energy is zero. As it plunges downwards, height decreases while speed increases. Potential energy converts smoothly into Kinetic Energy, half m v squared!",
        visualDescription: "Roller coaster simulation with twin bar charts: Green bar (Potential Energy) drops as Blue bar (Kinetic Energy) rises, total sum remaining constant.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "roller_coaster_sim",
          labels: ["Top: Max PE (mgh), KE = 0", "Bottom: PE = 0, Max KE (½mv²)", "Sum (PE + KE) is invariant"],
          equations: ["mgh = ½mv²"]
        },
        keyTakeaway: "At the bottom of the descent, maximum potential energy has transformed into maximum kinetic energy."
      },
      {
        sceneNumber: 3,
        timeRange: "01:50 - 02:50",
        startSeconds: 110,
        durationSeconds: 60,
        pedagogicalPhase: "worked_example_breakdown",
        title: "Solving for Speed at the Bottom",
        narrationScript: "If a 2 kg cart drops from a height of 5 meters (with g = 10 m/s²), Ep at top is 2 × 10 × 5 = 100 Joules. At the bottom, all 100 Joules is kinetic energy! Setting half times 2 times v squared equals 100 gives v squared equals 100, so speed v is 10 meters per second!",
        visualDescription: "Step-by-step arithmetic card showing mgh = ½mv² resolving to v = √(2gh) = √(2 × 10 × 5) = 10 m/s.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "calculation_card",
          labels: ["m = 2 kg, h = 5 m, g = 10 m/s²", "Ep = 100 J", "Ek = 100 J → v = 10 m/s"],
          equations: ["v = √(2gh)"]
        },
        keyTakeaway: "Notice the mass m cancels out; all falling objects reach the exact same speed v = √(2gh) regardless of mass."
      },
      {
        sceneNumber: 4,
        timeRange: "02:50 - 03:50",
        startSeconds: 170,
        durationSeconds: 60,
        pedagogicalPhase: "misconception_alert",
        title: "Where did the energy go? (Friction & Heat)",
        narrationScript: "In real life, why does a swing or pendulum eventually stop? Students often think energy vanished. No! Friction against air and pivot bearings converts mechanical energy into thermal heat and sound energy dissipated into the surrounding atmosphere.",
        visualDescription: "Thermal camera simulation showing microscopic heat waves radiating from the bearings of a slowing pendulum.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "thermal_dissipation",
          labels: ["Mechanical Energy → Thermal Energy (Heat) + Acoustic Energy (Sound)", "Energy is conserved globally!"],
          equations: ["Ein = Euseful + Elost (heat)"]
        },
        keyTakeaway: "Lost mechanical energy is not destroyed; it has degraded into thermal friction."
      },
      {
        sceneNumber: 5,
        timeRange: "03:50 - 04:50",
        startSeconds: 230,
        durationSeconds: 60,
        pedagogicalPhase: "synthesis_and_next_steps",
        title: "Summary & BECE Practice",
        narrationScript: "To review: Ep = mgh, Ek = ½mv², Total Energy is conserved, and friction causes thermal dissipation. Answer the checkpoint below and test your skills in the Practice Arena!",
        visualDescription: "Summary pathway card with links to BECE Basic Science Practice and Tutor Moos.",
        visualCanvasType: "physics_kinematic_vectors",
        diagramData: {
          type: "summary_card",
          labels: ["Ep = mgh", "Ek = ½mv²", "v = √(2gh)", "Conservation of Energy"],
          equations: ["BECE Science Prep"]
        },
        keyTakeaway: "Master the conservation equation and speed derivation for examination success."
      }
    ],
    transcript: [
      { id: "tj-1", startTimeSeconds: 0, endTimeSeconds: 25, speaker: "Lead Instructor", text: "Energy can never be created or destroyed; it only changes from one form to another." },
      { id: "tj-2", startTimeSeconds: 25, endTimeSeconds: 50, speaker: "Lead Instructor", text: "At the top of a roller coaster, potential energy is at maximum while kinetic energy is zero." },
      { id: "tj-3", startTimeSeconds: 50, endTimeSeconds: 110, speaker: "Lead Instructor", text: "As the coaster plunges, potential energy transforms into kinetic energy: mgh becomes ½mv²." },
      { id: "tj-4", startTimeSeconds: 110, endTimeSeconds: 170, speaker: "Lead Instructor", text: "A 5-meter drop yields a speed of 10 meters per second, calculated with v = √(2gh)." },
      { id: "tj-5", startTimeSeconds: 170, endTimeSeconds: 230, speaker: "Lead Instructor", text: "When objects slow down, mechanical energy has not vanished—it has converted into thermal friction." },
      { id: "tj-6", startTimeSeconds: 230, endTimeSeconds: 290, speaker: "Lead Instructor", text: "Answer the checkpoint question below to verify your understanding and enter the Practice Arena!" }
    ],
    checkpoints: [
      {
        id: "chk-jss-01",
        triggerTimeSeconds: 110,
        questionText: "An apple of mass 0.2 kg rests on a branch 3 meters above the ground. Taking g = 10 m/s², what is its gravitational potential energy?",
        options: [
          "6.0 Joules",
          "60.0 Joules",
          "1.5 Joules",
          "0.6 Joules"
        ],
        correctOptionIndex: 0,
        explanation: "Ep = m × g × h = 0.2 kg × 10 m/s² × 3 m = 6.0 Joules.",
        socraticHint: "Multiply the mass (0.2), gravitational acceleration (10), and height (3).",
        targetSkillId: "skill-js-energy-conversion",
        remedialNextStep: "Review the formula Ep = mgh in scene 2."
      }
    ],
    keyConcepts: [
      { term: "Potential Energy", definition: "Energy stored in an object due to its position or height above the ground (Ep = mgh).", timestampSeconds: 20 },
      { term: "Kinetic Energy", definition: "Energy possessed by an object due to its motion (Ek = ½mv²).", timestampSeconds: 65 },
      { term: "Conservation of Energy", definition: "The physical law stating total energy in an isolated system remains constant over time.", timestampSeconds: 120 }
    ],
    nextActionPathway: {
      recommendedPracticeSkillId: "skill-js-energy-conversion",
      recommendedFlashcardDeckId: "deck-jss-basic-science",
      recommendedVisualizationId: "vis-energy-roller-coaster",
      recommendedDiagnosticUnitId: "unit-jss-stem-energy"
    },
    creatorId: "educator-jss-lead",
    creatorName: "Mr. B. Usman & MOOS Junior Science Specialist",
    creatorType: "verified_educator",
    provenance: "OFFICIAL_SYLLABUS",
    validationStatus: "VALIDATED_CANONICAL",
    isAiGenerated: false,
    generatingAgents: ["curriculum_video_planner_agent", "subject_specialist_agent", "visual_storyboard_agent", "video_qa_agent"],
    humanReviewerName: "Mrs. F. Oladipo (BECE Science Chief Examiner)",
    humanReviewedAt: "2026-03-02T16:00:00Z",
    publicationStatus: "published",
    entitlementTier: "FREE",
    version: "2.0.0",
    createdAt: "2026-02-12T08:00:00Z",
    updatedAt: "2026-03-02T16:00:00Z",
    analytics: {
      viewsCount: 1210,
      completionCount: 1040,
      averageWatchTimeSeconds: 270,
      checkpointAccuracyRate: 90.5
    }
  }
];
