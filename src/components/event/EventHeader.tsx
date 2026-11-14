import Image from "next/image";
import { IN_PAGE_NAV_PILLS } from "@/data/eventData";

export default function EventHeader() {
  return (
    <section className="relative w-full pt-2 sm:pt-3 pb-12 sm:pb-16 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Atmospheric ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.25)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F6F0E8] mb-6 leading-tight">
              THE EVENT: CODE RELAY 5.0
            </h1>

            <p className="text-base sm:text-lg text-[#E0D4C3] font-normal leading-relaxed mb-8 max-w-3xl">
              Code Relay 5.0 is the flagship 36-hour hackathon of the Web and Design Society (WebnD) at IIT Bhubaneswar. Uniting student developers nationwide, Code Relay challenges participants to build, ship, and pitch production-ready solutions across dual Web2 and Web3 verticals.
            </p>

            {/* Quick in-page nav pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {IN_PAGE_NAV_PILLS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-[rgba(255,255,255,0.14)] bg-[#24040d]/80 px-4 py-1.5 text-xs font-mono font-bold text-[#E0D4C3] hover:text-[#F6F0E8] hover:border-[#991B3D] hover:bg-[#991B3D]/30 transition-all duration-200"
                >
                  {item.label} ↓
                </a>
              ))}
            </div>
          </div>

          {/* Decorative vignette portal */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              className="portal-vignette relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center"
              data-parallax="true"
              data-parallax-speed="0.15"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.5)_0%,rgba(98,8,33,0.2)_50%,transparent_75%)] blur-md" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                <Image
                  src="/decoratives/monolith.webp"
                  alt="Code Relay Specifications"
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
