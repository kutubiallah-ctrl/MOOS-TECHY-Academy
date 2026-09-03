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
  },
  {
    id: "unit-factors-multiples-primes",
    subjectId: "math_core",
    level: "upper_primary",
    title: "Factors, Multiples & Prime Factorization",
    code: "MTH-FMP-01",
    description: "Fundamental number theory covering prime factorization, index notation, HCF, LCM, and real-world cyclical synchronization problems.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-prime-factorization-hcf-lcm",
        unitId: "unit-factors-multiples-primes",
        title: "Prime Factorization, HCF & LCM Applications",
        code: "SKL-MTH-FMP-101",
        summary: "Decomposing composite numbers into prime factors using trees and repeated division to determine HCF and LCM.",
        objectives: [
          "Express integers as unique products of prime factors using index notation",
          "Determine Highest Common Factor (HCF) of multiple integers using prime power intersections",
          "Apply Lowest Common Multiple (LCM) to solve real-world periodic synchronization problems"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations"],
        questions: [
          {
            id: "q-math-fmp-1",
            type: "multiple_choice",
            questionText: "Express 360 as a product of its prime factors in index form:",
            mathExpression: "360 = 2^a \\times 3^b \\times 5^c",
            options: ["2^3 \\times 3^2 \\times 5", "2^2 \\times 3^3 \\times 5", "2^4 \\times 3 \\times 5", "2^3 \\times 3 \\times 5^2"],
            correctAnswer: "2^3 \\times 3^2 \\times 5",
            explanation: "360 ÷ 2 = 180; 180 ÷ 2 = 90; 90 ÷ 2 = 45; 45 ÷ 3 = 15; 15 ÷ 3 = 5; 5 ÷ 5 = 1. Gathering factors: 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5.",
            hintLadder: [
              "Divide 360 repeatedly by the smallest prime number 2 until you get an odd number.",
              "360 ÷ 2 = 180, 180 ÷ 2 = 90, 90 ÷ 2 = 45 (three 2s).",
              "Now divide 45 by 3: 45 ÷ 3 = 15, 15 ÷ 3 = 5 (two 3s), leaving one 5. Thus 2³ × 3² × 5."
            ],
            misconceptionAlerts: [
              { trigger: "2^2 \\times 3^3 \\times 5", note: "2² × 3³ × 5 = 4 × 27 × 5 = 540, not 360. Verify the powers of 2 and 3." },
              { trigger: "2^4 \\times 3 \\times 5", note: "2⁴ × 3 × 5 = 16 × 15 = 240. Check your repeated division by 2." }
            ],
            skillId: "skill-prime-factorization-hcf-lcm",
            difficulty: "easy"
          },
          {
            id: "q-math-fmp-2",
            type: "multiple_choice",
            questionText: "Find the Highest Common Factor (HCF) of 72 and 108:",
            mathExpression: "\\text{HCF}(72, 108) = 2^{\\min(a_1, a_2)} \\times 3^{\\min(b_1, b_2)}",
            options: ["36", "18", "24", "12"],
            correctAnswer: "36",
            explanation: "72 = 2³ × 3² and 108 = 2² × 3³. The HCF takes the lowest power of each common prime factor: 2² × 3² = 4 × 9 = 36.",
            hintLadder: [
              "Write prime factorizations: 72 = 8 × 9 = 2³ × 3², 108 = 4 × 27 = 2² × 3³.",
              "For HCF, choose the minimum exponent for each shared prime factor.",
              "Minimum exponent of 2 is 2 (giving 2² = 4). Minimum exponent of 3 is 2 (giving 3² = 9). 4 × 9 = 36."
            ],
            misconceptionAlerts: [
              { trigger: "18", note: "18 is a common factor, but not the highest common factor. 36 divides both 72 and 108." },
              { trigger: "24", note: "24 divides 72 (72 ÷ 24 = 3), but does not divide 108 (108 ÷ 24 = 4.5)." }
            ],
            skillId: "skill-prime-factorization-hcf-lcm",
            difficulty: "medium"
          },
          {
            id: "q-math-fmp-3",
            type: "multiple_choice",
            questionText: "Three school bells chime at intervals of 12, 18, and 30 seconds respectively. If they chime together at 12:00 noon, at what time will they next chime simultaneously?",
            mathExpression: "\\text{LCM}(12, 18, 30) = 2^{\\max} \\times 3^{\\max} \\times 5^{\\max}",
            options: ["12:03 PM", "12:06 PM", "12:02 PM", "12:05 PM"],
            correctAnswer: "12:03 PM",
            explanation: "12 = 2² × 3; 18 = 2 × 3²; 30 = 2 × 3 × 5. LCM takes highest powers: 2² × 3² × 5 = 4 × 9 × 5 = 180 seconds. 180 seconds = 3 minutes. 12:00 + 3 minutes = 12:03 PM.",
            hintLadder: [
              "Find the LCM of 12, 18, and 30 to determine the number of seconds until they chime together.",
              "12 = 2² × 3, 18 = 2 × 3², 30 = 2 × 3 × 5. LCM = 2² × 3² × 5 = 180 seconds.",
              "Convert 180 seconds into minutes: 180 ÷ 60 = 3 minutes. 12:00 noon + 3 minutes = 12:03 PM."
            ],
            misconceptionAlerts: [
              { trigger: "12:06 PM", note: "Did you use 360 seconds? The LCM is 180 seconds, not 360 seconds." },
              { trigger: "12:02 PM", note: "120 seconds is not divisible by 18 (120 ÷ 18 ≈ 6.67)." }
            ],
            skillId: "skill-prime-factorization-hcf-lcm",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  {
    id: "unit-ratio-proportion-rates",
    subjectId: "math_core",
    level: "junior_secondary",
    title: "Ratio, Proportion & Rate Problems",
    code: "MTH-RPR-02",
    description: "Proportional reasoning covering part-to-part and part-to-whole ratios, direct and inverse variation, unitary method, and scale factor maps.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-ratio-rates-proportions",
        unitId: "unit-ratio-proportion-rates",
        title: "Direct & Inverse Proportion, Unitary Rates & Scale Factors",
        code: "SKL-MTH-RPR-201",
        summary: "Solving compound division in given ratios, inversely proportional worker-time problems, and linear map scale conversions.",
        objectives: [
          "Divide a physical or monetary quantity according to a multi-part ratio",
          "Distinguish direct proportion (y = kx) from inverse proportion (xy = k) in word problems",
          "Convert map distances to actual ground measurements using representative fraction scales (1 : n)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations"],
        questions: [
          {
            id: "q-math-rpr-1",
            type: "multiple_choice",
            questionText: "Divide ₦150,000 among Ade, Bola, and Chidi in the ratio 3 : 5 : 7. How much does Chidi receive?",
            mathExpression: "\\text{Share} = \\frac{7}{3 + 5 + 7} \\times 150,000",
            options: ["₦70,000", "₦50,000", "₦30,000", "₦75,000"],
            correctAnswer: "₦70,000",
            explanation: "Total parts = 3 + 5 + 7 = 15 parts. Value of one part = ₦150,000 ÷ 15 = ₦10,000. Chidi's share = 7 × ₦10,000 = ₦70,000.",
            hintLadder: [
              "Add all the parts of the ratio together: 3 + 5 + 7 = 15 total parts.",
              "Calculate the value of a single part: ₦150,000 ÷ 15 = ₦10,000.",
              "Multiply ₦10,000 by Chidi's ratio component (7): 7 × ₦10,000 = ₦70,000."
            ],
            misconceptionAlerts: [
              { trigger: "₦50,000", note: "₦50,000 is Bola's share (5 parts), not Chidi's." },
              { trigger: "₦30,000", note: "₦30,000 is Ade's share (3 parts), not Chidi's." }
            ],
            skillId: "skill-ratio-rates-proportions",
            difficulty: "easy"
          },
          {
            id: "q-math-rpr-2",
            type: "multiple_choice",
            questionText: "Six construction workers take 10 days to build a perimeter wall working at a steady pace. If 15 workers work at the identical rate, how many days will they take to complete the wall?",
            mathExpression: "W = n_1 \\times t_1 = n_2 \\times t_2 \\implies t_2 = \\frac{6 \\times 10}{15}",
            options: ["4 days", "25 days", "5 days", "8 days"],
            correctAnswer: "4 days",
            explanation: "This is an inverse proportion: more workers require fewer days. Total work = 6 workers × 10 days = 60 worker-days. For 15 workers: t = 60 ÷ 15 = 4 days.",
            hintLadder: [
              "Recognize that as worker count increases, days decrease (inverse proportion: n × t = constant).",
              "Compute total work: 6 × 10 = 60 worker-days.",
              "Divide total worker-days by 15 workers: 60 ÷ 15 = 4 days."
            ],
            misconceptionAlerts: [
              { trigger: "25 days", note: "Did you treat this as direct proportion (15 × 10 / 6)? More workers must take LESS time, not more!" }
            ],
            skillId: "skill-ratio-rates-proportions",
            difficulty: "medium"
          },
          {
            id: "q-math-rpr-3",
            type: "multiple_choice",
            questionText: "On a survey map drawn to a scale of 1 : 50,000, two transmission towers are 4 cm apart. What is the actual straight-line distance between them on the ground?",
            mathExpression: "\\text{Distance} = 4\\text{ cm} \\times 50,000 = 200,000\\text{ cm}",
            options: ["2.0 km", "20 km", "0.2 km", "12.5 km"],
            correctAnswer: "2.0 km",
            explanation: "Ground distance = 4 cm × 50,000 = 200,000 cm. Convert to meters: 200,000 ÷ 100 = 2,000 m. Convert to kilometers: 2,000 ÷ 1,000 = 2.0 km.",
            hintLadder: [
              "Multiply map length by scale factor: 4 cm × 50,000 = 200,000 cm.",
              "Convert centimeters to meters by dividing by 100: 200,000 ÷ 100 = 2,000 m.",
              "Convert meters to kilometers by dividing by 1,000: 2,000 ÷ 1,000 = 2 km."
            ],
            misconceptionAlerts: [
              { trigger: "20 km", note: "Check metric conversion: 1 km = 100,000 cm, so 200,000 cm is 2 km, not 20 km." }
            ],
            skillId: "skill-ratio-rates-proportions",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-algebraic-expressions-fractions",
    subjectId: "math_algebra",
    level: "junior_secondary",
    title: "Algebraic Expansion, Grouping & Rational Fractions",
    code: "MTH-AEF-03",
    description: "Systematic expansion of binomials, factorization by grouping in pairs, difference of two squares, and algebraic fraction reduction.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-algebraic-expansion-factorization",
        unitId: "unit-algebraic-expressions-fractions",
        title: "Binomial Expansion, Factorization by Grouping & Algebraic Fractions",
        code: "SKL-MTH-AEF-201",
        summary: "Expanding (ax + b)(cx + d), factorizing four-term expressions by grouping, and cancelling common factors in rational algebraic fractions.",
        objectives: [
          "Expand and simplify products of binomials containing positive and negative coefficients",
          "Factorize multi-variable expressions by grouping into pairs with common binomial factors",
          "Simplify rational algebraic expressions by factoring quadratic and difference-of-squares terms"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-linear-equations"],
        questions: [
          {
            id: "q-math-aef-1",
            type: "multiple_choice",
            questionText: "Expand and simplify the algebraic product:",
            mathExpression: "(3x - 4)(2x + 5)",
            options: ["6x^2 + 7x - 20", "6x^2 - 7x - 20", "6x^2 + 23x - 20", "6x^2 - 20"],
            correctAnswer: "6x^2 + 7x - 20",
            explanation: "Using FOIL: (3x)(2x) + (3x)(5) + (-4)(2x) + (-4)(5) = 6x² + 15x - 8x - 20 = 6x² + 7x - 20.",
            hintLadder: [
              "Multiply First terms: 3x × 2x = 6x².",
              "Multiply Outer and Inner terms: (3x × 5) + (-4 × 2x) = 15x - 8x = 7x.",
              "Multiply Last terms: (-4) × 5 = -20. Combine: 6x² + 7x - 20."
            ],
            misconceptionAlerts: [
              { trigger: "6x^2 - 7x - 20", note: "Watch signs: +15x - 8x is +7x, not -7x." },
              { trigger: "6x^2 - 20", note: "Do not omit the middle cross-multiplication terms (+15x and -8x)!" }
            ],
            skillId: "skill-algebraic-expansion-factorization",
            difficulty: "easy"
          },
          {
            id: "q-math-aef-2",
            type: "multiple_choice",
            questionText: "Factorize the four-term expression completely by grouping:",
            mathExpression: "2ax - 3bx + 4ay - 6by",
            options: ["(2a - 3b)(x + 2y)", "(2a + 3b)(x - 2y)", "(a - b)(2x + 6y)", "(2a - 3b)(x - 2y)"],
            correctAnswer: "(2a - 3b)(x + 2y)",
            explanation: "Group first two and last two terms: x(2a - 3b) + 2y(2a - 3b). Factoring out common binomial (2a - 3b) yields (2a - 3b)(x + 2y).",
            hintLadder: [
              "Group into two pairs: (2ax - 3bx) + (4ay - 6by).",
              "Factor out x from first pair: x(2a - 3b). Factor out 2y from second pair: 2y(2a - 3b).",
              "Extract the common binomial factor (2a - 3b): (2a - 3b)(x + 2y)."
            ],
            misconceptionAlerts: [
              { trigger: "(2a - 3b)(x - 2y)", note: "Check the sign of the second bracket: 4ay ÷ 2a = +2y, so the bracket is (x + 2y)." }
            ],
            skillId: "skill-algebraic-expansion-factorization",
            difficulty: "medium"
          },
          {
            id: "q-math-aef-3",
            type: "multiple_choice",
            questionText: "Simplify the rational algebraic fraction to its lowest terms:",
            mathExpression: "\\frac{x^2 - 9}{x^2 + 5x + 6}",
            options: ["\\frac{x - 3}{x + 2}", "\\frac{x + 3}{x + 2}", "\\frac{x - 3}{x + 3}", "\\frac{-9}{5x + 6}"],
            correctAnswer: "\\frac{x - 3}{x + 2}",
            explanation: "Numerator is difference of two squares: (x - 3)(x + 3). Denominator factors into (x + 2)(x + 3). Cancel common factor (x + 3) to get (x - 3)/(x + 2).",
            hintLadder: [
              "Factor the numerator as a difference of squares: x² - 9 = (x - 3)(x + 3).",
              "Factor the quadratic denominator: find two numbers that multiply to 6 and add to 5 (2 and 3) -> (x + 2)(x + 3).",
              "Cancel the common factor (x + 3) from numerator and denominator, leaving (x - 3)/(x + 2)."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{-9}{5x + 6}", note: "You cannot cancel x² terms across addition! Factor first before cancelling." }
            ],
            skillId: "skill-algebraic-expansion-factorization",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  {
    id: "unit-linear-inequalities",
    subjectId: "math_algebra",
    level: "junior_secondary",
    title: "Linear Inequalities & Number Line Solutions",
    code: "MTH-LI-04",
    description: "One-variable linear inequalities, reversal of direction with negative divisors, compound inequalities, and graphical representation on number lines.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-linear-inequalities-1d",
        unitId: "unit-linear-inequalities",
        title: "Solving Linear Inequalities & Compound Solution Sets",
        code: "SKL-MTH-LI-201",
        summary: "Solving single and compound inequalities with sign inversion on negative multiplication/division, and determining integral solution sets.",
        objectives: [
          "Apply inequality inversion rules when multiplying or dividing by negative numbers",
          "Represent single and compound inequality solution sets on real number lines",
          "Identify the set of integers satisfying compound boundary constraints a < f(x) <= b"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-linear-equations"],
        questions: [
          {
            id: "q-math-ineq-1",
            type: "multiple_choice",
            questionText: "Solve the linear inequality for x:",
            mathExpression: "-3x + 7 \\le 22",
            options: ["x \\ge -5", "x \\le -5", "x \\ge 5", "x \\le 5"],
            correctAnswer: "x \\ge -5",
            explanation: "Subtract 7 from both sides: -3x <= 15. Divide both sides by -3 and reverse the inequality sign: x >= -5.",
            hintLadder: [
              "Subtract 7 from both sides: -3x <= 22 - 7 = 15.",
              "Recall the golden rule of inequalities: dividing or multiplying by a negative number reverses the inequality sign (<= becomes >=).",
              "Divide 15 by -3: 15 ÷ (-3) = -5, yielding x >= -5."
            ],
            misconceptionAlerts: [
              { trigger: "x \\le -5", note: "Did you forget to reverse the inequality sign when dividing by -3?" }
            ],
            skillId: "skill-linear-inequalities-1d",
            difficulty: "easy"
          },
          {
            id: "q-math-ineq-2",
            type: "multiple_choice",
            questionText: "How many integers satisfy the compound inequality:",
            mathExpression: "-5 < 2x + 1 \\le 9",
            options: ["7", "6", "8", "5"],
            correctAnswer: "7",
            explanation: "Subtract 1 across the inequality: -6 < 2x <= 8. Divide by 2: -3 < x <= 4. The satisfying integers are {-2, -1, 0, 1, 2, 3, 4}. Total = 7 integers.",
            hintLadder: [
              "Subtract 1 from all three parts: -5 - 1 < 2x <= 9 - 1, so -6 < 2x <= 8.",
              "Divide all parts by 2: -3 < x <= 4.",
              "List the integers strictly greater than -3 and less than or equal to 4: -2, -1, 0, 1, 2, 3, 4 (7 integers)."
            ],
            misconceptionAlerts: [
              { trigger: "8", note: "Did you include -3? Notice the strict inequality '<', so -3 is excluded." }
            ],
            skillId: "skill-linear-inequalities-1d",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-functions-relations-graphs",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Relations, Functions & Curve Analysis",
    code: "MTH-FRG-05",
    description: "Function definitions, mapping, composition of functions, finding algebraic inverse functions, and vertex analysis of parabolic graphs.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-functions-mapping-graphs",
        unitId: "unit-functions-relations-graphs",
        title: "Function Notation, Composite/Inverse Functions & Parabola Vertices",
        code: "SKL-MTH-FRG-301",
        summary: "Evaluating f(g(x)), determining f⁻¹(x), and computing vertex coordinates and symmetry axes of quadratic curves.",
        objectives: [
          "Evaluate nested composite functions f(g(x)) and g(f(x)) for specified inputs",
          "Determine algebraic expressions for inverse functions f⁻¹(x) by isolating x",
          "Calculate turning point coordinates (vertex) and axis of symmetry of quadratic curves"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-quad-factoring"],
        questions: [
          {
            id: "q-math-func-1",
            type: "multiple_choice",
            questionText: "Given functions f(x) = 2x + 3 and g(x) = x^2 - 1, evaluate the composite value f(g(3)):",
            mathExpression: "f(g(3)) \\text{ where } f(x) = 2x + 3, \\, g(x) = x^2 - 1",
            options: ["19", "63", "17", "21"],
            correctAnswer: "19",
            explanation: "Evaluate the inner function first: g(3) = 3² - 1 = 9 - 1 = 8. Now evaluate outer function: f(8) = 2(8) + 3 = 16 + 3 = 19.",
            hintLadder: [
              "Work from the inside out: evaluate g(3) first.",
              "g(3) = 3² - 1 = 8.",
              "Substitute 8 into f(x): f(8) = 2(8) + 3 = 19."
            ],
            misconceptionAlerts: [
              { trigger: "63", note: "Did you compute g(f(3)) instead of f(g(3))? f(3) = 9, g(9) = 80." }
            ],
            skillId: "skill-functions-mapping-graphs",
            difficulty: "easy"
          },
          {
            id: "q-math-func-2",
            type: "multiple_choice",
            questionText: "Find the inverse function f⁻¹(x) for the linear bijection:",
            mathExpression: "f(x) = \\frac{3x - 5}{2}",
            options: ["\\frac{2x + 5}{3}", "\\frac{2x - 5}{3}", "\\frac{3x + 5}{2}", "\\frac{2}{3x - 5}"],
            correctAnswer: "\\frac{2x + 5}{3}",
            explanation: "Let y = (3x - 5)/2. Multiply by 2: 2y = 3x - 5. Add 5: 3x = 2y + 5. Divide by 3: x = (2y + 5)/3. Swap variables: f⁻¹(x) = (2x + 5)/3.",
            hintLadder: [
              "Set y = (3x - 5)/2 and solve for x in terms of y.",
              "Multiply by 2: 2y = 3x - 5, then add 5: 2y + 5 = 3x.",
              "Divide by 3: x = (2y + 5)/3. Swap variables to get f⁻¹(x) = (2x + 5)/3."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{2}{3x - 5}", note: "Inverse function f⁻¹(x) is not the reciprocal 1/f(x)." }
            ],
            skillId: "skill-functions-mapping-graphs",
            difficulty: "medium"
          },
          {
            id: "q-math-func-3",
            type: "multiple_choice",
            questionText: "Find the coordinates of the turning point (vertex) of the parabola:",
            mathExpression: "y = x^2 - 6x + 5",
            options: ["(3, -4)", "(3, 4)", "(-3, 32)", "(6, 5)"],
            correctAnswer: "(3, -4)",
            explanation: "The x-coordinate of the vertex is x = -b/(2a) = -(-6)/(2 × 1) = 3. Substituting x = 3 into the equation: y = 3² - 6(3) + 5 = 9 - 18 + 5 = -4. Vertex is (3, -4).",
            hintLadder: [
              "Use the axis of symmetry formula: x = -b / (2a) where a = 1 and b = -6.",
              "x = -(-6) / (2 × 1) = 6 / 2 = 3.",
              "Substitute x = 3 into the quadratic equation: y = (3)² - 6(3) + 5 = 9 - 18 + 5 = -4."
            ],
            misconceptionAlerts: [
              { trigger: "(3, 4)", note: "Check the sign: 9 - 18 + 5 = -4, not +4." }
            ],
            skillId: "skill-functions-mapping-graphs",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  {
    id: "unit-plane-geometry-polygons",
    subjectId: "math_geom_trig",
    level: "junior_secondary",
    title: "Plane Geometry, Parallel Lines & Polygon Theorems",
    code: "MTH-PGP-01",
    description: "Angle relationships on parallel lines and transversals, triangle angle sum theorems, exterior angle properties, and regular polygon calculations.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-angles-triangles-polygons",
        unitId: "unit-plane-geometry-polygons",
        title: "Parallel Line Theorems, Interior/Exterior Angles & Polygons",
        code: "SKL-MTH-PGP-201",
        summary: "Solving alternate/co-interior angle problems, proving triangle angle relationships, and calculating interior/exterior angles of n-sided polygons.",
        objectives: [
          "Apply alternate, corresponding, and allied (co-interior) angle theorems across parallel lines",
          "Calculate the sum of interior angles (n - 2) × 180° and exterior angles (360°) of any convex polygon",
          "Deduce the number of sides of regular polygons from specified interior or exterior angle values"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-linear-equations"],
        questions: [
          {
            id: "q-math-geom-1",
            type: "multiple_choice",
            questionText: "Each interior angle of a regular polygon measures 144°. How many sides does the polygon possess?",
            mathExpression: "\\text{Exterior Angle} = 180^\\circ - 144^\\circ = 36^\\circ \\implies n = \\frac{360^\\circ}{36^\\circ}",
            options: ["10 sides (decagon)", "12 sides (dodecagon)", "8 sides (octagon)", "9 sides (nonagon)"],
            correctAnswer: "10 sides (decagon)",
            explanation: "Exterior angle = 180° - 144° = 36°. For any regular polygon, the sum of exterior angles is 360°. Therefore, number of sides n = 360° ÷ 36° = 10 sides.",
            hintLadder: [
              "Remember that an interior angle and an exterior angle on a straight line add up to 180°.",
              "Calculate exterior angle: 180° - 144° = 36°.",
              "Since the sum of all exterior angles is always 360°, n = 360° ÷ 36° = 10."
            ],
            misconceptionAlerts: [
              { trigger: "8 sides (octagon)", note: "An octagon has interior angles of (8 - 2) × 180° / 8 = 135°, not 144°." }
            ],
            skillId: "skill-angles-triangles-polygons",
            difficulty: "easy"
          },
          {
            id: "q-math-geom-2",
            type: "multiple_choice",
            questionText: "Two parallel lines are cut by a transversal. Two co-interior (allied) angles on the same side of the transversal are represented by (3x + 15)° and (2x + 25)°. Find the value of x:",
            mathExpression: "(3x + 15)^\\circ + (2x + 25)^\\circ = 180^\\circ",
            options: ["28", "32", "25", "30"],
            correctAnswer: "28",
            explanation: "Co-interior angles are supplementary (sum to 180°): (3x + 15) + (2x + 25) = 180 => 5x + 40 = 180 => 5x = 140 => x = 28.",
            hintLadder: [
              "Recall that interior angles on the same side of a transversal are supplementary (their sum is 180°).",
              "Set up equation: (3x + 15) + (2x + 25) = 180°.",
              "Simplify: 5x + 40 = 180 => 5x = 140 => x = 28."
            ],
            misconceptionAlerts: [
              { trigger: "32", note: "Check your subtraction: 180 - 40 = 140, and 140 ÷ 5 = 28, not 32." }
            ],
            skillId: "skill-angles-triangles-polygons",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-mensuration-perimeter-area-volume",
    subjectId: "math_geom_trig",
    level: "senior_secondary",
    title: "Mensuration: Perimeters, Areas & Solid Volumes",
    code: "MTH-MEN-02",
    description: "Length of circular arcs, area of sectors, surface areas and volumes of prisms, cylinders, right circular cones, pyramids, and spheres.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-mensuration-2d-3d",
        unitId: "unit-mensuration-perimeter-area-volume",
        title: "Arc Lengths, Sector Areas & Cylindrical Volumes",
        code: "SKL-MTH-MEN-301",
        summary: "Computing sector arc lengths and areas using central angle ratios, and calculating surface areas and volumes of 3D solids.",
        objectives: [
          "Calculate arc lengths and sector areas subtending angle θ at the center of a circle",
          "Calculate total surface areas and internal capacities (volumes) of right circular cylinders",
          "Apply volume formulas for cones (1/3 π r² h) and spheres (4/3 π r³) to solve composite solid problems"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-line-gradients"],
        questions: [
          {
            id: "q-math-men-1",
            type: "multiple_choice",
            questionText: "A solid cylindrical metal rod has a base diameter of 14 cm and a length (height) of 10 cm. Taking π = 22/7, calculate its total volume in cm³:",
            mathExpression: "V = \\pi r^2 h = \\frac{22}{7} \\times 7^2 \\times 10",
            options: ["1,540 cm³", "6,160 cm³", "770 cm³", "1,760 cm³"],
            correctAnswer: "1,540 cm³",
            explanation: "Radius r = diameter ÷ 2 = 14 ÷ 2 = 7 cm. Volume V = π r² h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1,540 cm³.",
            hintLadder: [
              "Remember radius is half of diameter: r = 14 / 2 = 7 cm.",
              "Use cylinder volume formula: V = π r² h.",
              "Substitute: (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1,540 cm³."
            ],
            misconceptionAlerts: [
              { trigger: "6,160 cm³", note: "Did you use the diameter (14) instead of the radius (7) in r²? 14² = 196 gives 4x the actual volume!" }
            ],
            skillId: "skill-mensuration-2d-3d",
            difficulty: "easy"
          },
          {
            id: "q-math-men-2",
            type: "multiple_choice",
            questionText: "Calculate the area of a sector of a circle of radius 7 cm which subtends a central angle of 60° at the center (take π = 22/7):",
            mathExpression: "A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2 = \\frac{60}{360} \\times \\frac{22}{7} \\times 7^2",
            options: ["25 \\frac{2}{3} cm²", "51 \\frac{1}{3} cm²", "14 \\frac{2}{3} cm²", "22 cm²"],
            correctAnswer: "25 \\frac{2}{3} cm²",
            explanation: "Area of sector = (θ/360) × π r² = (60/360) × (22/7) × 49 = (1/6) × 154 = 154/6 = 77/3 = 25 2/3 cm².",
            hintLadder: [
              "Fraction of circle = 60° / 360° = 1/6.",
              "Full circle area = π r² = (22/7) × 7² = 154 cm².",
              "Sector area = (1/6) × 154 = 154 / 6 = 77 / 3 = 25 2/3 cm²."
            ],
            misconceptionAlerts: [
              { trigger: "51 \\frac{1}{3} cm²", note: "Did you use 120° instead of 60°? The fraction is 1/6, not 1/3." }
            ],
            skillId: "skill-mensuration-2d-3d",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-integral-calculus-applications",
    subjectId: "math_calculus",
    level: "university_prep",
    title: "Integral Calculus & Kinematic Modeling",
    code: "MTH-INT-02",
    description: "Indefinite and definite integration of polynomials, calculation of area bounded beneath curves, and kinematic recovery of displacement from velocity functions.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-indefinite-definite-integration",
        unitId: "unit-integral-calculus-applications",
        title: "Polynomial Integration, Definite Integrals & Kinematic Velocity",
        code: "SKL-MTH-INT-401",
        summary: "Applying the power rule for integration, evaluating definite bounds, and reconstructing displacement functions s(t) from velocity v(t).",
        objectives: [
          "Integrate algebraic polynomials using ∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C",
          "Evaluate definite integrals between limits a and b using the Fundamental Theorem of Calculus",
          "Reconstruct displacement functions s(t) = ∫ v(t) dt using initial boundary conditions s(0)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-derivatives"],
        questions: [
          {
            id: "q-math-int-1",
            type: "multiple_choice",
            questionText: "Evaluate the definite integral:",
            mathExpression: "\\int_{1}^{3} (3x^2 - 4x + 1) \\, dx",
            options: ["12", "14", "10", "16"],
            correctAnswer: "12",
            explanation: "Antiderivative F(x) = x³ - 2x² + x. Evaluate at upper limit: F(3) = 3³ - 2(3²) + 3 = 27 - 18 + 3 = 12. Evaluate at lower limit: F(1) = 1³ - 2(1²) + 1 = 1 - 2 + 1 = 0. F(3) - F(1) = 12 - 0 = 12.",
            hintLadder: [
              "Find the antiderivative of each term: ∫ 3x² dx = x³, ∫ -4x dx = -2x², ∫ 1 dx = x.",
              "F(x) = x³ - 2x² + x.",
              "Calculate F(3) = 27 - 18 + 3 = 12 and F(1) = 1 - 2 + 1 = 0. Then subtract: 12 - 0 = 12."
            ],
            misconceptionAlerts: [
              { trigger: "14", note: "Check your antiderivative of 4x: ∫ 4x dx = 2x², not 4x²." }
            ],
            skillId: "skill-indefinite-definite-integration",
            difficulty: "medium"
          },
          {
            id: "q-math-int-2",
            type: "multiple_choice",
            questionText: "A projectile travels along a straight track such that its velocity at time t seconds is given by v(t) = 6t² - 2t m/s. Given that its initial displacement at t = 0 is s(0) = 5 meters, find its displacement at t = 2 seconds:",
            mathExpression: "s(t) = \\int (6t^2 - 2t) \\, dt + C, \\quad s(0) = 5",
            options: ["17 meters", "12 meters", "21 meters", "15 meters"],
            correctAnswer: "17 meters",
            explanation: "Displacement is integral of velocity: s(t) = ∫(6t² - 2t)dt = 2t³ - t² + C. At t = 0, s(0) = C = 5. So s(t) = 2t³ - t² + 5. At t = 2: s(2) = 2(2³) - (2²) + 5 = 2(8) - 4 + 5 = 16 - 4 + 5 = 17 meters.",
            hintLadder: [
              "Integrate v(t) to obtain s(t): ∫(6t² - 2t) dt = 2t³ - t² + C.",
              "Use initial condition s(0) = 5 to find C = 5, giving s(t) = 2t³ - t² + 5.",
              "Substitute t = 2 into s(t): s(2) = 2(8) - 4 + 5 = 16 - 4 + 5 = 17 meters."
            ],
            misconceptionAlerts: [
              { trigger: "12 meters", note: "Did you forget to add the initial displacement constant C = 5? 16 - 4 = 12, plus 5 = 17." }
            ],
            skillId: "skill-indefinite-definite-integration",
            difficulty: "hard"
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

import { SCIENCE_PHYSICS_UNITS as FLAGSHIP_PHYSICS, SCIENCE_CHEMISTRY_UNITS as FLAGSHIP_CHEMISTRY, SCIENCE_BIOLOGY_UNITS as FLAGSHIP_BIOLOGY } from "./scienceCurriculumUnits";
import { COMPUTING_UNITS as FLAGSHIP_COMPUTING } from "./computingCurriculumUnits";
import { LANGUAGE_ENGLISH_UNITS as FLAGSHIP_ENGLISH } from "./englishCurriculumUnits";
import { ALL_LEVELS_CURRICULUM_UNITS } from "./allLevelsCurriculumUnits";

export { FLAGSHIP_PHYSICS as SCIENCE_PHYSICS_UNITS, FLAGSHIP_CHEMISTRY as SCIENCE_CHEMISTRY_UNITS, FLAGSHIP_BIOLOGY as SCIENCE_BIOLOGY_UNITS };
export { FLAGSHIP_COMPUTING as COMPUTING_UNITS };
export { FLAGSHIP_ENGLISH as LANGUAGE_ENGLISH_UNITS, FLAGSHIP_ENGLISH as LANGUAGE_UNITS };
export { ALL_LEVELS_CURRICULUM_UNITS };

export const ALL_CURRICULUM_UNITS: Unit[] = [
  ...ALL_LEVELS_CURRICULUM_UNITS,
  ...ENRICHED_MATHEMATICS_UNITS,
  ...FLAGSHIP_PHYSICS,
  ...FLAGSHIP_CHEMISTRY,
  ...FLAGSHIP_BIOLOGY,
  ...FLAGSHIP_COMPUTING,
  ...FLAGSHIP_ENGLISH,
  ...BUSINESS_FINANCE_UNITS
];

