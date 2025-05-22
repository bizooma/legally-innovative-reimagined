
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 section-padding bg-gradient-to-br from-white via-legal-light/10 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-legal-dark">
              Where <span className="gradient-text">Accountability</span> Meets <span className="gradient-text">Creativity</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-xl">
              At Legally Innovative, we are passionate about helping law firms thrive in the digital age. As a full-service marketing and AI automations provider, we understand the unique challenges that law firms face in generating, nurturing, and converting leads.
            </p>
            <div className="flex items-center mb-6 text-legal-primary">
              <Phone size={20} className="mr-2" />
              <a href="tel:8453779730" className="text-lg hover:underline">845-377-9730</a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6 text-lg"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Discover Our Services
              </Button>
              <Button 
                variant="outline" 
                className="border-legal-primary text-legal-primary hover:bg-legal-light px-8 py-6 text-lg"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                About Us
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative w-full max-w-2xl">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-legal-light rounded-full opacity-50 -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-legal-accent rounded-full opacity-20 -z-10"></div>
              <iframe 
                src="https://www.videoask.com/fc5vpzgv1" 
                allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;" 
                width="100%" 
                height="600px" 
                style={{border: 'none', borderRadius: '24px'}}
                className="w-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
