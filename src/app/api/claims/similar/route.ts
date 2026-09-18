import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.trim().length < 4) {
      return NextResponse.json({ error: "Search query too short" }, { status: 400 });
    }

    const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 3).slice(0, 4);

    const matchingClaims = await prisma.claim.findMany({
      where: {
        OR: words.map((word) => ({
          claimText: {
            contains: word,
          },
        })),
      },
      include: {
        analysis: {
          select: {
            id: true,
            title: true,
            overallAssessment: true,
            createdAt: true,
          },
        },
      },
      take: 6,
    });

    return NextResponse.json({
      success: true,
      data: matchingClaims,
    });
  } catch (error) {
    console.error("Similar claims search error:", error);
    return NextResponse.json(
      { error: "Failed to search similar claims" },
      { status: 500 }
    );
  }
}
