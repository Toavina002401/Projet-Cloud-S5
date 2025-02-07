// firebase.js or firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyANBXGPcsc1C9ifYWbn2TcEmK2UTxZOunk",
  authDomain: "cryptoo-c89b8.firebaseapp.com",
  projectId: "cryptoo-c89b8",
  storageBucket: "cryptoo-c89b8.firebasestorage.app",
  messagingSenderId: "614649278019",
  appId: "1:614649278019:web:2f54246f7844ff6d986ef6",
  measurementId: "G-D0710X2STF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
