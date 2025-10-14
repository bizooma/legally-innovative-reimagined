import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import techBg from "@/assets/hero-tech-bg.jpg";
import { useEffect } from "react";
// Import D-ID embed loader
import { loadDidAgentEmbed } from "@/utils/loadDidAgent";

const Hero = () => {
  useEffect(() => {
    // Load D-ID embed after component mounts
    const timer = setTimeout(() => {
      loadDidAgentEmbed('did-agent-hero-container').catch((error) => {
        console.error('[Hero] Failed to load D-ID embed:', error);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center pt-20 pb-12 section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={techBg}
          alt="Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-legal-primary/90 via-legal-primary/70 to-legal-primary/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-legal-primary/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Where <span className="bg-gradient-to-r from-white to-legal-accent bg-clip-text text-transparent">Innovation</span> Meets <span className="bg-gradient-to-r from-white to-legal-accent bg-clip-text text-transparent">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-legal-light">
              At Legally Innovative, we are passionate about helping law firms thrive in the digital age. As a full-service marketing and AI automations provider, we understand the unique challenges that law firms face in generating, nurturing, and converting leads.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-white mb-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Phone size={20} className="mr-2" />
                <a href="tel:8453779730" className="text-lg hover:underline">845-377-9730</a>
              </div>
              <div>
                <Button 
                  className="bg-white hover:bg-legal-accent text-legal-primary hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Our Services
                </Button>
              </div>
            </div>
          </div>
          
          {/* D-ID Agent Embed */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div 
              id="did-agent-hero-container" 
              className="w-full h-[600px] rounded-lg shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-legal-accent rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-white rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-legal-accent rounded-full animate-pulse opacity-80 animation-delay-2000"></div>
    </section>
  );
};

export default Hero;
