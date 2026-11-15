import type { Metadata, Viewport } from "next";
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
import JsonLd from "@/components/seo/JsonLd";
import { KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, organizationLd, websiteLd } from "@/data/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Code Relay 5.0 | National Hackathon at IIT Bhubaneswar · Web2 × Web3",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: "WebnD, IIT Bhubaneswar", url: SITE_URL }],
  creator: "WebnD, IIT Bhubaneswar",
  publisher: "WebnD, IIT Bhubaneswar",
  category: "Hackathon",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: "/assets/cr_logo.png" }, { url: "/icon.png" }, { url: "/favicon.ico" }],
    apple: [{ url: "/assets/cr_logo.png" }, { url: "/apple-icon.png" }],
    shortcut: "/assets/cr_logo.png",
  },
  openGraph: {
    title: "Code Relay 5.0: National Hackathon at IIT Bhubaneswar",
    description: "Web2 × Web3, four tracks, ₹2.5 lakh+ in prizes and a 30-hour final at IIT Bhubaneswar. Round 1 is free. Registrations open on Unstop.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Relay 5.0: National Hackathon at IIT Bhubaneswar",
    description: "Web2 × Web3, four tracks, ₹2.5 lakh+ in prizes, a 30-hour final. Round 1 is free. Register on Unstop.",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#991B3D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${unbounded.variable} ${grotesk.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="grain min-h-full flex flex-col bg-[var(--cream)] text-[var(--ink)]">
        <JsonLd data={[organizationLd, websiteLd]} />
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
