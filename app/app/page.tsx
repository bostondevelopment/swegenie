import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LandTracker } from "@/components/LandTracker";
import { archetypes } from "@/lib/taxonomy";

export default function Home() {
  return (
    <>
      <LandTracker />
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-16 pb-12">
          <p className="font-mono text-xs text-[var(--color-accent)] mb-4">
            18 archetypes &middot; 16 trait dimensions &middot; sourced from real job postings
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
            Engineering has fragmented into a lot more than &ldquo;frontend or backend.&rdquo;
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-8 max-w-2xl">
            Sales engineer, forward-deployed engineer, SRE, developer advocate, solutions
            architect — nobody mapped the option space for you. Take the 8-minute assessment.
            See your top role matches, ranked and explained.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/assessment" className="btn-primary px-5 py-3 font-medium">
              Take the assessment
            </Link>
            <Link
              href="/methodology"
              className="btn-secondary px-5 py-3 font-medium"
            >
              How the scoring works
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10 border-t border-[var(--color-border)]">
          <h2 className="font-display text-xl font-semibold mb-4">
            What this actually does
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-mono text-[var(--color-accent)] mb-1">01</div>
              <p className="text-[var(--color-muted)]">
                Answer 44 short questions about how you actually like to work, plus a few real
                self-ratings on specific technical domains — not a generic personality quiz.
              </p>
            </div>
            <div>
              <div className="font-mono text-[var(--color-accent)] mb-1">02</div>
              <p className="text-[var(--color-muted)]">
                A transparent, weighted scoring model ranks all 18 archetypes against your
                answers — no black-box ML.
              </p>
            </div>
            <div>
              <div className="font-mono text-[var(--color-accent)] mb-1">03</div>
              <p className="text-[var(--color-muted)]">
                Every match shows its work: the top contributing dimensions, and any real gaps,
                named specifically.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10 border-t border-[var(--color-border)]">
          <h2 className="font-display text-xl font-semibold mb-4">
            The 18 archetypes
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
            {archetypes.map((a) => (
              <Link
                key={a.id}
                href={`/archetypes/${a.id}`}
                className="py-1.5 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
