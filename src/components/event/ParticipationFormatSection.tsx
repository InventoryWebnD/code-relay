import Image from "next/image";
import { PARTICIPATION_FORMATS } from "@/data/eventData";

const DECORATIVES_BY_INDEX = [
  "/decoratives/computer-with-table.webp",
  "/decoratives/bannerBoard.webp",
  "/decoratives/3d-cubic-chip.webp",
  "/decoratives/computers.webp",
];

export default function ParticipationFormatSection() {
  return (
    <section id="format" className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            PARTICIPATION FORMAT &amp; ELIGIBILITY
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Everything you need to know about team structure, collegiate requirements, and the relay execution format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTICIPATION_FORMATS.map((item, idx) => (
            <div
              key={item.specNumber}
              className="editorial-card relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <div>
                {/* Header with tag */}
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)] mb-4">
                  <span className="rounded-full border border-[rgba(255,255,255,0.14)] bg-white/5 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-[#E0D4C3]">
                    {item.tag}
                  </span>
                </div>

                {/* Decorative Vignette Icon */}
                <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.35)_0%,transparent_70%)]" />
                  <div className="relative w-12 h-12">
                    <Image
                      src={DECORATIVES_BY_INDEX[idx % DECORATIVES_BY_INDEX.length]}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="font-heading text-lg font-black uppercase text-[#F6F0E8] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#E0D4C3] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
