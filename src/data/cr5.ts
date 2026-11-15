/**
 * CODE RELAY 5.0 — content sourced from the official brochures
 * (Sponsorship Brochure + Food & Beverage Partnership Brochure).
 *
 * Anything marked `PLACEHOLDER` is temporary content waiting on real
 * assets (gallery photos, student reviews, etc). Swap freely.
 */

/** Registration lives on Unstop. Set NEXT_PUBLIC_REGISTER_URL to the Unstop page when it goes live. */
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL ?? "";

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
    /** participants' Discord: announcements and updates for CR 5.0 */
    discordUrl: "https://discord.gg/y54wHSpVC",
  },
  brochures: {
    sponsorship: "/brochures/code-relay-5-sponsorship.pdf",
    food: "/brochures/code-relay-5-food-and-beverage.pdf",
  },
} as const;

export const ABOUT_WEBND =
  "The Web and Design Society (WebnD) is a tech society under the Student Technical Council (STC), IIT Bhubaneswar. Our members design and code, from interfaces and brand work to full-stack builds, and we run workshops, events and competitions where students learn, share their work and build together.";

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

export interface TrackGuide {
  overview: string;
  build: string;
  /** what every submission must cover (pillars / agent design patterns) */
  requirementsLabel: string;
  requirementsRule: string;
  requirements: { name: string; expect: string; compulsory?: boolean }[];
  declare: string;
  judging: { label: string; points: number }[];
  bonus: string;
  tieBreaker: string;
  submission: { tier: string; body: string }[];
  notAccepted: string;
}

/**
 * CR 5.0 structure: two domains (Web2, Web3; registrations are stored against
 * WEB2 / WEB3), each holding two tracks, each track with sub-tracks / ideas.
 */
export type Domain = "Web2" | "Web3";

export interface Track {
  id: string;
  domain: Domain;
  /** position inside its domain: Track 01 / Track 02 */
  order: number;
  name: string;
  /** who brings the track (omitted when open) */
  partner?: string;
  tagline: string;
  /** full problem statement, where the track has one */
  problem?: string;
  /** label for the items list: sub-tracks (Web2) or starting ideas (Web3) */
  itemsLabel: string;
  color: string;
  ink: string;
  items: SubTrack[];
  /** Round 1 guidelines; Web3 tracks share WEB3_GUIDE */
  guide?: TrackGuide;
}

const FREE_TO_ENTER = "Round 1 is free to enter and needs no paid tools or API keys: use any provider with a free tier, an open-source model or a local model. Only teams selected for Round 2 pay a registration fee; on-campus accommodation is optional.";

