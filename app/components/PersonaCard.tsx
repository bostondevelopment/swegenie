"use client";

import Link from "next/link";
import { FitBar } from "@/components/FitBar";
import { track } from "@/lib/analytics";

export function PersonaCard({
  personaId,
  href,
  targetName,
  personaName,
  narrative,
  rank,
  total,
  percent,
}: {
  personaId: string;
  href: string;
  targetName: string;
  personaName: string;
  narrative: string;
  rank: number;
  total: number;
  percent: number;
}) {
  return (
    <Link
      href={href}
      onClick={() => track("persona_click", { persona_id: personaId, rank })}
      className="card p-[26px] hover:border-[var(--color-accent)]/40 transition-colors flex flex-col gap-0"
    >
      <div className="font-mono text-xs text-[var(--color-muted-2)] mb-2">target: {targetName}</div>
      <h2 className="font-display text-xl font-semibold leading-snug mb-3">{personaName}</h2>
      <p className="text-[15px] text-[var(--color-muted)] leading-[1.65] mb-[18px]">{narrative}</p>
      <div className="flex items-center gap-3.5">
        <span className="font-mono text-xs text-[var(--color-muted-2)] whitespace-nowrap">
          ranked #{rank} of {total}
        </span>
        <div className="flex-1">
          <FitBar percent={percent} size="sm" />
        </div>
        {rank > 3 && (
          <span className="font-mono text-xs text-[var(--color-accent)] whitespace-nowrap">out of top 3</span>
        )}
      </div>
    </Link>
  );
}
