"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-secondary text-secondary-foreground rounded-3xl p-10 md:p-16 border border-muted/20 shadow-2xl"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your Engineering?
          </h2>
          <p className="text-lg text-secondary-foreground/70 mb-10 max-w-2xl mx-auto">
            Book a free discovery call with our tech leads. We'll discuss your current bottlenecks, evaluate your architecture, and provide a clear roadmap forward.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+13688868127" className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20">
              Call Us Directly
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <p className="mt-6 text-sm text-secondary-foreground/50">
            No commitment required. Strictly confidential.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
