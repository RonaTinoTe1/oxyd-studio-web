import { memo } from 'react';

// Optimized gradient orbs with pure CSS animations - no JS scroll listeners
export const GradientOrbs = memo(function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Primary purple orb - top left */}
      <div
        className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full opacity-40 blur-[100px] animate-orb-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-purple) / 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Cyan orb - top right */}
      <div
        className="absolute -top-20 -right-32 h-[380px] w-[380px] rounded-full opacity-30 blur-[80px] animate-orb-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-cyan) / 0.5) 0%, transparent 70%)',
          animationDelay: '-12s',
          animationDuration: '28s',
        }}
      />

      {/* Blue orb - middle left */}
      <div
        className="absolute top-1/3 -left-20 h-[320px] w-[320px] rounded-full opacity-25 blur-[80px] animate-orb-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-blue) / 0.4) 0%, transparent 70%)',
          animationDelay: '-6s',
          animationDuration: '32s',
        }}
      />

      {/* Pink orb - center right */}
      <div
        className="absolute top-1/2 -right-20 h-[400px] w-[400px] rounded-full opacity-25 blur-[90px] animate-orb-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-pink) / 0.4) 0%, transparent 70%)',
          animationDelay: '-18s',
          animationDuration: '26s',
        }}
      />

      {/* Accent orb - bottom */}
      <div
        className="absolute -bottom-32 left-1/3 h-[350px] w-[350px] rounded-full opacity-30 blur-[80px] animate-orb-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-purple) / 0.35) 0%, transparent 70%)',
          animationDelay: '-22s',
          animationDuration: '30s',
        }}
      />
    </div>
  );
});
