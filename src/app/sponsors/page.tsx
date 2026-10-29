"use client";

import { useState } from "react";
import Link from "next/link";

export default function SponsorsPage() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryInterest, setInquiryInterest] = useState("track");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setFormSubmitted(true);
  };

  const tierOpportunities = [
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

  const historicalEcosystemSupporters = [
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

  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* 1. Header Section */}
      <section className="relative w-full pt-12 pb-16 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-start max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-4">
              <span className="text-xs font-mono font-bold text-[#620821] uppercase tracking-wider">
                Industry Alliances · Code Relay 5.0
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821] mb-6">
              SPONSORS &amp; PARTNERS
            </h1>

            <p className="text-lg text-[#3A1822] font-medium leading-relaxed mb-6">
              Partner with Code Relay 5.0 to engage with 2,500+ top engineering minds, discover outstanding technical talent, accelerate developer adoption of your APIs and protocols, and champion open-source innovation at IIT Bhubaneswar.
            </p>

            {/* Status Banner */}
            <div className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-4 sm:p-5 shadow-hard-sm w-full">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#160207] bg-[#991B3D] text-white font-mono font-black text-xs">
                  CR
                </span>
                <div>
                  <h2 className="font-heading text-sm sm:text-base font-bold text-[#620821]">
                    Partnership Prospectus &amp; Invitations Open
                  </h2>
                  <p className="text-xs sm:text-sm text-[#48232C] mt-1 leading-relaxed">
                    Sponsorship agreements and track partner confirmations for <strong className="text-[#620821]">Edition 5.0</strong> are actively underway. To preserve transparency and integrity, we display verified partner categories and engagement opportunities below. Organizations interested in sponsoring can connect with our team directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Sponsorship Tiers & Opportunities */}
      <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-start mb-12">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                Partnership Tiers
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
              CONFIRMED TIERS &amp; ENGAGEMENT MODELS
            </h2>
            <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
              Flexible partnership packages crafted to provide maximum return on investment through talent recruitment, product adoption, and nationwide brand positioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {tierOpportunities.map((tier) => (
              <div
                key={tier.tier}
                className="card-25d relative flex flex-col justify-between rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 sm:p-8 shadow-hard-lg text-[#1E030A]"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E0D4C3] mb-4">
                    <span className="font-mono text-xs font-bold text-[#6D4B54]">
                      {tier.tier}
                    </span>
                    <span className={`rounded-md border border-[#160207] px-2.5 py-0.5 text-[10px] font-heading font-black uppercase shadow-hard-xs ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[#620821] mb-2">
                    {tier.title}
                  </h3>

                  <p className="text-sm text-[#48232C] leading-relaxed mb-6 font-normal">
                    {tier.description}
                  </p>

                  <h4 className="font-mono text-xs font-bold uppercase text-[#991B3D] mb-3 tracking-wider">
                    KEY DELIVERABLES:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#48232C]">
                        <span className="text-[#991B3D] font-bold shrink-0">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E0D4C3] flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${tier.statusColor}`}>
                    Status: {tier.status}
                  </span>
                  <a
                    href="#contact"
                    className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#620821] hover:bg-[#991B3D] px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-hard-xs transition-colors"
                  >
                    <span>Inquire</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Historical & Ecosystem Supporters */}
      <section className="relative w-full py-16 border-b-2 border-[#160207] bg-[#380412] text-white">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-start mb-12">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#22020A] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                Institutional &amp; Community Ecosystem
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              ECOSYSTEM &amp; COMMUNITY SUPPORTERS
            </h2>
            <p className="mt-2 text-base text-[#D8CCD0] max-w-3xl font-normal">
              Institutions, platforms, and developer networks that support WebnD IIT Bhubaneswar in organizing high-impact student hackathons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {historicalEcosystemSupporters.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border-2 border-[#160207] bg-[#22020A] p-5 shadow-hard-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg border-2 border-[#160207] bg-[#991B3D] flex items-center justify-center font-heading font-black text-sm text-white shadow-hard-xs mb-3">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-heading text-base font-bold text-white mb-1">
                    {item.name}
                  </h3>
                  <span className="block font-mono text-[11px] font-semibold text-[#D8CCD0] uppercase mb-2">
                    {item.role}
                  </span>
                  <p className="text-xs text-[#D8CCD0] leading-relaxed">
                    {item.notes}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#380412] mt-4 flex items-center justify-between text-[10px] font-mono text-[#D8CCD0]">
                  <span>Partner</span>
                  <span>Ecosystem</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Sponsorship & Collaboration Contact CTA */}
      <section id="contact" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 6 cols: Info & Contact details */}
            <div className="lg:col-span-6 rounded-2xl border-3 border-[#160207] bg-[#620821] text-white p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#380412] px-3 py-1 shadow-hard-xs mb-4">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Direct Sponsor Engagement
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mb-4">
                  Partner With Code Relay 5.0
                </h3>

                <p className="text-sm text-[#F6F0E8]/90 leading-relaxed mb-6 font-normal">
                  Whether you are looking to hire top-tier student software engineers, benchmark developer tools, sponsor targeted track bounties, or build brand affinity with India&apos;s collegiate tech community, our sponsorship leads are ready to collaborate.
                </p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#160207] bg-[#380412] p-4">
                    <span className="block font-mono text-xs text-[#D8CCD0] uppercase mb-1">
                      Official Society Partnership Email
                    </span>
                    <a
                      href="mailto:webnd@iitbbs.ac.in"
                      className="font-mono text-sm font-bold text-[#F6F0E8] hover:underline"
                    >
                      webnd@iitbbs.ac.in
                    </a>
                  </div>

                  <div className="rounded-xl border border-[#160207] bg-[#380412] p-4">
                    <span className="block font-mono text-xs text-[#D8CCD0] uppercase mb-1">
                      Host Institution
                    </span>
                    <span className="font-heading text-sm font-bold text-white block">
                      Indian Institute of Technology Bhubaneswar
                    </span>
                    <span className="text-xs text-[#D8CCD0]">
                      Web and Design Society (WebnD) · Argul, Jatni, Odisha 752050
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#380412] mt-6 flex items-center justify-between">
                <span className="text-xs font-mono text-[#D8CCD0]">Prospectus Edition 5.0</span>
                <a
                  href="mailto:webnd@iitbbs.ac.in?subject=Request%20Code%20Relay%205.0%20Sponsorship%20Deck"
                  className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-4 py-2 text-xs font-bold uppercase text-white shadow-hard-xs"
                >
                  <span>Request Full Deck</span>
                  <span>↓</span>
                </a>
              </div>
            </div>

            {/* Right 6 cols: Quick Inquiry Form */}
            <div className="lg:col-span-6 rounded-2xl border-3 border-[#160207] bg-[#FFFDF9] p-6 sm:p-8 shadow-hard-lg text-[#1E030A]">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="h-16 w-16 rounded-xl border-2 border-[#160207] bg-[#991B3D] text-white flex items-center justify-center shadow-hard mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-2xl font-black uppercase text-[#620821] mb-2">
                    Inquiry Received!
                  </h4>
                  <p className="text-sm text-[#48232C] max-w-sm leading-relaxed mb-6">
                    Thank you, <strong className="text-[#620821]">{inquiryName || "Partner"}</strong>. Our sponsorship team at WebnD IIT Bhubaneswar will reach out to <span className="font-mono text-[#991B3D] font-bold">{inquiryEmail}</span> within 24 hours with our full partnership deck and package details.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setInquiryName("");
                      setInquiryEmail("");
                      setInquiryCompany("");
                    }}
                    className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-6 py-2.5 text-xs font-bold uppercase text-white shadow-hard-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h4 className="font-heading text-xl font-black uppercase text-[#620821] mb-1">
                      Quick Partnership Inquiry
                    </h4>
                    <p className="text-xs text-[#6D4B54]">
                      Submit your details to receive our comprehensive sponsorship prospectus and engagement deck.
                    </p>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                      Work / Organization Email
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryCompany}
                      onChange={(e) => setInquiryCompany(e.target.value)}
                      placeholder="Acme Technologies Ltd."
                      className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                      Preferred Partnership Category
                    </label>
                    <select
                      value={inquiryInterest}
                      onChange={(e) => setInquiryInterest(e.target.value)}
                      className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                    >
                      <option value="title">Title &amp; Flagship Partnership</option>
                      <option value="track">Web2 / Web3 Track Sponsor</option>
                      <option value="cloud">Cloud / Compute / Tooling Grant</option>
                      <option value="recruitment">Recruitment &amp; Talent Access</option>
                      <option value="other">General Community / Media Support</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] py-3 text-center font-heading text-sm font-black uppercase tracking-wider text-white shadow-hard-sm"
                  >
                    Send Sponsorship Request
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 5. Bottom Navigation Bar */}
      <section className="relative w-full py-12 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#620821]">
              Looking for Event Specifications?
            </h3>
            <p className="text-sm text-[#48232C] mt-0.5 font-medium">
              Explore our dual track architecture and provisional marathon schedule.
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
              href="/"
              className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-5 py-2.5 text-xs font-heading font-bold text-white shadow-hard-xs"
            >
              Back to Home →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
