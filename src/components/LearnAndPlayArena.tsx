import React, { useState, useEffect, useMemo } from "react";
import {
  Gamepad2,
  Scale,
  Sparkles,
  Timer,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  ArrowRight,
  Flame,
  Lightbulb,
  Layers,
  ChevronRight,
  Zap,
  Info,
  ArrowUp,
  ArrowDown,
  Atom,
  Binary,
  BookOpen,
  DollarSign,
  Compass,
  Filter
} from "lucide-react";
import { PlayActivity, ClassificationCategory, ClassificationItem, SequencingStep } from "../types/learnAndPlay";
import { ALL_PLAY_ACTIVITIES } from "../data/learnAndPlayData";
import { LEARNING_DOMAINS } from "../data/curriculumData";
import { useLearner } from "../context/LearnerContext";

interface LearnAndPlayArenaProps {
  initialActivityId?: string;
  onOpenAITutorWithContext?: (questionText: string, contextNote: string) => void;
  onBackToDashboard: () => void;
}

export const LearnAndPlayArena: React.FC<LearnAndPlayArenaProps> = ({
  initialActivityId,
  onOpenAITutorWithContext,
  onBackToDashboard
}) => {
  const { profile, recordPlayCompletion } = useLearner();

  // Domain & Subject filtering
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");

  // Selected Activity State
  const [selectedActivity, setSelectedActivity] = useState<PlayActivity>(() => {
    if (initialActivityId) {
      const found = ALL_PLAY_ACTIVITIES.find((a) => a.id === initialActivityId);
      if (found) return found;
    }
    return ALL_PLAY_ACTIVITIES[0];
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(selectedActivity.timeLimitSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // --- 1. EQUATION BALANCER STATE ---
  const [leftValue, setLeftValue] = useState(25);
  const [rightValue, setRightValue] = useState(25);
  const [leftCoeff, setLeftCoeff] = useState(3);
  const [leftConstant, setLeftConstant] = useState(7);
  const [currentEquationStep, setCurrentEquationStep] = useState(0);
  const [equationStepHistory, setEquationStepHistory] = useState<string[]>([]);
  const [isEquationSolved, setIsEquationSolved] = useState(false);

  const formatLeftExpression = (coeff: number, constant: number, varName = "x"): string => {
    if (coeff === 0) return `${constant}`;
    const term = coeff === 1 ? varName : coeff === -1 ? `-${varName}` : `${coeff}${varName}`;
    if (constant === 0) return term;
    if (constant > 0) return `${term} + ${constant}`;
    return `${term} - ${Math.abs(constant)}`;
  };

  // --- 2. CONCEPT MATCHER STATE ---
  const [selectedConceptTile, setSelectedConceptTile] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [shuffledMatches, setShuffledMatches] = useState<Array<{ id: string; text: string }>>([]);
  const [comboStreak, setComboStreak] = useState(0);
  const [matcherAlert, setMatcherAlert] = useState<{ isError: boolean; message: string } | null>(null);

  // --- 3. CLASSIFICATION CHALLENGE STATE ---
  const [unassignedItems, setUnassignedItems] = useState<ClassificationItem[]>([]);
  const [bucketPlacements, setBucketPlacements] = useState<Record<string, ClassificationItem[]>>({});
  const [selectedClassItem, setSelectedClassItem] = useState<ClassificationItem | null>(null);
  const [classificationFeedback, setClassificationFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  // --- 4. SEQUENCING CHALLENGE STATE ---
  const [currentSequenceOrder, setCurrentSequenceOrder] = useState<SequencingStep[]>([]);
  const [sequenceVerified, setSequenceVerified] = useState(false);
  const [sequenceFeedback, setSequenceFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return ALL_PLAY_ACTIVITIES.filter((act) => {
      const matchesDomain = selectedDomainFilter === "all" || act.domainId === selectedDomainFilter;
      const matchesType = selectedTypeFilter === "all" || act.type === selectedTypeFilter;
      return matchesDomain && matchesType;
    });
  }, [selectedDomainFilter, selectedTypeFilter]);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !isCompleted && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleEndGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isCompleted, secondsRemaining]);

  const handleStartGame = (activity: PlayActivity) => {
    setSelectedActivity(activity);
    setIsPlaying(true);
    setIsCompleted(false);
    setScore(0);
    setHintsUsed(0);
    setShowHint(false);
    setSecondsRemaining(activity.timeLimitSeconds);
    setMatcherAlert(null);
    setComboStreak(0);
    setMatchedPairIds([]);
    setSelectedConceptTile(null);
    setClassificationFeedback(null);
    setSelectedClassItem(null);
    setSequenceFeedback(null);
    setSequenceVerified(false);

    if (activity.type === "equation_balancer" && activity.equationConfig) {
      setLeftValue(activity.equationConfig.leftInitialValue);
      setRightValue(activity.equationConfig.rightInitialValue);
      setLeftCoeff(3);
      setLeftConstant(7);
      setCurrentEquationStep(0);
      setEquationStepHistory([`Initial Equation: ${activity.equationConfig.targetEquation}`]);
      setIsEquationSolved(false);
    } else if (activity.type === "concept_matcher" && activity.matcherConfig) {
      const matches = activity.matcherConfig.pairs.map((p) => ({
        id: p.id,
        text: p.match
      }));
      setShuffledMatches([...matches].sort(() => Math.random() - 0.5));
    } else if (activity.type === "classification_challenge" && activity.classificationConfig) {
      setUnassignedItems([...activity.classificationConfig.items].sort(() => Math.random() - 0.5));
      const initialBuckets: Record<string, ClassificationItem[]> = {};
      activity.classificationConfig.categories.forEach((c) => {
        initialBuckets[c.id] = [];
      });
      setBucketPlacements(initialBuckets);
    } else if (activity.type === "sequencing_challenge" && activity.sequencingConfig) {
      // Shuffle steps for user to order
      const shuffled = [...activity.sequencingConfig.steps].sort(() => Math.random() - 0.5);
      setCurrentSequenceOrder(shuffled);
    }
  };

  const handleResetEquation = () => {
    if (!selectedActivity.equationConfig) return;
    setLeftValue(selectedActivity.equationConfig.leftInitialValue);
    setRightValue(selectedActivity.equationConfig.rightInitialValue);
    setLeftCoeff(3);
    setLeftConstant(7);
    setCurrentEquationStep(0);
    setEquationStepHistory([`Reset Scale to: ${selectedActivity.equationConfig.targetEquation}`]);
    setIsEquationSolved(false);
    setScore(0);
  };

  const handleEndGame = async (finalScore?: number) => {
    setIsPlaying(false);
    setIsCompleted(true);

    const calcScore = finalScore !== undefined ? finalScore : score;
    const timeSpent = selectedActivity.timeLimitSeconds - secondsRemaining;
    const accuracy = Math.round((calcScore / selectedActivity.maxScore) * 100);

    // Compute Mastery Points Award
    let masteryPointsGained = 0;
    if (accuracy >= 80) {
      masteryPointsGained = selectedActivity.masteryPointsReward;
    } else if (accuracy >= 50) {
      masteryPointsGained = Math.round(selectedActivity.masteryPointsReward * 0.6);
    } else {
      masteryPointsGained = Math.round(selectedActivity.masteryPointsReward * 0.25);
    }

    // Award XP
    const xpGained = accuracy >= 80 ? selectedActivity.xpReward : Math.round(selectedActivity.xpReward * 0.5);

    // Save directly into canonical LearnerContext
    await recordPlayCompletion(
      selectedActivity.title,
      selectedActivity.skillId,
      calcScore,
      selectedActivity.maxScore,
      masteryPointsGained,
      xpGained,
      Math.max(15, timeSpent)
    );
  };

  // --- EQUATION BALANCER HANDLERS ---
  const handleApplyEquationOp = (opObj: { id: string; label: string; op: "add" | "subtract" | "multiply" | "divide"; value: number }) => {
    if (!selectedActivity.equationConfig || isEquationSolved) return;

    const { op, value, label } = opObj;
    let newL = leftValue;
    let newR = rightValue;
    let newCoeff = leftCoeff;
    let newConst = leftConstant;

    if (op === "subtract") {
      newL -= value;
      newR -= value;
      newConst -= value;
    } else if (op === "add") {
      newL += value;
      newR += value;
      newConst += value;
    } else if (op === "divide") {
      newL = newL / value;
      newR = newR / value;
      newCoeff = newCoeff / value;
      newConst = newConst / value;
    } else if (op === "multiply") {
      newL = newL * value;
      newR = newR * value;
      newCoeff = newCoeff * value;
      newConst = newConst * value;
    }

    setLeftValue(newL);
    setRightValue(newR);
    setLeftCoeff(newCoeff);
    setLeftConstant(newConst);

    const newStep = currentEquationStep + 1;
    setCurrentEquationStep(newStep);
    const exprString = formatLeftExpression(newCoeff, newConst, selectedActivity.equationConfig.targetVariable);
    setEquationStepHistory((prev) => [...prev, `Applied: ${label} ➔ ${exprString} = ${newR}`]);

    // Check if solved
    if (newCoeff === 1 && newConst === 0 && newR === selectedActivity.equationConfig.targetValue) {
      setIsEquationSolved(true);
      const earned = selectedActivity.maxScore - hintsUsed * 10;
      const finalScore = Math.max(50, earned);
      setScore(finalScore);
      setTimeout(() => {
        handleEndGame(finalScore);
      }, 1400);
    }
  };

  // --- CONCEPT MATCHER HANDLERS ---
  const handleSelectConcept = (pairId: string) => {
    if (matchedPairIds.includes(pairId)) return;
    setSelectedConceptTile(pairId);
    setMatcherAlert(null);
  };

  const handleSelectMatch = (matchId: string) => {
    if (!selectedConceptTile || matchedPairIds.includes(matchId)) return;

    if (selectedConceptTile === matchId) {
      // Correct Match!
      const newMatched = [...matchedPairIds, matchId];
      setMatchedPairIds(newMatched);
      setSelectedConceptTile(null);
      const newStreak = comboStreak + 1;
      setComboStreak(newStreak);

      const pointsPerMatch = Math.round(selectedActivity.maxScore / (selectedActivity.matcherConfig?.pairs.length || 5));
      const streakBonus = (newStreak - 1) * 5;
      const updatedScore = score + pointsPerMatch + streakBonus;
      setScore(updatedScore);

      setMatcherAlert({
        isError: false,
        message: `Equivalence Verified! +${pointsPerMatch + streakBonus} pts (Streak: ${newStreak}x)`
      });

      if (newMatched.length === (selectedActivity.matcherConfig?.pairs.length || 0)) {
        setTimeout(() => {
          handleEndGame(updatedScore);
        }, 1200);
      }
    } else {
      setComboStreak(0);
      setSelectedConceptTile(null);
      setScore((prev) => Math.max(0, prev - 5));

      const pair = selectedActivity.matcherConfig?.pairs.find((p) => p.id === selectedConceptTile);
      setMatcherAlert({
        isError: true,
        message: pair?.hint ? `Pedagogical Check: ${pair.hint}` : "Not equivalent. Review the definition."
      });
    }
  };

  // --- CLASSIFICATION CHALLENGE HANDLERS ---
  const handleSelectClassItem = (item: ClassificationItem) => {
    setSelectedClassItem(item);
    setClassificationFeedback(null);
  };

  const handleAssignToBucket = (bucketId: string) => {
    if (!selectedClassItem || !selectedActivity.classificationConfig) return;

    const correctCategoryId = selectedClassItem.correctCategoryId;
    const isCorrect = correctCategoryId === bucketId;

    if (isCorrect) {
      // Move item from unassigned to bucket
      setUnassignedItems((prev) => prev.filter((i) => i.id !== selectedClassItem.id));
      setBucketPlacements((prev) => ({
        ...prev,
        [bucketId]: [...(prev[bucketId] || []), selectedClassItem]
      }));

      const pointsPerItem = Math.round(selectedActivity.maxScore / selectedActivity.classificationConfig.items.length);
      const updatedScore = score + pointsPerItem;
      setScore(updatedScore);

      setClassificationFeedback({
        isError: false,
        message: `Correct Classification! "${selectedClassItem.text}" correctly sorted into ${selectedActivity.classificationConfig.categories.find((c) => c.id === bucketId)?.name}.`
      });

      setSelectedClassItem(null);

      // Check if all unassigned items placed
      if (unassignedItems.length === 1) {
        setTimeout(() => {
          handleEndGame(updatedScore);
        }, 1200);
      }
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setClassificationFeedback({
        isError: true,
        message: selectedClassItem.explanation || `Incorrect classification for "${selectedClassItem.text}". Review the concepts.`
      });
      setSelectedClassItem(null);
    }
  };

  // --- SEQUENCING CHALLENGE HANDLERS ---
  const handleMoveSequenceStep = (index: number, direction: "up" | "down") => {
    if (sequenceVerified) return;
    const newOrder = [...currentSequenceOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setCurrentSequenceOrder(newOrder);
    setSequenceFeedback(null);
  };

  const handleVerifySequence = () => {
    if (!selectedActivity.sequencingConfig) return;

    // Check if every step is at its correctOrder (1-indexed)
    let isAllCorrect = true;
    currentSequenceOrder.forEach((step, idx) => {
      if (step.correctOrder !== idx + 1) {
        isAllCorrect = false;
      }
    });

    if (isAllCorrect) {
      setSequenceVerified(true);
      const earned = selectedActivity.maxScore - hintsUsed * 10;
      const finalScore = Math.max(60, earned);
      setScore(finalScore);
      setSequenceFeedback({
        isError: false,
        message: "Phenomenal! All sequential phases verified in perfect chronological order."
      });
      setTimeout(() => {
        handleEndGame(finalScore);
      }, 1500);
    } else {
      setScore((prev) => Math.max(0, prev - 10));
      setSequenceFeedback({
        isError: true,
        message: "The sequence has some phases out of order. Re-check the biological/logical flow."
      });
    }
  };

  // Domain Icon helper
  const getDomainIcon = (domainId: string) => {
    switch (domainId) {
      case "mathematics":
        return <Scale className="h-4 w-4 text-indigo-500" />;
      case "sciences":
        return <Atom className="h-4 w-4 text-cyan-500" />;
      case "technology_cs":
        return <Binary className="h-4 w-4 text-violet-500" />;
      case "languages":
        return <BookOpen className="h-4 w-4 text-rose-500" />;
      case "commercial_finance":
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      default:
        return <Compass className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div id="learn-and-play-arena" className="space-y-6">
      {/* Top Header Banner */}
      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                <Gamepad2 className="h-3.5 w-3.5" />
                Academic Learn & Play Ecosystem
              </span>
              <span className="text-xs text-slate-300 font-medium">
                • Multidisciplinary STEM, Languages & Finance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Interactive Concept Simulators & Fluency Challenges
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Engage with physics vectors, chemical periodicity, boolean logic, and calculus through structured interactive mechanics. Every completion directly updates your verified mastery profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="back-to-dashboard-btn"
              type="button"
              onClick={onBackToDashboard}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Play Area */}
      {!isPlaying && !isCompleted ? (
        /* Activity Catalog Selection */
        <div className="space-y-6">
          {/* Domain & Activity Type Filter Bar */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Filter className="h-4 w-4 text-indigo-600" />
                <span>Filter by Academic Domain:</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredActivities.length} of {ALL_PLAY_ACTIVITIES.length} Modules
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedDomainFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedDomainFilter === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Disciplines ({ALL_PLAY_ACTIVITIES.length})
              </button>
              {LEARNING_DOMAINS.map((domain) => {
                const count = ALL_PLAY_ACTIVITIES.filter((a) => a.domainId === domain.id).length;
                const isSelected = selectedDomainFilter === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setSelectedDomainFilter(domain.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {getDomainIcon(domain.id)}
                    <span>{domain.name}</span>
                    <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((act) => {
              const isSelected = selectedActivity.id === act.id;
              return (
                <div
                  key={act.id}
                  id={`activity-card-${act.id}`}
                  onClick={() => setSelectedActivity(act)}
                  className={`rounded-3xl border p-6 transition cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {getDomainIcon(act.domainId)}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                          {act.type.replace(/_/g, " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Timer className="h-3.5 w-3.5 text-slate-400" />
                        <span>{act.timeLimitSeconds}s</span>
                        <span>•</span>
                        <Trophy className="h-3.5 w-3.5 text-amber-500" />
                        <span className="font-bold text-slate-700">+{act.masteryPointsReward} pts</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{act.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{act.description}</p>

                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-[11px] text-slate-600">
                      <strong className="text-slate-800 font-semibold">Objective:</strong> {act.learningObjective}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 capitalize">
                      Level: {act.difficulty}
                    </span>
                    <button
                      id={`start-play-btn-${act.id}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartGame(act);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Launch Activity</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : isPlaying ? (
        /* ACTIVE IN-GAME ARENA */
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          {/* Game Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                {getDomainIcon(selectedActivity.domainId)}
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {selectedActivity.subtitle}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{selectedActivity.title}</h2>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Combo Streak */}
              {comboStreak > 1 && (
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-amber-800 text-xs font-bold animate-pulse">
                  <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Streak {comboStreak}x</span>
                </div>
              )}

              {/* Score Display */}
              <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl text-indigo-900 text-xs font-bold">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>Score: {score} pts</span>
              </div>

              {/* Timer Display */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  secondsRemaining <= 15
                    ? "bg-rose-50 border-rose-200 text-rose-700 animate-pulse"
                    : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <Timer className="h-4 w-4" />
                <span>{secondsRemaining}s</span>
              </div>

              {/* Abort button */}
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition cursor-pointer"
              >
                Quit Activity
              </button>
            </div>
          </div>

          {/* ENGINE 1: EQUATION BALANCER */}
          {selectedActivity.type === "equation_balancer" && selectedActivity.equationConfig && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Target: Isolate variable {selectedActivity.equationConfig.targetVariable}
                </span>
                <div className="text-3xl font-black text-indigo-900 tracking-tight font-mono bg-indigo-50/50 py-3 px-6 rounded-2xl inline-block border border-indigo-100">
                  {selectedActivity.equationConfig.targetEquation}
                </div>
              </div>

              {/* Physical Balance Scale Visualizer */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center justify-center gap-8 sm:gap-16 w-full max-w-xl">
                  {/* Left Pan */}
                  <div className="flex-1 bg-white border-2 border-indigo-300 rounded-2xl p-4 text-center shadow-sm space-y-1 transform transition-all duration-300">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase">Left Side Pan</span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                      {formatLeftExpression(leftCoeff, leftConstant, selectedActivity.equationConfig.targetVariable)}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Evaluated: {leftValue}</span>
                  </div>

                  {/* Equal Sign Fulcrum */}
                  <div className="flex flex-col items-center">
                    <Scale className="h-10 w-10 text-indigo-600" />
                    <span className="text-xl font-extrabold text-slate-700">=</span>
                  </div>

                  {/* Right Pan */}
                  <div className="flex-1 bg-white border-2 border-indigo-300 rounded-2xl p-4 text-center shadow-sm space-y-1 transform transition-all duration-300">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase">Right Side Pan</span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                      {rightValue}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Evaluated: {rightValue}</span>
                  </div>
                </div>

                {/* Equilibrium Status Indicator & Reset */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Golden Rule Maintained: Left Pan = Right Pan</span>
                  </div>
                  {currentEquationStep > 0 && !isEquationSolved && (
                    <button
                      id="reset-balance-scale-btn"
                      type="button"
                      onClick={handleResetEquation}
                      className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs transition cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Scale</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Equivalence Operations Action Buttons */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Apply Operation to Both Sides Simultaneously:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedActivity.equationConfig.availableOperations.map((op) => (
                    <button
                      key={op.id}
                      id={`op-btn-${op.id}`}
                      type="button"
                      onClick={() => handleApplyEquationOp(op)}
                      disabled={isEquationSolved}
                      className="rounded-2xl border border-slate-200 bg-white p-3.5 text-left text-xs font-bold text-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-900 transition shadow-xs flex items-center justify-between disabled:opacity-50 cursor-pointer"
                    >
                      <span>{op.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Step History Log */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-1.5 text-xs">
                <span className="font-bold text-slate-700">Transformation History:</span>
                {equationStepHistory.map((step, idx) => (
                  <div key={idx} className="text-slate-600 font-mono flex items-center gap-2">
                    <span className="text-indigo-600 font-bold">Step {idx}:</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ENGINE 2: CONCEPT MATCHER */}
          {selectedActivity.type === "concept_matcher" && selectedActivity.matcherConfig && (
            <div className="space-y-6">
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
                <span>Select a concept from the left column, then select its <strong>mathematical / scientific equivalent</strong> on the right.</span>
                <span className="font-bold text-indigo-700">
                  {matchedPairIds.length} / {selectedActivity.matcherConfig.pairs.length} Matched
                </span>
              </div>

              {matcherAlert && (
                <div
                  className={`rounded-2xl p-3 text-xs font-medium flex items-center gap-2 border ${
                    matcherAlert.isError
                      ? "bg-rose-50 border-rose-200 text-rose-800"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  {matcherAlert.isError ? (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{matcherAlert.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: Concepts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Concept / Formula
                  </h4>
                  <div className="space-y-2.5">
                    {selectedActivity.matcherConfig.pairs.map((pair) => {
                      const isMatched = matchedPairIds.includes(pair.id);
                      const isSelected = selectedConceptTile === pair.id;
                      return (
                        <button
                          key={pair.id}
                          id={`concept-tile-${pair.id}`}
                          type="button"
                          onClick={() => handleSelectConcept(pair.id)}
                          disabled={isMatched}
                          className={`w-full rounded-2xl border p-4 text-left font-mono font-bold text-base transition flex items-center justify-between ${
                            isMatched
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800 opacity-60 cursor-default"
                              : isSelected
                              ? "border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-600/30"
                              : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 shadow-xs cursor-pointer"
                          }`}
                        >
                          <span>{pair.concept}</span>
                          {isMatched ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <span className="text-[11px] font-sans font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              {pair.category}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Matches */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Equivalents & Definitions
                  </h4>
                  <div className="space-y-2.5">
                    {shuffledMatches.map((m) => {
                      const isMatched = matchedPairIds.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          id={`match-tile-${m.id}`}
                          type="button"
                          onClick={() => handleSelectMatch(m.id)}
                          disabled={isMatched || !selectedConceptTile}
                          className={`w-full rounded-2xl border p-4 text-left font-mono font-bold text-base transition flex items-center justify-between ${
                            isMatched
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800 opacity-60 cursor-default"
                              : selectedConceptTile
                              ? "border-indigo-200 bg-white text-slate-900 hover:border-indigo-500 hover:bg-indigo-50/40 shadow-xs cursor-pointer"
                              : "border-slate-200 bg-slate-50/50 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <span>{m.text}</span>
                          {isMatched && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ENGINE 3: CLASSIFICATION CHALLENGE */}
          {selectedActivity.type === "classification_challenge" && selectedActivity.classificationConfig && (
            <div className="space-y-6">
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
                <span>Select an item from the pool below, then assign it into its correct scientific / disciplinary category bucket.</span>
                <span className="font-bold text-indigo-700">
                  {unassignedItems.length} Remaining to Classify
                </span>
              </div>

              {classificationFeedback && (
                <div
                  className={`rounded-2xl p-3 text-xs font-medium flex items-center gap-2 border ${
                    classificationFeedback.isError
                      ? "bg-rose-50 border-rose-200 text-rose-800"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  {classificationFeedback.isError ? (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{classificationFeedback.message}</span>
                </div>
              )}

              {/* Unassigned Item Pool */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Item Selection Pool:
                </h4>
                <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  {unassignedItems.length === 0 ? (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      All items successfully classified!
                    </span>
                  ) : (
                    unassignedItems.map((item) => {
                      const isSelected = selectedClassItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectClassItem(item)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-600/30 scale-105"
                              : "bg-white text-slate-900 border-slate-200 hover:border-indigo-400 shadow-2xs"
                          }`}
                        >
                          {item.text}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Destination Buckets / Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedActivity.classificationConfig.categories.map((category) => {
                  const placedInBucket = bucketPlacements[category.id] || [];
                  return (
                    <div
                      key={category.id}
                      className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-sm text-slate-900">{category.name}</h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {placedInBucket.length} Placed
                          </span>
                        </div>
                        {category.description && <p className="text-[11px] text-slate-500">{category.description}</p>}
                      </div>

                      {/* Placed Items List */}
                      <div className="space-y-1.5 min-h-[80px]">
                        {placedInBucket.map((placed) => (
                          <div
                            key={placed.id}
                            className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center justify-between"
                          >
                            <span>{placed.text}</span>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          </div>
                        ))}
                      </div>

                      {/* Assign Button */}
                      <button
                        type="button"
                        onClick={() => handleAssignToBucket(category.id)}
                        disabled={!selectedClassItem}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          selectedClassItem
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <span>Place Selected Here</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ENGINE 4: SEQUENCING CHALLENGE */}
          {selectedActivity.type === "sequencing_challenge" && selectedActivity.sequencingConfig && (
            <div className="space-y-6">
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
                <span>Rearrange the steps into their correct chronological or causal order using the up/down arrows, then click <strong>Verify Sequence</strong>.</span>
              </div>

              {sequenceFeedback && (
                <div
                  className={`rounded-2xl p-3 text-xs font-medium flex items-center gap-2 border ${
                    sequenceFeedback.isError
                      ? "bg-rose-50 border-rose-200 text-rose-800"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  {sequenceFeedback.isError ? (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{sequenceFeedback.message}</span>
                </div>
              )}

              {/* Step Sequence List */}
              <div className="space-y-3">
                {currentSequenceOrder.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-extrabold text-sm shrink-0">
                      {idx + 1}
                    </span>

                    <div className="flex-1 space-y-0.5">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">{step.text}</p>
                      {step.explanation && <p className="text-[11px] text-slate-500">{step.explanation}</p>}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveSequenceStep(idx, "up")}
                        disabled={idx === 0 || sequenceVerified}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSequenceStep(idx, "down")}
                        disabled={idx === currentSequenceOrder.length - 1 || sequenceVerified}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verify CTA */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleVerifySequence}
                  disabled={sequenceVerified}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Verify Chronological Sequence</span>
                </button>
              </div>
            </div>
          )}

          {/* Hint Footer & Socratic AI Bridge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowHint(true);
                  setHintsUsed((prev) => prev + 1);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl hover:bg-amber-100 transition cursor-pointer"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                <span>Need a Hint?</span>
              </button>

              {onOpenAITutorWithContext && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenAITutorWithContext(
                      selectedActivity.title,
                      `I am working on the multidisciplinary activity: ${selectedActivity.title} (${selectedActivity.subtitle}). The objective is: ${selectedActivity.learningObjective}. Can you provide a Socratic hint without giving away the direct answer?`
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Ask Tutor Moos AI</span>
                </button>
              )}
            </div>

            {showHint && (
              <p className="text-xs text-amber-800 bg-amber-50/80 p-2 rounded-xl border border-amber-200 max-w-md">
                <strong>Pedagogical Hint:</strong> Break the system down into fundamental definitions and laws. Look for patterns, roots, or physical invariants before choosing.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* ACTIVITY RESULTS SUMMARY */
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm space-y-6 text-center max-w-2xl mx-auto">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 mx-auto shadow-sm">
            <Trophy className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Activity Completed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {selectedActivity.title}
            </h2>
            <p className="text-xs text-slate-600">
              Your performance has been recorded into your canonical learner profile.
            </p>
          </div>

          {/* Metrics Bento */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Score</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                {score} / {selectedActivity.maxScore}
              </div>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
              <span className="text-[11px] font-semibold text-indigo-500 uppercase">Mastery Pts</span>
              <div className="text-xl sm:text-2xl font-black text-indigo-700">
                +{selectedActivity.masteryPointsReward} pts
              </div>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
              <span className="text-[11px] font-semibold text-amber-600 uppercase">XP Awarded</span>
              <div className="text-xl sm:text-2xl font-black text-amber-700">
                +{selectedActivity.xpReward} XP
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="replay-activity-btn"
              type="button"
              onClick={() => handleStartGame(selectedActivity)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Play Again</span>
            </button>

            <button
              id="return-to-catalog-btn"
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setIsCompleted(false);
              }}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer"
            >
              <Layers className="h-4 w-4" />
              <span>Explore More Activities</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
