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

async function handleSignup(event) {
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

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullName: name, email, password })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      showError(data.message || 'Failed to create account');
      return;
    }

    window.location.href = 'login.html';
  } catch (error) {
    showError('Cannot connect to server. Please make sure the backend is running.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
});
