"use client";

import { motion } from "framer-motion";
import { Search, Zap, BrainCircuit, Rocket, Repeat, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Services() {
  const products = [
    {
      id: "01",
      tag: "ENTRY PRODUCT",
      title: "Digital Diagnostic",
      description: "We map your operations, find the bottlenecks, and tell you exactly what to fix first. Ideal before any major automation investment.",
      investment: "CAD $5,000 – $8,000",
      timeline: "2 weeks",
      icon: <Search size={28} className="text-primary" />,
      features: [
        "Process mapping session with your team",
        "Bottleneck identification across 3-5 workflows",
        "ROI-ranked automation backlog",
        "100% refund guarantee if < 3 ops found"
      ],
      link: "/diagnostic",
      linkText: "Take Free Maturity Assessment"
    },
    {
      id: "02",
      tag: "CORE PRODUCT",
      title: "Process Automation (RPA)",
      description: "Eliminate repetitive manual workflows. Fixed price, milestone payments, guaranteed delivery.",
      investment: "CAD $15,000 – $50,000",
      timeline: "4–10 weeks",
      icon: <Zap size={28} className="text-primary" />,
      features: [
        "AS-IS + TO-BE process design",
        "Custom automation build (n8n, Python, Native)",
        "Integration with existing ERP/CRM",
        "Measured against ROI baseline"
      ]
    },
    {
      id: "03",
      tag: "HIGH IMPACT",
      title: "AI & LLM Solutions",
      description: "AI that actually works inside your operation — not a demo, not a prototype. Production-ready integrations.",
      investment: "CAD $25,000 – $80,000",
      timeline: "6–16 weeks",
      sred: true,
      icon: <BrainCircuit size={28} className="text-primary" />,
      features: [
        "Custom LLM/ML build with your data",
        "RAG architecture or fine-tuning",
        "Performance benchmarking",
        "SR&ED documentation provided (35% credit)"
      ]
    },
    {
      id: "04",
      tag: "FAST TRACK",
      title: "Software on Demand",
      description: "A working MVP in 14 days. Not a prototype — production-ready with real users to validate your operational gap.",
      investment: "CAD $8,000 – $18,000",
      timeline: "14 days",
      icon: <Rocket size={28} className="text-primary" />,
      features: [
        "Sprint Zero: process map & validated prototype",
        "Sprint Build: go-live with real users",
        "ROI baseline defined at kickoff",
        "Extend 30d or 50% refund if no impact"
      ]
    },
    {
      id: "05",
      tag: "ONGOING",
      title: "Monthly Retainer",
      description: "Your systems keep improving after delivery. Predictable cost, embedded engineering partnership.",
      investment: "CAD $3,000 – $8,000 / mo",
      timeline: "Ongoing",
      icon: <Repeat size={28} className="text-primary" />,
      features: [
        "Defined hours for improvements & fixes",
        "SLA-backed response time",
        "Priority access for new project scoping",
        "Cancel anytime with 30 days notice"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 uppercase tracking-wider">
            Product Catalog 2026
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Productized Engineering
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            Fixed-scope services. Guaranteed delivery. Canadian entity. Each product is designed to deliver a measurable outcome in a defined timeframe.
          </motion.p>
        </div>

        <div className="space-y-6">
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-primary/50 transition-colors duration-500 relative overflow-hidden group"
            >
              {/* Subtle hover glow inside card */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                {/* Left Col: Core Info */}
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <div className="text-zinc-600 font-serif text-3xl font-black italic leading-none">{product.id}</div>
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-zinc-300 tracking-wider">
                      {product.tag}
                    </span>
                    {product.sred && (
                      <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-bold text-emerald-400 tracking-wider">
                        SR&ED ELIGIBLE
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      {product.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-white pt-1 leading-tight">{product.title}</h3>
                  </div>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                    {product.description}
                  </p>

                  {product.link && (
                    <Link href={product.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors mt-auto">
                      {product.linkText} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* Right Col: Details */}
                <div className="md:w-2/3 flex flex-col sm:flex-row gap-8">
                  <div className="sm:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Investment</div>
                      <div className="text-2xl font-serif font-bold text-white mb-6">{product.investment}</div>
                      
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Timeline</div>
                      <div className="text-lg font-bold text-zinc-300">{product.timeline}</div>
                    </div>
                  </div>

                  <div className="sm:w-1/2">
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">What's included</div>
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
