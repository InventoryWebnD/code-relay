/**
 * CODE RELAY 5.0 — content sourced from the official brochures
 * (Sponsorship Brochure + Food & Beverage Partnership Brochure).
 *
 * Anything marked `PLACEHOLDER` is temporary content waiting on real
 * assets (gallery photos, student reviews, etc). Swap freely.
 */

export const EVENT = {
  name: "Code Relay",
  edition: "5.0",
  editionWord: "5th Edition",
  hashtag: "#SprintToInnovation",
  org: "Web & Design Society",
  orgShort: "WebnD",
  institute: "IIT Bhubaneswar",
  hackHours: 30,
  teamSize: "2–4",
  shortlist: "100–150",
  contact: {
    name: "Shruti Gupta",
    phone: "+91 98644 84341",
    phoneHref: "tel:+919864484341",
    email: "secyweb.sg@iitbbs.ac.in",
    instagram: "@coderelay_iitbbs",
    instagramUrl: "https://www.instagram.com/coderelay_iitbbs/",
    linkedin: "WebnD IIT Bhubaneswar",
    linkedinUrl: "https://www.linkedin.com/company/webd-iitbbs/",
    webndInstagram: "https://www.instagram.com/webnd.iitbbs/",
  },
  brochures: {
    sponsorship: "/brochures/code-relay-5-sponsorship.pdf",
    food: "/brochures/code-relay-5-food-and-beverage.pdf",
  },
} as const;

export const ABOUT_WEBND =
  "The Web and Design Society is the student society at IIT Bhubaneswar that builds and maintains the institute's websites. We turn members into creative professionals, and we run workshops, events and competitions where students learn, share their work and build together.";

export const ABOUT_CR =
  "Code Relay is WebnD's flagship annual hackathon, open to students from colleges across India. Budding builders converge to show what they can ship, learn from industry experts and meet people who build like them. Edition five is the biggest relay yet.";

export interface Round {
  id: string;
  label: string;
  mode: "ONLINE" | "OFFLINE";
  when: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}

export const ROUNDS: Round[] = [
  {
    id: "r1",
    label: "Round 01",
    mode: "ONLINE",
    when: "2nd week · Nov 2026",
    title: "Idea Round",
    body: "Submit your idea online. Open to students from any college in India, in teams of 2 to 4.",
    stat: "ALL",
    statLabel: "of India can enter",
  },
  {
    id: "shortlist",
    label: "Baton Pass",
    mode: "ONLINE",
    when: "After Round 01",
    title: "The Shortlist",
    body: "The strongest ideas get the baton. 100 to 150 teams are invited to the finale on campus.",
    stat: "100–150",
    statLabel: "teams shortlisted",
  },
  {
    id: "r2",
    label: "Round 02",
    mode: "OFFLINE",
    when: "3rd week · Jan 2027",
    title: "The Final Sprint",
    body: "Shortlisted teams build a working prototype in a 30-hour hackathon at IIT Bhubaneswar.",
    stat: "30 HRS",
    statLabel: "non-stop on campus",
  },
];

export interface SubTrack {
  title: string;
  body: string;
}

export interface Track {
  id: "web2" | "web3";
  name: string;
  tagline: string;
  color: string;
  ink: string;
  items: SubTrack[];
}

export const TRACKS: Track[] = [
  {
    id: "web2",
    name: "WEB2",
    tagline: "AI that actually ships",
    color: "#991B3D",
    ink: "#F6F0E8",
    items: [
      { title: "Agentic AI & Automation", body: "AI agents that complete real, multi-step tasks." },
      { title: "GenAI for Bharat", body: "RAG, voice and Indian-language AI products." },
      { title: "AI Chatbots", body: "Assistants that answer accurately from real documents and data." },
    ],
  },
  {
    id: "web3",
    name: "WEB3",
    tagline: "Money, agents & assets onchain",
    color: "#0B1B4D",
    ink: "#F6F0E8",
    items: [
      { title: "Onchain Payments", body: "Stablecoin checkouts, transfers and simple wallets." },
      { title: "AI × Web3", body: "AI agents that hold wallets and pay for services." },
      { title: "Real-World Assets", body: "Land records, carbon credits, invoices and other real assets brought onchain to be verified, tracked and used." },
    ],
  },
];

