// auth.js
const authBtn = document.getElementById("authBtn");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");

let isLogin = true;

// Toggle between Login/Register
toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Login";
    authBtn.textContent = "Login";
    toggleForm.textContent = "Don't have an account? Register";
  } else {
    formTitle.textContent = "Register";
    authBtn.textContent = "Register";
    toggleForm.textContent = "Already have an account? Login";
  }
});

// Handle Login/Register
authBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    // Login
    if (users[username] && users[username] === password) {
      localStorage.setItem("loggedInUser", username);
      alert("Login successful! Redirecting...");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials. Try again!");
    }
  } else {
    // Register
    if (users[username]) {
      alert("Username already exists!");
    } else {
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please login now.");
      isLogin = true;
      formTitle.textContent = "Login";
      authBtn.textContent = "Login";
      toggleForm.textContent = "Don't have an account? Register";
    }
  }
});
