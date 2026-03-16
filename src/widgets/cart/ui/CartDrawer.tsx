import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/entities/cart/model/store';
import { Button } from '@/shared/ui/Button';

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    totalPrice, 
    removeItem, 
    updateQuantity,
    clearCart
  } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Oscuro */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-left">
        {/* Header Drawer */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-brand-orange" />
            <h2 className="text-xl font-heading font-bold text-gray-900">Tu Pedido</h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Drawer */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <p>Tu carrito está vacío.</p>
              <p className="text-sm mt-2">¡Agrega algunos productos deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-xl border border-gray-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">{item.name}</h4>
                      <p className="text-brand-orange font-bold mt-1">S/ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded-md text-gray-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded-md text-gray-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Drawer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total Estimado</span>
              <span className="text-2xl font-bold text-gray-900">S/ {totalPrice.toFixed(2)}</span>
            </div>
            
            <Button fullWidth size="lg">
              Continuar al Checkout
            </Button>
            
            <button 
              onClick={clearCart}
              className="w-full mt-4 text-sm text-gray-500 hover:text-gray-900 underline pointer-events-auto"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
