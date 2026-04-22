"use client";

import { motion } from "framer-motion";
import { ExternalLink, Server, Bot, Activity, Building2, Briefcase, Globe, BrainCircuit, GraduationCap, Pill, ShoppingCart, Users, Rocket, Workflow } from "lucide-react";
import Link from "next/link";

const portfolioItems = [
  {
    id: "health-saas",
    name: "HealthSaaS Platform",
    category: "HealthTech",
    tags: ["Occupational Health", "SaaS", "White-label"],
    status: "In Production",
    description: "A white-label SaaS that lets occupational health administrators onboard companies, psychologists, and employees under one platform. Centralizes health indicators, engagement scores, and action plans.",
    capabilities: [
      "Multi-role access (admin, company, professional, employee)",
      "Custom questionnaire builder with QR code delivery",
      "Health, safety, and engagement KPI dashboards",
      "B2B2C billing logic for white-label administrators"
    ],
    tech: "React, Node.js, PostgreSQL, AWS",
    anchorPrice: "CAD $35,000 – $60,000",
    icon: <Activity className="w-6 h-6 text-emerald-400" />
  },
  {
    id: "org-psych",
    name: "OrgPsych Enterprise",
    category: "HRTech",
    tags: ["Corporate Mental Health", "SaaS", "White-label"],
    status: "In Production",
    description: "Complete operating system for psychologists and organizational consulting firms running corporate mental health programs. Includes lead capture, CRM pipeline, custom diagnostic questionnaires, and executive ROI reports.",
    capabilities: [
      "CRM pipeline for corporate clients",
      "Custom assessment builder with configurable scoring",
      "Intervention scheduling and tracking",
      "White-label multi-brand architecture"
    ],
    tech: "React, Node.js, PostgreSQL, Payment API",
    anchorPrice: "CAD $28,000 – $50,000",
    icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />
  },
  {
    id: "philanthropy-engine",
    name: "Philanthropy Engine",
    category: "InsurTech",
    tags: ["Philanthropy", "E-commerce", "Lottery API"],
    status: "Final Integration",
    description: "Platform for selling philanthropy-linked digital products with automated draws and insurance provider integration. Enables brokers to configure and sell charitable products directly to consumers.",
    capabilities: [
      "Broker-configurable products with philanthropy attribution",
      "Customer auto-account creation on first purchase",
      "RPA-automated draw execution (200+ draws/month)",
      "Insurance provider API integration for compliance"
    ],
    tech: "Cloud Platform, Payment API, RPA Layer",
    anchorPrice: "CAD $22,000 – $40,000",
    icon: <Globe className="w-6 h-6 text-blue-400" />
  },
  {
    id: "prop-data",
    name: "PropData AI",
    category: "PropTech",
    tags: ["AI / ML", "Real Estate Analytics", "Data Platform"],
    status: "In Production",
    description: "Full-stack AI platform for real estate market intelligence — automated scraping, ML pipelines, and actionable analytics. Surfaces market insights for real estate professionals.",
    capabilities: [
      "Automated extraction from 7+ listing platforms",
      "ML models for market trend prediction",
      "Data pipeline orchestration (Extract, Transform, Load)",
      "Real-time analytics dashboard with deep filtering"
    ],
    tech: "Next.js, Python, ML Models, AWS S3",
    anchorPrice: "CAD $45,000 – $80,000",
    icon: <Building2 className="w-6 h-6 text-orange-400" />
  },
  {
    id: "langtech-learn",
    name: "LangTech Learn",
    category: "EdTech",
    tags: ["Language Learning", "EAD Platform", "AI Audio"],
    status: "User Testing",
    description: "Gamified language learning platform with AI-powered pronunciation feedback, daily missions, and institution management. Designed for both institutions and self-directed learners.",
    capabilities: [
      "Daily mission system (listening, speaking, writing)",
      "AI pronunciation feedback and real-time audio scoring",
      "Institution license and cohort management",
      "Mobile-first responsive design"
    ],
    tech: "React, AI Audio Processing, Cloud-hosted",
    anchorPrice: "CAD $28,000 – $50,000",
    icon: <GraduationCap className="w-6 h-6 text-yellow-400" />
  },
  {
    id: "law-firm-os",
    name: "LawFirm OS",
    category: "LegalTech",
    tags: ["Firm Operations", "CRM", "AI Intake"],
    status: "Active Build",
    description: "All-in-one commercial platform for law firms — WhatsApp inbox, AI lead qualification, CRM pipeline, and e-sign proposals in one system. Replaces 3 separate SaaS tools.",
    capabilities: [
      "WhatsApp multi-agent inbox",
      "AI qualification bot (24/7 autonomous intake)",
      "Kanban CRM pipeline auto-filled from lead data",
      "E-sign embedded directly in proposal delivery"
    ],
    tech: "React, Node.js, PostgreSQL, OpenAI API",
    anchorPrice: "CAD $25,000 – $45,000",
    icon: <Briefcase className="w-6 h-6 text-slate-400" />
  },
  {
    id: "nutri-care",
    name: "NutriCare AI",
    category: "HealthTech",
    tags: ["Telehealth", "AI Engagement", "Patient Retention"],
    status: "Active Build",
    description: "Patient management portal with an AI engagement motor that reduces abandonment by 35%+. Deploys an AI agent on WhatsApp that sends personalized daily messages and tracks adherence.",
    capabilities: [
      "Patient portal with health records and planning",
      "Conversational AI agent based on clinical history",
      "Abandonment risk alert system",
      "Progress visualization and engagement dashboard"
    ],
    tech: "React, Node.js, PostgreSQL, OpenAI, WhatsApp API",
    anchorPrice: "CAD $20,000 – $38,000",
    icon: <Bot className="w-6 h-6 text-pink-400" />
  },
  {
    id: "broker-hub",
    name: "BrokerHub",
    category: "PropTech",
    tags: ["Consortium", "WhatsApp AI", "Client Portal"],
    status: "MVP Delivered",
    description: "Integrated digital hub connecting consortium management, real estate inventory, and an AI WhatsApp assistant. Gives salespeople one place to see clients, quotas, and cross-sell opportunities.",
    capabilities: [
      "Consortium and compliance management",
      "AI WhatsApp assistant for inbound inquiries",
      "Cross-sell engine surfacing matched opportunities",
      "Manager dashboard with sales velocity metrics"
    ],
    tech: "React, Node.js, PostgreSQL, Automation Layer",
    anchorPrice: "CAD $18,000 – $32,000",
    icon: <Building2 className="w-6 h-6 text-sky-400" />
  },
  {
    id: "gold-trade",
    name: "CommodityTrade Ops",
    category: "FinTech",
    tags: ["Financial Operations", "Inventory Tracking"],
    status: "Ready to Build",
    description: "Complete financial management system for commodity trading operations — inventory, commissions, cash position, all in one place. Reduces 60 hours/month of admin work.",
    capabilities: [
      "Transaction management with complete audit trail",
      "Automatic commission calculation rules engine",
      "Real-time inventory and cash position tracking",
      "PDF report generation for regulatory compliance"
    ],
    tech: "React, Node.js, PostgreSQL",
    anchorPrice: "CAD $12,000 – $22,000",
    icon: <Server className="w-6 h-6 text-yellow-500" />
  },
  {
    id: "civic-map",
    name: "CivicMapper",
    category: "GovTech",
    tags: ["Urban Mapping", "Gamification", "Crowdsourcing"],
    status: "Ready to Build",
    description: "Gamified urban mapping platform that turns citizens into crowdsourced data collectors. Provides municipalities with real-time, high-density urban data at a fraction of traditional survey costs.",
    capabilities: [
      "Mission system with points, badges, and leaderboards",
      "Interactive real-time city map with element tagging",
      "AI-assisted validation and classification of submissions",
      "Government procurement ready modular architecture"
    ],
    tech: "React, Node.js, PostgreSQL, Mapbox, AI",
    anchorPrice: "CAD $30,000 – $55,000",
    icon: <Globe className="w-6 h-6 text-teal-400" />
  },
  {
    id: "edu-creator",
    name: "EduCreator Biz",
    category: "EdTech",
    tags: ["Student Management", "Digital Products"],
    status: "Proposed",
    description: "Three-phase platform turning an independent educator into a scalable digital education business — automation, student CRM, and full EAD in 90 days.",
    capabilities: [
      "WhatsApp automation for billing and class links",
      "Student CRM with class history and visual progress",
      "EAD platform for course tracks and digital products",
      "Integrated payment gateway"
    ],
    tech: "React, Node.js, PostgreSQL, Automation API",
    anchorPrice: "CAD $18,000 – $38,000",
    icon: <GraduationCap className="w-6 h-6 text-purple-400" />
  },
  {
    id: "med-comm",
    name: "MedComm Bot",
    category: "HealthTech",
    tags: ["Pharmacy", "WhatsApp Automation"],
    status: "Ready to Build",
    description: "Automated WhatsApp system for pharmacies and clinics — prescription confirmations, order status, and patient notifications with response times under 1 second.",
    capabilities: [
      "Prescription ready notifications",
      "Order status updates and delay alerts",
      "Appointment confirmations with automated reminders",
      "Inbound message routing and FAQ answering"
    ],
    tech: "Automation Engine, WhatsApp Business API",
    anchorPrice: "CAD $8,000 – $15,000",
    icon: <Pill className="w-6 h-6 text-rose-400" />
  },
  {
    id: "retail-rx",
    name: "RetailRx Sync",
    category: "HealthTech",
    tags: ["E-commerce", "Operations Automation"],
    status: "Ready to Build",
    description: "Full automation layer between an e-commerce platform and a pharmacy management system — order sync, label generation, and error elimination.",
    capabilities: [
      "Automatic order sync via webhook (zero re-keying)",
      "Shipping label auto-generation",
      "ROI dashboard for daily/monthly savings",
      "Exception handling and retry logic"
    ],
    tech: "Automation Layer, E-commerce API, Webhooks",
    anchorPrice: "CAD $10,000 – $20,000",
    icon: <ShoppingCart className="w-6 h-6 text-green-400" />
  },
  {
    id: "solo-consult",
    name: "SoloConsult CRM",
    category: "HRTech",
    tags: ["Consulting CRM", "Assessment Platform"],
    status: "Ready to Build",
    description: "Operating system for solo organizational psychology consultants — CRM, customizable assessments, QR-coded reports, and integrated billing in one platform.",
    capabilities: [
      "B2B CRM pipeline for corporate clients",
      "Custom diagnostic questionnaires with scoring",
      "Auto-generated PDF reports with QR verification",
      "LGPD/PIPEDA-compliant data architecture"
    ],
    tech: "React, Node.js, PostgreSQL",
    anchorPrice: "CAD $15,000 – $28,000",
    icon: <Users className="w-6 h-6 text-indigo-300" />
  },
  {
    id: "sme-bizos",
    name: "SME BizOS",
    category: "Enterprise",
    tags: ["SME Operations", "Quote Management"],
    status: "Ready to Build",
    description: "All-in-one business operations system for small B2B service businesses — client CRM, PDF quote generation, margin reports, and reorder alerts.",
    capabilities: [
      "Client CRM with purchase history and segments",
      "Branded PDF quote builder auto-populated from data",
      "Margin calculator (cost vs. quote vs. realized)",
      "Inventory alerts and inactive client dashboard"
    ],
    tech: "React, Node.js, PostgreSQL, PDF Generation",
    anchorPrice: "CAD $10,000 – $18,000",
    icon: <Workflow className="w-6 h-6 text-cyan-400" />
  },
  {
    id: "launchpad",
    name: "LaunchPad Digital",
    category: "Marketing",
    tags: ["Brand Launch", "Paid Traffic"],
    status: "Active Engagement",
    description: "Full digital launch package for a new brand — institutional site, social media setup, Meta/Google paid ads, and monthly performance reporting from day one.",
    capabilities: [
      "Conversion-focused institutional site",
      "Meta Pixel + Google Analytics 4 tracking",
      "Paid ad campaigns setup and targeting",
      "Monthly performance reports (CAC, ROAS)"
    ],
    tech: "CMS, Meta Ads API, GA4, Webflow",
    anchorPrice: "CAD $8,000 – $18,000",
    icon: <Rocket className="w-6 h-6 text-red-500" />
  }
];

