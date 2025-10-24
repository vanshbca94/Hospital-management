// js/appointments-firestore.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const apForm = document.getElementById("appointment-form");
  const list = document.getElementById("appointments-list");

  if (!apForm || !list) return;

  // 🩺 Add Appointment to Firestore
  apForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: apForm.name.value,
      email: apForm.email.value,
      doctor: apForm.doctor.value,
      date: apForm.date.value,
      time: apForm.time.value,
      note: apForm.note.value,
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, "appointments"), data);
      alert("✅ Appointment saved successfully!");
      apForm.reset();
      loadAppointments();
    } catch (err) {
      console.error("Error adding appointment: ", err);
      alert("⚠️ Error saving appointment");
    }
  });

  // 🩺 Load Appointments from Firestore
  async function loadAppointments() {
    list.innerHTML = "<p>Loading appointments...</p>";
    const querySnapshot = await getDocs(collection(db, "appointments"));
    list.innerHTML = "";
    querySnapshot.forEach((docSnap) => {
      const a = docSnap.data();
      const el = document.createElement("div");
      el.className = "card-compact";
      el.innerHTML = `
        <strong>${a.name}</strong> (${a.email})<br>
        Doctor: ${a.doctor} • ${a.date} ${a.time}<br>
        <p>${a.note || "—"}</p>
      `;
      list.appendChild(el);
    });
  }

  loadAppointments();
});
