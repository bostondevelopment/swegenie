import { ReactNode } from "react";

interface CalloutProps {
  tone: "info" | "caveat";
  title?: string;
  children: ReactNode;
}

export function Callout({ tone, title, children }: CalloutProps) {
  const borderColor =
    tone === "info" ? "border-[var(--color-accent)]" : "border-[var(--color-signal-warn)]";
  const titleColor =
    tone === "info" ? "text-[var(--color-accent)]" : "text-[var(--color-signal-warn)]";

  return (
    <div className={`border-l-2 ${borderColor} pl-4 py-1`}>
      {title && <p className={`font-semibold text-sm ${titleColor}`}>{title}</p>}
      <div className="text-[var(--color-muted)]">{children}</div>
    </div>
  );
}
