"use client";

import { useEffect, useRef } from "react";
import { ProblemStatement } from "@/data/problemStatements";
import ProblemStatementCard from "@/components/problem-statements/ProblemStatementCard";
import gsap from "gsap";
import { getSkewTrajectory } from "@/hooks/useGsapScrollTrigger";

interface ProblemStatementsGridProps {
  statements: ProblemStatement[];
  onExplore: (statement: ProblemStatement) => void;
  onResetFilters: () => void;
}

export default function ProblemStatementsGrid({
  statements,
  onExplore,
  onResetFilters,
}: ProblemStatementsGridProps) {
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsGridRef.current) return;
    const cards = Array.from(cardsGridRef.current.children);
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
      const traj = getSkewTrajectory(i);
      gsap.fromTo(
        card,
        {
          x: traj.x,
          y: traj.y,
          skewX: traj.skewX,
          skewY: traj.skewY,
          rotation: traj.rotation,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          delay: i * 0.05,
          ease: "back.out(1.25)",
          onComplete: () => {
            gsap.set(card, { clearProps: "transform" });
          },
        }
      );
    });
  }, [statements]);

  return (
    <section className="relative w-full py-12 sm:py-16 border-b-2 border-[#160207] bg-[#F6F0E8] min-h-[500px]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        {statements.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border-2 border-[#160207] bg-[#FFFDF9] p-10 sm:p-14 text-center shadow-hard-lg max-w-xl mx-auto">
            <div className="h-12 w-12 rounded-xl border-2 border-[#160207] bg-[#EADBCC] text-[#620821] flex items-center justify-center mx-auto mb-4 font-mono font-black text-lg shadow-hard-xs">
              0
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#620821] mb-2">
              No Statements Match Filter
            </h3>
            <p className="text-sm text-[#48232C] mb-6 leading-relaxed">
              Try refining your search keyword or reset to browse all challenges in this edition.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-white shadow-hard-xs"
            >
              Reset to All Tracks
            </button>
          </div>
        ) : (
          /* Responsive Grid: 2 or 3 cols on desktop, 1 on mobile */
          <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {statements.map((statement) => (
              <ProblemStatementCard
                key={statement.id}
                statement={statement}
                onExplore={onExplore}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

