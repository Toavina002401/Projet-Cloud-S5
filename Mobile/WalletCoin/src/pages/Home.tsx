import { Home as HomeIcon, Search, History, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserProfile from "./user/UserProfile";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1A1F2C] to-[#111827]">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          Accueil
        </h1>

        <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Bienvenue!
            </h2>
        <p className="text-gray-400 mt-3 leading-relaxed">
          Vous êtes maintenant connecté à votre compte.
        </p>

        {/* User Profile Section */}
        <UserProfile /> {/* Insérer ici le composant UserProfile pour afficher les infos de l'utilisateur */}

        <div className="grid gap-6 mt-6">
          <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/10 transform transition-all duration-300 hover:scale-[1.02]">
        </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-md mx-auto flex justify-around items-center h-20 px-4">
          <button
            onClick={() => navigate("/home")}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-300",
              isActive("/home")
                ? "text-[#0EA5E9] bg-[#0EA5E9]/10"
                : "text-gray-400 hover:text-white"
            )}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Accueil</span>
          </button>

          <button
            onClick={() => navigate("/search")}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-300",
              isActive("/search")
                ? "text-[#0EA5E9] bg-[#0EA5E9]/10"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Recherche</span>
          </button>

          <div className="relative -mt-8">
            <button
              className="bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] p-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-110 transition-all duration-300"
            >
              <span className="text-white text-2xl font-bold">+</span>
            </button>
          </div>

          <button
            onClick={() => navigate("/history")}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-300",
              isActive("/history")
                ? "text-[#0EA5E9] bg-[#0EA5E9]/10"
                : "text-gray-400 hover:text-white"
            )}
          >
            <History className="h-6 w-6" />
            <span className="text-xs mt-1">Historique</span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-300",
              isActive("/profile")
                ? "text-[#0EA5E9] bg-[#0EA5E9]/10"
                : "text-gray-400 hover:text-white"
            )}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
