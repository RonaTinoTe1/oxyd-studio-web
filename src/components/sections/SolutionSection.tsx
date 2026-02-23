import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Workflow, Bot, Magnet, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { StaggerContainer, StaggerItem } from '@/components/effects/StaggerContainer';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { useScrollTo } from '@/hooks/useScrollTo';

// Hick's Law: Cards are informational only. ONE CTA at section bottom.

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  result: string;
}

function SolutionCard({ icon, title, description, result }: SolutionCardProps) {
  return (
    <HoverCard3D intensity={8}>
      <motion.div
        className="glass-card p-6 rounded-2xl transition-all duration-300 h-full hover:border-primary/20"
        whileHover={{ boxShadow: '0 0 20px rgba(37, 99, 235, 0.1)' }}
      >
        <div className="flex items-start gap-4 mb-3">
          <motion.div 
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-secondary text-primary/80"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-border/30">
          <span className="text-muted-foreground">Résultat:</span>
          <motion.span className="text-primary font-semibold" whileHover={{ scale: 1.05 }}>
            {result}
          </motion.span>
        </div>
      </motion.div>
    </HoverCard3D>
  );
}

export function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const scrollTo = useScrollTo();

  const solutions = [
    { icon: <Workflow className="w-5 h-5" />, title: "On structure, ça convertit", description: "Chaque page, chaque bouton, chaque mot — optimisé pour le rendement.", result: "Objectif : ×2 à ×3" },
    { icon: <Bot className="w-5 h-5" />, title: "L'IA répond, vous signez", description: "Un assistant entraîné sur votre expertise qui qualifie vos prospects, 24h/24.", result: "Disponible jour et nuit" },
    { icon: <Magnet className="w-5 h-5" />, title: "On attire, vous choisissez", description: "Les bons prospects viennent à vous. Automatiquement.", result: "Flux de leads continu" },
    { icon: <Search className="w-5 h-5" />, title: "On mesure, vous décidez", description: "Audit chiffré de votre rendement actuel. Aucune supposition.", result: "Diagnostic offert" }
  ];

  return (
    <section id="solutions" className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          ref={ref}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          >
            <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </motion.div>
            <span className="text-xs text-primary font-medium">L'infrastructure</span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            On construit. Ça tourne.{' '}
            <motion.span 
              className="text-primary"
              animate={isInView ? { textShadow: ['0 0 0px transparent', '0 0 15px rgba(37, 99, 235, 0.4)', '0 0 0px transparent'] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              Vous encaissez.
            </motion.span>
          </motion.h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Moins d'effort, plus de rendement. Zéro friction, maximum traction.
          </p>
        </motion.div>

        <StaggerContainer className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto" staggerDelay={0.12} initialDelay={0.15}>
          {solutions.map((solution) => (
            <StaggerItem key={solution.title}>
              <SolutionCard {...solution} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ONE CTA for the whole section */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <MagneticButton strength={0.2}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg"
                className="font-semibold group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden"
                onClick={() => scrollTo('contact')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10 flex items-center">
                  Réserver mon diagnostic gratuit
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {['Installation en 2-4 semaines', 'Aucune compétence technique requise', 'Support 6 mois inclus'].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
