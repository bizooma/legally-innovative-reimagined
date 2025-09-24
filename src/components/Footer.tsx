
import { Linkedin, Facebook } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsOfServiceModal from "./TermsOfServiceModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import footerTechBg from "@/assets/footer-tech-bg.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="text-white py-12 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(122, 10, 10, 0.9), rgba(122, 10, 10, 0.9)), url('${footerTechBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/0e8bdb38-d5a7-4ced-b3d0-d0a37c64ac55.png" 
                alt="Legally Innovative Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-legal-accent">Built for Law Firms. Powered by Innovation.</h4>
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
                <PrivacyPolicyModal triggerClassName="text-legal-light hover:text-legal-accent transition-colors p-0 h-auto font-normal text-base justify-start" />
              </li>
              <li>
                <TermsOfServiceModal triggerClassName="text-legal-light hover:text-legal-accent transition-colors p-0 h-auto font-normal text-base justify-start" />
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/#services" className="text-legal-light hover:text-legal-accent transition-colors">Innovation Consulting</Link></li>
              <li><Link to="/#services" className="text-legal-light hover:text-legal-accent transition-colors">Legal Design Thinking</Link></li>
              <li><Link to="/#services" className="text-legal-light hover:text-legal-accent transition-colors">Technology Implementation</Link></li>
              <li><Link to="/#services" className="text-legal-light hover:text-legal-accent transition-colors">Training Programs</Link></li>
              <li>
                <Link to="/ai-customer-support-chatbots" className="text-legal-light hover:text-legal-accent transition-colors">
                  AI Customer Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.linkedin.com/in/heyjoe0/" target="_blank" rel="noopener noreferrer" className="bg-white bg-opacity-10 hover:bg-opacity-20 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={18} />
              </a>
              <a href="https://www.facebook.com/WeAreLegallyInnovative/" target="_blank" rel="noopener noreferrer" className="bg-white bg-opacity-10 hover:bg-opacity-20 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-legal-light text-sm text-center">
              © Legally Innovative 2025. A <a href="https://bizooma.com" target="_blank" rel="noopener noreferrer" className="text-legal-accent hover:text-white transition-colors">Bizooma, LLC</a> property, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
