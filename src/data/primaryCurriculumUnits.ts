/**
 * MOOS TECHY ACADEMY — PRIMARY CURRICULUM UNITS & LESSON REPOSITORY
 * 
 * TASK ID: MOOS-CURRICULUM-003 (Batch 1: Primary Foundations & Common Entrance)
 * 
 * Authoritative, non-placeholder curricular units for all 41 Primary subjects
 * spanning Primary Foundations (Grades 1-3) and Upper Primary (Grades 4-6).
 * 
 * Standards Alignment:
 * - NERDC Nigerian National Primary Curriculum
 * - National Common Entrance Examination (NCEE) Benchmarks
 * - Cambridge Primary / UK KS1-KS2 Alignment
 * - US Common Core State Standards (CCSS K-5)
 * 
 * All units strictly adhere to:
 * - 5-Phase Pedagogical Lessons (Hook, Conceptual Explanation, Key Terms, Worked Examples, Misconceptions)
 * - 3-Tier Progressive Hint Ladders on every question
 * - Plausible Multiple-Choice Options with strict answer-key validity
 * - Distractor Misconception Alerts for automated diagnostic remediation
 */

import { Unit } from "../types/curriculum";
import { WAVE1_DEEP_SATURATED_MATH_UNITS } from "./primary/wave1DeepSaturatedMathUnits";
import { PRIMARY_ENGLISH_LITERACY_UNITS } from "./primary/primaryEnglishLiteracyUnits";
import { PRIMARY_STEM_SCIENCE_UNITS } from "./primary/primaryStemScienceUnits";
import { PRIMARY_SOCIAL_ARTS_UNITS } from "./primary/primarySocialArtsUnits";

