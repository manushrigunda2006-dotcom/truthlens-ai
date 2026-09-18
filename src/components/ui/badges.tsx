import React from "react";
import { CheckCircle, AlertTriangle, XCircle, HelpCircle, ShieldAlert } from "lucide-react";
import { OverallAssessment, ClaimStatus } from "@/types";

export function AssessmentBadge({
  assessment,
  size = "md",
}: {
  assessment: OverallAssessment;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-2 text-base font-semibold gap-2",
  };

  switch (assessment) {
    case "Likely credible":
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-700/60 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] ${sizeClasses[size]}`}
        >
          <CheckCircle className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
          Likely Credible
        </span>
      );
    case "Potentially misleading":
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-amber-950/70 text-amber-300 border border-amber-700/60 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)] ${sizeClasses[size]}`}
        >
          <AlertTriangle className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
          Potentially Misleading
        </span>
      );
    case "Likely false":
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-rose-950/70 text-rose-300 border border-rose-700/60 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)] ${sizeClasses[size]}`}
        >
          <XCircle className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
          Likely False
        </span>
      );
    case "Insufficient evidence":
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-slate-900/80 text-cyan-300 border border-cyan-800/50 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)] ${sizeClasses[size]}`}
        >
          <HelpCircle className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
          Insufficient Evidence
        </span>
      );
  }
}

export function ClaimBadge({ status }: { status: ClaimStatus }) {
  switch (status) {
    case "Supported":
      return (
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          Supported
        </span>
      );
    case "Contradicted":
      return (
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold bg-rose-950/60 text-rose-300 border border-rose-800/60">
          <XCircle className="w-3 h-3 text-rose-400" />
          Contradicted
        </span>
      );
    case "Misleading context":
      return (
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/60">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          Misleading Context
        </span>
      );
    case "Unverified":
      return (
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/60">
          <ShieldAlert className="w-3 h-3 text-blue-400" />
          Unverified
        </span>
      );
    case "Insufficient evidence":
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold bg-slate-900/60 text-slate-300 border border-slate-700">
          <HelpCircle className="w-3 h-3 text-slate-400" />
          Insufficient Evidence
        </span>
      );
  }
}
