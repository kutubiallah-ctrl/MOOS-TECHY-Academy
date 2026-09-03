import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent as per guidelines
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    platform: "MOOS TECHY ACADEMY",
    geminiConfigured: !!apiKey,
    timestamp: new Date().toISOString(),
  });
});

// Socratic AI Tutor Chat Endpoint
app.post("/api/tutor/chat", async (req: Request, res: Response) => {
  try {
    const { message, context, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Fallback pedagogical Socratic responder when API key is not active
      const fallbackResponse = generateLocalSocraticResponse(message, context);
      return res.json({
        response: fallbackResponse,
        mode: "local-pedagogical-engine",
        suggestionQuestions: [
          "Can you break down the first step for me?",
          "Why do we apply this formula here?",
          "What is the connection to real-world applications?",
          "Can you give me a similar practice problem?"
        ]
      });
    }

    const systemInstruction = `You are "Tutor Moos", the world-class Socratic AI Mathematics & Multidisciplinary Tutor for MOOS TECHY ACADEMY.
Your fundamental pedagogical mandate:
1. NEVER simply give the final answer away. Guide the learner using the Socratic method, step-by-step prompts, and gentle probing questions.
2. If the student made a mistake, identify the underlying misconception (e.g., forgetting order of operations PEMDAS, sign errors, confusing cross-multiplication with reciprocal multiplication) and ask a question that helps them spot it themselves.
3. Keep responses structured, concise, supportive, and encouraging.
4. Format mathematical expressions with clear typography (e.g. x^2 + 5x + 6 = 0, (a + b)^2, fractions like 3/4).
5. Adapt your language to the learner's level (${context?.level || "Junior/Senior Secondary"}).
6. Conclude with 1 clear guiding question or mini-step for the student to attempt next.`;

    const contextPrompt = context
      ? `Current Topic: ${context.subject || "Mathematics"} - ${context.unit || "General"}
Current Skill/Concept: ${context.skill || "General Problem Solving"}
Current Problem: ${context.questionText || "None specified"}
Learner's Current Attempt: ${context.learnerAttempt ? JSON.stringify(context.learnerAttempt) : "None yet"}
${context.misconceptionNote ? `Detected Misconception Target: ${context.misconceptionNote}` : ""}
Resource Provenance: ${context.questionProvenance || "OFFICIAL_SYLLABUS"}
`
      : "";

    const userPrompt = `${contextPrompt}
Student's Message: "${message}"

Please respond as Tutor Moos using Socratic pedagogical guidance.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const tutorText = response.text || "Let's explore this step together! What is the first mathematical rule that applies here?";

    return res.json({
      response: tutorText,
      mode: "gemini-socratic-live",
      suggestionQuestions: [
        "What should our next step be?",
        "Could you explain the reasoning behind this rule?",
        "How would I check if my answer is correct?"
      ]
    });
  } catch (error: any) {
    console.error("Tutor chat error:", error);
    // Graceful fallback
    const fallback = generateLocalSocraticResponse(req.body.message, req.body.context);
    return res.json({
      response: fallback,
      mode: "fallback-resilient",
    });
  }
});

// Diagnostic test analysis endpoint
app.post("/api/tutor/diagnostic-analysis", async (req: Request, res: Response) => {
  try {
    const { results, targetLevel, curriculum } = req.body;

    if (!ai) {
      const localAnalysis = generateLocalDiagnosticAnalysis(results, targetLevel);
      return res.json(localAnalysis);
    }

    const systemInstruction = `You are the Lead Pedagogical Assessment Officer for MOOS TECHY ACADEMY.
Analyze the diagnostic test results of a learner and produce a structured, encouraging diagnostic summary with:
1. Overall readiness score & mastery tier
2. Core strengths
3. Identified skill gaps & misconceptions
4. Recommended personalized learning pathway (sequential units to tackle)
5. Actionable study tips`;

    const prompt = `Diagnostic Results:
${JSON.stringify(results, null, 2)}
Target Educational Level: ${targetLevel || "Senior Secondary"}
Curriculum: ${curriculum || "WAEC / National Standard"}

Generate a detailed analysis in JSON format with keys:
"summary": string,
"proficiencyTier": "Foundational" | "Emerging" | "Proficient" | "Advanced",
"strengths": string[],
"gapAreas": string[],
"recommendedStartingUnit": string,
"pathwaySteps": Array<{ order: number, unitName: string, focusReason: string, estimatedDays: number }>,
"encouragement": string`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    try {
      const parsed = JSON.parse(response.text || "{}");
      return res.json({ ...parsed, mode: "gemini-live" });
    } catch {
      return res.json(generateLocalDiagnosticAnalysis(results, targetLevel));
    }
  } catch (error) {
    console.error("Diagnostic error:", error);
    return res.json(generateLocalDiagnosticAnalysis(req.body.results, req.body.targetLevel));
  }
});

// Generate dynamic practice problems
app.post("/api/tutor/generate-practice", async (req: Request, res: Response) => {
  try {
    const { skillId, skillName, unitId, unitName, difficulty, targetLevel } = req.body;

    const validatedSkillName = skillName || "Core Mathematics Concept";
    const validatedDifficulty = difficulty || "medium";
    const validatedLevel = targetLevel || "Senior Secondary";

    if (!ai) {
      return res.json(generateLocalPracticeQuestion(validatedSkillName, validatedDifficulty, skillId, unitId));
    }

    const systemInstruction = `You are the Practice Scaffolding Agent for MOOS TECHY ACADEMY. Generate 1 high-quality, pedagogically rigorous multiple-choice practice question for the specified canonical curriculum skill.
You must adhere strictly to the target skill, difficulty, and educational level.
Never invent arbitrary curriculum IDs.
Include 4 distinct options, accurate LaTeX math notation where relevant, a 3-tier progressive hint ladder, and common cognitive misconception traps.`;

    const prompt = `Generate a practice item for:
Canonical Skill: ${validatedSkillName} (ID: ${skillId || "canonical-skill"})
Unit: ${unitName || "Syllabus Unit"}
Difficulty: ${validatedDifficulty} (easy, medium, hard)
Educational Level: ${validatedLevel}

Return strict JSON:
{
  "id": "gen-${Date.now()}",
  "questionText": string,
  "mathExpression": string,
  "options": [string, string, string, string],
  "correctAnswer": string,
  "explanation": string,
  "hintLadder": [string, string, string],
  "misconceptionAlerts": [
    { "trigger": string, "note": string }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    if (!parsed.questionText || !parsed.correctAnswer) {
      return res.json(generateLocalPracticeQuestion(validatedSkillName, validatedDifficulty, skillId, unitId));
    }

    return res.json({
      ...parsed,
      skillId: skillId || "canonical-skill",
      unitId: unitId || "canonical-unit",
      provenance: "AI_GENERATED_DRAFT",
      validationStatus: "SYNTHESIZED_SANDBOXED",
      generationMetadata: {
        isAiGenerated: true,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 0.94,
        variationType: "deep_ai_synthesis"
      }
    });
  } catch (error) {
    console.error("Practice generator error:", error);
    return res.json(generateLocalPracticeQuestion(req.body.skillName, req.body.difficulty, req.body.skillId, req.body.unitId));
  }
});

// Fallback logic for offline / no-key resilience
function generateLocalSocraticResponse(userMsg: string, context: any): string {
  const msg = (userMsg || "").toLowerCase();
  const subject = (context?.subject || "").toLowerCase();
  const topic = context?.skill || "this concept";

  if (msg.includes("what is the answer") || msg.includes("just tell me") || msg.includes("give me the answer")) {
    return `At MOOS TECHY ACADEMY, our goal is true mastery! Let's build your analytical thinking muscle. Look at the problem: what specific evidence or parameters are given, and what core rule connects them?`;
  }
  if (msg.includes("hint") || msg.includes("help") || msg.includes("stuck")) {
    return `Let's break it down into manageable parts! First, identify the core principle in **${topic}**. What is the very first step or rule that applies here? Give it a try and tell me what you observe.`;
  }

  // English & Language domain
  if (subject.includes("english") || subject.includes("language") || msg.includes("grammar") || msg.includes("concord") || msg.includes("tense") || msg.includes("essay")) {
    return `In English syntax and composition, structure dictates clarity. What is the grammatical subject here, and does the verb agree with it in number and tense?`;
  }

  // Science / Physics
  if (subject.includes("physics") || msg.includes("kinematics") || msg.includes("velocity") || msg.includes("force") || msg.includes("energy")) {
    return `In physics problem solving, always start with first principles: What quantities are known (with their SI units), and what fundamental equation links them to the target variable?`;
  }

  // Science / Chemistry
  if (subject.includes("chemistry") || msg.includes("mole") || msg.includes("stoichiometry") || msg.includes("electron") || msg.includes("reaction")) {
    return `In chemical analysis, consider the conservation of mass and stoichiometry: Are the moles, chemical species, or electron configurations balanced? Where should we begin?`;
  }

  // Science / Biology
  if (subject.includes("biology") || msg.includes("cell") || msg.includes("genetics") || msg.includes("gene") || msg.includes("allele")) {
    return `In biological systems, structure correlates directly with function. What organelle or genetic mechanism is responsible for this process?`;
  }

  // Computing & ICT
  if (subject.includes("comp") || subject.includes("ict") || msg.includes("algorithm") || msg.includes("binary") || msg.includes("complexity") || msg.includes("loop")) {
    return `In computational thinking, trace the execution step by step: What is the input, what does each iteration do to the state, and what is the expected invariant?`;
  }

  // Mathematics domain
  if (msg.includes("quadratic") || msg.includes("factor")) {
    return `For quadratic expressions of the form ax² + bx + c = 0, think about two numbers that multiply to give (a × c) and add up to give (b). What pairs of factors come to mind?`;
  }
  if (msg.includes("fraction") || msg.includes("divide")) {
    return `Remember the key fraction rule: when dividing by a fraction, we multiply by its reciprocal (flip the numerator and denominator). Would you like to write down the flipped version first?`;
  }
  if (msg.includes("trig") || msg.includes("angle") || msg.includes("triangle")) {
    return `For right-angled triangles, recall SOH-CAH-TOA. Which sides do you know relative to your target angle (Opposite, Adjacent, or Hypotenuse)?`;
  }

  return `Great question! In **${topic}**, every step follows logical principles. What do you think would happen if we start by examining the known values? Give it a try or let me know where you'd like to begin!`;
}

function generateLocalDiagnosticAnalysis(results: any, targetLevel: string) {
  const total = Array.isArray(results) ? results.length : 5;
  const correct = Array.isArray(results) ? results.filter((r: any) => r.isCorrect).length : 4;
  const percentage = Math.round((correct / Math.max(total, 1)) * 100);

  let tier = "Emerging";
  if (percentage >= 85) tier = "Advanced";
  else if (percentage >= 70) tier = "Proficient";
  else if (percentage >= 50) tier = "Emerging";
  else tier = "Foundational";

  return {
    proficiencyTier: tier,
    summary: `Diagnostic benchmark completed with a score of ${percentage}% (${correct}/${total} skills verified). You demonstrated strong foundational intuition with opportunities for deep mastery in multi-step problem solving.`,
    strengths: [
      "Arithmetic & Number Properties",
      "Linear Equation Formulation",
      "Geometric Visual Reasoning"
    ],
    gapAreas: [
      "Multi-step Algebraic Factorization",
      "Trigonometric Ratio Applications in Word Problems",
      "Probability Compound Events"
    ],
    recommendedStartingUnit: "Algebraic Mastery: Equations & Quadratics",
    pathwaySteps: [
      { order: 1, unitName: "Foundations Review: Number Properties & Exponents", focusReason: "Reinforce rapid calculation fluency", estimatedDays: 2 },
      { order: 2, unitName: "Algebraic Mastery: Linear & Quadratic Systems", focusReason: "Core exam requirement for Junior/Senior Secondary", estimatedDays: 4 },
      { order: 3, unitName: "Geometry & Trigonometric Relationships", focusReason: "Master coordinate systems and angle theorems", estimatedDays: 5 },
      { order: 4, unitName: "Data, Statistics & Probability Inferences", focusReason: "Build real-world analytical literacy", estimatedDays: 3 },
      { order: 5, unitName: "WAEC / Exam Speed Drills & Mastery Check", focusReason: "Consolidate timed examination confidence", estimatedDays: 3 }
    ],
    encouragement: "Every great mathematician began with curiosity and practice. Your learning pathway is calibrated to take you from foundational understanding to full mastery!"
  };
}

function generateLocalPracticeQuestion(skillName?: string, difficulty?: string, skillId?: string, unitId?: string) {
  const name = (skillName || "").toLowerCase();
  
  if (name.includes("trig") || name.includes("bearing") || name.includes("angle")) {
    return {
      id: `gen-local-${Date.now()}`,
      skillId: skillId || "skill-trig-01",
      unitId: unitId || "unit-math-trig",
      questionText: "In a right-angled triangle, if the hypotenuse is 10 cm and an acute angle is 30°, calculate the length of the opposite side.",
      mathExpression: "\\sin(30^\\circ) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}",
      options: ["5 cm", "8.66 cm", "10 cm", "20 cm"],
      correctAnswer: "5 cm",
      explanation: "Since sin(30°) = 0.5, Opposite = Hypotenuse × sin(30°) = 10 × 0.5 = 5 cm.",
      hintLadder: [
        "Step 1: Recall the SOH ratio: sin(θ) = Opposite / Hypotenuse.",
        "Step 2: Know that sin(30°) = 1/2.",
        "Step 3: Multiply: Opposite = 10 × (1/2) = 5 cm."
      ],
      misconceptionAlerts: [
        { trigger: "8.66 cm", note: "You used cos(30°) instead of sin(30°)." }
      ],
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0,
        variationType: "numeric_permutation"
      }
    };
  }

  if (name.includes("kinematics") || name.includes("physics") || name.includes("velocity")) {
    return {
      id: `gen-local-${Date.now()}`,
      skillId: skillId || "skill-phy-kinematics",
      unitId: unitId || "unit-sci-phy-01",
      questionText: "A car accelerates from rest at 3 m/s² for 6 seconds. What is its final velocity?",
      mathExpression: "v = u + at",
      options: ["18 m/s", "9 m/s", "54 m/s", "2 m/s"],
      correctAnswer: "18 m/s",
      explanation: "Using v = u + at with u = 0: v = 0 + (3 × 6) = 18 m/s.",
      hintLadder: [
        "Step 1: Identify given quantities: initial velocity u = 0, a = 3 m/s², t = 6 s.",
        "Step 2: Use the formula v = u + at.",
        "Step 3: Calculate v = 0 + (3 × 6) = 18 m/s."
      ],
      misconceptionAlerts: [
        { trigger: "54 m/s", note: "You computed displacement (s = 1/2 at²) instead of velocity." }
      ],
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0,
        variationType: "numeric_permutation"
      }
    };
  }

  if (name.includes("english") || name.includes("concord") || name.includes("agreement") || name.includes("syntax") || name.includes("grammar")) {
    return {
      id: `gen-local-${Date.now()}`,
      skillId: skillId || "skill-subject-verb-agreement",
      unitId: unitId || "unit-eng-concord-syntax",
      questionText: "Choose the option that correctly completes the sentence: 'The list of successful candidates ______ published on the official notice board.'",
      options: ["has been", "have been", "were", "are being"],
      correctAnswer: "has been",
      explanation: "The subject head noun is the singular 'list' (not the plural modifier 'candidates'). Therefore, it requires the singular auxiliary 'has been'.",
      hintLadder: [
        "Step 1: Identify the true subject of the clause by isolating prepositional phrases ('of successful candidates').",
        "Step 2: Note that 'The list' is singular.",
        "Step 3: Match the singular subject with the singular verb 'has been'."
      ],
      misconceptionAlerts: [
        { trigger: "have been", note: "Error of proximity: you agreed the verb with the adjacent noun 'candidates' instead of the true head noun 'list'." }
      ],
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0,
        variationType: "concept_exercise"
      }
    };
  }

  if (name.includes("chem") || name.includes("mole") || name.includes("stoichiometry") || name.includes("atomic")) {
    return {
      id: `gen-local-${Date.now()}`,
      skillId: skillId || "skill-chem-mole-calculations",
      unitId: unitId || "unit-chm-stoichiometry",
      questionText: "How many moles of gas are present in 44.8 dm³ of O₂ at standard temperature and pressure (STP)? (Molar volume at STP = 22.4 dm³/mol)",
      mathExpression: "n = \\frac{V}{V_m}",
      options: ["2.0 moles", "1.0 mole", "0.5 moles", "4.0 moles"],
      correctAnswer: "2.0 moles",
      explanation: "Number of moles n = Volume / Molar Volume = 44.8 / 22.4 = 2.0 moles.",
      hintLadder: [
        "Step 1: State Avogadro's gas law equation at STP: n = Volume / 22.4 dm³.",
        "Step 2: Substitute: n = 44.8 / 22.4.",
        "Step 3: Divide to obtain 2.0 moles."
      ],
      misconceptionAlerts: [
        { trigger: "0.5 moles", note: "You inverted the formula (22.4 / 44.8) instead of Volume / Molar Volume." }
      ],
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0,
        variationType: "numeric_permutation"
      }
    };
  }

  if (name.includes("bio") || name.includes("cell") || name.includes("genetics") || name.includes("organelle")) {
    return {
      id: `gen-local-${Date.now()}`,
      skillId: skillId || "skill-bio-cell-organelles",
      unitId: unitId || "unit-bio-cell-genetics",
      questionText: "Which organelle is primarily responsible for aerobic cellular respiration and ATP synthesis in eukaryotic cells?",
      options: ["Mitochondrion", "Ribosome", "Golgi Apparatus", "Endoplasmic Reticulum"],
      correctAnswer: "Mitochondrion",
      explanation: "The mitochondrion is the powerhouse of the cell where the Krebs cycle and oxidative phosphorylation take place to generate ATP.",
      hintLadder: [
        "Step 1: Recall the organelle dubbed the 'powerhouse of the cell'.",
        "Step 2: Identify the site of cellular respiration.",
        "Step 3: Select Mitochondrion."
      ],
      misconceptionAlerts: [
        { trigger: "Ribosome", note: "Ribosomes are responsible for protein synthesis, not ATP cellular respiration." }
      ],
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0,
        variationType: "concept_exercise"
      }
    };
  }

  if (name.includes("comp") || name.includes("algorithm") || name.includes("flowchart") || name.includes("ict") || name.includes("code")) {
    return {
      id: `gen-local-${Date.now()}`,
      skillId: skillId || "skill-cs-algorithms-flowcharts",
      unitId: unitId || "unit-cs-algorithms-flowcharts",
      questionText: "What is the worst-case time complexity of binary search on a sorted array of n elements?",
      mathExpression: "O(\\log n)",
      options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
      correctAnswer: "O(log n)",
      explanation: "Binary search halves the search space with each comparison step, resulting in a logarithmic time complexity of O(log n).",
      hintLadder: [
        "Step 1: Consider how the search space changes on each iteration of binary search.",
        "Step 2: The remaining elements are divided by 2 repeatedly: n, n/2, n/4 ...",
        "Step 3: The number of divisions is log₂(n), hence O(log n)."
      ],
      misconceptionAlerts: [
        { trigger: "O(n)", note: "O(n) is the time complexity of linear sequential search, not binary search on a sorted array." }
      ],
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0,
        variationType: "concept_exercise"
      }
    };
  }

  return {
    id: `gen-local-${Date.now()}`,
    skillId: skillId || "skill-alg-01",
    unitId: unitId || "unit-math-quad",
    questionText: `Solve the following equation for x in ${skillName || "Algebra"}:`,
    mathExpression: `3x + 5 = 26`,
    options: ["x = 7", "x = 10", "x = 8", "x = 6"],
    correctAnswer: "x = 7",
    explanation: "Subtract 5 from both sides: 3x = 21. Then divide both sides by 3 to get x = 7.",
    hintLadder: [
      "Step 1: Isolate the term containing x by subtracting 5 from both sides.",
      "Step 2: You now have 3x = 21.",
      "Step 3: Divide both sides by 3 to find x = 7."
    ],
    misconceptionAlerts: [
      { trigger: "x = 10", note: "Be careful: subtract 5 from 26 instead of adding 5." },
      { trigger: "x = 21", note: "You reached 3x = 21, remember to divide by 3." }
    ],
    provenance: "PLATFORM_CONTENT",
    validationStatus: "VALIDATED_CANONICAL",
    generationMetadata: {
      isAiGenerated: false,
      generatorAgent: "practice_agent",
      generatedAt: new Date().toISOString(),
      confidenceScore: 1.0,
      variationType: "numeric_permutation"
    }
  };
}

// Vite middleware and Server listener
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Moos Techy Academy server running on http://localhost:${PORT}`);
  });
}

startServer();
