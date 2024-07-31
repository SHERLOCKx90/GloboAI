// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "globo-ai-001.firebaseapp.com",
    projectId: "globo-ai-001",
    storageBucket: "globo-ai-001.appspot.com",
    messagingSenderId: `${import.meta.env.VITE_FIREBASE_MSSG_SEND_ID}`,
    appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
    measurementId: "G-SFD308XSPV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);