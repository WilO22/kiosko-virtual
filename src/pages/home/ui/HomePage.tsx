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

  useEffect(() => {
    async function loadInitialData() {
      // Retrasamos unos milisegundos extra visualmente para apreciar el UI Skeletons 
      // (productService ya tiene un delay de 1s para emular base de datos).
      const data = await productService.getAllProducts();
      setProducts(data);
      setIsLoading(false);
    }
    loadInitialData();
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
        
        <ProductGrid 
          products={products} 
          isLoading={isLoading} 
          onAddToCart={handleAddToCart} 
        />
      </main>
      
      {/* Drawer Overlay Panel */}
      <CartDrawer />
      
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 Bodega El Caserito. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
