import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ShimmerText } from '@/components/effects/ShimmerText';
import { HighlightTruism } from '@/components/effects/HighlightTruism';
import { useScrollTo } from '@/hooks/useScrollTo';

// Hick's Law: ONE headline, ONE subline, ONE button. Nothing else.

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative backgrounds - hidden from screen readers */}
      <motion.div className="absolute inset-0 subtle-grid opacity-20" style={{ y: backgroundY }} aria-hidden="true" />
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" style={{ y: backgroundY }} aria-hidden="true" />

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="container relative z-10 mx-auto px-6 py-20 md:py-28"
        style={{ opacity: contentOpacity, y: contentY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Yes Set: 3 truismes d'ouverture */}
          <motion.div
            className="max-w-xl mx-auto mb-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            role="list"
            aria-label="Points clés"
          >
            {[
              "Vous avez du trafic.",
              "Vos visiteurs ne convertissent pas assez.",
              "Et vous savez qu'il suffirait d'un système pour tout changer."
            ].map((truism, i) => (
              <HighlightTruism key={i} delay={0.25 + i * 0.2} isInView={true}>
                <span role="listitem">{truism}</span>
              </HighlightTruism>
            ))}
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-[1.1] md:text-6xl lg:text-7xl text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              Votre site attire du monde.
            </motion.span>
            <br />
            <motion.span
              className="text-destructive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              Mais il ne vend pas assez.
            </motion.span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-xl mx-auto text-lg text-muted-foreground md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Vos visiteurs <span className="text-foreground font-medium">arrivent</span>, mais ne <span className="text-foreground font-medium">restent</span> pas.
            <br />
            On installe le système.{' '}
            <ShimmerText className="text-primary font-medium">Ils convertissent</ShimmerText>
            .{' '}Vous <span className="text-primary font-medium">encaissez</span>.
          </motion.p>

          {/* ONE CTA. Nothing else. */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <MagneticButton strength={0.2}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="xl"
                  className="font-semibold group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden"
                  onClick={() => scrollTo('contact')}
                  aria-label="Réserver mon diagnostic gratuit - 30 minutes gratuites"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center">
                    Réserver mon diagnostic gratuit
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>
            </MagneticButton>
          </motion.div>

          {/* Single proof line — no badges, no choices */}
          <motion.p
            className="mt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            30 min. Gratuit. <span className="text-primary font-medium">Objectif : doubler vos conversions.</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Faire défiler vers le bas"
        type="button"
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-border flex items-start justify-center p-1.5 hover:border-primary/50 transition-colors"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
