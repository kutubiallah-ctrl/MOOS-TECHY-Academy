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
  EditorialReviewItem
} from "../types/bookpreneur";
import { ContentLifecycleStatus } from "../types/agentOrchestrator";

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

class BookpreneurService {
  private projects: BookpreneurProject[] = [...SEEDED_BOOKPRENEUR_PROJECTS];

  public getAllProjects(): BookpreneurProject[] {
    return this.projects;
  }

  public getProjectById(id: string): BookpreneurProject | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public createProject(project: Partial<BookpreneurProject>): BookpreneurProject {
    const newProject: BookpreneurProject = {
      id: `bp-${Date.now()}`,
      title: project.title || "Untitled Nonfiction Book",
      subtitle: project.subtitle || "A Structured Nonfiction Treatise",
      workingSubtitle: project.workingSubtitle || "",
      authorName: project.authorName || "Author & Researcher",
      authorAffiliation: project.authorAffiliation || "MOOS TECHY Author Community",
      category: project.category || "education_pedagogy",
      positioning: project.positioning || {
        coreThesis: "Core thesis to be developed.",
        uniqueAngle: "Unique perspective on the subject.",
        categoryName: "education_pedagogy",
        comparableBooks: [],
        targetDemographic: "General educated readership.",
        estimatedWordCount: 50000
      },
      readerPromise: project.readerPromise || {
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
    return newProject;
  }

  public addResearchSource(projectId: string, source: Omit<ResearchSourceItem, "id">): ResearchSourceItem | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    const newSource: ResearchSourceItem = {
      id: `src-${Date.now()}`,
      ...source
    };

    project.researchBibliography.push(newSource);
    project.updatedAt = new Date().toISOString();
    return newSource;
  }
}

export const bookpreneurService = new BookpreneurService();
