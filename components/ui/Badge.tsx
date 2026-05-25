import { cn } from "@/lib/utils";

export function Badge({ children, color = "violet" }: { children: React.ReactNode; color?: "violet" | "teal" | "coral" }) {
  return (
    <span className={cn(
      "inline-flex rounded px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[.22em]",
      color === "violet" && "bg-accent-violet/15 text-[#a8a2ff]",
      color === "teal" && "bg-accent-teal/15 text-accent-teal",
      color === "coral" && "bg-accent-coral/15 text-accent-coral"
    )}>{children}</span>
  );
}
