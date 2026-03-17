import { useEffect, useState } from 'react';
import type { Product } from '@/shared/types';
import { productService } from '@/shared/api/productService';
import { Header } from '@/widgets/header/ui/Header';
import { Hero } from '@/widgets/hero/ui/Hero';
import { ProductGrid } from '@/widgets/product-grid/ui/ProductGrid';
import { CartDrawer } from '@/widgets/cart/ui/CartDrawer';
import { useCartStore } from '@/entities/cart/model/store';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Conexión real con Zustand
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        {error ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-red-200">
              <div className="bg-red-50 p-4 rounded-full mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Algo salió mal</h3>
              <p className="text-gray-500 max-w-md text-center mb-6">{error}</p>
              <button
                onClick={loadProducts}
                className="px-6 py-2.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </section>
        ) : (
          <ProductGrid 
            products={products} 
            isLoading={isLoading} 
            onAddToCart={handleAddToCart} 
          />
        )}
      </main>
      
      {/* Drawer Overlay Panel */}
      <CartDrawer />
      
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 Bodega El Caserito. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
