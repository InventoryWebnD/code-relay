"use client";

import { ProblemStatement } from "@/data/problemStatements";
import ProblemStatementCard from "@/components/problem-statements/ProblemStatementCard";

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
  return (
    <section className="relative w-full py-14 sm:py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] min-h-[500px]">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        {statements.length === 0 ? (
          /* Empty State */
          <div className="editorial-card rounded-2xl p-10 sm:p-14 text-center max-w-xl mx-auto">
            <div className="h-12 w-12 rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 text-[#E8738D] flex items-center justify-center mx-auto mb-4 font-mono font-black text-lg">
              0
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#F6F0E8] mb-2">
              No Statements Match Filter
            </h3>
            <p className="text-sm text-[#E0D4C3] mb-6 leading-relaxed font-normal">
              Try refining your search keyword or reset to browse all challenges in this edition.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="btn-pill-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
            >
              Reset to All Tracks
            </button>
          </div>
        ) : (
          /* Responsive Grid: 2 or 3 cols on desktop, 1 on mobile */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
