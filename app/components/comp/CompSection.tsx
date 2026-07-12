'use client';

import { useState } from 'react';
import type { ArchetypeCompData, Level, Tier } from './comp.types';
import { LEVELS, TIER_LABELS, TIER_ORDER } from './comp.utils';
import { TierCompChart } from './TierCompChart';
import { EquityTwoLane } from './EquityTwoLane';

interface CompSectionProps {
  archetypeId: string;
  data: ArchetypeCompData;
  /** TODO v2: pass inferred level from assessment context. */
  userLevel?: Level;
}

// Section wrapper + divider classes matching the archetype page's rhythm so this
// block slots into the page without any bespoke layout on the server side.
const SECTION = 'mx-auto max-w-3xl px-4 sm:px-6 py-12';
const DIVIDER = 'mx-auto max-w-3xl px-4 sm:px-6';

// Client wrapper for the two comp-by-tier sections on an archetype detail page.
// It owns the interactive state (the tier chart manages its own level/tier focus;
// the equity lane gets its own tier + level selectors here) so the page itself
// can stay a server component with a plain static JSON import.
export function CompSection({ archetypeId, data, userLevel }: CompSectionProps) {
  // The equity lane carries its own tier + level selection, independent of the
  // tier chart above it, so a reader can drill into any tier/level combination.
  const [tier, setTier] = useState<Tier>('faang-mag7');
  const [level, setLevel] = useState<Level>(userLevel ?? 'L4');

  const equityCell = data[tier][level];

  return (
    <>
      <div className={DIVIDER}>
        <div className="h-px bg-[var(--color-border)]" />
      </div>
      <section className={SECTION}>
        <h2 className="font-display text-xl font-semibold mb-2">Compensation by Company Tier</h2>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.65] mb-8 max-w-2xl">
          Total compensation (base + bonus + annualized equity) across five company tiers, at each
          career level. The same role pays very differently depending on where you take it.
        </p>
        {/* TODO v2: pass inferred level from assessment context as userLevel. */}
        <TierCompChart
          archetypeId={archetypeId}
          data={data}
          defaultLevel="L4"
          userLevel={userLevel}
        />
      </section>

      <div className={DIVIDER}>
        <div className="h-px bg-[var(--color-border)]" />
      </div>
      <section className={SECTION}>
        <h2 className="font-display text-xl font-semibold mb-2">Equity Reality Check</h2>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.65] mb-8 max-w-2xl">
          The guaranteed money (base + bonus) against the equity upside. Startup equity is
          illiquid — the equity figure is annualized paper value at vest, not cash in hand.
        </p>

        {/* Tier + level selectors for the equity lane */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Company tier">
            {TIER_ORDER.map((t) => {
              const active = t === tier;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTier(t)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-mono transition-colors ${
                    active
                      ? 'border-[var(--color-accent)] text-[var(--color-fg)]'
                      : 'border-[var(--color-border)] text-[var(--color-muted-2)] hover:text-[var(--color-muted)]'
                  }`}
                >
                  {TIER_LABELS[t]}
                </button>
              );
            })}
          </div>
          <div className="flex gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 self-start" role="group" aria-label="Career level">
            {LEVELS.map((lvl) => {
              const active = lvl === level;
              return (
                <button
                  key={lvl}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLevel(lvl)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        <EquityTwoLane tier={tier} level={level} data={equityCell} archetypeId={archetypeId} />
      </section>
    </>
  );
}
