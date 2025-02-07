import { useEffect, useState } from "react";
import CryptoFavoris from "@/components/CryptoFavoris";
import CryptoMultiLineChart from "@/components/CryptoMultiLineChart";
import Navbar from "@/components/Navbar"; 
import { useNavigate } from "react-router-dom";
import Transactions from "@/components/Transactions";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: number; pseudo: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer les données utilisateur et token
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
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
            <Transactions />
          </div>

          {/* Section Crypto (7 colonnes sur écran moyen, 12 sur petit) */}
          <div className="lg:col-span-9 md:col-span-12 col-span-12 space-y-12">
            <h1 className="text-4xl font-bold text-center mb-12 pt-7">
              Cryptomonnaies Disponibles sur la Plateforme
            </h1>

            {/* CryptoChart Section */}
            <div className="space-y-6">
              <CryptoFavoris />
            </div>

            {/* CryptoMultiLineChart Section */}
            <div className="py-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Cryptocurrency Evolution 12h
              </h2>
              <div className="flex justify-center">
                <CryptoMultiLineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;