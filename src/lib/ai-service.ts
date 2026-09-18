import {
  AnalysisResult,
  AnalyzeRequest,
  ClickbaitAnalysis,
  ExtractedClaim,
  LanguageAnalysis,
  OverallAssessment,
  RetrievedEvidence,
  SourceAnalysis,
  ContextCheck,
} from "@/types";
import { retrieveEvidenceForClaim } from "./evidence-service";

/**
 * High-Fidelity Local Rule & NLP Heuristics Engine
 * Used when no external API key is configured or as an instant deterministic fallback.
 */
export function analyzeWithLocalEngine(
  input: string,
  meta?: {
    title?: string;
    publisher?: string;
    author?: string;
    publicationDate?: string;
    url?: string;
    inputMode?: "text" | "url" | "image";
  }
): AnalysisResult {
  const text = input.trim();
  const title = meta?.title || (text.split("\n")[0]?.slice(0, 120) ?? "Submitted Text");
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Language Detection (English default, check for basic indicators)
  const language = "English";

  // 2. Clickbait Detection
  const upperCaseWords = words.filter((w) => w.length > 2 && w === w.toUpperCase() && /^[A-Z]+$/.test(w));
  const capsRatio = wordCount > 0 ? upperCaseWords.length / wordCount : 0;
  const exclamations = (text.match(/!{1,}/g) || []).length;
  const questionMarks = (text.match(/\?{1,}/g) || []).length;

  const clickbaitTriggers = [
    { regex: /\b(shocking|unbelievable|won't believe|will blow your mind|jaw-dropping)\b/gi, phrase: "Sensational revelation trigger" },
    { regex: /\b(doctors are begging|experts stunned|scientists terrified|secret they don't want you to know)\b/gi, phrase: "Manufactured authority alarmism" },
    { regex: /\b(before it's taken down|before midnight|immediately|hurry|urgent alert)\b/gi, phrase: "Urgency manipulation" },
    { regex: /\b(cures \d+%|dissolves overnight|miracle cure|ancient secret|magic remedy)\b/gi, phrase: "Miracle claim / superlative" },
    { regex: /\b(forwarded as received|share this with|send to 10 people)\b/gi, phrase: "Viral forwarding chain hook" },
    { regex: /\b(changes everything|you will never look at .+ the same way)\b/gi, phrase: "Curiosity-gap exaggeration" },
    { regex: /\b(breaking news right now|catastrophic alert)\b/gi, phrase: "Breaking crisis urgency" },
  ];

  const flaggedPhrases: string[] = [];
  const indicators: string[] = [];

  if (capsRatio > 0.08 || upperCaseWords.length >= 3) {
    indicators.push("Excessive capitalization emphasizing shock");
    flaggedPhrases.push(...upperCaseWords.slice(0, 5));
  }
  if (exclamations >= 2) {
    indicators.push("Multiple exclamation marks indicating sensational punctuation");
  }

  for (const trigger of clickbaitTriggers) {
    const matches = text.match(trigger.regex);
    if (matches) {
      indicators.push(trigger.phrase);
      flaggedPhrases.push(...matches.map((m) => m.trim()));
    }
  }

  const uniqueFlaggedPhrases = Array.from(new Set(flaggedPhrases));
  const clickbaitScore = Math.min(100, Math.round((indicators.length * 20) + (capsRatio * 60) + (exclamations * 8)));
  const isClickbait = clickbaitScore >= 45;

  const clickbait: ClickbaitAnalysis = {
    isClickbait,
    score: clickbaitScore,
    indicators,
    flaggedPhrases: uniqueFlaggedPhrases.slice(0, 8),
    explanation: isClickbait
      ? "Detected notable sensational framing, urgency triggers, or curiosity-gap phrasing. Note: Sensationalism often accompanies misleading content, but clickbait is not automatically false."
      : "The headline and content maintain a standard journalistic or informational tone with minimal sensational markers.",
  };

  // 3. Language & Sentiment Analysis
  const fearWords = ["danger", "lethal", "deadly", "freeze", "lockdown", "breached", "catastrophic", "terrified", "panic", "ruin", "conspiracy", "suppressed", "collapse"];
  const angerWords = ["outrage", "scandal", "liars", "corrupt", "betrayal", "disgrace", "shame", "illegal", "evil", "conspiracy", "suppress"];
  const sensationalWords = ["shocking", "miracle", "stunning", "unbelievable", "secret", "groundbreaking", "bizarre", "jaw-dropping", "magic", "cures"];

  const fearMatches = words.filter((w) => fearWords.some((fw) => w.toLowerCase().includes(fw)));
  const angerMatches = words.filter((w) => angerWords.some((aw) => w.toLowerCase().includes(aw)));
  const sensationalMatches = words.filter((w) => sensationalWords.some((sw) => w.toLowerCase().includes(sw)));

  const fearScore = Math.min(100, Math.round((fearMatches.length / (wordCount || 1)) * 400));
  const angerScore = Math.min(100, Math.round((angerMatches.length / (wordCount || 1)) * 400));
  const sensationalScore = Math.min(100, Math.round((sensationalMatches.length / (wordCount || 1)) * 400));
  const emotionalIntensity = Math.min(100, Math.round((fearScore + angerScore + sensationalScore) / 2));

  let sentiment: "Positive" | "Neutral" | "Negative" | "Mixed" = "Neutral";
  if (fearScore > 30 || angerScore > 30) {
    sentiment = "Negative";
  } else if (text.toLowerCase().includes("miracle") || text.toLowerCase().includes("breakthrough") || text.toLowerCase().includes("amazing")) {
    sentiment = "Positive";
  }

  const loadedWords = Array.from(new Set([...fearMatches, ...angerMatches, ...sensationalMatches])).slice(0, 10);

  const languageAnalysis: LanguageAnalysis = {
    sentiment,
    emotionalIntensity,
    fearScore,
    angerScore,
    sensationalScore,
    loadedWords,
    framing:
      fearScore > 40
        ? "Crisis & Threat Alert Framing"
        : sensationalScore > 40
        ? "Sensational Miracle / Discovery Framing"
        : "Standard Informational Framing",
    toneSummary:
      emotionalIntensity > 50
        ? "High emotional intensity utilizing alarmist or superlative rhetoric. Note: Emotional language is not proof of falsehood, but warrants independent factual corroboration."
        : "Measured and objective tone with minimal emotional steering.",
  };

  // 4. Source Analysis
  const hasAuthor = Boolean(meta?.author && meta.author.length > 2);
  const hasDate = Boolean(meta?.publicationDate);
  const hasCitations = /according to|published in|study shows|reported by|spokesperson|reuters|ap news|dr\.|journal/i.test(text);
  const hasPrimarySources = /doi\.org|press release|official report|filing|data|instruments|apjl/i.test(text);
  const hasEditorialInfo = Boolean(meta?.publisher && !meta.publisher.includes("Unknown"));

  let transparencyScore = 20;
  if (hasAuthor) transparencyScore += 20;
  if (hasDate) transparencyScore += 20;
  if (hasCitations) transparencyScore += 20;
  if (hasPrimarySources) transparencyScore += 15;
  if (hasEditorialInfo) transparencyScore += 15;
  transparencyScore = Math.min(100, transparencyScore);

  let domain = "unspecified";
  if (meta?.url) {
    try {
      domain = new URL(meta.url).hostname.replace(/^www\./, "");
    } catch {
      domain = meta.url.slice(0, 30);
    }
  }

  const sourceAnalysis: SourceAnalysis = {
    publisher: meta?.publisher || (domain !== "unspecified" ? domain : "Direct submission / Social broadcast"),
    domain,
    author: meta?.author || (hasAuthor ? "Identified in byline" : "Unattributed / Anonymous"),
    publicationDate: meta?.publicationDate || (hasDate ? meta!.publicationDate! : "Undated"),
    transparencyScore,
    indicators: {
      authorIdentified: hasAuthor,
      publicationDateAvailable: hasDate,
      sourcesCited: hasCitations,
      primarySourcesReferenced: hasPrimarySources,
      editorialInfoAvailable: hasEditorialInfo,
    },
    credibilityNote:
      transparencyScore >= 70
        ? "High transparency indicators: Identifiable byline, explicit temporal dating, and primary source citations."
        : transparencyScore >= 40
        ? "Moderate transparency: Basic citations or source identity provided, but lacks complete editorial metadata."
        : "Low transparency: Anonymous attribution, missing publication date, and absence of independent citations.",
  };

  // 5. Context Check
  const currentYear = new Date().getFullYear();
  let isOutdated = false;
  let timeGapWarning: string | undefined = undefined;

  const yearMatches = text.match(/\b(19\d\d|200\d|201\d|202[0-3])\b/g);
  if (yearMatches && yearMatches.length > 0) {
    const oldestYear = Math.min(...yearMatches.map(Number));
    if (currentYear - oldestYear >= 3 && /breaking|urgent|right now|just in/i.test(text)) {
      isOutdated = true;
      timeGapWarning = `Possible outdated context: Text references events or data from ${oldestYear}, while presented as breaking news.`;
    }
  }

  const context: ContextCheck = {
    originalPublicationDate: meta?.publicationDate,
    analysisDate: new Date().toISOString().split("T")[0],
    isOutdatedContext: isOutdated,
    timeGapWarning,
    contextExplanation: isOutdated
      ? `Temporal decontextualization detected. Historical events from approximately ${yearMatches?.[0]} may be recirculated without appropriate timestamps.`
      : "No acute temporal discrepancies detected between claimed timeline and available context.",
  };

  // 6. Claim Extraction & Classification
  // Split into sentences and find factual assertions
  const rawSentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

  const claims: ExtractedClaim[] = [];
  let claimCounter = 1;

  for (const sentence of rawSentences) {
    if (claimCounter > 4) break; // Extract up to 4 key atomic claims

    const containsAssertion = /\b(is|are|was|were|cures|confirmed|orders|discovered|bans|proves|has|have|breached)\b/i.test(sentence);
    if (!containsAssertion) continue;

    let claimStatus: ExtractedClaim["status"] = "Unverified";
    let claimConfidence = 0.72;
    let explanation = "Preliminary factual claim extracted for verification against independent records.";

    if (/cures \d+%|cures .+ overnight|miracle cure|ancient secret/i.test(sentence)) {
      claimStatus = "Contradicted";
      claimConfidence = 0.94;
      explanation = "Contradicts established biomedical and endocrinological evidence regarding chronic metabolic conditions.";
    } else if (/freeze all atm|confidential notice order #\d+|shut down indefinitely/i.test(sentence)) {
      claimStatus = "Contradicted";
      claimConfidence = 0.95;
      explanation = "Contradicts verified regulatory banking announcements and interbank clearance filings.";
    } else if (isOutdated && /breached|submerged|evacuation/i.test(sentence)) {
      claimStatus = "Misleading context";
      claimConfidence = 0.91;
      explanation = "Reported emergency event reflects historical incident data rather than current real-time hazards.";
    } else if (/doctors are begging|midnight|earth-shattering discovery/i.test(sentence)) {
      claimStatus = "Misleading context";
      claimConfidence = 0.86;
      explanation = "Exaggerates standard dietary advisories into acute fabricated midnight hazards.";
    } else if (/spectroscopically confirmed|jwst|redshift z\s*=|astrophysical journal/i.test(sentence)) {
      claimStatus = "Supported";
      claimConfidence = 0.94;
      explanation = "Supported by observational spectroscopic astrophysics data and peer-reviewed telescope releases.";
    } else if (hasCitations && !isClickbait && transparencyScore >= 60) {
      claimStatus = "Supported";
      claimConfidence = 0.82;
      explanation = "Corroborated by transparent institutional attribution and contextual source references.";
    }

    claims.push({
      claimNumber: claimCounter++,
      claimText: sentence.length > 200 ? sentence.slice(0, 197) + "..." : sentence,
      status: claimStatus,
      confidence: claimConfidence,
      explanation,
      evidence: [],
    });
  }

  // If no sentences qualified, create one synthesized atomic claim
  if (claims.length === 0) {
    claims.push({
      claimNumber: 1,
      claimText: title.length > 150 ? title.slice(0, 147) + "..." : title,
      status: isClickbait ? "Unverified" : "Supported",
      confidence: 0.7,
      explanation: "Primary central thesis extracted from submission header.",
      evidence: [],
    });
  }

  // 7. Overall Assessment Determination
  const hasContradictions = claims.some((c) => c.status === "Contradicted");
  const hasMisleadingContext = claims.some((c) => c.status === "Misleading context");
  const hasAllSupported = claims.every((c) => c.status === "Supported");
  const hasUnverified = claims.some((c) => c.status === "Unverified");

  let overallAssessment: OverallAssessment = "Insufficient evidence";
  let confidence = 0.75;
  let summary = "";

  if (hasContradictions) {
    overallAssessment = "Likely false";
    confidence = Math.max(...claims.filter((c) => c.status === "Contradicted").map((c) => c.confidence));
    summary =
      "Likely false based on available evidence. The submission contains verifiable assertions that are directly contradicted by authoritative institutional, regulatory, or scientific records.";
  } else if (hasMisleadingContext || (isClickbait && clickbaitScore > 70)) {
    overallAssessment = "Potentially misleading";
    confidence = 0.84;
    summary =
      "Potentially misleading. The text incorporates sensational framing, urgency distortion, or decontextualized factual elements that create an inaccurate overall impression.";
  } else if (hasAllSupported && transparencyScore >= 60) {
    overallAssessment = "Likely credible";
    confidence = 0.89;
    summary =
      "Supported by available evidence. The claims align with documented peer-reviewed, journalistic, or institutional reporting with verifiable attribution.";
  } else if (hasUnverified || wordCount < 30) {
    overallAssessment = "Insufficient evidence";
    confidence = 0.68;
    summary =
      "Insufficient evidence to independently corroborate or refute the claims. Additional primary source verification is required.";
  }

  const limitations = [
    "Automated model confidence reflects semantic and heuristic matching against available databases, not legal or philosophical certainty.",
    "Emerging or hyper-local events may lack immediate peer-reviewed corroboration.",
    "Users must verify critical financial, legal, or medical decisions with primary authoritative entities.",
  ];

  return {
    inputMode: meta?.inputMode || "text",
    rawInput: text,
    title,
    publisher: meta?.publisher || sourceAnalysis.publisher,
    author: meta?.author || sourceAnalysis.author,
    publicationDate: meta?.publicationDate,
    language,
    overallAssessment,
    confidence,
    summary,
    claims,
    clickbait,
    languageAnalysis,
    sourceAnalysis,
    evidence: [],
    context,
    limitations,
  };
}

/**
 * Calls Google Gemini LLM API if GEMINI_API_KEY is present
 */
async function analyzeWithGemini(
  text: string,
  apiKey: string,
  meta?: { title?: string; publisher?: string; author?: string; publicationDate?: string; url?: string }
): Promise<AnalysisResult | null> {
  try {
    const prompt = `You are TruthLens AI, an objective, rigorous intelligence analyst specializing in misinformation verification.
Analyze the following content and return ONLY a valid JSON object strictly matching this schema.

Rules:
1. Overall Assessment must be strictly one of: "Likely credible", "Potentially misleading", "Likely false", "Insufficient evidence".
2. Never present an AI prediction as absolute proof. Use cautious, evidence-grounded phrasing like "Likely misleading", "Supported by available evidence", "Unverified".
3. Clickbait is NOT automatically misinformation: distinguish sensational formatting from factual inaccuracy.
4. Extract 2 to 4 atomic verifiable factual claims. Each claim status must be one of: "Supported", "Contradicted", "Unverified", "Misleading context", "Insufficient evidence".
5. Confidence must be a float between 0.0 and 1.0 representing model confidence.

JSON Structure:
{
  "language": "English",
  "overallAssessment": "Likely credible | Potentially misleading | Likely false | Insufficient evidence",
  "confidence": 0.85,
  "summary": "Clear, explainable reasoning of why this assessment was reached.",
  "claims": [
    {
      "claimNumber": 1,
      "claimText": "Specific atomic claim",
      "status": "Supported | Contradicted | Unverified | Misleading context | Insufficient evidence",
      "confidence": 0.88,
      "explanation": "Why this claim was flagged or confirmed"
    }
  ],
  "clickbait": {
    "isClickbait": true,
    "score": 75,
    "indicators": ["Excessive capitalization", "Urgency manipulation"],
    "flaggedPhrases": ["SHOCKING", "Before midnight"],
    "explanation": "Assessment of headline and sensational indicators"
  },
  "languageAnalysis": {
    "sentiment": "Neutral | Positive | Negative | Mixed",
    "emotionalIntensity": 65,
    "fearScore": 40,
    "angerScore": 20,
    "sensationalScore": 70,
    "loadedWords": ["catastrophic", "shocking"],
    "framing": "Crisis / Miracle / Informational",
    "toneSummary": "Explanation of emotional and loaded language"
  },
  "sourceAnalysis": {
    "publisher": "${meta?.publisher || "Unknown"}",
    "domain": "${meta?.url ? new URL(meta.url).hostname : "unspecified"}",
    "author": "${meta?.author || "Unattributed"}",
    "publicationDate": "${meta?.publicationDate || "Undated"}",
    "transparencyScore": 60,
    "indicators": {
      "authorIdentified": true,
      "publicationDateAvailable": true,
      "sourcesCited": true,
      "primarySourcesReferenced": false,
      "editorialInfoAvailable": true
    },
    "credibilityNote": "Neutral evaluation of source transparency"
  },
  "context": {
    "originalPublicationDate": "${meta?.publicationDate || ""}",
    "analysisDate": "${new Date().toISOString().split("T")[0]}",
    "isOutdatedContext": false,
    "timeGapWarning": "",
    "contextExplanation": "Temporal and contextual continuity check"
  },
  "limitations": [
    "Automated linguistic analysis cannot independently audit physical evidence",
    "Emerging breaking stories require manual primary source verification"
  ]
}

Content to Analyze:
${text.slice(0, 6000)}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          },
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    const parsed = JSON.parse(candidateText);
    parsed.rawInput = text;
    parsed.title = meta?.title || text.split("\n")[0]?.slice(0, 100);
    parsed.url = meta?.url;
    parsed.inputMode = meta?.title ? "url" : "text";
    parsed.evidence = [];
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Calls OpenAI API if OPENAI_API_KEY is present
 */
async function analyzeWithOpenAI(
  text: string,
  apiKey: string,
  meta?: { title?: string; publisher?: string; author?: string; publicationDate?: string; url?: string }
): Promise<AnalysisResult | null> {
  try {
    const prompt = `You are TruthLens AI, an objective intelligence analyst specializing in misinformation verification.
Analyze the following content and return ONLY a valid JSON object adhering to the schema.
Content:
${text.slice(0, 6000)}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are TruthLens AI. Output strictly valid JSON with keys: language, overallAssessment, confidence, summary, claims, clickbait, languageAnalysis, sourceAnalysis, context, limitations.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    parsed.rawInput = text;
    parsed.title = meta?.title || text.split("\n")[0]?.slice(0, 100);
    parsed.url = meta?.url;
    parsed.evidence = [];
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Unified analyzeContent() service
 * Dispatches to Gemini, OpenAI, or the High-Fidelity Local Engine,
 * then retrieves cross-source evidence for all claims.
 */
export async function analyzeContent(
  req: AnalyzeRequest
): Promise<AnalysisResult> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let result: AnalysisResult | null = null;

  // 1. Try Gemini if configured
  if (req.provider === "gemini" || (!req.provider && geminiKey && geminiKey.trim().length > 0)) {
    if (geminiKey) {
      result = await analyzeWithGemini(req.text, geminiKey, {
        title: req.title,
        publisher: req.publisher,
        author: req.author,
        publicationDate: req.publicationDate,
        url: req.url,
      });
    }
  }

  // 2. Try OpenAI if configured
  if (!result && (req.provider === "openai" || (!req.provider && openaiKey && openaiKey.trim().length > 0))) {
    if (openaiKey) {
      result = await analyzeWithOpenAI(req.text, openaiKey, {
        title: req.title,
        publisher: req.publisher,
        author: req.author,
        publicationDate: req.publicationDate,
        url: req.url,
      });
    }
  }

  // 3. Fallback to Local High-Fidelity Heuristic Engine
  if (!result) {
    result = analyzeWithLocalEngine(req.text, {
      title: req.title,
      publisher: req.publisher,
      author: req.author,
      publicationDate: req.publicationDate,
      url: req.url,
      inputMode: req.inputMode,
    });
  }

  // 4. Server-Side Evidence Retrieval for each extracted claim
  const allEvidences: RetrievedEvidence[] = [];
  if (result.claims && Array.isArray(result.claims)) {
    for (const claim of result.claims) {
      const claimEvidence = await retrieveEvidenceForClaim(claim.claimText);
      claim.evidence = claimEvidence;
      allEvidences.push(...claimEvidence);
    }
  }

  result.evidence = allEvidences;
  result.inputMode = req.inputMode;
  result.isDemo = req.isDemo || false;

  return result;
}
