import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_URL}/api/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = response.data;

        localStorage.setItem('access_token', access_token);
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken);
        }

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    created_at?: string;
    updated_at?: string;
  };
  tokens?: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authAPI = {
  register: (data: RegisterData): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/api/auth/register', data),

  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/api/auth/login', credentials),

  logout: (refreshToken: string): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
    api.post('/api/auth/logout', { refresh_token: refreshToken }),

  getCurrentUser: (): Promise<AxiosResponse<{ user: AuthResponse['user'] }>> =>
    api.get('/api/auth/me'),

  refreshToken: (refreshToken: string): Promise<AxiosResponse<AuthResponse['tokens']>> =>
    api.post('/api/auth/refresh', { refresh_token: refreshToken }),
};

export default api;