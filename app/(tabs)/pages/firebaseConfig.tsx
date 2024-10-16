
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuf11tWJdzcXGppBdalUTx1Yj2vaDy3jo",
  authDomain: "users-4b2f0.firebaseapp.com",
  databaseURL: "https://users-4b2f0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "users-4b2f0",
  storageBucket: "users-4b2f0.appspot.com",
  messagingSenderId: "569764571652",
  appId: "1:569764571652:web:ccf92857e45aa89d562351",
  measurementId: "G-0ZX6JT76PS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);