"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhyUs() {
  const points = [
    {
      title: "Engineering-Led Delivery",
      description: "Direct communication, cultural alignment, and strict adherence to enterprise quality standards."
    },
    {
      title: "Global Engineering Talent",
      description: "Access to top-tier developers and AI engineers, providing exceptional value without compromising quality."
    },
    {
      title: "Predictable Milestones",
      description: "Transparent roadmaps with clear deliverables. You'll always know what's being built and when it ships."
    },
    {
      title: "Risk Mitigation & Scalability",
      description: "We don't just write code; we build resilient infrastructures designed to mitigate operational risks and handle scale from day one."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Why Guilds?
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Proven Technology Delivery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            Since 2021, our team has delivered custom software, automation systems, and digital platforms for companies across multiple industries including healthcare, fintech, and enterprise services.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* The Reality Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 rounded-2xl p-8 md:p-10 border border-zinc-800"
          >
            <h3 className="font-serif text-2xl font-bold text-white mb-8 pb-4 border-b border-zinc-800">
              The Reality for Modern Businesses
            </h3>
            <ul className="space-y-6">
              {[
                "Growing demand for specialized technology talent",
                "Extremely high agency costs for local enterprise work",
                "Strict PIPEDA compliance and data-governance requirements",
                "Long, unpredictable timelines to hire and scale internally"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-zinc-400 font-medium">
                  <div className="mt-1 min-w-5 flex justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The Guilds Difference Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 rounded-2xl p-8 md:p-10 border border-primary/30 relative overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full" />
            <h3 className="font-serif text-2xl font-bold text-white mb-8 pb-4 border-b border-zinc-800 relative z-10">
              The Guilds Difference
            </h3>
            <ul className="space-y-6 relative z-10">
              {[
                "Expert-led architecture, management, and delivery",
                "Access to elite global engineering at a sensible cost",
                "Built-in compliance & rigorous data governance",
                "Predictable, fixed-scope engagements with clear milestones"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-zinc-300">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
