/**
 * MOOS TECHY ACADEMY — ENGLISH AS A SECOND LANGUAGE (ESL) PEDAGOGICAL SERVICE
 * 
 * Phase 19: Comprehensive ESL Engine
 * 
 * Implements:
 * - 7 CEFR Levels (Pre-A1 to C2)
 * - 7 Core ESL Domains (Listening, Speaking, Pronunciation, Vocabulary, Grammar, Reading, Writing)
 * - Socratic Diagnostic Engine with 5-Tier Recommendations (FOUNDATION, REMEDIATION, PRACTICE, PROGRESSION, CHALLENGE)
 * - Phonemic minimal pair drills, collocational dictionaries, and authentic communicative scenarios
 */

import {
  CEFRLevel,
  ESLDomain,
  ESLRecommendation,
  PhonemeMinimalPair,
  ContextualVocabularyItem,
  ESLListeningModule,
  ESLSpeakingModule,
  ESLReadingPassage,
  ESLWritingTask,
  ESLDiagnosticQuestion,
  ESLDiagnosticAssessmentResult
} from "../types/esl";

export class ESLLearningService {
  private static instance: ESLLearningService;

  public static getInstance(): ESLLearningService {
    if (!ESLLearningService.instance) {
      ESLLearningService.instance = new ESLLearningService();
    }
    return ESLLearningService.instance;
  }

  // --- REPOSITORY: Minimal Pairs for Phonemic Accuracy ---
  public getPhonemeMinimalPairs(): PhonemeMinimalPair[] {
    return [
      {
        id: "pair-ship-sheep",
        targetPhonemeA: "/ɪ/ (Short lax vowel)",
        targetPhonemeB: "/iː/ (Long tense vowel)",
        wordA: "Ship",
        wordB: "Sheep",
        ipaA: "/ʃɪp/",
        ipaB: "/ʃiːp/",
        sentenceA: "The cargo ship entered Lagos harbour.",
        sentenceB: "The shepherd guided the sheep across the meadow.",
        audioHint: "Keep your tongue relaxed and jaw slightly lower for 'ship'. Stretch the lips slightly for 'sheep'.",
        distinctionTips: "A common error for ESL learners from West Africa and Romance languages is neutralizing short /ɪ/ into long /iː/."
      },
      {
        id: "pair-pen-pan",
        targetPhonemeA: "/e/ (Mid front unrounded)",
        targetPhonemeB: "/æ/ (Open front unrounded)",
        wordA: "Pen",
        wordB: "Pan",
        ipaA: "/pen/",
        ipaB: "/pæn/",
        sentenceA: "Please sign the admission form with a blue pen.",
        sentenceB: "Heat the cooking oil in a flat frying pan.",
        audioHint: "Drop the jaw lower for 'pan'. For 'pen', the mouth is only half-open.",
        distinctionTips: "Crucial for writing and classroom instructions to avoid semantic confusion."
      },
      {
        id: "pair-think-sink",
        targetPhonemeA: "/θ/ (Voiceless dental fricative)",
        targetPhonemeB: "/s/ (Voiceless alveolar fricative)",
        wordA: "Think",
        wordB: "Sink",
        ipaA: "/θɪŋk/",
        ipaB: "/sɪŋk/",
        sentenceA: "Take a moment to think before writing your answer.",
        sentenceB: "The heavy stone began to sink to the bottom of the pond.",
        audioHint: "Place the tip of your tongue lightly between your upper and lower teeth for 'think'.",
        distinctionTips: "Learners often substitute /s/ or /t/ for the dental /θ/ sound."
      },
      {
        id: "pair-this-dis",
        targetPhonemeA: "/ð/ (Voiced dental fricative)",
        targetPhonemeB: "/d/ (Voiced alveolar plosive)",
        wordA: "This",
        wordB: "Dis",
        ipaA: "/ðɪs/",
        ipaB: "/dɪs/",
        sentenceA: "This scientific principle governs thermodynamics.",
        sentenceB: "Do not dismiss the preliminary hypothesis prematurely.",
        audioHint: "Vibrate your vocal cords while keeping the tongue gently touching the top teeth for 'this'.",
        distinctionTips: "Substituting /d/ for /ð/ makes academic spoken discourse sound colloquial or abrupt."
      },
      {
        id: "pair-van-fan",
        targetPhonemeA: "/v/ (Voiced labiodental fricative)",
        targetPhonemeB: "/f/ (Voiceless labiodental fricative)",
        wordA: "Van",
        wordB: "Fan",
        ipaA: "/væn/",
        ipaB: "/fæn/",
        sentenceA: "The delivery van carried laboratory equipment to the school.",
        sentenceB: "The ceiling fan cooled down the examination hall.",
        audioHint: "Touch top teeth to lower lip. Feel vocal cords buzz for 'van', no buzzing for 'fan'.",
        distinctionTips: "Voicing contrast distinguishes critical vocabulary in technical descriptions."
      }
    ];
  }

