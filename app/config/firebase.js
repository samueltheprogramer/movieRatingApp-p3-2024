// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB-42uCWSiX2kkS4skwC4lfm1ITfw9WYg",
  authDomain: "movie-rating-p3.firebaseapp.com",
  projectId: "movie-rating-p3",
  storageBucket: "movie-rating-p3.appspot.com",
  messagingSenderId: "873453402106",
  appId: "1:873453402106:web:779772e8985f11f6405643",
  measurementId: "G-6C9R748PDS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
