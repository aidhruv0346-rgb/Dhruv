import { cn } from "@/lib/utils";

export function Badge({ children, color = "violet" }: { children: React.ReactNode; color?: "violet" | "teal" | "coral" }) {
  return (
    <span className={cn(
      "inline-flex rounded px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[.22em] shadow-card",
      color === "violet" && "border border-accent-violet/25 bg-accent-violet/15 text-[#d7c9ff]",
      color === "teal" && "border border-accent-teal/25 bg-accent-teal/15 text-accent-teal",
      color === "coral" && "border border-accent-coral/25 bg-accent-coral/15 text-accent-coral"
    )}>{children}</span>
  );
}
