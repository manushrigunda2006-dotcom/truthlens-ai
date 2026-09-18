import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_ITEMS } from "@/lib/demo-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const assessment = searchParams.get("assessment") || "all";
    const inputMode = searchParams.get("inputMode") || "all";
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const whereClause: Record<string, unknown> = {};

    if (assessment !== "all") {
      whereClause.overallAssessment = assessment;
    }
    if (inputMode !== "all") {
      whereClause.inputMode = inputMode;
    }
    if (search.trim().length > 0) {
      whereClause.OR = [
        { title: { contains: search } },
        { rawInput: { contains: search } },
        { summary: { contains: search } },
      ];
    }

    const analyses = await prisma.analysis.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        claims: {
          select: {
            id: true,
            status: true,
            claimText: true,
          },
        },
      },
    });

    // Format results
    const formatted = analyses.map((a) => ({
      id: a.id,
      title: a.title || "Untitled Analysis",
      inputMode: a.inputMode,
      overallAssessment: a.overallAssessment,
      confidence: a.confidence,
      summary: a.summary,
      claimsCount: a.claims.length,
      publisher: a.publisher,
      isDemo: a.isDemo,
      createdAt: a.createdAt.toISOString(),
    }));

    // If database has fewer than 2 items, append the demo items so the history page is vibrant for hackathon demos
    if (formatted.length === 0 && assessment === "all" && search === "") {
      const demoFormatted = DEMO_ITEMS.map((d) => ({
        id: d.id,
        title: d.data.title || d.name,
        inputMode: d.inputMode,
        overallAssessment: d.data.overallAssessment,
        confidence: d.data.confidence,
        summary: d.data.summary,
        claimsCount: d.data.claims.length,
        publisher: d.data.publisher,
        isDemo: true,
        createdAt: new Date().toISOString(),
      }));
      return NextResponse.json({
        success: true,
        data: demoFormatted,
        total: demoFormatted.length,
      });
    }

    return NextResponse.json({
      success: true,
      data: formatted,
      total: formatted.length,
    });
  } catch (error) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve analysis history" },
      { status: 500 }
    );
  }
}
