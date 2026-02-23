import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { StaggerContainer, StaggerItem } from '@/components/effects/StaggerContainer';

// Système 1: Timeline = structure familière, progression naturelle
// Version avec animations de révélation améliorées

interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

function ProcessStep({ number, title, description, isLast }: StepProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Numéro dans cercle avec animation pulse */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 font-bold text-lg"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 25px rgba(37, 99, 235, 0.4)'
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {number}
      </motion.div>
      
      {/* Contenu */}
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-[180px]">
        {description}
      </p>
      
      {/* Ligne de connexion animée (desktop) */}
      {!isLast && (
        <motion.div
          className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Version mobile avec animation
function MobileStep({ number, title, description, isLast }: StepProps) {
  return (
    <motion.div
      className="relative flex gap-4"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <motion.div
          className="z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)'
          }}
        >
          {number}
        </motion.div>
        
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 overflow-hidden"
          >
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary to-primary/30"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        )}
      </div>
      
      {/* Contenu */}
      <div className={isLast ? '' : 'pb-8'}>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const steps = [
    { number: "1", title: "On écoute", description: "30 min. Votre business, vos chiffres, vos freins." },
    { number: "2", title: "On dissèque", description: "Audit complet. Chaque fuite identifiée." },
    { number: "3", title: "On installe", description: "2 à 4 semaines. Clé en main." },
    { number: "4", title: "On accélère", description: "Suivi, mesure, optimisation. En continu." }
  ];

  return (
    <section id="methode" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
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
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Rocket className="w-3.5 h-3.5 text-primary" />
            </motion.div>
            <span className="text-xs text-primary font-medium">Comment ça marche</span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Clair, carré,{' '}
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
              calibré.
            </motion.span>
          </motion.h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            On parle, on analyse, on livre, on affine.
          </p>
        </motion.div>
        
        {/* Desktop: Horizontal */}
        <StaggerContainer 
          className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          staggerDelay={0.15}
          initialDelay={0.2}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.number}>
              <ProcessStep
                {...step}
                isLast={index === steps.length - 1}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {/* Mobile: Vertical */}
        <StaggerContainer 
          className="lg:hidden max-w-sm mx-auto"
          staggerDelay={0.12}
          initialDelay={0.15}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.number}>
              <MobileStep
                {...step}
                isLast={index === steps.length - 1}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom trust badge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ scale: 1.02, color: 'hsl(var(--foreground))' }}
          >
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Démarrage en moins d'une semaine
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
