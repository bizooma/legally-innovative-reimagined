
import { Button } from "@/components/ui/button";

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
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-legal-dark mb-4">
                  Ready to Transform Your Legal Practice?
                </h2>
                <p className="text-gray-700 mb-6">
                  Explore how our AI-powered marketing solutions can help your law firm attract more clients and streamline your operations. Chat with our AI assistant using the ElevenLabs widget in the bottom corner to learn more.
                </p>
                <div className="flex justify-center">
                  <Button
                    className="bg-legal-accent hover:bg-legal-accent/80 text-white px-6 py-4 text-lg"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Contact Our Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
