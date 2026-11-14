import { Metadata } from "next";
import RegisterForm from "@/components/register/RegisterForm";
import ControlRoom from "@/components/world/ControlRoom";

export const metadata: Metadata = {
  title: "Register for Code Relay 5.0 | Hacker Admission Portal",
  description:
    "Create your official Code Relay 5.0 participant profile. Register for Web2 & Web3 tracks, join collegiate teams, and compete for the national relay championship.",
};

export default function RegisterPage() {
  return (
    <ControlRoom label="Admission portal · Edition 5.0">
      <RegisterForm />
    </ControlRoom>
  );
}
