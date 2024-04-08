import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSumaryInformation: () => {
    quantity: number;
    subtotal: number;
    taxes: number;
    total: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductInCart: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart(product) {
        const { cart } = get();
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity: item.quantity + product.quantity };
          return item;
        });

        set({ cart: updatedCart });
      },
      getTotalItems() {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      updateProductInCart(product, quantity) {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity };
          return item;
        });

        set({ cart: updatedCart });
      },
      removeProductFromCart(product) {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCart });
      },
      getSumaryInformation() {
        const { cart } = get();
        const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const taxes = subtotal * 0.15;
        const total = subtotal + taxes;

        return { quantity, subtotal, taxes, total };
      },
    }),
    { name: "shopping-cart" }
  )
);