  // --- REPOSITORY: Contextual Vocabulary & Collocations ---
  public getContextualVocabulary(cefrLevel?: CEFRLevel): ContextualVocabularyItem[] {
    const allItems: ContextualVocabularyItem[] = [
      {
        id: "vocab-make-decision",
        word: "make a decision",
        cefrLevel: "A2",
        partOfSpeech: "collocation" as any,
        definition: "To reach a resolution or choose after thought.",
        exampleSentence: "After weighing the experimental evidence, we need to make a decision.",
        collocations: ["make a tough decision", "delay making a decision", "unanimous decision"],
        commonL1Mistake: "Saying 'do a decision' instead of 'make a decision'.",
        frequencyBand: "Top 500"
      },
      {
        id: "vocab-heavy-rain",
        word: "heavy rain",
        cefrLevel: "A2",
        partOfSpeech: "collocation" as any,
        definition: "A large volume of rain falling over a period.",
        exampleSentence: "Heavy rain delayed the school assembly this morning.",
        collocations: ["torrential rain", "heavy downpour", "forecast heavy rain"],
        commonL1Mistake: "Saying 'strong rain' or 'big rain'.",
        frequencyBand: "Top 1000"
      },
      {
        id: "vocab-conduct-research",
        word: "conduct research",
        cefrLevel: "B2",
        partOfSpeech: "collocation" as any,
        definition: "To carry out a systematic investigation or scientific experiment.",
        exampleSentence: "Undergraduates conduct research in the biochemistry laboratory.",
        collocations: ["conduct empirical research", "publish research", "field research"],
        commonL1Mistake: "Using 'make research' instead of 'conduct research' or 'do research'.",
        frequencyBand: "Academic Word List (AWL)"
      },
      {
        id: "vocab-substantiate",
        word: "substantiate",
        cefrLevel: "C1",
        partOfSpeech: "verb",
        definition: "To provide evidence or factual proof to validate a claim or hypothesis.",
        exampleSentence: "The candidate failed to substantiate his theoretical assertion with empirical citations.",
        collocations: ["substantiate claims", "fully substantiated", "substantiate a hypothesis"],
        falseFriendsAlert: "Not equivalent to 'substance' in material form; strictly refers to empirical verification.",
        frequencyBand: "Academic Word List (AWL)"
      },
      {
        id: "vocab-sensible",
        word: "sensible",
        cefrLevel: "B1",
        partOfSpeech: "adjective",
        definition: "Possessing or displaying good judgment, practicality, and wisdom.",
        exampleSentence: "Wearing goggles in the chemistry laboratory is a sensible safety precaution.",
        collocations: ["sensible decision", "sensible advice", "sensible approach"],
        falseFriendsAlert: "False friend in French/Spanish (sensible = sensitive / easily hurt). In English, 'sensible' means practical/wise.",
        frequencyBand: "Top 3000"
      }
    ];

    if (!cefrLevel) return allItems;
    return allItems.filter((item) => item.cefrLevel === cefrLevel);
  }

