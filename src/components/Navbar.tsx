
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavLinks from "./navbar/NavLinks";
import ServicesDropdown from "./navbar/ServicesDropdown";
import MobileMenu from "./navbar/MobileMenu";
import { navLinks, serviceLinks } from "./navbar/navigationData";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";
  const isMichaelPage = location.pathname === "/michael";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle scrolling to section after navigation
  useEffect(() => {
    if (isHomePage && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isHomePage, location.hash]);

  const handlePortalClick = () => {
    navigate('/portal');
  };

  const handleNavLinkClick = (link: { name: string; href: string | null; path?: string; isExternal: boolean }) => {
    if (link.path) {
      // Navigate to specific page
      navigate(link.path);
    } else if (link.href) {
      // Navigate to home page with hash
      navigate(`/${link.href}`);
    }
    setMobileMenuOpen(false);
  };

  // Always show white background except on home page when not scrolled
  const shouldHaveBackground = isScrolled || !isHomePage;
  const textColorClass = "text-legal-dark";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldHaveBackground
          ? "bg-white bg-opacity-95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Legally Innovative Logo" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks 
            navLinks={navLinks}
            onNavLinkClick={handleNavLinkClick}
            textColorClass={textColorClass}
          />
          
          <ServicesDropdown 
            serviceLinks={serviceLinks}
            textColorClass={textColorClass}
          />

          <Button 
            className="bg-legal-primary hover:bg-legal-secondary text-white"
            onClick={handlePortalClick}
          >
            Client Portal
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${textColorClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen}
        navLinks={navLinks}
        serviceLinks={serviceLinks}
        onNavLinkClick={handleNavLinkClick}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
