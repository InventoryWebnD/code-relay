import Image from "next/image";
import { JUDGING_CRITERIA } from "@/data/eventData";

export default function JudgingCriteriaSection() {
  return (
    <section id="judging" className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="flex flex-col items-start">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
              JUDGING CRITERIA &amp; RULES
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
              Projects are rigorously evaluated by technical mentors and industry engineers using weighted benchmark rubrics.
            </p>
          </div>

          {/* Decorative judge table vignette */}
          <div
            className="portal-vignette relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0"
            data-parallax="true"
            data-parallax-speed="0.1"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.4)_0%,transparent_70%)] blur-md" />
            <div className="relative w-24 h-24">
              <Image
                src="/decoratives/judgeTable.webp"
                alt="Judging Table"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>

        {/* 4 Criteria Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {JUDGING_CRITERIA.map((criterion, idx) => (
            <div
              key={idx}
              className="editorial-card rounded-2xl p-6 flex flex-col justify-between group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)] mb-4">
                  <span className="font-mono text-xs font-bold text-[#E8738D]">Criterion 0{idx + 1}</span>
                  <span className="rounded-full border border-[rgba(255,255,255,0.15)] bg-[#991B3D]/30 px-3 py-0.5 text-xs font-mono font-bold text-[#F6F0E8]">
                    {criterion.weight}
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-[#F6F0E8] mb-2 leading-snug">
                  {criterion.title}
                </h3>
                <p className="text-sm text-[#E0D4C3] leading-relaxed font-normal">
                  {criterion.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] mt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#E8738D] font-bold">Standard Weight</span>
              </div>
            </div>
          ))}
        </div>

        {/* Submission & Fair Play Rules Checklist */}
        <div className="editorial-card rounded-2xl p-6 sm:p-8">
          <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#F6F0E8] mb-6">
            Submission Integrity &amp; Repository Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#E0D4C3]">
            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-white/5">
              <span className="text-[#E8738D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#F6F0E8] block mb-1">Fresh Commits &amp; Timestamp Lock:</strong>
                All project commits, deployment configs, and code lines must be authored between Sprint Start (T=0) and Code Freeze (T=36 Hours).
              </div>
            </div>
            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-white/5">
              <span className="text-[#E8738D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#F6F0E8] block mb-1">Working Deployment Required:</strong>
                Submissions must include a verifiable public URL (Vercel, Netlify, Docker endpoint, or EVM testnet smart contract address).
              </div>
            </div>
            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-white/5">
              <span className="text-[#E8738D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#F6F0E8] block mb-1">2-Minute Video Walkthrough:</strong>
                A concise video demonstration demonstrating working user flows, code architecture, and key challenge hurdles overcome.
              </div>
            </div>
            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-white/5">
              <span className="text-[#E8738D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#F6F0E8] block mb-1">Open-Source Code Compliance:</strong>
                Public repository hosted on GitHub or GitLab with an MIT/Apache-2.0 license and comprehensive README setup instructions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
