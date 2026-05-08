import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 1. Storage import කරන්න

const firebaseConfig = {
  // 2. Hardcoded values (Static export වලදී වඩාත් විශ්වාසදායකයි)
  apiKey: "AIzaSyBt1eWkTFeU3BSXVyQLjSRCdkUPbEbrNJQ",
  authDomain: "yashith-portfolio.firebaseapp.com",
  projectId: "yashith-portfolio",
  storageBucket: "yashith-portfolio.firebasestorage.app",
  messagingSenderId: "125827066205",
  appId: "1:125827066205:web:8812376ca9274e01bce0b4",
  measurementId: "G-C700FDK87B"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // 3. Storage initialize කරන්න

// 4. storage එකත් එක්කම export කරන්න
export { app, auth, db, storage };