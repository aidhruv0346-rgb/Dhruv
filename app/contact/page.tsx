import type { Metadata } from "next";
import { Calendar, Download, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactDetails } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Dhruv Pipaliya | Hire a Digital Marketer in Surat, India",
  description: "Get in touch with Dhruv Pipaliya for SEO, Meta Ads, Social Media, WordPress Development and Copywriting services. Free consultation available."
};

export default function ContactPage() {
  const contactRows = [
    [Mail, "Email", contactDetails.email],
    [Phone, "Phone", contactDetails.phone],
    [MapPin, "Location", contactDetails.location],
    [Send, "Hours", contactDetails.hours]
  ] as const;

  const socialLinks = [
    { href: contactDetails.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: contactDetails.social.instagram, label: "Instagram", Icon: Instagram },
    { href: contactDetails.social.twitter, label: "Twitter/X", Icon: Twitter },
    { href: contactDetails.social.facebook, label: "Facebook", text: "f" }
  ];

  return (
    <main className="pt-[72px]">
      <section className="container-x py-20 text-center"><div className="mx-auto flex justify-center"><SectionLabel>Contact</SectionLabel></div><span className="rounded-full border border-accent-teal/40 bg-accent-teal/10 px-4 py-2 text-sm text-accent-teal">Usually responds within 24 hours</span><h1 className="mt-7 font-display text-5xl font-bold text-white md:text-7xl">Let's Work Together</h1><p className="mx-auto mt-5 max-w-2xl">Have a project in mind or just want to say hi? I'd love to hear from you.</p></section>
      <section className="container-x grid gap-8 pb-20 lg:grid-cols-[1.2fr_.8fr]">
        <ContactForm />
        <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
          <h2 className="font-heading text-3xl font-bold text-white">Or Reach Me Directly</h2>
          <div className="mt-7 grid gap-5">
            {contactRows.map(([Icon, label, value]) => <div key={label} className="flex gap-4"><Icon className="text-accent-teal" /><span><b className="block text-white">{label}</b>{value}</span></div>)}
          </div>
          <Button className="mt-7" href={`https://wa.me/${contactDetails.whatsappNumber}`} variant="ghost">Chat on WhatsApp</Button>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ href, label, Icon, text }) => (
              <a key={label} aria-label={label} className="grid size-11 place-items-center rounded-lg border border-white/10 font-bold hover:border-accent-teal hover:text-accent-teal" href={href} target="_blank" rel="noreferrer">
                {Icon ? <Icon size={18} /> : text}
              </a>
            ))}
          </div>
          <iframe className="mt-8 h-64 w-full rounded-2xl grayscale invert" loading="lazy" src="https://www.google.com/maps?q=Surat,Gujarat,India&output=embed" title="Surat map" />
        </div>
      </section>
      <section className="container-x grid gap-5 pb-20 md:grid-cols-3">{[[Calendar, "Book a Free Consultation", "Schedule a 30-minute free discovery call via Calendly", "Book a Call"], [Send, "View My Work First", "See my portfolio before reaching out", "View Portfolio"], [Download, "Download My CV", "Get a detailed overview of my skills and experience", "Download CV"]].map(([Icon, title, desc, cta]) => <div key={String(title)} className="rounded-2xl border border-white/10 bg-bg-card p-6"><Icon className="text-accent-violet" /><h3 className="mt-5 font-heading text-2xl font-bold text-white">{String(title)}</h3><p className="mt-3">{String(desc)}</p><Button className="mt-6" href={String(title).startsWith("View") ? "/portfolio" : "/contact"} variant="outline">{String(cta)}</Button></div>)}</section>
    </main>
  );
}
