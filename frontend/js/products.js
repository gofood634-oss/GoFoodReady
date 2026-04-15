let currentRestaurant = null;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const restaurantId = params.get('restId');
  
  if (restaurantId) {
    loadRestaurant(restaurantId);
    loadItems(restaurantId);
  }
  updateCartCount();
});

async function loadRestaurant(restaurantId) {
  try {
    const restaurant = await api.restaurants.get(restaurantId);
    currentRestaurant = restaurant;
    document.getElementById('restaurant-name').textContent = restaurant.name;
    document.getElementById('restaurant-address').textContent = restaurant.address;
  } catch (error) {
    console.error('Error loading restaurant:', error);
  }
}

async function loadItems(restaurantId) {
  try {
    const items = await api.items.getByRestaurant(restaurantId);
    const grid = document.getElementById('items-grid');
    grid.innerHTML = '';

    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-image">
          ${item.image ? `<img src="${item.image}" alt="${item.name}">` : 'No Image'}
        </div>
        <div class="item-info">
          <h4>${item.name}</h4>
          <p class="item-description">${item.description || ''}</p>
          <div class="item-price">₹${item.price.toFixed(2)}</div>
          <button class="btn btn-primary btn-small" onclick="addToCart('${item._id}', '${item.name}', ${item.price})">Add to Cart</button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading items:', error);
    alert('Failed to load items');
  }
}

function addToCart(itemId, itemName, price) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.itemId === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      itemId,
      name: itemName,
      price,
      quantity: 1,
      restaurantId: currentRestaurant._id,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Item added to cart!');
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
