import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Bot, TrendingUp } from 'lucide-react';

function MiniGraph() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative h-24 w-full mt-4">
      <svg 
        viewBox="0 0 200 60" 
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line x1="0" y1="15" x2="200" y2="15" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="0" y1="45" x2="200" y2="45" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        
        {/* The growth line */}
        <motion.path
          d="M 0 55 Q 50 50 100 35 T 200 5"
          fill="none"
          stroke="hsl(217, 91%, 60%)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        
        {/* Glow effect */}
        <motion.path
          d="M 0 55 Q 50 50 100 35 T 200 5"
          fill="none"
          stroke="hsl(217, 91%, 60%)"
          strokeWidth="6"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </svg>
      
      {/* Labels */}
      <div className="absolute bottom-0 left-0 text-xs text-muted-foreground data-text">0.05%</div>
      <div className="absolute top-0 right-0 text-xs text-primary data-text font-medium">0.15%</div>
    </div>
  );
}

export function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {/* Card 1: Neuro-Engineering (Large - spans 2 rows on desktop) */}
          <motion.div
            className="glass-card p-8 md:p-10 lg:row-span-2 flex flex-col justify-between min-h-[300px] lg:min-h-[450px] group"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 headline-tight">
                Neuro-Engineering
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We restructure your pricing pages using the Decoy Effect and Price Anchoring to make high-ticket offers irrational to refuse.
              </p>
            </div>
            <div className="mt-8 text-xs text-muted-foreground/60 uppercase tracking-widest">
              Behavioral Psychology
            </div>
          </motion.div>

          {/* Card 2: The AI Clone (Medium - top right) */}
          <motion.div
            className="glass-card p-8 flex flex-col justify-between min-h-[200px] group lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 headline-tight">
                The AI Clone
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We train an AI Agent on your brain. It answers 10,000+ comments and closes deals 24/7 with your exact tone.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Yield Metrics (Small - bottom right with graph) */}
          <motion.div
            className="glass-card p-8 flex flex-col justify-between min-h-[220px] group lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 headline-tight">
                Yield Metrics
              </h3>
              <p className="text-muted-foreground text-sm">
                Mathematical Growth.
              </p>
            </div>
            <MiniGraph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
