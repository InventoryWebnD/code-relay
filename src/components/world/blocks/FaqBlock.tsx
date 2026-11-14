"use client";

import { useState } from "react";
import SectionHead from "@/components/world/SectionHead";
import { Reveal } from "@/components/world/motion";
import { FAQS } from "@/data/eventData";

export default function FaqBlock({ id = "faq" }: { id?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} data-world="floor" data-world-fade="0.45" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_1.6fr] lg:px-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead label="FAQ" title={"Got\nquestions?"} sub="Everything you need before you grab the baton." />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/cr-mascot.png" alt="" className="mt-10 hidden w-44 -rotate-6 lg:block wiggle-hover" />
        </div>

        <Reveal group className="border-b-2 border-[var(--ink)]/15" stagger={0.06}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t-2 border-[var(--ink)]/15">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-5">
                    <span className={`label pt-1.5 transition-colors ${isOpen ? "text-[var(--crimson)]" : "text-[var(--ink)]/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg !normal-case tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                      {f.q}
                    </span>
                  </span>
                  <span
                    className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                      isOpen ? "rotate-[135deg] bg-[var(--crimson)] text-[var(--cream)]" : "bg-[var(--ink)]/5 group-hover:bg-[var(--sun)]"
                    }`}
                  >
                    <span className="absolute h-[2.5px] w-4 rounded bg-current" />
                    <span className="absolute h-4 w-[2.5px] rounded bg-current" />
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pl-11 leading-relaxed text-[var(--ink)]/75">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
