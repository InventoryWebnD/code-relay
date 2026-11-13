import {
  SponsorsHeader,
  SponsorshipTiersSection,
  EcosystemSupportersSection,
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
    <div className="relative min-h-screen bg-[#FFFDF9] text-[#160207] overflow-x-hidden selection:bg-[#991B3D] selection:text-white">
      {/* 1. Page Header */}
      <SponsorsHeader />

      {/* 2. Structured Tier Opportunities */}
      <SponsorshipTiersSection />

      {/* 3. Historical Ecosystem Supporters */}
      <EcosystemSupportersSection />

      {/* 4. Sponsorship Contact & Direct Inquiry Desk */}
      <SponsorsContactSection />

      {/* 5. Bottom Navigation Bar */}
      <SponsorsCTA />
    </div>
  );
}
