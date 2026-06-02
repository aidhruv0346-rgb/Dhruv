"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminCard, AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";

export default function AdminContactDetailPage({ params }: { params: { id: string } }) {
  const [contact, setContact] = useState<any>(null);
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);

  async function load() {
    setContact(await fetch(`/api/admin/contacts/${params.id}`).then((res) => res.json()));
  }

  useEffect(() => { load(); }, [params.id]);

  async function sendResponse(event: React.FormEvent) {
    event.preventDefault();
    await fetch(`/api/admin/contacts/${params.id}/response`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: response }) });
    setResponse("");
    setSaved(true);
    load();
  }

  if (!contact) return <AdminShell><AdminTitle title="Contact Detail" /><AdminCard>Loading...</AdminCard></AdminShell>;

  const input = "w-full rounded-lg border border-white/10 bg-[#10121b] px-4 py-3 text-white outline-none focus:border-[#2563eb]";

  return (
    <AdminShell>
      <AdminTitle title={contact.fullName} action={<Link className="rounded-lg border border-white/10 px-5 py-3 font-bold text-white" href="/admin/contacts">Back to Contacts</Link>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <AdminCard>
          <h2 className="font-heading text-2xl font-bold text-white">Message</h2>
          <p className="mt-4 whitespace-pre-wrap leading-8 text-[#a0a0b8]">{contact.message}</p>
          <form onSubmit={sendResponse} className="mt-8 grid gap-4">
            <h2 className="font-heading text-2xl font-bold text-white">Admin Response</h2>
            <textarea className={`${input} min-h-40`} required placeholder="Type your response or internal reply note..." value={response} onChange={(e) => setResponse(e.target.value)} />
            <button className="w-fit rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white">Save Response</button>
            {saved && <p className="text-sm font-bold text-green-300">Response saved and marked as replied.</p>}
          </form>
          {contact.adminResponse && <div className="mt-8 rounded-xl border border-white/10 bg-[#10121b] p-5"><p className="font-mono text-xs text-[#737f96]">Responded {new Date(contact.adminResponse.respondedAt).toLocaleString()}</p><p className="mt-3 whitespace-pre-wrap text-[#a0a0b8]">{contact.adminResponse.message}</p></div>}
        </AdminCard>
        <AdminCard>
          <h2 className="font-heading text-2xl font-bold text-white">Contact Information</h2>
          <div className="mt-5 grid gap-4 text-sm">
            {[["Email", contact.email], ["Phone", contact.phone || "Not provided"], ["Service", contact.service], ["Budget", contact.budget], ["Status", contact.status], ["Priority", contact.priority], ["Created", new Date(contact.createdAt).toLocaleString()]].map(([label, value]) => <div key={label} className="rounded-lg border border-white/10 p-4"><p className="font-mono text-xs uppercase tracking-[.2em] text-[#737f96]">{label}</p><p className="mt-2 text-white">{value}</p></div>)}
          </div>
          <a className="mt-5 block rounded-lg bg-[#2563eb] px-5 py-3 text-center font-bold text-white" href={`mailto:${contact.email}`}>Email Contact</a>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
