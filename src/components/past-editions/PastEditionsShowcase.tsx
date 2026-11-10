import Link from "next/link";
import { PAST_EDITIONS } from "@/data/pastEditionsData";

export default function PastEditionsShowcase() {
  return (
    <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12 space-y-16">
        {PAST_EDITIONS.map((edition) => (
          <div
            key={edition.edition}
            className="rounded-2xl border-3 border-[#160207] bg-[#FFFDF9] shadow-hard-xl overflow-hidden"
          >
            {/* Top Banner Bar */}
            <div className="bg-[#620821] text-white p-6 sm:p-8 border-b-3 border-[#160207] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`rounded-md border border-[#160207] px-2.5 py-0.5 text-xs font-heading font-black uppercase tracking-wider ${edition.badgeBg}`}>
                    {edition.tag}
                  </span>
                  <span className="font-mono text-xs text-[#E0D4C3] font-bold">
                    EDITION ARCHIVE
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  {edition.edition} ({edition.year})
                </h2>
                <p className="text-sm sm:text-base text-[#E0D4C3] font-mono mt-1">
                  Theme: {edition.theme}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/problem-statements"
                  className="btn-pressable inline-flex items-center gap-2 rounded-xl border-2 border-[#160207] bg-[#FFFDF9] hover:bg-[#EADBCC] px-4 py-2.5 text-xs font-mono font-bold text-[#620821] shadow-hard-xs transition-colors"
                >
                  <span>View Problem Statements</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-10">
              {/* Description & Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <h3 className="font-heading text-lg font-bold text-[#620821] mb-2 uppercase tracking-wide">
                    Executive Summary
                  </h3>
                  <p className="text-base text-[#3A1822] leading-relaxed font-normal">
                    {edition.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-6">
                    <h4 className="font-mono text-xs font-bold text-[#991B3D] uppercase tracking-wider mb-3">
                      KEY EDITION MILESTONES:
                    </h4>
                    <ul className="space-y-2">
                      {edition.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-[#48232C]">
                          <span className="text-[#991B3D] font-bold text-base shrink-0">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stat Badges Grid (5 cols on lg) */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  {edition.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border-2 border-[#160207] bg-[#F6F0E8] p-4 shadow-hard-xs flex flex-col justify-between"
                    >
                      <span className="text-xs font-mono font-semibold text-[#6D4B54] uppercase mb-1">
                        {stat.label}
                      </span>
                      <span className="font-heading text-2xl sm:text-3xl font-black text-[#620821]">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Winning Projects Showcase */}
              {edition.winningProjects && edition.winningProjects.length > 0 && (
                <div className="pt-8 border-t-2 border-[#E0D4C3]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#991B3D] uppercase tracking-wider block">
                        Verified Podiums
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#620821]">
                        Winning Project Showcase
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {edition.winningProjects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border-2 border-[#160207] bg-[#F6F0E8] p-6 shadow-hard-md flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-3">
                            <span className="rounded-md border border-[#160207] bg-[#620821] px-2 py-0.5 text-[10px] font-heading font-black uppercase text-white shadow-hard-xs">
                              {proj.place}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#991B3D]">
                              {proj.track} TRACK
                            </span>
                          </div>

                          <h4 className="font-heading text-xl font-bold text-[#620821] mb-2">
                            {proj.title}
                          </h4>

                          <p className="text-sm text-[#48232C] leading-relaxed mb-4">
                            {proj.summary}
                          </p>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="pt-3 border-t border-[#E0D4C3] flex flex-wrap gap-1.5">
                          {proj.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-[#160207] bg-[#FFFDF9] px-2 py-0.5 text-[11px] font-mono font-semibold text-[#620821]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

