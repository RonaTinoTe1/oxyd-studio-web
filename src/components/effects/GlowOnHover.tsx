import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface GlowOnHoverProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

// Effet de glow qui suit le curseur sur l'élément
export function GlowOnHover({ 
  children, 
  className = '',
  glowColor = 'rgba(37, 99, 235, 0.15)'
}: GlowOnHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 200, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) => 
              `radial-gradient(400px circle at ${latestX}px ${latestY}px, ${glowColor}, transparent 70%)`
          )
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
