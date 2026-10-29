export interface ProblemStatement {
  id: string;
  edition: "4.0" | "3.0";
  editionLabel: string;
  editionType: string;
  track: "Web2" | "Web3";
  number: number;
  title: string;
  description: string;
}

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  // ==========================================
  // CODE RELAY 4.0 — WEB2 (4 STATEMENTS)
  // ==========================================
  {
    id: "cr4-w2-01",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web2",
    number: 1,
    title: "Open Innovation: Building for India",
    description:
      "Develop scalable, inclusive, technology-driven solutions addressing national challenges in digital governance, sustainable development, healthcare accessibility, education equity, climate resilience, mobility, and infrastructure. Solutions may leverage India's digital public infrastructure.",
  },
  {
    id: "cr4-w2-02",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web2",
    number: 2,
    title: "FinTech & Financial Inclusion",
    description:
      "Create secure and inclusive financial solutions addressing digital payments, credit, insurance, fraud prevention, and financial literacy.",
  },
  {
    id: "cr4-w2-03",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web2",
    number: 3,
    title: "Mobility & Transportation Innovation",
    description:
      "Develop intelligent, sustainable solutions for traffic, public transportation, EV charging, logistics, and road safety, improving accessibility and reducing congestion.",
  },
  {
    id: "cr4-w2-04",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web2",
    number: 4,
    title: "Engineering the Flow of Trade",
    description:
      "Build accessible logistics solutions for small and growing businesses, including inventory management, delivery tracking, route optimization, and supply-chain visibility.",
  },

  // ==========================================
  // CODE RELAY 4.0 — WEB3 (4 STATEMENTS)
  // ==========================================
  {
    id: "cr4-w3-01",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web3",
    number: 1,
    title: "Scalability and High-Throughput Infrastructure",
    description:
      "Explore Layer 2 solutions or faster consensus mechanisms that enable high-frequency transactions at lower cost while preserving Layer 1 security.",
  },
  {
    id: "cr4-w3-02",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web3",
    number: 2,
    title: "Decentralised Storage & Content Persistence",
    description:
      "Use decentralized storage technologies such as IPFS or Filecoin to build applications that support persistent content availability.",
  },
  {
    id: "cr4-w3-03",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web3",
    number: 3,
    title: "Privacy-Preserving Compliance",
    description:
      "Explore decentralized identity and zero-knowledge proofs to support regulatory verification, such as KYC/AML, while protecting sensitive personal information.",
  },
  {
    id: "cr4-w3-04",
    edition: "4.0",
    editionLabel: "Code Relay 4.0",
    editionType: "Online Hackathon",
    track: "Web3",
    number: 4,
    title: "Decentralised Identity (DID) & Privacy Management",
    description:
      "Build self-sovereign identity solutions that give users control over their personal data without dependence on centralized identity providers.",
  },

  // ==========================================
  // CODE RELAY 3.0 — WEB2 (3 STATEMENTS)
  // ==========================================
  {
    id: "cr3-w2-01",
    edition: "3.0",
    editionLabel: "Code Relay 3.0",
    editionType: "On-site Hackathon",
    track: "Web2",
    number: 1,
    title: "Developer Optimisation",
    description:
      "Create tools and workflows that improve coding efficiency, code quality, CI/CD, collaboration, and developer productivity.",
  },
  {
    id: "cr3-w2-02",
    edition: "3.0",
    editionLabel: "Code Relay 3.0",
    editionType: "On-site Hackathon",
    track: "Web2",
    number: 2,
    title: "On-Campus Impact",
    description:
      "Develop Web2 applications that improve campus life through academic management, communication, resource accessibility, and student community engagement.",
  },
  {
    id: "cr3-w2-03",
    edition: "3.0",
    editionLabel: "Code Relay 3.0",
    editionType: "On-site Hackathon",
    track: "Web2",
    number: 3,
    title: "Open Innovation",
    description:
      "Use Web2 technologies to solve real-world problems through dynamic web applications, user-focused platforms, and online integrations.",
  },

  // ==========================================
  // CODE RELAY 3.0 — WEB3 (3 STATEMENTS)
  // ==========================================
  {
    id: "cr3-w3-01",
    edition: "3.0",
    editionLabel: "Code Relay 3.0",
    editionType: "On-site Hackathon",
    track: "Web3",
    number: 1,
    title: "AI x Web3: Transforming Supply Chains",
    description:
      "Combine AI and blockchain to improve supply-chain traceability, authenticity, efficiency, and sustainability.",
  },
  {
    id: "cr3-w3-02",
    edition: "3.0",
    editionLabel: "Code Relay 3.0",
    editionType: "On-site Hackathon",
    track: "Web3",
    number: 2,
    title: "DeFinance",
    description:
      "Explore decentralized finance, tokenized assets, and peer-to-peer lending to create secure and transparent financial solutions.",
  },
  {
    id: "cr3-w3-03",
    edition: "3.0",
    editionLabel: "Code Relay 3.0",
    editionType: "On-site Hackathon",
    track: "Web3",
    number: 3,
    title: "Open Innovation Web3",
    description:
      "Build decentralized applications, DAOs, smart-contract systems, or tokenized solutions that improve transparency, community empowerment, and trust.",
  },
];

