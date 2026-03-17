import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Banknote, Smartphone } from 'lucide-react';
import { useCartStore } from '@/entities/cart/model/store';
import { Button } from '@/shared/ui/Button';
import { generateWhatsAppLink } from '@/features/checkout/api/whatsapp';

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

  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'cash'>('yape');
  const [cashAmount, setCashAmount] = useState<string>('');

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Oscuro */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col h-[100dvh] animate-slide-left">
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
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-5">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-gray-600 font-medium whitespace-nowrap">Total a Pagar</span>
              <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">S/ {totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Medios de Pago */}
            <div className="space-y-3">
              <span className="block text-sm font-semibold text-gray-700">Modo de pago al recoger:</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('yape')}
                  className={`flex items-center justify-center gap-2 py-3 border rounded-xl transition-all ${
                    paymentMethod === 'yape' 
                      ? 'border-brand-green bg-brand-green/10 text-brand-green shadow-sm' 
                      : 'border-gray-200 bg-white text-gray-500 hover:border-brand-green/50'
                  }`}
                >
                  <Smartphone size={20} />
                  <span className="text-sm font-bold">Yape / Plin</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center justify-center gap-2 py-3 border rounded-xl transition-all ${
                    paymentMethod === 'cash' 
                      ? 'border-brand-orange bg-brand-orange/10 text-brand-orange shadow-sm' 
                      : 'border-gray-200 bg-white text-gray-500 hover:border-brand-orange/50'
                  }`}
                >
                  <Banknote size={20} />
                  <span className="text-sm font-bold">Efectivo</span>
                </button>
              </div>
            </div>

            {/* Input de Vuelto si es Efectivo */}
            {paymentMethod === 'cash' && (
              <div className="space-y-2 animate-fade-in pb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  ¿Con cuánto pagas? (Para alistar vuelto)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">S/</span>
                  <input 
                    type="number" 
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="Ej. 50"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none font-bold text-lg text-gray-900 shadow-inner bg-white"
                  />
                </div>
                {cashAmount && parseFloat(cashAmount) >= totalPrice && (
                  <p className="text-sm font-bold text-brand-green flex items-center gap-1 mt-2">
                    ✅ Vuelto a entregar: S/ {(parseFloat(cashAmount) - totalPrice).toFixed(2)}
                  </p>
                )}
                {cashAmount && parseFloat(cashAmount) < totalPrice && (
                  <p className="text-xs font-bold text-red-500 mt-2">
                    ⚠️ El monto debe cubrir el total de S/ {totalPrice.toFixed(2)}.
                  </p>
                )}
              </div>
            )}
            
            <a 
              href={generateWhatsAppLink(items, totalPrice, paymentMethod, cashAmount)} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block w-full ${paymentMethod === 'cash' && (!cashAmount || parseFloat(cashAmount) < totalPrice) ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
            >
              <Button fullWidth variant="whatsapp" size="lg">
                Enviar pedido por WhatsApp
              </Button>
            </a>
            
            <button 
              onClick={clearCart}
              className="w-full text-sm text-gray-500 hover:text-gray-900 underline pointer-events-auto"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
