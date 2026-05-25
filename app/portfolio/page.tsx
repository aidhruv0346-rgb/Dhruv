import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/ui/CTA";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PortfolioClient } from "@/components/sections/PortfolioClient";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio | Digital Marketing Projects",
  description: "Browse Dhruv Pipaliya's portfolio of SEO campaigns, Meta Ads, WordPress websites, and social media projects with proven results."
};

export default function PortfolioPage() {
  return (
    <main className="pt-[72px]">
      <section className="container-x py-24 text-center"><div className="mx-auto flex justify-center"><SectionLabel>My Work</SectionLabel></div><h1 className="font-display text-5xl font-bold text-white md:text-7xl">Work That Speaks for Itself</h1><p className="mx-auto mt-5 max-w-2xl text-lg">Real projects. Real results. Here's what I've delivered for my clients.</p></section>
      <PortfolioClient />
      <section className="section-pad container-x grid items-center gap-10 lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-bg-card"><Image src="/images/project-1.svg" alt="Featured SEO case study" fill className="object-cover" /></div><div><SectionLabel>Featured Project</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">Surat Retail SEO Sprint</h2><p className="mt-5 leading-8">A local retail brand needed stronger organic visibility, better content architecture, and clearer conversion paths. We rebuilt the keyword map, refreshed core pages, and launched topic clusters tied to buying intent.</p><div className="mt-8 grid grid-cols-3 gap-4">{[["145", "% Traffic"], ["80", "% Conversions"], ["35", "Top 10 Keywords"]].map(([n, l]) => <div key={l} className="rounded-xl border border-white/10 bg-bg-card p-4"><b className="font-mono text-3xl text-accent-teal">+<AnimatedCounter to={Number(n)} /></b><p className="text-xs">{l}</p></div>)}</div><Button className="mt-8" href="/contact">View Full Case Study</Button></div></section>
      <section className="bg-bg-secondary py-12"><div className="container-x grid gap-5 text-center md:grid-cols-4">{stats.map((s) => <div key={s.label}><b className="font-mono text-4xl text-white"><AnimatedCounter to={s.value} suffix={s.suffix} /></b><p>{s.label}</p></div>)}</div></section>
      <CTA title="Want Results Like These for Your Business?" text="Let's create your success story." />
    </main>
  );
}
