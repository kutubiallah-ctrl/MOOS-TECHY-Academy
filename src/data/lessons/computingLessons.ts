import { SkillLesson } from "../../types/curriculum";

export const COMPUTING_LESSONS: Record<string, SkillLesson> = {
  "skill-cs-number-systems": {
    id: "les-cs-number-systems",
    title: "Binary, Hexadecimal, & Two's Complement Number Representation",
    hookAndIntuition: "Every photo, song, video, and line of code on your computer is physically stored as microscopic electrical switches that are either ON or OFF—1 or 0. How does a machine represent negative integers or 16 million vibrant colors using only ones and zeroes?",
    conceptualExplanation: "Computers use base-2 (binary) where positional place values are powers of 2 (1, 2, 4, 8, 16, 32, 64, 128). Hexadecimal (base-16) groups four binary bits (a nibble) into a single compact symbol (0-9 and A-F, where A=10, B=11, C=12, D=13, E=14, F=15), simplifying memory addresses and color codes (e.g. #FF5733). To represent signed negative integers in binary, modern computers universally use Two's Complement: the most significant bit (MSB) acts as a negative weight (in an 8-bit byte, MSB = -128). To negate a number in two's complement: invert all bits (flip 0s to 1s and 1s to 0s) and add 1.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Binary Positional Values: 128, 64, 32, 16, 8, 4, 2, 1", definition: "Base-2 place value system in an 8-bit unsigned byte.", practicalExample: "Binary 10010101 = 128 + 16 + 4 + 1 = 149 in decimal." },
      { termOrSymbol: "Two's Complement: Invert Bits + 1", definition: "Hardware-friendly representation of signed negative integers allowing subtraction via addition.", practicalExample: "+5 is 00000101; Invert: 11111010; Add 1: 11111011 = -5." },
      { termOrSymbol: "Hexadecimal Nibble Mapping", definition: "Every 4 binary bits directly map to exactly 1 hexadecimal digit.", practicalExample: "Binary 1101 1010 = D A in hex (0xDA)." }
    ],
    workedExamples: [
      {
        title: "Converting Decimal -42 into 8-Bit Two's Complement Binary",
        problemStatement: "Convert the signed decimal integer -42 into its 8-bit Two's Complement binary representation.",
        steps: [
          { stepNumber: 1, instruction: "Convert the positive magnitude (+42) into 8-bit unsigned binary.", reasoning: "42 = 32 + 8 + 2. Place values: 128=0, 64=0, 32=1, 16=0, 8=1, 4=0, 2=1, 1=0. Binary representation of +42 = 00101010." },
          { stepNumber: 2, instruction: "Perform One's Complement (invert all bits).", reasoning: "Flip every bit: 0 -> 1 and 1 -> 0. Inverted bits = 11010101." },
          { stepNumber: 3, instruction: "Add 1 to the inverted bits to get Two's Complement.", reasoning: "11010101 + 1 = 11010110." },
          { stepNumber: 4, instruction: "Verify by summing signed weights.", reasoning: "MSB has weight -128. Sum = -128 + 64 + 16 + 4 + 2 = -128 + 86 = -42. Verified!" }
        ],
        takeawayRule: "To negate any binary integer in Two's Complement: invert all bits and add 1."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking an 8-bit byte starting with a 1 is always negative.", whyItIsWrong: "Whether 11010110 represents negative -42 or positive 214 depends entirely on data type context (signed vs unsigned byte).", correctCorrection: "In unsigned byte, MSB is +128 (range 0 to 255); in signed byte, MSB is -128 (range -128 to +127)." }
    ],
    guidedPracticePrompt: "What is the largest signed integer that can be represented in a 16-bit Two's Complement system?",
    summaryRecap: "Binary uses base-2; hexadecimal groups 4 bits into 1 character (0-F). Two's complement represents signed negatives by inverting bits and adding 1."
  },

  "skill-cs-logic-gates": {
    id: "les-cs-logic-gates",
    title: "Boolean Algebra, Logic Gates, & Circuit Truth Tables",
    hookAndIntuition: "Inside a modern computer processor, billions of microscopic transistors function as logic gates. By combining simple TRUE and FALSE decisions, these gates execute mathematical calculations, render 3D graphics, and execute complex artificial intelligence algorithms.",
    conceptualExplanation: "Boolean algebra evaluates binary truth values (1 = TRUE, 0 = FALSE). Fundamental logic gates include: NOT (inverts input: Q = ¬A), AND (output is 1 only if all inputs are 1: Q = A · B), OR (output is 1 if at least one input is 1: Q = A + B), XOR (exclusive OR, output is 1 if inputs differ: Q = A ⊕ B = A¬B + ¬AB), NAND (negated AND: Q = ¬(A · B)), and NOR (negated OR: Q = ¬(A + B)). NAND and NOR gates are known as 'Universal Gates' because any digital circuit or Boolean expression can be constructed exclusively from NAND or NOR gates. De Morgan's Laws state: ¬(A · B) = ¬A + ¬B and ¬(A + B) = ¬A · ¬B.",
    keyTermsAndFormulas: [
      { termOrSymbol: "De Morgan's Laws: ¬(A · B) = ¬A + ¬B, ¬(A + B) = ¬A · ¬B", definition: "Fundamental Boolean algebra simplification identities.", practicalExample: "A NAND gate is functionally equivalent to an OR gate with inverted inputs." },
      { termOrSymbol: "XOR (Exclusive OR): Q = A ⊕ B", definition: "Outputs 1 when inputs are unequal (0,1 or 1,0); forms the basis of binary half-adders.", practicalExample: "Half-adder: Sum = A ⊕ B; Carry = A · B." },
      { termOrSymbol: "Universal Logic Gates", definition: "NAND and NOR gates can replicate NOT, AND, and OR logic without other gate types.", practicalExample: "Connecting both inputs of a NAND gate together produces a NOT gate." }
    ],
    workedExamples: [
      {
        title: "Simplifying a Boolean Expression using Boolean Identities",
        problemStatement: "Simplify the Boolean expression Q = A · B + A · ¬B + ¬A · B to its minimum term representation.",
        steps: [
          { stepNumber: 1, instruction: "Group the first two terms by factoring out common variable A.", reasoning: "A · B + A · ¬B = A · (B + ¬B)." },
          { stepNumber: 2, instruction: "Apply the Inverse Law: B + ¬B = 1.", reasoning: "A · (1) = A." },
          { stepNumber: 3, instruction: "Substitute back into the full expression.", reasoning: "Q = A + ¬A · B." },
          { stepNumber: 4, instruction: "Apply the Distributive Law: A + ¬A · B = (A + ¬A) · (A + B).", reasoning: "Since A + ¬A = 1, we get 1 · (A + B) = A + B." }
        ],
        takeawayRule: "Always factor common literals and apply inverse identities (X + ¬X = 1) to minimize gate count."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Confusing inclusive OR with exclusive OR (XOR).", whyItIsWrong: "Inclusive OR outputs 1 when both inputs are 1 (1 OR 1 = 1). XOR outputs 0 when both inputs are 1 (1 XOR 1 = 0).", correctCorrection: "OR means 'one, the other, or both'; XOR means 'one or the other, but NOT both'." }
    ],
    guidedPracticePrompt: "Construct the truth table for the expression Q = ¬(A + B) · C.",
    summaryRecap: "AND, OR, NOT, XOR, NAND, and NOR form digital circuits. De Morgan's laws simplify expressions. NAND and NOR are universal gates."
  },

  "skill-cs-pseudocode-flowcharts": {
    id: "les-cs-pseudocode-flowcharts",
    title: "Algorithmic Thinking, Pseudocode Conventions, & Flowcharts",
    hookAndIntuition: "Before an architect pours concrete or lays bricks, they draw a precise architectural blueprint. In computer science, an algorithm is the intellectual blueprint of a program, mapping out logical steps independent of any specific programming language syntax.",
    conceptualExplanation: "An algorithm is an unambiguous, finite sequence of well-defined computer-implementable instructions to solve a problem. The three building blocks of all computer algorithms (Böhm-Jacopini theorem) are: (1) Sequence (executing statements in order), (2) Selection (conditional branching via IF-THEN-ELSE or SWITCH), and (3) Iteration / Repetition (looping via WHILE, DO-WHILE, or FOR). Pseudocode uses structured, human-readable English conventions (INPUT, OUTPUT, SET, IF, ELSE, WHILE, FOR) without language-specific syntax. Flowcharts provide standard ISO geometric diagrams: Ovals (Start/End terminator), Rectangles (Process step or calculation), Parallelograms (Input/Output data), Diamonds (Decision condition with Yes/No branches), and Arrows (Flow of control). Trace tables verify algorithmic correctness by tracking variable states through each step.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Flowchart ISO Symbols", definition: "Oval = Start/End; Rectangle = Process; Parallelogram = Input/Output; Diamond = Decision.", practicalExample: "A diamond evaluates 'Is Balance >= Cost?' with separate 'True' and 'False' exit arrows." },
      { termOrSymbol: "Trace Table", definition: "Debugging matrix recording line-by-line variable values during dry-run execution.", practicalExample: "Columns: Line Number, Count, Total, Output; Rows: step-by-step loop iterations." },
      { termOrSymbol: "Definite vs Indefinite Iteration", definition: "FOR loop runs fixed n times (definite); WHILE loop runs until condition fails (indefinite).", practicalExample: "Iterating over 10 items is definite; polling a sensor until pressed is indefinite." }
    ],
    workedExamples: [
      {
        title: "Dry-Running a Trace Table for a Factorial Algorithm",
        problemStatement: "Given the pseudocode: INPUT N; SET fact = 1; FOR i = 1 TO N DO: fact = fact * i; ENDFOR; OUTPUT fact. Dry-run this algorithm with N = 4 using a trace table.",
        steps: [
          { stepNumber: 1, instruction: "Initialize trace table columns.", reasoning: "Columns: N, fact, i, Output." },
          { stepNumber: 2, instruction: "Record initialization step.", reasoning: "N = 4, fact = 1, i = unassigned, Output = none." },
          { stepNumber: 3, instruction: "Trace Iteration 1 (i = 1).", reasoning: "fact = 1 * 1 = 1." },
          { stepNumber: 4, instruction: "Trace Iteration 2 (i = 2).", reasoning: "fact = 1 * 2 = 2." },
          { stepNumber: 5, instruction: "Trace Iteration 3 (i = 3).", reasoning: "fact = 2 * 3 = 6." },
          { stepNumber: 6, instruction: "Trace Iteration 4 (i = 4).", reasoning: "fact = 6 * 4 = 24." },
          { stepNumber: 7, instruction: "Loop terminates; record output.", reasoning: "Output: 24." }
        ],
        takeawayRule: "Trace tables catch off-by-one errors and logical bugs before code is even compiled."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using language-specific syntax (like curly braces or semicolons) in pseudocode.", whyItIsWrong: "Pseudocode must remain language-agnostic and universally comprehensible to any developer regardless of Python, Java, or C++ background.", correctCorrection: "Use clean, capitalized standard pseudocode keywords: IF, THEN, ELSE, WHILE, ENDWHILE." }
    ],
    guidedPracticePrompt: "Write pseudocode to find and return the maximum value in an array of N numbers.",
    summaryRecap: "Algorithms combine sequence, selection, and iteration. Standard flowchart shapes clarify control flow. Trace tables verify logic."
  },

  "skill-cs-search-sort-complexity": {
    id: "les-cs-search-sort-complexity",
    title: "Searching, Sorting Algorithms, & Big-O Time Complexity",
    hookAndIntuition: "If you need to find a friend's name in an unsorted phonebook of 1,000,000 people, you might have to check every single page—one million checks! But if the phonebook is sorted alphabetically, you can flip to the middle and find them in at most 20 checks. This dramatic efficiency difference is the power of algorithms.",
    conceptualExplanation: "Big-O notation describes the asymptotic worst-case growth rate of an algorithm's time or space requirements as input size n approaches infinity. Common complexities ordered from fastest to slowest: O(1) Constant -> O(log n) Logarithmic -> O(n) Linear -> O(n log n) Linearithmic -> O(n²) Quadratic -> O(2^n) Exponential. Linear Search inspects each element one by one in O(n) time (works on unsorted data). Binary Search repeatedly divides a sorted search interval in half, finding targets in O(log n) time. Bubble Sort repeatedly swaps adjacent out-of-order elements in O(n²) time. Merge Sort uses Divide and Conquer: recursively splits array in half, sorts sub-arrays, and merges them back in O(n log n) time. Quick Sort partitions around a pivot in average O(n log n) time.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Binary Search: O(log₂ n)", definition: "Halving search space on sorted data at each comparison step.", practicalExample: "Searching 1,000,000 elements requires at most ⌈log₂ 1,000,000⌉ = 20 comparisons." },
      { termOrSymbol: "Bubble Sort: O(n²)", definition: "Simple quadratic sorting algorithm with nested loops comparing adjacent pairs.", practicalExample: "Sorting 10,000 items requires up to ~100,000,000 comparison operations." },
      { termOrSymbol: "Merge Sort: O(n log n)", definition: "Optimal divide-and-conquer comparison sorting algorithm requiring O(n) auxiliary space.", practicalExample: "Guaranteed O(n log n) worst-case performance under all input arrangements." }
    ],
    workedExamples: [
      {
        title: "Tracing Binary Search on a Sorted List",
        problemStatement: "Search for target value T = 47 in sorted array A = [11, 19, 23, 31, 38, 47, 56, 68, 79, 92]. Show the low, high, and mid index calculations for each iteration.",
        steps: [
          { stepNumber: 1, instruction: "Initialize pointers.", reasoning: "low = 0, high = 9 (length - 1 = 9)." },
          { stepNumber: 2, instruction: "Iteration 1: Calculate midpoint.", reasoning: "mid = ⌊(0 + 9) / 2⌋ = 4. Value A[4] = 38. Target 47 > 38, so target must lie in the right half. Update: low = mid + 1 = 5." },
          { stepNumber: 3, instruction: "Iteration 2: Calculate new midpoint.", reasoning: "low = 5, high = 9. mid = ⌊(5 + 9) / 2⌋ = 7. Value A[7] = 68. Target 47 < 68, so target lies in left sub-half. Update: high = mid - 1 = 6." },
          { stepNumber: 4, instruction: "Iteration 3: Calculate midpoint.", reasoning: "low = 5, high = 6. mid = ⌊(5 + 6) / 2⌋ = 5. Value A[5] = 47. Target found! Return index 5." }
        ],
        takeawayRule: "Binary search eliminates half the remaining items at every step, requiring only 3 comparisons instead of 6 for linear search."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Attempting to run binary search on an unsorted list.", whyItIsWrong: "Binary search fundamentally relies on the invariant that all elements to the left of midpoint are smaller and to the right are larger. On an unsorted array, halving discards data unpredictably, causing valid targets to be missed.", correctCorrection: "Binary search strictly requires pre-sorted data." }
    ],
    guidedPracticePrompt: "Compare the time complexity of Bubble Sort, Merge Sort, and Binary Search.",
    summaryRecap: "Big-O measures asymptotic efficiency. Linear search is O(n); binary search is O(log n) on sorted data. Merge sort is O(n log n)."
  },

  "skill-cs-recursion": {
    id: "les-cs-recursion",
    title: "Recursive Functions, Call Stacks, & Base Case Termination",
    hookAndIntuition: "Stand between two facing parallel mirrors, and you see an endless corridor of reflections repeating inside reflections. Recursion in computer science is the art of solving a massive problem by having a function call itself with smaller instances of the exact same problem until reaching a dead-simple base case.",
    conceptualExplanation: "A recursive function is a function that solves a problem by calling itself with reduced input parameters. Every valid recursive function requires two fundamental components: (1) Base Case: one or more terminating conditions that return a direct result without making further recursive calls, preventing infinite recursion; and (2) Recursive Step / Inductive Case: logic that reduces the problem towards the base case. The computer executes recursive functions using the Call Stack (LIFO: Last In, First Out). Each recursive call pushes a new Stack Frame containing local variables, parameters, and the return address. When the base case is reached, stack frames pop sequentially in reverse order, returning accumulated results. If a base case is omitted or unreachable, stack frames multiply until system memory is exhausted, throwing a Stack Overflow error.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Base Case", definition: "The condition under which a recursive function returns without further self-calls.", practicalExample: "In factorial: if n <= 1 return 1." },
      { termOrSymbol: "Call Stack & Stack Frame", definition: "Runtime memory structure storing active subroutine execution context.", practicalExample: "Factorial(3) pushes frames: fact(3) -> fact(2) -> fact(1), then pops resolving 1 -> 2 -> 6." },
      { termOrSymbol: "Stack Overflow", definition: "Fatal runtime crash caused by infinite recursion exhausting call stack memory.", practicalExample: "Calling a recursive function with no base case crashes the program." }
    ],
    workedExamples: [
      {
        title: "Evaluating Recursive Fibonacci: fib(4)",
        problemStatement: "Given the recursive definition: fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2). Trace the recursive call tree to evaluate fib(4).",
        steps: [
          { stepNumber: 1, instruction: "Expand top-level call fib(4).", reasoning: "fib(4) = fib(3) + fib(2)." },
          { stepNumber: 2, instruction: "Expand left branch fib(3).", reasoning: "fib(3) = fib(2) + fib(1). Expanding fib(2): fib(2) = fib(1) + fib(0) = 1 + 0 = 1. Since fib(1) = 1, fib(3) = 1 + 1 = 2." },
          { stepNumber: 3, instruction: "Expand right branch fib(2).", reasoning: "fib(2) = fib(1) + fib(0) = 1 + 0 = 1." },
          { stepNumber: 4, instruction: "Sum both branch results.", reasoning: "fib(4) = fib(3) + fib(2) = 2 + 1 = 3." }
        ],
        takeawayRule: "Without memoization, naive recursive Fibonacci has exponential O(2^n) time complexity due to redundant subproblem calculations."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing recursion is always faster or uses less memory than iteration.", whyItIsWrong: "Recursive calls incur call stack frame allocation overhead and function call dispatch costs. An iterative loop often runs faster and uses O(1) auxiliary memory.", correctCorrection: "Recursion offers elegant, readable solutions for naturally hierarchical problems (trees, divide-and-conquer), but requires stack space." }
    ],
    guidedPracticePrompt: "Write the base case and recursive step for calculating the sum of digits of a positive integer n.",
    summaryRecap: "Recursion requires a base case and recursive reduction. The call stack tracks nested calls (LIFO). Missing base cases cause stack overflow."
  },

  "skill-cs-python-control-flow": {
    id: "les-cs-python-control-flow",
    title: "Python Syntax, Boolean Control Flow, & Iteration Loops",
    hookAndIntuition: "Imagine giving instructions to a chef: 'If the soup is cold, reheat it for 2 minutes. Add salt while the soup tastes bland.' Programming control flow gives code the same decision-making intelligence and repetition capability.",
    conceptualExplanation: "Python is a clean, readable, high-level language using indentation (4 spaces) rather than curly braces to define code blocks. Variables are dynamically typed. Conditional execution is structured using if, elif, and else statements evaluated with relational operators (==, !=, <, >, <=, >=) and logical operators (and, or, not). Loops enable repetition: (1) for loops iterate over sequences (lists, strings, range(start, stop, step)), and (2) while loops continue as long as a Boolean condition remains True. Loop control keywords include: break (terminates loop immediately), continue (skips remainder of current iteration and jumps to next loop cycle), and pass (syntactic placeholder doing nothing).",
    keyTermsAndFormulas: [
      { termOrSymbol: "range(start, stop, step)", definition: "Python generator yielding integers from start up to (but not including) stop.", practicalExample: "list(range(2, 10, 2)) yields [2, 4, 6, 8]." },
      { termOrSymbol: "IndentationError", definition: "Syntax error raised when block indentation levels are inconsistent.", practicalExample: "Mixing tabs and spaces or failing to indent after a colon ':' raises IndentationError." },
      { termOrSymbol: "break vs continue", definition: "break exits loop completely; continue skips to next iteration.", practicalExample: "Searching for item: use break once found to avoid unnecessary iterations." }
    ],
    workedExamples: [
      {
        title: "Filtering Prime Numbers with a Python Loop",
        problemStatement: "Analyze the following Python code snippet and trace its execution for number = 7:\n\nis_prime = True\nfor i in range(2, number):\n    if number % i == 0:\n        is_prime = False\n        break\nprint(is_prime)",
        steps: [
          { stepNumber: 1, instruction: "Initialize flag is_prime = True.", reasoning: "We assume the number is prime until a divisor is found." },
          { stepNumber: 2, instruction: "Determine range of divisors: range(2, 7).", reasoning: "Loop tests i = 2, 3, 4, 5, 6." },
          { stepNumber: 3, instruction: "Evaluate modulo conditions.", reasoning: "7 % 2 = 1 != 0; 7 % 3 = 1 != 0; 7 % 4 = 3 != 0; 7 % 5 = 2 != 0; 7 % 6 = 1 != 0." },
          { stepNumber: 4, instruction: "Conclusion and output.", reasoning: "Condition number % i == 0 is never satisfied. Loop finishes naturally. Output: True." }
        ],
        takeawayRule: "The modulo operator % returns remainder: a % b == 0 indicates clean divisibility."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using single equals '=' instead of double equals '==' for equality comparison.", whyItIsWrong: "Single '=' is the assignment operator (stores value in variable). Double '==' is the equality comparison operator.", correctCorrection: "Use 'x == 5' for testing equality; use 'x = 5' for assignment." }
    ],
    guidedPracticePrompt: "Write a Python while loop that repeatedly halves a number until it is less than 1.",
    summaryRecap: "Python relies on clean 4-space indentation. if/elif/else controls branching. for and while loops handle repetition; break and continue control loop flow."
  },

  "skill-cs-python-functions-lists": {
    id: "les-cs-python-functions-lists",
    title: "Functions, Modular Scope, Lists, & Dictionary Data Structures",
    hookAndIntuition: "Think of your smartphone: instead of building a separate camera, compass, calculator, and telephone from scratch, engineers combined modular, reusable components into one coherent ecosystem. Functions and collections allow programmers to build scalable, organized software.",
    conceptualExplanation: "Functions are named, reusable blocks of code defined with the def keyword that accept arguments and return output values. Parameters are variables in function headers; arguments are actual values passed. Scope determines variable accessibility: local scope (created inside function, destroyed upon return) vs global scope. Lists are ordered, mutable, indexed sequences [x, y, z] supporting indexing (positive and negative), slicing list[start:end], appending, and list comprehensions [x**2 for x in nums]. Tuples (x, y) are immutable. Dictionaries {key: value} provide high-speed key-value hash maps with O(1) lookup, insertion, and deletion times. Sets {x, y} store unique, unordered elements.",
    keyTermsAndFormulas: [
      { termOrSymbol: "def function_name(param1, param2):", definition: "Python syntax for defining a reusable subroutine.", practicalExample: "def add(a, b): return a + b" },
      { termOrSymbol: "List Slicing: list[start:stop:step]", definition: "Extracts sub-array from start up to stop-1.", practicalExample: "nums = [10, 20, 30, 40, 50]; nums[1:4] yields [20, 30, 40]." },
      { termOrSymbol: "Dictionary Key-Value Lookup: dict[key]", definition: "O(1) average time hash table data access.", practicalExample: "grades = {'Ada': 95, 'Kofi': 88}; grades['Ada'] yields 95." }
    ],
    workedExamples: [
      {
        title: "Word Frequency Counter Using a Python Dictionary",
        problemStatement: "Given words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'], trace the code that computes word frequencies using a dictionary:\n\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1",
        steps: [
          { stepNumber: 1, instruction: "Initialize empty dictionary counts = {}.", reasoning: "Will map word string to integer frequency." },
          { stepNumber: 2, instruction: "Process word 1 ('apple'): counts.get('apple', 0) = 0 + 1 = 1.", reasoning: "counts = {'apple': 1}." },
          { stepNumber: 3, instruction: "Process word 2 ('banana'): counts.get('banana', 0) = 0 + 1 = 1.", reasoning: "counts = {'apple': 1, 'banana': 1}." },
          { stepNumber: 4, instruction: "Process word 3 ('apple'): counts.get('apple', 0) = 1 + 1 = 2.", reasoning: "counts = {'apple': 2, 'banana': 1}." },
          { stepNumber: 5, instruction: "Complete remaining words.", reasoning: "'orange' -> 1; 'banana' -> 2; 'apple' -> 3. Final: {'apple': 3, 'banana': 2, 'orange': 1}." }
        ],
        takeawayRule: "dict.get(key, default) avoids KeyError exceptions when querying keys that might not yet exist in the map."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Modifying a list while iterating over it in a for loop.", whyItIsWrong: "Removing or adding items to a list during iteration shifts internal index pointers, causing the loop to silently skip elements or enter unexpected states.", correctCorrection: "Iterate over a copy of the list (e.g. for item in items[:]) or use a list comprehension." }
    ],
    guidedPracticePrompt: "Use a list comprehension to extract all even numbers from a list of integers.",
    summaryRecap: "Functions encapsulate logic. Lists are mutable ordered sequences; dictionaries provide fast O(1) key-value lookups."
  },

  "skill-cs-networking-protocols": {
    id: "les-cs-networking-protocols",
    title: "Computer Networking, OSI 7-Layer Model, & TCP/IP Architecture",
    hookAndIntuition: "When you tap 'Send' on a message in Lagos, it crosses thousands of kilometers of undersea fiber-optic cables, switches, and satellites to land on a friend's screen in London 120 milliseconds later. How do disparate hardware devices from hundreds of manufacturers communicate without error? Standardized network protocols.",
    conceptualExplanation: "A network protocol is a formal set of rules governing data transmission between devices. The OSI (Open Systems Interconnection) 7-Layer Reference Model standardizes network functions: (7) Application (user services: HTTP, FTP, DNS), (6) Presentation (data encryption, formatting), (5) Session (connection management), (4) Transport (end-to-end delivery: TCP for reliable sequenced delivery with 3-way handshake; UDP for fast, connectionless streaming), (3) Network (packet routing and logical addressing: IP addresses, routers), (2) Data Link (frame transmission and physical MAC addressing: switches, Ethernet), and (1) Physical (raw bit transmission over copper wires, fiber optics, or radio Wi-Fi). TCP/IP collapses this into 4 layers: Application, Transport, Internet, and Network Interface. Packet Switching breaks large files into discrete packets with header metadata (source, destination, sequence number) that travel independent routes before reassembly at the destination.",
    keyTermsAndFormulas: [
      { termOrSymbol: "OSI 7 Layers", definition: "Application, Presentation, Session, Transport, Network, Data Link, Physical (All People Seem To Need Data Processing).", practicalExample: "HTTP operates at Application; TCP at Transport; IP at Network." },
      { termOrSymbol: "TCP vs UDP", definition: "TCP = connection-oriented, reliable, acknowledged, ordered; UDP = connectionless, low latency, unacknowledged.", practicalExample: "Web browsing and email require TCP; live video calls and online gaming use UDP." },
      { termOrSymbol: "IP vs MAC Address", definition: "IP = logical, routable network address (e.g. 192.168.1.1); MAC = physical hardware burned-in address (e.g. 00:1A:2B:3C:4D:5E).", practicalExample: "Routers forward packets using IP; local switches direct frames using MAC." }
    ],
    workedExamples: [
      {
        title: "Tracing the TCP 3-Way Handshake Connection Establishment",
        problemStatement: "A client browser requests an HTTPS webpage from a server. Detail the sequence of packet exchanges in the TCP 3-Way Handshake before any webpage data is transferred.",
        steps: [
          { stepNumber: 1, instruction: "Step 1: Client sends SYN.", reasoning: "Client chooses a random initial sequence number (ISN_c = 1000) and transmits a packet with the SYN (Synchronize) flag set." },
          { stepNumber: 2, instruction: "Step 2: Server responds with SYN-ACK.", reasoning: "Server acknowledges receipt by setting ACK = 1001 (ISN_c + 1), sets its own sequence number ISN_s = 5000, and sends back SYN-ACK." },
          { stepNumber: 3, instruction: "Step 3: Client confirms with ACK.", reasoning: "Client sends an ACK packet with ACK = 5001 (ISN_s + 1) and Seq = 1001." },
          { stepNumber: 4, instruction: "State: Connection Established.", reasoning: "Both client and server have verified bidirectional communication; application HTTP payload data transfer now begins." }
        ],
        takeawayRule: "The 3-way handshake (SYN -> SYN-ACK -> ACK) ensures both sender and receiver are synchronized and ready before transmitting data."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking an IP address permanently identifies a specific physical computer.", whyItIsWrong: "IP addresses are logical network addresses assigned dynamically via DHCP. Moving a laptop to a new Wi-Fi network assigns it a completely new IP address. The MAC address is the hardware identifier.", correctCorrection: "MAC address identifies the physical network card; IP address identifies location on the network." }
    ],
    guidedPracticePrompt: "Explain why live video streaming platforms use UDP instead of TCP.",
    summaryRecap: "OSI 7-layer model standardizes networking. TCP guarantees reliable ordered delivery; UDP prioritizes low latency. Packet switching divides data into routable chunks."
  },

  "skill-cs-cybersecurity-encryption": {
    id: "les-cs-cybersecurity-encryption",
    title: "Cybersecurity Threats, Symmetric/Asymmetric Encryption, & Hashing",
    hookAndIntuition: "Whenever you enter your credit card number or bank password online, malicious interceptors on public Wi-Fi networks may be listening in. Modern cryptography ensures that even if an attacker intercepts your data in transit, all they see is scrambled, mathematically unbreakable gibberish.",
    conceptualExplanation: "Cybersecurity protects digital systems, networks, and data from malicious attacks. Common threat vectors include: Malware (viruses, worms, ransomware, spyware), Phishing (fraudulent deception to steal credentials), Man-in-the-Middle (MitM) attacks, and SQL Injection. Cryptography secures data: (1) Symmetric Encryption (e.g. AES-256) uses the SAME single secret key for both encryption and decryption (fast, but requires secure key sharing). (2) Asymmetric / Public-Key Encryption (e.g. RSA, ECC) uses a mathematically paired Public Key (shared with everyone to encrypt messages) and Private Key (kept secret by owner to decrypt messages). (3) Cryptographic Hash Functions (e.g. SHA-256) are deterministic, one-way mathematical transformations that convert variable-length data into a fixed-length digest. Hashes are irreversible (cannot be decrypted back to plaintext) and exhibit the Avalanche Effect (altering 1 bit changes >50% of hash output), making them ideal for password verification and blockchain integrity.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Symmetric vs Asymmetric Encryption", definition: "Symmetric = one shared key (AES); Asymmetric = public/private key pair (RSA, TLS/HTTPS).", practicalExample: "HTTPS uses asymmetric RSA to securely exchange a fast symmetric AES session key." },
      { termOrSymbol: "Cryptographic Hash (One-Way Function)", definition: "Deterministic, irreversible function producing fixed-length digest; collisions are computationally infeasible.", practicalExample: "Websites store hash(password + salt), never plain passwords." },
      { termOrSymbol: "CIA Triad", definition: "Confidentiality (privacy), Integrity (tamper-proofing), Availability (system uptime).", practicalExample: "Ransomware attacks compromise Availability and Confidentiality." }
    ],
    workedExamples: [
      {
        title: "Explaining How Digital Signatures Guarantee Authenticity and Non-Repudiation",
        problemStatement: "Alice wants to send a digital contract to Bob. Explain how Alice creates a Digital Signature using asymmetric cryptography, and how Bob verifies that: (a) Alice wrote it, and (b) the document was not altered in transit.",
        steps: [
          { stepNumber: 1, instruction: "Alice creates a cryptographic hash of the contract.", reasoning: "Hash = SHA256(Document). This produces a unique 256-bit digital fingerprint." },
          { stepNumber: 2, instruction: "Alice signs the hash with her PRIVATE key.", reasoning: "Signature = Encrypt(Hash, Alice_Private_Key). Only Alice possesses her private key." },
          { stepNumber: 3, instruction: "Alice sends the Document and Digital Signature to Bob.", reasoning: "Bob receives the plaintext document and signature." },
          { stepNumber: 4, instruction: "Bob decrypts the signature using Alice's PUBLIC key.", reasoning: "Decrypted_Hash = Decrypt(Signature, Alice_Public_Key). Since only Alice's private key could create this signature, Alice's identity is authenticated." },
          { stepNumber: 5, instruction: "Bob computes his own hash of the received document.", reasoning: "Bob_Hash = SHA256(Document). If Bob_Hash == Decrypted_Hash, the document was not tampered with (integrity confirmed)." }
        ],
        takeawayRule: "Encrypting with a private key creates a digital signature that anyone can verify with the public key, proving identity and data integrity."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing cryptographic hashes can be 'decrypted' back to the original password.", whyItIsWrong: "Hashing is a one-way mathematical function that destroys information (e.g. compressing a 1GB file into 256 bits). It is mathematically impossible to reverse a hash.", correctCorrection: "Passwords are never decrypted; incoming entered passwords are hashed and compared to the stored hash." }
    ],
    guidedPracticePrompt: "Explain how public-key cryptography solves the key distribution problem of symmetric cryptography.",
    summaryRecap: "Symmetric uses one shared key; asymmetric uses public/private key pairs. Hash functions are irreversible one-way fingerprints for integrity."
  },

  "skill-cs-stacks-queues-arrays": {
    id: "les-cs-stacks-queues-arrays",
    title: "Linear Data Structures: Arrays, Linked Lists, Stacks, & Queues",
    hookAndIntuition: "Think of a stack of dinner plates in a cafeteria: you add clean plates to the top and take clean plates from the top (Last In, First Out). Now think of a line of people waiting at a bank ATM: the first person to arrive is the first person served (First In, First Out). These everyday arrangements are stacks and queues.",
    conceptualExplanation: "Data structures organize data in computer memory for efficient access and modification. (1) Arrays store elements in contiguous memory locations, providing instant O(1) random access by index, but costly O(n) insertions and deletions due to element shifting. (2) Linked Lists store nodes containing data and pointers to next nodes; inserting at the head is O(1), but searching requires O(n) sequential traversal. (3) Stacks operate on LIFO (Last In, First Out) discipline with two primary operations: push (adds element to top) and pop (removes and returns top element), both in O(1) time. Stacks manage browser back/forward history, undo/redo buffers, and expression syntax parsing. (4) Queues operate on FIFO (First In, First Out) discipline with enqueue (adds to rear) and dequeue (removes from front), both in O(1) time. Queues manage print spoolers, operating system CPU scheduling, and breadth-first graph traversals.",
    keyTermsAndFormulas: [
      { termOrSymbol: "LIFO vs FIFO", definition: "LIFO: Last In, First Out (Stack); FIFO: First In, First Out (Queue).", practicalExample: "Call stack uses LIFO; printer queue uses FIFO." },
      { termOrSymbol: "Stack: push(), pop(), peek()", definition: "Primary stack primitives operating at O(1) constant time on the top element.", practicalExample: "Browser 'Back' button pops the most recently visited URL from the history stack." },
      { termOrSymbol: "Queue: enqueue(), dequeue()", definition: "Primary queue primitives operating at opposite ends in O(1) time.", practicalExample: "Customer service ticketing system serves requests in strict FIFO enqueue order." }
    ],
    workedExamples: [
      {
        title: "Evaluating Postfix (Reverse Polish Notation) with a Stack",
        problemStatement: "Evaluate the postfix arithmetic expression: 5 3 2 * + 4 - using a stack-based algorithm.",
        steps: [
          { stepNumber: 1, instruction: "Read token '5': Push 5 onto stack.", reasoning: "Stack: [5]." },
          { stepNumber: 2, instruction: "Read token '3': Push 3 onto stack.", reasoning: "Stack: [5, 3]." },
          { stepNumber: 3, instruction: "Read token '2': Push 2 onto stack.", reasoning: "Stack: [5, 3, 2]." },
          { stepNumber: 4, instruction: "Read operator '*': Pop 2 (operand 2) and 3 (operand 1). Compute 3 * 2 = 6. Push 6.", reasoning: "Stack: [5, 6]." },
          { stepNumber: 5, instruction: "Read operator '+': Pop 6 and 5. Compute 5 + 6 = 11. Push 11.", reasoning: "Stack: [11]." },
          { stepNumber: 6, instruction: "Read token '4': Push 4.", reasoning: "Stack: [11, 4]." },
          { stepNumber: 7, instruction: "Read operator '-': Pop 4 and 11. Compute 11 - 4 = 7. Push 7.", reasoning: "Stack: [7]. Final result = 7." }
        ],
        takeawayRule: "When parsing postfix with a stack: operands are pushed; operators pop two operands, compute the result, and push it back."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Popping from an empty stack without checking if it contains elements.", whyItIsWrong: "Attempting to pop or peek from an empty stack causes a fatal Stack Underflow runtime error.", correctCorrection: "Always guard pop operations with an isEmpty() check." }
    ],
    guidedPracticePrompt: "Trace a stack-based algorithm to verify whether a string of parentheses '(()())' is properly balanced.",
    summaryRecap: "Arrays offer O(1) index access. Stacks enforce LIFO (push/pop). Queues enforce FIFO (enqueue/dequeue). Both operate in O(1) time."
  },

  "skill-cs-sql-ddl-dml-normalization": {
    id: "les-cs-sql-ddl-dml-normalization",
    title: "Relational Databases, SQL DDL/DML, & Database Normalization",
    hookAndIntuition: "Imagine storing school records on one massive spreadsheet with 100,000 rows. If a student changes their address, you might have to update 50 different rows—and if you miss one, records become corrupted! Relational databases eliminate this chaos through normalization and structured SQL queries.",
    conceptualExplanation: "A Relational Database Management System (RDBMS) organizes structured data into tables (relations) comprising rows (records/tuples) and columns (attributes). Primary Keys uniquely identify each record in a table. Foreign Keys link records across tables to enforce Referential Integrity. SQL (Structured Query Language) is divided into: (1) DDL (Data Definition Language): CREATE TABLE, ALTER TABLE, DROP TABLE; and (2) DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE. Database Normalization systematically organizes tables to eliminate data redundancy and prevent update, insertion, and deletion anomalies: First Normal Form (1NF): all column values must be atomic (no multi-valued lists), and every table must have a primary key; Second Normal Form (2NF): must be in 1NF and have no partial dependencies (every non-key attribute must depend on the whole primary key); Third Normal Form (3NF): must be in 2NF and have no transitive dependencies (non-key attributes must not depend on other non-key attributes: 'the key, the whole key, and nothing but the key').",
    keyTermsAndFormulas: [
      { termOrSymbol: "SELECT ... FROM ... WHERE ... JOIN ... GROUP BY", definition: "Core SQL query structure for relational data extraction.", practicalExample: "SELECT name, grade FROM students JOIN enrollments ON students.id = enrollments.student_id WHERE grade >= 80;" },
      { termOrSymbol: "Primary Key vs Foreign Key", definition: "Primary key guarantees record uniqueness; foreign key enforces referential relationships between tables.", practicalExample: "student_id in enrollments table points to student_id primary key in students table." },
      { termOrSymbol: "1NF, 2NF, 3NF Normalization", definition: "1NF: Atomic values; 2NF: No partial key dependencies; 3NF: No transitive dependencies.", practicalExample: "Moving student address into a separate student table eliminates duplicating address across 10 enrollment rows." }
    ],
    workedExamples: [
      {
        title: "Normalizing an Unnormalized Order Form Table into 3NF",
        problemStatement: "Given an unnormalized Order table: OrderID, CustomerID, CustomerName, CustomerAddress, ProductID, ProductName, UnitPrice, QuantityOrdered. Decompose this into 3NF relational tables.",
        steps: [
          { stepNumber: 1, instruction: "Achieve 1NF (ensure atomicity and define composite key).", reasoning: "Composite primary key is (OrderID, ProductID). Each cell contains a single value." },
          { stepNumber: 2, instruction: "Achieve 2NF (remove partial dependencies on composite key).", reasoning: "CustomerName and CustomerAddress depend only on OrderID (not ProductID). ProductName and UnitPrice depend only on ProductID. Separate into: Orders, OrderDetails, and Products." },
          { stepNumber: 3, instruction: "Achieve 3NF (remove transitive dependencies: non-key depending on non-key).", reasoning: "In Orders table (OrderID, OrderDate, CustomerID, CustomerName, CustomerAddress), CustomerName depends on CustomerID, not OrderID. Separate Customer info into a dedicated Customers table." },
          { stepNumber: 4, instruction: "Final 3NF schema.", reasoning: "Customers(CustomerID [PK], Name, Address); Products(ProductID [PK], Name, UnitPrice); Orders(OrderID [PK], CustomerID [FK], OrderDate); OrderItems(OrderID [FK], ProductID [FK], Quantity, PRIMARY KEY(OrderID, ProductID))." }
        ],
        takeawayRule: "3NF ensures every non-key attribute depends strictly on the primary key, preventing data anomalies."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Running a DELETE or UPDATE query in SQL without a WHERE clause.", whyItIsWrong: "Executing 'DELETE FROM students;' without a WHERE clause deletes EVERY single record in the entire database table permanently!", correctCorrection: "Always include a precise WHERE clause: 'DELETE FROM students WHERE student_id = 104;'." }
    ],
    guidedPracticePrompt: "Write an SQL query to find the total revenue generated per product from an OrderItems table.",
    summaryRecap: "RDBMS tables use PKs and FKs for integrity. SQL handles DDL and DML. 1NF, 2NF, and 3NF eliminate data redundancy."
  },

  "skill-cs-http-dns-web-protocols": {
    id: "les-cs-http-dns-web-protocols",
    title: "Web Architecture, HTTP/HTTPS Protocols, & DNS Resolution",
    hookAndIntuition: "You type 'google.com' into your browser bar and press Enter. Within 50 milliseconds, a complete web interface appears on your screen. Behind that momentary pause, a global dance of domain name servers, TLS handshakes, and HTTP requests coordinates to deliver the page to your device.",
    conceptualExplanation: "The World Wide Web operates on client-server architecture. When you enter a URL (e.g. https://example.com/api/users): (1) Domain Name System (DNS) Resolution: Computers communicate using numeric IP addresses, not human words. The browser checks local cache, then queries a Recursive DNS Resolver, Root Nameserver (.), TLD Nameserver (.com), and Authoritative Nameserver to resolve 'example.com' to an IP address (e.g. 93.184.216.34). (2) TCP & TLS Handshake: A secure TCP connection is established on port 443 with cryptographic TLS certificate exchange. (3) HTTP (Hypertext Transfer Protocol): The client issues a request (GET, POST, PUT, DELETE) with headers (Content-Type, User-Agent, Authorization). The server returns an HTTP Status Code: 2xx (Success, e.g. 200 OK), 3xx (Redirection, e.g. 301 Moved Permanently), 4xx (Client Error, e.g. 404 Not Found, 401 Unauthorized), or 5xx (Server Error, e.g. 500 Internal Error, 503 Service Unavailable).",
    keyTermsAndFormulas: [
      { termOrSymbol: "DNS (Domain Name System)", definition: "Decentralized hierarchical naming system translating human domains into routable IP addresses.", practicalExample: "Maps 'moos.academy' to 172.67.140.21." },
      { termOrSymbol: "HTTP Methods: GET, POST, PUT, DELETE", definition: "RESTful HTTP request verbs for CRUD operations (Read, Create, Update, Delete).", practicalExample: "GET retrieves profile data; POST creates a new account record." },
      { termOrSymbol: "HTTP Status Code Families", definition: "200 OK (success), 301 (redirect), 400 (bad request), 404 (not found), 500 (server crash).", practicalExample: "404 indicates requested URL path does not exist on the server." }
    ],
    workedExamples: [
      {
        title: "Tracing the End-to-End Journey of a Web Page Request",
        problemStatement: "Detail the exact sequence of technical steps that occur from the moment a user enters 'https://academy.edu' into a browser until the HTML begins rendering.",
        steps: [
          { stepNumber: 1, instruction: "DNS Resolution.", reasoning: "Browser resolves 'academy.edu' into an IPv4 address (e.g. 192.0.2.1) via recursive DNS resolution." },
          { stepNumber: 2, instruction: "TCP Connection & TLS Handshake.", reasoning: "Browser initiates a TCP 3-way handshake on port 443. A TLS handshake follows: server presents its SSL/TLS certificate, client verifies it against trusted Certificate Authorities (CAs), and a symmetric session encryption key is established." },
          { stepNumber: 3, instruction: "HTTP Request Dispatch.", reasoning: "Browser transmits an encrypted HTTP GET request: 'GET / HTTP/1.1\\r\\nHost: academy.edu\\r\\nAccept: text/html'." },
          { stepNumber: 4, instruction: "Server Response & DOM Rendering.", reasoning: "Server processes request and responds with 'HTTP/1.1 200 OK' accompanied by Content-Type: text/html and the HTML payload. Browser parses HTML and begins DOM construction." }
        ],
        takeawayRule: "DNS converts names to IPs; TLS encrypts communication; HTTP transfers resource representations."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing HTTP and the Internet are the exact same thing.", whyItIsWrong: "The Internet is the massive global physical network infrastructure (cables, routers, packets). The Web (HTTP) is merely one of many applications running on top of the Internet (alongside email, BitTorrent, SSH, gaming).", correctCorrection: "The Internet is the global network highway; the Web (HTTP) is the traffic driving on that highway." }
    ],
    guidedPracticePrompt: "What is the key difference between HTTP and HTTPS, and on which default port does each operate?",
    summaryRecap: "DNS maps domains to IPs. Client-server communication uses HTTP methods (GET, POST). Status codes report outcomes (200, 404, 500)."
  },

  "skill-cs-sdlc-waterfall-agile-testing": {
    id: "les-cs-sdlc-waterfall-agile-testing",
    title: "Software Engineering, SDLC Methodologies, & Software Testing",
    hookAndIntuition: "Imagine building a passenger jet without writing down specifications, testing individual engine parts, or verifying wing stress tolerance—disaster is guaranteed! Professional software engineering applies rigorous engineering discipline to ensure complex computer programs work reliably without catastrophic crashes.",
    conceptualExplanation: "The Software Development Life Cycle (SDLC) encompasses structured phases: (1) Requirements Analysis, (2) Architectural Design, (3) Implementation (Coding), (4) Testing, (5) Deployment, and (6) Maintenance. Methodologies include: Waterfall (rigid linear-sequential model where each phase must finish before the next begins; best for fixed, well-understood safety-critical systems) and Agile / Scrum (iterative, incremental development working in short 1-4 week sprints, prioritizing customer collaboration and adapting to changing requirements). Software Testing verifies system correctness: Unit Testing (tests individual isolated functions), Integration Testing (verifies modules work together), System Testing (tests entire application end-to-end), and Acceptance Testing (UAT, verifies user business requirements). Testing approaches include Black-Box (testing functionality without knowing internal source code) and White-Box (testing internal code branches and paths).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Waterfall vs Agile", definition: "Waterfall = sequential, fixed plan; Agile = iterative, collaborative, adaptive sprints.", practicalExample: "Avionics flight controllers use Waterfall; consumer web apps use Agile Scrum." },
      { termOrSymbol: "Unit Testing & TDD (Test-Driven Development)", definition: "Writing automated test assertions before writing production code (Red -> Green -> Refactor).", practicalExample: "assert(add(2, 3) === 5) verifies adder function correctness automatically." },
      { termOrSymbol: "Boundary Value Analysis (BVA)", definition: "Black-box test design technique testing values at boundaries of input equivalence partitions.", practicalExample: "If valid age is 18-65: test boundary values 17, 18, 19, 64, 65, 66." }
    ],
    workedExamples: [
      {
        title: "Designing Boundary Value Test Cases for an Age Validation System",
        problemStatement: "A banking mobile app requires users to be between 18 and 65 years old inclusive to apply for a loan. Apply Boundary Value Analysis (BVA) to specify all critical test input values and their expected outcomes.",
        steps: [
          { stepNumber: 1, instruction: "Identify the valid equivalence partition and boundary points.", reasoning: "Valid partition: [18, 65]. Lower boundary = 18; Upper boundary = 65." },
          { stepNumber: 2, instruction: "Select three values around the lower boundary (Min - 1, Min, Min + 1).", reasoning: "Test 17 (Invalid, expect Reject); Test 18 (Valid boundary, expect Accept); Test 19 (Valid, expect Accept)." },
          { stepNumber: 3, instruction: "Select three values around the upper boundary (Max - 1, Max, Max + 1).", reasoning: "Test 64 (Valid, expect Accept); Test 65 (Valid boundary, expect Accept); Test 66 (Invalid, expect Reject)." },
          { stepNumber: 4, instruction: "Include extreme edge test cases.", reasoning: "Test 0 and negative value -1 (Invalid); Test extreme value 150 (Invalid)." }
        ],
        takeawayRule: "BVA catches off-by-one errors (> vs >=), where the vast majority of software bugs reside."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking software testing can prove that a program has zero bugs.", whyItIsWrong: "As computer scientist Edsger Dijkstra famously stated: 'Testing can show the presence of bugs, but never their absence.' Even 100% test pass rates cannot test infinite input combinations.", correctCorrection: "Testing proves the presence of defects and increases confidence; it can never guarantee 100% absence of unknown bugs." }
    ],
    guidedPracticePrompt: "Contrast black-box testing with white-box testing, giving one practical example of each.",
    summaryRecap: "SDLC structures software creation. Waterfall is linear; Agile is iterative. Automated unit and boundary testing ensure reliability."
  },

  "skill-cs-process-scheduling-memory-management": {
    id: "les-cs-process-scheduling-memory-management",
    title: "Operating Systems, CPU Scheduling, & Virtual Memory Management",
    hookAndIntuition: "Right now, your laptop is playing music, downloading a file, running a browser with 20 tabs, and scanning for malware simultaneously on a CPU with only a few physical cores. How does the computer create the illusion of infinite simultaneous activity? The Operating System: the master coordinator of all hardware resources.",
    conceptualExplanation: "The Operating System (OS) is the system software managing hardware resources and providing services to applications. A Process is a program in execution (stored in memory with code, data, heap, and stack). The OS schedules processes using algorithms: First-Come-First-Served (FCFS, non-preemptive), Shortest Job First (SJF, minimizes average wait time), Priority Scheduling, and Round Robin (RR: preemptive, assigns each process a fixed time slice / quantum, ideal for interactive multitasking). Deadlock occurs when processes are permanently blocked waiting for resources held by each other (characterized by Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait). Virtual Memory provides each process with the illusion of a vast, contiguous private address space by dividing memory into fixed-size Pages. The Memory Management Unit (MMU) uses Page Tables to translate virtual addresses into physical RAM Frames. When a process accesses a page not currently in RAM, a Page Fault occurs, triggering OS retrieval of the page from disk swap space.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Round Robin CPU Scheduling (Time Quantum q)", definition: "Preemptive algorithm distributing CPU time slices cyclically among active ready processes.", practicalExample: "If quantum q = 10ms, process runs for 10ms then yields CPU to the next ready process." },
      { termOrSymbol: "Virtual Memory & Paging", definition: "Mapping virtual process pages to physical RAM frames via MMU page tables.", practicalExample: "Enables running an 8GB video editing application on a system with only 4GB of physical RAM." },
      { termOrSymbol: "Deadlock (Coffman Conditions)", definition: "Permanent freeze when processes circular-wait for resources held by each other.", practicalExample: "Process A holds Printer, waits for Scanner; Process B holds Scanner, waits for Printer." }
    ],
    workedExamples: [
      {
        title: "Calculating Average Waiting Time for Round Robin Scheduling",
        problemStatement: "Three processes arrive at time 0 with burst times: P1 = 24 ms, P2 = 3 ms, P3 = 3 ms. Using Round Robin scheduling with a time quantum q = 4 ms, construct the Gantt chart and compute the average waiting time.",
        steps: [
          { stepNumber: 1, instruction: "Construct the execution timeline (Gantt chart).", reasoning: "Time 0-4: P1 runs for 4 ms (remaining: 20 ms). Time 4-7: P2 runs for 3 ms and finishes. Time 7-10: P3 runs for 3 ms and finishes. Time 10-30: P1 runs to completion in remaining quanta." },
          { stepNumber: 2, instruction: "Calculate completion time for each process.", reasoning: "P1 finishes at t = 30 ms. P2 finishes at t = 7 ms. P3 finishes at t = 10 ms." },
          { stepNumber: 3, instruction: "Calculate waiting time: Waiting Time = Completion Time - Arrival Time - Burst Time.", reasoning: "P1: 30 - 0 - 24 = 6 ms. P2: 7 - 0 - 3 = 4 ms. P3: 10 - 0 - 3 = 7 ms." },
          { stepNumber: 4, instruction: "Compute average waiting time.", reasoning: "Average Wait = (6 + 4 + 7) / 3 = 17 / 3 = 5.67 ms." }
        ],
        takeawayRule: "Round Robin prevents process starvation by guaranteeing every process receives CPU time within one quantum cycle."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking virtual memory makes a computer run faster than having real physical RAM.", whyItIsWrong: "Disk/SSD access is thousands of times slower than physical RAM. Excessive virtual memory paging (thrashing) causes severe system slowdowns.", correctCorrection: "Virtual memory prevents out-of-memory crashes; physical RAM provides true execution speed." }
    ],
    guidedPracticePrompt: "Name the four Coffman conditions necessary for a system deadlock to occur.",
    summaryRecap: "OS manages CPU scheduling (Round Robin, SJF) and memory. Virtual memory maps pages to physical frames. Deadlock involves circular waiting."
  },

  "skill-cs-machine-learning-ai-ethics": {
    id: "les-cs-machine-learning-ai-ethics",
    title: "Artificial Intelligence, Machine Learning Paradigms, & Algorithmic Ethics",
    hookAndIntuition: "How does a self-driving car recognize a pedestrian in the dark? How does a medical AI diagnose skin cancer from a photo with greater accuracy than human dermatologists? Instead of a programmer writing millions of manual rules, machine learning algorithms learn directly from patterns in data.",
    conceptualExplanation: "Artificial Intelligence (AI) is the broad discipline of engineering intelligent systems that perform tasks requiring human-like cognitive abilities. Machine Learning (ML) is a subset of AI where systems automatically improve performance through data experience. The three primary ML paradigms are: (1) Supervised Learning: algorithm trains on labeled data (inputs paired with known ground-truth targets) for classification (e.g. spam detection) or regression (e.g. predicting house prices); (2) Unsupervised Learning: algorithm uncovers hidden clusters or patterns in unlabeled data (e.g. customer segmentation); and (3) Reinforcement Learning: an agent learns optimal decision policies through trial-and-error interaction with an environment to maximize cumulative reward (e.g. AlphaGo, robot navigation). Deep Learning utilizes multi-layered Artificial Neural Networks with backpropagation to extract abstract hierarchical representations. Algorithmic Ethics investigates crucial real-world dilemmas: algorithmic bias (models perpetuating historical prejudices present in training datasets), transparency and explainability ('black box' decisions in criminal justice and lending), data privacy, deepfakes, and societal job displacement.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Supervised vs Unsupervised vs Reinforcement", definition: "Supervised = labeled training; Unsupervised = finding patterns in unlabeled data; Reinforcement = trial-and-error reward optimization.", practicalExample: "Predicting exam score is supervised; grouping shoppers is unsupervised; playing chess is reinforcement." },
      { termOrSymbol: "Overfitting vs Underfitting", definition: "Overfitting = model memorizes training noise and fails on new data; Underfitting = model is too simple to capture patterns.", practicalExample: "Regularization and cross-validation prevent overfitting." },
      { termOrSymbol: "Algorithmic Bias & Fairness", definition: "Systematic discrimination in model predictions caused by biased training datasets or flawed objective metrics.", practicalExample: "Facial recognition systems exhibiting higher error rates on darker skin tones due to non-diverse training data." }
    ],
    workedExamples: [
      {
        title: "Evaluating a Medical AI Classifier Using a Confusion Matrix",
        problemStatement: "An AI model tested on 1,000 patients for malaria diagnosis produces: True Positives (TP) = 90, False Positives (FP) = 30, True Negatives (TN) = 850, False Negatives (FN) = 10. Calculate: (a) Accuracy, (b) Precision, (c) Recall (Sensitivity). Explain which metric is most vital for a medical diagnostic tool.",
        steps: [
          { stepNumber: 1, instruction: "Calculate Accuracy = (TP + TN) / Total.", reasoning: "Accuracy = (90 + 850) / 1000 = 940 / 1000 = 94.0%." },
          { stepNumber: 2, instruction: "Calculate Precision = TP / (TP + FP).", reasoning: "Precision = 90 / (90 + 30) = 90 / 120 = 75.0% (fraction of predicted positives that are actually positive)." },
          { stepNumber: 3, instruction: "Calculate Recall = TP / (TP + FN).", reasoning: "Recall = 90 / (90 + 10) = 90 / 100 = 90.0% (fraction of actual sick patients correctly detected)." },
          { stepNumber: 4, instruction: "Evaluate clinical importance.", reasoning: "In medical diagnosis, Recall is paramount: a False Negative means a sick patient is sent home untreated, potentially proving fatal, whereas a False Positive only requires a secondary confirmatory test." }
        ],
        takeawayRule: "In medical and safety-critical AI, High Recall (minimizing False Negatives) is far more crucial than raw overall accuracy."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Believing high training accuracy (e.g. 99%) guarantees an AI model will perform well in the real world.", whyItIsWrong: "If a model overfits, it has simply memorized the training examples. When deployed on unseen real-world data, accuracy can collapse disastrously.", correctCorrection: "Always evaluate models on unseen Test validation sets, not the data used during training." }
    ],
    guidedPracticePrompt: "Why can a model with 95% accuracy still be completely useless on a severely imbalanced dataset?",
    summaryRecap: "Supervised learning uses labeled data; unsupervised finds clusters; reinforcement learns via rewards. In clinical AI, recall minimizes dangerous false negatives."
  }
};
