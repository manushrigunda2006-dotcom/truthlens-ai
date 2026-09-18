"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Shield,
  Search,
  ExternalLink,
  Clock,
  Layers,
  BarChart2,
  PieChart as PieChartIcon,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AssessmentBadge } from "@/components/ui/badges";

interface StatsData {
  totalAnalyses: number;
  credibleCount: number;
  misleadingCount: number;
  falseCount: number;
  insufficientCount: number;
  averageConfidence: number;
  totalClaims: number;
  claimBreakdown: {
    supported: number;
    contradicted: number;
    misleadingContext: number;
    unverified: number;
  };
  pendingReports: number;
  recent: Array<{
    id: string;
    title: string;
    overallAssessment: string;
    confidence: number;
    createdAt: string;
    inputMode: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/stats");
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const total = stats?.totalAnalyses || 1;
  const crediblePct = Math.round(((stats?.credibleCount || 0) / total) * 100);
  const misleadingPct = Math.round(((stats?.misleadingCount || 0) / total) * 100);
  const falsePct = Math.round(((stats?.falseCount || 0) / total) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Activity className="w-4 h-4" />
              <span>GLOBAL MISINFORMATION INTELLIGENCE RADAR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Executive Intelligence Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time telemetry, claim distributions, and systemic misinformation indicators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
              Refresh Data
            </button>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              Analyze New Story
            </Link>
          </div>
        </div>

        {/* 4 PRIMARY KPI METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
              <span>Total Analyses</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {stats?.totalAnalyses ?? 14}
            </div>
            <div className="text-xs text-cyan-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{stats?.totalClaims ?? 42} atomic claims audited</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
              <span>Likely Credible Ratio</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {crediblePct}%
            </div>
            <div className="text-xs text-slate-400">
              {stats?.credibleCount ?? 4} verified with corroborating records
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
              <span>Flagged Misleading / False</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-rose-400 font-mono">
              {misleadingPct + falsePct}%
            </div>
            <div className="text-xs text-slate-400">
              {(stats?.misleadingCount ?? 5) + (stats?.falseCount ?? 3)} stories flagged with contradictions
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
              <span>Avg AI Confidence</span>
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-cyan-400 font-mono">
              {stats?.averageConfidence ?? 87.4}%
            </div>
            <div className="text-xs text-slate-400">
              Calibrated model certainty index
            </div>
          </div>
        </div>

        {/* 2-COLUMN INTELLIGENCE BREAKDOWN CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assessment Breakdown Distribution */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Assessment Distribution</h3>
                <p className="text-xs text-slate-400">Verification proportions across all dossiers</p>
              </div>
              <PieChartIcon className="w-5 h-5 text-cyan-400" />
            </div>

            {/* Visual Proportional Bar */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-800 rounded-full flex overflow-hidden">
                <div
                  style={{ width: `${crediblePct}%` }}
                  className="bg-emerald-500 hover:opacity-90 transition-all"
                  title={`Credible: ${crediblePct}%`}
                />
                <div
                  style={{ width: `${misleadingPct}%` }}
                  className="bg-amber-500 hover:opacity-90 transition-all"
                  title={`Potentially Misleading: ${misleadingPct}%`}
                />
                <div
                  style={{ width: `${falsePct}%` }}
                  className="bg-rose-500 hover:opacity-90 transition-all"
                  title={`Likely False: ${falsePct}%`}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Likely Credible
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{stats?.credibleCount ?? 4}</div>
                  <div className="text-[10px] text-slate-400">{crediblePct}% of total</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Misleading
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{stats?.misleadingCount ?? 5}</div>
                  <div className="text-[10px] text-slate-400">{misleadingPct}% of total</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Likely False
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{stats?.falseCount ?? 3}</div>
                  <div className="text-[10px] text-slate-400">{falsePct}% of total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Claim Classification Breakdown */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Claim Status Breakdown</h3>
                <p className="text-xs text-slate-400">Atomic factual verification status</p>
              </div>
              <BarChart2 className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Supported by Evidence",
                  count: stats?.claimBreakdown.supported ?? 14,
                  total: stats?.totalClaims ?? 36,
                  color: "bg-emerald-500",
                },
                {
                  label: "Contradicted by Verified Facts",
                  count: stats?.claimBreakdown.contradicted ?? 12,
                  total: stats?.totalClaims ?? 36,
                  color: "bg-rose-500",
                },
                {
                  label: "Misleading Temporal / Framing Context",
                  count: stats?.claimBreakdown.misleadingContext ?? 6,
                  total: stats?.totalClaims ?? 36,
                  color: "bg-amber-500",
                },
                {
                  label: "Unverified / Insufficient Records",
                  count: stats?.claimBreakdown.unverified ?? 4,
                  total: stats?.totalClaims ?? 36,
                  color: "bg-blue-500",
                },
              ].map((item, idx) => {
                const pct = Math.round((item.count / item.total) * 100);
                return (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-mono text-slate-400">
                        {item.count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RECENT VERIFICATION ACTIVITY FEED */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Verification Dossiers</h3>
              <p className="text-xs text-slate-400">Latest analyses executed by TruthLens AI</p>
            </div>
            <Link
              href="/history"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View Full Archive
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {stats?.recent.map((rec) => (
              <div
                key={rec.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/20 px-2 rounded-lg transition-colors"
              >
                <div className="space-y-1">
                  <Link
                    href={`/results/${rec.id}`}
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors line-clamp-1"
                  >
                    {rec.title}
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="capitalize font-mono text-[11px] text-cyan-500">
                      Mode: {rec.inputMode}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <AssessmentBadge
                    assessment={rec.overallAssessment as any}
                    size="sm"
                  />
                  <Link
                    href={`/results/${rec.id}`}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-800 transition-colors"
                    title="Inspect Report"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
