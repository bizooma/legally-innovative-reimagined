export const ChristmasBanner = () => {
  const christmasItems = [
    '🎄', '🎅', '🎁', '⭐', '🦌', '🔔', '❄️', '☕', 
    '🍪', '🥛', '🕯️', '🎶', '🧦', '🤶', '✨', '🌟'
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
      <div className="bg-gradient-to-t from-red-900/90 via-green-800/80 to-transparent backdrop-blur-sm py-4 px-6 animate-slide-up-banner shadow-2xl border-t-4 border-red-600/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            <div className="flex items-center gap-4 animate-scroll-feast">
              {[...christmasItems, ...christmasItems].map((emoji, index) => (
                <span 
                  key={index}
                  className="text-4xl animate-bounce-slow"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '2s',
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-red-100 font-semibold text-lg tracking-wide">
              🎄 Merry Christmas! ❄️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
