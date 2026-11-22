import { Unit } from "../types/curriculum";

/**
 * MOOS TECHY ACADEMY — ALL-LEVELS FLAGSHIP CURRICULUM SATURATION
 * 
 * Saturated, pedagogical units across:
 * - Primary Foundations (Pri 1-3)
 * - Upper Primary (Pri 4-6)
 * - Junior Secondary (JSS 1-3)
 * - Senior Secondary (SSS 1-3)
 * - University Prep (Advanced STEM & Critical Inquiry)
 * - Exam Prep (WAEC, JAMB CBT, Standardized Intensive)
 * 
 * Across the 4 Flagship Domains:
 * 1. Mathematics
 * 2. English & Communication
 * 3. Natural & Applied Sciences (STEM)
 * 4. Computing & AI (ICT & Digital Literacy)
 */

// ============================================================================
// 1. PRIMARY FOUNDATIONS (Pri 1-3)
// ============================================================================

export const PRIMARY_FOUNDATIONS_UNITS: Unit[] = [
  // --- Mathematics: Primary Foundations ---
  {
    id: "unit-pri-found-math-1",
    subjectId: "math_core",
    level: "primary_foundations",
    title: "Counting, Number Sense & Place Value",
    code: "MTH-PF-01",
    description: "Build early numerical agility through object counting, one-to-one correspondence, and base-ten grouping.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pf-counting",
        unitId: "unit-pri-found-math-1",
        title: "Counting Objects & Place Value of Tens and Units",
        code: "SKL-PF-CNT",
        summary: "Identify numbers up to 100, group objects into tens and units, and compare quantities.",
        objectives: [
          "Count objects up to 100 with one-to-one correspondence",
          "Identify the place value of digits in two-digit numbers (Tens and Units)",
          "Compare two numbers using greater than, less than, or equal to"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pf-counting",
          title: "The Magic of Tens and Ones: Understanding How Numbers Are Built",
          hookAndIntuition: "Imagine you have 34 apples. If you put them in bags of 10, how many bags do you fill, and how many loose apples remain?",
          conceptualExplanation: "Every two-digit number is made of Tens and Units (Ones). In 34, the digit 3 means 3 bundles of ten (30), and the digit 4 means 4 loose ones.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Tens", definition: "A group of exactly 10 single units bundled together.", practicalExample: "3 tens = 30" },
            { termOrSymbol: "Units (Ones)", definition: "Single items that have not yet formed a full group of 10.", practicalExample: "4 units = 4" }
          ],
          workedExamples: [
            {
              title: "Finding Tens and Units in 47",
              problemStatement: "How many tens and how many units are in the number 47?",
              steps: [
                { stepNumber: 1, instruction: "Look at the left digit", reasoning: "The left digit in a 2-digit number is in the Tens place. Here it is 4, which means 4 tens (40)." },
                { stepNumber: 2, instruction: "Look at the right digit", reasoning: "The right digit is in the Units place. Here it is 7, which means 7 units." }
              ],
              takeawayRule: "In any two-digit number XY, X represents the Tens and Y represents the Units."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Thinking the 4 in 47 just means 4 single items.", whyItIsWrong: "Because it is in the tens column, it actually means 40.", correctCorrection: "Always remember the place value column: Tens on the left, Units on the right." }
          ],
          guidedPracticePrompt: "What is the value of 5 in 58? Is it 5 or 50?",
          summaryRecap: "Numbers are built systematically with place value: 10 units form 1 ten."
        },
        questions: [
          {
            id: "q-pf-cnt-1",
            type: "multiple_choice",
            questionText: "In the number 47, how many tens and how many units are there?",
            options: ["4 tens and 7 units", "7 tens and 4 units", "40 tens and 7 units", "4 tens and 70 units"],
            correctAnswer: "4 tens and 7 units",
            explanation: "The digit 4 is in the tens column (value 40), and 7 is in the units column (value 7).",
            hintLadder: [
              "Remember: Tens are on the left, units are on the right.",
              "In 47, the first digit is 4 and the second is 7."
            ],
            misconceptionAlerts: [
              { trigger: "7 tens and 4 units", note: "Be careful not to switch the positions of tens and units!" }
            ],
            skillId: "skill-pf-counting",
            difficulty: "easy"
          },
          {
            id: "q-pf-cnt-2",
            type: "multiple_choice",
            questionText: "Which symbol correctly compares 63 and 36?",
            options: ["63 > 36", "63 < 36", "63 = 36", "63 + 36"],
            correctAnswer: "63 > 36",
            explanation: "63 has 6 tens, whereas 36 only has 3 tens. Since 6 tens is more than 3 tens, 63 is greater than 36 (63 > 36).",
            hintLadder: [
              "Compare the tens digits first: 6 tens vs 3 tens.",
              "The open mouth of the symbol > always points toward the bigger number."
            ],
            misconceptionAlerts: [
              { trigger: "63 < 36", note: "Remember, the hungry alligator mouth > eats the larger number 63." }
            ],
            skillId: "skill-pf-counting",
            difficulty: "easy"
          },
          {
            id: "q-pf-cnt-3",
            type: "multiple_choice",
            questionText: "A farmer collected 5 bags of 10 eggs and 8 loose eggs. How many eggs does the farmer have in total?",
            options: ["58 eggs", "50 eggs", "85 eggs", "13 eggs"],
            correctAnswer: "58 eggs",
            explanation: "5 bags of 10 = 50 eggs. Adding 8 loose eggs gives 50 + 8 = 58 eggs.",
            hintLadder: [
              "5 bags of 10 eggs is 5 × 10 = 50.",
              "Now add the 8 loose eggs to 50."
            ],
            misconceptionAlerts: [
              { trigger: "13 eggs", note: "Did you add 5 + 8 instead of multiplying 5 by 10 first?" }
            ],
            skillId: "skill-pf-counting",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- English: Primary Foundations ---
  {
    id: "unit-pri-found-eng-1",
    subjectId: "lang_english",
    level: "primary_foundations",
    title: "Phonics, Letter Sounds & Simple Sentences",
    code: "ENG-PF-01",
    description: "Master phonemic awareness, short vowel sounds, blending, and basic capital-letter sentence formation.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pf-phonics",
        unitId: "unit-pri-found-eng-1",
        title: "Short Vowels, Consonant Blends & Sight Words",
        code: "SKL-PF-PHN",
        summary: "Decode simple three-letter CVC words (cat, pin, sun) and recognize essential sight words.",
        objectives: [
          "Distinguish short vowel sounds: a, e, i, o, u",
          "Blend consonant-vowel-consonant (CVC) sounds into words",
          "Identify complete sentences starting with capital letters and ending with full stops"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pf-phonics",
          title: "Sounding Out Words: The Power of Phonics and Blending",
          hookAndIntuition: "Letters are like musical instruments. When you play their sounds together, they make a word!",
          conceptualExplanation: "Each letter has a sound. In the word 'C-A-T', /c/ + /a/ + /t/ blend smoothly together to make 'cat'. Every sentence starts with an uppercase letter and finishes with a punctuation mark.",
          keyTermsAndFormulas: [
            { termOrSymbol: "CVC Word", definition: "A word made of Consonant - Vowel - Consonant.", practicalExample: "c-a-t, p-i-n, s-u-n" },
            { termOrSymbol: "Full Stop (.)", definition: "A dot at the end of a telling sentence.", practicalExample: "The dog ran." }
          ],
          workedExamples: [
            {
              title: "Blending sounds for 'sun'",
              problemStatement: "Blend the sounds: /s/ + /u/ + /n/",
              steps: [
                { stepNumber: 1, instruction: "Say the first sound", reasoning: "/s/ like a snake." },
                { stepNumber: 2, instruction: "Add the short vowel", reasoning: "/u/ like an umbrella going up." },
                { stepNumber: 3, instruction: "Add the ending sound and blend", reasoning: "/n/ at the end makes 'sun'." }
              ],
              takeawayRule: "Blend letter sounds smoothly from left to right."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Confusing the letter name with the letter sound.", whyItIsWrong: "The letter 'B' is named 'bee' but its sound is /b/.", correctCorrection: "Always use the sound when reading words." }
          ],
          guidedPracticePrompt: "Can you sound out /p/ + /e/ + /n/? What word is that?",
          summaryRecap: "Phonics allows us to read any word by blending its sounds."
        },
        questions: [
          {
            id: "q-pf-phn-1",
            type: "multiple_choice",
            questionText: "Which word has the short /a/ vowel sound, as in 'apple'?",
            options: ["bag", "bed", "big", "box"],
            correctAnswer: "bag",
            explanation: "'Bag' contains the short /a/ vowel sound (/b/-/æ/-/g/). 'Bed' has /e/, 'big' has /i/, and 'box' has /o/.",
            hintLadder: [
              "Say each word slowly and listen to the middle sound.",
              "Listen for the /æ/ sound in 'cat' and 'apple'."
            ],
            misconceptionAlerts: [
              { trigger: "bed", note: "'Bed' has a short /e/ sound, not /a/." }
            ],
            skillId: "skill-pf-phonics",
            difficulty: "easy"
          },
          {
            id: "q-pf-phn-2",
            type: "multiple_choice",
            questionText: "Which sentence is punctuated correctly with a capital letter and a full stop?",
            options: [
              "The dog runs fast in the yard.",
              "the dog runs fast in the yard.",
              "The dog runs fast in the yard",
              "the dog runs fast in the yard"
            ],
            correctAnswer: "The dog runs fast in the yard.",
            explanation: "A complete sentence must begin with a capital letter ('The') and end with a proper punctuation mark such as a full stop ('.').",
            hintLadder: [
              "Check the first letter: is it capitalized?",
              "Check the end of the sentence: does it have a full stop?"
            ],
            misconceptionAlerts: [
              { trigger: "The dog runs fast in the yard", note: "Don't forget the full stop at the end!" }
            ],
            skillId: "skill-pf-phonics",
            difficulty: "easy"
          },
          {
            id: "q-pf-phn-3",
            type: "multiple_choice",
            questionText: "What word do you get when you blend the sounds: /f/ + /i/ + /sh/?",
            options: ["fish", "dish", "ship", "wish"],
            correctAnswer: "fish",
            explanation: "Blending /f/ + /i/ + /sh/ produces the word 'fish'.",
            hintLadder: [
              "The first sound is /f/ like feather.",
              "Combine with the short /i/ and /sh/ sound."
            ],
            misconceptionAlerts: [
              { trigger: "dish", note: "'Dish' begins with /d/, but our sound begins with /f/." }
            ],
            skillId: "skill-pf-phonics",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- STEM / Science: Primary Foundations ---
  {
    id: "unit-pri-found-stem-1",
    subjectId: "sci_physics", // Also registered for integrated science
    level: "primary_foundations",
    title: "Living Things, The Senses & Our World",
    code: "SCI-PF-01",
    description: "Explore the characteristics of living things, how the 5 senses help us observe nature, and basic weather patterns.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pf-living-things",
        unitId: "unit-pri-found-stem-1",
        title: "Living vs Non-Living Things and the Five Senses",
        code: "SKL-PF-LIV",
        summary: "Identify what living things need to survive and connect the five human sense organs to their functions.",
        objectives: [
          "Distinguish living organisms from non-living objects",
          "Identify basic needs of living things: food, water, air, and shelter",
          "Match each of the 5 senses (sight, hearing, smell, taste, touch) to its sense organ"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pf-living",
          title: "Discovering Life and Our Five Wonderful Senses",
          hookAndIntuition: "Look around you! A puppy moves and eats, but a toy car only moves when you push it. Why?",
          conceptualExplanation: "Living things grow, breathe, eat food, and produce young ones. Non-living things cannot grow or breathe on their own. We explore our world using 5 senses: eyes for seeing, ears for hearing, nose for smelling, tongue for tasting, and skin for touching.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Living Thing", definition: "An organism that can grow, breathe, move, and reproduce.", practicalExample: "Plants, animals, humans" },
            { termOrSymbol: "Sense Organ", definition: "A part of the body that collects information about our surroundings.", practicalExample: "Eyes, ears, nose, tongue, skin" }
          ],
          workedExamples: [
            {
              title: "Classifying a Tree",
              problemStatement: "Is a mango tree living or non-living?",
              steps: [
                { stepNumber: 1, instruction: "Ask: Does it grow?", reasoning: "Yes, a seed grows into a huge tree." },
                { stepNumber: 2, instruction: "Ask: Does it need water and food?", reasoning: "Yes, it needs sunlight and water to make food." },
                { stepNumber: 3, instruction: "Conclude", reasoning: "Therefore, a mango tree is a living thing." }
              ],
              takeawayRule: "Even if plants do not walk around, they grow and need nutrients, making them living organisms."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Thinking plants are non-living because they don't run around.", whyItIsWrong: "Plants grow, breathe air, take in water, and reproduce seeds.", correctCorrection: "Plants are fully living organisms." }
          ],
          guidedPracticePrompt: "Which sense organ warns you that food on the stove smells burnt?",
          summaryRecap: "Living things grow and reproduce; our five senses help us perceive the world safely."
        },
        questions: [
          {
            id: "q-pf-liv-1",
            type: "multiple_choice",
            questionText: "Which of the following is a LIVING thing?",
            options: ["A growing seedling", "A plastic ruler", "A rubber ball", "A toy truck"],
            correctAnswer: "A growing seedling",
            explanation: "A seedling is a plant that breathes, takes in water, and grows into a mature plant. Plastic rulers and toys are non-living.",
            hintLadder: [
              "Which of these items can grow bigger and needs water?",
              "Think about what happens to seeds when you plant them in soil."
            ],
            misconceptionAlerts: [
              { trigger: "A toy truck", note: "A toy truck only moves when a battery or hand moves it; it does not grow or eat." }
            ],
            skillId: "skill-pf-living-things",
            difficulty: "easy"
          },
          {
            id: "q-pf-liv-2",
            type: "multiple_choice",
            questionText: "Which sense organ allows you to hear the sound of a school bell ringing?",
            options: ["Ears", "Eyes", "Nose", "Tongue"],
            correctAnswer: "Ears",
            explanation: "Ears are the auditory sense organs that detect sound waves in the air.",
            hintLadder: [
              "Think about which part of your body you use to listen to music or voices."
            ],
            misconceptionAlerts: [
              { trigger: "Eyes", note: "Eyes allow you to see, but ears allow you to hear sounds." }
            ],
            skillId: "skill-pf-living-things",
            difficulty: "easy"
          },
          {
            id: "q-pf-liv-3",
            type: "multiple_choice",
            questionText: "What do all living animals need to survive every day?",
            options: ["Clean water, food, and air", "Batteries and plastic", "Only bright sunshine", "Gasoline and oil"],
            correctAnswer: "Clean water, food, and air",
            explanation: "All living animals require water for hydration, food for energy, and air (oxygen) for respiration.",
            hintLadder: [
              "What does your body ask for when you are thirsty or hungry?"
            ],
            misconceptionAlerts: [
              { trigger: "Batteries and plastic", note: "Only machines use batteries, not living animals!" }
            ],
            skillId: "skill-pf-living-things",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- ICT: Primary Foundations ---
  {
    id: "unit-pri-found-ict-1",
    subjectId: "tech_compsci",
    level: "primary_foundations",
    title: "Computer Parts & Safe Digital Exploration",
    code: "ICT-PF-01",
    description: "Identify key components of a computer (monitor, keyboard, mouse, system unit) and learn essential digital hygiene.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pf-computer-parts",
        unitId: "unit-pri-found-ict-1",
        title: "Parts of a Computer and Screen Safety Rules",
        code: "SKL-PF-CPT",
        summary: "Name the monitor, keyboard, and mouse; understand how to click and type safely; and practice healthy screen habits.",
        objectives: [
          "Identify and name the 4 primary parts of a desktop computer",
          "Understand the purpose of the mouse (pointing/clicking) and keyboard (typing)",
          "Practice healthy posture and screen-time balance"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pf-computer",
          title: "Meet the Computer: Screen, Mouse, Keyboard and Safety",
          hookAndIntuition: "When you want to draw a picture on a computer, which part shows the picture and which part lets you click?",
          conceptualExplanation: "A computer has special parts working together: The Monitor shows pictures and words. The Keyboard has buttons with letters and numbers for typing. The Mouse points and clicks. Always sit straight and take screen breaks!",
          keyTermsAndFormulas: [
            { termOrSymbol: "Monitor", definition: "The screen that displays information, pictures, and videos.", practicalExample: "Viewing your lesson." },
            { termOrSymbol: "Mouse", definition: "A handheld pointing device used to select items on the screen.", practicalExample: "Left-click to choose." },
            { termOrSymbol: "Keyboard", definition: "A board of keys with letters and numbers for entering information.", practicalExample: "Typing your name." }
          ],
          workedExamples: [
            {
              title: "Typing Your Name",
              problemStatement: "Which computer part do you use to type the letters of your name?",
              steps: [
                { stepNumber: 1, instruction: "Think about which part has letters", reasoning: "The keyboard contains keys with letters A to Z." },
                { stepNumber: 2, instruction: "Press the keys", reasoning: "Pressing keys sends letters onto the monitor." }
              ],
              takeawayRule: "We use the keyboard to type words and numbers into the computer."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Thinking the monitor is the whole computer.", whyItIsWrong: "The monitor is just the screen; the system unit does the processing.", correctCorrection: "The monitor shows what the computer is doing." }
          ],
          guidedPracticePrompt: "Which part of the computer do you click to open a learning game?",
          summaryRecap: "Computers help us learn through monitors, mice, and keyboards; safe posture keeps our bodies healthy."
        },
        questions: [
          {
            id: "q-pf-ict-1",
            type: "multiple_choice",
            questionText: "Which part of a computer displays pictures, lessons, and videos?",
            options: ["The Monitor", "The Mouse", "The Keyboard", "The Power Cable"],
            correctAnswer: "The Monitor",
            explanation: "The monitor is the visual display screen that shows text, images, and videos.",
            hintLadder: [
              "Which part looks like a television screen?",
              "You use your eyes to look at this part."
            ],
            misconceptionAlerts: [
              { trigger: "The Mouse", note: "The mouse is used to point and click, not to display pictures." }
            ],
            skillId: "skill-pf-computer-parts",
            difficulty: "easy"
          },
          {
            id: "q-pf-ict-2",
            type: "multiple_choice",
            questionText: "What device do you use to type words, numbers, and your name into a computer?",
            options: ["Keyboard", "Microphone", "Printer", "Speakers"],
            correctAnswer: "Keyboard",
            explanation: "The keyboard contains letter, number, and punctuation keys used for typing.",
            hintLadder: [
              "Look for the board with rows of letter buttons from A to Z."
            ],
            misconceptionAlerts: [
              { trigger: "Printer", note: "A printer puts words on paper; a keyboard types them into the computer." }
            ],
            skillId: "skill-pf-computer-parts",
            difficulty: "easy"
          },
          {
            id: "q-pf-ict-3",
            type: "multiple_choice",
            questionText: "What is a healthy rule when using a computer or tablet?",
            options: [
              "Take regular breaks and sit up straight",
              "Sit in complete darkness for 10 hours",
              "Never blink while looking at the screen",
              "Eat messy soup directly over the keyboard"
            ],
            correctAnswer: "Take regular breaks and sit up straight",
            explanation: "Healthy digital habits include sitting with good posture and taking breaks to rest your eyes.",
            hintLadder: [
              "Think about protecting your eyes and spine while studying."
            ],
            misconceptionAlerts: [
              { trigger: "Eat messy soup directly over the keyboard", note: "Liquid spills can damage delicate electronics!" }
            ],
            skillId: "skill-pf-computer-parts",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- Mathematics: Primary Foundations (Addition & Regrouping) ---
  {
    id: "unit-pri-found-math-regrouping",
    subjectId: "math_core",
    level: "primary_foundations",
    title: "Two-Digit Addition, Regrouping & Word Problem Scenarios",
    code: "MTH-PF-02",
    description: "Develop fluency in multi-digit vertical column addition, place-value regrouping (carrying over tens), and solving everyday story problems.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-pf-addition-regrouping",
        unitId: "unit-pri-found-math-regrouping",
        title: "Column Addition with Regrouping & Tens Carry-Over",
        code: "SKL-PF-ADD",
        summary: "Align numbers vertically by place value, sum the units column, regroup sums greater than 9 into tens, and calculate total sums.",
        objectives: [
          "Align two-digit numbers correctly in Tens and Units columns",
          "Regroup when the sum of units exceeds 9 (e.g. 14 units = 1 ten and 4 units)",
          "Solve two-step commercial and real-world addition story problems accurately"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pf-addition-regrouping",
          title: "The Carry-Over Secret: Adding Double Digits with Regrouping",
          hookAndIntuition: "If you have 17 marbles and your friend gives you 25 more, you cannot fit two digits into the single units place. Where does the extra ten go?",
          conceptualExplanation: "In column addition, always add from right to left, starting with the Units. If the units add up to 10 or more, you 'regroup': the ones stay in the units column, and the ten hops over to the Tens column as a carry-over.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Regrouping (Carrying)", definition: "Trading 10 units for 1 ten and placing it into the tens column.", practicalExample: "7 + 5 = 12 (Write 2, carry 1 ten)" },
            { termOrSymbol: "Column Alignment", definition: "Arranging numbers so Tens sit over Tens and Units sit over Units.", practicalExample: "28 + 15 lined up vertically" }
          ],
          workedExamples: [
            {
              title: "Solving 28 + 15",
              problemStatement: "Calculate 28 + 15 using column addition.",
              mathExpression: "28 + 15 = 43",
              steps: [
                { stepNumber: 1, instruction: "Add the units column", reasoning: "8 + 5 = 13. Since 13 has 1 ten and 3 units, write 3 in the units column and carry 1 ten to the tens column." },
                { stepNumber: 2, instruction: "Add the tens column with carry-over", reasoning: "1 (carried) + 2 + 1 = 4 tens. Write 4 in the tens column." },
                { stepNumber: 3, instruction: "Combine results", reasoning: "The total sum is 43." }
              ],
              takeawayRule: "Always add the carried ten to the tens column; never forget to include it."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Writing the full number 13 in the units column to get '213'.", whyItIsWrong: "Each column can only hold one digit (0–9).", correctCorrection: "Write 3 units and carry the 1 ten above the next column." }
          ],
          guidedPracticePrompt: "Add 36 + 19. Start with 6 + 9 = 15. What digit stays and what digit carries?",
          summaryRecap: "Start at the units; if the sum is 10 or greater, carry the ten to the next column."
        },
        questions: [
          {
            id: "q-pf-add-1",
            type: "multiple_choice",
            questionText: "Calculate the exact sum: 27 + 35",
            mathExpression: "27 + 35",
            options: ["62", "52", "512", "61"],
            correctAnswer: "62",
            explanation: "Units: 7 + 5 = 12 (write 2, carry 1). Tens: 1 (carry) + 2 + 3 = 6. Total = 62.",
            hintLadder: [
              "Step 1: Add the units digits (7 + 5). What do you get?",
              "7 + 5 = 12, so write 2 in units and carry 1 ten.",
              "Step 2: Add 1 + 2 + 3 in the tens column."
            ],
            misconceptionAlerts: [
              { trigger: "52", note: "Did you forget to add the carried 1 ten to 2 + 3?" },
              { trigger: "512", note: "Remember, you cannot write 12 in the single units column! You must carry the 1 ten." }
            ],
            skillId: "skill-pf-addition-regrouping",
            difficulty: "easy"
          },
          {
            id: "q-pf-add-2",
            type: "multiple_choice",
            questionText: "A primary school library has 48 mathematics books and 36 storybooks. How many books are there in total?",
            mathExpression: "48 + 36",
            options: ["84 books", "74 books", "82 books", "714 books"],
            correctAnswer: "84 books",
            explanation: "8 + 6 = 14 (write 4, carry 1). Tens: 1 + 4 + 3 = 8. Total = 84 books.",
            hintLadder: [
              "Align the numbers: 48 on top of 36.",
              "Add 8 + 6 = 14. Keep 4, carry 1 ten.",
              "Add 1 + 4 + 3 = 8 tens."
            ],
            misconceptionAlerts: [
              { trigger: "74 books", note: "Check your carry-over: 1 + 4 + 3 = 8, not 7." },
              { trigger: "714 books", note: "Never write the entire 14 in the units column!" }
            ],
            skillId: "skill-pf-addition-regrouping",
            difficulty: "easy"
          },
          {
            id: "q-pf-add-3",
            type: "multiple_choice",
            questionText: "Which statement explains why 59 + 24 equals 83?",
            options: [
              "9 units + 4 units = 13 units (3 units, carry 1 ten); 1 ten + 5 tens + 2 tens = 8 tens (83)",
              "5 + 2 = 7 and 9 + 4 = 13, so the answer is 713",
              "You only add the tens and ignore the units",
              "9 + 4 = 12, so the answer is 82"
            ],
            correctAnswer: "9 units + 4 units = 13 units (3 units, carry 1 ten); 1 ten + 5 tens + 2 tens = 8 tens (83)",
            explanation: "9 + 4 = 13 units, regrouped as 1 ten and 3 units. Adding the tens: 1 + 5 + 2 = 8 tens, giving 83.",
            hintLadder: [
              "Look for the explanation that correctly tracks both the units sum and the carried ten."
            ],
            misconceptionAlerts: [
              { trigger: "5 + 2 = 7 and 9 + 4 = 13, so the answer is 713", note: "Placing 13 directly after 7 ignores base-ten regrouping." }
            ],
            skillId: "skill-pf-addition-regrouping",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // --- STEM: Primary Foundations (Forces, Matter & Motion) ---
  {
    id: "unit-pri-found-stem-forces",
    subjectId: "sci_physics",
    level: "primary_foundations",
    title: "Pushes, Pulls, Magnets & Motion Around Us",
    code: "SCI-PF-02",
    description: "Discover how forces make objects move, stop, or change direction; explore gravity, surface friction, and magnetic attraction.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-pf-forces-motion",
        unitId: "unit-pri-found-stem-forces",
        title: "Understanding Forces: Pushes, Pulls, Gravity & Friction",
        code: "SKL-PF-FRC",
        summary: "Identify pushes and pulls in daily activities, explain why dropped objects fall to the ground, and observe magnetic poles.",
        objectives: [
          "Differentiate between pushing forces (moving away) and pulling forces (moving closer)",
          "Explain that gravity pulls objects downward toward the Earth",
          "Observe that magnets attract magnetic materials (like iron and steel) and have North and South poles"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pf-forces",
          title: "The Invisible Hand of Forces: Pushes, Pulls and Magnets",
          hookAndIntuition: "When you kick a football, open a heavy door, or drop a pencil, what makes things move or fall?",
          conceptualExplanation: "A force is simply a push or a pull. Pushing moves something away from you. Pulling moves something toward you. Gravity is an invisible force from Earth pulling everything down. Magnets have special poles (North and South) that attract magnetic metals like iron.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Push", definition: "A force directed away from your body.", practicalExample: "Kicking a ball or pushing a door shut." },
            { termOrSymbol: "Pull", definition: "A force directed toward your body.", practicalExample: "Opening a desk drawer or pulling a wagon." },
            { termOrSymbol: "Gravity", definition: "The force that pulls all objects toward the center of the Earth." },
            { termOrSymbol: "Magnet", definition: "An object that attracts iron, steel, and other magnetic metals." }
          ],
          workedExamples: [
            {
              title: "Classifying Forces on a School Bag",
              problemStatement: "When you lift your school bag off the floor onto your desk, what force are you applying?",
              steps: [
                { stepNumber: 1, instruction: "Determine the direction of movement", reasoning: "You are pulling the bag upward toward your hands against gravity." },
                { stepNumber: 2, instruction: "Classify", reasoning: "Lifting an object upward toward you is a pulling force." }
              ],
              takeawayRule: "Lifting against gravity is an upward pull."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Thinking heavy objects fall much faster than light objects in everyday conditions.", whyItIsWrong: "Gravity pulls all objects with the same acceleration; differences in air resistance cause feathers to drift slowly.", correctCorrection: "Gravity acts equally on all matter." }
          ],
          guidedPracticePrompt: "Is closing a drawer a push or a pull? What about opening it?",
          summaryRecap: "Forces are pushes or pulls that make objects start moving, speed up, slow down, or change direction."
        },
        questions: [
          {
            id: "q-pf-frc-1",
            type: "multiple_choice",
            questionText: "Which action is an example of a PULLING force?",
            options: [
              "Opening a sliding desk drawer toward you",
              "Kicking a soccer ball forward into the net",
              "Pressing a doorbell with your thumb",
              "Rolling a bowling ball down an alley"
            ],
            correctAnswer: "Opening a sliding desk drawer toward you",
            explanation: "Pulling moves an object closer to you, such as opening a drawer. Kicking, pressing, and rolling apply pushes away from you.",
            hintLadder: [
              "Think about the direction: does the object move toward you or away from you?",
              "Opening a drawer brings it closer to your body (a pull)."
            ],
            misconceptionAlerts: [
              { trigger: "Kicking a soccer ball forward into the net", note: "Kicking applies a push that sends the ball away from your foot." }
            ],
            skillId: "skill-pf-forces-motion",
            difficulty: "easy"
          },
          {
            id: "q-pf-frc-2",
            type: "multiple_choice",
            questionText: "What invisible force causes a ripe mango to fall straight down from a tree to the ground?",
            options: ["Gravity", "Magnetism", "Wind electricity", "Friction"],
            correctAnswer: "Gravity",
            explanation: "Gravity is the attractive force exerted by Earth that pulls all objects downward toward its center.",
            hintLadder: [
              "Think about what pulls objects down when you let go of them."
            ],
            misconceptionAlerts: [
              { trigger: "Magnetism", note: "Mangos are organic fruit, not magnetic metals; magnetism does not pull fruit." }
            ],
            skillId: "skill-pf-forces-motion",
            difficulty: "easy"
          },
          {
            id: "q-pf-frc-3",
            type: "multiple_choice",
            questionText: "Which of the following items will be strongly ATTRACTED by a bar magnet?",
            options: [
              "An iron nail",
              "A plastic water bottle",
              "A wooden pencil",
              "A cotton shirt"
            ],
            correctAnswer: "An iron nail",
            explanation: "Magnets attract ferromagnetic metals such as iron, nickel, and steel. Plastic, wood, and cotton are non-magnetic.",
            hintLadder: [
              "Magnets only attract certain metals like iron and steel.",
              "Which of these choices is made of iron metal?"
            ],
            misconceptionAlerts: [
              { trigger: "A plastic water bottle", note: "Magnets never attract plastic materials." }
            ],
            skillId: "skill-pf-forces-motion",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

// ============================================================================
// 2. UPPER PRIMARY (Pri 4-6) — STEM & ICT ADDITIONS
// ============================================================================

export const UPPER_PRIMARY_STEM_ICT_UNITS: Unit[] = [
  // --- STEM: Upper Primary ---
  {
    id: "unit-pri-upper-stem-matter",
    subjectId: "sci_physics",
    level: "upper_primary",
    title: "States of Matter, Mixtures & Simple Machines",
    code: "SCI-UP-01",
    description: "Understand solids, liquids, and gases; separation of mixtures; and how levers, pulleys, and inclined planes reduce effort.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-up-matter-machines",
        unitId: "unit-pri-upper-stem-matter",
        title: "States of Matter and Mechanical Advantage of Levers",
        code: "SKL-UP-MAT",
        summary: "Compare the arrangement of particles in solids, liquids, and gases, and calculate simple machine effort.",
        objectives: [
          "Describe properties of solids (fixed shape), liquids (fixed volume), and gases (fills container)",
          "Identify everyday simple machines: lever, pulley, inclined plane, wheel and axle",
          "Explain how a lever makes lifting heavy loads easier using a fulcrum"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-up-mat-1",
            type: "multiple_choice",
            questionText: "Which state of matter has a definite volume but takes the shape of whatever container it is poured into?",
            options: ["Liquid", "Solid", "Gas", "Plasma"],
            correctAnswer: "Liquid",
            explanation: "Liquids have fixed volumes because particles stay close, but can flow and take the shape of their container.",
            hintLadder: [
              "Think of water in a glass vs water poured into a wide bowl.",
              "The amount of water stays the same, but the shape changes."
            ],
            misconceptionAlerts: [
              { trigger: "Gas", note: "Gases expand to fill the entire container, having neither fixed shape nor fixed volume." }
            ],
            skillId: "skill-up-matter-machines",
            difficulty: "medium"
          },
          {
            id: "q-up-mat-2",
            type: "multiple_choice",
            questionText: "A ramp used to roll heavy barrels up into a lorry is an example of which simple machine?",
            options: ["Inclined plane", "Lever", "Pulley", "Screw"],
            correctAnswer: "Inclined plane",
            explanation: "An inclined plane is a flat, sloped surface that allows loads to be raised using less effort over a longer distance.",
            hintLadder: [
              "A ramp is a sloping flat board.",
              "The scientific term for a flat sloped surface is an inclined plane."
            ],
            misconceptionAlerts: [
              { trigger: "Lever", note: "A lever rotates around a fixed point called a fulcrum (like a seesaw or crowbar)." }
            ],
            skillId: "skill-up-matter-machines",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- ICT: Upper Primary ---
  {
    id: "unit-pri-upper-ict-skills",
    subjectId: "tech_compsci",
    level: "upper_primary",
    title: "Word Processing, File Management & Web Safety",
    code: "ICT-UP-01",
    description: "Create documents, format text, organize files into folders, and practice responsible online safety and passwords.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-up-word-processing",
        unitId: "unit-pri-upper-ict-skills",
        title: "Word Processing Formatting and Strong Password Security",
        code: "SKL-UP-WPD",
        summary: "Format fonts, save documents to folders, and build resilient passwords protecting personal identity.",
        objectives: [
          "Format text: bold, italics, underline, font size, and text alignment",
          "Differentiate between saving a file (Ctrl+S) and saving a new copy (Save As)",
          "Identify strong password criteria: mix of uppercase, lowercase, numbers, and symbols"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-up-wpd-1",
            type: "multiple_choice",
            questionText: "Which of the following creates the STRONGEST password for securing an educational account?",
            options: [
              "Falcon#942_Bright",
              "password123",
              "12345678",
              "john"
            ],
            correctAnswer: "Falcon#942_Bright",
            explanation: "'Falcon#942_Bright' combines uppercase letters, lowercase letters, numbers, and symbols, resisting dictionary attacks.",
            hintLadder: [
              "Strong passwords never use common words like 'password' or simple sequences like '123456'.",
              "Look for a password combining letters, numbers, and special characters."
            ],
            misconceptionAlerts: [
              { trigger: "password123", note: "'password123' is one of the most easily hacked passwords in the world!" }
            ],
            skillId: "skill-up-word-processing",
            difficulty: "easy"
          },
          {
            id: "q-up-wpd-2",
            type: "multiple_choice",
            questionText: "In most word processing software, what shortcut combination quickly SAVES the current document?",
            options: ["Ctrl + S", "Ctrl + P", "Ctrl + Z", "Ctrl + X"],
            correctAnswer: "Ctrl + S",
            explanation: "Ctrl + S (or Cmd + S on Mac) is the universal shortcut to Save document modifications.",
            hintLadder: [
              "S stands for Save.",
              "Ctrl + P is for printing, while Ctrl + Z is for undo."
            ],
            misconceptionAlerts: [
              { trigger: "Ctrl + P", note: "Ctrl + P triggers Print, not Save." }
            ],
            skillId: "skill-up-word-processing",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

// ============================================================================
// 3. JUNIOR SECONDARY (JSS 1-3 / BECE) — STEM & ICT ADDITIONS
// ============================================================================

export const JUNIOR_SECONDARY_STEM_ICT_UNITS: Unit[] = [
  // --- STEM / Basic Science: Junior Secondary ---
  {
    id: "unit-jss-stem-energy",
    subjectId: "sci_physics",
    level: "junior_secondary",
    title: "Forms of Energy, Energy Conversion & Conservation",
    code: "SCI-JS-01",
    description: "Investigate kinetic and potential energy, the Law of Conservation of Energy, thermal transfers (conduction, convection, radiation), and renewable energy.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-js-energy-conversion",
        unitId: "unit-jss-stem-energy",
        title: "Kinetic-Potential Transformations and Conservation of Energy",
        code: "SKL-JS-ENG",
        summary: "Calculate kinetic energy (½mv²) and gravitational potential energy (mgh), tracking energy transitions in mechanical systems.",
        objectives: [
          "State the Law of Conservation of Energy: energy cannot be created or destroyed, only transformed",
          "Differentiate between Potential Energy (Ep = mgh) and Kinetic Energy (Ek = ½mv²)",
          "Analyze energy conversions in roller coasters, falling stones, and hydroelectric dams"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-js-energy",
          title: "The Law of Conservation of Energy: Tracking Transformations",
          hookAndIntuition: "When a stone is lifted to the top of a cliff, where does the work you did go? When it falls, where does that energy end up?",
          conceptualExplanation: "Energy can never be created out of nothing, nor can it disappear. At the top of a drop, an object has Maximum Gravitational Potential Energy (Ep = mgh). As it falls, Ep converts into Kinetic Energy (Ek = ½mv²). Just before hitting the ground, Ep has completely converted into Ek (ignoring air resistance).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Ep = mgh", definition: "Gravitational Potential Energy (mass × gravity × height).", practicalExample: "Ep = (2 kg)(9.8 m/s²)(10 m) = 196 J" },
            { termOrSymbol: "Ek = ½mv²", definition: "Kinetic Energy of a moving mass.", practicalExample: "Ek = 0.5 × 2 × (14)² = 196 J" },
            { termOrSymbol: "Joule (J)", definition: "The standard SI unit for work and energy." }
          ],
          workedExamples: [
            {
              title: "Calculating Potential Energy",
              problemStatement: "A 4 kg stone is resting on a ledge 5 metres above the ground. Calculate its potential energy (taking g = 10 m/s²).",
              mathExpression: "E_p = m \\times g \\times h",
              steps: [
                { stepNumber: 1, instruction: "Identify given variables", reasoning: "m = 4 kg, g = 10 m/s², h = 5 m" },
                { stepNumber: 2, instruction: "Substitute into formula", reasoning: "Ep = 4 × 10 × 5 = 200 Joules" }
              ],
              takeawayRule: "Potential energy depends directly on mass, gravitational acceleration, and elevation height."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Thinking energy is lost when an object stops.", whyItIsWrong: "Energy is transformed into thermal energy (heat) and sound, not destroyed.", correctCorrection: "Total energy remains constant in an isolated system." }
          ],
          guidedPracticePrompt: "If a stone with 200 J of Ep falls with no air drag, what is its Ek just before hitting the ground?",
          summaryRecap: "Energy is neither created nor destroyed; total mechanical energy is conserved."
        },
        questions: [
          {
            id: "q-js-eng-1",
            type: "multiple_choice",
            questionText: "A 2 kg coconut hangs from a palm tree 10 m high. Calculate its gravitational potential energy relative to the ground. (Take g = 9.8 m/s²)",
            mathExpression: "E_p = m \\cdot g \\cdot h",
            options: ["196 J", "98 J", "20 J", "392 J"],
            correctAnswer: "196 J",
            explanation: "Ep = m × g × h = 2 kg × 9.8 m/s² × 10 m = 196 Joules.",
            hintLadder: [
              "Use formula Ep = mgh.",
              "Multiply: 2 × 9.8 × 10 = 196 J."
            ],
            misconceptionAlerts: [
              { trigger: "98 J", note: "Did you forget to multiply by the mass (2 kg)?" },
              { trigger: "20 J", note: "Did you multiply 2 × 10 and forget gravity (9.8 m/s²)?" }
            ],
            skillId: "skill-js-energy-conversion",
            difficulty: "medium"
          },
          {
            id: "q-js-eng-2",
            type: "multiple_choice",
            questionText: "What energy transformation takes place in a hydroelectric power station when water flows through a turbine?",
            options: [
              "Gravitational Potential → Kinetic → Electrical",
              "Chemical → Nuclear → Thermal",
              "Electrical → Potential → Sound",
              "Thermal → Chemical → Light"
            ],
            correctAnswer: "Gravitational Potential → Kinetic → Electrical",
            explanation: "Water stored high up has gravitational potential energy, which converts to kinetic energy as it rushes downward, turning the turbine generator to produce electrical energy.",
            hintLadder: [
              "Water stored at height has potential energy.",
              "Moving water turns turbines (kinetic) which spin electrical generators."
            ],
            misconceptionAlerts: [
              { trigger: "Chemical → Nuclear → Thermal", note: "Water in a dam is not undergoing chemical burning or nuclear fission." }
            ],
            skillId: "skill-js-energy-conversion",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- ICT / Computing: Junior Secondary ---
  {
    id: "unit-jss-ict-architecture",
    subjectId: "tech_compsci",
    level: "junior_secondary",
    title: "Computer Architecture, Binary Logic & Algorithms",
    code: "CSC-JS-01",
    description: "Explore the Von Neumann architecture (CPU, RAM, Storage), binary number conversions, and flowchart algorithms.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-js-binary-logic",
        unitId: "unit-jss-ict-architecture",
        title: "Binary to Denary Conversion and Algorithmic Flowcharts",
        code: "SKL-JS-BIN",
        summary: "Convert 8-bit binary numbers to decimal and read algorithmic decision flowchart symbols.",
        objectives: [
          "Convert unsigned binary bytes (base 2) into decimal (base 10)",
          "Identify CPU components: ALU (Arithmetic Logic Unit), Control Unit, and Registers",
          "Construct and trace flowcharts using standard symbols: Terminator, Process, Decision, Input/Output"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-js-binary",
          title: "The Language of Computers: Bits, Bytes, and Binary Positional Values",
          hookAndIntuition: "Inside every smartphone and supercomputer are billions of tiny switches called transistors. Each switch is either OFF (0) or ON (1). How can numbers and words be made from just 0 and 1?",
          conceptualExplanation: "In our regular base-10 system, column values are powers of 10: 1, 10, 100, 1000. In binary (base-2), column values are powers of 2 from right to left: 1, 2, 4, 8, 16, 32, 64, 128. To convert a binary byte to decimal, add up the column values where there is a 1.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Bit", definition: "A single binary digit: 0 or 1.", practicalExample: "The smallest unit of data." },
            { termOrSymbol: "Byte", definition: "A sequence of 8 bits.", practicalExample: "1 byte can store values 0 to 255." },
            { termOrSymbol: "Binary Positional Values", definition: "128, 64, 32, 16, 8, 4, 2, 1" }
          ],
          workedExamples: [
            {
              title: "Converting 00001101 to Decimal",
              problemStatement: "Convert binary 00001101 into decimal (denary).",
              steps: [
                { stepNumber: 1, instruction: "Align bits under powers of 2", reasoning: "Bits are: (8=1), (4=1), (2=0), (1=1)" },
                { stepNumber: 2, instruction: "Sum active weights", reasoning: "8 + 4 + 1 = 13" }
              ],
              takeawayRule: "Only add the place values where the bit is set to 1."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Reading binary from left to right instead of matching places from right (units = 2^0 = 1).", whyItIsWrong: "The rightmost bit is always the 1s column.", correctCorrection: "Write column headers 128, 64, 32, 16, 8, 4, 2, 1 above your bits." }
          ],
          guidedPracticePrompt: "Convert binary 00000111 to decimal. What is 4 + 2 + 1?",
          summaryRecap: "Binary is base-2 positional notation: every 1 activates a power of 2."
        },
        questions: [
          {
            id: "q-js-bin-1",
            type: "multiple_choice",
            questionText: "Convert the binary number 00010101 into decimal (base 10):",
            options: ["21", "25", "19", "42"],
            correctAnswer: "21",
            explanation: "The active place values from right to left are: 16 (bit 4), 4 (bit 2), and 1 (bit 0). 16 + 4 + 1 = 21.",
            hintLadder: [
              "Place values for 8 bits: 128, 64, 32, 16, 8, 4, 2, 1.",
              "Look at where the 1s are: 16 + 4 + 1 = 21."
            ],
            misconceptionAlerts: [
              { trigger: "25", note: "Check your addition: 16 + 4 + 1 = 21, not 25." }
            ],
            skillId: "skill-js-binary-logic",
            difficulty: "medium"
          },
          {
            id: "q-js-bin-2",
            type: "multiple_choice",
            questionText: "In a computer flowchart diagram, what geometric shape is used to represent a DECISION point (e.g. IF / ELSE condition)?",
            options: ["Diamond", "Rectangle", "Oval / Pill", "Parallelogram"],
            correctAnswer: "Diamond",
            explanation: "A diamond shape denotes a conditional branch or decision with multiple exit paths (e.g. Yes/No or True/False). Rectangles represent processes, and parallelograms represent Input/Output.",
            hintLadder: [
              "An oval is a terminator (Start/End).",
              "A diamond branches out in two directions based on a question."
            ],
            misconceptionAlerts: [
              { trigger: "Rectangle", note: "A rectangle represents an operational process or calculation, not a decision." }
            ],
            skillId: "skill-js-binary-logic",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- Basic Technology: Junior Secondary ---
  {
    id: "unit-jss-basic-tech-materials",
    subjectId: "tech_compsci",
    level: "junior_secondary",
    title: "Workshop Safety, Materials Technology & Tool Mechanics",
    code: "TEC-JS-01",
    description: "Master workshop safety protocols, personal protective equipment (PPE), classification of woods (hardwood/softwood), metals (ferrous/non-ferrous), plastics, and basic hand tools.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-jss-materials-safety",
        unitId: "unit-jss-basic-tech-materials",
        title: "Materials Classification, Workshop Safety & PPE Regulations",
        code: "SKL-JS-MAT",
        summary: "Classify technological materials (metals, woods, plastics, ceramics), identify causes of workshop accidents, and select appropriate safety equipment.",
        objectives: [
          "Differentiate between ferrous metals (contain iron, magnetic) and non-ferrous metals (no iron, corrosion-resistant)",
          "Distinguish hardwoods (broad-leaved deciduous, e.g. Iroko, Mahogany) from softwoods (coniferous needle-leaved, e.g. Pine, Cedar)",
          "Identify common workshop hazards and enforce PPE rules (goggles, safety boots, aprons)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-jss-materials-safety",
          title: "Building the Physical World: Materials Science and Workshop Protocols",
          hookAndIntuition: "Why do airplane bodies use aluminum instead of heavy steel? Why are cooking pot handles made of thermosetting plastic rather than metal?",
          conceptualExplanation: "Engineering design starts with choosing the right material. Metals are split into Ferrous (contain iron, prone to rust, attracted to magnets) and Non-Ferrous (copper, aluminum, brass, which do not rust). Woods are divided into Hardwoods (dense trees with broad leaves like Teak and Mahogany) and Softwoods (evergreen needle trees like Pine). Safety in the workshop requires PPE (Personal Protective Equipment) and strict adherence to tool protocols.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Ferrous Metals", definition: "Metals containing iron as their main constituent; generally magnetic and prone to rust.", practicalExample: "Mild steel, cast iron, wrought iron" },
            { termOrSymbol: "Non-Ferrous Metals", definition: "Metals that do not contain iron; non-magnetic and highly resistant to corrosion.", practicalExample: "Aluminum, copper, zinc, brass" },
            { termOrSymbol: "Hardwood", definition: "Dense timber derived from broad-leaved deciduous angiosperm trees.", practicalExample: "Iroko, Mahogany, Obeche, Oak" },
            { termOrSymbol: "PPE", definition: "Personal Protective Equipment used to prevent workshop injuries.", practicalExample: "Goggles, ear defenders, steel-toe boots" }
          ],
          workedExamples: [
            {
              title: "Selecting Materials for an Outdoor Gate",
              problemStatement: "An architect needs a metal for a coastal estate gate that resists ocean saltwater corrosion. Should they choose mild steel or aluminum?",
              steps: [
                { stepNumber: 1, instruction: "Identify corrosion mechanisms", reasoning: "Mild steel contains iron, which rapidly oxidizes into rust (hydrated iron oxide) in moist, salty air." },
                { stepNumber: 2, instruction: "Examine non-ferrous properties", reasoning: "Aluminum forms an impervious oxide layer that naturally seals against saltwater corrosion." },
                { stepNumber: 3, instruction: "Conclude", reasoning: "Aluminum (or galvanized/stainless alloy) is the superior engineering choice." }
              ],
              takeawayRule: "Non-ferrous metals are selected whenever atmospheric corrosion resistance is paramount."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Assuming 'hardwoods' are always physically harder than 'softwoods'.", whyItIsWrong: "Hardwood/softwood is a botanical distinction based on seed structure and foliage, not density (Balsa wood is botanically a hardwood yet extremely soft!).", correctCorrection: "Hardwoods come from broad-leaved flowering trees; softwoods come from cone-bearing gymnosperms." }
          ],
          guidedPracticePrompt: "Which metal would you select to conduct electricity in household wiring: copper or cast iron?",
          summaryRecap: "Material properties determine engineering suitability; workshop safety protocols prevent preventable industrial injuries."
        },
        questions: [
          {
            id: "q-jss-mat-1",
            type: "multiple_choice",
            questionText: "Which of the following metals is classified as a NON-FERROUS metal?",
            options: ["Copper", "Cast iron", "Mild steel", "Wrought iron"],
            correctAnswer: "Copper",
            explanation: "Copper contains no iron and is therefore a non-ferrous metal. Cast iron, mild steel, and wrought iron all contain iron as their primary constituent.",
            hintLadder: [
              "Remember that 'ferrous' comes from the Latin 'ferrum', meaning iron.",
              "Look for the metal that does NOT contain iron."
            ],
            misconceptionAlerts: [
              { trigger: "Mild steel", note: "Mild steel is an alloy composed mostly of iron and a small percentage of carbon; it is a ferrous metal." }
            ],
            skillId: "skill-jss-materials-safety",
            difficulty: "easy"
          },
          {
            id: "q-jss-mat-2",
            type: "multiple_choice",
            questionText: "Which indigenous West African tree species produces dense, highly durable HARDWOOD used extensively in structural building and fine furniture?",
            options: ["Iroko (Chlorophora excelsa)", "Pine (Pinus)", "Fir (Abies)", "Spruce (Picea)"],
            correctAnswer: "Iroko (Chlorophora excelsa)",
            explanation: "Iroko is a renowned indigenous African deciduous hardwood tree prized for termite resistance and structural strength. Pine, fir, and spruce are temperate softwoods.",
            hintLadder: [
              "Think about native tropical broad-leaved trees known for timber durability in Nigeria and West Africa.",
              "Pine, fir, and spruce are coniferous needle-leaved softwoods."
            ],
            misconceptionAlerts: [
              { trigger: "Pine (Pinus)", note: "Pine is a softwood with needle leaves and cones, commonly imported from temperate climates." }
            ],
            skillId: "skill-jss-materials-safety",
            difficulty: "medium"
          },
          {
            id: "q-jss-mat-3",
            type: "multiple_choice",
            questionText: "When operating a bench grinding machine or power drill in a school workshop, what is the most critical item of PPE required to protect the eyes from flying metal swarf?",
            options: [
              "Industrial safety goggles / face shield",
              "Leather apron",
              "Rubber gloves",
              "Woolen scarf"
            ],
            correctAnswer: "Industrial safety goggles / face shield",
            explanation: "Safety goggles and polycarbonate face shields prevent high-velocity metal chips (swarf) and abrasive sparks from causing permanent eye injuries.",
            hintLadder: [
              "The question asks specifically about protecting the EYES from high-speed debris."
            ],
            misconceptionAlerts: [
              { trigger: "Leather apron", note: "An apron protects the chest and clothing, but goggles protect the eyes." }
            ],
            skillId: "skill-jss-materials-safety",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- Basic Science: Junior Secondary ---
  {
    id: "unit-jss-basic-science-cells",
    subjectId: "sci_biology",
    level: "junior_secondary",
    title: "Cell Organization, Living Microorganisms & Disease Vectors",
    code: "SCI-JS-02",
    description: "Explore the structural hierarchy of living organisms from cells to tissues, organs, and systems; compare plant vs animal cells, and investigate microscopic pathogens and sanitation.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-jss-cell-organization",
        unitId: "unit-jss-basic-science-cells",
        title: "Cellular Structure, Organelle Functions & Microbial Vectors",
        code: "SKL-JS-CEL",
        summary: "Identify cell organelles (nucleus, cell wall, cell membrane, cytoplasm, chloroplasts, vacuoles), compare plant and animal structures, and track disease transmission vectors.",
        objectives: [
          "Define the cell as the fundamental structural and functional unit of all living organisms",
          "Identify three organelles found exclusively in plant cells (cellulose cell wall, chloroplasts, large central vacuole)",
          "Describe how microbial disease vectors (e.g. female Anopheles mosquito for malaria, houseflies for cholera) spread pathogens"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-jss-cell-organization",
          title: "The Architecture of Life: Inside the Living Cell and Microbial World",
          hookAndIntuition: "If you zoom in on a leaf or your own skin under a powerful light microscope, what tiny building blocks do you see? Why does a plant stand upright without bones?",
          conceptualExplanation: "All living things are composed of microscopic units called cells. Both plant and animal cells contain a Nucleus (control center with DNA), Cytoplasm (gel where chemical reactions occur), Mitochondria (powerhouses creating energy), and a Cell Membrane (selectively permeable barrier). Plant cells have three unique additions: a rigid Cellulose Cell Wall for structural support, Chloroplasts for photosynthesis, and a large Central Vacuole for maintaining turgor pressure.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Cell Membrane", definition: "A flexible outer boundary controlling which substances enter and exit the cell." },
            { termOrSymbol: "Cell Wall", definition: "A tough outer layer made of cellulose found only in plant cells and algae." },
            { termOrSymbol: "Chloroplast", definition: "An organelle containing green chlorophyll pigments that harness sunlight for photosynthesis." },
            { termOrSymbol: "Vector", definition: "An organism (like a mosquito or fly) that carries and transmits an infectious pathogen into another living organism." }
          ],
          workedExamples: [
            {
              title: "Comparing Plant and Animal Cells",
              problemStatement: "A student observes a mystery cell under a microscope and spots green disc-shaped organelles and a rigid outer box. Is this an animal cell or a plant cell?",
              steps: [
                { stepNumber: 1, instruction: "Analyze visible features", reasoning: "Green disc-shaped organelles indicate chloroplasts containing chlorophyll." },
                { stepNumber: 2, instruction: "Examine outer boundary", reasoning: "A rigid rectangular outer layer indicates a cellulose cell wall." },
                { stepNumber: 3, instruction: "Conclude", reasoning: "Animal cells never possess chloroplasts or cellulose cell walls; therefore, this is definitively a plant cell." }
              ],
              takeawayRule: "Chloroplasts and cellulose cell walls are diagnostic markers of plant cells."
            }
          ],
          commonMisconceptionsAndTraps: [
            { misconception: "Believing that mosquitoes themselves 'cause' malaria.", whyItIsWrong: "The female Anopheles mosquito is merely the vector (carrier); the actual cause is the Plasmodium protozoan parasite injected through its saliva.", correctCorrection: "The pathogen causes the disease; the vector transmits it." }
          ],
          guidedPracticePrompt: "What is the function of the nucleus in a living cell? Is it for respiration or controlling cell activities?",
          summaryRecap: "Cells are the foundational building blocks of life; plant cells possess walls and chloroplasts, and sanitation halts microbial transmission."
        },
        questions: [
          {
            id: "q-jss-cel-1",
            type: "multiple_choice",
            questionText: "Which of the following structures is found in a PLANT cell but NEVER in a human cheek cell?",
            options: [
              "Cellulose cell wall",
              "Cell membrane",
              "Cytoplasm",
              "Nucleus"
            ],
            correctAnswer: "Cellulose cell wall",
            explanation: "Cellulose cell walls (along with chloroplasts and large permanent vacuoles) are present in plant cells, while animal cells only have a flexible cell membrane.",
            hintLadder: [
              "Both plant and animal cells have a nucleus, cytoplasm, and cell membrane.",
              "Think about the rigid structure that plants need because they lack skeletal bones."
            ],
            misconceptionAlerts: [
              { trigger: "Cell membrane", note: "Both plant and animal cells possess cell membranes." }
            ],
            skillId: "skill-jss-cell-organization",
            difficulty: "easy"
          },
          {
            id: "q-jss-cel-2",
            type: "multiple_choice",
            questionText: "What is the biological function of the CHLOROPLAST inside green plant leaves?",
            options: [
              "Trapping sunlight energy to synthesize glucose via photosynthesis",
              "Pumping blood and oxygen throughout the stem",
              "Breaking down waste products through fermentation",
              "Storing genetic code for reproduction"
            ],
            correctAnswer: "Trapping sunlight energy to synthesize glucose via photosynthesis",
            explanation: "Chloroplasts contain chlorophyll pigments that absorb solar radiation to drive the chemical conversion of water and carbon dioxide into glucose and oxygen.",
            hintLadder: [
              "Recall why leaves are green and what leaves produce using sunlight."
            ],
            misconceptionAlerts: [
              { trigger: "Storing genetic code for reproduction", note: "The nucleus stores the genetic DNA code, not the chloroplast." }
            ],
            skillId: "skill-jss-cell-organization",
            difficulty: "easy"
          },
          {
            id: "q-jss-cel-3",
            type: "multiple_choice",
            questionText: "In public health and community sanitation, what organism serves as the biological vector responsible for transmitting the Plasmodium parasite that causes malaria?",
            options: [
              "Female Anopheles mosquito",
              "Housefly (Musca domestica)",
              "Tsetse fly (Glossina)",
              "Blackfly (Simulium)"
            ],
            correctAnswer: "Female Anopheles mosquito",
            explanation: "The female Anopheles mosquito requires a blood meal to develop eggs and in the process inoculates Plasmodium sporozoites into human capillaries.",
            hintLadder: [
              "Tsetse flies transmit sleeping sickness (trypanosomiasis); houseflies carry cholera bacteria on their feet.",
              "Malaria is specifically transmitted by a female mosquito species."
            ],
            misconceptionAlerts: [
              { trigger: "Tsetse fly (Glossina)", note: "Tsetse flies transmit African trypanosomiasis (sleeping sickness), not malaria." }
            ],
            skillId: "skill-jss-cell-organization",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

// ============================================================================
// 4. UNIVERSITY PREP — ADVANCED STEM & ICT
// ============================================================================

export const UNIVERSITY_PREP_ADVANCED_UNITS: Unit[] = [
  // --- English: University Prep ---
  {
    id: "unit-uni-eng-academic-rhetoric",
    subjectId: "lang_english",
    level: "university_prep",
    title: "Academic Discourse, Rhetoric & Critical Synthesis",
    code: "ENG-UP-01",
    description: "Master scholarly literature reviews, dialectical synthesis, APA/MLA bibliographic citation, and fallacy deconstruction.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-uni-rhetoric-synthesis",
        unitId: "unit-uni-eng-academic-rhetoric",
        title: "Scholarly Synthesis, Fallacy Analysis & Formal Thesis Defense",
        code: "SKL-UNI-SYN",
        summary: "Evaluate research arguments, detect formal/informal logical fallacies, and synthesize opposing viewpoints into dialectical arguments.",
        objectives: [
          "Differentiate deductive validity from inductive cogency",
          "Identify classical fallacies: Ad Hominem, Straw Man, Post Hoc Ergo Propter Hoc, Begging the Question",
          "Synthesize empirical studies into cohesive literature synthesis paragraphs"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-uni-syn-1",
            type: "multiple_choice",
            questionText: "A debater asserts: 'Because industrialization preceded global temperature rise, industrial carbon emissions must be the sole cause of atmospheric warming.' Which logical fallacy is committed if other intervening variables are ignored?",
            options: [
              "Post hoc ergo propter hoc (False cause)",
              "Argumentum ad hominem",
              "Straw man fallacy",
              "Red herring"
            ],
            correctAnswer: "Post hoc ergo propter hoc (False cause)",
            explanation: "'Post hoc ergo propter hoc' ('after this, therefore because of this') improperly assumes that because event B followed event A, event A must be the causative factor without accounting for confounding mechanisms.",
            hintLadder: [
              "Look at the temporal argument: 'A happened before B, therefore A caused B.'",
              "This is the classic correlation vs causation fallacy."
            ],
            misconceptionAlerts: [
              { trigger: "Argumentum ad hominem", note: "Ad hominem attacks the character of the speaker, which did not occur here." }
            ],
            skillId: "skill-uni-rhetoric-synthesis",
            difficulty: "hard"
          },
          {
            id: "q-uni-syn-2",
            type: "multiple_choice",
            questionText: "In empirical dialectical synthesis, when two landmark studies yield contradictory findings on learner retention, which scholarly methodology is most rigorous?",
            options: [
              "Conduct a systematic meta-analysis evaluating sample variance, effect sizes, and moderating variables across both studies.",
              "Accept the older study's conclusions as foundational and dismiss the newer study as an anomaly.",
              "Average the numerical percentages between both studies and report the arithmetic midpoint as ground truth.",
              "Discard both studies entirely and rely exclusively on anecdotal classroom teacher impressions."
            ],
            correctAnswer: "Conduct a systematic meta-analysis evaluating sample variance, effect sizes, and moderating variables across both studies.",
            explanation: "Scholarly synthesis demands reconciling apparent divergence by scrutinizing methodology, statistical power, cohort demographics, and confounding variables through structured meta-analytic synthesis.",
            hintLadder: [
              "Consider how academic researchers resolve conflicting empirical literature.",
              "Divergence usually stems from differences in methodology, dosage, or sample population.",
              "Systematic meta-analysis with effect size evaluation is the gold standard for dialectical synthesis."
            ],
            misconceptionAlerts: [
              { trigger: "Average the numerical percentages between both studies and report the arithmetic midpoint as ground truth.", note: "Averaging incompatible datasets without weighting by sample size and variance is mathematically invalid." }
            ],
            skillId: "skill-uni-rhetoric-synthesis",
            difficulty: "hard"
          },
          {
            id: "q-uni-syn-3",
            type: "multiple_choice",
            questionText: "Which bibliographic citation pattern conforms strictly to APA 7th edition guidelines for an authored academic journal article with a DOI?",
            options: [
              "Author, A. A. (2023). Title of article. Title of Periodical, 34(2), 112–125. https://doi.org/10.xxxx/xxxx",
              "Author, A. A. 'Title of article.' Title of Periodical (2023): pp. 112-125, Web.",
              "Author, A. A., 2023, Title of article, in: Title of Periodical, Vol 34, No 2, 112-125.",
              "(2023) Author, A. A. Title of Periodical: Title of Article. DOI: 10.xxxx/xxxx."
            ],
            correctAnswer: "Author, A. A. (2023). Title of article. Title of Periodical, 34(2), 112–125. https://doi.org/10.xxxx/xxxx",
            explanation: "APA 7th requires: Author, A. A. (Year). Article title with sentence-case. Journal Title in Italics, Volume(Issue in parens), page range. https://doi.org/...",
            hintLadder: [
              "Note the placement of the publication year in parentheses immediately following author surname.",
              "Journal title and volume number are italicized, followed by issue in parentheses.",
              "DOIs must be formatted as active https://doi.org/... hyperlinks."
            ],
            misconceptionAlerts: [
              { trigger: "Author, A. A. 'Title of article.' Title of Periodical (2023): pp. 112-125, Web.", note: "This format resembles MLA 7th/8th edition style with quotation marks and 'Web', not APA 7th." }
            ],
            skillId: "skill-uni-rhetoric-synthesis",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // --- ICT: University Prep ---
  {
    id: "unit-uni-ict-dsa",
    subjectId: "tech_compsci",
    level: "university_prep",
    title: "Data Structures, Algorithmic Complexity & Systems Design",
    code: "CSC-UP-01",
    description: "Rigorous study of asymptotic Big-O notation, tree and graph traversals (BFS/DFS), dynamic programming, and hash collisions.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-uni-dsa-complexity",
        unitId: "unit-uni-ict-dsa",
        title: "Asymptotic Analysis (Big-O) and Binary Search Trees",
        code: "SKL-UNI-DSA",
        summary: "Analyze algorithmic time/space bounds and evaluate binary search tree balancing.",
        objectives: [
          "Determine worst-case time complexity for comparison sorts (MergeSort, QuickSort)",
          "Analyze insertion, deletion, and search bounds on balanced BSTs (AVL, Red-Black: O(log n))",
          "Differentiate between polynomial (P) and non-deterministic polynomial (NP) problem classes"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-uni-dsa-1",
            type: "multiple_choice",
            questionText: "What is the tight worst-case time complexity of MergeSort on an array of n elements?",
            options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
            correctAnswer: "O(n log n)",
            explanation: "MergeSort divides the array in half at each recursion level (log n levels) and performs O(n) work merging subarrays at each level, guaranteeing O(n log n) even in the worst case.",
            hintLadder: [
              "Recall the recurrence relation: T(n) = 2T(n/2) + O(n).",
              "By the Master Theorem, this evaluates to O(n log n)."
            ],
            misconceptionAlerts: [
              { trigger: "O(n²)", note: "O(n²) is the worst-case for unoptimized QuickSort with poor pivot selection, not MergeSort." }
            ],
            skillId: "skill-uni-dsa-complexity",
            difficulty: "hard"
          },
          {
            id: "q-uni-dsa-2",
            type: "multiple_choice",
            questionText: "What is the worst-case time complexity of searching for a key in an UNBALANCED Binary Search Tree (BST) containing n keys?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
            correctAnswer: "O(n)",
            explanation: "When keys are inserted in sorted order, an unbalanced BST degenerates into a linked list of height n, yielding an O(n) linear search complexity.",
            hintLadder: [
              "Consider what happens when you insert numbers 1, 2, 3, 4, 5 in that exact order into an un-rotated BST.",
              "Every node will only have a right child, forming a single chain.",
              "Traversing a single chain of n elements takes O(n) operations."
            ],
            misconceptionAlerts: [
              { trigger: "O(log n)", note: "O(log n) applies strictly to BALANCED search trees (like AVL or Red-Black trees), not degenerate unbalanced BSTs." }
            ],
            skillId: "skill-uni-dsa-complexity",
            difficulty: "medium"
          },
          {
            id: "q-uni-dsa-3",
            type: "multiple_choice",
            questionText: "Which hash collision resolution strategy guarantees that all elements are stored directly inside the hash table array without allocating external linked lists?",
            options: [
              "Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)",
              "Separate Chaining",
              "Bucket Chaining with Red-Black Trees",
              "External B-Tree Indexing"
            ],
            correctAnswer: "Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)",
            explanation: "Open Addressing stores all keys directly within the table slots by probing successive alternate positions when a collision occurs, maintaining zero external pointer overhead.",
            hintLadder: [
              "Separate chaining allocates linked list nodes outside the primary array.",
              "In contrast, open addressing probes alternate slots WITHIN the array itself.",
              "Select 'Open Addressing'."
            ],
            misconceptionAlerts: [
              { trigger: "Separate Chaining", note: "Separate chaining resolves collisions by allocating linked list nodes outside the primary array table." }
            ],
            skillId: "skill-uni-dsa-complexity",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

// ============================================================================
// 5. EXAM PREP (Targeted Examination Readiness / Revision)
// ============================================================================

export const EXAM_PREP_UNITS: Unit[] = [
  // --- Mathematics: Exam Prep ---
  {
    id: "unit-exam-math-wassce-jamb",
    subjectId: "math_core",
    level: "exam_prep",
    title: "WASSCE & JAMB High-Yield General Mathematics Revision",
    code: "MTH-EP-01",
    description: "Intensive past question analysis, speed drills, and section B problem formulation across algebra, circle geometry, and statistics.",
    order: 1,
    category: "exam_focus",
    skills: [
      {
        id: "skill-ep-math-drills",
        unitId: "unit-exam-math-wassce-jamb",
        title: "High-Yield WAEC Paper 2 & JAMB CBT Speed Tactics",
        code: "SKL-EP-MTH",
        summary: "Execute multi-step questions under strict time constraints, avoiding sign traps and calculation bottlenecks.",
        objectives: [
          "Apply quadratic formula and simultaneous linear-quadratic equations rapidly",
          "Solve 3-figure bearing problems with cosine/sine rules under timed conditions",
          "Analyze grouped frequency distributions (mean, median class, modal class)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ep-mth-1",
            type: "multiple_choice",
            questionText: "If 2^(2x + 1) - 9(2^x) + 4 = 0, find the solution set for x:",
            mathExpression: "2^{2x+1} - 9(2^x) + 4 = 0",
            options: ["x = -1 or x = 2", "x = 1 or x = -2", "x = 0 or x = 4", "x = 2 or x = 4"],
            correctAnswer: "x = -1 or x = 2",
            explanation: "Let y = 2^x. Then 2^(2x+1) = 2 · (2^x)^2 = 2y^2. The equation becomes 2y^2 - 9y + 4 = 0. Factor: (2y - 1)(y - 4) = 0 => y = 1/2 or y = 4. Since 2^x = 1/2 = 2^(-1), x = -1. Since 2^x = 4 = 2^2, x = 2.",
            hintLadder: [
              "Rewrite 2^(2x + 1) as 2 · (2^x)^2.",
              "Substitute y = 2^x to form a quadratic in y: 2y² - 9y + 4 = 0.",
              "Solve for y, then back-substitute 2^x = y."
            ],
            misconceptionAlerts: [
              { trigger: "x = 1 or x = -2", note: "Check your indices: 2^x = 1/2 gives x = -1, not +1." }
            ],
            skillId: "skill-ep-math-drills",
            difficulty: "hard"
          },
          {
            id: "q-ep-mth-2",
            type: "multiple_choice",
            questionText: "A ship sails 12 km on a bearing of 060° from port P to point Q, and then sails 9 km on a bearing of 150° from Q to point R. Find the distance PR in km:",
            options: ["15 km", "21 km", "10.5 km", "18 km"],
            correctAnswer: "15 km",
            explanation: "The interior angle at Q: back-bearing of PQ is 60° + 180° = 240°. Bearing of QR is 150°. The angle ∠PQR = 240° - 150° = 90°. In right triangle PQR, PR² = PQ² + QR² = 12² + 9² = 144 + 81 = 225 => PR = 15 km.",
            hintLadder: [
              "Calculate the interior angle at Q using back-bearing.",
              "Notice that 240° - 150° = 90°, making triangle PQR a right-angled triangle.",
              "Apply Pythagoras theorem: √(12² + 9²)."
            ],
            misconceptionAlerts: [
              { trigger: "21 km", note: "You simply added 12 + 9. Displacement requires vector triangle calculation." }
            ],
            skillId: "skill-ep-math-drills",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // --- English: Exam Prep ---
  {
    id: "unit-exam-eng-wassce-jamb",
    subjectId: "lang_english",
    level: "exam_prep",
    title: "WASSCE & JAMB English Lexis, Structure & Comprehension",
    code: "ENG-EP-01",
    description: "Master antonyms/synonyms in context, grammatical concord, sentence completion, and oral English vowel/consonant contrast.",
    order: 1,
    category: "exam_focus",
    skills: [
      {
        id: "skill-ep-eng-concord-lexis",
        unitId: "unit-exam-eng-wassce-jamb",
        title: "Standardized Grammatical Concord & Lexical Antonyms",
        code: "SKL-EP-ENG",
        summary: "Identify nearest in meaning, antonyms, and resolve tricky concord (neither/nor, along with, collective nouns).",
        objectives: [
          "Apply subject-verb agreement rules when parenthetical expressions ('as well as', 'together with') intervene",
          "Identify words nearest in meaning and opposite in meaning in contextual passages",
          "Distinguish vowel sounds in oral English (e.g., /i:/ vs /ɪ/, /ʌ/ vs /æ/)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ep-eng-1",
            type: "multiple_choice",
            questionText: "Choose the option that correctly completes the sentence: 'The principal, accompanied by all the departmental heads, ________ arriving for the symposium.'",
            options: ["is", "are", "were", "have been"],
            correctAnswer: "is",
            explanation: "When a subject is followed by phrases such as 'accompanied by', 'as well as', or 'together with', the parenthetical phrase does not change the number of the subject. The subject is singular ('The principal'), requiring the singular verb 'is'.",
            hintLadder: [
              "Identify the true grammatical subject: 'The principal'.",
              "Phrases enclosed between commas like 'accompanied by...' do not affect subject number."
            ],
            misconceptionAlerts: [
              { trigger: "are", note: "Do not be distracted by the plural noun 'heads'. The grammatical subject is 'The principal'." }
            ],
            skillId: "skill-ep-eng-concord-lexis",
            difficulty: "medium"
          },
          {
            id: "q-ep-eng-2",
            type: "multiple_choice",
            questionText: "Choose the option that is most nearly OPPOSITE IN MEANING (antonym) to the underlined word: 'The senator made an ASTUTE observation during the heated budgetary debate.'",
            options: ["foolish", "shrewd", "perspicacious", "insightful"],
            correctAnswer: "foolish",
            explanation: "'Astute' means showing sharp powers of judgment and clever discernment. The antonym is 'foolish' or 'naive'. ('Shrewd' and 'perspicacious' are synonyms).",
            hintLadder: [
              "Determine the meaning of 'astute': sharp, mentally keen, perceptive.",
              "The question asks for the OPPOSITE in meaning, not the synonym.",
              "The direct opposite of sharp/clever is foolish."
            ],
            misconceptionAlerts: [
              { trigger: "shrewd", note: "'Shrewd' is a synonym of astute, but the question asks for the OPPOSITE (antonym)!" }
            ],
            skillId: "skill-ep-eng-concord-lexis",
            difficulty: "medium"
          },
          {
            id: "q-ep-eng-3",
            type: "multiple_choice",
            questionText: "Select the option that correctly completes the sentence: 'Neither the class monitor nor the prefects ________ willing to sign the requisition form.'",
            options: ["were", "was", "is", "has been"],
            correctAnswer: "were",
            explanation: "In 'neither... nor...' constructions, the verb agrees with the closer subject (the rule of proximity). The closer subject is plural ('the prefects'), requiring the plural verb 'were'.",
            hintLadder: [
              "Identify the conjunction: 'Neither... nor...'.",
              "Apply the rule of proximity: the verb must agree with the subject immediately preceding it.",
              "'Prefects' is plural, so use a plural verb ('were')."
            ],
            misconceptionAlerts: [
              { trigger: "was", note: "By the proximity rule in neither/nor pairs, the verb matches 'prefects' (plural), not 'class monitor' (singular)." }
            ],
            skillId: "skill-ep-eng-concord-lexis",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // --- STEM: Exam Prep ---
  {
    id: "unit-exam-stem-integrated",
    subjectId: "sci_physics",
    level: "exam_prep",
    title: "Science & Engineering Examination Mastery Drills",
    code: "SCI-EP-01",
    description: "CBT simulated questions, dimensional analysis, reaction stoichiometry, and pedigree genetics under timed pressure.",
    order: 1,
    category: "exam_focus",
    skills: [
      {
        id: "skill-ep-stem-cbt",
        unitId: "unit-exam-stem-integrated",
        title: "Science CBT High-Yield Problem Solving",
        code: "SKL-EP-SCI",
        summary: "Apply quantitative science formulas rapidly and accurately in standardized exams.",
        objectives: [
          "Balance redox and acid-base equations under 60-second time budgets",
          "Calculate electrical circuit equivalents (series/parallel resistances) and power dissipation",
          "Predict Mendelian dihybrid inheritance ratios (9:3:3:1)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ep-sci-1",
            type: "multiple_choice",
            questionText: "Three resistors of 6 Ω, 3 Ω, and 2 Ω are connected in parallel across a 12 V battery. Calculate the total current drawn from the battery:",
            options: ["12 A", "6 A", "1 A", "24 A"],
            correctAnswer: "12 A",
            explanation: "Equivalent resistance 1/R = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1 Ω => R = 1 Ω. Total current I = V / R = 12 V / 1 Ω = 12 A.",
            hintLadder: [
              "Calculate equivalent parallel resistance: 1/Req = 1/6 + 1/3 + 1/2.",
              "1/Req = 6/6 = 1 Ω, so Req = 1 Ω.",
              "Use Ohm's Law: I = V / Req = 12 / 1 = 12 A."
            ],
            misconceptionAlerts: [
              { trigger: "1 A", note: "1 Ω is the resistance, but the question asks for current (I = V / R)!" }
            ],
            skillId: "skill-ep-stem-cbt",
            difficulty: "medium"
          },
          {
            id: "q-ep-sci-2",
            type: "multiple_choice",
            questionText: "In human genetics, the allele for normal blood clotting (X^H) is dominant over the allele for hemophilia (X^h). If a carrier mother (X^H X^h) marries a normal father (X^H Y), what percentage of their MALE offspring is predicted to have hemophilia?",
            options: ["50%", "25%", "0%", "100%"],
            correctAnswer: "50%",
            explanation: "Male offspring inherit Y from the father and either X^H or X^h from the mother with equal 50% probability. Therefore, 50% of sons (X^h Y) will express hemophilia.",
            hintLadder: [
              "Focus ONLY on the male offspring (those who receive the father's Y chromosome).",
              "The mother can give either X^H (normal son: X^H Y) or X^h (hemophilic son: X^h Y).",
              "Out of 2 possible male genotypes, 1 is hemophilic: 1/2 = 50%."
            ],
            misconceptionAlerts: [
              { trigger: "25%", note: "25% is the probability across ALL offspring combined (sons + daughters). The question specifies MALE offspring only (50%)." }
            ],
            skillId: "skill-ep-stem-cbt",
            difficulty: "medium"
          },
          {
            id: "q-ep-sci-3",
            type: "multiple_choice",
            questionText: "What volume of 0.50 M hydrochloric acid (HCl) is required to completely neutralize 25.0 cm³ of 0.20 M sodium hydroxide (NaOH) solution?",
            mathExpression: "\\frac{C_a V_a}{C_b V_b} = \\frac{n_a}{n_b} \\implies \\frac{(0.50) V_a}{(0.20)(25.0)} = \\frac{1}{1}",
            options: ["10.0 cm³", "62.5 cm³", "25.0 cm³", "5.0 cm³"],
            correctAnswer: "10.0 cm³",
            explanation: "Reaction: HCl + NaOH -> NaCl + H2O (1:1 mole ratio). Ca Va = Cb Vb => (0.50) Va = (0.20)(25.0) = 5.0 => Va = 5.0 / 0.50 = 10.0 cm³.",
            hintLadder: [
              "Write balanced equation: HCl + NaOH -> NaCl + H2O (n_a = 1, n_b = 1).",
              "Use volumetric formula: Ca Va / Cb Vb = 1 / 1.",
              "Va = (0.20 × 25.0) / 0.50 = 5.0 / 0.50 = 10.0 cm³."
            ],
            misconceptionAlerts: [
              { trigger: "62.5 cm³", note: "Did you invert the concentrations? (0.50 × 25) / 0.20 = 62.5, which is inverted." }
            ],
            skillId: "skill-ep-stem-cbt",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // --- ICT: Exam Prep ---
  {
    id: "unit-exam-ict-cbt",
    subjectId: "tech_compsci",
    level: "exam_prep",
    title: "Standardized Computer Studies & Digital Examination Drills",
    code: "CSC-EP-01",
    description: "Comprehensive WAEC and Cambridge IGCSE Computer Studies revision covering networking, databases, logic gates, and Python loops.",
    order: 1,
    category: "exam_focus",
    skills: [
      {
        id: "skill-ep-ict-cbt",
        unitId: "unit-exam-ict-cbt",
        title: "Logic Gates, SQL Querying & Networking Exam Readiness",
        code: "SKL-EP-CSC",
        summary: "Construct logic circuit truth tables and write standard SELECT queries.",
        objectives: [
          "Construct truth tables for composite gates (AND, OR, NOT, NAND, NOR, XOR)",
          "Interpret relational database schemas and write structured SELECT, WHERE, and ORDER BY queries",
          "Differentiate network topologies: Star, Mesh, Ring, and Bus"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ep-csc-1",
            type: "multiple_choice",
            questionText: "What is the output of a 2-input XOR gate when both input A = 1 and input B = 1?",
            options: ["0", "1", "Undefined", "-1"],
            correctAnswer: "0",
            explanation: "An XOR (Exclusive OR) gate outputs 1 if and only if exactly one input is 1. When both inputs are identical (1 and 1, or 0 and 0), the XOR gate outputs 0.",
            hintLadder: [
              "XOR stands for Exclusive OR.",
              "It is true only when the inputs are strictly different."
            ],
            misconceptionAlerts: [
              { trigger: "1", note: "An inclusive OR gate outputs 1 for (1, 1), but an Exclusive OR (XOR) outputs 0." }
            ],
            skillId: "skill-ep-ict-cbt",
            difficulty: "medium"
          },
          {
            id: "q-ep-csc-2",
            type: "multiple_choice",
            questionText: "Consider a relational database table 'Students' with columns (StudentID, FullName, Score, Grade). Which SQL query correctly retrieves all students with a Score above 75, sorted in descending order of Score?",
            options: [
              "SELECT * FROM Students WHERE Score > 75 ORDER BY Score DESC;",
              "SELECT ALL FROM Students IF Score > 75 SORT Score DESC;",
              "GET Students WHERE Score > 75 ORDERED BY Score DOWN;",
              "FILTER Students WITH Score > 75 ARRANGE DESC;"
            ],
            correctAnswer: "SELECT * FROM Students WHERE Score > 75 ORDER BY Score DESC;",
            explanation: "Standard ANSI SQL syntax uses SELECT * FROM table WHERE condition ORDER BY column DESC;",
            hintLadder: [
              "Standard SQL requires SELECT, FROM, WHERE, and ORDER BY clauses.",
              "Descending order keyword is DESC.",
              "Select the query with valid ANSI SQL syntax."
            ],
            misconceptionAlerts: [
              { trigger: "SELECT ALL FROM Students IF Score > 75 SORT Score DESC;", note: "'IF' and 'SORT' are not standard SQL keywords for filtering or ordering rows." }
            ],
            skillId: "skill-ep-ict-cbt",
            difficulty: "easy"
          },
          {
            id: "q-ep-csc-3",
            type: "multiple_choice",
            questionText: "Which network topology features a central hub or switch such that if a single client cable fails, all other network nodes continue communicating without disruption?",
            options: ["Star Topology", "Bus Topology", "Ring Topology", "Linear Daisy Chain"],
            correctAnswer: "Star Topology",
            explanation: "In a Star topology, all devices connect independently to a central switch. A cable break between one node and the central switch affects only that specific node.",
            hintLadder: [
              "In a Bus topology, a severed backbone cable halts all communication.",
              "In a Ring topology, a break in the ring halts the token circulation.",
              "A central switch with point-to-point lines to each node is a Star topology."
            ],
            misconceptionAlerts: [
              { trigger: "Bus Topology", note: "In a Bus topology, a single cable break disconnects the entire network segment." }
            ],
            skillId: "skill-ep-ict-cbt",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const ALL_LEVELS_CURRICULUM_UNITS: Unit[] = [
  ...PRIMARY_FOUNDATIONS_UNITS,
  ...UPPER_PRIMARY_STEM_ICT_UNITS,
  ...JUNIOR_SECONDARY_STEM_ICT_UNITS,
  ...UNIVERSITY_PREP_ADVANCED_UNITS,
  ...EXAM_PREP_UNITS
];