export const TRACKS: Track[] = [
  {
    id: "ai-automation",
    domain: "Web2",
    order: 1,
    itemsLabel: "Sub-tracks",
    name: "AI & Automation",
    partner: "TrueFoundry",
    tagline: "Agents that take over real work, and still ask before anything they can't undo.",
    color: "#991B3D",
    ink: "#F6F0E8",
    items: [
      {
        title: "Autonomous Business Operations",
        body: "Build agents on TrueForge that run a real business workflow end to end, such as a support resolution agent that reads order and billing data, issues refunds and escalates when it should, or a multi-agent workflow where separate agents handle procurement, dispatch and payment follow-up. Anything irreversible must pass through Tool Approval.",
      },
      {
        title: "Engineering & Incident Response",
        body: "Build agents that keep systems running. Examples are an incident response agent that reads alerts, logs and metrics, finds the likely cause of an outage and suggests a fix for a human to approve, or a DevOps agent that triages failing builds overnight and drafts fixes. Handling large logs without overflowing context is central, so Context Engineering and Sub-Agents matter here.",
      },
      {
        title: "Data & Decision Automation",
        body: "Build agents that turn raw data into decisions. Try a data analyst agent that answers business questions in plain language by querying databases and producing charts, or an inventory and logistics agent that predicts stock-outs, optimizes routes and drafts orders for approval. Memory should show how the agent improves from one run to the next.",
      },
      {
        title: "Internal Operations & Workforce Automation",
        body: "Build agents that remove routine work inside organizations. Examples include an internal helpdesk agent handling IT and HR requests with the right permissions per user, or a finance back-office agent that checks invoices, flags mismatches and sends reminders. Keep permissions tight, keep every action logged and make the agent say clearly what it could not do.",
      },
    ],
    guide: {
      overview:
        "Every organization has work that nobody wants to do by hand: triaging alerts, reconciling spreadsheets, answering routine requests, chasing approvals. This track asks you to build an AI agent that takes over real work, runs through a multi-step job on its own and still asks a human before it does anything it cannot undo.",
      build:
        "Design or build an AI agent that completes a real job of at least 5 steps across at least 2 tools or data sources. It must plan, act, recover from at least one failure, pause for human approval before any irreversible action and end with a clear report a human can act on in under 2 minutes. The track is built around TrueForge, TrueFoundry's open-source (MIT-licensed) agent harness. You are not required to use it: teams may build on TrueForge or any other framework, and no marks are lost either way.",
      requirementsLabel: "Agent design patterns",
      requirementsRule:
        "Use at least 4 of the 6 patterns; Human Approval is compulsory. For each one, state where in your workflow it is used and why the agent fails without it. A name-drop scores zero. Every pattern can be built with free tools.",
      requirements: [
        { name: "Human Approval", expect: "A list of the irreversible actions and the exact point where the agent pauses for a human.", compulsory: true },
        { name: "Sub-Agents", expect: "How the job is split, with each sub-agent's role and what it hands back." },
        { name: "Memory", expect: "What the agent remembers between runs and how that changes the next run." },
        { name: "Context Management", expect: "How large outputs such as logs and tables are summarized or trimmed without overflowing the model's context." },
        { name: "Tool Use through MCP or APIs", expect: "Which tools the agent calls, why each is needed and what happens when a tool fails." },
        { name: "Long-run Execution", expect: "How a multi-step job is triggered and tracked, and how the agent resumes after an error." },
      ],
      declare: "Also declare the model(s) and why (cost, speed, privacy), the tools used, and the interface (chat UI, SDK, API or dashboard).",
      judging: [
        { label: "Agent design depth", points: 30 },
        { label: "Problem and agent fit", points: 20 },
        { label: "Safety and failure design", points: 20 },
        { label: "Architecture and feasibility", points: 15 },
        { label: "Report and user experience", points: 10 },
        { label: "Clarity of submission", points: 5 },
      ],
      bonus: "Prototype bonus of up to 10",
      tieBreaker: "Tie-breaker: the higher safety and failure design score.",
      submission: [
        { tier: "Blueprint", body: "Pitch deck (PDF, max 10 slides) including a Failure Drill slide, and a one-page Agent Card." },
        { tier: "Prototype", body: "The same, plus a demo video of up to 3 minutes showing one live human approval and the final report, and a public GitHub repo with a README." },
      ],
      notAccepted:
        "Generic Q&A chatbots, “chat with your PDF”, plain RAG over notes, resume screeners and study buddies, unless they clearly meet every requirement. A plain chatbot wrapper with an agent name on it will be marked down. Never commit API keys; use synthetic or anonymized data only.",
    },
  },
  {
    id: "ai-bharat",
    domain: "Web2",
    order: 2,
    itemsLabel: "Sub-tracks",
    name: "AI for Bharat",
    partner: "CSM Technologies × TrueFoundry",
    tagline: "AI that fixes a real problem for the last user in the line, in India's languages, networks and scale.",
    color: "#C2264F",
    ink: "#F6F0E8",
    items: [
      {
        title: "Governance & Public Services",
        body: "Build AI that makes digital governance work for every citizen. Examples include an agent that takes grievances in Indian languages, routes them across departments and shows live status until closure, or a scholarship and certificate assistant that verifies documents from other systems instead of asking for uploads. Protect citizen data by design, work on a basic phone, leave an audit trail officers and citizens can follow, and use human approval before any action that cannot be undone.",
      },
      {
        title: "Healthcare, Education & Rural Livelihoods",
        body: "Use AI to close access gaps in health, learning, agriculture and climate resilience. Try a health worker assistant that guides referrals and flags drug shortages, a voice-first tutor for low-connectivity regions, or a farmer alert and registry desk that sends pest and weather warnings by SMS or voice. Prioritize local languages and simple interfaces, and hand over to a human professional whenever the AI is unsure.",
      },
      {
        title: "FinTech & Financial Inclusion",
        body: "Build secure financial services for people the system still misses. Ideas include a first-time credit guide, a fraud triage agent that groups likely scams and asks a human to approve any freeze or customer message, a micro-insurance claims desk, or a UPI scam-warning companion in the user's language. Explain every decision plainly, and keep a human in control of anything that moves money.",
      },
      {
        title: "Mobility, Trade & Infrastructure",
        body: "Build agents and tools that keep India moving and its businesses running. Examples are an incident response agent that reads traffic and sensor feeds and suggests diversions for approval, an EV charging and bus-reliability planner, a small-seller order and inventory desk, or a multi-agent trade workflow covering procurement, dispatch and payment follow-up. Handle large data feeds cleanly, show real-time tracking and give users dashboards they can act on quickly.",
      },
    ],
    guide: {
      overview:
        "India has hundreds of millions of people who still lose time, money or access because a service is slow, confusing or not built for them. This track asks you to use AI to fix a real problem for a citizen, a farmer, a patient, a student or a small business, in a way that works for India's languages, networks and scale.",
      build:
        "Pick one real problem and design, or build, an AI-powered solution for it. It must serve the last user in the line: someone on a basic phone, a weak network or a different language, or someone who needs an assisted mode. It can be an agent, an app, a voice or SMS service or a dashboard. Any tech stack is allowed. Teams who like agents can use TrueForge, TrueFoundry's open-source agent harness, but it is optional in this track.",
      requirementsLabel: "Pillars",
      requirementsRule:
        "Address at least 4 of the 6 pillars; Privacy & Consent is compulsory. For each pillar, state where in the user journey it applies and why the solution fails without it. A name-drop scores zero.",
      requirements: [
        { name: "Privacy & Consent", expect: "The data collected and why, how consent is taken and withdrawn, who can see what.", compulsory: true },
        { name: "Inclusive Access", expect: "How people with low literacy, another language or a disability complete the journey, including an assisted mode." },
        { name: "Low-bandwidth & Offline", expect: "What works on a basic phone and a weak network, and how it syncs without losing a request." },
        { name: "Interoperability", expect: "Which other systems are connected through APIs instead of asking the user for papers." },
        { name: "Auditability & Human Oversight", expect: "A record of decisions, a status view for the user and human approval before any irreversible action." },
        { name: "Scale & Operations", expect: "Peak-day load, running cost and a first-district or first-city rollout plan." },
      ],
      declare: "Also declare the problem and users, the models and tech stack with reasons, the data source (synthetic, anonymized or open only) and the interface.",
      judging: [
        { label: "Pillar depth", points: 25 },
        { label: "Problem and user fit", points: 20 },
        { label: "Exception and failure design", points: 20 },
        { label: "Architecture and feasibility", points: 15 },
        { label: "User experience", points: 15 },
        { label: "Clarity of submission", points: 5 },
      ],
      bonus: "Prototype bonus of up to 10",
      tieBreaker: "Tie-breaker: the higher exception and failure design score.",
      submission: [
        { tier: "Blueprint", body: "Pitch deck (PDF, max 10 slides) and a one-page card." },
        { tier: "Prototype", body: "The same, plus a demo video of up to 3 minutes showing one complete user journey and one failure path, and a public GitHub repo with a README." },
      ],
      notAccepted:
        "Generic Q&A chatbots, “chat with your PDF”, plain RAG over notes, resume screeners and study buddies, and apps that only put an existing form online, unless they clearly redesign the process and meet the pillars. Never commit API keys; use synthetic, anonymized or open data only.",
    },
  },
  {
    id: "onchain-payments",
    domain: "Web3",
    order: 1,
    itemsLabel: "Ideas to get you started",
    name: "Onchain Payments",
    tagline: "Onchain payments simple enough for a first-time user.",
    problem:
      "Billions of people use digital payments every day, but onchain payments are still hard for most of them. Wallets are confusing, fees and network choices are unclear, and a single wrong step can lose funds. Design an onchain payment solution simple enough for a first-time user, which solves a real payment problem better than existing options.",
    color: "#0B1B4D",
    ink: "#F6F0E8",
    items: [
      { title: "Stablecoin checkout", body: "A plug-in for small online stores to accept stablecoin payments as easily as UPI." },
      { title: "Cross-border transfers", body: "Low-cost, fast payments for students, freelancers or families sending money abroad." },
      { title: "Walletless onboarding", body: "Payments where users sign in with an email or phone number and never see a seed phrase." },
      { title: "Split and recurring payments", body: "Subscriptions, rent splitting or payroll handled onchain." },
      { title: "Merchant settlement", body: "Instant onchain settlement and records for small businesses." },
    ],
  },
  {
    id: "ai-web3",
    domain: "Web3",
    order: 2,
    itemsLabel: "Ideas to get you started",
    name: "AI × Web3",
    tagline: "AI and blockchain doing together what neither could do alone.",
    problem:
      "AI agents are starting to act on their own, but they can't easily hold money, pay for what they use or prove what they did. Blockchains can give them wallets, payments and a verifiable record. Design a solution where AI and blockchain work together to do something neither could do alone.",
    color: "#24398A",
    ink: "#F6F0E8",
    items: [
      { title: "Agents with wallets", body: "AI agents that pay for APIs, data or compute on their own, within spending limits." },
      { title: "Verifiable AI", body: "Recording an AI's decisions or outputs onchain so anyone can check them." },
      { title: "Data marketplaces", body: "People sharing or selling data for AI training, and getting paid fairly onchain." },
      { title: "Onchain assistants", body: "AI that explains, simulates and safely carries out transactions for users new to Web3." },
      { title: "Fraud and risk detection", body: "AI that flags scams, risky contracts or suspicious wallets before users interact." },
    ],
  },
];

