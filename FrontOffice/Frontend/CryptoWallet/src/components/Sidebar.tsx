import { useState } from "react";
import { Home, Settings, User, Menu } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx(
        "h-screen bg-gray-900 text-white p-4 transition-all duration-300", 
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Bouton pour ouvrir/fermer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mb-4 focus:outline-none"
      >
        <Menu size={24} />
      </button>

      {/* Liens de navigation */}
      <nav className="flex flex-col gap-4">
        <SidebarItem icon={<Home size={24} />} text="Accueil" href="#" isOpen={isOpen} />
        <SidebarItem icon={<User size={24} />} text="Profil" href="#" isOpen={isOpen} />
        <SidebarItem icon={<Settings size={24} />} text="Paramètres" href="#" isOpen={isOpen} />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  isOpen: boolean;
}

const SidebarItem = ({ icon, text, href, isOpen }: SidebarItemProps) => {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger>
        <a
          href={href}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          {icon}
          {isOpen && <span>{text}</span>}
        </a>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-gray-700 text-white p-2 rounded-md">
        {text}
      </TooltipContent>
    </Tooltip>
  );
};

export default Sidebar;
