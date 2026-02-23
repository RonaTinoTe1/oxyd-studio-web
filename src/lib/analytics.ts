/**
 * OXYD Studio Analytics
 *
 * Lightweight, privacy-respecting analytics system.
 * Can be connected to Plausible, Fathom, or custom backend.
 *
 * Features:
 * - No cookies
 * - Respects Do Not Track
 * - GDPR-compliant by design
 * - Minimal data collection
 */

// ============================================================================
// TYPES
// ============================================================================

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

export interface PageView {
  path: string;
  referrer?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const config = {
  /** Enable analytics (set to false to disable) */
  enabled: true,
  /** Respect Do Not Track browser setting */
  respectDNT: true,
  /** Debug mode - logs events to console */
  debug: import.meta.env.DEV,
  /** Custom endpoint for self-hosted analytics */
  endpoint: null as string | null,
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Check if tracking should be enabled.
 * Respects Do Not Track and config settings.
 */
function shouldTrack(): boolean {
  if (!config.enabled) return false;

  // Respect Do Not Track
  if (config.respectDNT && typeof navigator !== 'undefined') {
    const dnt =
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack === '1' ||
      (window as Window & { doNotTrack?: string }).doNotTrack === '1';
    if (dnt) return false;
  }

  return true;
}

/**
 * Log event in debug mode.
 */
function debugLog(type: string, data: unknown): void {
  if (config.debug) {
    console.log(`[Analytics] ${type}:`, data);
  }
}

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Track a page view.
 * Called automatically on route changes.
 */
export function trackPageView(page?: PageView): void {
  if (!shouldTrack()) return;

  const data: PageView = page || {
    path: window.location.pathname,
    referrer: document.referrer || undefined,
  };

  debugLog('PageView', data);

  // Send to analytics service
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as Window & { plausible?: (event: string) => void }).plausible?.('pageview');
  }
}

/**
 * Track a custom event.
 * Use for conversions, clicks, form submissions, etc.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!shouldTrack()) return;

  debugLog('Event', event);

  // Send to analytics service
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as Window & { plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void })
      .plausible?.(event.name, { props: event.props });
  }
}

// ============================================================================
// PRE-DEFINED EVENTS
// ============================================================================

export const events = {
  /** Form submission started */
  formStart: () => trackEvent({ name: 'Form Start' }),

  /** Form submitted successfully */
  formSubmit: (formName: string) =>
    trackEvent({
      name: 'Form Submit',
      props: { form: formName },
    }),

  /** Form submission failed */
  formError: (formName: string, error: string) =>
    trackEvent({
      name: 'Form Error',
      props: { form: formName, error },
    }),

  /** CTA button clicked */
  ctaClick: (location: string) =>
    trackEvent({
      name: 'CTA Click',
      props: { location },
    }),

  /** Section viewed (scroll tracking) */
  sectionView: (section: string) =>
    trackEvent({
      name: 'Section View',
      props: { section },
    }),

  /** External link clicked */
  externalLink: (url: string) =>
    trackEvent({
      name: 'External Link',
      props: { url },
    }),
} as const;

// ============================================================================
// REACT HOOK
// ============================================================================

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to automatically track page views on route changes.
 * Place in your App component.
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    trackPageView({
      path: location.pathname,
    });
  }, [location.pathname]);
}
