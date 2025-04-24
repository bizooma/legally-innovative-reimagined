
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            About <span className="highlight-text">Legally Innovative</span>
          </h2>
          <p className="text-lg text-gray-700">
            Founded on the belief that the legal industry must evolve to meet changing client expectations 
            and technological advancements, we provide consulting, training, and change management 
            services to legal teams worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Our Mission</h3>
              <p className="text-gray-700">
                To empower legal professionals with the mindset, skills, and tools needed to 
                thrive in a rapidly changing legal landscape, driving meaningful innovation 
                that benefits clients and practitioners alike.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Our Vision</h3>
              <p className="text-gray-700">
                A legal industry that embraces innovation and technology, breaking down 
                traditional barriers to create more accessible, efficient, and client-centric 
                legal services for all.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50 md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-legal-light rounded-full flex items-center justify-center mb-6">
                <span className="text-legal-primary text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-legal-dark">Our Approach</h3>
              <p className="text-gray-700">
                We combine deep industry knowledge with practical innovation frameworks, 
                helping legal teams understand not just what is changing, but how to lead 
                that change. Our methodology focuses on sustainable transformation that fits 
                each organization's unique needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
