
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface ServiceLink {
  name: string;
  path: string;
}

interface ServicesDropdownProps {
  serviceLinks: ServiceLink[];
  textColorClass: string;
}

const ServicesDropdown = ({ serviceLinks, textColorClass }: ServicesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleServiceClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center hover:text-legal-primary transition-colors font-medium ${textColorClass}`}
      >
        Services
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-md p-4 min-w-[300px] z-50">
          <div className="grid gap-2">
            {serviceLinks.map((service) => (
              <Link
                key={service.name}
                to={service.path}
                onClick={handleServiceClick}
                className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors text-legal-dark hover:text-legal-primary"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;
