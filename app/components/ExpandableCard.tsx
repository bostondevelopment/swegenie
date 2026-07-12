interface ExpandableCardProps {
  /** Always-visible summary text. */
  title: string;
  /** Prose shown when expanded. */
  children: React.ReactNode;
}

// Lightweight expand/collapse card for a list of independent prose items —
// each instance opens/closes on its own (no single-open-at-a-time behavior).
export function ExpandableCard({ title, children }: ExpandableCardProps) {
  return (
    <details className="group card p-5">
      <summary className="cursor-pointer list-none font-semibold text-[15px] text-[var(--color-fg)]">
        <span className="group-open:hidden">&#9656; {title}</span>
        <span className="hidden group-open:inline">&#9662; {title}</span>
      </summary>
      <div className="mt-3.5 text-sm text-[var(--color-muted)] leading-[1.7]">
        {children}
      </div>
    </details>
  );
}
