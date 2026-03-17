import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/shared/types';
import { Button } from '@/shared/ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { name, description, price, category, imageUrl } = product;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-orange/30 transition-all duration-300 overflow-hidden h-full">
      {/* Imagen */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-brand-green uppercase tracking-wider shadow-sm">
          {category}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Precio y Acción */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-0.5">Precio</span>
            <span className="text-xl font-bold tracking-tight text-brand-orange">
              S/ {price.toFixed(2)}
            </span>
          </div>
          
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
            className="rounded-full h-10 w-10 p-0 sm:w-auto sm:px-5 flex items-center justify-center gap-2 group/btn hover:scale-105 transition-transform"
          >
            <ShoppingCart size={18} className="text-white group-hover/btn:animate-pulse" />
            <span className="hidden sm:inline-block font-bold">Agregar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
