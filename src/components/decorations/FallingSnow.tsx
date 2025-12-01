import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
  size: number;
}

export const FallingSnow = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const snowEmojis = ['❄️', '⛄', '✨'];
    const newSnowflakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5,
      emoji: snowEmojis[Math.floor(Math.random() * snowEmojis.length)],
      size: 15 + Math.random() * 20,
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute animate-snowfall"
          style={{
            left: `${snowflake.left}%`,
            top: '-50px',
            fontSize: `${snowflake.size}px`,
            animationDelay: `${snowflake.delay}s`,
            animationDuration: `${snowflake.duration}s`,
          }}
        >
          {snowflake.emoji}
        </div>
      ))}
    </div>
  );
};
