import { Metadata } from "next";
import ProfileView from "@/components/profile/ProfileView";
import ControlRoom from "@/components/world/ControlRoom";

export const metadata: Metadata = {
  title: "Participant Profile | Code Relay 5.0",
  description:
    "Manage your Code Relay 5.0 hacker profile, track submissions, team memberships, and credentials.",
};

export default function ProfilePage() {
  return (
    <ControlRoom label="Your relay HQ">
      <div className="mx-auto max-w-6xl">
        <ProfileView />
      </div>
    </ControlRoom>
  );
}
