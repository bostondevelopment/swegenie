"use client";

import { useState } from "react";

/**
 * Phase 8 contributor-signal scaffold: a collapsible "Rate this role" widget on
 * an archetype page. A verified role-holder or hiring manager rates how much each
 * of the archetype's top dimensions actually matters, on the same 1-5 scale the
 * expert taxonomy uses. On submit each dimension is POSTed to /api/contribute as
 * a separate contributor signal (schema: taxonomy/contributor-signals-schema.json),
 * linked by a per-session id.
 *
 * Like the beta survey, /api/contribute only exists when the app is served by a
 * Node server (next dev, or a server build); on the static export the fetch fails
 * and the widget shows a graceful notice.
 */

type Dim = { id: string; name: string };

const ROLE_OPTIONS = [
  { value: "role-holder", label: "I do this role" },
  { value: "hiring-manager", label: "I hire for it" },
] as const;

function newSessionId(): string {
  // crypto.randomUUID is available in every browser this app targets; the
  // try/catch keeps a non-crypto fallback so a submit can never throw here.
  try {
    return crypto.randomUUID();
  } catch {
    return `sess-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }
}

export function RateRole({ archetypeId, dimensions }: { archetypeId: string; dimensions: Dim[] }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("role-holder");
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(dimensions.map((d) => [d.id, 3])),
  );
  const [years, setYears] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit() {
    if (status === "submitting") return;
    setStatus("submitting");
    const sessionId = newSessionId();
    const yearsNum = years.trim() === "" ? null : Number(years);
    try {
      const results = await Promise.all(
        dimensions.map((d) =>
          // Trailing slash matches next.config's `trailingSlash: true`.
          fetch("/api/contribute/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              archetype_id: archetypeId,
              dimension_id: d.id,
              contributor_role: role,
              signal_value: values[d.id],
              years_in_role: yearsNum !== null && Number.isFinite(yearsNum) ? yearsNum : null,
              session_id: sessionId,
            }),
          }).then((r) => r.ok),
        ),
      );
      setStatus(results.every(Boolean) ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-display text-2xl font-semibold">Rate this role</span>
        <span className="font-mono text-sm text-[var(--color-muted-2)]">{open ? "–" : "+"}</span>
      </button>
      <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] mt-3 max-w-2xl">
        Do this role, or hire for it? Rate how much each trait actually matters. This is the Phase 8
        crowdsourcing input — role-holder and hiring-manager ratings are kept separate, and no single
        rating changes the model; it&apos;s aggregated with anti-gaming thresholds later.
      </p>

      {open && (
        <div className="mt-7">
          {status === "done" ? (
            <div className="rounded-lg border border-[var(--color-border)] p-6">
              <p className="text-[15px] text-[var(--color-muted)]">
                Thanks — your ratings were recorded as contributor signals.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-[var(--color-border)] p-6 sm:p-8 flex flex-col gap-7">
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

              <div className="flex flex-col gap-6">
                {dimensions.map((d) => (
                  <div key={d.id}>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <label htmlFor={`rate-${d.id}`} className="text-[15px] font-medium">
                        {d.name}
                      </label>
                      <span className="font-mono text-sm text-[var(--color-muted-2)]">
                        {values[d.id]} / 5
                      </span>
                    </div>
                    <input
                      id={`rate-${d.id}`}
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={values[d.id]}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [d.id]: Number(e.target.value) }))
                      }
                      className="w-full accent-[var(--color-accent)]"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-[var(--color-muted-2)] mt-1">
                      <span>barely relevant</span>
                      <span>defining</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="rate-years" className="block text-[15px] font-medium mb-2.5">
                  Years in this kind of role{" "}
                  <span className="text-[var(--color-muted-2)] font-normal">(optional)</span>
                </label>
                <input
                  id="rate-years"
                  type="number"
                  min={0}
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-28 rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[15px] text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                  className="btn-primary px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Submit ratings"}
                </button>
                {status === "error" && (
                  <span className="text-[13px] text-[var(--color-signal-warn)]">
                    Couldn&apos;t reach the server — the contribute endpoint only runs on the hosted
                    build, not this static demo.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
