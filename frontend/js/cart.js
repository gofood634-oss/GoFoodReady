document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartCount();
});

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price.toFixed(2)} each</p>
      </div>
      <div class="quantity-control">
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </div>
      <div style="text-align: right;">
        <p>₹${(item.price * item.quantity).toFixed(2)}</p>
        <button class="btn btn-secondary btn-small" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(cartItem);
  });

  updateCartSummary();
}

function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cart.length > 0 ? 50 : 0;
  const total = subtotal + delivery;

  document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('delivery').textContent = `₹${delivery.toFixed(2)}`;
  document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  if (!auth.requireLogin()) {
    return;
  }

  window.location.href = 'checkout.html';
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
