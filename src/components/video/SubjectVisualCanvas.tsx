import React from "react";
import { VideoStoryboardScene, SubjectVisualEngineType } from "../../types/videoLearning";
import { MathFormula } from "./MathFormula";

interface SubjectVisualCanvasProps {
  scene?: VideoStoryboardScene;
  currentTimeSeconds: number;
  engineType: SubjectVisualEngineType;
}

export const SubjectVisualCanvas: React.FC<SubjectVisualCanvasProps> = ({
  scene,
  currentTimeSeconds,
  engineType
}) => {
  if (!scene) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
        Ready to stream instructional visual feed...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[320px] max-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4 select-none shadow-inner">
      {/* Top HUD: Pedagogical Phase & Time Indicator */}
      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 uppercase tracking-wider text-[10px]">
            Phase: {scene.pedagogicalPhase.replace(/_/g, " ")}
          </span>
          <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
            {scene.timeRange}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-mono font-medium text-[11px]">
            Visual Engine Active
          </span>
        </div>
      </div>

      {/* Main Dynamic Stage Rendered by Subject Type */}
      <div className="flex-1 flex items-center justify-center my-3 overflow-hidden relative">
        {engineType === "math_geometric_algebraic" && (
          <MathGeometricStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "physics_kinematic_vectors" && (
          <PhysicsKinematicStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "chemistry_molecular_reaction" && (
          <ChemistryMolecularStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "biology_cellular_system" && (
          <BiologyCellularStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "english_syntax_tree" && (
          <EnglishSyntaxStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "compsci_algorithm_visualizer" && (
          <CompsciAlgorithmStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "engineering_technical_schematic" && (
          <EngineeringSchematicStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType === "economics_market_equilibrium" && (
          <EconomicsMarketStage scene={scene} currentTime={currentTimeSeconds} />
        )}

        {engineType !== "math_geometric_algebraic" &&
          engineType !== "physics_kinematic_vectors" &&
          engineType !== "chemistry_molecular_reaction" &&
          engineType !== "biology_cellular_system" &&
          engineType !== "english_syntax_tree" &&
          engineType !== "compsci_algorithm_visualizer" &&
          engineType !== "engineering_technical_schematic" &&
          engineType !== "economics_market_equilibrium" && (
            <GeneralPedagogicalStage scene={scene} />
          )}
      </div>

      {/* Bottom HUD: Key Takeaway Banner */}
      <div className="bg-slate-900/95 rounded-lg p-2.5 border border-slate-800 z-10">
        <div className="flex items-start gap-2">
          <span className="text-amber-400 font-bold text-xs mt-0.5">INVARIANT:</span>
          <p className="text-slate-200 text-xs leading-relaxed font-medium">
            {scene.keyTakeaway}
          </p>
        </div>
      </div>
    </div>
  );
};

// 1. Mathematics Stage
const MathGeometricStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = ({ scene }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <svg viewBox="-5 -5 10 10" className="w-full max-w-[340px] h-[180px] overflow-visible">
        {/* Grid lines */}
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#334155" strokeWidth="0.1" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#334155" strokeWidth="0.1" />
        {/* Tick marks */}
        {[-4, -3, -2, -1, 1, 2, 3, 4].map((t) => (
          <line key={t} x1={t} y1="-0.15" x2={t} y2="0.15" stroke="#475569" strokeWidth="0.08" />
        ))}
        {/* Parabola curve y = 0.8(x+3)(x+0.5) */}
        <path
          d="M -4.2 3.8 Q -1.75 -3.2 0.7 3.8"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.25"
          strokeLinecap="round"
        />
        {/* Intercept Roots */}
        <circle cx="-3" cy="0" r="0.25" fill="#f43f5e" className="animate-pulse" />
        <text x="-3" y="-0.5" fill="#f43f5e" fontSize="0.5" textAnchor="middle" fontWeight="bold">
          Root: x = -3
        </text>
        <circle cx="-0.5" cy="0" r="0.25" fill="#f43f5e" className="animate-pulse" />
        <text x="-0.5" y="-0.5" fill="#f43f5e" fontSize="0.5" textAnchor="middle" fontWeight="bold">
          Root: x = -0.5
        </text>
        {/* Vertex */}
        <circle cx="-1.75" cy="-2.5" r="0.2" fill="#eab308" />
        <text x="-1.75" y="-2.8" fill="#eab308" fontSize="0.4" textAnchor="middle">
          Vertex (-1.75, -3.12)
        </text>
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-1.5 text-xs">
        <MathFormula tex="f(x) = 2x^2 + 7x + 3 = 0" color="cyan" />
        <span className="text-slate-500">•</span>
        <MathFormula tex="\mathbf{x \in \{-3, -0.5\}}" color="amber" />
      </div>
    </div>
  );
};

// 2. Physics Stage
const PhysicsKinematicStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = ({ scene }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <svg viewBox="0 0 100 50" className="w-full max-w-[340px] h-[170px] overflow-visible">
        {/* Ground */}
        <line x1="5" y1="45" x2="95" y2="45" stroke="#334155" strokeWidth="1" />
        {/* Parabolic Trajectory */}
        <path
          d="M 10 45 Q 50 5 90 45"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        {/* Launch Point */}
        <circle cx="10" cy="45" r="1.5" fill="#f43f5e" />
        {/* Launch Vector u */}
        <line x1="10" y1="45" x2="25" y2="25" stroke="#f43f5e" strokeWidth="1.2" />
        <text x="26" y="23" fill="#f43f5e" fontSize="3" fontWeight="bold">u = 40 m/s</text>
        {/* Resolved ux */}
        <line x1="10" y1="45" x2="25" y2="45" stroke="#38bdf8" strokeWidth="1" />
        <text x="17" y="49" fill="#38bdf8" fontSize="2.5">ux = u cos θ</text>
        {/* Resolved uy */}
        <line x1="10" y1="45" x2="10" y2="25" stroke="#a855f7" strokeWidth="1" />
        <text x="3" y="35" fill="#a855f7" fontSize="2.5">uy = u sin θ</text>
        {/* Peak / Apogee */}
        <circle cx="50" cy="25" r="1.5" fill="#eab308" className="animate-ping" />
        <text x="50" y="20" fill="#eab308" fontSize="2.8" textAnchor="middle" fontWeight="bold">
          Apogee: vy = 0
        </text>
        {/* Gravity vector */}
        <line x1="50" y1="26" x2="50" y2="34" stroke="#ef4444" strokeWidth="0.8" />
        <text x="53" y="32" fill="#ef4444" fontSize="2.5">g = 9.8 m/s² ↓</text>
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs mt-1">
        <MathFormula tex="T = \frac{2u\sin\theta}{g}" color="cyan" />
        <MathFormula tex="H = \frac{u^2\sin^2\theta}{2g}" color="amber" />
        <MathFormula tex="R = \frac{u^2\sin 2\theta}{g}" color="emerald" />
      </div>
    </div>
  );
};

// 3. Chemistry Stage
const ChemistryMolecularStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = ({ scene }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {/* Balanced Stoichiometric Reaction */}
      <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <MathFormula tex="\text{H}_3\text{O}^+_{(aq)} + \text{OH}^-_{(aq)} \rightleftharpoons 2\text{H}_2\text{O}_{(l)}" color="cyan" />
      </div>

      {/* Volumetric Equation */}
      <div className="bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-800 text-center">
        <span className="text-[10px] text-slate-400 block font-mono mb-1">Standard Neutralization Ratio:</span>
        <MathFormula tex="\frac{C_a V_a}{C_b V_b} = \frac{n_a}{n_b}" color="amber" />
      </div>

      {/* Indicator Color Transition */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400 text-[11px]">Methyl Orange Endpoint:</span>
        <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-bold text-[10px]">
          Alkaline: Yellow
        </span>
        <span className="text-slate-500">→</span>
        <span className="px-2 py-0.5 rounded bg-orange-500 text-white font-bold text-[10px]">
          Endpoint: Orange
        </span>
        <span className="text-slate-500">→</span>
        <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px]">
          Acidic: Pink
        </span>
      </div>
    </div>
  );
};

// 4. Biology Stage
const BiologyCellularStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = ({ scene }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div className="text-xs font-mono font-semibold text-emerald-400">
        Mitosis (PMAT) — Somatic Diploid Preservation (2n → 2n)
      </div>
      <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300 font-bold text-xs mb-1">
            P
          </div>
          <span className="text-[10px] font-bold text-slate-200 block">Prophase</span>
          <span className="text-[9px] text-slate-400">Condense</span>
        </div>
        <div className="bg-slate-900 p-2 rounded-lg border-2 border-emerald-500 text-center shadow-lg shadow-emerald-950">
          <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-xs mb-1">
            M
          </div>
          <span className="text-[10px] font-bold text-emerald-300 block">Metaphase</span>
          <span className="text-[9px] text-emerald-400/90 font-medium">Equator</span>
        </div>
        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 font-bold text-xs mb-1">
            A
          </div>
          <span className="text-[10px] font-bold text-slate-200 block">Anaphase</span>
          <span className="text-[9px] text-slate-400">Away</span>
        </div>
        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-300 font-bold text-xs mb-1">
            T
          </div>
          <span className="text-[10px] font-bold text-slate-200 block">Telophase</span>
          <span className="text-[9px] text-slate-400">Two Nuclei</span>
        </div>
      </div>
      <div className="text-[11px] font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded border border-slate-800">
        Somatic Growth & Tissue Repair • Zero Crossing-Over • 2 Identical Daughters
      </div>
    </div>
  );
};

// 5. English Stage
const EnglishSyntaxStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = ({ scene }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 px-4">
      <div className="text-xs font-mono text-sky-400 font-semibold">
        Syntactic Tree: Filtering Parenthetical Interrupters
      </div>
      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-md w-full">
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="px-2 py-1 bg-emerald-600/30 text-emerald-300 border border-emerald-500 rounded font-bold">
            The Principal
          </span>
          <span className="px-2 py-1 bg-slate-800 text-slate-500 border border-slate-700/60 rounded line-through text-[11px]">
            , as well as the teachers,
          </span>
          <span className="px-2 py-1 bg-emerald-600/30 text-emerald-300 border border-emerald-500 rounded font-bold">
            IS attending
          </span>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
          Singular Subject connects directly to Singular Verb <strong>is</strong>. The plural noun
          "teachers" is inside a parenthetical clause and does not govern the verb!
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-mono text-amber-300">
        <span>Rule of Proximity: Neither A nor B [Verb matches closest B]</span>
      </div>
    </div>
  );
};

// 6. Computer Science Stage
const CompsciAlgorithmStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = ({ scene }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div className="text-xs font-mono text-indigo-400 font-semibold flex items-center gap-2">
        <span>Binary Search Partitioning</span>
        <MathFormula tex="\mathcal{O}(\log n)" color="cyan" />
      </div>
      {/* Array visualization */}
      <div className="flex items-center gap-1.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
        {[
          { idx: 0, val: 2, gray: true },
          { idx: 1, val: 5, gray: true },
          { idx: 2, val: 8, gray: true },
          { idx: 3, val: 14, gray: true },
          { idx: 4, val: 19, active: true },
          { idx: 5, val: 23, match: true },
          { idx: 6, val: 31 },
          { idx: 7, val: 42 }
        ].map((item) => (
          <div
            key={item.idx}
            className={`w-9 h-11 rounded-lg flex flex-col items-center justify-center font-mono border transition-all ${
              item.match
                ? "bg-emerald-600 text-white border-emerald-400 font-bold scale-105 shadow-md shadow-emerald-950"
                : item.gray
                ? "bg-slate-900/50 text-slate-600 border-slate-800"
                : "bg-slate-800 text-slate-200 border-slate-700"
            }`}
          >
            <span className="text-xs">{item.val}</span>
            <span className="text-[8px] text-slate-400">[{item.idx}]</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="text-slate-400">Target: <strong className="text-emerald-400">23</strong></span>
        <span className="text-sky-400">low = 4</span>
        <span className="text-emerald-300 font-bold">mid = 5 (Found!)</span>
        <span className="text-sky-400">high = 7</span>
      </div>
      <div className="text-[10px] text-slate-400 font-mono">
        Halved in 2 steps instead of 6 linear comparisons.
      </div>
    </div>
  );
};

// 7. Engineering Stage
const EngineeringSchematicStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-2">
      <svg viewBox="0 0 120 50" className="w-full max-w-[340px] h-[150px] overflow-visible">
        {/* Beam */}
        <rect x="15" y="24" width="90" height="6" fill="#475569" stroke="#94a3b8" strokeWidth="0.8" rx="1" />
        {/* Left Support Pin */}
        <polygon points="15,30 10,42 20,42" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
        <text x="15" y="47" fill="#38bdf8" fontSize="3" textAnchor="middle" fontWeight="bold">RA = 25 kN</text>
        {/* Right Support Roller */}
        <circle cx="105" cy="35" r="4" fill="#a855f7" stroke="#7e22ce" strokeWidth="0.8" />
        <line x1="98" y1="41" x2="112" y2="41" stroke="#a855f7" strokeWidth="1" />
        <text x="105" y="47" fill="#a855f7" fontSize="3" textAnchor="middle" fontWeight="bold">RB = 25 kN</text>
        {/* Central Point Load */}
        <line x1="60" y1="5" x2="60" y2="23" stroke="#f43f5e" strokeWidth="1.5" />
        <polygon points="60,24 57,17 63,17" fill="#f43f5e" />
        <text x="60" y="3" fill="#f43f5e" fontSize="3.5" textAnchor="middle" fontWeight="bold">P = 50 kN</text>
        {/* Dimensions */}
        <line x1="15" y1="18" x2="60" y2="18" stroke="#64748b" strokeWidth="0.6" strokeDasharray="1,1" />
        <text x="37.5" y="16" fill="#94a3b8" fontSize="2.5" textAnchor="middle">L/2 = 3 m</text>
        <line x1="60" y1="18" x2="105" y2="18" stroke="#64748b" strokeWidth="0.6" strokeDasharray="1,1" />
        <text x="82.5" y="16" fill="#94a3b8" fontSize="2.5" textAnchor="middle">L/2 = 3 m</text>
      </svg>
      <div className="flex items-center gap-3 text-xs">
        <MathFormula tex="\sum F_y = 0 \implies R_A + R_B = P" color="cyan" />
        <MathFormula tex="M_{\max} = \frac{PL}{4} = 75\text{ kNm}" color="amber" />
      </div>
    </div>
  );
};

// 8. Economics Stage
const EconomicsMarketStage: React.FC<{ scene: VideoStoryboardScene; currentTime: number }> = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-2">
      <svg viewBox="0 0 100 60" className="w-full max-w-[320px] h-[160px] overflow-visible">
        {/* Axes */}
        <line x1="15" y1="50" x2="90" y2="50" stroke="#64748b" strokeWidth="1" />
        <line x1="15" y1="10" x2="15" y2="50" stroke="#64748b" strokeWidth="1" />
        <text x="92" y="52" fill="#94a3b8" fontSize="3">Q</text>
        <text x="14" y="8" fill="#94a3b8" fontSize="3" textAnchor="middle">P</text>
        {/* Demand Curve D */}
        <line x1="20" y1="15" x2="80" y2="45" stroke="#f43f5e" strokeWidth="1.2" />
        <text x="82" y="47" fill="#f43f5e" fontSize="3" fontWeight="bold">D (Demand)</text>
        {/* Supply Curve S */}
        <line x1="20" y1="45" x2="80" y2="15" stroke="#10b981" strokeWidth="1.2" />
        <text x="82" y="17" fill="#10b981" fontSize="3" fontWeight="bold">S (Supply)</text>
        {/* Equilibrium Point */}
        <circle cx="50" cy="30" r="1.5" fill="#eab308" />
        <line x1="15" y1="30" x2="50" y2="30" stroke="#eab308" strokeWidth="0.6" strokeDasharray="1,1" />
        <line x1="50" y1="30" x2="50" y2="50" stroke="#eab308" strokeWidth="0.6" strokeDasharray="1,1" />
        <text x="52" y="27" fill="#eab308" fontSize="3" fontWeight="bold">E(P*, Q*)</text>
      </svg>
      <div className="flex items-center gap-3 text-xs">
        <MathFormula tex="Q_d(P) = Q_s(P)" color="amber" />
        <span className="text-slate-400 font-mono text-[11px]">Market Clearing Equilibrium</span>
      </div>
    </div>
  );
};

// Fallback General Stage
const GeneralPedagogicalStage: React.FC<{ scene: VideoStoryboardScene }> = ({ scene }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <h4 className="text-sm font-bold text-slate-200">{scene.title}</h4>
      <p className="text-xs text-slate-400 max-w-md">{scene.visualDescription}</p>
    </div>
  );
};
