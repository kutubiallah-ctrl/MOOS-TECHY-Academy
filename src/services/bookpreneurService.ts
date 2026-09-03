/**
 * MOOS TECHY BOOKPRENEUR STUDIO — SERVICE LAYER
 * 
 * Manages nonfiction publishing projects:
 * Idea -> Problem -> Audience -> Book Concept -> Positioning -> Reader Promise
 * -> Research Plan -> Book Architecture -> Chapter Architecture -> Manuscript
 * -> Claim Classification & Evidence Rigor -> Editorial Review -> Publishing Prep.
 * 
 * Strict Principle:
 * Differentiates Fact, Source-based Claim, Author Interpretation, Hypothesis,
 * Example, Case Study, Opinion, and AI-Generated Suggestion.
 */

import {
  BookpreneurProject,
  ManuscriptChapter,
  ManuscriptSection,
  ClaimEvidenceItem,
  ResearchSourceItem,
  EditorialReviewItem,
  MarketplaceResource,
  MarketplaceReview,
  MarketplaceFilterOptions,
  MarketplacePublicationStatus,
  MarketplaceFormat
} from "../types/bookpreneur";
import { ContentLifecycleStatus } from "../types/agentOrchestrator";
import { UserSession, UserIdentity, InstitutionalUser } from "../types/identity";
import { authorizationService } from "./authorizationService";
import { auditService } from "./auditService";

