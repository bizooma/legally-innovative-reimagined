import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface ProductLink {
  name: string;
  path: string;
  description: string;
}

interface ProductsDropdownProps {
  productLinks: ProductLink[];
  textColorClass: string;
}

const ProductsDropdown = ({ productLinks, textColorClass }: ProductsDropdownProps) => {
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

  const handleProductClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center hover:text-legal-primary transition-colors font-medium ${textColorClass}`}
      >
        Products
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-md p-4 min-w-[320px] z-50">
          <div className="grid gap-2">
            {productLinks.map((product) => (
              <Link
                key={product.name}
                to={product.path}
                onClick={handleProductClick}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors group"
              >
                <div className="text-sm font-semibold text-legal-dark group-hover:text-legal-primary">
                  {product.name}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {product.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDropdown;
