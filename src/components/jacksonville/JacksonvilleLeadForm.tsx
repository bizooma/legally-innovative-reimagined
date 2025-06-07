
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { JacksonvilleFormData } from "./types";

const JacksonvilleLeadForm = () => {
  const [formData, setFormData] = useState<JacksonvilleFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accidentType: "",
    justWantSettle: false,
    wantHighSettlement: true,
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettleCheckboxChange = (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      justWantSettle: value
    }));
  };

  const handleHighSettlementCheckboxChange = (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      wantHighSettlement: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting lead form:", formData);
      
      const { data, error } = await supabase.functions.invoke('send-jacksonville-lead', {
        body: formData
      });

      if (error) {
        throw error;
      }

      console.log("Lead submitted successfully:", data);
      
      toast({
        title: "Form Submitted Successfully!",
        description: "We'll connect you with the best Jacksonville attorney for your case. You should hear from someone soon.",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        accidentType: "",
        justWantSettle: false,
        wantHighSettlement: true,
        description: ""
      });
    } catch (error: any) {
      console.error("Error submitting lead form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <Label>Just want to Settle?</Label>
            <div className="flex items-center space-x-6 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="justWantSettleYes"
                  checked={formData.justWantSettle === true}
                  onCheckedChange={() => handleSettleCheckboxChange(true)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="justWantSettleYes" className="text-sm font-normal">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="justWantSettleNo"
                  checked={formData.justWantSettle === false}
                  onCheckedChange={() => handleSettleCheckboxChange(false)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="justWantSettleNo" className="text-sm font-normal">
                  No
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label>Want to Win more than $250,000</Label>
            <div className="flex items-center space-x-6 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wantHighSettlementYes"
                  checked={formData.wantHighSettlement === true}
                  onCheckedChange={() => handleHighSettlementCheckboxChange(true)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="wantHighSettlementYes" className="text-sm font-normal">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wantHighSettlementNo"
                  checked={formData.wantHighSettlement === false}
                  onCheckedChange={() => handleHighSettlementCheckboxChange(false)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="wantHighSettlementNo" className="text-sm font-normal">
                  No
                </Label>
              </div>
            </div>
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
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-legal-primary hover:bg-legal-secondary text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Get My Free Case Evaluation"}
          </Button>

          <p className="text-sm text-gray-600 text-center mt-4">
            By submitting this form, you agree to be contacted by an attorney or law firm to discuss your case. Legally Innovative is not an attorney or law firm and as such can not provide you with legal advice, however may refer you to an attorney who can provide you with legal advice. We make no guarantees about settlements and verdicts.
          </p>
        </form>
      </Card>
    </div>
  );
};

export default JacksonvilleLeadForm;
