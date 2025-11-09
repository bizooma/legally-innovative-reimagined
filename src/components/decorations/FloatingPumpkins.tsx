export const FloatingPumpkins = () => {
  const pumpkins = [
    { emoji: '🎃', top: '15%', left: '5%', delay: '0s', duration: '4s' },
    { emoji: '🎃', top: '60%', right: '8%', delay: '1s', duration: '5s' },
    { emoji: '🎃', bottom: '25%', left: '10%', delay: '2s', duration: '4.5s' },
    { emoji: '🎃', top: '40%', right: '15%', delay: '0.5s', duration: '6s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pumpkins.map((pumpkin, index) => (
        <div
          key={index}
          className="absolute text-5xl animate-bounce-slow opacity-60"
          style={{
            top: pumpkin.top,
            bottom: pumpkin.bottom,
            left: pumpkin.left,
            right: pumpkin.right,
            animationDelay: pumpkin.delay,
            animationDuration: pumpkin.duration,
          }}
        >
          {pumpkin.emoji}
        </div>
      ))}
    </div>
  );
};
