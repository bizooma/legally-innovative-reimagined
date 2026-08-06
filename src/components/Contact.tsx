import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackFormSubmission, trackPhoneClick, trackEmailClick, trackCalendarClick } from "@/utils/gtmTracking";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TurnstileWidget from "@/components/security/TurnstileWidget";

const Contact = () => {
  const sectionRef = useScrollAnimation({ animationClass: 'animate-fade-in' });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      toast({
        title: "Verification required",
        description: "Please complete the security check before submitting.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          turnstileToken
        }
      });
      if (error) throw error;
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send email');
      }
      console.log("Form submitted successfully:", data);
      
      // Track form submission
      trackFormSubmission('Contact Form', 'contact');
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch soon."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
      setTurnstileToken(null);
      window.turnstile?.reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-gradient-to-br from-legal-light/50 via-white to-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Get In <span className="highlight-text">Touch</span>
          </h2>
          <p className="text-lg text-gray-700">
            Ready to transform your business? Contact us today to discuss how we can help you embrace innovation and prepare for the future of business marketing and growth!
          </p>
        </div>

        {/* Main Grid: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Contact Info */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-legal-dark">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-legal-light p-3 rounded-full">
                  <Mail className="h-6 w-6 text-legal-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Email Us</p>
                  <a 
                    href="mailto:support@bizooma.com" 
                    onClick={() => trackEmailClick('Contact Section')}
                    className="text-legal-dark font-semibold hover:underline"
                  >
                    support@bizooma.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-legal-light p-3 rounded-full">
                  <Phone className="h-6 w-6 text-legal-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Call Us</p>
                  <p className="text-legal-dark font-semibold">
                    <a 
                      href="tel:9042956670" 
                      onClick={() => trackPhoneClick('904-295-6670', 'Contact Section')}
                      className="hover:underline"
                    >
                      904-295-6670
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-bold mb-4 text-legal-dark">At Bizooma:</h4>
              <p className="text-gray-700 leading-relaxed">
                Our platforms are more than just tools—they're growth engines. Each system is tailored to your brand, powered by data, and designed to deliver measurable ROI. With AI-first development and automation-driven marketing, we help you streamline operations, cut costs, and achieve smarter, faster growth.
              </p>
            </div>

            {/* Schedule Meeting CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-bold mb-4 text-legal-dark">
                Prefer to <span className="highlight-text">Schedule a Meeting?</span>
              </h4>
              <Button asChild className="bg-legal-primary hover:bg-legal-secondary text-white px-6 py-5">
                <a 
                  href="https://tidycal.com/bizooma/30-minute-meeting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackCalendarClick('Contact Section')}
                >
                  Schedule a Meeting
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-legal-dark">Send us a Message</h3>
            
            <form onSubmit={handleSubmit}>
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
                className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6 w-full md:w-auto" 
                disabled={isSubmitting || !turnstileToken}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Office Locations Section */}
        <div className="mt-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-legal-dark text-center">
            Our <span className="highlight-text">Locations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Jacksonville Office */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.794538479383!2d-81.6591862!3d30.3283615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b7ba8c79c7b7%3A0x29d0d337ce7701c4!2sBizooma%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sus!4v1758758710528!5m2!1sen!2sus" 
                width="100%" 
                height="280" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Jacksonville Office Location"
                className="w-full"
              />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-legal-light p-2 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 text-legal-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-legal-dark">Jacksonville, FL</h4>
                    <p className="text-gray-600 mt-1">
                      200 N Laura St<br />
                      Jacksonville, FL 32202
                    </p>
                    <p className="text-sm text-legal-primary font-medium mt-2">By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amarillo Office */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.9971159263355!2d-101.8388806!3d35.2065408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87014efebbd00001%3A0x6d22297156b25a93!2s600%20S%20Tyler%20St%20suite%202100%2C%20Amarillo%2C%20TX%2079101!5e0!3m2!1sen!2sus!4v1767917279697!5m2!1sen!2sus" 
                width="100%" 
                height="280" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Amarillo Office Location"
                className="w-full"
              />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-legal-light p-2 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 text-legal-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-legal-dark">Amarillo, TX</h4>
                    <p className="text-gray-600 mt-1">
                      600 S Tyler St, Suite 2100<br />
                      Amarillo, TX 79101
                    </p>
                    <p className="text-sm text-legal-primary font-medium mt-2">By Appointment Only</p>
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

export default Contact;
