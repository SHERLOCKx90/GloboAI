// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD8EurdO1fXmCpncG7WFC95uW7Ul3f_C9M",
    authDomain: "globo-ai-001.firebaseapp.com",
    projectId: "globo-ai-001",
    storageBucket: "globo-ai-001.appspot.com",
    messagingSenderId: "755765546167",
    appId: "1:755765546167:web:98b3f46f4f3aef43651132",
    measurementId: "G-SFD308XSPV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);