/**
 * Tests for animation configurations
 */

import { describe, it, expect } from 'vitest';
import {
  transitions,
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  hoverGlow,
  subtlePulse,
  gentleFloat,
  scrollReveal,
  viewportOnce,
  viewportRepeat,
} from './animations';

describe('Animation configurations', () => {
  describe('transitions', () => {
    it('should have all transition types', () => {
      expect(transitions).toHaveProperty('default');
      expect(transitions).toHaveProperty('smooth');
      expect(transitions).toHaveProperty('spring');
      expect(transitions).toHaveProperty('quick');
      expect(transitions).toHaveProperty('slow');
    });

    it('should have duration on timed transitions', () => {
      expect(transitions.default).toHaveProperty('duration');
      expect(transitions.smooth).toHaveProperty('duration');
      expect(transitions.quick).toHaveProperty('duration');
      expect(transitions.slow).toHaveProperty('duration');
    });

    it('should have spring type on spring transition', () => {
      expect(transitions.spring).toHaveProperty('type', 'spring');
    });
  });

  describe('fadeInUp', () => {
    it('should have hidden and visible states', () => {
      expect(fadeInUp).toHaveProperty('hidden');
      expect(fadeInUp).toHaveProperty('visible');
    });

    it('should start with opacity 0 and positive y', () => {
      expect(fadeInUp.hidden).toHaveProperty('opacity', 0);
      expect(fadeInUp.hidden).toHaveProperty('y', 20);
    });

    it('should end with opacity 1 and y 0', () => {
      expect(fadeInUp.visible).toHaveProperty('opacity', 1);
      expect(fadeInUp.visible).toHaveProperty('y', 0);
    });
  });

  describe('fadeInScale', () => {
    it('should start at smaller scale', () => {
      expect(fadeInScale.hidden).toHaveProperty('scale', 0.95);
      expect(fadeInScale.hidden).toHaveProperty('opacity', 0);
    });

    it('should end at scale 1', () => {
      expect(fadeInScale.visible).toHaveProperty('scale', 1);
      expect(fadeInScale.visible).toHaveProperty('opacity', 1);
    });
  });

  describe('staggerContainer', () => {
    it('should have staggerChildren in visible transition', () => {
      const visibleTransition = fadeInUp.visible?.transition || staggerContainer.visible?.transition;
      expect(staggerContainer.visible).toHaveProperty('transition');
    });

    it('should configure stagger timing', () => {
      const transition = staggerContainer.visible?.transition as { staggerChildren: number };
      expect(transition.staggerChildren).toBe(0.1);
    });
  });

  describe('staggerItem', () => {
    it('should have hidden and visible states', () => {
      expect(staggerItem).toHaveProperty('hidden');
      expect(staggerItem).toHaveProperty('visible');
    });

    it('should match fadeInUp behavior', () => {
      expect(staggerItem.hidden).toEqual(fadeInUp.hidden);
    });
  });

  describe('hover states', () => {
    it('hoverScale should scale up on hover and down on tap', () => {
      expect(hoverScale.whileHover).toHaveProperty('scale', 1.02);
      expect(hoverScale.whileTap).toHaveProperty('scale', 0.98);
    });

    it('hoverLift should move up on hover', () => {
      expect(hoverLift.whileHover).toHaveProperty('y', -4);
    });

    it('hoverGlow should add box shadow on hover', () => {
      expect(hoverGlow.whileHover).toHaveProperty('boxShadow');
    });
  });

  describe('background animations', () => {
    it('subtlePulse should have infinite repeat', () => {
      expect(subtlePulse.transition).toHaveProperty('repeat', Infinity);
    });

    it('gentleFloat should animate y position', () => {
      expect(gentleFloat.animate).toHaveProperty('y');
      expect(gentleFloat.transition).toHaveProperty('repeat', Infinity);
    });
  });

  describe('scrollReveal', () => {
    it('should have larger y offset than fadeInUp', () => {
      expect(scrollReveal.hidden).toHaveProperty('y', 40);
    });

    it('should use slow transition', () => {
      expect(scrollReveal.visible?.transition).toEqual(transitions.slow);
    });
  });

  describe('viewport configs', () => {
    it('viewportOnce should trigger once', () => {
      expect(viewportOnce).toHaveProperty('once', true);
    });

    it('viewportRepeat should not trigger once', () => {
      expect(viewportRepeat).toHaveProperty('once', false);
    });

    it('should have margin for early trigger', () => {
      expect(viewportOnce).toHaveProperty('margin');
      expect(viewportRepeat).toHaveProperty('margin');
    });
  });
});
