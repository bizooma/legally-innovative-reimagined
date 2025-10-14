import { Button } from "@/components/ui/button";
import { Phone, Loader2 } from "lucide-react";
import techBg from "@/assets/hero-tech-bg.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [agentStatus, setAgentStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    // Check if current origin is likely whitelisted
    const currentOrigin = window.location.origin;
    const isLocalhost = currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1');
    const isLovableStaging = currentOrigin.includes('lovable.app');
    const isProductionDomain = currentOrigin.includes('legallyinnovative.com');
    
    if (!isLocalhost && !isLovableStaging && !isProductionDomain) {
      console.warn(`⚠️ D-ID Agent: Current origin "${currentOrigin}" may not be whitelisted in D-ID Studio. Add it to Allowed domains in your D-ID agent settings.`);
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v2/index.js';
    script.setAttribute('data-mode', 'full');
    script.setAttribute('data-client-key', 'Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP');
    script.setAttribute('data-agent-id', 'v2_agt_aHkCdBDR');
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-monitor', 'true');
    script.setAttribute('data-target-id', 'did-agent-container');
    
    script.onload = () => {
      console.log('✅ D-ID script loaded successfully');
      console.log(`📍 Running on: ${currentOrigin}`);
      
      // Give the agent time to initialize
      setTimeout(() => {
        const container = document.getElementById('did-agent-container');
        if (container && container.children.length > 0) {
          console.log('✅ D-ID agent initialized successfully');
          setAgentStatus('loaded');
        } else {
          console.error('❌ D-ID agent failed to initialize. Check:');
          console.error('1. Agent is published in D-ID Studio');
          console.error('2. Current origin is whitelisted in Allowed domains');
          console.error('3. Agent ID and credentials are correct');
          setAgentStatus('error');
        }
      }, 3000);
    };
    
    script.onerror = () => {
      console.error('Failed to load D-ID script');
      setAgentStatus('error');
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
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
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative w-full max-w-2xl">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-legal-accent/30 rounded-full blur-2xl"></div>
              <div className="relative backdrop-blur-sm bg-white/5 p-4 rounded-3xl border border-white/20">
                <div 
                  id="did-agent-container" 
                  className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-legal-primary/40 to-legal-dark/40 flex items-center justify-center"
                  style={{ minHeight: '600px' }}
                >
                  {agentStatus === 'loading' && (
                    <div className="flex flex-col items-center gap-4 text-white">
                      <Loader2 className="w-12 h-12 animate-spin" />
                      <p className="text-lg">Loading AI Assistant...</p>
                    </div>
                  )}
                  {agentStatus === 'error' && (
                    <div className="flex flex-col items-center gap-4 text-white p-8 text-center">
                      <div className="text-5xl">🤖</div>
                      <p className="text-lg font-semibold">AI Assistant Unavailable</p>
                      <p className="text-sm text-legal-light">
                        Please verify your D-ID agent credentials and ensure the agent is published and accessible.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
