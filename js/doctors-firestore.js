// js/doctors-firestore.js
import { db } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.22.0/firebase-firestore.js";

// DOM
const doctorGrid = document.getElementById("doctorGrid");
const registerBtn = document.getElementById("registerBtn"); // optional link

const doctorsCol = collection(db, "doctors");

// OPTIONAL: real-time updates (recommended)
const q = query(doctorsCol, orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  const docs = [];
  snapshot.forEach(d => docs.push({ id: d.id, ...d.data() }));
  renderDoctors(docs);
});

// Render function
function renderDoctors(doctors) {
  doctorGrid.innerHTML = "";
  if (!doctors || doctors.length === 0) {
    doctorGrid.innerHTML = `<p style="text-align:center;color:#9ca3af;">No doctors registered yet.</p>`;
    return;
  }
  doctors.forEach(d => {
    const card = document.createElement("div");
    card.className = "doctor-card";
    card.innerHTML = `
      <div class="doctor-header">
        <img src="${d.image || 'assets/images/default-doc.png'}" alt="${d.name}">
        <div>
          <h3>${d.name}</h3>
          <p>${d.specialty || ''}</p>
        </div>
      </div>
      <p class="status ${d.status}">${d.status === 'available' ? '✔ Available' : '✖ Busy'}</p>
      <div style="display:flex;gap:10px;margin-top:10px;">
        <a href="appointment.html?doctor=${encodeURIComponent(d.name)}" class="btn">Book Appointment</a>
        <button class="btn ghost" data-id="${d.id}" onclick="deleteDoctor('${d.id}')">🗑 Remove</button>
      </div>
    `;
    doctorGrid.appendChild(card);
  });
}

// Export delete for global use (called from inline handler)
window.deleteDoctor = async function (id) {
  if (!confirm("Are you sure?")) return;
  try {
    await deleteDoc(doc(db, "doctors", id));
    alert("Doctor removed");
  } catch (err) {
    console.error(err);
    alert("Remove failed");
  }
};

// Optional: function to add doctor (you can call this from doctor_register.html)
export async function addDoctor(data) {
  // data: { name, email, specialty, status, image }
  await addDoc(doctorsCol, {
    ...data,
    createdAt: new Date()
  });
}
