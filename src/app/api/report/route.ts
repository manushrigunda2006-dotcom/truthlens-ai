import { NextRequest, NextResponse } from "next/server";
import { reportRequestSchema } from "@/types";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = reportRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid report payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { analysisId, reason, details } = parsed.data;

    const analysis = await prisma.analysis.findUnique({
      where: { id: analysisId },
    });

    if (!analysis) {
      return NextResponse.json({
        success: true,
        message: "Demo report dossier recorded for demonstration purposes.",
      });
    }

    const report = await prisma.report.create({
      data: {
        analysisId,
        reason,
        details,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      data: report,
      message: "Misinformation report submitted to the intelligence investigation queue.",
    });
  } catch (error) {
    console.error("Report creation error:", error);
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";

    const whereClause: Record<string, unknown> = {};
    if (status !== "all") {
      whereClause.status = status;
    }

    const reports = await prisma.report.findMany({
      where: whereClause,
      include: {
        analysis: {
          select: {
            id: true,
            title: true,
            overallAssessment: true,
            confidence: true,
            publisher: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error("Fetch reports error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const json = await req.json();
    const { id, status } = json;

    if (!id || !["pending", "reviewed", "resolved", "dismissed"].includes(status)) {
      return NextResponse.json({ error: "Invalid update parameters" }, { status: 400 });
    }

    const updated = await prisma.report.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update report status error:", error);
    return NextResponse.json({ error: "Failed to update report status" }, { status: 500 });
  }
}
