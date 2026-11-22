import { SkillLesson } from "../../types/curriculum";

export const ENGLISH_LESSONS: Record<string, SkillLesson> = {
  "skill-eng-concord": {
    id: "les-eng-concord",
    title: "Grammatical Concord & Subject-Verb Agreement Rules",
    hookAndIntuition: "Why do we say 'The basket of fresh mangoes IS on the table' rather than 'ARE on the table'? Because in English grammar, verbs agree with the true grammatical subject head noun—not with the intervening words standing right next to the verb! Concord is the golden rule of grammatical harmony.",
    conceptualExplanation: "Concord denotes the syntactic agreement between words in gender, number, case, or person. The foundational principle of Subject-Verb Concord states: a singular subject requires a singular verb (e.g. 'The student writes'), while a plural subject requires a plural verb ('The students write'). Major advanced concord rules tested in WAEC/NECO/JAMB and international examinations include: (1) Intervening Prepositional Phrases: modifying phrases (introduced by 'of', 'together with', 'as well as', 'in addition to') do not change the number of the head subject. (2) Rule of Proximity: when subjects are joined by 'either... or' or 'neither... nor', the verb agrees in number and person with the closest subject. (3) Indefinite Pronouns: pronouns such as 'each', 'every', 'everyone', 'neither', and 'either' are grammatically singular and take singular verbs. (4) Plural in Form but Singular in Meaning: disciplines ('mathematics', 'economics', 'physics'), diseases ('measles'), and news are singular. (5) Mathematical Expressions and Quantities: amounts of money, periods of time, and measurements thought of as a single unit take singular verbs (e.g. 'Fifty kilometers is a long distance').",
    keyTermsAndFormulas: [
      { termOrSymbol: "Rule of Proximity", definition: "When correlated by 'either...or' / 'neither...nor', verb agrees with the subject adjacent to it.", practicalExample: "Neither the captain nor the sailors were saved (sailors is plural, closest to verb)." },
      { termOrSymbol: "Parenthetical / Accompanying Phrases", definition: "'As well as', 'together with', 'accompanied by' do not make a singular subject plural.", practicalExample: "The President, accompanied by his ministers, is arriving today." },
      { termOrSymbol: "Notional Concord", definition: "Collective nouns (team, committee, family) take singular verbs when acting as a unified entity, plural when individuals act separately.", practicalExample: "The jury has reached its verdict (unitary); The jury are divided in their opinions (individual members)." }
    ],
    workedExamples: [
      {
        title: "Dissecting Complex Intervening Modifiers in Subject-Verb Concord",
        problemStatement: "Choose the grammatically correct verb and justify your choice:\n'The quality of the imported fabrics, as well as the craftsmanship of the local tailors, (has / have) impressed the judges.'",
        steps: [
          { stepNumber: 1, instruction: "Identify the true grammatical head subject.", reasoning: "The head subject of the sentence is the noun 'quality', which is an uncountable singular noun." },
          { stepNumber: 2, instruction: "Analyze the intervening prepositional phrase 'of the imported fabrics'.", reasoning: "Prepositional phrases modify the noun but do not alter its grammatical number. 'Fabrics' is plural, but it is the object of the preposition 'of', not the subject." },
          { stepNumber: 3, instruction: "Analyze the parenthetical phrase 'as well as the craftsmanship...'.", reasoning: "Expressions introduced by 'as well as' are additive parenthetical modifiers, not coordinating conjunctions (like 'and'). They do not create a compound plural subject." },
          { stepNumber: 4, instruction: "Select the agreeing verb.", reasoning: "Since the true head subject 'quality' is singular, it requires the singular auxiliary verb 'has'. Full sentence: 'The quality ... has impressed the judges.'" }
        ],
        takeawayRule: "Ignore intervening prepositional and parenthetical phrases when matching verbs to subject nouns."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Treating 'Everyone' or 'Each of the boys' as plural because it refers to many individuals.", whyItIsWrong: "Grammatically, 'everyone' and 'each' refer to items taken distributively one at a time. They are singular and strictly require singular verbs.", correctCorrection: "'Each of the contestants has a valid ticket', NOT 'have a valid ticket'." }
    ],
    guidedPracticePrompt: "Select the correct verb: 'Neither the headmaster nor the teachers (was / were) present at the assembly.'",
    summaryRecap: "Verbs agree with head subjects. Proximity rule applies to either/or. Indefinite pronouns (each, everyone) take singular verbs."
  },

  "skill-eng-clause-analysis": {
    id: "les-eng-clause-analysis",
    title: "Sentence Structure, Clause Analysis, & Syntactic Modifiers",
    hookAndIntuition: "Sentences are the architecture of human thought. Just as a skyscraper rests on beams, pillars, and foundations, every sentence is built from independent and dependent clauses arranged to convey simple facts, contrast ideas, or unfold complex narratives.",
    conceptualExplanation: "A clause is a group of words containing a subject and a finite verb. Clauses are categorized into: (1) Independent (Main) Clause: expresses a complete thought and can stand alone as a simple sentence. (2) Dependent (Subordinate) Clause: cannot stand alone and functions as a specific part of speech: Noun Clause (functions as subject, object, or complement, e.g. 'What he said was true'), Adjectival / Relative Clause (modifies a noun or pronoun, introduced by relative pronouns who, which, that, whose, e.g. 'The girl who won the debate'), and Adverbial Clause (modifies a verb, adjective, or adverb, indicating time, condition, concession, cause, or purpose, e.g. 'Although it rained, we proceeded'). Sentences are classified structurally as: Simple (one independent clause), Compound (two independent clauses joined by coordinating conjunction FANBOYS: For, And, Nor, But, Or, Yet, So), Complex (one independent clause plus one or more subordinate clauses), and Compound-Complex (at least two independent clauses plus at least one subordinate clause).",
    keyTermsAndFormulas: [
      { termOrSymbol: "FANBOYS Coordinating Conjunctions", definition: "For, And, Nor, But, Or, Yet, So — join grammatically equal independent clauses.", practicalExample: "The bell rang, but the students remained seated." },
      { termOrSymbol: "Subordinating Conjunctions", definition: "Although, because, since, unless, while, if — introduce dependent subordinate clauses.", practicalExample: "Because she studied diligently, she excelled in the examination." },
      { termOrSymbol: "Adverbial Clause of Concession", definition: "Expresses a contrast or counter-expectation, introduced by 'although', 'even though', 'whereas'.", practicalExample: "Although he had little capital, he launched a thriving technology enterprise." }
    ],
    workedExamples: [
      {
        title: "Analyzing Grammatical Function and Name of an Underlined Clause",
        problemStatement: "In the sentence: 'The committee dismissed the proposal because it lacked empirical data.'\nIdentify: (a) the grammatical name of the underlined clause 'because it lacked empirical data', and (b) its specific grammatical function.",
        steps: [
          { stepNumber: 1, instruction: "Determine whether the clause can stand alone.", reasoning: "'because it lacked empirical data' begins with the subordinating conjunction 'because' and cannot stand alone. It is a subordinate clause." },
          { stepNumber: 2, instruction: "Identify what question the clause answers relative to the main clause.", reasoning: "It answers the question 'Why did the committee dismiss the proposal?' This denotes cause or reason." },
          { stepNumber: 3, instruction: "State the grammatical name.", reasoning: "Grammatical name: Adverbial Clause of Reason (or Cause)." },
          { stepNumber: 4, instruction: "State its grammatical function.", reasoning: "Grammatical function: It modifies the finite verb 'dismissed' in the main clause." }
        ],
        takeawayRule: "When asked for grammatical function: identify whether it acts as Subject, Object, or Modifier, and name the exact word it modifies."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Confusing a phrase with a clause.", whyItIsWrong: "A clause MUST contain a finite verb and subject. A phrase is a group of words lacking a subject-verb combination (e.g. 'running down the street' is a participle phrase, not a clause).", correctCorrection: "Check for a finite verb: if there is no conjugated verb, it is a phrase, not a clause." }
    ],
    guidedPracticePrompt: "Identify the grammatical name and function of the clause: 'That honesty is the best policy cannot be disputed.'",
    summaryRecap: "Clauses contain a subject and finite verb. Independent clauses stand alone; dependent clauses function as nouns, adjectives, or adverbs."
  },

  "skill-eng-phonetics-vowels-consonants": {
    id: "les-eng-phonetics-vowels-consonants",
    title: "Phonetics, Vowel Contrasts, & Consonant Cluster Articulation",
    hookAndIntuition: "Why do 'ship' and 'sheep', or 'cat' and 'cart' sound noticeably different to native speakers? English has only 26 alphabet letters, but it produces 44 distinct speech sounds (phonemes)! Mastering International Phonetic Alphabet (IPA) symbols unlocks perfect pronunciation and oral examination mastery.",
    conceptualExplanation: "Phonetics studies the physical production, acoustic transmission, and auditory perception of speech sounds. The 44 Received Pronunciation (RP) phonemes are split into 20 vowels and 24 consonants. Vowels are produced without vocal tract obstruction and comprise: 12 Pure Vowels (Monophthongs) divided into short vowels (/ɪ/, /e/, /æ/, /ʌ/, /ɒ/, /ʊ/, /ə/ [schwa]) and long vowels (/iː/, /ɑː/, /ɔː/, /uː/, /ɜː/), and 8 Diphthongs (gliding vowels from one tongue position to another, e.g. /eɪ/ as in 'day', /aɪ/ as in 'my', /əʊ/ as in 'go', /aʊ/ as in 'now', /ɔɪ/ as in 'boy', /ɪə/ as in 'near', /eə/ as in 'hair', /ʊə/ as in 'cure'). Consonants are articulated with partial or complete vocal tract closure, classified by: Place of Articulation (bilabial, labiodental, dental, alveolar, palatal, velar, glottal), Manner of Articulation (plosive, fricative, affricate, nasal, lateral, approximant), and Voicing (voiced = vocal cords vibrate, e.g. /b/, /d/, /z/; voiceless = no vibration, e.g. /p/, /t/, /s/). Consonant Clusters are sequences of consonants without intervening vowels (e.g. 'spl-' in 'splash', '-mpst' in 'glimpst').",
    keyTermsAndFormulas: [
      { termOrSymbol: "Minimal Pairs", definition: "Words differing by only one single phoneme used to test sound discrimination.", practicalExample: "/ɪ/ vs /iː/ in 'sit' /sɪt/ vs 'seat' /siːt/; /æ/ vs /ɑː/ in 'cat' /kæt/ vs 'cart' /kɑːt/." },
      { termOrSymbol: "Schwa /ə/", definition: "The most common vowel in spoken English: a mid-central unaccented weak neutral vowel.", practicalExample: "The first syllable in 'about' /əˈbaʊt/ and the last syllable in 'teacher' /ˈtiːtʃə/." },
      { termOrSymbol: "Voicing Distinction", definition: "Vocal fold vibration distinguishing pairs like /s/ (voiceless) and /z/ (voiced), /f/ and /v/.", practicalExample: "Place fingers on throat: feel vibration on /v/ (van) but no vibration on /f/ (fan)." }
    ],
    workedExamples: [
      {
        title: "Discerning Vowel Contrast in Examination Minimal Pairs",
        problemStatement: "From the options below, choose the word that contains the same vowel sound as the one represented by the underlined letter in 'fl<u>oo</u>d':\n(A) blood  (B) mood  (C) wood  (D) door",
        steps: [
          { stepNumber: 1, instruction: "Determine the phonetic transcription of the target word 'flood'.", reasoning: "Despite the 'oo' spelling, 'flood' is pronounced with the short central vowel /ʌ/ -> /flʌd/." },
          { stepNumber: 2, instruction: "Analyze option (A) 'blood'.", reasoning: "'blood' is pronounced /blʌd/. It contains the exact same short central vowel /ʌ/." },
          { stepNumber: 3, instruction: "Analyze distractor options (B), (C), and (D).", reasoning: "(B) 'mood' has the long back vowel /uː/ (/muːd/); (C) 'wood' has the short rounded vowel /ʊ/ (/wʊd/); (D) 'door' has the long open-mid back vowel /ɔː/ (/dɔː/)." },
          { stepNumber: 4, instruction: "State definitive answer.", reasoning: "Option (A) 'blood' shares the /ʌ/ phoneme." }
        ],
        takeawayRule: "English orthography (spelling) is not phonetic; always rely on IPA sounds rather than letters."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Pronouncing the silent 'b' in words like 'debt', 'doubt', 'tomb', or 'comb'.", whyItIsWrong: "Etymological silent letters must not be articulated in standard English: 'debt' is /det/, 'doubt' is /daʊt/, 'tomb' is /tuːm/.", correctCorrection: "Identify and suppress silent letters in oral English examinations." }
    ],
    guidedPracticePrompt: "Identify the word containing the diphthong /aʊ/: (A) low  (B) cow  (C) core  (D) law.",
    summaryRecap: "English has 44 phonemes (20 vowels, 24 consonants). Monophthongs, diphthongs, voicing, and consonant clusters define accurate speech."
  },

  "skill-eng-stress-intonation-patterns": {
    id: "les-eng-stress-intonation-patterns",
    title: "Word Stress, Emphatic Stress, & Intonation Contours",
    hookAndIntuition: "Say the word 'record' out loud. If you stress the first syllable ('RE-cord'), it is a noun—a vinyl album or medical document. If you stress the second syllable ('re-CORD'), it transforms into a verb—the act of capturing sound! Stress completely alters the grammatical identity of English words.",
    conceptualExplanation: "Stress is the relative emphasis or acoustic prominence given to a syllable, characterized by greater loudness, higher pitch, and longer duration. (1) Word Stress: Polysyllabic words have fixed stress patterns. Noun-Verb shift: two-syllable homographs stress the first syllable as nouns ('PRE-sent', 'EX-port', 'CON-duct') and the second syllable as verbs ('pre-SENT', 'ex-PORT', 'con-DUCT'). Words ending in '-tion', '-sion', and '-ic' always place primary stress on the penultimate (second to last) syllable (e.g. 'e-du-CA-tion', 'pho-to-GRA-phic'). Words ending in '-cy', '-ty', '-phy', '-gy', and '-al' place stress on the antepenultimate (third from last) syllable (e.g. 'de-MO-cra-cy', 'ge-O-gra-phy'). (2) Emphatic Stress: In a spoken sentence, highlighting a specific word shifts the contrastive meaning and presupposition. (3) Intonation: The pitch contour of the voice: Falling Tune (declarative statements, commands, WH-questions) conveys finality; Rising Tune (Yes/No questions, polite requests, unfinished lists) conveys non-finality or inquiry.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Noun-Verb Stress Rule", definition: "2-syllable pairs: First syllable stressed for Noun/Adjective; Second syllable stressed for Verb.", practicalExample: "'RE-bel' (noun: insurgent person) vs 're-BEL' (verb: to fight authority)." },
      { termOrSymbol: "Penultimate Syllable Rule (-tion, -sion, -ic)", definition: "Primary stress falls on the syllable immediately preceding these suffixes.", practicalExample: "'in-tro-DUC-tion', 'e-lec-TRON-ic'." },
      { termOrSymbol: "Falling vs Rising Intonation", definition: "Falling (↘) = statements, WH-questions; Rising (↗) = polar Yes/No questions.", practicalExample: "'Where is the library?' (↘ falling); 'Are you ready?' (↗ rising)." }
    ],
    workedExamples: [
      {
        title: "Interpreting Emphatic Contrast in Spoken Sentences",
        problemStatement: "In the sentence: 'Kofi bought a RED bicycle yesterday.' with emphatic stress on the capitalized word RED, which question does this statement answer directly?\n(A) Who bought a red bicycle yesterday?\n(B) Did Kofi buy a blue bicycle yesterday?\n(C) What did Kofi do yesterday?\n(D) When did Kofi buy the red bicycle?",
        steps: [
          { stepNumber: 1, instruction: "Analyze what emphatic stress accomplishes.", reasoning: "Emphatic stress singles out one piece of information in the sentence to refute an incorrect presupposition or clarify a specific contrast." },
          { stepNumber: 2, instruction: "Examine the stressed word 'RED'.", reasoning: "'RED' is an adjective of color. Emphasizing 'RED' contrasts the color of the bicycle with other possible colors." },
          { stepNumber: 3, instruction: "Evaluate option (B).", reasoning: "Option (B) asks: 'Did Kofi buy a blue bicycle yesterday?' The emphatic reply 'No, Kofi bought a RED bicycle yesterday' directly addresses and corrects this specific question." },
          { stepNumber: 4, instruction: "Confirm why other options are incorrect.", reasoning: "Option (A) would require stress on 'KOFI'; (C) would require stress on 'BOUGHT'; (D) would require stress on 'YESTERDAY'." }
        ],
        takeawayRule: "Emphatic stress directly negates the corresponding element in the question."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using rising intonation at the end of WH-questions (Who, What, Where, Why).", whyItIsWrong: "WH-questions in standard English take a FALLING pitch tune because they seek specific information, not yes/no confirmation.", correctCorrection: "'What is your name?' falls at the end: What is your ↘NAME?" }
    ],
    guidedPracticePrompt: "Which syllable carries primary stress in 'demographic' and 'photography'?",
    summaryRecap: "Word stress differentiates nouns (1st syllable) from verbs (2nd syllable). Penultimate stress applies to -tion/-ic. Emphatic stress contrasts presuppositions."
  },

  "skill-eng-vocabulary-context-roots": {
    id: "les-eng-vocabulary-context-roots",
    title: "Contextual Vocabulary, Latin/Greek Roots, & Lexical Semantics",
    hookAndIntuition: "If you encounter an unfamiliar word like 'somnambulist' in a medical journal, do you have to consult a dictionary? Not if you recognize its Latin roots: 'somn' means sleep, and 'ambul' means walk. A somnambulist is simply a sleepwalker! Morphemes give you the power to decode thousands of words.",
    conceptualExplanation: "Vocabulary acquisition in English is accelerated through morphological analysis and contextual clues. Morphology breaks words into Morphemes (the smallest units of meaning): Root / Base words, Prefixes (added to front, modifying meaning: e.g. 'un-' [not], 'anti-' [against], 'poly-' [many], 'bio-' [life]), and Suffixes (added to end, determining part of speech: e.g. '-tion' [noun], '-ize' [verb], '-ous' [adjective], '-ly' [adverb]). Contextual Clues infer meaning from surrounding text using: (1) Definition / Restatement clues (signaled by 'that is', 'in other words'), (2) Contrast / Antonym clues (signaled by 'however', 'unlike', 'whereas'), (3) Cause and Effect relationships, and (4) Exemplification clues. Lexical Semantics examines relationships between words: Synonyms (similar denotation but differing connotation or register), Antonyms (gradable, complementary, or converse), Homophones (same sound, different spelling/meaning: 'compliment' vs 'complement'), and Collocations (words that naturally co-occur: 'make an effort', not 'do an effort').",
    keyTermsAndFormulas: [
      { termOrSymbol: "Prefix + Root + Suffix", definition: "Morphological decomposition framework.", practicalExample: "'Chronometer' = 'chrono' (time) + 'meter' (measure) = instrument measuring time." },
      { termOrSymbol: "Collocations", definition: "Habitual, natural co-occurrence of words in standard English.", practicalExample: "'Bitterly disappointed', 'heavy rain', 'commit a crime', 'bear in mind'." },
      { termOrSymbol: "Connotation vs Denotation", definition: "Denotation = literal dictionary definition; Connotation = emotional, associative nuance.", practicalExample: "'Thrifty' (positive connotation) vs 'miserly' (negative connotation) for spending little money." }
    ],
    workedExamples: [
      {
        title: "Deducing Meaning from Contrastive Context Clues",
        problemStatement: "Determine the meaning of the word 'garrulous' in the following passage:\n'While his twin brother was notoriously reticent and rarely uttered more than monosyllables, Aminu was completely garrulous, captivating the audience for hours.'",
        steps: [
          { stepNumber: 1, instruction: "Locate the structural contrast indicator.", reasoning: "The conjunction 'While' sets up a direct antithetical contrast between the twin brothers." },
          { stepNumber: 2, instruction: "Analyze the known side of the contrast.", reasoning: "The brother is described as 'notoriously reticent' and 'rarely uttered more than monosyllables' (silent, quiet, untalkative)." },
          { stepNumber: 3, instruction: "Infer the opposite quality for Aminu.", reasoning: "If the brother is silent, Aminu's quality of being 'garrulous' must mean the exact opposite: excessively talkative, loquacious, chatting at length." },
          { stepNumber: 4, instruction: "Confirm with the trailing contextual phrase.", reasoning: "'captivating the audience for hours' corroborates extensive talking." }
        ],
        takeawayRule: "When contrast markers (while, whereas, unlike, conversely) appear, target words represent the antonym of the known term."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Confusing homophones 'complement' and 'compliment'.", whyItIsWrong: "'Complement' with an 'e' means to complete or pair well with something. 'Compliment' with an 'i' means to praise or flatter someone.", correctCorrection: "Remember: 'I' like to receive a compl'i'ment." }
    ],
    guidedPracticePrompt: "Use morphological roots to deduce the meaning of 'benevolent' from 'bene' (good) and 'vol' (wish).",
    summaryRecap: "Latin and Greek roots decode complex words. Contextual contrast and examples reveal unknown vocabulary. Collocations enforce natural phrasing."
  },

  "skill-eng-idiomatic-expressions-registers": {
    id: "les-eng-idiomatic-expressions-registers",
    title: "Idiomatic Expressions, Figurative Language, & Domain Registers",
    hookAndIntuition: "If someone tells you to 'break a leg' before an exam or speech, they aren't wishing you a trip to the hospital—they are wishing you good luck! Idioms are figurative expressions whose true meaning cannot be understood from the literal definitions of their individual words.",
    conceptualExplanation: "Figurative language transcends literal denotation to create vivid, imaginative expressions. Core figures of speech include: Simile (explicit comparison using 'like' or 'as'), Metaphor (implicit equation without 'like' or 'as'), Personification (attributing human qualities to non-human entities), Hyperbole (deliberate exaggeration for emphasis), Irony (saying the opposite of what is meant, or situational discrepancy), Euphemism (substituting a mild or indirect term for a harsh or unpleasant reality, e.g. 'passed away' for died), and Oxymoron (juxtaposing contradictory terms, e.g. 'deafening silence'). Idiomatic Expressions are culturally fixed phrases whose meanings are non-compositional (e.g. 'bite the bullet' = face inevitable hardship with courage; 'spill the beans' = divulge a secret). Linguistic Register is the variation in vocabulary, syntax, and tone according to social domain, audience, and context: Formal/Academic (passive voice, elevated diction, no slang/contractions), Technical (field-specific jargon in medicine, law, computing), and Informal/Colloquial (conversational contractions, slang).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Non-Compositional Meaning (Idiom)", definition: "The meaning of the whole idiom is completely independent of the literal meanings of its constituent parts.", practicalExample: "'Kick the bucket' means to die; it has nothing to do with physical buckets or feet." },
      { termOrSymbol: "Metaphor vs Simile", definition: "Simile uses 'like' or 'as' (e.g. 'brave as a lion'); Metaphor asserts direct identity ('he is a lion in battle').", practicalExample: "'Time is a thief' is a metaphor personifying time as an infiltrator." },
      { termOrSymbol: "Register Appropriateness", definition: "Tailoring lexis and grammatical structures to suit context (legal, medical, scientific, administrative).", practicalExample: "In medicine: use 'hypertension', not 'high blood pressure'; in law: 'plaintiff', not 'accuser'." }
    ],
    workedExamples: [
      {
        title: "Deciphering Figurative Device and Contextual Meaning in Literature",
        problemStatement: "Identify the literary device used in the line: 'The raging fire consumed the ancient forest in its ravenous jaws.' Explain its literary effect.",
        steps: [
          { stepNumber: 1, instruction: "Examine the verbs and nouns attributed to the non-human subject 'fire'.", reasoning: "The fire is described as 'raging', having 'ravenous jaws', and performing the deliberate biological act of 'consuming'." },
          { stepNumber: 2, instruction: "Identify the figure of speech.", reasoning: "Attributing human and animal biological traits (jaws, hunger/ravenousness) to an inanimate natural element (fire) is Personification." },
          { stepNumber: 3, instruction: "Analyze the literary effect.", reasoning: "Personifying the fire transforms it from an abstract chemical combustion event into an active, predatory monster, heightening dramatic tension and urgency." }
        ],
        takeawayRule: "Personification animates non-living phenomena with human or animal volition to heighten emotional impact."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Mixing up idioms or using altered wording in standard expressions.", whyItIsWrong: "Idioms are grammatically and lexically fossilized. Saying 'we will burn that bridge when we cross it' mistakenly hybridizes two distinct idioms.", correctCorrection: "Use idioms in their exact, conventional phrasing without ad-hoc alterations." }
    ],
    guidedPracticePrompt: "What is the meaning and origin of the idiom 'burning the midnight oil'?",
    summaryRecap: "Idioms have non-compositional figurative meanings. Personification and metaphors elevate prose. Register aligns vocabulary with domain."
  },

  "skill-eng-reading-comprehension-inferences": {
    id: "les-eng-reading-comprehension-inferences",
    title: "Reading Comprehension, Inference, & Critical Analysis",
    hookAndIntuition: "Reading comprehension is not merely recognizing words on a printed page—it is having an intellectual conversation with the author across time and space. Critical readers distinguish between explicit facts stated in the text and implicit truths hidden between the lines.",
    conceptualExplanation: "Comprehension operates across three cognitive tiers: (1) Literal Comprehension: identifying directly stated facts, timelines, and details; (2) Inferential Comprehension: 'reading between the lines' to deduce unspoken motives, implications, cause-and-effect relationships, and character attitudes by combining textual evidence with logical reasoning; and (3) Evaluative / Critical Comprehension: assessing authorial tone (objective, cynical, satirical, sympathetic, didactic), mood (the emotional atmosphere evoked in the reader), bias, and rhetorical intent. Effective comprehension strategies include: Active Skimming (rapid surveying of titles, headings, topic sentences of paragraphs for the central thesis), Scanning (rapid eye movement searching for specific dates, names, or statistical metrics), Contextual Vocabulary Decoding, and Summarization (distilling a 500-word passage into its core macro-propositions).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Inference = Textual Evidence + Prior Knowledge", definition: "A logical conclusion drawn from premises known or assumed to be true, not explicitly stated.", practicalExample: "If a character enters shivering with a dripping umbrella, we infer it is cold and raining outside." },
      { termOrSymbol: "Topic Sentence", definition: "The sentence (typically first or second) establishing the main idea of a paragraph.", practicalExample: "Locating topic sentences provides an instant outline of an entire argumentative passage." },
      { termOrSymbol: "Authorial Tone", definition: "The author's implicit attitude toward their subject matter (e.g. nostalgic, indignant, satirical, pragmatic).", practicalExample: "Irony and sarcastic word choices signal a mocking rather than serious tone." }
    ],
    workedExamples: [
      {
        title: "Drawing Valid Inferences from a Narrative Excerpt",
        problemStatement: "Read the excerpt: 'Dr. Mensah looked at the laboratory monitors, wiped beads of sweat from his forehead, and carefully locked the reinforced titanium doors behind him. He sighed and murmured into his voice recorder, \"If this strain escapes into the municipal water table, no antibiotic on Earth can arrest it.\"'\nQuestion: What can be validly inferred about the nature of Dr. Mensah's research?",
        steps: [
          { stepNumber: 1, instruction: "Identify explicit details.", reasoning: "Dr. Mensah is in a laboratory with monitors; he wipes sweat (showing tension/anxiety); he locks reinforced titanium doors (extreme biosecurity); he mentions an escaping strain resistant to all antibiotics." },
          { stepNumber: 2, instruction: "Connect clues to draw inferential conclusion.", reasoning: "The presence of extreme physical containment (titanium doors) combined with anxiety and a multi-drug resistant escaping strain demonstrates that he is researching a highly dangerous, potentially catastrophic biological pathogen." },
          { stepNumber: 3, instruction: "Formulate answer.", reasoning: "Valid inference: Dr. Mensah is working on an extremely lethal, incurable, highly contagious pathogen or biological weapon under high-containment biosafety conditions." }
        ],
        takeawayRule: "Every valid inference must be anchored directly in specific textual evidence; do not jump to unsupported speculation."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Selecting an answer choice that is factually true in real life but NOT mentioned or supported anywhere in the passage.", whyItIsWrong: "Comprehension tests your understanding of the PASSAGE, not your general world knowledge. If the text does not substantiate it, it is wrong.", correctCorrection: "Base every answer strictly on textual evidence provided within the passage boundaries." }
    ],
    guidedPracticePrompt: "How can a reader detect whether an author is expressing a factual consensus or a biased personal opinion in an article?",
    summaryRecap: "Literal comprehension identifies stated facts; inferential comprehension deduces unspoken truths from textual clues. Authorial tone reveals attitude."
  },

  "skill-eng-formal-letter-essay-rhetoric": {
    id: "les-eng-formal-letter-essay-rhetoric",
    title: "Formal Letter Writing, Discursive Essays, & Rhetorical Argumentation",
    hookAndIntuition: "Whether petitioning a university admissions board, drafting a corporate proposal, or writing an op-ed to persuade an entire nation, the power of written rhetoric determines whether your ideas are ignored or embraced. Structure, tone, and logical progression are your greatest assets.",
    conceptualExplanation: "Extended writing adheres to rigorous structural conventions. (1) Formal Letter Writing: Layout requires Two Addresses (Sender's address top-right with date; Recipient's official designation and address on left margin); Formal Salutation ('Dear Sir,' or 'Dear Madam,'); Capitalized / Underlined Subject Heading ('PETITION REGARDING...'); Structured Body (Introduction of purpose, sequenced argument paragraphs with clear topic sentences, actionable conclusion); Formal Valediction ('Yours faithfully,' followed by signature and full capitalized name with official title). (2) Discursive / Argumentative Essays: Structure balances claims with counter-claims: Hook & Thesis statement in Introduction, Body paragraphs developing arguments supported by empirical evidence and refuting opposing perspectives, and a decisive Synthesizing Conclusion. (3) Rhetorical Appeals (Aristotelian Triad): Ethos (establishing authorial credibility and moral integrity), Pathos (emotional resonance and human empathy), and Logos (rigorous deductive and inductive logical evidence, statistics, and causal chains).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Aristotelian Rhetorical Appeals: Ethos, Pathos, Logos", definition: "Ethos = Credibility/authority; Pathos = Emotional resonance; Logos = Logical reasoning and empirical proof.", practicalExample: "A medical doctor presenting vaccine data utilizes Ethos (credentials) and Logos (clinical trial data)." },
      { termOrSymbol: "Formal Letter Valediction Rule", definition: "'Dear Sir/Madam' pairs strictly with 'Yours faithfully'; addressing by name ('Dear Dr. Adeleke') pairs with 'Yours sincerely'.", practicalExample: "'Yours faithfully,' (capital Y, lowercase f, followed by a comma)." },
      { termOrSymbol: "Discursive Transition Connectors", definition: "'Furthermore', 'Consequently', 'On the contrary', 'In stark contrast', 'It is imperative that'.", practicalExample: "Connectors maintain logical cohesion between paragraphs." }
    ],
    workedExamples: [
      {
        title: "Structuring a Persuasive Formal Petition to a Municipal Authority",
        problemStatement: "Outline the complete paragraph-by-paragraph structure of a formal letter to the Commissioner of Works requesting urgent rehabilitation of a dangerous communal bridge.",
        steps: [
          { stepNumber: 1, instruction: "Layout and Header.", reasoning: "Top right: Sender's address and date. Left: 'The Honourable Commissioner, Ministry of Works...'. Salutation: 'Dear Sir,'. Heading: 'URGENT PETITION REGARDING REHABILITATION OF THE COLLAPSING ODO-ONA BRIDGE'." },
          { stepNumber: 2, instruction: "Paragraph 1: Clear purpose statement.", reasoning: "State clearly who you represent (e.g. Community Youth Alliance) and the explicit objective of writing." },
          { stepNumber: 3, instruction: "Paragraph 2: Present empirical evidence and severity (Logos).", reasoning: "Document specific structural defects: crumbling abutments, 4 vehicular accidents in past month, disruption to 10,000 daily commuters." },
          { stepNumber: 4, instruction: "Paragraph 3: Socio-economic impact and urgency (Pathos & Ethos).", reasoning: "Explain how children are cut off from schools and farmers cannot transport perishable harvest to city markets." },
          { stepNumber: 5, instruction: "Paragraph 4: Constructive proposals and closing call to action.", reasoning: "Request immediate dispatch of structural engineering inspectors and temporary barrier installation." },
          { stepNumber: 6, instruction: "Valediction.", reasoning: "'Yours faithfully,' -> [Signature] -> 'CHUKWUDI EZE (President, Community Action Committee)'." }
        ],
        takeawayRule: "Formal letters must be respectful, concise, objective, and end with an unambiguous, actionable call to action."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing 'Yours faithfully' with an apostrophe: 'Your's faithfully' or capitalizing 'Faithfully'.", whyItIsWrong: "Possessive pronouns (yours, hers, its) NEVER take apostrophes. 'Faithfully' is an adverb following a comma and must be lowercase.", correctCorrection: "Write strictly: 'Yours faithfully,' with no apostrophe and lowercase 'f'." }
    ],
    guidedPracticePrompt: "Draft an introductory paragraph for an argumentative essay on 'Should Artificial Intelligence be Regulated by Law?'",
    summaryRecap: "Formal letters require two addresses, subject line, and 'Yours faithfully,'. Argumentative essays balance Ethos, Pathos, and Logos."
  },

  "skill-esl-phonemes-vowels": {
    id: "les-esl-phonemes-vowels",
    title: "ESL Phonemic Vowel Contrasts: Short Lax vs Long Tense Vowels",
    hookAndIntuition: "Imagine ordering a 'sheep' when you wanted to book a voyage on a 'ship', or asking someone to take a 'sit' instead of a 'seat'! Vowel length and tongue tension in English carry real semantic weight. Mastering minimal pairs gives you crystal-clear spoken intelligibility.",
    conceptualExplanation: "English distinguishes between lax (short, relaxed articulatory muscles) and tense (longer duration, tightened tongue root and lips) vowel phonemes. For non-native speakers whose primary languages possess 5-vowel systems (like Spanish, Japanese, or many West African languages), English's 12 pure monophthongs and 8 diphthongs pose an auditory challenge. The most vital contrast is between short lax /ɪ/ (as in bit, ship, live) and long tense /iː/ (as in beat, sheep, leave). (1) For /ɪ/, the tongue is lower and further back, the jaw drops slightly, and the facial muscles remain relaxed. (2) For /iː/, the tongue blade arches high toward the hard palate, the vocalic duration is nearly twice as long, and the lips spread slightly into a gentle smile.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Minimal Pair", definition: "Two words that differ in only one single phonological element and have distinct meanings.", practicalExample: "Ship /ʃɪp/ vs Sheep /ʃiːp/; Live /lɪv/ vs Leave /liːv/." },
      { termOrSymbol: "Lax vs Tense Vowels", definition: "Lax vowels are produced with lower muscular effort and shorter duration; tense vowels have higher tongue position and sustained acoustic length.", practicalExample: "/ɪ/ is lax; /iː/ is tense." },
      { termOrSymbol: "L1 Phonemic Neutralization", definition: "The cognitive tendency of non-native speakers to perceive and pronounce two target language sounds as their single closest native phoneme.", practicalExample: "Pronouncing both 'seat' and 'sit' as /sit/." }
    ],
    workedExamples: [
      {
        title: "Articulatory Positioning for /ɪ/ vs /iː/",
        problemStatement: "Demonstrate step-by-step how an ESL learner can reliably produce the contrast between 'bit' and 'beat'.",
        steps: [
          { stepNumber: 1, instruction: "Establish the tense vowel /iː/ benchmark.", reasoning: "Say 'cheese' or 'bee'. Notice your lips spreading wide and your tongue pushing high against your upper molars. Hold the sound: /iːːː/." },
          { stepNumber: 2, instruction: "Drop the jaw 5 millimeters and relax the facial muscles.", reasoning: "Without rounding your lips, allow your jaw to loosen slightly. The tongue lowers from the roof of the mouth." },
          { stepNumber: 3, instruction: "Produce the short lax /ɪ/.", reasoning: "Make a quick, short sound: /ɪ/. Do not hold it. Say: 'bit'." },
          { stepNumber: 4, instruction: "Practice alternating contrastively in a carrier sentence.", reasoning: "'Just a little bit /ɪ/ of beat /iː/ music.'" }
        ],
        takeawayRule: "Tense /iː/ is long and smiling; lax /ɪ/ is short, dropped, and relaxed."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming that vowel length in English is purely decorative and does not change word meaning.", whyItIsWrong: "In English, vowel quality and duration are phonemic—swapping /ɪ/ for /iː/ alters the lexical word completely (e.g. 'fit' vs 'feet').", correctCorrection: "Always respect vowel duration and tongue height when communicating orally." }
    ],
    guidedPracticePrompt: "Record yourself saying: 'The captain said this ship is carrying ten thousand sheep.' Listen back to verify whether 'ship' and 'sheep' sound distinct.",
    summaryRecap: "Lax /ɪ/ is short and relaxed; tense /iː/ is long and tightened. Minimal pair drills build communicative confidence."
  },

  "skill-esl-fricatives-consonants": {
    id: "les-esl-fricatives-consonants",
    title: "ESL Dental Fricatives & Plosives (/θ/, /ð/, /s/, /d/)",
    hookAndIntuition: "Why do non-native speakers often say 'I sink so' or 'I tink so' instead of 'I think so'? Because the dental fricative /θ/ does not exist in the majority of world languages! Learning to position your tongue between your teeth turns hesitant speech into authentic English.",
    conceptualExplanation: "The English digraph 'th' represents two distinct interdental fricative phonemes: (1) Voiceless dental fricative /θ/ (as in think, theory, math, breath): produced by placing the tongue tip lightly between the upper and lower front teeth, expelling air without vocal cord vibration. (2) Voiced dental fricative /ð/ (as in this, that, mother, breathe): produced in the identical articulatory position, but with active vocal fold vibration. The most pervasive ESL error across European, African, Asian, and Latin American learners is substituting plosives (/t/ for /θ/, /d/ for /ð/) or alveolar fricatives (/s/ for /θ/, /z/ for /ð/).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Interdental Fricative", definition: "A sound produced by forcing air through a narrow constriction formed by the tongue tip touching the teeth.", practicalExample: "/θ/ in 'think'; /ð/ in 'this'." },
      { termOrSymbol: "Voicing Feature", definition: "The presence (/ð/) or absence (/θ/) of vocal cord vibration during consonant articulation.", practicalExample: "Feel throat buzzing for 'then' (/ð/), but no buzzing for 'thin' (/θ/)." },
      { termOrSymbol: "Consonant Substitution Trap", definition: "Replacing unfamiliar sounds with the nearest acoustic native equivalent (/t/, /d/, /s/).", practicalExample: "Saying 'three' as 'tree' or 'free'." }
    ],
    workedExamples: [
      {
        title: "Mastering the Tongue-Between-Teeth Placement",
        problemStatement: "Guide an ESL learner to articulate 'three' without saying 'tree' or 'free'.",
        steps: [
          { stepNumber: 1, instruction: "Visual mirror check.", reasoning: "Look in a mirror and extend your tongue tip just past your upper incisors so about 2mm of the tongue is visible." },
          { stepNumber: 2, instruction: "Breathe out gently without voice.", reasoning: "Blow air softly over the tongue tip. You should hear a soft rushing friction sound: /θθθθ/." },
          { stepNumber: 3, instruction: "Transition smoothly into the /r/ glide.", reasoning: "Pull the tongue body backward while maintaining airflow: /θriː/." },
          { stepNumber: 4, instruction: "Contrast with 'tree'.", reasoning: "For 'tree', the tongue tip starts firmly pressed behind the upper gum ridge, releasing with an explosive burst /t/. For 'three', there is continuous friction." }
        ],
        takeawayRule: "'Three' has continuous friction through the teeth; 'tree' has an explosive tap behind the teeth."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Biting the tongue too hard when pronouncing 'th'.", whyItIsWrong: "Clamping the teeth down blocks the airflow entirely, turning the fricative into an unnatural stop or painful stammer.", correctCorrection: "The contact must be feather-light, allowing continuous air to stream smoothly." }
    ],
    guidedPracticePrompt: "Whisper the phrase: 'Thirty-three thoughtful theorists thanked their brother.'",
    summaryRecap: "Tongue tip between teeth with no voicing = /θ/ ('thought'); with vocal buzzing = /ð/ ('there'). Never substitute /t/ or /d/."
  },

  "skill-esl-verb-noun-collocations": {
    id: "les-esl-verb-noun-collocations",
    title: "ESL High-Frequency Verb-Noun Collocations & Natural Idiomatic Phrasing",
    hookAndIntuition: "Why can you 'make a cake' and 'make a decision', but you must 'do homework' and 'do research'? Grammar rules alone cannot explain this—collocations are customary partnerships between words that native speakers instinctively expect. Mastering them makes your English flow naturally.",
    conceptualExplanation: "A collocation is a predictable, conventional combination of words that co-occur with greater frequency than random chance. For ESL learners, literal translation from one's mother tongue is the primary source of unnatural phrasing. (1) 'Make' vs 'Do': 'Make' generally associates with creation, producing an outcome, communication, or decisions ('make a choice', 'make an effort', 'make an inquiry', 'make a profit'). 'Do' associates with routine duties, general actions, work, and open-ended obligations ('do homework', 'do research', 'do business', 'do one's best'). (2) Adjective-Noun collocations: 'heavy rain' (never 'strong rain'), 'strong wind' (never 'heavy wind'), 'deep sleep' (never 'high sleep'). (3) Academic Collocations: 'conduct an experiment', 'formulate a hypothesis', 'draw a tentative conclusion'.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Lexical Collocation", definition: "Words that naturally fit together according to accepted communicative convention rather than strict grammatical rules.", practicalExample: "'Pay attention', 'cast a ballot', 'bear in mind'." },
      { termOrSymbol: "L1 Transfer / Negative Interference", definition: "Applying syntactic or lexical conventions from one's first language into English, yielding awkward phrasing.", practicalExample: "Translating 'hacer una pregunta' literally as 'make a question' instead of 'ask a question'." },
      { termOrSymbol: "Academic Word List (AWL) Collocation", definition: "Standard pairings used across university research publications and scholarly debate.", practicalExample: "'Substantiate a claim', 'corroborate empirical data'." }
    ],
    workedExamples: [
      {
        title: "Rectifying Common Collocational Errors in a Business Pitch",
        problemStatement: "Correct the following non-native sentences:\n1. 'We need to make research before we do a decision.'\n2. 'There was a strong rain yesterday, so we did a big mistake.'",
        steps: [
          { stepNumber: 1, instruction: "Analyze sentence 1 verbs.", reasoning: "Research is an investigative process (requires 'do' or 'conduct'). Decisions are conclusions reached (requires 'make')." },
          { stepNumber: 2, instruction: "Rewrite sentence 1.", reasoning: "'We need to conduct research (or do research) before we make a decision.'" },
          { stepNumber: 3, instruction: "Analyze sentence 2 modifiers and verbs.", reasoning: "Precipitation pairs with 'heavy'. Errors pair with 'make'." },
          { stepNumber: 4, instruction: "Rewrite sentence 2.", reasoning: "'There was heavy rain yesterday, so we made a big mistake.'" }
        ],
        takeawayRule: "Always learn new English nouns together with the specific verbs and adjectives that accompany them."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing that synonym substitution is always safe in collocations (e.g. if 'big mistake' is correct, then 'large mistake' must be equally good).", whyItIsWrong: "Collocations are arbitrary lexical habits; native speakers say 'big mistake', 'grave error', or 'fatal flaw', but rarely 'large mistake'.", correctCorrection: "Store words in contextual chunks rather than isolated dictionary items." }
    ],
    guidedPracticePrompt: "Which verb pairs with 'a complaint': make, do, or take?",
    summaryRecap: "Collocations are natural word partnerships. 'Make' creates; 'do' performs. Learn words in multi-word chunks."
  },

  "skill-esl-cohesive-transitions": {
    id: "les-esl-cohesive-transitions",
    title: "ESL Academic Discourse, Concessive Clauses & Paragraph Cohesion",
    hookAndIntuition: "Imagine listening to an argument where every sentence starts with 'And then...' or 'Also...'. It sounds disconnected and childish. In advanced academic English, discourse markers (like 'Notwithstanding', 'Whereas', and 'Conversely') act as highway signs guiding your reader through sophisticated logic.",
    conceptualExplanation: "Cohesion refers to the grammatical and lexical links that hold a text together and give it structural unity. (1) Concessive Connectors: allow the writer to acknowledge an opposing viewpoint before reaffirming their core thesis. Formulations include: 'Although + clause' (requires no following 'but'), 'Despite / In spite of + noun phrase' (never 'despite of'), and 'Notwithstanding + noun phrase' for high-register C1 discourse. (2) Cause and Effect Markers: 'Consequently', 'As a result', 'Thereby + participle'. (3) Addition and Reinforcement: 'Furthermore', 'Moreover', 'In addition to'. (4) Hedging: academic English prizes epistemic modesty through tentative modal verbs ('may', 'might') and cautious epistemic verbs ('suggests', 'tends to indicate') to prevent over-generalization.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Concessive Clause", definition: "A subordinate clause that acknowledges a counter-fact without overturning the main proposition.", practicalExample: "'Although the temperature dropped sharply, the reaction proceeded to completion.'" },
      { termOrSymbol: "Double Conjunction Error", definition: "Using both a subordinating conjunction and a coordinating conjunction together, creating a grammatical fault.", practicalExample: "INCORRECT: 'Although it rained, but we went out.' CORRECT: 'Although it rained, we went out.'" },
      { termOrSymbol: "Academic Hedging", definition: "Using tentative language to signal intellectual precision and avoid unsubstantiated claims.", practicalExample: "'The empirical findings tend to support the hypothesis' vs 'This proves everything'." }
    ],
    workedExamples: [
      {
        title: "Transforming Fragmented Sentences into a Cohesive Academic Paragraph",
        problemStatement: "Combine these disconnected sentences into a C1 cohesive academic paragraph:\n'Solar power is growing fast. Battery storage is still very expensive. Many rural clinics cannot store energy at night. We need cheaper batteries.'",
        steps: [
          { stepNumber: 1, instruction: "Introduce contrast with a concessive marker.", reasoning: "Start with: 'Notwithstanding the exponential growth of solar power generation, electrical battery storage systems remain prohibitively expensive.'" },
          { stepNumber: 2, instruction: "Connect cause and consequence logically.", reasoning: "'Consequently, rural medical clinics frequently face severe nocturnal energy deficits.'" },
          { stepNumber: 3, instruction: "Synthesize with actionable, academic hedging.", reasoning: "'These findings suggest that state-sponsored subsidies for next-generation iron-air batteries represent an urgent developmental imperative.'" }
        ],
        takeawayRule: "Use 'Notwithstanding', 'Consequently', and 'suggests that' to create seamless, scholarly paragraph architecture."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing 'Despite of the rain...' in formal essays.", whyItIsWrong: "'Despite' is a preposition that takes a direct noun object with NO 'of'. Only 'in spite of' contains the preposition 'of'.", correctCorrection: "Write 'Despite the rain' OR 'In spite of the rain'." }
    ],
    guidedPracticePrompt: "Rewrite this sentence without the double conjunction: 'Although the candidate studied hard, but she failed the grammar test.'",
    summaryRecap: "Discourse markers structure thought. Never combine 'although' with 'but'. 'Despite' takes no 'of'. Hedging ensures academic precision."
  }
};

