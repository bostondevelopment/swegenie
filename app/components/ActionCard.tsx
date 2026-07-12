import type { ReactNode } from "react";

interface ActionCardProps {
  n: number;
  title?: string;
  children: ReactNode;
}

export function ActionCard({ n, title, children }: ActionCardProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-mono text-sm font-bold">
          {n}
        </span>
        {title && <span className="font-semibold">{title}</span>}
      </div>
      <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">{children}</p>
    </div>
  );
}
