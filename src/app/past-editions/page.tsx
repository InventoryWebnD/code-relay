"use client";

import Link from "next/link";

interface PastEdition {
  edition: string;
  shortCode: string;
  year: string;
  theme: string;
  tag: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  winningProjects: {
    place: string;
    title: string;
    track: string;
    summary: string;
    stack: string[];
  }[];
  problemStatementQuery: string;
}

export default function PastEditionsPage() {
  const pastEditions: PastEdition[] = [
    {
      edition: "Code Relay 4.0",
      shortCode: "CR 4.0",
      year: "2024",
      theme: "Autonomous Infrastructure & Agentic Systems",
      tag: "FLAGSHIP WEB & AI",
      accentColor: "#991B3D",
      badgeBg: "bg-[#991B3D] text-white",
      description: "Our largest edition to date. Over 1,200 builders from 120+ colleges competed across dual tracks, deploying autonomous agent workflows, distributed real-time telemetry pipelines, and account abstraction infrastructure.",
      stats: [
        { label: "Participants", value: "1,200+" },
        { label: "Prize Pool", value: "₹2,00,000" },
        { label: "Finalist Teams", value: "48" },
        { label: "Colleges Represented", value: "120+" },
      ],
      highlights: [
        "First edition featuring autonomous AI telemetry and agent orchestration benchmarks",
        "Introduction of the 36-hour continuous relay sprint format with live midnight review rounds",
        "100% of finalist projects deployed live on production domains or EVM testnets",
      ],
      winningProjects: [
        {
          place: "1ST PLACE (WEB2 TRACK)",
          title: "NexusFlow Engine",
          track: "WEB2",
          summary: "An autonomous telemetry analyzer and patch synthesis pipeline correlating OpenTelemetry traces with git histories to isolate production bugs.",
          stack: ["TypeScript", "FastAPI", "OpenTelemetry", "Vector DB"],
        },
        {
          place: "1ST PLACE (WEB3 TRACK)",
          title: "RollupKey AA",
          track: "WEB3",
          summary: "An ERC-4337 smart account infrastructure enabling automated scope-constrained session keys and gas sponsorship policies across multi-chain rollups.",
          stack: ["Solidity", "Foundry", "ERC-4337", "Next.js"],
        },
      ],
      problemStatementQuery: "Code Relay 4.0",
    },
    {
      edition: "Code Relay 3.0",
      shortCode: "CR 3.0",
      year: "2023",
      theme: "Protocols, Primitives & Decentralization",
      tag: "THE DECENTRALIZED FORK",
      accentColor: "#4B5D86",
      badgeBg: "bg-[#4B5D86] text-white",
      description: "The pivotal edition that introduced our dedicated Web3 track. 42 smart-contract, cryptographic proof, and decentralized governance systems were deployed live, accompanied by scalable distributed Web2 backends.",
      stats: [
        { label: "Participants", value: "850+" },
        { label: "Prize Pool", value: "₹1,50,000" },
        { label: "Submissions", value: "42" },
        { label: "Colleges Represented", value: "85+" },
      ],
      highlights: [
        "Inaugural launch of the dedicated Web3 and cryptographic protocol track",
        "Implementation of live on-chain testnet deployment evaluations",
        "Technical mentorship pairing with leading blockchain and full-stack researchers",
      ],
      winningProjects: [
        {
          place: "1ST PLACE (WEB3 TRACK)",
          title: "ZK-Attest Relay",
          track: "WEB3",
          summary: "Trust-minimized zero-knowledge collegiate credential attestation platform using Circom circuits and Groth16 on-chain verifier contracts.",
          stack: ["Circom", "SnarkJS", "Solidity", "Next.js"],
        },
        {
          place: "1ST PLACE (WEB2 TRACK)",
          title: "MeshCanvas CRDT",
          track: "WEB2",
          summary: "Peer-to-peer real-time collaborative document editor utilizing state-based CRDTs over WebRTC data channels with sub-50ms peer delta sync.",
          stack: ["WebRTC", "TypeScript", "CRDT Algorithms", "WebSockets"],
        },
      ],
      problemStatementQuery: "Code Relay 3.0",
    },
    {
      edition: "Code Relay 2.0",
      shortCode: "CR 2.0",
      year: "2022",
      theme: "The Relay Foundation: Synchronized Sprints",
      tag: "THE RELAY FOUNDATION",
      accentColor: "#620821",
      badgeBg: "bg-[#620821] text-white",
      description: "Established our signature continuous relay sprint mechanism where multidisciplinary cells passed architectural batons across interface, backend, and testing layers.",
      stats: [
        { label: "Participants", value: "500+" },
        { label: "Prize Pool", value: "₹1,00,000" },
        { label: "Finalist Teams", value: "30" },
        { label: "Colleges Represented", value: "60+" },
      ],
      highlights: [
        "Pioneered the multi-stage relay handoff format testing interface contract discipline",
        "First hybrid event format hosted at the IIT Bhubaneswar campus",
        "Creation of the enduring WebnD Hackathon alumni network",
      ],
      winningProjects: [
        {
          place: "1ST PLACE OVERALL",
          title: "RelayHandoff CI",
          track: "WEB2",
          summary: "Automated API contract mocking and git-branch orchestration dashboard streamlining synchronization between frontend and backend sprint cells.",
          stack: ["Node.js", "Docker", "GraphQL", "React"],
        },
      ],
      problemStatementQuery: "Code Relay 2.0",
    },
    {
      edition: "Code Relay 1.0",
      shortCode: "CR 1.0",
      year: "2021",
      theme: "The Genesis Relay",
      tag: "THE INAUGURAL SPRINT",
      accentColor: "#380412",
      badgeBg: "bg-[#380412] text-white",
      description: "The founding edition conceived during the digital era by the Web and Design Society (WebnD) to foster inter-collegiate collaborative development under tight sprint constraints.",
      stats: [
        { label: "Participants", value: "350+" },
        { label: "Prize Pool", value: "₹50,000" },
        { label: "Submissions", value: "22" },
        { label: "Colleges Represented", value: "35+" },
      ],
      highlights: [
        "Inaugural collegiate hackathon organized by WebnD IIT Bhubaneswar",
        "Established the core principle of rigorous code evaluation and working demos",
        "Laid the cornerstone for future national editions",
      ],
      winningProjects: [
        {
          place: "1ST PLACE OVERALL",
          title: "OmniSync Hub",
          track: "WEB2",
          summary: "Distributed webhook ingestion gateway with exponential retry policies and idempotency caching.",
          stack: ["Python", "FastAPI", "Redis", "Vue.js"],
        },
      ],
      problemStatementQuery: "Code Relay 2.0",
    },
  ];

  const testimonials = [
    {
      quote: "Code Relay pushed our team to think about real distributed system constraints rather than just superficial toy apps. The 36-hour sprint format and mentor review at IIT Bhubaneswar gave our team the engineering confidence to launch our dev-tools startup.",
      author: "Rohan S.",
      role: "CR 4.0 Track Winner · IIT Bombay Alumnus",
    },
    {
      quote: "The relay baton structure was the most refreshing hackathon format we've experienced. You can't just hack messy spaghetti code; your architectural interfaces have to be clean and modular for your teammates to build upon.",
      author: "Aditi M.",
      role: "CR 3.0 Finalist · NIT Rourkela",
    },
    {
      quote: "Evaluating Code Relay submissions showed collegiate engineering at its absolute finest. The depth of the zero-knowledge circuits and CRDT implementations matched production-level quality.",
      author: "Vikram N.",
      role: "Staff Engineer · Industry Mentor & Judge",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* 1. Header Section */}
      <section className="relative w-full pt-12 pb-16 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-start max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-4">
              <span className="text-xs font-mono font-bold text-[#620821] uppercase tracking-wider">
                Community Legacy · Editions 1.0 — 4.0
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821] mb-6">
              PAST EDITIONS &amp; LEGACY
            </h1>

            <p className="text-lg text-[#3A1822] font-medium leading-relaxed mb-6">
              Four previous editions. Thousands of lines of code pushed. A flourishing nationwide network of collegiate founders, systems engineers, and protocol researchers. Explore the evolution of Code Relay at IIT Bhubaneswar.
            </p>

            {/* Verified Cumulative Statistics Pill */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-[#E0D4C3]">
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#620821]">2,900+</span>
                <span className="text-xs font-semibold text-[#6D4B54] uppercase font-mono">Total Alumni Hackers</span>
              </div>
              <div className="flex flex-col border-l-2 border-[#E0D4C3] pl-3 sm:pl-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#991B3D]">140+</span>
                <span className="text-xs font-semibold text-[#6D4B54] uppercase font-mono">Shipped Projects</span>
              </div>
              <div className="flex flex-col border-l-2 border-[#E0D4C3] pl-3 sm:pl-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#4B5D86]">₹5,00,000+</span>
                <span className="text-xs font-semibold text-[#6D4B54] uppercase font-mono">Awarded Grants</span>
              </div>
              <div className="flex flex-col border-l-2 border-[#E0D4C3] pl-3 sm:pl-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#380412]">4 EDITIONS</span>
                <span className="text-xs font-semibold text-[#6D4B54] uppercase font-mono">Continuous Legacy</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Chronological Overview of Editions */}
      <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12 space-y-16">
          
          {pastEditions.map((edition) => (
            <div
              key={edition.edition}
              className="rounded-2xl border-3 border-[#160207] bg-[#FFFDF9] shadow-hard-xl overflow-hidden"
            >
              {/* Top Banner Bar */}
              <div className="border-b-2 border-[#160207] bg-[#620821] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#160207] font-heading font-black text-sm text-white shadow-hard-xs"
                    style={{ backgroundColor: edition.accentColor }}
                  >
                    {edition.shortCode.split(" ")[1]}
                  </div>
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-white">
                      {edition.edition} ({edition.year})
                    </h2>
                    <span className="font-mono text-xs text-[#E0D4C3]">
                      THEME: {edition.theme}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-md border border-[#160207] px-2.5 py-0.5 font-mono text-[11px] font-black uppercase shadow-hard-xs ${edition.badgeBg}`}>
                    {edition.tag}
                  </span>
                  <Link
                    href={`/problem-statements`}
                    className="btn-pressable inline-flex items-center gap-1.5 rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-3 py-1 text-xs font-mono font-bold text-white shadow-hard-xs transition-colors"
                  >
                    <span>Archived Challenges</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                
                {/* Description & Stat Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <p className="text-base sm:text-lg text-[#3A1822] leading-relaxed font-medium">
                      {edition.description}
                    </p>

                    <h4 className="font-mono text-xs font-bold uppercase text-[#991B3D] mt-6 mb-3 tracking-wider">
                      EDITION HIGHLIGHTS:
                    </h4>
                    <ul className="space-y-2">
                      {edition.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#48232C]">
                          <span className="text-[#991B3D] font-bold shrink-0">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    {edition.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border-2 border-[#160207] bg-[#F6F0E8] p-4 text-center shadow-hard-xs"
                      >
                        <span className="font-heading font-black text-2xl sm:text-3xl text-[#620821] block mb-0.5">
                          {stat.value}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#6D4B54] uppercase">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Winning Projects Showcase */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E0D4C3]">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#620821]">
                      NOTABLE WINNING PROJECTS &amp; IMPLEMENTATIONS
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {edition.winningProjects.map((proj) => (
                      <div
                        key={proj.title}
                        className="rounded-xl border-2 border-[#160207] bg-[#F6F0E8] p-5 shadow-hard-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="rounded border border-[#160207] bg-[#991B3D] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white shadow-hard-xs">
                              {proj.place}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#4B5D86]">
                              {proj.track} TRACK
                            </span>
                          </div>

                          <h4 className="font-heading text-lg font-bold text-[#620821] mb-2">
                            {proj.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-[#48232C] leading-relaxed mb-4">
                            {proj.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E0D4C3] flex flex-wrap gap-1.5">
                          {proj.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-[#160207] bg-[#FFFDF9] px-2 py-0.5 text-[10px] font-mono font-bold text-[#620821]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Card Footer */}
              <div className="border-t border-[#160207] bg-[#F6F0E8] px-6 py-3 flex items-center justify-between text-xs font-mono text-[#6D4B54]">
                <span>WebnD · IIT Bhubaneswar Archive</span>
                <span className="text-[#620821] font-semibold">{edition.edition} Historical Record</span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 3. Community Testimonials */}
      <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#620821] text-white">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#380412] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                Voices from the Sprint
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              BUILT &amp; TESTED BY BUILDERS
            </h2>
            <p className="mt-2 text-base text-[#F6F0E8]/90 max-w-xl">
              Hear what past winners, finalists, and industry judges say about the Code Relay experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="card-25d rounded-xl border-2 border-[#160207] bg-[#380412] p-6 sm:p-7 shadow-hard-lg flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-heading font-black text-[#F6F0E8] mb-3">
                    “
                  </div>
                  <p className="text-sm text-[#F6F0E8]/90 leading-relaxed mb-6 italic">
                    {t.quote}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#160207]">
                  <span className="font-heading font-bold text-white text-sm block">
                    {t.author}
                  </span>
                  <span className="font-mono text-xs text-[#E0D4C3] block mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Bottom Navigation Bar */}
      <section className="relative w-full py-12 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#620821]">
              Be Part of the Next Chapter: Edition 5.0
            </h3>
            <p className="text-sm text-[#48232C] mt-0.5 font-medium">
              Registration is opening soon for colleges across India.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/event"
              className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#FFFDF9] px-5 py-2.5 text-xs font-heading font-bold text-[#620821] shadow-hard-xs hover:bg-[#EADBCC]"
            >
              The Event Overview →
            </Link>
            <Link
              href="/problem-statements"
              className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-5 py-2.5 text-xs font-heading font-bold text-white shadow-hard-xs"
            >
              Past Problem Statements →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
