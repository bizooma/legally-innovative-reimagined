
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { DIYHeader } from "@/components/diy/DIYHeader";
import { ResourcesSection } from "@/components/diy/ResourcesSection";
import { ProductPromotionsSection } from "@/components/diy/ProductPromotionsSection";
import { ConsultationCTA } from "@/components/diy/ConsultationCTA";

const DIY = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <DIYHeader 
              title="DIY Legal Marketing Resources"
              description="Welcome to our DIY legal marketing resources section. As marketing specialists for law firms, we've created these tools, templates, and guides to help you promote your legal practice more effectively."
            />
            
            <div className="prose prose-lg max-w-none mb-12">
              <ResourcesSection />
              
              <ProductPromotionsSection />
              
              <ConsultationCTA
                title="Need Custom Legal Marketing Solutions?"
                description="While these DIY resources are helpful for many legal marketing situations, more complex marketing strategies often require professional guidance. Contact us today to discuss your law firm's specific marketing needs."
                buttonText="Free Consultation"
                buttonLink="https://calendly.com/joe-bizooma/30min"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default DIY;
