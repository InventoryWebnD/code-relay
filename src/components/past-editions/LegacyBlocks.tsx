"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import PageHero from "@/components/world/PageHero";
import SectionHead from "@/components/world/SectionHead";
import { prefersReduced, Reveal } from "@/components/world/motion";
import { PAST_EDITIONS } from "@/data/pastEditionsData";
import { PROBLEM_STATEMENTS, type ProblemStatement } from "@/data/problemStatements";
import { TrackGroups, VaultModal } from "@/components/problem-statements/Vault";

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
/* Recent previous editions: the problem statements of each edition,   */
/* under its two tracks. Same switcher and rows as the rest of the site */
/* ------------------------------------------------------------------ */
const RECENT = [
  { edition: "4.0" as const, color: "var(--crimson)" },
  { edition: "3.0" as const, color: "var(--navy)" },
];

export function RecentEditions() {
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState<ProblemStatement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const body = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const ed = RECENT[idx];
  const statements = PROBLEM_STATEMENTS.filter((p) => p.edition === ed.edition);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = body.current;
    if (!el || prefersReduced()) return;
    gsap.fromTo(el.querySelectorAll(".ed-pop"), { y: 50, opacity: 0, rotate: 1 }, { y: 0, opacity: 1, rotate: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" });
  }, [idx]);

  const copyCitation = (st: ProblemStatement) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(`${st.title} — ${st.editionLabel} (${st.track} Track)`);
    setCopiedId(st.id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="editions" data-world="cube" data-world-x="9" data-world-y="2" data-world-fade="0.45" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="Past problem statements" title={"Recent previous\neditions"} />

        <div className="mt-12 flex flex-wrap items-end gap-x-8 gap-y-2">
          {RECENT.map((e, i) => (
            <button key={e.edition} onClick={() => setIdx(i)} className="group relative text-left" data-cursor={`CR ${e.edition}`}>
              <span className={`label block transition-colors ${idx === i ? "" : "text-[var(--ink)]/40"}`} style={idx === i ? { color: e.color } : undefined}>
                Code Relay
              </span>
              <span
                className="font-display text-[clamp(44px,7vw,112px)] leading-none transition-all duration-500"
                style={{ color: idx === i ? e.color : "transparent", WebkitTextStroke: idx === i ? "0" : "2px var(--ink)" }}
              >
                {e.edition}
              </span>
            </button>
          ))}
        </div>

        <div ref={body} key={idx} className="mt-14 border-t-2 border-[var(--ink)] pt-10">
          <div className="ed-pop">
            <TrackGroups statements={statements} onExplore={setActive} />
          </div>
          <Link href="/problem-statements" className="ed-pop btn-ghost mt-8">
            Open the PS vault
          </Link>
        </div>
      </div>

      <VaultModal statement={active} onClose={close} copiedId={copiedId} onCopyCitation={copyCitation} />
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
        <SectionHead dark label="Hall of fame" title={"First across\nthe line"} sub="Champions and runners-up from Code Relay 3.0." />
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