export function PortfolioGrid() {
  return (
    <section className="py-24 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 uppercase tracking-wider">
            Live Systems & Portfolio
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Production-Ready <br className="hidden md:block"/>
            Engineering
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            These aren't mockups or demos. Every system below was designed, built, and delivered by our team. Explore how we solve complex operational problems across sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-primary/30 transition-colors flex flex-col group"
            >
              <div className="p-8 border-b border-zinc-800 bg-zinc-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white font-serif">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs font-bold text-zinc-400 uppercase">{item.category}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                          {item.status.includes("Production") || item.status.includes("Active") || item.status.includes("Live") ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                          )}
                          <span className={item.status.includes("Production") || item.status.includes("Active") || item.status.includes("Live") ? "text-emerald-400" : "text-zinc-400"}>
                            {item.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 relative z-10">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-2 relative z-10">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-medium text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between bg-zinc-900/30">
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Key Capabilities</h4>
                  <ul className="space-y-3 mb-8">
                    {item.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                        <span className="leading-tight">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-zinc-800/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div>
                      <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Tech Stack</div>
                      <div className="text-sm font-medium text-zinc-300">{item.tech}</div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">Build something like this</div>
                      <div className="text-lg font-serif font-bold text-white">{item.anchorPrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-3xl bg-zinc-900 border border-primary/20 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />
          <h3 className="text-3xl font-serif font-bold text-white mb-4 relative z-10">Need a system tailored to your operation?</h3>
          <p className="text-zinc-400 mb-8 relative z-10 text-lg">
            All prices listed above are indicative. The confirmed price comes after a scoping session. Book a discovery call to map out what makes sense for your business.
          </p>
          <Link 
            href="/#contact"
            className="relative z-10 inline-flex items-center justify-center h-14 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors text-lg shadow-lg shadow-primary/20"
          >
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </section>
  );
}
