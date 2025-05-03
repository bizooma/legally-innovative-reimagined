
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            About <span className="highlight-text">Legally Innovative</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            At Legally Innovative, we are passionate about helping law firms thrive in the digital age. 
            As a full-service marketing and accounting solutions provider, we understand the unique challenges 
            that law firms face in attracting clients and managing finances.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            That's why we've designed our services to meet the specific needs of the legal industry, 
            giving you the tools to grow your practice, streamline your operations, and stay ahead of 
            the competition. Legally Innovative is a legal entity of Bizooma, LLC.
          </p>
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
              <p className="text-gray-700">
                Our mission is to bridge the gap between traditional legal marketing and the digital future, 
                empowering legal professionals to deliver more efficient, accessible, and client-centered solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Vision Statement</h3>
              <p className="text-gray-700">
                Through our platform, resources, and community, we will shape a future where the legal profession 
                leads technological adoption rather than follows it, ensuring that legal innovation serves the 
                highest purposes of justice and human dignity.
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
      </div>
    </section>
  );
};

export default About;
