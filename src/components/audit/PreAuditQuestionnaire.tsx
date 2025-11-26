import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PreAuditQuestionnaireProps {
  accessCodeId: string;
  onComplete: () => void;
}

const industries = [
  "Healthcare",
  "Technology",
  "Retail",
  "Finance",
  "Real Estate",
  "Legal Services",
  "Education",
  "Hospitality",
  "Manufacturing",
  "Professional Services",
  "Other"
];

const goalOptions = [
  { id: "lead_generation", label: "Lead Generation" },
  { id: "brand_awareness", label: "Brand Awareness" },
  { id: "local_visibility", label: "Local Visibility" },
  { id: "ecommerce_sales", label: "E-commerce Sales" },
  { id: "thought_leadership", label: "Thought Leadership" },
  { id: "customer_support", label: "Customer Support/FAQs" }
];

export function PreAuditQuestionnaire({ accessCodeId, onComplete }: PreAuditQuestionnaireProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessReach, setBusinessReach] = useState<string>("");
  const [businessModel, setBusinessModel] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState<string>("");

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSubmit = async () => {
    if (!businessReach || !businessModel || !industry || selectedGoals.length === 0) {
      toast({
        title: "Incomplete Information",
        description: "Please answer all required questions before continuing.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("audit_access_codes")
        .update({
          business_reach: businessReach,
          business_model: businessModel,
          industry,
          primary_goals: selectedGoals,
          target_audience: targetAudience || null,
          questionnaire_completed: true
        })
        .eq("id", accessCodeId);

      if (error) throw error;

      toast({
        title: "Business Context Saved",
        description: "Your audit will now provide tailored recommendations."
      });

      onComplete();
    } catch (error) {
      console.error("Error saving questionnaire:", error);
      toast({
        title: "Error",
        description: "Failed to save business context. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tell Us About Your Business</CardTitle>
        <CardDescription>
          Help us provide more relevant SEO recommendations by answering a few questions about your business.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Business Reach */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">1. What is your business reach? *</Label>
          <RadioGroup value={businessReach} onValueChange={setBusinessReach}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="local" />
              <Label htmlFor="local" className="font-normal cursor-pointer">
                Local - Serving customers in a specific city or region
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regional" id="regional" />
              <Label htmlFor="regional" className="font-normal cursor-pointer">
                Regional - Serving multiple cities/states
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="national" id="national" />
              <Label htmlFor="national" className="font-normal cursor-pointer">
                National - Serving customers across the country
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="international" id="international" />
              <Label htmlFor="international" className="font-normal cursor-pointer">
                International - Serving customers globally
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Business Model */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">2. What is your business model? *</Label>
          <RadioGroup value={businessModel} onValueChange={setBusinessModel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="b2b" id="b2b" />
              <Label htmlFor="b2b" className="font-normal cursor-pointer">
                B2B - Selling to other businesses
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="b2c" id="b2c" />
              <Label htmlFor="b2c" className="font-normal cursor-pointer">
                B2C - Selling directly to consumers
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both" className="font-normal cursor-pointer">
                Both B2B and B2C
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Industry */}
        <div className="space-y-3">
          <Label htmlFor="industry" className="text-base font-semibold">3. What industry are you in? *</Label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select an industry...</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Primary Goals */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">4. What are your primary goals? * (Select all that apply)</Label>
          <div className="space-y-2">
            {goalOptions.map(goal => (
              <div key={goal.id} className="flex items-center space-x-2">
                <Checkbox
                  id={goal.id}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                />
                <Label htmlFor={goal.id} className="font-normal cursor-pointer">
                  {goal.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="space-y-3">
          <Label htmlFor="audience" className="text-base font-semibold">
            5. Describe your target audience (Optional)
          </Label>
          <textarea
            id="audience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g., Small business owners aged 35-55, tech-savvy professionals, homeowners in suburban areas..."
            rows={3}
            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Saving..." : "Continue to Audit"}
        </Button>
      </CardContent>
    </Card>
  );
}
