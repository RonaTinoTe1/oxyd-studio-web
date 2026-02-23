import { useState, useCallback, useRef, useEffect, CSSProperties, useMemo } from 'react';

// Hover scale effect - optimized with useMemo
export function useHoverScale(scale: number = 1.05) {
  const [isHovered, setIsHovered] = useState(false);

  const style = useMemo<CSSProperties>(() => ({
    transform: isHovered ? `scale3d(${scale}, ${scale}, 1)` : 'scale3d(1, 1, 1)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: isHovered ? 'transform' : 'auto',
  }), [isHovered, scale]);

  const handlers = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }), []);

  return { style, handlers, isHovered };
}

// Hover glow effect - optimized
export function useHoverGlow(color: string = 'var(--neon-purple)') {
  const [isHovered, setIsHovered] = useState(false);

  const style = useMemo<CSSProperties>(() => ({
    boxShadow: isHovered 
      ? `0 0 30px hsl(${color} / 0.3), 0 0 60px hsl(${color} / 0.15)` 
      : 'none',
    transition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [isHovered, color]);

  const handlers = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }), []);

  return { style, handlers, isHovered };
}

// Click ripple effect - optimized
export function useClickRipple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      margin-left: -${size / 2}px;
      margin-top: -${size / 2}px;
    `;

    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  return { ref: containerRef, onClick: createRipple };
}

// Scroll progress - throttled for performance
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
          setProgress(Math.min(100, Math.max(0, scrollProgress)));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// 3D tilt on hover - RAF optimized
export function use3DTilt(maxTilt: number = 10) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      setTilt({ x: tiltX, y: tiltY });
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const style = useMemo<CSSProperties>(() => ({
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    willChange: 'transform',
  }), [tilt.x, tilt.y]);

  const handlers = useMemo(() => ({
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }), [handleMouseMove, handleMouseLeave]);

  return { ref, style, handlers };
}

// Stagger reveal - optimized with IntersectionObserver
export function useStaggerReveal(itemCount: number, baseDelay: number = 80) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getItemStyle = useCallback((index: number): CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
    transition: `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionDelay: `${index * baseDelay}ms`,
  }), [isVisible, baseDelay]);

  return { ref: containerRef, isVisible, getItemStyle };
}

// Parallax scroll effect - throttled
export function useParallaxScroll(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current && elementRef.current) {
        requestAnimationFrame(() => {
          if (!elementRef.current) return;
          const rect = elementRef.current.getBoundingClientRect();
          const scrollProgress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
          setOffset(scrollProgress * 100 * speed);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const style = useMemo<CSSProperties>(() => ({
    transform: `translate3d(0, ${offset}px, 0)`,
    willChange: 'transform',
  }), [offset]);

  return { ref: elementRef, style, offset };
}

// Icon bounce on hover
export function useIconBounce() {
  const [isHovered, setIsHovered] = useState(false);

  const style = useMemo<CSSProperties>(() => ({
    animation: isHovered ? 'icon-bounce 0.4s ease' : 'none',
  }), [isHovered]);

  const handlers = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }), []);

  return { style, handlers };
}
