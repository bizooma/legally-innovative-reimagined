
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ServiceLink {
  name: string;
  path: string;
}

interface ServicesDropdownProps {
  serviceLinks: ServiceLink[];
  textColorClass: string;
}

const ServicesDropdown = ({ serviceLinks, textColorClass }: ServicesDropdownProps) => {
  return (
    <div className="relative">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent h-auto p-0 font-medium hover:text-legal-primary transition-colors ${textColorClass}`}
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
  );
};

export default ServicesDropdown;
