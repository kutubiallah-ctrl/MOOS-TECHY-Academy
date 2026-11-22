/**
 * MOOS TECHY ACADEMY — UNIVERSITY & TERTIARY PREPARATION CURRICULUM UNITS
 * 
 * Substantive 100-level university transition modules covering:
 * - Linear Algebra: Matrix Operations, Determinants & Vector Spaces
 * - Advanced Calculus: Limits, Continuity & Partial Differentiation
 * - Formal Mathematical Logic & Proof by Induction
 * - Scientific Research Foundations & Empirical Analysis
 */

import { Unit } from "../types/curriculum";

export const UNIVERSITY_TERTIARY_CURRICULUM_UNITS: Unit[] = [
  {
    id: "unit-uni-linear-algebra",
    subjectId: "math_calculus",
    level: "university_prep",
    title: "Linear Algebra: Matrices, Systems of Equations & Vector Spaces",
    code: "UNI-MTH-101",
    description: "Matrix multiplication, row operations, Gaussian elimination, determinants, inverse matrices, and linear independence in vector spaces.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-uni-matrix-determinants",
        unitId: "unit-uni-linear-algebra",
        title: "Matrix Operations, Determinants & Inverses",
        code: "SKL-UNI-201",
        summary: "Computing 2x2 and 3x3 determinants, matrix products, and applying Cramer's rule to solve systems of linear equations.",
        objectives: [
          "Perform matrix multiplication AB where inner dimensions match (m×k by k×n)",
          "Compute the determinant of 2×2 and 3×3 matrices using cofactor expansion",
          "Apply the condition det(A) ≠ 0 to verify non-singularity and calculate the inverse matrix A⁻¹"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-uni-matrix-det",
          title: "Matrix Multiplication, Determinants & Linear Systems",
          hookAndIntuition: "In 3D graphics rendering (e.g. video game engines or robotics kinematics), every rotation, zoom, and perspective tilt of an object is executed in real time by multiplying 3D coordinate vectors by 4x4 transformation matrices.",
          conceptualExplanation: "A matrix is a rectangular array of numbers representing linear transformations. Matrix multiplication is non-commutative: AB ≠ BA in general. The determinant of a square matrix det(A) is a scalar value that encodes the geometric scaling factor of the transformation. If det(A) = 0, the matrix is singular (non-invertible) and collapses space into lower dimensions.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Determinant of 2x2 Matrix",
              definition: "\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
              practicalExample: "If det = 0, the rows are linearly dependent and no unique inverse exists."
            },
            {
              termOrSymbol: "Inverse of 2x2 Matrix",
              definition: "A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}, \\quad \\text{for } ad - bc \\neq 0",
              practicalExample: "Multiplying A by A⁻¹ yields the Identity matrix I."
            }
          ],
          workedExamples: [
            {
              title: "Solving a 2x2 Linear System Using Matrix Inverses",
              problemStatement: "Solve the linear system for x and y using matrix inversion: 2x + 3y = 8 and 4x - y = 2.",
              mathExpression: "\\begin{pmatrix} 2 & 3 \\\\ 4 & -1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ 2 \\end{pmatrix}",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute the determinant of the coefficient matrix A",
                  reasoning: "det(A) = (2)(-1) - (3)(4) = -2 - 12 = -14. Since -14 ≠ 0, A is non-singular and invertible."
                },
                {
                  stepNumber: 2,
                  instruction: "Formulate the inverse matrix A⁻¹",
                  reasoning: "A⁻¹ = (1 / -14) * [[-1, -3], [-4, 2]] = [[1/14, 3/14], [4/14, -2/14]]."
                },
                {
                  stepNumber: 3,
                  instruction: "Multiply A⁻¹ by the constant vector B = [[8], [2]]",
                  reasoning: "x = (1/14)(8) + (3/14)(2) = (8 + 6)/14 = 14/14 = 1. y = (4/14)(8) + (-2/14)(2) = (32 - 4)/14 = 28/14 = 2."
                }
              ],
              takeawayRule: "For AX = B with det(A) ≠ 0, the unique solution vector is X = A⁻¹B."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming matrix multiplication is commutative (AB = BA)",
              whyItIsWrong: "Matrix dimensions and row-column dot products depend strictly on ordering. Even when AB exists, BA may not be defined or yields a completely different matrix.",
              correctCorrection: "Always preserve strict matrix multiplication order."
            }
          ],
          guidedPracticePrompt: "Calculate the determinant of [[3, 5], [1, 2]] and determine if it is invertible.",
          diagnosticSelfCheck: "What does it mean geometrically if a matrix transformation has a determinant of zero?",
          summaryRecap: "Matrices encode multi-dimensional linear maps. Invertibility hinges on non-zero determinants, enabling systematic solutions to engineering and computational linear systems."
        },
        questions: [
          {
            id: "q-uni-mat-1",
            type: "multiple_choice",
            questionText: "What is the determinant of the 2x2 matrix A = [[5, 2], [7, 4]]?",
            mathExpression: "\\det(A) = (5)(4) - (2)(7) = 20 - 14",
            options: ["6", "14", "20", "-6"],
            correctAnswer: "6",
            explanation: "det(A) = ad - bc = (5)(4) - (2)(7) = 20 - 14 = 6.",
            hintLadder: [
              "Multiply main diagonal entries: 5 × 4 = 20.",
              "Multiply off-diagonal entries: 2 × 7 = 14.",
              "Subtract: 20 - 14 = 6."
            ],
            misconceptionAlerts: [
              { trigger: "-6", note: "Did you reverse the order of subtraction? It must be main diagonal (ad) minus off-diagonal (bc)." }
            ],
            skillId: "skill-uni-matrix-determinants",
            difficulty: "easy"
          },
          {
            id: "q-uni-mat-2",
            type: "multiple_choice",
            questionText: "For what value of k will the matrix M = [[k, 6], [2, 3]] be singular (i.e., have no inverse)?",
            mathExpression: "\\det(M) = 3k - (6)(2) = 0 \\implies 3k = 12 \\implies k = 4",
            options: ["k = 4", "k = 1", "k = 6", "k = 0"],
            correctAnswer: "k = 4",
            explanation: "A matrix is singular when its determinant equals zero: det(M) = (k)(3) - (6)(2) = 3k - 12 = 0 -> 3k = 12 -> k = 4.",
            hintLadder: [
              "Recall the condition for singularity: det(M) = 0.",
              "Set ad - bc = 0: (k)(3) - (6)(2) = 0.",
              "Solve 3k - 12 = 0 for k."
            ],
            misconceptionAlerts: [
              { trigger: "k = 0", note: "A matrix can be non-singular even if an entry is zero. Singularity requires the determinant ad - bc = 0." }
            ],
            skillId: "skill-uni-matrix-determinants",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-uni-limits-continuity",
    subjectId: "math_calculus",
    level: "university_prep",
    title: "Rigorous Analysis: Limits, Continuity & Partial Derivatives",
    code: "UNI-MTH-102",
    description: "Formal epsilon-delta definition of limits, continuity on intervals, L'Hôpital's Rule for indeterminate forms, and multivariable partial differentiation.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-uni-lhopital-partials",
        unitId: "unit-uni-limits-continuity",
        title: "L'Hôpital's Rule & Multivariable Partial Derivatives",
        code: "SKL-UNI-202",
        summary: "Evaluating 0/0 and ∞/∞ indeterminate limits using L'Hôpital's Rule and taking partial derivatives ∂f/∂x and ∂f/∂y.",
        objectives: [
          "Evaluate indeterminate limit forms (0/0 and ∞/∞) using L'Hôpital's Rule: lim f(x)/g(x) = lim f'(x)/g'(x)",
          "Compute first and second-order partial derivatives of multivariable functions f(x, y)",
          "Apply Clairaut's Theorem: ∂²f/∂x∂y = ∂²f/∂y∂x for continuous mixed partials"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-uni-lhopital-partials",
          title: "L'Hôpital's Rule & Partial Derivatives",
          hookAndIntuition: "In physical chemistry and thermodynamics, the pressure P of a gas depends on both volume V and temperature T simultaneously: P(V, T). To find how pressure responds to temperature while volume is held constant in a sealed cylinder, we take the partial derivative ∂P/∂T.",
          conceptualExplanation: "When calculating limits of quotients, substitution often yields indeterminate forms like 0/0 or ∞/∞. L'Hôpital's Rule states that if f and g are differentiable, the limit of f(x)/g(x) equals the limit of their derivatives f'(x)/g'(x). When transitioning to functions of several variables z = f(x, y), a partial derivative treats all other variables as constants while differentiating with respect to the active variable.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "L'Hôpital's Rule",
              definition: "\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}, \\quad \\text{if form is } \\frac{0}{0} \\text{ or } \\frac{\\infty}{\\infty}",
              practicalExample: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1."
            },
            {
              termOrSymbol: "Partial Derivative",
              definition: "\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x, y)}{h}",
              practicalExample: "For f(x, y) = x³y², ∂f/∂x = 3x²y² and ∂f/∂y = 2x³y."
            }
          ],
          workedExamples: [
            {
              title: "Applying L'Hôpital's Rule to an Indeterminate Limit",
              problemStatement: "Evaluate the limit: lim_{x -> 0} (e^(2x) - 1 - 2x) / x².",
              mathExpression: "\\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x}{x^2}",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Verify if direct substitution produces an indeterminate form",
                  reasoning: "Numerator: e^0 - 1 - 0 = 1 - 1 = 0. Denominator: 0² = 0. Form is 0/0, so L'Hôpital's Rule applies."
                },
                {
                  stepNumber: 2,
                  instruction: "Differentiate numerator and denominator with respect to x",
                  reasoning: "f'(x) = 2e^(2x) - 2. g'(x) = 2x. Limit is lim_{x -> 0} (2e^(2x) - 2) / (2x)."
                },
                {
                  stepNumber: 3,
                  instruction: "Check form again: 2(1) - 2 = 0 in numerator, 2(0) = 0 in denominator. Apply L'Hôpital a second time",
                  reasoning: "f''(x) = 4e^(2x). g''(x) = 2. Now evaluate: lim_{x -> 0} (4e^(2x)) / 2 = 4(1) / 2 = 2."
                }
              ],
              takeawayRule: "L'Hôpital's Rule can be applied sequentially as long as the quotient remains strictly indeterminate (0/0 or ∞/∞)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Using the Quotient Rule instead of differentiating numerator and denominator separately in L'Hôpital's Rule",
              whyItIsWrong: "L'Hôpital's Rule takes f'(x) / g'(x), NOT the derivative of the quotient d/dx [f/g].",
              correctCorrection: "Differentiate the top independently, differentiate the bottom independently."
            }
          ],
          guidedPracticePrompt: "Given z = 4x²y³ - 5xy + 7, find ∂z/∂x and ∂z/∂y.",
          diagnosticSelfCheck: "Can L'Hôpital's Rule be applied if direct substitution gives 0/5?",
          summaryRecap: "Advanced analysis provides rigorous tools: L'Hôpital resolves indeterminate limits, while partial derivatives unlock multivariable physics, optimization, and engineering."
        },
        questions: [
          {
            id: "q-uni-lim-1",
            type: "multiple_choice",
            questionText: "Evaluate the limit using L'Hôpital's Rule: lim_{x -> 0} (sin(3x)) / (2x).",
            mathExpression: "\\lim_{x \\to 0} \\frac{\\sin(3x)}{2x} = \\lim_{x \\to 0} \\frac{3\\cos(3x)}{2}",
            options: ["3/2", "0", "1", "Does not exist"],
            correctAnswer: "3/2",
            explanation: "Direct substitution yields 0/0. Applying L'Hôpital: d/dx[sin(3x)] = 3cos(3x), d/dx[2x] = 2. As x -> 0, (3cos(0)) / 2 = 3(1) / 2 = 3/2.",
            hintLadder: [
              "Check that direct substitution yields 0/0.",
              "Differentiate numerator: derivative of sin(3x) is 3cos(3x).",
              "Differentiate denominator: derivative of 2x is 2. Then substitute x = 0."
            ],
            misconceptionAlerts: [
              { trigger: "0", note: "Remember cos(0) = 1, so 3cos(0) = 3, not 0." }
            ],
            skillId: "skill-uni-lhopital-partials",
            difficulty: "medium"
          },
          {
            id: "q-uni-lim-2",
            type: "multiple_choice",
            questionText: "Given the multivariable function f(x, y) = 2x³y² + 5x² - 3y⁴, what is the partial derivative ∂f/∂x?",
            mathExpression: "\\frac{\\partial f}{\\partial x} = 6x^2y^2 + 10x - 0",
            options: [
              "6x²y² + 10x",
              "4x³y - 12y³",
              "6x²y² + 10x - 12y³",
              "2x²y² + 10x"
            ],
            correctAnswer: "6x²y² + 10x",
            explanation: "When taking ∂f/∂x, treat y as a constant. d/dx[2x³y²] = 6x²y², d/dx[5x²] = 10x, and d/dx[-3y⁴] = 0 (since it has no x). Thus ∂f/∂x = 6x²y² + 10x.",
            hintLadder: [
              "Treat y as a constant number.",
              "Differentiate 2x³ to get 6x², keeping y² attached.",
              "Differentiate 5x² to get 10x. The -3y⁴ term vanishes because it contains no x."
            ],
            misconceptionAlerts: [
              { trigger: "6x²y² + 10x - 12y³", note: "Did you differentiate the y⁴ term? In ∂f/∂x, terms containing only y have a derivative of zero." }
            ],
            skillId: "skill-uni-lhopital-partials",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];
