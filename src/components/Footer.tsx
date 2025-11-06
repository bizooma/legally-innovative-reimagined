
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsOfServiceModal from "./TermsOfServiceModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import footerTechBg from "@/assets/footer-tech-bg.jpg";
import { trackEvent } from "@/utils/gtmTracking";
import { ResponsiveImage } from "@/components/ui/responsive-image";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="text-white py-12 relative overflow-hidden" style={{
    backgroundImage: `linear-gradient(rgba(122, 10, 10, 0.9), rgba(122, 10, 10, 0.9)), url('${footerTechBg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <ResponsiveImage 
                src="/logo.png" 
                alt="Bizooma - AI-Powered Marketing & Development for Law Firms" 
                sizes="80px"
                widths={[80, 160]}
                className="h-20 w-auto object-contain" 
              />
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-legal-accent">Built for Business.
Powered by Innovation.</h4>
              <p className="text-legal-light text-sm leading-relaxed">
                We understand the unique challenges law firms face because we work exclusively in the legal space. From trust-building client intake systems to AI-powered content strategies, our services are designed to make your firm more visible, more approachable, and more efficient — without ever compromising compliance.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/#home" className="text-legal-light hover:text-legal-accent transition-colors">Home</Link></li>
              <li><Link to="/#about" className="text-legal-light hover:text-legal-accent transition-colors">About Us</Link></li>
              <li><Link to="/#services" className="text-legal-light hover:text-legal-accent transition-colors">Services</Link></li>
              <li><Link to="/#contact" className="text-legal-light hover:text-legal-accent transition-colors">Contact</Link></li>
              <li>
                <Link to="/this-is-our-jax" className="text-legal-light hover:text-legal-accent transition-colors">
                  Jacksonville Attorney
                </Link>
              </li>
              <li>
                <Link to="/install" className="text-legal-light hover:text-legal-accent transition-colors">
                  Install App
                </Link>
              </li>
              <li>
                <PrivacyPolicyModal triggerClassName="text-legal-light hover:text-legal-accent transition-colors p-0 h-auto font-normal text-base justify-start" />
              </li>
              <li>
                <TermsOfServiceModal triggerClassName="text-legal-light hover:text-legal-accent transition-colors p-0 h-auto font-normal text-base justify-start" />
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-legal-light text-sm text-center">
              © Bizooma 2025. A <a href="https://bizooma.com" target="_blank" rel="noopener noreferrer" className="text-legal-accent hover:text-white transition-colors">Bizooma, LLC</a> property, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;