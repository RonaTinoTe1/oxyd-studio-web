import { useCallback } from 'react';

/**
 * Hook to scroll to a section by ID.
 * Centralizes scroll behavior across the app.
 *
 * @returns Function to scroll to a section
 *
 * @example
 * const scrollTo = useScrollTo();
 * scrollTo('contact'); // Scrolls to #contact
 */
export function useScrollTo() {
  return useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
}

/**
 * Scroll to top of the page.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
