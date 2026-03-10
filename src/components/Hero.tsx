import { Button } from "@/components/ui/button";
import { Phone, Music, VolumeX } from "lucide-react";
import techBg from "@/assets/hero-tech-bg.jpg";
import { trackPhoneClick, trackCTAClick } from "@/utils/gtmTracking";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { AnimatedParticles } from "./hero/AnimatedParticles";
import { FloatingFeatureCards } from "./hero/FloatingFeatureCards";
import { GradientMesh } from "./hero/GradientMesh";
import { useScrollFade } from "@/hooks/useParallax";
import { ChristmasDecorations } from "./decorations/ChristmasDecorations";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  const animationOpacity = useScrollFade(150, 500);
  const [holidayMode, setHolidayMode] = useState(() => {
    const saved = localStorage.getItem('holidayMode');
    return saved === 'true';
  });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    localStorage.setItem('holidayMode', String(holidayMode));
    // Stop music if holiday mode is turned off
    if (!holidayMode && musicPlaying) {
      setMusicPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [holidayMode, musicPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play();
        setMusicPlaying(true);
      }
    }
  };
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
            <p className="text-lg md:text-xl mb-8 text-legal-light">At Bizooma, we specialize in building intelligent marketing and software solutions powered by artificial intelligence.<br /><br />Our team helps law firms, nonprofits, and startups accelerate growth through AI-driven marketing strategies, custom software development, and automation tools that attract, engage, and convert leads with precision.</p>
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
              <div className="flex gap-3">
                <Button 
                  className="bg-white hover:bg-legal-accent text-legal-primary hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl" 
                  onClick={() => {
                    trackCTAClick('Our Services', 'Hero Section');
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Our Services
                </Button>
                {/* Holiday Fun Button - Hidden for now, keeping code for future use
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-6 text-base font-semibold transition-all duration-300 backdrop-blur-sm"
                  onClick={() => setHolidayMode(!holidayMode)}
                >
                  Holiday Fun {holidayMode ? 'Off' : 'On'} 🎄
                </Button>
                {holidayMode && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 h-[48px] w-[48px] transition-all duration-300 backdrop-blur-sm"
                    onClick={toggleMusic}
                    title={musicPlaying ? 'Pause Music' : 'Play Christmas Music'}
                  >
                    {musicPlaying ? <VolumeX className="h-5 w-5" /> : <Music className="h-5 w-5" />}
                  </Button>
                )}
                */}
              </div>
            </div>
          </div>

          {/* Right Column - Animated Visualization - Disabled on mobile for performance */}
          {!isMobile && (
            <div 
              className="relative h-[600px] min-h-[560px] transition-opacity duration-300"
              style={{ opacity: animationOpacity }}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
                <GradientMesh />
                <AnimatedParticles />
              </div>
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <FloatingFeatureCards holidayMode={holidayMode} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service Navigation Buttons */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex">
        {[
          { label: "Custom Roku Development", id: "service-custom-roku-channel-development" },
          { label: "Mobile App Development", id: "service-mobile-app-development" },
          { label: "Custom AI Chatbots", id: "service-custom-ai-chatbot" },
          { label: "Voice Assisted Marketing", id: "service-voice-assistant-marketing" },
        ].map((item, index) => (
          <button
            key={item.id}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className={`flex-1 py-4 text-sm md:text-base font-semibold text-white/90 hover:text-white transition-all duration-300 hover:bg-white/15 backdrop-blur-sm cursor-pointer ${
              index < 3 ? 'border-r border-white/20' : ''
            } bg-white/10`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-legal-accent rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-white rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-legal-accent rounded-full animate-pulse opacity-80 animation-delay-2000"></div>

      {/* Christmas Decorations */}
      <ChristmasDecorations show={holidayMode} />

      {/* Christmas Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_53ce5b35c2.mp3?filename=we-wish-you-a-merry-christmas-christmas-carol-opera-choir-96183.mp3"
      />
    </section>;
};
export default Hero;