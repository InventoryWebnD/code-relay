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
    <article className="group relative flex flex-col justify-between rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-md transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg">
      {/* Top Meta Strip */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E0D4C3] mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md border border-[#160207] px-2.5 py-0.5 text-[11px] font-heading font-black uppercase tracking-wider shadow-hard-xs ${
                isWeb2 ? "bg-[#991B3D] text-white" : "bg-[#4B5D86] text-white"
              }`}
            >
              {statement.track}
            </span>
            <span className="font-mono text-xs font-bold text-[#6D4B54]">
              {String(statement.number).padStart(2, "0")}
            </span>
          </div>

          <span className="rounded border border-[#160207] bg-[#F6F0E8] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#380412] shadow-hard-xs">
            {statement.editionLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold tracking-tight text-[#620821] mb-3 group-hover:text-[#991B3D] transition-colors leading-snug">
          {statement.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#48232C] leading-relaxed mb-6 font-normal">
          {statement.description}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-[#E0D4C3] flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold text-[#6D4B54] uppercase tracking-wider">
          {statement.editionType}
        </span>

        <button
          type="button"
          onClick={() => onExplore(statement)}
          className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#620821] hover:bg-[#991B3D] px-3.5 py-1.5 text-xs font-heading font-bold text-white shadow-hard-xs transition-colors"
        >
          <span>Explore Challenge</span>
          <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </article>
  );
}
