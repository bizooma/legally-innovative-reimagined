
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const DonutCTA = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "I'd like to schedule a meeting to learn more about your services.",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using formsubmit.co
      const formElement = e.target as HTMLFormElement;
      const formSubmitData = new FormData(formElement);
      
      await fetch("https://formsubmit.co/joe@bizooma.com", {
        method: "POST",
        body: formSubmitData,
        headers: {
          'Accept': 'application/json'
        },
      });
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll be in touch soon to schedule your meeting.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "I'd like to schedule a meeting to learn more about your services.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="schedule-meeting" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Ready for Something <span className="text-pink-500">Sweeter</span> than Donuts?
          </h2>
          <p className="text-lg text-gray-700">
            Schedule a meeting with us to discover how our services can help your law firm 
            grow and innovate. We promise our consultation will be even more satisfying than the donuts!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border border-pink-200 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} action="https://formsubmit.co/joe@bizooma.com" method="POST">
                <input type="hidden" name="_subject" value="Donut Page Meeting Request" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={window.location.href} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="john@lawfirm.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                    Law Firm Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Your law firm name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[100px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Schedule Your Meeting"}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  We'll get back to you within one business day to arrange a time that works for you.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonutCTA;
