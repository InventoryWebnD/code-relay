export default function SponsorsHeader() {
  return (
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
  );
}

