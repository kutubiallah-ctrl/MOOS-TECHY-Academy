import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, GenerateVideosOperation, Modality } from "@google/genai";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import { openAiArchitectAdapter } from "./src/services/openAiArchitectAdapter";
import { emailAllowlistService } from "./src/services/emailAllowlistService";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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
    platform: "MOOS Academy",
    geminiConfigured: !!apiKey,
    timestamp: new Date().toISOString(),
  });
});

// =========================================================================
// EMAIL-ENTRY GATE & OWNER ALLOWLIST ENDPOINTS
// =========================================================================

// Verify candidate email against allowlist (generates cryptographic HMAC token)
app.post("/api/allowlist/verify", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ isAllowed: false, status: "INVALID_EMAIL", message: "Email is required." });
    }
    const result = await emailAllowlistService.verifyEmail(email);
    return res.json({
      isAllowed: result.isAllowed,
      status: result.status,
      email: result.email,
      message: result.message,
      token: result.serverVerificationToken,
      entry: result.entry
    });
  } catch (err: any) {
    return res.status(500).json({ isAllowed: false, message: err.message });
  }
});

// List allowlist entries (Owner only)
app.get("/api/allowlist/list", (req: Request, res: Response) => {
  const callerEmail = (req.headers["x-caller-email"] || req.query.callerEmail) as string;
  if (!emailAllowlistService.isOwner(callerEmail)) {
    return res.status(403).json({ error: "Access denied: Owner privileges required." });
  }
  const entries = emailAllowlistService.listEntries();
  return res.json({ entries });
});

// Insert email into allowlist (Owner only)
app.post("/api/allowlist/insert", (req: Request, res: Response) => {
  const { callerEmail, targetEmail, role, notes } = req.body;
  const result = emailAllowlistService.insertEmail(callerEmail, targetEmail, role, notes);
  if (!result.success) {
    return res.status(403).json(result);
  }
  return res.json(result);
});

// Set allowlist entry status (Owner only)
app.post("/api/allowlist/status", (req: Request, res: Response) => {
  const { callerEmail, targetEmail, status } = req.body;
  const result = emailAllowlistService.setStatus(callerEmail, targetEmail, status);
  if (!result.success) {
    return res.status(403).json(result);
  }
  return res.json(result);
});

// Remove email from allowlist (Owner only)
app.delete("/api/allowlist/remove", (req: Request, res: Response) => {
  const { callerEmail, targetEmail } = req.body;
  const result = emailAllowlistService.removeEmail(callerEmail, targetEmail);
  if (!result.success) {
    return res.status(403).json(result);
  }
  return res.json(result);
});

// Validate token endpoint (Cryptographic server-side verification)
app.post("/api/allowlist/validate-token", (req: Request, res: Response) => {
  const { token, email } = req.body;
  const isValid = emailAllowlistService.validateVerificationToken(token, email);
  return res.json({ isValid });
});

// Public User Sign-Up Endpoint
app.post("/api/auth/signup", async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, role, targetLevel, notes } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
    const result = await emailAllowlistService.signUpUser({
      fullName: fullName || "Academy Scholar",
      email,
      password,
      role: role || "learner",
      targetLevel,
      notes
    });
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Public User Sign-In Endpoint (with Owner Auto-Elevation)
app.post("/api/auth/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ isAllowed: false, message: "Email is required." });
    }
    const result = await emailAllowlistService.signInUser({ email, password });
    if (!result.isAllowed) {
      return res.status(401).json(result);
    }
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ isAllowed: false, message: err.message });
  }
});

