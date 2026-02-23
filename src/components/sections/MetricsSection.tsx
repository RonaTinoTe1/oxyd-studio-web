import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Clock, Users, Zap, ArrowUpRight, Linkedin, BarChart3 } from 'lucide-react';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { StaggerContainer, StaggerItem } from '@/components/effects/StaggerContainer';
import { ProgressRing } from '@/components/effects/ProgressRing';

// Cialdini: Preuve Sociale avec données de rendement spécifiques
// Version avec animations persuasives et compteurs dynamiques

interface MetricProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
}

function MetricCard({ value, suffix, prefix = '', label, icon }: MetricProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <HoverCard3D intensity={8}>
      <motion.div
        ref={ref}
        className="glass-card p-5 md:p-6 rounded-xl text-center group hover:border-primary/30 transition-all duration-300"
        whileHover={{ 
          boxShadow: '0 0 25px rgba(37, 99, 235, 0.15)',
        }}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary mb-3"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        
        <motion.div 
          className="text-2xl md:text-3xl font-bold text-foreground mb-1 tabular-nums"
          animate={isInView ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3, delay: 1.5 }}
        >
          {prefix}{displayValue}{suffix}
        </motion.div>
        
        <p className="text-muted-foreground text-xs md:text-sm">
          {label}
        </p>
      </motion.div>
    </HoverCard3D>
  );
}

// Preuve sociale: Cas client avec animation
interface CaseStudyProps {
  before: string;
  after: string;
  metric: string;
  industry: string;
}

