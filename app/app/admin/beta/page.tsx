import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { readJsonl, BETA_FEEDBACK_PATH } from "@/lib/feedback-store";

export const metadata: Metadata = {
  title: "Beta feedback",
  robots: { index: false, follow: false },
};

interface BetaRecord {
  role_in_top3?: string;
  why_specific?: string;
  would_share?: string;
  open_text?: string | null;
  top_archetype?: string | null;
  received_at?: string;
}

function pct(n: number, total: number): string {
  if (total === 0) return "—";
  return `${Math.round((n / total) * 100)}%`;
}

export default async function BetaAdminPage() {
  const records = await readJsonl<BetaRecord>(BETA_FEEDBACK_PATH);
  const total = records.length;
  const top3Yes = records.filter((r) => r.role_in_top3 === "yes").length;
  const shareYes = records.filter((r) => r.would_share === "yes").length;
  const openText = records
    .filter((r) => typeof r.open_text === "string" && r.open_text.trim() !== "")
    .slice(-10)
    .reverse();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-20">
        <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-4">
          Beta feedback
        </h1>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.65] max-w-2xl mb-3">
          Phase 6 pre-launch survey results, read from{" "}
          <code className="font-mono text-[13px]">data/beta-feedback.jsonl</code>. The Phase 6 bar is
          ≥70% top-3 and ≥50% would-share.
        </p>
        <p className="font-mono text-[12px] text-[var(--color-muted-2)] leading-[1.6] max-w-2xl mb-12">
          Note: this reads the file when the page renders. Under a Node server (next dev, or a
          server build) that&apos;s per request; on the static export it&apos;s a build-time snapshot.
          This page is noindex and has no auth — it&apos;s an internal beta view, not a public route.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <Stat label="Submissions" value={String(total)} />
          <Stat label="Role in top 3" value={pct(top3Yes, total)} sub={`${top3Yes} of ${total} yes`} />
          <Stat label="Would share" value={pct(shareYes, total)} sub={`${shareYes} of ${total} yes`} />
        </div>

        <h2 className="font-display text-xl font-semibold mb-5">Last 10 open-text responses</h2>
        {openText.length === 0 ? (
          <p className="text-[15px] text-[var(--color-muted)]">No open-text responses yet.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {openText.map((r, i) => (
              <li key={i} className="rounded-lg border border-[var(--color-border)] p-4">
                <p className="text-[15px] text-[var(--color-fg)] leading-[1.6] whitespace-pre-line">
                  {r.open_text}
                </p>
                <p className="font-mono text-[11px] text-[var(--color-muted-2)] mt-2">
                  {[r.top_archetype, r.received_at].filter(Boolean).join(" · ") || "—"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] p-5">
      <div className="font-mono text-[12px] text-[var(--color-muted-2)] mb-2">{label}</div>
      <div className="font-display text-3xl font-bold tracking-tight">{value}</div>
      {sub && <div className="font-mono text-[11px] text-[var(--color-muted-2)] mt-1.5">{sub}</div>}
    </div>
  );
}
