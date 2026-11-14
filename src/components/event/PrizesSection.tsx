import Image from "next/image";
import { PRIZES } from "@/data/eventData";

export default function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Atmospheric ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.2)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8] mb-4">
            ₹2,50,000+ PRIZE POOL &amp; GRANTS
          </h2>

          <p className="text-base sm:text-lg text-[#E0D4C3] max-w-2xl font-normal leading-relaxed mb-8">
            Competitive cash awards, track bounties, cloud infrastructure credits, and recruitment opportunities with partner organizations.
          </p>

          {/* Central 3D Trophy Vignette */}
          <div
            className="portal-vignette relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-6"
            data-parallax="true"
            data-parallax-speed="0.12"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(232,115,141,0.4)_0%,rgba(98,8,33,0.2)_55%,transparent_75%)] blur-md" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <Image
                src="/decoratives/trophy.webp"
                alt="Code Relay Grand Trophy"
                fill
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {PRIZES.map((prize, idx) => (
            <div
              key={prize.badge}
              className={`editorial-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 ${idx === 0 ? "border-[#991B3D]/50 bg-gradient-to-b from-[#330815] to-[#160207]" : ""
                }`}
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#F6F0E8] mb-6">
                  {prize.badge}
                </div>

                <div className="font-heading text-4xl sm:text-5xl font-black text-[#F6F0E8] mb-2 tracking-tight">
                  {prize.amount}
                </div>

                <span className="block font-mono text-xs font-bold text-[#E8738D] uppercase tracking-wider mb-4">
                  {prize.amountSubtitle}
                </span>

                <p className="text-sm text-[#E0D4C3] leading-relaxed font-normal">
                  {prize.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] mt-8 text-xs font-mono text-[#E0D4C3]/70">
                {prize.footerNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
