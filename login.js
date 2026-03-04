const API_URL = 'http://localhost:5000/api';

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

async function handleLogin(event) {
  event.preventDefault();
  hideError();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      showError(data.message || 'Invalid credentials');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.user.fullName);
    window.location.href = 'dashboard.html';
  } catch (error) {
    showError('Cannot connect to server. Please make sure the backend is running.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});
