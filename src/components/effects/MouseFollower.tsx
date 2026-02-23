import { memo, useState, useEffect, useCallback, useRef } from 'react';

// Ultra-optimized mouse follower with intelligent throttling
export const MouseFollower = memo(function MouseFollower() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    // Throttle to ~30fps for better performance while staying smooth
    if (now - lastUpdateRef.current < 33) return;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      lastUpdateRef.current = now;
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 opacity-30 gpu-accelerate"
      style={{
        background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, hsl(var(--neon-purple) / 0.08), transparent 40%)`,
        transition: 'background 0.4s var(--ease-butter)',
      }}
    />
  );
});
