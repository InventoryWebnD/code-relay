export interface PastSponsorItem {
  name: string;
  category: string;
  description: string;
  badge: string;
  website: string;
  tagline?: string;
  logoUrl: string;
}

export interface PastEditionSponsors {
  edition: string;
  shortCode: string;
  year: string;
  accentColor: string;
  badgeBg: string;
  sponsors: PastSponsorItem[];
}

export interface PartnershipOption {
  id: string;
  number: string;
  title: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  deliverables: string[];
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

// ==========================================
// PAST SPONSORS (EDITIONS 4.0 & 3.0)
// WITH ACTUAL OFFICIAL LOGO WEB LINKS
// ==========================================
export const PAST_EDITIONS_SPONSORS: PastEditionSponsors[] = [
  {
    edition: "Code Relay 4.0",
    shortCode: "CR 4.0",
    year: "2024",
    accentColor: "#991B3D",
    badgeBg: "bg-[#991B3D] text-white",
    sponsors: [
      {
        name: "GoFr",
        category: "DEVELOPER FRAMEWORK PARTNER",
        description: "An opinionated Go microservices and HTTP/gRPC framework with built-in observability, structured logging, and cloud-native standards.",
        badge: "FRAMEWORK PARTNER",
        website: "https://gofr.dev",
        tagline: "Opinionated Go Microservices Framework",
        logoUrl: "https://avatars.githubusercontent.com/u/146108433?s=200&v=4"
      },
      {
        name: "InterviewBuddy",
        category: "TALENT & CAREER PARTNER",
        description: "Cloud-based virtual mock interview ecosystem connecting collegiate software engineers directly with seasoned industry hiring panels.",
        badge: "CAREER PARTNER",
        website: "https://interviewbuddy.net",
        tagline: "Virtual Mock Interview Platform",
        logoUrl: "https://interviewbuddy.net/favicon.png"
      }
    ]
  },
  {
    edition: "Code Relay 3.0",
    shortCode: "CR 3.0",
    year: "2023",
    accentColor: "#4B5D86",
    badgeBg: "bg-[#4B5D86] text-white",
    sponsors: [
      {
        name: "Hostinger",
        category: "CLOUD HOSTING & INFRASTRUCTURE",
        description: "Global cloud platform empowering student developers with scalable VPS infrastructure, high-performance web servers, and domain environments.",
        badge: "HOSTING PARTNER",
        website: "https://www.hostinger.com",
        tagline: "Cloud Web Hosting & VPS",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Hostinger_logo.svg"
      },
      {
        name: "Red Bull",
        category: "OFFICIAL ENERGY PARTNER",
        description: "Powering 36 hours of continuous marathon hacking, overnight sprints, and intense ideation with vitalizing energy support.",
        badge: "ENERGY PARTNER",
        website: "https://www.redbull.com",
        tagline: "Gives You Wings",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f5/RedBullEnergyDrink.svg"
      },
      {
        name: "Unstop",
        category: "PLATFORM & COMMUNITY PARTNER",
        description: "India's premier competitive programming and collegiate hackathon portal, facilitating verified registrations, submissions, and collegiate ranking.",
        badge: "PLATFORM PARTNER",
        website: "https://unstop.com",
        tagline: "Hackathon Platform & Community",
        logoUrl: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg"
      }
    ]
  }
];

// ==========================================
// PARTNERSHIP OPTIONS (WEBSITE THEME)
// ==========================================
export const PARTNERSHIP_OPTIONS: PartnershipOption[] = [
  {
    id: "title-partner",
    number: "01",
    title: "TITLE PARTNER",
    badge: "EXCLUSIVE (1 SLOT)",
    badgeColor: "bg-[#991B3D] text-white border-[#B82A4F]/60",
    accentColor: "#991B3D",
    deliverables: [
      "Code Relay 5.0, powered by [partner]",
      "Own track and problem statement",
      "Talk at the Round 2 opening",
      "Final round judge",
      "Resumes of finalists who opt in",
      "Instagram collab posts and LinkedIn posts",
      "Logo on website, posters, stage, certificates"
    ]
  },
  {
    id: "track-partner",
    number: "02",
    title: "TRACK PARTNER",
    badge: "DUAL VERTICAL",
    badgeColor: "bg-[#4B5D86]/30 text-[#8E9DBE] border-[#4B5D86]/50",
    accentColor: "#4B5D86",
    deliverables: [
      "[Track], powered by [partner]",
      "Problem statement for one track",
      "Workshop in Round 1",
      "Judge for own track",
      "Instagram collab post and LinkedIn posts",
      "Logo on website, track page, stage"
    ]
  },
  {
    id: "talent-partner",
    number: "03",
    title: "TALENT PARTNER",
    badge: "RECRUITMENT & HIRING",
    badgeColor: "bg-[#620821]/50 text-[#E8738D] border-[#B82A4F]/40",
    accentColor: "#991B3D",
    deliverables: [
      "Recruiter session in Round 2",
      "Resumes of finalists who opt in, plus on-campus interviews",
      "LinkedIn post",
      "Logo on website, stage"
    ]
  },
  {
    id: "bounty-partner",
    number: "04",
    title: "BOUNTY PARTNER",
    badge: "TOOLING & BOUNTY",
    badgeColor: "bg-[#4B5D86]/30 text-[#8E9DBE] border-[#4B5D86]/50",
    accentColor: "#4B5D86",
    deliverables: [
      "“Best use of [partner]” bounty",
      "Bounty brief",
      "Workshop in Round 1",
      "Judge for own bounty",
      "LinkedIn post",
      "Logo on website"
    ]
  }
];

// Backwards compatibility
export const TIER_OPPORTUNITIES = PARTNERSHIP_OPTIONS.map((opt) => ({
  tier: `Tier ${opt.number}: ${opt.title}`,
  badge: opt.badge,
  badgeColor: opt.badgeColor,
  title: opt.title,
  description: opt.deliverables.slice(0, 2).join(". ") + ".",
  deliverables: opt.deliverables,
  status: "OPEN FOR INVITATION",
  statusColor: "text-[#991B3D]"
}));

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
  { value: "title", label: "Title Partner" },
  { value: "track", label: "Track Partner" },
  { value: "talent", label: "Talent Partner" },
  { value: "bounty", label: "Bounty Partner" },
  { value: "other", label: "General Community / Media Support" }
];
