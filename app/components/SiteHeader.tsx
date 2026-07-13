import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[var(--color-bg)]/90 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          SWE Genie
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-accent)] inline-block" />
        </Link>
        <nav className="flex items-center gap-3 sm:gap-7 text-[15px] text-[var(--color-muted)]">
          <Link
            href="/archetypes/staff-cross"
            className="hidden sm:inline hover:text-[var(--color-fg)] transition-colors"
          >
            Compare archetypes
          </Link>
          <Link
            href="/methodology"
            className="hidden sm:inline hover:text-[var(--color-fg)] transition-colors"
          >
            Methodology
          </Link>
          <Link
            href="/assessment"
            className="btn-primary px-4 sm:px-[18px] py-2 sm:py-2.5 text-sm font-semibold whitespace-nowrap"
          >
            Take assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
