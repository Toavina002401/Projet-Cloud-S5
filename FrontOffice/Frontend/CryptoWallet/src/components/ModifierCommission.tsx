import { useState } from "react";
import Card from "./common/Card";
import Button from "./common/Button";

const CommissionSettings = () => {
  // Données statiques de test
  const [buyCommission, setBuyCommission] = useState<number>(1.5); // Commission d'achat par défaut de 1.5%
  const [sellCommission, setSellCommission] = useState<number>(2.0); // Commission de vente par défaut de 2.0%

  const handleSubmit = () => {
    // Mettre à jour les commissions dans la base de données
    console.log("Achat:", buyCommission, "Vente:", sellCommission);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="glass" className="w-full max-w-4xl">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center">Paramètres de Commission</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Commission d'Achat (%)</label>
              <input
                type="number"
                value={buyCommission}
                onChange={(e) => setBuyCommission(Number(e.target.value) || 0)} // Conversion en nombre
                className="w-full p-3 rounded-lg bg-crypto-card border border-white/10"
                placeholder="Entrez la commission d'achat"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Commission de Vente (%)</label>
              <input
                type="number"
                value={sellCommission}
                onChange={(e) => setSellCommission(Number(e.target.value) || 0)} // Conversion en nombre
                className="w-full p-3 rounded-lg bg-crypto-card border border-white/10"
                placeholder="Entrez la commission de vente"
              />
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              Valider
            </Button>
          </div>

          {/* Affichage des valeurs des commissions */}
          <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
            <h3 className="font-bold">Commissions actuelles :</h3>
            <p>Achat: {buyCommission}%</p>
            <p>Vente: {sellCommission}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommissionSettings;
