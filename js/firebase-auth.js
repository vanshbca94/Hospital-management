// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjHnNK6pc2KQlY642SqEHXpOMjx0ghfcI",
  authDomain: "hospital-management-syst-e1875.firebaseapp.com",
  projectId: "hospital-management-syst-e1875",
  storageBucket: "hospital-management-syst-e1875.firebasestorage.app",
  messagingSenderId: "174278534239",
  appId: "1:174278534239:web:3a9312309aa4e60ea0e7ea",
  measurementId: "G-2FBFSZE4QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
