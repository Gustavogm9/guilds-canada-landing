"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", icon: "N" },
  { name: "React", icon: "R" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "ND" },
  { name: "Python", icon: "PY" },
  { name: "AWS", icon: "AW" },
  { name: "PostgreSQL", icon: "PG" },
  { name: "OpenAI", icon: "AI" },
  { name: "Stripe", icon: "ST" },
  { name: "TailwindCSS", icon: "TW" }
];

export function TechStack() {
  return (
    <section className="py-12 bg-background border-y border-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center md:text-left">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Enterprise-Grade Engineering Stack
        </p>
      </div>
      
      {/* Marquee Animation */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap">
          {technologies.map((tech, i) => (
            <div key={`tech-1-${i}`} className="mx-8 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center border border-muted/30 font-bold text-sm text-foreground">
                {tech.icon}
              </div>
              <span className="text-lg font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>

        <div className="animate-marquee flex whitespace-nowrap absolute top-0">
          {technologies.map((tech, i) => (
            <div key={`tech-2-${i}`} className="mx-8 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center border border-muted/30 font-bold text-sm text-foreground">
                {tech.icon}
              </div>
              <span className="text-lg font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Gradient fades for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
