"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  History as HistoryIcon,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Download,
  Calendar,
  Layers,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AssessmentBadge } from "@/components/ui/badges";
import { OverallAssessment } from "@/types";

interface HistoryItem {
  id: string;
  title: string;
  inputMode: string;
  overallAssessment: OverallAssessment;
  confidence: number;
  summary: string;
  claimsCount: number;
  publisher?: string;
  isDemo?: boolean;
  createdAt: string;
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState<string>("all");
  const [selectedInputMode, setSelectedInputMode] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "confidence">("newest");

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (selectedAssessment !== "all") query.set("assessment", selectedAssessment);
      if (selectedInputMode !== "all") query.set("inputMode", selectedInputMode);
      if (searchTerm.trim()) query.set("search", searchTerm);

      const res = await fetch(`/api/history?${query.toString()}`);
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
      }
    } catch {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [selectedAssessment, selectedInputMode, searchTerm]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this analysis record?")) return;

    try {
      const res = await fetch(`/api/analysis/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      alert("Failed to delete record.");
    }
  };

  const handleExportAll = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TruthLens_History_Archive.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "confidence") {
      return b.confidence - a.confidence;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <HistoryIcon className="w-4 h-4" />
              <span>DOSSIER ARCHIVE & SEARCH</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Analysis History
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Audit log of previously investigated articles, viral claims, and extracted screenshots.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAll}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export Archive (JSON)
            </button>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-900/30"
            >
              New Analysis
            </Link>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history by title, claim, or keywords..."
                className="w-full bg-[#0a0f1d] text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2 text-xs border border-slate-800 focus:border-cyan-500 outline-none"
              />
            </div>

            {/* Assessment Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedAssessment}
                onChange={(e) => setSelectedAssessment(e.target.value)}
                className="w-full bg-[#0a0f1d] text-slate-200 rounded-xl px-3 py-2 text-xs border border-slate-800 outline-none focus:border-cyan-500"
              >
                <option value="all">All Assessments</option>
                <option value="Likely credible">Likely credible</option>
                <option value="Potentially misleading">Potentially misleading</option>
                <option value="Likely false">Likely false</option>
                <option value="Insufficient evidence">Insufficient evidence</option>
              </select>
            </div>

            {/* Mode Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedInputMode}
                onChange={(e) => setSelectedInputMode(e.target.value)}
                className="w-full bg-[#0a0f1d] text-slate-200 rounded-xl px-3 py-2 text-xs border border-slate-800 outline-none focus:border-cyan-500"
              >
                <option value="all">All Modes (Text, URL, Image)</option>
                <option value="text">Text / Post</option>
                <option value="url">URL Scraped</option>
                <option value="image">Image OCR</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
            <span>Showing {sortedItems.length} records</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Sort:</span>
              <button
                onClick={() => setSortBy("newest")}
                className={`px-2 py-0.5 rounded ${
                  sortBy === "newest" ? "bg-slate-800 text-cyan-400 font-semibold" : "hover:text-slate-200"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortBy("confidence")}
                className={`px-2 py-0.5 rounded ${
                  sortBy === "confidence" ? "bg-slate-800 text-cyan-400 font-semibold" : "hover:text-slate-200"
                }`}
              >
                Highest Confidence
              </button>
            </div>
          </div>
        </div>

        {/* HISTORY ITEMS LIST */}
        {isLoading ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400">Loading historical records...</p>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-4">
            <HistoryIcon className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Verification Records Match</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No analyses found matching your search query or filter criteria. Try resetting the filters or analyze a new story.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
            >
              Analyze a Story Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <AssessmentBadge assessment={item.overallAssessment} size="sm" />
                    <span className="text-xs font-mono text-slate-400">
                      {Math.round(item.confidence * 100)}% model confidence
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {item.inputMode}
                    </span>
                    {item.isDemo && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        DEMO
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/results/${item.id}`}
                    className="text-base font-bold text-white hover:text-cyan-400 transition-colors line-clamp-1 block"
                  >
                    {item.title}
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-2">{item.summary}</p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-0.5">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-slate-400" />
                      {item.claimsCount} Claims
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    {item.publisher && (
                      <>
                        <span>•</span>
                        <span>{item.publisher}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    href={`/results/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Inspect
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  {!item.isDemo && (
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
