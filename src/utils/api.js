import useAuthStore from '../store/authStore';
import { API_CONFIG, buildURL, getAuthHeaders } from '../config/api';

// Create an API client with automatic token handling
class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  async request(endpoint, options = {}) {
    const url = buildURL(endpoint);
    
    const config = {
      ...API_CONFIG.DEFAULT_OPTIONS,
      headers: {
        ...API_CONFIG.DEFAULT_OPTIONS.headers,
        ...getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      // Add timeout to the request
      const timeoutId = setTimeout(() => {
        throw new Error('Request timeout');
      }, this.timeout);

      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
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
const api = new ApiClient();

// API endpoints
export const dashboardAPI = {
  // Get dashboard data
  getDashboardData: () => api.get(API_CONFIG.ENDPOINTS.DASHBOARD),
  
  // Get logs with pagination
  getLogs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`${API_CONFIG.ENDPOINTS.LOGS}${queryString ? `?${queryString}` : ''}`);
  },
  
  // Health check
  healthCheck: () => api.get(API_CONFIG.ENDPOINTS.HEALTH),
};

export const authAPI = {
  // Login
  login: (credentials) => api.post(API_CONFIG.ENDPOINTS.LOGIN, credentials),
  
  // Verify token
  verifyToken: () => api.post(API_CONFIG.ENDPOINTS.VERIFY),
};

export default api;
