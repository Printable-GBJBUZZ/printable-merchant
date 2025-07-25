// components/GlobalPusherListener.tsx
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import pusherClient from "@/pusher/pusher";
import { useOrder } from "@/contexts/orderContext";

export default function GlobalPusherListener() {
  const { user, isLoaded } = useUser();
  const { addOrder } = useOrder();

  useEffect(() => {
    if (!isLoaded || !user?.id || !pusherClient) return;

    // 🛍️ Subscribe for orders
    const orderChannel = pusherClient.subscribe(`merchant-${user.id}`);
    orderChannel?.bind("new-order", (data: any) => {
      toast.success("🥳 New Order!");
      addOrder([data.order]);
    });

    // 💬 Subscribe for chat
    const chatChannel = pusherClient.subscribe(`chat-userid-${user.id}`);
    chatChannel?.bind("chat", (data: any) => {
      toast.success("received new message");
      console.log("📨 Chat message data:", data);
    });

    // 🔄 Cleanup
    return () => {
      console.log("Cleaning up Pusher subscription");
      channel?.unbind_all();
      pusherClient?.unsubscribe(`merchant-${user.id}`);
    };
  }, [isLoaded, user?.id]);

  return null;
}
