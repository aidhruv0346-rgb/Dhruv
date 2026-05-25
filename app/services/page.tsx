import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { processSteps, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Digital Marketing Services | SEO, Meta Ads, WordPress",
  description: "Explore Dhruv Pipaliya's digital marketing services: SEO, Social Media Management, Blog Writing, Meta Ads, WordPress Development and Copywriting."
};

export default function ServicesPage() {
  return (
    <main className="pt-[72px]">
      <section className="relative grid min-h-[60vh] place-items-center overflow-hidden text-center">
        <div className="orb left-10 top-10 h-80 w-80 bg-accent-violet/25" />
        <div className="orb bottom-0 right-10 h-80 w-80 bg-accent-teal/15" />
        <div className="container-x relative"><div className="mx-auto flex justify-center"><SectionLabel>Services</SectionLabel></div><h1 className="font-display text-5xl font-bold text-white md:text-7xl">Everything You Need to Dominate Online</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8">Full-stack digital marketing services tailored for startups, SMEs, and personal brands looking to grow their online presence.</p></div>
      </section>
      <section className="container-x space-y-16 py-20">
        {services.map((service, index) => <Reveal key={service.slug} className={`grid items-center gap-10 rounded-2xl border border-white/10 bg-bg-card p-7 md:grid-cols-2 md:p-10 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}><div className="relative grid min-h-72 place-items-center rounded-2xl bg-bg-secondary"><span className="absolute left-6 top-5 font-mono text-7xl font-bold text-white/5">{String(index + 1).padStart(2, "0")}</span><service.icon size={96} className="text-accent-violet" /></div><div><SectionLabel>Service {String(index + 1).padStart(2, "0")}</SectionLabel><h2 className="font-heading text-4xl font-bold text-white">{service.title}</h2><p className="mt-5 leading-8">{service.desc} I plan, execute, report, and optimize so every activity ties back to visibility, trust, leads, and revenue.</p><p className="mt-3 leading-8">This service is ideal for businesses that want a reliable growth system rather than one-off tactics.</p><div className="mt-6 grid gap-3">{service.included.map((item) => <span key={item} className="flex gap-3 text-sm"><Check className="shrink-0 text-accent-teal" size={18} />{item}</span>)}</div><Button className="mt-7" href="/contact">Discuss This Service</Button></div></Reveal>)}
      </section>
      <section className="section-pad bg-bg-secondary"><div className="container-x text-center"><h2 className="font-heading text-4xl font-bold text-white">My Simple 4-Step Process</h2><p className="mt-4">From discovery to delivery, clear, collaborative, and on-time.</p><div className="mt-12 grid gap-5 md:grid-cols-4">{processSteps.map((step, index) => <Reveal key={step.title} className="relative rounded-2xl border border-white/10 bg-bg-card p-6"><span className="font-mono text-accent-teal">0{index + 1}</span><step.icon className="mx-auto my-5 text-accent-violet" /><h3 className="font-heading text-xl font-bold text-white">{step.title}</h3><p className="mt-3 text-sm leading-6">{step.desc}</p></Reveal>)}</div></div></section>
      <section className="section-pad container-x text-center"><h2 className="font-heading text-4xl font-bold text-white">Transparent, Flexible Pricing</h2><p className="mt-4">Every business is different. Here are starting packages.</p><div className="mt-10 grid gap-5 md:grid-cols-3">{[["Starter", "₹8,000 / month", "SEO basics, 8 social posts/month, 2 blogs/month"], ["Growth", "₹18,000 / month", "Full SEO, 15 social posts, 4 blogs, Meta Ads management"], ["Enterprise", "Custom Quote", "All services, dedicated support, advanced reporting"]].map((tier, i) => <Reveal key={tier[0]} className={`rounded-2xl border p-7 text-left ${i === 1 ? "border-accent-violet bg-accent-violet/10 shadow-glow" : "border-white/10 bg-bg-card"}`}><h3 className="font-heading text-2xl font-bold text-white">{tier[0]}</h3><p className="mt-4 font-mono text-3xl font-bold text-accent-teal">{tier[1]}</p><p className="mt-4 leading-7">{tier[2]}</p><Button className="mt-7" href="/contact" variant={i === 1 ? "primary" : "outline"}>Get Started</Button></Reveal>)}</div><p className="mt-5 text-sm text-ink-muted">All prices are starting rates. Final cost depends on scope.</p></section>
      <FAQ />
      <CTA title="Not Sure Which Service You Need?" text="Let's hop on a free 30-minute consultation and figure it out together." />
    </main>
  );
}

function FAQ() {
  const questions = ["How long does SEO take to show results?", "Do you work with international clients?", "What platforms do you run Meta Ads on?", "Will I have access to reports and analytics?", "Can you build an e-commerce WordPress site?", "Do you offer monthly retainer packages?", "How do we get started?", "Do you sign NDA or contracts?"];
  return <section className="section-pad bg-bg-secondary"><div className="container-x"><h2 className="text-center font-heading text-4xl font-bold text-white">Frequently Asked Questions</h2><div className="mt-10 grid gap-4 md:grid-cols-2">{questions.map((q) => <details key={q} className="rounded-2xl border border-white/10 bg-bg-card p-5"><summary className="cursor-pointer font-bold text-white">{q}</summary><p className="mt-4 leading-7">Yes. I keep the process clear, collaborative, and tailored to your business goals. The exact recommendation depends on your current stage and scope.</p></details>)}</div></div></section>;
}
