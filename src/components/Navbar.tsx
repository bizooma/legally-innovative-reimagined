
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavLinks from "./navbar/NavLinks";
import ServicesDropdown from "./navbar/ServicesDropdown";
import ProductsDropdown from "./navbar/ProductsDropdown";
import MobileMenu from "./navbar/MobileMenu";
import { navLinks, serviceLinks, productLinks } from "./navbar/navigationData";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { trackEvent } from "@/utils/gtmTracking";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { installApp, canInstall } = useInstallPrompt();
  
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
    if (isHomePage && location.hash && location.hash.length > 1 && location.hash !== '#/') {
      try {
        const element = document.querySelector(location.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } catch (error) {
        console.warn('Invalid hash selector:', location.hash);
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

  const handleInstallClick = async () => {
    trackEvent({
      event: 'pwa_install_attempt',
      event_category: 'engagement',
      event_label: 'Navbar Install Button'
    });
    
    const success = await installApp();
    
    if (success) {
      trackEvent({
        event: 'pwa_install_success',
        event_category: 'engagement',
        event_label: 'App Installed from Navbar'
      });
    }
  };

  // Always show white background on all pages for consistent visibility
  const shouldHaveBackground = true;
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
            alt="Bizooma Logo"
            className="h-16 w-auto object-contain"
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

          <ProductsDropdown 
            productLinks={productLinks}
            textColorClass={textColorClass}
          />

          <Link 
            to="/stay-informed"
            className={`hover:text-legal-primary transition-colors font-medium ${textColorClass}`}
          >
            Stay Informed
          </Link>

          {canInstall && (
            <Button 
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handleInstallClick}
            >
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          )}

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
        productLinks={productLinks}
        onNavLinkClick={handleNavLinkClick}
        onClose={() => setMobileMenuOpen(false)}
        canInstall={canInstall}
        onInstallClick={handleInstallClick}
      />
    </header>
  );
};

export default Navbar;
