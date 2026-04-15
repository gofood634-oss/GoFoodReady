const auth = {
  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  login(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.updateUI();
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.updateUI();
    window.location.href = 'index.html';
  },

  updateUI() {
    const authLinks = document.getElementById('auth-links');
    const userLinks = document.getElementById('user-links');
    const logoutLink = document.getElementById('logout-link');

    if (this.isLoggedIn()) {
      if (authLinks) authLinks.style.display = 'none';
      if (userLinks) userLinks.style.display = 'flex';
      if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.logout();
        });
      }
    } else {
      if (authLinks) authLinks.style.display = 'flex';
      if (userLinks) userLinks.style.display = 'none';
    }
  },

  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  auth.updateUI();
});
