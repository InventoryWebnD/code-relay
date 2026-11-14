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
    <section className="sticky top-[69px] z-30 w-full border-b border-[rgba(255,255,255,0.08)] bg-[#160207]/90 backdrop-blur-md py-4">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Track Filter Segmented Control */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#E8738D] uppercase tracking-wider mr-1">
              Track:
            </span>
            <div className="inline-flex rounded-full border border-[rgba(255,255,255,0.12)] bg-[#20030a]/80 p-1">
              {/* All Tracks */}
              <button
                type="button"
                onClick={() => onSelectTrack("ALL")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedTrack === "ALL"
                    ? "bg-[#991B3D] text-white shadow-sm"
                    : "text-[#E0D4C3] hover:text-white"
                }`}
              >
                <span>All Tracks</span>
                <span className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${selectedTrack === "ALL" ? "bg-black/30 text-white" : "bg-white/10 text-[#E0D4C3]"}`}>
                  {totalCount}
                </span>
              </button>

              {/* Web2 */}
              <button
                type="button"
                onClick={() => onSelectTrack("Web2")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedTrack === "Web2"
                    ? "bg-[#991B3D] text-white shadow-sm"
                    : "text-[#E0D4C3] hover:text-white"
                }`}
              >
                <span>Web2</span>
                <span className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${selectedTrack === "Web2" ? "bg-black/30 text-white" : "bg-white/10 text-[#E0D4C3]"}`}>
                  {web2Count}
                </span>
              </button>

              {/* Web3 */}
              <button
                type="button"
                onClick={() => onSelectTrack("Web3")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedTrack === "Web3"
                    ? "bg-[#4B5D86] text-white shadow-sm"
                    : "text-[#E0D4C3] hover:text-white"
                }`}
              >
                <span>Web3</span>
                <span className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${selectedTrack === "Web3" ? "bg-black/30 text-white" : "bg-white/10 text-[#E0D4C3]"}`}>
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
              className="w-full rounded-full border border-[rgba(255,255,255,0.14)] bg-[#20030a]/80 px-4 py-1.5 pl-9 text-xs sm:text-sm font-medium text-[#F6F0E8] placeholder-[#E0D4C3]/50 focus:border-[#991B3D] focus:outline-none transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-[#E0D4C3]/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-2 text-[10px] font-mono font-bold text-[#E8738D] hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Live Count and Filter Status Strip */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#E0D4C3]/70">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-[#F6F0E8]">{filteredCount}</strong> statement{filteredCount === 1 ? "" : "s"} for{" "}
              <span className="text-[#E8738D] font-bold">Code Relay {selectedEdition}</span>
              {selectedTrack !== "ALL" && (
                <> · Track: <span className="text-[#F6F0E8] font-bold">{selectedTrack}</span></>
              )}
            </span>
          </div>

          {(selectedTrack !== "ALL" || searchQuery) && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#E8738D] hover:text-white underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
