"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FitBar } from "@/components/FitBar";
import { ShareBar } from "@/components/ShareBar";
import { decodeProfile } from "@/lib/encode";
import { rankArchetypes, fitPercent } from "@/lib/scoring";
import { dimensionById } from "@/lib/taxonomy";
import { getResultsCopy, fillWhyMatched, fillGrowthArea } from "@/lib/results-copy";

type RankedState =
  | { kind: "none" }
  | { kind: "stale" }
  | { kind: "ranked"; ranked: ReturnType<typeof rankArchetypes> };

function getRanked(encoded: string | null): RankedState {
  if (!encoded) return { kind: "none" };
  const profile = decodeProfile(encoded);
  if (profile === null) return { kind: "stale" }; // encoded under a prior taxonomy version
  const answeredCount = Object.values(profile).filter((v) => v !== null && v !== undefined).length;
  if (answeredCount === 0) return { kind: "none" };
  return { kind: "ranked", ranked: rankArchetypes(profile) };
}

/**
 * Computed entirely client-side (static export has no per-request server to
 * decode the `a=` query param and render personalized HTML/metadata — see
 * ADR-002 update on static hosting). This also means the page's <title> and
 * OG tags can no longer vary per result; that personalization was dropped
 * along with the sharing feature (see the api/og removal commit) rather than
 * kept half-working.
 */
export default function ResultsClient() {
  const searchParams = useSearchParams();
  const state = getRanked(searchParams.get("a"));

  if (state.kind === "stale") {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">This result is from an older version</h1>
          <p className="text-[var(--color-muted)] mb-8">
            The assessment&apos;s scoring model has been updated since this link was created, so it
            can&apos;t be read anymore. Retake the assessment to get a result under the current model.
          </p>
          <Link href="/assessment" className="btn-primary px-5 py-3 font-medium">
            Retake the assessment
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (state.kind === "none") {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">No result to show yet</h1>
          <p className="text-[var(--color-muted)] mb-8">
            This link doesn&apos;t have an assessment result encoded in it.
          </p>
          <Link href="/assessment" className="btn-primary px-5 py-3 font-medium">
            Take the assessment
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  const ranked = state.ranked;
  const top = ranked[0];
  const topCopy = getResultsCopy(top.id);
  const topDimNames = top.topContributors.map((c) => dimensionById.get(c.dimension)?.name ?? c.dimension);
  const whyMatched = fillWhyMatched(topCopy.whyMatchedTemplate, topDimNames);
  const growthDim = top.topGaps[0] ? dimensionById.get(top.topGaps[0].dimension)?.name : undefined;
  const growthText = growthDim ? fillGrowthArea(topCopy.growthAreasTemplate, growthDim) : null;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 pb-8">
          <p className="font-mono text-xs text-[var(--color-muted)] mb-3">
            Ranked #1 of {ranked.length} engineering role archetypes
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            {top.name}
          </h1>
          <div className="max-w-xs mb-6">
            <FitBar percent={fitPercent(top.fitScore)} />
          </div>
          <p className="text-[var(--color-fg)] leading-relaxed mb-8 max-w-2xl whitespace-pre-line">
            {whyMatched}
          </p>
          <ShareBar topArchetypeName={top.name} fitPercent={fitPercent(top.fitScore)} />
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 border-t border-[var(--color-border)] grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-semibold mb-3">What this role actually is</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {topCopy.whatThisIs}
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold mb-3">A day in this role</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {topCopy.aDayInThisRole}
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold mb-3">Comp structure</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {topCopy.compStructure}
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold mb-3">How to test this cheaply</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {topCopy.howToTestCheaply}
            </p>
          </div>
        </section>

        {growthText && (
          <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 border-t border-[var(--color-border)]">
            <h2 className="font-display font-semibold mb-3">Growth areas — if this wasn&apos;t a perfect fit</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line max-w-2xl">
              {growthText}
            </p>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 border-t border-[var(--color-border)]">
          <h2 className="font-display font-semibold mb-4">Full ranking</h2>
          <div className="flex flex-col gap-1">
            {ranked.map((r, i) => (
              <Link
                key={r.id}
                href={`/archetypes/${r.id}`}
                className="flex items-center gap-4 py-2.5 px-3 -mx-3 rounded hover:bg-[var(--color-border)]/20 transition-colors"
              >
                <span className="font-mono text-xs text-[var(--color-muted)] w-6">{i + 1}</span>
                <span className="flex-1 text-sm">{r.name}</span>
                {r.confidence === "medium" && (
                  <span className="text-xs text-[var(--color-muted)] font-mono">lower-confidence sourcing</span>
                )}
                <span className="w-28">
                  <FitBar percent={fitPercent(r.fitScore)} size="sm" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
