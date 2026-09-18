import { z } from "zod";

export type OverallAssessment =
  | "Likely credible"
  | "Potentially misleading"
  | "Likely false"
  | "Insufficient evidence";

export type ClaimStatus =
  | "Supported"
  | "Contradicted"
  | "Unverified"
  | "Misleading context"
  | "Insufficient evidence";

export type EvidenceType = "supporting" | "contradicting" | "related";

export type InputMode = "text" | "url" | "image";

export interface RetrievedEvidence {
  id?: string;
  type: EvidenceType;
  title: string;
  snippet: string;
  url?: string;
  sourceName: string;
  publicationDate?: string;
  isAIGenerated: boolean; // explicitly distinguishes retrieved real-world source evidence from AI interpretations
  confidence?: number;
}

export interface ExtractedClaim {
  id?: string;
  claimNumber: number;
  claimText: string;
  status: ClaimStatus;
  confidence: number;
  explanation: string;
  evidence: RetrievedEvidence[];
}

export interface SourceTransparencyIndicators {
  authorIdentified: boolean;
  publicationDateAvailable: boolean;
  sourcesCited: boolean;
  primarySourcesReferenced: boolean;
  editorialInfoAvailable: boolean;
}

export interface SourceAnalysis {
  publisher: string;
  domain: string;
  author: string;
  publicationDate: string;
  transparencyScore: number; // 0 to 100
  indicators: SourceTransparencyIndicators;
  credibilityNote: string;
  metadata?: Record<string, string>;
}

export interface ClickbaitAnalysis {
  isClickbait: boolean;
  score: number; // 0 to 100
  indicators: string[];
  flaggedPhrases: string[];
  explanation: string;
}

export interface LanguageAnalysis {
  sentiment: "Positive" | "Neutral" | "Negative" | "Mixed";
  emotionalIntensity: number; // 0 to 100
  fearScore: number; // 0 to 100
  angerScore: number; // 0 to 100
  sensationalScore: number; // 0 to 100
  loadedWords: string[];
  framing: string;
  toneSummary: string;
}

export interface ContextCheck {
  originalPublicationDate?: string;
  analysisDate: string;
  isOutdatedContext: boolean;
  timeGapWarning?: string;
  contextExplanation: string;
}

export interface AnalysisResult {
  id?: string;
  inputMode: InputMode;
  rawInput: string;
  title?: string;
  url?: string;
  publisher?: string;
  author?: string;
  publicationDate?: string;
  language: string;
  overallAssessment: OverallAssessment;
  confidence: number; // 0.0 - 1.0 (labeled as AI confidence)
  summary: string;
  claims: ExtractedClaim[];
  clickbait: ClickbaitAnalysis;
  languageAnalysis: LanguageAnalysis;
  sourceAnalysis: SourceAnalysis;
  evidence: RetrievedEvidence[];
  context: ContextCheck;
  limitations: string[];
  isDemo?: boolean;
  createdAt?: string;
}

// Zod Validation Schemas
export const analyzeRequestSchema = z.object({
  text: z.string().min(5, "Text must be at least 5 characters long"),
  inputMode: z.enum(["text", "url", "image"]).default("text"),
  url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  title: z.string().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  publicationDate: z.string().optional(),
  isDemo: z.boolean().optional(),
  provider: z.enum(["gemini", "openai", "local"]).optional(),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export const extractUrlRequestSchema = z.object({
  url: z.string().url("A valid HTTP/HTTPS URL is required"),
});

export const feedbackRequestSchema = z.object({
  analysisId: z.string().min(1, "Analysis ID is required"),
  rating: z.enum(["helpful", "unhelpful", "accurate", "inaccurate"]),
  comments: z.string().optional(),
});

export const reportRequestSchema = z.object({
  analysisId: z.string().min(1, "Analysis ID is required"),
  reason: z.enum([
    "misinformation",
    "hate_speech",
    "copyright",
    "flawed_analysis",
    "other",
  ]),
  details: z.string().min(10, "Please provide at least 10 characters of explanation"),
});
