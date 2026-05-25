"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden lg:block">
      <span className="fixed size-2 rounded-full bg-accent-teal" style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }} />
      <span className="fixed size-9 rounded-full border border-accent-violet/50 transition-transform duration-100" style={{ transform: `translate(${pos.x - 18}px, ${pos.y - 18}px)` }} />
    </div>
  );
}
