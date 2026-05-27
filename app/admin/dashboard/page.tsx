"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminCard, AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";

type DashboardData = {
  stats: { portfolio: number; blog: number; published: number; drafts: number };
  recentPortfolio: Array<{ id: string; title: string; createdAt: string }>;
  recentBlog: Array<{ id: string; title: string; createdAt: string }>;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard").then((res) => res.json()).then(setData);
  }, []);

  return (
    <AdminShell>
      <AdminTitle title="Welcome back, Dhruv" action={<p className="text-sm text-[#a0a0b8]">{new Date().toLocaleString()}</p>} />
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total Portfolio Projects", data?.stats.portfolio ?? 0],
          ["Total Blog Posts", data?.stats.blog ?? 0],
          ["Published Blog Posts", data?.stats.published ?? 0],
          ["Draft Blog Posts", data?.stats.drafts ?? 0]
        ].map(([label, value]) => <AdminCard key={label as string}><p className="text-sm text-[#a0a0b8]">{label}</p><b className="mt-3 block font-mono text-4xl text-white">{value}</b></AdminCard>)}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AdminCard><h2 className="font-heading text-xl font-bold text-white">Recent Portfolio</h2><div className="mt-4 grid gap-3">{data?.recentPortfolio.map((item) => <p key={item.id} className="text-sm text-[#a0a0b8]">{item.title} <span className="text-[#737f96]">- {new Date(item.createdAt).toLocaleDateString()}</span></p>)}</div></AdminCard>
        <AdminCard><h2 className="font-heading text-xl font-bold text-white">Recent Blog Posts</h2><div className="mt-4 grid gap-3">{data?.recentBlog.map((item) => <p key={item.id} className="text-sm text-[#a0a0b8]">{item.title} <span className="text-[#737f96]">- {new Date(item.createdAt).toLocaleDateString()}</span></p>)}</div></AdminCard>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white" href="/admin/portfolio/new">+ Add Portfolio Project</Link>
        <Link className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white" href="/admin/blog/new">+ Write New Blog Post</Link>
      </div>
    </AdminShell>
  );
}
