/**
 * MOOS ACADEMY — SMART BOARD TOPIC LOCK & SUBJECT FIDELITY SERVICE
 *
 * Enforces strict topic and subject fidelity:
 * 1. Generates immutable SmartBoardLessonContext objects with unique activeSessionId
 * 2. Deterministically categorizes subjects and topics into specialized pedagogical domains
 * 3. Validates that instructional templates match the subject (strictly blocks cross-subject leaks)
 * 4. Guards against stale sessions and mismatched state hydration
 */

import { Unit, Skill } from "../types/curriculum";
import {
  SmartBoardLessonContext,
  SubjectCategory,
  QualityGateAuditFinding
} from "../types/smartBoardTopicLock";

export class SmartBoardTopicLockService {
  private static instance: SmartBoardTopicLockService;

  public static getInstance(): SmartBoardTopicLockService {
    if (!SmartBoardTopicLockService.instance) {
      SmartBoardTopicLockService.instance = new SmartBoardTopicLockService();
    }
    return SmartBoardTopicLockService.instance;
  }

  /**
   * Generates a pristine, immutable SmartBoardLessonContext for an active unit or skill
   */
  public createLessonContext(params: {
    unit: Unit;
    skill?: Skill;
    educationalSystem?: string;
    curriculumStandard?: string;
    country?: string;
  }): SmartBoardLessonContext {
    const { unit, skill } = params;
    const topicTitle = skill ? skill.title : unit.title;
    const skillsList = skill
      ? [skill.title]
      : unit.skills?.map((s) => s.title) || [topicTitle];
    const learningObjectives = skill?.objectives || [
      `Master core concepts and principles of ${topicTitle}`,
      `Apply rigorous subject-specific reasoning and problem solving`,
      `Evaluate and synthesize authentic disciplinary tasks`
    ];

    const sessionId = `sess-${unit.id}-${skill ? skill.id : "unit"}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    return {
      country: params.country || "International / West Africa",
      curriculum: params.curriculumStandard || "WAEC / Cambridge International",
      educationalSystem: params.educationalSystem || "6-3-3-4 / K-12 Dual Pathway",
      level: unit.level,
      subject: unit.subjectId,
      course: `${unit.code} - ${unit.title}`,
      unit: unit.title,
      topic: topicTitle,
      skills: skillsList,
      learningObjectives,
      lessonType: "Masterclass Interactive Smart Board",
      difficulty: skill?.difficulty || (unit.level.includes("university") || unit.level.includes("senior") ? "advanced" : "standard"),
      pedagogicalMode: "Dual-Script Synchronized Masterclass",
      instructionalGoals: [
        "Foundational concept activation",
        "Subject-specific structural reasoning",
        "Interactive checkpoint validation",
        "Synthesis and mastery challenge"
      ],
      currentPhase: "FOUNDATION",
      currentStep: 1,
      currentConcept: topicTitle,
      currentExample: skill?.summary || unit.description,
      currentActivity: "Digital Smart Board Lecture & Analysis",
      activeLessonId: skill?.lesson?.id || `les-${skill?.id || unit.id}`,
      activeTopicId: skill?.id || unit.id,
      activeCourseId: unit.code,
      activeUnitId: unit.id,
      activeSubjectId: unit.subjectId,
      activeCurriculumId: unit.level,
      activeSessionId: sessionId
    };
  }

  /**
   * Deterministically identifies the exact pedagogical subject category
   */
  public determineSubjectCategory(subjectId: string, topicTitle: string): SubjectCategory {
    const s = (subjectId || "").toLowerCase();
    const t = (topicTitle || "").toLowerCase();

    // 1. Academic English & Rhetoric
    if (
      t.includes("academic discourse") ||
      t.includes("rhetoric") ||
      t.includes("critical synthesis") ||
      t.includes("thesis defense") ||
      t.includes("scholarly") ||
      t.includes("literature review") ||
      t.includes("fallacy") ||
      (s.includes("lang") && (t.includes("discourse") || t.includes("synthesis") || t.includes("essay architecture")))
    ) {
      return "academic_english_discourse";
    }

    // 2. Literature
    if (
      s.includes("lit") ||
      t.includes("literature") ||
      t.includes("poetry") ||
      t.includes("drama") ||
      t.includes("prose") ||
      t.includes("novel") ||
      t.includes("literary") ||
      t.includes("soliloquy")
    ) {
      return "literature";
    }

    // 3. English Language & ESL
    if (
      s.includes("english") ||
      s.includes("lang") ||
      s === "eng" ||
      t.includes("grammar") ||
      t.includes("concord") ||
      t.includes("phonics") ||
      t.includes("esl") ||
      t.includes("clause") ||
      t.includes("syntax")
    ) {
      return "english_language_esl";
    }

    // 4. Mathematics
    if (s.includes("math") || t.includes("algebra") || t.includes("geometry") || t.includes("calculus") || t.includes("quadratic")) {
      return "mathematics";
    }

    // 5. Physics
    if (s.includes("phys") || t.includes("kinematic") || t.includes("vector") || t.includes("mechanics") || t.includes("optics") || t.includes("projectile")) {
      return "physics";
    }

    // 6. Chemistry
    if (s.includes("chem") || t.includes("titration") || t.includes("stoichiometry") || t.includes("acid") || t.includes("molecular") || t.includes("periodic")) {
      return "chemistry";
    }

    // 7. Biology
    if (s.includes("bio") || t.includes("cell") || t.includes("mitosis") || t.includes("genetics") || t.includes("ecology") || t.includes("enzyme")) {
      return "biology";
    }

    // 8. Computer Science & ICT
    if (s.includes("comp") || s.includes("ict") || t.includes("algorithm") || t.includes("binary search") || t.includes("programming") || t.includes("data structure")) {
      return "computer_science";
    }

    // 9. Engineering
    if (s.includes("engineer") || s.includes("tech_mech") || t.includes("beam") || t.includes("bending moment") || t.includes("statics") || t.includes("circuit schematic")) {
      return "engineering";
    }

    // 10. Economics
    if (s.includes("econ") || t.includes("market equilibrium") || t.includes("microeconomics") || t.includes("macroeconomics") || t.includes("elasticity")) {
      return "economics";
    }

    // 11. Financial Literacy
    if (s.includes("fin") || t.includes("budget") || t.includes("compound interest") || t.includes("saving") || t.includes("investment")) {
      return "financial_literacy";
    }

    return "academic_english_discourse";
  }

  /**
   * Validates whether a given instructional template is compatible with the lesson context
   */
  public isTemplateCompatible(templateType: string, context: SmartBoardLessonContext): boolean {
    const category = this.determineSubjectCategory(context.subject, context.topic);
    const t = templateType.toLowerCase();

    // Strict non-math isolation: Mathematics templates are FORBIDDEN in language/humanities
    const isLanguageHumanities =
      category === "academic_english_discourse" ||
      category === "literature" ||
      category === "english_language_esl";

    if (isLanguageHumanities) {
      if (
        t.includes("math") ||
        t.includes("calculation") ||
        t.includes("formula_derivation") ||
        t.includes("algebraic") ||
        t.includes("numeric")
      ) {
        return false;
      }
    }

    // Strict math isolation: Language templates are incompatible with pure math
    if (category === "mathematics") {
      if (t.includes("syntax_tree") || t.includes("literary") || t.includes("rhetoric")) {
        return false;
      }
    }

    return true;
  }

  /**
   * Audits text content to ensure banned cross-subject terminology is not contaminating the lesson
   */
  public auditSubjectContentFidelity(
    text: string,
    category: SubjectCategory
  ): QualityGateAuditFinding[] {
    const findings: QualityGateAuditFinding[] = [];
    const lower = text.toLowerCase();

    if (
      category === "academic_english_discourse" ||
      category === "literature" ||
      category === "english_language_esl"
    ) {
      const bannedMathPhrases = [
        "line of calculation",
        "lines of calculation",
        "without skipping any operations",
        "calculate the final answer",
        "substitute our values into the formula",
        "substituting into the formula",
        "algebraic term transforms",
        "governing equation",
        "dimensional units",
        "sign or dimensional errors"
      ];

      for (const phrase of bannedMathPhrases) {
        if (lower.includes(phrase)) {
          findings.push({
            code: "SUBJECT_MISMATCH",
            severity: "CRITICAL",
            message: `Mathematical instructional phrase '${phrase}' detected in ${category} lesson.`,
            detectedIn: text.slice(0, 80) + "..."
          });
        }
      }
    }

    return findings;
  }
}

export const smartBoardTopicLockService = SmartBoardTopicLockService.getInstance();
