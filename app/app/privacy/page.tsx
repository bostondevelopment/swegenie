import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What SWE Genie collects, what it doesn't, and how your answers are handled.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-semibold tracking-tight mb-8">Privacy</h1>

        <div className="text-sm text-[var(--color-muted)] leading-relaxed space-y-6">
          <p>
            This assessment asks about your work preferences and, for some archetypes, comfort
            with things like risk, ambiguity, or people management — that&apos;s more sensitive
            than a typical form, so here&apos;s exactly what happens to your answers.
          </p>

          <div>
            <h2 className="font-display text-base font-semibold text-[var(--color-fg)] mb-2">
              No account, no login
            </h2>
            <p>
              There is nothing to sign up for. Your answers are never tied to an identity we
              control.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-[var(--color-fg)] mb-2">
              Your answers live in your browser and in your URL
            </h2>
            <p>
              While you&apos;re taking the assessment, your in-progress answers are saved to your
              browser&apos;s local storage only, so you can close the tab and resume later — they
              never leave your device. When you finish, your answers are encoded directly into
              the results page&apos;s URL. That URL is how results are shared and how the page can
              be reloaded — there is no database row anywhere that stores your specific answers.
              If you share that link, whoever you send it to can see the result it encodes;
              treat the link the way you&apos;d treat the result itself.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-[var(--color-fg)] mb-2">
              Email capture is optional and doesn&apos;t go to a server
            </h2>
            <p>
              &ldquo;Email me this result&rdquo; opens your own email client with the result link
              pre-filled — it doesn&apos;t transmit your email address to us at all, because we
              don&apos;t collect it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-[var(--color-fg)] mb-2">
              Analytics
            </h2>
            <p>
              We track four anonymous funnel events — landed on the site, started the assessment,
              completed it, shared a result — with no cookies, no device fingerprinting, and no
              identifier connecting an event to a person or a specific set of answers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-[var(--color-fg)] mb-2">
              Questions
            </h2>
            <p>This is a research project, not a company with a support line yet — check the methodology page for how the product works, or the project&apos;s repository for how it&apos;s built.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
