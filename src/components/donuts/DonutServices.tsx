
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const DonutServices = () => {
  // Services list with sweet donut-themed descriptions
  const services = [
    {
      title: "AI Consulting",
      description: "Sweet solutions to modernize your law firm with AI technologies that are as easy to implement as taking a bite of your favorite donut.",
      icon: "🤖",
      color: "bg-pink-100",
      accent: "border-pink-400"
    },
    {
      title: "Website Development",
      description: "Custom websites for law firms with all the right ingredients, designed to attract clients like a fresh batch of donuts attracts everyone to the break room.",
      icon: "💻",
      color: "bg-amber-100",
      accent: "border-amber-400"
    },
    {
      title: "Digital Marketing",
      description: "Marketing strategies as irresistible as a glazed donut, guaranteed to help your law firm stand out in a crowded digital world.",
      icon: "📈",
      color: "bg-blue-100",
      accent: "border-blue-400"
    },
    {
      title: "SEO/AEO",
      description: "Optimize your online presence so clients can find you as easily as spotting the last chocolate donut in the box.",
      icon: "🔍",
      color: "bg-green-100",
      accent: "border-green-400"
    },
    {
      title: "Custom AI Chatbot",
      description: "Intelligent chatbots that assist your clients 24/7, always ready to help like that colleague who brings donuts to early morning meetings.",
      icon: "💬",
      color: "bg-purple-100",
      accent: "border-purple-400"
    },
    {
      title: "Lead Generation",
      description: "Capture qualified leads with systems as efficient as a donut production line, converting prospects into loyal clients.",
      icon: "🎯",
      color: "bg-red-100",
      accent: "border-red-400"
    },
  ];

  return (
    <section id="donut-services" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Services as <span className="text-pink-500">Sweet</span> as Our Donuts
          </h2>
          <p className="text-lg text-gray-700">
            Just like our carefully selected donuts, our services are crafted with expertise and attention to detail.
            Here's what we can offer your law firm:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`border-t-4 ${service.accent} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group`}
            >
              <CardContent className={`p-6 ${service.color}`}>
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-legal-dark">{service.title}</h3>
                </div>
                <p className="text-gray-700">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto">
            <div className="flex-shrink-0 mr-4">
              <img 
                src="/lovable-uploads/fe60785d-1380-4920-a47b-48ec9f13c3ec.png"
                alt="Alanna Knight" 
                className="h-24 w-24 object-cover rounded-full border-2 border-pink-200"
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl text-legal-dark mb-1">Meet Alanna Knight</h3>
              <p className="text-gray-700">Your Account Manager who delivered the donuts today!</p>
              <p className="text-sm text-legal-primary mt-2">
                <a href="mailto:alanna@legallyinnovative.com" className="hover:underline">
                  alanna@legallyinnovative.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonutServices;
