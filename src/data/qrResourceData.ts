import { QRResourceRecord, QRBook } from "../types/qrResource";

export const REGISTERED_QR_BOOKS: QRBook[] = [
  {
    code: "CEMM-MTH-S1",
    title: "Comprehensive Essential Modern Mathematics (C.E.M.M)",
    shortTitle: "C.E.M.M Mathematics",
    edition: "2026 Sovereign Academic Edition",
    domainId: "mathematics",
    subjectId: "math_general",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    author: "MOOS Academy Academic Council",
    publicationYear: 2026,
    coverAccent: "indigo",
    totalChapters: 8,
    qrResourcesCount: 5,
    status: "published_flagship",
    description: "The definitive flagship senior secondary & pre-university mathematics textbook, featuring full algebraic derivations, geometric visualizations, and digital QR worked solutions.",
    chapters: [
      {
        chapterNumber: 2,
        chapterTitle: "Linear Equations & Practical Word Modelling",
        description: "Solving multi-step equations, clearing fractions, transposition, and formulating real-world word problems.",
        sections: [
          {
            sectionNumber: "2.1",
            sectionTitle: "Solving Multi-Step Linear Equations & Transposition",
            pageReference: "Pages 42 – 45",
            primaryResourceCode: "CEMM-CH2-SEC1-LIN"
          }
        ]
      },
      {
        chapterNumber: 3,
        chapterTitle: "Quadratic Equations & Polynomial Functions",
        description: "Factoring quadratic trinomials, completing the square, quadratic formula, and graphing parabolas.",
        sections: [
          {
            sectionNumber: "3.2",
            sectionTitle: "Factoring Trinomials & Roots of Quadratic Curves",
            pageReference: "Pages 74 – 78",
            primaryResourceCode: "CEMM-CH3-SEC2-EX4"
          }
        ]
      },
      {
        chapterNumber: 4,
        chapterTitle: "Indices, Surds & Logarithmic Equations",
        description: "Laws of indices, surd simplification, rationalizing denominators, and logarithmic reductions.",
        sections: [
          {
            sectionNumber: "4.3",
            sectionTitle: "Logarithmic Equivalence & Change of Base Laws",
            pageReference: "Pages 106 – 110",
            primaryResourceCode: "CEMM-Q32"
          }
        ]
      },
      {
        chapterNumber: 5,
        chapterTitle: "Trigonometry, Sine/Cosine Laws & 3D Spatial Geometry",
        description: "Right-angled trigonometry, SOH-CAH-TOA, special angles (30°, 45°, 60°), and three-figure bearings.",
        sections: [
          {
            sectionNumber: "5.1",
            sectionTitle: "Pythagorean Theorem & Fundamental Trigonometric Ratios",
            pageReference: "Pages 122 – 126",
            primaryResourceCode: "CEMM-CH5-SEC1-EX2"
          }
        ]
      },
      {
        chapterNumber: 6,
        chapterTitle: "Differential Calculus & Rates of Change",
        description: "First principles, power law differentiation, tangents, and optimization of curves.",
        sections: [
          {
            sectionNumber: "6.1",
            sectionTitle: "First Principles & Power Rule Differentiation",
            pageReference: "Pages 168 – 172",
            primaryResourceCode: "CEMM-CH6-SEC1-RATE"
          }
        ]
      }
    ]
  },
  {
    code: "CEMM-PHY-S1",
    title: "Comprehensive Essential Modern Physics (C.E.M.P)",
    shortTitle: "C.E.M.P Physics",
    edition: "2026 National STEM Edition",
    domainId: "sciences",
    subjectId: "sci_physics",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    author: "MOOS Academy Science & Engineering Division",
    publicationYear: 2026,
    coverAccent: "blue",
    totalChapters: 6,
    qrResourcesCount: 1,
    status: "expanding_catalogue",
    description: "Rigorous high-school physics covering classical mechanics, thermodynamics, wave optics, electricity, and atomic physics.",
    chapters: [
      {
        chapterNumber: 2,
        chapterTitle: "Vectors, Kinematics & Linear Motion",
        description: "Vector resolution, equations of uniformly accelerated motion, and projectile trajectory analysis.",
        sections: [
          {
            sectionNumber: "2.1",
            sectionTitle: "Scalar and Vector Quantities Resolution",
            pageReference: "Pages 38 – 42",
            primaryResourceCode: "CEMM-PHY-CH2-SEC1-VEC"
          }
        ]
      }
    ]
  },
  {
    code: "CEMM-CHM-S1",
    title: "Comprehensive Essential Modern Chemistry (C.E.M.C)",
    shortTitle: "C.E.M.C Chemistry",
    edition: "2026 National STEM Edition",
    domainId: "sciences",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    author: "MOOS Academy Chemical Sciences Board",
    publicationYear: 2026,
    coverAccent: "teal",
    totalChapters: 6,
    qrResourcesCount: 1,
    status: "expanding_catalogue",
    description: "Atomic structure, periodic periodicity, chemical bonding, stoichiometry, and organic chemistry.",
    chapters: [
      {
        chapterNumber: 3,
        chapterTitle: "Periodic Trends & Electronic Configurations",
        description: "Ionization energy, electron affinity, electronegativity, and elemental classification across periods and groups.",
        sections: [
          {
            sectionNumber: "3.1",
            sectionTitle: "Metals, Non-Metals & Semiconductor Metalloids",
            pageReference: "Pages 55 – 59",
            primaryResourceCode: "CEMM-CHM-CH3-SEC1-MOL"
          }
        ]
      }
    ]
  },
  {
    code: "CEMM-ENG-S1",
    title: "Comprehensive Essential Senior English & Grammar",
    shortTitle: "Essential Senior English",
    edition: "2026 West African Academic Edition",
    domainId: "languages",
    subjectId: "lang_english",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    author: "MOOS Academy Department of Humanities",
    publicationYear: 2026,
    coverAccent: "rose",
    totalChapters: 5,
    qrResourcesCount: 1,
    status: "expanding_catalogue",
    description: "Advanced lexis and structure, syntactic clauses, oral English phonetics, and argumentative essay composition.",
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Morphology, Etymology & Vocabulary Building",
        description: "Greek and Latin roots, prefix/suffix affixes, antonyms, synonyms, and contextual comprehension.",
        sections: [
          {
            sectionNumber: "1.2",
            sectionTitle: "Etymological Roots and Affixation in Lexis",
            pageReference: "Pages 22 – 26",
            primaryResourceCode: "CEMM-ENG-CH1-SEC2-ESS"
          }
        ]
      }
    ]
  },
  {
    code: "CEMM-BIO-S1",
    title: "Comprehensive Essential Modern Biology",
    shortTitle: "Essential Biology",
    edition: "2026 Life Sciences Edition",
    domainId: "sciences",
    subjectId: "sci_biology",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    author: "MOOS Academy Biological Sciences Division",
    publicationYear: 2026,
    coverAccent: "emerald",
    totalChapters: 6,
    qrResourcesCount: 1,
    status: "expanding_catalogue",
    description: "Cell structure, physiology, genetics, ecology, and evolutionary adaptations.",
    chapters: [
      {
        chapterNumber: 4,
        chapterTitle: "Cellular Division & Genetics",
        description: "Mitosis vs meiosis, chromosome behavior, Mendelian inheritance ratios, and DNA replication.",
        sections: [
          {
            sectionNumber: "4.1",
            sectionTitle: "Sequential Phases of Mitotic Division",
            pageReference: "Pages 82 – 86",
            primaryResourceCode: "CEMM-BIO-CH4-SEC1-CEL"
          }
        ]
      }
    ]
  },
  {
    code: "CEMM-ICT-S1",
    title: "Applied Computer Science & Computational Logic",
    shortTitle: "Applied Computer Science",
    edition: "2026 Digital Computing Edition",
    domainId: "technology_cs",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    author: "MOOS Academy Computing Faculty",
    publicationYear: 2026,
    coverAccent: "violet",
    totalChapters: 5,
    qrResourcesCount: 1,
    status: "expanding_catalogue",
    description: "Number bases (Binary/Hex), Boolean algebra, algorithm design, pseudocode, and database architecture.",
    chapters: [
      {
        chapterNumber: 2,
        chapterTitle: "Boolean Logic & Digital Gates",
        description: "Truth tables, fundamental logic gates (AND, OR, NOT, XOR, NAND), and combinational logic circuits.",
        sections: [
          {
            sectionNumber: "2.1",
            sectionTitle: "Truth Tables and Gate Equivalences",
            pageReference: "Pages 40 – 44",
            primaryResourceCode: "CEMM-ICT-CH2-SEC1-LOG"
          }
        ]
      }
    ]
  }
];

