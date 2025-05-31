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

    const channel = pusherClient.subscribe(`merchant-${user.id}`);
    console.log("Pusher initialized for user:", user.id);

    channel.bind("new-order", (data: any) => {
      toast.success("🥳🥳 You got a new Order!! Hurry up 🏃‍♂️");
      addOrder([data.order]);
    });

    return () => {
      console.log("Cleaning up Pusher subscription");
      channel.unbind_all();
      pusherClient?.unsubscribe(`merchant-${user.id}`);
    };
  }, [isLoaded, user?.id]);

  return null;
}
