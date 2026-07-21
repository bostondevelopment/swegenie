"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { track } from "@/lib/analytics";

const ROLE_OPTIONS = [
  { value: "role-holder", label: "I do this role" },
  { value: "hiring-manager", label: "I hire for it" },
] as const;

export function RateRole({ archetypeId }: { archetypeId: string; dimensions: { id: string; name: string }[] }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("role-holder");
  const [state, handleSubmit] = useForm("mbdnywqe");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    track("rate_role_submit", { archetype_id: archetypeId, role });
    handleSubmit(e);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h2 className="font-display text-2xl font-semibold">Experts</h2>
      <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] mt-3 max-w-2xl">
        Do this role, or hire for it? Your perspective helps validate the data behind this profile.
      </p>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 btn-primary px-5 py-2.5 text-sm font-medium"
        >
          Share expertise
        </button>
      )}

      {open && <div className="mt-7">
        {state.succeeded ? (
          <div className="rounded-lg border border-[var(--color-border)] p-6">
            <p className="text-[15px] text-[var(--color-muted)]">
              Thanks — your feedback helps make these profiles more accurate.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-[var(--color-border)] p-6 sm:p-8 flex flex-col gap-7"
          >
            <input type="hidden" name="archetype" value={archetypeId} />
            <input type="hidden" name="role" value={role} />

            <div>
              <p className="text-[15px] font-medium mb-2.5">Your relationship to this role</p>
              <div className="flex flex-wrap gap-2">
                {ROLE_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setRole(o.value)}
                    aria-pressed={role === o.value}
                    className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                      role === o.value
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-fg)]"
                        : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="rate-message" className="block text-[15px] font-medium mb-2.5">
                What rings true or off about this profile?
              </label>
              <textarea
                id="rate-message"
                name="message"
                rows={4}
                placeholder="e.g. the systems thinking weight feels too high for most IC roles at this level…"
                className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2.5 text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
              />
              <ValidationError field="message" errors={state.errors} className="text-[13px] text-[var(--color-signal-warn)] mt-1" />
            </div>

            <div>
              <label htmlFor="rate-email" className="block text-[15px] font-medium mb-2.5">
                Email{" "}
                <span className="text-[var(--color-muted-2)] font-normal">(optional — if you&apos;d like a response)</span>
              </label>
              <input
                id="rate-email"
                type="email"
                name="email"
                className="w-full max-w-sm rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[15px] text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)]"
              />
              <ValidationError field="email" errors={state.errors} className="text-[13px] text-[var(--color-signal-warn)] mt-1" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={state.submitting}
                className="btn-primary px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Sending…" : "Send feedback"}
              </button>
              <ValidationError errors={state.errors} className="text-[13px] text-[var(--color-signal-warn)]" />
            </div>
          </form>
        )}
      </div>}
    </section>
  );
}
