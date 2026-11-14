export interface ScheduleEvent {
  time: string;
  title: string;
  desc: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  events: ScheduleEvent[];
}

export interface JudgingCriterion {
  weight: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ParticipationFormatItem {
  specNumber: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  status: string;
}

export interface PrizeCard {
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  amount: string;
  amountSubtitle: string;
  description: string;
  cardBg: string;
  footerNote: string;
}

export const IN_PAGE_NAV_PILLS = [
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "FAQs", href: "#faq" },
];

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    day: "Day 01: Kickoff & Track Briefing",
    date: "FRIDAY (PROVISIONAL)",
    events: [
      { time: "16:00 - 17:30", title: "Registration & Check-In", desc: "Participant badging, mentor room setup, and technical environment checks." },
      { time: "17:30 - 19:00", title: "Opening Ceremony & Keynote", desc: "Welcome address by WebnD IIT Bhubaneswar and industry track sponsors." },
      { time: "19:00 - 19:45", title: "Problem Statement Reveal", desc: "Unveiling challenge repositories, evaluation metrics, and test datasets." },
      { time: "20:00", title: "Hacking Marathon Begins (T=0)", desc: "Relay Sprint 1 officially kicks off. Teams commence ideation and architecture." },
    ],
  },
  {
    day: "Day 02: Relay Sprints & Mentor Review",
    date: "SATURDAY (PROVISIONAL)",
    events: [
      { time: "02:00 - 04:00", title: "Midnight Architecture Review", desc: "Technical checkpoint with mentors to debug blockers and review schemas." },
      { time: "09:00 - 12:00", title: "Relay Handoff & Sprint 2", desc: "Core implementation sprint: API integration, smart contract deployments." },
      { time: "15:00 - 18:00", title: "Mentorship Office Hours", desc: "1-on-1 feedback sessions with domain leads from Web2 and Web3 sponsor teams." },
      { time: "22:00", title: "Pre-Submission Health Check", desc: "Verify test runner compliance, deployment pipelines, and environment configs." },
    ],
  },
  {
    day: "Day 03: Code Freeze & Demo Day",
    date: "SUNDAY (PROVISIONAL)",
    events: [
      { time: "08:00", title: "CODE FREEZE (T=36 Hours)", desc: "Strict repository commit lock. Submissions closed on portal with video demos." },
      { time: "09:30 - 13:00", title: "Preliminary Jury Evaluations", desc: "Code review, test suite execution, and shortlisting of top finalist teams." },
      { time: "14:30 - 17:00", title: "Grand Finalist Pitches & Live Demos", desc: "Top 12 teams pitch live on stage and stream before our distinguished jury." },
      { time: "17:30 - 18:30", title: "Valedictory & Prize Distribution", desc: "Announcement of track winners, bounty distributions, and closing remarks." },
    ],
  },
];

export const JUDGING_CRITERIA: JudgingCriterion[] = [
  {
    weight: "30%",
    title: "Technical Depth & Complexity",
    desc: "Robustness of system architecture, concurrency handling, smart contract security, gas optimization, or distributed data flow.",
  },
  {
    weight: "25%",
    title: "Innovation & Problem Solving",
    desc: "Novelty of the solution, distinct architectural choices, and practical value applied to the problem statement.",
  },
  {
    weight: "25%",
    title: "Implementation & Working Demo",
    desc: "Completeness of the codebase, passing unit/integration tests, operational live deployment, and realistic reliability under load.",
  },
  {
    weight: "20%",
    title: "UI/UX & Presentation",
    desc: "Intuitive user interface, coherent interaction design, accessibility, and the team's ability to clearly articulate their solution.",
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "Who is eligible to participate in Code Relay 5.0?",
    a: "Any undergraduate or postgraduate student currently enrolled in a recognized university or institute in India is eligible. Teams may consist of 2 to 4 members. Inter-college and inter-branch teams are fully permitted.",
  },
  {
    q: "Is there any registration or entry fee?",
    a: "No! Code Relay is 100% free for all participants. The Web and Design Society (WebnD) and our partners provide full event access, mentorship, and platform resources at no cost.",
  },
  {
    q: "What is the hybrid format and venue location?",
    a: "Participants have the option to attend on-campus at the IIT Bhubaneswar permanent campus (Argul, Jatni) or compete virtually through our verified online relay rooms with live Discord/video support.",
  },
  {
    q: "Can I participate in both Web2 and Web3 tracks?",
    a: "Each team selects one primary track (either Web2 or Web3) when submitting their final project. However, solutions that bridge Web2 frontends with Web3 backend protocols are strongly encouraged and eligible for cross-category bounties.",
  },
  {
    q: "What are the rules regarding pre-existing code?",
    a: "All code submitted for judging must be written during the 36-hour hackathon duration. You may utilize public open-source libraries, packages, frameworks, and APIs, but the core project logic, contracts, and interfaces must be original work created during the event.",
  },
  {
    q: "When will the official problem statements be released?",
    a: "Official Code Relay 5.0 problem statements will be revealed during the Opening Ceremony on Day 1. In the meantime, you can explore the archive of past edition problem statements on our Past Problem Statements page.",
  },
];

