import React from 'react';

interface ParticlePosition {
  x: number;
  y: number;
}

interface AnimatedParticleProps {
  id: string;
  sourcePosition: ParticlePosition;
  targetPosition: ParticlePosition;
  progress: number;
  type: 'website' | 'social' | 'directory' | 'review';
}

const AnimatedParticle: React.FC<AnimatedParticleProps> = ({
  sourcePosition,
  targetPosition,
  progress,
  type
}) => {
  // Calculate bezier curve position along the edge path
  const calculatePosition = (progress: number) => {
    // Add some curve to the particle path for more visual interest
    const dx = targetPosition.x - sourcePosition.x;
    const dy = targetPosition.y - sourcePosition.y;
    
    // Linear interpolation with slight curve
    const x = sourcePosition.x + dx * progress;
    const y = sourcePosition.y + dy * progress + Math.sin(progress * Math.PI) * 20; // Add slight arc
    
    return { x, y };
  };

  const position = calculatePosition(progress);
  
  // Different particle styles based on type
  const getParticleStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.1s linear',
      zIndex: 1000,
      pointerEvents: 'none' as const,
    };

    switch (type) {
      case 'website':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--primary))',
          boxShadow: '0 0 10px hsl(var(--primary) / 0.6)',
        };
      case 'social':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--accent))',
          boxShadow: '0 0 10px hsl(var(--accent) / 0.6)',
        };
      case 'directory':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--secondary))',
          boxShadow: '0 0 10px hsl(var(--secondary) / 0.6)',
        };
      case 'review':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--destructive))',
          boxShadow: '0 0 10px hsl(var(--destructive) / 0.6)',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--muted-foreground))',
          boxShadow: '0 0 10px hsl(var(--muted-foreground) / 0.6)',
        };
    }
  };

  return (
    <div style={getParticleStyle()} className="particle animate-pulse" />
  );
};

export default AnimatedParticle;