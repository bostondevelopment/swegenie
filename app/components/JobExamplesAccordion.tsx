"use client";

import { useState } from "react";

type Section = {
  heading: string;
  paragraph?: string;
  bullets?: string[];
};

type JobExample = {
  company: string;
  title: string;
  location: string | null;
  url: string;
  sections: Section[];
};

export function JobExamplesAccordion({ examples }: { examples: JobExample[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {examples.map((ex, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="card overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="min-w-0">
                <div className="font-mono text-[11px] text-[var(--color-muted-2)] mb-1.5">
                  {ex.company}
                  {ex.location ? ` · ${ex.location}` : ""}
                </div>
                <div className="text-[15px] leading-snug">{ex.title}</div>
              </div>
              <span
                className={`shrink-0 text-[var(--color-muted-2)] transition-transform duration-150 ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-[var(--color-border)]">
                <div className="max-h-[480px] overflow-y-auto mt-4 flex flex-col gap-5">
                  {ex.sections.map((s, si) => (
                    <div key={si}>
                      <div className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-muted-2)] mb-2">
                        {s.heading}
                      </div>
                      {s.paragraph && (
                        <p className="text-[14px] text-[var(--color-muted)] leading-[1.7]">{s.paragraph}</p>
                      )}
                      {s.bullets && (
                        <ul className="flex flex-col gap-1.5">
                          {s.bullets.map((b, bi) => (
                            <li key={bi} className="text-[14px] text-[var(--color-muted)] leading-[1.6] flex gap-2.5">
                              <span className="text-[var(--color-accent)] shrink-0">&mdash;</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                <a
                  href={ex.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] text-[var(--color-accent)] hover:opacity-80 mt-5 inline-block"
                >
                  View original posting ↗ (snapshot — may no longer be live)
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
