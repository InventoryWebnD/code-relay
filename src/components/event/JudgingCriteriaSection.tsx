import { JUDGING_CRITERIA } from "@/data/eventData";

export default function JudgingCriteriaSection() {
  return (
    <section id="judging" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Evaluation Rubric
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
            JUDGING CRITERIA &amp; RULES
          </h2>
          <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
            Projects are rigorously evaluated by technical mentors and industry engineers using weighted benchmark rubrics.
          </p>
        </div>

        {/* 4 Criteria Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {JUDGING_CRITERIA.map((criterion, idx) => (
            <div
              key={idx}
              className="card-25d rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#6D4B54]">Criterion 0{idx + 1}</span>
                  <span className="rounded-md border border-[#160207] bg-[#991B3D] px-2.5 py-0.5 text-xs font-heading font-black text-white shadow-hard-xs">
                    {criterion.weight}
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#620821] mb-2 leading-snug">
                  {criterion.title}
                </h3>
                <p className="text-sm text-[#48232C] leading-relaxed">
                  {criterion.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E0D4C3] mt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#991B3D] font-bold">Standard Weight</span>
              </div>
            </div>
          ))}
        </div>

        {/* Submission & Fair Play Rules Checklist */}
        <div className="rounded-2xl border-2 border-[#160207] bg-[#FFFDF9] p-6 sm:p-8 shadow-hard-lg">
          <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#620821] mb-4">
            Submission Integrity &amp; Repository Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#48232C]">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E0D4C3] bg-[#F6F0E8]/50">
              <span className="text-[#991B3D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#620821] block">Fresh Commits &amp; Timestamp Lock:</strong>
                All project commits, deployment configs, and code lines must be authored between Sprint Start (T=0) and Code Freeze (T=36 Hours).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E0D4C3] bg-[#F6F0E8]/50">
              <span className="text-[#991B3D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#620821] block">Working Deployment Required:</strong>
                Submissions must include a verifiable public URL (Vercel, Netlify, Docker endpoint, or EVM testnet smart contract address).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E0D4C3] bg-[#F6F0E8]/50">
              <span className="text-[#991B3D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#620821] block">2-Minute Video Walkthrough:</strong>
                A concise video demonstration demonstrating working user flows, code architecture, and key challenge hurdles overcome.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E0D4C3] bg-[#F6F0E8]/50">
              <span className="text-[#991B3D] font-bold text-base shrink-0">✓</span>
              <div>
                <strong className="text-[#620821] block">Open-Source Code Compliance:</strong>
                Public repository hosted on GitHub or GitLab with an MIT/Apache-2.0 license and comprehensive README setup instructions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

