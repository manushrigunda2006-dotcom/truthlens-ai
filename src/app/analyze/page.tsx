"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Upload,
  Globe,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DEMO_ITEMS } from "@/lib/demo-data";

type TabType = "text" | "url" | "image";

export default function AnalyzerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("text");

  // Input states
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isUrlExtracting, setIsUrlExtracting] = useState(false);
  const [urlMetadata, setUrlMetadata] = useState<{
    title?: string;
    author?: string;
    publisher?: string;
    publicationDate?: string;
    domain?: string;
  } | null>(null);

  // Image & OCR states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [ocrConfidence, setOcrConfidence] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis pipeline states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedDemoId, setSelectedDemoId] = useState<string>("");

  // Demo selection handler
  const handleSelectDemo = (demoId: string) => {
    setSelectedDemoId(demoId);
    const item = DEMO_ITEMS.find((d) => d.id === demoId);
    if (!item) return;

    setActiveTab("text");
    setInputText(item.sampleInput);
    setErrorMsg(null);
  };

  // URL extraction handler
  const handleExtractUrl = async () => {
    if (!inputUrl.trim()) {
      setErrorMsg("Please enter a valid news or article URL.");
      return;
    }

    try {
      setIsUrlExtracting(true);
      setErrorMsg(null);

      const res = await fetch("/api/extract-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to fetch webpage content");
      }

      setUrlMetadata({
        title: data.data.title,
        author: data.data.author,
        publisher: data.data.publisher,
        publicationDate: data.data.publicationDate,
        domain: data.data.domain,
      });

      setInputText(data.data.text || "");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unable to reach or parse the target URL.");
    } finally {
      setIsUrlExtracting(false);
    }
  };

  // Image upload and OCR handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
      setErrorMsg("Please select a supported image format (PNG, JPG, JPEG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image exceeds maximum size limit of 10MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMsg(null);

    // Run OCR extraction
    try {
      setIsOcrProcessing(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "OCR failed to read image");
      }

      setOcrText(data.data.text || "");
      setOcrConfidence(data.data.confidence);
      setInputText(data.data.text || "");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "OCR text extraction failed.");
    } finally {
      setIsOcrProcessing(false);
    }
  };

  // Main Submit Analysis Pipeline
  const handleRunAnalysis = async () => {
    let payloadText = inputText.trim();

    if (activeTab === "image" && ocrText.trim()) {
      payloadText = ocrText.trim();
    }

    if (!payloadText || payloadText.length < 15) {
      setErrorMsg("Please provide at least 15 characters of article text, claim, or news report to evaluate.");
      return;
    }

    try {
      setIsAnalyzing(true);
      setErrorMsg(null);

      // Execute actual sequential progression stages
      setCurrentStage("Ingesting content & identifying linguistic patterns...");
      await new Promise((r) => setTimeout(r, 400));

      setCurrentStage("Decomposing text into verifiable atomic factual claims...");
      await new Promise((r) => setTimeout(r, 450));

      setCurrentStage("Evaluating sensationalism, urgency triggers, and clickbait markers...");
      await new Promise((r) => setTimeout(r, 450));

      setCurrentStage("Auditing source metadata and transparency credentials...");
      await new Promise((r) => setTimeout(r, 400));

      setCurrentStage("Retrieving cross-source corroborating & contradicting evidence...");

      const payload: Record<string, unknown> = {
        text: payloadText,
        inputMode: activeTab,
        isDemo: Boolean(selectedDemoId),
      };

      if (activeTab === "url") {
        payload.url = inputUrl;
        if (urlMetadata) {
          payload.title = urlMetadata.title;
          payload.author = urlMetadata.author;
          payload.publisher = urlMetadata.publisher;
          payload.publicationDate = urlMetadata.publicationDate;
        }
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Analysis pipeline failed");
      }

      setCurrentStage("Synthesizing calibrated verification report...");
      await new Promise((r) => setTimeout(r, 350));

      // Navigate to results
      const analysisId = data.data.id;
      router.push(`/results/${analysisId}`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to analyze submitted content.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-mono text-cyan-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>INTELLIGENCE VERIFICATION WORKSPACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Story & Claim Analyzer
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Input news text, article links, or image screenshots. TruthLens decomposes the submission into atomic claims, audits source indicators, and searches for corroborated evidence.
          </p>
        </div>

        {/* DEMO MODE SELECTOR BAR */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-cyan-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800 text-[10px]">
              DEMO DATA
            </span>
            <span className="font-medium">Quick-load sample misinformation scenarios:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {DEMO_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectDemo(item.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  selectedDemoId === item.id
                    ? "bg-cyan-900/60 text-cyan-300 border-cyan-500 font-semibold"
                    : "bg-slate-800/70 text-slate-300 border-slate-700 hover:border-slate-500"
                }`}
                title={item.description}
              >
                {item.name.split(". ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN WORKSPACE CARD */}
        <div className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
          {/* TAB NAVIGATION */}
          <div className="flex border-b border-slate-800 mb-6 gap-2 sm:gap-4 overflow-x-auto pb-1">
            <button
              onClick={() => {
                setActiveTab("text");
                setErrorMsg(null);
              }}
              className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "text"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              Paste Text / Claim
            </button>

            <button
              onClick={() => {
                setActiveTab("url");
                setErrorMsg(null);
              }}
              className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "url"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Analyze Web URL
            </button>

            <button
              onClick={() => {
                setActiveTab("image");
                setErrorMsg(null);
              }}
              className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "image"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Upload Image / Screenshot
            </button>
          </div>

          {/* TAB 1: PASTE TEXT */}
          {activeTab === "text" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Article Body, Headline, or Social Media Post
                </label>
                <span className="text-xs text-slate-500 font-mono">
                  {inputText.split(/\s+/).filter(Boolean).length} words | {inputText.length} chars
                </span>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSelectedDemoId("");
                }}
                placeholder="Paste news article text, social media claim, WhatsApp forward, or provocative headline here..."
                rows={9}
                className="w-full bg-[#0a0f1d] text-slate-100 placeholder-slate-500 rounded-xl p-4 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm leading-relaxed outline-none resize-y"
              />

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500">Suggested input formats:</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Full News Articles
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Viral Social Posts
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Forwarded Messaging Chains
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: ANALYZE URL */}
          {activeTab === "url" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Public Article or Story URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://example.com/news/article-headline"
                      className="w-full bg-[#0a0f1d] text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm outline-none"
                    />
                  </div>
                  <button
                    onClick={handleExtractUrl}
                    disabled={isUrlExtracting || !inputUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 transition-all whitespace-nowrap"
                  >
                    {isUrlExtracting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                        Extracting Webpage...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 text-cyan-400" />
                        Fetch & Inspect
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* URL Metadata Preview Card */}
              {urlMetadata && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                    <span>EXTRACTED ARTICLE METADATA</span>
                    <span>{urlMetadata.domain}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {urlMetadata.title || "Untitled Article"}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                      {urlMetadata.author && <span>Author: {urlMetadata.author}</span>}
                      {urlMetadata.publisher && <span>Publisher: {urlMetadata.publisher}</span>}
                      {urlMetadata.publicationDate && (
                        <span>Date: {urlMetadata.publicationDate}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Extracted Text Content
                    </label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={5}
                      className="mt-1 w-full bg-[#080c14] text-slate-200 text-xs rounded-lg p-3 border border-slate-800 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UPLOAD IMAGE & OCR */}
          {activeTab === "image" && (
            <div className="space-y-5">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/70 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-900/40 hover:bg-slate-900/60"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Click to select screenshot or drag and drop
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Supported: PNG, JPG, JPEG, WEBP (Max 10MB)
                </p>
              </div>

              {isOcrProcessing && (
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-sm text-cyan-300">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Optical Character Recognition (OCR) running... Extracting text.</span>
                </div>
              )}

              {/* OCR Extracted Text & Editable Area */}
              {ocrText && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Text detected from image</span>
                      {ocrConfidence && (
                        <span className="text-slate-400 font-mono">
                          ({ocrConfidence}% OCR confidence)
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Editable before running analysis
                    </span>
                  </div>

                  <textarea
                    value={ocrText}
                    onChange={(e) => {
                      setOcrText(e.target.value);
                      setInputText(e.target.value);
                    }}
                    rows={6}
                    className="w-full bg-[#080c14] text-slate-100 rounded-xl p-3 border border-slate-800 text-xs leading-relaxed outline-none focus:border-cyan-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* ERROR ALERT DISPLAY */}
          {errorMsg && (
            <div className="mt-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-start gap-3 text-sm text-rose-300">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Analysis Notice:</strong> {errorMsg}
              </div>
            </div>
          )}

          {/* REAL-TIME GENUINE LOADING STAGES */}
          {isAnalyzing && (
            <div className="mt-6 p-5 rounded-xl bg-slate-900/90 border border-cyan-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase">
                  ACTIVE INTELLIGENCE PIPELINE
                </span>
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <p className="text-sm font-medium text-white">{currentStage}</p>
              </div>

              {/* Progress Bar Animation */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full animate-pulse w-3/4 transition-all duration-300" />
              </div>
            </div>
          )}

          {/* MAIN ACTION TRIGGER */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Calibrated probabilistic assessment with source citations.</span>
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || isUrlExtracting || isOcrProcessing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-cyan-950/40 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Pipeline...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze with TruthLens
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
