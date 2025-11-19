// js/auth-cta.js
import { onAuthChanged, getCurrentRole } from './auth.js';

function safeRedirect(url) {
  try {
    const u = new URL(url, location.origin);
    if (u.origin === location.origin) location.href = u.href;
    else location.href = '/';
  } catch (e) { location.href = '/'; }
}

function loginUrlFor(nextPage, isDoctorLogin = false) {
  const loginPage = isDoctorLogin ? 'doctor_login.html' : 'patient_login.html';
  return `${loginPage}?next=${encodeURIComponent(nextPage)}`;
}

onAuthChanged((user, role) => {
  const buttons = document.querySelectorAll('#home-ctas a[data-target]');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      const requireRole = btn.dataset.requireRole;
      if (user) {
        if (requireRole) {
          if (role === requireRole || role === 'admin') safeRedirect(target);
          else {
            alert('Access restricted — doctor account required. Please login with a doctor account.');
            safeRedirect(loginUrlFor(target, true));
          }
        } else safeRedirect(target);
      } else {
        const isDoc = !!requireRole;
        safeRedirect(loginUrlFor(target, isDoc));
      }
    });
  });
});
