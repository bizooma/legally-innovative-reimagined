import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  rotation: number;
}

export const AutumnConfetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const emojis = ['🍁', '🍂', '🦃', '🌽', '🥧'];
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);

    // Hide after animation completes
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[101] overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-burst"
          style={{
            left: `${piece.left}%`,
            top: '-50px',
            fontSize: '24px',
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          {piece.emoji}
        </div>
      ))}
    </div>
  );
};
