import { PRIZES } from "@/data/eventData";

export default function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#620821] text-white">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#380412] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Rewards &amp; Bounties
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            ₹2,50,000+ PRIZE POOL &amp; GRANTS
          </h2>
          <p className="mt-2 text-base text-[#F6F0E8]/90 max-w-2xl font-normal">
            Competitive cash awards, track bounties, cloud infrastructure credits, and recruitment opportunities with partner organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {PRIZES.map((prize) => (
            <div
              key={prize.badge}
              className={`card-25d rounded-xl border-2 border-[#160207] ${prize.cardBg} p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`inline-flex items-center gap-2 rounded-md border border-[#160207] ${prize.badgeBg} px-3 py-1 text-xs font-heading font-black uppercase ${prize.badgeTextColor} shadow-hard-xs mb-4`}
                >
                  {prize.badge}
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-black text-white mb-2">
                  {prize.amount}
                </div>
                <span className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase tracking-wider mb-4">
                  {prize.amountSubtitle}
                </span>
                <p className="text-sm text-[#F6F0E8]/90 leading-relaxed">
                  {prize.description}
                </p>
              </div>
              <div className="pt-4 border-t border-[#160207] mt-6 text-xs font-mono text-[#D8CCD0]">
                {prize.footerNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

