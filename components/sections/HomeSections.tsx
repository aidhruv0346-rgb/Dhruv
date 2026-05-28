"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { features, services, skills, stats, testimonials } from "@/lib/data";

type HomeProject = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  image: string;
  stat: string;
};

export function HomeSections({ projects = [] }: { projects?: HomeProject[] }) {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden pt-[72px]">
        <div className="orb left-[-120px] top-20 h-80 w-80 bg-accent-violet/30" />
        <div className="orb bottom-0 right-[-100px] h-96 w-96 bg-accent-teal/20" />
        <div className="dot-grid absolute inset-0 opacity-[.05]" />
        <div className="container-x relative grid min-h-[calc(100vh-72px)] items-center gap-12 py-16 lg:grid-cols-[1.2fr_.8fr]">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .1 } } }}>
            {["badge", "h1a", "sub", "buttons", "proof"].map((key, i) => (
              <motion.div key={key} variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }} transition={{ duration: .65 }} className={i > 0 ? "mt-6" : ""}>
                {i === 0 && <Badge color="teal">Available for Freelance Work</Badge>}
                {i === 1 && <h1 className="font-display text-5xl font-bold leading-[.98] text-white md:text-6xl xl:text-7xl">I Help Brands<br /><span className="text-gradient">Grow Digitally</span><br />& Scale Fast.</h1>}
                {i === 2 && <p className="max-w-2xl text-lg leading-8 text-ink-body md:text-xl">Digital Marketer based in Surat, India, specializing in SEO, Meta Ads, Social Media and WordPress Development that drive real, measurable results.</p>}
                {i === 3 && <div className="flex flex-wrap gap-4"><Button href="/portfolio" size="lg">View My Work</Button><Button href="/cv/dhruv-pipaliya-cv.pdf" variant="ghost" size="lg">Download CV</Button></div>}
                {i === 4 && <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-ink-body"><span className="flex text-accent-coral"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></span><span>Trusted by 20+ Clients</span><span className="text-ink-muted">|</span><span>3+ Years Experience</span><span className="text-ink-muted">|</span><span>50+ Projects Done</span></div>}
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55, duration: .8 }} className="relative mx-auto aspect-square w-full max-w-[390px]">
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent-violet to-accent-teal opacity-70 blur-2xl animate-pulseGlow" />
            <div className="relative grid h-full place-items-center rounded-full border-4 border-accent-violet bg-bg-card p-4 shadow-glow">
              <Image src="/images/profile.svg" alt="Dhruv Pipaliya profile artwork" width={420} height={420} priority className="rounded-full" />
            </div>
            {["SEO Expert", "Meta Ads", "WordPress"].map((chip, index) => <span key={chip} className={`absolute rounded-full border border-white/10 bg-bg-secondary px-4 py-2 text-sm font-bold text-white shadow-card ${index === 0 ? "left-0 top-12" : index === 1 ? "bottom-14 right-0" : "right-4 top-0"}`}>{chip}</span>)}
          </motion.div>
        </div>
      </section>
      <section className="overflow-hidden border-y border-accent-violet/30 bg-bg-secondary py-4 font-mono text-xs font-bold uppercase tracking-[.28em] text-ink-body">
        <div className="flex w-max animate-marquee gap-8">{Array(2).fill("SEO Optimization · Meta Ads · Social Media Management · Blog Writing · WordPress Development · Content Copywriting · ").map((t, i) => <span key={i}>{t}</span>)}</div>
      </section>
      <section className="section-pad container-x grid gap-12 lg:grid-cols-2">
        <Reveal className="grid grid-cols-2 gap-4 self-center">{stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-white/10 bg-bg-card p-6 shadow-card"><div className="font-mono text-4xl font-bold text-white"><AnimatedCounter to={stat.value} suffix={stat.suffix} /></div><p className="mt-2 text-sm">{stat.label}</p></div>)}</Reveal>
        <Reveal delay={.1}><SectionLabel>About Me</SectionLabel><h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Passionate Marketer. Proven Results.</h2><div className="mt-6 space-y-4 leading-8"><p>Hi, I'm Dhruv Pipaliya, a results-driven digital marketer based in Surat, Gujarat. With over 3 years of hands-on experience, I help businesses establish a strong online presence that converts visitors into loyal customers.</p><p>I combine data-driven strategy with creative thinking to deliver campaigns that do not just look good, they perform.</p><p>My mission is simple: help startups, SMEs, and personal brands grow with strategies that are smart, scalable, and sustainable.</p></div><div className="mt-7 flex flex-wrap gap-2">{skills.map((skill) => <Tag key={skill}>{skill}</Tag>)}</div><Button className="mt-8" href="/contact" variant="ghost">More About Me</Button></Reveal>
      </section>
      <ServicesOverview />
      <section className="section-pad container-x grid gap-12 lg:grid-cols-2">
        <Reveal><SectionLabel>Why Dhruv</SectionLabel><h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Not Just a Marketer, Your Growth Partner</h2><p className="mt-5 leading-8">Expect thoughtful strategy, clear communication, and campaign work that keeps business outcomes in view from day one.</p><Button className="mt-8" href="/contact">Let's Work Together</Button></Reveal>
        <Reveal className="grid gap-4 sm:grid-cols-2">{features.map((feature) => <div className="rounded-2xl border border-white/10 bg-bg-card p-5" key={feature}><Check className="mb-4 text-accent-teal" /><h3 className="font-heading font-bold text-white">{feature}</h3></div>)}</Reveal>
      </section>
      <PortfolioTeaser projects={projects} />
      <section className="section-pad bg-bg-secondary"><div className="container-x"><SectionLabel>Client Love</SectionLabel><h2 className="font-heading text-4xl font-bold text-white md:text-5xl">What My Clients Say</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{testimonials.map((item) => <Reveal key={item.name} className="rounded-2xl border border-white/10 bg-bg-card p-6"><div className="mb-4 text-accent-coral">★★★★★</div><p className="italic leading-7">"{item.quote}"</p><div className="mt-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-accent-violet font-bold text-white">{item.name[0]}</span><span><b className="block text-white">{item.name}</b><small>{item.role}</small></span></div></Reveal>)}</div></div></section>
      <CTA />
    </>
  );
}

