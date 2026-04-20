import { createContext, useState } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, { ...order, id: Date.now() }]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
