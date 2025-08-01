import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_CONFIG, buildURL, getAuthHeaders } from '../config/api';

// Utility function to save token
const saveToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setToken: (token) => {
        set({ token });
        saveToken(token);
      },

      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(buildURL(API_CONFIG.ENDPOINTS.LOGIN), {
            method: 'POST',
            ...API_CONFIG.DEFAULT_OPTIONS,
            body: JSON.stringify(credentials),
          });

          const data = await response.json();

          if (data.success) {
            const token = data.token;
            set({
              user: data.admin,
              token: token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            // Token is already saved by setToken above, no need to duplicate
            saveToken(token);
            return { success: true, data };
          } else {
            set({
              error: data.message,
              isLoading: false
            });
            return { success: false, error: data.message };
          }
        } catch (error) {
          const errorMessage = 'Network error. Please check if the backend server is running.';
          set({
            error: errorMessage,
            isLoading: false
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
        localStorage.removeItem('token');
      },

      verifyToken: async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
          return false;
        }

        try {
          const response = await fetch(buildURL(API_CONFIG.ENDPOINTS.VERIFY), {
            method: 'POST',
            ...API_CONFIG.DEFAULT_OPTIONS,
            headers: {
              ...API_CONFIG.DEFAULT_OPTIONS.headers,
              ...getAuthHeaders(),
            },
          });

          const data = await response.json();

          if (data.success) {
            set({
              user: data.admin,
              token: token,
              isAuthenticated: true
            });
            return true;
          } else {
            get().logout();
            return false;
          }
        } catch (error) {
          get().logout();
          return false;
        }
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          set({ token });
          get().verifyToken();
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;
