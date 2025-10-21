import { useEffect, useState } from "react";

const HalloweenDecorations = () => {
  const [spiderPosition, setSpiderPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpiderPosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="halloween-decorations pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Spider Webs in Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 L50,50 M0,0 L30,0 L50,50 M0,0 L0,30 L50,50" stroke="white" strokeWidth="1" fill="none" />
          <path d="M50,50 L100,0 M50,50 L100,30 M50,50 L70,0" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="2" fill="white" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 opacity-40 scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 L50,50 M0,0 L30,0 L50,50 M0,0 L0,30 L50,50" stroke="white" strokeWidth="1" fill="none" />
          <path d="M50,50 L100,0 M50,50 L100,30 M50,50 L70,0" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="2" fill="white" />
        </svg>
      </div>

      {/* Animated Spider Crawling Down */}
      <div 
        className="absolute left-1/4 transition-all duration-100"
        style={{ top: `${spiderPosition}%` }}
      >
        <div className="relative">
          {/* Spider Web String */}
          <div className="absolute left-1/2 -translate-x-1/2 w-px bg-gray-400/30" style={{ height: `${spiderPosition * 5}px` }} />
          
          {/* Spider Body */}
          <div className="relative animate-pulse">
            <div className="w-4 h-4 bg-black rounded-full" />
            <div className="w-3 h-3 bg-black rounded-full absolute -top-2 left-0.5" />
            {/* Spider Legs */}
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div 
                  className="absolute w-4 h-px bg-black origin-left"
                  style={{ 
                    top: '8px',
                    left: i < 2 ? '-4px' : '16px',
                    transform: `rotate(${i < 2 ? (i * 30 - 30) : (i * 30 + 30)}deg)`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flying Bats */}
      <div className="absolute top-1/4 left-1/3 animate-[float_6s_ease-in-out_infinite]">
        <svg width="32" height="24" viewBox="0 0 32 24" className="opacity-70">
          <path d="M16,12 Q12,8 8,10 Q6,12 4,10 Q2,8 0,12 Q2,16 4,14 Q6,12 8,14 Q12,16 16,12 Z" fill="#1a1a1a" />
          <path d="M16,12 Q20,8 24,10 Q26,12 28,10 Q30,8 32,12 Q30,16 28,14 Q26,12 24,14 Q20,16 16,12 Z" fill="#1a1a1a" />
          <circle cx="16" cy="12" r="3" fill="#1a1a1a" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-1/4 animate-[float_8s_ease-in-out_infinite_2s]">
        <svg width="28" height="20" viewBox="0 0 32 24" className="opacity-60">
          <path d="M16,12 Q12,8 8,10 Q6,12 4,10 Q2,8 0,12 Q2,16 4,14 Q6,12 8,14 Q12,16 16,12 Z" fill="#1a1a1a" />
          <path d="M16,12 Q20,8 24,10 Q26,12 28,10 Q30,8 32,12 Q30,16 28,14 Q26,12 24,14 Q20,16 16,12 Z" fill="#1a1a1a" />
          <circle cx="16" cy="12" r="3" fill="#1a1a1a" />
        </svg>
      </div>

      {/* Pumpkins at Bottom */}
      <div className="absolute bottom-8 left-12 flex items-end gap-2">
        <div className="relative animate-[bounce-slow_4s_ease-in-out_infinite]">
          <div className="w-16 h-16 bg-orange-500 rounded-full relative">
            {/* Pumpkin Features */}
            <div className="absolute top-1/4 left-1/4 w-2 h-3 bg-black transform -rotate-12" />
            <div className="absolute top-1/4 right-1/4 w-2 h-3 bg-black transform rotate-12" />
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-6 h-4 border-4 border-black border-t-0 rounded-b-full" />
            {/* Stem */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-green-700 rounded-t" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-20 flex items-end gap-2">
        <div className="relative animate-[bounce-slow_5s_ease-in-out_infinite_1s]">
          <div className="w-12 h-12 bg-orange-600 rounded-full relative">
            <div className="absolute top-1/4 left-1/4 w-1.5 h-2 bg-black transform -rotate-12" />
            <div className="absolute top-1/4 right-1/4 w-1.5 h-2 bg-black transform rotate-12" />
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-4 h-3 border-3 border-black border-t-0 rounded-b-full" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-green-700 rounded-t" />
          </div>
        </div>
      </div>

      {/* Floating Ghosts */}
      <div className="absolute top-1/2 right-1/3 animate-[float_7s_ease-in-out_infinite]">
        <div className="relative opacity-30">
          <div className="w-8 h-10 bg-white rounded-t-full" />
          <div className="flex gap-1 -mt-1">
            <div className="w-2 h-3 bg-white rounded-b-full" />
            <div className="w-2 h-4 bg-white rounded-b-full" />
            <div className="w-2 h-3 bg-white rounded-b-full" />
          </div>
          <div className="absolute top-3 left-2 w-1.5 h-2 bg-black rounded-full" />
          <div className="absolute top-3 right-2 w-1.5 h-2 bg-black rounded-full" />
        </div>
      </div>

      {/* Orange Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/5 to-transparent" />
    </div>
  );
};

export default HalloweenDecorations;
