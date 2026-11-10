import { HeroSection, IdentityStrip, ClosingCTA } from "@/components/home";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-[#F6F0E8]">
      {/* 1. Dominant Hero Section with 2.5D Dimensional Object */}
      <HeroSection />

      {/* 2. Minimal Event Identity Strip */}
      <IdentityStrip />

      {/* 3. Compact Closing CTA Section */}
      <ClosingCTA />
    </div>
  );
}
