import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/data/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Code Relay 5.0 · WebnD IIT Bhubaneswar",
    short_name: "Code Relay",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F0E8",
    theme_color: "#991B3D",
    icons: [
      { src: "/icon.png", sizes: "412x412", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "412x412", type: "image/png" },
    ],
  };
}
