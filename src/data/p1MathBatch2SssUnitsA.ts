import { Unit } from "../types/curriculum";

export const P1_MATH_BATCH2_SSS_UNITS_A: Unit[] = [
  // =========================================================================
  // 1. sss_250_mathematics_calculus_vectors_differe
  // =========================================================================
  {
    id: "unit-p1-sss-calculus-vectors-ode",
    subjectId: "sss_250_mathematics_calculus_vectors_differe",
    level: "senior_secondary",
    title: "Calculus (Chain/Product Rules), 3D Vectors & Separable ODEs",
    code: "SSS-CAL-250",
    description:
      "Master differentiation by chain/product/quotient rules, definite area integrals, 3D vector dot products and orthogonal projections, and separable first-order differential equations.",
    order: 12,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-CAL-250",
      "JAMB_UTME:MTH-CAL-ODE",
      "CAMBRIDGE_ALEVEL:MAT-VEC-ODE"
    ],
    skills: [
      {
        id: "skill-sss-calculus-vectors-ode",
        unitId: "unit-p1-sss-calculus-vectors-ode",
        title: "Multivariable Vectors, Differentiation Rules & Separable ODEs",
        code: "SKL-SSS-CAL-250",
        summary:
          "Apply product/chain differentiation, dot-product angle tests (a·b = 0), definite integration, and variable-separation dy/dx = f(x)g(y).",
        objectives: [
          "Differentiate composite and product functions accurately and locate stationary extrema",
          "Compute 3D vector magnitudes, unit vectors, and dot-product orthogonality conditions",
          "Solve initial-value separable differential equations dy/dx = ky and dy/dx = g(x)/h(y)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-derivatives", "skill-indefinite-definite-integration"],
        lesson: {
          id: "les-sss-calculus-vectors-ode",
          title: "Advanced Calculus, 3D Vectors & Separable ODEs",
          hookAndIntuition:
            "Rocket guidance computes trajectory slope via chain derivatives, verifies perpendicular thrust via dot products (a·b = 0), and predicts fuel burn by separating variables in differential equations.",
          conceptualExplanation:
            "Composite functions f(g(x)) differentiate via the Chain Rule: d/dx[f(g(x))] = f'(g(x)) · g'(x), while products u(x)v(x) obey (uv)' = u'v + uv'. Setting f'(x) = 0 identifies stationary points classified by f''(x) < 0 (local maximum) or f''(x) > 0 (local minimum).\n\nIn 3D space, vector a = a₁i + a₂j + a₃k has magnitude |a| = √(a₁² + a₂² + a₃²) and dot product a·b = a₁b₁ + a₂b₂ + a₃b₃ = |a||b|cos θ; two non-zero vectors are perpendicular if and only if a·b = 0. Separable ODEs dy/dx = f(x)g(y) rearrange into (1/g(y)) dy = f(x) dx, integrate both sides with constant C, and lock C from initial condition y(x₀) = y₀.",
          conceptualModel:
            "Chain: f'(g(x))g'(x) | Product: u'v + uv' | Orthogonal Vectors: a·b = 0 | Separable ODE: ∫ dy/g(y) = ∫ f(x) dx + C.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Chain & Product Rules: (u∘v)' = u'(v)v', (uv)' = u'v + uv'",
              definition: "Exact derivative rules for nested functions and products of differentiable functions.",
              practicalExample: "d/dx[(3x² + 1)⁴] = 4(3x² + 1)³ · 6x = 24x(3x² + 1)³."
            },
            {
              termOrSymbol: "Dot Product & Orthogonality: a · b = |a||b|cos θ",
              definition: "Non-zero vectors are orthogonal (90°) precisely when Σ aᵢbᵢ = 0.",
              practicalExample: "(2i − 3j + k) · (i + 2j + 4k) = 2 − 6 + 4 = 0 ⇒ vectors are perpendicular."
            },
            {
              termOrSymbol: "Separable Growth ODE: dy/dx = ky ⇒ y(x) = y₀ e^(kx)",
              definition: "Rate of change proportional to current amount produces exponential growth or decay.",
              practicalExample: "If dy/dx = 0.2y and y(0) = 50, then y(x) = 50e^(0.2x)."
            }
          ],
          workedExamples: [
            {
              title: "Orthogonal 3D Vector Parameter & Unit Vector",
              problemStatement: "Vectors u = 3i − 2j + 6k and v = 4i + pj − 2k are perpendicular. Find parameter p and the unit vector û in the direction of u.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Apply orthogonality condition u · v = 0.",
                  reasoning: "(3)(4) + (−2)(p) + (6)(−2) = 0 ⇒ 12 − 2p − 12 = 0."
                },
                {
                  stepNumber: 2,
                  instruction: "Solve linearly for p.",
                  reasoning: "−2p = 0 ⇒ p = 0."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute magnitude |u| = √(3² + (−2)² + 6²).",
                  reasoning: "|u| = √(9 + 4 + 36) = √49 = 7."
                },
                {
                  stepNumber: 4,
                  instruction: "Divide vector u by scalar magnitude |u| = 7.",
                  reasoning: "û = (3/7)i − (2/7)j + (6/7)k."
                }
              ],
              takeawayRule: "Dot product outputs a SCALAR (not a vector); zero scalar proves perpendicularity."
            },
            {
              title: "Solving an Initial-Value Separable Differential Equation",
              problemStatement: "Solve dy/dx = 2x / y given that y = 5 when x = 3 (with y > 0).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Separate y-terms onto the left and x-terms onto the right.",
                  reasoning: "y dy = 2x dx."
                },
                {
                  stepNumber: 2,
                  instruction: "Integrate both sides indefinitely, introducing one constant C.",
                  reasoning: "∫ y dy = ∫ 2x dx ⇒ ½y² = x² + C, or y² = 2x² + K (where K = 2C)."
                },
                {
                  stepNumber: 3,
                  instruction: "Substitute initial condition (x = 3, y = 5) to lock constant K.",
                  reasoning: "5² = 2(3²) + K ⇒ 25 = 18 + K ⇒ K = 7."
                },
                {
                  stepNumber: 4,
                  instruction: "Take the positive branch y > 0 to write y explicitly.",
                  reasoning: "y = √(2x² + 7)."
                }
              ],
              takeawayRule: "Solve for integration constant C immediately after integrating using the initial point before algebraic rearrangement."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting the inner derivative g'(x) when applying the Chain Rule to (3x + 2)⁵.",
              whyItIsWrong: "Writing 5(3x + 2)⁴ omits the scaling factor 3 from d/dx(3x + 2).",
              correctCorrection: "Always multiply by the inner derivative: 5(3x + 2)⁴ · 3 = 15(3x + 2)⁴."
            },
            {
              misconception: "Setting dy/dx = x + y as separable by writing y dy = x dx.",
              whyItIsWrong: "Separation requires a product/quotient f(x)g(y), never an unfactored sum x + y.",
              correctCorrection: "Factor dy/dx into f(x)·g(y) before separating differentials."
            }
          ],
          guidedPracticePrompt: "Differentiate y = x² e^(3x) using the product and chain rules.",
          independentPracticePrompt: "Find the angle θ between a = i + 2j + 2k and b = 2i + j − 2k using cos θ = (a·b)/(|a||b|).",
          extensionActivity: "Evaluate ∫₀² (3x² − 4x + 5) dx and verify the Fundamental Theorem of Calculus.",
          diagnosticSelfCheck: "What is the dot product of orthogonal vectors (4, −1, 2) and (1, 6, 1)?",
          transferApplication: "Model capacitor discharge dV/dt = −V/(RC) to derive V(t) = V₀ e^(−t/RC).",
          masteryAssessment: "Find the minimum value of f(x) = x³ − 12x on [0, 5] and verify using f''(x).",
          summaryRecap: "Combine chain/product rules for extrema, use dot products to test 90° orthogonality, and integrate separated differentials before fitting C.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-cal-1",
            type: "multiple_choice",
            questionText: "Find the derivative dy/dx of the composite function y = (2x³ − 5)⁴.",
            mathExpression: "\\frac{d}{dx}[(2x^3 - 5)^4]",
            options: ["24x²(2x³ − 5)³", "4(2x³ − 5)³", "6x²(2x³ − 5)³", "24x³(2x³ − 5)³"],
            correctAnswer: "24x²(2x³ − 5)³",
            explanation: "Chain rule: 4(2x³ − 5)³ × d/dx(2x³ − 5) = 4(2x³ − 5)³ × 6x² = 24x²(2x³ − 5)³.",
            hintLadder: [
              "Differentiate outer power u⁴ to get 4u³.",
              "Multiply by inner derivative d/dx(2x³ − 5) = 6x².",
              "4 × 6x² = 24x²."
            ],
            misconceptionAlerts: [
              { trigger: "4(2x³ − 5)³", note: "You omitted multiplying by the inner derivative 6x²." }
            ],
            skillId: "skill-sss-calculus-vectors-ode",
            difficulty: "easy"
          },
          {
            id: "q-sss-cal-2",
            type: "multiple_choice",
            questionText: "Find the scalar value k if vectors a = 2i + kj − 3k and b = 5i − 2j + 4k are orthogonal (perpendicular).",
            mathExpression: "\\mathbf{a} \\cdot \\mathbf{b} = 0",
            options: ["-1", "1", "11", "-11"],
            correctAnswer: "-1",
            explanation: "Orthogonality gives 2(5) + k(−2) + (−3)(4) = 0 ⇒ 10 − 2k − 12 = 0 ⇒ −2k = 2 ⇒ k = −1.",
            hintLadder: [
              "Multiply corresponding components and set sum to 0.",
              "10 − 2k − 12 = 0.",
              "Solve −2k = 2."
            ],
            misconceptionAlerts: [
              { trigger: "1", note: "Check sign: 10 − 12 = −2, so −2 − 2k = 0 gives k = −1." }
            ],
            skillId: "skill-sss-calculus-vectors-ode",
            difficulty: "easy"
          },
          {
            id: "q-sss-cal-3",
            type: "multiple_choice",
            questionText: "Evaluate the definite integral of 6x² − 4x + 1 from x = 1 to x = 3.",
            mathExpression: "\\int_1^3 (6x^2 - 4x + 1)\\,dx",
            options: ["38", "42", "36", "40"],
            correctAnswer: "38",
            explanation: "Antiderivative F(x) = 2x³ − 2x² + x. F(3) = 54 − 18 + 3 = 39; F(1) = 2 − 2 + 1 = 1. Integral = 39 − 1 = 38.",
            hintLadder: [
              "Integrate term by term: 2x³ − 2x² + x.",
              "Evaluate at upper bound x = 3: 2(27) − 2(9) + 3 = 39.",
              "Subtract lower bound at x = 1: 39 − 1."
            ],
            misconceptionAlerts: [
              { trigger: "39", note: "Remember to subtract F(1) = 1 from F(3) = 39." }
            ],
            skillId: "skill-sss-calculus-vectors-ode",
            difficulty: "medium"
          },
          {
            id: "q-sss-cal-4",
            type: "multiple_choice",
            questionText: "Find the unit vector in the direction of v = 6i − 2j + 3k.",
            mathExpression: "\\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{|\\mathbf{v}|}",
            options: [
              "(6/7)i − (2/7)j + (3/7)k",
              "(6/11)i − (2/11)j + (3/11)k",
              "(6/49)i − (2/49)j + (3/49)k",
              "(3/7)i − (1/7)j + (3/7)k"
            ],
            correctAnswer: "(6/7)i − (2/7)j + (3/7)k",
            explanation: "Magnitude |v| = √(6² + (−2)² + 3²) = √(36 + 4 + 9) = √49 = 7. Dividing each component by 7 gives (6/7)i − (2/7)j + (3/7)k.",
            hintLadder: [
              "Compute vector length |v| = √(6² + 2² + 3²).",
              "√(36 + 4 + 9) = √49 = 7.",
              "Divide each component of v by 7."
            ],
            misconceptionAlerts: [
              { trigger: "(6/49)i − (2/49)j + (3/49)k", note: "49 is |v|²; take the square root to get |v| = 7." }
            ],
            skillId: "skill-sss-calculus-vectors-ode",
            difficulty: "medium"
          },
          {
            id: "q-sss-cal-5",
            type: "multiple_choice",
            questionText: "Solve the separable initial-value problem dy/dx = 3x² y with y(0) = 4.",
            mathExpression: "\\frac{dy}{dx} = 3x^2 y,\\quad y(0) = 4",
            options: [
              "y = 4e^(x³)",
              "y = 4 + e^(x³)",
              "y = 4e^(3x³)",
              "y = 12e^(x³)"
            ],
            correctAnswer: "y = 4e^(x³)",
            explanation: "Separating: (1/y) dy = 3x² dx ⇒ ln|y| = x³ + C ⇒ y = A e^(x³). Using y(0) = 4 gives A e⁰ = 4 ⇒ A = 4, so y = 4e^(x³).",
            hintLadder: [
              "Divide by y and multiply by dx: (1/y) dy = 3x² dx.",
              "Integrate both sides: ln|y| = x³ + C.",
              "Exponentiate to y = A e^(x³) and set x = 0, y = 4."
            ],
            misconceptionAlerts: [
              { trigger: "y = 4 + e^(x³)", note: "Exponential constants multiply (Ae^(x³)), rather than adding, when solving ln|y| = x³ + C." }
            ],
            skillId: "skill-sss-calculus-vectors-ode",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. sss_251_mathematics_matrices_determinants_li
  // =========================================================================
  {
    id: "unit-p1-sss-matrices-linear-transforms",
    subjectId: "sss_251_mathematics_matrices_determinants_li",
    level: "senior_secondary",
    title: "Matrices, 2×2 & 3×3 Determinants, Inverses & Linear Transformations",
    code: "SSS-MAT-251",
    description:
      "Master matrix multiplication order, singular matrix determinants (det = 0), 2×2 inverse solving AX = B, 3×3 cofactors/Cramer's Rule, and 2D linear transformation matrices.",
    order: 13,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-MAT-251",
      "JAMB_UTME:MTH-MAT-DET",
      "CAMBRIDGE_ALEVEL:MAT-LIN-ALG"
    ],
    skills: [
      {
        id: "skill-sss-matrices-linear-transforms",
        unitId: "unit-p1-sss-matrices-linear-transforms",
        title: "Matrix Inverses, 3×3 Determinants & Linear Maps",
        code: "SKL-SSS-MAT-251",
        summary:
          "Compute 2×2/3×3 determinants, invert non-singular matrices to solve linear systems, and deduce geometric transformation matrices from unit basis images.",
        objectives: [
          "Verify dimension compatibility (m×n)(n×p) = m×p and non-commutativity AB ≠ BA",
          "Compute 2×2 inverse A⁻¹ = (1/(ad−bc))[[d,−b],[−c,a]] and detect singular matrices (det = 0)",
          "Construct 2×2 transformation matrices using column images of e₁ = (1,0) and e₂ = (0,1) and scale area by |det M|"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-matrix-operations", "skill-jss-transformations-loci"],
        lesson: {
          id: "les-sss-matrices-linear-transforms",
          title: "Matrices, Determinants & Linear Transformations",
          hookAndIntuition:
            "Every 3D video game frame, robotics arm inverse kinematics solver, and economic input-output forecast runs on matrix multiplication and determinants.",
          conceptualExplanation:
            "Two matrices A(m×n) and B(p×q) multiply only when inner dimensions match (n = p), producing an m×q matrix where AB ≠ BA in general. A square matrix A = [[a, b], [c, d]] has determinant Δ = ad − bc. When Δ = 0, A is singular (non-invertible) and collapses 2D space onto a line or point. When Δ ≠ 0, its inverse is A⁻¹ = (1/Δ)[[d, −b], [−c, a]] (swap main diagonal, negate off-diagonal, divide by Δ), solving AX = B cleanly via X = A⁻¹B.\n\nGeometrically, any 2×2 linear transformation matrix M is uniquely built from where it sends unit basis vectors i = [1, 0]ᵀ (Column 1) and j = [0, 1]ᵀ (Column 2): M = [M(i) | M(j)]. Moreover, the absolute determinant |det M| equals the exact area scale factor of any transformed polygon.",
          conceptualModel:
            "det = ad − bc | Singular ⇔ det = 0 | A⁻¹ = (1/Δ)[[d,−b],[−c,a]] | M = [Image(1,0) | Image(0,1)] | Area' = |det M|·Area.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "2×2 Inverse: A⁻¹ = (1/(ad−bc)) [[d, −b], [−c, a]]",
              definition: "Exists if and only if ad − bc ≠ 0; satisfies A⁻¹A = I₂.",
              practicalExample: "If A = [[4, 3], [2, 2]], det = 8 − 6 = 2, so A⁻¹ = ½[[2, −3], [−2, 4]]."
            },
            {
              termOrSymbol: "Basis-Column Theorem: M = [M(i)  M(j)]",
              definition: "Column 1 is image of (1, 0); Column 2 is image of (0, 1).",
              practicalExample: "Reflection in y = x sends (1,0)→(0,1) and (0,1)→(1,0), yielding [[0, 1], [1, 0]]."
            },
            {
              termOrSymbol: "3×3 Determinant Expansion (Row 1)",
              definition: "a₁₁(a₂₂a₃₃ − a₂₃a₃₂) − a₁₂(a₂₁a₃₃ − a₂₃a₃₁) + a₁₃(a₂₁a₃₂ − a₂₂a₃₁).",
              practicalExample: "Determinant equals zero whenever rows or columns are linearly dependent."
            }
          ],
          workedExamples: [
            {
              title: "Solving a 2×2 Linear System via Matrix Inversion",
              problemStatement: "Solve 5x + 3y = 14 and 3x + 2y = 9 by writing AX = B and computing A⁻¹.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Assemble coefficient matrix A, unknown vector X, and RHS vector B.",
                  reasoning: "A = [[5, 3], [3, 2]], X = [x, y]ᵀ, B = [14, 9]ᵀ."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute determinant Δ = ad − bc.",
                  reasoning: "Δ = 5(2) − 3(3) = 10 − 9 = 1 (non-singular, so unique solution exists)."
                },
                {
                  stepNumber: 3,
                  instruction: "Form A⁻¹ = (1/Δ)[[d, −b], [−c, a]].",
                  reasoning: "A⁻¹ = (1/1)[[2, −3], [−3, 5]] = [[2, −3], [−3, 5]]."
                },
                {
                  stepNumber: 4,
                  instruction: "Multiply X = A⁻¹B on the left.",
                  reasoning: "x = 2(14) + (−3)(9) = 28 − 27 = 1; y = (−3)(14) + 5(9) = −42 + 45 = 3. Thus (x, y) = (1, 3)."
                }
              ],
              takeawayRule: "Always left-multiply X = A⁻¹B (never BA⁻¹), because matrix multiplication order matters."
            },
            {
              title: "Building a Composite 2D Transformation Matrix & Area Scale",
              problemStatement: "Find the single 2×2 matrix M representing a horizontal shear (x, y) → (x + 2y, y) followed by reflection across the x-axis, and find the new area of a 10 cm² square.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Write Shear matrix S and Reflection matrix R using images of (1,0) and (0,1).",
                  reasoning: "S sends (1,0)→(1,0) and (0,1)→(2,1) ⇒ S = [[1, 2], [0, 1]]. Reflection sends (1,0)→(1,0) and (0,1)→(0,−1) ⇒ R = [[1, 0], [0, −1]]."
                },
                {
                  stepNumber: 2,
                  instruction: "Compose S FIRST then R by multiplying M = R · S (right-to-left).",
                  reasoning: "M = [[1, 0], [0, −1]] [[1, 2], [0, 1]] = [[1, 2], [0, −1]]."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute determinant det(M).",
                  reasoning: "det(M) = (1)(−1) − (2)(0) = −1."
                },
                {
                  stepNumber: 4,
                  instruction: "Interpret |det(M)| as the area multiplier.",
                  reasoning: "Area' = |−1| × 10 = 10 cm² (negative sign simply flips orientation)."
                }
              ],
              takeawayRule: "Apply transformations right-to-left: 'S followed by R' equals R · S."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Negating the main diagonal or keeping signs unchanged when inverting [[a, b], [c, d]].",
              whyItIsWrong: "You must swap (a ↔ d) and negate ONLY the off-diagonal (b → −b, c → −c).",
              correctCorrection: "Check A · A⁻¹ = I₂ mentally on the top-left entry: ad − bc divided by (ad − bc) = 1."
            },
            {
              misconception: "Multiplying composite transformation matrices left-to-right (S·R instead of R·S).",
              whyItIsWrong: "Vectors sit on the right (R(S(v))), so S acts on v first.",
              correctCorrection: "For 'Transform 1 followed by Transform 2', compute T₂ · T₁."
            }
          ],
          guidedPracticePrompt: "Find k so matrix [[k, 4], [3, k−1]] is singular.",
          independentPracticePrompt: "Compute determinant of [[2, 1, 0], [3, 4, 1], [1, 2, 1]].",
          extensionActivity: "Prove (AB)⁻¹ = B⁻¹A⁻¹ by multiplying (AB)(B⁻¹A⁻¹).",
          diagnosticSelfCheck: "What transformation does [[0, −1], [1, 0]] represent geometrically?",
          transferApplication: "Use Cramer's rule to solve two-loop Kirchhoff circuit currents I₁ and I₂.",
          masteryAssessment: "A triangle of area 14 cm² is mapped by [[3, 1], [1, 2]]. Find the image area.",
          summaryRecap: "Determinant zero marks singularity; A⁻¹ = (1/Δ)[[d,−b],[−c,a]] solves linear systems; basis columns build transformation matrices whose |det| scales area.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-mat-1",
            type: "multiple_choice",
            questionText: "For what value(s) of x is the matrix M = [[x, 6], [2, 3]] singular (non-invertible)?",
            mathExpression: "\\det\\begin{pmatrix} x & 6 \\\\ 2 & 3 \\end{pmatrix} = 0",
            options: ["x = 4", "x = 9", "x = -4", "x = 12"],
            correctAnswer: "x = 4",
            explanation: "A matrix is singular when det = 0: 3x − 12 = 0 ⇒ 3x = 12 ⇒ x = 4.",
            hintLadder: [
              "Set determinant ad − bc equal to zero.",
              "3x − (6)(2) = 0.",
              "Solve 3x = 12."
            ],
            misconceptionAlerts: [
              { trigger: "x = -4", note: "Determinant subtracts bc: 3x − 12 = 0 gives +4, not −4." }
            ],
            skillId: "skill-sss-matrices-linear-transforms",
            difficulty: "easy"
          },
          {
            id: "q-sss-mat-2",
            type: "multiple_choice",
            questionText: "Find the inverse A⁻¹ of the matrix A = [[5, 2], [7, 3]].",
            mathExpression: "A^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
            options: [
              "[[3, -2], [-7, 5]]",
              "[[3, 2], [7, 5]]",
              "[[-5, 2], [7, -3]]",
              "[[5, -2], [-7, 3]]"
            ],
            correctAnswer: "[[3, -2], [-7, 5]]",
            explanation: "det(A) = 5(3) − 2(7) = 15 − 14 = 1. Swapping 5 and 3 and negating 2 and 7 yields [[3, −2], [−7, 5]].",
            hintLadder: [
              "Compute determinant: 5×3 − 2×7 = 1.",
              "Swap main diagonal entries 5 and 3.",
              "Negate off-diagonal entries 2 and 7."
            ],
            misconceptionAlerts: [
              { trigger: "[[5, -2], [-7, 3]]", note: "Remember to swap the main diagonal elements 5 and 3 as well." }
            ],
            skillId: "skill-sss-matrices-linear-transforms",
            difficulty: "easy"
          },
          {
            id: "q-sss-mat-3",
            type: "multiple_choice",
            questionText: "Evaluate the 3×3 determinant: | [2, 1, 3], [0, 4, 2], [0, 1, 5] |.",
            mathExpression: "\\det\\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 2 \\\\ 0 & 1 & 5 \\end{pmatrix}",
            options: ["36", "44", "18", "28"],
            correctAnswer: "36",
            explanation: "Expanding along Column 1 (which has zeros below 2): det = 2 × (4×5 − 2×1) = 2 × (20 − 2) = 2 × 18 = 36.",
            hintLadder: [
              "Notice Column 1 has two zeros, making Column 1 cofactor expansion quickest.",
              "Compute the 2×2 minor of entry 2: (4×5 − 2×1) = 18.",
              "Multiply 2 × 18."
            ],
            misconceptionAlerts: [
              { trigger: "44", note: "Remember minor determinant subtracts (4×5 − 2×1), rather than adding 20 + 2." }
            ],
            skillId: "skill-sss-matrices-linear-transforms",
            difficulty: "medium"
          },
          {
            id: "q-sss-mat-4",
            type: "multiple_choice",
            questionText: "A polygon of area 15 cm² is transformed by matrix T = [[3, 1], [1, 2]]. What is the area of the transformed image?",
            mathExpression: "\\text{Area}' = |\\det(T)| \\times \\text{Area}",
            options: ["75 cm²", "105 cm²", "90 cm²", "45 cm²"],
            correctAnswer: "75 cm²",
            explanation: "det(T) = (3)(2) − (1)(1) = 6 − 1 = 5. Image area = |5| × 15 = 75 cm².",
            hintLadder: [
              "Compute determinant of T: (3×2) − (1×1) = 5.",
              "Multiply original area 15 cm² by |det(T)|.",
              "5 × 15 = 75 cm²."
            ],
            misconceptionAlerts: [
              { trigger: "105 cm²", note: "105 uses 6 + 1 = 7 instead of ad − bc = 6 − 1 = 5." }
            ],
            skillId: "skill-sss-matrices-linear-transforms",
            difficulty: "medium"
          },
          {
            id: "q-sss-mat-5",
            type: "multiple_choice",
            questionText: "Find the single 2×2 matrix representing a 90° anticlockwise rotation about (0, 0) FOLLOWED BY reflection in the x-axis.",
            mathExpression: "M = R_x \\cdot R_{90^{\\circ}\\text{ CCW}}",
            options: [
              "[[0, -1], [-1, 0]]",
              "[[0, 1], [1, 0]]",
              "[[0, 1], [-1, 0]]",
              "[[-1, 0], [0, 1]]"
            ],
            correctAnswer: "[[0, -1], [-1, 0]]",
            explanation: "Rotation 90° CCW is [[0, −1], [1, 0]]. Reflection in x-axis is [[1, 0], [0, −1]]. Product R_x · R_90 = [[1, 0], [0, −1]][[0, −1], [1, 0]] = [[0, −1], [−1, 0]] (reflection in y = −x).",
            hintLadder: [
              "Track basis vector (1, 0): 90° CCW sends it to (0, 1); then reflect in x-axis to (0, −1) → Column 1.",
              "Track basis vector (0, 1): 90° CCW sends it to (−1, 0); reflect in x-axis stays (−1, 0) → Column 2.",
              "Assemble columns [Col1 | Col2] = [[0, −1], [−1, 0]]."
            ],
            misconceptionAlerts: [
              { trigger: "[[0, 1], [1, 0]]", note: "That reverses the order (reflection first, then rotation)." }
            ],
            skillId: "skill-sss-matrices-linear-transforms",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. sss_252_mathematics_complex_numbers_sequence
  // =========================================================================
  {
    id: "unit-p1-sss-complex-sequences-series",
    subjectId: "sss_252_mathematics_complex_numbers_sequence",
    level: "senior_secondary",
    title: "Complex Numbers (Argand & De Moivre), AP/GP Series & Infinite Convergence",
    code: "SSS-CMP-252",
    description:
      "Master complex conjugates, Argand modulus/argument, polar De Moivre powers, Arithmetic & Geometric sums, infinite GP convergence (|r| < 1), and Sigma notation.",
    order: 14,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-CMP-252",
      "JAMB_UTME:MTH-SEQ-252",
      "CAMBRIDGE_ALEVEL:MAT-CPX-SER"
    ],
    skills: [
      {
        id: "skill-sss-complex-sequences-series",
        unitId: "unit-p1-sss-complex-sequences-series",
        title: "Complex Arithmetic, Polar Form & Convergent Infinite Series",
        code: "SKL-SSS-CMP-252",
        summary:
          "Rationalize complex quotients via conjugates, convert between Cartesian a+bi and polar r cis θ, and evaluate finite AP/GP and infinite convergent GP sums.",
        objectives: [
          "Compute complex division using z·z̄ = a² + b² and cyclic powers of i (i⁴ = 1)",
          "Convert z = a + bi to modulus r = √(a² + b²) and principal argument θ ∈ (−π, π], applying De Moivre (r cis θ)ⁿ = rⁿ cis(nθ)",
          "Evaluate finite AP/GP sums and infinite geometric series S_∞ = a / (1 − r) for |r| < 1"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-arithmetic-progression", "skill-quad-factoring"],
        lesson: {
          id: "les-sss-complex-sequences-series",
          title: "Complex Numbers, Argand Geometry & Series",
          hookAndIntuition:
            "Electrical AC impedance uses i (or j) to combine resistance and phase reactance cleanly, while infinite GP sums reveal how repeating decimals and damped vibrations settle to finite limits.",
          conceptualExplanation:
            "With i² = −1, complex number z = a + bi plots at (a, b) on the Argand plane with modulus |z| = √(a² + b²) and conjugate z̄ = a − bi satisfying z·z̄ = a² + b². To divide z₁ / z₂, multiply top and bottom by denominator conjugate z̄₂. In polar form z = r(cos θ + i sin θ), De Moivre's Theorem raises powers effortlessly: zⁿ = rⁿ(cos nθ + i sin nθ).\n\nFor sequences, an Arithmetic Progression (AP) obeys T_n = a + (n−1)d and S_n = (n/2)[2a + (n−1)d]. A Geometric Progression (GP) obeys T_n = ar^(n−1) and S_n = a(1 − rⁿ)/(1 − r). Whenever common ratio satisfies |r| < 1, rⁿ → 0 as n → ∞, converging to exact infinite sum S_∞ = a / (1 − r).",
          conceptualModel:
            "i² = −1 | z·z̄ = a² + b² | De Moivre: (r∠θ)ⁿ = rⁿ∠(nθ) | GP Infinite (|r| < 1): S_∞ = a/(1 − r).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Complex Conjugate Division: z₁/z₂ = (z₁ z̄₂) / |z₂|²",
              definition: "Eliminates imaginary units from the denominator cleanly.",
              practicalExample: "(5 + i)/(1 − i) = (5 + i)(1 + i)/(1 + 1) = (4 + 6i)/2 = 2 + 3i."
            },
            {
              termOrSymbol: "De Moivre's Theorem: [r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ)",
              definition: "Raising a complex number to power n raises modulus to n and multiplies angle by n.",
              practicalExample: "(√2 ∠ 45°)⁴ = 4 ∠ 180° = −4."
            },
            {
              termOrSymbol: "Infinite Convergent GP: S_∞ = a / (1 − r), |r| < 1",
              definition: "Exact limiting sum of an infinite geometric series when |r| strictly < 1.",
              practicalExample: "12 + 4 + 4/3 + ... has a = 12, r = 1/3, so S_∞ = 12/(1 − 1/3) = 18."
            }
          ],
          workedExamples: [
            {
              title: "Complex Division & Principal Argument on Argand Plane",
              problemStatement: "Express w = (3 + i) / (1 + 2i) in Cartesian form a + bi, and find its modulus |w|.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Multiply numerator and denominator by conjugate of denominator (1 − 2i).",
                  reasoning: "w = [(3 + i)(1 − 2i)] / [(1 + 2i)(1 − 2i)]."
                },
                {
                  stepNumber: 2,
                  instruction: "Expand numerator (using i² = −1) and denominator (1² + 2²).",
                  reasoning: "Numerator = 3 − 6i + i − 2i² = 3 − 5i + 2 = 5 − 5i. Denominator = 1 + 4 = 5."
                },
                {
                  stepNumber: 3,
                  instruction: "Divide both real and imaginary parts by 5.",
                  reasoning: "w = (5 − 5i)/5 = 1 − i."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute modulus |w| = √(a² + b²).",
                  reasoning: "|w| = √(1² + (−1)²) = √2."
                }
              ],
              takeawayRule: "Always replace i² with −1 immediately when expanding products, then simplify real and imaginary parts separately."
            },
            {
              title: "Solving an Infinite Geometric Series With Bouncing Ball Distance",
              problemStatement: "A ball is dropped from 18 m and rebounds vertically to 2/3 of its previous height on every bounce. Find the total vertical distance traveled before coming to rest.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Separate the single initial downward drop from subsequent up-and-down rebound pairs.",
                  reasoning: "Initial drop = 18 m. First bounce goes UP 12 m and DOWN 12 m; second goes UP 8 m and DOWN 8 m."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute infinite sum of upward rebounds (a = 12, r = 2/3).",
                  reasoning: "S_up = 12 / (1 − 2/3) = 12 / (1/3) = 36 m."
                },
                {
                  stepNumber: 3,
                  instruction: "Account for both upward and matching downward rebound travel.",
                  reasoning: "Rebounds contribute 2 × S_up = 2 × 36 = 72 m."
                },
                {
                  stepNumber: 4,
                  instruction: "Add the initial 18 m downward fall.",
                  reasoning: "Total distance = 18 + 72 = 90 m."
                }
              ],
              takeawayRule: "In bouncing-ball problems, only the first drop happens once; every rebound distance occurs twice (up + down)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing (1 + 2i)(1 − 2i) = 1 − 4 = −3 instead of 1 + 4 = 5.",
              whyItIsWrong: "−(2i)² = −4(−1) = +4; conjugate products are always a sum of squares a² + b² ≥ 0.",
              correctCorrection: "Apply (a + bi)(a − bi) = a² + b² directly."
            },
            {
              misconception: "Using S_∞ = a/(1 − r) when |r| ≥ 1 (e.g., r = 1.2).",
              whyItIsWrong: "When |r| ≥ 1, terms do not shrink to zero and the series diverges to infinity.",
              correctCorrection: "Check |r| < 1 first before computing S_∞."
            }
          ],
          guidedPracticePrompt: "Evaluate i²⁰²⁷ by reducing the exponent modulo 4.",
          independentPracticePrompt: "Find the first term a of a GP with r = 1/4 and infinite sum S_∞ = 32.",
          extensionActivity: "Use De Moivre's Theorem to show (1 + i)⁸ = 16.",
          diagnosticSelfCheck: "What is the complex conjugate and modulus of −5 + 12i?",
          transferApplication: "Convert repeating decimal 0.272727... into an exact fraction using S_∞ = 0.27 / (1 − 0.01) = 3/11.",
          masteryAssessment: "For what values of x does 1 + (x−2) + (x−2)² + ... converge to 4?",
          summaryRecap: "Simplify i⁴ = 1, rationalize with z·z̄ = a² + b², rotate angles by nθ in De Moivre powers, and check |r| < 1 for S_∞ = a/(1 − r).",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-cmp-1",
            type: "multiple_choice",
            questionText: "Simplify the complex power expression: i²³ + i⁴⁰.",
            mathExpression: "i^{23} + i^{40}",
            options: ["1 - i", "1 + i", "-1 - i", "-1 + i"],
            correctAnswer: "1 - i",
            explanation: "i⁴ = 1. 23 = 4(5) + 3 ⇒ i²³ = i³ = −i. 40 = 4(10) + 0 ⇒ i⁴⁰ = 1. Sum = 1 − i.",
            hintLadder: [
              "Divide each exponent by 4 and keep only the remainder.",
              "23 mod 4 = 3 so i²³ = i³ = −i; 40 mod 4 = 0 so i⁴⁰ = 1.",
              "Combine 1 + (−i)."
            ],
            misconceptionAlerts: [
              { trigger: "1 + i", note: "i³ = i² · i = (−1)i = −i, not +i." }
            ],
            skillId: "skill-sss-complex-sequences-series",
            difficulty: "easy"
          },
          {
            id: "q-sss-cmp-2",
            type: "multiple_choice",
            questionText: "Find the sum to infinity of the geometric series: 24 + 8 + 8/3 + 8/9 + ...",
            mathExpression: "S_{\\infty} = \\frac{a}{1 - r}",
            options: ["36", "32", "48", "72"],
            correctAnswer: "36",
            explanation: "First term a = 24, common ratio r = 8/24 = 1/3 (|r| < 1). Thus S_∞ = 24 / (1 − 1/3) = 24 / (2/3) = 36.",
            hintLadder: [
              "Find common ratio r = 8 ÷ 24 = 1/3.",
              "Check convergence: |1/3| < 1.",
              "Evaluate 24 ÷ (1 − 1/3) = 24 ÷ (2/3)."
            ],
            misconceptionAlerts: [
              { trigger: "72", note: "72 divides 24 by 1/3 instead of (1 − 1/3) = 2/3." }
            ],
            skillId: "skill-sss-complex-sequences-series",
            difficulty: "easy"
          },
          {
            id: "q-sss-cmp-3",
            type: "multiple_choice",
            questionText: "Express the quotient (7 − i) / (2 + i) in standard Cartesian form a + bi.",
            mathExpression: "\\frac{7 - i}{2 + i}",
            options: ["13/5 - (9/5)i", "3 - i", "15/5 - (9/5)i", "13/3 - 3i"],
            correctAnswer: "13/5 - (9/5)i",
            explanation: "Multiply top and bottom by (2 − i): Num = (7 − i)(2 − i) = 14 − 7i − 2i + i² = 13 − 9i. Denom = 2² + 1² = 5. Result: 13/5 − (9/5)i.",
            hintLadder: [
              "Multiply numerator and denominator by conjugate (2 − i).",
              "Denominator becomes 2² + 1² = 5.",
              "Numerator: 14 − 9i + i² = 14 − 1 − 9i = 13 − 9i."
            ],
            misconceptionAlerts: [
              { trigger: "3 - i", note: "14 − (−1) = 15 would only happen if (+i²) were subtracted." }
            ],
            skillId: "skill-sss-complex-sequences-series",
            difficulty: "medium"
          },
          {
            id: "q-sss-cmp-4",
            type: "multiple_choice",
            questionText: "Using De Moivre's Theorem, evaluate (1 + i)⁶ in Cartesian form.",
            mathExpression: "(1 + i)^6",
            options: ["-8i", "8i", "-8", "8"],
            correctAnswer: "-8i",
            explanation: "1 + i has modulus √2 and angle π/4 (45°). By De Moivre: (√2)⁶ (cos(6π/4) + i sin(6π/4)) = 8(cos 270° + i sin 270°) = 8(0 − i) = −8i.",
            hintLadder: [
              "Convert 1 + i to polar: r = √(1² + 1²) = √2, θ = 45°.",
              "Apply De Moivre: r⁶ = (√2)⁶ = 8 and angle = 6 × 45° = 270°.",
              "Evaluate 8(cos 270° + i sin 270°)."
            ],
            misconceptionAlerts: [
              { trigger: "8i", note: "270° points straight down on the negative imaginary axis, giving sin 270° = −1." }
            ],
            skillId: "skill-sss-complex-sequences-series",
            difficulty: "medium"
          },
          {
            id: "q-sss-cmp-5",
            type: "multiple_choice",
            questionText: "For what exact values of x does the infinite geometric series Σ_{n=0}^∞ (2x − 1)ⁿ converge, and what is x if its sum equals 2/3?",
            mathExpression: "\\frac{1}{1 - (2x - 1)} = \\frac{2}{3}",
            options: [
              "0 < x < 1; x = 1/4",
              "-1 < x < 1; x = 1/2",
              "0 < x < 1; x = 3/4",
              "-1 < x < 0; x = -1/4"
            ],
            correctAnswer: "0 < x < 1; x = 1/4",
            explanation: "Convergence requires |2x − 1| < 1 ⇒ −1 < 2x − 1 < 1 ⇒ 0 < 2x < 2 ⇒ 0 < x < 1. Setting 1 / (2 − 2x) = 2/3 gives 4 − 4x = 3 ⇒ 4x = 1 ⇒ x = 1/4.",
            hintLadder: [
              "Set |r| < 1: −1 < 2x − 1 < 1 and solve for x.",
              "Set S_∞ = 1 / [1 − (2x − 1)] = 1 / (2 − 2x) = 2/3.",
              "Cross-multiply: 3 = 2(2 − 2x) = 4 − 4x."
            ],
            misconceptionAlerts: [
              { trigger: "0 < x < 1; x = 3/4", note: "1 − (2x − 1) simplifies to 2 − 2x, not 2x." }
            ],
            skillId: "skill-sss-complex-sequences-series",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. sss_253_mathematics_coordinate_geometry_coni
  // =========================================================================
  {
    id: "unit-p1-sss-coordinate-conics",
    subjectId: "sss_253_mathematics_coordinate_geometry_coni",
    level: "senior_secondary",
    title: "Analytic Circle Geometry, Tangents & Conic Sections (Parabola, Ellipse, Hyperbola)",
    code: "SSS-CON-253",
    description:
      "Master general circle equations by completing the square, perpendicular radius tangents, parabola focus/directrix (y² = 4ax), ellipse eccentricity, and hyperbola asymptotes.",
    order: 15,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-CON-253",
      "JAMB_UTME:MTH-GEO-CON",
      "CAMBRIDGE_ALEVEL:MAT-CON-SEC"
    ],
    skills: [
      {
        id: "skill-sss-coordinate-conics",
        unitId: "unit-p1-sss-coordinate-conics",
        title: "Circles, Tangents & Conic Section Equations",
        code: "SKL-SSS-CON-253",
        summary:
          "Complete squares on circles, construct tangent lines via radius perpendicularity, and analyze parabola, ellipse, and hyperbola foci, vertices, and eccentricity.",
        objectives: [
          "Extract center (−g, −f) and radius √(g² + f² − c) from x² + y² + 2gx + 2fy + c = 0",
          "Find circle tangent equations at point (x₁, y₁) using m_tangent = −1 / m_radius",
          "Classify conics by quadratic coefficients and eccentricity: e = 1 (parabola), 0 < e < 1 (ellipse), e > 1 (hyperbola)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-linear-graphs-coord", "skill-quad-factoring"],
        lesson: {
          id: "les-sss-coordinate-conics",
          title: "Coordinate Geometry & Conic Sections",
          hookAndIntuition:
            "Every planetary orbit is an ellipse, every satellite dish reflects signals to a parabola's focus, and every cooling tower traces a hyperbola—all captured by four quadratic equations.",
          conceptualExplanation:
            "A circle centered at (h, k) with radius r has equation (x − h)² + (y − k)² = r². Expanding gives x² + y² + 2gx + 2fy + c = 0 where center = (−g, −f) and r = √(g² + f² − c). Because a tangent touches perpendicular to the radius at (x₁, y₁), its slope satisfies m_tan · m_rad = −1.\n\nConic sections arise by slicing a double cone: Parabola y² = 4ax has focus (a, 0), directrix x = −a, latus rectum 4a, and eccentricity e = 1. Ellipse x²/a² + y²/b² = 1 (a > b) has foci (±c, 0) where c² = a² − b² and eccentricity e = c/a < 1. Hyperbola x²/a² − y²/b² = 1 has foci (±c, 0) where c² = a² + b², asymptotes y = ±(b/a)x, and e = c/a > 1.",
          conceptualModel:
            "Circle: (x−h)²+(y−k)²=r² | Parabola y²=4ax: Focus (a,0), e=1 | Ellipse: c²=a²−b², e<1 | Hyperbola: c²=a²+b², y=±(b/a)x, e>1.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "General Circle: x² + y² + 2gx + 2fy + c = 0",
              definition: "Center is (−g, −f) and radius is r = √(g² + f² − c) (valid when g² + f² > c).",
              practicalExample: "x² + y² − 6x + 8y − 11 = 0 ⇒ Center (3, −4), r = √(9 + 16 + 11) = 6."
            },
            {
              termOrSymbol: "Ellipse vs Hyperbola Focus Relation",
              definition: "Ellipse (sum of distances): c² = a² − b². Hyperbola (difference): c² = a² + b².",
              practicalExample: "x²/25 + y²/9 = 1 has a = 5, b = 3 ⇒ c = √(25 − 9) = 4, e = 4/5 = 0.8."
            },
            {
              termOrSymbol: "Hyperbola Asymptotes: y = ±(b/a)x",
              definition: "Diagonal guide lines approached by x²/a² − y²/b² = 1 as |x| → ∞.",
              practicalExample: "x²/9 − y²/16 = 1 has asymptotes y = ±(4/3)x."
            }
          ],
          workedExamples: [
            {
              title: "Finding Circle Center, Radius & Tangent Line at a Point",
              problemStatement: "Find the equation of the tangent to circle x² + y² − 4x + 6y − 12 = 0 at point P(5, 1).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Complete squares (or use −g, −f) to find center C and verify P lies on the circle.",
                  reasoning: "Center C = (2, −3); r² = 2² + (−3)² − (−12) = 25 ⇒ r = 5. Check CP² = (5−2)² + (1−(−3))² = 9 + 16 = 25."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute the gradient of radius CP.",
                  reasoning: "m_rad = (1 − (−3)) / (5 − 2) = 4 / 3."
                },
                {
                  stepNumber: 3,
                  instruction: "Take the negative reciprocal for tangent gradient m_tan.",
                  reasoning: "m_tan = −3 / 4."
                },
                {
                  stepNumber: 4,
                  instruction: "Use point-slope form through P(5, 1).",
                  reasoning: "y − 1 = −(3/4)(x − 5) ⇒ 4y − 4 = −3x + 15 ⇒ 3x + 4y = 19."
                }
              ],
              takeawayRule: "Tangent gradient is ALWAYS the negative reciprocal of the radius gradient from center to contact point."
            },
            {
              title: "Extracting Foci, Eccentricity & Directrices of an Ellipse",
              problemStatement: "Write 9x² + 25y² = 225 in standard conic form and find its semi-axes, foci, and eccentricity.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Divide both sides by 225 so RHS equals 1.",
                  reasoning: "x²/25 + y²/9 = 1."
                },
                {
                  stepNumber: 2,
                  instruction: "Read a² = 25 and b² = 9 along x-major axis (since 25 > 9).",
                  reasoning: "a = 5 (major semi-axis), b = 3 (minor semi-axis)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute focal distance c = √(a² − b²).",
                  reasoning: "c = √(25 − 9) = √16 = 4, so foci sit at (±4, 0)."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute eccentricity e = c / a.",
                  reasoning: "e = 4 / 5 = 0.8 (strictly between 0 and 1, confirming an ellipse)."
                }
              ],
              takeawayRule: "In an ellipse, a² is ALWAYS the larger denominator, and c² = a² − b² (subtracted, opposite sign to the '+' in the equation)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Reading center of x² + y² − 6x + 8y − 11 = 0 as (−6, +8) or (6, −8).",
              whyItIsWrong: "Coefficients 2g = −6 and 2f = 8 must be halved AND negated.",
              correctCorrection: "Divide x and y coefficients by −2 directly: Center = (3, −4)."
            },
            {
              misconception: "Using c² = a² + b² for an ellipse.",
              whyItIsWrong: "Adding makes c > a, placing foci outside the closed ellipse (which belongs to a hyperbola).",
              correctCorrection: "Ellipse uses c² = a² − b²; Hyperbola uses c² = a² + b²."
            }
          ],
          guidedPracticePrompt: "Find the focus and directrix of parabola y² = 12x.",
          independentPracticePrompt: "Find the asymptotes and foci of hyperbola x²/36 − y²/64 = 1.",
          extensionActivity: "Use locus definition PF = PD to derive y² = 4ax from F(a, 0) and line x = −a.",
          diagnosticSelfCheck: "What conic is 4x² − 9y² + 8x − 32 = 0?",
          transferApplication: "Design a parabolic solar cooker of depth 0.5 m and diameter 2 m by placing the pot at focal distance a = x²/(4y).",
          masteryAssessment: "Find the perpendicular distance from center (1, −2) to line 3x + 4y = 10 to test tangency to radius 3.",
          summaryRecap: "Halve-and-negate for circle centers, enforce m_tan·m_rad = −1 for tangents, and distinguish conics cleanly by c² and eccentricity e.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-con-1",
            type: "multiple_choice",
            questionText: "Find the center and radius of the circle x² + y² − 8x + 10y + 5 = 0.",
            mathExpression: "x^2 + y^2 - 8x + 10y + 5 = 0",
            options: [
              "Center (4, -5), r = 6",
              "Center (-4, 5), r = 6",
              "Center (4, -5), r = 36",
              "Center (8, -10), r = 4"
            ],
            correctAnswer: "Center (4, -5), r = 6",
            explanation: "Center = (−(−8)/2, −10/2) = (4, −5). Radius r = √(4² + (−5)² − 5) = √(16 + 25 − 5) = √36 = 6.",
            hintLadder: [
              "Divide the x and y linear coefficients by −2 to get center (4, −5).",
              "Compute r² = h² + k² − c = 16 + 25 − 5 = 36.",
              "Take √36 = 6."
            ],
            misconceptionAlerts: [
              { trigger: "Center (-4, 5), r = 6", note: "Remember (x − h)² + (y − k)² flips the signs of −8x and +10y to h = +4, k = −5." }
            ],
            skillId: "skill-sss-coordinate-conics",
            difficulty: "easy"
          },
          {
            id: "q-sss-con-2",
            type: "multiple_choice",
            questionText: "Determine the focus coordinates and directrix equation of the parabola y² = 16x.",
            mathExpression: "y^2 = 4ax",
            options: [
              "Focus (4, 0), directrix x = -4",
              "Focus (16, 0), directrix x = -16",
              "Focus (0, 4), directrix y = -4",
              "Focus (8, 0), directrix x = -8"
            ],
            correctAnswer: "Focus (4, 0), directrix x = -4",
            explanation: "Comparing y² = 16x with y² = 4ax gives 4a = 16 ⇒ a = 4. Since y is squared, the parabola opens along +x with focus (4, 0) and directrix x = −4.",
            hintLadder: [
              "Equate 4a = 16 to solve for focal length a.",
              "Because y is squared and x is positive linear, the axis lies along +x.",
              "Focus is (a, 0) and directrix is x = −a."
            ],
            misconceptionAlerts: [
              { trigger: "Focus (16, 0), directrix x = -16", note: "16 equals 4a (latus rectum length), not focal parameter a." }
            ],
            skillId: "skill-sss-coordinate-conics",
            difficulty: "easy"
          },
          {
            id: "q-sss-con-3",
            type: "multiple_choice",
            questionText: "Find the foci and eccentricity of the ellipse x²/169 + y²/144 = 1.",
            mathExpression: "\\frac{x^2}{169} + \\frac{y^2}{144} = 1",
            options: [
              "Foci (±5, 0), e = 5/13",
              "Foci (±13, 0), e = 12/13",
              "Foci (0, ±5), e = 5/12",
              "Foci (±√313, 0), e = √313/13"
            ],
            correctAnswer: "Foci (±5, 0), e = 5/13",
            explanation: "a² = 169 (a = 13), b² = 144 (b = 12). For an ellipse, c = √(a² − b²) = √(169 − 144) = √25 = 5. Eccentricity e = c/a = 5/13.",
            hintLadder: [
              "Identify larger denominator a² = 169 ⇒ a = 13 along the x-axis.",
              "Use ellipse relation c² = a² − b² = 169 − 144 = 25.",
              "Divide c = 5 by a = 13."
            ],
            misconceptionAlerts: [
              { trigger: "Foci (±√313, 0), e = √313/13", note: "Adding a² + b² applies to a hyperbola, not an ellipse." }
            ],
            skillId: "skill-sss-coordinate-conics",
            difficulty: "medium"
          },
          {
            id: "q-sss-con-4",
            type: "multiple_choice",
            questionText: "Find the equation of the tangent to the circle (x − 1)² + (y + 2)² = 25 at point P(4, 2).",
            mathExpression: "(x - 1)^2 + (y + 2)^2 = 25 \\text{ at } P(4, 2)",
            options: [
              "3x + 4y = 20",
              "4x - 3y = 10",
              "3x - 4y = 4",
              "4x + 3y = 22"
            ],
            correctAnswer: "3x + 4y = 20",
            explanation: "Center is C(1, −2). Radius gradient m_rad = (2 − (−2))/(4 − 1) = 4/3. Tangent gradient m_tan = −3/4. Line through (4, 2): y − 2 = −(3/4)(x − 4) ⇒ 4y − 8 = −3x + 12 ⇒ 3x + 4y = 20.",
            hintLadder: [
              "Read circle center C(1, −2).",
              "Compute slope of radius CP = (2 + 2) / (4 − 1) = 4/3.",
              "Take negative reciprocal slope −3/4 through (4, 2)."
            ],
            misconceptionAlerts: [
              { trigger: "4x - 3y = 10", note: "4/3 is the normal (radius) line equation, not the perpendicular tangent." }
            ],
            skillId: "skill-sss-coordinate-conics",
            difficulty: "medium"
          },
          {
            id: "q-sss-con-5",
            type: "multiple_choice",
            questionText: "Find the asymptotes and foci of the hyperbola 16x² − 9y² = 144.",
            mathExpression: "\\frac{x^2}{9} - \\frac{y^2}{16} = 1",
            options: [
              "Asymptotes y = ±(4/3)x, Foci (±5, 0)",
              "Asymptotes y = ±(3/4)x, Foci (±5, 0)",
              "Asymptotes y = ±(4/3)x, Foci (±√7, 0)",
              "Asymptotes y = ±(16/9)x, Foci (0, ±5)"
            ],
            correctAnswer: "Asymptotes y = ±(4/3)x, Foci (±5, 0)",
            explanation: "Dividing by 144 gives x²/9 − y²/16 = 1, so a = 3, b = 4. Asymptotes y = ±(b/a)x = ±(4/3)x. Foci use c = √(a² + b²) = √(9 + 16) = 5 at (±5, 0).",
            hintLadder: [
              "Divide by 144 to put in standard form x²/a² − y²/b² = 1.",
              "Extract a = √9 = 3 and b = √16 = 4.",
              "Asymptotes are y = ±(b/a)x and hyperbola foci satisfy c² = a² + b²."
            ],
            misconceptionAlerts: [
              { trigger: "Asymptotes y = ±(3/4)x, Foci (±5, 0)", note: "Notice slope is b/a = 4/3 (rise/run = √16 / √9), not a/b." }
            ],
            skillId: "skill-sss-coordinate-conics",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. sss_254_mathematics_linear_programming_optim
  // =========================================================================
  {
    id: "unit-p1-sss-linear-programming",
    subjectId: "sss_254_mathematics_linear_programming_optim",
    level: "senior_secondary",
    title: "Linear Programming, Feasible Region Polygons & Corner-Point Optimization",
    code: "SSS-LPR-254",
    description:
      "Master translating resource constraints into linear inequalities, shading feasible convex regions, solving boundary intersections, and optimizing objective functions P = ax + by.",
    order: 16,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-OPT-254",
      "JAMB_UTME:MTH-LP-254",
      "CAMBRIDGE_ALEVEL:DEC-LP-OPT"
    ],
    skills: [
      {
        id: "skill-sss-linear-programming",
        unitId: "unit-p1-sss-linear-programming",
        title: "Feasible Convex Regions & Simplex Corner-Point Theorem",
        code: "SKL-SSS-LPR-254",
        summary:
          "Formulate decision variables, resource inequalities, and objective functions, and locate exact maxima/minima at feasible polygon vertices.",
        objectives: [
          "Convert capacity ('at most' ≤) and demand/balance ('at least' ≥) constraints into linear inequalities",
          "Sketch boundary intercepts and test origin (0, 0) to bound convex feasible regions cleanly",
          "Evaluate objective function Z = cx + dy across all vertices using the Corner-Point Theorem"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-inequalities-factorisation", "skill-simultaneous-eq"],
        lesson: {
          id: "les-sss-linear-programming",
          title: "Linear Programming & Convex Optimization",
          hookAndIntuition:
            "Airlines scheduling crews, bakeries splitting oven hours, and refineries blending fuel all maximize profit within tight physical limits using Linear Programming.",
          conceptualExplanation:
            "Every linear programming (LP) model defines three pieces: non-negative decision variables (x ≥ 0, y ≥ 0), linear resource inequalities (e.g., labor 2x + 3y ≤ 60, budget 500x + 400y ≤ 12,000), and a linear objective function Z = ax + by to maximize (profit) or minimize (cost).\n\nPlotting each inequality's boundary line ax + by = c via its x-intercept (c/a, 0) and y-intercept (0, c/b) and testing point (0, 0) defines half-planes whose intersection forms a convex feasible polygon. By the Fundamental Theorem of Linear Programming (Corner-Point Theorem), if an optimal solution exists over a bounded feasible region, it MUST occur at one of the corner vertices (or along an edge connecting two equally optimal corners).",
          conceptualModel:
            "1. Variables (x, y ≥ 0) → 2. Resource Constraints (≤, ≥) → 3. Polygon Vertices (Intersections) → 4. Evaluate Z = ax + by at EVERY vertex.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Corner-Point Theorem",
              definition: "Any linear objective Z = ax + by attains its extreme values at vertices of the bounded convex feasible polygon.",
              practicalExample: "If vertices are (0,0), (12,0), (8,6), (0,10), test Z at all 4 rather than guessing."
            },
            {
              termOrSymbol: "Origin Test for Shading: Test (0, 0)",
              definition: "Substitute (0, 0) into Ax + By ≤ C; if 0 ≤ C is true, keep the side containing the origin.",
              practicalExample: "2x + 3y ≤ 18 gives 0 ≤ 18 (True) ⇒ origin side is feasible."
            },
            {
              termOrSymbol: "Binding Constraint & Slack",
              definition: "At an optimal vertex, lines intersecting there have 0 slack (100% used); unused constraint margin is slack.",
              practicalExample: "If 2(8) + 3(6) = 34 ≤ 40 hours, slack labor = 6 unused hours."
            }
          ],
          workedExamples: [
            {
              title: "Maximizing Manufacturing Profit With Two Machine Constraints",
              problemStatement: "A workshop makes x chairs (profit ₦4,000 each) and y tables (profit ₦7,000 each). Cutting limits: x + 2y ≤ 16. Assembly limits: 2x + y ≤ 14, with x ≥ 0, y ≥ 0. Maximize daily profit P.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Find boundary intercepts of both constraints in Quadrant I.",
                  reasoning: "x + 2y = 16 meets axes at (16, 0) and (0, 8). 2x + y = 14 meets axes at (7, 0) and (0, 14)."
                },
                {
                  stepNumber: 2,
                  instruction: "Solve the intersection of x + 2y = 16 and 2x + y = 14.",
                  reasoning: "From x = 16 − 2y: 2(16 − 2y) + y = 14 ⇒ 32 − 3y = 14 ⇒ 3y = 18 ⇒ y = 6, x = 4. Vertex is (4, 6)."
                },
                {
                  stepNumber: 3,
                  instruction: "List all valid corners satisfying BOTH constraints simultaneously.",
                  reasoning: "(0, 0), (7, 0) [since 7+0≤16], (4, 6), and (0, 8) [since 0+8≤14]. Note (16,0) and (0,14) violate the other rule."
                },
                {
                  stepNumber: 4,
                  instruction: "Evaluate P = 4,000x + 7,000y at every valid corner.",
                  reasoning: "(0,0)→₦0; (7,0)→₦28,000; (0,8)→₦56,000; (4,6)→4,000(4)+7,000(6)=16,000+42,000=₦58,000. Max profit = ₦58,000 at (4 chairs, 6 tables)."
                }
              ],
              takeawayRule: "Check every candidate intercept against ALL other inequalities—never include an unfeasible outer intercept like (16, 0) in your corner table."
            },
            {
              title: "Minimizing Diet Cost With Minimum Nutrient Floors (≥)",
              problemStatement: "Minimize cost C = 50x + 80y subject to Protein: x + 2y ≥ 8, Vitamin: 3x + y ≥ 9, and x ≥ 0, y ≥ 0.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Recognize that ≥ constraints shade ABOVE the lines, forming an unbounded upper-right feasible region.",
                  reasoning: "Axes intercepts satisfying both ≥ floors are (8, 0) [3(8)+0 ≥ 9] and (0, 9) [0+2(9) ≥ 8]."
                },
                {
                  stepNumber: 2,
                  instruction: "Solve the intersection of x + 2y = 8 and 3x + y = 9.",
                  reasoning: "y = 9 − 3x ⇒ x + 2(9 − 3x) = 8 ⇒ 18 − 5x = 8 ⇒ 5x = 10 ⇒ x = 2, y = 3."
                },
                {
                  stepNumber: 3,
                  instruction: "Evaluate cost C = 50x + 80y at all three lower-hull vertices.",
                  reasoning: "At (8, 0): 50(8) = 400. At (0, 9): 80(9) = 720. At (2, 3): 50(2) + 80(3) = 100 + 240 = 340."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify non-negativity and minimum optimality.",
                  reasoning: "Since cost increases monotonically up and right, minimum cost = 340 at (2, 3)."
                }
              ],
              takeawayRule: "With all-positive objective coefficients in Quadrant I, '≤' maxima hit the outer upper hull while '≥' minima hit the inner lower hull."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Including an infeasible axis intercept (e.g., (16, 0) when 2x + y ≤ 14) as a feasible corner.",
              whyItIsWrong: "2(16) + 0 = 32 > 14 violates the second constraint, giving fake unachievable profit.",
              correctCorrection: "Verify EVERY candidate corner satisfies ALL inequalities before computing objective Z."
            },
            {
              misconception: "Translating 'at least twice as many x as y' as 2x ≥ y.",
              whyItIsWrong: "If x = 1 and y = 2, 2(1) ≥ 2 holds even though x is HALF of y, not twice y.",
              correctCorrection: "Read quantity first: x ≥ 2y (the larger count x is at least double the smaller count y)."
            }
          ],
          guidedPracticePrompt: "Translate 'Number of buses (x) plus vans (y) is at most 12, and vans cannot exceed double buses' into inequalities.",
          independentPracticePrompt: "Maximize Z = 5x + 3y subject to x + y ≤ 10, x ≤ 6, y ≤ 7, x ≥ 0, y ≥ 0.",
          extensionActivity: "Check if integer constraint (x, y ∈ ℤ) changes optimal profit when continuous LP vertex is fractional like (3.5, 4.2).",
          diagnosticSelfCheck: "At vertex (4, 6) with labor constraint x + 2y ≤ 20, how much slack remains?",
          transferApplication: "Allocate ₦100,000 ad spend across social and radio channels under reach floors and cap constraints.",
          masteryAssessment: "Given feasible vertices (0, 4), (3, 5), (6, 2), (5, 0), maximize P = 10x + 8y.",
          summaryRecap: "Convert word inequalities carefully (especially x ≥ 2y), filter corners against ALL constraints, and test objective Z at every feasible vertex.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-sss-lpr-1",
            type: "multiple_choice",
            questionText: "A bakery must bake at least 3 times as many loaves (x) as cakes (y) each morning. Which inequality represents this condition accurately?",
            mathExpression: "\\text{Loaves } (x) \\ge 3 \\times \\text{Cakes } (y)",
            options: ["x ≥ 3y", "3x ≥ y", "x ≤ 3y", "x + y ≥ 3"],
            correctAnswer: "x ≥ 3y",
            explanation: "If 10 cakes (y = 10) are baked, loaves (x) must be at least 30, which is captured by x ≥ 3y.",
            hintLadder: [
              "Test a numerical example: 30 loaves (x = 30) and 10 cakes (y = 10).",
              "Which inequality makes 30 and 10 satisfy equality: 30 = 3(10)?",
              "Keep 'at least' as ≥: x ≥ 3y."
            ],
            misconceptionAlerts: [
              { trigger: "3x ≥ y", note: "3x ≥ y would allow x = 5 loaves and y = 15 cakes, the reverse ratio." }
            ],
            skillId: "skill-sss-linear-programming",
            difficulty: "easy"
          },
          {
            id: "q-sss-lpr-2",
            type: "multiple_choice",
            questionText: "Which of the following points lies INSIDE the feasible region defined by 2x + 3y ≤ 18, x − y ≤ 2, x ≥ 0, y ≥ 0?",
            mathExpression: "2x + 3y \\le 18 \\text{ and } x - y \\le 2",
            options: ["(4, 3)", "(6, 2)", "(5, 3)", "(5, 1)"],
            correctAnswer: "(4, 3)",
            explanation: "At (4, 3): 2(4) + 3(3) = 17 ≤ 18 (True) and 4 − 3 = 1 ≤ 2 (True). Notice (6, 2) fails 6 − 2 = 4 ≤ 2; (5, 3) fails 10 + 9 = 19 ≤ 18; (5, 1) fails 5 − 1 = 4 ≤ 2.",
            hintLadder: [
              "Substitute each candidate (x, y) into BOTH inequalities.",
              "Check (4, 3): 2(4)+3(3)=17 ≤ 18 and 4−3=1 ≤ 2.",
              "Verify the other options violate at least one constraint."
            ],
            misconceptionAlerts: [
              { trigger: "(5, 3)", note: "At (5, 3), 2(5) + 3(3) = 19 exceeds 18." }
            ],
            skillId: "skill-sss-linear-programming",
            difficulty: "easy"
          },
          {
            id: "q-sss-lpr-3",
            type: "multiple_choice",
            questionText: "Maximize objective Z = 6x + 5y across the bounded feasible polygon vertices (0, 0), (0, 6), (4, 4), and (6, 0).",
            mathExpression: "\\max\\, Z = 6x + 5y",
            options: ["44", "36", "30", "46"],
            correctAnswer: "44",
            explanation: "Evaluating Z: at (0,0) → 0; at (0,6) → 30; at (6,0) → 36; at (4,4) → 6(4) + 5(4) = 24 + 20 = 44.",
            hintLadder: [
              "Compute 6x + 5y at each given vertex.",
              "At (4, 4): 24 + 20 = 44.",
              "Compare 0, 30, 44, and 36."
            ],
            misconceptionAlerts: [
              { trigger: "36", note: "(6, 0) gives 36, which is smaller than 44 at (4, 4)." }
            ],
            skillId: "skill-sss-linear-programming",
            difficulty: "medium"
          },
          {
            id: "q-sss-lpr-4",
            type: "multiple_choice",
            questionText: "Maximize profit P = 30x + 20y subject to 2x + y ≤ 18, x + 2y ≤ 15, x ≥ 0, y ≥ 0.",
            mathExpression: "2x + y \\le 18,\\quad x + 2y \\le 15",
            options: ["290", "270", "300", "310"],
            correctAnswer: "290",
            explanation: "Intersection of 2x + y = 18 and x + 2y = 15 gives y = 18 − 2x ⇒ x + 2(18 − 2x) = 15 ⇒ 36 − 3x = 15 ⇒ x = 7, y = 4. Feasible corners: (0,0) → 0; (9,0) → 270; (0,7.5) → 150; (7,4) → 30(7) + 20(4) = 210 + 80 = 290.",
            hintLadder: [
              "Solve 2x + y = 18 and x + 2y = 15 simultaneously.",
              "Substitute y = 18 − 2x into x + 2y = 15 to get x = 7, y = 4.",
              "Evaluate P = 30(7) + 20(4) = 210 + 80 = 290."
            ],
            misconceptionAlerts: [
              { trigger: "270", note: "270 is at corner (9, 0), whereas intersection (7, 4) yields higher profit." }
            ],
            skillId: "skill-sss-linear-programming",
            difficulty: "medium"
          },
          {
            id: "q-sss-lpr-5",
            type: "multiple_choice",
            questionText: "Minimize cost C = 40x + 50y subject to x + 3y ≥ 12, 2x + y ≥ 9, x ≥ 0, y ≥ 0.",
            mathExpression: "\\min\\, C = 40x + 50y",
            options: ["270", "450", "480", "240"],
            correctAnswer: "270",
            explanation: "Intersection of x + 3y = 12 and 2x + y = 9: x = 12 − 3y ⇒ 2(12 − 3y) + y = 9 ⇒ 24 − 5y = 9 ⇒ y = 3, x = 3. Lower-hull corners: (12, 0) [C = 480], (0, 9) [C = 450], and (3, 3) [C = 40(3) + 50(3) = 270].",
            hintLadder: [
              "Find intersection of x + 3y = 12 and 2x + y = 9.",
              "x = 3, y = 3 satisfies both constraints.",
              "Compare C at (12, 0), (0, 9), and (3, 3)."
            ],
            misconceptionAlerts: [
              { trigger: "450", note: "(0, 9) costs 450, higher than balanced blend (3, 3) at 270." }
            ],
            skillId: "skill-sss-linear-programming",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. sss_255_mathematics_numerical_methods_error_
  // =========================================================================
  {
    id: "unit-p1-sss-numerical-methods",
    subjectId: "sss_255_mathematics_numerical_methods_error_",
    level: "senior_secondary",
    title: "Numerical Methods: Error Bounds, Bisection, Newton-Raphson & Simpson's Rule",
    code: "SSS-NUM-255",
    description:
      "Master absolute/relative/percentage error propagation, Intermediate Value sign-change root bracketing, Newton-Raphson iteration, and Trapezium vs Simpson's 1/3 numerical integration.",
    order: 17,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:FM-NUM-255",
      "JAMB_UTME:MTH-NUM-ERR",
      "CAMBRIDGE_ALEVEL:MAT-NUM-MET"
    ],
    skills: [
      {
        id: "skill-sss-numerical-methods",
        unitId: "unit-p1-sss-numerical-methods",
        title: "Error Analysis, Root Finding & Numerical Quadrature",
        code: "SKL-SSS-NUM-255",
        summary:
          "Bound floating-point/measurement errors, bracket and refine roots via Bisection and Newton-Raphson, and approximate integrals with Trapezium and Simpson's Rules.",
        objectives: [
          "Compute absolute, relative, percentage error and worst-case interval propagation in quotients a/b",
          "Prove root existence via continuous sign change f(a)·f(b) < 0 and iterate Newton-Raphson x_{n+1} = x_n − f(x_n)/f'(x_n)",
          "Apply Trapezium Rule and Simpson's 1/3 Rule (1-4-2-4-1 weights, even subintervals n) to approximate definite integrals"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-estimation-rounding", "skill-sss-calculus-vectors-ode"],
        lesson: {
          id: "les-sss-numerical-methods",
          title: "Numerical Methods & Error Propagation",
          hookAndIntuition:
            "Most differential equations and real-world integrals—like orbital mechanics or airfoil lift—have no closed algebra solution; numerical methods solve them to arbitrary precision.",
          conceptualExplanation:
            "When a measurement x₀ is rounded to precision Δ, its true value lies in [x₀ − Δ/2, x₀ + Δ/2]. Relative error = |Error| / |True|. When dividing U / L, the maximum possible value pairs U_max / L_min, and the minimum pairs U_min / L_max.\n\nTo solve f(x) = 0 numerically: (1) Bisection shrinks a sign-change bracket [a, b] where f(a)·f(b) < 0 by half every step; (2) Newton-Raphson follows the tangent line x_{n+1} = x_n − f(x_n) / f'(x_n) for rapid quadratic convergence whenever f'(x_n) ≠ 0. For definite integrals ∫_a^b y dx over n equal strips of width h = (b − a)/n: Trapezium Rule sums (h/2)[y₀ + 2(y₁ + ... + y_{n−1}) + y_n], whereas Simpson's Rule (requiring EVEN n) fits parabolic arcs using 1-4-2-4-...-4-1 weights: (h/3)[y₀ + y_n + 4(odd indices) + 2(even interior indices)].",
          conceptualModel:
            "Max Quotient = Top_max / Bot_min | Sign Change: f(a)f(b) < 0 | Newton: x_n − f(x_n)/f'(x_n) | Simpson (even n): (h/3)[Ends + 4·Odd + 2·Even].",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Newton-Raphson Iteration: x_{n+1} = x_n − f(x_n) / f'(x_n)",
              definition: "Tangent-line root finder converging quadratically when started near a simple root.",
              practicalExample: "For x² − 5 = 0 starting at x₀ = 2: x₁ = 2 − (4−5)/(2·2) = 2.25 (√5 ≈ 2.236)."
            },
            {
              termOrSymbol: "Trapezium Rule: ∫ y dx ≈ (h/2)[y₀ + y_n + 2Σ y_mid]",
              definition: "Approximates area with straight-topped trapezoids of equal width h = (b − a)/n.",
              practicalExample: "If f'' > 0 (concave up), trapezoids sit slightly ABOVE the curve (overestimate)."
            },
            {
              termOrSymbol: "Simpson's 1/3 Rule: (h/3)[y₀ + y_n + 4Σy_odd + 2Σy_even]",
              definition: "Fits quadratic parabolas across pairs of strips (requires EVEN strip count n, odd ordinates).",
              practicalExample: "Exact for all polynomials up to degree 3 (cubics!)."
            }
          ],
          workedExamples: [
            {
              title: "Two Steps of Newton-Raphson for √7 Approximation",
              problemStatement: "Apply Newton-Raphson to f(x) = x² − 7 starting at x₀ = 3 to compute x₁ and x₂ as exact fractions.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Differentiate f(x) = x² − 7.",
                  reasoning: "f'(x) = 2x."
                },
                {
                  stepNumber: 2,
                  instruction: "Simplify the Newton recurrence x_{n+1} = x_n − (x_n² − 7)/(2x_n).",
                  reasoning: "x_{n+1} = (2x_n² − x_n² + 7)/(2x_n) = ½(x_n + 7/x_n)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute x₁ from x₀ = 3.",
                  reasoning: "x₁ = ½(3 + 7/3) = ½(16/3) = 8/3 ≈ 2.6667."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute x₂ from x₁ = 8/3.",
                  reasoning: "x₂ = ½(8/3 + 21/8) = ½((64 + 63)/24) = 127/48 ≈ 2.64583 (√7 ≈ 2.64575!)."
                }
              ],
              takeawayRule: "Simplifying the Newton expression algebraically first reduces rounding error and arithmetic slips."
            },
            {
              title: "Simpson's Rule With n = 4 Strips on ∫₀² x³ dx",
              problemStatement: "Approximate ∫₀² x³ dx with n = 4 strips using Simpson's 1/3 Rule and verify against exact integration.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute strip width h = (b − a) / n and list 5 ordinates.",
                  reasoning: "h = (2 − 0)/4 = 0.5. Nodes x = 0, 0.5, 1.0, 1.5, 2.0."
                },
                {
                  stepNumber: 2,
                  instruction: "Evaluate y_i = x_i³ at all 5 nodes.",
                  reasoning: "y₀ = 0, y₁ = 0.125, y₂ = 1, y₃ = 3.375, y₄ = 8."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply 1-4-2-4-1 Simpson weights: (h/3)[y₀ + y₄ + 4(y₁ + y₃) + 2(y₂)].",
                  reasoning: "(0.5 / 3)[0 + 8 + 4(0.125 + 3.375) + 2(1)] = (1/6)[8 + 4(3.5) + 2] = (1/6)[8 + 14 + 2] = 24 / 6 = 4.0."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify against exact analytic integral.",
                  reasoning: "[x⁴/4]₀² = 16/4 − 0 = 4.0 (zero error because Simpson's Rule is exact on cubics!)."
                }
              ],
              takeawayRule: "Check even n (odd count of y-values) for Simpson's Rule, and label interior indices y₁, y₃ (×4) vs y₂ (×2) cleanly."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Pairing U_max / L_max when finding the upper bound of a fraction U / L.",
              whyItIsWrong: "Dividing by the largest denominator shrinks the fraction instead of maximizing it.",
              correctCorrection: "Maximize a quotient via Top_max / Bottom_min, and minimize via Top_min / Bottom_max."
            },
            {
              misconception: "Swapping the 4 and 2 weights or using odd n in Simpson's Rule.",
              whyItIsWrong: "Simpson's weights always start and end with 4 adjacent to the endpoints: 1, 4, 2, 4, ..., 4, 1.",
              correctCorrection: "Count strips n first: n MUST be even so interior indices alternate 4 (odd) and 2 (even)."
            }
          ],
          guidedPracticePrompt: "Show f(x) = x³ + 2x − 5 has a root in [1, 2] and perform 2 bisection steps.",
          independentPracticePrompt: "Estimate ∫₁³ (1/x) dx with n = 2 strips using both Trapezium and Simpson's rules.",
          extensionActivity: "Check why Newton-Raphson fails if starting at a horizontal tangent f'(x₀) = 0.",
          diagnosticSelfCheck: "A speed is reported as v = d/t with d = 100 m (±0.5) and t = 10.0 s (±0.05). What is max v?",
          transferApplication: "Find root of x = cos x near 0.7 using x_{n+1} = x_n − (x_n − cos x_n)/(1 + sin x_n).",
          masteryAssessment: "Compute percentage error if π ≈ 22/7 vs 3.141593 (4 s.f.).",
          summaryRecap: "Bound quotients cross-wise (max/min), verify roots by sign flips, follow tangents via Newton-Raphson, and pair even-n strips in Simpson's 1-4-2-4-1 rule.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-num-1",
            type: "multiple_choice",
            questionText: "A student rounds 48.0 cm² as 50.0 cm². Calculate the percentage error of this approximation (to 2 decimal places).",
            mathExpression: "\\text{\\% Error} = \\frac{|\\text{Approx} - \\text{True}|}{|\\text{True}|} \\times 100\\%",
            options: ["4.17%", "4.00%", "2.00%", "4.35%"],
            correctAnswer: "4.17%",
            explanation: "Absolute error = |50.0 − 48.0| = 2.0. Relative error = 2.0 / 48.0 = 1/24 ≈ 0.041667 = 4.17%.",
            hintLadder: [
              "Absolute error = |50 − 48| = 2.",
              "Always divide by the TRUE value (48), not the rounded estimate (50).",
              "(2 / 48) × 100% = 4.166...%."
            ],
            misconceptionAlerts: [
              { trigger: "4.00%", note: "4.00% divides 2 by the rounded value 50 instead of the true value 48." }
            ],
            skillId: "skill-sss-numerical-methods",
            difficulty: "easy"
          },
          {
            id: "q-sss-num-2",
            type: "multiple_choice",
            questionText: "On which interval of length 1 does f(x) = x³ − 4x − 9 guarantee at least one real root by the sign-change test?",
            mathExpression: "f(a) \\cdot f(b) < 0",
            options: ["[2, 3]", "[1, 2]", "[0, 1]", "[3, 4]"],
            correctAnswer: "[2, 3]",
            explanation: "f(2) = 8 − 8 − 9 = −9 (< 0), while f(3) = 27 − 12 − 9 = +6 (> 0). Because continuous f changes sign from −9 to +6, a root exists in (2, 3).",
            hintLadder: [
              "Evaluate f(x) at integer values x = 0, 1, 2, 3, 4.",
              "f(1) = −12, f(2) = −9, f(3) = +6.",
              "Look for adjacent integers where f swaps between negative and positive."
            ],
            misconceptionAlerts: [
              { trigger: "[3, 4]", note: "Both f(3) = +6 and f(4) = +39 are positive." }
            ],
            skillId: "skill-sss-numerical-methods",
            difficulty: "easy"
          },
          {
            id: "q-sss-num-3",
            type: "multiple_choice",
            questionText: "Perform ONE Newton-Raphson iteration starting at x₀ = 2 for the equation f(x) = x³ − 2x − 5 = 0 to find x₁.",
            mathExpression: "x_1 = x_0 - \\frac{f(x_0)}{f'(x_0)}",
            options: ["2.1", "2.2", "1.9", "2.05"],
            correctAnswer: "2.1",
            explanation: "f(2) = 8 − 4 − 5 = −1. Derivative f'(x) = 3x² − 2 ⇒ f'(2) = 12 − 2 = 10. Thus x₁ = 2 − (−1)/10 = 2.1.",
            hintLadder: [
              "Compute f(2) = 2³ − 2(2) − 5 = −1.",
              "Compute f'(x) = 3x² − 2 and evaluate at x = 2: 3(4) − 2 = 10.",
              "Substitute into x₁ = 2 − (−1)/10."
            ],
            misconceptionAlerts: [
              { trigger: "1.9", note: "Watch the double minus sign: 2 − (−1/10) = 2 + 0.1 = 2.1." }
            ],
            skillId: "skill-sss-numerical-methods",
            difficulty: "medium"
          },
          {
            id: "q-sss-num-4",
            type: "multiple_choice",
            questionText: "Use Simpson's 1/3 Rule with n = 2 strips (h = 1) on nodes x = 0, 1, 2 to estimate ∫₀² (1 / (1 + x²)) dx.",
            mathExpression: "\\frac{h}{3}(y_0 + 4y_1 + y_2)",
            options: ["16/15", "7/6", "11/10", "6/5"],
            correctAnswer: "16/15",
            explanation: "y₀ = 1/(1+0) = 1; y₁ = 1/(1+1) = 1/2; y₂ = 1/(1+4) = 1/5. Simpson estimate = (1/3)[1 + 4(1/2) + 1/5] = (1/3)[3 + 1/5] = (1/3)(16/5) = 16/15 ≈ 1.067.",
            hintLadder: [
              "Compute y₀ = 1, y₁ = 1/2, y₂ = 1/5 with step h = 1.",
              "Apply Simpson weights (1, 4, 1): 1 + 4(1/2) + 1/5 = 16/5.",
              "Multiply by h/3 = 1/3."
            ],
            misconceptionAlerts: [
              { trigger: "11/10", note: "11/10 is the Trapezium estimate (½[1 + 2(½) + ⅕] = 1.10), not Simpson's Rule." }
            ],
            skillId: "skill-sss-numerical-methods",
            difficulty: "medium"
          },
          {
            id: "q-sss-num-5",
            type: "multiple_choice",
            questionText: "Density ρ = M / V is measured with Mass M = 40.0 g (to nearest 0.1 g) and Volume V = 8.0 cm³ (to nearest 0.2 cm³). What is the MAXIMUM possible true density ρ_max (to 3 decimal places)?",
            mathExpression: "\\rho_{\\max} = \\frac{M_{\\max}}{V_{\\min}}",
            options: ["5.070 g/cm³", "4.950 g/cm³", "5.006 g/cm³", "4.932 g/cm³"],
            correctAnswer: "5.070 g/cm³",
            explanation: "Half-unit tolerances: M ∈ [39.95, 40.05] g and V ∈ [7.9, 8.1] cm³. Maximizing quotient gives ρ_max = M_max / V_min = 40.05 / 7.9 = 5.0696... ≈ 5.070 g/cm³.",
            hintLadder: [
              "Compute half-precision bounds: ΔM = ±0.05 g so M_max = 40.05; ΔV = ±0.1 cm³ so V_min = 7.9.",
              "Pair largest numerator with SMALLEST denominator to maximize the quotient.",
              "Divide 40.05 by 7.9."
            ],
            misconceptionAlerts: [
              { trigger: "4.950 g/cm³", note: "40.05 / 8.1 uses V_max in the denominator, reducing instead of maximizing density." }
            ],
            skillId: "skill-sss-numerical-methods",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
