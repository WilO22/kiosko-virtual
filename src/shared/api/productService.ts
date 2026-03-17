import type { Product } from '../types';
import { MOCK_PRODUCTS } from './mockData';
import { config, isApiMode } from '../config';

/**
 * Servicio de productos.
 * - Si `VITE_API_URL` tiene valor → usa fetch() contra la API real.
 * - Si está vacío → usa MOCK_PRODUCTS (datos locales).
 */
export const productService = {
  async getAllProducts(): Promise<Product[]> {
    if (isApiMode()) {
      const res = await fetch(`${config.apiUrl}/products`);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      return res.json();
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), config.mockNetworkDelayMs);
    });
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (isApiMode()) {
      const res = await fetch(`${config.apiUrl}/products?category=${encodeURIComponent(category)}`);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      return res.json();
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_PRODUCTS.filter(p => p.category === category);
        resolve(filtered);
      }, config.mockNetworkDelayMs);
    });
  },

  async getProductById(id: string): Promise<Product | undefined> {
    if (isApiMode()) {
      const res = await fetch(`${config.apiUrl}/products/${id}`);
      if (res.status === 404) return undefined;
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      return res.json();
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(product);
      }, config.mockNetworkDelayMs);
    });
  }
};
