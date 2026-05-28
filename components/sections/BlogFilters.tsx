"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";

const categories = ["All", "SEO", "Meta Ads", "Social Media", "WordPress", "Blog", "Copywriting", "Marketing Tips"];

type BlogCard = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  author: string;
};

export function BlogFilters({ posts }: { posts: BlogCard[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const visiblePosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="container-x py-16">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const active = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 font-bold transition ${
                active
                  ? "bg-accent-violet text-white shadow-glow"
                  : "border border-white/10 text-ink-body hover:border-accent-teal hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {visiblePosts.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visiblePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-hover overflow-hidden rounded-2xl border border-white/10 bg-bg-card">
              <div className="relative aspect-[4/3]">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <Badge>{post.category}</Badge>
                <h3 className="mt-4 line-clamp-2 font-heading text-xl font-bold text-white">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt}</p>
                <p className="mt-5 font-mono text-xs text-ink-muted">{post.author} | {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} | {post.readTime} min read -&gt;</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-bg-card p-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-white">No articles in {activeCategory} yet</h2>
          <p className="mt-2 text-ink-body">Try another category or check back soon for new insights.</p>
        </div>
      )}
    </section>
  );
}
