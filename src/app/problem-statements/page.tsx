"use client";

import { useState, useMemo } from "react";
import { PROBLEM_STATEMENTS, ProblemStatement } from "@/data/problemStatements";
import {
  ProblemStatementsHero,
  ProblemStatementsFilters,
  ProblemStatementsGrid,
  ProblemStatementModal,
} from "@/components/problem-statements";

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
      if (selectedTrack !== "ALL" && item.track !== selectedTrack) {
        return false;
      }
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

  const handleResetFilters = () => {
    setSelectedTrack("ALL");
    setSearchQuery("");
  };

  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* 1. Compact Hero / Introduction */}
      <ProblemStatementsHero
        selectedEdition={selectedEdition}
        onEditionChange={handleEditionChange}
      />

      {/* 2. Controls: Track Filters & Search */}
      <ProblemStatementsFilters
        selectedTrack={selectedTrack}
        onSelectTrack={setSelectedTrack}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={totalCount}
        web2Count={web2Count}
        web3Count={web3Count}
        filteredCount={filteredStatements.length}
        selectedEdition={selectedEdition}
        onReset={handleResetFilters}
      />

      {/* 3. Problem Statement Cards Grid */}
      <ProblemStatementsGrid
        statements={filteredStatements}
        onExplore={(st) => setActiveStatement(st)}
        onResetFilters={handleResetFilters}
      />

      {/* 4. Explore Challenge Modal */}
      <ProblemStatementModal
        statement={activeStatement}
        onClose={() => setActiveStatement(null)}
        copiedId={copiedId}
        onCopyCitation={handleCopyCitation}
      />
    </div>
  );
}
