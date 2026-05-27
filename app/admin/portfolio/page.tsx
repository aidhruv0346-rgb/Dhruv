"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminCard, AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";

const categories = ["All", "SEO", "Meta Ads", "Social Media", "WordPress", "Blog Writing", "Copywriting"];

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => items.filter((item) => (category === "All" || item.category === category) && item.title.toLowerCase().includes(query.toLowerCase())), [items, query, category]);

  async function load() {
    setItems(await fetch("/api/admin/portfolio").then((res) => res.json()));
  }
  useEffect(() => { load(); }, []);

  async function remove(item: any) {
    if (!confirm(`Are you sure you want to delete '${item.title}'?`)) return;
    await fetch(`/api/admin/portfolio/${item.id}`, { method: "DELETE" });
    load();
  }

  return <AdminShell><AdminTitle title="Portfolio Projects" action={<Link className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white" href="/admin/portfolio/new">+ Add New Project</Link>} /><AdminCard><div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]"><input className="rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white" placeholder="Search projects..." value={query} onChange={(e) => setQuery(e.target.value)} /><div className="flex flex-wrap gap-2">{categories.map((cat) => <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-3 py-2 text-sm font-bold ${category === cat ? "bg-[#2563eb] text-white" : "border border-white/10 text-[#a0a0b8]"}`}>{cat}</button>)}</div></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-[#a0a0b8]"><tr><th className="p-3">Title</th><th>Category</th><th>Result</th><th>Date Added</th><th>Actions</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className="border-t border-white/10"><td className="p-3 font-bold text-white">{item.title}</td><td>{item.category}</td><td className="max-w-xs">{item.resultStat}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td className="space-x-3"><Link className="text-[#93c5fd]" href={`/admin/portfolio/${item.id}/edit`}>Edit</Link><button className="text-red-400" onClick={() => remove(item)}>Delete</button></td></tr>)}</tbody></table></div></AdminCard></AdminShell>;
}
