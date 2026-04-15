document.addEventListener('DOMContentLoaded', () => {
  initializePage();
  setupEventListeners();
  loadRestaurants();
  updateAuthUI();
  updateCartCount();
});

function initializePage() {
  setupSmoothScroll();
  setupMobileMenu();
  setupNavbarScrollEffect();
}

function setupEventListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => handleFilterClick(btn));
  });

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeNavMenu();
    });
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
}

function closeNavMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
}

function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
  });
}

async function loadRestaurants() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    if (response.ok) {
      const restaurants = await response.json();
      displayRestaurants(restaurants);
    }
  } catch (error) {
    console.log('Unable to load restaurants from API, using demo data');
    displayDemoRestaurants();
  }
}

function displayRestaurants(restaurants) {
  const grid = document.getElementById('restaurants-grid');
  if (!grid) return;

  grid.innerHTML = restaurants.map(restaurant => createRestaurantCard(restaurant)).join('');
  setupRestaurantCardListeners();
}

function displayDemoRestaurants() {
  const demoRestaurants = [
    {
      id: 1,
      name: 'The Pizza House',
      cuisine: 'Italian Pizza',
      rating: 4.5,
      deliveryTime: '30-45 mins',
      priceRange: '$$$',
      image: 'https://via.placeholder.com/280x200/ff6b35/ffffff?text=The+Pizza+House'
    },
    {
      id: 2,
      name: 'Burger Bliss',
      cuisine: 'Fast Food Burgers',
      rating: 4.3,
      deliveryTime: '20-30 mins',
      priceRange: '$$',
      image: 'https://via.placeholder.com/280x200/ff8c42/ffffff?text=Burger+Bliss'
    },
    {
      id: 3,
      name: 'Spice Curry House',
      cuisine: 'Indian Cuisine',
      rating: 4.6,
      deliveryTime: '35-50 mins',
      priceRange: '$$',
      image: 'https://via.placeholder.com/280x200/1ba098/ffffff?text=Spice+Curry'
    },
    {
      id: 4,
      name: 'Noodle Dragon',
      cuisine: 'Chinese Asian',
      rating: 4.4,
      deliveryTime: '25-40 mins',
      priceRange: '$$',
      image: 'https://via.placeholder.com/280x200/004e89/ffffff?text=Noodle+Dragon'
    },
    {
      id: 5,
      name: 'Sushi Masters',
      cuisine: 'Japanese Sushi',
      rating: 4.7,
      deliveryTime: '45-60 mins',
      priceRange: '$$$',
      image: 'https://via.placeholder.com/280x200/ffb347/ffffff?text=Sushi+Masters'
    },
    {
      id: 6,
      name: 'Taco Fiesta',
      cuisine: 'Mexican Street Food',
      rating: 4.2,
      deliveryTime: '20-35 mins',
      priceRange: '$$',
      image: 'https://via.placeholder.com/280x200/ff6b35/ffffff?text=Taco+Fiesta'
    }
  ];

  displayRestaurants(demoRestaurants);
}

function createRestaurantCard(restaurant) {
  const restaurant_id = restaurant._id || restaurant.id;
  const restaurant_name = restaurant.name || 'Restaurant';
  const cuisine = restaurant.cuisine || 'Various';
  const rating = restaurant.rating || 4.5;
  const deliveryTime = restaurant.deliveryTime || '30 mins';
  const priceRange = restaurant.priceRange || '$$';
  const image = restaurant.image || 'https://via.placeholder.com/280x200/ff6b35/ffffff?text=' + encodeURIComponent(restaurant_name);

  return `
    <div class="restaurant-card" data-id="${restaurant_id}">
      <div class="restaurant-image">
        <img src="${image}" alt="${restaurant_name}">
        <div class="restaurant-badge">
          <i class="fas fa-star"></i> ${rating.toFixed(1)}
        </div>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-header">
          <div class="restaurant-name">${restaurant_name}</div>
          <div class="restaurant-cuisine">${cuisine}</div>
        </div>
        <div class="restaurant-meta">
          <span class="restaurant-time">
            <i class="fas fa-clock"></i> ${deliveryTime}
          </span>
          <span class="price-range">${priceRange}</span>
        </div>
        <button class="order-btn" data-restaurant="${restaurant_id}">
          <i class="fas fa-arrow-right"></i> Order Now
        </button>
      </div>
    </div>
  `;
}

function setupRestaurantCardListeners() {
  const orderBtns = document.querySelectorAll('.order-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const restaurantId = btn.getAttribute('data-restaurant');
      window.location.href = `menu.html?restaurant=${restaurantId}`;
    });
  });

  const restaurantCards = document.querySelectorAll('.restaurant-card');
  restaurantCards.forEach(card => {
    card.addEventListener('click', () => {
      const restaurantId = card.getAttribute('data-id');
      window.location.href = `menu.html?restaurant=${restaurantId}`;
    });
  });
}

function handleFilterClick(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.getAttribute('data-filter');
  
  if (filter === 'all') {
    loadRestaurants();
  } else {
    const allCards = document.querySelectorAll('.restaurant-card');
    allCards.forEach(card => {
      const cuisine = card.querySelector('.restaurant-cuisine').textContent.toLowerCase();
      if (cuisine.includes(filter)) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

function handleSearch() {
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value.trim();

  if (location) {
    alert(`Searching for restaurants in ${location}`);
  } else {
    alert('Please enter a city or area');
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;

  if (email) {
    alert(`Thank you for subscribing with ${email}! Check your inbox for special offers.`);
    e.target.reset();
  }
}

function updateAuthUI() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const authLinks = document.getElementById('auth-links');
  const userLinks = document.getElementById('user-links');

  if (token && user) {
    const userData = JSON.parse(user);
    if (authLinks) authLinks.style.display = 'none';
    if (userLinks) {
      userLinks.style.display = 'flex';
      const userName = document.getElementById('user-name');
      if (userName) {
        userName.textContent = userData.name || userData.email || 'Profile';
      }
    }

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }
  } else {
    if (authLinks) authLinks.style.display = 'flex';
    if (userLinks) userLinks.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index_modern.html';
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

window.addEventListener('storage', () => {
  updateCartCount();
  updateAuthUI();
});

function initializePage() {
  setupSmoothScroll();
  setupMobileMenu();
  setupNavbarScrollEffect();
}
