export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-sm text-ink-body">{children}</span>;
}
