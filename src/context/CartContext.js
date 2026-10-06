import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bhojan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhojan_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const getItemPrice = (item) => {
    const rawPrice = item?.price ?? item?.defaultPrice ?? 0;
    // Swiggy prices are in paise (e.g. 29900 = ₹299). If rawPrice is already <= 1000 and has no paise, handle safely.
    return rawPrice > 1000 ? Math.round(rawPrice / 100) : rawPrice;
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prevItems,
        {
          id: item.id,
          name: item.name,
          price: getItemPrice(item),
          imageId: item.imageId,
          isVeg: item.isVeg,
          description: item.description,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === itemId);
      if (!existing) return prevItems;
      if (existing.quantity > 1) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems.filter((i) => i.id !== itemId);
    });
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        getItemQuantity,
        totalCount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
