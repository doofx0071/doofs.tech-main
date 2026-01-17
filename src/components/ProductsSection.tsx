import { motion } from 'framer-motion';
import { products } from '@/data/products';
import CardSwap, { Card } from './CardSwap';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 overflow-hidden" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight leading-[1.1]">
            The Core Ecosystem
          </h2>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-4">
            Verified Live Applications
          </p>
          <p className="text-muted-foreground text-sm lg:text-base max-w-xl mx-auto leading-relaxed mt-6">
            A curated collection of developer tools and products. Each project is live, 
            actively maintained, and built with a focus on simplicity and utility.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{products.length}</span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Live Products</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-foreground">∞</span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Ideas Shipping</p>
            </div>
          </div>
        </motion.div>

        {/* Card Swap - Full Width Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full flex items-center justify-center h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px]"
        >
          <CardSwap
            cardDistance={60}
            verticalDistance={30}
            delay={5000}
            pauseOnHover={true}
            skewAmount={2}
            easing="elastic"
          >
            {products.map((product, index) => (
              <Card key={product.id}>
                <ProductCard product={product} index={index} />
              </Card>
            ))}
          </CardSwap>
        </motion.div>

        {/* Instruction */}
        <p className="text-xs text-muted-foreground/60 font-mono text-center mt-8">
          Hover to pause • Cards auto-swap every 5s
        </p>
      </div>
    </section>
  );
};

export default ProductsSection;
