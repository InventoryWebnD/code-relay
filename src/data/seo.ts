import type { Metadata } from "next";
import { EVENT, PARTNERS_CR5, REGISTER_URL, TITLE_SPONSOR, TRACKS } from "@/data/cr5";
import { FAQS, PRIZES } from "@/data/eventData";

/** Public origin of the site. Set NEXT_PUBLIC_SITE_URL to the production domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://code-relay.vercel.app").replace(/\/$/, "");

export const SITE_NAME = `${EVENT.name} ${EVENT.edition}`;

/** the generated share card (app/opengraph-image.tsx) */
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Code Relay 5.0: national hackathon at IIT Bhubaneswar, Web2 × Web3" };

export const SITE_DESCRIPTION =
  "Code Relay 5.0 is a national student hackathon by WebnD, IIT Bhubaneswar. Build in Web2 (AI & Automation, AI for Bharat) or Web3 (Onchain Payments, AI × Web3), ₹2.5 lakh+ in prizes, a free online idea round and a 30-hour on-campus final. Register on Unstop.";

export const KEYWORDS = [
  "Code Relay",
  "Code Relay 5.0",
  "Code Relay IIT Bhubaneswar",
  "hackathon",
  "hackathon 2026",
  "hackathon India",
  "national hackathon",
  "student hackathon",
  "college hackathon India",
  "IIT hackathon",
  "IIT Bhubaneswar hackathon",
  "IIT BBS",
  "WebnD",
  "Web and Design Society",
  "AI hackathon",
  "AI agents hackathon",
  "Web3 hackathon",
  "blockchain hackathon",
  "Web2",
  "Web3",
  "AI & Automation",
  "AI for Bharat",
  "Onchain Payments",
  "AI x Web3",
  "TrueFoundry",
  "TrueForge",
  "CSM Technologies",
  "Unstop hackathon",
  "Odisha hackathon",
  "Bhubaneswar",
];

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter
 * fields. The share image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_IN", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (schema.org JSON-LD)                                 */
/* ------------------------------------------------------------------ */

const ORG_ID = `${SITE_URL}/#webnd`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Web and Design Society (WebnD), IIT Bhubaneswar",
  alternateName: ["WebnD", "WebnD IIT Bhubaneswar", "Web & Design Society IIT BBS"],
  url: SITE_URL,
  logo: `${SITE_URL}/brand/cr-logo-128.png`,
  email: EVENT.contact.email,
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Bhubaneswar", url: "https://www.iitbbs.ac.in" },
  sameAs: [EVENT.contact.instagramUrl, EVENT.contact.webndInstagram, EVENT.contact.linkedinUrl, EVENT.contact.discordUrl],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["Code Relay", "Code Relay hackathon", "CR 5.0"],
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

const VENUE = {
  "@type": "Place",
  name: "IIT Bhubaneswar",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Argul",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    postalCode: "752050",
    addressCountry: "IN",
  },
};

const total = PRIZES[PRIZES.length - 1]?.amount ?? "";

export const eventLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${SITE_NAME}: national student hackathon at IIT Bhubaneswar`,
  alternateName: ["Code Relay", "CR 5.0", "Code Relay hackathon"],
  description: `${SITE_DESCRIPTION} Total prize pool ${total}.`,
  url: SITE_URL,
  image: [`${SITE_URL}/opengraph-image`],
  // Round 01 opens in Nov 2026 (online); the 30-hour final runs in Jan 2027 on campus.
  startDate: "2026-11",
  endDate: "2027-01",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [{ "@type": "VirtualLocation", url: REGISTER_URL || SITE_URL }, VENUE],
  organizer: { "@id": ORG_ID, "@type": "Organization", name: "WebnD, IIT Bhubaneswar", url: SITE_URL },
  sponsor: [
    { "@type": "Organization", name: TITLE_SPONSOR.name, url: TITLE_SPONSOR.website },
    ...PARTNERS_CR5.map((p) => ({ "@type": "Organization", name: p.name, url: p.website })),
  ],
  audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "College students across India" },
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    name: "Round 01 registration",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: REGISTER_URL || SITE_URL,
  },
  keywords: KEYWORDS.join(", "),
  about: TRACKS.map((t) => ({ "@type": "Thing", name: `${t.domain} · ${t.name}` })),
};

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
    })),
  };
}
