import React, { useState, useMemo } from "react";
import {
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Compass,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Atom,
  Dna,
  Code,
  BookOpen,
  Anchor,
  Volume2
} from "lucide-react";
import { SubjectManipulativeState } from "../../../types/smartBoardInteraction";

interface SubjectManipulativeStageProps {
  initialState: SubjectManipulativeState;
  onStateChange?: (state: SubjectManipulativeState) => void;
  onAskTutorMoos?: (question: string) => void;
}

export const SubjectManipulativeStage: React.FC<SubjectManipulativeStageProps> = ({
  initialState,
  onStateChange,
  onAskTutorMoos
}) => {
  const [manipulative, setManipulative] = useState<SubjectManipulativeState>(initialState);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // Mathematics: Quadratic Sliders
  const handleMathParamChange = (key: "a" | "b" | "c", val: number) => {
    const current = { ...manipulative.parameters, [key]: val } as { a: number; b: number; c: number };
    const a = current.a || 1;
    const b = current.b || 0;
    const c = current.c || 0;
    const discriminant = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;

    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: current,
      computedOutputs: {
        discriminant,
        hasRealRoots: discriminant >= 0,
        rootCount: discriminant > 0 ? 2 : discriminant === 0 ? 1 : 0,
        vertexX: Number(vertexX.toFixed(2)),
        vertexY: Number(vertexY.toFixed(2)),
        root1: discriminant >= 0 ? Number(((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(2)) : "Complex",
        root2: discriminant >= 0 ? Number(((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(2)) : "Complex"
      },
      activeObservations: [
        `Leading coefficient a = ${a}: Parabola opens ${a > 0 ? "upward" : "downward"}.`,
        `Discriminant Δ = b² - 4ac = ${discriminant} (${discriminant > 0 ? "2 distinct real roots" : discriminant === 0 ? "1 repeated real root" : "no real roots, complex conjugate roots"}).`,
        `Axis of symmetry at x = ${vertexX.toFixed(2)}.`
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // Physics: Projectile Sliders
  const handlePhysicsParamChange = (key: "u" | "thetaDeg" | "g", val: number) => {
    const current = { ...manipulative.parameters, [key]: val } as { u: number; thetaDeg: number; g: number };
    const u = current.u || 20;
    const thetaDeg = current.thetaDeg || 30;
    const g = current.g || 9.8;
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const vx = u * Math.cos(thetaRad);
    const vy = u * Math.sin(thetaRad);
    const flightTime = (2 * vy) / g;
    const maxHeight = (vy * vy) / (2 * g);
    const range = vx * flightTime;

    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: current,
      computedOutputs: {
        vx: Number(vx.toFixed(2)),
        vy: Number(vy.toFixed(2)),
        flightTime: Number(flightTime.toFixed(2)),
        maxHeight: Number(maxHeight.toFixed(2)),
        range: Number(range.toFixed(2))
      },
      activeObservations: [
        `Horizontal velocity component vx = ${vx.toFixed(1)} m/s (zero acceleration, constant motion).`,
        `Vertical launch component vy = ${vy.toFixed(1)} m/s (gravity acts downward at ${g} m/s²).`,
        `Maximum apex reached: H = ${maxHeight.toFixed(2)} m. Total flight duration: T = ${flightTime.toFixed(2)} s.`
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // Chemistry: Titration Volumes
  const handleChemParamChange = (key: "Ca" | "Va" | "Vb", val: number) => {
    const current = { ...manipulative.parameters, [key]: val } as { Ca: number; Va: number; Vb: number; na: number; nb: number };
    const Ca = current.Ca || 0.1;
    const Va = current.Va || 25.0;
    const Vb = current.Vb || 20.0;
    const na = current.na || 1;
    const nb = current.nb || 2;
    const Cb = (Ca * Va * nb) / (Vb * na);

    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: current,
      computedOutputs: {
        Cb: Number(Cb.toFixed(3)),
        molesAcid: Number(((Ca * Va) / 1000).toFixed(4)),
        molesBaseRequired: Number((((Ca * Va * nb) / na) / 1000).toFixed(4)),
        equivalenceRatio: `${na} : ${nb}`
      },
      activeObservations: [
        `Acid moles neutralized: ${((Ca * Va) / 1000).toFixed(4)} mol.`,
        `Stoichiometric base moles required: ${((((Ca * Va * nb) / na) / 1000)).toFixed(4)} mol.`,
        `Calculated titrant base concentration: Cb = ${Cb.toFixed(3)} mol/dm³.`
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // Biology: Mitosis Stage Stepper
  const mitosisStages = ["Prophase", "Metaphase", "Anaphase", "Telophase"];
  const handleBiologyStageChange = (idx: number) => {
    const stage = mitosisStages[idx];
    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: { phaseIndex: idx, diploidCount: 46 },
      computedOutputs: {
        phaseName: stage,
        chromosomeState: idx <= 1 ? "Duplicated sister chromatids" : "Individual daughter chromosomes",
        spindleState: idx === 0 ? "Forming" : idx === 1 ? "Attached to kinetochores under tension" : idx === 2 ? "Shortening, pulling poles" : "Depolymerizing",
        nuclearEnvelope: idx === 0 ? "Disintegrating" : idx <= 2 ? "Absent" : "Reforming around 2 sets",
        resultingPloidy: "2n = 46 (Equational division)"
      },
      activeObservations: [
        `Active stage: ${stage}. Chromosome distribution follows strict mitotic sequencing.`,
        idx === 1 ? "Spindle assembly checkpoint active: verifies all chromosomes are equatorially aligned." : "Chromatids undergo precise mechanical segregation.",
        "Conserves parental diploid genomic complement exactly (2n -> 2n)."
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // Computer Science: Binary Search Stepper
  const handleCsStepChange = (newLow: number, newHigh: number) => {
    const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    const target = 23;
    const mid = Math.floor((newLow + newHigh) / 2);
    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: { low: newLow, high: newHigh, target, arrayLength: arr.length },
      computedOutputs: {
        currentMid: mid,
        midValue: arr[mid],
        targetValue: target,
        comparison: arr[mid] === target ? "arr[mid] === target (Target Found!)" : arr[mid] < target ? "arr[mid] < target (Target in upper half)" : "arr[mid] > target (Target in lower half)",
        nextLow: arr[mid] < target ? mid + 1 : newLow,
        nextHigh: arr[mid] > target ? mid - 1 : newHigh
      },
      activeObservations: [
        `Search window: indices [${newLow}..${newHigh}]. Midpoint index: ${mid} (value: ${arr[mid]}).`,
        arr[mid] === target ? "Success: Target located in logarithmic time O(log n)." : `Eliminating ${Math.abs(newHigh - newLow) / 2} elements from consideration.`,
        `Array monotonicity invariant holds across all comparisons.`
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // English: Concord Toggle
  const handleEnglishToggle = (pluralModifier: boolean) => {
    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: { ...manipulative.parameters, isPluralModifier: pluralModifier, subjectSingular: true, eslMode: false },
      computedOutputs: {
        headNoun: "quality (singular)",
        interveningModifier: pluralModifier ? "of these textbooks (plural post-modifier)" : "of the textbook (singular post-modifier)",
        nearestNoun: pluralModifier ? "textbooks (plural)" : "textbook (singular)",
        correctAuxiliary: "is (singular agreement)",
        ruleName: "Head Noun Concord takes precedence over Proximity Concord"
      },
      activeObservations: [
        "Head noun remains singular 'quality' regardless of whether the modifier noun is singular or plural.",
        "The sentence 'The quality of these textbooks is outstanding' is grammatically sound.",
        "Proximity concord trap: Do not let plural 'textbooks' force plural verb 'are'."
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // English & ESL: Phonemic Minimal Pair & Articulatory Explorer
  const handleEslPhonemeSelect = (pairKey: "ship-sheep" | "think-this" | "pen-pan", targetWord: "A" | "B") => {
    const pairs = {
      "ship-sheep": {
        wordA: "Ship",
        ipaA: "/ʃɪp/",
        descA: "Short lax vowel /ɪ/ (relaxed tongue, short duration ~120ms)",
        wordB: "Sheep",
        ipaB: "/ʃiːp/",
        descB: "Long tense vowel /iː/ (high tongue, smiling lips, sustained ~240ms)",
        formantA: "F1: 400 Hz | F2: 2000 Hz",
        formantB: "F1: 280 Hz | F2: 2250 Hz",
        tip: "L1 interference trap: collapsing /ɪ/ into /iː/ causes 'ship' to sound like 'sheep'."
      },
      "think-this": {
        wordA: "Think",
        ipaA: "/θɪŋk/",
        descA: "Voiceless dental fricative /θ/ (tongue between teeth, no vocal buzz)",
        wordB: "This",
        ipaB: "/ðɪs/",
        descB: "Voiced dental fricative /ð/ (tongue between teeth, active vocal buzzing)",
        formantA: "Voiceless friction: 4-8 kHz",
        formantB: "Voiced fundamental: 150 Hz + 4-8 kHz friction",
        tip: "Substituting /s/ or /t/ for /θ/ makes academic speech sound non-standard."
      },
      "pen-pan": {
        wordA: "Pen",
        ipaA: "/pen/",
        descA: "Mid front vowel /e/ (mouth half-open, tongue mid-height)",
        wordB: "Pan",
        ipaB: "/pæn/",
        descB: "Open front vowel /æ/ (jaw dropped low, tongue low)",
        formantA: "F1: 550 Hz | F2: 1800 Hz",
        formantB: "F1: 750 Hz | F2: 1700 Hz",
        tip: "Drop the jaw lower to distinguish /æ/ ('pan') from /e/ ('pen')."
      }
    };
    const p = pairs[pairKey];
    const isA = targetWord === "A";
    const selectedWord = isA ? p.wordA : p.wordB;
    const selectedIpa = isA ? p.ipaA : p.ipaB;
    const selectedDesc = isA ? p.descA : p.descB;
    const selectedFormant = isA ? p.formantA : p.formantB;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(selectedWord);
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    }

    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: {
        ...manipulative.parameters,
        eslMode: true,
        pairKey,
        targetWord,
        activeWord: selectedWord,
        ipa: selectedIpa
      },
      computedOutputs: {
        activeTarget: `${selectedWord} ${selectedIpa}`,
        acousticFormant: selectedFormant,
        articulatoryMechanism: selectedDesc,
        pedagogicalTip: p.tip
      },
      activeObservations: [
        `Phonemic target: "${selectedWord}" ${selectedIpa}.`,
        selectedDesc,
        `Acoustic resonance: ${selectedFormant}.`
      ],
      pedagogicalTakeaway: p.tip
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // Engineering: Beam Statics
  const handleEngrParamChange = (key: "spanL" | "loadP", val: number) => {
    const current = { ...manipulative.parameters, [key]: val } as { spanL: number; loadP: number };
    const L = current.spanL || 6;
    const P = current.loadP || 10;
    const Ra = P / 2;
    const Rb = P / 2;
    const Mmax = (P * L) / 4;

    const updated: SubjectManipulativeState = {
      ...manipulative,
      parameters: current,
      computedOutputs: {
        reactionA: `${Ra.toFixed(1)} kN`,
        reactionB: `${Rb.toFixed(1)} kN`,
        maxBendingMoment: `${Mmax.toFixed(1)} kN·m`,
        momentLocation: `Midspan (x = ${(L / 2).toFixed(1)} m)`
      },
      activeObservations: [
        `Symmetric support reactions: Ra = Rb = ${(P / 2).toFixed(1)} kN (ΣFy = 0).`,
        `Maximum bending moment M_max = (P × L)/4 = ${Mmax.toFixed(1)} kN·m at midspan.`,
        `Internal shear force crosses zero at x = ${(L / 2).toFixed(1)} m.`
      ]
    };
    setManipulative(updated);
    onStateChange?.(updated);
  };

  // Prediction Submission Handler
  const handlePredictionSubmit = () => {
    if (!selectedPrediction) return;
    setPredictionSubmitted(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-5 animate-in fade-in select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            {manipulative.subject === "mathematics" && <TrendingUp className="w-4 h-4" />}
            {manipulative.subject === "physics" && <Compass className="w-4 h-4" />}
            {manipulative.subject === "chemistry" && <Atom className="w-4 h-4" />}
            {manipulative.subject === "biology" && <Dna className="w-4 h-4" />}
            {manipulative.subject === "computer_science" && <Code className="w-4 h-4" />}
            {manipulative.subject === "english" && <BookOpen className="w-4 h-4" />}
            {manipulative.subject === "engineering" && <Anchor className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              MODE 2 • INTERACTIVE MANIPULATIVE
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {manipulative.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
            {manipulative.conceptName}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Controls & Parameter Sliders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Manipulate Variables & Invariants
              </span>
              <span className="text-[10px] font-mono text-slate-500">Live Mathematical Sync</span>
            </div>

            {/* 1. MATHEMATICS CONTROLS */}
            {manipulative.subject === "mathematics" && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Coefficient a (concavity / width):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.a)}</span>
                  </div>
                  <input
                    type="range"
                    min={-4}
                    max={5}
                    step={1}
                    value={Number(manipulative.parameters.a)}
                    onChange={(e) => handleMathParamChange("a", Number(e.target.value) || 1)}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Coefficient b (linear shift):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.b)}</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={Number(manipulative.parameters.b)}
                    onChange={(e) => handleMathParamChange("b", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Constant c (vertical translation):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.c)}</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={12}
                    step={1}
                    value={Number(manipulative.parameters.c)}
                    onChange={(e) => handleMathParamChange("c", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* 2. PHYSICS CONTROLS */}
            {manipulative.subject === "physics" && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Launch Velocity u (m/s):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.u)} m/s</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={Number(manipulative.parameters.u)}
                    onChange={(e) => handlePhysicsParamChange("u", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Launch Angle θ (degrees):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.thetaDeg)}°</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={85}
                    step={5}
                    value={Number(manipulative.parameters.thetaDeg)}
                    onChange={(e) => handlePhysicsParamChange("thetaDeg", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* 3. CHEMISTRY CONTROLS */}
            {manipulative.subject === "chemistry" && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Acid Concentration Ca (mol/dm³):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.Ca)} mol/dm³</span>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={0.5}
                    step={0.05}
                    value={Number(manipulative.parameters.Ca)}
                    onChange={(e) => handleChemParamChange("Ca", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Base Titration Volume Vb (cm³):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.Vb)} cm³</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={40}
                    step={2}
                    value={Number(manipulative.parameters.Vb)}
                    onChange={(e) => handleChemParamChange("Vb", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* 4. BIOLOGY CONTROLS */}
            {manipulative.subject === "biology" && (
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-mono text-slate-300 block">Select Mitosis Phase:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {mitosisStages.map((stage, sIdx) => {
                    const active = Number(manipulative.parameters.phaseIndex) === sIdx;
                    return (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => handleBiologyStageChange(sIdx)}
                        className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer text-center ${
                          active
                            ? "bg-cyan-500 text-slate-950 shadow-md"
                            : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {stage}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. COMPUTER SCIENCE CONTROLS */}
            {manipulative.subject === "computer_science" && (
              <div className="space-y-2.5 text-xs">
                <span className="text-[11px] font-mono text-slate-300 block">Binary Search Step Control:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCsStepChange(0, 9)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-800"
                  >
                    Reset [0..9]
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextL = Number(manipulative.computedOutputs.nextLow);
                      const nextH = Number(manipulative.computedOutputs.nextHigh);
                      handleCsStepChange(nextL, nextH);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    Advance Step →
                  </button>
                </div>
              </div>
            )}

            {/* 6. ENGLISH & ESL CONTROLS */}
            {manipulative.subject === "english" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <span className="text-[11px] font-mono text-slate-300 font-semibold">Language Mastery Mode:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEnglishToggle(Boolean(manipulative.parameters.isPluralModifier))}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                        !manipulative.parameters.eslMode
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      Syntax & Concord
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEslPhonemeSelect("ship-sheep", "A")}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                        manipulative.parameters.eslMode
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      ESL Phonetics Lab
                    </button>
                  </div>
                </div>

                {!manipulative.parameters.eslMode ? (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-300 block">Intervening Post-Modifier:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEnglishToggle(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          manipulative.parameters.isPluralModifier
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        Plural: "of these textbooks"
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEnglishToggle(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          !manipulative.parameters.isPluralModifier
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        Singular: "of the textbook"
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-emerald-400 block font-bold">Select Phonemic Minimal Pair Contrast:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEslPhonemeSelect("ship-sheep", "A")}
                        className={`p-1.5 rounded-lg text-center text-[10px] font-bold transition border cursor-pointer ${
                          manipulative.parameters.pairKey === "ship-sheep"
                            ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                        }`}
                      >
                        /ɪ/ vs /iː/ (Ship/Sheep)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEslPhonemeSelect("think-this", "A")}
                        className={`p-1.5 rounded-lg text-center text-[10px] font-bold transition border cursor-pointer ${
                          manipulative.parameters.pairKey === "think-this"
                            ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                        }`}
                      >
                        /θ/ vs /ð/ (Think/This)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEslPhonemeSelect("pen-pan", "A")}
                        className={`p-1.5 rounded-lg text-center text-[10px] font-bold transition border cursor-pointer ${
                          manipulative.parameters.pairKey === "pen-pan"
                            ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                        }`}
                      >
                        /e/ vs /æ/ (Pen/Pan)
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleEslPhonemeSelect((manipulative.parameters.pairKey as any) || "ship-sheep", "A")}
                        className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          manipulative.parameters.targetWord === "A"
                            ? "bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Target A: {manipulative.parameters.pairKey === "think-this" ? "Think /θɪŋk/" : manipulative.parameters.pairKey === "pen-pan" ? "Pen /pen/" : "Ship /ʃɪp/"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEslPhonemeSelect((manipulative.parameters.pairKey as any) || "ship-sheep", "B")}
                        className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          manipulative.parameters.targetWord === "B"
                            ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Target B: {manipulative.parameters.pairKey === "think-this" ? "This /ðɪs/" : manipulative.parameters.pairKey === "pen-pan" ? "Pan /pæn/" : "Sheep /ʃiːp/"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. ENGINEERING CONTROLS */}
            {manipulative.subject === "engineering" && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Span Length L (m):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.spanL)} m</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={16}
                    step={1}
                    value={Number(manipulative.parameters.spanL)}
                    onChange={(e) => handleEngrParamChange("spanL", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                    <span>Central Point Load P (kN):</span>
                    <span className="font-bold text-cyan-300">{String(manipulative.parameters.loadP)} kN</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    step={5}
                    value={Number(manipulative.parameters.loadP)}
                    onChange={(e) => handleEngrParamChange("loadP", Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Real-Time Mathematical & Physical Outputs */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Governing Invariants & Computed Quantities
            </span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(manipulative.computedOutputs).map(([k, v]) => (
                <div key={k} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block truncate">{k}</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Visual Canvas & Active Observations */}
        <div className="lg:col-span-6 space-y-4">
          {/* Dynamic Subject Visual Canvas */}
          <LiveManipulativeVisualCanvas manipulative={manipulative} />

          {/* Active Observations List */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Teacher Observation & Structural Invariants
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {manipulative.activeObservations.map((obs, oIdx) => (
                <li key={oIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-[11px] text-slate-400 italic">
                {manipulative.pedagogicalTakeaway}
              </p>
            </div>
          </div>

          {/* Test Your Prediction: Pedagogical Hypothesis Tester */}
          {manipulative.predictionPrompt && (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Test Your Prediction Before Continuing
                </span>
              </div>
              <p className="text-xs font-medium text-slate-200 leading-snug">
                {manipulative.predictionPrompt}
              </p>

              <div className="space-y-1.5">
                {manipulative.predictionOptions?.map((opt) => {
                  const isSelected = selectedPrediction === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => !predictionSubmitted && setSelectedPrediction(opt.id)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition cursor-pointer flex items-start gap-2 ${
                        isSelected
                          ? "bg-indigo-950/70 border-indigo-500/60 text-indigo-200"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border mt-0.5 flex-shrink-0 ${isSelected ? "border-indigo-400 bg-indigo-400" : "border-slate-600"}`} />
                      <span className="leading-snug">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {!predictionSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedPrediction}
                  onClick={handlePredictionSubmit}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition shadow cursor-pointer"
                >
                  Verify Scientific Prediction
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold">
                    {manipulative.predictionOptions?.find(o => o.id === selectedPrediction)?.isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Accurate Scientific Prediction!
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Re-examine Physical Law
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {manipulative.predictionOptions?.find(o => o.id === selectedPrediction)?.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Dynamic Interactive Visual Canvas for Subject Manipulatives
 * Renders live, reactive vector schematics reflecting active slider/parameter states.
 */
const LiveManipulativeVisualCanvas: React.FC<{ manipulative: SubjectManipulativeState }> = ({
  manipulative
}) => {
  const { subject, parameters } = manipulative;

  return (
    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" />
          Interactive Visual Stage
        </span>
        <span className="text-[10px] font-mono text-slate-500">
          Live Physical/Geometric Output
        </span>
      </div>

      <div className="w-full h-44 sm:h-48 bg-slate-900/90 rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center relative">
        {/* 1. MATHEMATICS: Interactive Parabola Canvas */}
        {subject === "mathematics" && (() => {
          const a = Number(parameters.a) || 1;
          const b = Number(parameters.b) || 0;
          const c = Number(parameters.c) || 0;
          const delta = b * b - 4 * a * c;

          // Generate curve path
          const pts: string[] = [];
          for (let x = -5; x <= 5; x += 0.25) {
            const y = a * x * x + b * x + c;
            const svgX = 170 + x * 26;
            const svgY = 100 - y * 6;
            pts.push(`${x === -5 ? "M" : "L"} ${svgX.toFixed(1)} ${Math.max(-20, Math.min(200, svgY)).toFixed(1)}`);
          }
          const curvePath = pts.join(" ");

          const vx = -b / (2 * a);
          const vy = c - (b * b) / (4 * a);
          const vSvgX = 170 + vx * 26;
          const vSvgY = 100 - vy * 6;

          let r1X: number | null = null;
          let r2X: number | null = null;
          if (delta >= 0) {
            const sqrtD = Math.sqrt(delta);
            const root1 = (-b + sqrtD) / (2 * a);
            const root2 = (-b - sqrtD) / (2 * a);
            r1X = 170 + root1 * 26;
            r2X = 170 + root2 * 26;
          }

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              {/* Grid lines */}
              <line x1="170" y1="10" x2="170" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="20" y1="100" x2="320" y2="100" stroke="#475569" strokeWidth="1.5" />

              {/* Axis labels */}
              <text x="325" y="104" fill="#94a3b8" fontSize="10" fontFamily="monospace">x</text>
              <text x="174" y="20" fill="#94a3b8" fontSize="10" fontFamily="monospace">y</text>

              {/* Axis of symmetry */}
              <line x1={vSvgX} y1="15" x2={vSvgX} y2="165" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Parabola Curve */}
              <path d={curvePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />

              {/* Vertex Dot */}
              <circle cx={vSvgX} cy={Math.max(15, Math.min(165, vSvgY))} r="4" fill="#f59e0b" />
              <text x={vSvgX + 6} y={Math.max(25, Math.min(155, vSvgY - 6))} fill="#fcd34d" fontSize="9" fontFamily="monospace">
                V({vx.toFixed(1)}, {vy.toFixed(1)})
              </text>

              {/* Roots */}
              {r1X !== null && r1X >= 20 && r1X <= 320 && (
                <>
                  <circle cx={r1X} cy="100" r="4.5" fill="#10b981" />
                  <text x={r1X - 12} y="116" fill="#34d399" fontSize="9" fontFamily="monospace">x₁</text>
                </>
              )}
              {r2X !== null && r2X >= 20 && r2X <= 320 && (
                <>
                  <circle cx={r2X} cy="100" r="4.5" fill="#10b981" />
                  <text x={r2X - 12} y="116" fill="#34d399" fontSize="9" fontFamily="monospace">x₂</text>
                </>
              )}

              {/* Legend badge */}
              <g transform="translate(15, 15)">
                <rect width="100" height="22" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#334155" />
                <text x="6" y="15" fill={delta >= 0 ? "#34d399" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Δ = {delta.toFixed(1)} {delta > 0 ? "(2 Roots)" : delta === 0 ? "(1 Root)" : "(No Real Roots)"}
                </text>
              </g>
            </svg>
          );
        })()}

        {/* 2. PHYSICS: Kinematics Trajectory Canvas */}
        {subject === "physics" && (() => {
          const u = Number(parameters.u) || 20;
          const thetaDeg = Number(parameters.thetaDeg) || 30;
          const thetaRad = (thetaDeg * Math.PI) / 180;
          const g = 9.8;
          const range = (u * u * Math.sin(2 * thetaRad)) / g;
          const hMax = (u * u * Math.pow(Math.sin(thetaRad), 2)) / (2 * g);

          // Map range to SVG width (scale to fit 260px)
          const scaleX = Math.min(260 / Math.max(range, 10), 6);
          const scaleY = Math.min(90 / Math.max(hMax, 2), 6);

          const pts: string[] = [];
          for (let x = 0; x <= range; x += Math.max(range / 30, 0.5)) {
            const y = x * Math.tan(thetaRad) - (g * x * x) / (2 * u * u * Math.pow(Math.cos(thetaRad), 2));
            const sX = 35 + x * scaleX;
            const sY = 145 - y * scaleY;
            pts.push(`${x === 0 ? "M" : "L"} ${sX.toFixed(1)} ${sY.toFixed(1)}`);
          }
          const trajPath = pts.join(" ");

          const apexX = 35 + (range / 2) * scaleX;
          const apexY = 145 - hMax * scaleY;
          const landX = 35 + range * scaleX;

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              {/* Ground line */}
              <line x1="20" y1="145" x2="320" y2="145" stroke="#475569" strokeWidth="2" />
              <text x="325" y="148" fill="#94a3b8" fontSize="10" fontFamily="monospace">x</text>

              {/* Trajectory */}
              <path d={trajPath} fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="none" />

              {/* Launch vector */}
              <line x1="35" y1="145" x2={35 + Math.cos(thetaRad) * 35} y2={145 - Math.sin(thetaRad) * 35} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              <circle cx="35" cy="145" r="4" fill="#f59e0b" />

              {/* Apex Point */}
              <circle cx={apexX} cy={apexY} r="4" fill="#ec4899" />
              <line x1={apexX} y1={apexY} x2={apexX} y2="145" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 2" />
              <text x={apexX - 25} y={Math.max(25, apexY - 6)} fill="#f472b6" fontSize="9" fontFamily="monospace" fontWeight="bold">
                H={hMax.toFixed(1)}m
              </text>

              {/* Landing Point */}
              <circle cx={landX} cy="145" r="3.5" fill="#10b981" />
              <text x={landX - 25} y="160" fill="#34d399" fontSize="9" fontFamily="monospace">
                R={range.toFixed(1)}m
              </text>

              {/* Launch telemetry */}
              <text x="35" y="25" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                u = {u} m/s @ {thetaDeg}° | vy = 0 at apex
              </text>
            </svg>
          );
        })()}

        {/* 3. CHEMISTRY: Dynamic Titration Apparatus */}
        {subject === "chemistry" && (() => {
          const vb = Number(parameters.Vb) || 20;
          const isAtEquivalence = vb === 20;
          const isOver = vb > 20;
          const solnColor = isAtEquivalence ? "#f472b6" : isOver ? "#ec4899" : "#bae6fd";
          const solnOpacity = isAtEquivalence ? 0.75 : isOver ? 0.95 : 0.35;

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              {/* Stand */}
              <rect x="80" y="20" width="6" height="145" fill="#475569" rx="2" />
              <rect x="50" y="160" width="80" height="6" fill="#334155" rx="2" />
              <rect x="80" y="50" width="30" height="4" fill="#475569" rx="1" />

              {/* Burette Tube */}
              <rect x="108" y="25" width="10" height="85" fill="#1e293b" stroke="#64748b" strokeWidth="1" rx="1" />
              {/* Titrant inside burette */}
              <rect x="110" y={27 + (vb / 50) * 60} width="6" height={80 - (vb / 50) * 60} fill="#38bdf8" opacity="0.6" />
              <line x1="113" y1="110" x2="113" y2="120" stroke="#64748b" strokeWidth="2" />

              {/* Falling Drop */}
              <circle cx="113" cy="126" r="2" fill="#38bdf8" />

              {/* Conical Flask */}
              <polygon points="100,132 126,132 140,162 86,162" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Solution inside flask */}
              <polygon points="94,146 132,146 138,160 88,160" fill={solnColor} fillOpacity={solnOpacity} />

              {/* Telemetry info */}
              <g transform="translate(160, 30)">
                <text x="0" y="15" fill="#e2e8f0" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  NaOH Added: {vb} mL
                </text>
                <text x="0" y="35" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  Stoichiometric Equivalence: 20 mL
                </text>
                <rect x="0" y="48" width="160" height="24" rx="4" fill={isAtEquivalence ? "#831843" : isOver ? "#701a75" : "#0c4a6e"} stroke="#475569" />
                <text x="8" y="64" fill={isAtEquivalence ? "#fbcfe8" : isOver ? "#f5d0fe" : "#7dd3fc"} fontSize="10" fontWeight="bold" fontFamily="monospace">
                  {isAtEquivalence ? "● End-Point (Permanent Pink)" : isOver ? "● Over-titrated (Deep Pink)" : "○ Pre-Equivalence (Clear)"}
                </text>
              </g>
            </svg>
          );
        })()}

        {/* 4. BIOLOGY: Mitosis Cell Phase Visualizer */}
        {subject === "biology" && (() => {
          const phaseIdx = Number(parameters.phaseIndex) || 0;
          const phases = ["Prophase", "Metaphase", "Anaphase", "Telophase"];
          const phaseName = phases[phaseIdx] || "Mitosis";

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              {/* Cell Membrane */}
              {phaseIdx < 3 ? (
                <ellipse cx="170" cy="90" rx="95" ry="65" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="none" />
              ) : (
                /* Telophase Cleavage Furrow */
                <path d="M 90 90 C 90 40, 155 50, 170 75 C 185 50, 250 40, 250 90 C 250 140, 185 130, 170 105 C 155 130, 90 140, 90 90 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              )}

              {/* Centrosomes */}
              <circle cx="100" cy="90" r="4" fill="#f59e0b" />
              <circle cx="240" cy="90" r="4" fill="#f59e0b" />

              {/* Phase-specific Spindle & Chromosome configurations */}
              {phaseIdx === 0 && (
                /* Prophase: Condensing Chromosomes inside dissolving nucleus */
                <>
                  <circle cx="170" cy="90" rx="35" ry="30" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="145" y="85" fill="#a855f7" fontSize="16" fontWeight="bold">X</text>
                  <text x="175" y="82" fill="#38bdf8" fontSize="16" fontWeight="bold">X</text>
                  <text x="155" y="105" fill="#ec4899" fontSize="16" fontWeight="bold">X</text>
                  <text x="180" y="102" fill="#eab308" fontSize="16" fontWeight="bold">X</text>
                </>
              )}

              {phaseIdx === 1 && (
                /* Metaphase: Equator Alignment */
                <>
                  {/* Metaphase plate */}
                  <line x1="170" y1="35" x2="170" y2="145" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Spindle fibers */}
                  <line x1="100" y1="90" x2="170" y2="55" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="100" y1="90" x2="170" y2="78" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="100" y1="90" x2="170" y2="102" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="100" y1="90" x2="170" y2="125" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

                  <line x1="240" y1="90" x2="170" y2="55" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="240" y1="90" x2="170" y2="78" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="240" y1="90" x2="170" y2="102" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="240" y1="90" x2="170" y2="125" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

                  {/* Aligned chromosomes */}
                  <text x="164" y="60" fill="#a855f7" fontSize="14" fontWeight="bold">X</text>
                  <text x="164" y="84" fill="#38bdf8" fontSize="14" fontWeight="bold">X</text>
                  <text x="164" y="108" fill="#ec4899" fontSize="14" fontWeight="bold">X</text>
                  <text x="164" y="132" fill="#eab308" fontSize="14" fontWeight="bold">X</text>
                </>
              )}

              {phaseIdx === 2 && (
                /* Anaphase: Chromatids separating */
                <>
                  <line x1="100" y1="90" x2="135" y2="65" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="100" y1="90" x2="135" y2="115" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="240" y1="90" x2="205" y2="65" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="240" y1="90" x2="205" y2="115" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

                  <text x="130" y="70" fill="#a855f7" fontSize="12" fontWeight="bold">&lt;</text>
                  <text x="130" y="115" fill="#ec4899" fontSize="12" fontWeight="bold">&lt;</text>
                  <text x="205" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold">&gt;</text>
                  <text x="205" y="115" fill="#eab308" fontSize="12" fontWeight="bold">&gt;</text>
                </>
              )}

              {phaseIdx === 3 && (
                /* Telophase: Two daughter cells forming */
                <>
                  <circle cx="130" cy="90" r="22" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="210" cy="90" r="22" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="122" y="94" fill="#a855f7" fontSize="11" fontWeight="bold">2n=46</text>
                  <text x="202" y="94" fill="#38bdf8" fontSize="11" fontWeight="bold">2n=46</text>
                </>
              )}

              {/* Title Banner */}
              <text x="170" y="20" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
                Stage {phaseIdx + 1}: {phaseName} (Equational 2n Division)
              </text>
            </svg>
          );
        })()}

        {/* 5. COMPUTER SCIENCE: Binary Search Vector Step Display */}
        {subject === "computer_science" && (() => {
          const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
          const low = Math.max(0, Math.min(9, Number(parameters.low) || 0));
          const high = Math.max(0, Math.min(9, Number(parameters.high) || 9));
          const mid = Math.floor((low + high) / 2);

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              <text x="170" y="22" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                Target = 23 | Low = {low}, Mid = {mid}, High = {high}
              </text>

              {/* Array Cells */}
              <g transform="translate(10, 65)">
                {arr.map((val, idx) => {
                  const isInRange = idx >= low && idx <= high;
                  const isMid = idx === mid;
                  const isTarget = val === 23;
                  const cellX = idx * 32;

                  return (
                    <g key={idx} transform={`translate(${cellX}, 0)`}>
                      <rect
                        width="30"
                        height="30"
                        rx="4"
                        fill={isMid ? "#065f46" : isInRange ? "#1e293b" : "#090d16"}
                        stroke={isMid ? "#10b981" : isInRange ? "#38bdf8" : "#334155"}
                        strokeWidth={isMid ? 2 : 1}
                      />
                      <text x="15" y="19" textAnchor="middle" fill={isMid ? "#a7f3d0" : isInRange ? "#f8fafc" : "#475569"} fontSize="10" fontFamily="monospace" fontWeight="bold">
                        {val}
                      </text>
                      <text x="15" y="42" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                        [{idx}]
                      </text>
                      {isMid && (
                        <text x="15" y="-6" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace">
                          ▲ MID
                        </text>
                      )}
                      {isTarget && (
                        <circle cx="15" cy="-14" r="2.5" fill="#f59e0b" />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Algorithmic Decision Banner */}
              <g transform="translate(20, 135)">
                <rect width="300" height="30" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="150" y="19" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="monospace">
                  {arr[mid] === 23
                    ? "arr[mid] == 23 → Target found in O(log n) time!"
                    : arr[mid] < 23
                    ? `arr[${mid}] (${arr[mid]}) < 23 → Discard left half, low = mid + 1`
                    : `arr[${mid}] (${arr[mid]}) > 23 → Discard right half, high = mid - 1`}
                </text>
              </g>
            </svg>
          );
        })()}

        {/* 6. ENGLISH & ESL: Sentence Syntax Tree & Phonetics Acoustic Visualizer */}
        {subject === "english" && (() => {
          if (parameters.eslMode) {
            const activeWord = String(parameters.activeWord || "Ship");
            const ipa = String(parameters.ipa || "/ʃɪp/");
            const isLongVowel = ipa.includes("ː") || ipa.includes("ð") || ipa.includes("æ");
            const targetWord = parameters.targetWord === "B" ? "B" : "A";

            return (
              <svg viewBox="0 0 340 180" className="w-full h-full">
                {/* Header Banner */}
                <rect x="20" y="10" width="300" height="26" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <text x="170" y="27" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  ESL ACOUSTIC WAVEFORM: "{activeWord.toUpperCase()}" {ipa}
                </text>

                {/* Simulated Acoustic Waveform Canvas */}
                <rect x="20" y="44" width="300" height="66" rx="6" fill="#020617" stroke="#1e293b" />
                <line x1="20" y1="77" x2="320" y2="77" stroke="#334155" strokeDasharray="3 3" />

                {/* Oscilloscope Waveform Path */}
                {targetWord === "A" ? (
                  // Short duration lax wave (~120ms burst)
                  <path
                    d="M 30 77 Q 50 45, 70 77 T 110 77 T 150 77 T 190 77 L 310 77"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                ) : (
                  // Sustained tense long wave (~240ms continuous vibration)
                  <path
                    d="M 30 77 Q 45 35, 60 77 T 90 77 T 120 77 T 150 77 T 180 77 T 210 77 T 240 77 T 270 77 L 310 77"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.5"
                  />
                )}

                {/* Formant Frequency Markers */}
                <g transform="translate(25, 52)">
                  <rect width="90" height="18" rx="3" fill="#0f172a" stroke="#334155" />
                  <text x="45" y="13" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontFamily="monospace">
                    {targetWord === "A" ? "F1: 400Hz (Lax)" : "F1: 280Hz (Tense)"}
                  </text>
                </g>

                <g transform="translate(125, 52)">
                  <rect width="95" height="18" rx="3" fill="#0f172a" stroke="#334155" />
                  <text x="47" y="13" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontFamily="monospace">
                    {targetWord === "A" ? "Duration: ~120ms" : "Duration: ~240ms"}
                  </text>
                </g>

                <g transform="translate(230, 52)">
                  <rect width="85" height="18" rx="3" fill="#0f172a" stroke="#334155" />
                  <text x="42" y="13" textAnchor="middle" fill="#fcd34d" fontSize="8" fontFamily="monospace">
                    {targetWord === "B" ? "Vocal Buzz: ON" : "Vocal Buzz: RELAXED"}
                  </text>
                </g>

                {/* Articulatory Diagnostics Box */}
                <g transform="translate(20, 118)">
                  <rect width="300" height="52" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="12" y="18" fill="#e2e8f0" fontSize="9" fontWeight="bold">
                    Articulatory Placement & Non-Native Interference:
                  </text>
                  <text x="12" y="32" fill="#94a3b8" fontSize="8.5">
                    {targetWord === "A"
                      ? "Lax sound: Keep jaw slightly dropped and tongue relaxed. Do not tense lips."
                      : "Tense sound: Tongue blade arches high to hard palate, hold vowel twice as long."}
                  </text>
                  <text x="12" y="45" fill="#38bdf8" fontSize="8.5">
                    Click 'Listen & Pronounce' to hear acoustic contrast with mathematical natural speech.
                  </text>
                </g>
              </svg>
            );
          }

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              {/* Head Noun Phrase */}
              <g transform="translate(20, 40)">
                <rect width="90" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="45" y="16" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="monospace">HEAD NOUN (Sg)</text>
                <text x="45" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">The quality</text>
              </g>

              {/* Intervening Prepositional Modifier */}
              <g transform="translate(125, 40)">
                <rect width="105" height="36" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                <text x="52" y="16" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">[PP Modifier]</text>
                <text x="52" y="28" textAnchor="middle" fill="#cbd5e1" fontSize="9">of these textbooks</text>
              </g>

              {/* Verb Phrase */}
              <g transform="translate(245, 40)">
                <rect width="75" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="37" y="16" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="monospace">VERB (Sg)</text>
                <text x="37" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">is</text>
              </g>

              {/* Agreement Arc connecting Head to Verb */}
              <path d="M 65 38 C 65 10, 282 10, 282 38" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <text x="173" y="15" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">
                ✔ Grammatical Concord Link (Singular → Singular)
              </text>

              {/* Explanation Note */}
              <g transform="translate(20, 105)">
                <rect width="300" height="55" rx="6" fill="#0f172a" stroke="#334155" />
                <text x="12" y="22" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                  Rule of Structural Dependency:
                </text>
                <text x="12" y="38" fill="#94a3b8" fontSize="9">
                  The intervening plural noun "textbooks" is trapped inside a PP
                </text>
                <text x="12" y="50" fill="#38bdf8" fontSize="9">
                  and cannot govern the matrix verb agreement.
                </text>
              </g>
            </svg>
          );
        })()}

        {/* 7. ENGINEERING: Beam Free Body & Bending Moment Diagram */}
        {subject === "engineering" && (() => {
          const l = Number(parameters.spanL) || 6;
          const p = Number(parameters.loadP) || 10;
          const mMax = (p * l) / 4;

          return (
            <svg viewBox="0 0 340 180" className="w-full h-full">
              {/* Beam Horizontal Member */}
              <rect x="50" y="45" width="240" height="8" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />

              {/* Pinned Support A */}
              <polygon points="50,53 43,68 57,68" fill="#f59e0b" />
              {/* Roller Support B */}
              <circle cx="286" cy="60" r="6" fill="#f59e0b" />

              {/* Central Point Load Arrow */}
              <line x1="170" y1="15" x2="170" y2="43" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
              <polygon points="170,45 166,35 174,35" fill="#ef4444" />
              <text x="175" y="25" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="monospace">
                P = {p} kN
              </text>

              {/* Support labels */}
              <text x="42" y="80" fill="#94a3b8" fontSize="9" fontFamily="monospace">RA={p/2}kN</text>
              <text x="268" y="80" fill="#94a3b8" fontSize="9" fontFamily="monospace">RB={p/2}kN</text>

              {/* Baseline for Bending Moment Diagram (BMD) */}
              <line x1="50" y1="120" x2="290" y2="120" stroke="#475569" strokeWidth="1" />

              {/* Bending Moment Triangle */}
              <polygon points={`50,120 170,${120 + Math.min(mMax * 1.5, 45)} 290,120`} fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="170" y={135 + Math.min(mMax * 1.5, 40)} textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                M_max = PL/4 = {mMax.toFixed(1)} kN·m
              </text>
            </svg>
          );
        })()}
      </div>
    </div>
  );
};
