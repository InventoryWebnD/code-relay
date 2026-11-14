import Image from "next/image";

interface ProblemStatementsHeroProps {
  selectedEdition: "4.0" | "3.0";
  onEditionChange: (edition: "4.0" | "3.0") => void;
}

export default function ProblemStatementsHero({
  selectedEdition,
  onEditionChange,
}: ProblemStatementsHeroProps) {
  return (
    <section className="relative w-full pt-2 sm:pt-3 pb-12 sm:pb-14 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Atmospheric wine glow */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-[380px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.2)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F6F0E8] mb-4">
              Past Problem Statements
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#E0D4C3] font-normal leading-relaxed mb-8 max-w-2xl">
              Explore the challenges that shaped previous editions of Code Relay, across Web2, Web3, and emerging technologies.
            </p>

            {/* Dimensional Edition Selectors in Hero */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-2xl lg:max-w-3xl">
              {/* Code Relay 4.0 Button */}
              <button
                type="button"
                onClick={() => onEditionChange("4.0")}
                className={`editorial-card relative flex items-center justify-between gap-3 rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 ${
                  selectedEdition === "4.0"
                    ? "border-[#991B3D] bg-gradient-to-b from-[#3a0917] to-[#1a0309] shadow-[0_0_25px_rgba(153,27,61,0.35)]"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading font-black text-sm ${
                      selectedEdition === "4.0" ? "bg-[#991B3D] text-white" : "bg-white/10 text-[#E0D4C3]"
                    }`}
                  >
                    4.0
                  </div>
                  <div className="min-w-0">
                    <span className="font-heading text-base sm:text-lg font-bold block text-[#F6F0E8] whitespace-nowrap">
                      Code Relay 4.0
                    </span>
                    <span
                      className={`font-mono text-xs block whitespace-nowrap ${
                        selectedEdition === "4.0" ? "text-[#E8738D]" : "text-[#E0D4C3]/60"
                      }`}
                    >
                      Online Hackathon
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold whitespace-nowrap ${
                      selectedEdition === "4.0"
                        ? "bg-[#991B3D]/40 text-[#F6F0E8] border border-[#991B3D]"
                        : "bg-white/5 text-[#E0D4C3]/80 border border-white/10"
                    }`}
                  >
                    8 Challenges
                  </span>
                </div>
              </button>

              {/* Code Relay 3.0 Button */}
              <button
                type="button"
                onClick={() => onEditionChange("3.0")}
                className={`editorial-card relative flex items-center justify-between gap-3 rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 ${
                  selectedEdition === "3.0"
                    ? "border-[#4B5D86] bg-gradient-to-b from-[#1b263d] to-[#0f1523] shadow-[0_0_25px_rgba(75,93,134,0.35)]"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading font-black text-sm ${
                      selectedEdition === "3.0" ? "bg-[#4B5D86] text-white" : "bg-white/10 text-[#E0D4C3]"
                    }`}
                  >
                    3.0
                  </div>
                  <div className="min-w-0">
                    <span className="font-heading text-base sm:text-lg font-bold block text-[#F6F0E8] whitespace-nowrap">
                      Code Relay 3.0
                    </span>
                    <span
                      className={`font-mono text-xs block whitespace-nowrap ${
                        selectedEdition === "3.0" ? "text-[#8E9DBE]" : "text-[#E0D4C3]/60"
                      }`}
                    >
                      On-site Hackathon
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold whitespace-nowrap ${
                      selectedEdition === "3.0"
                        ? "bg-[#4B5D86]/40 text-[#F6F0E8] border border-[#4B5D86]"
                        : "bg-white/5 text-[#E0D4C3]/80 border border-white/10"
                    }`}
                  >
                    6 Challenges
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Decorative vignette portal */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              className="portal-vignette relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center"
              data-parallax="true"
              data-parallax-speed="0.12"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.45)_0%,transparent_70%)] blur-md" />
              <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                <Image
                  src="/decoratives/laptop.webp"
                  alt="Problem Statements Archive"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
