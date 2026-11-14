"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import PageHero from "@/components/world/PageHero";
import SectionHead from "@/components/world/SectionHead";
import { prefersReduced, Reveal } from "@/components/world/motion";
import { PAST_EDITIONS } from "@/data/pastEditionsData";

const EDITION_COLOR = ["var(--crimson)", "var(--navy)", "var(--teal)", "#b88400"];

export function LegacyHero() {
  return (
    <PageHero
      label="Past editions · 2021 → 2024"
      title={"Four laps\ndown"}
      sub="Every Code Relay handed the baton to the next. Here's where we've been, and who crossed the line first."
      world="helix"
      worldX={7}
      actions={[
        { href: "#editions", label: "Browse editions", primary: true },
        { href: "/problem-statements", label: "Past problem statements" },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Edition explorer: giant year switcher, open editorial layout        */
/* ------------------------------------------------------------------ */
export function EditionExplorer() {
  const [idx, setIdx] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const ed = PAST_EDITIONS[idx];
  const color = EDITION_COLOR[idx];

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = body.current;
    if (!el || prefersReduced()) return;
    gsap.fromTo(el.querySelectorAll(".ed-pop"), { y: 50, opacity: 0, rotate: 1 }, { y: 0, opacity: 1, rotate: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" });
  }, [idx]);

  return (
    <section id="editions" data-world="cube" data-world-x="9" data-world-y="2" data-world-fade="0.45" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="Edition explorer" title={"Pick a\nyear"} />

        <div className="mt-12 flex flex-wrap items-end gap-x-8 gap-y-2">
          {PAST_EDITIONS.map((e, i) => (
            <button key={e.edition} onClick={() => setIdx(i)} className="group relative text-left" data-cursor={e.shortCode}>
              <span className={`label block transition-colors ${idx === i ? "" : "text-[var(--ink)]/40"}`} style={idx === i ? { color: EDITION_COLOR[i] } : undefined}>
                {e.shortCode}
              </span>
              <span
                className="font-display text-[clamp(44px,7vw,112px)] leading-none transition-all duration-500"
                style={{ color: idx === i ? EDITION_COLOR[i] : "transparent", WebkitTextStroke: idx === i ? "0" : "2px var(--ink)" }}
              >
                {e.year}
              </span>
            </button>
          ))}
        </div>

        <div ref={body} key={idx} className="mt-14 grid gap-14 border-t-2 border-[var(--ink)] pt-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="ed-pop label rounded-full px-3 py-1.5 text-[var(--cream)]" style={{ background: color }}>
              {ed.tag}
            </span>
            <h3 className="ed-pop mt-6 font-display text-[clamp(40px,5vw,84px)]">{ed.edition}</h3>
            <p className="ed-pop mt-3 font-display text-lg !normal-case tracking-tight" style={{ color }}>
              {ed.theme}
            </p>
            <p className="ed-pop mt-5 max-w-xl text-[var(--ink)]/80">{ed.description}</p>
            {ed.stats && (
              <div className="mt-10 grid grid-cols-2 gap-y-6">
                {ed.stats.map((s, k) => (
                  <div key={s.label} className={`ed-pop ${k % 2 ? "border-l-2 border-[var(--ink)]/15 pl-6" : ""}`}>
                    <div className="font-display text-3xl sm:text-4xl">{s.value}</div>
                    <div className="label mt-1 text-[var(--ink)]/60">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="ed-pop label text-[var(--ink)]/55">Highlights</span>
            <ul className="mt-3">
              {ed.highlights.map((h) => (
                <li key={h} className="ed-pop flex gap-3 border-b-2 border-[var(--ink)]/10 py-3">
                  <span className="font-display" style={{ color }}>
                    ✦
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            {ed.winningProjects && (
              <>
                <span className="ed-pop label mt-10 block text-[var(--ink)]/55">Winning builds</span>
                {ed.winningProjects.map((w) => (
                  <div key={w.title} className="ed-pop group mt-5">
                    <div className="label" style={{ color }}>
                      {w.place}
                    </div>
                    <div className="mt-1 font-display text-2xl !normal-case tracking-tight">{w.title}</div>
                    <p className="mt-1 text-[15px] text-[var(--ink)]/75">{w.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {w.stack.map((t) => (
                        <span key={t} className="label text-[10px] text-[var(--ink)]/55">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
            <Link href="/problem-statements" className="ed-pop btn-ghost mt-8">
              {ed.shortCode} problem statements
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
const POLAROID_TILT = [-6, 4, -3, 7];

export function HallOfFame() {
  const winners = PAST_EDITIONS.flatMap((e) => (e.winners ?? []).map((w) => ({ ...w, edition: e.shortCode })));
  if (!winners.length) return null;
  return (
    <section data-world="podium" className="relative overflow-hidden rounded-[48px] bg-[var(--crimson)] py-24 text-[var(--cream)] sm:py-32">
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead dark label="Hall of fame" title={"First across\nthe line"} sub="Champions and runners-up from Code Relay 4.0." />
        <Reveal group variant="pop" className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {winners.map((w, i) => (
            <figure
              key={w.teamName + w.place}
              className="group relative rounded-[6px] bg-[var(--paper)] p-3 pb-5 text-[var(--ink)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:z-10 hover:-translate-y-3 hover:!rotate-0 hover:scale-105"
              style={{ transform: `rotate(${POLAROID_TILT[i % 4]}deg)` }}
              data-cursor="Legend"
            >
              <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-4deg] bg-[var(--sun)]/80" />
              <div className="aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.image} alt={w.teamName} className="h-full w-full object-cover grayscale-[30%] transition duration-500 group-hover:scale-110 group-hover:grayscale-0" />
              </div>
              <figcaption className="mt-4 px-1">
                <span className="label text-[var(--crimson)]">{w.badge}</span>
                <div className="mt-1 font-display text-lg !normal-case tracking-tight">{w.teamName}</div>
                <div className="label mt-1 text-[var(--ink)]/60">
                  {w.edition} · {w.place}
                </div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
