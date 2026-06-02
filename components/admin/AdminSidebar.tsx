"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, FileText, FolderKanban, Inbox, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: BarChart3 },
  { href: "/admin/contacts", label: "Contacts", Icon: Inbox },
  { href: "/admin/portfolio", label: "Portfolio", Icon: FolderKanban },
  { href: "/admin/blog", label: "Blog Posts", Icon: FileText },
  { href: "/admin/settings", label: "Settings", Icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-white/10 bg-[#111118] p-5 text-white lg:block">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-full bg-[#2563eb] font-heading font-extrabold">DP</div>
        <div>
          <p className="font-heading font-bold">Dhruv Pipaliya</p>
          <p className="text-xs text-[#a0a0b8]">Administrator</p>
        </div>
      </div>
      <nav className="mt-10 grid gap-2">
        {nav.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-lg border-l-2 border-transparent px-4 py-3 text-sm font-bold text-[#a0a0b8] transition hover:bg-white/5 hover:text-white", pathname === href && "border-[#2563eb] bg-[#2563eb]/10 text-[#93c5fd]")}>
            <Icon size={18} /> {label}
          </Link>
        ))}
        <div className="my-4 h-px bg-white/10" />
        <button onClick={logout} className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-[#a0a0b8] transition hover:bg-white/5 hover:text-white">
          <LogOut size={18} /> Logout
        </button>
      </nav>
      <div className="absolute bottom-5 left-5 right-5 text-xs text-[#737f96]">
        <p>Admin Panel v1.0</p>
        <a className="mt-2 inline-block text-[#93c5fd]" href="/" target="_blank" rel="noreferrer">Open website</a>
      </div>
    </aside>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0ff]">
      <AdminSidebar />
      <main className="px-4 py-6 lg:ml-[260px] lg:px-8">{children}</main>
    </div>
  );
}
