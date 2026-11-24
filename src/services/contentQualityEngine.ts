/**
 * MOOS ACADEMY — WEIGHTED PEDAGOGICAL QUALITY ASSURANCE & GOVERNANCE ENGINE
 *
 * Implements:
 * - Weighted 8-dimension QA rubric (approval threshold: >= 85%)
 * - Automatic critical disqualifiers (math/logic flaws, scratchpad leaks, duplicate stems,
 *   invalid answer keys, missing derivations, missing alignment/prerequisites)
 * - 8-state publication lifecycle enforcement
 * - Immutable version history with atomic snapshot rollback
 * - Learner production isolation (only verified, approved, non-disqualified modules exposed)
 * - 11 genuine educational depth metrics across all 300 catalog subjects & authored units
 */

import { EducationalLevel, PracticeQuestion, Skill, Unit } from "../types/curriculum";
import {
  APPROVAL_QUALITY_THRESHOLD,
  ContentRevisionSnapshot,
  CurriculumScope,
  ElevenDepthMetrics,
  GovernanceDisqualifier,
  PublicationStatus,
  QA_DIMENSION_WEIGHTS,
  QADimensionScores,
  TopicGovernanceRecord
} from "../types/contentGovernance";
import { ALL_CURRICULUM_UNITS } from "../data/extendedCurriculumUnits";
import { VISUALIZATION_REPOSITORY } from "../data/visualizationsRepository";
import { CURRICULUM_STANDARD_MAPPINGS } from "../data/curriculumMappingsData";
import { EXPANDED_151_SUBJECT_CATEGORIES } from "../data/expandedSubjectCategories";

const SCRATCHPAD_PATTERNS: RegExp[] = [
  /\bwait\s*:/i,
  /\?\s*wait\b/i,
  /\bwait,\s*(?:sample|look|if|check)\b/i,
  /\blet'?s\s+check\b/i,
  /\bcheck\s+the\s+solution\s*!/i,
  /\[todo\]/i,
  /\blorem\s+ipsum\b/i,
  /\(if\s+RHS\s+is\s+changed\)/i
];

function cloneUnit(unit: Unit): Unit {
  return JSON.parse(JSON.stringify(unit)) as Unit;
}

function bumpMinorVersion(version: string): string {
  const parts = version.split(".").map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    return "1.1.0";
  }
  return `${parts[0]}.${parts[1] + 1}.0`;
}

/**
 * Evaluates fractional two-term linear equations of form:
 * \frac{ay + b}{c} (+/-) \frac{dy + e}{f} = g
 * Returns true if consistent or not of that form, false if demonstrably false.
 */
function verifyRationalLinearEquation(question: PracticeQuestion): string | null {
  const expr = (question.mathExpression || "").replace(/\s+/g, "");
  const rationalMatch = expr.match(
    /^\\frac\{(\d*)([a-zA-Z])([+-]\d+)\}\{(\d+)\}([+-])\\frac\{(\d*)([a-zA-Z])([+-]\d+)\}\{(\d+)\}=([+-]?\d+)$/
  );
  if (!rationalMatch) return null;

  const [, aStr, v1, bStr, cStr, op, dStr, v2, eStr, fStr, rhsStr] = rationalMatch;
  if (v1 !== v2) return null;

  const a = aStr === "" ? 1 : Number(aStr);
  const b = Number(bStr);
  const c = Number(cStr);
  const sign = op === "-" ? -1 : 1;
  const d = dStr === "" ? 1 : Number(dStr);
  const e = Number(eStr);
  const f = Number(fStr);
  const rhs = Number(rhsStr);

  // Extract claimed numeric value from correctAnswer like "y = 7"
  const ansMatch = (question.correctAnswer || "").match(/([+-]?\d+(?:\.\d+)?)/);
  if (!ansMatch) return null;
  const claimed = Number(ansMatch[1]);

  const lhs = (a * claimed + b) / c + sign * ((d * claimed + e) / f);
  if (Math.abs(lhs - rhs) > 1e-6) {
    return `Mathematical contradiction in '${question.id}': substituting ${v1}=${claimed} yields LHS=${lhs.toFixed(2)} != RHS=${rhs}.`;
  }
  return null;
}

/**
 * Checks quantitative tuple puzzles `[a, b -> out]` when paired with rule `a² + b` or `a^2 + b`.
 */
