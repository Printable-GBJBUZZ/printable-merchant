"use client";

import { useUser } from "@clerk/nextjs";
import React, {
  useContext,
  createContext,
  useEffect,
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
  loading: boolean;
  addOrder: (order: MerchantOrder[]) => void;
  updateOrder: (id: string, updateParams: any) => void;
  deleteOrder: (id: string) => void;
}
const OrderContext = createContext<OrderContextType | null>(null);
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<MerchantOrder[]>([]);
  const { user } = useUser();

  const addOrder = (orders: MerchantOrder[]) =>
    setOrder((prev) => [...orders, ...prev]);

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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/order/merchant/${user?.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        console.log("Fetched orders:", data); // Debug
        setOrder(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.id]);

  return (
    <OrderContext.Provider
      value={{ order, addOrder, updateOrder, deleteOrder, loading }}
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
