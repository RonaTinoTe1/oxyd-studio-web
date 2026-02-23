import { createContext, useContext, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionContextValue {
  prefersReducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
});

/**
 * Provider that configures Framer Motion to respect user's motion preferences.
 * Wraps the app to provide consistent motion behavior.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionContext.Provider value={{ prefersReducedMotion }}>
      <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

/**
 * Hook to access motion preferences in any component.
 */
export function useMotionPreferences() {
  return useContext(MotionContext);
}
