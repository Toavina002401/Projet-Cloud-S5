import { useEffect, useState } from "react";
import CryptoFavoris from "@/components/CryptoFavoris";
import Navbar from "@/components/Navbar"; 
import { useNavigate } from "react-router-dom";
import Transactions from "@/components/Transactions";
import { getPortefeuille } from "../services/CryptoService";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: number; pseudo: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [argent, setArgent] = useState<number>(0);
  const [porteFeuille ,setPorteFeuille] = useState<number>(0);

  useEffect(() => {
    // Récupérer les données utilisateur et token
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);

      const userId = JSON.parse(storedUser).id;
      getPortefeuille(userId)
      .then((data) => {
        if (data && data.data) {
          setArgent(data.data.soldeFonds);
          setPorteFeuille(data.data.id);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du portefeuille", error);
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 to-black text-white`}>
      <Navbar navigate={navigate} userName={user ? user.pseudo : "Utilisateur"} />
      <div className="mx-auto py-8 pr-5">
        <div className="grid grid-cols-12">
          {/* Section Transactions (5 colonnes sur écran moyen, 12 sur petit) */}
          <div className="lg:col-span-3 md:col-span-12  col-span-12 pt-5">
            <Transactions solde={argent} idUtilisateur={user ? user.id : undefined}/>
          </div>

          {/* Section Crypto (7 colonnes sur écran moyen, 12 sur petit) */}
          <div className="lg:col-span-9 md:col-span-12 col-span-12 space-y-12">
            <h1 className="text-4xl font-bold text-center mb-12 pt-7">
              Cryptomonnaies Disponibles sur la Plateforme
            </h1>

            {/* CryptoChart Section */}
            <div className="space-y-6">
              <CryptoFavoris idUtilisateur={user ? user.id : undefined} idPortefeuille={porteFeuille}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;