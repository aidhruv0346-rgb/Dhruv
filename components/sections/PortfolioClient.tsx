"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

const cats = ["All", "SEO", "Meta Ads", "Social Media", "WordPress", "Blog", "Copywriting"];

type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  pdfUrl?: string;
  projectUrl?: string;
};

export function PortfolioClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <div className="container-x flex flex-wrap justify-center gap-3 pb-10">
        {cats.map((cat) => <button key={cat} onClick={() => setActive(cat)} className={`rounded-full px-4 py-2 font-bold transition ${active === cat ? "bg-accent-violet text-white" : "border border-white/10 text-ink-body hover:border-accent-teal"}`}>{cat}</button>)}
      </div>
      <motion.div layout className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <motion.article layout key={project.slug} className="group overflow-hidden rounded-2xl border border-white/10 bg-bg-card">
            <div className="relative aspect-[4/3]">
              <Image src={project.coverImage} fill priority={index < 3} className="object-cover" alt={project.title} />
              <div className="absolute inset-0 grid place-items-center bg-black/70 opacity-0 transition group-hover:opacity-100">
                {project.pdfUrl ? (
                  <a className="font-bold text-white" href={project.pdfUrl} target="_blank" rel="noreferrer">View Portfolio PDF →</a>
                ) : (
                  <Link className="font-bold text-white" href={`/portfolio/${project.slug}`}>View Case Study →</Link>
                )}
              </div>
            </div>
            <div className="p-5">
              <Badge>{project.category}</Badge>
              <h2 className="mt-3 font-heading text-xl font-bold text-white">{project.title}</h2>
              <p className="mt-2 text-sm">{project.excerpt}</p>
              <Link className="mt-4 inline-block font-bold text-[#93c5fd]" href={`/portfolio/${project.slug}`}>View Details →</Link>
              {project.pdfUrl && <a className="mt-4 inline-block font-bold text-accent-teal" href={project.pdfUrl} target="_blank" rel="noreferrer">Open PDF →</a>}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
}
