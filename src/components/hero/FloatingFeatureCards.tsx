import { useState } from 'react';
import { Brain, Code, TrendingUp, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const features = [
  { 
    icon: Brain, 
    label: 'AI-Powered', 
    color: 'from-purple-400 to-pink-400',
    title: 'AI-Powered Solutions',
    description: 'Leverage cutting-edge artificial intelligence to transform your business operations and customer experiences.',
    videoUrl: 'https://www.youtube.com/embed/IV7xnUkwags',
    stats: [
      { value: '87%', label: 'Efficiency Increase' },
      { value: '3x', label: 'Faster Response Times' },
      { value: '24/7', label: 'Automated Support' },
    ],
    benefits: [
      'Smart chatbots that understand context and intent',
      'Automated content generation and optimization',
      'Predictive analytics for better decision making',
      'Natural language processing for customer insights',
    ],
    caseStudy: 'Helped a law firm reduce response time by 75% while increasing client satisfaction scores from 3.2 to 4.8 stars.',
  },
  { 
    icon: Code, 
    label: 'Custom Code', 
    color: 'from-blue-400 to-cyan-400',
    title: 'Custom Development',
    description: 'Tailored software solutions built specifically for your unique business needs and workflows.',
    videoUrl: 'https://www.youtube.com/embed/5L1SKshqBRs',
    stats: [
      { value: '100%', label: 'Custom Built' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '50+', label: 'Integrations Available' },
    ],
    benefits: [
      'Fully customized web and mobile applications',
      'Seamless integration with existing systems',
      'Scalable architecture for future growth',
      'Clean, maintainable code with documentation',
    ],
    caseStudy: 'Built a custom CRM that increased a client\'s lead conversion rate by 45% and reduced manual data entry by 90%.',
  },
  { 
    icon: TrendingUp, 
    label: 'Marketing Growth', 
    color: 'from-green-400 to-emerald-400',
    title: 'Marketing Growth',
    description: 'Data-driven marketing strategies that deliver measurable results and sustainable growth.',
    videoUrl: 'https://www.youtube.com/embed/3uskySkLeJ0',
    stats: [
      { value: '320%', label: 'Avg. ROI Increase' },
      { value: '5x', label: 'Lead Generation Growth' },
      { value: '#1', label: 'Average Search Rankings' },
    ],
    benefits: [
      'Comprehensive SEO and AEO optimization',
      'Multi-channel digital marketing campaigns',
      'Advanced analytics and performance tracking',
      'Conversion rate optimization strategies',
    ],
    caseStudy: 'Increased a client\'s organic traffic by 425% and generated $2.3M in new revenue within 12 months.',
  },
  { 
    icon: Zap, 
    label: 'Automation', 
    color: 'from-yellow-400 to-orange-400',
    title: 'Business Automation',
    description: 'Streamline operations and eliminate repetitive tasks with intelligent automation solutions.',
    videoUrl: 'https://www.youtube.com/embed/xWkWoY5WdX0',
    stats: [
      { value: '40hrs', label: 'Saved Per Week' },
      { value: '95%', label: 'Error Reduction' },
      { value: '$100K+', label: 'Annual Savings' },
    ],
    benefits: [
      'Workflow automation for repetitive tasks',
      'Smart document processing and management',
      'Automated reporting and data synchronization',
      'Integration between disconnected systems',
    ],
    caseStudy: 'Automated invoice processing for a client, reducing processing time from 5 days to 2 hours and eliminating 98% of errors.',
  },
];

export const FloatingFeatureCards = () => {
  const parallaxOffset = useParallax(0.7);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  
  return (
    <>
      <div 
        className="grid grid-cols-2 gap-4 relative z-10 transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        {features.map((feature, index) => (
          <button
            key={feature.label}
            onClick={() => setSelectedFeature(index)}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer text-left w-full"
            style={{
              animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-semibold text-sm">{feature.label}</p>
          </button>
        ))}
      </div>

      {selectedFeature !== null && (
        <Dialog open={selectedFeature !== null} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${features[selectedFeature].color} flex items-center justify-center mb-4`}>
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {features[selectedFeature].stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

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

              {/* Case Study */}
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-2 text-primary">Success Story</h3>
                <p className="text-sm text-muted-foreground">{features[selectedFeature].caseStudy}</p>
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
