import { Home, User, LineChart, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Accueil", path: "/home" },
    { icon: LineChart, label: "Crypto", path: "/crypto" },
    { icon: Wallet, label: "Portefeuille", path: "/wallet" },
    { icon: User, label: "Profil", path: "/user" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-crypto-card backdrop-blur-lg border-t border-crypto-primary/20">
      <nav className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${
              isActive(path)
                ? "text-crypto-primary"
                : "text-crypto-light/60 hover:text-crypto-primary"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
