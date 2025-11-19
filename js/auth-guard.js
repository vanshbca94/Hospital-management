// js/auth-guard.js
import { onAuthChanged } from './auth.js';

(function(){
  const requireRole = document.body.datasetRequireRole || null; // optional attribute on body
  onAuthChanged((user, role) => {
    if (!user) {
      // redirect to appropriate login page with ?next=
      const next = location.pathname.split('/').pop() + location.search;
      window.location.href = `patient_login.html?next=${encodeURIComponent(next)}`;
      return;
    }
    // If page requested a specific role, check it
    const bodyRole = document.body.getAttribute('data-require-role');
    if (bodyRole && role !== bodyRole && role !== 'admin') {
      // not authorized
      alert('Unauthorized: you do not have permission to view this page.');
      window.location.href = 'index.html';
    }
  });
})();
