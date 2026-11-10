interface ProblemStatementsHeroProps {
  selectedEdition: "4.0" | "3.0";
  onEditionChange: (edition: "4.0" | "3.0") => void;
}

export default function ProblemStatementsHero({
  selectedEdition,
  onEditionChange,
}: ProblemStatementsHeroProps) {
  return (
    <section className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 border-b-2 border-[#160207] bg-[#F6F0E8] overflow-hidden">
      {/* Subtle technical background grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #620821 1px, transparent 1px), linear-gradient(to bottom, #620821 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="w-full px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-4">
            <span className="text-xs font-mono font-bold tracking-wider text-[#620821] uppercase">
              CODE RELAY ARCHIVE
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821] mb-4">
            Past Problem Statements
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#3A1822] font-medium leading-relaxed mb-8">
            Explore the challenges that shaped previous editions of Code Relay, across Web2, Web3, and emerging technologies.
          </p>

          {/* Dimensional Edition Selectors in Hero */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Code Relay 4.0 Button */}
            <button
              type="button"
              onClick={() => onEditionChange("4.0")}
              className={`btn-pressable relative flex items-center justify-between rounded-xl border-2 border-[#160207] p-4 text-left transition-all ${
                selectedEdition === "4.0"
                  ? "bg-[#991B3D] text-white shadow-hard-md -translate-y-0.5"
                  : "bg-[#FFFDF9] text-[#48232C] shadow-hard-xs hover:bg-[#EADBCC]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#160207] font-heading font-black text-sm shadow-hard-xs ${
                    selectedEdition === "4.0" ? "bg-[#380412] text-white" : "bg-[#EADBCC] text-[#380412]"
                  }`}
                >
                  4.0
                </div>
                <div>
                  <span className="font-heading text-base sm:text-lg font-bold block">
                    Code Relay 4.0
                  </span>
                  <span className={`font-mono text-xs block ${selectedEdition === "4.0" ? "text-[#E0D4C3]" : "text-[#6D4B54]"}`}>
                    Online Hackathon
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md border border-[#160207] px-2 py-0.5 font-mono text-[11px] font-bold ${
                    selectedEdition === "4.0"
                      ? "bg-[#380412] text-white shadow-hard-xs"
                      : "bg-[#EADBCC] text-[#380412]"
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
              className={`btn-pressable relative flex items-center justify-between rounded-xl border-2 border-[#160207] p-4 text-left transition-all ${
                selectedEdition === "3.0"
                  ? "bg-[#4B5D86] text-white shadow-hard-md -translate-y-0.5"
                  : "bg-[#FFFDF9] text-[#48232C] shadow-hard-xs hover:bg-[#EADBCC]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#160207] font-heading font-black text-sm shadow-hard-xs ${
                    selectedEdition === "3.0" ? "bg-[#253047] text-white" : "bg-[#EADBCC] text-[#380412]"
                  }`}
                >
                  3.0
                </div>
                <div>
                  <span className="font-heading text-base sm:text-lg font-bold block">
                    Code Relay 3.0
                  </span>
                  <span className={`font-mono text-xs block ${selectedEdition === "3.0" ? "text-[#D8CCD0]" : "text-[#6D4B54]"}`}>
                    On-site Hackathon
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md border border-[#160207] px-2 py-0.5 font-mono text-[11px] font-bold ${
                    selectedEdition === "3.0"
                      ? "bg-[#253047] text-white shadow-hard-xs"
                      : "bg-[#EADBCC] text-[#380412]"
                  }`}
                >
                  6 Challenges
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

