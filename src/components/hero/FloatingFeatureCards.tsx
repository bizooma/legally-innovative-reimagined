import { Brain, Code, TrendingUp, Zap } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';

const features = [
  { icon: Brain, label: 'AI-Powered', color: 'from-purple-400 to-pink-400' },
  { icon: Code, label: 'Custom Code', color: 'from-blue-400 to-cyan-400' },
  { icon: TrendingUp, label: 'Marketing Growth', color: 'from-green-400 to-emerald-400' },
  { icon: Zap, label: 'Automation', color: 'from-yellow-400 to-orange-400' },
];

export const FloatingFeatureCards = () => {
  const parallaxOffset = useParallax(0.7);
  
  return (
    <div 
      className="grid grid-cols-2 gap-4 relative z-10 transition-transform duration-100"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {features.map((feature, index) => (
        <div
          key={feature.label}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          style={{
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <p className="text-white font-semibold text-sm">{feature.label}</p>
        </div>
      ))}
    </div>
  );
};
