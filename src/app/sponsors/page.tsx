import { Metadata } from "next";
import { breadcrumbLd, pageMetadata } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";
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

export const metadata: Metadata = pageMetadata({
  title: "Sponsors & Partners | Code Relay 5.0, powered by TrueFoundry",
  description: "Code Relay 5.0 is powered by TrueFoundry, title partner for Web2, with CSM Technologies as Web2 technology partner and Soulverse as digital identity & payments partner for Web3. Explore title, track, talent and bounty partnerships and reach thousands of student builders across India.",
  path: "/sponsors",
});

export default function SponsorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Sponsors", path: "/sponsors" }])} />
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
