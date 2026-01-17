import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center px-6 lg:px-12 py-12 lg:py-16 overflow-hidden bg-card">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-muted-foreground/[0.03] uppercase tracking-widest whitespace-nowrap select-none pointer-events-none">
          DOOFS
        </div>
        
        {/* Geometric shapes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Grid pattern */}
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
          
          {/* Floating geometric shapes */}
          <circle cx="15%" cy="25%" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/10" />
          <circle cx="85%" cy="70%" r="120" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/10" />
          <rect x="70%" y="15%" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/5" transform="rotate(45 750 100)" />
          <polygon points="100,20 120,60 80,60" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/10" transform="translate(50, 300)" />
        </svg>

        {/* Gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-muted-foreground/5 to-transparent" />
      </div>

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-12 bg-gradient-to-b from-primary/20 via-muted-foreground/10 to-muted hidden lg:block" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]"
            >
              Products
              <br />
              <span className="text-muted-foreground">By</span>{' '}
              <span className="relative inline-block">
                Doofs
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-sm lg:text-base text-muted-foreground max-w-md leading-relaxed"
            >
              A personal product ecosystem hub and indie product lab. We build, document, and ship tools designed to solve specific problems for developers and businesses.
            </motion.p>

            <motion.button
              onClick={scrollToProducts}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-wider hover:bg-primary transition-colors"
            >
              Explore Apps
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right Side - Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex flex-col items-end justify-center"
          >
            <div className="space-y-1 text-xs font-mono text-muted-foreground text-right">
              <p>ECOSYSTEM V1.0</p>
              <p>STATUS: ALL GREEN</p>
              <p>UPTIME: 99.9%</p>
            </div>
            
            {/* Abstract decorative element */}
            <div className="mt-6 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="w-2 bg-primary/60 origin-bottom"
                  style={{ height: `${20 + Math.random() * 40}px` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
