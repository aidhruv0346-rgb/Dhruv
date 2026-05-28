import type { Metadata } from "next";
import { HomeSections } from "@/components/sections/HomeSections";
import { getPortfolioRecords } from "@/lib/adminStore";

export const metadata: Metadata = {
  title: "Dhruv Pipaliya | Digital Marketer — SEO, Meta Ads & Social Media",
  description: "Dhruv Pipaliya is a results-driven digital marketer from Surat offering SEO, Social Media Management, Meta Ads, Blog Writing, WordPress Development, and Content Copywriting services."
};

export default async function HomePage() {
  const allProjects = (await getPortfolioRecords()).filter((project) => project.status === "published");
  const featured = allProjects.filter((project) => project.isFeatured);
  const projects = (featured.length ? featured : allProjects).slice(0, 3).map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    excerpt: project.excerpt,
    coverImage: project.coverImage,
    image: project.coverImage,
    stat: project.excerpt
  }));
  return <HomeSections projects={projects} />;
}
