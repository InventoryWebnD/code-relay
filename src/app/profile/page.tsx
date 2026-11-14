import { Metadata } from "next";
import ProfileView from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "Participant Profile | Code Relay 5.0",
  description:
    "Manage your Code Relay 5.0 hacker profile, track submissions, team memberships, and credentials.",
};

export default function ProfilePage() {
  return (
    <div className="w-full flex flex-col bg-[#160207] text-[#F6F0E8] overflow-hidden selection:bg-[#991B3D] selection:text-white">
      {/* Ambient wine glows */}
      <div className="pointer-events-none absolute top-12 left-1/3 w-[60vw] h-[450px] bg-[radial-gradient(circle,rgba(153,27,61,0.22)_0%,transparent_70%)] blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[45vw] h-[350px] bg-[radial-gradient(circle,rgba(255,141,167,0.12)_0%,transparent_70%)] blur-[120px] rounded-full" />

      {/* Main Container */}
      <section className="relative w-full pt-4 sm:pt-6 pb-20 border-b border-[rgba(255,255,255,0.08)]">
        <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10 max-w-6xl mx-auto">
          <ProfileView />
        </div>
      </section>
    </div>
  );
}
