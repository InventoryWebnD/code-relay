"use client";

import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { EVENT, PARTNERS_CR5, PAST_PARTNERS, type Partner } from "@/data/cr5";

/** This edition's sponsors as large logo tiles, then the brands that backed earlier editions. */
export default function PartnerLogos({ id = "partners" }: { id?: string }) {
  return (
    <section id={id} className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead label={`Code Relay ${EVENT.edition} partners`} title={"Backed by\nbrands we love"} />

        <Reveal group stagger={0.08} className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-5">
          {PARTNERS_CR5.map((p) => (
            <PartnerCard key={p.name} p={p} big />
          ))}
        </Reveal>

        <span className="label mt-14 block text-[var(--ink)]/55">Past partners · they ran with us before</span>
        <Reveal group stagger={0.06} className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {PAST_PARTNERS.map((p) => (
            <PartnerCard key={p.name} p={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function PartnerCard({ p, big = false }: { p: Partner; big?: boolean }) {
  return (
    <a
      href={p.website}
      target="_blank"
      rel="noreferrer"
      data-cursor="Visit"
      className="group flex flex-col overflow-hidden rounded-[24px] border-2 border-[var(--ink)] bg-[var(--paper)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_6px_0_0_var(--ink)]"
    >
      <span
        className={`flex flex-col items-center justify-center gap-4 px-6 transition-colors duration-500 ${big ? "aspect-[16/9]" : "aspect-[16/10]"}`}
        style={{ background: p.bg ?? "#ffffff" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.logo}
          alt={p.name}
          loading="lazy"
          className="w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
          style={{ height: big ? p.h ?? 56 : Math.round((p.h ?? 56) * 0.85) }}
        />
        {p.note && <span className="label text-[10px] text-[var(--cream)]/60 sm:text-[11px]">{p.note}</span>}
      </span>
      <span className="flex items-center justify-between gap-2 border-t-2 border-[var(--ink)] px-4 py-3">
        <span className="flex items-center gap-2">
          {p.mark && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.mark} alt="" className="h-4 w-4" />
          )}
          <span className="label text-[9px] leading-tight tracking-[0.1em] text-[var(--ink)]/70 sm:text-[11px] sm:tracking-[0.14em]">
            {p.role}
          </span>
        </span>
        <span className="hidden text-sm text-[var(--ink)]/40 transition-colors group-hover:text-[var(--crimson)] sm:inline" aria-hidden>
          ↗
        </span>
      </span>
    </a>
  );
}
