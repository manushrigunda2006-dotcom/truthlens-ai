"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Flag,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  RefreshCw,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ReportItem {
  id: string;
  analysisId: string;
  reason: string;
  details: string;
  status: string;
  createdAt: string;
  analysis?: {
    id: string;
    title: string;
    overallAssessment: string;
    confidence: number;
    publisher?: string;
  };
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/report?status=${statusFilter}`);
      const json = await res.json();
      if (json.success) {
        setReports(json.data);
      }
    } catch {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [statusFilter]);

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case "flawed_analysis":
        return "Flawed Analysis";
      case "misinformation":
        return "High-Harm Disinformation";
      case "hate_speech":
        return "Hate Speech / Harassment";
      case "copyright":
        return "Copyright Infringement";
      default:
        return "Community Flag";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <FileText className="w-4 h-4" />
              <span>COMMUNITY INVESTIGATION REGISTRY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Investigation Dossiers
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Registry of flagged claims, reported algorithmic inaccuracies, and open community review dossiers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadReports}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
              Refresh Dossiers
            </button>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-900/30"
            >
              Analyze Story
            </Link>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="glass-card rounded-xl p-3 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">STATUS:</span>
            {["all", "pending", "reviewed", "resolved"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            {reports.length} Reports Recorded
          </span>
        </div>

        {/* REPORTS LIST */}
        {isLoading ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400">Loading dossiers...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Investigation Queue Clear</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No active misinformation dossiers reported under the &ldquo;{statusFilter}&rdquo; status category.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="glass-card rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-rose-950/80 text-rose-300 border border-rose-800 font-semibold">
                      {getReasonLabel(report.reason)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize ${
                        report.status === "resolved"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : report.status === "reviewed"
                          ? "bg-blue-950 text-blue-300 border border-blue-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      Status: {report.status}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(report.createdAt).toLocaleString()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    Flag Details:
                  </h4>
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 mt-1 leading-relaxed">
                    {report.details}
                  </p>
                </div>

                {report.analysis && (
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Associated Analysis:</span>
                      <span className="font-semibold text-white">{report.analysis.title}</span>
                    </div>

                    <Link
                      href={`/results/${report.analysis.id}`}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-medium"
                    >
                      Inspect Verification Dossier
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
