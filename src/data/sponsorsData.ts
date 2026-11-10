export interface SponsorTier {
  tier: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  deliverables: string[];
  status: string;
  statusColor: string;
}

export interface EcosystemSupporter {
  name: string;
  role: string;
  notes: string;
}

export interface PartnershipCategoryOption {
  value: string;
  label: string;
}

export const TIER_OPPORTUNITIES: SponsorTier[] = [
  {
    tier: "Tier 01: Title Partner",
    badge: "EXCLUSIVE (1 SLOT)",
    badgeColor: "bg-[#991B3D] text-white",
    title: "Title & Flagship Sponsor",
    description: "Co-branding with Code Relay 5.0, opening keynote address, customized track challenge, and exclusive recruitment dinner with top finalists.",
    deliverables: [
      "Primary brand placement across all media, stream & certificates",
      "Keynote stage address at the Opening & Closing ceremonies",
      "Dedicated mentor lounge and private recruitment interviews",
      "Exclusive company challenge bounty pool (Web2 or Web3)"
    ],
    status: "OPEN FOR INVITATION",
    statusColor: "text-[#991B3D]"
  },
  {
    tier: "Tier 02: Track Sponsors",
    badge: "DUAL VERTICAL (2 SLOTS)",
    badgeColor: "bg-[#620821] text-white",
    title: "Web2 & Web3 Track Partners",
    description: "Own an entire problem vertical. Curate the technical challenge guidelines, assign judges, and evaluate candidate solutions.",
    deliverables: [
      "Named track branding ('[Your Brand] Web2 / Web3 Track')",
      "Curate dedicated problem statement and evaluation rubrics",
      "Direct access to all track submissions and git repositories",
      "Technical mentor pairing during the 36-hour sprint"
    ],
    status: "OPEN FOR INVITATION",
    statusColor: "text-[#620821]"
  },
  {
    tier: "Tier 03: Infrastructure & Cloud",
    badge: "PLATFORM (3 SLOTS)",
    badgeColor: "bg-[#4B5D86] text-white",
    title: "Compute, Cloud & Tooling Partners",
    description: "Empower hackers with computational resources, API credits, developer tooling quotas, and devnet access.",
    deliverables: [
      "Developer tool adoption by 1,200+ active participants",
      "Dedicated workshop / API demo during pre-hack week",
      "Special bounty for best use of your SDK or platform",
      "Logo on digital badges, portal, and hacker swag packs"
    ],
    status: "OPEN FOR INVITATION",
    statusColor: "text-[#4B5D86]"
  },
  {
    tier: "Tier 04: Recruitment & Community",
    badge: "TALENT & COMMUNITY",
    badgeColor: "bg-[#EADBCC] text-[#380412]",
    title: "Ecosystem & Talent Partners",
    description: "Direct outreach to top engineering undergraduates and postgraduates across nationwide collegiate institutes.",
    deliverables: [
      "Curated resume book of all shortlisted hackathon finalists",
      "Fast-track interview pipeline for internships & full-time roles",
      "Digital booth in the official Code Relay Discord server",
      "Acknowledgment in official press and society archives"
    ],
    status: "OPEN FOR INVITATION",
    statusColor: "text-[#620821]"
  }
];

export const HISTORICAL_ECOSYSTEM_SUPPORTERS: EcosystemSupporter[] = [
  {
    name: "Web & Design Society (WebnD)",
    role: "Organizing Body · IIT Bhubaneswar",
    notes: "The premier collegiate development and design society spearheading Code Relay since Edition 1.0."
  },
  {
    name: "IIT Bhubaneswar Technical Council",
    role: "Institutional Patronage",
    notes: "Providing campus infrastructure, high-speed networking, lab facilities, and institutional backing."
  },
  {
    name: "Unstop Hackathon Platform",
    role: "Admissions & Portal Partner",
    notes: "Host platform for verified national student registrations, submissions, and collegiate ranking."
  },
  {
    name: "National Developer Communities",
    role: "Outreach & Ecosystem Network",
    notes: "Partnered collegiate developer clubs and student chapters across 100+ Indian engineering universities."
  }
];

export const PARTNERSHIP_CATEGORIES: PartnershipCategoryOption[] = [
  { value: "title", label: "Title & Flagship Partnership" },
  { value: "track", label: "Web2 / Web3 Track Sponsor" },
  { value: "cloud", label: "Cloud / Compute / Tooling Grant" },
  { value: "recruitment", label: "Recruitment & Talent Access" },
  { value: "other", label: "General Community / Media Support" },
];

