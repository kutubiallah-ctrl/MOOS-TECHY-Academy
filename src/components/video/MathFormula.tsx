import React, { useMemo } from "react";
import katex from "katex";

interface MathFormulaProps {
  tex?: string;
  math?: string;
  displayMode?: boolean;
  className?: string;
  highlight?: boolean;
  color?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "white";
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  tex,
  math,
  displayMode = false,
  className = "",
  highlight = false,
  color = "white"
}) => {
  const latexSource = tex || math || "";
  const html = useMemo(() => {
    if (!latexSource || typeof latexSource !== "string") return "";

    // Normalize LaTeX: strip dollar signs if provided
    let cleanTex = latexSource.trim();
    if (cleanTex.startsWith("$$") && cleanTex.endsWith("$$")) {
      cleanTex = cleanTex.slice(2, -2).trim();
    } else if (cleanTex.startsWith("$") && cleanTex.endsWith("$")) {
      cleanTex = cleanTex.slice(1, -1).trim();
    }

    try {
      return katex.renderToString(cleanTex, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true
      });
    } catch {
      // Fallback
      return null;
    }
  }, [tex, displayMode]);

  const colorClasses = {
    white: "text-slate-100",
    cyan: "text-cyan-300",
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    rose: "text-rose-300",
    violet: "text-violet-300"
  };

  if (!html) {
    return (
      <code className={`font-mono text-xs sm:text-sm tracking-tight ${colorClasses[color]} ${className}`}>
        {tex}
      </code>
    );
  }

  return (
    <span
      className={`inline-block math-rendered transition-all duration-200 ${colorClasses[color]} ${
        highlight ? "ring-1 ring-cyan-400/50 bg-cyan-950/30 px-2 py-0.5 rounded" : ""
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