  // --- REPOSITORY: Graded Reading Passages ---
  public getReadingPassages(cefrLevel?: CEFRLevel): ESLReadingPassage[] {
    const passages: ESLReadingPassage[] = [
      {
        id: "reading-a2-daily-routine",
        title: "A Day in the Life of a Solar Technician",
        cefrLevel: "A2",
        theme: "workplace",
        wordCount: 145,
        text: "Kofi wakes up at six o'clock every morning. He works as a solar technician in an eco-friendly community in Accra. Before leaving his house, he checks his digital toolkit and battery testing meters. At eight o'clock, Kofi meets his team at the solar farm. They inspect over one hundred solar photovoltaic panels to ensure dust and rainfall have not damaged the wiring. When a panel is malfunctioning, Kofi replaces the inverter and tests the electrical output. He enjoys his job because clean energy powers local clinics and schools.",
        glossary: [
          { word: "technician", meaning: "A skilled person who operates or repairs specialized machinery.", partOfSpeech: "noun" },
          { word: "inspect", meaning: "To look at something carefully to check condition.", partOfSpeech: "verb" },
          { word: "malfunctioning", meaning: "Not working properly.", partOfSpeech: "adjective" }
        ],
        comprehensionQuestions: [
          {
            id: "q-a2-read-1",
            questionText: "What does Kofi do before leaving his house in the morning?",
            options: [
              "He cleans one hundred solar panels",
              "He checks his digital toolkit and meters",
              "He replaces the clinic's electrical inverter",
              "He conducts an academic lecture on clean energy"
            ],
            correctAnswer: "He checks his digital toolkit and meters",
            explanation: "The text explicitly states: 'Before leaving his house, he checks his digital toolkit and battery testing meters.'",
            targetSkill: "scanning"
          },
          {
            id: "q-a2-read-2",
            questionText: "Why does Kofi enjoy his occupation?",
            options: [
              "Because it provides electricity to local clinics and schools",
              "Because he works alone without a team",
              "Because he never works outside in the sun",
              "Because he only works two hours each day"
            ],
            correctAnswer: "Because it provides electricity to local clinics and schools",
            explanation: "The final sentence explains: 'He enjoys his job because clean energy powers local clinics and schools.'",
            targetSkill: "skimming"
          }
        ]
      },
      {
        id: "reading-b2-digital-divide",
        title: "Bridging the Digital Divide in Emerging Economies",
        cefrLevel: "B2",
        theme: "academic",
        wordCount: 220,
        text: "The rapid acceleration of artificial intelligence and cloud computing has widened disparities between technologically saturated urban hubs and underserved rural classrooms. While metropolitan schools possess high-speed fiber-optic bandwidth and interactive displays, remote educational centers frequently contend with intermittent electricity and prohibitive data tariffs. To address this structural asymmetry, multilateral development agencies advocate for offline-first educational software architectures. By synchronizing comprehensive curricula, audio masterclasses, and interactive manipulatives locally within containerized environments, students can achieve deep cognitive mastery regardless of persistent cellular connectivity.",
        glossary: [
          { word: "disparities", meaning: "Noticeable differences or inequalities between things.", partOfSpeech: "noun" },
          { word: "prohibitive", meaning: "So high or burdensome as to prevent purchase or use.", partOfSpeech: "adjective" },
          { word: "asymmetry", meaning: "Lack of equality or equivalence between parts.", partOfSpeech: "noun" }
        ],
        comprehensionQuestions: [
          {
            id: "q-b2-read-1",
            questionText: "What is the primary operational advantage of offline-first educational architectures described in the text?",
            options: [
              "They eliminate the need for certified classroom teachers completely",
              "They enable continuous learning and mastery without requiring persistent connectivity",
              "They reduce computer screen time by printing paper worksheets",
              "They replace standard national examinations with informal games"
            ],
            correctAnswer: "They enable continuous learning and mastery without requiring persistent connectivity",
            explanation: "The text explains that local containerized caching allows students to achieve deep mastery regardless of connectivity.",
            targetSkill: "inference"
          }
        ]
      }
    ];

    if (!cefrLevel) return passages;
    return passages.filter((p) => p.cefrLevel === cefrLevel);
  }

