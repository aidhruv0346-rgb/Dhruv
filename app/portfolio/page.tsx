import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/ui/CTA";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PortfolioClient } from "@/components/sections/PortfolioClient";
import { getPortfolioRecords, getSiteSettings } from "@/lib/adminStore";

export const metadata: Metadata = {
  title: "Portfolio | Digital Marketing Projects",
  description: "Browse Dhruv Pipaliya's portfolio of SEO campaigns, Meta Ads, WordPress websites, and social media projects with proven results."
};

export default async function PortfolioPage() {
  const [projects, settings] = await Promise.all([
    getPortfolioRecords().then((items) => items.filter((project) => project.status === "published")),
    getSiteSettings()
  ]);
  const featured = projects.find((project) => project.isFeatured) || projects[0];
  const stats = [
    { label: "Projects Completed", value: settings.projectsCompleted, suffix: "+" },
    { label: "Happy Clients", value: settings.happyClients, suffix: "+" },
    { label: "Years Experience", value: settings.yearsExperience, suffix: "+" },
    { label: "Ad Spend Managed", value: settings.adSpendManagedLakhs, suffix: "L+" }
  ];

  return (
    <main className="pt-[72px]">
      <section className="container-x py-24 text-center"><div className="mx-auto flex justify-center"><SectionLabel>My Work</SectionLabel></div><h1 className="font-display text-5xl font-bold text-white md:text-7xl">Work That Speaks for Itself</h1><p className="mx-auto mt-5 max-w-2xl text-lg">Real projects. Real results. Here's what I've delivered for my clients.</p></section>
      <PortfolioClient projects={projects} />
      {featured && <section className="section-pad container-x grid items-center gap-10 lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-bg-card"><Image src={featured.coverImage} alt={featured.title} fill className="object-cover" /></div><div><SectionLabel>Featured Project</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">{featured.title}</h2><p className="mt-5 leading-8">{featured.description.replace(/<[^>]+>/g, " ").slice(0, 360)}</p><div className="mt-8 grid grid-cols-3 gap-4">{(featured.metrics.length ? featured.metrics : [{ label: "Traffic", value: "+145%" }, { label: "Conversions", value: "+60%" }, { label: "Top 10 Keywords", value: "+35" }]).slice(0, 3).map((metric) => <div key={metric.label} className="rounded-xl border border-white/10 bg-bg-card p-4"><b className="font-mono text-3xl text-accent-teal">{metric.value}</b><p className="text-xs">{metric.label}</p></div>)}</div><Button className="mt-8" href={featured.pdfUrl || "/contact"}>{featured.pdfUrl ? "View Portfolio PDF" : "View Full Case Study"}</Button></div></section>}
      <section className="bg-bg-secondary py-12"><div className="container-x grid gap-5 text-center md:grid-cols-4">{stats.map((s) => <div key={s.label}><b className="font-mono text-4xl text-white"><AnimatedCounter to={s.value} suffix={s.suffix} /></b><p>{s.label}</p></div>)}</div></section>
      <CTA title="Want Results Like These for Your Business?" text="Let's create your success story." />
    </main>
  );
}
