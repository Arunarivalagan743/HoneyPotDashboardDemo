// API Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    VERIFY: '/api/auth/verify',
    
    // Dashboard endpoints
    DASHBOARD: '/api/dashboard',
    LOGS: '/api/dashboard/logs',
    
    // Health check
    HEALTH: '/api/health'
  },
  
  // Default request options
  DEFAULT_OPTIONS: {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for cross-origin requests
  },
  
  // Timeout configuration
  TIMEOUT: 10000, // 10 seconds
};

// Helper function to build full URLs
export const buildURL = (endpoint) => `${BASE_URL}${endpoint}`;

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export default API_CONFIG;
