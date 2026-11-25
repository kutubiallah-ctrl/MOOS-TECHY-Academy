import { Unit } from "../types/curriculum";

export const P1_MATH_EXPANSION_UNITS: Unit[] = [
  {
    id: "unit-p1-pri-number-patterns",
    subjectId: "pri_152_number_patterns_sequences_mathematic",
    level: "upper_primary",
    title: "Number Patterns, Sequences & Function Relationships",
    code: "PRI-PAT-152",
    description:
      "Recognizing arithmetic step rules, square and triangular figurate sequences, multiplicative geometric doublings, and input-output rule tables.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-MTH-PAT-01",
      "COMMON_ENTRANCE:QR-PAT-102",
      "CAMBRIDGE_IGCSE:PRI-NUM-SEQ"
    ],
    skills: [
      {
        id: "skill-pri-number-patterns-rules",
        unitId: "unit-p1-pri-number-patterns",
        title: "Sequence Rule Discovery & Input-Output Machines",
        code: "SKL-PRI-PAT-152",
        summary:
          "Deduce constant-difference, second-difference (square/triangular), and multiplicative rules from ordered number sets.",
        objectives: [
          "Compute consecutive first differences to identify linear arithmetic number patterns",
          "Recognize figurate square (n^2) and triangular (n(n+1)/2) growth patterns",
          "Derive two-step input-output function machine rules of the form y = ax + b"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations"],
        lesson: {
          id: "les-pri-number-patterns-rules",
          title: "Number Patterns, Sequences & Rule Machines",
          hookAndIntuition:
            "Every mathematical sequence is a secret staircase. If each step rises by the exact same height, you have a constant-difference staircase; if each rise grows steadily by +1 or +2, you have discovered a figurate curve like squares or triangles.",
          conceptualExplanation:
            "A sequence is an ordered list of terms T_1, T_2, T_3, ... governed by a deterministic rule. To crack an unfamiliar sequence systematically, always calculate first differences d_k = T_{k+1} - T_k. When every first difference is identical (e.g., +7), the sequence is arithmetic and its nth term equals T_1 + (n - 1)d. When first differences grow evenly (such as +2, +3, +4 for triangular numbers 1, 3, 6, 10, 15, or +3, +5, +7, +9 for square numbers 1, 4, 9, 16, 25), examine the second difference. If consecutive ratios T_{k+1}/T_k are constant (e.g., x3), the sequence is geometric. Function tables follow the same discipline: compare output changes per unit input change to isolate the multiplier before finding the additive offset.",
          conceptualModel:
            "First-Difference Table -> Constant (+d) => Linear Rule; Growing Evenly (+1/+2) => Figurate (Triangular/Square); Constant Ratio (x r) => Geometric Growth.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "First Difference (d_k = T_{k+1} - T_k)",
              definition: "The change between one term and its immediate successor.",
              practicalExample: "In 5, 11, 17, 23, every first difference is +6, so the next term is 23 + 6 = 29."
            },
            {
              termOrSymbol: "Triangular Numbers: T_n = n(n + 1)/2",
              definition: "Counts dots forming equilateral triangles: 1, 3, 6, 10, 15, 21, ...",
              practicalExample: "6th triangular number = 6 x 7 / 2 = 21."
            },
            {
              termOrSymbol: "Function Machine: Output = a(Input) + b",
              definition: "A two-operation algebraic rule linking each input x to a unique output y.",
              practicalExample: "If rule is 3x - 2, then input x = 7 yields output 3(7) - 2 = 19."
            }
          ],
          workedExamples: [
            {
              title: "Cracking a Growing-Difference Figurate Sequence",
              problemStatement: "Find the 6th and 7th terms of the number pattern: 2, 5, 10, 17, 26, ...",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute the consecutive first differences between adjacent terms.",
                  reasoning: "5 - 2 = 3; 10 - 5 = 5; 17 - 10 = 7; 26 - 17 = 9."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute the second differences from the first-difference row.",
                  reasoning: "5 - 3 = 2; 7 - 5 = 2; 9 - 7 = 2. Each step increases by an extra +2."
                },
                {
                  stepNumber: 3,
                  instruction: "Extend the difference pattern to obtain the 6th term.",
                  reasoning: "The next odd increment is 9 + 2 = 11, so T_6 = 26 + 11 = 37."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify via the closed formula T_n = n^2 + 1 and compute T_7.",
                  reasoning: "T_6 = 6^2 + 1 = 37 (verified). Next increment is 13, giving T_7 = 37 + 13 = 50 = 7^2 + 1."
                }
              ],
              takeawayRule: "When first differences increase by +2 each step, compare the sequence directly against the square numbers n^2."
            },
            {
              title: "Decoding a Two-Step Input-Output Table",
              problemStatement: "A machine maps (1 -> 5), (2 -> 9), (3 -> 13), (4 -> 17). Find the rule and output for input 12.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Check how much the output increases when the input increases by 1.",
                  reasoning: "9 - 5 = 4, 13 - 9 = 4, 17 - 13 = 4. Therefore the input multiplier is 4."
                },
                {
                  stepNumber: 2,
                  instruction: "Compare 4 x Input against the actual output to determine the offset.",
                  reasoning: "At Input = 1, 4(1) = 4, whereas Output = 5, so offset b = 5 - 4 = +1."
                },
                {
                  stepNumber: 3,
                  instruction: "Verify the candidate rule Output = 4(Input) + 1 across all given pairs.",
                  reasoning: "4(2)+1 = 9, 4(3)+1 = 13, 4(4)+1 = 17. Every ordered pair matches exactly."
                },
                {
                  stepNumber: 4,
                  instruction: "Evaluate the rule at Input = 12.",
                  reasoning: "Output = 4(12) + 1 = 48 + 1 = 49."
                }
              ],
              takeawayRule: "Output jump per +1 input change gives the multiplier; substituting Input = 1 immediately reveals the constant offset."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming every sequence has a constant additive step after checking only the first two numbers.",
              whyItIsWrong: "A single difference 5 - 2 = 3 could belong to +3 arithmetic, x2.5 geometric, or n^2 + 1 quadratic growth.",
              correctCorrection: "Always test at least three consecutive differences or ratios before predicting subsequent terms."
            },
            {
              misconception: "Applying the additive offset before the multiplier in a two-step rule like 3x + 2.",
              whyItIsWrong: "Calculating 3(x + 2) gives 3x + 6 instead of 3x + 2, shifting every output upward by 4.",
              correctCorrection: "Multiply the input by the coefficient first, then add or subtract the constant offset."
            }
          ],
          guidedPracticePrompt: "Find the next two terms in 4, 7, 12, 19, 28, ... and express the nth term using n^2.",
          independentPracticePrompt: "Construct an input-output table for inputs 1 to 5 following y = 5x - 3 and check its first differences.",
          extensionActivity: "Show geometrically using dot arrays why the sum of any two consecutive triangular numbers equals a perfect square.",
          diagnosticSelfCheck: "Can you distinguish whether 3, 6, 12, 24, ... is arithmetic or geometric within 5 seconds?",
          transferApplication: "Model a savings box starting with ₦500 that adds ₦350 weekly and predict the balance in Week 10.",
          masteryAssessment: "Compute the 10th term of a pattern whose first differences are 4, 6, 8, 10 starting from T_1 = 3.",
          summaryRecap: "Examine first differences, second differences, and ratios systematically to uncover linear, figurate, and function-machine rules.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p1-pat-1",
            type: "multiple_choice",
            questionText: "What is the next term in the constant-difference sequence: 14, 23, 32, 41, ...?",
            options: ["50", "49", "51", "48"],
            correctAnswer: "50",
            explanation: "First differences are 23 - 14 = 9, 32 - 23 = 9, 41 - 32 = 9. Adding 9 to 41 gives 50.",
            hintLadder: [
              "Subtract consecutive pairs: 23 - 14 and 32 - 23.",
              "Each step adds a constant difference of +9.",
              "Compute 41 + 9."
            ],
            misconceptionAlerts: [
              { trigger: "49", note: "Adding 8 instead of 9 undercounts the step size." }
            ],
            skillId: "skill-pri-number-patterns-rules",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-pat-2",
            type: "multiple_choice",
            questionText: "Which rule maps every input x to its output y in the pairs (2, 7), (3, 10), (4, 13), (5, 16)?",
            options: ["y = 3x + 1", "y = 2x + 3", "y = 3x - 1", "y = 4x - 1"],
            correctAnswer: "y = 3x + 1",
            explanation: "As x rises by 1, y rises by 3 (10 - 7 = 3). At x = 2, 3(2) = 6, so adding +1 yields 7: y = 3x + 1.",
            hintLadder: [
              "Find the jump in y when x increases from 2 to 3.",
              "Test y = 3x + b using x = 2, y = 7.",
              "Check the candidate formula on x = 5: 3(5) + 1 = 16."
            ],
            misconceptionAlerts: [
              { trigger: "y = 2x + 3", note: "2x + 3 works only at x = 2 (giving 7) but gives 9 instead of 10 at x = 3." }
            ],
            skillId: "skill-pri-number-patterns-rules",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-pat-3",
            type: "multiple_choice",
            questionText: "Find the missing 5th term in the triangular-based sequence: 1, 3, 6, 10, ___, 21.",
            options: ["15", "14", "16", "18"],
            correctAnswer: "15",
            explanation: "Differences increase by +1 each step: +2, +3, +4, +5, +6. Thus 10 + 5 = 15, and 15 + 6 = 21.",
            hintLadder: [
              "List the differences between 1, 3, 6, 10.",
              "Notice the differences are +2, +3, +4.",
              "Add +5 to 10 and verify that adding +6 reaches 21."
            ],
            misconceptionAlerts: [
              { trigger: "14", note: "Adding +4 again repeats the previous step instead of incrementing to +5." }
            ],
            skillId: "skill-pri-number-patterns-rules",
            difficulty: "medium",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-pat-4",
            type: "multiple_choice",
            questionText: "In the geometric pattern 3, 6, 12, 24, ..., what is the 7th term?",
            options: ["192", "96", "384", "144"],
            correctAnswer: "192",
            explanation: "Each term doubles (r = 2). T_5 = 48, T_6 = 96, and T_7 = 192 (= 3 x 2^6).",
            hintLadder: [
              "Check the ratio between consecutive terms: 6/3 = 2, 12/6 = 2.",
              "Continue doubling: T_4 = 24, T_5 = 48, T_6 = 96.",
              "Multiply T_6 by 2 to obtain T_7."
            ],
            misconceptionAlerts: [
              { trigger: "96", note: "96 is the 6th term (3 x 2^5), one step short of the 7th term." }
            ],
            skillId: "skill-pri-number-patterns-rules",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-pat-5",
            type: "multiple_choice",
            questionText: "A two-stage number pattern starts at 4 and follows the rule 'multiply by 2, then subtract 1' at each step. What is the 4th term?",
            options: ["25", "19", "31", "49"],
            correctAnswer: "25",
            explanation: "T_1 = 4; T_2 = 2(4) - 1 = 7; T_3 = 2(7) - 1 = 13; T_4 = 2(13) - 1 = 25.",
            hintLadder: [
              "Apply the rule step by step starting with T_1 = 4.",
              "T_2 = 2(4) - 1 = 7; T_3 = 2(7) - 1 = 13.",
              "Compute T_4 = 2(13) - 1."
            ],
            misconceptionAlerts: [
              { trigger: "19", note: "Applying (x - 1) x 2 on T_3 or skipping the doubling order yields wrong intermediate values." }
            ],
            skillId: "skill-pri-number-patterns-rules",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p1-jss-algebra-expressions",
    subjectId: "jss_math_algebra",
    level: "junior_secondary",
    title: "Algebraic Expansion, Factorisation & Literal Equations",
    code: "JSS-ALG-202",
    description:
      "Distributive expansion of binomial products, highest common factor extraction, difference of two squares, and algebraic translation of word models.",
    order: 2,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-MTH-ALG-02",
      "CAMBRIDGE_IGCSE:LOWER-ALG-EXP",
      "WAEC_WASSCE:BECE-ALG-102"
    ],
    skills: [
      {
        id: "skill-jss-algebraic-expansion-factoring",
        unitId: "unit-p1-jss-algebra-expressions",
        title: "Binomial Expansion & Algebraic Factorisation",
        code: "SKL-JSS-ALG-202",
        summary:
          "Expand algebraic brackets accurately with signed terms and factorise polynomials by HCF grouping and difference of two squares.",
        objectives: [
          "Expand double brackets (ax + b)(cx + d) and collect like terms cleanly",
          "Factorise algebraic expressions using Highest Common Factor (HCF) and grouping",
          "Recognize and factorise difference of two squares a^2 - b^2 = (a - b)(a + b)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-linear-equations"],
        lesson: {
          id: "les-jss-algebraic-expansion-factoring",
          title: "Binomial Expansion, Signed Distributive Laws & Factorisation",
          hookAndIntuition:
            "Expansion and factorisation are exact mathematical inverses: expansion unpacks a compact factored rectangle into individual area tiles, while factorisation packs scattered terms back into a clean product of brackets.",
          conceptualExplanation:
            "By the distributive axiom, multiplying two binomials (ax + b)(cx + d) means every term in the first bracket multiplies every term in the second: acx^2 + (ad + bc)x + bd. Careful sign discipline is essential when subtracting brackets, because -(p - q) = -p + q. Factorisation reverses expansion: first extract the Highest Common Numerical and Variable Factor (HCF) shared by all terms. For four-term expressions, pair adjacent terms and extract common binomial brackets. Whenever an expression reduces to the form A^2 - B^2, apply the identity A^2 - B^2 = (A - B)(A + B) immediately—even for numerical mental arithmetic like 103^2 - 97^2 = (103 - 97)(103 + 97) = 6 x 200 = 1200.",
          conceptualModel:
            "Area-Grid Distributive Box: (ax + b)(cx + d) = acx^2 + adx + bcx + bd; Reverse Path: Extract HCF -> Check Grouping / A^2 - B^2.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "(ax + b)(cx + d) = acx^2 + (ad + bc)x + bd",
              definition: "Full distributive expansion of two linear binomials.",
              practicalExample: "(2x - 3)(x + 5) = 2x^2 + 10x - 3x - 15 = 2x^2 + 7x - 15."
            },
            {
              termOrSymbol: "A^2 - B^2 = (A - B)(A + B)",
              definition: "Difference of two squares algebraic identity.",
              practicalExample: "9x^2 - 25y^2 = (3x)^2 - (5y)^2 = (3x - 5y)(3x + 5y)."
            },
            {
              termOrSymbol: "HCF Factorisation: ab + ac = a(b + c)",
              definition: "Pulling out the largest shared numerical and literal factor from every term.",
              practicalExample: "12x^3y - 18x^2y^2 = 6x^2y(2x - 3y)."
            }
          ],
          workedExamples: [
            {
              title: "Expanding and Simplifying Signed Double Brackets",
              problemStatement: "Expand and simplify: 3(2x - 5) - (x - 4)(x + 2).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Expand the single bracket 3(2x - 5) carefully.",
                  reasoning: "3(2x - 5) = 6x - 15."
                },
                {
                  stepNumber: 2,
                  instruction: "Expand the double bracket (x - 4)(x + 2) inside protective parentheses.",
                  reasoning: "(x - 4)(x + 2) = x^2 + 2x - 4x - 8 = x^2 - 2x - 8."
                },
                {
                  stepNumber: 3,
                  instruction: "Distribute the leading minus sign across every term of the product.",
                  reasoning: "-(x^2 - 2x - 8) = -x^2 + 2x + 8."
                },
                {
                  stepNumber: 4,
                  instruction: "Combine all like terms in descending powers of x.",
                  reasoning: "(6x - 15) + (-x^2 + 2x + 8) = -x^2 + 8x - 7."
                }
              ],
              takeawayRule: "Always keep a minus sign outside protective brackets until the inner binomial multiplication is completely simplified."
            },
            {
              title: "Two-Stage Factorisation via HCF and Difference of Squares",
              problemStatement: "Factorise completely: 3x^3 - 48x.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Inspect all terms for a common numerical and variable factor.",
                  reasoning: "Both 3x^3 and 48x are divisible by 3x."
                },
                {
                  stepNumber: 2,
                  instruction: "Extract the HCF 3x outside a bracket.",
                  reasoning: "3x^3 - 48x = 3x(x^2 - 16)."
                },
                {
                  stepNumber: 3,
                  instruction: "Identify the remaining quadratic binomial as a difference of two squares.",
                  reasoning: "x^2 - 16 = x^2 - 4^2 = (x - 4)(x + 4)."
                },
                {
                  stepNumber: 4,
                  instruction: "Write the completely factorised product and verify by re-expansion.",
                  reasoning: "3x(x - 4)(x + 4) = 3x(x^2 - 16) = 3x^3 - 48x."
                }
              ],
              takeawayRule: "Never stop after extracting an HCF without checking if the inner bracket decomposes further as A^2 - B^2."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing (x - 5)^2 = x^2 - 25 or x^2 + 25 by omitting the middle cross-term.",
              whyItIsWrong: "(x - 5)(x - 5) produces two cross-products -5x and -5x, giving -10x in the center.",
              correctCorrection: "Always use (a - b)^2 = a^2 - 2ab + b^2, so (x - 5)^2 = x^2 - 10x + 25."
            },
            {
              misconception: "Attempting to factorise a sum of squares x^2 + 9 as (x + 3)(x + 3).",
              whyItIsWrong: "(x + 3)(x + 3) = x^2 + 6x + 9, which has a non-zero 6x term.",
              correctCorrection: "Only A^2 - B^2 (difference) factorises over real numbers as (A - B)(A + B)."
            }
          ],
          guidedPracticePrompt: "Expand (3x - 2)^2 - (x + 1)(x - 1) and simplify completely.",
          independentPracticePrompt: "Factorise by grouping: 2ax - 6ay + bx - 3by.",
          extensionActivity: "Evaluate 7.45^2 - 2.55^2 mentally without a calculator using A^2 - B^2.",
          diagnosticSelfCheck: "Can you explain why extracting the HCF first is mandatory before testing difference of two squares on 5m^2 - 20?",
          transferApplication: "Express the shaded border area between a square garden of side (2x + 3) m and an inner square pond of side (x - 1) m in factorised form.",
          masteryAssessment: "Factorise 4p^2 - 36q^2 completely into three factors.",
          summaryRecap: "Distribute signs carefully inside protective brackets during expansion; extract HCF first and check grouping or A^2 - B^2 during factorisation.",
          estimatedMinutes: 105
        },
        questions: [
          {
            id: "q-p1-jss-alg-1",
            type: "multiple_choice",
            questionText: "Expand and simplify the product of binomials:",
            mathExpression: "(2x - 3)(x + 5)",
            options: ["2x^2 + 7x - 15", "2x^2 - 15", "2x^2 + 13x - 15", "2x^2 - 7x - 15"],
            correctAnswer: "2x^2 + 7x - 15",
            explanation: "(2x)(x) + (2x)(5) + (-3)(x) + (-3)(5) = 2x^2 + 10x - 3x - 15 = 2x^2 + 7x - 15.",
            hintLadder: [
              "Multiply each term in (2x - 3) by each term in (x + 5).",
              "Collect the middle x-terms: +10x - 3x.",
              "Combine signs for (-3)(+5) = -15."
            ],
            misconceptionAlerts: [
              { trigger: "2x^2 - 15", note: "You multiplied only first and last terms, omitting the inner +10x and -3x terms." }
            ],
            skillId: "skill-jss-algebraic-expansion-factoring",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-jss-alg-2",
            type: "multiple_choice",
            questionText: "Factorise completely by extracting the Highest Common Factor:",
            mathExpression: "12a^2b - 18ab^2",
            options: ["6ab(2a - 3b)", "6a(2ab - 3b^2)", "3ab(4a - 6b)", "12ab(a - 6b)"],
            correctAnswer: "6ab(2a - 3b)",
            explanation: "HCF of 12 and 18 is 6; common variables are a and b. Dividing out 6ab leaves 2a - 3b.",
            hintLadder: [
              "Find the largest integer dividing both 12 and 18.",
              "Take the lowest power of each common letter: a^1 and b^1.",
              "Verify 6ab(2a - 3b) = 12a^2b - 18ab^2."
            ],
            misconceptionAlerts: [
              { trigger: "3ab(4a - 6b)", note: "3ab is a common factor, not the HIGHEST common factor (4 and 6 still share 2)." }
            ],
            skillId: "skill-jss-algebraic-expansion-factoring",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-jss-alg-3",
            type: "multiple_choice",
            questionText: "Factorise completely:",
            mathExpression: "5x^2 - 45y^2",
            options: ["5(x - 3y)(x + 3y)", "5(x - 9y)(x + 9y)", "(5x - 3y)(x + 15y)", "5(x - 3y)^2"],
            correctAnswer: "5(x - 3y)(x + 3y)",
            explanation: "First pull out HCF 5: 5(x^2 - 9y^2). Then factorise x^2 - (3y)^2 = (x - 3y)(x + 3y).",
            hintLadder: [
              "Extract the common numerical factor 5 first.",
              "Write 9y^2 as (3y)^2.",
              "Apply A^2 - B^2 = (A - B)(A + B)."
            ],
            misconceptionAlerts: [
              { trigger: "5(x - 9y)(x + 9y)", note: "Take the square root of 9 (which is 3), not 9 itself, inside the binomial factors." }
            ],
            skillId: "skill-jss-algebraic-expansion-factoring",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-jss-alg-4",
            type: "multiple_choice",
            questionText: "Simplify completely:",
            mathExpression: "(3x - 2)^2 - 4(x - 1)",
            options: ["9x^2 - 16x + 8", "9x^2 - 4x + 8", "9x^2 - 16x", "9x^2 - 8x + 8"],
            correctAnswer: "9x^2 - 16x + 8",
            explanation: "(3x - 2)^2 = 9x^2 - 12x + 4. Subtracting 4(x - 1) = 4x - 4 adds -4x + 4, yielding 9x^2 - 16x + 8.",
            hintLadder: [
              "Expand (3x - 2)^2 using (a - b)^2 = a^2 - 2ab + b^2.",
              "Expand -4(x - 1) = -4x + 4.",
              "Add x-terms (-12x - 4x) and constants (+4 + 4)."
            ],
            misconceptionAlerts: [
              { trigger: "9x^2 - 16x", note: "Remember (-4)(-1) = +4, so +4 + 4 = +8 rather than cancelling to zero." }
            ],
            skillId: "skill-jss-algebraic-expansion-factoring",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-jss-alg-5",
            type: "multiple_choice",
            questionText: "Factorise the four-term expression by grouping:",
            mathExpression: "6mp - 4mq + 9np - 6nq",
            options: ["(2m + 3n)(3p - 2q)", "(2m - 3n)(3p + 2q)", "(3m + 2n)(2p - 3q)", "(2m + 3n)(3p + 2q)"],
            correctAnswer: "(2m + 3n)(3p - 2q)",
            explanation: "Group pairs: 2m(3p - 2q) + 3n(3p - 2q) = (2m + 3n)(3p - 2q).",
            hintLadder: [
              "Factor 2m out of the first pair (6mp - 4mq).",
              "Factor +3n out of the second pair (9np - 6nq).",
              "Extract the shared binomial (3p - 2q)."
            ],
            misconceptionAlerts: [
              { trigger: "(2m - 3n)(3p + 2q)", note: "Check the signs of -4mq and +9np when expanded back." }
            ],
            skillId: "skill-jss-algebraic-expansion-factoring",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p1-jss-geometry-mensuration",
    subjectId: "jss_math_geometry",
    level: "junior_secondary",
    title: "Plane Geometry, Pythagoras & 3D Mensuration",
    code: "JSS-GEO-203",
    description:
      "Parallel-line transversal angles, interior/exterior polygon sums, Pythagorean theorem, circular arc-sector measures, and prism/cylinder/cone volumes.",
    order: 2,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-GEO-01",
      "CAMBRIDGE_IGCSE:LOWER-GEO-MENS",
      "WAEC_WASSCE:BECE-GEO-203"
    ],
    skills: [
      {
        id: "skill-jss-pythagoras-mensuration",
        unitId: "unit-p1-jss-geometry-mensuration",
        title: "Angle Proofs, Pythagoras' Theorem & Solid Mensuration",
        code: "SKL-JSS-GEO-203",
        summary:
          "Prove unknown angles using polygon and parallel-line theorems, apply Pythagoras' theorem in 2D/3D triangles, and compute solid surface areas and volumes.",
        objectives: [
          "Solve polygon interior/exterior angle problems via (n - 2) x 180° and Σext = 360°",
          "Apply Pythagoras' theorem c^2 = a^2 + b^2 and standard integer triples (3-4-5, 5-12-13, 8-15-17)",
          "Calculate cylinder, cone, and sector area/volume in exact pi and rational approximations"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-jss-pythagoras-mensuration",
          title: "Euclidean Angle Proofs, Pythagoras & 3D Volume Architecture",
          hookAndIntuition:
            "Every bridge truss, water tank, and roof rafter relies on two bedrock relationships: triangle rigidity governed by Pythagoras' right-angle law and cross-sectional capacity governed by uniform vs tapered 3D volume laws.",
          conceptualExplanation:
            "In Euclidean plane geometry, two parallel lines cut by a transversal create equal alternate angles, equal corresponding angles, and co-interior (allied) angles summing to 180°. For any convex n-sided polygon, the sum of interior angles is (n - 2) × 180°, while the sum of exterior angles is invariably 360°. In any right-angled triangle with hypotenuse c opposite the 90° vertex, c² = a² + b². Notice how 3D mensuration obeys two unifying principles: uniform cross-section prisms/cylinders have Volume = Base Area × Height (V = πr²h), whereas pointed pyramids/cones taper to exactly one-third of the enclosing prism (V = (1/3)πr²h), with curved surface area πrl where slant height l = √(r² + h²).",
          conceptualModel:
            "Uniform Solids: V = A_base · h  |  Pointed Solids (Cones/Pyramids): V = (1/3)A_base · h  |  Right-Triangle Link: l^2 = r^2 + h^2.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "c^2 = a^2 + b^2",
              definition: "Pythagoras' Theorem linking the legs a, b and hypotenuse c of a right triangle.",
              practicalExample: "If legs are 8 cm and 15 cm, hypotenuse c = √(64 + 225) = √289 = 17 cm."
            },
            {
              termOrSymbol: "Sum of Interior Angles = (n - 2) × 180°",
              definition: "Total interior angle sum of an n-sided convex polygon.",
              practicalExample: "Regular octagon (n = 8): total = 6 × 180° = 1080°; each angle = 135°."
            },
            {
              termOrSymbol: "Cylinder V = πr²h  |  Cone V = (1/3)πr²h, CSA = πrl",
              definition: "Exact capacity and curved surface formulas for circular solids.",
              practicalExample: "Cone with r = 7 cm, h = 24 cm has l = 25 cm and CSA = (22/7)(7)(25) = 550 cm²."
            }
          ],
          workedExamples: [
            {
              title: "Slant Height, Curved Surface Area & Volume of a Right Circular Cone",
              problemStatement: "A conical tent has base radius r = 6 cm and perpendicular height h = 8 cm. Leaving pi in your answers, find: (a) slant height l, (b) curved surface area, (c) volume.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Apply Pythagoras' theorem to the right triangle formed by r, h, and l.",
                  reasoning: "l = √(r^2 + h^2) = √(6^2 + 8^2) = √(36 + 64) = √100 = 10 cm."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute curved surface area using CSA = πrl.",
                  reasoning: "CSA = π × 6 × 10 = 60π cm²."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute total surface area if closed base were included (sanity check).",
                  reasoning: "Base area = πr² = 36π cm², so Total Surface Area = 96π cm²."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute cone volume using the 1/3 tapered solid formula.",
                  reasoning: "V = (1/3)πr²h = (1/3)π(36)(8) = 12π × 8 = 96π cm³."
                }
              ],
              takeawayRule: "Always distinguish vertical height h (for Volume) from slant height l (for Curved Surface Area) using l^2 = r^2 + h^2."
            },
            {
              title: "Finding Polygon Sides from an Interior-Exterior Angle Ratio",
              problemStatement: "Each interior angle of a regular polygon is 5 times its exterior angle. How many sides does the polygon have?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Assign variable e to each exterior angle and express the interior angle.",
                  reasoning: "Interior angle i = 5e."
                },
                {
                  stepNumber: 2,
                  instruction: "Use the straight-line supplementary relation at any vertex.",
                  reasoning: "i + e = 180° => 5e + e = 180° => 6e = 180° => e = 30°."
                },
                {
                  stepNumber: 3,
                  instruction: "Use the invariant sum of exterior angles (360°) to solve for side count n.",
                  reasoning: "n = 360° / e = 360° / 30° = 12 sides (a regular dodecagon)."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify via the interior sum formula.",
                  reasoning: "Interior angle = 5(30°) = 150°; (12 - 2) × 180° / 12 = 1800° / 12 = 150° (verified)."
                }
              ],
              takeawayRule: "Computing the exterior angle first via i + e = 180° and dividing into 360° is far faster than solving the (n - 2)180°/n equation."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding squares a^2 + b^2 when asked for a shorter leg instead of the hypotenuse.",
              whyItIsWrong: "c is always the longest side opposite 90°; finding a leg requires subtraction: a^2 = c^2 - b^2.",
              correctCorrection: "Identify the 90° angle first; the side opposite it is c. Subtract from c^2 whenever solving for a leg."
            },
            {
              misconception: "Using diameter instead of radius, or omitting the 1/3 factor in cone/pyramid volumes.",
              whyItIsWrong: "Substituting d = 2r inflates πr²h by a factor of 4; omitting 1/3 triples the volume.",
              correctCorrection: "Halve given diameters immediately and verify whether the solid is uniform (1×) or pointed (1/3×)."
            }
          ],
          guidedPracticePrompt: "A ladder of length 13 m rests against a vertical wall with its foot 5 m from the base. How high up the wall does it reach?",
          independentPracticePrompt: "Calculate the area of a sector of radius 14 cm subtending 90° at the centre (take π = 22/7).",
          extensionActivity: "Derive why a regular hexagon tiles a flat floor perfectly whereas a regular pentagon leaves gaps.",
          diagnosticSelfCheck: "Why does V_cone = (1/3)πr²h hold for any perpendicular height h?",
          transferApplication: "Determine how many litres of water a cylindrical tank of radius 0.7 m and height 2.0 m holds (1 m³ = 1000 L).",
          masteryAssessment: "Find the total surface area of a solid hemisphere of radius 7 cm (take π = 22/7).",
          summaryRecap: "Link geometry and 3D mensuration through exterior-angle invariants, right-triangle Pythagoras triples, and uniform vs 1/3 tapered solid volumes.",
          estimatedMinutes: 105
        },
        questions: [
          {
            id: "q-p1-jss-geo-1",
            type: "multiple_choice",
            questionText: "A right-angled triangle has hypotenuse 17 cm and one leg of length 8 cm. Find the length of the other leg.",
            mathExpression: "a^2 + 8^2 = 17^2",
            options: ["15 cm", "18.8 cm", "9 cm", "12 cm"],
            correctAnswer: "15 cm",
            explanation: "a = √(17^2 - 8^2) = √(289 - 64) = √225 = 15 cm.",
            hintLadder: [
              "Since 17 cm is the hypotenuse, subtract 8^2 from 17^2.",
              "Compute 289 - 64 = 225.",
              "Take the positive square root of 225."
            ],
            misconceptionAlerts: [
              { trigger: "18.8 cm", note: "Adding 17^2 + 8^2 treats the hypotenuse as a leg." }
            ],
            skillId: "skill-jss-pythagoras-mensuration",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-jss-geo-2",
            type: "multiple_choice",
            questionText: "Each interior angle of a regular polygon measures 140°. How many sides does the polygon have?",
            options: ["9 sides", "8 sides", "10 sides", "12 sides"],
            correctAnswer: "9 sides",
            explanation: "Each exterior angle = 180° - 140° = 40°. Number of sides n = 360° / 40° = 9.",
            hintLadder: [
              "Find one exterior angle using interior + exterior = 180°.",
              "Exterior angle = 180° - 140° = 40°.",
              "Divide 360° by 40°."
            ],
            misconceptionAlerts: [
              { trigger: "8 sides", note: "A regular octagon has interior angles of 135°, not 140°." }
            ],
            skillId: "skill-jss-pythagoras-mensuration",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-jss-geo-3",
            type: "multiple_choice",
            questionText: "Taking π = 22/7, calculate the volume of a closed cylindrical drum of base radius 7 cm and height 10 cm.",
            mathExpression: "V = \\pi r^2 h",
            options: ["1540 cm³", "440 cm³", "770 cm³", "3080 cm³"],
            correctAnswer: "1540 cm³",
            explanation: "V = (22/7) × 7^2 × 10 = 22 × 7 × 10 = 1540 cm³.",
            hintLadder: [
              "Write V = πr²h with r = 7 and h = 10.",
              "One factor of 7 cancels the denominator in 22/7.",
              "Multiply 22 × 7 × 10."
            ],
            misconceptionAlerts: [
              { trigger: "440 cm³", note: "2πrh = 440 cm² is the curved surface area, not the volume." }
            ],
            skillId: "skill-jss-pythagoras-mensuration",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-jss-geo-4",
            type: "multiple_choice",
            questionText: "A sector of a circle of radius 14 cm subtends an angle of 90° at the centre. Using π = 22/7, find the area of the sector.",
            mathExpression: "A = \\frac{\\theta}{360^\\circ}\\pi r^2",
            options: ["154 cm²", "308 cm²", "22 cm²", "616 cm²"],
            correctAnswer: "154 cm²",
            explanation: "(90/360) × (22/7) × 14 × 14 = (1/4) × 22 × 2 × 14 = 11 × 14 = 154 cm².",
            hintLadder: [
              "90°/360° = 1/4 of the full circle area.",
              "Compute full circle area: (22/7) × 14 × 14 = 616 cm².",
              "Divide 616 by 4."
            ],
            misconceptionAlerts: [
              { trigger: "22 cm²", note: "22 cm is the arc length (1/4 × 2πr), whereas sector area uses πr²." }
            ],
            skillId: "skill-jss-pythagoras-mensuration",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-jss-geo-5",
            type: "multiple_choice",
            questionText: "A right circular cone has base diameter 12 cm and vertical height 8 cm. What is its curved surface area in terms of π?",
            mathExpression: "CSA = \\pi r l, \\quad l = \\sqrt{r^2 + h^2}",
            options: ["60π cm²", "48π cm²", "120π cm²", "96π cm²"],
            correctAnswer: "60π cm²",
            explanation: "Radius r = 12/2 = 6 cm. Slant height l = √(6^2 + 8^2) = 10 cm. CSA = π(6)(10) = 60π cm².",
            hintLadder: [
              "Convert diameter 12 cm to radius r = 6 cm.",
              "Use Pythagoras to find slant height l = √(6^2 + 8^2) = 10 cm.",
              "Multiply π × r × l."
            ],
            misconceptionAlerts: [
              { trigger: "48π cm²", note: "48π uses vertical height h = 8 instead of slant height l = 10." }
            ],
            skillId: "skill-jss-pythagoras-mensuration",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p1-jss-statistics-probability",
    subjectId: "jss_math_statistics",
    level: "junior_secondary",
    title: "Frequency Distributions, Pie Charts & Chance Probability",
    code: "JSS-STA-204",
    description:
      "Computing weighted mean, median, and mode from grouped/ungrouped frequency tables, sector-angle pie charts, and theoretical sample-space probability.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-STA-01",
      "CAMBRIDGE_IGCSE:LOWER-STA-PROB",
      "WAEC_WASSCE:BECE-STA-204"
    ],
    skills: [
      {
        id: "skill-jss-central-tendency-charts",
        unitId: "unit-p1-jss-statistics-probability",
        title: "Frequency Averages, Pie Sectors & Probability",
        code: "SKL-JSS-STA-204",
        summary:
          "Extract weighted mean Σ(fx)/Σf, cumulative median rank, modal score, proportional pie-chart angles, and event probabilities from data tables.",
        objectives: [
          "Compute weighted arithmetic mean Σ(fx)/Σf and locate the median from a frequency distribution",
          "Convert category counts to pie-chart sector angles via (f / N) × 360° and reconstruct counts from angles",
          "Determine theoretical probability P(E) = n(E)/n(S) and complementary event P(not E) = 1 - P(E)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-jss-central-tendency-charts",
          title: "Frequency Tables, Pie Charts & Classical Probability",
          hookAndIntuition:
            "Raw lists of scores hide patterns; frequency tables organize hundreds of observations into compact rows so we can measure typical performance, slice 360° pie charts proportionally, and quantify uncertainty.",
          conceptualExplanation:
            "In a discrete frequency table pairing value x with count f, the total sample size is N = Σf. Every observation contributes fx to the grand sum, so the weighted mean is x̄ = Σ(fx) / Σf (never divide by the number of rows!). To locate the median, compute the cumulative frequency running total and find the ((N + 1)/2)th ranked item. The mode is the x-value with highest frequency f, not the frequency value itself. When displaying categorical shares on a pie chart, total circle angle 360° maps proportionally: Angle θ = (f / N) × 360°. Finally, for equally likely outcomes in sample space S, event probability P(E) = n(E) / n(S) satisfies 0 <= P(E) <= 1, with complement P(E') = 1 - P(E).",
          conceptualModel:
            "Weighted Sum Σ(fx) / Total Count Σf = Mean  |  Pie Angle = (f / Σf) × 360°  |  Probability = Favourable / Total Outcomes.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "x̄ = Σ(fx) / Σf",
              definition: "Arithmetic mean from a discrete frequency distribution.",
              practicalExample: "Scores [2(x3), 5(x7)]: mean = (6 + 35) / (3 + 7) = 41 / 10 = 4.1."
            },
            {
              termOrSymbol: "θ = (f / N) × 360°",
              definition: "Central angle representing category frequency f out of total observations N.",
              practicalExample: "15 students out of 60 occupy (15/60) × 360° = 90°."
            },
            {
              termOrSymbol: "P(E') = 1 - P(E)",
              definition: "Complementary probability law for mutually exclusive exhaustive events.",
              practicalExample: "If P(rain) = 0.35, then P(no rain) = 1 - 0.35 = 0.65."
            }
          ],
          workedExamples: [
            {
              title: "Computing Mean, Median & Mode from a Frequency Table",
              problemStatement: "Quiz scores of 20 students are: Score 3 (f=2), Score 4 (f=5), Score 5 (f=8), Score 6 (f=5). Find the mean, median, and mode.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Verify total frequency N = Σf and compute Σ(fx).",
                  reasoning: "N = 2 + 5 + 8 + 5 = 20. Σ(fx) = (3×2) + (4×5) + (5×8) + (6×5) = 6 + 20 + 40 + 30 = 96."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide Σ(fx) by N = Σf to compute the weighted mean.",
                  reasoning: "Mean x̄ = 96 / 20 = 4.8."
                },
                {
                  stepNumber: 3,
                  instruction: "Use cumulative frequencies (2, 7, 15, 20) to locate the median between the 10th and 11th items.",
                  reasoning: "Items 1-2 are score 3; items 3-7 are score 4; items 8-15 are score 5. Both 10th and 11th items equal 5, so Median = 5."
                },
                {
                  stepNumber: 4,
                  instruction: "Identify the modal score having the largest frequency.",
                  reasoning: "Highest frequency is 8, corresponding to Score = 5. Note: Mode is 5, not 8."
                }
              ],
              takeawayRule: "Always divide Σ(fx) by Σf (total observations), and always report the x-value rather than its frequency as the mode."
            },
            {
              title: "Reconstructing Category Counts from Pie Chart Angles",
              problemStatement: "In a school transport pie chart, 'Bus' occupies 144°, 'Walk' occupies 90°, and 'Bicycle' occupies the remainder. If 30 students walk, find the total surveyed and bicycle count.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Find the missing central angle for Bicycle using the 360° full circle.",
                  reasoning: "θ_bicycle = 360° - (144° + 90°) = 360° - 234° = 126°."
                },
                {
                  stepNumber: 2,
                  instruction: "Use the known 'Walk' sector (90° = 30 students) to solve for total survey size N.",
                  reasoning: "(90° / 360°) × N = 30 => (1/4)N = 30 => N = 120 students."
                },
                {
                  stepNumber: 3,
                  instruction: "Calculate the Bicycle student count from its 126° angle.",
                  reasoning: "Count_bicycle = (126° / 360°) × 120 = 126 / 3 = 42 students."
                },
                {
                  stepNumber: 4,
                  instruction: "Cross-check all three sectors sum to N = 120.",
                  reasoning: "Bus = (144/360)×120 = 48. Total = 48 + 30 + 42 = 120 (verified)."
                }
              ],
              takeawayRule: "Knowing any single sector's angle and count immediately unlocks the scale factor N / 360° for the entire pie chart."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Reporting the highest frequency count (e.g. 8) as the mode instead of the category value (e.g. 5).",
              whyItIsWrong: "The frequency counts how often an observation appeared; the mode is the observation itself.",
              correctCorrection: "Find max(f) in the frequency row, then read upward to the score/value x."
            },
            {
              misconception: "Dividing Σ(fx) by the number of distinct categories instead of Σf.",
              whyItIsWrong: "Treating each row as a single observation ignores weighting by f.",
              correctCorrection: "Always compute N = Σf explicitly before calculating Σ(fx) / N."
            }
          ],
          guidedPracticePrompt: "A bag holds 5 red, 7 blue, and 8 green marbles. Find the probability of drawing a marble that is NOT blue.",
          independentPracticePrompt: "Construct the pie angles for budget shares ₦18,000, ₦12,000, and ₦6,000.",
          extensionActivity: "Explain why adding one extreme outlier shifts the arithmetic mean substantially while leaving the median barely moved.",
          diagnosticSelfCheck: "Why must every set of pie-chart sector angles add up to exactly 360°?",
          transferApplication: "Calculate a student's overall weighted percentage if Coursework (weight 30%) scored 80% and Exam (weight 70%) scored 60%.",
          masteryAssessment: "Given scores [2, 4, 4, 6, 8, x] with mean 5, determine the missing value x and new median.",
          summaryRecap: "Organize distributions via Σf and Σ(fx), convert proportions to 360° angles cleanly, and evaluate probabilities using complementary ratios.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p1-jss-sta-1",
            type: "multiple_choice",
            questionText: "Find the weighted mean of the dataset: x = [2, 4, 6] with respective frequencies f = [3, 5, 2].",
            mathExpression: "\\bar{x} = \\frac{\\sum fx}{\\sum f}",
            options: ["3.8", "4.0", "12.6", "3.6"],
            correctAnswer: "3.8",
            explanation: "Σ(fx) = (2×3) + (4×5) + (6×2) = 6 + 20 + 12 = 38. Total frequency Σf = 3 + 5 + 2 = 10. Mean = 38/10 = 3.8.",
            hintLadder: [
              "Multiply each score x by its frequency f: 6, 20, 12.",
              "Add the products to get Σ(fx) = 38 and add frequencies to get Σf = 10.",
              "Divide 38 by 10."
            ],
            misconceptionAlerts: [
              { trigger: "4.0", note: "(2 + 4 + 6)/3 = 4.0 ignores the frequency weights." }
            ],
            skillId: "skill-jss-central-tendency-charts",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-jss-sta-2",
            type: "multiple_choice",
            questionText: "In a pie chart representing 72 households, a sector of 105° represents solar-powered homes. How many households use solar power?",
            options: ["21 households", "18 households", "24 households", "15 households"],
            correctAnswer: "21 households",
            explanation: "Count = (105° / 360°) × 72 = 105 / 5 = 21 households.",
            hintLadder: [
              "Set up the proportion: (Angle / 360°) × Total.",
              "Note that 72 / 360 simplifies cleanly to 1/5.",
              "Compute 105 / 5."
            ],
            misconceptionAlerts: [
              { trigger: "18 households", note: "18 households correspond to 90°, not 105°." }
            ],
            skillId: "skill-jss-central-tendency-charts",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-jss-sta-3",
            type: "multiple_choice",
            questionText: "The shoe sizes of 15 pupils are recorded as: Size 5 (f=3), Size 6 (f=4), Size 7 (f=6), Size 8 (f=2). What is the median shoe size?",
            options: ["Size 7", "Size 6", "Size 6.5", "Size 8"],
            correctAnswer: "Size 7",
            explanation: "For N = 15, the median is at rank (15 + 1)/2 = 8th position. Cumulative frequencies are 3, 7, 13, 15, so the 8th pupil wears Size 7.",
            hintLadder: [
              "Locate the middle position (15 + 1) / 2 = 8th item.",
              "Sum frequencies cumulatively: Size 5 reaches 3; Size 6 reaches 7.",
              "The 8th item falls inside Size 7 (positions 8 to 13)."
            ],
            misconceptionAlerts: [
              { trigger: "Size 6", note: "Size 6 only spans positions 4 through 7; position 8 steps into Size 7." }
            ],
            skillId: "skill-jss-central-tendency-charts",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-jss-sta-4",
            type: "multiple_choice",
            questionText: "A fair six-sided die is rolled once. What is the probability of obtaining a prime number or a number greater than 4?",
            options: ["2/3", "1/2", "5/6", "1/3"],
            correctAnswer: "2/3",
            explanation: "Primes on a die are {2, 3, 5}; numbers > 4 are {5, 6}. Their union is {2, 3, 5, 6}, giving 4/6 = 2/3.",
            hintLadder: [
              "List the primes in {1, 2, 3, 4, 5, 6} -> {2, 3, 5}. Remember 1 is NOT prime.",
              "List numbers > 4 -> {5, 6}.",
              "Take the union without double-counting 5: {2, 3, 5, 6} -> 4/6 = 2/3."
            ],
            misconceptionAlerts: [
              { trigger: "5/6", note: "Check carefully: 1 is NOT prime, and 5 must not be counted twice." }
            ],
            skillId: "skill-jss-central-tendency-charts",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-jss-sta-5",
            type: "multiple_choice",
            questionText: "The mean of 5 numbers is 14. When a 6th number k is included, the new mean rises to 16. Find the value of k.",
            options: ["26", "24", "18", "30"],
            correctAnswer: "26",
            explanation: "Original sum = 5 × 14 = 70. New sum of 6 numbers = 6 × 16 = 96. Hence k = 96 - 70 = 26.",
            hintLadder: [
              "Multiply count by mean to get the original sum of 5 numbers.",
              "Multiply 6 by the new mean 16 to get the new sum.",
              "Subtract original sum from new sum."
            ],
            misconceptionAlerts: [
              { trigger: "18", note: "Adding 2 to the mean across 6 numbers requires an excess of 6×2 = 12 above 14, giving 26." }
            ],
            skillId: "skill-jss-central-tendency-charts",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p1-sss-general-math-variation",
    subjectId: "sss_general_mathematics",
    level: "senior_secondary",
    title: "Variation Laws, Quadratic Inequalities & Feasible Regions",
    code: "SSS-MTH-301",
    description:
      "Direct, inverse, joint, and partial variation modeling, sign-chart solution of quadratic inequalities, and half-plane linear programming bounds.",
    order: 2,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-MTH-VAR-INEQ",
      "JAMB_UTME:MTH-ALG-VAR",
      "NERDC_NIGERIAN:SS2-MTH-VAR"
    ],
    skills: [
      {
        id: "skill-sss-variation-inequalities",
        unitId: "unit-p1-sss-general-math-variation",
        title: "Joint/Partial Variation & Quadratic Inequalities",
        code: "SKL-SSS-MTH-301",
        summary:
          "Model proportional and two-constant partial relationships, and solve quadratic/linear inequality systems without reversing sign boundaries.",
        objectives: [
          "Formulate and solve direct, inverse, joint, and two-constant partial variation equations",
          "Solve quadratic inequalities ax^2 + bx + c > 0 or < 0 via critical roots and sign analysis",
          "Determine integer solutions inside bounded half-plane linear inequality systems"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-quad-factoring", "skill-linear-equations"],
        lesson: {
          id: "les-sss-variation-inequalities",
          title: "Algebraic Variation Modeling & Sign-Chart Inequalities",
          hookAndIntuition:
            "Utility bills combine a fixed standing charge with a metered rate (partial variation), while engineering safety envelopes demand exact bounds where parabolic stresses stay below yield limits (quadratic inequalities).",
          conceptualExplanation:
            "Variation converts proportional statements into exact equations via a proportionality constant k. In joint variation, if y varies directly as x and inversely as √z, write y = kx / √z and solve for k using one complete observation. In partial variation ('y is partly constant and partly varies as x'), there are TWO independent constants: y = a + bx, requiring simultaneous equations from two data points. For quadratic inequalities such as (x - α)(x - β) < 0 with α < β, never assume x < α and x < β! Instead, inspect the upward parabola: it dips strictly below the axis BETWEEN the roots (α < x < β) and rises above zero OUTSIDE the roots (x < α or x > β).",
          conceptualModel:
            "Partial Variation: y = a + bx (2 constants -> 2 equations)  |  Quadratic Sign Rule (a > 0): < 0 => Inside [α, β]; > 0 => Outside (-∞, α) U (β, ∞).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "y = k(x^p / z^q)",
              definition: "Joint direct and inverse power variation law with constant k.",
              practicalExample: "If P varies as V^2/T, doubling V and quadrupling T leaves P unchanged."
            },
            {
              termOrSymbol: "y = a + bx  (Partial Variation)",
              definition: "Sum of a fixed base component 'a' and a variable proportional term 'bx'.",
              practicalExample: "Cost C = 2000 + 150n has ₦2000 fixed setup plus ₦150 per unit."
            },
            {
              termOrSymbol: "(x - α)(x - β) < 0  (α < β)  <=>  α < x < β",
              definition: "Critical-root interval rule for upward-opening quadratic inequalities.",
              practicalExample: "x^2 - 5x + 6 < 0 => (x - 2)(x - 3) < 0 => 2 < x < 3."
            }
          ],
          workedExamples: [
            {
              title: "Solving a Two-Constant Partial Variation System",
              problemStatement: "Quantity y is partly constant and partly varies as x^2. When x = 2, y = 17; when x = 5, y = 80. Find y when x = 3.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Write the two-constant partial variation model accurately.",
                  reasoning: "y = a + bx^2, where a and b are constants."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute both given ordered pairs to form simultaneous equations.",
                  reasoning: "(1) 17 = a + 4b;  (2) 80 = a + 25b."
                },
                {
                  stepNumber: 3,
                  instruction: "Subtract equation (1) from equation (2) to eliminate a and find b, then a.",
                  reasoning: "63 = 21b => b = 3. Substituting back: 17 = a + 4(3) => a = 5."
                },
                {
                  stepNumber: 4,
                  instruction: "Evaluate the verified equation y = 5 + 3x^2 at x = 3.",
                  reasoning: "y = 5 + 3(3^2) = 5 + 27 = 32."
                }
              ],
              takeawayRule: "Partial variation always introduces two unknown constants; attempting to force y = kx^2 through two points fails immediately."
            },
            {
              title: "Sign-Chart Solution of a Quadratic Inequality",
              problemStatement: "Find the range of values of x satisfying: 2x^2 - 5x - 3 >= 0.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Factorise the quadratic expression to locate its boundary roots.",
                  reasoning: "2x^2 - 5x - 3 = (2x + 1)(x - 3) = 0, giving roots x = -1/2 and x = 3."
                },
                {
                  stepNumber: 2,
                  instruction: "Partition the number line into three intervals around -1/2 and 3.",
                  reasoning: "Intervals: x < -1/2,  -1/2 < x < 3,  and x > 3."
                },
                {
                  stepNumber: 3,
                  instruction: "Test a sample value (e.g. x = 0) inside the middle interval.",
                  reasoning: "At x = 0: (2(0) + 1)(0 - 3) = (1)(-3) = -3 < 0, so the middle interval fails >= 0."
                },
                {
                  stepNumber: 4,
                  instruction: "Select the outer intervals inclusive of the closed endpoints.",
                  reasoning: "x <= -1/2 or x >= 3."
                }
              ],
              takeawayRule: "Since 2x^2 opens upward (+), it is >= 0 on the two outer wings and < 0 strictly between its roots."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting to reverse the inequality sign when multiplying or dividing by a negative number.",
              whyItIsWrong: "While 3 > 1 is true, -3 > -1 is false; negation reflects the number line and flips inequality order.",
              correctCorrection: "Whenever multiplying/dividing both sides by a negative constant, flip > to < (and >= to <=)."
            },
            {
              misconception: "Writing x > α AND x > β when solving (x - α)(x - β) > 0.",
              whyItIsWrong: "Two negative factors also multiply to a positive product, so values below the smaller root satisfy > 0 as well.",
              correctCorrection: "State outer intervals using 'or': x < α or x > β."
            }
          ],
          guidedPracticePrompt: "If P varies directly as m and inversely as r^2, by what factor does P change if m is tripled and r is halved?",
          independentPracticePrompt: "Solve x^2 - 4x - 12 < 0 and list all integer solutions.",
          extensionActivity: "Maximize objective Z = 3x + 4y subject to x >= 0, y >= 0, x + y <= 6, and 2x + y <= 8.",
          diagnosticSelfCheck: "Why does partial variation require two independent constants rather than one?",
          transferApplication: "Model internet bundle pricing (₦1,500 base line fee + ₦400/GB) and solve when monthly cost stays below ₦5,500.",
          masteryAssessment: "Find all real values of x satisfying x^2 - 7x + 10 <= 0 and combine with 2x - 5 > 1.",
          summaryRecap: "Translate proportionality precisely with constants k or (a, b), and resolve quadratic inequalities reliably using root-partitioned sign intervals.",
          estimatedMinutes: 115
        },
        questions: [
          {
            id: "q-p1-sss-var-1",
            type: "multiple_choice",
            questionText: "Given that y varies directly as x^2 and inversely as z, with y = 12 when x = 2 and z = 3, find y when x = 5 and z = 15.",
            mathExpression: "y = \\frac{k x^2}{z}",
            options: ["15", "20", "12", "45"],
            correctAnswer: "15",
            explanation: "12 = k(4)/3 => k = 9. When x = 5 and z = 15, y = 9(25)/15 = 225/15 = 15.",
            hintLadder: [
              "Write y = kx^2 / z and substitute (x=2, y=12, z=3) to solve for k.",
              "k = (12 × 3) / 4 = 9.",
              "Evaluate y = 9(5^2) / 15."
            ],
            misconceptionAlerts: [
              { trigger: "45", note: "Dividing by z = 15 instead of multiplying correctly reduces 225/15 to 15." }
            ],
            skillId: "skill-sss-variation-inequalities",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-sss-var-2",
            type: "multiple_choice",
            questionText: "Find the solution set of the quadratic inequality:",
            mathExpression: "x^2 - 7x + 10 < 0",
            options: ["2 < x < 5", "x < 2 or x > 5", "-5 < x < -2", "2 <= x <= 5"],
            correctAnswer: "2 < x < 5",
            explanation: "Factorise: (x - 2)(x - 5) < 0. An upward parabola is strictly negative between its roots: 2 < x < 5.",
            hintLadder: [
              "Factorise x^2 - 7x + 10 = (x - 2)(x - 5).",
              "Test x = 3: (1)(-2) = -2 < 0.",
              "Since the inequality is strict (<), exclude endpoints 2 and 5."
            ],
            misconceptionAlerts: [
              { trigger: "x < 2 or x > 5", note: "Outside the roots, both factors share the same sign, making the product > 0, not < 0." }
            ],
            skillId: "skill-sss-variation-inequalities",
            difficulty: "easy",
            curriculumStandard: "JAMB_UTME"
          },
          {
            id: "q-p1-sss-var-3",
            type: "multiple_choice",
            questionText: "Cost C is partly constant and partly varies directly as guests n. For 10 guests, C = ₦7,000; for 25 guests, C = ₦13,000. Find C for 18 guests.",
            mathExpression: "C = a + bn",
            options: ["₦10,200", "₦9,360", "₦10,600", "₦12,600"],
            correctAnswer: "₦10,200",
            explanation: "13000 - 7000 = (25 - 10)b => 6000 = 15b => b = 400. Fixed a = 7000 - 4000 = 3000. Thus C(18) = 3000 + 400(18) = ₦10,200.",
            hintLadder: [
              "Set up C = a + bn for n = 10 and n = 25.",
              "Subtract the two equations to find the per-guest rate b.",
              "Solve for fixed fee a, then evaluate a + 18b."
            ],
            misconceptionAlerts: [
              { trigger: "₦9,360", note: "Using simple direct proportionality C = kn fails because of the fixed base fee a = ₦3,000." }
            ],
            skillId: "skill-sss-variation-inequalities",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-sss-var-4",
            type: "multiple_choice",
            questionText: "Solve the linear inequality and express the exact range of x:",
            mathExpression: "\\frac{2x - 1}{3} - \\frac{x + 2}{2} >= 1",
            options: ["x >= 14", "x <= 14", "x >= 2", "x >= 8"],
            correctAnswer: "x >= 14",
            explanation: "Multiply by LCM 6: 2(2x - 1) - 3(x + 2) >= 6 => 4x - 2 - 3x - 6 >= 6 => x - 8 >= 6 => x >= 14.",
            hintLadder: [
              "Multiply every term by 6 to clear fractions.",
              "Expand -3(x + 2) carefully as -3x - 6.",
              "Simplify x - 8 >= 6."
            ],
            misconceptionAlerts: [
              { trigger: "x >= 2", note: "Writing -3(x + 2) as -3x + 6 introduces a +12 sign error." }
            ],
            skillId: "skill-sss-variation-inequalities",
            difficulty: "medium",
            curriculumStandard: "JAMB_UTME"
          },
          {
            id: "q-p1-sss-var-5",
            type: "multiple_choice",
            questionText: "For what set of real values of x does 3 - 5x - 2x^2 >= 0 hold?",
            options: ["-3 <= x <= 1/2", "x <= -3 or x >= 1/2", "-1/2 <= x <= 3", "-3 < x < 1/2"],
            correctAnswer: "-3 <= x <= 1/2",
            explanation: "Multiply by -1 and flip the sign: 2x^2 + 5x - 3 <= 0 => (2x - 1)(x + 3) <= 0 => -3 <= x <= 1/2.",
            hintLadder: [
              "Multiply through by -1 so the x^2 coefficient is positive, flipping >= to <=.",
              "Factorise 2x^2 + 5x - 3 = (2x - 1)(x + 3).",
              "Identify the <= 0 interval between roots -3 and 1/2."
            ],
            misconceptionAlerts: [
              { trigger: "x <= -3 or x >= 1/2", note: "Remember the inequality flips when multiplying by -1, or verify x = 0 gives 3 >= 0 (inside!)." }
            ],
            skillId: "skill-sss-variation-inequalities",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p1-sss-further-math-diffeq",
    subjectId: "sss_further_mathematics",
    level: "senior_secondary",
    title: "Further Mathematics: Separable Differential Equations & Partial Fractions",
    code: "FM-ODE-402",
    description:
      "Partial-fraction rational decomposition, separable first-order differential equations, initial-value boundary constants, and natural exponential growth/decay.",
    order: 2,
    category: "applied",
    estimatedHours: 5.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-CALC-ODE-402",
      "CAMBRIDGE_AS_A_LEVEL:9709-PURE3-DE",
      "JAMB_UTME:FM-INTEGRAL-DE"
    ],
    skills: [
      {
        id: "skill-fm-first-order-ode",
        unitId: "unit-p1-sss-further-math-diffeq",
        title: "Separable Differential Equations & Partial Fractions",
        code: "SKL-FM-ODE-402",
        summary:
          "Resolve rational expressions into partial fractions and solve separable first-order differential equations subject to boundary conditions.",
        objectives: [
          "Decompose proper rational fractions P(x)/[(x - a)(x - b)] into linear partial fractions",
          "Separate variables in dy/dx = f(x)g(y) and integrate both sides with constant C",
          "Apply initial conditions y(x_0) = y_0 to obtain particular physical/exponential solutions"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-derivatives", "skill-logarithms"],
        lesson: {
          id: "les-fm-first-order-ode",
          title: "K.A. Stroud Programme: Separable ODEs & Partial Fraction Integration",
          hookAndIntuition:
            "Whenever a quantity changes at a rate proportional to itself—whether cooling coffee, radioactive decay, or logistic population saturation—nature speaks in differential equations. Separating variables splits x and y onto opposite sides so elementary integration solves the trajectory.",
          conceptualExplanation:
            "A first-order differential equation dy/dx = f(x)g(y) is separable whenever its right-hand side factors cleanly into an x-only expression and a y-only expression. Rearrange into [1/g(y)] dy = f(x) dx and integrate both sides, attaching ONE arbitrary constant C to obtain the general solution. To solve rational functions arising inside separation—such as dy/dx = y(4 - y)—first decompose 1/[y(4 - y)] into A/y + B/(4 - y) via cover-up or coefficient matching. Integrating yields ln|y| - ln|4 - y| = ln|y/(4 - y)| = 4x + C, which exponentiates to y/(4 - y) = Ke^{4x}. Always substitute initial conditions (x_0, y_0) immediately after integration to pin down C or K cleanly.",
          conceptualModel:
            "dy/dx = f(x)g(y)  ==>  ∫ (1/g(y)) dy = ∫ f(x) dx + C  ==>  Apply Initial Condition (x_0, y_0)  ==>  Particular Solution.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "∫ (1/y) dy = ∫ f(x) dx  ==>  y = A e^{∫f(x)dx}",
              definition: "Standard exponential solution for separable linear growth/decay dy/dx = f(x)y.",
              practicalExample: "If dy/dt = -0.2y with y(0) = 50, then y(t) = 50 e^{-0.2t}."
            },
            {
              termOrSymbol: "1/[(x - a)(x - b)] = A/(x - a) + B/(x - b)",
              definition: "Distinct linear partial-fraction decomposition enabling logarithmic integration.",
              practicalExample: "1/[(x - 1)(x + 2)] = (1/3)/(x - 1) - (1/3)/(x + 2)."
            },
            {
              termOrSymbol: "General vs Particular Solution",
              definition: "General solution retains arbitrary constant C; particular solution evaluates C from an initial value.",
              practicalExample: "y^2 = x^2 + C with y(0) = 3 gives C = 9, hence y^2 = x^2 + 9."
            }
          ],
          workedExamples: [
            {
              title: "Separable ODE with Initial Condition via Polynomial Integration",
              problemStatement: "Find the particular solution to dy/dx = (3x^2 + 1) / (2y) given that y = 3 when x = 1.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Separate all y-terms to the left and all x-terms to the right.",
                  reasoning: "2y dy = (3x^2 + 1) dx."
                },
                {
                  stepNumber: 2,
                  instruction: "Integrate both sides with respect to their respective variables.",
                  reasoning: "∫ 2y dy = ∫ (3x^2 + 1) dx  ==>  y^2 = x^3 + x + C."
                },
                {
                  stepNumber: 3,
                  instruction: "Substitute the initial condition (x = 1, y = 3) to determine C.",
                  reasoning: "3^2 = 1^3 + 1 + C  ==>  9 = 2 + C  ==>  C = 7."
                },
                {
                  stepNumber: 4,
                  instruction: "Write the particular solution (taking the positive branch since y(1) = +3).",
                  reasoning: "y^2 = x^3 + x + 7, or y = √(x^3 + x + 7)."
                }
              ],
              takeawayRule: "Never forget to include the integration constant C BEFORE solving for y explicitly; isolating y first and adding + C afterwards is algebraically invalid for nonlinear equations."
            },
            {
              title: "Partial Fraction Decomposition & Logarithmic ODE Integration",
              problemStatement: "Evaluate ∫ [5 / ((x - 1)(x + 4))] dx and match to a separable ODE with y(2) = 1.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Set up partial fractions: 5 / [(x - 1)(x + 4)] = A/(x - 1) + B/(x + 4).",
                  reasoning: "Multiply both sides by (x - 1)(x + 4): 5 = A(x + 4) + B(x - 1)."
                },
                {
                  stepNumber: 2,
                  instruction: "Evaluate at critical roots x = 1 and x = -4 to find A and B.",
                  reasoning: "At x = 1: 5 = 5A => A = 1. At x = -4: 5 = -5B => B = -1."
                },
                {
                  stepNumber: 3,
                  instruction: "Integrate each linear fraction using ∫ (1/(x - k)) dx = ln|x - k|.",
                  reasoning: "∫ [1/(x - 1) - 1/(x + 4)] dx = ln|x - 1| - ln|x + 4| + C = ln|(x - 1)/(x + 4)| + C."
                },
                {
                  stepNumber: 4,
                  instruction: "If dy/dx = 5y / [(x - 1)(x + 4)] with y(2) = 1, solve for the constant.",
                  reasoning: "ln|y| = ln|(x - 1)/(x + 4)| + C. At x = 2, y = 1: 0 = ln(1/6) + C => C = ln(6), so y = 6(x - 1)/(x + 4)."
                }
              ],
              takeawayRule: "Difference of logarithms collapses cleanly via ln(P) - ln(Q) = ln(P/Q) before exponentiating."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing ∫ (1/(2y + 1)) dy = ln|2y + 1| without dividing by the inner coefficient 2.",
              whyItIsWrong: "By chain rule differentiation, d/dy[ln(2y + 1)] = 2/(2y + 1), which is double the integrand.",
              correctCorrection: "Always divide by the linear derivative: ∫ (1/(ay + b)) dy = (1/a) ln|ay + b| + C."
            },
            {
              misconception: "Moving + C outside an exponential incorrectly as y = e^{kx} + C instead of A e^{kx}.",
              whyItIsWrong: "Exponentiating ln(y) = kx + C gives y = e^{kx + C} = e^C · e^{kx} = A e^{kx}, a multiplicative factor.",
              correctCorrection: "Apply e^(sum) = product of exponentials so the additive constant in log space becomes a coefficient."
            }
          ],
          guidedPracticePrompt: "Solve dy/dx = 2xy given y(0) = 4.",
          independentPracticePrompt: "Decompose (7x - 1)/[(x - 2)(x + 1)] into partial fractions and integrate.",
          extensionActivity: "Derive Newton's Law of Cooling T(t) = T_env + (T_0 - T_env)e^{-kt} from dT/dt = -k(T - T_env).",
          diagnosticSelfCheck: "Can you explain why dy/dx = x + y is NOT separable whereas dy/dx = x e^y IS separable?",
          transferApplication: "Model radioactive isotope decay dm/dt = -λm to derive the half-life formula t_{1/2} = ln(2)/λ.",
          masteryAssessment: "Find the particular solution of (1 + x^2) dy/dx = 2xy with y(0) = 3.",
          summaryRecap: "Separate f(x)dx from [1/g(y)]dy, decompose quadratic denominators via partial fractions, integrate carefully with C, and enforce boundary values.",
          estimatedMinutes: 125
        },
        questions: [
          {
            id: "q-p1-fm-ode-1",
            type: "multiple_choice",
            questionText: "Find the general solution of the separable differential equation:",
            mathExpression: "\\frac{dy}{dx} = 3x^2 y \\quad (y > 0)",
            options: ["y = A e^{x^3}", "y = x^3 + C", "y = 3x^2 e^{C}", "y = A e^{3x^2}"],
            correctAnswer: "y = A e^{x^3}",
            explanation: "Separate variables: (1/y) dy = 3x^2 dx. Integrating gives ln(y) = x^3 + C, hence y = e^{x^3 + C} = A e^{x^3}.",
            hintLadder: [
              "Divide both sides by y and multiply by dx.",
              "Integrate 1/y to ln(y) and 3x^2 to x^3.",
              "Exponentiate ln(y) = x^3 + C cleanly."
            ],
            misconceptionAlerts: [
              { trigger: "y = A e^{3x^2}", note: "Remember to integrate 3x^2 to x^3 before placing it in the exponent." }
            ],
            skillId: "skill-fm-first-order-ode",
            difficulty: "easy",
            curriculumStandard: "CAMBRIDGE_AS_A_LEVEL"
          },
          {
            id: "q-p1-fm-ode-2",
            type: "multiple_choice",
            questionText: "Express the rational function in partial fractions:",
            mathExpression: "\\frac{6}{(x - 2)(x + 1)}",
            options: [
              "\\frac{2}{x - 2} - \\frac{2}{x + 1}",
              "\\frac{2}{x - 2} + \\frac{2}{x + 1}",
              "\\frac{3}{x - 2} - \\frac{3}{x + 1}",
              "\\frac{6}{x - 2} - \\frac{6}{x + 1}"
            ],
            correctAnswer: "\\frac{2}{x - 2} - \\frac{2}{x + 1}",
            explanation: "6 = A(x + 1) + B(x - 2). Setting x = 2 gives 3A = 6 => A = 2; setting x = -1 gives -3B = 6 => B = -2.",
            hintLadder: [
              "Write 6 = A(x + 1) + B(x - 2).",
              "Substitute x = 2 to eliminate B and find A.",
              "Substitute x = -1 to eliminate A and find B."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{2}{x - 2} + \\frac{2}{x + 1}", note: "Adding the fractions would give 4x - 2 in the numerator instead of constant 6." }
            ],
            skillId: "skill-fm-first-order-ode",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-fm-ode-3",
            type: "multiple_choice",
            questionText: "Find the particular solution passing through (0, 2) for:",
            mathExpression: "\\frac{dy}{dx} = \\frac{e^x}{2y}",
            options: ["y^2 = e^x + 3", "y^2 = e^x + 4", "y = e^x + 1", "y^2 = 2e^x + 2"],
            correctAnswer: "y^2 = e^x + 3",
            explanation: "2y dy = e^x dx => y^2 = e^x + C. Substituting x = 0, y = 2: 4 = e^0 + C = 1 + C => C = 3.",
            hintLadder: [
              "Separate variables: 2y dy = e^x dx.",
              "Integrate both sides: y^2 = e^x + C.",
              "Plug in x = 0 and y = 2, remembering e^0 = 1."
            ],
            misconceptionAlerts: [
              { trigger: "y^2 = e^x + 4", note: "Remember e^0 = 1, not 0, so C = 4 - 1 = 3." }
            ],
            skillId: "skill-fm-first-order-ode",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_AS_A_LEVEL"
          },
          {
            id: "q-p1-fm-ode-4",
            type: "multiple_choice",
            questionText: "Given dy/dx = -2y + 6 with y(0) = 5, determine the particular solution y(x).",
            mathExpression: "\\frac{dy}{dx} = -2(y - 3)",
            options: ["y = 3 + 2e^{-2x}", "y = 5e^{-2x} + 3", "y = 3 - 2e^{-2x}", "y = 2e^{2x} + 3"],
            correctAnswer: "y = 3 + 2e^{-2x}",
            explanation: "1/(y - 3) dy = -2 dx => ln|y - 3| = -2x + C => y - 3 = Ae^{-2x}. At x = 0, 5 - 3 = A => A = 2, so y = 3 + 2e^{-2x}.",
            hintLadder: [
              "Factor -2 out: dy/dx = -2(y - 3).",
              "Integrate 1/(y - 3) dy = -2 dx to obtain y - 3 = Ae^{-2x}.",
              "Evaluate A using y(0) = 5."
            ],
            misconceptionAlerts: [
              { trigger: "y = 5e^{-2x} + 3", note: "At x = 0, 5e^0 + 3 = 8, failing the initial condition y(0) = 5." }
            ],
            skillId: "skill-fm-first-order-ode",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_AS_A_LEVEL"
          },
          {
            id: "q-p1-fm-ode-5",
            type: "multiple_choice",
            questionText: "Find the particular solution of the differential equation given y(0) = 2:",
            mathExpression: "(1 + x^2)\\frac{dy}{dx} = 2xy",
            options: ["y = 2(1 + x^2)", "y = 2e^{x^2}", "y = 2\\sqrt{1 + x^2}", "y = 1 + x^2"],
            correctAnswer: "y = 2(1 + x^2)",
            explanation: "(1/y) dy = [2x / (1 + x^2)] dx. Integrating gives ln|y| = ln(1 + x^2) + C => y = A(1 + x^2). With y(0) = 2, A = 2.",
            hintLadder: [
              "Separate into (1/y) dy = [2x / (1 + x^2)] dx.",
              "Notice the numerator 2x is the exact derivative of (1 + x^2).",
              "Integrate to ln|y| = ln(1 + x^2) + C and evaluate at x = 0, y = 2."
            ],
            misconceptionAlerts: [
              { trigger: "y = 2\\sqrt{1 + x^2}", note: "A factor of 1/2 would appear only if numerator were x rather than 2x." }
            ],
            skillId: "skill-fm-first-order-ode",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_AS_A_LEVEL"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p1-hall-engineering-statics",
    subjectId: "hall_engineering_gate_prep",
    level: "university_prep",
    title: "Pre-Engineering Statics: Equilibrium, Moments & Beam Reactions",
    code: "ENG-STAT-501",
    description:
      "Orthogonal 2D force decomposition, coplanar particle equilibrium (Lami's theorem), rigid-body rotational moments, and simply supported beam reactions.",
    order: 2,
    category: "applied",
    estimatedHours: 5.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "UNIVERSITY_PREPARATION:ENG-STATICS-101",
      "CAMBRIDGE_AS_A_LEVEL:9709-MECH-EQUIL",
      "GLOBAL_STEM:STATICS-MOMENTS"
    ],
    skills: [
      {
        id: "skill-eng-statics-equilibrium",
        unitId: "unit-p1-hall-engineering-statics",
        title: "2D Force Resolution, Static Moments & Beam Equilibrium",
        code: "SKL-ENG-STAT-501",
        summary:
          "Enforce the three rigid-body equilibrium conditions ΣF_x = 0, ΣF_y = 0, and ΣM_O = 0 across truss joints, cables, and loaded beams.",
        objectives: [
          "Resolve coplanar forces into orthogonal components F_x = F cos θ and F_y = F sin θ",
          "Apply Lami's theorem P/sin α = Q/sin β = R/sin γ to three-force particle equilibrium",
          "Compute support reactions R_A and R_B on simply supported beams under point and distributed loads"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-sine-cosine-rule", "skill-matrix-operations"],
        lesson: {
          id: "les-eng-statics-equilibrium",
          title: "K.A. Stroud Programme: Rigid-Body Statics, Moments & Beam Reactions",
          hookAndIntuition:
            "A suspension bridge hangs motionless under thousands of tonnes of traffic only because every vertical pull, horizontal tension, and rotational torque cancels to exact mathematical zero.",
          conceptualExplanation:
            "For any rigid body to remain in static equilibrium in a 2D plane, two translational conditions and one rotational condition must hold simultaneously: ΣF_x = 0, ΣF_y = 0, and ΣM_O = 0 about any pivot point O. A moment (torque) of force F about pivot O equals M = F × d_perp, where d_perp is the perpendicular distance from O to the line of action of F. On a simply supported uniform beam of span L resting on supports A and B, a uniformly distributed load (UDL) of w N/m acts effectively as a single concentrated force W = wL through its geometric midpoint. Choosing pivot O directly at support A eliminates the unknown R_A from the moment equation (since its lever arm is 0), immediately yielding R_B; checking ΣF_y = 0 then reveals R_A.",
          conceptualModel:
            "Free-Body Diagram  ==>  ΣF_x = 0  &  ΣF_y = 0  &  ΣM_pivot = 0 (Pick pivot on unknown reaction to eliminate it!).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "ΣF_x = 0,  ΣF_y = 0,  ΣM_O = 0",
              definition: "The three necessary and sufficient conditions for 2D rigid-body equilibrium.",
              practicalExample: "Clockwise moments about support A must equal anticlockwise moments about A."
            },
            {
              termOrSymbol: "M_O = F · d_perp = r F sin θ",
              definition: "Moment of a force F acting at lever distance r at angle θ to the position vector.",
              practicalExample: "A 40 N force at 2.5 m perpendicular lever arm produces 100 N·m torque."
            },
            {
              termOrSymbol: "Lami's Theorem: F_1 / sin α = F_2 / sin β = F_3 / sin γ",
              definition: "Sine proportionality for three concurrent coplanar forces in equilibrium.",
              practicalExample: "Symmetric 120° cables supporting W = 100 N each carry tension T = 100 N."
            }
          ],
          workedExamples: [
            {
              title: "Support Reactions of an Asymmetrically Loaded Uniform Beam",
              problemStatement: "A uniform beam AB of length 8 m and weight 200 N rests horizontally on supports at A (x = 0 m) and B (x = 8 m). A concentrated load of 600 N acts at x = 2 m from A. Find reactions R_A and R_B.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Draw the free-body diagram placing the beam's self-weight at its midpoint x = 4 m.",
                  reasoning: "Downward forces: 600 N at x = 2 m and 200 N at x = 4 m. Upward reactions: R_A at x = 0 and R_B at x = 8 m."
                },
                {
                  stepNumber: 2,
                  instruction: "Take moments about support A (ΣM_A = 0) to eliminate R_A.",
                  reasoning: "Clockwise: 600(2) + 200(4) = 1200 + 800 = 2000 N·m. Anticlockwise: R_B(8). So 8R_B = 2000 => R_B = 250 N."
                },
                {
                  stepNumber: 3,
                  instruction: "Enforce vertical force equilibrium (ΣF_y = 0) to calculate R_A.",
                  reasoning: "R_A + R_B = 600 + 200 = 800 N  ==>  R_A = 800 - 250 = 550 N."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify by taking moments independently about support B (ΣM_B = 0).",
                  reasoning: "Clockwise about B: 550(8) = 4400 N·m. Anticlockwise: 600(6) + 200(4) = 3600 + 800 = 4400 N·m (exact match!)."
                }
              ],
              takeawayRule: "Always verify beam calculations by checking moments around the opposite support; both moment equations must yield exact agreement."
            },
            {
              title: "Particle Equilibrium via Orthogonal Resolution",
              problemStatement: "A 120 N traffic lamp hangs in equilibrium from a vertical post via two light cables: cable 1 makes 30° above the horizontal to the left, and cable 2 is horizontal to the right. Find tension T_1 in cable 1 and T_2 in cable 2.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Resolve forces into horizontal (x) and vertical (y) components.",
                  reasoning: "Cable 1: (-T_1 cos 30°, +T_1 sin 30°); Cable 2: (+T_2, 0); Weight: (0, -120 N)."
                },
                {
                  stepNumber: 2,
                  instruction: "Apply ΣF_y = 0 since cable 2 has zero vertical component.",
                  reasoning: "T_1 sin 30° - 120 = 0  ==>  0.5 T_1 = 120  ==>  T_1 = 240 N."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply ΣF_x = 0 to solve for horizontal tension T_2.",
                  reasoning: "T_2 - T_1 cos 30° = 0  ==>  T_2 = 240 × (√3 / 2) = 120√3 ≈ 207.8 N."
                },
                {
                  stepNumber: 4,
                  instruction: "Cross-check using Lami's theorem with opposite angles 90°, 120°, 150°.",
                  reasoning: "120 / sin 150° = T_1 / sin 90° => 120 / 0.5 = 240 N = T_1 (verified)."
                }
              ],
              takeawayRule: "Start equilibrium algebra along whichever axis contains only ONE unknown force component."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting the self-weight of a uniform beam when computing support reactions.",
              whyItIsWrong: "A non-light (uniform) beam always exerts its full weight downward at L/2, changing both R_A and R_B.",
              correctCorrection: "Read carefully for 'uniform beam of mass/weight M' versus 'light rigid rod'; include self-weight at the geometric centre."
            },
            {
              misconception: "Using angled beam distances without multiplying by sin θ in M = rF sin θ.",
              whyItIsWrong: "Only the force component perpendicular to the lever arm creates rotational torque.",
              correctCorrection: "Measure lever arm perpendicularly to the force's line of action or resolve F into F sin θ."
            }
          ],
          guidedPracticePrompt: "Two orthogonal forces of 9 N East and 12 N North act on a point mass. Find the magnitude and bearing of the single balancing force.",
          independentPracticePrompt: "A 6 m light beam supported at x = 0 and x = 4 m carries 100 N at the overhanging tip x = 6 m. Find reactions at both supports.",
          extensionActivity: "Analyze why an overhanging beam can produce a negative (uplift) reaction requiring a bolted hold-down.",
          diagnosticSelfCheck: "Why does placing the moment pivot on support A vanish R_A from the torque equation?",
          transferApplication: "Calculate the counterweight required on a 12 m tower crane boom lifting 40 kN at 9 m radius if counterweight sits at 3 m behind the mast.",
          masteryAssessment: "Determine resultant force magnitude and direction of three concurrent forces: 20 N at 0°, 30 N at 60°, and 10 N at 180°.",
          summaryRecap: "Resolve forces orthogonally, eliminate unknowns smartly via pivot selection, and verify equilibrium across ΣF_x = 0, ΣF_y = 0, and ΣM = 0.",
          estimatedMinutes: 125
        },
        questions: [
          {
            id: "q-p1-eng-stat-1",
            type: "multiple_choice",
            questionText: "Two perpendicular forces of 12 N (horizontal) and 5 N (vertical) act on a pin joint. What is the magnitude of the single equilibrant force needed to maintain equilibrium?",
            mathExpression: "|\\mathbf{R}| = \\sqrt{F_x^2 + F_y^2}",
            options: ["13 N", "17 N", "7 N", "60 N"],
            correctAnswer: "13 N",
            explanation: "Resultant magnitude = √(12^2 + 5^2) = √(144 + 25) = √169 = 13 N; the equilibrant has equal magnitude 13 N in the opposite direction.",
            hintLadder: [
              "For orthogonal forces, the resultant magnitude follows Pythagoras.",
              "Compute 12^2 + 5^2 = 169.",
              "Take √169."
            ],
            misconceptionAlerts: [
              { trigger: "17 N", note: "12 + 5 = 17 N applies only if both forces are collinear in the same direction." }
            ],
            skillId: "skill-eng-statics-equilibrium",
            difficulty: "easy",
            curriculumStandard: "UNIVERSITY_PREPARATION"
          },
          {
            id: "q-p1-eng-stat-2",
            type: "multiple_choice",
            questionText: "A light horizontal rod of length 4 m is pivoted at its left end A and held by a vertical cable at its right end B. If a 100 N load hangs 1 m from A, find the tension in the cable at B.",
            mathExpression: "\\sum M_A = 0 \\implies T_B(4) = 100(1)",
            options: ["25 N", "75 N", "100 N", "50 N"],
            correctAnswer: "25 N",
            explanation: "Taking moments about pivot A: T_B × 4 = 100 × 1 => T_B = 100 / 4 = 25 N.",
            hintLadder: [
              "Take moments about pivot A so reaction R_A drops out.",
              "Clockwise load torque = 100 N × 1 m = 100 N·m.",
              "Divide by lever arm 4 m at B."
            ],
            misconceptionAlerts: [
              { trigger: "75 N", note: "75 N is the reaction carried by pivot A, not the cable tension at B." }
            ],
            skillId: "skill-eng-statics-equilibrium",
            difficulty: "easy",
            curriculumStandard: "UNIVERSITY_PREPARATION"
          },
          {
            id: "q-p1-eng-stat-3",
            type: "multiple_choice",
            questionText: "A uniform 6 m beam of weight 300 N rests on supports at both ends A and B. An additional 600 N machine sits 2 m from end A. Calculate the upward reaction at support B.",
            options: ["350 N", "550 N", "450 N", "300 N"],
            correctAnswer: "350 N",
            explanation: "Beam self-weight 300 N acts at midpoint 3 m from A. Moments about A: 6R_B = 600(2) + 300(3) = 1200 + 900 = 2100 => R_B = 350 N.",
            hintLadder: [
              "Place the 300 N beam weight at the midpoint (3 m from A).",
              "Sum clockwise moments about A: 600(2) + 300(3).",
              "Set equal to 6 R_B and solve."
            ],
            misconceptionAlerts: [
              { trigger: "550 N", note: "550 N is reaction R_A (900 - 350), not R_B." }
            ],
            skillId: "skill-eng-statics-equilibrium",
            difficulty: "medium",
            curriculumStandard: "UNIVERSITY_PREPARATION"
          },
          {
            id: "q-p1-eng-stat-4",
            type: "multiple_choice",
            questionText: "A 60 N mass hangs symmetrically from two identical wires, each inclined at 30° above the horizontal. What is the tension in each wire?",
            mathExpression: "2T \\sin 30^\\circ = 60\\text{ N}",
            options: ["60 N", "30 N", "34.6 N", "120 N"],
            correctAnswer: "60 N",
            explanation: "Vertical equilibrium: T sin 30° + T sin 30° = 60 => 2T(0.5) = 60 => T = 60 N.",
            hintLadder: [
              "Resolve each wire's tension vertically: T sin 30°.",
              "Two wires share the load: 2T sin 30° = 60.",
              "Remember sin 30° = 0.5."
            ],
            misconceptionAlerts: [
              { trigger: "30 N", note: "30 N is only the vertical component T sin 30°, whereas full wire tension T = 30 / 0.5 = 60 N." }
            ],
            skillId: "skill-eng-statics-equilibrium",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_AS_A_LEVEL"
          },
          {
            id: "q-p1-eng-stat-5",
            type: "multiple_choice",
            questionText: "A force of 50 N acts at the tip of a 2.0 m crank inclined at 37° to the crank axis (sin 37° ≈ 0.60, cos 37° ≈ 0.80). What is the torque magnitude about the pivot?",
            mathExpression: "\\tau = r F \\sin\\theta",
            options: ["60 N·m", "80 N·m", "100 N·m", "40 N·m"],
            correctAnswer: "60 N·m",
            explanation: "Only the perpendicular component F sin 37° produces rotation: τ = 2.0 × 50 × 0.60 = 60 N·m.",
            hintLadder: [
              "Torque equals lever arm r times the perpendicular force component F sin θ.",
              "Compute F_perp = 50 × sin 37° = 50 × 0.60 = 30 N.",
              "Multiply 30 N × 2.0 m."
            ],
            misconceptionAlerts: [
              { trigger: "80 N·m", note: "Using cos 37° measures the axial radial component passing straight through the pivot (zero torque)." }
            ],
            skillId: "skill-eng-statics-equilibrium",
            difficulty: "hard",
            curriculumStandard: "UNIVERSITY_PREPARATION"
          }
        ]
      }
    ]
  }
];
