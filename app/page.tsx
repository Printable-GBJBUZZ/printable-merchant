"use client";
import { useRouter } from "next/navigation";
import NavBar from "@/Components/NavBar/NavBar";
import { use, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

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
  return (
    <div className="w-screen h-screen bg-[#E6E6ED] flex">
      {/* left panel */}
      <div className="w-[305px] h-[96%] bg-white rounded-md m-[15px]"></div>

      <div className="flex flex-col w-full mr-5">
        {/* nav bar */}
        <NavBar />

        {/* Dashboard title */}
        <div className="flex flex-row justify-between items-center mb-[7px]">
          <h1 className="text-2xl text-black flex items-center font-inter font-bold">
            Messages
          </h1>
          <div>
            <span className="text-base text-gray-400 font-roboto font-normal hover:cursor-pointer hover:text-gray-600">
              Dashboard /
            </span>
            <span className="text-base text-blue-500 font-roboto font-normal hover:cursor-pointer hover:text-blue-700">
              {" "}
              Messages
            </span>
          </div>
        </div>

        <div className="w-full flex-1 flex flex-row rounded-md"></div>
      </div>
    </div>
  );
}
