interface ProblemStatementsFiltersProps {
  selectedTrack: "ALL" | "Web2" | "Web3";
  onSelectTrack: (track: "ALL" | "Web2" | "Web3") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  web2Count: number;
  web3Count: number;
  filteredCount: number;
  selectedEdition: "4.0" | "3.0";
  onReset: () => void;
}

export default function ProblemStatementsFilters({
  selectedTrack,
  onSelectTrack,
  searchQuery,
  onSearchChange,
  totalCount,
  web2Count,
  web3Count,
  filteredCount,
  selectedEdition,
  onReset,
}: ProblemStatementsFiltersProps) {
  return (
    <section className="sticky top-[69px] z-30 w-full border-b-2 border-[#160207] bg-[#F6F0E8]/95 backdrop-blur-sm py-4 shadow-hard-xs">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Track Filter Segmented Control */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#620821] uppercase tracking-wider mr-1">
              Track:
            </span>
            <div className="inline-flex rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-1 shadow-hard-xs">
              {/* All Tracks */}
              <button
                type="button"
                onClick={() => onSelectTrack("ALL")}
                className={`btn-pressable inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider transition-all ${
                  selectedTrack === "ALL"
                    ? "border border-[#160207] bg-[#620821] text-white shadow-hard-xs"
                    : "text-[#48232C] hover:text-[#991B3D]"
                }`}
              >
                <span>All Tracks</span>
                <span className={`rounded px-1.5 py-0.2 font-mono text-[10px] ${selectedTrack === "ALL" ? "bg-black/30 text-white" : "bg-[#EADBCC] text-[#380412]"}`}>
                  {totalCount}
                </span>
              </button>

              {/* Web2 */}
              <button
                type="button"
                onClick={() => onSelectTrack("Web2")}
                className={`btn-pressable inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider transition-all ${
                  selectedTrack === "Web2"
                    ? "border border-[#160207] bg-[#991B3D] text-white shadow-hard-xs"
                    : "text-[#48232C] hover:text-[#991B3D]"
                }`}
              >
                <span>Web2</span>
                <span className={`rounded px-1.5 py-0.2 font-mono text-[10px] ${selectedTrack === "Web2" ? "bg-black/30 text-white" : "bg-[#EADBCC] text-[#380412]"}`}>
                  {web2Count}
                </span>
              </button>

              {/* Web3 */}
              <button
                type="button"
                onClick={() => onSelectTrack("Web3")}
                className={`btn-pressable inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-heading font-black uppercase tracking-wider transition-all ${
                  selectedTrack === "Web3"
                    ? "border border-[#160207] bg-[#4B5D86] text-white shadow-hard-xs"
                    : "text-[#48232C] hover:text-[#991B3D]"
                }`}
              >
                <span>Web3</span>
                <span className={`rounded px-1.5 py-0.2 font-mono text-[10px] ${selectedTrack === "Web3" ? "bg-black/30 text-white" : "bg-[#EADBCC] text-[#380412]"}`}>
                  {web3Count}
                </span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search statements..."
              className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 pl-9 text-xs sm:text-sm font-medium text-[#1E030A] placeholder-[#6D4B54] shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-[#6D4B54]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-2 text-[10px] font-mono font-bold text-[#6D4B54] hover:text-[#1E030A]"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Live Count and Filter Status Strip */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#6D4B54]">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-[#620821]">{filteredCount}</strong> statement{filteredCount === 1 ? "" : "s"} for{" "}
              <span className="text-[#991B3D] font-bold">Code Relay {selectedEdition}</span>
              {selectedTrack !== "ALL" && (
                <> · Track: <span className="text-[#620821] font-bold">{selectedTrack}</span></>
              )}
            </span>
          </div>

          {(selectedTrack !== "ALL" || searchQuery) && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#991B3D] hover:text-[#620821] underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

