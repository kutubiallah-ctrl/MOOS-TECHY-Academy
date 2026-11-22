/**
 * MOOS TECHY ACADEMY — INTERACTIVE ACTIVITIES REPOSITORY
 * 
 * Provides interactive cognitive activities:
 * - Step-sequencer (arranging solution steps in valid order)
 * - Concept-sorter (sorting items into categories)
 * - Error-detector (spotting fallacies in math/science derivations)
 * - Term-matcher (pairing concepts with exact definitions)
 */

import { InteractiveActivity } from "../types/contentSaturation";

export const INTERACTIVE_ACTIVITIES: Record<string, InteractiveActivity[]> = {
  "skill-quad-factoring": [
    {
      id: "act-quad-error-detect",
      skillId: "skill-quad-factoring",
      unitId: "unit-sss-quadratics",
      type: "error_detector",
      title: "Spot the Fatal Flaw in Quadratic Solving",
      instructions: "A student attempted to solve 2x² - 8x - 24 = 0. Identify the exact step containing the mathematical error.",
      problemOrContext: "Student derivation: \nStep 1: Divide entire equation by 2: x² - 4x - 12 = 0\nStep 2: Find two numbers multiplying to -12 and adding to -4: (-6) and (+2)\nStep 3: Factor expression: (x - 6)(x + 2) = 0\nStep 4: Solve roots: x - 6 = 0 => x = -6, and x + 2 = 0 => x = 2",
      errorStepIndex: 3, // Step 4 (0-indexed 3)
      explanation: "In Step 4, when solving x - 6 = 0, adding 6 to both sides gives x = +6 (not -6). Similarly, x + 2 = 0 gives x = -2 (not +2). The student flipped the signs incorrectly when writing the final roots.",
      pointsReward: 25
    },
    {
      id: "act-quad-step-sequence",
      skillId: "skill-quad-factoring",
      unitId: "unit-sss-quadratics",
      type: "step_sequencer",
      title: "Sequence the Steps for Completing the Square",
      instructions: "Arrange these solution steps in the correct pedagogical sequence to solve x² + 6x - 7 = 0 by completing the square.",
      steps: [
        { id: "s1", text: "Move constant term to right side: x² + 6x = 7", correctOrder: 1 },
        { id: "s2", text: "Take half of linear coefficient (6/2 = 3) and square it (3² = 9)", correctOrder: 2 },
        { id: "s3", text: "Add 9 to both sides: x² + 6x + 9 = 7 + 9", correctOrder: 3 },
        { id: "s4", text: "Factor left side as a perfect square: (x + 3)² = 16", correctOrder: 4 },
        { id: "s5", text: "Take square root of both sides: x + 3 = ±4", correctOrder: 5 },
        { id: "s6", text: "Solve two cases: x = -3 + 4 = 1, and x = -3 - 4 = -7", correctOrder: 6 }
      ],
      pointsReward: 30
    }
  ],
  "skill-phy-newtons-laws": [
    {
      id: "act-phy-concept-sorter",
      skillId: "skill-phy-newtons-laws",
      unitId: "unit-phy-dynamics-energy",
      type: "concept_sorter",
      title: "Classify Physical Quantities: Vector vs. Scalar",
      instructions: "Sort each physical quantity into either Vector (magnitude + direction) or Scalar (magnitude only).",
      categories: [
        {
          name: "Scalar Quantities (Magnitude Only)",
          correctItemIds: ["i-mass", "i-speed", "i-energy", "i-time"]
        },
        {
          name: "Vector Quantities (Magnitude & Direction)",
          correctItemIds: ["i-force", "i-velocity", "i-momentum", "i-acceleration"]
        }
      ],
      itemsToPlace: [
        { id: "i-mass", label: "Mass (kg)" },
        { id: "i-force", label: "Net Force (N)" },
        { id: "i-speed", label: "Speed (m/s)" },
        { id: "i-velocity", label: "Velocity (m/s East)" },
        { id: "i-energy", label: "Kinetic Energy (J)" },
        { id: "i-momentum", label: "Linear Momentum (kg·m/s)" },
        { id: "i-time", label: "Elapsed Time (s)" },
        { id: "i-acceleration", label: "Gravitational Acceleration (m/s²)" }
      ],
      pointsReward: 30
    }
  ],
  "skill-fin-50-30-20-budgeting": [
    {
      id: "act-fin-budget-sorter",
      skillId: "skill-fin-50-30-20-budgeting",
      unitId: "unit-fin-budgeting-cashflow",
      type: "concept_sorter",
      title: "50/30/20 Expense Classification Challenge",
      instructions: "Drag each monthly expense into its rightful budgeting bucket according to the 50/30/20 standard.",
      categories: [
        {
          name: "Needs (50% Essential)",
          correctItemIds: ["e-rent", "e-groceries", "e-commute", "e-medicine"]
        },
        {
          name: "Wants (30% Discretionary)",
          correctItemIds: ["e-dining", "e-streaming", "e-designer"]
        },
        {
          name: "Savings & Debt (20% Wealth Protection)",
          correctItemIds: ["e-emergency", "e-loan-paydown", "e-pension"]
        }
      ],
      itemsToPlace: [
        { id: "e-rent", label: "Apartment Rent & Utility Bills" },
        { id: "e-groceries", label: "Essential Staple Groceries (Rice, Beans, Oil)" },
        { id: "e-commute", label: "Workplace Commute Bus/Fuel" },
        { id: "e-medicine", label: "Prescription Health Medication" },
        { id: "e-dining", label: "Weekend Restaurant Dining & Nightlife" },
        { id: "e-streaming", label: "Video Streaming Subscriptions" },
        { id: "e-designer", label: "Designer Footwear Upgrade" },
        { id: "e-emergency", label: "Automated Emergency Fund Transfer" },
        { id: "e-loan-paydown", label: "Principal Reduction on Bank Loan" },
        { id: "e-pension", label: "Voluntary Retirement Contribution" }
      ],
      pointsReward: 35
    }
  ],
  "skill-econ-equilibrium-shifts": [
    {
      id: "act-econ-error-detector",
      skillId: "skill-econ-equilibrium-shifts",
      unitId: "unit-econ-demand-supply",
      type: "error_detector",
      title: "Identify the Fallacy in Market Analysis",
      instructions: "An analyst claims: 'When crude oil prices increase, the demand curve for gasoline shifts to the left because higher prices reduce consumer demand.' Identify the analytical error.",
      problemOrContext: "Analyst statement: 'A rise in the price of crude oil increases refining costs, pushing gasoline pump prices higher. Because the price of gasoline rose, the demand curve for gasoline shifted downward and to the left.'",
      errorStepIndex: 1,
      explanation: "A rise in the price of gasoline causes a movement ALONG the demand curve (a reduction in quantity demanded), NOT a shift of the demand curve itself. The supply curve shifted leftward due to input costs, but demand itself did not shift.",
      pointsReward: 25
    }
  ],
  "skill-chm-ph-titrations": [
    {
      id: "act-chem-titration-steps",
      skillId: "skill-chm-ph-titrations",
      unitId: "unit-chm-acids-bases",
      type: "step_sequencer",
      title: "Sequence Acid-Base Volumetric Titration Protocol",
      instructions: "Arrange these laboratory procedure steps into the correct pedagogical order for standardized volumetric titration.",
      steps: [
        { id: "st-1", text: "Rinse burette with standard acid solution and fill to the 0.00 mL mark using a small funnel", correctOrder: 1 },
        { id: "st-2", text: "Pipette exactly 25.0 mL of unknown base into a clean conical flask rinsed only with distilled water", correctOrder: 2 },
        { id: "st-3", text: "Add 2-3 drops of phenolphthalein indicator solution into the conical flask (turns pink in basic medium)", correctOrder: 3 },
        { id: "st-4", text: "Titrate standard acid from burette while continuously swirling flask until pink color discharges to colorless", correctOrder: 4 },
        { id: "st-5", text: "Record final burette volume at bottom of meniscus to 2 decimal places and repeat for concordance within ±0.10 mL", correctOrder: 5 }
      ],
      pointsReward: 35
    },
    {
      id: "act-chem-substance-classifier",
      skillId: "skill-chm-ph-titrations",
      unitId: "unit-chm-acids-bases",
      type: "concept_sorter",
      title: "Classify Chemical Solutions: Acidic, Neutral or Alkaline",
      instructions: "Sort each everyday and laboratory substance into its rightful pH category at 25°C.",
      categories: [
        { name: "Acidic Solutions (pH < 7)", correctItemIds: ["sub-lemon", "sub-hcl", "sub-vinegar"] },
        { name: "Neutral Solutions (pH = 7)", correctItemIds: ["sub-purewater", "sub-nacl"] },
        { name: "Alkaline / Basic Solutions (pH > 7)", correctItemIds: ["sub-bleach", "sub-naoh", "sub-soap"] }
      ],
      itemsToPlace: [
        { id: "sub-lemon", label: "Fresh Lemon Juice (Citric acid)" },
        { id: "sub-hcl", label: "0.1 M Hydrochloric Acid" },
        { id: "sub-vinegar", label: "Household Vinegar (Acetic acid)" },
        { id: "sub-purewater", label: "Pure Deionized Distilled Water" },
        { id: "sub-nacl", label: "Aqueous Sodium Chloride Table Salt" },
        { id: "sub-bleach", label: "Sodium Hypochlorite Household Bleach" },
        { id: "sub-naoh", label: "0.1 M Sodium Hydroxide Caustic Soda" },
        { id: "sub-soap", label: "Bathing Soap Lather (pH ~9.5)" }
      ],
      pointsReward: 30
    }
  ],
  "skill-bio-enzymes-respiration": [
    {
      id: "act-bio-respiration-sequence",
      skillId: "skill-bio-enzymes-respiration",
      unitId: "unit-bio-physiology",
      type: "step_sequencer",
      title: "Sequence the Bioenergetic Pathways of Cellular Respiration",
      instructions: "Place the stages of eukaryotic aerobic cellular respiration in chronological order.",
      steps: [
        { id: "br-1", text: "Glycolysis in cytoplasm splits 6-carbon glucose into two 3-carbon pyruvates (yielding 2 net ATP and 2 NADH)", correctOrder: 1 },
        { id: "br-2", text: "Pyruvate oxidation transports pyruvate into mitochondrial matrix, converting it to Acetyl-CoA and releasing CO₂", correctOrder: 2 },
        { id: "br-3", text: "Krebs (Citric Acid) Cycle processes Acetyl-CoA, reducing electron carriers to NADH and FADH₂ while generating 2 ATP", correctOrder: 3 },
        { id: "br-4", text: "Electron Transport Chain pumps protons across inner mitochondrial membrane to create an electrochemical proton gradient", correctOrder: 4 },
        { id: "br-5", text: "ATP Synthase uses proton motive force (chemiosmosis) to phosphorylate ADP into ~32 ATP molecules with O₂ as final electron acceptor", correctOrder: 5 }
      ],
      pointsReward: 40
    }
  ],
  "skill-eng-concord": [
    {
      id: "act-eng-concord-detect",
      skillId: "skill-eng-concord",
      unitId: "unit-eng-concord-syntax",
      type: "error_detector",
      title: "Spot the Concord Fallacy in Formal Prose",
      instructions: "Identify the exact sentence with the invalid subject-verb agreement violation in this editorial paragraph.",
      problemOrContext: "Paragraph: \n[Sentence 1] The committee on academic standards has submitted its annual audit.\n[Sentence 2] Each of the departmental representatives was invited to present oral testimony.\n[Sentence 3] The principal, accompanied by his vice-principals and academic coordinators, were present at the summit.\n[Sentence 4] Neither the students nor the faculty mentor regrets the rigorous preparation.",
      errorStepIndex: 2, // Sentence 3 (0-indexed 2)
      explanation: "In Sentence 3, 'The principal, accompanied by his vice-principals and academic coordinators, were present', the parenthetical phrase 'accompanied by...' does not make the subject plural. The true grammatical subject is the singular 'principal', so the verb must be 'was present', not 'were present'.",
      pointsReward: 30
    }
  ],
  "skill-cs-stacks-queues-arrays": [
    {
      id: "act-dsa-structure-sorter",
      skillId: "skill-cs-stacks-queues-arrays",
      unitId: "unit-cs-data-structures-abstract-types",
      type: "concept_sorter",
      title: "Classify Computing Use Cases: Stack (LIFO) vs Queue (FIFO)",
      instructions: "Sort each software engineering use case into either Stack (LIFO) or Queue (FIFO).",
      categories: [
        { name: "Stack (LIFO - Last In First Out)", correctItemIds: ["dsa-undo", "dsa-paren", "dsa-callstack"] },
        { name: "Queue (FIFO - First In First Out)", correctItemIds: ["dsa-printer", "dsa-breadth", "dsa-scheduler"] }
      ],
      itemsToPlace: [
        { id: "dsa-undo", label: "Text Editor 'Undo' (Ctrl+Z) History Buffer" },
        { id: "dsa-paren", label: "Compiler Syntactic Parenthesis Matching ((), {}, [])" },
        { id: "dsa-callstack", label: "Recursive Function Call Stack Trace" },
        { id: "dsa-printer", label: "Office Network Printer Job Spooler" },
        { id: "dsa-breadth", label: "Graph Breadth-First Search (BFS) Traversal" },
        { id: "dsa-scheduler", label: "Operating System Round-Robin CPU Task Scheduler" }
      ],
      pointsReward: 30
    }
  ],
  "skill-frac-operations": [
    {
      id: "act-frac-sequence",
      skillId: "skill-frac-operations",
      unitId: "unit-foundations-numbers",
      type: "step_sequencer",
      title: "Sequence Adding Unlike Fractions (2/3 + 3/4)",
      instructions: "Arrange the steps to calculate 2/3 + 3/4 in the correct mathematical order.",
      steps: [
        { id: "f1", text: "Find the Lowest Common Denominator (LCD) of 3 and 4, which is 12", correctOrder: 1 },
        { id: "f2", text: "Convert 2/3 to an equivalent fraction with denominator 12: (2 × 4)/(3 × 4) = 8/12", correctOrder: 2 },
        { id: "f3", text: "Convert 3/4 to an equivalent fraction with denominator 12: (3 × 3)/(4 × 3) = 9/12", correctOrder: 3 },
        { id: "f4", text: "Add the numerators while keeping the common denominator: (8 + 9)/12 = 17/12", correctOrder: 4 },
        { id: "f5", text: "Convert the improper fraction to a mixed number: 17/12 = 1 whole and 5/12", correctOrder: 5 }
      ],
      pointsReward: 25
    }
  ],
  "skill-pf-addition-regrouping": [
    {
      id: "act-pf-add-sequence",
      skillId: "skill-pf-addition-regrouping",
      unitId: "unit-pri-found-math-regrouping",
      type: "step_sequencer",
      title: "Step Sequencer: Solving 38 + 27 with Column Regrouping",
      instructions: "Arrange the solution steps in the exact mathematical order from start to finish.",
      steps: [
        { id: "add1", text: "Write 38 on top of 27 with Tens lined up over Tens and Units over Units", correctOrder: 1 },
        { id: "add2", text: "Add the units column first: 8 + 7 = 15 units", correctOrder: 2 },
        { id: "add3", text: "Regroup 15 units: write 5 in the units column and carry 1 ten to the top of the tens column", correctOrder: 3 },
        { id: "add4", text: "Add the tens column including the carried ten: 1 + 3 + 2 = 6 tens", correctOrder: 4 },
        { id: "add5", text: "Read the complete combined answer: 65", correctOrder: 5 }
      ],
      pointsReward: 25
    }
  ],
  "skill-pf-forces-motion": [
    {
      id: "act-pf-force-sort",
      skillId: "skill-pf-forces-motion",
      unitId: "unit-pri-found-stem-forces",
      type: "concept_sorter",
      title: "Concept Sorter: Push Force vs Pull Force",
      instructions: "Sort each action into whether it is primarily a PUSH (moving away) or a PULL (moving toward).",
      categories: [
        {
          name: "Push Forces (Moving Away)",
          correctItemIds: ["it1", "it3"]
        },
        {
          name: "Pull Forces (Moving Closer)",
          correctItemIds: ["it2", "it4", "it5"]
        }
      ],
      itemsToPlace: [
        { id: "it1", label: "Kicking a football into the net" },
        { id: "it2", label: "Opening a desk drawer toward yourself" },
        { id: "it3", label: "Pressing an elevator call button" },
        { id: "it4", label: "Dragging a toy wagon behind you" },
        { id: "it5", label: "Plucking a ripe apple off a tree branch" }
      ],
      pointsReward: 25
    }
  ],
  "skill-jss-materials-safety": [
    {
      id: "act-jss-mat-error",
      skillId: "skill-jss-materials-safety",
      unitId: "unit-jss-basic-tech-materials",
      type: "error_detector",
      title: "Error Detector: Spot the Dangerous Workshop Safety Flaw",
      instructions: "A student recorded their bench drilling procedure. Identify the step that violates critical workshop safety.",
      problemOrContext: "Step 1: Check drilling bit is tightened securely in the chuck using a chuck key.\nStep 2: Wear loose oversized woolen gloves to protect hands from the rotating spindle.\nStep 3: Secure workpiece firmly in a drill machine vice.\nStep 4: Wear polycarbonate safety goggles before turning the machine power ON.",
      errorStepIndex: 1, // Step 2 (0-indexed 1)
      explanation: "Step 2 is a dangerous violation! Operators must NEVER wear loose gloves or baggy sleeves near rotating machinery (lathes, drills) because rotating spindles can snag gloves and drag hands into the tool. Gloves are forbidden on rotating spindle machines.",
      pointsReward: 30
    }
  ],
  "skill-jss-cell-organization": [
    {
      id: "act-jss-cell-match",
      skillId: "skill-jss-cell-organization",
      unitId: "unit-jss-basic-science-cells",
      type: "term_matcher",
      title: "Organelle Matcher: Match Organelle to Biological Function",
      instructions: "Match each cell structure with its exact physiological role.",
      termMatchPairs: [
        { id: "tmp-nuc", term: "Nucleus", definition: "Houses genetic DNA chromosomes and directs all cellular activities." },
        { id: "tmp-chlo", term: "Chloroplast", definition: "Contains green chlorophyll pigments for sunlight absorption during photosynthesis." },
        { id: "tmp-mito", term: "Mitochondria", definition: "Sites of aerobic respiration that generate ATP energy currency for the cell." },
        { id: "tmp-wall", term: "Cellulose Cell Wall", definition: "Rigid non-living outer framework providing structural turgor support in plants." }
      ],
      pointsReward: 25
    }
  ]
};