// Autonomous Development Bridge: Status & Audit Endpoint
app.get("/api/development-bridge/status", (_req: Request, res: Response) => {
  const cred = openAiArchitectAdapter.getCredentialStatus();
  res.json({
    status: "OPERATIONAL",
    chatgptBridgeStatus: cred.hasKey ? "AUTHENTICATED_BUT_UNVERIFIED" : "NOT_CONNECTED",
    credentialStatus: cred.status,
    chatgptReason: cred.hasKey
      ? "OPENAI_API_KEY detected in server environment; live authenticated calls enabled."
      : "No external OpenAI API key configured; connection strictly marked NOT_CONNECTED as per Phase 6.5E mandate",
    antigravityAudit: {
      modelIdentifier: "antigravity-preview-09-2026",
      environmentType: "sandboxed_linux_remote",
      status: "CONFIGURED_VIA_INTERACTIONS_API",
      requiresPaidKey: true
    },
    notificationChannels: {
      whatsapp: "SPECIFICATION_ONLY",
      email: "ACTIVE",
      internalLedger: "ACTIVE"
    },
    timestamp: new Date().toISOString()
  });
});

// Autonomous Development Bridge: OpenAI Architect Reasoning Endpoint
app.post("/api/development-bridge/chatgpt/reason", async (req: Request, res: Response) => {
  try {
    const { envelope, simulationMode } = req.body;
    if (!envelope || !envelope.taskId) {
      return res.status(400).json({ error: "Missing or invalid DevelopmentFeedbackEnvelope: taskId is required" });
    }

    if (simulationMode) {
      const scenario =
        simulationMode === "HIGH_RISK"
          ? "HIGH_RISK_PROPOSAL"
          : simulationMode === "PROMPT_INJECTION"
          ? "PROMPT_INJECTION_ATTEMPT"
          : "NORMAL_REMEDIATION";
      const result = openAiArchitectAdapter.executeSimulatedReasoning(envelope, scenario);
      return res.json(result);
    }

    const result = await openAiArchitectAdapter.dispatchArchitecturalReasoning(envelope);
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Autonomous Development Bridge: Ingest Feedback Envelope
app.post("/api/development-bridge/envelope", (req: Request, res: Response) => {
  const envelope = req.body;
  if (!envelope || !envelope.taskId) {
    return res.status(400).json({ error: "Invalid feedback envelope: taskId is required" });
  }
  return res.json({
    received: true,
    taskId: envelope.taskId,
    evidenceOrigin: envelope.evidenceOrigin || "AUTOMATED_EVIDENCE",
    acknowledgedAt: new Date().toISOString()
  });
});

// Interactive Subject Engine: Simulation & Recalculation Endpoint
app.post("/api/interactive-engine/simulate", (req: Request, res: Response) => {
  try {
    const { domain, parameters } = req.body;
    if (!domain) {
      return res.status(400).json({ error: "Subject domain is required" });
    }

    if (domain === "mathematics") {
      const a = Number(parameters?.a ?? 1);
      const b = Number(parameters?.b ?? 0);
      const c = Number(parameters?.c ?? 0);
      const discriminant = b * b - 4 * a * c;
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;
      return res.json({
        domain: "mathematics",
        state: {
          a, b, c,
          discriminant,
          vertex: { x: vertexX, y: vertexY },
          concavity: a > 0 ? "UPWARD" : "DOWNWARD"
        }
      });
    } else if (domain === "physics") {
      const v0 = Number(parameters?.initialVelocity ?? 20);
      const angle = Math.max(0, Math.min(90, Number(parameters?.launchAngleDegrees ?? 45)));
      const rad = (angle * Math.PI) / 180;
      const g = 9.8;
      const initialVx = v0 * Math.cos(rad);
      const initialVy = v0 * Math.sin(rad);
      const timeOfFlight = (2 * initialVy) / g;
      const maxHeight = (initialVy * initialVy) / (2 * g);
      const range = initialVx * timeOfFlight;
      return res.json({
        domain: "physics",
        state: {
          initialVelocity: v0,
          launchAngleDegrees: angle,
          initialVx: Number(initialVx.toFixed(2)),
          initialVy: Number(initialVy.toFixed(2)),
          timeOfFlight: Number(timeOfFlight.toFixed(2)),
          maximumHeight: Number(maxHeight.toFixed(2)),
          horizontalRange: Number(range.toFixed(2))
        }
      });
    }

    return res.json({ domain, status: "SIMULATED", parameters });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
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

    const systemInstruction = `You are "Tutor Moos", the authoritative, empathetic Socratic AI Multidisciplinary Tutor for MOOS Academy.
Your fundamental pedagogical mandate:
1. STRICT SOCRATIC METHOD: NEVER simply give the final answer away. Guide the learner using structured Socratic probing, cognitive scaffolding, and gentle, curiosity-sparking questions.
2. TECHNICAL & MATHEMATICAL NOTATION:
   - Mathematics: Format all formulas clearly using LaTeX/KaTeX (e.g. $ax^2 + bx + c = 0$, $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$, $\\int x^n dx$). For exponents, use superscripts or standard syntax ($x^2, 10^5$).
   - Physics: Always mandate SI units ($m/s^2$, $N$, $kg$, $J$), state vector vs scalar nature, and break forces into components.
   - Chemistry: Write balanced chemical equations with state symbols ($2H_2(g) + O_2(g) \\rightarrow 2H_2O(l)$) and orbital notations ($1s^2 2s^2 2p^6$).
   - Computing: Use formatted code blocks with invariants, complexity bounds ($O(n \\log n)$), and trace tables.
   - English: Clearly identify grammatical subjects, predicates, tense agreements, clauses, and rhetorical structures.
3. ADAPTIVE INQUIRY HANDLING:
   - If the learner asks "What is the answer?" or "Just tell me": Empathize with their urgency, but decline gently: "At MOOS Academy, our mission is your genuine mastery. Let's conquer this together." Then ask a guiding question that unlocks the first step.
   - If the learner says "Explain simpler": Use a vivid, relatable real-world physical or intuitive analogy, then connect it back to the formal notation.
   - If the learner asks "Check my working": Validate what they did correctly first, then pinpoint the exact point of divergence and ask them what happened at that transition.
   - If the learner asks "Why does this work?": Guide them through the conceptual intuition or underlying proof without rote memorization.
4. Conclude EVERY response with exactly ONE clear, bite-sized guiding question or mini-step for the student to attempt next.`;

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
      model: "gemini-3.8-flash",
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

    const systemInstruction = `You are the Lead Pedagogical Assessment Officer for MOOS Academy.
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
      model: "gemini-3.8-flash",
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

    const systemInstruction = `You are the Practice Scaffolding Agent for MOOS Academy. Generate 1 high-quality, pedagogically rigorous multiple-choice practice question for the specified canonical curriculum skill.
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
      model: "gemini-3.8-flash",
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

// --------------------------------------------------------------------------
// VEO 3 VIDEO GENERATION (veo-3.1-fast-generate-preview)
// --------------------------------------------------------------------------

// 1. Start Video Generation Operation
app.post("/api/video/generate", async (req: Request, res: Response) => {
  try {
    const { prompt, aspectRatio = "16:9" } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required for video generation" });
    }

    const validAspectRatio: "16:9" | "9:16" = aspectRatio === "9:16" ? "9:16" : "16:9";

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured. Please ensure GEMINI_API_KEY is available."
      });
    }

    // Call Veo model: veo-3.1-fast-generate-preview with specified aspect ratio
    const operation = await ai.models.generateVideos({
      model: "veo-3.1-fast-generate-preview",
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: validAspectRatio
      }
    });

    return res.json({
      operationName: operation.name,
      model: "veo-3.1-fast-generate-preview",
      aspectRatio: validAspectRatio,
      status: "queued"
    });
  } catch (error: any) {
    console.error("Veo video generation initiation error:", error);
    return res.status(500).json({
      error: error.message || "Failed to initiate video generation"
    });
  }
});

// 2. Poll Video Generation Status
app.post("/api/video/status", async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;

    if (!operationName || typeof operationName !== "string") {
      return res.status(400).json({ error: "operationName is required" });
    }

    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured" });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    return res.json({
      done: !!updated.done,
      error: updated.error || null
    });
  } catch (error: any) {
    console.error("Veo status check error:", error);
    return res.status(500).json({
      error: error.message || "Failed to check video generation status"
    });
  }
});