function CaseStudyCard({ before, after, metric, industry }: CaseStudyProps) {
  return (
    <HoverCard3D intensity={6}>
      <motion.div
        className="glass-card p-4 md:p-5 rounded-xl h-full"
        whileHover={{ 
          boxShadow: '0 0 20px rgba(37, 99, 235, 0.1)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{industry}</span>
          <span className="text-[10px] text-muted-foreground/60 italic">objectif cible</span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-muted-foreground text-sm">{before}</span>
          <span className="text-muted-foreground text-sm">→</span>
          <motion.span 
            className="text-xl font-bold text-primary"
            whileHover={{ scale: 1.1 }}
          >
            {after}
          </motion.span>
        </div>
        <p className="text-xs text-muted-foreground">{metric}</p>
      </motion.div>
    </HoverCard3D>
  );
}

// Témoignage avec animation hover
interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl?: string;
}

function TestimonialCard({ quote, name, role, company, linkedinUrl }: TestimonialProps) {
  return (
    <HoverCard3D intensity={5}>
      <motion.div
        className="glass-card p-5 md:p-6 rounded-xl h-full"
        whileHover={{ 
          boxShadow: '0 0 25px rgba(37, 99, 235, 0.12)',
        }}
      >
        <motion.p 
          className="text-sm text-foreground mb-4 italic"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
        >
          "{quote}"
        </motion.p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{role}, {company}</p>
          </div>
          {linkedinUrl && (
            <motion.a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label={`Profil LinkedIn de ${name}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </motion.div>
    </HoverCard3D>
  );
}

// Graphique SVG premium avec courbe lissée, gradient glow et données animées
function AnimatedGraph({ isInView }: { isInView: boolean }) {
  const dataPoints = [
    { x: 0, y: 82, label: 'J0' },
    { x: 1, y: 78, label: '' },
    { x: 2, y: 72, label: 'J15' },
    { x: 3, y: 60, label: '' },
    { x: 4, y: 48, label: 'J30' },
    { x: 5, y: 38, label: '' },
    { x: 6, y: 30, label: 'J45' },
    { x: 7, y: 25, label: '' },
    { x: 8, y: 20, label: 'J60' },
    { x: 9, y: 17, label: '' },
    { x: 10, y: 14, label: 'J75' },
    { x: 11, y: 12, label: 'J90' },
  ];

  const width = 400;
  const height = 160;
  const padX = 32;
  const padY = 20;
  const graphW = width - padX * 2;
  const graphH = height - padY * 2;

  const points = dataPoints.map((d, i) => ({
    x: padX + (i / (dataPoints.length - 1)) * graphW,
    y: padY + (d.y / 100) * graphH,
    label: d.label,
    value: 100 - d.y, // conversion rate increasing
  }));

  // Build smooth cubic bezier path
  const buildPath = (pts: typeof points) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cp = (pts[i + 1].x - pts[i].x) / 2.5;
      d += ` C ${pts[i].x + cp} ${pts[i].y}, ${pts[i + 1].x - cp} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
    }
    return d;
  };

  const curvePath = buildPath(points);
  const areaPath = `${curvePath} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  // Grid lines
  const gridLines = [0.25, 0.5, 0.75].map(pct => padY + pct * graphH);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Area gradient */}
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
          </linearGradient>
          {/* Line glow */}
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Dot pulse */}
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((y, i) => (
          <motion.line
            key={i}
            x1={padX} y1={y} x2={width - padX} y2={y}
            stroke="hsl(var(--border))"
            strokeOpacity={0.3}
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#areaGrad)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Glow line (behind) */}
        <motion.path
          d={curvePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#glow)"
          strokeOpacity={0.4}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Main curve */}
        <motion.path
          d={curvePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Data dots + labels */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Outer pulse */}
            <motion.circle
              cx={p.x} cy={p.y} r={8}
              fill="url(#dotGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] } : { opacity: 0 }}
              transition={{ duration: 2, delay: 1.5 + i * 0.15, repeat: Infinity, repeatDelay: 3 }}
            />
            {/* Dot */}
            <motion.circle
              cx={p.x} cy={p.y} r={3}
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.12, type: "spring", stiffness: 300 }}
            />
            {/* Value label */}
            {p.label && (
              <motion.text
                x={p.x}
                y={height - 4}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize={9}
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
              >
                {p.label}
              </motion.text>
            )}
          </g>
        ))}

        {/* End value badge */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 2 }}
        >
          <rect
            x={points[points.length - 1].x - 22}
            y={points[points.length - 1].y - 24}
            width={44}
            height={18}
            rx={9}
            fill="hsl(var(--primary))"
            opacity={0.15}
          />
          <text
            x={points[points.length - 1].x}
            y={points[points.length - 1].y - 12}
            textAnchor="middle"
            fill="hsl(var(--primary))"
            fontSize={10}
            fontWeight={700}
            fontFamily="Inter, sans-serif"
          >
            +88%
          </text>
        </motion.g>

        {/* Y-axis labels */}
        {['Bas', 'Haut'].map((label, i) => (
          <motion.text
            key={label}
            x={padX - 6}
            y={i === 0 ? height - padY : padY + 4}
            textAnchor="end"
            fill="hsl(var(--muted-foreground))"
            fontSize={8}
            fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}

export function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const metrics = [
    { value: 2, suffix: '–3×', label: "Objectif de conversions visé", icon: <TrendingUp className="w-4 h-4" /> },
    { value: 2, suffix: ' sec', label: "Temps réponse IA moyen", icon: <Clock className="w-4 h-4" /> },
    { value: 90, suffix: ' jours', label: "Phase pilote mesurable", icon: <Users className="w-4 h-4" /> },
    { value: 6, suffix: ' mois', label: "Suivi & optimisation inclus", icon: <Zap className="w-4 h-4" /> }
  ];

  const caseStudies = [
    { before: "0.4%", after: "1.2–1.8%", metric: "Objectif taux de conversion", industry: "SaaS B2B" },
    { before: "~10/mois", after: "30–50/mois", metric: "Objectif leads qualifiés", industry: "Consulting" },
    { before: "2%", after: "5–7%", metric: "Objectif taux d'engagement", industry: "E-commerce" }
  ];

  // Pas de faux témoignages. On affiche des résultats quand on en a.
  const testimonials: TestimonialProps[] = [];

  return (
    <section className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-10 md:mb-14"
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
              <BarChart3 className="w-3.5 h-3.5 text-primary" />
            </motion.div>
            <span className="text-xs text-primary font-medium">Preuves Mesurables</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Des objectifs, pas des promesses
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ce qu'on vise pour vous. Mesuré. Contractualisé. Garanti à 80%.
          </p>
        </motion.div>

        {/* Graphique animé */}
        <motion.div
          className="max-w-lg mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <HoverCard3D intensity={5}>
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Projection de conversion sur 90 jours
                </p>
                <motion.div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10"
                  animate={isInView ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] text-primary font-medium">Live</span>
                </motion.div>
              </div>
              <AnimatedGraph isInView={isInView} />
            </div>
          </HoverCard3D>
        </motion.div>

        {/* Metrics Grid */}
        <StaggerContainer 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-10"
          staggerDelay={0.1}
          initialDelay={0.2}
        >
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <MetricCard {...metric} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-xs text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          * Objectifs définis ensemble lors du diagnostic. Les résultats varient selon votre secteur, votre trafic et votre offre.
        </motion.p>

        {/* Cas clients par industrie */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-4">
            Objectifs types par secteur
          </p>
          <StaggerContainer className="grid md:grid-cols-3 gap-3" staggerDelay={0.1}>
            {caseStudies.map((study) => (
              <StaggerItem key={study.industry}>
                <CaseStudyCard {...study} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>

        {/* Note honnête au lieu de faux témoignages */}
        {testimonials.length === 0 && (
          <motion.div
            className="max-w-lg mx-auto text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Transparence :</span> Nous ne publions pas de faux avis.
                Les témoignages clients vérifiables seront ajoutés ici au fur et à mesure de nos collaborations.
              </p>
            </div>
          </motion.div>
        )}

        {/* Témoignages réels quand ils existent */}
        {testimonials.length > 0 && (
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Ce que disent nos clients
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -20 : 20 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
