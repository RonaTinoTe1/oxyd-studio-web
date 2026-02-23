import type { Variants, Transition } from 'framer-motion';

/**
 * Centralized animation configuration for OXYD Studio.
 * All animations are defined here for consistency and easy maintenance.
 */

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  /** Default ease for most animations */
  default: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } as Transition,

  /** Smooth expo ease-out for premium feel */
  smooth: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } as Transition,

  /** Spring for interactive elements */
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,

  /** Quick transition for micro-interactions */
  quick: { duration: 0.15, ease: 'easeOut' } as Transition,

  /** Slow transition for dramatic reveals */
  slow: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } as Transition,
} as const;

// ============================================================================
// VARIANTS
// ============================================================================

/** Fade in from below - for text and general content */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

/** Fade in with scale - for cards and buttons */
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

/** Stagger children - for lists */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Stagger item - use with staggerContainer */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

// ============================================================================
// HOVER STATES
// ============================================================================

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.quick,
};

export const hoverLift = {
  whileHover: { y: -4 },
  transition: transitions.quick,
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)',
  },
  transition: transitions.default,
};

// ============================================================================
// BACKGROUND ANIMATIONS (CPU-optimized)
// ============================================================================

/**
 * Subtle pulse for background elements.
 * Uses transform and opacity only (GPU-accelerated).
 */
export const subtlePulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.5, 0.3],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * Gentle float for decorative elements.
 */
export const gentleFloat = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

// ============================================================================
// VIEWPORT CONFIG
// ============================================================================

/** Standard viewport trigger for scroll animations */
export const viewportOnce = {
  once: true,
  margin: '-60px' as const,
};

/** Viewport trigger that can repeat */
export const viewportRepeat = {
  once: false,
  margin: '-100px' as const,
};