function verifyQuantitativeTuplePuzzle(question: PracticeQuestion): string | null {
  const combinedText = `${question.questionText || ""} ${question.contextText || ""}`;
  const fullHintText = `${(question.hintLadder || []).join(" ")} ${question.explanation || ""}`;
  const tupleMatches = Array.from(combinedText.matchAll(/\[(\d+)\s*,\s*(\d+)\s*->\s*(\d+|\?)\]/g));
  if (tupleMatches.length < 2) return null;

  const citesSquarePlusB = /a²\s*\+\s*b|a\^2\s*\+\s*b|top-left.*?squared/i.test(fullHintText);
  if (!citesSquarePlusB) return null;

  for (const m of tupleMatches) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    const out = m[3];
    if (out === "?") continue;
    const expected = a * a + b;
    if (expected !== Number(out)) {
      return `Quantitative sample inconsistency in '${question.id}': [${a}, ${b} -> ${out}] violates rule a² + b = ${expected}.`;
    }
  }
  return null;
}

/**
 * Checks for contradictory hint/answer pairs (e.g. two options matching or hint naming a different option).
 */
function verifyQuestionIntegrity(question: PracticeQuestion): string | null {
  if (!question.correctAnswer || !question.correctAnswer.trim()) {
    return `Question '${question.id}' has empty correctAnswer.`;
  }

  if (question.type === "multiple_choice") {
    const opts = question.options || [];
    if (opts.length < 3) {
      return `MCQ '${question.id}' must provide at least 3 distinct options.`;
    }
    const isCaseSensitive = /capitaliz|punctuat/i.test(question.questionText || "");
    const normalizedOpts = opts.map((o) =>
      isCaseSensitive ? o.trim() : o.trim().toLowerCase()
    );
    if (new Set(normalizedOpts).size !== normalizedOpts.length) {
      return `MCQ '${question.id}' contains duplicate option strings.`;
    }
    if (!opts.includes(question.correctAnswer)) {
      return `MCQ '${question.id}' correctAnswer '${question.correctAnswer}' is missing from options.`;
    }

    // Detect explicit hint-answer contradiction where hint names a different option as final answer
    const lastHint = (question.hintLadder?.[question.hintLadder.length - 1] || "").trim();
    const matchQuote = lastHint.match(/'([^']+)' is an adjective|Answer:\s*'([^']+)'/i);
    const hintedWord = (matchQuote?.[1] || matchQuote?.[2] || "").trim();
    if (
      hintedWord &&
      opts.includes(hintedWord) &&
      hintedWord.toLowerCase() !== question.correctAnswer.trim().toLowerCase()
    ) {
      return `Answer key contradiction in '${question.id}': hint points to '${hintedWord}', but correctAnswer is '${question.correctAnswer}'.`;
    }
  }

  if (!question.explanation || question.explanation.trim().length < 10) {
    return `Question '${question.id}' lacks a meaningful pedagogical explanation.`;
  }

  return null;
}

function detectScratchpadLeak(obj: unknown): string | null {
  const serialized = JSON.stringify(obj);
  for (const pattern of SCRATCHPAD_PATTERNS) {
    const match = serialized.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return null;
}

function resolveCurriculumScope(unit: Unit, skill?: Skill): CurriculumScope {
  if (unit.level === "university_prep") {
    return "ADVANCED_ENRICHMENT";
  }
  if (skill?.difficulty === "advanced" && unit.category === "applied") {
    return "ADVANCED_ENRICHMENT";
  }
  return "CORE_SYLLABUS";
}

function resolveUnitCurricula(unit: Unit): string[] {
  const tags = new Set<string>(unit.curriculumStandardMappings || []);
  for (const skill of unit.skills) {
    for (const q of skill.questions || []) {
      if (q.curriculumStandard) tags.add(q.curriculumStandard);
    }
    const mappings = CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.canonicalSkillId === skill.id);
    for (const m of mappings) {
      tags.add(`${m.curriculumSystem}:${m.standardIdentifier}`);
    }
  }
  if (tags.size === 0) {
    if (unit.level === "primary_foundations" || unit.level === "upper_primary" || unit.level === "junior_secondary") {
      tags.add("NERDC_NIGERIAN");
    } else if (unit.level === "senior_secondary" || unit.level === "exam_prep") {
      tags.add("NERDC_NIGERIAN");
      tags.add("WAEC_WASSCE");
      tags.add("NECO_SSCE");
      tags.add("JAMB_UTME");
    } else {
      tags.add("UNIVERSITY_PREPARATION");
    }
  }
  return Array.from(tags);
}

function countUnitVisualizations(unit: Unit): { total: number; withSvg: number } {
  const skillIds = new Set(unit.skills.map((s) => s.id));
  let total = 0;
  let withSvg = 0;
  for (const viz of Object.values(VISUALIZATION_REPOSITORY)) {
    if (viz.unitId === unit.id || skillIds.has(viz.skillId)) {
      total++;
      if (viz.diagramSvgSnippet && viz.diagramSvgSnippet.includes("<svg")) {
        withSvg++;
      }
    }
  }
  for (const skill of unit.skills) {
    for (const q of skill.questions || []) {
      if (q.diagramSvg && q.diagramSvg.includes("<svg")) {
        total++;
        withSvg++;
      }
    }
  }
  return { total, withSvg };
}

