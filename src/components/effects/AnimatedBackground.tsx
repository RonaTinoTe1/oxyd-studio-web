import { memo } from 'react';

// Pure CSS animated background - no JavaScript calculations for buttery smooth performance
export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle grid with CSS animation */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-purple) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-purple) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large floating orbs - pure CSS animations */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.15] animate-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-purple) / 0.5) 0%, transparent 70%)',
          left: '5%',
          top: '10%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.12] animate-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-cyan) / 0.5) 0%, transparent 70%)',
          right: '5%',
          top: '30%',
          animationDelay: '-8s',
          animationDuration: '25s',
        }}
      />
      <div
        className="absolute w-[550px] h-[550px] rounded-full blur-[110px] opacity-[0.1] animate-float gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-blue) / 0.4) 0%, transparent 70%)',
          left: '25%',
          bottom: '5%',
          animationDelay: '-15s',
          animationDuration: '30s',
        }}
      />
    </div>
  );
});
