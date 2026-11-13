import { Metadata } from "next";
import { HeroSection, IdentityStrip, ClosingCTA } from "@/components/home";

export const metadata: Metadata = {
  title: "Code Relay 5.0 | Nationwide Web2 & Web3 Hackathon — WebnD IIT Bhubaneswar",
  description:
    "Code Relay 5.0 is India's premier nationwide collegiate hackathon featuring parallel Web2 and Web3 tracks, organized by the Web and Design Society, IIT Bhubaneswar.",
};

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
