import { Unit } from "../types/curriculum";

export const P1_MATH_BATCH1_UNITS: Unit[] = [
  // =========================================================================
  // 1. pri_153_multiplication_tables_factors_multip
  // =========================================================================
  {
    id: "unit-p1-pri-factors-multiples",
    subjectId: "pri_153_multiplication_tables_factors_multip",
    level: "upper_primary",
    title: "Multiplication Tables, Factors, HCF & Multiples (LCM)",
    code: "PRI-FAC-153",
    description:
      "Master fluent multiplication facts up to 12 × 12, paired factor trees, Highest Common Factor (HCF), Lowest Common Multiple (LCM), and synchronized cycle problems.",
    order: 3,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-MTH-FAC-01",
      "COMMON_ENTRANCE:QR-FAC-105",
      "CAMBRIDGE_IGCSE:PRI-MUL-FAC"
    ],
    skills: [
      {
        id: "skill-pri-factors-multiples",
        unitId: "unit-p1-pri-factors-multiples",
        title: "Factor Pairs, HCF & LCM Problem Solving",
        code: "SKL-PRI-FAC-153",
        summary:
          "Enumerate complete factor pairs, compute HCF and LCM via division ladders and prime powers, and solve periodic cycle problems.",
        objectives: [
          "List every factor of a composite integer systematically using factor pairs",
          "Compute Highest Common Factor (HCF) and Lowest Common Multiple (LCM) accurately",
          "Apply the identity HCF(a, b) × LCM(a, b) = a × b to reverse-engineering problems"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations"],
        lesson: {
          id: "les-pri-factors-multiples",
          title: "Factors, Multiples, HCF & LCM",
          hookAndIntuition:
            "Factors are the exact bricks that build a number, whereas multiples are the towers built by stacking that number over and over. Knowing the difference prevents the most common arithmetic mix-up in primary and entrance exams.",
          conceptualExplanation:
            "A factor of a positive integer N divides N with zero remainder; every integer >= 2 has at least two factors (1 and N), and factors always stop at N. To avoid missing a factor, pair them from 1 upward until the factor pair turns around (near √N). A multiple of N is any product k × N (k = 1, 2, 3, ...), so multiples continue infinitely upward.\n\nWhen comparing two numbers a and b, the Highest Common Factor (HCF) is the largest integer that divides both evenly—used when splitting supplies into equal maximum packs. The Lowest Common Multiple (LCM) is the smallest positive integer divisible by both—used when aligning repeating timetables or finding common fraction denominators. Every pair of positive integers obeys the exact product theorem: HCF(a, b) × LCM(a, b) = a × b.",
          conceptualModel:
            "Factors <= N (build inside N) | Multiples >= N (step outward k × N) | HCF = Shared Prime Minimum Powers | LCM = Union of Prime Maximum Powers.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Highest Common Factor (HCF / GCD)",
              definition: "The greatest positive integer dividing two or more integers with zero remainder.",
              practicalExample: "Factors of 24: {1,2,3,4,6,8,12,24}; 36: {1,2,3,4,6,9,12,18,36} => HCF = 12."
            },
            {
              termOrSymbol: "Lowest Common Multiple (LCM)",
              definition: "The smallest positive integer that is a multiple of each given integer.",
              practicalExample: "Multiples of 15: 15,30,45,60...; 20: 20,40,60... => LCM = 60."
            },
            {
              termOrSymbol: "Product Identity: HCF(a, b) × LCM(a, b) = a × b",
              definition: "Linking identity enabling instant calculation of LCM once HCF is known (for two numbers).",
              practicalExample: "For 24 and 36: 12 × 72 = 864 = 24 × 36."
            }
          ],
          workedExamples: [
            {
              title: "Computing HCF and LCM Using Repeated Common Division",
              problemStatement: "Find both the HCF and LCM of 24 and 36 using a prime division ladder.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Divide both numbers by their smallest common prime factor, 2.",
                  reasoning: "24 ÷ 2 = 12 and 36 ÷ 2 = 18. Record common factor 2."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide the quotients 12 and 18 again by common prime 2.",
                  reasoning: "12 ÷ 2 = 6 and 18 ÷ 2 = 9. Record second common factor 2."
                },
                {
                  stepNumber: 3,
                  instruction: "Divide 6 and 9 by common prime 3.",
                  reasoning: "6 ÷ 3 = 2 and 9 ÷ 3 = 3. Since 2 and 3 share no factor > 1, common division stops. HCF = 2 × 2 × 3 = 12."
                },
                {
                  stepNumber: 4,
                  instruction: "Multiply the HCF by the remaining coprime quotients (2 and 3) for the LCM.",
                  reasoning: "LCM = 12 × 2 × 3 = 72. Verification: 12 × 72 = 864 = 24 × 36."
                }
              ],
              takeawayRule: "Stop dividing when quotients become coprime for the HCF, then multiply across the bottom row too for the LCM."
            },
            {
              title: "Synchronized Timetable Bells Using LCM",
              problemStatement: "Two school bells ring at 08:00. Bell A rings every 15 minutes and Bell B rings every 20 minutes. When will they next ring together?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify whether the cycle problem asks for a divisor (HCF) or a future meeting multiple (LCM).",
                  reasoning: "Repeated events starting together align again at their Lowest Common Multiple."
                },
                {
                  stepNumber: 2,
                  instruction: "Express 15 and 20 in prime factors.",
                  reasoning: "15 = 3 × 5 and 20 = 2² × 5."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute LCM(15, 20) by taking the highest power of each prime present.",
                  reasoning: "LCM = 2² × 3 × 5 = 4 × 3 × 5 = 60 minutes."
                },
                {
                  stepNumber: 4,
                  instruction: "Add 60 minutes to the 08:00 starting timestamp.",
                  reasoning: "08:00 + 60 minutes = 09:00."
                }
              ],
              takeawayRule: "Events repeating at fixed intervals synchronize at multiples equal to the LCM of their periods."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Confusing factors with multiples (thinking 48 is a factor of 12 or 6 is a multiple of 24).",
              whyItIsWrong: "Factors are always less than or equal to the number; multiples are always greater than or equal to the number.",
              correctCorrection: "Remember: 'Factor Fits Inside' (<= N) and 'Multiple Multiplies Upward' (>= N)."
            },
            {
              misconception: "Applying HCF × LCM = a × b to three numbers simultaneously.",
              whyItIsWrong: "For three integers (e.g., 2, 4, 6), HCF=2, LCM=12, 2×12=24 != 2×4×6=48.",
              correctCorrection: "Use the identity HCF × LCM = a × b strictly for pairs of two positive integers."
            }
          ],
          guidedPracticePrompt: "Find the HCF and LCM of 18 and 30 and check that their product equals 18 × 30.",
          independentPracticePrompt: "List all factor pairs of 48 from 1 upward and identify which factors are also multiples of 4.",
          extensionActivity: "Three buses leave a terminal every 12, 18, and 24 minutes. After how many minutes do all three depart together?",
          diagnosticSelfCheck: "Can you explain why HCF(a, b) is always smaller than or equal to both a and b while LCM(a, b) is at least as large as max(a, b)?",
          transferApplication: "A baker packs 36 meat pies and 48 sausage rolls into identical boxes with no leftovers. Find the maximum boxes needed.",
          masteryAssessment: "Two integers have HCF = 8 and LCM = 96. If one number is 24, find the other integer.",
          summaryRecap: "Master factor pairs for divisors, multiples for repeated scaling, and prime ladders to compute HCF and LCM cleanly.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-p1-fac-1",
            type: "multiple_choice",
            questionText: "Which list contains ALL positive factors of 28?",
            options: [
              "1, 2, 4, 7, 14, 28",
              "1, 2, 4, 14, 28",
              "2, 4, 7, 14, 28",
              "1, 2, 7, 14, 28"
            ],
            correctAnswer: "1, 2, 4, 7, 14, 28",
            explanation: "Checking pairs from 1 upward: 1 × 28, 2 × 14, and 4 × 7 give all six factors.",
            hintLadder: [
              "Pair integers starting from 1: 1 × 28 = 28.",
              "Test 2 (2 × 14 = 28) and 4 (4 × 7 = 28).",
              "Combine all distinct divisors in ascending order."
            ],
            misconceptionAlerts: [
              { trigger: "2, 4, 7, 14, 28", note: "1 is always a factor of every integer." }
            ],
            skillId: "skill-pri-factors-multiples",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-fac-2",
            type: "multiple_choice",
            questionText: "What are the first four positive multiples of 9?",
            options: [
              "9, 18, 27, 36",
              "1, 3, 9, 18",
              "9, 18, 28, 36",
              "0, 9, 18, 27"
            ],
            correctAnswer: "9, 18, 27, 36",
            explanation: "Positive multiples of 9 equal 9×1, 9×2, 9×3, and 9×4 = 9, 18, 27, 36.",
            hintLadder: [
              "Start multiplying 9 by 1, 2, 3, and 4.",
              "Check 9 × 3 = 27 and 9 × 4 = 36."
            ],
            misconceptionAlerts: [
              { trigger: "1, 3, 9, 18", note: "1 and 3 are factors of 9, not multiples of 9." }
            ],
            skillId: "skill-pri-factors-multiples",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-fac-3",
            type: "multiple_choice",
            questionText: "Find the Highest Common Factor (HCF) of 42 and 56.",
            options: ["14", "7", "28", "168"],
            correctAnswer: "14",
            explanation: "42 = 2 × 3 × 7 and 56 = 2³ × 7. Their shared prime factors are 2 × 7 = 14.",
            hintLadder: [
              "List the factors of 42: 1, 2, 3, 6, 7, 14, 21, 42.",
              "Test which largest factor from that list divides 56 evenly (56 ÷ 14 = 4)."
            ],
            misconceptionAlerts: [
              { trigger: "7", note: "7 is a common factor, but 14 is larger and still divides both numbers." },
              { trigger: "168", note: "168 is the LCM of 42 and 56, not the HCF." }
            ],
            skillId: "skill-pri-factors-multiples",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-fac-4",
            type: "multiple_choice",
            questionText: "Find the Lowest Common Multiple (LCM) of 12, 15, and 20.",
            options: ["60", "30", "120", "180"],
            correctAnswer: "60",
            explanation: "12 = 2²×3, 15 = 3×5, 20 = 2²×5. Taking max prime powers yields 2² × 3 × 5 = 60.",
            hintLadder: [
              "List multiples of the largest number, 20: 20, 40, 60, 80...",
              "Check the first multiple divisible by both 12 and 15."
            ],
            misconceptionAlerts: [
              { trigger: "30", note: "30 is divisible by 15, not by 12 or 20." },
              { trigger: "120", note: "120 is a common multiple, but 60 is smaller." }
            ],
            skillId: "skill-pri-factors-multiples",
            difficulty: "medium",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-fac-5",
            type: "multiple_choice",
            questionText: "The product of two integers is 432 and their HCF is 6. What is their LCM?",
            options: ["72", "36", "84", "2592"],
            correctAnswer: "72",
            explanation: "Using HCF × LCM = a × b: 6 × LCM = 432 => LCM = 432 ÷ 6 = 72.",
            hintLadder: [
              "Apply the product rule: HCF × LCM = Product of the two numbers.",
              "Divide 432 by 6."
            ],
            misconceptionAlerts: [
              { trigger: "2592", note: "You multiplied 432 × 6 instead of dividing 432 by 6." }
            ],
            skillId: "skill-pri-factors-multiples",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. pri_154_divisibility_prime_numbers_composite
  // =========================================================================
  {
    id: "unit-p1-pri-divisibility-primes",
    subjectId: "pri_154_divisibility_prime_numbers_composite",
    level: "upper_primary",
    title: "Divisibility Tests, Prime Numbers & Composite Factorization",
    code: "PRI-PRI-154",
    description:
      "Master mental divisibility rules (2, 3, 4, 5, 6, 8, 9, 10, 11), Sieve of Eratosthenes prime classification, and Fundamental Theorem prime factor trees.",
    order: 4,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-MTH-DIV-01",
      "COMMON_ENTRANCE:QR-PRI-106",
      "CAMBRIDGE_IGCSE:PRI-DIV-PRI"
    ],
    skills: [
      {
        id: "skill-pri-divisibility-primes",
        unitId: "unit-p1-pri-divisibility-primes",
        title: "Divisibility Rules & Prime Factor Decomposition",
        code: "SKL-PRI-PRI-154",
        summary:
          "Test large numbers for divisibility mentally, distinguish prime vs composite integers, and factor any integer uniquely into prime powers.",
        objectives: [
          "Apply rapid divisibility rules for 2, 3, 4, 5, 6, 9, and 10 without long division",
          "Classify integers accurately as prime (exactly 2 divisors), composite (> 2 divisors), or 1 (neither)",
          "Express composite integers in prime-power index notation"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-factors-multiples"],
        lesson: {
          id: "les-pri-divisibility-primes",
          title: "Divisibility Rules, Primes & Composite Numbers",
          hookAndIntuition:
            "Prime numbers are the atoms of arithmetic—indivisible building blocks from which every larger whole number is constructed. Divisibility tests act like instant X-rays that spot which prime atoms hide inside a multi-digit number without doing tedious long division.",
          conceptualExplanation:
            "A prime number is an integer greater than 1 that has exactly two positive divisors: 1 and itself (examples: 2, 3, 5, 7, 11, 13, 17, 19, 23). Notably, 2 is the only even prime number, and 1 is neither prime nor composite because it has only one divisor. A composite number is an integer greater than 1 with more than two factors (such as 4, 6, 9, 15).\n\nMental divisibility rules inspect digits directly: a number is divisible by 2 if its units digit is even; by 5 if its units digit is 0 or 5; by 4 if its last two digits form a multiple of 4; by 3 if its digit sum is a multiple of 3; by 9 if its digit sum is a multiple of 9; and by 6 if it passes BOTH the 2-test and the 3-test. By the Fundamental Theorem of Arithmetic, every composite integer breaks down into a unique product of primes.",
          conceptualModel:
            "Units Digit -> Tests 2, 5, 10 | Last 2 Digits -> Tests 4 | Digit Sum -> Tests 3, 9 | Both 2 & 3 -> Tests 6 | Prime Tree -> Unique Product of Primes.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Prime vs Composite Integer",
              definition: "Prime has exactly 2 distinct factors (1 and itself); composite has 3 or more factors.",
              practicalExample: "2 is prime (1, 2); 9 is composite (1, 3, 9); 1 is neither."
            },
            {
              termOrSymbol: "Digit-Sum Rule (3 and 9)",
              definition: "An integer is divisible by 3 (or 9) iff the sum of its decimal digits is divisible by 3 (or 9).",
              practicalExample: "7,434 has sum 7+4+3+4 = 18 => divisible by both 3 and 9."
            },
            {
              termOrSymbol: "Prime Index Factorization",
              definition: "Writing a composite integer as p₁ᵃ × p₂ᵇ × ... using prime bases.",
              practicalExample: "180 = 2² × 3² × 5."
            }
          ],
          workedExamples: [
            {
              title: "Multi-Rule Divisibility X-Ray on 4,734",
              problemStatement: "Without dividing longhand, determine whether 4,734 is divisible by 2, 3, 4, 6, and 9.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Check the units digit for divisibility by 2.",
                  reasoning: "4,734 ends in 4 (even), so it is divisible by 2."
                },
                {
                  stepNumber: 2,
                  instruction: "Sum all digits to test divisibility by 3 and 9.",
                  reasoning: "4 + 7 + 3 + 4 = 18. Because 18 is divisible by both 3 and 9, 4,734 is divisible by both 3 and 9."
                },
                {
                  stepNumber: 3,
                  instruction: "Combine the 2-test and 3-test for 6.",
                  reasoning: "Since 4,734 passes both 2 and 3, it is divisible by 6 (indeed 4,734 ÷ 6 = 789)."
                },
                {
                  stepNumber: 4,
                  instruction: "Inspect the last two digits (34) for divisibility by 4.",
                  reasoning: "34 ÷ 4 = 8 remainder 2, so 4,734 is NOT divisible by 4."
                }
              ],
              takeawayRule: "Digit sums test 3 and 9; trailing digits test powers of 2 (last digit for 2, last two digits for 4)."
            },
            {
              title: "Prime Factorization of 180 in Index Form",
              problemStatement: "Express 180 as a product of prime factors in index notation.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Divide 180 repeatedly by the smallest prime, 2.",
                  reasoning: "180 ÷ 2 = 90; 90 ÷ 2 = 45 (odd, stop dividing by 2)."
                },
                {
                  stepNumber: 2,
                  instruction: "Test 45 for divisibility by the next prime, 3 (digit sum 4 + 5 = 9).",
                  reasoning: "45 ÷ 3 = 15; 15 ÷ 3 = 5."
                },
                {
                  stepNumber: 3,
                  instruction: "Verify that the final quotient 5 is prime.",
                  reasoning: "5 has only factors 1 and 5, completing decomposition: 2 × 2 × 3 × 3 × 5."
                },
                {
                  stepNumber: 4,
                  instruction: "Group repeated prime factors with exponents.",
                  reasoning: "180 = 2² × 3² × 5 (Check: 4 × 9 × 5 = 180)."
                }
              ],
              takeawayRule: "Always divide systematically by ascending primes (2, 3, 5, 7, 11, ...) until the remaining quotient is 1."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Treating 1 as a prime number or assuming all odd numbers (like 9, 15, 21, 51) are prime.",
              whyItIsWrong: "1 has only one factor (not two), and 51 = 3 × 17 (digit sum 5+1=6) is composite.",
              correctCorrection: "Check digit sums for 3 and test primes up to √N before calling any odd number prime."
            },
            {
              misconception: "Thinking divisibility by 3 and 2 implies divisibility by 4 or 9.",
              whyItIsWrong: "Dividing by 2 and 3 guarantees divisibility by 6, whereas 4 requires two factors of 2 and 9 requires digit sum divisible by 9.",
              correctCorrection: "Apply each number's exact rule independently."
            }
          ],
          guidedPracticePrompt: "Test 2,538 for divisibility by 2, 3, 4, 6, and 9, stating your reason for each.",
          independentPracticePrompt: "Use the Sieve of Eratosthenes to list all prime numbers between 1 and 50.",
          extensionActivity: "Find the smallest positive digit k such that the 5-digit integer 48,k16 is divisible by 9 and 4 simultaneously.",
          diagnosticSelfCheck: "Why is 2 the only even prime number?",
          transferApplication: "Encrypt a locker code by choosing two distinct 2-digit primes and checking their product's factor tree.",
          masteryAssessment: "Express 504 as a product of primes in index notation.",
          summaryRecap: "Primes have exactly two divisors; divisibility rules detect prime factors 2, 3, 5, and composite combinations at a glance.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-p1-pri-1",
            type: "multiple_choice",
            questionText: "What is the ONLY even prime number?",
            options: ["2", "4", "0", "6"],
            correctAnswer: "2",
            explanation: "2 has exactly two positive factors (1 and 2). Every larger even number is divisible by 1, 2, and itself, making it composite.",
            hintLadder: [
              "A prime number has exactly two positive factors: 1 and itself.",
              "Any even number greater than 2 is divisible by 2 as a third factor."
            ],
            misconceptionAlerts: [
              { trigger: "0", note: "0 is divisible by every non-zero integer, so it is not prime." }
            ],
            skillId: "skill-pri-divisibility-primes",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-pri-2",
            type: "multiple_choice",
            questionText: "Which positive integer is NEITHER prime NOR composite?",
            options: ["1", "2", "3", "9"],
            correctAnswer: "1",
            explanation: "1 has only one factor (itself), whereas prime numbers need exactly 2 factors and composite numbers need 3 or more.",
            hintLadder: [
              "Count how many positive divisors each option has.",
              "Which option has only a single divisor?"
            ],
            misconceptionAlerts: [
              { trigger: "2", note: "2 is the smallest prime number (factors 1 and 2)." }
            ],
            skillId: "skill-pri-divisibility-primes",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-pri-3",
            type: "multiple_choice",
            questionText: "Which of the following four-digit numbers is divisible by BOTH 3 and 4 (and therefore by 12)?",
            options: ["2,436", "1,426", "2,534", "3,115"],
            correctAnswer: "2,436",
            explanation: "For 2,436: digit sum 2+4+3+6 = 15 (divisible by 3) and last two digits 36 ÷ 4 = 9 (divisible by 4).",
            hintLadder: [
              "Check the last two digits for divisibility by 4 first.",
              "Verify the sum of all digits is a multiple of 3."
            ],
            misconceptionAlerts: [
              { trigger: "1,426", note: "Neither 1+4+2+6=13 nor 26 is divisible by 3 or 4." },
              { trigger: "2,534", note: "34 is not a multiple of 4." }
            ],
            skillId: "skill-pri-divisibility-primes",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-pri-4",
            type: "multiple_choice",
            questionText: "Express 126 as a product of prime factors in index form.",
            options: ["2 × 3² × 7", "2 × 9 × 7", "2² × 3 × 7", "3² × 14"],
            correctAnswer: "2 × 3² × 7",
            explanation: "126 = 2 × 63 = 2 × 9 × 7 = 2 × 3² × 7, where 2, 3, and 7 are all prime.",
            hintLadder: [
              "Divide 126 by 2 to get 63.",
              "Factor 63 into primes: 63 = 9 × 7 = 3² × 7."
            ],
            misconceptionAlerts: [
              { trigger: "2 × 9 × 7", note: "9 is composite (3²), not a prime factor." }
            ],
            skillId: "skill-pri-divisibility-primes",
            difficulty: "medium",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-pri-5",
            type: "multiple_choice",
            questionText: "If the four-digit number 7a42 is divisible by 9, what digit must 'a' represent?",
            options: ["5", "4", "6", "9"],
            correctAnswer: "5",
            explanation: "Sum of digits = 7 + a + 4 + 2 = 13 + a. The nearest multiple of 9 above 13 is 18, giving a = 18 - 13 = 5.",
            hintLadder: [
              "Apply the rule for 9: sum the digits 7 + a + 4 + 2.",
              "Choose single digit a (0 to 9) so 13 + a is a multiple of 9."
            ],
            misconceptionAlerts: [
              { trigger: "4", note: "7 + 4 + 4 + 2 = 17, which is not divisible by 9." }
            ],
            skillId: "skill-pri-divisibility-primes",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. pri_155_equivalent_fractions_ratios_proporti
  // =========================================================================
  {
    id: "unit-p1-pri-ratios-proportions",
    subjectId: "pri_155_equivalent_fractions_ratios_proporti",
    level: "upper_primary",
    title: "Equivalent Fractions, Ratios & Direct/Inverse Proportion",
    code: "PRI-RAT-155",
    description:
      "Connect equivalent scaling of fractions to part-to-part ratios, unitary proportional reasoning, inverse work-rate problems, and sharing quantities in multi-part ratios.",
    order: 5,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI6-MTH-RAT-01",
      "COMMON_ENTRANCE:QR-RAT-108",
      "CAMBRIDGE_IGCSE:PRI-RAT-PRP"
    ],
    skills: [
      {
        id: "skill-pri-ratios-proportions",
        unitId: "unit-p1-pri-ratios-proportions",
        title: "Proportional Scaling, Ratio Sharing & Rate Laws",
        code: "SKL-PRI-RAT-155",
        summary:
          "Simplify ratios to lowest integer terms, partition amounts in multi-term ratios, and distinguish direct proportion from inverse work-rate proportion.",
        objectives: [
          "Generate equivalent fractions and simplify ratios by dividing by the HCF",
          "Partition quantities accurately using unitary part value = Total ÷ Sum of ratio parts",
          "Solve direct proportion (y = kx) and inverse proportion (xy = k) word problems"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations", "skill-pri-factors-multiples"],
        lesson: {
          id: "les-pri-ratios-proportions",
          title: "Equivalent Fractions, Ratios & Proportional Thinking",
          hookAndIntuition:
            "Whether mixing concrete, scaling a recipe, or splitting profits fairly, ratios keep parts locked together while total size grows or shrinks.",
          conceptualExplanation:
            "Two fractions a/b and c/d are equivalent when both numerator and denominator are multiplied or divided by the same non-zero scalar k. A ratio a : b compares two quantities in identical units and simplifies identically by dividing both terms by HCF(a, b).\n\nWhen sharing a total quantity T in ratio p : q : r, always compute the total number of equal parts S = p + q + r first; one part equals T ÷ S, and each recipient gets their share count multiplied by one part. In direct proportion (items vs total cost), doubling one quantity doubles the other (y/x = constant). In inverse proportion (workers vs time to finish a fixed job), doubling the workers halves the time (workers × time = constant total worker-hours).",
          conceptualModel:
            "Ratio Simplification -> Divide by HCF | Ratio Sharing -> 1 Part = Total ÷ Sum of Parts | Direct -> y/x = k | Inverse -> x × y = k.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Unitary Ratio Method",
              definition: "Find the value of 1 ratio unit first before scaling to the required share count.",
              practicalExample: "If 2 parts = 18 pupils, 1 part = 9, so 12 total parts = 108 pupils."
            },
            {
              termOrSymbol: "Direct Proportion (y ∝ x)",
              definition: "Both quantities scale by the exact same multiplier; their quotient stays constant.",
              practicalExample: "5 books cost ₦1,750 => 1 book = ₦350 => 8 books = ₦2,800."
            },
            {
              termOrSymbol: "Inverse Proportion (y ∝ 1/x)",
              definition: "Increasing one quantity decreases the other so their product stays constant.",
              practicalExample: "6 workers × 10 hr = 60 worker-hr => 4 workers need 60 ÷ 4 = 15 hr."
            }
          ],
          workedExamples: [
            {
              title: "Sharing Money in a Multi-Part Ratio",
              problemStatement: "Share ₦4,500 between Amina and Tunde in the ratio 4 : 5.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Add the ratio parts to find the total number of equal shares.",
                  reasoning: "Total parts = 4 + 5 = 9 parts."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide the total amount by 9 to get the value of 1 part.",
                  reasoning: "1 part = ₦4,500 ÷ 9 = ₦500."
                },
                {
                  stepNumber: 3,
                  instruction: "Multiply 1 part by each person's ratio count.",
                  reasoning: "Amina = 4 × ₦500 = ₦2,000; Tunde = 5 × ₦500 = ₦2,500."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify sum and ratio.",
                  reasoning: "₦2,000 + ₦2,500 = ₦4,500, and 2000 : 2500 simplifies to 4 : 5."
                }
              ],
              takeawayRule: "Always sum the ratio parts first, divide to isolate 1 unit part, then multiply back."
            },
            {
              title: "Direct Cost Proportion via Unit Rate",
              problemStatement: "If 5 identical notebooks cost ₦1,750, how much will 8 notebooks cost?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Confirm direct proportion (more notebooks cost proportionally more).",
                  reasoning: "Total cost = (unit price) × (number of notebooks)."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute the unit cost of 1 notebook.",
                  reasoning: "₦1,750 ÷ 5 = ₦350 per notebook."
                },
                {
                  stepNumber: 3,
                  instruction: "Multiply the unit price by 8 notebooks.",
                  reasoning: "8 × ₦350 = ₦2,800."
                },
                {
                  stepNumber: 4,
                  instruction: "Sanity check using ratio scaling.",
                  reasoning: "Since 8/5 = 1.6 and 1,750 × 1.6 = 2,800, the result is verified."
                }
              ],
              takeawayRule: "Reducing to 1 unit (unitary method) guarantees accuracy even when numbers do not divide cleanly between groups."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding or subtracting the same constant to both sides of a ratio or fraction (claiming 3:5 equals 5:7).",
              whyItIsWrong: "Ratios and fractions preserve proportion only under multiplication or division by the same factor, never addition.",
              correctCorrection: "Scale both terms multiplicatively (3×2 : 5×2 = 6 : 10)."
            },
            {
              misconception: "Using direct proportion for inverse work-rate problems (thinking fewer workers finish faster).",
              whyItIsWrong: "With fewer workers on the same task, total hours required go UP, not down.",
              correctCorrection: "Multiply workers × time first to conserve total worker-hours before dividing by the new crew size."
            }
          ],
          guidedPracticePrompt: "Divide 64 kg of rice in the ratio 3 : 5 and verify both parts add to 64 kg.",
          independentPracticePrompt: "A car travels 210 km on 15 litres of fuel. How far can it travel on 25 litres at the same rate?",
          extensionActivity: "If a : b = 2 : 3 and b : c = 4 : 5, express the combined ratio a : b : c in simplest integer form.",
          diagnosticSelfCheck: "Why must quantities in a ratio such as 50 cm : 2 m be converted into the same unit before simplifying?",
          transferApplication: "Calculate ingredient masses needed when scaling a 4-serving recipe to feed 14 guests.",
          masteryAssessment: "A tank fills in 12 minutes using 3 identical taps. How long will 4 identical taps take?",
          summaryRecap: "Keep ratios unit-consistent, divide by HCF to simplify, isolate 1 part when sharing, and separate direct vs inverse scaling.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-p1-rat-1",
            type: "multiple_choice",
            questionText: "Which fraction is equivalent to 3/5 with a denominator of 35?",
            options: ["21/35", "15/35", "24/35", "18/35"],
            correctAnswer: "21/35",
            explanation: "Since 5 × 7 = 35, multiply numerator 3 by 7 as well: (3 × 7)/(5 × 7) = 21/35.",
            hintLadder: [
              "Find the multiplier taking denominator 5 to 35 (35 ÷ 5 = 7).",
              "Multiply numerator 3 by that same factor 7."
            ],
            misconceptionAlerts: [
              { trigger: "15/35", note: "15/35 simplifies to 3/7, not 3/5." }
            ],
            skillId: "skill-pri-ratios-proportions",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-rat-2",
            type: "multiple_choice",
            questionText: "Simplify the ratio 36 : 48 to its lowest integer terms.",
            options: ["3 : 4", "6 : 8", "4 : 3", "9 : 12"],
            correctAnswer: "3 : 4",
            explanation: "HCF(36, 48) = 12. Dividing both terms by 12 gives 3 : 4.",
            hintLadder: [
              "Find the Highest Common Factor of 36 and 48 (12).",
              "Divide both 36 and 48 by 12 while keeping the order."
            ],
            misconceptionAlerts: [
              { trigger: "6 : 8", note: "6 : 8 is not fully simplified because both are still divisible by 2." }
            ],
            skillId: "skill-pri-ratios-proportions",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-rat-3",
            type: "multiple_choice",
            questionText: "Share ₦7,200 among three students in the ratio 2 : 3 : 4. What is the largest share?",
            options: ["₦3,200", "₦2,400", "₦1,600", "₦3,600"],
            correctAnswer: "₦3,200",
            explanation: "Total parts = 2 + 3 + 4 = 9. One part = ₦7,200 ÷ 9 = ₦800. Largest share (4 parts) = 4 × ₦800 = ₦3,200.",
            hintLadder: [
              "Sum all ratio parts: 2 + 3 + 4 = 9.",
              "Divide ₦7,200 by 9, then multiply by the largest part (4)."
            ],
            misconceptionAlerts: [
              { trigger: "₦2,400", note: "₦2,400 is the middle share (3 parts), not the largest share (4 parts)." }
            ],
            skillId: "skill-pri-ratios-proportions",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-rat-4",
            type: "multiple_choice",
            questionText: "If 6 painters complete a school hall in 10 hours, how many hours will 4 painters take working at the same rate?",
            options: ["15 hours", "6.7 hours", "12 hours", "24 hours"],
            correctAnswer: "15 hours",
            explanation: "Total work = 6 × 10 = 60 painter-hours (inverse proportion). Dividing by 4 painters gives 60 ÷ 4 = 15 hours.",
            hintLadder: [
              "Fewer painters require MORE time, so multiply 6 × 10 to find total painter-hours.",
              "Divide 60 painter-hours by 4 painters."
            ],
            misconceptionAlerts: [
              { trigger: "6.7 hours", note: "Using direct proportion (4/6 × 10) wrongly claims fewer painters work faster." }
            ],
            skillId: "skill-pri-ratios-proportions",
            difficulty: "medium",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-rat-5",
            type: "multiple_choice",
            questionText: "In a school choir, the ratio of boys to girls is 5 : 7. If there are 18 more girls than boys, how many pupils are in the choir altogether?",
            options: ["108", "90", "63", "126"],
            correctAnswer: "108",
            explanation: "Difference in ratio parts = 7 - 5 = 2 parts = 18 pupils => 1 part = 9. Total parts = 5 + 7 = 12 => 12 × 9 = 108.",
            hintLadder: [
              "Find how many extra ratio parts girls have over boys: 7 - 5 = 2 parts.",
              "Set 2 parts = 18 to find 1 part, then multiply by total parts (5 + 7 = 12)."
            ],
            misconceptionAlerts: [
              { trigger: "63", note: "63 is the number of girls alone (7 × 9), not the combined choir total." }
            ],
            skillId: "skill-pri-ratios-proportions",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. pri_156_estimation_rounding_numerical_accura
  // =========================================================================
  {
    id: "unit-p1-pri-estimation-rounding",
    subjectId: "pri_156_estimation_rounding_numerical_accura",
    level: "upper_primary",
    title: "Estimation, Rounding, Significant Figures & Bounds",
    code: "PRI-EST-156",
    description:
      "Round whole numbers and decimals accurately to place values, decimal places (d.p.), and significant figures (s.f.); verify calculations via 1-s.f. estimation and error bounds.",
    order: 6,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI6-MTH-EST-01",
      "COMMON_ENTRANCE:QR-EST-110",
      "CAMBRIDGE_IGCSE:PRI-EST-RND"
    ],
    skills: [
      {
        id: "skill-pri-estimation-rounding",
        unitId: "unit-p1-pri-estimation-rounding",
        title: "Place-Value Rounding, Significant Figures & Error Intervals",
        code: "SKL-PRI-EST-156",
        summary:
          "Apply round-half-up place rules, count leading vs trailing significant figures, estimate multi-step expressions to 1 s.f., and state measurement error bounds.",
        objectives: [
          "Round whole numbers to the nearest 10, 100, or 1,000 and decimals to k decimal places",
          "Distinguish non-significant leading zeros from significant digits when rounding to k s.f.",
          "Calculate upper and lower bounds (± half-unit precision) and check reasonableness via 1-s.f. estimation"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations"],
        lesson: {
          id: "les-pri-estimation-rounding",
          title: "Estimation, Rounding & Numerical Accuracy",
          hookAndIntuition:
            "Every physical measurement—from a ruler to a digital scale—has limited precision. Mastering rounding and 1-significant-figure estimation lets you catch calculator slips instantly before trusting a number.",
          conceptualExplanation:
            "To round to any target digit (place value, decimal place, or significant figure), locate the cutoff position and examine the next digit immediately to its right (the decider digit). If the decider digit is 0, 1, 2, 3, or 4, keep the target digit unchanged; if it is 5, 6, 7, 8, or 9, increment the target digit by 1 (carrying leftward if 9 becomes 10).\n\nFor significant figures (s.f.), start counting from the very first NON-ZERO digit on the left: in 0.004862, the leading zeros 0.00 are merely place-holders, so the first two significant figures are 4 and 8, rounding to 0.0049 (2 s.f.). For whole numbers rounded to place value or s.f., preserve magnitude by replacing dropped integer places with trailing zeros (47,863 to 2 s.f. is 48,000, not 48!). When a measurement is given to precision u (e.g. 0.1 cm), its true value lies in [measured - u/2, measured + u/2).",
          conceptualModel:
            "1) Locate Target Digit -> 2) Inspect Next Digit (>=5 rounds up, <5 stays) -> 3) Preserve Integer Magnitude with Zeros -> Bounds = ± (Precision / 2).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "First Significant Figure Rule",
              definition: "Count starting from the leftmost non-zero digit; trailing placeholders after decimal point are never dropped arbitrarily in integers.",
              practicalExample: "0.004862 to 2 s.f. -> 4 and 8 are significant; next is 6 (>=5) -> 0.0049."
            },
            {
              termOrSymbol: "1-Significant-Figure Estimation",
              definition: "Round every operand to 1 s.f. before multiplying or dividing to verify order of magnitude.",
              practicalExample: "(41.8 × 19.3) ÷ 4.07 ≈ (40 × 20) ÷ 4 = 200."
            },
            {
              termOrSymbol: "Error Bounds (± u/2)",
              definition: "Lower bound = value - half precision; Upper bound = value + half precision.",
              practicalExample: "14.0 cm to nearest 0.1 cm -> Lower 13.95 cm, Upper 14.05 cm."
            }
          ],
          workedExamples: [
            {
              title: "Place-Value vs Significant-Figure Rounding",
              problemStatement: "Round 47,863 to (a) the nearest hundred, (b) the nearest thousand, and (c) 2 significant figures.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Nearest hundred: locate the hundreds digit (8) and inspect tens digit (6).",
                  reasoning: "Since 6 >= 5, round 8 up to 9 and zero the tens/units -> 47,900."
                },
                {
                  stepNumber: 2,
                  instruction: "Nearest thousand: locate thousands digit (7) and inspect hundreds digit (8).",
                  reasoning: "Since 8 >= 5, round 7 up to 8 and zero trailing places -> 48,000."
                },
                {
                  stepNumber: 3,
                  instruction: "2 significant figures: count the first two non-zero digits from the left (4 and 7).",
                  reasoning: "The third digit is 8 (>= 5), so 47 increments to 48."
                },
                {
                  stepNumber: 4,
                  instruction: "Restore place-value zeros so 47,863 stays near forty-eight thousand.",
                  reasoning: "47,863 to 2 s.f. = 48,000 (not 48)."
                }
              ],
              takeawayRule: "Never omit placeholder zeros when rounding large integers—47,863 is roughly 48,000, never 48."
            },
            {
              title: "1-Significant-Figure Calculation Estimate",
              problemStatement: "Estimate the value of (41.8 × 19.3) / 4.07 by rounding each number to 1 significant figure.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Round numerator factors to 1 s.f.",
                  reasoning: "41.8 -> 40 (decider 1 < 5); 19.3 -> 20 (decider 9 >= 5)."
                },
                {
                  stepNumber: 2,
                  instruction: "Round the denominator to 1 s.f.",
                  reasoning: "4.07 -> 4 (decider 0 < 5)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute the simplified mental arithmetic.",
                  reasoning: "(40 × 20) ÷ 4 = 800 ÷ 4 = 200."
                },
                {
                  stepNumber: 4,
                  instruction: "Compare against exact order of magnitude.",
                  reasoning: "Exact value is 806.74 / 4.07 ≈ 198.2, confirming 200 is an accurate sanity estimate."
                }
              ],
              takeawayRule: "Round every input to 1 s.f. before computing—not after—for quick mental verification."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Counting leading zeros in 0.00486 as significant figures (writing 0.00 to 2 s.f.).",
              whyItIsWrong: "Leading zeros only position the decimal point and convey zero measurement precision.",
              correctCorrection: "Skip all leading zeros and begin counting s.f. at the first non-zero digit (4)."
            },
            {
              misconception: "Sequential cascading rounding (rounding 6.748 -> 6.75 -> 6.8 for 1 d.p.).",
              whyItIsWrong: "Rounding twice creates double-rounding drift; 6.748 is closer to 6.7 than to 6.8.",
              correctCorrection: "Always inspect only the original decider digit immediately to the right of the target place."
            }
          ],
          guidedPracticePrompt: "Round 0.03964 to (a) 2 decimal places and (b) 2 significant figures, explaining why the answers differ.",
          independentPracticePrompt: "Estimate (29.4 × 11.2) ÷ 5.8 by rounding each number to 1 significant figure.",
          extensionActivity: "A rectangle has length 8.4 cm and width 3.2 cm (each measured to nearest 0.1 cm). Find its minimum and maximum possible area.",
          diagnosticSelfCheck: "Why does rounding 49,960 to the nearest hundred trigger a carry all the way to 50,000?",
          transferApplication: "Estimate total grocery cost mentally before reaching the checkout counter to spot scanning mistakes.",
          masteryAssessment: "State the error interval for mass m = 250 g rounded to the nearest 10 g.",
          summaryRecap: "Inspect only the immediate next digit, respect leading vs trailing zeros, and use 1-s.f. rounding for rapid checks.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-p1-est-1",
            type: "multiple_choice",
            questionText: "Round 3,849 to the nearest hundred.",
            options: ["3,800", "3,900", "3,850", "4,000"],
            correctAnswer: "3,800",
            explanation: "The hundreds digit is 8 and the next digit (tens) is 4 (< 5), so 8 stays unchanged -> 3,800.",
            hintLadder: [
              "Locate the hundreds digit (8) and inspect the tens digit (4).",
              "Because 4 < 5, do not round up; replace tens and units with zeros."
            ],
            misconceptionAlerts: [
              { trigger: "3,900", note: "Rounding 3,849 -> 3,850 -> 3,900 is invalid double-rounding." }
            ],
            skillId: "skill-pri-estimation-rounding",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-est-2",
            type: "multiple_choice",
            questionText: "Round 6.748 to 2 decimal places.",
            options: ["6.75", "6.74", "6.80", "6.70"],
            correctAnswer: "6.75",
            explanation: "The 2nd decimal digit is 4 and the 3rd decimal digit is 8 (>= 5), rounding 4 up to 5 -> 6.75.",
            hintLadder: [
              "Count two digits after the decimal point (7 and 4).",
              "Look at the third decimal digit (8 >= 5) to decide whether 4 rounds up."
            ],
            misconceptionAlerts: [
              { trigger: "6.74", note: "Truncating ignores the 8 in the thousandths place." }
            ],
            skillId: "skill-pri-estimation-rounding",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-est-3",
            type: "multiple_choice",
            questionText: "Round 0.004862 to 2 significant figures.",
            options: ["0.0049", "0.00", "0.0048", "0.005"],
            correctAnswer: "0.0049",
            explanation: "Skip leading zeros 0.00. The first two s.f. are 4 and 8; the next digit 6 (>= 5) rounds 8 up to 9 -> 0.0049.",
            hintLadder: [
              "Leading zeros before 4 are placeholders, NOT significant figures.",
              "Start counting at 4 (1st s.f.) and 8 (2nd s.f.), then check 6."
            ],
            misconceptionAlerts: [
              { trigger: "0.00", note: "Leading zeros do not count toward significant figures." }
            ],
            skillId: "skill-pri-estimation-rounding",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-est-4",
            type: "multiple_choice",
            questionText: "Estimate 59.4 × 31.2 by rounding each number to 1 significant figure first.",
            options: ["1,800", "1,500", "2,400", "1,853"],
            correctAnswer: "1,800",
            explanation: "59.4 rounds to 60 and 31.2 rounds to 30; 60 × 30 = 1,800.",
            hintLadder: [
              "Round 59.4 to 1 s.f. (60) and 31.2 to 1 s.f. (30).",
              "Multiply 60 × 30."
            ],
            misconceptionAlerts: [
              { trigger: "1,500", note: "Rounding 59.4 down to 50 loses accuracy because 9 >= 5." }
            ],
            skillId: "skill-pri-estimation-rounding",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-est-5",
            type: "multiple_choice",
            questionText: "A steel rod is measured as 14.0 cm to the nearest 0.1 cm. Between which lower and upper bounds does its true length L lie?",
            options: [
              "13.95 cm <= L < 14.05 cm",
              "13.9 cm <= L < 14.1 cm",
              "13.5 cm <= L < 14.5 cm",
              "13.99 cm <= L < 14.01 cm"
            ],
            correctAnswer: "13.95 cm <= L < 14.05 cm",
            explanation: "Half of the precision unit 0.1 cm is 0.05 cm. Subtracting and adding 0.05 cm gives 13.95 cm <= L < 14.05 cm.",
            hintLadder: [
              "Divide the precision step (0.1 cm) by 2 to get ±0.05 cm.",
              "Compute 14.0 - 0.05 and 14.0 + 0.05."
            ],
            misconceptionAlerts: [
              { trigger: "13.9 cm <= L < 14.1 cm", note: "Using ±0.1 instead of half-precision ±0.05 doubles the error interval." }
            ],
            skillId: "skill-pri-estimation-rounding",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. pri_157_perimeter_area_volume_foundations
  // =========================================================================
  {
    id: "unit-p1-pri-perimeter-area-volume",
    subjectId: "pri_157_perimeter_area_volume_foundations",
    level: "upper_primary",
    title: "Perimeter, Area of Composite Polygons & Cuboid Volume",
    code: "PRI-MEA-157",
    description:
      "Distinguish 1D boundary perimeter, 2D region area (rectangles, triangles, composite L-shapes), and 3D cuboid volume with metric capacity conversions (1,000 cm³ = 1 litre).",
    order: 7,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI6-MTH-MEA-01",
      "COMMON_ENTRANCE:QR-MEA-112",
      "CAMBRIDGE_IGCSE:PRI-PER-ARE"
    ],
    skills: [
      {
        id: "skill-pri-perimeter-area-volume",
        unitId: "unit-p1-pri-perimeter-area-volume",
        title: "Composite Shapes, Triangle Area & Capacity Volume",
        code: "SKL-PRI-MEA-157",
        summary:
          "Compute perimeters and areas of rectangles, right/general triangles, and rectilinear L-shapes, plus cuboid volumes in cm³ and litres.",
        objectives: [
          "Separate 1D perimeter (cm), 2D area (cm²), and 3D volume (cm³ / litres) cleanly",
          "Partition or subtract cutouts to evaluate composite rectilinear polygon areas",
          "Calculate cuboid volumes and fractional fill capacities in litres"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-frac-operations"],
        lesson: {
          id: "les-pri-perimeter-area-volume",
          title: "Perimeter, Area & Volume Foundations",
          hookAndIntuition:
            "Building a fence needs perimeter (1D length), laying floor tiles needs area (2D surface), and filling a water tank needs volume (3D space).",
          conceptualExplanation:
            "Perimeter is the total outer boundary distance around a closed figure, measured in linear units (cm, m). For a rectangle of length L and width W, P = 2(L + W). Area measures how many unit squares cover a flat surface (cm², m²): rectangle area is L × W, and triangle area is ½ × base × perpendicular height—always half of the enclosing rectangle!\n\nComposite L-shapes can be solved either by splitting into two non-overlapping rectangles or by taking the outer bounding rectangle and subtracting the missing corner cutout. Notice a powerful symmetry for corner cutouts: removing an inner corner leaves perimeter unchanged (= 2(L + W)) while subtracting area! Volume measures 3D capacity (V = L × W × H in cm³), where 1,000 cm³ equals exactly 1 litre.",
          conceptualModel:
            "1D Perimeter (Fence: cm) -> Sum all outer edges | 2D Area (Tiles: cm²) -> L × W or ½bh | 3D Volume (Water: cm³) -> L × W × H, 1 L = 1,000 cm³.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Triangle Area: A = ½ × b × h",
              definition: "Half the product of base length and perpendicular height (measured at 90° to base).",
              practicalExample: "Base 12 cm, perpendicular height 7 cm => A = ½ × 12 × 7 = 42 cm²."
            },
            {
              termOrSymbol: "Composite Cutout Principle",
              definition: "Total area = Outer Bounding Rectangle − Cutout Rectangle.",
              practicalExample: "(12 × 8) - (5 × 3) = 96 - 15 = 81 cm²."
            },
            {
              termOrSymbol: "Cuboid Volume & Capacity (1 L = 1,000 cm³)",
              definition: "V = Length × Width × Height; divide cm³ by 1,000 to convert to litres.",
              practicalExample: "50 × 40 × 30 cm = 60,000 cm³ = 60 litres."
            }
          ],
          workedExamples: [
            {
              title: "Perimeter and Area of an L-Shaped Courtyard",
              problemStatement: "An L-shaped floor fits inside a 12 m × 8 m rectangle with one corner cutout of 5 m × 3 m removed. Find its perimeter and area.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute the area of the full outer bounding rectangle.",
                  reasoning: "Outer area = 12 m × 8 m = 96 m²."
                },
                {
                  stepNumber: 2,
                  instruction: "Subtract the area of the 5 m × 3 m corner cutout.",
                  reasoning: "Cutout area = 5 m × 3 m = 15 m², so L-shape area = 96 - 15 = 81 m²."
                },
                {
                  stepNumber: 3,
                  instruction: "Find the missing step edges for perimeter.",
                  reasoning: "Horizontal top edge = 12 - 5 = 7 m; vertical right edge = 8 - 3 = 5 m."
                },
                {
                  stepNumber: 4,
                  instruction: "Sum all six outer edges (or verify the corner-projection property).",
                  reasoning: "Perimeter = 12 + 8 + 7 + 3 + 5 + 5 = 40 m (identical to 2(12 + 8) = 40 m)."
                }
              ],
              takeawayRule: "Adding outer bounding area minus corner cutout gives instant composite area without split errors."
            },
            {
              title: "Cuboid Water Tank Capacity in Litres",
              problemStatement: "A rectangular tank measures 50 cm by 40 cm by 30 cm. Find its full capacity in litres.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Verify all dimensions are in matching units (cm).",
                  reasoning: "L = 50 cm, W = 40 cm, H = 30 cm."
                },
                {
                  stepNumber: 2,
                  instruction: "Multiply dimensions to obtain cubic volume in cm³.",
                  reasoning: "V = 50 × 40 × 30 = 2,000 × 30 = 60,000 cm³."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply the metric capacity conversion 1,000 cm³ = 1 litre.",
                  reasoning: "Litres = 60,000 ÷ 1,000 = 60 L."
                },
                {
                  stepNumber: 4,
                  instruction: "Check unit reasonableness.",
                  reasoning: "60 litres fits a standard household storage tank (0.06 m³)."
                }
              ],
              takeawayRule: "Always convert dimensions to cm first if converting volume directly via ÷ 1,000 to litres."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting the ½ factor in triangle area (computing base × height) or using a slanted side instead of perpendicular height.",
              whyItIsWrong: "A triangle covers half the area of the rectangle sharing its base and perpendicular height.",
              correctCorrection: "Always multiply by ½ and select the height at 90° to the chosen base."
            },
            {
              misconception: "Mixing perimeter and area formulas or assuming shapes with equal perimeter have equal area.",
              whyItIsWrong: "A 1 × 9 rectangle (P=20, A=9) and a 5 × 5 square (P=20, A=25) share perimeter 20 but differ greatly in area.",
              correctCorrection: "Compute boundary length separately from interior surface product."
            }
          ],
          guidedPracticePrompt: "Find the area and perimeter of a rectangle 15 cm long and 6 cm wide.",
          independentPracticePrompt: "A triangle has area 54 cm² and base 12 cm. Calculate its perpendicular height.",
          extensionActivity: "Compare the surface area and volume of a 4 cm cube versus an 8 cm × 2 cm × 4 cm cuboid.",
          diagnosticSelfCheck: "Why does removing a 3 cm × 3 cm square from a corner leave a rectangle's perimeter unchanged, whereas cutting an inward U-notch increases perimeter?",
          transferApplication: "Calculate how many 20 cm × 20 cm square tiles cover a 3 m × 2.4 m bathroom floor.",
          masteryAssessment: "A tank 1 m × 50 cm × 40 cm is 60% full. How many litres of water does it contain?",
          summaryRecap: "Separate 1D boundary sums (cm), 2D region formulas (cm²), and 3D cuboid volume (cm³ ÷ 1,000 = litres).",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-p1-mea-1",
            type: "multiple_choice",
            questionText: "Find the perimeter of a rectangle with length 14 cm and width 9 cm.",
            options: ["46 cm", "23 cm", "126 cm", "37 cm"],
            correctAnswer: "46 cm",
            explanation: "P = 2(14 + 9) = 2 × 23 = 46 cm.",
            hintLadder: [
              "A rectangle has two lengths and two widths: P = 2(L + W).",
              "Add 14 + 9 = 23, then double it."
            ],
            misconceptionAlerts: [
              { trigger: "23 cm", note: "23 cm is only half the perimeter (one length + one width)." },
              { trigger: "126 cm", note: "14 × 9 = 126 cm² is the area, not the perimeter." }
            ],
            skillId: "skill-pri-perimeter-area-volume",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-mea-2",
            type: "multiple_choice",
            questionText: "Calculate the area of a triangle with base 12 cm and perpendicular height 7 cm.",
            options: ["42 cm²", "84 cm²", "19 cm²", "38 cm²"],
            correctAnswer: "42 cm²",
            explanation: "Area = ½ × base × height = ½ × 12 × 7 = 6 × 7 = 42 cm².",
            hintLadder: [
              "Use A = ½ × base × perpendicular height.",
              "Compute 0.5 × 12 × 7."
            ],
            misconceptionAlerts: [
              { trigger: "84 cm²", note: "84 is base × height; remember to halve for a triangle." }
            ],
            skillId: "skill-pri-perimeter-area-volume",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-mea-3",
            type: "multiple_choice",
            questionText: "Find the volume of a cuboid measuring 8 cm × 5 cm × 4 cm.",
            options: ["160 cm³", "80 cm³", "34 cm³", "184 cm³"],
            correctAnswer: "160 cm³",
            explanation: "Volume = L × W × H = 8 × 5 × 4 = 40 × 4 = 160 cm³.",
            hintLadder: [
              "Multiply length × width × height.",
              "8 × 5 = 40, then multiply by 4."
            ],
            misconceptionAlerts: [
              { trigger: "184 cm³", note: "184 cm² is the total surface area 2(40+32+20), not the volume." }
            ],
            skillId: "skill-pri-perimeter-area-volume",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-mea-4",
            type: "multiple_choice",
            questionText: "The perimeter of a square is 36 cm. What is the area of the square?",
            options: ["81 cm²", "144 cm²", "18 cm²", "72 cm²"],
            correctAnswer: "81 cm²",
            explanation: "Side length s = 36 ÷ 4 = 9 cm. Area = s² = 9 × 9 = 81 cm².",
            hintLadder: [
              "Divide the perimeter 36 cm by 4 equal sides to find one side.",
              "Square the side length to find area."
            ],
            misconceptionAlerts: [
              { trigger: "144 cm²", note: "Do not divide perimeter by 3 or square 12; a square has 4 sides." }
            ],
            skillId: "skill-pri-perimeter-area-volume",
            difficulty: "medium",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-mea-5",
            type: "multiple_choice",
            questionText: "A rectangular water tank measures 80 cm × 50 cm × 60 cm and is 75% full. How many litres of water does it hold? (1,000 cm³ = 1 litre)",
            options: ["180 litres", "240 litres", "120 litres", "190 litres"],
            correctAnswer: "180 litres",
            explanation: "Full volume = 80 × 50 × 60 = 240,000 cm³ = 240 litres. 75% (3/4) of 240 = 180 litres.",
            hintLadder: [
              "Find total volume in cm³ (80 × 50 × 60) and divide by 1,000 to convert to litres.",
              "Multiply total litres by 75% (or 3/4)."
            ],
            misconceptionAlerts: [
              { trigger: "240 litres", note: "240 litres is the tank when 100% full, before multiplying by 75%." }
            ],
            skillId: "skill-pri-perimeter-area-volume",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. pri_158_angles_lines_plane_figures
  // =========================================================================
  {
    id: "unit-p1-pri-angles-plane-figures",
    subjectId: "pri_158_angles_lines_plane_figures",
    level: "upper_primary",
    title: "Angles, Parallel Lines, Triangles & Plane Figures",
    code: "PRI-ANG-158",
    description:
      "Classify acute, right, obtuse, straight, and reflex angles; solve algebraic angle equations on straight lines, parallel transversals, triangles, and regular polygons.",
    order: 8,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI6-MTH-GEO-01",
      "COMMON_ENTRANCE:QR-GEO-114",
      "CAMBRIDGE_IGCSE:PRI-ANG-PLN"
    ],
    skills: [
      {
        id: "skill-pri-angles-plane-figures",
        unitId: "unit-p1-pri-angles-plane-figures",
        title: "Angle Laws, Transversals & Polygon Properties",
        code: "SKL-PRI-ANG-158",
        summary:
          "Apply complementary (90°), supplementary (180°), full-turn (360°), parallel-line (F/Z/C), triangle-sum (180°), and exterior polygon angle laws.",
        objectives: [
          "Compute missing complementary, supplementary, and vertically opposite angles",
          "Identify corresponding (F), alternate interior (Z), and co-interior (C) angles on parallel lines",
          "Solve unknown angles in triangles (equilateral, isosceles, scalene) and regular polygons"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-perimeter-area-volume"],
        lesson: {
          id: "les-pri-angles-plane-figures",
          title: "Angles, Lines & Plane Figures",
          hookAndIntuition:
            "Every architectural roof truss and bridge frame stays rigid because triangle angles always lock to 180°, while parallel girders reproduce matching angles along every diagonal strut.",
          conceptualExplanation:
            "Angles measure turn in degrees (°): acute (0° < θ < 90°), right (= 90°), obtuse (90° < θ < 180°), straight (= 180°), and reflex (180° < θ < 360°). Two angles summing to 90° are complementary; two summing to 180° are supplementary; angles meeting around a point sum to 360°; and vertically opposite angles formed by two intersecting lines are equal.\n\nWhen a transversal cuts two parallel lines: corresponding angles (F-pattern) are equal, alternate interior angles (Z-pattern) are equal, and co-interior angles (C-pattern) sum to 180°. In any triangle, interior angles sum to 180° (with equal base angles opposite equal sides in an isosceles triangle). In any convex polygon, exterior angles always sum to 360°, so each exterior angle of a regular n-gon equals 360° / n.",
          conceptualModel:
            "Straight Line = 180° | Full Turn = 360° | Parallel F/Z = Equal, C = 180° | Triangle = 180° | Regular n-gon Exterior = 360°/n.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Parallel Line Patterns (F, Z, C)",
              definition: "Corresponding (F) = equal; Alternate interior (Z) = equal; Co-interior (C) = 180°.",
              practicalExample: "If acute transversal angle is 68°, its co-interior partner is 180° - 68° = 112°."
            },
            {
              termOrSymbol: "Isosceles Triangle Angle Theorem",
              definition: "Angles opposite two equal sides are equal, and all three angles sum to 180°.",
              practicalExample: "Base angles x, x and vertex 80° => 2x + 80 = 180 => x = 50°."
            },
            {
              termOrSymbol: "Polygon Exterior Angle Sum = 360°",
              definition: "For a regular polygon with n sides, one exterior angle e = 360° / n.",
              practicalExample: "Regular octagon (n=8): e = 360°/8 = 45°, interior = 180° - 45° = 135°."
            }
          ],
          workedExamples: [
            {
              title: "Solving an Algebraic Triangle Angle Problem",
              problemStatement: "The three interior angles of a triangle are x°, (2x + 15)°, and 45°. Find x and classify the triangle.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Set the sum of all three interior angles equal to 180°.",
                  reasoning: "x + (2x + 15) + 45 = 180."
                },
                {
                  stepNumber: 2,
                  instruction: "Combine like algebraic terms.",
                  reasoning: "3x + 60 = 180."
                },
                {
                  stepNumber: 3,
                  instruction: "Isolate x.",
                  reasoning: "3x = 120 => x = 40°."
                },
                {
                  stepNumber: 4,
                  instruction: "Substitute x = 40° to inspect all angles and classify.",
                  reasoning: "Angles are 40°, 95°, and 45° (sum = 180°). Because 95° > 90° and all angles differ, it is an obtuse scalene triangle."
                }
              ],
              takeawayRule: "Convert triangle geometry into a linear equation via Angle₁ + Angle₂ + Angle₃ = 180°, then check each individual angle."
            },
            {
              title: "Parallel Lines Cut by a Transversal",
              problemStatement: "Two parallel rails are crossed by a diagonal brace forming an acute angle of 68° with the upper rail. Find its corresponding and co-interior angles on the lower rail.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify the corresponding angle (F-shape position).",
                  reasoning: "Corresponding angles are equal on parallel lines, so it equals 68°."
                },
                {
                  stepNumber: 2,
                  instruction: "Identify the co-interior angle (C-shape inside the rails on the same side).",
                  reasoning: "Co-interior angles are supplementary, summing to 180°."
                },
                {
                  stepNumber: 3,
                  instruction: "Subtract 68° from 180°.",
                  reasoning: "Co-interior angle = 180° - 68° = 112°."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify straight-line consistency on the lower rail.",
                  reasoning: "68° + 112° = 180°, confirming both angles fit adjacent positions on the lower line."
                }
              ],
              takeawayRule: "With parallel lines, every angle at the transversal is either equal to the acute angle (68°) or its supplement (112°)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming co-interior (C-pattern) angles are equal instead of supplementary.",
              whyItIsWrong: "On non-perpendicular transversals, one C-angle is acute and the other is obtuse; they add to 180° rather than equaling each other.",
              correctCorrection: "F (corresponding) and Z (alternate) give EQUAL angles; C (co-interior) sums to 180°."
            },
            {
              misconception: "Mixing up complementary (90°) and supplementary (180°).",
              whyItIsWrong: "Swapping 90° and 180° produces 90° errors in angle deductions.",
              correctCorrection: "C comes before S alphabetically just as 90 comes before 180."
            }
          ],
          guidedPracticePrompt: "Find the missing angles in an isosceles triangle whose vertex angle is 114°.",
          independentPracticePrompt: "A quadrilateral has angles 75°, 110°, 85°, and x°. Solve for x.",
          extensionActivity: "Prove why the interior angle sum of an n-sided polygon equals (n - 2) × 180° by triangulating from one vertex.",
          diagnosticSelfCheck: "Can an obtuse triangle ever contain two obtuse angles? Why or why not?",
          transferApplication: "Calculate the interior corner angle of a regular hexagonal honeycomb cell.",
          masteryAssessment: "Two lines cross, forming one angle of (3y - 20)° and an adjacent straight-line angle of (y + 40)°. Find y and all four angles.",
          summaryRecap: "Use 90°/180°/360° line laws, F/Z/C parallel rules, and triangle/polygon angle theorems for rapid geometric deductions.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-p1-ang-1",
            type: "multiple_choice",
            questionText: "What is the sum of all angles meeting at a single point?",
            options: ["360°", "180°", "90°", "270°"],
            correctAnswer: "360°",
            explanation: "A full rotation around a point spans 360°.",
            hintLadder: [
              "Think of a complete circular clock rotation.",
              "Two straight angles (180° + 180°) complete one full turn."
            ],
            misconceptionAlerts: [
              { trigger: "180°", note: "180° is half a turn (a straight line), not a full point rotation." }
            ],
            skillId: "skill-pri-angles-plane-figures",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-ang-2",
            type: "multiple_choice",
            questionText: "Two angles are complementary. If one angle measures 37°, what is the other angle?",
            options: ["53°", "143°", "63°", "323°"],
            correctAnswer: "53°",
            explanation: "Complementary angles sum to 90°. Therefore 90° - 37° = 53°.",
            hintLadder: [
              "Complementary angles add up to 90° (a right angle).",
              "Compute 90° - 37°."
            ],
            misconceptionAlerts: [
              { trigger: "143°", note: "143° is the supplement (180° - 37°), not the complement." }
            ],
            skillId: "skill-pri-angles-plane-figures",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-ang-3",
            type: "multiple_choice",
            questionText: "Two interior angles of a triangle measure 48° and 67°. Find the third angle.",
            options: ["65°", "75°", "55°", "115°"],
            correctAnswer: "65°",
            explanation: "Sum = 48° + 67° = 115°. Third angle = 180° - 115° = 65°.",
            hintLadder: [
              "Interior angles in any triangle sum to 180°.",
              "Add 48 + 67 = 115, then subtract from 180."
            ],
            misconceptionAlerts: [
              { trigger: "115°", note: "115° is the sum of the first two angles before subtracting from 180°." }
            ],
            skillId: "skill-pri-angles-plane-figures",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-ang-4",
            type: "multiple_choice",
            questionText: "What is the size of EACH exterior angle of a regular octagon (8 equal sides)?",
            options: ["45°", "135°", "60°", "40°"],
            correctAnswer: "45°",
            explanation: "Exterior angles of any polygon sum to 360°. For 8 equal sides: 360° ÷ 8 = 45°.",
            hintLadder: [
              "Exterior angles of every convex polygon total 360°.",
              "Divide 360° by 8 sides."
            ],
            misconceptionAlerts: [
              { trigger: "135°", note: "135° is each INTERIOR angle (180° - 45°), not the exterior angle." }
            ],
            skillId: "skill-pri-angles-plane-figures",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-ang-5",
            type: "multiple_choice",
            questionText: "In an isosceles triangle, the vertex angle is 30° greater than each base angle. What is the size of the vertex angle?",
            options: ["80°", "50°", "70°", "65°"],
            correctAnswer: "80°",
            explanation: "Let each base angle be x. Then x + x + (x + 30) = 180 => 3x + 30 = 180 => x = 50°. Vertex angle = 50° + 30° = 80°.",
            hintLadder: [
              "Label the two equal base angles x and the vertex angle x + 30.",
              "Solve 3x + 30 = 180 for x, then remember to add 30° for the vertex angle."
            ],
            misconceptionAlerts: [
              { trigger: "50°", note: "50° is each base angle; the question asks for the vertex angle (50° + 30°)." }
            ],
            skillId: "skill-pri-angles-plane-figures",
            difficulty: "hard",
            curriculumStandard: "COMMON_ENTRANCE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. pri_161_logical_puzzles_deduction_critical_t
  // =========================================================================
  {
    id: "unit-p1-pri-logical-deduction",
    subjectId: "pri_161_logical_puzzles_deduction_critical_t",
    level: "upper_primary",
    title: "Logical Puzzles, Deductive Reasoning & Pigeonhole Principle",
    code: "PRI-LOG-161",
    description:
      "Formalize deductive elimination grids, syllogistic validity, worst-case pigeonhole guarantee problems, and truth-teller vs liar consistency proofs.",
    order: 9,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI6-QR-LOG-01",
      "COMMON_ENTRANCE:QR-LOG-118",
      "CAMBRIDGE_IGCSE:PRI-LOG-DED"
    ],
    skills: [
      {
        id: "skill-pri-logical-deduction",
        unitId: "unit-p1-pri-logical-deduction",
        title: "Deductive Elimination, Ordering & Worst-Case Logic",
        code: "SKL-PRI-LOG-161",
        summary:
          "Solve constraint ordering puzzles, distinguish valid syllogisms from converse fallacies, and compute exact pigeonhole guarantees.",
        objectives: [
          "Build elimination matrices and ordered constraint chains from relational clues",
          "Compute guaranteed minimum draws using the worst-case Pigeonhole Principle",
          "Test truth-teller/liar hypotheses systematically by checking for zero contradictions"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-number-patterns-rules"],
        lesson: {
          id: "les-pri-logical-deduction",
          title: "Logical Puzzles, Deduction & Critical Thinking",
          hookAndIntuition:
            "Good detectives never guess—they cross out every impossible story until only the truth remains.",
          conceptualExplanation:
            "Deductive reasoning reaches guaranteed conclusions from stated premises. In ordering and scheduling puzzles (who came 1st, 2nd, 3rd), draw slots and translate clues into inequalities (e.g., 'Ada finished before Bola' -> Ada < Bola). Never confuse 'If A then B' with its converse 'If B then A': every square is a rectangle, yet not every rectangle is a square!\n\nTwo high-yield competition tools anchor logical puzzles. First, the Pigeonhole Principle guarantees outcomes in worst-case random draws: if there are k distinct colours, drawing k items could give 1 of each colour, so k + 1 draws GUARANTEE at least two items of the same colour. Second, in truth-teller/liar puzzles, test each candidate case one by one and count how many statements hold true; only the candidate matching the given truth-count survives.",
          conceptualModel:
            "Clues -> Ordering Inequalities / Elimination Grid | Worst-Case Guarantee -> (Distinct Types × (Needed - 1)) + 1 | Truth Puzzles -> Case-by-Case Hypothesis Check.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Pigeonhole Guarantee: N = k + 1",
              definition: "With k categories, drawing k + 1 items without looking guarantees at least one matching pair.",
              practicalExample: "With 3 pen colours (red, blue, green), 3 + 1 = 4 draws guarantee 2 matching pens."
            },
            {
              termOrSymbol: "Valid Implication vs Converse Fallacy",
              definition: "'All A are B' implies 'x in A => x in B', NOT 'x in B => x in A'.",
              practicalExample: "All squares are rectangles; shape Y is a rectangle -> Y may or may not be a square."
            },
            {
              termOrSymbol: "Case-Testing Table (Truth/Lie Puzzles)",
              definition: "Assume Suspect i = guilty, evaluate every statement as T/F, and keep only the consistent row.",
              practicalExample: "Only 1 suspect yields exact match to 'only 1 pupil tells the truth'."
            }
          ],
          workedExamples: [
            {
              title: "Ranking Four Runners via Inequality Clues",
              problemStatement: "Four sprinters (Ada, Bola, Chika, Damilola) finished a race with no ties. Ada finished before Bola; Chika finished after Bola; Damilola finished before Ada. Find the complete finishing order.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Express each relational clue using '<' to mean 'finished earlier (better rank) than'.",
                  reasoning: "Clue 1: Ada < Bola. Clue 2: Bola < Chika. Clue 3: Damilola < Ada."
                },
                {
                  stepNumber: 2,
                  instruction: "Chain the transitive inequalities together.",
                  reasoning: "Combining Damilola < Ada, Ada < Bola, and Bola < Chika yields Damilola < Ada < Bola < Chika."
                },
                {
                  stepNumber: 3,
                  instruction: "Assign positions 1st through 4th.",
                  reasoning: "1st: Damilola, 2nd: Ada, 3rd: Bola, 4th: Chika."
                },
                {
                  stepNumber: 4,
                  instruction: "Re-read every clue against the final list to verify zero violations.",
                  reasoning: "Ada (2nd) before Bola (3rd) ✓; Chika (4th) after Bola (3rd) ✓; Damilola (1st) before Ada (2nd) ✓."
                }
              ],
              takeawayRule: "Translating verbal comparison clues into ordered chains (<) prevents circular confusion."
            },
            {
              title: "Worst-Case Sock Draw (Pigeonhole Principle)",
              problemStatement: "A dark drawer contains 4 red socks and 4 blue socks. What is the minimum number of socks you must pull out without looking to guarantee you have a matching pair of the same colour?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify the number of distinct colour categories (pigeonholes).",
                  reasoning: "There are k = 2 colours: red and blue."
                },
                {
                  stepNumber: 2,
                  instruction: "Construct the unluckiest possible sequence of draws (avoiding a match as long as possible).",
                  reasoning: "Draw 1: Red. Draw 2: Blue (1 of each, no match yet)."
                },
                {
                  stepNumber: 3,
                  instruction: "Consider the very next draw (Draw 3).",
                  reasoning: "Draw 3 must be either Red (matching Draw 1) or Blue (matching Draw 2)."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify formula k + 1.",
                  reasoning: "Minimum guaranteed draws = 2 + 1 = 3 socks."
                }
              ],
              takeawayRule: "Always assume maximum bad luck up to 1 below the threshold, then add +1 to guarantee completion."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding total stock counts in worst-case draws (thinking you must pull 5 socks from 4 red + 4 blue).",
              whyItIsWrong: "5 draws guarantees a specific colour ONLY if you wanted a guaranteed RED pair; for ANY matching pair, you only need 1 more than the number of colours.",
              correctCorrection: "Count distinct categories for 'any pair' (colours + 1), and count non-target items + needed count only for a 'named colour' guarantee."
            },
            {
              misconception: "Accepting the converse of an 'All A are B' statement as necessarily true.",
              whyItIsWrong: "Knowing an animal has 4 legs does not prove it is a dog.",
              correctCorrection: "Verify subset direction carefully with a Venn diagram before concluding."
            }
          ],
          guidedPracticePrompt: "Five books (A, B, C, D, E) sit on a shelf: C is to the left of A; B is between A and D; E is leftmost. Order them left to right.",
          independentPracticePrompt: "A bag holds 7 black and 9 white marbles. How many marbles must you draw to guarantee at least 2 BLACK marbles?",
          extensionActivity: "Construct a 3×3 logic grid matching three students (Tunde, Ngozi, Bello) to three subjects and three cities using 4 clues.",
          diagnosticSelfCheck: "Why is '2 draws' lucky rather than guaranteed when pulling socks from a drawer with 2 colours?",
          transferApplication: "Design non-overlapping exam timetable slots when 4 clubs share students across 3 rooms.",
          masteryAssessment: "A box has 6 gold, 5 silver, and 4 bronze coins. How many draws guarantee 3 coins of the SAME metal?",
          summaryRecap: "Convert clues into inequality chains, guard against converse fallacies, and compute worst-case bounds cleanly.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-p1-log-1",
            type: "multiple_choice",
            questionText: "Premise 1: All squares are rectangles. Premise 2: Every rectangle has four right angles. Premise 3: Polygon X is a square. Which conclusion MUST follow?",
            options: [
              "Polygon X has four right angles",
              "Polygon X cannot be a quadrilateral",
              "Every shape with four right angles is a square",
              "Polygon X has unequal side lengths"
            ],
            correctAnswer: "Polygon X has four right angles",
            explanation: "Since Square ⊂ Rectangle ⊂ Four-Right-Angle Shapes, Polygon X inherits four right angles by transitivity.",
            hintLadder: [
              "Follow the chain: X is a square -> therefore X is a rectangle.",
              "Every rectangle has four right angles, so X must have them too."
            ],
            misconceptionAlerts: [
              { trigger: "Every shape with four right angles is a square", note: "A non-square rectangle (like 3 × 5) has four right angles." }
            ],
            skillId: "skill-pri-logical-deduction",
            difficulty: "easy",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-log-2",
            type: "multiple_choice",
            questionText: "In a 3×3 number puzzle, every row adds up to 15. If Row 2 contains [4, ?, 2], what number replaces '?'?",
            options: ["9", "8", "10", "7"],
            correctAnswer: "9",
            explanation: "4 + ? + 2 = 15 => 6 + ? = 15 => ? = 9.",
            hintLadder: [
              "Add the two known entries in Row 2: 4 + 2 = 6.",
              "Subtract 6 from the row target sum 15."
            ],
            misconceptionAlerts: [
              { trigger: "10", note: "4 + 10 + 2 = 16, exceeding the target sum 15." }
            ],
            skillId: "skill-pri-logical-deduction",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-log-3",
            type: "multiple_choice",
            questionText: "A pencil case contains 5 red pens, 6 blue pens, and 4 green pens. What is the minimum number of pens you must draw without looking to GUARANTEE two pens of the same colour?",
            options: ["4 pens", "3 pens", "7 pens", "12 pens"],
            correctAnswer: "4 pens",
            explanation: "In the worst case, the first 3 draws are 1 red, 1 blue, and 1 green. The 4th pen must match one of those 3 colours.",
            hintLadder: [
              "Assume worst luck: draw one pen of each of the 3 distinct colours first.",
              "Add 1 more draw to guarantee a repeat."
            ],
            misconceptionAlerts: [
              { trigger: "3 pens", note: "With 3 pens you could draw Red, Blue, Green with zero matches." }
            ],
            skillId: "skill-pri-logical-deduction",
            difficulty: "medium",
            curriculumStandard: "COMMON_ENTRANCE"
          },
          {
            id: "q-p1-log-4",
            type: "multiple_choice",
            questionText: "In a race with no ties: Ada finished before Bola, Chika finished after Bola, and Damilola finished before Ada. Who finished 2nd?",
            options: ["Ada", "Damilola", "Bola", "Chika"],
            correctAnswer: "Ada",
            explanation: "Combining Damilola < Ada, Ada < Bola, and Bola < Chika gives 1st Damilola, 2nd Ada, 3rd Bola, 4th Chika.",
            hintLadder: [
              "Write inequalities: Damilola < Ada < Bola < Chika.",
              "Read the 2nd name in the chain."
            ],
            misconceptionAlerts: [
              { trigger: "Damilola", note: "Damilola finished before Ada, making Damilola 1st and Ada 2nd." }
            ],
            skillId: "skill-pri-logical-deduction",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-log-5",
            type: "multiple_choice",
            questionText: "Exactly ONE of three pupils (Tobi, Uche, Zainab) broke the lab beaker, and ONLY ONE of them is telling the truth. Tobi says: 'I did not do it.' Uche says: 'I did not do it.' Zainab says: 'Uche did it.' Who broke the beaker?",
            options: ["Tobi", "Uche", "Zainab", "Impossible to determine"],
            correctAnswer: "Tobi",
            explanation: "Test each suspect: if Tobi broke it -> Tobi lies (F), Uche tells truth (T), Zainab lies (F) => exactly 1 truth-teller! Both other suspects give 2 truth-tellers.",
            hintLadder: [
              "Test all 3 suspects one by one and mark each statement True or False.",
              "Count truth-tellers in each case: Uche guilty -> 2 True; Zainab guilty -> 2 True; Tobi guilty -> 1 True."
            ],
            misconceptionAlerts: [
              { trigger: "Uche", note: "If Uche broke it, both Tobi ('I didn't') and Zainab ('Uche did it') tell the truth (2 truth-tellers)." }
            ],
            skillId: "skill-pri-logical-deduction",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. jss_196_number_theory_indices_standard_form_
  // =========================================================================
  {
    id: "unit-p1-jss-indices-standard-form",
    subjectId: "jss_196_number_theory_indices_standard_form_",
    level: "junior_secondary",
    title: "Number Theory, Laws of Indices, Standard Form & Surds",
    code: "JSS-IND-196",
    description:
      "Master integer, zero, negative, and fractional index laws, scientific standard form (A × 10ⁿ with 1 <= A < 10), and exact simplification of quadratic surds.",
    order: 4,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-MTH-IND-01",
      "WAEC_WASSCE:MTH-IND-SUR",
      "CAMBRIDGE_IGCSE:JSS-IND-STD"
    ],
    skills: [
      {
        id: "skill-jss-indices-standard-form",
        unitId: "unit-p1-jss-indices-standard-form",
        title: "Index Laws, Standard Form Arithmetic & Surd Reduction",
        code: "SKL-JSS-IND-196",
        summary:
          "Apply product, quotient, zero, negative, and rational power laws; compute in scientific notation; and simplify surds into k√p.",
        objectives: [
          "Simplify algebraic expressions using product, quotient, power-of-power, zero, and negative index laws",
          "Evaluate fractional powers a^(m/n) = (ⁿ√a)^m and solve basic exponential equations via common base",
          "Convert and divide/multiply quantities in standard form A × 10ⁿ and reduce surds by extracting largest square factors"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-divisibility-primes", "skill-pri-factors-multiples"],
        lesson: {
          id: "les-jss-indices-standard-form",
          title: "Indices, Standard Form & Surd Simplification",
          hookAndIntuition:
            "Astronomers write star distances as 9.46 × 10¹⁵ m and physicists measure atoms at 1.2 × 10⁻¹⁰ m using index laws—because counting dozens of zeros invites human error.",
          conceptualExplanation:
            "For any non-zero base a: (1) aᵐ × aⁿ = aᵐ⁺ⁿ; (2) aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (3) (aᵐ)ⁿ = aᵐⁿ; (4) a⁰ = 1; (5) a⁻ⁿ = 1/aⁿ; and (6) aᵐ/ⁿ = (ⁿ√a)ᵐ (take the nth root first to keep numbers small before raising to power m). When solving exponential equations such as 8ⁿ⁻¹ = 64², rewrite every term over the smallest shared prime base (2) and equate exponents.\n\nScientific standard form writes any positive number uniquely as A × 10ⁿ where 1 <= A < 10 and n is an integer (positive shifts for >= 10, negative shifts for decimals < 1). Quadratic surds like √75 represent irrational square roots kept exact: factor out the largest perfect square (√75 = √(25×3) = 5√3), allowing like surds to add or subtract cleanly.",
          conceptualModel:
            "Same Base Multiply -> Add Powers | Divide -> Subtract Powers | Negative Power -> Reciprocal | Fractional m/n -> Root n then Power m | Surd -> Extract Largest Square.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Negative & Rational Indices: a⁻ⁿ = 1/aⁿ ; a^(m/n) = (ⁿ√a)^m",
              definition: "Negative exponents invert the base; denominator n takes the root and numerator m applies the power.",
              practicalExample: "27^(-2/3) = 1 / (³√27)² = 1 / 3² = 1/9."
            },
            {
              termOrSymbol: "Standard Form: A × 10ⁿ (1 <= A < 10)",
              definition: "Normalized scientific notation dividing mantissa operations from powers of 10.",
              practicalExample: "(3.6 × 10⁵) ÷ (1.2 × 10⁻²) = (3.6/1.2) × 10^(5 - (-2)) = 3.0 × 10⁷."
            },
            {
              termOrSymbol: "Surd Reduction: √(k²p) = k√p",
              definition: "Extract exact square roots to combine like irrational radicals.",
              practicalExample: "√75 + √27 - √12 = 5√3 + 3√3 - 2√3 = 6√3."
            }
          ],
          workedExamples: [
            {
              title: "Division in Scientific Standard Form with Negative Exponent",
              problemStatement: "Evaluate (3.6 × 10⁵) ÷ (1.2 × 10⁻²), leaving your answer in standard form.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Separate the mantissa division from the power-of-10 division.",
                  reasoning: "(3.6 ÷ 1.2) × (10⁵ ÷ 10⁻²)."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute the mantissa quotient.",
                  reasoning: "3.6 ÷ 1.2 = 3.0."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply quotient index law 10ᵐ ÷ 10ⁿ = 10ᵐ⁻ⁿ carefully with the negative sign.",
                  reasoning: "5 - (-2) = 5 + 2 = 7, yielding 10⁷."
                },
                {
                  stepNumber: 4,
                  instruction: "Confirm normalization 1 <= A < 10.",
                  reasoning: "3.0 lies in [1, 10), so the final answer is 3.0 × 10⁷."
                }
              ],
              takeawayRule: "Dividing by 10⁻² subtracts (-2), which ADDS +2 to the exponent."
            },
            {
              title: "Simplifying and Combining Quadratic Surds",
              problemStatement: "Simplify √75 + √27 - √12 completely.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Factor out the largest perfect square inside each radical.",
                  reasoning: "75 = 25 × 3; 27 = 9 × 3; 12 = 4 × 3."
                },
                {
                  stepNumber: 2,
                  instruction: "Evaluate each exact square root via √(ab) = √a √b.",
                  reasoning: "√75 = 5√3; √27 = 3√3; √12 = 2√3."
                },
                {
                  stepNumber: 3,
                  instruction: "Collect coefficients of the shared irrational factor √3.",
                  reasoning: "(5 + 3 - 2)√3."
                },
                {
                  stepNumber: 4,
                  instruction: "State the simplified surd.",
                  reasoning: "6√3."
                }
              ],
              takeawayRule: "Like surds combine just like algebraic terms (5x + 3x - 2x = 6x) once reduced to common radical form."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding radicals directly: claiming √9 + √16 = √25 or √50 + √18 = √68.",
              whyItIsWrong: "Square roots do NOT distribute across addition: 3 + 4 = 7, whereas √25 = 5.",
              correctCorrection: "Simplify each radical separately into k√p before combining coefficients of matching √p."
            },
            {
              misconception: "Treating a negative exponent like 5⁻² as a negative number (-25).",
              whyItIsWrong: "Negative exponents represent reciprocals (division by powers), never negative signs in front.",
              correctCorrection: "Rewrite a⁻ⁿ immediately as 1 / aⁿ (e.g., 5⁻² = 1/25)."
            }
          ],
          guidedPracticePrompt: "Simplify (2.4 × 10⁻³) × (5.0 × 10⁷) and normalize into A × 10ⁿ.",
          independentPracticePrompt: "Evaluate 16^(3/4) + 27^(-1/3) without a calculator.",
          extensionActivity: "Rationalize the denominator of 12 / √3 and 6 / (√5 - √2) using conjugates.",
          diagnosticSelfCheck: "Why is 0.45 × 10⁻³ NOT valid scientific standard form, and how do you normalize it?",
          transferApplication: "Compare the mass of Earth (5.97 × 10²⁴ kg) to Mars (6.42 × 10²³ kg) as a ratio in standard form.",
          masteryAssessment: "Solve for n: 9^(n+1) = 27^(n-1).",
          summaryRecap: "Keep bases identical for index laws, respect 1 <= A < 10 in standard form, and extract square factors to combine surds.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p1-ind-1",
            type: "multiple_choice",
            questionText: "Express 0.00045 in scientific standard form.",
            options: ["4.5 × 10⁻⁴", "4.5 × 10⁻³", "45 × 10⁻⁵", "0.45 × 10⁻³"],
            correctAnswer: "4.5 × 10⁻⁴",
            explanation: "Moving the decimal point 4 places right to place 4.5 in [1, 10) gives 4.5 × 10⁻⁴.",
            hintLadder: [
              "Locate the mantissa A between 1 and 10: A = 4.5.",
              "Count decimal shifts from 0.00045 to 4.5 (4 places right => exponent -4)."
            ],
            misconceptionAlerts: [
              { trigger: "4.5 × 10⁻³", note: "4.5 × 10⁻³ equals 0.0045 (one zero too few)." }
            ],
            skillId: "skill-jss-indices-standard-form",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-ind-2",
            type: "multiple_choice",
            questionText: "Simplify x⁵ × x³ ÷ x².",
            options: ["x⁶", "x¹⁰", "x⁷", "x⁴"],
            correctAnswer: "x⁶",
            explanation: "Combine powers on the shared base x: x^(5 + 3 - 2) = x⁶.",
            hintLadder: [
              "Multiply same bases by adding exponents: 5 + 3 = 8.",
              "Divide by subtracting the exponent 2: 8 - 2 = 6."
            ],
            misconceptionAlerts: [
              { trigger: "x⁷", note: "(5 × 3) ÷ 2 is incorrect—indices add and subtract, not multiply and divide." }
            ],
            skillId: "skill-jss-indices-standard-form",
            difficulty: "easy",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-ind-3",
            type: "multiple_choice",
            questionText: "Evaluate 27^(-2/3) as an exact fraction.",
            options: ["1/9", "-9", "1/18", "-1/9"],
            correctAnswer: "1/9",
            explanation: "27^(-2/3) = 1 / 27^(2/3) = 1 / (³√27)² = 1 / 3² = 1/9.",
            hintLadder: [
              "Negative exponent sends 27^(2/3) to the denominator.",
              "Take cube root of 27 first (³√27 = 3), then square it."
            ],
            misconceptionAlerts: [
              { trigger: "-9", note: "Negative exponents invert into fractions (1/...), never negative integers." }
            ],
            skillId: "skill-jss-indices-standard-form",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-ind-4",
            type: "multiple_choice",
            questionText: "Simplify √50 + √18 in surd form.",
            options: ["8√2", "√68", "16√2", "2√17"],
            correctAnswer: "8√2",
            explanation: "√50 = √(25×2) = 5√2 and √18 = √(9×2) = 3√2. Summing gives 5√2 + 3√2 = 8√2.",
            hintLadder: [
              "Factor largest perfect squares: 50 = 25 × 2 and 18 = 9 × 2.",
              "Simplify to 5√2 + 3√2 and add coefficients."
            ],
            misconceptionAlerts: [
              { trigger: "√68", note: "Surds cannot be added directly inside the square root sign." }
            ],
            skillId: "skill-jss-indices-standard-form",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-ind-5",
            type: "multiple_choice",
            questionText: "Solve for n in the exponential equation 8^(n - 1) = 64².",
            options: ["n = 5", "n = 3", "n = 4", "n = 6"],
            correctAnswer: "n = 5",
            explanation: "Rewrite over base 2 (or base 8): 8^(n-1) = (8²)² = 8⁴ => n - 1 = 4 => n = 5.",
            hintLadder: [
              "Write 64 as 8² so both sides share base 8.",
              "Simplify (8²)² = 8⁴, then equate exponents n - 1 = 4."
            ],
            misconceptionAlerts: [
              { trigger: "n = 3", note: "64² is (8²)² = 8⁴, not 8²." }
            ],
            skillId: "skill-jss-indices-standard-form",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 9. jss_197_algebraic_expressions_factorisation_
  // =========================================================================
  {
    id: "unit-p1-jss-inequalities-factorisation",
    subjectId: "jss_197_algebraic_expressions_factorisation_",
    level: "junior_secondary",
    title: "Algebraic Expressions, Quadratic Factorisation & Linear Inequalities",
    code: "JSS-INE-197",
    description:
      "Master monic quadratic factorisation x² + bx + c, algebraic fraction cancellation, and linear inequality solution sets including sign-reversal under negative division.",
    order: 5,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-ALG-02",
      "WAEC_WASSCE:MTH-INE-FAC",
      "CAMBRIDGE_IGCSE:JSS-ALG-INE"
    ],
    skills: [
      {
        id: "skill-jss-inequalities-factorisation",
        unitId: "unit-p1-jss-inequalities-factorisation",
        title: "Quadratic Factorisation, Algebraic Fractions & Inequalities",
        code: "SKL-JSS-INE-197",
        summary:
          "Factor trinomials cleanly, cancel common bracket factors in rational expressions, and solve inequalities without losing sign reversal.",
        objectives: [
          "Factor monic quadratics x² + bx + c by matching sum b and product c",
          "Simplify rational algebraic expressions by factoring numerator and denominator before cancelling",
          "Solve linear inequalities with fractional coefficients and negative x-terms accurately"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-algebraic-expansion-factoring", "skill-linear-equations"],
        lesson: {
          id: "les-jss-inequalities-factorisation",
          title: "Factorisation, Algebraic Fractions & Linear Inequalities",
          hookAndIntuition:
            "Equations find a single balance point, whereas inequalities carve out an entire safe operating range—like speed limits, bridge load tolerances, or minimum pass scores.",
          conceptualExplanation:
            "To factor a monic quadratic x² + bx + c into (x + p)(x + q), seek two integers p and q whose product p·q = c and sum p + q = b. Pay sharp attention to signs: when c < 0, p and q carry opposite signs and the larger magnitude inherits the sign of b. Never cancel individual terms added inside a fraction like (x² - 9)/(x + 3): factor the numerator into (x - 3)(x + 3) first, then cancel the entire common factor (x + 3) to leave x - 3 (for x != -3).\n\nLinear inequalities (<, <=, >, >=) obey all balancing moves EXCEPT one golden rule: multiplying or dividing both sides by any NEGATIVE number flips the inequality direction (< becomes >, >= becomes <=). Verify by substituting one test value from your solution interval back into the original inequality.",
          conceptualModel:
            "x² + bx + c -> Find p + q = b, pq = c | Rational Fractions -> Factor Brackets BEFORE Cancelling | Divide by Negative -> FLIP Inequality Sign.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Sum-Product Factorisation: x² + bx + c = (x + p)(x + q)",
              definition: "Requires p + q = b and p × q = c simultaneously.",
              practicalExample: "x² - x - 12: (-4) + 3 = -1 and (-4)(3) = -12 => (x - 4)(x + 3)."
            },
            {
              termOrSymbol: "Negative Multiplier Reversal Rule",
              definition: "If a < b and k < 0, then ka > kb and a/k > b/k.",
              practicalExample: "5 - 2x >= 13 => -2x >= 8 => x <= -4."
            },
            {
              termOrSymbol: "Whole-Bracket Cancellation",
              definition: "Cancel only common multiplicative factors, never isolated terms separated by + or -.",
              practicalExample: "(x² - 9)/(x + 3) = [(x - 3)(x + 3)]/(x + 3) = x - 3 (x != -3)."
            }
          ],
          workedExamples: [
            {
              title: "Solving an Inequality with Negative Coefficient",
              problemStatement: "Solve 5 - 2x >= 13 and check your solution with a boundary test value.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Subtract 5 from both sides to isolate the variable term.",
                  reasoning: "-2x >= 13 - 5 => -2x >= 8."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide both sides by -2 and REVERSE the >= sign to <=.",
                  reasoning: "Dividing by negative flips direction: x <= 8 / (-2) => x <= -4."
                },
                {
                  stepNumber: 3,
                  instruction: "Verify the boundary x = -4.",
                  reasoning: "5 - 2(-4) = 5 + 8 = 13 >= 13 ✓."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify an interior point x = -5 (since -5 <= -4) and a rejected point x = 0.",
                  reasoning: "At x = -5: 5 - 2(-5) = 15 >= 13 ✓. At x = 0: 5 >= 13 (False) ✓."
                }
              ],
              takeawayRule: "Dividing or multiplying an inequality by a negative number ALWAYS reverses the inequality arrow."
            },
            {
              title: "Factoring and Simplifying a Rational Expression",
              problemStatement: "Factorise x² - x - 12 and simplify (x² - x - 12) / (x + 3) for x != -3.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify target sum b = -1 and target product c = -12.",
                  reasoning: "Opposite-sign factors of -12 whose difference is 1 are -4 and +3."
                },
                {
                  stepNumber: 2,
                  instruction: "Write the factored numerator.",
                  reasoning: "x² - x - 12 = (x - 4)(x + 3)."
                },
                {
                  stepNumber: 3,
                  instruction: "Check expansion: (x - 4)(x + 3) = x² + 3x - 4x - 12 = x² - x - 12.",
                  reasoning: "Matches numerator identically."
                },
                {
                  stepNumber: 4,
                  instruction: "Cancel the common factor (x + 3) across numerator and denominator.",
                  reasoning: "[(x - 4)(x + 3)] / (x + 3) = x - 4 (x != -3)."
                }
              ],
              takeawayRule: "Factor numerator and denominator completely before cancelling matching brackets."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting to flip '>' to '<' when dividing both sides by a negative coefficient.",
              whyItIsWrong: "On the number line, negating reverses order: 2 < 5, whereas -2 > -5.",
              correctCorrection: "Alternatively, move negative x-terms to the opposite side to keep coefficients positive, or flip immediately when dividing by negative."
            },
            {
              misconception: "Cancelling x² and x individually in (x² - 9)/(x + 3) to claim x - 3 without factoring.",
              whyItIsWrong: "Cancelling across subtraction fails completely on sums like (x + 6)/x != 7.",
              correctCorrection: "Cancel strictly multiplicative bracket factors only."
            }
          ],
          guidedPracticePrompt: "Solve 3(x - 2) < 5x + 4 and represent the solution on a number line.",
          independentPracticePrompt: "Factorise x² + 5x - 24 and simplify (x² + 5x - 24)/(x - 3).",
          extensionActivity: "Find all integer values of x satisfying -3 < 2x + 1 <= 9 simultaneously.",
          diagnosticSelfCheck: "Why does the inequality -3x > 12 reverse to x < -4?",
          transferApplication: "A delivery van weighing 1,400 kg can carry at most 2,600 kg across a bridge. Write and solve an inequality for how many 40 kg crates it can carry.",
          masteryAssessment: "Find the smallest integer n satisfying (2n + 1)/3 < n - 1.",
          summaryRecap: "Match sum/product integers to factor quadratics, factor completely before cancelling fractions, and flip inequalities on negative division.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p1-ine-1",
            type: "multiple_choice",
            questionText: "Expand and simplify: 3(2x - 4) - 2(x - 5).",
            options: ["4x - 2", "4x - 22", "8x - 2", "4x + 2"],
            correctAnswer: "4x - 2",
            explanation: "3(2x - 4) - 2(x - 5) = 6x - 12 - 2x + 10 = 4x - 2.",
            hintLadder: [
              "Distribute -2 across BOTH terms in (x - 5): -2x + 10.",
              "Collect 6x - 2x and -12 + 10."
            ],
            misconceptionAlerts: [
              { trigger: "4x - 22", note: "(-2)(-5) equals +10, not -10." }
            ],
            skillId: "skill-jss-inequalities-factorisation",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-ine-2",
            type: "multiple_choice",
            questionText: "Factorise completely: 6a²b - 9ab².",
            options: ["3ab(2a - 3b)", "3a(2ab - 3b²)", "ab(6a - 9b)", "3ab(2a + 3b)"],
            correctAnswer: "3ab(2a - 3b)",
            explanation: "The full HCF of 6a²b and 9ab² is 3ab, leaving 3ab(2a - 3b).",
            hintLadder: [
              "Find numerical HCF(6, 9) = 3 and lowest shared powers a¹ and b¹.",
              "Divide each term by 3ab inside the bracket."
            ],
            misconceptionAlerts: [
              { trigger: "ab(6a - 9b)", note: "6 and 9 still share a numerical factor of 3." }
            ],
            skillId: "skill-jss-inequalities-factorisation",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-ine-3",
            type: "multiple_choice",
            questionText: "Solve the linear inequality: 4 - 3x > 16.",
            options: ["x < -4", "x > -4", "x < 4", "x > -20/3"],
            correctAnswer: "x < -4",
            explanation: "Subtract 4 -> -3x > 12. Divide by -3 and flip inequality sign -> x < -4.",
            hintLadder: [
              "Subtract 4 from both sides to get -3x > 12.",
              "When dividing by -3, remember to reverse '>' to '<'."
            ],
            misconceptionAlerts: [
              { trigger: "x > -4", note: "Test x = 0: 4 - 0 > 16 is FALSE! You forgot to flip '>' when dividing by -3." }
            ],
            skillId: "skill-jss-inequalities-factorisation",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-ine-4",
            type: "multiple_choice",
            questionText: "Factorise x² - 11x + 28.",
            options: [
              "(x - 4)(x - 7)",
              "(x + 4)(x + 7)",
              "(x - 2)(x - 14)",
              "(x + 4)(x - 7)"
            ],
            correctAnswer: "(x - 4)(x - 7)",
            explanation: "(-4) + (-7) = -11 and (-4)(-7) = +28, giving (x - 4)(x - 7).",
            hintLadder: [
              "Positive constant +28 and negative middle term -11 require two negative integers.",
              "Check which factor pair of 28 sums to 11."
            ],
            misconceptionAlerts: [
              { trigger: "(x + 4)(x - 7)", note: "(+4)(-7) = -28, wrong sign on constant term." }
            ],
            skillId: "skill-jss-inequalities-factorisation",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-ine-5",
            type: "multiple_choice",
            questionText: "What is the SMALLEST integer x satisfying (2x + 1)/3 < x - 1?",
            options: ["5", "4", "3", "6"],
            correctAnswer: "5",
            explanation: "Multiply by 3: 2x + 1 < 3x - 3 => 4 < x (i.e., x > 4). Because strict '>' excludes 4, the smallest integer is 5.",
            hintLadder: [
              "Multiply both sides by 3: 2x + 1 < 3(x - 1) = 3x - 3.",
              "Solve for x and check whether x = 4 satisfies strict '<'."
            ],
            misconceptionAlerts: [
              { trigger: "4", note: "At x = 4, LHS = 9/3 = 3 and RHS = 4 - 1 = 3, and 3 < 3 is FALSE." }
            ],
            skillId: "skill-jss-inequalities-factorisation",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 10. jss_198_linear_graphs_coordinate_geometry_fu
  // =========================================================================
  {
    id: "unit-p1-jss-linear-graphs-coord",
    subjectId: "jss_198_linear_graphs_coordinate_geometry_fu",
    level: "junior_secondary",
    title: "Linear Graphs, Gradients, Midpoints & Coordinate Geometry",
    code: "JSS-CRD-198",
    description:
      "Master Cartesian gradient m = Δy/Δx, slope-intercept y = mx + c, segment midpoint & Euclidean distance formulas, and perpendicular gradient rule m₁m₂ = -1.",
    order: 6,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-MTH-CRD-01",
      "WAEC_WASSCE:MTH-CRD-GEO",
      "CAMBRIDGE_IGCSE:JSS-CRD-LIN"
    ],
    skills: [
      {
        id: "skill-jss-linear-graphs-coord",
        unitId: "unit-p1-jss-linear-graphs-coord",
        title: "Gradient, Line Equations, Midpoints & Perpendiculars",
        code: "SKL-JSS-CRD-198",
        summary:
          "Derive linear equations from two points, compute midpoints and distances between coordinates, and construct parallel or perpendicular lines.",
        objectives: [
          "Compute gradient m = (y₂ - y₁)/(x₂ - x₁) and interpret steepness and sign",
          "Find segment midpoints ((x₁+x₂)/2, (y₁+y₂)/2) and lengths √((Δx)² + (Δy)²)",
          "Construct parallel (m₁ = m₂) and perpendicular (m₁m₂ = -1) line equations and solve intersections"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-linear-equations", "skill-jss-pythagoras-mensuration"],
        lesson: {
          id: "les-jss-linear-graphs-coord",
          title: "Linear Graphs & Coordinate Geometry",
          hookAndIntuition:
            "A coordinate plane translates straight geometric lines into exact algebra—turning distance into Pythagoras' theorem and perpendicular right angles into negative-reciprocal slopes.",
          conceptualExplanation:
            "Every non-vertical straight line has equation y = mx + c, where m = (y₂ - y₁)/(x₂ - x₁) is the gradient (vertical rise per unit horizontal run) and c is the y-intercept where the line crosses the y-axis (x = 0). Positive m slopes upward left-to-right; negative m slopes downward; m = 0 is horizontal.\n\nTwo lines are parallel when m₁ = m₂ and perpendicular (90°) when m₁ × m₂ = -1 (meaning m₂ = -1/m₁, the negative reciprocal). For any segment joining A(x₁, y₁) and B(x₂, y₂), the midpoint is simply the average of coordinates ((x₁ + x₂)/2, (y₁ + y₂)/2), and the exact segment length comes straight from a right triangle: d = √((x₂ - x₁)² + (y₂ - y₁)²).",
          conceptualModel:
            "m = (y₂-y₁)/(x₂-x₁) | Parallel: m₁ = m₂ | Perpendicular: m₁m₂ = -1 | Midpoint: Average | Distance: √(Δx² + Δy²).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Gradient & Slope-Intercept: y = mx + c",
              definition: "m = Δy / Δx gives slope; c gives y-intercept (0, c).",
              practicalExample: "Through (1, 3) and (5, 11): m = (11-3)/(5-1) = 2; c = 3 - 2(1) = 1 => y = 2x + 1."
            },
            {
              termOrSymbol: "Midpoint & Distance Formulas",
              definition: "M = ((x₁+x₂)/2, (y₁+y₂)/2); d = √((x₂-x₁)² + (y₂-y₁)²).",
              practicalExample: "A(1, 2), B(7, 10) => M = (4, 6), d = √(6² + 8²) = 10."
            },
            {
              termOrSymbol: "Perpendicular Slope: m₁ × m₂ = -1",
              definition: "Negative reciprocal gradient turns any line by 90°.",
              practicalExample: "Perpendicular to m₁ = 1/3 is m₂ = -3."
            }
          ],
          workedExamples: [
            {
              title: "Line Equation, Midpoint & Distance from Two Points",
              problemStatement: "Given A(1, 3) and B(5, 11), find the equation of line AB, its midpoint M, and exact length AB.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute the gradient m = (y₂ - y₁) / (x₂ - x₁).",
                  reasoning: "m = (11 - 3) / (5 - 1) = 8 / 4 = 2."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute point A(1, 3) and m = 2 into y = mx + c to find c.",
                  reasoning: "3 = 2(1) + c => c = 1. Line equation is y = 2x + 1 (check B: 2(5)+1 = 11 ✓)."
                },
                {
                  stepNumber: 3,
                  instruction: "Average coordinates for midpoint M.",
                  reasoning: "M = ((1 + 5)/2, (3 + 11)/2) = (3, 7)."
                },
                {
                  stepNumber: 4,
                  instruction: "Apply Pythagoras' theorem for exact distance AB.",
                  reasoning: "AB = √((5 - 1)² + (11 - 3)²) = √(16 + 64) = √80 = 4√5."
                }
              ],
              takeawayRule: "Always subtract coordinates in the exact SAME order (B minus A for both y and x) when computing gradient."
            },
            {
              title: "Constructing a Perpendicular Line Equation",
              problemStatement: "Find the equation of the line perpendicular to y = (1/3)x - 2 passing through (2, -1).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Read the gradient m₁ of the reference line.",
                  reasoning: "From y = (1/3)x - 2, m₁ = 1/3."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute the perpendicular gradient m₂ = -1 / m₁.",
                  reasoning: "m₂ = -1 / (1/3) = -3."
                },
                {
                  stepNumber: 3,
                  instruction: "Substitute (2, -1) and m₂ = -3 into y = m₂x + c.",
                  reasoning: "-1 = -3(2) + c => -1 = -6 + c => c = 5."
                },
                {
                  stepNumber: 4,
                  instruction: "Write the final equation and verify.",
                  reasoning: "y = -3x + 5. Check (2, -1): -3(2)+5 = -1 ✓, and (1/3)(-3) = -1 ✓."
                }
              ],
              takeawayRule: "Flip the fraction AND negate the sign to obtain the perpendicular gradient."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Inverting gradient as run/rise = (x₂ - x₁)/(y₂ - y₁) or mixing point order (y₂ - y₁)/(x₁ - x₂).",
              whyItIsWrong: "Swapping Δx and Δy flips slopes; reversing subtraction order on only one axis flips the sign of m.",
              correctCorrection: "Remember 'Rise over Run' = Δy / Δx, keeping point 2 first in both numerator and denominator."
            },
            {
              misconception: "Reading gradient directly from 2x + 3y = 6 as m = 2 before isolating y.",
              whyItIsWrong: "Slope m is only the x-coefficient once y is isolated with coefficient +1.",
              correctCorrection: "Rearrange 2x + 3y = 6 to y = (-2/3)x + 2 first -> m = -2/3."
            }
          ],
          guidedPracticePrompt: "Find the equation of the line parallel to y = 4x - 5 passing through (1, 7).",
          independentPracticePrompt: "Show whether triangle P(0,0), Q(4,2), R(2,6) contains a right angle using perpendicular gradients.",
          extensionActivity: "Find the perpendicular bisector of segment A(-2, 4) to B(6, 0).",
          diagnosticSelfCheck: "What happens to the gradient formula if two points lie on a vertical line like (3, 1) and (3, 8)?",
          transferApplication: "Model taxi fare: ₦500 flag-drop fee plus ₦200 per kilometre as y = 200x + 500 and interpret slope/intercept.",
          masteryAssessment: "Determine the x-intercept and y-intercept of 3x - 4y = 24 and find the area of the triangle formed with the axes.",
          summaryRecap: "Convert lines to y = mx + c, check m₁=m₂ (parallel) or m₁m₂=-1 (perpendicular), and use coordinate averages/Pythagoras for segments.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p1-crd-1",
            type: "multiple_choice",
            questionText: "What is the gradient of the straight line y = -4x + 7?",
            options: ["-4", "7", "4", "-7"],
            correctAnswer: "-4",
            explanation: "In slope-intercept form y = mx + c, the gradient m is the coefficient of x, which is -4.",
            hintLadder: [
              "Compare y = -4x + 7 directly to y = mx + c.",
              "The coefficient multiplying x is m (including its minus sign)."
            ],
            misconceptionAlerts: [
              { trigger: "7", note: "7 is the y-intercept c, not the gradient m." }
            ],
            skillId: "skill-jss-linear-graphs-coord",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p1-crd-2",
            type: "multiple_choice",
            questionText: "Find the midpoint of the line segment joining (-2, 5) and (6, 9).",
            options: ["(2, 7)", "(4, 2)", "(4, 14)", "(3, 7)"],
            correctAnswer: "(2, 7)",
            explanation: "M = ((-2 + 6)/2, (5 + 9)/2) = (4/2, 14/2) = (2, 7).",
            hintLadder: [
              "Average the x-coordinates: (-2 + 6) / 2.",
              "Average the y-coordinates: (5 + 9) / 2."
            ],
            misconceptionAlerts: [
              { trigger: "(4, 2)", note: "Subtracting instead of adding averages computes Δx/2 rather than the midpoint." }
            ],
            skillId: "skill-jss-linear-graphs-coord",
            difficulty: "easy",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-crd-3",
            type: "multiple_choice",
            questionText: "Calculate the exact distance between points P(1, 2) and Q(7, 10).",
            options: ["10", "14", "8", "√28"],
            correctAnswer: "10",
            explanation: "Δx = 7 - 1 = 6 and Δy = 10 - 2 = 8. Distance d = √(6² + 8²) = √(36 + 64) = √100 = 10.",
            hintLadder: [
              "Find horizontal run Δx = 7 - 1 = 6 and vertical rise Δy = 10 - 2 = 8.",
              "Apply √(6² + 8²)."
            ],
            misconceptionAlerts: [
              { trigger: "14", note: "14 = 6 + 8 adds legs linearly instead of applying Pythagoras." }
            ],
            skillId: "skill-jss-linear-graphs-coord",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p1-crd-4",
            type: "multiple_choice",
            questionText: "Find the equation of the line with gradient 3 passing through the point (2, 1).",
            options: ["y = 3x - 5", "y = 3x + 1", "y = 3x - 1", "y = 3x + 5"],
            correctAnswer: "y = 3x - 5",
            explanation: "Substitute m = 3, x = 2, y = 1 into y = mx + c: 1 = 3(2) + c => c = 1 - 6 = -5 => y = 3x - 5.",
            hintLadder: [
              "Start with y = 3x + c.",
              "Plug in x = 2, y = 1 to solve 1 = 6 + c."
            ],
            misconceptionAlerts: [
              { trigger: "y = 3x + 1", note: "1 is the y-value at x = 2, NOT the y-intercept at x = 0." }
            ],
            skillId: "skill-jss-linear-graphs-coord",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p1-crd-5",
            type: "multiple_choice",
            questionText: "At what coordinates do the lines y = 2x - 1 and x + y = 8 intersect?",
            options: ["(3, 5)", "(5, 3)", "(2, 6)", "(4, 4)"],
            correctAnswer: "(3, 5)",
            explanation: "Substitute y = 2x - 1 into x + y = 8: x + (2x - 1) = 8 => 3x = 9 => x = 3, y = 2(3) - 1 = 5.",
            hintLadder: [
              "Replace y in x + y = 8 with (2x - 1).",
              "Solve 3x - 1 = 8 for x, then substitute back to find y."
            ],
            misconceptionAlerts: [
              { trigger: "(5, 3)", note: "Verify coordinates in order (x, y): 2(5) - 1 = 9 != 3." }
            ],
            skillId: "skill-jss-linear-graphs-coord",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  }
];