export const SEEDED_BOOKPRENEUR_PROJECTS: BookpreneurProject[] = [
  {
    id: "bp-metacog-mastery",
    title: "Metacognitive Mastery: The Architecture of Accelerated STEM Comprehension",
    subtitle: "How First-Principles Cognitive Scaffolding and Deliberate Practice Rewire Scientific Intuition",
    workingSubtitle: "Bridging the Gap Between Rote Memorization and Deep Mathematical Intuition",
    authorName: "Dr. O. Adeleke",
    authorAffiliation: "Director of Cognitive Systems, MOOS TECHY Institute",
    category: "education_pedagogy",
    positioning: {
      coreThesis: "Educational underperformance in STEM is primarily an architectural failure of mental schema construction, not a lack of innate student intelligence. By structuring pedagogical scaffolding around Socratic inquiry and deliberate cognitive friction, any learner can achieve first-principles mastery.",
      uniqueAngle: "Combines empirical cognitive load theory with hands-on, reproducible mathematical scaffolding frameworks derived from West African and global classroom data.",
      categoryName: "education_pedagogy",
      comparableBooks: [
        {
          title: "Make It Stick: The Science of Successful Learning",
          author: "Peter C. Brown, Henry L. Roediger III",
          gapAddressedByThisBook: "Provides universal memory science but lacks domain-specific step-by-step mathematical problem architectures."
        },
        {
          title: "A Mind for Numbers",
          author: "Barbara Oakley, PhD",
          gapAddressedByThisBook: "Excellent general techniques; Metacognitive Mastery provides direct curriculum frameworks and CBT diagnostic modeling."
        }
      ],
      targetDemographic: "Educators, academic researchers, school administrators, STEM tutors, and serious self-directed adult learners.",
      estimatedWordCount: 65000
    },
    readerPromise: {
      primaryTransformation: "The reader will transition from treating student learning as a passive absorption task to engineering active, schema-building cognitive learning environments.",
      targetOutcomes: [
        "Diagnose cognitive bottlenecks in mathematical derivations in under 5 minutes.",
        "Implement graduated 3-tier Socratic hint ladders that eliminate student helplessness.",
        "Design objective-aligned assessments with zero reliance on trivial rote recall."
      ],
      audienceArchetype: "Curriculum Designers & Dedicated STEM Educators",
      readerPainPoints: [
        "Students memorize procedures for tests then immediately forget them.",
        "Standard textbooks jump from trivial examples to impossibly complex exam questions without intermediate scaffolding.",
        "Lack of actionable diagnostic tools to pinpoint prerequisite gaps."
      ],
      readerFalseBeliefsToDispel: [
        "Myth: 'Some people just lack a math brain.' (Reality: Mathematical capability scales with schema architecture and deliberate practice).",
        "Myth: 'Immediate high test scores indicate deep mastery.' (Reality: Performance during massed practice frequently masks rapid forgetting)."
      ]
    },
    researchBibliography: [
      {
        id: "src-sweller-1988",
        citationTitle: "Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257-285.",
        sourceType: "peer_reviewed_paper",
        doiOrUrl: "https://doi.org/10.1207/s15516709cog1202_4",
        keyFindingsExtracted: "Working memory capacity is strictly limited; unguided problem solving imposes excessive extraneous cognitive load, impeding schema acquisition in long-term memory.",
        verificationStatus: "verified_source",
        notes: "Fundamental basis for Chapter 2 working memory constraints."
      },
      {
        id: "src-bjork-2011",
        citationTitle: "Bjork, E. L., & Bjork, R. A. (2011). Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning.",
        sourceType: "peer_reviewed_paper",
        doiOrUrl: "https://doi.org/10.1037/e524582012-001",
        keyFindingsExtracted: "Conditions that make learning appear fast and effortless often produce poor long-term retention; introducing deliberate spacing and retrieval creates durable mastery.",
        verificationStatus: "verified_source",
        notes: "Used in Chapter 4 for spacing intervals and diagnostic design."
      }
    ],
    chapters: [
      {
        id: "bp-ch-1",
        chapterNumber: 1,
        title: "The Illusion of Fluency: Why Students Fail When the Format Changes",
        chapterHook: "A student watches a teacher solve a quadratic equation on the board. The steps seem effortless, obvious, and logical. Yet twenty minutes later, confronted with a slightly modified variable, the student stares at a blank paper in despair. What happened?",
        readerTakeaway: "Recognition memory is not generative capability; observing an explanation generates an illusion of fluency that collapses under authentic testing.",
        sections: [
          {
            id: "bp-sec-1-1",
            sectionNumber: "1.1",
            title: "Passive Watching vs. Generative Encoding",
            coreArgument: "The human brain optimizes for cognitive conservation; when a teacher provides complete solutions, the student's working memory passively tracks rather than constructing independent neural schemas.",
            contentMarkdown: "When learners review worked solutions without active retrieval, neuroimaging demonstrates significantly lower prefrontal cortex activation compared to generative problem solving. The feeling of 'understanding' is merely familiarity with the narrative flow, not the structural mastery required to reproduce the derivation.",
            claims: [
              {
                id: "claim-1-1",
                statement: "Working memory can actively process only 4±1 distinct informational chunks simultaneously.",
                classification: "fact",
                sourceCitationId: "src-sweller-1988",
                sourceTextExcerpt: "Working memory limitations fundamentally constrain cognitive processing during complex tasks.",
                verificationStatus: "verified_source"
              },
              {
                id: "claim-1-2",
                statement: "Socratic questioning increases long-term retention by forcing generative schema reconstruction at each decision junction.",
                classification: "source_based_claim",
                sourceCitationId: "src-bjork-2011",
                verificationStatus: "verified_source"
              }
            ],
            caseStudies: [
              {
                title: "The Secondary Mathematics Pilot Intervention",
                organizationOrSubject: "Cohort of 420 Senior Secondary 2 Students across Lagos and Abuja",
                keyTakeaway: "Replacing passive lecture time with 3-phase stepped hint ladders improved standardized exam scores by 28.4% over 12 weeks."
              }
            ],
            wordCount: 3200,
            lifecycleStatus: "author_review"
          }
        ],
        chapterSummary: "Chapter 1 establishes the neurological difference between recognition fluency and authentic generative schema mastery.",
        totalWordCount: 5400,
        lifecycleStatus: "author_review"
      }
    ],
    editorialReviews: [
      {
        id: "rev-1",
        chapterId: "bp-ch-1",
        sectionId: "bp-sec-1-1",
        reviewerType: "human_editor",
        reviewerName: "Prof. K. Bello (Curriculum Reviewer)",
        reviewDate: "2026-02-14",
        category: "evidence_rigor",
        feedbackNote: "The empirical distinction between recognition fluency and generative recall is rigorously argued and properly cited.",
        status: "addressed"
      }
    ],
    publishingPrep: {
      frontMatterReady: true,
      tableOfContentsFinalized: true,
      bibliographyCompiled: true,
      indexTermsGenerated: false,
      backCoverCopy: "Unlock the scientific architecture behind breakthrough STEM learning. Dr. O. Adeleke presents a transformative roadmap for educators and learners to achieve durable mathematical intuition.",
      authorBioSummary: "Dr. O. Adeleke is a lead mathematical pedagogue and researcher in cognitive architecture at MOOS TECHY ACADEMY.",
      isbnAssigned: "978-978-994-201-8"
    },
    lifecycleStatus: "author_review",
    createdAt: "2026-01-20T12:00:00Z",
    updatedAt: "2026-02-19T09:15:00Z"
  }
];

