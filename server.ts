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
Learner's Current Attempt: ${context.learnerAttempt || "None yet"}
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
    const { skillName, difficulty, targetLevel } = req.body;

    if (!ai) {
      return res.json(generateLocalPracticeQuestion(skillName, difficulty));
    }

    const systemInstruction = `You are a curriculum content generator for MOOS TECHY ACADEMY. Generate 1 high-quality, pedagogically sound mathematical problem for the specified skill.`;

    const prompt = `Create a multiple-choice practice question for:
Skill: ${skillName || "Quadratic Equations"}
Difficulty: ${difficulty || "medium"} (easy, medium, hard)
Level: ${targetLevel || "Senior Secondary"}

Return in strict JSON:
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
    return res.json(parsed);
  } catch (error) {
    console.error("Practice generator error:", error);
    return res.json(generateLocalPracticeQuestion(req.body.skillName, req.body.difficulty));
  }
});

// Fallback logic for offline / no-key resilience
function generateLocalSocraticResponse(userMsg: string, context: any): string {
  const msg = (userMsg || "").toLowerCase();
  const topic = context?.skill || "this math concept";

  if (msg.includes("what is the answer") || msg.includes("just tell me") || msg.includes("give me the answer")) {
    return `At MOOS TECHY ACADEMY, our goal is true mastery! Let's build your problem-solving muscle. Look at the problem: what information is already given to us, and what formula connects those quantities?`;
  }
  if (msg.includes("hint") || msg.includes("help") || msg.includes("stuck")) {
    return `Let's break it down into manageable parts! First, identify the core operation in **${topic}**. What happens if you isolate the variable or simplify the parentheses first? Try that first step and tell me what you get.`;
  }
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

function generateLocalPracticeQuestion(skillName: string, difficulty: string) {
  return {
    id: `gen-${Date.now()}`,
    questionText: `Solve the following equation for x in ${skillName || "Algebra"}:`,
    mathExpression: `2x + 7 = 19`,
    options: ["x = 6", "x = 12", "x = 5.5", "x = 7"],
    correctAnswer: "x = 6",
    explanation: "Subtract 7 from both sides: 2x = 12. Then divide both sides by 2 to get x = 6.",
    hintLadder: [
      "Step 1: Isolate the term containing x by subtracting 7 from both sides of the equation.",
      "Step 2: You now have 2x = 12.",
      "Step 3: Divide both sides by 2 to find x = 6."
    ],
    misconceptionAlerts: [
      { trigger: "x = 13", note: "Be careful: subtract 7 instead of adding 7 to the right-hand side." },
      { trigger: "x = 12", note: "You reached 2x = 12, don't forget to divide by the coefficient 2." }
    ]
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
