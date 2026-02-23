import { useEffect } from 'react';
import { Zap, Search, Smartphone, Shield, Clock, Palette } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { use3DTilt, useHoverGlow } from '@/hooks/useMicroInteractions';
import { cn } from '@/lib/utils';
import { useCountUp } from '@/hooks/useCountUp';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  highlight?: boolean;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Vitesse qui convertit',
    description: 'Chaque seconde de chargement = -7% de conversions. Votre site charge en 1.2s. Vos concurrents ? 4 secondes.',
    stat: '1.2',
    statLabel: 'sec seulement',
    highlight: true,
  },
  {
    icon: Search,
    title: 'Visible sur Google. Enfin.',
    description: 'Page 1 en 90 jours ou on travaille gratuitement. Fini d\'être invisible pendant que d\'autres captent VOS clients.',
    stat: '90',
    statLabel: 'jours max',
  },
  {
    icon: Smartphone,
    title: '70% de vos clients sont là',
    description: 'Sur leur mobile. Si votre site bugge, ils partent chez le concurrent en 3 secondes. Le nôtre ? Parfait. Partout.',
    stat: '100',
    statLabel: '% responsive',
  },
  {
    icon: Shield,
    title: 'Dormez tranquille',
    description: 'Sécurité bancaire, backups quotidiens, protection anti-hack. Pendant que vous dormez, votre site est protégé.',
    stat: '7',
    statLabel: 'jours de backup',
  },
  {
    icon: Clock,
    title: 'On répond. Vraiment.',
    description: 'Question à 23h ? Réponse avant demain soir. Pas de ticket #45892. Un humain qui vous connaît.',
    stat: '24',
    statLabel: 'h max de réponse',
  },
  {
    icon: Palette,
    title: 'Zéro template. 100% vous.',
    description: 'Votre marque mérite mieux qu\'un thème WordPress recyclé 10 000 fois. Design unique, créé pour VOUS.',
    stat: '0',
    statLabel: '% template',
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });
  const tilt = use3DTilt(8);
  const glow = useHoverGlow('270 90% 65%');
  const Icon = feature.icon;
  
  const counter = useCountUp({
    end: feature.stat ? parseFloat(feature.stat) : 0,
    duration: 2000,
  });

  // Start counter when visible
  useEffect(() => {
    if (isVisible && !counter.hasStarted) {
      counter.start();
    }
  }, [isVisible, counter]);

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 translate-y-6',
        isVisible && 'opacity-100 translate-y-0'
      )}
      style={{ 
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
        transitionDelay: `${index * 100}ms`,
        transitionProperty: 'opacity, transform'
      }}
    >
      <div
        ref={tilt.ref}
        style={{ ...tilt.style, ...glow.style }}
        {...tilt.handlers}
        {...glow.handlers}
        className={cn(
          'group relative h-full p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden',
          feature.highlight 
            ? 'border-primary/40 bg-primary/5' 
            : 'border-border/30 bg-card/30 hover:border-primary/30'
        )}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>

        <div className="relative z-10">
          {/* Icon with bounce animation */}
          <div className={cn(
            'mb-4 inline-flex items-center justify-center rounded-xl p-3 transition-all duration-300 group-hover:scale-110',
            feature.highlight 
              ? 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
              : 'bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
          )}>
            <Icon className="h-5 w-5 transition-transform group-hover:animate-icon-bounce" />
          </div>

          {/* Stat counter */}
          {feature.stat && (
            <div className="mb-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">
                {isVisible ? (feature.stat.includes('.') ? counter.count.toFixed(1) : Math.round(counter.count)) : '0'}
              </span>
              <span className="text-sm text-muted-foreground">{feature.statLabel}</span>
            </div>
          )}

          <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
        </div>

        {/* Highlight badge */}
        {feature.highlight && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
              Top
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={cn(
            'mx-auto max-w-2xl text-center mb-12 opacity-0 translate-y-6 transition-all duration-700',
            isHeaderVisible && 'opacity-100 translate-y-0'
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}
        >
          <span className="inline-block mb-3 text-sm font-semibold text-primary uppercase tracking-[0.2em]">
            Pourquoi nous choisir
          </span>
          <h2 className="mb-4 text-3xl font-black md:text-4xl tracking-tight">
            Des résultats. <span className="gradient-text">Pas des promesses.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Chaque fonctionnalité existe pour une raison : <span className="text-foreground font-medium">vous faire gagner de l'argent.</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
