import { Metadata } from "next";
import RelayStory from "@/components/story/RelayStory";
import Manifesto from "@/components/home/Manifesto";
import TracksShowcase from "@/components/world/blocks/TracksShowcase";
import PrizeFlip from "@/components/world/blocks/PrizeFlip";
import DomeGallery from "@/components/world/blocks/DomeGallery";
import ReviewStack from "@/components/world/blocks/ReviewStack";
import PartnerLogos from "@/components/world/blocks/PartnerLogos";
import SponsorWall from "@/components/world/blocks/SponsorWall";
import FaqBlock from "@/components/world/blocks/FaqBlock";
import FinalCTA from "@/components/world/blocks/FinalCTA";
import OrganisingCommittee from "@/components/world/blocks/OrganisingCommittee";

export const metadata: Metadata = {
  title: "Code Relay 5.0 | Sprint to Innovation — WebnD IIT Bhubaneswar",
  description:
    "Code Relay 5.0: WebnD IIT Bhubaneswar's flagship nationwide hackathon. AI & Automation and AI for Bharat tracks, an online idea round and a 30-hour on-campus final.",
};

export default function Home() {
  return (
    <>
      <RelayStory />
      <Manifesto />
      <TracksShowcase />
      <PrizeFlip />
      <DomeGallery />
      <ReviewStack />
      <PartnerLogos />
      <SponsorWall />
      <FaqBlock />
      <OrganisingCommittee />
      <FinalCTA />
    </>
  );
}
