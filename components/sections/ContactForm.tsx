"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(formData)), headers: { "Content-Type": "application/json" } });
    setSent(res.ok);
  }
  if (sent) return <div className="rounded-2xl border border-accent-teal/40 bg-accent-teal/10 p-8 text-center"><h2 className="font-heading text-3xl font-bold text-white">Message sent!</h2><p className="mt-3">I’ll reply within 24 hours.</p></div>;
  const input = "h-13 rounded-lg border border-white/10 bg-bg-secondary px-4 py-3 outline-none focus:border-accent-violet";
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-white/10 bg-bg-card p-6">
      <h2 className="font-heading text-3xl font-bold text-white">Send Me a Message</h2>
      <input required name="name" className={input} placeholder="Full Name" />
      <input required name="email" type="email" className={input} placeholder="Email Address" />
      <input name="phone" type="tel" className={input} placeholder="Phone Number" />
      <select required name="service" className={input}><option value="">Service Interested In</option>{["SEO", "Social Media", "Blog Writing", "Meta Ads", "WordPress", "Copywriting", "Other"].map((s) => <option key={s}>{s}</option>)}</select>
      <select name="budget" className={input}><option>Project Budget</option><option>Under ₹10K</option><option>₹10K-₹25K</option><option>₹25K-₹50K</option><option>₹50K+</option><option>Not Sure</option></select>
      <textarea required minLength={10} name="message" className={`${input} min-h-36`} placeholder="Message / Project Details" />
      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  );
}
