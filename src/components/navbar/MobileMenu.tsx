
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  href: string | null;
  path?: string;
  isExternal: boolean;
}

interface ServiceLink {
  name: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  serviceLinks: ServiceLink[];
  onNavLinkClick: (link: NavLink) => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, navLinks, serviceLinks, onNavLinkClick, onClose }: MobileMenuProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  const handleServiceLinkClick = (path: string) => {
    navigate(path);
    onClose();
    setServicesOpen(false);
  };

  if (!isOpen) return null;

  return (
    <nav className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
      <div className="flex flex-col space-y-4">
        {navLinks.map((link) => (
          link.path ? (
            <Link
              key={link.name}
              to={link.path}
              className="text-legal-dark hover:text-legal-primary transition-colors py-2 border-b border-gray-100 font-medium"
              onClick={onClose}
            >
              {link.name}
            </Link>
          ) : (
            <button
              key={link.name}
              onClick={() => onNavLinkClick(link)}
              className="text-legal-dark hover:text-legal-primary transition-colors py-2 border-b border-gray-100 font-medium text-left"
            >
              {link.name}
            </button>
          )
        ))}
        
        {/* Mobile Services Submenu */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center justify-between w-full text-legal-dark hover:text-legal-primary transition-colors py-2 font-medium"
          >
            Services
            <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
          </button>
          {servicesOpen && (
            <div className="pl-4 pb-2 space-y-2">
              {serviceLinks.map((service) => (
                <button
                  key={service.name}
                  onClick={() => handleServiceLinkClick(service.path)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-legal-primary transition-colors py-1"
                >
                  {service.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button 
          className="bg-legal-primary hover:bg-legal-secondary text-white w-full flex items-center justify-center"
          onClick={() => {
            navigate('/portal');
            onClose();
          }}
        >
          Client Portal
        </Button>
      </div>
    </nav>
  );
};

export default MobileMenu;
