/**
 * MOOS TECHY ACADEMY — PRIMARY MATHEMATICS EXTENSION UNITS
 * 
 * TASK ID: MOOS-CURRICULUM-003 (Batch 1: Primary Foundations)
 * Coverage: 7 Primary Math & Quantitative Subjects:
 * - pri_math_measurement (Measurement, Money & Clocks)
 * - pri_math_geometry (Shapes, Symmetry & Spatial Geometry)
 * - pri_quantitative_reasoning (Quantitative Reasoning)
 * - pri_mental_math (Speed & Mental Math Agility)
 * - pri_data_handling (Data Handling & Bar Charts)
 * - pri_word_problems (Mathematical Word Problem Solving)
 * - pri_math_olympiad (Primary Math Olympiad & Competition Prep)
 * 
 * Standards: NERDC Primary 1-6 Math, Cambridge Primary Stage 1-6, NCEE Quantitative Spec.
 */

import { Unit } from "../../types/curriculum";

export const PRIMARY_MATH_REMAINING_UNITS: Unit[] = [
  // 1. pri_math_measurement
  {
    id: "unit-pri-math-measurement-01",
    subjectId: "pri_math_measurement",
    level: "primary_foundations",
    title: "Length, Mass, Capacity and Time Telling",
    code: "MTH-MEA-01",
    description: "Standard metric units of length (cm, m), mass (g, kg), liquid capacity (ml, l), and telling time on analog clocks.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-time-analog-clocks",
        unitId: "unit-pri-math-measurement-01",
        title: "Telling Time: Hours and Half-Hours",
        code: "SKL-PRI-MEA-01",
        summary: "Read analog clock faces accurately to the hour and half-hour using the short hour hand and long minute hand.",
        objectives: [
          "Differentiate between the hour hand (short) and minute hand (long)",
          "Identify o'clock positions when minute hand points to 12",
          "Read half-past times when minute hand points to 6"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-time-analog",
          title: "The Clock Face: Short Hands, Long Hands, and Passing Minutes",
          hookAndIntuition: "Imagine an analog clock as a circular racetrack. The short hour hand moves slowly, taking a whole hour to go from one number to the next. The long minute hand races around the entire circle every 60 minutes!",
          conceptualExplanation: "A clock dial is numbered 1 to 12. When the long minute hand points straight up at 12, it is exactly on the hour ('o'clock'). The short hand tells which hour it is (e.g. pointing to 4 means 4 o'clock). When the long hand reaches 6, it has traveled halfway around the circle (30 minutes), which we call 'half past'.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Hour Hand", definition: "The shorter, slower hand pointing directly to the hour.", practicalExample: "Points to 3 at 3:00." },
            { termOrSymbol: "Minute Hand", definition: "The longer hand pointing to minutes past the hour.", practicalExample: "Points to 12 at :00, points to 6 at :30." },
            { termOrSymbol: "Half Past", definition: "30 minutes past the hour; minute hand points to 6.", practicalExample: "Half past 7 is written 7:30." }
          ],
          workedExamples: [
            {
              title: "Reading Half Past 5",
              problemStatement: "The short hand is halfway between 5 and 6, and the long hand is pointing straight at 6. What time is it?",
              steps: [
                { stepNumber: 1, instruction: "Examine the minute hand", reasoning: "Pointing to 6 means 30 minutes have elapsed (half past)." },
                { stepNumber: 2, instruction: "Examine the hour hand", reasoning: "It is between 5 and 6, having passed 5 on its way to 6." },
                { stepNumber: 3, instruction: "State the combined time", reasoning: "The time is half past 5, or 5:30." }
              ],
              takeawayRule: "When the minute hand is at 6, the hour hand will always sit midway between two hour numbers."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Confusing the hour hand with the minute hand.",
              whyItIsWrong: "If you read the long hand as the hour, you might think 6:00 is 12:30.",
              correctCorrection: "Always check the length: short is hour, long is minute."
            }
          ],
          guidedPracticePrompt: "If the long hand points to 12 and the short hand points to 9, what time is displayed?",
          summaryRecap: "Analog clocks use two hands: short for hours, long for minutes. 12 is o'clock, 6 is half past (30 minutes)."
        },
        questions: [
          {
            id: "q-pri-mea-01",
            type: "multiple_choice",
            questionText: "When the long minute hand points to 12 and the short hour hand points to 8, what time is it?",
            options: ["8:00 (8 o'clock)", "12:08", "8:30", "12:00"],
            correctAnswer: "8:00 (8 o'clock)",
            explanation: "The short hand on 8 indicates the hour 8, and the long hand on 12 indicates 00 minutes (o'clock).",
            hintLadder: [
              "Identify the hand pointing to 12: that is the minute hand.",
              "When the minute hand points to 12, it is exactly on the hour.",
              "The short hour hand points to 8, so it is 8 o'clock."
            ],
            misconceptionAlerts: [
              { trigger: "12:08", note: "Do not read the minute hand as the hour. The short hand gives the hour." }
            ],
            skillId: "skill-pri-time-analog-clocks",
            difficulty: "easy"
          },
          {
            id: "q-pri-mea-02",
            type: "multiple_choice",
            questionText: "How many centimeters (cm) are equal to 1 meter (m)?",
            options: ["100 cm", "10 cm", "1000 cm", "50 cm"],
            correctAnswer: "100 cm",
            explanation: "The prefix 'centi-' means one-hundredth. There are exactly 100 centimeters in 1 meter.",
            hintLadder: [
              "Think of a meter rule used in school or a tailor's tape.",
              "Recall the prefix 'centi' which comes from the Latin for hundred (like century).",
              "1 meter = 100 centimeters."
            ],
            misconceptionAlerts: [
              { trigger: "1000 cm", note: "1000 millimeters make a meter, but only 100 centimeters make a meter." }
            ],
            skillId: "skill-pri-time-analog-clocks",
            difficulty: "easy"
          },
          {
            id: "q-pri-mea-03",
            type: "multiple_choice",
            questionText: "A water bottle holds 500 ml. How many of these bottles are needed to fill a 1-liter jug?",
            options: ["2 bottles", "3 bottles", "4 bottles", "5 bottles"],
            correctAnswer: "2 bottles",
            explanation: "1 liter equals 1000 ml. 500 ml + 500 ml = 1000 ml, which requires 2 bottles.",
            hintLadder: [
              "How many milliliters (ml) are in 1 liter?",
              "1 liter = 1000 ml.",
              "1000 ÷ 500 = 2 bottles."
            ],
            misconceptionAlerts: [
              { trigger: "4 bottles", note: "4 bottles of 500 ml would be 2000 ml (2 liters)." }
            ],
            skillId: "skill-pri-time-analog-clocks",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // 2. pri_math_geometry
  {
    id: "unit-pri-math-geometry-01",
    subjectId: "pri_math_geometry",
    level: "primary_foundations",
    title: "2D Polygons, 3D Solids and Lines of Symmetry",
    code: "MTH-GEO-01",
    description: "Properties of plane shapes (triangles, squares, rectangles, circles), solid shapes (cubes, spheres, cylinders), and geometric symmetry.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-geo-shapes-symmetry",
        unitId: "unit-pri-math-geometry-01",
        title: "Properties of 2D Shapes and Lines of Symmetry",
        code: "SKL-PRI-GEO-01",
        summary: "Identify edges, vertices, and reflectional symmetry lines in regular polygons.",
        objectives: [
          "Identify number of sides and vertices for common 2D polygons",
          "Distinguish squares from rectangles based on side lengths",
          "Fold shapes to verify lines of mirror symmetry"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-geo-shapes",
          title: "Corners, Edges, and Mirror Reflections",
          hookAndIntuition: "If you fold a paper butterfly right down the middle, both wings match up edge-to-edge perfectly! That fold line is a line of symmetry. Shapes in geometry also have special sides, corners, and symmetry lines.",
          conceptualExplanation: "A 2D shape is flat. The straight boundaries are called sides or edges, and the corners where two sides meet are called vertices (singular: vertex). A triangle has 3 sides and 3 vertices. A rectangle has 4 sides and 4 square corners, with opposite sides being equal in length. A square is a special rectangle where all 4 sides are identical.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Vertex (Vertices)", definition: "The sharp corner where two edges meet.", practicalExample: "A triangle has 3 vertices." },
            { termOrSymbol: "Line of Symmetry", definition: "An imaginary line dividing a shape into two identical mirror halves.", practicalExample: "A regular square has 4 lines of symmetry." },
            { termOrSymbol: "Quadrilateral", definition: "Any closed plane shape with exactly four straight sides.", practicalExample: "Rectangles, squares, and rhombuses are quadrilaterals." }
          ],
          workedExamples: [
            {
              title: "Counting Sides and Vertices of a Pentagon",
              problemStatement: "A pentagon is drawn on the board. How many sides and how many vertices does it have?",
              steps: [
                { stepNumber: 1, instruction: "Count the straight sides", reasoning: "Penta means five; tracing the perimeter gives 5 sides." },
                { stepNumber: 2, instruction: "Count the corners", reasoning: "Where each side meets the next creates 1 vertex; 5 sides yield 5 vertices." }
              ],
              takeawayRule: "In any closed 2D polygon with straight sides, the number of sides always equals the number of vertices."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking a circle has one vertex because it is round.",
              whyItIsWrong: "A circle is curved with no sharp corners; it has 0 vertices and 0 straight sides.",
              correctCorrection: "A vertex requires two straight edges to meet. Circles have zero straight edges and zero vertices."
            }
          ],
          guidedPracticePrompt: "How many lines of symmetry does a regular rectangle have? Fold a sheet of paper to test.",
          summaryRecap: "Plane shapes have straight sides and vertices. A line of symmetry folds a shape into two identical halves."
        },
        questions: [
          {
            id: "q-pri-geo-01",
            type: "multiple_choice",
            questionText: "How many vertices (corners) does a standard triangle have?",
            options: ["3", "4", "2", "5"],
            correctAnswer: "3",
            explanation: "A triangle is a three-sided polygon with exactly 3 vertices.",
            hintLadder: [
              "Tri- means three (like a tricycle has three wheels).",
              "Count each corner where two lines connect.",
              "A triangle has 3 corners."
            ],
            misconceptionAlerts: [
              { trigger: "4", note: "Shapes with 4 corners are quadrilaterals (like squares or rectangles)." }
            ],
            skillId: "skill-pri-geo-shapes-symmetry",
            difficulty: "easy"
          },
          {
            id: "q-pri-geo-02",
            type: "multiple_choice",
            questionText: "Which 3D solid shape has 6 flat square faces, 12 edges, and 8 corners?",
            options: ["Cube", "Cylinder", "Sphere", "Cone"],
            correctAnswer: "Cube",
            explanation: "A cube is composed of 6 identical square faces, 12 straight edges, and 8 vertices.",
            hintLadder: [
              "Think of a game die or a box of sugar cubes.",
              "Cylinders and cones have curved surfaces; spheres have no flat faces.",
              "A cube has 6 flat square faces."
            ],
            misconceptionAlerts: [
              { trigger: "Cylinder", note: "A cylinder has 2 circular faces and 1 curved surface, not square faces." }
            ],
            skillId: "skill-pri-geo-shapes-symmetry",
            difficulty: "easy"
          },
          {
            id: "q-pri-geo-03",
            type: "multiple_choice",
            questionText: "How many lines of symmetry does a standard non-square rectangle have?",
            options: ["2", "4", "1", "0"],
            correctAnswer: "2",
            explanation: "A rectangle can be folded in half horizontally and vertically, giving 2 lines of symmetry. Folding diagonally does not align the corners.",
            hintLadder: [
              "Try folding a sheet of notebook paper.",
              "It folds cleanly across the horizontal middle and vertical middle.",
              "Diagonals do not match up cleanly, so it has exactly 2 lines of symmetry."
            ],
            misconceptionAlerts: [
              { trigger: "4", note: "A square has 4 lines of symmetry, but an oblong rectangle only has 2." }
            ],
            skillId: "skill-pri-geo-shapes-symmetry",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // 3. pri_quantitative_reasoning
  {
    id: "unit-pri-quantitative-01",
    subjectId: "pri_quantitative_reasoning",
    level: "primary_foundations",
    title: "Pattern Rules, Logic Matrices and Number Boxes",
    code: "MTH-QR-01",
    description: "Decode symbolic arithmetic relationships in sample diagrams (boxes, circles, pyramids) and solve missing-term puzzles.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-qr-box-puzzles",
        unitId: "unit-pri-quantitative-01",
        title: "Decoding Arithmetic Sample Diagrams",
        code: "SKL-PRI-QR-01",
        summary: "Identify the hidden operational rule connecting numbers in a sample figure and apply it to find unknown values.",
        objectives: [
          "Examine given samples to deduce the mathematical rule (sum, difference, product)",
          "Verify the rule on all provided sample diagrams",
          "Apply the verified rule to calculate the missing number in problem diagrams"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-qr-decoding",
          title: "Being a Math Detective: Finding the Secret Pattern",
          hookAndIntuition: "Imagine an escape room where a safe has three numbers: 4 at top, 3 at bottom-left, and 7 at bottom-right. Another safe has 5 at top, 2 at bottom-left, and 7 at bottom-right. What is the secret code connecting them? 4 + 3 = 7, and 5 + 2 = 7! The rule is: Top + Bottom Left = Bottom Right!",
          conceptualExplanation: "In Quantitative Reasoning, you are given a 'Sample' box with numbers. Your job is not just to calculate, but to discover the mathematical relationship connecting the positions. Once you verify that your suspected rule works for all samples, you apply the exact same relationship to solve the question box.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Sample Diagram", definition: "A completed diagram showing how the numbers relate to each other.", practicalExample: "Sample: [Top: 6, Left: 2, Right: 8] shows 6 + 2 = 8." },
            { termOrSymbol: "Inverse Operation", definition: "The reverse calculation used to find a missing component (e.g. Subtraction reverses Addition).", practicalExample: "If Top + Left = Right, then Top = Right - Left." }
          ],
          workedExamples: [
            {
              title: "Solving a Triangle Pyramid Puzzle",
              problemStatement: "Sample A: Top = 12, Bottom-left = 4, Bottom-right = 3. Sample B: Top = 20, Bottom-left = 5, Bottom-right = 4. Find the missing Top number if Bottom-left = 6 and Bottom-right = 7.",
              steps: [
                { stepNumber: 1, instruction: "Test relationships in Sample A", reasoning: "4 × 3 = 12. Top is the product of the bottom numbers." },
                { stepNumber: 2, instruction: "Verify with Sample B", reasoning: "5 × 4 = 20. The rule holds true: Top = Left × Right." },
                { stepNumber: 3, instruction: "Apply rule to target problem", reasoning: "Top = 6 × 7 = 42." }
              ],
              takeawayRule: "Always test your guessed rule on at least two samples before applying it to the question."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming the first pattern you notice must be addition.",
              whyItIsWrong: "Quantitative patterns can involve subtraction, multiplication, division, or two-step combinations.",
              correctCorrection: "Always test both addition, multiplication, and subtraction across all sample figures."
            }
          ],
          guidedPracticePrompt: "If Top = 15, Left = 10, Right = 5, what operation connects them? Write the formula.",
          summaryRecap: "Quantitative reasoning tests mathematical logic: uncover the rule in the samples, verify it, then compute the unknown."
        },
        questions: [
          {
            id: "q-pri-qr-01",
            type: "multiple_choice",
            questionText: "Sample rule: Top = Left + Right. In a puzzle, Left = 14 and Right = 19. What is the value of Top?",
            options: ["33", "25", "35", "5"],
            correctAnswer: "33",
            explanation: "Applying the rule: Top = Left + Right = 14 + 19 = 33.",
            hintLadder: [
              "The rule is given directly: Top is the sum of Left and Right.",
              "Add 14 + 19.",
              "14 + 19 = 33."
            ],
            misconceptionAlerts: [
              { trigger: "25", note: "Check your addition: 4 + 9 = 13 (write 3, carry 1), 1 + 1 + 1 = 3 -> 33." }
            ],
            skillId: "skill-pri-qr-box-puzzles",
            difficulty: "easy"
          },
          {
            id: "q-pri-qr-02",
            type: "multiple_choice",
            questionText: "Sample diagram: [Left: 3, Right: 7 -> Center: 21]. [Left: 4, Right: 5 -> Center: 20]. If Left = 6 and Center = 48, what is Right?",
            options: ["8", "7", "9", "42"],
            correctAnswer: "8",
            explanation: "The rule is Center = Left × Right. To find Right: 48 ÷ 6 = 8.",
            hintLadder: [
              "Examine the samples: 3 × 7 = 21, and 4 × 5 = 20. The rule is multiplication.",
              "Center = Left × Right.",
              "6 × ? = 48. 48 ÷ 6 = 8."
            ],
            misconceptionAlerts: [
              { trigger: "42", note: "Did you subtract 48 - 6? The relationship in the samples is multiplication, so use division." }
            ],
            skillId: "skill-pri-qr-box-puzzles",
            difficulty: "medium"
          },
          {
            id: "q-pri-qr-03",
            type: "multiple_choice",
            questionText: "Look at this sequence: 3, 7, 11, 15, ___. What is the next number?",
            options: ["19", "18", "20", "16"],
            correctAnswer: "19",
            explanation: "Each number increases by 4 (3 + 4 = 7; 7 + 4 = 11; 11 + 4 = 15). 15 + 4 = 19.",
            hintLadder: [
              "Find the difference between consecutive terms: 7 - 3 = 4.",
              "Check the next step: 11 - 7 = 4, 15 - 11 = 4. The step size is +4.",
              "Add 4 to 15: 15 + 4 = 19."
            ],
            misconceptionAlerts: [
              { trigger: "18", note: "Count forward by exactly 4 from 15: 16, 17, 18, 19." }
            ],
            skillId: "skill-pri-qr-box-puzzles",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 4. pri_mental_math
  {
    id: "unit-pri-mental-math-01",
    subjectId: "pri_mental_math",
    level: "primary_foundations",
    title: "Mental Addition, Making Tens and Doubling Strategies",
    code: "MTH-MM-01",
    description: "Rapid mental arithmetic strategies: bridging to ten, near doubles, compensation, and instant multiplication facts.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-mm-making-tens",
        unitId: "unit-pri-mental-math-01",
        title: "Bridging Through 10 and Near Doubles",
        code: "SKL-PRI-MM-01",
        summary: "Decompose addends to make landmark multiples of ten mentally without pencil and paper.",
        objectives: [
          "Identify pairs of numbers that add up to 10 (number bonds to 10)",
          "Use the 'make a ten' strategy to solve 8 + 5 mentally",
          "Apply near-doubles strategy (e.g. 7 + 8 = 7 + 7 + 1)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-mm-strategies",
          title: "Math in Your Head: Fast Tricks with Tens and Doubles",
          hookAndIntuition: "Why do store cashiers add numbers so fast without a calculator? They don't count on their fingers—they look for friendly tens! 8 needs 2 to make 10, so they split 5 into 2 and 3: 8 + 2 is 10, plus 3 is 13! Done in a flash!",
          conceptualExplanation: "Mental math is about choosing friendly paths. Our brains love 10 and multiples of 10. In addition, when adding 9 + 6, you mentally take 1 from 6 to give to 9, making 10 + 5 = 15. In near doubles, if you know 6 + 6 = 12, then 6 + 7 is just one more: 13.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Number Bond to 10", definition: "Two numbers that combine to equal 10 (e.g. 1+9, 2+8, 3+7, 4+6, 5+5).", practicalExample: "8 + 2 = 10." },
            { termOrSymbol: "Near Double", definition: "An addition problem where the numbers differ by only 1.", practicalExample: "7 + 8 = (7 + 7) + 1 = 15." }
          ],
          workedExamples: [
            {
              title: "Mental Calculation of 28 + 15",
              problemStatement: "Add 28 and 15 in your head using friendly tens.",
              steps: [
                { stepNumber: 1, instruction: "Round up to the nearest ten", reasoning: "28 needs 2 to reach 30." },
                { stepNumber: 2, instruction: "Borrow 2 from 15", reasoning: "15 minus 2 leaves 13." },
                { stepNumber: 3, instruction: "Combine friendly numbers", reasoning: "30 + 13 = 43." }
              ],
              takeawayRule: "Turn difficult numbers into round tens to make mental calculation instant and error-free."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Trying to visualize standard vertical carrying columns in your head.",
              whyItIsWrong: "Carrying columns require holding multiple memory placeholders, which causes mental overload.",
              correctCorrection: "Decompose numbers left-to-right (tens first, then units) or bridge to the nearest round ten."
            }
          ],
          guidedPracticePrompt: "Use near doubles to solve 8 + 9 mentally. Explain your trick.",
          summaryRecap: "Master number bonds to 10 and near doubles to calculate sums rapidly without paper."
        },
        questions: [
          {
            id: "q-pri-mm-01",
            type: "multiple_choice",
            questionText: "Using the 'make a ten' strategy, what is the best first step to add 9 + 7 mentally?",
            options: [
              "Take 1 from 7 to make 9 into 10, leaving 10 + 6 = 16",
              "Count 7 fingers after 9 one by one",
              "Multiply 9 by 7 and divide by 2",
              "Subtract 7 from 9"
            ],
            correctAnswer: "Take 1 from 7 to make 9 into 10, leaving 10 + 6 = 16",
            explanation: "9 needs 1 to reach 10. Decomposing 7 into 1 + 6 allows 9 + 1 = 10, and 10 + 6 = 16.",
            hintLadder: [
              "What number does 9 need to reach 10?",
              "9 needs 1. Where can we borrow 1 from?",
              "Borrow 1 from 7, leaving 6. 10 + 6 = 16."
            ],
            misconceptionAlerts: [
              { trigger: "Count 7 fingers after 9 one by one", note: "Finger counting works, but 'make a ten' is the faster mental math strategy." }
            ],
            skillId: "skill-pri-mm-making-tens",
            difficulty: "easy"
          },
          {
            id: "q-pri-mm-02",
            type: "multiple_choice",
            questionText: "If 7 + 7 = 14, what is the value of 7 + 8 using near doubles?",
            options: ["15", "16", "13", "14"],
            correctAnswer: "15",
            explanation: "8 is 1 more than 7. Therefore, 7 + 8 is 1 more than 14, which is 15.",
            hintLadder: [
              "Compare 7 + 8 with 7 + 7.",
              "8 is 1 greater than 7.",
              "14 + 1 = 15."
            ],
            misconceptionAlerts: [
              { trigger: "16", note: "16 would be 8 + 8. 7 + 8 is only 1 more than 14." }
            ],
            skillId: "skill-pri-mm-making-tens",
            difficulty: "easy"
          },
          {
            id: "q-pri-mm-03",
            type: "multiple_choice",
            questionText: "Mentally calculate: 45 + 35.",
            options: ["80", "70", "85", "75"],
            correctAnswer: "80",
            explanation: "Add the tens: 40 + 30 = 70. Add the units: 5 + 5 = 10. 70 + 10 = 80.",
            hintLadder: [
              "Split each number into tens and units.",
              "40 + 30 = 70. And 5 + 5 = 10.",
              "70 + 10 = 80."
            ],
            misconceptionAlerts: [
              { trigger: "70", note: "Did you forget to add the 5 + 5 units (10)?" }
            ],
            skillId: "skill-pri-mm-making-tens",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 5. pri_data_handling
  {
    id: "unit-pri-data-handling-01",
    subjectId: "pri_data_handling",
    level: "primary_foundations",
    title: "Tally Charts, Pictograms and Bar Graphs",
    code: "MTH-DATA-01",
    description: "Collect primary data using tally marks, represent frequencies with pictograms (key-based), and interpret vertical/horizontal bar graphs.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-data-tally-bar",
        unitId: "unit-pri-data-handling-01",
        title: "Reading Tally Marks and Bar Charts",
        code: "SKL-PRI-DATA-01",
        summary: "Interpret bundles of 5 tallies and read values from the vertical axis of bar graphs.",
        objectives: [
          "Group tallies in bundles of 5 (four vertical bars crossed by one diagonal)",
          "Convert tally totals into frequency tables",
          "Compare categories on a bar chart to identify most/least frequent items"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-data-tally",
          title: "Counting with Sticks and Towers: Tallies and Bars",
          hookAndIntuition: "Imagine you are voting for class monitor. Every time someone votes for Amina, you draw a stick |. When you reach 4 sticks, the 5th stick crosses through like a gate: 卌! Now counting votes is as easy as counting by 5s: 5, 10, 15!",
          conceptualExplanation: "Data is information we collect. Tally marks help us count without losing our place. Once all tallies are recorded, we can draw a bar chart where the height of each colored bar corresponds to the number of items on the scale axis. The tallest bar represents the most popular choice.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Tally Bundle", definition: "A group of five marks: 4 upright sticks and 1 diagonal crossing strike.", practicalExample: "Two full bundles = 5 + 5 = 10." },
            { termOrSymbol: "Frequency", definition: "How many times a particular value or category occurs.", practicalExample: "The frequency of mango lovers is 12." },
            { termOrSymbol: "Scale", definition: "The numbered markings along the axis showing what each grid line represents.", practicalExample: "A scale going up in 2s: 0, 2, 4, 6, 8." }
          ],
          workedExamples: [
            {
              title: "Interpreting Favorite Fruit Survey",
              problemStatement: "In a class survey, Bananas have two tally bundles and 3 single sticks. Apples have three full tally bundles. How many students chose each?",
              steps: [
                { stepNumber: 1, instruction: "Count Bananas", reasoning: "Two bundles = 5 + 5 = 10. Plus 3 single sticks = 10 + 3 = 13 students." },
                { stepNumber: 2, instruction: "Count Apples", reasoning: "Three full bundles = 5 + 5 + 5 = 15 students." },
                { stepNumber: 3, instruction: "Compare results", reasoning: "Apples were chosen by 2 more students than Bananas (15 - 13 = 2)." }
              ],
              takeawayRule: "Each full tally bundle equals exactly 5. Count bundles by fives, then add remaining single sticks."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Counting the diagonal cross-strike as a 6th stick.",
              whyItIsWrong: "The diagonal slash IS the 5th mark that ties the bundle of 4 upright marks together.",
              correctCorrection: "One bundle = exactly 5 items (4 vertical + 1 diagonal)."
            }
          ],
          guidedPracticePrompt: "If a pictogram symbol represents 2 bicycles, how many bicycles do 4 symbols represent?",
          summaryRecap: "Tally marks group data in 5s. Bar charts visually compare totals using column heights."
        },
        questions: [
          {
            id: "q-pri-data-01",
            type: "multiple_choice",
            questionText: "How many counts are represented by three full tally bundles and two single sticks?",
            options: ["17", "15", "12", "18"],
            correctAnswer: "17",
            explanation: "Three bundles = 3 × 5 = 15. Plus 2 single sticks = 15 + 2 = 17.",
            hintLadder: [
              "Each bundle of tallies equals 5.",
              "Count the 3 bundles: 5, 10, 15.",
              "Add the 2 loose sticks: 15 + 2 = 17."
            ],
            misconceptionAlerts: [
              { trigger: "15", note: "Did you forget to add the two single sticks?" }
            ],
            skillId: "skill-pri-data-tally-bar",
            difficulty: "easy"
          },
          {
            id: "q-pri-data-02",
            type: "multiple_choice",
            questionText: "On a pictogram, one star symbol ⭐ represents 4 books read. Chidi has 3 stars next to his name. How many books did Chidi read?",
            options: ["12 books", "7 books", "16 books", "3 books"],
            correctAnswer: "12 books",
            explanation: "Each star is worth 4 books. 3 stars × 4 books per star = 12 books.",
            hintLadder: [
              "Check the key: 1 star = 4 books.",
              "Chidi has 3 stars.",
              "Multiply 3 × 4 = 12."
            ],
            misconceptionAlerts: [
              { trigger: "7 books", note: "Did you add 3 + 4? The key means each star represents 4 books, so multiply 3 × 4." }
            ],
            skillId: "skill-pri-data-tally-bar",
            difficulty: "easy"
          },
          {
            id: "q-pri-data-03",
            type: "multiple_choice",
            questionText: "On a bar chart of pets: Dogs = 14, Cats = 9, Birds = 5. How many more students have dogs than cats?",
            options: ["5", "4", "9", "23"],
            correctAnswer: "5",
            explanation: "Difference between dogs and cats = 14 - 9 = 5.",
            hintLadder: [
              "Locate the dog bar: 14.",
              "Locate the cat bar: 9.",
              "Subtract to find the difference: 14 - 9 = 5."
            ],
            misconceptionAlerts: [
              { trigger: "23", note: "23 is the total of dogs and cats combined (14 + 9). The question asks how many MORE, which requires subtraction." }
            ],
            skillId: "skill-pri-data-tally-bar",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // 6. pri_word_problems
  {
    id: "unit-pri-word-problems-01",
    subjectId: "pri_word_problems",
    level: "primary_foundations",
    title: "Multi-Step Real-World Word Problem Solving",
    code: "MTH-WP-01",
    description: "Translate verbal narrative problems into mathematical equations using the 4-step Polya model (Understand, Plan, Solve, Check).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-wp-translating-text",
        unitId: "unit-pri-word-problems-01",
        title: "Translating Verbal Keywords into Operations",
        code: "SKL-PRI-WP-01",
        summary: "Identify clues like 'altogether', 'left over', 'shared equally', and 'times as many' to select correct arithmetic operations.",
        objectives: [
          "Highlight operational keyword clues in narrative word problems",
          "Write corresponding mathematical number sentences",
          "Verify the physical reasonableness of the answer"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-wp-polya",
          title: "Decoding Word Problems: From Words to Equations",
          hookAndIntuition: "A word problem is just a story with a math secret inside! When you read 'Kofi bought 12 pencils and shared them equally among 3 friends', the clue words 'shared equally' tell you: divide! 12 ÷ 3 = 4 pencils each!",
          conceptualExplanation: "To solve any word problem, follow 4 steps: 1) Understand: Read twice and underline what is given and what you must find. 2) Plan: Look for operation keywords ('sum', 'total', 'difference', 'product', 'share'). 3) Solve: Write the number sentence and calculate. 4) Check: Does your answer make real-world sense?",
          keyTermsAndFormulas: [
            { termOrSymbol: "Addition Keywords", definition: "Words signaling addition: total, altogether, combined, in all, sum.", practicalExample: "'How many in all?' -> Add." },
            { termOrSymbol: "Subtraction Keywords", definition: "Words signaling subtraction: left, remaining, difference, how many more.", practicalExample: "'How many were left?' -> Subtract." },
            { termOrSymbol: "Division Keywords", definition: "Words signaling division: shared equally, distributed among, per person.", practicalExample: "'Shared equally among 4' -> Divide by 4." }
          ],
          workedExamples: [
            {
              title: "Solving a Two-Step Market Problem",
              problemStatement: "Fatimah had ₦500. She bought 3 notebooks at ₦100 each. How much money does she have left?",
              steps: [
                { stepNumber: 1, instruction: "Calculate total cost of books", reasoning: "3 notebooks × ₦100 each = ₦300 spent." },
                { stepNumber: 2, instruction: "Calculate remaining change", reasoning: "Starting amount (₦500) - Spent (₦300) = ₦200." },
                { stepNumber: 3, instruction: "Check reasonableness", reasoning: "₦300 + ₦200 = ₦500. The solution is verified." }
              ],
              takeawayRule: "Break multi-step word problems into individual operations: first find total spent, then subtract from starting money."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding every number you see in the problem without reading context.",
              whyItIsWrong: "In 'Fatimah had ₦500 and bought 3 books for ₦100 each', adding 500 + 3 + 100 = 603 gives an absurd result.",
              correctCorrection: "Always identify what each number represents before calculating."
            }
          ],
          guidedPracticePrompt: "A farmer collected 48 eggs. 6 were cracked. The rest were packed into boxes of 6. How many full boxes did he pack?",
          summaryRecap: "Read word problems actively: highlight keyword clues, choose the right operation, and check if your answer makes real-world sense."
        },
        questions: [
          {
            id: "q-pri-wp-01",
            type: "multiple_choice",
            questionText: "Emeka had 35 marbles. He gave 12 marbles to his brother and bought 8 new ones. How many marbles does Emeka have now?",
            options: ["31 marbles", "23 marbles", "15 marbles", "43 marbles"],
            correctAnswer: "31 marbles",
            explanation: "Step 1: 35 - 12 = 23 marbles remaining. Step 2: 23 + 8 = 31 marbles in total.",
            hintLadder: [
              "Giving away means subtraction: 35 - 12.",
              "35 - 12 = 23.",
              "Buying new ones means addition: 23 + 8 = 31."
            ],
            misconceptionAlerts: [
              { trigger: "23 marbles", note: "23 is how many he had before buying the 8 new marbles. Don't forget step 2!" }
            ],
            skillId: "skill-pri-wp-translating-text",
            difficulty: "medium"
          },
          {
            id: "q-pri-wp-02",
            type: "multiple_choice",
            questionText: "A baker packs 4 cupcakes into each box. How many boxes are needed to pack 36 cupcakes?",
            options: ["9 boxes", "8 boxes", "12 boxes", "40 boxes"],
            correctAnswer: "9 boxes",
            explanation: "36 cupcakes divided into groups of 4 = 36 ÷ 4 = 9 boxes.",
            hintLadder: [
              "Grouping into equal boxes means division.",
              "Divide total cupcakes (36) by cupcakes per box (4).",
              "36 ÷ 4 = 9."
            ],
            misconceptionAlerts: [
              { trigger: "40 boxes", note: "Did you add 36 + 4? Packing into boxes requires division." }
            ],
            skillId: "skill-pri-wp-translating-text",
            difficulty: "easy"
          },
          {
            id: "q-pri-wp-03",
            type: "multiple_choice",
            questionText: "In a school library, there are 4 shelves with 25 books on each shelf. The librarian adds 15 new books. What is the total number of books now?",
            options: ["115 books", "100 books", "44 books", "125 books"],
            correctAnswer: "115 books",
            explanation: "Step 1: 4 shelves × 25 books = 100 books. Step 2: 100 + 15 new books = 115 books.",
            hintLadder: [
              "First multiply shelves by books: 4 × 25.",
              "4 × 25 = 100.",
              "Add the 15 new books: 100 + 15 = 115."
            ],
            misconceptionAlerts: [
              { trigger: "100 books", note: "100 is just the existing books. Don't forget to add the 15 new books." }
            ],
            skillId: "skill-pri-wp-translating-text",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // 7. pri_math_olympiad
  {
    id: "unit-pri-math-olympiad-01",
    subjectId: "pri_math_olympiad",
    level: "primary_foundations",
    title: "Non-Routine Problem Solving, Logic and Spatial Riddles",
    code: "MTH-OLY-01",
    description: "Challenging contest-level mathematics: pigeonhole logic, working backwards, parity (even/odd), and combinatoric arrangements.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-oly-working-backwards",
        unitId: "unit-pri-math-olympiad-01",
        title: "Inversion and Logical Working Backwards",
        code: "SKL-PRI-OLY-01",
        summary: "Solve puzzle problems by reversing given operations starting from the final known outcome.",
        objectives: [
          "Identify sequence of operations applied to an unknown initial number",
          "Reverse operations in opposite order (+ becomes -, × becomes ÷)",
          "Verify the recovered starting number by forward simulation"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-oly-inversion",
          title: "The Time Machine Method: Working Backwards to the Start",
          hookAndIntuition: "Imagine you drop a secret number into a machine. The machine multiplies it by 2, then adds 5, and the screen displays 21! How do you find what number you dropped in? Rewind the tape! Subtract 5 from 21 (gives 16), then divide by 2 (gives 8)! The secret number was 8!",
          conceptualExplanation: "In math competitions, problems often disguise the starting point by giving a chain of transformations ending in a final result. The most powerful strategy is 'working backwards': undo each step one by one, using inverse operations in reverse chronological order.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Inverse Operations", definition: "Operations that undo each other: Addition <-> Subtraction; Multiplication <-> Division.", practicalExample: "If step was +7, reverse step is -7." },
            { termOrSymbol: "Parity", definition: "The property of an integer being even or odd.", practicalExample: "Odd + Odd = Even; Even + Odd = Odd." }
          ],
          workedExamples: [
            {
              title: "The Basket of Oranges Riddle",
              problemStatement: "A boy has a basket of oranges. He gives half of them to his sister, then eats 3 oranges. He now has 7 oranges left. How many oranges were in the basket at the start?",
              steps: [
                { stepNumber: 1, instruction: "Undo the last action (eating 3 oranges)", reasoning: "Before eating 3, he had 7 + 3 = 10 oranges." },
                { stepNumber: 2, instruction: "Undo giving away half", reasoning: "If 10 was half of his basket, the original total was 10 × 2 = 20 oranges." },
                { stepNumber: 3, instruction: "Verify forward", reasoning: "Start with 20. Half given away = 10. Eat 3 = 7 left. Correct!" }
              ],
              takeawayRule: "Start at the ending number, undo every operation in reverse sequence, and always verify forwards."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Undoing operations in the original order instead of reverse order.",
              whyItIsWrong: "If you multiply first then add, you must subtract first then divide when working backwards.",
              correctCorrection: "LIFO order: Last In, First Out. Undo the most recent event first."
            }
          ],
          guidedPracticePrompt: "I think of a number, multiply it by 3, and add 6. The result is 24. What was my starting number?",
          summaryRecap: "Olympiad challenges reward systematic reasoning: reverse the operations step-by-step to unlock the starting state."
        },
        questions: [
          {
            id: "q-pri-oly-01",
            type: "multiple_choice",
            questionText: "A secret number is multiplied by 4, then 10 is subtracted. The final result is 26. What was the secret number?",
            options: ["9", "8", "7", "10"],
            correctAnswer: "9",
            explanation: "Work backwards: 26 + 10 = 36. 36 ÷ 4 = 9. Verification: 9 × 4 = 36; 36 - 10 = 26.",
            hintLadder: [
              "Start with the final number: 26.",
              "Undo '- 10' by adding 10: 26 + 10 = 36.",
              "Undo '× 4' by dividing by 4: 36 ÷ 4 = 9."
            ],
            misconceptionAlerts: [
              { trigger: "7", note: "Did you subtract 10 instead of adding? When reversing, subtraction becomes addition." }
            ],
            skillId: "skill-pri-oly-working-backwards",
            difficulty: "medium"
          },
          {
            id: "q-pri-oly-02",
            type: "multiple_choice",
            questionText: "There are 7 red socks and 7 blue socks loose in a dark drawer. What is the minimum number of socks you must pull out without looking to be 100% sure of having a matching pair?",
            options: ["3 socks", "2 socks", "8 socks", "14 socks"],
            correctAnswer: "3 socks",
            explanation: "By the Pigeonhole Principle: There are only 2 colors (red and blue). If you pull 2 socks, they could be 1 red and 1 blue. The 3rd sock must match either red or blue.",
            hintLadder: [
              "How many colors are in the drawer? Just two colors: red and blue.",
              "Worst-case scenario: Sock 1 is red, Sock 2 is blue.",
              "Sock 3 MUST be either red or blue, completing a matching pair. So 3 socks are needed."
            ],
            misconceptionAlerts: [
              { trigger: "2 socks", note: "You could get 1 red and 1 blue, which is not a matching pair. You need 3 to guarantee it." },
              { trigger: "8 socks", note: "8 guarantees getting a specific color, but 3 guarantees getting ANY matching pair." }
            ],
            skillId: "skill-pri-oly-working-backwards",
            difficulty: "medium"
          },
          {
            id: "q-pri-oly-03",
            type: "multiple_choice",
            questionText: "Three children, Tunde, Musa, and Ngozi, run a race. In how many different orders can they cross the finish line (assuming no ties)?",
            options: ["6 orders", "3 orders", "9 orders", "4 orders"],
            correctAnswer: "6 orders",
            explanation: "1st place: 3 choices. 2nd place: 2 remaining choices. 3rd place: 1 remaining choice. 3 × 2 × 1 = 6 possible finish orders.",
            hintLadder: [
              "List them systematically or multiply choices.",
              "First place can be any of the 3 runners.",
              "Once first place finishes, 2 runners remain for second place. 3 × 2 = 6."
            ],
            misconceptionAlerts: [
              { trigger: "3 orders", note: "There are 3 runners, but there are multiple permutations: TMN, TNM, MTN, MNT, NTM, NMT (6 total)." }
            ],
            skillId: "skill-pri-oly-working-backwards",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];
