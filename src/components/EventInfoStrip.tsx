"use client";

interface InfoCardProps {
  index: string;
  badge: string;
  badgeColor: "blue" | "violet" | "lime" | "slate";
  title: string;
  highlight: string;
  description: string;
  isPlaceholder?: boolean;
}

export default function EventInfoStrip() {
  const cards: InfoCardProps[] = [
    {
      index: "01 // SCOPE",
      badge: "PAN-INDIA",
      badgeColor: "blue",
      title: "Nationwide Hackathon",
      highlight: "Open to All Indian Colleges",
      description: "Undergraduate and postgraduate builders collaborate in multidisciplinary teams of 2–4 members.",
    },
    {
      index: "02 // TRACKS",
      badge: "DUAL ENGINE",
      badgeColor: "violet",
      title: "Web2 & Web3 Tracks",
      highlight: "Parallel Problem Verticals",
      description: "Compete in specialized tracks featuring real-world engineering hurdles and decentralized protocol challenges.",
    },
    {
      index: "03 // TIMELINE",
      badge: "SPRING 2025",
      badgeColor: "lime",
      title: "Event Date",
      highlight: "Dates TBA (Placeholder)",
      description: "Official schedule, opening keynotes, 36h hacking marathon, and jury evaluations to be announced.",
      isPlaceholder: true,
    },
    {
      index: "04 // ADMISSIONS",
      badge: "OPENING SOON",
      badgeColor: "slate",
      title: "Registration Deadline",
      highlight: "TBA · Sign Up for Alerts",
      description: "Registrations will open shortly via Unstop & our official portal. Early bird access guaranteed.",
      isPlaceholder: true,
    },
  ];

  return (
    <section id="event" className="relative w-full py-16 border-b-2 border-black bg-[#050912]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Tag */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-sm bg-[#2563eb] border border-black shadow-hard-xs"></span>
            <h2 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
              [ SECTION 01: EVENT ESSENTIALS & TIMELINE MATRIX ]
            </h2>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-slate-500">
            LOC: IIT BHUBANESWAR CAMPUS / HYBRID
          </span>
        </div>

        {/* 4 Cards with card1.svg decorative border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.index}
              className="group card-25d relative flex flex-col justify-between rounded-xl bg-[#0a101d] px-8 py-9 sm:px-10 sm:py-10 shadow-hard-lg hover:bg-[#0f172a] transition-all min-h-[300px]"
            >
              {/* card1.svg as the decorative border */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Normal State Border */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card-1.svg"
                  alt=""
                  className="w-full h-full object-fill transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* Hover State Border */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card-1-hover.svg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              {/* Card Content (Elevated above border background with clean safe margins) */}
              <div className="relative z-10 flex flex-col justify-between h-full pt-1 px-1">
                <div>
                  {/* Top metadata strip */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400">
                      {card.index}
                    </span>
                    <span
                      className={`rounded-md border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-hard-xs ${
                        card.badgeColor === "blue"
                          ? "bg-[#2563eb] text-white"
                          : card.badgeColor === "violet"
                          ? "bg-[#7c3aed] text-white"
                          : card.badgeColor === "lime"
                          ? "bg-[#d4ff00] text-black"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-heading text-lg font-bold text-white mb-1.5 group-hover:text-[#60a5fa] transition-colors">
                    {card.title}
                  </h3>

                  {/* Highlight */}
                  <div className="mb-2.5">
                    <span
                      className={`inline-block font-mono text-xs font-bold ${
                        card.isPlaceholder ? "text-[#d4ff00]" : "text-[#60a5fa]"
                      }`}
                    >
                      {card.highlight}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                {/* Bottom technical status */}
                <div className="pt-3 border-t border-[#1e293b]/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {card.isPlaceholder ? "STATUS: PENDING CONFIRMATION" : "STATUS: VERIFIED"}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff00]"></span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
