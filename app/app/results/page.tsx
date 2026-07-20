import type { Metadata } from "next";
import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

// Static export has no per-request server, so this can't vary per result the
// way it used to (see ResultsClient.tsx's comment) — a static fallback title
// instead of the dropped dynamic "Top match: X — Y% fit" personalization.
export const metadata: Metadata = {
  title: "Your results",
  description: "See which of 17 engineering role archetypes fits how you actually work — ranked by fit score, with sourced explanations for each.",
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SWE Genie — your engineering role archetype results" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsClient />
    </Suspense>
  );
}
