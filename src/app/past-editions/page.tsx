import { Metadata } from "next";
import { HallOfFame, LegacyHero, RecentEditions } from "@/components/past-editions/LegacyBlocks";
import DomeGallery from "@/components/world/blocks/DomeGallery";
import ReviewStack from "@/components/world/blocks/ReviewStack";
import SponsorWall from "@/components/world/blocks/SponsorWall";
import FinalCTA from "@/components/world/blocks/FinalCTA";

export const metadata: Metadata = {
  title: "Past Editions | Code Relay",
  description: "Four editions of Code Relay by WebnD, IIT Bhubaneswar: themes, stats, winners, gallery and reviews.",
};

export default function PastEditionsPage() {
  return (
    <>
      <LegacyHero />
      <RecentEditions />
      <HallOfFame />
      <DomeGallery title={"The\narchive"} label="Gallery" />
      <ReviewStack />
      <SponsorWall />
      <FinalCTA title="Run lap five" />
    </>
  );
}
