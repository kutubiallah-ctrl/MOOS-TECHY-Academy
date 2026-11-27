import { Unit } from "../types/curriculum";

export const P3_SCIENCE_BATCH4_UNITS_B: Unit[] = [
  // =========================================================================
  // 1. sss_258_physics_practical_measurement_graphs
  // =========================================================================
  {
    id: "unit-p3-sss-physics-practicals-uncertainty",
    subjectId: "sss_258_physics_practical_measurement_graphs",
    level: "senior_secondary",
    title: "Physics Practicals: Vernier/Micrometer Precision, Linearisation & Error Propagation",
    code: "SSS-PHY-258",
    description:
      "Master Vernier caliper and micrometer screw-gauge zero-error correction, linearising non-linear physics equations (pendulum T² vs L), large-triangle gradients, and percentage uncertainty propagation.",
    order: 4,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:SSS1-PHY-PRAC-01",
      "WAEC_WASSCE:PHY-ALT-PRAC-258",
      "CAMBRIDGE_IGCSE:0625-ATP-P6"
    ],
    skills: [
      {
        id: "skill-sss-physics-practicals-uncertainty",
        unitId: "unit-p3-sss-physics-practicals-uncertainty",
        title: "Precision Instruments, Linear Graphs & Experimental Uncertainty",
        code: "SKL-SSS-PHY-258",
        summary:
          "Read Vernier and micrometer scales with signed zero-error correction, linearise T = 2π√(L/g) to extract g from slope, and combine percentage uncertainties in multi-variable formulas.",
        objectives: [
          "Compute corrected readings from main scale + circular/Vernier coincidence minus signed zero error",
          "Transform power laws into y = mx + c graphs and compute slope using widely separated triangle points (> 50% span)",
          "Propagate fractional/percentage errors ΔZ/Z = a(ΔX/X) + b(ΔY/Y) including squared/cubed exponents"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-precision-measurement", "skill-jss-linear-graphs-coord"],
        lesson: {
          id: "les-sss-physics-practicals-uncertainty",
          title: "Practical Physics: Precision Readings, Linearisation & Error Bounds",
          hookAndIntuition:
            "Knowing a formula in theory is only half of physics—in Paper 3 practicals and Alternative-to-Practical exams, marks are won on zero-error signs, wide-triangle slopes, and uncertainty bars.",
          conceptualExplanation:
            "Experimental physics turns raw instrument readings into reliable physical constants.\n\n1. INSTRUMENT PRECISION & ZERO ERROR:\n• VERNIER CALIPER (least count = 0.01 cm = 0.1 mm): Reading = Main Scale (cm) + (Vernier mark × 0.01 cm).\n• MICROMETER SCREW GAUGE (least count = 0.01 mm): Reading = Sleeve (including 0.5 mm half-marks) + (Thimble × 0.01 mm).\n• ZERO ERROR CORRECTION: Corrected = Observed − (Signed Zero Error). If closed jaws read +0.03 mm (positive error), SUBTRACT 0.03 mm; if they read −0.02 mm (negative error), SUBTRACT (−0.02), which ADDS 0.02 mm!\n\n2. GRAPH LINEARISATION & GRADIENT TECHNIQUE: Never fit curves by eye to extract constants. For a simple pendulum T = 2π√(L/g), square both sides: T² = (4π²/g) L. Plotting T² (y-axis) against L (x-axis) yields a straight line through the origin with slope m = 4π²/g ⇒ g = 4π²/m. Always draw a large gradient triangle spanning >= 60% of the plotted line, using points ON the line (never raw scattered data points unless they lie on the line).\n\n3. ERROR PROPAGATION: For Z = Xᵃ Yᵇ / Wᶜ, percentage uncertainties ALWAYS ADD (never subtract!): %ΔZ = a(%ΔX) + b(%ΔY) + c(%ΔW). Timing 20 oscillations instead of 1 cuts timing reaction-time error per period by 20×!",
          conceptualModel:
            "Corrected = Observed − ZeroError | T² = (4π²/g)L ⇒ g = 4π²/slope | %Δ(Xᵃ/Yᵇ) = a(%ΔX) + b(%ΔY).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Corrected Reading = Observed − (±e₀)",
              definition: "Subtract positive zero error (+e₀); add magnitude of negative zero error (−e₀).",
              practicalExample: "Observed 4.62 mm with −0.03 mm zero error ⇒ 4.62 − (−0.03) = 4.65 mm."
            },
            {
              termOrSymbol: "Pendulum Linearisation (T² = 4π²L / g)",
              definition: "Slope m = Δ(T²)/ΔL equals 4π²/g, so g = 4π²/m.",
              practicalExample: "If slope m = 4.02 s²/m, then g = 4(9.8696)/4.02 ≈ 9.82 m/s²."
            },
            {
              termOrSymbol: "Power Uncertainty Law (%ΔZ = Σ |pᵢ|·%ΔXᵢ)",
              definition: "Exponents multiply percentage errors, and division terms STILL ADD uncertainty.",
              practicalExample: "For ρ = m / (πr²L): %Δρ = %Δm + 2(%Δr) + %ΔL."
            }
          ],
          workedExamples: [
            {
              title: "Reading a Micrometer with Negative Zero Error & Propagating Diameter Error",
              problemStatement: "When closed, a micrometer's zero mark stops 2 divisions BELOW the datum line (−0.02 mm zero error). Measuring a copper wire gives sleeve reading 2.5 mm + thimble mark 18 (× 0.01 mm). (a) Find corrected diameter d, and (b) if ±0.01 mm uncertainty applies, find percentage uncertainty in cross-sectional area A = πd²/4.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute observed micrometer reading.",
                  reasoning: "Observed = 2.5 mm + (18 × 0.01 mm) = 2.68 mm."
                },
                {
                  stepNumber: 2,
                  instruction: "Apply signed zero-error correction.",
                  reasoning: "Corrected d = 2.68 − (−0.02) = 2.70 mm."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute %Δd from ±0.01 mm precision.",
                  reasoning: "%Δd = (0.01 / 2.70) × 100% ≈ 0.37%."
                },
                {
                  stepNumber: 4,
                  instruction: "Propagate exponent 2 in A = πd²/4.",
                  reasoning: "%ΔA = 2 × %Δd = 2 × 0.37% = 0.74%."
                }
              ],
              takeawayRule: "Check half-millimetre sleeve marks carefully, apply Corrected = Observed − (±e₀), and double %Δd when squaring diameter for area."
            },
            {
              title: "Extracting Acceleration g from a Linearised T² vs L Graph",
              problemStatement: "A student times 20 pendulum oscillations for lengths L = 0.40 m to 1.20 m, plots T² vs L, and reads two widely spaced points on the line of best fit: (0.20 m, 0.80 s²) and (1.20 m, 4.80 s²). Calculate slope m and gravitational acceleration g (take π² ≈ 9.87).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Verify large-triangle criterion.",
                  reasoning: "ΔL = 1.20 − 0.20 = 1.00 m spans > 80% of the plotted line."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute slope m = Δ(T²)/ΔL with units.",
                  reasoning: "m = (4.80 − 0.80) / (1.20 − 0.20) = 4.00 / 1.00 = 4.00 s²/m."
                },
                {
                  stepNumber: 3,
                  instruction: "Relate slope to physical constant g.",
                  reasoning: "T² = (4π²/g)L ⇒ m = 4π²/g ⇒ g = 4π²/m."
                },
                {
                  stepNumber: 4,
                  instruction: "Evaluate g.",
                  reasoning: "g = (4 × 9.87) / 4.00 = 39.48 / 4.00 = 9.87 m/s²."
                }
              ],
              takeawayRule: "Always take gradient points on the drawn best-fit line spaced far apart, carry units (s²/m), and match slope to the coefficient of x."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Subtracting percentage uncertainties when dividing quantities (e.g., %Δ(m/V) = %Δm − %ΔV).",
              whyItIsWrong: "Independent errors can push numerator high while pushing denominator low—worst-case percentage errors ALWAYS ADD.",
              correctCorrection: "Always sum weighted percentage uncertainties: %Δ(m/V) = %Δm + %ΔV."
            },
            {
              misconception: "Forgetting that timing 20 oscillations divides timing error by 20 when computing period T.",
              whyItIsWrong: "A ±0.2 s stopwatch reaction error occurs only at start and stop of the 20-cycle run, not on every single swing.",
              correctCorrection: "Measure 20T total so ΔT = Δ(20T)/20, shrinking random timing error 20-fold."
            }
          ],
          guidedPracticePrompt: "If closed Vernier jaws show a +0.04 cm zero error and a cylinder reads 3.28 cm, what is the corrected diameter?",
          independentPracticePrompt: "Write the percentage uncertainty equation for Young's modulus E = FL / (Ae) given measured uncertainties in F, L, A, and extension e.",
          extensionActivity: "Linearise Boyle's Law (PV = k) and inverse-square irradiance (I = P / 4πr²) into straight-line y = mx + c plots.",
          diagnosticSelfCheck: "Why must a gradient triangle span more than half the drawn best-fit line instead of two adjacent points?",
          transferApplication: "Design a practical circuit experiment to find EMF E and internal resistance r from V = E − Ir using intercept and slope.",
          masteryAssessment: "Read micrometer (3.5 mm + 24×0.01 mm) with −0.03 mm zero error, and find %Δg if ΔL/L = 1% and ΔT/T = 1.5% in g = 4π²L/T².",
          summaryRecap: "Corrected = Observed − ZeroError; linearise laws to y = mx + c and use wide line triangles; percentage errors sum with exponents multiplying.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-sss-prac-1",
            type: "multiple_choice",
            questionText: "Closed micrometer jaws read −0.03 mm (negative zero error). Measuring a steel ball gives sleeve 6.5 mm plus thimble division 19 (0.19 mm). What is the corrected diameter in mm?",
            mathExpression: "d = (6.5 + 0.19) - (-0.03)",
            options: ["6.72", "6.66", "6.69", "6.99"],
            correctAnswer: "6.72",
            explanation: "Observed = 6.50 + 0.19 = 6.69 mm. Corrected = 6.69 − (−0.03) = 6.72 mm.",
            hintLadder: [
              "First add sleeve (6.50 mm) and thimble (0.19 mm).",
              "Subtracting a negative zero error (−0.03 mm) ADDS 0.03 mm."
            ],
            misconceptionAlerts: [
              { trigger: "6.66", note: "Watch the sign: negative zero error means the instrument starts behind zero, so you must ADD 0.03 mm." }
            ],
            skillId: "skill-sss-physics-practicals-uncertainty",
            difficulty: "easy"
          },
          {
            id: "q-sss-prac-2",
            type: "multiple_choice",
            questionText: "To linearise Stefan's power law P = kT⁴ into a straight line y = mx passing through the origin, what should be plotted on the vertical and horizontal axes?",
            options: [
              "Plot P on the y-axis against T⁴ on the x-axis (slope = k)",
              "Plot P on the y-axis against T on the x-axis",
              "Plot P² against T²",
              "Plot 1/P against T"
            ],
            correctAnswer: "Plot P on the y-axis against T⁴ on the x-axis (slope = k)",
            explanation: "Setting y = P and x = T⁴ converts P = kT⁴ directly into y = kx, a straight line through (0, 0) with constant slope k.",
            hintLadder: [
              "Compare P = k(T⁴) with y = m(x) + 0.",
              "If y = P, then x must equal T⁴."
            ],
            misconceptionAlerts: [
              { trigger: "Plot P on the y-axis against T on the x-axis", note: "P vs T gives a steep quartic curve, not a straight line." }
            ],
            skillId: "skill-sss-physics-practicals-uncertainty",
            difficulty: "easy"
          },
          {
            id: "q-sss-prac-3",
            type: "multiple_choice",
            questionText: "From g = 4π²L / T², a student measures length L with 1.0% uncertainty and single period T with 2.0% uncertainty. What is the maximum percentage uncertainty (%) in calculated g?",
            mathExpression: "\\%\\Delta g = \\%\\Delta L + 2(\\%\\Delta T)",
            options: ["5", "3", "4", "6"],
            correctAnswer: "5",
            explanation: "Percentage uncertainties add and T is squared (exponent 2): %Δg = 1.0% + 2(2.0%) = 5.0%.",
            hintLadder: [
              "Dividing by T² still ADDS uncertainty—never subtract!",
              "Multiply T's uncertainty by its exponent 2, then add L's 1%."
            ],
            misconceptionAlerts: [
              { trigger: "3", note: "T is SQUARED (T²), so its 2% uncertainty contributes 2 × 2% = 4%, giving 5% total." }
            ],
            skillId: "skill-sss-physics-practicals-uncertainty",
            difficulty: "medium"
          },
          {
            id: "q-sss-prac-4",
            type: "multiple_choice",
            questionText: "In a terminal-voltage experiment V = E − Ir, a straight-line plot of V (y-axis) against current I (x-axis) passes through (0.40 A, 2.20 V) and (1.20 A, 1.00 V). What is the cell's internal resistance r in ohms (Ω)?",
            mathExpression: "r = -\\text{slope} = \\frac{2.20 - 1.00}{1.20 - 0.40}",
            options: ["1.5", "-1.5", "0.67", "3.0"],
            correctAnswer: "1.5",
            explanation: "Comparing V = −rI + E with y = mx + c gives r = −slope = −(1.00 − 2.20)/(1.20 − 0.40) = 1.20 / 0.80 = 1.5 Ω.",
            hintLadder: [
              "Compute the magnitude of ΔV / ΔI across the two line points.",
              "1.20 V ÷ 0.80 A = 1.5 Ω."
            ],
            misconceptionAlerts: [
              { trigger: "-1.5", note: "Slope is −1.5 Ω, and resistance r = −slope is ALWAYS positive (+1.5 Ω)." }
            ],
            skillId: "skill-sss-physics-practicals-uncertainty",
            difficulty: "medium"
          },
          {
            id: "q-sss-prac-5",
            type: "multiple_choice",
            questionText: "Why do WAEC and Cambridge examiners instruct students to time 20 complete pendulum oscillations with a stopwatch rather than timing 1 oscillation 20 separate times?",
            options: [
              "Start/stop human reaction error (~0.2 s) occurs once across 20T, cutting period error ΔT by 20×; repeating separate single swings preserves ±0.2 s on each swing",
              "Gravity accelerates the pendulum bob on later swings",
              "Air resistance vanishes after 10 oscillations",
              "Stopwatches only register times longer than 5 seconds"
            ],
            correctAnswer: "Start/stop human reaction error (~0.2 s) occurs once across 20T, cutting period error ΔT by 20×; repeating separate single swings preserves ±0.2 s on each swing",
            explanation: "Timing 20T consecutively spreads one human reaction error Δt_react over 20 periods (ΔT = Δt_react / 20), whereas 20 single timings add reaction error 20 times!",
            hintLadder: [
              "Consider how many times you press Start and Stop during 20 continuous swings vs 20 separate single swings.",
              "One start/stop pair divided by 20 shrinks reaction error 20-fold."
            ],
            misconceptionAlerts: [
              { trigger: "Gravity accelerates the pendulum bob on later swings", note: "Period depends on L and g, not swing count—the gain is purely reaction-time error reduction." }
            ],
            skillId: "skill-sss-physics-practicals-uncertainty",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. sss_260_chemistry_electrochemistry_reaction_
  // =========================================================================
  {
    id: "unit-p3-sss-chem-electrochem-kinetics",
    subjectId: "sss_260_chemistry_electrochemistry_reaction_",
    level: "senior_secondary",
    title: "Electrochemistry: Cell Potentials, Faraday Electrolysis, Kinetics & Hess Energetics",
    code: "SSS-CHM-260",
    description:
      "Master standard electrode potentials (E°_cell), Faraday's First & Second Laws of electrolysis (m = MIt/nF), rate orders/Arrhenius activation barriers, and Hess's Law enthalpy cycles.",
    order: 4,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:SSS3-CHM-ELEC-02",
      "WAEC_WASSCE:CHM-ELEC-260",
      "JAMB_UTME:CHM-FARADAY-KINETICS"
    ],
    skills: [
      {
        id: "skill-sss-chem-electrochem-kinetics",
        unitId: "unit-p3-sss-chem-electrochem-kinetics",
        title: "Galvanic E°_cell, Faraday's Laws, Rate Equations & Hess Enthalpy",
        code: "SKL-SSS-CHM-260",
        summary:
          "Compute galvanic cell EMF from reduction potentials, calculate deposited mass/gas volume via Q = It = n·z·F, determine rate laws from initial-rate tables, and solve Hess enthalpy cycles.",
        objectives: [
          "Identify cathode reduction and anode oxidation to compute E°_cell = E°_cathode − E°_anode (without multiplying E° by coefficients)",
          "Apply Faraday's Law m = (M · I · t) / (z · F) with F = 96,500 C/mol and preferential ion discharge rules",
          "Extract reaction orders and rate constant k from kinetic data, and apply ΔH_rxn = ΣΔH_bonds(broken) − ΣΔH_bonds(formed)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-chm-redox", "skill-chm-collision-theory-le-chatelier"],
        lesson: {
          id: "les-sss-chem-electrochem-kinetics",
          title: "Electrochemistry, Quantitative Electrolysis, Kinetics & Energetics",
          hookAndIntuition:
            "Every lithium phone battery and aluminium smelter obeys exact mole-to-charge bookkeeping: 96,500 coulombs (1 Faraday) always moves exactly one mole of electrons.",
          conceptualExplanation:
            "Electrochemistry, kinetics, and thermochemistry unite electron transfer, reaction speed, and energy flow.\n\n1. GALVANIC CELLS & E°_cell: Standard reduction potentials measure electron-pulling tendency. The MORE POSITIVE half-cell undergoes REDUCTION at the CATHODE; the less positive (more negative) undergoes OXIDATION at the ANODE. Cell EMF: E°_cell = E°_cathode − E°_anode (spontaneous when E°_cell > 0). CRITICAL RULE: E° is an intensive voltage—NEVER multiply E° when balancing stoichiometric electrons!\n\n2. FARADAY'S ELECTROLYSIS: Charge Q = I · t (coulombs = amperes × seconds). Since 1 mole of electrons carries F = 96,500 C, moles of electrons n_e = Q / 96,500. If ion reduction needs z electrons (Cu²⁺ + 2e⁻ → Cu has z = 2; Al³⁺ has z = 3), moles deposited = Q / (z · F), and mass m = (M · I · t) / (z · F). In series electrolytic cells sharing identical charge Q, deposited masses obey m₁ / m₂ = (M₁/z₁) / (M₂/z₂) (Faraday's Second Law).\n\n3. KINETICS & HESS ENERGETICS: In rate = k[A]ˣ[B]ʸ, double [A] holding [B] fixed to observe order x (2× rate ⇒ x = 1; 4× rate ⇒ x = 2; 1× rate ⇒ x = 0). By Hess's Law, enthalpy depends only on initial and final states: ΔH = ΣΔH_f(products) − ΣΔH_f(reactants), or via bonds: ΔH = ΣE(bonds broken) − ΣE(bonds formed).",
          conceptualModel:
            "E°_cell = E°_red − E°_ox | m = MIt / (zF) | ΔH = ΣE_broken − ΣE_formed.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Faraday's Quantitative Law",
              definition: "Q = I · t; n(product) = Q / (z · F); m = (M · I · t) / (z · 96,500).",
              practicalExample: "9,650 C deposits 0.10 mol e⁻ ⇒ 0.05 mol Cu (z = 2) = 3.2 g Cu (M = 64)."
            },
            {
              termOrSymbol: "Standard Cell Potential (E°_cell)",
              definition: "E°_cell = E°_cathode(reduction) − E°_anode(oxidation); intensive property independent of coefficients.",
              practicalExample: "Zn²⁺/Zn (−0.76 V) + Cu²⁺/Cu (+0.34 V) ⇒ E°_cell = +0.34 − (−0.76) = +1.10 V."
            },
            {
              termOrSymbol: "Bond Enthalpy Balance",
              definition: "Breaking reactant bonds absorbs heat (+); forming product bonds releases heat (−): ΔH = Broken − Formed.",
              practicalExample: "If Broken = 1,800 kJ and Formed = 2,150 kJ, ΔH = −350 kJ (exothermic)."
            }
          ],
          workedExamples: [
            {
              title: "Calculating Copper Deposited & Series Silver Mass via Faraday's Laws",
              problemStatement: "A steady current of 5.0 A passes for 32 minutes 10 seconds through aqueous CuSO₄ (Cu = 64 g/mol, F = 96,500 C/mol) connected in series with an AgNO₃ cell (Ag = 108 g/mol). Calculate (a) mass of Cu plated and (b) mass of Ag plated.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Convert time into seconds and compute total charge Q = It.",
                  reasoning: "t = (32 × 60) + 10 = 1,930 s; Q = 5.0 A × 1,930 s = 9,650 C."
                },
                {
                  stepNumber: 2,
                  instruction: "Find moles of electrons n_e = Q / F.",
                  reasoning: "n_e = 9,650 / 96,500 = 0.10 mol of electrons passing BOTH series cells."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute copper deposited (Cu²⁺ + 2e⁻ → Cu, z = 2).",
                  reasoning: "n(Cu) = 0.10 / 2 = 0.050 mol ⇒ m(Cu) = 0.050 × 64 = 3.20 g."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute silver deposited in series (Ag⁺ + e⁻ → Ag, z = 1).",
                  reasoning: "n(Ag) = 0.10 / 1 = 0.10 mol ⇒ m(Ag) = 0.10 × 108 = 10.8 g."
                }
              ],
              takeawayRule: "Convert minutes to seconds first, divide charge by 96,500 to get moles of electrons, then divide by ion charge z."
            },
            {
              title: "Deriving Rate Law & Rate Constant k from Initial-Rate Experiments",
              problemStatement: "For A + 2B → Products: Run 1 ([A]=0.10 M, [B]=0.10 M, rate=2.0×10⁻³ M/s); Run 2 ([A]=0.20 M, [B]=0.10 M, rate=8.0×10⁻³ M/s); Run 3 ([A]=0.20 M, [B]=0.20 M, rate=1.6×10⁻² M/s). Find the rate law and constant k.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compare Run 1 and Run 2 ([B] constant, [A] doubles).",
                  reasoning: "Rate jumps 4× (8.0×10⁻³ / 2.0×10⁻³ = 4 = 2ˣ) ⇒ second order in A (x = 2)."
                },
                {
                  stepNumber: 2,
                  instruction: "Compare Run 2 and Run 3 ([A] constant, [B] doubles).",
                  reasoning: "Rate jumps 2× (1.6×10⁻² / 8.0×10⁻³ = 2 = 2ʸ) ⇒ first order in B (y = 1)."
                },
                {
                  stepNumber: 3,
                  instruction: "Write rate equation (noting orders ≠ stoichiometric coefficients of A).",
                  reasoning: "Rate = k[A]²[B]¹ (overall order = 3)."
                },
                {
                  stepNumber: 4,
                  instruction: "Substitute Run 1 to solve for k and its units.",
                  reasoning: "k = 2.0×10⁻³ / ((0.10)²(0.10)) = 2.0×10⁻³ / 1.0×10⁻³ = 2.0 mol⁻²·dm⁶·s⁻¹."
                }
              ],
              takeawayRule: "Orders come ONLY from experimental rate ratios, never from balanced stoichiometric coefficients."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Multiplying E° values by stoichiometric coefficients (e.g., doubling +0.80 V for 2Ag⁺ + 2e⁻ → 2Ag).",
              whyItIsWrong: "Electrode potential is electrical energy per unit charge (J/C = Volt), an intensive ratio that stays unchanged when scaling moles.",
              correctCorrection: "Leave E° values unscaled and compute E°_cell = E°_cathode − E°_anode directly."
            },
            {
              misconception: "Subtracting reactants minus products in ΔH_f or reversing bond enthalpies to Formed − Broken.",
              whyItIsWrong: "Sign flip turns an exothermic reaction endothermic!",
              correctCorrection: "For ΔH_f°: Products − Reactants. For Bond Energies: Broken (Reactants) − Formed (Products)."
            }
          ],
          guidedPracticePrompt: "Compute E°_cell for Al³⁺/Al (−1.66 V) coupled with Ag⁺/Ag (+0.80 V) and name the anode.",
          independentPracticePrompt: "How many coulombs deposit 9.0 g of Aluminium (Al = 27 g/mol, z = 3)? Take F = 96,500 C/mol.",
          extensionActivity: "Sketch an electrolytic cell contrasting dilute NaCl (O₂ at anode) vs concentrated brine (Cl₂ at anode).",
          diagnosticSelfCheck: "Why does doubling [A] quadruple reaction rate only if reaction order with respect to A is 2?",
          transferApplication: "Explain how a catalyst lowers activation energy E_a on a Boltzmann distribution without altering overall ΔH.",
          masteryAssessment: "Compute mass of zinc (Zn = 65, z = 2) dissolved by 10 A for 965 s, and find ΔH when bonds broken = 1,420 kJ and bonds formed = 1,750 kJ.",
          summaryRecap: "E°_cell = E°_cathode − E°_anode (unscaled); m = MIt/(zF); rate orders come strictly from experiment; ΔH = ΣE_broken − ΣE_formed.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-elec-1",
            type: "multiple_choice",
            questionText: "Given standard reduction potentials E°(Mg²⁺/Mg) = −2.37 V and E°(Ag⁺/Ag) = +0.80 V, calculate E°_cell (in volts, V) for the spontaneous galvanic cell Mg | Mg²⁺ || Ag⁺ | Ag.",
            mathExpression: "E^\\circ_{\\text{cell}} = (+0.80) - (-2.37)",
            options: ["3.17", "3.97", "1.57", "-3.17"],
            correctAnswer: "3.17",
            explanation: "Ag⁺/Ag has the more positive E° (+0.80 V, cathode reduction), while Mg is oxidized at the anode (−2.37 V). Never double +0.80 V! E°_cell = 0.80 − (−2.37) = +3.17 V.",
            hintLadder: [
              "Do NOT double +0.80 V even though 2 Ag⁺ react per Mg.",
              "Compute E°_cathode − E°_anode = 0.80 − (−2.37)."
            ],
            misconceptionAlerts: [
              { trigger: "3.97", note: "E° is an intensive ratio (volts = J/C)—never multiply +0.80 V by stoichiometric 2!" }
            ],
            skillId: "skill-sss-chem-electrochem-kinetics",
            difficulty: "easy"
          },
          {
            id: "q-sss-elec-2",
            type: "multiple_choice",
            questionText: "A current of 10.0 A flows for 965 seconds through molten MgCl₂ (Mg = 24 g/mol, z = 2, F = 96,500 C/mol). What mass of magnesium in grams (g) is deposited at the cathode?",
            mathExpression: "m = \\frac{24 \\times 10.0 \\times 965}{2 \\times 96{,}500}",
            options: ["1.2", "2.4", "0.6", "4.8"],
            correctAnswer: "1.2",
            explanation: "Q = 10 × 965 = 9,650 C = 0.10 mol e⁻. Since Mg²⁺ needs z = 2 e⁻, n(Mg) = 0.050 mol ⇒ m = 0.050 × 24 = 1.2 g.",
            hintLadder: [
              "Compute Q = I × t = 9,650 C, which equals 0.10 Faraday (mol e⁻).",
              "Divide 0.10 mol e⁻ by z = 2, then multiply by Mg molar mass 24."
            ],
            misconceptionAlerts: [
              { trigger: "2.4", note: "Mg²⁺ requires 2 electrons per atom (z = 2), halving the moles from 0.10 to 0.050!" }
            ],
            skillId: "skill-sss-chem-electrochem-kinetics",
            difficulty: "medium"
          },
          {
            id: "q-sss-elec-3",
            type: "multiple_choice",
            questionText: "In the rate law Rate = k[X]²[Y], what happens to the initial reaction rate if [X] is doubled and [Y] is halved simultaneously?",
            options: [
              "The rate doubles (2×) because (2)² × (1/2) = 2",
              "The rate stays unchanged (1×)",
              "The rate quadruples (4×)",
              "The rate halves (0.5×)"
            ],
            correctAnswer: "The rate doubles (2×) because (2)² × (1/2) = 2",
            explanation: "Multiplying [X] by 2 multiplies [X]² by 4, while halving [Y] multiplies rate by 0.5: net factor = 4 × 0.5 = 2×.",
            hintLadder: [
              "Substitute the scaling multipliers into (2)² × (0.5)¹.",
              "4 × 0.5 = 2."
            ],
            misconceptionAlerts: [
              { trigger: "The rate stays unchanged (1×)", note: "Notice X is squared (2² = 4), so doubling X outweighs halving Y." }
            ],
            skillId: "skill-sss-chem-electrochem-kinetics",
            difficulty: "medium"
          },
          {
            id: "q-sss-elec-4",
            type: "multiple_choice",
            questionText: "For H₂(g) + Cl₂(g) → 2HCl(g), bond energies are H–H = 436 kJ/mol, Cl–Cl = 242 kJ/mol, and H–Cl = 431 kJ/mol. Calculate ΔH (in kJ/mol reaction, include negative sign if exothermic).",
            mathExpression: "\\Delta H = (436 + 242) - 2(431)",
            options: ["-184", "184", "-247", "247"],
            correctAnswer: "-184",
            explanation: "Bonds broken = 436 + 242 = +678 kJ; Bonds formed = 2 × 431 = 862 kJ. ΔH = 678 − 862 = −184 kJ/mol.",
            hintLadder: [
              "Sum the bonds broken (1 H–H + 1 Cl–Cl = 678 kJ).",
              "Subtract bonds formed (2 moles of H–Cl = 862 kJ): 678 − 862."
            ],
            misconceptionAlerts: [
              { trigger: "184", note: "More energy is released forming H–Cl bonds than absorbed breaking reactants, so ΔH is negative (−184)!" }
            ],
            skillId: "skill-sss-chem-electrochem-kinetics",
            difficulty: "hard"
          },
          {
            id: "q-sss-elec-5",
            type: "multiple_choice",
            questionText: "When a small current electrolyses concentrated aqueous NaCl (brine) using inert graphite electrodes, which products form preferentially at the cathode and anode?",
            options: [
              "Cathode: H₂(g) (H⁺ discharged over Na⁺); Anode: Cl₂(g) (high [Cl⁻] discharged over OH⁻)",
              "Cathode: Na(s); Anode: O₂(g)",
              "Cathode: Cl₂(g); Anode: H₂(g)",
              "Cathode: Na(s); Anode: Cl₂(g)"
            ],
            correctAnswer: "Cathode: H₂(g) (H⁺ discharged over Na⁺); Anode: Cl₂(g) (high [Cl⁻] discharged over OH⁻)",
            explanation: "In aqueous brine, H⁺ sits far below Na⁺ in the electrochemical series (so H₂ evolves at the cathode), while concentrated Cl⁻ outcompetes OH⁻ at the anode to release Cl₂.",
            hintLadder: [
              "Remember Na is far too reactive to plate out of water—H⁺ reduces instead.",
              "High chloride concentration in brine favours Cl₂ gas at the positive anode."
            ],
            misconceptionAlerts: [
              { trigger: "Cathode: Na(s); Anode: Cl₂(g)", note: "Sodium metal can only deposit from MOLTEN NaCl—water supplies H⁺ that reduces to H₂ instead." }
            ],
            skillId: "skill-sss-chem-electrochem-kinetics",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. sss_261_chemistry_qualitative_analysis_volum
  // =========================================================================
  {
    id: "unit-p3-sss-chem-qualitative-volumetric",
    subjectId: "sss_261_chemistry_qualitative_analysis_volum",
    level: "senior_secondary",
    title: "Qualitative Salt Analysis, Acid-Base/Redox Titration & Volumetric Precision",
    code: "SSS-CHM-261",
    description:
      "Master cation NaOH/NH₃ precipitates (including amphoteric Zn²⁺/Al³⁺/Pb²⁺ vs Cu²⁺/Fe²⁺/Fe³⁺), anion confirmatory tests, concordant titre averaging, and dilution/back-titration stoichiometry.",
    order: 4,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:SSS3-CHM-PRAC-03",
      "WAEC_WASSCE:CHM-PRAC-261",
      "CAMBRIDGE_IGCSE:0620-TITR-QUAL"
    ],
    skills: [
      {
        id: "skill-sss-chem-qualitative-volumetric",
        unitId: "unit-p3-sss-chem-qualitative-volumetric",
        title: "Cation/Anion Qualitative Tests & Volumetric Titration Calculations",
        code: "SKL-SSS-CHM-261",
        summary:
          "Distinguish unknown cations and anions using excess NaOH(aq), excess NH₃(aq), AgNO₃/HNO₃, and BaCl₂/HCl; reject rough titres to compute concordant means and molarities.",
        objectives: [
          "Separate Zn²⁺, Al³⁺, Pb²⁺, Ca²⁺, Cu²⁺, Fe²⁺, and Fe³⁺ via NaOH vs NH₃ excess solubility and colours",
          "Confirm Cl⁻, Br⁻, I⁻, SO₄²⁻, CO₃²⁻, and NO₃⁻ (brown-ring/devarda) without false-positive carbonate precipitation",
          "Execute C₁V₁/n₁ = C₂V₂/n₂ titrations, dilution factors, and percentage purity from concordant burette readings"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-chm-mole-stoichiometry", "skill-chm-ph-titrations"],
        lesson: {
          id: "les-sss-chem-qualitative-volumetric",
          title: "Qualitative Inorganic Analysis & Volumetric Titration Mastery",
          hookAndIntuition:
            "Every WAEC Chemistry Practical paper hinges on two exact disciplines: dropping NaOH and NH₃ slowly then in excess to unmask hidden ions, and knowing why BaCl₂ MUST follow HCl to avoid a false sulfate positive.",
          conceptualExplanation:
            "Analytical chemistry pairs systematic ion identification with precision volumetric neutralization.\n\n1. CATION DIAGNOSTICS (NaOH vs NH₃):\n• White precipitate soluble in EXCESS NaOH AND EXCESS NH₃ → Zn²⁺ (amphoteric + forms [Zn(NH₃)₄]²⁺).\n• White precipitate soluble in EXCESS NaOH ONLY (insoluble in excess NH₃) → Al³⁺ or Pb²⁺ (add KI: bright yellow PbI₂ confirms Pb²⁺; no yellow ppt = Al³⁺).\n• White precipitate INSOLUBLE in excess NaOH, NO ppt in NH₃ → Ca²⁺.\n• Pale blue ppt turning DEEP ROYAL BLUE solution in excess NH₃ → Cu²⁺.\n• Dirty green ppt → Fe²⁺; reddish-brown ppt → Fe³⁺; pungent alkaline gas turning damp red litmus blue on warming with NaOH (no ppt) → NH₄⁺.\n\n2. ANION TESTS (ACIDIFY FIRST!):\nAdding BaCl₂ to an unacidified solution gives a white precipitate for BOTH CO₃²⁻/SO₃²⁻ AND SO₄²⁻! Always acidify with dilute HCl (for BaCl₂) or dilute HNO₃ (for AgNO₃): only BaSO₄ survives HCl; AgCl (white, dissolves in dilute NH₃), AgBr (cream), AgI (pale yellow, insoluble in NH₃) survive HNO₃.\n\n3. VOLUMETRIC TITRATION RULES: Record burette readings to 0.05 cm³ (2 d.p.). Average ONLY CONCORDANT titres (within ±0.20 cm³—reject the overshoot Rough titre!). Apply mole ratio directly: (C_A V_A) / n_A = (C_B V_B) / n_B.",
          conceptualModel:
            "Excess NaOH dissolves Zn/Al/Pb | Excess NH₃ dissolves Zn & turns Cu deep blue | Concordant Mean = Avg(±0.20 cm³).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Titration Equation (C_A V_A / n_A = C_B V_B / n_B)",
              definition: "Links molarity and volume across balanced acid–base stoichiometry.",
              practicalExample: "For H₂SO₄ + 2NaOH: n_A = 1, n_B = 2, so 25 cm³ of 0.10 M NaOH neutralizes 12.5 cm³ of 0.10 M H₂SO₄."
            },
            {
              termOrSymbol: "Concordant Titres (±0.20 cm³)",
              definition: "Include only accurate titres agreeing within 0.20 cm³; exclude rough/overshoot trials.",
              practicalExample: "Rough 24.80, Run 1 24.10, Run 2 24.15, Run 3 24.05 ⇒ average 1, 2, 3 = 24.10 cm³."
            },
            {
              termOrSymbol: "Why Acidify Before BaCl₂ / AgNO₃",
              definition: "Dilute HCl/HNO₃ decomposes interfering CO₃²⁻/SO₃²⁻ so only true BaSO₄ or AgX precipitates.",
              practicalExample: "Do NOT acidify AgNO₃ test with HCl—because HCl itself supplies Cl⁻ and fakes a chloride positive!"
            }
          ],
          workedExamples: [
            {
              title: "Separating Zn²⁺, Al³⁺, Pb²⁺, and Ca²⁺ Using Sequential Reagents",
              problemStatement: "Four unlabelled vials A, B, C, D hold Ca²⁺, Zn²⁺, Al³⁺, and Pb²⁺. Design a minimal 3-test flowchart using NaOH(aq), NH₃(aq), and KI(aq) to identify every single vial uniquely.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Add NaOH(aq) dropwise then in excess to all four.",
                  reasoning: "Vial with white ppt INSOLUBLE in excess NaOH is Ca²⁺. The other three dissolve into colourless zincate/aluminate/plumbate."
                },
                {
                  stepNumber: 2,
                  instruction: "Add NH₃(aq) dropwise then in excess to fresh samples of the remaining three.",
                  reasoning: "Only Zn²⁺ gives a white ppt that DISSOLVES in excess NH₃ (forming [Zn(NH₃)₄]²⁺). The two insoluble ones are Al³⁺ and Pb²⁺."
                },
                {
                  stepNumber: 3,
                  instruction: "Add KI(aq) (or dilute HCl) to fresh samples of the final two.",
                  reasoning: "Pb²⁺ forms a striking bright YELLOW precipitate of PbI₂ (or white PbCl₂ soluble on heating); Al³⁺ shows no precipitate."
                },
                {
                  stepNumber: 4,
                  instruction: "Summarize all four identifications.",
                  reasoning: "Insoluble excess NaOH = Ca²⁺; soluble excess NH₃ = Zn²⁺; yellow KI ppt = Pb²⁺; colourless with KI = Al³⁺."
                }
              ],
              takeawayRule: "NaOH excess separates Ca²⁺; NH₃ excess separates Zn²⁺; KI yellow precipitate separates Pb²⁺ from Al³⁺."
            },
            {
              title: "Back-Titration Percentage Purity of Impure Limestone (CaCO₃)",
              problemStatement: "2.00 g of impure limestone is dissolved completely in 50.0 cm³ of 1.00 mol/dm³ HCl (excess). The remaining unreacted HCl requires 24.0 cm³ of 0.500 mol/dm³ NaOH for neutralization. Find the percentage purity of CaCO₃ (M = 100 g/mol).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate initial moles of HCl added.",
                  reasoning: "n(HCl)_initial = 1.00 × (50.0 / 1000) = 0.0500 mol."
                },
                {
                  stepNumber: 2,
                  instruction: "Calculate leftover HCl neutralized by NaOH (1:1 ratio).",
                  reasoning: "n(HCl)_left = n(NaOH) = 0.500 × (24.0 / 1000) = 0.0120 mol."
                },
                {
                  stepNumber: 3,
                  instruction: "Subtract to find HCl consumed by CaCO₃, then apply CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.",
                  reasoning: "n(HCl)_reacted = 0.0500 − 0.0120 = 0.0380 mol ⇒ n(CaCO₃) = 0.0380 / 2 = 0.0190 mol."
                },
                {
                  stepNumber: 4,
                  instruction: "Convert to mass and % purity.",
                  reasoning: "Mass CaCO₃ = 0.0190 × 100 = 1.90 g ⇒ Purity = (1.90 / 2.00) × 100% = 95.0%."
                }
              ],
              takeawayRule: "In back-titrations: Moles reacted = Initial acid − Excess acid titrated; always check the 1:2 CaCO₃:HCl mole ratio."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Acidifying an AgNO₃ halide test with dilute HCl instead of dilute HNO₃.",
              whyItIsWrong: "HCl injects Cl⁻ ions straight into the test tube, precipitating white AgCl even when the sample held ZERO chloride!",
              correctCorrection: "Acidify AgNO₃ halide tests strictly with dilute HNO₃, and BaCl₂ sulfate tests with dilute HCl (or HNO₃)."
            },
            {
              misconception: "Averaging the Rough titration with concordant runs.",
              whyItIsWrong: "The rough run locates the approximate endpoint by overshooting, biasing the average titre upward.",
              correctCorrection: "Average ONLY concordant titres agreeing within ±0.20 cm³."
            }
          ],
          guidedPracticePrompt: "Predict observations when NH₃(aq) is added dropwise then in excess to aqueous CuSO₄.",
          independentPracticePrompt: "25.0 cm³ of 0.120 mol/dm³ Na₂CO₃ neutralizes 30.0 cm³ of HCl (Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂). Calculate [HCl].",
          extensionActivity: "Tabulate flame-test colours (Na⁺ golden yellow, K⁺ lilac, Ca²⁺ brick-red, Cu²⁺ blue-green) alongside precipitate confirmation.",
          diagnosticSelfCheck: "Why does BaCl₂ form a white precipitate in Na₂CO₃ unless HCl is added?",
          transferApplication: "Explain why phenolphthalein is unsuitable for HCl vs NH₃(aq) titration whereas methyl orange succeeds.",
          masteryAssessment: "Given titres 25.60 (rough), 24.90, 24.80, 24.85 cm³ of 0.10 M H₂SO₄ against 25.0 cm³ NaOH, compute [NaOH] in mol/dm³.",
          summaryRecap: "NaOH excess dissolves Zn/Al/Pb while NH₃ excess dissolves Zn & turns Cu deep blue; acidify anion tests properly; compute titrations strictly from concordant means.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-qual-1",
            type: "multiple_choice",
            questionText: "An unknown salt solution forms a white precipitate with a few drops of NaOH(aq) that dissolves in excess NaOH, and also forms a white precipitate with NH₃(aq) that DISSOLVES in excess NH₃(aq). Which cation is present?",
            options: [
              "Zn²⁺",
              "Al³⁺",
              "Pb²⁺",
              "Ca²⁺"
            ],
            correctAnswer: "Zn²⁺",
            explanation: "Only Zn²⁺ gives a white hydroxide precipitate soluble in BOTH excess NaOH (forming zincate) and excess NH₃ (forming tetraamminezinc(II)). Al³⁺ and Pb²⁺ stay insoluble in excess NH₃.",
            hintLadder: [
              "Amphoteric solubility in excess NaOH narrows options to Zn²⁺, Al³⁺, Pb²⁺.",
              "Which one of those three dissolves in excess aqueous ammonia?"
            ],
            misconceptionAlerts: [
              { trigger: "Al³⁺", note: "Al(OH)₃ dissolves in excess NaOH, NOT in excess aqueous ammonia!" }
            ],
            skillId: "skill-sss-chem-qualitative-volumetric",
            difficulty: "easy"
          },
          {
            id: "q-sss-qual-2",
            type: "multiple_choice",
            questionText: "Why must a student NEVER acidify a silver nitrate (AgNO₃) test for chloride ions with dilute hydrochloric acid (HCl)?",
            options: [
              "HCl adds Cl⁻ ions directly into the solution, creating a false white AgCl precipitate even if the unknown salt contains no chloride",
              "HCl explodes violently on contact with AgNO₃",
              "HCl converts sulfate ions into pure silver",
              "Dilute HCl turns white AgCl dark blue"
            ],
            correctAnswer: "HCl adds Cl⁻ ions directly into the solution, creating a false white AgCl precipitate even if the unknown salt contains no chloride",
            explanation: "Always use dilute nitric acid (HNO₃) before adding AgNO₃(aq) because nitrate ions never precipitate Ag⁺.",
            hintLadder: [
              "What anion does HCl release into the test tube?",
              "Ag⁺ + Cl⁻ gives white AgCl regardless of where Cl⁻ came from."
            ],
            misconceptionAlerts: [
              { trigger: "HCl converts sulfate ions into pure silver", note: "HCl simply introduces Cl⁻ contamination, causing a false-positive AgCl precipitate." }
            ],
            skillId: "skill-sss-chem-qualitative-volumetric",
            difficulty: "easy"
          },
          {
            id: "q-sss-qual-3",
            type: "multiple_choice",
            questionText: "Four burette titres are recorded: Rough = 25.80 cm³, Run 1 = 25.05 cm³, Run 2 = 24.95 cm³, Run 3 = 25.00 cm³. What is the concordant average titre in cm³?",
            mathExpression: "\\bar{V} = \\frac{25.05 + 24.95 + 25.00}{3}",
            options: ["25", "25.2", "25.05", "24.95"],
            correctAnswer: "25",
            explanation: "Reject the rough overshoot (25.80 cm³); average the three concordant runs within ±0.20 cm³: (25.05 + 24.95 + 25.00) / 3 = 25.00 cm³.",
            hintLadder: [
              "Exclude the rough titration before averaging.",
              "Average 25.05, 24.95, and 25.00."
            ],
            misconceptionAlerts: [
              { trigger: "25.2", note: "Do not include the rough titre (25.80 cm³) in your concordant average!" }
            ],
            skillId: "skill-sss-chem-qualitative-volumetric",
            difficulty: "medium"
          },
          {
            id: "q-sss-qual-4",
            type: "multiple_choice",
            questionText: "Exactly 25.0 cm³ of 0.120 mol/dm³ Na₂CO₃ is completely neutralized by 30.0 cm³ of HCl according to Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂. Calculate the molar concentration of HCl in mol/dm³.",
            mathExpression: "\\frac{0.120 \\times 25.0}{1} = \\frac{C_{\\text{HCl}} \\times 30.0}{2}",
            options: ["0.2", "0.1", "0.05", "0.4"],
            correctAnswer: "0.2",
            explanation: "n(Na₂CO₃) = 0.120 × 0.025 = 0.00300 mol. From 1:2 stoichiometry, n(HCl) = 0.00600 mol ⇒ [HCl] = 0.00600 / 0.0300 = 0.200 mol/dm³.",
            hintLadder: [
              "Find moles of Na₂CO₃ first: 0.120 × 0.025 = 0.0030 mol.",
              "Multiply by 2 (since 2 HCl react per Na₂CO₃), then divide by 0.030 dm³."
            ],
            misconceptionAlerts: [
              { trigger: "0.1", note: "Remember the 1:2 balanced equation—each Na₂CO₃ consumes TWO moles of HCl!" }
            ],
            skillId: "skill-sss-chem-qualitative-volumetric",
            difficulty: "medium"
          },
          {
            id: "q-sss-qual-5",
            type: "multiple_choice",
            questionText: "1.50 g of impure chalk (CaCO₃, M = 100 g/mol) is dissolved in 40.0 cm³ of 1.00 mol/dm³ HCl. Leftover acid requires 16.0 cm³ of 1.00 mol/dm³ NaOH. Calculate the percentage purity (%) of CaCO₃.",
            mathExpression: "n(\\text{CaCO}_3) = \\frac{0.040 - 0.016}{2},\\quad \\%\\text{Purity} = \\frac{m}{1.50}\\times 100",
            options: ["80", "160", "40", "92"],
            correctAnswer: "80",
            explanation: "Initial HCl = 0.040 mol; leftover HCl = 0.016 mol; reacted HCl = 0.024 mol ⇒ n(CaCO₃) = 0.024 / 2 = 0.012 mol = 1.20 g ⇒ Purity = (1.20 / 1.50) × 100% = 80%.",
            hintLadder: [
              "Reacted HCl = 0.040 − 0.016 = 0.024 mol.",
              "Divide by 2 for CaCO₃ (0.012 mol = 1.20 g), then divide 1.20 by 1.50 g."
            ],
            misconceptionAlerts: [
              { trigger: "160", note: "Remember CaCO₃ + 2HCl consumes 2 moles HCl per mole CaCO₃, and purity cannot exceed 100%!" }
            ],
            skillId: "skill-sss-chem-qualitative-volumetric",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. sss_263_biology_homeostasis_immunity_disease
  // =========================================================================
  {
    id: "unit-p3-sss-bio-homeostasis-immunity",
    subjectId: "sss_263_biology_homeostasis_immunity_disease",
    level: "senior_secondary",
    title: "Homeostasis, Negative Feedback Loops, Nephron ADH & Adaptive Immunity",
    code: "SSS-BIO-263",
    description:
      "Master negative-feedback thermoregulation and insulin/glucagon glycaemia, kidney ultrafiltration & ADH osmoregulation, and humoral B-cell/T-cell active vs passive immunity.",
    order: 4,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:SSS3-BIO-HOM-01",
      "WAEC_WASSCE:BIO-HOM-263",
      "CAMBRIDGE_IGCSE:0610-HOM-IMM"
    ],
    skills: [
      {
        id: "skill-sss-bio-homeostasis-immunity",
        unitId: "unit-p3-sss-bio-homeostasis-immunity",
        title: "Negative Feedback Homeostasis, Nephron Osmoregulation & Immunity",
        code: "SKL-SSS-BIO-263",
        summary:
          "Trace hypothalamic negative feedback for temperature and blood glucose, trace nephron filtration/reabsorption under ADH control, and contrast primary vs secondary clonal immune responses.",
        objectives: [
          "Contrast skin vasodilation vs vasoconstriction, sweating, and shivering under hypothalamic negative feedback",
          "Distinguish insulin (liver glycogenesis) from glucagon (glycogenolysis), and Type 1 vs Type 2 diabetes mechanisms",
          "Explain ADH collecting-duct aquaporin permeability and contrast B-lymphocyte memory cells (active) vs maternal/antivenom antibodies (passive)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-kidney-nephron-homeostasis", "skill-jss-human-bio-nutrition"],
        lesson: {
          id: "les-sss-bio-homeostasis-immunity",
          title: "Homeostasis, Kidney Osmoregulation & Adaptive Immunology",
          hookAndIntuition:
            "Whether running under hot savanna sun or fighting off measles years after vaccination, survival depends on two smart biological networks: self-correcting negative feedback and memory-cell immunity.",
          conceptualExplanation:
            "HOMEOSTASIS keeps internal body conditions (core temperature ~37 °C, blood glucose ~4–7 mmol/L, blood water potential) within narrow enzyme-safe bands via NEGATIVE FEEDBACK: any deviation triggers an opposing response back toward set point.\n\n1. THERMOREGULATION (Hypothalamus): When hot, arterioles near the skin surface VASODILATE (arterioles widen—note: blood vessels do NOT migrate toward the skin!), increasing blood flow for radiation/convection, while sweat glands secrete water whose evaporation removes latent heat. When cold, arterioles VASOCONSTRICT, sweat stops, hairs erect (in mammals), and skeletal muscles shiver.\n\n2. GLUCOSE & ADH OSMOREGULATION: After a meal, pancreatic β-cells release INSULIN, stimulating liver and muscle cells to convert glucose into insoluble GLYCOGEN; during fasting, α-cells release GLUCAGON to hydrolyze glycogen back into glucose. In kidneys, glomerular ultrafiltration squeezes small solutes (water, glucose, urea, salts) into Bowman's capsule while retaining large plasma proteins; 100% of glucose is selectively reabsorbed in the proximal convoluted tubule. When blood becomes concentrated (dehydration), the pituitary secretes ADH, making the collecting duct MORE permeable to water so small volumes of dark, concentrated urine exit.\n\n3. ADAPTIVE IMMUNITY: Phagocytes engulf pathogens non-specifically first. Then antigens activate B-lymphocytes (secreting specific Y-shaped antibodies) and T-lymphocytes (destroying infected host cells). PRIMARY response is slow (lag phase); SECONDARY exposure triggers long-lived MEMORY CELLS to flood antibodies within days before symptoms appear. Active immunity (infection or vaccine) generates memory cells (long-lasting); Passive immunity (breast milk IgA or snake antivenom) supplies ready antibodies immediately without memory cells.",
          conceptualModel:
            "Deviation → Sensor (Hypothalamus/Pancreas) → Corrective Effector → Return to Set Point | Dehydration ↑ ⇒ ADH ↑ ⇒ Collecting Duct Water Reabsorption ↑.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Insulin vs Glucagon",
              definition: "Insulin (β-cells) lowers blood glucose → liver glycogen; Glucagon (α-cells) raises blood glucose ← liver glycogen.",
              practicalExample: "In Type 1 diabetes, β-cells fail to make insulin; in Type 2, target receptors resist insulin."
            },
            {
              termOrSymbol: "ADH Negative Feedback Loop",
              definition: "Low blood water potential → osmoreceptors → posterior pituitary releases more ADH → collecting-duct water reabsorption rises → concentrated urine.",
              practicalExample: "Drinking 1.5 L of plain water suppresses ADH, yielding copious dilute pale urine."
            },
            {
              termOrSymbol: "Active vs Passive Immunity",
              definition: "Active = own lymphocytes produce antibodies + memory cells (slow onset, long-term); Passive = pre-made antibodies transferred (instant, short-lived).",
              practicalExample: "Measles vaccine = artificial active; tetanus antitoxin serum = artificial passive."
            }
          ],
          workedExamples: [
            {
              title: "Tracing Kidney & Hypothalamic Response During Endurance Running in Heat",
              problemStatement: "A footballer plays 90 minutes in hot humid weather without drinking enough water. Trace both (a) skin vascular thermoregulation and (b) nephron ADH osmoregulation.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Detect core temperature rise and trigger skin cooling.",
                  reasoning: "Hypothalamic thermoreceptors trigger VASODILATION of skin arterioles (wider lumen increases surface heat radiation) and active sweating (evaporative latent cooling)."
                },
                {
                  stepNumber: 2,
                  instruction: "Detect water loss from heavy sweating.",
                  reasoning: "Sweating lowers blood water potential (raises plasma osmolarity), stimulating hypothalamic osmoreceptors."
                },
                {
                  stepNumber: 3,
                  instruction: "Trace pituitary ADH surge at the nephron.",
                  reasoning: "Posterior pituitary secretes MORE ADH into blood, inserting aquaporin channels into distal tubules and collecting ducts."
                },
                {
                  stepNumber: 4,
                  instruction: "Predict final urine output.",
                  reasoning: "Maximum water is reabsorbed back into blood capillaries, leaving a small volume of dark, urea-concentrated urine."
                }
              ],
              takeawayRule: "Skin arterioles widen/narrow (never move up/down); dehydration drives ADH UP so urine volume goes DOWN."
            },
            {
              title: "Interpreting Primary vs Secondary Antibody Kinetics & Booster Vaccines",
              problemStatement: "A child receives Vaccine Dose 1 on Day 0, shows a small antibody peak on Day 14, and receives Booster Dose 2 on Day 40—resulting in an antibody peak 10× higher within 3 days. Explain the cellular mechanism and contrast with receiving maternal IgG.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Explain the slow Day 0–14 primary lag.",
                  reasoning: "Very few naive B/T-cells initially recognize the weakened antigen; clonal selection and proliferation take days."
                },
                {
                  stepNumber: 2,
                  instruction: "Identify the cells responsible for the Day 43 surge.",
                  reasoning: "Long-lived MEMORY B-cells created during Dose 1 divide rapidly upon Dose 2, differentiating into plasma cells pouring out IgG."
                },
                {
                  stepNumber: 3,
                  instruction: "Classify this immunity type.",
                  reasoning: "Artificial ACTIVE immunity because the child's own immune system synthesized antibodies and memory cells."
                },
                {
                  stepNumber: 4,
                  instruction: "Contrast with maternal antibodies across placenta/milk.",
                  reasoning: "Maternal antibodies give natural PASSIVE immunity—immediate protection that fades after months because no infant memory cells formed."
                }
              ],
              takeawayRule: "Memory cells explain rapid secondary booster peaks and distinguish lifelong active immunity from temporary passive antibody transfer."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing that 'capillaries move closer to the skin surface' during vasodilation.",
              whyItIsWrong: "Blood vessels are structurally anchored—they cannot physically crawl toward the epidermis! Only arterioles supplying surface capillaries widen or constrict.",
              correctCorrection: "State precisely: 'Skin arterioles dilate (vasodilation), increasing blood flow through surface capillaries to radiate more heat.'"
            },
            {
              misconception: "Thinking insulin directly destroys glucose or that healthy urine still contains glucose.",
              whyItIsWrong: "Insulin signals liver/muscle cells to absorb and polymerize glucose into glycogen, and proximal nephron tubules reabsorb 100% of filtered glucose unless blood exceeds renal threshold.",
              correctCorrection: "Glomerular filtrate contains glucose, which is 100% actively reabsorbed in the PCT in non-diabetic kidneys."
            }
          ],
          guidedPracticePrompt: "Explain why drinking 2 litres of cold water lowers blood ADH secretion within an hour.",
          independentPracticePrompt: "Contrast the immediate clinical reason to give antivenom serum vs tetanus toxoid vaccine after a snakebite or rusty nail wound.",
          extensionActivity: "Annotate a 2-curve antibody concentration graph marking Primary Lag, Primary Peak, Booster Exposure, and Secondary Exponential Surge.",
          diagnosticSelfCheck: "Why does glucose appear in a patient's urine only when blood glucose rises extremely high in untreated diabetes?",
          transferApplication: "Explain why antibiotics cure bacterial cholera yet fail completely against viral measles.",
          masteryAssessment: "Trace what happens to urine volume & concentration when ADH drops, and explain how memory B-cells drive secondary booster peaks.",
          summaryRecap: "Negative feedback opposes deviation; arterioles dilate/constrict without moving; ADH boosts collecting-duct water reabsorption; active memory cells power secondary immunity.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-hom-1",
            type: "multiple_choice",
            questionText: "During vigorous exercise on a hot afternoon, how do human skin blood vessels help cool the body?",
            options: [
              "Arterioles leading to surface skin capillaries dilate (vasodilation), increasing warm blood flow near the surface for heat loss",
              "Capillaries physically migrate upward through the epidermis toward the air",
              "Skin arterioles constrict tightly to trap sweat inside glands",
              "Capillaries absorb cold air oxygen through skin pores"
            ],
            correctAnswer: "Arterioles leading to surface skin capillaries dilate (vasodilation), increasing warm blood flow near the surface for heat loss",
            explanation: "Blood vessels remain fixed in dermis tissue; smooth-muscle relaxation widens arterioles so more warm blood circulates through superficial capillary loops.",
            hintLadder: [
              "Can blood vessels physically move up and down inside skin tissue?",
              "Arterioles widen (vasodilation) to carry more warm blood through surface capillaries."
            ],
            misconceptionAlerts: [
              { trigger: "Capillaries physically migrate upward through the epidermis toward the air", note: "Exam boards deduct marks for claiming vessels move closer—state that arterioles dilate (vasodilation)." }
            ],
            skillId: "skill-sss-bio-homeostasis-immunity",
            difficulty: "easy"
          },
          {
            id: "q-sss-hom-2",
            type: "multiple_choice",
            questionText: "In a healthy adult kidney, where does 100% selective reabsorption of filtered glucose back into the blood take place?",
            options: [
              "Proximal convoluted tubule (PCT)",
              "Bowman's capsule",
              "Collecting duct under ADH control",
              "Urinary bladder"
            ],
            correctAnswer: "Proximal convoluted tubule (PCT)",
            explanation: "Ultrafiltration pushes glucose into Bowman's capsule, and microvilli + mitochondria-rich PCT cells actively co-transport 100% of glucose back into peritubular capillaries.",
            hintLadder: [
              "Recall the first coiled tubule immediately leaving Bowman's capsule.",
              "The proximal convoluted tubule reabsorbs all glucose and amino acids."
            ],
            misconceptionAlerts: [
              { trigger: "Collecting duct under ADH control", note: "ADH adjusts final WATER reabsorption in the collecting duct; glucose is already 100% recovered in the PCT." }
            ],
            skillId: "skill-sss-bio-homeostasis-immunity",
            difficulty: "easy"
          },
          {
            id: "q-sss-hom-3",
            type: "multiple_choice",
            questionText: "A marathon runner finishes a race dehydrated with high plasma osmolarity. How do ADH secretion and urine properties respond?",
            options: [
              "Posterior pituitary releases MORE ADH → collecting ducts become MORE permeable to water → small volume of concentrated urine",
              "ADH drops to zero → large volume of dilute urine",
              "Kidney stops filtering urea completely",
              "Pancreas releases insulin to make collecting ducts impermeable"
            ],
            correctAnswer: "Posterior pituitary releases MORE ADH → collecting ducts become MORE permeable to water → small volume of concentrated urine",
            explanation: "Dehydration raises ADH so more water returns to the blood through collecting-duct aquaporins, conserving body water and concentrating urinary wastes.",
            hintLadder: [
              "When the body needs to SAVE water, does ADH go up or down?",
              "Higher ADH opens water channels in the collecting duct, pulling water back into blood."
            ],
            misconceptionAlerts: [
              { trigger: "ADH drops to zero → large volume of dilute urine", note: "Low ADH produces copious dilute urine only when you are OVER-hydrated." }
            ],
            skillId: "skill-sss-bio-homeostasis-immunity",
            difficulty: "medium"
          },
          {
            id: "q-sss-hom-4",
            type: "multiple_choice",
            questionText: "Why does receiving snake antivenom serum after a cobra bite provide immediate protection that fades after a few weeks, unlike a measles vaccination?",
            options: [
              "Antivenom provides PASSIVE immunity (pre-formed antibodies that neutralize toxin immediately, but decay without generating host memory B-cells)",
              "Antivenom forces red blood cells to divide into T-lymphocytes",
              "Antivenom contains live cobra venom that creates lifelong memory cells within 1 minute",
              "Antibodies only work once against protein antigens"
            ],
            correctAnswer: "Antivenom provides PASSIVE immunity (pre-formed antibodies that neutralize toxin immediately, but decay without generating host memory B-cells)",
            explanation: "Emergency antivenom supplies ready-made IgG antibodies immediately (passive immunity), whereas vaccines stimulate the patient's own lymphocytes and durable memory cells (active immunity).",
            hintLadder: [
              "Compare waiting 10–14 days for active antibodies vs neutralising lethal venom in minutes.",
              "Pre-made donor antibodies cannot generate the patient's own memory cells."
            ],
            misconceptionAlerts: [
              { trigger: "Antivenom contains live cobra venom that creates lifelong memory cells within 1 minute", note: "Active primary memory-cell responses take days/weeks; antivenom is pre-formed passive antibody serum." }
            ],
            skillId: "skill-sss-bio-homeostasis-immunity",
            difficulty: "medium"
          },
          {
            id: "q-sss-hom-5",
            type: "multiple_choice",
            questionText: "In Type 2 diabetes mellitus, fasting blood tests often show normal or even elevated plasma insulin yet persistently high blood glucose. What is the primary defect?",
            options: [
              "Target liver and muscle cell receptors lose sensitivity (insulin resistance), failing to trigger glucose uptake and glycogenesis",
              "Pancreatic α-cells turn directly into glucagon crystals",
              "Red blood cells consume all liver glycogen by osmosis",
              "Glomerular capillaries stop filtering glucose forever"
            ],
            correctAnswer: "Target liver and muscle cell receptors lose sensitivity (insulin resistance), failing to trigger glucose uptake and glycogenesis",
            explanation: "Unlike Type 1 (autoimmune destruction of insulin-producing β-cells), Type 2 features target-cell receptor resistance so insulin signals fail to clear blood glucose.",
            hintLadder: [
              "Contrast lack of hormone production (Type 1) vs failure of target cells to respond (Type 2).",
              "Insulin is present in blood, meaning receptors on liver/muscle cells are resistant."
            ],
            misconceptionAlerts: [
              { trigger: "Pancreatic α-cells turn directly into glucagon crystals", note: "Type 2 diabetes involves receptor resistance to insulin at muscle and liver target tissues." }
            ],
            skillId: "skill-sss-bio-homeostasis-immunity",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. sss_264_biology_molecular_genetics_biotechno
  // =========================================================================
  {
    id: "unit-p3-sss-bio-molecular-genetics-biotech",
    subjectId: "sss_264_biology_molecular_genetics_biotechno",
    level: "senior_secondary",
    title: "Molecular Genetics: DNA Replication, Transcription/Translation, PCR & Recombinant Biotech",
    code: "SSS-BIO-264",
    description:
      "Master Chargaff base pairing (A=T, G≡C), semi-conservative DNA replication, transcription (DNA→mRNA) vs ribosome translation (mRNA→polypeptide), PCR cycles (2ⁿ), and recombinant plasmid insulin + bioethics.",
    order: 4,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:SSS3-BIO-GEN-02",
      "WAEC_WASSCE:BIO-GEN-264",
      "CAMBRIDGE_IAL:BIO-MOL-BIOTECH"
    ],
    skills: [
      {
        id: "skill-sss-bio-molecular-genetics-biotech",
        unitId: "unit-p3-sss-bio-molecular-genetics-biotech",
        title: "Central Dogma Protein Synthesis, PCR Amplification & Recombinant DNA",
        code: "SKL-SSS-BIO-264",
        summary:
          "Apply Chargaff's base rules, transcribe DNA templates to mRNA codons and tRNA anticodons, evaluate point/frameshift mutations, compute PCR copies (2ⁿ), and outline recombinant plasmid cloning and bioethics.",
        objectives: [
          "Calculate complementary DNA percentages via Chargaff's rule (%A = %T, %G = %C, total = 100%)",
          "Transcribe 3'→5' DNA templates into 5'→3' mRNA using Uracil (U) instead of Thymine (T) and decode amino acids",
          "Explain restriction enzymes, DNA ligase, PCR exponential doubling (2ⁿ), and biosafety/informed-consent ethics"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-dihybrid-sex-linkage-dna", "skill-sss-mendelian-dna-ecosystems"],
        lesson: {
          id: "les-sss-bio-molecular-genetics-biotech",
          title: "Molecular Genetics, Protein Synthesis & Modern Biotechnology",
          hookAndIntuition:
            "How does a single bacterium manufacture pure human insulin for millions of diabetics? Because the genetic code is nearly universal—bacteria read spliced human mRNA codons with the exact same ribosome machinery!",
          conceptualExplanation:
            "Molecular biology bridges double-helix chemistry to protein traits and genetic engineering.\n\n1. DNA STRUCTURE & CHARGAFF'S RULE: Antiparallel sugar–phosphate strands join via hydrogen bonds: Adenine pairs with Thymine (A = T, 2 H-bonds) and Guanine with Cytosine (G ≡ C, 3 H-bonds). Thus in double-stranded DNA, %A = %T and %G = %C. If %G = 22%, then %C = 22%, leaving 56% split equally: %A = 28% and %T = 28%! Meselson–Stahl proved SEMI-CONSERVATIVE replication: each daughter helix retains one original parent strand + one newly built strand.\n\n2. CENTRAL DOGMA (DNA → mRNA → Protein):\n• TRANSCRIPTION (Nucleus): RNA polymerase copies the DNA template strand into single-stranded mRNA substituting URACIL (U) opposite DNA Adenine (A→U, T→A, C→G, G→C). mRNA triplets are CODONS.\n• TRANSLATION (Ribosome): tRNA molecules carry specific amino acids and match complementary ANTICODONS to mRNA codons; peptide bonds link amino acids into polypeptides. Frameshift insertions/deletions shift every downstream codon (catastrophic), whereas silent substitutions leave the same amino acid due to genetic-code degeneracy.\n\n3. BIOTECHNOLOGY & BIOETHICS: PCR doubles target DNA every thermal cycle (Denature 95 °C → Anneal 55 °C → Taq Extension 72 °C): after n cycles, Copies = Initial × 2ⁿ. Recombinant cloning cuts BOTH human gene and bacterial plasmid with the SAME restriction enzyme (making matching sticky ends), seals them with DNA LIGASE, and transforms E. coli. Ethical deployment demands informed consent, genetic privacy, non-discrimination, and ecological containment against transgene escape.",
          conceptualModel:
            "DNA (A-T, G-C) —[Transcription]→ mRNA (U replaces T) —[Ribosome + tRNA]→ Protein | PCR Yield = N₀ × 2ⁿ.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Chargaff Base Pairing (%A = %T, %G = %C)",
              definition: "Knowing any single base percentage in dsDNA determines all four: %A + %G = 50%.",
              practicalExample: "If Adenine is 18%, Thymine = 18%, leaving 64% ÷ 2 = 32% Guanine and 32% Cytosine."
            },
            {
              termOrSymbol: "Transcription vs Translation Pairing",
              definition: "DNA → mRNA maps A→U, T→A, G→C, C→G (mRNA NEVER contains Thymine T!).",
              practicalExample: "DNA template 3'-TAC GGA-5' transcribes to mRNA 5'-AUG CCU-3' (start codon AUG)."
            },
            {
              termOrSymbol: "Restriction Enzymes + DNA Ligase + PCR (2ⁿ)",
              definition: "Restriction endonucleases cut palindromic sticky ends; DNA ligase joins sugar-phosphate backbones; Taq polymerase survives 95 °C PCR cycles.",
              practicalExample: "Starting with 1 DNA copy, 10 PCR cycles amplify it to 2¹⁰ = 1,024 copies."
            }
          ],
          workedExamples: [
            {
              title: "Transcribing & Translating a DNA Segment + Diagnosing a Frameshift Mutation",
              problemStatement: "A DNA template strand reads 3'-TAC GGT CAA ACT-5'. (a) Write the transcribed 5'→3' mRNA codons, (b) list the matching tRNA anticodons, and (c) explain why deleting the 4th base (G) is far more severe than mutating the 6th base (T→C).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Transcribe DNA template to mRNA (A→U, T→A, C→G, G→C).",
                  reasoning: "3'-TAC GGT CAA ACT-5' → mRNA 5'-AUG CCA GUU UGA-3' (Notice UGA = stop codon!)."
                },
                {
                  stepNumber: 2,
                  instruction: "Match tRNA anticodons to the first three coding codons.",
                  reasoning: "mRNA AUG ↔ tRNA UAC; mRNA CCA ↔ tRNA GGU; mRNA GUU ↔ tRNA CAA (UGA stop binds release factor, no tRNA)."
                },
                {
                  stepNumber: 3,
                  instruction: "Test deleting the 4th base (G) — frameshift effect.",
                  reasoning: "Template becomes 3'-TAC GTC AAA CT...-5' → mRNA 5'-AUG CAG UUU GA...-3': every downstream codon shifts out of frame and the stop codon disappears!"
                },
                {
                  stepNumber: 4,
                  instruction: "Test substituting 6th base T→C — degeneracy/silent effect.",
                  reasoning: "mRNA CCA mutates to CCG, and because both CCA and CCG encode Proline, the amino acid sequence stays 100% identical (silent mutation)."
                }
              ],
              takeawayRule: "mRNA uses U instead of T; single-base indels cause downstream frameshifts, whereas 3rd-position wobble substitutions can be silent."
            },
            {
              title: "Engineering Recombinant Human Insulin & Computing PCR Copy Amplification",
              problemStatement: "A biotech lab isolates a single (1) human insulin cDNA copy and runs 8 automated PCR cycles before splicing it into a plasmid vector. (a) Calculate total DNA copies after 8 PCR cycles, and (b) specify the two enzymes needed to insert the gene into E. coli plasmid.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Apply exponential PCR formula N = N₀ × 2ⁿ.",
                  reasoning: "N = 1 × 2⁸ = 256 copies of the target insulin cDNA."
                },
                {
                  stepNumber: 2,
                  instruction: "Identify the cutting enzyme.",
                  reasoning: "Cut both the human insulin gene and the bacterial plasmid with the SAME restriction endonuclease to create complementary sticky ends."
                },
                {
                  stepNumber: 3,
                  instruction: "Identify the joining enzyme.",
                  reasoning: "Seal the recombinant sugar–phosphate phosphodiester backbone permanently using DNA LIGASE."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify why heat-stable Taq polymerase is mandatory for PCR.",
                  reasoning: "Human DNA polymerase denatures at the 95 °C strand-separation step; Thermus aquaticus Taq survives heating without replenishment."
                }
              ],
              takeawayRule: "PCR scales as N₀ × 2ⁿ using heat-stable Taq polymerase; cloning cuts both vector and insert with the SAME restriction enzyme and seals with DNA ligase."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Writing Thymine (T) inside an mRNA transcript instead of Uracil (U).",
              whyItIsWrong: "RNA nucleotides contain ribose sugar and Uracil (U) instead of Thymine—any 'T' inside an mRNA sequence is an automatic error.",
              correctCorrection: "Pair DNA Adenine (A) strictly with mRNA Uracil (U) during transcription."
            },
            {
              misconception: "Cutting the human gene with Restriction Enzyme 1 and the bacterial plasmid with Restriction Enzyme 2.",
              whyItIsWrong: "Different restriction enzymes cut non-matching overhang sequences, preventing sticky ends from annealing cleanly.",
              correctCorrection: "Always cleave both vector plasmid and target gene with the SAME restriction enzyme."
            }
          ],
          guidedPracticePrompt: "In double-stranded viral DNA containing 19% cytosine, compute percentages of guanine, adenine, and thymine.",
          independentPracticePrompt: "Transcribe DNA template 3'-TAC CTT GGA ATT-5' into mRNA codons.",
          extensionActivity: "Debate two bioethical safeguards required before deploying gene-drive mosquitoes or CRISPR germline editing.",
          diagnosticSelfCheck: "Why does Meselson–Stahl's hybrid ¹⁵N/¹⁴N density band prove semi-conservative replication rather than conservative replication?",
          transferApplication: "Explain why splicing human intron-free cDNA (from mRNA via reverse transcriptase) is needed before E. coli can translate human insulin.",
          masteryAssessment: "Compute %A if %G = 31%, transcribe DNA 3'-TAC GCG TAT-5' to mRNA, and calculate PCR copies from 5 templates after 6 cycles.",
          summaryRecap: "Chargaff (%A=%T, %G=%C); mRNA replaces T with U; frameshift indels corrupt all downstream codons; PCR doubles as 2ⁿ via Taq; same restriction enzyme + DNA ligase builds recombinant plasmids.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-mol-1",
            type: "multiple_choice",
            questionText: "A sample of double-stranded DNA contains 31% Guanine (G). According to Chargaff's base-pairing rule, what percentage (%) of Adenine (A) does it contain?",
            mathExpression: "\\%A = \\frac{100\\% - 2(31\\%)}{2}",
            options: ["19", "31", "38", "69"],
            correctAnswer: "19",
            explanation: "Since %G = %C = 31%, G + C = 62%. The remaining 38% is split equally between A and T: %A = 38% / 2 = 19%.",
            hintLadder: [
              "In double-stranded DNA, %C equals %G (31%).",
              "Subtract 62% from 100%, then divide the remainder by 2 for %A."
            ],
            misconceptionAlerts: [
              { trigger: "31", note: "31% is Cytosine (G's partner); Adenine pairs with Thymine from the remaining 38%." }
            ],
            skillId: "skill-sss-bio-molecular-genetics-biotech",
            difficulty: "easy"
          },
          {
            id: "q-sss-mol-2",
            type: "multiple_choice",
            questionText: "Transcribe the DNA template strand 3'-TAC GGA TTC-5' into the complementary 5'→3' mRNA strand:",
            options: [
              "5'-AUG CCU AAG-3'",
              "5'-ATG CCT AAG-3'",
              "5'-UAC GGA UUC-3'",
              "5'-AUG CCA UUC-3'"
            ],
            correctAnswer: "5'-AUG CCU AAG-3'",
            explanation: "Complementary RNA pairing maps T→A, A→U, C→G, G→C: TAC → AUG, GGA → CCU, TTC → AAG (never write T in mRNA!).",
            hintLadder: [
              "Replace every DNA A with mRNA U (and never write T in mRNA).",
              "Check each triplet: TAC→AUG, GGA→CCU, TTC→AAG."
            ],
            misconceptionAlerts: [
              { trigger: "5'-ATG CCT AAG-3'", note: "Check RNA nucleotides: mRNA uses Uracil (U), NEVER Thymine (T)!" }
            ],
            skillId: "skill-sss-bio-molecular-genetics-biotech",
            difficulty: "easy"
          },
          {
            id: "q-sss-mol-3",
            type: "multiple_choice",
            questionText: "A forensic crime-scene swab yields 3 copies of a target STR DNA locus. After running 6 complete thermal cycles of PCR, how many copies of the target DNA exist?",
            mathExpression: "N = 3 \\times 2^6",
            options: ["192", "36", "96", "384"],
            correctAnswer: "192",
            explanation: "Each PCR cycle doubles double-stranded copies: N = 3 × 2⁶ = 3 × 64 = 192 copies.",
            hintLadder: [
              "2⁶ = 64 doubling factor.",
              "Multiply initial 3 copies by 64."
            ],
            misconceptionAlerts: [
              { trigger: "36", note: "PCR grows exponentially (2⁶ = 64), not linearly (6 × 6)!" }
            ],
            skillId: "skill-sss-bio-molecular-genetics-biotech",
            difficulty: "medium"
          },
          {
            id: "q-sss-mol-4",
            type: "multiple_choice",
            questionText: "In recombinant insulin production, why must both the human insulin cDNA and the bacterial plasmid vector be cut using the SAME restriction endonuclease before adding DNA ligase?",
            options: [
              "To generate identical complementary sticky-end overhangs that base-pair together before ligase seals the sugar-phosphate backbone",
              "To destroy bacterial ribosomes before transformation",
              "To convert plasmid DNA into single-stranded mRNA",
              "Because DNA ligase only binds when ATP is removed by heat"
            ],
            correctAnswer: "To generate identical complementary sticky-end overhangs that base-pair together before ligase seals the sugar-phosphate backbone",
            explanation: "Cutting vector and insert with the same restriction enzyme exposes matching complementary single-stranded sticky ends that anneal by hydrogen bonding so ligase can seal the phosphodiester covalent bonds.",
            hintLadder: [
              "Think of puzzle pieces: complementary overhanging base pairs must match to anneal.",
              "Same restriction enzyme ⇒ matching sticky ends ⇒ DNA ligase seals the nicks."
            ],
            misconceptionAlerts: [
              { trigger: "To convert plasmid DNA into single-stranded mRNA", note: "Plasmid vectors remain circular double-stranded DNA; matching sticky ends enable insert ligation." }
            ],
            skillId: "skill-sss-bio-molecular-genetics-biotech",
            difficulty: "medium"
          },
          {
            id: "q-sss-mol-5",
            type: "multiple_choice",
            questionText: "Why does deleting a single nucleotide near the start of a coding exon usually abolish protein function, whereas substituting a single nucleotide in the third codon position often leaves the protein completely unchanged?",
            options: [
              "A 1-base deletion causes a frameshift scrambling every downstream triplet and often creating a premature stop; a 3rd-base substitution can hit a synonymous codon (genetic-code degeneracy)",
              "Cells instantly repair all substitutions before transcription while ignoring deletions",
              "Deletions remove the entire chromosome arm during mitosis",
              "Ribosomes read backwards whenever a base is substituted"
            ],
            correctAnswer: "A 1-base deletion causes a frameshift scrambling every downstream triplet and often creating a premature stop; a 3rd-base substitution can hit a synonymous codon (genetic-code degeneracy)",
            explanation: "Because ribosomes read unpunctuated triplets, non-multiple-of-3 indels shift the entire reading frame; conversely, multiple codons often specify the exact same amino acid (wobble degeneracy).",
            hintLadder: [
              "Compare changing 1 word letter vs deleting 1 letter in a string of 3-letter words without spaces.",
              "Shifting the frame alters every triplet downstream, whereas 3rd-base degeneracy preserves the amino acid."
            ],
            misconceptionAlerts: [
              { trigger: "Cells instantly repair all substitutions before transcription while ignoring deletions", note: "Both can escape repair; the severity difference comes from reading-frame shifting vs synonymous codon degeneracy." }
            ],
            skillId: "skill-sss-bio-molecular-genetics-biotech",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
