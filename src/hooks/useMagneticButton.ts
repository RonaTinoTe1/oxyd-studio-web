import { useRef, useState, useCallback, useMemo } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticButton(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        setTransform({
          x: distanceX * strength * factor,
          y: distanceY * strength * factor,
        });
      }
    });
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setTransform({ x: 0, y: 0 });
  }, []);

  const style = useMemo(() => ({
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: transform.x === 0 && transform.y === 0 
      ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
      : 'transform 0.1s ease-out',
    willChange: 'transform',
  }), [transform.x, transform.y]);

  return {
    ref: buttonRef,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
