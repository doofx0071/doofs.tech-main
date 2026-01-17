import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Product } from '@/data/products';
import StatusBadge from './StatusBadge';

interface ProductShowcaseProps {
  product: Product;
  index: number;
  reversed?: boolean;
}

const ProductShowcase = ({ product, index, reversed = false }: ProductShowcaseProps) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] lg:min-h-[500px] ${
        reversed ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Content Side */}
      <div 
        className={`flex flex-col justify-between p-8 lg:p-12 bg-card border border-border ${
          reversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div>
          {/* Meta Row */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono text-muted-foreground">{formattedIndex}</span>
            <span className="text-xs text-muted-foreground">—</span>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">{product.category}</span>
            <StatusBadge status={product.status} />
          </div>

          {/* Product Name */}
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground uppercase tracking-tight leading-[1.1] mb-6">
            {product.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm lg:text-base max-w-md leading-relaxed">
            {product.tagline}
          </p>

          {/* Use Cases (if features exist) */}
          {product.features && (
            <div className="mt-6">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Use Case</span>
              <p className="text-xs text-muted-foreground mt-1">
                {product.features.join(', ')}.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 mt-8">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
          >
            Open App
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {product.github && (
            <a
              href={product.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Github
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Image Side */}
      <div 
        className={`group relative overflow-hidden bg-muted min-h-[300px] lg:min-h-full ${
          reversed ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Product Image with grayscale to color effect */}
        {product.image ? (
          <div className="absolute inset-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ) : (
          /* Fallback Pattern when no image */
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id={`grid-${product.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect width="9" height="9" fill="currentColor" className="text-muted-foreground/20" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${product.id})`} />
              </svg>
            </div>
            {/* Product name as background text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl lg:text-8xl font-bold text-muted-foreground/10 uppercase tracking-widest">
                {product.name.split(' ')[0]}
              </span>
            </div>
          </div>
        )}
        
        {/* Accent blocks at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 flex z-10">
          <div className="flex-1 bg-primary/80" />
          <div className="flex-1 bg-muted-foreground/40" />
          <div className="flex-1 bg-primary/60" />
          <div className="flex-1 bg-muted-foreground/20" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductShowcase;
