export default function SponsorsContactSection() {
  const socialChannels = [
    {
      name: "Instagram",
      handle: "@webnd.iitbbs",
      url: "https://www.instagram.com/webnd.iitbbs/",
      badge: "Community & Updates",
      badgeColor: "bg-[#E1306C]/20 text-[#FF6584] border-[#E1306C]/40",
      description: "Follow our verified society handle for live hackathon stories, campus teasers, partner spotlights, and developer showcases.",
      cta: "Follow on Instagram",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      handle: "WebnD IIT Bhubaneswar",
      url: "https://www.linkedin.com/company/webd-iitbbs/",
      badge: "Professional & Network",
      badgeColor: "bg-[#0A66C2]/20 text-[#70B5F9] border-[#0A66C2]/40",
      description: "Connect with our organizing secretariat, lead coordinators, faculty advisors, and distinguished alumni engineering network.",
      cta: "Connect on LinkedIn",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Official Partnership Email",
      handle: "secyweb.sg@iitbbs.ac.in",
      url: "mailto:secyweb.sg@iitbbs.ac.in",
      badge: "Direct Desk",
      badgeColor: "bg-[#991B3D]/25 text-[#E8738D] border-[#991B3D]/50",
      description: "Direct line to the Secretary, Web and Design Society for official sponsorship decks, MOU discussions, problem statement tracks, and invoicing.",
      cta: "Send Direct Email",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-16 sm:py-24 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.2)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B82A4F]/40 bg-[#991B3D]/15 px-3 py-1 mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8738D]">
              Direct Desk
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            CONTACT US
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Interested in partnering for Code Relay 5.0? Connect directly with our sponsorship secretariat via our official handles and communication channels.
          </p>
        </div>

        {/* Social Links Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {socialChannels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className="editorial-card rounded-2xl p-7 flex flex-col justify-between group hover:border-[rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-[#F6F0E8] group-hover:scale-110 group-hover:bg-[#991B3D] transition-all duration-300 shadow-md">
                    {channel.icon}
                  </div>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${channel.badgeColor}`}
                  >
                    {channel.badge}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-black uppercase text-[#F6F0E8] mb-1">
                  {channel.name}
                </h3>
                <span className="block font-mono text-xs font-semibold text-[#E8738D] mb-3 break-all">
                  {channel.handle}
                </span>

                <p className="text-xs sm:text-sm text-[#E0D4C3] font-normal leading-relaxed mb-6">
                  {channel.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs font-mono font-bold text-[#F6F0E8] group-hover:text-[#E8738D] transition-colors">
                <span>{channel.cta}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Institutional Backing & Deck Request Bar */}
        <div className="editorial-card rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-[#991B3D]/80 flex items-center justify-center text-white shrink-0 mt-0.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading text-base sm:text-lg font-bold text-[#F6F0E8]">
                Web and Design Society (WebnD) · IIT Bhubaneswar
              </h4>
              <p className="text-xs sm:text-sm text-[#E0D4C3] mt-0.5 font-normal">
                Argul, Jatni, Khordha, Odisha 752050 · Student Activity Centre (SAC)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href="mailto:secyweb.sg@iitbbs.ac.in?subject=Request%20Code%20Relay%205.0%20Sponsorship%20Deck"
              className="btn-pill-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider"
            >
              <span>Request Full Sponsorship Deck</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
