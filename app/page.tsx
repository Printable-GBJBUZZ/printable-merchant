"use client";
import { useRouter } from "next/navigation";
import NavBar from "@/Components/NavBar/NavBar";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Dashboard from "@/components/dashboard/Dashboard";
import { useOrder } from "@/contexts/orderContext";
// import {PusherClient} from "@/pusher/pusher"
import pusherClient from "@/pusher/pusher";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const { addOrder, order } = useOrder();
  // const pusherRef = useRef<PusherClient | null>(null);
  // Pusher subscription for real-time order updates
  useEffect(() => {
    console.log(
      "Pusher initialized for user:",
      "user_2xlHID3JeliMwKGWJSkXDOqh92t"
    );
    if (!isLoaded) return;
    // if (!pusherRef.current) {
    //   pusherRef.current = new PusherClient();
    // }
    // const pusher = pusherRef.current;
    if (!pusherClient) return;
    const channel = pusherClient.subscribe(`merchant-${user?.id}`);
    channel.bind("new-order", (data: any) => addOrder([data.order]));

    return () => {
      console.log("Cleaning up Pusher subscription");
      channel.unbind_all();
      pusherClient?.unsubscribe(`merchant-${user?.id}`);
    };
  }, [isLoaded]); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (!isLoaded || !user?.id) {
      console.log("Fetch useEffect skipped: user not loaded or no user.id");
      setLoading(false); // Ensure loading is false if skipped
      return;
    }

    setLoading(true);

    async function getMerchant(userId: string) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/merchant/${user?.id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Merchant data:", data);

        if (data.error === "Merchant not found") {
          // Use a stable navigation approach
          router.replace("/onboarding/setup");
        } else if (
          data.orders &&
          Array.isArray(data.orders) &&
          data.orders.length > 0
        ) {
          console.log("Adding initial orders:", data.orders);
          addOrder(data.orders); // Ensure addOrder doesn't trigger re-renders excessively
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load merchant data");
      } finally {
        setLoading(false);
      }
    }

    getMerchant(user.id);
  }, [isLoaded, user?.id, router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !isLoaded) {
    return <div>Loading...</div>;
  }

  return <Dashboard />;
}