  // --- REPOSITORY: Listening Modules ---
  public getListeningModules(cefrLevel?: CEFRLevel): ESLListeningModule[] {
    return [
      {
        id: "listen-b1-customer-support",
        title: "Resolving a Textbook Order Delivery Query",
        cefrLevel: "B1",
        context: "A telephone conversation between an academy learner and a customer service representative.",
        speakers: [
          { name: "Amina", role: "Learner", accent: "Nigerian English" },
          { name: "David", role: "Support Specialist", accent: "British English" }
        ],
        audioScript: "David: Good morning, MOOS Academy Learning Support, David speaking. How may I assist you today? Amina: Good morning, David. I am calling regarding order number 8402. I purchased the Senior Secondary Mathematics digital interactive textbook three days ago, but the access token has not yet arrived in my verified inbox. David: I apologize for the inconvenience, Amina. Let me verify your account credentials immediately. Did you complete the payment via institutional mobile money or bank transfer? Amina: I used mobile money on Tuesday afternoon. David: Thank you. I can see the transaction reference was confirmed yesterday at 4:00 PM. I am regenerating your cryptographic textbook license right now, and you will receive a direct notification inside your dashboard within two minutes.",
        questions: [
          {
            id: "q-listen-b1-1",
            questionText: "What issue prompted Amina to contact MOOS Academy support?",
            options: [
              "She received the wrong printed textbook",
              "Her digital textbook access token was not received after payment",
              "Her payment was rejected by the financial gateway",
              "She wanted to cancel her subscription"
            ],
            correctAnswer: "Her digital textbook access token was not received after payment",
            explanation: "Amina states: 'I purchased the Senior Secondary Mathematics digital interactive textbook... but the access token has not yet arrived in my verified inbox.'",
            listeningSkillTested: "detail"
          },
          {
            id: "q-listen-b1-2",
            questionText: "What resolution does David provide to solve the problem?",
            options: [
              "He tells Amina to submit a paper refund request",
              "He regenerates the license token directly to her academy dashboard",
              "He advises her to contact her local mobile money vendor",
              "He asks her to wait another three business days"
            ],
            correctAnswer: "He regenerates the license token directly to her academy dashboard",
            explanation: "David says: 'I am regenerating your cryptographic textbook license right now, and you will receive a direct notification inside your dashboard within two minutes.'",
            listeningSkillTested: "main_idea"
          }
        ]
      }
    ];
  }

  // --- REPOSITORY: Guided Writing Tasks with Analytic Rubrics ---
  public getWritingTasks(cefrLevel?: CEFRLevel): ESLWritingTask[] {
    return [
      {
        id: "writing-b1-formal-email",
        title: "Formal Email: Requesting Permission for an Academic Science Fair",
        cefrLevel: "B1",
        taskType: "formal_request",
        instructions: "Write a formal email (120–150 words) to your school principal requesting permission to use the physics laboratory for an after-school robotics project.",
        modelAnswer: "Dear Principal Adeyemi,\n\nI am writing to respectfully request permission to utilize the senior physics laboratory every Wednesday afternoon from 3:30 PM to 5:00 PM. Our student robotics team is currently engineering an autonomous soil-moisture sensor for the upcoming National STEM Olympiad.\n\nWe have already consulted with Mr. Okon, our physics instructor, who has agreed to supervise all laboratory sessions and oversee safety protocol compliance. We assure you that all equipment will be meticulously returned to its original place after each workshop.\n\nThank you very much for your continuous encouragement of practical science education. We look forward to your favorable response.\n\nYours sincerely,\nChidi Eze\nRobotics Team Lead",
        scaffoldingSteps: [
          "Step 1: Open with a formal salutation (Dear Principal [Surname],)",
          "Step 2: State the clear objective in the opening sentence ('I am writing to request...')",
          "Step 3: Provide key factual details (dates, times, adult supervisor present)",
          "Step 4: Reassure the reader regarding laboratory safety and property care",
          "Step 5: Conclude politely and use an appropriate sign-off ('Yours sincerely,')"
        ],
        grammarFocus: [
          "Formal modal verbs for polite requests (would, could, may)",
          "Present continuous for current activities (is engineering)",
          "Present perfect for past completed arrangements (has agreed to supervise)"
        ],
        rubricCriteria: {
          taskAchievement: "Directly addresses all prompts: purpose, supervisor, safety assurance, time and date.",
          cohesionAndCoherence: "Logical paragraphing with clean transitions and appropriate register throughout.",
          vocabularyRange: "Accurate formal lexis ('respectfully request', 'meticulously', 'protocol compliance').",
          grammaticalAccuracy: "Correct modal verb syntax and clause subordination without sentence fragments."
        }
      }
    ];
  }

