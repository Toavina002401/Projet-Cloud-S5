import { Card } from "@/components/ui/card";
import { LineChart, ArrowUpRight, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {getUtilisateur,getFonds } from "../config/firebase";

const Home = () => {
  const [user ,setUser] = useState<any | null>(null);
  const [fonds , setFonds] = useState<number>(25.12);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const utilisateur = await getUtilisateur();
        setUser(utilisateur[0]);
        // Appeler getFonds avec l'ID de l'utilisateur
        console.log(utilisateur[0]);
        const fondsData = await getFonds(utilisateur[0].id); 
        console.log(fondsData);
        if (fondsData && fondsData.length > 0) {
          // Calculer la somme des fonds
          const totalFonds = fondsData.reduce((acc, current) => acc + current.solde_fonds, 0);
          setFonds(totalFonds);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur ou des fonds:", error);
      }
    };

    fetchUser();
  }, []);


  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 pb-20 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">

        {/* Section de bienvenue */}
        <div className="text-left">
          <h1 className="text-2xl font-bold">Bon retour</h1>
          <p className="text-crypto-primary">
            {user ? (user.pseudo || "Invité") : "Invité"}
          </p>
        </div>

        {/* Carte du portefeuille */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Valeur du portefeuille</h2>
            <Wallet className="text-crypto-primary" />
          </div>
          <div className="text-3xl font-bold text-crypto-primary">${fonds}</div>
        </Card>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-crypto-card border-none p-4 hover:bg-crypto-primary/10 transition-colors cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <LineChart className="w-6 h-6 text-crypto-primary" />
              <span className="text-sm">Marchés</span>
            </div>
          </Card>
          <Card className="bg-crypto-card border-none p-4 hover:bg-crypto-primary/10 transition-colors cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <ArrowUpRight className="w-6 h-6 text-crypto-primary" />
              <span className="text-sm">Échanger</span>
            </div>
          </Card>
        </div>

        {/* Activité récente */}
        <Card className="bg-crypto-card border-none p-6">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          <div className="space-y-4">
            {[
              {
                type: "Achat",
                crypto: "BTC",
                amount: "+0.0234",
                value: "$1,234.56",
                time: "il y a 2h",
              },
              {
                type: "Vente",
                crypto: "ETH",
                amount: "-1.5",
                value: "$3,456.78",
                time: "il y a 5h",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-crypto-primary/10 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {activity.type} {activity.crypto}
                  </p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      activity.type === "Achat"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {activity.amount}
                  </p>
                  <p className="text-sm text-gray-400">{activity.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
