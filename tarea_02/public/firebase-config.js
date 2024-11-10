import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Happy Hump web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcjA36kxyCyvmraYHJhj5jPx_nIVzISb0",
    authDomain: "tarea-interfaces---css-01.firebaseapp.com",
    projectId: "tarea-interfaces---css-01",
    storageBucket: "tarea-interfaces---css-01.firebasestorage.app",
    messagingSenderId: "466712325661",
    appId: "1:466712325661:web:1d6e6ca3c9dffbb06560f4",
    measurementId: "G-B08Y4KMEFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);