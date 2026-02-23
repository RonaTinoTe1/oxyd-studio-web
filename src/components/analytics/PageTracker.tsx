import { usePageTracking } from '@/lib/analytics';

/**
 * Component that tracks page views.
 * Must be placed inside BrowserRouter.
 */
export function PageTracker() {
  usePageTracking();
  return null;
}
