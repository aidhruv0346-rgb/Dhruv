"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdminCard } from "@/components/admin/AdminCards";

const categories = ["SEO", "Meta Ads", "Social Media", "WordPress", "Blog", "Copywriting", "Marketing Tips", "General"];

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getText(html: string) {
  return html.replace(/<[^>]+>/g, " ");
}

export function BlogForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    body: initial?.body || initial?.content || "",
    coverImage: initial?.coverImage || initial?.featuredImage || "/images/blog-1.svg",
    category: initial?.category || "SEO",
    tags: Array.isArray(initial?.tags) ? initial.tags.join(", ") : "",
    status: initial?.status || "draft",
    isFeatured: Boolean(initial?.isFeatured),
    readTime: initial?.readTime || "",
    metaTitle: initial?.metaTitle || "",
    metaDescription: initial?.metaDescription || initial?.metaDesc || "",
    publishedAt: initial?.publishedAt ? initial.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16)
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const calculatedReadTime = useMemo(() => Math.max(1, Math.ceil(getText(form.body).split(/\s+/).filter(Boolean).length / 220)), [form.body]);
  const toc = useMemo(() => {
    const headings: string[] = [];
    const regex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(form.body))) headings.push(match[1].replace(/<[^>]+>/g, ""));
    return headings;
  }, [form.body]);

  function update(key: string, value: string | boolean) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !current.slug) next.slug = slugify(String(value));
      if (key === "excerpt" && !current.metaDescription) next.metaDescription = String(value).slice(0, 160);
      if (key === "title" && !current.metaTitle) next.metaTitle = String(value).slice(0, 60);
      return next;
    });
  }

  async function upload(file: File) {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    setUploading(false);
    if (!response.ok) {
      setError("Upload failed. Please use a smaller JPG, PNG, WebP, GIF, or SVG file.");
      return;
    }
    const result = await response.json();
    update("coverImage", result.url);
  }

  async function save(status = form.status) {
    setError("");
    const payload = {
      ...form,
      status,
      tags: form.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean),
      readTime: Number(form.readTime || calculatedReadTime),
      metaTitle: form.metaTitle || form.title,
      metaDescription: form.metaDescription || form.excerpt,
      content: form.body,
      featuredImage: form.coverImage
    };
    const response = await fetch(initial ? `/api/admin/blog/${initial.id}` : "/api/admin/blog", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setError("Please fill title, excerpt, category, cover image, and body content.");
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
          <textarea className={`${input} min-h-[460px] font-mono leading-7`} required placeholder="<h2>Your heading</h2><p>Write rich HTML content here...</p>" value={form.body} onChange={(e) => update("body", e.target.value)} />
          <label className="text-sm text-[#a0a0b8]">Excerpt ({form.excerpt.length}/200)<textarea className={`${input} mt-2 min-h-24`} maxLength={200} required value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} /></label>
        </div>
      </AdminCard>
      <AdminCard>
        <div className="grid gap-5">
          <label>Status<select className={`${input} mt-2`} value={form.status} onChange={(e) => update("status", e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
          <label>Category<select className={`${input} mt-2`} value={form.category} onChange={(e) => update("category", e.target.value)}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select></label>
          <label>Tags<input className={`${input} mt-2`} value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="SEO, Google, Guide" /></label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} /> Set as featured article</label>
          <div>
            <label className="text-sm text-[#a0a0b8]">Cover Image URL<input className={`${input} mt-2`} required value={form.coverImage} onChange={(e) => update("coverImage", e.target.value)} /></label>
            <input className="mt-3 text-sm" type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} />
            {uploading && <p className="mt-2 text-xs text-[#93c5fd]">Uploading...</p>}
            {form.coverImage && <div className="relative mt-3 aspect-video overflow-hidden rounded-lg border border-white/10"><Image src={form.coverImage} alt="Cover preview" fill className="object-cover" /></div>}
          </div>
          <label>Published Date<input className={`${input} mt-2`} type="datetime-local" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} /></label>
          <label>Reading Time<input className={`${input} mt-2`} type="number" min="1" placeholder={`${calculatedReadTime}`} value={form.readTime} onChange={(e) => update("readTime", e.target.value)} /></label>
          <details className="rounded-lg border border-white/10 p-4" open>
            <summary className="cursor-pointer font-bold">SEO Settings</summary>
            <label className="mt-4 block text-sm">Meta Title ({form.metaTitle.length}/60)<input className={`${input} mt-2`} maxLength={60} value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} /></label>
            <label className="mt-4 block text-sm">Meta Description ({form.metaDescription.length}/160)<textarea className={`${input} mt-2 min-h-20`} maxLength={160} value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} /></label>
            <div className="mt-4 rounded-lg bg-white p-3 text-sm text-[#202124]"><p className="text-[#1a0dab]">{form.metaTitle || form.title || "Search result title"}</p><p className="text-[#4d5156]">{form.metaDescription || form.excerpt || "Search result description preview."}</p></div>
          </details>
          <div className="rounded-lg border border-white/10 p-4">
            <p className="font-bold">Table of Contents</p>
            <div className="mt-3 grid gap-2 text-sm text-[#a0a0b8]">{toc.length ? toc.map((item) => <span key={item}>{item}</span>) : <span>Add H2/H3 headings in the body to generate TOC.</span>}</div>
          </div>
          {error && <p className="text-sm font-bold text-red-400">{error}</p>}
          <div className="sticky bottom-4 grid gap-3 rounded-xl border border-white/10 bg-[#111118]/95 p-3 backdrop-blur">
            <button type="button" onClick={() => save("draft")} className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white">Save Draft</button>
            <button type="button" onClick={() => save("published")} className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white">Publish</button>
            {form.slug && <a target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-5 py-3 text-center font-bold text-white" href={`/blog/${form.slug}`}>Preview on Website</a>}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
