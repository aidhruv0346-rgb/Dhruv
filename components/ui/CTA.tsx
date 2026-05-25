import { Button } from "@/components/ui/Button";

export function CTA({ title = "Ready to Take Your Digital Presence to the Next Level?", text = "Let's build something great together. Book a free 30-minute consultation and let's map out your growth strategy." }) {
  return (
    <section className="container-x py-10">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-violet to-accent-teal p-8 text-center text-white md:p-14">
        <div className="dot-grid absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">{title}</h2>
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
