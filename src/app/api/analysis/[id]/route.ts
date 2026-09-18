import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_ITEMS } from "@/lib/demo-data";
import { AnalysisResult, ExtractedClaim, RetrievedEvidence } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check demo items first
    const demo = DEMO_ITEMS.find((d) => d.id === id);
    if (demo) {
      return NextResponse.json({
        success: true,
        data: {
          ...demo.data,
          id: demo.id,
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Lookup in database
    const dbRecord = await prisma.analysis.findUnique({
      where: { id },
      include: {
        claims: {
          include: {
            evidences: true,
          },
          orderBy: { claimNumber: "asc" },
        },
        feedback: true,
        reports: true,
      },
    });

    if (!dbRecord) {
      return NextResponse.json(
        { error: "Analysis record not found" },
        { status: 404 }
      );
    }

    // Reconstruct full AnalysisResult
    const claims: ExtractedClaim[] = dbRecord.claims.map((c) => ({
      id: c.id,
      claimNumber: c.claimNumber,
      claimText: c.claimText,
      status: c.status as ExtractedClaim["status"],
      confidence: c.confidence,
      explanation: c.explanation,
      evidence: c.evidences.map((e) => ({
        id: e.id,
        type: e.type as RetrievedEvidence["type"],
        title: e.title,
        snippet: e.snippet,
        url: e.url || undefined,
        sourceName: "Retrieved Source",
        isAIGenerated: e.isAIGenerated,
        confidence: e.confidence || 0.8,
      })),
    }));

    const allEvidence: RetrievedEvidence[] = claims.flatMap((c) => c.evidence);

    const result: AnalysisResult = {
      id: dbRecord.id,
      inputMode: dbRecord.inputMode as AnalysisResult["inputMode"],
      rawInput: dbRecord.rawInput,
      title: dbRecord.title || undefined,
      url: dbRecord.url || undefined,
      publisher: dbRecord.publisher || undefined,
      author: dbRecord.author || undefined,
      publicationDate: dbRecord.publicationDate
        ? dbRecord.publicationDate.toISOString().split("T")[0]
        : undefined,
      language: dbRecord.language,
      overallAssessment: dbRecord.overallAssessment as AnalysisResult["overallAssessment"],
      confidence: dbRecord.confidence,
      summary: dbRecord.summary,
      claims,
      clickbait: dbRecord.clickbaitDetails ? JSON.parse(dbRecord.clickbaitDetails) : { isClickbait: false, score: 0, indicators: [], flaggedPhrases: [], explanation: "" },
      languageAnalysis: dbRecord.languageAnalysis ? JSON.parse(dbRecord.languageAnalysis) : { sentiment: "Neutral", emotionalIntensity: 0, fearScore: 0, angerScore: 0, sensationalScore: 0, loadedWords: [], framing: "", toneSummary: "" },
      sourceAnalysis: dbRecord.sourceAnalysis ? JSON.parse(dbRecord.sourceAnalysis) : { publisher: "", domain: "", author: "", publicationDate: "", transparencyScore: 0, indicators: { authorIdentified: false, publicationDateAvailable: false, sourcesCited: false, primarySourcesReferenced: false, editorialInfoAvailable: false }, credibilityNote: "" },
      evidence: allEvidence,
      context: dbRecord.contextCheck ? JSON.parse(dbRecord.contextCheck) : { analysisDate: new Date().toISOString(), isOutdatedContext: false, contextExplanation: "" },
      limitations: dbRecord.limitations ? JSON.parse(dbRecord.limitations) : [],
      isDemo: dbRecord.isDemo,
      createdAt: dbRecord.createdAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: result,
      feedback: dbRecord.feedback,
      reports: dbRecord.reports,
    });
  } catch (error) {
    console.error("Fetch analysis error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve analysis record" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Demo items cannot be deleted
    if (DEMO_ITEMS.some((d) => d.id === id)) {
      return NextResponse.json(
        { error: "System demo entries cannot be deleted." },
        { status: 403 }
      );
    }

    await prisma.analysis.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    console.error("Delete analysis error:", error);
    return NextResponse.json(
      { error: "Failed to delete analysis record" },
      { status: 500 }
    );
  }
}
