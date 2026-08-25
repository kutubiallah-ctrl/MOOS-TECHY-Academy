import React, { useRef, useState, useEffect } from "react";
import {
  Pen,
  Eraser,
  RotateCcw,
  Trash2,
  Grid,
  Maximize2,
  Minimize2,
  Palette,
  Check
} from "lucide-react";

interface MathScratchpadProps {
  initialVisible?: boolean;
  onSymbolClick?: (symbol: string) => void;
}

export const MathScratchpad: React.FC<MathScratchpadProps> = ({
  initialVisible = true,
  onSymbolClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState<string>("#1e293b"); // slate-800
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [gridMode, setGridMode] = useState<"math_grid" | "dot_grid" | "blank">("math_grid");
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const colors = [
    { name: "Slate", hex: "#1e293b" },
    { name: "Indigo", hex: "#4f46e5" },
    { name: "Emerald", hex: "#059669" },
    { name: "Rose", hex: "#e11d48" },
    { name: "Amber", hex: "#d97706" },
    { name: "Sky", hex: "#0284c7" }
  ];

  const mathSymbols = ["x", "y", "²", "√", "±", "π", "θ", "÷", "×", "=", "≠", "≤", "≥", "Δ", "∫", "∑", "½", "¾"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    canvas.width = Math.max(rect.width, 300);
    canvas.height = isExpanded ? 500 : 260;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, [isExpanded]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), imageData]);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (newHistory.length > 0) {
      ctx.putImageData(newHistory[newHistory.length - 1], 0, 0);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    saveState();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineWidth = tool === "eraser" ? strokeWidth * 6 : strokeWidth;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div
      id="math-scratchpad-card"
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ${
        isExpanded ? "fixed inset-4 z-50 flex flex-col shadow-2xl md:inset-10" : "relative"
      }`}
    >
      {/* Scratchpad Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
            Interactive Math Scratchpad
          </div>
          <span className="text-xs text-slate-400 font-normal hidden sm:inline">
            Work out steps & equations here
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Tool toggles */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              id="scratchpad-pen-btn"
              type="button"
              onClick={() => setTool("pen")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition ${
                tool === "pen"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Pen tool"
            >
              <Pen className="h-3.5 w-3.5" />
              <span>Pen</span>
            </button>
            <button
              id="scratchpad-eraser-btn"
              type="button"
              onClick={() => setTool("eraser")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition ${
                tool === "eraser"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Eraser tool"
            >
              <Eraser className="h-3.5 w-3.5" />
              <span>Eraser</span>
            </button>
          </div>

          {/* Color Palettes */}
          {tool === "pen" && (
            <div className="hidden sm:flex items-center gap-1 px-1">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={`h-5 w-5 rounded-full transition transform hover:scale-110 flex items-center justify-center ${
                    color === c.hex ? "ring-2 ring-indigo-500 ring-offset-1" : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {color === c.hex && <Check className="h-3 w-3 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          )}

          {/* Grid Background Switcher */}
          <button
            id="scratchpad-grid-btn"
            type="button"
            onClick={() => {
              if (gridMode === "math_grid") setGridMode("dot_grid");
              else if (gridMode === "dot_grid") setGridMode("blank");
              else setGridMode("math_grid");
            }}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 transition"
            title="Toggle grid background (Grid / Dots / Blank)"
          >
            <Grid className="h-3.5 w-3.5 text-indigo-600" />
            <span className="capitalize">{gridMode.replace("_", " ")}</span>
          </button>

          {/* Undo */}
          <button
            id="scratchpad-undo-btn"
            type="button"
            onClick={undo}
            disabled={history.length === 0}
            className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-40 rounded-lg hover:bg-slate-100 transition"
            title="Undo stroke"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Clear */}
          <button
            id="scratchpad-clear-btn"
            type="button"
            onClick={clearCanvas}
            className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition"
            title="Clear all scratchpad drawings"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>

          {/* Expand/Collapse */}
          <button
            id="scratchpad-expand-btn"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
            title={isExpanded ? "Minimize scratchpad" : "Expand to fullscreen"}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Math Quick Symbols Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50/40 px-3 py-1.5 text-xs">
        <span className="text-slate-400 font-medium text-[11px] whitespace-nowrap">Symbols:</span>
        <div className="flex items-center gap-1">
          {mathSymbols.map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => onSymbolClick && onSymbolClick(sym)}
              className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-mono font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Drawing Canvas Area with Background Pattern */}
      <div
        className={`relative w-full overflow-hidden ${
          isExpanded ? "flex-1 min-h-[400px]" : "h-64"
        }`}
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            gridMode === "math_grid"
              ? "linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)"
              : gridMode === "dot_grid"
              ? "radial-gradient(#cbd5e1 1px, transparent 1px)"
              : "none",
          backgroundSize: gridMode === "math_grid" ? "20px 20px" : "16px 16px"
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 cursor-crosshair touch-none w-full h-full"
        />
        {history.length === 0 && !isDrawing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-slate-300 text-xs font-medium">
            ✍️ Scratchpad active — Draw your calculation steps here
          </div>
        )}
      </div>
    </div>
  );
};
