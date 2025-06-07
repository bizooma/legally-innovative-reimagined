
import { useEffect } from "react";
import JacksonvilleHeroContent from "./JacksonvilleHeroContent";
import JacksonvilleLeadForm from "./JacksonvilleLeadForm";

const JacksonvilleHero = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <JacksonvilleHeroContent />
          <JacksonvilleLeadForm />
        </div>
      </div>
    </section>
  );
};

export default JacksonvilleHero;
