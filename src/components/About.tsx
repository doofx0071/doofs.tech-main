import { motion } from 'framer-motion';
import { Code2, Rocket, Zap } from 'lucide-react';

const principles = [
  {
    number: "01",
    icon: Code2,
    title: "Developer-First",
    description: "Tools built by developers, for developers. No unnecessary complexity, no bloated features. Just what you need to get things done.",
    highlight: "Clean APIs. Zero friction."
  },
  {
    number: "02", 
    icon: Rocket,
    title: "Ship Fast",
    description: "Build, launch, learn, iterate. Every product starts as an experiment. Perfection is the enemy of progress.",
    highlight: "Ideas → Production in days."
  },
  {
    number: "03",
    icon: Zap,
    title: "Real Products",
    description: "Not just demos or weekend hacks. Each product is live, used, and actively maintained. Real users, real feedback, real improvements.",
    highlight: "Battle-tested. Always evolving."
  }
];

const About = () => {
  return (
    <section className="px-6 py-32 relative overflow-hidden" id="about">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-muted/5 select-none tracking-tighter">
          BUILD
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// About</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 max-w-3xl leading-tight">
            An ecosystem of tools built for{' '}
            <span className="text-primary">builders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Doofs is where side projects become real products. Built by someone who believes in 
            shipping fast, iterating in public, and creating tools that developers actually want to use.
          </p>
        </motion.div>

        {/* Timeline-style principles */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 hidden md:block" />
          
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex flex-col md:flex-row items-start gap-8 mb-20 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content side */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <span className="text-6xl font-black text-muted/20">{principle.number}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-3">
                  {index % 2 !== 0 && <principle.icon className="w-6 h-6 text-primary" />}
                  {principle.title}
                  {index % 2 === 0 && <principle.icon className="w-6 h-6 text-primary" />}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  {principle.description}
                </p>
                <span className="inline-block text-sm font-mono text-primary border border-primary/30 px-3 py-1 rounded-full">
                  {principle.highlight}
                </span>
              </div>

              {/* Center dot - desktop only */}
              <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20" />

              {/* Empty side for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-32 pt-16 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Live Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2024</div>
              <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Est. Year</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Ideas Brewing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Open Building</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
