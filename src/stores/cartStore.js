import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const createEmptyCart = () => ({
  id: 'local-cart',
  checkoutUrl: '#',
  lines: [],
  cost: {
    subtotal: { amount: '0', currencyCode: 'USD' },
    total: { amount: '0', currencyCode: 'USD' },
  },
});

const recalculateCartCost = (cart) => {
  const subtotalAmount = cart.lines.reduce((total, line) => {
    const linePrice = Number.parseFloat(line?.merchandise?.price?.amount || 0);
    return total + linePrice * line.quantity;
  }, 0);

  const amount = subtotalAmount.toFixed(2);
  return {
    ...cart,
    cost: {
      subtotal: { amount, currencyCode: 'USD' },
      total: { amount, currencyCode: 'USD' },
    },
  };
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,
      cartId: null,
      isLoading: false,
      error: null,
      itemCount: 0,

      setCart: (cart) => set({ cart }),
      setCartId: (cartId) => set({ cartId }),

      addItem: (item) =>
        set((state) => {
          const cart = state.cart || createEmptyCart();
          const existingItem = cart.lines.find(
            (line) => line.merchandise.id === item.merchandise.id
          );

          if (existingItem) {
            const updatedLines = cart.lines.map((line) =>
              line.id === existingItem.id
                ? { ...line, quantity: line.quantity + item.quantity }
                : line
            );
            return { cart: recalculateCartCost({ ...cart, lines: updatedLines }) };
          } else {
            return { cart: recalculateCartCost({ ...cart, lines: [...cart.lines, item] }) };
          }
        }),

      removeItem: (lineId) =>
        set((state) => {
          if (!state.cart) return state;
          const updatedCart = {
            ...state.cart,
            lines: state.cart.lines.filter((line) => line.id !== lineId),
          };
          return {
            cart: recalculateCartCost(updatedCart),
          };
        }),

      updateItemQuantity: (lineId, quantity) =>
        set((state) => {
          if (!state.cart) return state;
          const updatedLines = state.cart.lines.map((line) =>
            line.id === lineId ? { ...line, quantity } : line
          );
          return { cart: recalculateCartCost({ ...state.cart, lines: updatedLines }) };
        }),

      clearCart: () => set({ cart: null, cartId: null, itemCount: 0 }),

      getItemCount: () => {
        const state = get();
        if (!state.cart) return 0;
        return state.cart.lines.reduce((total, line) => total + line.quantity, 0);
      },

      getCartTotal: () => {
        const state = get();
        if (!state.cart) return 0;
        return parseFloat(state.cart.cost?.total?.amount || 0);
      },

      getCartSubtotal: () => {
        const state = get();
        if (!state.cart) return 0;
        return parseFloat(state.cart.cost?.subtotal?.amount || 0);
      },

      getCheckoutUrl: () => {
        const state = get();
        if (!state.cart) return null;
        return state.cart.checkoutUrl;
      },
    }),
    {
      name: 'pawra-cart-store',
      partialize: (state) => ({
        cartId: state.cartId,
        cart: state.cart,
      }),
    }
  )
);
