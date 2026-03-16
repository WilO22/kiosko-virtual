import type { Product } from '../types';
import { MOCK_PRODUCTS } from './mockData';

// Constante para definir el "lag" simulado de la base de datos (1 segundo)
const NETWORK_DELAY_MS = 1000;

export const productService = {
  /**
   * Obtiene todos los productos simulando una llamada asíncrona a un backend
   */
  async getAllProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS);
      }, NETWORK_DELAY_MS);
    });
  },

  /**
   * Obtiene productos por categoría
   */
  async getProductsByCategory(category: Product['category']): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_PRODUCTS.filter(p => p.category === category);
        resolve(filtered);
      }, NETWORK_DELAY_MS);
    });
  },

  /**
   * Simula obtener un producto específico por ID
   */
  async getProductById(id: string): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(product);
      }, NETWORK_DELAY_MS);
    });
  }
};
