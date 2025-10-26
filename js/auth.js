// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1F-08xqgsdTR9oGmNqtFzlBJNv86UVpM",
  authDomain: "hospital-management-5cb17.firebaseapp.com",
  projectId: "hospital-management-5cb17",
  storageBucket: "hospital-management-5cb17.firebasestorage.app",
  messagingSenderId: "1077408582965",
  appId: "1:1077408582965:web:21668368b4793cf98f107c",
  measurementId: "G-JEY8DE5FC9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let cachedRole = null;
let currentUser = null;

export function onAuthChanged(cb) {
  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    cachedRole = null;
    if (user) {
      // fetch role doc
      try {
        const uDoc = await getDoc(doc(db, "users", user.uid));
        if (uDoc.exists()) cachedRole = uDoc.data().role || null;
      } catch (e) {
        console.error("Failed to fetch role:", e);
      }
    }
    cb(user, cachedRole);
  });
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uDoc = await getDoc(doc(db, "users", cred.user.uid));
  const role = uDoc.exists() ? uDoc.data().role : null;
  cachedRole = role;
  currentUser = cred.user;
  return { user: cred.user, role };
}

export function signOutUser() {
  cachedRole = null;
  return signOut(auth);
}

export function getCurrentRole() { return cachedRole; }
export function getCurrentUser() { return currentUser; }
