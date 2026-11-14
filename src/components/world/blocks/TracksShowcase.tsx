"use client";

import { useState } from "react";
import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { EXTRA_TRACKS, TRACKS } from "@/data/cr5";

/**
 * Tracks as an editorial switcher: two huge track names toggle the list of
 * sub-tracks. Rows flood with the track colour on hover. The cube world
 * builds two towers (crimson Web2, navy Web3) on either side.
 */
export default function TracksShowcase({ id = "tracks" }: { id?: string }) {
  const [active, setActive] = useState(0);
  const t = TRACKS[active];

  return (
    <section id={id} data-world="towers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
        <SectionHead
          align="center"
          label="Choose your lane"
          title={"Two tracks.\nOne baton."}
          sub="Every team picks one primary lane. Build AI for the next billion users, or put money, agents and real assets onchain."
        />

        {/* switcher */}
        <div className="mt-14 flex items-end justify-center gap-4 sm:gap-10">
          {TRACKS.map((tr, i) => (
            <button
              key={tr.id}
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              className="group relative font-display text-[clamp(36px,11vw,150px)] leading-none transition-[color,transform] duration-500"
              style={{ color: active === i ? tr.color : "transparent", WebkitTextStroke: active === i ? "0" : "2px var(--ink)" }}
              data-cursor={tr.name}
            >
              {tr.name}
              <span
                className="absolute -bottom-3 left-0 h-[6px] w-full origin-left rounded-full transition-transform duration-500"
                style={{ background: tr.color, transform: `scaleX(${active === i ? 1 : 0})` }}
              />
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-lg font-semibold" style={{ color: t.color }}>
          {t.tagline}
        </p>

        {/* rows */}
        <div key={t.id} className="mt-10 border-b-2 border-[var(--ink)]/15">
          {t.items.map((it, i) => (
            <div
              key={it.title}
              className="row-flood group grid cursor-default grid-cols-[48px_1fr] items-center gap-4 px-2 py-6 sm:grid-cols-[80px_1fr_1.2fr_40px] sm:px-4"
              style={{ ["--flood" as string]: t.color, animation: `rowIn 0.6s ${i * 0.08}s both cubic-bezier(.22,1,.36,1)` }}
            >
              <span className="font-display text-xl text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)]">0{i + 1}</span>
              <h3 className="font-display text-xl !normal-case tracking-tight sm:text-3xl">{it.title}</h3>
              <p className="col-span-2 text-[15px] opacity-75 sm:col-span-1">{it.body}</p>
              <span className="hidden text-2xl transition-transform duration-500 group-hover:-rotate-45 sm:block">→</span>
            </div>
          ))}
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