export const SEEDED_MARKETPLACE_RESOURCES: MarketplaceResource[] = [
  {
    id: "mkt-metacog-mastery-codex",
    bookProjectId: "bp-metacog-mastery",
    title: "Metacognitive Mastery: The Architecture of Accelerated STEM Comprehension",
    subtitle: "How First-Principles Cognitive Scaffolding and Deliberate Practice Rewire Scientific Intuition",
    description: "The definitive guide for STEM educators and senior secondary students to build deep conceptual intuition in mathematics, physics, and chemistry. Includes 50+ graduated 3-tier Socratic hint ladders and CBT diagnostic frameworks.",
    creatorId: "user-teacher-adeleke",
    creatorName: "Dr. O. Adeleke",
    creatorAffiliation: "Director of Cognitive Systems, MOOS TECHY Institute",
    creatorRole: "TEACHER",
    category: "education_pedagogy",
    subject: "Mathematics & STEM Pedagogy",
    educationLevel: "SSS_1_3",
    curriculumAlignment: ["math_quadratics_01", "math_calculus_01", "math_trig_01"],
    targetAgeRange: "14 - 19 years / Educators",
    format: "digital_textbook",
    price: 4500,
    currency: "NGN",
    publicationStatus: "PUBLISHED",
    provenance: "TEACHER_AUTHORED",
    version: "1.2.0",
    averageRating: 4.9,
    totalRatingsCount: 38,
    reviews: [
      {
        id: "rev-mkt-1",
        reviewerId: "user-teacher-002",
        reviewerName: "B. Nwosu (Senior Physics Tutor)",
        reviewerRole: "EDUCATOR",
        rating: 5,
        reviewTitle: "Revolutionized our classroom's quadratic equation comprehension",
        reviewComment: "The distinction between passive observation and generative retrieval is game-changing. Our students cleared prerequisite bottlenecks in two weeks.",
        createdAt: "2026-02-18T10:30:00Z",
        verifiedPurchase: true
      }
    ],
    previewSections: [
      {
        title: "Chapter 1: The Illusion of Fluency",
        contentExcerpt: "When learners review worked solutions without active retrieval, neuroimaging demonstrates significantly lower prefrontal cortex activation compared to generative problem solving...",
        pageNumber: 1
      },
      {
        title: "Chapter 2: Working Memory Scaffolding",
        contentExcerpt: "Working memory capacity is strictly limited to 4±1 chunks. Scaffolding must offload extraneous load while preserving germane schema construction...",
        pageNumber: 14
      }
    ],
    learningSupplyIntegration: {
      linkedSkillIds: ["math_quadratics_01", "math_calculus_01"],
      linkedUnitIds: ["unit-math-algebra-s2", "unit-math-calculus-s3"],
      qrResourceCode: "QR-STEM-QUAD-01",
      practiceArenaDirectSkillId: "math_quadratics_01"
    },
    commercialModel: {
      creatorRoyaltyPercentage: 70,
      platformCommissionPercentage: 30,
      institutionalLicenseAvailable: true,
      institutionalLicensePrice: 45000,
      printCompanionAvailable: true,
      printCompanionPrice: 8500
    },
    createdAt: "2026-01-25T08:00:00Z",
    updatedAt: "2026-02-20T14:00:00Z"
  },
  {
    id: "mkt-waec-math-mastery",
    title: "WAEC WASSCE Mathematics Breakthrough Codex & 10-Year Scaffold",
    subtitle: "Complete Exam Theory, Step-by-Step Derivations & Diagnostic Traps",
    description: "Comprehensive West African Senior School Certificate Examination (WASSCE) preparation guide featuring 500+ solved exam questions, common examiner traps, marking scheme breakdown, and instant QR links to online practice drills.",
    creatorId: "user-teacher-adeleke",
    creatorName: "MOOS TECHY Senior Faculty",
    creatorAffiliation: "Department of Mathematical Sciences",
    creatorRole: "TEACHER",
    category: "education_pedagogy",
    subject: "General Mathematics",
    educationLevel: "WAEC_WASSCE",
    curriculumAlignment: ["math_quadratics_01", "math_trig_01", "math_circle_theorems_01"],
    targetAgeRange: "15 - 18 years",
    format: "exam_prep_guide",
    price: 3200,
    currency: "NGN",
    publicationStatus: "PUBLISHED",
    provenance: "PUBLISHED_RESOURCE",
    version: "2.0.1",
    averageRating: 4.8,
    totalRatingsCount: 114,
    reviews: [
      {
        id: "rev-mkt-2",
        reviewerId: "user-learner-001",
        reviewerName: "Amara K. (SS3 Student)",
        reviewerRole: "LEARNER",
        rating: 5,
        reviewTitle: "Scored A1 in WAEC Mock Exam!",
        reviewComment: "The QR codes that immediately launch the Practice Arena on my phone made all the difference when I got stuck on circle geometry.",
        createdAt: "2026-02-15T16:20:00Z",
        verifiedPurchase: true
      }
    ],
    previewSections: [
      {
        title: "Section 1: Circle Theorems & Proof Verification",
        contentExcerpt: "Theorem 1: The angle subtended by an arc at the centre is twice the angle subtended by it at any point on the remaining part of the circumference...",
        pageNumber: 5
      }
    ],
    learningSupplyIntegration: {
      linkedSkillIds: ["math_circle_theorems_01", "math_trig_01"],
      linkedUnitIds: ["unit-math-geometry-s2"],
      qrResourceCode: "QR-WAEC-MATH-01",
      practiceArenaDirectSkillId: "math_circle_theorems_01"
    },
    commercialModel: {
      creatorRoyaltyPercentage: 70,
      platformCommissionPercentage: 30,
      institutionalLicenseAvailable: true,
      institutionalLicensePrice: 35000,
      printCompanionAvailable: true,
      printCompanionPrice: 6500
    },
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-02-22T11:00:00Z"
  },
  {
    id: "mkt-jamb-cbt-accelerator",
    title: "JAMB UTME CBT Speed & Accuracy Engine",
    subtitle: "High-Yield STEM Concept Maps, 40-Second Problem Shortcuts & Negative Marking Avoidance",
    description: "Engineered specifically for the JAMB CBT format. Master high-frequency questions in Mathematics, Physics, and Chemistry with rapid mental heuristics, formula codices, and automated timer calibration.",
    creatorId: "user-teacher-003",
    creatorName: "Engr. T. Balogun",
    creatorAffiliation: "STEM Research Fellow",
    creatorRole: "TEACHER",
    category: "education_pedagogy",
    subject: "JAMB STEM Comprehensive",
    educationLevel: "JAMB_UTME",
    curriculumAlignment: ["math_calculus_01", "phy_mechanics_01", "chem_stoichiometry_01"],
    targetAgeRange: "16 - 20 years",
    format: "exam_prep_guide",
    price: 2800,
    currency: "NGN",
    publicationStatus: "PUBLISHED",
    provenance: "PUBLISHED_RESOURCE",
    version: "1.0.4",
    averageRating: 4.7,
    totalRatingsCount: 89,
    reviews: [],
    previewSections: [
      {
        title: "Speed Strategy: Kinematics without Quadratic Formula",
        contentExcerpt: "For uniform acceleration where displacement is required without given final velocity, apply the average velocity principle to reduce 5-line derivations to a single mental multiplication...",
        pageNumber: 3
      }
    ],
    learningSupplyIntegration: {
      linkedSkillIds: ["math_calculus_01", "phy_mechanics_01"],
      linkedUnitIds: ["unit-jamb-physics-mech"],
      qrResourceCode: "QR-JAMB-CBT-01",
      practiceArenaDirectSkillId: "math_calculus_01"
    },
    commercialModel: {
      creatorRoyaltyPercentage: 70,
      platformCommissionPercentage: 30,
      institutionalLicenseAvailable: true,
      institutionalLicensePrice: 28000,
      printCompanionAvailable: false
    },
    createdAt: "2026-01-15T14:00:00Z",
    updatedAt: "2026-02-18T16:45:00Z"
  },
  {
    id: "mkt-primary-foundations-workbook",
    title: "Primary Mathematics Schema Builder: Concrete to Abstract",
    subtitle: "Interactive Visual Scaffolding for Fractions, Decimals and Spatial Reasoning",
    description: "Foundational numeracy workbook utilizing the Singapore Concrete-Pictorial-Abstract (CPA) model. Designed for primary teachers, parents, and young learners to build solid mathematical mental models.",
    creatorId: "user-teacher-adeleke",
    creatorName: "Mrs. F. Alabi & Dr. O. Adeleke",
    creatorAffiliation: "Early Years STEM Pedagogy Unit",
    creatorRole: "TEACHER",
    category: "education_pedagogy",
    subject: "Primary Mathematics",
    educationLevel: "PRIMARY",
    curriculumAlignment: ["math_fractions_basic", "math_decimals_01"],
    targetAgeRange: "7 - 11 years",
    format: "workbook",
    price: 0, // Free Open Educational Resource
    currency: "NGN",
    publicationStatus: "PUBLISHED",
    provenance: "TEACHER_AUTHORED",
    version: "1.1.0",
    averageRating: 4.9,
    totalRatingsCount: 42,
    reviews: [],
    previewSections: [
      {
        title: "Visualizing Fractional Parts",
        contentExcerpt: "Before introducing algebraic fraction symbols, learners construct geometric fraction bars to verify equivalence intuitively...",
        pageNumber: 1
      }
    ],
    learningSupplyIntegration: {
      linkedSkillIds: ["math_fractions_basic"],
      linkedUnitIds: ["unit-math-fractions-p4"],
      qrResourceCode: "QR-PRIM-FRACT-01"
    },
    commercialModel: {
      creatorRoyaltyPercentage: 0,
      platformCommissionPercentage: 0,
      institutionalLicenseAvailable: true,
      institutionalLicensePrice: 0,
      printCompanionAvailable: true,
      printCompanionPrice: 3500
    },
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-02-21T10:00:00Z"
  }
];

