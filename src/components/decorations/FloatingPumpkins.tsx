export const FloatingPumpkins = () => {
  const pumpkins = [
    { top: '15%', left: '5%', delay: '0s', duration: '4s', size: '50px' },
    { top: '60%', right: '8%', delay: '1s', duration: '5s', size: '60px' },
    { bottom: '25%', left: '10%', delay: '2s', duration: '4.5s', size: '55px' },
    { top: '40%', right: '15%', delay: '0.5s', duration: '6s', size: '45px' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pumpkins.map((pumpkin, index) => (
        <div
          key={index}
          className="absolute animate-bounce-slow opacity-70"
          style={{
            top: pumpkin.top,
            bottom: pumpkin.bottom,
            left: pumpkin.left,
            right: pumpkin.right,
            animationDelay: pumpkin.delay,
            animationDuration: pumpkin.duration,
            width: pumpkin.size,
            height: pumpkin.size,
          }}
        >
          {/* Pumpkin body */}
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ff8c42, #ff6b35)',
                boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.2), 2px 2px 10px rgba(0,0,0,0.3)',
              }}
            />
            {/* Vertical ridges */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-1 h-full bg-black/10 rounded-full" style={{ marginLeft: '-30%' }} />
              <div className="w-1 h-full bg-black/10 rounded-full" style={{ marginLeft: '-15%' }} />
              <div className="w-1 h-full bg-black/10 rounded-full" />
              <div className="w-1 h-full bg-black/10 rounded-full" style={{ marginLeft: '15%' }} />
              <div className="w-1 h-full bg-black/10 rounded-full" style={{ marginLeft: '30%' }} />
            </div>
            {/* Stem */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-3 rounded-t-lg"
              style={{
                background: '#8B4513',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
