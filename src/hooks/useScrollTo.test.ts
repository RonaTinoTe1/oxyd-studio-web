/**
 * Tests for useScrollTo hook
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollTo, scrollToTop } from './useScrollTo';

describe('useScrollTo', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useScrollTo());
    expect(typeof result.current).toBe('function');
  });

  it('should call scrollIntoView when element exists', () => {
    const mockScrollIntoView = vi.fn();
    const mockElement = { scrollIntoView: mockScrollIntoView };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

    const { result } = renderHook(() => useScrollTo());
    result.current('test-id');

    expect(document.getElementById).toHaveBeenCalledWith('test-id');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should not throw when element does not exist', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    const { result } = renderHook(() => useScrollTo());

    expect(() => result.current('non-existent')).not.toThrow();
  });

  it('should return stable function reference', () => {
    const { result, rerender } = renderHook(() => useScrollTo());
    const firstRef = result.current;

    rerender();

    expect(result.current).toBe(firstRef);
  });
});

describe('scrollToTop', () => {
  it('should call window.scrollTo with correct arguments', () => {
    const mockScrollTo = vi.fn();
    vi.spyOn(window, 'scrollTo').mockImplementation(mockScrollTo);

    scrollToTop();

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