export function ServicesOverview() {
  return <section className="section-pad bg-bg-secondary"><div className="container-x text-center"><div className="mx-auto flex justify-center"><SectionLabel>What I Offer</SectionLabel></div><h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Services Designed to Grow Your Business</h2><p className="mx-auto mt-4 max-w-2xl">From search rankings to social engagement, every service is tailored to deliver measurable ROI.</p><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service) => <Reveal key={service.slug} className="card-hover rounded-2xl border border-white/10 bg-bg-card p-6 text-left"><service.icon className="mb-6 text-accent-violet" size={34} /><h3 className="font-heading text-2xl font-bold text-white">{service.title}</h3><p className="mt-3 leading-7">{service.desc}</p><div className="mt-5 flex flex-wrap gap-2">{service.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div><a className="mt-6 inline-block font-bold text-accent-teal" href="/services">Learn More →</a></Reveal>)}</div><Button className="mt-10" href="/services" variant="outline">View All Services</Button></div></section>;
}

function PortfolioTeaser({ projects }: { projects: HomeProject[] }) {
  return <section className="section-pad container-x text-center"><div className="mx-auto flex justify-center"><SectionLabel>My Work</SectionLabel></div><h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Recent Projects That Made an Impact</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0,3).map((project) => <Reveal key={project.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-bg-card text-left"><div className="relative aspect-[4/3]"><Image src={project.image} alt={project.title} fill className="object-cover" /><div className="absolute inset-0 grid place-items-center bg-black/70 opacity-0 transition group-hover:opacity-100"><span className="font-bold text-white">View →</span></div></div><div className="p-5"><Badge>{project.category}</Badge><h3 className="mt-3 font-heading text-xl font-bold text-white">{project.title}</h3><p className="mt-2 text-sm">{project.stat}</p></div></Reveal>)}</div><Button className="mt-10" href="/portfolio">See All Projects</Button></section>;
}
