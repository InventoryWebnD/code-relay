"use client";

import { useState } from "react";
import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { PRIZES } from "@/data/eventData";

const FACE = ["var(--crimson)", "var(--navy)", "var(--sun)"];
const INK = ["var(--cream)", "var(--cream)", "var(--ink)"];
const RIM = ["#620821", "#06102e", "#b88400"];
/** the word pressed into the page behind each coin */
const WORD = ["Web2", "Web3", "Prize\npool"];

/** Prizes as chunky 3D coins that flip over to show the details. */
export default function PrizeFlip({ id = "prizes" }: { id?: string }) {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id={id} data-world="podium" className="relative py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-10">
        <SectionHead align="center" label="Loot drop" title={"Prizes worth\nthe all-nighter"} sub="Hover or tap a coin to flip it." />

        <Reveal group variant="pop" className="mt-12 grid justify-items-center gap-8 sm:mt-16 sm:gap-12 md:grid-cols-3" stagger={0.14}>
          {PRIZES.map((p, i) => (
            <div key={p.badge} className={`@container relative flex w-full items-start justify-center ${i === 1 ? "" : "md:mt-12"}`}>
              <div className="relative mt-[20cqw] aspect-square w-full max-w-[270px] sm:max-w-[340px]">
                {/* embossed word pressed into the page behind the coin, which covers its lower edge */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-[90%] left-1/2 -translate-x-1/2 select-none whitespace-pre text-center font-display text-[22cqw] leading-[0.84] text-[var(--cream)]"
                  style={{ textShadow: "-1px -1px 0 rgba(255,255,255,0.9), 1px 1px 0 rgba(21,6,11,0.14), 3px 3px 6px rgba(21,6,11,0.14)" }}
                >
                  {WORD[i]}
                </span>
                <div
                  className="perspective relative h-full w-full"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(i)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(null)}
                  onClick={() => setFlipped(flipped === i ? null : i)}
                  data-cursor="Flip"
                >
                  <div
                    className="preserve-3d relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.34,1.56,.64,1)]"
                    style={{ transform: `rotateY(${flipped === i ? 180 : 0}deg) rotateX(${flipped === i ? 0 : 8}deg)` }}
                  >
                    {/* coin edge (stacked rims fake the thickness) */}
                    {Array.from({ length: 10 }).map((_, k) => (
                      <div key={k} className="absolute inset-0 rounded-full" style={{ background: RIM[i], transform: `translateZ(${-k * 2}px)`, boxShadow: "inset 0 0 0 3px #15060B" }} />
                    ))}
                    {/* front */}
                    <div
                      className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-full text-center"
                      style={{ background: FACE[i], color: INK[i], boxShadow: "inset 0 0 0 3px #15060B, inset 0 0 0 14px rgba(255,255,255,0.12)" }}
                    >
                      <span className="absolute inset-[7%] rounded-full border-2 border-dashed border-current opacity-40" />
                      <span className="label px-10 opacity-85">{p.badge}</span>
                      {/* long figures (₹2,50,000+) step down so they stay inside the rim */}
                      <span className={`mt-3 font-display ${p.amount.length > 8 ? "text-[clamp(26px,2.5vw,38px)]" : "text-[clamp(30px,3.2vw,48px)]"}`}>{p.amount}</span>
                      <span className="label mt-2 max-w-[70%] opacity-75">{p.amountSubtitle}</span>
                    </div>
                    {/* back */}
                    <div
                      className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-full bg-[var(--paper)] px-[14%] text-center text-[var(--ink)]"
                      style={{ transform: "rotateY(180deg) translateZ(20px)", boxShadow: "inset 0 0 0 3px #15060B" }}
                    >
                      <span className="label mb-3 text-[var(--ink)]/55">{p.badge}</span>
                    <p className="text-[13px] leading-snug sm:text-[15px] sm:leading-relaxed">{p.description}</p>
                      <span className="label mt-4 text-[var(--crimson)]">{p.footerNote}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
