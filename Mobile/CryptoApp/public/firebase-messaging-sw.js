importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyANBXGPcsc1C9ifYWbn2TcEmK2UTxZOunk",
  authDomain: "cryptoo-c89b8.firebaseapp.com",
  projectId: "cryptoo-c89b8",
  storageBucket: "cryptoo-c89b8.firebasestorage.app",
  messagingSenderId: "614649278019",
  appId: "1:614649278019:web:2f54246f7844ff6d986ef6",
  measurementId: "G-D0710X2STF",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Notification reçue en arrière-plan :", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
