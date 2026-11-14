import Image from "next/image";
import { CUMULATIVE_STATS } from "@/data/pastEditionsData";

export default function PastEditionsHeader() {
  return (
    <section className="relative w-full pt-2 sm:pt-3 pb-12 sm:pb-16 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Atmospheric ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-[420px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.25)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F6F0E8] mb-6 leading-tight">
              PAST EDITIONS &amp; LEGACY
            </h1>

            <p className="text-base sm:text-lg text-[#E0D4C3] font-normal leading-relaxed mb-8 max-w-3xl">
              Four previous editions. Thousands of lines of code pushed. A flourishing nationwide network of collegiate founders, systems engineers, and protocol researchers. Explore the evolution of Code Relay at IIT Bhubaneswar.
            </p>

            {/* Verified Cumulative Statistics Strip */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[rgba(255,255,255,0.08)]">
              {CUMULATIVE_STATS.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col ${idx !== 0 ? "sm:border-l sm:border-[rgba(255,255,255,0.08)] sm:pl-4" : ""}`}
                >
                  <span className="font-heading font-black text-2xl sm:text-3xl text-[#F6F0E8] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E8738D] uppercase mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative vignette portal */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              className="portal-vignette relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center"
              data-parallax="true"
              data-parallax-speed="0.15"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.5)_0%,transparent_70%)] blur-md" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                <Image
                  src="/decoratives/bannerBoard.webp"
                  alt="Code Relay Legacy Archive"
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
