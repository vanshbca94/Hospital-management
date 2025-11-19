// js/auth.js
// Modular Firebase (v10+) - Auth + Firestore helper module
// Exports: signIn(email,password), signOutUser(), onAuthChanged(cb), getCurrentUser(), getCurrentRole()

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

let _cachedRole = null;
let _currentUser = null;

export function getCurrentUser(){ return _currentUser; }
export function getCurrentRole(){ return _cachedRole; }

export function onAuthChanged(cb){
  onAuthStateChanged(auth, async (user) => {
    _currentUser = user;
    _cachedRole = null;
    if (user) {
      try {
        const uref = doc(db, "users", user.uid);
        const snap = await getDoc(uref);
        if (snap.exists()) _cachedRole = snap.data().role || null;
      } catch (err) {
        console.error("error fetching role:", err);
      }
    }
    cb(user, _cachedRole);
  });
}

export async function signIn(email, password){
  const cred = await signInWithEmailAndPassword(auth, email, password);
  _currentUser = cred.user;
  _cachedRole = null;
  try {
    const uref = doc(db, "users", cred.user.uid);
    const snap = await getDoc(uref);
    if (snap.exists()) _cachedRole = snap.data().role || null;
  } catch (e) {
    console.error("role fetch error after signIn", e);
  }
  return { user: cred.user, role: _cachedRole };
}

export function signOutUser(){
  _cachedRole = null;
  return signOut(auth);
}

// ---------- Helper APIs used by other pages ----------

// Add a doctor (admin only) - stores in 'doctors' collection
export async function addDoctor(doctor) {
  // doctor = { name, specialty, status, image }
  return await addDoc(collection(db, "doctors"), {
    ...doctor,
    createdAt: serverTimestamp()
  });
}

// Delete doctor by docId (admin only)
export async function deleteDoctorById(docId){
  return await deleteDoc(doc(db, "doctors", docId));
}

// Fetch doctors list
export async function fetchDoctors(){
  const q = query(collection(db, "doctors"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
  return arr;
}

// Save appointment to Firestore
export async function saveAppointment(appointment){
  // appointment: { name, email, doctor, date, time, note, createdBy (optional) }
  return await addDoc(collection(db, "appointments"), {
    ...appointment,
    createdAt: serverTimestamp()
  });
}

// Fetch appointments
export async function fetchAppointments(){
  const snap = await getDocs(query(collection(db, "appointments"), orderBy("createdAt", "desc")));
  const arr = [];
  snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
  return arr;
}
