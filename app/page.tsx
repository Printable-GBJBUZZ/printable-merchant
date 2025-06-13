"use client";
import { useRouter } from "next/navigation";
import NavBar from "@/Components/NavBar/NavBar";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Dashboard from "@/components/dashboard/Dashboard";
interface StatProps {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  acceptedOrders: number;
}
interface Merchant {
  name: string;
  shopName: string;
}
export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [stat, setStat] = useState<StatProps>();
  const [merchant, setMerchant] = useState<Merchant>();
  useEffect(() => {
    if (!isLoaded || !user?.id) {
      console.log("Fetch useEffect skipped: user not loaded or no user.id");

      return;
    }
    async function getMerchant(userId: string) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/merchant/${userId}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        console.log("Merchant data:", res);
	if (res.data.shopName===null){
		router.push("/onboarding/setup");

	}
        if (res.data) {
          const options: StatProps = {
            totalOrders: res.data.totalOrders,
            totalRevenue: res.data.totalRevenue,
            pendingOrders: res.data.pendingOrders,
            acceptedOrders: res.data.acceptedOrders,
          };
          const info: Merchant = {
            name: res.data.name,
            shopName: res.data.shopName,
          };
          setMerchant(info);
          setStat(options);
        }
        if (res.data.length == 0) {
          // Use a stable navigation approach
          router.replace("/onboarding/setup");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    getMerchant(user.id);
  }, [isLoaded, user?.id, router]);

  return (
    <div className="merchant_dashboard">
      <Dashboard data={stat} merchantInfo={merchant} />
    </div>
  );
}
