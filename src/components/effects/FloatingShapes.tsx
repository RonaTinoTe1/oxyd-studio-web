import { useParallax } from '@/hooks/useScrollAnimation';

interface FloatingShape {
  type: 'sphere' | 'cube' | 'torus' | 'ring';
  size: number;
  position: { x: string; y: string };
  color: string;
  speed: number;
  rotation?: number;
}

const shapes: FloatingShape[] = [
  { type: 'sphere', size: 60, position: { x: '10%', y: '20%' }, color: 'neon-purple', speed: 0.3, rotation: 0 },
  { type: 'cube', size: 40, position: { x: '85%', y: '15%' }, color: 'neon-cyan', speed: 0.2, rotation: 45 },
  { type: 'ring', size: 80, position: { x: '75%', y: '60%' }, color: 'neon-blue', speed: 0.4, rotation: 30 },
  { type: 'sphere', size: 30, position: { x: '20%', y: '70%' }, color: 'neon-pink', speed: 0.25, rotation: 0 },
  { type: 'torus', size: 50, position: { x: '60%', y: '80%' }, color: 'neon-purple', speed: 0.35, rotation: 60 },
];

function Shape({ shape }: { shape: FloatingShape }) {
  const offset = useParallax(shape.speed);
  
  const baseStyle = {
    left: shape.position.x,
    top: shape.position.y,
    width: shape.size,
    height: shape.size,
    transform: `translateY(${offset}px) rotate(${(shape.rotation || 0) + offset * 0.1}deg)`,
  };

  const getShapeClasses = () => {
    const colorVar = `var(--${shape.color})`;
    const baseClasses = 'absolute opacity-20 transition-transform duration-100';
    
    switch (shape.type) {
      case 'sphere':
        return {
          className: `${baseClasses} rounded-full`,
          style: {
            ...baseStyle,
            background: `radial-gradient(circle at 30% 30%, hsl(${colorVar} / 0.6), hsl(${colorVar} / 0.2))`,
            boxShadow: `0 0 40px hsl(${colorVar} / 0.3)`,
          },
        };
      case 'cube':
        return {
          className: `${baseClasses} rounded-lg`,
          style: {
            ...baseStyle,
            background: `linear-gradient(135deg, hsl(${colorVar} / 0.4), hsl(${colorVar} / 0.1))`,
            border: `1px solid hsl(${colorVar} / 0.3)`,
            boxShadow: `0 0 30px hsl(${colorVar} / 0.2)`,
          },
        };
      case 'ring':
        return {
          className: `${baseClasses} rounded-full`,
          style: {
            ...baseStyle,
            background: 'transparent',
            border: `3px solid hsl(${colorVar} / 0.4)`,
            boxShadow: `0 0 20px hsl(${colorVar} / 0.2), inset 0 0 20px hsl(${colorVar} / 0.1)`,
          },
        };
      case 'torus':
        return {
          className: `${baseClasses} rounded-full`,
          style: {
            ...baseStyle,
            background: `conic-gradient(from 0deg, hsl(${colorVar} / 0.4), hsl(${colorVar} / 0.1), hsl(${colorVar} / 0.4))`,
            boxShadow: `0 0 25px hsl(${colorVar} / 0.2)`,
          },
        };
      default:
        return { className: baseClasses, style: baseStyle };
    }
  };

  const { className, style } = getShapeClasses();

  return <div className={className} style={style} />;
}

export function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <Shape key={index} shape={shape} />
      ))}
    </div>
  );
}
