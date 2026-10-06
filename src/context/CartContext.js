import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { AVAILABLE_COUPONS } from '../components/constants';

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

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('bhojan_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhojan_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('bhojan_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('bhojan_coupon');
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage', e);
    }
  }, [appliedCoupon]);

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
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
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
    setAppliedCoupon(null);
  };

  const reorderItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return false;
    const formatted = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      imageId: item.imageId,
      isVeg: item.isVeg,
      description: item.description,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      quantity: item.quantity || 1,
    }));
    setCartItems(formatted);
    return true;
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

  // Discount calculation
  const discountAmount = useMemo(() => {
    if (!appliedCoupon || totalAmount === 0) return 0;
    if (totalAmount < appliedCoupon.minOrder) return 0;

    if (appliedCoupon.type === 'flat') {
      return appliedCoupon.flatDiscount;
    }
    if (appliedCoupon.type === 'percent') {
      const calculated = Math.round(
        (totalAmount * appliedCoupon.discountPercent) / 100
      );
      return Math.min(calculated, appliedCoupon.maxDiscount);
    }
    return 0;
  }, [appliedCoupon, totalAmount]);

  const applyCoupon = (couponCode) => {
    const code = (couponCode || '').trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code
    );

    if (!found) {
      return {
        success: false,
        message: `Invalid code "${couponCode}". Try BHOJAN50 or WELCOME20.`,
      };
    }

    if (totalAmount < found.minOrder) {
      return {
        success: false,
        message: `Minimum order of ₹${found.minOrder} required. Add ₹${
          found.minOrder - totalAmount
        } more!`,
      };
    }

    let discount = 0;
    if (found.type === 'flat') {
      discount = found.flatDiscount;
    } else {
      discount = Math.min(
        Math.round((totalAmount * found.discountPercent) / 100),
        found.maxDiscount
      );
    }

    setAppliedCoupon(found);
    return {
      success: true,
      discount,
      message: `Coupon "${found.code}" applied! You saved ₹${discount}.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

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
        availableCoupons: AVAILABLE_COUPONS,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        reorderItems,
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
