"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

export function ShareBar({ topArchetypeName, fitPercent }: { topArchetypeName: string; fitPercent: number }) {
  const [copied, setCopied] = useState(false);
  // window.location.href is browser-only and differs from the server-rendered
  // markup, so the mailto href is computed post-mount (not during render) to
  // avoid a hydration mismatch; the link is inert until then.
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  useEffect(() => {
    // Reading window.location can only happen post-mount; see the comment
    // on the state declaration above for why this can't be a lazy initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMailtoHref(
      `mailto:?subject=${encodeURIComponent(
        `My Roleprint result: ${topArchetypeName}`
      )}&body=${encodeURIComponent(
        `I ranked #1 as ${topArchetypeName} (${fitPercent}% fit) on Roleprint's engineering role assessment:\n\n${window.location.href}`
      )}`
    );
  }, [topArchetypeName, fitPercent]);

  const handleShare = async () => {
    track("result_share", { archetype: topArchetypeName });
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; the mailto fallback below still works.
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <button onClick={handleShare} className="btn-primary px-4 py-2.5 text-sm font-medium">
        {copied ? "Link copied" : "Copy share link"}
      </button>
      <a
        href={mailtoHref ?? "#"}
        onClick={(e) => {
          if (!mailtoHref) e.preventDefault();
        }}
        className="btn-secondary px-4 py-2.5 text-sm font-medium"
      >
        Email me this result
      </a>
      <span className="text-xs text-[var(--color-muted)]">
        Nothing&apos;s gated — full methodology and all 18 archetypes are public.
      </span>
    </div>
  );
}
