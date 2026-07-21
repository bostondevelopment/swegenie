"use client";

import { useForm } from "@formspree/react";
import { useState } from "react";
import { track } from "@/lib/analytics";

type Choice = { value: string; label: string };

const Q_TOP3: Choice[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "exploring", label: "I'm exploring" },
];
const Q_SPECIFIC: Choice[] = [
  { value: "very", label: "Very" },
  { value: "somewhat", label: "Somewhat" },
  { value: "not_really", label: "Not really" },
];
const Q_SHARE: Choice[] = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
];

function ChoiceRow({
  options,
  selected,
  onSelect,
}: {
  options: Choice[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onSelect(o.value)}
          aria-pressed={selected === o.value}
          className={`px-4 py-2 text-sm rounded-md border transition-colors ${
            selected === o.value
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-fg)]"
              : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function BetaSurvey({ topArchetype }: { topArchetype?: string }) {
  const [open, setOpen] = useState(false);
  const [roleInTop3, setRoleInTop3] = useState<string | null>(null);
  const [whySpecific, setWhySpecific] = useState<string | null>(null);
  const [wouldShare, setWouldShare] = useState<string | null>(null);
  const [openText, setOpenText] = useState("");
  const [state, handleSubmit] = useForm("mlgqlzvl");

  const canSubmit = roleInTop3 && whySpecific && wouldShare && !state.submitting;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!canSubmit) { e.preventDefault(); return; }
    track("beta_survey_submit", {
      role_in_top3: roleInTop3 ?? "",
      why_specific: whySpecific ?? "",
      would_share: wouldShare ?? "",
      top_archetype: topArchetype ?? "",
    });
    handleSubmit(e);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h2 className="font-display text-2xl font-semibold">Feedback</h2>
      <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] mt-3 max-w-2xl">
        Did the results resonate? Three quick questions help us understand what&apos;s working.
      </p>

      {!open && !state.succeeded && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 btn-primary px-5 py-2.5 text-sm font-medium"
        >
          Share feedback
        </button>
      )}

      {(open || state.succeeded) && (
        <div className="mt-7">
          {state.succeeded ? (
            <div className="rounded-lg border border-[var(--color-border)] p-6">
              <p className="text-[15px] text-[var(--color-muted)]">
                Thanks — feedback received.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-lg border border-[var(--color-border)] p-6 sm:p-8">
              {roleInTop3 && <input type="hidden" name="role_in_top3" value={roleInTop3} />}
              {whySpecific && <input type="hidden" name="why_specific" value={whySpecific} />}
              {wouldShare && <input type="hidden" name="would_share" value={wouldShare} />}
              {topArchetype && <input type="hidden" name="top_archetype" value={topArchetype} />}

              <h3 className="font-display text-xl font-semibold mb-1.5">How did this land?</h3>
              <p className="text-[14px] text-[var(--color-muted)] leading-[1.6] mb-7">
                Three quick questions, no account, nothing tied to your identity.
              </p>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[15px] font-medium mb-2.5">Is your current role in your top 3?</p>
                  <ChoiceRow options={Q_TOP3} selected={roleInTop3} onSelect={setRoleInTop3} />
                </div>
                <div>
                  <p className="text-[15px] font-medium mb-2.5">Did the &ldquo;why&rdquo; explanations feel specific?</p>
                  <ChoiceRow options={Q_SPECIFIC} selected={whySpecific} onSelect={setWhySpecific} />
                </div>
                <div>
                  <p className="text-[15px] font-medium mb-2.5">Would you share this?</p>
                  <ChoiceRow options={Q_SHARE} selected={wouldShare} onSelect={setWouldShare} />
                </div>
                <div>
                  <label htmlFor="beta-open-text" className="block text-[15px] font-medium mb-2.5">
                    Anything else? <span className="text-[var(--color-muted-2)] font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="beta-open-text"
                    name="open_text"
                    value={openText}
                    onChange={(e) => setOpenText(e.target.value)}
                    rows={3}
                    maxLength={4000}
                    placeholder="What felt off, what surprised you, what you'd want next…"
                    className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2.5 text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-primary px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Sending…" : "Send feedback"}
                </button>
                {state.errors !== null && (
                  <span className="text-[13px] text-[var(--color-signal-warn)]">
                    Couldn&apos;t send — try again in a moment.
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
