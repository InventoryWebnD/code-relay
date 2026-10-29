export default function IdentityStrip() {
  const items = [
    { label: "Nationwide Hackathon", color: "bg-[#991B3D] text-white" },
    { label: "Web2 Track", color: "bg-[#B82A4F] text-white" },
    { label: "Web3 Track", color: "bg-[#4B5D86] text-white" },
    { label: "36-Hour Relay", color: "bg-[#F6F0E8] text-[#620821]" },
    { label: "IIT Bhubaneswar", color: "bg-[#380412] text-white" },
  ];

  return (
    <section className="relative w-full border-b-2 border-[#160207] bg-[#620821] py-4 overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-12 flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <span className="font-heading text-xs sm:text-sm font-bold text-[#F6F0E8] uppercase tracking-wider">
            Edition 5.0 Core Focus
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={`inline-flex items-center rounded-md border-2 border-[#160207] px-3 py-1 text-xs font-heading font-bold shadow-hard-xs ${item.color}`}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
