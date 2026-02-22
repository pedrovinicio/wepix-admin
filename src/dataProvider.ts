import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';
import type { DataProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, { ...options, headers });
};

const baseProvider = simpleRestProvider(`${API_URL}/admin/stats`, httpClient);

const dataProvider: DataProvider = {
  ...baseProvider,
  getList: (resource, params) => {
    return baseProvider.getList(resource, params);
  },
  getOne: (resource, params) => {
    return baseProvider.getOne(resource, params);
  },
  getMany: (resource, params) => {
    return baseProvider.getMany(resource, params);
  },
  getManyReference: (resource, params) => {
    return baseProvider.getManyReference(resource, params);
  },
  create: () => Promise.reject(new Error('Read-only admin panel')),
  update: () => Promise.reject(new Error('Read-only admin panel')),
  updateMany: () => Promise.reject(new Error('Read-only admin panel')),
  delete: () => Promise.reject(new Error('Read-only admin panel')),
  deleteMany: () => Promise.reject(new Error('Read-only admin panel')),
};

export default dataProvider;
