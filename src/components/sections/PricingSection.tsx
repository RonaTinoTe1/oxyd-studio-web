import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { HighlightTruism } from '@/components/effects/HighlightTruism';
import { useScrollTo } from '@/hooks/useScrollTo';

// Hick's Law: ONE plan. No comparison. No choice paralysis.

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const scrollTo = useScrollTo();

  const valueProps = [
    "Architecture de conversion installée",
    "IA conversationnelle déployée 24/7",
    "Machine à prospection automatisée",
    "Performance mesurée sur 90 jours",
    "Support et optimisation 6 mois",
    "Reporting mensuel détaillé",
    "Garantie : objectifs ou remboursement setup"
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-28 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          >
            <Star className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">Investissement</span>
          </motion.div>

          {/* Yes Set: truismes avant le prix */}
          <motion.div
            className="max-w-md mx-auto mb-5 space-y-1.5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            {[
              "Vous investissez déjà dans votre trafic.",
              "Vous savez qu'un site qui ne convertit pas coûte plus cher qu'un site qui convertit.",
              "Alors autant investir là où le retour est garanti."
            ].map((truism, i) => (
              <HighlightTruism key={i} delay={0.1 + i * 0.2} isInView={isInView}>
                {truism}
              </HighlightTruism>
            ))}
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            Un investissement,{' '}
            <motion.span 
              className="text-primary"
              animate={isInView ? { 
                textShadow: ['0 0 0px transparent', '0 0 15px rgba(37, 99, 235, 0.4)', '0 0 0px transparent']
              } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              pas une dépense
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* ONE card. ONE option. */}
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <HoverCard3D intensity={4}>
            <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/40">
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">Système de Performance</h3>
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-foreground mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  9 000€ — 15 000€
                </motion.div>
                <p className="text-sm text-muted-foreground">
                  Infrastructure complète. Vous ne touchez à rien.
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {valueProps.map((prop, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    whileHover={{ x: 3 }}
                  >
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <span className="text-foreground">{prop}</span>
                  </motion.li>
                ))}
              </ul>
              
              <MagneticButton strength={0.15} className="w-full">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => scrollTo('contact')}
                    className="w-full h-14 text-base font-semibold group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative z-10 flex items-center justify-center w-full">
                      Réserver mon diagnostic gratuit
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
              </MagneticButton>
            </div>
          </HoverCard3D>
        </motion.div>

        {/* Single guarantee badge */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm"
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(37, 99, 235, 0.15)' }}
          >
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Shield className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">Garantie 90 jours</span> — Objectifs atteints ou remboursement du setup
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
