import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useScrollTo } from '@/hooks/useScrollTo';

export function HeroSection() {
  const scrollTo = useScrollTo();

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo / Title */}
          <motion.h1
            id="hero-heading"
            className="mb-6 text-5xl font-bold tracking-[-0.04em] leading-none md:text-7xl lg:text-8xl text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            OXYD STUDIO
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg text-muted-foreground md:text-xl lg:text-2xl font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We build AI that makes real contact.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => scrollTo('project')}
              className="group inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg p-4"
              aria-label="See what we're building"
            >
              <span className="text-sm tracking-widest uppercase">See what we're building</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
