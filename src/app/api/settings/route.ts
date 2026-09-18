import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let dbStatus = "connected";
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = "error";
    }

    const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim().length > 0);
    const hasTavily = Boolean(process.env.TAVILY_API_KEY && process.env.TAVILY_API_KEY.trim().length > 0);
    const hasSerper = Boolean(process.env.SERPER_API_KEY && process.env.SERPER_API_KEY.trim().length > 0);

    return NextResponse.json({
      success: true,
      settings: {
        database: {
          status: dbStatus,
          provider: "SQLite / PostgreSQL Compatible",
        },
        providers: {
          gemini: { configured: hasGemini, name: "Google Gemini 1.5 Flash" },
          openai: { configured: hasOpenAI, name: "OpenAI GPT-4o Mini" },
          tavily: { configured: hasTavily, name: "Tavily Search API" },
          serper: { configured: hasSerper, name: "Serper Google Search API" },
          localHeuristics: { configured: true, name: "TruthLens Heuristic NLP Engine" },
        },
        activeDefaultProvider: hasGemini ? "gemini" : hasOpenAI ? "openai" : "local",
        ocrEngine: "Tesseract.js v7 (Client/Server Native)",
      },
    });
  } catch (error) {
    console.error("Settings route error:", error);
    return NextResponse.json(
      { error: "Failed to read configuration status" },
      { status: 500 }
    );
  }
}
