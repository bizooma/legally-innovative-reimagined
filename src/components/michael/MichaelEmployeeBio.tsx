
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";

const MichaelEmployeeBio = () => {
  const scrollToCalendly = () => {
    const calendlySection = document.querySelector('.calendly-inline-widget');
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Meet Your <span className="highlight-text">Business Development Partner</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Photo Section */}
              <div className="bg-gray-100 p-8 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <ResponsiveImage 
                    src="/lovable-uploads/26a458f4-c2a1-4548-8dc8-ac6039a1a1e0.jpg"
                    alt="Michael Ham - Business Development Specialist at Bizooma"
                    sizes="(max-width: 768px) 100vw, 320px"
                    widths={[320, 640]}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
              
              {/* Bio Section */}
              <div className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-legal-dark">
                    Michael Ham
                  </h3>
                  <p className="text-legal-primary font-semibold">
                    214-808-4760
                  </p>
                  <p className="text-legal-primary font-semibold">
                    Business Development Specialist
                  </p>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      Michael Ham, a native Texan from Dallas and the youngest of three, is a finance graduate and the first in his large extended family to earn a college degree. This MENSA member brings 30 years of experience in consultative selling, new business development, and leadership. A self-described "rainmaker and mayonnaise avoider," Michael is married with four children and two granddaughters. His interests include golf, travel, and spending time at the beach.
                    </p>
                  </div>
                  <Button 
                    className="mt-6 bg-legal-primary hover:bg-legal-primary/90"
                    onClick={scrollToCalendly}
                  >
                    Schedule a Meeting
                  </Button>
                  <p className="text-center text-legal-dark font-medium text-3xl italic font-serif tracking-wide">
                    Let's Work Together
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MichaelEmployeeBio;
