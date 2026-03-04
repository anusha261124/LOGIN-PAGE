function showError(message) {
  const errorDiv = document.getElementById('error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
  }
}

function hideError() {
  const errorDiv = document.getElementById('error');
  if (errorDiv) {
    errorDiv.classList.remove('show');
  }
}

function handleSignup(event) {
  event.preventDefault();
  hideError();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
    showError('Please fill in all fields');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters');
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = 'login.html';
}

function handleLogin(event) {
  event.preventDefault();
  hideError();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }

  const userData = localStorage.getItem('user');

  if (!userData) {
    showError('No account found. Please create an account first.');
    return;
  }

  try {
    const user = JSON.parse(userData);

    if (user.email === email && user.password === password) {
      localStorage.setItem('AUTH_TOKEN', 'logged_in');
      window.location.href = 'dashboard.html';
    } else {
      showError('Invalid email or password');
    }
  } catch {
    showError('Account data corrupted. Please sign up again.');
  }
}

function checkAuth() {
  const token = localStorage.getItem('AUTH_TOKEN');

  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function loadDashboard() {
  if (!checkAuth()) return;

  const userData = localStorage.getItem('user');
  const userNameElement = document.getElementById('userName');

  if (userData && userNameElement) {
    try {
      const user = JSON.parse(userData);
      userNameElement.textContent = user.name || 'User';
    } catch {
      userNameElement.textContent = 'User';
    }
  }
}

function handleLogout() {
  localStorage.removeItem('AUTH_TOKEN');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  if (document.getElementById('userName')) {
    loadDashboard();
  }
});
