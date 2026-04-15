document.addEventListener('DOMContentLoaded', () => {
  if (!auth.requireLogin()) {
    return;
  }

  loadProfile();
  loadOrders();

  const form = document.getElementById('profile-form');
  if (form) {
    form.addEventListener('submit', updateProfile);
  }

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      auth.logout();
    });
  }
});

async function loadProfile() {
  try {
    const user = await api.users.getProfile();
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('address').value = user.address || '';
  } catch (error) {
    console.error('Error loading profile:', error);
    alert('Failed to load profile');
  }
}

async function updateProfile(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  try {
    const response = await api.users.updateProfile({ name, phone, address });
    alert('Profile updated successfully');
    loadProfile();
  } catch (error) {
    alert('Failed to update profile: ' + error.message);
  }
}

async function loadOrders() {
  try {
    const orders = await api.orders.getAll();
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    if (orders.length === 0) {
      ordersList.innerHTML = '<p>No orders yet</p>';
      return;
    }

    orders.forEach((order) => {
      const statusClass = `status-${order.status.toLowerCase().replace(' ', '-')}`;
      const orderDiv = document.createElement('div');
      orderDiv.className = 'order-item';
      orderDiv.innerHTML = `
        <div class="order-header">
          <h4>Order #${order._id.slice(-6)}</h4>
          <span class="order-status ${statusClass}">${order.status}</span>
        </div>
        <p><strong>Amount:</strong> ₹${order.total.toFixed(2)}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Delivery:</strong> ${order.address}</p>
      `;
      ordersList.appendChild(orderDiv);
    });
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}
