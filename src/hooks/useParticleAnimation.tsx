import { useState, useEffect, useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface Particle {
  id: string;
  sourceId: string;
  targetId: string;
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  progress: number;
  type: 'website' | 'social' | 'directory' | 'review';
  speed: number;
}

interface UseParticleAnimationProps {
  nodes: Node[];
  edges: Edge[];
  isAnimating: boolean;
}

export const useParticleAnimation = ({ nodes, edges, isAnimating }: UseParticleAnimationProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextParticleId, setNextParticleId] = useState(0);

  const getNodePosition = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) {
      console.log(`Node ${nodeId} not found`);
      return { x: 0, y: 0 };
    }
    
    const width = node.measured?.width || node.width || 150;
    const height = node.measured?.height || node.height || 100;
    
    const position = {
      x: node.position.x + width / 2,
      y: node.position.y + height / 2
    };
    
    console.log(`Position for ${nodeId}:`, position);
    return position;
  }, [nodes]);

  const getNodeType = useCallback((nodeId: string): 'website' | 'social' | 'directory' | 'review' => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node?.data?.type) return 'website';
    
    const nodeType = (node.data.type as string).toLowerCase();
    
    // Map node types to particle types
    if (nodeType.includes('facebook') || nodeType.includes('instagram') || 
        nodeType.includes('twitter') || nodeType.includes('linkedin') || 
        nodeType.includes('youtube') || nodeType.includes('soundcloud')) {
      return 'social';
    }
    if (nodeType.includes('review') || nodeType.includes('yelp')) {
      return 'review';
    }
    if (nodeType.includes('directory') || nodeType.includes('google') || 
        nodeType.includes('apple') || nodeType.includes('bing')) {
      return 'directory';
    }
    return 'website';
  }, [nodes]);

  const spawnParticle = useCallback(() => {
    // Find edges that connect to the main business node (center node)
    const businessNode = nodes.find(node => node.id === 'business');
    if (!businessNode) return;

    const incomingEdges = edges.filter(edge => edge.target === 'business');
    if (incomingEdges.length === 0) return;

    // Randomly select an edge to spawn a particle from
    const randomEdge = incomingEdges[Math.floor(Math.random() * incomingEdges.length)];
    const sourcePosition = getNodePosition(randomEdge.source);
    const targetPosition = getNodePosition(randomEdge.target);
    const nodeType = getNodeType(randomEdge.source);

    const newParticle: Particle = {
      id: `particle-${nextParticleId}`,
      sourceId: randomEdge.source,
      targetId: randomEdge.target,
      sourcePosition,
      targetPosition,
      progress: 0,
      type: nodeType,
      speed: 0.02 + Math.random() * 0.01 // Random speed between 0.02 and 0.03
    };

    setParticles(prev => [...prev, newParticle]);
    setNextParticleId(prev => prev + 1);
  }, [nodes, edges, nextParticleId, getNodePosition, getNodeType]);

  const updateParticles = useCallback(() => {
    setParticles(prev => 
      prev.map(particle => ({
        ...particle,
        progress: particle.progress + particle.speed
      })).filter(particle => particle.progress <= 1.0) // Remove particles that reached the target
    );
  }, []);

  const resetParticles = useCallback(() => {
    setParticles([]);
    setNextParticleId(0);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;

    // Spawn initial burst of particles
    const initialBurst = setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnParticle(), i * 200);
      }
    }, 100);

    const animationInterval = setInterval(() => {
      updateParticles();
      
      // Spawn new particles more frequently (about every 300ms)
      if (Math.random() < 0.8) {
        spawnParticle();
      }
    }, 50); // 20 FPS

    return () => {
      clearInterval(animationInterval);
      clearTimeout(initialBurst);
    };
  }, [isAnimating, updateParticles, spawnParticle]);

  // Reset particles when animation stops
  useEffect(() => {
    if (!isAnimating) {
      resetParticles();
    }
  }, [isAnimating, resetParticles]);

  return {
    particles,
    resetParticles
  };
};