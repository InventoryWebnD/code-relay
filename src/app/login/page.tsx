import { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import LoginForm from "@/components/auth/LoginForm";
import ControlRoom from "@/components/world/ControlRoom";

export const metadata: Metadata = pageMetadata({
  title: "Participant Sign In | Code Relay 5.0",
  description: "Sign in to your Code Relay 5.0 participant profile.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <ControlRoom label="Participant sign in" narrow>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </ControlRoom>
  );
}
