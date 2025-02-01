import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  navigate: (path: string) => void; // Fonction pour gérer la navigation
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, navigate }) => {
  return (
    <nav className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou titre du site */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold focus:outline-none"
        >
          Crypto Dashboard
        </button>

        {/* Boutons de navigation */}
        <div className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="hover:text-gray-300 focus:outline-none"
          >
            Accueil
          </button>
          <button
            onClick={() => navigate("/analyseCrypto")}
            className="hover:text-gray-300 focus:outline-none"
          >
            Analyse Crypto
          </button>
          <button
            onClick={() => navigate("/cryptoFavoris")}
            className="hover:text-gray-300 focus:outline-none"
          >
            Crypto Favoris
          </button>
          <button
            onClick={() => navigate("/transaction")}
            className="hover:text-gray-300 focus:outline-none"
          >
            Transactions
          </button>
        </div>

        {/* Bouton de changement de thème */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-blue-500 text-white rounded-full focus:outline-none"
        >
          {isDarkMode ? (
            <FaMoon size={20} />
          ) : (
            <FaSun size={20} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;