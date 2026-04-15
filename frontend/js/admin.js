document.addEventListener('DOMContentLoaded', () => {
  const user = auth.getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = 'login.html';
    return;
  }

  loadRestaurants();
  loadItems();
  loadOrders();
  loadUsers();

  document.getElementById('restaurant-form').addEventListener('submit', addRestaurant);
  document.getElementById('item-form').addEventListener('submit', addItem);
  document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    auth.logout();
  });
});

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
  
  document.getElementById(sectionId).classList.add('active');
  event.target.classList.add('active');
}

async function loadRestaurants() {
  try {
    const restaurants = await api.restaurants.getAll();
    const restSelect = document.getElementById('item-rest');
    const listDiv = document.getElementById('restaurants-list');
    
    restSelect.innerHTML = '<option value="">Select Restaurant</option>';
    listDiv.innerHTML = '';

    restaurants.forEach(rest => {
      const option = document.createElement('option');
      option.value = rest._id;
      option.textContent = rest.name;
      restSelect.appendChild(option);

      const row = document.createElement('div');
      row.style.padding = '15px';
      row.style.border = '1px solid #ddd';
      row.style.borderRadius = '5px';
      row.style.marginBottom = '10px';
      row.innerHTML = `
        <h4>${rest.name}</h4>
        <p>${rest.address}</p>
        <div class="action-buttons">
          <button class="btn btn-secondary btn-small" onclick="editRestaurant('${rest._id}')">Edit</button>
          <button class="btn btn-small" style="background: #dc3545; color: white;" onclick="deleteRestaurant('${rest._id}')">Delete</button>
        </div>
      `;
      listDiv.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading restaurants:', error);
  }
}

async function loadItems() {
  try {
    const items = await api.items.getAll();
    const listDiv = document.getElementById('items-list');
    listDiv.innerHTML = '';

    items.forEach(item => {
      const row = document.createElement('div');
      row.style.padding = '15px';
      row.style.border = '1px solid #ddd';
      row.style.borderRadius = '5px';
      row.style.marginBottom = '10px';
      row.innerHTML = `
        <h4>${item.name}</h4>
        <p>₹${item.price.toFixed(2)} - ${item.category}</p>
        <p>${item.description}</p>
        <div class="action-buttons">
          <button class="btn btn-secondary btn-small" onclick="editItem('${item._id}')">Edit</button>
          <button class="btn btn-small" style="background: #dc3545; color: white;" onclick="deleteItem('${item._id}')">Delete</button>
        </div>
      `;
      listDiv.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading items:', error);
  }
}

async function loadOrders() {
  try {
    const orders = await api.orders.getAdminAll();
    const listDiv = document.getElementById('orders-list');
    listDiv.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="orders-body">
      </tbody>
    `;
    listDiv.appendChild(table);

    const tbody = document.getElementById('orders-body');
    orders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order._id.slice(-6)}</td>
        <td>${order.userId.name}</td>
        <td>₹${order.total.toFixed(2)}</td>
        <td>
          <select onchange="updateOrderStatus('${order._id}', this.value)">
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
            <option value="On The Way" ${order.status === 'On The Way' ? 'selected' : ''}>On The Way</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>${new Date(order.createdAt).toLocaleDateString()}</td>
        <td><button class="btn btn-secondary btn-small" onclick="viewOrder('${order._id}')">View</button></td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}

async function loadUsers() {
  try {
    const users = await api.users.getAll();
    const listDiv = document.getElementById('users-list');
    listDiv.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;
    listDiv.appendChild(table);

    const tbody = table.querySelector('tbody');
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone || '-'}</td>
        <td>${user.role}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function addRestaurant(e) {
  e.preventDefault();
  const payload = {
    name: document.getElementById('rest-name').value,
    address: document.getElementById('rest-address').value,
    phone: document.getElementById('rest-phone').value,
    description: document.getElementById('rest-desc').value,
  };

  try {
    await api.restaurants.create(payload);
    alert('Restaurant added successfully');
    e.target.reset();
    loadRestaurants();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function addItem(e) {
  e.preventDefault();
  const payload = {
    restaurantId: document.getElementById('item-rest').value,
    name: document.getElementById('item-name').value,
    description: document.getElementById('item-desc').value,
    price: parseFloat(document.getElementById('item-price').value),
    category: document.getElementById('item-category').value,
  };

  try {
    await api.items.create(payload);
    alert('Item added successfully');
    e.target.reset();
    loadItems();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function deleteRestaurant(id) {
  if (confirm('Are you sure?')) {
    try {
      await api.restaurants.delete(id);
      loadRestaurants();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
}

async function deleteItem(id) {
  if (confirm('Are you sure?')) {
    try {
      await api.items.delete(id);
      loadItems();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    await api.orders.updateStatus(orderId, status);
    alert('Order status updated');
    loadOrders();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

function editRestaurant(id) {
  alert('Edit functionality can be implemented');
}

function editItem(id) {
  alert('Edit functionality can be implemented');
}

function viewOrder(id) {
  alert('Order details: ' + id);
}
