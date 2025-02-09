// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
