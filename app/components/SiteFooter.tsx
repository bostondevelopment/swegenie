import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-4 sm:justify-between text-sm text-[var(--color-muted)]">
        <div className="font-mono text-xs">
          swe genie &middot; taxonomy <span className="text-[var(--color-accent)]">v1.4</span>
        </div>
        <div className="flex gap-5">
          <Link href="/methodology" className="hover:text-[var(--color-fg)] transition-colors">
            Methodology
          </Link>
          <Link href="/privacy" className="hover:text-[var(--color-fg)] transition-colors">
            Privacy
          </Link>
          <Link href="/personas" className="hover:text-[var(--color-fg)] transition-colors font-mono text-xs">
            QA: personas
          </Link>
        </div>
      </div>
    </footer>
  );
}
