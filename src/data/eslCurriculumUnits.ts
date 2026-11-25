/**
 * MOOS TECHY ACADEMY — ENGLISH AS A SECOND LANGUAGE (ESL) CURRICULUM REPOSITORY
 * 
 * Phase 19: Full-Scale ESL Curriculum Saturation
 * 
 * Aligned with CEFR Levels (A1, A2, B1, B2, C1) and International ESL Standards (IELTS, TOEFL, Cambridge ESOL, WAEC ESL)
 */

import { Unit } from "../types/curriculum";

export const ESL_CURRICULUM_UNITS: Unit[] = [
  {
    id: "unit-esl-phonetics-pronunciation",
    subjectId: "lang_english",
    level: "junior_secondary",
    title: "ESL Phonetics, Minimal Pairs & Spoken Intonation",
    code: "ESL-PHON-201",
    description: "Master phonemic vowel distinctions, dental fricatives, stress shifts in noun/verb heteronyms, and connected speech rhythm.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-esl-phonemes-vowels",
        unitId: "unit-esl-phonetics-pronunciation",
        title: "Vowel Quality: Short Lax vs Long Tense (/ɪ/ vs /iː/)",
        code: "SKL-ESL-101",
        summary: "Differentiating short lax vowels from long tense vowels in minimal pairs like ship/sheep, live/leave, and sit/seat.",
        objectives: [
          "Distinguish auditory contrast between lax /ɪ/ and tense /iː/",
          "Position the articulators accurately with relaxed tongue root for short vowels",
          "Apply minimal pair distinctions accurately in communicative spoken discourse"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-esl-vow-1",
            type: "multiple_choice",
            skillId: "skill-esl-minimal-pairs-vowels",
            difficulty: "easy",
            questionText: "Which word pair contains the minimal vowel contrast between short lax /ɪ/ and long tense /iː/?",
            options: [
              "Ship and Sheep",
              "Cat and Cut",
              "Pen and Pan",
              "Look and Luke"
            ],
            correctAnswer: "Ship and Sheep",
            explanation: "'Ship' features the short lax front unrounded vowel /ɪ/, whereas 'sheep' features the long tense front unrounded vowel /iː/.",
            hintLadder: [
              "Focus on how long you hold the vowel sound and the muscle tension in your lips.",
              "One word refers to a large sea vessel; the other is a woolly farm animal.",
              "Look for the pair with /ʃɪp/ and /ʃiːp/."
            ],
            misconceptionAlerts: [
              {
                trigger: "Vowel collapsing",
                note: "Learners whose native languages have five-vowel systems often collapse /ɪ/ and /iː/ into a single sound, leading to listener misunderstanding."
              }
            ]
          },
          {
            id: "q-esl-vow-2",
            type: "multiple_choice",
            skillId: "skill-esl-minimal-pairs-vowels",
            difficulty: "medium",
            questionText: "In the sentence: 'Please take a ______ in the waiting room before your interview', which word is grammatically and phonemically correct?",
            options: [
              "seat (with long tense /iː/)",
              "sit (with short lax /ɪ/)",
              "sat (with open /æ/)",
              "soot (with rounded /ʊ/)"
            ],
            correctAnswer: "seat (with long tense /iː/)",
            explanation: "The noun is 'seat' /siːt/, which requires the long tense vowel. 'Sit' is a verb with short lax /ɪ/ and cannot be preceded directly by the indefinite article 'a'.",
            hintLadder: [
              "Notice the determiner 'a' before the blank space, which requires a countable noun.",
              "'Sit' is the action verb, while 'seat' is the object/noun.",
              "Choose the noun pronounced with long /iː/."
            ],
            misconceptionAlerts: [
              {
                trigger: "Grammatical class confusion",
                note: "Confusing the noun 'seat' with the verb 'sit' due to vowel shortening in second-language speech."
              }
            ]
          },
          {
            id: "q-esl-vow-3",
            type: "multiple_choice",
            skillId: "skill-esl-minimal-pairs-vowels",
            difficulty: "hard",
            questionText: "What articulatory adjustment is required to transition from the vowel in 'bed' (/e/) to the vowel in 'bad' (/æ/)?",
            options: [
              "Lower the jaw and drop the tongue further down in the mouth",
              "Raise the tongue closer to the roof of the mouth",
              "Round the lips tightly into a circle",
              "Push air through the nasal cavity"
            ],
            correctAnswer: "Lower the jaw and drop the tongue further down in the mouth",
            explanation: "The phoneme /æ/ in 'bad' is an open front vowel, requiring the speaker to lower the mandible (jaw) and drop the tongue body lower than for the mid-vowel /e/ in 'bed'.",
            hintLadder: [
              "Pronounce 'bed' and then exaggerate the opening of your mouth for 'bad'.",
              "Notice how your chin moves downward when saying 'bad'.",
              "The tongue moves from mid-height to low/open position."
            ],
            misconceptionAlerts: [
              {
                trigger: "Vowel height reduction",
                note: "Second language speakers often produce /e/ for both words, making 'bad' sound identical to 'bed'."
              }
            ]
          }
        ]
      },
      {
        id: "skill-esl-fricatives-consonants",
        unitId: "unit-esl-phonetics-pronunciation",
        title: "Dental Fricatives & Plosives (/θ/, /ð/, /s/, /d/)",
        code: "SKL-ESL-102",
        summary: "Overcoming dental fricative substitution by placing the tongue tip between the teeth for 'think' (/θ/) and 'this' (/ð/).",
        objectives: [
          "Place tongue tip lightly between upper and lower incisors for dental fricatives",
          "Distinguish voiceless /θ/ (think, bath) from voiced /ð/ (this, breathe)",
          "Eliminate alveolar substitutions (/t/ for /θ/, /d/ for /ð/, /s/ for /θ/)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-esl-fric-1",
            type: "multiple_choice",
            skillId: "skill-esl-fricatives-consonants",
            difficulty: "easy",
            questionText: "Which word starts with the voiceless dental fricative /θ/?",
            options: [
              "Theory",
              "There",
              "Though",
              "These"
            ],
            correctAnswer: "Theory",
            explanation: "'Theory' begins with the voiceless dental fricative /θ/, where the vocal folds do not vibrate. 'There', 'though', and 'these' all begin with the voiced dental fricative /ð/.",
            hintLadder: [
              "Touch your vocal cords with your fingers while whispering the first sound.",
              "If your throat vibrates, the sound is voiced (/ð/). If it only feels like air, it is voiceless (/θ/).",
              "'Theory' has no vocal cord vibration on the 'th'."
            ],
            misconceptionAlerts: [
              {
                trigger: "Voicing generalization",
                note: "Assuming all words spelled with 'th' have the exact same voiced sound."
              }
            ]
          },
          {
            id: "q-esl-fric-2",
            type: "multiple_choice",
            skillId: "skill-esl-fricatives-consonants",
            difficulty: "medium",
            questionText: "Why is pronouncing 'three' as 'tree' or 'free' considered an articulatory substitution in ESL phonology?",
            options: [
              "Because it replaces the interdental fricative /θ/ with an alveolar stop /t/ or labiodental fricative /f/",
              "Because 'tree' is a longer word than 'three'",
              "Because numbers should only be pronounced with vowels",
              "Because 'tree' has a silent letter"
            ],
            correctAnswer: "Because it replaces the interdental fricative /θ/ with an alveolar stop /t/ or labiodental fricative /f/",
            explanation: "Substituting /t/ (plosive stop behind upper teeth) or /f/ (teeth against bottom lip) alters the manner and place of articulation away from the dental fricative /θ/, creating homophones with existing distinct words.",
            hintLadder: [
              "Identify which speech organs (teeth, tongue, lips) create each sound.",
              "/θ/ requires the tongue tip between the teeth, while /t/ taps the roof of the mouth.",
              "Select the linguistic explanation of place and manner of articulation."
            ],
            misconceptionAlerts: [
              {
                trigger: "Alveolar substitution",
                note: "Believing that /t/ and /θ/ are simply dialect variants rather than distinct phonemic targets in global English."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "unit-esl-collocations-vocabulary",
    subjectId: "lang_english",
    level: "senior_secondary",
    title: "ESL Contextual Collocations, Phrasal Verbs & False Friends",
    code: "ESL-VOC-301",
    description: "Develop native-like natural phrasing through high-frequency collocations, academic word list (AWL) usage, and eliminating L1 false friends.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    curriculumStandardMappings: ["CEFR_B2_C1", "IELTS_ACADEMIC", "WAEC_ESL", "CORE_SYLLABUS"],
    provenanceVersion: "2.0.0",
    skills: [
      {
        id: "skill-esl-verb-noun-collocations",
        unitId: "unit-esl-collocations-vocabulary",
        title: "High-Frequency Verb-Noun Collocations (Make vs Do, Take vs Have)",
        code: "SKL-ESL-201",
        summary: "Mastering natural pairings of action verbs with abstract nouns to eliminate unnatural literal translations.",
        objectives: [
          "Differentiate contexts requiring 'make' (creation, decisions) from 'do' (activities, duties, work)",
          "Use standard academic collocations: 'conduct research', 'draw a conclusion', 'raise an objection'",
          "Recognize and rectify L1 interference errors in everyday written and spoken English"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-eng-roots-affixes", "skill-esl-phonemes-vowels"],
        questions: [
          {
            id: "q-esl-colloc-1",
            type: "multiple_choice",
            skillId: "skill-esl-verb-noun-collocations",
            difficulty: "medium",
            questionText: "Select the sentence with the natural English collocation:",
            options: [
              "The research committee conducted an extensive investigation into the matter.",
              "The research committee made an extensive investigation into the matter.",
              "The research committee did an extensive investigation into the matter.",
              "The research committee played an extensive investigation into the matter."
            ],
            correctAnswer: "The research committee conducted an extensive investigation into the matter.",
            explanation: "In formal and academic English, investigations and research are 'conducted' or 'carried out', not 'made' or 'done'.",
            hintLadder: [
              "Look for the verb commonly paired with formal scientific and legal inquiry.",
              "'Make' and 'do' are informal and unnatural when paired with 'investigation'.",
              "The Academic Word List prefers 'conduct an investigation'."
            ],
            misconceptionAlerts: [
              {
                trigger: "The research committee made an extensive investigation into the matter.",
                note: "Directly translating a general action verb from L1 as 'make' produces non-idiomatic academic prose."
              }
            ]
          },
          {
            id: "q-esl-colloc-2",
            type: "multiple_choice",
            skillId: "skill-esl-verb-noun-collocations",
            difficulty: "easy",
            questionText: "Which phrase represents an authentic English collocation to describe substantial rainfall?",
            options: [
              "Heavy rain",
              "Strong rain",
              "Big rain",
              "Thick rain"
            ],
            correctAnswer: "Heavy rain",
            explanation: "In English, meteorological precipitation is described as 'heavy rain' or 'light rain', never 'strong rain' or 'big rain', despite adjectives like 'strong' being used for wind ('strong wind').",
            hintLadder: [
              "Rain uses weight terminology rather than physical size or muscle strength.",
              "Wind is 'strong', but rain is 'heavy'.",
              "Choose 'heavy rain'."
            ],
            misconceptionAlerts: [
              {
                trigger: "Strong rain",
                note: "Using 'strong rain' transfers L1 intensity adjectives directly; English pairs 'heavy' with rain and 'strong' with wind."
              }
            ]
          },
          {
            id: "q-esl-colloc-3",
            type: "multiple_choice",
            skillId: "skill-esl-verb-noun-collocations",
            difficulty: "easy",
            questionText: "Choose the correct verb to complete the standard academic and workplace sentence: 'Every candidate must ______ an earnest effort to verify their citations before submission.'",
            options: [
              "make",
              "do",
              "perform",
              "work"
            ],
            correctAnswer: "make",
            explanation: "The abstract noun 'effort' collocates strictly with 'make' ('make an effort', 'make an earnest effort'), whereas 'homework' and 'research' pair with 'do'.",
            hintLadder: [
              "Test whether 'effort' represents a routine chore ('do') or an intentional exertion/outcome ('make').",
              "Native speakers consistently say 'make an effort', 'make a decision', and 'make progress'.",
              "Select 'make'."
            ],
            misconceptionAlerts: [
              {
                trigger: "do",
                note: "Remember: you 'do homework' and 'do research', but you 'make an effort' and 'make progress'."
              }
            ]
          },
          {
            id: "q-esl-colloc-4",
            type: "multiple_choice",
            skillId: "skill-esl-verb-noun-collocations",
            difficulty: "medium",
            questionText: "Which sentence uses the formal Academic Word List (AWL) collocation correctly to express inferring a result from experimental evidence?",
            options: [
              "From the longitudinal dataset, the statisticians drew a cautious conclusion regarding seasonal variance.",
              "From the longitudinal dataset, the statisticians pulled a cautious conclusion regarding seasonal variance.",
              "From the longitudinal dataset, the statisticians did a cautious conclusion regarding seasonal variance.",
              "From the longitudinal dataset, the statisticians said a cautious conclusion regarding seasonal variance."
            ],
            correctAnswer: "From the longitudinal dataset, the statisticians drew a cautious conclusion regarding seasonal variance.",
            explanation: "Standard academic English collocates 'conclusion' with 'draw' ('draw a conclusion') or 'reach' ('reach a conclusion'), never 'pull', 'do', or 'say'.",
            hintLadder: [
              "Recall the formal verb paired with 'a conclusion' in scientific reports.",
              "Although 'draw' and 'pull' share physical meanings, only 'draw' partners idiomatically with 'conclusion'.",
              "Choose 'drew a cautious conclusion'."
            ],
            misconceptionAlerts: [
              {
                trigger: "From the longitudinal dataset, the statisticians pulled a cautious conclusion regarding seasonal variance.",
                note: "Synonym substitution fails in fixed collocations: you 'draw' a conclusion, never 'pull' one."
              }
            ]
          },
          {
            id: "q-esl-colloc-5",
            type: "multiple_choice",
            skillId: "skill-esl-verb-noun-collocations",
            difficulty: "hard",
            questionText: "Identify the sentence that avoids BOTH a false-friend transfer error and a broken intensifier collocation:",
            options: [
              "The director was bitterly disappointed that the seminar was postponed despite heavy traffic warnings.",
              "The director was sourly disappointed that the seminar was assisted despite strong traffic warnings.",
              "The director was deeply sad that the conference was assisted despite big traffic warnings.",
              "The director was hardly disappointed that the seminar was postponed despite tall traffic warnings."
            ],
            correctAnswer: "The director was bitterly disappointed that the seminar was postponed despite heavy traffic warnings.",
            explanation: "'Bitterly disappointed' and 'heavy traffic' are canonical English intensifier collocations, and 'postponed' avoids the false friend 'assisted' (often misused for 'attended').",
            hintLadder: [
              "Check the adverb that conventionally intensifies 'disappointed' ('bitterly' or 'deeply', never 'sourly' or 'hardly').",
              "Check the adjective that collocates with 'traffic' ('heavy traffic', not 'strong' or 'big').",
              "Select the sentence with 'bitterly disappointed' and 'heavy traffic'."
            ],
            misconceptionAlerts: [
              {
                trigger: "The director was sourly disappointed that the seminar was assisted despite strong traffic warnings.",
                note: "'Sourly disappointed' and 'strong traffic' are unidiomatic, and 'assist' means to help—not to attend."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "unit-esl-academic-discourse-writing",
    subjectId: "lang_english",
    level: "university_prep",
    title: "ESL Academic Discourse, Cohesive Devices & Essay Architecture",
    code: "ESL-ACAD-401",
    description: "Write rigorous analytical essays with complex sentence subordination, concessive clauses, formal register, and evidence synthesis.",
    order: 3,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    curriculumStandardMappings: ["CEFR_C1", "IELTS_WRITING_TASK2", "TOEFL_IBT", "WAEC_ESL"],
    provenanceVersion: "2.0.0",
    skills: [
      {
        id: "skill-esl-cohesive-transitions",
        unitId: "unit-esl-academic-discourse-writing",
        title: "Discourse Markers, Concessive Clauses & Paragraph Cohesion",
        code: "SKL-ESL-301",
        summary: "Employing transitional devices to balance evidence, introduce concessions, and advance structured academic arguments.",
        objectives: [
          "Deploy concessive discourse markers (notwithstanding, whereas, although, despite)",
          "Link subordinate clauses without creating comma splices or run-on sentences",
          "Synthesize conflicting scholarly perspectives with appropriate hedging language"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-eng-clauses-sentence-types", "skill-esl-verb-noun-collocations"],
        questions: [
          {
            id: "q-esl-acad-1",
            type: "multiple_choice",
            skillId: "skill-esl-cohesive-transitions",
            difficulty: "hard",
            questionText: "Identify the sentence that correctly utilizes a concessive discourse marker to link contrasting scientific findings:",
            options: [
              "Notwithstanding the initial sample size limitations, the longitudinal trial demonstrated statistically significant efficacy.",
              "Although the initial sample size was limited, but the trial showed efficacy.",
              "Despite of the initial sample size, the trial was successful.",
              "In spite that the sample size was small, the trial worked."
            ],
            correctAnswer: "Notwithstanding the initial sample size limitations, the longitudinal trial demonstrated statistically significant efficacy.",
            explanation: "'Notwithstanding' is followed by a noun phrase without requiring 'but'. In English, 'Although' cannot be paired with 'but' in the same sentence, and 'despite' does not take 'of'.",
            hintLadder: [
              "Avoid the double-conjunction trap: never use 'although... but...' in a single sentence.",
              "Remember that 'despite' is followed directly by a noun, never by 'of'.",
              "Select the formal C1 register sentence starting with 'Notwithstanding'."
            ],
            misconceptionAlerts: [
              {
                trigger: "Although the initial sample size was limited, but the trial showed efficacy.",
                note: "Writing 'Although... but...' due to direct transfer from languages that use two coordinating markers for contrast."
              }
            ]
          },
          {
            id: "q-esl-acad-2",
            type: "multiple_choice",
            skillId: "skill-esl-cohesive-transitions",
            difficulty: "medium",
            questionText: "What is the primary function of 'hedging' language in academic ESL writing (e.g., 'the data suggests that', 'may indicate')?",
            options: [
              "To demonstrate appropriate scientific caution and avoid overgeneralized absolute claims",
              "To confuse the reader and hide incomplete experimental data",
              "To make the essay longer in order to meet the required word count",
              "To indicate that the author does not believe their own research"
            ],
            correctAnswer: "To demonstrate appropriate scientific caution and avoid overgeneralized absolute claims",
            explanation: "Academic English values intellectual precision and epistemic humility; hedging devices (tentative modals like 'may', 'could', 'suggest') prevent unwarranted absolute claims that could be falsified.",
            hintLadder: [
              "Think about why a scientist says 'the data suggests' rather than 'this proves without any doubt'.",
              "Hedging protects the author from making dogmatic, unsubstantiated assertions.",
              "Choose the option referencing scientific caution and avoiding overgeneralization."
            ],
            misconceptionAlerts: [
              {
                trigger: "To indicate that the author does not believe their own research",
                note: "Assuming that using words like 'may' or 'suggests' reflects weak knowledge rather than scholarly precision."
              }
            ]
          },
          {
            id: "q-esl-acad-3",
            type: "multiple_choice",
            skillId: "skill-esl-cohesive-transitions",
            difficulty: "easy",
            questionText: "Which option correctly completes this concessive sentence without a grammatical error: '______ the strict deadline, the engineering students submitted a thoroughly documented prototype.'?",
            options: [
              "Despite",
              "Despite of",
              "Although",
              "Whereas"
            ],
            correctAnswer: "Despite",
            explanation: "'the strict deadline' is a noun phrase (no finite verb), so it requires the preposition 'Despite' (or 'In spite of'). 'Although' and 'Whereas' require a full clause with a finite verb, and 'Despite of' is ungrammatical.",
            hintLadder: [
              "Inspect what follows the blank: 'the strict deadline' is a noun phrase, not a full subject + verb clause.",
              "Subordinating conjunctions like 'Although' require a finite verb, whereas prepositions take a noun phrase.",
              "Remember 'Despite' never takes 'of'."
            ],
            misconceptionAlerts: [
              {
                trigger: "Despite of",
                note: "'Despite' is already a complete preposition; only 'in spite' takes 'of' ('in spite of')."
              }
            ]
          },
          {
            id: "q-esl-acad-4",
            type: "multiple_choice",
            skillId: "skill-esl-cohesive-transitions",
            difficulty: "medium",
            questionText: "Which sentence correctly punctuates the conjunctive adverb 'however' between two independent clauses?",
            options: [
              "Urban rail investment reduced peak congestion; however, last-mile feeder buses remained underfunded.",
              "Urban rail investment reduced peak congestion, however, last-mile feeder buses remained underfunded.",
              "Urban rail investment reduced peak congestion, however last-mile feeder buses remained underfunded.",
              "Although urban rail investment reduced peak congestion; however, feeder buses remained underfunded."
            ],
            correctAnswer: "Urban rail investment reduced peak congestion; however, last-mile feeder buses remained underfunded.",
            explanation: "Because 'however' is a conjunctive adverb rather than a coordinating conjunction, linking two independent clauses requires a semicolon (or period) before 'however' and a comma after it.",
            hintLadder: [
              "Check for comma splices: two independent clauses cannot be joined solely by ', however,'.",
              "Do not combine 'Although' with '; however,' across two clauses.",
              "Select the sentence using '; however,'."
            ],
            misconceptionAlerts: [
              {
                trigger: "Urban rail investment reduced peak congestion, however, last-mile feeder buses remained underfunded.",
                note: "Using a comma before 'however' between two complete sentences creates a comma splice error."
              }
            ]
          },
          {
            id: "q-esl-acad-5",
            type: "multiple_choice",
            skillId: "skill-esl-cohesive-transitions",
            difficulty: "hard",
            questionText: "Select the causal transition that maintains both grammatical integrity and formal C1 academic register: 'Solar micro-grid costs dropped 42% over five years, ______ accelerating rural electrification across northern states.'",
            options: [
              "thereby",
              "therefore",
              "because",
              "however"
            ],
            correctAnswer: "thereby",
            explanation: "'thereby + present participle (-ing)' cleanly introduces a direct result or consequence without starting a new finite clause. 'Therefore' requires a finite clause (and semicolon), while 'because' inverts causality.",
            hintLadder: [
              "Notice the participle 'accelerating rural electrification' immediately after the blank—there is no finite subject + verb.",
              "Which result marker naturally precedes a '-ing' participial phrase ('...by that means')?",
              "'thereby accelerating...' links the preceding clause cleanly to its consequence."
            ],
            misconceptionAlerts: [
              {
                trigger: "therefore",
                note: "'Therefore' connects finite independent clauses ('; therefore, rural electrification accelerated'), whereas 'thereby' modifies a participial consequence."
              }
            ]
          }
        ]
      }
    ]
  }
];
