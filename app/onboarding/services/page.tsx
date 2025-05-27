"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import ContinueButton from "@/components/ContinueButton/ContinueButton";

const availableServices = [
  "Black and White",
  "Color Print",
  "College Journal",
  "Binding",
];

export default function ServicesPage() {
  const router = useRouter();
  const { data, updateServices } = useOnboarding();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (!data.setup.storeName || !data.setup.storeAddress) {
      router.push("/onboarding/setup");
    } else if (data.services && data.services.length > 0) {
      setSelectedServices(data.services);
    }
  }, [data, router]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleContinue = () => {
    updateServices(selectedServices);
    router.push("/onboarding/timings");
  };

  const handleBack = () => {
    router.push("/onboarding/setup");
  };

  return (
    <div className="flex items-center justify-center px-4 mt-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-4 lg:gap-8">
        <div className="flex flex-col space-y-8 flex-1">
          <div className="flex flex-col gap-2">
            <p className="heading">Print Capabilities</p>
            <p className="subHeading">
              Choose the printing services your business provides.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              {availableServices.map((service) => (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`serviceButton ${
                    selectedServices.includes(service)
                      ? "selected"
                      : "notSelected"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleBack}
                className="px-6 py-2 border rounded-full text-white border-white"
              >
                Back
              </button>
              <ContinueButton
                isDisabled={selectedServices.length === 0}
                onClick={handleContinue}
              >
                Continue
              </ContinueButton>
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
