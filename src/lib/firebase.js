import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBONrA2OecYo0YDQl3oNpH51v7YxtHDtyQ",
  authDomain: "sareepasal-9a63a.firebaseapp.com",
  projectId: "sareepasal-9a63a",
  storageBucket: "sareepasal-9a63a.firebasestorage.app",
  messagingSenderId: "888868443152",
  appId: "1:888868443152:web:00dcb3149b6d2b058be695",
  measurementId: "G-1QNW526W69"
};

// Start Firebase only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// IMPORTANT: We removed the Analytics lines entirely because they 
// are for tracking visitors and usually cause crashes during development. 
// You don't need them to make the store work!

// This checks if the person logged in is the owner
export const isAdmin = (user) => {
    return user?.email === "sareepasalusa@gmail.com"; 
};  