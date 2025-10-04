document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------
  // INDEX PAGE: Book Appointment Button
  // ---------------------------------
  const confBtn = document.getElementById("appt-cta");
  if (confBtn) {
    confBtn.addEventListener("click", (e) => {
      e.preventDefault();
      burst();
      setTimeout(() => {
        window.location.href = confBtn.href;
      }, 700);
    });
  }

  // ---------------------------------
  // APPOINTMENT PAGE: Save Appointments
  // ---------------------------------
  const apForm = document.getElementById("appointment-form");
  if (apForm) {
    apForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        id: "AP" + Date.now(),
        name: apForm.name.value,
        email: apForm.email.value,
        doctor: apForm.doctor.value,
        date: apForm.date.value,
        time: apForm.time.value,
        note: apForm.note.value
      };

      let arr = JSON.parse(localStorage.getItem("appointments") || "[]");
      arr.push(data);
      localStorage.setItem("appointments", JSON.stringify(arr));

      loadAppointments();
      apForm.reset();
      burst();
      alert("✅ Appointment confirmed!\nID: " + data.id);
    });

    loadAppointments();
  }

  function loadAppointments() {
    const list = document.getElementById("appointments-list");
    if (!list) return;

    const arr = JSON.parse(localStorage.getItem("appointments") || "[]");
    list.innerHTML = "";

    if (arr.length === 0) {
      list.innerHTML = "<p class='small'>No appointments yet.</p>";
      return;
    }

    arr.slice().reverse().forEach((a) => {
      const el = document.createElement("div");
      el.className = "card-compact";
      el.innerHTML = `
        <strong>${a.name}</strong> <span class="small">(${a.email})</span><br>
        <span class="small">Doctor: ${a.doctor} • ${a.date} ${a.time}</span>
        <p class="small">${a.note || "—"}</p>`;
      list.appendChild(el);
    });
  }

  // ---------------------------------
  // ATTENDANCE PAGE: Save Attendance
  // ---------------------------------
  const attForm = document.getElementById("attendance-form");
  if (attForm) {
    attForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        id: "AT" + Date.now(),
        name: attForm.doctor_name.value,
        status: attForm.status.value,
        time: new Date().toLocaleString()
      };

      let arr = JSON.parse(localStorage.getItem("attendance") || "[]");
      arr.push(data);
      localStorage.setItem("attendance", JSON.stringify(arr));

      loadAttendance();
      attForm.reset();
      burst();
      alert("✅ Attendance recorded for " + data.name);
    });

    loadAttendance();
  }

  function loadAttendance() {
    const list = document.getElementById("attendance-list");
    if (!list) return;

    const arr = JSON.parse(localStorage.getItem("attendance") || "[]");
    list.innerHTML = "";

    if (arr.length === 0) {
      list.innerHTML = "<p class='small'>No attendance records yet.</p>";
      return;
    }

    arr.slice().reverse().forEach((a) => {
      const el = document.createElement("div");
      el.className = "card-compact";
      el.innerHTML = `
        <strong>${a.name}</strong> 
        <span class="small"> • ${a.status} • ${a.time}</span>`;
      list.appendChild(el);
    });
  }

  // ---------------------------------
  // SHARED: Confetti Animation
  // ---------------------------------
  function burst() {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.style.position = "fixed";
      p.style.left = (50 + Math.random() * 20 - 10) + "%";
      p.style.top = (30 + Math.random() * 20) + "%";
      p.style.width = "8px";
      p.style.height = "8px";
      p.style.borderRadius = "3px";
      p.style.background = ["#06b6d4","#a78bfa","#34d399","#f472b6"][Math.floor(Math.random()*4)];
      p.style.opacity = 0.9;
      document.body.appendChild(p);

      const dx = (Math.random() * 400 - 200);
      const dy = (Math.random() * 600);

      p.animate([
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }
      ], { duration: 1000 + Math.random() * 800, easing: "ease-out" });

      setTimeout(() => p.remove(), 1800);
    }
  }
});
