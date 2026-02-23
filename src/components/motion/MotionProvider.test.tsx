/**
 * Tests for MotionProvider
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionProvider, useMotionPreferences } from './MotionProvider';

// Test component that uses the hook
function TestConsumer() {
  const { prefersReducedMotion } = useMotionPreferences();
  return <div data-testid="motion-pref">{prefersReducedMotion ? 'reduced' : 'normal'}</div>;
}

describe('MotionProvider', () => {
  it('should render children', () => {
    render(
      <MotionProvider>
        <div data-testid="child">Content</div>
      </MotionProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should provide motion preferences via context', () => {
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

    render(
      <MotionProvider>
        <TestConsumer />
      </MotionProvider>
    );
    expect(screen.getByTestId('motion-pref')).toHaveTextContent('normal');
  });

  it('should reflect reduced motion preference', () => {
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

    render(
      <MotionProvider>
        <TestConsumer />
      </MotionProvider>
    );
    expect(screen.getByTestId('motion-pref')).toHaveTextContent('reduced');
  });
});

describe('useMotionPreferences', () => {
  it('should return default value when used outside provider', () => {
    // Using hook outside provider should use default context value
    render(<TestConsumer />);
    expect(screen.getByTestId('motion-pref')).toHaveTextContent('normal');
  });
});
