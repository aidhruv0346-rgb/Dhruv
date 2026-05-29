import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://dhruvpipaliya.com"),
  title: {
    default: "Dhruv Pipaliya | Digital Marketer",
    template: "%s | Dhruv Pipaliya"
  },
  description: "Dhruv Pipaliya is a results-driven digital marketer in Surat, India offering SEO, Social Media, Meta Ads, WordPress and Copywriting services.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