export const EXTRA_TRACKS = [
  { title: "Open Innovation", body: "Build anything. If it's bold and it works, it belongs here." },
  { title: "Partner Bounties", body: "Sponsors run their own bounties, open to teams from every track." },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const CR4_HIGHLIGHTS: Stat[] = [
  { value: 2000, suffix: "+", label: "Student registrations" },
  { value: 1000, suffix: "+", label: "Team registrations" },
  { value: 400, suffix: "+", label: "Project submissions" },
  { value: 90, suffix: "K+", label: "Impressions on Unstop" },
];

export const CR3_HIGHLIGHTS: Stat[] = [
  { value: 3000, suffix: "+", label: "Student registrations" },
  { value: 1500, suffix: "+", label: "Team registrations" },
  { value: 600, suffix: "+", label: "Project submissions" },
];

export const WHY_SPONSOR = [
  { title: "Showcase Innovation", body: "Show your commitment to cutting-edge technology and talent development by backing a premier hackathon." },
  { title: "Gain Visibility", body: "Prominent placement across the website, social media and event materials, in front of the brightest young builders." },
  { title: "Access to Talent", body: "Watch participants build in real time and spot the people you want on your team." },
  { title: "Industry Interaction", body: "Meet industry experts, other sponsors and stakeholders, and start collaborations that move your business." },
  { title: "Brand Loyalty", body: "Good experiences with a young, tech-savvy crowd turn into long-term advocates for your brand." },
  { title: "CSR Alignment", body: "Support education and development initiatives that align with your CSR goals." },
  { title: "Product Promotion", body: "Put your product in builders' hands, gather real feedback and generate genuine interest." },
  { title: "Marketing Reach", body: "Social campaigns, email marketing and press, before, during and after the event." },
  { title: "Exclusive Benefits", body: "Keynotes, workshops and special mentions tailored to your sponsorship level." },
  { title: "Long-Term Engagement", body: "Build lasting relationships with the next generation of tech leaders." },
];

export interface Tier {
  id: string;
  name: string;
  price: string;
  color: string;
  ink: string;
  perks: string[];
}

export const SPONSOR_TIERS: Tier[] = [
  {
    id: "title",
    name: "Title",
    price: "₹1.5 Lakh+",
    color: "#991B3D",
    ink: "#F6F0E8",
    perks: [
      "Exclusive naming rights for the event",
      "Logo on all event materials and promotions",
      "Special mention in press releases",
      "Keynote speech at the opening ceremony",
      "Opportunity to conduct a workshop",
      "Access to the codebase of students",
      "Access to the codebase of submissions",
      "Modifications to the problem statement",
      "Customised benefits as per mutual agreement",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "₹1 Lakh+",
    color: "#0B1B4D",
    ink: "#F6F0E8",
    perks: [
      "Logo on website and social media",
      "Special mention in press releases",
      "Opportunity to conduct a workshop",
      "Access to the codebase of students",
      "Modification to the problem statement",
      "Customised benefits as per mutual agreement",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹80K+",
    color: "#F5B000",
    ink: "#15060B",
    perks: [
      "Logo on website and social media",
      "Opportunity to conduct a workshop",
      "Customised benefits as per mutual agreement",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "₹50K+",
    color: "#D9D4CC",
    ink: "#15060B",
    perks: ["Logo on website and social media", "Mention in event communications"],
  },
  {
    id: "bronze",
    name: "Bronze",
    price: "₹30K+",
    color: "#C77B4A",
    ink: "#15060B",
    perks: ["Logo on website and social media"],
  },
];

export const PARTNER_OPTIONS: Tier[] = [
  {
    id: "track",
    name: "Track Partner",
    price: "₹75K+",
    color: "#5AA7A7",
    ink: "#15060B",
    perks: [
      "Naming rights for one track",
      "Your own problem statement for the track",
      "Track prize presented in your name",
      "Workshop in Round 1",
      "Judging seat for your track in Round 2",
      "Logo on website, track page and stage",
      "Instagram collab post and LinkedIn mentions",
      "Customised benefits as per mutual agreement",
    ],
  },
  {
    id: "talent",
    name: "Talent Partner",
    price: "₹50K+",
    color: "#F6F0E8",
    ink: "#15060B",
    perks: [
      "Recruiter session with finalists in Round 2",
      "Opt-in resumes of all finalists",
      "On-campus interviews at IIT Bhubaneswar",
      "Logo on website and stage",
      "LinkedIn post announcing the partnership",
      "Customised benefits as per mutual agreement",
    ],
  },
];

export const FOOD_PITCH = "At a hackathon, your product stays in the participant's hand for the whole event.";

export const FOOD_STATS = [
  { value: "30 HRS", label: "of non-stop building" },
  { value: "100–150", label: "teams on campus" },
];

export const FOOD_NEEDS = ["Meals", "Snacks", "Caffeine & Energy Drinks", "Water & Refreshments"];

export const FOOD_PARTNERS = [
  { name: "Food Partner", emoji: "🍛", body: "Presents every meal across the 30 hours." },
  { name: "Beverage Partner", emoji: "🥤", body: "Presents the drinks served through the event: coffee, energy drinks or juices." },
  { name: "Snack Partner", emoji: "🍿", body: "Presents the snacks and refreshments through the day and night." },
  { name: "Midnight Café Partner", emoji: "☕", body: "Presents the overnight counter during the late-night build hours, and everything served there." },
];

export const FOOD_MODELS = [
  { title: "One or more", body: "Sponsor one option, combine several, or ask us for a custom package." },
  { title: "Cash or kind", body: "Contribute in cash, in kind, or a mix of both." },
  { title: "Agreed with you", body: "The contribution is agreed with each partner directly." },
];

/* ------------------------------------------------------------------ */
/* PLACEHOLDER content — replace with real assets when available        */
/* ------------------------------------------------------------------ */

export interface GalleryItem {
  src?: string;
  /** intrinsic size, so the photo wall reserves space before the image arrives */
  w?: number;
  h?: number;
  caption: string;
  tone: string;
}

/** PLACEHOLDER: tiles without `src` render as illustrated placeholder cards. */
export const GALLERY: GalleryItem[] = [
  { src: "/img/web2_win.jpg", w: 1080, h: 1080, caption: "CR 3.0 · Web2 champions", tone: "#991B3D" },
  { src: "/img/3.o_participants1.jpg", w: 1159, h: 869, caption: "CR 3.0 · Heads down, building", tone: "#0B1B4D" },
  { src: "/img/3.o_oc1.jpg", w: 1545, h: 869, caption: "CR 3.0 · The organising team", tone: "#5AA7A7" },
  { src: "/img/web3_win.jpg", w: 1080, h: 1080, caption: "CR 3.0 · Web3 champions", tone: "#5AA7A7" },
  { src: "/img/3.o_participants2.jpg", w: 1159, h: 869, caption: "CR 3.0 · Kick-off", tone: "#F5B000" },
  { src: "/img/cr3_banner.jpg", w: 1085, h: 1449, caption: "CR 3.0 · The banner goes up", tone: "#620821" },
  { src: "/img/web2_ru.jpg", w: 1080, h: 1080, caption: "CR 3.0 · Web2 runners-up", tone: "#620821" },
  { src: "/img/3.o_participants3.jpg", w: 1159, h: 869, caption: "CR 3.0 · Mid-sprint", tone: "#991B3D" },
  { src: "/img/3.o_oc2.jpg", w: 1152, h: 864, caption: "CR 3.0 · Debugging together", tone: "#0B1B4D" },
  { src: "/img/web3_ru.jpg", w: 1080, h: 1080, caption: "CR 3.0 · Web3 runners-up", tone: "#0B1B4D" },
  { src: "/img/3.o_participants4.jpg", w: 1544, h: 869, caption: "CR 3.0 · Presenting the build", tone: "#5AA7A7" },
  { src: "/img/cr_brand1.jpg", w: 1159, h: 869, caption: "Code Relay · Lights on", tone: "#15060B" },
  { src: "/img/3.o_oc3.jpg", w: 1159, h: 869, caption: "CR 3.0 · The crew, fuelled up", tone: "#F5B000" },
  { src: "/img/3.o_participants5.jpg", w: 1544, h: 869, caption: "CR 3.0 · Pitching to the judges", tone: "#991B3D" },
  { src: "/img/3.o_oc4.jpg", w: 1000, h: 666, caption: "CR 3.0 · The crew, all smiles", tone: "#620821" },
];

export interface Review {
  quote: string;
  name: string;
  meta: string;
  color: string;
}

/** Anonymous for now: CR 5.0 will collect feedback with names and colleges. */
export const REVIEWS: Review[] = [
  { quote: "Thirty hours, zero sleep, one working demo. Best weekend of my degree.", name: "Participant", meta: "Code Relay 4.0", color: "#F5B000" },
  { quote: "The mentors actually sat with us at 2 AM and helped debug our contract.", name: "Participant", meta: "Code Relay 4.0", color: "#5AA7A7" },
  { quote: "We came for the prize and left with a team we still build with.", name: "Participant", meta: "Code Relay 3.0", color: "#F2B8C6" },
  { quote: "The problem statements were real. It felt like shipping at a startup.", name: "Participant", meta: "Code Relay 4.0", color: "#F3D9A4" },
  { quote: "IIT Bhubaneswar campus at night with 100 teams hacking is a vibe.", name: "Participant", meta: "Code Relay 3.0", color: "#C7D2F2" },
];

/* ------------------------------------------------------------------ */
/* CR 5.0 partners (logos live in /public/sponsors)                     */
/* ------------------------------------------------------------------ */
export interface Partner {
  name: string;
  role: string;
  logo: string;
  website: string;
  /** tile colour behind the logo (matches logos that ship with a background) */
  bg?: string;
  /** logo box height in px: small source files stay crisp by staying small */
  h?: number;
}

export const PARTNERS_CR5: Partner[] = [
  { name: "Hostinger", role: "Hosting partner", logo: "/sponsors/hostinger.svg", website: "https://www.hostinger.in", h: 40 },
  { name: "Red Bull", role: "Beverage partner", logo: "/sponsors/redbull.svg", website: "https://www.redbull.com/in-en", h: 72 },
  { name: "Myntra", role: "In-kind partner", logo: "/sponsors/myntra.png", website: "https://www.myntra.com", h: 64 },
  { name: "Trends", role: "In-kind partner", logo: "/sponsors/trends.png", website: "https://www.ajio.com/shop/trends", bg: "#4d5055", h: 34 },
];
