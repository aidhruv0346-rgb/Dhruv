"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminCard, AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";

const categories = ["All", "SEO", "Meta Ads", "Social Media", "WordPress", "Blog", "Copywriting", "Marketing Tips", "General"];

export default function AdminBlogPage() {
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => items.filter((item) => (status === "All" || item.status === status.toLowerCase()) && (category === "All" || item.category === category) && item.title.toLowerCase().includes(query.toLowerCase())), [items, status, category, query]);

  async function load() {
    setItems(await fetch("/api/admin/blog").then((res) => res.json()));
  }
  useEffect(() => { load(); }, []);

  async function updatePost(item: any, patch: any) {
    await fetch(`/api/admin/blog/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...item, ...patch }) });
    load();
  }

  async function remove(item: any) {
    if (!confirm(`Are you sure you want to delete '${item.title}'?`)) return;
    await fetch(`/api/admin/blog/${item.id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <AdminTitle title="Blog Posts" action={<Link className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white" href="/admin/blog/new">+ Write New Post</Link>} />
      <AdminCard>
        <div className="mb-5 grid gap-3">
          <input className="rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white" placeholder="Search posts..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            {["All", "Published", "Draft"].map((tab) => <button key={tab} onClick={() => setStatus(tab)} className={`rounded-full px-3 py-2 text-sm font-bold ${status === tab ? "bg-[#2563eb] text-white" : "border border-white/10 text-[#a0a0b8]"}`}>{tab}</button>)}
            {categories.map((cat) => <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-3 py-2 text-sm font-bold ${category === cat ? "bg-white text-[#0a0a0f]" : "border border-white/10 text-[#a0a0b8]"}`}>{cat}</button>)}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#a0a0b8]"><tr><th className="p-3">Cover</th><th>Title</th><th>Category</th><th>Status</th><th>Read</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>{filtered.map((item) => <tr key={item.id} className="border-t border-white/10">
              <td className="p-3"><div className="relative size-14 overflow-hidden rounded-lg bg-white/5"><Image src={item.coverImage || item.featuredImage} alt="" fill className="object-cover" /></div></td>
              <td className="font-bold text-white">{item.title}{item.isFeatured && <span className="ml-2 rounded-full bg-[#2563eb]/20 px-2 py-1 text-[10px] text-[#93c5fd]">Featured</span>}</td>
              <td>{item.category}</td>
              <td><button onClick={() => updatePost(item, { status: item.status === "published" ? "draft" : "published" })} className={`rounded-full px-2 py-1 text-xs font-bold ${item.status === "published" ? "bg-green-500/15 text-green-300" : "bg-yellow-500/15 text-yellow-300"}`}>{item.status}</button></td>
              <td>{item.readTime || 1} min</td>
              <td>{new Date(item.publishedAt).toLocaleDateString()}</td>
              <td className="space-x-3 whitespace-nowrap"><Link className="text-[#93c5fd]" href={`/admin/blog/${item.id}/edit`}>Edit</Link><button className="text-[#93c5fd]" onClick={() => updatePost(item, { isFeatured: true })}>Feature</button><a className="text-[#a0a0b8]" target="_blank" rel="noreferrer" href={`/blog/${item.slug}`}>Preview</a><button className="text-red-400" onClick={() => remove(item)}>Delete</button></td>
            </tr>)}</tbody>
          </table>
        </div>
      </AdminCard>
    </AdminShell>
  );
}
