"use client";

import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { EVENT, PARTNERS_CR5 } from "@/data/cr5";

/** This edition's partners: one calm row of logo tiles, each labelled with its role. */
export default function PartnerLogos({ id = "partners" }: { id?: string }) {
  return (
    <section id={id} className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead label={`Code Relay ${EVENT.edition} partners`} title={"Backed by\nbrands we love"} />

        <Reveal group stagger={0.08} className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {PARTNERS_CR5.map((p) => (
            <a
              key={p.name}
              href={p.website}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="group flex flex-col overflow-hidden rounded-[24px] border-2 border-[var(--ink)] bg-[var(--paper)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_6px_0_0_var(--ink)]"
            >
              <span
                className="grid aspect-[16/10] place-items-center px-6 transition-colors duration-500"
                style={{ background: p.bg ?? "#ffffff" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                  style={{ height: p.h ?? 56 }}
                />
              </span>
              <span className="flex items-center justify-between gap-2 border-t-2 border-[var(--ink)] px-4 py-3">
                <span className="label text-[9px] leading-tight tracking-[0.1em] text-[var(--ink)]/70 sm:text-[11px] sm:tracking-[0.14em]">{p.role}</span>
                <span className="hidden text-sm text-[var(--ink)]/40 transition-colors group-hover:text-[var(--crimson)] sm:inline" aria-hidden>
                  ↗
                </span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
