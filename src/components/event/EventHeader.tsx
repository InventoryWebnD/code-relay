import { IN_PAGE_NAV_PILLS } from "@/data/eventData";

export default function EventHeader() {
  return (
    <section className="relative w-full pt-12 pb-16 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-4">
            <span className="text-xs font-mono font-bold text-[#620821] uppercase tracking-wider">
              Edition 5.0 Specifications · IIT Bhubaneswar
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821] mb-6">
            THE EVENT: CODE RELAY 5.0
          </h1>

          <p className="text-lg sm:text-xl text-[#3A1822] font-medium leading-relaxed mb-8">
            Code Relay 5.0 is the flagship 36-hour hackathon of the Web and Design Society (WebnD) at IIT Bhubaneswar. Uniting student developers nationwide, Code Relay challenges participants to build, ship, and pitch production-ready solutions across dual Web2 and Web3 verticals.
          </p>

          {/* Quick in-page nav pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {IN_PAGE_NAV_PILLS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3 py-1.5 text-xs font-mono font-bold text-[#620821] shadow-hard-xs hover:bg-[#991B3D] hover:text-white transition-all"
              >
                {item.label} ↓
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