export const REGISTERED_QR_RESOURCES: QRResourceRecord[] = [
  // -------------------------------------------------------------------------
  // 1. C.E.M.M MATHEMATICS (FLAGSHIP COMPANIONS)
  // -------------------------------------------------------------------------
  {
    resourceCode: "CEMM-CH3-SEC2-EX4",
    bookCode: "CEMM-MTH-S1",
    bookTitle: "Comprehensive Essential Modern Mathematics (C.E.M.M)",
    bookEdition: "2026 Sovereign Academic Edition",
    chapterNumber: 3,
    chapterTitle: "Quadratic Equations & Polynomial Functions",
    sectionNumber: "3.2",
    sectionTitle: "Factoring Trinomials & Roots of Quadratic Curves",
    exerciseNumber: "Exercise 3.2 (Questions 4 - 8)",
    pageReference: "Pages 74 – 78",
    resourceType: "exercise_companion",
    title: "C.E.M.M Digital Companion: Factoring Quadratic Trinomials",
    subtitle: "Complete worked solutions, Socratic error analysis, and interactive identities",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-sss-quadratics",
    targetSkillId: "skill-quad-factoring",
    associatedPlayActivityId: "act-concept-match-algebra",
    learningObjectives: [
      "Find two integers m and n whose sum is b and product is ac",
      "Factor by grouping when the coefficient of x² is not 1",
      "Verify roots using the zero-product property: if (x - p)(x - q) = 0 then x = p or x = q",
      "Avoid sign reversal misconceptions when factoring negative constant terms"
    ],
    digitalExplanation: {
      overview: "In Chapter 3, Section 3.2 of C.E.M.M, we explore how any standard quadratic equation ax² + bx + c = 0 can be decomposed into linear binomial factors. This digital companion breaks down key textbook proofs, worked examples, and common examiner traps in WAEC and JAMB.",
      keyFormulas: [
        "Standard Form: ax² + bx + c = 0 (where a ≠ 0)",
        "Decomposition: ax² + mx + nx + c = 0 where m + n = b and m · n = a · c",
        "Zero Product Property: A · B = 0 ⟹ A = 0 or B = 0",
        "Difference of Two Squares: a² - b² = (a + b)(a - b)"
      ],
      commonMisconceptions: [
        "Confusing factor signs with root signs: If factors are (x - 3)(x + 2) = 0, the roots are x = 3 and x = -2 (not -3 and 2).",
        "Dividing both sides by x when solving x² = 5x (which erroneously eliminates the vital root x = 0).",
        "Attempting to factor before setting the equation equal to 0."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Examine C.E.M.M Chapter 3 Exercise 3.2 Question 4: Solve 2x² + 5x - 3 = 0",
          mathExpression: "2x^2 + 5x - 3 = 0",
          reasoning: "Identify coefficients: a = 2, b = 5, c = -3. Compute the product ac = 2 × (-3) = -6."
        },
        {
          stepNumber: 2,
          instruction: "Determine the two factors of -6 that sum to +5",
          mathExpression: "6 + (-1) = 5 \\quad \\text{and} \\quad 6 \\times (-1) = -6",
          reasoning: "The required split numbers are +6 and -1."
        },
        {
          stepNumber: 3,
          instruction: "Rewrite the middle term 5x and factor by grouping",
          mathExpression: "2x^2 + 6x - x - 3 = 0 \\implies 2x(x + 3) - 1(x + 3) = 0",
          reasoning: "Extract common binomial factor (x + 3)."
        },
        {
          stepNumber: 4,
          instruction: "Apply the Zero Product Property to determine the solution set",
          mathExpression: "(2x - 1)(x + 3) = 0 \\implies 2x - 1 = 0 \\quad \\text{or} \\quad x + 3 = 0",
          reasoning: "Therefore x = 1/2 or x = -3."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-sss-quad-1", "q-sss-quad-2"],
    tutorStarterPrompt: "I am working on C.E.M.M Chapter 3, Section 3.2. Can you guide me step-by-step through factoring quadratic trinomials without giving away the direct answers?"
  },
  {
    resourceCode: "CEMM-CH5-SEC1-EX2",
    bookCode: "CEMM-MTH-S1",
    bookTitle: "Comprehensive Essential Modern Mathematics (C.E.M.M)",
    bookEdition: "2026 Sovereign Academic Edition",
    chapterNumber: 5,
    chapterTitle: "Trigonometry, Sine/Cosine Laws & 3D Spatial Geometry",
    sectionNumber: "5.1",
    sectionTitle: "Pythagorean Theorem & Fundamental Trigonometric Ratios",
    exerciseNumber: "Exercise 5.1 (Questions 1 - 6)",
    pageReference: "Pages 122 – 126",
    resourceType: "exercise_companion",
    title: "C.E.M.M Digital Companion: Right-Angled Triangles & Exact Ratios",
    subtitle: "Interactive diagrams, trigonometric definitions, and bearing applications",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-sss-trig-bearings",
    targetSkillId: "skill-sine-cosine-rule",
    associatedPlayActivityId: "act-trig-ratios-match",
    learningObjectives: [
      "Identify Hypotenuse, Opposite, and Adjacent sides relative to a reference angle θ",
      "Apply SOH-CAH-TOA definitions accurately",
      "Derive exact values for sin, cos, and tan at 30°, 45°, and 60° without a calculator",
      "Calculate unknown sides and angles in survey and elevation problems"
    ],
    digitalExplanation: {
      overview: "Section 5.1 of C.E.M.M introduces the rigorous foundations of trigonometry. This companion provides digital visualization of right-angled triangles, step-by-step angle of elevation problems, and interactive exact ratio matching.",
      keyFormulas: [
        "Pythagoras Theorem: a² + b² = c² (where c is hypotenuse)",
        "sin(θ) = Opposite / Hypotenuse",
        "cos(θ) = Adjacent / Hypotenuse",
        "tan(θ) = Opposite / Adjacent = sin(θ) / cos(θ)",
        "Exact Values: sin(30°) = 1/2, cos(30°) = √3/2, tan(45°) = 1"
      ],
      commonMisconceptions: [
        "Misidentifying Opposite and Adjacent when the triangle is rotated or inverted.",
        "Attempting to use SOH-CAH-TOA on non-right-angled triangles without applying the Sine or Cosine rule.",
        "Confusing angle of elevation (measured from horizontal upwards) with angle of depression."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Examine C.E.M.M Chapter 5 Exercise 5.1 Question 2: In right triangle ABC, angle B = 90°, AB = 8 cm, BC = 6 cm. Find sin(A) and AC.",
          mathExpression: "AC^2 = AB^2 + BC^2 = 8^2 + 6^2 = 64 + 36 = 100",
          reasoning: "Apply Pythagoras Theorem to find the hypotenuse AC = √100 = 10 cm."
        },
        {
          stepNumber: 2,
          instruction: "Identify the side opposite to angle A and compute sin(A)",
          mathExpression: "\\sin(A) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{BC}{AC} = \\frac{6}{10} = \\frac{3}{5} = 0.6",
          reasoning: "BC is directly opposite to angle A, while AC is the hypotenuse."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-sss-trig-1"],
    tutorStarterPrompt: "I am studying C.E.M.M Chapter 5 Section 5.1. Can you help me understand how to calculate exact values for 30° and 60° angles using an equilateral triangle?"
  },
  {
    resourceCode: "CEMM-CH6-SEC1-RATE",
    bookCode: "CEMM-MTH-S1",
    bookTitle: "Comprehensive Essential Modern Mathematics (C.E.M.M)",
    bookEdition: "2026 Sovereign Academic Edition",
    chapterNumber: 6,
    chapterTitle: "Differential Calculus & Rates of Change",
    sectionNumber: "6.1",
    sectionTitle: "First Principles & Power Rule Differentiation",
    exerciseNumber: "Exercise 6.1 (Worked Example 2)",
    pageReference: "Pages 168 – 172",
    resourceType: "concept_deep_dive",
    title: "C.E.M.M Digital Companion: Differential Power Rule",
    subtitle: "From limits of secant lines to instantaneous velocity and tangents",
    curriculumStandard: "JAMB_UTME",
    targetUnitId: "unit-sss-quadratics",
    targetSkillId: "skill-quad-factoring",
    associatedPlayActivityId: "act-calculus-derivatives-matcher",
    learningObjectives: [
      "Understand the derivative as the limit of average rate of change Δy/Δx as Δx → 0",
      "Apply the power rule d/dx[a x^n] = n · a x^(n-1)",
      "Compute gradients of tangent lines to curves at specified points",
      "Differentiate polynomial functions term by term"
    ],
    digitalExplanation: {
      overview: "Chapter 6 of C.E.M.M bridges high school mathematics with university STEM preparation. This companion demonstrates the power rule of differentiation and connects rate of change directly with physics kinematics.",
      keyFormulas: [
        "First Principles: f'(x) = lim_{h → 0} [f(x + h) - f(x)] / h",
        "Power Rule: d/dx [x^n] = n x^(n-1)",
        "Constant Multiple: d/dx [c · f(x)] = c · f'(x)",
        "Derivative of Constant: d/dx [k] = 0"
      ],
      commonMisconceptions: [
        "Forgetting to multiply by the power before reducing the exponent.",
        "Incorrectly differentiating constants (e.g. thinking d/dx[5] = 5 instead of 0).",
        "Confusing the derivative function f'(x) with the gradient at a specific numerical point x = a."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Examine C.E.M.M Chapter 6 Worked Example 2: Find the derivative of f(x) = 4x³ - 5x² + 7x - 9",
          mathExpression: "f'(x) = \\frac{d}{dx}[4x^3] - \\frac{d}{dx}[5x^2] + \\frac{d}{dx}[7x] - \\frac{d}{dx}[9]",
          reasoning: "Apply linearity of differentiation to differentiate each polynomial term independently."
        },
        {
          stepNumber: 2,
          instruction: "Apply power rule to each individual term",
          mathExpression: "f'(x) = (3 \\times 4)x^{3-1} - (2 \\times 5)x^{2-1} + (1 \\times 7)x^{1-1} - 0",
          reasoning: "Simplify arithmetic: 12x² - 10x + 7."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-adv-calc-1", "q-adv-calc-2"],
    tutorStarterPrompt: "I'm reviewing C.E.M.M Chapter 6 on Differential Calculus. Can you quiz me on applying the power rule to negative and fractional exponents?"
  },
  {
    resourceCode: "CEMM-CH2-SEC1-LIN",
    bookCode: "CEMM-MTH-S1",
    bookTitle: "Comprehensive Essential Modern Mathematics (C.E.M.M)",
    bookEdition: "2026 Sovereign Academic Edition",
    chapterNumber: 2,
    chapterTitle: "Linear Equations & Practical Word Modelling",
    sectionNumber: "2.1",
    sectionTitle: "Solving Multi-Step Linear Equations & Transposition",
    exerciseNumber: "Exercise 2.1 (Questions 1 - 10)",
    pageReference: "Pages 42 – 45",
    resourceType: "exercise_companion",
    title: "C.E.M.M Digital Companion: Multi-Step Linear Equations",
    subtitle: "Interactive scale balance, transposition rules, and word problem formulation",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-jss-algebra-linear",
    targetSkillId: "skill-linear-equations",
    associatedPlayActivityId: "act-eq-balance-linear",
    learningObjectives: [
      "Collect like terms on one side of an equality",
      "Isolate the unknown variable using inverse operations",
      "Clear denominators in linear equations involving simple fractions",
      "Translate everyday word scenarios into algebraic equations"
    ],
    digitalExplanation: {
      overview: "Chapter 2 of C.E.M.M develops algebraic fluencies essential for junior and senior secondary mathematics. This digital resource gives students interactive equation balancing and Socratic reasoning for solving linear equations.",
      keyFormulas: [
        "Golden Rule of Balance: Any operation applied to the left side must be applied equally to the right side.",
        "Standard Form: ax + b = c ⟹ ax = c - b ⟹ x = (c - b) / a",
        "Clearing Fractions: Multiply every term by the LCM of denominators."
      ],
      commonMisconceptions: [
        "Changing the sign when moving a term across the equality sign without applying subtraction.",
        "Multiplying only some terms by the LCM instead of every term.",
        "Dividing only the constant term instead of the entire opposite side."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Examine C.E.M.M Chapter 2 Exercise 2.1 Question 6: Solve 3(2x - 4) = 4x + 6",
          mathExpression: "6x - 12 = 4x + 6",
          reasoning: "Expand brackets on the left side: 3 × 2x = 6x and 3 × (-4) = -12."
        },
        {
          stepNumber: 2,
          instruction: "Collect variable terms on the left and constants on the right",
          mathExpression: "6x - 4x = 6 + 12 \\implies 2x = 18",
          reasoning: "Subtract 4x from both sides and add 12 to both sides."
        },
        {
          stepNumber: 3,
          instruction: "Divide both sides by the coefficient of x",
          mathExpression: "x = \\frac{18}{2} = 9",
          reasoning: "Divide by 2 to isolate x."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-jss-lin-1"],
    tutorStarterPrompt: "I am working through C.E.M.M Chapter 2 on Linear Equations. Can you show me how to formulate word problems into linear equations step-by-step?"
  },
  {
    resourceCode: "CEMM-Q32",
    bookCode: "CEMM-MTH-S1",
    bookTitle: "Comprehensive Essential Modern Mathematics (C.E.M.M)",
    bookEdition: "2026 Sovereign Academic Edition",
    chapterNumber: 4,
    chapterTitle: "Indices, Surds & Logarithmic Equations",
    sectionNumber: "4.3",
    sectionTitle: "Logarithmic Equivalence & Change of Base Laws",
    exerciseNumber: "Exercise 4.3 (Question 32)",
    pageReference: "Page 108",
    resourceType: "exercise_companion",
    title: "C.E.M.M Digital Companion: Logarithmic Equations (Q32)",
    subtitle: "Step-by-step resolution of exponential to logarithmic conversions and base equivalence",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-indices-logs",
    targetSkillId: "skill-logarithms",
    associatedPlayActivityId: "act-concept-match-algebra",
    learningObjectives: [
      "Convert exponential forms a^y = x into logarithmic forms log_a(x) = y",
      "Apply the product, quotient, and power rules of logarithms",
      "Resolve logarithmic equations with identical bases",
      "Check for extraneous roots where log arguments must be strictly positive"
    ],
    digitalExplanation: {
      overview: "Question 32 in Chapter 4 of C.E.M.M focuses on solving equations where unknown variables appear in exponents, requiring systematic logarithmic reduction.",
      keyFormulas: [
        "Fundamental Definition: log_b(x) = y ⟺ b^y = x (for b > 0, b ≠ 1, x > 0)",
        "Product Rule: log_b(MN) = log_b(M) + log_b(N)",
        "Quotient Rule: log_b(M/N) = log_b(M) - log_b(N)",
        "Power Law: log_b(M^k) = k · log_b(M)"
      ],
      commonMisconceptions: [
        "Confusing log(M + N) with log(M) + log(N) (which is mathematically invalid).",
        "Retaining negative solutions that cause the argument of a logarithm to be ≤ 0.",
        "Dividing log(A) by log(B) and assuming it equals log(A - B)."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Examine C.E.M.M Chapter 4 Exercise 4.3 Question 32: Solve log₂(x) + log₂(x - 2) = 3",
          mathExpression: "\\log_2(x(x - 2)) = 3",
          reasoning: "Apply the Product Rule of logarithms to combine the left side into a single logarithm."
        },
        {
          stepNumber: 2,
          instruction: "Convert logarithmic equation into its equivalent exponential form",
          mathExpression: "x(x - 2) = 2^3 = 8 \\implies x^2 - 2x - 8 = 0",
          reasoning: "Base 2 raised to power 3 gives 8."
        },
        {
          stepNumber: 3,
          instruction: "Factor the resulting quadratic equation",
          mathExpression: "(x - 4)(x + 2) = 0 \\implies x = 4 \\quad \\text{or} \\quad x = -2",
          reasoning: "Two numbers whose product is -8 and sum is -2 are -4 and +2."
        },
        {
          stepNumber: 4,
          instruction: "Verify validity in the original logarithmic domain",
          mathExpression: "\\text{For } x = 4: \\log_2(4) + \\log_2(2) = 2 + 1 = 3 \\quad \\checkmark",
          reasoning: "Since log₂(-2) is undefined for real numbers, x = -2 is an extraneous root. The unique valid root is x = 4."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-sss-quad-1"],
    tutorStarterPrompt: "I am solving C.E.M.M Chapter 4 Question 32 on logarithmic equations. Can you explain why extraneous roots arise when converting logarithms to quadratics?"
  },

  // -------------------------------------------------------------------------
  // 2. C.E.M.P PHYSICS COMPANION SEED
  // -------------------------------------------------------------------------
  {
    resourceCode: "CEMM-PHY-CH2-SEC1-VEC",
    bookCode: "CEMM-PHY-S1",
    bookTitle: "Comprehensive Essential Modern Physics (C.E.M.P)",
    bookEdition: "2026 National STEM Edition",
    chapterNumber: 2,
    chapterTitle: "Vectors, Kinematics & Linear Motion",
    sectionNumber: "2.1",
    sectionTitle: "Scalar and Vector Quantities Resolution",
    exerciseNumber: "Exercise 2.1 (Questions 1 - 4)",
    pageReference: "Pages 38 – 42",
    resourceType: "exercise_companion",
    title: "C.E.M.P Digital Companion: Vector Resolution & Direction",
    subtitle: "Decomposition into orthogonal components (Fx = F cos θ, Fy = F sin θ)",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-phy-mechanics-motion",
    targetSkillId: "skill-phy-kinematics",
    associatedPlayActivityId: "act-phy-vectors-classification",
    learningObjectives: [
      "Differentiate between scalar and vector quantities",
      "Resolve coplanar force vectors along perpendicular horizontal and vertical axes",
      "Calculate resultant vector magnitude using Pythagoras R = √(Rx² + Ry²)",
      "Determine bearing angle θ = arctan(Ry / Rx)"
    ],
    digitalExplanation: {
      overview: "Chapter 2 of C.E.M.P covers the foundational mechanics of vectors. This companion guides learners through resolving vectors into orthogonal components and computing resultant trajectories.",
      keyFormulas: [
        "Horizontal Component: Fx = F · cos(θ)",
        "Vertical Component: Fy = F · sin(θ)",
        "Resultant Magnitude: R = √(Fx² + Fy²)",
        "Direction Angle: tan(α) = |Fy / Fx|"
      ],
      commonMisconceptions: [
        "Swapping sin and cos when the angle θ is given relative to the vertical axis instead of horizontal.",
        "Adding vector magnitudes algebraically without vector addition."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Resolve a force of 50 N acting at 30° to the positive horizontal axis",
          mathExpression: "F_x = 50 \\cos(30^\\circ) = 50 \\times 0.8660 = 43.30\\text{ N}",
          reasoning: "The horizontal component is aligned with the adjacent side."
        },
        {
          stepNumber: 2,
          instruction: "Calculate the vertical orthogonal component",
          mathExpression: "F_y = 50 \\sin(30^\\circ) = 50 \\times 0.5 = 25.00\\text{ N}",
          reasoning: "The vertical component is aligned with the opposite side."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-phy-1"],
    tutorStarterPrompt: "I am studying C.E.M.P Chapter 2 on vector resolution. Can you guide me on resolving multiple concurrent coplanar forces step-by-step?"
  },

  // -------------------------------------------------------------------------
  // 3. C.E.M.C CHEMISTRY COMPANION SEED
  // -------------------------------------------------------------------------
  {
    resourceCode: "CEMM-CHM-CH3-SEC1-MOL",
    bookCode: "CEMM-CHM-S1",
    bookTitle: "Comprehensive Essential Modern Chemistry (C.E.M.C)",
    bookEdition: "2026 National STEM Edition",
    chapterNumber: 3,
    chapterTitle: "Periodic Trends & Electronic Configurations",
    sectionNumber: "3.1",
    sectionTitle: "Metals, Non-Metals & Semiconductor Metalloids",
    exerciseNumber: "Exercise 3.1 (Questions 1 - 5)",
    pageReference: "Pages 55 – 59",
    resourceType: "concept_deep_dive",
    title: "C.E.M.C Digital Companion: Elemental Periodicity & Valence",
    subtitle: "Periodic table trends, ionization potential, and electron affinity",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-chm-atomic-periodicity",
    targetSkillId: "skill-chm-atomic-structure",
    associatedPlayActivityId: "act-chm-periodic-classification",
    learningObjectives: [
      "Identify the s, p, d, and f orbital blocks in the modern Periodic Table",
      "Explain the periodic trend in atomic radius across periods and down groups",
      "Correlate valence electron count with chemical bonding behavior"
    ],
    digitalExplanation: {
      overview: "Section 3.1 of C.E.M.C analyzes how the atomic number and valence shell configuration dictate the chemical and physical characteristics of elements.",
      keyFormulas: [
        "Effective Nuclear Charge: Z_eff = Z - S",
        "Molar Mass & Moles: n = m / M",
        "Avogadro's Number: N_A = 6.022 × 10²³ entities/mol"
      ],
      commonMisconceptions: [
        "Assuming atomic radius increases across a period (it actually decreases due to increasing effective nuclear charge Z_eff).",
        "Confusing electron affinity with electronegativity."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Determine the electronic configuration of Sodium (Na, Z = 11)",
          mathExpression: "\\text{Na (11): } 1s^2 2s^2 2p^6 3s^1 \\quad \\text{or } [\\text{Ne}] 3s^1",
          reasoning: "With 1 valence electron in the 3s orbital, Sodium easily loses an electron to form a Na⁺ cation."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-chm-1"],
    tutorStarterPrompt: "I am reading C.E.M.C Chapter 3 on periodic trends. Can you explain why electronegativity increases across a period but decreases down a group?"
  },

  // -------------------------------------------------------------------------
  // 4. SENIOR ENGLISH COMPANION SEED
  // -------------------------------------------------------------------------
  {
    resourceCode: "CEMM-ENG-CH1-SEC2-ESS",
    bookCode: "CEMM-ENG-S1",
    bookTitle: "Comprehensive Essential Senior English & Grammar",
    bookEdition: "2026 West African Academic Edition",
    chapterNumber: 1,
    chapterTitle: "Morphology, Etymology & Vocabulary Building",
    sectionNumber: "1.2",
    sectionTitle: "Etymological Roots and Affixation in Lexis",
    exerciseNumber: "Exercise 1.2 (Vocabulary Drills)",
    pageReference: "Pages 22 – 26",
    resourceType: "concept_deep_dive",
    title: "Essential English Digital Companion: Morphological Roots",
    subtitle: "Greek and Latin affixes for academic vocabulary expansion",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-eng-lexis-vocabulary",
    targetSkillId: "skill-eng-roots-affixes",
    associatedPlayActivityId: "act-eng-vocab-roots-matcher",
    learningObjectives: [
      "Identify common Greek and Latin root morphemes",
      "Differentiate between inflectional and derivational affixes",
      "Infer unfamiliar lexical definitions from context and root etymology"
    ],
    digitalExplanation: {
      overview: "Chapter 1 of Essential Senior English teaches morphological decomposition of words to excel in WAEC Lexis, Structure, and Comprehension examinations.",
      keyFormulas: [
        "Word Formation: Prefix + Root + Suffix = Derivative Lexeme",
        "Examples: 'Anti' (against) + 'pathy' (feeling) = Antipathy (strong dislike)"
      ],
      commonMisconceptions: [
        "Confusing words with similar phonetics but distinct etymologies (e.g. compliment vs complement)."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Analyze the morphemes in 'Benevolent'",
          mathExpression: "\\text{Prefix 'Bene' (well/good) + Latin root 'Volent' (wishing/willing)}",
          reasoning: "Benevolent literally translates to wishing well towards others, meaning generous and kind."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-eng-root-1"],
    tutorStarterPrompt: "I'm working on Essential Senior English Chapter 1. Can you help me practice identifying Greek and Latin roots in context?"
  },

  // -------------------------------------------------------------------------
  // 5. BIOLOGY COMPANION SEED
  // -------------------------------------------------------------------------
  {
    resourceCode: "CEMM-BIO-CH4-SEC1-CEL",
    bookCode: "CEMM-BIO-S1",
    bookTitle: "Comprehensive Essential Modern Biology",
    bookEdition: "2026 Life Sciences Edition",
    chapterNumber: 4,
    chapterTitle: "Cellular Division & Genetics",
    sectionNumber: "4.1",
    sectionTitle: "Sequential Phases of Mitotic Division",
    exerciseNumber: "Exercise 4.1 (Diagram Checkpoint)",
    pageReference: "Pages 82 – 86",
    resourceType: "concept_deep_dive",
    title: "Essential Biology Companion: Mitotic Cell Division",
    subtitle: "Chromosomal condensation, spindle alignment, and daughter cell formation",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-bio-cell-genetics",
    targetSkillId: "skill-bio-cell-structure",
    associatedPlayActivityId: "act-bio-mitosis-sequencing",
    learningObjectives: [
      "Identify the chronological phases of mitosis: Prophase, Metaphase, Anaphase, Telophase",
      "Explain the significance of mitosis in tissue repair, growth, and asexual reproduction",
      "Distinguish between mitotic (2n) and meiotic (n) chromosome outcomes"
    ],
    digitalExplanation: {
      overview: "Section 4.1 of Essential Biology details cellular reproduction, illustrating how diploid somatic cells duplicate genetic material to preserve genetic consistency.",
      keyFormulas: [
        "Mitosis Output: 1 Parent Cell (2n) ⟹ 2 Genetically Identical Daughter Cells (2n)",
        "Stages: P-M-A-T (Prophase, Metaphase, Anaphase, Telophase)"
      ],
      commonMisconceptions: [
        "Confusing sister chromatids with homologous chromosome pairs.",
        "Thinking cytokinesis is part of telophase rather than the distinct physical cleavage of the cytoplasm."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Trace the behavior of chromosomes during Metaphase",
          mathExpression: "\\text{Alignment along equatorial plate under tension from mitotic spindle fibers}",
          reasoning: "Ensures that during anaphase, sister chromatids separate symmetrically to opposite poles."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-bio-1"],
    tutorStarterPrompt: "I'm studying Essential Biology Chapter 4 on cell division. Can you test my understanding of mitosis vs meiosis?"
  },

  // -------------------------------------------------------------------------
  // 6. APPLIED COMPUTER SCIENCE COMPANION SEED
  // -------------------------------------------------------------------------
  {
    resourceCode: "CEMM-ICT-CH2-SEC1-LOG",
    bookCode: "CEMM-ICT-S1",
    bookTitle: "Applied Computer Science & Computational Logic",
    bookEdition: "2026 Digital Computing Edition",
    chapterNumber: 2,
    chapterTitle: "Boolean Logic & Digital Gates",
    sectionNumber: "2.1",
    sectionTitle: "Truth Tables and Gate Equivalences",
    exerciseNumber: "Exercise 2.1 (Logic Gates)",
    pageReference: "Pages 40 – 44",
    resourceType: "exercise_companion",
    title: "Applied CS Companion: Boolean Logic & Digital Circuits",
    subtitle: "Truth table synthesis, De Morgan's laws, and logic circuit design",
    curriculumStandard: "WAEC_WASSCE",
    targetUnitId: "unit-cs-architecture-number-systems",
    targetSkillId: "skill-cs-logic-gates",
    associatedPlayActivityId: "act-cs-boolean-logic-matcher",
    learningObjectives: [
      "Construct truth tables for composite boolean expressions",
      "Apply De Morgan's Laws: ¬(A ∧ B) = ¬A ∨ ¬B and ¬(A ∨ B) = ¬A ∧ ¬B",
      "Map boolean logic formulas to digital gate diagrams"
    ],
    digitalExplanation: {
      overview: "Chapter 2 of Applied Computer Science introduces the mathematical foundations of digital computation and CPU logic circuits.",
      keyFormulas: [
        "AND Gate: Y = A · B",
        "OR Gate: Y = A + B",
        "NOT Gate: Y = A'",
        "XOR Gate: Y = A ⊕ B = A'B + AB'",
        "De Morgan: (A · B)' = A' + B'"
      ],
      commonMisconceptions: [
        "Confusing bitwise XOR with inclusive OR (XOR gives 0 when both inputs are 1).",
        "Treating logic '+' as standard arithmetic addition instead of logical OR."
      ],
      workedSolutionSteps: [
        {
          stepNumber: 1,
          instruction: "Evaluate the boolean output for Y = (A OR B) AND (NOT A) where A = 1 and B = 1",
          mathExpression: "Y = (1 \\lor 1) \\land (\\neg 1) = 1 \\land 0 = 0",
          reasoning: "Since NOT 1 is 0, the final AND conjunction evaluates to 0."
        }
      ]
    },
    additionalPracticeQuestionIds: ["q-cs-num-1"],
    tutorStarterPrompt: "I am working through Applied Computer Science Chapter 2 on logic gates. Can you give me a boolean expression to simplify using De Morgan's laws?"
  }
];
