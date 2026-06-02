"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminCard, AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";

const statuses = ["", "New", "Read", "In Progress", "Replied", "Closed"];
const priorities = ["", "Low", "Medium", "High"];
const services = ["", "Web Design", "Web Development", "Mobile App", "UI/UX Design", "Branding", "SEO Optimization", "Consulting", "Other"];

type Contact = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  status: string;
  priority: string;
  starred: boolean;
  message: string;
  createdAt: string;
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState({ search: "", status: "", priority: "", service: "", starred: "", dateFrom: "", dateTo: "" });

  async function load() {
    const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value));
    setContacts(await fetch(`/api/admin/contacts?${params}`).then((res) => res.json()));
  }

  useEffect(() => { load(); }, [filters]);

  const stats = useMemo(() => ({
    total: contacts.length,
    newCount: contacts.filter((item) => item.status === "New").length,
    high: contacts.filter((item) => item.priority === "High").length,
    starred: contacts.filter((item) => item.starred).length
  }), [contacts]);

  async function updateContact(contact: Contact, patch: Partial<Contact>) {
    await fetch(`/api/admin/contacts/${contact.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...contact, ...patch }) });
    load();
  }

  async function remove(contact: Contact) {
    if (!confirm(`Delete inquiry from ${contact.fullName}?`)) return;
    await fetch(`/api/admin/contacts/${contact.id}`, { method: "DELETE" });
    load();
  }

  const input = "rounded-lg border border-white/10 bg-[#10121b] px-3 py-2 text-sm text-white outline-none focus:border-[#2563eb]";

  return (
    <AdminShell>
      <AdminTitle title="Contact Management" action={<a className="rounded-lg bg-[#2563eb] px-5 py-3 font-bold text-white" href="/api/admin/contacts/export">Export CSV</a>} />
      <div className="grid gap-4 md:grid-cols-4">
        {[["Total Contacts", stats.total], ["New", stats.newCount], ["High Priority", stats.high], ["Starred", stats.starred]].map(([label, value]) => <AdminCard key={label as string}><p className="text-sm text-[#a0a0b8]">{label}</p><b className="mt-3 block font-mono text-4xl text-white">{value}</b></AdminCard>)}
      </div>
      <AdminCard className="mt-6">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <input className={input} placeholder="Search name, email, message..." value={filters.search} onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value }))} />
          <select className={input} value={filters.status} onChange={(e) => setFilters((current) => ({ ...current, status: e.target.value }))}>{statuses.map((item) => <option key={item} value={item}>{item || "All Status"}</option>)}</select>
          <select className={input} value={filters.priority} onChange={(e) => setFilters((current) => ({ ...current, priority: e.target.value }))}>{priorities.map((item) => <option key={item} value={item}>{item || "All Priority"}</option>)}</select>
          <select className={input} value={filters.service} onChange={(e) => setFilters((current) => ({ ...current, service: e.target.value }))}>{services.map((item) => <option key={item} value={item}>{item || "All Services"}</option>)}</select>
          <input className={input} type="date" value={filters.dateFrom} onChange={(e) => setFilters((current) => ({ ...current, dateFrom: e.target.value }))} />
          <button className="rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-white" onClick={() => setFilters({ search: "", status: "", priority: "", service: "", starred: "", dateFrom: "", dateTo: "" })}>Reset</button>
        </div>
      </AdminCard>
      <AdminCard className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#a0a0b8]"><tr><th className="p-3">Name</th><th>Email</th><th>Service</th><th>Budget</th><th>Status</th><th>Priority</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>{contacts.map((contact) => <tr key={contact.id} className="border-t border-white/10">
              <td className="p-3 font-bold text-white"><button className="mr-2 text-lg" onClick={() => updateContact(contact, { starred: !contact.starred })}>{contact.starred ? "★" : "☆"}</button>{contact.fullName}</td>
              <td>{contact.email}</td>
              <td><span className="rounded-full bg-[#2563eb]/15 px-2 py-1 text-xs text-[#93c5fd]">{contact.service}</span></td>
              <td>{contact.budget}</td>
              <td><select className={input} value={contact.status} onChange={(e) => updateContact(contact, { status: e.target.value })}>{statuses.filter(Boolean).map((item) => <option key={item}>{item}</option>)}</select></td>
              <td><select className={input} value={contact.priority} onChange={(e) => updateContact(contact, { priority: e.target.value })}>{priorities.filter(Boolean).map((item) => <option key={item}>{item}</option>)}</select></td>
              <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
              <td className="space-x-3 whitespace-nowrap"><Link className="text-[#93c5fd]" href={`/admin/contacts/${contact.id}`}>View</Link><button className="text-red-400" onClick={() => remove(contact)}>Delete</button></td>
            </tr>)}</tbody>
          </table>
        </div>
      </AdminCard>
    </AdminShell>
  );
}
