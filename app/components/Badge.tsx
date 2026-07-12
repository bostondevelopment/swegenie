import type { ReactNode } from "react";

type BadgeVariant = "confidence-high" | "confidence-medium" | "neutral";

interface BadgeProps {
  variant: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  "confidence-high": "border-[var(--color-signal-good)]/40 text-[var(--color-signal-good)]",
  "confidence-medium": "border-[var(--color-signal-warn)]/40 text-[var(--color-signal-warn)]",
  neutral: "border-[var(--color-border)] text-[var(--color-muted-2)]",
};

export function Badge({ variant, icon, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-mono ${VARIANT_CLASSES[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}
