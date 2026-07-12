import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LandTracker } from "@/components/LandTracker";
import { archetypes } from "@/lib/taxonomy";

// Labels and positions are lifted directly from the "Hero Directions" mockup: short
// decorative words (not the full archetype names, which overlap badly at this size), at
// the mockup's pixel coordinates (a 720x900 half-canvas, words inset top:102 left:12
// right:70 bottom:78) scaled by 0.85 to a 612x765 box — every element keeps its exact
// position relative to the others, just at a smaller absolute size.
const ORBIT_SLOTS: { name: string; id: string; top: number; left: number; rotate: number; opacity: number }[] = [
  { name: "Sales Engineer", id: "sales-engineer-pre-sales", top: 8.5, left: 8.5, rotate: -14, opacity: 0.55 },
  { name: "ML Engineer", id: "ml-engineer", top: 5.1, left: 221.0, rotate: 8, opacity: 0.45 },
  { name: "Customer Support", id: "customer-support-engineer", top: 34.0, left: 357.0, rotate: -8, opacity: 0.4 },
  { name: "SRE", id: "sre-production-engineer", top: 110.5, left: 470.9, rotate: 12, opacity: 0.5 },
  { name: "Data Engineer", id: "data-engineer", top: 144.5, left: 8.5, rotate: -8, opacity: 0.5 },
  { name: "DevRel", id: "developer-relations-advocacy", top: 179.35, left: 482.8, rotate: -10, opacity: 0.45 },
  { name: "Forward Deployed", id: "forward-deployed-engineer", top: 280.5, left: 8.5, rotate: 10, opacity: 0.5 },
  { name: "Security Engineer", id: "security-engineer", top: 510.0, left: 392.7, rotate: 8, opacity: 0.45 },
  { name: "Mobile Engineer", id: "mobile-engineer", top: 408.0, left: 8.5, rotate: -12, opacity: 0.48 },
  { name: "Embedded", id: "embedded-iot-engineer", top: 428.4, left: 453.9, rotate: -8, opacity: 0.42 },
  { name: "Customer Success", id: "customer-support-solutions-engineer", top: 527.0, left: 8.5, rotate: 8, opacity: 0.42 },
  { name: "Production Engineer", id: "sre-production-engineer", top: 571.2, left: 215.9, rotate: -6, opacity: 0.42 },
  { name: "Full-Stack", id: "product-full-stack-software-engineer", top: 494.7, left: 238.0, rotate: 10, opacity: 0.45 },
  { name: "Technical PM", id: "technical-product-manager", top: 271.15, left: 439.45, rotate: 12, opacity: 0.4 },
  { name: "Solutions Architect", id: "solutions-architect-vendor-side", top: 71.4, left: 174.25, rotate: 6, opacity: 0.28 },
  { name: "Developer Advocate", id: "developer-relations-advocacy", top: 369.75, left: 362.1, rotate: -8, opacity: 0.32 },
];

export default function Home() {
  const tickerItems = [...archetypes, ...archetypes];

  return (
    <>
      <LandTracker />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden flex flex-col lg:min-h-[calc(100vh-4rem)]">
          <div className="flex-1 flex items-center">
            <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-mono text-[13px] tracking-[0.22em] text-[var(--color-accent)] mb-6">
                  STOP GUESSING YOUR LANE
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mb-6">
                  You can code.
                  <br />
                  But which job is
                  <br />
                  actually <span className="text-[var(--color-accent)]">you</span>?
                </h1>
                <p className="text-lg leading-relaxed text-[var(--color-muted)] max-w-md mb-9">
                  The industry fractured &ldquo;software engineer&rdquo; into 18 careers. Answer
                  honestly for 8 minutes and see which ones fit — ranked, and explained.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/assessment" className="btn-primary px-7 py-4 text-[17px] font-semibold">
                    Take the assessment →
                  </Link>
                  <span className="font-mono text-[13px] text-[var(--color-muted-2)]">
                    8 min &middot; no signup
                  </span>
                </div>
              </div>

              <div className="relative hidden lg:block mx-auto" style={{ width: 612, height: 765 }}>
                <div
                  className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-[rgba(245,245,242,0.12)] pointer-events-none"
                  style={{ width: 527, height: 527, transform: "translate(-50%,-50%)", animation: "swe-spin 60s linear infinite" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 rounded-full border border-[rgba(245,245,242,0.07)] pointer-events-none"
                  style={{ width: 374, height: 374, transform: "translate(-50%,-50%)", animation: "swe-spin-rev 48s linear infinite" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 font-display font-bold text-[var(--color-accent)] pointer-events-none"
                  style={{ transform: "translate(-50%,-50%)", fontSize: 442, lineHeight: 0.7 }}
                >
                  ?
                </div>
                <div
                  className="absolute"
                  style={{ top: 86.7, left: 10.2, right: 59.5, bottom: 66.3 }}
                >
                  {ORBIT_SLOTS.map((item, i) => (
                    <Link
                      key={`${item.id}-${i}`}
                      href={`/archetypes/${item.id}`}
                      className="absolute font-display font-medium whitespace-nowrap no-underline"
                      style={{
                        top: item.top,
                        left: item.left,
                        transform: `rotate(${item.rotate}deg)`,
                        opacity: item.opacity,
                        fontSize: 20.4,
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]/70 overflow-hidden shrink-0">
            <div className="flex w-max py-4 font-mono text-sm" style={{ animation: "swe-marquee 60s linear infinite" }}>
              {tickerItems.map((a, i) => (
                <span key={i} className="flex items-center">
                  <Link
                    href={`/archetypes/${a.id}`}
                    className="px-5 text-[var(--color-muted)] whitespace-nowrap no-underline"
                  >
                    {a.name}
                  </Link>
                  <span className="text-[var(--color-accent)]">&bull;</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
