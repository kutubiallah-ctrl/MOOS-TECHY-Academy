import { SkillLesson } from "../../types/curriculum";

export const SCIENCE_LESSONS: Record<string, SkillLesson> = {
  // ==========================================
  // PHYSICS LESSONS
  // ==========================================
  "skill-phy-kinematics": {
    id: "les-phy-kinematics",
    title: "Uniform Acceleration & the Three Equations of Motion",
    hookAndIntuition: "When a sprinter bursts out of the starting blocks or an aircraft throttles up on a runway, speed doesn't jump instantaneously—it increases continuously over time. The rate of this speed change is acceleration. If acceleration remains constant, we can predict exact position and velocity at any future second using three master relationships.",
    conceptualExplanation: "Kinematics describes motion without considering the forces causing it. For constant acceleration 'a', average velocity over time interval 't' is (u + v)/2. Multiplying this average velocity by time yields displacement: s = ((u + v)/2)t. Substituting v = u + at gives s = ut + 0.5at². Eliminating 't' between these expressions gives the velocity-squared relationship v² = u² + 2as. Each equation connects four of the five kinematic parameters (u, v, a, s, t), allowing any unknown to be calculated if three are given.",
    keyTermsAndFormulas: [
      { termOrSymbol: "v = u + at", definition: "Velocity-time relation connecting initial speed u, acceleration a, and elapsed time t.", practicalExample: "Accelerating at 2 m/s² for 5 s from rest: v = 0 + 2(5) = 10 m/s." },
      { termOrSymbol: "s = ut + 0.5at²", definition: "Displacement-time relation giving total position change under uniform acceleration.", practicalExample: "Car braking from 20 m/s at -4 m/s² for 3 s: s = 20(3) + 0.5(-4)(9) = 60 - 18 = 42 m." },
      { termOrSymbol: "v² = u² + 2as", definition: "Timeless kinematic relation connecting velocities, acceleration, and distance.", practicalExample: "Dropping a stone from height 20 m: v = √(2 × 9.8 × 20) = 19.8 m/s." }
    ],
    workedExamples: [
      {
        title: "Braking Distance Analysis for High-Speed Rail",
        problemStatement: "A high-speed train traveling at 72 km/h brakes uniformly to rest in a distance of 200 m. Calculate the deceleration and the total stopping time.",
        steps: [
          { stepNumber: 1, instruction: "Convert velocities into SI base units (m/s).", reasoning: "72 km/h = 72 × (1000 m / 3600 s) = 20 m/s. Initial velocity u = 20 m/s, final velocity v = 0 m/s, displacement s = 200 m." },
          { stepNumber: 2, instruction: "Select the kinematic equation without time (t) to find acceleration (a).", reasoning: "v² = u² + 2as => 0² = 20² + 2a(200) => 0 = 400 + 400a." },
          { stepNumber: 3, instruction: "Solve for acceleration a.", reasoning: "400a = -400 => a = -1.0 m/s². The negative sign indicates deceleration of magnitude 1.0 m/s²." },
          { stepNumber: 4, instruction: "Calculate stopping time t using v = u + at.", reasoning: "0 = 20 + (-1.0)t => t = 20 / 1.0 = 20 seconds." }
        ],
        takeawayRule: "Always convert non-SI units (like km/h) to m/s before calculation. A negative acceleration denotes deceleration."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking velocity and acceleration must always point in the same direction.", whyItIsWrong: "When an object slows down, velocity points forward while acceleration points backward (opposite directions).", correctCorrection: "Assign a positive coordinate direction (e.g. forward = +) and stick with it consistently throughout calculations." },
      { misconception: "Assuming acceleration is zero at the peak of a vertical toss because velocity is momentarily zero.", whyItIsWrong: "Gravity never turns off; g = 9.8 m/s² downward continuously acts on the projectile even when v = 0.", correctCorrection: "At the peak, velocity is zero (dv/dt), but gravitational acceleration remains 9.8 m/s² downwards." }
    ],
    guidedPracticePrompt: "A car accelerates from 10 m/s to 30 m/s over 100 meters. What is its acceleration?",
    summaryRecap: "The three kinematic equations connect u, v, a, s, and t under constant acceleration. Always list knowns and target variable to pick the fastest equation."
  },

  "skill-phy-projectiles": {
    id: "les-phy-projectiles",
    title: "2D Projectile Motion & Vector Trajectories",
    hookAndIntuition: "Kick a football across a pitch. Why does it trace a graceful symmetric arch? The secret discovered by Galileo is vector independence: the ball's horizontal cruise continues unaffected, while gravity pulls it down vertically. Combining horizontal constancy with vertical free fall produces a parabolic trajectory.",
    conceptualExplanation: "Projectiles move under the sole influence of gravity in two dimensions. We resolve initial velocity u at angle θ into two perpendicular components: horizontal u_x = u cos θ and vertical u_y = u sin θ. In the absence of air resistance: (1) Horizontal acceleration a_x = 0, so horizontal velocity remains constant: v_x = u_x, and horizontal distance x = (u cos θ)t. (2) Vertical acceleration a_y = -g, so vertical motion follows 1D kinematics under gravity: v_y = u sin θ - gt, y = (u sin θ)t - 0.5gt². At maximum height, v_y = 0, giving time to peak t_p = (u sin θ)/g. Total flight time T = 2t_p = (2u sin θ)/g. Maximum range on level ground R = (u² sin 2θ)/g.",
    keyTermsAndFormulas: [
      { termOrSymbol: "u_x = u cos θ, u_y = u sin θ", definition: "Vector decomposition of launching velocity into orthogonal components.", practicalExample: "Launch at 50 m/s at 30°: u_x = 50 cos 30° = 43.3 m/s, u_y = 50 sin 30° = 25 m/s." },
      { termOrSymbol: "T = (2u sin θ) / g", definition: "Total time of flight for a projectile launched and landing at equal elevation.", practicalExample: "If u_y = 25 m/s and g = 10 m/s²: T = 2(25)/10 = 5.0 s." },
      { termOrSymbol: "R = (u² sin 2θ) / g", definition: "Horizontal range formula maximized when launch angle θ = 45° (since sin 90° = 1).", practicalExample: "Launch at 20 m/s at 45°: R = (400 × 1)/10 = 40 m." }
    ],
    workedExamples: [
      {
        title: "Calculating Artillery Shell Range and Maximum Height",
        problemStatement: "A shell is launched at 100 m/s at an angle of 30° to the horizontal. Taking g = 10 m/s², find: (a) Time of flight, (b) Maximum height, (c) Horizontal range.",
        steps: [
          { stepNumber: 1, instruction: "Resolve initial velocity components.", reasoning: "u_x = 100 cos 30° = 100 × 0.866 = 86.6 m/s; u_y = 100 sin 30° = 100 × 0.5 = 50 m/s." },
          { stepNumber: 2, instruction: "Calculate total flight time T.", reasoning: "T = 2u_y / g = 2(50) / 10 = 10 seconds." },
          { stepNumber: 3, instruction: "Calculate maximum height H using vertical peak condition v_y = 0.", reasoning: "H = u_y² / (2g) = 50² / (2 × 10) = 2500 / 20 = 125 meters." },
          { stepNumber: 4, instruction: "Calculate horizontal range R.", reasoning: "R = u_x × T = 86.6 m/s × 10 s = 866 meters." }
        ],
        takeawayRule: "Treat horizontal and vertical motions as completely independent processes linked solely by the shared variable time (t)."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking the projectile's speed at the highest point is zero.", whyItIsWrong: "Only the vertical velocity v_y is zero at the peak. The horizontal velocity u_x = u cos θ continues unaffected.", correctCorrection: "At maximum height, minimum speed = u_x = u cos θ." }
    ],
    guidedPracticePrompt: "At what angle θ is the horizontal range of a projectile equal to its maximum height?",
    summaryRecap: "Horizontal velocity is constant (a_x = 0), while vertical motion is free fall under gravity (a_y = -g). Range peaks at 45°."
  },

  "skill-phy-newtons-laws": {
    id: "les-phy-newtons-laws",
    title: "Newton's Three Laws of Motion & Momentum Conservation",
    hookAndIntuition: "Why do passengers lurch forward when a bus slams on its brakes? Why does an astronaut float indefinitely unless an external force intervenes? Sir Isaac Newton organized the entire mechanical universe around three inviolable principles that explain how forces change motion.",
    conceptualExplanation: "First Law (Inertia): An object continues in its state of rest or uniform rectilinear motion unless acted upon by a non-zero net external force. Mass is the quantitative measure of inertia. Second Law: The net force on a body is equal to the rate of change of its linear momentum: F_net = dp/dt = m(dv/dt) = ma (for constant mass). One Newton is the force needed to accelerate 1 kg by 1 m/s². Third Law (Action-Reaction): When body A exerts a force on body B, body B simultaneously exerts an equal and opposite force on body A (F_AB = -F_BA). Because internal action-reaction pairs cancel in closed systems, total momentum is conserved: Σp_initial = Σp_final.",
    keyTermsAndFormulas: [
      { termOrSymbol: "F_net = ma", definition: "Newton's Second Law connecting resultant force in Newtons to mass and acceleration.", practicalExample: "Accelerating a 1200 kg car at 3 m/s² requires F = 1200 × 3 = 3600 N." },
      { termOrSymbol: "p = mv", definition: "Linear momentum, a vector quantity with units kg·m/s.", practicalExample: "A 0.15 kg baseball at 40 m/s has momentum p = 6 kg·m/s." },
      { termOrSymbol: "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂", definition: "Law of conservation of linear momentum for an isolated two-body collision.", practicalExample: "Rifle recoil: m_bullet v_bullet + m_rifle v_rifle = 0." }
    ],
    workedExamples: [
      {
        title: "Recoil Velocity of a Fired Rifle",
        problemStatement: "A 4.0 kg rifle fires a 0.02 kg bullet at a muzzle speed of 600 m/s. What is the recoil velocity of the rifle?",
        steps: [
          { stepNumber: 1, instruction: "State the initial momentum before firing.", reasoning: "Both rifle and bullet are at rest, so total initial momentum P_initial = 0." },
          { stepNumber: 2, instruction: "Set up the momentum equation for the isolated rifle-bullet system.", reasoning: "P_initial = P_final => 0 = m_bullet × v_bullet + m_rifle × v_rifle." },
          { stepNumber: 3, instruction: "Substitute known numerical values.", reasoning: "0 = (0.02 kg × 600 m/s) + (4.0 kg × v_rifle) => 0 = 12 + 4.0 v_rifle." },
          { stepNumber: 4, instruction: "Solve for the rifle velocity.", reasoning: "4.0 v_rifle = -12 => v_rifle = -3.0 m/s. The negative sign denotes backward recoil." }
        ],
        takeawayRule: "In all explosions or firings from rest, forward momentum of the projectile equals backward momentum of the launcher."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking Newton's Third Law action-reaction forces cancel each other out so nothing moves.", whyItIsWrong: "Action and reaction forces act on DIFFERENT bodies, so they never cancel on a single free-body diagram.", correctCorrection: "When you push a wall, the force is on the wall. The reaction force is on your hands." }
    ],
    guidedPracticePrompt: "A 60 kg skater pushes an 80 kg skater on frictionless ice with 120 N. What is the acceleration of each skater?",
    summaryRecap: "Inertia resists acceleration; F = ma quantifies force; action-reaction pairs act on different bodies; total momentum is conserved in closed systems."
  },

  "skill-phy-work-energy": {
    id: "les-phy-work-energy",
    title: "Work, Mechanical Energy, & Power Equivalence",
    hookAndIntuition: "You can push against a brick wall until you sweat with exhaustion, but in physics, you have done zero work! Work is only accomplished when a force actually displaces an object in the direction of that force.",
    conceptualExplanation: "Mechanical work W is defined as the scalar product of force and displacement: W = F · s = F s cos θ, where θ is the angle between force and displacement vectors. Work is measured in Joules (1 J = 1 N·m). Kinetic energy KE = 0.5mv² is energy due to motion. Gravitational potential energy PE = mgh is energy stored due to position in a gravitational field. The Work-Energy Theorem states that net work done on an object equals its change in kinetic energy: W_net = ΔKE. In a conservative system with no friction or drag, total mechanical energy is conserved: KE_1 + PE_1 = KE_2 + PE_2. Power is the rate of doing work: P = W/t = Fv, measured in Watts (1 W = 1 J/s).",
    keyTermsAndFormulas: [
      { termOrSymbol: "W = F s cos θ", definition: "Work done by a constant force F over displacement s.", practicalExample: "Pulling a sled 10 m with 50 N at 60°: W = 50(10) cos 60° = 250 J." },
      { termOrSymbol: "KE = 0.5mv², PE = mgh", definition: "Formulas for kinetic and gravitational potential energy.", practicalExample: "A 2 kg rock dropped from 10 m has PE = 2(9.8)(10) = 196 J, fully converted to KE at ground impact." },
      { termOrSymbol: "P = W / t = F v", definition: "Mechanical power measuring the rate of energy transfer.", practicalExample: "Lifting 200 N vertically at 1.5 m/s requires P = 200 × 1.5 = 300 W." }
    ],
    workedExamples: [
      {
        title: "Rollercoaster Energy Conservation",
        problemStatement: "A 500 kg rollercoaster cart starts from rest at the top of a hill of height h = 45 m. Neglecting friction, what is its speed at the bottom of the hill? (g = 10 m/s²)",
        steps: [
          { stepNumber: 1, instruction: "Equate initial mechanical energy to final mechanical energy.", reasoning: "E_initial = KE_top + PE_top = 0 + mgh. E_final = KE_bottom + PE_bottom = 0.5mv² + 0." },
          { stepNumber: 2, instruction: "Set up the conservation equation.", reasoning: "mgh = 0.5mv²." },
          { stepNumber: 3, instruction: "Cancel mass m from both sides and solve for v.", reasoning: "gh = 0.5v² => v² = 2gh => v = √(2gh)." },
          { stepNumber: 4, instruction: "Substitute numerical values.", reasoning: "v = √(2 × 10 × 45) = √900 = 30 m/s." }
        ],
        takeawayRule: "In frictionless gravity-driven descents, speed depends solely on vertical drop height h, independent of mass or path shape."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing carrying a heavy bag horizontally across a flat floor does positive work on the bag.", whyItIsWrong: "Lifting force is vertical (upward) while displacement is horizontal (forward). The angle is θ = 90°, and cos 90° = 0, so work done by lifting force is zero.", correctCorrection: "Work requires displacement along the line of action of the force." }
    ],
    guidedPracticePrompt: "A crane lifts a 1000 kg container vertically through 20 meters in 8 seconds. What is the average power output? (g = 10 m/s²)",
    summaryRecap: "W = F s cos θ. In conservative systems, mechanical energy converts seamlessly between PE and KE. Power is rate of energy transfer."
  },

  "skill-phy-wave-properties": {
    id: "les-phy-wave-properties",
    title: "Wave Properties, Speed Equation, & Superposition",
    hookAndIntuition: "Ripples spreading across a pond, sound travelling from a drum to your ear, and sunlight traversing 150 million kilometers of empty vacuum all share one fundamental behavior: they are waves. Waves transfer energy from one location to another without transferring matter.",
    conceptualExplanation: "Waves are categorized as transverse (oscillations perpendicular to energy propagation, e.g. light, water ripples) or longitudinal (oscillations parallel to propagation, e.g. sound, compression waves with compressions and rarefactions). The fundamental wave equation links wave speed v, frequency f (number of complete cycles per second in Hertz), and wavelength λ (distance between successive crests): v = fλ. The period T is the time for one complete cycle: T = 1/f. When two or more waves overlap, their displacements add algebraically according to the Principle of Superposition, resulting in constructive interference (reinforcement) or destructive interference (cancellation).",
    keyTermsAndFormulas: [
      { termOrSymbol: "v = f λ", definition: "The Universal Wave Equation relating wave velocity, frequency, and wavelength.", practicalExample: "A radio station broadcasts at f = 100 MHz (10⁸ Hz). With light speed c = 3 × 10⁸ m/s, λ = 3 × 10⁸ / 10⁸ = 3.0 m." },
      { termOrSymbol: "T = 1 / f", definition: "Period-frequency reciprocal relationship.", practicalExample: "A 50 Hz AC power wave has a period T = 1/50 = 0.02 s (20 ms)." },
      { termOrSymbol: "Diffraction & Interference", definition: "Wave-exclusive phenomena where waves bend around obstacles and superimpose.", practicalExample: "Young's Double-Slit experiment produces alternating bright (constructive) and dark (destructive) fringes." }
    ],
    workedExamples: [
      {
        title: "Determining Ocean Wave Velocity and Period",
        problemStatement: "A surfer observes wave crests passing a buoy every 4.0 seconds. The distance between successive crests is 28 meters. Calculate: (a) the frequency of the waves, (b) the wave propagation speed.",
        steps: [
          { stepNumber: 1, instruction: "Calculate frequency f from period T = 4.0 s.", reasoning: "f = 1 / T = 1 / 4.0 = 0.25 Hz." },
          { stepNumber: 2, instruction: "Identify wavelength λ.", reasoning: "Distance between crests is λ = 28 meters." },
          { stepNumber: 3, instruction: "Apply the universal wave equation v = fλ.", reasoning: "v = 0.25 Hz × 28 m = 7.0 m/s (or v = λ / T = 28 / 4 = 7.0 m/s)." }
        ],
        takeawayRule: "Wave speed is constant in a homogeneous medium; changing frequency changes wavelength proportionally."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking sound waves travel faster in air than in liquids or solids.", whyItIsWrong: "Sound is a mechanical wave requiring molecular collisions. Denser, stiffer media transfer mechanical vibrations much faster: sound travels at ~340 m/s in air, ~1500 m/s in water, and ~5000 m/s in steel.", correctCorrection: "Mechanical waves travel fastest in stiff, dense solids; electromagnetic waves travel fastest in vacuum." }
    ],
    guidedPracticePrompt: "A guitar string vibrates at 440 Hz (concert A) producing a sound wave in air (v = 340 m/s). What is the wavelength in air?",
    summaryRecap: "Waves transfer energy without matter. v = fλ and T = 1/f. Superposition governs constructive and destructive interference."
  },

  "skill-phy-circuits-ohms-law": {
    id: "les-phy-circuits-ohms-law",
    title: "Electric Current, Ohm's Law, & Resistor Networks",
    hookAndIntuition: "Think of electricity like water flowing through municipal pipes. Voltage is the water pressure driving the flow, current is the volume of water moving per second, and resistance is the pipe narrowing that restricts the flow. Ohm's law describes the exact mathematical balance between these three quantities.",
    conceptualExplanation: "Electric current I is the rate of flow of electric charge: I = Q/t, measured in Amperes (1 A = 1 C/s). Potential difference (voltage) V is the work done per unit charge moving between two points: V = W/Q (1 V = 1 J/C). Ohm's Law states that for an ohmic conductor at constant temperature, current is directly proportional to voltage: V = IR. Resistors in series share the same current and their resistances sum linearly: R_total = R₁ + R₂ + ... + R_n. Resistors in parallel share the same voltage and their reciprocal conductances sum: 1/R_total = 1/R₁ + 1/R₂ + ... + 1/R_n. Electrical power dissipated as heat in a resistor is P = VI = I²R = V²/R.",
    keyTermsAndFormulas: [
      { termOrSymbol: "V = IR", definition: "Ohm's Law connecting voltage (V), current (I in Amperes), and resistance (R in Ohms).", practicalExample: "A 12V battery connected to a 4Ω resistor drives current I = 12 / 4 = 3 A." },
      { termOrSymbol: "R_series = R₁ + R₂, 1/R_parallel = 1/R₁ + 1/R₂", definition: "Equivalent resistance formulas for series and parallel resistor circuits.", practicalExample: "Two 6Ω resistors in parallel yield R_total = (6 × 6)/(6 + 6) = 36 / 12 = 3Ω." },
      { termOrSymbol: "P = IV = I²R = V² / R", definition: "Joule heating rate / electrical power dissipation.", practicalExample: "A 240V kettle drawing 10A delivers power P = 240 × 10 = 2400 W (2.4 kW)." }
    ],
    workedExamples: [
      {
        title: "Equivalent Resistance and Current in a Combined Circuit",
        problemStatement: "A 12V battery with negligible internal resistance is connected to a 4Ω resistor in series with a parallel combination of two 6Ω resistors. Find: (a) total equivalent resistance, (b) total circuit current, (c) power dissipated by the 4Ω resistor.",
        steps: [
          { stepNumber: 1, instruction: "Calculate the equivalent resistance of the parallel branch R_p.", reasoning: "1/R_p = 1/6 + 1/6 = 2/6 = 1/3 => R_p = 3Ω." },
          { stepNumber: 2, instruction: "Add the series resistor to get total resistance R_total.", reasoning: "R_total = R_series + R_p = 4Ω + 3Ω = 7Ω." },
          { stepNumber: 3, instruction: "Calculate total current using Ohm's Law.", reasoning: "I_total = V / R_total = 12V / 7Ω = 1.714 A." },
          { stepNumber: 4, instruction: "Calculate power in the 4Ω series resistor using P = I²R.", reasoning: "P = (1.714 A)² × 4Ω = 2.938 × 4 = 11.75 W." }
        ],
        takeawayRule: "Always collapse parallel resistor clusters into single equivalent values first before summing series elements."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing current gets 'used up' as it flows through resistors in a circuit.", whyItIsWrong: "Current is charge flow; charge is conserved. The exact same number of electrons entering a resistor exits it per second. What is used up is electrical potential energy (voltage drop).", correctCorrection: "Current is constant throughout a single series loop; voltage drops across resistive loads." }
    ],
    guidedPracticePrompt: "Three identical 12Ω resistors are connected in parallel across a 24V supply. What is the total current drawn?",
    summaryRecap: "V = IR governs ohmic circuits. Series resistances add directly; parallel resistances diminish total resistance. Power P = IV = I²R."
  },

  "skill-phy-precision-measurement": {
    id: "les-phy-precision-measurement",
    title: "Precision Measurement, Vernier Instruments, & Dimensional Analysis",
    hookAndIntuition: "A millimeter error in building a wooden table might go unnoticed, but a millimeter error in machining an aircraft jet engine turbine blade causes catastrophic failure. Precision instruments give scientists the ability to measure down to hundredths of a millimeter.",
    conceptualExplanation: "Standard meter rulers read to the nearest 1 mm (0.1 cm). A Vernier Caliper improves resolution to 0.1 mm (0.01 cm) by reading main scale plus a sliding vernier scale division aligned with a main scale line. A Micrometer Screw Gauge uses a precision spindle pitch (usually 0.5 mm per revolution divided into 50 thimble divisions) to read to 0.01 mm (0.001 cm). Zero error must be measured and subtracted: True reading = Observed reading - (±Zero error). Dimensional analysis verifies physical formulas by expressing physical quantities in fundamental dimensions: Mass [M], Length [L], Time [T]. Every valid equation must be dimensionally homogeneous (both sides must possess identical dimensional exponents).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Vernier Reading = Main Scale + (Coinciding Mark × 0.01 cm)", definition: "Formula for determining precise length with vernier calipers.", practicalExample: "Main scale = 3.4 cm, 6th vernier division aligns: Reading = 3.4 + (6 × 0.01) = 3.46 cm." },
      { termOrSymbol: "Micrometer Reading = Sleeve + (Thimble × 0.01 mm)", definition: "Formula for high-precision screw gauge thickness.", practicalExample: "Sleeve = 4.5 mm, thimble mark = 28: Thickness = 4.5 + (28 × 0.01) = 4.78 mm." },
      { termOrSymbol: "Dimensional Homogeneity: [LHS] = [RHS]", definition: "Fundamental test of physical formula consistency.", practicalExample: "Speed [LT⁻¹] = Acceleration [LT⁻²] × Time [T] = [LT⁻¹]." }
    ],
    workedExamples: [
      {
        title: "Testing the Dimensional Validity of the Pendulum Formula",
        problemStatement: "The period T of a simple pendulum is hypothesized to be T = 2π √(l / g). Use dimensional analysis to verify whether this formula is dimensionally consistent.",
        steps: [
          { stepNumber: 1, instruction: "Determine the dimension of the LHS (Period T).", reasoning: "Period is time: [LHS] = [T]." },
          { stepNumber: 2, instruction: "Identify dimensions of terms on the RHS. 2π is dimensionless.", reasoning: "Length l has dimension [L]. Gravitational acceleration g has dimension [L T⁻²]." },
          { stepNumber: 3, instruction: "Evaluate the dimension of √(l / g).", reasoning: "l / g = [L] / [L T⁻²] = [T²]. Taking square root: √([T²]) = [T]." },
          { stepNumber: 4, instruction: "Compare LHS and RHS dimensions.", reasoning: "[LHS] = [T] and [RHS] = [T]. Both sides have identical dimensions [T], confirming the equation is dimensionally consistent." }
        ],
        takeawayRule: "Dimensional analysis verifies consistency of units and variables, though it cannot determine dimensionless constants like 2π."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Adding positive zero error to the measurement reading.", whyItIsWrong: "If an instrument reads +0.02 mm when closed, it overestimates every measurement by 0.02 mm. You must subtract this error to get the true value.", correctCorrection: "Always use: True Value = Observed Reading - (Zero Error). A positive zero error is subtracted." }
    ],
    guidedPracticePrompt: "Derive the dimensions of Force and Pressure using base dimensions [M], [L], and [T].",
    summaryRecap: "Vernier calipers read to 0.1 mm, micrometers to 0.01 mm. Always account for zero error. Dimensional homogeneity requires [LHS] = [RHS]."
  },

  "skill-phy-fluid-statics-buoyancy": {
    id: "les-phy-fluid-statics-buoyancy",
    title: "Hydrostatic Pressure, Pascal's Principle, & Archimedes' Buoyancy",
    hookAndIntuition: "A tiny steel pebble sinks instantly in a bucket of water, yet a massive 100,000-ton steel aircraft carrier floats effortlessly on the ocean. The answer lies in Archimedes' Principle: buoyancy depends not on the weight of the object, but on the weight of the fluid it displaces!",
    conceptualExplanation: "Fluid statics investigates fluids at rest. Density ρ = m/V (kg/m³). Pressure P is force per unit area: P = F/A (Pascals or N/m²). In a fluid of density ρ under gravity, pressure increases linearly with depth h: P = ρgh (gauge pressure). Absolute pressure includes atmospheric pressure: P_total = P_atm + ρgh. Pascal's Principle states that pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and container walls: F₁/A₁ = F₂/A₂ (foundation of hydraulic lifts and brakes). Archimedes' Principle states that any body wholly or partially immersed in a fluid experiences an upward buoyant force equal to the weight of fluid displaced: F_b = ρ_fluid V_submerged g. By the Law of Flotation, a floating object displaces its own total weight in fluid.",
    keyTermsAndFormulas: [
      { termOrSymbol: "P = ρ g h", definition: "Hydrostatic pressure exerted by a fluid column of height h and density ρ.", practicalExample: "At 10 m ocean depth: P = 1025 kg/m³ × 9.8 m/s² × 10 m ≈ 100,450 Pa (≈ 1 atmosphere of water pressure)." },
      { termOrSymbol: "F₁ / A₁ = F₂ / A₂", definition: "Pascal's Law for hydraulic mechanical advantage.", practicalExample: "Applying 50 N on a piston of 0.01 m² lifts F₂ = 50 × (1.0 / 0.01) = 5,000 N on a 1.0 m² ram." },
      { termOrSymbol: "F_b = ρ_fluid V_sub g", definition: "Archimedes' buoyant upthrust force.", practicalExample: "A 0.02 m³ block fully submerged in water (1000 kg/m³) experiences upthrust F_b = 1000 × 0.02 × 9.8 = 196 N." }
    ],
    workedExamples: [
      {
        title: "Calculating Hydraulic Car Jack Lift Force",
        problemStatement: "A hydraulic jack has a small piston of radius r₁ = 2 cm and a large load piston of radius r₂ = 20 cm. If a technician applies a force of 150 N to the small piston, what maximum vehicle load can the large piston support?",
        steps: [
          { stepNumber: 1, instruction: "Calculate cross-sectional areas A₁ and A₂ of the circular pistons.", reasoning: "A₁ = π r₁² = π(0.02)² = 0.0004π m². A₂ = π r₂² = π(0.20)² = 0.04π m²." },
          { stepNumber: 2, instruction: "Find the hydraulic area multiplication ratio.", reasoning: "A₂ / A₁ = 0.04π / 0.0004π = 100." },
          { stepNumber: 3, instruction: "Apply Pascal's principle F₂ = F₁ × (A₂ / A₁).", reasoning: "F₂ = 150 N × 100 = 15,000 N." },
          { stepNumber: 4, instruction: "Interpret in terms of supported mass (g = 10 m/s²).", reasoning: "Mass = F₂ / g = 15,000 / 10 = 1,500 kg (a full passenger car)." }
        ],
        takeawayRule: "Force scales with the square of the radius ratio (r₂/r₁)² in hydraulic pistons."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking buoyant force increases the deeper an object sinks.", whyItIsWrong: "Once an object is fully submerged, its displaced volume V_sub does not change with further depth. Since liquids are virtually incompressible, ρ is constant, so buoyant force F_b = ρ V g remains constant at any depth.", correctCorrection: "Hydrostatic pressure increases with depth, but net buoyant force (the difference in pressure between top and bottom) stays constant once fully submerged." }
    ],
    guidedPracticePrompt: "A solid cube of wood of edge 10 cm and density 700 kg/m³ floats in water (1000 kg/m³). What fraction of its volume is submerged?",
    summaryRecap: "Hydrostatic pressure P = ρgh. Pascal's principle drives hydraulic multiplication. Buoyancy equals weight of displaced fluid (F_b = ρVg)."
  },

  "skill-phy-heat-capacity-gas-laws": {
    id: "les-phy-heat-capacity-gas-laws",
    title: "Thermal Physics, Specific Heat Capacity, & Ideal Gas Laws",
    hookAndIntuition: "Why does the sand at the beach scorch your bare feet at midday while the ocean water right beside it remains cool and refreshing? Both receive the exact same solar radiation, but water has a remarkably high heat capacity—it absorbs huge amounts of heat energy with only a modest rise in temperature.",
    conceptualExplanation: "Heat Q is thermal energy transferred between systems due to a temperature gradient. Specific Heat Capacity 'c' is the thermal energy needed to raise the temperature of 1 kg of a substance by 1 Kelvin (or 1°C): Q = mcΔT (J/(kg·K)). Specific Latent Heat 'l' is the energy required to change the phase of 1 kg of substance without changing temperature: Q = ml (fusion for solid-liquid; vaporization for liquid-gas). For gases, thermal behavior is governed by the Ideal Gas Law: PV = nRT = NkT, combining Boyle's Law (P ∝ 1/V at constant T), Charles's Law (V ∝ T at constant P), and Gay-Lussac's Law (P ∝ T at constant V), where temperature T MUST always be in absolute Kelvins (K = °C + 273.15).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Q = mcΔT", definition: "Heat transfer equation for temperature changes without phase change.", practicalExample: "Heating 2 kg of water (c = 4200 J/kg·K) by 10°C: Q = 2 × 4200 × 10 = 84,000 J (84 kJ)." },
      { termOrSymbol: "Q = ml", definition: "Latent heat formula for phase transitions (solid to liquid or liquid to vapor).", practicalExample: "Melting 0.5 kg of ice (l_f = 3.36 × 10⁵ J/kg): Q = 0.5 × 3.36 × 10⁵ = 168 kJ." },
      { termOrSymbol: "P₁V₁ / T₁ = P₂V₂ / T₂", definition: "Combined gas law relating pressure, volume, and absolute temperature.", practicalExample: "A gas at 300K doubled in volume at constant pressure reaches temperature T₂ = 600K." }
    ],
    workedExamples: [
      {
        title: "Thermal Equilibrium Method of Mixtures",
        problemStatement: "A 0.2 kg block of copper at 100°C is dropped into a thermally insulated cup containing 0.15 kg of water at 20°C. Given c_copper = 400 J/kg·K and c_water = 4200 J/kg·K, calculate the final equilibrium temperature T_f.",
        steps: [
          { stepNumber: 1, instruction: "Set up the thermal conservation equation: Heat lost by hot copper = Heat gained by cold water.", reasoning: "m_c c_c (T_initial_c - T_f) = m_w c_w (T_f - T_initial_w)." },
          { stepNumber: 2, instruction: "Substitute known numerical values.", reasoning: "0.2 × 400 × (100 - T_f) = 0.15 × 4200 × (T_f - 20) => 80(100 - T_f) = 630(T_f - 20)." },
          { stepNumber: 3, instruction: "Expand both sides.", reasoning: "8000 - 80 T_f = 630 T_f - 12600." },
          { stepNumber: 4, instruction: "Group like terms and solve for T_f.", reasoning: "710 T_f = 20600 => T_f = 20600 / 710 = 29.01°C." }
        ],
        takeawayRule: "In calorimeter problems, heat lost by cooling components must exactly equal heat gained by warming components."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using temperatures in Celsius (°C) directly in gas law equations.", whyItIsWrong: "Gas laws are derived from the kinetic theory of absolute molecular speeds, which drops to zero at 0 K (-273.15°C), not 0°C. Substituting Celsius produces completely false non-linear ratios.", correctCorrection: "Always convert Celsius to Kelvin (T_K = T_C + 273) before computing gas law formulas." }
    ],
    guidedPracticePrompt: "A gas occupies 2.0 L at 27°C and 1.0 atm. What volume does it occupy at 127°C and 2.0 atm?",
    summaryRecap: "Q = mcΔT governs temperature rise; Q = ml governs phase change. Always calculate gas equations using absolute temperature in Kelvin."
  },

  "skill-phy-induction-atomic-physics": {
    id: "les-phy-induction-atomic-physics",
    title: "Electromagnetic Induction, Photoelectric Effect, & Radioactivity",
    hookAndIntuition: "Virtually every lightbulb glowing on Earth owes its existence to an astonishing 1831 discovery by Michael Faraday: moving a magnet through a coil of copper wire spontaneously generates electric voltage! This single principle powers all hydroelectric dams, wind turbines, and power stations worldwide.",
    conceptualExplanation: "Faraday's Law states that the magnitude of induced electromotive force (EMF) is proportional to the rate of change of magnetic flux linkage: ε = -N (dΦ/dt). Lenz's Law (represented by the negative sign) states that the induced current flows in such a direction as to oppose the flux change that produced it (a direct consequence of energy conservation). In modern physics, Einstein explained the Photoelectric Effect by proposing that light consists of discrete energy packets called photons: E = hf. An electron is ejected from a metal surface if photon energy exceeds the metal's work function Φ: hf = Φ + KE_max. In nuclear physics, unstable nuclei decay via alpha (He nucleus), beta (high-speed electron/positron), or gamma (high-frequency EM photon) radiation according to the exponential half-life law: N(t) = N₀ (1/2)^(t / T_half).",
    keyTermsAndFormulas: [
      { termOrSymbol: "ε = -N (ΔΦ / Δt)", definition: "Faraday-Lenz Law of electromagnetic induction.", practicalExample: "Rotating a 500-turn coil across a 0.02 Wb flux change in 0.05 s induces ε = -500(0.02 / 0.05) = -200 V." },
      { termOrSymbol: "E = hf, hf = Φ + KE_max", definition: "Einstein's Photoelectric equation relating photon energy to work function and kinetic energy.", practicalExample: "If work function Φ = 2.0 eV and photon energy hf = 3.5 eV, ejected electron KE_max = 1.5 eV." },
      { termOrSymbol: "N(t) = N₀ (1/2)^(t / T_half)", definition: "Radioactive decay half-life equation.", practicalExample: "A 40g sample of isotope with half-life 6 hours decays to 40 × (1/2)³ = 5g after 18 hours (3 half-lives)." }
    ],
    workedExamples: [
      {
        title: "Photoelectric Threshold Frequency and Electron Emission",
        problemStatement: "A cesium metal surface has a work function Φ = 2.14 eV. If light of wavelength λ = 400 nm shines on the surface, determine: (a) the energy of the incident photons in eV, (b) the maximum kinetic energy of the emitted photoelectrons. (h = 6.63 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s, 1 eV = 1.6 × 10⁻¹⁹ J)",
        steps: [
          { stepNumber: 1, instruction: "Calculate the energy of the photon in Joules using E = hc / λ.", reasoning: "E = (6.63 × 10⁻³⁴ × 3 × 10⁸) / (400 × 10⁻⁹) = 1.989 × 10⁻²⁵ / 4 × 10⁻⁷ = 4.9725 × 10⁻¹⁹ J." },
          { stepNumber: 2, instruction: "Convert photon energy to electron-volts (eV).", reasoning: "E_eV = 4.9725 × 10⁻¹⁹ J / (1.6 × 10⁻¹⁹ J/eV) = 3.108 eV." },
          { stepNumber: 3, instruction: "Apply Einstein's equation KE_max = E - Φ.", reasoning: "KE_max = 3.108 eV - 2.140 eV = 0.968 eV." },
          { stepNumber: 4, instruction: "Verify that emission occurs.", reasoning: "Since photon energy (3.11 eV) > work function (2.14 eV), photoelectrons are emitted with maximum kinetic energy 0.968 eV." }
        ],
        takeawayRule: "Photoelectric emission occurs only if photon energy exceeds the work function (hf > Φ), independent of light intensity."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing increasing light intensity increases the speed or kinetic energy of ejected photoelectrons.", whyItIsWrong: "Intensity only increases the number of photons per second, increasing the quantity of emitted electrons (photocurrent). Kinetic energy depends solely on photon frequency f.", correctCorrection: "Higher frequency increases photoelectron kinetic energy; higher intensity increases photoelectron quantity." }
    ],
    guidedPracticePrompt: "A radioactive sample has an activity of 800 Bq. What is its activity after 4 half-lives?",
    summaryRecap: "Faraday-Lenz induction creates EMF from changing flux. Photons eject electrons when hf > Φ. Half-life governs radioactive decay."
  },

  // ==========================================
  // CHEMISTRY LESSONS
  // ==========================================
  "skill-chm-atomic-structure": {
    id: "les-chm-atomic-structure",
    title: "Atomic Structure, Isotopes, & Electron Configurations",
    hookAndIntuition: "Everything you can see, touch, and breathe—from the carbon in your DNA to the silicon in your phone—is constructed from just three subatomic building blocks: protons, neutrons, and electrons. How these particles are arranged dictates whether an element is a shiny conductive metal, an inert noble gas, or a reactive halogen.",
    conceptualExplanation: "An atom consists of a dense, positively charged nucleus containing protons (charge +1, mass 1 amu) and neutrons (charge 0, mass 1 amu), surrounded by electrons (charge -1, mass 1/1836 amu) occupying quantized orbital shells. The Atomic Number (Z) is the number of protons, which uniquely defines the chemical identity of the element. The Mass Number (A) is protons plus neutrons: A = Z + N. Isotopes are atoms of the same element with identical atomic numbers but different mass numbers due to varying neutron counts. Relative atomic mass (A_r) is the weighted average of isotopic masses based on natural abundance. Electrons fill orbitals according to the Aufbau Principle (lowest energy first), Hund's Rule (singly before pairing in degenerate orbitals), and the Pauli Exclusion Principle (opposite spins).",
    keyTermsAndFormulas: [
      { termOrSymbol: "A_r = Σ(Isotope Mass × % Abundance) / 100", definition: "Formula for calculating weighted average relative atomic mass from isotopes.", practicalExample: "Chlorine: 75% ³⁵Cl and 25% ³⁷Cl => A_r = (35 × 75 + 37 × 25) / 100 = 35.5 amu." },
      { termOrSymbol: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰", definition: "Standard electron orbital filling order (Aufbau sequence).", practicalExample: "Iron (Z = 26): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ or [Ar] 4s² 3d⁶." },
      { termOrSymbol: "Valence Electrons", definition: "Electrons in the outermost principal quantum shell that determine chemical bonding reactivity.", practicalExample: "Oxygen (Group 16) has 6 valence electrons (2s² 2p⁴) and forms 2 covalent bonds to satisfy octet." }
    ],
    workedExamples: [
      {
        title: "Calculating the Relative Atomic Mass of Magnesium",
        problemStatement: "Natural magnesium consists of three stable isotopes: ²⁴Mg (78.99% abundance, mass 23.985 amu), ²⁵Mg (10.00% abundance, mass 24.986 amu), and ²⁶Mg (11.01% abundance, mass 25.983 amu). Compute the relative atomic mass of magnesium to two decimal places.",
        steps: [
          { stepNumber: 1, instruction: "Multiply each isotopic mass by its percentage abundance.", reasoning: "Contribution ²⁴Mg = 23.985 × 78.99 = 1894.575; Contribution ²⁵Mg = 24.986 × 10.00 = 249.860; Contribution ²⁶Mg = 25.983 × 11.01 = 286.073." },
          { stepNumber: 2, instruction: "Sum the fractional mass contributions.", reasoning: "Total sum = 1894.575 + 249.860 + 286.073 = 2430.508." },
          { stepNumber: 3, instruction: "Divide by 100 to obtain the weighted average.", reasoning: "A_r = 2430.508 / 100 = 24.305 ≈ 24.31 amu." }
        ],
        takeawayRule: "Relative atomic mass is always a weighted average, which is why periodic table atomic masses are rarely whole numbers."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking 4s electrons are removed after 3d electrons when transition metals ionize.", whyItIsWrong: "Although 4s fills before 3d in neutral atoms, 4s electrons are situated in the outermost shell (n = 4). When iron forms Fe²⁺, it loses its two 4s electrons first!", correctCorrection: "For transition metal cations, always remove outermost 4s electrons before 3d electrons: Fe [Ar] 4s² 3d⁶ -> Fe²⁺ [Ar] 3d⁶." }
    ],
    guidedPracticePrompt: "Write the full spdf electron configuration for the sulfide ion S²⁻ (atomic number Z = 16).",
    summaryRecap: "Atomic number Z defines element identity; A = Z + N. A_r is isotopic weighted average. Electrons fill subshells according to Aufbau, Hund, and Pauli rules."
  },

  "skill-chm-mole-stoichiometry": {
    id: "les-chm-mole-stoichiometry",
    title: "The Mole Concept, Molar Mass, & Reaction Stoichiometry",
    hookAndIntuition: "Imagine trying to bake a cake by counting out individual grains of sugar and flour—it would take years! Chemists face the same challenge: atoms are too unimaginably tiny to weigh individually. The mole is the chemist's 'baker's dozen', grouping exactly 6.022 × 10²³ particles into one convenient, measurable unit.",
    conceptualExplanation: "One mole of any chemical substance contains Avogadro's constant N_A = 6.022 × 10²³ discrete formula units. The Molar Mass M (g/mol) is numerically equal to the relative formula mass of the substance. Three core mole formulas connect macro measurements to particle counts: (1) For mass: n = mass / MolarMass. (2) For solutions: n = C × V (where concentration C is in mol/dm³ and volume V is in dm³). (3) For gases at standard temperature and pressure (STP): n = Volume / 22.4 dm³ (or 24.0 dm³ at room temperature and pressure RTP). In stoichiometric calculations, balanced chemical equation coefficients dictate molar ratios between reactants and products.",
    keyTermsAndFormulas: [
      { termOrSymbol: "n = m / M", definition: "Mole-mass relation connecting moles n, mass m (grams), and molar mass M (g/mol).", practicalExample: "Moles in 88g of CO₂ (M = 44 g/mol): n = 88 / 44 = 2.0 mol." },
      { termOrSymbol: "n = C × V", definition: "Solution stoichiometry formula with concentration C (mol/dm³) and volume V (dm³).", practicalExample: "Moles of HCl in 250 cm³ (0.25 dm³) of 2 M solution: n = 2 × 0.25 = 0.50 mol." },
      { termOrSymbol: "Molar Gas Volume: V_STP = 22.4 dm³/mol", definition: "Volume occupied by one mole of any ideal gas at 0°C and 1 atm.", practicalExample: "Volume of 0.5 mol O₂ at STP = 0.5 × 22.4 = 11.2 dm³ (liters)." }
    ],
    workedExamples: [
      {
        title: "Limiting Reactant and Theoretical Yield of Water",
        problemStatement: "Hydrogen gas reacts with oxygen gas according to the equation: 2H₂(g) + O₂(g) -> 2H₂O(l). If 4.0 g of H₂ reacts with 48.0 g of O₂, determine: (a) the limiting reactant, (b) the theoretical mass of H₂O produced. (Molar masses: H₂ = 2.0 g/mol, O₂ = 32.0 g/mol, H₂O = 18.0 g/mol)",
        steps: [
          { stepNumber: 1, instruction: "Calculate moles of each available reactant.", reasoning: "n(H₂) = 4.0 g / 2.0 g/mol = 2.0 mol. n(O₂) = 48.0 g / 32.0 g/mol = 1.5 mol." },
          { stepNumber: 2, instruction: "Determine the stoichiometric requirement.", reasoning: "The mole ratio is 2 mol H₂ : 1 mol O₂. To completely react 2.0 mol of H₂, we require 2.0 / 2 = 1.0 mol of O₂." },
          { stepNumber: 3, instruction: "Identify the limiting reactant.", reasoning: "We have 1.5 mol of O₂ available, but only need 1.0 mol. Therefore, O₂ is in excess (0.5 mol excess) and H₂ is the limiting reactant." },
          { stepNumber: 4, instruction: "Calculate theoretical yield of H₂O based on limiting reactant H₂.", reasoning: "Ratio H₂ : H₂O is 2 : 2 (1 : 1). 2.0 mol of H₂ yields 2.0 mol of H₂O. Mass of H₂O = 2.0 mol × 18.0 g/mol = 36.0 grams." }
        ],
        takeawayRule: "Theoretical product yield is always dictated by the limiting reactant—the reactant that runs out first."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming the reactant with smaller initial mass is always the limiting reactant.", whyItIsWrong: "Limiting reactant status depends on moles and stoichiometric ratios, not raw mass. In our example, 4g of H₂ was 2 moles, while 48g of O₂ was only 1.5 moles.", correctCorrection: "Always convert masses to moles and divide by reaction coefficients before comparing." }
    ],
    guidedPracticePrompt: "What volume of CO₂ gas at STP is produced when 25 g of CaCO₃ (M = 100 g/mol) decomposes completely?",
    summaryRecap: "1 mol = 6.022 × 10²³ particles. n = m/M = CV = V_gas / 22.4. Limiting reactant dictates maximum theoretical yield."
  },

  "skill-chm-ph-titrations": {
    id: "les-chm-ph-titrations",
    title: "Acids, Bases, pH Scale, & Volumetric Titrations",
    hookAndIntuition: "From the corrosive battery acid in a car to the soothing antacid tablet that calms stomach heartburn, acid-base reactions govern daily chemistry. The pH scale provides a logarithmic yardstick to measure hydrogen ion activity, where a single unit change represents a 10-fold change in acidity!",
    conceptualExplanation: "According to the Brønsted-Lowry theory, an acid is a proton (H⁺) donor, while a base is a proton acceptor. Water autoionizes into hydronium and hydroxide ions: 2H₂O ⇌ H₃O⁺ + OH⁻, with ionic product K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C. The pH scale is defined as pH = -log₁₀[H⁺]. Acidic solutions have pH < 7, neutral pH = 7, and basic solutions pH > 7. A strong acid (e.g. HCl, HNO₃) dissociates completely in water, while a weak acid (e.g. CH₃COOH) establishes an equilibrium: K_a = [H⁺][A⁻]/[HA]. Volumetric titration determines the unknown concentration of an analyte by adding standard titrant until the equivalence point is reached, indicated by an indicator color change: C_a V_a / n_a = C_b V_b / n_b.",
    keyTermsAndFormulas: [
      { termOrSymbol: "pH = -log₁₀[H⁺], pOH = -log₁₀[OH⁻]", definition: "Logarithmic scale measuring hydrogen ion concentration; pH + pOH = 14.", practicalExample: "A 0.01 M HCl solution has [H⁺] = 10⁻² M => pH = -log(10⁻²) = 2.0." },
      { termOrSymbol: "C_a V_a / n_a = C_b V_b / n_b", definition: "Volumetric titration equation connecting acid and base molarities and volumes.", practicalExample: "Neutralizing 25 cm³ of NaOH with 20 cm³ of 0.1 M H₂SO₄ (n_a = 1, n_b = 2): C_b = (2 × 0.1 × 20) / 25 = 0.16 M." },
      { termOrSymbol: "Equivalence Point vs End Point", definition: "Equivalence point is theoretical stoichiometric neutrality; end point is observed indicator color transition.", practicalExample: "Methyl orange transitions at pH 3.1-4.4, ideal for strong acid vs weak base titrations." }
    ],
    workedExamples: [
      {
        title: "Standardizing Sodium Hydroxide using Oxalic Acid Titration",
        problemStatement: "A student titrates 25.0 cm³ of unknown sodium hydroxide solution (NaOH) using 0.050 mol/dm³ standard ethanedioic acid solution (H₂C₂O₄). The balanced equation is: H₂C₂O₄ + 2NaOH -> Na₂C₂O₄ + 2H₂O. The concordant titre volume of acid is 18.50 cm³. Calculate the concentration of the NaOH solution in mol/dm³ and g/dm³. (Molar mass NaOH = 40.0 g/mol)",
        steps: [
          { stepNumber: 1, instruction: "Calculate moles of standard ethanedioic acid used.", reasoning: "Volume V_a = 18.50 cm³ = 0.0185 dm³. Moles n_a = C_a × V_a = 0.050 × 0.0185 = 0.000925 mol." },
          { stepNumber: 2, instruction: "Determine moles of NaOH neutralized using the mole ratio 1 : 2.", reasoning: "n_b = 2 × n_a = 2 × 0.000925 = 0.00185 mol." },
          { stepNumber: 3, instruction: "Calculate molarity of NaOH in mol/dm³.", reasoning: "Volume V_b = 25.0 cm³ = 0.025 dm³. C_b = n_b / V_b = 0.00185 / 0.025 = 0.074 mol/dm³." },
          { stepNumber: 4, instruction: "Convert molarity to mass concentration in g/dm³.", reasoning: "Mass concentration = C_b × Molar Mass = 0.074 mol/dm³ × 40.0 g/mol = 2.96 g/dm³." }
        ],
        takeawayRule: "Always check the stoichiometric ratio: diprotic acids (like H₂SO₄ or H₂C₂O₄) require two moles of NaOH per mole of acid."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking the pH at the equivalence point of every titration is always exactly 7.0.", whyItIsWrong: "When a weak acid is titrated with a strong base (e.g. CH₃COOH + NaOH), the conjugate base salt formed (CH₃COONa) hydrolyzes water to produce OH⁻, making the equivalence pH basic (~8.8).", correctCorrection: "Equivalence pH = 7 only for strong acid vs strong base. Weak acid + strong base yields pH > 7; strong acid + weak base yields pH < 7." }
    ],
    guidedPracticePrompt: "What is the pH of a 0.005 mol/dm³ solution of sulfuric acid H₂SO₄, assuming complete dissociation?",
    summaryRecap: "pH = -log[H⁺]. Neutrality at 25°C is pH 7. Titrations match stoichiometric mole equivalence: C_aV_a/n_a = C_bV_b/n_b."
  },

  "skill-chm-redox": {
    id: "les-chm-redox",
    title: "Oxidation States, Half-Equations, & Redox Reactions",
    hookAndIntuition: "Why does an iron nail rust when left in the rain, while a lithium battery powers your smartphone? Both are redox processes: the continuous handover of electrons from one chemical species to another. Oxidation is the loss of electrons; reduction is the gain.",
    conceptualExplanation: "Redox (reduction-oxidation) involves electron transfer. Remember the mnemonic OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain of electrons. The reducing agent loses electrons and gets oxidized; the oxidizing agent gains electrons and gets reduced. Oxidation State is the hypothetical formal charge an atom would carry if all bonds were ionic. Key oxidation state rules: uncombined elements = 0, Group 1 = +1, Group 2 = +2, Oxygen = -2 (except peroxides = -1), Hydrogen = +1 (except hydrides = -1), sum of oxidation numbers in a neutral molecule = 0, in a polyatomic ion = ion charge. Complex redox equations are balanced using the ion-electron half-reaction method in acidic or alkaline conditions.",
    keyTermsAndFormulas: [
      { termOrSymbol: "OIL RIG", definition: "Oxidation Is Loss, Reduction Is Gain of electrons.", practicalExample: "Zn -> Zn²⁺ + 2e⁻ (Oxidation, loss of 2e⁻); Cu²⁺ + 2e⁻ -> Cu (Reduction, gain of 2e⁻)." },
      { termOrSymbol: "Oxidation Number Change", definition: "Increase in oxidation number = oxidation; decrease in oxidation number = reduction.", practicalExample: "In MnO₄⁻ -> Mn²⁺, manganese drops from +7 to +2 (reduction by 5 electrons)." },
      { termOrSymbol: "Electrochemical Cell EMF: E°_cell = E°_cathode - E°_anode", definition: "Standard cell potential measuring driving voltage.", practicalExample: "Zn-Cu Daniell Cell: E°_cell = +0.34 V - (-0.76 V) = +1.10 V (spontaneous)." }
    ],
    workedExamples: [
      {
        title: "Balancing the Dichromate-Iron(II) Redox Equation in Acid",
        problemStatement: "Balance the redox reaction between dichromate ions (Cr₂O₇²⁻) and iron(II) ions (Fe²⁺) in acidic solution to form Cr³⁺ and Fe³⁺.",
        steps: [
          { stepNumber: 1, instruction: "Write and balance the oxidation half-reaction.", reasoning: "Fe²⁺ -> Fe³⁺ + e⁻ (iron loses 1 electron)." },
          { stepNumber: 2, instruction: "Balance chromium and oxygen in the reduction half-reaction.", reasoning: "Cr₂O₇²⁻ -> 2Cr³⁺. Add 7 H₂O to balance oxygen: Cr₂O₇²⁻ -> 2Cr³⁺ + 7H₂O. Add 14 H⁺ to balance hydrogen: Cr₂O₇²⁻ + 14H⁺ -> 2Cr³⁺ + 7H₂O." },
          { stepNumber: 3, instruction: "Balance charge in the reduction half-reaction with electrons.", reasoning: "LHS charge = -2 + 14 = +12. RHS charge = 2(+3) = +6. Add 6e⁻ to LHS: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ -> 2Cr³⁺ + 7H₂O." },
          { stepNumber: 4, instruction: "Equalize electrons and add the half-reactions.", reasoning: "Multiply iron half-reaction by 6: 6Fe²⁺ -> 6Fe³⁺ + 6e⁻. Adding: Cr₂O₇²⁻ + 14H⁺ + 6Fe²⁺ -> 2Cr³⁺ + 6Fe³⁺ + 7H₂O." }
        ],
        takeawayRule: "Electrons must cancel completely when summing oxidation and reduction half-reactions."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Confusing the oxidizing agent with the substance oxidized.", whyItIsWrong: "The oxidizing agent GAINS electrons and gets reduced itself. The reducing agent loses electrons and gets oxidized.", correctCorrection: "Reducing agent = gets oxidized. Oxidizing agent = gets reduced." }
    ],
    guidedPracticePrompt: "Determine the oxidation state of sulfur in H₂SO₄, SO₃²⁻, and S₂O₃²⁻.",
    summaryRecap: "Oxidation is loss of electrons; reduction is gain. Balance complex redox via ion-electron half equations."
  },

  "skill-chm-bonding-vsepr-intermolecular": {
    id: "les-chm-bonding-vsepr-intermolecular",
    title: "Chemical Bonding, VSEPR Molecular Geometry, & Intermolecular Forces",
    hookAndIntuition: "Why is sodium chloride a brittle, high-melting solid, while water is a room-temperature liquid, and oxygen is a gas? The physical state and chemical personality of every substance is determined by the bonds holding its atoms together and the intermolecular forces holding its molecules together.",
    conceptualExplanation: "Atoms bond to achieve stable electronic configurations (typically the octet rule). Ionic bonding occurs between metals and non-metals via complete electron transfer, forming high-melting crystalline lattices held by electrostatic attraction. Covalent bonding occurs between non-metals sharing electron pairs. Valence Shell Electron Pair Repulsion (VSEPR) theory dictates that electron pairs around a central atom repel each other and position themselves as far apart as possible in 3D space: 2 electron domains -> Linear (180°); 3 domains -> Trigonal planar (120°); 4 domains -> Tetrahedral (109.5°). Lone pairs exert greater repulsion than bonding pairs, compressing bond angles (e.g. NH₃ with 1 lone pair = 107°; H₂O with 2 lone pairs = 104.5°). Intermolecular forces dictate boiling points: London dispersion forces (weakest, in all molecules), dipole-dipole attractions (polar molecules), and hydrogen bonding (strongest, occurring when H is bonded to N, O, or F).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Ionic vs Covalent", definition: "Ionic = electron transfer between ions; Covalent = shared electron pairs between non-metals.", practicalExample: "NaCl is ionic (melting point 801°C); CH₄ is non-polar covalent (gas at room temp)." },
      { termOrSymbol: "VSEPR Geometries", definition: "Linear (180°), Trigonal Planar (120°), Tetrahedral (109.5°), Pyramidal (107°), Bent (104.5°).", practicalExample: "Methane CH₄ is tetrahedral; Ammonia NH₃ is trigonal pyramidal; Water H₂O is bent." },
      { termOrSymbol: "Hydrogen Bonding", definition: "Strong dipole attraction between H bonded to N, O, or F and a lone pair on an adjacent molecule.", practicalExample: "Explains why water (H₂O, bp 100°C) is liquid while heavier H₂S (bp -60°C) is a gas." }
    ],
    workedExamples: [
      {
        title: "Predicting Molecular Geometry and Polarity of Ammonia (NH₃)",
        problemStatement: "Determine the Lewis structure, VSEPR electron domain geometry, molecular shape, and overall polarity of ammonia (NH₃).",
        steps: [
          { stepNumber: 1, instruction: "Count total valence electrons.", reasoning: "Nitrogen has 5 valence electrons. Three Hydrogens contribute 3 × 1 = 3 electrons. Total = 8 valence electrons (4 pairs)." },
          { stepNumber: 2, instruction: "Arrange bonds and lone pairs around nitrogen.", reasoning: "Form 3 single N-H bonds (6 electrons). The remaining 2 electrons form 1 lone pair on Nitrogen." },
          { stepNumber: 3, instruction: "Determine electron domain geometry and molecular shape.", reasoning: "4 total electron domains give a tetrahedral electron geometry. With 3 bonding pairs and 1 lone pair, the molecular shape is Trigonal Pyramidal with bond angle compressed to ~107°." },
          { stepNumber: 4, instruction: "Evaluate molecular polarity.", reasoning: "N is more electronegative than H (ΔEN ≈ 0.9), creating polar bonds. The pyramidal shape is asymmetric, so the bond dipoles do not cancel, giving NH₃ a net molecular dipole moment (it is polar)." }
        ],
        takeawayRule: "Molecular shape is determined by atom positions, while electron geometry accounts for all electron domains including lone pairs."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking carbon dioxide (CO₂) is polar because C=O bonds are polar.", whyItIsWrong: "CO₂ has a linear geometry (O=C=O, 180°). The two equal bond dipoles pull in exactly opposite directions and cancel out completely, leaving CO₂ with zero net dipole moment.", correctCorrection: "A molecule with polar bonds can be non-polar overall if its geometry is completely symmetrical (e.g. CO₂, CCl₄, BF₃)." }
    ],
    guidedPracticePrompt: "Explain why water (H₂O) has a bent shape with a bond angle of 104.5° instead of 109.5°.",
    summaryRecap: "VSEPR predicts 3D molecular shapes from electron repulsion. Lone pairs compress bond angles. Hydrogen bonding produces exceptionally high boiling points."
  },

  "skill-chm-enthalpy-hess-calorimetry": {
    id: "les-chm-enthalpy-hess-calorimetry",
    title: "Thermochemistry, Enthalpy Changes, & Hess's Law",
    hookAndIntuition: "When you strike a match, stored chemical energy erupts as blistering heat and light—an exothermic reaction. Conversely, when you crack an instant chemical ice pack, it turns freezing cold within seconds by sucking heat out of its surroundings—an endothermic reaction. Thermochemistry measures these exact energy exchanges.",
    conceptualExplanation: "Enthalpy H is the heat content of a chemical system at constant pressure. The enthalpy change ΔH = H_products - H_reactants. If ΔH < 0, the reaction is Exothermic (releases heat to surroundings, container feels hot). If ΔH > 0, the reaction is Endothermic (absorbs heat from surroundings, container feels cold). Calorimetry measures heat transferred using q = mcΔT, leading to ΔH = -q / n. Hess's Law of Constant Heat Summation states that the total enthalpy change for a chemical reaction is independent of the pathway taken, depending only on the initial and final states: ΔH_reaction = Σ ΔH_f(products) - Σ ΔH_f(reactants). Bond enthalpy calculations estimate ΔH: ΔH = Σ (Bonds Broken) - Σ (Bonds Formed).",
    keyTermsAndFormulas: [
      { termOrSymbol: "q = mcΔT", definition: "Calorimetry heat equation connecting water mass m, specific heat c, and temperature change.", practicalExample: "A reaction warming 100g water by 5°C releases q = 100 × 4.184 × 5 = 2092 J (2.092 kJ)." },
      { termOrSymbol: "ΔH_reaction = Σ ΔH_f°(products) - Σ ΔH_f°(reactants)", definition: "Standard enthalpy of reaction using standard enthalpies of formation.", practicalExample: "Combustion of methane: ΔH = [ΔH_f(CO₂) + 2ΔH_f(H₂O)] - [ΔH_f(CH₄) + 0]." },
      { termOrSymbol: "ΔH = Σ(Bond Energies Broken) - Σ(Bond Energies Formed)", definition: "Estimation of enthalpy change using average covalent bond dissociation energies.", practicalExample: "Breaking strong bonds consumes energy (+); forming stable bonds releases energy (-)." }
    ],
    workedExamples: [
      {
        title: "Applying Hess's Law to Calculate Enthalpy of Formation of Methane",
        problemStatement: "Given the standard enthalpies of combustion: (1) C(s) + O₂(g) -> CO₂(g), ΔH₁ = -393.5 kJ/mol; (2) H₂(g) + 0.5O₂(g) -> H₂O(l), ΔH₂ = -285.8 kJ/mol; (3) CH₄(g) + 2O₂(g) -> CO₂(g) + 2H₂O(l), ΔH₃ = -890.3 kJ/mol. Calculate the standard enthalpy of formation of methane: C(s) + 2H₂(g) -> CH₄(g).",
        steps: [
          { stepNumber: 1, instruction: "Align Target Equation: C(s) + 2H₂(g) -> CH₄(g).", reasoning: "We need 1 C(s) on the LHS, 2 H₂(g) on the LHS, and 1 CH₄(g) on the RHS." },
          { stepNumber: 2, instruction: "Manipulate given intermediate reactions.", reasoning: "Keep Reaction 1 as is: C + O₂ -> CO₂, ΔH = -393.5 kJ. Multiply Reaction 2 by 2: 2H₂ + O₂ -> 2H₂O, ΔH = 2(-285.8) = -571.6 kJ. Reverse Reaction 3: CO₂ + 2H₂O -> CH₄ + 2O₂, ΔH = +890.3 kJ." },
          { stepNumber: 3, instruction: "Sum the manipulated equations and cancel identical species.", reasoning: "C + O₂ + 2H₂ + O₂ + CO₂ + 2H₂O -> CO₂ + 2H₂O + CH₄ + 2O₂. Oxygen, CO₂, and H₂O cancel, leaving C(s) + 2H₂(g) -> CH₄(g)." },
          { stepNumber: 4, instruction: "Sum the corresponding enthalpy changes.", reasoning: "ΔH_f = -393.5 + (-571.6) + 890.3 = -965.1 + 890.3 = -74.8 kJ/mol." }
        ],
        takeawayRule: "When reversing a reaction, flip the sign of ΔH. When multiplying coefficients by factor n, multiply ΔH by n."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing that breaking chemical bonds releases energy.", whyItIsWrong: "Breaking bonds ALWAYS requires energy input (endothermic, ΔH > 0). Energy is released when NEW, more stable bonds are formed (exothermic, ΔH < 0).", correctCorrection: "Bond breaking is Endothermic (+); Bond forming is Exothermic (-)." }
    ],
    guidedPracticePrompt: "Calculate the heat released when 2.3 g of ethanol (C₂H₅OH, M = 46 g/mol, ΔH_comb = -1367 kJ/mol) burns completely.",
    summaryRecap: "Exothermic releases heat (ΔH < 0); endothermic absorbs heat (ΔH > 0). Hess's Law states enthalpy change is path-independent."
  },

  "skill-chm-collision-theory-le-chatelier": {
    id: "les-chm-collision-theory-le-chatelier",
    title: "Reaction Kinetics, Collision Theory, & Le Chatelier's Principle",
    hookAndIntuition: "Why does food spoil in hours on a hot tropical afternoon but stay fresh for weeks in a deep freezer? Chemical reaction rates are governed by molecular collisions: chilling food slows molecules down, dropping their collision energy below the critical activation threshold needed for decay reactions.",
    conceptualExplanation: "Collision Theory dictates that chemical reactions occur only when reacting particles collide with: (1) correct geometric orientation, and (2) kinetic energy equal to or exceeding the Activation Energy E_a. Reaction rates increase with: higher concentration/pressure (more collisions per second), higher temperature (exponentially increases fraction of collisions with E ≥ E_a), greater surface area, and catalysts (which lower E_a by providing an alternative reaction pathway without being consumed). When a reversible reaction reaches Dynamic Equilibrium, forward and reverse reaction rates are equal, and reactant/product concentrations remain constant. Le Chatelier's Principle states that if a dynamic equilibrium system is subjected to a disturbance (change in concentration, temperature, or pressure), the system shifts its equilibrium position to counteract that disturbance.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Activation Energy E_a", definition: "Minimum kinetic energy required for colliding particles to form the transition state.", practicalExample: "Catalysts lower E_a, accelerating reaction rates by thousands of times." },
      { termOrSymbol: "Dynamic Equilibrium: Rate_forward = Rate_reverse", definition: "State where opposing reactions proceed at identical rates with unchanging concentrations.", practicalExample: "Haber Process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92 kJ/mol." },
      { termOrSymbol: "Le Chatelier's Rules", definition: "Increasing temperature favors endothermic direction; increasing pressure favors side with fewer gas moles.", practicalExample: "In Haber process, high pressure (200 atm) shifts equilibrium toward NH₃ (4 gas moles -> 2 gas moles)." }
    ],
    workedExamples: [
      {
        title: "Predicting Equilibrium Shifts in the Haber Ammonia Synthesis",
        problemStatement: "For the industrial Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92 kJ/mol. Predict and explain the effect on the equilibrium yield of ammonia of: (a) Increasing total pressure, (b) Increasing temperature, (c) Adding an iron catalyst.",
        steps: [
          { stepNumber: 1, instruction: "Analyze the pressure disturbance.", reasoning: "Count gas moles: LHS = 1 N₂ + 3 H₂ = 4 moles of gas; RHS = 2 moles of NH₃. By Le Chatelier's Principle, increasing pressure causes the system to relieve pressure by shifting toward the side with fewer gas moles (to the right). Ammonia yield increases." },
          { stepNumber: 2, instruction: "Analyze the temperature disturbance.", reasoning: "The forward reaction is exothermic (ΔH = -92 kJ/mol, releases heat). By Le Chatelier's Principle, increasing temperature causes the system to absorb heat by shifting in the endothermic reverse direction (to the left). Ammonia yield decreases." },
          { stepNumber: 3, instruction: "Analyze the catalyst addition.", reasoning: "A catalyst speeds up both forward and reverse reactions by lowering activation energy equally. It accelerates the rate at which equilibrium is attained, but does NOT shift equilibrium position or change final yield." }
        ],
        takeawayRule: "Catalysts accelerate equilibrium attainment but never alter equilibrium position or product yield."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking dynamic equilibrium means concentrations of reactants and products are equal.", whyItIsWrong: "Equilibrium means the RATES of forward and reverse reactions are equal. Concentrations can be vastly unequal depending on the equilibrium constant K_c.", correctCorrection: "Equilibrium = Equal rates, Constant (not equal) concentrations." }
    ],
    guidedPracticePrompt: "For the endothermic reaction 2NO₂(g) [brown] ⇌ N₂O₄(g) [colorless] (ΔH < 0), what color change occurs upon cooling?",
    summaryRecap: "Collision theory requires E ≥ E_a with correct orientation. Le Chatelier's Principle shifts equilibrium to oppose applied stresses."
  },

  "skill-chm-hydrocarbons-functional-groups": {
    id: "les-chm-hydrocarbons-functional-groups",
    title: "Organic Chemistry, Hydrocarbons, & Functional Group Reactions",
    hookAndIntuition: "Why is carbon the unique scaffolding element of all living organisms? Because carbon has a miraculous ability called catenation: its four valence electrons allow it to form enduring, stable covalent bonds with other carbon atoms, building endless chains, rings, double bonds, and complex molecular architectures.",
    conceptualExplanation: "Hydrocarbons contain only hydrogen and carbon. Alkanes (C_n H_{2n+2}) are saturated hydrocarbons with single C-C bonds, undergoing free-radical substitution reactions. Alkenes (C_n H_{2n}) contain reactive C=C double bonds, undergoing electrophilic addition reactions (tested by decolourizing bromine water from orange-brown to colorless). Alkynes (C_n H_{2n-2}) contain C≡C triple bonds. Functional groups define organic chemical families: Alcohols (-OH, undergo oxidation and esterification), Carboxylic Acids (-COOH, weak organic acids), Esters (-COO-, sweet fruity fragrances), and Haloalkanes (-X, undergo nucleophilic substitution). Homologous series share the same general formula, exhibit similar chemical properties, and show gradation in physical properties (such as boiling point) as molecular mass increases.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Alkanes (C_n H_{2n+2}), Alkenes (C_n H_{2n})", definition: "Fundamental homologous series of saturated and unsaturated hydrocarbons.", practicalExample: "Ethane C₂H₆ is saturated; Ethene C₂H₄ is unsaturated and undergoes polymerization to polythene." },
      { termOrSymbol: "Esterification: Acid + Alcohol ⇌ Ester + Water", definition: "Condensation reaction catalyzed by concentrated H₂SO₄.", practicalExample: "Ethanoic acid + Ethanol ⇌ Ethyl ethanoate (fruity nail polish remover scent) + H₂O." },
      { termOrSymbol: "Markovnikov's Rule", definition: "In addition of HX to asymmetric alkenes, H bonds to the carbon with more attached hydrogens ('the rich get richer').", practicalExample: "Propene + HBr yields 2-bromopropane as major product." }
    ],
    workedExamples: [
      {
        title: "Differentiating Ethane and Ethene via Chemical Test",
        problemStatement: "A chemistry laboratory technician has two unlabelled gas cylinders containing ethane (C₂H₆) and ethene (C₂H₄). Describe a definitive chemical test to distinguish between them, including observations and reaction equations.",
        steps: [
          { stepNumber: 1, instruction: "Select the chemical reagent.", reasoning: "Bromine water (aqueous Br₂, orange-brown color) or acidified potassium manganate(VII) solution." },
          { stepNumber: 2, instruction: "State the test procedure.", reasoning: "Bubble each gas through a test tube containing bromine water at room temperature in the dark." },
          { stepNumber: 3, instruction: "Predict observations for ethene (unsaturated alkene).", reasoning: "Ethene rapidly decolourizes bromine water from orange-brown to colorless due to electrophilic addition across the double bond: C₂H₄ + Br₂ -> CH₂Br-CH₂Br (1,2-dibromoethane)." },
          { stepNumber: 4, instruction: "Predict observations for ethane (saturated alkane).", reasoning: "Ethane does not react with bromine water in the dark; the solution remains orange-brown (alkanes require UV light for slow substitution)." }
        ],
        takeawayRule: "Bromine water decolourization is the classic qualitative diagnostic test for unsaturation (C=C double bonds)."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking ethanol (CH₃CH₂OH) acts as an alkaline base because of the -OH group.", whyItIsWrong: "The -OH in alcohols is covalently bonded (hydroxy group), not an ionic hydroxide ion (OH⁻). Pure ethanol is neutral (pH = 7) and does not turn red litmus blue.", correctCorrection: "Alcohols contain neutral covalent -OH groups, not ionic basic OH⁻ hydroxide ions." }
    ],
    guidedPracticePrompt: "Name the ester produced by reacting propanoic acid with methanol, and draw its structural formula.",
    summaryRecap: "Alkanes are saturated (substitution); alkenes are unsaturated (addition, decolourizes Br₂). Functional groups dictate organic chemical reactivity."
  },

  // ==========================================
  // BIOLOGY LESSONS
  // ==========================================
  "skill-bio-cell-structure": {
    id: "les-bio-cell-structure",
    title: "Prokaryotic vs Eukaryotic Cell Ultrastructure & Organelles",
    hookAndIntuition: "Look at the tip of your finger. It contains billions of microscopic biological factories, each operating round-the-clock with automated power plants, genetic master blueprints, protein manufacturing lines, and security borders. This miniature metropolis is the cell—the fundamental unit of all life on Earth.",
    conceptualExplanation: "All living organisms are composed of cells. Prokaryotic cells (bacteria and archaea) are simple, primitive cells lacking a membrane-bound nucleus and membrane-bound organelles, storing naked circular DNA in a nucleoid region. Eukaryotic cells (plants, animals, fungi, protists) possess compartmentalized membrane-bound organelles and a distinct nucleus enclosing linear chromosomes packaged with histones. Key organelles include: Nucleus (stores genetic DNA and directs transcription), Mitochondria ('powerhouse' generating ATP via aerobic cellular respiration), Ribosomes (synthesize polypeptides from mRNA), Endoplasmic Reticulum (rough ER folds proteins; smooth ER synthesizes lipids), Golgi Apparatus (modifies, sorts, and packages proteins for secretion), Chloroplasts (in plant cells, conduct photosynthesis using chlorophyll), and Large Central Vacuole (maintains plant turgor pressure).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Prokaryote vs Eukaryote", definition: "Prokaryote lacks membrane-bound nucleus (bacteria); Eukaryote possesses nucleus and compartmentalized organelles.", practicalExample: "E. coli is a prokaryote; human muscle cells and amoebas are eukaryotes." },
      { termOrSymbol: "Endosymbiotic Theory", definition: "Mitochondria and chloroplasts evolved from engulfed ancestral prokaryotic bacteria, evidenced by their own 70S ribosomes and circular DNA.", practicalExample: "Mitochondria divide independently inside human cells via binary fission." },
      { termOrSymbol: "Magnification = Image Size / Real Size (M = I / A)", definition: "Light and electron microscopy resolution formula.", practicalExample: "An organelle measuring 20 mm on a micrograph with magnification ×2000 has real size A = 20 / 2000 = 0.01 mm = 10 µm." }
    ],
    workedExamples: [
      {
        title: "Calculating Actual Cell Diameter from a Light Micrograph",
        problemStatement: "A student views a human cheek epithelial cell under a light microscope. On the captured photomicrograph, the cell diameter measures 48 mm. If the total magnification is ×800, calculate the actual diameter of the cell in micrometers (µm).",
        steps: [
          { stepNumber: 1, instruction: "State the magnification formula: Actual size A = Image size I / Magnification M.", reasoning: "A = I / M." },
          { stepNumber: 2, instruction: "Convert image size from millimeters to micrometers.", reasoning: "1 mm = 1000 µm. Image size I = 48 mm × 1000 = 48,000 µm." },
          { stepNumber: 3, instruction: "Divide by magnification M = 800.", reasoning: "A = 48,000 µm / 800 = 60 µm." },
          { stepNumber: 4, instruction: "Verify biological realism.", reasoning: "Typical human animal cells measure between 10 µm and 100 µm, so 60 µm is fully consistent." }
        ],
        takeawayRule: "Always convert millimeter measurements to micrometers (×1000) before calculating microscopy problems."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking plant cells have cell walls and chloroplasts instead of a cell membrane and mitochondria.", whyItIsWrong: "Plant cells have BOTH a cell membrane AND a cellulose cell wall. They also have BOTH mitochondria (for respiration day and night) AND chloroplasts (for daytime photosynthesis).", correctCorrection: "Plant cells possess cell walls AND cell membranes, as well as mitochondria AND chloroplasts." }
    ],
    guidedPracticePrompt: "Name three structural differences between an animal cell and a plant cell.",
    summaryRecap: "Prokaryotes lack membrane-bound nuclei; eukaryotes are compartmentalized. Mitochondria generate ATP; ribosomes synthesize proteins. M = I/A."
  },

  "skill-bio-genetics": {
    id: "les-bio-genetics",
    title: "Mendelian Genetics, Monohybrid Crosses, & Punnett Squares",
    hookAndIntuition: "Why do two brown-eyed parents occasionally produce a blue-eyed child? In the 1860s, an Augustinian monk named Gregor Mendel unlocked the secret of heredity by breeding pea plants in his monastery garden, proving that traits are inherited as discrete particulate factors—what we now call genes.",
    conceptualExplanation: "A gene is a section of DNA encoding a specific functional polypeptide. Alleles are alternative forms of the same gene occupying the same locus on homologous chromosomes. Genotype is the genetic makeup (allele combination, e.g. BB, Bb, bb); Phenotype is the observable physical expression (e.g. brown eyes). A Dominant allele masks the expression of a Recessive allele in a heterozygote. An individual is Homozygous if they carry identical alleles (BB or bb) and Heterozygous if they carry different alleles (Bb). In a Mendelian monohybrid cross between two heterozygous individuals (Bb × Bb), the resulting genotypic ratio is 1 BB : 2 Bb : 1 bb (1 : 2 : 1), producing a classic 3 dominant : 1 recessive (3 : 1) phenotypic ratio.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Monohybrid Cross (Bb × Bb -> 3 : 1)", definition: "Inheritance of a single gene trait yielding 75% dominant and 25% recessive phenotypes.", practicalExample: "Crossing two heterozygous tall pea plants (Tt × Tt) yields 3 tall : 1 short offspring." },
      { termOrSymbol: "Test Cross", definition: "Breeding an individual showing dominant phenotype with a homozygous recessive individual to deduce unknown genotype.", practicalExample: "If an unknown black sheep crossed with a white sheep (bb) produces any white offspring, the black parent was heterozygous (Bb)." },
      { termOrSymbol: "Law of Segregation", definition: "Mendel's First Law: the two alleles for each gene segregate during meiosis into separate gametes.", practicalExample: "A heterozygous Bb parent produces 50% B gametes and 50% b gametes." }
    ],
    workedExamples: [
      {
        title: "Predicting Cystic Fibrosis Inheritance in a Family Pedigree",
        problemStatement: "Cystic fibrosis is an autosomal recessive genetic disorder caused by a mutant allele 'c'. Two unaffected carrier parents (both heterozygous Cc) plan to have a child. Determine: (a) the probability that their child will have cystic fibrosis, (b) the probability that their child will be an unaffected carrier.",
        steps: [
          { stepNumber: 1, instruction: "Determine parental genotypes and gametes.", reasoning: "Parent 1: Cc (produces 50% C, 50% c). Parent 2: Cc (produces 50% C, 50% c)." },
          { stepNumber: 2, instruction: "Construct a 2x2 Punnett square.", reasoning: "Top: C, c. Left: C, c. Offspring combinations: CC (top-left), Cc (top-right), Cc (bottom-left), cc (bottom-right)." },
          { stepNumber: 3, instruction: "Calculate probability of affected child (cc genotype).", reasoning: "1 out of 4 squares has genotype cc => Probability = 1/4 = 25% (0.25)." },
          { stepNumber: 4, instruction: "Calculate probability of carrier child (Cc genotype).", reasoning: "2 out of 4 squares have genotype Cc => Probability = 2/4 = 1/2 = 50% (0.50)." }
        ],
        takeawayRule: "In autosomal recessive crosses between two carriers, each pregnancy has an independent 25% risk of affected offspring and 50% chance of carrier offspring."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming that if a carrier couple's first child has cystic fibrosis, their next three children are guaranteed to be healthy.", whyItIsWrong: "Each fertilization event is an independent statistical trial. The probability remains 1 in 4 (25%) for EVERY child, regardless of previous births.", correctCorrection: "Probability has no memory; each birth carries an independent 25% risk." }
    ],
    guidedPracticePrompt: "What phenotypic ratio results from crossing a heterozygous purple flower (Pp) with a homozygous white flower (pp)?",
    summaryRecap: "Alleles segregate during meiosis. Monohybrid cross Bb × Bb yields 1:2:1 genotypic and 3:1 phenotypic ratios. Test cross reveals unknown genotypes."
  },

  "skill-bio-enzymes-respiration": {
    id: "les-bio-enzymes-respiration",
    title: "Enzyme Kinetics, Active Sites, & Cellular Respiration",
    hookAndIntuition: "If you leave a sugar cube on a kitchen table, it would take years to spontaneously combust into carbon dioxide and water. Yet inside your cells, that exact same sugar molecule is dismantled in milliseconds at gentle body temperature. How? Enzymes: nature's precision biological catalysts.",
    conceptualExplanation: "Enzymes are globular proteins that accelerate biological reactions without being consumed, by lowering activation energy E_a. The substrate binds to a specific three-dimensional cleft called the Active Site via the Induced Fit mechanism, forming an Enzyme-Substrate Complex. Enzyme activity is influenced by: Temperature (rate doubles roughly every 10°C until optimum ~37°C in humans, above which thermal vibration denatures the active site), pH (each enzyme has an optimal pH, e.g. pepsin pH 2, trypsin pH 8), and Substrate Concentration (rate increases until all active sites are saturated at V_max). Cellular Respiration releases chemical energy from glucose to synthesize ATP. Aerobic respiration (requires oxygen) occurs in three stages: Glycolysis (cytoplasm, produces 2 ATP), Krebs Cycle (mitochondrial matrix, produces 2 ATP, NADH, FADH₂), and Oxidative Phosphorylation / Electron Transport Chain (inner mitochondrial cristae, generates ~32-34 ATP): C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + 36-38 ATP. Anaerobic respiration (fermentation) occurs without oxygen, producing lactate in animals or ethanol + CO₂ in yeast, yielding only 2 ATP per glucose.",
    keyTermsAndFormulas: [
      { termOrSymbol: "C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + ATP", definition: "Overall chemical equation for aerobic cellular respiration.", practicalExample: "One mole of glucose (~180g) yields ~36-38 moles of ATP under full aerobic breakdown." },
      { termOrSymbol: "Enzyme Denaturation", definition: "Irreversible loss of tertiary protein structure and active site conformation caused by extreme heat or pH.", practicalExample: "Cooking an egg denatures liquid albumin protein into solid white." },
      { termOrSymbol: "Aerobic vs Anaerobic ATP Yield", definition: "Aerobic yields ~36-38 ATP per glucose; Anaerobic yields only 2 net ATP via glycolysis.", practicalExample: "During intense sprints, muscle cells switch to anaerobic glycolysis, accumulating lactate." }
    ],
    workedExamples: [
      {
        title: "Calculating Respiratory Quotient (RQ) for Lipid vs Carbohydrate",
        problemStatement: "The Respiratory Quotient is defined as RQ = Volume of CO₂ produced / Volume of O₂ consumed. (a) Calculate the RQ for glucose oxidation: C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O. (b) Calculate the RQ for tripalmitin lipid oxidation: 2C₅₁H₉₈O₆ + 145O₂ -> 102CO₂ + 98H₂O.",
        steps: [
          { stepNumber: 1, instruction: "Calculate RQ for glucose.", reasoning: "RQ_glucose = 6 mol CO₂ / 6 mol O₂ = 1.0." },
          { stepNumber: 2, instruction: "Calculate RQ for tripalmitin lipid.", reasoning: "RQ_lipid = 102 mol CO₂ / 145 mol O₂ = 0.703 ≈ 0.70." },
          { stepNumber: 3, instruction: "Interpret the physiological significance.", reasoning: "An RQ of 1.0 indicates pure carbohydrate metabolism; an RQ around 0.7 indicates pure lipid metabolism; an intermediate RQ (~0.85) indicates mixed nutrient utilization." }
        ],
        takeawayRule: "Carbohydrates have an RQ of 1.0; fats/lipids have an RQ of ~0.7 because their lower oxygen content requires more oxygen for combustion."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking enzymes are 'killed' by high temperatures.", whyItIsWrong: "Enzymes are non-living protein molecules, not organisms; they cannot be killed. High heat causes increased kinetic vibration that breaks hydrogen and ionic bonds, causing the active site to denature (unfold).", correctCorrection: "Use the term 'denatured', never 'killed', when describing enzyme inactivation." }
    ],
    guidedPracticePrompt: "Explain why anaerobic respiration yields only 2 ATP per glucose while aerobic respiration yields ~36 ATP.",
    summaryRecap: "Enzymes lower E_a via induced fit at active sites. Aerobic respiration yields ~36-38 ATP in mitochondria; anaerobic yields only 2 ATP in cytoplasm."
  },

  "skill-bio-ecology-cycles": {
    id: "les-bio-ecology-cycles",
    title: "Ecosystem Dynamics, Energy Pyramids, & Biogeochemical Cycles",
    hookAndIntuition: "Every breath you inhale contains atoms of carbon that once belonged to a dinosaur 100 million years ago, a cedar tree in ancient Lebanon, or a diatom floating in the prehistoric ocean. In ecosystems, energy flows in one direction and escapes as heat, but matter is recycled forever.",
    conceptualExplanation: "An ecosystem comprises biotic communities interacting with abiotic factors. Autotrophs (producers) convert solar energy into chemical bond energy via photosynthesis. Heterotrophs (consumers) obtain energy by feeding: Primary consumers (herbivores), Secondary/Tertiary consumers (carnivores/omnivores), and Decomposers/Detritivores (bacteria and fungi recycling dead organic matter). Energy flow through trophic levels follows the 10% Rule: roughly 90% of energy at each trophic level is lost as metabolic heat, respiration, excretion, and unconsumed biomass; only ~10% is incorporated into new biomass for the next level. This sharp energy drop limits food chains to 4-5 trophic levels. Matter is conserved through Biogeochemical Cycles: Carbon Cycle (photosynthesis fixes atmospheric CO₂; respiration, combustion, and decomposition return CO₂), and Nitrogen Cycle (nitrogen fixation by Rhizobium/lightning, nitrification by Nitrosomonas and Nitrobacter, assimilation, and denitrification by Pseudomonas returning N₂ to air).",
    keyTermsAndFormulas: [
      { termOrSymbol: "10% Energy Transfer Law", definition: "Only approximately 10% of energy at one trophic level is transferred to the next higher level.", practicalExample: "10,000 kJ of corn supports 1,000 kJ of herbivorous cattle, which supports 100 kJ of human carnivore biomass." },
      { termOrSymbol: "Pyramid of Numbers vs Biomass vs Energy", definition: "Pyramids of energy are always upright; pyramids of numbers or biomass can be inverted (e.g. 1 oak tree supporting thousands of insects).", practicalExample: "Energy pyramids are universally upright because energy is lost as heat at every transition." },
      { termOrSymbol: "Nitrogen Fixation & Nitrification", definition: "Fixation: N₂ -> NH₄⁺; Nitrification: NH₄⁺ -> NO₂⁻ -> NO₃⁻ (absorbable nitrate ions for plant roots).", practicalExample: "Legume root nodules harbor symbiotic Rhizobium bacteria to enrich soil fertility naturally." }
    ],
    workedExamples: [
      {
        title: "Trophic Level Energy Efficiency Calculation",
        problemStatement: "A savanna grassland ecosystem captures 2,500,000 kJ of solar energy into net primary plant production. (a) How much energy is available to primary consumers (herbivorous zebras)? (b) How much energy is transferred to apex predators (lions)?",
        steps: [
          { stepNumber: 1, instruction: "Apply the 10% rule to calculate energy at the primary consumer level.", reasoning: "Energy to zebras = 10% of 2,500,000 kJ = 0.10 × 2,500,000 = 250,000 kJ." },
          { stepNumber: 2, instruction: "Apply the 10% rule to calculate energy at the secondary/apex consumer level (lions).", reasoning: "Energy to lions = 10% of 250,000 kJ = 0.10 × 250,000 = 25,000 kJ." },
          { stepNumber: 3, instruction: "Calculate percentage of initial producer energy reaching apex predators.", reasoning: "(25,000 / 2,500,000) × 100 = 1.0%." }
        ],
        takeawayRule: "Because 90% of energy is lost at each trophic link, apex predators require enormous territory and biomass bases to survive."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking nutrients cycle and energy cycles identically in ecosystems.", whyItIsWrong: "Nutrients (carbon, nitrogen, water) cycle indefinitely in closed loops. Energy does NOT cycle—it flows in a one-way path through the food web and is permanently dissipated as thermal heat into outer space.", correctCorrection: "Matter cycles; energy flows and dissipates." }
    ],
    guidedPracticePrompt: "Why are food chains in nature rarely longer than 4 or 5 trophic levels?",
    summaryRecap: "Energy flows unidirectionally with ~90% loss per step. Matter cycles through carbon and nitrogen biogeochemical pathways."
  },

  "skill-bio-photosynthesis-human-digestion": {
    id: "les-bio-photosynthesis-human-digestion",
    title: "Photosynthesis, Light/Dark Reactions, & Human Digestive Enzymes",
    hookAndIntuition: "Every meal you eat—whether bread, meat, or vegetables—is solar energy repackaged. Plants capture sunlight to forge high-energy chemical bonds in glucose, and human digestive enzymes methodically disassemble those polymers so your cells can absorb and burn them for fuel.",
    conceptualExplanation: "Photosynthesis takes place in plant chloroplasts in two distinct stages: (1) Light-Dependent Reactions (in thylakoid membranes): Chlorophyll absorbs photons, photolyzing water (2H₂O -> 4H⁺ + 4e⁻ + O₂), generating ATP and NADPH while releasing oxygen as a byproduct. (2) Light-Independent Reactions / Calvin Cycle (in the stroma): The enzyme RuBisCO fixes atmospheric CO₂ onto RuBP, utilizing ATP and NADPH to synthesize glucose. In human digestion, macronutrients are enzymatically hydrolyzed: Carbohydrates: salivary/pancreatic amylase breaks starch into maltose; maltase breaks maltose into glucose. Proteins: stomach pepsin (optimum pH 2) and pancreatic trypsin break proteins into peptides; peptidases yield amino acids. Lipids: liver bile emulsifies fat globules into droplets; pancreatic lipase hydrolyzes triglycerides into glycerol and fatty acids, absorbed by intestinal villi lacteals.",
    keyTermsAndFormulas: [
      { termOrSymbol: "6CO₂ + 6H₂O + light -> C₆H₁₂O₆ + 6O₂", definition: "Overall equation for photosynthesis in chloroplasts.", practicalExample: "Chlorophyll reflects green light (500-550 nm) while absorbing blue and red wavelengths." },
      { termOrSymbol: "Emulsification by Bile", definition: "Mechanical breakdown of large lipid globules into small micro-droplets, dramatically increasing surface area for lipase.", practicalExample: "Bile contains no enzymes, but without it fat digestion is severely impaired." },
      { termOrSymbol: "Villi and Microvilli", definition: "Finger-like folds in the ileum lining that increase absorption surface area by ~600 times.", practicalExample: "Villi contain capillary networks for glucose/amino acids and lacteals for fatty acids." }
    ],
    workedExamples: [
      {
        title: "Investigating the Effect of Light Intensity on Photosynthetic Rate",
        problemStatement: "In an experiment using freshwater Elodea pondweed, a lamp is placed at distances d = 10 cm, 20 cm, and 40 cm. The rate of oxygen bubble production is recorded. Using the Inverse Square Law of Light (Intensity ∝ 1 / d²), explain the change in photosynthetic rate when moving the lamp from 10 cm to 20 cm.",
        steps: [
          { stepNumber: 1, instruction: "Calculate light intensity ratio using Inverse Square Law.", reasoning: "Intensity I₁ at 10 cm ∝ 1 / 10² = 1 / 100 = 0.01. Intensity I₂ at 20 cm ∝ 1 / 20² = 1 / 400 = 0.0025." },
          { stepNumber: 2, instruction: "Determine the fractional drop in light intensity.", reasoning: "I₂ / I₁ = 0.0025 / 0.01 = 1/4 (light intensity drops by a factor of 4 when distance doubles)." },
          { stepNumber: 3, instruction: "Relate light intensity to photosynthetic rate.", reasoning: "Assuming light is the limiting factor, photosynthetic rate is directly proportional to light intensity. Therefore, the rate of bubble production drops to roughly 25% of its original rate." }
        ],
        takeawayRule: "Light intensity obeys the inverse square law: doubling the distance reduces illumination to one-fourth."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing bile contains digestive enzymes that chemically break down fat molecules.", whyItIsWrong: "Bile is not an enzyme. It contains bile salts that mechanically emulsify lipids (physically separating them into micro-droplets) to increase surface area for pancreatic lipase.", correctCorrection: "Bile emulsifies fats physically; pancreatic lipase hydrolyzes fats chemically." }
    ],
    guidedPracticePrompt: "Name the three enzymes responsible for digesting starch into glucose in the human digestive system.",
    summaryRecap: "Light reactions generate ATP/NADPH and O₂; Calvin cycle fixes CO₂ into glucose. Human digestion hydrolyzes polymers for villi absorption."
  },

  "skill-bio-vascular-plants-circulatory-system": {
    id: "les-bio-vascular-plants-circulatory-system",
    title: "Vascular Transport in Plants & the Human Double Circulatory System",
    hookAndIntuition: "How does a 100-meter-tall giant redwood tree pump hundreds of liters of water to its canopy every day without a mechanical heart? And how does your own heart beat 100,000 times a day to pump 8,000 liters of blood through 100,000 kilometers of blood vessels? Internal transport systems overcome the physical limits of diffusion.",
    conceptualExplanation: "Large multicellular organisms require specialized vascular transport. In plants: (1) Xylem vessels (dead, hollow, lignified tubes) transport water and dissolved mineral ions upward from roots to leaves driven by the Transpiration Pull (evaporative water loss through stomata creates negative suction tension, supported by water's cohesive hydrogen bonds and adhesive forces to xylem walls). (2) Phloem sieve tubes transport organic sugars (sucrose) bidirectionally from photosynthetic sources (leaves) to metabolic sinks (roots, fruits) via pressure-flow Translocation. In humans: The Double Circulatory System routes blood through two loops: Pulmonary circulation (deoxygenated blood from right ventricle -> lungs for gas exchange -> left atrium) and Systemic circulation (oxygenated blood from left ventricle -> body tissues -> right atrium). Arteries carry blood away from the heart under high pressure with thick muscular walls; Veins carry blood toward the heart under low pressure with wide lumens and non-return valves; Capillaries have one-cell-thick walls for rapid diffusion.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Cohesion-Tension Theory", definition: "Mechanism of water ascent in xylem driven by stomatal transpiration, water cohesion, and adhesion.", practicalExample: "Enables water to rise 100+ meters in sequoia trees without active pumping." },
      { termOrSymbol: "Cardiac Output = Stroke Volume × Heart Rate (CO = SV × HR)", definition: "Formula for total volume of blood pumped by the heart per minute.", practicalExample: "At rest: SV = 70 mL, HR = 72 bpm => CO = 70 × 72 = 5040 mL/min ≈ 5.0 L/min." },
      { termOrSymbol: "Systole vs Diastole", definition: "Systole = cardiac muscle contraction (pumping); Diastole = cardiac muscle relaxation (filling).", practicalExample: "Standard blood pressure 120/80 mmHg represents systolic / diastolic pressure." }
    ],
    workedExamples: [
      {
        title: "Calculating Human Cardiac Output During Exercise",
        problemStatement: "An athlete at rest has a heart rate of 60 beats per minute and a stroke volume of 75 mL. During an intense 5 km race, their heart rate rises to 160 beats per minute and stroke volume expands to 125 mL. Calculate: (a) cardiac output at rest, (b) cardiac output during exercise, (c) the fold-increase in blood flow.",
        steps: [
          { stepNumber: 1, instruction: "Calculate resting cardiac output CO_rest = SV × HR.", reasoning: "CO_rest = 75 mL × 60 bpm = 4,500 mL/min = 4.5 L/min." },
          { stepNumber: 2, instruction: "Calculate exercise cardiac output CO_exercise = SV × HR.", reasoning: "CO_exercise = 125 mL × 160 bpm = 20,000 mL/min = 20.0 L/min." },
          { stepNumber: 3, instruction: "Determine the fold-increase.", reasoning: "Fold increase = 20.0 L/min / 4.5 L/min = 4.44-fold increase in circulatory perfusion." }
        ],
        takeawayRule: "Cardiac output can expand over 4-fold during peak exertion through coordinated increases in both stroke volume and heart rate."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing all arteries carry oxygenated blood and all veins carry deoxygenated blood.", whyItIsWrong: "Arteries are defined as vessels carrying blood AWAY from the heart; veins carry blood TOWARD the heart. The Pulmonary Artery carries DEOXYGENATED blood from heart to lungs, and the Pulmonary Vein carries OXYGENATED blood from lungs to heart.", correctCorrection: "Pulmonary artery carries deoxygenated blood; pulmonary vein carries oxygenated blood." }
    ],
    guidedPracticePrompt: "Contrast the structural adaptations of arteries, veins, and capillaries.",
    summaryRecap: "Xylem transports water upward via cohesion-tension; phloem translocates sucrose bidirectionally. Human double circulation powers systemic and pulmonary circuits."
  },

  "skill-bio-kidney-nephron-homeostasis": {
    id: "les-bio-kidney-nephron-homeostasis",
    title: "Osmoregulation, Nephron Filtration, & Negative Feedback Homeostasis",
    hookAndIntuition: "Whether you drink three liters of water on a freezing morning or hike across a sweltering desert without a sip, your blood's chemical composition, water volume, and salt concentration remain miraculously constant within fractions of a percent. This vital equilibrium is maintained by your kidneys and homeostatic negative feedback loops.",
    conceptualExplanation: "Homeostasis is the maintenance of a constant internal physiological environment despite external fluctuations. Negative Feedback systems monitor variables via receptors, compare them to set points in control centers (e.g. hypothalamus), and trigger effectors to reverse deviations. The functional unit of the kidney is the Nephron (~1 million per kidney). Nephron function operates in three discrete stages: (1) Ultrafiltration (Bowman's capsule): High hydrostatic blood pressure in the glomerulus forces water, glucose, urea, amino acids, and mineral salts through the basement membrane into the nephron, leaving large plasma proteins and blood cells behind. (2) Selective Reabsorption (Proximal Convoluted Tubule): 100% of valuable glucose and amino acids are actively transported back into capillary blood, along with sodium and water. (3) Osmoregulation (Loop of Henle & Collecting Duct): If blood osmolarity rises (dehydration), the hypothalamus stimulates the posterior pituitary to release Antidiuretic Hormone (ADH / vasopressin), increasing aquaporin water channels in collecting duct walls, maximizing water reabsorption and producing concentrated, low-volume urine.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Ultrafiltration", definition: "Non-specific pressure filtration in Bowman's capsule separating small solutes from blood cells and proteins.", practicalExample: "Presence of albumin protein or RBCs in urine indicates glomerular membrane damage." },
      { termOrSymbol: "Selective Reabsorption", definition: "Active transport retrieval of all glucose, amino acids, and needed ions in the proximal tubule.", practicalExample: "In untreated diabetes, blood glucose exceeds renal threshold, spilling into urine (glycosuria)." },
      { termOrSymbol: "ADH (Antidiuretic Hormone) Feedback", definition: "High blood osmolarity -> more ADH -> higher collecting duct permeability -> concentrated urine.", practicalExample: "Alcohol inhibits ADH secretion, leading to excessive diluted urination and dehydration." }
    ],
    workedExamples: [
      {
        title: "Tracing the Homeostatic Response to Water Deprivation",
        problemStatement: "A marathon runner loses 2.5 liters of water as sweat during a race without drinking fluids. Trace the negative feedback loop that restores water balance, identifying the stimulus, receptor, control center, hormone, target organ, and final physiological outcome.",
        steps: [
          { stepNumber: 1, instruction: "Identify stimulus and receptor.", reasoning: "Stimulus: Blood water potential drops (osmolarity rises). Receptor: Osmoreceptors in the hypothalamus detect increased solute concentration." },
          { stepNumber: 2, instruction: "Identify control center and endocrine signal.", reasoning: "Hypothalamus signals the posterior pituitary gland to secrete antidiuretic hormone (ADH) into the bloodstream." },
          { stepNumber: 3, instruction: "Describe effector action on target organ.", reasoning: "ADH travels to the kidneys, binding to epithelial cells of the collecting ducts. This triggers insertion of aquaporin water channels into luminal membranes." },
          { stepNumber: 4, instruction: "State physiological outcome.", reasoning: "Water permeability surges; more water is reabsorbed by osmosis into the medullary bloodstream. A small volume of hypertonic (concentrated) urine is excreted, conserving body water." }
        ],
        takeawayRule: "ADH increases water reabsorption in the collecting ducts; negative feedback shuts down ADH release once blood osmolarity returns to baseline."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking that healthy urine contains glucose.", whyItIsWrong: "In healthy kidneys, 100% of filtered glucose is actively reabsorbed back into the bloodstream in the proximal convoluted tubule via sodium-glucose cotransporters.", correctCorrection: "Glucose in urine is abnormal and serves as a key clinical diagnostic indicator of diabetes mellitus." }
    ],
    guidedPracticePrompt: "Explain what happens to ADH secretion and urine volume when a person drinks 1.5 liters of pure water.",
    summaryRecap: "Homeostasis maintains internal stability via negative feedback. Nephrons perform ultrafiltration, selective reabsorption, and ADH-mediated osmoregulation."
  },

  "skill-bio-neurons-synapses-reflexes": {
    id: "les-bio-neurons-synapses-reflexes",
    title: "Nervous Communication, Action Potentials, & Synaptic Transmission",
    hookAndIntuition: "Touch a boiling-hot metal pot, and your arm jerks away before your conscious brain has even registered the word 'pain'! How? The human nervous system routes emergency signals along electrical pathways at speeds up to 120 meters per second, bypassing conscious brain processing through involuntary spinal reflex arcs.",
    conceptualExplanation: "The nervous system coordinates rapid responses to stimuli. Neurons are specialized excitable cells comprising dendrites (receive inputs), cell body, and axon (transmits electrical impulses wrapped in insulating myelin sheath produced by Schwann cells, enabling fast Saltatory Conduction between Nodes of Ranvier). Resting Membrane Potential (~ -70 mV) is maintained by the active Na⁺/K⁺ ATPase pump (3 Na⁺ pumped out for every 2 K⁺ pumped in). When a stimulus depolarizes the membrane past threshold (~ -55 mV), voltage-gated Na⁺ channels fly open, causing rapid Depolarization to +30 mV (Action Potential). Voltage-gated K⁺ channels then open, allowing K⁺ efflux to Repolarize the cell. At Synapses (junctions between neurons), the electrical impulse cannot jump the synaptic cleft; it triggers voltage-gated Ca²⁺ influx, causing vesicles to release Neurotransmitters (e.g. acetylcholine) via exocytosis. Neurotransmitters diffuse across the cleft and bind to receptor channels on the postsynaptic membrane. Reflex Arcs provide protective involuntary shortcuts: Stimulus -> Receptor -> Sensory Neuron -> Relay Neuron (in spinal cord gray matter) -> Motor Neuron -> Effector (muscle).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Resting Potential: -70 mV", definition: "Polarized state of neuron interior relative to exterior maintained by Na⁺/K⁺ pump.", practicalExample: "Maintains high Na⁺ outside and high K⁺ inside the axon." },
      { termOrSymbol: "All-or-Nothing Law", definition: "An action potential either fires at full amplitude (+30 mV) if threshold is exceeded, or does not fire at all.", practicalExample: "A stronger stimulus increases impulse frequency (firings per second), not impulse voltage amplitude." },
      { termOrSymbol: "Synaptic Transmission Steps", definition: "Action potential -> Ca²⁺ influx -> Vesicle exocytosis -> Diffusion across cleft -> Postsynaptic receptor binding.", practicalExample: "Acetylcholinesterase breaks down acetylcholine to prevent continuous muscle spasms." }
    ],
    workedExamples: [
      {
        title: "Tracing the Patellar Knee-Jerk Reflex Arc Pathway",
        problemStatement: "A physician taps a patient's patellar tendon with a rubber reflex hammer, causing the lower leg to kick forward involuntary. Sequence the complete reflex arc pathway from stimulus to response.",
        steps: [
          { stepNumber: 1, instruction: "Identify stimulus and receptor.", reasoning: "Stimulus: Hammer tap stretches the patellar tendon. Receptor: Muscle spindle stretch receptors in the quadriceps muscle detect sudden elongation." },
          { stepNumber: 2, instruction: "Trace sensory transmission.", reasoning: "Receptors trigger an action potential in a Sensory (Afferent) Neuron, which conducts the signal into the dorsal horn of the spinal cord." },
          { stepNumber: 3, instruction: "Identify central processing in the spinal cord.", reasoning: "In the spinal cord gray matter, the sensory neuron synapses directly with an Alpha Motor Neuron (monosynaptic reflex) without brain intervention." },
          { stepNumber: 4, instruction: "Trace motor transmission to effector.", reasoning: "Action potentials travel along the Motor (Efferent) Neuron to the neuromuscular junctions of the quadriceps femoris muscle (effector), stimulating muscle contraction and leg extension." }
        ],
        takeawayRule: "Reflex arcs bypass conscious brain decision-making to achieve rapid, involuntary, life-preserving motor responses."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking that stronger stimuli produce larger, higher-voltage action potentials.", whyItIsWrong: "By the All-or-Nothing Principle, every action potential in a given neuron has the exact same amplitude (+30 mV). The nervous system encodes stimulus intensity through FREQUENCY of action potentials (impulses per second).", correctCorrection: "Stronger stimulus = higher frequency of impulses, NOT larger action potential voltage." }
    ],
    guidedPracticePrompt: "Why does synaptic transmission occur in only one direction across a synapse?",
    summaryRecap: "Neurons fire action potentials (-70 mV to +30 mV) via voltage-gated Na⁺/K⁺ channels. Chemical neurotransmitters cross synaptic clefts. Reflex arcs are fast and involuntary."
  },

  "skill-bio-dihybrid-sex-linkage-dna": {
    id: "les-bio-dihybrid-sex-linkage-dna",
    title: "Dihybrid Crosses, Sex-Linked Inheritance, & DNA Replication",
    hookAndIntuition: "Why are men dramatically more likely to be red-green colorblind or hemophilic than women? The answer lies in the asymmetric architecture of the human sex chromosomes: men carry one full-sized X chromosome and one truncated Y chromosome, leaving X-linked recessive mutations with no backup gene to mask them!",
    conceptualExplanation: "Mendel's Law of Independent Assortment states that alleles of two or more different genes sort into gametes independently of one another during meiosis (provided the genes are on different chromosomes or far apart on the same chromosome). A dihybrid cross between two double heterozygotes (AaBb × AaBb) yields a classic 9 : 3 : 3 : 1 phenotypic ratio. Sex-Linked Genes are located on the X chromosome. Because human males are hemizygous (XY), they express any recessive allele carried on their single X chromosome (e.g. X^h Y has hemophilia), while females (XX) are only affected if homozygous recessive (X^h X^h), otherwise remaining unaffected carriers (X^H X^h). At the molecular level, DNA consists of a double helix of antiparallel nucleotide strands held together by complementary hydrogen-bonded base pairs: Adenine pairs with Thymine (2 H-bonds) and Cytosine pairs with Guanine (3 H-bonds). DNA replication is semi-conservative: DNA Helicase unwinds the double helix, and DNA Polymerase synthesizes new complementary strands continuously on the leading strand (5' -> 3') and discontinuously via Okazaki fragments on the lagging strand.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Dihybrid Ratio: 9 : 3 : 3 : 1", definition: "Phenotypic ratio from crossing two dihybrid heterozygotes (AaBb × AaBb).", practicalExample: "9 round-yellow : 3 round-green : 3 wrinkled-yellow : 1 wrinkled-green pea seeds." },
      { termOrSymbol: "Sex-Linked Genotypes", definition: "X^H X^H (normal female), X^H X^h (carrier female), X^H Y (normal male), X^h Y (affected male).", practicalExample: "A carrier mother (X^H X^h) has a 50% probability of passing hemophilia to each son." },
      { termOrSymbol: "Semi-Conservative Replication", definition: "Each new DNA molecule retains one original parent template strand and one newly synthesized daughter strand.", practicalExample: "Demonstrated experimentally by Meselson and Stahl using ¹⁵N and ¹⁴N isotopes." }
    ],
    workedExamples: [
      {
        title: "Hemophilia Inheritance Cross Between a Carrier Mother and Normal Father",
        problemStatement: "Hemophilia is a sex-linked recessive blood-clotting disorder carried on the X chromosome (allele X^h; normal allele X^H). A carrier woman (X^H X^h) marries a healthy man (X^H Y). Determine: (a) the probability that any son born will have hemophilia, (b) the probability that any daughter born will be a carrier, (c) the overall probability of having an affected child.",
        steps: [
          { stepNumber: 1, instruction: "State parental genotypes and gamete distributions.", reasoning: "Mother: X^H X^h (50% X^H, 50% X^h gametes). Father: X^H Y (50% X^H, 50% Y gametes)." },
          { stepNumber: 2, instruction: "Construct a 2x2 sex-linked Punnett square.", reasoning: "Top: X^H, Y. Left: X^H, X^h. Offspring: X^H X^H (normal girl), X^H Y (normal boy), X^H X^h (carrier girl), X^h Y (affected boy with hemophilia)." },
          { stepNumber: 3, instruction: "Analyze outcomes by sex.", reasoning: "Among sons: X^H Y (normal) vs X^h Y (affected). Probability son has hemophilia = 1/2 (50%). Among daughters: X^H X^H (normal) vs X^H X^h (carrier). Probability daughter is a carrier = 1/2 (50%)." },
          { stepNumber: 4, instruction: "Determine overall risk across all offspring.", reasoning: "Only 1 out of 4 total offspring is affected (X^h Y) => Overall probability = 1/4 (25%)." }
        ],
        takeawayRule: "Fathers pass their X chromosome exclusively to daughters and their Y chromosome exclusively to sons; therefore, fathers never pass X-linked traits to sons."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing a father can transmit an X-linked recessive condition (like hemophilia) directly to his son.", whyItIsWrong: "Fathers donate their Y chromosome to sons to make them male. Sons inherit their X chromosome exclusively from their mother. A father can only pass an X-linked allele to his daughters.", correctCorrection: "X-linked traits pass from father to daughter, never from father to son." }
    ],
    guidedPracticePrompt: "If a DNA molecule contains 28% Adenine, what percentage of its bases are Guanine?",
    summaryRecap: "Independent assortment yields 9:3:3:1 in dihybrid crosses. Males are hemizygous (XY), expressing X-linked recessives directly. DNA replication is semi-conservative."
  }
};
