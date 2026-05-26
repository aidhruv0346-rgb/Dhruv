import { Button } from "@/components/ui/Button";

export function CTA({ title = "Ready to Take Your Digital Presence to the Next Level?", text = "Let's build something great together. Book a free 30-minute consultation and let's map out your growth strategy." }) {
  return (
    <section className="container-x py-10">
      <div className="color-frame relative overflow-hidden rounded-2xl bg-[linear-gradient(125deg,rgba(139,92,246,.92),rgba(255,77,141,.82)_45%,rgba(6,245,197,.78))] p-8 text-center text-white shadow-glow md:p-14">
        <div className="dot-grid absolute inset-0 opacity-20" />
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-accent-gold/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-bg-primary/35 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="headline-glow font-heading text-3xl font-extrabold md:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/82">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="ghost">Get Started Today</Button>
            <Button href="/services" variant="ghost">View My Services</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
