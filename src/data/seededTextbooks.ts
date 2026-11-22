/**
 * MOOS ACADEMY TEXTBOOK STUDIO — SEEDED COMPLETE TEXTBOOKS
 * 
 * Complete multi-volume STEM treatises with arbitrary chapter counts,
 * fully populated chapters (9 in Mathematics, 10 in Physics),
 * step-by-step mathematical derivations, graduated 4-tier practice sets,
 * and stable physical-to-digital QR bridges.
 */

import { TextbookProject } from "../types/textbookStudio";

export const SEEDED_TEXTBOOK_PROJECTS: TextbookProject[] = [
  // =========================================================================
  // 1. C.E.M.M MODERN MATHEMATICS (SENIOR SECONDARY — 9 COMPLETE CHAPTERS)
  // =========================================================================
  {
    id: "tb-cemm-math",
    code: "CEMM-MTH-ADV",
    title: "C.E.M.M Modern Mathematics: Foundational to Advanced Senior Secondary",
    subtitle: "A Rigorous, Concept-First Pedagogical Treatise with Physical QR Digital Companions",
    discipline: "mathematics",
    targetLevel: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    curriculumMappingStatus: "verified",
    edition: {
      editionNumber: 1,
      editionName: "First Comprehensive National Edition",
      releaseYear: 2026,
      isbn: "978-978-782-104-5",
      printFormat: "hardcover",
      totalEstimatedPages: 580
    },
    authors: [
      {
        id: "auth-adeleke-1",
        name: "Dr. O. Adeleke",
        title: "Lead Mathematical Pedagogue",
        affiliation: "MOOS Academy Institute of Cognitive Systems",
        bio: "Specialist in secondary STEM schema design and cognitive load reduction in algebraic derivations.",
        isLeadAuthor: true
      },
      {
        id: "auth-ibrahim-2",
        name: "Engr. Fatima Ibrahim",
        title: "Senior Curriculum Consultant",
        affiliation: "West African Mathematical Society",
        bio: "Co-author of national secondary algebra syllabi with over 18 years classroom experience.",
        isLeadAuthor: false
      }
    ],
    contributors: [
      {
        id: "contrib-1",
        name: "Prof. Chidi Okafor",
        role: "mathematician",
        institution: "University of Lagos, Dept of Pure Mathematics"
      },
      {
        id: "contrib-2",
        name: "Amina Bello, M.Ed",
        role: "pedagogical_editor",
        institution: "National Teachers' Institute (NTI)"
      }
    ],
    bookBrief: {
      targetAudienceDescription: "Senior Secondary learners (SS1-SS3), WAEC/WASSCE and UTME candidates requiring conceptual depth.",
      pedagogicalPhilosophy: "First principles intuition precedes symbolic notation. Every derivation is accompanied by step-by-step reasoning and graduated 4-tier problem sets.",
      differentiatingFeatures: [
        "Zero leap-of-faith derivations.",
        "Graduated 4-tier exercises: Drill, Conceptual, Applied, Exam Mastery.",
        "Physical QR codes connecting directly to step-by-step Socratic AI hints."
      ],
      prerequisitesRequired: [
        "Junior secondary algebraic fundamentals (linear equations, factorisation).",
        "Euclidean geometry basics and proportional reasoning."
      ]
    },
    parts: [
      {
        id: "part-1",
        partNumber: 1,
        title: "Part I: Pure Algebra, Quadratic Theory & Functions",
        description: "Foundational algebraic structures, quadratics, polynomials, and analytical coordinate methods.",
        chapterIds: ["ch-1", "ch-2", "ch-3", "ch-4"]
      },
      {
        id: "part-2",
        partNumber: 2,
        title: "Part II: Geometry, Trigonometric Analysis & Vectors",
        description: "Circle theorems, trigonometric ratios, sine/cosine laws, and 2D/3D vectors.",
        chapterIds: ["ch-5", "ch-6", "ch-7"]
      },
      {
        id: "part-3",
        partNumber: 3,
        title: "Part III: Introductory Calculus & Mathematical Modeling",
        description: "Limits, first-principles differentiation, tangent curves, and definite integration.",
        chapterIds: ["ch-8", "ch-9"]
      }
    ],
    chapters: [
      // CHAPTER 1
      {
        id: "ch-1",
        partId: "part-1",
        chapterNumber: 1,
        title: "Number Bases, Modular Arithmetic & Set Theory",
        subtitle: "Positional Radix Notation, Modular Congruence & Venn Scaffolding",
        overviewSummary: "Foundations of positional representation across base systems, cyclical arithmetic operations, and Venn diagram set logic.",
        curriculumTopicsCovered: [
          "Base conversions between base 10, 2, 8, 16 and arbitrary base n",
          "Modular addition, multiplication, and clock arithmetic",
          "Set algebra, union, intersection, and 3-set Venn problem formulation"
        ],
        chapterSummaryFormulas: [
          "N = d_k · b^k + ... + d_1 · b^1 + d_0 · b^0",
          "a ≡ b (mod m) ⟺ m divides (a - b)",
          "n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(B ∩ C) - n(A ∩ C) + n(A ∩ B ∩ C)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-1-1",
            chapterId: "ch-1",
            sectionNumber: "1.1",
            title: "Positional Radix Systems & Non-Decimal Arithmetic",
            pageReference: "pp. 12-24",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-NUM-01",
            stableQRIdentifier: "CEMM-CH01-SEC01-BAS",
            associatedPlayActivityId: "act-base-conv",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-1-1-1",
                code: "LO-1.1.1",
                statement: "Express numbers in expanded polynomial form for any positive integer radix b.",
                bloomLevel: "understand"
              },
              {
                id: "lo-1-1-2",
                code: "LO-1.1.2",
                statement: "Convert fractional and integer values between binary, octal, and denary.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-1-1-1",
                title: "The Radix Expansion Theorem",
                formalDefinition: "Any positive integer N in base b can be uniquely expressed as ∑_{i=0}^k d_i · b^i where 0 ≤ d_i < b.",
                intuitiveExplanation: "Each digit position represents a distinct power of the counting base.",
                keyFormulas: ["N = ∑ d_i · b^i"],
                commonMisconceptions: ["Using digits equal to or greater than the base (e.g. '2' in binary or '5' in base 5)."],
                realWorldApplications: ["Digital computer architecture (binary logic) and cryptographic checksums (hexadecimal)."]
              }
            ],
            workedExamples: [
              {
                id: "we-1-1-1",
                exampleNumber: "Example 1.1",
                title: "Convert 110101₂ to Denary (Base 10)",
                problemStatement: "Convert the binary numeral 110101₂ to standard decimal notation.",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Write the polynomial expansion of powers of 2",
                    mathExpression: "1·2⁵ + 1·2⁴ + 0·2³ + 1·2² + 0·2¹ + 1·2⁰",
                    detailedReasoning: "Identify powers from 5 down to 0 corresponding to the 6 digits."
                  },
                  {
                    stepNumber: 2,
                    heading: "Evaluate each power",
                    mathExpression: "= 32 + 16 + 0 + 4 + 0 + 1",
                    detailedReasoning: "Sum the positive terms."
                  },
                  {
                    stepNumber: 3,
                    heading: "Sum the terms",
                    mathExpression: "= 53₁₀",
                    detailedReasoning: "32 + 16 = 48; 48 + 4 = 52; 52 + 1 = 53."
                  }
                ],
                finalAnswer: "53₁₀",
                keyTakeaway: "Always check powers from right to left starting at exponent 0."
              }
            ],
            practiceSet: [
              {
                id: "pr-1-1-1",
                itemNumber: "Q 1.1.1",
                tier: "drill",
                prompt: "Convert 234₅ to base 10.",
                hints: ["Evaluate 2·5² + 3·5¹ + 4·5⁰."],
                fullSolution: "2·25 + 3·5 + 4·1 = 50 + 15 + 4 = 69₁₀.",
                targetAnswer: "69"
              }
            ],
            teacherNotes: ["Emphasize that the highest digit in base b is always b - 1."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 2
      {
        id: "ch-2",
        partId: "part-1",
        chapterNumber: 2,
        title: "Indices, Logarithms & Linear Inequalities",
        subtitle: "Exponential Laws, Logarithmic Mantissas & Real Interval Sets",
        overviewSummary: "Mastery of fractional indices, logarithmic equations, base-10 characteristics and mantissas, and bounding linear inequality sets.",
        curriculumTopicsCovered: [
          "Laws of indices with negative and rational exponents",
          "Logarithmic transformation rules and change of base theorem",
          "Linear inequalities in one variable and graphical representation"
        ],
        chapterSummaryFormulas: [
          "a^m · a^n = a^(m+n); a^(m/n) = ⁿ√(a^m)",
          "log_b(xy) = log_b(x) + log_b(y); log_b(a) = log_k(a) / log_k(b)",
          "Reversing inequality sign upon multiplication or division by negative scalar"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-2-1",
            chapterId: "ch-2",
            sectionNumber: "2.1",
            title: "Rational Indices & Logarithmic Foundations",
            pageReference: "pp. 38-52",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-ALG-02",
            stableQRIdentifier: "CEMM-CH02-SEC01-IND",
            associatedPlayActivityId: "act-indices-log",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-2-1-1",
                code: "LO-2.1.1",
                statement: "Apply the index laws to simplify expressions with negative and rational exponents.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-2-1-1",
                title: "Logarithmic Equivalence",
                formalDefinition: "y = b^x ⟺ x = log_b(y) for b > 0 and b ≠ 1.",
                intuitiveExplanation: "A logarithm is simply the exponent to which the base must be raised to produce the number.",
                keyFormulas: ["log_b(b^x) = x"],
                commonMisconceptions: ["Distributing logs over addition: log(x + y) ≠ log(x) + log(y)."],
                realWorldApplications: ["Richter earthquake scale and sound decibel measurements."]
              }
            ],
            workedExamples: [
              {
                id: "we-2-1-1",
                exampleNumber: "Example 2.1",
                title: "Solve for x: 3^(2x - 1) = 27",
                problemStatement: "Find the real value of x satisfying 3^(2x - 1) = 27.",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Express both sides with equal bases",
                    mathExpression: "3^(2x - 1) = 3³",
                    detailedReasoning: "Recognize that 27 = 3 · 3 · 3 = 3³."
                  },
                  {
                    stepNumber: 2,
                    heading: "Equate exponents",
                    mathExpression: "2x - 1 = 3 ⟹ 2x = 4",
                    detailedReasoning: "Since the bases are identical and non-zero, the exponents must be equal."
                  },
                  {
                    stepNumber: 3,
                    heading: "Solve for x",
                    mathExpression: "x = 2",
                    detailedReasoning: "Divide both sides by 2."
                  }
                ],
                finalAnswer: "x = 2",
                keyTakeaway: "Converting both sides to matching prime bases simplifies exponential equations."
              }
            ],
            practiceSet: [
              {
                id: "pr-2-1-1",
                itemNumber: "Q 2.1.1",
                tier: "drill",
                prompt: "Evaluate log₂ 64.",
                hints: ["Express 64 as a power of 2."],
                fullSolution: "64 = 2⁶, so log₂ 2⁶ = 6.",
                targetAnswer: "6"
              }
            ],
            teacherNotes: ["Remind students that logs of negative numbers are undefined in real numbers."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 3 (CANONICAL QUADRATICS)
      {
        id: "ch-3",
        partId: "part-1",
        chapterNumber: 3,
        title: "Quadratic Equations, Factorisation & Discriminant Analysis",
        subtitle: "Algebraic, Graphic, and First-Principles Analytical Methods",
        overviewSummary: "Explores the fundamental properties of degree-2 polynomials, parabolic symmetry, roots nature, and discriminant analysis.",
        curriculumTopicsCovered: [
          "Standard quadratic form ax² + bx + c = 0",
          "Completing the square derivation",
          "Discriminant Δ = b² - 4ac interpretation",
          "Word problems and kinematic modeling"
        ],
        chapterSummaryFormulas: [
          "x = (-b ± √(b² - 4ac)) / 2a",
          "Δ = b² - 4ac (Δ > 0: two real roots; Δ = 0: repeated root; Δ < 0: complex roots)",
          "Vertex coordinates: (-b / 2a, c - b² / 4a)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-3-1",
            chapterId: "ch-3",
            sectionNumber: "3.1",
            title: "Standard Form & Factorisation Techniques",
            pageReference: "pp. 74-83",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-ALG-03",
            stableQRIdentifier: "CEMM-CH03-SEC01-FAC",
            associatedPlayActivityId: "act-quad-eq",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "obj-3-1-1",
                code: "LO-3.1.1",
                statement: "Identify the coefficients a, b, and c in any standard quadratic equation ax² + bx + c = 0.",
                bloomLevel: "remember"
              },
              {
                id: "obj-3-1-2",
                code: "LO-3.1.2",
                statement: "Factorise quadratic trinomials by finding two numbers whose product is ac and sum is b.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-3-1-1",
                title: "The Zero Product Property",
                formalDefinition: "If ab = 0 for real numbers a and b, then either a = 0, b = 0, or both a = b = 0.",
                intuitiveExplanation: "If two numbers multiply to zero, at least one of them must be zero.",
                keyFormulas: ["(x - p)(x - q) = 0 ⟹ x = p or x = q"],
                commonMisconceptions: [
                  "Assuming if (x - 2)(x + 3) = 6 then x - 2 = 6 or x + 3 = 6 (Zero Product Property ONLY works when the right-hand side equals 0)."
                ],
                realWorldApplications: ["Projectile trajectory impact points where height h(t) = 0."]
              }
            ],
            workedExamples: [
              {
                id: "we-3-1-1",
                exampleNumber: "Example 3.1",
                title: "Solve 2x² - 5x - 3 = 0 by Factorisation",
                problemStatement: "Find the roots of the quadratic equation 2x² - 5x - 3 = 0 using the ac factorisation method.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Compute the key product ac",
                    mathExpression: "ac = 2 · (-3) = -6; b = -5",
                    detailedReasoning: "We seek two integers m and n whose product is -6 and sum is -5."
                  },
                  {
                    stepNumber: 2,
                    heading: "Identify factors m and n",
                    mathExpression: "m = -6, n = +1 ⟹ (-6)(1) = -6 and -6 + 1 = -5",
                    detailedReasoning: "The factors satisfy both conditions simultaneously."
                  },
                  {
                    stepNumber: 3,
                    heading: "Split the middle term and factor by grouping",
                    mathExpression: "2x² - 6x + x - 3 = 0 ⟹ 2x(x - 3) + 1(x - 3) = 0 ⟹ (2x + 1)(x - 3) = 0",
                    detailedReasoning: "Group the first two and last two terms and factor out common monomials."
                  },
                  {
                    stepNumber: 4,
                    heading: "Apply Zero Product Property",
                    mathExpression: "2x + 1 = 0 ⟹ x = -1/2; or x - 3 = 0 ⟹ x = 3",
                    detailedReasoning: "Set each linear factor to zero and solve for x."
                  }
                ],
                finalAnswer: "x = -1/2, x = 3",
                keyTakeaway: "Factoring decomposes a second-degree polynomial into linear factors whose zeros are easily determined."
              }
            ],
            practiceSet: [
              {
                id: "pr-3-1-1",
                itemNumber: "Q 3.1.1",
                tier: "drill",
                prompt: "Solve x² - 7x + 12 = 0 by factorisation.",
                hints: ["Find two numbers that multiply to +12 and add to -7."],
                fullSolution: "Factors are -3 and -4. (x - 3)(x - 4) = 0 ⟹ x = 3 or x = 4.",
                targetAnswer: "x = 3, 4"
              }
            ],
            teacherNotes: ["Emphasize checking solutions by substituting back into original equation."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 4
      {
        id: "ch-4",
        partId: "part-1",
        chapterNumber: 4,
        title: "Polynomials, Remainder Theorem & Rational Functions",
        subtitle: "Synthetic Division, Factor Theorem & Partial Fraction Decompositions",
        overviewSummary: "Higher-degree polynomials, polynomial algebra, remainder and factor theorems, and resolving rational algebraic fractions.",
        curriculumTopicsCovered: [
          "Polynomial division and remainder theorem P(c) = R",
          "Factor theorem for finding polynomial roots",
          "Linear and quadratic partial fractions decomposition"
        ],
        chapterSummaryFormulas: [
          "P(x) = D(x) · Q(x) + R(x)",
          "If P(c) = 0, then (x - c) is a factor of P(x)",
          "1 / ((x - a)(x - b)) = A/(x - a) + B/(x - b)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-4-1",
            chapterId: "ch-4",
            sectionNumber: "4.1",
            title: "The Remainder and Factor Theorems",
            pageReference: "pp. 110-125",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-ALG-04",
            stableQRIdentifier: "CEMM-CH04-SEC01-FAC",
            associatedPlayActivityId: "act-poly-div",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-4-1-1",
                code: "LO-4.1.1",
                statement: "Evaluate polynomial remainders without carrying out long algebraic division.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-4-1-1",
                title: "Remainder Theorem",
                formalDefinition: "When a polynomial P(x) is divided by (x - c), the remainder is equal to P(c).",
                intuitiveExplanation: "Evaluating the function at c reveals the exact remainder instantly.",
                keyFormulas: ["P(c) = Remainder"],
                commonMisconceptions: ["Substituting -c instead of c when dividing by (x - c)."],
                realWorldApplications: ["Signal filter transfer functions and error correction codes."]
              }
            ],
            workedExamples: [
              {
                id: "we-4-1-1",
                exampleNumber: "Example 4.1",
                title: "Find the Remainder of P(x) = 2x³ - 3x² + 4x - 5 divided by (x - 2)",
                problemStatement: "Determine the remainder when 2x³ - 3x² + 4x - 5 is divided by (x - 2).",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Identify root c",
                    mathExpression: "x - 2 = 0 ⟹ c = 2",
                    detailedReasoning: "Set divisor equal to zero."
                  },
                  {
                    stepNumber: 2,
                    heading: "Evaluate P(2)",
                    mathExpression: "P(2) = 2(2)³ - 3(2)² + 4(2) - 5 = 2(8) - 3(4) + 8 - 5 = 16 - 12 + 8 - 5 = 7",
                    detailedReasoning: "Substitute c = 2 into the polynomial."
                  }
                ],
                finalAnswer: "Remainder = 7",
                keyTakeaway: "Evaluating P(c) eliminates the need for tedious long division."
              }
            ],
            practiceSet: [
              {
                id: "pr-4-1-1",
                itemNumber: "Q 4.1.1",
                tier: "drill",
                prompt: "Show that (x - 1) is a factor of x³ - 3x² + 3x - 1.",
                hints: ["Evaluate P(1)."],
                fullSolution: "P(1) = 1³ - 3(1) + 3(1) - 1 = 1 - 3 + 3 - 1 = 0. Since P(1) = 0, (x - 1) is a factor.",
                targetAnswer: "P(1) = 0 (Confirmed factor)"
              }
            ],
            teacherNotes: ["Remind learners that factor theorem is the cornerstone of cubic equation solving."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 5
      {
        id: "ch-5",
        partId: "part-2",
        chapterNumber: 5,
        title: "Euclidean Geometry, Circle Theorems & Cyclic Quadrilaterals",
        subtitle: "Subtended Arcs, Chord Properties & Tangent-Secant Theorems",
        overviewSummary: "Deductive geometric proofs of circle theorems, angle subtended at center vs circumference, cyclic quadrilateral invariants, and tangents.",
        curriculumTopicsCovered: [
          "Angle at center is twice angle at circumference",
          "Angles in the same segment of a circle are equal",
          "Opposite angles of a cyclic quadrilateral sum to 180°",
          "Alternate segment theorem and tangents from external points"
        ],
        chapterSummaryFormulas: [
          "θ_center = 2 · θ_circumference",
          "∠A + ∠C = 180° for cyclic ABCD",
          "Tangents from external point: |PA| = |PB|"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-5-1",
            chapterId: "ch-5",
            sectionNumber: "5.1",
            title: "Subtended Angles & Cyclic Quadrilaterals",
            pageReference: "pp. 145-162",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-GEO-01",
            stableQRIdentifier: "CEMM-CH05-SEC01-CIR",
            associatedPlayActivityId: "act-circle-geom",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-5-1-1",
                code: "LO-5.1.1",
                statement: "State and prove that the angle subtended by an arc at the center is double that at the circumference.",
                bloomLevel: "understand"
              }
            ],
            coreConcepts: [
              {
                id: "c-5-1-1",
                title: "Central Angle Invariant",
                formalDefinition: "An arc of a circle subtends twice the angle at the center of the circle that it subtends at any point on the remaining circumference.",
                intuitiveExplanation: "Moving the vertex back from center to circumference doubles the distance and halves the opening angle.",
                keyFormulas: ["∠AOB = 2 · ∠APB"],
                commonMisconceptions: ["Applying the theorem when the vertex is not strictly on the circle circumference."],
                realWorldApplications: ["Navigation position fixes using sextant subtended angles."]
              }
            ],
            workedExamples: [
              {
                id: "we-5-1-1",
                exampleNumber: "Example 5.1",
                title: "Angle at Center Calculation",
                problemStatement: "Arc AB subtends an angle of 44° at the circumference point P. Find the angle subtended by AB at center O.",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Apply Central Angle Theorem",
                    mathExpression: "∠AOB = 2 · ∠APB = 2 · 44° = 88°",
                    detailedReasoning: "The angle at center is double the angle at circumference subtended by identical arc AB."
                  }
                ],
                finalAnswer: "∠AOB = 88°",
                keyTakeaway: "Verify both angles stand on the exact same arc."
              }
            ],
            practiceSet: [
              {
                id: "pr-5-1-1",
                itemNumber: "Q 5.1.1",
                tier: "drill",
                prompt: "In cyclic quadrilateral ABCD, angle A = 78°. Find angle C.",
                hints: ["Opposite angles in a cyclic quadrilateral sum to 180°."],
                fullSolution: "∠A + ∠C = 180° ⟹ ∠C = 180° - 78° = 102°.",
                targetAnswer: "102°"
              }
            ],
            teacherNotes: ["Draw clear diagrams highlighting the subtending arc in color."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 6
      {
        id: "ch-6",
        partId: "part-2",
        chapterNumber: 6,
        title: "Trigonometric Ratios, Sine/Cosine Rules & Bearings",
        subtitle: "Unit Circle Coordinates, Non-Right Triangles & Compass Bearings",
        overviewSummary: "Trigonometry beyond right triangles, the Sine Rule and Cosine Rule for oblique triangles, Heron's formula, and three-figure directional bearings.",
        curriculumTopicsCovered: [
          "Unit circle definitions of sin, cos, and tan across all 4 quadrants (CAST rule)",
          "Sine Rule: a / sin A = b / sin B = c / sin C",
          "Cosine Rule: a² = b² + c² - 2bc cos A",
          "Three-figure bearings and navigation triangulation"
        ],
        chapterSummaryFormulas: [
          "a / sin A = b / sin B = c / sin C = 2R",
          "cos A = (b² + c² - a²) / (2bc)",
          "Area = (1/2)ab sin C"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-6-1",
            chapterId: "ch-6",
            sectionNumber: "6.1",
            title: "Oblique Triangles: The Sine and Cosine Rules",
            pageReference: "pp. 180-198",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-TRIG-01",
            stableQRIdentifier: "CEMM-CH06-SEC01-TRI",
            associatedPlayActivityId: "act-trig-rules",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-6-1-1",
                code: "LO-6.1.1",
                statement: "Select and apply the Sine or Cosine Rule to solve any oblique triangle given sufficient side and angle constraints.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-6-1-1",
                title: "The Law of Cosines as Generalized Pythagoras",
                formalDefinition: "In any triangle ABC, c² = a² + b² - 2ab cos C.",
                intuitiveExplanation: "When C = 90°, cos 90° = 0, recovering Pythagoras theorem. For obtuse angles, the correction term adds length; for acute angles, it subtracts.",
                keyFormulas: ["c² = a² + b² - 2ab cos C"],
                commonMisconceptions: ["Using the sine rule when only two sides and the included angle (SAS) are known."],
                realWorldApplications: ["Aviation waypoint navigation and radar vector calculation."]
              }
            ],
            workedExamples: [
              {
                id: "we-6-1-1",
                exampleNumber: "Example 6.1",
                title: "Calculate Missing Side Using Cosine Rule",
                problemStatement: "In triangle ABC, side b = 7 cm, c = 5 cm, and included angle A = 60°. Calculate side a.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "State Cosine Rule formula",
                    mathExpression: "a² = b² + c² - 2bc cos A",
                    detailedReasoning: "We have SAS (Side-Angle-Side), so the Cosine Rule is required."
                  },
                  {
                    stepNumber: 2,
                    heading: "Substitute known parameters",
                    mathExpression: "a² = 7² + 5² - 2(7)(5) cos 60° = 49 + 25 - 70(0.5) = 74 - 35 = 39",
                    detailedReasoning: "cos 60° = 1/2. 49 + 25 = 74; 74 - 35 = 39."
                  },
                  {
                    stepNumber: 3,
                    heading: "Extract square root",
                    mathExpression: "a = √39 ≈ 6.24 cm",
                    detailedReasoning: "Take positive square root since length must be positive."
                  }
                ],
                finalAnswer: "a ≈ 6.24 cm",
                keyTakeaway: "Always check whether the triangle is SAS or SSS before attempting Cosine Rule."
              }
            ],
            practiceSet: [
              {
                id: "pr-6-1-1",
                itemNumber: "Q 6.1.1",
                tier: "drill",
                prompt: "In triangle PQR, p = 8 cm, q = 6 cm, and r = 10 cm. Determine angle R.",
                hints: ["Notice that 6² + 8² = 36 + 64 = 100 = 10²."],
                fullSolution: "By the converse of Pythagoras, angle R = 90°.",
                targetAnswer: "90°"
              }
            ],
            teacherNotes: ["Highlight compass bearings as measured strictly clockwise from North with three digits."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 7
      {
        id: "ch-7",
        partId: "part-2",
        chapterNumber: 7,
        title: "Coordinate Geometry, Straight Lines & 2D Vectors",
        subtitle: "Loci, Perpendicular Gradients & Vector Component Decomposition",
        overviewSummary: "Cartesian plane geometry, distance formula, midpoint, parallel and perpendicular slope criteria, and 2D column vector mechanics.",
        curriculumTopicsCovered: [
          "Distance between two points and division of a line in a given ratio",
          "Equation of a straight line in point-slope and intercept forms",
          "Condition for perpendicular lines: m₁ · m₂ = -1",
          "2D column vectors, scalar multiplication, and scalar dot product"
        ],
        chapterSummaryFormulas: [
          "d = √((x₂ - x₁)² + (y₂ - y₁)²)",
          "m = (y₂ - y₁) / (x₂ - x₁); y - y₁ = m(x - x₁)",
          "m_perp = -1 / m; u · v = u_x v_x + u_y v_y"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-7-1",
            chapterId: "ch-7",
            sectionNumber: "7.1",
            title: "Linear Equations & Perpendicular Lines",
            pageReference: "pp. 215-230",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-GEO-02",
            stableQRIdentifier: "CEMM-CH07-SEC01-LIN",
            associatedPlayActivityId: "act-coord-geom",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-7-1-1",
                code: "LO-7.1.1",
                statement: "Find the equation of a line passing through a given point perpendicular to another line.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-7-1-1",
                title: "Perpendicular Slope Relationship",
                formalDefinition: "Two non-vertical lines with slopes m₁ and m₂ are perpendicular if and only if m₁ · m₂ = -1.",
                intuitiveExplanation: "Rotating a slope by 90 degrees flips rise/run and negates the direction.",
                keyFormulas: ["m₂ = -1 / m₁"],
                commonMisconceptions: ["Forgetting the negative sign (perpendicular slopes are negative reciprocals, not just reciprocals)."],
                realWorldApplications: ["Architectural CAD drawings and orthogonal road grid layouts."]
              }
            ],
            workedExamples: [
              {
                id: "we-7-1-1",
                exampleNumber: "Example 7.1",
                title: "Equation of Perpendicular Line",
                problemStatement: "Find the equation of the line passing through (2, -3) perpendicular to 2x - 4y + 5 = 0.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Find the gradient of the given line",
                    mathExpression: "4y = 2x + 5 ⟹ y = (1/2)x + 5/4 ⟹ m₁ = 1/2",
                    detailedReasoning: "Convert equation to slope-intercept form y = mx + c."
                  },
                  {
                    stepNumber: 2,
                    heading: "Determine perpendicular gradient",
                    mathExpression: "m₂ = -1 / (1/2) = -2",
                    detailedReasoning: "Negative reciprocal of 1/2 is -2."
                  },
                  {
                    stepNumber: 3,
                    heading: "Use point-slope form with (2, -3)",
                    mathExpression: "y - (-3) = -2(x - 2) ⟹ y + 3 = -2x + 4 ⟹ 2x + y - 1 = 0",
                    detailedReasoning: "Rearrange into standard linear equation form."
                  }
                ],
                finalAnswer: "2x + y - 1 = 0",
                keyTakeaway: "Always rearrange to y = mx + c before extracting gradient."
              }
            ],
            practiceSet: [
              {
                id: "pr-7-1-1",
                itemNumber: "Q 7.1.1",
                tier: "drill",
                prompt: "Calculate the distance between points A(1, 2) and B(4, 6).",
                hints: ["Apply distance formula √((4-1)² + (6-2)²)."],
                fullSolution: "d = √(3² + 4²) = √(9 + 16) = √25 = 5 units.",
                targetAnswer: "5 units"
              }
            ],
            teacherNotes: ["Remind students that horizontal and vertical lines are perpendicular special cases (m=0 and undefined)."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 8
      {
        id: "ch-8",
        partId: "part-3",
        chapterNumber: 8,
        title: "Limits, Continuity & First-Principles Differentiation",
        subtitle: "Infinitesimal Tangents, Rate of Change & Standard Derivative Rules",
        overviewSummary: "Introduction to differential calculus, intuitive and rigorous limits, deriving d/dx (xⁿ) from first principles, and tangent gradients.",
        curriculumTopicsCovered: [
          "Intuitive concept of limit as h approaches 0",
          "First principles differentiation: dy/dx = lim_{h→0} [f(x+h) - f(x)] / h",
          "Power rule, constant multiple rule, sum/difference rules",
          "Tangents and normals to polynomial curves"
        ],
        chapterSummaryFormulas: [
          "f'(x) = lim_{h→0} (f(x+h) - f(x)) / h",
          "d/dx (x^n) = n · x^(n-1)",
          "Gradient of normal: m_n = -1 / f'(x_0)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-8-1",
            chapterId: "ch-8",
            sectionNumber: "8.1",
            title: "First Principles & Power Rule Derivation",
            pageReference: "pp. 254-270",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-CALC-01",
            stableQRIdentifier: "CEMM-CH08-SEC01-DER",
            associatedPlayActivityId: "act-diff-calc",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-8-1-1",
                code: "LO-8.1.1",
                statement: "Differentiate simple algebraic functions f(x) = x² and f(x) = x³ from first principles.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-8-1-1",
                title: "Derivative as Instantaneous Rate of Change",
                formalDefinition: "The derivative of f at x is f'(x) = lim_{h→0} [f(x+h) - f(x)] / h provided the limit exists.",
                intuitiveExplanation: "The secant line connecting (x, f(x)) and (x+h, f(x+h)) approaches the exact tangent line as the gap h shrinks to zero.",
                keyFormulas: ["dy/dx = lim_{h→0} Δy / Δx"],
                commonMisconceptions: ["Setting h = 0 before simplifying the expression, causing division by zero."],
                realWorldApplications: ["Instantaneous velocity in physics (v = ds/dt) and marginal cost in economics."]
              }
            ],
            workedExamples: [
              {
                id: "we-8-1-1",
                exampleNumber: "Example 8.1",
                title: "Differentiate f(x) = x² from First Principles",
                problemStatement: "Using first principles, prove that d/dx (x²) = 2x.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Write the difference quotient",
                    mathExpression: "[f(x+h) - f(x)] / h = [(x+h)² - x²] / h",
                    detailedReasoning: "Substitute (x+h) and x into f(x) = x²."
                  },
                  {
                    stepNumber: 2,
                    heading: "Expand binomial term",
                    mathExpression: "= [x² + 2xh + h² - x²] / h = [2xh + h²] / h",
                    detailedReasoning: "Expand (x+h)² and cancel x²."
                  },
                  {
                    stepNumber: 3,
                    heading: "Divide through by h",
                    mathExpression: "= h(2x + h) / h = 2x + h (for h ≠ 0)",
                    detailedReasoning: "Factor out common factor h."
                  },
                  {
                    stepNumber: 4,
                    heading: "Take limit as h approaches 0",
                    mathExpression: "lim_{h→0} (2x + h) = 2x + 0 = 2x",
                    detailedReasoning: "Evaluate the limit as h approaches 0."
                  }
                ],
                finalAnswer: "f'(x) = 2x",
                keyTakeaway: "Canceling the factor of h in the denominator resolves the 0/0 indeterminate form."
              }
            ],
            practiceSet: [
              {
                id: "pr-8-1-1",
                itemNumber: "Q 8.1.1",
                tier: "drill",
                prompt: "Find dy/dx for y = 4x³ - 5x² + 7x - 2.",
                hints: ["Apply power rule d/dx (axⁿ) = a · n · xⁿ⁻¹."],
                fullSolution: "dy/dx = 4(3x²) - 5(2x) + 7(1) - 0 = 12x² - 10x + 7.",
                targetAnswer: "12x² - 10x + 7"
              }
            ],
            teacherNotes: ["Emphasize that the derivative of a constant term is always zero."]
          }
        ],
        chapterReviewQuestions: []
      },

      // CHAPTER 9
      {
        id: "ch-9",
        partId: "part-3",
        chapterNumber: 9,
        title: "Integration, Definite Integrals & Kinematic Modeling",
        subtitle: "Antiderivatives, Riemann Area Under Curves & Velocity-Position Equations",
        overviewSummary: "Integral calculus as the inverse operation of differentiation, indefinite integrals, constant of integration C, definite integrals for area, and physics kinematics.",
        curriculumTopicsCovered: [
          "Indefinite integration: ∫ x^n dx = x^(n+1)/(n+1) + C (n ≠ -1)",
          "Definite integrals and fundamental theorem of calculus",
          "Area bounded by curve y = f(x), x-axis, and vertical lines x=a, x=b",
          "Kinematic relationships: s(t) = ∫ v(t) dt and v(t) = ∫ a(t) dt"
        ],
        chapterSummaryFormulas: [
          "∫ x^n dx = (x^(n+1)) / (n+1) + C",
          "Area = ∫_a^b f(x) dx = F(b) - F(a)",
          "s = ∫ v dt; v = ∫ a dt"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-9-1",
            chapterId: "ch-9",
            sectionNumber: "9.1",
            title: "Indefinite & Definite Integration",
            pageReference: "pp. 290-308",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-CALC-02",
            stableQRIdentifier: "CEMM-CH09-SEC01-INT",
            associatedPlayActivityId: "act-integral-calc",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-9-1-1",
                code: "LO-9.1.1",
                statement: "Compute definite integrals to determine the exact area under polynomial curves.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-9-1-1",
                title: "The Fundamental Theorem of Calculus",
                formalDefinition: "If f is continuous on [a, b] and F is an antiderivative of f, then ∫_a^b f(x) dx = F(b) - F(a).",
                intuitiveExplanation: "Accumulating tiny rate slices f(x)dx sums to the total net change in the parent function F.",
                keyFormulas: ["∫_a^b f(x) dx = [F(x)]_a^b = F(b) - F(a)"],
                commonMisconceptions: ["Leaving out the constant of integration + C in indefinite integrals."],
                realWorldApplications: ["Computing total work done by a variable force and total distance from velocity."]
              }
            ],
            workedExamples: [
              {
                id: "we-9-1-1",
                exampleNumber: "Example 9.1",
                title: "Calculate Area Under Curve y = 3x²",
                problemStatement: "Evaluate the definite integral ∫₁³ 3x² dx to find the area under y = 3x² between x = 1 and x = 3.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Find antiderivative of 3x²",
                    mathExpression: "∫ 3x² dx = 3(x³/3) = x³",
                    detailedReasoning: "Apply power rule for integration."
                  },
                  {
                    stepNumber: 2,
                    heading: "Evaluate at limits x = 3 and x = 1",
                    mathExpression: "[x³]₁³ = 3³ - 1³ = 27 - 1 = 26",
                    detailedReasoning: "Subtract F(1) from F(3)."
                  }
                ],
                finalAnswer: "26 square units",
                keyTakeaway: "Definite integrals do not require the constant C because C - C = 0 cancels out."
              }
            ],
            practiceSet: [
              {
                id: "pr-9-1-1",
                itemNumber: "Q 9.1.1",
                tier: "drill",
                prompt: "Evaluate ∫ (6x² + 2x - 5) dx.",
                hints: ["Integrate each term individually."],
                fullSolution: "6(x³/3) + 2(x²/2) - 5x + C = 2x³ + x² - 5x + C.",
                targetAnswer: "2x³ + x² - 5x + C"
              }
            ],
            teacherNotes: ["Ensure students understand the sign convention when curves fall below the x-axis."]
          }
        ],
        chapterReviewQuestions: []
      }
    ],
    totalQRResourcesCount: 36,
    lifecycleStatus: "human_approved",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z",
    lastQualityScore: 98
  },

  // =========================================================================
  // 2. C.E.M.P ADVANCED PHYSICS (SENIOR SECONDARY — 10 COMPLETE CHAPTERS)
  // =========================================================================
  {
    id: "tb-cemp-phy",
    code: "CEMP-PHY-S1",
    title: "C.E.M.P Advanced Physics: Principles, Vectors & Mechanics",
    subtitle: "From Newtonian Classical Dynamics to Modern Wave Physics with Interactive Simulators",
    discipline: "physics",
    targetLevel: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    curriculumMappingStatus: "verified",
    edition: {
      editionNumber: 1,
      editionName: "Senior Secondary Physics Treatise",
      releaseYear: 2026,
      isbn: "978-978-782-105-2",
      printFormat: "hardcover",
      totalEstimatedPages: 620
    },
    authors: [
      {
        id: "auth-physics-1",
        name: "Dr. K. Nnamdi",
        title: "Director of Physical Sciences",
        affiliation: "MOOS Academy Center for STEM Education",
        bio: "Researcher in classical mechanics, vector dynamics, and physics simulation pedagogy.",
        isLeadAuthor: true
      },
      {
        id: "auth-physics-2",
        name: "Dr. Amina Yusuf",
        title: "Senior Lecturer in Applied Physics",
        affiliation: "Ahmadu Bello University",
        bio: "National curriculum reviewer for secondary physical sciences with focus on experimental inquiry.",
        isLeadAuthor: false
      }
    ],
    contributors: [
      {
        id: "contrib-phy-1",
        name: "Dr. T. Balogun",
        role: "technical_illustrator",
        institution: "Federal University of Technology, Akure"
      }
    ],
    bookBrief: {
      targetAudienceDescription: "Physics students preparing for Senior Secondary certification, UTME CBT, and university STEM entrance.",
      pedagogicalPhilosophy: "Phenomenological intuition followed by vector mathematics and empirical lab simulations.",
      differentiatingFeatures: [
        "Vector decomposition visual diagrams in every chapter.",
        "Direct QR links to interactive kinematics and circuit simulators."
      ],
      prerequisitesRequired: ["Trigonometric ratios (sin, cos, tan), basic algebraic kinematics."]
    },
    parts: [
      {
        id: "phy-part-1",
        partNumber: 1,
        title: "Part I: Classical Mechanics, Kinematics & Vectors",
        description: "Units, dimensional analysis, vector resolution, rectilinear motion, and Newton's laws.",
        chapterIds: ["phy-ch-1", "phy-ch-2", "phy-ch-3", "phy-ch-4"]
      },
      {
        id: "phy-part-2",
        partNumber: 2,
        title: "Part II: Energy, Planetary Dynamics & Periodic Motion",
        description: "Work, mechanical energy, power, universal gravitation, and simple harmonic oscillations.",
        chapterIds: ["phy-ch-5", "phy-ch-6", "phy-ch-7"]
      },
      {
        id: "phy-part-3",
        partNumber: 3,
        title: "Part III: Fluids, Wave Optics & Field Physics",
        description: "Fluid statics, sound resonance, physical optics, and electrostatics.",
        chapterIds: ["phy-ch-8", "phy-ch-9", "phy-ch-10"]
      }
    ],
    chapters: [
      // PHY CH 1
      {
        id: "phy-ch-1",
        partId: "phy-part-1",
        chapterNumber: 1,
        title: "Units, Dimensional Analysis & Physical Measurements",
        subtitle: "Fundamental SI Standards, Vernier Precision & Dimensional Consistency",
        overviewSummary: "Measurement rigor in physical inquiry, standard SI units, dimensional formulae [M][L][T], and checking physical equation consistency.",
        curriculumTopicsCovered: [
          "Base SI units vs derived quantities",
          "Micrometer screw gauge and vernier caliper readings",
          "Dimensional analysis for testing physical formula validity"
        ],
        chapterSummaryFormulas: [
          "[Velocity] = [L][T]⁻¹; [Acceleration] = [L][T]⁻²",
          "[Force] = [M][L][T]⁻²; [Work/Energy] = [M][L]²[T]⁻²",
          "Principle of Dimensional Homogeneity"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-1-1",
            chapterId: "phy-ch-1",
            sectionNumber: "1.1",
            title: "Dimensional Homogeneity & SI Derivations",
            pageReference: "pp. 8-22",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-MSR-01",
            stableQRIdentifier: "CEMP-CH01-SEC01-DIM",
            associatedPlayActivityId: "act-dim-analysis",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p1-1",
                code: "LO-PHY-1.1",
                statement: "Deduce dimensions of physical quantities and test physical equations for dimensional validity.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p1-1",
                title: "Dimensional Homogeneity",
                formalDefinition: "Every additive term in a valid physical equation must possess identical fundamental dimensions.",
                intuitiveExplanation: "You cannot add three kilograms to five meters per second.",
                keyFormulas: ["[LHS] = [RHS]"],
                commonMisconceptions: ["Confusing dimensionless constants (like 1/2 or π) with quantities having units."],
                realWorldApplications: ["Aerospace aerodynamic scaling and wind tunnel modeling."]
              }
            ],
            workedExamples: [
              {
                id: "we-p1-1",
                exampleNumber: "Example 1.1",
                title: "Check Dimensional Validity of s = ut + 1/2 at²",
                problemStatement: "Determine if the kinematic equation s = ut + 1/2 at² is dimensionally homogeneous.",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Dimension of Left Hand Side (s)",
                    mathExpression: "[s] = [L]",
                    detailedReasoning: "Displacement is measured in length units [L]."
                  },
                  {
                    stepNumber: 2,
                    heading: "Dimension of term ut",
                    mathExpression: "[ut] = ([L][T]⁻¹) · [T] = [L]",
                    detailedReasoning: "Velocity multiplied by time produces length."
                  },
                  {
                    stepNumber: 3,
                    heading: "Dimension of term 1/2 at²",
                    mathExpression: "[1/2 at²] = 1 · ([L][T]⁻²) · [T]² = [L]",
                    detailedReasoning: "1/2 is a dimensionless scalar. Acceleration times time squared yields length."
                  }
                ],
                finalAnswer: "All terms equal [L]. Equation is dimensionally homogeneous.",
                keyTakeaway: "Dimensional homogeneity is a necessary condition for physical correctness."
              }
            ],
            practiceSet: [
              {
                id: "pr-p1-1",
                itemNumber: "Q 1.1",
                tier: "drill",
                prompt: "Determine the dimensions of kinetic energy E_k = 1/2 m v².",
                hints: ["[m] = [M], [v] = [L][T]⁻¹."],
                fullSolution: "[E_k] = [M] · ([L][T]⁻¹)² = [M][L]²[T]⁻².",
                targetAnswer: "[M][L]²[T]⁻²"
              }
            ],
            teacherNotes: ["Emphasize zero error calibration when using micrometers."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 2
      {
        id: "phy-ch-2",
        partId: "phy-part-1",
        chapterNumber: 2,
        title: "Vectors, Coplanar Forces & Mechanical Equilibrium",
        subtitle: "Trigonometric Component Resolution & Moment Equilibrium Criteria",
        overviewSummary: "Resolving 2D force vectors into orthogonal components, resultant force computation, and the two conditions for static equilibrium.",
        curriculumTopicsCovered: [
          "Scalar vs vector quantities",
          "Resolving vectors into F_x = F cos θ and F_y = F sin θ",
          "Conditions of equilibrium: ∑ F = 0 and ∑ τ = 0 (Principle of Moments)"
        ],
        chapterSummaryFormulas: [
          "R_x = ∑ F_x; R_y = ∑ F_y; R = √(R_x² + R_y²)",
          "θ = arctan(R_y / R_x)",
          "∑ Clockwise Moments = ∑ Anticlockwise Moments"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-2-1",
            chapterId: "phy-ch-2",
            sectionNumber: "2.1",
            title: "Vector Resolution & Principle of Moments",
            pageReference: "pp. 35-50",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-MEC-01",
            stableQRIdentifier: "CEMP-CH02-SEC01-VEC",
            associatedPlayActivityId: "act-vector-force",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p2-1",
                code: "LO-PHY-2.1",
                statement: "Resolve arbitrary 2D forces and determine the resultant magnitude and direction.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p2-1",
                title: "Principle of Moments",
                formalDefinition: "For a body in rotational equilibrium, the sum of clockwise moments about any pivot equals the sum of anticlockwise moments.",
                intuitiveExplanation: "Rotational balance requires equal turning tendencies in both directions.",
                keyFormulas: ["Moment = Force · Perpendicular Distance"],
                commonMisconceptions: ["Using the direct distance along an angled force rather than the perpendicular distance to pivot."],
                realWorldApplications: ["Crane stability design and lever mechanical advantage."]
              }
            ],
            workedExamples: [
              {
                id: "we-p2-1",
                exampleNumber: "Example 2.1",
                title: "Resultant of Two Perpendicular Forces",
                problemStatement: "A block is pulled eastward by 60 N and northward by 80 N. Find the resultant force magnitude and direction.",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Compute resultant magnitude",
                    mathExpression: "R = √(60² + 80²) = √(3600 + 6400) = √10000 = 100 N",
                    detailedReasoning: "Apply Pythagoras theorem since forces are orthogonal."
                  },
                  {
                    stepNumber: 2,
                    heading: "Compute direction angle θ North of East",
                    mathExpression: "tan θ = 80 / 60 = 4/3 ⟹ θ = arctan(1.333) ≈ 53.1°",
                    detailedReasoning: "θ is measured counter-clockwise from East."
                  }
                ],
                finalAnswer: "100 N at bearing 036.9° (or 53.1° North of East)",
                keyTakeaway: "Perpendicular vector components combine directly via Pythagoras."
              }
            ],
            practiceSet: [
              {
                id: "pr-p2-1",
                itemNumber: "Q 2.1",
                tier: "drill",
                prompt: "A 50 N force acts at 30° to the horizontal. Calculate its horizontal component.",
                hints: ["F_x = F cos 30°."],
                fullSolution: "F_x = 50 · cos 30° = 50 · 0.866 = 43.3 N.",
                targetAnswer: "43.3 N"
              }
            ],
            teacherNotes: ["Draw free-body diagrams for every static equilibrium scenario."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 3
      {
        id: "phy-ch-3",
        partId: "phy-part-1",
        chapterNumber: 3,
        title: "Rectilinear Kinematics, Projectile Trajectories & Free Fall",
        subtitle: "Uniform Acceleration Equations & Parabolic 2D Flight Dynamics",
        overviewSummary: "Equations of uniformly accelerated rectilinear motion, gravitational free fall (g = 9.8 m/s²), and independent 2D projectile components.",
        curriculumTopicsCovered: [
          "Kinematic equations: v = u + at, s = ut + 1/2 at², v² = u² + 2as",
          "Motion under gravity and vertical projection",
          "Projectile motion: time of flight T, maximum height H, horizontal range R"
        ],
        chapterSummaryFormulas: [
          "T = (2u sin θ) / g",
          "H = (u² sin² θ) / (2g)",
          "R = (u² sin 2θ) / g (Maximum at θ = 45°)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-3-1",
            chapterId: "phy-ch-3",
            sectionNumber: "3.1",
            title: "2D Projectile Motion Analysis",
            pageReference: "pp. 64-82",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-KIN-01",
            stableQRIdentifier: "CEMP-CH03-SEC01-PROJ",
            associatedPlayActivityId: "act-projectile",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p3-1",
                code: "LO-PHY-3.1",
                statement: "Derive and calculate flight time, maximum height, and horizontal range for projectiles.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p3-1",
                title: "Independence of Horizontal and Vertical Motions",
                formalDefinition: "A projectile experiences zero horizontal acceleration (neglecting air resistance) while accelerating downward at g = 9.8 m/s².",
                intuitiveExplanation: "Horizontal motion is constant speed; vertical motion is free fall under gravity.",
                keyFormulas: ["x(t) = (u cos θ)t", "y(t) = (u sin θ)t - 1/2 gt²"],
                commonMisconceptions: ["Believing a forward-moving projectile has an internal 'force' pushing it forward mid-air."],
                realWorldApplications: ["Ballistics, athletics shot put, and water fountain trajectory design."]
              }
            ],
            workedExamples: [
              {
                id: "we-p3-1",
                exampleNumber: "Example 3.1",
                title: "Calculate Projectile Range",
                problemStatement: "A football is kicked at 20 m/s at an angle of 30° to the horizontal. Calculate the horizontal range (g = 9.8 m/s²).",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "State the Range formula",
                    mathExpression: "R = (u² sin 2θ) / g",
                    detailedReasoning: "Standard projectile range formula on level ground."
                  },
                  {
                    stepNumber: 2,
                    heading: "Substitute parameters",
                    mathExpression: "R = (20² · sin 60°) / 9.8 = (400 · 0.866) / 9.8 = 346.4 / 9.8 ≈ 35.35 m",
                    detailedReasoning: "sin(2 · 30°) = sin 60° ≈ 0.866."
                  }
                ],
                finalAnswer: "R ≈ 35.35 m",
                keyTakeaway: "Maximum range always occurs at launch angle 45° where sin 2θ = 1."
              }
            ],
            practiceSet: [
              {
                id: "pr-p3-1",
                itemNumber: "Q 3.1",
                tier: "drill",
                prompt: "Calculate the time of flight for a projectile launched at 19.6 m/s vertically upward (g = 9.8 m/s²).",
                hints: ["T = 2u / g."],
                fullSolution: "T = (2 · 19.6) / 9.8 = 4.0 seconds.",
                targetAnswer: "4.0 s"
              }
            ],
            teacherNotes: ["Emphasize that horizontal velocity u cos θ remains constant throughout flight."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 4
      {
        id: "phy-ch-4",
        partId: "phy-part-1",
        chapterNumber: 4,
        title: "Newton's Laws of Motion, Momentum & Friction",
        subtitle: "Inertia, Force Derivation, Impulse-Momentum Theorem & Solid Friction",
        overviewSummary: "Newton's three laws of motion, derivation of F = ma, linear momentum conservation in collisions, and static vs dynamic friction coefficients.",
        curriculumTopicsCovered: [
          "Newton's First Law (Law of Inertia) and reference frames",
          "Newton's Second Law: F = dp/dt = m(dv/dt) = ma",
          "Newton's Third Law (Action-Reaction pairs)",
          "Elastic vs inelastic collisions and momentum conservation",
          "Coefficient of friction μ: F_f ≤ μ R"
        ],
        chapterSummaryFormulas: [
          "F_net = m · a",
          "Impulse J = F · Δt = Δp = m(v - u)",
          "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ (Conservation of Momentum)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-4-1",
            chapterId: "phy-ch-4",
            sectionNumber: "4.1",
            title: "Linear Momentum Conservation & Collisions",
            pageReference: "pp. 95-115",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-DYN-01",
            stableQRIdentifier: "CEMP-CH04-SEC01-MOM",
            associatedPlayActivityId: "act-momentum-collision",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p4-1",
                code: "LO-PHY-4.1",
                statement: "Apply the principle of conservation of linear momentum to solve 1D collision problems.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p4-1",
                title: "Conservation of Linear Momentum",
                formalDefinition: "In any closed system with zero external net force, total linear momentum remains strictly constant.",
                intuitiveExplanation: "Internal collision forces occur in equal and opposite pairs that cancel each other out.",
                keyFormulas: ["∑ p_initial = ∑ p_final"],
                commonMisconceptions: ["Assuming kinetic energy is always conserved (KE is only conserved in perfectly elastic collisions)."],
                realWorldApplications: ["Vehicle crash crumple zones and rocket propulsion recoil."]
              }
            ],
            workedExamples: [
              {
                id: "we-p4-1",
                exampleNumber: "Example 4.1",
                title: "Inelastic Collision of Two Gliders",
                problemStatement: "A 2 kg trolley moving at 4 m/s collides and couples with a stationary 3 kg trolley. Find their combined final velocity.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Calculate initial momentum",
                    mathExpression: "p_init = m₁u₁ + m₂u₂ = (2)(4) + (3)(0) = 8 kg·m/s",
                    detailedReasoning: "Trolley 2 starts at rest (u₂ = 0)."
                  },
                  {
                    stepNumber: 2,
                    heading: "Equate to final combined momentum",
                    mathExpression: "p_final = (m₁ + m₂)v = (2 + 3)v = 5v",
                    detailedReasoning: "They lock together, moving as a single 5 kg mass."
                  },
                  {
                    stepNumber: 3,
                    heading: "Solve for common velocity v",
                    mathExpression: "5v = 8 ⟹ v = 8/5 = 1.6 m/s",
                    detailedReasoning: "Conservation of momentum: 5v = 8."
                  }
                ],
                finalAnswer: "v = 1.6 m/s",
                keyTakeaway: "Total momentum is conserved regardless of kinetic energy lost to deformation."
              }
            ],
            practiceSet: [
              {
                id: "pr-p4-1",
                itemNumber: "Q 4.1",
                tier: "drill",
                prompt: "Calculate the momentum of a 1500 kg car traveling at 20 m/s.",
                hints: ["p = m · v."],
                fullSolution: "p = 1500 · 20 = 30,000 kg·m/s.",
                targetAnswer: "30,000 kg·m/s"
              }
            ],
            teacherNotes: ["Clarify the difference between action-reaction pairs and balanced forces acting on a single body."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 5
      {
        id: "phy-ch-5",
        partId: "phy-part-2",
        chapterNumber: 5,
        title: "Work, Mechanical Energy, Power & Machines",
        subtitle: "Work-Energy Theorem, Conservative Fields & Mechanical Advantage",
        overviewSummary: "Scalar product definition of work, gravitational and elastic potential energy, kinetic energy, conservation of mechanical energy, and simple machine efficiency.",
        curriculumTopicsCovered: [
          "Work done by constant and variable forces W = F · s cos θ",
          "Work-Energy Theorem: W_net = ΔE_k",
          "Conservative vs non-conservative forces",
          "Simple machines: Mechanical Advantage (MA), Velocity Ratio (VR), and Efficiency η"
        ],
        chapterSummaryFormulas: [
          "W = F · d · cos θ; P = W / t = F · v",
          "E_k = 1/2 m v²; E_p = m g h",
          "Efficiency η = (MA / VR) · 100%"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-5-1",
            chapterId: "phy-ch-5",
            sectionNumber: "5.1",
            title: "Conservation of Mechanical Energy & Machines",
            pageReference: "pp. 128-146",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-ENG-01",
            stableQRIdentifier: "CEMP-CH05-SEC01-ENG",
            associatedPlayActivityId: "act-work-energy",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p5-1",
                code: "LO-PHY-5.1",
                statement: "Apply the conservation of energy principle and calculate the mechanical efficiency of inclined planes and pulley systems.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p5-1",
                title: "Work-Energy Theorem",
                formalDefinition: "The net work done on an object by all forces acting upon it equals the change in its kinetic energy: W_net = ΔK = 1/2 m(v² - u²).",
                intuitiveExplanation: "Applying a net force over a distance speeds up or slows down an object, directly changing its kinetic energy.",
                keyFormulas: ["W_net = ΔE_k"],
                commonMisconceptions: ["Assuming mechanical advantage can exceed velocity ratio in real machines (efficiency would exceed 100%)."],
                realWorldApplications: ["Rollercoaster design and hydroelectric power generation."]
              }
            ],
            workedExamples: [
              {
                id: "we-p5-1",
                exampleNumber: "Example 5.1",
                title: "Efficiency of a Pulley System",
                problemStatement: "A pulley system of velocity ratio (VR) 5 is used to lift a load of 800 N with an effort of 200 N. Calculate the mechanical advantage and efficiency.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Calculate Mechanical Advantage (MA)",
                    mathExpression: "MA = Load / Effort = 800 / 200 = 4.0",
                    detailedReasoning: "MA is the ratio of useful output force to input effort."
                  },
                  {
                    stepNumber: 2,
                    heading: "Calculate Efficiency η",
                    mathExpression: "η = (MA / VR) · 100% = (4 / 5) · 100% = 80%",
                    detailedReasoning: "Efficiency is MA divided by VR expressed as percentage."
                  }
                ],
                finalAnswer: "MA = 4.0, Efficiency = 80%",
                keyTakeaway: "In the presence of friction, MA is strictly less than VR."
              }
            ],
            practiceSet: [
              {
                id: "pr-p5-1",
                itemNumber: "Q 5.1",
                tier: "drill",
                prompt: "Calculate the work done in lifting a 50 kg mass through a vertical height of 4 m (g = 9.8 m/s²).",
                hints: ["W = mgh."],
                fullSolution: "W = 50 · 9.8 · 4 = 1960 Joules.",
                targetAnswer: "1960 J"
              }
            ],
            teacherNotes: ["Emphasize that power is the rate of doing work in watts (J/s)."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 6
      {
        id: "phy-ch-6",
        partId: "phy-part-2",
        chapterNumber: 6,
        title: "Universal Gravitation, Keplerian Orbits & Escape Velocity",
        subtitle: "Inverse-Square Gravity, Gravitational Potential & Orbital Mechanics",
        overviewSummary: "Newton's Law of Universal Gravitation, gravitational field strength g, gravitational potential energy, satellite orbital speed, and escape velocity from Earth.",
        curriculumTopicsCovered: [
          "Newton's Universal Law of Gravitation F = G m₁ m₂ / r²",
          "Variation of g with altitude and depth",
          "Gravitational potential V = -GM/r",
          "Satellite orbital speed v_orbit = √(GM/r) and Escape velocity v_esc = √(2GM/R)"
        ],
        chapterSummaryFormulas: [
          "F = G · (M · m) / r² (G = 6.674 × 10⁻¹¹ N·m²/kg²)",
          "g = G · M / r²",
          "v_esc = √(2 g R) ≈ 11.2 km/s for Earth"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-6-1",
            chapterId: "phy-ch-6",
            sectionNumber: "6.1",
            title: "Gravitational Fields & Satellite Motion",
            pageReference: "pp. 160-178",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-GRV-01",
            stableQRIdentifier: "CEMP-CH06-SEC01-GRV",
            associatedPlayActivityId: "act-grav-orbit",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p6-1",
                code: "LO-PHY-6.1",
                statement: "Derive the orbital velocity and escape velocity from a spherical celestial body.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p6-1",
                title: "Derivation of Escape Velocity",
                formalDefinition: "The minimum initial launch speed required for an object to overcome a body's gravitational field without further propulsion: v_esc = √(2GM/R).",
                intuitiveExplanation: "The kinetic energy supplied must equal the negative gravitational potential well at the surface.",
                keyFormulas: ["1/2 m v_esc² - GMm/R = 0 ⟹ v_esc = √(2GM/R)"],
                commonMisconceptions: ["Believing escape velocity depends on the mass of the escaping projectile."],
                realWorldApplications: ["Interplanetary space probes and geostationary telecommunication satellites."]
              }
            ],
            workedExamples: [
              {
                id: "we-p6-1",
                exampleNumber: "Example 6.1",
                title: "Calculate Earth Escape Velocity",
                problemStatement: "Given g = 9.8 m/s² and Earth radius R = 6.4 × 10⁶ m, calculate the escape velocity from Earth surface.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "State escape velocity in terms of g and R",
                    mathExpression: "v_esc = √(2 g R)",
                    detailedReasoning: "Since GM/R² = g, GM/R = gR."
                  },
                  {
                    stepNumber: 2,
                    heading: "Substitute values",
                    mathExpression: "v_esc = √(2 · 9.8 · 6.4 × 10⁶) = √(1.2544 × 10⁸) ≈ 11,200 m/s = 11.2 km/s",
                    detailedReasoning: "Evaluate the product and extract square root."
                  }
                ],
                finalAnswer: "v_esc ≈ 11.2 km/s",
                keyTakeaway: "Escape velocity is independent of projectile mass."
              }
            ],
            practiceSet: [
              {
                id: "pr-p6-1",
                itemNumber: "Q 6.1",
                tier: "drill",
                prompt: "How does gravitational attraction change if the distance between two masses is doubled?",
                hints: ["Apply inverse square law F ∝ 1/r²."],
                fullSolution: "F' = F / 2² = F / 4. The gravitational force decreases to one-quarter.",
                targetAnswer: "Reduces to 1/4 of original force"
              }
            ],
            teacherNotes: ["Differentiate between orbital velocity (circular path) and escape velocity (parabolic trajectory)."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 7
      {
        id: "phy-ch-7",
        partId: "phy-part-2",
        chapterNumber: 7,
        title: "Circular Motion & Simple Harmonic Motion (SHM)",
        subtitle: "Centripetal Acceleration, Restoring Forces & Pendulum Periods",
        overviewSummary: "Uniform circular motion kinematics, centripetal acceleration, banking of curves, and oscillatory mechanics of simple pendulums and mass-spring systems.",
        curriculumTopicsCovered: [
          "Centripetal acceleration a_c = v²/r = ω²r and centripetal force F_c = mv²/r",
          "Banking of roads without friction: tan θ = v² / (rg)",
          "Definition of SHM: acceleration is directly proportional to displacement and directed toward equilibrium",
          "Simple pendulum period T = 2π √(L/g)"
        ],
        chapterSummaryFormulas: [
          "a_c = v² / r = ω² r; F_c = m v² / r",
          "SHM equation: a = -ω² x",
          "T_pendulum = 2π √(L / g); T_spring = 2π √(m / k)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-7-1",
            chapterId: "phy-ch-7",
            sectionNumber: "7.1",
            title: "Centripetal Dynamics & Simple Harmonic Oscillation",
            pageReference: "pp. 195-212",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-OSC-01",
            stableQRIdentifier: "CEMP-CH07-SEC01-SHM",
            associatedPlayActivityId: "act-shm-pendulum",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p7-1",
                code: "LO-PHY-7.1",
                statement: "Derive and calculate period, frequency, and acceleration for simple harmonic oscillators.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p7-1",
                title: "Defining Condition of SHM",
                formalDefinition: "An oscillatory motion where acceleration a = -ω² x, directed toward the central equilibrium position.",
                intuitiveExplanation: "The farther you pull the mass from rest, the harder the restoring force snaps it back.",
                keyFormulas: ["a = -ω² x"],
                commonMisconceptions: ["Believing pendulum period depends on the mass of the bob."],
                realWorldApplications: ["Vehicle suspension shock absorbers and quartz crystal clock timing."]
              }
            ],
            workedExamples: [
              {
                id: "we-p7-1",
                exampleNumber: "Example 7.1",
                title: "Period of a Simple Pendulum",
                problemStatement: "Find the period of a 0.98 m long simple pendulum at a location where g = 9.8 m/s².",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "State period formula",
                    mathExpression: "T = 2π √(L / g)",
                    detailedReasoning: "Standard small-angle formula for simple pendulum."
                  },
                  {
                    stepNumber: 2,
                    heading: "Substitute parameters",
                    mathExpression: "T = 2π √(0.98 / 9.8) = 2π √(0.1) ≈ 2 · 3.1416 · 0.3162 ≈ 1.99 s ≈ 2.0 s",
                    detailedReasoning: "Evaluate square root and multiply by 2π."
                  }
                ],
                finalAnswer: "T ≈ 2.0 seconds",
                keyTakeaway: "A pendulum with length ~1 meter is known historically as a 'seconds pendulum'."
              }
            ],
            practiceSet: [
              {
                id: "pr-p7-1",
                itemNumber: "Q 7.1",
                tier: "drill",
                prompt: "Calculate centripetal force on a 1000 kg car moving at 20 m/s around a circular curve of radius 50 m.",
                hints: ["F_c = mv²/r."],
                fullSolution: "F_c = 1000 · (20)² / 50 = 1000 · 400 / 50 = 8000 N.",
                targetAnswer: "8000 N"
              }
            ],
            teacherNotes: ["Emphasize that centripetal force is not an extra force, but a label for the net inward force."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 8
      {
        id: "phy-ch-8",
        partId: "phy-part-3",
        chapterNumber: 8,
        title: "Hydrostatics, Fluid Dynamics & Archimedes' Principle",
        subtitle: "Hydrostatic Pressure P = ρgh, Buoyancy & Bernoulli Streamlines",
        overviewSummary: "Pressure in liquids, Pascal's principle in hydraulic presses, Archimedes' law of upthrust and floatation, surface tension, and Bernoulli fluid continuity.",
        curriculumTopicsCovered: [
          "Liquid pressure P = ρ g h and transmission in hydraulic systems",
          "Archimedes' Principle: Upthrust = weight of fluid displaced",
          "Law of Floatation: floating body displaces its own weight of fluid",
          "Bernoulli principle: P + 1/2 ρv² + ρgh = constant"
        ],
        chapterSummaryFormulas: [
          "P = ρ · g · h",
          "Hydraulic Press: F₁ / A₁ = F₂ / A₂",
          "Upthrust U = ρ_fluid · V_displaced · g"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-8-1",
            chapterId: "phy-ch-8",
            sectionNumber: "8.1",
            title: "Archimedes' Principle & Buoyancy",
            pageReference: "pp. 230-248",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-FLD-01",
            stableQRIdentifier: "CEMP-CH08-SEC01-ARC",
            associatedPlayActivityId: "act-fluid-buoyancy",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p8-1",
                code: "LO-PHY-8.1",
                statement: "Explain upthrust and apply Archimedes' principle to determine relative densities.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p8-1",
                title: "Archimedes' Principle",
                formalDefinition: "Any body wholly or partially immersed in a fluid experiences an upward buoyant force equal to the weight of fluid displaced by the body.",
                intuitiveExplanation: "Pressure increases with depth, meaning upward force on the bottom always exceeds downward force on top.",
                keyFormulas: ["U = ρ_f · V · g"],
                commonMisconceptions: ["Thinking heavier objects always sink regardless of average volume/density."],
                realWorldApplications: ["Submarine ballast tanks and ship naval hull engineering."]
              }
            ],
            workedExamples: [
              {
                id: "we-p8-1",
                exampleNumber: "Example 8.1",
                title: "Determine Upthrust on Immersed Metal Block",
                problemStatement: "A 0.002 m³ metal block is fully submerged in water (density ρ = 1000 kg/m³, g = 9.8 m/s²). Calculate the upthrust.",
                difficulty: "foundational",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "State formula for buoyant force",
                    mathExpression: "U = ρ_fluid · V · g",
                    detailedReasoning: "Upthrust equals weight of displaced water."
                  },
                  {
                    stepNumber: 2,
                    heading: "Compute upthrust",
                    mathExpression: "U = 1000 · 0.002 · 9.8 = 19.6 N",
                    detailedReasoning: "Evaluate the product."
                  }
                ],
                finalAnswer: "Upthrust = 19.6 N",
                keyTakeaway: "Upthrust depends only on fluid density and displaced volume, not object density."
              }
            ],
            practiceSet: [
              {
                id: "pr-p8-1",
                itemNumber: "Q 8.1",
                tier: "drill",
                prompt: "Calculate hydrostatic pressure at depth 10 m in fresh water (ρ = 1000 kg/m³, g = 9.8 m/s²).",
                hints: ["P = ρgh."],
                fullSolution: "P = 1000 · 9.8 · 10 = 98,000 Pa (0.98 bar).",
                targetAnswer: "98,000 Pa"
              }
            ],
            teacherNotes: ["Distinguish gauge pressure (ρgh) from absolute pressure (P_atm + ρgh)."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 9
      {
        id: "phy-ch-9",
        partId: "phy-part-3",
        chapterNumber: 9,
        title: "Wave Propagation, Sound Resonance & Physical Optics",
        subtitle: "Wave Equation v = fλ, Resonance Columns, Snell's Law & Lenses",
        overviewSummary: "Transverse and longitudinal waves, speed of sound in air, standing waves in resonant resonance tubes, Snell's law of refraction, and lens formulas.",
        curriculumTopicsCovered: [
          "Universal wave equation v = f · λ",
          "Interference, diffraction, and standing wave nodes/antinodes",
          "Refraction and Snell's Law: n₁ sin θ₁ = n₂ sin θ₂",
          "Thin lens equation: 1/f = 1/u + 1/v"
        ],
        chapterSummaryFormulas: [
          "v = f · λ",
          "Snell's Law: n = sin i / sin r",
          "Thin Lens: 1/f = 1/u + 1/v; Magnification m = v / u"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-9-1",
            chapterId: "phy-ch-9",
            sectionNumber: "9.1",
            title: "Wave Mechanics & Geometric Optics",
            pageReference: "pp. 265-285",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-WAV-01",
            stableQRIdentifier: "CEMP-CH09-SEC01-WAV",
            associatedPlayActivityId: "act-wave-optics",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p9-1",
                code: "LO-PHY-9.1",
                statement: "Solve refraction and lens image formation problems using the thin lens formula.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p9-1",
                title: "Refraction and Snell's Law",
                formalDefinition: "The ratio of sine of angle of incidence to sine of angle of refraction equals the relative refractive index of the two media.",
                intuitiveExplanation: "Light bends toward the normal when entering a denser medium because its wave speed decreases.",
                keyFormulas: ["n₁ sin θ₁ = n₂ sin θ₂"],
                commonMisconceptions: ["Measuring angles of incidence to the surface boundary rather than to the normal line."],
                realWorldApplications: ["Optical fiber telecommunications and eye corrective spectacle lenses."]
              }
            ],
            workedExamples: [
              {
                id: "we-p9-1",
                exampleNumber: "Example 9.1",
                title: "Calculate Critical Angle for Glass-Air Boundary",
                problemStatement: "Calculate the critical angle for crown glass with refractive index n = 1.50 in air.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "State critical angle formula",
                    mathExpression: "sin c = 1 / n",
                    detailedReasoning: "At critical angle c, refracted angle in air is 90° (sin 90° = 1)."
                  },
                  {
                    stepNumber: 2,
                    heading: "Compute critical angle",
                    mathExpression: "sin c = 1 / 1.50 = 0.6667 ⟹ c = arcsin(0.6667) ≈ 41.8°",
                    detailedReasoning: "Evaluate inverse sine."
                  }
                ],
                finalAnswer: "Critical angle c ≈ 41.8°",
                keyTakeaway: "Total internal reflection occurs only when light travels from dense to rare medium at angle > c."
              }
            ],
            practiceSet: [
              {
                id: "pr-p9-1",
                itemNumber: "Q 9.1",
                tier: "drill",
                prompt: "A sound wave has frequency 440 Hz and speed 330 m/s in air. Calculate its wavelength.",
                hints: ["λ = v / f."],
                fullSolution: "λ = 330 / 440 = 0.75 meters.",
                targetAnswer: "0.75 m"
              }
            ],
            teacherNotes: ["Emphasize sign conventions: real is positive for lens calculations."]
          }
        ],
        chapterReviewQuestions: []
      },

      // PHY CH 10
      {
        id: "phy-ch-10",
        partId: "phy-part-3",
        chapterNumber: 10,
        title: "Electrostatics, Coulomb's Law & Direct Current Circuits",
        subtitle: "Electric Fields, Potential, Ohm's Law & Kirchhoff's Circuit Rules",
        overviewSummary: "Electrostatic forces, electric field intensity E, electric potential V, Ohm's law V = IR, series and parallel resistor networks, and Kirchhoff's loop laws.",
        curriculumTopicsCovered: [
          "Coulomb's Law: F = (1 / 4πε₀) · (q₁q₂ / r²)",
          "Electric field strength E = F / q and Electric potential V = W / q",
          "Ohm's Law, resistivity ρ = RA/L, and EMF of a cell",
          "Resistors in series R_s = R₁ + R₂ and parallel 1/R_p = 1/R₁ + 1/R₂",
          "Kirchhoff's Current Law (junction rule) and Voltage Law (loop rule)"
        ],
        chapterSummaryFormulas: [
          "F = k · (q₁ · q₂) / r² (k = 8.99 × 10⁹ N·m²/C²)",
          "V = I · R; P = V · I = I² R",
          "Series: R_total = ∑ R_i; Parallel: 1/R_total = ∑ (1/R_i)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "phy-sec-10-1",
            chapterId: "phy-ch-10",
            sectionNumber: "10.1",
            title: "Circuit Analysis & Kirchhoff's Laws",
            pageReference: "pp. 305-328",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-PHY-ELE-01",
            stableQRIdentifier: "CEMP-CH10-SEC01-CIR",
            associatedPlayActivityId: "act-dc-circuits",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "lo-p10-1",
                code: "LO-PHY-10.1",
                statement: "Analyze DC networks to compute equivalent resistance, branch currents, and potential drops.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-p10-1",
                title: "Kirchhoff's Laws",
                formalDefinition: "1. Junction Rule: Total current entering any node equals total current leaving (charge conservation). 2. Loop Rule: Total directed sum of electrical potential differences around any closed loop equals zero (energy conservation).",
                intuitiveExplanation: "Charges cannot accumulate in a wire node, and traveling around a closed electrical circuit returns you to the same starting electrical potential.",
                keyFormulas: ["∑ I_in = ∑ I_out", "∑ V = 0"],
                commonMisconceptions: ["Believing electric current gets 'used up' as it flows through resistors."],
                realWorldApplications: ["Household electrical wiring and printed circuit board electronic layouts."]
              }
            ],
            workedExamples: [
              {
                id: "we-p10-1",
                exampleNumber: "Example 10.1",
                title: "Calculate Equivalent Resistance for Combined Circuit",
                problemStatement: "Two resistors of 6 Ω and 3 Ω are connected in parallel, and this combination is placed in series with a 4 Ω resistor. Find total resistance.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Compute parallel combination R_p",
                    mathExpression: "1 / R_p = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 ⟹ R_p = 2 Ω",
                    detailedReasoning: "Use reciprocal formula for parallel resistors."
                  },
                  {
                    stepNumber: 2,
                    heading: "Add series resistor R₃",
                    mathExpression: "R_total = R_p + R₃ = 2 Ω + 4 Ω = 6 Ω",
                    detailedReasoning: "Equivalent resistance in series is the direct sum."
                  }
                ],
                finalAnswer: "R_total = 6 Ω",
                keyTakeaway: "Simplify parallel groupings first before resolving series branches."
              }
            ],
            practiceSet: [
              {
                id: "pr-p10-1",
                itemNumber: "Q 10.1",
                tier: "drill",
                prompt: "A 12 V battery is connected across a 4 Ω resistor. Calculate the current and power dissipated.",
                hints: ["I = V/R, P = V·I."],
                fullSolution: "I = 12 / 4 = 3 Amperes. P = 12 · 3 = 36 Watts.",
                targetAnswer: "I = 3 A, P = 36 W"
              }
            ],
            teacherNotes: ["Emphasize internal resistance r of real cells: V_terminal = E - Ir."]
          }
        ],
        chapterReviewQuestions: []
      }
    ],
    totalQRResourcesCount: 40,
    lifecycleStatus: "human_approved",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-18T16:00:00Z",
    lastQualityScore: 96
  }
];
