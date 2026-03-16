import { useEffect, useState } from 'react';
import { Product } from './shared/types';
import { productService } from './shared/api/productService';

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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-heading text-brand-orange text-center mt-10 mb-8">
          Bodega El Caserito
        </h1>

        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">Cargando inventario de la bodega...</div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-xl font-heading mb-4">Productos en sistema (Fake API):</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="p-4 bg-white shadow rounded-xl border border-gray-100 flex flex-col items-center">
                  <span className="text-sm text-brand-green font-bold mb-2 uppercase">{product.category}</span>
                  <span className="font-semibold">{product.name}</span>
                  <span className="text-gray-500">S/ {product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

