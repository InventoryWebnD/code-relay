import { CUMULATIVE_STATS } from "@/data/pastEditionsData";

export default function PastEditionsHeader() {
  return (
    <section className="relative w-full pt-12 pb-16 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-4">
            <span className="text-xs font-mono font-bold text-[#620821] uppercase tracking-wider">
              Community Legacy · Editions 1.0 — 4.0
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821] mb-6">
            PAST EDITIONS &amp; LEGACY
          </h1>

          <p className="text-lg text-[#3A1822] font-medium leading-relaxed mb-6">
            Four previous editions. Thousands of lines of code pushed. A flourishing nationwide network of collegiate founders, systems engineers, and protocol researchers. Explore the evolution of Code Relay at IIT Bhubaneswar.
          </p>

          {/* Verified Cumulative Statistics Pill */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-[#E0D4C3]">
            {CUMULATIVE_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col ${idx !== 0 ? "border-l-2 border-[#E0D4C3] pl-3 sm:pl-4" : ""}`}
              >
                <span className={`font-heading font-black text-2xl sm:text-3xl ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-[#6D4B54] uppercase font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

