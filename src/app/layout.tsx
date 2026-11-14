import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RegisterModalProvider } from "@/context/RegisterModalContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import SmoothScroll from "@/components/world/SmoothScroll";
import IntroLoader from "@/components/world/IntroLoader";
import RouteCurtain from "@/components/world/RouteCurtain";
import Cursor from "@/components/world/Cursor";
import ClickSpark from "@/components/world/ClickSpark";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://code-relay.vercel.app"),
  title: {
    default: "Code Relay 5.0 | Sprint to Innovation — WebnD IIT Bhubaneswar",
    template: "%s",
  },
  description:
    "Code Relay 5.0 is the flagship nationwide hackathon of the Web & Design Society, IIT Bhubaneswar. Web2 and Web3 tracks, an online idea round, and a 30-hour on-campus final.",
  keywords: ["Code Relay", "Code Relay 5.0", "WebnD", "IIT Bhubaneswar", "Hackathon", "Web2", "Web3", "Agentic AI", "Onchain"],
  icons: {
    icon: [{ url: "/assets/cr_logo.png" }, { url: "/icon.png" }, { url: "/favicon.ico" }],
    apple: [{ url: "/assets/cr_logo.png" }, { url: "/apple-icon.png" }],
    shortcut: "/assets/cr_logo.png",
  },
  openGraph: {
    title: "Code Relay 5.0 — Sprint to Innovation",
    description: "Two tracks. One relay. 30 hours at IIT Bhubaneswar. Organised by the Web & Design Society.",
    type: "website",
    images: [{ url: "/brand/cr-mascot.png", width: 807, height: 792, alt: "Code Relay 5.0 mascot" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${grotesk.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="grain min-h-full flex flex-col bg-[var(--cream)] text-[var(--ink)]">
        <SessionProvider>
          <RegisterModalProvider>
            <SmoothScroll>
              <IntroLoader />
              <RouteCurtain />
              <Cursor />
              <ClickSpark />
              <Navbar />
              <main className="relative z-10 flex-1 w-full">{children}</main>
              <div className="relative z-10">
                <Footer />
              </div>
            </SmoothScroll>
          </RegisterModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
