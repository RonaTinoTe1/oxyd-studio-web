import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';

export function ProjectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="project"
      className="relative min-h-[80svh] flex items-center py-32"
      aria-labelledby="project-heading"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              In development
            </span>
          </motion.div>

          {/* Project name */}
          <motion.h2
            id="project-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ALTER EGO
          </motion.h2>

          {/* Description */}
          <motion.div
            className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              A persistent AI cognitive system. Not a chatbot — a digital entity that remembers,
              evolves, and operates autonomously.
            </p>
            <p>
              Living memory. Continuous learning loops. Real-time adaptation.
              Built to think alongside you, not just respond to you.
            </p>
          </motion.div>

          {/* GitHub link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="https://github.com/RonaTinoTe1/alter-ego"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm tracking-wide">View on GitHub</span>
              <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