const CORE_FOUNDATIONAL_UNITS: Unit[] = [
  // =========================================================================
  // 1. PRIMARY MATHEMATICS DOMAIN (10 Subjects)
  // =========================================================================
  {
    id: "unit-pri-math-numeracy-01",
    subjectId: "pri_math_numeracy",
    level: "primary_foundations",
    title: "Counting, Base Ten & Place Value to 100",
    code: "MTH-NUM-01",
    description: "Build concrete number sense through physical grouping, one-to-one correspondence, and identifying Tens and Units.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-num-placevalue",
        unitId: "unit-pri-math-numeracy-01",
        title: "Place Value: Bundles of Tens and Units",
        code: "SKL-PRI-NUM-01",
        summary: "Deconstruct two-digit numbers into tens and ones using base-ten models.",
        objectives: [
          "Group quantities into bundles of 10 and loose units",
          "Identify the place value of any digit in numbers 1 to 100",
          "Compare two-digit numbers using >, <, and = symbols"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-num-placevalue",
          title: "The Magic of Tens and Ones: How Numbers are Built",
          hookAndIntuition: "Imagine you are counting 47 mangoes at the market. Instead of counting one by one, you pack them into baskets of 10. You fill 4 full baskets and have 7 loose mangoes left over. That is why 47 is 4 tens and 7 ones!",
          conceptualExplanation: "In our base-ten number system, the position of a digit gives it its value. In the two-digit number 58, the digit 5 is in the Tens column, meaning 5 tens or 50. The digit 8 is in the Units column, meaning 8 ones. Combining 50 + 8 gives 58.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Digit", definition: "Any of the numerals from 0 to 9 used to form numbers.", practicalExample: "The digits in 47 are 4 and 7." },
            { termOrSymbol: "Tens", definition: "A bundle consisting of exactly ten single items.", practicalExample: "3 Tens = 30." },
            { termOrSymbol: "Units (Ones)", definition: "Single items that have not yet formed a group of ten.", practicalExample: "7 Units = 7." }
          ],
          workedExamples: [
            {
              title: "Finding the Value of Digits in 83",
              problemStatement: "In the number 83, what is the place value of the digit 8, and what is the value of the digit 3?",
              steps: [
                { stepNumber: 1, instruction: "Identify the columns", reasoning: "The rightmost column is Units; the column to its left is Tens." },
                { stepNumber: 2, instruction: "Evaluate the tens digit", reasoning: "8 is in the Tens place, which represents 8 groups of 10 = 80." },
                { stepNumber: 3, instruction: "Evaluate the units digit", reasoning: "3 is in the Units place, which represents 3 ones = 3." }
              ],
              takeawayRule: "Always read place value from right to left: first column is Units, second column is Tens."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking the digit 5 in 52 has a value of 5.",
              whyItIsWrong: "Because 5 is in the Tens column, it represents 5 tens (50), not 5 ones.",
              correctCorrection: "Remember that position matters: 5 in the tens column equals 50."
            }
          ],
          guidedPracticePrompt: "What number has 6 Tens and 4 Units? Write down your reasoning.",
          summaryRecap: "Two-digit numbers are composed of Tens and Units. The left digit tells how many tens; the right digit tells how many loose units."
        },
        questions: [
          {
            id: "q-pri-num-01",
            type: "multiple_choice",
            questionText: "What is the value of the digit 6 in the number 64?",
            options: ["60", "6", "64", "40"],
            correctAnswer: "60",
            explanation: "In 64, the digit 6 is in the Tens column. Its value is 6 × 10 = 60.",
            hintLadder: [
              "Look at which column the digit 6 occupies: is it on the left (Tens) or right (Units)?",
              "The digit 4 is in the Units place, and the digit 6 is in the Tens place.",
              "6 tens equals 60."
            ],
            misconceptionAlerts: [
              { trigger: "6", note: "The digit is 6, but its place value in the tens column is 60." }
            ],
            skillId: "skill-pri-num-placevalue",
            difficulty: "easy"
          },
          {
            id: "q-pri-num-02",
            type: "multiple_choice",
            questionText: "Which number is made of 8 Tens and 5 Units?",
            options: ["85", "58", "805", "13"],
            correctAnswer: "85",
            explanation: "8 Tens = 80. 5 Units = 5. 80 + 5 = 85.",
            hintLadder: [
              "8 Tens is equal to 80.",
              "5 Units is equal to 5.",
              "Combine them: 80 + 5 = 85."
            ],
            misconceptionAlerts: [
              { trigger: "58", note: "Did you reverse the digits? The tens digit (8) comes first on the left." }
            ],
            skillId: "skill-pri-num-placevalue",
            difficulty: "easy"
          },
          {
            id: "q-pri-num-03",
            type: "multiple_choice",
            questionText: "Choose the correct symbol to compare the two numbers: 73 ___ 69",
            options: [">", "<", "=", "≤"],
            correctAnswer: ">",
            explanation: "Comparing the tens digits first: 7 tens (70) is greater than 6 tens (60). Therefore, 73 > 69.",
            hintLadder: [
              "First look at the tens digit: 7 tens versus 6 tens.",
              "7 tens is larger than 6 tens.",
              "The open mouth of the symbol points to the larger number: 73 > 69."
            ],
            misconceptionAlerts: [
              { trigger: "<", note: "The alligator mouth opens toward the larger number: 73 is larger than 69, so use >." }
            ],
            skillId: "skill-pri-num-placevalue",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-pri-math-arithmetic-01",
    subjectId: "pri_math_arithmetic",
    level: "primary_foundations",
    title: "Addition & Subtraction with Regrouping",
    code: "MTH-ARI-01",
    description: "Master column addition and subtraction involving carrying and borrowing across tens and units.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-arith-regrouping",
        unitId: "unit-pri-math-arithmetic-01",
        title: "Vertical Addition with Regrouping (Carrying)",
        code: "SKL-PRI-ARI-01",
        summary: "Add two-digit numbers when the sum of the units exceeds 9.",
        objectives: [
          "Line up digits vertically by place value",
          "Add units first and regroup 10 units as 1 ten",
          "Add the tens column including the carried-over ten"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-arith-regrouping",
          title: "Column Addition: Carrying When Units Overflow",
          hookAndIntuition: "If you have 8 coins and your friend gives you 6 coins, you have 14 coins. In our currency, 10 single coins can be traded for a ₦10 note! In vertical addition, whenever the units add up to 10 or more, we trade 10 ones for 1 ten and carry it over.",
          conceptualExplanation: "When adding 38 + 27 vertically: first add the units column (8 + 7 = 15). 15 has 1 ten and 5 units. Write down 5 in the units column and carry 1 ten to the top of the tens column. Then add the tens column: 1 (carried) + 3 + 2 = 6 tens. The sum is 65.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Regrouping (Carrying)", definition: "Trading 10 units for 1 ten and adding it into the tens column.", practicalExample: "8 + 7 = 15 -> write 5, carry 1 ten." },
            { termOrSymbol: "Sum", definition: "The total result obtained by adding two or more numbers together.", practicalExample: "The sum of 20 and 30 is 50." }
          ],
          workedExamples: [
            {
              title: "Calculating 46 + 28",
              problemStatement: "Add 46 and 28 vertically.",
              steps: [
                { stepNumber: 1, instruction: "Add units column", reasoning: "6 + 8 = 14. Write 4 in the units column and carry 1 to the tens." },
                { stepNumber: 2, instruction: "Add tens column", reasoning: "1 (carried) + 4 + 2 = 7 tens." },
                { stepNumber: 3, instruction: "Combine results", reasoning: "7 tens and 4 units give 74." }
              ],
              takeawayRule: "Always start adding from the right (units column), and carry any full ten to the left."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing down the full 14 in the units column to get 46 + 28 = 614.",
              whyItIsWrong: "The units column can only hold a single digit (0 to 9). 10 ones must become 1 ten.",
              correctCorrection: "Only write down the 4 units, and carry the 1 ten into the tens column."
            }
          ],
          guidedPracticePrompt: "Add 57 + 35 vertically. Show where you carry over the ten.",
          summaryRecap: "When units add to 10 or more, write the ones digit and carry the ten to the tens column."
        },
        questions: [
          {
            id: "q-pri-ari-01",
            type: "multiple_choice",
            questionText: "Calculate the sum of 47 and 36:",
            options: ["83", "73", "813", "713"],
            correctAnswer: "83",
            explanation: "Units: 7 + 6 = 13 (write 3, carry 1). Tens: 1 (carried) + 4 + 3 = 8. Total is 83.",
            hintLadder: [
              "Add the units column first: 7 + 6 = 13.",
              "Write 3 in the units place and carry 1 ten to the tens column.",
              "Add the tens column: 1 + 4 + 3 = 8 tens. Result is 83."
            ],
            misconceptionAlerts: [
              { trigger: "73", note: "Did you forget to add the 1 carried over from the units (7 + 6 = 13)?" },
              { trigger: "813", note: "You cannot write 13 in the units spot; you must carry the 1 ten over." }
            ],
            skillId: "skill-pri-arith-regrouping",
            difficulty: "easy"
          },
          {
            id: "q-pri-ari-02",
            type: "multiple_choice",
            questionText: "In a primary school library, there are 58 storybooks on the top shelf and 39 storybooks on the bottom shelf. How many storybooks are there altogether?",
            options: ["97", "87", "98", "89"],
            correctAnswer: "97",
            explanation: "58 + 39: 8 + 9 = 17 (write 7, carry 1). 1 + 5 + 3 = 9. Total = 97 books.",
            hintLadder: [
              "Set up vertically: 58 + 39.",
              "8 + 9 = 17. Write 7 and carry 1.",
              "1 + 5 + 3 = 9. The answer is 97."
            ],
            misconceptionAlerts: [
              { trigger: "87", note: "Remember to add the carried 1 ten: 1 + 5 + 3 = 9 tens, not 8 tens." }
            ],
            skillId: "skill-pri-arith-regrouping",
            difficulty: "easy"
          },
          {
            id: "q-pri-ari-03",
            type: "multiple_choice",
            questionText: "What number must be subtracted from 75 to get 42?",
            mathExpression: "75 - ? = 42",
            options: ["33", "37", "23", "35"],
            correctAnswer: "33",
            explanation: "75 - 42 = 33. Subtract units: 5 - 2 = 3. Subtract tens: 7 - 4 = 3.",
            hintLadder: [
              "To find the missing number, subtract 42 from 75.",
              "Units: 5 - 2 = 3.",
              "Tens: 7 - 4 = 3. So the number is 33."
            ],
            misconceptionAlerts: [
              { trigger: "37", note: "Check your subtraction in the units place: 5 - 2 = 3, not 7." }
            ],
            skillId: "skill-pri-arith-regrouping",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-pri-math-fractions-01",
    subjectId: "pri_math_fractions_decimals",
    level: "upper_primary",
    title: "Understanding Fractions & Decimals",
    code: "MTH-FRAC-01",
    description: "Explore equal sharing, proper and improper fractions, and converting tenths and hundredths into decimals.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-fractions-simplification",
        unitId: "unit-pri-math-fractions-01",
        title: "Equivalent Fractions & Simplest Form",
        code: "SKL-PRI-FRAC-01",
        summary: "Identify equivalent fractions and reduce fractions by dividing by common factors.",
        objectives: [
          "Explain fractions as part of a whole (numerator over denominator)",
          "Generate equivalent fractions by multiplying numerator and denominator by the same number",
          "Simplify fractions to their lowest terms using common factors"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-fractions-simplification",
          title: "Equal Slices: Visualizing Equivalent Fractions",
          hookAndIntuition: "Imagine cutting a round pizza into 4 slices and eating 2 slices. You ate 2/4 of the pizza. If you had cut the exact same pizza into 2 slices and eaten 1 slice, you would have eaten 1/2. 2/4 and 1/2 describe the exact same amount of pizza!",
          conceptualExplanation: "A fraction consists of a numerator (top number) showing how many parts we have, and a denominator (bottom number) showing the total number of equal parts. When both the top and bottom are divided by their greatest common factor, the fraction is in simplest form.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Numerator", definition: "The top number in a fraction showing parts chosen.", practicalExample: "In 3/4, 3 is the numerator." },
            { termOrSymbol: "Denominator", definition: "The bottom number in a fraction showing total equal parts.", practicalExample: "In 3/4, 4 is the denominator." }
          ],
          workedExamples: [
            {
              title: "Simplifying 18/24",
              problemStatement: "Reduce 18/24 to its simplest form.",
              steps: [
                { stepNumber: 1, instruction: "Find a common factor", reasoning: "Both 18 and 24 can be divided evenly by 6." },
                { stepNumber: 2, instruction: "Divide numerator and denominator", reasoning: "18 ÷ 6 = 3, and 24 ÷ 6 = 4." },
                { stepNumber: 3, instruction: "Check if further simplification is possible", reasoning: "3 and 4 share no common factors other than 1. Simplest form is 3/4." }
              ],
              takeawayRule: "To simplify a fraction, divide both numerator and denominator by the same common factor."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Dividing only the top or only the bottom number.",
              whyItIsWrong: "If you change only one part, you change the actual value of the fraction.",
              correctCorrection: "Whatever you do to the numerator, you MUST do to the denominator."
            }
          ],
          guidedPracticePrompt: "Simplify 15/20. What is the greatest common factor?",
          summaryRecap: "Equivalent fractions represent the same quantity. Simplify by dividing top and bottom by their common factor."
        },
        questions: [
          {
            id: "q-pri-frac-01",
            type: "multiple_choice",
            questionText: "Which fraction is equivalent to 1/2?",
            options: ["4/8", "2/5", "3/8", "4/10"],
            correctAnswer: "4/8",
            explanation: "Multiplying numerator and denominator of 1/2 by 4 gives (1 × 4) / (2 × 4) = 4/8.",
            hintLadder: [
              "Multiply both top and bottom of 1/2 by the same number.",
              "1 × 4 = 4, and 2 × 4 = 8.",
              "Therefore, 4/8 is equivalent to 1/2."
            ],
            misconceptionAlerts: [
              { trigger: "2/5", note: "Half of 5 is 2.5, not 2; 2/5 is less than 1/2." }
            ],
            skillId: "skill-pri-fractions-simplification",
            difficulty: "easy"
          },
          {
            id: "q-pri-frac-02",
            type: "multiple_choice",
            questionText: "What is 15/25 in its simplest form?",
            options: ["3/5", "5/8", "1/2", "3/4"],
            correctAnswer: "3/5",
            explanation: "The common factor of 15 and 25 is 5. 15 ÷ 5 = 3 and 25 ÷ 5 = 5, giving 3/5.",
            hintLadder: [
              "Both 15 and 25 end in 5, so both divide evenly by 5.",
              "15 ÷ 5 = 3.",
              "25 ÷ 5 = 5. The fraction is 3/5."
            ],
            misconceptionAlerts: [
              { trigger: "1/2", note: "15 is more than half of 25 (half of 25 is 12.5)." }
            ],
            skillId: "skill-pri-fractions-simplification",
            difficulty: "easy"
          },
          {
            id: "q-pri-frac-03",
            type: "multiple_choice",
            questionText: "Convert the fraction 3/10 into a decimal:",
            options: ["0.3", "0.03", "3.0", "0.33"],
            correctAnswer: "0.3",
            explanation: "3 tenths is written as 0.3 in decimal notation.",
            hintLadder: [
              "The first digit after the decimal point represents tenths.",
              "3 tenths means placing 3 in that first column.",
              "The result is 0.3."
            ],
            misconceptionAlerts: [
              { trigger: "0.03", note: "0.03 represents 3 hundredths (3/100), not 3 tenths." }
            ],
            skillId: "skill-pri-fractions-simplification",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. PRIMARY LITERACY & ENGLISH DOMAIN (8 Subjects)
  // =========================================================================
  {
    id: "unit-pri-phonics-01",
    subjectId: "pri_phonics_reading",
    level: "primary_foundations",
    title: "Synthetic Phonics, Letter Sounds & Blending",
    code: "ENG-PHON-01",
    description: "Learn 44 phonemes, short and long vowel sounds, and how to blend letter sounds to read simple decodable words.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-phonics-blending",
        unitId: "unit-pri-phonics-01",
        title: "CVC Blending & Short Vowel Sounds",
        code: "SKL-PRI-PHON-01",
        summary: "Blend consonant-vowel-consonant sounds to pronounce and decode words.",
        objectives: [
          "Distinguish short vowel sounds: /a/, /e/, /i/, /o/, /u/",
          "Blend initial, medial, and final sounds together (e.g. /c/-/a/-/t/ -> cat)",
          "Segment spoken words into individual sound phonemes"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-phonics-blending",
          title: "Sounding It Out: How Letter Sounds Join to Make Words",
          hookAndIntuition: "Letters are like musical instruments. When they play together, they make a song! If you say the sound /s/, then /u/, then /n/, smoothly slide them together: sssss-uuu-nnnn -> SUN!",
          conceptualExplanation: "Reading starts with hearing and blending letter sounds (phonemes). A CVC word has a Consonant, a Vowel in the middle, and a Consonant at the end. Saying each sound smoothly without pausing allows your brain to hear the complete word.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Phoneme", definition: "The smallest distinct unit of sound in a spoken word.", practicalExample: "The word 'cat' has 3 phonemes: /k/, /æ/, /t/." },
            { termOrSymbol: "Blending", definition: "Smoothly pushing individual sounds together to say a word.", practicalExample: "/p/ + /e/ + /n/ = pen." }
          ],
          workedExamples: [
            {
              title: "Blending the sounds in /m/ - /a/ - /t/",
              problemStatement: "Blend the sounds /m/, /a/, and /t/ to form a word.",
              steps: [
                { stepNumber: 1, instruction: "Say the first sound", reasoning: "/m/ as in moon." },
                { stepNumber: 2, instruction: "Add the vowel sound", reasoning: "/m/ + /a/ gives /ma/." },
                { stepNumber: 3, instruction: "Add the final consonant", reasoning: "/ma/ + /t/ gives 'mat'." }
              ],
              takeawayRule: "Keep the sounds running smoothly without stopping in between to hear the word clearly."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Saying letter names instead of letter sounds (e.g. saying 'See-Ay-Tee' instead of /k/-/æ/-/t/).",
              whyItIsWrong: "Letter names do not blend together to make spoken words; letter sounds do.",
              correctCorrection: "Always use the sound of the letter, not its alphabet name, when sounding out words."
            }
          ],
          guidedPracticePrompt: "Sound out /f/ - /i/ - /sh/. What word do you hear?",
          summaryRecap: "Phonics helps us read by matching letter shapes to speech sounds and blending them into words."
        },
        questions: [
          {
            id: "q-pri-phon-01",
            type: "multiple_choice",
            questionText: "Which word has the short /e/ vowel sound like in 'bed'?",
            options: ["pen", "pan", "pin", "pun"],
            correctAnswer: "pen",
            explanation: "'pen' has the short /e/ vowel sound (/p/-/e/-/n/). 'pan' has short /a/, 'pin' has short /i/, and 'pun' has short /u/.",
            hintLadder: [
              "Listen to the vowel in 'bed'.",
              "Compare: pan (/æ/), pin (/ɪ/), pen (/e/).",
              "Pen rhymes with hen and has the exact same short /e/ sound as bed."
            ],
            misconceptionAlerts: [
              { trigger: "pin", note: "'pin' has the /i/ sound like in sit, not the /e/ sound in bed." }
            ],
            skillId: "skill-pri-phonics-blending",
            difficulty: "easy"
          },
          {
            id: "q-pri-phon-02",
            type: "multiple_choice",
            questionText: "How many individual sounds (phonemes) are in the word 'ship'?",
            options: ["3 sounds: /sh/ - /i/ - /p/", "4 sounds: /s/ - /h/ - /i/ - /p/", "2 sounds: /sh/ - /ip/", "1 sound: /ship/"],
            correctAnswer: "3 sounds: /sh/ - /i/ - /p/",
            explanation: "'sh' is a consonant digraph that makes one single sound (/sh/). With /i/ and /p/, there are exactly 3 phonemes: /sh/-/i/-/p/.",
            hintLadder: [
              "Notice the letters 's' and 'h' team up to make one sound.",
              "The digraph 'sh' makes the single sound /sh/.",
              "Count: 1 (/sh/) + 2 (/i/) + 3 (/p/) = 3 sounds."
            ],
            misconceptionAlerts: [
              { trigger: "4 sounds: /s/ - /h/ - /i/ - /p/", note: "Letters 's' and 'h' make one combined sound /sh/, not two separate sounds." }
            ],
            skillId: "skill-pri-phonics-blending",
            difficulty: "easy"
          },
          {
            id: "q-pri-phon-03",
            type: "multiple_choice",
            questionText: "If you change the first sound in 'cat' from /k/ to /h/, what new word do you make?",
            options: ["hat", "hot", "hit", "hut"],
            correctAnswer: "hat",
            explanation: "Replacing the initial sound /k/ with /h/ while keeping the rime '-at' produces the word 'hat'.",
            hintLadder: [
              "Keep the ending '-at'.",
              "Put /h/ at the front: /h/ + /at/.",
              "The new word is 'hat'."
            ],
            misconceptionAlerts: [
              { trigger: "hot", note: "Did you change the vowel? Keep the vowel /a/ as in cat: /h/ + /at/ = hat." }
            ],
            skillId: "skill-pri-phonics-blending",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-pri-grammar-01",
    subjectId: "pri_grammar_mechanics",
    level: "primary_foundations",
    title: "Basic Grammar & Sentence Punctuation",
    code: "ENG-GRAM-01",
    description: "Learn nouns, verbs, capital letters, full stops, and question marks in simple sentence architecture.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-grammar-nouns-verbs",
        unitId: "unit-pri-grammar-01",
        title: "Naming Words (Nouns) & Action Words (Verbs)",
        code: "SKL-PRI-GRAM-01",
        summary: "Identify people, places, things (nouns) and actions (verbs) in sentences.",
        objectives: [
          "Define and identify nouns as names of persons, animals, places, or things",
          "Identify verbs as words showing physical or mental action",
          "Construct simple sentences containing a subject noun and an action verb"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-grammar-nouns-verbs",
          title: "Actors and Actions: Understanding Nouns and Verbs",
          hookAndIntuition: "Look around you! Everything you can touch, see, or name (a desk, a teacher, a dog, Lagos) is a NOUN. Everything that moves, runs, jumps, or thinks is a VERB. Without a noun to do the action and a verb to show the action, a sentence cannot live!",
          conceptualExplanation: "A noun is a naming word. It names a person (Doctor, Ngozi), animal (Lion), place (Abuja, school), or thing (pencil, car). A verb is a doing or action word that tells what the noun is doing (runs, eats, reads, sleeps).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Noun", definition: "A word that names a person, place, animal, or thing.", practicalExample: "Boy, school, cat, table." },
            { termOrSymbol: "Verb", definition: "An action word that tells what someone or something is doing.", practicalExample: "Jump, write, sing, dance." }
          ],
          workedExamples: [
            {
              title: "Identifying Noun and Verb in 'The dog barks'",
              problemStatement: "In the sentence 'The dog barks at the mailman', identify the noun doing the action and the action verb.",
              steps: [
                { stepNumber: 1, instruction: "Find the animal or person doing something", reasoning: "'Dog' is an animal; it is the naming word (Noun)." },
                { stepNumber: 2, instruction: "Find what the dog is doing", reasoning: "The dog 'barks'. Barking is the action being performed (Verb)." }
              ],
              takeawayRule: "The noun is who or what; the verb is what they are doing."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking 'fast' is a verb because running fast is an action.",
              whyItIsWrong: "'Fast' describes how someone runs (an adverb), not the action itself.",
              correctCorrection: "The action itself is 'run' (the verb)."
            }
          ],
          guidedPracticePrompt: "In 'Fatima reads a book', which word is the verb?",
          summaryRecap: "Nouns name who and what; verbs show what happens. Every complete sentence needs both."
        },
        questions: [
          {
            id: "q-pri-gram-01",
            type: "multiple_choice",
            questionText: "Which of the following words is a NOUN (naming word)?",
            options: ["Teacher", "Quickly", "Sing", "Bright"],
            correctAnswer: "Teacher",
            explanation: "'Teacher' names a person, so it is a noun. 'Sing' is a verb, 'quickly' is an adverb, and 'bright' is an adjective.",
            hintLadder: [
              "Remember: a noun names a person, place, or thing.",
              "Who is a teacher? A person who helps students learn.",
              "Because it names a person, 'Teacher' is a noun."
            ],
            misconceptionAlerts: [
              { trigger: "Sing", note: "'Sing' is an action you do (a verb), not a person or object." }
            ],
            skillId: "skill-pri-grammar-nouns-verbs",
            difficulty: "easy"
          },
          {
            id: "q-pri-gram-02",
            type: "multiple_choice",
            questionText: "Identify the action VERB in the sentence: 'The children play football after school.'",
            options: ["play", "children", "football", "school"],
            correctAnswer: "play",
            explanation: "'play' is the action word showing what the children are doing.",
            hintLadder: [
              "Ask: What action are the children doing?",
              "Are they sleeping? No, they are playing.",
              "Therefore, 'play' is the action verb."
            ],
            misconceptionAlerts: [
              { trigger: "children", note: "'Children' names people (a noun), not the action." },
              { trigger: "football", note: "'Football' is the thing they play (a noun), not the verb." }
            ],
            skillId: "skill-pri-grammar-nouns-verbs",
            difficulty: "easy"
          },
          {
            id: "q-pri-gram-03",
            type: "multiple_choice",
            questionText: "Choose the sentence with correct capitalization and punctuation:",
            options: [
              "Emeka lives in Abuja.",
              "emeka lives in abuja",
              "Emeka lives in abuja.",
              "emeka Lives in Abuja."
            ],
            correctAnswer: "Emeka lives in Abuja.",
            explanation: "Every sentence must start with a capital letter ('Emeka'). Proper nouns like names ('Emeka') and cities ('Abuja') must always be capitalized, and the statement ends with a full stop.",
            hintLadder: [
              "Check that the first letter of the sentence is capitalized.",
              "Check that names of people and cities have capital letters.",
              "Ensure there is a full stop at the end."
            ],
            misconceptionAlerts: [
              { trigger: "Emeka lives in abuja.", note: "Abuja is the name of a specific city (proper noun) and must start with a capital 'A'." }
            ],
            skillId: "skill-pri-grammar-nouns-verbs",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. PRIMARY SCIENCE & TECHNOLOGY DOMAIN (4 Subjects)
  // =========================================================================
  {
    id: "unit-pri-science-01",
    subjectId: "pri_basic_science",
    level: "primary_foundations",
    title: "Living and Non-Living Things in Our Environment & The Classification of Nature",
    code: "SCI-BAS-01",
    description: "Explore the universal characteristics of living organisms (MRS NERG: Movement, Respiration, Sensitivity, Nutrition, Excretion, Reproduction, Growth) versus inanimate non-living matter in nature and everyday environments.",
    order: 1,
    category: "core",
    isDeepSaturated: true,
    provenanceVersion: "2026.WAVE2.DEEP_SATURATION.v1",
    curriculumStandardMappings: ["NERDC-PRI-SCI-P1", "NCEE-SCI-01", "CAMBRIDGE-PRI-SCI-ST1", "NGSS-1-LS1"],
    estimatedHours: 4.0,
    estimationMethod: "Documented Arc: 40m MRS NERG Living Systems Exploration + 45m Stepped Biological Taxonomy & Microscopic Reasoning + 65m Independent Practice (8 Substantive Diagnostic Questions @ 8m) + 35m Inanimate Contrast Misconception Traps + 55m Nigerian Ecosystem Field Observation & Bio-Inventory Transfer = 240m (4.0h)",
    skills: [
      {
        id: "skill-pri-science-living",
        unitId: "unit-pri-science-01",
        title: "Characteristics of Living Things & The MRS NERG Framework",
        code: "SKL-PRI-SCI-01",
        summary: "Systematically identify what living organisms require to survive and classify natural objects using the 7 universal criteria of life.",
        objectives: [
          "Master the 7 universal biological characteristics of life: Movement, Respiration, Sensitivity, Nutrition, Excretion, Reproduction, and Growth (MRS NERG)",
          "Differentiate biological cellular respiration from mechanical fuel combustion or atmospheric wind movement",
          "Classify biological specimens, natural geological matter, and manufactured artifacts with diagnostic precision",
          "Explain the biological adaptations green plants use for autotrophic nutrition (photosynthesis) versus heterotrophic animal nutrition"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-science-living",
          title: "The Living Matrix: Mastering the 7 Universal Criteria of Life (MRS NERG)",
          hookAndIntuition: "Consider a sophisticated battery-powered toy robot dog versus a 3-week-old village puppy. The robot dog walks, barks through a speaker, and flashes LED eyes. Yet if you lock the robot in a room without recharging, it simply powers down—it never searches for water, never feels hungry, never heals a scratch, and never grows into a bigger dog. The living puppy, however, is a cellular biochemical miracle: it breaks down nutrient molecules for metabolic energy, detects footsteps through living sensory nerve cells, excretes urea, and multiplies millions of cells each day to grow. That dividing line—between inanimate matter and biological organism—is governed by nature's seven non-negotiable rules of life!",
          conceptualExplanation: "In the natural sciences, everything in the universe can be classified into living organisms (plants, animals, fungi, and micro-organisms) or non-living matter (rocks, water, air, plastics, and metals). Biologists use the universal mnemonic MRS NERG to verify whether an entity is truly alive:\n\n1. Movement: Living things move autonomously. Animals run, fly, or swim using muscular systems; plants move through tropisms, turning their leaves toward sunlight (phototropism) and growing roots downward toward water (geotropism).\n2. Respiration: Inside every living cell, organisms break down food nutrients (such as glucose) with oxygen to release ATP energy for vital functions: Glucose + Oxygen → Carbon Dioxide + Water + Energy.\n3. Sensitivity (Irritability): The capacity to sense external stimuli (light, temperature, sound, touch, chemical moisture) and generate an adaptive response.\n4. Nutrition: Organisms absorb or manufacture organic nutrients to sustain life. Green plants are autotrophic, using chlorophyll and sunlight to manufacture glucose via photosynthesis. Animals are heterotrophic, consuming other plants or animals.\n5. Excretion: The biochemical elimination of toxic cellular metabolic wastes (such as carbon dioxide from cellular respiration, urea in urine, and mineral salts in sweat). Note: Excretion is distinct from egestion (passing undigested food feces).\n6. Reproduction: The biological process by which existing organisms generate offspring of their own species, either sexually (insects, mammals, flowering plants) or asexually (binary fission in amoeba, budding).\n7. Growth: A permanent, irreversible increase in dry biomass, height, and cellular volume driven by internal cell division (mitosis), unlike non-living crystals or river sand dunes which only grow by external accretion.",
          conceptualModel: "The 7-Axis Life Matrix & Cellular Engine: Picture a living organism as a self-sustaining biochemical city enclosed by cellular membranes. Fuel (Nutrition) enters; the Power Plants (Respiration) convert fuel into cellular energy; Sensors (Sensitivity) monitor incoming environmental signals; Internal Transporters (Movement) shift materials; Toxic Waste Chimneys (Excretion) discharge poisons; Construction Crews (Growth) build permanent internal structures; and the Blueprint Archives (Reproduction) pass genetic instructions to new generations. Inanimate non-living matter possesses neither cellular boundaries nor autonomous metabolic self-governance.",
          keyTermsAndFormulas: [
            { termOrSymbol: "MRS NERG", definition: "The seven fundamental biological characteristics of living organisms: Movement, Respiration, Sensitivity, Nutrition, Excretion, Reproduction, and Growth.", practicalExample: "Every mammal, insect, tree, and bacterium satisfies all seven criteria." },
            { termOrSymbol: "Organism", definition: "Any living individual biological system possessing cellular organization, metabolism, and genetic continuity.", practicalExample: "A baobab tree, a tilapia fish, or a school pupil." },
            { termOrSymbol: "Cellular Respiration", definition: "The chemical process inside living mitochondria where food glucose is oxidized to release ATP metabolic energy.", practicalExample: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP Energy." },
            { termOrSymbol: "Sensitivity (Irritability)", definition: "The biological ability of an organism to perceive environmental changes (stimuli) and coordinate a physiological response.", practicalExample: "A human pulling their hand back from a hot cooking pot, or a sunflower turning toward the dawn." },
            { termOrSymbol: "Autotrophic Nutrition", definition: "The synthesis of complex organic food substances from simple inorganic carbon dioxide and water using sunlight energy.", practicalExample: "Photosynthesis carried out by green chlorophyll in cassava leaves." },
            { termOrSymbol: "Excretion vs Egestion", definition: "Excretion is the removal of cellular metabolic wastes; egestion is the expulsion of undigested, unabsorbed dietary residue.", practicalExample: "Urea filtered by kidneys is excretion; feces passed from the bowel is egestion." }
          ],
          workedExamples: [
            {
              title: "Classifying a Wooden School Desk vs. a Living Iroko Tree",
              problemStatement: "A school desk is constructed from solid hardwood derived from an Iroko tree. A student argues: 'Since wood came from a tree, the desk is a living thing.' Formulate a rigorous biological analysis to evaluate this claim.",
              steps: [
                { stepNumber: 1, instruction: "Audit Current MRS NERG Functionality", reasoning: "Test the desk against all seven criteria: Does it breathe or respire? No. Does it require water or manufacture food? No. Does it produce saplings? No. Does it multiply cells internally to grow? No." },
                { stepNumber: 2, instruction: "Differentiate Historical Origin from Current Biological State", reasoning: "The timber was harvested from an organism that was once living. However, harvesting severed vascular transport (xylem and phloem) and caused complete cellular death." },
                { stepNumber: 3, instruction: "Synthesize Scientific Verdict", reasoning: "Because the desk no longer performs cellular metabolism, respiration, or reproduction, it is classified scientifically as a non-living (dead organic matter) artifact." }
              ],
              takeawayRule: "Living classification requires active, ongoing capacity to perform all seven MRS NERG processes. Severed organic matter that has ceased cellular metabolism is non-living."
            },
            {
              title: "Classifying an Automobile vs. a Water Hyacinth Plant",
              problemStatement: "A student observes: 'A motor car moves down the expressway, breathes in oxygen through its air filter, consumes petrol for fuel, and excretes exhaust fumes. Therefore, a car is alive.' Disprove this misconception using biological invariants.",
              steps: [
                { stepNumber: 1, instruction: "Analyze the Nature of Movement and Fuel Consumption", reasoning: "The motor car's movement is mechanical, not autonomous; it requires human ignition and steering. Its petrol consumption is chemical combustion in an iron cylinder, not cellular enzyme-catalyzed biochemical respiration." },
                { stepNumber: 2, instruction: "Evaluate Reproduction and Internal Cellular Growth", reasoning: "A motor car can never mate or divide to produce baby cars. It cannot heal a dent or grow in length by internal cell division. The water hyacinth plant, however, absorbs dissolved nitrates, multiplies green leafy clones across a lagoon, and photosynthesizes autonomously." },
                { stepNumber: 3, instruction: "Apply the Universal 7-Criteria Conjunction Invariant", reasoning: "To be classified as living, an entity must satisfy ALL seven criteria simultaneously. Mimicking 2 or 3 mechanical analogs does not confer biological life." }
              ],
              takeawayRule: "Partial mimicry of movement and fuel combustion does not constitute life; true living organisms must possess cellular organization, autonomous homeostasis, internal growth, and reproduction."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "The Movement Trap: Believing that anything that moves (clouds, rivers, automobiles, ocean waves) must be alive, and anything immobile (trees, barnacles, corals) must be non-living.",
              whyItIsWrong: "Clouds and rivers are moved by external physical forces (gravity and convection currents), not internal metabolic energy. Plants and corals are deeply alive; their movement is subtle cellular phototropism, cytoplasmic streaming, and root extension.",
              correctCorrection: "Evaluate internal cellular autonomy, not whether an object runs or stays rooted in soil."
            },
            {
              misconception: "The Respiration vs Breathing Trap: Confusing respiratory gas exchange in animal lungs with universal cellular respiration.",
              whyItIsWrong: "Young pupils often think plants do not respire because plants do not possess lungs or inflate a chest. In reality, all plant cells respire 24 hours a day, taking in oxygen through microscopic leaf stomata to break down glucose into ATP energy.",
              correctCorrection: "Respiration is an enzyme-driven cellular energy-release reaction inside mitochondria, common to plants, animals, and bacteria alike."
            },
            {
              misconception: "The Crystal Growth Trap: Believing that growing mineral salt crystals or accumulating snowmen are living because they increase in size.",
              whyItIsWrong: "Non-living objects grow by external accretion (sticking particles onto the outside surface). Living things grow by internal cellular multiplication (mitosis) using digested nutrients.",
              correctCorrection: "True biological growth is internal, cellular, and irreversible."
            }
          ],
          guidedPracticePrompt: "Examine a fresh chicken egg bought from a poultry farm. Does it move or eat right now? How does biological science determine whether the egg contains living embryonic matter or is non-living?",
          independentPracticePrompt: "Create a 2-column diagnostic chart comparing a live desert cactus with a battery-powered digital wristwatch across all seven MRS NERG categories. Highlight the specific points where the wristwatch fails the test of life.",
          diagnosticSelfCheck: "If a living green plant is kept in total darkness for three weeks with water, why will it eventually wilt and die? Relate your answer to the 'N' (Nutrition) and 'R' (Respiration) dimensions of MRS NERG.",
          transferApplication: "Investigate Lake Chad or the Lekki Conservation Centre wetlands: identify 3 dominant plant species, 3 animal species, and 3 non-living components (water, silt, atmospheric air). Explain how the living organisms depend directly on the non-living matter for their survival.",
          masteryAssessment: "Synthesize an oral defense answering: 'Why are viruses often described by virologists as residing on the borderline between living organisms and inanimate chemical crystals?'",
          reflectionPrompt: "How does realizing that every green leaf in your compound is constantly carrying out complex cellular respiration and sensitivity alter your appreciation of nature?",
          extensionActivity: "Design a sealed mini-terrarium experiment in a clear glass bottle with moist garden soil and a moss seedling. Explain why the moss can survive inside a sealed jar by recycling carbon dioxide, water, and oxygen across continuous MRS NERG cycles.",
          summaryRecap: "Living organisms are defined by the unbroken symphony of seven criteria: Movement, Respiration, Sensitivity, Nutrition, Excretion, Reproduction, and Growth (MRS NERG). Non-living matter may exhibit isolated mechanical features, but only cellular organisms carry out all seven autonomous life processes.",
          estimatedMinutes: 240
        },
        questions: [
          {
            id: "q-pri-sci-01",
            type: "multiple_choice",
            questionText: "Which of the following biological statements is true of ALL living organisms, including green plants, animals, fungi, and microscopic bacteria?",
            options: [
              "They all carry out cellular respiration and internal growth",
              "They all walk or fly from place to place using muscles",
              "They all ingest solid organic food using a mouth and teeth",
              "They all possess lungs to inhale oxygen from the air"
            ],
            correctAnswer: "They all carry out cellular respiration and internal growth",
            explanation: "All living organisms without exception undergo cellular respiration (releasing ATP energy from nutrients inside cells) and exhibit permanent internal growth via cellular reproduction. Plants and bacteria do not have legs, mouths, or lungs, yet they are fully alive.",
            hintLadder: [
              "Recall the MRS NERG mnemonic: R stands for Respiration and G stands for Growth.",
              "Do green plants or mushrooms have lungs or walk on legs? No, but they are clearly living things.",
              "Every living cell must release energy from food (respiration) and build new cellular structures (growth)."
            ],
            misconceptionAlerts: [
              { trigger: "They all walk or fly from place to place using muscles", note: "Plants, mushrooms, and corals are alive but do not locomote or possess muscles." },
              { trigger: "They all possess lungs to inhale oxygen from the air", note: "Fish use gills, plants use stomata, and earthworms breathe through skin—lungs are not universal." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "easy"
          },
          {
            id: "q-pri-sci-02",
            type: "multiple_choice",
            questionText: "An automobile consumes petrol, produces hot exhaust gas, and moves at 100 km/h on the highway. Why does science strictly classify a car as a NON-LIVING object?",
            options: [
              "It cannot reproduce, grow from inside cells, or carry out autonomous cellular respiration",
              "It is painted with synthetic enamel paints that are toxic to nature",
              "It produces too much noise when its accelerator pedal is pressed",
              "It travels faster than most living animals on four legs"
            ],
            correctAnswer: "It cannot reproduce, grow from inside cells, or carry out autonomous cellular respiration",
            explanation: "To be classified as living, an entity must satisfy all 7 MRS NERG criteria. An automobile cannot reproduce offspring, cannot multiply cells to grow, and does not have biological cellular metabolism—its motion is entirely driven by external mechanical engineering.",
            hintLadder: [
              "Can a motor car reproduce to create baby cars?",
              "Does a car heal its dented metal through cell division?",
              "Because it lacks cellular structure, internal growth, and reproduction, it fails the biological criteria of life."
            ],
            misconceptionAlerts: [
              { trigger: "It is painted with synthetic enamel paints that are toxic to nature", note: "Paint composition is irrelevant; what matters is whether the object possesses biological cells and life processes." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "easy"
          },
          {
            id: "q-pri-sci-03",
            type: "multiple_choice",
            questionText: "How do green plants fulfill the 'Nutrition' requirement of MRS NERG unlike animals?",
            options: [
              "They manufacture glucose through photosynthesis using sunlight, water, and carbon dioxide",
              "They absorb prefabricated cooked food minerals through their stem bark",
              "They consume microscopic insects through their root hairs at night",
              "They do not require any nutrition because they are rooted in dark earth"
            ],
            correctAnswer: "They manufacture glucose through photosynthesis using sunlight, water, and carbon dioxide",
            explanation: "Green plants are autotrophs; their leaf cells contain chlorophyll which traps radiant solar energy to convert inorganic carbon dioxide from air and water from soil into chemical food (glucose) and oxygen.",
            hintLadder: [
              "Plants do not eat other animals or cooked food; they make their own food.",
              "What is the name of the green pigment inside plant leaves that captures sunlight? Chlorophyll.",
              "This food manufacturing process is called photosynthesis (photo = light, synthesis = putting together)."
            ],
            misconceptionAlerts: [
              { trigger: "They do not require any nutrition because they are rooted in dark earth", note: "All living things require nutrition! Plants obtain nutrition by synthesizing organic food themselves." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "easy"
          },
          {
            id: "q-pri-sci-04",
            type: "multiple_choice",
            questionText: "When a pupil accidentally touches a hot cooking iron and instantly pulls their hand away, which characteristic of life is being displayed?",
            options: [
              "Sensitivity (Irritability) to an environmental stimulus",
              "Excretion of cellular metabolic waste products",
              "Reproduction of nerve and skin tissue",
              "Autotrophic nutritional digestion"
            ],
            correctAnswer: "Sensitivity (Irritability) to an environmental stimulus",
            explanation: "Sensitivity (or irritability) is the ability of a living organism to detect environmental changes (stimuli, like extreme heat) and trigger a rapid, protective physiological response.",
            hintLadder: [
              "Think about the 'S' in MRS NERG.",
              "Extreme heat from the iron is a dangerous environmental signal (stimulus).",
              "Detecting the heat and reacting instantly demonstrates sensory awareness (Sensitivity)."
            ],
            misconceptionAlerts: [
              { trigger: "Excretion of cellular metabolic waste products", note: "Excretion is releasing chemical waste like sweat or urine, not reacting to heat." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "medium"
          },
          {
            id: "q-pri-sci-05",
            type: "multiple_choice",
            questionText: "In biological science, what is the exact scientific definition of 'Excretion'?",
            options: [
              "The removal of toxic chemical waste products produced by internal cellular metabolism",
              "The expulsion of undigested, unabsorbed food through the large intestine",
              "The inhalation of fresh morning atmospheric air into the chest",
              "The absorption of rainwater through plant root taproots"
            ],
            correctAnswer: "The removal of toxic chemical waste products produced by internal cellular metabolism",
            explanation: "Excretion refers specifically to eliminating poisonous chemical by-products generated by cellular metabolic reactions (e.g., urea, carbon dioxide, excess salts). Expelling undigested food is egestion (defecation).",
            hintLadder: [
              "Distinguish between what was made inside living cells versus food that simply passed through the gut.",
              "Cellular chemical reactions produce toxic by-products like carbon dioxide and urea.",
              "Removing these metabolic cellular poisons is excretion."
            ],
            misconceptionAlerts: [
              { trigger: "The expulsion of undigested, unabsorbed food through the large intestine", note: "This common trap confuses egestion with excretion. Excretion involves chemical wastes produced inside cells." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "medium"
          },
          {
            id: "q-pri-sci-06",
            type: "multiple_choice",
            questionText: "Green plants do not have legs or wings to walk or fly. How do plants demonstrate the 'Movement' characteristic of living things?",
            options: [
              "Their shoots bend and grow toward light (phototropism) and roots grow toward water",
              "Their dead leaves fall to the ground when blown by high-velocity harmattan winds",
              "They only move when farmers pull them out of the ground during harvest",
              "Their green stems vibrate when thunder shakes the earth"
            ],
            correctAnswer: "Their shoots bend and grow toward light (phototropism) and roots grow toward water",
            explanation: "Plants exhibit biological movement via tropisms: directional growth movements in response to stimuli, such as phototropism (stems growing toward sunlight) and hydrotropism (roots seeking subterranean water). Passive movement caused by wind is purely non-living physical displacement.",
            hintLadder: [
              "Biological movement must be produced autonomously by the living plant itself.",
              "Notice how potted plants on a window ledge lean toward the sun.",
              "This directed growth toward light is biological movement called phototropism."
            ],
            misconceptionAlerts: [
              { trigger: "Their dead leaves fall to the ground when blown by high-velocity harmattan winds", note: "Wind blowing a dead leaf is external physical force, not internal biological movement." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "medium"
          },
          {
            id: "q-pri-sci-07",
            type: "multiple_choice",
            questionText: "A young scientist observes four objects in an outdoor clearing: a dried bean seed, a rushing river, a burning campfire, and a dormant fungal spore. Which objects are LIVING ORGANISMS?",
            options: [
              "The dried bean seed and the dormant fungal spore",
              "The rushing river and the burning campfire",
              "Only the burning campfire, because it produces heat and consumes wood",
              "None of them, because none are actively running or making animal sounds"
            ],
            correctAnswer: "The dried bean seed and the dormant fungal spore",
            explanation: "Both the dried bean seed and the fungal spore are living organisms in a state of dormant metabolic rest. Given water, warmth, and air, their living cells resume active respiration, cellular division, and growth. Rivers and campfires lack cellular structures and genetic reproduction.",
            hintLadder: [
              "Do fire and rivers have living cells containing DNA and cytoplasm?",
              "What happens if you plant a dry bean seed in moist soil? It sprouts and grows into a living vine.",
              "Viable dormant seeds and spores are living organisms awaiting favorable conditions."
            ],
            misconceptionAlerts: [
              { trigger: "The rushing river and the burning campfire", note: "Fire and rushing rivers are physical phenomena without cellular biology or genetic continuity." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "hard"
          },
          {
            id: "q-pri-sci-08",
            type: "multiple_choice",
            questionText: "Under the MRS NERG scientific standard, what is the classification of an entity that exhibits only 3 or 4 of the 7 life characteristics?",
            options: [
              "It is classified as NON-LIVING, because all seven MRS NERG processes are required for life",
              "It is classified as a semi-living hybrid animal",
              "It is automatically classified as a photosynthetic plant",
              "It is classified as an immortal alien organism"
            ],
            correctAnswer: "It is classified as NON-LIVING, because all seven MRS NERG processes are required for life",
            explanation: "The MRS NERG framework is a strict conjunction: an entity is living if and only if all seven criteria (Movement, Respiration, Sensitivity, Nutrition, Excretion, Reproduction, and Growth) are inherently characteristic of its species. Lacking any of these foundational processes places an entity in the non-living category.",
            hintLadder: [
              "Think about our pedagogical invariant banner: 'ALL 7 CRITERIA REQUIRED'.",
              "Even complex machines like supercomputers or motorcars exhibit 2 or 3 features (energy use, response, movement).",
              "Without internal biological growth, cellular metabolism, and autonomous reproduction, the entity is non-living."
            ],
            misconceptionAlerts: [
              { trigger: "It is classified as a semi-living hybrid animal", note: "In science there is no 'semi-living' animal category—the 7 criteria must all be satisfied." }
            ],
            skillId: "skill-pri-science-living",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. PRIMARY SOCIAL SCIENCES & CIVIC EDUCATION DOMAIN (6 Subjects)
  // =========================================================================
  {
    id: "unit-pri-civic-01",
    subjectId: "pri_civic_education",
    level: "primary_foundations",
    title: "National Symbols & Good Citizenship",
    code: "CIV-SYM-01",
    description: "Explore the deep constitutional, heraldic, and historical significance of Nigerian national symbols (The National Flag, Coat of Arms, National Anthem, National Pledge) and foundational civic responsibilities of citizens.",
    order: 1,
    category: "core",
    isDeepSaturated: true,
    provenanceVersion: "2026.WAVE2.DEEP_SATURATION.v1",
    curriculumStandardMappings: ["NERDC-PRI-CIV-P1", "NCEE-CIV-01", "UBEC-CIV-ST1", "WAEC-CIV-FND"],
    estimatedHours: 4.0,
    estimationMethod: "Documented Arc: 45m Sovereign Emblems & Flag Protocol Analysis + 45m Stepped Heraldry Deconstruction (Coat of Arms & National Pledge) + 65m Independent Practice (8 Substantive Diagnostic Questions @ 8m) + 35m Civic Protocol Traps & Misconceptions + 50m School Assembly & National Unity Civic Project Transfer = 240m (4.0h)",
    skills: [
      {
        id: "skill-pri-civic-nationalsymbols",
        unitId: "unit-pri-civic-01",
        title: "The Nigerian National Flag, Coat of Arms & Sovereign Civic Identity",
        code: "SKL-PRI-CIV-01",
        summary: "Systematically analyze and decode the heraldic components of Nigeria's sovereign emblems, official flag etiquette, and foundational civic virtues.",
        objectives: [
          "Deconstruct the heraldic symbolism of the Nigerian Coat of Arms: Red Eagle, Two White Horses, Black Shield, Silver 'Y' Pall, Costus Spectabilis, and National Motto",
          "Detail the historical genesis, proportions (1:2), and constitutional meaning of the National Flag designed by Pa Michael Taiwo Akinkunmi in 1959",
          "Apply national flag protocols regarding hoisting, lowering, disposal of frayed flags, and half-mast mourning observances",
          "Recite and analyze the moral commitments embedded in the Nigerian National Anthem and the National Pledge"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-civic-nationalsymbols",
          title: "Sovereign Pillars: Deconstructing the Nigerian Flag, Coat of Arms & Civic Honor",
          hookAndIntuition: "At midnight on September 30, 1960, at the historic Race Course (now Tafawa Balewa Square) in Lagos, tens of thousands of citizens held their breath as the British Union Jack was lowered into the darkness. Slowly, in radiant emerald green and pure white, the Nigerian National Flag rose up the flagpole, greeted by an eruption of joy and tears of pride. That moment marked the birth of our sovereign republic. National symbols are not merely pretty drawings or colored cloth; they are the sacred constitutional mirrors of our history, our diverse peoples, and our eternal pledge to live together in peace, faith, and progress.",
          conceptualExplanation: "In civic education and constitutional law, national symbols are the official visual, acoustic, and heraldic emblems that represent the sovereign authority, cultural heritage, and shared ideals of an independent country. Every Nigerian student must master two core sovereign emblems:\n\n1. The National Flag: Designed in 1959 by Pa Michael Taiwo Akinkunmi (1936–2023), then an electrical engineering student at Norwood Technical College in London, and chosen out of nearly 3,000 competitive entries. The flag features three equal vertical bands: Green on the left (hoist side), White in the center, and Green on the right (fly side). The standard constitutional aspect ratio is 1:2 (width to length). The two Green stripes represent Nigeria's rich agricultural wealth, fertile arable land, and abundant forests. The central White stripe represents peace, national unity, and truth across all ethnic groups. Protocol dictates that the flag is hoisted briskly at dawn (6:00 AM) and lowered solemnly at sunset (6:00 PM). It must never touch the ground or floor, must never be flown in a torn or soiled condition, and is flown at half-mast to mark solemn national mourning.\n\n2. The Sovereign Coat of Arms: Adopted at Independence in 1960, the Coat of Arms is the official heraldic seal of the Federal Republic of Nigeria. Each component carries precise constitutional symbolism:\n• The Red Eagle (Crest): Perched atop a green and white torsade (wreath), the eagle symbolizes national strength, vision, and unyielding patriotic courage.\n• The Two White Stallions (Supporters): Flanking the central shield on both sides, the white horses represent national dignity, stature, and the pride of the Nigerian people.\n• The Black Shield: Represents the good, rich, and fertile agricultural soil of Nigeria.\n• The Silver Pall (White 'Y' Shape): Splits the black shield heraldically, representing the geographical confluence of Nigeria's two greatest rivers—the River Niger and the River Benue—joining together at Lokoja, Kogi State.\n• The Floral Base Meadow: A lush green pasture adorned with yellow flowers named Costus Spectabilis (Nigeria's official national wild flower, symbolizing natural beauty, variety, and vitality).\n• The National Motto Scroll: A golden scroll banner at the base proclaiming: 'UNITY AND FAITH, PEACE AND PROGRESS'.",
          conceptualModel: "The Sovereign Civic Fortress Architecture: Envision our nation as a grand protective citadel. The Black Shield and Rivers Niger & Benue form the fertile Geographic Foundation; the White Stallions stand as Pillars of Dignity holding up our sovereignty; the Red Eagle acts as the Watchtower of Strength and Vision; the Green-White-Green Flag is the Sovereign Banner calling all citizens to peace and productive labor; and the National Motto is the Moral Compass guiding our democracy.",
          keyTermsAndFormulas: [
            { termOrSymbol: "National Symbol", definition: "An officially recognized emblem, flag, or anthem that constitutionally embodies the sovereign identity, history, and values of an independent nation.", practicalExample: "The National Flag, Coat of Arms, National Anthem, and National Pledge." },
            { termOrSymbol: "Coat of Arms", definition: "The sovereign heraldic crest consisting of a shield, supporters, crest, and motto used as the official seal of the Federal Republic of Nigeria.", practicalExample: "Embossed on Nigerian passports, currency notes, and federal courtrooms." },
            { termOrSymbol: "Confluence of Rivers", definition: "The geographical meeting point at Lokoja where River Benue flows into River Niger, represented heraldically by the white 'Y' on the black shield.", practicalExample: "The silver pall 'Y' on the Coat of Arms." },
            { termOrSymbol: "Costus Spectabilis", definition: "The indigenous yellow wild flower of Nigeria forming the floral base beneath the shield, symbolizing natural beauty and ecological vitality.", practicalExample: "The yellow flowers at the base of the Coat of Arms." },
            { termOrSymbol: "National Flag Ratio 1:2", definition: "The constitutional proportion of the Nigerian flag where the length is exactly double the height/width.", practicalExample: "A flag 3 feet high must be exactly 6 feet long." },
            { termOrSymbol: "National Motto", definition: "The four constitutional guiding virtues of the Federal Republic of Nigeria.", practicalExample: "'Unity and Faith, Peace and Progress'." }
          ],
          workedExamples: [
            {
              title: "Deconstructing the Heraldic Heraldry of the Nigerian Coat of Arms",
              problemStatement: "A primary school pupil is asked to identify and explain four key elements of the Nigerian Coat of Arms during a civic debate. Formulate an authoritative heraldic analysis.",
              steps: [
                { stepNumber: 1, instruction: "Examine the Central Shield and Confluence Pall", reasoning: "The central black shield represents Nigeria's fertile agricultural soil. The white 'Y' shape is the confluence where the River Benue flows into the River Niger at Lokoja." },
                { stepNumber: 2, instruction: "Examine the Crest and Supporters", reasoning: "At the top crest, the Red Eagle represents national strength and vision. On the left and right, the two White Stallions represent national dignity and stature." },
                { stepNumber: 3, instruction: "Examine the Base Meadow and Motto", reasoning: "At the base, yellow Costus Spectabilis wild flowers represent the natural beauty of the nation, while the scroll proclaims the national motto: 'Unity and Faith, Peace and Progress'." }
              ],
              takeawayRule: "Every heraldic component of the Coat of Arms represents a distinct constitutional pillar: Strength (Eagle), Dignity (Horses), Fertile Soil (Black Shield), Rivers Confluence ('Y' shape), Beauty (Costus Spectabilis), and Shared Moral Destiny (National Motto)."
            },
            {
              title: "Constitutional Flag Protocol & School Assembly Etiquette",
              problemStatement: "During a Monday morning school assembly, the school prefect prepares to hoist the Nigerian National Flag. What three mandatory civic protocols must be observed?",
              steps: [
                { stepNumber: 1, instruction: "Inspect the Condition and Timing of the Flag", reasoning: "The flag must be clean, unfrayed, and hoisted briskly at dawn (or beginning of the school day). It must never touch the ground or bare floor." },
                { stepNumber: 2, instruction: "Enforce Citizen Deportment during the Hoisting and Anthem", reasoning: "All students, teachers, and visitors must immediately halt, stand at strict attention with arms by their sides, and face the flag while singing the National Anthem." },
                { stepNumber: 3, instruction: "Observe Precedence when Flown with Other Flags", reasoning: "If displayed alongside school banners or state flags, the Nigerian National Flag must always occupy the place of highest honor: hoisted first, placed on the far right or center, and flown at the highest peak." }
              ],
              takeawayRule: "The National Flag represents sovereign authority; standing at attention and maintaining pristine flag condition is a constitutional civic duty for every citizen."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "The Religious Symbolism Trap: Believing that the white stripe in the Nigerian flag stands for Christianity and the green stands for Islam.",
              whyItIsWrong: "Nigeria is a constitutional secular federation with multi-religious harmony. The flag's colors have strictly secular, geographic, and civic meanings: Green represents rich agriculture and forests; White represents national peace and unity.",
              correctCorrection: "Green is for agriculture; White is for peace and unity among all citizens regardless of faith."
            },
            {
              misconception: "The Red Rose / Sunflower Trap: Mistaking the yellow flora at the base of the Coat of Arms for red roses, sunflowers, or hibiscus flowers.",
              whyItIsWrong: "The flower chosen heraldically is Costus Spectabilis, an indigenous yellow wild flower found growing across Nigerian vegetation zones, symbolizing indigenous beauty.",
              correctCorrection: "The national flower on the Coat of Arms is Costus Spectabilis, which is naturally yellow."
            },
            {
              misconception: "The Highway / Railway Trap: Confusing the white 'Y' shape on the black shield with major transportation expressways or railway tracks.",
              whyItIsWrong: "The 'Y' shape is a heraldic pall specifically honoring the historic natural confluence of Rivers Niger and Benue at Lokoja.",
              correctCorrection: "The 'Y' represents the confluence of the River Niger and River Benue."
            }
          ],
          guidedPracticePrompt: "Name the five distinct components of the Nigerian Coat of Arms from top to bottom. For each component, state what value or geographic feature it represents.",
          independentPracticePrompt: "Draw and color the Nigerian National Flag with correct 1:2 dimensions. Write a 3-sentence explanation of why citizens must stand at attention when the flag is being hoisted.",
          diagnosticSelfCheck: "If a foreign ambassador visits Nigeria and a flag is flown alongside the Nigerian flag, which flag must be on the right and hoisted highest? Why?",
          transferApplication: "Organize a classroom 'Civic Pride Committee' to inspect the national flag flown in your school compound. Check its condition, ensure it is hoisted at dawn and lowered before nightfall, and educate younger pupils on why the flag must never touch the ground.",
          masteryAssessment: "Synthesize an essay explaining how the National Motto ('Unity and Faith, Peace and Progress') and the National Pledge serve as personal daily codes of conduct for young Nigerians.",
          reflectionPrompt: "When you recite the words 'To serve Nigeria with all my strength, to defend her unity, and uphold her honour and glory', what specific everyday actions in your community reflect that promise?",
          extensionActivity: "Research the biography of Pa Michael Taiwo Akinkunmi and compose a short drama script reenacting the midnight flag raising at Tafawa Balewa Square on October 1, 1960.",
          summaryRecap: "National symbols are the sacred visual and heraldic embodiment of Nigeria's sovereign independence. The Green-White-Green flag stands for agriculture and peace; the Coat of Arms heraldically depicts national strength (Eagle), dignity (Horses), fertile soil (Black Shield), river confluence ('Y'), and national beauty (Costus Spectabilis), grounded in our motto: Unity and Faith, Peace and Progress.",
          estimatedMinutes: 240
        },
        questions: [
          {
            id: "q-pri-civ-01",
            type: "multiple_choice",
            questionText: "What do the TWO GREEN STRIPES on the Nigerian National Flag constitutionally represent?",
            options: [
              "Nigeria's rich agriculture, fertile arable soil, and abundant natural forests",
              "The mineral oil and petroleum reserves found along the Niger Delta coast",
              "The green waters of the Atlantic Ocean surrounding Lagos and Calabar",
              "The Islamic religion practiced by citizens in northern Nigeria"
            ],
            correctAnswer: "Nigeria's rich agriculture, fertile arable soil, and abundant natural forests",
            explanation: "The two green vertical bands symbolize Nigeria's immense agricultural heritage, fertile soil, and rich natural vegetation. The central white stripe symbolizes peace and unity.",
            hintLadder: [
              "Think about green plants, farming, and lush vegetation.",
              "Nigeria has historically been an agricultural giant with vast fertile soils.",
              "Green officially signifies agriculture, fertile soils, and natural wealth."
            ],
            misconceptionAlerts: [
              { trigger: "The Islamic religion practiced by citizens in northern Nigeria", note: "The Nigerian flag has no religious symbolism; green officially represents agriculture and nature." },
              { trigger: "The mineral oil and petroleum reserves found along the Niger Delta coast", note: "Petroleum is not represented on the flag; green represents farming and forests." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "easy"
          },
          {
            id: "q-pri-civ-02",
            type: "multiple_choice",
            questionText: "Who designed the Nigerian National Flag in 1959 ahead of national independence in 1960?",
            options: [
              "Pa Michael Taiwo Akinkunmi",
              "Dr. Nnamdi Azikiwe",
              "Sir Ahmadu Bello",
              "Chief Obafemi Awolowo"
            ],
            correctAnswer: "Pa Michael Taiwo Akinkunmi",
            explanation: "Pa Michael Taiwo Akinkunmi designed the Nigerian flag in 1959 while studying electrical engineering at Norwood Technical College in London. His design was chosen out of almost 3,000 entries.",
            hintLadder: [
              "The designer was an engineering student studying abroad in London.",
              "His surname begins with 'A' (Akinkunmi).",
              "Pa Michael Taiwo Akinkunmi is celebrated as 'Mr. Flag Man'."
            ],
            misconceptionAlerts: [
              { trigger: "Dr. Nnamdi Azikiwe", note: "Dr. Nnamdi Azikiwe was Nigeria's first President and nationalist leader, but he did not design the flag." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "easy"
          },
          {
            id: "q-pri-civ-03",
            type: "multiple_choice",
            questionText: "On the crest of the Nigerian Coat of Arms, what does the RED EAGLE perched atop the wreath symbolize?",
            options: [
              "National strength, vision, and patriotic courage",
              "The speed of air transportation across international airports",
              "The commercial export of poultry birds from Nigerian farms",
              "The beauty of rare wildlife in Yankari Game Reserve"
            ],
            correctAnswer: "National strength, vision, and patriotic courage",
            explanation: "In heraldry, the eagle is a supreme symbol of power, vision, and soaring strength. On the Nigerian Coat of Arms, the red eagle represents federal strength and courageous vision.",
            hintLadder: [
              "An eagle is a powerful bird that soars high above the clouds.",
              "In national heraldry, fierce predators symbolize strength and defense.",
              "The red eagle stands for national strength, vision, and courage."
            ],
            misconceptionAlerts: [
              { trigger: "The commercial export of poultry birds from Nigerian farms", note: "The eagle is an emblem of sovereign power and strength, not commercial livestock." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "easy"
          },
          {
            id: "q-pri-civ-04",
            type: "multiple_choice",
            questionText: "What geographical landmark is represented by the SILVER/WHITE 'Y' SHAPE flowing through the black shield on the Coat of Arms?",
            options: [
              "The confluence where the River Benue joins the River Niger at Lokoja",
              "The major interstate expressways connecting Lagos, Abuja, and Kano",
              "The railway line running from Port Harcourt to Maiduguri",
              "The Atlantic coastline along the Gulf of Guinea"
            ],
            correctAnswer: "The confluence where the River Benue joins the River Niger at Lokoja",
            explanation: "The white 'Y' pall represents the two great rivers of Nigeria—the River Niger and River Benue—and their historic confluence meeting at Lokoja, Kogi State.",
            hintLadder: [
              "What are the two longest and most famous rivers in Nigeria?",
              "Notice how the shape of a 'Y' shows two rivers joining into one main channel.",
              "River Niger and River Benue meet at the historic city of Lokoja."
            ],
            misconceptionAlerts: [
              { trigger: "The major interstate expressways connecting Lagos, Abuja, and Kano", note: "The 'Y' shape is not a road; it specifically represents the meeting of the Niger and Benue rivers." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "medium"
          },
          {
            id: "q-pri-civ-05",
            type: "multiple_choice",
            questionText: "What do the TWO NOBLE WHITE STALLIONS (horses) supporting the shield on the Coat of Arms represent?",
            options: [
              "National dignity, stature, and the pride of the Nigerian people",
              "The cavalry horses used in traditional northern durbar festivals",
              "The agricultural livestock industry and animal husbandry",
              "The military tanks and armored vehicles of the Armed Forces"
            ],
            correctAnswer: "National dignity, stature, and the pride of the Nigerian people",
            explanation: "The two white horses standing proudly as heraldic supporters on either side of the shield represent national dignity, moral stature, and the noble pride of Nigeria.",
            hintLadder: [
              "Horses standing tall on both sides of a shield are known as supporters.",
              "Think about qualities of noble conduct, honor, and majesty.",
              "They symbolize dignity and stature."
            ],
            misconceptionAlerts: [
              { trigger: "The cavalry horses used in traditional northern durbar festivals", note: "While horses are used in durbar festivals, in national heraldry they represent national dignity and stature." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "medium"
          },
          {
            id: "q-pri-civ-06",
            type: "multiple_choice",
            questionText: "Which indigenous wild flower is depicted on the green grassy meadow at the base of the Nigerian Coat of Arms?",
            options: [
              "Costus Spectabilis (a vibrant yellow wild flower)",
              "Red Hibiscus Rosa-sinensis (pride of Barbados)",
              "White Desert Lily (water lily of the Chad basin)",
              "Purple Bougainvillea (climbing ornamental flower)"
            ],
            correctAnswer: "Costus Spectabilis (a vibrant yellow wild flower)",
            explanation: "Costus Spectabilis is Nigeria's official national flower; it is an indigenous yellow wild flower that grows naturally across Nigeria, symbolizing beauty, abundance, and biological vitality.",
            hintLadder: [
              "The flower has a Latin botanical name beginning with 'Costus'.",
              "Its blossoms are a radiant yellow color.",
              "The official national flower is Costus Spectabilis."
            ],
            misconceptionAlerts: [
              { trigger: "Red Hibiscus Rosa-sinensis (pride of Barbados)", note: "Costus Spectabilis is yellow, not red; hibiscus is not the national heraldic flower of Nigeria." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "hard"
          },
          {
            id: "q-pri-civ-07",
            type: "multiple_choice",
            questionText: "What is the EXACT NATIONAL MOTTO inscribed on the golden ribbon beneath the Nigerian Coat of Arms?",
            options: [
              "Unity and Faith, Peace and Progress",
              "Peace and Prosperity, Truth and Justice",
              "Forward Ever, Backward Never",
              "One Nation, One Destiny, God Bless Nigeria"
            ],
            correctAnswer: "Unity and Faith, Peace and Progress",
            explanation: "The constitutional motto of the Federal Republic of Nigeria is 'Unity and Faith, Peace and Progress', encapsulating the foundational virtues of the nation.",
            hintLadder: [
              "It contains four key virtues paired in two phrases.",
              "First phrase: 'Unity and Faith'.",
              "Second phrase: 'Peace and Progress'."
            ],
            misconceptionAlerts: [
              { trigger: "Peace and Prosperity, Truth and Justice", note: "The official constitutional motto is 'Unity and Faith, Peace and Progress'." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "easy"
          },
          {
            id: "q-pri-civ-08",
            type: "multiple_choice",
            questionText: "According to Nigerian constitutional flag etiquette and civic protocol, which of the following practices is MANDATORY?",
            options: [
              "Citizens must stand at strict attention when the flag is being hoisted or lowered",
              "The flag should be left flying outdoors in heavy rain throughout the midnight hours",
              "Citizens may write campaign slogans and signatures directly on the white stripe of the flag",
              "A torn or frayed flag may continue to be flown at schools as long as it has green color"
            ],
            correctAnswer: "Citizens must stand at strict attention when the flag is being hoisted or lowered",
            explanation: "National protocol mandates that whenever the National Flag is being hoisted or lowered, all persons present must halt, face the flag, and stand at strict attention. Flying a torn, soiled, or altered flag is an illegal desecration of state sovereignty.",
            hintLadder: [
              "Think about how students behave on the assembly ground when the flag goes up.",
              "You must stop walking and face the flag with dignity.",
              "Standing at attention demonstrates solemn respect for our republic."
            ],
            misconceptionAlerts: [
              { trigger: "A torn or frayed flag may continue to be flown at schools as long as it has green color", note: "A frayed or torn flag must be replaced immediately and retired solemnly in private; it must never be flown." }
            ],
            skillId: "skill-pri-civic-nationalsymbols",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. NATIONAL COMMON ENTRANCE EXAMINATION (NCEE) CURRICULAR UNIT
  // =========================================================================
  {
    id: "unit-hall-common-entrance-01",
    subjectId: "hall_common_entrance",
    level: "upper_primary",
    title: "NCEE Exam Hall Mastery & Time-Management Strategies",
    code: "NCEE-HALL-01",
    description: "Prepare candidates for the National Common Entrance Examination (NCEE) into Federal Unity Colleges and State Model Colleges.",
    order: 1,
    category: "exam_focus",
    skills: [
      {
        id: "skill-hall-ncee-strategy",
        unitId: "unit-hall-common-entrance-01",
        title: "CBT Speed Strategy & Elimination Tactics",
        code: "SKL-NCEE-STRAT-01",
        summary: "Develop test-taking stamina, process of elimination, and question pacing under timed conditions.",
        objectives: [
          "Apply the process of elimination to rule out obvious distractor options",
          "Manage time effectively at an average rate of 1 minute per question",
          "Flag difficult questions to return to after completing quick foundational items"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-hall-ncee-strategy",
          title: "Mastering the Clock: How to Excel in the National Common Entrance Examination",
          hookAndIntuition: "Imagine taking a 50-question exam in 60 minutes. If you spend 8 minutes stuck on one difficult math puzzle, you will run out of time for 7 easy questions at the end! Smart scholars answer all the questions they know first, flag the tough ones, and return to them with time to spare.",
          conceptualExplanation: "The National Common Entrance Examination tests four core areas: Mathematics & Basic Science, Quantitative Reasoning, English & Verbal Aptitude, and Social Studies/Civic Education. Success requires both subject knowledge and time discipline. Using the Process of Elimination (crossing out options that are clearly impossible) improves your accuracy dramatically.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Elimination", definition: "Discarding wrong answer choices to narrow down possibilities.", practicalExample: "If an answer must be positive, immediately cross out all negative choices." },
            { termOrSymbol: "Pacing", definition: "Allocating a set amount of seconds per question to ensure full completion.", practicalExample: "60 minutes for 50 questions = ~70 seconds per question." }
          ],
          workedExamples: [
            {
              title: "Applying Elimination on a Word Problem",
              problemStatement: "A farmer sells 5 baskets of yams for ₦2,000 each. How much does he earn? Options: A) ₦10,000, B) ₦400, C) ₦2,005, D) ₦1,000.",
              steps: [
                { stepNumber: 1, instruction: "Estimate the magnitude", reasoning: "5 baskets at ₦2,000 each must be much more than ₦2,000." },
                { stepNumber: 2, instruction: "Eliminate absurd options", reasoning: "₦400 is division (2000 ÷ 5). ₦2,005 is simple addition. ₦1,000 is half. Cross all three out!" },
                { stepNumber: 3, instruction: "Confirm remaining choice", reasoning: "5 × 2,000 = ₦10,000. Option A is undeniably correct." }
              ],
              takeawayRule: "Cross out absurd distractors first to make the correct answer stand out."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Refusing to move past a question until you solve it.",
              whyItIsWrong: "Every question carries equal marks. Spending 5 minutes on one question loses you time for 4 other easy questions.",
              correctCorrection: "If you are stuck for more than 90 seconds, eliminate what you can, make your best choice, and move on."
            }
          ],
          guidedPracticePrompt: "How many seconds should you spend on average per question in a 60-minute 50-question exam?",
          summaryRecap: "Pace yourself, eliminate wrong distractors, and keep moving to finish every question with time for review."
        },
        questions: [
          {
            id: "q-ncee-strat-01",
            type: "multiple_choice",
            questionText: "If an exam has 50 questions and a time limit of 60 minutes, approximately how much time should you spend per question?",
            options: [
              "About 1 minute and 10 seconds",
              "About 3 minutes",
              "About 30 seconds",
              "About 5 minutes"
            ],
            correctAnswer: "About 1 minute and 10 seconds",
            explanation: "60 minutes = 3,600 seconds. 3,600 ÷ 50 questions = 72 seconds per question, which is 1 minute and 12 seconds.",
            hintLadder: [
              "Divide 60 minutes by 50 questions.",
              "60 ÷ 50 = 1.2 minutes.",
              "0.2 minutes = 0.2 × 60 = 12 seconds. So about 1 minute 10 seconds."
            ],
            misconceptionAlerts: [
              { trigger: "About 3 minutes", note: "At 3 minutes per question, you would only finish 20 questions in 60 minutes." }
            ],
            skillId: "skill-hall-ncee-strategy",
            difficulty: "easy"
          },
          {
            id: "q-ncee-strat-02",
            type: "multiple_choice",
            questionText: "What is the recommended test-taking strategy if you encounter a question you do not know how to solve immediately?",
            options: [
              "Eliminate clearly wrong options, make your best educated selection, and return to it if time permits",
              "Spend 15 minutes trying every possible calculation until you are certain",
              "Leave the answer sheet completely blank and stop the test",
              "Guess randomly without reading the question"
            ],
            correctAnswer: "Eliminate clearly wrong options, make your best educated selection, and return to it if time permits",
            explanation: "Eliminating improbable distractors increases your probability of success while preventing time-drain on subsequent easy questions.",
            hintLadder: [
              "Never get stuck on one single question while the clock runs down.",
              "Use elimination to narrow down choices.",
              "Mark your best choice and keep moving forward."
            ],
            misconceptionAlerts: [
              { trigger: "Spend 15 minutes trying every possible calculation until you are certain", note: "Spending 15 minutes guarantees you will run out of time for the rest of the exam." }
            ],
            skillId: "skill-hall-ncee-strategy",
            difficulty: "easy"
          },
          {
            id: "q-ncee-strat-03",
            type: "multiple_choice",
            questionText: "Which of the following Federal Unity Colleges in Nigeria is an example of an institution accessed via the National Common Entrance Examination?",
            options: [
              "King's College, Lagos / Federal Government College",
              "University of Ibadan",
              "Yaba College of Technology",
              "Ahmadu Bello University"
            ],
            correctAnswer: "King's College, Lagos / Federal Government College",
            explanation: "Federal Unity Colleges (such as King's College, Queen's College, and Federal Government Colleges across all states) are secondary schools entered via the NCEE.",
            hintLadder: [
              "Common Entrance is for transition from primary school to secondary school.",
              "University of Ibadan and ABU are tertiary universities (entered via JAMB UTME).",
              "King's College and Federal Government Colleges are secondary Unity Colleges."
            ],
            misconceptionAlerts: [
              { trigger: "University of Ibadan", note: "University of Ibadan is a tertiary university, not a secondary school." }
            ],
            skillId: "skill-hall-ncee-strategy",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const PRIMARY_CURRICULUM_UNITS: Unit[] = [
  ...WAVE1_DEEP_SATURATED_MATH_UNITS,
  ...CORE_FOUNDATIONAL_UNITS.filter(
    (u) =>
      u.subjectId !== "pri_math_numeracy" &&
      u.subjectId !== "pri_math_arithmetic" &&
      u.subjectId !== "pri_math_fractions_decimals"
  ),
  ...PRIMARY_ENGLISH_LITERACY_UNITS,
  ...PRIMARY_STEM_SCIENCE_UNITS,
  ...PRIMARY_SOCIAL_ARTS_UNITS
];
