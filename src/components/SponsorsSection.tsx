"use client";

import Link from "next/link";

interface SponsorTierItem {
  name: string;
  category: string;
  badge: string;
  tier: "PLATINUM" | "GOLD" | "SILVER" | "VIOLET";
  tierLabel: string;
  svgNormal: string;
  svgHover: string;
  badgeColor: string;
  shadowColor: string;
}

export default function SponsorsSection() {
  const sponsors: SponsorTierItem[] = [
    {
      name: "DevRel Protocol",
      category: "TITLE PARTNER",
      badge: "PLATINUM",
      tier: "PLATINUM",
      tierLabel: "TIER 01 // PLATINUM",
      svgNormal: "/assets/card-2-platinum.svg",
      svgHover: "/assets/card-2-platinum-hover.svg",
      badgeColor: "bg-[#0284c7] text-white",
      shadowColor: "shadow-[6px_6px_0px_#0284c7]",
    },
    {
      name: "CloudScale Engine",
      category: "CLOUD INFRASTRUCTURE",
      badge: "PLATINUM",
      tier: "PLATINUM",
      tierLabel: "TIER 01 // PLATINUM",
      svgNormal: "/assets/card-2-platinum.svg",
      svgHover: "/assets/card-2-platinum-hover.svg",
      badgeColor: "bg-[#0284c7] text-white",
      shadowColor: "shadow-[6px_6px_0px_#0284c7]",
    },
    {
      name: "ChainNode Labs",
      category: "NODE ECOSYSTEM",
      badge: "GOLD",
      tier: "GOLD",
      tierLabel: "TIER 02 // GOLD",
      svgNormal: "/assets/card-2.svg",
      svgHover: "/assets/card-2-hover.svg",
      badgeColor: "bg-[#f59e0b] text-black",
      shadowColor: "shadow-[6px_6px_0px_#b45309]",
    },
    {
      name: "TensorCore AI",
      category: "COMPUTE & ACCEL",
      badge: "GOLD",
      tier: "GOLD",
      tierLabel: "TIER 02 // GOLD",
      svgNormal: "/assets/card-2.svg",
      svgHover: "/assets/card-2-hover.svg",
      badgeColor: "bg-[#f59e0b] text-black",
      shadowColor: "shadow-[6px_6px_0px_#b45309]",
    },
    {
      name: "Nexus Ventures",
      category: "ECOSYSTEM CAPITAL",
      badge: "SILVER",
      tier: "SILVER",
      tierLabel: "TIER 03 // SILVER",
      svgNormal: "/assets/card-2-silver.svg",
      svgHover: "/assets/card-2-silver-hover.svg",
      badgeColor: "bg-[#94a3b8] text-black",
      shadowColor: "shadow-[6px_6px_0px_#475569]",
    },
    {
      name: "Vector Database",
      category: "ON-CHAIN STORAGE",
      badge: "PROTOCOL",
      tier: "VIOLET",
      tierLabel: "TIER 03 // PROTOCOL",
      svgNormal: "/assets/card-2-violet.svg",
      svgHover: "/assets/card-2-violet-hover.svg",
      badgeColor: "bg-[#7c3aed] text-white",
      shadowColor: "shadow-[6px_6px_0px_#5b21b6]",
    },
  ];

  return (
    <section id="sponsors" className="relative w-full py-16 sm:py-20 border-b-2 border-black bg-[#070b14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-black bg-[#0d1424] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-slate-400 uppercase">
              {"// SECTION 04: INDUSTRY NETWORK"}
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            SUPPORTED BY INDUSTRY LEADERS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            Partnered with leading technological organizations providing bounties, cloud compute credits, API quotas, and direct recruitment pathways.
          </p>
        </div>

        {/* Sponsor Cards with card2.svg Border (Tier Color Variations) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 mb-12">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className={`group card-25d relative flex flex-col items-center justify-between rounded-xl bg-[#0a101d] px-6 py-8 sm:px-7 sm:py-9 text-center hover:bg-[#0f172a] transition-all min-h-[250px] ${sponsor.shadowColor}`}
            >
              {/* card2.svg as the decorative tier border */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Normal State Tier Border */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.svgNormal}
                  alt={`${sponsor.tier} border`}
                  className="w-full h-full object-fill transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* Hover State Tier Border */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.svgHover}
                  alt={`${sponsor.tier} border hover`}
                  className="absolute inset-0 w-full h-full object-fill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              {/* Card Content Inside Border */}
              <div className="relative z-10 flex flex-col items-center justify-between h-full w-full py-1">
                
                {/* Top Tier Tag */}
                <span className="font-mono text-[8px] font-black tracking-widest text-slate-500 uppercase mb-2">
                  {sponsor.tierLabel}
                </span>

                {/* Monogram Icon */}
                <div className="h-11 w-11 rounded-lg border-2 border-black bg-[#162238] flex items-center justify-center mb-2.5 shadow-hard-xs group-hover:scale-105 transition-transform">
                  <span className="font-heading font-black text-sm text-slate-100">
                    {sponsor.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                {/* Sponsor Name & Category */}
                <div className="mb-2">
                  <span className="font-heading font-bold text-sm text-white block leading-tight mb-1">
                    {sponsor.name}
                  </span>
                  <span className="font-mono text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {sponsor.category}
                  </span>
                </div>

                {/* Bottom Tier Badge */}
                <span className={`rounded border border-black px-2 py-0.5 font-mono text-[9px] font-black uppercase shadow-hard-xs ${sponsor.badgeColor}`}>
                  {sponsor.badge}
                </span>

              </div>
            </div>
          ))}
        </div>

        {/* Sponsors CTA Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="rounded-xl border-2 border-black bg-[#0d1424] px-6 py-4 shadow-hard flex flex-col sm:flex-row items-center gap-4">
            <span className="text-sm font-medium text-slate-300">
              Interested in mentoring, sponsoring tracks, or offering bounties?
            </span>
            <Link
              href="#sponsors"
              className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#2563eb] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-hard-xs whitespace-nowrap"
            >
              <span>Download Sponsor Deck</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
