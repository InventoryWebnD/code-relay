import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RegisterModalProvider } from "@/context/RegisterModalContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CustomCursor from "@/components/shared/CustomCursor";
import ScrollAnimationProvider from "@/components/shared/ScrollAnimationProvider";
import PageTransitionSplash from "@/components/shared/PageTransitionSplash";
import SessionProvider from "@/components/providers/SessionProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Code Relay 5.0 | Nationwide Web2 & Web3 Hackathon — WebnD IIT Bhubaneswar",
    template: "%s",
  },
  description: "Code Relay 5.0 is India's premier nationwide hackathon featuring Web2 and Web3 tracks, organized by the Web and Design Society, IIT Bhubaneswar.",
  keywords: ["Code Relay", "Code Relay 5.0", "WebnD", "IIT Bhubaneswar", "Hackathon", "Web2", "Web3", "Blockchain", "Full Stack"],
  icons: {
    icon: [
      { url: "/assets/cr_logo.png" },
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/assets/cr_logo.png" },
      { url: "/apple-icon.png" },
    ],
    shortcut: "/assets/cr_logo.png",
  },
  openGraph: {
    title: "Code Relay 5.0 — Nationwide Web2 & Web3 Hackathon",
    description: "Two tracks. One relay. Organized by the Web & Design Society, IIT Bhubaneswar.",
    type: "website",
    images: [
      {
        url: "/assets/cr_logo.png",
        width: 412,
        height: 412,
        alt: "Code Relay 5.0 Official Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#160207] text-[#F6F0E8] selection:bg-[#991B3D] selection:text-white">
        <RegisterModalProvider>
          <ScrollAnimationProvider>
            <PageTransitionSplash />
            <CustomCursor />
            <Navbar />
            <main className="flex-1 w-full">
              <SessionProvider>
              {children}
              </SessionProvider>
            </main>
            <Footer />
          </ScrollAnimationProvider>
        </RegisterModalProvider>
      </body>
    </html>
  );
}
