"use client";

import { useState, useMemo } from "react";
import { PROBLEM_STATEMENTS, ProblemStatement } from "@/data/problemStatements";
import ProblemStatementCard from "@/components/ProblemStatementCard";

export default function ProblemStatementsPage() {
  const [selectedEdition, setSelectedEdition] = useState<"4.0" | "3.0">("4.0");
  const [selectedTrack, setSelectedTrack] = useState<"ALL" | "Web2" | "Web3">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatement, setActiveStatement] = useState<ProblemStatement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Switch edition and reset track filter
  const handleEditionChange = (edition: "4.0" | "3.0") => {
    setSelectedEdition(edition);
    setSelectedTrack("ALL");
    setSearchQuery("");
  };

  // Base list of statements for the chosen edition
  const editionStatements = useMemo(() => {
    return PROBLEM_STATEMENTS.filter((item) => item.edition === selectedEdition);
  }, [selectedEdition]);

  // Exact counts for current edition
  const totalCount = editionStatements.length;
  const web2Count = useMemo(
    () => editionStatements.filter((item) => item.track === "Web2").length,
    [editionStatements]
  );
  const web3Count = useMemo(
    () => editionStatements.filter((item) => item.track === "Web3").length,
    [editionStatements]
  );

  // Filtered statements based on track and search
  const filteredStatements = useMemo(() => {
    return editionStatements.filter((item) => {
      // Track filter
      if (selectedTrack !== "ALL" && item.track !== selectedTrack) {
        return false;
      }
      // Optional search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        return matchesTitle || matchesDesc;
      }
      return true;
    });
  }, [editionStatements, selectedTrack, searchQuery]);

  const handleCopyCitation = (statement: ProblemStatement) => {
    const text = `${statement.title} — ${statement.editionLabel} (${statement.track} Track)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(statement.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* ========================================================
          1. COMPACT HERO / INTRODUCTION
          ======================================================== */}
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
                onClick={() => handleEditionChange("4.0")}
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
                onClick={() => handleEditionChange("3.0")}
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

      {/* ========================================================
          2. CONTROLS: TRACK FILTERS & SEARCH
          ======================================================== */}
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
                  onClick={() => setSelectedTrack("ALL")}
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
                  onClick={() => setSelectedTrack("Web2")}
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
                  onClick={() => setSelectedTrack("Web3")}
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  onClick={() => setSearchQuery("")}
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
                Showing <strong className="text-[#620821]">{filteredStatements.length}</strong> statement{filteredStatements.length === 1 ? "" : "s"} for{" "}
                <span className="text-[#991B3D] font-bold">Code Relay {selectedEdition}</span>
                {selectedTrack !== "ALL" && (
                  <> · Track: <span className="text-[#620821] font-bold">{selectedTrack}</span></>
                )}
              </span>
            </div>

            {(selectedTrack !== "ALL" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack("ALL");
                  setSearchQuery("");
                }}
                className="text-[#991B3D] hover:text-[#620821] underline font-bold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PROBLEM STATEMENT CARDS GRID
          ======================================================== */}
      <section className="relative w-full py-12 sm:py-16 border-b-2 border-[#160207] bg-[#F6F0E8] min-h-[500px]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          {filteredStatements.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border-2 border-[#160207] bg-[#FFFDF9] p-10 sm:p-14 text-center shadow-hard-lg max-w-xl mx-auto">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#160207] bg-[#EADBCC] text-[#620821] shadow-hard-xs mb-4">
                <svg className="w-6 h-6 text-[#620821]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#620821] mb-2">
                No Problem Statements Found
              </h3>
              <p className="text-sm text-[#48232C] mb-6">
                No challenges matched your active filters for Code Relay {selectedEdition}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack("ALL");
                  setSearchQuery("");
                }}
                className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-white shadow-hard-xs"
              >
                Reset to All Tracks
              </button>
            </div>
          ) : (
            /* Responsive Grid: 2 or 3 cols on desktop, 1 on mobile */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredStatements.map((statement) => (
                <ProblemStatementCard
                  key={statement.id}
                  statement={statement}
                  onExplore={(st) => setActiveStatement(st)}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================
          4. EXPLORE CHALLENGE MODAL
          ======================================================== */}
      {activeStatement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-statement-title"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border-3 border-[#160207] bg-[#FAF6F0] p-6 sm:p-8 shadow-hard-xl text-left animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveStatement(null)}
              aria-label="Close dialog"
              className="btn-pressable absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#EADBCC] text-[#620821] hover:bg-[#991B3D] hover:text-white shadow-hard-xs transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`rounded-md border border-[#160207] px-2.5 py-0.5 text-[11px] font-heading font-black uppercase tracking-wider shadow-hard-xs ${
                  activeStatement.track === "Web2" ? "bg-[#991B3D] text-white" : "bg-[#4B5D86] text-white"
                }`}
              >
                {activeStatement.track} Track
              </span>
              <span className="rounded border border-[#160207] bg-[#EADBCC] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#380412]">
                {activeStatement.editionLabel}
              </span>
              <span className="font-mono text-xs text-[#6D4B54]">
                {String(activeStatement.number).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h2 id="modal-statement-title" className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#620821] mb-4 pr-8 leading-snug">
              {activeStatement.title}
            </h2>

            {/* Technical Context Tag */}
            <div className="rounded-lg border border-[#160207] bg-[#FFFDF9] px-3.5 py-2 mb-6 shadow-hard-xs flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#620821]">
                Edition Format: {activeStatement.editionType}
              </span>
            </div>

            {/* Faithful Source Description */}
            <div className="mb-6">
              <h3 className="font-mono text-xs font-bold text-[#991B3D] uppercase tracking-wider mb-2">
                Problem Brief
              </h3>
              <div className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-5">
                <p className="text-base text-[#2E181E] leading-relaxed">
                  {activeStatement.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#E0D4C3] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopyCitation(activeStatement)}
                className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-2 text-xs font-mono font-bold text-[#620821] shadow-hard-xs hover:bg-[#EADBCC]"
              >
                <span>{copiedId === activeStatement.id ? "Copied Citation" : "Copy Title & Citation"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStatement(null)}
                className="btn-pressable rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-5 py-2 text-xs font-heading font-black uppercase tracking-wider text-white shadow-hard-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