export const PARTICIPATION_FORMATS: ParticipationFormatItem[] = [
  {
    specNumber: "Spec 01",
    tag: "TEAM DYNAMICS",
    tagColor: "bg-[#991B3D] text-white",
    title: "2–4 Hackers Per Team",
    description: "Compete in collaborative cells of 2 to 4 members. Inter-college, inter-branch, and inter-year teams are fully permitted and welcomed.",
    status: "Confirmed",
  },
  {
    specNumber: "Spec 02",
    tag: "STUDENT STATUS",
    tagColor: "bg-[#4B5D86] text-white",
    title: "All Indian Colleges",
    description: "Open to all active undergraduate (B.Tech, B.Sc, BCA, etc.) and postgraduate (M.Tech, MCA, etc.) students with a valid college ID card.",
    status: "Confirmed",
  },
  {
    specNumber: "Spec 03",
    tag: "36H MARATHON",
    tagColor: "bg-[#620821] text-white",
    title: "Continuous Relay Sprint",
    description: "36 uninterrupted hours of architecture, development, and debugging with milestone checkpoints and mentorship touchpoints.",
    status: "Confirmed",
  },
  {
    specNumber: "Spec 04",
    tag: "HYBRID VENUE",
    tagColor: "bg-[#EADBCC] text-[#380412]",
    title: "Campus & Virtual Rooms",
    description: "Hacking takes place on the scenic IIT Bhubaneswar campus with real-time synchronized virtual relay rooms for remote teams.",
    status: "Confirmed",
  },
];

export const PRIZES: PrizeCard[] = [
  {
    badge: "WEB2 TRACK WINNER",
    badgeBg: "bg-[#991B3D]",
    badgeTextColor: "text-white",
    amount: "₹75,000",
    amountSubtitle: "+ CLOUD & API CREDITS",
    description: "Awarded to the most innovative, scalable, and production-ready distributed system or intelligent web application in the Web2 track.",
    cardBg: "bg-[#380412]",
    footerNote: "INCLUDES IIT BBS MEMENTO & CERTIFICATE",
  },
  {
    badge: "WEB3 TRACK WINNER",
    badgeBg: "bg-[#4B5D86]",
    badgeTextColor: "text-white",
    amount: "₹75,000",
    amountSubtitle: "+ PROTOCOL GRANTS & AUDITS",
    description: "Awarded to the top decentralized protocol, zero-knowledge application, or smart account infrastructure project in the Web3 track.",
    cardBg: "bg-[#2A344A]",
    footerNote: "INCLUDES IIT BBS MEMENTO & CERTIFICATE",
  },
  {
    badge: "BOUNTIES & RUNNERS-UP",
    badgeBg: "bg-[#F6F0E8]",
    badgeTextColor: "text-[#620821]",
    amount: "₹1,00,000+",
    amountSubtitle: "ACROSS VERTICAL POOLS",
    description: "Track 1 & 2 Runner-Ups (₹35,000 each) plus dedicated bounties for Best UI/UX Design, Best Beginner Team, and Partner Tool Integrations.",
    cardBg: "bg-[#22020A]",
    footerNote: "ALL FINALISTS RECEIVE SWAG KITS",
  },
];

