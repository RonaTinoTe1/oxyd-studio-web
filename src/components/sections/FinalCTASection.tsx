import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { HighlightTruism } from '@/components/effects/HighlightTruism';
import { useScrollTo } from '@/hooks/useScrollTo';

// Hick's Law: Pure urgency + ONE button. Zero distractions.

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const scrollTo = useScrollTo();

  return (
    <section className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[500px] h-[300px] bg-primary/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          ref={ref}
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Yes Set: séquence de validation finale */}
          <motion.div
            className="max-w-lg mx-auto mb-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {[
              "Vous êtes arrivé jusqu'ici.",
              "Vous avez vu les chiffres. Vous avez compris le coût.",
              "La seule question, c'est : quand ?"
            ].map((truism, i) => (
              <HighlightTruism key={i} delay={0.1 + i * 0.2} isInView={isInView}>
                {truism}
              </HighlightTruism>
            ))}
          </motion.div>

          {/* Cost context */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            <div className="glass-card px-6 py-3 rounded-full">
              <span className="text-sm text-muted-foreground">
                Chaque jour d'attente = du CA potentiel en moins
              </span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Un jour sans système,
            <br />
            <motion.span 
              className="text-destructive"
              animate={isInView ? { 
                textShadow: ['0 0 0px transparent', '0 0 20px rgba(239, 68, 68, 0.4)', '0 0 0px transparent']
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              c'est un jour sans rendement.
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            30 minutes pour voir. 90 jours pour transformer.
          </motion.p>

          {/* ONE button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <MagneticButton strength={0.2}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="xl"
                  className="font-semibold group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden"
                  onClick={() => scrollTo('contact')}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Réserver mon diagnostic gratuit
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
