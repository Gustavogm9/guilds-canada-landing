"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Crosshair, Coins, CheckSquare, LifeBuoy } from "lucide-react";

export function Process() {
  const steps = [
    {
      icon: <Crosshair className="w-6 h-6 text-primary" />,
      title: "Scope First",
      description: "We define exactly what we're building, what success looks like, and what it costs — before you commit to anything."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Fixed Price",
      description: "No hourly billing surprises or scope creep. The investment you agree to is the exact price you pay."
    },
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: "Milestone Payments",
      description: "You pay in stages, when agreed milestones are delivered and accepted. Not upfront, not at the end."
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-primary" />,
      title: "Outcome Defined",
      description: "Every project starts with a measurable baseline. If we don't move the needle, we know it immediately."
    },
    {
      icon: <LifeBuoy className="w-6 h-6 text-primary" />,
      title: "90-Day Support",
      description: "Every project includes a 90-day support window post-delivery. Not a separate contract, built in."
    }
  ];

  return (
    <section id="process" className="py-24 bg-zinc-950 border-y border-zinc-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="md:w-1/3">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 uppercase tracking-wider">
              Risk Mitigation
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              How Every Project Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-400 leading-relaxed"
            >
              Regardless of the product you choose, our delivery methodology is designed to completely eliminate financial and technical risk for your business.
            </motion.p>
          </div>

          <div className="md:w-2/3">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg shadow-black/50">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
