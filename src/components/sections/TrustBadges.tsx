import { Shield, Award, Clock, Headphones, CreditCard, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const badges = [
  { icon: Shield, label: 'SSL Sécurisé' },
  { icon: Award, label: 'Garantie Satisfaction' },
  { icon: Clock, label: 'Maquette 48h' },
  { icon: Headphones, label: 'Réponse 24h' },
  { icon: CreditCard, label: 'Paiement 3x Sans Frais' },
  { icon: Zap, label: '7 Jours et Vous êtes Live' },
];

export function TrustBadges() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div 
      ref={ref}
      className="py-10 border-y border-border/20"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <div
              key={badge.label}
              className={cn(
                'flex items-center gap-2 text-muted-foreground opacity-0',
                isVisible && 'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <badge.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
