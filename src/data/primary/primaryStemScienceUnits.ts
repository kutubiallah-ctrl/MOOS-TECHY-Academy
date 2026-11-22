/**
 * MOOS TECHY ACADEMY — PRIMARY STEM, TECHNOLOGY & APPLIED SCIENCE REPOSITORY
 * 
 * TASK ID: MOOS-CURRICULUM-003 (Batch 1: Primary Foundations)
 * Coverage: 9 Primary Applied STEM & Practical Life Subjects:
 * - pri_basic_technology (Basic Technology & Everyday Inventions)
 * - pri_ict_computer (Computer Studies & Digital Literacy)
 * - pri_coding_scratch (Block-Based Coding & Scratch Games)
 * - pri_agric_science (Agricultural Science & School Gardening)
 * - pri_health_hygiene (Health Education & Personal Hygiene)
 * - pri_physical_education (Physical Education & Motor Athletics)
 * - pri_environmental_studies (Environmental Science & Conservation)
 * - pri_home_economics (Home Economics & Daily Living)
 * - pri_safety_firstaid (Safety Rules & Emergency First Aid)
 * 
 * Standards: NERDC Basic Science and Technology Curriculum, Cambridge Primary Science.
 */

import { Unit } from "../../types/curriculum";

export const PRIMARY_STEM_SCIENCE_UNITS: Unit[] = [
  // 1. pri_basic_technology
  {
    id: "unit-pri-basic-tech-01",
    subjectId: "pri_basic_technology",
    level: "primary_foundations",
    title: "Simple Machines, Workshop Hand Tools and Safety",
    code: "TEC-BAS-01",
    description: "Principles of everyday mechanical advantage: levers, inclined planes, pulleys, wheels, and basic workshop hand tools.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-tech-simple-machines",
        unitId: "unit-pri-basic-tech-01",
        title: "Simple Machines: Levers and Inclined Planes",
        code: "SKL-PRI-TEC-01",
        summary: "Identify how levers (crowbars, seesaws, scissors) and ramps reduce the effort needed to move heavy loads.",
        objectives: [
          "Define a simple machine as a tool that makes physical work easier",
          "Identify the three parts of a lever: Fulcrum (pivot), Effort, and Load",
          "Demonstrate how an inclined plane (ramp) reduces lifting effort"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-tech-machines",
          title: "Clever Helpers: How Simple Machines Give Us Superhuman Strength",
          hookAndIntuition: "Could a 7-year-old child lift a grown adult into the air? On a playground seesaw, yes! By sitting on the far end of the lever plank, your body weight easily lifts someone twice your size. That is the genius of mechanical advantage!",
          conceptualExplanation: "A machine is any device that makes human work easier by multiplying force or changing direction. A lever rotates around a fixed turning point called the fulcrum. When you push down on one side (effort), the opposite side lifts the weight (load). An inclined plane is a sloping surface (ramp) that allows heavy items to be rolled up rather than lifted straight up.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Fulcrum", definition: "The fixed pivot point around which a lever turns.", practicalExample: "The center pin of a seesaw or pair of scissors." },
            { termOrSymbol: "Inclined Plane (Ramp)", definition: "A flat sloping surface connecting a lower level to a higher level.", practicalExample: "Wheelchair ramps or wooden planks loading a truck." },
            { termOrSymbol: "Effort", definition: "The force or push applied by a person to operate a machine.", practicalExample: "Pushing down on a crowbar." }
          ],
          workedExamples: [
            {
              title: "Loading a Heavy Barrel into a Pickup Truck",
              problemStatement: "A worker needs to lift a 100 kg oil drum into a truck bed. What simple machine should he use?",
              steps: [
                { stepNumber: 1, instruction: "Analyze the challenge", reasoning: "Lifting straight up requires 100 kg of lifting force, risking back injury." },
                { stepNumber: 2, instruction: "Select the machine", reasoning: "Place a strong wooden plank from the ground to the truck bed (inclined plane)." },
                { stepNumber: 3, instruction: "Apply mechanical advantage", reasoning: "Rolling the drum up the ramp distributes the effort over a longer distance." }
              ],
              takeawayRule: "An inclined plane trades distance for effort: rolling over a longer ramp requires far less push force."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking simple machines must have engines or electrical plugs.",
              whyItIsWrong: "The most fundamental machines (wedges, levers, screws, ramps) have zero moving electrical parts.",
              correctCorrection: "A simple machine is defined by geometric and mechanical advantage, not electricity."
            }
          ],
          guidedPracticePrompt: "Name two tools in your kitchen or classroom that act as levers (hint: think cutting or prying).",
          summaryRecap: "Simple machines make work easier: levers pivot on a fulcrum, and ramps reduce lifting force."
        },
        questions: [
          {
            id: "q-pri-tec-01",
            type: "multiple_choice",
            questionText: "What is the fixed pivot point around which a lever rotates called?",
            options: ["Fulcrum", "Effort", "Load", "Motor"],
            correctAnswer: "Fulcrum",
            explanation: "The fulcrum is the stationary pivot point supporting a turning lever beam.",
            hintLadder: [
              "Think of the middle hinge on a pair of scissors.",
              "It is the pivot point.",
              "The scientific term is 'fulcrum'."
            ],
            misconceptionAlerts: [
              { trigger: "Effort", note: "Effort is the muscular force applied, while fulcrum is the stationary pivot point." }
            ],
            skillId: "skill-pri-tech-simple-machines",
            difficulty: "easy"
          },
          {
            id: "q-pri-tec-02",
            type: "multiple_choice",
            questionText: "Which simple machine consists of a sloping ramp used to roll heavy objects onto elevated trucks?",
            options: ["Inclined Plane", "Pulley", "Gear", "Axle"],
            correctAnswer: "Inclined Plane",
            explanation: "An inclined plane is a flat slanted surface (ramp) that reduces the effort needed to elevate heavy loads.",
            hintLadder: [
              "Think of wheelchair ramps or sloping planks.",
              "'Inclined' means sloped or slanted.",
              "An inclined plane."
            ],
            misconceptionAlerts: [
              { trigger: "Pulley", note: "A pulley uses a grooved wheel and rope, whereas a ramp is an inclined plane." }
            ],
            skillId: "skill-pri-tech-simple-machines",
            difficulty: "easy"
          },
          {
            id: "q-pri-tec-03",
            type: "multiple_choice",
            questionText: "A pair of scissors is an example of which simple machine?",
            options: ["A double lever with a central pivot", "An inclined plane", "A water wheel", "A screw thread"],
            correctAnswer: "A double lever with a central pivot",
            explanation: "Scissors consist of two lever blades connected at a shared fulcrum screw.",
            hintLadder: [
              "Look at how the handles push down to make the blades close.",
              "The center screw acts as the pivot (fulcrum).",
              "Scissors are double levers."
            ],
            misconceptionAlerts: [
              { trigger: "An inclined plane", note: "While the blade edges are wedges, the scissors mechanism as a whole functions as a lever." }
            ],
            skillId: "skill-pri-tech-simple-machines",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 2. pri_ict_computer
  {
    id: "unit-pri-ict-computer-01",
    subjectId: "pri_ict_computer",
    level: "primary_foundations",
    title: "Computer Hardware, Peripherals and Safe Operation",
    code: "ICT-COM-01",
    description: "Input devices (mouse, keyboard), output devices (monitor, printer), Central Processing Unit (CPU), and computer laboratory hygiene.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-ict-input-output",
        unitId: "unit-pri-ict-computer-01",
        title: "Input vs Output Devices and the CPU Brain",
        code: "SKL-PRI-ICT-01",
        summary: "Classify computer peripherals by information flow (entering data vs displaying results) and identify the CPU.",
        objectives: [
          "Classify keyboard, mouse, and microphone as input devices",
          "Classify monitor, speakers, and printer as output devices",
          "Identify the CPU as the central 'brain' that processes instructions"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-ict-hardware",
          title: "How Computers Think: Input, Processing, and Output",
          hookAndIntuition: "When you play a video game, you press buttons on a controller (Input). The console thinks and calculates what happens (Processing). Then your character jumps across the TV screen (Output)! That is the 3-step magic of all computing!",
          conceptualExplanation: "A computer system has three main stages: 1) Input: How we feed data into the computer (keyboard types letters, mouse clicks targets). 2) Processing: The CPU (Central Processing Unit) acts as the brain, executing millions of calculations every second. 3) Output: How the computer delivers results back to us (screen displays images, speakers play sound, printer produces paper documents).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Input Device", definition: "Hardware used to enter instructions or data into a computer.", practicalExample: "Keyboard, mouse, microphone, scanner." },
            { termOrSymbol: "Output Device", definition: "Hardware that displays or produces processed information from a computer.", practicalExample: "Monitor screen, speakers, printer." },
            { termOrSymbol: "CPU (Central Processing Unit)", definition: "The central electronic microchip that processes all calculations and instructions.", practicalExample: "Often called the 'brain' of the computer." }
          ],
          workedExamples: [
            {
              title: "Typing a Homework Story",
              problemStatement: "When a pupil types an essay and prints it on paper, identify the input device, processing unit, and output device.",
              steps: [
                { stepNumber: 1, instruction: "Identify Input", reasoning: "The keyboard sends text keystrokes into the machine." },
                { stepNumber: 2, instruction: "Identify Processing", reasoning: "The CPU interprets letter codes and arranges them in memory." },
                { stepNumber: 3, instruction: "Identify Output", reasoning: "The printer sprays ink onto paper to produce the physical document." }
              ],
              takeawayRule: "Data travels: Input (Keyboard) -> Processing (CPU) -> Output (Monitor / Printer)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking the computer monitor is the computer itself.",
              whyItIsWrong: "The monitor is merely a display screen (output); the actual computing happens inside the system unit / CPU.",
              correctCorrection: "A monitor without a CPU is just a dark screen with no ability to calculate."
            }
          ],
          guidedPracticePrompt: "Is a pair of headphones an input device or an output device? Why?",
          summaryRecap: "Keyboards and mice feed data in (input); the CPU processes; monitors, speakers, and printers show results (output)."
        },
        questions: [
          {
            id: "q-pri-ict-01",
            type: "multiple_choice",
            questionText: "Which of the following is an INPUT device used to send text commands into a computer?",
            options: ["Keyboard", "Monitor screen", "Printer", "Speakers"],
            correctAnswer: "Keyboard",
            explanation: "A keyboard captures keystrokes and transmits text data into the computer system (input).",
            hintLadder: [
              "Input means putting information INTO the computer.",
              "Which device do you press with your fingers to type letters?",
              "The keyboard."
            ],
            misconceptionAlerts: [
              { trigger: "Monitor screen", note: "The monitor displays information outward (output), it does not send typed text in." }
            ],
            skillId: "skill-pri-ict-input-output",
            difficulty: "easy"
          },
          {
            id: "q-pri-ict-02",
            type: "multiple_choice",
            questionText: "What component is known as the 'brain' of the computer that performs calculations?",
            options: ["CPU (Central Processing Unit)", "Mouse pad", "Computer desk", "Power cable"],
            correctAnswer: "CPU (Central Processing Unit)",
            explanation: "The CPU is the central microprocessor chip responsible for executing program instructions and processing data.",
            hintLadder: [
              "Three letters: C - P - U.",
              "Central Processing Unit.",
              "CPU."
            ],
            misconceptionAlerts: [
              { trigger: "Mouse pad", note: "The mouse pad is just an accessory for rolling a mouse, not an electronic component." }
            ],
            skillId: "skill-pri-ict-input-output",
            difficulty: "easy"
          },
          {
            id: "q-pri-ict-03",
            type: "multiple_choice",
            questionText: "Which device is an OUTPUT device that produces hard copies of documents on paper?",
            options: ["Printer", "Scanner", "Microphone", "Webcam"],
            correctAnswer: "Printer",
            explanation: "A printer transfers digital text and images onto physical paper sheets (hard copy output).",
            hintLadder: [
              "It outputs ink onto sheets of paper.",
              "Paper copies are called printouts.",
              "A printer."
            ],
            misconceptionAlerts: [
              { trigger: "Scanner", note: "A scanner takes a paper document and turns it into a digital image inside the computer (input)." }
            ],
            skillId: "skill-pri-ict-input-output",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 3. pri_coding_scratch
  {
    id: "unit-pri-coding-scratch-01",
    subjectId: "pri_coding_scratch",
    level: "primary_foundations",
    title: "Algorithms, Sequencing, Loops and Scratch Sprites",
    code: "COD-SCR-01",
    description: "Computational thinking: step-by-step algorithms, debugging code, repeat loops, and event-driven triggers (When Green Flag Clicked).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-scr-algorithms-loops",
        unitId: "unit-pri-coding-scratch-01",
        title: "Sequencing and Repeat Loops in Scratch",
        code: "SKL-PRI-SCR-01",
        summary: "Order graphical code blocks sequentially and use 'repeat (N)' loops to eliminate redundant instructions.",
        objectives: [
          "Define an algorithm as an exact sequence of step-by-step instructions",
          "Identify the 'When Green Flag Clicked' event block as the starting trigger",
          "Use a repeat loop block to draw regular polygon paths or animations"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-scr-loops",
          title: "Giving Orders to the Computer: Code Blocks and Loops",
          hookAndIntuition: "Imagine training a pet puppy: 'Sit! Roll over! Bark!'. If you tell a robot: 'Step forward! Turn right! Step forward! Turn right! Step forward! Turn right! Step forward! Turn right!', you are repeating yourself 4 times! In coding, we simply tell the robot: 'Repeat 4 times: [Step forward, Turn right]'. That is a loop!",
          conceptualExplanation: "Computers are very fast but very literal; they only do exactly what we program them to do. An algorithm is an unambiguous sequence of steps. In block-based coding (like Scratch), scripts begin with an Event block ('When Green Flag Clicked'). Stacking blocks vertically executes them from top to bottom. A 'Repeat' loop repeats whatever blocks are nested inside it.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Algorithm", definition: "A precise, ordered set of instructions designed to solve a problem or perform a task.", practicalExample: "A recipe for baking bread or steps to brush your teeth." },
            { termOrSymbol: "Loop (Repeat)", definition: "A programming structure that repeats a block of code multiple times.", practicalExample: "Repeat 10 [play meow sound]." },
            { termOrSymbol: "Bug / Debugging", definition: "A mistake in code, and the process of finding and fixing that mistake.", practicalExample: "Fixing a sprite that walks backwards instead of forwards." }
          ],
          workedExamples: [
            {
              title: "Programming a Scratch Cat to Draw a Square",
              problemStatement: "A square has 4 equal sides and four 90-degree corners. Write a Scratch script to draw a square.",
              steps: [
                { stepNumber: 1, instruction: "Add event trigger", reasoning: "Place 'When Green Flag Clicked' at the top." },
                { stepNumber: 2, instruction: "Wrap in a loop", reasoning: "A square has 4 sides, so add 'Repeat (4)'." },
                { stepNumber: 3, instruction: "Nest movement blocks", reasoning: "Inside the loop: 'Move 100 steps' followed by 'Turn right 90 degrees'." }
              ],
              takeawayRule: "Repeating [Move + Turn] 4 times creates a complete closed square."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking the computer will figure out what you meant if you skip a step.",
              whyItIsWrong: "Computers have no intuition; if you forget to tell a character to turn, it will walk off the screen in a straight line forever.",
              correctCorrection: "Every single step must be explicitly coded in order."
            }
          ],
          guidedPracticePrompt: "If a loop repeats 5 times, and inside the loop is 'Move 10 steps', how many steps does the sprite move in total?",
          summaryRecap: "Code runs in order from top to bottom. Loops repeat actions without rewriting code, and events trigger scripts to start."
        },
        questions: [
          {
            id: "q-pri-scr-01",
            type: "multiple_choice",
            questionText: "What is an 'algorithm' in computer programming?",
            options: [
              "A step-by-step set of precise instructions to accomplish a task",
              "A physical keyboard key",
              "The glass screen of a tablet",
              "A computer virus"
            ],
            correctAnswer: "A step-by-step set of precise instructions to accomplish a task",
            explanation: "An algorithm is an unambiguous, ordered procedure for solving a computational problem.",
            hintLadder: [
              "Think of a cooking recipe or steps to tie your shoes.",
              "It is an ordered list of steps.",
              "A step-by-step set of precise instructions."
            ],
            misconceptionAlerts: [
              { trigger: "A computer virus", note: "An algorithm is not malware; it is any logical step-by-step process." }
            ],
            skillId: "skill-pri-scr-algorithms-loops",
            difficulty: "easy"
          },
          {
            id: "q-pri-scr-02",
            type: "multiple_choice",
            questionText: "In Scratch, which block is typically placed at the very top of a script to start running when the green flag is pressed?",
            options: ["When Green Flag Clicked", "Stop All", "Wait 10 seconds", "Delete Sprite"],
            correctAnswer: "When Green Flag Clicked",
            explanation: "The 'When Green Flag Clicked' hat block is the primary event trigger for launching interactive Scratch programs.",
            hintLadder: [
              "Look for the yellow Event block with a flag symbol.",
              "It responds when the player presses the go flag.",
              "When Green Flag Clicked."
            ],
            misconceptionAlerts: [
              { trigger: "Stop All", note: "'Stop All' ends a program, it does not start it." }
            ],
            skillId: "skill-pri-scr-algorithms-loops",
            difficulty: "easy"
          },
          {
            id: "q-pri-scr-03",
            type: "multiple_choice",
            questionText: "If a sprite runs: 'Repeat 3 [Move 20 steps]', what is the total distance moved by the sprite?",
            options: ["60 steps", "20 steps", "23 steps", "3 steps"],
            correctAnswer: "60 steps",
            explanation: "The sprite moves 20 steps, repeated 3 times: 3 × 20 = 60 steps.",
            hintLadder: [
              "Multiply the number of loop iterations by the steps inside.",
              "3 times 20 steps.",
              "3 × 20 = 60."
            ],
            misconceptionAlerts: [
              { trigger: "23 steps", note: "Did you add 3 + 20? Loops multiply: 3 repeats of 20 steps = 60 steps." }
            ],
            skillId: "skill-pri-scr-algorithms-loops",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 4. pri_agric_science
  {
    id: "unit-pri-agric-science-01",
    subjectId: "pri_agric_science",
    level: "primary_foundations",
    title: "Crops, Farm Animals, Soil Types and Farm Tools",
    code: "AGR-SCI-01",
    description: "Classification of food/cash crops (cassava, maize, cocoa), farm animals (cattle, poultry), fertile soils (loam, clay, sand), and basic farming tools (hoe, cutlass).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-agr-crops-soils",
        unitId: "unit-pri-agric-science-01",
        title: "Crop Classification and Soil Fertility",
        code: "SKL-PRI-AGR-01",
        summary: "Distinguish between food crops and cash crops, and identify loam soil as ideal for planting.",
        objectives: [
          "Differentiate food crops (yam, maize, rice) from commercial cash crops (cocoa, oil palm)",
          "Compare sandy, clayey, and loamy soils based on water retention and texture",
          "Identify traditional farm implements: hoe for tilling and cutlass for clearing"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-agr-crops",
          title: "Feeding the Nation: How Crops Grow from Healthy Soil",
          hookAndIntuition: "When you eat a steaming plate of pounded yam or warm roasted corn, where did it come from? A farmer planted a tiny seed in rich dark earth, gave it water and sunshine, and harvested food for millions of people!",
          conceptualExplanation: "Agriculture is the science and practice of cultivating soil, growing crops, and raising livestock. Crops are categorized into: 1) Food Crops: grown primarily for family consumption (yam, cassava, maize, vegetables). 2) Cash Crops: grown on large plantations to sell for income and export (cocoa, rubber, cotton, oil palm). For crops to flourish, they need loamy soil—a balanced mix of sand, clay, and decaying plant nutrients (humus).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Food Crop", definition: "Crops harvested primarily to be eaten by humans and local families.", practicalExample: "Cassava, maize, rice, yam." },
            { termOrSymbol: "Cash Crop", definition: "Agricultural produce grown specifically for commercial sale and export.", practicalExample: "Cocoa, oil palm, groundnut, cotton." },
            { termOrSymbol: "Loam Soil", definition: "A fertile soil mixture of sand, clay, and rich organic humus ideal for plant growth.", practicalExample: "Holds moisture without becoming waterlogged." }
          ],
          workedExamples: [
            {
              title: "Selecting Soil for a School Vegetable Garden",
              problemStatement: "A primary school wants to plant tomatoes. They have sandy soil, clay soil, and dark loamy soil. Which should they choose?",
              steps: [
                { stepNumber: 1, instruction: "Examine sandy soil", reasoning: "Water drains through sand too fast, leaving roots dry." },
                { stepNumber: 2, instruction: "Examine clay soil", reasoning: "Clay is heavy and sticky, trapping water and suffocating roots." },
                { stepNumber: 3, instruction: "Examine loamy soil", reasoning: "Loam holds just the right moisture and is packed with dark organic humus." }
              ],
              takeawayRule: "Loam is the best agricultural soil because it combines good aeration, water retention, and rich nutrients."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking cocoa beans are eaten directly as food crops by farmers.",
              whyItIsWrong: "Cocoa is grown commercially as a cash crop to be processed into chocolate and exported.",
              correctCorrection: "Cocoa is a classic commercial cash crop."
            }
          ],
          guidedPracticePrompt: "Which farm tool is curved and sharp, used for clearing bush and weeds: a hoe or a cutlass?",
          summaryRecap: "Food crops nourish families, cash crops generate income, and loamy soil provides the ideal foundation for agriculture."
        },
        questions: [
          {
            id: "q-pri-agr-01",
            type: "multiple_choice",
            questionText: "Which of the following is a classic CASH CROP grown primarily for sale and export?",
            options: ["Cocoa", "Yam", "Cassava", "Spinach"],
            correctAnswer: "Cocoa",
            explanation: "Cocoa is an important commercial cash crop exported globally for chocolate production, unlike staple food crops.",
            hintLadder: [
              "A cash crop is grown primarily to sell for money/export.",
              "Which of these is processed into chocolate?",
              "Cocoa."
            ],
            misconceptionAlerts: [
              { trigger: "Yam", note: "Yam is a staple food crop eaten directly by local households." }
            ],
            skillId: "skill-pri-agr-crops-soils",
            difficulty: "easy"
          },
          {
            id: "q-pri-agr-02",
            type: "multiple_choice",
            questionText: "Which type of soil is recognized as the best and most fertile for planting garden crops?",
            options: ["Loamy soil", "Sandy soil", "Rocky soil", "Clay soil"],
            correctAnswer: "Loamy soil",
            explanation: "Loam contains a balanced blend of sand, clay, and organic humus, retaining the perfect balance of moisture and air.",
            hintLadder: [
              "It is dark, rich, and crumbly.",
              "It contains plenty of decaying plant nutrients (humus).",
              "Loamy soil."
            ],
            misconceptionAlerts: [
              { trigger: "Sandy soil", note: "Sandy soil drains water away far too quickly, starving plant roots." }
            ],
            skillId: "skill-pri-agr-crops-soils",
            difficulty: "easy"
          },
          {
            id: "q-pri-agr-03",
            type: "multiple_choice",
            questionText: "Which traditional farm tool has a metal blade fitted onto a wooden handle, primarily used for clearing bush and cutting grasses?",
            options: ["Cutlass (Machete)", "Watering can", "Wheelbarrow", "Rake"],
            correctAnswer: "Cutlass (Machete)",
            explanation: "A cutlass is the primary agricultural cutting tool used throughout West Africa for clearing vegetation and brush.",
            hintLadder: [
              "It has a long, sharp metal blade.",
              "It is swung to slice through grass and shrubs.",
              "A cutlass."
            ],
            misconceptionAlerts: [
              { trigger: "Rake", note: "A rake is used for gathering fallen leaves, not cutting dense grasses." }
            ],
            skillId: "skill-pri-agr-crops-soils",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 5. pri_health_hygiene
  {
    id: "unit-pri-health-hygiene-01",
    subjectId: "pri_health_hygiene",
    level: "primary_foundations",
    title: "Personal Cleanliness, Dental Care and Disease Prevention",
    code: "HLT-HYG-01",
    description: "Handwashing protocols (soap, water, 20 seconds), brushing teeth twice daily, clean drinking water, and keeping body and clothes clean.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-hlt-handwashing-teeth",
        unitId: "unit-pri-health-hygiene-01",
        title: "Hand Hygiene and Oral Dental Health",
        code: "SKL-PRI-HLT-01",
        summary: "Execute the 6-step handwashing technique and practice brushing teeth twice daily to prevent plaque and tooth decay.",
        objectives: [
          "Explain why washing hands with soap destroys invisible pathogenic germs",
          "Recite critical handwashing moments (before meals, after restroom)",
          "Demonstrate brushing teeth in circular motions twice daily (morning and bedtime)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-hlt-cleanliness",
          title: "Germ Busters: Soap, Water, and Sparkling Smiles",
          hookAndIntuition: "Did you know that millions of tiny living creatures called germs can fit on the head of a pin? They are invisible, but when you touch dirty surfaces and then eat with unwashed hands, those germs sneak inside your tummy and make you sick! Soap and clean water are your superhero shield!",
          conceptualExplanation: "Good hygiene protects our bodies from illness. 1) Handwashing: Wet hands, apply soap, lather between fingers, backs of hands, and under nails for at least 20 seconds (the time to sing Happy Birthday twice), then rinse. 2) Teeth: Food sugars feed bacteria that produce acid, creating cavities. Brushing twice a day with fluoride toothpaste and a clean brush prevents toothache.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Germs", definition: "Microscopic bacteria and viruses that can cause infectious diseases.", practicalExample: "Removed by proper handwashing with soap." },
            { termOrSymbol: "Tooth Cavity (Decay)", definition: "A hole formed in a tooth when bacteria turn food sugars into tooth-damaging acid.", practicalExample: "Prevented by brushing after meals and before bed." },
            { termOrSymbol: "Personal Hygiene", definition: "Daily practices of keeping one's body, hair, teeth, and clothes clean and sanitary.", practicalExample: "Bathing daily with sponge and soap." }
          ],
          workedExamples: [
            {
              title: "When to Wash Hands",
              problemStatement: "A child just finished playing football on the school field and is about to eat a snack. What must she do?",
              steps: [
                { stepNumber: 1, instruction: "Stop before touching food", reasoning: "Her hands carry soil microbes and bacteria from the playground." },
                { stepNumber: 2, instruction: "Apply soap and running water", reasoning: "Soap bonds with grease and breaks open viral/bacterial membranes." },
                { stepNumber: 3, instruction: "Scrub for 20 seconds and dry", reasoning: "Clean hands ensure food entering the mouth remains germ-free." }
              ],
              takeawayRule: "Always wash hands with soap and running water before eating and immediately after using the toilet."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Rinsing hands quickly with water alone kills germs.",
              whyItIsWrong: "Water alone merely wets germs; soap is required to dissolve the oily coatings that cling to skin.",
              correctCorrection: "Always lather with soap and scrub for a full 20 seconds."
            }
          ],
          guidedPracticePrompt: "How many times a day should you brush your teeth, and at what specific times?",
          summaryRecap: "Wash hands with soap for 20 seconds to wash away germs, and brush teeth twice daily to stop cavities."
        },
        questions: [
          {
            id: "q-pri-hlt-01",
            type: "multiple_choice",
            questionText: "For at least how many seconds should you scrub your hands with soap and water to wash away germs?",
            options: ["20 seconds", "2 seconds", "5 seconds", "60 minutes"],
            correctAnswer: "20 seconds",
            explanation: "Public health guidelines recommend scrubbing all hand surfaces with soap for at least 20 seconds.",
            hintLadder: [
              "It is the time it takes to sing 'Happy Birthday' twice.",
              "A quick 2-second splash is not enough.",
              "20 seconds."
            ],
            misconceptionAlerts: [
              { trigger: "2 seconds", note: "2 seconds is far too brief to break down bacterial grease on skin." }
            ],
            skillId: "skill-pri-hlt-handwashing-teeth",
            difficulty: "easy"
          },
          {
            id: "q-pri-hlt-02",
            type: "multiple_choice",
            questionText: "When are the two most essential times of day to brush your teeth?",
            options: [
              "In the morning and at night before bed",
              "Only once a week on Sundays",
              "Only while eating dinner",
              "Once every month"
            ],
            correctAnswer: "In the morning and at night before bed",
            explanation: "Brushing in the morning clears overnight plaque; brushing before bed removes food sugars that bacteria would feed on all night.",
            hintLadder: [
              "You need to brush at least twice each day.",
              "When you wake up and when you go to sleep.",
              "In the morning and before bed."
            ],
            misconceptionAlerts: [
              { trigger: "Only once a week on Sundays", note: "Teeth must be brushed every single day, twice daily." }
            ],
            skillId: "skill-pri-hlt-handwashing-teeth",
            difficulty: "easy"
          },
          {
            id: "q-pri-hlt-03",
            type: "multiple_choice",
            questionText: "Drinking contaminated water that has not been boiled or filtered can lead to which waterborne illness?",
            options: ["Cholera / Diarrhea", "Broken bones", "Tooth decay", "Near-sightedness"],
            correctAnswer: "Cholera / Diarrhea",
            explanation: "Cholera and acute diarrhea are caused by ingesting water contaminated with waterborne bacterial pathogens.",
            hintLadder: [
              "Think about stomach and digestive illnesses.",
              "Dirty water carries microbes that attack the intestines.",
              "Cholera and diarrhea."
            ],
            misconceptionAlerts: [
              { trigger: "Broken bones", note: "Broken bones are physical injuries, not caused by drinking unsafe water." }
            ],
            skillId: "skill-pri-hlt-handwashing-teeth",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 6. pri_physical_education
  {
    id: "unit-pri-physical-ed-01",
    subjectId: "pri_physical_education",
    level: "primary_foundations",
    title: "Locomotor Skills, Ball Handling and Sportsmanship",
    code: "PHE-ATH-01",
    description: "Fundamental movement patterns (running, skipping, hopping), catching/throwing skills, team cooperation, and fair play.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-phe-movement-sportsmanship",
        unitId: "unit-pri-physical-ed-01",
        title: "Locomotor Movements and Rules of Fair Play",
        code: "SKL-PRI-PHE-01",
        summary: "Execute dynamic coordination patterns (hopping, leaping) and practice respectful sportsmanship.",
        objectives: [
          "Differentiate locomotor (traveling) from non-locomotor (stationary) movements",
          "Demonstrate two-handed catching with soft hands absorbing impact",
          "Define sportsmanship as playing fairly and respecting teammates and opponents"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-phe-movement",
          title: "Run, Jump, Catch: Healthy Bodies and Fair Play",
          hookAndIntuition: "When you run in a relay race and pass the baton, you feel your heart thumping fast like a drum! Exercise makes your heart, lungs, and muscles strong. And win or lose, high-fiving your opponents proves you are a true champion!",
          conceptualExplanation: "Physical education develops body agility and healthy habits. Movements where the body travels from one place to another are called 'locomotor' movements (running, skipping, galloping). Non-locomotor movements stay in one spot (bending, twisting, stretching). Sportsmanship means obeying the rules, playing honestly, and congratulating others regardless of who wins.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Locomotor Movement", definition: "A movement that carries the body from one location to another across space.", practicalExample: "Running, hopping, skipping." },
            { termOrSymbol: "Sportsmanship", definition: "Fair, polite, and generous behavior displayed by sports participants.", practicalExample: "Shaking hands after a football match." },
            { termOrSymbol: "Warm-Up", definition: "Gentle exercises performed before vigorous activity to prepare muscles and avoid injury.", practicalExample: "Light jogging and stretching." }
          ],
          workedExamples: [
            {
              title: "Catching a Bouncing Ball",
              problemStatement: "What is the proper technique to catch a ball without dropping it or hurting your fingers?",
              steps: [
                { stepNumber: 1, instruction: "Track with eyes", reasoning: "Keep your eyes locked on the ball as it flies through the air." },
                { stepNumber: 2, instruction: "Position hands like a cup", reasoning: "Fingers spread, thumbs together for high balls, pinkies together for low balls." },
                { stepNumber: 3, instruction: "Absorb impact", reasoning: "Pull hands gently toward your chest as the ball arrives to cushion the force." }
              ],
              takeawayRule: "Keep your eyes on the ball, make a soft basket with your hands, and pull inward to absorb the catch."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking sportsmanship only matters when your team is winning.",
              whyItIsWrong: "True sportsmanship is tested when you lose: maintaining composure, avoiding blaming others, and being gracious.",
              correctCorrection: "A great sportsman celebrates opponents' good plays and always plays by the rules."
            }
          ],
          guidedPracticePrompt: "Give an example of a non-locomotor movement you can do right now while standing still.",
          summaryRecap: "Locomotor skills move you across space. Exercise strengthens your heart, and sportsmanship makes games joyful for all."
        },
        questions: [
          {
            id: "q-pri-phe-01",
            type: "multiple_choice",
            questionText: "Which of the following is an example of a LOCOMOTOR movement (where your body travels across space)?",
            options: ["Running", "Bending at the waist", "Stretching your arms", "Twisting your neck"],
            correctAnswer: "Running",
            explanation: "Running moves the body from point A to point B across space, which defines a locomotor action.",
            hintLadder: [
              "Locomotor moves your whole body to a new location.",
              "Three options are done standing in one place.",
              "Running travels across distance."
            ],
            misconceptionAlerts: [
              { trigger: "Bending at the waist", note: "Bending is a non-locomotor movement because your feet stay in one spot." }
            ],
            skillId: "skill-pri-phe-movement-sportsmanship",
            difficulty: "easy"
          },
          {
            id: "q-pri-phe-02",
            type: "multiple_choice",
            questionText: "What is the primary purpose of a 'warm-up' before engaging in intense sports?",
            options: [
              "To warm up muscles and prevent strains or sports injuries",
              "To make you immediately exhausted",
              "To make the game end faster",
              "To win the game before it begins"
            ],
            correctAnswer: "To warm up muscles and prevent strains or sports injuries",
            explanation: "Warming up increases blood flow to muscles, improves flexibility, and prevents muscle tears and cramps.",
            hintLadder: [
              "Cold rubber bands snap easily when stretched; warm ones stretch smoothly.",
              "Muscles work better when gradually warmed.",
              "To warm muscles and prevent injury."
            ],
            misconceptionAlerts: [
              { trigger: "To make you immediately exhausted", note: "Warm-ups are gentle and brief so you still have peak energy for the sport." }
            ],
            skillId: "skill-pri-phe-movement-sportsmanship",
            difficulty: "easy"
          },
          {
            id: "q-pri-phe-03",
            type: "multiple_choice",
            questionText: "If your soccer team loses a match, what is the best demonstration of good sportsmanship?",
            options: [
              "Shake hands with the winning team and say 'good game'",
              "Shout angrily at the referee and storm off",
              "Blame your goalkeeper for the loss",
              "Refuse to congratulate anyone"
            ],
            correctAnswer: "Shake hands with the winning team and say 'good game'",
            explanation: "Good sportsmanship means treating opponents with respect and congratulating them gracefully regardless of the score.",
            hintLadder: [
              "How would you want opponents to treat you if you won?",
              "Respect and dignity are paramount in sports.",
              "Shake hands with the other team."
            ],
            misconceptionAlerts: [
              { trigger: "Shout angrily at the referee and storm off", note: "This is unsporting behavior and disrespects the game." }
            ],
            skillId: "skill-pri-phe-movement-sportsmanship",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 7. pri_environmental_studies
  {
    id: "unit-pri-environmental-01",
    subjectId: "pri_environmental_studies",
    level: "primary_foundations",
    title: "Ecosystems, Pollution, Waste Management and Tree Planting",
    code: "ENV-STU-01",
    description: "Living and non-living surroundings, air/water/land pollution, the 3Rs (Reduce, Reuse, Recycle), and planting trees for clean air.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-env-pollution-3rs",
        unitId: "unit-pri-environmental-01",
        title: "Types of Pollution and the Three Rs (Reduce, Reuse, Recycle)",
        code: "SKL-PRI-ENV-01",
        summary: "Identify land, water, and air pollution causes and apply waste conservation habits.",
        objectives: [
          "Define environment as everything (living and non-living) surrounding an organism",
          "Distinguish causes of land pollution (plastic litter) and water pollution (chemical dumping)",
          "Apply the 3Rs: Reduce consumption, Reuse containers, Recycle materials"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-env-planet",
          title: "Caring for Mother Earth: Clean Air, Pure Water, and the 3 Rs",
          hookAndIntuition: "Imagine if nobody ever took out the trash in your house for an entire month! It would smell terrible, attract flies and rats, and make everyone sick. Earth is our big home—when we toss plastic bags into gutters and rivers, we choke our planet! But we can be eco-heroes!",
          conceptualExplanation: "The environment is our physical surroundings. When harmful waste contaminates our surroundings, we call it pollution. Air pollution comes from generator fumes and burning tires. Water pollution happens when sewage and plastics clog streams. Land pollution occurs from open littering. We protect our habitat through the 3 Rs: Reduce what we throw away, Reuse items like glass jars and cloth bags, and Recycle plastics and papers into new products.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Pollution", definition: "The introduction of harmful or poisonous substances into the natural environment.", practicalExample: "Exhaust smoke polluting the air." },
            { termOrSymbol: "The 3 Rs", definition: "Reduce (use less), Reuse (use again), Recycle (process into new goods).", practicalExample: "Reusing a plastic bucket for gardening." },
            { termOrSymbol: "Afforestation", definition: "The planting of new trees on land that has no trees to produce oxygen and prevent soil erosion.", practicalExample: "School tree planting day." }
          ],
          workedExamples: [
            {
              title: "What to Do with an Empty Plastic Bottle",
              problemStatement: "A student finishes drinking water from a plastic bottle. What is the most eco-friendly action to take?",
              steps: [
                { stepNumber: 1, instruction: "Evaluate bad options", reasoning: "Throwing it on the ground or into a drainage gutter causes flooding and pollution." },
                { stepNumber: 2, instruction: "Apply 'Reuse'", reasoning: "She could wash it and refill it with clean drinking water." },
                { stepNumber: 3, instruction: "Apply 'Recycle'", reasoning: "Or place it into the designated plastics recycling bin to be melted into new items." }
              ],
              takeawayRule: "Never litter plastic: reuse containers when possible, or dispose in designated recycling bins."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Burning plastic trash in the yard is a good way to get rid of it.",
              whyItIsWrong: "Burning plastic releases deadly toxic gases and black carbon into the air we breathe.",
              correctCorrection: "Plastics should never be burned; they should be recycled or properly disposed of."
            }
          ],
          guidedPracticePrompt: "Why are green trees called the 'lungs of the Earth'?",
          summaryRecap: "Keep our environment clean: stop littering, practice Reduce-Reuse-Recycle, and plant trees for fresh oxygen."
        },
        questions: [
          {
            id: "q-pri-env-01",
            type: "multiple_choice",
            questionText: "What do the 'Three Rs' of environmental conservation stand for?",
            options: [
              "Reduce, Reuse, Recycle",
              "Read, Run, Rest",
              "Remember, Repeat, Review",
              "Remove, Replace, Return"
            ],
            correctAnswer: "Reduce, Reuse, Recycle",
            explanation: "The 3 Rs of waste hierarchy are Reduce (waste creation), Reuse (existing objects), and Recycle (materials into new items).",
            hintLadder: [
              "Think about waste management.",
              "Use less, use again, and process into new things.",
              "Reduce, Reuse, Recycle."
            ],
            misconceptionAlerts: [
              { trigger: "Read, Run, Rest", note: "These are general verbs, not the ecological 3 Rs of waste reduction." }
            ],
            skillId: "skill-pri-env-pollution-3rs",
            difficulty: "easy"
          },
          {
            id: "q-pri-env-02",
            type: "multiple_choice",
            questionText: "Why is dumping plastic bags and bottles into street gutters dangerous during rainy season?",
            options: [
              "It blocks drainage canals and causes destructive neighborhood flooding",
              "It makes the water taste sweeter",
              "It cleans out the gutters naturally",
              "It helps fish swim faster"
            ],
            correctAnswer: "It blocks drainage canals and causes destructive neighborhood flooding",
            explanation: "Plastics do not decompose; they lodge in drainage channels, blocking rainwater runoff and creating severe street floods.",
            hintLadder: [
              "What happens when rainwater cannot flow through a blocked drain?",
              "The water overflows into roads and homes.",
              "It causes flooding."
            ],
            misconceptionAlerts: [
              { trigger: "It cleans out the gutters naturally", note: "Litter never cleans gutters; it creates severe blockages." }
            ],
            skillId: "skill-pri-env-pollution-3rs",
            difficulty: "easy"
          },
          {
            id: "q-pri-env-03",
            type: "multiple_choice",
            questionText: "During photosynthesis, green trees absorb carbon dioxide and release which vital gas that humans breathe?",
            options: ["Oxygen", "Carbon monoxide", "Smoke", "Methane"],
            correctAnswer: "Oxygen",
            explanation: "Green plants absorb atmospheric carbon dioxide and produce oxygen, which is essential for human respiration.",
            hintLadder: [
              "Which gas do human lungs need to stay alive?",
              "It starts with 'O'.",
              "Oxygen."
            ],
            misconceptionAlerts: [
              { trigger: "Carbon monoxide", note: "Carbon monoxide is a poisonous toxic gas produced by incomplete combustion, not by trees." }
            ],
            skillId: "skill-pri-env-pollution-3rs",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 8. pri_home_economics
  {
    id: "unit-pri-home-econ-01",
    subjectId: "pri_home_economics",
    level: "primary_foundations",
    title: "The Home, Family Needs, Basic Sewing and Kitchen Safety",
    code: "HEC-LIV-01",
    description: "Domestic life skills: family roles and responsibilities, keeping rooms tidy, threading needles/running stitch, and safe food handling.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-hec-chores-kitchen-safety",
        unitId: "unit-pri-home-econ-01",
        title: "Family Chores, Room Organization and Kitchen Safety",
        code: "SKL-PRI-HEC-01",
        summary: "Identify shared household duties, organize personal belongings, and avoid common kitchen hazards (burns, slips, cuts).",
        objectives: [
          "List age-appropriate household chores that promote family cooperation",
          "Demonstrate safe practices around hot stoves, sharp knives, and wet kitchen floors",
          "Thread a needle and perform a basic temporary running stitch"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-hec-home",
          title: "A Happy, Safe Home: Teamwork, Tidiness, and Kitchen Care",
          hookAndIntuition: "A home is like a team ship! If only the captain rows while everyone else makes a mess, the ship slows down. But when every child makes their bed, sweeps their room, and helps wash dishes, the home stays clean, peaceful, and joyful for everyone!",
          conceptualExplanation: "Home Economics teaches essential life management skills. Every member of the family has roles: parents provide care and guidance, and children help with daily chores (sweeping, dusting, setting the table). The kitchen is an exciting place to cook, but has hazards: never touch pot handles pointing outward, wipe spills immediately to prevent falls, and only handle knives with adult supervision.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Household Chores", definition: "Routine tasks and cleaning duties done regularly around the house.", practicalExample: "Sweeping floors, making beds, washing dishes." },
            { termOrSymbol: "Kitchen Hazard", definition: "A potential source of danger or injury in cooking spaces.", practicalExample: "Wet slippery tiles, hot burner flames, sharp blades." },
            { termOrSymbol: "Running Stitch", definition: "A simple hand-sewing stitch made by passing the needle in and out of fabric at regular intervals.", practicalExample: "Mending a small hem tear." }
          ],
          workedExamples: [
            {
              title: "Safe Placement of Cooking Pots",
              problemStatement: "A pot of hot soup is boiling on the stove. Which way should the handle face?",
              steps: [
                { stepNumber: 1, instruction: "Examine danger of outward handle", reasoning: "If the handle sticks outward into the walkway, someone could bump it and spill scalding liquid." },
                { stepNumber: 2, instruction: "Turn handle inward", reasoning: "Turn the pot handle toward the side or back of the stove top." },
                { stepNumber: 3, instruction: "Verify safety", reasoning: "The pot cannot be accidentally knocked off by passing children." }
              ],
              takeawayRule: "Always turn cooking pot handles inward to prevent severe scalds and burns."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking household chores are only for one gender or only for parents.",
              whyItIsWrong: "Keeping a home clean, cooking, and mending are vital life survival skills for all human beings.",
              correctCorrection: "Every member of the household shares responsibility for keeping the home clean and safe."
            }
          ],
          guidedPracticePrompt: "What should you do immediately if someone spills cooking oil or water on the kitchen floor?",
          summaryRecap: "Cooperate with family chores, keep your living space tidy, and observe strict safety rules around stove flames and sharp tools."
        },
        questions: [
          {
            id: "q-pri-hec-01",
            type: "multiple_choice",
            questionText: "Why should pot handles on a stove always be turned inward toward the side or back?",
            options: [
              "To prevent someone from bumping them and spilling hot food",
              "To make the food cook in half the time",
              "To make the pot look prettier",
              "To keep the stove completely cold"
            ],
            correctAnswer: "To prevent someone from bumping them and spilling hot food",
            explanation: "Inward-facing handles cannot be snagged by passing clothing or knocked by small children, preventing severe scalding accidents.",
            hintLadder: [
              "Think about safety in the kitchen.",
              "What happens if a child bumps a handle sticking into the room?",
              "It prevents boiling liquids from spilling on people."
            ],
            misconceptionAlerts: [
              { trigger: "To make the food cook in half the time", note: "Handle direction has no effect on cooking speed; it is strictly a safety measure." }
            ],
            skillId: "skill-pri-hec-chores-kitchen-safety",
            difficulty: "easy"
          },
          {
            id: "q-pri-hec-02",
            type: "multiple_choice",
            questionText: "Which simple hand-sewing stitch is made by weaving a threaded needle in and out of cloth in a straight dashed line?",
            options: ["Running stitch", "Cross stitch", "Embroidery knot", "Machine stitch"],
            correctAnswer: "Running stitch",
            explanation: "The running stitch is the simplest basic stitch, passing straight in and out of the fabric at regular intervals.",
            hintLadder: [
              "It is the first stitch learned by beginners.",
              "The needle 'runs' in and out in a straight line.",
              "Running stitch."
            ],
            misconceptionAlerts: [
              { trigger: "Cross stitch", note: "Cross stitch forms an 'X' shape, unlike the simple in-and-out running stitch." }
            ],
            skillId: "skill-pri-hec-chores-kitchen-safety",
            difficulty: "easy"
          },
          {
            id: "q-pri-hec-03",
            type: "multiple_choice",
            questionText: "What is an important reason why food should be stored in covered containers or refrigerators?",
            options: [
              "To stop flies and pests from contaminating it and prevent spoilage",
              "To change the color of the vegetables",
              "To make the food heavier",
              "To prevent the dishes from getting washed"
            ],
            correctAnswer: "To stop flies and pests from contaminating it and prevent spoilage",
            explanation: "Covering and chilling food preserves freshness and prevents insects and bacteria from transmitting food poisoning pathogens.",
            hintLadder: [
              "Flies carry bacteria on their feet.",
              "Covering food keeps unwanted insects and germs away.",
              "It prevents contamination and spoilage."
            ],
            misconceptionAlerts: [
              { trigger: "To change the color of the vegetables", note: "Covering food preserves it; it does not change its color." }
            ],
            skillId: "skill-pri-hec-chores-kitchen-safety",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 9. pri_safety_firstaid
  {
    id: "unit-pri-safety-firstaid-01",
    subjectId: "pri_safety_firstaid",
    level: "primary_foundations",
    title: "First Aid Kit, Minor Injury Care and Emergency Response",
    code: "SFT-AID-01",
    description: "Essential first aid box contents (antiseptic, cotton wool, bandages, scissors), cleaning minor scrapes, burn treatment (cold running water), and calling emergency help.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-sft-minor-injuries",
        unitId: "unit-pri-safety-firstaid-01",
        title: "First Aid Box Essentials and Minor Scrape Treatment",
        code: "SKL-PRI-SFT-01",
        summary: "Identify medical supplies in a first aid box and explain correct steps to treat scrapes and mild burns.",
        objectives: [
          "Identify basic contents of a first aid box: antiseptic liquid, cotton wool, gauze, plaster",
          "Demonstrate 3 steps to treat a playground scrape: wash with clean water, disinfect, cover with plaster",
          "Apply immediate first aid for mild burns: cool with clean running water (never ice or butter)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-sft-firstaid",
          title: "First Aid Heroes: Quick Care for Scrapes, Bumps, and Burns",
          hookAndIntuition: "If a classmate trips on the playground and scrapes their knee, everyone rushes to help! But what should you actually do? Rub dirt on it? No! Run for the white box with the red or green cross! That is the First Aid Kit!",
          conceptualExplanation: "First Aid is the immediate care given to an injured person before professional medical help arrives. A standard kit contains: antiseptic to disinfect cuts, bandages/plasters to keep dirt out, scissors, and cotton wool. For scrapes: clean gently with water, dab antiseptic, and apply a plaster. For a mild heat burn: hold the burned skin under cool running tap water for at least 10 minutes. Never apply butter, engine oil, or ice to a burn!",
          keyTermsAndFormulas: [
            { termOrSymbol: "First Aid", definition: "The emergency care or treatment given to an ill or injured person before medical doctors arrive.", practicalExample: "Applying a sterile plaster to a bleeding cut." },
            { termOrSymbol: "Antiseptic", definition: "A substance that prevents the growth of disease-causing microorganisms on wounds.", practicalExample: "Methylated spirit or Dettol solution." },
            { termOrSymbol: "Burn Treatment Rule", definition: "Cool with clean running water for 10-20 minutes; do not burst blisters.", practicalExample: "Placing a burned finger under a running cold water tap." }
          ],
          workedExamples: [
            {
              title: "Treating a Scraped Knee on the School Field",
              problemStatement: "A pupil falls and has a minor bleeding scrape with sand on his knee. What are the correct first aid steps?",
              steps: [
                { stepNumber: 1, instruction: "Clean the wound", reasoning: "Rinse gently under clean running water to wash away dirt and gravel." },
                { stepNumber: 2, instruction: "Disinfect with antiseptic", reasoning: "Dab gently with clean cotton wool and mild antiseptic to kill bacteria." },
                { stepNumber: 3, instruction: "Protect with plaster", reasoning: "Apply a sterile adhesive plaster to keep airborne germs out while it heals." }
              ],
              takeawayRule: "Clean with water, disinfect with antiseptic, and protect with a clean plaster."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Putting butter, petroleum jelly, or toothpaste on a fresh burn.",
              whyItIsWrong: "Oils trap heat inside the skin, worsening tissue damage and increasing infection risk.",
              correctCorrection: "Only use cool, clean running water to draw the heat out of a burn."
            }
          ],
          guidedPracticePrompt: "Name three items that belong inside every school first aid box.",
          summaryRecap: "First aid saves lives: wash and bandage scrapes, cool burns with running water, and call an adult immediately for serious injuries."
        },
        questions: [
          {
            id: "q-pri-sft-01",
            type: "multiple_choice",
            questionText: "What is the proper and immediate first aid treatment for a minor thermal heat burn?",
            options: [
              "Hold the burn under cool, clean running tap water for 10 to 15 minutes",
              "Smear butter or cooking oil directly onto the burn",
              "Rub hot sand on the burn",
              "Pop any blister that appears with a sewing needle"
            ],
            correctAnswer: "Hold the burn under cool, clean running tap water for 10 to 15 minutes",
            explanation: "Cool running water draws heat out of damaged skin layers and stops ongoing tissue burning.",
            hintLadder: [
              "You need to cool the hot skin safely.",
              "Never use butter or oil, which traps heat inside.",
              "Cool running water."
            ],
            misconceptionAlerts: [
              { trigger: "Smear butter or cooking oil directly onto the burn", note: "Oils trap heat inside the burn and lead to severe infection." }
            ],
            skillId: "skill-pri-sft-minor-injuries",
            difficulty: "easy"
          },
          {
            id: "q-pri-sft-02",
            type: "multiple_choice",
            questionText: "Which item in a first aid box is used to kill germs on skin around a minor cut?",
            options: ["Antiseptic liquid", "Colored chalk", "A tube of paint", "A ballpoint pen"],
            correctAnswer: "Antiseptic liquid",
            explanation: "Antiseptics (such as iodine or chlorhexidine) destroy pathogens on living tissue to prevent wound infections.",
            hintLadder: [
              "It is a medical cleanser.",
              "'Anti-' means against, 'septic' refers to infection.",
              "Antiseptic liquid."
            ],
            misconceptionAlerts: [
              { trigger: "A tube of paint", note: "Paint contains chemicals that irritate open wounds and is not a medical item." }
            ],
            skillId: "skill-pri-sft-minor-injuries",
            difficulty: "easy"
          },
          {
            id: "q-pri-sft-03",
            type: "multiple_choice",
            questionText: "If an accident occurs at school with deep bleeding or an unconscious child, what is the pupil's first duty?",
            options: [
              "Immediately call a teacher or adult and alert the school nurse",
              "Keep it a secret and walk away",
              "Try to drag the person alone across the field",
              "Laugh and take a picture"
            ],
            correctAnswer: "Immediately call a teacher or adult and alert the school nurse",
            explanation: "In serious medical emergencies, calling adult supervisors ensures fast professional emergency intervention.",
            hintLadder: [
              "Children should never attempt dangerous medical rescues alone.",
              "An adult or nurse must be summoned right away.",
              "Alert a teacher or adult immediately."
            ],
            misconceptionAlerts: [
              { trigger: "Keep it a secret and walk away", note: "Never abandon an injured person; report to adults immediately." }
            ],
            skillId: "skill-pri-sft-minor-injuries",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];
