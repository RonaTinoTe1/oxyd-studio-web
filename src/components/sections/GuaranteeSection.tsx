import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, CheckCircle2, ArrowRight, HelpCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { StaggerContainer, StaggerItem } from '@/components/effects/StaggerContainer';
import { HighlightTruism } from '@/components/effects/HighlightTruism';

// Hick's Law: Risk reversal + ONE CTA. FAQ is progressive disclosure (not choice).

export function GuaranteeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleCTAClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const guaranteePoints = [
    "Objectifs de performance définis ensemble lors du diagnostic",
    "KPIs mesurables et vérifiables (taux de conversion, leads générés, etc.)",
    "Phase pilote de 90 jours pour valider les résultats",
    "Si moins de 80% des objectifs atteints : remboursement intégral du setup"
  ];

  const faqItems = [
    { question: "Comment sont définis les objectifs ?", answer: "Lors du diagnostic gratuit, nous analysons vos données actuelles et définissons ensemble des objectifs réalistes. Par exemple : passer de 0.5% à 1.5% de conversion. Ces objectifs sont contractualisés." },
    { question: "Que se passe-t-il si les objectifs ne sont pas atteints ?", answer: "Si après 90 jours le système n'a pas atteint 80% des objectifs convenus, nous remboursons intégralement les frais de setup. Vous conservez tout le travail réalisé." },
    { question: "Pourquoi 80% et pas 100% ?", answer: "Les performances dépendent aussi de facteurs externes. Le seuil de 80% garantit que le système fonctionne tout en restant réaliste. Dans la pratique, nos clients dépassent généralement 100% des objectifs." }
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
        >
          <HoverCard3D intensity={4}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12">
              <motion.div 
                className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Garantie de performance</span>
                </motion.div>

                {/* Yes Set: truismes avant la promesse */}
                <motion.div
                  className="space-y-1.5 mb-6"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {[
                    "Vous en avez assez des promesses sans preuves.",
                    "Vous voulez des résultats mesurables, pas des mots.",
                    "Et vous méritez un partenaire qui assume ses engagements."
                  ].map((truism, i) => (
                    <HighlightTruism key={i} delay={0.12 + i * 0.2} isInView={isInView}>
                      {truism}
                    </HighlightTruism>
                  ))}
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  Votre investissement est
                  <br />
                  <motion.span 
                    className="text-primary"
                    animate={isInView ? { textShadow: ['0 0 0px transparent', '0 0 25px rgba(37, 99, 235, 0.5)', '0 0 0px transparent'] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    100% protégé.
                  </motion.span>
                </motion.h2>

                <motion.p
                  className="text-lg text-muted-foreground mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                >
                  On définit ensemble des objectifs <span className="text-foreground font-medium">mesurables</span>. 
                  Si on ne les atteint pas, le setup est <span className="text-foreground font-medium">remboursé</span>.
                </motion.p>

                <StaggerContainer className="space-y-3 mb-8" staggerDelay={0.1} initialDelay={0.25}>
                  {guaranteePoints.map((point, index) => (
                    <StaggerItem key={index}>
                      <motion.div className="flex items-start gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <motion.div
                  className="p-4 rounded-xl bg-secondary/50 border border-border/50 mb-8"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  whileHover={{ borderColor: 'rgba(37, 99, 235, 0.3)' }}
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Exemple :</span> Votre site convertit à 0.5%. Objectif : 1.5% en 90 jours. 
                      Si vous êtes à moins de 1.2% (80%), on rembourse le setup.
                    </p>
                  </div>
                </motion.div>

                {/* ONE CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                >
                  <MagneticButton strength={0.2}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        size="lg"
                        className="font-semibold group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden"
                        onClick={handleCTAClick}
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
              </div>
            </div>
          </HoverCard3D>

          {/* FAQ: Progressive disclosure, not choice */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Questions fréquentes</span>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-sm text-foreground hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
