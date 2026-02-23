import { useScrollProgress } from '@/hooks/useMicroInteractions';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, hsl(var(--neon-purple)), hsl(var(--neon-cyan)), hsl(var(--neon-blue)))',
          boxShadow: '0 0 10px hsl(var(--neon-purple) / 0.5), 0 0 20px hsl(var(--neon-cyan) / 0.3)',
        }}
      />
    </div>
  );
}
