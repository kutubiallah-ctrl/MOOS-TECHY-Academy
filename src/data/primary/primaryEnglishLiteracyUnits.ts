/**
 * MOOS TECHY ACADEMY — PRIMARY ENGLISH, LITERACY & LANGUAGES REPOSITORY
 * 
 * TASK ID: MOOS-CURRICULUM-003 (Batch 1: Primary Foundations)
 * Coverage: 8 Primary Language & Literacy Subjects:
 * - pri_spelling_vocabulary (Spelling Rules, Prefixes & Vocabulary)
 * - pri_reading_comprehension (Reading Comprehension & Inference)
 * - pri_creative_writing (Creative Writing & Narrative Storycraft)
 * - pri_handwriting_penmanship (Handwriting, Cursive & Penmanship)
 * - pri_verbal_reasoning (Verbal Reasoning & Word Logic)
 * - pri_oral_english (Oral English, Speech & Pronunciation)
 * - pri_french_basics (Primary French Language & Francophone Culture)
 * - pri_indigenous_language (Indigenous African Languages: Yoruba, Igbo, Hausa)
 * 
 * Standards: NERDC Primary English, Cambridge Primary English, NCEE Verbal Aptitude.
 */

import { Unit } from "../../types/curriculum";

export const PRIMARY_ENGLISH_LITERACY_UNITS: Unit[] = [
  // 1. pri_spelling_vocabulary
  {
    id: "unit-pri-spelling-vocab-01",
    subjectId: "pri_spelling_vocabulary",
    level: "primary_foundations",
    title: "Prefixes, Suffixes and Silent Letter Spelling Patterns",
    code: "ENG-SPL-01",
    description: "Morphological word building using un-, re-, dis-, -ful, -less, and mastering silent consonants (kn-, wr-, -mb).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-spl-prefixes-suffixes",
        unitId: "unit-pri-spelling-vocab-01",
        title: "Prefixes 'un-' and 're-' and Suffix '-ful'",
        code: "SKL-PRI-SPL-01",
        summary: "Identify root words and understand how affixes modify word meaning and spelling.",
        objectives: [
          "Recognize 'un-' as a prefix meaning 'not' or reversing an action",
          "Recognize 're-' as a prefix meaning 'again'",
          "Add suffix '-ful' meaning 'full of' with single 'l' spelling"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-spl-affixes",
          title: "Word Transformers: How Prefixes and Suffixes Change Meaning",
          hookAndIntuition: "Think of words like train cars. The root word is the engine (like 'happy'). If you attach 'un-' in front, it becomes 'unhappy'—meaning the complete opposite! If you attach 're-' to 'play', it becomes 'replay'—play it again!",
          conceptualExplanation: "A prefix is a group of letters added to the beginning of a root word to alter its meaning. 'Un-' means not (unhappy = not happy). 'Re-' means again (rewrite = write again). A suffix is added to the end of a word. '-ful' means full of (helpful = full of help). Notice that when adding '-ful', we write only one 'l'!",
          keyTermsAndFormulas: [
            { termOrSymbol: "Root Word", definition: "The base form of a word before any affixes are attached.", practicalExample: "'Kind' in unkindness." },
            { termOrSymbol: "Prefix", definition: "Letters added to the beginning of a root word.", practicalExample: "'Un-' in 'untie'." },
            { termOrSymbol: "Suffix", definition: "Letters added to the end of a root word.", practicalExample: "'-ful' in 'careful'." }
          ],
          workedExamples: [
            {
              title: "Spelling 'Helpful' and 'Careful'",
              problemStatement: "How do you spell the word that means 'full of care'?",
              steps: [
                { stepNumber: 1, instruction: "Identify root word", reasoning: "The base noun is 'care'." },
                { stepNumber: 2, instruction: "Identify suffix", reasoning: "The suffix for 'full of' is '-ful'." },
                { stepNumber: 3, instruction: "Apply spelling rule", reasoning: "Combine: care + ful = careful (single 'l', never 'carefull')." }
              ],
              takeawayRule: "The suffix '-ful' always ends with a single 'l'."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Spelling '-ful' with double 'l' like the word 'full'.",
              whyItIsWrong: "As an independent word, 'full' has two l's, but as a suffix, it always loses one 'l' (useful, playful).",
              correctCorrection: "Always use one 'l' for the suffix '-ful'."
            }
          ],
          guidedPracticePrompt: "Add the prefix 're-' to the word 'build' and explain what the new word means.",
          summaryRecap: "Prefixes go in front (un- = not, re- = again); suffixes go at the end (-ful = full of, single 'l')."
        },
        questions: [
          {
            id: "q-pri-spl-01",
            type: "multiple_choice",
            questionText: "Which word means 'to tell a story again'?",
            options: ["Retell", "Untell", "Tellful", "Distell"],
            correctAnswer: "Retell",
            explanation: "The prefix 're-' means again. 'Retell' means to tell again.",
            hintLadder: [
              "What prefix means 'again'?",
              "Think of words like 'replay' or 'rewrite'.",
              "'Re-' means again: retell."
            ],
            misconceptionAlerts: [
              { trigger: "Untell", note: "'Un-' means not or opposite, not 'again'." }
            ],
            skillId: "skill-pri-spl-prefixes-suffixes",
            difficulty: "easy"
          },
          {
            id: "q-pri-spl-02",
            type: "multiple_choice",
            questionText: "Choose the correct spelling of the word meaning 'full of peace':",
            options: ["Peaceful", "Peacefull", "Unpeace", "Peacful"],
            correctAnswer: "Peaceful",
            explanation: "The root word is 'peace' and the suffix '-ful' is spelled with only one 'l': peaceful.",
            hintLadder: [
              "Start with the root word 'peace'.",
              "Remember the rule for the suffix '-ful': how many l's?",
              "'-ful' has only one 'l': peaceful."
            ],
            misconceptionAlerts: [
              { trigger: "Peacefull", note: "Remember: as a suffix, '-ful' has only ONE 'l', not two." }
            ],
            skillId: "skill-pri-spl-prefixes-suffixes",
            difficulty: "easy"
          },
          {
            id: "q-pri-spl-03",
            type: "multiple_choice",
            questionText: "In the word 'knight', which consonant letter is silent when pronounced?",
            options: ["k", "n", "t", "g"],
            correctAnswer: "k",
            explanation: "In words beginning with 'kn-' (knight, knee, knife, know), the letter 'k' is completely silent.",
            hintLadder: [
              "Say the word 'knight' out loud: it sounds just like 'night'.",
              "Which initial letter do your lips and voice skip?",
              "The letter 'k' before 'n' is silent."
            ],
            misconceptionAlerts: [
              { trigger: "n", note: "The letter 'n' is clearly heard (sounds like 'nite'). The 'k' is silent." }
            ],
            skillId: "skill-pri-spl-prefixes-suffixes",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 2. pri_reading_comprehension
  {
    id: "unit-pri-reading-comp-01",
    subjectId: "pri_reading_comprehension",
    level: "primary_foundations",
    title: "Literal Retrieval, Textual Inference and Main Idea",
    code: "ENG-CMP-01",
    description: "Extract direct facts, decipher implied character motives, and summarize the central theme of narrative and informative passages.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-cmp-inference-main-idea",
        unitId: "unit-pri-reading-comp-01",
        title: "Finding the Main Idea and Making Inferences",
        code: "SKL-PRI-CMP-01",
        summary: "Differentiate between explicit details and unstated inferences by combining text clues with background knowledge.",
        objectives: [
          "Identify the central topic sentence or main idea of a short paragraph",
          "Distinguish literal facts directly stated from implied inferences",
          "Cite text evidence to defend answer choices"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-cmp-inference",
          title: "Reading Between the Lines: Clues and Inferences",
          hookAndIntuition: "If you walk into the living room and see your brother holding an umbrella dripping with water, wearing galoshes and a wet raincoat, did someone have to tell you it was raining outside? No! The clues tell the whole story. That is inference!",
          conceptualExplanation: "Literal questions ask for facts written right on the page (e.g. 'What color was the car?'). Inference questions ask you to figure out something the author did not say directly. Formula: Text Clues + What You Already Know = Inference. The main idea is the big umbrella under which all supporting details fit.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Main Idea", definition: "The primary point or central message the author wants the reader to understand.", practicalExample: "'Bees are essential for pollinating flowers.'" },
            { termOrSymbol: "Inference", definition: "A logical conclusion based on evidence and reasoning rather than explicit statements.", practicalExample: "Shivering + teeth chattering = the character is cold." },
            { termOrSymbol: "Text Evidence", definition: "Specific words or sentences quoted directly from the passage to prove an answer.", practicalExample: "'As stated in line 3...'" }
          ],
          workedExamples: [
            {
              title: "Analyzing a Short Fable",
              problemStatement: "Passage: 'Bello packed his backpack the night before, sharpened five pencils, and checked his alarm clock three times. He tossed and turned in bed, wondering who his new teacher would be.' Question: What is Bello feeling?",
              steps: [
                { stepNumber: 1, instruction: "Find clues in the text", reasoning: "'Checked alarm clock three times', 'tossed and turned', 'wondering who teacher would be'." },
                { stepNumber: 2, instruction: "Connect with real life", reasoning: "People toss and turn and double-check things when they are nervous and excited." },
                { stepNumber: 3, instruction: "Form conclusion", reasoning: "Bello is feeling anxious/excited about his first day of school." }
              ],
              takeawayRule: "Combine physical actions and thoughts mentioned in the story to deduce characters' underlying feelings."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Choosing a small interesting detail as the main idea.",
              whyItIsWrong: "A detail is just one supporting brick; the main idea is the entire wall.",
              correctCorrection: "Ask yourself: 'What is this whole paragraph mostly about?'"
            }
          ],
          guidedPracticePrompt: "Read a sentence about dry leaves falling and cold winds blowing. What season is it inferred to be?",
          summaryRecap: "Literal answers are visible in the text; inferences combine text clues with your knowledge to read between the lines."
        },
        questions: [
          {
            id: "q-pri-cmp-01",
            type: "multiple_choice",
            questionText: "Read the passage: 'Tayo took a bite of the yellow slice, squinted his eyes, and puckered his lips tightly.' What did Tayo most likely eat?",
            options: ["A sour lemon", "A sweet mango", "A hot pepper", "A bowl of rice"],
            correctAnswer: "A sour lemon",
            explanation: "Squinting eyes and puckering lips are universal bodily reactions to tasting something intensely sour, like a yellow lemon.",
            hintLadder: [
              "Notice the color clue: 'yellow slice'.",
              "Notice the physical reaction: 'squinted eyes and puckered lips'.",
              "Puckering lips indicates a very sour taste: a lemon."
            ],
            misconceptionAlerts: [
              { trigger: "A sweet mango", note: "Sweet fruit does not cause someone to squint and pucker their lips tightly." }
            ],
            skillId: "skill-pri-cmp-inference-main-idea",
            difficulty: "easy"
          },
          {
            id: "q-pri-cmp-02",
            type: "multiple_choice",
            questionText: "What is the 'main idea' of a reading passage?",
            options: [
              "The most important overall message or point of the passage",
              "The first word on the first page",
              "The longest sentence in the story",
              "A small fun fact mentioned in the middle"
            ],
            correctAnswer: "The most important overall message or point of the passage",
            explanation: "The main idea summarizes the central message that all supporting details help explain.",
            hintLadder: [
              "Think of what holds the whole passage together.",
              "It is not just one sentence length or position.",
              "It is the central point the author wants you to learn."
            ],
            misconceptionAlerts: [
              { trigger: "A small fun fact mentioned in the middle", note: "That is a supporting detail, not the main idea." }
            ],
            skillId: "skill-pri-cmp-inference-main-idea",
            difficulty: "easy"
          },
          {
            id: "q-pri-cmp-03",
            type: "multiple_choice",
            questionText: "Passage: 'Chidi heard thunder rumble across the village. The sky turned dark purple. He quickly ran outside to gather the drying clothes from the wash line.' Why did Chidi gather the clothes?",
            options: [
              "Because it was about to rain",
              "Because he wanted to wear all of them",
              "Because it was sunny outside",
              "Because someone stole them"
            ],
            correctAnswer: "Because it was about to rain",
            explanation: "Thunder and a dark sky are clear clues that a rainstorm is imminent, so drying clothes must be brought inside before getting soaked.",
            hintLadder: [
              "Look at the weather clues: thunder rumbling and dark sky.",
              "What weather happens when thunder and dark clouds gather?",
              "Rain! He gathered clothes so they wouldn't get wet."
            ],
            misconceptionAlerts: [
              { trigger: "Because it was sunny outside", note: "Thunder and dark skies mean a rainstorm, not sunshine." }
            ],
            skillId: "skill-pri-cmp-inference-main-idea",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 3. pri_creative_writing
  {
    id: "unit-pri-creative-writing-01",
    subjectId: "pri_creative_writing",
    level: "primary_foundations",
    title: "Story Mountain, Character Development and Sensory Details",
    code: "ENG-CW-01",
    description: "Structure engaging narratives with the 5-stage story arc (Beginning, Rising Action, Climax, Falling Action, Resolution) using vivid sensory imagery.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-cw-story-mountain",
        unitId: "unit-pri-creative-writing-01",
        title: "The Story Mountain and Descriptive Sensory Details",
        code: "SKL-PRI-CW-01",
        summary: "Organize plot events around a central problem/climax and replace 'telling' words with 'showing' sensory descriptions.",
        objectives: [
          "Sequence a story into Introduction, Problem, Climax, and Solution",
          "Identify the five senses (sight, sound, touch, smell, taste) in creative writing",
          "Practice 'Show, Don't Tell' technique for emotions"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-cw-mountain",
          title: "Climbing the Story Mountain: How Great Stories are Built",
          hookAndIntuition: "Every great story is like a roller coaster or a mountain hike! You start on calm ground (introducing characters), climb up as problems grow (rising action), reach the thrilling highest peak (the climax!), and zoom down to a satisfying happy landing (resolution)!",
          conceptualExplanation: "A story without a problem is boring. The plot mountain has 5 parts: 1) Exposition: Introduce the hero and setting. 2) Rising Action: A conflict or challenge begins. 3) Climax: The most exciting turning point. 4) Falling Action: Working out the result. 5) Resolution: How things end. To make it come alive, use the 5 senses (crackling twigs, sweet mango scent).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Climax", definition: "The peak of tension and excitement in a story where the hero faces the main challenge.", practicalExample: "When the boy finally confronts the lion." },
            { termOrSymbol: "Setting", definition: "The time and place where a story unfolds.", practicalExample: "A dusty village market on a stormy afternoon." },
            { termOrSymbol: "Show, Don't Tell", definition: "Describing physical actions and sensations instead of just stating an emotion.", practicalExample: "'Her hands trembled and her heart pounded' instead of 'She was scared'." }
          ],
          workedExamples: [
            {
              title: "Upgrading a Dull Sentence with Sensory Words",
              problemStatement: "Upgrade the sentence: 'The forest was scary.'",
              steps: [
                { stepNumber: 1, instruction: "Add sight details", reasoning: "Twisted dark branches blocked out the moonlight." },
                { stepNumber: 2, instruction: "Add sound details", reasoning: "Dry leaves crunched under mysterious footsteps." },
                { stepNumber: 3, instruction: "Combine into vivid description", reasoning: "'Shadowy branches clawed at the night sky as cold wind howled through the silent trees.'" }
              ],
              takeawayRule: "Paint pictures in the reader's imagination using sights, sounds, and physical feelings."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Ending a story abruptly with 'Then I woke up and it was all a dream.'",
              whyItIsWrong: "This disappoints readers because it erases all the exciting challenges your character overcame.",
              correctCorrection: "Have your hero solve the problem using their own courage, wit, or kindness."
            }
          ],
          guidedPracticePrompt: "Write one sentence describing a delicious bowl of hot jollof rice using smell and taste words.",
          summaryRecap: "Build narratives using the story mountain: introduce characters, create an exciting challenge, reach a climax, and resolve it."
        },
        questions: [
          {
            id: "q-pri-cw-01",
            type: "multiple_choice",
            questionText: "What is the 'climax' of a story?",
            options: [
              "The most exciting turning point or high point of the story",
              "The first sentence introducing the characters",
              "The list of words in the glossary",
              "The page number at the bottom"
            ],
            correctAnswer: "The most exciting turning point or high point of the story",
            explanation: "The climax is the peak of the story mountain where the main conflict reaches its highest tension.",
            hintLadder: [
              "Think of climbing to the highest peak of a mountain.",
              "It is the moment of greatest suspense.",
              "It is the exciting turning point."
            ],
            misconceptionAlerts: [
              { trigger: "The first sentence introducing the characters", note: "That is the exposition/introduction, not the climax." }
            ],
            skillId: "skill-pri-cw-story-mountain",
            difficulty: "easy"
          },
          {
            id: "q-pri-cw-02",
            type: "multiple_choice",
            questionText: "Which sentence is the best example of 'Show, Don't Tell' for being happy?",
            options: [
              "Amina beamed with a wide grin and jumped up and down, clapping her hands.",
              "Amina was very happy.",
              "Amina felt extremely nice.",
              "Amina was in a good mood."
            ],
            correctAnswer: "Amina beamed with a wide grin and jumped up and down, clapping her hands.",
            explanation: "Showing describes concrete bodily actions (beaming, jumping, clapping) that allow the reader to see the joy.",
            hintLadder: [
              "'Show' means describing physical actions and expressions.",
              "'Amina was very happy' just tells without describing.",
              "The jumping and clapping shows the happiness vividly."
            ],
            misconceptionAlerts: [
              { trigger: "Amina was very happy.", note: "This is telling, not showing. Showing uses physical actions and expressions." }
            ],
            skillId: "skill-pri-cw-story-mountain",
            difficulty: "easy"
          },
          {
            id: "q-pri-cw-03",
            type: "multiple_choice",
            questionText: "Which of the five senses is used in the phrase: 'The sizzling oil hissed and popped in the frying pan'?",
            options: ["Sound", "Taste", "Smell", "Sight"],
            correctAnswer: "Sound",
            explanation: "'Sizzling', 'hissed', and 'popped' are auditory onomatopoeic words describing what is heard.",
            hintLadder: [
              "Can your ears hear 'hissed' and 'popped'?",
              "Yes! Those are sound words.",
              "The sense is sound (hearing)."
            ],
            misconceptionAlerts: [
              { trigger: "Taste", note: "The words 'hissed' and 'popped' describe noises heard by the ear, not flavors tasted by the tongue." }
            ],
            skillId: "skill-pri-cw-story-mountain",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 4. pri_handwriting_penmanship
  {
    id: "unit-pri-handwriting-01",
    subjectId: "pri_handwriting_penmanship",
    level: "primary_foundations",
    title: "Letter Formation, Grip, Line Proportion and Cursive Joins",
    code: "ENG-HW-01",
    description: "Tripod pencil grip, ascender/descender proportions on lined paper, letter spacing, and cursive diagonal joins.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-hw-posture-joins",
        unitId: "unit-pri-handwriting-01",
        title: "Dynamic Tripod Grip, Ascenders and Descenders",
        code: "SKL-PRI-HW-01",
        summary: "Master ergonomic pencil control and distinguish letters reaching the top line from letters dropping below the baseline.",
        objectives: [
          "Hold pencil with the dynamic tripod grasp (thumb and index pinching, middle finger supporting)",
          "Classify letters into tall ascenders (b, d, h, k, l, t) and low descenders (g, j, p, q, y)",
          "Maintain consistent finger-space gaps between words"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-hw-grip",
          title: "Pencil Power: Grips, Spacing, and Letter Families",
          hookAndIntuition: "Imagine your pencil is a bird. If you squeeze it too tight with a fist, you hurt the bird and your hand gets tired and achy! If you hold it with gentle fingertips—thumb and index pointing, resting on the middle finger—it glides smoothly across the page like a bird in flight!",
          conceptualExplanation: "Good penmanship starts with posture: sit upright with both feet flat on the floor and paper tilted slightly. Use the tripod grip. On four-line paper: middle letters (a, c, e, m) stay between the waistline and baseline. Ascenders (b, d, f, h, k, l, t) stretch tall to the headline. Descenders (g, j, p, q, y) dive with tails below the baseline.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Tripod Grip", definition: "Holding the pencil between the thumb and index finger, supported from below by the middle finger.", practicalExample: "Provides maximum control with minimal wrist fatigue." },
            { termOrSymbol: "Ascender", definition: "The upward vertical stem of a letter that rises above the x-height/waistline.", practicalExample: "Letters like b, d, h, l." },
            { termOrSymbol: "Descender", definition: "The tail of a letter that extends below the bottom baseline.", practicalExample: "Letters like g, j, p, y." }
          ],
          workedExamples: [
            {
              title: "Checking Spacing with the Finger-Space Rule",
              problemStatement: "Why do we leave a gap between words when writing?",
              steps: [
                { stepNumber: 1, instruction: "Look at unspaced text", reasoning: "'Thecatranfast' is jumbled and difficult to decode." },
                { stepNumber: 2, instruction: "Apply finger-space rule", reasoning: "Place your index finger after 'The', write 'cat', place finger, write 'ran'." },
                { stepNumber: 3, instruction: "Evaluate clarity", reasoning: "'The cat ran fast' is clear, readable, and neat." }
              ],
              takeawayRule: "Leave a one-finger space between words so your reader can easily tell where each word starts and ends."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Letting descender tails like 'y' or 'p' sit completely above the baseline.",
              whyItIsWrong: "If a 'p' sits above the line, it looks like a capital 'P'.",
              correctCorrection: "Descender tails must drop beneath the bottom writing line."
            }
          ],
          guidedPracticePrompt: "Name three letters that have tails reaching below the writing line (descenders).",
          summaryRecap: "Master the tripod grip, sit with good posture, position ascenders tall and descenders low, and always leave word spaces."
        },
        questions: [
          {
            id: "q-pri-hw-01",
            type: "multiple_choice",
            questionText: "Which group of letters consists entirely of 'descenders' (letters with tails that drop below the baseline)?",
            options: ["g, p, y, j", "b, d, h, k", "a, c, e, o", "t, l, f, i"],
            correctAnswer: "g, p, y, j",
            explanation: "The letters g, p, y, and j have tails extending beneath the bottom baseline.",
            hintLadder: [
              "Look for letters with hanging tails.",
              "Think about where the tail of 'y' or 'g' goes on lined paper.",
              "g, p, y, j drop below the line."
            ],
            misconceptionAlerts: [
              { trigger: "b, d, h, k", note: "These are ascenders that stretch tall toward the sky, not descenders." }
            ],
            skillId: "skill-pri-hw-posture-joins",
            difficulty: "easy"
          },
          {
            id: "q-pri-hw-02",
            type: "multiple_choice",
            questionText: "What is the recommended pencil grip for neat, comfortable writing?",
            options: [
              "Dynamic tripod grip (pinched by thumb and index, resting on middle finger)",
              "Full fist grip with all fingers wrapped around the shaft",
              "Holding the pencil with only the pinky finger",
              "Squeezing the pencil as hard as possible"
            ],
            correctAnswer: "Dynamic tripod grip (pinched by thumb and index, resting on middle finger)",
            explanation: "The tripod grip gives precise control while preventing hand cramps.",
            hintLadder: [
              "Tri- means three: thumb, index, and middle finger.",
              "Your thumb and index pinch gently while middle finger supports.",
              "That is the dynamic tripod grip."
            ],
            misconceptionAlerts: [
              { trigger: "Full fist grip with all fingers wrapped around the shaft", note: "The fist grip causes heavy hand strain and makes cursive impossible." }
            ],
            skillId: "skill-pri-hw-posture-joins",
            difficulty: "easy"
          },
          {
            id: "q-pri-hw-03",
            type: "multiple_choice",
            questionText: "What tool is commonly placed between written words to maintain neat word spacing in primary handwriting?",
            options: ["The writer's index finger", "A 30 cm ruler", "An eraser", "A coin"],
            correctAnswer: "The writer's index finger",
            explanation: "The 'finger space' method uses the child's index finger placed after each word to maintain consistent spacing.",
            hintLadder: [
              "It is a natural tool right on your own hand.",
              "Teachers call it the 'finger space'.",
              "The writer's index finger."
            ],
            misconceptionAlerts: [
              { trigger: "A 30 cm ruler", note: "A 30 cm ruler is far too wide for spacing between normal words." }
            ],
            skillId: "skill-pri-hw-posture-joins",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 5. pri_verbal_reasoning
  {
    id: "unit-pri-verbal-reasoning-01",
    subjectId: "pri_verbal_reasoning",
    level: "primary_foundations",
    title: "Synonyms, Antonyms, Analogies and Word Codes",
    code: "ENG-VR-01",
    description: "Vocabulary relationship patterns: semantic pairs (hot/cold), verbal analogies (pupil : school), odd-word-out, and letter-substitution codes.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-vr-analogies-codes",
        unitId: "unit-pri-verbal-reasoning-01",
        title: "Word Analogies and Odd-Word-Out Classification",
        code: "SKL-PRI-VR-01",
        summary: "Identify the relational bridge between word pairs and categorize lexical sets to spot the odd item.",
        objectives: [
          "State the exact connection between word pair A : B",
          "Complete analogy pairs of the form A : B :: C : D",
          "Identify the odd word out based on semantic class (animals, fruits, professions)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-vr-analogies",
          title: "Word Bridges: Connecting Word Pairs and Cracking Codes",
          hookAndIntuition: "Puppy is to Dog as Kitten is to...? Cat! How did you know that so fast? You built a bridge: 'A puppy is a baby dog, so a kitten is a baby cat!' That is a verbal analogy!",
          conceptualExplanation: "In Verbal Reasoning, you discover how words relate to each other. An analogy compares two pairs of words that share the same relationship. Example: Bird is to Sky as Fish is to Water (Animal and where it travels). In Odd-One-Out, you find the single word that does not belong to the family.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Analogy", definition: "A comparison showing a similarity in relationship between two sets of words.", practicalExample: "Glove : Hand :: Shoe : Foot." },
            { termOrSymbol: "Synonym", definition: "A word having the same or nearly the same meaning as another.", practicalExample: "Large / Big." },
            { termOrSymbol: "Antonym", definition: "A word opposite in meaning to another.", practicalExample: "Ancient / Modern." }
          ],
          workedExamples: [
            {
              title: "Solving: Doctor : Hospital :: Teacher : ?",
              problemStatement: "Complete the analogy: Doctor is to Hospital as Teacher is to _____.",
              steps: [
                { stepNumber: 1, instruction: "Build bridge sentence for first pair", reasoning: "A Doctor works in a Hospital (Profession : Workplace)." },
                { stepNumber: 2, instruction: "Apply exact bridge to second pair", reasoning: "A Teacher works in a _____ (Workplace)." },
                { stepNumber: 3, instruction: "Select answer", reasoning: "School." }
              ],
              takeawayRule: "Formulate a clear sentence connecting the first pair, then plug the third word into that exact sentence."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Picking a word that is related to the topic but does not follow the specific relationship.",
              whyItIsWrong: "For Doctor : Hospital :: Teacher : ?, choosing 'Book' is wrong because Book is a tool, not a workplace.",
              correctCorrection: "Always match the exact category: Profession : Workplace requires another Workplace."
            }
          ],
          guidedPracticePrompt: "Which is the odd one out: Mango, Banana, Carrot, Orange? Why?",
          summaryRecap: "Build a sentence connecting pair 1 and use that exact rule for pair 2. Group items by semantic type to find the odd word."
        },
        questions: [
          {
            id: "q-pri-vr-01",
            type: "multiple_choice",
            questionText: "Complete the analogy: Pen is to Write as Knife is to _____.",
            options: ["Cut", "Cook", "Fork", "Plate"],
            correctAnswer: "Cut",
            explanation: "A pen is an instrument used to write; a knife is an instrument used to cut.",
            hintLadder: [
              "What is the function of a pen? To write.",
              "What is the primary function of a knife?",
              "A knife is used to cut."
            ],
            misconceptionAlerts: [
              { trigger: "Fork", note: "Fork is another utensil, but the relationship is Tool : Action." }
            ],
            skillId: "skill-pri-vr-analogies-codes",
            difficulty: "easy"
          },
          {
            id: "q-pri-vr-02",
            type: "multiple_choice",
            questionText: "Which word is the ODD one out in this group?",
            options: ["Carrot", "Lion", "Elephant", "Leopard"],
            correctAnswer: "Carrot",
            explanation: "Lion, Elephant, and Leopard are all animals, while a Carrot is a vegetable.",
            hintLadder: [
              "Look at what each item is.",
              "Three of them are living wild animals.",
              "Carrot is a root vegetable, so it is the odd one out."
            ],
            misconceptionAlerts: [
              { trigger: "Elephant", note: "An elephant is an animal like the lion and leopard. The carrot is a vegetable." }
            ],
            skillId: "skill-pri-vr-analogies-codes",
            difficulty: "easy"
          },
          {
            id: "q-pri-vr-03",
            type: "multiple_choice",
            questionText: "Which word is an ANTONYM (opposite in meaning) of 'GENEROUS'?",
            options: ["Stingy (Greedy)", "Kind", "Helpful", "Wealthy"],
            correctAnswer: "Stingy (Greedy)",
            explanation: "Generous means willing to give and share; stingy or greedy is its exact opposite.",
            hintLadder: [
              "Antonym means the opposite.",
              "A generous person gives freely to others.",
              "A stingy person refuses to give or share."
            ],
            misconceptionAlerts: [
              { trigger: "Kind", note: "Kind is a synonym (similar meaning), but the question asks for the antonym (opposite)." }
            ],
            skillId: "skill-pri-vr-analogies-codes",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 6. pri_oral_english
  {
    id: "unit-pri-oral-english-01",
    subjectId: "pri_oral_english",
    level: "primary_foundations",
    title: "Vowel Sounds, Consonant Clusters and Syllable Stress",
    code: "ENG-ORL-01",
    description: "Phonemic discrimination: short vs long vowels (/ɪ/ vs /iː/), minimal pairs (ship/sheep), consonant blends (str-, spl-), and primary syllable stress.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-orl-vowels-stress",
        unitId: "unit-pri-oral-english-01",
        title: "Short vs Long Vowels and Minimal Pairs",
        code: "SKL-PRI-ORL-01",
        summary: "Hear and produce contrasting vowel length distinctions and identify stressed syllables in two-syllable words.",
        objectives: [
          "Distinguish short /ɪ/ in 'ship' from long /iː/ in 'sheep'",
          "Count syllables in multi-syllable words by chin-tap or clap method",
          "Identify whether stress falls on the first or second syllable in common nouns"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-orl-sounds",
          title: "Clear Speech: Short Vowels, Long Vowels, and Word Beats",
          hookAndIntuition: "Say the words 'ship' and 'sheep'. Did you notice your mouth stayed relaxed and quick for 'ship', but stretched into a wide smile for 'sheep'? If you say 'look at that sheep in the ocean', people will laugh! Pronunciation makes words clear!",
          conceptualExplanation: "In English, vowels can be short or long. Changing vowel length changes the entire word (minimal pair: bit vs beat, cot vs coat). Syllables are the beats of a word. When we say a word with two beats like 'DOC-tor', the first syllable is said louder and higher—that is syllable stress.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Minimal Pair", definition: "Two words that differ by only one single sound.", practicalExample: "'Cat' and 'Bat' (consonant), 'Fit' and 'Feet' (vowel)." },
            { termOrSymbol: "Syllable", definition: "A single unit of unbroken sound containing one vowel sound.", practicalExample: "'Hos-pi-tal' has 3 syllables." },
            { termOrSymbol: "Word Stress", definition: "The emphasis or extra loudness given to one syllable in a word.", practicalExample: "TEA-cher (first beat stressed)." }
          ],
          workedExamples: [
            {
              title: "Clapping Syllables in 'Banana'",
              problemStatement: "How many syllables are in the word 'Banana'?",
              steps: [
                { stepNumber: 1, instruction: "Say the word slowly", reasoning: "Ba - nan - a." },
                { stepNumber: 2, instruction: "Clap on each voice beat", reasoning: "Clap 1: Ba; Clap 2: nan; Clap 3: a." },
                { stepNumber: 3, instruction: "Count beats", reasoning: "There are 3 claps, so Banana has 3 syllables." }
              ],
              takeawayRule: "Every syllable must contain a vowel sound. Clap along with your chin dropping to count beats."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Counting letters instead of sound beats for syllables.",
              whyItIsWrong: "The word 'through' has 7 letters, but only 1 syllable (1 sound beat).",
              correctCorrection: "Always count vowel sound beats, never letters."
            }
          ],
          guidedPracticePrompt: "Say 'pen' and 'pan'. What vowel sound differentiates them?",
          summaryRecap: "Vowels have short and long sounds. Clapping helps count syllables, and the loudest beat is the stressed syllable."
        },
        questions: [
          {
            id: "q-pri-orl-01",
            type: "multiple_choice",
            questionText: "Which word contains the long /iː/ vowel sound (as in 'tree')?",
            options: ["Seat", "Sit", "Set", "Sip"],
            correctAnswer: "Seat",
            explanation: "'Seat' has the long /iː/ sound produced with spread lips, unlike the short /ɪ/ in sit or sip.",
            hintLadder: [
              "Say the words out loud.",
              "Listen for the sound in 'bee' or 'see'.",
              "'Seat' has the long vowel sound."
            ],
            misconceptionAlerts: [
              { trigger: "Sit", note: "'Sit' has the quick short /ɪ/ sound, not the stretched long /iː/ sound." }
            ],
            skillId: "skill-pri-orl-vowels-stress",
            difficulty: "easy"
          },
          {
            id: "q-pri-orl-02",
            type: "multiple_choice",
            questionText: "How many syllables are in the word 'E-LE-PHANT'?",
            options: ["3 syllables", "2 syllables", "4 syllables", "1 syllable"],
            correctAnswer: "3 syllables",
            explanation: "E (1) - le (2) - phant (3) has three distinct vowel sound beats.",
            hintLadder: [
              "Clap each beat: el - e - phant.",
              "Count the claps.",
              "There are 3 syllables."
            ],
            misconceptionAlerts: [
              { trigger: "2 syllables", note: "Did you combine 'le' and 'phant'? 'El-e-phant' has three beats." }
            ],
            skillId: "skill-pri-orl-vowels-stress",
            difficulty: "easy"
          },
          {
            id: "q-pri-orl-03",
            type: "multiple_choice",
            questionText: "Which syllable is stressed in the word 'WATER'?",
            options: ["First syllable (WA-ter)", "Second syllable (wa-TER)", "Both equally", "Neither"],
            correctAnswer: "First syllable (WA-ter)",
            explanation: "Most two-syllable nouns in English have stress on the first syllable: WA-ter.",
            hintLadder: [
              "Say 'water' naturally: do you say WA-ter or wa-TER?",
              "The voice is louder and higher on the first beat.",
              "WA-ter has first-syllable stress."
            ],
            misconceptionAlerts: [
              { trigger: "Second syllable (wa-TER)", note: "Saying wa-TER sounds unnatural; standard pronunciation stresses WA-ter." }
            ],
            skillId: "skill-pri-orl-vowels-stress",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 7. pri_french_basics
  {
    id: "unit-pri-french-01",
    subjectId: "pri_french_basics",
    level: "primary_foundations",
    title: "Salutations, Numbers to 20, Family and Classroom Objects",
    code: "FRN-BAS-01",
    description: "Foundational French: greetings (Bonjour, Bonsoir), polite phrases (Merci, S'il vous plaît), numbers 1-20, and naming everyday classroom items.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-frn-greetings-numbers",
        unitId: "unit-pri-french-01",
        title: "French Salutations and Counting 1 to 10",
        code: "SKL-PRI-FRN-01",
        summary: "Greet others appropriately at different times of day and count items 1 through 10 in French.",
        objectives: [
          "Use 'Bonjour' for morning/afternoon greeting and 'Bonsoir' for evening greeting",
          "Respond to 'Comment ça va?' with 'Ça va bien, merci'",
          "Recite and identify numerals 1 to 10 in French (un, deux, trois... dix)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-frn-bonjour",
          title: "Bienvenue! Greeting Friends and Counting in French",
          hookAndIntuition: "Did you know that many countries neighboring Nigeria—like Benin, Niger, and Cameroon—speak French as their official language? When you cross the border, a friendly 'Bonjour!' makes friends instantly!",
          conceptualExplanation: "In French, we greet people by saying 'Bonjour' (Good day / Hello) from morning until the sun sets. In the evening, we say 'Bonsoir' (Good evening). To say goodbye, say 'Au revoir'. To ask how someone is doing, ask 'Comment ça va?' and reply 'Ça va bien, merci' (I am doing well, thank you).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Bonjour", definition: "Hello / Good morning / Good day.", practicalExample: "'Bonjour, Madame!'" },
            { termOrSymbol: "Merci", definition: "Thank you.", practicalExample: "'Merci beaucoup!'" },
            { termOrSymbol: "Un, Deux, Trois", definition: "One, Two, Three in French.", practicalExample: "Un (1), Deux (2), Trois (3)." }
          ],
          workedExamples: [
            {
              title: "Counting from 1 to 5 in French",
              problemStatement: "How do you count items 1 to 5 in French?",
              steps: [
                { stepNumber: 1, instruction: "1 and 2", reasoning: "1 is 'Un', 2 is 'Deux'." },
                { stepNumber: 2, instruction: "3 and 4", reasoning: "3 is 'Trois', 4 is 'Quatre'." },
                { stepNumber: 3, instruction: "5", reasoning: "5 is 'Cinq'." }
              ],
              takeawayRule: "1 = Un, 2 = Deux, 3 = Trois, 4 = Quatre, 5 = Cinq."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Pronouncing the final 's' in 'trois' or 'deux'.",
              whyItIsWrong: "In French, final consonants like 's' or 'x' are usually silent (trois sounds like 'trwa').",
              correctCorrection: "Keep the final consonant silent: 'deux' sounds like 'duh', 'trois' sounds like 'trwa'."
            }
          ],
          guidedPracticePrompt: "How do you say 'Good evening' and 'Thank you' in French?",
          summaryRecap: "Use 'Bonjour' during the day, 'Bonsoir' in the evening, 'Merci' for thanks, and practice counting 1 to 10."
        },
        questions: [
          {
            id: "q-pri-frn-01",
            type: "multiple_choice",
            questionText: "What does 'Bonjour' mean in French?",
            options: ["Good morning / Hello", "Goodbye", "Thank you", "Good night"],
            correctAnswer: "Good morning / Hello",
            explanation: "'Bonjour' is the standard French daytime greeting, translating literally to 'Good day'.",
            hintLadder: [
              "'Bon' means good, and 'jour' means day.",
              "It is the first word you say when greeting someone during the day.",
              "Good morning / Hello."
            ],
            misconceptionAlerts: [
              { trigger: "Goodbye", note: "Goodbye in French is 'Au revoir'. 'Bonjour' is hello." }
            ],
            skillId: "skill-pri-frn-greetings-numbers",
            difficulty: "easy"
          },
          {
            id: "q-pri-frn-02",
            type: "multiple_choice",
            questionText: "Which French number word represents the numeral 3?",
            options: ["Trois", "Deux", "Quatre", "Cinq"],
            correctAnswer: "Trois",
            explanation: "1 = Un, 2 = Deux, 3 = Trois, 4 = Quatre, 5 = Cinq.",
            hintLadder: [
              "Count in order: Un, Deux, ___.",
              "The third number starts with Tr-.",
              "Trois represents 3."
            ],
            misconceptionAlerts: [
              { trigger: "Deux", note: "Deux is the number 2. Trois is 3." }
            ],
            skillId: "skill-pri-frn-greetings-numbers",
            difficulty: "easy"
          },
          {
            id: "q-pri-frn-03",
            type: "multiple_choice",
            questionText: "How do you politely say 'Thank you' in French?",
            options: ["Merci", "S'il vous plaît", "Pardon", "Oui"],
            correctAnswer: "Merci",
            explanation: "'Merci' is the French word for thank you. 'S'il vous plaît' means please.",
            hintLadder: [
              "It starts with 'M'.",
              "You hear people say 'Merci beaucoup' (Thank you very much).",
              "Merci."
            ],
            misconceptionAlerts: [
              { trigger: "S'il vous plaît", note: "'S'il vous plaît' means 'please'. 'Merci' means 'thank you'." }
            ],
            skillId: "skill-pri-frn-greetings-numbers",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 8. pri_indigenous_language
  {
    id: "unit-pri-indigenous-01",
    subjectId: "pri_indigenous_language",
    level: "primary_foundations",
    title: "Indigenous African Languages: Yoruba, Igbo and Hausa Heritage",
    code: "IND-LANG-01",
    description: "Cultural greetings, respect honorifics, kinship terms, and common phrases across Nigeria's three major indigenous languages.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-ind-greetings-kinship",
        unitId: "unit-pri-indigenous-01",
        title: "Respectful Greetings across Yoruba, Igbo, and Hausa",
        code: "SKL-PRI-IND-01",
        summary: "Identify traditional greetings and cultural gestures of respect across the three major national languages of Nigeria.",
        objectives: [
          "Recognize Yoruba greetings with honorific prefix 'E ku' (E kaaro, E kaasan)",
          "Recognize Igbo greetings (Ututu oma, Ndewo, Kedu)",
          "Recognize Hausa greetings (Ina kwana, Barka da yamma, Sannu)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-ind-heritage",
          title: "Our Heritage Tongues: Greetings and Respect in Nigeria",
          hookAndIntuition: "In Nigerian culture, greeting elders is a beautiful sign of respect and honor! In Yoruba, children greet with 'E kaaro'. In Igbo, they say 'Ututu oma'. In Hausa, they say 'Ina kwana'. Learning all three connects us as one big family across Nigeria!",
          conceptualExplanation: "Nigeria has hundreds of rich languages, with Yoruba, Igbo, and Hausa being the major national languages. In Yoruba, the prefix 'Ẹ ku' shows deep respect (Ẹ kaaro = good morning, Ẹ ku irole = good evening). In Igbo, 'Ututu oma' means good morning, and 'Ndewo' or 'Kedu' are warm greetings. In Hausa, 'Ina kwana?' asks 'How did you sleep?' and 'Sannu' means hello.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Ẹ kaaro (Yoruba)", definition: "Good morning; spoken with respect to elders.", practicalExample: "'Ẹ kaaro, Ma!'" },
            { termOrSymbol: "Ututu oma (Igbo)", definition: "Good morning in Igbo.", practicalExample: "'Ututu oma, nna m' (Good morning, my father)." },
            { termOrSymbol: "Ina kwana (Hausa)", definition: "Good morning / How was your night in Hausa.", practicalExample: "'Ina kwana?' Reply: 'Lafiya lau' (In health and peace)." }
          ],
          workedExamples: [
            {
              title: "Comparing Morning Greetings",
              problemStatement: "How do you say 'Good morning' in Yoruba, Igbo, and Hausa?",
              steps: [
                { stepNumber: 1, instruction: "Yoruba", reasoning: "Ẹ kaaro." },
                { stepNumber: 2, instruction: "Igbo", reasoning: "Ututu oma." },
                { stepNumber: 3, instruction: "Hausa", reasoning: "Ina kwana (reply: Lafiya lau)." }
              ],
              takeawayRule: "Greeting elders is central to African culture and preserves cultural dignity and unity."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking 'Kedu' is only used in the morning.",
              whyItIsWrong: "'Kedu' literally means 'How are you?' and can be used at any time of day.",
              correctCorrection: "'Ututu oma' is specifically morning, while 'Kedu' is a general inquiry."
            }
          ],
          guidedPracticePrompt: "What is the polite Hausa reply to the greeting 'Ina kwana'?",
          summaryRecap: "Nigeria's major indigenous languages celebrate respect: Ẹ kaaro (Yoruba), Ututu oma (Igbo), and Ina kwana (Hausa)."
        },
        questions: [
          {
            id: "q-pri-ind-01",
            type: "multiple_choice",
            questionText: "What does the Yoruba greeting 'Ẹ kaaro' mean?",
            options: ["Good morning", "Good night", "Thank you", "Goodbye"],
            correctAnswer: "Good morning",
            explanation: "'Ẹ kaaro' is the respectful Yoruba morning greeting.",
            hintLadder: [
              "'Aaro' refers to morning time in Yoruba.",
              "It is the first greeting said when waking up.",
              "Good morning."
            ],
            misconceptionAlerts: [
              { trigger: "Good night", note: "'Good night' in Yoruba is 'O da aro'. 'Ẹ kaaro' is good morning." }
            ],
            skillId: "skill-pri-ind-greetings-kinship",
            difficulty: "easy"
          },
          {
            id: "q-pri-ind-02",
            type: "multiple_choice",
            questionText: "In Igbo, which phrase means 'Good morning'?",
            options: ["Ututu oma", "Ndewo", "Kedu", "Dalu"],
            correctAnswer: "Ututu oma",
            explanation: "'Ututu' means morning, and 'oma' means good. 'Ututu oma' is good morning.",
            hintLadder: [
              "'Ututu' means morning in Igbo.",
              "'Oma' means good or beautiful.",
              "Ututu oma = Good morning."
            ],
            misconceptionAlerts: [
              { trigger: "Dalu", note: "'Dalu' means 'thank you' in Igbo, not good morning." }
            ],
            skillId: "skill-pri-ind-greetings-kinship",
            difficulty: "easy"
          },
          {
            id: "q-pri-ind-03",
            type: "multiple_choice",
            questionText: "When someone greets you in Hausa with 'Ina kwana?', what is the standard peaceful reply?",
            options: ["Lafiya lau (In health and peace)", "Sannu", "Sai an jima", "Nagode"],
            correctAnswer: "Lafiya lau (In health and peace)",
            explanation: "'Lafiya lau' means 'Fine / in health and peace', the standard courteous response to greeting inquiries in Hausa.",
            hintLadder: [
              "'Lafiya' relates to health and well-being.",
              "It is the universal polite reply.",
              "Lafiya lau."
            ],
            misconceptionAlerts: [
              { trigger: "Nagode", note: "'Nagode' means 'Thank you' in Hausa." }
            ],
            skillId: "skill-pri-ind-greetings-kinship",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];
