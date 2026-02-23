import { motion } from 'framer-motion';
import { memo } from 'react';

// Effet de glow pulsant pour attirer l'attention sur les CTA
export const PulsingGlow = memo(function PulsingGlow() {
  return (
    <motion.div
      className="absolute inset-0 rounded-xl pointer-events-none"
      animate={{
        boxShadow: [
          '0 0 20px rgba(37, 99, 235, 0.2)',
          '0 0 40px rgba(37, 99, 235, 0.4)',
          '0 0 20px rgba(37, 99, 235, 0.2)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
});
