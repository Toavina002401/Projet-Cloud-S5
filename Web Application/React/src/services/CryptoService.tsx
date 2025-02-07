import axios from "axios";
import API_CRYPTO from "../configs/cryptoApi"


export const getPortefeuille = async (idUtilisateur) => {
  try {
    const response = await axios.get(`${API_CRYPTO}/portefeuille/${idUtilisateur}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du portefeuille:", error);
    throw error;
  }
};

export const getAllCrypto = async () => {
  try {
    const response = await axios.get(`${API_CRYPTO}/getAllCrypto`);
    // Assurer que la réponse contient bien un tableau sous response.data.data
    const cryptos = Array.isArray(response.data.data)
      ? response.data.data.map(crypto => ({
          id: crypto.id,
          name: crypto.nom,
          symbol: crypto.symbole,
          basePrice: parseFloat(crypto.baseprise).toFixed(2),
        }))
      : [];  // Retourne un tableau vide si les données ne sont pas sous forme de tableau
    return cryptos;
  } catch (error) {
    console.error("Erreur lors de la récupération des cryptos:", error);
    throw error;
  }
};

export const histoTransaction = async (idUtilisateur) => {
  try {
    const response = await axios.get(`${API_CRYPTO}/historiqueFonds/${idUtilisateur}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des historiques de transactions:", error);
    throw error;
  }
};

export const depot = async (idUtilisateur: number, solde: number) => {
  try {
    const response = await axios.post(`${API_CRYPTO}/depot`, { idUtilisateur, solde });
    return response.data;
  } catch (error) {
    console.error("Erreur de depot dans le service", error);
    throw error;
  }
};


export const retrait = async (idUtilisateur: number, solde: number) => {
  try {
    const response = await axios.post(`${API_CRYPTO}/retrait`, { idUtilisateur, solde });
    return response.data;
  } catch (error) {
    console.error("Erreur de retrait dans le service", error);
    throw error;
  }
};