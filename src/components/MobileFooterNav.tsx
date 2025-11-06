import { Home, Briefcase, Package, Newspaper, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileFooterNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Services", icon: Briefcase, path: "/ai-consulting-for-law-firms" },
    { name: "Products", icon: Package, path: "/products/npo-bots" },
    { name: "News", icon: Newspaper, path: "/stay-informed" },
    { name: "Contact", icon: Mail, path: "/#contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path.includes("#")) {
      return location.pathname === "/" && location.hash === path.split("#")[1];
    }
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                active 
                  ? "text-legal-primary" 
                  : "text-gray-600 hover:text-legal-primary"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileFooterNav;
