import { useState } from 'react';
import { Brain, Code, TrendingUp, Zap, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const christmasEmojis = ['🎄', '🎅', '⭐', '🎁'];

const features = [
  { 
    icon: Brain, 
    label: 'AI-Powered', 
    color: 'from-purple-400 to-pink-400',
    title: 'AI-Powered Solutions',
    description: 'Leverage cutting-edge artificial intelligence to transform your business operations and customer experiences.',
    videoUrl: 'https://www.youtube.com/embed/IV7xnUkwags',
    duration: '1:47',
    thumbnail: '/thumbnails/IV7xnUkwags.jpg',
    benefits: [
      'Smart chatbots that understand context and intent',
      'Automated content generation and optimization',
      'Predictive analytics for better decision making',
      'Natural language processing for customer insights',
    ],
  },
  { 
    icon: Code, 
    label: 'Custom Code', 
    color: 'from-blue-400 to-cyan-400',
    title: 'Custom Development',
    description: 'Tailored software solutions built specifically for your unique business needs and workflows.',
    videoUrl: 'https://www.youtube.com/embed/5L1SKshqBRs',
    duration: '1:24',
    thumbnail: '/thumbnails/5L1SKshqBRs.jpg',
    benefits: [
      'Fully customized web and mobile applications',
      'Seamless integration with existing systems',
      'Scalable architecture for future growth',
      'Clean, maintainable code with documentation',
    ],
  },
  { 
    icon: TrendingUp, 
    label: 'Marketing Growth', 
    color: 'from-green-400 to-emerald-400',
    title: 'Marketing Growth',
    description: 'Data-driven marketing strategies that deliver measurable results and sustainable growth.',
    videoUrl: 'https://www.youtube.com/embed/3uskySkLeJ0',
    duration: '1:08',
    thumbnail: '/thumbnails/3uskySkLeJ0.jpg',
    benefits: [
      'Comprehensive SEO and AEO optimization',
      'Multi-channel digital marketing campaigns',
      'Advanced analytics and performance tracking',
      'Conversion rate optimization strategies',
    ],
  },
  { 
    icon: Zap, 
    label: 'Automation', 
    color: 'from-yellow-400 to-orange-400',
    title: 'Business Automation',
    description: 'Streamline operations and eliminate repetitive tasks with intelligent automation solutions.',
    videoUrl: 'https://www.youtube.com/embed/xWkWoY5WdX0',
    duration: '1:21',
    thumbnail: '/thumbnails/xWkWoY5WdX0.jpg',
    benefits: [
      'Workflow automation for repetitive tasks',
      'Smart document processing and management',
      'Automated reporting and data synchronization',
      'Integration between disconnected systems',
    ],
  },
];

interface FloatingFeatureCardsProps {
  holidayMode?: boolean;
}

export const FloatingFeatureCards = ({ holidayMode = false }: FloatingFeatureCardsProps) => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  
  return (
    <>
      <TooltipProvider>
        <div className="grid grid-cols-2 gap-4 relative z-10">
        {features.map((feature, index) => (
          <button
            key={feature.label}
            onClick={() => setSelectedFeature(index)}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer text-left w-full relative overflow-hidden"
            style={{
              animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            {/* Thumbnail Preview - Always visible */}
            {feature.thumbnail && (
              <div className="absolute inset-0 transition-opacity duration-300 z-0">
                <img 
                  src={feature.thumbnail} 
                  alt={`${feature.title} preview`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-transparent transition-all duration-300" />
              </div>
            )}
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {holidayMode ? (
                  <span className="text-2xl">{christmasEmojis[index]}</span>
                ) : (
                  <feature.icon className="w-6 h-6 text-white" />
                )}
              </div>
              <p className="text-white font-semibold text-sm">{feature.label}</p>
            </div>
            
            {feature.videoUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors animate-pulse">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div className="text-xs text-white/90 font-medium bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                      {feature.duration}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Watch Video</p>
                </TooltipContent>
              </Tooltip>
            )}
          </button>
        ))}
      </div>
      </TooltipProvider>

      {selectedFeature !== null && (
        <Dialog open={selectedFeature !== null} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="w-16 h-16 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center mb-4">
                {(() => {
                  const Icon = features[selectedFeature].icon;
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>
              <DialogTitle className="text-2xl">{features[selectedFeature].title}</DialogTitle>
              <DialogDescription className="text-base">
                {features[selectedFeature].description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Video Embed */}
              {features[selectedFeature].videoUrl && (
                <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={features[selectedFeature].videoUrl}
                    title={features[selectedFeature].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}


              {/* Benefits */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Key Benefits</h3>
                <div className="space-y-2">
                  {features[selectedFeature].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={() => window.location.href = '#contact'}>
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => window.location.href = '#services'}>
                  Learn More
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
