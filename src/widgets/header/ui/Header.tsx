import { ShoppingCart, Store } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Branding */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-brand-orange p-2 rounded-lg text-white">
              <Store size={24} />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900">
              Bodega <span className="text-brand-orange">El Caserito</span>
            </span>
          </div>

          {/* Acciones (Carrito Temporal) */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-brand-orange transition-colors duration-200">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
