import type { ReactNode } from "react";
import { REGISTER_URL } from "@/data/cr5";

/**
 * Every "Register" call to action goes through here. Registration happens on
 * Unstop: set NEXT_PUBLIC_REGISTER_URL to the Unstop page when it goes live.
 * Until then the button says registrations are opening soon and goes nowhere.
 */
export default function RegisterLink({
  className = "",
  children,
  soon = "Registrations open soon",
}: {
  className?: string;
  children: ReactNode;
  soon?: ReactNode;
}) {
  if (REGISTER_URL) {
    return (
      <a href={REGISTER_URL} target="_blank" rel="noreferrer" className={className} data-cursor="Unstop">
        {children}
      </a>
    );
  }
  return (
    <span role="link" aria-disabled="true" className={`${className} cursor-default opacity-75`}>
      {soon}
    </span>
  );
}
