import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import {
  Sparkles,
  Send,
  HelpCircle,
  Lightbulb,
  Compass,
  CheckCircle2,
  RefreshCw,
  X,
  Bot,
  Brain,
  MessageSquareQuote
} from "lucide-react";
import { PracticeQuestion } from "../types/curriculum";
import { useLearner } from "../context/LearnerContext";

interface SocraticAITutorProps {
  currentQuestion?: PracticeQuestion | null;
  activeUnitTitle?: string;
  learnerAttempt?: string;
  isOpen: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  suggestionButtons?: string[];
}

export const SocraticAITutor: React.FC<SocraticAITutorProps> = ({
  currentQuestion,
  activeUnitTitle = "Mathematics",
  learnerAttempt,
  isOpen,
  onClose,
  isFloating = false
}) => {
  const { profile, activeSkill } = useLearner();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "tutor",
      text: `👋 Greetings! I am **Tutor Moos**, your Socratic learning guide for **MOOS TECHY ACADEMY**.\n\nI won't just give you the answer outright—instead, I'll help you build genuine problem-solving mastery by guiding your thinking step by step. What are you working on right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestionButtons: [
        "How do I start this problem?",
        "What formula should I use?",
        "Explain the core concept simply"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const currentSkillId = currentQuestion?.skillId || activeSkill?.id;
      const currentSkillMastery = currentSkillId && profile?.masteryRecords ? profile.masteryRecords[currentSkillId]?.points : 0;

      const response = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: {
            learnerName: profile?.name,
            level: profile?.targetLevel,
            curriculum: profile?.curriculum,
            subject: "Mathematics",
            unit: activeUnitTitle,
            skill: currentQuestion?.skillId || activeSkill?.title,
            skillMasteryPoints: currentSkillMastery,
            questionText: currentQuestion ? `${currentQuestion.questionText} [${currentQuestion.mathExpression || ""}]` : undefined,
            learnerAttempt: learnerAttempt || undefined
          },
          chatHistory: messages.slice(-6)
        })
      });

      const data = await response.json();
      const tutorReply = data.response || "Let's examine the mathematical rule governing this step together. What do you notice first?";

      const tutorMsg: ChatMessage = {
        id: `tut-${Date.now()}`,
        sender: "tutor",
        text: tutorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestionButtons: data.suggestionQuestions || [
          "Can you walk me through the next step?",
          "How can I check my working?"
        ]
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error("AI Tutor chat failed", err);
      const fallbackMsg: ChatMessage = {
        id: `tut-${Date.now()}`,
        sender: "tutor",
        text: "Let's break this down into a simpler sub-step: What information do you currently know, and what unknown variable are we trying to isolate?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestionButtons: ["Show me a guiding step", "Explain the formula"]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <div
      id="socratic-tutor-container"
      className={`${
        isFloating
          ? "fixed bottom-5 right-5 z-50 w-[92vw] max-w-md h-[580px] shadow-2xl rounded-2xl border border-indigo-100 flex flex-col bg-white overflow-hidden"
          : "w-full h-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/30 ring-1 ring-white/20">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-indigo-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-sm">
              <span>Tutor Moos</span>
              <span className="rounded-full bg-indigo-500/40 px-1.5 py-0.2 text-[10px] font-medium tracking-wide text-indigo-200 uppercase">
                Socratic AI
              </span>
            </div>
            <p className="text-[11px] text-indigo-200/80">Guided discovery & mastery reasoning</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              setMessages([
                {
                  id: "fresh",
                  sender: "tutor",
                  text: "Refreshed! How can I guide your problem-solving right now?",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                }
              ])
            }
            className="p-1.5 text-indigo-200 hover:text-white rounded-lg hover:bg-white/10 transition"
            title="Reset conversation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-indigo-200 hover:text-white rounded-lg hover:bg-white/10 transition"
              title="Close AI Tutor"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Problem Context Pill */}
      {currentQuestion && (
        <div className="bg-indigo-50/80 border-b border-indigo-100/80 px-3.5 py-2 flex items-center justify-between text-xs text-indigo-950">
          <div className="flex items-center gap-1.5 truncate">
            <Brain className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
            <span className="font-medium truncate">
              Active Focus: {currentQuestion.questionText.slice(0, 45)}...
            </span>
          </div>
          <span className="shrink-0 font-mono text-[10px] bg-indigo-200/60 px-1.5 py-0.5 rounded text-indigo-800">
            {currentQuestion.difficulty.toUpperCase()}
          </span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-xs shadow-xs"
                  : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs"
              }`}
            >
              {msg.sender === "tutor" ? (
                <div className="prose prose-sm prose-slate max-w-none prose-p:my-1 prose-pre:bg-slate-900 prose-pre:text-white">
                  <Markdown>{msg.text}</Markdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
              <span
                className={`block text-[10px] mt-1.5 ${
                  msg.sender === "user" ? "text-indigo-200 text-right" : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>

            {/* Quick Socratic Suggestion Pills */}
            {msg.sender === "tutor" && msg.suggestionButtons && msg.suggestionButtons.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                {msg.suggestionButtons.map((btnText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickPrompt(btnText)}
                    className="flex items-center gap-1 text-xs rounded-full border border-indigo-200 bg-indigo-50/70 px-2.5 py-1 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition"
                  >
                    <Lightbulb className="h-3 w-3 text-amber-500" />
                    <span>{btnText}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl w-fit shadow-xs">
            <div className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
            <span>Tutor Moos is formulating a pedagogical hint...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Pedagogical Shortcuts Bar */}
      <div className="border-t border-slate-100 bg-white px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
          <button
            type="button"
            onClick={() => handleQuickPrompt("Guide my first step on this problem without giving the final answer.")}
            className="whitespace-nowrap flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition"
          >
            <Compass className="h-3 w-3 text-indigo-600" />
            <span>Guide step 1</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("What formula or mathematical definition is foundational to solving this?")}
            className="whitespace-nowrap flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition"
          >
            <Lightbulb className="h-3 w-3 text-amber-500" />
            <span>Key formula?</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("Could you give me an intuitive real-world analogy to understand this concept better?")}
            className="whitespace-nowrap flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition"
          >
            <MessageSquareQuote className="h-3 w-3 text-teal-600" />
            <span>Real-world analogy</span>
          </button>
        </div>
      </div>

      {/* Input Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
      >
        <input
          id="tutor-chat-input"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Tutor Moos for a hint or explain your thought..."
          className="flex-1 rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
          disabled={isLoading}
        />
        <button
          id="tutor-chat-send-btn"
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-700 transition shadow-xs"
          title="Send to Tutor Moos"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
