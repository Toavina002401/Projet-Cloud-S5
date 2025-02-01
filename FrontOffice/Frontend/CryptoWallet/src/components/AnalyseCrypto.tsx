import { useState } from "react";
import Card from "./common/Card";
import Button from "./common/Button";

const CryptoAnalysis = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState("mean");
  const [selectedCrypto, setSelectedCrypto] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSubmit = () => {
    // Simulation de l'analyse (vous pouvez remplacer cela par une logique d'analyse réelle)
    let result = "Analyse complète pour ";

    if (selectedCrypto === "all") {
      result += "toutes les cryptomonnaies";
    } else {
      result += selectedCrypto;
    }

    result += ` - Type d'analyse: ${selectedAnalysis}, Période: ${startDate} à ${endDate}`;

    setAnalysisResult(result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="glass" className="w-full max-w-4xl">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center">Analyse Crypto</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Type d'Analyse</label>
              <select
                value={selectedAnalysis}
                onChange={(e) => setSelectedAnalysis(e.target.value)}
                className="w-full p-3 rounded-lg bg-crypto-card border border-white/10"
              >
                <option value="mean">Moyenne</option>
                <option value="min">Min</option>
                <option value="max">Max</option>
                <option value="firstQuartile">1er Quartile</option>
                <option value="stdDev">Écart-type</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Crypto</label>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className="w-full p-3 rounded-lg bg-crypto-card border border-white/10"
              >
                <option value="all">Tous</option>
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                {/* Ajouter d'autres cryptos ici */}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label className="text-sm font-medium">Date et Heure Min</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10"
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Date et Heure Max</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10"
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              Valider
            </Button>
          </div>

          {/* Affichage du résultat de l'analyse */}
          {analysisResult && (
            <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
              <h3 className="font-bold">Résultat de l'Analyse:</h3>
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CryptoAnalysis;
