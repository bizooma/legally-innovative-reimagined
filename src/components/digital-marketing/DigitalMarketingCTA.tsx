
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Mail } from "lucide-react";

const DigitalMarketingCTA = () => {
  const benefits = [
    "Free digital marketing audit",
    "Custom strategy consultation",
    "Competitive analysis report",
    "No obligation proposal"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-legal-primary to-legal-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow Your Law Firm Online?
            </h2>
            <p className="text-lg text-legal-light mb-8">
              Get a free digital marketing audit and discover how we can help your law firm 
              attract more clients and grow your practice through proven digital strategies.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-legal-accent mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-legal-accent mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-legal-accent mr-2" />
                <span>hello@legallyinnovative.com</span>
              </div>
            </div>
          </div>
          
          <Card className="bg-white text-legal-dark">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Get Your Free Marketing Audit</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="Enter your full name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="firm">Law Firm Name</Label>
                  <Input id="firm" type="text" placeholder="Enter your firm name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="practice">Practice Areas</Label>
                  <Input id="practice" type="text" placeholder="e.g., Personal Injury, Corporate Law" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="website">Current Website</Label>
                  <Input id="website" type="url" placeholder="https://yourfirm.com" className="mt-1" />
                </div>
                <Button className="w-full bg-legal-accent hover:bg-legal-accent/90 text-white py-3">
                  Get My Free Marketing Audit
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center">
                No spam. We respect your privacy and will only send valuable marketing insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingCTA;
