document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMsg = document.getElementById('error-message');

      try {
        const response = await api.auth.login({ email, password });
        auth.login(response.token, response.user);
        window.location.href = 'index.html';
      } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = 'block';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const address = document.getElementById('address').value;
      const errorMsg = document.getElementById('error-message');

      try {
        const response = await api.auth.signup({ name, email, password, address });
        auth.login(response.token, response.user);
        window.location.href = 'index.html';
      } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = 'block';
      }
    });
  }
});
