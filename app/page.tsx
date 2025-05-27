"use client";
import { useRouter } from "next/navigation";
import NavBar from "@/Components/NavBar/NavBar";
import { use, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    setLoading(true);

    async function getMerchant(userId: string) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/merchant/${userId}`,
        );
        const data = await response.json();
        console.log(data);
        if (data.error === "Merchant not found") {
          router.push("/onboarding/setup");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    getMerchant(user.id);
  }, [isLoaded, user?.id]);
  return <Dashboard />;
}
