import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const stats = [
  { value: '500+', label: 'Sites livrés', suffix: '' },
  { value: '99.9', label: 'Uptime garanti', suffix: '%' },
  { value: '< 4h', label: 'Temps de réponse', suffix: '' },
  { value: '< 2s', label: 'Temps de chargement', suffix: '' },
];

export function StatsSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
      
      <div 
        ref={ref}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'text-center opacity-0',
                isVisible && 'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
    </section>
  );
}
