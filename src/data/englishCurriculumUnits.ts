import { Unit } from "../types/curriculum";

export const LANGUAGE_ENGLISH_UNITS: Unit[] = [
  {
    id: "unit-eng-concord-syntax",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Grammatical Concord, Verb Tenses & Structural Syntax",
    code: "ENG-UNIT-01",
    description: "Subject-verb agreement rules, correlative conjunctions, parenthetical structures, subjunctive mood, and complex conditional sentences.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-eng-concord",
        unitId: "unit-eng-concord-syntax",
        title: "Subject-Verb Concord & Proximity Rules",
        code: "SKL-ENG-201",
        summary: "Navigating complex subject structures, intervening prepositional phrases, collective nouns, and correlative pairs.",
        objectives: [
          "Apply grammatical agreement when parenthetical phrases intervene between subject and verb",
          "Differentiate singular vs plural concord in correlative structures ('either...or', 'neither...nor', 'not only...but also')",
          "Identify collective nouns acting as single unified entities vs individual members"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-concord-1",
            type: "multiple_choice",
            questionText: "Choose the grammatically correct option to complete the sentence:\n'The principal, together with the senior science teachers, ______ attending the national education symposium in Abuja.'",
            options: ["is", "are", "were", "have been"],
            correctAnswer: "is",
            explanation: "Phrases introduced by 'together with', 'as well as', 'along with', or 'in addition to' are parenthetical modifiers. The true grammatical subject is the singular noun 'The principal', which requires the singular verb 'is'.",
            hintLadder: [
              "Identify the principal grammatical subject before the parenthetical commas.",
              "'The principal' is singular.",
              "Parenthetical phrases like 'together with the teachers' do not change the subject's number. Select the singular verb."
            ],
            misconceptionAlerts: [
              { trigger: "are", note: "Error of proximity: 'teachers' is part of the parenthetical phrase, not the true subject." },
              { trigger: "were", note: "'were' is plural and shifts the tense into the past without contextual warrant." }
            ],
            skillId: "skill-eng-concord",
            difficulty: "medium"
          },
          {
            id: "q-eng-concord-2",
            type: "multiple_choice",
            questionText: "Choose the correct verb form:\n'Neither the head prefect nor the classroom delegates ______ convinced by the preliminary debate arguments.'",
            options: ["were", "was", "is", "has been"],
            correctAnswer: "were",
            explanation: "In 'neither...nor' and 'either...or' constructions, the verb agrees in number and person with the closest subject component (rule of proximity). Here, 'delegates' is plural and closer to the verb, requiring 'were'.",
            hintLadder: [
              "In 'neither...nor' sentences, look at the noun closest to the verb blank.",
              "The second subject is 'the classroom delegates' (plural).",
              "The verb must agree with 'delegates', so select the plural past verb 'were'."
            ],
            misconceptionAlerts: [
              { trigger: "was", note: "Rule of proximity requires agreement with the nearest noun ('delegates', plural), not 'prefect'." }
            ],
            skillId: "skill-eng-concord",
            difficulty: "medium"
          },
          {
            id: "q-eng-concord-3",
            type: "multiple_choice",
            questionText: "Select the correct option to complete the sentence:\n'A large herd of African elephants ______ seen migrating across the savanna river basin yesterday.'",
            options: ["was", "were", "are", "have been"],
            correctAnswer: "was",
            explanation: "Collective nouns representing a unified single group ('A herd of elephants') take a singular verb when the group acts as one collective entity in the past tense ('was seen').",
            hintLadder: [
              "Focus on the head noun of the noun phrase: 'A large herd' (singular).",
              "'of African elephants' is a modifying prepositional phrase.",
              "The singular unit 'herd' takes the singular verb 'was'."
            ],
            misconceptionAlerts: [
              { trigger: "were", note: "'elephants' is the object of the preposition; the subject is the singular collective noun 'herd'." }
            ],
            skillId: "skill-eng-concord",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-eng-tenses-conditionals",
        unitId: "unit-eng-concord-syntax",
        title: "Tense Consistency, Subjunctive Mood & Conditionals",
        code: "SKL-ENG-202",
        summary: "Mastering hypothetical conditions (Types 1, 2, 3) and mandative subjunctive structures.",
        objectives: [
          "Construct third conditional sentences expressing unfulfilled past hypotheses",
          "Apply subjunctive mood verbs in formal recommendations and demands",
          "Maintain strict chronological tense consistency in narrative and expository prose"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-cond-1",
            type: "multiple_choice",
            questionText: "Complete the Third Conditional statement:\n'If the engineering team had calibrated the sensors accurately, the circuit malfunction ______ prevented.'",
            options: [
              "would have been",
              "would be",
              "will have been",
              "had been"
            ],
            correctAnswer: "would have been",
            explanation: "The Third Conditional expresses hypothetical past events with past consequences. The pattern is: If + past perfect ('had calibrated'), result clause = would have + past participle ('would have been prevented').",
            hintLadder: [
              "Notice the 'if' clause uses the Past Perfect tense ('had calibrated').",
              "Third conditional result clauses require 'would have + past participle'.",
              "Select 'would have been'."
            ],
            misconceptionAlerts: [
              { trigger: "would be", note: "'would be' forms a Second Conditional (hypothetical present), not a past unfulfilled condition." }
            ],
            skillId: "skill-eng-tenses-conditionals",
            difficulty: "medium"
          },
          {
            id: "q-eng-cond-2",
            type: "multiple_choice",
            questionText: "Identify the grammatically standard subjunctive construction:\n'The school board recommended that each candidate ______ an original scientific portfolio before the interview.'",
            options: ["submit", "submits", "submitted", "must submit"],
            correctAnswer: "submit",
            explanation: "The mandative subjunctive following verbs of recommendation, demand, or insistence (e.g., 'recommended that...') uses the base form of the verb ('submit') regardless of the singular subject ('each candidate').",
            hintLadder: [
              "This sentence uses the formal mandative subjunctive mood ('recommended that...').",
              "In the subjunctive that-clause, the verb is always in its bare infinitive/base form.",
              "Use 'submit', not the third-person singular 'submits'."
            ],
            misconceptionAlerts: [
              { trigger: "submits", note: "While 'each candidate' is singular, the subjunctive mood overrides standard 's' inflection." }
            ],
            skillId: "skill-eng-tenses-conditionals",
            difficulty: "hard"
          },
          {
            id: "q-eng-cond-3",
            type: "multiple_choice",
            questionText: "Choose the correct sequence of tenses:\n'By the time the keynote speaker arrived at the auditorium, the symposium organizers ______ the opening remarks.'",
            options: ["had concluded", "have concluded", "concluded", "were concluding"],
            correctAnswer: "had concluded",
            explanation: "When an action occurs prior to another specific moment in the past, the earlier event requires the Past Perfect tense ('had concluded'), while the later event uses the Simple Past ('arrived').",
            hintLadder: [
              "Two past actions are described: the speaker's arrival and the conclusion of remarks.",
              "The remarks finished BEFORE the speaker arrived.",
              "The earlier action in the past requires the Past Perfect auxiliary 'had'."
            ],
            misconceptionAlerts: [
              { trigger: "have concluded", note: "'have concluded' is present perfect and cannot pair with past point 'arrived'." }
            ],
            skillId: "skill-eng-tenses-conditionals",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-lexis-vocabulary",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Lexis, Morphological Etymology & Idiomatic Usage",
    code: "ENG-UNIT-02",
    description: "Affixation, Greek and Latin roots, contextual synonyms/antonyms, phrasal verbs, collocations, and idiomatic precision.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-eng-roots-affixes",
        unitId: "unit-eng-lexis-vocabulary",
        title: "Morphemic Analysis, Roots & Affixes",
        code: "SKL-ENG-203",
        summary: "Deconstructing multisyllabic academic vocabulary into prefixes, base roots, and derivational suffixes.",
        objectives: [
          "Deduce word meanings using Greek and Latin root morphemes ('chron', 'tele', 'bene', 'mal', 'dict')",
          "Identify how derivational suffixes alter lexical word classes (noun to adjective to adverb)",
          "Distinguish homographs, homophones, and semantic false friends"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-roots-1",
            type: "multiple_choice",
            questionText: "Given that the Greek root 'chronos' means time and the prefix 'syn-' means together or same, what does the adjective 'synchronous' mean?",
            options: [
              "Occurring or operating at the same time",
              "Lasting for an exceptionally long duration",
              "Recorded in chronological historical order",
              "Outdated and belonging to an earlier era"
            ],
            correctAnswer: "Occurring or operating at the same time",
            explanation: "Morpheme breakdown: 'syn-' (together/simultaneous) + 'chron' (time) + '-ous' (adjective suffix) = occurring at the exact same moment or rate.",
            hintLadder: [
              "Combine the meaning of 'syn' (same/together) with 'chron' (time).",
              "Think of synchronous communication (e.g., live phone calls happening simultaneously in real time).",
              "Select the definition describing events happening at the same time."
            ],
            misconceptionAlerts: [
              { trigger: "Outdated and belonging to an earlier era", note: "'Anachronistic' means belonging to an earlier era, not synchronous." }
            ],
            skillId: "skill-eng-roots-affixes",
            difficulty: "easy"
          },
          {
            id: "q-eng-roots-2",
            type: "multiple_choice",
            questionText: "Choose the word whose underlined prefix signifies 'beneath' or 'insufficient':",
            options: ["Hypodermic", "Hyperactive", "Epidermal", "Perimeter"],
            correctAnswer: "Hypodermic",
            explanation: "The Greek prefix 'hypo-' means under, beneath, or below normal (as in 'hypodermic' = under the skin). 'Hyper-' means excessive/above; 'epi-' means upon; 'peri-' means around.",
            hintLadder: [
              "Distinguish 'hypo-' (under/below) from 'hyper-' (over/excessive).",
              "'Dermis' means skin.",
              "'Hypodermic' refers to the layer directly beneath the dermis."
            ],
            misconceptionAlerts: [
              { trigger: "Hyperactive", note: "'Hyper-' means over/excessive, the exact opposite of 'hypo-'." }
            ],
            skillId: "skill-eng-roots-affixes",
            difficulty: "medium"
          },
          {
            id: "q-eng-roots-3",
            type: "multiple_choice",
            questionText: "Which suffix transforms the verb 'hesitate' into an adjective denoting quality or state?",
            options: ["-ant (hesitant)", "-tion (hesitation)", "-ly (hesitantly)", "-ness (hesitantness)"],
            correctAnswer: "-ant (hesitant)",
            explanation: "The suffix '-ant' creates an adjective ('hesitant'). '-tion' creates an abstract noun ('hesitation'); '-ly' creates an adverb ('hesitantly').",
            hintLadder: [
              "An adjective describes a noun (e.g., 'a hesitant student').",
              "Look for the suffix that forms the word 'hesitant'.",
              "'-ant' forms the adjective."
            ],
            misconceptionAlerts: [
              { trigger: "-tion (hesitation)", note: "'-tion' forms a noun, not an adjective." }
            ],
            skillId: "skill-eng-roots-affixes",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-eng-phrasal-idioms",
        unitId: "unit-eng-lexis-vocabulary",
        title: "Phrasal Verbs, Collocations & Idiomatic Expressions",
        code: "SKL-ENG-204",
        summary: "Interpreting non-literal figurative phrases, separable particles, and academic collocations.",
        objectives: [
          "Determine the contextual meaning of separable and non-separable phrasal verbs",
          "Identify natural academic word pairings (collocations) in scholarly discourse",
          "Interpret nuanced idiomatic expressions tested in WAEC, JAMB, and Cambridge English"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-idiom-1",
            type: "multiple_choice",
            questionText: "What is the meaning of the phrasal verb 'call off' in the sentence: 'Due to torrential downpours, the committee decided to call off the sports tournament'?",
            options: ["Cancel completely", "Postpone to next week", "Relocate indoors", "Shorten the duration"],
            correctAnswer: "Cancel completely",
            explanation: "The phrasal verb 'to call off' means to cancel an event. To delay or postpone is 'to put off'.",
            hintLadder: [
              "Do not confuse 'call off' with 'put off'.",
              "'Put off' means postpone, whereas 'call off' means abandon/cancel.",
              "Select 'Cancel completely'."
            ],
            misconceptionAlerts: [
              { trigger: "Postpone to next week", note: "'Put off' means postpone; 'call off' means cancel." }
            ],
            skillId: "skill-eng-phrasal-idioms",
            difficulty: "easy"
          },
          {
            id: "q-eng-idiom-2",
            type: "multiple_choice",
            questionText: "Select the most natural academic collocation:\n'The research scientists ______ a comprehensive survey to gather data on renewable energy adoption.'",
            options: ["conducted", "did", "fabricated", "performed"],
            correctAnswer: "conducted",
            explanation: "In formal academic English, the verb 'conduct' strongly collocates with 'a survey', 'an experiment', or 'research'.",
            hintLadder: [
              "Consider which verb sounds standard in research reports with 'a survey'.",
              "While 'did' is colloquial, 'conduct' is the standard academic pairing.",
              "Select 'conducted'."
            ],
            misconceptionAlerts: [
              { trigger: "did", note: "'did a survey' is informal and unsuited for standard academic syntax." }
            ],
            skillId: "skill-eng-phrasal-idioms",
            difficulty: "medium"
          },
          {
            id: "q-eng-idiom-3",
            type: "multiple_choice",
            questionText: "What is the idiomatic meaning of 'to burn the midnight oil'?",
            options: [
              "To work or study late into the night",
              "To waste valuable fuel unnecessarily",
              "To act recklessly and cause a fire hazard",
              "To achieve a breakthrough through luck"
            ],
            correctAnswer: "To work or study late into the night",
            explanation: "'To burn the midnight oil' originates from the historical use of oil lamps to study or labor late into the night before examinations or deadlines.",
            hintLadder: [
              "Reflect on what student oil lamps were used for in the night.",
              "It refers to rigorous study or labor after standard working hours.",
              "Select 'To work or study late into the night'."
            ],
            misconceptionAlerts: [
              { trigger: "To waste valuable fuel unnecessarily", note: "Literal interpretation trap. Idioms carry figurative cultural meanings." }
            ],
            skillId: "skill-eng-phrasal-idioms",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-reading-comprehension",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Reading Comprehension, Rhetorical Synthesis & Critical Inference",
    code: "ENG-UNIT-03",
    description: "Main idea identification, distinguishing explicit facts from implicit inferences, analyzing author tone/attitude, and identifying literary figures of speech.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-eng-inference-tone",
        unitId: "unit-eng-reading-comprehension",
        title: "Main Idea, Tone & Critical Inference Extraction",
        code: "SKL-ENG-205",
        summary: "Analyzing complex informational and argumentative passages to synthesize implicit author perspectives and structural arguments.",
        objectives: [
          "Distinguish primary central theses from secondary supporting evidence in expository texts",
          "Identify the author's tone (objective, cynical, impassioned, didactic, satirical)",
          "Draw logically defensible deductive inferences strictly grounded in textual evidence"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-comp-1",
            type: "multiple_choice",
            questionText: "Read the excerpt:\n'While algorithmic social feeds promised universal democratization of knowledge, they have instead forged hyper-polarized echo chambers where sensationalism outranks verifiability.'\nWhat is the primary attitude of the author toward algorithmic feeds?",
            options: ["Critical and disillusioned", "Enthusiastic and optimistic", "Indifferent and neutral", "Celebratory and nostalgic"],
            correctAnswer: "Critical and disillusioned",
            explanation: "The contrast between what feeds 'promised' and what they 'instead forged' (polarized echo chambers, sensationalism) conveys a tone of disappointment, critique, and disillusionment.",
            hintLadder: [
              "Notice the contrast words: 'While... promised... instead forged'.",
              "Look at the negative connotation terms: 'hyper-polarized', 'echo chambers', 'sensationalism'.",
              "The author is highlighting failed promises with sharp criticism."
            ],
            misconceptionAlerts: [
              { trigger: "Indifferent and neutral", note: "The emotive words 'hyper-polarized' and 'echo chambers' demonstrate clear critical judgment rather than neutrality." }
            ],
            skillId: "skill-eng-inference-tone",
            difficulty: "medium"
          },
          {
            id: "q-eng-comp-2",
            type: "multiple_choice",
            questionText: "What logical inference is most strongly supported by the statement:\n'Countries that invested heavily in foundational teacher training saw greater literacy gains than those that merely distributed tablet computers without pedagogy overhaul.'?",
            options: [
              "Pedagogical competence of instructors is more pivotal to literacy than hardware alone.",
              "Digital tablets always hinder educational outcomes regardless of context.",
              "Teacher training eliminates the need for any physical or digital learning resources.",
              "Literacy cannot be measured reliably in developing economies."
            ],
            correctAnswer: "Pedagogical competence of instructors is more pivotal to literacy than hardware alone.",
            explanation: "The comparison highlights that investing in teacher training yielded superior outcomes compared to distributing hardware in isolation, showing pedagogy's superior role.",
            hintLadder: [
              "Compare the two investment strategies mentioned.",
              "Teacher training produced greater literacy gains than hardware without pedagogy.",
              "Conclude that skilled teaching is the core driver of literacy."
            ],
            misconceptionAlerts: [
              { trigger: "Digital tablets always hinder educational outcomes regardless of context.", note: "Extreme claim trap: The passage does not say tablets hinder learning, only that hardware alone without pedagogy is insufficient." }
            ],
            skillId: "skill-eng-inference-tone",
            difficulty: "medium"
          },
          {
            id: "q-eng-comp-3",
            type: "multiple_choice",
            questionText: "Which statement best articulates a text's 'Topic Sentence' in an academic paragraph?",
            options: [
              "The sentence that introduces the main overarching controlling idea of the paragraph.",
              "The longest compound sentence containing multiple supporting statistical citations.",
              "The final sentence that always repeats the title verbatim.",
              "A transitional phrase that introduces counter-arguments only."
            ],
            correctAnswer: "The sentence that introduces the main overarching controlling idea of the paragraph.",
            explanation: "In academic paragraph structure, the topic sentence states the central controlling claim that all subsequent sentences develop with evidence and explanation.",
            hintLadder: [
              "Recall the role of a topic sentence.",
              "It expresses the primary concept that the paragraph expands.",
              "Select the choice identifying the central controlling idea."
            ],
            misconceptionAlerts: [
              { trigger: "The longest compound sentence containing multiple supporting statistical citations.", note: "Length and citations do not define a topic sentence; thematic controlling scope does." }
            ],
            skillId: "skill-eng-inference-tone",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-eng-figures-of-speech",
        unitId: "unit-eng-reading-comprehension",
        title: "Figurative Language, Literary Devices & Rhetoric",
        code: "SKL-ENG-206",
        summary: "Identifying similes, metaphors, personification, hyperbole, irony, oxymorons, and rhetorical devices in text.",
        objectives: [
          "Differentiate direct metaphors from comparative similes",
          "Identify situational, dramatic, and verbal irony in literary excerpts",
          "Analyze rhetorical appeals (ethos, pathos, logos) in persuasive speech"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-lit-1",
            type: "multiple_choice",
            questionText: "Identify the figure of speech used in the sentence:\n'The ancient oak tree groaned and stretched its weary wooden arms against the howling midnight gale.'",
            options: ["Personification", "Metonymy", "Hyperbole", "Oxymoron"],
            correctAnswer: "Personification",
            explanation: "Attributing human actions and emotions ('groaned', 'stretched weary arms') to an inanimate non-human entity (the oak tree) is personification.",
            hintLadder: [
              "Look at the verbs: 'groaned', 'stretched arms'.",
              "Trees do not possess human vocal cords or conscious arms.",
              "Assigning human traits to nature is personification."
            ],
            misconceptionAlerts: [
              { trigger: "Hyperbole", note: "While poetic, the primary device is human animation of a tree (personification)." }
            ],
            skillId: "skill-eng-figures-of-speech",
            difficulty: "easy"
          },
          {
            id: "q-eng-lit-2",
            type: "multiple_choice",
            questionText: "Which of the following phrases represents an Oxymoron?",
            options: [
              "A deafening silence enveloped the courtroom.",
              "Her smile was as radiant as the morning dawn.",
              "He has a heart of solid gold.",
              "The wind whistled through the corridor."
            ],
            correctAnswer: "A deafening silence enveloped the courtroom.",
            explanation: "An oxymoron places two seemingly contradictory or opposite terms side-by-side to reveal a striking truth ('deafening' + 'silence').",
            hintLadder: [
              "Look for two adjacent words that are direct opposites.",
              "'Deafening' (extremely loud) and 'silence' (absence of sound) contradict each other directly.",
              "Select 'A deafening silence'."
            ],
            misconceptionAlerts: [
              { trigger: "Her smile was as radiant as the morning dawn.", note: "This is a simile because it uses 'as... as'." }
            ],
            skillId: "skill-eng-figures-of-speech",
            difficulty: "medium"
          },
          {
            id: "q-eng-lit-3",
            type: "multiple_choice",
            questionText: "A fire station catching fire and burning down while firefighters are away is an example of:",
            options: ["Situational Irony", "Verbal Irony", "Sarcasm", "Litotes"],
            correctAnswer: "Situational Irony",
            explanation: "Situational irony occurs when the actual outcome of an event is starkly opposite to what was logically and reasonably expected (a place built to extinguish fires being destroyed by fire).",
            hintLadder: [
              "Consider what a fire station exists to do: put out fires.",
              "When the opposite occurs in reality, it is situational irony.",
              "Select 'Situational Irony'."
            ],
            misconceptionAlerts: [
              { trigger: "Verbal Irony", note: "Verbal irony involves spoken statements where words mean the opposite of their literal sense; this is an event in reality." }
            ],
            skillId: "skill-eng-figures-of-speech",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-oral-phonetics",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Oral English, Phonetics & Syllabic Stress Patterns",
    code: "ENG-UNIT-04",
    description: "Vowel and consonant sound contrasts (IPA), silent letters, syllable division, primary stress placement in multisyllabic words, and intonation.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-eng-vowels-consonants",
        unitId: "unit-eng-oral-phonetics",
        title: "Monophthongs, Diphthongs & Consonant Contrasts",
        code: "SKL-ENG-207",
        summary: "Differentiating long vs short vowel phonemes, diphthongs, and voiced vs voiceless consonant fricatives.",
        objectives: [
          "Distinguish short /ɪ/ from long /iː/ and short /ʊ/ from long /uː/ phonemes",
          "Identify words containing identical vowel sounds despite differing orthographic spellings",
          "Recognize silent consonant letters in words like 'debt', 'subtle', 'plumber', 'knight'"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-sound-1",
            type: "multiple_choice",
            questionText: "Choose the word that has the SAME vowel sound as the underlined sound in 's<u>ee</u>d' (/iː/):",
            options: ["Key", "Sit", "Head", "Threat"],
            correctAnswer: "Key",
            explanation: "'Key' is pronounced /kiː/, possessing the identical long close front unrounded vowel /iː/ found in 'seed' /siːd/. 'Sit' is /sɪt/, 'head' is /hed/.",
            hintLadder: [
              "Pronounce 'seed' and observe the long /iː/ sound.",
              "Compare 'key' (/kiː/), 'sit' (/sɪt/), 'head' (/hed/).",
              "'Key' matches the /iː/ sound in 'seed'."
            ],
            misconceptionAlerts: [
              { trigger: "Sit", note: "'Sit' has the short vowel /ɪ/, not the long vowel /iː/." }
            ],
            skillId: "skill-eng-vowels-consonants",
            difficulty: "medium"
          },
          {
            id: "q-eng-sound-2",
            type: "multiple_choice",
            questionText: "Which word contains a SILENT letter 'b'?",
            options: ["Doubt", "Cabbage", "Robber", "Timber"],
            correctAnswer: "Doubt",
            explanation: "In 'doubt' /daʊt/ and 'debt' /det/, the letter 'b' is silent. In 'cabbage', 'robber', and 'timber', the 'b' is fully articulated.",
            hintLadder: [
              "Pronounce each word carefully.",
              "Notice that in 'doubt', the 'b' is not pronounced (rhymes with 'out').",
              "Select 'Doubt'."
            ],
            misconceptionAlerts: [
              { trigger: "Timber", note: "The 'b' in 'timber' is pronounced (/ˈtɪm.bər/)." }
            ],
            skillId: "skill-eng-vowels-consonants",
            difficulty: "easy"
          },
          {
            id: "q-eng-sound-3",
            type: "multiple_choice",
            questionText: "Which word contains the voiceless dental fricative sound /θ/ (as in '<u>th</u>ink')?",
            options: ["Theme", "This", "Mother", "Weather"],
            correctAnswer: "Theme",
            explanation: "'Theme' begins with the voiceless dental fricative /θ/, while 'this', 'mother', and 'weather' use the voiced dental fricative /ð/.",
            hintLadder: [
              "Place your fingers gently on your vocal cords (throat).",
              "In 'theme', no vocal cord vibration occurs at the start (/θ/). In 'this', the vocal cords vibrate (/ð/).",
              "Select 'Theme'."
            ],
            misconceptionAlerts: [
              { trigger: "This", note: "'This' begins with voiced /ð/, where your vocal cords vibrate." }
            ],
            skillId: "skill-eng-vowels-consonants",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "skill-eng-stress-intonation",
        unitId: "unit-eng-oral-phonetics",
        title: "Syllable Stress Patterns & Emphatic Intonation",
        code: "SKL-ENG-208",
        summary: "Determining primary lexical stress in multisyllabic nouns, verbs, and words with characteristic affixes.",
        objectives: [
          "Apply stress shift rules between two-syllable noun/verb homographs ('RE-cord' noun vs 're-CORD' verb)",
          "Determine primary stress on words ending with '-tion', '-ic', '-ity', and '-graphy'",
          "Interpret how sentence-level emphatic stress alters communicative meaning"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-stress-1",
            type: "multiple_choice",
            questionText: "In the sentence 'The university will re-cord the official athletic record', where does the primary stress fall on the underlined VERB 'record'?",
            options: [
              "On the second syllable (re-CORD)",
              "On the first syllable (RE-cord)",
              "Equally on both syllables",
              "On neither syllable"
            ],
            correctAnswer: "On the second syllable (re-CORD)",
            explanation: "In English two-syllable noun/verb homographs, the noun typically takes primary stress on the first syllable (RE-cord), while the verb takes stress on the second syllable (re-CORD).",
            hintLadder: [
              "Recall the noun vs verb stress shift rule for two-syllable words.",
              "Nouns: stress on 1st syllable (PRE-sent, RE-cord, EX-port).",
              "Verbs: stress on 2nd syllable (pre-SENT, re-CORD, ex-PORT)."
            ],
            misconceptionAlerts: [
              { trigger: "On the first syllable (RE-cord)", note: "'RE-cord' is the noun form; the verb is stressed on the second syllable." }
            ],
            skillId: "skill-eng-stress-intonation",
            difficulty: "medium"
          },
          {
            id: "q-eng-stress-2",
            type: "multiple_choice",
            questionText: "Where does the primary lexical stress fall in the four-syllable word 'E-CO-NO-MIC'?",
            options: [
              "On the third syllable (eco-NO-mic)",
              "On the first syllable (E-conomic)",
              "On the second syllable (e-CO-nomic)",
              "On the fourth syllable (econom-IC)"
            ],
            correctAnswer: "On the third syllable (eco-NO-mic)",
            explanation: "Words ending with the suffix '-ic' place primary stress on the penultimate (second-to-last) syllable: e-co-NO-mic (/ˌiː.kəˈnɒm.ɪk/).",
            hintLadder: [
              "Look at the word ending: '-ic'.",
              "Suffixes ending in '-ic' place primary stress on the syllable immediately preceding '-ic'.",
              "e-co-NO-mic (3rd syllable)."
            ],
            misconceptionAlerts: [
              { trigger: "On the second syllable (e-CO-nomic)", note: "You are thinking of 'e-CO-no-my'; adding '-ic' shifts stress to 'eco-NO-mic'." }
            ],
            skillId: "skill-eng-stress-intonation",
            difficulty: "medium"
          },
          {
            id: "q-eng-stress-3",
            type: "multiple_choice",
            questionText: "If emphatic stress is placed on the word 'SHE' in '<u>SHE</u> didn't take the laboratory key', what is the implied meaning?",
            options: [
              "Someone else took the key, not her.",
              "She took something else, but not the key.",
              "She definitely took the key, despite her denial.",
              "She returned the key immediately."
            ],
            correctAnswer: "Someone else took the key, not her.",
            explanation: "Placing emphatic spoken stress on 'SHE' singles out the actor, contrasting her with another person who was the true culprit who took the key.",
            hintLadder: [
              "Emphatic stress highlights the specific element of truth or contrast in the sentence.",
              "Stressing 'SHE' contrasts the female subject with other people.",
              "Meaning: 'Another person took it, not her'."
            ],
            misconceptionAlerts: [
              { trigger: "She took something else, but not the key.", note: "That meaning is conveyed by stressing 'KEY', not 'SHE'." }
            ],
            skillId: "skill-eng-stress-intonation",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-parts-of-speech",
    subjectId: "lang_english",
    level: "upper_primary",
    title: "Grammatical Word Classes & Morphological Functions",
    code: "ENG-POS-01",
    description: "Systematic classification of parts of speech, pronoun cases, functional conversion of adverbs and adjectives, and prepositions in context.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-eng-word-classes",
        unitId: "unit-eng-parts-of-speech",
        title: "Word Classes, Pronoun Cases & Syntactic Functions",
        code: "SKL-ENG-POS-101",
        summary: "Identifying grammatical functions of nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.",
        objectives: [
          "Distinguish subjective, objective, and possessive pronoun forms in compound structures",
          "Identify words that alter grammatical class according to contextual syntactic function",
          "Select appropriate prepositional phrases and relative pronouns in complex sentences"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-eng-pos-1",
            type: "multiple_choice",
            questionText: "Choose the grammatically correct pronoun to complete the sentence:\n'Between you and ______, the executive council made a premature decision.'",
            options: ["me", "I", "myself", "he"],
            correctAnswer: "me",
            explanation: "'Between' is a preposition, and prepositions govern the objective case of pronouns ('between you and me'). 'I' is subjective and grammatically incorrect here.",
            hintLadder: [
              "Identify the word preceding the pronouns: 'Between'.",
              "'Between' is a preposition and requires an objective pronoun.",
              "The objective form of the first-person singular pronoun is 'me' (not 'I')."
            ],
            misconceptionAlerts: [
              { trigger: "I", note: "Hypercorrection error: 'between you and I' is a common colloquial mistake; prepositions always take objective case pronouns ('me')." },
              { trigger: "myself", note: "Reflexive pronouns like 'myself' require a coreferential antecedent in the same clause." }
            ],
            skillId: "skill-eng-word-classes",
            difficulty: "easy"
          },
          {
            id: "q-eng-pos-2",
            type: "multiple_choice",
            questionText: "In the sentence 'The express train arrived late, but the engineers worked <u>fast</u> to restore the electrical grid', what part of speech is the underlined word 'fast'?",
            options: ["Adverb modifying the verb 'worked'", "Adjective modifying the noun 'engineers'", "Conjunction linking two independent clauses", "Noun functioning as the direct object"],
            correctAnswer: "Adverb modifying the verb 'worked'",
            explanation: "In this context, 'fast' describes the manner in which the engineers performed the action 'worked'. Words modifying verbs are adverbs.",
            hintLadder: [
              "Determine which word 'fast' describes or modifies in the clause.",
              "'Fast' tells us how they 'worked'.",
              "A word that modifies a verb to describe manner is an adverb."
            ],
            misconceptionAlerts: [
              { trigger: "Adjective modifying the noun 'engineers'", note: "'Fast' does not describe the engineers directly (e.g. 'fast runners'); it modifies the verb 'worked'." }
            ],
            skillId: "skill-eng-word-classes",
            difficulty: "medium"
          },
          {
            id: "q-eng-pos-3",
            type: "multiple_choice",
            questionText: "Choose the correct relative pronoun to complete the sentence:\n'The epidemiologist ______ groundbreaking research eradicated the waterborne outbreak was honored internationally.'",
            options: ["whose", "whom", "who", "which"],
            correctAnswer: "whose",
            explanation: "'Whose' is the possessive relative pronoun indicating ownership of the 'groundbreaking research' by the epidemiologist.",
            hintLadder: [
              "Notice the relationship between 'The epidemiologist' and 'groundbreaking research'.",
              "It expresses possession (the research belongs to / was produced by the epidemiologist).",
              "The relative pronoun expressing possession for persons is 'whose'."
            ],
            misconceptionAlerts: [
              { trigger: "whom", note: "'Whom' is the objective form, but this clause requires a possessive determiner before 'research'." },
              { trigger: "which", note: "'Which' is reserved for inanimate objects or animals, not human professionals." }
            ],
            skillId: "skill-eng-word-classes",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-sentence-structure-syntax",
    subjectId: "lang_english",
    level: "junior_secondary",
    title: "Clauses, Sentence Types & Voice Transformations",
    code: "ENG-SYN-02",
    description: "Independent and dependent clauses, coordinating and subordinating conjunctions, sentence structure types, and active-to-passive voice transformations.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-eng-clauses-sentence-types",
        unitId: "unit-eng-sentence-structure-syntax",
        title: "Clause Classification, Subordination & Active/Passive Voice Transformations",
        code: "SKL-ENG-SYN-201",
        summary: "Analyzing simple, compound, complex, and compound-complex sentences, and transforming active voice to passive voice.",
        objectives: [
          "Differentiate independent clauses from noun, adjectival, and adverbial dependent clauses",
          "Classify sentence structures into simple, compound, complex, and compound-complex categories",
          "Convert sentences from active voice to passive voice while preserving grammatical tense and aspect"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-eng-concord"],
        questions: [
          {
            id: "q-eng-syn-1",
            type: "multiple_choice",
            questionText: "Transform the active sentence into the correct passive voice construction:\n'The torrential downpour destroyed several bridges across the municipal river.'",
            options: [
              "Several bridges across the municipal river were destroyed by the torrential downpour.",
              "Several bridges across the municipal river have been destroyed by the torrential downpour.",
              "Several bridges across the municipal river was destroyed by the torrential downpour.",
              "Several bridges across the municipal river had been destroyed by the torrential downpour."
            ],
            correctAnswer: "Several bridges across the municipal river were destroyed by the torrential downpour.",
            explanation: "The original active sentence is simple past ('destroyed'). In passive voice, simple past uses 'was/were + past participle'. The plural subject 'several bridges' takes 'were destroyed'.",
            hintLadder: [
              "Identify the object of the active verb: 'several bridges' (plural).",
              "Identify the tense of the active verb 'destroyed': simple past.",
              "Combine the plural past auxiliary 'were' with past participle 'destroyed': 'were destroyed'."
            ],
            misconceptionAlerts: [
              { trigger: "Several bridges across the municipal river was destroyed by the torrential downpour.", note: "Subject-verb concord error: 'bridges' is plural and requires 'were', not 'was'." },
              { trigger: "Several bridges across the municipal river have been destroyed by the torrential downpour.", note: "Tense shift error: 'have been destroyed' is present perfect, whereas the original was simple past." }
            ],
            skillId: "skill-eng-clauses-sentence-types",
            difficulty: "medium"
          },
          {
            id: "q-eng-syn-2",
            type: "multiple_choice",
            questionText: "Classify the following sentence structure:\n'Although the power outage disrupted the laboratory experiment, the standby backup generators activated immediately, and the scientists salvaged their research samples.'",
            options: [
              "Compound-complex sentence",
              "Complex sentence",
              "Compound sentence",
              "Simple sentence"
            ],
            correctAnswer: "Compound-complex sentence",
            explanation: "The sentence contains one dependent clause ('Although the power outage disrupted the laboratory experiment') and two independent clauses joined by coordinating conjunction 'and' ('the standby backup generators activated immediately' and 'the scientists salvaged their research samples'). This is the exact definition of a compound-complex sentence.",
            hintLadder: [
              "Count the independent clauses that can stand alone as complete sentences (there are 2: 'the standby generators activated...' and 'the scientists salvaged...').",
              "Count the dependent clauses introduced by subordinating conjunctions (1: 'Although the power outage...').",
              "A sentence with at least two independent clauses and at least one dependent clause is compound-complex."
            ],
            misconceptionAlerts: [
              { trigger: "Complex sentence", note: "A complex sentence has only ONE independent clause and one or more dependent clauses. Here there are TWO independent clauses linked by 'and'." }
            ],
            skillId: "skill-eng-clauses-sentence-types",
            difficulty: "hard"
          },
          {
            id: "q-eng-syn-3",
            type: "multiple_choice",
            questionText: "In the sentence 'The medical team will commence the surgical procedure <u>as soon as the anesthesia takes full effect</u>', the underlined clause is an adverbial clause of:",
            options: [
              "Time",
              "Condition",
              "Reason",
              "Manner"
            ],
            correctAnswer: "Time",
            explanation: "'As soon as' is a subordinating conjunction of time that indicates the temporal juncture when the main action ('commence the surgical procedure') will happen.",
            hintLadder: [
              "Examine the subordinating conjunction: 'as soon as'.",
              "Does it answer when, why, how, or under what hypothetical condition the surgery will begin?",
              "It specifies the time of the event, so it is an adverbial clause of time."
            ],
            misconceptionAlerts: [
              { trigger: "Condition", note: "Clauses of condition are typically introduced by 'if', 'unless', or 'provided that'. 'As soon as' specifies chronological time." }
            ],
            skillId: "skill-eng-clauses-sentence-types",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-summary-discourse",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Summary Writing, Paraphrasing & Discourse Cohesion",
    code: "ENG-SUM-03",
    description: "Techniques for condensing prose, identifying thesis statements, eliminating superfluous examples, paraphrasing without plagiarism, and using discourse markers.",
    order: 6,
    category: "exam_focus",
    skills: [
      {
        id: "skill-eng-summary-condensation",
        unitId: "unit-eng-summary-discourse",
        title: "Summary Techniques, Paraphrasing & Discourse Markers",
        code: "SKL-ENG-SUM-301",
        summary: "Extracting primary arguments, discarding illustrative anecdotes and digressions, and synthesizing core ideas using cohesive transitional devices.",
        objectives: [
          "Extract the central thesis sentence and primary supporting claims from dense informational prose",
          "Paraphrase complex claims using original syntax while preserving exact denotative meaning",
          "Select logical discourse markers (adversative, causal, additive, concessive) to create textual cohesion"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-eng-inference-tone"],
        questions: [
          {
            id: "q-eng-sum-1",
            type: "multiple_choice",
            questionText: "Read the excerpt:\n'While critics contend that automation inevitably leads to widespread technological unemployment, historical evidence indicates that technological revolutions create new industrial sectors, shift labor into higher-value analytical roles, and ultimately expand aggregate employment over time.'\nWhich statement best summarizes the author's primary argument?",
            options: [
              "Technological automation ultimately stimulates long-term employment growth by creating new industries and higher-value roles.",
              "Technological revolutions immediately eliminate existing employment opportunities across all manual labor sectors.",
              "Critics are correct in asserting that automation reduces the overall workforce permanently.",
              "Industrial revolutions fail to adapt labor forces to analytical responsibilities."
            ],
            correctAnswer: "Technological automation ultimately stimulates long-term employment growth by creating new industries and higher-value roles.",
            explanation: "The author acknowledges critics in the concessive clause ('While critics contend...'), but the main independent clause asserts that history shows technology creates new sectors and expands employment over time.",
            hintLadder: [
              "Locate the main independent clause: 'historical evidence indicates that technological revolutions create new industrial sectors... and expand aggregate employment'.",
              "The first clause is merely a counter-perspective acknowledged by the author.",
              "The summary must capture the author's affirmative conclusion about job growth."
            ],
            misconceptionAlerts: [
              { trigger: "Critics are correct in asserting that automation reduces the overall workforce permanently.", note: "The author explicitly disputes the critics' assertion using historical evidence." }
            ],
            skillId: "skill-eng-summary-condensation",
            difficulty: "medium"
          },
          {
            id: "q-eng-sum-2",
            type: "multiple_choice",
            questionText: "Choose the appropriate discourse transition marker to show a concessive relationship:\n'The agricultural cooperative suffered an unprecedented three-month drought; ______, through efficient drip irrigation and drought-resistant seeds, crop yields remained remarkably high.'",
            options: [
              "nevertheless",
              "furthermore",
              "consequently",
              "likewise"
            ],
            correctAnswer: "nevertheless",
            explanation: "'Nevertheless' signals a concession or contrast: despite the extreme adversity of the drought, the farm achieved high crop yields.",
            hintLadder: [
              "Examine the relationship between drought (adverse factor) and high crop yields (unexpected positive outcome).",
              "This is a contrast/concession (in spite of X, Y occurred).",
              "The transition marker that conveys 'in spite of that' is 'nevertheless'."
            ],
            misconceptionAlerts: [
              { trigger: "consequently", note: "'Consequently' indicates a direct cause-and-effect result. High yields were not caused by the drought!" },
              { trigger: "furthermore", note: "'Furthermore' is additive, not contrasting." }
            ],
            skillId: "skill-eng-summary-condensation",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-eng-composition-writing",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "Essay Architecture, Paragraph Cohesion & Rhetorical Forms",
    code: "ENG-COMP-04",
    description: "Structure of formal and informal essays, topic sentences, supporting development, clincher sentences, rhetorical modes, and register conventions.",
    order: 7,
    category: "applied",
    skills: [
      {
        id: "skill-eng-rhetorical-writing-forms",
        unitId: "unit-eng-composition-writing",
        title: "Paragraph Cohesion, Argumentative Essays & Register Conventions",
        code: "SKL-ENG-COMP-301",
        summary: "Crafting structured expository and argumentative essays, eliminating irrelevant details, and selecting appropriate formal vs informal registers.",
        objectives: [
          "Construct cohesive paragraphs featuring a clear topic sentence, supporting data, and concluding clincher",
          "Identify and eliminate off-topic sentences that violate paragraph unity",
          "Apply formal register rules including objective tone, formal vocabulary, and standard salutations"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-eng-tenses-conditionals"],
        questions: [
          {
            id: "q-eng-comp-1",
            type: "multiple_choice",
            questionText: "Read the draft paragraph on solar energy:\n'(1) Solar photovoltaics represent an increasingly cost-effective solution for rural electrification across West Africa. (2) Advances in battery storage technology enable communities to maintain uninterrupted electrical power during nocturnal hours. (3) Many rural villagers enjoy traditional acoustic folk music during evening village gatherings. (4) Furthermore, decentralized mini-grids drastically reduce carbon emissions compared to diesel generators.'\nWhich sentence violates the unity and coherence of the paragraph?",
            options: [
              "Sentence (3)",
              "Sentence (2)",
              "Sentence (4)",
              "Sentence (1)"
            ],
            correctAnswer: "Sentence (3)",
            explanation: "The paragraph focuses strictly on the technological and economic viability of solar energy and mini-grids. Sentence (3) introduces an unrelated social detail regarding traditional acoustic folk music, destroying paragraph unity.",
            hintLadder: [
              "Identify the central topic of the paragraph: solar electrification and battery technology.",
              "Look for the sentence that deviates into an unrelated personal or cultural digression.",
              "Sentence (3) discusses musical preferences, which does not develop the topic of solar infrastructure."
            ],
            misconceptionAlerts: [
              { trigger: "Sentence (2)", note: "Sentence (2) directly supports the topic sentence by addressing battery storage for nocturnal power." }
            ],
            skillId: "skill-eng-rhetorical-writing-forms",
            difficulty: "easy"
          },
          {
            id: "q-eng-comp-2",
            type: "multiple_choice",
            questionText: "In a formal business letter addressed to an organization whose specific recipient name is unknown (e.g., 'The Director of Admissions'), what is the standard formal salutation and complementary close combination?",
            options: [
              "Dear Sir/Madam, ... Yours faithfully,",
              "Dear Friend, ... Yours sincerely,",
              "Hi Director, ... Best regards,",
              "To Whom It May Concern, ... Warmest wishes,"
            ],
            correctAnswer: "Dear Sir/Madam, ... Yours faithfully,",
            explanation: "In formal British and Commonwealth English correspondence, when the recipient's personal name is not known, the letter begins with 'Dear Sir/Madam' and concludes with the formal complementary close 'Yours faithfully'.",
            hintLadder: [
              "When you do NOT know the recipient's personal surname, standard formal etiquette pairs 'Dear Sir/Madam' with 'Yours faithfully'.",
              "'Yours sincerely' is reserved for when you address the recipient by name (e.g., 'Dear Dr. Mensah').",
              "Select the option featuring 'Dear Sir/Madam' and 'Yours faithfully'."
            ],
            misconceptionAlerts: [
              { trigger: "Dear Friend, ... Yours sincerely,", note: "Informal and inappropriate for professional correspondence with an admissions board." }
            ],
            skillId: "skill-eng-rhetorical-writing-forms",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

