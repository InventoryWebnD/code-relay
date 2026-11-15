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

type Entry = Pick<ProblemStatement, "title" | "description">;

const CR4 = { edition: "4.0", editionLabel: "Code Relay 4.0", editionType: "Online Hackathon" } as const;
const CR3 = { edition: "3.0", editionLabel: "Code Relay 3.0", editionType: "On-site Hackathon" } as const;

/** numbered per track: each edition runs two tracks, Web2 and Web3 */
function track(meta: typeof CR4 | typeof CR3, trackName: "Web2" | "Web3", prefix: string, entries: Entry[]): ProblemStatement[] {
  return entries.map((e, i) => ({
    id: `${prefix}-${trackName === "Web2" ? "w2" : "w3"}-${String(i + 1).padStart(2, "0")}`,
    ...meta,
    track: trackName,
    number: i + 1,
    ...e,
  }));
}

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  // ==========================================
  // CODE RELAY 4.0
  // ==========================================
  ...track(CR4, "Web2", "cr4", [
    {
      title: "Open Innovation: Building for India",
      description:
        "Rethink solutions for the size and diversity of India through cross-domain innovation. This track encourages submissions that tackle national issues in digital governance, sustainable development, healthcare accessibility, education equity, climate resilience, mobility, and infrastructure in India. Develop scalable, inclusive, and technology-driven solutions that harness the power of India's digital public infrastructure.",
    },
    {
      title: "FinTech & Financial Inclusion",
      description:
        "Develop secure and inclusive financial offerings for all users. Focus on innovations in digital payments, credit, insurance, fraud, and financial literacy leveraging the robust fintech ecosystem in the world.",
    },
    {
      title: "Mobility & Transportation Innovation: Moving India Forward",
      description:
        "Reimagine how India moves in a world of increasing urbanization and mobility needs. Develop intelligent and scalable solutions for traffic, public transportation, EV charging, logistics, and road safety. Prioritize sustainable and data-enabled mobility solutions that alleviate congestion, enhance accessibility, and enable India's transition to a smart and ready-for-the-future transportation ecosystem.",
    },
    {
      title: "Engineering the Flow of Trade",
      description:
        "Create accessible logistics infrastructure to support small and growing businesses in managing delivery, inventory, and supply chains. This will enable real-time tracking, route optimization, and intuitive dashboards that will minimize costs and maximize efficiency in trade.",
    },
  ]),
  ...track(CR4, "Web3", "cr4", [
    {
      title: "Scalability and High-Throughput Infrastructure",
      description:
        "Develop Layer 2 solutions or faster consensus mechanisms that enable high-frequency transactions without the high costs and slow speeds of Layer 1 chains. Layer 1 security should not be compromised.",
    },
    {
      title: "Decentralised Storage & Content Persistence",
      description: "Utilize decentralized storage (IPFS/Filecoin) to build applications that ensure content is persistent.",
    },
    {
      title: "Privacy-Preserving Compliance",
      description:
        "Implement decentralized identity solutions using Zero-Knowledge Proofs (ZKPs). This enables users to verify their identity and meet global regulatory standards (KYC/AML) while maintaining data sovereignty, ensuring that sensitive personal information is never stored on-chain or shared with unauthorized parties.",
    },
    {
      title: "Decentralised Identity (DID) & Privacy Management",
      description:
        "Develop self-sovereign identity solutions that allow users to control their personal data without relying on central authorities (e.g., Google/Facebook logins), specifically addressing privacy issues on public blockchains.",
    },
  ]),

  // ==========================================
  // CODE RELAY 3.0
  // ==========================================
  ...track(CR3, "Web2", "cr3", [
    {
      title: "Developer Optimisation",
      description:
        "Unlock your full potential! Our Developer Optimization track equips you with tools, practices, and strategies to enhance coding efficiency, streamline workflows, and boost collaboration. Dive into code quality, CI/CD pipelines, and developer productivity tools to build faster, smarter, and more impactful solutions.",
    },
    {
      title: "On-Campus Impact",
      description:
        "Transform campus life! This track is dedicated to creating projects that empower students on campus. Develop solutions to streamline academic management, enhance communication, improve accessibility to resources, and foster a thriving campus community through innovative Web2 applications.",
    },
    {
      title: "Open Innovation",
      description:
        "The Open Innovation track is your platform to leverage Web2 technologies. Collaborate with diverse minds, address real-world challenges, and develop impactful solutions through dynamic web applications, user-focused platforms, and seamless online integrations.",
    },
  ]),
  ...track(CR3, "Web3", "cr3", [
    {
      title: "AI x Web3: Transforming Supply Chains",
      description:
        "Reimagine supply chain management with AI and Web3. Build transparent, efficient, and sustainable systems to tackle traceability, authenticity, and ethical challenges, leveraging blockchain for trust and AI for smarter solutions.",
    },
    {
      title: "DeFinance",
      description:
        "Revolutionize finance with blockchain and decentralization. Explore DeFi, tokenized assets, and P2P lending to build secure, scalable solutions promoting transparency and financial inclusion.",
    },
    {
      title: "Open Innovation Web3",
      description:
        "Step into the future of the internet with the Open Innovation Web3 track. Explore decentralized technologies to design solutions that empower communities, enhance transparency, and redefine trust. From dApps to DAOs, leverage blockchain, smart contracts, and tokenized systems to create impactful, scalable innovations that break traditional boundaries.",
    },
  ]),
];
