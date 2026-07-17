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
  { name: "Customer Support", id: "customer-support-engineer", top: 10.0, left: 410.0, rotate: -8, opacity: 0.4 },
  { name: "SRE", id: "sre-production-engineer", top: 110.5, left: 470.9, rotate: 12, opacity: 0.5 },
  { name: "Data Engineer", id: "data-engineer", top: 144.5, left: 8.5, rotate: -8, opacity: 0.5 },
  { name: "DevRel", id: "developer-relations-advocacy", top: 179.35, left: 482.8, rotate: -10, opacity: 0.45 },
  { name: "Forward Deployed", id: "forward-deployed-engineer", top: 369.75, left: 362.1, rotate: -8, opacity: 0.32 },
  { name: "Security Engineer", id: "security-engineer", top: 510.0, left: 392.7, rotate: 8, opacity: 0.45 },
  { name: "Mobile Engineer", id: "mobile-engineer", top: 216.8, left: -14.9, rotate: -2, opacity: 0.5 },
  { name: "Embedded", id: "embedded-iot-engineer", top: 428.4, left: 453.9, rotate: -8, opacity: 0.42 },
  { name: "Customer Success", id: "customer-support-solutions-engineer", top: 476.9, left: 71.7, rotate: 8, opacity: 0.42 },
  { name: "Platform Engineer", id: "platform-infrastructure-engineer", top: 398.0, left: 8.5, rotate: -12, opacity: 0.48 },
  { name: "Full-Stack", id: "product-full-stack-software-engineer", top: 320.8, left: 42.7, rotate: 0, opacity: 0.45 },
  { name: "Technical PM", id: "technical-product-manager", top: 271.15, left: 439.45, rotate: 12, opacity: 0.4 },
  { name: "Solutions Architect (vendor)", id: "solutions-architect-vendor-side", top: 80, left: 130, rotate: 6, opacity: 0.28 },
  { name: "Professional Services Engineer", id: "consulting-engineer-professional-services", top: 552.1, left: 36.5, rotate: -6, opacity: 0.42 },
  { name: "Solutions Architect (consulting)", id: "solutions-architect-consulting", top: 620, left: 133, rotate: -8, opacity: 0.4 },
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
              <div className="text-center sm:text-left">
                <p className="font-mono text-[13px] tracking-[0.22em] text-[var(--color-accent)] mb-6">
                  FIND YOUR LANE
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mb-6">
                  You can code.
                  <br />
                  But which role is
                  <br />
                  right{" "}
                  <span className="inline-block rounded-lg px-2 py-1 leading-none ring-2 ring-[var(--color-accent)] text-[var(--color-accent)]">
                    for you
                  </span>
                  ?
                </h1>
                <p className="text-lg leading-relaxed text-[var(--color-muted)] max-w-md mx-auto sm:mx-0 mb-9">
                  Opportunities for software engineers have expanded beyond the classic job
                  titles.
                  <br />
                  Discover which ones fit you best — ranked, and explained.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <Link href="/assessment" className="btn-primary px-7 py-4 text-[17px] font-semibold">
                    Take the assessment →
                  </Link>
                  <span className="font-mono text-[13px] text-[var(--color-muted-2)]">
                    no signup
                  </span>
                </div>
              </div>

              <div className="swe-orbit-wrap relative mx-auto lg:mx-0 overflow-hidden lg:overflow-visible">
                <div className="swe-orbit-box relative" style={{ width: 612, height: 765 }}>
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
                        className="absolute font-display font-medium whitespace-nowrap no-underline rounded px-1 ring-2 ring-[var(--color-accent)] text-[var(--color-accent)]"
                        style={{
                          top: item.top,
                          left: item.left,
                          transform: `rotate(${item.rotate}deg)`,
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
          </div>

          <div className="sm:hidden border-t border-[var(--color-border)] px-4 py-6">
            <div
              className="relative overflow-hidden rounded-[20px] border border-[var(--color-accent)]/30 px-6 py-7"
              style={{ background: "linear-gradient(155deg, rgb(163 230 53 / 0.1), var(--color-surface) 55%)" }}
            >
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  top: "-40%",
                  right: "-15%",
                  width: 260,
                  height: 260,
                  background: "oklch(0.88 0.19 128 / 0.18)",
                  filter: "blur(40px)",
                }}
              />
              <div className="relative flex flex-col gap-[18px]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
                  <span className="inline-block h-[7px] w-[7px] rounded-full bg-[var(--color-accent)]" />
                  Side by side
                </div>
                <div>
                  <div className="mb-1.5 text-[22px] font-extrabold leading-tight tracking-tight">
                    See how archetypes stack up against each other
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                    Pick up to 5 and line them up on comp, mix, and day-to-day — side by side.
                  </p>
                </div>
                <Link
                  href="/archetypes/compare"
                  className="btn-primary flex w-full items-center justify-center px-5 py-4 text-base font-bold"
                >
                  Compare side by side →
                </Link>
              </div>
            </div>
          </div>

          <div className="swe-ticker-wrap border-t border-[var(--color-border)] bg-[var(--color-bg)]/70 overflow-hidden shrink-0">
            <div className="swe-ticker-track flex w-max py-4 font-mono text-sm">
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
