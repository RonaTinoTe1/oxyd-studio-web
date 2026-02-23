/**
 * Tests for Button component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from './button';

describe('Button', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button disabled onClick={() => (clicked = true)}>Click</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(false);
  });

  describe('variants', () => {
    it('should apply default variant styles', () => {
      render(<Button variant="default">Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('should apply outline variant styles', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('bg-transparent');
    });

    it('should apply ghost variant styles', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-secondary');
    });

    it('should apply destructive variant styles', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive');
    });
  });

  describe('sizes', () => {
    it('should apply default size', () => {
      render(<Button size="default">Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
    });

    it('should apply small size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
    });

    it('should apply large size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-14');
    });

    it('should apply xl size', () => {
      render(<Button size="xl">XL</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-16');
    });

    it('should apply icon size', () => {
      render(<Button size="icon">I</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
      expect(button).toHaveClass('w-11');
    });
  });

  describe('asChild', () => {
    it('should render as a different element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="https://example.com">Link</a>
        </Button>
      );
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('buttonVariants', () => {
    it('should return class string for variant', () => {
      const classes = buttonVariants({ variant: 'default', size: 'default' });
      expect(typeof classes).toBe('string');
      expect(classes).toContain('bg-primary');
    });

    it('should support all variant combinations', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      const sizes = ['default', 'sm', 'lg', 'xl', 'icon'] as const;

      variants.forEach((variant) => {
        sizes.forEach((size) => {
          const classes = buttonVariants({ variant, size });
          expect(typeof classes).toBe('string');
        });
      });
    });
  });
});
