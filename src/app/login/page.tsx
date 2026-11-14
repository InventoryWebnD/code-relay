import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import ControlRoom from "@/components/world/ControlRoom";

export const metadata: Metadata = {
  title: "Participant Sign In | Code Relay 5.0",
  description:
    "Sign in to your Code Relay 5.0 participant profile to access problem statements and submissions.",
};

export default function LoginPage() {
  return (
    <ControlRoom label="Participant sign in" narrow>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </ControlRoom>
  );
}
