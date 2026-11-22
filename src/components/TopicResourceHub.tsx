import React, { useState } from "react";
import {
  BookOpen,
  Film,
  FileText,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Award,
  Zap,
  Bot,
  Download,
  Printer,
  Compass,
  Code,
  Flame,
  Search,
  ExternalLink,
  ChevronRight,
  Headphones,
  QrCode,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { Unit, Skill } from "../types/curriculum";
import { TopicResourceItem, TopicResourceChannelType } from "../types/smartBoardMasterclass";

export interface TopicResourceHubProps {
  unit: Unit;
  skill?: Skill;
  onOpenMasterclass?: () => void;
  onOpenLessonNote?: () => void;
  onLaunchPractice?: (skillId: string) => void;
  onOpenAITutorWithContext?: (topic: string, prompt: string) => void;
  onOpenFlashcards?: () => void;
  onOpenQuiz?: () => void;
}

export const TopicResourceHub: React.FC<TopicResourceHubProps> = ({
  unit,
  skill,
  onOpenMasterclass,
  onOpenLessonNote,
  onLaunchPractice,
  onOpenAITutorWithContext,
  onOpenFlashcards,
  onOpenQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalResource, setActiveModalResource] = useState<TopicResourceItem | null>(null);

  const topicName = skill ? skill.title : unit.title;

  // Complete 26-Resource Catalog defined strictly for this topic
  const allResources: TopicResourceItem[] = [
    // Pillar 1: Interactive Teaching & Media
    {
      id: "res-masterclass",
      type: "smart_board_masterclass",
      title: "Smart Board Masterclass",
      description: "Dual-script synchronized digital smart board masterclass with progressive equations, diagrams, and in-lesson checkpoints.",
      category: "teaching_media",
      badge: "Flagship",
      isAvailable: true,
      actionLabel: "Launch Masterclass"
    },
    {
      id: "res-audio",
      type: "audio_explanation",
      title: "Audio Explanation & Voiceover",
      description: "Voice-narrated conceptual explanation optimized for listening during transit and low-bandwidth revision.",
      category: "teaching_media",
      badge: "Speech Synthesized",
      isAvailable: true,
      actionLabel: "Listen to Audio"
    },
    {
      id: "res-transcript",
      type: "transcript",
      title: "Full Masterclass Transcript",
      description: "Timestamped verbatim dialogue transcript with key invariant tags and clickable jump points.",
      category: "teaching_media",
      isAvailable: true,
      actionLabel: "View Transcript"
    },
    {
      id: "res-interactive-viz",
      type: "interactive_visualizations",
      title: "Interactive Visual Canvas",
      description: "Subject-specific responsive 2D/SVG canvas simulating vectors, molecular shifts, or syntax parse trees.",
      category: "teaching_media",
      badge: "Interactive",
      isAvailable: true,
      actionLabel: "Open Canvas"
    },
    {
      id: "res-simulation",
      type: "simulations",
      title: "Pedagogical Simulation Lab",
      description: "Manipulate physical variables, reaction temperatures, or algorithm inputs to observe live outcomes.",
      category: "teaching_media",
      isAvailable: true,
      actionLabel: "Launch Lab"
    },
    {
      id: "res-qr-companion",
      type: "qr_companion",
      title: "QR Physical Textbook Companion",
      description: "Scan the textbook chapter barcode or QR code to immediately synchronize this digital topic in 1 second.",
      category: "teaching_media",
      badge: "Print-to-Digital",
      isAvailable: true,
      actionLabel: "View QR Code"
    },
    {
      id: "res-ask-tutor",
      type: "ask_tutor_moos",
      title: "Ask Tutor Moos (Socratic AI)",
      description: "Personalized AI conversational tutor answering doubts with step-by-step guidance in standard academic notation.",
      category: "teaching_media",
      badge: "24/7 Socratic",
      isAvailable: true,
      actionLabel: "Ask Question"
    },

    // Pillar 2: Core Instruction & Lesson Notes
    {
      id: "res-lesson-notes",
      type: "lesson_notes",
      title: "Required Lesson Notes",
      description: "Structured pedagogical lesson note aligned with national curriculum guidelines, objectives, and whiteboard summaries.",
      category: "core_instruction",
      badge: "Curriculum Standard",
      isAvailable: true,
      actionLabel: "Open Notes"
    },
    {
      id: "res-concept-explanation",
      type: "concept_explanation",
      title: "In-Depth Concept Explanation",
      description: "Expository breakdown of fundamental principles, historical context, and foundational intuition.",
      category: "core_instruction",
      isAvailable: true,
      actionLabel: "Read Explanation"
    },
    {
      id: "res-study-guide",
      type: "study_guide",
      title: "Comprehensive Study Guide",
      description: "Consolidated topic dossier with chapter outlines, glossary of terms, and memory anchors.",
      category: "core_instruction",
      isAvailable: true,
      actionLabel: "Open Guide"
    },
    {
      id: "res-textbook-resource",
      type: "textbook_resource",
      title: "Textbook Chapter & Anchor",
      description: "Published textbook chapter mapping with verified citations and curriculum standard alignment.",
      category: "core_instruction",
      isAvailable: true,
      actionLabel: "Open Reader"
    },
    {
      id: "res-printable-worksheet",
      type: "printable_worksheet",
      title: "Printable Student Worksheet",
      description: "A4 printable PDF-format worksheet with formatted header, question space, and teacher grading rubric.",
      category: "core_instruction",
      badge: "Print / PDF",
      isAvailable: true,
      actionLabel: "Print Worksheet"
    },

    // Pillar 3: Worked Examples & Solutions
    {
      id: "res-worked-examples",
      type: "worked_examples",
      title: "Annotated Worked Examples",
      description: "Sample problems with clear problem statements, given parameters, and complete mathematical or analytical reasoning.",
      category: "examples_solutions",
      badge: "High Yield",
      isAvailable: true,
      actionLabel: "View Examples"
    },
    {
      id: "res-step-by-step",
      type: "step_by_step_solutions",
      title: "Step-by-Step Solutions",
      description: "Complete algebraic and scientific derivations with zero skipped lines of working.",
      category: "examples_solutions",
      isAvailable: true,
      actionLabel: "View Working"
    },
    {
      id: "res-hint-ladder",
      type: "hint_ladder",
      title: "Socratic Hint Ladder (3-Tier)",
      description: "Scaffolded assistance: Level 1 Conceptual Direction, Level 2 Formula Selection, Level 3 Calculation Guidance.",
      category: "examples_solutions",
      isAvailable: true,
      actionLabel: "Inspect Ladder"
    },
    {
      id: "res-misconception-alerts",
      type: "misconception_alerts",
      title: "Misconception Alerts",
      description: "Empirical list of common student fallacies with explicit contrast between the mistaken thought and the correct principle.",
      category: "examples_solutions",
      badge: "Crucial",
      isAvailable: true,
      actionLabel: "Review Alerts"
    },
    {
      id: "res-exam-traps",
      type: "exam_traps",
      title: "WAEC / JAMB Exam Traps",
      description: "Classic distractor patterns and trick questions utilized in standardized matriculation examinations.",
      category: "examples_solutions",
      badge: "Exam Specific",
      isAvailable: true,
      actionLabel: "Analyze Traps"
    },

    // Pillar 4: Practice & Mastery Testing
    {
      id: "res-guided-practice",
      type: "guided_practice",
      title: "Guided Practice Session",
      description: "Interactive exercises with real-time feedback and immediate hints after each attempt.",
      category: "practice_mastery",
      isAvailable: true,
      actionLabel: "Start Practice"
    },
    {
      id: "res-independent-practice",
      type: "independent_practice",
      title: "Independent Practice Arena",
      description: "Solo testing environment without prompts to verify autonomous problem-solving capabilities.",
      category: "practice_mastery",
      isAvailable: true,
      actionLabel: "Enter Arena"
    },
    {
      id: "res-active-flashcards",
      type: "active_recall_flashcards",
      title: "Active Recall Flashcards",
      description: "Spaced repetition flashcards targeting key formulas, definitions, and SI units with Leitner scheduling.",
      category: "practice_mastery",
      badge: "Spaced Repetition",
      isAvailable: true,
      actionLabel: "Study Flashcards"
    },
    {
      id: "res-diagnostic-questions",
      type: "diagnostic_questions",
      title: "Diagnostic Checkpoint Quiz",
      description: "Brief 5-question test specifically calibrated to isolate knowledge gaps before exam season.",
      category: "practice_mastery",
      isAvailable: true,
      actionLabel: "Take Diagnostic"
    },
    {
      id: "res-topic-quiz",
      type: "topic_quiz",
      title: "Comprehensive Topic Quiz",
      description: "Timed multiple-choice and structured response evaluation matching standardized exam timing.",
      category: "practice_mastery",
      isAvailable: true,
      actionLabel: "Start Quiz"
    },
    {
      id: "res-mastery-assessment",
      type: "mastery_assessment",
      title: "Final Mastery Assessment",
      description: "High-stakes summative assessment required to attain Mastered status and unlock credential badges.",
      category: "practice_mastery",
      badge: "Certification",
      isAvailable: true,
      actionLabel: "Attempt Assessment"
    },

    // Pillar 5: Applied & Differentiated Learning
    {
      id: "res-cognitive-activities",
      type: "cognitive_activities",
      title: "Cognitive Problem-Solving Tasks",
      description: "Non-routine puzzles and higher-order Bloom's taxonomy challenges requiring synthesis.",
      category: "applied_differentiation",
      isAvailable: true,
      actionLabel: "Explore Tasks"
    },
    {
      id: "res-real-world",
      type: "real_world_applications",
      title: "Real-World Engineering & Industrial Applications",
      description: "Concrete case studies demonstrating how this topic powers African and global infrastructure and tech.",
      category: "applied_differentiation",
      badge: "Industry Connected",
      isAvailable: true,
      actionLabel: "View Case Studies"
    },
    {
      id: "res-projects",
      type: "projects",
      title: "Hands-on Student Projects",
      description: "Capstone lab or software activity applying this topic to produce a tangible artifact or prototype.",
      category: "applied_differentiation",
      isAvailable: true,
      actionLabel: "Project Brief"
    },
    {
      id: "res-extension",
      type: "extension_challenge",
      title: "Extension Challenge (Olympiad Level)",
      description: "University preparation and Science Olympiad problems for high-performing learners seeking distinction.",
      category: "applied_differentiation",
      badge: "Advanced",
      isAvailable: true,
      actionLabel: "Challenge Mode"
    },
    {
      id: "res-remedial",
      type: "remedial_activity",
      title: "Remedial Reinforcement Pathway",
      description: "Simplified foundational drills and visual analogies for learners struggling with prerequisites.",
      category: "applied_differentiation",
      badge: "Support",
      isAvailable: true,
      actionLabel: "Open Remedial"
    },
    {
      id: "res-revision-summary",
      type: "revision_summary",
      title: "Quick Revision Summary Sheet",
      description: "One-page bulleted cheat sheet with all essential formulas, diagrams, and rules for rapid review.",
      category: "applied_differentiation",
      isAvailable: true,
      actionLabel: "Open Summary"
    }
  ];

  // Filtering
  const filtered = allResources.filter((r) => {
    if (selectedCategory !== "all" && r.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAction = (resource: TopicResourceItem) => {
    switch (resource.type) {
      case "smart_board_masterclass":
        if (onOpenMasterclass) onOpenMasterclass();
        break;
      case "lesson_notes":
        if (onOpenLessonNote) onOpenLessonNote();
        break;
      case "guided_practice":
      case "independent_practice":
        if (onLaunchPractice) onLaunchPractice(skill ? skill.id : unit.skills[0]?.id || "");
        break;
      case "active_recall_flashcards":
        if (onOpenFlashcards) onOpenFlashcards();
        else setActiveModalResource(resource);
        break;
      case "topic_quiz":
      case "diagnostic_questions":
      case "mastery_assessment":
        if (onOpenQuiz) onOpenQuiz();
        else setActiveModalResource(resource);
        break;
      case "ask_tutor_moos":
        if (onOpenAITutorWithContext) {
          onOpenAITutorWithContext(topicName, `Hi Tutor Moos! Could you guide me through ${topicName}?`);
        }
        break;
      default:
        setActiveModalResource(resource);
        break;
    }
  };

  const categories = [
    { id: "all", label: `All Materials (${allResources.length})` },
    { id: "teaching_media", label: "Interactive & Media (7)" },
    { id: "core_instruction", label: "Instruction & Notes (5)" },
    { id: "examples_solutions", label: "Worked Solutions & Traps (5)" },
    { id: "practice_mastery", label: "Practice & Mastery (6)" },
    { id: "applied_differentiation", label: "Applied & Extension (6)" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>TOPIC LEARNING RESOURCE HUB • 26 INSTRUCTIONAL CHANNELS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {topicName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Complete curriculum saturation: from interactive digital smart board masterclasses and lesson notes to worked examples, active recall flashcards, and exam traps.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenMasterclass && (
            <button
              type="button"
              onClick={onOpenMasterclass}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>Smart Board Masterclass</span>
            </button>
          )}

          {onOpenLessonNote && (
            <button
              type="button"
              onClick={onOpenLessonNote}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lesson Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => (
          <div
            key={resource.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition">
                  {resource.title}
                </h3>
                {resource.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {resource.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {resource.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAction(resource)}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold text-xs transition cursor-pointer flex items-center justify-between"
            >
              <span>{resource.actionLabel}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Detail Modal for Selected Resource */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400">
                  {activeModalResource.category.replace(/_/g, " ").toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeModalResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalResource(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalResource.description}
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300 block">Topic Alignment:</span>
                <p className="text-xs text-slate-400">
                  Unit: <strong>{unit.title}</strong> ({unit.code})<br />
                  Subject: <strong>{unit.subjectId}</strong> • Level: <strong>{unit.level}</strong>
                </p>
              </div>

              {/* Sample Content Demonstration */}
              {activeModalResource.type === "printable_worksheet" && (
                <div className="bg-white text-slate-900 p-4 rounded-xl text-xs space-y-2 font-mono">
                  <div className="font-bold border-b pb-1 text-center">
                    MOOS Academy — Official Student Worksheet
                  </div>
                  <div>Topic: {topicName} | Student Name: ______________</div>
                  <div>Date: ___________ | Score: _____ / 20</div>
                  <div className="pt-2 text-slate-600">
                    [1] State the fundamental invariant governing {topicName}.
                  </div>
                  <div className="h-10 border-b border-dashed border-slate-400"></div>
                </div>
              )}

              {activeModalResource.type === "exam_traps" && (
                <div className="bg-rose-950/50 border border-rose-800/60 p-3.5 rounded-xl text-xs text-rose-200 space-y-1.5">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Examination Distractor Trap:
                  </span>
                  <p>
                    Examiners frequently introduce negative signs in the denominator or omit boundary condition checks. Ensure all equations are derived from first principles before selecting multiple-choice answers.
                  </p>
                </div>
              )}

              {activeModalResource.type === "hint_ladder" && (
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    <strong>Tier 1 (Conceptual):</strong> Identify the fundamental conservation law or definition involved.
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    <strong>Tier 2 (Formula):</strong> Select the exact formula relating the known variables to the unknown target.
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    <strong>Tier 3 (Execution):</strong> Check sign conventions and verify that SI units match.
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveModalResource(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
