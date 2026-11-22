"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { DOMAINS, EXTRA_TRACKS, partnerCredit, tracksIn } from "@/data/cr5";

/**
 * Two domains, two tracks each. The big names switch the domain; underneath,
 * each track lists its sub-tracks / starting ideas as rows that flood with the
 * track colour on hover. The cube world builds two towers behind.
 */
export default function TracksShowcase({ id = "tracks" }: { id?: string }) {
  const [active, setActive] = useState(0);
  const d = DOMAINS[active];
  const tracks = tracksIn(d.id);

  return (
    <section id={id} data-world="towers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
        <SectionHead
          align="center"
          label="Choose your lane"
          title={"Two domains.\nFour tracks."}
          sub="Pick a domain, then one track inside it. Build agents and AI for Bharat in Web2, or onchain payments and AI × Web3 in Web3."
        />

        {/* domain switcher. Inactive name is a solid, muted fill: the hollow
            outline looked good large but broke apart on small screens. */}
        <div className="mt-14 flex items-end justify-center gap-6 sm:gap-14">
          {DOMAINS.map((dm, i) => (
            <button
              key={dm.id}
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              className="group relative font-display text-[clamp(44px,11vw,150px)] leading-none transition-colors duration-500"
              style={{ color: active === i ? dm.color : "color-mix(in srgb, var(--ink) 22%, transparent)" }}
              data-cursor={dm.id}
            >
              {dm.id.toUpperCase()}
              <span
                className="absolute -bottom-3 left-0 h-[6px] w-full origin-left rounded-full transition-transform duration-500"
                style={{ background: dm.color, transform: `scaleX(${active === i ? 1 : 0})` }}
              />
            </button>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold" style={{ color: d.color }}>
          {d.blurb}
        </p>

        {/* the domain's two tracks */}
        <div key={d.id} className="mt-12 flex flex-col gap-16">
          {tracks.map((t) => (
            <div key={t.id} style={{ animation: "rowIn 0.6s both cubic-bezier(.22,1,.36,1)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <span className="label" style={{ color: t.color }}>
                    {d.id} · Track {String(t.order).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-[clamp(28px,4vw,52px)] leading-[0.95]">{t.name}</h3>
                </div>
                {t.partner && <span className="label text-[var(--ink)]/55">{partnerCredit(t)}</span>}
              </div>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--ink)]/75">{t.problem ?? t.tagline}</p>

              <span className="label mt-6 block text-[var(--ink)]/45">{t.itemsLabel}</span>
              <div className="mt-3 border-b-2 border-[var(--ink)]/15">
                {t.items.map((it, i) => (
                  <div
                    key={it.title}
                    className="row-flood group grid cursor-default grid-cols-[48px_1fr] items-start gap-4 px-2 py-5 sm:grid-cols-[80px_0.9fr_1.4fr] sm:gap-8 sm:px-4"
                    style={{ ["--flood" as string]: t.color, animation: `rowIn 0.6s ${i * 0.06}s both cubic-bezier(.22,1,.36,1)` }}
                  >
                    <span className="font-display text-xl text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-display text-lg !normal-case tracking-tight sm:text-2xl">{it.title}</h4>
                    <p className="col-span-2 text-[15px] opacity-75 sm:col-span-1">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/event#guidelines" className="btn-ghost">
            Round 01 guidelines
          </Link>
        </div>

        {/* bonus lanes as round badges */}
        <Reveal group variant="pop" className="mt-16 flex flex-wrap justify-center gap-6" stagger={0.1}>
          {EXTRA_TRACKS.map((x, i) => (
            <div key={x.title} className="group flex max-w-md items-center gap-5">
              <span
                className="grid h-24 w-24 shrink-0 place-items-center rounded-full font-display text-3xl transition-transform duration-700 group-hover:rotate-[360deg]"
                style={{ background: i === 0 ? "var(--sun)" : "var(--teal)" }}
              >
                {i === 0 ? "✦" : "✸"}
              </span>
              <div>
                <span className="label text-[var(--ink)]/60">{i === 0 ? "+ Bonus track" : "+ For every track"}</span>
                <h4 className="mt-1 font-display text-xl">{x.title}</h4>
                <p className="mt-1 text-sm text-[var(--ink)]/75">{x.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
