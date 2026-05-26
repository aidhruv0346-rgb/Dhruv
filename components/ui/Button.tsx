import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
};

export function Button({ href, children, variant = "primary", size = "md", className, type = "button" }: Props) {
  const classes = cn(
    "shimmer inline-flex items-center justify-center gap-2 rounded-lg font-heading font-extrabold tracking-normal transition duration-200",
    size === "sm" && "h-10 px-4 text-sm",
    size === "md" && "h-12 px-5",
    size === "lg" && "h-14 px-7 text-lg",
    variant === "primary" && "bg-gradient-to-r from-accent-violet via-accent-coral to-accent-teal text-white shadow-glow hover:brightness-110",
    variant === "ghost" && "border border-white/10 bg-white/[.06] text-ink-primary shadow-card hover:border-accent-teal hover:bg-white/[.10] hover:text-white",
    variant === "outline" && "border border-accent-violet/60 bg-accent-violet/5 text-ink-primary hover:border-accent-teal hover:bg-accent-teal/10",
    className
  );
  const content = <>{children}<ArrowRight size={18} /></>;
  return href ? <Link className={classes} href={href}>{content}</Link> : <button type={type} className={classes}>{content}</button>;
}
