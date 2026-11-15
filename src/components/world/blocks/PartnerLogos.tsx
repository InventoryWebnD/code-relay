"use client";

import { Marquee, Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { EVENT, PARTNERS_CR5, PAST_PARTNERS, TITLE_SPONSOR } from "@/data/cr5";

/**
 * Partners in order of billing: the title sponsor (TrueFoundry, with its
 * TrueForge harness) as a hero card, the technology partner under it, then
 * every past partner as a card and a small marquee.
 */
export default function PartnerLogos({ id = "partners" }: { id?: string }) {
  const ts = TITLE_SPONSOR;
  const h = ts.harness;

  return (
    <section id={id} className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead label={`Code Relay ${EVENT.edition} partners`} title={"Backed by\nbrands we love"} />

        {/* title sponsor */}
        <Reveal className="mt-12">
          <div className="stk grid overflow-hidden text-[var(--cream)] lg:grid-cols-[1.35fr_1fr]" style={{ background: ts.bg }}>
            <div className="p-7 sm:p-12">
              <span className="label inline-block rounded-full bg-[var(--sun)] px-3 py-1 text-[var(--ink)]">
                {ts.role} · {EVENT.name} {EVENT.edition}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ts.logo} alt={ts.name} className="mt-8 h-9 w-auto sm:h-11" />
              <h3 className="mt-7 font-display text-[clamp(30px,4.2vw,60px)] leading-[0.95]">
                {EVENT.name} {EVENT.edition},<br />
                powered by <span className="text-[var(--sun)]">{ts.name}</span>
              </h3>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--cream)]/75 sm:text-base">
                <strong className="font-semibold text-[var(--cream)]">{ts.name}</strong>, the AI infrastructure platform, is our title sponsor.{" "}
                <strong className="font-semibold text-[var(--cream)]">{h.name}</strong>, their open-source agent harness, is at the heart of the Web2 AI &amp;
                Automation track: build on it, or bring any framework you like.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={ts.website} target="_blank" rel="noreferrer" className="btn-chunky !border-[var(--ink)] bg-[var(--sun)] text-[var(--ink)]" data-cursor="Visit">
                  Visit {ts.name} ↗
                </a>
                <a href={h.website} target="_blank" rel="noreferrer" className="btn-ghost text-[var(--cream)]" data-cursor="Visit">
                  Meet {h.name}
                </a>
              </div>
            </div>

            {/* the harness */}
            <a
              href={h.website}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="group flex flex-col justify-center gap-6 border-t-2 border-[var(--cream)]/10 p-7 sm:p-12 lg:border-l-2 lg:border-t-0"
              style={{ background: h.bg }}
            >
              <span className="label text-[var(--cream)]/50">The harness</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={h.logo}
                alt={h.name}
                className="h-10 w-auto self-start transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04] sm:h-12"
              />
              <span className="flex flex-wrap gap-2">
                {h.facts.map((f) => (
                  <span key={f} className="label rounded-full border-2 border-[var(--cream)]/20 px-3 py-1 text-[10px] text-[var(--cream)]/75">
                    {f}
                  </span>
                ))}
              </span>
            </a>
          </div>
        </Reveal>

        {/* technology partner(s) */}
        {PARTNERS_CR5.map((p) => (
          <Reveal key={p.name} className="mt-5">
            <a
              href={p.website}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="group grid overflow-hidden rounded-[24px] border-2 border-[var(--ink)] bg-[var(--paper)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_6px_0_0_var(--ink)] sm:grid-cols-[minmax(0,1fr)_1.5fr]"
            >
              <span className="grid min-h-[150px] place-items-center px-6 py-8" style={{ background: p.bg ?? "#ffffff" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                  style={{ height: p.h ?? 48 }}
                />
              </span>
              <span className="flex flex-col justify-center gap-2 border-t-2 border-[var(--ink)] p-6 sm:border-l-2 sm:border-t-0 sm:p-8">
                <span className="label text-[var(--crimson)]">{p.role}</span>
                <span className="font-display text-[clamp(24px,2.6vw,36px)] !normal-case leading-none tracking-tight">{p.name}</span>
                {p.note && <span className="text-[15px] text-[var(--ink)]/70">{p.note}</span>}
              </span>
            </a>
          </Reveal>
        ))}

        {/* past partners */}
        <span className="label mt-16 block text-[var(--ink)]/55">Past partners · they ran with us before</span>
        <Reveal group stagger={0.05} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {PAST_PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.website}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="group flex flex-col overflow-hidden rounded-[20px] border-2 border-[var(--ink)] bg-[var(--paper)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_6px_0_0_var(--ink)]"
            >
              <span className="grid aspect-[4/3] place-items-center px-4" style={{ background: p.bg ?? "#ffffff" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
                  style={{ height: p.h ?? 48 }}
                />
              </span>
              <span className="flex flex-col gap-0.5 border-t-2 border-[var(--ink)] px-3 py-2.5">
                <span className="label text-[9px] text-[var(--crimson)] sm:text-[10px]">{p.edition ?? "Past edition"}</span>
                <span className="label text-[9px] leading-tight text-[var(--ink)]/65 sm:text-[10px]">{p.role}</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>

      {/* small marquee of the same brands */}
      <Marquee speed={30} className="mt-10 border-y-2 border-[var(--ink)]/15 py-4">
        {PAST_PARTNERS.map((p) => (
          <span key={p.name} className="mx-6 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full p-1.5 ring-2 ring-[var(--ink)]/10" style={{ background: p.bg ?? "#ffffff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
            </span>
            <span className="font-display text-lg !normal-case tracking-tight">{p.name}</span>
            <span className="label text-[10px] text-[var(--ink)]/45">{p.edition ?? "Past edition"}</span>
            <span className="ml-6 text-[var(--crimson)]" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
