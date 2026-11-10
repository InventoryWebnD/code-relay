export interface WinningProject {
  place: string;
  title: string;
  track: string;
  summary: string;
  stack: string[];
}

export interface EditionStat {
  label: string;
  value: string;
}

export interface PastEdition {
  edition: string;
  shortCode: string;
  year: string;
  theme: string;
  tag: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  stats: EditionStat[];
  highlights: string[];
  winningProjects: WinningProject[];
  problemStatementQuery: string;
}

export interface CumulativeStat {
  value: string;
  label: string;
  color: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const CUMULATIVE_STATS: CumulativeStat[] = [
  { value: "2,900+", label: "Total Alumni Hackers", color: "text-[#620821]" },
  { value: "140+", label: "Shipped Projects", color: "text-[#991B3D]" },
  { value: "₹5,00,000+", label: "Awarded Grants", color: "text-[#4B5D86]" },
  { value: "4 EDITIONS", label: "Continuous Legacy", color: "text-[#380412]" },
];

export const PAST_EDITIONS: PastEdition[] = [
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

export const TESTIMONIALS: Testimonial[] = [
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

