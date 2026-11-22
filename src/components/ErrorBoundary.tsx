import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home, ShieldAlert } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("MOOS Academy — Uncaught UI Error in ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (e) {
      this.setState({ hasError: false, error: null, errorInfo: null });
    }
  };

  private handleSoftReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <AlertTriangle className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  MOOS Academy
                </h1>
                <p className="text-xs text-slate-400 font-mono">System Recovery & Resilience Engine</p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
                <ShieldAlert className="h-4 w-4" />
                <span>Recoverable Interface Exception</span>
              </div>
              <p className="text-xs text-slate-300 font-mono break-words leading-relaxed">
                {this.state.error?.message || "An unexpected view render exception occurred."}
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your institutional data, mastery records, and active sessions remain securely intact. Click below to refresh the cockpit view.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reload Application</span>
              </button>

              <button
                type="button"
                onClick={this.handleSoftReset}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
