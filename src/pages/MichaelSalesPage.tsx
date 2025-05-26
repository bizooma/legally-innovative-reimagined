import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const MichaelSalesPage = () => {
  const services = [
    {
      title: "AI Consulting",
      description: "We help law firms leverage artificial intelligence to streamline operations, enhance customer experiences, and drive innovation through strategic planning and implementation.",
      icon: "🤖",
      bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Mobile App Development",
      description: "Create powerful, user-friendly mobile applications for iOS and Android platforms that engage your customers and enhance your brand's digital presence.",
      icon: "📱",
      bgImage: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Website Development",
      description: "Custom website solutions designed to meet your specific law firm needs, from simple informational sites to complex web applications with seamless user experiences.",
      icon: "💻",
      bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies that increase your online visibility, engage your target audience, and convert visitors into loyal customers.",
      icon: "📈",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Google Business Profile/Bing Places",
      description: "Optimize your local online presence with professionally managed Google Business Profile and Bing Places listings to improve local search visibility and customer engagement.",
      icon: "🗺️",
      bgImage: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "SEO/AEO",
      description: "Search Engine Optimization and Answer Engine Optimization services that improve your website's ranking, visibility, and traffic through proven, sustainable techniques.",
      icon: "🔍",
      bgImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Custom AI Chatbot",
      description: "Develop intelligent, personalized AI chatbots that engage your customers, answer queries, and provide assistance 24/7, enhancing customer service while reducing operational costs.",
      icon: "💬",
      bgImage: "/lovable-uploads/a88cbdbd-0e22-4907-afe1-0622b2c876ab.png"
    },
    {
      title: "Lead Generation Systems",
      description: "Implement effective lead generation systems that capture high-quality leads, nurture prospects through automated workflows, and convert potential customers into loyal clients.",
      icon: "🎯",
      bgImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1932&auto=format&fit=crop"
    },
    {
      title: "Voice Experience",
      description: "Create custom voice applications for Amazon Alexa and Google Assistant that allow your law firm to engage with clients through natural language interactions and provide valuable information on demand.",
      icon: "🔊",
      bgImage: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-legal-dark via-legal-primary to-legal-accent text-white section-padding pt-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            Transform Your Law Firm with Technology
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Partner with us to leverage cutting-edge digital solutions that drive growth, 
            streamline operations, and enhance client experiences.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-legal-dark hover:bg-gray-100 text-lg px-8 py-4"
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
              Our <span className="highlight-text">Services</span>
            </h2>
            <p className="text-lg text-gray-700">
              We provide a comprehensive suite of services designed to help law firms 
              establish a strong digital presence and leverage technology for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-t-4 border-t-legal-primary border-r-0 border-l-0 border-b-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div className="relative">
                  <AspectRatio ratio={16/5}>
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10" />
                  </AspectRatio>
                </div>
                <CardContent className="p-6 relative z-10 bg-white">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">{service.icon}</div>
                    <h3 className="text-xl font-bold text-legal-dark">{service.title}</h3>
                  </div>
                  <p className="text-gray-700">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Development Employee Section */}
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
                  <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                    {/* Placeholder for employee photo */}
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <p className="text-sm">Employee Photo</p>
                      <p className="text-xs">To be added</p>
                    </div>
                  </div>
                </div>
                
                {/* Bio Section */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-legal-dark">
                      Michael Ham
                    </h3>
                    <p className="text-legal-primary font-semibold">
                      Business Development Specialist
                    </p>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        [Employee bio paragraph 1 - background and experience]
                      </p>
                      <p>
                        [Employee bio paragraph 2 - expertise and approach]
                      </p>
                      <p>
                        [Employee bio paragraph 3 - commitment to client success]
                      </p>
                    </div>
                    <Button className="mt-6 bg-legal-primary hover:bg-legal-primary/90">
                      Schedule a Call
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
              Schedule Your <span className="highlight-text">Free Consultation</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Ready to transform your law firm with technology? Book a free consultation 
              to discuss your needs and discover how we can help you grow.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-xl">
              {/* Calendly inline widget begin */}
              <div className="calendly-inline-widget" data-url="https://calendly.com/joe-bizooma/30min" style={{minWidth:'320px', height:'700px'}}></div>
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
              {/* Calendly inline widget end */}
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-legal-dark text-white section-padding">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Law Firm?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let your competitors get ahead. Start your digital transformation today 
            and see the difference technology can make for your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-legal-primary hover:bg-legal-primary/90 text-white"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-legal-dark"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MichaelSalesPage;
