/**
 * MOOS TECHY ACADEMY — AI TEACHER COPILOT SERVICE
 * 
 * Reuses:
 * - curriculumService & ALL_CURRICULUM_UNITS (curriculum repository)
 * - teacherStudioService (classrooms, rosters, adaptive groups, assignments)
 * - agentOrchestrationService (teacher_assistant_agent, human approval queue)
 * - auditService (immutable institutional governance log)
 * - identityService & authorizationService (RBAC validation)
 */

import {
  EducationalMaterialType,
  MaterialProvenance,
  MaterialLifecycleStatus,
  MaterialDifficulty,
  ParsedTeacherPrompt,
  TeacherEducationalMaterial,
  TeacherCopilotDefaults,
  PreparedLessonPackage,
  StructuredInstructionalSection,
  StructuredMaterialQuestion,
  StructuredDifferentiationTier
} from "../types/aiTeacherCopilot";
import { EducationalLevel, CurriculumStandard } from "../types/curriculum";
import { curriculumService } from "./curriculumService";
import { teacherStudioService } from "./teacherStudioService";
import { agentOrchestrationService } from "./agentOrchestrationService";
import { auditService } from "./auditService";
import { identityService, SEEDED_TEACHER_USER } from "./identityService";
import { authorizationService } from "./authorizationService";

const STORAGE_KEY = "moos_techy_teacher_materials_v1";
const DEFAULTS_STORAGE_KEY = "moos_techy_teacher_copilot_defaults_v1";

export class AITeacherCopilotService {
  private materials: TeacherEducationalMaterial[] = [];
  private defaults: TeacherCopilotDefaults;

  constructor() {
    this.defaults = this.loadDefaults();
    this.loadFromStorage();
    if (this.materials.length === 0) {
      this.seedInitialMaterials();
    }
  }

  // --- Natural Language Parsing & Context Extraction ---

  public parsePrompt(
    rawPrompt: string,
    activeContext?: {
      classroomId?: string;
      level?: EducationalLevel;
      subjectId?: string;
      subjectName?: string;
      topic?: string;
    }
  ): ParsedTeacherPrompt {
    const text = rawPrompt.toLowerCase().trim();

    // 1. Detect Material Type
    let detectedType: EducationalMaterialType = "lesson_plan";
    if (text.includes("lesson note") || text.includes("teaching note") || text.includes("class note") || text.includes("lecture note")) {
      detectedType = "lesson_note";
    } else if (text.includes("worksheet") || text.includes("work sheet") || text.includes("drill sheet")) {
      detectedType = "worksheet";
    } else if (text.includes("quiz") || text.includes("mcq")) {
      detectedType = "quiz";
    } else if (text.includes("class test") || text.includes("unit test") || (text.includes("test") && !text.includes("testbook") && !text.includes("latest"))) {
      detectedType = "class_test";
    } else if (text.includes("assignment") || text.includes("take home") || text.includes("take-home")) {
      detectedType = "assignment";
    } else if (text.includes("revision") || text.includes("review material") || text.includes("exam review")) {
      detectedType = "revision_material";
    } else if (text.includes("homework") || text.includes("home work")) {
      detectedType = "homework";
    } else if (text.includes("remedial activity") || text.includes("remediation drill") || text.includes("scaffold activity")) {
      detectedType = "remedial_activity";
    } else if (text.includes("extension") || text.includes("advanced activity") || text.includes("gifted") || text.includes("challenge activity")) {
      detectedType = "extension_activity";
    } else if (text.includes("answer key") || text.includes("solutions sheet")) {
      detectedType = "answer_key";
    } else if (text.includes("marking scheme") || text.includes("rubric")) {
      detectedType = "marking_scheme";
    } else if (text.includes("exit ticket") && !text.includes("lesson")) {
      detectedType = "exit_ticket";
    } else if (text.includes("study guide") || text.includes("cheat sheet") || text.includes("summary guide")) {
      detectedType = "study_guide";
    } else if (text.includes("lesson") || text.includes("plan a lesson") || text.includes("prepare a lesson") || text.includes("prepare a 40") || text.includes("prepare a 45")) {
      detectedType = "lesson_plan";
    }

    // 2. Detect Educational Level
    let targetLevel: EducationalLevel = activeContext?.level || this.defaults.defaultLevel;
    if (text.includes("primary 1") || text.includes("primary 2") || text.includes("primary 3") || text.includes("primary foundations") || text.includes("grade 1") || text.includes("grade 2") || text.includes("grade 3") || text.includes("lower primary")) {
      targetLevel = "primary_foundations";
    } else if (text.includes("primary 4") || text.includes("primary 5") || text.includes("primary 6") || text.includes("upper primary") || text.includes("grade 4") || text.includes("grade 5") || text.includes("grade 6") || text.includes("common entrance")) {
      targetLevel = "upper_primary";
    } else if (text.includes("jss1") || text.includes("jss 1") || text.includes("jss2") || text.includes("jss 2") || text.includes("jss3") || text.includes("jss 3") || text.includes("junior secondary") || text.includes("bece")) {
      targetLevel = "junior_secondary";
    } else if (text.includes("ss1") || text.includes("ss 1") || text.includes("ss2") || text.includes("ss 2") || text.includes("ss3") || text.includes("ss 3") || text.includes("sss1") || text.includes("sss2") || text.includes("sss3") || text.includes("senior secondary") || text.includes("waec") || text.includes("wassce")) {
      targetLevel = "senior_secondary";
    } else if (text.includes("university prep") || text.includes("utme") || text.includes("jamb") || text.includes("pre-degree") || text.includes("post-utme")) {
      targetLevel = "university_prep";
    } else if (text.includes("exam prep") || text.includes("neco") || text.includes("gcse") || text.includes("intensive prep")) {
      targetLevel = "exam_prep";
    }

    // 3. Detect Domain & Subject
    let targetDomain = "Mathematics";
    let targetSubjectId = "subj-mth-senior";
    let targetSubjectName = "Mathematics";

    if (text.includes("english") || text.includes("grammar") || text.includes("verb") || text.includes("letter") || text.includes("essay") || text.includes("comprehension") || text.includes("syntax") || text.includes("speech") || text.includes("word class")) {
      targetDomain = "English Language";
      targetSubjectId = targetLevel === "junior_secondary" ? "subj-eng-junior" : "subj-eng-senior";
      targetSubjectName = "English Language";
    } else if (text.includes("ict") || text.includes("computer") || text.includes("database") || text.includes("normalization") || text.includes("sql") || text.includes("programming") || text.includes("binary") || text.includes("algorithm")) {
      targetDomain = "Computer Science / ICT";
      targetSubjectId = "subj-ict-computing";
      targetSubjectName = "Computer Science & ICT";
    } else if (text.includes("science") || text.includes("stem") || text.includes("electricity") || text.includes("circuits") || text.includes("physics") || text.includes("chemistry") || text.includes("biology") || text.includes("respiration") || text.includes("photosynthesis") || text.includes("newton") || text.includes("pressure")) {
      targetDomain = "STEM / Science";
      targetSubjectId = text.includes("circuit") || text.includes("electricity") || text.includes("physics") ? "subj-stem-physics" : "subj-stem-general";
      targetSubjectName = text.includes("circuit") || text.includes("electricity") || text.includes("physics") ? "Physics & Basic Electricity" : "Science & STEM";
    } else if (text.includes("math") || text.includes("quadratic") || text.includes("fraction") || text.includes("algebra") || text.includes("geometry") || text.includes("circle theorem") || text.includes("calculus") || text.includes("trigonometry")) {
      targetDomain = "Mathematics";
      targetSubjectId = targetLevel === "senior_secondary" ? "subj-mth-senior" : targetLevel === "junior_secondary" ? "subj-mth-junior" : "subj-mth-primary";
      targetSubjectName = "Mathematics";
    } else if (activeContext?.subjectId) {
      targetSubjectId = activeContext.subjectId;
      targetSubjectName = activeContext.subjectName || "Active Subject";
      if (targetSubjectId.includes("eng")) targetDomain = "English Language";
      else if (targetSubjectId.includes("ict") || targetSubjectId.includes("cs")) targetDomain = "Computer Science / ICT";
      else if (targetSubjectId.includes("stem") || targetSubjectId.includes("sci") || targetSubjectId.includes("phy")) targetDomain = "STEM / Science";
      else targetDomain = "Mathematics";
    }

    // 4. Extract Topic
    let topic = activeContext?.topic || "";
    if (activeContext?.topic) {
      topic = activeContext.topic;
    } else if (text.includes("quadratic")) {
      topic = "Quadratic Equations & Roots";
    } else if (text.includes("normalization") || text.includes("database")) {
      topic = "Database Normalization (1NF, 2NF, 3NF)";
    } else if (text.includes("parts of speech") || text.includes("part of speech") || text.includes("word class") || text.includes("word classes")) {
      topic = "Grammatical Word Classes & Parts of Speech";
    } else if (text.includes("pressure") || text.includes("fluid")) {
      topic = targetLevel === "upper_primary" || targetLevel === "primary_foundations"
        ? "Force, Pressure & Everyday Applications"
        : "Fluid Pressure & Hydraulics";
    } else if (text.includes("acid") || text.includes("alkali") || text.includes("indicator") || (text.includes("base") && !text.includes("database"))) {
      topic = "Acids, Bases and Indicators";
    } else if (text.includes("subject verb") || text.includes("subject-verb") || text.includes("agreement") || text.includes("concord")) {
      topic = "Subject-Verb Agreement & Concord";
    } else if (text.includes("electricity") || text.includes("circuit")) {
      topic = "Basic Electricity & Simple Circuits";
    } else if (text.includes("fraction")) {
      topic = "Fractions & Proportions";
    } else if (text.includes("circle theorem")) {
      topic = "Circle Theorems & Tangents";
    } else if (text.includes("letter writing") || text.includes("formal letter")) {
      topic = "Formal Letter Writing & Rhetorical Structure";
    } else if (text.includes("homophone")) {
      topic = "Homophones, Homonyms & Vocabulary Context";
    } else if (text.includes("linear equation")) {
      topic = "Linear Equations & Balancing";
    } else if (text.includes("pythagoras") || text.includes("triangle")) {
      topic = "Pythagorean Theorem & Right Triangles";
    } else if (text.includes("photosynthesis") || text.includes("living thing")) {
      topic = "Living Things & Energy Transformations";
    } else if (!topic) {
      // Clean query to grab key noun phrases
      const cleanWords = rawPrompt
        .replace(/\b(prepare|create|generate|make|build|need|want|for|a|an|the|minute|min|minutes|lesson|plan|note|worksheet|quiz|test|revision|activity|class|learners|students|who|are|struggling|on|about|tomorrow's|ss1|ss2|ss3|jss1|jss2|jss3|primary \d)\b/gi, " ")
        .trim();
      topic = cleanWords.length > 3 ? cleanWords.split(",")[0].trim() : "Core Curriculum Foundations";
    }

    // 5. Extract Duration
    let durationMinutes = this.defaults.typicalLessonDurationMinutes;
    const durationMatch = text.match(/(\d+)\s*(minute|min)/i);
    if (durationMatch) {
      durationMinutes = parseInt(durationMatch[1], 10);
    }

    // 6. Extract Difficulty & Needs
    const isRemedial = text.includes("struggling") || text.includes("remedial") || text.includes("weaker") || text.includes("gap") || text.includes("simpler") || text.includes("scaffold");
    const isDifferentiated = text.includes("three levels") || text.includes("3 levels") || text.includes("differentiated") || text.includes("tiered") || text.includes("multi-level");
    const isAdvanced = text.includes("advanced") || text.includes("gifted") || text.includes("extension") || text.includes("olympiad") || text.includes("high performer");

    let difficulty: MaterialDifficulty = "standard";
    if (isDifferentiated) difficulty = "differentiated";
    else if (isRemedial) difficulty = "introductory";
    else if (isAdvanced) difficulty = "advanced";

    // 7. Question Count
    let questionCount = this.defaults.preferredQuestionQuantity;
    const countMatch = text.match(/(\d+)\s*(question|item|problem)/i);
    if (countMatch) {
      questionCount = parseInt(countMatch[1], 10);
    } else if (detectedType === "quiz") {
      questionCount = 5;
    } else if (detectedType === "class_test") {
      questionCount = 10;
    }

    // 8. Grounding with Curriculum Search
    const searchMatches = curriculumService.searchCurriculum(topic);
    let targetUnitId = "unit-curr-01";
    let targetSkillId = "skill-curr-01";
    if (searchMatches.length > 0) {
      targetUnitId = searchMatches[0].unit.id;
      targetSkillId = searchMatches[0].skill.id;
    }

    // 9. Minimal Clarification Check
    let missingEssentialField: "level" | "subject" | "topic" | undefined = undefined;
    let clarificationPrompt: string | undefined = undefined;

    // Only prompt clarification if user gave a super ambiguous, short input with no active class
    if (rawPrompt.trim().split(/\s+/).length <= 2 && !activeContext?.classroomId && !activeContext?.level) {
      if (text.includes("lesson") || text.includes("quiz") || text.includes("worksheet")) {
        missingEssentialField = "topic";
        clarificationPrompt = `Which topic or learning objective should I prepare this ${detectedType.replace(/_/g, " ")} for?`;
      }
    }

    return {
      rawPrompt,
      detectedType,
      targetLevel,
      targetDomain,
      targetSubjectId,
      targetSubjectName,
      targetUnitId,
      targetSkillId,
      topic,
      durationMinutes,
      difficulty,
      questionCount,
      isRemedial,
      isDifferentiated,
      targetAudienceDescription: isRemedial ? "Targeted at learners needing foundational scaffolding" : isAdvanced ? "Mastery acceleration" : "Standard classroom cohort",
      missingEssentialField,
      clarificationPrompt,
      confidenceScore: missingEssentialField ? 65 : 96
    };
  }

  // --- Curriculum-Grounded Educational Material Generation ---

  public async generateMaterial(
    request: {
      rawPrompt?: string;
      materialType?: EducationalMaterialType;
      level?: EducationalLevel;
      domain?: string;
      subjectId?: string;
      subjectName?: string;
      topic?: string;
      classroomId?: string;
      durationMinutes?: number;
      difficulty?: MaterialDifficulty;
      isRemedial?: boolean;
      isDifferentiated?: boolean;
      targetLearnerIds?: string[];
      derivedFromMaterialId?: string;
    },
    teacherId: string = "usr_tch_babatunde_ojo",
    teacherDisplayName: string = "Babatunde Ojo"
  ): Promise<TeacherEducationalMaterial> {
    const session = identityService.getActiveSession();
    const activeActor = (session.role === "TEACHER" || session.role === "ADMIN")
      ? session
      : (identityService.getIdentityById(teacherId) || SEEDED_TEACHER_USER);
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    // RBAC Authorization check
    const authDecision = authorizationService.can(activeActor, "CREATE_LESSON_PLAN", {
      resourceType: "curriculum"
    });
    if (!authDecision.granted) {
      throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Educational material synthesis denied"}`);
    }

    // Resolve classroom context
    const classrooms = teacherStudioService.getClassrooms();
    const classroom = classrooms.find((c) => c.id === request.classroomId) || classrooms[0] || {
      id: "cls-ss2-sci-a",
      name: "SS2 Science & Computing",
      gradeLevel: "senior_secondary",
      standard: "WAEC_WASSCE",
      subjectId: "subj-mth-senior"
    };

    // If rawPrompt was provided, parse it
    let parsed: ParsedTeacherPrompt;
    if (request.rawPrompt) {
      parsed = this.parsePrompt(request.rawPrompt, {
        classroomId: classroom.id,
        level: request.level || classroom.gradeLevel,
        subjectId: request.subjectId || classroom.subjectId,
        subjectName: request.subjectName,
        topic: request.topic
      });
    } else {
      parsed = {
        rawPrompt: `Generate ${request.materialType || "lesson_plan"} on ${request.topic || "Core Subject Concepts"}`,
        detectedType: request.materialType || "lesson_plan",
        targetLevel: request.level || classroom.gradeLevel,
        targetDomain: request.domain || "Mathematics",
        targetSubjectId: request.subjectId || classroom.subjectId,
        targetSubjectName: request.subjectName || "Mathematics",
        topic: request.topic || "Curriculum Foundations",
        durationMinutes: request.durationMinutes || this.defaults.typicalLessonDurationMinutes,
        difficulty: request.difficulty || "standard",
        questionCount: this.defaults.preferredQuestionQuantity,
        isRemedial: !!request.isRemedial,
        isDifferentiated: !!request.isDifferentiated,
        confidenceScore: 95
      };
    }

    // Override with explicit request parameters if provided
    const materialType = request.materialType || parsed.detectedType;
    const level = request.level || parsed.targetLevel;
    const topic = request.topic || parsed.topic;
    const domain = request.domain || parsed.targetDomain;
    const durationMinutes = request.durationMinutes || parsed.durationMinutes;
    const difficulty = request.difficulty || parsed.difficulty;
    const isRemedial = request.isRemedial !== undefined ? request.isRemedial : parsed.isRemedial;
    const isDifferentiated = request.isDifferentiated !== undefined ? request.isDifferentiated : parsed.isDifferentiated;

    // Standard map
    const standardMap: Record<EducationalLevel, CurriculumStandard> = {
      primary_foundations: "NERDC_NIGERIAN",
      upper_primary: "COMMON_ENTRANCE",
      junior_secondary: "NERDC_NIGERIAN",
      senior_secondary: "WAEC_WASSCE",
      university_prep: "JAMB_UTME",
      exam_prep: "WAEC_WASSCE"
    };
    const standard = classroom.standard || standardMap[level] || "WAEC_WASSCE";

    // Orchestrate with governed agent
    await agentOrchestrationService.orchestrateTask(
      "teacher_assistant_agent",
      `Synthesize ${materialType.replace(/_/g, " ")}: ${topic} (${domain} • ${level.replace(/_/g, " ")})`,
      {
        userId: actorId,
        userRole: activeActor.role.toLowerCase() as any,
        targetSubject: domain,
        targetLevel: level,
        additionalParameters: { classroomId: classroom.id }
      }
    );

    // Build curriculum-grounded structured payload
    const generatedPayload = this.buildCurriculumGroundedContent({
      materialType,
      level,
      domain,
      topic,
      durationMinutes,
      difficulty,
      isRemedial,
      isDifferentiated,
      standard
    });

    const materialId = `mat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMaterial: TeacherEducationalMaterial = {
      id: materialId,
      teacherId: actorId,
      teacherDisplayName: activeActor.displayName || teacherDisplayName,
      classroomId: classroom.id,
      classroomName: classroom.name,
      title: generatedPayload.title,
      materialType,
      targetLevel: level,
      curriculumStandard: standard,
      domainId: domain.toLowerCase().includes("math") ? "dom-math" : domain.toLowerCase().includes("eng") ? "dom-english" : domain.toLowerCase().includes("ict") ? "dom-ict" : "dom-stem",
      subjectId: parsed.targetSubjectId,
      subjectName: parsed.targetSubjectName,
      topic,
      unitId: generatedPayload.unitId,
      unitTitle: generatedPayload.unitTitle,
      skillId: generatedPayload.skillId,
      skillTitle: generatedPayload.skillTitle,
      durationMinutes,
      difficulty,
      isRemedial,
      isDifferentiated,
      learningObjectives: generatedPayload.learningObjectives,
      prerequisiteKnowledge: generatedPayload.prerequisiteKnowledge,
      instructionalMaterials: generatedPayload.instructionalMaterials,
      sections: generatedPayload.sections,
      questions: generatedPayload.questions,
      differentiationTiers: generatedPayload.differentiationTiers,
      remedialSupport: generatedPayload.remedialSupport,
      exitTicket: generatedPayload.exitTicket,
      markingScheme: generatedPayload.markingScheme,
      provenance: "AI_GENERATED_DRAFT",
      lifecycleStatus: "awaiting_human_approval",
      humanReviewDecision: "pending",
      linkedQRCompanionCode: generatedPayload.linkedQRCompanionCode,
      derivedFromMaterialId: request.derivedFromMaterialId,
      sourcePrompt: request.rawPrompt || `Manual creation: ${materialType} for ${topic}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: materialType,
      status: "awaiting_human_approval",
      authorName: activeActor.displayName || teacherDisplayName,
      targetAudience: level
    };

    this.materials.unshift(newMaterial);
    this.saveToStorage();

    // Audit Event
    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_GENERATED",
      actorId,
      actorRole: activeActor.role,
      actorDisplayName: activeActor.displayName || teacherDisplayName,
      resourceType: "curriculum",
      resourceId: newMaterial.id,
      classroomId: classroom.id,
      result: "SUCCESS",
      reason: `AI Teacher Copilot synthesized draft ${materialType} for '${topic}' (${level}). Human approval required before publication.`
    });

