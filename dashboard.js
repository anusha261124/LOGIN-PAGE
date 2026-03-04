const API_URL = 'http://localhost:5000/api';

function showError(message) {
  const errorDiv = document.getElementById('error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
  }
}

async function loadDashboard() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      window.location.href = 'login.html';
      return;
    }

    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = data.user.fullName;
    }
  } catch (error) {
    showError('Cannot connect to server. Please make sure the backend is running.');
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
  loadDashboard();

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});
