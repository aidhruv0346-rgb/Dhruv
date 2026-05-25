import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://dhruvpipaliya.com"),
  title: {
    default: "Dhruv Pipaliya | Digital Marketer",
    template: "%s | Dhruv Pipaliya"
  },
  description: "Dhruv Pipaliya is a results-driven digital marketer in Surat, India offering SEO, Social Media, Meta Ads, WordPress and Copywriting services.",
  openGraph: {
    title: "Dhruv Pipaliya | Digital Marketer",
    description: "Growth-driven digital marketing that delivers results.",
    url: "https://dhruvpipaliya.com",
    siteName: "Dhruv Pipaliya",
    images: ["/images/og.svg"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Pipaliya | Digital Marketer",
    description: "SEO, Meta Ads, Social Media, WordPress and Copywriting."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
