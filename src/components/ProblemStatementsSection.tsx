"use client";

export default function ProblemStatementsSection() {
  const statements = [
    {
      track: "WEB2",
      badgeColor: "bg-[#2563eb]",
      code: "PS-01",
      domain: "DISTRIBUTED CACHING & REAL-TIME COLLABORATION",
      title: "Decentralized Peer-to-Peer Document Relay Engine",
      summary: "Engineer a conflict-free replicated data type (CRDT) document synchronization system operating under intermittent packet loss with sub-50ms delta propagation.",
      status: "STATEMENT RELEASING AT OPENING CEREMONY",
    },
    {
      track: "WEB2",
      badgeColor: "bg-[#2563eb]",
      code: "PS-02",
      domain: "AI TOOLING & AGENTIC WORKFLOWS",
      title: "Context-Aware Autonomous Bug Localization Pipeline",
      summary: "Build an active telemetry analyzer that consumes streaming runtime trace logs to isolate regressions and suggest deterministic patches in real-time.",
      status: "STATEMENT RELEASING AT OPENING CEREMONY",
    },
    {
      track: "WEB3",
      badgeColor: "bg-[#7c3aed]",
      code: "PS-03",
      domain: "ACCOUNT ABSTRACTION & GAS SUBSIDIES",
      title: "Session Key Orchestrator for Multi-Chain Microtransactions",
      summary: "Develop an ERC-4337 smart account infrastructure enabling automated session validation and gas-sponsorship policies across heterogenous rollup networks.",
      status: "STATEMENT RELEASING AT OPENING CEREMONY",
    },
    {
      track: "WEB3",
      badgeColor: "bg-[#7c3aed]",
      code: "PS-04",
      domain: "ZERO KNOWLEDGE & PRIVACY RAILS",
      title: "Trust-Minimized Verifiable Credential Relay",
      summary: "Design an off-chain computational circuit with on-chain cryptographic zk-SNARK attestation ensuring user compliance without identity leakage.",
      status: "STATEMENT RELEASING AT OPENING CEREMONY",
    },
  ];

  return (
    <section id="problem-statements" className="relative w-full py-20 border-b-2 border-black bg-[#070b14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-black bg-[#131d33] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#d4ff00] uppercase">
                {"// SECTION 03.5: PROBLEM VERTICALS"}
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              PROBLEM STATEMENTS
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Challenging architectural problems curated with technical mentors. Full challenge repositories and test harnesses go live on hack day.
          </p>
        </div>

        {/* Statements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {statements.map((ps) => (
            <div
              key={ps.code}
              className="card-25d relative flex flex-col justify-between rounded-xl border-2 border-black bg-[#0d1424] p-6 shadow-hard-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#1e293b]">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md border border-black px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-hard-xs ${ps.badgeColor}`}>
                      {ps.track}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {ps.code}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase">
                    36H MARATHON SPEC
                  </span>
                </div>

                <span className="block font-mono text-[11px] font-bold text-[#60a5fa] uppercase tracking-wider mb-2">
                  DOMAIN: {ps.domain}
                </span>

                <h3 className="font-heading text-xl font-bold text-white mb-2 leading-snug">
                  {ps.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {ps.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#d4ff00] font-bold">
                  ⚡ {ps.status}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#d4ff00] animate-ping" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
