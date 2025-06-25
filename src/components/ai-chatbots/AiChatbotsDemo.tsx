
import { Button } from "@/components/ui/button";
import { Play, Bot } from "lucide-react";

const AiChatbotsDemo = () => {
  return (
    <section className="py-20 bg-legal-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See Our AI Chatbot in Action
            </h2>
            <p className="text-lg mb-8 text-legal-light">
              Watch how our AI chatbot handles real client inquiries, qualifies leads, 
              and seamlessly hands off to your team when needed.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-legal-accent rounded-full mr-3"></div>
                <span>Natural conversation flow</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-legal-accent rounded-full mr-3"></div>
                <span>Intelligent lead qualification</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-legal-accent rounded-full mr-3"></div>
                <span>Seamless handoff to attorneys</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-legal-secondary p-4 flex items-center">
                <Bot className="w-6 h-6 text-white mr-3" />
                <span className="text-white font-semibold">Live Chat Demo</span>
              </div>
              <div className="p-6 h-96 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">Hello! I'm here to help with your legal questions. What brings you here today?</p>
                  </div>
                  <div className="bg-legal-primary text-white rounded-lg p-3 ml-8">
                    <p className="text-sm">I was in a car accident last week</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">I'm sorry to hear about your accident. I can help connect you with one of our personal injury attorneys. Were you injured in the accident?</p>
                  </div>
                  <div className="bg-legal-primary text-white rounded-lg p-3 ml-8">
                    <p className="text-sm">Yes, I have back pain and whiplash</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">I understand. Let me gather some basic information and schedule you for a free consultation with one of our experienced personal injury attorneys. What's your name?</p>
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

export default AiChatbotsDemo;
