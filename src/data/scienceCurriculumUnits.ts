import { Unit } from "../types/curriculum";

export const SCIENCE_PHYSICS_UNITS: Unit[] = [
  {
    id: "unit-phy-mechanics-motion",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Classical Mechanics, Kinematics & Newton's Laws",
    code: "PHY-UNIT-01",
    description: "Equations of uniformly accelerated motion, projectile trajectories, Newton's three laws of motion, momentum conservation, and work-energy equivalence.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-phy-kinematics",
        unitId: "unit-phy-mechanics-motion",
        title: "Uniform Acceleration & Equations of Motion",
        code: "SKL-PHY-201",
        summary: "Solving rectilinear motion problems using v = u + at, s = ut + 0.5at², and v² = u² + 2as.",
        objectives: [
          "Select the appropriate kinematic equation based on given parameters",
          "Analyze vertical projectile motion under gravity (g = 9.8 or 10 m/s²)",
          "Distinguish scalar distance/speed from vector displacement/velocity"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-1",
            type: "multiple_choice",
            questionText: "A racing car accelerates uniformly from rest at 2.5 m/s² for 8 seconds. What total distance does it cover?",
            mathExpression: "s = ut + \\frac{1}{2}at^2",
            options: ["80 \\text{ m}", "100 \\text{ m}", "20 \\text{ m}", "64 \\text{ m}"],
            correctAnswer: "80 \\text{ m}",
            explanation: "Initial velocity u = 0. s = (0)(8) + 0.5(2.5)(8²) = 0.5 × 2.5 × 64 = 1.25 × 64 = 80 meters.",
            hintLadder: [
              "Identify: u = 0, a = 2.5 m/s², t = 8 s.",
              "Use equation: s = ut + 0.5at².",
              "Since u = 0, s = 0.5 × 2.5 × 64 = 80 m."
            ],
            misconceptionAlerts: [
              { trigger: "20 \\text{ m}", note: "20 m/s is final velocity (v = at = 2.5 × 8), not the distance." }
            ],
            skillId: "skill-phy-kinematics",
            difficulty: "easy"
          },
          {
            id: "q-phy-2",
            type: "multiple_choice",
            questionText: "A stone is thrown vertically upwards with a velocity of 30 m/s. Assuming g = 10 m/s² and negligible air resistance, what is the maximum height attained?",
            mathExpression: "v^2 = u^2 - 2gh \\implies h_{\\max} = \\frac{u^2}{2g}",
            options: ["45 \\text{ m}", "90 \\text{ m}", "30 \\text{ m}", "60 \\text{ m}"],
            correctAnswer: "45 \\text{ m}",
            explanation: "At maximum height, v = 0. 0 = 30² - 2(10)h => 20h = 900 => h = 45 meters.",
            hintLadder: [
              "At the apex of flight, final velocity v = 0.",
              "Use v² = u² - 2gh.",
              "0 = 900 - 20h => h = 900 / 20 = 45 m."
            ],
            misconceptionAlerts: [
              { trigger: "90 \\text{ m}", note: "Did you forget to divide by 2 in the denominator 2g?" }
            ],
            skillId: "skill-phy-kinematics",
            difficulty: "medium"
          },
          {
            id: "q-phy-3",
            type: "multiple_choice",
            questionText: "An aircraft touches down on a runway at 60 m/s and comes to a complete halt with uniform deceleration in 15 seconds. What is the magnitude of the deceleration?",
            mathExpression: "a = \\frac{v - u}{t}",
            options: ["4.0 \\text{ m/s}^2", "0.25 \\text{ m/s}^2", "900 \\text{ m/s}^2", "450 \\text{ m/s}^2"],
            correctAnswer: "4.0 \\text{ m/s}^2",
            explanation: "a = (v - u) / t = (0 - 60) / 15 = -4.0 m/s². The magnitude of deceleration is 4.0 m/s².",
            hintLadder: [
              "Initial velocity u = 60 m/s, final velocity v = 0, time t = 15 s.",
              "Acceleration formula: a = (v - u) / t.",
              "Magnitude = 60 / 15 = 4.0 m/s²."
            ],
            misconceptionAlerts: [
              { trigger: "0.25 \\text{ m/s}^2", note: "Did you divide time by velocity (15 / 60) instead of velocity by time?" }
            ],
            skillId: "skill-phy-kinematics",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-phy-projectiles",
        unitId: "unit-phy-mechanics-motion",
        title: "Projectile Motion & 2D Vector Trajectories",
        code: "SKL-PHY-202",
        summary: "Decomposing 2D motion into independent horizontal (constant velocity) and vertical (free fall) components.",
        objectives: [
          "Resolve initial velocity into horizontal (u cos θ) and vertical (u sin θ) vectors",
          "Calculate time of flight T = (2u sin θ) / g and maximum range R = (u² sin 2θ) / g",
          "Explain why horizontal velocity remains constant in the absence of air resistance"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-proj-1",
            type: "multiple_choice",
            questionText: "At what angle of projection θ with respect to the horizontal is the maximum horizontal range of a projectile achieved on level ground?",
            mathExpression: "R = \\frac{u^2 \\sin(2\\theta)}{g}",
            options: ["45^\\circ", "90^\\circ", "60^\\circ", "30^\\circ"],
            correctAnswer: "45^\\circ",
            explanation: "The range formula depends on sin(2θ). The maximum value of the sine function is 1, which occurs when 2θ = 90°, meaning θ = 45°.",
            hintLadder: [
              "Recall the range equation: R = (u² sin 2θ) / g.",
              "The sine function reaches its peak of 1 at 90°.",
              "Set 2θ = 90° => θ = 45°."
            ],
            misconceptionAlerts: [
              { trigger: "90^\\circ", note: "90° launches the projectile straight up, resulting in zero horizontal range." }
            ],
            skillId: "skill-phy-projectiles",
            difficulty: "easy"
          },
          {
            id: "q-phy-proj-2",
            type: "multiple_choice",
            questionText: "A ball is launched with initial velocity 20 m/s at an angle of 30° above the horizontal. What is its initial horizontal velocity component? (cos 30° ≈ 0.866, sin 30° = 0.5)",
            mathExpression: "u_x = u \\cos(\\theta)",
            options: ["17.32 \\text{ m/s}", "10.0 \\text{ m/s}", "20.0 \\text{ m/s}", "14.14 \\text{ m/s}"],
            correctAnswer: "17.32 \\text{ m/s}",
            explanation: "Horizontal component u_x = u cos(30°) = 20 × 0.866 = 17.32 m/s.",
            hintLadder: [
              "Horizontal component formula is u_x = u cos(θ).",
              "u_x = 20 × cos(30°) = 20 × 0.866.",
              "Result = 17.32 m/s."
            ],
            misconceptionAlerts: [
              { trigger: "10.0 \\text{ m/s}", note: "10.0 m/s is the vertical component (u sin 30° = 20 × 0.5), not horizontal." }
            ],
            skillId: "skill-phy-projectiles",
            difficulty: "medium"
          },
          {
            id: "q-phy-proj-3",
            type: "multiple_choice",
            questionText: "During projectile motion with no air resistance, which of the following quantities remains strictly CONSTANT throughout the entire flight?",
            options: [
              "Horizontal component of velocity (v_x)",
              "Vertical component of velocity (v_y)",
              "Total kinetic energy of the projectile",
              "Linear momentum vector"
            ],
            correctAnswer: "Horizontal component of velocity (v_x)",
            explanation: "Because gravity acts solely downwards in the vertical direction (a_y = -g) and there are no horizontal forces (a_x = 0), the horizontal velocity component v_x remains constant.",
            hintLadder: [
              "Consider which direction gravity exerts a force.",
              "Gravity acts strictly downwards, leaving horizontal acceleration at zero.",
              "Horizontal velocity v_x remains unchanged."
            ],
            misconceptionAlerts: [
              { trigger: "Total kinetic energy of the projectile", note: "Kinetic energy decreases as the projectile rises and potential energy increases." }
            ],
            skillId: "skill-phy-projectiles",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-dynamics-energy",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Dynamics, Momentum & Conservation of Energy",
    code: "PHY-UNIT-02",
    description: "Newton's Laws, impulse, elastic/inelastic collisions, work done by variable forces, kinetic vs potential energy, and power efficiency.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-phy-newtons-laws",
        unitId: "unit-phy-dynamics-energy",
        title: "Newton's Laws & Momentum Conservation",
        code: "SKL-PHY-203",
        summary: "Applying F_net = ma and the law of conservation of linear momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.",
        objectives: [
          "Apply Newton's Second Law to connected systems and inclined planes",
          "Solve 1D momentum conservation problems for both elastic and inelastic collisions",
          "Calculate impulse as change in linear momentum: J = F Δt = Δp"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-dyn-1",
            type: "multiple_choice",
            questionText: "A resultant force of 120 N acts on an object of mass 24 kg for 5 seconds. What is the total change in momentum (Impulse) produced?",
            mathExpression: "J = F \\Delta t = \\Delta p",
            options: ["600 \\text{ N}\\cdot\\text{s}", "24 \\text{ N}\\cdot\\text{s}", "25 \\text{ N}\\cdot\\text{s}", "120 \\text{ N}\\cdot\\text{s}"],
            correctAnswer: "600 \\text{ N}\\cdot\\text{s}",
            explanation: "Impulse J = F × Δt = 120 N × 5 s = 600 N·s (or kg·m/s).",
            hintLadder: [
              "Impulse formula: J = Force × Time.",
              "Multiply 120 N by 5 seconds.",
              "120 × 5 = 600 N·s."
            ],
            misconceptionAlerts: [
              { trigger: "24 \\text{ N}\\cdot\\text{s}", note: "Did you divide force by time (120 / 5) instead of multiplying?" }
            ],
            skillId: "skill-phy-newtons-laws",
            difficulty: "easy"
          },
          {
            id: "q-phy-dyn-2",
            type: "multiple_choice",
            questionText: "A 2 kg trolley moving at 6 m/s collides with and sticks to a stationary 4 kg trolley. What is their combined velocity after the collision?",
            mathExpression: "m_1 u_1 + m_2 u_2 = (m_1 + m_2) v",
            options: ["2.0 \\text{ m/s}", "3.0 \\text{ m/s}", "1.5 \\text{ m/s}", "4.0 \\text{ m/s}"],
            correctAnswer: "2.0 \\text{ m/s}",
            explanation: "Total initial momentum = (2 kg × 6 m/s) + (4 kg × 0) = 12 kg·m/s. Total mass = 2 + 4 = 6 kg. Combined velocity v = 12 / 6 = 2.0 m/s.",
            hintLadder: [
              "Calculate initial momentum: (2 × 6) + (4 × 0) = 12 kg·m/s.",
              "In a completely inelastic collision, the combined mass is 2 + 4 = 6 kg.",
              "Final velocity v = 12 / 6 = 2.0 m/s."
            ],
            misconceptionAlerts: [
              { trigger: "3.0 \\text{ m/s}", note: "Did you average the masses instead of using conservation of momentum?" }
            ],
            skillId: "skill-phy-newtons-laws",
            difficulty: "medium"
          },
          {
            id: "q-phy-dyn-3",
            type: "multiple_choice",
            questionText: "Which statement correctly describes an ELASTIC collision between two isolated bodies?",
            options: [
              "Both total linear momentum and total kinetic energy are conserved.",
              "Total linear momentum is conserved, but kinetic energy is converted to thermal energy.",
              "Kinetic energy is conserved, but momentum is not conserved.",
              "The colliding bodies must stick together after the collision."
            ],
            correctAnswer: "Both total linear momentum and total kinetic energy are conserved.",
            explanation: "By definition, an elastic collision conserves both total linear momentum and total mechanical kinetic energy. In an inelastic collision, momentum is conserved but kinetic energy is not.",
            hintLadder: [
              "Recall the definitions of elastic vs inelastic collisions.",
              "Elastic collisions conserve both momentum and kinetic energy.",
              "Select the option stating both are conserved."
            ],
            misconceptionAlerts: [
              { trigger: "Total linear momentum is conserved, but kinetic energy is converted to thermal energy.", note: "This describes an inelastic collision, not an elastic one." }
            ],
            skillId: "skill-phy-newtons-laws",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-phy-work-energy",
        unitId: "unit-phy-dynamics-energy",
        title: "Work, Mechanical Energy & Power Systems",
        code: "SKL-PHY-204",
        summary: "Computing work W = F d cos θ, kinetic energy KE = 0.5mv², gravitational potential energy PE = mgh, and power P = W / t.",
        objectives: [
          "Apply the Work-Energy Theorem: Net Work = Change in Kinetic Energy",
          "Solve conservative system problems using total mechanical energy conservation",
          "Compute electrical and mechanical power in watts (W) and kilowatts (kW)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-work-1",
            type: "multiple_choice",
            questionText: "An electric crane lifts a 500 kg concrete block vertically through a height of 12 meters in 6 seconds. What average power is delivered by the crane? (Take g = 10 m/s²)",
            mathExpression: "P = \\frac{W}{t} = \\frac{mgh}{t}",
            options: ["10,000 \\text{ W (10 kW)}", "60,000 \\text{ W}", "5,000 \\text{ W}", "1,000 \\text{ W}"],
            correctAnswer: "10,000 \\text{ W (10 kW)}",
            explanation: "Work done W = mgh = 500 kg × 10 m/s² × 12 m = 60,000 Joules. Power P = 60,000 J / 6 s = 10,000 Watts (10 kW).",
            hintLadder: [
              "Calculate work done against gravity: W = m × g × h.",
              "W = 500 × 10 × 12 = 60,000 Joules.",
              "Power = Work / time = 60,000 / 6 = 10,000 Watts."
            ],
            misconceptionAlerts: [
              { trigger: "60,000 \\text{ W}", note: "60,000 is the total work in Joules, not the power in Watts (you need to divide by 6 seconds)." }
            ],
            skillId: "skill-phy-work-energy",
            difficulty: "medium"
          },
          {
            id: "q-phy-work-2",
            type: "multiple_choice",
            questionText: "If the speed of an automobile is DOUBLED from 15 m/s to 30 m/s, by what factor does its Kinetic Energy increase?",
            mathExpression: "KE = \\frac{1}{2}mv^2",
            options: ["Factor of 4", "Factor of 2", "Factor of 8", "Factor of 16"],
            correctAnswer: "Factor of 4",
            explanation: "Kinetic energy is proportional to the square of velocity (KE ∝ v²). Doubling v results in (2v)² = 4v², so KE increases by a factor of 4.",
            hintLadder: [
              "Look at the kinetic energy formula: KE = 0.5 m v².",
              "Notice the exponent on velocity is 2.",
              "2² = 4, so doubling velocity quadruples kinetic energy."
            ],
            misconceptionAlerts: [
              { trigger: "Factor of 2", note: "Linear momentum doubles when velocity doubles, but kinetic energy scales with v² (quadruples)." }
            ],
            skillId: "skill-phy-work-energy",
            difficulty: "easy"
          },
          {
            id: "q-phy-work-3",
            type: "multiple_choice",
            questionText: "A 0.5 kg pendulum bob is released from a height of 0.8 meters above its lowest point. Assuming no friction, what is its speed at the lowest point? (Take g = 10 m/s²)",
            mathExpression: "mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh}",
            options: ["4.0 \\text{ m/s}", "16.0 \\text{ m/s}", "2.83 \\text{ m/s}", "8.0 \\text{ m/s}"],
            correctAnswer: "4.0 \\text{ m/s}",
            explanation: "By conservation of mechanical energy: PE_top = KE_bottom => mgh = 0.5mv² => v = √(2gh) = √(2 × 10 × 0.8) = √(16) = 4.0 m/s.",
            hintLadder: [
              "Equate potential energy lost to kinetic energy gained: mgh = 0.5 m v².",
              "Mass cancels out: v² = 2gh.",
              "v² = 2 × 10 × 0.8 = 16 => v = 4.0 m/s."
            ],
            misconceptionAlerts: [
              { trigger: "16.0 \\text{ m/s}", note: "16 is v²; remember to take the square root to find velocity v." }
            ],
            skillId: "skill-phy-work-energy",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-waves-optics",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Wave Motion, Sound & Geometrical Optics",
    code: "PHY-UNIT-03",
    description: "Wave properties, universal wave speed equation v = fλ, reflection, Snell's law of refraction, total internal reflection, and thin lens equations.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-phy-wave-properties",
        unitId: "unit-phy-waves-optics",
        title: "Wave Properties & Snell's Law of Refraction",
        code: "SKL-PHY-205",
        summary: "Calculations involving wave speed, frequency, wavelength, and refractive index n = sin(i)/sin(r).",
        objectives: [
          "Apply the universal wave speed formula v = f λ",
          "Calculate refractive index using Snell's Law n = sin(i) / sin(r) = c / v",
          "Understand critical angle and total internal reflection criteria"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-wave-1",
            type: "multiple_choice",
            questionText: "A radio transmitter broadcasts electromagnetic waves at a frequency of 100 MHz (10^8 Hz). If the speed of light is 3 × 10^8 m/s, find the wavelength.",
            mathExpression: "\\lambda = \\frac{v}{f}",
            options: ["3 \\text{ m}", "30 \\text{ m}", "0.33 \\text{ m}", "300 \\text{ m}"],
            correctAnswer: "3 \\text{ m}",
            explanation: "λ = v / f = (3 × 10^8 m/s) / (10^8 Hz) = 3 meters.",
            hintLadder: [
              "Use wave equation: v = f × λ.",
              "Rearrange for wavelength: λ = v / f.",
              "(3 × 10^8) / (1 × 10^8) = 3 meters."
            ],
            misconceptionAlerts: [
              { trigger: "0.33 \\text{ m}", note: "Did you divide frequency by velocity instead of velocity by frequency?" }
            ],
            skillId: "skill-phy-wave-properties",
            difficulty: "easy"
          },
          {
            id: "q-phy-wave-2",
            type: "multiple_choice",
            questionText: "Light passes from air into a glass prism with refractive index n = 1.50. If the speed of light in vacuum is 3.0 × 10^8 m/s, what is the speed of light inside the glass?",
            mathExpression: "v = \\frac{c}{n}",
            options: ["2.0 \\times 10^8 \\text{ m/s}", "4.5 \\times 10^8 \\text{ m/s}", "1.5 \\times 10^8 \\text{ m/s}", "3.0 \\times 10^8 \\text{ m/s}"],
            correctAnswer: "2.0 \\times 10^8 \\text{ m/s}",
            explanation: "Refractive index n = c / v => v = c / n = (3.0 × 10^8) / 1.50 = 2.0 × 10^8 m/s.",
            hintLadder: [
              "Refractive index formula: n = c / v.",
              "Rearrange for v: v = c / n.",
              "(3.0 × 10^8) / 1.50 = 2.0 × 10^8 m/s."
            ],
            misconceptionAlerts: [
              { trigger: "4.5 \\times 10^8 \\text{ m/s}", note: "Light slows down in dense media; it cannot exceed the speed of light in vacuum (c)." }
            ],
            skillId: "skill-phy-wave-properties",
            difficulty: "medium"
          },
          {
            id: "q-phy-wave-3",
            type: "multiple_choice",
            questionText: "Under what conditions does Total Internal Reflection (TIR) occur at an optical boundary?",
            options: [
              "Light travels from an optically denser to rarer medium with angle of incidence greater than the critical angle.",
              "Light travels from rarer to denser medium with angle of incidence equal to 0°.",
              "Light travels in a vacuum and encounters an opaque metal surface.",
              "Light undergoes destructive interference at all angles."
            ],
            correctAnswer: "Light travels from an optically denser to rarer medium with angle of incidence greater than the critical angle.",
            explanation: "TIR occurs strictly when light travels from a denser medium (higher n) into a less dense medium (lower n) and the angle of incidence i exceeds the critical angle c.",
            hintLadder: [
              "Remember the two requirements for TIR.",
              "Requirement 1: Denser to rarer medium.",
              "Requirement 2: Angle of incidence > Critical angle."
            ],
            misconceptionAlerts: [
              { trigger: "Light travels from rarer to denser medium with angle of incidence equal to 0°.", note: "Light traveling from rarer to denser medium refracts toward the normal and cannot undergo TIR." }
            ],
            skillId: "skill-phy-wave-properties",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-electricity-magnetism",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Current Electricity, DC Circuits & Electromagnetism",
    code: "PHY-UNIT-04",
    description: "Ohm's Law, resistors in series and parallel, Kirchhoff's laws, electrical energy/power, magnetic flux, and electromagnetic induction (Faraday's Law).",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-phy-circuits-ohms-law",
        unitId: "unit-phy-electricity-magnetism",
        title: "Ohm's Law & DC Circuit Analysis",
        code: "SKL-PHY-206",
        summary: "Solving equivalent resistance, branch currents, and potential dividers in DC networks.",
        objectives: [
          "Apply Ohm's Law: V = I R",
          "Calculate equivalent resistance for series (R = R₁ + R₂) and parallel (1/R = 1/R₁ + 1/R₂) resistors",
          "Apply Faraday's law of electromagnetic induction: ε = -N (ΔΦ/Δt)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-phy-elec-1",
            type: "multiple_choice",
            questionText: "Two resistors of 6 Ω and 12 Ω are connected in PARALLEL across a 24 V DC power supply. What is the total equivalent resistance of the circuit?",
            mathExpression: "\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2}",
            options: ["4.0 \\, \\Omega", "18.0 \\, \\Omega", "8.0 \\, \\Omega", "2.0 \\, \\Omega"],
            correctAnswer: "4.0 \\, \\Omega",
            explanation: "1/R_eq = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 => R_eq = 4.0 Ω.",
            hintLadder: [
              "Use parallel formula: R_eq = (R₁ × R₂) / (R₁ + R₂).",
              "(6 × 12) / (6 + 12) = 72 / 18.",
              "72 / 18 = 4.0 Ω."
            ],
            misconceptionAlerts: [
              { trigger: "18.0 \\, \\Omega", note: "18 Ω is the series combination (6 + 12), not parallel." }
            ],
            skillId: "skill-phy-circuits-ohms-law",
            difficulty: "easy"
          },
          {
            id: "q-phy-elec-2",
            type: "multiple_choice",
            questionText: "What is the total current flowing from the 24 V supply in the circuit with equivalent resistance 4.0 Ω?",
            mathExpression: "I = \\frac{V}{R}",
            options: ["6.0 \\text{ A}", "96.0 \\text{ A}", "1.33 \\text{ A}", "4.0 \\text{ A}"],
            correctAnswer: "6.0 \\text{ A}",
            explanation: "By Ohm's Law: I = V / R_eq = 24 V / 4.0 Ω = 6.0 A.",
            hintLadder: [
              "Apply Ohm's law: I = V / R.",
              "Divide 24 V by 4 Ω.",
              "Result = 6.0 A."
            ],
            misconceptionAlerts: [
              { trigger: "96.0 \\text{ A}", note: "Did you multiply V by R (24 × 4) instead of dividing?" }
            ],
            skillId: "skill-phy-circuits-ohms-law",
            difficulty: "easy"
          },
          {
            id: "q-phy-elec-3",
            type: "multiple_choice",
            questionText: "According to Faraday's and Lenz's laws of induction, the induced electromotive force (EMF) in a closed coil is directly proportional to:",
            options: [
              "The time rate of change of magnetic flux linkage through the coil.",
              "The static electrical resistance of the connecting copper wires.",
              "The constant atmospheric pressure surrounding the magnet.",
              "The electrostatic capacitance of the battery."
            ],
            correctAnswer: "The time rate of change of magnetic flux linkage through the coil.",
            explanation: "Faraday's Law states: Induced EMF ε = -N (dΦ/dt), where dΦ/dt is the rate of change of magnetic flux linkage.",
            hintLadder: [
              "Recall Faraday's Law formula: ε = -N (ΔΦ / Δt).",
              "Induced EMF depends on how quickly magnetic flux changes.",
              "Select 'The time rate of change of magnetic flux linkage'."
            ],
            misconceptionAlerts: [
              { trigger: "The static electrical resistance of the connecting copper wires.", note: "Resistance affects induced current (I = ε/R), but EMF itself is determined by rate of flux change." }
            ],
            skillId: "skill-phy-circuits-ohms-law",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-measurement-scalars-vectors",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Dimensional Analysis, Vector Resolution & Precision Measurement",
    code: "PHY-UNIT-04",
    description: "Fundamental and derived SI units, dimensional analysis formulas, micrometer screw gauges, vernier calipers, and coplanar vector resolution.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-phy-precision-measurement",
        unitId: "unit-phy-measurement-scalars-vectors",
        title: "Dimensional Homogeneity, Micrometers & Vector Resolution",
        code: "SKL-PHY-301",
        summary: "Deriving dimensional formulas [M][L][T], reading vernier/micrometer instruments with zero error, and computing vector resultants.",
        objectives: [
          "Derive dimensional formulas for mechanical quantities such as force, pressure, work, and power",
          "Interpret readings on micrometer screw gauges and vernier calipers including zero-error adjustments",
          "Resolve coplanar force vectors into orthogonal components and compute resultant magnitude and direction"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-kinematics"],
        questions: [
          {
            id: "q-phy-dim-1",
            type: "multiple_choice",
            questionText: "What is the dimensional formula for mechanical Pressure in terms of fundamental dimensions [M], [L], and [T]?",
            mathExpression: "P = \\frac{F}{A} = \\frac{[MLT^{-2}]}{[L^2]}",
            options: ["[ML^{-1}T^{-2}]", "[MLT^{-2}]", "[ML^2T^{-2}]", "[ML^{-2}T^{-2}]"],
            correctAnswer: "[ML^{-1}T^{-2}]",
            explanation: "Pressure P = Force / Area. Force has dimensions [MLT⁻²]. Area has dimensions [L²]. Dividing [MLT⁻²] / [L²] = [ML⁻¹T⁻²].",
            hintLadder: [
              "Recall the definition of Pressure: Force divided by Area.",
              "Force is mass × acceleration: [M] × [LT⁻²] = [MLT⁻²].",
              "Divide by Area [L²]: [MLT⁻²] / [L²] = [ML⁻¹T⁻²]."
            ],
            misconceptionAlerts: [
              { trigger: "[MLT^{-2}]", note: "This is the dimension of Force, not Pressure." },
              { trigger: "[ML^2T^{-2}]", note: "This is the dimension of Work or Energy (Force × Distance)." }
            ],
            skillId: "skill-phy-precision-measurement",
            difficulty: "easy"
          },
          {
            id: "q-phy-dim-2",
            type: "multiple_choice",
            questionText: "Two coplanar forces of 12 N and 5 N act concurrently on an object at an angle of 90° to each other. What is the magnitude of the resultant force?",
            mathExpression: "R = \\sqrt{F_1^2 + F_2^2} = \\sqrt{12^2 + 5^2}",
            options: ["13 N", "17 N", "7 N", "11.9 N"],
            correctAnswer: "13 N",
            explanation: "Since the forces are perpendicular (90°), the resultant is found using the Pythagorean theorem: R = √(12² + 5²) = √(144 + 25) = √169 = 13 N.",
            hintLadder: [
              "Because the angle between the two forces is 90°, use Pythagoras' theorem.",
              "Compute squares: 12² = 144, and 5² = 25.",
              "Add and find square root: √(144 + 25) = √169 = 13 N."
            ],
            misconceptionAlerts: [
              { trigger: "17 N", note: "Scalars add directly (12 + 5 = 17) only when forces are collinear in the exact same direction (0°)." }
            ],
            skillId: "skill-phy-precision-measurement",
            difficulty: "easy"
          },
          {
            id: "q-phy-dim-3",
            type: "multiple_choice",
            questionText: "A micrometer screw gauge with no zero error shows 6.5 mm on the main sleeve scale, and the 28th division on the rotating thimble (with 50 divisions per 0.5 mm pitch) coincides with the datum line. What is the measured diameter?",
            mathExpression: "\\text{Reading} = 6.5\\text{ mm} + (28 \\times 0.01\\text{ mm})",
            options: ["6.78 mm", "6.28 mm", "6.528 mm", "7.78 mm"],
            correctAnswer: "6.78 mm",
            explanation: "Each division on the thimble represents pitch / 50 = 0.5 mm / 50 = 0.01 mm. Thimble reading = 28 × 0.01 mm = 0.28 mm. Total = 6.5 mm + 0.28 mm = 6.78 mm.",
            hintLadder: [
              "Main scale reading = 6.5 mm.",
              "Calculate thimble value: 28 divisions × 0.01 mm/div = 0.28 mm.",
              "Sum main and thimble readings: 6.5 mm + 0.28 mm = 6.78 mm."
            ],
            misconceptionAlerts: [
              { trigger: "6.28 mm", note: "Did you drop the half-millimeter graduation on the main sleeve? It reads 6.5 mm, not 6.0 mm." }
            ],
            skillId: "skill-phy-precision-measurement",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-pressure-fluids",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Hydrostatics, Pascal's Principle & Archimedes' Law",
    code: "PHY-UNIT-05",
    description: "Liquid pressure formulas, U-tube manometers, hydraulic machine calculations via Pascal's principle, and upthrust/buoyancy equilibrium.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-phy-fluid-statics-buoyancy",
        unitId: "unit-phy-pressure-fluids",
        title: "Hydrostatic Pressure, Pascal's Principle & Archimedes' Buoyancy",
        code: "SKL-PHY-302",
        summary: "Applying P = hρg, calculating hydraulic press mechanical advantages, and computing buoyant upthrust.",
        objectives: [
          "Calculate hydrostatic pressure at depth in liquids using P = hρg",
          "Apply Pascal's principle (F₁/A₁ = F₂/A₂) to calculate effort and load in hydraulic machinery",
          "Use Archimedes' principle to solve apparent weight and upthrust problems for submerged bodies"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-kinematics"],
        questions: [
          {
            id: "q-phy-fluid-1",
            type: "multiple_choice",
            questionText: "Calculate the gauge hydrostatic pressure at a depth of 20 meters in fresh water (density ρ = 1,000 kg/m³, acceleration due to gravity g = 9.8 m/s²):",
            mathExpression: "P = h\\rho g = 20 \\times 1000 \\times 9.8",
            options: ["1.96 \\times 10^5 \\text{ Pa}", "1.96 \\times 10^4 \\text{ Pa}", "2.00 \\times 10^5 \\text{ Pa}", "9.80 \\times 10^4 \\text{ Pa}"],
            correctAnswer: "1.96 \\times 10^5 \\text{ Pa}",
            explanation: "Pressure P = h × ρ × g = 20 m × 1,000 kg/m³ × 9.8 m/s² = 196,000 Pa = 1.96 × 10⁵ Pa.",
            hintLadder: [
              "Use formula P = hρg.",
              "h = 20 m, ρ = 1,000 kg/m³, g = 9.8 m/s².",
              "Multiply: 20 × 1,000 × 9.8 = 196,000 Pa = 1.96 × 10⁵ Pa."
            ],
            misconceptionAlerts: [
              { trigger: "1.96 \\times 10^4 \\text{ Pa}", note: "Power of 10 error: 20 × 1,000 = 20,000; 20,000 × 9.8 = 196,000 (10⁵, not 10⁴)." }
            ],
            skillId: "skill-phy-fluid-statics-buoyancy",
            difficulty: "easy"
          },
          {
            id: "q-phy-fluid-2",
            type: "multiple_choice",
            questionText: "In a hydraulic car lift, the effort piston has an area of 0.02 m² and the load piston supporting a vehicle has an area of 1.0 m². If a car weighs 15,000 N, what minimum effort force F₁ must be applied?",
            mathExpression: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_1 = F_2 \\left(\\frac{A_1}{A_2}\\right)",
            options: ["300 N", "750 N", "150 N", "3,000 N"],
            correctAnswer: "300 N",
            explanation: "By Pascal's principle, pressure is transmitted equally: F₁/A₁ = F₂/A₂. F₁ = 15,000 × (0.02 / 1.0) = 15,000 × 0.02 = 300 N.",
            hintLadder: [
              "According to Pascal's principle, P₁ = P₂ so F₁ / A₁ = F₂ / A₂.",
              "Rearrange for F₁: F₁ = F₂ × (A₁ / A₂).",
              "Calculate: 15,000 × (0.02 / 1.0) = 300 N."
            ],
            misconceptionAlerts: [
              { trigger: "3,000 N", note: "Check decimal multiplication: 15,000 × 0.02 = 300, not 3,000." }
            ],
            skillId: "skill-phy-fluid-statics-buoyancy",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-thermal-physics",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Thermal Physics, Specific Heat & Ideal Gas Laws",
    code: "PHY-UNIT-06",
    description: "Thermal expansion, calorimetry, specific heat capacity, latent heat of phase changes, and kinetic theory gas laws.",
    order: 6,
    category: "core",
    skills: [
      {
        id: "skill-phy-heat-capacity-gas-laws",
        unitId: "unit-phy-thermal-physics",
        title: "Specific Heat Capacity, Latent Heat & Gas Laws",
        code: "SKL-PHY-303",
        summary: "Solving calorimetry energy balance problems (Q = mcΔT) and applying Boyle's and Charles's laws with absolute temperature.",
        objectives: [
          "Solve thermal mixture problems using the conservation of thermal energy Q = mcΔT",
          "Calculate energy requirements for state changes using specific latent heat Q = mL",
          "Apply Charles's Law (V₁/T₁ = V₂/T₂) and Boyle's Law using absolute thermodynamic temperatures (Kelvin)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-kinematics"],
        questions: [
          {
            id: "q-phy-therm-1",
            type: "multiple_choice",
            questionText: "How much thermal energy is required to raise the temperature of 2.0 kg of copper (specific heat capacity c = 390 J/kg·°C) from 20°C to 70°C?",
            mathExpression: "Q = mc\\Delta T = 2.0 \\times 390 \\times (70 - 20)",
            options: ["39,000 J (39 kJ)", "78,000 J (78 kJ)", "19,500 J (19.5 kJ)", "54,600 J (54.6 kJ)"],
            correctAnswer: "39,000 J (39 kJ)",
            explanation: "Temperature change ΔT = 70°C - 20°C = 50°C. Thermal energy Q = mcΔT = 2.0 kg × 390 J/(kg·°C) × 50°C = 39,000 J = 39 kJ.",
            hintLadder: [
              "Find temperature change ΔT: 70 - 20 = 50°C.",
              "Use formula Q = mcΔT.",
              "Compute: 2.0 × 390 × 50 = 39,000 J = 39 kJ."
            ],
            misconceptionAlerts: [
              { trigger: "54,600 J (54.6 kJ)", note: "Did you use 70°C directly instead of the temperature change ΔT = (70 - 20) = 50°C?" }
            ],
            skillId: "skill-phy-heat-capacity-gas-laws",
            difficulty: "easy"
          },
          {
            id: "q-phy-therm-2",
            type: "multiple_choice",
            questionText: "A sealed cylinder contains 600 cm³ of ideal gas at 27°C. If the gas is heated at constant pressure to 127°C, what is the new volume of the gas?",
            mathExpression: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\implies V_2 = V_1 \\left(\\frac{T_2}{T_1}\\right)",
            options: ["800 cm³", "2,822 cm³", "750 cm³", "900 cm³"],
            correctAnswer: "800 cm³",
            explanation: "Charles's Law requires absolute temperature in Kelvin: T₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K. V₂ = V₁ × (T₂ / T₁) = 600 × (400 / 300) = 600 × (4/3) = 800 cm³.",
            hintLadder: [
              "Gas laws must always use thermodynamic temperature in Kelvin (T = °C + 273).",
              "T₁ = 27 + 273 = 300 K, T₂ = 127 + 273 = 400 K.",
              "V₂ = 600 × (400 / 300) = 800 cm³."
            ],
            misconceptionAlerts: [
              { trigger: "2,822 cm³", note: "Did you use Celsius temperatures directly (600 × 127 / 27)? You MUST convert to Kelvin first!" }
            ],
            skillId: "skill-phy-heat-capacity-gas-laws",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-phy-electromagnetism-modern",
    subjectId: "sci_physics",
    level: "senior_secondary",
    title: "Electromagnetic Induction, Transformers & Nuclear Physics",
    code: "PHY-UNIT-07",
    description: "Faraday and Lenz laws of electromagnetic induction, AC transformers, photoelectric effect, and radioactive half-life decay kinetics.",
    order: 7,
    category: "exam_focus",
    skills: [
      {
        id: "skill-phy-induction-atomic-physics",
        unitId: "unit-phy-electromagnetism-modern",
        title: "Electromagnetic Induction, Transformers & Radioactive Half-Life",
        code: "SKL-PHY-304",
        summary: "Calculating transformer voltage and turns ratios, analyzing induced EMF, and solving exponential half-life decay problems.",
        objectives: [
          "Apply Faraday's Law and Lenz's Law to predict magnitude and direction of induced electromotive force",
          "Calculate primary and secondary voltages and currents in step-up and step-down transformers (Vs/Vp = Ns/Np)",
          "Determine remaining radioactive mass and daughter nuclei after multiple half-life decay periods"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-circuits-ohms-law"],
        questions: [
          {
            id: "q-phy-em-1",
            type: "multiple_choice",
            questionText: "A step-down transformer connected to a 240 V AC mains supply has 1,200 turns on its primary winding and 60 turns on its secondary winding. What is the output voltage from the secondary winding?",
            mathExpression: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\implies V_s = 240 \\times \\left(\\frac{60}{1200}\\right)",
            options: ["12 V", "24 V", "4,800 V", "6 V"],
            correctAnswer: "12 V",
            explanation: "Transformer turns equation: Vs / Vp = Ns / Np. Output Vs = Vp × (Ns / Np) = 240 × (60 / 1,200) = 240 × (1/20) = 12 V.",
            hintLadder: [
              "Recall the transformer equation: Vs / Vp = Ns / Np.",
              "Identify: Vp = 240 V, Np = 1,200, Ns = 60.",
              "Compute: Vs = 240 × (60 / 1200) = 240 / 20 = 12 V."
            ],
            misconceptionAlerts: [
              { trigger: "4,800 V", note: "Did you multiply 240 by (1,200 / 60)? This is a step-down transformer; secondary voltage must be lower than primary!" }
            ],
            skillId: "skill-phy-induction-atomic-physics",
            difficulty: "easy"
          },
          {
            id: "q-phy-em-2",
            type: "multiple_choice",
            questionText: "A sample of a radioactive isotope has an initial mass of 80 grams and a half-life of 5 days. What mass of the original isotope remains undecayed after 15 days?",
            mathExpression: "m(t) = m_0 \\left(\\frac{1}{2}\\right)^n \\text{ where } n = \\frac{15}{5} = 3",
            options: ["10 grams", "20 grams", "26.7 grams", "5 grams"],
            correctAnswer: "10 grams",
            explanation: "Number of elapsed half-lives n = total time / half-life = 15 / 5 = 3 half-lives. Remaining mass = 80 × (1/2)³ = 80 × 1/8 = 10 grams.",
            hintLadder: [
              "Determine how many half-lives have elapsed: 15 days ÷ 5 days/half-life = 3 half-lives.",
              "Halve the mass three times sequentially: 80 -> 40 -> 20 -> 10.",
              "Remaining mass is 10 grams."
            ],
            misconceptionAlerts: [
              { trigger: "20 grams", note: "20 grams is the mass remaining after 2 half-lives (10 days), not 3 half-lives (15 days)." },
              { trigger: "26.7 grams", note: "Radioactive decay is exponential, not linear! You cannot simply divide 80 by 3." }
            ],
            skillId: "skill-phy-induction-atomic-physics",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

export const SCIENCE_CHEMISTRY_UNITS: Unit[] = [
  {
    id: "unit-chm-atomic-periodicity",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Atomic Structure, Quantum Orbitals & Periodic Trends",
    code: "CHM-UNIT-01",
    description: "Subatomic particles, isotopes, electronic configurations in s, p, d, f subshells, ionization energy trends, and electronegativity.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-chm-atomic-structure",
        unitId: "unit-chm-atomic-periodicity",
        title: "Electronic Configurations & Periodic Trends",
        code: "SKL-CHM-201",
        summary: "Applying Aufbau principle, Pauli exclusion principle, and Hund's rule for electron filling.",
        objectives: [
          "Write spdf electronic configurations for elements Z = 1 to 30",
          "Explain periodic variation of atomic radius, ionization energy, and electronegativity",
          "Distinguish ionic, covalent, and metallic bonding models"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-chm-1",
            type: "multiple_choice",
            questionText: "What is the ground-state electronic configuration of a chlorine atom (Atomic Number Z = 17)?",
            mathExpression: "\\text{Cl } (Z = 17)",
            options: [
              "1s^2 2s^2 2p^6 3s^2 3p^5",
              "1s^2 2s^2 2p^6 3s^2 3p^6",
              "1s^2 2s^2 2p^6 3s^1 3p^6",
              "1s^2 2s^2 2p^5 3s^2 3p^6"
            ],
            correctAnswer: "1s^2 2s^2 2p^6 3s^2 3p^5",
            explanation: "Chlorine has 17 electrons. Filling order: 1s² (2), 2s² (2), 2p⁶ (6), 3s² (2), 3p⁵ (5) = 2 + 2 + 6 + 2 + 5 = 17 electrons.",
            hintLadder: [
              "Total electrons = 17.",
              "Fill lowest energy orbitals first: 1s² (2), 2s² 2p⁶ (8). Total so far = 10.",
              "Remaining 7 electrons go into 3rd shell: 3s² 3p⁵."
            ],
            misconceptionAlerts: [
              { trigger: "1s^2 2s^2 2p^6 3s^2 3p^6", note: "18 electrons represents the chloride ion (Cl⁻), not neutral chlorine." }
            ],
            skillId: "skill-chm-atomic-structure",
            difficulty: "easy"
          },
          {
            id: "q-chm-2",
            type: "multiple_choice",
            questionText: "Which element has the highest FIRST ionization energy on the periodic table?",
            options: ["Helium (He)", "Fluorine (F)", "Sodium (Na)", "Cesium (Cs)"],
            correctAnswer: "Helium (He)",
            explanation: "Helium has the highest ionization energy because its 2 electrons are closest to the nucleus in a full 1s shell with maximum effective nuclear charge and minimal shielding.",
            hintLadder: [
              "Ionization energy increases across a period (left to right) and decreases down a group.",
              "Helium is at the very top right of the periodic table.",
              "Helium's full 1s² duet experiences extreme electrostatic nuclear attraction."
            ],
            misconceptionAlerts: [
              { trigger: "Fluorine (F)", note: "Fluorine has the highest electronegativity, but Helium has the highest first ionization energy." }
            ],
            skillId: "skill-chm-atomic-structure",
            difficulty: "medium"
          },
          {
            id: "q-chm-3",
            type: "multiple_choice",
            questionText: "Across Period 3 from Sodium (Na) to Argon (Ar), what happens to the atomic radius of neutral atoms?",
            options: [
              "Atomic radius decreases due to increasing nuclear charge pulling electrons closer.",
              "Atomic radius increases because more electron shells are added.",
              "Atomic radius remains constant because all elements have 3 shells.",
              "Atomic radius fluctuates randomly with no periodic trend."
            ],
            correctAnswer: "Atomic radius decreases due to increasing nuclear charge pulling electrons closer.",
            explanation: "Across a period, electrons are added to the same energy level (n=3) while protons in the nucleus increase from +11 to +18, pulling the electron cloud tighter.",
            hintLadder: [
              "Look at what happens to proton count across period 3 (increases from 11 to 18).",
              "The number of shells remains constant (n=3).",
              "Greater nuclear charge draws electrons inwards, decreasing atomic radius."
            ],
            misconceptionAlerts: [
              { trigger: "Atomic radius increases because more electron shells are added.", note: "New shells are added down a GROUP, not across a period." }
            ],
            skillId: "skill-chm-atomic-structure",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-stoichiometry",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "The Mole Concept, Stoichiometry & Chemical Equations",
    code: "CHM-UNIT-02",
    description: "Avogadro's constant, molar mass, empirical and molecular formulas, balancing chemical equations, molar volume of gases at STP (22.4 dm³), and percentage yield.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-chm-mole-stoichiometry",
        unitId: "unit-chm-stoichiometry",
        title: "Mole Calculations & Quantitative Reactions",
        code: "SKL-CHM-202",
        summary: "Calculations connecting mass, moles n = m / M, concentration C = n / V, and stoichiometric ratios.",
        objectives: [
          "Calculate molar mass from relative atomic masses",
          "Convert between mass, moles, and number of particles (6.022 × 10²³)",
          "Determine limiting reactants and theoretical yields"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-chm-mole-1",
            type: "multiple_choice",
            questionText: "How many moles of carbon dioxide (CO₂) are present in 88 grams of the gas? (Given C = 12, O = 16)",
            mathExpression: "n = \\frac{\\text{mass}}{\\text{Molar Mass}}",
            options: ["2.0 \\text{ moles}", "4.0 \\text{ moles}", "1.5 \\text{ moles}", "0.5 \\text{ moles}"],
            correctAnswer: "2.0 \\text{ moles}",
            explanation: "Molar mass of CO₂ = 12 + 2(16) = 12 + 32 = 44 g/mol. Moles n = 88 g / 44 g/mol = 2.0 moles.",
            hintLadder: [
              "Calculate molar mass of CO₂: 12 + (2 × 16) = 44 g/mol.",
              "Use formula n = mass / molar mass.",
              "88 / 44 = 2.0 moles."
            ],
            misconceptionAlerts: [
              { trigger: "4.0 \\text{ moles}", note: "Did you divide 88 by 22 instead of the molar mass 44?" }
            ],
            skillId: "skill-chm-mole-stoichiometry",
            difficulty: "easy"
          },
          {
            id: "q-chm-mole-2",
            type: "multiple_choice",
            questionText: "What volume does 0.50 moles of oxygen gas (O₂) occupy at Standard Temperature and Pressure (STP)? (Molar volume at STP = 22.4 dm³/mol)",
            mathExpression: "V = n \\times V_m",
            options: ["11.2 \\text{ dm}^3", "22.4 \\text{ dm}^3", "44.8 \\text{ dm}^3", "5.6 \\text{ dm}^3"],
            correctAnswer: "11.2 \\text{ dm}^3",
            explanation: "V = n × V_m = 0.50 mol × 22.4 dm³/mol = 11.2 dm³ (or liters).",
            hintLadder: [
              "Multiply moles by molar volume at STP.",
              "0.50 × 22.4 = 11.2 dm³.",
              "Select 11.2 dm³."
            ],
            misconceptionAlerts: [
              { trigger: "22.4 \\text{ dm}^3", note: "22.4 dm³ is the volume occupied by 1.0 full mole, not 0.50 moles." }
            ],
            skillId: "skill-chm-mole-stoichiometry",
            difficulty: "easy"
          },
          {
            id: "q-chm-mole-3",
            type: "multiple_choice",
            questionText: "In the combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O, how many moles of O₂ are required to react completely with 3.0 moles of CH₄?",
            options: ["6.0 \\text{ moles}", "3.0 \\text{ moles}", "1.5 \\text{ moles}", "12.0 \\text{ moles}"],
            correctAnswer: "6.0 \\text{ moles}",
            explanation: "The stoichiometric mole ratio of CH₄ to O₂ is 1 : 2. Therefore, 3.0 moles of CH₄ require 3.0 × 2 = 6.0 moles of O₂.",
            hintLadder: [
              "Look at the stoichiometric coefficients in the balanced equation.",
              "1 mole of CH₄ requires 2 moles of O₂.",
              "3.0 × 2 = 6.0 moles of O₂."
            ],
            misconceptionAlerts: [
              { trigger: "3.0 \\text{ moles}", note: "Did you assume a 1:1 ratio? Look at the coefficient 2 in front of O₂." }
            ],
            skillId: "skill-chm-mole-stoichiometry",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-acids-bases",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Acids, Bases, Salts & Quantitative Volumetric Analysis",
    code: "CHM-UNIT-03",
    description: "Arrhenius and Brønsted-Lowry acid-base theories, pH scale, acid-base titrations, standard solutions, indicators, and salt hydrolysis.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-chm-ph-titrations",
        unitId: "unit-chm-acids-bases",
        title: "pH Calculations & Volumetric Titrations",
        code: "SKL-CHM-203",
        summary: "Calculating pH = -log[H⁺], pOH, and analyzing titration endpoints with C_A V_A / C_B V_B = n_A / n_B.",
        objectives: [
          "Calculate pH for strong acids and strong bases from molar concentrations",
          "Apply the titration formula (C_A V_A) / (C_B V_B) = n_A / n_B",
          "Select appropriate indicators (phenolphthalein, methyl orange) based on titration curves"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-chm-ph-1",
            type: "multiple_choice",
            questionText: "What is the pH of a 0.001 M (10⁻³ M) aqueous solution of hydrochloric acid (HCl)?",
            mathExpression: "\\text{pH} = -\\log_{10}[\\text{H}^+]",
            options: ["3.0", "1.0", "11.0", "0.001"],
            correctAnswer: "3.0",
            explanation: "HCl completely dissociates: [H⁺] = 0.001 M = 10⁻³ M. pH = -log₁₀(10⁻³) = 3.0.",
            hintLadder: [
              "Use pH formula: pH = -log₁₀[H⁺].",
              "[H⁺] = 0.001 = 10⁻³.",
              "-log₁₀(10⁻³) = 3."
            ],
            misconceptionAlerts: [
              { trigger: "11.0", note: "11 is the pOH (14 - 3), not the pH." }
            ],
            skillId: "skill-chm-ph-titrations",
            difficulty: "easy"
          },
          {
            id: "q-chm-ph-2",
            type: "multiple_choice",
            questionText: "In a titration, 25.0 cm³ of 0.10 M NaOH is neutralized by 20.0 cm³ of an unknown HCl solution (HCl + NaOH → NaCl + H₂O). What is the molarity of the HCl solution?",
            mathExpression: "C_A V_A = C_B V_B",
            options: ["0.125 \\text{ M}", "0.080 \\text{ M}", "0.250 \\text{ M}", "0.100 \\text{ M}"],
            correctAnswer: "0.125 \\text{ M}",
            explanation: "Mole ratio is 1:1. C_A × V_A = C_B × V_B => C_A × 20.0 = 0.10 × 25.0 => 20.0 C_A = 2.50 => C_A = 0.125 M.",
            hintLadder: [
              "Apply C_A × V_A = C_B × V_B for 1:1 neutralization.",
              "C_A × 20.0 = 0.10 × 25.0 = 2.5.",
              "C_A = 2.5 / 20.0 = 0.125 M."
            ],
            misconceptionAlerts: [
              { trigger: "0.080 \\text{ M}", note: "Did you divide 20 by 250 instead of 2.5 by 20?" }
            ],
            skillId: "skill-chm-ph-titrations",
            difficulty: "medium"
          },
          {
            id: "q-chm-ph-3",
            type: "multiple_choice",
            questionText: "Which indicator is most suitable for detecting the endpoint in a titration of a Strong Acid (e.g. HCl) with a Weak Base (e.g. NH₄OH)?",
            options: ["Methyl Orange (pH 3.1 - 4.4)", "Phenolphthalein (pH 8.3 - 10.0)", "Universal Indicator", "Litmus Paper"],
            correctAnswer: "Methyl Orange (pH 3.1 - 4.4)",
            explanation: "Titration of a strong acid with a weak base results in an acidic salt hydrolysis endpoint (pH < 7). Methyl orange changes color in the acidic pH range (3.1 to 4.4).",
            hintLadder: [
              "Determine the pH at the equivalence point: strong acid + weak base = acidic solution (pH < 7).",
              "Choose the indicator that changes color in the acidic range.",
              "Methyl Orange transitions at pH 3.1 - 4.4."
            ],
            misconceptionAlerts: [
              { trigger: "Phenolphthalein (pH 8.3 - 10.0)", note: "Phenolphthalein is suitable for Weak Acid vs Strong Base titrations (alkaline endpoint)." }
            ],
            skillId: "skill-chm-ph-titrations",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-bonding-redox",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Chemical Bonding, Oxidation States & Redox Reactions",
    code: "CHM-UNIT-04",
    description: "Ionic vs covalent bonding, Lewis structures, oxidation numbers, oxidizing vs reducing agents, and balancing redox half-equations.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-chm-redox",
        unitId: "unit-chm-bonding-redox",
        title: "Oxidation Numbers & Redox Half-Equations",
        code: "SKL-CHM-204",
        summary: "Determining oxidation states and identifying oxidation (loss of electrons / increase in oxidation number) vs reduction.",
        objectives: [
          "Determine oxidation states of transition metals in complex oxyanions (e.g., KMnO₄, K₂Cr₂O₇)",
          "Identify oxidizing and reducing agents in chemical equations",
          "Balance redox half-equations in acidic and basic media"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-chm-redox-1",
            type: "multiple_choice",
            questionText: "What is the oxidation state of Manganese (Mn) in the permanganate ion, \\text{MnO}_4^-?",
            mathExpression: "\\text{Oxidation Number of Mn in } \\text{MnO}_4^-",
            options: ["+7", "+4", "+2", "+6"],
            correctAnswer: "+7",
            explanation: "Let oxidation state of Mn = x. Oxygen is -2. Sum of oxidation numbers = overall ion charge (-1): x + 4(-2) = -1 => x - 8 = -1 => x = +7.",
            hintLadder: [
              "Set up equation: Mn + 4(O) = -1.",
              "Oxygen oxidation state = -2, so 4 × (-2) = -8.",
              "x - 8 = -1 => x = +7."
            ],
            misconceptionAlerts: [
              { trigger: "+4", note: "+4 is the oxidation state in manganese dioxide (MnO₂), not permanganate (MnO₄⁻)." }
            ],
            skillId: "skill-chm-redox",
            difficulty: "medium"
          },
          {
            id: "q-chm-redox-2",
            type: "multiple_choice",
            questionText: "In the reaction: \\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}, which species is acting as the REDUCING AGENT?",
            options: ["\\text{Zn} (metallic zinc)", "\\text{Cu}^{2+} \\text{ ion}", "\\text{Zn}^{2+} \\text{ ion}", "\\text{Cu} (metallic copper)"],
            correctAnswer: "\\text{Zn} (metallic zinc)",
            explanation: "Zinc loses 2 electrons (oxidation: Zn → Zn²⁺ + 2e⁻) and thereby reduces copper ions (Cu²⁺ + 2e⁻ → Cu). The species that gets oxidized is the reducing agent.",
            hintLadder: [
              "OIL RIG: Oxidation Is Loss of electrons; Reduction Is Gain.",
              "Zn changes from 0 to +2 (loses electrons -> oxidized).",
              "The substance that is oxidized acts as the reducing agent. Select Zn."
            ],
            misconceptionAlerts: [
              { trigger: "\\text{Cu}^{2+} \\text{ ion}", note: "Cu²⁺ gains electrons (reduced) and is the OXIDIZING agent, not reducing agent." }
            ],
            skillId: "skill-chm-redox",
            difficulty: "easy"
          },
          {
            id: "q-chm-redox-3",
            type: "multiple_choice",
            questionText: "Which of the following bonds involves the electrostatic attraction between oppositely charged cations and anions formed by complete electron transfer?",
            options: ["Ionic Bond", "Covalent Bond", "Metallic Bond", "Hydrogen Bond"],
            correctAnswer: "Ionic Bond",
            explanation: "An ionic bond is formed when one or more valence electrons are transferred from a metal (forming a positive cation) to a non-metal (forming a negative anion), held together by electrostatic forces.",
            hintLadder: [
              "Look for the bonding type with complete electron transfer between ions.",
              "Cations (+) and anions (-) form ionic bonds.",
              "Select 'Ionic Bond'."
            ],
            misconceptionAlerts: [
              { trigger: "Covalent Bond", note: "Covalent bonds involve the SHARING of electron pairs between non-metal atoms." }
            ],
            skillId: "skill-chm-redox",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-bonding-geometry",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Chemical Bonding, VSEPR Geometry & Intermolecular Forces",
    code: "CHM-UNIT-04",
    description: "Ionic, covalent, coordinate (dative) bonding, valence shell electron pair repulsion (VSEPR) shapes, and hydrogen bonding intermolecular dynamics.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-chm-bonding-vsepr-intermolecular",
        unitId: "unit-chm-bonding-geometry",
        title: "VSEPR Molecular Shapes, Bond Angles & Hydrogen Bonding",
        code: "SKL-CHM-301",
        summary: "Predicting molecular geometries from electron pairs and explaining anomalous boiling points from intermolecular hydrogen bonds.",
        objectives: [
          "Deduce molecular geometry and bond angles of simple molecules (linear, trigonal planar, tetrahedral, pyramidal, bent) using VSEPR theory",
          "Explain the origin and properties of coordinate covalent (dative) bonds in ammonium (NH₄⁺) and hydronium (H₃O⁺) ions",
          "Account for anomalous physical properties of water (high boiling point, surface tension) via intermolecular hydrogen bonding"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-chm-atomic-structure"],
        questions: [
          {
            id: "q-chm-bnd-1",
            type: "multiple_choice",
            questionText: "According to Valence Shell Electron Pair Repulsion (VSEPR) theory, what is the geometric molecular shape and approximate bond angle of an ammonia (NH₃) molecule?",
            options: [
              "Trigonal pyramidal (~107°)",
              "Tetrahedral (109.5°)",
              "Trigonal planar (120°)",
              "T-shaped (~90°)"
            ],
            correctAnswer: "Trigonal pyramidal (~107°)",
            explanation: "Nitrogen has 5 valence electrons: 3 are shared with hydrogens (bonding pairs) and 1 non-bonding lone pair remains. The 4 electron pairs adopt a tetrahedral arrangement, but the repulsive force of the lone pair compresses the H-N-H bond angles to approximately 107°, creating a trigonal pyramidal shape.",
            hintLadder: [
              "Count valence electrons on nitrogen: 5.",
              "Three electrons bond with 3 hydrogen atoms, leaving 1 non-bonding lone pair (4 electron domains total).",
              "Lone pair-bonding pair repulsion compresses tetrahedral 109.5° angle down to ~107° in a trigonal pyramidal shape."
            ],
            misconceptionAlerts: [
              { trigger: "Tetrahedral (109.5°)", note: "The electron domain geometry is tetrahedral, but the MOLECULAR shape observed for atoms is trigonal pyramidal." },
              { trigger: "Trigonal planar (120°)", note: "Trigonal planar applies to molecules with 3 bonding pairs and zero lone pairs, such as BF₃." }
            ],
            skillId: "skill-chm-bonding-vsepr-intermolecular",
            difficulty: "medium"
          },
          {
            id: "q-chm-bnd-2",
            type: "multiple_choice",
            questionText: "Water (H₂O, molar mass 18 g/mol) boils at 100°C, whereas hydrogen sulfide (H₂S, molar mass 34 g/mol) boils at -60°C. What primary factor accounts for this dramatic disparity?",
            options: [
              "Intermolecular hydrogen bonding between highly electronegative oxygen atoms and hydrogen atoms in adjacent water molecules.",
              "H₂O forms stronger intramolecular covalent bonds than H₂S.",
              "Water has a significantly lower molar mass than hydrogen sulfide.",
              "H₂S experiences stronger London dispersion forces than water."
            ],
            correctAnswer: "Intermolecular hydrogen bonding between highly electronegative oxygen atoms and hydrogen atoms in adjacent water molecules.",
            explanation: "Oxygen is highly electronegative and small, creating strong polar O-H bonds that form an extensive three-dimensional network of intermolecular hydrogen bonds in water. These require substantial thermal energy to disrupt, elevating the boiling point far above H₂S, which lacks hydrogen bonding.",
            hintLadder: [
              "Boiling points reflect the strength of INTERMOLECULAR forces holding molecules together in liquid phase.",
              "Oxygen is strongly electronegative, creating hydrogen bonds with neighboring H₂O molecules.",
              "Sulfur is less electronegative and larger, so H₂S cannot form strong hydrogen bonds."
            ],
            misconceptionAlerts: [
              { trigger: "H₂O forms stronger intramolecular covalent bonds than H₂S.", note: "Boiling does not break intramolecular covalent bonds within a molecule; it breaks intermolecular forces between molecules!" }
            ],
            skillId: "skill-chm-bonding-vsepr-intermolecular",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-energetics-thermochemistry",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Thermochemistry, Enthalpy Profiles & Hess's Law",
    code: "CHM-UNIT-05",
    description: "Exothermic and endothermic reactions, standard enthalpy of formation, Hess's Law cycles, bond dissociation energies, and calorimetry calculations.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-chm-enthalpy-hess-calorimetry",
        unitId: "unit-chm-energetics-thermochemistry",
        title: "Enthalpy Profiles, Hess's Law Cycles & Activation Energy",
        code: "SKL-CHM-302",
        summary: "Interpreting reaction coordinate diagrams, calculating ΔH° using Hess's Law, and applying bond enthalpies.",
        objectives: [
          "Construct and interpret energy profile diagrams for exothermic (ΔH < 0) and endothermic (ΔH > 0) processes",
          "Apply Hess's Law of constant heat summation: ΔH°_rxn = Σ ΔH°_f(products) - Σ ΔH°_f(reactants)",
          "Explain the role of a positive catalyst in lowering activation energy Ea without changing overall reaction enthalpy ΔH"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-chm-mole-stoichiometry"],
        questions: [
          {
            id: "q-chm-nrg-1",
            type: "multiple_choice",
            questionText: "Calculate the standard enthalpy of combustion (ΔH°_rxn) for the complete combustion of methane:\nCH₄(g) + 2O₂(g) -> CO₂(g) + 2H₂O(l)\nGiven standard enthalpies of formation:\nΔH°_f [CH₄(g)] = -75 kJ/mol\nΔH°_f [CO₂(g)] = -394 kJ/mol\nΔH°_f [H₂O(l)] = -286 kJ/mol\n(ΔH°_f [O₂(g)] = 0 kJ/mol)",
            mathExpression: "\\Delta H^\\circ = [\\Delta H_f(CO_2) + 2\\Delta H_f(H_2O)] - [\\Delta H_f(CH_4)]",
            options: ["-891 kJ/mol", "+891 kJ/mol", "-605 kJ/mol", "-966 kJ/mol"],
            correctAnswer: "-891 kJ/mol",
            explanation: "Products = (-394) + 2(-286) = -394 - 572 = -966 kJ/mol. Reactants = -75 + 2(0) = -75 kJ/mol. ΔH° = Σ Products - Σ Reactants = (-966) - (-75) = -966 + 75 = -891 kJ/mol.",
            hintLadder: [
              "Formula: ΔH°_rxn = Σ ΔH°_f(products) - Σ ΔH°_f(reactants).",
              "Sum products: (-394) + 2(-286) = -394 - 572 = -966 kJ/mol.",
              "Subtract reactants: -966 - (-75) = -966 + 75 = -891 kJ/mol."
            ],
            misconceptionAlerts: [
              { trigger: "-605 kJ/mol", note: "Did you forget to multiply the ΔH°_f of H₂O by its stoichiometric coefficient of 2?" },
              { trigger: "+891 kJ/mol", note: "Combustion is highly exothermic; ΔH° must be negative, not positive." }
            ],
            skillId: "skill-chm-enthalpy-hess-calorimetry",
            difficulty: "medium"
          },
          {
            id: "q-chm-nrg-2",
            type: "multiple_choice",
            questionText: "In an exothermic reaction profile diagram, which statement correctly describes the energy levels and the impact of adding a suitable chemical catalyst?",
            options: [
              "Products are at a lower energy level than reactants (ΔH < 0); the catalyst lowers the activation energy Ea without altering ΔH.",
              "Products are at a higher energy level than reactants (ΔH > 0); the catalyst increases the activation energy.",
              "Reactants and products have identical energy levels; the catalyst makes ΔH more negative.",
              "Products are at a lower energy level; the catalyst lowers both activation energy Ea and makes ΔH significantly more negative."
            ],
            correctAnswer: "Products are at a lower energy level than reactants (ΔH < 0); the catalyst lowers the activation energy Ea without altering ΔH.",
            explanation: "In exothermic reactions, heat is released so products lie lower than reactants (ΔH < 0). A catalyst provides an alternative reaction pathway with a lower activation energy barrier (Ea), but leaves the initial and final thermodynamic states (ΔH) completely unchanged.",
            hintLadder: [
              "Exothermic means energy is released: product energy < reactant energy (ΔH < 0).",
              "A catalyst accelerates rate by lowering activation energy Ea.",
              "A catalyst cannot change thermodynamics: ΔH remains strictly identical."
            ],
            misconceptionAlerts: [
              { trigger: "Products are at a lower energy level; the catalyst lowers both activation energy Ea and makes ΔH significantly more negative.", note: "Catalysts do not alter thermodynamic enthalpy changes (ΔH); they only modify kinetic activation energy (Ea)." }
            ],
            skillId: "skill-chm-enthalpy-hess-calorimetry",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-kinetics-equilibrium",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Chemical Kinetics, Equilibrium Constants & Le Chatelier's Principle",
    code: "CHM-UNIT-06",
    description: "Collision theory, factors altering reaction rate, dynamic reversible equilibria, equilibrium constant Kc expressions, and Le Chatelier shifts.",
    order: 6,
    category: "core",
    skills: [
      {
        id: "skill-chm-collision-theory-le-chatelier",
        unitId: "unit-chm-kinetics-equilibrium",
        title: "Dynamic Equilibrium, Kc Expressions & Le Chatelier's Principle",
        code: "SKL-CHM-303",
        summary: "Formulating Kc expressions, applying collision theory to rate factors, and predicting equilibrium shifts under temperature/pressure stresses.",
        objectives: [
          "Formulate equilibrium constant expressions Kc for homogeneous gas and aqueous equilibria",
          "Apply Le Chatelier's principle to predict shifts in equilibrium position when temperature, pressure, or concentration changes",
          "Explain why dynamic equilibrium implies equal rates of forward and reverse reactions with constant concentrations"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-chm-mole-stoichiometry"],
        questions: [
          {
            id: "q-chm-kin-1",
            type: "multiple_choice",
            questionText: "Consider the industrial Haber-Bosch synthesis of ammonia:\nN₂(g) + 3H₂(g) <=> 2NH₃(g)   ΔH = -92 kJ/mol\nAccording to Le Chatelier's Principle, how will an increase in system temperature at constant volume affect the equilibrium position and the yield of NH₃?",
            options: [
              "The equilibrium shifts in the endothermic reverse direction (to the left), decreasing the yield of NH₃.",
              "The equilibrium shifts in the forward direction (to the right), increasing the yield of NH₃.",
              "The equilibrium position remains unchanged because temperature only affects reaction rate.",
              "The yield of NH₃ increases because higher temperature always shifts reactions forward."
            ],
            correctAnswer: "The equilibrium shifts in the endothermic reverse direction (to the left), decreasing the yield of NH₃.",
            explanation: "The forward reaction is exothermic (releases heat, ΔH = -92 kJ/mol). When heat is added by increasing temperature, Le Chatelier's principle dictates that the system will absorb excess heat by favoring the endothermic reverse reaction, thereby shifting left and reducing ammonia yield.",
            hintLadder: [
              "Notice the sign of ΔH: negative (-92 kJ/mol), meaning the forward reaction releases heat (exothermic).",
              "Increasing temperature adds heat to the system.",
              "The system responds by shifting in the heat-absorbing (endothermic, reverse) direction to the left, decreasing NH₃."
            ],
            misconceptionAlerts: [
              { trigger: "The equilibrium shifts in the forward direction (to the right), increasing the yield of NH₃.", note: "Adding heat to an exothermic forward reaction shifts it backward, not forward!" }
            ],
            skillId: "skill-chm-collision-theory-le-chatelier",
            difficulty: "medium"
          },
          {
            id: "q-chm-kin-2",
            type: "multiple_choice",
            questionText: "What is the correct equilibrium constant expression (Kc) for the contact process stage:\n2SO₂(g) + O₂(g) <=> 2SO₃(g)?",
            mathExpression: "K_c = \\frac{[\\text{Products}]^{\\text{coefficients}}}{[\\text{Reactants}]^{\\text{coefficients}}}",
            options: [
              "K_c = \\frac{[SO_3]^2}{[SO_2]^2 [O_2]}",
              "K_c = \\frac{[SO_2]^2 [O_2]}{[SO_3]^2}",
              "K_c = \\frac{2[SO_3]}{2[SO_2] + [O_2]}",
              "K_c = \\frac{[SO_3]}{[SO_2][O_2]}"
            ],
            correctAnswer: "K_c = \\frac{[SO_3]^2}{[SO_2]^2 [O_2]}",
            explanation: "Kc is the ratio of product concentrations raised to their stoichiometric coefficients over reactant concentrations raised to their stoichiometric coefficients: [SO₃]² / ([SO₂]² × [O₂]).",
            hintLadder: [
              "Products go in the numerator, reactants go in the denominator.",
              "Stoichiometric coefficients become powers/exponents (not multipliers).",
              "Numerator is [SO₃]²; denominator is [SO₂]² × [O₂]."
            ],
            misconceptionAlerts: [
              { trigger: "K_c = \\frac{[SO_2]^2 [O_2]}{[SO_3]^2}", note: "This is the inverted reciprocal (1/Kc). Products must be in the numerator." }
            ],
            skillId: "skill-chm-collision-theory-le-chatelier",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-chm-organic-chemistry",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    title: "Organic Chemistry, IUPAC Nomenclature & Functional Groups",
    code: "CHM-UNIT-07",
    description: "Alkanes, alkenes, alkynes, functional groups (alcohols, carboxylic acids, esters), IUPAC systematic naming, structural isomerism, and organic reactions.",
    order: 7,
    category: "core",
    skills: [
      {
        id: "skill-chm-hydrocarbons-functional-groups",
        unitId: "unit-chm-organic-chemistry",
        title: "IUPAC Nomenclature, Structural Isomerism & Chemical Tests",
        code: "SKL-CHM-304",
        summary: "Applying IUPAC rules to branched hydrocarbons and functional groups, identifying isomers, and performing chemical differentiation tests.",
        objectives: [
          "Apply systematic IUPAC nomenclature rules to identify branched alkanes, alkenes, and aliphatic alcohols",
          "Distinguish chain, positional, and functional group structural isomers",
          "Identify distinguishing chemical tests such as bromine water decolourization for unsaturated double bonds"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-chm-atomic-structure"],
        questions: [
          {
            id: "q-chm-org-1",
            type: "multiple_choice",
            questionText: "What is the systematic IUPAC name for the organic compound with the structural formula:\nCH₃ - CH(CH₃) - CH₂ - CH₂ - OH?",
            options: [
              "3-methylbutan-1-ol",
              "2-methylbutan-4-ol",
              "Isoamyl alcohol",
              "3-methylpentanol"
            ],
            correctAnswer: "3-methylbutan-1-ol",
            explanation: "The longest continuous carbon chain containing the principal functional group (-OH) has 4 carbon atoms (butan-). Numbering starts from the carbon bearing the -OH group (C1). The methyl substituent is attached at C3. Hence: 3-methylbutan-1-ol.",
            hintLadder: [
              "Identify the principal functional group: alcohol (-OH), suffix '-ol'.",
              "Find the longest carbon chain containing the -OH: 4 carbons (butan-).",
              "Number from the end nearest the -OH group: C1 has -OH, C3 has the -CH₃ methyl group -> 3-methylbutan-1-ol."
            ],
            misconceptionAlerts: [
              { trigger: "2-methylbutan-4-ol", note: "Numbering must give the lowest locant to the principal functional group (-OH at C1, not C4)." }
            ],
            skillId: "skill-chm-hydrocarbons-functional-groups",
            difficulty: "medium"
          },
          {
            id: "q-chm-org-2",
            type: "multiple_choice",
            questionText: "Which rapid chemical test reliably distinguishes an unsaturated hydrocarbon like ethene (CH₂=CH₂) from a saturated hydrocarbon like ethane (CH₃-CH₃) in the laboratory without sunlight?",
            options: [
              "Bromine water (aqueous Br₂): ethene decolourizes reddish-brown bromine water rapidly, whereas ethane does not.",
              "Litmus paper: ethene turns blue litmus red while ethane has no effect.",
              "Tollens' reagent: ethane forms a silver mirror while ethene does not.",
              "Addition of dilute hydrochloric acid (HCl) to precipitate elemental carbon."
            ],
            correctAnswer: "Bromine water (aqueous Br₂): ethene decolourizes reddish-brown bromine water rapidly, whereas ethane does not.",
            explanation: "Ethene contains a carbon-carbon double bond (C=C) which readily undergoes electrophilic addition with aqueous bromine, forming colorless 1,2-dibromoethane and rapidly decolourizing the reddish-brown solution. Ethane (saturated) cannot react by addition.",
            hintLadder: [
              "Alkenes possess reactive pi bonds that undergo electrophilic addition reactions.",
              "Bromine water is reddish-brown.",
              "Addition across the C=C double bond consumes Br₂, turning the solution colorless immediately."
            ],
            misconceptionAlerts: [
              { trigger: "Litmus paper: ethene turns blue litmus red while ethane has no effect.", note: "Neutral hydrocarbons do not dissociate to form H⁺ ions and have no effect on litmus." }
            ],
            skillId: "skill-chm-hydrocarbons-functional-groups",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

export const SCIENCE_BIOLOGY_UNITS: Unit[] = [
  {
    id: "unit-bio-cell-genetics",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Cellular Architecture, Mitosis & Mendelian Genetics",
    code: "BIO-UNIT-01",
    description: "Plant vs animal cell ultrastructure, enzyme kinetics, DNA structure, chromosomes, monohybrid crosses, and sex linkage.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-bio-cell-structure",
        unitId: "unit-bio-cell-genetics",
        title: "Cell Organelles & Membrane Transport",
        code: "SKL-BIO-201",
        summary: "Analyzing organelle functions (mitochondria, ribosomes, Golgi, chloroplasts) and transport mechanisms (diffusion, osmosis, active transport).",
        objectives: [
          "Distinguish prokaryotic vs eukaryotic cellular organizations",
          "Identify organelle roles in ATP synthesis and protein modification",
          "Differentiate passive diffusion/osmosis from ATP-driven active transport"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-bio-cell-1",
            type: "multiple_choice",
            questionText: "Which cellular organelle is the primary site of aerobic cellular respiration and ATP generation in eukaryotic cells?",
            options: ["Mitochondria", "Ribosome", "Endoplasmic Reticulum", "Lysosome"],
            correctAnswer: "Mitochondria",
            explanation: "Mitochondria generate the vast majority of cellular ATP via the Krebs cycle and oxidative phosphorylation on their folded cristae inner membrane.",
            hintLadder: [
              "Known as the 'powerhouse of the cell'.",
              "Performs aerobic respiration to produce ATP.",
              "Select 'Mitochondria'."
            ],
            misconceptionAlerts: [
              { trigger: "Ribosome", note: "Ribosomes are responsible for protein translation, not cellular respiration." }
            ],
            skillId: "skill-bio-cell-structure",
            difficulty: "easy"
          },
          {
            id: "q-bio-cell-2",
            type: "multiple_choice",
            questionText: "When red blood cells are placed into a HYPOTONIC solution (distilled water), what occurs as a result of Osmosis?",
            options: [
              "Water enters the cells causing them to swell and burst (lysis).",
              "Water exits the cells causing them to shrink and crenate.",
              "Solute ions flow outward until the cell becomes hypertonic.",
              "The cell membrane becomes impermeable with no net water flow."
            ],
            correctAnswer: "Water enters the cells causing them to swell and burst (lysis).",
            explanation: "In a hypotonic solution, the external water potential is higher than inside the cell. Water rushes inward down the water potential gradient by osmosis, causing animal cells (lacking cell walls) to swell and lyse.",
            hintLadder: [
              "Distilled water has zero solutes (higher water potential).",
              "Water moves from high water potential to low water potential (into the cell).",
              "Without a rigid cell wall, red blood cells swell and burst."
            ],
            misconceptionAlerts: [
              { trigger: "Water exits the cells causing them to shrink and crenate.", note: "Crenation occurs when placed in a HYPERTONIC concentrated solution, not hypotonic." }
            ],
            skillId: "skill-bio-cell-structure",
            difficulty: "medium"
          },
          {
            id: "q-bio-cell-3",
            type: "multiple_choice",
            questionText: "What key structural feature is present in plant cells that is completely ABSENT in animal cells?",
            options: ["Cellulose Cell Wall & Large Central Vacuole", "Mitochondria & Nucleus", "Cell Membrane & Cytoplasm", "Endoplasmic Reticulum"],
            correctAnswer: "Cellulose Cell Wall & Large Central Vacuole",
            explanation: "Plant cells possess a rigid cellulose cell wall, chloroplasts for photosynthesis, and a permanent large central vacuole, none of which exist in animal cells.",
            hintLadder: [
              "Think about the rigid exterior layer that gives plants structural support.",
              "Plants have a cellulose wall and permanent vacuole.",
              "Select 'Cellulose Cell Wall & Large Central Vacuole'."
            ],
            misconceptionAlerts: [
              { trigger: "Mitochondria & Nucleus", note: "Both plant and animal cells are eukaryotes and contain mitochondria and nuclei." }
            ],
            skillId: "skill-bio-cell-structure",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-bio-genetics",
        unitId: "unit-bio-cell-genetics",
        title: "Monohybrid Inheritance & Punnett Squares",
        code: "SKL-BIO-202",
        summary: "Predicting genotype and phenotype ratios using Mendel's law of segregation and sex-linked traits.",
        objectives: [
          "Differentiate homozygous vs heterozygous alleles and dominant vs recessive traits",
          "Construct Punnett squares for monohybrid crosses (3:1 phenotypic ratio)",
          "Analyze co-dominance and ABO blood group genetics"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-bio-gen-1",
            type: "multiple_choice",
            questionText: "In pea plants, tallness (T) is dominant over dwarfness (t). What is the expected phenotypic ratio of offspring from a cross between two heterozygous tall plants (Tt × Tt)?",
            mathExpression: "Tt \\times Tt \\implies 1\\,TT : 2\\,Tt : 1\\,tt",
            options: ["3 Tall : 1 Dwarf", "1 Tall : 1 Dwarf", "All Tall", "2 Tall : 2 Dwarf"],
            correctAnswer: "3 Tall : 1 Dwarf",
            explanation: "Cross Tt × Tt gives genotypes: 1 TT, 2 Tt, 1 tt. TT and Tt are tall (3 parts), and tt is dwarf (1 part). Phenotypic ratio = 3 Tall : 1 Dwarf.",
            hintLadder: [
              "Draw a 2x2 Punnett square with gametes T and t on both sides.",
              "Boxes contain: TT, Tt, Tt, tt.",
              "Since T is dominant, TT, Tt, and Tt express tall phenotype (3). tt expresses dwarf (1)."
            ],
            misconceptionAlerts: [
              { trigger: "1 Tall : 1 Dwarf", note: "1:1 ratio occurs when crossing heterozygous (Tt) with homozygous recessive (tt), not Tt × Tt." }
            ],
            skillId: "skill-bio-genetics",
            difficulty: "easy"
          },
          {
            id: "q-bio-gen-2",
            type: "multiple_choice",
            questionText: "A mother with blood group AB (I^A I^B) and a father with blood group O (i i) have children. Which of the following blood groups is IMPOSSIBLE for their biological children to have?",
            options: ["Blood Group O", "Blood Group A", "Blood Group B", "Both A and B are possible"],
            correctAnswer: "Blood Group O",
            explanation: "The mother can only pass allele I^A or I^B. The father passes allele i. Offspring can only be I^A i (Group A) or I^B i (Group B). It is genetically impossible for a child to have genotype i i (Group O).",
            hintLadder: [
              "Mother's alleles: I^A and I^B. Father's alleles: i and i.",
              "Possible child genotypes: I^A i (Group A) or I^B i (Group B).",
              "Group O requires two 'i' alleles, so Group O is impossible."
            ],
            misconceptionAlerts: [
              { trigger: "Blood Group A", note: "Group A is possible when mother passes I^A and father passes i." }
            ],
            skillId: "skill-bio-genetics",
            difficulty: "medium"
          },
          {
            id: "q-bio-gen-3",
            type: "multiple_choice",
            questionText: "In DNA replication, which complementary nitrogenous base pairs with Guanine (G) via three hydrogen bonds?",
            options: ["Cytosine (C)", "Thymine (T)", "Adenine (A)", "Uracil (U)"],
            correctAnswer: "Cytosine (C)",
            explanation: "According to Chargaff's base pairing rules in DNA: Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds, while Guanine (G) pairs with Cytosine (C) via 3 hydrogen bonds.",
            hintLadder: [
              "Recall Chargaff's base pairing rule: A pairs with T, and G pairs with C.",
              "Guanine forms 3 hydrogen bonds with Cytosine.",
              "Select 'Cytosine (C)'."
            ],
            misconceptionAlerts: [
              { trigger: "Thymine (T)", note: "Thymine pairs with Adenine, not Guanine." }
            ],
            skillId: "skill-bio-genetics",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-physiology",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Enzyme Kinetics, Respiration & Circulatory Dynamics",
    code: "BIO-UNIT-02",
    description: "Lock-and-key enzyme mechanisms, factors affecting enzyme rates (pH, temperature), mammalian circulatory double loop, and oxygen dissociation.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-bio-enzymes-respiration",
        unitId: "unit-bio-physiology",
        title: "Enzyme Kinetics & Aerobic/Anaerobic Respiration",
        code: "SKL-BIO-203",
        summary: "Understanding biological catalysts, active sites, denaturation, and ATP yield in glycolysis vs fermentation.",
        objectives: [
          "Explain the lock-and-key and induced-fit models of enzyme specificity",
          "Analyze rate curves for temperature and pH denaturation",
          "Compare aerobic respiration (36-38 ATP) with anaerobic lactic acid and alcoholic fermentation (2 ATP)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-bio-enz-1",
            type: "multiple_choice",
            questionText: "What happens to the structure and catalytic function of human digestive enzymes when heated beyond 60°C?",
            options: [
              "The tertiary protein structure denatures and alters the active site, irreversibly halting catalytic activity.",
              "The activation energy requirement drops to zero, accelerating the reaction exponentially.",
              "The enzyme converts into a substrate molecule.",
              "The enzyme undergoes mitosis to produce heat-resistant clones."
            ],
            correctAnswer: "The tertiary protein structure denatures and alters the active site, irreversibly halting catalytic activity.",
            explanation: "High temperatures break hydrogen and ionic bonds stabilizing the enzyme's 3D tertiary conformation. Denaturation deforms the active site so substrates can no longer bind.",
            hintLadder: [
              "Enzymes are proteins with specific 3D folded shapes.",
              "Excess heat breaks tertiary bonds, causing denaturation.",
              "Once denatured, the active site no longer fits the substrate."
            ],
            misconceptionAlerts: [
              { trigger: "The activation energy requirement drops to zero, accelerating the reaction exponentially.", note: "Enzymes lower activation energy when folded, but denatured enzymes lose all catalytic ability." }
            ],
            skillId: "skill-bio-enzymes-respiration",
            difficulty: "easy"
          },
          {
            id: "q-bio-enz-2",
            type: "multiple_choice",
            questionText: "What is the net ATP yield produced per glucose molecule during Anaerobic Glycolysis compared to complete Aerobic Respiration?",
            options: [
              "Anaerobic yields 2 ATP; Aerobic yields ~36-38 ATP.",
              "Anaerobic yields 36 ATP; Aerobic yields 2 ATP.",
              "Both pathways yield exactly 2 ATP.",
              "Anaerobic respiration yields 0 ATP."
            ],
            correctAnswer: "Anaerobic yields 2 ATP; Aerobic yields ~36-38 ATP.",
            explanation: "Glycolysis alone produces a net gain of 2 ATP per glucose under anaerobic conditions. In the presence of oxygen, oxidative phosphorylation and the citric acid cycle yield approximately 36-38 ATP.",
            hintLadder: [
              "Aerobic respiration with oxygen is far more efficient than anaerobic.",
              "Anaerobic glycolysis yields 2 net ATP.",
              "Aerobic respiration yields ~36 to 38 ATP."
            ],
            misconceptionAlerts: [
              { trigger: "Both pathways yield exactly 2 ATP.", note: "Glycolysis produces 2 ATP, but aerobic Krebs cycle and electron transport chain generate substantially more (~36 ATP)." }
            ],
            skillId: "skill-bio-enzymes-respiration",
            difficulty: "medium"
          },
          {
            id: "q-bio-enz-3",
            type: "multiple_choice",
            questionText: "In human physiology, which blood vessel carries freshly OXYGENATED blood from the lungs directly into the left atrium of the heart?",
            options: ["Pulmonary Vein", "Pulmonary Artery", "Aorta", "Vena Cava"],
            correctAnswer: "Pulmonary Vein",
            explanation: "The Pulmonary Vein is unique among adult human veins because it carries oxygen-rich blood from the alveolar capillaries of the lungs back to the left atrium.",
            hintLadder: [
              "Remember: Veins carry blood TOWARD the heart.",
              "Blood coming from the lungs has just been oxygenated.",
              "The pulmonary vein returns oxygenated blood to the left atrium."
            ],
            misconceptionAlerts: [
              { trigger: "Pulmonary Artery", note: "The Pulmonary Artery carries DEOXYGENATED blood away from the right ventricle toward the lungs." }
            ],
            skillId: "skill-bio-enzymes-respiration",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-ecology-ecosystems",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Ecology, Energy Flow & Biogeochemical Cycles",
    code: "BIO-UNIT-03",
    description: "Trophic pyramids, 10% energy transfer rule, food webs, nitrogen and carbon cycles, and symbiotic relationships (mutualism, commensalism, parasitism).",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-bio-ecology-cycles",
        unitId: "unit-bio-ecology-ecosystems",
        title: "Trophic Pyramids, Energy Flow & Biogeochemical Cycles",
        code: "SKL-BIO-204",
        summary: "Applying the 10% ecological efficiency rule and tracing nitrogen fixation and carbon sequestration.",
        objectives: [
          "Calculate energy transfer between successive trophic levels (10% rule)",
          "Identify nitrogen-fixing bacteria (Rhizobium) in root nodules and nitrifying vs denitrifying bacteria",
          "Differentiate ecological symbiotic interactions (Mutualism, Commensalism, Parasitism)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-bio-eco-1",
            type: "multiple_choice",
            questionText: "If primary producers (green plants) in an ecosystem capture 40,000 kJ of solar energy, approximately how much energy is transferred to the Secondary Consumers according to the 10% Rule?",
            options: ["400 kJ", "4,000 kJ", "40 kJ", "40,000 kJ"],
            correctAnswer: "400 kJ",
            explanation: "Producers = 40,000 kJ. Primary Consumers (Herbivores) = 10% of 40,000 = 4,000 kJ. Secondary Consumers (Carnivores) = 10% of 4,000 = 400 kJ.",
            hintLadder: [
              "Step 1: Calculate energy to primary consumers: 10% of 40,000 = 4,000 kJ.",
              "Step 2: Calculate energy from primary to secondary consumers: 10% of 4,000 = 400 kJ.",
              "Result = 400 kJ."
            ],
            misconceptionAlerts: [
              { trigger: "4,000 kJ", note: "4,000 kJ is the energy reaching PRIMARY consumers (herbivores), not secondary consumers." }
            ],
            skillId: "skill-bio-ecology-cycles",
            difficulty: "medium"
          },
          {
            id: "q-bio-eco-2",
            type: "multiple_choice",
            questionText: "Which symbiotic relationship describes a biological interaction where BOTH participating species derive mutual benefit (such as bees pollinating flowering plants)?",
            options: ["Mutualism", "Commensalism", "Parasitism", "Amensalism"],
            correctAnswer: "Mutualism",
            explanation: "Mutualism is an ecological relationship where both interacting species benefit (+/+), e.g. flowers receive pollination while bees gain nectar.",
            hintLadder: [
              "Identify the relationship where (+/+) benefits both.",
              "Mutual benefit = Mutualism.",
              "Select 'Mutualism'."
            ],
            misconceptionAlerts: [
              { trigger: "Commensalism", note: "Commensalism benefits one species while leaving the other unaffected (+/0)." }
            ],
            skillId: "skill-bio-ecology-cycles",
            difficulty: "easy"
          },
          {
            id: "q-bio-eco-3",
            type: "multiple_choice",
            questionText: "What critical role do Rhizobium bacteria in the root nodules of leguminous plants perform in the Nitrogen Cycle?",
            options: [
              "Fixing inert atmospheric nitrogen gas (N₂) into bioavailable ammonium/nitrates.",
              "Converting soil nitrates back into atmospheric nitrogen gas (denitrification).",
              "Breaking down dead organic matter into sulfur dioxide.",
              "Absorbing carbon dioxide directly from the atmosphere for photosynthesis."
            ],
            correctAnswer: "Fixing inert atmospheric nitrogen gas (N₂) into bioavailable ammonium/nitrates.",
            explanation: "Rhizobium species are symbiotic nitrogen-fixing bacteria that convert unreactive atmospheric N₂ gas into ammonia/nitrates that plants can absorb to synthesize amino acids.",
            hintLadder: [
              "Atmospheric nitrogen (N₂) cannot be directly absorbed by plants.",
              "Rhizobium converts N₂ into usable nitrates.",
              "This process is known as biological nitrogen fixation."
            ],
            misconceptionAlerts: [
              { trigger: "Converting soil nitrates back into atmospheric nitrogen gas (denitrification).", note: "Denitrification is performed by anaerobic bacteria like Pseudomonas, not Rhizobium." }
            ],
            skillId: "skill-bio-ecology-cycles",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-nutrition-digestion",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Nutrition, Photosynthetic Photolysis & Digestive Enzymes",
    code: "BIO-UNIT-04",
    description: "Light-dependent and light-independent stages of photosynthesis, chloroplast structures, human alimentary canal, and digestive enzyme kinetics.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-bio-photosynthesis-human-digestion",
        unitId: "unit-bio-nutrition-digestion",
        title: "Photosynthetic Photolysis & Alimentary Digestive Enzymes",
        code: "SKL-BIO-301",
        summary: "Analyzing chloroplast thylakoid photolysis of water and digestive enzymatic breakdown of macromolecules.",
        objectives: [
          "Explain the photochemical photolysis of water during the light reaction in thylakoid membranes",
          "Identify specific substrates, optimum pH, and end-products of salivary amylase, pepsin, trypsin, and pancreatic lipase",
          "Describe the physiological role of bile in emulsifying fats and neutralizing acidic stomach chyme"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-cell-structure"],
        questions: [
          {
            id: "q-bio-nut-1",
            type: "multiple_choice",
            questionText: "During the light-dependent reactions of photosynthesis occurring in the chloroplast thylakoids, what is the primary consequence of the photolysis of water?",
            options: [
              "Water is split into protons (H⁺), electrons (e⁻), and oxygen gas (O₂) as a byproduct.",
              "Carbon dioxide is fixed directly into 3-carbon phosphoglycerate molecules.",
              "Glucose is directly synthesized without requiring enzymes.",
              "ATP is broken down into ADP and inorganic phosphate."
            ],
            correctAnswer: "Water is split into protons (H⁺), electrons (e⁻), and oxygen gas (O₂) as a byproduct.",
            explanation: "Photolysis of water (2H₂O -> 4H⁺ + 4e⁻ + O₂) utilizes absorbed photon energy in photosystem II to replace excited electrons lost by chlorophyll, generating protons for ATP synthesis and liberating molecular oxygen as a byproduct.",
            hintLadder: [
              "'Photo' means light and 'lysis' means splitting.",
              "Water (H₂O) is split in the thylakoid lumen.",
              "The products are hydrogen ions (protons), electrons to reduce chlorophyll, and oxygen gas."
            ],
            misconceptionAlerts: [
              { trigger: "Carbon dioxide is fixed directly into 3-carbon phosphoglycerate molecules.", note: "CO₂ fixation occurs in the light-independent Calvin cycle in the stroma, not during photolysis." }
            ],
            skillId: "skill-bio-photosynthesis-human-digestion",
            difficulty: "easy"
          },
          {
            id: "q-bio-nut-2",
            type: "multiple_choice",
            questionText: "In the human digestive system, which enzyme is secreted into the stomach in an inactive zymogen form and requires an acidic pH (1.5 - 2.0) to cleave peptide bonds in proteins?",
            options: [
              "Pepsin (secreted as pepsinogen)",
              "Trypsin (secreted as trypsinogen)",
              "Salivary amylase",
              "Pancreatic lipase"
            ],
            correctAnswer: "Pepsin (secreted as pepsinogen)",
            explanation: "Gastric chief cells secrete pepsinogen, which is activated into pepsin by hydrochloric acid (HCl) in gastric juice. Pepsin functions optimally at pH 1.5 - 2.0 to hydrolyze dietary proteins into shorter polypeptides.",
            hintLadder: [
              "Look for the protein-digesting enzyme located in the stomach.",
              "Stomach gastric juice is strongly acidic due to HCl.",
              "Chief cells secrete pepsinogen, which is activated into pepsin."
            ],
            misconceptionAlerts: [
              { trigger: "Trypsin (secreted as trypsinogen)", note: "Trypsin digests proteins in the small intestine (duodenum) at an alkaline/neutral pH (~7.5 - 8.0), not the stomach." }
            ],
            skillId: "skill-bio-photosynthesis-human-digestion",
            difficulty: "easy"
          },
          {
            id: "q-bio-nut-3",
            type: "multiple_choice",
            questionText: "What is the vital physiological function of bile produced by the liver and stored in the gallbladder during lipid digestion in the duodenum?",
            options: [
              "It emulsifies large lipid globules into microscopic droplets, greatly increasing surface area for lipase action.",
              "It chemically hydrolyzes triglycerides into glycerol and three fatty acids.",
              "It provides a strongly acidic medium of pH 2.0 required for intestinal enzymes.",
              "It converts excess amino acids into urea through deamination."
            ],
            correctAnswer: "It emulsifies large lipid globules into microscopic droplets, greatly increasing surface area for lipase action.",
            explanation: "Bile contains bile salts (no digestive enzymes) that mechanically emulsify large insoluble lipid globules into tiny micelles, dramatically expanding the surface area for pancreatic lipase to digest fats chemically.",
            hintLadder: [
              "Bile does NOT contain chemical digestive enzymes.",
              "It acts like a biological detergent.",
              "Emulsification breaks large fat drops into tiny droplets to speed up lipase action."
            ],
            misconceptionAlerts: [
              { trigger: "It chemically hydrolyzes triglycerides into glycerol and three fatty acids.", note: "Bile performs mechanical emulsification, not chemical enzyme hydrolysis. Lipase performs the chemical breakdown." }
            ],
            skillId: "skill-bio-photosynthesis-human-digestion",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-transport-circulatory",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Transport Systems, Plant Translocation & Human Circulation",
    code: "BIO-UNIT-05",
    description: "Xylem transpiration stream, phloem pressure-flow translocation, human double circulation, cardiac cycle, and ABO blood grouping.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-bio-vascular-plants-circulatory-system",
        unitId: "unit-bio-transport-circulatory",
        title: "Vascular Translocation, Cardiac Cycle & Blood Typing",
        code: "SKL-BIO-302",
        summary: "Contrasting xylem/phloem transport mechanisms, detailing cardiac chambers and pressures, and determining ABO blood compatibility.",
        objectives: [
          "Contrast the passive cohesion-tension xylem pull with active phloem translocation (source to sink)",
          "Sequence the flow of oxygenated and deoxygenated blood through the four heart chambers, valves, and systemic/pulmonary circuits",
          "Determine safe donor-recipient compatibility in the ABO and Rhesus blood group systems based on antigens and antibodies"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-cell-structure"],
        questions: [
          {
            id: "q-bio-trn-1",
            type: "multiple_choice",
            questionText: "Which chamber of the mammalian heart possesses the thickest muscular myocardium wall, and what is its physiological purpose?",
            options: [
              "Left ventricle; it must generate high hydrostatic pressure to pump oxygenated blood throughout the entire systemic circulation.",
              "Right ventricle; it pumps deoxygenated blood under extreme pressure into fragile pulmonary capillaries.",
              "Left atrium; it receives oxygenated blood directly from pulmonary veins.",
              "Right atrium; it receives venous return from the superior and inferior vena cava."
            ],
            correctAnswer: "Left ventricle; it must generate high hydrostatic pressure to pump oxygenated blood throughout the entire systemic circulation.",
            explanation: "The left ventricle pumps blood through the systemic aorta to all peripheral organs, overcoming significant systemic vascular resistance. Its myocardial wall is therefore 3 times thicker than that of the right ventricle, which only pumps to the adjacent lungs.",
            hintLadder: [
              "Consider which chamber pumps blood the furthest distance (to the entire body).",
              "The systemic circuit requires much higher arterial pressure than the pulmonary circuit.",
              "The left ventricle is the thickest chamber to pump into the aorta."
            ],
            misconceptionAlerts: [
              { trigger: "Right ventricle; it pumps deoxygenated blood under extreme pressure into fragile pulmonary capillaries.", note: "The pulmonary circuit operates at low pressure to prevent edema in delicate lung alveoli." }
            ],
            skillId: "skill-bio-vascular-plants-circulatory-system",
            difficulty: "easy"
          },
          {
            id: "q-bio-trn-2",
            type: "multiple_choice",
            questionText: "In vascular plants, which specialized tissue and cell types are responsible for translocating manufactured sucrose and amino acids from photosynthetic source leaves to metabolic sinks?",
            options: [
              "Phloem sieve tube elements and nucleated companion cells.",
              "Xylem tracheids and lignified vessel elements.",
              "Collenchyma thickening strands in the epidermal cortex.",
              "Aerenchyma parenchyma cells in the root cortex."
            ],
            correctAnswer: "Phloem sieve tube elements and nucleated companion cells.",
            explanation: "Translocation of photosynthates (sucrose, amino acids) occurs bidirectionally in the phloem via living sieve tube elements, metabolically supported by companion cells that load sucrose against concentration gradients.",
            hintLadder: [
              "Xylem transports water and dissolved mineral ions upward.",
              "Phloem transports organic nutrients (sugars/sucrose).",
              "Sieve tubes and companion cells constitute the functional conducting unit of phloem."
            ],
            misconceptionAlerts: [
              { trigger: "Xylem tracheids and lignified vessel elements.", note: "Xylem conducts water and inorganic mineral salts under transpiration pull, not synthesized sucrose." }
            ],
            skillId: "skill-bio-vascular-plants-circulatory-system",
            difficulty: "easy"
          },
          {
            id: "q-bio-trn-3",
            type: "multiple_choice",
            questionText: "In emergency red blood cell transfusions, why is type O Rh-negative (O-) blood considered the 'universal red blood cell donor'?",
            options: [
              "Its red blood cells carry neither A, nor B, nor Rh-D surface antigens, preventing agglutination by recipient antibodies.",
              "Its blood plasma contains no anti-A or anti-B antibodies.",
              "It stimulates the recipient's immune system to manufacture universal antigens.",
              "It contains equal concentrations of both A and B antigens to neutralize all antibodies."
            ],
            correctAnswer: "Its red blood cells carry neither A, nor B, nor Rh-D surface antigens, preventing agglutination by recipient antibodies.",
            explanation: "Type O Rh-negative red blood cells lack A, B, and Rh (D) surface glycoproteins. When transfused into any recipient, their antibodies find no foreign antigens to bind with, eliminating the risk of life-threatening immune agglutination.",
            hintLadder: [
              "Agglutination occurs when recipient antibodies attack foreign donor red blood cell ANTIGENS.",
              "Universal donor erythrocytes must have NO surface antigens for antibodies to attack.",
              "Type O Rh-negative erythrocytes lack A, B, and Rh antigens completely."
            ],
            misconceptionAlerts: [
              { trigger: "Its blood plasma contains no anti-A or anti-B antibodies.", note: "Type O plasma actually contains BOTH anti-A and anti-B antibodies; it is the PACKED RED CELLS (lacking antigens) that make it universal." }
            ],
            skillId: "skill-bio-vascular-plants-circulatory-system",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-excretion-homeostasis",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Excretion, Nephron Ultrafiltration & Osmoregulation",
    code: "BIO-UNIT-06",
    description: "Mammalian kidney gross anatomy, nephron ultrafiltration and selective reabsorption, ADH osmoregulation feedback, and skin thermoregulation.",
    order: 6,
    category: "core",
    skills: [
      {
        id: "skill-bio-kidney-nephron-homeostasis",
        unitId: "unit-bio-excretion-homeostasis",
        title: "Nephron Ultrafiltration, Loop of Henle & ADH Feedback",
        code: "SKL-BIO-303",
        summary: "Analyzing glomerular filtration pressures, loop of Henle countercurrent multiplier, and negative feedback loops governing hydration.",
        objectives: [
          "Describe ultrafiltration across the glomerular capillary fenestrations and podocyte filtration slits into Bowman's capsule",
          "Explain the countercurrent multiplier mechanism of the loop of Henle in generating a hypertonic medullary gradient",
          "Diagram the negative feedback loop involving hypothalamic osmoreceptors, pituitary ADH release, and water reabsorption"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-cell-structure"],
        questions: [
          {
            id: "q-bio-exc-1",
            type: "multiple_choice",
            questionText: "In the microscopic renal nephron, where does non-selective ultrafiltration of blood plasma under high hydrostatic pressure take place, and what is excluded from the filtrate?",
            options: [
              "Bowman's capsule from the glomerulus; blood cells and high-molecular-weight plasma proteins are excluded.",
              "The loop of Henle; glucose and amino acids are excluded.",
              "The collecting duct; water and sodium ions are excluded.",
              "The proximal convoluted tubule; urea and creatinine are excluded."
            ],
            correctAnswer: "Bowman's capsule from the glomerulus; blood cells and high-molecular-weight plasma proteins are excluded.",
            explanation: "Afferent arteriolar blood pressure forces water, glucose, urea, and electrolytes through the glomerular fenestrations and basement membrane into Bowman's capsule, forming the glomerular filtrate. Large proteins (albumin) and erythrocytes cannot pass.",
            hintLadder: [
              "Filtration occurs at the initial capillary tuft of the nephron.",
              "The tuft is called the glomerulus, surrounded by Bowman's capsule.",
              "Erythrocytes and large proteins are too large to pass the basement membrane."
            ],
            misconceptionAlerts: [
              { trigger: "The proximal convoluted tubule; urea and creatinine are excluded.", note: "The proximal tubule is where 100% of glucose and ~65% of water/salts are SELECTIVELY REABSORBED, not ultrafiltered." }
            ],
            skillId: "skill-bio-kidney-nephron-homeostasis",
            difficulty: "easy"
          },
          {
            id: "q-bio-exc-2",
            type: "multiple_choice",
            questionText: "When an individual becomes dehydrated on a hot afternoon, how does the neuroendocrine osmoregulatory system respond to restore blood osmotic balance?",
            options: [
              "Hypothalamic osmoreceptors trigger the posterior pituitary to secrete ADH, making collecting duct walls permeable to water, producing concentrated urine.",
              "The anterior pituitary ceases ADH secretion, causing copious dilute urine to be voided.",
              "The adrenal cortex releases aldosterone to eliminate all water through the renal pelvis.",
              "The glomerulus halts filtration completely to preserve blood volume."
            ],
            correctAnswer: "Hypothalamic osmoreceptors trigger the posterior pituitary to secrete ADH, making collecting duct walls permeable to water, producing concentrated urine.",
            explanation: "Hypertonic blood stimulates osmoreceptors in the hypothalamus, prompting the posterior pituitary to release Antidiuretic Hormone (ADH/vasopressin). ADH inserts aquaporin water channels into the distal tubule and collecting duct, maximizing water reabsorption and producing a small volume of hypertonic urine.",
            hintLadder: [
              "Dehydration increases blood osmolarity (more concentrated blood).",
              "ADH (Antidiuretic Hormone) prevents diuresis (excess urination).",
              "ADH increases water reabsorption back into the blood, concentrating the urine."
            ],
            misconceptionAlerts: [
              { trigger: "The anterior pituitary ceases ADH secretion, causing copious dilute urine to be voided.", note: "ADH is stored/released by the POSTERIOR pituitary, and its release INCREASES during dehydration to conserve water." }
            ],
            skillId: "skill-bio-kidney-nephron-homeostasis",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-nervous-endocrine",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Nervous Coordination, Synapses & Reflex Arcs",
    code: "BIO-UNIT-07",
    description: "Neuron anatomy (sensory, motor, relay), resting and action potentials, chemical neurotransmission across synapses, and involuntary spinal reflex arcs.",
    order: 7,
    category: "core",
    skills: [
      {
        id: "skill-bio-neurons-synapses-reflexes",
        unitId: "unit-bio-nervous-endocrine",
        title: "Action Potentials, Synaptic Neurotransmission & Reflex Arcs",
        code: "SKL-BIO-304",
        summary: "Analyzing sodium-potassium electrochemical gradients, neurotransmitter vesicle exocytosis, and spinal reflex circuits.",
        objectives: [
          "Describe how voltage-gated Na⁺ and K⁺ ion channels generate resting potential (-70 mV) and action potential spikes",
          "Explain the unidirectional mechanism of synaptic transmission mediated by Ca²⁺ influx and neurotransmitter exocytosis",
          "Trace the complete neural pathway of a spinal withdrawal reflex arc from stimulus to muscular effector"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-cell-structure"],
        questions: [
          {
            id: "q-bio-ner-1",
            type: "multiple_choice",
            questionText: "Why is the transmission of a nerve impulse across a chemical synapse strictly unidirectional (from presynaptic to postsynaptic neuron)?",
            options: [
              "Neurotransmitter vesicles are exclusively localized in presynaptic axon terminals, and complementary receptors are found only on postsynaptic membranes.",
              "Electrical current cannot flow backwards through extracellular fluid.",
              "Action potentials can only physically travel toward cell bodies.",
              "The synaptic cleft is physically sealed by Schwann cell myelin."
            ],
            correctAnswer: "Neurotransmitter vesicles are exclusively localized in presynaptic axon terminals, and complementary receptors are found only on postsynaptic membranes.",
            explanation: "Synaptic asymmetry ensures unidirectionality: synaptic vesicles containing neurotransmitters (e.g., acetylcholine) exist solely in the presynaptic terminal, while ligand-gated receptor proteins exist exclusively on the postsynaptic dendrite or soma.",
            hintLadder: [
              "Chemical synapses depend on chemical messenger molecules called neurotransmitters.",
              "Where are neurotransmitters stored before release? (Presynaptic bulb).",
              "Where are the specific receptor proteins that bind them? (Postsynaptic membrane)."
            ],
            misconceptionAlerts: [
              { trigger: "Action potentials can only physically travel toward cell bodies.", note: "In axons, action potentials propagate away from the cell body toward terminal buttons, not toward the cell body." }
            ],
            skillId: "skill-bio-neurons-synapses-reflexes",
            difficulty: "easy"
          },
          {
            id: "q-bio-ner-2",
            type: "multiple_choice",
            questionText: "What is the chronological sequence of neural components involved when someone accidentally touches a hot stove and withdraws their hand involuntarily?",
            options: [
              "Thermal receptor -> Sensory neuron -> Relay interneuron (spinal cord) -> Motor neuron -> Effector (biceps muscle)",
              "Effector -> Motor neuron -> Spinal cord -> Sensory neuron -> Brain",
              "Thermal receptor -> Motor neuron -> Relay interneuron -> Sensory neuron -> Effector",
              "Sensory neuron -> Brain cortex -> Hypothalamus -> Relay interneuron -> Effector"
            ],
            correctAnswer: "Thermal receptor -> Sensory neuron -> Relay interneuron (spinal cord) -> Motor neuron -> Effector (biceps muscle)",
            explanation: "A spinal somatic reflex arc bypasses conscious brain deliberation for maximum speed: Receptor detects pain/heat -> Sensory (afferent) neuron conducts to dorsal horn -> Interneuron integrates in spinal gray matter -> Motor (efferent) neuron stimulates muscle -> Effector contracts.",
            hintLadder: [
              "Starts with the sensor detecting the harmful stimulus.",
              "Afferent (sensory) nerve brings signal into the central spinal cord.",
              "Interneuron relays to efferent (motor) nerve, which commands muscle to contract."
            ],
            misconceptionAlerts: [
              { trigger: "Sensory neuron -> Brain cortex -> Hypothalamus -> Relay interneuron -> Effector", note: "Spinal reflexes are fast and involuntary; the motor withdrawal happens BEFORE the brain cortex consciously perceives the pain." }
            ],
            skillId: "skill-bio-neurons-synapses-reflexes",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-bio-genetics-inheritance-biotech",
    subjectId: "sci_biology",
    level: "senior_secondary",
    title: "Molecular Genetics, Dihybrid Crosses & DNA Replication",
    code: "BIO-UNIT-08",
    description: "Watson-Crick double helix structure, semi-conservative DNA replication, dihybrid inheritance ratios (9:3:3:1), and sex-linked genetic disorders.",
    order: 8,
    category: "exam_focus",
    skills: [
      {
        id: "skill-bio-dihybrid-sex-linkage-dna",
        unitId: "unit-bio-genetics-inheritance-biotech",
        title: "Dihybrid Punnett Squares, Sex Linkage & DNA Base Pairing",
        code: "SKL-BIO-305",
        summary: "Solving 16-cell dihybrid crosses, analyzing X-linked recessive pedigrees (hemophilia/color blindness), and calculating Chargaff base ratios.",
        objectives: [
          "Apply Chargaff's rules and Watson-Crick hydrogen bonding to calculate complementary DNA nucleotide percentages",
          "Construct 4x4 Punnett squares to predict phenotypic ratios in dihybrid crosses under Mendel's Law of Independent Assortment",
          "Analyze inheritance patterns and risk probabilities for sex-linked conditions (X-linked recessive color blindness and hemophilia)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-genetics"],
        questions: [
          {
            id: "q-bio-gen-1",
            type: "multiple_choice",
            questionText: "If a double-stranded DNA sample is chemically analyzed and found to contain 28% Cytosine (C), what percentage of the sample consists of Thymine (T)?",
            mathExpression: "\\%A + \\%T + \\%G + \\%C = 100\\%, \\quad \\%C = \\%G = 28\\%",
            options: ["22%", "28%", "44%", "14%"],
            correctAnswer: "22%",
            explanation: "By Chargaff's rules, %Cytosine = %Guanine = 28%. Total C + G = 28% + 28% = 56%. The remaining 44% represents Adenine + Thymine. Since %A = %T, Thymine = 44% / 2 = 22%.",
            hintLadder: [
              "In double-stranded DNA, Cytosine pairs with Guanine, so %G = %C = 28%.",
              "Combined % (C + G) = 28 + 28 = 56%.",
              "Remaining for A + T = 100 - 56 = 44%. Since A = T, %T = 44 ÷ 2 = 22%."
            ],
            misconceptionAlerts: [
              { trigger: "28%", note: "28% is the percentage of Guanine (%G = %C), not Thymine (%T = %A)." },
              { trigger: "44%", note: "44% is the sum of BOTH Adenine and Thymine (%A + %T), so divide by 2 for Thymine alone." }
            ],
            skillId: "skill-bio-dihybrid-sex-linkage-dna",
            difficulty: "easy"
          },
          {
            id: "q-bio-gen-2",
            type: "multiple_choice",
            questionText: "What is the expected phenotypic ratio among offspring from a cross between two individuals heterozygous for two unlinked traits (AaBb x AaBb) exhibiting complete dominance?",
            mathExpression: "(\\text{Dominant A} : \\text{Recessive a}) \\times (\\text{Dominant B} : \\text{Recessive b}) = (3:1)(3:1)",
            options: ["9 : 3 : 3 : 1", "1 : 2 : 1", "3 : 1", "9 : 7"],
            correctAnswer: "9 : 3 : 3 : 1",
            explanation: "According to Mendel's Law of Independent Assortment, the product rule applies: (3/4 A_ + 1/4 aa) × (3/4 B_ + 1/4 bb) = 9/16 A_B_ : 3/16 A_bb : 3/16 aaB_ : 1/16 aabb, yielding a 9:3:3:1 phenotypic ratio.",
            hintLadder: [
              "Each heterozygous monohybrid cross produces a 3:1 phenotypic ratio.",
              "Multiply probabilities independently: (3:1) × (3:1).",
              "(3×3) : (3×1) : (1×3) : (1×1) = 9 : 3 : 3 : 1."
            ],
            misconceptionAlerts: [
              { trigger: "1 : 2 : 1", note: "1:2:1 is the GENOTYPIC ratio of a monohybrid cross (1 AA : 2 Aa : 1 aa)." }
            ],
            skillId: "skill-bio-dihybrid-sex-linkage-dna",
            difficulty: "easy"
          },
          {
            id: "q-bio-gen-3",
            type: "multiple_choice",
            questionText: "Red-green color blindness is an X-linked recessive disorder. A carrier woman (X^C X^c) marries a man with normal vision (X^C Y). What is the probability that their first son will be red-green color blind?",
            options: ["50% (1/2)", "25% (1/4)", "0%", "100%"],
            correctAnswer: "50% (1/2)",
            explanation: "A son must inherit the Y chromosome from his father (giving male sex). From the mother, he has an equal 50% chance of inheriting normal allele X^C (normal vision) or recessive allele X^c (color blind). Therefore, given that the child is a son, the probability is 1/2 or 50%.",
            hintLadder: [
              "The question asks specifically about sons (offspring receiving father's Y chromosome).",
              "Sons get their single X chromosome exclusively from their mother.",
              "The mother is heterozygous X^C X^c, so there is a 1 in 2 (50%) chance she passes X^c to her son."
            ],
            misconceptionAlerts: [
              { trigger: "25% (1/4)", note: "25% is the probability that an OVERALL child is a color-blind son (1/2 boy × 1/2 color blind). But the question specifies 'given that the child is a son', making it 50%." }
            ],
            skillId: "skill-bio-dihybrid-sex-linkage-dna",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

