import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Throttle with RAF for buttery smooth performance
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
          normalizedX: event.clientX / window.innerWidth,
          normalizedY: event.clientY / window.innerHeight,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return mousePosition;
}
