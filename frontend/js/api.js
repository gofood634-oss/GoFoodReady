const API_BASE_URL = 'https://gofoodready.onrender.com';

const api = {
  getToken() {
    return localStorage.getItem('token');
  },

  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  auth: {
    signup(payload) {
      return api.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    login(payload) {
      return api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  },

  users: {
    getProfile() {
      return api.request('/users/profile');
    },

    updateProfile(payload) {
      return api.request('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },

    getAll() {
      return api.request('/users');
    },
  },

  restaurants: {
    getAll() {
      return api.request('/restaurants');
    },

    get(id) {
      return api.request(`/restaurants/${id}`);
    },

    create(payload) {
      return api.request('/restaurants', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    update(id, payload) {
      return api.request(`/restaurants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },

    delete(id) {
      return api.request(`/restaurants/${id}`, {
        method: 'DELETE',
      });
    },
  },

  items: {
    getAll() {
      return api.request('/items');
    },

    getByRestaurant(restaurantId) {
      return api.request(`/items/restaurant/${restaurantId}`);
    },

    get(id) {
      return api.request(`/items/${id}`);
    },

    create(payload) {
      return api.request('/items', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    update(id, payload) {
      return api.request(`/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },

    delete(id) {
      return api.request(`/items/${id}`, {
        method: 'DELETE',
      });
    },
  },

  orders: {
    create(payload) {
      return api.request('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    getAll() {
      return api.request('/orders');
    },

    getAdminAll() {
      return api.request('/orders/admin/all');
    },

    get(id) {
      return api.request(`/orders/${id}`);
    },

    updateStatus(id, status) {
      return api.request(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    },

    cancel(id) {
      return api.request(`/orders/${id}/cancel`, {
        method: 'PUT',
      });
    },
  },

  wishlist: {
    getAll() {
      return api.request('/wishlist');
    },

    add(itemId) {
      return api.request('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ itemId }),
      });
    },

    remove(id) {
      return api.request(`/wishlist/${id}`, {
        method: 'DELETE',
      });
    },
  },
};
