import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-semibold text-lg tracking-tight">
          Roleprint<span className="text-[var(--color-accent)]">.</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5 text-sm text-[var(--color-muted)]">
          <Link
            href="/methodology"
            className="hidden sm:inline hover:text-[var(--color-fg)] transition-colors"
          >
            Methodology
          </Link>
          <Link
            href="/assessment"
            className="btn-primary px-3 py-1.5 text-sm text-white whitespace-nowrap"
          >
            Take assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
