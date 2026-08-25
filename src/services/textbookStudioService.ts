/**
 * MOOS TECHY TEXTBOOK STUDIO — SERVICE LAYER
 * 
 * Manages the 18-step canonical textbook authoring workflow:
 * Author Idea -> Book Brief -> Target Learner -> Subject -> Level -> Curriculum -> Learning Objectives
 * -> Book Architecture -> Parts -> Chapters -> Sections -> Concepts -> Lessons -> Worked Examples
 * -> Practice -> Assessments -> Revision -> Answer Guide -> QR Companion Resources -> Quality Review
 * -> Human Approval -> Publication.
 */

import {
  TextbookProject,
  TextbookChapter,
  TextbookSection,
  TextbookConcept,
  TextbookWorkedExample,
  TextbookPracticeItem,
  CurriculumMappingStatus
} from "../types/textbookStudio";
import { ContentLifecycleStatus } from "../types/agentOrchestrator";
import { qrResourceService } from "./qrResourceService";

export const SEEDED_TEXTBOOK_PROJECTS: TextbookProject[] = [
  {
    id: "tb-cemm-mth",
    code: "CEMM-MTH-S1",
    title: "C.E.M.M Modern Mathematics: Foundational to Advanced Senior Secondary",
    subtitle: "A Rigorous, Concept-First Pedagogical Treatise with Physical QR Digital Companions",
    discipline: "mathematics",
    targetLevel: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    curriculumMappingStatus: "verified",
    edition: {
      editionNumber: 1,
      editionName: "First Comprehensive National Edition",
      releaseYear: 2026,
      isbn: "978-978-782-104-5",
      printFormat: "hardcover",
      totalEstimatedPages: 580
    },
    authors: [
      {
        id: "auth-adeleke",
        name: "Dr. O. Adeleke",
        title: "Lead Mathematical Pedagogue",
        affiliation: "Institute of Pure & Applied Mathematics, MOOS TECHY",
        bio: "Specialist in algebraic geometry, Socratic pedagogical scaffolding, and senior secondary curriculum reform.",
        isLeadAuthor: true
      },
      {
        id: "auth-bello",
        name: "Prof. K. Bello",
        title: "Senior Curriculum Consultant",
        affiliation: "National Examination Board Advisory Committee",
        bio: "Over 25 years advising on WASSCE, UTME CBT, and A-Level mathematics curricula.",
        isLeadAuthor: false
      }
    ],
    contributors: [
      {
        id: "cont-1",
        name: "Dr. E. Okafor",
        role: "mathematician",
        institution: "Department of Mathematics, University of Lagos"
      },
      {
        id: "cont-2",
        name: "Mrs. A. Ibrahim",
        role: "curriculum_consultant",
        institution: "Secondary Science Teachers Federation"
      }
    ],
    bookBrief: {
      targetAudienceDescription: "Senior secondary students (SS1-SS3), UTME CBT and WASSCE candidates seeking deep first-principles mathematical mastery.",
      pedagogicalPhilosophy: "Socratic discovery, step-by-step intuitive grounding before algebraic abstraction, and integrated physical-to-digital QR bridging.",
      differentiatingFeatures: [
        "Every major theorem includes visual and intuitive proof sketches.",
        "Graduated 4-tier practice sets: Drill, Conceptual, Applied, and Olympiad/Exam Mastery.",
        "Embedded QR codes connecting directly to digital worked solutions and Tutor Moos AI."
      ],
      prerequisitesRequired: [
        "Junior secondary algebraic fundamentals (linear equations, factorisation).",
        "Euclidean geometry basics and proportional reasoning."
      ]
    },
    parts: [
      {
        id: "part-1",
        partNumber: 1,
        title: "Part I: Pure Algebra, Quadratic Theory & Functions",
        description: "Foundational algebraic structures, quadratics, polynomials, and analytical coordinate methods.",
        chapterIds: ["ch-1", "ch-2", "ch-3", "ch-4"]
      },
      {
        id: "part-2",
        partNumber: 2,
        title: "Part II: Geometry, Trigonometric Analysis & Vectors",
        description: "Circle theorems, trigonometric ratios, sine/cosine laws, and 2D/3D vectors.",
        chapterIds: ["ch-5", "ch-6", "ch-7"]
      },
      {
        id: "part-3",
        partNumber: 3,
        title: "Part III: Introductory Calculus & Mathematical Modeling",
        description: "Limits, first-principles differentiation, tangent curves, and definite integration.",
        chapterIds: ["ch-8", "ch-9"]
      }
    ],
    chapters: [
      {
        id: "ch-3",
        partId: "part-1",
        chapterNumber: 3,
        title: "Quadratic Equations, Factorisation & Discriminant Analysis",
        subtitle: "Algebraic, Graphic, and First-Principles Analytical Methods",
        overviewSummary: "Explores the fundamental properties of degree-2 polynomials, parabolic symmetry, roots nature, and discriminant analysis.",
        curriculumTopicsCovered: [
          "Standard quadratic form ax² + bx + c = 0",
          "Completing the square derivation",
          "Discriminant Δ = b² - 4ac interpretation",
          "Word problems and kinematic modeling"
        ],
        chapterSummaryFormulas: [
          "x = (-b ± √(b² - 4ac)) / 2a",
          "Δ = b² - 4ac (Δ > 0: two real roots; Δ = 0: repeated root; Δ < 0: complex roots)",
          "Vertex coordinates: (-b / 2a, c - b² / 4a)"
        ],
        lifecycleStatus: "human_approved",
        sections: [
          {
            id: "sec-3-1",
            chapterId: "ch-3",
            sectionNumber: "3.1",
            title: "Standard Form & Factorisation Techniques",
            pageReference: "pp. 74-83",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-ALG-03",
            stableQRIdentifier: "CEMM-CH03-SEC01-FAC",
            associatedPlayActivityId: "act-quad-eq",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "obj-3-1-1",
                code: "LO-3.1.1",
                statement: "Identify the coefficients a, b, and c in any standard quadratic equation ax² + bx + c = 0.",
                bloomLevel: "remember"
              },
              {
                id: "obj-3-1-2",
                code: "LO-3.1.2",
                statement: "Factorise quadratic trinomials by finding two numbers whose product is ac and sum is b.",
                bloomLevel: "apply"
              }
            ],
            coreConcepts: [
              {
                id: "c-3-1-1",
                title: "The Zero Product Property",
                formalDefinition: "If ab = 0 for real numbers a and b, then either a = 0, b = 0, or both a = b = 0.",
                intuitiveExplanation: "If two numbers multiply to zero, at least one of them must be completely zero. This is why factoring converts a sum into a product of linear terms.",
                keyFormulas: ["(x - p)(x - q) = 0 ⟹ x = p or x = q"],
                commonMisconceptions: [
                  "Assuming if (x - 2)(x + 3) = 6 then x - 2 = 6 or x + 3 = 6 (Zero Product Property ONLY works when the right-hand side equals 0)."
                ],
                realWorldApplications: ["Projectile trajectory impact points where height h(t) = 0."]
              }
            ],
            workedExamples: [
              {
                id: "we-3-1-1",
                exampleNumber: "Example 3.1",
                title: "Solve 2x² - 5x - 3 = 0 by Factorisation",
                problemStatement: "Find the real roots of 2x² - 5x - 3 = 0 using the ac method.",
                difficulty: "standard",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Compute product ac and target sum b",
                    mathExpression: "ac = 2 × (-3) = -6, \\quad b = -5",
                    detailedReasoning: "We seek two integers whose product is -6 and sum is -5. These integers are -6 and +1.",
                    pedagogicalTip: "Always preserve the correct algebraic signs when multiplying a and c."
                  },
                  {
                    stepNumber: 2,
                    heading: "Split the middle term -5x",
                    mathExpression: "2x² - 6x + 1x - 3 = 0",
                    detailedReasoning: "Express the linear term as the sum of our two found factors."
                  },
                  {
                    stepNumber: 3,
                    heading: "Factor by grouping in pairs",
                    mathExpression: "2x(x - 3) + 1(x - 3) = (2x + 1)(x - 3) = 0",
                    detailedReasoning: "Extract the common binomial factor (x - 3)."
                  },
                  {
                    stepNumber: 4,
                    heading: "Apply Zero Product Property",
                    mathExpression: "2x + 1 = 0 \\implies x = -\\frac{1}{2}, \\quad x - 3 = 0 \\implies x = 3",
                    detailedReasoning: "Set each factor to zero to obtain the two distinct roots."
                  }
                ],
                finalAnswer: "x = -1/2 or x = 3",
                keyTakeaway: "Factorisation is the fastest exact method when rational factors exist."
              }
            ],
            practiceSet: [
              {
                id: "q-3-1-1",
                itemNumber: "Q 3.1.1",
                tier: "drill",
                prompt: "Solve x² - 7x + 12 = 0 by factorisation.",
                hints: ["Find two numbers whose product is 12 and sum is -7.", "Check -3 and -4."],
                fullSolution: "(x - 3)(x - 4) = 0 ⟹ x = 3 or x = 4.",
                targetAnswer: "x = 3, 4"
              }
            ],
            teacherNotes: [
              "Emphasize writing the equation with 0 on one side before attempting factorisation."
            ]
          },
          {
            id: "sec-3-2",
            chapterId: "ch-3",
            sectionNumber: "3.2",
            title: "Completing the Square & Derivation of Quadratic Formula",
            pageReference: "pp. 84-95",
            curriculumStatus: "verified",
            curriculumCodeRef: "WAEC-MTH-ALG-04",
            stableQRIdentifier: "CEMM-CH03-SEC02-EX04",
            associatedPlayActivityId: "act-quad-eq",
            lifecycleStatus: "human_approved",
            learningObjectives: [
              {
                id: "obj-3-2-1",
                code: "LO-3.2.1",
                statement: "Derive the general quadratic formula from first principles using completing the square.",
                bloomLevel: "create"
              },
              {
                id: "obj-3-2-2",
                code: "LO-3.2.2",
                statement: "Evaluate the discriminant Δ = b² - 4ac to characterize roots nature without solving fully.",
                bloomLevel: "analyze"
              }
            ],
            coreConcepts: [
              {
                id: "c-3-2-1",
                title: "Geometric Completing of the Square",
                formalDefinition: "The transformation of x² + bx into (x + b/2)² - (b/2)² by adding and subtracting the square of half the coefficient of x.",
                intuitiveExplanation: "Geometrically, adding the square area (b/2)² completes a square of side (x + b/2).",
                keyFormulas: ["x² + bx + (b/2)² = (x + b/2)²"],
                commonMisconceptions: [
                  "Forgetting to divide through by the coefficient a when a ≠ 1 before adding (b/2a)²."
                ],
                realWorldApplications: ["Converting general conic equations to standard vertex forms."]
              }
            ],
            workedExamples: [
              {
                id: "we-3-2-1",
                exampleNumber: "Example 3.4",
                title: "Derive the Quadratic Formula from ax² + bx + c = 0 (a ≠ 0)",
                problemStatement: "Show step-by-step that ax² + bx + c = 0 leads to x = (-b ± √(b² - 4ac)) / 2a.",
                difficulty: "exam_mastery",
                steps: [
                  {
                    stepNumber: 1,
                    heading: "Divide by a and isolate constant term",
                    mathExpression: "x^2 + \\frac{b}{a}x = -\\frac{c}{a}",
                    detailedReasoning: "Since a ≠ 0, division by a is mathematically valid."
                  },
                  {
                    stepNumber: 2,
                    heading: "Add (b / 2a)² to both sides",
                    mathExpression: "x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2} - \\frac{c}{a}",
                    detailedReasoning: "Adding (b/2a)² completes the perfect square on the left-hand side."
                  },
                  {
                    stepNumber: 3,
                    heading: "Express LHS as binomial square & combine RHS",
                    mathExpression: "\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}",
                    detailedReasoning: "Find a common denominator of 4a² on the right-hand side."
                  },
                  {
                    stepNumber: 4,
                    heading: "Take square root of both sides & solve for x",
                    mathExpression: "x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a} \\implies x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
                    detailedReasoning: "Taking the square root yields both positive and negative roots."
                  }
                ],
                finalAnswer: "x = (-b ± √(b² - 4ac)) / 2a",
                keyTakeaway: "The quadratic formula is not an arbitrary formula; it is the universal algebraic solution."
              }
            ],
            practiceSet: [
              {
                id: "q-3-2-1",
                itemNumber: "Q 3.2.4",
                tier: "exam_style",
                prompt: "Solve 3x² - 5x - 2 = 0 using the quadratic formula. State the value of the discriminant.",
                hints: ["Compute a = 3, b = -5, c = -2.", "Discriminant Δ = (-5)² - 4(3)(-2) = 25 + 24 = 49."],
                fullSolution: "x = (5 ± √49)/6 = (5 ± 7)/6. Thus x = 12/6 = 2 or x = -2/6 = -1/3.",
                targetAnswer: "x = 2, -1/3 (Discriminant = 49)"
              }
            ],
            teacherNotes: [
              "Ensure students practice recognizing perfect squares before memorizing the formula."
            ]
          }
        ],
        chapterReviewQuestions: []
      }
    ],
    totalQRResourcesCount: 24,
    lifecycleStatus: "human_approved",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z",
    lastQualityScore: 98
  },
  {
    id: "tb-cemp-phy",
    code: "CEMP-PHY-S1",
    title: "C.E.M.P Advanced Physics: Principles, Vectors & Mechanics",
    subtitle: "From Newtonian Classical Dynamics to Modern Wave Physics with Interactive Simulators",
    discipline: "physics",
    targetLevel: "senior_secondary",
    curriculumStandard: "WAEC_WASSCE",
    curriculumMappingStatus: "verified",
    edition: {
      editionNumber: 1,
      editionName: "Senior Secondary Physics Treatise",
      releaseYear: 2026,
      isbn: "978-978-782-105-2",
      printFormat: "hardcover",
      totalEstimatedPages: 620
    },
    authors: [
      {
        id: "auth-physics-1",
        name: "Dr. K. Nnamdi",
        title: "Director of Physical Sciences",
        affiliation: "MOOS TECHY Center for STEM Education",
        bio: "Researcher in classical mechanics, vector dynamics, and physics simulation pedagogy.",
        isLeadAuthor: true
      }
    ],
    contributors: [],
    bookBrief: {
      targetAudienceDescription: "Physics students preparing for Senior Secondary certification, UTME CBT, and university STEM entrance.",
      pedagogicalPhilosophy: "Phenomenological intuition followed by vector mathematics and empirical lab simulations.",
      differentiatingFeatures: [
        "Vector decomposition visual diagrams in every chapter.",
        "Direct QR links to interactive kinematics and circuit simulators."
      ],
      prerequisitesRequired: ["Trigonometric ratios (sin, cos, tan), basic algebraic kinematics."]
    },
    parts: [],
    chapters: [],
    totalQRResourcesCount: 18,
    lifecycleStatus: "human_approved",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-18T16:00:00Z",
    lastQualityScore: 96
  }
];

