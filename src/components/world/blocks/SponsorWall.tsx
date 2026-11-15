"use client";

import Link from "next/link";
import { Marquee, Magnetic, Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { EVENT, PAST_PARTNERS } from "@/data/cr5";

/** Past partners as a big marquee (`wall`), and/or the "Fuel the next relay" pitch (`cta`). */
export default function SponsorWall({ cta = true, wall = true }: { cta?: boolean; wall?: boolean }) {
  return (
    <section data-world="helix" data-world-x="0" className="relative overflow-hidden py-24 sm:py-28">
      {wall && (
        <>
          <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
            <SectionHead label="Past partners" title={"Brands that\nran with us"} />
          </div>

          <div className="mt-14">
            <Marquee speed={34}>
              {PAST_PARTNERS.map((s) => (
                <a key={s.name} href={s.website} target="_blank" rel="noreferrer" className="group mx-8 flex items-center gap-4" data-cursor="Visit">
                  <span
                    className="grid h-20 w-20 place-items-center overflow-hidden rounded-full p-4 ring-2 ring-[var(--ink)]/10 transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110"
                    style={{ background: s.bg ?? "#ffffff" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.logo} alt={s.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </span>
                  <span>
                    <span className="block font-display text-3xl !normal-case tracking-tight transition-colors group-hover:text-[var(--crimson)]">
                      {s.name}
                    </span>
                    <span className="label text-[var(--ink)]/55">
                      {s.edition ?? "Past edition"} · {s.role}
                    </span>
                  </span>
                </a>
              ))}
            </Marquee>
          </div>
        </>
      )}

      {cta && (
        <div className={`mx-auto max-w-[1500px]${wall ? " mt-24" : ""} px-5 sm:px-10 lg:px-16`}>
          <Reveal className="grid items-end gap-8 border-t-2 border-[var(--ink)] pt-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="label text-[var(--crimson)]">For brands</span>
              <h3 className="mt-4 font-display text-[clamp(40px,6vw,104px)]">
                Fuel the <span className="text-[var(--crimson)]">next relay.</span>
              </h3>
              <p className="mt-4 max-w-lg text-[var(--ink)]/75">
                Title, Platinum, Gold, Silver and Bronze tiers, plus Track, Talent and Food &amp; Beverage partnerships.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Magnetic>
                <Link href="/sponsors" className="btn-chunky bg-[var(--ink)] text-[var(--cream)]">
                  See partner tiers →
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={EVENT.brochures.sponsorship} target="_blank" rel="noreferrer" className="btn-ghost" data-cursor="PDF">
                  Brochure
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
