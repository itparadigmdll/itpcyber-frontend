// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // optional

const firebaseConfig = {
  apiKey: "AIzaSyDOcU_Q1n9nELKvtMtvO8JdOCY2sHEUzF0",
  authDomain: "itp-cybersec.firebaseapp.com",
  projectId: "itp-cybersec",
  storageBucket: "itp-cybersec.firebasestorage.app",
  messagingSenderId: "872101879173",
  appId: "1:872101879173:web:66acf58fe838e526e7b8ec",
  measurementId: "G-T3QFL0DLET",
};

// 🔥 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔐 Auth
export const auth = getAuth(app);

// 🗄 Firestore
export const db = getFirestore(app);

// optional
export default app;