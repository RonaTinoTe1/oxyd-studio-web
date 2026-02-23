import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingDown, UserX, Moon, AlertTriangle } from 'lucide-react';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { StaggerContainer, StaggerItem } from '@/components/effects/StaggerContainer';
import { ProgressRing } from '@/components/effects/ProgressRing';
import { HighlightTruism } from '@/components/effects/HighlightTruism';

// Équation Hormozi - Section Tension: Amplifier le coût de l'inaction
// Version avec animations persuasives et urgence visuelle

interface TensionCardProps {
  icon: React.ReactNode;
  cost: string;
  title: string;
  description: string;
  urgencyLevel?: number;
}

function TensionCard({ icon, cost, title, description, urgencyLevel = 70 }: TensionCardProps) {
  return (
    <HoverCard3D intensity={8}>
      <motion.div
        className="glass-card p-6 md:p-8 rounded-2xl group hover:border-destructive/30 transition-all duration-300 h-full relative overflow-hidden"
        whileHover={{ 
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.15)',
        }}
      >
        {/* Urgency indicator bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-border/30 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-destructive/60 to-destructive"
            initial={{ width: 0 }}
            whileInView={{ width: `${urgencyLevel}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </div>

        <motion.div 
          className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-destructive">{icon}</span>
        </motion.div>
        
        {/* Coût chiffré avec animation pulse */}
        <motion.div 
          className="text-2xl font-bold text-destructive mb-2"
          animate={{ 
            textShadow: [
              '0 0 0px transparent',
              '0 0 10px rgba(239, 68, 68, 0.3)',
              '0 0 0px transparent'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {cost}
        </motion.div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </motion.div>
    </HoverCard3D>
  );
}

export function TensionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const tensions = [
    {
      icon: <TrendingDown className="w-5 h-5" />,
      cost: "Jusqu'à 50%",
      title: "De CA potentiel perdu",
      description: "Un écart de conversion de 0.5% à 2% peut représenter la moitié de votre chiffre d'affaires potentiel en moins.",
      urgencyLevel: 85
    },
    {
      icon: <UserX className="w-5 h-5" />,
      cost: "97% de fuite",
      title: "Ils viennent, ils voient, ils partent",
      description: "En moyenne, 97% des visiteurs repartent sans acheter. Ils ne reviennent pas. Vos concurrents les récupèrent.",
      urgencyLevel: 97
    },
    {
      icon: <Moon className="w-5 h-5" />,
      cost: "16h/jour",
      title: "Vous dormez, ils signent",
      description: "Vos concurrents convertissent à 3h du matin. Eux ont un système. Vous, une vitrine.",
      urgencyLevel: 67
    }
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-6">
        
        <motion.div
          ref={ref}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
        >
          {/* Yes Set: 3 truismes avant la headline */}
          <motion.div
            className="max-w-xl mx-auto mb-6 space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {[
              "Votre site reçoit des visites.",
              "Mais la plupart repartent sans agir.",
              "Et chaque jour, ce manque à gagner s'accumule."
            ].map((truism, i) => (
              <HighlightTruism key={i} delay={0.1 + i * 0.2} isInView={isInView}>
                {truism}
              </HighlightTruism>
            ))}
          </motion.div>

          {/* Warning badge avec animation */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.55 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            </motion.div>
            <span className="text-xs text-destructive font-medium">Coût de l'inaction</span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Vous payez le trafic,{' '}
            <motion.span 
              className="text-destructive"
              animate={isInView ? { 
                textShadow: [
                  '0 0 0px transparent',
                  '0 0 20px rgba(239, 68, 68, 0.4)',
                  '0 0 0px transparent'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              mais pas le profit.
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Pas des opinions. <span className="text-foreground font-medium">Des équations.</span>
          </motion.p>
        </motion.div>

        <StaggerContainer 
          className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto"
          staggerDelay={0.15}
          initialDelay={0.2}
        >
          {tensions.map((item) => (
            <StaggerItem key={item.title}>
              <TensionCard {...item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Visual urgency meter */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4">
            <ProgressRing value={83} size={60} strokeWidth={5}>
              <span className="text-sm font-bold text-destructive">83%</span>
            </ProgressRing>
            <div>
              <p className="text-sm font-medium text-foreground">Chaque heure coûte.</p>
              <p className="text-xs text-muted-foreground">Chaque jour compte.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
