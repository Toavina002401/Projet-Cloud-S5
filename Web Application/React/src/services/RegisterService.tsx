import axios from "axios";
import API_FOURNISSEUR_IDENTITE from "../configs/api"

export const inscription = async (pseudo: string ,email: string, mdp: string) => {
    try {
      const response = await axios.post(`${API_FOURNISSEUR_IDENTITE}/inscription`, { email, mdp, pseudo });
      return response.data;
    } catch (error) {
      console.error("Erreur de connexion", error);
      throw error;
    }
};

export const validationPin = async (email: string, codePin: string) => {
    try {
      const response = await axios.post(`${API_FOURNISSEUR_IDENTITE}/validate-pin-inscription`, { email, codePin });
      return response.data;
    } catch (error) {
      console.error("Erreur de connexion", error);
      throw error;
    }
};