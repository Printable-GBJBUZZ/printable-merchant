"use client";

import React, { createContext, useContext, useState } from "react";

type StoreAddress = {
  street: string;
  city: string;
  state: string;
  pincode: string;
};

type StoreSetup = {
  storeName: string;
  storeAddress: StoreAddress;
  longitude: number;
  latitude: number;
  images: string[]; // Array of image files
};

type OnboardingData = {
  setup: StoreSetup;
  services: string[]; // Array of service names
  timings: {
    day: string;
    isOpen: boolean;
    open: string; // e.g., '09:00 AM'
    close: string; // e.g., '09:00 PM'
  }[];
};

type OnboardingContextType = {
  data: OnboardingData;
  updateSetup: (setup: Partial<StoreSetup>) => void;
  updateServices: (services: string[]) => void;
  updateTimings: (timings: OnboardingData["timings"]) => void;
};

const defaultData: OnboardingData = {
  setup: {
    storeName: "",
    storeAddress: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    longitude: 0,
    latitude: 0,
    images: [],
  },
  services: [],
  timings: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const updateSetup = (setup: Partial<StoreSetup>) => {
    setData((prev) => ({
      ...prev,
      setup: { ...prev.setup, ...setup },
    }));
  };

  const updateServices = (services: string[]) => {
    setData((prev) => ({
      ...prev,
      services,
    }));
  };

  const updateTimings = (timings: OnboardingData["timings"]) => {
    setData((prev) => ({
      ...prev,
      timings,
    }));
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateSetup, updateServices, updateTimings }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
