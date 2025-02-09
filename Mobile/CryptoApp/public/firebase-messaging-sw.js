importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyANBXGPcsc1C9ifYWbn2TcEmK2UTxZOunk",
    authDomain: "cryptoo-c89b8.firebaseapp.com",
    projectId: "cryptoo-c89b8",
    storageBucket: "cryptoo-c89b8.firebasestorage.app",
    messagingSenderId: "614649278019",
    appId: "1:614649278019:web:2f54246f7844ff6d986ef6"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/placeholder.svg'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