class TextbookStudioService {
  private textbooks: TextbookProject[] = [...SEEDED_TEXTBOOK_PROJECTS];

  public getAllTextbooks(): TextbookProject[] {
    return this.textbooks;
  }

  public getTextbookById(id: string): TextbookProject | undefined {
    return this.textbooks.find((tb) => tb.id === id || tb.code === id);
  }

  public createTextbookProject(project: Partial<TextbookProject>): TextbookProject {
    const newProject: TextbookProject = {
      id: `tb-${Date.now()}`,
      code: project.code || `TB-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      title: project.title || "Untitled Educational Treatise",
      subtitle: project.subtitle || "Comprehensive Educational Treatise",
      discipline: project.discipline || "mathematics",
      targetLevel: project.targetLevel || "senior_secondary",
      curriculumStandard: project.curriculumStandard || "WAEC_WASSCE",
      curriculumMappingStatus: "draft",
      edition: project.edition || {
        editionNumber: 1,
        editionName: "First Draft Edition",
        releaseYear: 2026,
        printFormat: "digital_companion_pdf",
        totalEstimatedPages: 250
      },
      authors: project.authors || [
        {
          id: `auth-${Date.now()}`,
          name: "Educator Author",
          title: "Author & Pedagogue",
          affiliation: "MOOS TECHY Academy Faculty",
          bio: "Specialist educator.",
          isLeadAuthor: true
        }
      ],
      contributors: [],
      bookBrief: project.bookBrief || {
        targetAudienceDescription: "Senior secondary learners.",
        pedagogicalPhilosophy: "Mastery-based Socratic progression.",
        differentiatingFeatures: ["Integrated QR companion resources."],
        prerequisitesRequired: ["Foundational domain concepts."]
      },
      parts: [],
      chapters: [],
      totalQRResourcesCount: 0,
      lifecycleStatus: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.textbooks.unshift(newProject);
    return newProject;
  }

  /**
   * Generates a standardized, deterministic QR identifier
   * e.g. CEMM-CH03-SEC02-EX04
   */
  public generateQRIdentifier(
    bookCode: string,
    chapterNumber: number,
    sectionNumber: string | number,
    suffix?: string
  ): string {
    const baseCode = bookCode.replace(/[^A-Z0-9]/gi, "").substring(0, 4).toUpperCase();
    const chStr = String(chapterNumber).padStart(2, "0");
    const secStr = String(sectionNumber).replace(".", "").padStart(2, "0");
    const sufStr = suffix ? `-${suffix.toUpperCase()}` : "";
    return `${baseCode}-CH${chStr}-SEC${secStr}${sufStr}`;
  }

  public updateSectionContent(
    textbookId: string,
    chapterId: string,
    sectionId: string,
    updatedSection: Partial<TextbookSection>
  ): boolean {
    const textbook = this.getTextbookById(textbookId);
    if (!textbook) return false;

    const chapter = textbook.chapters.find((c) => c.id === chapterId);
    if (!chapter) return false;

    const sectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return false;

    chapter.sections[sectionIndex] = {
      ...chapter.sections[sectionIndex],
      ...updatedSection
    };
    textbook.updatedAt = new Date().toISOString();
    return true;
  }
}

export const textbookStudioService = new TextbookStudioService();
