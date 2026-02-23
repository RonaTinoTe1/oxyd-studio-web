import { motion } from 'framer-motion';

interface ShimmerTextProps {
  children: string;
  className?: string;
}

// Texte avec effet de brillance qui passe dessus
export function ShimmerText({ children, className = '' }: ShimmerTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
        style={{ 
          mixBlendMode: 'overlay',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black, transparent)'
        }}
      />
    </span>
  );
}
