"use client";

import { ProblemStatement } from "@/data/problemStatements";

interface ProblemStatementCardProps {
  statement: ProblemStatement;
  onExplore: (statement: ProblemStatement) => void;
}

export default function ProblemStatementCard({
  statement,
  onExplore,
}: ProblemStatementCardProps) {
  const isWeb2 = statement.track === "Web2";

  return (
    <article className="editorial-card group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:-translate-y-1">
      {/* Top Meta Strip */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(255,255,255,0.08)] mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider ${
                isWeb2
                  ? "border-[#991B3D]/50 bg-[#991B3D]/30 text-[#F6F0E8]"
                  : "border-[#4B5D86]/50 bg-[#4B5D86]/30 text-[#F6F0E8]"
              }`}
            >
              {statement.track}
            </span>
            <span className="font-mono text-xs font-bold text-[#E8738D]">
              {String(statement.number).padStart(2, "0")}
            </span>
          </div>

          <span className="rounded-full border border-[rgba(255,255,255,0.1)] bg-white/5 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#E0D4C3]">
            {statement.editionLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold tracking-tight text-[#F6F0E8] mb-3 group-hover:text-[#E8738D] transition-colors leading-snug">
          {statement.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#E0D4C3] leading-relaxed mb-6 font-normal">
          {statement.description}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium text-[#E0D4C3]/60 uppercase tracking-wider">
          {statement.editionType}
        </span>

        <button
          type="button"
          onClick={() => onExplore(statement)}
          className="btn-pill-primary inline-flex items-center gap-2 py-1.5 px-4 text-xs font-bold tracking-wider"
        >
          <span>Explore Challenge</span>
          <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </article>
  );
}
