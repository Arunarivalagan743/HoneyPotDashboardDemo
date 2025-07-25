import axios from 'axios';
import useAuthStore from '../store/authStore';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://honepotdemobackend.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout user
      const { logout } = useAuthStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.post('/auth/verify'),
};

export const dashboardAPI = {
  getDashboardData: () => api.get('/dashboard'),
  getLogs: (params) => api.get('/dashboard/logs', { params }),
};

export default api;
