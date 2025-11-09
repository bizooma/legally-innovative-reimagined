export const PeekingTurkeys = () => {
  const positions = [
    { bottom: '20%', left: '0%', direction: 'left' as const },
    { top: '30%', right: '0%', direction: 'right' as const },
    { bottom: '40%', right: '0%', direction: 'right' as const },
    { top: '50%', left: '0%', direction: 'left' as const },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {positions.map((pos, index) => {
        const { direction, ...cssProps } = pos;
        return (
          <div
            key={index}
            className="absolute group pointer-events-auto"
            style={{
              ...cssProps,
              width: '80px',
              height: '80px',
            }}
          >
            <div
              className="text-5xl transition-all duration-500 ease-out absolute"
              style={{
                [direction]: '-60px',
                transform: direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
              }}
            >
              <div className="group-hover:translate-x-0 transition-transform duration-500" style={{ 
                transform: direction === 'left' ? 'translateX(80px)' : 'translateX(-80px)' 
              }}>
                🦃
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
