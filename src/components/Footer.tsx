import React from "react";
import Link from "next/link";
import { Shield, ExternalLink, Info, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#06090f] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Col 1: Brand & Tagline */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white tracking-tight">TRUTHLENS AI</span>
          </div>
          <p className="text-sm font-medium text-cyan-400/90 italic">
            &ldquo;Analyze the claim. Examine the evidence. Understand the context.&rdquo;
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
            TruthLens AI is an open-source intelligence verification framework built for journalists, fact-checkers, and citizens. We decompose multi-modal content into atomic claims, evaluate linguistic manipulation, and cross-reference peer-reviewed and primary investigative records.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Explainable AI
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Grounded Evidence
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Secret Bias
            </span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Platform Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/analyze" className="hover:text-cyan-400 transition-colors">
                Story Analyzer
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                Intelligence Dashboard
              </Link>
            </li>
            <li>
              <Link href="/history" className="hover:text-cyan-400 transition-colors">
                Analysis Archive
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-cyan-400 transition-colors">
                Investigation Dossiers
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-cyan-400 transition-colors">
                Admin Console
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Principles & Methodology */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Core Principles
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Never outputs binary true/false proof.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Distinguishes clickbait from disinformation.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Detects temporal and historical decontextualization.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>No user secret keys exposed in client bundles.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Disclaimer */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} TruthLens AI Intelligence Platform. Automated analysis is not definitive proof of truth or falsehood. Verify important information using primary and authoritative sources.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/settings" className="hover:text-slate-300">
            Engine Config
          </Link>
          <span className="text-slate-700">|</span>
          <span className="font-mono text-cyan-500/80">v2.4.0-prod</span>
        </div>
      </div>
    </footer>
  );
}
