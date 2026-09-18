import React from "react";
import Link from "next/link";
import {
  Shield,
  Search,
  CheckCircle,
  AlertTriangle,
  FileSearch,
  Fingerprint,
  Languages,
  Lock,
  ArrowRight,
  Database,
  Layers,
  BarChart3,
  Scale,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { AssessmentBadge, ClaimBadge } from "@/components/ui/badges";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden intelligence-grid">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-300 shadow-md mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AI-POWERED MISINFORMATION INTELLIGENCE ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Can you trust what you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
              just read?
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            TruthLens AI analyzes claims, language, sources, and available evidence to help you investigate potentially misleading information.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-cyan-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="w-5 h-5" />
              Analyze a Story
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 hover:border-cyan-700/50 transition-all"
            >
              See How It Works
            </a>
          </div>

          {/* ANIMATED INTERACTIVE PREVIEW CARD */}
          <div className="mt-16 max-w-4xl mx-auto text-left">
            <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <span>LIVE INTELLIGENCE DOSSIER</span>
                    <span>•</span>
                    <span>#TL-2024-8841</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    NASA JWST Spectroscopically Confirms Earliest Galaxy GLASS-z12
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Source: The Astrophysical Journal Letters | Author: Dr. Curtis-Lake | Date: 2024-03-15
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <AssessmentBadge assessment="Likely credible" size="md" />
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-mono">MODEL CONFIDENCE</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">94% AI Confidence</div>
                  </div>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-slate-800/80">
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Atomic Claims</span>
                    <span className="font-mono text-cyan-400">2 Verified</span>
                  </div>
                  <div className="text-lg font-bold text-slate-100 mt-1">100% Supported</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">No contradictions detected</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Clickbait Score</span>
                    <span className="font-mono text-emerald-400">8 / 100</span>
                  </div>
                  <div className="text-lg font-bold text-slate-100 mt-1">Neutral Reporting</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Free from urgency manipulation</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Source Transparency</span>
                    <span className="font-mono text-cyan-400">95 / 100</span>
                  </div>
                  <div className="text-lg font-bold text-slate-100 mt-1">High Credibility</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Byline, date & primary DOI cited</div>
                </div>
              </div>

              {/* Sample Claim Card */}
              <div className="pt-5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Sample Atomic Claim Decomposition
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                          CLAIM #1
                        </span>
                        <ClaimBadge status="Supported" />
                        <span className="text-xs text-slate-400 font-mono">96% confidence</span>
                      </div>
                      <p className="text-sm font-medium text-slate-200">
                        &ldquo;JWST confirmed distant galaxy GLASS-z12 dating to ~350 million years after the Big Bang with redshift z=12.1.&rdquo;
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <span className="text-slate-300 font-semibold">Corroborated Evidence:</span> NIRSpec multi-object spectroscopy established redshift z=12.11 for GLASS-z12, published in The Astrophysical Journal Letters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            INTELLIGENCE PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How TruthLens AI Deconstructs Misinformation
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Unlike simplistic &ldquo;Fake News: 95%&rdquo; black-boxes, TruthLens executes an explainable 12-stage analytical workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Multi-Modal Ingestion",
              desc: "Extract text from raw articles, live web URLs via automated HTML cleaning, or OCR image screenshots.",
              icon: Layers,
            },
            {
              step: "02",
              title: "Atomic Claim Extraction",
              desc: "Isolate individual factual assertions from opinions, rhetorical questions, and emotive padding.",
              icon: Fingerprint,
            },
            {
              step: "03",
              title: "Evidence Corroboration",
              desc: "Retrieve independent corroborating and contradicting facts from peer-reviewed records and public agencies.",
              icon: FileSearch,
            },
            {
              step: "04",
              title: "Explainable Synthesis",
              desc: "Generate calibrated assessments with clickbait scores, sentiment heatmaps, and explicit uncertainty boundaries.",
              icon: Scale,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 relative border border-slate-800"
              >
                <div className="text-3xl font-black font-mono text-slate-700/60 absolute top-4 right-5">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CLAIM VERIFICATION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              GRANULAR VERIFICATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Claim-Level Analysis: No Generic Blanket Labels
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Misinformation rarely arrives as 100% false stories. Most viral deceptions blend genuine facts with distorted statistics, fabricated timelines, or out-of-context headlines.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Extracts factual propositions independently from conversational text.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Classifies each claim: Supported, Contradicted, Unverified, or Misleading Context.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Explains precisely why each claim triggered verification flags.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-rose-400 font-semibold">CLAIM #1</span>
                <ClaimBadge status="Contradicted" />
              </div>
              <p className="text-sm font-medium text-slate-200">
                &ldquo;Natural Himalayan Root Extract Cures 98% of Diabetes Overnight&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-2">
                <strong className="text-rose-300">Why flagged:</strong> Medically contradicted by American Diabetes Association standards. Type 2 Diabetes mechanisms cannot be reversed in 48 hours.
              </p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400 font-semibold">CLAIM #2</span>
                <ClaimBadge status="Misleading context" />
              </div>
              <p className="text-sm font-medium text-slate-200">
                &ldquo;Doctors are BEGGING citizens to throw away common cooking oil before midnight&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-2">
                <strong className="text-amber-300">Why flagged:</strong> Distorts standard lipid smoke-point guidelines into an acute emergency countdown hazard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EVIDENCE EXPLORER & DISTINCTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            EVIDENTIARY TRANSPARENCY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Evidence Explorer: Retrieved Facts vs AI Interpretation
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            We strictly separate independently retrieved real-world source citations from model-generated linguistic deductions. If reliable evidence cannot be found, we state: &ldquo;No sufficient evidence was found.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
              <CheckCircle className="w-4 h-4" />
              Supporting Evidence
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quotes, published DOI papers, and regulatory releases that corroborate factual elements of the claim.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-300 font-semibold">NASA Science Directorate:</span> Spectroscopic confirmation of GLASS-z12 redshift z=12.1.
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              Contradicting Evidence
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official debunkings, scientific literature, and primary registries that refute false claims.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-300 font-semibold">Reuters Fact Check / Central Bank:</span> Official denial of confidential ATM freeze notice #4910.
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-3">
              <Clock className="w-4 h-4" />
              Context & Timeline Checks
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detects temporal displacement when legitimate disaster footage from 2017 is recirculated as breaking news today.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-300 font-semibold">Historical Disaster Match:</span> Hurricane Harvey levee footage recirculated 7 years later.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOURCE ANALYSIS & CLICKBAIT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Source Analysis */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Source Transparency Audit</h3>
                <p className="text-xs text-slate-400">Metadata, Byline & Editorial Standards</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              TruthLens never marks a domain untrustworthy solely by its web address. Instead, we inspect concrete transparency indicators:
            </p>
            <div className="space-y-2.5 text-xs text-slate-300">
              {[
                "Author clearly identified with verifiable journalistic byline",
                "Explicit publication date & timestamp consistency",
                "Verifiable primary source citations and DOI references",
                "Recognized institutional editorial governance",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clickbait Detection */}
          <div className="glass-card rounded-2xl p-8 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Clickbait & Urgency Detector</h3>
                <p className="text-xs text-slate-400">Exact Phrase Extraction & Superlative Flags</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Clickbait is not automatically misinformation. We isolate psychological manipulation triggers from factual substance:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "SHOCKING",
                "BEGGING YOU",
                "Before Midnight!!",
                "Big Pharma Secret",
                "100% CURES",
                "Forward to 10 Groups",
              ].map((phrase, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-rose-950/50 text-rose-300 border border-rose-800/60 line-through"
                >
                  {phrase}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 italic">
              Highlighted phrases reveal curiosity gaps, fabricated countdown timers, and emotional extortion patterns.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: MULTILINGUAL, EXPLAINABLE AI, PRIVACY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-cyan-400 mb-4">
              <Languages className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multilingual Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects translation artifacts, cross-lingual misinformation narratives, and forwarded messages originating in global communities.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Explainable AI (XAI)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every flagged claim includes transparent rationales. Confidence percentages represent algorithmic model certainty, never absolute truth.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-center justify-center text-teal-400 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Privacy & Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero client-side API key leakage. Strict SSRF protections on URL scraping and client-controlled data purge options.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="glass-card rounded-3xl p-10 sm:p-16 border border-cyan-800/50 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to verify your first story?
          </h2>
          <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
            Paste an article, enter a live news URL, or upload a screenshot to inspect claim-level truthfulness in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-cyan-900/30 transition-all hover:scale-[1.02]"
            >
              <Search className="w-5 h-5" />
              Launch TruthLens Analyzer
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
