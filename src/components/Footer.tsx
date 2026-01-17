import { Github, Twitter } from 'lucide-react';
import { products } from '@/data/products';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-0.5 mb-6">
              <span className="text-2xl font-bold uppercase tracking-tight">Doofs</span>
              <span className="text-2xl font-bold text-muted-foreground">.</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              A personal product ecosystem hub and indie product lab focused on building and shipping useful developer tools and experiments.
            </p>
          </div>

          {/* Spacer */}
          <div className="lg:col-span-3" />

          {/* Ecosystem Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.id}>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors"
                  >
                    {product.name.split(' ')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Social
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} doofs.tech | All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-red-500">♥</span> by doofs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
