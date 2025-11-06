import { Card, CardContent } from "@/components/ui/card";
import veteranOwnedBadge from "@/assets/veteran-owned-badge.png";

const About = () => {
  return <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            About <span className="highlight-text">Bizooma</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">At Bizooma, we are passionate about helping companies thrive in the digital age. As a full-service marketing and software development provider, we understand the unique challenges that companies face in attracting clients and managing finances.</p>
          <p className="text-lg text-gray-700 mb-4">That's why we've designed our services to take advantage of the strengths of marketing and so, giving you the tools to grow your practice, streamline your operations, and stay ahead of the competition. </p>
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
              <p className="text-gray-700">Our mission is to bridge the gap between traditional marketing and the digital future, empowering business professionals to deliver more efficient, accessible, and client-centered solutions.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Vision Statement</h3>
              <p className="text-gray-700">
                Our vision is to empower business professionals to lead the way in technological innovation—using our platform, resources, and community to drive meaningful value for their customers and the communities they serve.
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