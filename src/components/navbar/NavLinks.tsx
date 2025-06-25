
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  href: string | null;
  path?: string;
  isExternal: boolean;
}

interface NavLinksProps {
  navLinks: NavLink[];
  onNavLinkClick: (link: NavLink) => void;
  textColorClass: string;
}

const NavLinks = ({ navLinks, onNavLinkClick, textColorClass }: NavLinksProps) => {
  return (
    <>
      {navLinks.map((link) => (
        link.path ? (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-legal-primary transition-colors font-medium ${textColorClass}`}
          >
            {link.name}
          </Link>
        ) : (
          <button
            key={link.name}
            onClick={() => onNavLinkClick(link)}
            className={`hover:text-legal-primary transition-colors font-medium ${textColorClass}`}
          >
            {link.name}
          </button>
        )
      ))}
    </>
  );
};

export default NavLinks;
