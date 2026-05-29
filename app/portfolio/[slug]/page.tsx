import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/ui/CTA";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPortfolioRecords } from "@/lib/adminStore";

export const revalidate = 60;

async function getProject(slug: string) {
  return (await getPortfolioRecords()).find((item) => item.slug === slug && item.status === "published");
}

export async function generateStaticParams() {
  return (await getPortfolioRecords()).filter((project) => project.status === "published").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  return {
    title: project?.metaTitle || project?.title || "Portfolio Project",
    description: project?.metaDescription || project?.excerpt,
    openGraph: {
      title: project?.title,
      description: project?.excerpt,
      images: project?.coverImage ? [project.coverImage] : undefined
    }
  };
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const projects = (await getPortfolioRecords()).filter((project) => project.status === "published");
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();
  const related = projects.filter((item) => item.slug !== project.slug && item.category === project.category).slice(0, 3);
  const fallbackRelated = related.length ? related : projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    image: project.coverImage,
    author: { "@type": "Person", name: "Dhruv Pipaliya" },
    datePublished: project.createdAt
  };

  return (
    <main className="pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
        <Image src={project.coverImage} alt={project.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container-x relative z-10 flex min-h-[420px] flex-col items-center justify-center py-20 text-center md:min-h-[520px]">
          <nav className="mb-8 font-mono text-xs text-white/70"><Link href="/">Home</Link> / <Link href="/portfolio">Portfolio</Link> / <span>{project.title}</span></nav>
          <Badge>{project.category}</Badge>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-tight text-white md:text-7xl">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">{project.excerpt}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 font-mono text-xs text-white/70"><span>{project.year}</span><span>|</span><span>{project.duration}</span><span>|</span><span>{project.category}</span></div>
        </div>
      </section>

      <section className="section-pad container-x grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <SectionLabel>Project Overview</SectionLabel>
          <h2 className="font-heading text-4xl font-bold text-white">Challenge, Strategy, and Execution</h2>
          <div className="prose prose-invert mt-6 max-w-none prose-p:text-ink-body prose-p:leading-8 prose-h2:text-white" dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[["Client", project.clientName || "Confidential"], ["Duration", project.duration], ["Team Size", project.teamSize], ["My Role", project.myRole], ["Status", "Completed"], ["Year", String(project.year)]].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-bg-card p-5"><p className="font-mono text-xs uppercase tracking-[.2em] text-ink-muted">{label}</p><b className="mt-2 block text-xl text-white">{value}</b></div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-bg-secondary">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center"><SectionLabel>Gallery</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">Project Snapshots</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.gallery.map((item, index) => (
              <figure key={`${item.url}-${index}`} className={`${index === 2 ? "md:col-span-2" : ""} group overflow-hidden rounded-2xl border border-white/10 bg-bg-card`}>
                <div className="relative aspect-[16/10]"><Image src={item.url} alt={item.caption || project.title} fill className="object-cover transition duration-300 group-hover:scale-105" /></div>
                {item.caption && <figcaption className="p-4 text-sm text-ink-body">{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container-x">
        <div className="mx-auto max-w-2xl text-center"><SectionLabel>Tools</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">Technologies and Platforms Used</h2></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {project.technologies.map((tool) => <div key={tool.name} className="rounded-2xl border border-white/10 bg-bg-card p-6 text-center"><div className="mx-auto grid size-12 place-items-center rounded-full bg-[#2563eb]/15 font-heading text-xl font-bold text-[#93c5fd]">{tool.name[0]}</div><h3 className="mt-4 font-heading text-xl font-bold text-white">{tool.name}</h3><p className="mt-2 text-sm text-ink-muted">{tool.category}</p></div>)}
        </div>
      </section>

      <section className="section-pad bg-bg-secondary">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div><SectionLabel>Key Features</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">What Was Delivered</h2><div className="mt-8 grid gap-3">{project.features.map((feature) => <div key={feature} className="rounded-xl border border-white/10 bg-bg-card p-4 font-bold text-white">{feature}</div>)}</div></div>
          <div><SectionLabel>Timeline</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">How the Project Moved</h2><div className="mt-8 grid gap-4">{project.timeline.map((item, index) => <div key={`${item.label}-${index}`} className="rounded-xl border border-white/10 bg-bg-card p-5"><p className="font-mono text-xs text-[#93c5fd]">0{index + 1}</p><h3 className="mt-2 font-heading text-xl font-bold text-white">{item.label}</h3><p className="mt-2 text-sm leading-6 text-ink-body">{item.value}</p></div>)}</div></div>
        </div>
      </section>

      <section className="section-pad container-x">
        <div className="mx-auto max-w-2xl text-center"><SectionLabel>Impact</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">Results and Performance</h2></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {project.metrics.map((metric) => <div key={metric.label} className="rounded-2xl border border-white/10 bg-bg-card p-6 text-center"><div className="font-mono text-4xl font-bold text-[#93c5fd]">{metric.value}</div><p className="mt-3 text-sm text-ink-body">{metric.label}</p></div>)}
        </div>
        {(project.pdfUrl || project.projectUrl) && <div className="mt-10 flex flex-wrap justify-center gap-4">{project.pdfUrl && <Button href={project.pdfUrl}>Open PDF</Button>}{project.projectUrl && <Button href={project.projectUrl} variant="outline">Visit Project</Button>}</div>}
      </section>

      <section className="section-pad bg-bg-secondary">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center"><SectionLabel>Related</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">Related Projects</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{fallbackRelated.map((item) => <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-bg-card"><div className="relative aspect-[4/3]"><Image src={item.coverImage} alt={item.title} fill className="object-cover transition group-hover:scale-105" /></div><div className="p-5"><Badge>{item.category}</Badge><h3 className="mt-3 font-heading text-xl font-bold text-white">{item.title}</h3><p className="mt-2 text-sm text-ink-body">{item.excerpt}</p></div></Link>)}</div>
        </div>
      </section>

      <CTA title="Interested in This Type of Work?" text="Let's create a focused growth project for your business." />
    </main>
  );
}