export const TRACK_FREE_NOTE = FREE_TO_ENTER;

export const DOMAINS: { id: Domain; color: string; blurb: string }[] = [
  { id: "Web2", color: "#991B3D", blurb: "AI that takes over real work, and AI that works for every Indian." },
  { id: "Web3", color: "#0B1B4D", blurb: "Onchain money for first-time users, and AI that can pay and prove what it did." },
];
export const tracksIn = (d: Domain) => TRACKS.filter((t) => t.domain === d);

/** Round 1 rules shared by both Web3 tracks (open to any blockchain for now) */
export const WEB3_GUIDE = {
  submission: "Submit one PPT using the provided template, covering:",
  checklist: [
    "The problem and who faces it",
    "Your solution and how it works",
    "Why it needs blockchain (and AI, for AI × Web3)",
    "Architecture: the chain, smart contracts and key tools you plan to use",
    "How you'll build it in 30 hours at Round 2",
  ],
  bonus: "A working prototype attached with your PPT earns bonus points.",
  judging: [
    { label: "Real problem", body: "A clear user and a problem worth solving." },
    { label: "Essential use of Web3", body: "Blockchain is central to the solution, not added on top." },
    { label: "Usability", body: "Simple enough for someone new to Web3." },
    { label: "Feasibility", body: "A realistic plan to build a working version in 30 hours." },
  ],
  chains: "Both tracks are open to any blockchain.",
};

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
  /** one line about what the partner does this edition */
  note?: string;
}

