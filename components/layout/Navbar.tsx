"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 h-[72px] transition", scrolled && "border-b border-white/10 bg-[#0a0a0f]/85 backdrop-blur-xl")}>
      <nav className="container-x flex h-full items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-ink-primary">Dhruv<span className="text-gradient">.</span></Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={cn("relative text-sm font-extrabold text-ink-body transition hover:text-white", pathname === link.href && "text-white after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-accent-coral after:via-accent-violet after:to-accent-teal")}>{link.label}</Link>
          ))}
        </div>
        <div className="hidden md:block"><Button href="/contact" size="sm">Hire Me</Button></div>
        <button className="grid size-11 place-items-center rounded-lg border border-white/10 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex h-[72px] items-center justify-between">
            <span className="font-display text-2xl font-bold text-ink-primary">Dhruv<span className="text-gradient">.</span></span>
            <button className="grid size-11 place-items-center rounded-lg border border-white/10" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <div className="container-x mt-12 grid gap-7">
            {navLinks.map((link, index) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="font-heading text-4xl font-bold text-white" style={{ transitionDelay: `${index * 80}ms` }}>{link.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}