  // --- Socratic ESL Diagnostic Assessment Suite ---
  public getDiagnosticQuestions(): ESLDiagnosticQuestion[] {
    return [
      {
        id: "diag-esl-01",
        domain: "grammar",
        targetCefr: "A1",
        prompt: "Choose the correct sentence to describe everyday habitual actions:",
        options: [
          "He go to school by bus every morning.",
          "He goes to school by bus every morning.",
          "He is go to school by bus every morning.",
          "He going to school by bus every morning."
        ],
        correctAnswer: "He goes to school by bus every morning.",
        explanation: "Third-person singular subjects (he/she/it) require the -s or -es suffix in the present simple tense for habitual actions.",
        diagnosticFocus: "Subject-verb agreement in present simple"
      },
      {
        id: "diag-esl-02",
        domain: "vocabulary",
        targetCefr: "A2",
        prompt: "Complete the sentence with the natural English collocation: 'Please ______ an effort to arrive punctually.'",
        options: ["do", "make", "take", "bring"],
        correctAnswer: "make",
        explanation: "In English, we say 'make an effort', not 'do an effort'. This is a standard verb-noun collocation.",
        diagnosticFocus: "Collocational verb choice (make vs do)"
      },
      {
        id: "diag-esl-03",
        domain: "pronunciation",
        targetCefr: "B1",
        prompt: "In the noun 'PRO-gress' (forward movement), where does primary syllable stress fall, compared to the verb 'to pro-GRESS'?",
        options: [
          "Noun: first syllable (PRO-gress); Verb: second syllable (pro-GRESS)",
          "Noun: second syllable (pro-GRESS); Verb: first syllable (PRO-gress)",
          "Both are stressed on the first syllable equally",
          "Both are stressed on the second syllable equally"
        ],
        correctAnswer: "Noun: first syllable (PRO-gress); Verb: second syllable (pro-GRESS)",
        explanation: "Two-syllable noun/verb heteronyms in English typically stress the first syllable for nouns (RECORD, PROGRESS, OBJECT) and the second for verbs (re-CORD, pro-GRESS, ob-JECT).",
        diagnosticFocus: "Heteronym syllable stress shifting"
      },
      {
        id: "diag-esl-04",
        domain: "grammar",
        targetCefr: "B2",
        prompt: "Select the sentence that accurately uses the third conditional to express hypothetical past regret:",
        options: [
          "If I knew the answer, I will tell you yesterday.",
          "If I had known the laboratory was locked, I would have arrived earlier to collect the key.",
          "If I have known the laboratory was locked, I would arrive earlier.",
          "If I knew the laboratory was locked, I would had collected the key."
        ],
        correctAnswer: "If I had known the laboratory was locked, I would have arrived earlier to collect the key.",
        explanation: "Third conditional formula: If + past perfect (had known), would have + past participle (would have arrived).",
        diagnosticFocus: "Third conditional hypothetical structure"
      },
      {
        id: "diag-esl-05",
        domain: "listening",
        targetCefr: "B1",
        prompt: "Listen to the speaker's tone: 'I suppose we could try that approach, if you really think it won't fail again.' What attitude is conveyed?",
        audioScript: "I suppose we could try that approach, if you really think it won't fail again.",
        options: [
          "Enthusiastic and eager agreement",
          "Reluctant skepticism with reservations",
          "Complete refusal and anger",
          "Indifference and lack of attention"
        ],
        correctAnswer: "Reluctant skepticism with reservations",
        explanation: "The phrasing 'I suppose we could...' combined with 'if you really think it won't fail again' signals hesitation and polite doubt.",
        diagnosticFocus: "Listening for speaker attitude and nuance"
      },
      {
        id: "diag-esl-06",
        domain: "reading",
        targetCefr: "B2",
        prompt: "Read the excerpt: 'The experimental outcomes were deemed inconclusive, necessitating a secondary trial under stringent temperature controls.' What does 'stringent' mean in this context?",
        options: [
          "Relaxed and informal",
          "Rigorous, strict, and tightly regulated",
          "Uncontrolled and erratic",
          "Temporary and optional"
        ],
        correctAnswer: "Rigorous, strict, and tightly regulated",
        explanation: "In academic scientific contexts, 'stringent controls' denotes rigorous, tight experimental boundaries to prevent confounding variables.",
        diagnosticFocus: "Academic vocabulary in reading context"
      },
      {
        id: "diag-esl-07",
        domain: "writing",
        targetCefr: "C1",
        prompt: "Which cohesive transition best signals a counter-argument backed by empirical evidence in an academic essay?",
        options: [
          "And also, some people think differently.",
          "Notwithstanding these preliminary findings, longitudinal field studies suggest a contrary paradigm.",
          "Besides that, another bad thing happened.",
          "So in conclusion, everybody should agree."
        ],
        correctAnswer: "Notwithstanding these preliminary findings, longitudinal field studies suggest a contrary paradigm.",
        explanation: "'Notwithstanding these preliminary findings...' demonstrates advanced C1 academic register and precise concessive transitional framing.",
        diagnosticFocus: "C1 Academic cohesion and concessive clauses"
      }
    ];
  }

