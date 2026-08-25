import { PlayActivity } from "../types/learnAndPlay";

export const ALL_PLAY_ACTIVITIES: PlayActivity[] = [
  // =========================================================================
  // 1. MATHEMATICS (FLAGSHIP PURE & APPLIED MATHEMATICS)
  // =========================================================================
  {
    id: "act-eq-balance-linear",
    type: "equation_balancer",
    subjectId: "math_algebra",
    domainId: "mathematics",
    level: "junior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-jss-algebra",
    skillId: "skill-linear-equations",
    title: "Algebraic Scale: Equation Balancer",
    subtitle: "Linear Equations & Golden Rule of Balance",
    description: "Keep both sides of the balance scale equal while applying inverse operations to isolate variable x.",
    learningObjective: "Master inverse operations on both sides of a linear equation to find the solution for x.",
    difficulty: "foundational",
    timeLimitSeconds: 120,
    maxScore: 100,
    masteryPointsReward: 15,
    xpReward: 60,
    equationConfig: {
      targetEquation: "3x + 7 = 25",
      targetVariable: "x",
      leftInitialValue: 25, // 3*(6) + 7
      rightInitialValue: 25,
      targetValue: 6,
      availableOperations: [
        { id: "sub-7", label: "Subtract 7 from both sides", op: "subtract", value: 7 },
        { id: "add-7", label: "Add 7 to both sides", op: "add", value: 7 },
        { id: "div-3", label: "Divide both sides by 3", op: "divide", value: 3 },
        { id: "mul-3", label: "Multiply both sides by 3", op: "multiply", value: 3 },
        { id: "sub-3", label: "Subtract 3 from both sides", op: "subtract", value: 3 }
      ],
      targetSolutionSteps: 2
    }
  },
  {
    id: "act-concept-match-algebra",
    type: "concept_matcher",
    subjectId: "math_algebra",
    domainId: "mathematics",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-sss-quadratics",
    skillId: "skill-quadratic-factoring",
    title: "Quadratics & Identities Matcher Matrix",
    subtitle: "Speed Match Algebraic Expansions & Factors",
    description: "Pair algebraic expressions with their expanded forms or root factorizations before the clock expires.",
    learningObjective: "Rapidly recognize difference of two squares, perfect trinomials, and quadratic factor structures.",
    difficulty: "intermediate",
    timeLimitSeconds: 90,
    maxScore: 120,
    masteryPointsReward: 20,
    xpReward: 80,
    matcherConfig: {
      pairs: [
        {
          id: "p1",
          concept: "x² - 9",
          match: "(x + 3)(x - 3)",
          hint: "Difference of two squares: a² - b² = (a+b)(a-b)",
          category: "Factoring"
        },
        {
          id: "p2",
          concept: "x² + 6x + 9",
          match: "(x + 3)²",
          hint: "Perfect square trinomial",
          category: "Expansion"
        },
        {
          id: "p3",
          concept: "x² - 5x + 6",
          match: "(x - 2)(x - 3)",
          hint: "Sum = -5, Product = +6",
          category: "Factoring"
        },
        {
          id: "p4",
          concept: "2x² + 4x",
          match: "2x(x + 2)",
          hint: "Factoring out greatest common factor",
          category: "Common Factors"
        },
        {
          id: "p5",
          concept: "(2x - 1)(x + 4)",
          match: "2x² + 7x - 4",
          hint: "FOIL expansion method",
          category: "Expansion"
        }
      ]
    }
  },
  {
    id: "act-calculus-derivatives-matcher",
    type: "concept_matcher",
    subjectId: "math_calculus",
    domainId: "mathematics",
    level: "university_prep",
    curriculum: "JAMB_UTME",
    unitId: "unit-adv-calculus",
    skillId: "skill-calculus-derivatives",
    title: "Derivative Power Law Speed Match",
    subtitle: "Calculus Differentiation Pairs",
    description: "Match functions f(x) with their corresponding derivatives f'(x) using the power rule d/dx[x^n] = n x^(n-1).",
    learningObjective: "Reinforce instant derivative recognition for polynomials, constants, and rational powers.",
    difficulty: "advanced",
    timeLimitSeconds: 75,
    maxScore: 150,
    masteryPointsReward: 25,
    xpReward: 100,
    matcherConfig: {
      pairs: [
        {
          id: "c1",
          concept: "f(x) = x⁴",
          match: "f'(x) = 4x³",
          hint: "Bring down power 4, subtract 1",
          category: "Power Rule"
        },
        {
          id: "c2",
          concept: "f(x) = 5x³ - 2x",
          match: "f'(x) = 15x² - 2",
          hint: "Differentiate each term independently",
          category: "Polynomials"
        },
        {
          id: "c3",
          concept: "f(x) = 12",
          match: "f'(x) = 0",
          hint: "Derivative of any constant is zero",
          category: "Constants"
        },
        {
          id: "c4",
          concept: "f(x) = 1/x (or x⁻¹)",
          match: "f'(x) = -1/x² (or -x⁻²)",
          hint: "Power rule with negative exponent",
          category: "Rational Powers"
        },
        {
          id: "c5",
          concept: "f(x) = √x (or x^(1/2))",
          match: "f'(x) = 1/(2√x)",
          hint: "1/2 * x^(-1/2)",
          category: "Radicals"
        }
      ]
    }
  },
  {
    id: "act-trig-ratios-match",
    type: "concept_matcher",
    subjectId: "math_geom_trig",
    domainId: "mathematics",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-sss-trig-geom",
    skillId: "skill-pythagoras-trig",
    title: "SOH-CAH-TOA & Special Angles",
    subtitle: "Trigonometric Exact Values",
    description: "Rapidly connect trigonometric ratios and exact values for 30°, 45°, and 60°.",
    learningObjective: "Fluently apply exact trigonometric ratios in WAEC and JAMB exam scenarios.",
    difficulty: "intermediate",
    timeLimitSeconds: 80,
    maxScore: 100,
    masteryPointsReward: 20,
    xpReward: 70,
    matcherConfig: {
      pairs: [
        {
          id: "t1",
          concept: "sin(30°)",
          match: "1/2 (or 0.5)",
          hint: "Opposite over Hypotenuse in 30-60-90 triangle",
          category: "Special Angles"
        },
        {
          id: "t2",
          concept: "cos(60°)",
          match: "1/2",
          hint: "Complementary angle to sin(30°)",
          category: "Special Angles"
        },
        {
          id: "t3",
          concept: "tan(45°)",
          match: "1",
          hint: "Isosceles right triangle ratio (Opposite/Adjacent)",
          category: "Special Angles"
        },
        {
          id: "t4",
          concept: "sin²(θ) + cos²(θ)",
          match: "1",
          hint: "Fundamental Pythagorean identity",
          category: "Trig Identities"
        },
        {
          id: "t5",
          concept: "tan(θ)",
          match: "sin(θ) / cos(θ)",
          hint: "Quotient identity",
          category: "Trig Identities"
        }
      ]
    }
  },

  // =========================================================================
  // 2. NATURAL SCIENCES (PHYSICS, CHEMISTRY, BIOLOGY)
  // =========================================================================
  {
    id: "act-phy-vectors-classification",
    type: "classification_challenge",
    subjectId: "sci_physics",
    domainId: "sciences",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-phy-mechanics",
    skillId: "skill-phy-vectors-scalars",
    title: "Scalar vs Vector Physical Quantities",
    subtitle: "Kinematics & Directional Properties",
    description: "Classify fundamental physical quantities based on whether they possess magnitude only or magnitude with direction.",
    learningObjective: "Accurately differentiate scalar from vector quantities in senior secondary physics.",
    difficulty: "foundational",
    timeLimitSeconds: 90,
    maxScore: 100,
    masteryPointsReward: 15,
    xpReward: 65,
    classificationConfig: {
      categories: [
        { id: "cat-scalar", name: "Scalar Quantities", description: "Magnitude only (no direction)", accentColor: "blue" },
        { id: "cat-vector", name: "Vector Quantities", description: "Both magnitude & direction", accentColor: "purple" }
      ],
      items: [
        { id: "i1", text: "Speed (45 km/h)", correctCategoryId: "cat-scalar", hint: "Rate of change of distance without specified direction." },
        { id: "i2", text: "Velocity (45 km/h Due North)", correctCategoryId: "cat-vector", hint: "Rate of change of displacement with direction." },
        { id: "i3", text: "Mass (12 kg)", correctCategoryId: "cat-scalar", hint: "Quantity of matter in a body." },
        { id: "i4", text: "Weight (117.6 N downward)", correctCategoryId: "cat-vector", hint: "Gravitational force acting toward earth center." },
        { id: "i5", text: "Acceleration (9.8 m/s² downward)", correctCategoryId: "cat-vector", hint: "Rate of change of velocity." },
        { id: "i6", text: "Energy / Work (500 Joules)", correctCategoryId: "cat-scalar", hint: "Dot product of force and displacement yields scalar." }
      ]
    }
  },
  {
    id: "act-chm-periodic-classification",
    type: "classification_challenge",
    subjectId: "sci_chemistry",
    domainId: "sciences",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-chm-periodicity",
    skillId: "skill-chm-elements",
    title: "Periodic Table Elemental Classification",
    subtitle: "Metals, Non-Metals & Metalloids",
    description: "Sort chemical elements into their correct electronic and physical property groups.",
    learningObjective: "Reinforce valence electrons, malleability, conductivity, and periodic trend distinctions.",
    difficulty: "intermediate",
    timeLimitSeconds: 85,
    maxScore: 100,
    masteryPointsReward: 20,
    xpReward: 70,
    classificationConfig: {
      categories: [
        { id: "cat-metal", name: "Metals", description: "Good conductors, electropositive", accentColor: "amber" },
        { id: "cat-nonmetal", name: "Non-Metals", description: "Insulators, electronegative", accentColor: "teal" },
        { id: "cat-metalloid", name: "Metalloids / Semi-Metals", description: "Intermediate semiconductor traits", accentColor: "indigo" }
      ],
      items: [
        { id: "c1", text: "Sodium (Na) - Atomic #11", correctCategoryId: "cat-metal", hint: "Alkali metal with 1 valence electron." },
        { id: "c2", text: "Chlorine (Cl) - Atomic #17", correctCategoryId: "cat-nonmetal", hint: "Halogen gas with 7 valence electrons." },
        { id: "c3", text: "Silicon (Si) - Atomic #14", correctCategoryId: "cat-metalloid", hint: "Key semiconductor used in computer microchips." },
        { id: "c4", text: "Iron (Fe) - Atomic #26", correctCategoryId: "cat-metal", hint: "Transition metal with high tensile strength." },
        { id: "c5", text: "Oxygen (O) - Atomic #8", correctCategoryId: "cat-nonmetal", hint: "Diatomic non-metal gas essential for respiration." },
        { id: "c6", text: "Germanium (Ge) - Atomic #32", correctCategoryId: "cat-metalloid", hint: "Group 14 metalloid with luster and semiconductor behavior." }
      ]
    }
  },
  {
    id: "act-bio-mitosis-sequencing",
    type: "sequencing_challenge",
    subjectId: "sci_biology",
    domainId: "sciences",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-bio-cells",
    skillId: "skill-bio-cell-division",
    title: "Phases of Mitosis Chronological Sequence",
    subtitle: "Cellular Division & Cytokinesis",
    description: "Arrange the chronological phases of mitotic cell division in their exact biological sequence.",
    learningObjective: "Understand chromosome condensation, equatorial alignment, spindle separation, and nuclear envelope reconstitution.",
    difficulty: "intermediate",
    timeLimitSeconds: 70,
    maxScore: 100,
    masteryPointsReward: 20,
    xpReward: 75,
    sequencingConfig: {
      prompt: "Arrange the stages of Mitosis in correct sequential order from start to daughter cell formation:",
      steps: [
        { id: "s1", text: "Prophase: Chromatin condenses into visible chromosomes; nuclear membrane begins to dissolve", correctOrder: 1, hint: "Initial stage where chromosomes first become visible." },
        { id: "s2", text: "Metaphase: Chromosomes line up along the equatorial metaphase plate attached to spindle fibers", correctOrder: 2, hint: "'M' for Middle alignment." },
        { id: "s3", text: "Anaphase: Sister chromatids are pulled apart toward opposite poles of the dividing cell", correctOrder: 3, hint: "'A' for Away / Apart." },
        { id: "s4", text: "Telophase: Nuclear envelopes reform around two new sets of chromosomes at opposite poles", correctOrder: 4, hint: "Final nuclear division phase." },
        { id: "s5", text: "Cytokinesis: Cytoplasm divides completely to yield two genetically identical diploid daughter cells", correctOrder: 5, hint: "Physical division of the entire cell body." }
      ]
    }
  },

  // =========================================================================
  // 3. COMPUTER SCIENCE & INFORMATION TECHNOLOGY (ICT)
  // =========================================================================
  {
    id: "act-cs-boolean-logic-matcher",
    type: "concept_matcher",
    subjectId: "tech_compsci",
    domainId: "technology_cs",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-cs-logic",
    skillId: "skill-cs-logic-gates",
    title: "Boolean Logic Gates & Truth Tables",
    subtitle: "Digital Electronics & Logical Operators",
    description: "Pair boolean logic expressions and gate operations with their corresponding truth table outcomes.",
    learningObjective: "Master fundamental boolean algebraic identities (AND, OR, NOT, XOR, NAND).",
    difficulty: "intermediate",
    timeLimitSeconds: 80,
    maxScore: 110,
    masteryPointsReward: 20,
    xpReward: 80,
    matcherConfig: {
      pairs: [
        { id: "b1", concept: "A AND B (A ∧ B)", match: "Outputs 1 ONLY when both A=1 and B=1", hint: "Conjunction gate", category: "AND Gate" },
        { id: "b2", concept: "A OR B (A ∨ B)", match: "Outputs 1 if at least one input is 1", hint: "Disjunction gate", category: "OR Gate" },
        { id: "b3", concept: "NOT A (¬A / A')", match: "Inverts 0 to 1 and 1 to 0", hint: "Inverter gate", category: "NOT Gate" },
        { id: "b4", concept: "A XOR B (A ⊕ B)", match: "Outputs 1 when inputs are DIFFERENT (0,1 or 1,0)", hint: "Exclusive OR", category: "XOR Gate" },
        { id: "b5", concept: "A NAND B (¬(A ∧ B))", match: "Outputs 0 ONLY when both inputs are 1", hint: "Universal gate", category: "NAND Gate" }
      ]
    }
  },
  {
    id: "act-cs-binary-hex-matcher",
    type: "concept_matcher",
    subjectId: "tech_compsci",
    domainId: "technology_cs",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-cs-number-systems",
    skillId: "skill-cs-binary-hex",
    title: "Binary, Decimal & Hexadecimal Number Conversion",
    subtitle: "Base 2, Base 10 & Base 16 Fluency",
    description: "Rapidly match binary bit patterns (nibbles) with their decimal and hexadecimal equivalents.",
    learningObjective: "Develop instantaneous mental conversion between 4-bit binary values and hex digits (0-F).",
    difficulty: "foundational",
    timeLimitSeconds: 75,
    maxScore: 100,
    masteryPointsReward: 15,
    xpReward: 65,
    matcherConfig: {
      pairs: [
        { id: "n1", concept: "Binary 1010₂", match: "Decimal 10 / Hex 0xA", hint: "8 + 0 + 2 + 0", category: "Base Conversion" },
        { id: "n2", concept: "Binary 1111₂", match: "Decimal 15 / Hex 0xF", hint: "All 4 bits high: 8+4+2+1", category: "Base Conversion" },
        { id: "n3", concept: "Binary 0101₂", match: "Decimal 5 / Hex 0x5", hint: "4 + 1", category: "Base Conversion" },
        { id: "n4", concept: "Binary 1100₂", match: "Decimal 12 / Hex 0xC", hint: "8 + 4", category: "Base Conversion" },
        { id: "n5", concept: "Binary 1000₂", match: "Decimal 8 / Hex 0x8", hint: "2³ = 8", category: "Base Conversion" }
      ]
    }
  },

  // =========================================================================
  // 4. LANGUAGE ARTS & ENGLISH STUDIES
  // =========================================================================
  {
    id: "act-eng-vocab-roots-matcher",
    type: "concept_matcher",
    subjectId: "lang_english",
    domainId: "languages",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-eng-lexis",
    skillId: "skill-eng-etymology",
    title: "Etymology & Morphological Roots Matcher",
    subtitle: "Greek & Latin Affixes in Academic English",
    description: "Connect Greek and Latin roots to their fundamental English meanings and derivatives.",
    learningObjective: "Expand academic vocabulary fluency for WAEC lexis and structure comprehension.",
    difficulty: "intermediate",
    timeLimitSeconds: 80,
    maxScore: 100,
    masteryPointsReward: 15,
    xpReward: 60,
    matcherConfig: {
      pairs: [
        { id: "e1", concept: "Root: 'Chron' (e.g. Chronicle, Chronometer)", match: "Relates to Time", hint: "Chronological means arranged in time order.", category: "Greek Root" },
        { id: "e2", concept: "Root: 'Bene' (e.g. Benefactor, Benevolent)", match: "Good / Well", hint: "Opposite of 'Male' (malicious).", category: "Latin Root" },
        { id: "e3", concept: "Root: 'Omni' (e.g. Omniscient, Omnipotent)", match: "All / Everywhere", hint: "Omniscient means all-knowing.", category: "Latin Root" },
        { id: "e4", concept: "Root: 'Bio' (e.g. Biology, Biosphere)", match: "Life / Living organisms", hint: "Study of living organisms.", category: "Greek Root" },
        { id: "e5", concept: "Root: 'Path' (e.g. Empathy, Pathological)", match: "Feeling / Emotion / Disease", hint: "Sympathy refers to shared feelings.", category: "Greek Root" }
      ]
    }
  },

  // =========================================================================
  // 5. COMMERCIAL & FINANCIAL LITERACY
  // =========================================================================
  {
    id: "act-fin-interest-accounting-matcher",
    type: "concept_matcher",
    subjectId: "comm_financial_lit",
    domainId: "commercial_business",
    level: "senior_secondary",
    curriculum: "WAEC_WASSCE",
    unitId: "unit-fin-math",
    skillId: "skill-fin-interest",
    title: "Financial Identities & Interest Formulas",
    subtitle: "Capital Growth, Simple & Compound Interest",
    description: "Match financial economics concepts with their mathematical formulas and balance sheet identities.",
    learningObjective: "Understand practical personal finance and commercial mathematics equations.",
    difficulty: "intermediate",
    timeLimitSeconds: 85,
    maxScore: 100,
    masteryPointsReward: 20,
    xpReward: 70,
    matcherConfig: {
      pairs: [
        { id: "f1", concept: "Simple Interest (I)", match: "I = (P × R × T) / 100", hint: "Principal × Rate × Time in years.", category: "Interest" },
        { id: "f2", concept: "Compound Amount (A)", match: "A = P(1 + r/n)^(nt)", hint: "Interest calculated on principal plus accumulated interest.", category: "Compounding" },
        { id: "f3", concept: "Accounting Fundamental Identity", match: "Assets = Liabilities + Owner's Equity", hint: "Foundational double-entry balance equation.", category: "Accounting" },
        { id: "f4", concept: "Gross Profit", match: "Revenue - Cost of Goods Sold (COGS)", hint: "Sales earnings prior to deducting operating overhead.", category: "Business" },
        { id: "f5", concept: "Depreciation (Straight-Line)", match: "(Initial Cost - Residual Value) / Useful Life", hint: "Annual asset value write-down.", category: "Valuation" }
      ]
    }
  }
];

// Default flagship export for backward compatibility with Mathematics-focused components
export const MATHEMATICS_PLAY_ACTIVITIES: PlayActivity[] = ALL_PLAY_ACTIVITIES.filter(
  (a) => a.domainId === "mathematics"
);
