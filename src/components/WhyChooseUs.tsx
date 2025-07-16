
import { Check } from "lucide-react";
import whyChooseBg from "@/assets/why-choose-bg.jpg";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Industry Expertise",
      description: "Our team combines decades of experience in both legal practice and innovation.",
    },
    {
      title: "Practical Approach",
      description: "We deliver real-world solutions, not just theoretical concepts.",
    },
    {
      title: "Tailored Solutions",
      description: "Each client receives customized strategies that address their unique challenges.",
    },
    {
      title: "Measurable Results",
      description: "We define clear metrics and track progress to ensure tangible outcomes.",
    },
    {
      title: "Global Perspective",
      description: "Access insights from our work with legal organizations around the world.",
    },
    {
      title: "Innovation Network",
      description: "Connect with our extensive network of legal innovators and technology providers.",
    },
  ];

  return (
    <section 
      id="why-us" 
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('${whyChooseBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
              Why Choose <span className="highlight-text">Legally Innovative</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We're not just consultants – we're partners in your innovation journey. 
              With a deep understanding of the challenges facing legal professionals today, 
              we provide practical, impactful solutions that drive real results.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-legal-light rounded-full p-1 flex-shrink-0">
                    <Check className="h-4 w-4 text-legal-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-legal-dark">{reason.title}</h4>
                    <p className="text-sm text-gray-600">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-legal-light rounded-full opacity-30 -z-10"></div>
            <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-legal-accent rounded-full opacity-20 -z-10"></div>
            
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-legal-dark border-b border-gray-200 pb-4">
                What Our Clients Say
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="italic text-gray-700 mb-4">
                    "Legally Innovative helped us navigate our digital transformation journey, 
                    resulting in a 30% increase in efficiency and significantly improved client satisfaction."
                  </p>
                  <div>
                    <p className="font-bold text-legal-dark">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Managing Partner, Johnson Legal</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="italic text-gray-700 mb-4">
                    "The training programs provided by Legally Innovative have completely 
                    transformed how our team approaches legal service delivery."
                  </p>
                  <div>
                    <p className="font-bold text-legal-dark">Michael Chen</p>
                    <p className="text-sm text-gray-600">Legal Operations Director, Global Corp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
