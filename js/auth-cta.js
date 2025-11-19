import { onAuthChanged, getCurrentRole, getCurrentUser } from './auth.js';

// Helper: safe redirect (only same-origin)
function safeRedirect(url) {
  try {
    const u = new URL(url, location.origin);
    if (u.origin === location.origin) {
      location.href = u.href;
    } else {
      console.warn('Blocked redirect to external origin', url);
      location.href = '/'; // fallback
    }
  } catch (e) {
    console.warn('Invalid redirect', url);
    location.href = '/';
  }
}

// Build login url with next param
function loginUrlFor(nextPage, isDoctorLogin = false) {
  const loginPage = isDoctorLogin ? 'doctor_login.html' : 'patient_login.html';
  return `${loginPage}?next=${encodeURIComponent(nextPage)}`;
}

// When auth ready, set up buttons
onAuthChanged((user, role) => {
  // attach handlers now
  const ap = document.getElementById('btn-appointment');
  const docs = document.getElementById('btn-doctors');
  const att = document.getElementById('btn-attendance');

  function handleCTA(el) {
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.dataset.target;
      const requireRole = el.dataset.requireRole; // optional, e.g. "doctor"
      // If user is logged in:
      if (user) {
        // If route requires specific role:
        if (requireRole) {
          // allow admin as well
          if (role === requireRole || role === 'admin') {
            safeRedirect(target);
          } else {
            // not authorized: redirect to doctor login (or show message)
            // we send to doctor login to re-auth or use different account
            alert('Access restricted: doctor only. Please login with a doctor account.');
            safeRedirect(loginUrlFor(target, true));
          }
        } else {
          // no special role required; go
          safeRedirect(target);
        }
      } else {
        // Not logged in: redirect to relevant login with next param
        // For doctor-only pages, send to doctor_login; otherwise patient login
        const isDoctorRoute = !!requireRole;
        safeRedirect(loginUrlFor(target, isDoctorRoute));
      }
    });
  }

  handleCTA(ap);
  handleCTA(docs);
  handleCTA(att);
});