    return newMaterial;
  }

  // --- Material Transformation (Preserving Curriculum Grounding) ---

  public async transformMaterial(
    sourceMaterialId: string,
    targetType: EducationalMaterialType,
    teacherId: string = "usr_tch_babatunde_ojo"
  ): Promise<TeacherEducationalMaterial> {
    const source = this.getMaterialById(sourceMaterialId);
    if (!source) {
      throw new Error(`Source educational material '${sourceMaterialId}' not found.`);
    }

    const transformed = await this.generateMaterial(
      {
        materialType: targetType,
        level: source.targetLevel,
        domain: source.domainId.includes("math") ? "Mathematics" : source.domainId.includes("eng") ? "English Language" : source.domainId.includes("ict") ? "Computer Science / ICT" : "STEM / Science",
        subjectId: source.subjectId,
        subjectName: source.subjectName,
        topic: source.topic,
        classroomId: source.classroomId,
        durationMinutes: source.durationMinutes,
        difficulty: source.difficulty,
        derivedFromMaterialId: source.id,
        rawPrompt: `Transform ${source.materialType.replace(/_/g, " ")} on '${source.topic}' into a ${targetType.replace(/_/g, " ")}.`
      },
      teacherId,
      source.teacherDisplayName
    );

    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_TRANSFORMED",
      actorId: teacherId,
      actorRole: "TEACHER",
      actorDisplayName: source.teacherDisplayName,
      resourceType: "curriculum",
      resourceId: transformed.id,
      classroomId: source.classroomId,
      result: "SUCCESS",
      reason: `Transformed '${source.title}' from ${source.materialType} to ${targetType}. Provenance preserved.`
    });

    return transformed;
  }

  // --- One-Click Class Preparation ("Prepare My Lesson") ---

  public async prepareMyLessonPackage(
    classroomIdOrPrompt: string,
    optionalTopic?: string,
    teacherId: string = "usr_tch_babatunde_ojo"
  ): Promise<PreparedLessonPackage> {
    const classrooms = teacherStudioService.getClassrooms();
    let classroom = classrooms.find((c) => c.id === classroomIdOrPrompt);
    let topicToUse = optionalTopic;

    if (!classroom) {
      // Input is a natural language prompt or non-classroom string
      const parsed = this.parsePrompt(classroomIdOrPrompt);
      if (optionalTopic && classrooms.some((c) => c.id === optionalTopic)) {
        classroom = classrooms.find((c) => c.id === optionalTopic) || classrooms[0];
      } else {
        classroom = classrooms.find((c) => c.gradeLevel === parsed.targetLevel) || classrooms[0];
      }
      topicToUse = parsed.topic || optionalTopic;
    }

    // Determine highest-priority topic: check next best actions first
    if (!topicToUse) {
      const nextActions = teacherStudioService.getNextBestActions(classroom.id);
      if (nextActions.length > 0) {
        topicToUse = nextActions[0].title.replace("Repair Prerequisite Bottleneck: ", "").replace("Targeted Intervention: ", "");
      } else {
        topicToUse = classroom.subjectId.includes("mth") ? "Quadratic Equations & Roots" : classroom.subjectId.includes("eng") ? "Subject-Verb Agreement" : "Core Curriculum Foundations";
      }
    }

    const domain = classroom.subjectId.includes("eng")
      ? "English Language"
      : classroom.subjectId.includes("ict")
      ? "Computer Science / ICT"
      : classroom.subjectId.includes("stem")
      ? "STEM / Science"
      : "Mathematics";

    // 1. Generate Lesson Plan (5-phase)
    const lessonPlan = await this.generateMaterial({
      classroomId: classroom.id,
      materialType: "lesson_plan",
      level: classroom.gradeLevel,
      domain,
      topic: topicToUse,
      durationMinutes: 40,
      difficulty: "standard",
      rawPrompt: `Prepare a 40 minute ${classroom.name} lesson on ${topicToUse}`
    }, teacherId);

    // 2. Generate Lesson Note
    const lessonNote = await this.generateMaterial({
      classroomId: classroom.id,
      materialType: "lesson_note",
      level: classroom.gradeLevel,
      domain,
      topic: topicToUse,
      durationMinutes: 45,
      difficulty: "standard",
      derivedFromMaterialId: lessonPlan.id,
      rawPrompt: `Generate detailed teaching note for ${topicToUse}`
    }, teacherId);

    // 3. Generate Student Worksheet (Differentiated)
    const worksheet = await this.generateMaterial({
      classroomId: classroom.id,
      materialType: "worksheet",
      level: classroom.gradeLevel,
      domain,
      topic: topicToUse,
      durationMinutes: 30,
      difficulty: "differentiated",
      isDifferentiated: true,
      derivedFromMaterialId: lessonPlan.id,
      rawPrompt: `Create a differentiated 3-level student worksheet on ${topicToUse}`
    }, teacherId);

    // 4. Generate Formative Exit Ticket
    const exitTicket = await this.generateMaterial({
      classroomId: classroom.id,
      materialType: "exit_ticket",
      level: classroom.gradeLevel,
      domain,
      topic: topicToUse,
      durationMinutes: 5,
      difficulty: "standard",
      derivedFromMaterialId: lessonPlan.id,
      rawPrompt: `Create an exit ticket diagnostic check for ${topicToUse}`
    }, teacherId);

    const packageRecord: PreparedLessonPackage = {
      id: `pkg-${Date.now()}`,
      title: `Complete Teaching Package: ${topicToUse}`,
      topic: topicToUse,
      classroomId: classroom.id,
      generatedAt: new Date().toISOString(),
      lessonPlan,
      lessonNote,
      worksheet,
      exitTicket,
      materials: [lessonPlan, lessonNote, worksheet, exitTicket]
    };

    auditService.recordEvent({
      eventType: "TEACHER_LESSON_PACKAGE_PREPARED",
      actorId: teacherId,
      actorRole: "TEACHER",
      actorDisplayName: "Babatunde Ojo",
      resourceType: "curriculum",
      resourceId: packageRecord.id,
      classroomId: classroom.id,
      result: "SUCCESS",
      reason: `Synthesized one-click teaching package (Plan, Notes, Worksheet, Exit Ticket) for '${topicToUse}'.`
    });

    return packageRecord;
  }

  public prepareSynchronizedLessonPackage(
    optionsOrPrompt: string | { subject?: string; topic?: string; level?: EducationalLevel; durationMinutes?: number; cohortId?: string; specialInstructions?: string },
    optionalTopic?: string,
    teacherId?: string
  ): Promise<PreparedLessonPackage> {
    if (typeof optionsOrPrompt === "object") {
      const topic = optionsOrPrompt.topic || optionalTopic;
      const target = optionsOrPrompt.cohortId || optionsOrPrompt.specialInstructions || topic || "Mathematics";
      return this.prepareMyLessonPackage(target, topic, teacherId);
    }
    return this.prepareMyLessonPackage(optionsOrPrompt, optionalTopic, teacherId);
  }

  public getMaterials(): TeacherEducationalMaterial[] {
    return this.getAllMaterials();
  }

  // --- Human Review, Editing, Certification & Governance ---

  public approveMaterial(
    materialId: string,
    reviewerId: string = "usr_tch_babatunde_ojo",
    reviewerName: string = "Babatunde Ojo",
    notes: string = "Reviewed for curriculum rigor, mathematical validity, and pedagogical pacing."
  ): TeacherEducationalMaterial {
    const item = this.materials.find((m) => m.id === materialId);
    if (!item) {
      throw new Error(`Material '${materialId}' not found.`);
    }

    item.provenance = "TEACHER_APPROVED";
    item.lifecycleStatus = "approved";
    item.humanReviewDecision = "approved";
    item.reviewedBy = reviewerName;
    item.reviewedAt = new Date().toISOString();
    item.reviewerNotes = notes;
    item.authorSignature = `${reviewerName} (Certified Subject Teacher)`;
    item.updatedAt = new Date().toISOString();

    this.saveToStorage();

    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_APPROVED",
      actorId: reviewerId,
      actorRole: "TEACHER",
      actorDisplayName: reviewerName,
      resourceType: "curriculum",
      resourceId: item.id,
      classroomId: item.classroomId,
      result: "SUCCESS",
      reason: `Material '${item.title}' formally certified and approved by human educator.`
    });

    return item;
  }

  public updateMaterial(
    materialId: string,
    updates: Partial<TeacherEducationalMaterial>,
    editorId: string = "usr_tch_babatunde_ojo",
    editorName: string = "Babatunde Ojo"
  ): TeacherEducationalMaterial {
    const item = this.materials.find((m) => m.id === materialId);
    if (!item) {
      throw new Error(`Material '${materialId}' not found.`);
    }

    Object.assign(item, updates);
    item.provenance = "TEACHER_EDITED_DRAFT";
    item.updatedAt = new Date().toISOString();

    this.saveToStorage();

    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_EDITED",
      actorId: editorId,
      actorRole: "TEACHER",
      actorDisplayName: editorName,
      resourceType: "curriculum",
      resourceId: item.id,
      classroomId: item.classroomId,
      result: "SUCCESS",
      reason: `Material '${item.title}' edited by educator. Marked as TEACHER_EDITED_DRAFT.`
    });

    return item;
  }

  public duplicateMaterial(
    materialId: string,
    targetClassroomId?: string,
    editorId: string = "usr_tch_babatunde_ojo"
  ): TeacherEducationalMaterial {
    const source = this.materials.find((m) => m.id === materialId);
    if (!source) {
      throw new Error(`Material '${materialId}' not found.`);
    }

    const classrooms = teacherStudioService.getClassrooms();
    const targetClass = classrooms.find((c) => c.id === targetClassroomId) || classrooms.find((c) => c.id === source.classroomId) || classrooms[0];

    const copy: TeacherEducationalMaterial = {
      ...JSON.parse(JSON.stringify(source)),
      id: `mat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      classroomId: targetClass.id,
      classroomName: targetClass.name,
      title: `${source.title} (Copy for ${targetClass.name})`,
      provenance: "TEACHER_EDITED_DRAFT",
      lifecycleStatus: "draft",
      humanReviewDecision: "pending",
      reviewedBy: undefined,
      reviewedAt: undefined,
      derivedFromMaterialId: source.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.materials.unshift(copy);
    this.saveToStorage();

    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_DUPLICATED",
      actorId: editorId,
      actorRole: "TEACHER",
      actorDisplayName: source.teacherDisplayName,
      resourceType: "curriculum",
      resourceId: copy.id,
      classroomId: copy.classroomId,
      result: "SUCCESS",
      reason: `Duplicated material '${source.title}' for classroom '${targetClass.name}'.`
    });

    return copy;
  }

  public deleteMaterial(materialId: string, actorId: string = "usr_tch_babatunde_ojo"): boolean {
    const index = this.materials.findIndex((m) => m.id === materialId);
    if (index === -1) return false;

    const removed = this.materials.splice(index, 1)[0];
    this.saveToStorage();

    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_DELETED",
      actorId,
      actorRole: "TEACHER",
      actorDisplayName: "Babatunde Ojo",
      resourceType: "curriculum",
      resourceId: removed.id,
      classroomId: removed.classroomId,
      result: "SUCCESS",
      reason: `Deleted educational material '${removed.title}'.`
    });

    return true;
  }

  public dispatchMaterialAsAssignment(
    materialId: string,
    classroomId: string,
    targetLearnerIds?: string[],
    dueDateDays: number = 7
  ) {
    const material = this.getMaterialById(materialId);
    if (!material) {
      throw new Error(`Material '${materialId}' not found.`);
    }

    const dueDate = new Date(Date.now() + dueDateDays * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const asg = teacherStudioService.createAssignment({
      classroomId,
      title: material.title,
      description: `Complete the ${material.materialType.replace(/_/g, " ")} on '${material.topic}'. Focus on step-by-step reasoning.`,
      unitId: material.unitId,
      skillId: material.skillId,
      assignmentType: material.materialType === "quiz" || material.materialType === "class_test"
        ? "exam_prep"
        : material.isRemedial
        ? "guided_remediation"
        : "practice",
      dueDate,
      targetLearnerIds: targetLearnerIds || [],
      differentiationConfig: material.differentiationTiers && material.differentiationTiers.length > 0
        ? {
            adaptiveDifficulty: true,
            prerequisiteWarmupEnabled: true,
            hintScaffoldingIntensity: "standard" as const
          }
        : undefined
    });

    material.lifecycleStatus = "published";
    material.provenance = "PUBLISHED";
    material.updatedAt = new Date().toISOString();
    this.saveToStorage();

    auditService.recordEvent({
      eventType: "TEACHER_MATERIAL_DISPATCHED",
      actorId: material.teacherId,
      actorRole: "TEACHER",
      actorDisplayName: material.teacherDisplayName,
      resourceType: "assignment",
      resourceId: asg.id,
      classroomId,
      result: "SUCCESS",
      reason: `Dispatched approved material '${material.title}' as live assignment to cohort.`
    });

    return asg;
  }

  // --- Getters & Queries ---

  public getAllMaterials(): TeacherEducationalMaterial[] {
    return this.materials;
  }

  public getMaterialsByClassroom(classroomId: string): TeacherEducationalMaterial[] {
    return this.materials.filter((m) => m.classroomId === classroomId);
  }

  public getMaterialsByType(type: EducationalMaterialType): TeacherEducationalMaterial[] {
    return this.materials.filter((m) => m.materialType === type);
  }

  public getMaterialById(id: string): TeacherEducationalMaterial | undefined {
    return this.materials.find((m) => m.id === id);
  }

  public getDefaults(): TeacherCopilotDefaults {
    return this.defaults;
  }

  public setDefaults(newDefaults: Partial<TeacherCopilotDefaults>): void {
    this.defaults = { ...this.defaults, ...newDefaults };
    try {
      localStorage.setItem(DEFAULTS_STORAGE_KEY, JSON.stringify(this.defaults));
    } catch {
      // safe fallback
    }
  }

  // --- Internal Content Synthesis Engine ---

  private buildCurriculumGroundedContent(params: {
    materialType: EducationalMaterialType;
    level: EducationalLevel;
    domain: string;
    topic: string;
    durationMinutes: number;
    difficulty: MaterialDifficulty;
    isRemedial: boolean;
    isDifferentiated: boolean;
    standard: CurriculumStandard;
  }) {
    const isICT = params.domain.toLowerCase().includes("ict") || params.domain.toLowerCase().includes("computer") || params.topic.toLowerCase().includes("database") || params.topic.toLowerCase().includes("normalization");
    const isEnglish = !isICT && (params.domain.toLowerCase().includes("english") || params.topic.toLowerCase().includes("verb") || params.topic.toLowerCase().includes("speech") || params.topic.toLowerCase().includes("word class") || params.topic.toLowerCase().includes("letter"));
    const isSTEM = !isICT && !isEnglish && (params.domain.toLowerCase().includes("stem") || params.domain.toLowerCase().includes("science") || params.topic.toLowerCase().includes("electricity") || params.topic.toLowerCase().includes("circuit") || params.topic.toLowerCase().includes("pressure") || params.topic.toLowerCase().includes("force"));
    const isMath = !isEnglish && !isSTEM && !isICT;

    const isPartsOfSpeech = isEnglish && (params.topic.toLowerCase().includes("speech") || params.topic.toLowerCase().includes("word class") || params.topic.toLowerCase().includes("noun"));
    const isPressure = isSTEM && (params.topic.toLowerCase().includes("pressure") || params.topic.toLowerCase().includes("force") || params.topic.toLowerCase().includes("fluid"));

    // Unit & Skill Resolution
    let unitId = "unit-curr-01";
    let unitTitle = "Advanced Curriculum Unit";
    let skillId = "skill-curr-01";
    let skillTitle = "Core Theoretical & Practical Mastery";
    let qrCompanion = "CEMM-CH03-SEC02-EX04";

    if (isMath) {
      unitId = "unit-sss-quadratics";
      unitTitle = "Quadratic Equations & Polynomial Analysis";
      skillId = "skill-quad-factoring";
      skillTitle = "Factorization & Roots of Quadratics";
      qrCompanion = "MTH-SS1-QUAD-04";
    } else if (isPartsOfSpeech) {
      unitId = "unit-eng-parts-of-speech";
      unitTitle = "Grammatical Word Classes & Morphological Functions";
      skillId = "skill-eng-word-classes";
      skillTitle = "Word Classes, Pronoun Cases & Syntactic Functions";
      qrCompanion = "ENG-JSS2-POS-01";
    } else if (isEnglish) {
      unitId = "unit-eng-concord-syntax";
      unitTitle = "Grammatical Concord & Syntactic Structures";
      skillId = "skill-eng-concord";
      skillTitle = "Subject-Verb Agreement with Intervening Phrases";
      qrCompanion = "ENG-JSS2-CONC-02";
    } else if (isPressure) {
      unitId = "unit-pri-upper-stem-matter";
      unitTitle = "States of Matter, Mixtures & Simple Machines";
      skillId = "skill-up-matter-machines";
      skillTitle = "Pressure, Force, Area & Mechanical Advantage";
      qrCompanion = "SCI-UP-PRESS-01";
    } else if (isSTEM) {
      unitId = "unit-stem-pri6-02";
      unitTitle = "Basic Electricity, Energy & Electric Circuits";
      skillId = "skill-stem-circuits-01";
      skillTitle = "Series vs. Parallel Circuits and Energy Flow";
      qrCompanion = "SCI-PRI6-CIRC-01";
    } else if (isICT) {
      unitId = "unit-cs-relational-databases-sql";
      unitTitle = "Relational Databases, Normalization & SQL Queries";
      skillId = "skill-cs-sql-ddl-dml-normalization";
      skillTitle = "Functional Dependency, 1NF, 2NF, and 3NF Decomposition";
      qrCompanion = "ICT-SS2-NORM-03";
    }

    // Pedagogical Objectives
    const learningObjectives: string[] = isMath
      ? [
          "State the canonical form of a quadratic equation ax² + bx + c = 0 and derive the general root formula.",
          "Calculate the discriminant Δ = b² - 4ac and classify roots (two distinct real roots, equal real roots, or complex roots).",
          "Solve quadratic equations with non-integer coefficients without sign transposition errors."
        ]
      : isPartsOfSpeech
      ? [
          "Identify and classify the eight parts of speech (noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection) by their syntactic job.",
          "Distinguish words that look identical but function as different parts of speech depending on sentence context (e.g., 'water' as noun vs verb; 'fast' as adjective vs adverb).",
          "Correct common usage errors by replacing misused word classes in scaffolded sentence strips."
        ]
      : isEnglish
      ? [
          "Identify singular and plural subjects when separated from verbs by intervening prepositional phrases.",
          "Apply grammatical concord rules to compound subjects joined by 'and', 'or', and 'neither/nor'.",
          "Detect and correct subject-verb disagreement in authentic written passages."
        ]
      : isPressure
      ? [
          "Define pressure as force (push) exerted over an area (Pressure = Force / Area) in accessible elementary terms.",
          "Demonstrate through simple classroom activities why small contact areas produce high pressure (sharp points) and large contact areas distribute push (broad feet/tracks).",
          "Explain liquid pressure: water exerts pressure in all directions and pressure increases with depth."
        ]
      : isSTEM
      ? [
          "Construct a functional closed electric circuit identifying source, conductor, load, and switch.",
          "Differentiate between series and parallel circuits regarding current division and bulb brightness.",
          "Explain electrical safety precautions avoiding short circuits and circuit overloads."
        ]
      : [
          "Explain the anomalies of unnormalized data tables (insertion, deletion, and update anomalies).",
          "Transform tables into First Normal Form (1NF) by eliminating repeating groups and ensuring atomic column values.",
          "Progress tables into Second Normal Form (2NF) by eliminating partial dependencies, and Third Normal Form (3NF) by removing transitive dependencies."
        ];

    // Prerequisites
    const prerequisiteKnowledge: string[] = isMath
      ? ["Linear algebraic manipulation", "Operations on signed integers", "Square root properties of positive numbers"]
      : isPartsOfSpeech
      ? ["Basic vocabulary recognition", "Understanding that sentences express complete thoughts", "Capitalization and punctuation conventions"]
      : isEnglish
      ? ["Parts of speech (nouns, pronouns, verbs)", "Singular vs. plural noun inflections", "Basic sentence clauses"]
      : isPressure
      ? ["Concepts of push and pull (force)", "Surface area (wide vs narrow)", "States of matter (solids, liquids, gases)"]
      : isSTEM
      ? ["Forms of energy (light, heat, chemical)", "Conductors vs. insulators", "Battery terminals (positive and negative)"]
      : ["Relational database fundamentals (entities, records, fields)", "Candidate keys and primary keys", "Basic SQL SELECT queries"];

    // Instructional Materials
    const instructionalMaterials: string[] = isMath
      ? ["Graph paper", "Scientific calculators", "Formula Codex interactive discriminant widget", "Whiteboard grid"]
      : isPartsOfSpeech
      ? ["Color-coded sentence strips (blue=nouns, red=verbs, green=adjectives)", "Word-class role cards", "Highlighter pens", "Visual sentence anchor chart"]
      : isEnglish
      ? ["Color-coded subject/verb sentence strips", "Sample essay excerpts with planted concord traps", "Concord rulebook"]
      : isPressure
      ? ["Clear plastic bottles with pinholes at three depths", "Masking tape and water basin", "Plastic rulers and cups", "Modelling clay or foam blocks", "Flat pencil erasers and sharpened pencil points"]
      : isSTEM
      ? ["1.5V D-cell batteries & holders", "Flashlight bulbs & sockets", "Insulated copper jumper wires with alligator clips", "Knife switches"]
      : ["ER Diagram schema charts", "Unnormalized hospital/school registration tables", "Live SQLite database sandbox"];

    // Structured Instructional Sections
    const sections: StructuredInstructionalSection[] = [];

    if (params.materialType === "lesson_plan") {
      sections.push(
        {
          id: "sec-01",
          heading: "Phase 1: Hook & Cognitive Warmup",
          subheading: "Activating Prior Knowledge (8 Mins)",
          durationMinutes: 8,
          content: isMath
            ? "Present a parabolic trajectory problem: 'A ball is kicked upwards. At what two times does it hit a height of 5 meters?' Guide students to recognize that the equation has two simultaneous roots."
            : isPartsOfSpeech
            ? "The Secret Identity of Words: Write on the board: 'I like to dance' and 'The dance was thrilling'. Ask: 'Is dance an action or a thing?' Guide learners to discover that a word's part of speech depends on the job it performs in the sentence."
            : isEnglish
            ? "Write on the board: 'The bouquet of yellow roses (smell / smells) heavenly.' Ask learners to vote and explain why their eye is tricked by 'roses'."
            : isPressure
            ? "The Mystery of the Camel's Foot: Present the challenge: 'A heavy 500kg camel walks effortlessly across soft desert sand without sinking, but a light person in sharp high heels sinks right in. Why?'"
            : isSTEM
            ? "Demonstrate two flashlights: one goes dim when one bulb is unscrewed (series), while the other stays lit (parallel). Challenge learners: 'Why do home lights never turn off when one bulb burns out?'"
            : "Display a single student registration spreadsheet cell with three phone numbers crammed into one column. Ask: 'How can our code send an SMS to just the second number?'",
          teacherGuidance: "Do not reveal the formal rule immediately; let learners articulate the cognitive conflict.",
          studentActivity: "Pair-share hypothesis with peer and record initial prediction in concept notebook.",
          commonMisconceptions: [
            {
              misconception: isMath ? "Assuming every quadratic must equal zero naturally without transposition" : isPartsOfSpeech ? "Assuming words have only one permanent part of speech regardless of sentence context" : isEnglish ? "Matching verb number to the closest noun rather than the head subject" : isPressure ? "Believing that weight alone determines whether an object sinks or cuts" : isSTEM ? "Believing electric current gets 'used up' along the wire" : "Treating multi-valued comma strings as valid atomic database columns",
              whyStudentsStumble: "Surface-level heuristic shortcuts overrule formal structural analysis.",
              correctionTip: isPartsOfSpeech ? "Apply the 'Sentence Job Test': look at what the word does right here." : isPressure ? "Remind students that force spread over a large surface area creates low pressure." : "Explicitly isolate head noun, or verify Kirchhoff's conservation rule."
            }
          ]
        },
        {
          id: "sec-02",
          heading: "Phase 2: Explicit Conceptual Exposition & Direct Instruction",
          subheading: "First-Principles Derivation & Rules (14 Mins)",
          durationMinutes: 14,
          content: isMath
            ? "Derive the quadratic formula by completing the square on ax² + bx + c = 0. Highlight the division by 2a and the sign switch on (-b). Define the discriminant Δ = b² - 4ac."
            : isPartsOfSpeech
            ? "Introduce the 8 parts of speech with student-friendly functional anchors: Noun (Naming things), Pronoun (Stand-in), Verb (Action/State), Adjective (Describing nouns), Adverb (Modifying verbs/how-when-where), Preposition (Position/Relationship), Conjunction (Bridge), Interjection (Emotion). Teach the 3-step 'Sentence Job Test' to identify words in context."
            : isEnglish
            ? "Introduce the Golden Concord Principle: Singular subjects require singular verbs (with -s in present tense); plural subjects require plural verbs. Teach the 'Intervening Prepositional Phrase Shield': Ignore 'of...', 'with...', 'along with...' when finding the true subject."
            : isPressure
            ? "Define Pressure = Force / Area (P = F / A). Demonstrate that when contact area is small, pressure is high (sharp knife edge, injection needle, nail point). When contact area is large, pressure is low (snowshoes, broad tires, flat camel feet). Introduce liquid pressure: water exerts pressure in all directions and increases with depth."
            : isSTEM
            ? "Draw circuit schematics using standardized engineering symbols (battery, lamp, wire, switch). Explain Ohm's law V = I × R and how series circuits share voltage (V_total = V1 + V2) while parallel circuits maintain full supply voltage across each branch."
            : "Define Functional Dependency X -> Y. Demonstrate 1NF (all attributes atomic, primary key identified). Walk through 2NF (remove partial dependencies on composite keys into separate relation). Explain 3NF (every non-key attribute must depend on nothing but the key: 'The key, the whole key, and nothing but the key').",
          teacherGuidance: "Model clean board notation with explicit annotations for intermediate steps.",
          studentActivity: "Transcribe derivations and highlight red-flag conditions in personal notebooks.",
          workedExamples: isMath
            ? [
                {
                  title: "Exemplar 1: Solving 2x² - 5x - 3 = 0",
                  problem: "Solve 2x² - 5x - 3 = 0 using the quadratic formula.",
                  stepByStepSolution: [
                    "Identify coefficients: a = 2, b = -5, c = -3.",
                    "Substitute into formula: x = [-(-5) ± √((-5)² - 4(2)(-3))] / [2(2)].",
                    "Carefully compute discriminant: (-5)² = 25; -4(2)(-3) = +24; Δ = 25 + 24 = 49.",
                    "Simplify roots: x = [5 ± √49] / 4 = [5 ± 7] / 4.",
                    "Calculate both branches: x₁ = (5 + 7)/4 = 12/4 = 3; x₂ = (5 - 7)/4 = -2/4 = -0.5."
                  ],
                  explanation: "The positive discriminant 49 indicates two distinct rational roots.",
                  keyPrinciple: "Remember: -(-b) turns negative numbers positive.",
                  examinerTip: "Always write down the substituted formula before doing arithmetic to secure WAEC method marks."
                }
              ]
            : isPartsOfSpeech
            ? [
                {
                  title: "Exemplar 1: Classifying Word Classes in Context",
                  problem: "Identify the part of speech of each word in: 'The playful kitten purred softly under the wooden chair.'",
                  stepByStepSolution: [
                    "kitten, chair = Nouns (names of an animal and an object).",
                    "purred = Verb (the action performed by the kitten).",
                    "playful, wooden = Adjectives (describing what kind of kitten and chair).",
                    "softly = Adverb (describing how the kitten purred).",
                    "under = Preposition (showing position of the kitten relative to the chair).",
                    "The = Definite Article / Determiner."
                  ],
                  explanation: "Words take their part of speech from their syntactic function in the sentence.",
                  keyPrinciple: "Ask: 'What job is this word doing in this sentence?'",
                  examinerTip: "Watch out for words that look identical but have different functions (e.g., 'water' as noun vs verb)."
                }
              ]
            : isEnglish
            ? [
                {
                  title: "Exemplar 1: Intervening Prepositional Phrase",
                  problem: "The captain of the three soccer teams (is / are) arriving today.",
                  stepByStepSolution: [
                    "Identify candidate nouns: 'captain' (singular) and 'teams' (plural).",
                    "Locate prepositional phrase: 'of the three soccer teams'. Shield or cross it out.",
                    "Isolate true head subject: 'The captain' (singular, 3rd person).",
                    "Select matching singular verb: 'is arriving'."
                  ],
                  explanation: "The verb agrees with the head noun 'captain', not with the object of the preposition 'teams'.",
                  keyPrinciple: "Prepositional modifiers never govern verb agreement.",
                  examinerTip: "WAEC examiners intentionally insert plural nouns inside prepositional phrases to mislead candidates."
                }
              ]
            : isPressure
            ? [
                {
                  title: "Exemplar 1: Comparing Flat vs Narrow Brick Pressure",
                  problem: "A brick weighing 20N rests on a table. On its broad face of area 0.1m², calculate the pressure. When turned onto its narrow end of area 0.02m², calculate the pressure.",
                  stepByStepSolution: [
                    "State the fundamental formula: Pressure = Force / Area (P = F / A).",
                    "Broad face calculation: P = 20 N / 0.1 m² = 200 N/m².",
                    "Narrow end calculation: P = 20 N / 0.02 m² = 1,000 N/m².",
                    "Compare results: The exact same weight produces 5 times greater pressure on the smaller contact area!"
                  ],
                  explanation: "Reducing the contact area dramatically intensifies the pressure exerted by a constant force.",
                  keyPrinciple: "Pressure is inversely proportional to contact area for a constant force.",
                  examinerTip: "Always check units: Force in Newtons (N), Area in square meters (m²), Pressure in N/m² (Pascals)."
                }
              ]
            : isSTEM
            ? [
                {
                  title: "Exemplar 1: Calculating Current in Series Circuit",
                  problem: "Two identical 3Ω lightbulbs are connected in series to a 6V battery. Calculate the circuit current.",
                  stepByStepSolution: [
                    "Calculate total series resistance: R_total = R1 + R2 = 3Ω + 3Ω = 6Ω.",
                    "State Ohm's Law: I = V / R_total.",
                    "Substitute values: I = 6V / 6Ω = 1.0 Ampere (A).",
                    "Voltage drop across each bulb: V_bulb = I × R = 1.0A × 3Ω = 3V each."
                  ],
                  explanation: "Because current is identical everywhere in a series loop, each bulb drops half the battery potential.",
                  keyPrinciple: "Series resistances add directly; total voltage is shared.",
                  examinerTip: "Always append correct SI units (Amperes, Volts, Ohms)."
                }
              ]
            : [
                {
                  title: "Exemplar 1: Eliminating Partial Dependency (1NF to 2NF)",
                  problem: "Table ORDER_ITEMS (OrderID, ItemID, ItemName, Quantity, UnitPrice). Composite Key: (OrderID, ItemID).",
                  stepByStepSolution: [
                    "Analyze dependencies: Quantity depends on BOTH (OrderID, ItemID).",
                    "Analyze ItemName and UnitPrice: They depend ONLY on ItemID, not on OrderID.",
                    "Identify violation: Partial dependency detected! (ItemID -> ItemName, UnitPrice).",
                    "Decompose into 2NF: Table 1: ORDER_ITEMS (OrderID, ItemID, Quantity); Table 2: ITEMS (ItemID, ItemName, UnitPrice)."
                  ],
                  explanation: "By isolating ItemName into an ITEMS relation, item names are not redundantly duplicated across multiple orders.",
                  keyPrinciple: "In 2NF, no non-key attribute can depend on a subset of a composite primary key.",
                  examinerTip: "On university & UTME CBT exams, verify whether the primary key is single or composite first."
                }
              ]
        },
        {
          id: "sec-03",
          heading: "Phase 3: Guided Socratic Practice & Collaborative Task",
          subheading: "Structured Problem Sets (12 Mins)",
          durationMinutes: 12,
          content: "Students work in collaborative pairs on scaffolded problem sets with graduated hint ladders. Teacher circulates to detect misconception triggers.",
          teacherGuidance: "Target learners displaying hesitation. Ask probing questions: 'Which term is our head subject?' or 'What is our discriminant telling us?'",
          studentActivity: "Complete 2 scaffolded exercises with partner verification."
        },
        {
          id: "sec-04",
          heading: "Phase 4: Formative Exit Check & Plenary Synthesis",
          subheading: "Individual Diagnostic Check (6 Mins)",
          durationMinutes: 6,
          content: "Distribute individual 1-question exit ticket to verify whether each student has mastered the core threshold concept before dismissal.",
          teacherGuidance: "Collect without grading immediately; sort into three piles: Mastered, Minor Arithmetic Slips, and Conceptual Remediation Needed.",
          studentActivity: "Independently solve the exit ticket on a designated slip."
        }
      );
    } else {
      // Teaching Note / Study Guide / Revision Material
      sections.push(
        {
          id: "sec-note-01",
          heading: "1. Syllabus Standard & Big-Picture Context",
          subheading: "Why this topic matters in the curriculum",
          durationMinutes: 10,
          content: `This instructional module aligns with official ${params.standard} benchmarks. It prepares learners for both standard classroom assessments and external terminal examinations.`,
          teacherGuidance: "Connect theoretical formulations to real-world applications and prerequisite structures."
        },
        {
          id: "sec-note-02",
          heading: "2. Formal Theoretical Foundations & Rules",
          subheading: "Core Concepts & Mathematical / Linguistic Definitions",
          durationMinutes: 20,
          content: isMath
            ? "A quadratic equation in one variable x is an equation that can be written in the standard form ax² + bx + c = 0, where a, b, c ∈ ℝ and a ≠ 0.\n\nRoots are given by x = (-b ± √(b² - 4ac)) / (2a).\n• Discriminant Δ = b² - 4ac.\n• If Δ > 0: Two distinct real roots.\n• If Δ = 0: Exactly one real root (repeated/coincident roots).\n• If Δ < 0: No real roots (two complex conjugate roots)."
            : isEnglish
            ? "Concord refers to the grammatical agreement between words in gender, number, case, or person.\n\nKey Rule 1: A subject joined by 'and' takes a plural verb (e.g., 'Kemi and Chidi are here'), UNLESS they refer to a single composite idea (e.g., 'Bread and butter is my usual breakfast').\nKey Rule 2: When subjects are joined by 'neither... nor' or 'either... or', the verb agrees with the closer subject (Proximity Rule).\nKey Rule 3: Indefinite pronouns like 'each', 'everybody', 'neither', and 'either' are grammatically singular."
            : isSTEM
            ? "An electric circuit is a continuous conducting path through which electric charges circulate.\n• Current (I): Rate of charge flow, measured in Amperes (A).\n• Potential Difference / Voltage (V): Energy transferred per unit charge, measured in Volts (V).\n• Resistance (R): Opposition to charge flow, measured in Ohms (Ω).\n• Ohm's Law: V = I × R.\n• Series Circuit: One single path; identical current; total resistance R = R1 + R2 + ...\n• Parallel Circuit: Multiple branching paths; identical voltage across branches; 1/R_total = 1/R1 + 1/R2 + ..."
            : "Database Normalization is the systematic process of structuring a relational database to minimize redundancy and eliminate anomalies.\n• Insertion Anomaly: Inability to record certain facts without adding unrelated dummy records.\n• Deletion Anomaly: Unintended loss of essential data when deleting a record.\n• Update Anomaly: Inconsistent data resulting from partial updates across redundant copies.\n• 1NF: Atomic values; unique rows; primary key defined.\n• 2NF: In 1NF and no partial key dependencies.\n• 3NF: In 2NF and no transitive functional dependencies (non-key attribute determining non-key attribute).",
          keyPrinciples: isMath
            ? ["Standard form must be achieved before extracting a, b, c", "b² is ALWAYS positive regardless of whether b is positive or negative", "Divide the ENTIRE numerator by 2a, not just the square root"]
            : isEnglish
            ? ["Ignore prepositional phrases between subject and verb", "Indefinite pronouns ending in -one, -body, -thing are singular", "Correlative conjunctions follow the proximity rule"]
            : isSTEM
            ? ["Current is conserved at every junction (Kirchhoff's Current Law)", "Parallel branches reduce total equivalent resistance", "Never connect battery terminals directly with wire (short circuit hazard)"]
            : ["All attributes must be atomic (1NF)", "Non-prime attributes must depend on the whole primary key (2NF)", "No transitive dependencies between non-key fields (3NF)"]
        },
        {
          id: "sec-note-03",
          heading: "3. Fully Worked Pedagogical Exemplars",
          subheading: "Step-by-step reasoning with intermediate lines",
          durationMinutes: 15,
          content: "The following graduated worked examples illustrate correct solution methodology and examiner scoring rubrics.",
          workedExamples: [
            {
              title: isMath ? "Example A: Solving with Negative Coefficients" : isEnglish ? "Example A: Collective Nouns & Concord" : isSTEM ? "Example A: Parallel Resistor Equivalent" : "Example A: Decomposing to 3NF",
              problem: isMath ? "Solve 3x² - 2x - 8 = 0." : isEnglish ? "The committee (has / have) submitted its annual report." : isSTEM ? "Two resistors of 6Ω and 3Ω are in parallel across a 12V battery. Find total current." : "Given STUDENT (StudentID, Name, DepartmentID, DepartmentBuilding), normalize to 3NF.",
              stepByStepSolution: isMath
                ? [
                    "Coefficients: a = 3, b = -2, c = -8.",
                    "x = [-(-2) ± √((-2)² - 4(3)(-8))] / [2(3)].",
                    "x = [2 ± √(4 + 96)] / 6 = [2 ± √100] / 6.",
                    "x = [2 ± 10] / 6.",
                    "Branch 1: x = 12/6 = 2.",
                    "Branch 2: x = -8/6 = -4/3."
                  ]
                : isEnglish
                ? [
                    "Identify subject: 'The committee'.",
                    "Determine context: Does the committee act as a single unified entity or as divided individuals?",
                    "Check pronoun clue: The sentence uses singular possessive 'its', indicating a unified body.",
                    "Therefore, use the singular verb: 'has submitted'."
                  ]
                : isSTEM
                ? [
                    "Equivalent parallel resistance: 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2.",
                    "Inverting gives R_total = 2Ω.",
                    "Ohm's Law: I_total = V / R_total = 12V / 2Ω = 6.0 Amperes.",
                    "Branch currents: I_6 = 12/6 = 2A; I_3 = 12/3 = 4A. (Notice: 2A + 4A = 6A, verifying current conservation)."
                  ]
                : [
                    "Primary key: StudentID.",
                    "Functional dependencies: StudentID -> Name, DepartmentID; DepartmentID -> DepartmentBuilding.",
                    "Notice: DepartmentBuilding depends on DepartmentID, which is NOT a candidate key (Transitive Dependency!).",
                    "Decompose into two 3NF tables:\nTable 1: STUDENTS (StudentID, Name, DepartmentID);\nTable 2: DEPARTMENTS (DepartmentID, DepartmentBuilding)."
                  ],
              explanation: "Clear, step-by-step intermediate progression.",
              keyPrinciple: "Show all working stages to secure partial credit marks."
            }
          ]
        },
        {
          id: "sec-note-04",
          heading: "4. Common Student Misconceptions & Examiner Traps",
          subheading: "Where marks are routinely lost",
          durationMinutes: 10,
          content: "Examiners intentionally construct questions to trap students who rely on rote memorization rather than structural comprehension.",
          commonMisconceptions: [
            {
              misconception: isMath ? "Writing -5² as +25 when b = -5 without parentheses in calculator, leading to syntax errors" : isEnglish ? "Assuming words ending in -s are always plural (e.g. 'news', 'mathematics', 'physics')" : isSTEM ? "Assuming current drops after passing through a resistor" : "Thinking adding foreign keys everywhere without decomposition solves redundancy",
              whyStudentsStumble: "Surface pattern matching without checking fundamental rules.",
              correctionTip: "Always enforce parenthetical evaluation and rule verification."
            }
          ]
        }
      );
    }

    // Structured Questions for Worksheets, Quizzes, Tests
    const questions: StructuredMaterialQuestion[] = [];
    if (isMath) {
      questions.push(
        {
          id: "q-mth-01",
          questionNumber: 1,
          stem: "What are the values of a, b, and c when 4 - 2x = 3x² is expressed in standard quadratic form ax² + bx + c = 0 with a > 0?",
          questionType: "multiple_choice",
          options: [
            "a = 3, b = 2, c = -4",
            "a = 3, b = -2, c = 4",
            "a = -3, b = -2, c = 4",
            "a = 3, b = -2, c = -4"
          ],
          correctIndex: 0,
          answerKey: "Option A (a = 3, b = 2, c = -4)",
          stepByStepExplanation: "Rearrange by transposing all terms to the right side: 0 = 3x² + 2x - 4. Hence, a = 3, b = 2, c = -4.",
          misconceptionTrap: "Flipping signs incorrectly during transposition across equals sign.",
          difficulty: "introductory",
          bloomTaxonomy: "comprehension",
          points: 2,
          remedialHint: "Move terms across the equals sign by applying inverse operations to both sides."
        },
        {
          id: "q-mth-02",
          questionNumber: 2,
          stem: "Calculate the discriminant Δ of the quadratic equation x² - 6x + 9 = 0 and determine the nature of its roots.",
          questionType: "multiple_choice",
          options: [
            "Δ = 0; exactly one real repeated root",
            "Δ = 72; two distinct irrational roots",
            "Δ = -18; no real roots",
            "Δ = 36; two distinct rational roots"
          ],
          correctIndex: 0,
          answerKey: "Option A (Δ = 0; exactly one real repeated root)",
          stepByStepExplanation: "Δ = b² - 4ac = (-6)² - 4(1)(9) = 36 - 36 = 0. A discriminant of zero indicates identical repeated real roots (x = 3).",
          misconceptionTrap: "Calculating (-6)² as -36 instead of +36.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 3,
          remedialHint: "Remember that squaring any negative real number yields a positive product."
        },
        {
          id: "q-mth-03",
          questionNumber: 3,
          stem: "Solve 2x² + 3x - 5 = 0 using the quadratic formula. Show all working steps.",
          questionType: "worked_solution",
          answerKey: "x = 1 or x = -2.5 (-5/2)",
          stepByStepExplanation: "x = [-3 ± √(3² - 4(2)(-5))] / [2(2)] = [-3 ± √(9 + 40)] / 4 = [-3 ± 7] / 4. x₁ = (-3 + 7)/4 = 4/4 = 1; x₂ = (-3 - 7)/4 = -10/4 = -2.5.",
          misconceptionTrap: "Writing 4ac as 4(2)(5) = 40 and subtracting it from 9 instead of adding.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 5,
          remedialHint: "Pay close attention to double negatives: -4(2)(-5) = +40."
        },
        {
          id: "q-mth-04",
          questionNumber: 4,
          stem: "For which values of k does the quadratic equation x² + kx + 16 = 0 possess two distinct real roots?",
          questionType: "worked_solution",
          answerKey: "k > 8 or k < -8 (i.e. |k| > 8)",
          stepByStepExplanation: "Two distinct real roots require Δ > 0. Here, Δ = k² - 4(1)(16) = k² - 64 > 0. Therefore, (k - 8)(k + 8) > 0, which holds when k > 8 or k < -8.",
          misconceptionTrap: "Assuming k > 8 is the only solution and forgetting the negative range k < -8.",
          difficulty: "advanced",
          bloomTaxonomy: "analysis",
          points: 5,
          remedialHint: "Test intervals on a number line after factoring the difference of squares."
        }
      );
    } else if (isPartsOfSpeech) {
      questions.push(
        {
          id: "q-pos-01",
          questionNumber: 1,
          stem: "In the sentence 'The cheetah ran swiftly across the open savannah', which word is an adverb of manner?",
          questionType: "multiple_choice",
          options: ["cheetah", "ran", "swiftly", "open"],
          correctIndex: 2,
          answerKey: "Option C (swiftly)",
          stepByStepExplanation: "'Swiftly' describes how the action was performed (modifies the verb 'ran'). Most adverbs of manner answer 'how?' and end in -ly.",
          misconceptionTrap: "Confusing 'open' (an adjective describing the savannah) with an adverb.",
          difficulty: "introductory",
          bloomTaxonomy: "recall",
          points: 2,
          remedialHint: "Ask yourself: which word tells you HOW the cheetah ran?"
        },
        {
          id: "q-pos-02",
          questionNumber: 2,
          stem: "In the sentence 'Please water the wilted plants', what part of speech is the word 'water'?",
          questionType: "multiple_choice",
          options: ["Noun", "Verb", "Adjective", "Adverb"],
          correctIndex: 1,
          answerKey: "Option B (Verb)",
          stepByStepExplanation: "Here, 'water' expresses an imperative action to be carried out on the plants. Although 'water' is commonly a noun, words change word class depending on sentence usage.",
          misconceptionTrap: "Assuming 'water' is always a noun because it names a liquid.",
          difficulty: "standard",
          bloomTaxonomy: "analysis",
          points: 3,
          remedialHint: "Look at the function: is it naming a physical liquid here, or commanding an action to be done?"
        },
        {
          id: "q-pos-03",
          questionNumber: 3,
          stem: "Identify the part of speech of each underlined word in: 'She wore a bright yellow dress to the ceremony.' Explain your reasoning.",
          questionType: "worked_solution",
          answerKey: "'bright' = Adverb (modifies 'yellow'); 'yellow' = Adjective (modifies 'dress'); 'dress' = Noun (object worn); 'to' = Preposition (shows direction).",
          stepByStepExplanation: "1. 'dress' is the naming word for the garment (Noun). 2. 'yellow' describes the dress (Adjective). 3. 'bright' modifies the color degree of yellow (Adverb). 4. 'to' links the motion to the noun ceremony (Preposition).",
          misconceptionTrap: "Classifying 'bright' as an adjective modifying 'dress' directly.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 4,
          remedialHint: "Test what 'bright' is modifying: is it a 'bright dress' or 'brightly yellow'?"
        }
      );
    } else if (isEnglish) {
      questions.push(
        {
          id: "q-eng-01",
          questionNumber: 1,
          stem: "Choose the grammatically correct verb: 'Neither the teacher nor the students ______ satisfied with the timetable.'",
          questionType: "multiple_choice",
          options: ["was", "were", "is", "be"],
          correctIndex: 1,
          answerKey: "Option B (were)",
          stepByStepExplanation: "In correlative structures using 'neither... nor', the verb agrees with the closer subject. Here, 'the students' is plural and adjacent to the verb, so plural 'were' is required.",
          misconceptionTrap: "Agreeing with the first subject 'the teacher' rather than the closer subject.",
          difficulty: "introductory",
          bloomTaxonomy: "comprehension",
          points: 2,
          remedialHint: "Apply the proximity rule: look at the noun right next to the blank."
        },
        {
          id: "q-eng-02",
          questionNumber: 2,
          stem: "Select the sentence that demonstrates perfect grammatical concord:",
          questionType: "multiple_choice",
          options: [
            "A series of high-profile lectures was delivered last week.",
            "A series of high-profile lectures were delivered last week.",
            "The series of lectures are very interesting.",
            "Every one of the applicants have submitted their forms."
          ],
          correctIndex: 0,
          answerKey: "Option A ('A series of high-profile lectures was delivered last week.')",
          stepByStepExplanation: "'Series' is a singular collective noun here referring to one coordinated event; 'of high-profile lectures' is an intervening prepositional phrase.",
          misconceptionTrap: "Letting plural 'lectures' deceive the ear into selecting 'were'.",
          difficulty: "standard",
          bloomTaxonomy: "analysis",
          points: 3,
          remedialHint: "Cross out 'of high-profile lectures' to test: 'A series was delivered'."
        },
        {
          id: "q-eng-03",
          questionNumber: 3,
          stem: "Correct the concord error in this sentence: 'The list of shortlisted scholarship candidates have been published by the ministry.' Explain the rule violated.",
          questionType: "worked_solution",
          answerKey: "'The list of shortlisted scholarship candidates HAS been published...'",
          stepByStepExplanation: "The head subject is the singular noun 'list', not the plural noun 'candidates' within the prepositional modifier. A singular subject takes singular 'has'.",
          misconceptionTrap: "Treating 'candidates' as the subject because it immediately precedes the auxiliary verb.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 4,
          remedialHint: "Identify what has actually been published: the 'list' or the 'candidates'?"
        }
      );
    } else if (isPressure) {
      questions.push(
        {
          id: "q-press-01",
          questionNumber: 1,
          stem: "Why are the cutting edges of kitchen knives and scissors made very thin and sharp?",
          questionType: "multiple_choice",
          options: [
            "To reduce contact surface area and produce high cutting pressure with small force",
            "To decrease the weight and mass of the blade",
            "To make the blade shiny and rust-resistant",
            "To increase heat conduction through the blade"
          ],
          correctIndex: 0,
          answerKey: "Option A (To reduce contact surface area and produce high cutting pressure)",
          stepByStepExplanation: "Pressure = Force / Area. When the cutting edge is extremely narrow, the contact area 'A' is tiny, generating massive localized pressure that easily slices through materials.",
          misconceptionTrap: "Thinking sharp knives somehow exert more downward force on their own.",
          difficulty: "introductory",
          bloomTaxonomy: "comprehension",
          points: 2,
          remedialHint: "Remember the formula: P = F / A. What happens when area A gets very small?"
        },
        {
          id: "q-press-02",
          questionNumber: 2,
          stem: "A plastic bottle of water has three pinholes drilled at different heights: top, middle, and bottom. When tape covering the holes is removed, from which hole does water squirt the furthest horizontal distance?",
          questionType: "multiple_choice",
          options: [
            "Bottom hole, because liquid pressure increases with depth",
            "Top hole, because atmospheric air presses down on it",
            "Middle hole, because it is at the center of gravity",
            "All three holes squirt equal distance because water is incompressible"
          ],
          correctIndex: 0,
          answerKey: "Option A (Bottom hole, because liquid pressure increases with depth)",
          stepByStepExplanation: "Liquid pressure depends directly on depth (P = ρgh). The bottom hole has the greatest column of water above it, producing the highest pressure and highest exit velocity.",
          misconceptionTrap: "Assuming the top hole has highest pressure because it is closest to the open air.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 3,
          remedialHint: "Think about deep sea divers: where is water pressure felt strongest?"
        },
        {
          id: "q-press-03",
          questionNumber: 3,
          stem: "A student pushes with a downward force of 60 N on a wooden block with a base contact area of 2 m². Calculate the pressure exerted on the floor in N/m² (Pascals).",
          questionType: "worked_solution",
          answerKey: "Pressure = 30 N/m² (or 30 Pa)",
          stepByStepExplanation: "1. State the formula: Pressure = Force / Area. 2. Substitute given values: P = 60 N / 2 m². 3. Calculate: P = 30 N/m².",
          misconceptionTrap: "Multiplying force by area instead of dividing.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 4,
          remedialHint: "Use the formula triangle: Force is on top, Pressure and Area are on the bottom."
        }
      );
    } else if (isSTEM) {
      questions.push(
        {
          id: "q-stem-01",
          questionNumber: 1,
          stem: "What happens to the remaining bulbs in a simple series circuit when one bulb burns out or is removed?",
          questionType: "multiple_choice",
          options: [
            "All remaining bulbs go out immediately because the conducting loop is broken.",
            "The remaining bulbs become twice as bright.",
            "The remaining bulbs stay lit with unchanged brightness.",
            "The battery immediately explodes."
          ],
          correctIndex: 0,
          answerKey: "Option A (All remaining bulbs go out immediately)",
          stepByStepExplanation: "A series circuit consists of only one single unbroken loop. An open bulb breaks the path, halting charge flow everywhere in the circuit.",
          misconceptionTrap: "Assuming that electricity flows up to the broken bulb and keeps previous bulbs lit.",
          difficulty: "introductory",
          bloomTaxonomy: "comprehension",
          points: 2,
          remedialHint: "Think of a series circuit like a single chain; if one link snaps, the entire chain disconnects."
        },
        {
          id: "q-stem-02",
          questionNumber: 2,
          stem: "A 12V battery is connected across three identical 4Ω resistors in parallel. What is the total circuit current leaving the battery?",
          questionType: "multiple_choice",
          options: ["9.0 A", "1.0 A", "3.0 A", "4.0 A"],
          correctIndex: 0,
          answerKey: "Option A (9.0 A)",
          stepByStepExplanation: "Each parallel branch receives the full 12V. Current per branch = V/R = 12V / 4Ω = 3A. Total current = 3A + 3A + 3A = 9.0A. (Alternatively, R_total = 4/3 Ω; I = 12 / (4/3) = 9A).",
          misconceptionTrap: "Treating the parallel resistors as series and calculating 12V / 12Ω = 1.0A.",
          difficulty: "standard",
          bloomTaxonomy: "application",
          points: 3,
          remedialHint: "In parallel, each branch draws its own current independently from the voltage source."
        },
        {
          id: "q-stem-03",
          questionNumber: 3,
          stem: "Explain why household domestic appliances are wired in parallel rather than in series. State two distinct reasons.",
          questionType: "worked_solution",
          answerKey: "1. Independence of operation: turning off or unplugging one appliance does not shut down others. 2. Full voltage supply: every appliance receives the full mains 220V/240V potential.",
          stepByStepExplanation: "In parallel, each branch is independent and maintains constant mains voltage. In series, turning off one appliance opens the entire circuit, and voltage divides proportionally.",
          misconceptionTrap: "Stating that parallel circuits use less current (parallel circuits actually draw more total current).",
          difficulty: "standard",
          bloomTaxonomy: "analysis",
          points: 5,
          remedialHint: "Think about what would happen in your living room if the TV was wired in series with the refrigerator."
        }
      );
    } else {
      // ICT Questions
      questions.push(
        {
          id: "q-ict-01",
          questionNumber: 1,
          stem: "A database relation is in First Normal Form (1NF) if and only if:",
          questionType: "multiple_choice",
          options: [
            "All attribute domains contain only atomic (indivisible) values and there are no repeating groups.",
            "Every non-key attribute is non-transitively dependent on the primary key.",
            "There are no foreign keys present anywhere in the schema.",
            "The table contains no null values in any column."
          ],
          correctIndex: 0,
          answerKey: "Option A (Atomic values and no repeating groups)",
          stepByStepExplanation: "1NF enforces column atomicity (no multi-valued lists or nested tables) and requires that each row be uniquely identifiable.",
          misconceptionTrap: "Confusing 1NF requirements with 2NF or 3NF rules.",
          difficulty: "introductory",
          bloomTaxonomy: "recall",
          points: 2,
          remedialHint: "Recall what 'atom' means: indivisible, single-valued cells."
        },
        {
          id: "q-ict-02",
          questionNumber: 2,
          stem: "Given the relation ENROLLMENT (StudentID, CourseID, Grade, CourseName, InstructorOffice) with primary key (StudentID, CourseID). Which dependency violates Second Normal Form (2NF)?",
          questionType: "multiple_choice",
          options: [
            "CourseID -> CourseName (Partial key dependency)",
            "(StudentID, CourseID) -> Grade (Full functional dependency)",
            "CourseID -> InstructorOffice (Partial key dependency)",
            "Both A and C are partial dependencies violating 2NF"
          ],
          correctIndex: 3,
          answerKey: "Option D (Both A and C are partial dependencies violating 2NF)",
          stepByStepExplanation: "In 2NF, no non-key attribute may depend on only a part of a composite key. Here, CourseName and InstructorOffice depend solely on CourseID, not on StudentID.",
          misconceptionTrap: "Only noticing CourseName and missing InstructorOffice.",
          difficulty: "standard",
          bloomTaxonomy: "analysis",
          points: 3,
          remedialHint: "Check whether any attribute depends on just ONE part of the composite primary key."
        },
        {
          id: "q-ict-03",
          questionNumber: 3,
          stem: "Decompose this unnormalized relation into 1NF, 2NF, and 3NF: PATIENT_VISIT (PatientID, DoctorID, VisitDate, PatientName, DoctorName, DoctorSpecialty, Diagnosis). State primary keys for each table.",
          questionType: "worked_solution",
          answerKey: "PATIENTS (PatientID, PatientName); DOCTORS (DoctorID, DoctorName, DoctorSpecialty); VISITS (PatientID, DoctorID, VisitDate, Diagnosis).",
          stepByStepExplanation: "1. 2NF removes partial dependencies: PatientName depends only on PatientID; DoctorName and Specialty depend only on DoctorID. 2. 3NF checks for transitive dependencies. 3. Resulting schema preserves all functional dependencies without update anomalies.",
          misconceptionTrap: "Leaving DoctorSpecialty inside the VISITS table.",
          difficulty: "advanced",
          bloomTaxonomy: "evaluation",
          points: 5,
          remedialHint: "Separate the entities: Patient entity, Doctor entity, and the Visit relationship."
        }
      );
    }

    // Differentiation Tiers
    let differentiationTiers: StructuredDifferentiationTier[] | undefined = undefined;
    if (params.isDifferentiated || params.materialType === "worksheet" || params.materialType === "lesson_plan") {
      differentiationTiers = [
        {
          tier: "foundation",
          label: "Tier 1: Foundational Scaffolding (Targeting Retrieval & Basics)",
          targetAudience: "Learners needing structured support and formula step-by-step guidance",
          guidance: "Provide worked exemplars with step-by-step hint ladders. Highlight formula substitutions in bold.",
          questions: questions.slice(0, 2).map((q, idx) => ({
            ...q,
            id: `tier-found-${idx + 1}`,
            difficulty: "introductory" as const,
            remedialHint: q.remedialHint || "Refer to the formula card above."
          }))
        },
        {
          tier: "core",
          label: "Tier 2: Core Syllabus Standard (WAEC / BECE Standard)",
          targetAudience: "Grade-level cohort mastering independent multi-step problems",
          guidance: "Students complete full algebraic transformations without explicit hints.",
          questions: questions.slice(1, 3).map((q, idx) => ({
            ...q,
            id: `tier-core-${idx + 1}`,
            difficulty: "standard" as const
          }))
        },
        {
          tier: "extension",
          label: "Tier 3: Advanced Challenge & Optimization",
          targetAudience: "High mastery learners (>85%) ready for Olympiad / UTME CBT speed drills",
          guidance: "Non-routine problems with parameters, variable coefficients, or cross-topic synthesis.",
          questions: questions.slice(2, 4).map((q, idx) => ({
            ...q,
            id: `tier-ext-${idx + 1}`,
            difficulty: "advanced" as const
          }))
        }
      ];
    }

    // Remedial Support Structure
    const remedialSupport = {
      targetGaps: isMath
        ? ["Sign flips during negative substitution in x = (-b ± √Δ)/2a", "Incorrect fraction transposition across equals sign"]
        : isPartsOfSpeech
        ? ["Confusing nouns and verbs for words with identical spelling like 'run/water/walk'", "Misidentifying adverbs that do not end in -ly", "Confusing adjectives (describing nouns) with adverbs (describing verbs)"]
        : isEnglish
        ? ["Distraction by intervening prepositional phrases", "Failure to detect plural head subjects"]
        : isPressure
        ? ["Confusing total force with pressure (forgetting area matters)", "Thinking water pressure depends on container width rather than depth"]
        : isSTEM
        ? ["Confusing series voltage division with parallel constant voltage", "Believing current is consumed by bulbs"]
        : ["Confusing multi-valued columns with 1NF atomicity", "Overlooking partial key dependencies in composite keys"],
      scaffoldingStrategy: isPartsOfSpeech
        ? "Color-coded visual token cards and the 'Sentence Job Test' question ladder."
        : isPressure
        ? "Concrete physical demonstrations (pressing flat vs sharp side of pencil into clay) and simple calculation tables."
        : "Socratic Step-by-Step Drill with explicit color-coding and immediate feedback loops.",
      guidedPrompts: isPartsOfSpeech
        ? [
            "What job is this word doing in this exact sentence?",
            "Is it naming something, showing an action, or describing?",
            "If you replace it with an obvious noun or verb, does the sentence still make sense?"
          ]
        : isPressure
        ? [
            "Is the force pushing on a wide surface or a tiny point?",
            "What happens to pressure when the contact area gets smaller?",
            "Which hole has more water pressing down from above it?"
          ]
        : [
            "What is the exact definition of our target term?",
            "If we remove the modifier phrase, what is the core subject?",
            "Check your signs: does a negative multiplied by a negative yield a positive?"
          ]
    };

    // Formative Exit Ticket
    const exitTicket = {
      prompt: isMath
        ? "Solve 2x² - 8 = 0. State clearly whether the roots are rational or irrational."
        : isPartsOfSpeech
        ? "In the sentence 'We booked a quiet room at the hotel', what part of speech is 'booked' and what part of speech is 'quiet'?"
        : isEnglish
        ? "Write down whether 'The sound of drums (echo / echoes) in the valley' takes 'echo' or 'echoes', and name the head subject."
        : isPressure
        ? "Explain in one sentence why someone wearing wide snowshoes does not sink into deep snow, while someone wearing normal shoes sinks."
        : isSTEM
        ? "In your own words: If a strings of holiday lights goes completely dark when one bulb blows, is the string wired in series or in parallel?"
        : "True or False: A table with a single-column primary key cannot violate Second Normal Form (2NF). Justify in one sentence.",
      sampleCorrectResponse: isMath
        ? "2x² = 8 => x² = 4 => x = ±2. The roots are x = 2 and x = -2 (rational numbers)."
        : isPartsOfSpeech
        ? "'Booked' is a verb (action of reserving). 'Quiet' is an adjective (describing the room)."
        : isEnglish
        ? "The verb is 'echoes'. The head subject is 'sound' (singular), not 'drums'."
        : isPressure
        ? "Wide snowshoes increase the surface area in contact with the snow, which lowers the pressure exerted by the person's weight and prevents sinking."
        : isSTEM
        ? "It is wired in series, because an open bulb breaks the single shared conducting circuit path."
        : "True. Partial key dependency requires a composite (multi-column) primary key; if the key is single, it automatically satisfies 2NF.",
      commonErrorsToLookFor: isPartsOfSpeech
        ? [
            "Calling 'booked' an adjective because it ends in -ed",
            "Confusing 'quiet' (adjective) with 'quietly' (adverb)",
            "Naming 'hotel' instead of identifying the parts of speech of 'booked' and 'quiet'"
          ]
        : isPressure
        ? [
            "Saying snowshoes make the person lighter",
            "Forgetting to mention surface area or contact area",
            "Stating that pressure increases instead of decreases"
          ]
        : [
            "Omitting the ± negative square root branch",
            "Selecting the verb that agrees with the closest plural noun",
            "Guessing without explaining the physical circuit path"
          ],
      remedialNextStep: isPartsOfSpeech
        ? "Provide 3-minute sentence strip sorting card practice before next period."
        : isPressure
        ? "Perform quick clay block indentation re-test before class dismisses."
        : "Assign 5-minute Formula Codex drill for learners scoring below 100% on this check."
    };

    // Marking Scheme
    const markingScheme = {
      totalMarks: 20,
      breakdown: [
        { section: "Section A: Conceptual Recall & Standard Definitions", marks: 5, guidance: "Full credit for accurate terminology and boundary constraints." },
        { section: "Section B: Methodological Working & Derivations", marks: 10, guidance: "Award method marks even if arithmetic slips occur, provided correct theorem is applied." },
        { section: "Section C: Accuracy & Unit Rigor", marks: 5, guidance: "Deduct 1 mark for missing units or sign inversion." }
      ]
    };

    const typePrefixMap: Record<EducationalMaterialType, string> = {
      lesson_plan: "5-Phase Lesson Plan",
      lesson_note: "Comprehensive Teaching Note",
      worksheet: "Classroom Usable Worksheet",
      quiz: "Curriculum Diagnostic Quiz",
      assignment: "Homework Assignment",
      class_test: "Formal Class Test",
      revision_material: "Exam Revision Package",
      homework: "Structured Homework Sheet",
      remedial_activity: "Diagnostic Remedial Activity",
      extension_activity: "Advanced Extension Challenge",
      answer_key: "Verified Master Answer Key",
      marking_scheme: "Official Examiner Marking Scheme",
      exit_ticket: "Diagnostic Exit Ticket",
      study_guide: "Condensed Student Study Guide",
      video_lesson_script: "Instructional Video Masterclass Script",
      video_explanation_package: "Curriculum Video Explanation Package"
    };

    const title = `${typePrefixMap[params.materialType] || "Educational Material"}: ${params.topic}`;

    return {
      title,
      unitId,
      unitTitle,
      skillId,
      skillTitle,
      learningObjectives,
      prerequisiteKnowledge,
      instructionalMaterials,
      sections,
      questions,
      differentiationTiers,
      remedialSupport,
      exitTicket,
      markingScheme,
      linkedQRCompanionCode: qrCompanion
    };
  }

  // --- Persistence Management ---

  private loadDefaults(): TeacherCopilotDefaults {
    try {
      const stored = localStorage.getItem(DEFAULTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {
      teacherId: "usr_tch_babatunde_ojo",
      defaultClassroomId: "cls-ss2-sci-a",
      defaultSubjectId: "subj-mth-senior",
      defaultLevel: "senior_secondary",
      typicalLessonDurationMinutes: 40,
      preferredQuestionQuantity: 5,
      preferredDifficulty: "standard"
    };
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.materials = parsed.map((m: any) => {
            const matType = m.materialType || m.type || "lesson_plan";
            const lifecycle = m.lifecycleStatus || m.status || "draft";
            return {
              ...m,
              materialType: matType,
              type: matType,
              lifecycleStatus: lifecycle,
              status: lifecycle,
              authorName: m.authorName || m.teacherDisplayName || "Certified Educator",
              targetAudience: m.targetAudience || m.targetLevel || "senior_secondary"
            };
          });
        }
      }
    } catch (err) {
      console.warn("Could not load teacher educational materials from storage", err);
      this.materials = [];
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.materials));
    } catch (err) {
      console.warn("Could not save teacher educational materials to storage", err);
    }
  }

  private seedInitialMaterials(): void {
    // Demonstration Scenario 1: SS1 Mathematics 40m Lesson Plan on Quadratic Equations
    const mat1 = this.buildSeedMaterial({
      id: "mat-seed-01",
      title: "5-Phase Lesson Plan: Quadratic Equations & Formula Derivation",
      materialType: "lesson_plan",
      level: "senior_secondary",
      domain: "Mathematics",
      topic: "Quadratic Equations & Roots",
      classroomId: "cls-ss2-sci-a",
      classroomName: "SS2 Science & Computing",
      durationMinutes: 40,
      provenance: "AI_GENERATED_DRAFT",
      lifecycleStatus: "awaiting_human_approval",
      humanReviewDecision: "pending",
      prompt: "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations."
    });

    // Demonstration Scenario 2: JSS2 English Worksheet on Subject-Verb Agreement for Struggling Learners
    const mat2 = this.buildSeedMaterial({
      id: "mat-seed-02",
      title: "Remedial Worksheet: Subject-Verb Agreement & Intervening Phrases",
      materialType: "worksheet",
      level: "junior_secondary",
      domain: "English Language",
      topic: "Subject-Verb Agreement & Concord",
      classroomId: "cls-jss2-eng-b",
      classroomName: "JSS2 English & Rhetoric",
      durationMinutes: 30,
      isRemedial: true,
      isDifferentiated: true,
      provenance: "AI_GENERATED_DRAFT",
      lifecycleStatus: "awaiting_human_approval",
      humanReviewDecision: "pending",
      prompt: "I need a JSS2 English worksheet on subject verb agreement for learners who are struggling."
    });

    // Demonstration Scenario 3: Primary 6 Science Revision Activity on Electricity
    const mat3 = this.buildSeedMaterial({
      id: "mat-seed-03",
      title: "Classroom Activity: Basic Electricity & Simple Circuits",
      materialType: "revision_material",
      level: "upper_primary",
      domain: "STEM / Science",
      topic: "Basic Electricity & Simple Circuits",
      classroomId: "cls-pri6-sci",
      classroomName: "Primary 6 STEM Foundations",
      durationMinutes: 45,
      provenance: "TEACHER_APPROVED",
      lifecycleStatus: "approved",
      humanReviewDecision: "approved",
      prompt: "Create a Primary 6 science revision activity on electricity."
    });

    // Demonstration Scenario 4: SS2 ICT Quiz on Database Normalization
    const mat4 = this.buildSeedMaterial({
      id: "mat-seed-04",
      title: "Curriculum Diagnostic Quiz: Relational Database Normalization (1NF, 2NF, 3NF)",
      materialType: "quiz",
      level: "senior_secondary",
      domain: "Computer Science / ICT",
      topic: "Database Normalization (1NF, 2NF, 3NF)",
      classroomId: "cls-ss2-sci-a",
      classroomName: "SS2 Science & Computing",
      durationMinutes: 25,
      provenance: "TEACHER_APPROVED",
      lifecycleStatus: "approved",
      humanReviewDecision: "approved",
      prompt: "Prepare an ICT quiz for SS2 on database normalization."
    });

    // Demonstration Scenario 5: Transformed Teaching Note
    const mat5 = this.buildSeedMaterial({
      id: "mat-seed-05",
      title: "Comprehensive Teaching Note: Quadratic Equations & Roots",
      materialType: "lesson_note",
      level: "senior_secondary",
      domain: "Mathematics",
      topic: "Quadratic Equations & Roots",
      classroomId: "cls-ss2-sci-a",
      classroomName: "SS2 Science & Computing",
      durationMinutes: 45,
      provenance: "TEACHER_EDITED_DRAFT",
      lifecycleStatus: "draft",
      humanReviewDecision: "pending",
      prompt: "Turn this lesson plan into a comprehensive teaching note.",
      derivedFromId: "mat-seed-01"
    });

    this.materials = [mat1, mat2, mat3, mat4, mat5];
    this.saveToStorage();
  }

  private buildSeedMaterial(config: {
    id: string;
    title: string;
    materialType: EducationalMaterialType;
    level: EducationalLevel;
    domain: string;
    topic: string;
    classroomId: string;
    classroomName: string;
    durationMinutes: number;
    provenance: MaterialProvenance;
    lifecycleStatus: MaterialLifecycleStatus;
    humanReviewDecision: "pending" | "approved" | "rejected" | "revision_requested";
    prompt: string;
    isRemedial?: boolean;
    isDifferentiated?: boolean;
    derivedFromId?: string;
  }): TeacherEducationalMaterial {
    const payload = this.buildCurriculumGroundedContent({
      materialType: config.materialType,
      level: config.level,
      domain: config.domain,
      topic: config.topic,
      durationMinutes: config.durationMinutes,
      difficulty: config.isRemedial ? "introductory" : config.isDifferentiated ? "differentiated" : "standard",
      isRemedial: !!config.isRemedial,
      isDifferentiated: !!config.isDifferentiated,
      standard: "WAEC_WASSCE"
    });

    return {
      id: config.id,
      teacherId: "usr_tch_babatunde_ojo",
      teacherDisplayName: "Babatunde Ojo",
      classroomId: config.classroomId,
      classroomName: config.classroomName,
      title: config.title,
      materialType: config.materialType,
      targetLevel: config.level,
      curriculumStandard: "WAEC_WASSCE",
      domainId: config.domain.includes("Math") ? "dom-math" : config.domain.includes("Eng") ? "dom-english" : config.domain.includes("ICT") ? "dom-ict" : "dom-stem",
      subjectId: config.domain.includes("Eng") ? "subj-eng-junior" : config.domain.includes("ICT") ? "subj-ict-computing" : "subj-mth-senior",
      subjectName: config.domain,
      topic: config.topic,
      unitId: payload.unitId,
      unitTitle: payload.unitTitle,
      skillId: payload.skillId,
      skillTitle: payload.skillTitle,
      durationMinutes: config.durationMinutes,
      difficulty: config.isRemedial ? "introductory" : "standard",
      learningObjectives: payload.learningObjectives,
      prerequisiteKnowledge: payload.prerequisiteKnowledge,
      instructionalMaterials: payload.instructionalMaterials,
      sections: payload.sections,
      questions: payload.questions,
      differentiationTiers: payload.differentiationTiers,
      remedialSupport: payload.remedialSupport,
      exitTicket: payload.exitTicket,
      markingScheme: payload.markingScheme,
      provenance: config.provenance,
      lifecycleStatus: config.lifecycleStatus,
      humanReviewDecision: config.humanReviewDecision,
      reviewedBy: config.humanReviewDecision === "approved" ? "Babatunde Ojo" : undefined,
      reviewedAt: config.humanReviewDecision === "approved" ? new Date().toISOString() : undefined,
      reviewerNotes: config.humanReviewDecision === "approved" ? "Certified compliant with WAEC and NERDC curriculum standards." : undefined,
      authorSignature: config.humanReviewDecision === "approved" ? "Babatunde Ojo (Certified Senior Educator)" : undefined,
      linkedQRCompanionCode: payload.linkedQRCompanionCode,
      derivedFromMaterialId: config.derivedFromId,
      sourcePrompt: config.prompt,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date().toISOString(),
      type: config.materialType,
      status: config.lifecycleStatus,
      authorName: "Babatunde Ojo",
      targetAudience: config.level
    };
  }
}

export const aiTeacherCopilotService = new AITeacherCopilotService();
