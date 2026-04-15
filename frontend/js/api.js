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
      return api.request('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    login(payload) {
      return api.request('/api/auth/login', {
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
      return api.request('/api/users');
    },
  },

  restaurants: {
    getAll() {
      return api.request('/api/restaurants');
    },

    get(id) {
      return api.request(`/api/restaurants/${id}`);
    },

    create(payload) {
      return api.request('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    update(id, payload) {
      return api.request(`/api/restaurants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },

    delete(id) {
      return api.request(`/api/restaurants/${id}`, {
        method: 'DELETE',
      });
    },
  },

  items: {
    getAll() {
      return api.request('/api/items');
    },

    getByRestaurant(restaurantId) {
      return api.request(`/api/items/restaurant/${restaurantId}`);
    },

    get(id) {
      return api.request(`/api/items/${id}`);
    },

    create(payload) {
      return api.request('/api/items', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    update(id, payload) {
      return api.request(`/api/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },

    delete(id) {
      return api.request(`/api/items/${id}`, {
        method: 'DELETE',
      });
    },
  },

  orders: {
    create(payload) {
      return api.request('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    getAll() {
      return api.request('/api/orders');
    },

    getAdminAll() {
      return api.request('/api/orders/admin/all');
    },

    get(id) {
      return api.request(`/api/orders/${id}`);
    },

    updateStatus(id, status) {
      return api.request(`/api/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    },

    cancel(id) {
      return api.request(`/api/orders/${id}/cancel`, {
        method: 'PUT',
      });
    },
  },

  wishlist: {
    getAll() {
      return api.request('/api/wishlist');
    },

    add(itemId) {
      return api.request('/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({ itemId }),
      });
    },

    remove(id) {
      return api.request(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });
    },
  },
};
