import { NextRequest, NextResponse } from "next/server";
import { extractUrlRequestSchema } from "@/types";
import { extractArticleFromUrl } from "@/lib/extractor";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = extractUrlRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid URL provided",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const content = await extractArticleFromUrl(parsed.data.url);

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("URL extraction failed:", error);
    return NextResponse.json(
      {
        error: "Failed to extract article content",
        message: error instanceof Error ? error.message : "Unable to reach or parse the requested webpage",
      },
      { status: 422 }
    );
  }
}
