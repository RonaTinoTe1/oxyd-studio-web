/**
 * Tests for analytics module
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent, events, AnalyticsEvent } from './analytics';

// Store original navigator and window values
const originalNavigator = { ...navigator };
const originalWindow = { ...window };

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear any plausible mock
    delete (window as Window & { plausible?: unknown }).plausible;
  });

  afterEach(() => {
    // Restore navigator
    Object.defineProperty(navigator, 'doNotTrack', {
      value: originalNavigator.doNotTrack,
      configurable: true,
    });
  });

  describe('trackPageView', () => {
    it('should track page view with current path', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      trackPageView();
      
      // In dev mode, should log to console
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should track page view with custom path', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      trackPageView({ path: '/test-page', referrer: 'https://google.com' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] PageView:',
        expect.objectContaining({ path: '/test-page', referrer: 'https://google.com' })
      );
      consoleSpy.mockRestore();
    });

    it('should not track when Do Not Track is enabled', () => {
      Object.defineProperty(navigator, 'doNotTrack', {
        value: '1',
        configurable: true,
      });

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      trackPageView();
      
      // Should not log anything when DNT is enabled
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('trackEvent', () => {
    it('should track custom event', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const event: AnalyticsEvent = {
        name: 'Test Event',
        props: { key: 'value' },
      };
      
      trackEvent(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ name: 'Test Event', props: { key: 'value' } })
      );
      consoleSpy.mockRestore();
    });

    it('should track event without props', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      trackEvent({ name: 'Simple Event' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ name: 'Simple Event' })
      );
      consoleSpy.mockRestore();
    });
  });

  describe('Pre-defined events', () => {
    it('should track form start event', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      events.formStart();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ name: 'Form Start' })
      );
      consoleSpy.mockRestore();
    });

    it('should track form submit with form name', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      events.formSubmit('contact');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ 
          name: 'Form Submit',
          props: { form: 'contact' }
        })
      );
      consoleSpy.mockRestore();
    });

    it('should track form error with form name and error', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      events.formError('contact', 'Invalid email');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ 
          name: 'Form Error',
          props: { form: 'contact', error: 'Invalid email' }
        })
      );
      consoleSpy.mockRestore();
    });

    it('should track CTA click with location', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      events.ctaClick('hero');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ 
          name: 'CTA Click',
          props: { location: 'hero' }
        })
      );
      consoleSpy.mockRestore();
    });

    it('should track section view', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      events.sectionView('services');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ 
          name: 'Section View',
          props: { section: 'services' }
        })
      );
      consoleSpy.mockRestore();
    });

    it('should track external link', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      events.externalLink('https://example.com');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Event:',
        expect.objectContaining({ 
          name: 'External Link',
          props: { url: 'https://example.com' }
        })
      );
      consoleSpy.mockRestore();
    });
  });
});
