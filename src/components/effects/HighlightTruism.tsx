import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HighlightTruismProps {
  children: ReactNode;
  delay?: number;
  isInView: boolean;
}

// Progressive highlight: text appears, then a background sweep animates behind it
export function HighlightTruism({ children, delay = 0, isInView }: HighlightTruismProps) {
  return (
    <motion.p
      className="text-sm md:text-base text-muted-foreground relative overflow-hidden rounded-md px-3 py-1.5"
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ duration: 0.3, delay }}
    >
      {/* Background highlight sweep */}
      <motion.span
        className="absolute inset-0 bg-primary/8 rounded-md origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: 'left' }}
      />
      {/* Check + text */}
      <span className="relative z-10">
        <motion.span
          className="text-primary mr-1.5 inline-block"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.2, delay: delay + 0.5, type: 'spring', stiffness: 400 }}
        >
          ✓
        </motion.span>
        {children}
      </span>
    </motion.p>
  );
}
