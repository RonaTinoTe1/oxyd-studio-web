import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LucideIcon, Lightbulb } from 'lucide-react';

// Neuro-Architecture: Micro-insights à intervalles réguliers = récompenses variables (dopamine)
// Version avec animations persuasives améliorées

interface InsightBreakProps {
  icon: LucideIcon;
  stat: string;
  insight: string;
  source?: string;
}

export function InsightBreak({ icon: Icon, stat, insight, source }: InsightBreakProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated line top */}
      <motion.div
        className="absolute left-1/2 top-0 w-px h-6 bg-gradient-to-b from-transparent to-primary/30"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ transformOrigin: 'top' }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon with pulse animation */}
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={isInView ? { 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          </motion.div>
          
          {/* Stat with dramatic reveal */}
          <motion.div
            className="text-4xl md:text-5xl font-bold text-primary mb-3 relative"
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 150 }}
          >
            <motion.span
              animate={isInView ? { 
                textShadow: [
                  '0 0 0px rgba(37, 99, 235, 0)',
                  '0 0 20px rgba(37, 99, 235, 0.4)',
                  '0 0 0px rgba(37, 99, 235, 0)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {stat}
            </motion.span>
          </motion.div>
          
          {/* Insight text with stagger */}
          <motion.p
            className="text-lg text-foreground font-medium mb-2"
            initial={{ y: 15, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            {insight}
          </motion.p>
          
          {/* Source with subtle animation */}
          {source && (
            <motion.div
              className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <Lightbulb className="w-3 h-3 text-primary/50" />
              <span>Source : {source}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Animated line bottom */}
      <motion.div
        className="absolute left-1/2 bottom-0 w-px h-6 bg-gradient-to-t from-transparent to-primary/30"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ transformOrigin: 'bottom' }}
      />
    </motion.div>
  );
}
