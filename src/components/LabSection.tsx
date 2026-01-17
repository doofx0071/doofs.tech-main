import { motion } from 'framer-motion';
import { Beaker, Lightbulb, Pause, Wrench } from 'lucide-react';
import { labProjects, LabProject } from '@/data/products';

const statusConfig = {
  idea: {
    icon: Lightbulb,
    label: 'Idea',
    className: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  },
  building: {
    icon: Wrench,
    label: 'Building',
    className: 'text-primary bg-primary/10 border-primary/30',
  },
  paused: {
    icon: Pause,
    label: 'Paused',
    className: 'text-muted-foreground bg-muted border-border',
  },
};

const LabProjectItem = ({ project, index }: { project: LabProject; index: number }) => {
  const config = statusConfig[project.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-12 bottom-0 w-px bg-border group-last:hidden" />
      
      <div className="flex gap-6">
        {/* Status Icon */}
        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border ${config.className}`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 pb-12">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </h4>
            <span className={`shrink-0 text-xs font-mono px-2 py-1 rounded border ${config.className}`}>
              {config.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {project.description}
          </p>
          {project.eta && (
            <span className="text-xs font-mono text-muted-foreground">
              ETA: {project.eta}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const LabSection = () => {
  return (
    <section className="px-6 py-32 relative overflow-hidden" id="lab">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        
        {/* Floating beakers/icons */}
        <div className="absolute top-1/4 right-1/4 text-muted/10">
          <Beaker className="w-32 h-32" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// Lab</span>
            <div className="h-px flex-1 bg-border" />
            <Beaker className="w-4 h-4 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What's <span className="text-primary">brewing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Ideas, experiments, and half-baked concepts that might become real products someday. 
            Building in public means sharing the messy parts too.
          </p>
        </motion.div>

        {/* Projects Timeline */}
        <div className="relative">
          {labProjects.map((project, index) => (
            <LabProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-8 border border-dashed border-border rounded-lg text-center bg-muted/20"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Have an idea or want to collaborate?
          </p>
          <a
            href="https://twitter.com/doofs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Let's talk on Twitter →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LabSection;
