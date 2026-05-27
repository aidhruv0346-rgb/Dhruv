"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminCard } from "@/components/admin/AdminCards";

const categories = ["SEO", "Meta Ads", "Social Media", "WordPress", "Blog Writing", "Copywriting"];

export function PortfolioForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "SEO",
    clientName: initial?.clientName || "",
    description: initial?.description || "",
    resultStat: initial?.resultStat || "",
    imageUrl: initial?.imageUrl || "/images/project-1.svg",
    projectUrl: initial?.projectUrl || "",
    isFeatured: Boolean(initial?.isFeatured),
    displayOrder: initial?.displayOrder || 0,
    tags: Array.isArray(initial?.tags) ? initial.tags.join(", ") : ""
  });
  const [error, setError] = useState("");

  function update(key: string, value: string | boolean | number) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const payload = { ...form, tags: form.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean) };
    const response = await fetch(initial ? `/api/admin/portfolio/${initial.id}` : "/api/admin/portfolio", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setError("Please fill all required fields.");
      return;
    }
    router.push("/admin/portfolio");
    router.refresh();
  }

  const input = "w-full rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white outline-none focus:border-[#2563eb]";
  return (
    <AdminCard>
      <form onSubmit={save} className="grid gap-5">
        <input className={input} required placeholder="Project Title" value={form.title} onChange={(e) => update("title", e.target.value)} />
        <select className={input} value={form.category} onChange={(e) => update("category", e.target.value)}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select>
        <input className={input} placeholder="Client Name" value={form.clientName} onChange={(e) => update("clientName", e.target.value)} />
        <textarea className={`${input} min-h-32`} required placeholder="Project Description" value={form.description} onChange={(e) => update("description", e.target.value)} />
        <input className={input} required placeholder="Result / Achievement" value={form.resultStat} onChange={(e) => update("resultStat", e.target.value)} />
        <input className={input} required placeholder="Thumbnail Image URL" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} />
        <input className={input} placeholder="Project URL" value={form.projectUrl} onChange={(e) => update("projectUrl", e.target.value)} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} /> Is Featured?</label>
        <input className={input} type="number" placeholder="Display Order" value={form.displayOrder} onChange={(e) => update("displayOrder", Number(e.target.value))} />
        <input className={input} placeholder="Tags, comma separated" value={form.tags} onChange={(e) => update("tags", e.target.value)} />
        {error && <p className="text-sm font-bold text-red-400">{error}</p>}
        <div className="flex gap-3"><button className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white">Save Project</button><button type="button" onClick={() => router.push("/admin/portfolio")} className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white">Cancel</button></div>
      </form>
    </AdminCard>
  );
}
