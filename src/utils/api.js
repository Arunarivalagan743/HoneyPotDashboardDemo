import useAuthStore from '../store/authStore';

const API_BASE_URL = 'http://localhost:5001/api';

// Create an API client with automatic token handling
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle unauthorized responses
      if (response.status === 401) {
        useAuthStore.getState().logout();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET request
  get(endpoint) {
    return this.request(endpoint);
  }

  // POST request
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create API client instance
const api = new ApiClient(API_BASE_URL);

// API endpoints
export const dashboardAPI = {
  // Get dashboard data
  getDashboardData: () => api.get('/dashboard'),
  
  // Get logs with pagination
  getLogs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/dashboard/logs${queryString ? `?${queryString}` : ''}`);
  },
  
  // Health check
  healthCheck: () => api.get('/health'),
};

export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Verify token
  verifyToken: () => api.post('/auth/verify'),
};

export default api;
