// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";  // Importer Firestore

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyANBXGPcsc1C9ifYWbn2TcEmK2UTxZOunk",
  authDomain: "cryptoo-c89b8.firebaseapp.com",
  projectId: "cryptoo-c89b8",
  storageBucket: "cryptoo-c89b8.firebasestorage.app",
  messagingSenderId: "614649278019",
  appId: "1:614649278019:web:2f54246f7844ff6d986ef6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export const firestore = getFirestore(app); 

// Request notification permission and get token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BOj4iHNrVMHTsgI9jFUECOUkSd_czT3DKCp4ZoYQAfBrVZk2wItwmIQKOTMrXVMdXdOIvgPSFVjuGE4valKYFxU", // Clé VAPID à remplacer
      });
      if (token) {
        console.log("FCM Token :", token);
        return token;
      } else {
        console.error("Aucun token récupéré.");
      }
    } else {
      console.warn("Notifications refusées par l'utilisateur.");
    }
  } catch (error) {
    console.error("Erreur lors de la demande de permissions :", error);
    if (
      error.message.includes("failed-service-worker-registration") ||
      error.message.includes("unsupported MIME type")
    ) {
      console.error(
        "Vérifiez que le fichier 'firebase-messaging-sw.js' est placé dans le dossier 'public' et qu'il est servi correctement."
      );
    }
  }
};

// Handle foreground notifications
export const handleForegroundNotifications = () => {
  onMessage(messaging, (payload) => {
    console.log("Notification reçue en premier plan :", payload);
    const notificationTitle = payload.notification?.title || "Notification";
    const notificationOptions = {
      body: payload.notification?.body,
      icon: payload.notification?.icon,
    };

    // Afficher la notification
    new Notification(notificationTitle, notificationOptions);
  });
};

export const getFonds = async (id_utilisateur) => {
  try {
    const q = query(collection(firestore, "Portefeuille"), where("id_utilisateur", "==", id_utilisateur));
    const querySnapshot = await getDocs(q);
    const fonds = [];

    querySnapshot.forEach((doc) => {
      fonds.push({
        id: doc.id, 
        date_creation: doc.data().date_creation,
        solde_fonds: parseFloat(doc.data().solde_fonds.replace(",", ".")),
        id_utilisateur: doc.data().id_utilisateur, 
      });
    });

    return fonds;
  } catch (error) {
    console.error("Erreur lors de la récupération des fonds dans le portefeuille: ", error);
    throw error;
  }
};

export const getUtilisateur = async () =>{
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      let email = user.email;
      const q = query(collection(firestore, "Utilisateur"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const uti = [];
  
      querySnapshot.forEach((doc) => {
        uti.push({
          id: doc.data().id_uti, 
          pseudo: doc.data().pseudo,
          date_creation: doc.data().date_creation,
          email: doc.data().email,
          actif: doc.data().actif, 
        });
      });
      return uti;
    } else {
      throw new Error("Aucun utilisateur connecté");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des information d'utilisateurs : ", error);
    throw error;
  }
}


