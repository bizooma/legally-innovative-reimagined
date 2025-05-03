
import { Linkedin, Facebook } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsOfServiceModal from "./TermsOfServiceModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Legally<span className="text-legal-accent">Innovative</span></h3>
            <p className="text-gray-300 mb-4">
              Transforming legal services through innovation, training, and change management.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-legal-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-legal-accent transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-legal-accent transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-legal-accent transition-colors">Contact</a></li>
              <li><PrivacyPolicyModal /></li>
              <li><TermsOfServiceModal /></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-legal-accent transition-colors">Innovation Consulting</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-legal-accent transition-colors">Legal Design Thinking</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-legal-accent transition-colors">Technology Implementation</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-legal-accent transition-colors">Training Programs</a></li>
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
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm text-center">
              © Legally Innovative 2025. A Bizooma, LLC property, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
