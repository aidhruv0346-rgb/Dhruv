import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BlogFilters } from "@/components/sections/BlogFilters";
import { getBlogRecords } from "@/lib/adminStore";

export const metadata: Metadata = {
  title: "Digital Marketing Blog - SEO, Meta Ads Tips",
  description: "Read expert insights on SEO, Meta Ads, Social Media Marketing, and WordPress from digital marketer Dhruv Pipaliya."
};

export default async function BlogPage() {
  const now = new Date().toISOString();
  const posts = (await getBlogRecords()).filter((post) => post.status === "published" && post.publishedAt <= now);
  const featured = posts.find((post) => post.isFeatured) || posts[0];

  return (
    <main className="pt-[72px]">
      <section className="container-x py-24 text-center">
        <div className="mx-auto flex justify-center">
          <SectionLabel>Blog</SectionLabel>
        </div>
        <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Digital Marketing Insights</h1>
        <p className="mx-auto mt-5 max-w-2xl">Tips, strategies, and insights on SEO, Meta Ads, Social Media and more.</p>
        <input className="mt-8 h-14 w-full max-w-xl rounded-xl border border-white/10 bg-bg-card px-5 outline-none focus:border-accent-violet" placeholder="Search articles..." />
      </section>

      {featured && (
        <section className="container-x grid overflow-hidden rounded-2xl border border-white/10 bg-bg-card md:grid-cols-[2fr_1fr]">
          <div className="relative min-h-80">
            <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
          </div>
          <div className="p-8">
            <Badge color="coral">Featured</Badge>
            <h2 className="mt-5 font-heading text-3xl font-bold text-white">{featured.title}</h2>
            <p className="mt-4 leading-7">{featured.excerpt}</p>
            <p className="mt-5 font-mono text-xs text-ink-muted">{new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} | {featured.readTime} min read | {featured.category}</p>
            <Button className="mt-7" href={`/blog/${featured.slug}`}>Read Article</Button>
          </div>
        </section>
      )}

      <BlogFilters posts={posts} />

      <section className="container-x pb-20">
        <div className="rounded-2xl border border-white/10 bg-bg-secondary p-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-white">Stay Updated with Latest Insights</h2>
          <p className="mt-3">Join 500+ marketers getting free weekly tips in their inbox.</p>
          <form className="mx-auto mt-7 flex max-w-lg gap-3">
            <input className="min-w-0 flex-1 rounded-lg border border-white/10 bg-bg-card px-4" placeholder="Email address" />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="mt-3 text-xs text-ink-muted">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
}
