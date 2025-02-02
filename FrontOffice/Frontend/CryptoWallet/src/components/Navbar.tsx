import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  navigate: (path: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, navigate, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar avec effet au scroll */}
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 shadow-md 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}
        ${scrolled ? "bg-opacity-90 backdrop-blur-md py-2" : "py-3"}`}
      >
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo (placé à gauche) */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold focus:outline-none transform transition-transform duration-200 hover:scale-105"
          >
            Crypto Dashboard
          </button>

          {/* Boutons de navigation (centrés avec plus d’espace) */}
          <div className="flex-1 flex justify-center space-x-12">
            <button onClick={() => navigate("/")} className="hover:text-gray-300 focus:outline-none transition-all duration-200 hover:scale-105">
              Accueil
            </button>
            <button onClick={() => navigate("/analyseCrypto")} className="hover:text-gray-300 focus:outline-none transition-all duration-200 hover:scale-105">
              Analyse Crypto
            </button>
            <button onClick={() => navigate("/cryptoFavoris")} className="hover:text-gray-300 focus:outline-none transition-all duration-200 hover:scale-105">
              Crypto Favoris
            </button>
            <button onClick={() => navigate("/transaction")} className="hover:text-gray-300 focus:outline-none transition-all duration-200 hover:scale-105">
              Transactions
            </button>
          </div>

          {/* Boutons à droite */}
          <div className="flex items-center space-x-6">
            {/* Bouton de déconnexion avec icône et animation */}
            <button 
              onClick={onLogout} 
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              <FaSignOutAlt size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Ajout d'un padding en haut pour éviter le chevauchement */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
