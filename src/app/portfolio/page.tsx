import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Systems & Portfolio | Guilds Canada",
  description: "Explore the custom software, automation, and AI systems built by Guilds Canada. Tangible engineering across HealthTech, PropTech, LegalTech, and more.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
}
