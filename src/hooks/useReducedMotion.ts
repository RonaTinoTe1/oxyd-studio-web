import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user prefers reduced motion.
 * Respects the prefers-reduced-motion media query for accessibility.
 *
 * @returns boolean - true if user prefers reduced motion
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * const animationDuration = prefersReducedMotion ? 0 : 0.5;
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // SSR-safe initial state
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Returns motion-safe animation variants for Framer Motion.
 * When reduced motion is preferred, animations are instant.
 */
export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // Animation duration multiplier (0 = instant, 1 = normal)
    duration: prefersReducedMotion ? 0 : 1,
    // Safe transition config
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.3, ease: 'easeOut' },
    // Safe spring config
    spring: prefersReducedMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 300, damping: 30 },
  };
}
