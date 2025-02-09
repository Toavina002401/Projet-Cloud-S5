import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initializeFirebaseMessaging = async () => {
  try {
    // Enregistrez le Service Worker
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered successfully');
    }

    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      console.log('FCM Token:', token);
    } else {
      console.warn('Notification permissions denied');
    }
  } catch (error) {
    console.error('Error initializing Firebase messaging:', error);
  }
};


export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
};

export const showUploadSuccessNotification = () => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Upload Success!", {
      body: "Your image has been successfully uploaded to Cloudinary!",
      icon: "/placeholder.svg"
    });
  }
};
