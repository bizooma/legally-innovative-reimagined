
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
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
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }
      });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send email');
      }

      console.log("Form submitted successfully:", data);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-legal-light/50 via-white to-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Get In <span className="highlight-text">Touch</span>
          </h2>
          <p className="text-lg text-gray-700">
            Ready to transform your legal practice? Contact us today to discuss how we can 
            help you embrace innovation and prepare for the future of legal services.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-legal-dark">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-legal-light p-3 rounded-full">
                    <Mail className="h-6 w-6 text-legal-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Email Us</p>
                    <p className="text-legal-dark font-semibold">joe@bizooma.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-legal-light p-3 rounded-full">
                    <Phone className="h-6 w-6 text-legal-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Call Us</p>
                    <p className="text-legal-dark font-semibold">AI Receptionist<br/><a href="tel:8452046343" className="hover:underline">845-204-6343</a></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-legal-light p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-legal-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Visit Us</p>
                    <p className="text-legal-dark font-semibold">
                      200 N Laura St<br/>
                      Jacksonville, FL 32202
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg">
              
              <h3 className="text-2xl font-bold mb-6 text-legal-dark">Send us a Message</h3>
              
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
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                  Company/Organization
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Your company name"
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
                  required
                  className="w-full min-h-[150px]"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
