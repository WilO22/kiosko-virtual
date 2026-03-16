import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/shared/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  
  // Acciones
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          let newItems;
          
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newItems = [...state.items, { ...product, quantity: 1 }];
          }

          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          return { items: newItems, totalItems, totalPrice, isOpen: true };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          return { items: newItems, totalItems, totalPrice };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return get().removeItem(productId) as any;
          }

          const newItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          return { items: newItems, totalItems, totalPrice };
        });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'caserito-cart-storage',
    }
  )
);
