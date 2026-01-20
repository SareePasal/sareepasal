import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// This creates a "Memory" that stays even if you refresh the page!
export const useCart = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Function to add item
      addToCart: (product) => {
        const currentCart = get().cart;
        // Check if item is already there
        const exists = currentCart.find((item) => item.id === product.id && item.selectedSize === product.selectedSize && item.selectedColor === product.selectedColor);

        if (exists) {
            // If exists, just increase quantity
            set({
                cart: currentCart.map((item) => 
                    item === exists ? { ...item, quantity: item.quantity + 1 } : item
                )
            });
        } else {
            // If new, add to list
            set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      // Function to remove item
      removeFromCart: (uniqueKey) => set((state) => ({
        cart: state.cart.filter((item) => item.uniqueKey !== uniqueKey)
      })),

      // Function to clear everything
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'saree-pasal-cart' } // Name for the saved memory
  )
);