document.addEventListener('DOMContentLoaded', () => {
  if (!auth.requireLogin()) {
    return;
  }

  loadOrderSummary();
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', placeOrder);
  }
});

function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const orderItemsDiv = document.getElementById('order-items');
  orderItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'order-item';
    itemDiv.innerHTML = `
      <h5>${item.name}</h5>
      <p>Qty: ${item.quantity} × ₹${item.price.toFixed(2)} = ₹${itemTotal.toFixed(2)}</p>
    `;
    orderItemsDiv.appendChild(itemDiv);
  });

  const delivery = 50;
  const grandTotal = total + delivery;

  document.getElementById('total-amount').textContent = `₹${grandTotal.toFixed(2)}`;
}

async function placeOrder(e) {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  const address = document.getElementById('address').value;
  const paymentMethod = document.getElementById('payment-method').value;

  const items = cart.map(item => ({
    itemId: item.itemId,
    quantity: item.quantity,
    price: item.price,
  }));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 50;
  const total = subtotal + delivery;

  try {
    const response = await api.orders.create({
      items,
      total,
      address,
      paymentMethod,
    });

    localStorage.removeItem('cart');
    window.location.href = 'order-success.html?orderId=' + response.order._id;
  } catch (error) {
    alert('Failed to place order: ' + error.message);
  }
}
