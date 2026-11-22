import {
  EducationalLevel,
  Skill,
  Unit,
  CurriculumStandardMapping
} from "../types/curriculum";
import { curriculumService } from "./curriculumService";

export interface LessonNoteWorkedDemonstration {
  title: string;
  problem: string;
  stepByStepSolution: string[];
  explanation: string;
  keyPrinciple: string;
  examinerTip: string;
}

export interface LessonNoteKeyTerm {
  termOrSymbol: string;
  definition: string;
  practicalExample?: string;
}

export interface LessonNoteMisconception {
  flawedThinking: string;
  whyItsWrong: string;
  remedialGuidance: string;
}

export interface LessonNoteEvaluationQuestion {
  tier: "Foundational" | "Core Standard" | "Advanced Challenge";
  question: string;
  expectedAnswer: string;
  bloomLevel?: string;
}

export interface RequiredLessonNote {
  id: string;
  title: string;
  topic: string;
  subTopic: string;
  subject: string;
  domain: string;
  level: EducationalLevel;
  levelLabel: string;
  durationMinutes: number;
  termAndWeek: string;
  curriculumStandard: string;
  standardMappings: CurriculumStandardMapping[];
  companionQRCode: string;
  
  // Professional Curriculum Sections
  instructionalObjectives: string[];
  prerequisiteKnowledge: string[];
  instructionalMaterials: string[];
  
  // Pedagogical Presentation
  instructionalProcedure: Array<{
    stepNumber: number;
    title: string;
    durationMinutes: number;
    teacherActivity: string;
    studentActivity: string;
    content: string;
    keyPoints?: string[];
  }>;
  
  theoreticalExposition: string;
  workedDemonstrations: LessonNoteWorkedDemonstration[];
  keyTermsAndFormulas: LessonNoteKeyTerm[];
  commonMisconceptions: LessonNoteMisconception[];
  
  // Student Notebook Output
  chalkboardSummary: string[];
  
  // Formative Evaluation & Assessment
  evaluationQuestions: LessonNoteEvaluationQuestion[];
  exitTicket: {
    prompt: string;
    timeLimitMinutes: number;
    successCriteria: string;
  };
  assignmentHomework: string[];
  
  // Full Text Export
  fullFormattedMarkdown: string;
  createdAt: string;
}

const LEVEL_LABELS: Record<EducationalLevel, string> = {
  primary_foundations: "Primary Foundations (Grades 1-3)",
  upper_primary: "Upper Primary (Grades 4-6)",
  junior_secondary: "Junior Secondary (JSS 1-3)",
  senior_secondary: "Senior Secondary (SSS 1-3)",
  university_prep: "University & College Preparation",
  exam_prep: "WAEC / UTME Examination Prep"
};

