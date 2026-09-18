import { createWorker } from "tesseract.js";

export interface OcrResult {
  text: string;
  confidence: number;
  wordCount: number;
}

export async function extractTextFromImage(
  imageSource: Buffer | string
): Promise<OcrResult> {
  const worker = await createWorker("eng");

  try {
    const ret = await worker.recognize(imageSource);
    const text = ret.data.text.trim();
    const confidence = Math.round(ret.data.confidence);
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    await worker.terminate();

    return {
      text,
      confidence,
      wordCount,
    };
  } catch (error) {
    await worker.terminate();
    throw new Error(
      `OCR extraction failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
