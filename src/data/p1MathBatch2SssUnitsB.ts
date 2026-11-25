import { Unit } from "../types/curriculum";

export const P1_MATH_BATCH2_SSS_UNITS_B: Unit[] = [
  // =========================================================================
  // 1. univ_257_calculus_mechanics_design_analysis
  // =========================================================================
  {
    id: "unit-p1-univ-calculus-mechanics-design",
    subjectId: "univ_257_calculus_mechanics_design_analysis",
    level: "university_prep",
    title: "Engineering Foundation: Calculus Optimization, Kinematics & Beam Statics",
    code: "UNV-CAL-257",
    description:
      "Master engineering optimization (minimum surface area, constrained maxima), variable-acceleration calculus kinematics, static equilibrium moments (ΣF = 0, ΣM = 0), and bending moment/shear force design.",
    order: 18,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "ENG_YEAR1:CAL-STAT-257",
      "WAEC_FURTHER_MATH:MEC-KIN-257",
      "CAMBRIDGE_ALEVEL:MECH-STAT-OPT"
    ],
    skills: [
      {
        id: "skill-univ-calculus-mechanics-design",
        unitId: "unit-p1-univ-calculus-mechanics-design",
        title: "Engineering Optimization, Variable Kinematics & Beam Equilibrium",
        code: "SKL-UNV-CAL-257",
        summary:
          "Minimize material cost under volume constraints via derivatives, integrate variable acceleration a(t), and resolve forces and moments on simply supported beams.",
        objectives: [
          "Formulate single-variable cost/area functions from constraint equations and verify minima via f''(x) > 0",
          "Move along s(t) ↔ v(t) ↔ a(t) via derivatives and definite displacement/velocity integrals",
          "Compute support reactions R_A and R_B on loaded beams using ΣF_y = 0 and ΣM = 0"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-sss-calculus-vectors-ode", "skill-uni-lhopital-partials"],
        lesson: {
          id: "les-univ-calculus-mechanics-design",
          title: "Engineering Calculus, Kinematics & Structural Statics",
          hookAndIntuition:
            "Beverage can designers solve dA/dr = 0 to save millions of tonnes of aluminium, while bridge engineers balance ΣM = 0 so every girder carries load safely without tipping.",
          conceptualExplanation:
            "Constrained engineering design minimizes surface area, stress, or cost subject to fixed capacity (e.g., V = πr²h). Express the second dimension in terms of the primary variable (h = V/(πr²)), substitute into the objective A(r), set dA/dr = 0, and confirm A''(r) > 0 for a true minimum.\n\nWhen acceleration varies with time (a(t) ≠ constant), SUVAT formulas are invalid; instead v(t) = ∫ a(t) dt and s(t) = ∫ v(t) dt. Total distance integrates |v(t)|, splitting intervals whenever v(t) = 0 (turning points). In static design, a rigid beam in equilibrium satisfies both translational balance (ΣF_y = 0, upward supports = downward loads) and rotational moment balance (ΣM_pivot = 0 clockwise = anticlockwise about any chosen support).",
          conceptualModel:
            "Opt: Eliminate 2nd var → dA/dr=0 → A''>0 | Variable a(t): v = ds/dt, a = dv/dt | Beam Statics: ΣF_y = 0 & ΣM_A = 0.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Variable-Acceleration Calculus Chain",
              definition: "v(t) = ds/dt, a(t) = dv/dt = d²s/dt² = v(dv/ds); ∫_t₁^t₂ v(t) dt = net displacement.",
              practicalExample: "If a(t) = 6t − 4 and v(0) = 2, then v(t) = 3t² − 4t + 2."
            },
            {
              termOrSymbol: "Beam Equilibrium Conditions: ΣF_y = 0, ΣM = 0",
              definition: "Taking moments directly about Support A eliminates unknown reaction R_A immediately.",
              practicalExample: "If 600 N sits 2 m from A on a 6 m beam, R_B(6) = 600(2) ⇒ R_B = 200 N, R_A = 400 N."
            },
            {
              termOrSymbol: "Closed Cylindrical Can Optimum: h = 2r",
              definition: "Minimizing A = 2πr² + 2V/r sets 4πr = 2V/r², yielding diameter = height.",
              practicalExample: "For V = 54π cm³, r³ = 27 ⇒ r = 3 cm, optimal height h = 6 cm."
            }
          ],
          workedExamples: [
            {
              title: "Minimum Metal Surface Area for an Open-Top Square Tank",
              problemStatement: "Design an open-top rectangular tank with square base side x and height h holding fixed volume V = 32 m³ to minimize total sheet metal surface area S.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Write volume constraint and express height h in terms of base side x.",
                  reasoning: "V = x²h = 32 ⇒ h = 32 / x²."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute h into open-top surface area S = x² + 4xh.",
                  reasoning: "S(x) = x² + 4x(32 / x²) = x² + 128 x⁻¹."
                },
                {
                  stepNumber: 3,
                  instruction: "Set dS/dx = 0 to locate critical base width x.",
                  reasoning: "dS/dx = 2x − 128/x² = 0 ⇒ 2x³ = 128 ⇒ x³ = 64 ⇒ x = 4 m."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify minimum via S''(4) > 0 and compute optimal h.",
                  reasoning: "S''(x) = 2 + 256/x³ > 0 (confirmed minimum). Height h = 32 / 4² = 2 m, giving S_min = 16 + 32 = 48 m²."
                }
              ],
              takeawayRule: "Open-top vessels optimize at h = x/2 (half-cube), whereas closed square boxes optimize at h = x (full cube)."
            },
            {
              title: "Support Reactions on a Loaded Simply Supported Steel Beam",
              problemStatement: "A uniform 10 m beam of weight 400 N (acting at its midpoint 5 m) rests on supports at A (0 m) and B (10 m). A 600 N motor sits at x = 2 m. Find R_A and R_B.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Take rotational moments about support A (eliminating R_A · 0 = 0).",
                  reasoning: "Clockwise moments = 600(2) + 400(5) = 1,200 + 2,000 = 3,200 N·m."
                },
                {
                  stepNumber: 2,
                  instruction: "Equate to anticlockwise moment from reaction R_B at distance 10 m.",
                  reasoning: "10 R_B = 3,200 ⇒ R_B = 320 N."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply vertical force balance ΣF_y = 0 to solve R_A.",
                  reasoning: "R_A + R_B = 600 + 400 = 1,000 N ⇒ R_A = 1,000 − 320 = 680 N."
                },
                {
                  stepNumber: 4,
                  instruction: "Check moments about B as an independent verification.",
                  reasoning: "680(10) = 6,800 N·m vs 600(8) + 400(5) = 4,800 + 2,000 = 6,800 N·m (verified)."
                }
              ],
              takeawayRule: "Always include the uniform beam's own self-weight acting through its geometric center when summing moments."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Using constant-acceleration s = ut + ½at² when a(t) depends on t.",
              whyItIsWrong: "SUVAT equations assume zero jerk (da/dt = 0) and give large errors for time-varying forces.",
              correctCorrection: "Integrate acceleration with respect to time: v(t) = ∫ a(t) dt + v₀."
            },
            {
              misconception: "Omitting the beam's own weight when calculating support reactions.",
              whyItIsWrong: "Any uniform beam with specified weight or mass exerts a downward force at its midpoint L/2.",
              correctCorrection: "Place the uniform beam's weight arrow directly at L/2 before summing ΣF_y and ΣM."
            }
          ],
          guidedPracticePrompt: "A particle moves with v(t) = 3t² − 12t + 9 m/s. Find the times when it is instantaneously at rest.",
          independentPracticePrompt: "An open-top cylindrical tank of volume 27π m³ minimizes steel area S = πr² + 2πrh. Find r.",
          extensionActivity: "Integrate ∫₀⁴ |3t² − 12t + 9| dt to compute total distance vs net displacement.",
          diagnosticSelfCheck: "Where does a uniform 8 m girder's weight act, and why?",
          transferApplication: "Size cantilever bracket anchor bolts using ΣM_fulcrum = 0 for a wall-mounted solar array.",
          masteryAssessment: "Find maximum rectangular garden area enclosed against a straight brick wall using 80 m of fencing on 3 sides.",
          summaryRecap: "Eliminate secondary constraints before setting dS/dx = 0, integrate time-varying acceleration, and balance ΣF = 0 and ΣM = 0 on beams.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-unv-cal-1",
            type: "multiple_choice",
            questionText: "A particle's position (in meters) along a track is s(t) = t³ − 6t² + 9t + 4. At what time t > 0 is its acceleration equal to zero?",
            mathExpression: "a(t) = s''(t) = 0",
            options: ["t = 2 s", "t = 1 s", "t = 3 s", "t = 4 s"],
            correctAnswer: "t = 2 s",
            explanation: "Velocity v(t) = s'(t) = 3t² − 12t + 9. Acceleration a(t) = v'(t) = 6t − 12. Setting 6t − 12 = 0 yields t = 2 s.",
            hintLadder: [
              "Differentiate s(t) once to obtain velocity v(t) = 3t² − 12t + 9.",
              "Differentiate v(t) to get acceleration a(t) = 6t − 12.",
              "Solve 6t − 12 = 0."
            ],
            misconceptionAlerts: [
              { trigger: "t = 1 s", note: "t = 1 s and t = 3 s are times when VELOCITY is zero, not acceleration." }
            ],
            skillId: "skill-univ-calculus-mechanics-design",
            difficulty: "easy"
          },
          {
            id: "q-unv-cal-2",
            type: "multiple_choice",
            questionText: "A uniform 6 m plank weighs 200 N and rests on two supports at its ends A (0 m) and B (6 m). A 400 N load rests 1.5 m from end A. Calculate the upward reaction R_B at end B.",
            mathExpression: "\\Sigma M_A = 0 \\implies 6 R_B = 400(1.5) + 200(3)",
            options: ["200 N", "400 N", "300 N", "100 N"],
            correctAnswer: "200 N",
            explanation: "Taking moments about A: 6 R_B = 400(1.5) + 200(3) = 600 + 600 = 1,200 N·m ⇒ R_B = 1,200 / 6 = 200 N.",
            hintLadder: [
              "Remember the uniform 200 N plank weight acts at its midpoint (3 m from A).",
              "Sum clockwise moments about A: 400(1.5) + 200(3) = 1,200 N·m.",
              "Divide by beam span 6 m."
            ],
            misconceptionAlerts: [
              { trigger: "100 N", note: "100 N omits the plank's own 200 N weight acting at 3 m." }
            ],
            skillId: "skill-univ-calculus-mechanics-design",
            difficulty: "easy"
          },
          {
            id: "q-unv-cal-3",
            type: "multiple_choice",
            questionText: "A farmer uses 120 m of fencing on three sides (two widths x and one length y) against a straight stone wall. What is the MAXIMUM enclosed rectangular area?",
            mathExpression: "2x + y = 120,\\quad A = xy",
            options: ["1,800 m²", "900 m²", "1,600 m²", "2,400 m²"],
            correctAnswer: "1,800 m²",
            explanation: "y = 120 − 2x ⇒ A(x) = x(120 − 2x) = 120x − 2x². Setting dA/dx = 120 − 4x = 0 gives x = 30 m, y = 60 m, A_max = 30 × 60 = 1,800 m².",
            hintLadder: [
              "Express y = 120 − 2x (only 3 sides are fenced).",
              "Maximize A(x) = 120x − 2x² by setting dA/dx = 0.",
              "Evaluate A at x = 30, y = 60."
            ],
            misconceptionAlerts: [
              { trigger: "900 m²", note: "900 m² assumes all 4 sides use the 120 m fence (30×30 square)." }
            ],
            skillId: "skill-univ-calculus-mechanics-design",
            difficulty: "medium"
          },
          {
            id: "q-unv-cal-4",
            type: "multiple_choice",
            questionText: "A prototype vehicle starts from rest (v(0) = 0) with time-varying acceleration a(t) = 6t + 2 m/s². How far does it travel in the first t = 3 seconds?",
            mathExpression: "s(3) = \\int_0^3 \\left(\\int_0^t a(\\tau)\\,d\\tau\\right) dt",
            options: ["36 m", "33 m", "27 m", "54 m"],
            correctAnswer: "36 m",
            explanation: "v(t) = ∫(6t + 2) dt = 3t² + 2t (since v(0)=0). Integrating again: s(t) = t³ + t². At t = 3: s(3) = 27 + 9 = 36 m.",
            hintLadder: [
              "Do NOT use SUVAT because acceleration 6t + 2 changes with time.",
              "Integrate a(t) to get v(t) = 3t² + 2t.",
              "Integrate v(t) from 0 to 3: [t³ + t²]₀³."
            ],
            misconceptionAlerts: [
              { trigger: "54 m", note: "54 m omits dividing powers cleanly during integration (2t³ vs t³)." }
            ],
            skillId: "skill-univ-calculus-mechanics-design",
            difficulty: "medium"
          },
          {
            id: "q-unv-cal-5",
            type: "multiple_choice",
            questionText: "Find the radius r that minimizes the total surface area S = 2πr² + 2πrh of a CLOSED cylindrical tank holding exact volume V = 16π m³.",
            mathExpression: "\\frac{d}{dr}\\left(2\\pi r^2 + \\frac{32\\pi}{r}\\right) = 0",
            options: ["2 m", "4 m", "2√2 m", "∛16 m"],
            correctAnswer: "2 m",
            explanation: "V = πr²h = 16π ⇒ h = 16/r². Surface area S(r) = 2πr² + 2πr(16/r²) = 2πr² + 32π r⁻¹. Setting dS/dr = 4πr − 32π/r² = 0 ⇒ r³ = 8 ⇒ r = 2 m (and h = 4 m = 2r).",
            hintLadder: [
              "Eliminate h using πr²h = 16π ⇒ h = 16/r².",
              "Substitute h into S = 2πr² + 2πrh = 2πr² + 32π/r.",
              "Differentiate S(r), set dS/dr = 0, and solve for r³."
            ],
            misconceptionAlerts: [
              { trigger: "4 m", note: "4 m is the optimal HEIGHT h = 2r, whereas the question asks for radius r." }
            ],
            skillId: "skill-univ-calculus-mechanics-design",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. sss_270_data_analytics_statistical_computing
  // =========================================================================
  {
    id: "unit-p1-sss-data-analytics-stats",
    subjectId: "sss_270_data_analytics_statistical_computing",
    level: "senior_secondary",
    title: "Data Analytics, Variance/Z-Scores, Correlation & Least-Squares Regression",
    code: "SSS-DAT-270",
    description:
      "Master sample vs population variance, Z-score standardization, Empirical 68-95-99.7 rule, Pearson correlation r, ordinary least-squares regression ŷ = a + bx, and outlier diagnostics.",
    order: 19,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:STA-REG-270",
      "JAMB_UTME:STA-VAR-270",
      "CAMBRIDGE_ALEVEL:STA-COR-REG"
    ],
    skills: [
      {
        id: "skill-sss-data-analytics-stats",
        unitId: "unit-p1-sss-data-analytics-stats",
        title: "Dispersion, Normal Z-Scores & Linear Regression Analytics",
        code: "SKL-SSS-DAT-270",
        summary:
          "Standardize distributions using Z = (x − μ)/σ, fit least-squares regression lines through centroid (x̄, ȳ), and distinguish correlation from causation.",
        objectives: [
          "Compute variance σ² = (Σx²/n) − x̄² and interpret Z-scores on Normal curves",
          "Fit regression slope b = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)² and force line passage through (x̄, ȳ)",
          "Detect extrapolation risks and residual patterns when evaluating regression fit R²"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-stats-dispersion", "skill-jss-data-sampling-stats"],
        lesson: {
          id: "les-sss-data-analytics-stats",
          title: "Data Analytics, Standardization & Regression",
          hookAndIntuition:
            "Data analysts compare a 72% Physics score against a 64% Chemistry score fairly by converting both to Z-scores, and forecast demand safely using least-squares regression lines.",
          conceptualExplanation:
            "Standard deviation σ measures spread around mean x̄: σ² = (Σx² / n) − x̄² (or divided by n − 1 for Bessel-corrected sample variance s²). Shifting every data point by +c preserves σ; multiplying every point by k scales σ by |k| and variance by k². Standardizing x into Z = (x − μ)/σ enables comparing unrelated distributions: under a Normal bell curve, roughly 68% lie within ±1σ, 95% within ±2σ, and 99.7% within ±3σ.\n\nFor paired data (xᵢ, yᵢ), Pearson correlation r ∈ [−1, +1] measures linear strength (r² = R² is proportion of variance explained), while Least-Squares Regression ŷ = a + bx minimizes Σ(yᵢ − ŷᵢ)² using b = S_xy / S_xx and intercept a = ȳ − b x̄—meaning every regression line passes strictly through centroid (x̄, ȳ). Correlation never proves causation due to potential confounding variables, and predicting outside observed x-bounds risks invalid extrapolation.",
          conceptualModel:
            "Z = (x − μ)/σ | Shift +c: σ unchanged | Scale ×k: σ' = |k|σ | Regression passes through (x̄, ȳ) with a = ȳ − bx̄ | R² = r².",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Z-Score Standardization: Z = (x − μ) / σ",
              definition: "Measures how many standard deviations an observation sits above or below the mean.",
              practicalExample: "If μ = 60, σ = 8, then x = 76 gives Z = (76 − 60)/8 = +2.0 (top ~2.5%)."
            },
            {
              termOrSymbol: "Least-Squares Regression Line: ŷ = a + bx",
              definition: "b = S_xy / S_xx = r(s_y / s_x), and a = ȳ − bx̄ guarantees passage through (x̄, ȳ).",
              practicalExample: "If x̄ = 10, ȳ = 50, and b = 3, then a = 50 − 3(10) = 20 ⇒ ŷ = 20 + 3x."
            },
            {
              termOrSymbol: "Linear Rescaling of Variance: Var(aX + b) = a² Var(X)",
              definition: "Adding constant b shifts location only; multiplying by a scales SD by |a| and variance by a².",
              practicalExample: "Converting °C (σ = 5°C) via °F = 1.8°C + 32 yields σ_F = 1.8 × 5 = 9°F."
            }
          ],
          workedExamples: [
            {
              title: "Fitting an Ordinary Least-Squares Regression Equation",
              problemStatement: "Given 4 paired observations: (1, 3), (2, 5), (3, 7), (4, 9) — actually with noisy y: (1, 2), (2, 5), (3, 6), (4, 11). Compute x̄, ȳ, slope b, and intercept a.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute sample means x̄ and ȳ.",
                  reasoning: "x̄ = (1+2+3+4)/4 = 2.5; ȳ = (2+5+6+11)/4 = 24/4 = 6.0."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute deviations (x − x̄) and (y − ȳ) and their cross-products.",
                  reasoning: "x−2.5: −1.5, −0.5, 0.5, 1.5; y−6: −4, −1, 0, +5. S_xy = (−1.5)(−4)+(−0.5)(−1)+(0.5)(0)+(1.5)(5) = 6 + 0.5 + 0 + 7.5 = 14."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute S_xx = Σ(x − x̄)² and slope b = S_xy / S_xx.",
                  reasoning: "S_xx = 2.25 + 0.25 + 0.25 + 2.25 = 5.0. Therefore b = 14 / 5 = 2.8."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute intercept a = ȳ − bx̄.",
                  reasoning: "a = 6.0 − 2.8(2.5) = 6.0 − 7.0 = −1.0, giving ŷ = −1 + 2.8x."
                }
              ],
              takeawayRule: "Every least-squares regression line passes cleanly through centroid (x̄, ȳ), letting you find intercept a in one line."
            },
            {
              title: "Comparing Exam Scores Across Subjects via Z-Scores",
              problemStatement: "Amaka scored 78 in Mathematics (μ = 66, σ = 8) and 82 in Biology (μ = 70, σ = 10). In which subject was her relative standing stronger?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute Mathematics Z-score.",
                  reasoning: "Z_math = (78 − 66) / 8 = 12 / 8 = +1.50."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute Biology Z-score.",
                  reasoning: "Z_bio = (82 − 70) / 10 = 12 / 10 = +1.20."
                },
                {
                  stepNumber: 3,
                  instruction: "Compare standardized distances above the class mean.",
                  reasoning: "Both scores sit +12 raw points above average, yet +1.50σ > +1.20σ."
                },
                {
                  stepNumber: 4,
                  instruction: "Conclude relative standing.",
                  reasoning: "Amaka's relative performance was higher in Mathematics (Z = +1.50)."
                }
              ],
              takeawayRule: "Raw score minus mean is meaningless without dividing by standard deviation σ."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding constant b to standard deviation when transforming Y = aX + b.",
              whyItIsWrong: "Adding +b moves every value equally, leaving distances between values (spread σ) completely unchanged.",
              correctCorrection: "μ(aX + b) = aμ(X) + b, whereas σ(aX + b) = |a|σ(X)."
            },
            {
              misconception: "Using correlation r = 0.92 between ice-cream sales and drownings to claim ice cream causes drownings.",
              whyItIsWrong: "Both rise together due to hot summer weather (a lurking confounding variable).",
              correctCorrection: "Strong |r| quantifies linear association only, never causal mechanism without controlled design."
            }
          ],
          guidedPracticePrompt: "If marks X have mean 50 and σ = 6, what are the mean and σ of scaled marks Y = 1.5X + 10?",
          independentPracticePrompt: "Given r = −0.80, what percentage of variation in y is explained by the linear regression on x (R²)?",
          extensionActivity: "Check why predicting x = 50 from a regression trained on x ∈ [1, 10] fails (extrapolation hazard).",
          diagnosticSelfCheck: "If x̄ = 12, ȳ = 40, and regression line is ŷ = a + 2.5x, find a.",
          transferApplication: "Flag sensor anomalies automatically when live readings breach |Z| > 3.0.",
          masteryAssessment: "Compute population variance σ² for dataset {4, 6, 8, 10, 12}.",
          summaryRecap: "Standardize with Z = (x − μ)/σ, rescale σ by |a| only, anchor regression lines at (x̄, ȳ), and never confuse correlation with causation.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-dat-1",
            type: "multiple_choice",
            questionText: "Exam scores follow mean μ = 64 and standard deviation σ = 8. What Z-score corresponds to a student score of 84?",
            mathExpression: "Z = \\frac{x - \\mu}{\\sigma}",
            options: ["+2.5", "+2.0", "-2.5", "+1.25"],
            correctAnswer: "+2.5",
            explanation: "Z = (84 − 64) / 8 = 20 / 8 = +2.5 standard deviations above the mean.",
            hintLadder: [
              "Subtract the mean from the score: 84 − 64 = 20.",
              "Divide by standard deviation σ = 8.",
              "20 ÷ 8 = 2.5."
            ],
            misconceptionAlerts: [
              { trigger: "-2.5", note: "Since 84 > 64 (above average), the Z-score must be positive." }
            ],
            skillId: "skill-sss-data-analytics-stats",
            difficulty: "easy"
          },
          {
            id: "q-sss-dat-2",
            type: "multiple_choice",
            questionText: "A dataset X has mean 40 and standard deviation 5. Every value is transformed via Y = 2X + 15. What are the new mean and standard deviation of Y?",
            mathExpression: "\\mu_Y = 2\\mu_X + 15,\\quad \\sigma_Y = 2\\sigma_X",
            options: [
              "Mean = 95, SD = 10",
              "Mean = 95, SD = 25",
              "Mean = 80, SD = 10",
              "Mean = 95, SD = 5"
            ],
            correctAnswer: "Mean = 95, SD = 10",
            explanation: "Mean scales and shifts: 2(40) + 15 = 95. Standard deviation scales by |2| only (shifting +15 does not change spread): 2 × 5 = 10.",
            hintLadder: [
              "Transform mean with both operations: 2(40) + 15 = 95.",
              "Remember adding +15 shifts all data equally without changing spread.",
              "Multiply SD by 2 only: 2 × 5 = 10."
            ],
            misconceptionAlerts: [
              { trigger: "Mean = 95, SD = 25", note: "Adding +15 affects the mean, never the standard deviation." }
            ],
            skillId: "skill-sss-data-analytics-stats",
            difficulty: "easy"
          },
          {
            id: "q-sss-dat-3",
            type: "multiple_choice",
            questionText: "In a bivariate dataset, x̄ = 12, ȳ = 50, and the least-squares regression line has slope b = 2.5. Find the equation of the regression line ŷ = a + bx.",
            mathExpression: "a = \\bar{y} - b\\bar{x}",
            options: ["ŷ = 20 + 2.5x", "ŷ = 38 + 2.5x", "ŷ = 50 + 2.5x", "ŷ = -20 + 2.5x"],
            correctAnswer: "ŷ = 20 + 2.5x",
            explanation: "Every least-squares line passes through (x̄, ȳ). Thus a = 50 − 2.5(12) = 50 − 30 = 20, yielding ŷ = 20 + 2.5x.",
            hintLadder: [
              "Recall the regression line must pass through (x̄, ȳ) = (12, 50).",
              "Compute a = ȳ − bx̄ = 50 − 2.5(12).",
              "50 − 30 = 20."
            ],
            misconceptionAlerts: [
              { trigger: "ŷ = 50 + 2.5x", note: "50 is ȳ (at x = 12), not the y-intercept a (at x = 0)." }
            ],
            skillId: "skill-sss-data-analytics-stats",
            difficulty: "medium"
          },
          {
            id: "q-sss-dat-4",
            type: "multiple_choice",
            questionText: "If Pearson correlation between study hours and exam scores is r = +0.85, what percentage of the variation in exam scores is explained by the linear relationship (R²)?",
            mathExpression: "R^2 = r^2 \\times 100\\%",
            options: ["72.25%", "85.00%", "92.20%", "15.00%"],
            correctAnswer: "72.25%",
            explanation: "Coefficient of determination R² = r² = 0.85² = 0.7225 = 72.25%.",
            hintLadder: [
              "Explained variance fraction equals the coefficient of determination R² = r².",
              "Square 0.85: 0.85 × 0.85 = 0.7225.",
              "Convert to percentage."
            ],
            misconceptionAlerts: [
              { trigger: "85.00%", note: "85% is r itself; explained variance requires squaring r to r²." }
            ],
            skillId: "skill-sss-data-analytics-stats",
            difficulty: "medium"
          },
          {
            id: "q-sss-dat-5",
            type: "multiple_choice",
            questionText: "Calculate the population standard deviation σ (exact radical) of the five measurements {2, 4, 6, 8, 10}.",
            mathExpression: "\\sigma = \\sqrt{\\frac{\\Sigma x^2}{n} - \\bar{x}^2}",
            options: ["√8", "√10", "√6", "4"],
            correctAnswer: "√8",
            explanation: "Mean x̄ = 30/5 = 6. Squared deviations from 6: (−4)² + (−2)² + 0² + 2² + 4² = 16 + 4 + 0 + 4 + 16 = 40. Population variance σ² = 40 / 5 = 8, so σ = √8 (≈ 2.83).",
            hintLadder: [
              "Find mean x̄ = (2 + 4 + 6 + 8 + 10) / 5 = 6.",
              "Square each deviation from 6 and sum: 16 + 4 + 0 + 4 + 16 = 40.",
              "Divide by n = 5 for population variance σ² = 8, then take √8."
            ],
            misconceptionAlerts: [
              { trigger: "√10", note: "√10 divides by n − 1 = 4 (sample SD s), whereas population σ divides by n = 5." }
            ],
            skillId: "skill-sss-data-analytics-stats",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. sss_272_engineering_mathematics_applied_mech
  // =========================================================================
  {
    id: "unit-p1-sss-engineering-math-mechanics",
    subjectId: "sss_272_engineering_mathematics_applied_mech",
    level: "senior_secondary",
    title: "Engineering Mathematics: Gear Ratios, Torque, Force Resolution & Truss Statics",
    code: "SSS-ENG-272",
    description:
      "Master engineering unit conversions, vector force resolution (F cos θ, F sin θ), inclined plane friction, torque-power relations (P = τω), and mechanical advantage / gear velocity ratios.",
    order: 20,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:ENG-MTH-272",
      "NABTEB:ENG-MEC-272",
      "CAMBRIDGE_IGCSE:ENG-TEC-MAT"
    ],
    skills: [
      {
        id: "skill-sss-engineering-math-mechanics",
        unitId: "unit-p1-sss-engineering-math-mechanics",
        title: "Force Resolution, Gear Trains, Torque & Mechanical Efficiency",
        code: "SKL-SSS-ENG-272",
        summary:
          "Resolve angled force systems into orthogonal components, compute machine Mechanical Advantage, Velocity Ratio, and efficiency, and evaluate shaft torque and power.",
        objectives: [
          "Resolve coplanar forces into ΣF_x and ΣF_y to find resultant magnitude √(F_x² + F_y²) and direction",
          "Distinguish Velocity Ratio (VR = N_driven / N_driver) from Mechanical Advantage (MA = Load / Effort) and Efficiency (η = MA / VR)",
          "Compute rotational power P = τω using angular velocity ω = 2πN/60 rad/s"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-trig-bearings", "skill-univ-calculus-mechanics-design"],
        lesson: {
          id: "les-sss-engineering-math-mechanics",
          title: "Applied Engineering Math & Mechanics",
          hookAndIntuition:
            "When a winch lifts 500 kg through a 4:1 compound gearbox or a crane jib balances angled cables, trigonometric force resolution and torque-speed conservation govern every bolt.",
          conceptualExplanation:
            "Every coplanar engineering force F at angle θ above horizontal splits into F_x = F cos θ and F_y = F sin θ. Summing ΣF_x and ΣF_y across multiple cables gives resultant R = √(ΣF_x² + ΣF_y²) at angle arctan(ΣF_y / ΣF_x). On a rough slope at angle α, normal reaction N = mg cos α and down-slope weight component = mg sin α.\n\nIn mechanical drives, a driver gear of z₁ teeth meshing with a driven gear of z₂ teeth gives Velocity Ratio VR = z₂ / z₁ (while output speed drops: N₂ = N₁(z₁/z₂), and output torque scales up!). Ideal machines obey MA = VR (100% efficient); real machines obey Efficiency η = (MA / VR) × 100%. For rotating shafts, torque τ = F·r transmits mechanical power P = τ · ω where ω = 2πN / 60 rad/s.",
          conceptualModel:
            "F_x = F cos θ, F_y = F sin θ | MA = Load/Effort | VR_gear = z_driven/z_driver | η = MA / VR | P = τω (ω = 2πN/60).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Machine Efficiency: η = (MA / VR) × 100%",
              definition: "Ratio of actual Mechanical Advantage to geometric Velocity Ratio.",
              practicalExample: "If VR = 5 and Load = 400 N is lifted by Effort = 100 N (MA = 4), η = 4/5 = 80%."
            },
            {
              termOrSymbol: "Gear Train Ratio: ω₁ z₁ = ω₂ z₂",
              definition: "Pitch-line speeds match at gear teeth, trading higher torque for lower RPM (or vice versa).",
              practicalExample: "20-tooth motor at 1,200 RPM drives 60-tooth gear at 1,200 × (20/60) = 400 RPM (VR = 3)."
            },
            {
              termOrSymbol: "Shaft Power & Torque: P = τ ω",
              definition: "Product of torque (N·m) and angular speed ω in radians per second.",
              practicalExample: "At ω = 100 rad/s and τ = 50 N·m, shaft power P = 5,000 W = 5 kW."
            }
          ],
          workedExamples: [
            {
              title: "Pulley Hoist Efficiency & Required Effort Under Friction",
              problemStatement: "A pulley system has Velocity Ratio VR = 6 and operates at 75% efficiency. What Effort E is needed to lift a 1,800 N engine block?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute actual Mechanical Advantage MA from η = MA / VR.",
                  reasoning: "0.75 = MA / 6 ⇒ MA = 0.75 × 6 = 4.5."
                },
                {
                  stepNumber: 2,
                  instruction: "Relate MA = Load / Effort to isolate Effort E.",
                  reasoning: "4.5 = 1,800 / E ⇒ E = 1,800 / 4.5."
                },
                {
                  stepNumber: 3,
                  instruction: "Divide cleanly (1,800 / 4.5 = 3,600 / 9).",
                  reasoning: "E = 400 N."
                },
                {
                  stepNumber: 4,
                  instruction: "Sanity-check against ideal frictionless effort.",
                  reasoning: "Ideal effort = 1,800 / 6 = 300 N; real effort = 400 N > 300 N (100 N lost to friction)."
                }
              ],
              takeawayRule: "Friction always makes actual Mechanical Advantage smaller than Velocity Ratio, requiring MORE effort than the ideal load/VR."
            },
            {
              title: "Resultant Magnitude of Two Concurrent Crane Pulls",
              problemStatement: "Two tugboats pull a barge: Boat 1 pulls 60 N due East (0°), and Boat 2 pulls 60 N at 60° North of East. Find the exact resultant magnitude R.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Resolve both forces into East (x) and North (y) components.",
                  reasoning: "F₁ = (60, 0); F₂ = (60 cos 60°, 60 sin 60°) = (30, 30√3)."
                },
                {
                  stepNumber: 2,
                  instruction: "Sum orthogonal components ΣF_x and ΣF_y.",
                  reasoning: "ΣF_x = 60 + 30 = 90 N; ΣF_y = 0 + 30√3 = 30√3 N."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute resultant magnitude R = √(ΣF_x² + ΣF_y²).",
                  reasoning: "R = √(90² + (30√3)²) = √(8,100 + 2,700) = √10,800."
                },
                {
                  stepNumber: 4,
                  instruction: "Factor out perfect square 3,600 = 60².",
                  reasoning: "R = √(3,600 × 3) = 60√3 N ≈ 103.9 N (directed at 30° North of East)."
                }
              ],
              takeawayRule: "Adding force components orthogonally (ΣF_x, ΣF_y) eliminates geometry mistakes on multi-force joints."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Multiplying Load by 0.75 instead of dividing by 0.75 (or solving MA = η·VR) for real Effort.",
              whyItIsWrong: "Reducing effort below ideal Load/VR would mean friction HELPED lift the load (> 100% efficiency).",
              correctCorrection: "Real Effort = Ideal Effort / η = Load / (η · VR)."
            },
            {
              misconception: "Using RPM directly in P = τ · N instead of converting RPM to rad/s (ω = 2πN/60).",
              whyItIsWrong: "Power in Watts requires SI radians per second, not revolutions per minute.",
              correctCorrection: "Convert RPM → rad/s via × (2π/60) before multiplying by torque τ."
            }
          ],
          guidedPracticePrompt: "A 15-tooth pinion drives a 45-tooth gear. If motor torque is 20 N·m (ideal), what is the output gear torque?",
          independentPracticePrompt: "Resolve a 100 N push at 30° below horizontal into horizontal drive and extra normal force.",
          extensionActivity: "Check why screw-jack efficiency η < 50% prevents back-driving under heavy car weight (self-locking).",
          diagnosticSelfCheck: "What is angular speed ω in rad/s for a shaft spinning at 300 RPM (leave in terms of π)?",
          transferApplication: "Calculate minimum coefficient of static friction μ = tan θ needed before a crate slides down a 30° chute.",
          masteryAssessment: "A hoist with VR = 8 lifts 2,400 N using 375 N effort. Find its efficiency.",
          summaryRecap: "Resolve forces into x/y components first, compute η = MA/VR cleanly, and convert RPM to ω = 2πN/60 before computing P = τω.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-eng-1",
            type: "multiple_choice",
            questionText: "A 24-tooth motor gear spinning at 1,500 RPM meshes directly with a 60-tooth driven gear. What is the rotational speed of the 60-tooth driven gear?",
            mathExpression: "N_1 z_1 = N_2 z_2",
            options: ["600 RPM", "3,750 RPM", "900 RPM", "750 RPM"],
            correctAnswer: "600 RPM",
            explanation: "Larger driven gears spin slower: N₂ = N₁(z₁ / z₂) = 1,500 × (24 / 60) = 1,500 × 0.4 = 600 RPM.",
            hintLadder: [
              "Tooth contact speed matches: N₁ z₁ = N₂ z₂.",
              "A larger driven gear (60 teeth vs 24) rotates more slowly than the driver.",
              "Compute 1,500 × 24 ÷ 60."
            ],
            misconceptionAlerts: [
              { trigger: "3,750 RPM", note: "3,750 multiplies by 60/24 instead of 24/60 (violating speed reduction)." }
            ],
            skillId: "skill-sss-engineering-math-mechanics",
            difficulty: "easy"
          },
          {
            id: "q-sss-eng-2",
            type: "multiple_choice",
            questionText: "A block-and-tackle pulley system has Velocity Ratio VR = 5. An effort of 250 N lifts a load of 1,000 N. Calculate the efficiency η of the pulley.",
            mathExpression: "\\eta = \\frac{\\text{MA}}{\\text{VR}} \\times 100\\%",
            options: ["80%", "75%", "62.5%", "90%"],
            correctAnswer: "80%",
            explanation: "Mechanical Advantage MA = Load / Effort = 1,000 / 250 = 4. Efficiency η = (MA / VR) × 100% = (4 / 5) × 100% = 80%.",
            hintLadder: [
              "First calculate Mechanical Advantage: MA = 1,000 ÷ 250 = 4.",
              "Divide MA by VR = 5.",
              "Convert 4/5 to a percentage."
            ],
            misconceptionAlerts: [
              { trigger: "62.5%", note: "Check MA = 1000/250 = 4, and divide by VR = 5." }
            ],
            skillId: "skill-sss-engineering-math-mechanics",
            difficulty: "easy"
          },
          {
            id: "q-sss-eng-3",
            type: "multiple_choice",
            questionText: "Convert a shaft speed of 600 RPM to angular velocity ω in radians per second (exact multiple of π), and find the mechanical power P if shaft torque is τ = 25 N·m.",
            mathExpression: "\\omega = \\frac{2\\pi N}{60},\\quad P = \\tau\\omega",
            options: [
              "ω = 20π rad/s, P = 500π W",
              "ω = 10π rad/s, P = 250π W",
              "ω = 600π rad/s, P = 15,000π W",
              "ω = 20 rad/s, P = 500 W"
            ],
            correctAnswer: "ω = 20π rad/s, P = 500π W",
            explanation: "ω = (2π × 600) / 60 = 20π rad/s. Power P = τ ω = 25 × 20π = 500π W.",
            hintLadder: [
              "600 RPM = 600 / 60 = 10 revolutions per second.",
              "Multiply rev/s by 2π radians per revolution: ω = 20π rad/s.",
              "Multiply τ = 25 N·m by 20π."
            ],
            misconceptionAlerts: [
              { trigger: "ω = 10π rad/s, P = 250π W", note: "Each revolution covers 2π radians, not π radians." }
            ],
            skillId: "skill-sss-engineering-math-mechanics",
            difficulty: "medium"
          },
          {
            id: "q-sss-eng-4",
            type: "multiple_choice",
            questionText: "Two perpendicular forces of 24 N (horizontal) and 10 N (vertical) pull simultaneously on an anchor bolt, while a third opposing horizontal force of 16 N pulls left. What is the magnitude of the net resultant force?",
            mathExpression: "R = \\sqrt{(\\Sigma F_x)^2 + (\\Sigma F_y)^2}",
            options: ["√164 N", "√676 N", "30 N", "18 N"],
            correctAnswer: "√164 N",
            explanation: "Net horizontal ΣF_x = 24 − 16 = 8 N. Net vertical ΣF_y = 10 N. Magnitude R = √(8² + 10²) = √(64 + 100) = √164 N (≈ 12.81 N).",
            hintLadder: [
              "Sum horizontal forces carefully with signs: 24 − 16 = 8 N.",
              "Vertical force remains 10 N.",
              "Apply Pythagoras: √(8² + 10²)."
            ],
            misconceptionAlerts: [
              { trigger: "√676 N", note: "Remember to subtract the opposing 16 N horizontal force before squaring." }
            ],
            skillId: "skill-sss-engineering-math-mechanics",
            difficulty: "medium"
          },
          {
            id: "q-sss-eng-5",
            type: "multiple_choice",
            questionText: "A 10 kg steel block rests on a rough ramp inclined at 30° above horizontal (take g = 10 m/s²). What is the minimum coefficient of static friction μ_s required to stop the block from sliding downward?",
            mathExpression: "mg\\sin 30^{\\circ} \\le \\mu_s (mg\\cos 30^{\\circ})",
            options: ["1/√3", "√3", "1/2", "√3/2"],
            correctAnswer: "1/√3",
            explanation: "Down-slope gravity component = mg sin 30°; max static friction = μ_s N = μ_s mg cos 30°. Canceling mg gives μ_s ≥ sin 30° / cos 30° = tan 30° = 1/√3 (≈ 0.577).",
            hintLadder: [
              "Down-slope force is mg sin 30°; normal contact force is N = mg cos 30°.",
              "Set mg sin 30° = μ_s mg cos 30°.",
              "Cancel mg to obtain μ_s = tan 30°."
            ],
            misconceptionAlerts: [
              { trigger: "√3", note: "Check ratio: sin 30° / cos 30° = (1/2) / (√3/2) = 1/√3, not √3." }
            ],
            skillId: "skill-sss-engineering-math-mechanics",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. hall_actuarial_math_finance
  // =========================================================================
  {
    id: "unit-p1-hall-actuarial-math-finance",
    subjectId: "hall_actuarial_math_finance",
    level: "exam_prep",
    title: "Actuarial Mathematics: Present Value, Annuities, Force of Interest & Expected Loss",
    code: "HAL-ACT-290",
    description:
      "Master discount factor v = (1 + i)⁻¹, continuous force of interest δ = ln(1 + i), level annuities-immediate/due, perpetuity valuation, and expected claim variance.",
    order: 21,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "SOA_FM:TVM-ANN-01",
      "IFOA_CM1:INT-VAL-01",
      "ACTUARIAL_HALL:FIN-STO-290"
    ],
    skills: [
      {
        id: "skill-hall-actuarial-math-finance",
        unitId: "unit-p1-hall-actuarial-math-finance",
        title: "Discounting, Annuities, Perpetuities & Expected Risk",
        code: "SKL-HAL-ACT-290",
        summary:
          "Compute time-value present values via vⁿ and e^(−δt), value finite annuities and infinite perpetuities, and compute expected value E[X] and variance of stochastic payouts.",
        objectives: [
          "Convert between effective rate i, nominal convertible rate i^(m), and continuous force of interest δ",
          "Value annuities-immediate a_{n|i} = (1 − vⁿ)/i, annuities-due ä_{n|i} = (1+i)a_{n|i}, and perpetuities 1/i",
          "Compute expected claim E[X] = Σ p_k x_k and variance Var(X) = E[X²] − (E[X])² for discrete risk trees"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-fin-compound-interest", "skill-sss-complex-sequences-series"],
        lesson: {
          id: "les-hall-actuarial-math-finance",
          title: "Actuarial Financial Math & Stochastic Valuation",
          hookAndIntuition:
            "Pension funds promise payouts 40 years in the future; actuarial mathematics prices those promises to the exact kobo using geometric series discounting and mortality-weighted expectations.",
          conceptualExplanation:
            "A dollar received t years from now at effective annual rate i has present value vᵗ where v = (1 + i)⁻¹. Nominal rate i^(m) compounded m times yearly satisfies (1 + i) = (1 + i^(m)/m)^m, while continuous compounding gives e^δ = 1 + i (δ = ln(1 + i)).\n\nA finite level annuity-immediate paying 1 at the end of years 1..n sums a geometric series: a_{n|i} = v + v² + ... + vⁿ = (1 − vⁿ)/i. An annuity-due pays at the START of each period, scaling up by one compounding period: ä_{n|i} = (1 + i) · a_{n|i}. Letting n → ∞ sends vⁿ → 0, giving perpetuity-immediate PV = 1/i. Combined with stochastic claim payoffs X, expected present value equals E[PV] = Σ P(state) · PV(state).",
          conceptualModel:
            "v = 1/(1+i) | e^δ = 1+i | Annuity a_{n|i} = (1−vⁿ)/i | Perpetuity = PMT/i | Variance = E[X²] − (E[X])².",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Annuity-Immediate PV: a_{n|i} = (1 − (1 + i)⁻ⁿ) / i",
              definition: "Present value 1 period before the first level payment of 1 unit for n periods.",
              practicalExample: "If (1.05)⁻¹⁰ ≈ 0.6139, then a_{10|5%} = (1 − 0.6139)/0.05 = 7.722."
            },
            {
              termOrSymbol: "Perpetuity Valuation: PV = PMT / i (Immediate) or PMT/d (Due)",
              definition: "Present value of an infinite stream of level payments, derived from GP S_∞ = v/(1 − v) = 1/i.",
              practicalExample: "₦500,000 annual scholarship forever at i = 8% costs 500,000 / 0.08 = ₦6,250,000."
            },
            {
              termOrSymbol: "Effective vs Nominal Rate: 1 + i = (1 + i^(m)/m)^m",
              definition: "Exact equivalence between annual effective return and sub-annual compounding.",
              practicalExample: "12% compounded semiannually: (1.06)² − 1 = 12.36% effective."
            }
          ],
          workedExamples: [
            {
              title: "Valuing a Deferred Perpetuity Endowment",
              problemStatement: "An alumni fund endows a perpetual annual prize of ₦200,000 whose FIRST payout occurs at t = 4 years. At effective annual interest rate i = 5%, calculate its present value today (t = 0).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Value the perpetuity-immediate ONE period before its first payout (at t = 3).",
                  reasoning: "PV at t = 3 equals PMT / i = 200,000 / 0.05 = ₦4,000,000."
                },
                {
                  stepNumber: 2,
                  instruction: "Discount the lump sum at t = 3 back 3 years to t = 0.",
                  reasoning: "PV_0 = 4,000,000 × (1.05)⁻³."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute (1.05)³ = 1.157625 cleanly.",
                  reasoning: "PV_0 = 4,000,000 / 1.157625 ≈ ₦3,455,350."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify why discounting exponent is 3 (not 4).",
                  reasoning: "Standard perpetuity-immediate PMT/i already sits 1 year before the first payment (t = 4 − 1 = 3)."
                }
              ],
              takeawayRule: "Always place the annuity/perpetuity-immediate formula 1 period BEFORE the first payment, then discount back that exact gap to t = 0."
            },
            {
              title: "Expected Claim & Standard Deviation of an Insurance Contract",
              problemStatement: "A one-year gadget policy pays ₦0 (prob 0.85), ₦20,000 (prob 0.10), or ₦100,000 (prob 0.05). Find expected payout E[X] and standard deviation σ_X.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute expected value E[X] = Σ p_k x_k.",
                  reasoning: "E[X] = 0.85(0) + 0.10(20,000) + 0.05(100,000) = 2,000 + 5,000 = ₦7,000."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute second moment E[X²] = Σ p_k x_k².",
                  reasoning: "E[X²] = 0.10(4×10⁸) + 0.05(10¹⁰) = 4×10⁷ + 5×10⁸ = 5.4×10⁸."
                },
                {
                  stepNumber: 3,
                  instruction: "Calculate variance Var(X) = E[X²] − (E[X])².",
                  reasoning: "Var(X) = 5.4×10⁸ − (7,000)² = 5.4×10⁸ − 0.49×10⁸ = 4.91×10⁸."
                },
                {
                  stepNumber: 4,
                  instruction: "Take square root for claim standard deviation σ_X.",
                  reasoning: "σ_X = √(4.91) × 10⁴ ≈ ₦22,159."
                }
              ],
              takeawayRule: "Because severe claims square disproportionately in E[X²], pure expected value understates capital risk unless σ_X is priced."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Discounting a perpetuity starting at t = 4 by v⁴ instead of v³.",
              whyItIsWrong: "Formula PMT/i already discounts the first payment by 1 period (so it evaluates at t = 3).",
              correctCorrection: "Count periods from t = 0 to (first_payment_time − 1)."
            },
            {
              misconception: "Treating nominal rate 12% convertible monthly as 12% effective annual.",
              whyItIsWrong: "Monthly compounding earns interest-on-interest, raising effective rate to (1.01)¹² − 1 ≈ 12.68%.",
              correctCorrection: "Convert nominal i^(m) to effective i = (1 + i^(m)/m)^m − 1 first."
            }
          ],
          guidedPracticePrompt: "If effective discount rate d = 0.08, compute equivalent effective annual interest rate i = d / (1 − d).",
          independentPracticePrompt: "Value an infinite perpetuity-due paying ₦100,000 today and forever annually at i = 10%.",
          extensionActivity: "Check rule of 72 against exact doubling time t = ln(2)/δ at δ = 6%.",
          diagnosticSelfCheck: "If e^δ = 1.06, what is the accumulated value of ₦10,000 after 5 years under force δ?",
          transferApplication: "Price a 10-year 6% bond par ₦1,000 at 8% market yield using coupon annuity + discounted redemption.",
          masteryAssessment: "Two independent policies each have mean ₦5,000 and SD ₦12,000. Find mean and SD of their sum.",
          summaryRecap: "Anchor annuities one period before first payout, distinguish i from nominal i^(m) and force δ, and price variance with E[X²] − E[X]².",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-hal-act-1",
            type: "multiple_choice",
            questionText: "An investment earns a nominal rate of 10% per annum convertible semiannually (i^(2) = 10%). What is the exact effective annual interest rate i?",
            mathExpression: "1 + i = \\left(1 + \\frac{0.10}{2}\\right)^2",
            options: ["10.25%", "10.00%", "10.50%", "10.38%"],
            correctAnswer: "10.25%",
            explanation: "Semiannual rate = 5%. Effective annual i = (1.05)² − 1 = 1.1025 − 1 = 10.25%.",
            hintLadder: [
              "Divide nominal annual rate 10% by m = 2 compounding periods: 5% per half-year.",
              "Compound for two half-years: (1.05)² = 1.1025.",
              "Subtract 1."
            ],
            misconceptionAlerts: [
              { trigger: "10.00%", note: "10% ignores intra-year compounding on the first 6 months' interest." }
            ],
            skillId: "skill-hall-actuarial-math-finance",
            difficulty: "easy"
          },
          {
            id: "q-hal-act-2",
            type: "multiple_choice",
            questionText: "A university establishes a perpetual annual award paying ₦360,000 at the end of EVERY year forever, starting 1 year from now. If effective annual interest is 6%, what endowment is required today?",
            mathExpression: "\\text{PV} = \\frac{\\text{PMT}}{i}",
            options: ["₦6,000,000", "₦3,600,000", "₦6,360,000", "₦2,160,000"],
            correctAnswer: "₦6,000,000",
            explanation: "Perpetuity-immediate PV = 360,000 / 0.06 = ₦6,000,000.",
            hintLadder: [
              "Apply perpetuity-immediate formula PV = PMT / i.",
              "Divide 360,000 by 0.06.",
              "360,000 × 100 / 6 = 6,000,000."
            ],
            misconceptionAlerts: [
              { trigger: "₦6,360,000", note: "Adding PMT + PMT/i applies to a perpetuity-DUE (first payment today), not 1 year from now." }
            ],
            skillId: "skill-hall-actuarial-math-finance",
            difficulty: "easy"
          },
          {
            id: "q-hal-act-3",
            type: "multiple_choice",
            questionText: "Under a constant force of interest δ = 0.04 per year, an initial principal of ₦50,000 accumulates continuously for 5 years. Which exact expression represents its accumulated value?",
            mathExpression: "A(t) = P \\cdot e^{\\delta t}",
            options: ["50,000 e^(0.20)", "50,000 (1.04)⁵", "50,000 (1.20)", "50,000 e^(0.04)"],
            correctAnswer: "50,000 e^(0.20)",
            explanation: "Under constant force δ, accumulation factor is e^(δt) = e^(0.04 × 5) = e^(0.20).",
            hintLadder: [
              "Use continuous compounding formula A(t) = P e^(δt).",
              "Multiply δ = 0.04 by t = 5 years to get 0.20.",
              "Keep exact exponential 50,000 e^(0.20)."
            ],
            misconceptionAlerts: [
              { trigger: "50,000 (1.04)⁵", note: "(1 + i)⁵ uses effective rate i = 4%, whereas continuous force δ = 4% yields e^δ ≈ 1.04081." }
            ],
            skillId: "skill-hall-actuarial-math-finance",
            difficulty: "medium"
          },
          {
            id: "q-hal-act-4",
            type: "multiple_choice",
            questionText: "A 2-year level annuity-immediate pays ₦12,100 at t = 1 and t = 2 at an effective annual interest rate of 10%. What is its exact present value at t = 0?",
            mathExpression: "\\text{PV} = \\frac{12,100}{1.1} + \\frac{12,100}{1.1^2}",
            options: ["₦21,000", "₦22,000", "₦20,000", "₦24,200"],
            correctAnswer: "₦21,000",
            explanation: "PV = 12,100 / 1.1 + 12,100 / 1.21 = 11,000 + 10,000 = ₦21,000.",
            hintLadder: [
              "Discount t = 1 payout by 1.1: 12,100 ÷ 1.1 = 11,000.",
              "Discount t = 2 payout by 1.1² = 1.21: 12,100 ÷ 1.21 = 10,000.",
              "Sum both present values."
            ],
            misconceptionAlerts: [
              { trigger: "₦24,200", note: "24,200 adds raw cash flows without discounting for time value." }
            ],
            skillId: "skill-hall-actuarial-math-finance",
            difficulty: "medium"
          },
          {
            id: "q-hal-act-5",
            type: "multiple_choice",
            questionText: "An endowment promises ₦100,000 annually forever, with the FIRST payment occurring at t = 3 years. At effective annual interest i = 10%, what is its present value at t = 0 (nearest naira)?",
            mathExpression: "\\text{PV}_0 = \\left(\\frac{100,000}{0.10}\\right)(1.10)^{-2}",
            options: ["₦826,446", "₦751,315", "₦909,091", "₦1,000,000"],
            correctAnswer: "₦826,446",
            explanation: "Perpetuity-immediate value at t = 2 (one period before first payment at t = 3) is 100,000 / 0.10 = ₦1,000,000. Discounting back 2 years: 1,000,000 / 1.21 ≈ ₦826,446.",
            hintLadder: [
              "Standard perpetuity PMT/i lands 1 period BEFORE the first payment: at t = 3 − 1 = 2.",
              "Value at t = 2 is 100,000 ÷ 0.10 = 1,000,000.",
              "Discount 1,000,000 back 2 years by 1.1² = 1.21."
            ],
            misconceptionAlerts: [
              { trigger: "₦751,315", note: "751,315 discounts by 1.1³ (3 years) instead of 1.1² (2 years)." }
            ],
            skillId: "skill-hall-actuarial-math-finance",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. sss_288_insurance_analytics_actuarial_risk_l
  // =========================================================================
  {
    id: "unit-p1-sss-insurance-actuarial-risk",
    subjectId: "sss_288_insurance_analytics_actuarial_risk_l",
    level: "senior_secondary",
    title: "Insurance Analytics: Risk Pooling, Loss Ratios, Deductibles & Solvency Reserve",
    code: "SSS-INS-288",
    description:
      "Master frequency × severity pure premiums, deductible/coinsurance claim sharing, Combined Ratio (Loss + Expense), risk pooling variance reduction σ/√n, and reserve loading.",
    order: 22,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:INS-ACT-288",
      "CAS_FM:RISK-LOSS-288",
      "CIIN_FOUNDATION:ACT-PRICING"
    ],
    skills: [
      {
        id: "skill-sss-insurance-actuarial-risk",
        unitId: "unit-p1-sss-insurance-actuarial-risk",
        title: "Pure Premium, Deductible Sharing, Loss Ratio & Risk Pooling",
        code: "SKL-SSS-INS-288",
        summary:
          "Price pure and gross insurance premiums, compute insurer vs policyholder payouts under deductibles/caps, evaluate combined ratios, and quantify pooling risk reduction σ/√n.",
        objectives: [
          "Compute Pure Premium = Claim Frequency × Claim Severity and load expenses/profit margin cleanly",
          "Apply policy deductible d, coinsurance share c, and policy limit L accurately to gross losses",
          "Interpret Loss Ratio, Combined Ratio (< 100% underwriting profit), and √n diversification scaling"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-hall-actuarial-math-finance", "skill-sss-data-analytics-stats"],
        lesson: {
          id: "les-sss-insurance-actuarial-risk",
          title: "Insurance Analytics & Actuarial Risk Loss Modeling",
          hookAndIntuition:
            "One house fire can bankrupt a family, yet 10,000 families pooling premiums predict total annual claims within a tiny margin because independent variance shrinks by 1/√n.",
          conceptualExplanation:
            "Insurance analytics models aggregate losses through two drivers: Frequency (expected claim count per policy year) and Severity (average cost per claim). Their product gives Pure Premium = Frequency × Severity. To cover administrative expenses E and safety loading, insurers charge Gross Premium G = Pure Premium / (1 − Expense Ratio − Profit Margin).\n\nContracts mitigate moral hazard via deductibles (d paid first by policyholder), coinsurance (c% of excess paid by insurer), and upper policy limits (M). Underwriting health is tracked by Loss Ratio = Claims / Earned Premium and Combined Ratio = Loss Ratio + Expense Ratio (below 100% signals underwriting profit). Crucially, pooling n independent identical risks leaves mean per-policy cost μ unchanged while shrinking standard deviation per policy to σ / √n (Law of Large Numbers).",
          conceptualModel:
            "Pure Prem = Freq × Sev | Payout = min(Limit, c · max(0, Loss − Deductible)) | Combined = Loss% + Expense% | Pool SD/policy = σ / √n.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Deductible & Coinsurance Claim Formula",
              definition: "Insurer pays 0 if Loss ≤ d; otherwise c × (Loss − d), capped at policy limit L.",
              practicalExample: "Loss ₦500k, d = ₦50k, 80% coinsurance ⇒ Insurer pays 0.80 × 450k = ₦360k."
            },
            {
              termOrSymbol: "Combined Ratio = (Incurred Claims + Expenses) / Earned Premium",
              definition: "Measures core underwriting profitability before investment income (< 100% = profit).",
              practicalExample: "Claims ₦68M + Expenses ₦27M on ₦100M premium ⇒ Combined Ratio = 95% (5% margin)."
            },
            {
              termOrSymbol: "Risk Pooling SD Scaling: SD(X̄) = σ / √n",
              definition: "Pooling n independent policies shrinks volatility per policy inversely with √n.",
              practicalExample: "Growing a pool 100× (n → 100n) shrinks per-policy standard deviation by √100 = 10×."
            }
          ],
          workedExamples: [
            {
              title: "Gross Premium Loading From Frequency, Severity & Expense Ratio",
              problemStatement: "An auto portfolio averages 0.08 claims per vehicle-year with average claim severity ₦250,000. Expenses equal 25% of gross premium and target underwriting profit margin is 5%. Compute Pure Premium and Gross Premium.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Multiply expected frequency by average severity to get Pure Premium.",
                  reasoning: "Pure Premium = 0.08 × ₦250,000 = ₦20,000."
                },
                {
                  stepNumber: 2,
                  instruction: "Sum variable premium ratios (expenses + target profit).",
                  reasoning: "Total loading share = 25% + 5% = 30% of Gross Premium G."
                },
                {
                  stepNumber: 3,
                  instruction: "Set Pure Premium equal to the remaining 70% of Gross Premium.",
                  reasoning: "0.70 G = 20,000."
                },
                {
                  stepNumber: 4,
                  instruction: "Divide by (1 − 0.30) = 0.70 rather than multiplying 20,000 × 1.30.",
                  reasoning: "G = 20,000 / 0.70 ≈ ₦28,571."
                }
              ],
              takeawayRule: "Percentage-of-premium expenses always divide by (1 − Expense% − Margin%), never multiply Pure × (1 + Expense%)."
            },
            {
              title: "Applying Deductible, Coinsurance & Cap to a Property Claim",
              problemStatement: "A warehouse policy has deductible ₦100,000, 80% insurer coinsurance above the deductible, and a maximum insurer payout limit of ₦800,000. Compute insurer payout for losses of (a) ₦600,000 and (b) ₦1,300,000.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Evaluate case (a): Loss = ₦600,000 minus deductible ₦100,000.",
                  reasoning: "Excess loss = 600,000 − 100,000 = ₦500,000."
                },
                {
                  stepNumber: 2,
                  instruction: "Apply 80% coinsurance and check cap ₦800,000.",
                  reasoning: "0.80 × 500,000 = ₦400,000 ≤ 800,000 ⇒ Insurer pays ₦400,000 (owner pays ₦200,000)."
                },
                {
                  stepNumber: 3,
                  instruction: "Evaluate case (b): Loss = ₦1,300,000 minus deductible.",
                  reasoning: "Excess loss = 1,300,000 − 100,000 = ₦1,200,000; 80% share = ₦960,000."
                },
                {
                  stepNumber: 4,
                  instruction: "Apply maximum policy limit cap of ₦800,000.",
                  reasoning: "min(800,000, 960,000) = ₦800,000 insurer payout."
                }
              ],
              takeawayRule: "Apply policy modifiers in strict sequence: first subtract deductible, second multiply coinsurance %, third enforce the payout cap."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding 30% onto Pure Premium (20,000 × 1.30 = 26,000) when expenses are 30% of Gross Premium.",
              whyItIsWrong: "30% of 26,000 is 7,800, leaving only 18,200 (< 20,000) to pay claims—causing insolvency.",
              correctCorrection: "Always divide Pure Premium by (1 − 0.30) when expenses are expressed as % of Gross Premium."
            },
            {
              misconception: "Shrinking pooled per-policy standard deviation by 1/n instead of 1/√n.",
              whyItIsWrong: "Variances add linearly (nσ²), so dividing by n leaves σ/√n for standard deviation, not σ/n.",
              correctCorrection: "Total pool SD grows as √n · σ; per-policy SD shrinks as σ / √n."
            }
          ],
          guidedPracticePrompt: "An insurer collects ₦50M premium, pays ₦34M claims, and incurs ₦14M expenses. Compute Loss Ratio and Combined Ratio.",
          independentPracticePrompt: "A portfolio grows from 400 policies to 3,600 independent policies. By what factor does per-policy claim SD fall?",
          extensionActivity: "Check why raising a small deductible from ₦0 to ₦25,000 eliminates high-frequency micro-claims disproportionately.",
          diagnosticSelfCheck: "What does a Combined Ratio of 106% indicate about underwriting before investment income?",
          transferApplication: "Design a parametric flood insurance trigger paying ₦500k automatically when rainfall exceeds 150 mm.",
          masteryAssessment: "Pure premium = ₦18,000, expense ratio = 20%, profit margin = 5%. Calculate Gross Premium.",
          summaryRecap: "Price Pure = Freq × Sev, divide by (1 − expense% − margin%), apply deductible → coinsurance → cap in order, and scale pool uncertainty by 1/√n.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-ins-1",
            type: "multiple_choice",
            questionText: "A mobile-device insurance plan observes an average claim frequency of 0.12 claims/year and average claim severity of ₦45,000. What is the Pure Premium per policy?",
            mathExpression: "\\text{Pure Premium} = \\text{Frequency} \\times \\text{Severity}",
            options: ["₦5,400", "₦3,750", "₦4,500", "₦6,750"],
            correctAnswer: "₦5,400",
            explanation: "Pure Premium = 0.12 × 45,000 = ₦5,400.",
            hintLadder: [
              "Multiply annual claim probability/frequency by average payout severity.",
              "0.10 × 45,000 = 4,500; 0.02 × 45,000 = 900.",
              "Sum 4,500 + 900."
            ],
            misconceptionAlerts: [
              { trigger: "₦3,750", note: "3,750 divides by 12 instead of multiplying by 0.12." }
            ],
            skillId: "skill-sss-insurance-actuarial-risk",
            difficulty: "easy"
          },
          {
            id: "q-sss-ins-2",
            type: "multiple_choice",
            questionText: "An insurer reports ₦80M in earned premiums, ₦52M in incurred claims, and ₦24M in underwriting expenses. What is its Combined Ratio?",
            mathExpression: "\\text{Combined Ratio} = \\frac{\\text{Claims} + \\text{Expenses}}{\\text{Premium}}",
            options: ["95%", "65%", "105%", "92%"],
            correctAnswer: "95%",
            explanation: "Loss Ratio = 52/80 = 65%; Expense Ratio = 24/80 = 30%. Combined Ratio = 65% + 30% = 95% (indicating 5% underwriting profit).",
            hintLadder: [
              "Sum incurred claims and underwriting expenses: 52 + 24 = 76M.",
              "Divide by earned premium 80M.",
              "76 / 80 = 0.95 = 95%."
            ],
            misconceptionAlerts: [
              { trigger: "65%", note: "65% is the Loss Ratio alone, omitting the 30% underwriting Expense Ratio." }
            ],
            skillId: "skill-sss-insurance-actuarial-risk",
            difficulty: "easy"
          },
          {
            id: "q-sss-ins-3",
            type: "multiple_choice",
            questionText: "A health policy carries a ₦20,000 annual deductible and 80% insurer coinsurance above the deductible (up to a ₦500,000 limit). If a patient submits an approved bill of ₦170,000, how much does the INSURER pay?",
            mathExpression: "\\text{Payout} = 0.80 \\times (170,000 - 20,000)",
            options: ["₦120,000", "₦136,000", "₦116,000", "₦150,000"],
            correctAnswer: "₦120,000",
            explanation: "Subtract deductible first: 170,000 − 20,000 = ₦150,000 eligible excess. Insurer pays 80%: 0.80 × 150,000 = ₦120,000.",
            hintLadder: [
              "Subtract the ₦20,000 deductible first before applying 80%.",
              "170,000 − 20,000 = ₦150,000.",
              "Multiply 150,000 by 0.80."
            ],
            misconceptionAlerts: [
              { trigger: "₦116,000", note: "116,000 applies 80% to 170,000 first and subtracts 20,000 afterward, breaking standard deductible order." }
            ],
            skillId: "skill-sss-insurance-actuarial-risk",
            difficulty: "medium"
          },
          {
            id: "q-sss-ins-4",
            type: "multiple_choice",
            questionText: "An independent insurance pool grows from n = 100 policies to n = 1,600 identical independent policies. What happens to the standard deviation of the AVERAGE claim per policy?",
            mathExpression: "\\sigma_{\\bar{X}} = \\frac{\\sigma}{\\sqrt{n}}",
            options: [
              "It decreases to 1/4 of its former value",
              "It decreases to 1/16 of its former value",
              "It increases by 4×",
              "It remains completely unchanged"
            ],
            correctAnswer: "It decreases to 1/4 of its former value",
            explanation: "Sample size increased by factor 16 (1,600 / 100). Since per-policy SD scales as 1/√n, √16 = 4, reducing uncertainty per policy to 1/4.",
            hintLadder: [
              "Compare √n₁ = √100 = 10 and √n₂ = √1600 = 40.",
              "Per-policy standard deviation divides σ by √n.",
              "10 / 40 = 1/4."
            ],
            misconceptionAlerts: [
              { trigger: "It decreases to 1/16 of its former value", note: "VARIANCE shrinks by 1/16, while standard deviation shrinks by √(1/16) = 1/4." }
            ],
            skillId: "skill-sss-insurance-actuarial-risk",
            difficulty: "medium"
          },
          {
            id: "q-sss-ins-5",
            type: "multiple_choice",
            questionText: "Pure Premium for a policy is ₦21,000. Operating expenses take 22% of Gross Premium and target profit loading is 8% of Gross Premium. What Gross Premium must be charged?",
            mathExpression: "G = \\frac{\\text{Pure Premium}}{1 - 0.22 - 0.08}",
            options: ["₦30,000", "₦27,300", "₦28,000", "₦31,500"],
            correctAnswer: "₦30,000",
            explanation: "Combined expense + profit loading = 22% + 8% = 30% of Gross Premium, leaving 70% for Pure Premium: G = 21,000 / 0.70 = ₦30,000.",
            hintLadder: [
              "Sum percentage loadings on Gross Premium: 22% + 8% = 30%.",
              "Pure Premium equals the remaining 100% − 30% = 70% of Gross Premium.",
              "Divide ₦21,000 by 0.70."
            ],
            misconceptionAlerts: [
              { trigger: "₦27,300", note: "27,300 = 21,000 × 1.30 leaves only 19,110 after 30% deductions, creating a shortfall." }
            ],
            skillId: "skill-sss-insurance-actuarial-risk",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
