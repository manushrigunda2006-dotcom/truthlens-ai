import { NextRequest, NextResponse } from "next/server";
import { analyzeRequestSchema } from "@/types";
import { analyzeContent } from "@/lib/ai-service";
import { prisma } from "@/lib/prisma";
import { DEMO_ITEMS } from "@/lib/demo-data";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = analyzeRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const body = parsed.data;

    // Check if it's one of the demo datasets
    if (body.isDemo) {
      const matchedDemo = DEMO_ITEMS.find(
        (d) => d.sampleInput.trim() === body.text.trim() || d.id === body.text
      );
      if (matchedDemo) {
        return NextResponse.json({
          success: true,
          data: {
            ...matchedDemo.data,
            id: matchedDemo.id,
            createdAt: new Date().toISOString(),
          },
        });
      }
    }

    // Run unified AI & heuristic analysis pipeline
    const analysis = await analyzeContent(body);

    // Persist to Prisma Database
    let savedId = `analysis_${Date.now()}`;
    try {
      const dbAnalysis = await prisma.analysis.create({
        data: {
          inputMode: analysis.inputMode,
          rawInput: analysis.rawInput,
          title: analysis.title || "Untitled Analysis",
          url: analysis.url,
          publisher: analysis.publisher,
          author: analysis.author,
          publicationDate: analysis.publicationDate ? new Date(analysis.publicationDate) : null,
          language: analysis.language,
          overallAssessment: analysis.overallAssessment,
          confidence: analysis.confidence,
          summary: analysis.summary,
          clickbaitScore: analysis.clickbait.score / 100,
          clickbaitDetails: JSON.stringify(analysis.clickbait),
          languageAnalysis: JSON.stringify(analysis.languageAnalysis),
          sourceAnalysis: JSON.stringify(analysis.sourceAnalysis),
          contextCheck: JSON.stringify(analysis.context),
          limitations: JSON.stringify(analysis.limitations),
          isDemo: false,
          claims: {
            create: analysis.claims.map((claim) => ({
              claimNumber: claim.claimNumber,
              claimText: claim.claimText,
              status: claim.status,
              confidence: claim.confidence,
              explanation: claim.explanation,
              evidences: {
                create: (claim.evidence || []).map((ev) => ({
                  type: ev.type,
                  title: ev.title,
                  snippet: ev.snippet,
                  url: ev.url,
                  isAIGenerated: ev.isAIGenerated,
                  confidence: ev.confidence || 0.8,
                })),
              },
            })),
          },
        },
      });
      savedId = dbAnalysis.id;
    } catch (dbError) {
      console.error("Database save warning:", dbError);
      // Fallback: Proceed even if database has a temporary issue
    }

    analysis.id = savedId;
    analysis.createdAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Analysis pipeline error:", error);
    return NextResponse.json(
      {
        error: "Internal analysis error occurred",
        message: error instanceof Error ? error.message : "Unexpected pipeline exception",
      },
      { status: 500 }
    );
  }
}
