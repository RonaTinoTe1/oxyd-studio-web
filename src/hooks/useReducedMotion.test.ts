/**
 * Tests for useReducedMotion hook
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion, useMotionSafe } from './useReducedMotion';

describe('useReducedMotion', () => {
  beforeEach(() => {
    // Reset matchMedia mock
    vi.mocked(window.matchMedia).mockClear();
  });

  it('should return false when reduced motion is not preferred', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when reduced motion is preferred', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should query the correct media query', () => {
    renderHook(() => useReducedMotion());
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('should add event listener for changes', () => {
    const addEventListener = vi.fn();
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener,
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderHook(() => useReducedMotion());
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should respond to media query changes', () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_, handler) => {
        changeHandler = handler as (event: MediaQueryListEvent) => void;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Simulate media query change
    act(() => {
      changeHandler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});

describe('useMotionSafe', () => {
  it('should return duration 1 when motion is allowed', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useMotionSafe());
    expect(result.current.duration).toBe(1);
    expect(result.current.prefersReducedMotion).toBe(false);
  });

  it('should return duration 0 when reduced motion is preferred', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useMotionSafe());
    expect(result.current.duration).toBe(0);
    expect(result.current.prefersReducedMotion).toBe(true);
  });

  it('should return instant transition when reduced motion is preferred', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useMotionSafe());
    expect(result.current.transition).toEqual({ duration: 0 });
    expect(result.current.spring).toEqual({ duration: 0 });
  });

  it('should return normal transition when motion is allowed', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useMotionSafe());
    expect(result.current.transition).toEqual({ duration: 0.3, ease: 'easeOut' });
    expect(result.current.spring).toEqual({ type: 'spring', stiffness: 300, damping: 30 });
  });
});
