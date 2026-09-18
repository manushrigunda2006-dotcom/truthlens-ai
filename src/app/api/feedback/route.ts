import { NextRequest, NextResponse } from "next/server";
import { feedbackRequestSchema } from "@/types";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = feedbackRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid feedback payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { analysisId, rating, comments } = parsed.data;

    // Check if the analysis exists in DB
    const analysis = await prisma.analysis.findUnique({
      where: { id: analysisId },
    });

    if (!analysis) {
      // If it's a demo item, return success mock
      return NextResponse.json({
        success: true,
        message: "Thank you for rating this demo analysis!",
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        analysisId,
        rating,
        comments: comments || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: feedback,
      message: "Feedback submitted successfully. Thank you for improving TruthLens AI!",
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
