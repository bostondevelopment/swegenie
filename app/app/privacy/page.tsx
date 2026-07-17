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
      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 pt-14 pb-20">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-9">Privacy</h1>

        <div className="text-[17px] text-[var(--color-muted)] leading-[1.7] space-y-8">
          <p>
            This assessment asks about your work preferences and, for some archetypes, comfort
            with things like risk, ambiguity, or people management — that&apos;s more sensitive
            than a typical form, so here&apos;s exactly what happens to your answers.
          </p>

          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--color-fg)] mb-2.5">
              No account, no login
            </h2>
            <p>
              There is nothing to sign up for. Your answers are never tied to an identity we
              control.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--color-fg)] mb-2.5">
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
            <h2 className="font-display text-lg font-semibold text-[var(--color-fg)] mb-2.5">
              Email capture is optional and doesn&apos;t go to a server
            </h2>
            <p>
              &ldquo;Email me this result&rdquo; opens your own email client with the result link
              pre-filled — it doesn&apos;t transmit your email address to us at all, because we
              don&apos;t collect it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--color-fg)] mb-2.5">
              Analytics
            </h2>
            <p>
              We use Google Analytics to see how many people visit the site and how many complete
              the assessment. It sets cookies and records standard visit data (like pages viewed
              and general location), but nothing ties that data to your specific answers or
              results — we track that a session landed, started, completed, or shared, not what
              you answered.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--color-fg)] mb-2.5">
              Questions
            </h2>
            <p>
              Email{" "}
              <a href="mailto:kazaam@swe-genie.com" className="text-[var(--color-fg)] underline">
                kazaam@swe-genie.com
              </a>{" "}
              with questions, or see the methodology page for how the product works and the
              project&apos;s repository for how it&apos;s built.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
