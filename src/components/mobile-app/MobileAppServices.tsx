
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, MessageSquare, Calendar, FileText, Bell, Users } from "lucide-react";

const MobileAppServices = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Native App Development",
      description: "Custom iOS and Android apps built specifically for your law firm's needs"
    },
    {
      icon: MessageSquare,
      title: "Client Communication",
      description: "Secure messaging, video calls, and real-time chat functionality"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Integrated booking system with calendar sync and automated reminders"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Secure document upload, sharing, and e-signature capabilities"
    },
    {
      icon: Bell,
      title: "Push Notifications",
      description: "Keep clients informed with timely updates and case notifications"
    },
    {
      icon: Users,
      title: "Client Portal Integration",
      description: "Seamless connection with your existing client management systems"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Mobile App Development Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive mobile solutions designed to enhance your law firm's 
            client experience and operational efficiency.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-legal-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-legal-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-legal-dark">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileAppServices;