  /**
   * Socratic Evaluation Engine: computes domain scores, CEFR level, and 5-tier recommendation
   */
  public evaluateDiagnostic(responses: Record<string, string>): ESLDiagnosticAssessmentResult {
    const questions = this.getDiagnosticQuestions();
    let correctCount = 0;

    const domainBreakdown: Record<ESLDomain, { total: number; correct: number }> = {
      listening: { total: 0, correct: 0 },
      speaking: { total: 0, correct: 0 },
      pronunciation: { total: 0, correct: 0 },
      vocabulary: { total: 0, correct: 0 },
      grammar: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
      writing: { total: 0, correct: 0 },
      functional: { total: 0, correct: 0 },
      academic: { total: 0, correct: 0 },
      workplace: { total: 0, correct: 0 },
      exam_prep: { total: 0, correct: 0 }
    };

    questions.forEach((q) => {
      const userAns = responses[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (domainBreakdown[q.domain]) {
        domainBreakdown[q.domain].total += 1;
        if (isCorrect) domainBreakdown[q.domain].correct += 1;
      }
      if (isCorrect) correctCount++;
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // CEFR Level derivation
    let assignedCefr: CEFRLevel = "Pre-A1";
    if (percentage >= 90) assignedCefr = "C1";
    else if (percentage >= 75) assignedCefr = "B2";
    else if (percentage >= 60) assignedCefr = "B1";
    else if (percentage >= 45) assignedCefr = "A2";
    else if (percentage >= 30) assignedCefr = "A1";
    else assignedCefr = "Pre-A1";

    // 5-Tier Pedagogical Recommendation
    let recommendation: ESLRecommendation = "FOUNDATION";
    if (percentage < 35) recommendation = "FOUNDATION";
    else if (percentage < 55) recommendation = "REMEDIATION";
    else if (percentage < 75) recommendation = "PRACTICE";
    else if (percentage < 90) recommendation = "PROGRESSION";
    else recommendation = "CHALLENGE";

    const domainProficiencies: Record<ESLDomain, { scorePercentage: number; cefrLevel: CEFRLevel }> = {} as any;
    (Object.keys(domainBreakdown) as ESLDomain[]).forEach((domain) => {
      const item = domainBreakdown[domain];
      const p = item.total > 0 ? Math.round((item.correct / item.total) * 100) : percentage;
      let dCefr: CEFRLevel = "Pre-A1";
      if (p >= 85) dCefr = "C1";
      else if (p >= 70) dCefr = "B2";
      else if (p >= 55) dCefr = "B1";
      else if (p >= 40) dCefr = "A2";
      else if (p >= 25) dCefr = "A1";
      domainProficiencies[domain] = { scorePercentage: p, cefrLevel: dCefr };
    });

    // Targeted unit recommendation based on score
    let startingUnitId = "unit-esl-foundations-a1";
    if (assignedCefr === "A2") startingUnitId = "unit-esl-elementary-a2";
    else if (assignedCefr === "B1") startingUnitId = "unit-esl-intermediate-b1";
    else if (assignedCefr === "B2") startingUnitId = "unit-esl-upper-intermediate-b2";
    else if (assignedCefr === "C1") startingUnitId = "unit-esl-academic-advanced-c1";

    return {
      learnerId: `esl-learner-${Date.now().toString(36)}`,
      evaluatedAt: new Date().toISOString(),
      overallScorePercentage: percentage,
      assignedCefrLevel: assignedCefr,
      recommendation,
      domainProficiencies,
      recommendedStartingUnitId: startingUnitId,
      prioritySkillsToStrengthen: [
        "Phonemic dental fricatives (/θ/ and /ð/) distinction",
        "Subject-verb concord with collective nouns",
        "Contextual collocation mastery (make vs do, heavy rain)",
        "Cohesive paragraph construction with concessive transitional phrases"
      ],
      remediationPathways: [
        "Interactive Phonetics Lab: Minimal pairs voice playback with waveform visual feedback",
        "Collocation Drill: High-frequency phrase sorting and context fill-in",
        "Socratic Dialogue Simulator: Multi-turn conversational speaking prompts"
      ],
      pedagogicalRationale: `Based on an empirical score of ${percentage}%, the learner demonstrates ${assignedCefr} competence. The diagnostic indicates a recommendation of ${recommendation}, directing pedagogical sequencing toward ${startingUnitId} with active phonemic and syntactic scaffolding.`
    };
  }

  /**
   * CEFR Descriptors for instructional clarity
   */
  public getCefrLevelDescriptor(level: CEFRLevel): { title: string; description: string; canDoSummary: string } {
    const descriptors: Record<CEFRLevel, { title: string; description: string; canDoSummary: string }> = {
      "Pre-A1": {
        title: "Pre-A1: Foundational Literacy & Phonics",
        description: "Initial recognition of English alphabet, phoneme-grapheme correspondences, and basic greetings.",
        canDoSummary: "Can recognize familiar words, spell own name, and understand simple one-word commands."
      },
      "A1": {
        title: "A1: Beginner / Breakthrough",
        description: "Basic everyday expressions and very simple phrases aimed at satisfaction of concrete needs.",
        canDoSummary: "Can introduce self and others, ask and answer personal questions about home, possessions, and acquaintances."
      },
      "A2": {
        title: "A2: Elementary / Waystage",
        description: "Sentences and frequently used expressions related to immediate areas of priority (family, shopping, local geography, employment).",
        canDoSummary: "Can communicate in simple and routine tasks requiring direct exchange of information on familiar matters."
      },
      "B1": {
        title: "B1: Intermediate / Threshold",
        description: "Main points of clear standard input on familiar matters regularly encountered in work, school, and leisure.",
        canDoSummary: "Can deal with most situations likely to arise while travelling, describe experiences, events, dreams, and give reasons for opinions."
      },
      "B2": {
        title: "B2: Upper Intermediate / Vantage",
        description: "Main ideas of complex text on concrete and abstract topics, including technical discussions in own specialization.",
        canDoSummary: "Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain."
      },
      "C1": {
        title: "C1: Advanced / Effective Operational Proficiency",
        description: "Demanding, longer texts, and recognize implicit meaning across social, academic, and professional communication.",
        canDoSummary: "Can express ideas fluently and spontaneously without much obvious searching for expressions, using language flexibly for complex discourse."
      },
      "C2": {
        title: "C2: Mastery / Native-like Proficiency",
        description: "Effortless understanding of virtually everything heard or read, summarizing arguments into coherent presentations.",
        canDoSummary: "Can express him/herself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in complex situations."
      }
    };

    return descriptors[level] || descriptors["B1"];
  }
}

export const eslLearningService = ESLLearningService.getInstance();
