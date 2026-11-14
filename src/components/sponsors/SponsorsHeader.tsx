import Image from "next/image";

export default function SponsorsHeader() {
  return (
    <section className="relative w-full pt-2 sm:pt-3 pb-12 sm:pb-16 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Atmospheric ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-[420px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.25)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F6F0E8] mb-6 leading-tight">
              SPONSORS &amp; PARTNERS
            </h1>

            <p className="text-base sm:text-lg text-[#E0D4C3] font-normal leading-relaxed mb-8 max-w-3xl">
              Partner with Code Relay 5.0 to engage with 2,500+ top engineering minds, discover outstanding technical talent, accelerate developer adoption of your APIs and protocols, and champion open-source innovation at IIT Bhubaneswar.
            </p>

            {/* Status Banner */}
            <div className="editorial-card rounded-2xl p-5 sm:p-6 w-full">
              <div className="flex items-start gap-4">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#B82A4F]/50 bg-[#991B3D]/80 p-1 shadow-md overflow-hidden">
                  <Image
                    src="/assets/cr_logo.png"
                    alt="Code Relay Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-heading text-base sm:text-lg font-bold text-[#F6F0E8] mb-1">
                    Partnership Prospectus &amp; Invitations Open
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E0D4C3] leading-relaxed font-normal">
                    Sponsorship agreements and track partner confirmations for <strong className="text-[#F6F0E8]">Edition 5.0</strong> are actively underway. To preserve transparency and integrity, we display verified partner categories and engagement opportunities below. Organizations interested in sponsoring can connect with our team directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative vignette portal */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              className="portal-vignette relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center"
              data-parallax="true"
              data-parallax-speed="0.15"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.5)_0%,transparent_70%)] blur-md" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                <Image
                  src="/decoratives/exhibitionTable.webp"
                  alt="Partnership Exhibition Desk"
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
