import { Metadata } from "next";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata: Metadata = {
  title: "Register for Code Relay 5.0 | Hacker Admission Portal",
  description:
    "Create your official Code Relay 5.0 participant profile. Register for Web2 & Web3 tracks, join collegiate teams, and compete for the national relay championship.",
};

export default function RegisterPage() {
  return (
    <div className="w-full flex flex-col bg-[#160207] text-[#F6F0E8] overflow-hidden selection:bg-[#991B3D] selection:text-white">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-12 left-1/4 w-[60vw] h-[450px] bg-[radial-gradient(circle,rgba(153,27,61,0.22)_0%,transparent_70%)] blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 w-[40vw] h-[380px] bg-[radial-gradient(circle,rgba(255,141,167,0.12)_0%,transparent_70%)] blur-[120px] rounded-full" />

      {/* Main Registration Layout Container */}
      <section className="relative w-full pt-4 sm:pt-6 pb-20 border-b border-[rgba(255,255,255,0.08)]">
        <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
