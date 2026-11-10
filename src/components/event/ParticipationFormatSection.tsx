import { PARTICIPATION_FORMATS } from "@/data/eventData";

export default function ParticipationFormatSection() {
  return (
    <section id="format" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Event Rules &amp; Specifications
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
            PARTICIPATION FORMAT &amp; ELIGIBILITY
          </h2>
          <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
            Everything you need to know about team structure, collegiate requirements, and the relay execution format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTICIPATION_FORMATS.map((item) => (
            <div
              key={item.specNumber}
              className="card-25d rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#991B3D]">
                    {item.specNumber}
                  </span>
                  <span className={`rounded border border-[#160207] px-2 py-0.5 text-[10px] font-black uppercase shadow-hard-xs ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#620821] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#48232C] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E0D4C3] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6D4B54]">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

