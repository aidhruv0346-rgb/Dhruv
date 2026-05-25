import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { posts } from "@/lib/data";

export const revalidate = 3600;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((item) => item.slug === params.slug);
  return { title: post?.title || "Blog Post", description: post?.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  return (
    <main className="pt-[72px]">
      <div className="fixed left-0 top-0 z-[70] h-1 w-1/2 bg-accent-violet" />
      <article className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="font-mono text-sm text-ink-muted">Home &gt; Blog &gt; {post.category}</p>
          <div className="mt-6 flex gap-3"><Badge>{post.category}</Badge><Badge color="teal">{post.readTime}</Badge></div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-white md:text-7xl">{post.title}</h1>
          <p className="mt-4 font-mono text-sm text-ink-muted">Dhruv Pipaliya | {post.date} | Updated May 23, 2026</p>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
          <div className="prose prose-invert mt-10 max-w-none prose-p:text-ink-body prose-p:leading-8 prose-h2:font-heading prose-h2:text-white">
            <h2>Start With Search Intent</h2><p>{post.excerpt} The best marketing work starts with understanding what your audience is trying to solve and how close they are to taking action.</p>
            <h2>Build a Practical System</h2><p>Use a clear calendar, measurable goals, and tight feedback loops. That gives every blog, ad, landing page, and social post a job to do.</p>
            <blockquote>Tip: measure decisions, not vanity metrics. Traffic is useful when it moves the business forward.</blockquote>
            <h2>Optimize Weekly</h2><p>Review the strongest signals each week, then refine the message, creative, offer, and page experience.</p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-bg-card p-6"><h3 className="font-heading text-2xl font-bold text-white">About Dhruv</h3><p className="mt-3">Dhruv Pipaliya is a digital marketer from Surat helping brands grow through SEO, Meta Ads, content, and WordPress.</p></div>
        </div>
        <aside className="h-fit rounded-2xl border border-white/10 bg-bg-card p-6 lg:sticky lg:top-24"><h2 className="font-heading text-xl font-bold text-white">Table of Contents</h2><div className="mt-4 grid gap-3 text-sm"><a href="#">Start With Search Intent</a><a href="#">Build a Practical System</a><a href="#">Optimize Weekly</a></div><Button className="mt-8 w-full" href="/contact">Work With Me</Button></aside>
      </article>
    </main>
  );
}
