import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { archetypeById } from "@/lib/taxonomy";
import { StaffCrossTable, type StaffCrossRow } from "@/components/comp";
import type { CompByTierData } from "@/components/comp";
import compByTierData from "@/data/comp-by-tier.json";

export const metadata: Metadata = {
  title: "Staff Engineer Compensation: Role-by-Role",
  description:
    "Which engineering archetype pays the most at Staff? Total comp across every role, ranked, with a company-tier toggle.",
};

export default function StaffCrossPage() {
  const archetypes = compByTierData.archetypes as unknown as CompByTierData;

  // Every archetype with Staff data, labelled by its taxonomy name. Initial
  // order doesn't matter — StaffCrossTable ranks by P50 at the selected tier.
  const rows: StaffCrossRow[] = Object.entries(archetypes)
    .filter(([, data]) => Boolean(data["faang-mag7"]?.Staff))
    .map(([id, data]) => ({
      id,
      name: archetypeById.get(id)?.name ?? id,
      data,
    }));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-8">
          <Link
            href="/"
            className="font-mono text-[13px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)] mb-5 inline-block"
          >
            &larr; Home
          </Link>
          <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-5">
            Staff Engineer Compensation: Role-by-Role
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-[1.7] max-w-2xl">
            At the Staff level, the archetype you land in matters as much as the company you land
            at. This ranks every engineering archetype by total Staff compensation — base, bonus,
            and annualized equity — so you can see which paths pay the most, and by how much.
            Toggle the company tier to re-rank against AI labs, big tech, or startups.
          </p>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="h-px bg-[var(--color-border)]" />
        </div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <StaffCrossTable rows={rows} />
          <p className="mt-10 text-[13px] text-[var(--color-muted-2)] leading-[1.6] max-w-2xl">
            Directional context only, not financial advice. Figures are a mid-2025 snapshot of US
            individual-contributor total-comp submissions — see the{" "}
            <Link href="/methodology" className="underline hover:text-[var(--color-fg)]">
              methodology
            </Link>{" "}
            for sources and confidence levels.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
