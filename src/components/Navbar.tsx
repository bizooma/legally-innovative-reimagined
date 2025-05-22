
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const navLinks = [
    { name: "Home", href: "#home", isExternal: false, path: "/" },
    { name: "About", href: "#about", isExternal: false },
    { name: "Services", href: "#services", isExternal: false },
    { name: "DIY", href: null, isExternal: false, path: "/diy" },
    { name: "FAQ", href: "#faq", isExternal: false },
    { name: "Why Us", href: "#why-us", isExternal: false },
    { name: "Contact", href: "#contact", isExternal: false },
  ];

  const handlePortalClick = () => {
    navigate('/portal');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-2"
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
                className="text-legal-dark hover:text-legal-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-legal-dark hover:text-legal-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            )
          ))}
          <Button 
            className="bg-legal-primary hover:bg-legal-secondary text-white"
            onClick={handlePortalClick}
          >
            Client Portal
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-legal-dark"
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-legal-dark hover:text-legal-primary transition-colors py-2 border-b border-gray-100 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
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
