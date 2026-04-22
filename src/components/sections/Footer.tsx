import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-muted/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-4 inline-block">
              Guilds<span className="text-primary">.</span>
            </Link>
            <p className="text-secondary-foreground/60 max-w-sm mt-4">
              Premium technology solutions, engineered for scale. We build the software that runs your business.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-secondary-foreground/60 text-sm">
              <li><Link href="/diagnostic" className="hover:text-primary transition-colors">Digital Diagnostic</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Process Automation</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">AI Solutions</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">14-Day MVP</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-secondary-foreground/60 text-sm">
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio & Live Systems</Link></li>
              <li><Link href="/#process" className="hover:text-primary transition-colors">How We Work</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-muted/10 flex flex-col md:flex-row items-center justify-between text-sm text-secondary-foreground/40">
          <p>© {new Date().getFullYear()} Guilds. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Toronto</span>
            <span>•</span>
            <span>Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
