import { TIER_OPPORTUNITIES } from "@/data/sponsorsData";

export default function SponsorshipTiersSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Partnership Tiers
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
            CONFIRMED TIERS &amp; ENGAGEMENT MODELS
          </h2>
          <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
            Flexible partnership packages crafted to provide maximum return on investment through talent recruitment, product adoption, and nationwide brand positioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TIER_OPPORTUNITIES.map((tier) => (
            <div
              key={tier.tier}
              className="card-25d relative flex flex-col justify-between rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 sm:p-8 shadow-hard-lg text-[#1E030A]"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#6D4B54]">
                    {tier.tier}
                  </span>
                  <span className={`rounded-md border border-[#160207] px-2.5 py-0.5 text-[10px] font-heading font-black uppercase shadow-hard-xs ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#620821] mb-2">
                  {tier.title}
                </h3>

                <p className="text-sm text-[#48232C] leading-relaxed mb-6 font-normal">
                  {tier.description}
                </p>

                <h4 className="font-mono text-xs font-bold uppercase text-[#991B3D] mb-3 tracking-wider">
                  KEY DELIVERABLES:
                </h4>
                <ul className="space-y-2 mb-6">
                  {tier.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#48232C]">
                      <span className="text-[#991B3D] font-bold shrink-0">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E0D4C3] flex items-center justify-between">
                <span className={`font-mono text-xs font-bold ${tier.statusColor}`}>
                  Status: {tier.status}
                </span>
                <a
                  href="#contact"
                  className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#620821] hover:bg-[#991B3D] px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-hard-xs transition-colors"
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

