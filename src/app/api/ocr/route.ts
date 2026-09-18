import { NextRequest, NextResponse } from "next/server";
import { extractTextFromImage } from "@/lib/ocr";


const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided in request." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Unsupported file type",
          message: `Supported formats are PNG, JPG, JPEG, and WEBP. Received: ${file.type}`,
        },
        { status: 415 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File exceeds size limit",
          message: `Image size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10MB limit.`,
        },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ocrResult = await extractTextFromImage(buffer);

    return NextResponse.json({
      success: true,
      data: {
        text: ocrResult.text,
        confidence: ocrResult.confidence,
        wordCount: ocrResult.wordCount,
        fileName: file.name,
      },
    });
  } catch (error) {
    console.error("OCR API error:", error);
    return NextResponse.json(
      {
        error: "Optical Character Recognition failed",
        message: error instanceof Error ? error.message : "Unable to process image text.",
      },
      { status: 500 }
    );
  }
}
