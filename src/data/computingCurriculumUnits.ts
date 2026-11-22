import { Unit } from "../types/curriculum";

export const COMPUTING_UNITS: Unit[] = [
  {
    id: "unit-cs-architecture-number-systems",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Digital Representation, Binary Arithmetic & Hardware Architecture",
    code: "CSC-UNIT-01",
    description: "Number bases (Binary, Hexadecimal), two's complement signed arithmetic, ASCII/Unicode character encoding, and Von Neumann computer architecture.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-cs-number-systems",
        unitId: "unit-cs-architecture-number-systems",
        title: "Number Base Conversions & Two's Complement",
        code: "SKL-CSC-201",
        summary: "Converting numbers across Decimal (Base 10), Binary (Base 2), and Hexadecimal (Base 16), and computing negative integers in two's complement.",
        objectives: [
          "Convert unsigned integers between base 10, base 2, and base 16 representations",
          "Represent signed negative integers using 8-bit Two's Complement notation",
          "Explain why hexadecimal notation is preferred by computer systems for memory addressing"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-num-1",
            type: "multiple_choice",
            questionText: "Convert the decimal value 157 into its 8-bit binary representation.",
            mathExpression: "157_{10} = (?)_2",
            options: ["10011101", "10101101", "11001101", "10011011"],
            correctAnswer: "10011101",
            explanation: "157 = 128 + 16 + 8 + 4 + 1. Powers of 2: 128(1), 64(0), 32(0), 16(1), 8(1), 4(1), 2(0), 1(1) = 10011101.",
            hintLadder: [
              "Subtract the largest power of 2 less than or equal to 157 (128): 157 - 128 = 29.",
              "From 29, subtract 16 (remainder 13), then 8 (remainder 5), then 4 (remainder 1), then 1 (remainder 0).",
              "Place 1s at positions 128, 16, 8, 4, 1 and 0s elsewhere: 10011101."
            ],
            misconceptionAlerts: [
              { trigger: "10101101", note: "10101101 equals 128 + 32 + 8 + 4 + 1 = 173, not 157." }
            ],
            skillId: "skill-cs-number-systems",
            difficulty: "medium"
          },
          {
            id: "q-cs-num-2",
            type: "multiple_choice",
            questionText: "Convert the 8-bit binary number 11101100 into its two-digit Hexadecimal representation.",
            mathExpression: "1110\\,1100_2 = (?)_ {16}",
            options: ["EC", "DB", "FE", "CA"],
            correctAnswer: "EC",
            explanation: "Split into 4-bit nibbles: 1110 and 1100. 1110 = 8+4+2+0 = 14 = 'E'. 1100 = 8+4+0+0 = 12 = 'C'. Result is EC.",
            hintLadder: [
              "Group the 8 bits into two 4-bit nibbles: [1110] and [1100].",
              "Convert first nibble: 1110 = 14 = 'E' in hexadecimal (A=10, B=11, C=12, D=13, E=14, F=15).",
              "Convert second nibble: 1100 = 12 = 'C'. Combine: 'EC'."
            ],
            misconceptionAlerts: [
              { trigger: "DB", note: "D is 13 (1101) and B is 11 (1011), which does not match 1110 1100." }
            ],
            skillId: "skill-cs-number-systems",
            difficulty: "easy"
          },
          {
            id: "q-cs-num-3",
            type: "multiple_choice",
            questionText: "What is the 8-bit Two's Complement representation of the decimal integer -19?",
            mathExpression: "-19_{10} \\text{ in 8-bit Two's Complement}",
            options: ["11101101", "11101100", "00010011", "10010011"],
            correctAnswer: "11101101",
            explanation: "+19 in 8-bit is 00010011. Invert all bits (One's complement): 11101100. Add 1: 11101100 + 1 = 11101101.",
            hintLadder: [
              "Step 1: Write +19 in 8-bit binary: 00010011 (16 + 2 + 1).",
              "Step 2: Invert all bits: 11101100.",
              "Step 3: Add 1 to the result: 11101100 + 1 = 11101101."
            ],
            misconceptionAlerts: [
              { trigger: "10010011", note: "10010011 is Sign-and-Magnitude notation, not Two's Complement." },
              { trigger: "11101100", note: "11101100 is One's Complement (you forgot to add 1)." }
            ],
            skillId: "skill-cs-number-systems",
            difficulty: "hard"
          }
        ]
      },
      {
        id: "skill-cs-logic-gates",
        unitId: "unit-cs-architecture-number-systems",
        title: "Logic Gates, Boolean Algebra & Truth Tables",
        code: "SKL-CSC-202",
        summary: "Analyzing fundamental and combinational logic circuits using AND, OR, NOT, NAND, NOR, and XOR gates.",
        objectives: [
          "Construct and complete truth tables for multi-gate combinational logic circuits",
          "Apply De Morgan's Laws to simplify Boolean algebraic expressions",
          "Identify universal logic gates capable of constructing any arbitrary Boolean function"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-logic-1",
            type: "multiple_choice",
            questionText: "Which logic gate produces an output of 1 (HIGH) if and only if its inputs are DIFFERENT from each other?",
            options: ["XOR Gate", "AND Gate", "NOR Gate", "NAND Gate"],
            correctAnswer: "XOR Gate",
            explanation: "The XOR (Exclusive OR) gate yields 1 when the inputs are non-identical (0,1 or 1,0), and outputs 0 when inputs are identical (0,0 or 1,1).",
            hintLadder: [
              "Think about the name: 'Exclusive OR'.",
              "It is true when one input is true, but NOT when both are true.",
              "Select 'XOR Gate'."
            ],
            misconceptionAlerts: [
              { trigger: "NOR Gate", note: "NOR is only HIGH when BOTH inputs are 0 (LOW)." }
            ],
            skillId: "skill-cs-logic-gates",
            difficulty: "easy"
          },
          {
            id: "q-cs-logic-2",
            type: "multiple_choice",
            questionText: "According to De Morgan's First Law, what is the simplified equivalent of \\overline{A \\cdot B} (NOT (A AND B))?",
            mathExpression: "\\overline{A \\cdot B} \\equiv (?)",
            options: [
              "\\overline{A} + \\overline{B}",
              "\\overline{A} \\cdot \\overline{B}",
              "A + B",
              "\\overline{A + B}"
            ],
            correctAnswer: "\\overline{A} + \\overline{B}",
            explanation: "De Morgan's First Law states: \\overline{A \\cdot B} = \\overline{A} + \\overline{B} (Break the line, change the sign from AND to OR).",
            hintLadder: [
              "Recall De Morgan's rule: 'Break the overline bar and change the operator'.",
              "AND (·) flips to OR (+), and each input gets individual negation.",
              "Result: \\overline{A} + \\overline{B}."
            ],
            misconceptionAlerts: [
              { trigger: "\\overline{A} \\cdot \\overline{B}", note: "Remember to change the operator from AND (·) to OR (+) when breaking the bar." }
            ],
            skillId: "skill-cs-logic-gates",
            difficulty: "medium"
          },
          {
            id: "q-cs-logic-3",
            type: "multiple_choice",
            questionText: "Which pair of logic gates are known as 'Universal Gates' because any digital circuit can be built exclusively from either one?",
            options: ["NAND and NOR", "AND and OR", "XOR and NOT", "AND and NOT"],
            correctAnswer: "NAND and NOR",
            explanation: "NAND and NOR are universal gates because functional combinations of NAND (or NOR) alone can implement the basic AND, OR, and NOT operations.",
            hintLadder: [
              "A universal gate can simulate any other gate without needing external components.",
              "The two inverted basic gates have this complete expressive capability.",
              "Select 'NAND and NOR'."
            ],
            misconceptionAlerts: [
              { trigger: "AND and OR", note: "AND and OR cannot perform negation (NOT) on their own." }
            ],
            skillId: "skill-cs-logic-gates",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-algorithms-flowcharts",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Algorithms, Flowcharts & Computational Problem Solving",
    code: "CSC-UNIT-02",
    description: "Standard flowchart notation, dry-run trace tables, linear and binary search algorithms, bubble sort, and Big-O asymptotic notation.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-cs-pseudocode-flowcharts",
        unitId: "unit-cs-algorithms-flowcharts",
        title: "Algorithm Design, Pseudocode Tracing & Flowcharts",
        code: "SKL-CSC-203",
        summary: "Constructing algorithm logic using sequence, selection, iteration, and analyzing state transitions via dry-run trace tables.",
        objectives: [
          "Identify standard flowchart symbols (terminal oval, process rectangle, decision diamond, input/output parallelogram)",
          "Trace execution flow and evaluate variable values across nested loops in pseudocode",
          "Identify infinite loops and off-by-one boundary errors in iterative algorithms"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-algo-1",
            type: "multiple_choice",
            questionText: "What geometric symbol is universally used in standard ISO flowcharts to represent a Decision / Conditional branching step?",
            options: ["Diamond", "Rectangle", "Parallelogram", "Oval"],
            correctAnswer: "Diamond",
            explanation: "In flowchart conventions: Oval = Start/End Terminal; Rectangle = Processing/Calculation; Parallelogram = Input/Output; Diamond = Decision/Branching condition.",
            hintLadder: [
              "Recall the 4 primary flowchart shapes.",
              "The shape with multiple outgoing path arrows (e.g. Yes/No, True/False) is a diamond.",
              "Select 'Diamond'."
            ],
            misconceptionAlerts: [
              { trigger: "Rectangle", note: "Rectangles denote computational processes (e.g., x = x + 1), not decisions." }
            ],
            skillId: "skill-cs-pseudocode-flowcharts",
            difficulty: "easy"
          },
          {
            id: "q-cs-algo-2",
            type: "multiple_choice",
            questionText: "Examine this pseudocode snippet:\n`total = 0`\n`FOR i = 1 TO 4 DO`\n`  IF i % 2 == 0 THEN`\n`    total = total + (i * 2)`\n`  END IF`\n`END FOR`\nWhat is the final value of `total`?",
            options: ["12", "20", "6", "10"],
            correctAnswer: "12",
            explanation: "Loop iterates i = 1, 2, 3, 4. For i=2: 2 is even -> total = 0 + (2*2) = 4. For i=4: 4 is even -> total = 4 + (4*2) = 4 + 8 = 12. Final total = 12.",
            hintLadder: [
              "Identify which values of i satisfy the condition `i % 2 == 0` (even numbers): i = 2 and i = 4.",
              "When i = 2: add 2 * 2 = 4 to total.",
              "When i = 4: add 4 * 2 = 8 to total. Sum = 4 + 8 = 12."
            ],
            misconceptionAlerts: [
              { trigger: "20", note: "Did you add all values of i (1+2+3+4) * 2 instead of only even values?" }
            ],
            skillId: "skill-cs-pseudocode-flowcharts",
            difficulty: "medium"
          },
          {
            id: "q-cs-algo-3",
            type: "multiple_choice",
            questionText: "What fundamental property must an algorithm satisfy to guarantee it will not run endlessly without stopping?",
            options: ["Finiteness", "Definiteness", "Recursiveness", "Generality"],
            correctAnswer: "Finiteness",
            explanation: "Finiteness dictates that an algorithm must terminate after a countable, finite number of discrete execution steps for all valid inputs.",
            hintLadder: [
              "Think about the requirement that a program must eventually end.",
              "The algorithmic property of terminating in finite steps is 'Finiteness'.",
              "Select 'Finiteness'."
            ],
            misconceptionAlerts: [
              { trigger: "Recursiveness", note: "Recursion is a programming technique, not a mandatory quality of all algorithms." }
            ],
            skillId: "skill-cs-pseudocode-flowcharts",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-cs-search-sort-complexity",
        unitId: "unit-cs-algorithms-flowcharts",
        title: "Search & Sort Algorithms and Time Complexity",
        code: "SKL-CSC-204",
        summary: "Analyzing Linear Search, Binary Search, Bubble Sort, and estimating Big-O efficiency.",
        objectives: [
          "Trace Binary Search on sorted arrays and determine maximum comparison bounds (log₂ N)",
          "Step through passes of Bubble Sort on numeric lists",
          "Compare worst-case time complexity: O(1) constant, O(N) linear, O(N²) quadratic, O(log N) logarithmic"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-sort-1",
            type: "multiple_choice",
            questionText: "What prerequisite condition MUST an array satisfy before Binary Search can be executed on it?",
            options: [
              "The array elements must already be in sorted order.",
              "The array size must be an exact power of two.",
              "The array must contain only positive integers.",
              "The array cannot contain duplicate values."
            ],
            correctAnswer: "The array elements must already be in sorted order.",
            explanation: "Binary Search relies on comparing the target with the midpoint and discarding half the elements. This divide-and-conquer logic requires the data to be sorted.",
            hintLadder: [
              "Think about how binary search discards the left or right half.",
              "If elements were random, discarding a half could eliminate the target.",
              "The list must be sorted."
            ],
            misconceptionAlerts: [
              { trigger: "The array size must be an exact power of two.", note: "Binary search works on arrays of any arbitrary length, as long as they are sorted." }
            ],
            skillId: "skill-cs-search-sort-complexity",
            difficulty: "easy"
          },
          {
            id: "q-cs-sort-2",
            type: "multiple_choice",
            questionText: "In the worst case, what is the maximum number of comparisons needed to find an item in a sorted list of 1,024 elements using Binary Search?",
            options: ["10 comparisons", "512 comparisons", "1,024 comparisons", "32 comparisons"],
            correctAnswer: "10 comparisons",
            explanation: "Worst-case comparisons for binary search on N items is \\lceil \\log_2(N) \\rceil. Since 2^{10} = 1024, \\log_2(1024) = 10 comparisons.",
            hintLadder: [
              "Binary search halves the remaining items at each step.",
              "Calculate \\log_2(1024).",
              "2¹⁰ = 1024, so at most 10 comparisons are needed."
            ],
            misconceptionAlerts: [
              { trigger: "512 comparisons", note: "512 is half the list (average for linear search), not binary search's logarithmic efficiency." }
            ],
            skillId: "skill-cs-search-sort-complexity",
            difficulty: "medium"
          },
          {
            id: "q-cs-sort-3",
            type: "multiple_choice",
            questionText: "What is the worst-case Time Complexity of the standard Bubble Sort algorithm on an array of N elements?",
            options: ["O(N²)", "O(N)", "O(N log N)", "O(1)"],
            correctAnswer: "O(N²)",
            explanation: "Bubble sort utilizes nested loops where each of the N elements may need to be compared against up to N other elements in the worst case (reverse-sorted array), resulting in O(N²) quadratic time complexity.",
            hintLadder: [
              "Consider the two nested loops in bubble sort.",
              "Outer loop runs N times, inner loop runs up to N times.",
              "N × N = O(N²) quadratic time."
            ],
            misconceptionAlerts: [
              { trigger: "O(N log N)", note: "O(N log N) is the time complexity of Merge Sort or Quick Sort, not Bubble Sort." }
            ],
            skillId: "skill-cs-search-sort-complexity",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "skill-cs-recursion",
        unitId: "unit-cs-algorithms-flowcharts",
        title: "Recursion, Base Cases & Call Stack Tracing",
        code: "SKL-CSC-205",
        summary: "Defining recursive algorithms, distinguishing base cases from recursive steps, and analyzing execution frames on the call stack.",
        objectives: [
          "Identify and formulate the terminating base case in a recursive algorithm to prevent infinite recursion and stack overflow",
          "Trace recursive call trees and evaluate return values for mathematical functions such as Factorial and Fibonacci",
          "Explain the role of the runtime Call Stack in preserving activation records during recursive function invocations"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-rec-1",
            type: "multiple_choice",
            questionText: "Consider the recursive Python function:\n```python\ndef mystery(n):\n    if n <= 1:\n        return 1\n    return n * mystery(n - 1)\n```\nWhat is the return value of `mystery(4)`?",
            options: ["24", "10", "12", "120"],
            correctAnswer: "24",
            explanation: "mystery(4) = 4 * mystery(3) = 4 * (3 * mystery(2)) = 4 * (3 * (2 * mystery(1))) = 4 * 3 * 2 * 1 = 24 (4! factorial).",
            hintLadder: [
              "Trace the function calls step-by-step: mystery(4) calls 4 * mystery(3).",
              "mystery(3) calls 3 * mystery(2).",
              "mystery(2) calls 2 * mystery(1).",
              "mystery(1) hits the base case n <= 1 and returns 1. Multiply: 4 * 3 * 2 * 1 = 24."
            ],
            misconceptionAlerts: [
              { trigger: "10", note: "10 is 4 + 3 + 2 + 1 (recursive sum), but the function multiplies (`n * mystery(n-1)`)." },
              { trigger: "120", note: "120 is 5! (factorial of 5), but the input was n = 4." }
            ],
            skillId: "skill-cs-recursion",
            difficulty: "easy"
          },
          {
            id: "q-cs-rec-2",
            type: "multiple_choice",
            questionText: "What catastrophic runtime error occurs if a recursive function is called without a valid base case or fails to decrement towards its base condition?",
            options: [
              "RecursionError: maximum recursion depth exceeded (Stack Overflow)",
              "ZeroDivisionError: integer division by zero",
              "SyntaxError: invalid token parsing",
              "FileNotFoundError: missing system library"
            ],
            correctAnswer: "RecursionError: maximum recursion depth exceeded (Stack Overflow)",
            explanation: "Each recursive call allocates a new activation frame on the runtime call stack. Without a base case, calls continue indefinitely until the allocated stack memory limit is exceeded, throwing a RecursionError / Stack Overflow.",
            hintLadder: [
              "Every function call pushes a new frame onto the computer's memory call stack.",
              "If the recursion never terminates, memory for call frames runs out.",
              "This condition is known as maximum recursion depth exceeded or Stack Overflow."
            ],
            misconceptionAlerts: [
              { trigger: "SyntaxError: invalid token parsing", note: "Infinite recursion is a runtime logic error, not a compile-time syntax parsing error." }
            ],
            skillId: "skill-cs-recursion",
            difficulty: "easy"
          },
          {
            id: "q-cs-rec-3",
            type: "multiple_choice",
            questionText: "How does the Call Stack manage local variables and return addresses when a recursive function makes nested calls?",
            options: [
              "It pushes an activation record (stack frame) for each call, pausing execution of the caller until the callee finishes and pops off.",
              "It overwrites the previous function's variables in a single global variable table.",
              "It stores all variables randomly across secondary disk storage.",
              "It transforms all recursive calls into simultaneous parallel threads."
            ],
            correctAnswer: "It pushes an activation record (stack frame) for each call, pausing execution of the caller until the callee finishes and pops off.",
            explanation: "When a function is called recursively, the CPU pushes a stack frame containing its local variables and return address. Execution of the current frame pauses until the child call returns, at which point the top frame is popped and the caller resumes.",
            hintLadder: [
              "Remember the LIFO (Last-In, First-Out) nature of the Call Stack.",
              "Each invocation needs its own independent copy of parameters and local variables.",
              "A stack frame is pushed for each call and popped when the function returns."
            ],
            misconceptionAlerts: [
              { trigger: "It overwrites the previous function's variables in a single global variable table.", note: "Each recursive call maintains its own independent stack frame; variables are not overwritten." }
            ],
            skillId: "skill-cs-recursion",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-programming-foundations",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Computer Programming Fundamentals (Python Syntax & Logic)",
    code: "CSC-UNIT-03",
    description: "Variables, primitive data types (int, float, str, bool), expressions, conditional if/elif/else blocks, while/for iteration loops, lists, and modular functions.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-cs-python-control-flow",
        unitId: "unit-cs-programming-foundations",
        title: "Variables, Data Types & Control Flow",
        code: "SKL-CSC-205",
        summary: "Writing structured code with dynamic typing, type casting, mathematical operators, and conditional branching.",
        objectives: [
          "Apply Python type conversions (int(), str(), float(), bool())",
          "Construct multi-condition if/elif/else structures using boolean operators (and, or, not)",
          "Write bounded for-loops using the range(start, stop, step) generator"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-py-1",
            type: "multiple_choice",
            questionText: "What is the output of the following Python expression?\n`print(type(5 / 2))`",
            options: ["<class 'float'>", "<class 'int'>", "<class 'number'>", "<class 'double'>"],
            correctAnswer: "<class 'float'>",
            explanation: "In Python 3, the standard division operator `/` always performs true float division and returns a float object (5 / 2 = 2.5), unlike integer floor division `//`.",
            hintLadder: [
              "Python 3's `/` operator always produces a floating-point number.",
              "5 / 2 evaluates to 2.5.",
              "The data type is `float`."
            ],
            misconceptionAlerts: [
              { trigger: "<class 'int'>", note: "In Python 3, standard `/` does not truncate to integer. For integer division, use `//`." }
            ],
            skillId: "skill-cs-python-control-flow",
            difficulty: "easy"
          },
          {
            id: "q-cs-py-2",
            type: "multiple_choice",
            questionText: "What numbers are generated by the expression `list(range(2, 10, 3))` in Python?",
            options: ["[2, 5, 8]", "[2, 5, 8, 11]", "[3, 6, 9]", "[2, 4, 6, 8]"],
            correctAnswer: "[2, 5, 8]",
            explanation: "`range(start=2, stop=10, step=3)` starts at 2, increments by 3: 2, 2+3=5, 5+3=8. Next step 8+3=11 exceeds the stop value of 10, so it stops at 8.",
            hintLadder: [
              "Start at 2.",
              "Add step of 3: next is 5, then 8.",
              "Stop before reaching 10. Result is [2, 5, 8]."
            ],
            misconceptionAlerts: [
              { trigger: "[2, 5, 8, 11]", note: "The stop value (10) is exclusive; 11 exceeds 10 and cannot be included." }
            ],
            skillId: "skill-cs-python-control-flow",
            difficulty: "easy"
          },
          {
            id: "q-cs-py-3",
            type: "multiple_choice",
            questionText: "What is the output of this Python code snippet?\n`x = 10`\n`while x > 4:`\n`  x -= 3`\n`print(x)`",
            options: ["4", "1", "7", "10"],
            correctAnswer: "4",
            explanation: "Iteration 1: x = 10 > 4 -> x becomes 10 - 3 = 7. Iteration 2: x = 7 > 4 -> x becomes 7 - 3 = 4. Iteration 3: x = 4 is NOT > 4 (loop terminates). Output is 4.",
            hintLadder: [
              "Trace x step-by-step: Start x = 10.",
              "Pass 1: 10 > 4 (True), x becomes 7.",
              "Pass 2: 7 > 4 (True), x becomes 4.",
              "Pass 3: 4 > 4 (False), loop exits. Final x = 4."
            ],
            misconceptionAlerts: [
              { trigger: "1", note: "Loop condition is `x > 4`. When x is 4, 4 > 4 is False, so the loop does not run again." }
            ],
            skillId: "skill-cs-python-control-flow",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "skill-cs-python-functions-lists",
        unitId: "unit-cs-programming-foundations",
        title: "Functions, Parameters, Lists & String Slicing",
        code: "SKL-CSC-206",
        summary: "Defining reusable subprograms with def, return values, variable scope, zero-indexed list indexing, and slice notation.",
        objectives: [
          "Define modular functions with default arguments and explicit return statements",
          "Manipulate Python lists with append(), pop(), sort(), and len()",
          "Extract substrings using negative indexing and slice ranges [start:stop:step]"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-func-1",
            type: "multiple_choice",
            questionText: "What is the result of executing the following Python slice: `'ACADEMY'[1:5]`?",
            options: ["'CADE'", "'ACAD'", "'CADEM'", "'ADEM'"],
            correctAnswer: "'CADE'",
            explanation: "String slicing is zero-indexed with exclusive end: Index 0='A', 1='C', 2='A', 3='D', 4='E', 5='M'. Slice [1:5] extracts characters at indices 1, 2, 3, 4 = 'CADE'.",
            hintLadder: [
              "Index letters: A(0), C(1), A(2), D(3), E(4), M(5), Y(6).",
              "Start at index 1 ('C').",
              "Take characters up to index 4 (stop index 5 is excluded): 'C', 'A', 'D', 'E'."
            ],
            misconceptionAlerts: [
              { trigger: "'ACAD'", note: "Slice starts at index 1 ('C'), not index 0 ('A')." },
              { trigger: "'CADEM'", note: "The stop index 5 is excluded; character at index 5 ('M') is not included." }
            ],
            skillId: "skill-cs-python-functions-lists",
            difficulty: "medium"
          },
          {
            id: "q-cs-func-2",
            type: "multiple_choice",
            questionText: "Examine this Python function:\n`def compute(a, b=5):`\n`  return (a * 2) + b`\n`print(compute(3))`\nWhat is printed?",
            options: ["11", "16", "6", "Error: Missing argument"],
            correctAnswer: "11",
            explanation: "The parameter `b` has a default value of 5. Calling `compute(3)` passes `a=3`, so `(3 * 2) + 5 = 6 + 5 = 11`.",
            hintLadder: [
              "Notice the function header has default argument `b=5`.",
              "When compute(3) is called, a = 3 and b defaults to 5.",
              "(3 × 2) + 5 = 6 + 5 = 11."
            ],
            misconceptionAlerts: [
              { trigger: "Error: Missing argument", note: "Since parameter b has a default value (b=5), only argument 'a' is required." }
            ],
            skillId: "skill-cs-python-functions-lists",
            difficulty: "easy"
          },
          {
            id: "q-cs-func-3",
            type: "multiple_choice",
            questionText: "What does the list method `items.pop()` do when called with no arguments in Python?",
            options: [
              "Removes and returns the last element in the list.",
              "Removes the first element in the list.",
              "Deletes all elements from the list.",
              "Sorts the list in ascending order."
            ],
            correctAnswer: "Removes and returns the last element in the list.",
            explanation: "By default, `list.pop()` removes the item at the highest index (the last item) and returns it, implementing LIFO stack behavior.",
            hintLadder: [
              "Think about standard stack operations (push/pop).",
              "`pop()` removes from the end of the list.",
              "Select 'Removes and returns the last element in the list'."
            ],
            misconceptionAlerts: [
              { trigger: "Removes the first element in the list.", note: "To remove the first element, you must pass index 0: `items.pop(0)`." }
            ],
            skillId: "skill-cs-python-functions-lists",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-networking-cybersecurity",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Networking, Internet Protocols & Cybersecurity",
    code: "CSC-UNIT-04",
    description: "LAN/WAN topologies, IP addressing (IPv4/IPv6), DNS resolution, TCP/IP vs OSI models, symmetric/asymmetric encryption, malware types, and digital hygiene.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-cs-networking-protocols",
        unitId: "unit-cs-networking-cybersecurity",
        title: "IP Addressing, DNS & Network Topologies",
        code: "SKL-CSC-207",
        summary: "Understanding packet routing, domain name translation, MAC addresses, and star vs mesh network topologies.",
        objectives: [
          "Differentiate IPv4 (32-bit dotted decimal) from IPv6 (128-bit hexadecimal) addressing",
          "Explain the role of Domain Name System (DNS) in resolving human URLs to machine IP addresses",
          "Compare network topologies (Star, Bus, Ring, Mesh) in terms of fault tolerance and cabling costs"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-net-1",
            type: "multiple_choice",
            questionText: "What is the primary function of the Domain Name System (DNS) on the Internet?",
            options: [
              "To translate human-readable domain names (e.g., example.com) into numeric IP addresses.",
              "To encrypt all wireless Wi-Fi transmissions using WPA3 keys.",
              "To physically route Ethernet cables between local switchboards.",
              "To store backups of website databases on decentralized servers."
            ],
            correctAnswer: "To translate human-readable domain names (e.g., example.com) into numeric IP addresses.",
            explanation: "DNS acts as the phonebook of the Internet, translating user-friendly domain names like 'moos.academy' into machine-routable IP addresses like '192.0.2.1'.",
            hintLadder: [
              "Think about what happens when you type a web URL into your browser.",
              "Computers communicate using IP addresses, but humans prefer words.",
              "DNS performs the translation between names and IP numbers."
            ],
            misconceptionAlerts: [
              { trigger: "To encrypt all wireless Wi-Fi transmissions using WPA3 keys.", note: "Encryption is handled by cryptographic protocols (TLS/WPA), not DNS." }
            ],
            skillId: "skill-cs-networking-protocols",
            difficulty: "easy"
          },
          {
            id: "q-cs-net-2",
            type: "multiple_choice",
            questionText: "How many bits are used in an IPv4 address compared to an IPv6 address?",
            options: [
              "IPv4 uses 32 bits; IPv6 uses 128 bits.",
              "IPv4 uses 64 bits; IPv6 uses 256 bits.",
              "IPv4 uses 16 bits; IPv6 uses 64 bits.",
              "Both use 32 bits with different encoding formats."
            ],
            correctAnswer: "IPv4 uses 32 bits; IPv6 uses 128 bits.",
            explanation: "An IPv4 address consists of 32 bits (4 octets, e.g., 192.168.1.1), while an IPv6 address consists of 128 bits (8 groups of 4 hexadecimal digits), creating an astronomical address space.",
            hintLadder: [
              "Recall the 4 octets of IPv4: 4 × 8 bits = 32 bits.",
              "IPv6 was created to massively expand address space to 128 bits.",
              "Select 32 bits and 128 bits."
            ],
            misconceptionAlerts: [
              { trigger: "IPv4 uses 64 bits; IPv6 uses 256 bits.", note: "IPv4 is 32 bits (4 bytes), not 64." }
            ],
            skillId: "skill-cs-networking-protocols",
            difficulty: "medium"
          },
          {
            id: "q-cs-net-3",
            type: "multiple_choice",
            questionText: "In which network topology is every node directly connected to every other node, providing maximum fault tolerance at highest cabling cost?",
            options: ["Full Mesh Topology", "Star Topology", "Bus Topology", "Ring Topology"],
            correctAnswer: "Full Mesh Topology",
            explanation: "In a Full Mesh network, redundant point-to-point links connect every pair of devices, allowing traffic to reroute around any broken link, though requiring n(n-1)/2 physical connections.",
            hintLadder: [
              "Look for the topology where all devices connect to all other devices.",
              "This provides complete redundancy if any cable breaks.",
              "Select 'Full Mesh Topology'."
            ],
            misconceptionAlerts: [
              { trigger: "Star Topology", note: "In a star topology, nodes connect to a single central switch/hub, not directly to each other." }
            ],
            skillId: "skill-cs-networking-protocols",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-cs-cybersecurity-encryption",
        unitId: "unit-cs-networking-cybersecurity",
        title: "Cybersecurity, Encryption & Malware Defense",
        code: "SKL-CSC-208",
        summary: "Analyzing symmetric vs asymmetric cryptography, public/private keys, phishing attacks, and ransomware prevention.",
        objectives: [
          "Differentiate symmetric key encryption from asymmetric (public/private key) encryption",
          "Identify attack vectors: Social engineering (Phishing), Man-in-the-Middle (MitM), Denial of Service (DoS)",
          "Apply principle of least privilege, two-factor authentication (2FA), and secure hashing algorithms"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-cs-sec-1",
            type: "multiple_choice",
            questionText: "In Asymmetric Public-Key Cryptography (such as RSA), if Alice wants to send a secret encrypted message to Bob that ONLY Bob can read, whose key should she use to encrypt the message?",
            options: [
              "Bob's Public Key",
              "Alice's Private Key",
              "Bob's Private Key",
              "Alice's Public Key"
            ],
            correctAnswer: "Bob's Public Key",
            explanation: "To ensure confidentiality, the sender encrypts the plaintext with the recipient's publicly available key (Bob's Public Key). Only the corresponding private key (Bob's Private Key, kept secret by Bob) can decrypt it.",
            hintLadder: [
              "Recall the rule: Public keys encrypt; matching private keys decrypt.",
              "Alice wants only Bob to read the message.",
              "Alice encrypts with Bob's Public Key, so only Bob's Private Key can decrypt it."
            ],
            misconceptionAlerts: [
              { trigger: "Bob's Private Key", note: "Alice does not have access to Bob's private key; private keys must never be shared." },
              { trigger: "Alice's Private Key", note: "Encrypting with Alice's private key creates a digital signature (for authenticity), not privacy, because anyone with Alice's public key could decrypt it." }
            ],
            skillId: "skill-cs-cybersecurity-encryption",
            difficulty: "hard"
          },
          {
            id: "q-cs-sec-2",
            type: "multiple_choice",
            questionText: "Which type of malicious software encrypts a victim's files and demands financial payment in cryptocurrency in exchange for the decryption key?",
            options: ["Ransomware", "Spyware", "Adware", "Trojan Horse"],
            correctAnswer: "Ransomware",
            explanation: "Ransomware is malware that covertly locks access to the victim's data using strong encryption and extorts a ransom payment for file restoration.",
            hintLadder: [
              "Look at the word root: 'Ransom'.",
              "The attack holds files hostage for money.",
              "Select 'Ransomware'."
            ],
            misconceptionAlerts: [
              { trigger: "Spyware", note: "Spyware quietly logs keystrokes and steals credentials without alerting the victim with a payment demand." }
            ],
            skillId: "skill-cs-cybersecurity-encryption",
            difficulty: "easy"
          },
          {
            id: "q-cs-sec-3",
            type: "multiple_choice",
            questionText: "What makes Two-Factor Authentication (2FA) significantly more secure than a standard password alone?",
            options: [
              "It combines two different authentication factors (e.g. something you know + something you have).",
              "It doubles the character length of the existing password automatically.",
              "It stores user passwords on local hard drives in plain text.",
              "It completely eliminates the need for biometric verification."
            ],
            correctAnswer: "It combines two different authentication factors (e.g. something you know + something you have).",
            explanation: "Multi-factor authentication requires verification from distinct categories: knowledge (password/PIN), possession (hardware token/authenticator app), or inherence (fingerprint/face recognition).",
            hintLadder: [
              "MFA relies on distinct categories of identity verification.",
              "Something you know (password) + something you have (phone/token).",
              "Select the option highlighting two different authentication factors."
            ],
            misconceptionAlerts: [
              { trigger: "It doubles the character length of the existing password automatically.", note: "2FA is an independent second verification step, not a password lengthener." }
            ],
            skillId: "skill-cs-cybersecurity-encryption",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-data-structures-abstract-types",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Data Structures, Linear Arrays, Stacks & Queues",
    code: "CSC-UNIT-05",
    description: "Static vs dynamic memory allocation, contiguous 1D/2D arrays, Last-In First-Out (LIFO) stacks, First-In First-Out (FIFO) queues, and practical buffer implementations.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-cs-stacks-queues-arrays",
        unitId: "unit-cs-data-structures-abstract-types",
        title: "Contiguous Arrays, LIFO Stacks & FIFO Queues",
        code: "SKL-CSC-301",
        summary: "Tracing stack and queue operation sequences, calculating contiguous array memory addresses, and selecting appropriate abstract data structures.",
        objectives: [
          "Trace sequence states of Stacks (Push, Pop, Peek) and Queues (Enqueue, Dequeue) under sequential operations",
          "Calculate physical memory addresses for 1D contiguous arrays using base address, element byte size, and index",
          "Select the optimal data structure (Stack vs Queue vs Array) for real-world scenarios such as undo buffers, printer spoolers, and call stacks"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-cs-pseudocode-flowcharts"],
        questions: [
          {
            id: "q-cs-ds-1",
            type: "multiple_choice",
            questionText: "An empty integer Stack S undergoes the following chronological operations:\nPush(10), Push(20), Pop(), Push(30), Push(40), Pop(), Push(50).\nWhat value is currently at the top of the Stack, and how many elements remain in S?",
            options: [
              "Top value: 50; 3 elements remaining [10, 30, 50]",
              "Top value: 50; 4 elements remaining [10, 20, 30, 50]",
              "Top value: 40; 2 elements remaining [10, 40]",
              "Top value: 30; 3 elements remaining [10, 40, 50]"
            ],
            correctAnswer: "Top value: 50; 3 elements remaining [10, 30, 50]",
            explanation: "Trace: Push(10) -> [10]; Push(20) -> [10, 20]; Pop() -> removes 20, leaving [10]; Push(30) -> [10, 30]; Push(40) -> [10, 30, 40]; Pop() -> removes 40, leaving [10, 30]; Push(50) -> [10, 30, 50]. Top is 50, count is 3.",
            hintLadder: [
              "Remember that a Stack is LIFO: Last-In, First-Out.",
              "Track the stack list after each operation: [10] -> [10,20] -> [10] -> [10,30] -> [10,30,40] -> [10,30] -> [10,30,50].",
              "Top element is the most recently pushed item: 50; total items = 3."
            ],
            misconceptionAlerts: [
              { trigger: "Top value: 50; 4 elements remaining [10, 20, 30, 50]", note: "Did you forget that Pop() removes the top element from the stack completely?" }
            ],
            skillId: "skill-cs-stacks-queues-arrays",
            difficulty: "easy"
          },
          {
            id: "q-cs-ds-2",
            type: "multiple_choice",
            questionText: "Which real-world computing application strictly requires a First-In, First-Out (FIFO) Queue data structure rather than a LIFO Stack?",
            options: [
              "An operating system printer spooler managing shared print jobs in the exact order submitted.",
              "A text editor's multi-level Undo (Ctrl+Z) history mechanism.",
              "The browser back-button navigation history stack.",
              "The runtime call stack managing nested function activation records."
            ],
            correctAnswer: "An operating system printer spooler managing shared print jobs in the exact order submitted.",
            explanation: "A printer spooler requires fairness where the first job sent must be the first job printed (FIFO = Queue). In contrast, undo history, browser back navigation, and function call stacks all require reversing actions (LIFO = Stack).",
            hintLadder: [
              "FIFO means First-In, First-Out.",
              "Think about which service should serve the first customer or document first.",
              "Printer spoolers process print requests in arrival order."
            ],
            misconceptionAlerts: [
              { trigger: "A text editor's multi-level Undo (Ctrl+Z) history mechanism.", note: "Undo requires reversing the MOST RECENT action first, which is LIFO (Stack)." }
            ],
            skillId: "skill-cs-stacks-queues-arrays",
            difficulty: "easy"
          },
          {
            id: "q-cs-ds-3",
            type: "multiple_choice",
            questionText: "A 0-indexed contiguous 1D array of 32-bit (4-byte) integers has its base address at memory location 1000 (decimal). What is the byte address of the element at index 7?",
            mathExpression: "\\text{Address}(A[i]) = \\text{Base} + (i \\times \\text{ElementSize})",
            options: ["1028", "1032", "1024", "1007"],
            correctAnswer: "1028",
            explanation: "Address formula for 0-indexed array: Address = Base + (index × size). Address = 1000 + (7 × 4 bytes) = 1000 + 28 = 1028.",
            hintLadder: [
              "Formula: Memory Address = Base Address + (Index × Size of each element in bytes).",
              "Index = 7, Element size = 4 bytes.",
              "Offset = 7 × 4 = 28 bytes. Total address = 1000 + 28 = 1028."
            ],
            misconceptionAlerts: [
              { trigger: "1032", note: "1032 would be index 8 (or index 7 if 1-indexed: 1000 + (8-1)*4 = 1028)." },
              { trigger: "1007", note: "Did you add the index directly without multiplying by the 4-byte size of 32-bit integers?" }
            ],
            skillId: "skill-cs-stacks-queues-arrays",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-relational-databases-sql",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Relational Databases, Normalization & SQL Queries",
    code: "CSC-UNIT-06",
    description: "Relational database concepts, Primary and Foreign keys, 1NF to 3NF database normalization, and structured SQL data manipulation.",
    order: 6,
    category: "core",
    skills: [
      {
        id: "skill-cs-sql-ddl-dml-normalization",
        unitId: "unit-cs-relational-databases-sql",
        title: "Relational Normalization, Entity Integrity & SQL Syntax",
        code: "SKL-CSC-302",
        summary: "Normalizing tables from 1NF through 3NF to eliminate anomalies and constructing structured SQL queries.",
        objectives: [
          "Identify and resolve partial dependencies (2NF) and transitive dependencies (3NF) in relation tables",
          "Distinguish Primary Key (unique non-null entity identifier) from Foreign Key (referential integrity connector)",
          "Construct syntactically accurate SQL queries using SELECT, WHERE, ORDER BY, and INNER JOIN clauses"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-cs-pseudocode-flowcharts"],
        questions: [
          {
            id: "q-cs-db-1",
            type: "multiple_choice",
            questionText: "Consider the table 'Students(StudentID, Name, Department, Score)'. Which SQL query retrieves the names and scores of all students with scores of 75 or higher, sorted from highest score to lowest?",
            options: [
              "SELECT Name, Score FROM Students WHERE Score >= 75 ORDER BY Score DESC;",
              "SELECT Name, Score FROM Students WHERE Score > 75 GROUP BY Score ASC;",
              "GET Name, Score IN Students IF Score >= 75 SORT Score DOWN;",
              "SELECT * FROM Students HAVING Score >= 75 ORDER BY Name DESC;"
            ],
            correctAnswer: "SELECT Name, Score FROM Students WHERE Score >= 75 ORDER BY Score DESC;",
            explanation: "In standard SQL, filtering row records uses the 'WHERE' clause, and sorting in descending order (highest to lowest) uses 'ORDER BY [column] DESC'.",
            hintLadder: [
              "SQL clause order: SELECT -> FROM -> WHERE -> ORDER BY.",
              "Filter condition: Score >= 75.",
              "Sorting from highest to lowest requires descending order: DESC."
            ],
            misconceptionAlerts: [
              { trigger: "GET Name, Score IN Students IF Score >= 75 SORT Score DOWN;", note: "This is pseudocode, not standard SQL syntax." },
              { trigger: "SELECT * FROM Students HAVING Score >= 75 ORDER BY Name DESC;", note: "HAVING is used with aggregate functions in GROUP BY queries, whereas individual row filtering requires WHERE." }
            ],
            skillId: "skill-cs-sql-ddl-dml-normalization",
            difficulty: "easy"
          },
          {
            id: "q-cs-db-2",
            type: "multiple_choice",
            questionText: "A database table has a composite primary key consisting of (StudentID, CourseID). It contains the non-key attribute 'CourseInstructorEmail', which depends solely on CourseID. Which normal form does this table violate, and what type of dependency exists?",
            options: [
              "Violates Second Normal Form (2NF) due to a Partial Dependency.",
              "Violates First Normal Form (1NF) due to repeating groups.",
              "Violates Third Normal Form (3NF) due to a Transitive Dependency.",
              "Violates Boyce-Codd Normal Form (BCNF) due to multi-valued attributes."
            ],
            correctAnswer: "Violates Second Normal Form (2NF) due to a Partial Dependency.",
            explanation: "A table is in 2NF if it is in 1NF and contains NO partial dependencies (where a non-key attribute depends on only PART of a composite primary key). Since CourseInstructorEmail depends solely on CourseID (part of the composite key), it violates 2NF.",
            hintLadder: [
              "Composite key = (StudentID, CourseID).",
              "CourseInstructorEmail depends only on CourseID, which is a fraction of the primary key.",
              "Dependency on a sub-part of a composite key is a Partial Dependency, violating 2NF."
            ],
            misconceptionAlerts: [
              { trigger: "Violates Third Normal Form (3NF) due to a Transitive Dependency.", note: "Transitive dependency is when a non-key attribute depends on another non-key attribute (X -> Y -> Z). Here, it depends on part of the primary key." }
            ],
            skillId: "skill-cs-sql-ddl-dml-normalization",
            difficulty: "medium"
          },
          {
            id: "q-cs-db-3",
            type: "multiple_choice",
            questionText: "What is the primary role of a Foreign Key constraint in a relational database management system (RDBMS)?",
            options: [
              "Enforcing referential integrity by ensuring values in the child table match existing primary key values in a parent table.",
              "Encrypting sensitive table columns before writing them to disk.",
              "Automatically sorting table records in ascending alphabetical order.",
              "Preventing duplicate values in any non-key columns within the same table."
            ],
            correctAnswer: "Enforcing referential integrity by ensuring values in the child table match existing primary key values in a parent table.",
            explanation: "A foreign key establishes a link between tables by referencing the primary key of another table, guaranteeing referential integrity so orphaned records cannot be created with non-existent parent references.",
            hintLadder: [
              "Primary keys ensure uniqueness within a single table.",
              "Foreign keys reference another table.",
              "The constraint ensures child records always correspond to valid parent records (referential integrity)."
            ],
            misconceptionAlerts: [
              { trigger: "Encrypting sensitive table columns before writing them to disk.", note: "Encryption is handled by database security and cryptographic engines, not foreign key constraints." }
            ],
            skillId: "skill-cs-sql-ddl-dml-normalization",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-web-technologies-internet",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Web Architectures, Client-Server Protocol & Semantic Web",
    code: "CSC-UNIT-07",
    description: "HTTP/HTTPS protocol verbs and status codes, Domain Name System (DNS) lookup sequence, semantic HTML5 structure, and the CSS Box Model.",
    order: 7,
    category: "core",
    skills: [
      {
        id: "skill-cs-http-dns-web-protocols",
        unitId: "unit-cs-web-technologies-internet",
        title: "HTTP Verbs, Status Codes, DNS Resolution & CSS Box Model",
        code: "SKL-CSC-303",
        summary: "Deciphering HTTP status codes, tracing DNS hostname lookups, and calculating rendered element widths using the CSS Box Model.",
        objectives: [
          "Distinguish HTTP methods (GET, POST, PUT, DELETE) and HTTP status code families (2xx, 3xx, 4xx, 5xx)",
          "Trace the step-by-step resolution of a Domain Name (DNS) from local cache to authoritative nameservers",
          "Calculate rendered element dimensions under the standard CSS Box Model (width + padding + border + margin)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-cs-networking-protocols"],
        questions: [
          {
            id: "q-cs-web-1",
            type: "multiple_choice",
            questionText: "A web browser sends an HTTP GET request for a web page. The web server returns a status code of 404. What does this indicate compared to a 500 status code?",
            options: [
              "404 is a Client Error indicating the requested URL was not found; 500 is a Server Error indicating an unexpected crash or exception on the server.",
              "404 indicates successful delivery; 500 indicates the connection timed out.",
              "404 indicates temporary redirection; 500 indicates unauthorized login credentials.",
              "404 is a server-side syntax error; 500 means the user's internet cable is disconnected."
            ],
            correctAnswer: "404 is a Client Error indicating the requested URL was not found; 500 is a Server Error indicating an unexpected crash or exception on the server.",
            explanation: "In HTTP, 4xx status codes denote client-side errors (404 Not Found means the resource does not exist at that path). 5xx status codes denote server-side errors (500 Internal Server Error means server backend code encountered an unhandled exception).",
            hintLadder: [
              "4xx series = Client error (e.g. invalid URL, missing resource, unauthorized).",
              "5xx series = Server error (e.g. backend crash, database unreachable).",
              "404 means 'Not Found' (client requested missing page); 500 means 'Internal Server Error'."
            ],
            misconceptionAlerts: [
              { trigger: "404 indicates temporary redirection; 500 indicates unauthorized login credentials.", note: "3xx codes denote redirection (301, 302), and 401 denotes unauthorized." }
            ],
            skillId: "skill-cs-http-dns-web-protocols",
            difficulty: "easy"
          },
          {
            id: "q-cs-web-2",
            type: "multiple_choice",
            questionText: "When a user types 'https://learn.moos.academy' into their browser, in what hierarchical order does DNS resolve the domain name into an IP address if not cached?",
            options: [
              "Recursive Resolver -> Root Nameserver (.) -> Top-Level Domain (TLD) Nameserver (.academy) -> Authoritative Nameserver (moos.academy)",
              "Authoritative Nameserver -> Root Nameserver -> Browser -> ISP Resolver",
              "Top-Level Domain Nameserver -> Web Host Server -> DNS Cache -> Root Server",
              "Client Browser -> Web Gateway -> DHCP Server -> Proxy Server"
            ],
            correctAnswer: "Recursive Resolver -> Root Nameserver (.) -> Top-Level Domain (TLD) Nameserver (.academy) -> Authoritative Nameserver (moos.academy)",
            explanation: "DNS query resolution traverses a strict hierarchy: The local/ISP Recursive Resolver queries the Root DNS server ('.'), which points to the TLD server ('.academy'), which points to the Authoritative DNS server for the domain, which returns the actual A record IP address.",
            hintLadder: [
              "Starts with your local recursive resolver (ISP/DNS 8.8.8.8).",
              "First queries the root servers at the top of the tree ('.').",
              "Then goes to the specific TLD ('.academy'), and finally to the authoritative nameserver holding the records."
            ],
            misconceptionAlerts: [
              { trigger: "Authoritative Nameserver -> Root Nameserver -> Browser -> ISP Resolver", note: "The query goes top-down (Root -> TLD -> Authoritative), not bottom-up." }
            ],
            skillId: "skill-cs-http-dns-web-protocols",
            difficulty: "medium"
          },
          {
            id: "q-cs-web-3",
            type: "multiple_choice",
            questionText: "An HTML `<div>` element has CSS styles:\n`width: 280px; padding: 20px; border: 5px solid black; margin: 15px; box-sizing: content-box;`\nWhat is the total horizontal space occupied by this element in the document layout (including margins)?",
            mathExpression: "\\text{Total Width} = \\text{width} + 2(\\text{padding}) + 2(\\text{border}) + 2(\\text{margin})",
            options: ["360px", "330px", "320px", "280px"],
            correctAnswer: "360px",
            explanation: "Under standard `box-sizing: content-box`, total width = content width (280) + left/right padding (20 × 2 = 40) + left/right border (5 × 2 = 10) + left/right margin (15 × 2 = 30) = 280 + 40 + 10 + 30 = 360px.",
            hintLadder: [
              "With `content-box`, padding and borders add to the stated width.",
              "Horizontal: width (280) + padding-left/right (20+20=40) + border-left/right (5+5=10) = 330px border box.",
              "Total occupied space including margins: 330 + margin-left/right (15+15=30) = 360px."
            ],
            misconceptionAlerts: [
              { trigger: "330px", note: "330px is the element's border-box width; you must also include the 30px left/right margins to get total occupied space in layout." },
              { trigger: "320px", note: "Did you only add padding and margin once instead of both left and right sides?" }
            ],
            skillId: "skill-cs-http-dns-web-protocols",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-software-engineering-sdlc",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Software Engineering, SDLC & Testing Methodologies",
    code: "CSC-UNIT-08",
    description: "Software Development Life Cycle (SDLC) phases, Waterfall versus Agile Scrum frameworks, automated testing pyramids, and Git version control branching.",
    order: 8,
    category: "core",
    skills: [
      {
        id: "skill-cs-sdlc-waterfall-agile-testing",
        unitId: "unit-cs-software-engineering-sdlc",
        title: "SDLC Phases, Agile vs Waterfall & Verification Testing",
        code: "SKL-CSC-304",
        summary: "Sequencing SDLC stages, evaluating Agile versus Waterfall tradeoffs, and distinguishing unit, integration, and regression testing.",
        objectives: [
          "Sequence the primary phases of the SDLC: Requirements, Analysis, Design, Implementation, Testing, Deployment, Maintenance",
          "Contrast the linear rigid Waterfall methodology with iterative, feedback-driven Agile/Scrum sprints",
          "Differentiate levels of software testing: Unit testing, Integration testing, System testing, and Acceptance testing"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-cs-python-control-flow"],
        questions: [
          {
            id: "q-cs-se-1",
            type: "multiple_choice",
            questionText: "What is the primary fundamental distinction between the traditional Waterfall model and modern Agile software development methodologies?",
            options: [
              "Waterfall follows strict sequential phases with heavy upfront documentation; Agile emphasizes iterative sprints, working software increments, and rapid adaptation to changing requirements.",
              "Waterfall is only used for web development, while Agile is exclusively used for embedded systems.",
              "Agile eliminates the testing phase completely to achieve faster releases.",
              "Waterfall allows daily changes to project scope, whereas Agile forbids any modifications once development begins."
            ],
            correctAnswer: "Waterfall follows strict sequential phases with heavy upfront documentation; Agile emphasizes iterative sprints, working software increments, and rapid adaptation to changing requirements.",
            explanation: "Waterfall is sequential and predictive: each phase must complete before the next begins. Agile is empirical and iterative: teams work in short sprints (1-4 weeks), frequently shipping working software and continuously incorporating user feedback.",
            hintLadder: [
              "Waterfall flows strictly downwards in one direction like water over a falls.",
              "Agile is fast, flexible, and iterative.",
              "Agile embraces changing requirements through sprint cycles, whereas Waterfall resists mid-cycle changes."
            ],
            misconceptionAlerts: [
              { trigger: "Agile eliminates the testing phase completely to achieve faster releases.", note: "Agile integrates testing continuously into every sprint (often via Test-Driven Development), rather than eliminating it." }
            ],
            skillId: "skill-cs-sdlc-waterfall-agile-testing",
            difficulty: "easy"
          },
          {
            id: "q-cs-se-2",
            type: "multiple_choice",
            questionText: "In the software testing hierarchy, what is the specific objective of 'Integration Testing'?",
            options: [
              "Verifying that independently developed software modules, interfaces, and databases cooperate and communicate correctly when combined.",
              "Testing an isolated individual function or method in complete isolation using mock objects.",
              "Validating that the final software meets the commercial legal requirements of the client.",
              "Measuring the maximum concurrent network users a server can handle before crashing."
            ],
            correctAnswer: "Verifying that independently developed software modules, interfaces, and databases cooperate and communicate correctly when combined.",
            explanation: "Integration testing verifies that different software components or subsystems interact properly (e.g., verifying API routes correctly exchange data with the database layer). Unit testing tests single isolated functions; Load/Stress testing measures concurrency.",
            hintLadder: [
              "'Integration' means putting pieces together.",
              "Unit tests verify components in isolation.",
              "Integration tests verify how these components communicate with each other across interfaces."
            ],
            misconceptionAlerts: [
              { trigger: "Testing an isolated individual function or method in complete isolation using mock objects.", note: "This defines Unit Testing, not Integration Testing." }
            ],
            skillId: "skill-cs-sdlc-waterfall-agile-testing",
            difficulty: "easy"
          },
          {
            id: "q-cs-se-3",
            type: "multiple_choice",
            questionText: "When collaborating on a software project using Git version control, which command creates a new feature branch named 'feature-auth' and immediately switches the working directory to that branch?",
            options: [
              "git checkout -b feature-auth",
              "git branch --merge feature-auth",
              "git commit -m 'create branch feature-auth'",
              "git push origin feature-auth --force"
            ],
            correctAnswer: "git checkout -b feature-auth",
            explanation: "In Git, `git checkout -b <branch-name>` (or `git switch -c <branch-name>`) is the standard shortcut to create a new branch and check it out simultaneously.",
            hintLadder: [
              "`git branch <name>` creates a branch without switching.",
              "The flag `-b` with `checkout` combines creation and switching in one step.",
              "Select `git checkout -b feature-auth`."
            ],
            misconceptionAlerts: [
              { trigger: "git branch --merge feature-auth", note: "`git merge` merges existing branches; it does not create and switch to a new branch." }
            ],
            skillId: "skill-cs-sdlc-waterfall-agile-testing",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-operating-systems-concurrency",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Operating Systems, Process Management & Virtual Memory",
    code: "CSC-UNIT-09",
    description: "Process lifecycle states, Round Robin CPU scheduling, paging and virtual memory architecture, and Coffman deadlock conditions.",
    order: 9,
    category: "core",
    skills: [
      {
        id: "skill-cs-process-scheduling-memory-management",
        unitId: "unit-cs-operating-systems-concurrency",
        title: "CPU Scheduling, Virtual Memory Paging & Deadlocks",
        code: "SKL-CSC-305",
        summary: "Computing turnaround and completion times in Round Robin scheduling, analyzing page fault swapping, and identifying deadlock conditions.",
        objectives: [
          "Trace process execution through Ready, Running, and Waiting/Blocked operating system states",
          "Calculate process completion times under preemptive Round Robin CPU scheduling with fixed time quanta",
          "Identify the four Coffman conditions necessary for deadlock: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-cs-number-systems"],
        questions: [
          {
            id: "q-cs-os-1",
            type: "multiple_choice",
            questionText: "Two processes P1 and P2 arrive at time t = 0 ms in the Ready queue in order [P1, P2]. P1 has a CPU burst time of 7 ms, and P2 has a CPU burst time of 4 ms. Using preemptive Round Robin scheduling with a time quantum Q = 4 ms (zero context-switching overhead), at what time t does P1 complete execution?",
            options: ["11 ms", "7 ms", "15 ms", "8 ms"],
            correctAnswer: "11 ms",
            explanation: "Timeline: t=0 to 4ms: P1 executes for 4ms (3ms remaining); t=4 to 8ms: P2 executes for 4ms and finishes at t=8ms; t=8 to 11ms: P1 executes its remaining 3ms and completes at t=11ms.",
            hintLadder: [
              "Quantum is 4ms. P1 runs first from t=0 to t=4 (P1 has 7 - 4 = 3ms left).",
              "P2 runs next from t=4 to t=8 (P2 needs 4ms, so P2 finishes at t=8).",
              "P1 resumes at t=8 and runs for its remaining 3ms, finishing at 8 + 3 = 11ms."
            ],
            misconceptionAlerts: [
              { trigger: "7 ms", note: "7 ms would be the completion time if P1 ran to completion non-preemptively without sharing CPU with P2." },
              { trigger: "15 ms", note: "Total required CPU time is 7 + 4 = 11 ms. There is no idle time or extra quantum used." }
            ],
            skillId: "skill-cs-process-scheduling-memory-management",
            difficulty: "medium"
          },
          {
            id: "q-cs-os-2",
            type: "multiple_choice",
            questionText: "In virtual memory management, what phenomenon is known as 'thrashing'?",
            options: [
              "The operating system spends virtually all its time swapping memory pages back and forth between RAM and disk swap space rather than executing user instructions.",
              "A hard drive head physically damages magnetic platters due to excessive read operations.",
              "Two threads concurrently attempt to write to the same memory address without a mutex lock.",
              "A network card drops packets due to severe router congestion."
            ],
            correctAnswer: "The operating system spends virtually all its time swapping memory pages back and forth between RAM and disk swap space rather than executing user instructions.",
            explanation: "Thrashing occurs when active processes require more physical memory than is available in RAM, causing continuous page faults. The CPU sits idle waiting on slow secondary disk I/O as pages are constantly swapped in and out.",
            hintLadder: [
              "Thrashing is related to virtual memory and page faults.",
              "It happens when total working memory exceeds physical RAM capacity.",
              "The system bogs down because disk paging I/O completely overwhelms CPU processing."
            ],
            misconceptionAlerts: [
              { trigger: "Two threads concurrently attempt to write to the same memory address without a mutex lock.", note: "This describes a Race Condition, not thrashing." }
            ],
            skillId: "skill-cs-process-scheduling-memory-management",
            difficulty: "easy"
          },
          {
            id: "q-cs-os-3",
            type: "multiple_choice",
            questionText: "Which of the following is NOT one of the four essential Coffman conditions required for a system Deadlock to occur?",
            options: [
              "Mandatory Preemption (operating systems actively taking resources away from processes by force)",
              "Mutual Exclusion (at least one resource must be held in a non-shareable mode)",
              "Hold and Wait (a process holding resources can request additional resources)",
              "Circular Wait (a closed chain of processes exists where each holds a resource needed by the next)"
            ],
            correctAnswer: "Mandatory Preemption (operating systems actively taking resources away from processes by force)",
            explanation: "The four Coffman conditions are: 1) Mutual Exclusion, 2) Hold and Wait, 3) NO Preemption (resources CANNOT be forcibly taken away), and 4) Circular Wait. If preemption is enforced, deadlocks cannot persist.",
            hintLadder: [
              "Deadlock requires that resources CANNOT be taken away from a holding process.",
              "Therefore, the condition is 'No Preemption', not 'Mandatory Preemption'.",
              "Mandatory preemption is a deadlock prevention strategy, not a cause."
            ],
            misconceptionAlerts: [
              { trigger: "Circular Wait (a closed chain of processes exists where each holds a resource needed by the next)", note: "Circular Wait is indeed one of the essential Coffman conditions." }
            ],
            skillId: "skill-cs-process-scheduling-memory-management",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-cs-artificial-intelligence-ethics",
    subjectId: "tech_compsci",
    level: "senior_secondary",
    title: "Artificial Intelligence, Machine Learning & Digital Ethics",
    code: "CSC-UNIT-10",
    description: "Supervised vs unsupervised learning paradigms, neural network basics, training overfitting risks, algorithmic bias, and ethical data privacy principles.",
    order: 10,
    category: "exam_focus",
    skills: [
      {
        id: "skill-cs-machine-learning-ai-ethics",
        unitId: "unit-cs-artificial-intelligence-ethics",
        title: "Supervised Learning, Model Overfitting & Algorithmic Ethics",
        code: "SKL-CSC-306",
        summary: "Differentiating machine learning paradigms, identifying model overfitting through train/test splits, and addressing algorithmic bias in automated decisions.",
        objectives: [
          "Classify machine learning tasks into Supervised Learning (labeled targets), Unsupervised Learning (clustering), and Reinforcement Learning (rewards)",
          "Identify symptoms of overfitting where a model memorizes training noise and fails to generalize to unseen test data",
          "Analyze sources of algorithmic bias in training datasets and explain ethical data privacy regulations (GDPR, right to explanation)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-cs-python-control-flow"],
        questions: [
          {
            id: "q-cs-ai-1",
            type: "multiple_choice",
            questionText: "An AI company trains a system to predict whether a loan applicant will default by feeding it 100,000 historical loan applications labeled with 'Defaulted' or 'Repaid'. What category of Machine Learning is this?",
            options: [
              "Supervised Learning (Classification)",
              "Unsupervised Learning (Clustering)",
              "Reinforcement Learning (Policy Optimization)",
              "Generative Adversarial Synthesis"
            ],
            correctAnswer: "Supervised Learning (Classification)",
            explanation: "Supervised learning trains on labeled datasets containing both input features and known ground-truth targets (e.g. 'Defaulted' or 'Repaid'). Because the target is a discrete category, this is a classification task.",
            hintLadder: [
              "Notice that historical records come with known outcome LABELS ('Defaulted' or 'Repaid').",
              "Learning from labeled input-output pairs is Supervised Learning.",
              "Since the outcome is a discrete category, it is classification."
            ],
            misconceptionAlerts: [
              { trigger: "Unsupervised Learning (Clustering)", note: "Unsupervised learning works on UNLABELED data to discover hidden patterns without target labels." }
            ],
            skillId: "skill-cs-machine-learning-ai-ethics",
            difficulty: "easy"
          },
          {
            id: "q-cs-ai-2",
            type: "multiple_choice",
            questionText: "A machine learning model achieves 99.4% accuracy on its training dataset, but drops sharply to 61.2% accuracy when evaluated on an independent test dataset. What problem has occurred, and how can it be mitigated?",
            options: [
              "Overfitting: the model memorized training noise; mitigated by regularization, dropout, or simplifying model complexity.",
              "Underfitting: the model is too simple; mitigated by increasing parameters and training epochs.",
              "Zero-day exploit: the model weights were corrupted by a cybersecurity attack.",
              "Hardware bottleneck: the GPU lacked sufficient video RAM to process tensors."
            ],
            correctAnswer: "Overfitting: the model memorized training noise; mitigated by regularization, dropout, or simplifying model complexity.",
            explanation: "Overfitting occurs when a high-capacity model learns noise and idiosyncrasies of the training set rather than the underlying general relationship, resulting in excellent training scores but abysmal generalization on test data.",
            hintLadder: [
              "High training accuracy + low test accuracy = classic symptom of Overfitting.",
              "The model fails to generalize to unseen test data.",
              "Mitigations include regularization (L1/L2), dropout in neural networks, and cross-validation."
            ],
            misconceptionAlerts: [
              { trigger: "Underfitting: the model is too simple; mitigated by increasing parameters and training epochs.", note: "Underfitting causes poor accuracy on BOTH training and test data, not 99.4% on training data." }
            ],
            skillId: "skill-cs-machine-learning-ai-ethics",
            difficulty: "medium"
          },
          {
            id: "q-cs-ai-3",
            type: "multiple_choice",
            questionText: "An automated hiring algorithm trained on historical corporate hiring records over the past 10 years systematically downgrades female engineering applicants. What is the fundamental root cause of this algorithmic bias?",
            options: [
              "The historical training data reflects existing historical human biases and underrepresentation, which the algorithm learned and amplified.",
              "Computers are fundamentally incapable of calculating matrix multiplications accurately.",
              "The server operating system lacked a valid SSL digital certificate.",
              "Python floating-point rounding errors favored male applicants."
            ],
            correctAnswer: "The historical training data reflects existing historical human biases and underrepresentation, which the algorithm learned and amplified.",
            explanation: "Machine learning models do not possess moral judgment; they discover statistical patterns in training data. If historical hiring decisions favored one group due to societal bias, the model will codify and perpetuate that exact systemic bias unless engineers actively audit and debias the data.",
            hintLadder: [
              "Remember: 'Garbage in, garbage out' / 'Bias in, bias out'.",
              "The model learns associations from historical data.",
              "If the past 10 years of hiring had human demographic disparities, the algorithm will replicate them."
            ],
            misconceptionAlerts: [
              { trigger: "Python floating-point rounding errors favored male applicants.", note: "Algorithmic bias is a systemic sociological data problem, not a floating-point IEEE-754 calculation flaw." }
            ],
            skillId: "skill-cs-machine-learning-ai-ethics",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];

