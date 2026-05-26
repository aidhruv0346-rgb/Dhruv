export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/[.055] px-3 py-1.5 text-sm font-medium text-ink-body shadow-card transition hover:border-accent-teal/50 hover:text-white">{children}</span>;
}