export class LessonNoteService {
  /**
   * Promptly creates an accessible Required Lesson Note from a verified curriculum skill & unit
   */
  public createLessonNoteForSkill(skill: Skill, unit: Unit): RequiredLessonNote {
    const level = unit.level;
    const levelLabel = LEVEL_LABELS[level] || "Senior Secondary (SSS 1-3)";
    const subject = unit.subjectId.replace("sci_", "").replace("math_", "").replace("tech_", "").replace("lang_", "").replace("_", " ").toUpperCase();
    const domain = unit.category.replace("_", " ").toUpperCase();
    const standardMappings = curriculumService.getCompetencyMappings(skill.id);
    const primaryMapping = standardMappings[0];
    const standard = primaryMapping
      ? `${primaryMapping.curriculumSystem.replace("_", " ")} (${primaryMapping.standardIdentifier})`
      : "Official NERDC / Cambridge / WAEC Standards";

    const qrCode = primaryMapping?.standardIdentifier
      ? `QR-${primaryMapping.standardIdentifier}`
      : `QR-${skill.code}`;

    // Objectives
    const instructionalObjectives =
      skill.objectives && skill.objectives.length > 0
        ? skill.objectives
        : [
            `Define and state the foundational principles governing ${skill.title}.`,
            `Analyze and demonstrate the step-by-step problem-solving technique for ${skill.title}.`,
            `Apply ${skill.title} concepts to solve standard examination and authentic real-world problems accurately.`
          ];

    // Prerequisites
    const prereqSkills = curriculumService.getPrerequisitesForSkill(skill.id);
    const prerequisiteKnowledge =
      prereqSkills.length > 0
        ? prereqSkills.map((p) => p.title)
        : [
            "Foundational numerical operations and algebraic manipulation",
            "Basic domain terminology and reading comprehension",
            "Recognition of standard symbolic notations"
          ];

    // Instructional Materials
    const instructionalMaterials = [
      "Official Curriculum Syllabus & Coursework Textbook",
      "Interactive Digital Formula Codex & Mathematical Scratchpad",
      "Illustrated Demonstration Charts & Visual Diagrams",
      `Linked Companion Practice QR Code (${qrCode})`,
      "Whiteboard / Chalkboard Grid and Colored Markers"
    ];

    // Theoretical Deep Dive
    const theoreticalExposition = skill.lesson?.conceptualExplanation
      ? skill.lesson.conceptualExplanation
      : `### 1. Conceptual Framework & Core Definition\n\n${skill.summary}\n\nIn this lesson, we establish the theoretical foundations of **${skill.title}**. Students must master the key relationships, formal rules, and systematic algorithms required to solve standard and advanced problems without common sign or syntactic errors.\n\n### 2. Fundamental Rules & Systematic Principles\n\n• **Rule of Structure**: Every problem must first be brought to its canonical or standard form before applying algebraic or logical reductions.\n• **Invariance & Conservation**: Ensure all operations preserve fundamental invariants (equality across equation sides, dimensional consistency, or grammatical agreement).\n• **Verification Step**: Always cross-verify calculated solutions against initial domain constraints to avoid extraneous roots or semantic anomalies.`;

    // Worked Demonstrations
    const workedDemonstrations: LessonNoteWorkedDemonstration[] = [];
    if (skill.lesson?.workedExamples && skill.lesson.workedExamples.length > 0) {
      skill.lesson.workedExamples.forEach((ex, idx) => {
        workedDemonstrations.push({
          title: ex.title || `Worked Demonstration ${idx + 1}`,
          problem: ex.problemStatement + (ex.mathExpression ? ` (${ex.mathExpression})` : ""),
          stepByStepSolution: ex.steps.map((s) => `Step ${s.stepNumber}: ${s.instruction} — ${s.reasoning}`),
          explanation: ex.takeawayRule,
          keyPrinciple: ex.takeawayRule || "Systematic step-by-step substitution and verification.",
          examinerTip: "Show all intermediate working clearly to secure maximum method marks."
        });
      });
    } else if (skill.questions && skill.questions.length > 0) {
      // Synthesize from real practice questions
      skill.questions.slice(0, 2).forEach((q, idx) => {
        const text = q.questionText || "Demonstration problem";
        workedDemonstrations.push({
          title: `Demonstration ${idx + 1}: ${text.slice(0, 50)}...`,
          problem: text + (q.mathExpression ? ` [${q.mathExpression}]` : ""),
          stepByStepSolution: [
            "Step 1: Identify given parameters, known constraints, and the target unknown.",
            `Step 2: Apply the governing principle: ${q.hintLadder?.[0] || "Recall foundational formula."}`,
            `Step 3: Execute reduction and solve: ${q.hintLadder?.[1] || "Perform step-by-step calculation."}`,
            `Step 4: Final exact result: ${q.correctAnswer} (${q.explanation})`
          ],
          explanation: q.explanation,
          keyPrinciple: q.hintLadder?.[0] || "Always balance equations and verify units.",
          examinerTip: q.misconceptionAlerts?.[0]?.note || "Check signs and unit conversions before writing final answer."
        });
      });
    } else {
      workedDemonstrations.push({
        title: `Model Demonstration 1: Standard Application of ${skill.title}`,
        problem: `Demonstrate the standard solution method for a representative problem in ${skill.title}.`,
        stepByStepSolution: [
          "State the canonical form or given premise clearly.",
          "Substitute known variables and boundary conditions.",
          "Simplify through algebraic or analytical steps.",
          "State the final result with appropriate units and dimensional check."
        ],
        explanation: "Mastering this sequence ensures complete credit under standardized grading rubrics.",
        keyPrinciple: "Never skip transitional working steps.",
        examinerTip: "Examiners award marks for method even if minor arithmetic slips occur."
      });
    }

    // Key Terms and Formulas
    const keyTermsAndFormulas: LessonNoteKeyTerm[] = [];
    if (skill.lesson?.keyTermsAndFormulas && skill.lesson.keyTermsAndFormulas.length > 0) {
      skill.lesson.keyTermsAndFormulas.forEach((kt) => {
        keyTermsAndFormulas.push({
          termOrSymbol: kt.termOrSymbol,
          definition: kt.definition,
          practicalExample: kt.practicalExample
        });
      });
    } else {
      keyTermsAndFormulas.push(
        {
          termOrSymbol: skill.title,
          definition: skill.summary,
          practicalExample: `Essential foundational competency for ${unit.title}`
        },
        {
          termOrSymbol: "Canonical Form",
          definition: "The standardized, simplest mathematical or grammatical presentation of an expression or sentence.",
          practicalExample: "e.g., ax² + bx + c = 0 in algebra, or Subject + Verb + Object in syntax."
        },
        {
          termOrSymbol: "Invariant Principle",
          definition: "A core property that remains unchanged throughout legitimate transformations.",
          practicalExample: "Conservation of energy or grammatical concord across intervening phrases."
        }
      );
    }

    // Misconceptions
    const commonMisconceptions: LessonNoteMisconception[] = [];
    if (skill.lesson?.commonMisconceptionsAndTraps && skill.lesson.commonMisconceptionsAndTraps.length > 0) {
      skill.lesson.commonMisconceptionsAndTraps.forEach((m) => {
        commonMisconceptions.push({
          flawedThinking: m.misconception,
          whyItsWrong: m.whyItIsWrong,
          remedialGuidance: m.correctCorrection
        });
      });
    }
    if (skill.questions && skill.questions.length > 0) {
      skill.questions.forEach((q) => {
        if (q.misconceptionAlerts) {
          q.misconceptionAlerts.forEach((m) => {
            if (!commonMisconceptions.some((c) => c.flawedThinking === m.trigger)) {
              commonMisconceptions.push({
                flawedThinking: m.trigger,
                whyItsWrong: m.note,
                remedialGuidance: "Review foundational definitions and state assumptions explicitly."
              });
            }
          });
        }
      });
    }
    if (commonMisconceptions.length === 0) {
      commonMisconceptions.push({
        flawedThinking: "Attempting to solve or simplify without checking domain constraints.",
        whyItsWrong: "Leads to extraneous solutions, division by zero, or invalid grammatical concord.",
        remedialGuidance: "Always state initial conditions and verify final answers by substitution."
      });
    }

    // Student Chalkboard Summary Note
    const chalkboardSummary = [
      `TOPIC: ${skill.title.toUpperCase()}`,
      `1. CORE PRINCIPLE: ${skill.summary}`,
      `2. GOLDEN RULE: Always bring expressions into standard form before applying reduction rules.`,
      `3. KEY FORMULA / RULE: Review definitions of ${keyTermsAndFormulas.map((k) => k.termOrSymbol).join(", ")}.`,
      `4. EXAM ALERT: ${workedDemonstrations[0]?.examinerTip || "Show all intermediate steps clearly for full method marks."}`
    ];

    // Formative Evaluation Questions
    const evaluationQuestions: LessonNoteEvaluationQuestion[] = [];
    if (skill.questions && skill.questions.length > 0) {
      skill.questions.forEach((q, idx) => {
        const tier = idx === 0 ? "Foundational" : idx === 1 ? "Core Standard" : "Advanced Challenge";
        evaluationQuestions.push({
          tier,
          question: q.questionText + (q.mathExpression ? ` [${q.mathExpression}]` : ""),
          expectedAnswer: `Correct Option/Answer: ${q.correctAnswer}. ${q.explanation}`,
          bloomLevel: q.difficulty === "easy" ? "Knowledge & Understanding" : q.difficulty === "medium" ? "Application" : "Analysis & Evaluation"
        });
      });
    } else {
      evaluationQuestions.push(
        {
          tier: "Foundational",
          question: `State the fundamental definition and conditions for ${skill.title}.`,
          expectedAnswer: skill.summary,
          bloomLevel: "Knowledge & Understanding"
        },
        {
          tier: "Core Standard",
          question: `Demonstrate the step-by-step solution method for a standard problem in ${skill.title}.`,
          expectedAnswer: "Follow the 4-phase worked demonstration steps.",
          bloomLevel: "Application"
        },
        {
          tier: "Advanced Challenge",
          question: `Analyze an edge case or multi-step variation involving ${skill.title}.`,
          expectedAnswer: "Account for boundary constraints and verify invariants.",
          bloomLevel: "Analysis & Synthesis"
        }
      );
    }

    // Exit Ticket
    const exitTicket = {
      prompt: `In 60 seconds: Write down the primary formula/rule for ${skill.title} and solve: verify one step-by-step application without looking at your notes.`,
      timeLimitMinutes: 2,
      successCriteria: "Student correctly states the principle, executes the primary operation, and avoids the common misconception alert."
    };

    // Homework Assignment
    const assignmentHomework = [
      `Complete Exercises 1 to 4 on ${skill.title} from the Curriculum Coursebook.`,
      `Scan Companion QR Code (${qrCode}) to complete 3 interactive digital practice drills with instant feedback.`,
      `Write a 3-sentence summary in your study binder explaining how to avoid the common examiner trap discussed today.`
    ];

    // Instructional Procedure
    const instructionalProcedure = [
      {
        stepNumber: 1,
        title: "Cognitive Hook & Entry Behavior Check",
        durationMinutes: 5,
        teacherActivity: `Presents real-world scenario relating to ${skill.title}. Probes prior knowledge from: ${prerequisiteKnowledge[0]}.`,
        studentActivity: "Listen attentively, answer diagnostic starter questions, and connect prior learning.",
        content: `Connect the new concept of ${skill.title} to real-world phenomena and learners' existing knowledge base.`,
        keyPoints: ["Arouse learner curiosity", "Activate relevant schema", "Clarify lesson focus"]
      },
      {
        stepNumber: 2,
        title: "Content Development & Theoretical Exposition",
        durationMinutes: 15,
        teacherActivity: `Guides students through formal definition, key rules, and theoretical derivation of ${skill.title}. Writes core principles on the board.`,
        studentActivity: "Take down structured chalkboard notes; ask clarifying questions on terminology.",
        content: theoreticalExposition,
        keyPoints: keyTermsAndFormulas.map((k) => `${k.termOrSymbol}: ${k.definition}`)
      },
      {
        stepNumber: 3,
        title: "Teacher's Worked Demonstrations (Modeling)",
        durationMinutes: 10,
        teacherActivity: `Solves ${workedDemonstrations.length} model problems step-by-step on the board, thinking aloud to expose metacognitive strategies and examiner tips.`,
        studentActivity: "Observe the demonstration, copy the model steps into notebooks, and identify each transitional rule.",
        content: workedDemonstrations[0]?.problem || "Model problem solving",
        keyPoints: [workedDemonstrations[0]?.keyPrinciple || "Systematic method", workedDemonstrations[0]?.examinerTip || "Avoid sign errors"]
      },
      {
        stepNumber: 4,
        title: "Guided Socratic Practice & Pair Exercise",
        durationMinutes: 10,
        teacherActivity: "Circulates the classroom observing students working in collaborative pairs. Identifies and remediates misconceptions in real time.",
        studentActivity: "Collaborate with assigned partner on scaffolded practice problems; verify each step before writing.",
        content: evaluationQuestions[1]?.question || "Guided practice set",
        keyPoints: ["Peer explanation", "Active correction", "Immediate formative feedback"]
      },
      {
        stepNumber: 5,
        title: "Formative Exit Check & Plenary Synthesis",
        durationMinutes: 5,
        teacherActivity: `Administers the diagnostic 2-minute Exit Ticket. Summarizes key takeaways and assigns homework.`,
        studentActivity: "Independently write answers on exit slips, submit to teacher, and record homework assignment.",
        content: exitTicket.prompt,
        keyPoints: ["Measure mastery rate", "Sort for targeted next-day intervention", "Close instructional loop"]
      }
    ];

    // Markdown Output for Copying / Printing
    const fullFormattedMarkdown = this.buildMarkdownLessonNote({
      title: skill.title,
      topic: unit.title,
      subTopic: skill.title,
      subject,
      levelLabel,
      standard,
      qrCode,
      instructionalObjectives,
      prerequisiteKnowledge,
      instructionalMaterials,
      instructionalProcedure,
      theoreticalExposition,
      workedDemonstrations,
      keyTermsAndFormulas,
      commonMisconceptions,
      chalkboardSummary,
      evaluationQuestions,
      exitTicket,
      assignmentHomework
    });

    return {
      id: `note-${skill.id}-${Date.now()}`,
      title: `Required Lesson Note: ${skill.title}`,
      topic: unit.title,
      subTopic: skill.title,
      subject,
      domain,
      level,
      levelLabel,
      durationMinutes: 45,
      termAndWeek: "Current Academic Term • Week 4",
      curriculumStandard: standard,
      standardMappings,
      companionQRCode: qrCode,
      instructionalObjectives,
      prerequisiteKnowledge,
      instructionalMaterials,
      instructionalProcedure,
      theoreticalExposition,
      workedDemonstrations,
      keyTermsAndFormulas,
      commonMisconceptions,
      chalkboardSummary,
      evaluationQuestions,
      exitTicket,
      assignmentHomework,
      fullFormattedMarkdown,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Promptly creates an accessible Required Lesson Note from any search query or custom topic across any level!
   */
  public createLessonNoteForCustomTopic(
    topicQuery: string,
    level: EducationalLevel = "senior_secondary"
  ): RequiredLessonNote {
    // Attempt to match against curriculum skills
    const matches = curriculumService.searchCurriculum(topicQuery);
    if (matches.length > 0) {
      // Find matching level if possible, else first
      const levelMatch = matches.find((m) => m.unit.level === level) || matches[0];
      return this.createLessonNoteForSkill(levelMatch.skill, levelMatch.unit);
    }

    // If no exact skill matched, dynamically synthesize a high-caliber lesson note for this topic
    const cleanedTopic = topicQuery.trim();
    const formattedTopic = cleanedTopic.charAt(0).toUpperCase() + cleanedTopic.slice(1);
    const levelLabel = LEVEL_LABELS[level] || "Senior Secondary (SSS 1-3)";
    const qrCode = `QR-TOPIC-${cleanedTopic.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)}`;

    const isMath = /math|equation|algebra|fraction|geometry|calculus|trig|matrix|number|quadratic/i.test(cleanedTopic);
    const isScience = /science|physics|chemistry|biology|atom|force|cell|reaction|energy|pressure/i.test(cleanedTopic);
    const isEnglish = /english|verb|grammar|noun|speech|sentence|concord|essay|letter/i.test(cleanedTopic);
    const isTech = /computer|code|python|database|sql|algorithm|data|tech/i.test(cleanedTopic);

    const subject = isMath ? "MATHEMATICS" : isScience ? "SCIENCE / STEM" : isEnglish ? "ENGLISH LANGUAGE" : isTech ? "COMPUTER SCIENCE" : "GENERAL CURRICULUM";

    const instructionalObjectives = [
      `Define and state the foundational principles governing ${formattedTopic}.`,
      `Explain the mechanisms, rules, and mathematical or conceptual properties of ${formattedTopic}.`,
      `Solve standard problems and apply ${formattedTopic} principles to authentic examination exercises.`
    ];

    const prerequisiteKnowledge = [
      `Foundational prerequisite vocabulary and definitions relevant to ${subject}`,
      "Basic problem-solving and analytical reasoning skills",
      "Prior mastery of core introductory units in this subject"
    ];

    const instructionalMaterials = [
      "Official Curriculum Textbook & Standard Reference Manual",
      "Illustrated Demonstration Charts & Visual Diagrams",
      `Linked Companion Practice QR Code (${qrCode})`,
      "Chalkboard / Whiteboard Grid and Worksheets"
    ];

    const theoreticalExposition = `### 1. Conceptual Framework & Definition\n\n**${formattedTopic}** represents a fundamental instructional topic in the ${subject} syllabus for ${levelLabel}.\n\n### 2. Theoretical Principles & Core Rules\n\n1. **Fundamental Rule of Structure**: Every problem or statement involving ${formattedTopic} must be analyzed systematically according to official curriculum standards.\n2. **Conservation & Logic**: Ensure all steps follow deductive reasoning, valid operational properties, and dimensional consistency.\n3. **Verification Criterion**: Always check that calculated or written outcomes satisfy the original boundary constraints.`;

    const workedDemonstrations: LessonNoteWorkedDemonstration[] = [
      {
        title: `Model Demonstration 1: Standard Application of ${formattedTopic}`,
        problem: `Given a standard classroom scenario or exercise on ${formattedTopic}, demonstrate the complete step-by-step solution method.`,
        stepByStepSolution: [
          "Step 1: Carefully analyze the problem statement and identify the given parameters and constraints.",
          "Step 2: State the governing theoretical principle or formula applicable to this condition.",
          "Step 3: Perform the primary algebraic, grammatical, or analytical transformation step-by-step.",
          "Step 4: Formulate the final conclusion or numerical answer with explicit units and checks."
        ],
        explanation: "Following this four-step sequence guarantees full methodological marks on official examinations.",
        keyPrinciple: "Always state governing laws and show explicit transitional working.",
        examinerTip: "Avoid rushing intermediate steps; examiners award marks for transparent method."
      }
    ];

    const keyTermsAndFormulas: LessonNoteKeyTerm[] = [
      {
        termOrSymbol: formattedTopic,
        definition: `The core concept or process under study in ${subject}.`,
        practicalExample: "Applied throughout terminal examination syllabi."
      },
      {
        termOrSymbol: "Standard / Canonical Form",
        definition: "The universally recognized simplest notation or grammatical construction.",
        practicalExample: "e.g., standard scientific or linguistic conventions."
      }
    ];

    const commonMisconceptions: LessonNoteMisconception[] = [
      {
        flawedThinking: `Assuming that ${formattedTopic} can be resolved without checking foundational prerequisite conditions.`,
        whyItsWrong: "Leads to invalid intermediate conclusions or sign/syntax transposition slips.",
        remedialGuidance: "Always verify assumptions and write down the governing rule before executing steps."
      }
    ];

    const chalkboardSummary = [
      `TOPIC: ${formattedTopic.toUpperCase()}`,
      `1. DEFINITION: Essential competency in ${subject} for ${levelLabel}.`,
      `2. GOLDEN RULE: Work systematically through each stage; never skip method steps.`,
      `3. KEY FORMULA / RULE: Apply the canonical principles established in class today.`,
      `4. HOMEWORK: Complete assigned practice drills linked via QR Code ${qrCode}.`
    ];

    const evaluationQuestions: LessonNoteEvaluationQuestion[] = [
      {
        tier: "Foundational",
        question: `State the definition and two primary characteristics of ${formattedTopic}.`,
        expectedAnswer: `A clear, textbook-standard definition with core properties described.`,
        bloomLevel: "Knowledge & Understanding"
      },
      {
        tier: "Core Standard",
        question: `Demonstrate how to solve a representative standard question on ${formattedTopic}.`,
        expectedAnswer: "Follow the 4-phase model demonstration steps.",
        bloomLevel: "Application"
      },
      {
        tier: "Advanced Challenge",
        question: `Explain how ${formattedTopic} applies to a non-trivial or combined-concept problem.`,
        expectedAnswer: "Synthesize multiple rules and demonstrate verification.",
        bloomLevel: "Analysis & Synthesis"
      }
    ];

    const exitTicket = {
      prompt: `In 60 seconds: Write down the primary principle of ${formattedTopic} and explain one common mistake to avoid.`,
      timeLimitMinutes: 2,
      successCriteria: "Student correctly names the principle and warns against the primary misconception."
    };

    const assignmentHomework = [
      `Read and annotate Section 1 on ${formattedTopic} in your curriculum textbook.`,
      `Complete practice exercises 1 to 5 in your exercise book.`,
      `Prepare one question on an edge case to discuss at the start of next class.`
    ];

    const instructionalProcedure = [
      {
        stepNumber: 1,
        title: "Cognitive Hook & Introduction",
        durationMinutes: 5,
        teacherActivity: `Introduces ${formattedTopic} with an engaging real-world illustration.`,
        studentActivity: "Listen, take notes, and relate to prior lessons.",
        content: `Relate ${formattedTopic} to everyday life.`,
        keyPoints: ["Arouse interest", "State learning objectives"]
      },
      {
        stepNumber: 2,
        title: "Content Development & Formal Exposition",
        durationMinutes: 15,
        teacherActivity: `Presents the theoretical structure and core definitions of ${formattedTopic}.`,
        studentActivity: "Copy chalkboard summary and ask questions.",
        content: theoreticalExposition,
        keyPoints: ["Master definitions", "Note essential formulas"]
      },
      {
        stepNumber: 3,
        title: "Worked Demonstrations",
        durationMinutes: 10,
        teacherActivity: "Solves model problems on the board with full step-by-step explanations.",
        studentActivity: "Follow demonstration and write solutions in notebooks.",
        content: workedDemonstrations[0].problem,
        keyPoints: [workedDemonstrations[0].keyPrinciple]
      },
      {
        stepNumber: 4,
        title: "Guided Practice",
        durationMinutes: 10,
        teacherActivity: "Supervises student pair work on scaffolded exercises.",
        studentActivity: "Solve practice problems with a peer.",
        content: evaluationQuestions[1].question,
        keyPoints: ["Active peer discussion", "Immediate correction"]
      },
      {
        stepNumber: 5,
        title: "Formative Evaluation & Exit Ticket",
        durationMinutes: 5,
        teacherActivity: "Administers exit check and wraps up the lesson.",
        studentActivity: "Complete exit slip independently.",
        content: exitTicket.prompt,
        keyPoints: ["Formative assessment", "Exit validation"]
      }
    ];

    const fullFormattedMarkdown = this.buildMarkdownLessonNote({
      title: formattedTopic,
      topic: formattedTopic,
      subTopic: formattedTopic,
      subject,
      levelLabel,
      standard: "Official Curriculum Standard",
      qrCode,
      instructionalObjectives,
      prerequisiteKnowledge,
      instructionalMaterials,
      instructionalProcedure,
      theoreticalExposition,
      workedDemonstrations,
      keyTermsAndFormulas,
      commonMisconceptions,
      chalkboardSummary,
      evaluationQuestions,
      exitTicket,
      assignmentHomework
    });

    return {
      id: `note-custom-${Date.now()}`,
      title: `Required Lesson Note: ${formattedTopic}`,
      topic: formattedTopic,
      subTopic: formattedTopic,
      subject,
      domain: subject,
      level,
      levelLabel,
      durationMinutes: 45,
      termAndWeek: "Current Academic Term • Week 4",
      curriculumStandard: "Official Curriculum Benchmark",
      standardMappings: [],
      companionQRCode: qrCode,
      instructionalObjectives,
      prerequisiteKnowledge,
      instructionalMaterials,
      instructionalProcedure,
      theoreticalExposition,
      workedDemonstrations,
      keyTermsAndFormulas,
      commonMisconceptions,
      chalkboardSummary,
      evaluationQuestions,
      exitTicket,
      assignmentHomework,
      fullFormattedMarkdown,
      createdAt: new Date().toISOString()
    };
  }

  private buildMarkdownLessonNote(data: {
    title: string;
    topic: string;
    subTopic: string;
    subject: string;
    levelLabel: string;
    standard: string;
    qrCode: string;
    instructionalObjectives: string[];
    prerequisiteKnowledge: string[];
    instructionalMaterials: string[];
    instructionalProcedure: Array<{
      stepNumber: number;
      title: string;
      durationMinutes: number;
      teacherActivity: string;
      studentActivity: string;
      content: string;
    }>;
    theoreticalExposition: string;
    workedDemonstrations: LessonNoteWorkedDemonstration[];
    keyTermsAndFormulas: LessonNoteKeyTerm[];
    commonMisconceptions: LessonNoteMisconception[];
    chalkboardSummary: string[];
    evaluationQuestions: LessonNoteEvaluationQuestion[];
    exitTicket: { prompt: string; timeLimitMinutes: number; successCriteria: string };
    assignmentHomework: string[];
  }): string {
    return `# MOOS ACADEMY — OFFICIAL REQUIRED LESSON NOTE
## ${data.subject} | ${data.levelLabel}

**TOPIC:** ${data.topic}
**SUB-TOPIC:** ${data.subTopic}
**DURATION:** 45 Minutes | **STANDARD:** ${data.standard}
**COMPANION QR CODE:** ${data.qrCode}

---

### I. BEHAVIORAL LEARNING OBJECTIVES
By the end of this instructional period, learners should be able to:
${data.instructionalObjectives.map((obj, i) => `${i + 1}. ${obj}`).join("\n")}

---

### II. ENTRY BEHAVIOR & PREREQUISITE KNOWLEDGE
Learners have previously demonstrated familiarity with:
${data.prerequisiteKnowledge.map((p, i) => `• ${p}`).join("\n")}

---

### III. INSTRUCTIONAL MATERIALS & MEDIA
${data.instructionalMaterials.map((m) => `• ${m}`).join("\n")}

---

### IV. INSTRUCTIONAL PROCEDURE (STEP-BY-STEP PRESENTATION)
${data.instructionalProcedure
  .map(
    (step) => `
#### Step ${step.stepNumber}: ${step.title} (${step.durationMinutes} Minutes)
- **Teacher Activity:** ${step.teacherActivity}
- **Student Activity:** ${step.studentActivity}
- **Summary Focus:** ${step.content.slice(0, 140)}...
`
  )
  .join("\n")}

---

### V. FORMAL THEORETICAL EXPOSITION & CONTENT NOTES
${data.theoreticalExposition}

---

### VI. TEACHER'S WORKED DEMONSTRATIONS
${data.workedDemonstrations
  .map(
    (d, i) => `
#### Demonstration ${i + 1}: ${d.title}
**Problem:** ${d.problem}

**Step-by-Step Solution:**
${d.stepByStepSolution.map((s) => `• ${s}`).join("\n")}

**Key Principle:** ${d.keyPrinciple}
**Examiner Tip:** ${d.examinerTip}
`
  )
  .join("\n")}

---

### VII. KEY TERMS & FORMULA CODEX
${data.keyTermsAndFormulas.map((k) => `• **${k.termOrSymbol}**: ${k.definition}${k.practicalExample ? ` *(Example: ${k.practicalExample})*` : ""}`).join("\n")}

---

### VIII. COMMON MISCONCEPTIONS & EXAMINER TRAPS
${data.commonMisconceptions
  .map(
    (m) => `
• **Flawed Thinking:** ${m.flawedThinking}
  - *Why it's wrong:* ${m.whyItsWrong}
  - *How to avoid:* ${m.remedialGuidance}
`
  )
  .join("\n")}

---

### IX. STUDENT CHALKBOARD / NOTEBOOK SUMMARY
\`\`\`
${data.chalkboardSummary.join("\n")}
\`\`\`

---

### X. FORMATIVE EVALUATION QUESTIONS
${data.evaluationQuestions.map((q, i) => `${i + 1}. [${q.tier}] ${q.question}\n   *Solution Note:* ${q.expectedAnswer}`).join("\n\n")}

---

### XI. DIAGNOSTIC EXIT TICKET (${data.exitTicket.timeLimitMinutes} Mins)
**Prompt:** ${data.exitTicket.prompt}
**Success Criteria:** ${data.exitTicket.successCriteria}

---

### XII. EXTENSION & HOMEWORK ASSIGNMENT
${data.assignmentHomework.map((h, i) => `${i + 1}. ${h}`).join("\n")}
`;
  }
}

export const lessonNoteService = new LessonNoteService();
