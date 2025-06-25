
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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

  const navLinks = [
    { name: "Home", href: "#home", isExternal: false, path: "/" },
    { name: "About", href: "#about", isExternal: false },
    { name: "DIY", href: null, isExternal: false, path: "/diy" },
    { name: "FAQ", href: "#faq", isExternal: false },
    { name: "Why Us", href: "#why-us", isExternal: false },
    { name: "Contact", href: "#contact", isExternal: false },
  ];

  const serviceLinks = [
    { name: "AI Consulting", path: "/ai-consulting-for-law-firms" },
    { name: "AI Customer Support Chatbots", path: "/ai-customer-support-chatbots" },
    { name: "Website Development", path: "/law-firm-website-development" },
    { name: "Mobile App Development", path: "/law-firm-mobile-app-development" },
    { name: "Digital Marketing", path: "/law-firm-digital-marketing" },
    { name: "Google Business Profile", path: "/google-business-profile-optimization" },
    { name: "SEO/AEO/Voice SEO", path: "/law-firm-seo-aeo-voiceseo" },
    { name: "Lead Generation", path: "/law-firm-lead-generation" },
    { name: "Voice Assistant Marketing", path: "/law-firm-voice-assistant-marketing" },
  ];

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

  const handleServiceLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  // On Michael page, always show a visible background
  const shouldHaveBackground = isScrolled || isMichaelPage;

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
          {navLinks.map((link) => (
            link.path ? (
              <Link
                key={link.name}
                to={link.path}
                className={`hover:text-legal-primary transition-colors font-medium ${
                  isMichaelPage && !shouldHaveBackground ? "text-white" : "text-legal-dark"
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link)}
                className={`hover:text-legal-primary transition-colors font-medium ${
                  isMichaelPage && !shouldHaveBackground ? "text-white" : "text-legal-dark"
                }`}
              >
                {link.name}
              </button>
            )
          ))}
          
          {/* Services Dropdown */}
          <div className="relative">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent ${
                      isMichaelPage && !shouldHaveBackground ? "text-white" : "text-legal-dark"
                    }`}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border shadow-lg rounded-md p-4 min-w-[300px]">
                    <div className="grid gap-2">
                      {serviceLinks.map((service) => (
                        <NavigationMenuLink key={service.name} asChild>
                          <Link
                            to={service.path}
                            className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors text-legal-dark hover:text-legal-primary"
                          >
                            {service.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Button 
            className="bg-legal-primary hover:bg-legal-secondary text-white"
            onClick={handlePortalClick}
          >
            Client Portal
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            isMichaelPage && !shouldHaveBackground ? "text-white" : "text-legal-dark"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-legal-dark hover:text-legal-primary transition-colors py-2 border-b border-gray-100 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavLinkClick(link)}
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
                setMobileMenuOpen(false);
              }}
            >
              Client Portal
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
