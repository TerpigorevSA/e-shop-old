import React, { useState, useCallback } from 'react';
import { CartContext } from '../../contexts/CartContext/CartContext';
import { Product } from '../../types/serverTypes';

export type CartEntry = {
  product: Product;
  quantity: number;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCart, setCurrentCart] = useState<CartEntry[]>([]);

  const addToCart = (product: Product) => {
    setCurrentCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCurrentCart((prevCart) =>
      prevCart
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const setQuantity = (product: Product, quantity: number) => {
    setCurrentCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart
          .map((item) => (item.product.id === product.id ? { ...item, quantity: quantity } : item))
          .filter((item) => item.quantity > 0);
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const clearCart = useCallback(() => {
    setCurrentCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ currentCart, addToCart, removeFromCart, setQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
