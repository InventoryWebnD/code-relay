import { SCHEDULE_DAYS } from "@/data/eventData";

export default function EventScheduleSection() {
  return (
    <section id="schedule" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#4B5D86] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              36-Hour Hackathon Progression
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
            PROVISIONAL SPRINT SCHEDULE
          </h2>
          <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
            Provisional run of show for Code Relay 5.0. Official dates and venue timings will be published upon registration opening.
          </p>
        </div>

        <div className="space-y-8">
          {SCHEDULE_DAYS.map((dayPlan) => (
            <div
              key={dayPlan.day}
              className="rounded-2xl border-2 border-[#160207] bg-[#FFFDF9] shadow-hard-lg overflow-hidden"
            >
              {/* Day Header */}
              <div className="bg-[#620821] text-white p-4 sm:p-6 border-b-2 border-[#160207] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wide">
                    {dayPlan.day}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded border border-[#160207] bg-[#991B3D] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-xs">
                  {dayPlan.date}
                </div>
              </div>

              {/* Events Timeline */}
              <div className="p-4 sm:p-6 divide-y divide-[#E0D4C3]">
                {dayPlan.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="py-4 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-6"
                  >
                    <div className="md:w-48 shrink-0">
                      <span className="inline-block rounded-md border border-[#160207] bg-[#F6F0E8] px-2.5 py-1 font-mono text-xs font-bold text-[#620821] shadow-hard-xs">
                        {evt.time}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#620821] mb-1">
                        {evt.title}
                      </h4>
                      <p className="text-sm text-[#48232C] leading-relaxed font-normal">
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

