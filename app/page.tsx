import type { Metadata } from "next";
import { HomeSections } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Dhruv Pipaliya | Digital Marketer — SEO, Meta Ads & Social Media",
  description: "Dhruv Pipaliya is a results-driven digital marketer from Surat offering SEO, Social Media Management, Meta Ads, Blog Writing, WordPress Development, and Content Copywriting services."
};

export default function HomePage() {
  return <HomeSections />;
}