class BookpreneurService {
  private projects: BookpreneurProject[] = [...SEEDED_BOOKPRENEUR_PROJECTS];
  private marketplaceResources: MarketplaceResource[] = [...SEEDED_MARKETPLACE_RESOURCES];

  // =========================================================================
  // BOOK PROJECTS
  // =========================================================================

  public getAllProjects(): BookpreneurProject[] {
    return this.projects;
  }

  public getProjectById(id: string): BookpreneurProject | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public createProject(
    actor: UserSession | UserIdentity | InstitutionalUser,
    projectData: Partial<BookpreneurProject>
  ): BookpreneurProject {
    authorizationService.assertAuthorized(actor, "CREATE_BOOK_PROJECT", {
      resourceType: "book_project"
    });

    const actorId = "userId" in actor ? actor.userId : actor.id;
    const actorDisplayName = actor.displayName || "Author";

    const newProject: BookpreneurProject = {
      id: `bp-${Date.now()}`,
      title: projectData.title || "Untitled Nonfiction Book",
      subtitle: projectData.subtitle || "A Structured Nonfiction Treatise",
      workingSubtitle: projectData.workingSubtitle || "",
      authorName: projectData.authorName || actorDisplayName,
      authorAffiliation: projectData.authorAffiliation || "MOOS TECHY Author Community",
      category: projectData.category || "education_pedagogy",
      positioning: projectData.positioning || {
        coreThesis: "Core thesis to be developed.",
        uniqueAngle: "Unique perspective on the subject.",
        categoryName: "education_pedagogy",
        comparableBooks: [],
        targetDemographic: "General educated readership.",
        estimatedWordCount: 50000
      },
      readerPromise: projectData.readerPromise || {
        primaryTransformation: "Transformation description.",
        targetOutcomes: [],
        audienceArchetype: "Core Readers",
        readerPainPoints: [],
        readerFalseBeliefsToDispel: []
      },
      researchBibliography: [],
      chapters: [],
      editorialReviews: [],
      publishingPrep: {
        frontMatterReady: false,
        tableOfContentsFinalized: false,
        bibliographyCompiled: false,
        indexTermsGenerated: false,
        backCoverCopy: "",
        authorBioSummary: ""
      },
      lifecycleStatus: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.projects.unshift(newProject);

    auditService.logEvent({
      eventType: "BOOK_CREATED",
      actorId,
      actorRole: actor.role,
      actorDisplayName,
      resourceType: "book_project",
      resourceId: newProject.id,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: { title: newProject.title, category: newProject.category }
    });

    return newProject;
  }

  public updateProject(
    actor: UserSession | UserIdentity | InstitutionalUser,
    projectId: string,
    updates: Partial<BookpreneurProject>
  ): BookpreneurProject | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    authorizationService.assertAuthorized(actor, "EDIT_BOOK_PROJECT", {
      resourceType: "book_project",
      resourceId: projectId,
      ownerId: project.authorName // or mapped author id
    });

    Object.assign(project, updates, { updatedAt: new Date().toISOString() });

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "BOOK_UPDATED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "book_project",
      resourceId: projectId,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: { updatedFields: Object.keys(updates) }
    });

    return project;
  }

  public addResearchSource(
    actor: UserSession | UserIdentity | InstitutionalUser,
    projectId: string,
    source: Omit<ResearchSourceItem, "id">
  ): ResearchSourceItem | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    authorizationService.assertAuthorized(actor, "EDIT_BOOK_PROJECT", {
      resourceType: "book_project",
      resourceId: projectId
    });

    const newSource: ResearchSourceItem = {
      id: `src-${Date.now()}`,
      ...source
    };

    project.researchBibliography.push(newSource);
    project.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "RESEARCH_ITEM_ADDED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "book_project",
      resourceId: projectId,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: { citationTitle: source.citationTitle, sourceType: source.sourceType }
    });

    return newSource;
  }

  public classifyClaim(
    actor: UserSession | UserIdentity | InstitutionalUser,
    projectId: string,
    chapterId: string,
    sectionId: string,
    claim: Omit<ClaimEvidenceItem, "id">
  ): ClaimEvidenceItem | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    authorizationService.assertAuthorized(actor, "EDIT_BOOK_PROJECT", {
      resourceType: "book_project",
      resourceId: projectId
    });

    const chapter = project.chapters.find((c) => c.id === chapterId);
    const section = chapter?.sections.find((s) => s.id === sectionId);
    if (!section) return null;

    const newClaim: ClaimEvidenceItem = {
      id: `claim-${Date.now()}`,
      ...claim
    };

    section.claims.push(newClaim);
    project.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "CLAIM_CLASSIFIED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "book_project",
      resourceId: projectId,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: { statement: claim.statement, classification: claim.classification }
    });

    return newClaim;
  }

  // =========================================================================
  // MARKETPLACE CATALOG & GOVERNANCE
  // =========================================================================

  public getMarketplaceResources(filters?: MarketplaceFilterOptions): MarketplaceResource[] {
    let result = [...this.marketplaceResources];

    if (!filters) {
      return result.filter((r) => r.publicationStatus === "PUBLISHED");
    }

    if (filters.publicationStatus) {
      result = result.filter((r) => r.publicationStatus === filters.publicationStatus);
    } else {
      // Default to showing PUBLISHED resources in public discovery
      result = result.filter((r) => r.publicationStatus === "PUBLISHED");
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter((r) => r.category === filters.category);
    }

    if (filters.subject) {
      const sub = filters.subject.toLowerCase();
      result = result.filter((r) => r.subject.toLowerCase().includes(sub));
    }

    if (filters.educationLevel && filters.educationLevel !== "all") {
      result = result.filter((r) => r.educationLevel === filters.educationLevel);
    }

    if (filters.format && filters.format !== "all") {
      result = result.filter((r) => r.format === filters.format);
    }

    if (filters.priceFilter) {
      if (filters.priceFilter === "free") {
        result = result.filter((r) => r.price === 0);
      } else if (filters.priceFilter === "paid") {
        result = result.filter((r) => r.price > 0);
      }
    }

    if (filters.minRating) {
      result = result.filter((r) => r.averageRating >= (filters.minRating || 0));
    }

    if (filters.curriculumSkillId) {
      result = result.filter(
        (r) =>
          r.curriculumAlignment.includes(filters.curriculumSkillId!) ||
          r.learningSupplyIntegration?.linkedSkillIds.includes(filters.curriculumSkillId!)
      );
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle?.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.creatorName.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public getAllMarketplaceResourcesForAdmin(actor: UserSession | UserIdentity | InstitutionalUser): MarketplaceResource[] {
    authorizationService.assertAuthorized(actor, "MANAGE_MARKETPLACE_CATALOG", {
      resourceType: "marketplace_resource"
    });
    return this.marketplaceResources;
  }

  public getMarketplaceResourceById(id: string): MarketplaceResource | undefined {
    return this.marketplaceResources.find((r) => r.id === id);
  }

  public getMarketplaceResourcesBySkill(skillId: string): MarketplaceResource[] {
    return this.marketplaceResources.filter(
      (r) =>
        r.publicationStatus === "PUBLISHED" &&
        (r.curriculumAlignment.includes(skillId) ||
          r.learningSupplyIntegration?.linkedSkillIds.includes(skillId))
    );
  }

  public createMarketplaceResource(
    actor: UserSession | UserIdentity | InstitutionalUser,
    data: Partial<MarketplaceResource>
  ): MarketplaceResource {
    authorizationService.assertAuthorized(actor, "CREATE_BOOK_PROJECT", {
      resourceType: "marketplace_resource"
    });

    const actorId = "userId" in actor ? actor.userId : actor.id;
    const actorDisplayName = actor.displayName || "Creator";

    const newResource: MarketplaceResource = {
      id: `mkt-res-${Date.now()}`,
      bookProjectId: data.bookProjectId,
      title: data.title || "Untitled Educational Resource",
      subtitle: data.subtitle || "",
      description: data.description || "Comprehensive educational codex.",
      creatorId: actorId,
      creatorName: data.creatorName || actorDisplayName,
      creatorAffiliation: data.creatorAffiliation || "MOOS TECHY Author Community",
      creatorRole: (actor.role === "ADMIN" ? "ADMIN" : "TEACHER"),
      category: data.category || "education_pedagogy",
      subject: data.subject || "General STEM",
      educationLevel: data.educationLevel || "SSS_1_3",
      curriculumAlignment: data.curriculumAlignment || [],
      targetAgeRange: data.targetAgeRange || "14-18",
      format: data.format || "digital_textbook",
      price: data.price !== undefined ? data.price : 2500,
      currency: data.currency || "NGN",
      publicationStatus: "DRAFT",
      provenance: data.provenance || "TEACHER_AUTHORED",
      version: data.version || "1.0.0",
      averageRating: 0,
      totalRatingsCount: 0,
      reviews: [],
      previewSections: data.previewSections || [],
      learningSupplyIntegration: data.learningSupplyIntegration,
      commercialModel: data.commercialModel || {
        creatorRoyaltyPercentage: 70,
        platformCommissionPercentage: 30,
        institutionalLicenseAvailable: true,
        institutionalLicensePrice: (data.price || 2500) * 10,
        printCompanionAvailable: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.marketplaceResources.unshift(newResource);

    auditService.logEvent({
      eventType: "MARKETPLACE_RESOURCE_CREATED",
      actorId,
      actorRole: actor.role,
      actorDisplayName,
      resourceType: "marketplace_resource",
      resourceId: newResource.id,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: { title: newResource.title, format: newResource.format }
    });

    return newResource;
  }

  public submitResourceForReview(
    actor: UserSession | UserIdentity | InstitutionalUser,
    resourceId: string
  ): MarketplaceResource {
    const resource = this.getMarketplaceResourceById(resourceId);
    if (!resource) {
      throw new Error(`Resource '${resourceId}' not found.`);
    }

    authorizationService.assertAuthorized(actor, "SUBMIT_BOOK_RESOURCE", {
      resourceType: "marketplace_resource",
      resourceId,
      ownerId: resource.creatorId
    });

    resource.publicationStatus = "UNDER_REVIEW";
    resource.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "RESOURCE_SUBMITTED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "marketplace_resource",
      resourceId,
      result: "SUCCESS",
      dataClassification: "CLASSROOM_INSTITUTIONAL",
      metadata: { title: resource.title, creatorId: resource.creatorId }
    });

    return resource;
  }

  public approveResource(
    actor: UserSession | UserIdentity | InstitutionalUser,
    resourceId: string,
    reviewNote = "Passed institutional curriculum alignment & evidence review."
  ): MarketplaceResource {
    const resource = this.getMarketplaceResourceById(resourceId);
    if (!resource) {
      throw new Error(`Resource '${resourceId}' not found.`);
    }

    authorizationService.assertAuthorized(actor, "APPROVE_BOOK_RESOURCE", {
      resourceType: "marketplace_resource",
      resourceId
    });

    resource.publicationStatus = "APPROVED";
    resource.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "RESOURCE_APPROVED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "marketplace_resource",
      resourceId,
      result: "SUCCESS",
      reason: reviewNote,
      dataClassification: "CLASSROOM_INSTITUTIONAL",
      metadata: { title: resource.title, approver: actor.displayName }
    });

    return resource;
  }

  public rejectResource(
    actor: UserSession | UserIdentity | InstitutionalUser,
    resourceId: string,
    reason: string
  ): MarketplaceResource {
    const resource = this.getMarketplaceResourceById(resourceId);
    if (!resource) {
      throw new Error(`Resource '${resourceId}' not found.`);
    }

    authorizationService.assertAuthorized(actor, "APPROVE_BOOK_RESOURCE", {
      resourceType: "marketplace_resource",
      resourceId
    });

    resource.publicationStatus = "DRAFT";
    resource.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "RESOURCE_REJECTED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "marketplace_resource",
      resourceId,
      result: "SUCCESS",
      reason,
      dataClassification: "CLASSROOM_INSTITUTIONAL",
      metadata: { title: resource.title }
    });

    return resource;
  }

  public publishResource(
    actor: UserSession | UserIdentity | InstitutionalUser,
    resourceId: string
  ): MarketplaceResource {
    const resource = this.getMarketplaceResourceById(resourceId);
    if (!resource) {
      throw new Error(`Resource '${resourceId}' not found.`);
    }

    authorizationService.assertAuthorized(actor, "PUBLISH_MARKETPLACE_RESOURCE", {
      resourceType: "marketplace_resource",
      resourceId,
      creatorId: resource.creatorId,
      provenance: resource.provenance,
      publicationStatus: resource.publicationStatus
    });

    resource.publicationStatus = "PUBLISHED";
    resource.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "MARKETPLACE_RESOURCE_PUBLISHED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "marketplace_resource",
      resourceId,
      result: "SUCCESS",
      dataClassification: "CANONICAL_PUBLIC",
      metadata: { title: resource.title, price: resource.price, format: resource.format }
    });

    return resource;
  }

  public suspendResource(
    actor: UserSession | UserIdentity | InstitutionalUser,
    resourceId: string,
    reason: string
  ): MarketplaceResource {
    const resource = this.getMarketplaceResourceById(resourceId);
    if (!resource) {
      throw new Error(`Resource '${resourceId}' not found.`);
    }

    authorizationService.assertAuthorized(actor, "SUSPEND_MARKETPLACE_RESOURCE", {
      resourceType: "marketplace_resource",
      resourceId
    });

    resource.publicationStatus = "SUSPENDED";
    resource.updatedAt = new Date().toISOString();

    const actorId = "userId" in actor ? actor.userId : actor.id;
    auditService.logEvent({
      eventType: "MARKETPLACE_RESOURCE_SUSPENDED",
      actorId,
      actorRole: actor.role,
      actorDisplayName: actor.displayName,
      resourceType: "marketplace_resource",
      resourceId,
      result: "SUCCESS",
      reason,
      dataClassification: "AUDIT_SECURITY",
      metadata: { title: resource.title }
    });

    return resource;
  }

  public addMarketplaceReview(
    actor: UserSession | UserIdentity | InstitutionalUser,
    resourceId: string,
    reviewData: Omit<MarketplaceReview, "id" | "createdAt">
  ): MarketplaceReview {
    const resource = this.getMarketplaceResourceById(resourceId);
    if (!resource) {
      throw new Error(`Resource '${resourceId}' not found.`);
    }

    const newReview: MarketplaceReview = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      createdAt: new Date().toISOString()
    };

    resource.reviews.unshift(newReview);
    resource.totalRatingsCount += 1;
    const totalScore = resource.reviews.reduce((acc, r) => acc + r.rating, 0);
    resource.averageRating = Math.round((totalScore / resource.reviews.length) * 10) / 10;
    resource.updatedAt = new Date().toISOString();

    return newReview;
  }

  public calculateCommercialBreakdown(
    price: number,
    quantity = 1,
    format: MarketplaceFormat = "digital_textbook"
  ) {
    const grossRevenue = price * quantity;
    const creatorRoyaltyPercentage = 70;
    const platformCommissionPercentage = 30;

    const creatorEarnings = (grossRevenue * creatorRoyaltyPercentage) / 100;
    const platformFee = (grossRevenue * platformCommissionPercentage) / 100;

    return {
      grossRevenue,
      creatorEarnings,
      platformFee,
      royaltyRate: `${creatorRoyaltyPercentage}%`,
      platformRate: `${platformCommissionPercentage}%`,
      format
    };
  }
}

export const bookpreneurService = new BookpreneurService();
