import { HISTORICAL_ECOSYSTEM_SUPPORTERS } from "@/data/sponsorsData";

export default function EcosystemSupportersSection() {
  return (
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
          {HISTORICAL_ECOSYSTEM_SUPPORTERS.map((item) => (
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
  );
}

