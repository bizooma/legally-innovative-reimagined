
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle, Clock } from "lucide-react";

const AiChatbotsHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 section-padding bg-gradient-to-br from-legal-primary to-legal-secondary text-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI Customer Support Chatbots for Law Firms
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-legal-light">
              Never miss a potential client again. Our AI chatbots provide 24/7 support, 
              answer common questions, and capture leads while you focus on practicing law.
            </p>
            <div className="space-y-4 text-lg mb-8">
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-3 text-legal-accent" />
                <span>24/7 Availability</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-legal-accent" />
                <span>Instant Response Times</span>
              </div>
              <div className="flex items-center">
                <Bot className="w-6 h-6 mr-3 text-legal-accent" />
                <span>Legal-Specific Training</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold"
            >
              Get Your AI Chatbot
            </Button>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-6 animate-float">
              <div className="flex items-center mb-4">
                <Bot className="w-8 h-8 text-legal-primary mr-3" />
                <span className="font-semibold text-legal-dark">LegalBot Assistant</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-600">How can I help you today?</p>
                </div>
                <div className="bg-legal-primary text-white rounded-lg p-3 ml-8">
                  <p className="text-sm">I need help with a personal injury case</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-600">I'd be happy to help! Let me connect you with one of our personal injury specialists. Can you tell me a bit about your situation?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChatbotsHero;
