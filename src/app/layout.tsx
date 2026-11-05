import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RegisterModalProvider } from "@/context/RegisterModalContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CustomCursor from "@/components/shared/CustomCursor";
import ScrollAnimationProvider from "@/components/shared/ScrollAnimationProvider";

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
  title: "Code Relay 5.0 | Nationwide Web2 & Web3 Hackathon — WebnD IIT Bhubaneswar",
  description: "Code Relay 5.0 is India's premier nationwide hackathon featuring Web2 and Web3 tracks, organized by the Web and Design Society, IIT Bhubaneswar.",
  keywords: ["Code Relay", "Code Relay 5.0", "WebnD", "IIT Bhubaneswar", "Hackathon", "Web2", "Web3", "Blockchain", "Full Stack"],
  openGraph: {
    title: "Code Relay 5.0 — Nationwide Web2 & Web3 Hackathon",
    description: "Two tracks. One relay. Organized by the Web & Design Society, IIT Bhubaneswar.",
    type: "website",
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
      <body className="min-h-full flex flex-col bg-[#F6F0E8] text-[#1E030A] selection:bg-[#991B3D] selection:text-white">
        <RegisterModalProvider>
          <ScrollAnimationProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </ScrollAnimationProvider>
        </RegisterModalProvider>
      </body>
    </html>
  );
}
