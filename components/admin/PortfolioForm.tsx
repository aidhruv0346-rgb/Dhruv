"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminCard } from "@/components/admin/AdminCards";

const categories = ["SEO", "Meta Ads", "Social Media", "WordPress", "Blog", "Copywriting"];
type Metric = { label: string; value: string };
type GalleryItem = { url: string; caption: string };
type Technology = { name: string; category: string; icon?: string };
type TimelineItem = { label: string; value: string };

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function PortfolioForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    category: initial?.category || "SEO",
    clientName: initial?.clientName || "",
    excerpt: initial?.excerpt || initial?.resultStat || "",
    description: initial?.description || "",
    coverImage: initial?.coverImage || initial?.imageUrl || "/images/project-1.svg",
    pdfUrl: initial?.pdfUrl || "",
    projectUrl: initial?.projectUrl || "",
    year: initial?.year || new Date().getFullYear(),
    duration: initial?.duration || "",
    teamSize: initial?.teamSize || "",
    myRole: initial?.myRole || "",
    isFeatured: Boolean(initial?.isFeatured),
    status: initial?.status || "draft",
    order: initial?.order ?? initial?.displayOrder ?? 0,
    metrics: (Array.isArray(initial?.metrics) && initial.metrics.length ? initial.metrics : [{ label: "Traffic", value: "+145%" }]) as Metric[],
    gallery: (Array.isArray(initial?.gallery) && initial.gallery.length ? initial.gallery : [{ url: initial?.coverImage || initial?.imageUrl || "/images/project-1.svg", caption: "Project overview" }]) as GalleryItem[],
    technologies: (Array.isArray(initial?.technologies) && initial.technologies.length ? initial.technologies : [{ name: "SEO", category: "Marketing", icon: "" }]) as Technology[],
    features: Array.isArray(initial?.features) ? initial.features.join("\n") : "Strategy planning\nCreative execution\nPerformance tracking\nOptimization reporting",
    timeline: (Array.isArray(initial?.timeline) && initial.timeline.length ? initial.timeline : [{ label: "Discovery", value: "Goals and current performance review" }]) as TimelineItem[],
    tags: Array.isArray(initial?.tags) ? initial.tags.join(", ") : "",
    metaTitle: initial?.metaTitle || "",
    metaDescription: initial?.metaDescription || ""
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState("");

  function update(key: string, value: string | boolean | number | Metric[] | GalleryItem[] | Technology[] | TimelineItem[]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !current.slug) next.slug = slugify(String(value));
      if (key === "excerpt" && !current.metaDescription) next.metaDescription = String(value).slice(0, 160);
      if (key === "title" && !current.metaTitle) next.metaTitle = String(value).slice(0, 60);
      return next;
    });
  }

  function updateMetric(index: number, key: "label" | "value", value: string) {
    const metrics = form.metrics.map((metric: Metric, metricIndex: number) => metricIndex === index ? { ...metric, [key]: value } : metric);
    update("metrics", metrics);
  }

  function updateGallery(index: number, key: keyof GalleryItem, value: string) {
    update("gallery", form.gallery.map((item: GalleryItem, itemIndex: number) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  function updateTechnology(index: number, key: keyof Technology, value: string) {
    update("technologies", form.technologies.map((item: Technology, itemIndex: number) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  function updateTimeline(index: number, key: keyof TimelineItem, value: string) {
    update("timeline", form.timeline.map((item: TimelineItem, itemIndex: number) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  async function upload(file: File, field: "coverImage" | "pdfUrl") {
    setUploading(field);
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    setUploading("");
    if (!response.ok) {
      setError(field === "pdfUrl" ? "PDF upload needs a supported upload route; paste a PDF URL for now." : "Image upload failed.");
      return;
    }
    const result = await response.json();
    update(field, result.url);
  }

  async function save(event: React.SyntheticEvent, status = form.status) {
    event.preventDefault();
    setError("");
    const payload = {
      ...form,
      status,
      resultStat: form.excerpt,
      imageUrl: form.coverImage,
      displayOrder: Number(form.order),
      tags: form.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean),
      metrics: form.metrics.filter((metric: Metric) => metric.label && metric.value),
      gallery: form.gallery.filter((item: GalleryItem) => item.url),
      technologies: form.technologies.filter((item: Technology) => item.name),
      features: form.features.split("\n").map((item: string) => item.trim()).filter(Boolean),
      timeline: form.timeline.filter((item: TimelineItem) => item.label && item.value),
      metaTitle: form.metaTitle || form.title,
      metaDescription: form.metaDescription || form.excerpt
    };
    const response = await fetch(initial ? `/api/admin/portfolio/${initial.id}` : "/api/admin/portfolio", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setError("Please fill title, category, result stat, cover image, and description.");
      return;
    }
    router.push("/admin/portfolio");
    router.refresh();
  }

  const input = "w-full rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white outline-none focus:border-[#2563eb]";

  return (
    <AdminCard>
      <form onSubmit={(event) => save(event)} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <input className={input} required placeholder="Project Title" value={form.title} onChange={(e) => update("title", e.target.value)} />
          <label className="text-sm text-[#a0a0b8]">Slug<input className={`${input} mt-2`} value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} /></label>
          <select className={input} value={form.category} onChange={(e) => update("category", e.target.value)}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select>
          <input className={input} placeholder="Client Name" value={form.clientName} onChange={(e) => update("clientName", e.target.value)} />
          <div className="grid gap-3 md:grid-cols-4">
            <input className={input} type="number" placeholder="Year" value={form.year} onChange={(e) => update("year", Number(e.target.value))} />
            <input className={input} placeholder="Duration" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
            <input className={input} placeholder="Team Size" value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)} />
            <input className={input} placeholder="My Role" value={form.myRole} onChange={(e) => update("myRole", e.target.value)} />
          </div>
          <input className={input} required placeholder="Excerpt / Result Stat" value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
          <textarea className={`${input} min-h-[360px] font-mono leading-7`} required placeholder="<h2>Challenge</h2><p>Write case study details...</p>" value={form.description} onChange={(e) => update("description", e.target.value)} />
          <div className="rounded-lg border border-white/10 p-4">
            <div className="flex items-center justify-between gap-3"><p className="font-bold text-white">Metrics</p><button type="button" onClick={() => update("metrics", [...form.metrics, { label: "", value: "" }])} className="rounded-lg bg-[#2563eb] px-3 py-2 text-xs font-bold text-white">+ Add Metric</button></div>
            <div className="mt-4 grid gap-3">
              {form.metrics.map((metric, index) => (
                <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <input className={input} placeholder="Label" value={metric.label} onChange={(e) => updateMetric(index, "label", e.target.value)} />
                  <input className={input} placeholder="Value" value={metric.value} onChange={(e) => updateMetric(index, "value", e.target.value)} />
                  <button type="button" onClick={() => update("metrics", form.metrics.filter((_: Metric, metricIndex: number) => metricIndex !== index))} className="rounded-lg border border-white/10 px-3 text-red-300">Remove</button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <div className="flex items-center justify-between gap-3"><p className="font-bold text-white">Gallery</p><button type="button" onClick={() => update("gallery", [...form.gallery, { url: "", caption: "" }])} className="rounded-lg bg-[#2563eb] px-3 py-2 text-xs font-bold text-white">+ Add Image</button></div>
            <div className="mt-4 grid gap-3">
              {form.gallery.map((item, index) => (
                <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <input className={input} placeholder="Image URL" value={item.url} onChange={(e) => updateGallery(index, "url", e.target.value)} />
                  <input className={input} placeholder="Caption" value={item.caption} onChange={(e) => updateGallery(index, "caption", e.target.value)} />
                  <button type="button" onClick={() => update("gallery", form.gallery.filter((_: GalleryItem, itemIndex: number) => itemIndex !== index))} className="rounded-lg border border-white/10 px-3 text-red-300">Remove</button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <div className="flex items-center justify-between gap-3"><p className="font-bold text-white">Technologies / Tools</p><button type="button" onClick={() => update("technologies", [...form.technologies, { name: "", category: "Marketing", icon: "" }])} className="rounded-lg bg-[#2563eb] px-3 py-2 text-xs font-bold text-white">+ Add Tool</button></div>
            <div className="mt-4 grid gap-3">
              {form.technologies.map((item, index) => (
                <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                  <input className={input} placeholder="Name" value={item.name} onChange={(e) => updateTechnology(index, "name", e.target.value)} />
                  <input className={input} placeholder="Category" value={item.category} onChange={(e) => updateTechnology(index, "category", e.target.value)} />
                  <input className={input} placeholder="Icon URL optional" value={item.icon || ""} onChange={(e) => updateTechnology(index, "icon", e.target.value)} />
                  <button type="button" onClick={() => update("technologies", form.technologies.filter((_: Technology, itemIndex: number) => itemIndex !== index))} className="rounded-lg border border-white/10 px-3 text-red-300">Remove</button>
                </div>
              ))}
            </div>
          </div>
          <label className="text-sm text-[#a0a0b8]">Key Features, one per line<textarea className={`${input} mt-2 min-h-32`} value={form.features} onChange={(e) => update("features", e.target.value)} /></label>
          <div className="rounded-lg border border-white/10 p-4">
            <div className="flex items-center justify-between gap-3"><p className="font-bold text-white">Timeline</p><button type="button" onClick={() => update("timeline", [...form.timeline, { label: "", value: "" }])} className="rounded-lg bg-[#2563eb] px-3 py-2 text-xs font-bold text-white">+ Add Step</button></div>
            <div className="mt-4 grid gap-3">
              {form.timeline.map((item, index) => (
                <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <input className={input} placeholder="Label" value={item.label} onChange={(e) => updateTimeline(index, "label", e.target.value)} />
                  <input className={input} placeholder="Value" value={item.value} onChange={(e) => updateTimeline(index, "value", e.target.value)} />
                  <button type="button" onClick={() => update("timeline", form.timeline.filter((_: TimelineItem, itemIndex: number) => itemIndex !== index))} className="rounded-lg border border-white/10 px-3 text-red-300">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid h-fit gap-5">
          <label>Status<select className={`${input} mt-2`} value={form.status} onChange={(e) => update("status", e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} /> Set as featured project</label>
          <label>Display Order<input className={`${input} mt-2`} type="number" value={form.order} onChange={(e) => update("order", Number(e.target.value))} /></label>
          <div>
            <label className="text-sm text-[#a0a0b8]">Cover Image URL<input className={`${input} mt-2`} required value={form.coverImage} onChange={(e) => update("coverImage", e.target.value)} /></label>
            <input className="mt-3 text-sm" type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], "coverImage")} />
            {uploading === "coverImage" && <p className="mt-2 text-xs text-[#93c5fd]">Uploading...</p>}
            {form.coverImage && <div className="relative mt-3 aspect-video overflow-hidden rounded-lg border border-white/10"><Image src={form.coverImage} alt="Project preview" fill className="object-cover" /></div>}
          </div>
          <div>
            <input className={input} placeholder="PDF URL (optional)" value={form.pdfUrl} onChange={(e) => update("pdfUrl", e.target.value)} />
            <input className="mt-3 text-sm" type="file" accept="application/pdf" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], "pdfUrl")} />
            {uploading === "pdfUrl" && <p className="mt-2 text-xs text-[#93c5fd]">Uploading PDF...</p>}
          </div>
          <input className={input} placeholder="Project URL (optional)" value={form.projectUrl} onChange={(e) => update("projectUrl", e.target.value)} />
          <input className={input} placeholder="Tags, comma separated" value={form.tags} onChange={(e) => update("tags", e.target.value)} />
          <details className="rounded-lg border border-white/10 p-4" open><summary className="cursor-pointer font-bold">SEO Settings</summary><label className="mt-4 block text-sm">Meta Title<input className={`${input} mt-2`} maxLength={60} value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} /></label><label className="mt-4 block text-sm">Meta Description<textarea className={`${input} mt-2 min-h-20`} maxLength={160} value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} /></label></details>
          {error && <p className="text-sm font-bold text-red-400">{error}</p>}
          <div className="grid gap-3 rounded-xl border border-white/10 bg-[#111118]/95 p-3">
            <button type="button" onClick={(event) => save(event, "draft")} className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white">Save Draft</button>
            <button type="button" onClick={(event) => save(event, "published")} className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white">Publish</button>
            <button type="button" onClick={() => router.push("/admin/portfolio")} className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white">Cancel</button>
          </div>
        </div>
      </form>
    </AdminCard>
  );
}
