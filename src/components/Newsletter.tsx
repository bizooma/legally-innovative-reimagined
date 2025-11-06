import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import routeToResultsLogo from "@/assets/route-to-results-logo.png";
const newsletterSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address"
  }).max(255, {
    message: "Email must be less than 255 characters"
  })
});
const Newsletter = () => {
  const {
    toast
  } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      // Validate email
      const validatedData = newsletterSchema.parse({
        email
      });

      // Insert into newsletter_subscriptions table
      const {
        error
      } = await supabase.from('newsletter_subscriptions').insert([{
        email: validatedData.email
      }]);
      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setEmail("");
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive updates about legal innovation and technology."
        });
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid Email",
          description: error.errors[0]?.message || "Please enter a valid email address.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "There was a problem subscribing you to our newsletter. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubscribing(false);
    }
  };
  return <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-auto flex items-center justify-center">
              <img src={routeToResultsLogo} alt="Route to Results Logo" className="h-12 w-auto object-contain" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-legal-dark">Stay Ahead of AI & Marketing Innovation<span className="highlight-text">Innovation</span>
          </h2>
          
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-600">
            With the Route to Results Newsletter
          </h3>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Get exclusive insights, case studies, and updates on the latest technology trends. Join thousands of legal professionals transforming their practices with innovative solutions.</p>

          {isSubscribed ? <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-green-800">
                <CheckCircle className="h-6 w-6" />
                <span className="font-semibold">Successfully Subscribed!</span>
              </div>
              <p className="text-green-700 mt-2">
                You'll receive our latest updates and insights directly in your inbox.
              </p>
            </div> : <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 text-base border-legal-light focus:border-legal-primary focus:ring-legal-primary" disabled={isSubscribing} />
                </div>
                <Button type="submit" className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-3 text-base whitespace-nowrap" disabled={isSubscribing}>
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-legal-dark mb-2">Weekly Insights</h3>
              <p className="text-gray-600 text-sm">
                Get the latest trends in legal technology and practice management delivered every Tuesday.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-legal-dark mb-2">Case Studies</h3>
              <p className="text-gray-600 text-sm">
                Learn from real law firms that have successfully implemented innovative solutions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-legal-dark mb-2">Exclusive Access</h3>
              <p className="text-gray-600 text-sm">
                Be the first to know about new tools, templates, and resources for legal professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Newsletter;