
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
              At Legally Innovative, we are passionate about helping law firms thrive in the digital age. As a full-service marketing and AI automations provider, we understand the unique challenges that law firms face in attracting clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6 text-lg">
                Discover Our Services
              </Button>
              <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-light px-8 py-6 text-lg">
                About Us
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-legal-light rounded-full opacity-50 -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-legal-accent rounded-full opacity-20 -z-10"></div>
              <div className="bg-white p-6 shadow-xl rounded-lg">
                <div className="bg-gray-200 w-80 h-80 md:w-96 md:h-96 rounded-md flex items-center justify-center">
                  <span className="text-gray-500 text-lg font-medium">Legal Innovation Image</span>
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

