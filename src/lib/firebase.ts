import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBt1eWkTFeU3BSXVyQLjSRCdkUPbEbrNJQ",
  authDomain: "yashith-portfolio.firebaseapp.com",
  projectId: "yashith-portfolio",
  storageBucket: "yashith-portfolio.firebasestorage.app",
  messagingSenderId: "125827066205",
  appId: "1:125827066205:web:8812376ca9274e01bce0b4",
  measurementId: "G-C700FDK87B"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

try {
  // Initialize Firebase
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  
  // Initialize Services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Initialize Analytics only in the browser
  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) analytics = getAnalytics(app);
    }).catch(err => console.error("Analytics not supported:", err));
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { app, auth, db, storage, analytics };