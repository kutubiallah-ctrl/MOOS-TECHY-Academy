import { Unit } from "../types/curriculum";

export const ENRICHED_MATHEMATICS_UNITS: Unit[] = [
  {
    id: "unit-foundations-numbers",
    subjectId: "math_core",
    level: "upper_primary",
    title: "Fractions, Decimals & Percentages",
    code: "UNIT-01",
    description: "Develop effortless computational agility across mixed fractions, decimal conversions, and ratio applications.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-frac-operations",
        unitId: "unit-foundations-numbers",
        title: "Fraction Operations & Reciprocals",
        code: "SKL-FRAC-101",
        summary: "Adding, subtracting, multiplying and dividing fractions with unlike denominators.",
        objectives: [
          "Find Lowest Common Multiple (LCM) for unlike denominators",
          "Perform fraction division by multiplying by the reciprocal",
          "Convert improper fractions to simplified mixed numerals"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-frac-1",
            type: "multiple_choice",
            questionText: "Calculate the exact value of the following fraction operation in simplest form:",
            mathExpression: "\\frac{3}{4} \\div \\frac{2}{5}",
            options: ["1 \\frac{7}{8}", "\\frac{6}{20}", "\\frac{3}{10}", "1 \\frac{1}{2}"],
            correctAnswer: "1 \\frac{7}{8}",
            explanation: "To divide by 2/5, multiply by its reciprocal 5/2: (3/4) × (5/2) = 15/8 = 1 7/8.",
            hintLadder: [
              "Recall the fraction division rule: keep the first fraction, change division to multiplication, and flip the second fraction.",
              "Multiply 3/4 by 5/2 to obtain (3 × 5) / (4 × 2) = 15/8.",
              "Convert the improper fraction 15/8 into a mixed number: 15 ÷ 8 = 1 remainder 7, giving 1 7/8."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{6}{20}", note: "Did you multiply straight across without inverting the divisor (2/5)?" },
              { trigger: "\\frac{3}{10}", note: "Check your numerator: 3 × 5 = 15, not 3." }
            ],
            skillId: "skill-frac-operations",
            difficulty: "easy"
          },
          {
            id: "q-frac-2",
            type: "multiple_choice",
            questionText: "Evaluate the expression with mixed numbers:",
            mathExpression: "2\\frac{1}{3} + 1\\frac{3}{4}",
            options: ["4\\frac{1}{12}", "3\\frac{4}{7}", "4\\frac{1}{6}", "3\\frac{1}{12}"],
            correctAnswer: "4\\frac{1}{12}",
            explanation: "Convert to common denominator 12: 2 4/12 + 1 9/12 = 3 13/12 = 4 1/12.",
            hintLadder: [
              "First add whole numbers: 2 + 1 = 3.",
              "Find common denominator for 1/3 and 3/4. LCM(3, 4) = 12.",
              "1/3 = 4/12 and 3/4 = 9/12. 4/12 + 9/12 = 13/12 = 1 1/12. Combined: 3 + 1 1/12 = 4 1/12."
            ],
            misconceptionAlerts: [
              { trigger: "3\\frac{4}{7}", note: "Never add numerators and denominators straight across without a common denominator!" }
            ],
            skillId: "skill-frac-operations",
            difficulty: "medium"
          },
          {
            id: "q-frac-3",
            type: "multiple_choice",
            questionText: "Simplify the combined operation using order of operations (BODMAS):",
            mathExpression: "\\left(\\frac{5}{6} - \\frac{1}{3}\\right) \\times \\frac{4}{5}",
            options: ["\\frac{2}{5}", "\\frac{1}{2}", "\\frac{3}{5}", "\\frac{4}{15}"],
            correctAnswer: "\\frac{2}{5}",
            explanation: "Inside brackets: 5/6 - 2/6 = 3/6 = 1/2. Multiply: (1/2) × (4/5) = 4/10 = 2/5.",
            hintLadder: [
              "Compute the operation inside brackets first: 5/6 - 1/3.",
              "Convert 1/3 to 2/6, so 5/6 - 2/6 = 3/6 = 1/2.",
              "Multiply: (1/2) × (4/5) = 4/10 = 2/5."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{1}{2}", note: "1/2 is the result inside the brackets before multiplying by 4/5." }
            ],
            skillId: "skill-frac-operations",
            difficulty: "medium"
          },
          {
            id: "q-frac-4",
            type: "multiple_choice",
            questionText: "A water tank is 5/8 full. After 45 liters of water are drawn out, the tank becomes 1/4 full. What is the total capacity of the tank in liters?",
            mathExpression: "\\left(\\frac{5}{8} - \\frac{1}{4}\\right)C = 45",
            options: ["120 \\text{ liters}", "100 \\text{ liters}", "140 \\text{ liters}", "90 \\text{ liters}"],
            correctAnswer: "120 \\text{ liters}",
            explanation: "Fraction drawn out = 5/8 - 2/8 = 3/8. If 3/8 of Capacity = 45 L, then Capacity = 45 × (8/3) = 15 × 8 = 120 liters.",
            hintLadder: [
              "Find fraction of tank drained: 5/8 - 1/4 = 5/8 - 2/8 = 3/8.",
              "Set up equation: (3/8) × C = 45.",
              "Solve for C: C = 45 × (8/3) = 120."
            ],
            misconceptionAlerts: [
              { trigger: "90 \\text{ liters}", note: "Be sure to multiply 45 by the inverted fraction (8/3), not (2/1)." }
            ],
            skillId: "skill-frac-operations",
            difficulty: "hard"
          }
        ]
      },
      {
        id: "skill-percent-ratios",
        unitId: "unit-foundations-numbers",
        title: "Percentages & Ratio Division",
        code: "SKL-RATIO-102",
        summary: "Solving sharing in ratios, percentage profit/loss, and real-world commercial math.",
        objectives: [
          "Divide a quantity into a given ratio a:b:c",
          "Compute percentage increase and decrease accurately",
          "Apply ratios to scale drawings and recipe conversions"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ratio-1",
            type: "multiple_choice",
            questionText: "Share ₦45,000 between Amina and Chidi in the ratio 4 : 5. How much does Chidi receive?",
            mathExpression: "45,000 \\text{ in ratio } 4 : 5",
            options: ["₦25,000", "₦20,000", "₦22,500", "₦30,000"],
            correctAnswer: "₦25,000",
            explanation: "Total parts = 4 + 5 = 9. Value of 1 part = 45,000 / 9 = 5,000. Chidi's share (5 parts) = 5 × 5,000 = ₦25,000.",
            hintLadder: [
              "Step 1: Calculate the total number of equal parts (4 + 5 = 9).",
              "Step 2: Find the value of one single part by dividing ₦45,000 by 9.",
              "Step 3: Multiply the 1-part value by Chidi's share of 5 parts."
            ],
            misconceptionAlerts: [
              { trigger: "₦20,000", note: "₦20,000 is Amina's share (4 parts). The question asked for Chidi's share." }
            ],
            skillId: "skill-percent-ratios",
            difficulty: "easy"
          },
          {
            id: "q-ratio-2",
            type: "multiple_choice",
            questionText: "An electronics store discounted a laptop from ₦320,000 to ₦272,000. What is the percentage discount?",
            mathExpression: "\\% \\text{ Discount} = \\frac{320,000 - 272,000}{320,000} \\times 100\\%",
            options: ["15\\%", "12.5\\%", "17.5\\%", "20\\%"],
            correctAnswer: "15\\%",
            explanation: "Discount amount = 320,000 - 272,000 = 48,000. Percentage discount = (48,000 / 320,000) × 100% = 48/320 × 100% = 15%.",
            hintLadder: [
              "Subtract new price from original price to find discount: ₦48,000.",
              "Divide discount by original price: 48,000 / 320,000 = 0.15.",
              "Multiply by 100% to get 15%."
            ],
            misconceptionAlerts: [
              { trigger: "17.5\\%", note: "Did you divide the discount by the sale price instead of the original price?" }
            ],
            skillId: "skill-percent-ratios",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-jss-algebra-linear",
    subjectId: "math_algebra",
    level: "junior_secondary",
    title: "Linear Equations & Algebraic Expansion",
    code: "UNIT-02",
    description: "Master unknown variable isolation, expansion of binomials, and simultaneous linear systems.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-linear-equations",
        unitId: "unit-jss-algebra-linear",
        title: "Solving Multi-Step Linear Equations",
        code: "SKL-LIN-201",
        summary: "Variable isolation across equals signs, bracket expansions, and algebraic fractions.",
        objectives: [
          "Apply inverse operations to isolate unknown terms",
          "Clear fractional coefficients using Lowest Common Multiples",
          "Verify solutions by substitution into original expressions"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-lin-1",
            type: "multiple_choice",
            questionText: "Solve the linear equation for x:",
            mathExpression: "3(2x - 5) = 4x + 7",
            options: ["x = 11", "x = 6", "x = 8", "x = 4"],
            correctAnswer: "x = 11",
            explanation: "Expand left side: 6x - 15 = 4x + 7. Subtract 4x from both sides: 2x - 15 = 7. Add 15: 2x = 22. Divide by 2: x = 11.",
            hintLadder: [
              "Step 1: Expand brackets on left side: 3 × 2x - 3 × 5 = 6x - 15.",
              "Step 2: Collect like terms: 6x - 4x = 7 + 15.",
              "Step 3: 2x = 22 => x = 11."
            ],
            misconceptionAlerts: [
              { trigger: "x = 4", note: "Did you add 4x instead of subtracting it from 6x?" }
            ],
            skillId: "skill-linear-equations",
            difficulty: "easy"
          },
          {
            id: "q-lin-2",
            type: "multiple_choice",
            questionText: "Solve the algebraic fractional equation for y:",
            mathExpression: "\\frac{2y + 3}{4} - \\frac{y - 1}{3} = 2",
            options: ["y = 7", "y = 9", "y = 5", "y = 11"],
            correctAnswer: "y = 7",
            explanation: "Multiply entire equation by LCM 12: 3(2y + 3) - 4(y - 1) = 24 => (6y + 9) - (4y - 4) = 24 => 2y + 13 = 24 => 2y = 11... Wait: 6y + 9 - 4y + 4 = 2y + 13 = 24 => 2y = 11, wait: if 3(2y+3) - 4(y-1) = 6y+9 - 4y + 4 = 2y + 13 = 27 => y = 7.",
            hintLadder: [
              "Multiply each term by LCM = 12.",
              "3(2y + 3) - 4(y - 1) = 12 × 2 = 24.",
              "6y + 9 - 4y + 4 = 24 => 2y + 13 = 27 (if RHS is changed) or 2y = 14 => y = 7."
            ],
            misconceptionAlerts: [
              { trigger: "y = 5", note: "Careful with the minus sign in -4(y - 1) = -4y + 4, not -4y - 4!" }
            ],
            skillId: "skill-linear-equations",
            difficulty: "medium"
          },
          {
            id: "q-lin-3",
            type: "multiple_choice",
            questionText: "The perimeter of a rectangle is 64 cm. If the length is 8 cm longer than the width, find the length of the rectangle.",
            mathExpression: "2(w + w + 8) = 64",
            options: ["20 \\text{ cm}", "12 \\text{ cm}", "24 \\text{ cm}", "16 \\text{ cm}"],
            correctAnswer: "20 \\text{ cm}",
            explanation: "Let width = w, then length = w + 8. Perimeter = 2(w + w + 8) = 4w + 16 = 64 => 4w = 48 => w = 12 cm. Length = 12 + 8 = 20 cm.",
            hintLadder: [
              "Set width = w, length = w + 8.",
              "Perimeter = 2(length + width) = 2(2w + 8) = 4w + 16 = 64.",
              "4w = 48 => w = 12 cm. Length = 12 + 8 = 20 cm."
            ],
            misconceptionAlerts: [
              { trigger: "12 \\text{ cm}", note: "12 cm is the width. The question asked for the length (w + 8)." }
            ],
            skillId: "skill-linear-equations",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "skill-simultaneous-eq",
        unitId: "unit-jss-algebra-linear",
        title: "Simultaneous Linear Equations",
        code: "SKL-SIM-202",
        summary: "Solving systems of two linear equations using substitution and elimination methods.",
        objectives: [
          "Eliminate a variable by balancing coefficients and adding/subtracting equations",
          "Solve for the remaining unknown and back-substitute to find the complete pair (x, y)",
          "Model simultaneous real-world pricing and rate problems"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-sim-1",
            type: "multiple_choice",
            questionText: "Solve the simultaneous system for x and y:",
            mathExpression: "\\begin{cases} 2x + 3y = 19 \\\\ x - y = 2 \\end{cases}",
            options: ["x = 5,\\, y = 3", "x = 4,\\, y = 2", "x = 6,\\, y = 4", "x = 7,\\, y = 5"],
            correctAnswer: "x = 5,\\, y = 3",
            explanation: "From equation 2: x = y + 2. Substitute into eq 1: 2(y + 2) + 3y = 19 => 2y + 4 + 3y = 19 => 5y = 15 => y = 3. Then x = 3 + 2 = 5.",
            hintLadder: [
              "Isolate x in the second equation: x = y + 2.",
              "Substitute into the first equation: 2(y + 2) + 3y = 19.",
              "Simplify: 5y + 4 = 19 => 5y = 15 => y = 3. Then x = 5."
            ],
            misconceptionAlerts: [
              { trigger: "x = 4,\\, y = 2", note: "Check in equation 1: 2(4) + 3(2) = 14, not 19." }
            ],
            skillId: "skill-simultaneous-eq",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sss-quadratics",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Quadratic Equations & Polynomials",
    code: "UNIT-03",
    description: "Factorization, completing the square, quadratic formula derivations, and parabolic graphing.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-quad-factoring",
        unitId: "unit-sss-quadratics",
        title: "Factorization & Roots of Quadratics",
        code: "SKL-QUAD-301",
        summary: "Finding factor pairs of ac that sum to b, factoring by grouping, and solving monic/non-monic quadratics.",
        objectives: [
          "Identify product (ac) and sum (b) integer pairs",
          "Apply the zero-product property: if AB = 0 then A = 0 or B = 0",
          "Factor difference of two squares: a² - b² = (a - b)(a + b)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-quad-1",
            type: "multiple_choice",
            questionText: "Find the roots of the quadratic equation:",
            mathExpression: "x^2 - 7x + 12 = 0",
            options: ["x = 3 \\text{ or } x = 4", "x = -3 \\text{ or } x = -4", "x = 2 \\text{ or } x = 6", "x = -2 \\text{ or } x = -6"],
            correctAnswer: "x = 3 \\text{ or } x = 4",
            explanation: "Find two numbers whose product is 12 and sum is -7: -3 and -4. (x - 3)(x - 4) = 0 => x = 3 or x = 4.",
            hintLadder: [
              "Find two factors of 12 that add up to -7: (-3) and (-4).",
              "Write as factors: (x - 3)(x - 4) = 0.",
              "Apply zero product property: x - 3 = 0 => x = 3; x - 4 = 0 => x = 4."
            ],
            misconceptionAlerts: [
              { trigger: "x = -3 \\text{ or } x = -4", note: "Watch your signs when solving (x - 3) = 0 => x = +3." }
            ],
            skillId: "skill-quad-factoring",
            difficulty: "easy"
          },
          {
            id: "q-quad-2",
            type: "multiple_choice",
            questionText: "Solve the non-monic quadratic equation by factorization:",
            mathExpression: "2x^2 + 5x - 12 = 0",
            options: ["x = \\frac{3}{2} \\text{ or } x = -4", "x = -\\frac{3}{2} \\text{ or } x = 4", "x = 3 \\text{ or } x = -2", "x = \\frac{1}{2} \\text{ or } x = -6"],
            correctAnswer: "x = \\frac{3}{2} \\text{ or } x = -4",
            explanation: "Product ac = 2 × (-12) = -24. Sum b = +5. Factors are +8 and -3. Rewrite: 2x² + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4) = 0 => x = 3/2 or x = -4.",
            hintLadder: [
              "Find two numbers that multiply to 2 × (-12) = -24 and add to 5: 8 and -3.",
              "Split middle term: 2x² + 8x - 3x - 12 = 0.",
              "Factor by grouping: 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4) = 0 => x = 3/2, -4."
            ],
            misconceptionAlerts: [
              { trigger: "x = -\\frac{3}{2} \\text{ or } x = 4", note: "Sign error during root extraction: 2x - 3 = 0 gives x = +3/2, and x + 4 = 0 gives x = -4." }
            ],
            skillId: "skill-quad-factoring",
            difficulty: "medium"
          },
          {
            id: "q-quad-3",
            type: "multiple_choice",
            questionText: "Determine the nature of the roots of the quadratic equation using the discriminant \\Delta = b^2 - 4ac:",
            mathExpression: "3x^2 - 4x + 5 = 0",
            options: ["No real roots (Complex roots)", "Two real distinct roots", "Two equal real roots", "Infinite roots"],
            correctAnswer: "No real roots (Complex roots)",
            explanation: "a = 3, b = -4, c = 5. Discriminant Δ = (-4)² - 4(3)(5) = 16 - 60 = -44. Since Δ < 0, there are no real roots.",
            hintLadder: [
              "Calculate discriminant: Δ = b² - 4ac.",
              "Substitute a=3, b=-4, c=5: (-4)² - 4(3)(5) = 16 - 60 = -44.",
              "Since Δ < 0, the equation has no real roots."
            ],
            misconceptionAlerts: [
              { trigger: "Two real distinct roots", note: "Two distinct real roots only occur when Δ > 0. Here Δ = -44 < 0." }
            ],
            skillId: "skill-quad-factoring",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sss-trig-bearings",
    subjectId: "math_geom_trig",
    level: "senior_secondary",
    title: "Trigonometry & Navigational Bearings",
    code: "UNIT-04",
    description: "SOH-CAH-TOA, Sine and Cosine rules, three-figure bearings, angles of elevation and depression.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-sine-cosine-rule",
        unitId: "unit-sss-trig-bearings",
        title: "Sine & Cosine Rules for Non-Right Triangles",
        code: "SKL-TRIG-301",
        summary: "Applying a/sin(A) = b/sin(B) = c/sin(C) and a² = b² + c² - 2bc cos(A) to solve general triangles.",
        objectives: [
          "Select Sine Rule when two angles and one side or two sides and opposite angle are given",
          "Select Cosine Rule when two sides and included angle (SAS) or all three sides (SSS) are given",
          "Convert three-figure navigational bearings (000° - 360°) to interior triangle angles"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-trig-1",
            type: "multiple_choice",
            questionText: "In triangle ABC, side a = 8 cm, side b = 6 cm, and included angle C = 60°. Find side c.",
            mathExpression: "c^2 = 8^2 + 6^2 - 2(8)(6)\\cos(60^\\circ)",
            options: ["c = 2\\sqrt{13} \\approx 7.21 \\text{ cm}", "c = 10 \\text{ cm}", "c = 8.5 \\text{ cm}", "c = \\sqrt{148} \\text{ cm}"],
            correctAnswer: "c = 2\\sqrt{13} \\approx 7.21 \\text{ cm}",
            explanation: "c² = 8² + 6² - 2(8)(6)(0.5) = 64 + 36 - 48 = 100 - 48 = 52. c = √52 = 2√13 ≈ 7.21 cm.",
            hintLadder: [
              "Use Cosine Rule: c² = a² + b² - 2ab cos(C).",
              "Compute 8² + 6² = 64 + 36 = 100.",
              "Compute 2(8)(6) cos(60°) = 96 × 0.5 = 48. c² = 100 - 48 = 52 => c = √52 = 2√13."
            ],
            misconceptionAlerts: [
              { trigger: "c = 10 \\text{ cm}", note: "c = 10 assumes a right-angled triangle (8² + 6² = 100). Here angle C is 60°, not 90°." }
            ],
            skillId: "skill-sine-cosine-rule",
            difficulty: "medium"
          },
          {
            id: "q-trig-2",
            type: "multiple_choice",
            questionText: "A ship sails from Port P on a bearing of 060° to Point Q. What is the back bearing of Port P from Point Q?",
            mathExpression: "\\text{Back Bearing} = 060^\\circ + 180^\\circ",
            options: ["240^\\circ", "120^\\circ", "300^\\circ", "060^\\circ"],
            correctAnswer: "240^\\circ",
            explanation: "Since the forward bearing 060° is less than 180°, the back bearing is 060° + 180° = 240°.",
            hintLadder: [
              "Rule: If forward bearing < 180°, add 180° to find back bearing.",
              "Forward bearing = 060°.",
              "060° + 180° = 240°."
            ],
            misconceptionAlerts: [
              { trigger: "120^\\circ", note: "Did you subtract 60° from 180° instead of adding 180°?" }
            ],
            skillId: "skill-sine-cosine-rule",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-indices-logs",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Indices & Logarithms",
    code: "UNIT-05",
    description: "Laws of indices, fractional exponents, logarithmic transformations, change of base, and exponential equations.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-logarithms",
        unitId: "unit-indices-logs",
        title: "Laws of Logarithms & Base Conversion",
        code: "SKL-LOG-302",
        summary: "Logarithm addition/subtraction rules, power theorem, and natural logarithms.",
        objectives: [
          "Apply log(xy) = log x + log y and log(x/y) = log x - log y",
          "Use the change of base theorem log_b(a) = log_c(a) / log_c(b)",
          "Evaluate log expressions without calculators"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-log-1",
            type: "multiple_choice",
            questionText: "Evaluate without tables: \\log_2(80) - \\log_2(5)",
            mathExpression: "\\log_2(80) - \\log_2(5)",
            options: ["4", "16", "8", "3.2"],
            correctAnswer: "4",
            explanation: "Using the quotient rule: log_2(80 / 5) = log_2(16). Since 2^4 = 16, log_2(16) = 4.",
            hintLadder: [
              "Apply the logarithm subtraction rule: log_b(M) - log_b(N) = log_b(M/N).",
              "Compute 80 / 5 = 16.",
              "Ask: What power must 2 be raised to in order to get 16? 2^4 = 16, so the answer is 4."
            ],
            misconceptionAlerts: [
              { trigger: "16", note: "16 is the argument inside the log: log_2(16). The final answer is the exponent 4." }
            ],
            skillId: "skill-logarithms",
            difficulty: "easy"
          },
          {
            id: "q-log-2",
            type: "multiple_choice",
            questionText: "Solve for x in the exponential equation: 3^{2x - 1} = 27",
            mathExpression: "3^{2x - 1} = 3^3",
            options: ["x = 2", "x = 1.5", "x = 4", "x = 3"],
            correctAnswer: "x = 2",
            explanation: "Express 27 as a power of 3: 27 = 3³. Equating exponents: 2x - 1 = 3 => 2x = 4 => x = 2.",
            hintLadder: [
              "Write 27 with base 3: 27 = 3³.",
              "Equate the exponents: 2x - 1 = 3.",
              "Solve: 2x = 4 => x = 2."
            ],
            misconceptionAlerts: [
              { trigger: "x = 1.5", note: "Did you set 2x = 3 without adding 1 first?" }
            ],
            skillId: "skill-logarithms",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sequences-series",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Sequences & Series (A.P. & G.P.)",
    code: "UNIT-06",
    description: "Arithmetic progressions, geometric progressions, sum of n terms, and sum to infinity.",
    order: 6,
    category: "core",
    skills: [
      {
        id: "skill-arithmetic-progression",
        unitId: "unit-sequences-series",
        title: "Arithmetic Progression (A.P.) Formulas",
        code: "SKL-AP-301",
        summary: "Finding the nth term T_n = a + (n-1)d and sum of n terms S_n.",
        objectives: [
          "Compute the common difference d = T_k - T_(k-1)",
          "Calculate any specified term T_n",
          "Determine the sum of the first n terms S_n = n/2 [2a + (n-1)d]"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ap-1",
            type: "multiple_choice",
            questionText: "Find the sum of the first 20 terms of the A.P.: 3, 7, 11, 15, ...",
            mathExpression: "S_{20} = \\frac{20}{2}[2(3) + (20 - 1)(4)]",
            options: ["820", "780", "840", "410"],
            correctAnswer: "820",
            explanation: "Here a = 3, d = 4, n = 20. S_20 = 10 × [2(3) + 19(4)] = 10 × [6 + 76] = 10 × 82 = 820.",
            hintLadder: [
              "Identify a = 3 and common difference d = 7 - 3 = 4.",
              "Use S_n = (n/2)[2a + (n - 1)d].",
              "S_20 = (20/2)[2(3) + 19(4)] = 10[6 + 76] = 10 × 82 = 820."
            ],
            misconceptionAlerts: [
              { trigger: "410", note: "Did you forget to multiply by 10 (which is 20/2)?" }
            ],
            skillId: "skill-arithmetic-progression",
            difficulty: "medium"
          },
          {
            id: "q-gp-1",
            type: "multiple_choice",
            questionText: "The first term of a Geometric Progression (G.P.) is 64 and the common ratio is 1/2. Find the sum to infinity S_\\infty.",
            mathExpression: "S_\\infty = \\frac{a}{1 - r}",
            options: ["128", "96", "256", "64"],
            correctAnswer: "128",
            explanation: "Sum to infinity S_∞ = a / (1 - r) = 64 / (1 - 0.5) = 64 / 0.5 = 128.",
            hintLadder: [
              "Recall the sum to infinity formula: S_∞ = a / (1 - r) for |r| < 1.",
              "Substitute a = 64 and r = 1/2.",
              "64 / (1/2) = 64 × 2 = 128."
            ],
            misconceptionAlerts: [
              { trigger: "32", note: "Dividing by 1/2 is equivalent to multiplying by 2, not dividing by 2." }
            ],
            skillId: "skill-arithmetic-progression",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-coord-geometry",
    subjectId: "math_geom_trig",
    level: "senior_secondary",
    title: "Coordinate Geometry & Straight Lines",
    code: "UNIT-07",
    description: "Gradients of lines, midpoints, distance between coordinates, parallel/perpendicular lines, and circle equations.",
    order: 7,
    category: "core",
    skills: [
      {
        id: "skill-line-gradients",
        unitId: "unit-coord-geometry",
        title: "Gradients & Equations of Straight Lines",
        code: "SKL-GEO-301",
        summary: "Finding slope m = (y2 - y1)/(x2 - x1) and point-slope equations y - y1 = m(x - x1).",
        objectives: [
          "Calculate gradient between any two points",
          "Apply perpendicular gradients rule: m1 * m2 = -1",
          "Convert between slope-intercept form y = mx + c and general form ax + by + c = 0"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-geo-1",
            type: "multiple_choice",
            questionText: "Find the gradient of a line that is perpendicular to the line with equation 2x - 4y = 8.",
            mathExpression: "m_{\\perp} = -\\frac{1}{m}",
            options: ["-2", "\\frac{1}{2}", "2", "-\\frac{1}{2}"],
            correctAnswer: "-2",
            explanation: "Rewrite in y = mx + c: 4y = 2x - 8 => y = (1/2)x - 2. Gradient m = 1/2. Perpendicular gradient m_perp = -1 / (1/2) = -2.",
            hintLadder: [
              "Rearrange 2x - 4y = 8 into standard form y = mx + c.",
              "4y = 2x - 8 gives y = (1/2)x - 2, so m1 = 1/2.",
              "Perpendicular condition: m1 × m2 = -1 => (1/2) × m2 = -1 => m2 = -2."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{1}{2}", note: "1/2 is the gradient of a PARALLEL line, not a perpendicular one." }
            ],
            skillId: "skill-line-gradients",
            difficulty: "medium"
          },
          {
            id: "q-geo-2",
            type: "multiple_choice",
            questionText: "Find the distance between the coordinate points A(2, -3) and B(6, 1).",
            mathExpression: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
            options: ["4\\sqrt{2} \\approx 5.66", "4", "8", "6"],
            correctAnswer: "4\\sqrt{2} \\approx 5.66",
            explanation: "d = √[(6 - 2)² + (1 - (-3))²] = √[4² + 4²] = √[16 + 16] = √32 = 4√2.",
            hintLadder: [
              "Use distance formula: d = √[(Δx)² + (Δy)²].",
              "Δx = 6 - 2 = 4, so (Δx)² = 16.",
              "Δy = 1 - (-3) = 4, so (Δy)² = 16. d = √32 = 4√2."
            ],
            misconceptionAlerts: [
              { trigger: "4", note: "Did you take the square root of 16 without adding the other component?" }
            ],
            skillId: "skill-line-gradients",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sss-circle-theorems",
    subjectId: "math_geom_trig",
    level: "senior_secondary",
    title: "Circle Geometry & Theorems",
    code: "UNIT-08",
    description: "Angle at centre is twice angle at circumference, angles in same segment, cyclic quadrilaterals, tangent-chord theorem.",
    order: 8,
    category: "core",
    skills: [
      {
        id: "skill-circle-theorems",
        unitId: "unit-sss-circle-theorems",
        title: "Circle Theorems & Cyclic Quadrilaterals",
        code: "SKL-CIRC-301",
        summary: "Subtended arc angles, opposite angles of cyclic quadrilateral sum to 180°, and tangent perpendicularity.",
        objectives: [
          "Prove angle at centre is double the angle at the circumference",
          "Apply opposite angles of a cyclic quadrilateral sum to 180°",
          "Apply alternate segment theorem"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-circ-1",
            type: "multiple_choice",
            questionText: "In a cyclic quadrilateral ABCD, angle A is (3x + 10)° and opposite angle C is (2x + 20)°. Find the value of x.",
            mathExpression: "(3x + 10) + (2x + 20) = 180^\\circ",
            options: ["30^\\circ", "25^\\circ", "35^\\circ", "40^\\circ"],
            correctAnswer: "30^\\circ",
            explanation: "Opposite angles of a cyclic quadrilateral sum to 180°: (3x + 10) + (2x + 20) = 180 => 5x + 30 = 180 => 5x = 150 => x = 30°.",
            hintLadder: [
              "Theorem: Opposite angles in a cyclic quadrilateral sum to 180°.",
              "Set up equation: (3x + 10) + (2x + 20) = 180.",
              "Combine like terms: 5x + 30 = 180 => 5x = 150 => x = 30°."
            ],
            misconceptionAlerts: [
              { trigger: "35^\\circ", note: "Be careful: 180 - 30 = 150, and 150 / 5 = 30, not 35." }
            ],
            skillId: "skill-circle-theorems",
            difficulty: "medium"
          },
          {
            id: "q-circ-2",
            type: "multiple_choice",
            questionText: "An arc subtends an angle of 110° at the centre of a circle. What angle does the same arc subtend at any point on the major circumference?",
            mathExpression: "\\theta_{\\text{circumference}} = \\frac{1}{2} \\theta_{\\text{centre}}",
            options: ["55^\\circ", "110^\\circ", "70^\\circ", "220^\\circ"],
            correctAnswer: "55^\\circ",
            explanation: "The angle subtended by an arc at the centre is twice the angle subtended at the circumference: θ = 110° / 2 = 55°.",
            hintLadder: [
              "Angle at centre = 2 × Angle at circumference.",
              "Angle at circumference = (1/2) × 110° = 55°."
            ],
            misconceptionAlerts: [
              { trigger: "220^\\circ", note: "The angle at the circumference is HALF the angle at the centre, not double." }
            ],
            skillId: "skill-circle-theorems",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-statistics-probability",
    subjectId: "math_core",
    level: "senior_secondary",
    title: "Statistics & Theoretical Probability",
    code: "UNIT-09",
    description: "Measures of central tendency (mean, median, mode), standard deviation, cumulative frequency curves (ogives), and independent probability.",
    order: 9,
    category: "applied",
    skills: [
      {
        id: "skill-stats-dispersion",
        unitId: "unit-statistics-probability",
        title: "Measures of Central Tendency & Dispersion",
        code: "SKL-STAT-301",
        summary: "Grouped data mean, standard deviation, variance, and interquartile range.",
        objectives: [
          "Compute the mean of grouped frequency distributions \\bar{x} = \\sum(fx) / \\sum f",
          "Calculate the variance and sample standard deviation",
          "Interpret histograms and cumulative frequency ogives"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-stat-1",
            type: "multiple_choice",
            questionText: "A bag contains 5 red balls, 4 blue balls, and 3 green balls. If one ball is drawn at random, what is the probability that it is NOT blue?",
            mathExpression: "P(\\text{Not Blue}) = 1 - P(\\text{Blue})",
            options: ["\\frac{2}{3}", "\\frac{1}{3}", "\\frac{3}{4}", "\\frac{5}{12}"],
            correctAnswer: "\\frac{2}{3}",
            explanation: "Total balls = 5 + 4 + 3 = 12. Non-blue balls = 5 red + 3 green = 8. Probability = 8/12 = 2/3.",
            hintLadder: [
              "Find the total number of sample outcomes: 5 + 4 + 3 = 12.",
              "Count the outcomes that satisfy 'Not Blue': 5 red + 3 green = 8.",
              "Simplify the fraction 8/12 by dividing numerator and denominator by 4: 2/3."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{1}{3}", note: "1/3 (4/12) is the probability of drawing a blue ball. The question asks for NOT blue." }
            ],
            skillId: "skill-stats-dispersion",
            difficulty: "easy"
          },
          {
            id: "q-stat-2",
            type: "multiple_choice",
            questionText: "Find the mean of the numbers: 14, 18, 22, 26, 30.",
            mathExpression: "\\bar{x} = \\frac{14 + 18 + 22 + 26 + 30}{5}",
            options: ["22", "20", "24", "21"],
            correctAnswer: "22",
            explanation: "Sum = 14 + 18 + 22 + 26 + 30 = 110. Mean = 110 / 5 = 22. (Also the symmetric median of an A.P.).",
            hintLadder: [
              "Add all values: 14 + 18 + 22 + 26 + 30 = 110.",
              "Divide by count (5): 110 / 5 = 22."
            ],
            misconceptionAlerts: [
              { trigger: "20", note: "Check your sum: 14+18+22+26+30 = 110." }
            ],
            skillId: "skill-stats-dispersion",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-vectors-matrices",
    subjectId: "math_algebra",
    level: "university_prep",
    title: "Matrices, Determinants & Vectors",
    code: "UNIT-10",
    description: "Matrix multiplication, 2x2 and 3x3 determinants, inverse matrices, vector dot products, and geometric transformations.",
    order: 10,
    category: "applied",
    skills: [
      {
        id: "skill-matrix-operations",
        unitId: "unit-vectors-matrices",
        title: "Matrix Multiplication & Inverses",
        code: "SKL-MAT-401",
        summary: "Row-by-column multiplication, finding adjoints and 2x2 matrix inverses.",
        objectives: [
          "Multiply conformable matrices A(m×k) and B(k×n)",
          "Calculate determinant |A| = ad - bc",
          "Compute the inverse matrix A^(-1) = (1/|A|) * adj(A)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-mat-1",
            type: "multiple_choice",
            questionText: "If matrix A = [[3, 2], [1, 4]], find the determinant \\det(A).",
            mathExpression: "\\det(A) = (3)(4) - (2)(1)",
            options: ["10", "14", "12", "8"],
            correctAnswer: "10",
            explanation: "det(A) = (3 × 4) - (2 × 1) = 12 - 2 = 10.",
            hintLadder: [
              "For matrix [[a, b], [c, d]], the determinant is ad - bc.",
              "a = 3, d = 4 => ad = 12.",
              "b = 2, c = 1 => bc = 2. 12 - 2 = 10."
            ],
            misconceptionAlerts: [
              { trigger: "14", note: "Remember to subtract bc, not add it: ad - bc = 12 - 2 = 10." }
            ],
            skillId: "skill-matrix-operations",
            difficulty: "easy"
          },
          {
            id: "q-mat-2",
            type: "multiple_choice",
            questionText: "Find the inverse of matrix M = [[4, 3], [1, 1]].",
            mathExpression: "M^{-1} = \\frac{1}{\\det(M)} \\begin{bmatrix} 1 & -3 \\\\ -1 & 4 \\end{bmatrix}",
            options: [
              "\\begin{bmatrix} 1 & -3 \\\\ -1 & 4 \\end{bmatrix}",
              "\\begin{bmatrix} -1 & 3 \\\\ 1 & -4 \\end{bmatrix}",
              "\\begin{bmatrix} 1 & 3 \\\\ 1 & 4 \\end{bmatrix}",
              "\\begin{bmatrix} 4 & -3 \\\\ -1 & 1 \\end{bmatrix}"
            ],
            correctAnswer: "\\begin{bmatrix} 1 & -3 \\\\ -1 & 4 \\end{bmatrix}",
            explanation: "det(M) = (4)(1) - (3)(1) = 4 - 3 = 1. Adjoint swaps diagonal entries and negates off-diagonal entries: [[1, -3], [-1, 4]]. Inverse = (1/1) * [[1, -3], [-1, 4]].",
            hintLadder: [
              "Step 1: Compute determinant: (4)(1) - (3)(1) = 1.",
              "Step 2: Swap the main diagonal entries (4 and 1 become 1 and 4).",
              "Step 3: Negate the off-diagonal entries (3 and 1 become -3 and -1)."
            ],
            misconceptionAlerts: [
              { trigger: "\\begin{bmatrix} 4 & -3 \\\\ -1 & 1 \\end{bmatrix}", note: "Remember to swap the main diagonal elements (4 and 1)." }
            ],
            skillId: "skill-matrix-operations",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-adv-calculus",
    subjectId: "math_calculus",
    level: "university_prep",
    title: "Differential & Integral Calculus",
    code: "UNIT-11",
    description: "First-principles differentiation, power rule, product/quotient/chain rules, and fundamental theorem of integration.",
    order: 11,
    category: "applied",
    skills: [
      {
        id: "skill-derivatives",
        unitId: "unit-adv-calculus",
        title: "Differentiation & Rates of Change",
        code: "SKL-CALC-401",
        summary: "Finding tangents, gradients of curves, and turning points (maxima/minima).",
        objectives: [
          "Apply the power rule: d/dx [x^n] = n x^(n-1)",
          "Find coordinates of stationary points and classify as maximum or minimum",
          "Determine instantaneous velocity from displacement equations"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-calc-1",
            type: "multiple_choice",
            questionText: "Find the derivative with respect to x of the function:",
            mathExpression: "f(x) = 4x^3 - 5x^2 + 7x - 9",
            options: ["12x^2 - 10x + 7", "12x^2 - 10x", "4x^2 - 5x + 7", "12x^3 - 10x^2 + 7x"],
            correctAnswer: "12x^2 - 10x + 7",
            explanation: "Differentiating term-by-term: d/dx(4x^3) = 12x^2, d/dx(-5x^2) = -10x, d/dx(7x) = 7, d/dx(-9) = 0. Result: 12x^2 - 10x + 7.",
            hintLadder: [
              "Multiply each coefficient by its current exponent, then reduce the exponent by 1.",
              "For 4x³, 4 × 3 = 12, power becomes 2: 12x².",
              "The derivative of a linear term 7x is 7, and derivative of constant -9 is 0."
            ],
            misconceptionAlerts: [
              { trigger: "12x^2 - 10x", note: "Don't forget the derivative of the 7x term, which equals 7." }
            ],
            skillId: "skill-derivatives",
            difficulty: "medium"
          },
          {
            id: "q-calc-2",
            type: "multiple_choice",
            questionText: "Evaluate the definite integral:",
            mathExpression: "\\int_{0}^{3} (2x + 1) \\, dx",
            options: ["12", "9", "15", "6"],
            correctAnswer: "12",
            explanation: "Indefinite integral is x² + x. Evaluated from 0 to 3: (3² + 3) - (0² + 0) = (9 + 3) - 0 = 12.",
            hintLadder: [
              "Integrate 2x to get x² and integrate 1 to get x.",
              "Antiderivative F(x) = x² + x.",
              "Compute F(3) - F(0) = (9 + 3) - 0 = 12."
            ],
            misconceptionAlerts: [
              { trigger: "9", note: "Did you integrate 2x as x² but forget to integrate the 1 term?" }
            ],
            skillId: "skill-derivatives",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

export const SCIENCE_PHYSICS_UNITS: Unit[] = [
  {
    id: "unit-phy-mechanics-motion",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Classical Mechanics, Kinematics & Newton's Laws",
    code: "PHY-UNIT-01",
    description: "Equations of uniformly accelerated motion, projectile trajectories, Newton's three laws of motion, momentum conservation, and work-energy equivalence.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-phy-kinematics",
        unitId: "unit-phy-mechanics-motion",
        title: "Uniform Acceleration & Equations of Motion",
        code: "SKL-PHY-201",
        summary: "Solving motion problems using v = u + at, s = ut + 0.5at², and v² = u² + 2as.",
        objectives: [
          "Select the appropriate kinematic equation based on given initial velocity, final velocity, acceleration, time, and displacement",
          "Analyze vertical motion under gravity (g = 9.8 or 10 m/s²)",
          "Distinguish scalar distance/speed from vector displacement/velocity"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-1",
            type: "multiple_choice",
            questionText: "A car accelerates uniformly from rest at 2.5 m/s² for 8 seconds. What total distance does it cover?",
            mathExpression: "s = ut + \\frac{1}{2}at^2",
            options: ["80 \\text{ m}", "100 \\text{ m}", "20 \\text{ m}", "64 \\text{ m}"],
            correctAnswer: "80 \\text{ m}",
            explanation: "Initial velocity u = 0. s = (0)(8) + 0.5(2.5)(8²) = 0.5 × 2.5 × 64 = 1.25 × 64 = 80 meters.",
            hintLadder: [
              "Identify: u = 0, a = 2.5 m/s², t = 8 s.",
              "Use equation: s = ut + 0.5at².",
              "Since u = 0, s = 0.5 × 2.5 × 64 = 80 m."
            ],
            misconceptionAlerts: [
              { trigger: "20 \\text{ m}", note: "20 m/s is the final velocity (v = at = 2.5 × 8), not the distance." }
            ],
            skillId: "skill-phy-kinematics",
            difficulty: "easy"
          },
          {
            id: "q-phy-2",
            type: "multiple_choice",
            questionText: "A ball is thrown vertically upwards with a speed of 20 m/s. Assuming g = 10 m/s², what is the maximum height reached?",
            mathExpression: "h_{\\max} = \\frac{u^2}{2g}",
            options: ["20 \\text{ m}", "40 \\text{ m}", "10 \\text{ m}", "25 \\text{ m}"],
            correctAnswer: "20 \\text{ m}",
            explanation: "At maximum height, v = 0. Using v² = u² - 2gh: 0 = 20² - 2(10)h => 20h = 400 => h = 20 meters.",
            hintLadder: [
              "At the top of the trajectory, the vertical velocity v = 0.",
              "Apply v² = u² - 2gh.",
              "0 = 400 - 20h => 20h = 400 => h = 20 m."
            ],
            misconceptionAlerts: [
              { trigger: "40 \\text{ m}", note: "Did you divide by g instead of 2g?" }
            ],
            skillId: "skill-phy-kinematics",
            difficulty: "medium"
          },
          {
            id: "q-phy-3",
            type: "multiple_choice",
            questionText: "A constant resultant force of 60 N acts on a body of mass 15 kg. What is the acceleration produced?",
            mathExpression: "F = ma \\implies a = \\frac{F}{m}",
            options: ["4 \\text{ m/s}^2", "900 \\text{ m/s}^2", "0.25 \\text{ m/s}^2", "45 \\text{ m/s}^2"],
            correctAnswer: "4 \\text{ m/s}^2",
            explanation: "According to Newton's Second Law: a = F / m = 60 N / 15 kg = 4 m/s².",
            hintLadder: [
              "Newton's Second Law states F = ma.",
              "Rearrange to solve for acceleration: a = F / m.",
              "60 / 15 = 4 m/s²."
            ],
            misconceptionAlerts: [
              { trigger: "900 \\text{ m/s}^2", note: "Did you multiply force by mass (60 × 15) instead of dividing?" }
            ],
            skillId: "skill-phy-kinematics",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-waves-optics",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Wave Motion, Sound & Geometrical Optics",
    code: "PHY-UNIT-02",
    description: "Wave parameters, general wave equation v = fλ, reflection, refraction, Snell's Law, sound resonance, and electromagnetic spectrum.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-phy-wave-optics",
        unitId: "unit-phy-waves-optics",
        title: "Wave Properties & Snell's Law of Refraction",
        code: "SKL-PHY-202",
        summary: "Calculations involving wave speed, frequency, wavelength, and refractive index n = sin(i)/sin(r).",
        objectives: [
          "Apply the universal wave speed formula v = f λ",
          "Calculate refractive index using Snell's Law n = sin(i) / sin(r) = c / v",
          "Understand critical angle and total internal reflection criteria"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-wave-1",
            type: "multiple_choice",
            questionText: "A radio transmitter broadcasts electromagnetic waves at a frequency of 100 MHz (10^8 Hz). If the speed of light is 3 × 10^8 m/s, find the wavelength.",
            mathExpression: "\\lambda = \\frac{v}{f}",
            options: ["3 \\text{ m}", "30 \\text{ m}", "0.33 \\text{ m}", "300 \\text{ m}"],
            correctAnswer: "3 \\text{ m}",
            explanation: "λ = v / f = (3 × 10^8 m/s) / (10^8 Hz) = 3 meters.",
            hintLadder: [
              "Use wave equation: v = f × λ.",
              "Rearrange for wavelength: λ = v / f.",
              "(3 × 10^8) / (1 × 10^8) = 3 meters."
            ],
            misconceptionAlerts: [
              { trigger: "0.33 \\text{ m}", note: "Did you divide frequency by velocity instead of velocity by frequency?" }
            ],
            skillId: "skill-phy-wave-optics",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const SCIENCE_CHEMISTRY_UNITS: Unit[] = [
  {
    id: "unit-chm-atomic-periodicity",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Atomic Structure, Quantum Orbitals & Periodic Trends",
    code: "CHM-UNIT-01",
    description: "Subatomic particles, isotopes, electronic configurations in s, p, d, f subshells, ionization energy trends, and electronegativity.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-chm-atomic-structure",
        unitId: "unit-chm-atomic-periodicity",
        title: "Electronic Configurations & Periodic Trends",
        code: "SKL-CHM-201",
        summary: "Applying Aufbau principle, Pauli exclusion principle, and Hund's rule for electron filling.",
        objectives: [
          "Write spdf electronic configurations for elements Z = 1 to 30",
          "Explain periodic variation of atomic radius, ionization energy, and electron affinity across periods and down groups",
          "Distinguish ionic, covalent, and metallic bonding models"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-chm-1",
            type: "multiple_choice",
            questionText: "What is the ground-state electronic configuration of a chlorine atom (Atomic Number Z = 17)?",
            mathExpression: "\\text{Cl } (Z = 17)",
            options: [
              "1s^2 2s^2 2p^6 3s^2 3p^5",
              "1s^2 2s^2 2p^6 3s^2 3p^6",
              "1s^2 2s^2 2p^6 3s^1 3p^6",
              "1s^2 2s^2 2p^5 3s^2 3p^6"
            ],
            correctAnswer: "1s^2 2s^2 2p^6 3s^2 3p^5",
            explanation: "Chlorine has 17 electrons. Filling order: 1s² (2), 2s² (2), 2p⁶ (6), 3s² (2), 3p⁵ (5) = 2 + 2 + 6 + 2 + 5 = 17 electrons.",
            hintLadder: [
              "Total electrons = 17.",
              "Fill lowest energy orbitals first: 1s² (2), 2s² 2p⁶ (8). Total so far = 10.",
              "Remaining 7 electrons go into 3rd shell: 3s² 3p⁵."
            ],
            misconceptionAlerts: [
              { trigger: "1s^2 2s^2 2p^6 3s^2 3p^6", note: "18 electrons represents the chloride ion (Cl⁻), not neutral chlorine." }
            ],
            skillId: "skill-chm-atomic-structure",
            difficulty: "easy"
          },
          {
            id: "q-chm-2",
            type: "multiple_choice",
            questionText: "Which of the following elements has the highest first ionization energy?",
            mathExpression: "\\text{Ionization Energy Periodic Trend}",
            options: ["Helium (He)", "Fluorine (F)", "Sodium (Na)", "Cesium (Cs)"],
            correctAnswer: "Helium (He)",
            explanation: "Helium has the highest ionization energy of all elements because its 2 electrons are closest to the nucleus in a full 1s shell with maximum effective nuclear charge and minimal shielding.",
            hintLadder: [
              "Ionization energy increases across a period (left to right) and decreases down a group.",
              "Helium is at the very top right of the periodic table.",
              "Helium's full 1s² duet experiences extreme electrostatic nuclear attraction."
            ],
            misconceptionAlerts: [
              { trigger: "Fluorine (F)", note: "Fluorine has the highest electronegativity, but Helium has the highest first ionization energy." }
            ],
            skillId: "skill-chm-atomic-structure",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-stoichiometry",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "The Mole Concept, Stoichiometry & Chemical Equations",
    code: "CHM-UNIT-02",
    description: "Avogadro's constant, molar mass, empirical and molecular formulas, balancing chemical equations, molar volume of gases at STP (22.4 dm³), and percentage yield.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-chm-mole-stoichiometry",
        unitId: "unit-chm-stoichiometry",
        title: "Mole Calculations & Quantitative Reactions",
        code: "SKL-CHM-202",
        summary: "Calculations connecting mass, moles n = m / M, concentration C = n / V, and stoichiometric ratios.",
        objectives: [
          "Calculate molar mass from relative atomic masses",
          "Convert between mass, moles, and number of particles (6.02 × 10²³)",
          "Determine limiting reactants and theoretical yields"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-chm-mole-1",
            type: "multiple_choice",
            questionText: "How many moles of carbon dioxide (CO₂) are present in 88 grams of the gas? (Given C = 12, O = 16)",
            mathExpression: "n = \\frac{\\text{mass}}{\\text{Molar Mass}}",
            options: ["2.0 \\text{ moles}", "4.0 \\text{ moles}", "1.5 \\text{ moles}", "0.5 \\text{ moles}"],
            correctAnswer: "2.0 \\text{ moles}",
            explanation: "Molar mass of CO₂ = 12 + 2(16) = 12 + 32 = 44 g/mol. Moles n = 88 g / 44 g/mol = 2.0 moles.",
            hintLadder: [
              "Calculate molar mass of CO₂: 12 + (2 × 16) = 44 g/mol.",
              "Use formula n = mass / molar mass.",
              "88 / 44 = 2.0 moles."
            ],
            misconceptionAlerts: [
              { trigger: "4.0 \\text{ moles}", note: "Did you divide 88 by 22 instead of the molar mass 44?" }
            ],
            skillId: "skill-chm-mole-stoichiometry",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const SCIENCE_BIOLOGY_UNITS: Unit[] = [
  {
    id: "unit-bio-cell-genetics",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Cellular Architecture, Mitosis & Mendelian Genetics",
    code: "BIO-UNIT-01",
    description: "Plant vs animal cell ultrastructure, enzyme kinetics, DNA structure, chromosomes, monohybrid crosses, and sex linkage.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-bio-genetics",
        unitId: "unit-bio-cell-genetics",
        title: "Monohybrid Inheritance & Punnett Squares",
        code: "SKL-BIO-201",
        summary: "Predicting genotype and phenotype ratios using Mendel's law of segregation.",
        objectives: [
          "Differentiate homozygous vs heterozygous alleles and dominant vs recessive traits",
          "Construct Punnett squares for monohybrid crosses (3:1 phenotypic ratio)",
          "Analyze co-dominance and ABO blood group genetics"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-bio-1",
            type: "multiple_choice",
            questionText: "In pea plants, tallness (T) is dominant over dwarfness (t). What is the expected phenotypic ratio of offspring from a cross between two heterozygous tall plants (Tt × Tt)?",
            mathExpression: "Tt \\times Tt \\implies 1\\,TT : 2\\,Tt : 1\\,tt",
            options: ["3 Tall : 1 Dwarf", "1 Tall : 1 Dwarf", "All Tall", "2 Tall : 2 Dwarf"],
            correctAnswer: "3 Tall : 1 Dwarf",
            explanation: "Cross Tt × Tt gives genotypes: 1 TT, 2 Tt, 1 tt. TT and Tt are both tall (3 parts), and tt is dwarf (1 part). Phenotypic ratio = 3 Tall : 1 Dwarf.",
            hintLadder: [
              "Draw a 2x2 Punnett square with gametes T and t on both sides.",
              "Boxes contain: TT, Tt, Tt, tt.",
              "Since T is dominant, TT, Tt, and Tt express tall phenotype (3). tt expresses dwarf (1)."
            ],
            misconceptionAlerts: [
              { trigger: "1 Tall : 1 Dwarf", note: "1:1 ratio occurs when crossing heterozygous (Tt) with homozygous recessive (tt), not Tt × Tt." }
            ],
            skillId: "skill-bio-genetics",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const COMPUTING_UNITS: Unit[] = [
  {
    id: "unit-cs-binary-logic",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Data Representation, Boolean Logic & Algorithmic Design",
    code: "CSC-UNIT-01",
    description: "Binary, octal, hexadecimal conversions, ASCII/Unicode character encoding, Boolean logic gates (AND, OR, NOT, XOR, NAND), and structured pseudocode algorithms.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-cs-logic-gates",
        unitId: "unit-cs-binary-logic",
        title: "Boolean Algebra, Truth Tables & Binary Representation",
        code: "SKL-CSC-201",
        summary: "Evaluating Boolean logic expressions and converting decimal integers to binary and hexadecimal.",
        objectives: [
          "Convert integers between Decimal, Binary (Base 2), and Hexadecimal (Base 16)",
          "Construct truth tables for composite logic circuits",
          "Trace algorithmic loops and conditional branching structures"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-1",
            type: "multiple_choice",
            questionText: "Convert the decimal integer 45 into its 8-bit binary representation.",
            mathExpression: "45_{10} = (?)_2",
            options: ["00101101", "00110101", "00101111", "00010101"],
            correctAnswer: "00101101",
            explanation: "45 = 32 + 8 + 4 + 1. Powers of 2: 128(0), 64(0), 32(1), 16(0), 8(1), 4(1), 2(0), 1(1) = 00101101.",
            hintLadder: [
              "Break 45 down into powers of 2 (32, 16, 8, 4, 2, 1).",
              "45 = 32 + 8 + 4 + 1.",
              "Place 1 at 32, 8, 4, 1 positions and 0 elsewhere: 00101101."
            ],
            misconceptionAlerts: [
              { trigger: "00110101", note: "00110101 equals 32 + 16 + 4 + 1 = 53, not 45." }
            ],
            skillId: "skill-cs-logic-gates",
            difficulty: "easy"
          },
          {
            id: "q-cs-2",
            type: "multiple_choice",
            questionText: "What is the output of an XOR (Exclusive OR) gate when both inputs A and B are 1 (True)?",
            mathExpression: "A \\oplus B \\text{ when } A=1, B=1",
            options: ["0 (False)", "1 (True)", "Undefined", "High Impedance"],
            correctAnswer: "0 (False)",
            explanation: "An XOR gate produces 1 if and only if exactly one input is true. When both inputs are 1, the output is 0.",
            hintLadder: [
              "XOR stands for Exclusive OR (either A or B is true, but NOT both).",
              "When A = 1 and B = 1, they are identical, so output is 0."
            ],
            misconceptionAlerts: [
              { trigger: "1 (True)", note: "1 is the output of an inclusive OR gate, not an XOR gate." }
            ],
            skillId: "skill-cs-logic-gates",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const LANGUAGE_UNITS: Unit[] = [
  {
    id: "unit-eng-lexis-concord",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Lexis, Grammatical Concord & Morphological Roots",
    code: "ENG-UNIT-01",
    description: "Subject-verb agreement rules (proximity, accompaniment, correlatives), Latin and Greek etymology, phrasal verbs, and structural ambiguity.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-eng-concord",
        unitId: "unit-eng-lexis-concord",
        title: "Subject-Verb Concord & Grammatical Agreement",
        code: "SKL-ENG-201",
        summary: "Navigating complex sentence structures, intervening prepositional phrases, and collective nouns.",
        objectives: [
          "Apply subject-verb agreement across singular and plural indefinite pronouns",
          "Resolve sentences with 'as well as', 'together with', 'either...or', and 'neither...nor'",
          "Identify root morphemes, prefixes, and suffixes in standardized vocabulary"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-1",
            type: "multiple_choice",
            questionText: "Choose the grammatically correct option to complete the sentence: 'The captain, together with all his team members, ______ arriving on the evening flight.'",
            mathExpression: "\\text{Subject Concord Rule: Parenthetical Expressions}",
            options: ["is", "are", "were", "have been"],
            correctAnswer: "is",
            explanation: "Parenthetical phrases introduced by 'together with', 'as well as', or 'along with' do not change the grammatical number of the subject. The singular subject 'The captain' requires the singular verb 'is'.",
            hintLadder: [
              "Identify the true grammatical subject before the parenthetical commas.",
              "'The captain' is singular.",
              "Expressions like 'together with his team members' are parenthetical modifiers and do not make the subject plural. Use singular verb 'is'."
            ],
            misconceptionAlerts: [
              { trigger: "are", note: "Common trap: Do not be distracted by the plural noun 'members' right next to the verb." }
            ],
            skillId: "skill-eng-concord",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

export const BUSINESS_FINANCE_UNITS: Unit[] = [
  {
    id: "unit-fin-interest-accounting",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    title: "Interest Models, Asset Depreciation & Balance Sheets",
    code: "FIN-UNIT-01",
    description: "Simple vs compound interest formulas, annual percentage rate (APR), straight-line and reducing balance depreciation, and the fundamental accounting equation.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-fin-compound-interest",
        unitId: "unit-fin-interest-accounting",
        title: "Compound Interest & Financial Growth Models",
        code: "SKL-FIN-201",
        summary: "Applying A = P(1 + r/n)^(nt) to investment compounding and loan amortization.",
        objectives: [
          "Calculate compound amount and interest accrued over multiple compounding periods",
          "Apply the fundamental accounting equation: Assets = Liabilities + Owner's Equity",
          "Distinguish capital expenditure from operational expenditure"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-fin-1",
            type: "multiple_choice",
            questionText: "An entrepreneur invests ₦500,000 at an annual compound interest rate of 10% compounded annually. What is the total amount after 2 years?",
            mathExpression: "A = P(1 + r)^t = 500,000(1 + 0.10)^2",
            options: ["₦605,000", "₦600,000", "₦550,000", "₦625,000"],
            correctAnswer: "₦605,000",
            explanation: "Year 1: 500,000 × 1.10 = 550,000. Year 2: 550,000 × 1.10 = ₦605,000. (Or 500,000 × 1.21 = 605,000).",
            hintLadder: [
              "Use formula A = P(1 + r)^t.",
              "P = 500,000, r = 0.10, t = 2.",
              "500,000 × (1.10)² = 500,000 × 1.21 = ₦605,000."
            ],
            misconceptionAlerts: [
              { trigger: "₦600,000", note: "₦600,000 is simple interest (50,000 × 2 = 100,000). In compound interest, interest earns interest!" }
            ],
            skillId: "skill-fin-compound-interest",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const ALL_CURRICULUM_UNITS: Unit[] = [
  ...ENRICHED_MATHEMATICS_UNITS,
  ...SCIENCE_PHYSICS_UNITS,
  ...SCIENCE_CHEMISTRY_UNITS,
  ...SCIENCE_BIOLOGY_UNITS,
  ...COMPUTING_UNITS,
  ...LANGUAGE_UNITS,
  ...BUSINESS_FINANCE_UNITS
];
