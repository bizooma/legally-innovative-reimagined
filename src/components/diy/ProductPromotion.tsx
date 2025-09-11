
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FeatureItem {
  text: string;
}

interface BenefitItem {
  text: string;
}

interface ProductPromotionProps {
  title: string;
  description: string;
  features: FeatureItem[];
  benefits: BenefitItem[];
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  learnMoreContent: string[];
  trialItems: string[];
  trialButtonText: string;
  trialButtonLink: string;
  colorScheme: "blue" | "purple";
}

export const ProductPromotion = ({
  title,
  description,
  features,
  benefits,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText = "Learn More",
  learnMoreContent,
  trialItems,
  trialButtonText,
  trialButtonLink,
  colorScheme
}: ProductPromotionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const bgGradient = colorScheme === "blue" 
    ? "bg-gradient-to-br from-legal-primary/10 to-legal-secondary/10 border-legal-primary/20" 
    : "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100";
  
  const primaryBg = colorScheme === "blue" 
    ? "bg-legal-primary hover:bg-legal-secondary" 
    : "bg-purple-600 hover:bg-purple-700";
  
  const secondaryBorder = colorScheme === "blue" 
    ? "border-legal-primary text-legal-primary hover:bg-legal-primary/10" 
    : "border-purple-600 text-purple-600 hover:bg-purple-600/10";

  return (
    <section className={`mb-16 ${bgGradient} rounded-xl overflow-hidden shadow-lg border`}>
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-3/5">
            <h2 className="text-2xl md:text-3xl font-bold text-legal-dark mb-4">
              {title}
            </h2>
            <p className="text-gray-700 mb-6">
              {description}
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`rounded-full ${colorScheme === "blue" ? "bg-legal-primary" : "bg-purple-600"} p-1 text-white mt-1`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-gray-700">{feature.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                className={`${primaryBg} text-white`}
                onClick={() => window.open(primaryButtonLink, "_blank")}
              >
                {primaryButtonText} <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className={secondaryBorder}
              >
                {secondaryButtonText}
              </Button>
            </div>
            
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
              <CollapsibleContent className="text-gray-700 space-y-4 border-t border-blue-100 pt-4 mt-4 animate-accordion-down">
                {learnMoreContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="md:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-legal-dark">Ready to try {title.split(" ")[0]} for your law firm?</h3>
              <div className="space-y-3 mb-6">
                {trialItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button 
                className={`w-full ${primaryBg} text-white`}
                onClick={() => window.open(trialButtonLink, "_blank")}
              >
                {trialButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
