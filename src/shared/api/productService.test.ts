import { describe, it, expect } from 'vitest';
import { productService } from './productService';
import { MOCK_PRODUCTS } from './mockData';

describe('productService (Mock API)', () => {
  it('Debería retornar todos los productos luego del delay', async () => {
    const products = await productService.getAllProducts();
    expect(products).toBeDefined();
    expect(products.length).toBe(MOCK_PRODUCTS.length);
    expect(products[0].name).toBe('Inca Kola 1.5L');
  });

  it('Debería filtrar productos por categoría', async () => {
    const abarrotes = await productService.getProductsByCategory('abarrotes');
    expect(abarrotes.length).toBeGreaterThan(0);
    expect(abarrotes.every(p => p.category === 'abarrotes')).toBe(true);
  });

  it('Debería encontrar un producto específico por ID', async () => {
    const product = await productService.getProductById('p-002');
    expect(product).toBeDefined();
    expect(product?.name).toBe('Arroz Costeño Extra 1kg');
  });

  it('Debería retornar undefined si el ID no existe', async () => {
    const product = await productService.getProductById('id-falso-123');
    expect(product).toBeUndefined();
  });
});
