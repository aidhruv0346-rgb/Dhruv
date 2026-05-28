import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getBlogRecords } from "@/lib/adminStore";

export const revalidate = 60;

async function getPost(slug: string) {
  const now = new Date().toISOString();
  return (await getBlogRecords()).find((item) => item.slug === slug && item.status === "published" && item.publishedAt <= now);
}

export async function generateStaticParams() {
  const now = new Date().toISOString();
  return (await getBlogRecords()).filter((post) => post.status === "published" && post.publishedAt <= now).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return { title: post?.metaTitle || post?.title || "Blog Post", description: post?.metaDescription || post?.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <main className="pt-[72px]">
      <div className="fixed left-0 top-0 z-[70] h-1 w-1/2 bg-accent-violet" />
      <article className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="font-mono text-sm text-ink-muted">Home &gt; Blog &gt; {post.category}</p>
          <div className="mt-6 flex gap-3"><Badge>{post.category}</Badge><Badge color="teal">{post.readTime} min read</Badge></div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-white md:text-7xl">{post.title}</h1>
          <p className="mt-4 font-mono text-sm text-ink-muted">{post.author} | {date} | Updated {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10"><Image src={post.coverImage} alt={post.title} fill className="object-cover" /></div>
          <div className="prose prose-invert mt-10 max-w-none prose-p:text-ink-body prose-p:leading-8 prose-h2:font-heading prose-h2:text-white" dangerouslySetInnerHTML={{ __html: post.body }} />
          <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-bg-card p-6"><h3 className="font-heading text-2xl font-bold text-white">About Dhruv</h3><p className="mt-3">Dhruv Pipaliya is a digital marketer from Surat helping brands grow through SEO, Meta Ads, content, and WordPress.</p></div>
        </div>
        <aside className="h-fit rounded-2xl border border-white/10 bg-bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-heading text-xl font-bold text-white">Table of Contents</h2>
          <div className="mt-4 grid gap-3 text-sm">{post.tableOfContents.length ? post.tableOfContents.map((item) => <a key={item.id} href={`#${item.id}`}>{item.text}</a>) : <span className="text-ink-muted">No headings yet.</span>}</div>
          <Button className="mt-8 w-full" href="/contact">Work With Me</Button>
        </aside>
      </article>
    </main>
  );
}
