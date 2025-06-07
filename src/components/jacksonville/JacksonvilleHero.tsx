
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const JacksonvilleHero = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accidentType: "",
    description: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead form submitted:", formData);
    toast({
      title: "Form Submitted!",
      description: "We'll connect you with the best Jacksonville attorney for your case.",
    });
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      accidentType: "",
      description: ""
    });
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center pt-20 section-padding relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lovable-uploads/e9beba71-d157-444b-80c8-f35727156a81.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Text */}
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Hurt in an Accident?
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-legal-accent">
              Need an Attorney?
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Fill out the form and we'll find the best Jacksonville attorney to handle your case.
            </p>
            <div className="space-y-4 text-lg">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-legal-accent rounded-full mr-3"></span>
                <span>Free Case Evaluation</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-legal-accent rounded-full mr-3"></span>
                <span>No Fees Unless We Win</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-legal-accent rounded-full mr-3"></span>
                <span>Experienced Jacksonville Attorneys</span>
              </div>
            </div>
          </div>

          {/* Right Side - Lead Capture Form */}
          <div className="w-full">
            <Card className="p-8 bg-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-legal-dark text-center">
                Connect with the Best Jacksonville, Florida Attorneys!
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="accidentType">Type of Accident *</Label>
                  <select
                    id="accidentType"
                    name="accidentType"
                    value={formData.accidentType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select accident type</option>
                    <option value="car-accident">Car Accident</option>
                    <option value="motorcycle-accident">Motorcycle Accident</option>
                    <option value="truck-accident">Truck Accident</option>
                    <option value="slip-fall">Slip and Fall</option>
                    <option value="medical-malpractice">Medical Malpractice</option>
                    <option value="workplace-injury">Workplace Injury</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Brief Description of Your Case</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please describe what happened..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-legal-primary hover:bg-legal-secondary text-white py-3 text-lg font-semibold"
                >
                  Get My Free Case Evaluation
                </Button>

                <p className="text-sm text-gray-600 text-center mt-4">
                  By submitting this form, you agree to be contacted by an attorney or law firm to discuss your case.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JacksonvilleHero;
