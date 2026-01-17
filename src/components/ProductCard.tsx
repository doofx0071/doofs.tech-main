import { ExternalLink, Github } from 'lucide-react';
import { Product } from '@/data/products';
import StatusBadge from './StatusBadge';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <div className="w-full h-full flex flex-col bg-card">
      {/* Large Image Section - Takes most of the card */}
      <div className="relative flex-1 min-h-0 overflow-hidden bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-4xl sm:text-6xl font-bold text-primary/30">{product.name.charAt(0)}</span>
          </div>
        )}
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        
        {/* Content overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-mono text-white/70 tracking-wider">{product.category}</span>
            <StatusBadge status={product.status} />
          </div>
          
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg uppercase tracking-tight">
            {product.name}
          </h3>
          
          <p className="text-white/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 drop-shadow-md max-w-2xl">
            {product.tagline}
          </p>
          
          {/* Action buttons */}
          <div className="flex gap-3 sm:gap-6">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:text-primary transition-colors"
            >
              Open App
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
            {product.github && (
              <a
                href={product.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
              >
                Github
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
