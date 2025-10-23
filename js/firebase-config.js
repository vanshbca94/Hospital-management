// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1F-08xqgsdTR9oGmNqtFzlBJNv86UVpM",
  authDomain: "hospital-management-5cb17.firebaseapp.com",
  projectId: "hospital-management-5cb17",
  storageBucket: "hospital-management-5cb17.firebasestorage.app",
  messagingSenderId: "1077408582965",
  appId: "1:1077408582965:web:21668368b4793cf98f107c",
  measurementId: "G-JEY8DE5FC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
