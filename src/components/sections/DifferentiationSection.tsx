import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { StaggerContainer, StaggerItem } from '@/components/effects/StaggerContainer';

// Système 1: Comparaison binaire = décision facile (X vs ✓)
// Version avec animations persuasives

interface RowProps {
  left: string;
  right: string;
}

function ComparisonRow({ left, right }: RowProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 py-3 border-b border-border/20 last:border-0 group"
      whileHover={{ backgroundColor: 'rgba(37, 99, 235, 0.03)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Agence classique */}
      <motion.div 
        className="flex items-center gap-2 text-muted-foreground/70"
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <X className="w-4 h-4 flex-shrink-0 text-muted-foreground/50 group-hover:text-destructive/50 transition-colors" />
        </motion.div>
        <span className="text-sm">{left}</span>
      </motion.div>
      
      {/* Nous */}
      <motion.div 
        className="flex items-center gap-2 text-foreground"
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Check className="w-4 h-4 flex-shrink-0 text-primary group-hover:text-primary transition-colors" />
        </motion.div>
        <span className="text-sm font-medium">{right}</span>
      </motion.div>
    </motion.div>
  );
}

export function DifferentiationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const comparisons = [
    { left: "Ils décorent", right: "On convertit" },
    { left: "Ils facturent et partent", right: "On suit et on optimise" },
    { left: "Ils devinent", right: "On mesure" },
    { left: "Ils promettent du trafic", right: "On vise le profit mesurable" },
    { left: "Ils fixent un prix", right: "On calcule un objectif de ROI" }
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-destructive/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"
        animate={{ 
          x: [-50, 0, -50],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"
        animate={{ 
          x: [50, 0, 50],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </motion.div>
            <span className="text-xs text-primary font-medium">La différence</span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Eux promettent.{' '}
            <motion.span 
              className="text-primary"
              animate={isInView ? { 
                textShadow: [
                  '0 0 0px transparent',
                  '0 0 15px rgba(37, 99, 235, 0.4)',
                  '0 0 0px transparent'
                ]
              } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              Nous prouvons.
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Tableau comparatif */}
        <div className="max-w-2xl mx-auto">
          {/* Headers */}
          <motion.div
            className="grid grid-cols-2 gap-4 pb-3 mb-2 border-b border-border"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <motion.span 
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              initial={{ x: -10 }}
              animate={isInView ? { x: 0 } : { x: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Agence classique
            </motion.span>
            <motion.span 
              className="text-xs font-medium text-primary uppercase tracking-wider"
              initial={{ x: 10 }}
              animate={isInView ? { x: 0 } : { x: 10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Notre approche
            </motion.span>
          </motion.div>
          
          {/* Rows with HoverCard3D */}
          <HoverCard3D intensity={3}>
            <motion.div 
              className="glass-card p-5 md:p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <StaggerContainer staggerDelay={0.08} initialDelay={0.3}>
                {comparisons.map((item, index) => (
                  <StaggerItem key={index}>
                    <ComparisonRow {...item} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </HoverCard3D>
        </div>

        {/* Bottom badge */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ scale: 1.02 }}
          >
            <Check className="w-4 h-4 text-primary" />
            Même marché. Autre méthode. Meilleurs résultats.
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
