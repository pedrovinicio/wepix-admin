import type { AuthProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await fetch(`${API_URL}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const { data } = await response.json();
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_user', JSON.stringify(data.admin));
  },

  logout: async () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  checkAuth: async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Not authenticated');
    }
  },

  checkError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      throw new Error('Session expired');
    }
  },

  getIdentity: async () => {
    const user = localStorage.getItem('admin_user');
    if (!user) {
      throw new Error('Not authenticated');
    }
    const parsed = JSON.parse(user);
    return {
      id: parsed.id,
      fullName: parsed.name,
    };
  },

  getPermissions: async () => {
    return 'admin';
  },
};

export default authProvider;
