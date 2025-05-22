
import { Button } from "@/components/ui/button";

interface ConsultationCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const ConsultationCTA = ({
  title,
  description,
  buttonText,
  buttonLink
}: ConsultationCTAProps) => {
  return (
    <div className="bg-legal-light/30 p-6 rounded-lg border border-legal-light mt-12">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p>{description}</p>
      <Button 
        className="bg-legal-primary hover:bg-legal-secondary mt-4"
        onClick={() => window.open(buttonLink, "_blank")}
      >
        {buttonText}
      </Button>
    </div>
  );
};
