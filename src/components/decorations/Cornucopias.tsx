export const Cornucopias = () => {
  const cornucopias = [
    { top: '10%', left: '12%', rotation: '-15deg', delay: '0s' },
    { bottom: '15%', right: '10%', rotation: '20deg', delay: '1.5s' },
    { top: '70%', left: '8%', rotation: '10deg', delay: '3s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {cornucopias.map((cornucopia, index) => (
        <div
          key={index}
          className="absolute text-6xl animate-float-slow opacity-70"
          style={{
            top: cornucopia.top,
            bottom: cornucopia.bottom,
            left: cornucopia.left,
            right: cornucopia.right,
            transform: `rotate(${cornucopia.rotation})`,
            animationDelay: cornucopia.delay,
          }}
        >
          🌽🍎🍇🥕
        </div>
      ))}
    </div>
  );
};
