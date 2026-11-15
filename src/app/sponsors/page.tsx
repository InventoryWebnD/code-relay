import { Metadata } from "next";
import {
  ContactDesk,
  FoodBlock,
  PartnerOptions,
  ReachBlock,
  SponsorsHero,
  TierStack,
  WhySponsor,
} from "@/components/sponsors/SponsorBlocks";
import PartnerLogos from "@/components/world/blocks/PartnerLogos";

export const metadata: Metadata = {
  title: "Sponsors & Partners | Code Relay 5.0",
  description:
    "Sponsorship tiers, track and talent partnerships, and food & beverage partnerships for Code Relay 5.0 at IIT Bhubaneswar.",
};

export default function SponsorsPage() {
  return (
    <>
      <SponsorsHero />
      <PartnerLogos id="current-partners" />
      <ReachBlock />
      <TierStack />
      <PartnerOptions />
      <FoodBlock />
      <WhySponsor />
      <ContactDesk />
    </>
  );
}
