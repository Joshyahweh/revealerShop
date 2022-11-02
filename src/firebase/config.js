// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDD6kcXwv3uviVZnj7lYsO6qY9fBocTg5g",
  authDomain: "revealershop.firebaseapp.com",
  projectId: "revealershop",
  storageBucket: "revealershop.appspot.com",
  messagingSenderId: "648144157133",
  appId: "1:648144157133:web:6b7cfb2b9a581425206c84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
