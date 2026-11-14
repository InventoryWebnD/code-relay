import {
  SponsorsHeader,
  PastSponsorsSection,
  SponsorshipTiersSection,
  SponsorsContactSection,
  SponsorsCTA,
} from "@/components/sponsors";

export const metadata = {
  title: "Sponsors & Ecosystem Partners | Code Relay 5.0",
  description:
    "Partner with Code Relay 5.0 to engage 1,200+ elite engineers, discover premier talent, and sponsor custom problem statement tracks.",
};

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen bg-[#160207] text-[#F6F0E8] overflow-hidden selection:bg-[#991B3D] selection:text-white">
      {/* 1. Page Header */}
      <SponsorsHeader />

      {/* 2. Past Sponsors (4.0 & 3.0 with official logos) */}
      <PastSponsorsSection />

      {/* 3. Partnership Options (Website Theme) */}
      <SponsorshipTiersSection />

      {/* 4. Contact Us with Social Links */}
      <SponsorsContactSection />

      {/* 5. Bottom Navigation Bar */}
      <SponsorsCTA />
    </div>
  );
}
