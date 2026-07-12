import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-7 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center font-mono text-xs text-[var(--color-muted-2)]">
        <div>
          swe genie
        </div>
        <div className="flex gap-5">
          <Link href="/methodology" className="hover:text-[var(--color-fg)] transition-colors">
            Methodology
          </Link>
          <Link href="/privacy" className="hover:text-[var(--color-fg)] transition-colors">
            Privacy
          </Link>
          <Link href="/personas" className="hover:text-[var(--color-fg)] transition-colors">
            QA: personas
          </Link>
        </div>
      </div>
    </footer>
  );
}
