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
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      pointerEvents: 'none' as const,
    };

    switch (type) {
      case 'website':
        return {
          ...baseStyle,
          backgroundColor: '#3b82f6',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
        };
      case 'social':
        return {
          ...baseStyle,
          backgroundColor: '#10b981',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
        };
      case 'directory':
        return {
          ...baseStyle,
          backgroundColor: '#f59e0b',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
        };
      case 'review':
        return {
          ...baseStyle,
          backgroundColor: '#ef4444',
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: '#6b7280',
          boxShadow: '0 0 10px rgba(107, 114, 128, 0.6)',
        };
    }
  };

  return (
    <div style={getParticleStyle()} className="particle animate-pulse" />
  );
};

export default AnimatedParticle;