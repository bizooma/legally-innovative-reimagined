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
      {/* Large Realistic Spider Webs in Corners */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-70">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          {/* Radial threads */}
          <line x1="100" y1="100" x2="0" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="100" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="150" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="200" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="200" y2="50" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="0" y2="50" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="0" y2="100" stroke="#e0e0e0" strokeWidth="2" />
          
          {/* Spiral threads */}
          <path d="M 100,100 Q 80,80 65,70 T 40,35 T 20,15" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 95,75 90,55 T 85,20 T 80,5" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 110,80 120,65 T 145,35 T 165,15" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 120,90 140,85 T 175,75 T 195,70" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 85,110 70,115 T 40,120 T 15,125" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          
          {/* Concentric circles */}
          <circle cx="100" cy="100" r="20" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="#f5f5f5" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="80" stroke="#e8e8e8" strokeWidth="1.5" fill="none" />
          
          {/* Center point */}
          <circle cx="100" cy="100" r="3" fill="#ffffff" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-70 scale-x-[-1]">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <line x1="100" y1="100" x2="0" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="100" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="150" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="200" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="200" y2="50" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="0" y2="50" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="0" y2="100" stroke="#e0e0e0" strokeWidth="2" />
          
          <path d="M 100,100 Q 80,80 65,70 T 40,35 T 20,15" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 95,75 90,55 T 85,20 T 80,5" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 110,80 120,65 T 145,35 T 165,15" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 120,90 140,85 T 175,75 T 195,70" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <path d="M 100,100 Q 85,110 70,115 T 40,120 T 15,125" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          
          <circle cx="100" cy="100" r="20" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="#f5f5f5" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="80" stroke="#e8e8e8" strokeWidth="1.5" fill="none" />
          
          <circle cx="100" cy="100" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Additional webs in bottom corners */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-60 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <line x1="100" y1="100" x2="0" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <line x1="100" y1="100" x2="100" y2="0" stroke="#e0e0e0" strokeWidth="2" />
          <circle cx="100" cy="100" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="50" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="#e8e8e8" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Realistic Animated Spider Crawling Down */}
      <div 
        className="absolute left-1/4 transition-all duration-100"
        style={{ top: `${spiderPosition}%` }}
      >
        <div className="relative">
          {/* Silk Thread */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-300 to-gray-400 shadow-sm" style={{ height: `${spiderPosition * 5}px` }} />
          
          {/* Realistic Spider Body */}
          <div className="relative">
            {/* Abdomen */}
            <div className="w-7 h-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full relative shadow-lg border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-full" />
              {/* Hair texture */}
              <div className="absolute inset-0 opacity-40">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute w-px h-1 bg-gray-600" style={{ 
                    left: `${20 + i * 10}%`, 
                    top: `${15 + (i % 3) * 25}%`,
                    transform: `rotate(${i * 15}deg)`
                  }} />
                ))}
              </div>
            </div>
            
            {/* Cephalothorax (head) */}
            <div className="w-5 h-5 bg-gradient-to-br from-gray-800 via-black to-gray-900 rounded-full absolute -top-3 left-1 shadow-lg border border-gray-700">
              {/* Red eyes that glow */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_4px_rgba(220,38,38,0.8)]" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_4px_rgba(220,38,38,0.8)]" />
              <div className="absolute top-2.5 left-0.5 w-0.5 h-0.5 bg-red-500 rounded-full" />
              <div className="absolute top-2.5 right-0.5 w-0.5 h-0.5 bg-red-500 rounded-full" />
            </div>
            
            {/* Realistic Spider Legs - 8 legs total */}
            {[...Array(8)].map((_, i) => {
              const side = i < 4 ? -1 : 1;
              const legIndex = i % 4;
              const baseAngle = side === -1 ? -45 - (legIndex * 25) : 45 + (legIndex * 25);
              
              return (
                <div key={i}>
                  {/* First leg segment */}
                  <div 
                    className="absolute w-6 h-0.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 origin-left shadow-sm rounded-full"
                    style={{ 
                      top: `${12 + legIndex * 3}px`,
                      left: side === -1 ? '-2px' : '28px',
                      transform: `rotate(${baseAngle}deg)`,
                    }}
                  >
                    {/* Second leg segment */}
                    <div 
                      className="absolute left-full w-5 h-0.5 bg-gradient-to-r from-gray-800 to-gray-900 origin-left shadow-sm rounded-full"
                      style={{ 
                        transform: `rotate(${side * 35}deg)`,
                      }}
                    >
                      {/* Third leg segment */}
                      <div 
                        className="absolute left-full w-3 h-0.5 bg-gray-900 origin-left shadow-sm rounded-full"
                        style={{ 
                          transform: `rotate(${side * 25}deg)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Realistic Flying Bats */}
      <div className="absolute top-1/4 left-1/3 animate-[float_6s_ease-in-out_infinite]">
        <svg width="48" height="32" viewBox="0 0 64 48" className="opacity-80 drop-shadow-xl">
          {/* Left wing */}
          <path d="M 32,24 Q 24,16 16,18 Q 12,20 8,18 Q 4,16 2,20 Q 0,24 2,28 Q 4,24 8,26 Q 12,28 16,26 Q 24,24 32,24" 
                fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5" />
          {/* Right wing */}
          <path d="M 32,24 Q 40,16 48,18 Q 52,20 56,18 Q 60,16 62,20 Q 64,24 62,28 Q 60,24 56,26 Q 52,28 48,26 Q 40,24 32,24" 
                fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5" />
          {/* Body */}
          <ellipse cx="32" cy="24" rx="4" ry="6" fill="#000000" />
          {/* Head */}
          <circle cx="32" cy="20" r="3" fill="#0a0a0a" />
          {/* Ears */}
          <path d="M 30,18 L 29,15 L 31,17 Z" fill="#1a1a1a" />
          <path d="M 34,18 L 35,15 L 33,17 Z" fill="#1a1a1a" />
          {/* Glowing red eyes */}
          <circle cx="30.5" cy="20" r="0.8" fill="#dc2626" className="animate-pulse" />
          <circle cx="33.5" cy="20" r="0.8" fill="#dc2626" className="animate-pulse" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-1/4 animate-[float_8s_ease-in-out_infinite_2s]">
        <svg width="40" height="28" viewBox="0 0 64 48" className="opacity-75 drop-shadow-xl">
          <path d="M 32,24 Q 24,16 16,18 Q 12,20 8,18 Q 4,16 2,20 Q 0,24 2,28 Q 4,24 8,26 Q 12,28 16,26 Q 24,24 32,24" 
                fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5" />
          <path d="M 32,24 Q 40,16 48,18 Q 52,20 56,18 Q 60,16 62,20 Q 64,24 62,28 Q 60,24 56,26 Q 52,28 48,26 Q 40,24 32,24" 
                fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5" />
          <ellipse cx="32" cy="24" rx="4" ry="6" fill="#000000" />
          <circle cx="32" cy="20" r="3" fill="#0a0a0a" />
          <path d="M 30,18 L 29,15 L 31,17 Z" fill="#1a1a1a" />
          <path d="M 34,18 L 35,15 L 33,17 Z" fill="#1a1a1a" />
          <circle cx="30.5" cy="20" r="0.8" fill="#dc2626" className="animate-pulse" />
          <circle cx="33.5" cy="20" r="0.8" fill="#dc2626" className="animate-pulse" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 animate-[float_9s_ease-in-out_infinite_4s]">
        <svg width="36" height="26" viewBox="0 0 64 48" className="opacity-70 drop-shadow-xl">
          <path d="M 32,24 Q 24,16 16,18 Q 12,20 8,18 Q 4,16 2,20 Q 0,24 2,28 Q 4,24 8,26 Q 12,28 16,26 Q 24,24 32,24" 
                fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5" />
          <path d="M 32,24 Q 40,16 48,18 Q 52,20 56,18 Q 60,16 62,20 Q 64,24 62,28 Q 60,24 56,26 Q 52,28 48,26 Q 40,24 32,24" 
                fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.5" />
          <ellipse cx="32" cy="24" rx="4" ry="6" fill="#000000" />
          <circle cx="32" cy="20" r="3" fill="#0a0a0a" />
          <circle cx="30.5" cy="20" r="0.8" fill="#dc2626" className="animate-pulse" />
          <circle cx="33.5" cy="20" r="0.8" fill="#dc2626" className="animate-pulse" />
        </svg>
      </div>

      {/* Realistic Carved Pumpkins at Bottom */}
      <div className="absolute bottom-8 left-12 flex items-end gap-2">
        <div className="relative animate-[bounce-slow_4s_ease-in-out_infinite]">
          <div className="relative w-20 h-20">
            {/* Pumpkin body with ridges */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full shadow-2xl">
              {/* Vertical ridges */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute inset-y-0 w-px bg-orange-800/40" style={{ left: `${15 + i * 14}%` }} />
              ))}
              
              {/* Carved evil eyes */}
              <div className="absolute top-1/4 left-1/4 w-4 h-5 bg-black transform -rotate-12 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/50 to-orange-400/30" />
                <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(251,191,36,0.6)]" />
              </div>
              <div className="absolute top-1/4 right-1/4 w-4 h-5 bg-black transform rotate-12 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/50 to-orange-400/30" />
                <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(251,191,36,0.6)]" />
              </div>
              
              {/* Carved nose */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black shadow-inner">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-yellow-500/40 to-transparent" />
              </div>
              
              {/* Carved scary mouth */}
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex gap-0.5">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="relative">
                    <div className="w-1.5 h-3 bg-black shadow-inner" style={{ height: i % 2 === 0 ? '12px' : '16px' }}>
                      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/40 to-transparent" />
                      <div className="absolute inset-0 shadow-[inset_0_0_6px_rgba(251,191,36,0.5)]" />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(251,191,36,0.3)]" />
            </div>
            
            {/* Realistic stem */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-6 bg-gradient-to-br from-green-700 via-green-800 to-green-900 shadow-lg" style={{ 
              clipPath: 'polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-600/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-20 flex items-end gap-2">
        <div className="relative animate-[bounce-slow_5s_ease-in-out_infinite_1s]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full shadow-2xl">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute inset-y-0 w-px bg-orange-800/40" style={{ left: `${15 + i * 17}%` }} />
              ))}
              
              {/* Evil grin */}
              <div className="absolute top-1/3 left-1/4 w-3 h-4 bg-black transform -rotate-12 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/40 to-transparent" />
              </div>
              <div className="absolute top-1/3 right-1/4 w-3 h-4 bg-black transform rotate-12 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/40 to-transparent" />
              </div>
              
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 h-4 border-4 border-black border-t-0 rounded-b-full shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/40 to-transparent rounded-b-full" />
              </div>
              
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(251,191,36,0.3)]" />
            </div>
            
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-5 bg-gradient-to-br from-green-700 via-green-800 to-green-900 shadow-lg" style={{ 
              clipPath: 'polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%)'
            }} />
          </div>
        </div>
      </div>

      {/* Eerie Floating Ghosts with transparency */}
      <div className="absolute top-1/2 right-1/3 animate-[float_7s_ease-in-out_infinite]">
        <div className="relative opacity-40">
          <div className="w-10 h-14 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-full shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-t-full" />
          </div>
          <div className="flex gap-1 -mt-1">
            <div className="w-2.5 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full shadow-lg" />
            <div className="w-2.5 h-5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full shadow-lg" />
            <div className="w-2.5 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full shadow-lg" />
          </div>
          {/* Hollow dark eyes */}
          <div className="absolute top-4 left-2 w-2 h-3 bg-black rounded-full shadow-inner" />
          <div className="absolute top-4 right-2 w-2 h-3 bg-black rounded-full shadow-inner" />
          {/* Open mouth */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-4 bg-black rounded-full shadow-inner" />
        </div>
      </div>

      <div className="absolute top-2/3 left-1/5 animate-[float_9s_ease-in-out_infinite_3s]">
        <div className="relative opacity-35">
          <div className="w-8 h-12 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-full shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-t-full" />
          </div>
          <div className="flex gap-0.5 -mt-1">
            <div className="w-2 h-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full shadow-lg" />
            <div className="w-2 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full shadow-lg" />
            <div className="w-2 h-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-full shadow-lg" />
          </div>
          <div className="absolute top-3 left-1.5 w-1.5 h-2 bg-black rounded-full shadow-inner" />
          <div className="absolute top-3 right-1.5 w-1.5 h-2 bg-black rounded-full shadow-inner" />
          <div className="absolute top-7 left-1/2 -translate-x-1/2 w-2 h-3 bg-black rounded-full shadow-inner" />
        </div>
      </div>

      {/* Glowing eyes in the darkness */}
      <div className="absolute top-1/3 left-10 flex gap-2">
        <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse" />
        <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse" />
      </div>

      <div className="absolute bottom-1/3 right-16 flex gap-2">
        <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Spooky Atmosphere Glows */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-orange-600/8 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-600/8 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-red-900/5 via-transparent to-orange-900/5" />
    </div>
  );
};

export default HalloweenDecorations;
