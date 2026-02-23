import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hick's Law: Binary qualification. You match → ONE action. You don't → leave.
// No alternative CTA for non-qualifiers (that's a second path = distraction).

export function AntiProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleCTAClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const forYou = [
    "Vous avez déjà du trafic (500+ visiteurs/mois)",
    "Vous vendez des services ou produits à plus de 500€",
    "Vous êtes prêt à investir pour des résultats mesurables"
  ];

  const notForYou = [
    "Vous lancez un projet sans trafic existant",
    "Vous cherchez juste un beau design",
    "Votre budget est inférieur à 5 000€"
  ];

  return (
    <section className="relative py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6">
        
        <motion.div
          ref={ref}
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            On ne travaille pas avec tout le monde
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Transparence totale pour ne pas vous faire perdre de temps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          <motion.div
            className="glass-card p-6 rounded-2xl border-primary/20"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary" />
              </span>
              C'est pour vous si...
            </h3>
            <ul className="space-y-3 mb-6">
              {forYou.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, delay: 0.15 + i * 0.05 }}
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* ONE CTA for qualifiers */}
            <Button onClick={handleCTAClick} className="w-full group" size="sm">
              Réserver mon diagnostic gratuit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl opacity-60"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
              Pas pour vous si...
            </h3>
            <ul className="space-y-3">
              {notForYou.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground/70"
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, delay: 0.2 + i * 0.05 }}
                >
                  <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
