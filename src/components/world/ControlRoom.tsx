"use client";

import { ReactNode } from "react";
import { Reveal } from "./motion";

/** Cream world frame + dark "control room" panel for auth/profile flows. */
export default function ControlRoom({ label, children, narrow = false }: { label: string; children: ReactNode; narrow?: boolean }) {
  return (
    <section data-world="scatter" data-world-fade="0.35" className="relative min-h-[85vh] overflow-hidden px-3 pb-20 pt-28 sm:px-8 sm:pt-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/webnd-mascot-fly.webp" alt="" className="pointer-events-none absolute right-[3%] top-24 hidden w-28 rotate-12 lg:block bob" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/cr-mascot.png" alt="" className="pointer-events-none absolute bottom-10 left-[2%] hidden w-28 -rotate-12 lg:block bob" />
      <div className={`relative mx-auto ${narrow ? "max-w-xl" : "max-w-[1400px]"}`}>
        <Reveal variant="pop" className="mb-4 flex justify-center">
          <span className="label inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-[var(--cream)]">
            <span className="h-2 w-2 rounded-full bg-[var(--crimson)] pulse-dot" />
            {label}
          </span>
        </Reveal>
        <Reveal variant="up">
          <div className="control-room relative overflow-hidden rounded-[40px] px-4 py-8 shadow-[0_40px_80px_-30px_rgba(21,6,11,0.6)] sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-60" />
            <div className="relative">{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
