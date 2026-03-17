import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, PackageCheck, PackageX } from 'lucide-react';
import type { Product } from '@/shared/types';
import { productService } from '@/shared/api/productService';
import { useCartStore } from '@/entities/cart/model/store';
import { Button } from '@/shared/ui/Button';
import { Header } from '@/widgets/header/ui/Header';
import { CartDrawer } from '@/widgets/cart/ui/CartDrawer';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      const data = await productService.getProductById(id);
      setProduct(data ?? null);
      setIsLoading(false);
    }
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Skeleton de carga
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/50">
        <Header />
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-3xl"></div>
              <div className="space-y-6">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-12 bg-gray-200 rounded w-40 mt-8"></div>
              </div>
            </div>
          </div>
        </main>
        <CartDrawer />
      </div>
    );
  }

  // Producto no encontrado
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/50">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <PackageX size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-500 mb-8">El producto que buscas no existe o fue removido del catálogo.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Button>
        </main>
        <CartDrawer />
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-orange mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Imagen */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-brand-green uppercase tracking-wider shadow-sm">
              {product.category}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green mb-3">
              {inStock ? (
                <>
                  <PackageCheck size={16} />
                  En stock ({product.stock} disponibles)
                </>
              ) : (
                <span className="text-red-500 flex items-center gap-2">
                  <PackageX size={16} />
                  Agotado
                </span>
              )}
            </span>

            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-end gap-2 mb-8">
              <span className="text-xs text-gray-400 font-medium mb-1">Precio unitario</span>
              <span className="text-4xl font-extrabold text-brand-orange tracking-tight">
                S/ {product.price.toFixed(2)}
              </span>
            </div>

            {/* Selector de Cantidad */}
            {inStock && (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Cantidad:</span>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-bold w-8 text-center text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">
                    Subtotal: <span className="font-bold text-gray-700">S/ {(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className={`w-full sm:w-auto transition-all ${added ? 'bg-brand-green hover:bg-brand-green' : ''}`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {added ? '✓ Agregado al carrito' : `Agregar ${quantity > 1 ? `(${quantity})` : ''} al carrito`}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <CartDrawer />

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 Bodega El Caserito. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
