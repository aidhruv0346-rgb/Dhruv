"use client";

import { useEffect, useState } from "react";
import { AdminCard, AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ projectsCompleted: 50, happyClients: 20, yearsExperience: 3, adSpendManagedLakhs: 10, newsletterSubscribers: 0 });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((res) => res.json()).then(setSettings);
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const input = "w-full rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white outline-none focus:border-[#2563eb]";

  return (
    <AdminShell>
      <AdminTitle title="Settings" />
      <AdminCard>
        <form onSubmit={save} className="grid max-w-3xl gap-5">
          {[
            ["Projects Completed", "projectsCompleted"],
            ["Happy Clients", "happyClients"],
            ["Years Experience", "yearsExperience"],
            ["Ad Spend Managed (Lakhs)", "adSpendManagedLakhs"],
            ["Newsletter Subscribers", "newsletterSubscribers"]
          ].map(([label, key]) => (
            <label key={key} className="text-sm text-[#a0a0b8]">{label}<input className={`${input} mt-2`} type="number" value={(settings as any)[key]} onChange={(event) => setSettings((current) => ({ ...current, [key]: Number(event.target.value) }))} /></label>
          ))}
          <div className="rounded-xl border border-white/10 bg-[#10121b] p-4">
            <h2 className="font-heading text-xl font-bold text-white">Change Admin Password</h2>
            <p className="mt-2 text-sm text-[#a0a0b8]">For security, update the admin password in Vercel Environment Variables: <b>ADMIN_PASSWORD</b>. Then redeploy the project.</p>
          </div>
          {saved && <p className="font-bold text-green-300">Settings saved.</p>}
          <button className="w-fit rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white">Save Settings</button>
        </form>
      </AdminCard>
    </AdminShell>
  );
}
