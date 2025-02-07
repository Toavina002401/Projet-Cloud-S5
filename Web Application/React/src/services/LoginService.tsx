import axios from "axios";
import API_FOURNISSEUR_IDENTITE from "../configs/api"

// Service d'authentification
export const login = async (email: string, mdp: string) => {
  try {
    const response = await axios.post(`${API_FOURNISSEUR_IDENTITE}/login`, { email, mdp });
    return response.data;
  } catch (error) {
    console.error("Erreur de connexion", error);
    throw error;
  }
};