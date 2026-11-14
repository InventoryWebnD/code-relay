"use client";

import { useState } from "react";
import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { PRIZES } from "@/data/eventData";

const FACE = ["var(--crimson)", "var(--navy)", "var(--sun)"];
const INK = ["var(--cream)", "var(--cream)", "var(--ink)"];
const RIM = ["#620821", "#06102e", "#b88400"];

/** Prizes as chunky 3D coins that flip over to show the details. */
export default function PrizeFlip({ id = "prizes" }: { id?: string }) {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id={id} data-world="podium" className="relative py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-10">
        <SectionHead align="center" label="Loot drop" title={"Prizes worth\nthe all-nighter"} sub="Hover or tap a coin to flip it." />

        <Reveal group variant="pop" className="mt-16 grid justify-items-center gap-12 md:grid-cols-3" stagger={0.14}>
          {PRIZES.map((p, i) => (
            <div
              key={p.badge}
              className="perspective aspect-square w-full max-w-[340px]"
              onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(i)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(null)}
              onClick={() => setFlipped(flipped === i ? null : i)}
              data-cursor="Flip"
              style={{ marginTop: i === 1 ? 0 : "3rem" }}
            >
              <div
                className="preserve-3d relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.34,1.56,.64,1)]"
                style={{ transform: `rotateY(${flipped === i ? 180 : 0}deg) rotateX(${flipped === i ? 0 : 8}deg)` }}
              >
                {/* coin edge (stacked rims fake the thickness) */}
                {Array.from({ length: 10 }).map((_, k) => (
                  <div
                    key={k}
                    className="absolute inset-0 rounded-full"
                    style={{ background: RIM[i], transform: `translateZ(${-k * 2}px)`, boxShadow: "inset 0 0 0 3px #15060B" }}
                  />
                ))}
                {/* front */}
                <div
                  className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-full text-center"
                  style={{ background: FACE[i], color: INK[i], boxShadow: "inset 0 0 0 3px #15060B, inset 0 0 0 14px rgba(255,255,255,0.12)" }}
                >
                  <span className="absolute inset-[7%] rounded-full border-2 border-dashed border-current opacity-40" />
                  <span className="label px-10 opacity-85">{p.badge}</span>
                  <span className="mt-3 font-display text-[clamp(30px,3.2vw,48px)]">{p.amount}</span>
                  <span className="label mt-2 max-w-[70%] opacity-75">{p.amountSubtitle}</span>
                </div>
                {/* back */}
                <div
                  className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-full bg-[var(--paper)] px-[14%] text-center text-[var(--ink)]"
                  style={{ transform: "rotateY(180deg)", boxShadow: "inset 0 0 0 3px #15060B" }}
                >
                  <p className="text-[15px] leading-relaxed">{p.description}</p>
                  <span className="label mt-4 text-[var(--crimson)]">{p.footerNote}</span>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