/** CR 5.0 title sponsor, and its open-source agent harness. */
export const TITLE_SPONSOR = {
  name: "TrueFoundry",
  role: "Title sponsor",
  logo: "/sponsors/truefoundrylogo1.png",
  website: "https://www.truefoundry.com",
  /** the logo file ships on this navy */
  bg: "#030c28",
  harness: {
    name: "TrueForge",
    logo: "/sponsors/trueforge-white.svg",
    mark: "/sponsors/logomark-light%20bg.svg",
    website: "https://www.truefoundry.com/blog/engineering/trueforge-open-source-agent-harness/",
    bg: "#05090E",
    facts: ["Open source · MIT", "Agent harness", "Web2 · AI & Automation"],
  },
};

/** CR 5.0 partners below the title sponsor. */
export const PARTNERS_CR5: Partner[] = [
  {
    name: "CSM Technologies",
    role: "Technology partner",
    note: "Co-presents Web2 Track 02, AI for Bharat, with TrueFoundry.",
    logo: "/sponsors/csmlogo.png",
    website: "https://www.csm.tech",
    bg: "#231f20",
    h: 52,
  },
];

/** Brands that backed earlier editions (cards and the marquee both read this). */
export const PAST_PARTNERS: (Partner & { edition?: string })[] = [
  { name: "GoFr", role: "Framework partner", edition: "CR 4.0", logo: "/sponsors/gofr.png", website: "https://gofr.dev", h: 64 },
  { name: "InterviewBuddy", role: "Career partner", edition: "CR 4.0", logo: "/sponsors/interviewbuddy.png", website: "https://interviewbuddy.net", h: 64 },
  { name: "Hostinger", role: "Hosting partner", edition: "CR 3.0", logo: "/sponsors/hostinger.svg", website: "https://www.hostinger.in", h: 30 },
  { name: "Red Bull", role: "Energy partner", edition: "CR 3.0", logo: "/sponsors/redbull.svg", website: "https://www.redbull.com/in-en", h: 56 },
  { name: "Unstop", role: "Platform partner", edition: "CR 3.0", logo: "/sponsors/unstop.svg", website: "https://unstop.com", h: 34 },
  { name: "Myntra", role: "In-kind partner", logo: "/sponsors/myntra.png", website: "https://www.myntra.com", h: 48 },
  { name: "Trends", role: "In-kind partner", logo: "/sponsors/trends.png", website: "https://www.ajio.com/shop/trends", bg: "#4d5055", h: 24 },
];

/* ------------------------------------------------------------------ */
/* CR 5.0 organising committee                                          */
/* ------------------------------------------------------------------ */
export const OC_CR5: { role: string; people: string[] }[] = [
  { role: "Developers", people: ["Shruti", "Shriya", "Rajesh"] },
  { role: "Convenors", people: ["Kshitij", "Aarush"] },
  { role: "Media heads", people: ["Nikhil", "Lakshya"] },
];
