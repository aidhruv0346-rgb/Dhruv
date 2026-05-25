import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks, services } from "@/lib/data";
import { contactDetails } from "@/lib/contact";

export function Footer() {
  const socialLinks = [
    { href: contactDetails.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: contactDetails.social.instagram, label: "Instagram", Icon: Instagram },
    { href: contactDetails.social.twitter, label: "Twitter/X", Icon: Twitter },
    { href: contactDetails.social.facebook, label: "Facebook", text: "f" }
  ];

  return (
    <footer className="mt-16 border-t border-white/10 bg-bg-primary">
      <div className="container-x -mt-12 rounded-2xl border border-white/10 bg-bg-secondary p-8 shadow-card md:flex md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-white">Ready to grow your brand?</h2>
          <p className="mt-2 text-ink-body">Let’s turn attention into leads, traffic, and revenue.</p>
        </div>
        <div className="mt-6 flex gap-3 md:mt-0"><Button href="/contact">Book a Call</Button><Button href="/portfolio" variant="outline">View Work</Button></div>
      </div>
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-3xl font-bold text-white">Dhruv<span className="text-accent-violet">.</span></h3>
          <p className="mt-4 text-sm leading-7">Growth-driven digital marketing for ambitious brands in Surat and beyond.</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ href, label, Icon, text }) => (
              <a key={label} aria-label={label} className="grid size-10 place-items-center rounded-lg border border-white/10 font-bold hover:border-accent-teal hover:text-accent-teal" href={href} target="_blank" rel="noreferrer">
                {Icon ? <Icon size={18} /> : text}
              </a>
            ))}
          </div>
        </div>
        <div><h4 className="font-heading font-bold text-white">Quick Links</h4><div className="mt-4 grid gap-3 text-sm">{navLinks.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div></div>
        <div><h4 className="font-heading font-bold text-white">Services</h4><div className="mt-4 grid gap-3 text-sm">{services.map((s) => <Link key={s.slug} href="/services">{s.title}</Link>)}</div></div>
        <div><h4 className="font-heading font-bold text-white">Contact</h4><div className="mt-4 grid gap-3 text-sm"><span>{contactDetails.email}</span><span>{contactDetails.phone}</span><span>{contactDetails.location}</span></div></div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-ink-muted">© 2026 Dhruv Pipaliya | Built with passion for digital growth</div>
    </footer>
  );
}
