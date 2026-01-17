import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { useTheme } from '@/hooks/use-theme';
import logoLight from '@/assets/doofs-logo-light.svg';
import logoDark from '@/assets/doofs-logo-dark.svg';

const Header = () => {
  const { theme } = useTheme();
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 md:gap-2 font-mono font-bold text-base md:text-xl tracking-tight">
          <img
            key={theme}
            src={theme === "dark" ? logoDark : logoLight}
            alt="doofs.tech logo"
            className="h-6 md:h-8 w-auto"
          />
          <span>doofs<span className="text-muted-foreground text-[10px] sm:text-xs">.tech</span></span>
        </a>

        {/* Nav - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#products" 
            onClick={(e) => scrollToSection(e, 'products')}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Products
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a 
            href="#lab" 
            onClick={(e) => scrollToSection(e, 'lab')}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Lab
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