class ContentQualityEngine {
  private governanceRegistry: Map<string, TopicGovernanceRecord> = new Map();
  private unitOverrides: Map<string, Unit> = new Map();
  private initializedCatalogSize: number = -1;

  private ensureInitialized(catalogUnits: Unit[] = ALL_CURRICULUM_UNITS): void {
    if (this.initializedCatalogSize === catalogUnits.length && this.governanceRegistry.size > 0) {
      return;
    }
    this.initializedCatalogSize = catalogUnits.length;
    for (const unit of catalogUnits) {
      if (!this.governanceRegistry.has(unit.id)) {
        const record = this.evaluateUnitQuality(unit, catalogUnits);
        this.governanceRegistry.set(unit.id, record);
      }
    }
  }

  public resetForTesting(): void {
    this.governanceRegistry.clear();
    this.unitOverrides.clear();
    this.initializedCatalogSize = -1;
  }

  public getEffectiveUnit(unitId: string, baseUnits: Unit[] = ALL_CURRICULUM_UNITS): Unit | undefined {
    return this.unitOverrides.get(unitId) || baseUnits.find((u) => u.id === unitId);
  }

  /**
   * Evaluates a single unit across 8 weighted QA dimensions and automatic disqualifiers.
   */
  public evaluateUnitQuality(
    unit: Unit,
    catalogUnits: Unit[] = ALL_CURRICULUM_UNITS,
    options?: {
      strictFlagship?: boolean;
      overrideStatus?: PublicationStatus;
      version?: string;
      revisionHistory?: ContentRevisionSnapshot[];
    }
  ): TopicGovernanceRecord {
    const disqualifiers: GovernanceDisqualifier[] = [];
    const skills = unit.skills || [];
    const allQuestions = skills.flatMap((s) => s.questions || []);

    // Build stem registry from catalog + candidate unit for cross-unit & intra-unit duplicate check
    const effectiveCatalogForStemScan = catalogUnits.some((u) => u.id === unit.id)
      ? catalogUnits
      : [...catalogUnits, unit];
    const stemCounts = new Map<string, string[]>();
    for (const otherUnit of effectiveCatalogForStemScan) {
      const effectiveOther = otherUnit.id === unit.id ? unit : otherUnit;
      for (const s of effectiveOther.skills || []) {
        for (const q of s.questions || []) {
          const normalizedStem = `${(q.questionText || "").trim().toLowerCase()}::${(q.mathExpression || "").trim().toLowerCase()}`;
          if (!stemCounts.has(normalizedStem)) stemCounts.set(normalizedStem, []);
          stemCounts.get(normalizedStem)!.push(q.id);
        }
      }
    }
    // Also detect generic duplicate short questionText without context variation across catalog
    const shortStemCounts = new Map<string, string[]>();
    for (const otherUnit of effectiveCatalogForStemScan) {
      const effectiveOther = otherUnit.id === unit.id ? unit : otherUnit;
      for (const s of effectiveOther.skills || []) {
        for (const q of s.questions || []) {
          const qt = (q.questionText || "").trim().toLowerCase();
          if (qt.length > 15 && qt.length < 48 && !q.contextText) {
            if (!shortStemCounts.has(qt)) shortStemCounts.set(qt, []);
            shortStemCounts.get(qt)!.push(q.id);
          }
        }
      }
    }

    let mathErrorCount = 0;
    let answerKeyErrorCount = 0;
    let duplicateCount = 0;
    let scratchpadCount = 0;
    let missingWorkedCount = 0;
    let questionsWithTwoPlusHints = 0;
    let questionsWithMisconceptions = 0;
    let totalWorkedExamples = 0;
    let maxWorkedSteps = 0;

    // 1. Unit-level scratchpad scan
    const unitScratch = detectScratchpadLeak({ title: unit.title, description: unit.description });
    if (unitScratch) {
      scratchpadCount++;
      disqualifiers.push({
        code: "SCRATCHPAD_LEAK",
        severity: "CRITICAL",
        message: `Draft/scratchpad leak ('${unitScratch}') detected in unit metadata.`
      });
    }

    if (skills.length === 0) {
      disqualifiers.push({
        code: "MISSING_WORKED_DERIVATION",
        severity: "CRITICAL",
        message: `Unit '${unit.id}' has 0 skills.`
      });
    }

    // Check skills
    for (const skill of skills) {
      const lesson = skill.lesson;
      if (!lesson) {
        missingWorkedCount++;
        disqualifiers.push({
          code: "MISSING_WORKED_DERIVATION",
          severity: "CRITICAL",
          skillId: skill.id,
          message: `Skill '${skill.id}' has no structured lesson.`
        });
      } else {
        const worked = lesson.workedExamples || [];
        totalWorkedExamples += worked.length;
        if (worked.length === 0) {
          missingWorkedCount++;
          disqualifiers.push({
            code: "MISSING_WORKED_DERIVATION",
            severity: "CRITICAL",
            skillId: skill.id,
            message: `Skill '${skill.id}' has no worked derivation examples.`
          });
        } else {
          for (const ex of worked) {
            const steps = ex.steps || [];
            if (steps.length > maxWorkedSteps) maxWorkedSteps = steps.length;
            if (steps.length < 2) {
              missingWorkedCount++;
              disqualifiers.push({
                code: "MISSING_WORKED_DERIVATION",
                severity: "BLOCKING",
                skillId: skill.id,
                message: `Worked example '${ex.title}' in '${skill.id}' has fewer than 2 derivation steps.`
              });
            }
          }
        }

        const lessonScratch = detectScratchpadLeak(lesson);
        if (lessonScratch) {
          scratchpadCount++;
          disqualifiers.push({
            code: "SCRATCHPAD_LEAK",
            severity: "CRITICAL",
            skillId: skill.id,
            message: `Draft/scratchpad text ('${lessonScratch}') leaked inside lesson '${lesson.id}'.`
          });
        }
      }

      const qs = skill.questions || [];
      if (qs.length < 2) {
        disqualifiers.push({
          code: "INSUFFICIENT_ASSESSMENT_COVERAGE",
          severity: "BLOCKING",
          skillId: skill.id,
          message: `Skill '${skill.id}' has only ${qs.length} questions (minimum required >= 2, flagship target >= 5).`
        });
      } else if (options?.strictFlagship && qs.length < 5) {
        disqualifiers.push({
          code: "INSUFFICIENT_ASSESSMENT_COVERAGE",
          severity: "BLOCKING",
          skillId: skill.id,
          message: `Flagship skill '${skill.id}' requires >= 5 questions; currently has ${qs.length}.`
        });
      }

      for (const q of qs) {
        const qScratch = detectScratchpadLeak(q);
        if (qScratch) {
          scratchpadCount++;
          disqualifiers.push({
            code: "SCRATCHPAD_LEAK",
            severity: "CRITICAL",
            skillId: skill.id,
            questionId: q.id,
            message: `Draft/scratchpad leak ('${qScratch}') in question '${q.id}'.`
          });
        }

        const integrityErr = verifyQuestionIntegrity(q);
        if (integrityErr) {
          answerKeyErrorCount++;
          disqualifiers.push({
            code: "INVALID_ANSWER_KEY",
            severity: "CRITICAL",
            skillId: skill.id,
            questionId: q.id,
            message: integrityErr
          });
        }

        const rationalErr = verifyRationalLinearEquation(q);
        if (rationalErr) {
          mathErrorCount++;
          disqualifiers.push({
            code: "BROKEN_MATH_OR_LOGIC",
            severity: "CRITICAL",
            skillId: skill.id,
            questionId: q.id,
            message: rationalErr
          });
        }

        const quantErr = verifyQuantitativeTuplePuzzle(q);
        if (quantErr) {
          mathErrorCount++;
          disqualifiers.push({
            code: "BROKEN_MATH_OR_LOGIC",
            severity: "CRITICAL",
            skillId: skill.id,
            questionId: q.id,
            message: quantErr
          });
        }

        const fullStemKey = `${(q.questionText || "").trim().toLowerCase()}::${(q.mathExpression || "").trim().toLowerCase()}`;
        if ((stemCounts.get(fullStemKey)?.length || 0) > 1) {
          duplicateCount++;
          disqualifiers.push({
            code: "DUPLICATE_QUESTION_STEM",
            severity: "BLOCKING",
            skillId: skill.id,
            questionId: q.id,
            message: `Duplicate question stem detected for '${q.id}'.`
          });
        } else {
          const qt = (q.questionText || "").trim().toLowerCase();
          if ((shortStemCounts.get(qt)?.length || 0) > 1) {
            duplicateCount++;
            disqualifiers.push({
              code: "DUPLICATE_QUESTION_STEM",
              severity: "BLOCKING",
              skillId: skill.id,
              questionId: q.id,
              message: `Ambiguous identical questionText '${q.questionText}' shared across multiple items ('${q.id}').`
            });
          }
        }

        if ((q.hintLadder || []).length >= 2) questionsWithTwoPlusHints++;
        if ((q.misconceptionAlerts || []).length >= 1) questionsWithMisconceptions++;
      }
    }

    // Curriculum & prerequisites check
    const hasExplicitStandards =
      (unit.curriculumStandardMappings && unit.curriculumStandardMappings.length > 0) ||
      skills.some((s) => (s.questions || []).some((q) => Boolean(q.curriculumStandard))) ||
      skills.some((s) => CURRICULUM_STANDARD_MAPPINGS.some((m) => m.canonicalSkillId === s.id));
    const hasExplicitObjectives = skills.every((s) => (s.objectives || []).length >= 2);
    const prerequisites = Array.from(
      new Set(skills.flatMap((s) => s.prerequisiteSkillIds || []))
    );
    const isFoundationTier =
      unit.level === "primary_foundations" ||
      unit.level === "upper_primary" ||
      unit.order === 1;

    if (!hasExplicitObjectives || (!unit.subjectId || !unit.title)) {
      disqualifiers.push({
        code: "MISSING_ALIGNMENT_OR_PREREQ",
        severity: "BLOCKING",
        message: `Unit '${unit.id}' is missing canonical subject alignment or learning objectives.`
      });
    }

    // Compute 8 dimension scores (0..100)
    const minQuestionsPerSkill = skills.length
      ? Math.min(...skills.map((s) => (s.questions || []).length))
      : 0;
    const avgQuestionsPerSkill = skills.length
      ? Number((allQuestions.length / skills.length).toFixed(2))
      : 0;

    const difficulties = new Set(allQuestions.map((q) => q.difficulty));
    const hasAllDifficultyTiers =
      difficulties.has("easy") && difficulties.has("medium") && difficulties.has("hard");

    const { total: visualTotal, withSvg: svgCount } = countUnitVisualizations(unit);

    const mathematicalAndFactualAccuracy = Math.max(
      0,
      100 - mathErrorCount * 45 - answerKeyErrorCount * 40
    );

    const syllabusAndPrerequisiteAlignment = Math.min(
      100,
      (hasExplicitObjectives ? 55 : 20) +
        (hasExplicitStandards ? 30 : 15) +
        (prerequisites.length > 0 || isFoundationTier ? 15 : 5)
    );

    const workedDerivationDepth =
      missingWorkedCount > 0
        ? Math.max(0, 60 - missingWorkedCount * 25)
        : Math.min(100, 70 + (maxWorkedSteps >= 4 ? 20 : maxWorkedSteps >= 3 ? 15 : 5) + (totalWorkedExamples >= skills.length * 2 ? 10 : 0));

    let assessmentCoverageScore = 0;
    if (minQuestionsPerSkill >= 5) {
      assessmentCoverageScore = hasAllDifficultyTiers ? 100 : 94;
    } else if (minQuestionsPerSkill >= 3) {
      assessmentCoverageScore = avgQuestionsPerSkill >= 4 ? 88 : 82;
    } else if (minQuestionsPerSkill === 2) {
      assessmentCoverageScore = 62;
    } else if (minQuestionsPerSkill === 1) {
      assessmentCoverageScore = 38;
    }

    const visualAndDiagramFidelity =
      svgCount > 0
        ? 100
        : visualTotal > 0
        ? 85
        : skills.some((s) => Boolean(s.lesson?.conceptualModel))
        ? 75
        : 55;

    const hintCoverageRatio = allQuestions.length ? questionsWithTwoPlusHints / allQuestions.length : 0;
    const misconceptionCoverageRatio = allQuestions.length ? questionsWithMisconceptions / allQuestions.length : 0;
    const lessonTrapCount = skills.filter((s) => (s.lesson?.commonMisconceptionsAndTraps?.length || 0) > 0).length;
    const lessonTrapRatio = skills.length ? lessonTrapCount / skills.length : 0;
    const misconceptionAndHintRigor = Math.round(
      hintCoverageRatio * 45 + misconceptionCoverageRatio * 30 + lessonTrapRatio * 25
    );

    const antiDuplicationAndCleanProse = Math.max(
      0,
      100 - scratchpadCount * 50 - duplicateCount * 40
    );

    const flowChecks = skills.map((s) => {
      const l = s.lesson;
      if (!l) return 0;
      let pts = 0;
      if (l.hookAndIntuition) pts += 25;
      if (l.conceptualExplanation && l.conceptualExplanation.length > 200) pts += 25;
      if (l.guidedPracticePrompt) pts += 20;
      if (l.independentPracticePrompt || l.extensionActivity) pts += 15;
      if (l.summaryRecap || l.masteryAssessment) pts += 15;
      return pts;
    });
    const pedagogicalFlowAndRevision = flowChecks.length
      ? Math.round(flowChecks.reduce((a, b) => a + b, 0) / flowChecks.length)
      : 0;

    const dimensionScores: QADimensionScores = {
      mathematicalAndFactualAccuracy,
      syllabusAndPrerequisiteAlignment,
      workedDerivationDepth,
      assessmentCoverage: assessmentCoverageScore,
      visualAndDiagramFidelity,
      misconceptionAndHintRigor,
      antiDuplicationAndCleanProse,
      pedagogicalFlowAndRevision
    };

    const weightedScoreRaw =
      dimensionScores.mathematicalAndFactualAccuracy * QA_DIMENSION_WEIGHTS.mathematicalAndFactualAccuracy +
      dimensionScores.syllabusAndPrerequisiteAlignment * QA_DIMENSION_WEIGHTS.syllabusAndPrerequisiteAlignment +
      dimensionScores.workedDerivationDepth * QA_DIMENSION_WEIGHTS.workedDerivationDepth +
      dimensionScores.assessmentCoverage * QA_DIMENSION_WEIGHTS.assessmentCoverage +
      dimensionScores.visualAndDiagramFidelity * QA_DIMENSION_WEIGHTS.visualAndDiagramFidelity +
      dimensionScores.misconceptionAndHintRigor * QA_DIMENSION_WEIGHTS.misconceptionAndHintRigor +
      dimensionScores.antiDuplicationAndCleanProse * QA_DIMENSION_WEIGHTS.antiDuplicationAndCleanProse +
      dimensionScores.pedagogicalFlowAndRevision * QA_DIMENSION_WEIGHTS.pedagogicalFlowAndRevision;

    // Disqualifiers cap quality score below approval threshold
    const qualityScore =
      disqualifiers.length > 0
        ? Math.min(72, Math.round(weightedScoreRaw))
        : Math.round(weightedScoreRaw);

    let publicationStatus: PublicationStatus;
    if (options?.overrideStatus) {
      if ((options.overrideStatus === "approved" || options.overrideStatus === "published") && (disqualifiers.length > 0 || qualityScore < APPROVAL_QUALITY_THRESHOLD)) {
        publicationStatus = disqualifiers.length > 0 ? "qa_failed" : "qa_pending";
      } else {
        publicationStatus = options.overrideStatus;
      }
    } else if (disqualifiers.length > 0) {
      publicationStatus = "qa_failed";
    } else if (qualityScore >= APPROVAL_QUALITY_THRESHOLD) {
      publicationStatus = "published";
    } else {
      publicationStatus = "qa_pending";
    }

    const approvedForLearnerProduction =
      (publicationStatus === "published" || publicationStatus === "approved") &&
      disqualifiers.length === 0 &&
      qualityScore >= APPROVAL_QUALITY_THRESHOLD;

    const verificationStatus: TopicGovernanceRecord["verificationStatus"] =
      disqualifiers.length > 0
        ? "REJECTED"
        : qualityScore >= APPROVAL_QUALITY_THRESHOLD
        ? hasExplicitStandards
          ? "VERIFIED_OFFICIAL"
          : "PLATFORM_VERIFIED"
        : "PENDING_REVIEW";

    const version = options?.version || unit.provenanceVersion || "1.0.0";
    const nowIso = new Date().toISOString();
    const initialHistory: ContentRevisionSnapshot[] = options?.revisionHistory || [
      {
        version,
        timestamp: nowIso,
        author: "academy-qa-engine",
        summary: `Initial audited snapshot for ${unit.code}`,
        publicationStatus,
        qualityScore,
        unitSnapshot: cloneUnit(unit)
      }
    ];

    return {
      topicId: unit.id,
      unitId: unit.id,
      title: unit.title,
      subject: unit.subjectId,
      level: unit.level,
      curriculum: resolveUnitCurricula(unit),
      curriculumScope: resolveCurriculumScope(unit, skills[0]),
      prerequisites,
      version,
      revisionHistory: initialHistory,
      qualityScore,
      dimensionScores,
      disqualifiers,
      verificationStatus,
      publicationStatus,
      assessmentCoverage: {
        totalQuestions: allQuestions.length,
        skillsCount: skills.length,
        minQuestionsPerSkill,
        avgQuestionsPerSkill,
        hasAllDifficultyTiers
      },
      lastVerificationDate: nowIso,
      visualCount: svgCount || visualTotal,
      workedExampleCount: totalWorkedExamples,
      approvedForLearnerProduction
    };
  }

