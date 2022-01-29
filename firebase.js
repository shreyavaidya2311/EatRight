// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { FIREBASE_API_KEY } from "@env";
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "food-logger-930af.firebaseapp.com",
  projectId: "food-logger-930af",
  storageBucket: "food-logger-930af.appspot.com",
  messagingSenderId: "229459970895",
  appId: "1:229459970895:web:72e24b78efac7f5b6ad33a",
  measurementId: "G-45JBVSQRPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
export { auth, db };
