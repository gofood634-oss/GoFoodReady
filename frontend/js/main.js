document.addEventListener('DOMContentLoaded', () => {
  loadRestaurants();
  updateCartCount();
});

async function loadRestaurants() {
  try {
    const restaurants = await api.restaurants.getAll();
    const grid = document.getElementById('restaurants-grid');
    grid.innerHTML = '';

    restaurants.forEach((restaurant) => {
      const card = document.createElement('div');
      card.className = 'restaurant-card';
      card.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>${restaurant.address}</p>
        <p>${restaurant.description || 'Delicious food awaits'}</p>
        <button class="btn btn-primary" onclick="viewMenu('${restaurant._id}')">View Menu</button>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading restaurants:', error);
    alert('Failed to load restaurants');
  }
}

function viewMenu(restaurantId) {
  window.location.href = `menu.html?restId=${restaurantId}`;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
