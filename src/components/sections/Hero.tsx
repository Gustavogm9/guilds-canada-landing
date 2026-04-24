"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Radial fade to soften the grid */}
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)] opacity-80" />
        
        {/* Glow effects */}
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-sm font-medium mb-6">
              Premium Delivery • Global Engineering
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
              Custom Software, Automation & <span className="text-primary italic pr-2">AI Systems</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We build premium, scalable technology solutions designed to accelerate your business. Predictable milestones, uncompromising quality.
          </motion.p>

          {/* B2B Trust Checkmarks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-sm text-foreground font-medium"
          >
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-primary" /> Enterprise-grade contracts</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-primary" /> Strict data governance & compliance</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-primary" /> Full IP ownership</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-primary" /> Fixed-scope milestone delivery</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <a
              href="tel:+13688868127"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium text-lg hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-primary/20"
            >
              Call Our Director
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/diagnostic"
              className="group flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-700 text-white px-8 py-4 rounded-md font-medium text-lg hover:border-primary hover:bg-zinc-800 transition-all w-full sm:w-auto"
            >
              Take Maturity Assessment
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-zinc-400 group-hover:text-primary" />
            </Link>
          </motion.div>

          {/* B2B Trust Bar - Updated from Figma */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12 mt-8 border-t border-muted/50 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-sm font-medium text-foreground/80"
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="text-3xl font-bold text-foreground">50+</span>
              <span>Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="text-3xl font-bold text-foreground">95%</span>
              <span>Client Satisfaction</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <span className="text-3xl font-bold text-foreground">2021</span>
              <span>Operating Since</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
