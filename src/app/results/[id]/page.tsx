"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  Share2,
  Download,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Calendar,
  User,
  Globe,
  Flame,
  Activity,
  Printer,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  Copy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AssessmentBadge, ClaimBadge } from "@/components/ui/badges";
import { AnalysisResult, ClaimStatus } from "@/types";

export default function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Expandable claim cards state
  const [expandedClaims, setExpandedClaims] = useState<Record<number, boolean>>({
    1: true, // Expand first claim by default
  });

  // Feedback state
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Report Modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string>("flawed_analysis");
  const [reportDetails, setReportDetails] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Copy state
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/analysis/${id}`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "Analysis not found");
        }

        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report");
      } finally {
        setIsLoading(false);
      }
    }
    loadAnalysis();
  }, [id]);

  const toggleClaim = (claimNumber: number) => {
    setExpandedClaims((prev) => ({
      ...prev,
      [claimNumber]: !prev[claimNumber],
    }));
  };

  const handleFeedback = async (rating: "helpful" | "unhelpful") => {
    try {
      setIsSubmittingFeedback(true);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysisId: id,
          rating,
          comments: feedbackComment,
        }),
      });
      if (res.ok) {
        setFeedbackGiven(rating);
        setFeedbackSuccess(true);
      }
    } catch {
      // Ignore
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmittingReport(true);
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysisId: id,
          reason: reportReason,
          details: reportDetails,
        }),
      });
      if (res.ok) {
        setReportSuccess(true);
        setTimeout(() => setIsReportModalOpen(false), 2000);
      }
    } catch {
      // Ignore
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TruthLens_Analysis_${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
          <p className="text-sm font-mono text-cyan-400">
            DECODING VERIFICATION DOSSIER...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-4">
            <XCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Verification Record Not Found
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            {error || "The requested verification analysis does not exist or has expired."}
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze a New Story
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const confidencePercent = Math.round(data.confidence * 100);

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Analyzer
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {data.isDemo && (
              <span className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-800 text-amber-300 text-xs font-bold font-mono">
                DEMO DATA
              </span>
            )}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Share Link
                </>
              )}
            </button>
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Dossier
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-800/40 text-xs font-medium text-rose-300 hover:text-rose-200 transition-colors"
            >
              <Flag className="w-3.5 h-3.5 text-rose-400" />
              Report Issue
            </button>
          </div>
        </div>

        {/* TOP SECTION: TRUTHLENS ANALYSIS OVERVIEW */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Shield className="w-4 h-4" />
                <span>TRUTHLENS VERIFICATION REPORT</span>
                <span>•</span>
                <span>ID: {data.id?.slice(0, 16) || "TL-LIVE"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {data.title || "Submitted Story Analysis"}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                {data.publisher && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    Publisher: {data.publisher}
                  </span>
                )}
                {data.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    Byline: {data.author}
                  </span>
                )}
                {data.publicationDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Reported Date: {data.publicationDate}
                  </span>
                )}
              </div>
            </div>

            {/* Assessment and Confidence Badge */}
            <div className="flex sm:flex-row items-start sm:items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shrink-0">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  OVERALL ASSESSMENT
                </div>
                <AssessmentBadge assessment={data.overallAssessment} size="lg" />
              </div>

              <div className="border-l border-slate-800 pl-4 space-y-0.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  AI CONFIDENCE
                </div>
                <div className="text-2xl font-black font-mono text-cyan-400">
                  {confidencePercent}%
                </div>
                <div className="text-[10px] text-slate-500 max-w-[110px] leading-tight">
                  Model confidence, not absolute fact
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="pt-6">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
              EXECUTIVE INTELLIGENCE SUMMARY
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {data.summary}
            </p>
          </div>

          {/* MANDATORY LEGAL & SCIENTIFIC DISCLAIMER */}
          <div className="mt-5 p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/50 flex items-start gap-2.5 text-xs text-blue-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Standard Verification Disclaimer:</strong> Automated analysis is not definitive proof of truth or falsehood. Verify important information using primary and authoritative sources.
            </div>
          </div>
        </div>

        {/* SECTION: CLAIM-LEVEL ANALYSIS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Claim-Level Analysis
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Atomic factual assertions isolated from the submitted content.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
              {data.claims?.length || 0} Claims Evaluated
            </span>
          </div>

          <div className="space-y-4">
            {data.claims?.map((claim) => {
              const isExpanded = expandedClaims[claim.claimNumber] ?? false;

              return (
                <div
                  key={claim.claimNumber}
                  className="glass-card rounded-xl border border-slate-800 overflow-hidden transition-all"
                >
                  {/* Claim Card Header */}
                  <div
                    onClick={() => toggleClaim(claim.claimNumber)}
                    className="p-5 cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                          CLAIM #{claim.claimNumber}
                        </span>
                        <ClaimBadge status={claim.status} />
                        <span className="text-xs font-mono text-slate-400">
                          {Math.round(claim.confidence * 100)}% model confidence
                        </span>
                      </div>

                      <p className="text-base font-semibold text-slate-100">
                        &ldquo;{claim.claimText}&rdquo;
                      </p>
                    </div>

                    <button
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      aria-label="Toggle Claim Details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Claim Body */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-800/70 space-y-4 bg-slate-900/30">
                      {/* Why this was flagged */}
                      <div className="mt-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-cyan-400" />
                          WHY THIS WAS FLAGGED / EVALUATED
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                          {claim.explanation}
                        </p>
                      </div>

                      {/* Associated Claim Evidence */}
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          CORROBORATING & CONTRADICTING EVIDENCE
                        </h4>

                        {claim.evidence && claim.evidence.length > 0 ? (
                          <div className="space-y-2">
                            {claim.evidence.map((ev, idx) => (
                              <div
                                key={idx}
                                className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                                  ev.type === "supporting"
                                    ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-200"
                                    : ev.type === "contradicting"
                                    ? "bg-rose-950/30 border-rose-800/40 text-rose-200"
                                    : "bg-slate-900 border-slate-800 text-slate-300"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`uppercase text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                        ev.type === "supporting"
                                          ? "bg-emerald-900/80 text-emerald-300"
                                          : ev.type === "contradicting"
                                          ? "bg-rose-900/80 text-rose-300"
                                          : "bg-slate-800 text-slate-400"
                                      }`}
                                    >
                                      {ev.type}
                                    </span>
                                    <span className="font-semibold text-slate-100">
                                      {ev.title}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {ev.isAIGenerated ? "AI Interpretation" : "Retrieved Evidence"}
                                  </span>
                                </div>

                                <p className="text-slate-300 leading-relaxed">{ev.snippet}</p>

                                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                                  <span>Source: {ev.sourceName}</span>
                                  {ev.url && (
                                    <a
                                      href={ev.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                                    >
                                      Verify Primary Link
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                            <Info className="w-4 h-4 text-cyan-400" />
                            <span>No sufficient external evidence was found for this specific assertion.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-COLUMN SECTION: CLICKBAIT DETECTOR & LANGUAGE ANALYSIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CLICKBAIT DETECTOR */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Clickbait & Urgency Detector</h3>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  data.clickbait?.score > 50
                    ? "bg-rose-950 text-rose-300 border border-rose-800"
                    : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                }`}
              >
                Score: {data.clickbait?.score ?? 0} / 100
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {data.clickbait?.explanation}
            </p>

            {data.clickbait?.flaggedPhrases && data.clickbait.flaggedPhrases.length > 0 && (
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                  FLAGGED SENSATIONAL OR URGENCY PHRASES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.clickbait.flaggedPhrases.map((phrase, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50 text-xs font-mono"
                    >
                      &ldquo;{phrase}&rdquo;
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Methodological Rule:</strong> Clickbait styling is emotional packaging, not proof of factual falsity.
              </span>
            </div>
          </div>

          {/* LANGUAGE & SENTIMENT ANALYSIS */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Language & Framing Analysis</h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                Sentiment: {data.languageAnalysis?.sentiment ?? "Neutral"}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Emotional Intensity</span>
                <span className="font-mono">{data.languageAnalysis?.emotionalIntensity ?? 10}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                  style={{ width: `${data.languageAnalysis?.emotionalIntensity ?? 10}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px]">Fear Score</span>
                <div className="font-bold text-slate-200 mt-0.5">{data.languageAnalysis?.fearScore ?? 0}%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px]">Anger Score</span>
                <div className="font-bold text-slate-200 mt-0.5">{data.languageAnalysis?.angerScore ?? 0}%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px]">Sensationalism</span>
                <div className="font-bold text-slate-200 mt-0.5">{data.languageAnalysis?.sensationalScore ?? 0}%</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {data.languageAnalysis?.toneSummary}
            </p>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Methodological Rule:</strong> Emotional language does not inherently indicate falsehood.
              </span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN SECTION: SOURCE TRANSPARENCY & CONTEXT CHECK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SOURCE TRANSPARENCY ANALYZER */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Source Transparency Indicators</h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                {data.sourceAnalysis?.transparencyScore ?? 50} / 100
              </span>
            </div>

            <div className="space-y-2">
              {[
                {
                  label: "Author Clearly Identified",
                  active: data.sourceAnalysis?.indicators?.authorIdentified,
                },
                {
                  label: "Publication Date Available",
                  active: data.sourceAnalysis?.indicators?.publicationDateAvailable,
                },
                {
                  label: "Independent Sources / Studies Cited",
                  active: data.sourceAnalysis?.indicators?.sourcesCited,
                },
                {
                  label: "Primary References / DOIs Linked",
                  active: data.sourceAnalysis?.indicators?.primarySourcesReferenced,
                },
                {
                  label: "Editorial & Publisher Information Present",
                  active: data.sourceAnalysis?.indicators?.editorialInfoAvailable,
                },
              ].map((ind, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs"
                >
                  <span className="text-slate-300">{ind.label}</span>
                  {ind.active ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <XCircle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 italic">
              {data.sourceAnalysis?.credibilityNote}
            </p>
          </div>

          {/* CONTEXT & TIME-GAP CHECK */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Context & Temporal Audit</h3>
            </div>

            {data.context?.isOutdatedContext ? (
              <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-2 text-amber-200 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Outdated Context / Recycled Event Warning</span>
                </div>
                <p className="leading-relaxed">{data.context.contextExplanation}</p>
                {data.context.timeGapWarning && (
                  <p className="font-mono text-[11px] text-amber-400">{data.context.timeGapWarning}</p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Temporal Alignment Intact:</strong> No signs of recirculated legacy disaster footage or historical time displacement detected.
                </div>
              </div>
            )}

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                MODEL LIMITATIONS & CAVEATS
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {data.limitations?.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* INTERACTIVE USER FEEDBACK WIDGET */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">
              Was this verification report helpful and accurate?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Your feedback refines our heuristic models and claim extraction rules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {feedbackSuccess ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Thank you for your feedback!
              </span>
            ) : (
              <>
                <button
                  onClick={() => handleFeedback("helpful")}
                  disabled={isSubmittingFeedback}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all hover:border-emerald-500"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                  Helpful & Accurate
                </button>
                <button
                  onClick={() => handleFeedback("unhelpful")}
                  disabled={isSubmittingFeedback}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all hover:border-rose-500"
                >
                  <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
                  Inaccurate / Flawed
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      {/* REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl max-w-md w-full p-6 border border-slate-700 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-400" />
                Report Analysis to Investigation Registry
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Report recorded in intelligence review queue.</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Reason for Reporting
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="flawed_analysis">Flawed AI Assessment / Inaccurate Reasoning</option>
                    <option value="misinformation">Severe High-Harm Disinformation</option>
                    <option value="hate_speech">Hate Speech or Harassment</option>
                    <option value="copyright">Copyright or Media Infringement</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Details & Specific Evidence Links
                  </label>
                  <textarea
                    required
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    rows={4}
                    placeholder="Describe why this report is flawed or requires human investigation..."
                    className="w-full bg-[#080c14] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReport || reportDetails.length < 10}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold disabled:opacity-50"
                  >
                    {isSubmittingReport ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
