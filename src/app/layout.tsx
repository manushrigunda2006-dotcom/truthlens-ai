import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruthLens AI – Misinformation & Fake News Intelligence System",
  description:
    "Analyze the claim. Examine the evidence. Understand the context. TruthLens AI provides explainable, claim-level verification and evidentiary intelligence.",
  keywords: [
    "misinformation detection",
    "fake news analyzer",
    "fact checking AI",
    "claim verification",
    "clickbait detector",
    "source transparency",
  ],
  authors: [{ name: "TruthLens AI Intelligence Lab" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100 selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
