/**
 * Tests for utility functions
 */

import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
  });

  it('should merge Tailwind classes correctly', () => {
    // Should dedupe padding classes
    expect(cn('p-4', 'p-6')).toBe('p-6');
  });

  it('should handle conflicting Tailwind utilities', () => {
    // Should take the last one
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('should handle objects', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });

  it('should handle undefined and null gracefully', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('should handle complex Tailwind merges', () => {
    // Responsive variants should not conflict
    expect(cn('md:p-4', 'lg:p-6')).toBe('md:p-4 lg:p-6');
    
    // Same breakpoint should merge
    expect(cn('md:p-4', 'md:p-6')).toBe('md:p-6');
  });
});
