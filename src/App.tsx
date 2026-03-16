import { useEffect, useState } from 'react';
import type { Product } from './shared/types';
import { productService } from './shared/api/productService';
import { Header } from './widgets/header/ui/Header';
import { Hero } from './widgets/hero/ui/Hero';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      const data = await productService.getAllProducts();
      setProducts(data);
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Placeholder para el Ticket BC-7 (Grid de Productos) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900">Nuestros Productos</h2>
            <span className="text-brand-green font-medium">Buscando en catálogo...</span>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-500 animate-pulse py-12">Cargando inventario de la bodega...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-60">
              {/* Mostramos esto temporalmente solo para que el PO vea que la data sigue viva */}
              {products.map((product) => (
                <div key={product.id} className="p-4 bg-white shadow-sm rounded-xl border border-gray-100 flex flex-col items-center">
                  <span className="text-xs text-brand-green font-bold mb-2 uppercase">{product.category}</span>
                  <span className="font-semibold text-center">{product.name}</span>
                  <span className="text-gray-500 mt-2">S/ {product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 Bodega El Caserito. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}


