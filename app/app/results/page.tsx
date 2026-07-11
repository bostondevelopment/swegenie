import type { Metadata } from "next";
import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

// Static export has no per-request server, so this can't vary per result the
// way it used to (see ResultsClient.tsx's comment) — a static fallback title
// instead of the dropped dynamic "Top match: X — Y% fit" personalization.
export const metadata: Metadata = {
  title: "Your results",
};

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsClient />
    </Suspense>
  );
}
