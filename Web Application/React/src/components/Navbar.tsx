import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  navigate: (path: string) => void;
  userName: string; 
}

const Navbar: React.FC<NavbarProps> = ({ navigate, userName }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    // Fonction de déconnexion
    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    };

  return (
    <>
      {/* Navbar avec effet au scroll */}
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 shadow-md bg-gray-900 text-white
        ${scrolled ? "bg-opacity-90 backdrop-blur-md py-2" : "py-3"}`}
      >
        <div className="container mx-auto flex justify-end items-center px-6">
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
            <span className="text-lg font-semibold cursor-pointer" onClick={() => navigate("/profile")}>{userName || "Utilisateur"}</span>
          </div>
          <div className="flex items-center space-x-4 ml-5">
            <button 
              onClick={handleLogout}
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