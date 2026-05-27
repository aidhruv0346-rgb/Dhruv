export function AdminCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-[#16161f] p-5 shadow-card ${className}`}>{children}</div>;
}

export function AdminTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-heading text-3xl font-extrabold text-white md:text-4xl">{title}</h1>
        <p className="mt-1 text-sm text-[#a0a0b8]">Secret admin workspace</p>
      </div>
      {action}
    </div>
  );
}
