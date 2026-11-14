import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Participant Sign In | Code Relay 5.0",
  description:
    "Sign in to your Code Relay 5.0 participant profile to access problem statements and submissions.",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-[75vh] flex flex-col justify-center items-center bg-[#160207] text-[#F6F0E8] overflow-hidden selection:bg-[#991B3D] selection:text-white py-12 px-6">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[350px] bg-[radial-gradient(circle,rgba(153,27,61,0.25)_0%,transparent_70%)] blur-[120px] rounded-full" />
      <LoginForm />
    </div>
  );
}