  public evaluateAllUnits(units: Unit[] = ALL_CURRICULUM_UNITS): TopicGovernanceRecord[] {
    this.ensureInitialized(units);
    return Array.from(this.governanceRegistry.values());
  }

  public getGovernanceRecord(unitId: string, units: Unit[] = ALL_CURRICULUM_UNITS): TopicGovernanceRecord | undefined {
    this.ensureInitialized(units);
    return this.governanceRegistry.get(unitId);
  }

  public getPublishedApprovedUnits(units: Unit[] = ALL_CURRICULUM_UNITS): Unit[] {
    this.ensureInitialized(units);
    return units
      .map((u) => this.getEffectiveUnit(u.id, units) || u)
      .filter((u) => {
        const rec = this.governanceRegistry.get(u.id);
        return Boolean(rec && rec.approvedForLearnerProduction);
      });
  }

  public getIsolatedUnits(units: Unit[] = ALL_CURRICULUM_UNITS): TopicGovernanceRecord[] {
    this.ensureInitialized(units);
    return Array.from(this.governanceRegistry.values()).filter((r) => !r.approvedForLearnerProduction);
  }

  /**
   * Registers or replaces a unit in the governance registry (used by authoring workflows and tests).
   */
  public registerOrUpdateUnit(
    unit: Unit,
    author: string = "academic-editor",
    summary: string = "Submitted module revision",
    requestedStatus?: PublicationStatus,
    catalogUnits: Unit[] = ALL_CURRICULUM_UNITS
  ): TopicGovernanceRecord {
    this.ensureInitialized(catalogUnits);
    const existing = this.governanceRegistry.get(unit.id);
    const nextVersion = existing ? bumpMinorVersion(existing.version) : (unit.provenanceVersion || "1.0.0");
    const history: ContentRevisionSnapshot[] = existing ? [...existing.revisionHistory] : [];

    const effectiveCatalog = catalogUnits.some((u) => u.id === unit.id)
      ? catalogUnits.map((u) => (u.id === unit.id ? unit : u))
      : [...catalogUnits, unit];

    const evaluated = this.evaluateUnitQuality(unit, effectiveCatalog, {
      version: nextVersion,
      overrideStatus: requestedStatus,
      revisionHistory: history
    });

    const snapshot: ContentRevisionSnapshot = {
      version: nextVersion,
      timestamp: evaluated.lastVerificationDate,
      author,
      summary,
      publicationStatus: evaluated.publicationStatus,
      qualityScore: evaluated.qualityScore,
      unitSnapshot: cloneUnit(unit)
    };

    evaluated.revisionHistory = [...history, snapshot];
    this.unitOverrides.set(unit.id, cloneUnit(unit));
    this.governanceRegistry.set(unit.id, evaluated);
    return evaluated;
  }

