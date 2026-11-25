import { Unit } from "../types/curriculum";

export const P1_MATH_BATCH2_JSS_UNITS: Unit[] = [
  // =========================================================================
  // 1. jss_199_ratio_proportion_rates_variation
  // =========================================================================
  {
    id: "unit-p1-jss-ratio-rates-variation",
    subjectId: "jss_199_ratio_proportion_rates_variation",
    level: "junior_secondary",
    title: "Ratio, Proportion, Compound Rates & Joint Variation",
    code: "JSS-VAR-199",
    description:
      "Master direct, inverse, joint, and partial variation equations, compound work and speed rates, currency conversions, and proportional mixture scaling.",
    order: 4,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-MTH-RAT-01",
      "BECE:MTH-VAR-199",
      "CAMBRIDGE_IGCSE:JSS-PRO-RAT"
    ],
    skills: [
      {
        id: "skill-jss-ratio-rates-variation",
        unitId: "unit-p1-jss-ratio-rates-variation",
        title: "Rates, Direct/Inverse & Joint Variation Modelling",
        code: "SKL-JSS-VAR-199",
        summary:
          "Translate verbal proportionality statements into constant-of-variation equations y = kx, y = k/x, and joint/partial laws y = a + bx.",
        objectives: [
          "Solve compound speed, density, and combined worker-rate problems using additive rates",
          "Construct and solve direct (y = kx), inverse (y = k/x²), and joint (z = kxy) variation models",
          "Separate fixed and variable cost components in partial variation systems y = a + bx"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-ratios-proportions", "skill-linear-equations"],
        lesson: {
          id: "les-jss-ratio-rates-variation",
          title: "Ratio, Rates & Algebraic Variation",
          hookAndIntuition:
            "Every physics and engineering formula is a proportionality law wearing an equal sign: doubling voltage doubles current (direct), while doubling distance quarters gravity (inverse square).",
          conceptualExplanation:
            "A rate compares two quantities with different units—such as kilometres per hour (speed), grams per cm³ (density), or tasks completed per hour (work rate). When two workers or pipes operate simultaneously, their individual work rates add together: 1/T_total = 1/T_A + 1/T_B.\n\nProportionality formalizes how variables respond to scaling through a constant of variation k. Direct variation (y ∝ x) gives y = kx; inverse variation (y ∝ 1/x) gives xy = k; joint variation combines multipliers (z ∝ x/y² gives z = kx/y²); and partial variation adds a fixed baseline plus a varying term: C = a + bn, requiring simultaneous equations to determine both constants a and b.",
          conceptualModel:
            "Direct: y = kx | Inverse: y = k/x | Joint: z = k·(numerator vars)/(denominator vars) | Partial: y = a + bx | Combined Work: R_total = R₁ + R₂.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Combined Rate Formula: 1/T = 1/t₁ + 1/t₂",
              definition: "When independent machines/workers act together, their fractional hourly outputs sum.",
              practicalExample: "If Pipe A fills a tank in 6 h and Pipe B in 3 h, together 1/T = 1/6 + 1/3 = 1/2 ⇒ T = 2 h."
            },
            {
              termOrSymbol: "Inverse-Square Law: y = k / x²",
              definition: "Doubling x shrinks y to one-quarter of its prior value because 2² = 4.",
              practicalExample: "If y = 40 when x = 3, then k = 40 × 9 = 360; at x = 6, y = 360 / 36 = 10."
            },
            {
              termOrSymbol: "Partial Variation: C = a + bn",
              definition: "Total cost equals fixed standing charge (a) plus per-unit variable charge (b × n).",
              practicalExample: "Taxi fare = ₦500 flag-fall + ₦150/km means C = 500 + 150d."
            }
          ],
          workedExamples: [
            {
              title: "Solving Joint Variation With Square & Inverse Terms",
              problemStatement: "Given y varies directly as x and inversely as √z, and y = 12 when x = 6 and z = 9, find y when x = 10 and z = 25.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Write the algebraic variation equation with constant k.",
                  reasoning: "Direct as x (numerator) and inverse as √z (denominator) gives y = kx / √z."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute initial values (y = 12, x = 6, z = 9) to solve for k.",
                  reasoning: "12 = k(6) / √9 = 6k / 3 = 2k, therefore k = 12 / 2 = 6."
                },
                {
                  stepNumber: 3,
                  instruction: "Write the explicit law using k = 6.",
                  reasoning: "The exact formula is y = 6x / √z."
                },
                {
                  stepNumber: 4,
                  instruction: "Substitute x = 10 and z = 25 to compute the new y.",
                  reasoning: "y = 6(10) / √25 = 60 / 5 = 12."
                }
              ],
              takeawayRule: "Always solve cleanly for k first, rewrite the full formula, then substitute the target values."
            },
            {
              title: "Partial Variation System for Event Catering Cost",
              problemStatement: "Catering cost C is partly constant and partly varies directly with guest count n. For 20 guests C = ₦55,000, and for 50 guests C = ₦115,000. Find C for 80 guests.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Model partial variation with two constants a and b.",
                  reasoning: "C = a + bn, where a is fixed hall setup cost and b is per-guest meal cost."
                },
                {
                  stepNumber: 2,
                  instruction: "Form two linear equations and subtract to eliminate a.",
                  reasoning: "Subtracting (55,000 = a + 20b) from (115,000 = a + 50b) gives 60,000 = 30b, so b = ₦2,000 per guest."
                },
                {
                  stepNumber: 3,
                  instruction: "Back-substitute b = 2,000 to determine the fixed cost a.",
                  reasoning: "55,000 = a + 20(2,000) ⇒ a = 55,000 − 40,000 = ₦15,000."
                },
                {
                  stepNumber: 4,
                  instruction: "Evaluate C = 15,000 + 2,000n at n = 80.",
                  reasoning: "C = 15,000 + 2,000(80) = 15,000 + 160,000 = ₦175,000."
                }
              ],
              takeawayRule: "In partial variation, subtracting two data points immediately eliminates the fixed constant to isolate the unit rate."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing partial variation as C = kn instead of C = a + bn.",
              whyItIsWrong: "A fixed standing fee means C is non-zero even when n = 0; ratios C/n are not constant.",
              correctCorrection: "Include an additive constant term whenever the phrasing says 'partly constant and partly varies'."
            },
            {
              misconception: "Averaging worker completion times (e.g., (6 + 3)/2 = 4.5 h) instead of adding rates.",
              whyItIsWrong: "Two workers helping together must finish faster than the fastest single worker (< 3 h).",
              correctCorrection: "Convert times to rates per hour (1/6 + 1/3 = 1/2), then invert to find combined time (2 h)."
            }
          ],
          guidedPracticePrompt: "If P varies inversely as V and P = 240 kPa when V = 2.5 L, find P when V = 4.0 L.",
          independentPracticePrompt: "Pump A fills a reservoir in 12 h and Pump B in 4 h. How long do both pumps take working together?",
          extensionActivity: "Plot y = 12/x for x = 1, 2, 3, 4, 6, 12 and verify every rectangle under the curve has constant area 12.",
          diagnosticSelfCheck: "If z = kx/y and x triples while y halves, by what factor does z change?",
          transferApplication: "Compare two electricity tariffs (fixed meter fee + kWh rate vs flat kWh rate) to find the break-even usage.",
          masteryAssessment: "Solve for x when y = 32 given y varies directly as x² and y = 18 when x = 3.",
          summaryRecap: "Convert proportional phrasing into explicit constant equations (k), add rates rather than times, and solve partial variation as a 2-equation linear system.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-var-1",
            type: "multiple_choice",
            questionText: "If y varies directly as x, and y = 35 when x = 5, find the value of y when x = 9.",
            mathExpression: "y = kx \\implies k = ?",
            options: ["63", "45", "56", "72"],
            correctAnswer: "63",
            explanation: "Constant k = y/x = 35/5 = 7. Thus at x = 9, y = 7 × 9 = 63.",
            hintLadder: [
              "Write y = kx and substitute y = 35, x = 5.",
              "Find k = 35 ÷ 5 = 7.",
              "Multiply k by x = 9."
            ],
            misconceptionAlerts: [
              { trigger: "45", note: "Adding 4 to 35 ignores multiplicative scaling." }
            ],
            skillId: "skill-jss-ratio-rates-variation",
            difficulty: "easy"
          },
          {
            id: "q-jss-var-2",
            type: "multiple_choice",
            questionText: "8 technicians can wire a computer lab in 15 days. Assuming equal work rates, how many days will 12 technicians take?",
            mathExpression: "w_1 d_1 = w_2 d_2",
            options: ["10 days", "22.5 days", "12 days", "8 days"],
            correctAnswer: "10 days",
            explanation: "Total technician-days = 8 × 15 = 120. With 12 technicians, days = 120 ÷ 12 = 10 days.",
            hintLadder: [
              "More technicians require fewer days, so this is inverse proportion.",
              "Total work = 8 × 15 = 120 technician-days.",
              "Divide 120 by 12 technicians."
            ],
            misconceptionAlerts: [
              { trigger: "22.5 days", note: "That treats workers and days as direct proportion, which makes more workers slower." }
            ],
            skillId: "skill-jss-ratio-rates-variation",
            difficulty: "easy"
          },
          {
            id: "q-jss-var-3",
            type: "multiple_choice",
            questionText: "y varies inversely as the square of x. If y = 20 when x = 3, calculate y when x = 6.",
            mathExpression: "y = \\frac{k}{x^2}",
            options: ["5", "10", "40", "80"],
            correctAnswer: "5",
            explanation: "k = y × x² = 20 × 3² = 180. When x = 6, y = 180 / 6² = 180 / 36 = 5.",
            hintLadder: [
              "Find k = y × x² = 20 × 9 = 180.",
              "At x = 6, compute x² = 36.",
              "Divide 180 by 36."
            ],
            misconceptionAlerts: [
              { trigger: "10", note: "Remember x is squared: doubling x divides y by 2² = 4, not by 2." }
            ],
            skillId: "skill-jss-ratio-rates-variation",
            difficulty: "medium"
          },
          {
            id: "q-jss-var-4",
            type: "multiple_choice",
            questionText: "Tap A fills a tank alone in 10 hours, while Tap B fills the same tank in 15 hours. How many hours are needed if both taps run together?",
            mathExpression: "\\frac{1}{T} = \\frac{1}{10} + \\frac{1}{15}",
            options: ["6 hours", "12.5 hours", "5 hours", "25 hours"],
            correctAnswer: "6 hours",
            explanation: "Combined hourly rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6 tank per hour, so total time T = 6 hours.",
            hintLadder: [
              "Compute hourly fill fractions: 1/10 and 1/15.",
              "Add fractions with common denominator 30: 3/30 + 2/30 = 5/30 = 1/6.",
              "Invert 1/6 to get total fill time in hours."
            ],
            misconceptionAlerts: [
              { trigger: "12.5 hours", note: "Never average times; add hourly rates instead." }
            ],
            skillId: "skill-jss-ratio-rates-variation",
            difficulty: "medium"
          },
          {
            id: "q-jss-var-5",
            type: "multiple_choice",
            questionText: "The printing cost C is partly constant and partly varies directly with copies n. For 100 copies C = ₦14,000, and for 250 copies C = ₦26,000. What is the total cost for 400 copies?",
            mathExpression: "C = a + bn",
            options: ["₦38,000", "₦41,600", "₦36,000", "₦42,000"],
            correctAnswer: "₦38,000",
            explanation: "Subtracting: 26,000 − 14,000 = (250 − 100)b ⇒ 12,000 = 150b ⇒ b = ₦80/copy. Fixed a = 14,000 − 100(80) = ₦6,000. At n = 400: C = 6,000 + 80(400) = ₦38,000.",
            hintLadder: [
              "Use ΔC / Δn = (26,000 − 14,000) / (250 − 100) to find unit cost b.",
              "Substitute b = 80 into 14,000 = a + 100b to find fixed cost a = 6,000.",
              "Evaluate C = 6,000 + 80 × 400."
            ],
            misconceptionAlerts: [
              { trigger: "₦41,600", note: "41,600 scales 26,000 linearly without accounting for the fixed baseline cost a = ₦6,000." }
            ],
            skillId: "skill-jss-ratio-rates-variation",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. jss_200_sets_venn_diagrams_mathematical_logi
  // =========================================================================
  {
    id: "unit-p1-jss-sets-venn-logic",
    subjectId: "jss_200_sets_venn_diagrams_mathematical_logi",
    level: "junior_secondary",
    title: "Set Theory, Venn Diagrams & Propositional Logic",
    code: "JSS-SET-200",
    description:
      "Master roster vs set-builder notation, subsets (2ⁿ), union/intersection/complement operations, 2- and 3-set Venn inclusion-exclusion problems, and truth tables.",
    order: 5,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-MTH-SET-01",
      "WAEC_WASSCE:MTH-SET-200",
      "CAMBRIDGE_IGCSE:JSS-SET-VENN"
    ],
    skills: [
      {
        id: "skill-jss-sets-venn-logic",
        unitId: "unit-p1-jss-sets-venn-logic",
        title: "Venn Inclusion-Exclusion, Set Operations & Truth Tables",
        code: "SKL-JSS-SET-200",
        summary:
          "Apply n(A ∪ B) = n(A) + n(B) − n(A ∩ B), De Morgan's laws, subset counting 2ⁿ, and logical connectives (∧, ∨, →).",
        objectives: [
          "Compute unions, intersections, complements, and symmetric differences from universal sets U",
          "Solve 2-set and 3-set Venn survey problems starting from the innermost intersection",
          "Evaluate logical negations and compound truth values for AND (∧), OR (∨), and IF-THEN (→)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-logical-deduction", "skill-linear-equations"],
        lesson: {
          id: "les-jss-sets-venn-logic",
          title: "Set Algebra, Venn Diagrams & Logical Connectives",
          hookAndIntuition:
            "Every database search filter, biological classification tree, and scholarship eligibility rule runs on set intersections and Boolean logic.",
          conceptualExplanation:
            "A set is a well-defined collection of distinct elements. Within a universal set U, the complement A' contains everything in U outside A; the intersection A ∩ B holds elements shared by both; and the union A ∪ B holds elements in at least one. When counting elements in two overlapping sets, simple addition counts the overlap A ∩ B twice, so the Inclusion-Exclusion Principle corrects this: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).\n\nA finite set with n elements possesses exactly 2ⁿ subsets (including the empty set ∅ and the set itself), and 2ⁿ − 1 proper subsets. In mathematical logic, statements p and q combine via conjunction p ∧ q (true only when both are true), disjunction p ∨ q (true when at least one is true), and implication p → q (false only when hypothesis p is true and conclusion q is false). De Morgan's laws link set complements and logical negations: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'.",
          conceptualModel:
            "Fill Venn inside-out (intersection x first) | n(A ∪ B) = n(A) + n(B) − n(A ∩ B) | Subsets = 2ⁿ | (A ∪ B)' = A' ∩ B'.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Inclusion-Exclusion: n(A ∪ B) = n(A) + n(B) − n(A ∩ B)",
              definition: "Prevents double-counting elements belonging to both A and B.",
              practicalExample: "If n(A) = 22, n(B) = 18, n(A ∩ B) = 7, then n(A ∪ B) = 22 + 18 − 7 = 33."
            },
            {
              termOrSymbol: "Subset Count: |P(A)| = 2ⁿ",
              definition: "Each of the n elements has 2 independent choices: included or excluded.",
              practicalExample: "Set {a, b, c, d} has 2⁴ = 16 subsets and 15 proper subsets."
            },
            {
              termOrSymbol: "De Morgan's Law: (A ∪ B)' = A' ∩ B'",
              definition: "Not in (A or B) is logically identical to (not in A) AND (not in B).",
              practicalExample: "Students taking neither Physics nor Chemistry form (P ∪ C)' = P' ∩ C'."
            }
          ],
          workedExamples: [
            {
              title: "Solving a 2-Set Venn Survey Problem With Unknown Overlap",
              problemStatement: "In a class of 50 students, 32 take Biology, 27 take Chemistry, and 5 take neither subject. How many take ONLY Biology?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Subtract those taking neither from the universal total to get n(B ∪ C).",
                  reasoning: "n(B ∪ C) = n(U) − n((B ∪ C)') = 50 − 5 = 45 students take at least one."
                },
                {
                  stepNumber: 2,
                  instruction: "Apply Inclusion-Exclusion to isolate the intersection n(B ∩ C).",
                  reasoning: "45 = 32 + 27 − x ⇒ 45 = 59 − x ⇒ x = 59 − 45 = 14 students take both."
                },
                {
                  stepNumber: 3,
                  instruction: "Subtract the intersection from total Biology students to get 'Biology ONLY'.",
                  reasoning: "n(B ∩ C') = n(B) − n(B ∩ C) = 32 − 14 = 18."
                },
                {
                  stepNumber: 4,
                  instruction: "Check that all four disjoint Venn regions sum to 50.",
                  reasoning: "18 (Bio only) + 14 (Both) + 13 (Chem only, 27−14) + 5 (Neither) = 50."
                }
              ],
              takeawayRule: "Always distinguish 'Biology' (whole circle = 32) from 'Biology only' (crescent = 32 − 14 = 18)."
            },
            {
              title: "Evaluating Implication & Contrapositive Truth Logic",
              problemStatement: "Determine the contrapositive and truth value of: 'If an integer n is divisible by 6, then n is even.'",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify hypothesis p and conclusion q.",
                  reasoning: "p: 'n is divisible by 6' and q: 'n is even'."
                },
                {
                  stepNumber: 2,
                  instruction: "Form the contrapositive ¬q → ¬p by negating and reversing.",
                  reasoning: "¬q → ¬p: 'If n is NOT even (odd), then n is NOT divisible by 6.'"
                },
                {
                  stepNumber: 3,
                  instruction: "Verify logical equivalence between p → q and ¬q → ¬p.",
                  reasoning: "Every multiple of 6 equals 6k = 2(3k), which is even; contrapositives always share identical truth value."
                },
                {
                  stepNumber: 4,
                  instruction: "Check why the converse q → p is distinct.",
                  reasoning: "Converse 'If n is even, then n is divisible by 6' is false (counterexample: n = 4)."
                }
              ],
              takeawayRule: "An implication p → q is always logically equivalent to its contrapositive ¬q → ¬p, never automatically to its converse q → p."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting to subtract 'neither' before applying n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
              whyItIsWrong: "Using n(U) instead of n(A ∪ B) treats outsiders as union members and undercounts the overlap.",
              correctCorrection: "First compute n(A ∪ B) = n(U) − n(neither), then solve for n(A ∩ B)."
            },
            {
              misconception: "Assuming the empty set ∅ is not counted among subsets of A.",
              whyItIsWrong: "∅ contains no element outside A, so ∅ ⊆ A holds for every set, making the total 2ⁿ.",
              correctCorrection: "Total subsets = 2ⁿ; proper subsets (excluding A itself) = 2ⁿ − 1."
            }
          ],
          guidedPracticePrompt: "Given U = {1..10}, A = {2, 4, 6, 8, 10}, B = {2, 3, 5, 7}, list A' ∩ B.",
          independentPracticePrompt: "A club of 40 members has 26 chess players, 21 coders, and 4 doing neither. Find members doing both.",
          extensionActivity: "Construct a 4-row truth table proving ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
          diagnosticSelfCheck: "How many subsets does P = {x ∈ ℕ : 2 < x ≤ 7} have?",
          transferApplication: "Design a database query using (Active ∩ Paid)' to target expired unpaid accounts.",
          masteryAssessment: "Given n(U) = 60, n(A) = 35, n(B) = 30, n(A' ∩ B') = 8, find n(A ∩ B).",
          summaryRecap: "Venn problems become effortless when you compute n(A ∪ B) cleanly, label the central overlap x first, and remember 2ⁿ subsets plus De Morgan's flip rule.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-set-1",
            type: "multiple_choice",
            questionText: "If P = {prime numbers less than 15}, how many subsets does set P contain?",
            mathExpression: "|\\mathcal{P}(P)| = 2^{n(P)}",
            options: ["64", "32", "128", "16"],
            correctAnswer: "64",
            explanation: "Primes < 15 are {2, 3, 5, 7, 11, 13}, so n(P) = 6. Total subsets = 2⁶ = 64.",
            hintLadder: [
              "List all primes strictly less than 15 carefully (note 1 is not prime).",
              "Count the elements: 2, 3, 5, 7, 11, 13 give 6 elements.",
              "Evaluate 2⁶."
            ],
            misconceptionAlerts: [
              { trigger: "128", note: "Remember 1 is neither prime nor composite, so P has 6 elements, not 7." }
            ],
            skillId: "skill-jss-sets-venn-logic",
            difficulty: "easy"
          },
          {
            id: "q-jss-set-2",
            type: "multiple_choice",
            questionText: "Given U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 2, 3, 5}, and B = {2, 4, 6, 8}, what is A' ∩ B?",
            mathExpression: "A' \\cap B",
            options: ["{4, 6, 8}", "{2}", "{4, 6, 7, 8}", "{1, 3, 5}"],
            correctAnswer: "{4, 6, 8}",
            explanation: "A' = {4, 6, 7, 8}. Intersecting with B = {2, 4, 6, 8} keeps common elements {4, 6, 8}.",
            hintLadder: [
              "Find A' by listing elements in U not in A: {4, 6, 7, 8}.",
              "Keep only elements from A' that also belong to B = {2, 4, 6, 8}.",
              "7 is not in B, leaving {4, 6, 8}."
            ],
            misconceptionAlerts: [
              { trigger: "{2}", note: "{2} is A ∩ B rather than A' ∩ B." }
            ],
            skillId: "skill-jss-sets-venn-logic",
            difficulty: "easy"
          },
          {
            id: "q-jss-set-3",
            type: "multiple_choice",
            questionText: "In a survey of 45 students, 28 like Mathematics, 24 like Physics, and 6 like neither. How many students like BOTH subjects?",
            mathExpression: "n(M \\cup P) = n(M) + n(P) - n(M \\cap P)",
            options: ["13", "7", "15", "19"],
            correctAnswer: "13",
            explanation: "n(M ∪ P) = 45 − 6 = 39. Using 39 = 28 + 24 − x gives x = 52 − 39 = 13.",
            hintLadder: [
              "First subtract the 6 students who like neither: 45 − 6 = 39.",
              "Add 28 + 24 = 52.",
              "Subtract 39 from 52 to get the overlap."
            ],
            misconceptionAlerts: [
              { trigger: "7", note: "Using 45 instead of 39 forgets to exclude the 6 students outside both sets." }
            ],
            skillId: "skill-jss-sets-venn-logic",
            difficulty: "medium"
          },
          {
            id: "q-jss-set-4",
            type: "multiple_choice",
            questionText: "In the same survey (45 students, 28 Math, 24 Physics, 6 neither), how many students like ONLY Physics?",
            mathExpression: "n(P \\cap M') = n(P) - n(M \\cap P)",
            options: ["11", "24", "15", "13"],
            correctAnswer: "11",
            explanation: "Since 13 like both, Physics-only = 24 − 13 = 11.",
            hintLadder: [
              "Take total Physics count (24).",
              "Subtract the intersection n(M ∩ P) = 13.",
              "24 − 13 = 11."
            ],
            misconceptionAlerts: [
              { trigger: "24", note: "24 includes the 13 students who also like Mathematics." }
            ],
            skillId: "skill-jss-sets-venn-logic",
            difficulty: "medium"
          },
          {
            id: "q-jss-set-5",
            type: "multiple_choice",
            questionText: "Which statement is ALWAYS logically equivalent to the implication: 'If a triangle is equilateral, then all three of its angles equal 60°'?",
            mathExpression: "(p \\to q) \\equiv (\\neg q \\to \\neg p)",
            options: [
              "If a triangle does not have all three angles equal to 60°, then it is not equilateral.",
              "If a triangle is not equilateral, then none of its angles equal 60°.",
              "If a triangle has one 60° angle, then it is equilateral.",
              "An equilateral triangle has two unequal angles."
            ],
            correctAnswer: "If a triangle does not have all three angles equal to 60°, then it is not equilateral.",
            explanation: "The contrapositive ¬q → ¬p is always logically equivalent to p → q. Negating q and p in reverse order yields the correct statement.",
            hintLadder: [
              "Identify p (equilateral) and q (all three angles = 60°).",
              "The contrapositive reverses and negates both: ¬q → ¬p.",
              "Notice the inverse ¬p → ¬q is not guaranteed equivalent."
            ],
            misconceptionAlerts: [
              { trigger: "If a triangle is not equilateral, then none of its angles equal 60°.", note: "That is a faulty inverse: a 30°-60°-90° triangle is not equilateral yet still has one 60° angle." }
            ],
            skillId: "skill-jss-sets-venn-logic",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. jss_201_transformations_loci_geometric_const
  // =========================================================================
  {
    id: "unit-p1-jss-transformations-loci",
    subjectId: "jss_201_transformations_loci_geometric_const",
    level: "junior_secondary",
    title: "Geometric Transformations, Loci & Compass Constructions",
    code: "JSS-LOC-201",
    description:
      "Master translations, reflections, coordinate rotations, enlargements (k² area scaling), the four Euclidean loci, and straightedge-and-compass constructions.",
    order: 6,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-GEO-02",
      "WAEC_WASSCE:MTH-TRN-201",
      "CAMBRIDGE_IGCSE:JSS-TRN-LOC"
    ],
    skills: [
      {
        id: "skill-jss-transformations-loci",
        unitId: "unit-p1-jss-transformations-loci",
        title: "Coordinate Transformations, Loci & Euclidean Constructions",
        code: "SKL-JSS-LOC-201",
        summary:
          "Apply exact matrix/coordinate mappings for reflection, rotation, translation, and enlargement, and determine intersecting geometric loci.",
        objectives: [
          "Map coordinates accurately under translations, reflections (x-axis, y-axis, y = x), and 90°/180° rotations",
          "Apply enlargement scale factor k for lengths and k² for areas from any center of enlargement",
          "Identify the 4 standard loci: equidistant from a point (circle), two points (perp. bisector), a line (parallel pair), and two lines (angle bisector)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-angles-plane-figures", "skill-jss-linear-graphs-coord"],
        lesson: {
          id: "les-jss-transformations-loci",
          title: "Transformations, Loci & Compass Constructions",
          hookAndIntuition:
            "Computer graphics engines animate characters using translations and rotations, while radio coverage zones and safety perimeters are drawn directly from geometric loci.",
          conceptualExplanation:
            "Rigid isometries preserve size and angles: translation shifts (x, y) → (x + a, y + b); reflection across the x-axis maps (x, y) → (x, −y), across the y-axis maps (−x, y), and across y = x swaps coordinates to (y, x); rotation about the origin by 90° anticlockwise maps (x, y) → (−y, x), 90° clockwise maps (y, −x), and 180° maps (−x, −y). Enlargement by scale factor k about center C(c₁, c₂) multiplies displacement vectors by k, scaling every length by |k| and every area by k².\n\nA locus is the complete set of points obeying a distance rule: (1) constant distance r from fixed point P forms a circle of radius r; (2) equidistant from two fixed points A and B forms the perpendicular bisector of AB; (3) constant distance d from a line segment forms parallel lines capped by semicircles; (4) equidistant from two intersecting lines forms their pair of perpendicular angle bisectors.",
          conceptualModel:
            "Rot 90° CCW: (x,y)→(-y,x) | Reflect y=x: (x,y)→(y,x) | Enlarge: Area × k² | Locus(A,B eq) = Perp. Bisector | Locus(2 lines eq) = Angle Bisector.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Origin Rotation 90° CCW: (x, y) → (−y, x)",
              definition: "Swaps coordinates and negates the new x-coordinate (equivalent to 270° clockwise).",
              practicalExample: "(3, 2) rotated 90° anticlockwise about (0, 0) lands at (−2, 3)."
            },
            {
              termOrSymbol: "Enlargement Area Scaling: A' = k² · A",
              definition: "If linear scale factor is k, image lengths multiply by |k| and area multiplies by k².",
              practicalExample: "Enlarging a 12 cm² triangle by k = 3 yields Area = 3² × 12 = 108 cm²."
            },
            {
              termOrSymbol: "Perpendicular Bisector Locus",
              definition: "Exact set of all points P satisfying PA = PB; constructed with compass radius > ½AB.",
              practicalExample: "A cellular tower serving Town A and Town B at equal distance must stand on AB's perpendicular bisector."
            }
          ],
          workedExamples: [
            {
              title: "Enlargement From a Non-Origin Center & Area Scaling",
              problemStatement: "A triangle with vertex P(4, 3) and area 6 cm² is enlarged by scale factor k = 2 about center C(1, 1). Find the image P' and the new area.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Find the displacement vector from center C(1, 1) to P(4, 3).",
                  reasoning: "CP = P − C = (4 − 1, 3 − 1) = (3, 2)."
                },
                {
                  stepNumber: 2,
                  instruction: "Scale the displacement vector by k = 2.",
                  reasoning: "CP' = 2 × (3, 2) = (6, 4)."
                },
                {
                  stepNumber: 3,
                  instruction: "Add the scaled vector back to center C(1, 1).",
                  reasoning: "P' = C + CP' = (1 + 6, 1 + 4) = (7, 5)."
                },
                {
                  stepNumber: 4,
                  instruction: "Multiply original area by k².",
                  reasoning: "New Area = 2² × 6 = 4 × 6 = 24 cm²."
                }
              ],
              takeawayRule: "Never multiply raw coordinates (4, 3) by k unless the center is (0, 0); always scale the relative vector (P − C) and add back to C."
            },
            {
              title: "Intersecting Two Loci to Site a Borehole",
              problemStatement: "A borehole B must lie strictly equidistant from houses X and Y, AND 40 m from well W. Describe the construction and number of possible sites if W lies 25 m from the perpendicular bisector of XY.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Construct the first locus: equidistant from points X and Y.",
                  reasoning: "Using equal compass arcs (> ½XY) centered at X and Y, draw the perpendicular bisector line L of XY."
                },
                {
                  stepNumber: 2,
                  instruction: "Construct the second locus: fixed distance 40 m from point W.",
                  reasoning: "Draw a circle centered at W with radius r = 40 m (scaled on map)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compare distance d = 25 m from W to line L against circle radius r = 40 m.",
                  reasoning: "Since d = 25 m < r = 40 m, the straight line L cuts through the interior of the circle."
                },
                {
                  stepNumber: 4,
                  instruction: "Determine the exact intersection solutions.",
                  reasoning: "A line strictly closer to the center than radius r intersects the circle at 2 distinct valid borehole points."
                }
              ],
              takeawayRule: "Translate 'equidistant from 2 points' → perpendicular bisector, and 'd from 1 point' → circle; check d < r for 2 intersections."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Multiplying coordinates directly by scale factor k when enlarging from a center other than (0, 0).",
              whyItIsWrong: "Direct multiplication fixes (0, 0) instead of C, shifting the entire image off its true position.",
              correctCorrection: "Always compute P' = C + k(P − C)."
            },
            {
              misconception: "Multiplying area by k instead of k² under enlargement.",
              whyItIsWrong: "Area is two-dimensional (length × width), so both dimensions scale by k, giving k².",
              correctCorrection: "Scale lengths by |k|, areas by k², and volumes by |k|³."
            }
          ],
          guidedPracticePrompt: "Find the image of A(−3, 5) after reflection in the line y = x followed by translation (−2, 4).",
          independentPracticePrompt: "Explain how compass arcs construct a 60° angle and then bisect it into 30° without a protractor.",
          extensionActivity: "Reflect triangle ABC over x = 1 and then over x = 4; prove the composite equals a single translation of +6 in x.",
          diagnosticSelfCheck: "What is the image of (5, −2) under 90° clockwise rotation about the origin?",
          transferApplication: "Use perpendicular bisectors of three cellular masts to locate a single point equidistant from all three (circumcenter).",
          masteryAssessment: "An image rectangle has area 225 cm² after enlarging a 25 cm² original. Find the positive scale factor k.",
          summaryRecap: "Track coordinate rules cleanly, scale relative vectors P − C by k (and areas by k²), and match the four Euclidean loci to compass constructions.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-loc-1",
            type: "multiple_choice",
            questionText: "What are the coordinates of the image of point A(4, −3) when reflected across the line y = x?",
            mathExpression: "(x, y) \\xrightarrow{y = x} (y, x)",
            options: ["(-3, 4)", "(-4, 3)", "(4, 3)", "(3, -4)"],
            correctAnswer: "(-3, 4)",
            explanation: "Reflection across y = x swaps the x- and y-coordinates: (4, −3) becomes (−3, 4).",
            hintLadder: [
              "In the mirror line y = x, x takes the value of y and y takes the value of x.",
              "Swap the two numbers (4, −3) while keeping their original signs.",
              "Result is (−3, 4)."
            ],
            misconceptionAlerts: [
              { trigger: "(4, 3)", note: "(4, 3) is reflection across the x-axis (y = 0), not across y = x." }
            ],
            skillId: "skill-jss-transformations-loci",
            difficulty: "easy"
          },
          {
            id: "q-jss-loc-2",
            type: "multiple_choice",
            questionText: "Which geometric locus consists of all points in a plane that are equidistant from two fixed points P and Q?",
            mathExpression: "AP = AQ",
            options: [
              "The perpendicular bisector of segment PQ",
              "A circle centered at P passing through Q",
              "A pair of lines parallel to PQ",
              "The angle bisector at vertex P"
            ],
            correctAnswer: "The perpendicular bisector of segment PQ",
            explanation: "By congruent right triangles, every point on the perpendicular bisector of PQ has equal distance to P and Q.",
            hintLadder: [
              "Pick the midpoint of PQ first—it is equidistant from P and Q.",
              "Moving straight up or down perpendicular to PQ keeps distances equal.",
              "This straight line is the perpendicular bisector of PQ."
            ],
            misconceptionAlerts: [
              { trigger: "A pair of lines parallel to PQ", note: "Parallel lines mark fixed distance from a single line, not two points." }
            ],
            skillId: "skill-jss-transformations-loci",
            difficulty: "easy"
          },
          {
            id: "q-jss-loc-3",
            type: "multiple_choice",
            questionText: "Point M(2, 5) is rotated 90° anticlockwise about the origin (0, 0). What are the coordinates of M'?",
            mathExpression: "(x, y) \\xrightarrow{90^{\\circ}\\text{ CCW}} (-y, x)",
            options: ["(-5, 2)", "(5, -2)", "(-2, -5)", "(5, 2)"],
            correctAnswer: "(-5, 2)",
            explanation: "A 90° anticlockwise turn about (0, 0) sends (x, y) from Quadrant I into Quadrant II as (−y, x) = (−5, 2).",
            hintLadder: [
              "Point (2, 5) starts in Quadrant I; turning 90° counter-clockwise moves it to Quadrant II where x < 0 and y > 0.",
              "Apply rule (x, y) → (−y, x).",
              "Substitute x = 2, y = 5 to get (−5, 2)."
            ],
            misconceptionAlerts: [
              { trigger: "(5, -2)", note: "(5, −2) is a 90° clockwise rotation, not anticlockwise." }
            ],
            skillId: "skill-jss-transformations-loci",
            difficulty: "medium"
          },
          {
            id: "q-jss-loc-4",
            type: "multiple_choice",
            questionText: "A polygon of area 18 cm² undergoes an enlargement with linear scale factor k = 2.5. What is the area of the enlarged image?",
            mathExpression: "A' = k^2 \\cdot A",
            options: ["112.5 cm²", "45.0 cm²", "90.0 cm²", "72.0 cm²"],
            correctAnswer: "112.5 cm²",
            explanation: "Area scales by k² = 2.5² = 6.25. Therefore A' = 6.25 × 18 = 112.5 cm².",
            hintLadder: [
              "Square the linear scale factor: 2.5² = 6.25.",
              "Multiply original area 18 cm² by 6.25.",
              "6 × 18 = 108 and 0.25 × 18 = 4.5, summing to 112.5 cm²."
            ],
            misconceptionAlerts: [
              { trigger: "45.0 cm²", note: "45 = 2.5 × 18 multiplies by k instead of k²." }
            ],
            skillId: "skill-jss-transformations-loci",
            difficulty: "medium"
          },
          {
            id: "q-jss-loc-5",
            type: "multiple_choice",
            questionText: "Triangle vertex V(5, 4) is enlarged with scale factor k = 3 from center C(2, 1). Find the image coordinates V'.",
            mathExpression: "V' = C + k(V - C)",
            options: ["(11, 10)", "(15, 12)", "(9, 9)", "(13, 11)"],
            correctAnswer: "(11, 10)",
            explanation: "Vector CV = (5−2, 4−1) = (3, 3). Scaled by k = 3 gives (9, 9). Adding to C(2, 1) yields V' = (2+9, 1+9) = (11, 10).",
            hintLadder: [
              "Subtract center C(2, 1) from V(5, 4) to get displacement (3, 3).",
              "Multiply displacement by k = 3 to get (9, 9).",
              "Add (9, 9) back to center C(2, 1)."
            ],
            misconceptionAlerts: [
              { trigger: "(15, 12)", note: "(15, 12) enlarges from (0, 0) instead of center C(2, 1)." }
            ],
            skillId: "skill-jss-transformations-loci",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. jss_202_pythagoras_similarity_congruence
  // =========================================================================
  {
    id: "unit-p1-jss-pythagoras-similarity",
    subjectId: "jss_202_pythagoras_similarity_congruence",
    level: "junior_secondary",
    title: "Pythagoras' Theorem, Similar Figures & Triangle Congruence",
    code: "JSS-PYT-202",
    description:
      "Master right-triangle hypotenuse and leg calculations, primitive Pythagorean triples, congruence proofs (SSS, SAS, ASA, RHS), and similarity scaling (k, k², k³).",
    order: 7,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-PYT-01",
      "BECE:MTH-SIM-202",
      "CAMBRIDGE_IGCSE:JSS-PYT-SIM"
    ],
    skills: [
      {
        id: "skill-jss-pythagoras-similarity",
        unitId: "unit-p1-jss-pythagoras-similarity",
        title: "Pythagorean Proofs, Congruence & Similarity Ratios",
        code: "SKL-JSS-PYT-202",
        summary:
          "Apply a² + b² = c² in 2D/3D right triangles, verify congruence via SSS/SAS/ASA/RHS, and solve similar shape length, area, and volume ratios.",
        objectives: [
          "Solve for hypotenuse or unknown leg using a² + b² = c² and recognize triples (3-4-5, 5-12-13, 8-15-17, 7-24-25)",
          "Justify triangle congruence accurately and reject invalid AAA / SSA combinations",
          "Use similarity scale factor k = L₂/L₁ to relate perimeters (k), areas (k²), and volumes (k³)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-angles-plane-figures", "skill-jss-indices-standard-form"],
        lesson: {
          id: "les-jss-pythagoras-similarity",
          title: "Pythagoras' Theorem, Congruence & Similarity",
          hookAndIntuition:
            "Builders check 90° foundations with a 3-4-5 tape measure, while aircraft engineers test small wind-tunnel models and scale lift and tank volume by k² and k³.",
          conceptualExplanation:
            "In any right-angled triangle, the square on the hypotenuse c (opposite the 90° angle) equals the sum of the squares on the two legs a and b: a² + b² = c². Notice that when finding a leg rather than the hypotenuse, you must SUBTRACT: a = √(c² − b²). Extending Pythagoras to 3D cuboids yields the space diagonal d = √(l² + w² + h²).\n\nTwo figures are congruent (≅) when they have identical size and shape—proved strictly by SSS, SAS (included angle), ASA/AAS, or RHS (Right-angle, Hypotenuse, Side). Two figures are similar (~) when corresponding angles match and all corresponding sides share a constant scale factor k = L_new / L_old. Similarity locks length ratio = k, area ratio = k², and volume ratio = k³.",
          conceptualModel:
            "Hypotenuse: c = √(a²+b²) | Leg: a = √(c²−b²) | Congruence: SSS, SAS, ASA, RHS (never AAA/SSA) | Similarity: Length k, Area k², Volume k³.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Converse of Pythagoras: a² + b² = c² ⇒ 90°",
              definition: "Any triangle whose side lengths satisfy a² + b² = c² must contain a right angle opposite side c.",
              practicalExample: "9-12-15 satisfies 81 + 144 = 225 = 15², confirming a right-angled triangle."
            },
            {
              termOrSymbol: "Similarity Scaling Chain: (L₁/L₂) : (A₁/A₂) = k² : (V₁/V₂) = k³",
              definition: "Cube root volume ratio to extract linear scale factor k, then square k for surface area ratio.",
              practicalExample: "If V_big / V_small = 27, then k = ∛27 = 3, so Surface Area ratio = 3² = 9."
            },
            {
              termOrSymbol: "Valid Congruence Criteria: SSS, SAS, ASA, RHS",
              definition: "Four deterministic tests guaranteeing identical side lengths and angles.",
              practicalExample: "Two triangles with matching 40°, 60°, 80° angles are SIMILAR (AAA), not necessarily congruent."
            }
          ],
          workedExamples: [
            {
              title: "Nested Similar Triangles (Parallel Base Intercept)",
              problemStatement: "In triangle ABC, DE is parallel to BC with D on AB and E on AC. Given AD = 6 cm, DB = 4 cm, and DE = 9 cm, calculate BC.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Establish AA similarity between small ΔADE and large ΔABC.",
                  reasoning: "Angle A is shared, and ∠ADE = ∠ABC (corresponding angles on DE ∥ BC), so ΔADE ~ ΔABC."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute the full side AB (not just segment DB).",
                  reasoning: "AB = AD + DB = 6 + 4 = 10 cm."
                },
                {
                  stepNumber: 3,
                  instruction: "Set up corresponding side ratios AB / AD = BC / DE.",
                  reasoning: "10 / 6 = BC / 9."
                },
                {
                  stepNumber: 4,
                  instruction: "Cross-multiply and simplify to find BC.",
                  reasoning: "BC = (10 × 9) / 6 = 90 / 6 = 15 cm."
                }
              ],
              takeawayRule: "In nested triangle-intercept problems, always use the full side AD + DB (10 cm) for the larger triangle, never the trapezoid piece DB (4 cm)."
            },
            {
              title: "Converting Volume Ratio to Surface Area Ratio via k",
              problemStatement: "Two geometrically similar water bottles hold 250 mL and 2,000 mL. If the smaller bottle uses 180 cm² of plastic label surface, how much surface area does the larger bottle use?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Divide the larger volume by the smaller volume to find k³.",
                  reasoning: "k³ = V_large / V_small = 2,000 / 250 = 8."
                },
                {
                  stepNumber: 2,
                  instruction: "Take the cube root to find the linear scale factor k.",
                  reasoning: "k = ∛8 = 2 (the larger bottle is twice as tall)."
                },
                {
                  stepNumber: 3,
                  instruction: "Square k to obtain the surface-area scaling ratio k².",
                  reasoning: "k² = 2² = 4."
                },
                {
                  stepNumber: 4,
                  instruction: "Multiply the smaller area by k².",
                  reasoning: "Area_large = 4 × 180 = 720 cm²."
                }
              ],
              takeawayRule: "Bridge volume ratios to area ratios by always stepping through linear scale factor k first: V ratio → ∛ → k → square → Area ratio."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding c² + b² when solving for a shorter right-triangle leg.",
              whyItIsWrong: "Adding produces a leg longer than the hypotenuse, which is geometrically impossible.",
              correctCorrection: "Identify the side opposite 90° first; add squares only when solving for that longest side."
            },
            {
              misconception: "Using segment DB = 4 instead of full side AB = 10 in ΔADE ~ ΔABC.",
              whyItIsWrong: "DB belongs to trapezoid DBCE, which is not a triangle.",
              correctCorrection: "Always sum AD + DB to form full side AB of the large triangle."
            }
          ],
          guidedPracticePrompt: "A 13 m ladder rests 5 m from a vertical wall. How high up the wall does it reach?",
          independentPracticePrompt: "Verify whether sides 8 cm, 15 cm, and 18 cm form a right triangle.",
          extensionActivity: "Use Pythagoras twice to find the longest straight rod fitting inside a 6 cm × 8 cm × 24 cm box.",
          diagnosticSelfCheck: "Why does AAA prove similarity rather than congruence?",
          transferApplication: "Calculate a 1:50 architectural floorplan's real room area when the blueprint room measures 12 cm².",
          masteryAssessment: "Two similar spheres have surface areas 36π cm² and 100π cm². Find the ratio of their volumes.",
          summaryRecap: "Apply c² = a² + b² cleanly, test congruence only via SSS/SAS/ASA/RHS, and move smoothly along k ↔ k² ↔ k³ for similar shapes.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-pyt-1",
            type: "multiple_choice",
            questionText: "A 17 m ladder leans against a vertical building with its base 8 m from the wall. How high up the wall does the ladder reach?",
            mathExpression: "h = \\sqrt{17^2 - 8^2}",
            options: ["15 m", "18.8 m", "9 m", "13 m"],
            correctAnswer: "15 m",
            explanation: "The ladder (17 m) is the hypotenuse. h = √(17² − 8²) = √(289 − 64) = √225 = 15 m.",
            hintLadder: [
              "Notice the slanted ladder is the hypotenuse (17 m), opposite the 90° wall-ground corner.",
              "Subtract: 17² − 8² = 289 − 64 = 225.",
              "Evaluate √225."
            ],
            misconceptionAlerts: [
              { trigger: "18.8 m", note: "Adding 17² + 8² makes the wall height longer than the ladder itself." }
            ],
            skillId: "skill-jss-pythagoras-similarity",
            difficulty: "easy"
          },
          {
            id: "q-jss-pyt-2",
            type: "multiple_choice",
            questionText: "Which of the following conditions is NOT sufficient on its own to prove two triangles are congruent?",
            mathExpression: "\\text{Congruence Tests}",
            options: [
              "AAA (three matching angles)",
              "SSS (three matching sides)",
              "SAS (two sides and the included angle)",
              "RHS (right angle, hypotenuse, and one side)"
            ],
            correctAnswer: "AAA (three matching angles)",
            explanation: "AAA guarantees that two triangles are similar (same shape), but one can be scaled up or down, so congruence requires at least one matching side length.",
            hintLadder: [
              "Think of an equilateral triangle of side 2 cm and one of side 10 cm.",
              "Both have 60°-60°-60° angles (AAA), yet different sizes.",
              "Congruence locks size as well as shape."
            ],
            misconceptionAlerts: [
              { trigger: "RHS (right angle, hypotenuse, and one side)", note: "RHS is valid because Pythagoras forces the third side to match." }
            ],
            skillId: "skill-jss-pythagoras-similarity",
            difficulty: "easy"
          },
          {
            id: "q-jss-pyt-3",
            type: "multiple_choice",
            questionText: "In ΔPQR, line ST is parallel to QR with S on PQ and T on PR. If PS = 6 cm, SQ = 3 cm, and ST = 8 cm, calculate the length of base QR.",
            mathExpression: "\\frac{PQ}{PS} = \\frac{QR}{ST}",
            options: ["12 cm", "4 cm", "11 cm", "16 cm"],
            correctAnswer: "12 cm",
            explanation: "Full side PQ = PS + SQ = 6 + 3 = 9 cm. By similarity ΔPST ~ ΔPQR: QR/8 = 9/6 ⇒ QR = (8 × 9)/6 = 12 cm.",
            hintLadder: [
              "Compute full side PQ = 6 + 3 = 9 cm.",
              "Use similar triangle ratio PQ / PS = 9 / 6 = 1.5.",
              "Multiply ST = 8 cm by 1.5."
            ],
            misconceptionAlerts: [
              { trigger: "4 cm", note: "Using SQ = 3 cm instead of full side PQ = 9 cm breaks corresponding triangle sides." }
            ],
            skillId: "skill-jss-pythagoras-similarity",
            difficulty: "medium"
          },
          {
            id: "q-jss-pyt-4",
            type: "multiple_choice",
            questionText: "Two similar cylindrical tanks have surface areas of 45 cm² and 180 cm². If the smaller tank holds 120 mL, how much does the larger tank hold?",
            mathExpression: "k^2 = \\frac{180}{45} \\implies V_2 = k^3 V_1",
            options: ["960 mL", "480 mL", "240 mL", "1,920 mL"],
            correctAnswer: "960 mL",
            explanation: "Area ratio k² = 180/45 = 4, so linear factor k = √4 = 2. Volume ratio k³ = 2³ = 8, hence V_large = 8 × 120 = 960 mL.",
            hintLadder: [
              "Divide surface areas: k² = 180 ÷ 45 = 4.",
              "Take square root to find linear scale factor k = 2.",
              "Cube k (2³ = 8) and multiply by 120 mL."
            ],
            misconceptionAlerts: [
              { trigger: "480 mL", note: "480 multiplies volume by k² = 4 instead of k³ = 8." }
            ],
            skillId: "skill-jss-pythagoras-similarity",
            difficulty: "medium"
          },
          {
            id: "q-jss-pyt-5",
            type: "multiple_choice",
            questionText: "Calculate the length of the longest straight diagonal from bottom-front-left to top-back-right inside a rectangular box measuring 3 cm × 4 cm × 12 cm.",
            mathExpression: "D = \\sqrt{l^2 + w^2 + h^2}",
            options: ["13 cm", "15 cm", "19 cm", "12.5 cm"],
            correctAnswer: "13 cm",
            explanation: "Base diagonal = √(3² + 4²) = √25 = 5 cm. Space diagonal = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.",
            hintLadder: [
              "First find the floor diagonal of the 3 × 4 rectangle: √(3² + 4²) = 5 cm.",
              "This 5 cm base forms a vertical right triangle with height 12 cm.",
              "Evaluate √(5² + 12²)."
            ],
            misconceptionAlerts: [
              { trigger: "19 cm", note: "19 simply adds 3 + 4 + 12 instead of applying 3D Pythagoras." }
            ],
            skillId: "skill-jss-pythagoras-similarity",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. jss_203_trigonometry_foundations_bearings
  // =========================================================================
  {
    id: "unit-p1-jss-trig-bearings",
    subjectId: "jss_203_trigonometry_foundations_bearings",
    level: "junior_secondary",
    title: "Right-Triangle Trigonometry (SOH-CAH-TOA), Elevation & 3-Figure Bearings",
    code: "JSS-TRG-203",
    description:
      "Master SOH-CAH-TOA ratios, special angles (30°, 45°, 60°), angles of elevation/depression, and 3-figure clockwise North navigation bearings.",
    order: 8,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-TRG-01",
      "WAEC_WASSCE:MTH-TRG-203",
      "CAMBRIDGE_IGCSE:JSS-TRG-BRG"
    ],
    skills: [
      {
        id: "skill-jss-trig-bearings",
        unitId: "unit-p1-jss-trig-bearings",
        title: "SOH-CAH-TOA Ratios, Elevation & 3-Figure Bearings",
        code: "SKL-JSS-TRG-203",
        summary:
          "Compute right-triangle sides and angles with sin/cos/tan, solve elevation/depression heights, and determine forward/back 3-figure bearings.",
        objectives: [
          "Label Opposite, Adjacent, and Hypotenuse relative to the reference acute angle θ",
          "Apply SOH-CAH-TOA and exact values of 30°, 45°, 60° to heights and distances",
          "Measure 3-figure bearings clockwise from North (000°–360°) and compute back-bearings ±180°"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-pythagoras-similarity", "skill-pri-angles-plane-figures"],
        lesson: {
          id: "les-jss-trig-bearings",
          title: "Trigonometry Foundations & 3-Figure Bearings",
          hookAndIntuition:
            "Surveyors measure skyscraper heights without climbing them and ships navigate open oceans using just two tools: right-triangle ratios and clockwise North bearings.",
          conceptualExplanation:
            "In a right-angled triangle containing acute angle θ, the Hypotenuse (H) sits opposite 90°, the Opposite (O) sits across from θ, and the Adjacent (A) touches θ. Three ratios link angle to shape: sin θ = O/H, cos θ = A/H, and tan θ = O/A (SOH-CAH-TOA). Inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) recover angle θ from side ratios. Exact special angles derive from half a square (tan 45° = 1, sin 45° = cos 45° = 1/√2) and half an equilateral triangle (sin 30° = cos 60° = 0.5, cos 30° = sin 60° = √3/2).\n\nAngles of elevation (looking up from horizontal) and depression (looking down from horizontal) are equal by alternate interior angles (Z-angles). Three-figure bearings always measure clockwise from true North (000°), written with three digits (e.g., 065°). Because North poles at any two points A and B are parallel, the back bearing from B to A equals Forward ± 180°.",
          conceptualModel:
            "sin θ = O/H | cos θ = A/H | tan θ = O/A | Elevation = Depression (Z-angle) | Bearing: 3 digits, Clockwise from North | Back Bearing = θ ± 180°.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "SOH-CAH-TOA: sin=O/H, cos=A/H, tan=O/A",
              definition: "Scale-invariant ratios depending solely on acute angle θ in any right triangle.",
              practicalExample: "If O = 10 m and θ = 30°, H = O / sin 30° = 10 / 0.5 = 20 m."
            },
            {
              termOrSymbol: "Back Bearing Rule: β_BA = β_AB ± 180°",
              definition: "Add 180° if forward bearing < 180°; subtract 180° if forward bearing ≥ 180°.",
              practicalExample: "If B is 072° from A, then A is 072° + 180° = 252° from B."
            },
            {
              termOrSymbol: "Exact Special Ratios (30°, 45°, 60°)",
              definition: "sin 30° = 1/2, tan 45° = 1, tan 60° = √3, sin 60° = √3/2.",
              practicalExample: "A 12 m shadow at 45° solar elevation implies tree height = 12 × tan 45° = 12 m."
            }
          ],
          workedExamples: [
            {
              title: "Cliff Height via Angle of Depression",
              problemStatement: "From the top of an observation tower 60 m above sea level, the angle of depression to a boat is 30°. Find the exact horizontal distance from the tower base to the boat.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Translate angle of depression at the top into angle of elevation at the boat.",
                  reasoning: "Horizontal sightline at top is parallel to sea level, so by alternate interior angles, elevation at boat = 30°."
                },
                {
                  stepNumber: 2,
                  instruction: "Identify Opposite (60 m) and Adjacent (horizontal distance d) relative to 30°.",
                  reasoning: "Height = 60 m is opposite 30°, and horizontal distance d is adjacent, selecting tangent."
                },
                {
                  stepNumber: 3,
                  instruction: "Substitute into tan 30° = O / A.",
                  reasoning: "tan 30° = 60 / d ⇒ 1/√3 = 60 / d."
                },
                {
                  stepNumber: 4,
                  instruction: "Solve for horizontal distance d.",
                  reasoning: "d = 60√3 m ≈ 103.9 m."
                }
              ],
              takeawayRule: "Angles of elevation and depression ALWAYS measure from a HORIZONTAL line, never from a vertical wall."
            },
            {
              title: "Navigation Triangle From Two Bearings",
              problemStatement: "A ship sails 12 km due North from port P to Q, then turns due East for 5 km to R. Find distance PR and the 3-figure bearing of R from P (nearest degree, given arctan(5/12) ≈ 22.6°).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Sketch the right-angled path at Q (North ⊥ East = 90°).",
                  reasoning: "PQ = 12 km vertically North; QR = 5 km horizontally East."
                },
                {
                  stepNumber: 2,
                  instruction: "Use Pythagoras to determine straight distance PR.",
                  reasoning: "PR = √(12² + 5²) = √(144 + 25) = √169 = 13 km."
                },
                {
                  stepNumber: 3,
                  instruction: "Find the clockwise angle θ from North PQ to segment PR.",
                  reasoning: "Opposite = QR = 5 km, Adjacent = PQ = 12 km, so tan θ = 5/12 ⇒ θ ≈ 22.6° ≈ 23°."
                },
                {
                  stepNumber: 4,
                  instruction: "Format as a 3-figure bearing clockwise from North.",
                  reasoning: "3-figure bearing of R from P is 023° (distance 13 km)."
                }
              ],
              takeawayRule: "Always draw a North arrow at the 'FROM' point and rotate clockwise to the target ray, padding single/double digits with a leading zero."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Measuring angle of depression down from the vertical cliff/tower wall instead of from the horizontal.",
              whyItIsWrong: "Using vertical flips Opposite and Adjacent, returning complement angle 90° − θ.",
              correctCorrection: "Draw a horizontal eye-level dashed line first; measure elevation up and depression down from that horizontal."
            },
            {
              misconception: "Reading bearing from the wrong station ('A from B' vs 'B from A').",
              whyItIsWrong: "Putting the North arrow on B instead of A gives the reverse direction (off by 180°).",
              correctCorrection: "Stand at the word AFTER 'from': 'bearing of B from A' anchors your North ray at A."
            }
          ],
          guidedPracticePrompt: "Evaluate cos 60° + sin 30° without a calculator.",
          independentPracticePrompt: "If town X bears 235° from town Y, calculate the bearing of Y from X.",
          extensionActivity: "Show using any right triangle that sin² θ + cos² θ = (O² + A²)/H² = 1.",
          diagnosticSelfCheck: "A ramp rises 3 m over a slant length of 6 m. What angle does it make with the horizontal?",
          transferApplication: "Compute safe solar panel tilt elevation angles and verify ladder 75° OSHA safety slope (cos 75°).",
          masteryAssessment: "An aircraft flies 40 km at bearing 090° then 40√3 km at bearing 000°. Find its net bearing from start.",
          summaryRecap: "Anchor every right-triangle problem with O/A/H labels, measure elevation/depression strictly from horizontal, and turn clockwise from North for 3-figure bearings.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-trg-1",
            type: "multiple_choice",
            questionText: "In a right-angled triangle, angle θ has Opposite = 9 cm and Adjacent = 12 cm. What is the exact value of sin θ?",
            mathExpression: "\\sin\\theta = \\frac{O}{H}",
            options: ["3/5", "3/4", "4/5", "4/3"],
            correctAnswer: "3/5",
            explanation: "First find hypotenuse H = √(9² + 12²) = √225 = 15 cm. Thus sin θ = O/H = 9/15 = 3/5.",
            hintLadder: [
              "9/12 gives tan θ, not sin θ. You need the hypotenuse H first.",
              "H = √(9² + 12²) = √(81 + 144) = 15 cm.",
              "Compute sin θ = 9 / 15 and simplify."
            ],
            misconceptionAlerts: [
              { trigger: "3/4", note: "3/4 is O/A = tan θ rather than O/H = sin θ." }
            ],
            skillId: "skill-jss-trig-bearings",
            difficulty: "easy"
          },
          {
            id: "q-jss-trg-2",
            type: "multiple_choice",
            questionText: "If the 3-figure bearing of Airport B from Airport A is 068°, what is the bearing of Airport A from Airport B?",
            mathExpression: "\\beta_{AB} = 068^{\\circ} \\implies \\beta_{BA} = ?",
            options: ["248°", "112°", "292°", "158°"],
            correctAnswer: "248°",
            explanation: "Since 068° < 180°, add 180° for the back bearing: 068° + 180° = 248°.",
            hintLadder: [
              "Draw parallel North arrows at A and B.",
              "Add 180° when the forward bearing is below 180°.",
              "68° + 180° = 248°."
            ],
            misconceptionAlerts: [
              { trigger: "112°", note: "180° − 68° = 112° is the co-interior angle at B, not the full clockwise bearing from North." }
            ],
            skillId: "skill-jss-trig-bearings",
            difficulty: "easy"
          },
          {
            id: "q-jss-trg-3",
            type: "multiple_choice",
            questionText: "Without a calculator, evaluate the exact expression: tan 45° + 2 sin 30°.",
            mathExpression: "\\tan 45^{\\circ} + 2\\sin 30^{\\circ}",
            options: ["2", "1 + √3", "1.5", "√2"],
            correctAnswer: "2",
            explanation: "tan 45° = 1 and sin 30° = 1/2. Substituting: 1 + 2(1/2) = 1 + 1 = 2.",
            hintLadder: [
              "Recall from the 45°-45°-90° triangle that tan 45° = 1.",
              "Recall from the 30°-60°-90° triangle that sin 30° = 1/2.",
              "Add 1 + 2(1/2)."
            ],
            misconceptionAlerts: [
              { trigger: "1.5", note: "Remember to multiply sin 30° by 2 before adding." }
            ],
            skillId: "skill-jss-trig-bearings",
            difficulty: "medium"
          },
          {
            id: "q-jss-trg-4",
            type: "multiple_choice",
            questionText: "A 20 m flagpole casts a horizontal shadow of length 20/√3 m. What is the angle of elevation of the Sun?",
            mathExpression: "\\tan\\theta = \\frac{20}{20/\\sqrt{3}}",
            options: ["60°", "30°", "45°", "75°"],
            correctAnswer: "60°",
            explanation: "tan θ = Height / Shadow = 20 / (20/√3) = √3. Since tan 60° = √3, elevation angle θ = 60°.",
            hintLadder: [
              "Height (20 m) is Opposite θ; shadow (20/√3 m) is Adjacent.",
              "Divide 20 by (20/√3) to get tan θ = √3.",
              "Which special angle has tangent equal to √3?"
            ],
            misconceptionAlerts: [
              { trigger: "30°", note: "tan 30° = 1/√3, which applies when the shadow is longer than the pole." }
            ],
            skillId: "skill-jss-trig-bearings",
            difficulty: "medium"
          },
          {
            id: "q-jss-trg-5",
            type: "multiple_choice",
            questionText: "From a point on level ground, the angle of elevation of the top of a mast is 30°. Walking 24 m closer toward the mast increases the elevation to 60°. Find the exact height h of the mast.",
            mathExpression: "\\frac{h}{\\tan 30^{\\circ}} - \\frac{h}{\\tan 60^{\\circ}} = 24",
            options: ["12√3 m", "24√3 m", "12 m", "8√3 m"],
            correctAnswer: "12√3 m",
            explanation: "Initial distance d₁ = h/tan 30° = h√3; closer distance d₂ = h/tan 60° = h/√3. Difference: h(√3 − 1/√3) = h(2/√3) = 24 ⇒ h = 12√3 m.",
            hintLadder: [
              "Write both ground distances in terms of height h: d₁ = h√3 and d₂ = h/√3.",
              "Set d₁ − d₂ = 24: h(3/√3 − 1/√3) = 24.",
              "Simplify 2h/√3 = 24 to solve for h."
            ],
            misconceptionAlerts: [
              { trigger: "24√3 m", note: "24√3 ignores the remaining distance d₂ from the second position to the mast." }
            ],
            skillId: "skill-jss-trig-bearings",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. jss_204_surface_area_volume_three_dimensiona
  // =========================================================================
  {
    id: "unit-p1-jss-surface-area-volume-3d",
    subjectId: "jss_204_surface_area_volume_three_dimensiona",
    level: "junior_secondary",
    title: "Surface Area, Volume & Three-Dimensional Solid Mensuration",
    code: "JSS-SOL-204",
    description:
      "Master unified prism volume V = A_base × h, cylinders, cones, pyramids (1/3 Ah), spheres, frustums, and composite solid nets with π accuracy.",
    order: 9,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-MEN-03",
      "WAEC_WASSCE:MTH-SOL-204",
      "CAMBRIDGE_IGCSE:JSS-3D-VOL"
    ],
    skills: [
      {
        id: "skill-jss-surface-area-volume-3d",
        unitId: "unit-p1-jss-surface-area-volume-3d",
        title: "Prisms, Cylinders, Cones, Pyramids & Sphere Mensuration",
        code: "SKL-JSS-SOL-204",
        summary:
          "Compute lateral/total surface area and volume for uniform prisms, circular cylinders, right cones, pyramids, spheres, and composite solids.",
        objectives: [
          "Compute prism volumes (V = Cross-section Area × Length) and lateral surface area (Perimeter × Length)",
          "Use Pythagoras (l² = r² + h²) to distinguish vertical height h from slant height l on cones and pyramids",
          "Evaluate sphere and hemisphere total surface areas (3πr² for solid hemisphere) and volume-conservation melting problems"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-perimeter-area-volume", "skill-jss-pythagoras-similarity"],
        lesson: {
          id: "les-jss-surface-area-volume-3d",
          title: "3D Solids: Surface Area & Volume",
          hookAndIntuition:
            "Every can, water tank, pyramid roof, and satellite dish uses the exact same two families: uniform cross-section extrusions (Ah) and tapered apex solids (⅓Ah).",
          conceptualExplanation:
            "Uniform solids (cuboids, triangular/trapezoidal prisms, circular cylinders) obey one universal volume formula: V = Area_cross × height (or length). Unrolling a cylinder's curved side yields a rectangle of width 2πr and height h, giving Curved Surface Area = 2πrh and Total Surface Area = 2πrh + 2πr².\n\nPointed solids tapering from base area A to an apex at perpendicular height h always hold exactly one-third the volume of the enclosing prism: V = ⅓ A_base h (so V_cone = ⅓πr²h). For surface area of a cone, use slant height l = √(r² + h²) in Curved Area = πrl. A sphere of radius r has Volume V = (4/3)πr³ and Surface Area = 4πr²; a solid hemisphere exposes a flat circular cut face, making its total surface area 2πr² + πr² = 3πr².",
          conceptualModel:
            "Uniform Prism/Cylinder: V = Ah | Tapered Cone/Pyramid: V = ⅓Ah, l² = r² + h² | Sphere: V = ⁴⁄₃πr³, A = 4πr² | Solid Hemisphere TSA = 3πr².",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Right Circular Cone: V = ⅓πr²h, TSA = πrl + πr²",
              definition: "Volume uses perpendicular height h; curved surface area uses slant height l = √(r² + h²).",
              practicalExample: "If r = 6 cm, h = 8 cm, then l = √(36+64) = 10 cm, CSA = 60π cm², V = 96π cm³."
            },
            {
              termOrSymbol: "Cylinder Unrolled Net: TSA = 2πrh + 2πr²",
              definition: "Curved wall unrolls to circumference × height; open-top tank uses + πr² once.",
              practicalExample: "Open-top cylindrical drum (r = 7, h = 10, π = 22/7): A = 2(22)(10) + 154 = 594 cm²."
            },
            {
              termOrSymbol: "Solid Hemisphere TSA = 3πr²",
              definition: "Curved dome (2πr²) plus newly exposed flat circular base (πr²).",
              practicalExample: "A solid wooden hemisphere of radius 10 cm has TSA = 3π(100) = 300π cm²."
            }
          ],
          workedExamples: [
            {
              title: "Separating Slant Height From Vertical Height in a Cone",
              problemStatement: "A closed right circular cone has base radius r = 5 cm and slant height l = 13 cm. Find (a) its Total Surface Area and (b) its Volume in terms of π.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute Total Surface Area directly from r and slant height l.",
                  reasoning: "TSA = πrl + πr² = π(5)(13) + π(5²) = 65π + 25π = 90π cm²."
                },
                {
                  stepNumber: 2,
                  instruction: "Recover perpendicular height h using Pythagoras l² = r² + h².",
                  reasoning: "h = √(13² − 5²) = √(169 − 25) = √144 = 12 cm."
                },
                {
                  stepNumber: 3,
                  instruction: "Substitute r = 5 and perpendicular h = 12 into V = ⅓πr²h.",
                  reasoning: "V = ⅓ × π × 5² × 12 = π × 25 × 4 = 100π cm³."
                },
                {
                  stepNumber: 4,
                  instruction: "Check units carefully (cm² for area, cm³ for volume).",
                  reasoning: "TSA = 90π cm² and Volume = 100π cm³."
                }
              ],
              takeawayRule: "Never plug slant height l into the volume formula V = ⅓πr²h; extract perpendicular height h first."
            },
            {
              title: "Volume Conservation When Melting Spheres Into a Cylinder",
              problemStatement: "A solid metal sphere of radius 6 cm is melted and recast into a solid cylinder of radius 4 cm. Assuming zero metal loss, find the cylinder's height h.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Write exact sphere volume (4/3)πR³.",
                  reasoning: "V_sphere = (4/3) × π × 6³ = (4/3) × 216π = 288π cm³."
                },
                {
                  stepNumber: 2,
                  instruction: "Write cylinder volume πr²h with r = 4.",
                  reasoning: "V_cyl = π × 4² × h = 16πh cm³."
                },
                {
                  stepNumber: 3,
                  instruction: "Equate volumes and cancel π cleanly from both sides.",
                  reasoning: "16πh = 288π ⇒ 16h = 288."
                },
                {
                  stepNumber: 4,
                  instruction: "Divide to solve for cylinder height h.",
                  reasoning: "h = 288 / 16 = 18 cm."
                }
              ],
              takeawayRule: "In melt-and-recast problems, keep π symbolic until equated so it cancels completely without rounding error."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Using slant height l inside V = ⅓πr²l instead of vertical height h.",
              whyItIsWrong: "Slant height l is longer than vertical height h, artificially inflating volume.",
              correctCorrection: "Apply h = √(l² − r²) whenever slant height is given for a cone."
            },
            {
              misconception: "Writing 2πr² for the Total Surface Area of a solid hemisphere.",
              whyItIsWrong: "2πr² measures only the curved dome and omits the flat circular cut face.",
              correctCorrection: "Solid hemisphere TSA = 2πr² + πr² = 3πr²."
            }
          ],
          guidedPracticePrompt: "Find the total surface area and volume of a triangular prism of length 15 cm whose right-triangle base has legs 6 cm and 8 cm.",
          independentPracticePrompt: "An open-top cylindrical bucket has radius 7 cm and height 20 cm (π = 22/7). Calculate its outer surface area.",
          extensionActivity: "Derive the volume of a frustum by subtracting a small top cone V_top from the full cone V_full.",
          diagnosticSelfCheck: "A cone and cylinder share identical radius r and height h. What is V_cyl : V_cone?",
          transferApplication: "Compute sheet metal needed to fabricate an open-ended cylindrical grain silo plus its conical roof.",
          masteryAssessment: "A sphere of volume 36π cm³ has what surface area?",
          summaryRecap: "Prisms use A_base × h, cones/pyramids use ⅓ A_base × h, cones split h (volume) vs l (curved area), and solid hemispheres add πr² to 2πr².",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-sol-1",
            type: "multiple_choice",
            questionText: "Find the volume of a trapezoidal prism of length 10 cm whose cross-section has parallel sides 5 cm and 9 cm separated by perpendicular height 4 cm.",
            mathExpression: "V = \\frac{1}{2}(a + b)h \\times L",
            options: ["280 cm³", "560 cm³", "180 cm³", "360 cm³"],
            correctAnswer: "280 cm³",
            explanation: "Trapezium cross-section area = ½(5 + 9) × 4 = 28 cm². Volume = 28 × 10 = 280 cm³.",
            hintLadder: [
              "Compute area of the trapezoidal face first: ½(a + b)h.",
              "½(5 + 9) × 4 = 7 × 4 = 28 cm².",
              "Multiply cross-section area by prism length 10 cm."
            ],
            misconceptionAlerts: [
              { trigger: "560 cm³", note: "Remember the ½ factor in trapezium area." }
            ],
            skillId: "skill-jss-surface-area-volume-3d",
            difficulty: "easy"
          },
          {
            id: "q-jss-sol-2",
            type: "multiple_choice",
            questionText: "Using π = 22/7, calculate the volume of a solid cylinder with radius 7 cm and height 10 cm.",
            mathExpression: "V = \\pi r^2 h",
            options: ["1,540 cm³", "440 cm³", "748 cm³", "220 cm³"],
            correctAnswer: "1,540 cm³",
            explanation: "V = (22/7) × 7² × 10 = 22 × 7 × 10 = 1,540 cm³.",
            hintLadder: [
              "Recall cylinder volume formula V = πr²h.",
              "One factor of 7 cancels the denominator in 22/7: (22/7) × 49 = 154.",
              "Multiply 154 × 10."
            ],
            misconceptionAlerts: [
              { trigger: "440 cm³", note: "440 is Curved Surface Area 2πrh, not Volume πr²h." }
            ],
            skillId: "skill-jss-surface-area-volume-3d",
            difficulty: "easy"
          },
          {
            id: "q-jss-sol-3",
            type: "multiple_choice",
            questionText: "What is the Total Surface Area (in terms of π) of a solid hemisphere of radius 6 cm?",
            mathExpression: "\\text{TSA}_{\\text{hemi}} = 3\\pi r^2",
            options: ["108π cm²", "72π cm²", "144π cm²", "36π cm²"],
            correctAnswer: "108π cm²",
            explanation: "Curved dome area = 2π(6²) = 72π, plus flat circular base = π(6²) = 36π, totaling 108π cm².",
            hintLadder: [
              "A solid hemisphere has two faces: a curved dome and a flat circular bottom.",
              "Curved dome = ½(4πr²) = 2πr² = 72π.",
              "Add flat circle πr² = 36π."
            ],
            misconceptionAlerts: [
              { trigger: "72π cm²", note: "72π omits the flat circular base exposed when the sphere is cut in half." }
            ],
            skillId: "skill-jss-surface-area-volume-3d",
            difficulty: "medium"
          },
          {
            id: "q-jss-sol-4",
            type: "multiple_choice",
            questionText: "A right circular cone has radius 6 cm and slant height 10 cm. Calculate its volume in terms of π.",
            mathExpression: "h = \\sqrt{l^2 - r^2},\\quad V = \\frac{1}{3}\\pi r^2 h",
            options: ["96π cm³", "120π cm³", "288π cm³", "60π cm³"],
            correctAnswer: "96π cm³",
            explanation: "Vertical height h = √(10² − 6²) = √64 = 8 cm. Volume = ⅓π(6²)(8) = ⅓(288π) = 96π cm³.",
            hintLadder: [
              "10 cm is the slant height l, not the vertical height h.",
              "Find vertical height: h = √(10² − 6²) = 8 cm.",
              "Compute V = ⅓ × π × 36 × 8."
            ],
            misconceptionAlerts: [
              { trigger: "120π cm³", note: "120π mistakenly uses slant height l = 10 inside the volume formula." }
            ],
            skillId: "skill-jss-surface-area-volume-3d",
            difficulty: "medium"
          },
          {
            id: "q-jss-sol-5",
            type: "multiple_choice",
            questionText: "A solid square-based pyramid has base side 10 cm and vertical height 12 cm. Find its Total Surface Area.",
            mathExpression: "\\text{TSA} = s^2 + 4\\left(\\frac{1}{2} s l_{\\text{face}}\\right)",
            options: ["360 cm²", "340 cm²", "400 cm²", "260 cm²"],
            correctAnswer: "360 cm²",
            explanation: "Center-to-base-edge distance = 10/2 = 5 cm. Triangular face slant height l_face = √(5² + 12²) = 13 cm. Four faces = 4 × ½(10)(13) = 260 cm². Add base 10² = 100 cm² → 360 cm².",
            hintLadder: [
              "Find the slant height of each triangular side face using half the base side (5 cm) and vertical height (12 cm).",
              "l_face = √(5² + 12²) = 13 cm.",
              "Sum square base area (100 cm²) + four triangular faces (4 × ½ × 10 × 13)."
            ],
            misconceptionAlerts: [
              { trigger: "340 cm²", note: "Using vertical height 12 cm instead of face slant height 13 cm gives 100 + 240 = 340 cm² (underestimates tilted faces)." }
            ],
            skillId: "skill-jss-surface-area-volume-3d",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. jss_205_probability_experiments_outcomes_tre
  // =========================================================================
  {
    id: "unit-p1-jss-probability-trees",
    subjectId: "jss_205_probability_experiments_outcomes_tre",
    level: "junior_secondary",
    title: "Probability Experiments, Sample Spaces, Tree Diagrams & Combined Events",
    code: "JSS-PRB-205",
    description:
      "Master theoretical vs experimental probability, 2D sample-space grids, mutually exclusive vs independent rules, tree diagrams with/without replacement, and expected frequency.",
    order: 10,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-PRB-01",
      "WAEC_WASSCE:MTH-PRB-205",
      "CAMBRIDGE_IGCSE:JSS-PRB-TRE"
    ],
    skills: [
      {
        id: "skill-jss-probability-trees",
        unitId: "unit-p1-jss-probability-trees",
        title: "Sample Spaces, Tree Diagrams & Replacement Logic",
        code: "SKL-JSS-PRB-205",
        summary:
          "Model compound outcomes using product grids and branch-weighted tree diagrams with and without replacement.",
        objectives: [
          "Bound all probabilities strictly in [0, 1] and use complementary rule P(A') = 1 − P(A)",
          "Multiply along tree branches (AND) and add valid end-paths (OR)",
          "Update denominators and numerators properly in 'without replacement' conditional draws"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations", "skill-jss-sets-venn-logic"],
        lesson: {
          id: "les-jss-probability-trees",
          title: "Sample Spaces, Probability Trees & Replacement",
          hookAndIntuition:
            "Whether forecasting weather risk, detecting manufacturing defects, or analyzing genetics, probability turns uncertainty into exact weighted branch sums.",
          conceptualExplanation:
            "For equally likely outcomes, theoretical probability is P(E) = n(E) / n(S), always bounded between 0 (impossible) and 1 (certain), with P(not E) = 1 − P(E). Expected frequency across N trials is E = N × P(E). Experimental relative frequency (wins/trials) converges toward theoretical probability as N grows large.\n\nTwo-stage experiments expand via either a 2D outcome table (e.g., 6 × 6 = 36 two-dice pairs) or a probability tree diagram. Across every branch node, sibling probabilities must sum to 1. To find the probability of a specific path, MULTIPLY along its branches (P(A and B) = P(A) × P(B|A)). When multiple distinct paths satisfy an event ('exactly one red', etc.), ADD those disjoint path probabilities. Without replacement, the second draw shrinks both total pool (N − 1) and the chosen color's numerator if picked first.",
          conceptualModel:
            "Multiply Along Branches (AND) | Add Across Valid Paths (OR) | Without Replacement: denominator becomes N − 1 | Complement: P(≥ 1) = 1 − P(none).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Complement Rule: P(At least one) = 1 − P(None)",
              definition: "Converts multi-branch '1 or more' sums into a single all-fail complement subtraction.",
              practicalExample: "If P(defect) = 0.1 per chip, P(at least 1 defect in 2) = 1 − (0.9 × 0.9) = 0.19."
            },
            {
              termOrSymbol: "Without-Replacement Chain: P(R₁ ∩ R₂) = (r/n) × ((r−1)/(n−1))",
              definition: "Removing one item without putting it back alters conditional second-stage probabilities.",
              practicalExample: "From 4 Red and 6 Blue balls: P(2 Red without replacement) = (4/10) × (3/9) = 2/15."
            },
            {
              termOrSymbol: "Expected Frequency: E(A) = N × P(A)",
              definition: "Predicted count of successes over N repeated independent trials.",
              practicalExample: "Rolling a fair die 180 times predicts 180 × (1/6) = 30 sixes."
            }
          ],
          workedExamples: [
            {
              title: "Drawing Two Marbles Without Replacement ('Different Colors')",
              problemStatement: "A bag contains 5 Green and 3 Yellow marbles. Two marbles are drawn sequentially WITHOUT replacement. Calculate the probability of drawing one of each color.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "List both distinct ordered paths that produce one Green and one Yellow.",
                  reasoning: "Path 1: Green then Yellow (G, Y). Path 2: Yellow then Green (Y, G)."
                },
                {
                  stepNumber: 2,
                  instruction: "Calculate P(G₁, Y₂) reducing the second denominator from 8 to 7.",
                  reasoning: "P(G₁, Y₂) = (5/8) × (3/7) = 15/56."
                },
                {
                  stepNumber: 3,
                  instruction: "Calculate P(Y₁, G₂) similarly.",
                  reasoning: "P(Y₁, G₂) = (3/8) × (5/7) = 15/56."
                },
                {
                  stepNumber: 4,
                  instruction: "Add the mutually exclusive end-path probabilities.",
                  reasoning: "P(different colors) = 15/56 + 15/56 = 30/56 = 15/28."
                }
              ],
              takeawayRule: "'One of each color' allows two orders (G-Y or Y-G), so never forget to sum both tree branches."
            },
            {
              title: "Two-Dice Sum Probability via 6×6 Sample Space Grid",
              problemStatement: "Two fair 6-sided dice are rolled simultaneously. Find the probability that the sum of the two faces is at least 10.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Determine total sample space size n(S).",
                  reasoning: "6 outcomes on Die 1 × 6 outcomes on Die 2 = 36 equally likely ordered pairs."
                },
                {
                  stepNumber: 2,
                  instruction: "Enumerate all pairs summing to 10, 11, or 12.",
                  reasoning: "Sum 10: (4,6), (5,5), (6,4) [3]; Sum 11: (5,6), (6,5) [2]; Sum 12: (6,6) [1]."
                },
                {
                  stepNumber: 3,
                  instruction: "Count favorable pairs n(E).",
                  reasoning: "n(E) = 3 + 2 + 1 = 6 pairs."
                },
                {
                  stepNumber: 4,
                  instruction: "Divide and simplify P(Sum ≥ 10).",
                  reasoning: "P(Sum ≥ 10) = 6 / 36 = 1/6."
                }
              ],
              takeawayRule: "With two dice, ordered pairs like (4, 6) and (6, 4) are two distinct outcomes out of 36, not one."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Leaving denominator unchanged (e.g., 8 instead of 7) on the second draw without replacement.",
              whyItIsWrong: "After removing the first marble, only 7 remain in the bag.",
              correctCorrection: "Decrement the denominator by 1 on every successive draw without replacement."
            },
            {
              misconception: "Counting only 21 unordered pairs instead of 36 ordered pairs for two dice.",
              whyItIsWrong: "(5, 6) is twice as likely as (6, 6) because either die can show 5 while the other shows 6.",
              correctCorrection: "Always construct the full 6 × 6 = 36 ordered outcome table."
            }
          ],
          guidedPracticePrompt: "A fair coin is tossed 3 times. List all 8 outcomes and find P(at least 2 Heads).",
          independentPracticePrompt: "A box holds 4 red and 6 blue pens. Two are picked without replacement. Find P(both blue).",
          extensionActivity: "Check the sum of all 4 end-branch probabilities of a 2-stage tree diagram to confirm total = 1.",
          diagnosticSelfCheck: "If P(rain tomorrow) = 0.35, what is the probability it does NOT rain?",
          transferApplication: "Compute failure probability of two parallel backup servers each having 0.05 failure chance.",
          masteryAssessment: "From integers 1 to 20, one number is picked. Find P(multiple of 3 OR multiple of 5).",
          summaryRecap: "Bound probabilities in [0, 1], build 2D grids for two-dice/spinner trials, multiply along tree paths, sum valid branches, and use 1 − P(none) for 'at least one'.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-prb-1",
            type: "multiple_choice",
            questionText: "If the probability that a train arrives late is 0.18, what is the probability it arrives on time (not late)?",
            mathExpression: "P(A') = 1 - P(A)",
            options: ["0.82", "0.18", "0.72", "0.92"],
            correctAnswer: "0.82",
            explanation: "Complementary events sum to 1: P(on time) = 1 − 0.18 = 0.82.",
            hintLadder: [
              "Subtract the late probability from 1.00.",
              "1.00 − 0.18 = 0.82."
            ],
            misconceptionAlerts: [
              { trigger: "0.72", note: "Check decimal borrowing: 1.00 − 0.18 = 0.82, not 0.72." }
            ],
            skillId: "skill-jss-probability-trees",
            difficulty: "easy"
          },
          {
            id: "q-jss-prb-2",
            type: "multiple_choice",
            questionText: "A fair spinner has 3 red, 4 blue, and 5 green equal sectors. It is spun 240 times. How many times is it expected to land on blue?",
            mathExpression: "E = N \\times P(\\text{Blue})",
            options: ["80 times", "60 times", "100 times", "40 times"],
            correctAnswer: "80 times",
            explanation: "Total sectors = 3 + 4 + 5 = 12. P(Blue) = 4/12 = 1/3. Expected frequency = 240 × (1/3) = 80.",
            hintLadder: [
              "Find total sectors: 3 + 4 + 5 = 12.",
              "Compute P(Blue) = 4/12 = 1/3.",
              "Multiply 240 by 1/3."
            ],
            misconceptionAlerts: [
              { trigger: "60 times", note: "60 uses 3/12 (red) instead of 4/12 (blue)." }
            ],
            skillId: "skill-jss-probability-trees",
            difficulty: "easy"
          },
          {
            id: "q-jss-prb-3",
            type: "multiple_choice",
            questionText: "Two fair 6-sided dice are rolled together. What is the probability that the sum of the scores is 9?",
            mathExpression: "P(\\text{Sum} = 9) = \\frac{n(E)}{36}",
            options: ["1/9", "1/12", "1/6", "5/36"],
            correctAnswer: "1/9",
            explanation: "Ordered pairs summing to 9 are (3,6), (4,5), (5,4), (6,3) — 4 pairs out of 36. Thus P = 4/36 = 1/9.",
            hintLadder: [
              "Total ordered outcomes = 6 × 6 = 36.",
              "List pairs summing to 9: (3,6), (4,5), (5,4), (6,3).",
              "Simplify 4/36."
            ],
            misconceptionAlerts: [
              { trigger: "1/12", note: "Check all four pairs; (4,5) and (5,4) are distinct outcomes." }
            ],
            skillId: "skill-jss-probability-trees",
            difficulty: "medium"
          },
          {
            id: "q-jss-prb-4",
            type: "multiple_choice",
            questionText: "A box contains 4 black balls and 6 white balls. Two balls are drawn one after another WITHOUT replacement. Find the probability that BOTH are black.",
            mathExpression: "P(B_1 \\cap B_2) = \\frac{4}{10} \\times \\frac{3}{9}",
            options: ["2/15", "4/25", "1/5", "6/25"],
            correctAnswer: "2/15",
            explanation: "First black = 4/10; second black (3 black left out of 9) = 3/9 = 1/3. Product = (4/10) × (1/3) = 4/30 = 2/15.",
            hintLadder: [
              "First draw: 4 black out of 10 total.",
              "Without replacement, second draw leaves 3 black out of 9 total.",
              "Multiply (4/10) × (3/9) and simplify."
            ],
            misconceptionAlerts: [
              { trigger: "4/25", note: "4/25 = (4/10)² assumes the first ball was put back (with replacement)." }
            ],
            skillId: "skill-jss-probability-trees",
            difficulty: "medium"
          },
          {
            id: "q-jss-prb-5",
            type: "multiple_choice",
            questionText: "Using the same box (4 black, 6 white, drawn WITHOUT replacement), find the probability that AT LEAST ONE ball is white.",
            mathExpression: "P(\\ge 1\\text{ White}) = 1 - P(\\text{Both Black})",
            options: ["13/15", "21/25", "2/15", "8/15"],
            correctAnswer: "13/15",
            explanation: "The only outcome with zero white balls is 'Both Black' = 2/15. By complement, P(at least 1 white) = 1 − 2/15 = 13/15.",
            hintLadder: [
              "The opposite of 'at least one white' is 'no white balls at all' (Both Black).",
              "From the previous rule, P(Both Black) = 2/15.",
              "Subtract 1 − 2/15."
            ],
            misconceptionAlerts: [
              { trigger: "21/25", note: "21/25 assumes replacement (1 − 4/25) instead of without replacement." }
            ],
            skillId: "skill-jss-probability-trees",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. jss_206_data_collection_sampling_statistical
  // =========================================================================
  {
    id: "unit-p1-jss-data-sampling-stats",
    subjectId: "jss_206_data_collection_sampling_statistical",
    level: "junior_secondary",
    title: "Data Collection, Sampling Bias, Grouped Averages & Statistical Diagrams",
    code: "JSS-STA-206",
    description:
      "Master random/stratified/systematic sampling, bias detection, grouped frequency mean (Σfx/Σf), modal class, histograms vs bar charts, and pie chart sector angles.",
    order: 11,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-STA-02",
      "BECE:MTH-STA-206",
      "CAMBRIDGE_IGCSE:JSS-STA-SAM"
    ],
    skills: [
      {
        id: "skill-jss-data-sampling-stats",
        unitId: "unit-p1-jss-data-sampling-stats",
        title: "Sampling Methods, Grouped Mean & Statistical Charts",
        code: "SKL-JSS-STA-206",
        summary:
          "Design unbiased stratified samples, estimate grouped means using class midpoints Σfx/Σf, and convert between counts, pie angles, and histogram frequency densities.",
        objectives: [
          "Select stratified sample sizes proportionally: n_stratum = (N_stratum / N_total) × n_sample",
          "Compute estimated mean from grouped frequency intervals using class midpoints x_m",
          "Distinguish discrete bar charts from continuous histograms (Area ∝ Frequency) and compute pie sector angles (f/N × 360°)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-central-tendency-charts", "skill-pri-ratios-proportions"],
        lesson: {
          id: "les-jss-data-sampling-stats",
          title: "Sampling, Grouped Statistics & Visual Representation",
          hookAndIntuition:
            "Bad sampling fools entire elections, while grouped frequency tables let analysts compress 10,000 test scores into a clean histogram and accurate mean in seconds.",
          conceptualExplanation:
            "Data collection chooses between a census (every member) and a sample (subset). To avoid sampling bias (e.g., surveying only gym members about fitness), researchers use simple random sampling, systematic sampling (every kth item), or stratified sampling—splitting the population into subgroups (strata) and choosing n_i = (N_i / N) × n proportionally.\n\nFor continuous or wide-ranging data grouped into class intervals, the estimated mean replaces every score in a class with its class midpoint x_m = (lower + upper)/2: x̄ ≈ Σ(f · x_m) / Σf. The modal class has the highest frequency (for equal widths) or highest frequency density f / width (for unequal-width histograms). Pie charts convert category counts into central sector angles via θ = (f / N) × 360°.",
          conceptualModel:
            "Stratified: (Group / Total) × Sample | Grouped Mean: Σ(f · x_mid) / Σf | Pie Angle: (f / N) × 360° | Histogram Height: Frequency Density = f / class width.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Stratified Sample Formula: n_k = (N_k / N) × n",
              definition: "Maintains exact population proportions across distinct subgroups (e.g., grade levels).",
              practicalExample: "If JSS1 has 150 out of 600 students, a sample of 80 needs (150/600) × 80 = 20 JSS1 students."
            },
            {
              termOrSymbol: "Grouped Mean Estimate: x̄ = Σ(f · x_m) / Σf",
              definition: "Weighted average using the midpoint x_m of each class interval.",
              practicalExample: "Class 10–20 (mid = 15, f = 4) contributes 4 × 15 = 60 to Σfx."
            },
            {
              termOrSymbol: "Pie Sector Angle: θ = (f / Σf) × 360°",
              definition: "Proportional fraction of a full 360° circle representing a category's share.",
              practicalExample: "If 18 out of 90 students prefer Science, sector angle = (18/90) × 360° = 72°."
            }
          ],
          workedExamples: [
            {
              title: "Proportional Stratified Sampling Across School Years",
              problemStatement: "A secondary school has 240 JSS1, 180 JSS2, and 180 JSS3 students. A principal needs a stratified sample of 50 students. How many must come from JSS1?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Sum all subgroup populations to obtain total N.",
                  reasoning: "N = 240 + 180 + 180 = 600 students."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute JSS1's proportion of the school.",
                  reasoning: "Proportion = 240 / 600 = 2 / 5 = 40%."
                },
                {
                  stepNumber: 3,
                  instruction: "Multiply proportion by sample size n = 50.",
                  reasoning: "n_JSS1 = (2/5) × 50 = 20 students."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify all strata sum back to 50.",
                  reasoning: "JSS2 = (180/600)×50 = 15; JSS3 = 15; 20 + 15 + 15 = 50."
                }
              ],
              takeawayRule: "Stratified sampling guarantees minority and majority strata receive exact proportional representation."
            },
            {
              title: "Estimating Mean From a Grouped Frequency Table",
              problemStatement: "Scores are grouped as: 0–10 (f = 2), 10–20 (f = 5), 20–30 (f = 3). Estimate the mean score.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute class midpoints x_m = (lower + upper) / 2.",
                  reasoning: "Midpoints are 5, 15, and 25."
                },
                {
                  stepNumber: 2,
                  instruction: "Multiply each frequency f by its midpoint x_m.",
                  reasoning: "2(5) = 10; 5(15) = 75; 3(25) = 75."
                },
                {
                  stepNumber: 3,
                  instruction: "Sum frequencies Σf and products Σ(f · x_m).",
                  reasoning: "Σf = 2 + 5 + 3 = 10; Σ(f · x_m) = 10 + 75 + 75 = 160."
                },
                {
                  stepNumber: 4,
                  instruction: "Divide Σ(f · x_m) by Σf.",
                  reasoning: "Estimated mean = 160 / 10 = 16.0 marks."
                }
              ],
              takeawayRule: "Always divide Σfx by the sum of frequencies Σf, NOT by the number of rows (3)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Dividing Σfx by the number of class intervals (rows) instead of Σf.",
              whyItIsWrong: "Dividing by 3 classes instead of 10 students inflates the mean over 3× higher than the maximum score.",
              correctCorrection: "Always divide Σ(f · x_m) by total frequency Σf."
            },
            {
              misconception: "Confusing percentage share with degrees on a pie chart.",
              whyItIsWrong: "A full pie spans 360°, not 100°.",
              correctCorrection: "Multiply fraction (f/N) by 360° for degrees, or by 100% for percentages."
            }
          ],
          guidedPracticePrompt: "If a pie chart sector for Rent measures 108° out of a ₦120,000 monthly budget, how much money is spent on Rent?",
          independentPracticePrompt: "Explain why interviewing only students in the school library about daily reading hours introduces bias.",
          extensionActivity: "Calculate the frequency density of class 20 ≤ t < 35 with frequency 45 (width = 15 → density = 3.0).",
          diagnosticSelfCheck: "What is the midpoint of class interval 15–25?",
          transferApplication: "Design an unbiased customer-satisfaction survey across 3 store branches of unequal traffic.",
          masteryAssessment: "Given pie sectors 90° (Food), 120° (Housing), and 150° (Savings) totaling 360°, find the fraction saved.",
          summaryRecap: "Eliminate bias with stratified sampling, multiply class midpoints by frequencies and divide by Σf for grouped means, and scale fractions by 360° for pie charts.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-sta-1",
            type: "multiple_choice",
            questionText: "In a survey of 120 students, 30 chose Football as their favorite sport. What central angle represents Football on a pie chart?",
            mathExpression: "\\theta = \\frac{30}{120} \\times 360^{\\circ}",
            options: ["90°", "25°", "108°", "72°"],
            correctAnswer: "90°",
            explanation: "Fraction = 30/120 = 1/4. Pie sector angle = ¼ × 360° = 90°.",
            hintLadder: [
              "Find the fraction of students: 30 / 120 = 1/4.",
              "Multiply the fraction by a full circle (360°).",
              "360° ÷ 4 = 90°."
            ],
            misconceptionAlerts: [
              { trigger: "25°", note: "25 is the percentage (25%), whereas a pie chart uses 360° in a full circle." }
            ],
            skillId: "skill-jss-data-sampling-stats",
            difficulty: "easy"
          },
          {
            id: "q-jss-sta-2",
            type: "multiple_choice",
            questionText: "Which of the following survey plans suffers most clearly from convenience/selection bias when estimating average screen time of all teenagers in a city?",
            mathExpression: "\\text{Sampling Bias Check}",
            options: [
              "Surveying only teenagers leaving an e-sports gaming cafe",
              "Assigning ID numbers to every school teenager and using a random generator",
              "Taking proportional random samples from every secondary school district",
              "Sampling every 20th student from an alphabetized city school roster"
            ],
            correctAnswer: "Surveying only teenagers leaving an e-sports gaming cafe",
            explanation: "Visitors to a gaming cafe are disproportionately heavy screen users, biasing the estimate upward compared to the general teen population.",
            hintLadder: [
              "Ask which group systematically differs from the full city teenage population.",
              "Random, stratified, and systematic roster samples cover all schools fairly.",
              "A gaming cafe self-selects heavy screen users."
            ],
            misconceptionAlerts: [
              { trigger: "Taking proportional random samples from every secondary school district", note: "Stratified sampling across all districts reduces bias." }
            ],
            skillId: "skill-jss-data-sampling-stats",
            difficulty: "easy"
          },
          {
            id: "q-jss-sta-3",
            type: "multiple_choice",
            questionText: "A factory employs 300 assembly staff, 120 engineers, and 80 managers (total 500). For a stratified sample of 50 employees, how many engineers should be selected?",
            mathExpression: "n_{\\text{eng}} = \\frac{120}{500} \\times 50",
            options: ["12", "15", "24", "10"],
            correctAnswer: "12",
            explanation: "Proportion = 120/500. Multiplied by sample 50: (120/500) × 50 = 120 / 10 = 12 engineers.",
            hintLadder: [
              "Total workforce = 300 + 120 + 80 = 500.",
              "Multiply engineer fraction (120/500) by sample size (50).",
              "120 × 50 / 500 = 12."
            ],
            misconceptionAlerts: [
              { trigger: "24", note: "24 doubles the sample size to 100 instead of 50." }
            ],
            skillId: "skill-jss-data-sampling-stats",
            difficulty: "medium"
          },
          {
            id: "q-jss-sta-4",
            type: "multiple_choice",
            questionText: "Compute the estimated mean from the grouped quiz marks: 0–10 (f = 4), 10–20 (f = 10), 20–30 (f = 6).",
            mathExpression: "\\bar{x} = \\frac{\\Sigma f x_m}{\\Sigma f}",
            options: ["16.0", "15.0", "106.7", "17.5"],
            correctAnswer: "16.0",
            explanation: "Midpoints: 5, 15, 25. Σfx = 4(5) + 10(15) + 6(25) = 20 + 150 + 150 = 320. Σf = 4 + 10 + 6 = 20. Mean = 320 / 20 = 16.0.",
            hintLadder: [
              "Find midpoints: 5, 15, and 25.",
              "Multiply and sum: 4(5) + 10(15) + 6(25) = 320.",
              "Divide 320 by total frequency Σf = 20."
            ],
            misconceptionAlerts: [
              { trigger: "106.7", note: "106.7 divides 320 by 3 rows instead of total frequency 20." }
            ],
            skillId: "skill-jss-data-sampling-stats",
            difficulty: "medium"
          },
          {
            id: "q-jss-sta-5",
            type: "multiple_choice",
            questionText: "In an unequal-width histogram, interval 10 ≤ x < 20 (width 10) has frequency 30, while interval 20 ≤ x < 45 (width 25) has frequency 50. Compare their bar heights (frequency densities).",
            mathExpression: "\\text{Density} = \\frac{\\text{Frequency}}{\\text{Class Width}}",
            options: [
              "10–20 is taller (density 3.0 vs 2.0)",
              "20–45 is taller (density 5.0 vs 3.0)",
              "Both bars have identical height",
              "20–45 is taller because 50 > 30"
            ],
            correctAnswer: "10–20 is taller (density 3.0 vs 2.0)",
            explanation: "Histogram height equals Frequency Density = f / width. First bar: 30/10 = 3.0; second bar: 50/25 = 2.0. Thus 10–20 is taller.",
            hintLadder: [
              "In a histogram with unequal class widths, bar AREA represents frequency.",
              "Compute Frequency Density = Frequency ÷ Class Width for both classes.",
              "30 ÷ 10 = 3.0 vs 50 ÷ 25 = 2.0."
            ],
            misconceptionAlerts: [
              { trigger: "20–45 is taller because 50 > 30", note: "Plotting raw frequency on unequal widths visually distorts the distribution area." }
            ],
            skillId: "skill-jss-data-sampling-stats",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
