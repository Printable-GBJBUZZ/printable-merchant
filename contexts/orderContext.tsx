"use client";

import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";
interface DocumentDetails {
  fileName: string;
  fileUrl: string;
  copies: number;
  colorType: "black_and_white" | "color";
  paperType: "A4" | "Letter" | "Legal" | string;
  printType: "front" | "front_and_back";
  pageDirection: "vertical" | "horizontal";
}

export interface MerchantOrder {
  id: string;
  userId: string;
  merchantId: string;
  status: "pending" | "processing" | "completed" | "cancelled" | string;
  totalAmount: number;
  paymentMethod:
    | "Credit Card"
    | "UPI"
    | "cash"
    | "paypal"
    | "net_banking"
    | string;
  scheduledPrintTime: string | null;
  createdAt: string;
  updatedAt: string;
  fulfillmentType: "delivery" | "pickup" | "takeaway" | string;
  state: string | null;
  city: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  documents: DocumentDetails[];
}
interface OrderContextType {
  order: MerchantOrder[] | [];
  addOrder: (order: MerchantOrder[]) => void;
  updateOrder: (id: string, updateParams: any) => void;
  deleteOrder: (id: string) => void;
}
const OrderContext = createContext<OrderContextType | null>(null);
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<MerchantOrder[]>([]);

  const addOrder = (orders: MerchantOrder[]) =>
    setOrder((prev) => [...prev, ...orders]);

  const updateOrder = (id: string, updateParams: any) => {
    setOrder((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, ...updateParams } : order
      )
    );
  };

  const deleteOrder = (id: string) => {
    setOrder((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{ order, addOrder, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