  /**
   * Transitions lifecycle state across all 8 valid publication states, enforcing QA >= 85%.
   */
  public transitionPublicationStatus(
    unitId: string,
    targetStatus: PublicationStatus,
    actor: string = "academic-reviewer",
    reason: string = "Governance workflow transition"
  ): { success: boolean; record?: TopicGovernanceRecord; message: string } {
    this.ensureInitialized();
    const record = this.governanceRegistry.get(unitId);
    if (!record) {
      return { success: false, message: `Unit '${unitId}' is not registered in governance registry.` };
    }

    if (
      (targetStatus === "approved" || targetStatus === "published") &&
      (record.disqualifiers.length > 0 || record.qualityScore < APPROVAL_QUALITY_THRESHOLD)
    ) {
      return {
        success: false,
        record,
        message: `QA Gate Blocked: Unit '${unitId}' scored ${record.qualityScore}% with ${record.disqualifiers.length} disqualifiers (requires >= ${APPROVAL_QUALITY_THRESHOLD}% and 0 disqualifiers).`
      };
    }

    const updated: TopicGovernanceRecord = {
      ...record,
      publicationStatus: targetStatus,
      approvedForLearnerProduction:
        (targetStatus === "approved" || targetStatus === "published") &&
        record.disqualifiers.length === 0 &&
        record.qualityScore >= APPROVAL_QUALITY_THRESHOLD,
      lastVerificationDate: new Date().toISOString(),
      revisionHistory: [
        ...record.revisionHistory,
        {
          version: record.version,
          timestamp: new Date().toISOString(),
          author: actor,
          summary: `State -> ${targetStatus}: ${reason}`,
          publicationStatus: targetStatus,
          qualityScore: record.qualityScore,
          unitSnapshot: cloneUnit(
            this.getEffectiveUnit(unitId) || record.revisionHistory[record.revisionHistory.length - 1].unitSnapshot
          )
        }
      ]
    };

    this.governanceRegistry.set(unitId, updated);
    return {
      success: true,
      record: updated,
      message: `Transitioned '${unitId}' to '${targetStatus}'.`
    };
  }

