"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <CustomCursor />}
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      <Analytics />
    </>
  );
}
