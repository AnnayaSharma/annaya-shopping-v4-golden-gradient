import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
    _id?: string;
  }[];
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      addToCart: (product, size, color) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
          );
          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += 1;
            return { cart: newCart };
          }
          return { cart: [...state.cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }] };
        }),
      removeFromCart: (productId, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
          ),
        })),
      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'annaya-storage',
    }
  )
);
