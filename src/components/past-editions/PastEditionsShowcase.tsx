import Link from "next/link";
import { PAST_EDITIONS } from "@/data/pastEditionsData";

export default function PastEditionsShowcase() {
  return (
    <section className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 space-y-16">
        {PAST_EDITIONS.map((edition) => (
          <div
            key={edition.edition}
            className="editorial-card rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Top Banner Bar */}
            <div className="bg-[#24040d]/90 px-6 sm:px-8 lg:px-10 py-6 border-b border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-[#E8738D]">
                    {edition.tag}
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#F6F0E8]">
                  {edition.edition} ({edition.year})
                </h2>
                <p className="text-sm sm:text-base text-[#E0D4C3] font-mono mt-1">
                  Theme: <span className="text-[#F6F0E8]">{edition.theme}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/problem-statements"
                  className="btn-pill-primary inline-flex items-center gap-2 py-2 px-5 text-xs font-bold uppercase tracking-wider"
                >
                  <span>View Problem Statements</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Description & Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <h3 className="font-heading text-base font-bold text-[#E8738D] mb-3 uppercase tracking-wider">
                    Executive Summary
                  </h3>
                  <p className="text-base text-[#E0D4C3] leading-relaxed font-normal mb-6">
                    {edition.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#8E9DBE] uppercase tracking-wider mb-3">
                      KEY EDITION MILESTONES:
                    </h4>
                    <ul className="space-y-2.5">
                      {edition.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#E0D4C3]">
                          <span className="text-[#E8738D] font-bold text-base shrink-0 leading-none">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stat Badges Grid */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                  {edition.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4 flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-mono font-medium text-[#E0D4C3]/70 uppercase mb-1">
                        {stat.label}
                      </span>
                      <span className="font-heading text-2xl sm:text-3xl font-black text-[#F6F0E8] tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