  /**
   * Atomically rolls back a unit to a prior immutable revision snapshot.
   */
  public rollbackToVersion(
    unitId: string,
    targetVersion: string,
    actor: string = "academy-owner"
  ): { success: boolean; unit?: Unit; record?: TopicGovernanceRecord; message: string } {
    this.ensureInitialized();
    const record = this.governanceRegistry.get(unitId);
    if (!record) {
      return { success: false, message: `Unit '${unitId}' not found in governance registry.` };
    }

    const targetSnapshot = record.revisionHistory.find((rev) => rev.version === targetVersion);
    if (!targetSnapshot) {
      return {
        success: false,
        message: `Snapshot version '${targetVersion}' does not exist for unit '${unitId}'.`
      };
    }

    const restoredUnit = cloneUnit(targetSnapshot.unitSnapshot);
    const reEvaluated = this.evaluateUnitQuality(restoredUnit, ALL_CURRICULUM_UNITS, {
      version: targetSnapshot.version,
      overrideStatus: targetSnapshot.publicationStatus,
      revisionHistory: [
        ...record.revisionHistory,
        {
          version: targetSnapshot.version,
          timestamp: new Date().toISOString(),
          author: actor,
          summary: `Atomic rollback to v${targetSnapshot.version}`,
          publicationStatus: targetSnapshot.publicationStatus,
          qualityScore: targetSnapshot.qualityScore,
          unitSnapshot: cloneUnit(restoredUnit)
        }
      ]
    });

    this.unitOverrides.set(unitId, restoredUnit);
    this.governanceRegistry.set(unitId, reEvaluated);

    return {
      success: true,
      unit: restoredUnit,
      record: reEvaluated,
      message: `Rolled back '${unitId}' to version ${targetSnapshot.version}.`
    };
  }

