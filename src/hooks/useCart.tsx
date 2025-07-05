import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  partyType: string;
  date?: Date;
  location?: string;
  size?: string;
  color?: string;
  taste?: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

interface Order {
  id: string;
  date?: Date;
  location?: string;
  partyType: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderDate: Date;
  userInfo: UserInfo;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, partyType: string, quantity: number) => void;
  removeFromCart: (id: number, partyType: string) => void;
  clearCart: () => void;
  confirmOrder: (orderData: { date?: Date; location?: string; userInfo: UserInfo }) => any;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getConfirmedOrders: () => Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<Order[]>([]);

  // Charger les commandes confirmées depuis localStorage au démarrage
  useEffect(() => {
    const savedOrders = localStorage.getItem('confirmedOrders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Reconvertir les dates
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          orderDate: new Date(order.orderDate),
          date: order.date ? new Date(order.date) : undefined
        }));
        setConfirmedOrders(ordersWithDates);
        console.log("Loaded confirmed orders from localStorage:", ordersWithDates.length);
      } catch (error) {
        console.error("Error loading confirmed orders:", error);
      }
    }
  }, []);

  // Sauvegarder les commandes confirmées dans localStorage à chaque changement
  useEffect(() => {
    if (confirmedOrders.length > 0) {
      localStorage.setItem('confirmedOrders', JSON.stringify(confirmedOrders));
      console.log("Saved confirmed orders to localStorage:", confirmedOrders.length);
    }
  }, [confirmedOrders]);

  console.log("CartProvider rendered - confirmedOrders count:", confirmedOrders.length);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        cartItem => cartItem.id === item.id && 
                    cartItem.partyType === item.partyType &&
                    cartItem.size === item.size &&
                    cartItem.color === item.color &&
                    cartItem.taste === item.taste
      );

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && 
          cartItem.partyType === item.partyType &&
          cartItem.size === item.size &&
          cartItem.color === item.color &&
          cartItem.taste === item.taste
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      return [...prev, item];
    });
  };

  const updateQuantity = (id: number, partyType: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, partyType);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.partyType === partyType
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: number, partyType: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.partyType === partyType))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const confirmOrder = (orderData: { date?: Date; location?: string; userInfo: UserInfo }) => {
    // Déterminer le type de fête à partir des articles du panier
    const partyType = cartItems[0]?.partyType || 'soutenance';
    
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getTotalPrice(),
      date: orderData.date,
      location: orderData.location,
      userInfo: orderData.userInfo,
      orderDate: new Date(),
      partyType
    };
    
    console.log("Adding new order:", order);
    setConfirmedOrders(prev => {
      const newOrders = [...prev, order];
      console.log("Updated confirmed orders:", newOrders);
      return newOrders;
    });
    
    console.log("Order confirmed:", order);
    clearCart();
    return order;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getConfirmedOrders = () => {
    console.log("getConfirmedOrders called - returning:", confirmedOrders.length, "orders");
    return confirmedOrders;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      confirmOrder,
      getTotalItems,
      getTotalPrice,
      getConfirmedOrders
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
