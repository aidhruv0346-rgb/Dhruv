"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdminCard } from "@/components/admin/AdminCards";

const categories = ["SEO", "Meta Ads", "Social Media", "WordPress", "Copywriting", "Marketing Tips", "General"];

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function BlogForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    featuredImage: initial?.featuredImage || "/images/blog-1.svg",
    category: initial?.category || "SEO",
    tags: Array.isArray(initial?.tags) ? initial.tags.join(", ") : "",
    status: initial?.status || "draft",
    metaTitle: initial?.metaTitle || "",
    metaDesc: initial?.metaDesc || "",
    publishedAt: initial?.publishedAt ? initial.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16)
  });
  const [error, setError] = useState("");
  const readTime = useMemo(() => `${Math.max(1, Math.ceil(form.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220))} min read`, [form.content]);

  function update(key: string, value: string) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !current.slug) next.slug = slugify(value);
      return next;
    });
  }

  async function save(status = form.status) {
    setError("");
    const payload = {
      ...form,
      status,
      tags: form.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean),
      metaTitle: form.metaTitle || form.title,
      metaDesc: form.metaDesc || form.excerpt
    };
    const response = await fetch(initial ? `/api/admin/blog/${initial.id}` : "/api/admin/blog", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setError("Please fill all required fields.");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  const input = "w-full rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white outline-none focus:border-[#2563eb]";
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <AdminCard>
        <div className="grid gap-5">
          <input className="w-full bg-transparent font-heading text-4xl font-extrabold text-white outline-none" required placeholder="Enter your blog post title..." value={form.title} onChange={(e) => update("title", e.target.value)} />
          <label className="text-sm text-[#a0a0b8]">Slug<input className={`${input} mt-2`} value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} /></label>
          <p className="text-xs text-[#737f96]">Preview URL: dhruv-web.vercel.app/blog/{form.slug || "your-post-slug"}</p>
          <textarea className={`${input} min-h-[500px] font-mono`} required placeholder="Write HTML or rich blog content here..." value={form.content} onChange={(e) => update("content", e.target.value)} />
          <label className="text-sm text-[#a0a0b8]">Excerpt ({form.excerpt.length}/200)<textarea className={`${input} mt-2 min-h-24`} maxLength={200} required value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} /></label>
        </div>
      </AdminCard>
      <AdminCard>
        <div className="grid gap-5">
          <label>Status<select className={`${input} mt-2`} value={form.status} onChange={(e) => update("status", e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
          <label>Category<select className={`${input} mt-2`} value={form.category} onChange={(e) => update("category", e.target.value)}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select></label>
          <label>Tags<input className={`${input} mt-2`} value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="SEO, Google, Guide" /></label>
          <label>Featured Image<input className={`${input} mt-2`} value={form.featuredImage} onChange={(e) => update("featuredImage", e.target.value)} /></label>
          <label>Published Date<input className={`${input} mt-2`} type="datetime-local" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} /></label>
          <details className="rounded-lg border border-white/10 p-4" open><summary className="cursor-pointer font-bold">SEO Settings</summary><label className="mt-4 block text-sm">Meta Title ({form.metaTitle.length}/60)<input className={`${input} mt-2`} maxLength={60} value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} /></label><label className="mt-4 block text-sm">Meta Description ({form.metaDesc.length}/160)<textarea className={`${input} mt-2 min-h-20`} maxLength={160} value={form.metaDesc} onChange={(e) => update("metaDesc", e.target.value)} /></label></details>
          <p className="text-sm text-[#a0a0b8]">Reading time: {readTime}</p>
          {error && <p className="text-sm font-bold text-red-400">{error}</p>}
          <div className="sticky bottom-4 grid gap-3 rounded-xl border border-white/10 bg-[#111118]/95 p-3 backdrop-blur">
            <button onClick={() => save("draft")} className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white">Save as Draft</button>
            <button onClick={() => save("published")} className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white">Publish Now</button>
            {form.slug && <a target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-5 py-3 text-center font-bold text-white" href={`/blog/${form.slug}`}>Preview</a>}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