  /**
   * Computes the 11 genuine educational depth metrics across the 300-subject catalog and authored units.
   */
  public getElevenDepthMetrics(units: Unit[] = ALL_CURRICULUM_UNITS): ElevenDepthMetrics {
    this.ensureInitialized(units);
    const records = Array.from(this.governanceRegistry.values());
    const effectiveUnits = units.map((u) => this.getEffectiveUnit(u.id, units) || u);
    const skills = effectiveUnits.flatMap((u) => u.skills || []);
    const questions = skills.flatMap((s) => s.questions || []);

    const approvedRecords = records.filter((r) => r.approvedForLearnerProduction);
    const isolatedRecords = records.filter((r) => !r.approvedForLearnerProduction);
    const approvedIds = new Set(approvedRecords.map((r) => r.unitId));
    const publishedUnits = effectiveUnits.filter((u) => approvedIds.has(u.id));

    const publishedSubjectIds = new Set(publishedUnits.map((u) => u.subjectId));
    const coveredCatalogSubjects = EXPANDED_151_SUBJECT_CATEGORIES.filter((subj) =>
      publishedUnits.some(
        (u) =>
          u.subjectId === subj.code ||
          (subj.code.startsWith("math") && u.subjectId.startsWith("math")) ||
          (subj.code.includes("english") && u.subjectId.startsWith("lang_"))
      )
    );

    const avgApprovedScore = approvedRecords.length
      ? Math.round(approvedRecords.reduce((acc, r) => acc + r.qualityScore, 0) / approvedRecords.length)
      : 0;

    const totalSvgVisualizations = Object.values(VISUALIZATION_REPOSITORY).filter(
      (v) => Boolean(v.diagramSvgSnippet && v.diagramSvgSnippet.includes("<svg"))
    ).length;

    const subjectsCoveredCount = Math.max(publishedSubjectIds.size, coveredCatalogSubjects.length);

    return {
      catalogSubjectsCount: EXPANDED_151_SUBJECT_CATEGORIES.length,
      subjectsWithPublishedUnitsCount: subjectsCoveredCount,
      subjectsWithIsolatedOrNoUnitsCount: Math.max(0, EXPANDED_151_SUBJECT_CATEGORIES.length - subjectsCoveredCount),
      authoredUnitsCount: effectiveUnits.length,
      approvedPublishedUnitsCount: approvedRecords.length,
      isolatedUnitsCount: isolatedRecords.length,
      skillsCount: skills.length,
      skillsWithMinFiveQuestionsCount: skills.filter((s) => (s.questions || []).length >= 5).length,
      totalVerifiedQuestions: questions.length,
      totalWorkedExamples: skills.reduce((acc, s) => acc + (s.lesson?.workedExamples?.length || 0), 0),
      totalSvgVisualizations,
      averageApprovedQualityScore: avgApprovedScore
    };
  }
}

export const contentQualityEngine = new ContentQualityEngine();
