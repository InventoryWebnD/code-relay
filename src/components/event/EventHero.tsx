"use client";

import PageHero from "@/components/world/PageHero";
import { REGISTER_URL } from "@/data/cr5";

export default function EventHero() {
  return (
    <PageHero
      label="The Event · Code Relay 5.0"
      title={"The rules\nof the run"}
      sub="An online idea round open to all of India, then a 30-hour build sprint on campus at IIT Bhubaneswar. Here's everything you need."
      world="stairs"
      worldX={5}
      actions={[
        REGISTER_URL
          ? { href: REGISTER_URL, label: "Register on Unstop ↗", primary: true, external: true }
          : { href: "#guidelines", label: "Read the guidelines", primary: true },
        { href: "#format", label: "See the format" },
      ]}
    />
  );
}
