import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import techBg from "@/assets/hero-tech-bg.jpg";
import { trackPhoneClick, trackCTAClick } from "@/utils/gtmTracking";
import { ResponsiveImage } from "@/components/ui/responsive-image";
const Hero = () => {
  useEffect(() => {
    // Create the script element dynamically so it runs after mount
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v2/index.js';

    // Required data attributes
    script.setAttribute('data-mode', 'full');
    script.setAttribute('data-client-key', 'Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP');
    script.setAttribute('data-agent-id', 'v2_agt_aHkCdBDR');
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-monitor', 'true');
    script.setAttribute('data-target-id', 'did-agent-hero');

    // Debugging hooks
    script.onload = () => {
      console.log('✅ D-ID script loaded successfully in Hero');
    };
    script.onerror = error => {
      console.error('❌ D-ID script failed to load:', error);
    };
    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      console.log('🧹 Cleaning up D-ID script from Hero');
      document.body.removeChild(script);
    };
  }, []);
  return <section id="home" className="relative flex items-center justify-center pt-20 pb-12 section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage 
          src={techBg} 
          alt="AI-Powered Marketing Technology Background - Digital Innovation for Law Firms" 
          sizes="100vw"
          widths={[640, 1024, 1280, 1536, 1920]}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-legal-primary/90 via-legal-primary/70 to-legal-primary/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-legal-primary/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-fade-in">
            <p className="text-lg md:text-xl font-semibold mb-4 text-legal-accent tracking-wide">
              Bizooma Digital Marketing Agency
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Where <span className="bg-gradient-to-r from-white to-legal-accent bg-clip-text text-transparent">Marketing</span> Meets <span className="bg-gradient-to-r from-white to-legal-accent bg-clip-text text-transparent">Code + AI</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-legal-light">At Bizooma, we specialize in building intelligent marketing and software solutions powered by artificial intelligence. Our team helps law firms, nonprofits, and startups accelerate growth through AI-driven marketing strategies, custom software development, and automation tools that attract, engage, and convert leads with precision.</p>
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-white mb-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Phone size={20} className="mr-2" />
                <a 
                  href="tel:9042956670" 
                  onClick={() => trackPhoneClick('904-295-6670', 'Hero Section')}
                  className="text-lg hover:underline"
                >
                  904-295-6670
                </a>
              </div>
              <div>
                <Button 
                  className="bg-white hover:bg-legal-accent text-legal-primary hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl" 
                  onClick={() => {
                    trackCTAClick('Our Services', 'Hero Section');
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Our Services
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - D-ID Agent */}
          <div className="relative">
            <div id="did-agent-hero" className="w-full h-[600px] min-h-[560px] bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl relative z-10" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-legal-accent rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-white rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-legal-accent rounded-full animate-pulse opacity-80 animation-delay-2000"></div>
    </section>;
};
export default Hero;