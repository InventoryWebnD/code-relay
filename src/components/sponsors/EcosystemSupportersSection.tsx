import { HISTORICAL_ECOSYSTEM_SUPPORTERS } from "@/data/sponsorsData";

export default function EcosystemSupportersSection() {
  return (
    <section className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            ECOSYSTEM &amp; COMMUNITY SUPPORTERS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Institutions, platforms, and developer networks that support WebnD IIT Bhubaneswar in organizing high-impact student hackathons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HISTORICAL_ECOSYSTEM_SUPPORTERS.map((item) => (
            <div
              key={item.name}
              className="editorial-card rounded-2xl p-6 flex flex-col justify-between group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#991B3D] flex items-center justify-center font-heading font-black text-sm text-white shadow-md mb-4">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-heading text-base font-bold text-[#F6F0E8] mb-1">
                  {item.name}
                </h3>
                <span className="block font-mono text-[11px] font-semibold text-[#E8738D] uppercase mb-2">
                  {item.role}
                </span>
                <p className="text-xs text-[#E0D4C3] leading-relaxed font-normal">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
