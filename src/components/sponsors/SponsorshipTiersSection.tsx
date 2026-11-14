import { TIER_OPPORTUNITIES } from "@/data/sponsorsData";

export default function SponsorshipTiersSection() {
  return (
    <section className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            CONFIRMED TIERS &amp; ENGAGEMENT MODELS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Flexible partnership packages crafted to provide maximum return on investment through talent recruitment, product adoption, and nationwide brand positioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TIER_OPPORTUNITIES.map((tier) => (
            <div
              key={tier.tier}
              className="editorial-card relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)] mb-4">
                  <span className="font-mono text-xs font-bold text-[#E8738D]">
                    {tier.tier}
                  </span>
                  <span className="rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 px-3 py-0.5 text-[10px] font-mono font-bold uppercase text-[#F6F0E8]">
                    {tier.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-black uppercase text-[#F6F0E8] mb-2 leading-snug">
                  {tier.title}
                </h3>

                <p className="text-sm text-[#E0D4C3] leading-relaxed mb-6 font-normal">
                  {tier.description}
                </p>

                <h4 className="font-mono text-xs font-bold uppercase text-[#8E9DBE] mb-3 tracking-wider">
                  KEY DELIVERABLES:
                </h4>
                <ul className="space-y-2.5 mb-6">
                  {tier.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E0D4C3]">
                      <span className="text-[#E8738D] font-bold shrink-0">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#E8738D]">
                  Status: {tier.status}
                </span>
                <a
                  href="#contact"
                  className="btn-pill-primary inline-flex items-center gap-2 py-1.5 px-4 text-xs font-bold tracking-wider"
                >
                  <span>Inquire</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
