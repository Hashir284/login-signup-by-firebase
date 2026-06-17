  // Authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjueCq4DqttJW0yqR0LG1MiBz-XfbhHBg",
    authDomain: "login-signup-24a03.firebaseapp.com",
    projectId: "login-signup-24a03",
    storageBucket: "login-signup-24a03.firebasestorage.app",
    messagingSenderId: "486434325542",
    appId: "1:486434325542:web:0620a41a0f68a56fded2e7",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default auth

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);