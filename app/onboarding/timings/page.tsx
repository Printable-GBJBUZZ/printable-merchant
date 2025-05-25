"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";
import { useUser } from "@clerk/nextjs";
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const defaultTimings = daysOfWeek.map((day) => ({
  day,
  isOpen: true,
  open: "09:00",
  close: "21:00",
}));

export interface MerchantPayload {
  id: string;
  userId: string;
  email: string;
  phone: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  shopName: string;
  shopImages: string[];
}

export default function TimingsPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { data, updateTimings } = useOnboarding();
  const [timings, setTimings] = useState(defaultTimings);

  useEffect(() => {
    if (!data.setup.storeName || !data.setup.storeAddress) {
      router.push("/onboarding/setup");
    } else if (!data.services || data.services.length === 0) {
      router.push("/onboarding/services");
    } else if (data.timings && data.timings.length > 0) {
      setTimings(data.timings);
    }
  }, [data, router]);

  const handleToggle = (index: number) => {
    setTimings((prev) =>
      prev.map((t, i) => (i === index ? { ...t, isOpen: !t.isOpen } : t)),
    );
  };

  const handleTimeChange = (
    index: number,
    field: "open" | "close",
    value: string,
  ) => {
    setTimings((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  };

  const handleFinish = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/merchant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user?.id,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
            phone: user?.primaryPhoneNumber?.phoneNumber,
            state: data.setup.storeAddress.state,
            city: data.setup.storeAddress.city,
            address: data.setup.storeAddress.street,
            latitude: data.setup.latitude,
            longitude: data.setup.longitude,
            shopName: data.setup.storeName,
            shopImages: data.setup.images,
          }),
        },
      );
      const response = await result.json();
      console.log(response);
    } catch (error) {
      console.error("error creating the user", error);
    }
  };

  const handleBack = () => {
    router.push("/onboarding/services");
  };

  return (
    <div className="flex items-center justify-center px-4 mt-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-4 lg:gap-8">
        {/* Left Column */}
        <div className="flex flex-col space-y-8 flex-1">
          <div className="flex flex-col gap-2">
            <p className="heading">Operational Hours</p>
            <p className="subHeading">Set your store's operating hours</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              {timings.map((t, index) => (
                <div
                  key={t.day}
                  className="flex justify-between items-center gap-8"
                >
                  <div className="">
                    <label className="timingsDay">{t.day}</label>
                  </div>
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        enabled={t.isOpen}
                        onToggle={() => handleToggle(index)}
                      />
                    </div>
                    <div className="col-span-10 flex items-center gap-3">
                      <label className="timingsOpen">Open</label>
                      <input
                        type="time"
                        value={t.open}
                        onChange={(e) =>
                          handleTimeChange(index, "open", e.target.value)
                        }
                        className="timingsTime"
                      />
                      <label className="timingsTo">To</label>
                      <input
                        type="time"
                        value={t.close}
                        onChange={(e) =>
                          handleTimeChange(index, "close", e.target.value)
                        }
                        className="timingsTime"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                className="px-6 py-2 border rounded-full text-white border-white"
              >
                Back
              </button>
              {isLoaded ? (
                <button
                  onClick={handleFinish}
                  className="continueButton cursor-pointer bg-[#61e987]"
                >
                  Finish
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white rounded p-4">
          <div className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
}
