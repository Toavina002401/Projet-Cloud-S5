import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  navigate: (path: string) => void;
  onLogout: () => void;
  userName: string; // Le pseudo de l'utilisateur
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, navigate, onLogout, userName }) => {
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
        ${scrolled ? "bg-opacity-90 backdrop-blur-md py-2" : "py-3"}
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900 border-b border-gray-200"}`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Profil utilisateur à gauche avec photo cliquable et pseudo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/profile")}  // Rediriger vers la page de profil lorsqu'on clique sur l'image
              className="focus:outline-none"
            >
              <img 
                src="https://www.w3schools.com/howto/img_avatar.png" // URL de l'image par défaut
                alt="Profil"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
            <span className="text-lg font-semibold">{userName || "Utilisateur"}</span> {/* Affiche "Utilisateur" si userName est vide */}
          </div>

          {/* Boutons de navigation (centrés) */}
          <div className="flex-1 flex justify-center space-x-8">
            <button onClick={() => navigate("/")} className="hover:text-gray-500 focus:outline-none transition-all duration-200 hover:scale-105">
              Accueil
            </button>
            <button onClick={() => navigate("/analyseCrypto")} className="hover:text-gray-500 focus:outline-none transition-all duration-200 hover:scale-105">
              Analyse Crypto
            </button>
            <button onClick={() => navigate("/cryptoFavoris")} className="hover:text-gray-500 focus:outline-none transition-all duration-200 hover:scale-105">
              Crypto Favoris
            </button>
            <button onClick={() => navigate("/transaction")} className="hover:text-gray-500 focus:outline-none transition-all duration-200 hover:scale-105">
              Transactions
            </button>
          </div>

          {/* Boutons à droite */}
          <div className="flex items-center space-x-4">
            {/* Bouton de thème (sombre / clair) */}
            
            {/* Bouton de déconnexion */}
            <button 
              onClick={onLogout} 
              className="p-3 rgb(100, 89, 165) text-white rounded-full hover:bg-red-600 focus:outline-none transition-all duration-300 hover:scale-110 hover:rotate-12"
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
