import { create } from "zustand";
import type { MenuItem } from "../pages/Home/Home";

export interface CartItemState extends MenuItem {
  quantity: number;
}

interface CartState {
  cart: CartItemState[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: MenuItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set, get) => ({
  cart:  [],
  totalItems: 0,
  totalPrice: 0,

  addToCart: (product) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find((item) => item._id === product._id);

    let updatedCart: CartItemState[];

    if (existingItem) {
      updatedCart = currentCart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    set({
      cart: updatedCart,
      totalItems: get().totalItems + 1,
      totalPrice: get().totalPrice + product.price,
    })
  },

  removeFromCart: (productId) => {
    const currentCart = get().cart;
    const itemToRemove = currentCart.find((item) => item._id === productId);

    if (!itemToRemove) return;

    set({
      cart: currentCart.filter((item) => item._id !== productId),
      totalItems: get().totalItems - itemToRemove.quantity,
      totalPrice: get().totalPrice - (itemToRemove.price * itemToRemove.quantity),
    })
  },

  updateQuantity: (productId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    const currentCart = get().cart;
    const updatedCart = currentCart.map((item) => item._id === productId ? { ...item, quantity: newQuantity } : item);

    const totalItems = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    set({
      cart: updatedCart,
      totalItems,
      totalPrice
    })
  },

  clearCart: () => set({ cart: [], totalItems: 0, totalPrice: 0 }),
}))