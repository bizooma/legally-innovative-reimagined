import { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
  size: number;
}

export const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const leafEmojis = ['🍁', '🍂'];
    const newLeaves = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      emoji: leafEmojis[Math.floor(Math.random() * leafEmojis.length)],
      size: 20 + Math.random() * 15,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-fall-leaf"
          style={{
            left: `${leaf.left}%`,
            top: '-50px',
            fontSize: `${leaf.size}px`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          {leaf.emoji}
        </div>
      ))}
    </div>
  );
};
