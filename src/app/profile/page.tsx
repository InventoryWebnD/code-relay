import { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import ProfileView from "@/components/profile/ProfileView";
import ControlRoom from "@/components/world/ControlRoom";

export const metadata: Metadata = pageMetadata({
  title: "Participant Profile | Code Relay 5.0",
  description: "Your Code Relay 5.0 participant profile.",
  path: "/profile",
  noindex: true,
});

export default function ProfilePage() {
  return (
    <ControlRoom label="Your relay HQ">
      <div className="mx-auto max-w-6xl">
        <ProfileView />
      </div>
    </ControlRoom>
  );
}
