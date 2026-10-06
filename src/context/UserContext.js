import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-home',
    type: 'Home',
    title: 'Home',
    icon: '🏠',
    line1: 'Flat 402, Royal Residency, Park Road',
    area: 'Hazratganj',
    city: 'Lucknow',
    pincode: '226001',
    isDefault: true,
  },
  {
    id: 'addr-work',
    type: 'Work',
    title: 'Work',
    icon: '🏢',
    line1: 'Tower B, 4th Floor, Cyber Heights',
    area: 'Vibhuti Khand, Gomti Nagar',
    city: 'Lucknow',
    pincode: '226010',
    isDefault: false,
  },
  {
    id: 'addr-other',
    type: 'Other',
    title: 'Parents House',
    icon: '📍',
    line1: 'Plot 15, Sector C',
    area: 'Aliganj',
    city: 'Lucknow',
    pincode: '226024',
    isDefault: false,
  },
];

const INITIAL_PAST_ORDERS = [
  {
    id: 'BHJ-782491',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    restaurantName: "Domino's Pizza",
    restaurantArea: 'Hazratganj',
    status: 'Delivered',
    statusStep: 4,
    items: [
      {
        id: 'dp_1',
        name: 'Margherita Delight Pizza',
        price: 239,
        quantity: 1,
        isVeg: 1,
      },
      {
        id: 'dp_3',
        name: 'Garlic Breadsticks with Dip',
        price: 119,
        quantity: 1,
        isVeg: 1,
      },
    ],
    itemTotal: 358,
    discount: 50,
    couponCode: 'WELCOME20',
    deliveryFee: 0,
    platformFee: 5,
    taxes: 15,
    toPay: 328,
    deliveryAddress: {
      title: 'Home',
      line1: 'Flat 402, Royal Residency, Hazratganj, Lucknow',
    },
    note: 'Leave at doorstep please',
  },
  {
    id: 'BHJ-549102',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    restaurantName: 'Jahangir Chicken Corner',
    restaurantArea: 'Aminabad',
    status: 'Delivered',
    statusStep: 4,
    items: [
      {
        id: 'jah_1',
        name: 'Mughlai Galawati Kebab (4 Pcs)',
        price: 280,
        quantity: 1,
        isVeg: 0,
      },
      {
        id: 'jah_5',
        name: 'Ulta Tawa Paratha (2 Pcs)',
        price: 50,
        quantity: 2,
        isVeg: 1,
      },
    ],
    itemTotal: 380,
    discount: 100,
    couponCode: 'BHOJAN50',
    deliveryFee: 0,
    platformFee: 5,
    taxes: 14,
    toPay: 299,
    deliveryAddress: {
      title: 'Home',
      line1: 'Flat 402, Royal Residency, Hazratganj, Lucknow',
    },
    note: 'Include extra green chutney and onions',
  },
];

export const UserProvider = ({ children }) => {
  // Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('bhojan_addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch (e) {
      return DEFAULT_ADDRESSES;
    }
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    try {
      const saved = localStorage.getItem('bhojan_selected_address');
      return saved || 'addr-home';
    } catch (e) {
      return 'addr-home';
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('bhojan_orders');
      return saved ? JSON.parse(saved) : INITIAL_PAST_ORDERS;
    } catch (e) {
      return INITIAL_PAST_ORDERS;
    }
  });

  // Sync addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bhojan_addresses', JSON.stringify(addresses));
    } catch (e) {
      console.error('Failed to sync addresses', e);
    }
  }, [addresses]);

  // Sync selected address to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bhojan_selected_address', selectedAddressId);
    } catch (e) {
      console.error('Failed to sync selected address', e);
    }
  }, [selectedAddressId]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bhojan_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders', e);
    }
  }, [orders]);

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0] || null;

  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const addAddress = (newAddr) => {
    const created = {
      id: 'addr-' + Date.now(),
      type: newAddr.type || 'Other',
      title: newAddr.title || newAddr.type || 'Saved Address',
      icon:
        newAddr.type === 'Home'
          ? '🏠'
          : newAddr.type === 'Work'
          ? '🏢'
          : '📍',
      line1: newAddr.line1 || '',
      area: newAddr.area || '',
      city: newAddr.city || 'Lucknow',
      pincode: newAddr.pincode || '',
      isDefault: false,
    };
    setAddresses((prev) => [created, ...prev]);
    setSelectedAddressId(created.id);
    return created;
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id && addresses.length > 1) {
      const remaining = addresses.filter((a) => a.id !== id);
      setSelectedAddressId(remaining[0].id);
    }
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: 'BHJ-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      status: 'Order Confirmed',
      statusStep: 1,
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <UserContext.Provider
      value={{
        addresses,
        selectedAddress,
        selectAddress,
        addAddress,
        deleteAddress,
        orders,
        placeOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
