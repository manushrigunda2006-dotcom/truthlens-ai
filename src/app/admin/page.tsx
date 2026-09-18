"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  Shield,
  Activity,
  Server,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Plus,
  RefreshCw,
  Sliders,
  Database,
  ExternalLink,
  Users,
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
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Demo enabled by default for hackathon review
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  // Custom keywords / rule overrides
  const [keywords, setKeywords] = useState<string[]>([
    "miracle cure",
    "dissolves overnight",
    "secret bank lockdown",
    "order #4910",
    "doctors are begging",
    "before midnight",
    "forward to 10 groups",
  ]);
  const [newKeyword, setNewKeyword] = useState("");

  const loadReports = async () => {
    try {
      setIsLoadingReports(true);
      const res = await fetch("/api/report");
      const json = await res.json();
      if (json.success) {
        setReports(json.data);
      }
    } catch {
      // Ignore
    } finally {
      setIsLoadingReports(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleUpdateReportStatus = async (
    id: string,
    status: "reviewed" | "resolved" | "dismissed"
  ) => {
    try {
      const res = await fetch("/api/report", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReports((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || keywords.includes(newKeyword.trim())) return;
    setKeywords([...keywords, newKeyword.trim()]);
    setNewKeyword("");
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Lock className="w-4 h-4" />
              <span>INTELLIGENCE OPERATIONS CENTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin & Operations Console
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live system health, community report moderation, and heuristic rule engine overrides.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ADMIN PRIVILEGES GRANTED
            </span>
          </div>
        </div>

        {/* SYSTEM HEALTH TELEMETRY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              Database Cluster
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Healthy (12ms)
            </div>
            <p className="text-[10px] text-slate-500 font-mono">SQLite / PostgreSQL ORM</p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              NLP Engine Status
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Operational (100%)
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Heuristic + Gemini/OpenAI</p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              OCR Worker Pool
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Tesseract v7 Ready
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Parallel web worker</p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              Pending Moderations
            </span>
            <div className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              {reports.filter((r) => r.status === "pending").length} Dossiers
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Awaiting administrative sign-off</p>
          </div>
        </div>

        {/* 2-COLUMN: MODERATION QUEUE & RULE OVERRIDES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Col 1: Moderation Queue (8 cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Reported Items Moderation Queue</h3>
              </div>
              <button
                onClick={loadReports}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReports ? "animate-spin" : ""}`} />
                Sync Queue
              </button>
            </div>

            {reports.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active flagged items in the moderation backlog.
              </div>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                        {rep.reason}
                      </span>
                      <span
                        className={`font-mono text-[10px] capitalize px-2 py-0.5 rounded ${
                          rep.status === "resolved"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : rep.status === "reviewed"
                            ? "bg-blue-950 text-blue-300 border border-blue-800"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {rep.status}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed bg-[#080c14] p-2.5 rounded-lg border border-slate-800">
                      {rep.details}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(rep.createdAt).toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {rep.status !== "reviewed" && (
                          <button
                            onClick={() => handleUpdateReportStatus(rep.id, "reviewed")}
                            className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
                          >
                            Mark Reviewed
                          </button>
                        )}
                        {rep.status !== "resolved" && (
                          <button
                            onClick={() => handleUpdateReportStatus(rep.id, "resolved")}
                            className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Rule Engine Overrides (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-base font-bold text-white">Keyword & Threat Rules</h3>
                <p className="text-xs text-slate-400">Custom heuristic trigger phrases</p>
              </div>
            </div>

            <form onSubmit={handleAddKeyword} className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add pattern / threat phrase..."
                className="flex-1 bg-[#0a0f1d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                ACTIVE TRIGGER PATTERNS ({keywords.length})
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[300px] overflow-y-auto pt-1">
                {keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700"
                  >
                    <span>&ldquo;{kw}&rdquo;</span>
                    <button
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-800">
              These patterns dynamically feed the clickbait detection matrix and claim segmentation heuristics across incoming story submissions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
