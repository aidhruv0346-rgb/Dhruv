export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[.28em] text-accent-teal">
      <span className="h-px w-10 bg-accent-violet shadow-teal" />
      <span className="text-gradient">{children}</span>
    </div>
  );
}
