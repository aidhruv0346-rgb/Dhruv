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
    variant === "primary" && "bg-accent-violet text-white shadow-glow hover:bg-blue-700",
    variant === "ghost" && "border border-white/10 bg-white/[.72] text-ink-primary shadow-card hover:border-accent-violet hover:bg-blue-50",
    variant === "outline" && "border border-accent-violet/35 bg-accent-violet/5 text-ink-primary hover:border-accent-violet hover:bg-accent-violet/10",
    className
  );
  const content = <>{children}<ArrowRight size={18} /></>;
  return href ? <Link className={classes} href={href}>{content}</Link> : <button type={type} className={classes}>{content}</button>;
}
