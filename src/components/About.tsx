import { Card, CardContent } from "@/components/ui/card";
import veteranOwnedBadge from "@/assets/veteran-owned-badge.png";

const About = () => {
  return <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            About <span className="highlight-text">Bizooma</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">At Bizooma, we specialize in building intelligent marketing and software solutions powered by artificial intelligence. We help law firms, nonprofits, and startups accelerate growth through AI-driven marketing strategies, custom software development, and automation tools.</p>
          <p className="text-lg text-gray-700 mb-4">Our approach combines cutting-edge AI technology with proven marketing principles to attract, engage, and convert leads with precision. From intelligent chatbots and voice assistants to automated lead generation and custom web applications, we deliver solutions that work smarter, not harder.</p>
          <p className="text-lg text-gray-700">
            Bizooma is proud to be a veteran-owned business dedicated to excellence and innovation. 
            Our entire team is based in the United States, ensuring that every project is handled with 
            the highest level of quality, integrity, and care. We take pride in supporting local talent 
            while delivering creative solutions that help our clients succeed. At Bizooma, our values 
            reflect the commitment and service instilled by our veteran leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Mission Statement</h3>
              <p className="text-gray-700">Our mission is to empower businesses with intelligent AI-driven marketing and software solutions that drive measurable growth. We bridge the gap between traditional marketing and cutting-edge AI technology to deliver exceptional results.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Vision Statement</h3>
              <p className="text-gray-700">
                Our vision is to become the leading provider of AI-powered marketing and automation solutions for law firms, nonprofits, and startups—transforming how businesses attract, engage, and convert their ideal clients through intelligent technology.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50 md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">American Excellence</h3>
              <p className="text-gray-700">
                As a veteran owned company, our values include dedication, integrity, accessibility, innovation, and exceptional 
                quality to every project, with a 100% U.S.-based team committed to your success.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <img 
            src={veteranOwnedBadge} 
            alt="Veteran Owned Business" 
            className="w-64 h-auto"
          />
        </div>
      </div>
    </section>;
};
export default About;