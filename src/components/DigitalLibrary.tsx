import React, { useState } from "react";
import {
  BookOpen,
  Search,
  ChevronRight,
  ExternalLink,
  Sparkles,
  FileText,
  Binary,
  Compass,
  Variable,
  Activity,
  Layers
} from "lucide-react";

export const DigitalLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const referenceCards = [
    {
      id: "ref-quad",
      category: "algebra",
      title: "The Quadratic Formula & Discriminant Analysis",
      formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      summary: "Used for solving any equation of the form ax² + bx + c = 0. The discriminant Δ = b² - 4ac dictates whether roots are real & distinct (Δ > 0), repeated (Δ = 0), or non-real/complex (Δ < 0).",
      examples: [
        "x² - 5x + 6 = 0 => (x - 2)(x - 3) = 0 => x = 2, 3",
        "2x² + 4x - 6 = 0 => 2(x² + 2x - 3) = 0 => x = 1, -3"
      ],
      examRelevance: "WAEC WASSCE Paper 1 & 2 • JAMB UTME Core"
    },
    {
      id: "ref-trig",
      category: "trigonometry",
      title: "Sine & Cosine Rules for Arbitrary Triangles",
      formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} \\quad | \\quad a^2 = b^2 + c^2 - 2bc\\cos A",
      summary: "Essential for surveying, navigational bearings, and physics vectors where right-angle trigonometric properties alone are insufficient.",
      examples: [
        "Area of Triangle = ½ ab sin C",
        "Bearings: Always measured clockwise from True North (000° to 360°)"
      ],
      examRelevance: "WAEC Section B Compulsory • IGCSE Extended Math"
    },
    {
      id: "ref-calc",
      category: "calculus",
      title: "Fundamental Rules of Differentiation",
      formula: "\\frac{d}{dx}[x^n] = n x^{n-1} \\quad | \\quad \\frac{d}{dx}[uv] = u \\frac{dv}{dx} + v \\frac{du}{dx}",
      summary: "Calculates instantaneous rate of change, curve tangents, stationary points, inflection points, and kinematic velocity.",
      examples: [
        "d/dx [5x³ - 2x + 8] = 15x² - 2",
        "d/dx [sin(x)] = cos(x)"
      ],
      examRelevance: "JAMB UTME Calculus Section • University STEM Foundation"
    },
    {
      id: "ref-log",
      category: "algebra",
      title: "Laws of Logarithms & Exponential Relations",
      formula: "\\log_b(xy) = \\log_b x + \\log_b y \\quad | \\quad \\log_b(x^k) = k \\log_b x",
      summary: "Converts non-linear multiplicative power relationships into manageable additive arithmetic scales.",
      examples: [
        "log₁₀(100) = 2 because 10² = 100",
        "Change of base: log_b(a) = log_c(a) / log_c(b)"
      ],
      examRelevance: "WAEC Paper 1 No-Calculator Drills"
    }
  ];

  const filtered = referenceCards.filter((card) => {
    const matchesCat = activeCategory === "all" || card.category === activeCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="digital-library-view" className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 text-white p-7 shadow-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              MOOS Academy Digital Library
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-1">Mathematical Formula Codex & Concept Atlas</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Authentic reference breakdowns, worked theorems, and examination syllabus mappings.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search formulas & theorems..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["all", "algebra", "trigonometry", "calculus"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl px-4 py-1.5 text-xs font-bold capitalize transition ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reference Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:border-indigo-300 transition"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                {card.category}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {card.examRelevance}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">{card.title}</h3>

            {/* Formula display */}
            <div className="rounded-xl bg-slate-900 py-3 px-4 text-center">
              <div className="font-mono text-sm font-bold text-amber-300 tracking-wide">
                {card.formula}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{card.summary}</p>

            {/* Worked Examples */}
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Core Applications & Models:
              </div>
              <ul className="space-y-1 text-xs text-slate-600 font-mono">
                {card.examples.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