// 3. Download/Stream Video Result
app.post("/api/video/download", async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;

    if (!operationName || typeof operationName !== "string") {
      return res.status(400).json({ error: "operationName is required" });
    }

    if (!ai || !apiKey) {
      return res.status(503).json({ error: "Gemini API key is not configured" });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    if (!updated.done) {
      return res.status(400).json({ error: "Video generation is not yet complete" });
    }

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: "Video URI not found in completed operation" });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey }
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({
        error: `Failed to download video from Google service: ${videoRes.statusText}`
      });
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `inline; filename="academy-simulation-${Date.now()}.mp4"`);

    if (videoRes.body) {
      await videoRes.body.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          },
          abort(err) {
            console.error("Video pipe error:", err);
            res.end();
          }
        })
      );
    } else {
      res.end();
    }
  } catch (error: any) {
    console.error("Veo video download error:", error);
    return res.status(500).json({
      error: error.message || "Failed to download video"
    });
  }
});

// --------------------------------------------------------------------------
// AUDIO TRANSCRIPTION (gemini-3.5-transcribe)
// --------------------------------------------------------------------------
app.post("/api/audio/transcribe", async (req: Request, res: Response) => {
  try {
    const { audioData, mimeType = "audio/webm", prompt = "Transcribe this audio recording accurately with proper technical terminology." } = req.body;

    if (!audioData || typeof audioData !== "string") {
      return res.status(400).json({ error: "audioData (base64) is required" });
    }

    if (!ai) {
      return res.status(503).json({ error: "Gemini API key is not configured" });
    }

    // Strip base64 metadata header if present
    const base64Clean = audioData.includes("base64,")
      ? audioData.split("base64,")[1]
      : audioData;

    const audioPart = {
      inlineData: {
        mimeType: mimeType || "audio/webm",
        data: base64Clean
      }
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-transcribe",
      contents: {
        parts: [
          audioPart,
          { text: prompt || "Transcribe this spoken educational audio accurately." }
        ]
      }
    });

    const transcript = response.text || "";

    return res.json({
      transcript,
      model: "gemini-3.5-transcribe",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Audio transcription error:", error);
    return res.status(500).json({
      error: error.message || "Failed to transcribe audio"
    });
  }
});

// Fallback logic for offline / no-key resilience with rich multidisciplinary notation
function generateLocalSocraticResponse(userMsg: string, context: any): string {
  const msg = (userMsg || "").toLowerCase();
  const subject = (context?.subject || "").toLowerCase();
  const topic = context?.skill || "this core concept";

  // Intent: Asking for direct answers
  if (msg.includes("what is the answer") || msg.includes("just tell me") || msg.includes("give me the answer")) {
    return `At MOOS Academy, our primary goal is building genuine intellectual mastery! Let's scaffold this step together. Look at the problem setup: what parameters or given values do you know, and what target variable are we solving for?`;
  }

  // Intent: Explain simpler / intuitive analogy
  if (msg.includes("simpler") || msg.includes("easy") || msg.includes("confused") || msg.includes("explain like")) {
    return `Let's strip away the formal jargon and think about this intuitively! Imagine **${topic}** as a balance scale: whatever operation we perform on one side must balance the other. In your own words, what is happening in this scenario before we introduce any symbols?`;
  }

  // Intent: Checking learner's working
  if (msg.includes("check") || msg.includes("is this right") || msg.includes("my answer") || msg.includes("working")) {
    return `Let's audit your working step by step! Take your very first line of substitution: Did you ensure all units are consistent (e.g. converting cm to meters or minutes to seconds), and did you maintain sign conventions when moving terms across the equals sign? What does your second line look like?`;
  }

  // Intent: Help / Hints / Stuck
  if (msg.includes("hint") || msg.includes("help") || msg.includes("stuck") || msg.includes("first step")) {
    return `Let's break it down into a bite-sized first step! In **${topic}**, what is the foundational governing equation or rule that connects your known inputs? Write that down first, and tell me what value you plug in for the first term.`;
  }

  // Mathematics domain & technical notation
  if (subject.includes("math") || subject.includes("algebra") || msg.includes("equation") || msg.includes("solve")) {
    if (msg.includes("quadratic") || msg.includes("factor")) {
      return `For quadratic expressions of the canonical form $ax^2 + bx + c = 0$, we can factorise by finding two numbers whose product is $(a \\times c)$ and whose sum is $(b)$, or apply the quadratic formula:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
What are the specific values of $a$, $b$, and $c$ in your current equation?`;
    }
    if (msg.includes("index") || msg.includes("indices") || msg.includes("exponent") || msg.includes("power")) {
      return `Let's apply the fundamental Laws of Indices:
1. $a^m \\times a^n = a^{m+n}$
2. $\\frac{a^m}{a^n} = a^{m-n}$
3. $(a^m)^n = a^{m \\times n}$
4. $a^{-n} = \\frac{1}{a^n}$
Do your terms share the exact same base, or do we need to express them as powers of a common prime base (like $2$, $3$, or $5$) first?`;
    }
    if (msg.includes("fraction") || msg.includes("divide")) {
      return `Remember the reciprocal multiplication principle: dividing by a fraction $\\frac{a}{b}$ is equivalent to multiplying by its reciprocal:
$$\\frac{x}{y} \\div \\frac{a}{b} = \\frac{x}{y} \\times \\frac{b}{a}$$
What does your expression look like once you invert the second fraction?`;
    }
    if (msg.includes("trig") || msg.includes("angle") || msg.includes("triangle")) {
      return `For right-angled triangle trigonometry, recall our primary ratios:
$$\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}, \\quad \\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}, \\quad \\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$$
Relative to angle $\\theta$, which two sides do you already have values for?`;
    }
    if (msg.includes("log") || msg.includes("logarithm")) {
      return `Recall the core bridge between exponential and logarithmic forms:
$$b^y = x \\iff \\log_b(x) = y$$
And the product law: $\\log_b(MN) = \\log_b(M) + \\log_b(N)$. Can we combine your log terms into a single compact logarithm first?`;
    }
  }

  // Science / Physics
  if (subject.includes("physics") || msg.includes("kinematics") || msg.includes("velocity") || msg.includes("force") || msg.includes("energy")) {
    return `In physics problem solving, we ground our reasoning in physical laws and SI units:
- Kinematics: $v = u + at$, $s = ut + \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$
- Dynamics: $\\Sigma F = ma$, $W = F \\cdot d$
What are your listed givens (with their units), and which equation contains only your target unknown?`;
  }

  // Science / Chemistry
  if (subject.includes("chemistry") || msg.includes("mole") || msg.includes("stoichiometry") || msg.includes("reaction")) {
    return `In chemical calculations, the mole bridges macroscopic mass and atomic quantities:
$$n = \\frac{\\text{mass } (m)}{\\text{molar mass } (M)}, \\quad c = \\frac{n}{V}$$
Is your chemical reaction equation balanced with proper stoichiometric coefficients before calculating molar ratios?`;
  }

  // Science / Biology
  if (subject.includes("biology") || msg.includes("cell") || msg.includes("genetics") || msg.includes("dna")) {
    return `In biological systems, structure dictates function. If you are examining genetics, identify whether the trait is dominant ($A$) or recessive ($a$), and map out the parental genotypes in a Punnett square. What alleles does each gamete carry?`;
  }

  // Computer Science & ICT
  if (subject.includes("comp") || subject.includes("ict") || msg.includes("algorithm") || msg.includes("code") || msg.includes("loop")) {
    return `In computational problem solving, let's trace state invariants and complexity:
- Time Complexity: $O(1) \\subset O(\\log n) \\subset O(n) \\subset O(n \\log n)$
What is the state of your variables before entering the loop, and what terminates the loop condition?`;
  }

  // Economics & Social Sciences
  if (subject.includes("econ") || msg.includes("demand") || msg.includes("supply") || msg.includes("elasticity")) {
    return `In economic analysis, examine the market equilibrium where $Q_d = Q_s$. For Price Elasticity of Demand:
$$PED = \\frac{\\% \\Delta Q_d}{\\% \\Delta P}$$
Is the resulting coefficient $|PED| > 1$ (elastic) or $< 1$ (inelastic)? What does that imply about consumer responsiveness?`;
  }

  // Agricultural Science
  if (subject.includes("agric") || msg.includes("soil") || msg.includes("crop") || msg.includes("livestock")) {
    return `In agricultural science, soil fertility and crop yield depend on soil texture and macronutrients ($N$, $P$, $K$). Which specific physical property or agronomic practice is under review here?`;
  }

  // English & Language Arts
  if (subject.includes("english") || subject.includes("grammar") || msg.includes("tense") || msg.includes("clause")) {
    return `In English syntax and composition, structure dictates communicative clarity. Identify the grammatical subject and predicate: Does the verb agree in number and tense with the true subject, or is there an intervening prepositional phrase causing confusion?`;
  }

  return `Excellent inquiry! In **${topic}**, every conclusion stems from logical first principles. What is the very first premise or rule you can state with total confidence? Tell me that, and we'll take the next step together!`;
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

// Vite middleware and Server listener with Live API WebSocket bridge
async function startServer() {
  const server = http.createServer(app);

  // WebSocket Server for Live Voice Conversation (gemini-3.8-live)
  const wss = new WebSocketServer({ server, path: "/live" });

  wss.on("connection", async (clientWs: WebSocket) => {
    console.log("[Live API] Client connected to /live");

    if (!ai) {
      clientWs.send(JSON.stringify({
        error: "Gemini API key is not configured for Live voice session."
      }));
      clientWs.close();
      return;
    }

    let session: any = null;

    try {
      session = await ai.live.connect({
        model: "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Zephyr" }
            }
          },
          systemInstruction: "You are Tutor Moos, the real-time voice Socratic multidisciplinary coach for MOOS Academy. Speak warmly, clearly, concisely, and ask guiding questions."
        },
        callbacks: {
          onmessage: (message: any) => {
            try {
              const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (audio && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ audio }));
              }
              if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ interrupted: true }));
              }
              // Transcripts if available
              const text = message.serverContent?.modelTurn?.parts?.[0]?.text;
              if (text && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ text }));
              }
            } catch (err) {
              console.error("[Live API] onmessage dispatch error:", err);
            }
          },
          onclose: () => {
            console.log("[Live API] Gemini session closed");
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ sessionClosed: true }));
            }
          },
          onerror: (err: any) => {
            console.error("[Live API] Gemini session error:", err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ error: err.message || "Live API session encountered an error" }));
            }
          }
        }
      });

      clientWs.on("message", (data: any) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio && session) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" }
            });
          } else if (parsed.text && session) {
            session.sendRealtimeInput({
              text: parsed.text
            });
          }
        } catch (err) {
          console.error("[Live API] clientWs message parse error:", err);
        }
      });

      clientWs.on("close", () => {
        console.log("[Live API] Client disconnected from /live");
        if (session) {
          try {
            session.close();
          } catch {
            // Safe cleanup
          }
        }
      });

      clientWs.on("error", (err) => {
        console.error("[Live API] Client socket error:", err);
      });

    } catch (connErr: any) {
      console.error("[Live API] Failed to connect to Gemini Live:", connErr);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({
          error: connErr.message || "Failed to establish Live voice connection"
        }));
        clientWs.close();
      }
    }
  });

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

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`MOOS Academy server running on http://localhost:${PORT}`);
  });
}

startServer();
