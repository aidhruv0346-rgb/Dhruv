"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const services = ["Web Design", "Web Development", "Mobile App", "UI/UX Design", "Branding", "SEO Optimization", "Consulting", "Other"];
const budgets = ["Below $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000+", "Not Decided Yet"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });
    setLoading(false);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.message || "Please check the form and try again.");
      return;
    }
    setSent(true);
    form.reset();
  }

  if (sent) return <div className="rounded-2xl border border-accent-teal/40 bg-accent-teal/10 p-8 text-center"><h2 className="font-heading text-3xl font-bold text-white">Message sent!</h2><p className="mt-3">I will reply within 24 hours.</p></div>;

  const input = "h-13 rounded-lg border border-white/10 bg-bg-secondary px-4 py-3 outline-none focus:border-[#2563eb]";

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-white/10 bg-bg-card p-6">
      <h2 className="font-heading text-3xl font-bold text-white">Send Me a Message</h2>
      <input required maxLength={100} name="name" className={input} placeholder="Full Name" />
      <input required name="email" type="email" className={input} placeholder="Email Address" />
      <input name="phone" type="tel" className={input} placeholder="+91 XXXXX XXXXX" />
      <select required name="service" className={input}>
        <option value="">Service Interested In</option>
        {services.map((service) => <option key={service}>{service}</option>)}
      </select>
      <select required name="budget" className={input}>
        <option value="">Project Budget</option>
        {budgets.map((budget) => <option key={budget}>{budget}</option>)}
      </select>
      <div>
        <textarea required minLength={10} maxLength={5000} name="message" className={`${input} min-h-36 w-full`} placeholder="Message / Project Details" onChange={(event) => setMessageLength(event.target.value.length)} />
        <p className="mt-1 text-right font-mono text-xs text-ink-muted">{messageLength}/5000</p>
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-body">
        <input required name="agreement" type="checkbox" className="mt-1 size-4 accent-[#2563eb]" />
        <span>I agree to the terms and conditions.</span>
      </label>
      {error && <p className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm font-bold text-red-300">{error}</p>}
      <Button type="submit" className="w-full">{loading ? "Sending..." : "Send Message"}</Button>
    </form>
  );
}
