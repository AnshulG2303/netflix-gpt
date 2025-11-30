// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHcyLoh7_RrvLG2tx2y-WQHuCTOnvzUqQ",
  authDomain: "netflixgpt-b9a9e.firebaseapp.com",
  projectId: "netflixgpt-b9a9e",
  storageBucket: "netflixgpt-b9a9e.firebasestorage.app",
  messagingSenderId: "791149100265",
  appId: "1:791149100265:web:d9a6bf15df9a762074c478",
  measurementId: "G-N0BK3VS7YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();